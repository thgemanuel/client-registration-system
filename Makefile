API_DIR=client-registration-system-api
WEB_DIR=client-registration-system-web

API_PORT=3000
WEB_PORT=3001
DB_URL=postgres://client-registration-service:client-registration-service@localhost:5432/client-registration-service

##
## dev: Executa API e Web localmente em containers dev
##
.PHONY: dev
dev: run-migrations
	@echo "Iniciando API e Web via Docker Compose..."
	docker-compose up -d

##
## dev-api: Inicia o container da API em modo watch
##
.PHONY: dev-api
dev-api: run-migrations
	@echo "[API] Iniciando NestJS via Docker Compose..."
	docker-compose up -d api postgres

##
## dev-web: Inicia o container do Web em modo dev
##
.PHONY: dev-web
dev-web:
	@echo "[WEB] Iniciando Next.js via Docker Compose..."
	docker-compose up -d web

##
## install: Instala as dependências via Docker Compose run
##
.PHONY: install
install:
	@echo "Instalando dependências na API (Docker)..."
	docker-compose run --rm api npm install
	@echo "Instalando dependências do Web (Docker)..."
	docker-compose run --rm web npm install

##
## run-migrations: Executa as migrations do TypeORM
##
.PHONY: run-migrations
run-migrations:
	@echo "Executando migrations do banco de dados (Docker)..."
	docker-compose run --rm api npm run typeorm:run-migrations

##
## test: Executa testes unitários de ambos os projetos via Docker
##
.PHONY: test
test:
	@echo "Executando testes da API (Docker)..."
	docker-compose run --rm api npm run test
	@echo "Executando testes do Web (Docker)..."
	docker-compose run --rm web npm run test

##
## test-e2e: Executa testes e2e de ambos os projetos via Docker
##
.PHONY: test-e2e
test-e2e: run-migrations
	@echo "Executando testes e2e da API (Docker)..."
	docker-compose run --rm -e DATABASE_URL=postgres://client-registration-service:client-registration-service@postgres:5432/client-registration-service api npm run test:e2e
	@echo "Executando testes e2e do Web (Docker)..."
	docker-compose run --rm web npm run test:e2e

##
## run: Sobe ambos os serviços via Docker Compose
##
.PHONY: run
run: run-migrations
	docker-compose up -d

##
## logs: Exibe logs de ambos os serviços Docker
##
.PHONY: logs
logs:
	docker-compose logs -f

##
## help: Lista os alvos disponíveis
##
.PHONY: help
help:
	@grep -E '^##' Makefile | sed 's/## //'
