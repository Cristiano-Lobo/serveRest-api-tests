````markdown
# 🚀 ServeRest API Tests

Este projeto contém testes automatizados para a API [ServeRest](https://serverest.dev/), utilizando o framework [Cypress](https://www.cypress.io/).  
O foco é validar os principais fluxos da API de **Usuários** e **Produtos** com uma arquitetura simples e fácil de manter.

---

## 📌 Objetivo

- Criar e validar **usuários comuns** e **administradores**;
- Criar e validar **Produtos**;

---

## 🏗 Arquitetura

```bash

serveRest-api-tests/
├── cypress.config.js # Configuração do Cypress + variáveis de ambiente
├── package.json # Scripts e dependências
├── .env.example # Modelo de variáveis de ambiente
├── cypress/
│ ├── e2e/
│ │ └── api/
│ │ └── users.cy.js # Cenários de teste da API de Usuários
│ ├── fixtures/
│ │ └── user.json # Massa base para criação de usuários
│ └── support/
│ ├── api.js # Funções auxiliares para requisições e login
│ ├── data.js # Factory para geração de massa dinâmica
│ └── e2e.js # Bootstrap do Cypress
```
````

---

## ⚙️ Configuração

### 1️⃣ Clonar o repositório

```bash
git clone git@github.com-pessoal:SEU_USUARIO/serveRest-api-tests.git
cd serveRest-api-tests
```

### 2️⃣ Instalar dependências

```bash
yarn
# ou
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie o arquivo `.env` a partir do `.env.example`:

```bash
cp .env.example .env
```

Edite o `.env`:

```dotenv
CYPRESS_BASE_URL=https://serverest.dev
CYPRESS_API_EMAIL=admin@exemplo.com
CYPRESS_API_PASSWORD=admin123
```

---

## 🧪 Executando os testes

### Modo interativo (GUI do Cypress)

```bash
yarn cypress:open
```

### Modo headless (terminal)

```bash
yarn test
```

---

## 🛠 Tecnologias

- [Node.js](https://nodejs.org/) — Ambiente de execução
- [Cypress](https://www.cypress.io/) — Framework de testes
- [dotenv](https://github.com/motdotla/dotenv) — Gerenciamento de variáveis de ambiente
- [ServeRest](https://serverest.dev/) — API utilizada nos testes

---
