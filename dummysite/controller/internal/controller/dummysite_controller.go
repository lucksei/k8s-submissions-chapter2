/*
Copyright 2025.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controller

import (
	"context"
	"fmt"
	"time"

	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/intstr"
	"k8s.io/utils/ptr"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	logf "sigs.k8s.io/controller-runtime/pkg/log"

	stablev1 "github.com/lucksei/dummysite/controller/api/v1"
)

// Definitions to manage the status conditions
const (
	typeAvailableDummysite   = "Available"
	typeProgressingDummysite = "Progressing"
	typeDegradedDummysite    = "Degraded"
)

// DummySiteReconciler reconciles a DummySite object
type DummySiteReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

// +kubebuilder:rbac:groups=stable.dwk,resources=dummysites,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=stable.dwk,resources=dummysites/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=stable.dwk,resources=dummysites/finalizers,verbs=update

// More RBAC persmissions
// +kubebuilder:rbac:groups=core,resources=events,verbs=create;patch
// +kubebuilder:rbac:groups=apps,resources=deployments,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core,resources=pods,verbs=get;list;watch
// +kubebuilder:rbac:groups=core,resources=services,verbs=get;list;watch;create;update;patch;delete

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the DummySite object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.22.4/pkg/reconcile
func (r *DummySiteReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := logf.FromContext(ctx)

	dummysite := &stablev1.DummySite{}
	err := r.Get(ctx, req.NamespacedName, dummysite)
	if err != nil {
		if apierrors.IsNotFound(err) {
			log.Info("DummySite resource not found. Ignoring since object must be deleted")
			return ctrl.Result{}, nil
		}
		log.Error(err, "Failed to get DummySite")
		return ctrl.Result{}, err
	}

	// Start by setting the status as Unknown when no status is available
	if len(dummysite.Status.Conditions) == 0 {
		meta.SetStatusCondition(&dummysite.Status.Conditions, metav1.Condition{
			Type:    typeProgressingDummysite,
			Status:  metav1.ConditionUnknown,
			Reason:  "Reconciling",
			Message: "Starting reconciliation",
		})
		if err = r.Status().Update(ctx, dummysite); err != nil {
			log.Error(err, "Failed to update DummySite status")
			return ctrl.Result{}, err
		}
		if err := r.Get(ctx, req.NamespacedName, dummysite); err != nil {
			log.Error(err, "Failed to re-fetch dummysite")
			return ctrl.Result{}, err
		}
	}

	// Also set the WebsiteUrl, Port and Replicas for the status
	dummysite.Status.WebsiteUrl = fmt.Sprintf("%s", dummysite.Spec.WebsiteUrl)
	dummysite.Status.Port = *dummysite.Spec.Port
	dummysite.Status.Replicas = *dummysite.Spec.Replicas

	// Check if the service already exists, if not create a new one
	foundService := &corev1.Service{}
	err = r.Get(ctx, types.NamespacedName{Name: dummysite.Name, Namespace: dummysite.Namespace}, foundService)
	if err != nil && apierrors.IsNotFound(err) {
		// Define a new service
		svc, err := r.serviceForDummysite(dummysite)
		if err != nil {
			log.Error(err, "Failed to define new Service resource for DummySite")
			meta.SetStatusCondition(
				&dummysite.Status.Conditions,
				metav1.Condition{
					Type:   typeDegradedDummysite,
					Status: metav1.ConditionFalse, Reason: "Reconciling",
					Message: fmt.Sprintf("Failed to create Service for the custom resource (%s): (%s)", dummysite.Name, err),
				})
			if err := r.Status().Update(ctx, dummysite); err != nil {
				log.Error(err, "Failed to update DummySite status")
				return ctrl.Result{}, err
			}

			return ctrl.Result{}, err
		}
		log.Info("Creating a new Service", "Service.Namespace", svc.Namespace, "Service.Name", svc.Name)
		if err = r.Create(ctx, svc); err != nil {
			log.Error(err, "Failed to create new Service", "Service.Namespace", svc.Namespace, "Service.Name", svc.Name)
			return ctrl.Result{}, err
		}

		// Service created successfully
		// We will requeue the reconciliation so that we can ensure the state
		// and move forward for the next operations
		return ctrl.Result{RequeueAfter: 1 * time.Second}, nil
	}

	// Check if the deployment already exists, if not create a new one
	foundDeployment := &appsv1.Deployment{}
	err = r.Get(ctx, types.NamespacedName{Name: dummysite.Name, Namespace: dummysite.Namespace}, foundDeployment)
	if err != nil && apierrors.IsNotFound(err) {
		// Define a new deployment
		dep, err := r.deploymentForDummysite(dummysite)
		if err != nil {
			log.Error(err, "Failed to define new Deployment resource for DummySite")
			meta.SetStatusCondition(
				&dummysite.Status.Conditions,
				metav1.Condition{Type: typeDegradedDummysite,
					Status: metav1.ConditionFalse, Reason: "Reconciling",
					Message: fmt.Sprintf("Failed to create Deployment for the custom resource (%s): (%s)", dummysite.Name, err),
				})
			if err := r.Status().Update(ctx, dummysite); err != nil {
				log.Error(err, "Failed to update DummySite status")
				return ctrl.Result{}, err
			}

			return ctrl.Result{}, err
		}
		log.Info("Creating a new Deployment", "Deployment.Namespace", dep.Namespace, "Deployment.Name", dep.Name)
		if err = r.Create(ctx, dep); err != nil {
			log.Error(err, "Failed to create new Deployment", "Deployment.Namespace", dep.Namespace, "Deployment.Name", dep.Name)
			return ctrl.Result{}, err
		}

		// Deployment created successfully
		// We will requeue the reconciliation so that we can ensure the state
		// and move forward for the next operations
		return ctrl.Result{RequeueAfter: 10 * time.Second}, nil
	} else if err != nil {
		log.Error(err, "Failed to get Deployment")
		return ctrl.Result{}, err
	}

	// If the size is not defined in the Custom Resource then we will set the desired replicas to 0
	var desiredReplicas int32 = 0
	if dummysite.Spec.Replicas != nil {
		desiredReplicas = *dummysite.Spec.Replicas
	}

	// Ensure the deployment size is the same as defined in the replicas spec of the Custom Resource which we are reconciling.
	if foundDeployment.Spec.Replicas == nil || *foundDeployment.Spec.Replicas != desiredReplicas {
		foundDeployment.Spec.Replicas = ptr.To(desiredReplicas)
		if err = r.Update(ctx, foundDeployment); err != nil {
			log.Error(err, "Failed to update Deployment", "Deployment.Namespace", foundDeployment.Namespace, "Deployment.Name", foundDeployment.Name)

			// Refetch dummysite before updating the status
			if err := r.Get(ctx, req.NamespacedName, dummysite); err != nil {
				log.Error(err, "Failed to re-fetch dummysite")
				return ctrl.Result{}, err
			}

			// Update the status
			meta.SetStatusCondition(&dummysite.Status.Conditions, metav1.Condition{
				Type:   typeDegradedDummysite,
				Status: metav1.ConditionFalse, Reason: "resizing",
				Message: fmt.Sprintf("Failed to update the size for the custom resource (%s): (%s)", dummysite.Name, err),
			})

			if err := r.Status().Update(ctx, dummysite); err != nil {
				log.Error(err, "Failed to update DummySite status")
				return ctrl.Result{}, err
			}

			return ctrl.Result{}, err
		}

		// Now that we updated the status we want to requeue the reconciliation so that we can ensure that
		// we have at least the state of the resource before update.
		return ctrl.Result{RequeueAfter: 10 * time.Second}, nil
	}

	// The following implementation will update the status
	meta.SetStatusCondition(&dummysite.Status.Conditions, metav1.Condition{
		Type:   typeAvailableDummysite,
		Status: metav1.ConditionTrue, Reason: "Reconciling",
		Message: fmt.Sprintf("Deployment for custom resource (%s) with %d replicas created successfully", dummysite.Name, desiredReplicas),
	})

	if err := r.Status().Update(ctx, dummysite); err != nil {
		log.Error(err, "Failed to update DummySite status")
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *DummySiteReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&stablev1.DummySite{}).
		Named("dummysite").
		Complete(r)
}

func (r *DummySiteReconciler) deploymentForDummysite(
	dummysite *stablev1.DummySite) (*appsv1.Deployment, error) {
	image := "lucksei/dummysite:latest"

	dep := &appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      dummysite.Name,
			Namespace: dummysite.Namespace,
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: dummysite.Spec.Replicas,
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{"app.kubernetes.io/name": "dummysite"},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{"app.kubernetes.io/name": "dummysite"},
				},
				Spec: corev1.PodSpec{
					SecurityContext: &corev1.PodSecurityContext{
						RunAsNonRoot: ptr.To(true),
						SeccompProfile: &corev1.SeccompProfile{
							Type: corev1.SeccompProfileTypeRuntimeDefault,
						},
					},
					Containers: []corev1.Container{{
						Image:           image,
						Name:            "dummysite",
						ImagePullPolicy: corev1.PullAlways,
						SecurityContext: &corev1.SecurityContext{
							RunAsNonRoot:             ptr.To(true),
							RunAsUser:                ptr.To(int64(1001)),
							AllowPrivilegeEscalation: ptr.To(false),
							Capabilities: &corev1.Capabilities{
								Drop: []corev1.Capability{
									"ALL",
								},
							},
						},
						Env: []corev1.EnvVar{{
							Name:  "WEBSITE_URL",
							Value: dummysite.Spec.WebsiteUrl,
						}, {
							Name:  "PORT",
							Value: "42069",
						}},
						Ports: []corev1.ContainerPort{{
							ContainerPort: 42069,
							Name:          "dummysite",
						}},
					}},
				},
			},
		},
	}

	if err := ctrl.SetControllerReference(dummysite, dep, r.Scheme); err != nil {
		return nil, err
	}
	return dep, nil
}

func (r *DummySiteReconciler) serviceForDummysite(
	dummysite *stablev1.DummySite) (*corev1.Service, error) {
	svc := &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      dummysite.Name,
			Namespace: dummysite.Namespace,
		},
		Spec: corev1.ServiceSpec{
			Type: corev1.ServiceTypeNodePort,
			Selector: map[string]string{
				"app.kubernetes.io/name": "dummysite",
			},
			Ports: []corev1.ServicePort{{
				Name:       "http",
				Port:       *dummysite.Spec.Port,
				TargetPort: intstr.FromInt32(42069),
				Protocol:   corev1.ProtocolTCP,
			}},
		},
	}

	if err := ctrl.SetControllerReference(dummysite, svc, r.Scheme); err != nil {
		return nil, err
	}
	return svc, nil
}
