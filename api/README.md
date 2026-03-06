# Help Desk API

Backend em Node.js + TypeScript usando Fastify, Prisma OEM e Postgres. Responsável pelos endpoints de serviços, chamados, técnicos, clientes e admin.

## Funcionalidades

- Autenticação (JWT + cookies)
- CRUD de usuários, serviços e chamados
- Migrations e seed com Prisma

## Requisitos

- Node.js 22+
- npm ou outro gerenciador (pnpm/yarn)
- Docker e Docker Compose (recomendado para Postgres)

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)

## Estrutura do Projeto

```
api/
├── prisma/ 
│   ├── schema.prisma/   # Modelo do banco de dados
│   ├── seed.ts/         # Seed de dados
├── src/ 
│   ├── @types/          # Tipagem global
│   ├── errors/          # Erros que ocorrem nas requisições
│   ├── lib/             # Bibliotecas auxiliares
│   ├── middlweares/     # Middlewares customizados
│   ├── routes/          # Rotas da API
│   ├── test/            # Factories e base para executar os testes
│   ├── utils/           # Utilitários
│   ├── main.tsx         # Ponto de entrada da aplicação
│   ├── env.ts           # Validar e expor variáveis ambiente
│   ├── error-handler.ts # Centralizar e unificar os erros
│   ├── app.ts           # Injetar rotas e middlewares
│   └── server.ts        # Inicialização do servidor Fastify
├── prisma.config.ts     # Configuração do Prisma ORM
├── package.json         # Dependências e scripts
└── tsconfig.json        # Configuração TypeScript
```

## Configuração

1. Clone o repositório:

```sh
git clone https://github.com/carlos-hfc/help-desk.git
```

2. Instale as dependências:

```sh
cd api
npm install
```

3. Configure as variáveis ambiente:

```sh
DATABASE_URL=
NODE_ENV=
JWT_SECRET=
COOKIE_NAME=
ALLOWED_ORIGINS=
```

4. Rode o banco de dados com Docker:

```sh
docker-compose up -d
```

5. Execute as migrações do Prisma:

```sh
npx prisma migrate dev
```

6. Popule o banco com exemplos (opcional):

```sh
npx prisma db seed
```

## Executando o projeto

1. Inicie o servidor de desenvolvimento:

```sh
cd api
npm run dev
# ou
turbo dev
```

2. Acesse [http://localhost:3333/docs](http://localhost:3333/docs) no navegador para visualizar as rotas

## Endpoints Principais

- `/calls` — Gerenciamento de chamados
- `/technicians` — Gerenciamento de técnicos
- `/services` — Gerenciamento de serviços

## Scripts

- `npm run dev` — servidor em modo desenvolvimento (watch)
- `npm run lint` — roda ESLint
- `npm run test` — executa testes com Vitest (`.env.test`)

## Contribuição
Pull requests são bem-vindas! Siga as boas práticas de commit e mantenha o padrão de código.

## Licença
Está sob a licença MIT.
