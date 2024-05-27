FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN apt-get update
RUN apt-get install nginx -y

COPY --from=build dist /var/www/html/

EXPOSE 80

CMD ["nginx","-g","daemon off;"]