#!/bin/sh

# Paths
NGINX_INIT_CONF="/etc/nginx/init.conf"
NGINX_FINAL_CONF="/etc/nginx/nginx.conf"
CERTBOT_WEBROOT="/var/www/html"

# Deploy hook used by Certbot: ensures NGINX is reloaded using
# the final configuration (w/ HTTPS)
DEPLOY_HOOK="nginx -s reload -c $NGINX_FINAL_CONF"

# Function to renew certificates
renew_ssl() {
    certbot renew
}

# Function to obtain an initial SSL certificate
init_ssl() {
    certbot certonly \
        --non-interactive --agree-tos \
        --webroot --webroot-path="$CERTBOT_WEBROOT" \
        -d "$DOMAIN" --email "$EMAIL" \
        --deploy-hook "$DEPLOY_HOOK"
}

# Print out environment variables as specified in Docker Compose
# file (they should be accessible)
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"

# Get first SSL certificate
init_ssl

# Start NGINX with the initial configuration (w/o HTTPS)
nginx -g "daemon off;" -c $NGINX_INIT_CONF &

# Schedule SSL certificate renewal every day
while :; do
    sleep 1d
    renew_ssl
done