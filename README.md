# Devops with Kubernetes - K8s Solutions

The repository contains **all chapters** from the course, not just the ones from chapter 2. The name k8s-submissions-chapter2 comes from the fact that i wrongly expected each chapter to be a separate repository. I decided to not fix it and keep the name as it is since it would break the links & i would have to fix releases manually i believe.

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
