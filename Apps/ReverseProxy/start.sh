#!/bin/sh

# Define directory where SSL certificates live
CERTS_DIR="/etc/dummy-certs"

# Create directories
mkdir -p "$CERTS_DIR"

# Generate dummy SSL certificate
openssl req -x509 -nodes -newkey rsa:4096 -keyout "$CERTS_DIR/privkey.pem" -out "$CERTS_DIR/fullchain.pem" -days 365 -subj "/C=/ST=/L=/O=/OU=/CN="

# Print dummy certificate info
openssl x509 -in "$CERTS_DIR/fullchain.pem" -noout -text

# Start NGINX in the foreground
nginx -g 'daemon off;'