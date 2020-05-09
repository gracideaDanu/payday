FROM node:11-alpine

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV prod

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]