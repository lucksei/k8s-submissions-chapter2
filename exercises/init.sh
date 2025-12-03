#!/bin/bash
# Simplified initialization script for the exercise environment

set -e

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
echo "Running initialization script from ${SCRIPT_DIR}"

####
# Build the docker images
####

echo "Building docker images..."
# Log Output - Background process
docker build -t lucksei/log-output-container0 \
  -f "${SCRIPT_DIR}/log-output/Dockerfile.container0" \
  "${SCRIPT_DIR}/log-output" 
# Log Output - HTTP GET
docker build -t lucksei/log-output-container1 \
  -f "${SCRIPT_DIR}/log-output/Dockerfile.container1" \
  "${SCRIPT_DIR}/log-output" 
# Ping Pong Server
docker build -t lucksei/pingpong \
  -f "${SCRIPT_DIR}/pingpong/Dockerfile" \
  "${SCRIPT_DIR}/pingpong"

####
# Upload images to docker registry
####
docker push lucksei/log-output-container0:latest
docker push lucksei/log-output-container1:latest
docker push lucksei/pingpong:latest

####
# Run kustomization
####

kubectl create namespace exercises || true
kubectl apply -k ${SCRIPT_DIR}
