FROM node:21-alpine As builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .


FROM node:21-alpine As production
WORKDIR /app

COPY package*.json ./

COPY --from=builder /app/dist ./dist
CMD npm run build && npm run start
