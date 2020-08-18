FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run test

ENV NODE_ENV development
ENV PORT 4002
ENV HOST "0.0.0.0"
ENV discovery_stub_comtravo_authorization ""

EXPOSE 4002

CMD [ "node", "index.js" ]
