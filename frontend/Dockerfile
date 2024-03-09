FROM node:21-alpine as builder
WORKDIR /app
COPY package*.json ./

RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx/conf.d/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]