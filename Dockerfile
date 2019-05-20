FROM node:10

ADD www /www

WORKDIR /www

COPY . .

RUN npm i --no-optional --no-shrinkwrap --no-package-lock --only=prod

EXPOSE 8080

CMD [ "npm", "run", "production" ]