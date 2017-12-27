FROM node:8.9.3

WORKDIR /server

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8099

CMD [ "npm", "start" ]
