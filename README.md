# Sensedia Challenge - Sistema de Gerenciamento de Usuários

Este é um projeto Next.js + TypeScript que consome uma API externa para gerenciar usuários, posts e álbuns com metadados brasileiros personalizados.

## 🚀 Tecnologias

- Next.js 15.3
- React 19
- TypeScript
- TailwindCSS 4.0
- Radix UI (Componentes acessíveis)
- React Hook Form + Zod (Validação)
- Lucide React (Ícones)
- Date-fns (Manipulação de datas)
- Jest + Testing Library (Testes)
- Sonner (Notificações)

## 🛠️ Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (recomendado)
- Git
- **API Externa** rodando em `http://localhost:8080` (ou configure `NEXT_PUBLIC_API_URL`)

### Passos para Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ayranoliveira1/sensedia-challenge.git
cd sensedia-challenge
```

2. Configure as variáveis de ambiente:

Duplique o .env.example para `.env` na raiz do projeto:

**Variáveis de Ambiente Disponíveis:**

- `NEXT_PUBLIC_API_URL`: URL base da API externa (padrão: http://localhost:8080)
- `NEXT_PUBLIC_FRONTEND_URL`: URL do frontend (padrão: http://localhost:3000)
- `PASSWORD`: coloque sua Senha

3. Instale as dependências:

```bash
pnpm install
```

4. Gere usuários brasileiros (opcional) - caso não tenha os dados em data:

```bash
node scripts/generate-real-users.js
```

5. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build de Produção

```bash
pnpm build
pnpm start
```

### Links

| Ambiente | URL                   |
| -------- | --------------------- |
| Local    | http://localhost:3000 |

## 📁 Estrutura do Projeto

```
sensedia-challenge-main/
├── public/                    # Arquivos estáticos
│   ├── logo-sensedia.png     # Logo da Sensedia
│   └── logo.png              # Logo principal
│
├── data/                     # Dados locais
│   └── user-meta.json        # Metadados dos usuários brasileiros
│
├── scripts/                  # Scripts utilitários
│   └── generate-real-users.js # Gerador de usuários brasileiros
│
└── src/
    ├── __tests__/            # Testes automatizados
    │   ├── api/              # Testes das APIs
    │   ├── components/       # Testes dos componentes
    │   ├── hooks/            # Testes dos hooks
    │   ├── lib/              # Testes das libs
    │   ├── services/         # Testes dos serviços
    │   └── utils/            # Testes dos utilitários
    │
    ├── app/                  # App Router (Next.js 13+)
    │   ├── api/              # API Routes
    │   │   ├── user/         # Endpoints de usuários
    │   │   └── usermetadata/ # Endpoints de metadados
    │   ├── user/             # Páginas de usuários
    │   │   ├── [username]/   # Página de perfil dinâmica
    │   │   │   ├── components/ # Componentes do perfil
    │   │   │   └── page.tsx  # Página do perfil
    │   │   ├── new/          # Criação de usuários
    │   │   │   ├── components/ # Componentes do formulário
    │   │   │   └── page.tsx  # Página de criação
    │   │   ├── components/   # Componentes da listagem
    │   │   └── page.tsx      # Página principal de usuários
    │   ├── globals.css       # Estilos globais
    │   ├── layout.tsx        # Layout principal
    │   ├── not-found.tsx     # Página 404
    │   └── page.tsx          # Página inicial (redirect)
    │
    ├── components/           # Componentes reutilizáveis
    │   ├── alert-dialog/     # Sistema de diálogos de alerta
    │   ├── breadcrumb/       # Navegação breadcrumb
    │   ├── button/           # Componentes de botões
    │   ├── checkbox-group/   # Grupos de checkboxes
    │   ├── floating-input/   # Inputs flutuantes
    │   ├── header/           # Componentes do cabeçalho
    │   ├── hero-section/     # Seção hero da página
    │   ├── modal/            # Sistema de modais
    │   ├── not-found/        # Componentes de erro 404
    │   ├── pagination/       # Sistema de paginação
    │   ├── table/            # Componentes de tabela
    │   ├── toolbar/          # Barra de ferramentas
    │   ├── ui/               # Componentes base (Avatar, Cards, etc.)
    │   ├── user-dropdown/    # Dropdown de usuários
    │   ├── footer.tsx        # Rodapé
    │   ├── form-types.ts     # Tipos para formulários
    │   └── index.ts          # Exportações centralizadas
    │
    ├── hooks/                # Custom hooks React
    │   ├── useUserForm.ts    # Hook para formulários de usuário
    │   └── useUserTable.ts   # Hook para tabela de usuários
    │
    ├── http/                 # Requisições HTTP
    │   ├── create-user.ts         # Criar usuário
    │   ├── create-user-metadata.ts # Criar metadados
    │   ├── delete-user.ts         # Deletar usuário
    │   ├── get-albums.ts          # Buscar álbuns
    │   ├── get-albums-by-user-id.ts # Álbuns por usuário
    │   ├── get-posts.ts           # Buscar posts
    │   ├── get-posts-by-user-id.ts # Posts por usuário
    │   ├── get-user-by-id.ts      # Usuário por ID
    │   ├── get-user-metadata.ts   # Metadados do usuário
    │   ├── get-user-metadata-client.ts # Metadados (client)
    │   ├── get-user-profile.ts    # Perfil do usuário
    │   └── get-users.ts           # Listar usuários
    │
    ├── infra/                # Configurações de infraestrutura
    │   ├── config/           # Configurações
    │   │   ├── api.ts        # Configurações da API
    │   │   └── env.ts        # Configurações de ambiente
    │   ├── types/            # Tipos HTTP
    │   │   └── http.ts       # Tipos de requisições
    │   ├── utils/            # Validadores
    │   │   └── validators.ts # Schemas Zod e validações
    │   └── index.ts          # Exportações da infra
    │
    ├── lib/                  # Utilitários e helpers
    │   ├── error-utils.ts    # Utilitários de erro
    │   ├── fake-database.ts  # Mock database
    │   ├── format-days.ts    # Formatação de dias
    │   ├── generate-metatada.ts # Geração de metadados
    │   ├── http-client.ts    # Cliente HTTP
    │   └── utils.ts          # Utilitários gerais
    │
    ├── services/             # Lógica de negócio
    │   └── user.service.ts   # Serviços de usuário
    │
    └── types/                # Tipos TypeScript globais
        └── index.ts          # Definições de tipos
```

## 🧪 Telas
![image](https://github.com/user-attachments/assets/532d5813-1117-4986-81ed-da9eb2e27f96)
![image](https://github.com/user-attachments/assets/42336589-35fc-46d1-b12a-cfa190ac385f)
![image](https://github.com/user-attachments/assets/a85820ca-f160-4f2b-a517-00ce8d7c9eeb)
![image](https://github.com/user-attachments/assets/aacd656f-bda1-41d0-95cc-7004daeb8d3c)

![image](https://github.com/user-attachments/assets/e8bab01c-1266-4112-9452-527ef99ce37e)
![image](https://github.com/user-attachments/assets/ac740bf2-f340-4b74-a74a-64814df236bf)
![image](https://github.com/user-attachments/assets/1aefa666-fec8-4638-95ee-9b56b4b3d497)
![image](https://github.com/user-attachments/assets/1a99c018-e3b8-419d-9b2c-fdb08b975982)

![image](https://github.com/user-attachments/assets/b1bd102d-bb92-4110-9ab4-57439a5c81ce)
![image](https://github.com/user-attachments/assets/846c83a4-a44c-406d-b7c9-92381fa35ddb)

![image](https://github.com/user-attachments/assets/70406c9d-211c-4531-9b56-3a532643cd1c)
![image](https://github.com/user-attachments/assets/cb1cc560-6d96-499b-a7ce-c16afb02027b)
![image](https://github.com/user-attachments/assets/680f2e8e-1d58-4120-a8db-51a62978f55e)
![image](https://github.com/user-attachments/assets/df9ff033-20b7-4a88-9f37-40dfc33b11b1)
![image](https://github.com/user-attachments/assets/dcb5e2a4-dfaa-4455-b01f-e6760c76ddd9)


## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Executar testes com coverage
pnpm test:coverage
```

## 🛠️ Scripts Disponíveis

| Comando                               | Descrição                                |
| ------------------------------------- | ---------------------------------------- |
| `pnpm dev`                            | Inicia servidor de desenvolvimento       |
| `pnpm build`                          | Cria build de produção                   |
| `pnpm start`                          | Inicia servidor de produção              |
| `pnpm lint`                           | Executa linter ESLint                    |
| `pnpm test`                           | Executa testes Jest                      |
| `pnpm test:watch`                     | Executa testes em modo watch             |
| `pnpm test:coverage`                  | Executa testes com relatório de coverage |
| `node scripts/generate-real-users.js` | Gera usuários brasileiros                |

Este projeto foi desenvolvido como parte do desafio técnico da Sensedia.
