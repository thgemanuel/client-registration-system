# Estrutura de Migrations - Client Registration System

## Arquivos Criados

### Domain Layer
- `src/domain/entities/client.entity.ts` - Entidade de Cliente (lógica de negócio)
- `src/domain/repositories/client.repository.interface.ts` - Interface do repositório

### Infrastructure Layer
- `src/infrastructure/persistence/postgres/schemas/client.schema.ts` - Schema TypeORM para banco de dados
- `src/infrastructure/persistence/postgres/typeormconfig.ts` - Configuração do TypeORM

### Application Layer
- `src/application/dto/create-client.dto.ts` - DTO para criar cliente

### Migrations
- `src/infrastructure/persistence/postgres/migrations/1721176800000-CreateClientsTable.ts` - Primeira migration

## Scripts Disponíveis

```bash
# Build do projeto
make build

# Rodar migrations
make run-migrations

# Rodar a aplicação (build + migrations + docker compose up)
make run

# Ver logs
make logs
```

## Package.json Scripts

```bash
# Gerar nova migration
npm run typeorm:generate-migration --name=NomeDaMigration

# Executar migrations
npm run typeorm:run-migrations
```

## Estrutura da Tabela Clientes

- `id` (UUID) - Identificador único
- `full_name` (VARCHAR) - Nome completo
- `cpf` (VARCHAR) - CPF (único)
- `email` (VARCHAR) - Email (único)
- `preferred_color` (VARCHAR) - Cor preferida
- `observations` (TEXT) - Observações (opcional)
- `inserted_at` (TIMESTAMP) - Data de criação
- `updated_at` (TIMESTAMP) - Data de atualização

## Próximos Passos

1. Instalar dependências: `npm install`
2. Executar migrations: `make run-migrations`
3. Implementar:
   - Repositório concreto (TypeORM)
   - Use cases de cadastro/consulta
   - Controllers REST API
   - Validações e DTOs
   - Frontend React

## Cores Disponíveis (Arco-íris)

As cores que serão aceitáveis no formulário:
- red (Vermelho)
- orange (Laranja)
- yellow (Amarelo)
- green (Verde)
- blue (Azul)
- indigo (Índigo)
- violet (Violeta)
