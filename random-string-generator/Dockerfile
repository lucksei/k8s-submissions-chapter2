# --- Building Stage ---
FROM golang:1.25-alpine3.22 AS building_stage

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -v -o /app 

# --- Runtime Stage ---
FROM alpine:3.22

RUN adduser -D app

COPY --from=building_stage --chown=app:app /app /usr/local/bin/app

USER app

ENTRYPOINT ["app"]
