FROM node:21-alpine As builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

FROM node:21-alpine As production
WORKDIR /app
COPY --from=builder /app/ /app/
CMD npm run build && npm run start