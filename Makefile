CLIENT_DIRECTORY := src/client
SERVER_DIRECTORY := src/server
DOCKER_NAME := red_tetris
PORT := 8080

all: build

build:
	npm run build --prefix $(CLIENT_DIRECTORY)
	npm run build --prefix $(SERVER_DIRECTORY)
	mkdir -p www
	cp -rf $(CLIENT_DIRECTORY)/build www/public
	cp $(SERVER_DIRECTORY)/package.json www/
	cp $(SERVER_DIRECTORY)/build/server.js www/
	# npm i --prefix www

docker: build docker-build docker-run

docker-build:
	docker build -t $(DOCKER_NAME) .

docker-run:
	docker run --name $(DOCKER_NAME) --restart=always -p $(PORT):8080 -d $(DOCKER_NAME)

docker-clean:
	-docker kill $(DOCKER_NAME)
	-docker ps -a | awk '{ print $$1,$$2 }' | grep $(DOCKER_NAME) | awk '{print $$1 }' | xargs -I {} docker rm {}
	docker image rm $(DOCKER_NAME)
