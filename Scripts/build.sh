#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define image variables
user="dleclercpro"
app="samurai"
release="latest"

# Build images
docker build -t $user/$app-app:$release -f ./Apps/Dockerfile .
docker build -t $user/$app-nginx:$release -f ./Apps/ReverseProxy/Dockerfile .

# Push them to Dockerhub
docker push $user/$app-app:$release
docker push $user/$app-nginx:$release