FROM node:21-alpine as builder
WORKDIR /app
COPY package*.json ./

RUN npm i
COPY . .
RUN npm run build

FROM nginx:stable-alpine3.17
COPY --from=builder /app/dist /nginx_volume

COPY ./default.conf /etc/nginx/conf.d
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]