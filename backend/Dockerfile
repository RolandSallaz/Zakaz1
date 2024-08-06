FROM node:21-alpine As builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
CMD npm run migration:generate -n initMigration
CMD npm run migration:run


FROM node:21-alpine As production
WORKDIR /app

COPY package*.json ./

COPY --from=builder /app/dist ./dist
CMD npm run start:prod