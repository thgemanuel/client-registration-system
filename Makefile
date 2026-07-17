API_DIR=client-registration-system-api
WEB_DIR=client-registration-system-web

API_PORT=3000
WEB_PORT=3001
DB_URL=postgres://client-registration-service:client-registration-service@localhost:5432/client-registration-service

##
## dev: Executa API e Web localmente em modo dev (em paralelo)
##
.PHONY: dev
dev:
	@echo "Iniciando API (porta $(API_PORT)) e Web (porta $(WEB_PORT)) em modo dev..."
	@$(MAKE) -j2 dev-api dev-web

##
## dev-api: Executa somente a API NestJS em modo watch
##
.PHONY: dev-api
dev-api: export PORT=$(API_PORT)
dev-api: export DATABASE_URL=$(DB_URL)
dev-api:
	@echo "[API] Iniciando NestJS em modo watch na porta $(API_PORT)..."
	cd $(API_DIR) && npm run start:dev

##
## dev-web: Executa somente o Next.js em modo dev
##
.PHONY: dev-web
dev-web: export PORT=$(WEB_PORT)
dev-web: export NEXT_PUBLIC_API_URL=http://localhost:$(API_PORT)
dev-web:
	@echo "[WEB] Iniciando Next.js em modo dev na porta $(WEB_PORT)..."
	cd $(WEB_DIR) && npm run dev

##
## install: Instala as dependências de ambos os projetos
##
.PHONY: install
install:
	@echo "Instalando dependências da API..."
	cd $(API_DIR) && npm install
	@echo "Instalando dependências do Web..."
	cd $(WEB_DIR) && npm install

##
## test: Executa testes unitários de ambos os projetos
##
.PHONY: test
test:
	@echo "Executando testes da API..."
	cd $(API_DIR) && npm run test
	@echo "Executando testes do Web..."
	cd $(WEB_DIR) && npm run test

##
## test-e2e: Executa testes e2e de ambos os projetos
##
.PHONY: test-e2e
test-e2e:
	@echo "Executando testes e2e da API..."
	cd $(API_DIR) && DATABASE_URL=$(DB_URL) npm run test:e2e
	@echo "Executando testes e2e do Web (Playwright)..."
	cd $(WEB_DIR) && npm run test:e2e

##
## run: Sobe ambos os serviços via Docker (modo produção)
##
.PHONY: run
run:
	@$(MAKE) -C $(API_DIR) run
	@$(MAKE) -C $(WEB_DIR) run

##
## logs: Exibe logs de ambos os serviços Docker
##
.PHONY: logs
logs:
	@$(MAKE) -C $(API_DIR) logs &
	@$(MAKE) -C $(WEB_DIR) logs

##
## help: Lista os alvos disponíveis
##
.PHONY: help
help:
	@grep -E '^##' Makefile | sed 's/## //'
