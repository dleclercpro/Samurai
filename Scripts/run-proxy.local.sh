#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Move to root directory
cd "${dir}/.."

# Define image variables
user="dleclercpro"
app="samurai-nginx"
release="latest"

# Test run reverse proxy on localhost with a dummy
# self-generated SSL certificate
docker run --name reverse-proxy -p 80:80 -p 443:443 $user/$app:$release