# Exercise 5.1 "Dummy Site" App

Simple http server using starlette and uvicorn for the exercise 5.1 where a dummy site's HTML content is fetched from the internet, then displayed on the server.

Environment Variables

- `WEBSITE_URL`: The URL of the website to fetch HTML content from. Crashes if not set
- `PORT`: The port to run the server on. Defaults to 42069

Build & push image

```sh
docker build -t lucksei/dummysite:latest . && docker push lucksei/dummysite:latest
```

Run the image

```sh
docker run -p 8080:42069 --env WEBSITE_URL="https://en.wikipedia.org/wiki/Kubernetes" lucksei/dummysite:latest
```
