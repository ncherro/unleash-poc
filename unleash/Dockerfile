FROM node:12-alpine

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4242

CMD node index.js
