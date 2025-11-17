# Todo Backend

push image to docker.io registry

```sh
docker build -t lucksei/todo-backend . && docker push lucksei/todo-backend:latest
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
