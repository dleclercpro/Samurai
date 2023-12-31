# Build reverse proxy using NGINX
FROM nginx:latest

# Install Certbot dependencies and Certbot itself
RUN apt-get update && \
    apt-get install -y certbot && \
    rm -rf /var/lib/apt/lists/*

# Recurisvely create directories for ACME challenge
RUN mkdir -p /var/www/html

# Entrypoint script to start NGINX and Certbot
COPY ./Apps/ReverseProxy/entrypoint.sh /usr/local/bin/entrypoint.sh

# Make script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose ports
EXPOSE 80
EXPOSE 443

# Execute it
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]