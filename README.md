# Client Registration System

Monorepo contendo o sistema completo de cadastro de clientes, composto por uma API RESTful e uma interface Web. Todo o ambiente de desenvolvimento roda em containers Docker, sem necessidade de Node.js instalado na máquina.

## 📁 Estrutura do Repositório

```
client-registration-system/
├── client-registration-system-api/   # Backend - API REST (NestJS)
├── client-registration-system-web/   # Frontend - Web App (Next.js)
├── docker-compose.yml                # Orquestração dos serviços
└── Makefile                          # Atalhos para os comandos do projeto
```

## 🧩 Projetos

| Projeto | Descrição | Porta |
|--------|-----------|-------|
| [API](./client-registration-system-api/README.md) | Serviço backend com NestJS, TypeORM e PostgreSQL. Expõe um CRUD completo de clientes com arquitetura orientada a domínio. | `3000` |
| [Web](./client-registration-system-web/README.md) | Interface frontend com Next.js (App Router), React Hook Form e Zod. Consome a API para cadastro e gestão de clientes. | `3001` |

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** — Framework backend Node.js
- **[Next.js](https://nextjs.org/)** — Framework frontend React com SSR
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática
- **[PostgreSQL](https://www.postgresql.org/)** — Banco de dados relacional
- **[TypeORM](https://typeorm.io/)** — ORM e gerenciamento de migrations
- **[Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)** — Containerização do ambiente completo

## 📋 Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/) *(opcional, mas recomendado)*

> **Não é necessário ter Node.js instalado na máquina.** Todo o ambiente roda dentro de containers Docker.

## ⚡ Rodando com um único comando

```bash
make dev
```

Esse comando executa automaticamente, na ordem correta:

1. **Sobe o banco de dados** (PostgreSQL) e aguarda ele estar pronto via *healthcheck*
2. **Executa as migrations** do TypeORM, criando as tabelas necessárias
3. **Sobe a API** (NestJS em modo watch — hot reload ativo)
4. **Sobe o Web App** (Next.js em modo dev com Turbopack)

Após a inicialização, os serviços estarão disponíveis em:
- **Web:** http://localhost:3001
- **API:** http://localhost:3000
- **Swagger (documentação da API):** http://localhost:3000/api

## 🛠️ Comandos disponíveis

Todos os comandos devem ser executados na **raiz do repositório**:

| Comando | Descrição |
|---------|-----------|
| `make dev` | Sobe todos os serviços em modo de desenvolvimento (com hot reload) |
| `make dev-api` | Sobe apenas a API e o banco de dados |
| `make dev-web` | Sobe apenas o Web App |
| `make run-migrations` | Executa as migrations do banco de dados manualmente |
| `make test` | Executa os testes unitários da API e do Web via Docker |
| `make test-e2e` | Executa os testes E2E (aplica migrations antes) |
| `make logs` | Exibe os logs de todos os serviços em tempo real |
| `make install` | Instala/atualiza dependências de ambos os projetos via Docker |

## 🔧 Rodando sem o Makefile

Caso prefira usar os comandos do Docker Compose diretamente:

```bash
# Subir todos os serviços em modo dev
docker-compose up -d

# Executar as migrations
docker-compose run --rm api npm run typeorm:run-migrations

# Acompanhar os logs
docker-compose logs -f

# Encerrar todos os serviços e remover os volumes
docker-compose down -v
```

## 🧪 Testes

Ambos os projetos possuem suites de testes cobertas com **Jest**. Os testes E2E da API usam **Supertest** e os do Web usam **Cypress**.

### Resumo das Suites

**API** — 9 suites, 47 testes

| Suite | Tipo | Descrição |
|-------|------|-----------|
| `ClientMapper` | Unitário | Conversão DTO ↔ Entity |
| `RegisterClientUseCase` | Unitário | Cadastro, CPF/e-mail duplicado |
| `GetClientsUseCase` | Unitário | Listagem de clientes |
| `GetClientByIdUseCase` | Unitário | Busca por ID e not found |
| `UpdateClientUseCase` | Unitário | Atualização parcial, e-mail duplicado, not found |
| `DeleteClientUseCase` | Unitário | Deleção e not found |
| `ClientController` | Unitário | Todos os 5 endpoints CRUD |
| `DomainExceptionFilter` | Unitário | Mapeamento de exceções de domínio para HTTP 400 |
| `GeneralExceptionFilter` | Unitário | Tratamento de HttpException e erros genéricos (500) |
| `ClientController (E2E)` | E2E | CRUD completo via HTTP com banco de dados real |

**Web** — 4 suites, 28 testes

| Suite | Tipo | Descrição |
|-------|------|-----------|
| `formatters` | Unitário | Utilitário `formatCpf` (formatação, máscara, edge cases) |
| `Client Schema` | Unitário | Validação Zod: todos os campos, CPF algoritmo, strip de máscara |
| `createClientAction` | Unitário | Server Action: sucesso, erro da API, erro de rede |
| `ClientRegistrationForm` | Componente | Renderização de campos, erros de validação, bloqueio de submit |

### Executando os Testes

```bash
# Todos os testes unitários (API + Web)
make test

# Testes E2E (API + Web — requer banco de dados)
make test-e2e

# Apenas API
docker-compose run --rm api npm run test

# Apenas Web
docker-compose run --rm web npm run test
```

> Consulte os READMEs individuais de cada projeto para detalhes sobre a configuração e os arquivos de cada suite:
> - [API — Seção de Testes](./client-registration-system-api/README.md#-testes)
> - [Web — Seção de Testes](./client-registration-system-web/README.md#-testes)

---

## 🗄️ Banco de Dados

O PostgreSQL é iniciado automaticamente via Docker. As credenciais padrão (para ambiente local) são:

| Parâmetro | Valor |
|-----------|-------|
| Host | `localhost` |
| Porta | `5432` |
| Banco | `client-registration-service` |
| Usuário | `client-registration-service` |
| Senha | `client-registration-service` |

