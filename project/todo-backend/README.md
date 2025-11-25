# Todo Backend

push image to docker.io registry

```sh
docker build --no-cache -t lucksei/todo-backend . && docker push lucksei/todo-backend:latest
```

Force update image (GKE can be stubborn)
```sh
DIGEST=$(docker inspect lucksei/todo-backend:latest --format='{{index .RepoDigests 0}}')
kubectl set image deployment/todo-backend todo-backend=${DIGEST} -n project
```

Test deployment manually

```sh
kubectl port-forward service/todo-backend-svc 3456:3000
```

Test API manually

```sh
curl -X POST "http://localhost:3001/api/todos" \
  -H "Content-Type: application/json" \
  -d '{"todo": "new todo test"}'
```
