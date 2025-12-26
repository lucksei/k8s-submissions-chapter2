# Greeter App

> Just a simple app that responds with a HTTP GET request and shows a specific version as a message

To run the app locally

```sh
go run ./cmd
```

To build and push the image

```sh
docker build -t lucksei/greeter:v1 . && docker push lucksei/greeter:v1
docker build -t lucksei/greeter:v2 . && docker push lucksei/greeter:v2
```
