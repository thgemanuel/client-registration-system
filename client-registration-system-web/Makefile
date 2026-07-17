GUIDELINE_NETWORK=guideline
SERVICE_NAME=client-registration-web

run: build
	@echo 'Executando a aplicação'
	@docker compose up --remove-orphans -d

build: setup
	@echo 'Executando build da aplicação'
	@docker compose build --pull

logs:
	@docker compose logs -f

logs-app:
	@docker compose logs $(SERVICE_NAME) -f

test: setup
	@docker compose run --rm $(SERVICE_NAME) npm run test

test-e2e: setup
	@docker compose run --rm $(SERVICE_NAME) npm run test:e2e

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

setup: copy-env create-guideline-network
