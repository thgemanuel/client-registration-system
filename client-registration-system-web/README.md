# Client Registration System - Web

## 📖 Sobre o Projeto
Este é o serviço de frontend (Web) do **Client Registration System**. Trata-se de uma aplicação SPA / SSR desenvolvida com foco em alta performance, acessibilidade e experiência do usuário. Esta interface consome os serviços expostos pelo projeto API e fornece formulários interativos, validação no cliente (Zod/React Hook Form) e um design moderno.

## 🚀 Tecnologias Utilizadas
- **[Next.js (App Router)](https://nextjs.org/)**: Framework React para renderização híbrida, rotas e performance aprimorada.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para JavaScript, garantindo segurança na interface.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utilitário para estilização rápida e responsiva.
- **[shadcn/ui](https://ui.shadcn.com/)**: Componentes de interface acessíveis e altamente customizáveis (usando Radix UI).
- **[React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)**: Para gerenciamento de estado complexo de formulários e validação rigorosa de schemas.
- **[Turbopack](https://turbo.build/pack)**: Sucessor do Webpack, ativado para tempos de build de desenvolvimento ultrarrápidos.
- **[Cypress](https://www.cypress.io/)**: Ferramenta de testes End-to-End (E2E) simulando comportamento de usuários reais.

## 📋 Pré-requisitos
Antes de iniciar, você precisará ter instalado em sua máquina:
- O serviço de API já configurado e rodando (para que a submissão de formulários seja bem sucedida localmente).
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (Para encapsular todo o ambiente sem Node.js nativo)
- [Make](https://www.gnu.org/software/make/) (Opcional, atalhos do Makefile)

## 🛠️ Como Executar

### Utilizando o `Makefile` (Recomendado)
Na raiz do repositório, existe um `Makefile` configurado para facilitar a vida do desenvolvedor orquestrando os comandos de todos os projetos. A partir da **pasta raiz do projeto**, execute:

1. **Instalar Dependências da Web (via Docker):**
   ```bash
   make install
   ```
2. **Iniciar o Web App e a API em modo de desenvolvimento simultâneos:**
   ```bash
   make dev
   ```
3. **Rodar os Testes E2E (Cypress) no Terminal via Docker:**
   ```bash
   make test-e2e
   ```

### Executando Manualmente (Sem o `Makefile`)
Caso prefira não usar o Makefile, você pode utilizar o docker-compose diretamente da raiz do repositório.

1. **Subir a interface web juntamente com os serviços em modo watch:**
   A partir da pasta raiz:
   ```bash
   docker-compose up -d web
   ```
2. **Executar Testes Cypress no Terminal:**
   ```bash
   docker-compose run --rm web npm run test:e2e
   ```

---
*A aplicação web estará disponível por padrão em `http://localhost:3000` (ou na porta 3001, dependendo se a porta 3000 já estiver em uso pela API).*
