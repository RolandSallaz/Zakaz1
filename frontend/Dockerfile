FROM node:21-alpine As builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
CMD npm run build && npm run start
