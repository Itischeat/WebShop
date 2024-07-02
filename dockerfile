FROM node:20.10.0

WORKDIR /usr/src/back

COPY package.json package-lock.json /usr/src/back/

RUN npm install
RUN npm i sequelize-cli



COPY . .


CMD [ "npm", "run", "dev" ]
