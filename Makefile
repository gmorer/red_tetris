CLIENT_DIRECTORY := src/client
SERVER_DIRECTORY := src/server

all: build run

build:
	npm run build --prefix $(CLIENT_DIRECTORY)
	npm run build --prefix $(SERVER_DIRECTORY)
	mkdir -p www
	cp -rf $(CLIENT_DIRECTORY)/build www/public
	cp $(SERVER_DIRECTORY)/package.json www/
	cp $(SERVER_DIRECTORY)/package-lock.json www/
	cp $(SERVER_DIRECTORY)/build/server.js www/
	npm i --prefix www

run: