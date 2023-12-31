# Build client app
FROM node:lts AS build-client-stage
WORKDIR app

# Copy necessary files over to image
COPY ./Apps/ClientApp/public ./public
COPY ./Apps/ClientApp/src ./src
COPY ./Apps/ClientApp/package*.json ./
COPY ./Apps/ClientApp/tsconfig*.json ./
COPY ./Apps/ClientApp/.env ./

# Only install production-relevant packages, then build the app
RUN npm i --only-prod
RUN npm run build



# Build server app
FROM node:lts AS build-server-stage
WORKDIR app

# Copy necessary files over to image
COPY ./Apps/ServerApp/public ./public
COPY ./Apps/ServerApp/src ./src
COPY ./Apps/ServerApp/test ./test
COPY ./Apps/ServerApp/package*.json ./
COPY ./Apps/ServerApp/tsconfig*.json ./

# Only install production-relevant packages, then build the app
RUN npm i --only-prod
RUN npm run build



# Bundle server and client apps into a stand-alone app
FROM node:lts-alpine AS bundle-stage
WORKDIR app

# Copy necessary files over to image
COPY --from=build-client-stage /app/build ./client
COPY --from=build-server-stage /app/build ./
COPY ./Apps/ServerApp/public ./public
COPY ./Apps/ServerApp/package*.json ./
COPY ./Apps/ServerApp/.env.local ./
COPY ./Apps/ServerApp/.env.production ./

# Only install production-relevant packages
RUN npm i --only-prod

# Set the STOPSIGNAL
STOPSIGNAL SIGTERM

# Expose necessary port to talk with service
EXPOSE 80

# Define command to run when launching the image
CMD ["node", "./src/index.js"]