# The Project - To-Do App

Build & push to docker.io repository

```sh
docker build -t lucksei/todo-app . && docker push lucksei/todo-app:latest
```

Force update image (GKE can be stubborn)
```sh
DIGEST=$(docker inspect lucksei/todo-app:latest --format='{{index .RepoDigests 0}}')
kubectl set image deployment/todo-app todo-app=${DIGEST} -n project
```