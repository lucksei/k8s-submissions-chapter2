# Devops with Kubernetes - K8s Solutions

The repository contains **all chapters** from the course, not just the ones from chapter 2. The name k8s-submissions-chapter2 comes from the fact that I wrongly expected each chapter to be a separate repository. Decided to not fix it and keep the name as it is since it would break the links & would have to fix releases manually I believe.

## Exercises

- Chapter 2 - Kubernetes Basics
  - [1.1. Getting Started](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.1/random-string-generator)
  - [1.2. The project, step 1](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.2/todo-app)
  - [1.3. Declarative approach](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.3/random-string-generator)
  - [1.4. The project, step 2](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.4/todo-app)
  - [1.5. The project, step 3](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.5/todo-app)
  - [1.6. The project, step 4](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.6/todo-app)
  - [1.7. External access with Ingress](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.7/random-string-generator)
  - [1.8. The project, step 5](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.8/todo-app)
  - [1.9. More services](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.9/pingpong)
  - [1.10. Even more services](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.10/log-output)
  - [1.11. Persisting data](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.11)
  - [1.12. The project, step 6](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.12/todo-app)
  - [1.13. The project, step 7](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.13/todo-app)
- Chapter 3 - More Building Blocks
  - [2.1. Connecting pods](https://github.com/lucksei/k8s-submissions-chapter2/tree/2.1)
  - [2.2. The project, step 8](https://github.com/lucksei/k8s-submissions-chapter2/tree/2.2)
  - [2.3. Keep them separated](https://github.com/lucksei/k8s-submissions-chapter2/tree/2.3)
  - [2.4. The project, step 9](https://github.com/lucksei/k8s-submissions-chapter2/tree/2.4)
  - [2.5. Documentation and ConfigMaps](https://github.com/lucksei/k8s-submissions-chapter2/tree/2.5/log-output)
  - [2.6. The project, step 10](https://github.com/lucksei/k8s-submissions-chapter2/tree/2.6)
  - [2.7. Stateful applications](https://github.com/lucksei/k8s-submissions-chapter2/tree/2.7/pingpong)
  - [2.8. The project, step 11](https://github.com/lucksei/k8s-submissions-chapter2/tree/2.8)
  - [2.9 The project, step 12](https://github.com/lucksei/k8s-submissions-chapter2/tree/2.9/todo-project)
  - [2.10. The project, step 13](https://github.com/lucksei/k8s-submissions-chapter2/tree/2.10/todo-project)
- Chapter 4 - To the Cloud
  - [3.1. Pingpong GKE](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.1/pingpong)
  - [3.2. Back to Ingress](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.2)
  - [3.3. To the Gateway](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.3/exercises)
  - [3.4. Rewritten routing](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.4/exercises)
  - [3.5. The project, step 14](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.5/project)
  - [3.6. The project, step 15](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.6/project)
  - [3.7. The project, step 16](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.7/project)
  - [3.8. The project, step 17](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.8/project)
  - [3.9. DBaaS vs DIY](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.9/project)
  - [3.10. The project, step 18](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.10/project)
  - [3.11. The project, step 19](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.11/project)
  - [3.12. The project, step 20](https://github.com/lucksei/k8s-submissions-chapter2/tree/3.12/project)
- Chapter 5: GitOps and friends
  - [4.1. Readines probe](https://github.com/lucksei/k8s-submissions-chapter2/tree/4.1/exercises)
  - [4.2. The project, step 21](https://github.com/lucksei/k8s-submissions-chapter2/tree/4.2/exercises)
  - [4.3. Prometheus](https://github.com/lucksei/k8s-submissions-chapter2/tree/4.3)
  - [4.4. Your canary](https://github.com/lucksei/k8s-submissions-chapter2/tree/4.4/exercises)
  - [4.5. The project, step 22](https://github.com/lucksei/k8s-submissions-chapter2/tree/4.5/project)
  - [4.6. The project, step 23](https://github.com/lucksei/k8s-submissions-chapter2/tree/4.6/project)
  - [4.7. Baby steps to GitOps](https://github.com/lucksei/k8s-submissions-chapter2/tree/4.7/exercises/log-output)
  - [4.8. The project, step 24](https://github.com/lucksei/k8s-submissions-chapter2/tree/4.8/project)
  - [4.9. The project, step 25](https://github.com/lucksei/k8s-submissions-chapter2/tree/4.9/project)

## Exercise notes

### 1.1. Getting Started

Create k3d cluster

```sh
k3d cluster create
```

Build image and push to docker.io repository

```sh
docker build -t lucksei/random-string-generator . && docker push lucksei/random-string-generator:latest
```

> In case of error: `denied: requested access to the resource is denied` try `docker login`.

Create the deployment

```sh
kubectl create deployment random-string-generator --image=lucksei/random-string-generator:latest
```

### 1.2. The project, step 1

Create the `todo-app` image

```sh
docker build -t lucksei/todo-app . && docker push lucksei/todo-app:latest
```

Create the `todo-app` deployment

```sh
kubectl create deployment todo-app --image=lucksei/todo-app:latest
```

### 1.3. Declarative approach

> Execute commands from the root of the project.

Create the `random-string-generator` deployment manifest

```sh
mkdir -p ./random-string-generator/manifests
kubectl create deployment random-string-generator --image=lucksei/random-string-generator:latest --dry-run=client -o yaml > ./random-string-generator/manifests/deployment.yaml
```

Apply deployment manifest

```sh
kubectl apply -f ./random-string-generator/manifests/deployment.yaml
```

Check if deployment is worked

```sh
kubectl get deployments
```

Inspect logs

```sh
kubectl logs -f <random-string-generator-pod-name>
```

### 1.4. The project, step 2

Create the `todo-app` deployment manifest

```sh
mkdir -p ./todo-app/manifests
kubectl create deployment todo-app --image=lucksei/todo-app:latest --dry-run=client -o yaml > ./todo-app/manifests/deployment.yaml
```

Apply deployment manifest

```sh
kubectl apply -f ./todo-app/manifests/deployment.yaml
```

You can check if deployment is worked like in exercise 1.3

### 1.5. The project, step 3

Push to registry new version of todo-app

```sh
docker build -t lucksei/todo-app:latest . && docker push lucksei/todo-app:latest
```

> From `todo-app` directory

Apply changes in manifest

> From root of the project

```sh
kubectl apply -f ./todo-app/manifests/deployment.yaml
```

Port forward the `todo-app` service to localhost:3005

```sh
kubectl port-forward pod/<todo-app-pod-name> 3005:3005
```

### 1.6. The project, step 4

Recreate k3d cluster with ports 8081:80 and 8082:30080

```sh
k3d cluster delete
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

- `agent:0` is the first "agent" (worker node in k3d that is basically a docker container)
- `loadbalancer` is the "loadbalancer" (traefik, nginx, or any other loadbalancer)

Running service with `type: NodePort` exposing on port 30080

```sh
kubectl apply -f ./todo-app/manifests/service.yaml
```

Can now access the service on http://localhost:8082 since agent:0 has port 30080 mapped to 8082 and the service uses `type: NodePort` mapping to port 30080

### 1.7. External access with Ingress

Created service and ingress manifests

Can now access the service via the load balancer port configured previously in step 1.6 `-p 8081:80@loadbalancer`

```sh
http://localhost:8081/status
```

### 1.8. The project, step 5

Deleted the ingress for the random-string-generator

```sh
kubectl delete ingress random-string-generator-ingress
```

Created ingress for the todo-app and modified service to `type: ClusterIP`. Can now access the service on http://localhost:8081 because of k3d cluster config from exercise 1.6 `-p 8081:80@loadbalancer`.

### 1.9. More services

Created new pingpong app and image in `docker.io` repository

On the root of the **pingpong app** (`./pingpong`), not the project

```sh
docker build -t lucksei/pingpong . && docker push lucksei/pingpong:latest
```

Created the `pingpong` deployment and service manifest. Modified ingress (from step 1.8, inside `./todo-app/manifests/ingress.yaml`) with new path for `/pingpong` pointing to `pingpong-svc`. Can now access the pingpong app on http://localhost:8081/pingpong.

### 1.10. Even more services

Renamed the 'random-string-generator' app to 'log-output' to more closely match the material. Split it into two apps:

- `log-output/container0/main.go`: Generates a random string on startup and writes a line with the random string and timestamp into a file.
- `log-ouptut/container1/main.go`: Reads the file and provides the content in the HTTP GET endpoint for the user to see.

Build and push both images to `docker.io` repository. From the `./log-output` directory execute the following commands

```sh
# Log output
docker build -t lucksei/log-output-container0 . -f ./Dockerfile.container0 && docker push lucksei/log-output-container0:latest
# HTTP GET
docker build -t lucksei/log-output-container1 . -f ./Dockerfile.container1 && docker push lucksei/log-output-container1:latest
```

Modified `deployment.yaml` to use two images inside the pod. Changed `service.yaml` and `ingress.yaml` to accomodate for the naming changes. Can now access the log-output app on http://localhost:8081/log-output when applying the manifests from the `./log-output/manifests` directory. (deleted the ingress from the `todo-app`)

### 1.11. Persisting data

Created directory for the local Persistent Volume on the `k3d-k3s-default-agent-0` container

```sh
docker exec -it k3d-k3s-default-agent-0 mkdir -p /tmp/kube
```

also made:

- a prestistent volume manifest `manifests/persistentVolume.yaml`.
- a persistent volume claim `manifests/persistentVolumeClaim.yaml`
- modified the `deployment.yaml` for the pingpong & log-output apps to use the PVC
- moved the ingress from the `todo-app` to the `manifests/ingress.yaml` file to use it as the gateway for all my apps

```
Rules:
  Host        Path  Backends
  ----        ----  --------
  *
              /           todo-app-svc:3000 (10.42.0.26:3005)
              /pingpong   pingpong-svc:3000 (10.42.0.32:3000)
              /status     log-output-svc:2345 (10.42.0.36:3000)
```

The `pingpong` app now saves the number of requests to the GET /pingpoint endpoint into a file `pingpong.log`. The `log-output-container1` app now reads the file and provides the content in the HTTP GET /status endpoint for the user to see. Both images are built and pushed to `docker.io`.

### 1.12 The project, step 6

Modified the `todo-app` to fetch a random image from Lorem Picsum and store it in the static dir. I.e. https://picsum.photos/1200/300. The image is saved inside the app's `/public` directory for 10 minutes and served as a static file for every request. When the time expires the image is presented one last time and then fetched again.

Added a volume to the deployment for the `todo-app` to store said image in the PVC in case the pod is restarted, making it available for the next request as soon as the pod is ready. (Not sure if its ideal to use the same PVC for all apps, but works...).

### 1.13. The project, step 7

Modified app static file and created a really simple form and todo list.

### 2.1. Connecting pods

Commented out code for sharing single file `pingpong.log` between pods. New endpoint `/pings` on the `pingpong` app to get the pingpong count and feature to fetch it from the `log-output` app. Also removed the VolumeClaims (`my-local-pvc`) that were not used anymore inside each `deployment.yaml`. Did not delete the Persistent Volume Claim `my-local-pvc` since it is still used by the `todo-app` storing the `hourly.jpg` image.

Working on http://localhost:8081/pingpong and http://localhost:8081/status

### 2.2 The project, step 8

Hardest exercise so far.

Backtracked a bit, remade the `todo-app` as a modern app with React + Tailwind. Repurposed the express app as a mini backend server that serves the static files and also updates the `hourly.jpg` image every 10 minutes.
I also created a todo-backend that serves via the `/api` from ingress.
Modified all Dockerfiles, manifests and images. Took me more than what i thought it would. But it works now!

App can be accessed on http://localhost:8081/ and calls the backend on:

- GET http://localhost:8081/api/todos
- POST http://localhost:8081/api/todos

### 2.3. Keep them separated

Created new namespace `exercises` for the `pingpong` and the `log-output` apps.

```sh
kubectl create namespace exercises
```

Deleted resources from `default` and created them again in the `exercises` namespace. Also recreated the same ingress so that the apps can be accessed. Like before the apps are accessible on:

- http://localhost:8081/pingpong
- http://localhost:8081/status

### 2.4. The project, step 9

Created new namespace `project` for the `todo-app` and the `todo-backend` apps.

```sh
kubectl create namespace project
```

Deleted resources from `default` and created them again in the `project` namespace. Also recreated the ingress like before. Funny enough i did not know that 'Persistent Volumes' are cluster-wide resources unlike the rest of the resources deployed

### 2.5. Documentation and ConfigMaps

Created a ConfigMap for the `log-output` app with the `information.txt` file contents and the `MESSAGE` environment variable. These map to an env and a volume respectively inside the container `log-output-container1` of the app's deployment. App can be accessed on http://localhost:8081/status

### 2.6. The project, step 10

Created ConfigMaps for the `todo-app` and the `todo-backend`. URLs, ports and other configurations are now customizable via environment variables and are loaded using their respective ConfigMaps.

App available on http://localhost:8081/

### 2.7. Stateful applications

Created StatefulSet `pingpong-postgres-database` for the `pingpong` app. The app now uses sequelize to connect to this database. Reused code from fullstack project for the database connection & migrations.

can now ping using http://localhost:8081/pingpong

### 2.8. The project, step 11

Copied StatefulSet and the code from the pingpong app and applied it to the todo-backend app. It now uses postgres to store the todos.

Testing the database with ephemeral pod

```sh
kubectl run -it --rm --restart=Never --image postgres psql-for-debugging psql postgres://todo:todo@todo-backend-postgres-svc:5432/todo
```

Moved `DATABASE_URI` variable to secrets since it contains the credentials.

- Using SOPS tool to encrypt the `secrets.yaml`: https://github.com/getsops/sops
- Installed age for encryption: https://github.com/FiloSottile/age

Creating a key-pair, this will not be pushed to git so add it to the `.gitignore`

```sh
age-keygen -o key.txt
```

Create Base64 for my secrets

```sh
echo -n '...' | base64
```

```sh
sops --encrypt \
     --age $(awk '/public key/' key.txt | awk -F': ' '{print $2}') \
     --encrypted-regex '^(data)$' \
     secrets.yaml > secrets.enc.yaml
```

to decrypt

```sh
export SOPS_AGE_KEY=$(awk '/AGE-SECRET-KEY-/' key.txt)
cd project/todo-backend/manifests
sops --decrypt secrets.enc.yaml > secrets.yaml
```

### 2.9 The project, step 12

Created a new CronJob resource that pushes a new todo every minute to remind you to read a random wikipedia article. Also reordered the app structure inside a new root directory `todo-project`.

### 2.10. The project, step 13

Installed helm using the docs: https://helm.sh/docs/intro/install/ & updated the repo

To install the [kube-prometheus stack](https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack) first add the repositories, install the chart and update:

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add stable https://charts.helm.sh/stable
helm install my-kube-prometheus-stack prometheus-community/kube-prometheus-stack --version 79.5.0
helm repo update
```

```
NAME: my-kube-prometheus-stack
LAST DEPLOYED: Mon Nov 17 19:15:47 2025
NAMESPACE: prometheus
STATUS: deployed
REVISION: 1
DESCRIPTION: Install complete
NOTES:
kube-prometheus-stack has been installed. Check its status by running:
  kubectl --namespace prometheus get pods -l "release=my-kube-prometheus-stack"

Get Grafana 'admin' user password by running:

  kubectl --namespace prometheus get secrets my-kube-prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo

Access Grafana local instance:

  export POD_NAME=$(kubectl --namespace prometheus get pod -l "app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-kube-prometheus-stack" -oname)
  kubectl --namespace prometheus port-forward $POD_NAME 3000

Get your grafana admin user password by running:

  kubectl get secret --namespace prometheus -l app.kubernetes.io/component=admin-secret -o jsonpath="{.items[0].data.admin-password}" | base64 --decode ; echo


Visit https://github.com/prometheus-operator/kube-prometheus for instructions on how to create & configure Alertmanager and Prometheus instances using the Operator.
```

Installing the loki-stack:

```sh
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm upgrade --install loki --namespace grafana-loki grafana/loki-stack --set loki.image.tag=2.9.3
```

> I could not for the life of me figure out how to use the updated loki helm chart, so i kept the old one from the course material ;\_;

Added the "Datasource" inside of grafana with url: http://loki.grafana-loki.svc.cluster.local:3100/

It now shows the logs from the cluster inside the "Explore" tab.

Modified the app project, forgot to add checks for max chars in the postgres-db and backend, also added the morgan request logger. Using curl to test the app:

Working with normal todo

```sh
curl -X POST http://localhost:8081/api/todos -d '{"todo": "Test normal todo"}' -H "Content-Type: application/json"
```

Failing with too long todo (max 140 characters)

```sh
curl -X POST http://localhost:8081/api/todos -d "{\"todo\": \"$(seq -s ' ' 1 1000)\"}" -H "Content-Type: application/json"
```

This can be seen inside the "Explore" tab of grafana

![exerecise_2_10](img/20251118-00-exercise_2_10.png)

### 3.1. Pingpong GKE

Installed gcloud sdk from here. https://docs.cloud.google.com/sdk/docs/install.

Install plugin for kubectl. https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl

```sh
gcloud components install gke-gcloud-auth-plugin
```

Log in with

```sh
gcloud auth login
...
```

Setting the project with my id

```sh
gcloud config set project dwk-gke-478711
```

Created cluster inside gke

```sh
# Optimized cluster w auto scaling
# Some zones: us-west1 (Oregon), southamerica-east1 (Sao Paulo), southamerica-west1 (Santiago)
ZONE=southamerica-east1
gcloud container clusters create dwk-cluster \
  --zone=$ZONE \
  --cluster-version=1.32 \
  --num-nodes=1 \
  --machine-type=e2-micro
  --disk-size=32 \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=3
```

> The previous command will fail if Kubernetes Engine API has not been used in the project, to enable run

```sh
gcloud services enable container.googleapis.com
```

The installation sets the `kubeconfig` to point to the newly created cluster. Check with `kubectl cluster-info`.

Modified the `service.yaml` for the pingpong app to use the `LoadBalancer` type and respond on port 80.

Also, GKE provisions a persistent disk for Volume Claims automatically, this needs `storageClassName` to **NOT** be specified in the PVC (defaults to `StorageClass`). Info here: https://cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes

To avoid unnecessary costs, delete the cluster when done.

```sh
gcloud container clusters delete dwk-cluster --zone=$ZONE
```

### 3.2. Back to Ingress

**Pingpong app**: Changed service type back to `NodePort`.

**Log Output app**: Replaced constants with environment variables defined inside the ConfigMap. and also changed the service type to `NodePort`.

Created ingress exclusively for the exercises apps in the `exercises` namespace.

> **IMPORTANT** Needed a health check and readiness probe for the apps to work properly under the ingress.

> Also need to allow the health-checks to be accessible through the firewall.

```sh
gcloud compute firewall-rules create fw-allow-health-check \
    --network=default \
    --action=allow \
    --direction=ingress \
    --source-ranges=130.211.0.0/22,35.191.0.0/16 \
    --target-tags=allow-health-check \
    --rules=tcp
```

Starting a new cluster again with the `exercises` namespace.

```sh
ZONE=southamerica-east1
gcloud container clusters create dwk-cluster \
  --zone=$ZONE \
  --cluster-version=1.32 \
  --num-nodes=1 \
  --machine-type=e2-micro \
  --disk-size=32 \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=3

kubectl create namespace exercises
kubectl apply -f ./manifests/exercises-ingress.yaml
kubectl apply -f ./pingpong/manifests
kubectl apply -f ./log-output/manifests
```

To avoid unnecessary costs, delete the cluster when done.

```sh
gcloud container clusters delete dwk-cluster --zone=$ZONE
```

Also deleted the firewall rule (Cost should be low but just in case)

```sh
gcloud compute firewall-rules delete fw-allow-health-check
```

### 3.3. To the Gateway

Created resources Gateway and HTTPRoute to route the exercises apps just like the ingress.

> Side note: Updated postgres to use a lighter image `15.15-alpine3.22` and changed the dir structure a bit.

Create the cluster again

```sh
# W/ autoscaling (slow as far as I tested it)
REGION=southamerica-east1-a
gcloud container clusters create dwk-cluster \
  --cluster-version=1.32 \
  --location=$REGION \
  --num-nodes=1 \
  --machine-type=e2-micro \
  --disk-size=32 \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=3 \
  --gateway-api=standard

# Slightly faster cluster i think (this is the one i used for the exercise)
REGION=southamerica-east1-a
gcloud container clusters create dwk-cluster \
  --cluster-version=1.32 \
  --location=$REGION \
  --num-nodes=3 \
  --machine-type=e2-micro \
  --disk-size=32 \
  --gateway-api=standard
```

Or if the cluster exists, update it

```sh
REGION=southamerica-east1-a
gcloud container clusters update dwk-cluster \
  --location=$REGION \
  --gateway-api=standard
```

Applying the manifests

```sh
kubectl create namepsace exercises
kubectl apply -f ./exercises/log-output/manifests
kubectl apply -f ./exercises/pingpong/manifests
kubectl apply -f ./exercises/manifests
```

(Optional) To avoid unnecessary costs, delete the cluster when done.

```sh
REGION=southamerica-east1-a
gcloud container clusters delete dwk-cluster --location=$REGION
```

### 3.4. Rewritten routing

The HTTPRoute resource for the pingpong app now has route rewriting from `/pingpong` to `/`. Also changed the paths in the app to accomodate this change:

- `/pingpong` -> `/`
- `/` -> `/health`

> Important note: Do **NOT** use the `gke-l7-gxlb` gatewayClassName, it does not support route filters like `ReplacePrefixMatch`. Instead use the `gke-l7-global-external-managed` which seems to be a more modern one. Took me a while to figure this out ;\_;.

```
Events:
  Type     Reason  Age                  From                   Message
  ----     ------  ----                 ----                   -------
  Normal   SYNC    17m (x27 over 83m)   sc-gateway-controller  exercises/exercises-gateway
  Normal   SYNC    13m (x27 over 80m)   sc-gateway-controller  SYNC on exercises/exercises-gateway was a success
  Warning  SYNC    2m44s (x4 over 11m)  sc-gateway-controller  failed to translate Gateway "exercises/exercises-gateway": Error GWCER104: HTTPRoute "exercises/pingpong-route" is misconfigured, err: classic GXLB (GatewayClass gke-l7-gxlb) does not support rule filters, GFEv3 based External LB (GatewayClass gke-l7-global-external-managed) supports rule filters.
```

> Semi important note: You need to delete the old Gateway and apply the new one again. This process took me up to 10m until the project was functional again, as GKE needs to create the Gateway and health checks on the background.

### 3.5. The project, step 14

Updating the project to deploy it into GKE with the Gateway API. Also added the `kustomization.yaml` file that can be applied with:

```sh
kubectl create namespace project
kubectl apply -k .
```

Again, so i don't forget:

```sh
REGION=southamerica-east1-a
gcloud container clusters create dwk-cluster \
  --cluster-version=1.32 \
  --location=$REGION \
  --num-nodes=3 \
  --machine-type=e2-micro \
  --disk-size=32 \
  --gateway-api=standard
```

```sh
REGION=southamerica-east1-a
gcloud container clusters delete dwk-cluster --location=$REGION
```

### 3.6. The project, step 15

> New github action workflow, pretty long exercise, explanations below

Create a new service account: https://docs.cloud.google.com/iam/docs/keys-create-delete

IAM Roles for the Service Account

- Kubernetes Engine Service Agent
- Storage Admin
- Artifact Registry Administrator
- Artifact Registry Create-on-Push Repository Administrator

> Console menu: https://console.cloud.google.com/iam-admin/iam?project=dwk-gke-478711

#### Google Cloud IAM Cheatsheet

> List of available Google actions: https://github.com/google-github-actions

Create new service account

```sh
gcloud iam service-accounts create dwk-gke-sa \
  --display-name="Dwk GKE Service Account" \
  --description="Dwk GKE Service Account" \
  --project=dwk-gke-478711
```

List the service accounts (should appear a new one)

```sh
gcloud iam service-accounts list
```

Assign the roles

```sh
gcloud projects add-iam-policy-binding dwk-gke-478711 \
  --member="serviceAccount:dwk-gke-sa@dwk-gke-478711.iam.gserviceaccount.com" \
  --role="roles/container.serviceAgent"

gcloud projects add-iam-policy-binding dwk-gke-478711 \
  --member="serviceAccount:dwk-gke-sa@dwk-gke-478711.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding dwk-gke-478711 \
  --member="serviceAccount:dwk-gke-sa@dwk-gke-478711.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"

gcloud projects add-iam-policy-binding dwk-gke-478711 \
  --member="serviceAccount:dwk-gke-sa@dwk-gke-478711.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.createOnPushRepoAdmin"
```

Quickly check the roles

```sh
gcloud projects get-iam-policy dwk-gke-478711 \
  --filter="bindings.members:dwk-gke-sa@dwk-gke-478711.iam.gserviceaccount.com"
```

Create the service account key with gcloud (added to .gitignore)

> Create a new service account key documentation: https://docs.cloud.google.com/iam/docs/keys-create-delete

```sh
gcloud iam service-accounts keys create ./private-key.json --iam-account dwk-gke-sa@dwk-gke-478711.iam.gserviceaccount.com
```

#### Artifact Registry Configuration

Now we enable "Artifact Registry" _(Container Registry seems to be deprecated now)_

https://docs.cloud.google.com/artifact-registry/docs
https://docs.cloud.google.com/artifact-registry/docs/docker/store-docker-container-images

```sh
gcloud services enable artifactregistry.googleapis.com
```

Create a new repository in Artifact Registry

```sh
ZONE=southamerica-east1
PROJECT_ID=dwk-gke-478711
gcloud artifacts repositories create dwk-repo \
  --repository-format=docker \
  --location=$ZONE \
  --description="Dwk GKE Service Account" \
  --project=$PROJECT_ID
```

To verify

```sh
gcloud artifacts repositories list \
  --project=$PROJECT_ID
```

Configure docker to use the new Artifact Registry (This step is done in GitHub Action, you dont have to do it manually)

```sh
gcloud auth configure-docker $ZONE-docker.pkg.dev
```

To send the image to Artifact Registry we need to tag it.

The tag will look something like this for my specific case but will vary

```sh
southamerica-east1-docker.pkg.dev/dwk-gke-478711/dwk-repo/<image>:<version>
|===============================| |============| |======| |===============|
            Host name               Project ID  Repository      Image
```

- `southamerica-east1-docker.pkg.dev` is the host name of the container where the image will be stored.
- `dwk-gke-478711` is the project ID.
- `dwk-repo` is the repository.
- `<image>:<version>` is the name of the image with his tag, if not specified it will be tagged `latest`.

#### Finally create the cluster if not already created

Changed machine type to deploy a bit faster and changed node provisioning model to **Spot VMs**

```sh
ZONE=southamerica-east1-a
gcloud container clusters create dwk-cluster \
  --cluster-version=1.32 \
  --location=$ZONE \
  --num-nodes=3 \
  --machine-type=e2-medium \
  --spot \
  --disk-size=32 \
  --gateway-api=standard
kubectl create namespace project
```

Delete the cluster if needed

```sh
ZONE=southamerica-east1-a
gcloud container clusters delete dwk-cluster --location=$ZONE
```

Delete the Artifact Registry if needed

```sh
ZONE=southamerica-east1
gcloud artifacts repositories delete dwk-repo --location=$ZONE
```

### 3.7. The project, step 16

Modified the workflow to create a namespace for the branch that is being deployed.

### 3.8. The project, step 17

Added new workflow to delete the namespace when the branch is deleted.

### 3.9. DBaaS vs DIY

Things to consider for the comparison:

- Required costs for the DBaaS/DIY solution.
- Required maintainance for the DBaaS/DIY solution in the long run.
- Required work/effort for the initial setup of the DBaaS/DIY solution.

#### Costs

Using the pricing calculator: https://cloud.google.com/products/calculator:

**DBaaS**:

- southamerica-east1
- enterprise (standard)
- General purpose db-f1-micro
- 1GB SSD
- no HA (High availability)

Estimated cost is $11.79 per month.

**DIY**:

- southamerica-east1-a
- e2-medium (spot VMs)
- 3 nodes
- 32GB disk
- 1GB SSD Persistent Volume Claim for the DB

Estimated cost is $105.18 per month.

> Note that this includes the rest of the deployment (cluster, Artifact Registry, etc) which are not included in the DBaaS solution. so its not a direct comparison but useful to understand the differences, the costs of running the DIY solution are probably a lot cheaper than the ones calculated here, but probably a tiny bit higher than the DBaaS.

#### Maintenance

**DBaaS**:

Cloud SQL (https://cloud.google.com/sql/docs) offers the following capabilities out of the box:

- Backups
- High availability and failover
- Network connectivity
- Export and import capabilities
- Maintenance and updates
- Monitoring
- Logging

**DIY**:

You need to care of the DB maintenance yourself. You have full control over how you decide to manage the DB but this can be a lot more complex, time consuming and error prone than using a DBaaS.

#### Required work

**DBaaS**:

First enable the Cloud SQL API

```sh
gcloud services enable sqladmin.googleapis.com
```

To create a Cloud SQL Postgres 15 instance with ID `todo-backend-postgres` that has 2 CPUs, 8Gib of RAM, and is in the zone `southamerica-east1`, where the 'postgres' user has its password set to `todo`, run:

```sh
gcloud sql instances create todo-backend-postgres \
  --zone=southamerica-east1-a \
  --database-version=POSTGRES_15 \
  --cpu=2 \
  --memory=8GiB \
  --storage-size=10GiB \
  --storage-type=HDD \
  --root-password=todo
```

An even cheaper (General purpose - Shared Core) instance can be created with the following command:

```sh
gcloud sql instances create todo-backend-postgres \
  --zone=southamerica-east1-a \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --storage-size=10GiB \
  --storage-type=HDD \
  --root-password=todo
```

To delete the instance run:

```sh
gcloud sql instances delete todo-backend-postgres
```

To connect the Cloud SQL instance to GKE, It's not as simple as the DYI solution. One way we can do this is with the Cloud SQL Proxy solution, which requires us to add the tool using the sidecar container pattern. We can check the documentation [here](https://docs.cloud.google.com/sql/docs/mysql/connect-kubernetes-engine).

Created new IAM Service Account

```sh
gcloud iam service-accounts create dwk-cloudsql-sa \
  --display-name="Dwk Cloud SQL Service Account" \
  --description="DevOps with Kubernetes Cloud SQL Service Account" \
  --project=dwk-gke-478711
```

```sh
gcloud iam service-accounts list
```

Assign the role (Cloud SQL Client IAM role)

```sh
gcloud projects add-iam-policy-binding dwk-gke-478711 \
  --member="serviceAccount:dwk-cloudsql-sa@dwk-gke-478711.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"
```

Quickly check the roles

```sh
gcloud projects get-iam-policy dwk-gke-478711 \
  --filter="bindings.members:dwk-cloudsql-sa@dwk-gke-478711.iam.gserviceaccount.com"
```

Create the service account key with gcloud (added to .gitignore)

> Create a new service account key documentation: https://docs.cloud.google.com/iam/docs/keys-create-delete

```sh
gcloud iam service-accounts keys create ./cloudsql-private-key.json --iam-account dwk-cloudsql-sa@dwk-gke-478711.iam.gserviceaccount.com
```

It's recommended to use a Workload Identity instead, but for simplicity the key will suffice. We can create a secret containing the key manually with the following command:

```sh
kubectl create secret generic cloudsql-credentials \
  --namespace=project \
  --from-file=cloudsql-private-key.json=./cloudsql-private-key.json
```

We also encode the connection string and add it to our secrets

```sh
echo -n 'postgresql://postgres:todo@127.0.0.1:5432/postgres' | base64
```

This is still a very simplified version of what you would have to do to add Cloud SQL to a production GKE cluster and there might be some additional steps to reinforce security and prevent for example, unauthorized access. But it works...

**DIY**:

- Requires at least one `StatefulSet` resource with a `VolumeClaimTemplate` for the DB storage and a `Service` for the DB connection. As for configuration it depends on the database used, but for Postgres you can pretty much have it running with `POSTGRES_PASSWORD`, `POSTGRES_USER` and `POSTGRES_DB` environment variables. Optionally you can also use a `Secret` to store the credentials.

#### Summary

| Points of comparison | DBaaS - Cloud SQL (Postgres 15)                                                                                                                                                                                   | DIY - Container in GKE (Postgres 15)                                                                                                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Costs                | Estimated cost is **an extra** $11.79 per month.                                                                                                                                                                  | Estimated cost is at least less than $105.18 per month **but for the whole cluster** making this a poor comparison.                                                                                             |
| Maintenance          | Cloud SQL (https://cloud.google.com/sql/docs) offers: Automatic backups - High availability and failover - Network connectivity - Export and import capabilities - Maintenance and updates - Monitoring - Logging | You need to care of the DB maintenance yourself. You have full control over how you decide to manage the DB but this can be a lot more complex, time consuming and error prone and insecure than using a DBaaS. |
| Required Work        | Setting the Cloud SQL instance was cumbersome and required a lot of steps to get it up and connect it to the cluster. Once set up the database was running smoothly                                               | The DIY solution was easier to implement and honestly a lot more straightforward than the Cloud SQL one in my opinion.                                                                                          |

### 3.10. The project, step 18

Enable the GCP Object Storage API to be able to push our backups

```sh
gcloud services enable storage.googleapis.com
```

Create a new bucket, this bucket needs a global unique name, we can use a combination of the name and the project ID for example

```sh
PROJECT_ID=$(gcloud config get-value project)
gcloud storage buckets create gs://todo-backups-$PROJECT_ID/ --uniform-bucket-level-access
```

Add a new IAM Policy Binding to the bucket and the SA allowing the Service Account to have admin access to the bucket.

```sh
PROJECT_ID=$(gcloud config get-value project)
gcloud storage buckets add-iam-policy-binding gs://todo-backups-$PROJECT_ID \
  --member="serviceAccount:dwk-gke-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

```

Create key secret for the Service Account, allowing the CronJob to push the backups to the bucket

```sh
gcloud iam service-accounts keys create ./private-key.json --iam-account dwk-gke-sa@dwk-gke-478711.iam.gserviceaccount.com
```

```sh
kubectl create secret generic gke-credentials \
  --from-file=gke-private-key.json=./gke-private-key.json \
  -n project
```

To test out the CronJob

```sh
kubectl create job test-job --from=cronjob/todo-backend-postgres-backup
```

![exerecise_3_10](img/20251201-02-exercise_3_10.png)

#### Pull up everything again...

Reminding myself the commands to recreate the project in GKE (Cluster + Artifact Registry + Storage Bucket + gke-credentials secret)

> Last two are in the previous section, not shown here, but will keep track in future exercises

```sh
ZONE=southamerica-east1-a
gcloud container clusters create dwk-cluster \
  --cluster-version=1.32 \
  --location=$ZONE \
  --num-nodes=3 \
  --machine-type=e2-medium \
  --spot \
  --disk-size=32 \
  --gateway-api=standard
```

```sh
ZONE=southamerica-east1
PROJECT_ID=$(gcloud config get-value project)
gcloud artifacts repositories create dwk-repo \
  --repository-format=docker \
  --location=$ZONE \
  --description="Dwk GKE Service Account" \
  --project=$PROJECT_ID
```

Delete cluster, repo and bucket to save costs when not in use

```sh
ZONE=southamerica-east1-a
gcloud container clusters delete dwk-cluster --location=$ZONE
```

```sh
ZONE=southamerica-east1
gcloud artifacts repositories delete dwk-repo --location=$ZONE
```

```sh
PROJECT_ID=$(gcloud config get-value project)
gcloud storage rm -r gs://todo-backups-$PROJECT_ID/
```

### 3.11. The project, step 19

https://youtu.be/xjpHggHKm78

https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

Testing the project with the following limits (debating this with ol' LLMs...)

**Backend**:

- todo-backend:
  - requests: 100m CPU, 128Mi memory
  - limits: 200m CPU, 256Mi memory
- todo-backend-postgres:
  - requests: 200m CPU, 512Mi memory
  - limits: 500m CPU, 1Gi memory
- todo-backend-postgres-backup
  - requests: 50m CPU, 64Mi memory
  - limits: 100m CPU, 128Mi memory

**Frontend**:

- todo-app:
  - requests: 50m CPU, 64Mi memory
  - limits: 100m CPU, 128Mi memory

**Misc**:

- todo-app-cronjob
  - requests: 50m CPU, 32Mi memory
  - limits: 100m CPU, 64Mi memory

**Total Requirements:** 700m CPU requests, ~700Mi memory requests

When using `kubectl top pods`

```
(main)➜ kubectl top pods
NAME                            CPU(cores)   MEMORY(bytes)
todo-app-599cfd6c6d-bf7xf       1m           41Mi
todo-backend-677f87b95c-szkzj   1m           48Mi
todo-backend-postgres-0         1m           34Mi
```

### 3.12. The project, step 20

https://docs.cloud.google.com/kubernetes-engine/docs/concepts/observability

![exerecise_3_12](img/20251201-03-exercise_3_12.png)

### 4.1. Readines probe

> I already set this in exercise "3.2. Back to Ingress". This is because i needed to add a ReadinessProbe for the Ingress, GKE copies some parameters from the ReadinessProbe to the Health Checks, without this config the app never responds to the Load Balancer and its not accessible from the public IP provided.
> NOTE: I also added a LivenessProbe when testing, this is not required but i didn't know yet...

Revisiting the ReadinessProbe for the PingPong, now it should be ready when it has a connection to the database

Recreate k3d cluster again with 2 nodes, disable traefik and apply the Gateway API

```sh
k3d cluster create my-cluster\
  --port 8080:80@loadbalancer \
  --port 8443:443@loadbalancer \
  --k3s-arg "--disable=traefik@server:*" \
  --agents 2
```

Install the Gateway API from kubernetes-sigs repo

```sh
kubectl apply --server-side -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.4.0/standard-install.yaml
```

Install the NGINX Gateway Fabric. More info about the Gateway [here](https://docs.nginx.com/nginx-gateway-fabric/get-started)

```sh
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric --create-namespace -n nginx-gateway --wait
```

> Instructions for installing the NGINX Gateway Fabric with helm on the [Chart's Artifact Hub](https://artifacthub.io/packages/helm/nginx-gateway-fabric/nginx-gateway-fabric)

The NGINX Gateway Fabric uses `gatewayClassName: nginx` instead of `gatewayClassName: gke-l7-global-external-managed` in the yaml manifest, this should technically be the only modification needed for the deployment to work locally instead of GKE.

Can now execute `./exercises/init.sh` to build, push & deploy the PingPong & LogOutput apps on the `exercises` namespace

To delete the cluster when done, run

```sh
k3d cluster delete my-cluster
```

### 4.2. The project, step 21

Creating the required Health Check Probes for the exercises apps because i misread tht exercise instructions... doing the same for the 'Project Apps'.

### 4.3. Prometheus

Setting up Prometheus using helm, link to the repo [here](https://github.com/prometheus-community/helm-charts)

There are also instructions in the Artifact Hub [here](https://artifacthub.io/packages/helm/prometheus-community/prometheus)

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

```sh
helm install my-prometheus prometheus-community/prometheus --version 27.49.0 -n prometheus
```

Check the status of the deployment

```sh
helm list --all-namespaces
```

port forward the prometheus gui to port 9090

```sh
PROMETHEUS_SVC=service/my-prometheus-server
kubectl --namespace prometheus port-forward $PROMETHEUS_SVC 9090:80
```

We can now query for the ammount of pods created by StatefulSets

```promql
sum(kube_pod_info{created_by_kind="StatefulSet"})
```

![exerecise_4_3](img/20251203-04-exercise_4_3.png)

### 4.4. Your canary

```promql
sum by (namespace) (rate(container_cpu_usage_seconds_total{image!=""}[5m]))*100
```

Installing Argo Rollouts

```sh
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
```

Execute the new init.sh script.

```sh
./exercises/init.sh
```

After the deployment completes it should start rolling out the "pingpong deployment" with the canary strategy

To test out a "new" version try pushing the image with a new tag

```sh
docker build -t lucksei/pingpong:test-tag .
docker push lucksei/pingpong:test-tag
```

Then test the rollout with the new image name

```sh
kubectl argo rollouts set image pingpong-deployment \
  pingpong=lucksei/pingpong:test-tag -n exercises
```

We can see the first pod was scaled up with `kubectl get pods` (25% of the pods were scaled up)

```
...
pingpong-deployment-5d88b5bc8f-dglmn      0/1     ContainerCreating   0             6s
pingpong-deployment-b6df757cf-2rkch       1/1     Running             3 (96s ago)   2m5s
pingpong-deployment-b6df757cf-ft2z4       1/1     Running             3 (90s ago)   2m5s
pingpong-deployment-b6df757cf-tpgdr       1/1     Running             3 (86s ago)   2m5s
...
```

Then using kubectl describe to inspect the canary deployment we can see that the Analysis is in progress, it will succeed only if the CPU usage of the namespace `exercises` is lower than 10% , which is set to fail on purpose. `kubectl describe rollouts.argoproj.io pingpong-deployment`

```sh
Events:
  Type     Reason                  Age    From                 Message
  ----     ------                  ----   ----                 -------
  Normal   RolloutAddedToInformer  4m44s  rollouts-controller  Rollout resource added to informer: exercises/pingpong-deployment
  Normal   RolloutUpdated          4m44s  rollouts-controller  Rollout updated to revision 1
  Normal   NewReplicaSetCreated    4m44s  rollouts-controller  Created ReplicaSet pingpong-deployment-b6df757cf (revision 1)
  Normal   RolloutNotCompleted     4m44s  rollouts-controller  Rollout not completed, started update to revision 1 (b6df757cf)
  Normal   ScalingReplicaSet       4m44s  rollouts-controller  Scaled up ReplicaSet pingpong-deployment-b6df757cf (revision 1) from 0 to 4
  Normal   RolloutCompleted        4m44s  rollouts-controller  Rollout completed update to revision 1 (b6df757cf): Initial deploy
  Normal   RolloutUpdated          2m45s  rollouts-controller  Rollout updated to revision 2
  Normal   NewReplicaSetCreated    2m45s  rollouts-controller  Created ReplicaSet pingpong-deployment-5d88b5bc8f (revision 2)
  Normal   RolloutNotCompleted     2m45s  rollouts-controller  Rollout not completed, started update to revision 2 (5d88b5bc8f)
  Normal   ScalingReplicaSet       2m45s  rollouts-controller  Scaled down ReplicaSet pingpong-deployment-b6df757cf (revision 1) from 4 to 3
  Normal   ScalingReplicaSet       2m45s  rollouts-controller  Scaled up ReplicaSet pingpong-deployment-5d88b5bc8f (revision 2) from 0 to 1
  Normal   RolloutStepCompleted    2m30s  rollouts-controller  Rollout step 1/5 completed (setWeight: 25)
  Normal   RolloutPaused           2m30s  rollouts-controller  Rollout is paused (CanaryPauseStep)
  Normal   RolloutStepCompleted    2m     rollouts-controller  Rollout step 2/5 completed (pause: 30s)
  Normal   RolloutResumed          2m     rollouts-controller  Rollout is resumed
  Normal   AnalysisRunRunning      2m     rollouts-controller  Step Analysis Run 'pingpong-deployment-5d88b5bc8f-2-2' Status New: 'Running' Previous: ''
  Warning  AnalysisRunFailed       0s     rollouts-controller  Step Analysis Run 'pingpong-deployment-5d88b5bc8f-2-2' Status New: 'Failed' Previous: 'Running'
  Warning  RolloutAborted          0s     rollouts-controller  Rollout aborted update to revision 2: Metric "cpu-usage" assessed Failed due to failed (1) > failureLimit (0)
  Normal   ScalingReplicaSet       0s     rollouts-controller  Scaled up ReplicaSet pingpong-deployment-b6df757cf (revision 1) from 3 to 4
  Normal   ScalingReplicaSet       0s     rollouts-controller  Scaled down ReplicaSet pingpong-deployment-5d88b5bc8f (revision 2) from 1 to 0
```

```sh
pingpong-deployment-b6df757cf-2rkch       1/1     Running   3 (5m18s ago)   5m47s
pingpong-deployment-b6df757cf-ft2z4       1/1     Running   3 (5m12s ago)   5m47s
pingpong-deployment-b6df757cf-qxmk5       1/1     Running   0               63s
pingpong-deployment-b6df757cf-tpgdr       1/1     Running   3 (5m8s ago)    5m47s
```

### 4.5. The project, step 22

Updating the Todo App Project

#### Restart Cluster

> `k3d cluster delete my-cluster`

Recreate k3d cluster again with 2 nodes, disable traefik and apply the Gateway API

```sh
k3d cluster create my-cluster\
  --port 8080:80@loadbalancer \
  --port 8443:443@loadbalancer \
  --k3s-arg "--disable=traefik@server:*" \
  --agents 2
```

Install the Gateway API from kubernetes-sigs and the NGINX Gateway Fabric

```sh
kubectl apply --server-side -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.4.0/standard-install.yaml
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric --create-namespace -n nginx-gateway --wait
```

Get Prometheus chart

```sh
kubectl create namespace prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install my-prometheus prometheus-community/prometheus --version 27.49.0 -n prometheus
```

Installing Argo Rollouts

```sh
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
```

### 4.6. The project, step 23

Installed the official NATS messaging system (Bitnami one was failing when pulling images). https://artifacthub.io/packages/helm/nats/nats

```sh
kubectl create namespace nats
helm repo add nats https://nats-io.github.io/k8s/helm/charts/
helm install my-nats nats/nats --version 2.12.2 --namespace nats
```

To access the NATS dashboard, run

```sh
kubectl port-forward --namespace nats svc/my-nats-headless 8222:8222
```

NATS can be accessed via port 4222 on the following DNS name from within your cluster: `my-nats.nats.svc.cluster.local`

I used Discord webhooks to test out the subscriber, i used [Discord.js](https://discordjs.guide/legacy/popular-topics/webhooks) to connect and send the messages.

For embeds i used this guide [here](https://discordjs.guide/legacy/popular-topics/embeds)

#### Important Update.

I did not try the deployment with multiple replicas of `todo-broadcaster`. Found out later that its sending multiple messages when it should be consumed by one broadcaster only. NATS allows this using [queue groups](https://docs.nats.io/nats-concepts/core-nats/queue/queues_walkthrough).

> NATS supports a form of load balancing using queue groups. Subscribers register a queue group name. A single subscriber in the group is randomly selected to receive the message.

Once all the subscribers are registered to the same queue group, only one of them will receive the message.

### 4.7. Baby steps to GitOps

> **IMPORTANT NOTE**: I misread the instruction and implemented GitOps first on the "project", the exercise said to do "log-output" first. I'm sorry for the confusion. Therefore this part is basically the full "project" work, copy and pasted and modified to work with the "exercises/log-output". Because most of the work and instructions are the same, i left all documentation on 4.8 since it's where I made all the changes and tested everything. This section is for reference only. But all requirements for 4.7 are met.

(Important) If uninstalled, install Argo Rollouts for the ping pong deployment

```sh
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
```

Installing ArgoCD in the cluster [Getting Started](https://argo-cd.readthedocs.io/en/stable/getting_started/)

```sh
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

In K3d I just port-forwarded the service to expose the API server, for cloud deployments you could use the LoadBalancer as well

```sh
kubectl port-forward svc/argocd-server -n argocd 9443:443
```

The ArgoCD username is `admin` and the password is autogenerated in the secret named `argocd-initial-admin-secret`.

```sh
kubectl get secret argocd-initial-admin-secret --namespace argocd -o json | jq -r .data.password | base64 -d
```

Added the 'exercises' as a new "App". The configuration is as follows

```yaml
project: default
source:
  repoURL: https://github.com/lucksei/k8s-submissions-chapter2
  path: exercises
  targetRevision: HEAD
destination:
  server: https://kubernetes.default.svc
syncPolicy:
  automated:
    enabled: true
```

### 4.8. The project, step 24

Installing ArgoCD in the cluster [Getting Started](https://argo-cd.readthedocs.io/en/stable/getting_started/)

```sh
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

In K3d I just port-forwarded the service to expose the API server, for cloud deployments you could use the LoadBalancer as well

```sh
kubectl port-forward svc/argocd-server -n argocd 9443:443
```

The ArgoCD username is `admin` and the password is autogenerated in the secret named `argocd-initial-admin-secret`.

```sh
kubectl get secret argocd-initial-admin-secret --namespace argocd -o json | jq -r .data.password | base64 -d
```

Added the project as a new "App". The configuration is as follows

```yaml
project: default
source:
  repoURL: https://github.com/lucksei/k8s-submissions-chapter2
  path: project
  targetRevision: HEAD
destination:
  server: https://kubernetes.default.svc
syncPolicy:
  automated:
    enabled: true
```

### 4.9. The project, step 25

Restructured project to use Multibase to deploy to different namespaces with ArgoCD. Decoupled configurations into their own directory, using `base` as the main configs, then `overlays/production` and `overlays/staging` for production and staging environments.

```
project/base
├── kustomization.yaml
├── manifests
│   ├── configMap.yaml
│   ├── cronJob.yaml
│   └── gateway.yaml
├── todo-app
│   └── manifests
│       ├── configMap.yaml
│       ├── deployment.yaml
│       ├── persistentVolumeClaim.yaml
│       ├── secret.yaml
│       └── service.yaml
├── todo-backend
│   └── manifests
│       ├── backupsCronJob.yaml
│       ├── configMap.yaml
│       ├── database.yaml
│       ├── deployment.yaml
│       ├── secret.yaml
│       └── service.yaml
├── todo-broadcaster
│   └── manifests
│       ├── deployment.yaml
│       └── secret.yaml
└── todo_job.sh
```

#### Cheatsheet for deploying again

```sh
k3d cluster create my-cluster\
  --port 8080:80@loadbalancer \
  --port 8443:443@loadbalancer \
  --k3s-arg "--disable=traefik@server:*" \
  --agents-memory 4G \
  --servers-memory 4G \
  --agents 2
```

Install the Gateway API from kubernetes-sigs and the NGINX Gateway Fabric

```sh
kubectl apply --server-side -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.4.0/standard-install.yaml
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric --create-namespace -n nginx-gateway --wait
```

Installing ArgoCD in the cluster [Getting Started](https://argo-cd.readthedocs.io/en/stable/getting_started/)

```sh
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Run nats messaging

```sh
kubectl create namespace nats
helm repo add nats https://nats-io.github.io/k8s/helm/charts/
helm install my-nats nats/nats --version 2.12.2 --namespace nats
```

Deploy the applications for 'Production' and 'Staging'

```sh
kubectl create namespace staging
kubectl create namespace production
kubectl apply -f project/manifests/application.yaml
```

Expose the API server for ArgoCD

```sh
kubectl port-forward svc/argocd-server -n argocd 9443:443
```

Get the secret for the admin user

```sh
kubectl get secret argocd-initial-admin-secret --namespace argocd -o json | jq -r .data.password | base64 -d
```

Test out staging

```sh
kubectl port-forward svc/project-gateway-nginx -n staging 8081:81
```

### 4.10. The project, the grande finale

For the final part of the project. I split it up into two separate repositories.

- Codebase: https://github.com/lucksei/dwk-the-project-codebase
- Configurations: https://github.com/lucksei/dwk-the-project-configurations

Added a PAT token that allows me to push changes to the kustomization.yaml files from the codebase repository. This triggers a new deployment inside ArgoCD which is always in sync with HEAD.
