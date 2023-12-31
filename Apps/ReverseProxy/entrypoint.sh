#!/bin/sh

# Function to renew certificates
renew_ssl() {
    certbot renew
}

# Function to obtain an initial SSL certificate
init_ssl() {
    certbot certonly --webroot --webroot-path=/var/www/html -d $DOMAIN --email $EMAIL --agree-tos
}

# Get first SSL certificate
init_ssl

# Start NGINX
nginx -g 'daemon off;' &

# Schedule SSL certificate renewal every day
while :; do
    sleep 1d
    renew_ssl
done