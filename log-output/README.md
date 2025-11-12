# Log Output app

To run the app locally

```sh
go run ./cmd/container0
go run ./cmd/container1
```

To build and push the images

```sh
# Log output
docker build -t lucksei/log-output-container0 . -f ./Dockerfile.container0 && docker push lucksei/log-output-container0:latest

# HTTP GET
docker build -t lucksei/log-output-container1 . -f ./Dockerfile.container1 && docker push lucksei/log-output-container1:latest
```
