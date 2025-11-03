# K8s Solutions - Chapter 2 - Kubernetes Basics

## Exercises

- [1.1. Getting Started](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.1/random-string-generator)
- [1.2. The project, step 1](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.2/todo-app)

## 1.1. Getting Started

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

## 1.2. The project, step 1

Create the `todo-app` image

```sh
docker build -t lucksei/todo-app . && docker push lucksei/todo-app:latest
```

Create the `todo-app` deployment

```sh
kubectl create deployment todo-app --image=lucksei/todo-app:latest
```

## 1.3. Declarative approach

> Execute commands from the root of the project.

Create the `random-string-generator` deployment manifest

```sh
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
