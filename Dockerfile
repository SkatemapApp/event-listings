FROM node:boron

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 6633 
CMD [ "npm", "start" ]
