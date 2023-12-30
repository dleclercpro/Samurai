# Build reverse proxy using NGINX
FROM nginx:latest

# Install OpenSSL for generation of SSL certificates
RUN apt-get update && apt-get install -y openssl

# Move to isolated directory
WORKDIR /app

# Import dummy server configuration
COPY ./Apps/ReverseProxy/default.conf /etc/nginx/conf.d

# Import Bash script for certificate generation
COPY ./Apps/ReverseProxy/start.sh .

# Make the script executable
RUN chmod +x start.sh

# Execute it
CMD ["sh", "./start.sh"]