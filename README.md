# Trabalho Final - Automação de Testes na Camada de Interface Web

Projeto de automação com [Cypress](https://www.cypress.io/) desenvolvido como trabalho de conclusão da disciplina Automação de Testes na Camada de Interface (web).

## Casos de teste automatizados

Casos da página [Test Cases](https://automationexercise.com/test_cases):

| Caso | Descrição |
| --- | --- |
| 1 | Registrar usuário |
| 2 | Login com e-mail e senha corretos |
| 3 | Login com e-mail e senha incorretos |
| 4 | Logout do usuário |
| 5 | Cadastrar usuário com e-mail já existente |
| 8 | Verificar todos os produtos e a página de detalhes do produto |
| 9 | Pesquisar produto |
| 10 | Verificar inscrição na página inicial |
| 15 | Fazer pedido cadastrando antes do checkout |
| 16 | Fazer pedido fazendo login antes do checkout |

## Tecnologias

- Cypress
- @faker-js/faker para geração de dados dinâmicos
- cypress-mochawesome-reporter para o relatório HTML
- GitHub Actions para execução em CI

## Estrutura

```
cypress/
├── e2e/
│   └── trabalho-final.cy.js
├── fixtures/
│   ├── pagamento.json
│   ├── produtos.json
│   └── usuario.json
├── modules/
│   ├── cadastro/
│   ├── carrinho/
│   ├── checkout/
│   ├── conta/
│   ├── fluxos/
│   ├── inscricao/
│   ├── login/
│   ├── menu/
│   └── produtos/
└── support/
    ├── dados.js
    └── e2e.js
```

- `e2e`: spec com os cenários, que apenas orquestra as ações de negócio.
- `modules`: ações de negócio organizadas por funcionalidade, cada uma com seus seletores (`const seletores`) e suas validações.
- `modules/fluxos`: fluxo de preparação reutilizado pelos cenários que precisam de um usuário já cadastrado.
- `fixtures`: dados fixos usados nos cenários.
- `support/dados.js`: geração de usuários com dados dinâmicos.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 22 ou superior
- npm

## Instalação

```bash
npm install
```

## Execução

Modo interativo:

```bash
npm run cy:open
```

Modo headless:

```bash
npm test
```

## Relatório

Após a execução em modo headless, o relatório HTML é gerado em `cypress/reports/html/index.html`.

## GitHub Actions

O workflow fica em `.github/workflows/trabalho-final.yml` e é executado manualmente:

1. Acesse a aba **Actions** do repositório.
2. Selecione **Testes E2E - Trabalho Final**.
3. Clique em **Run workflow**.

Ao final da execução, o relatório e as screenshots ficam disponíveis no artefato `relatorio-testes`, na página da execução.
