#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define image variables
user="dleclercpro"
app="samurai"
release="2.6.0"

# Build a cross-platform image and push it to Dockerhub
docker buildx build --platform linux/amd64,linux/arm64 -t $user/$app:$release -f ./Dockerfile . --push