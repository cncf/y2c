FROM node:10

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY client/package.json ./client/package.json
COPY client/yarn.lock ./client/yarn.lock

RUN yarn install
RUN cd client && yarn install

COPY . .

CMD yarn run dev
