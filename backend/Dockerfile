# Стадия сборки
FROM node:14-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Создание миграции
RUN npm run migrate:generate src/database/migrations/initMigration

# Запуск миграции
RUN npm run migrate:up

# Стадия продакшн
FROM node:14-alpine as production
WORKDIR /app

COPY package*.json ./

RUN npm install --only=production && npm install -g pm2
COPY --from=builder /app/dist ./dist
COPY ./ecosystem.config.js .

# Запуск приложения
CMD ["pm2-runtime", "start", "ecosystem.config.js"]