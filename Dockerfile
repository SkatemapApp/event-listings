FROM node:9.2.0

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 6633 
CMD [ "npm", "start" ]
