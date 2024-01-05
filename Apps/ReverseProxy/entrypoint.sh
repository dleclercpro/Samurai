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
NGINX_INIT_CONF_TEMPLATE_FILE="/usr/share/nginx/nginx.init.conf" # Initial NGINX config template
NGINX_FINAL_CONF_TEMPLATE_FILE="/usr/share/nginx/nginx.conf"     # Final NGINX config template
NGINX_CONF_FILE="/etc/nginx/nginx.conf"                          # Configuration file loaded by NGINX
SSL_WEBROOT_DIR="/var/www/html"                                  # ACME challenge directory
SSL_CERTS_DIR="/etc/letsencrypt/live/$DOMAIN"                    # Live location of SSL certificates
DH_PARAMS_DIR="/etc/nginx"
DH_PARAMS_FILE="$DH_PARAMS_DIR/dhparam.pem"
DH_PARAMS_SIZE=2048                                              # Key size (# of bits)



# Function to reload final NGINX conf (w/ HTTPS), if valid
reload_conf() {
    echo "Testing config..."
    nginx -t -c "$NGINX_CONF_FILE"

    # NGINX can only re-load the conf file it first loaded (no '-c' flag possible)
    echo "Re-loading config..."
    nginx -s reload
}


# Function to generate initial NGINX configuration file
generate_init_conf() {
    echo "Generating initial NGINX config file..."

    sed -e "s|{{DOMAIN}}|$DOMAIN|g" \
        "$NGINX_INIT_CONF_TEMPLATE_FILE" > "$NGINX_CONF_FILE"

    echo "Initial NGINX config file generated."
}


# Function to generate final NGINX configuration file
generate_final_conf() {
    echo "Generating final NGINX config file..."

    sed -e "s|{{DOMAIN}}|$DOMAIN|g" \
        -e "s|{{SSL_CERTS_DIR}}|$SSL_CERTS_DIR|g" \
        -e "s|{{DH_PARAMS_DIR}}|$DH_PARAMS_DIR|g" \
        "$NGINX_FINAL_CONF_TEMPLATE_FILE" > "$NGINX_CONF_FILE"

    echo "Final NGINX config file generated."
}


# Function to renew certificates
renew_ssl_certs() {
    echo "Renewing SSL certificates..."

    certbot renew

    echo "SSL certificates renewed."
}


# Function to obtain an initial SSL certificate
generate_ssl_certs() {
    echo "Obtaining SSL certificates..."

    certbot certonly \
        --non-interactive --agree-tos \
        --webroot --webroot-path="$SSL_WEBROOT_DIR" \
        -d "$DOMAIN" --email "$EMAIL"

    echo "SSL certificates obtained."
}


# Function to generate a Diffie-Hellman parameter file
generate_dh_params() {
    openssl dhparam -out "$DH_PARAMS_FILE" $DH_PARAMS_SIZE
}




# Generate initial configuration
generate_init_conf

# Start NGINX with the initial configuration
nginx -g "daemon off;" -c "$NGINX_CONF_FILE" &

# Wait for a brief moment to ensure NGINX is up
sleep 5

# Generate new Diffie-Hellman parameters file
generate_dh_params

# Obtain SSL certificate
generate_ssl_certs

# Generate final NGINX configuration file and load it
generate_final_conf
reload_conf

# Schedule SSL certificate renewal every day
while :; do
    sleep 1d
    renew_ssl_certs
    reload_conf
done
