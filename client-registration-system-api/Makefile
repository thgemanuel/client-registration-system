GUIDELINE_NETWORK=guideline
SERVICE_NAME=client-registration-service

export API_TARGET
export SERVICE_COMMAND

run: API_TARGET=production
run: SERVICE_COMMAND=node dist/main.js
run: build run-migrations
	@echo 'Executando a aplicação em modo produção (sem debug)'
	@docker compose up --remove-orphans -d

watch: API_TARGET=build
watch: SERVICE_COMMAND=npm run start:dev
watch: build run-migrations
	@echo 'Executando a aplicação em modo watch (start:dev)'
	@docker compose up --remove-orphans -d

build: setup
	@echo 'Executando build da aplicação'
	@docker compose build --pull

test: setup
	@docker compose run --rm $(SERVICE_NAME) npm run test

test-e2e: setup run-migrations
	@docker compose run --rm $(SERVICE_NAME) npm run test:e2e

logs:
	@docker compose logs -f

logs-app:
	@docker compose logs $(SERVICE_NAME) -f

lint:
	@docker compose run --rm $(SERVICE_NAME) npm run lint

create-guideline-network:
ifeq (,$(shell docker network ls -q --filter name=$(GUIDELINE_NETWORK)))
	@docker network create $(GUIDELINE_NETWORK)
else
	@echo "Network já configurada"
endif

copy-env:
ifeq (,$(wildcard .env))
	@echo "Variáveis de ambiente aplicadas"
	@cp .env.sample .env
else
	@echo "Já existem variáveis de ambiente"
endif

get-service-ip:
	@docker inspect -f '{{.NetworkSettings.Networks.guideline.IPAddress}}' $$(docker compose ps | sed -n '2p' | awk '{print $$1}')

run-migrations:
	@docker compose run --rm $(SERVICE_NAME) npm run typeorm:run-migrations

setup: copy-env create-guideline-network
