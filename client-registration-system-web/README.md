# Client Registration System - Web

## 📖 Sobre o Projeto
Este é o serviço de frontend (Web) do **Client Registration System**. Trata-se de uma aplicação SPA / SSR desenvolvida com foco em alta performance, acessibilidade e experiência do usuário. Esta interface consome os serviços expostos pelo projeto API e fornece formulários interativos, validação no cliente (Zod/React Hook Form) e um design moderno.

## 🚀 Tecnologias Utilizadas
- **[Next.js (App Router)](https://nextjs.org/)**: Framework React para renderização híbrida, rotas e performance aprimorada.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para JavaScript, garantindo segurança na interface.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utilitário para estilização rápida e responsiva.
- **[shadcn/ui](https://ui.shadcn.com/)**: Componentes de interface acessíveis e altamente customizáveis (usando Radix UI).
- **[React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)**: Para gerenciamento de estado complexo de formulários e validação rigorosa de schemas.
- **[Webpack]**: Configurado com polling ativo para o ambiente de desenvolvimento, garantindo o funcionamento do hot reload mesmo sob volumes compartilhados no Docker/Windows.
- **[Jest](https://jestjs.io/) & [Testing Library](https://testing-library.com/)**: Framework de testes unitários e de componentes.
- **[Cypress](https://www.cypress.io/)**: Ferramenta de testes End-to-End (E2E) simulando comportamento de usuários reais.

## 📋 Pré-requisitos
Antes de iniciar, você precisará ter instalado em sua máquina:
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/) *(opcional, mas recomendado)*
- O serviço de API já configurado e rodando (necessário para o fluxo de submissão do formulário)

> **Não é necessário ter Node.js instalado na máquina.** Todo o ambiente roda dentro de containers Docker.

## 🛠️ Como Executar

### Utilizando o `Makefile` (Recomendado)
A partir da **pasta raiz do repositório** (`client-registration-system/`):

```bash
# Sobe apenas o Web App em modo watch
make watch

# Sobe Web + API juntos (na raiz do repositório)
make watch
```

### Executando Manualmente (Sem o `Makefile`)
```bash
# Sobe a interface web em modo dev
docker-compose up -d web

# Acompanhar os logs
docker-compose logs web -f
```

A aplicação estará disponível em **http://localhost:3001**.

---

## 🛡️ Segurança (Tratamento de Erros e Prevenção de Enumerabilidade)

Para mitigar ataques de enumeração de usuários (*User Enumeration*), onde um atacante tenta descobrir se determinado CPF ou E-mail está cadastrado na base de dados:
- O **Server Action** (`createClientAction`) mapeia erros específicos do backend (`ClientAlreadyExistsException` e `ClientEmailAlreadyExistsException`) para um identificador de erro único e genérico: `CLIENT_ALREADY_EXISTS`.
- O hook de formulário traduz esse erro para a chave `conflictErrorMessage`, exibindo para o usuário a mensagem: *"Não foi possível realizar o cadastro. O CPF ou E-mail informado já está em uso."* (ou a versão em inglês, conforme o idioma selecionado).
- Isso garante que a aplicação sinalize a impossibilidade do cadastro devido a dados duplicados sem revelar qual campo específico causou a colisão.

---

## 🧪 Testes

### Configuração

O Web usa **Jest** integrado ao **Next.js** (`next/jest`) com ambiente **jsdom** para simular o browser. O **Testing Library** é utilizado para renderização e interação com componentes React. Os testes E2E são escritos com **Cypress**.

- **Configuração Jest**: `jest.config.ts` (usa `createJestConfig` do Next.js para suporte a imports, variáveis de ambiente e path aliases)
- **Setup**: `jest.setup.ts` (importa `@testing-library/jest-dom` para matchers customizados)
- **Alias de módulos**: `@/*` mapeado para `src/*`
- **E2E ignorados pelo Jest**: o padrão `tests/e2e/` é excluído — Cypress roda separadamente

### Suites de Testes

| Suite | Caminho | Tipo | O que testa |
|-------|---------|------|-------------|
| `formatters` | `src/shared/utils/formatters.spec.ts` | Unitário | `formatCpf`: CPF completo, digitação parcial, remoção de caracteres não-numéricos, truncamento, input vazio |
| `Client Schema` | `src/app/[locale]/cadastro/schemas/client.schema.spec.ts` | Unitário | Validação Zod: campos obrigatórios, CPF algoritmo, e-mail, cor inválida, observations, strip de máscara do CPF, todas as cores válidas, nome completo sem números e com sobrenome |
| `createClientAction` | `src/server-actions/client-registration-system-api/create-client/create-client.spec.ts` | Unitário | Server Action: resposta de sucesso (201), erro da API (4xx), erro de rede |
| `ClientRegistrationForm` | `src/app/[locale]/cadastro/components/ClientRegistrationForm.spec.tsx` | Componente | Renderização de campos e placeholders, erros de validação ao submeter vazio, bloqueio de submit sem cor |

### Comandos

```bash
# Testes unitários e de componentes (via Makefile raiz)
make test

# Testes unitários e de componentes (via docker-compose direto)
docker-compose run --rm web npm run test

# Testes E2E com Cypress (requer API + Web rodando)
make test-e2e

# Testes E2E (via docker-compose direto)
docker-compose run --rm web npm run test:e2e
```
