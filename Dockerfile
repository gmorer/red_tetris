FROM node:lts-alpine as builder
WORKDIR /usr/src/red_tetris
COPY . .
RUN npm i --prefix ./src/client --no-optional --no-shrinkwrap --no-package-lock --only=prod
RUN npm i --prefix ./src/server --no-optional --no-shrinkwrap --no-package-lock --only=prod
RUN npm i -g webpack webpack-cli
RUN npm run build --prefix ./src/client
RUN npm run build --prefix ./src/server
RUN mkdir -p www
RUN cp -rf ./src/client/build www/public
RUN cp ./src/server/package.json www/
RUN cp ./src/server/build/server.js www/
RUN cp -rf ./src/server/node_modules www/

FROM node:lts-alpine as production
COPY --from=builder /usr/src/red_tetris/www /var/www
WORKDIR /var/www
CMD ["node", "server"]
