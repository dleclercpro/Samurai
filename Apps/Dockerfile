# Build client app
FROM node:lts AS build-client-stage
WORKDIR app

# Copy necessary files over to image
COPY ./ClientApp/public ./public
COPY ./ClientApp/src ./src
COPY ./ClientApp/package*.json ./
COPY ./ClientApp/tsconfig*.json ./
COPY ./ClientApp/.env ./

# Only install production-relevant packages, then build the app
RUN npm i --only-prod
RUN npm run build



# Build server app
FROM node:lts AS build-server-stage
WORKDIR app

# Copy necessary files over to image
COPY ./ServerApp/public ./public
COPY ./ServerApp/src ./src
COPY ./ServerApp/test ./test
COPY ./ServerApp/package*.json ./
COPY ./ServerApp/tsconfig*.json ./
COPY ./ServerApp/.env.local ./

# Only install production-relevant packages, then build the app
RUN npm i --only-prod
RUN npm run build



# Bundle server and client apps into a stand-alone app
FROM node:lts-alpine AS bundle-stage
WORKDIR app

# Copy necessary files over to image
COPY --from=build-client-stage /app/build ./client
COPY --from=build-server-stage /app/build ./
COPY ./ServerApp/public ./public
COPY ./ServerApp/package*.json ./
COPY ./ServerApp/.env.local ./

# Only install production-relevant packages
RUN npm i --only-prod

# Set the STOPSIGNAL
STOPSIGNAL SIGTERM

# Expose necessary port to talk with service
EXPOSE 80

# Define command to run when launching the image
CMD ["node", "./src/index.js"]