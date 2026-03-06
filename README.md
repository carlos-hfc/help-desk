# Help Desk

Este projeto é uma aplicação para gestão de chamados, composta por duas aplicações:

- **api/**: Backend em Node.js com TypeScript, utilizando Prisma ORM, Docker e Vitest para testes. Responsável pela lógica de negócios, autenticação, rotas REST, manipulação de dados e integração com banco de dados.
- **web/**: Frontend para admin, técnicos e clientes, também em React + Vite, com funcionalidades de gestão de serviços, abertura de chamados, gestão de clientes e gestão de técnicos.

## Funcionalidades
- Cadastro e login de usuários
- Listagem de chamados
- Gestão de serviços, técnicos e clientes
- Iniciar e encerrar o atendimento de um chamado
- Adicionar serviços adicionais a um chamado
- Upload de imagens

## Requisitos

- Node.js 20+
- Docker e Docker Compose (recomendado para Postgres)
- npm/pnpm (ou outro gerenciador, dependendo do projeto)

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)

## Estrutura do Projeto
```
help-desk/
├── api/      # Backend (Node.js, TypeScript, Prisma, Docker)
├── web/      # Frontend (React, Vite)
```

## Configuração

### Backend (api)

1. Instale as dependências:
```sh
cd api
npm install
```

2. Configure as variáveis ambiente:
```sh
DATABASE_URL=
NODE_ENV=
JWT_SECRET=
COOKIE_NAME=
ALLOWED_ORIGINS=
```

3. Rode o banco de dados com Docker:
```sh
cd ..
docker-compose up -d
```

4. Execute as migrações do Prisma:
```sh
cd api
npx prisma migrate dev
```

5. Popule o banco com exemplos: (opcional)
```sh
npx prisma db seed
```

### Frontend (client/web)

1. Instale as dependências:
```sh
cd web
npm install
```

2. Configure as variáveis ambiente:
```sh
VITE_API_URL=
```

## Executando o projeto

```sh
turbo dev
```

## Contribuição
Pull requests são bem-vindos! Para contribuir, siga as boas práticas de commit e mantenha o padrão de código.

## Licença
Este projeto está sob a licença MIT.