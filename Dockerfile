# FROM node:20-alpine as build

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# RUN apt-get update
# RUN apt-get install nginx -y

# COPY --from=build dist /var/www/html/

# EXPOSE 80

# CMD ["nginx","-g","daemon off;"]

FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM busybox:1.35
RUN adduser -D static
USER static
WORKDIR /home/static
COPY --from=build-stage /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]