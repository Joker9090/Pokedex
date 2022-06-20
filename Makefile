start: stop
	docker-compose up -d --build

stop:
	docker-compose stop
	docker-compose down --volumes --remove-orphans
	@docker rm pokedex || true

ps:
	docker-compose ps

logs:
	docker-compose logs -f pokedex

shell:
	docker exec -it pokedex ash