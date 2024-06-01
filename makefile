all: up

up:
	sudo docker-compose -f ./src/docker-compose.yml up --build

down:
	sudo docker-compose -f ./src/docker-compose.yml down

fclean: down
	sudo docker rmi $$(docker images -a -q) &2>/dev/null
	sudo docker network rm $$(docker network ls -q) &2>/dev/null
	sudo docker volume rm $$(docker volume ls -q) &2>/dev/null

clean_cache: fclean
	sudo docker system prune -a
clear_volume: down
	docker volume rm $$(docker volume ls -q) &2>/dev/null