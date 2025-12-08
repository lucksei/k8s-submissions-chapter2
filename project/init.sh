#!/bin/bash
# Simplified initialization script for the project environment

set -e 

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
echo "Running initialization script from ${SCRIPT_DIR}"

####
# Build the docker images
####

echo "Building docker images..."
# Todo App ("Frontend" Server)
docker build -t lucksei/todo-app \
  -f "${SCRIPT_DIR}/todo-app/Dockerfile" \
  "${SCRIPT_DIR}/todo-app"
# Todo Backend
docker build -t lucksei/todo-backend \
  -f "${SCRIPT_DIR}/todo-backend/Dockerfile" \
  "${SCRIPT_DIR}/todo-backend"
# Todo Broadcaster
docker build -t lucksei/todo-broadcaster \
  -f "${SCRIPT_DIR}/todo-broadcaster/Dockerfile" \
  "${SCRIPT_DIR}/todo-broadcaster"

####
# Upload images to docker registry
####
docker push lucksei/todo-app:latest
docker push lucksei/todo-backend:latest
docker push lucksei/todo-broadcaster:latest

####
# Run kustomization
####

kubectl create namespace project || true
kubectl apply -k ${SCRIPT_DIR}