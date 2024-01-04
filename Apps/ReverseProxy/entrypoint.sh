#!/bin/bash

# Required environment variables
required_vars=("DOMAIN" "EMAIL")

# Function to check and echo environment variables
check_env_vars() {
    echo "Ensuring env variables exist..."

    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            echo "Error: Environment variable $var is not set."
            exit 1
        else
            echo "$var: ${!var}"
        fi
    done

    echo "Done."
}

# Check if all required environment variables are set
check_env_vars



# Paths
NGINX_INIT_CONF="/etc/nginx/nginx.init.conf"
NGINX_TEMPLATE_CONF="/etc/nginx/nginx.template.conf"
NGINX_FINAL_CONF="/etc/nginx/nginx.conf"

CERTBOT_WEBROOT="/var/www/html"
CERTBOT_LIVE_PATH="/etc/letsencrypt/live/$DOMAIN"

# Deploy hook used by Certbot: ensures final NGINX conf (w/ HTTPS)
# is valid, then reloads it
DEPLOY_HOOK="nginx -t -c $NGINX_FINAL_CONF && nginx -s reload -c $NGINX_FINAL_CONF"



# Function to generate final NGINX configuration file
generate_final_conf() {
sed -e "s|{{CERTBOT_LIVE_PATH}}|$CERTBOT_LIVE_PATH|g" \
    -e "s|{{DOMAIN}}|$DOMAIN|g" \
    "$NGINX_TEMPLATE_CONF" > "$NGINX_FINAL_CONF"

}

# Function to renew certificates
renew_ssl() {
    certbot renew \
        --deploy-hook "$DEPLOY_HOOK"
}

# Function to obtain an initial SSL certificate
init_ssl() {
    generate_final_conf

    certbot certonly \
        --non-interactive --agree-tos \
        --webroot --webroot-path="$CERTBOT_WEBROOT" \
        -d "$DOMAIN" --email "$EMAIL" \
        --deploy-hook "$DEPLOY_HOOK"
}



# Start NGINX with the initial configuration
nginx -g "daemon off;" -c "$NGINX_INIT_CONF" &

# Wait for a brief moment to ensure NGINX is up
sleep 5

# Get first SSL certificate
init_ssl

# Schedule SSL certificate renewal every day
while :; do
    sleep 1d
    renew_ssl
done
