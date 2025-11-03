# K8s Solutions - Chapter 2 - Kubernetes Basics

## Exercises

- [1.1. Getting Started](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.1/random-string-generator)
- [1.2. The project, step 1](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.2/todo-app)
- [1.3. Declarative approach](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.3/random-string-generator)
- [1.4. The project, step 2](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.4/todo-app)
- [1.5. The project, step 3](https://github.com/lucksei/k8s-submissions-chapter2/tree/1.5/todo-app)

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

## 1.4. The project, step 2

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

## 1.5. The project, step 3

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

## 1.6. The project, step 4

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
