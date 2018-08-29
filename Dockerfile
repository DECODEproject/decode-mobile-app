FROM node:10.8.0-alpine

RUN apk add --no-cache git

WORKDIR /code
COPY package.json package-lock.json /code/

RUN npm install

COPY . /code
