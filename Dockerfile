FROM node:17-alpine3.14

RUN npm install -g serve

ARG APP_DIR=/app
WORKDIR $APP_DIR

COPY package.json $APP_DIR
COPY package-lock.json $APP_DIR
RUN npm install

COPY . $APP_DIR

RUN npm run build

EXPOSE 3000

ENTRYPOINT serve -s dist
