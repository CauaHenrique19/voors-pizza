FROM node:21-alpine3.18 as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run generate:schema

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:migrate:prod"]