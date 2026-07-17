# Client Registration System - API

## 📖 Sobre o Projeto
Este é o serviço de backend (API) do **Client Registration System**. Ele fornece uma API RESTful robusta para o gerenciamento (CRUD) de clientes, lidando com a persistência de dados, regras de negócio e validações (como a unicidade de CPF e E-mail). A arquitetura é orientada a domínio (Clean Architecture/Domain-Driven Design), garantindo baixo acoplamento e alta testabilidade.

## 🚀 Tecnologias Utilizadas
- **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construção de aplicativos do lado do servidor eficientes e escaláveis.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para JavaScript.
- **[TypeORM](https://typeorm.io/)**: ORM para mapeamento objeto-relacional.
- **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional.
- **[Swagger](https://swagger.io/)**: Documentação interativa da API (`@nestjs/swagger`).
- **[Jest](https://jestjs.io/)**: Framework de testes (Unitários e E2E).
- **[Docker](https://www.docker.com/)**: Containerização do banco de dados (via `docker-compose`).

## 📋 Pré-requisitos
Antes de iniciar, você precisará ter instalado em sua máquina:
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (Para encapsular todo o ambiente)
- [Make](https://www.gnu.org/software/make/) (Opcional, atalhos do Makefile)

## 🛠️ Como Executar

### Utilizando o `Makefile` (Recomendado)
Na raiz do repositório, existe um `Makefile` configurado para facilitar a vida do desenvolvedor orquestrando os comandos de todos os projetos. A partir da **pasta raiz do projeto**, execute:

1. **Subir o Banco de Dados:**
   ```bash
   make up
   ```
2. **Instalar Dependências da API:**
   ```bash
   make install
   ```
3. **Iniciar a API e a WEB em modo de desenvolvimento (Watch) integradas:**
   ```bash
   make dev
   ```
4. **Rodar os Testes Unitários da API:**
   ```bash
   make test
   ```
5. **Desligar a Infraestrutura:**
   ```bash
   make down
   ```

### Executando Manualmente (Sem o `Makefile`)
Caso prefira não usar o Makefile, você pode rodar os comandos do docker-compose diretamente da raiz do projeto.

1. **Subir a API e o banco de dados via Docker Compose:**
   A partir da pasta raiz do repositório:
   ```bash
   docker-compose up -d api postgres
   ```
2. **Rodar os Testes (temporariamente subindo um container):**
   ```bash
   docker-compose run --rm api npm run test
   ```

---
*Ao iniciar o projeto, a documentação Swagger estará disponível na rota `/api`.*
