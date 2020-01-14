FROM node:7.7.2-alpine

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm install --quiet
