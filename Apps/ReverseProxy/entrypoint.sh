#!/bin/bash

# Required environment variables
required_vars=("DOMAIN" "EMAIL")

# Function to check and echo environment variables
check_env_vars() {
    echo "Ensuring environment variables exist..."

    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            echo "Error: Environment variable $var is not set."
            exit 1
        else
            echo "$var: ${!var}"
        fi
    done

    echo "All necessary environment variables exist."
}

# Check if all required environment variables are set
check_env_vars



# Paths
NGINX_INIT_CONF_TEMPLATE="/usr/share/nginx/nginx.init.conf"
NGINX_FINAL_CONF_TEMPLATE="/usr/share/nginx/nginx.conf"

NGINX_INIT_CONF="/etc/nginx/nginx.init.conf"
NGINX_FINAL_CONF="/etc/nginx/nginx.conf"

CERTBOT_WEBROOT="/var/www/html"
CERTBOT_LIVE_PATH="/etc/letsencrypt/live/$DOMAIN"



# Function to reload final NGINX conf (w/ HTTPS), if valid
reload_conf() {
    local conf=$1

    echo "Testing config: $conf"
    nginx -t -c "$conf"

    echo "Re-loading config: $conf"
    nginx -s reload -c "$conf"
}

# Function to generate NGINX configuration files
generate_confs() {
    echo "Generating NGINX config files..."

    sed -e "s|{{DOMAIN}}|$DOMAIN|g" \
        "$NGINX_INIT_CONF_TEMPLATE" > "$NGINX_INIT_CONF"

    sed -e "s|{{DOMAIN}}|$DOMAIN|g" \
        -e "s|{{CERTBOT_LIVE_PATH}}|$CERTBOT_LIVE_PATH|g" \
        "$NGINX_FINAL_CONF_TEMPLATE" > "$NGINX_FINAL_CONF"

    echo "NGINX config files generated."
}

# Function to renew certificates
renew_ssl() {
    certbot renew
    reload_conf $NGINX_FINAL_CONF
}

# Function to obtain an initial SSL certificate
init_ssl() {
    echo "Obtaining SSL certificates..."

    certbot certonly \
        --non-interactive --agree-tos \
        --webroot --webroot-path="$CERTBOT_WEBROOT" \
        -d "$DOMAIN" --email "$EMAIL"

    echo "SSL certificates obtained."

    reload_conf $NGINX_FINAL_CONF
}



# Generate configs using templates
generate_confs

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
