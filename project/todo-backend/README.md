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

Test api in dev mode (using container database)

```sh
docker run --rm -d -p 5432:5432 --name todo-backend-postgres \
 -e POSTGRES_USER=todo \
 -e POSTGRES_PASSWORD=todo \
 -e POSTGRES_DB=todo \
 postgres:15.15-alpine3.22
```

```sh
npm run dev
```
