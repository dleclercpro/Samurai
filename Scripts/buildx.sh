#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define image variables
user="dleclercpro"
app="samurai"
release="latest"

# Define image tag
tag=$user/$app:$release

# Build a cross-platform image
docker buildx build --platform linux/amd64,linux/arm64 -t $tag -f Dockerfile .

# Push it to Dockerhub
docker buildx push $tag