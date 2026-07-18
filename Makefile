API_DIR=client-registration-system-api
WEB_DIR=client-registration-system-web

##
## copy-env: Copia os arquivos .env.sample para .env se não existirem
##
copy-env:
ifeq (,$(wildcard ./$(API_DIR)/.env))
	@echo "Criando .env da API a partir do sample..."
	@cp ./$(API_DIR)/.env.sample ./$(API_DIR)/.env
endif
ifeq (,$(wildcard ./$(WEB_DIR)/.env))
	@echo "Criando .env do Web a partir do sample..."
	@cp ./$(WEB_DIR)/.env.sample ./$(WEB_DIR)/.env
endif

##
## setup: Prepara o ambiente inicial
##
setup: copy-env

export API_TARGET
export WEB_TARGET
export API_COMMAND
export WEB_COMMAND

##
## run: Executa API e Web localmente em containers de produção (sem watch)
##
run: API_TARGET=production
run: WEB_TARGET=production
run: API_COMMAND=node dist/main.js
run: WEB_COMMAND=node server.js
run: setup run-migrations
	@echo "Iniciando API e Web via Docker Compose (Modo Produção)..."
	docker-compose up --build -d

##
## watch: Inicia API e Web localmente em containers de desenvolvimento (com watch/hot-reload)
##
watch: API_TARGET=build
watch: WEB_TARGET=deps
watch: API_COMMAND=npm run start:dev
watch: WEB_COMMAND=npm run dev
watch: setup run-migrations
	@echo "Iniciando API e Web via Docker Compose (Modo Watch)..."
	docker-compose up --build -d

##
## dev: Alias para watch (para retrocompatibilidade)
##
dev: watch

##
## install: Instala as dependências via Docker Compose run
##
install:
	@echo "Instalando dependências na API (Docker)..."
	docker-compose run --rm api npm install
	@echo "Instalando dependências do Web (Docker)..."
	docker-compose run --rm web npm install

##
## run-migrations: Executa as migrations do TypeORM
##
run-migrations:
	@echo "Executando migrations do banco de dados (Docker)..."
	docker-compose run --rm api npm run typeorm:run-migrations

##
## test: Executa testes unitários de ambos os projetos via Docker
##
test:
	@echo "Executando testes da API (Docker)..."
	docker-compose run --rm api npm run test
	@echo "Executando testes do Web (Docker)..."
	docker-compose run --rm web npm run test

##
## test-e2e: Executa testes e2e de ambos os projetos via Docker
##
test-e2e: run-migrations
	@echo "Executando testes e2e da API (Docker)..."
	docker-compose run --rm -e DATABASE_URL=postgres://client-registration-service:client-registration-service@postgres:5432/client-registration-service api npm run test:e2e
	@echo "Executando testes e2e do Web (Docker)..."
	docker-compose run --rm web npm run test:e2e

##
## logs: Exibe logs de ambos os serviços Docker
##
logs:
	docker-compose logs -f

##
## help: Lista os alvos disponíveis
##
help:
	@grep -E '^##' Makefile | sed 's/## //'
