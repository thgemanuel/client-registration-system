# Client Registration System - API

## 📖 Sobre o Projeto
Este é o serviço de backend (API) do **Client Registration System**. Ele fornece uma API RESTful robusta para o gerenciamento (CRUD) de clientes, lidando com a persistência de dados, regras de negócio e validações (como a unicidade de CPF e E-mail). A arquitetura é orientada a domínio (Clean Architecture/Domain-Driven Design), garantindo baixo acoplamento e alta testabilidade.

## 🚀 Tecnologias Utilizadas
- **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construção de aplicativos do lado do servidor eficientes e escaláveis.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para JavaScript.
- **[TypeORM](https://typeorm.io/)**: ORM para mapeamento objeto-relacional e gerenciamento de migrations.
- **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional.
- **[Swagger](https://swagger.io/)**: Documentação interativa da API (`@nestjs/swagger`).
- **[Jest](https://jestjs.io/)**: Framework de testes (Unitários e E2E via Supertest).
- **[Docker](https://www.docker.com/)**: Containerização completa do ambiente.

## 📋 Pré-requisitos
Antes de iniciar, você precisará ter instalado em sua máquina:
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/) *(opcional, mas recomendado)*

> **Não é necessário ter Node.js instalado na máquina.** Todo o ambiente roda dentro de containers Docker.

## 🛠️ Como Executar

### Utilizando o `Makefile` (Recomendado)
A partir da **pasta raiz do repositório** (`client-registration-system/`):

```bash
# Sobe o banco, executa migrations e inicia a API em modo watch
make watch

# Inicia API + Web juntos (na raiz do repositório)
make watch
```

### Executando Manualmente (Sem o `Makefile`)
```bash
# Sobe a API e o banco de dados em modo watch
docker-compose up -d api postgres

# Executa as migrations do banco de dados
docker-compose run --rm api npm run typeorm:run-migrations
```

---

## 🛡️ Segurança (Tratamento de Exceções de Domínio)

- A API retorna exceções de domínio granulares (`ClientAlreadyExistsException` para CPF duplicado e `ClientEmailAlreadyExistsException` para e-mail duplicado) para permitir controle e rastreamento internos precisos.
- Contudo, para fins de segurança (evitar *User Enumeration*), as camadas de apresentação pública (como o Web App integrado) unificam esses erros em uma resposta comum de conflito, evitando expor qual credencial específica já está cadastrada para o cliente final.

---

## 🧪 Testes

### Configuração

A API usa **Jest** com **ts-jest** para transformação de TypeScript. Os aliases de módulos (`@domain`, `@application`, `@infrastructure`) são mapeados tanto na configuração de testes unitários (em `package.json`) quanto no `jest-e2e.json` para os testes E2E.

- **Testes unitários**: configuração em `package.json` (seção `"jest"`)
- **Testes E2E**: configuração em `test/jest-e2e.json`, utiliza `Supertest` para testar os endpoints HTTP reais com banco de dados real

### Suites de Testes

| Suite | Caminho | Tipo | O que testa |
|-------|---------|------|-------------|
| `ClientMapper` | `src/application/mappers/client.mapper.spec.ts` | Unitário | Conversão de DTO → Entity e Entity → DTO, casos nulos |
| `RegisterClientUseCase` | `src/application/use-cases/register-client.use-case.spec.ts` | Unitário | Cadastro com sucesso, CPF duplicado, e-mail duplicado |
| `GetClientsUseCase` | `src/application/use-cases/get-clients.use-case.spec.ts` | Unitário | Lista vazia, lista com múltiplos clientes, mapeamento de campos |
| `GetClientByIdUseCase` | `src/application/use-cases/get-client-by-id.use-case.spec.ts` | Unitário | Busca com sucesso, `EntityNotFoundException` |
| `UpdateClientUseCase` | `src/application/use-cases/update-client.use-case.spec.ts` | Unitário | Atualização parcial, not found, e-mail duplicado, skip de e-mail igual |
| `DeleteClientUseCase` | `src/application/use-cases/delete-client.use-case.spec.ts` | Unitário | Deleção com sucesso, not found, ID correto |
| `ClientController` | `src/infrastructure/controllers/client.controller.spec.ts` | Unitário | Todos os 5 endpoints (POST/GET/GET:id/PUT/DELETE), propagação de exceções |
| `DomainExceptionFilter` | `src/infrastructure/filters/domain-exception.filter.spec.ts` | Unitário | Status 400, código de erro correto por tipo de exceção, logging |
| `GeneralExceptionFilter` | `src/infrastructure/filters/general-exception.filter.spec.ts` | Unitário | HttpException, erros genéricos → 500, timestamp no body |
| `ClientController (E2E)` | `test/app.e2e-spec.ts` | E2E | CRUD completo via HTTP: criação, listagem, busca por ID, atualização, deleção, CPF/e-mail duplicados |

### Comandos

```bash
# Testes unitários (via Makefile raiz)
make test

# Testes unitários (via docker-compose direto)
docker-compose run --rm api npm run test

# Testes E2E (requer banco de dados — migrations são aplicadas automaticamente)
make test-e2e

# Testes E2E (via docker-compose direto)
docker-compose run --rm api npm run test:e2e

# Testes unitários dentro do container da API (via Makefile do projeto)
cd client-registration-system-api && make test
```

---

*Ao iniciar o projeto, a documentação Swagger estará disponível na rota `/api`.*
