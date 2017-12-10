FROM node:9.2.0-alpine

WORKDIR /server

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8099

CMD [ "npm", "start" ]
