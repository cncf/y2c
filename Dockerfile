FROM node:10

WORKDIR /app

COPY package.json .
COPY client/package.json ./client/package.json

RUN yarn install
RUN cd client && yarn install

COPY . .

CMD yarn run dev
