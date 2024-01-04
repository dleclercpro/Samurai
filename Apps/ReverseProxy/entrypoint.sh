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
NGINX_INIT_CONF_TEMPLATE="/usr/share/nginx/nginx.init.conf" # Initial NGINX config template
NGINX_FINAL_CONF_TEMPLATE="/usr/share/nginx/nginx.conf"     # Final NGINX config template

NGINX_CONF="/etc/nginx/nginx.conf" # Configuration file loaded by NGINX

CERTBOT_WEBROOT="/var/www/html"
CERTBOT_LIVE_PATH="/etc/letsencrypt/live/$DOMAIN"




# Function to reload final NGINX conf (w/ HTTPS), if valid
reload_conf() {
    echo "Testing config..."
    nginx -t -c "$NGINX_CONF"

    # NGINX can only re-load the conf file it first loaded (no '-c' flag possible)
    echo "Re-loading config..."
    nginx -s reload
}


# Function to generate initial NGINX configuration file
generate_init_conf() {
    echo "Generating initial NGINX config file..."

    sed -e "s|{{DOMAIN}}|$DOMAIN|g" \
        "$NGINX_INIT_CONF_TEMPLATE" > "$NGINX_CONF"

    echo "Initial NGINX config file generated."
}


# Function to generate final NGINX configuration file
generate_final_conf() {
    echo "Generating final NGINX config file..."

    sed -e "s|{{DOMAIN}}|$DOMAIN|g" \
        -e "s|{{CERTBOT_LIVE_PATH}}|$CERTBOT_LIVE_PATH|g" \
        "$NGINX_FINAL_CONF_TEMPLATE" > "$NGINX_CONF"

    echo "Final NGINX config file generated."
}


# Function to renew certificates
renew_ssl() {
    certbot renew

    reload_conf
}


# Function to obtain an initial SSL certificate
init_ssl() {
    echo "Obtaining SSL certificates..."

    certbot certonly \
        --non-interactive --agree-tos \
        --webroot --webroot-path="$CERTBOT_WEBROOT" \
        -d "$DOMAIN" --email "$EMAIL"

    echo "SSL certificates obtained."

    generate_final_conf
    reload_conf
}




# Generate initial configuration
generate_init_conf

# Start NGINX with the initial configuration
nginx -g "daemon off;" -c "$NGINX_CONF" &

# Wait for a brief moment to ensure NGINX is up
sleep 5

# Get first SSL certificate
init_ssl

# Schedule SSL certificate renewal every day
while :; do
    sleep 1d
    renew_ssl
done
