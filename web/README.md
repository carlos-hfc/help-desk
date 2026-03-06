# Help Desk Web

Frontend em React + Vite + TypeScript. Fornece a interface para gerenciar serviços, criar chamados, gerenciar técnicos.

## Funcionalidades

- Autenticação de usuários (login, cadastro, logout)
- Gerenciamento de técnicos, serviços e clientes
- Criar, iniciar e encerrar um chamado

## Requisitos

- Node.js 22+
- npm ou outro gerenciador (pnpm/yarn)

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)

## Estrutura do Projeto

```
web/
├── public/              # Arquivos estáticos (images, ícones)
├── src/ 
│   ├── @types/          # Tipagem global
│   ├── assets/          # Imagens utilizadas
│   ├── components/      # Componentes reutilizáveis (Header, Button, etc)
│   ├── http/            # Funções para requisições HTTP
│   ├── lib/             # Bibliotecas auxiliares
│   ├── pages/           # Páginas principais
│   ├── index.css        # Estilos globais
│   ├── main.tsx         # Ponto de entrada da aplicação
│   ├── env.ts           # Validar e expor variáveis ambiente
│   └── app.tsx          # Componente principal
├── index.html           # HTML principal
├── package.json         # Dependências e scripts
├── vite.config.ts       # Configuração do Vite
└── tsconfig.json        # Configuração TypeScript
```

## Configuração

1. Clone o repositório:

```sh
git clone https://github.com/carlos-hfc/help-desk.git
```

2. Instale as dependências:

```sh
cd web 
npm install
```

3. Configure as variáveis ambiente:

```sh
VITE_API_URL=
```

## Executando o projeto

1. Inicie o servidor de desenvolvimento:

```sh
cd web
npm run dev
# ou
turbo dev
```

2. Acesse [http://localhost:3000](http://localhost:3000) no navegador

## Scripts

- `npm run dev` — servidor em modo desenvolvimento (watch)
- `npm run build` — gera versão de produção
- `npm run preview` — visualiza a build de produção localmente

## Contribuição
Pull requests são bem-vindas! Siga as boas práticas de commit e mantenha o padrão de código.

## Licença
Está sob a licença MIT.
