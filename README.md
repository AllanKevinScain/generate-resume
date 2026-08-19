<p align="center">
  <img src="./public/favicon.svg" width="260" height="250" alt="Logo do Generate Resume" />
</p>

<h1 align="center">Generate Resume</h1>

<p align="center">
  Uma aplicação web para centralizar informações profissionais, integrar projetos do GitHub e gerar currículos em PDF.
</p>

<p align="center">
  <img alt="React 19" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=061A23" />
  <img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Vite 8" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Auth%20%26%20Database-3FCF8E?logo=supabase&logoColor=white" />
  <img alt="Vitest 4" src="https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white" />
</p>

## Sobre o projeto

O **Generate Resume** foi criado para reunir, em um único lugar, os dados necessários para apresentar um perfil profissional. Em vez de manter informações pessoais, formação acadêmica, tecnologias, diferenciais e projetos espalhados em documentos diferentes, o usuário pode cadastrar e organizar esses dados dentro da aplicação.

A autenticação é feita pelo Supabase e também pode utilizar o GitHub como provedor social. Quando o acesso ocorre pelo GitHub, a aplicação usa a sessão autenticada para consultar os repositórios públicos do usuário sem depender do limite reduzido de requisições anônimas da API. A tela de projetos oferece pesquisa e paginação, facilitando a localização dos repositórios que podem ser usados na composição do currículo.

O perfil profissional inclui dados de contato, endereço, links, foto, apresentação pessoal e formações acadêmicas. As informações são armazenadas no Supabase com políticas de segurança em nível de linha, de modo que cada usuário só possa acessar e modificar os próprios registros. A foto de perfil também é mantida em um bucket privado.

Ao final do fluxo, a aplicação utiliza os dados cadastrados para gerar um currículo em PDF. O objetivo não é apenas produzir um arquivo, mas manter uma fonte de dados profissional atualizável: quando alguma informação muda, ela pode ser corrigida na plataforma e reutilizada na próxima geração.

## Funcionalidades

- Autenticação com e-mail e senha pelo Supabase.
- Login social com GitHub.
- Cadastro e edição de perfil profissional.
- Upload e armazenamento privado da foto de perfil.
- Cadastro de uma ou mais formações acadêmicas e seus respectivos status.
- Consulta autenticada dos repositórios públicos do GitHub.
- Pesquisa e paginação da listagem de projetos.
- Gerenciamento das informações que compõem o currículo.
- Cadastro e apresentação de tecnologias e diferenciais profissionais.
- Geração e download do currículo em PDF.
- Tema visual configurável.
- Mensagens de sucesso e erro exibidas por toast.
- Validação dos formulários antes do envio.

## Fluxo principal

1. O usuário entra com e-mail e senha ou conecta sua conta do GitHub.
2. Preenche os dados pessoais e profissionais na tela de perfil.
3. Adiciona as formações acadêmicas e informa o status de cada uma.
4. Consulta seus repositórios do GitHub e organiza as demais informações profissionais.
5. Acessa a tela de currículo para gerar e baixar o documento em PDF.

## Tecnologias utilizadas

| Tecnologia | Utilização no projeto |
| --- | --- |
| **React 19** | Construção das páginas e dos componentes da interface. |
| **TypeScript 5** | Tipagem estática dos componentes, serviços, hooks e modelos de dados. |
| **Vite 8** | Servidor de desenvolvimento e geração do build de produção. |
| **React Router DOM** | Navegação entre as páginas da aplicação. |
| **TanStack Query** | Consulta, cache e sincronização de dados assíncronos. |
| **Supabase** | Autenticação, banco PostgreSQL, políticas RLS e armazenamento de arquivos. |
| **React Hook Form** | Controle do estado e envio dos formulários. |
| **Yup** | Regras de validação dos formulários. |
| **Tailwind CSS 4** | Estilização utilitária e composição do layout. |
| **Safira UI** | Componentes reutilizáveis da interface e sistema de toast. |
| **Framer Motion** | Animações e transições da experiência visual. |
| **pdf-lib** | Montagem e geração do currículo em PDF. |
| **Vitest** | Execução dos testes unitários e de componentes. |
| **Testing Library** | Testes da interface a partir do comportamento observado pelo usuário. |
| **ESLint e Prettier** | Análise estática e padronização do código. |
| **Vercel** | Hospedagem e entrega da aplicação web. |

## Estrutura do projeto

```text
generate-resume/
├── public/                 # Arquivos públicos e identidade visual
├── src/
│   ├── assets/             # Imagens utilizadas pela aplicação
│   ├── components/         # Componentes reutilizáveis
│   ├── constants/          # Constantes compartilhadas na raiz de uso
│   ├── hooks/              # Hooks da aplicação e consultas do TanStack Query
│   ├── pages/              # Páginas associadas às rotas
│   ├── services/           # Integrações com Supabase, GitHub e geração de PDF
│   ├── styles/             # Estilos globais
│   ├── types/              # Tipagens reutilizadas em mais de um módulo
│   ├── utils/              # Funções utilitárias
│   ├── app.tsx             # Rotas e composição principal da aplicação
│   └── main.tsx            # Ponto de entrada do React
├── supabase/
│   └── migrations/         # Estrutura e políticas do banco de dados
└── package.json            # Dependências e scripts do projeto
```

As rotas autenticadas atuais incluem:

- `/projects`: repositórios e projetos do GitHub;
- `/techs`: tecnologias profissionais;
- `/differentials`: diferenciais profissionais;
- `/profile`: dados pessoais e formação acadêmica;
- `/resume`: geração do currículo.

## Banco de dados e segurança

O banco PostgreSQL é gerenciado pelo Supabase. As entidades de perfil e formação acadêmica são representadas principalmente pelas tabelas `profiles` e `educations`.

As políticas de **Row Level Security (RLS)** vinculam os registros ao usuário autenticado. Isso impede que uma sessão leia ou altere o perfil e as formações pertencentes a outra conta. O bucket `profile-photos` é privado e segue a mesma ideia de isolamento para os arquivos de cada usuário.

As definições de banco versionadas no repositório estão em `supabase/migrations`. Ao configurar um novo ambiente Supabase, aplique essas migrações antes de testar o cadastro do perfil.

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base em `.env.example`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
VITE_GITHUB_API_URL=https://api.github.com
```

| Variável | Descrição |
| --- | --- |
| `VITE_SUPABASE_URL` | URL pública do projeto no Supabase. |
| `VITE_SUPABASE_ANON_KEY` | Chave pública `anon` usada pelo cliente web. |
| `VITE_GITHUB_API_URL` | URL-base da API REST do GitHub. |

As variáveis são obrigatórias. A aplicação não utiliza valores alternativos quando uma delas está ausente, portanto uma configuração incompleta deve causar erro durante a inicialização ou o uso da integração correspondente.

> Não envie o arquivo `.env` ao repositório e nunca coloque uma chave `service_role` no frontend.

## Configuração do login com GitHub

Além das variáveis locais, a autenticação social exige configuração nos dois serviços:

1. Crie uma OAuth App nas configurações de desenvolvedor do GitHub.
2. Use a URL de callback fornecida pelo Supabase na OAuth App.
3. No painel do Supabase, habilite o provedor GitHub e informe o Client ID e o Client Secret.
4. Em **Authentication > URL Configuration**, cadastre a URL local e as URLs de produção autorizadas.
5. Nunca armazene o Client Secret no código ou em variáveis `VITE_*`, pois elas são expostas no navegador.

O token do provedor é obtido por meio da sessão autenticada e usado nas chamadas à API do GitHub, aumentando o limite disponível em comparação com requisições anônimas.

## Executando localmente

### Pré-requisitos

- Node.js compatível com o Vite 8;
- npm;
- um projeto configurado no Supabase;
- uma OAuth App do GitHub, caso o login social seja utilizado.

### Instalação

```bash
git clone <url-do-repositorio>
cd generate-resume
npm install
```

Copie `.env.example` para `.env`, preencha as variáveis e inicie o ambiente:

```bash
npm run dev
```

Por padrão, o Vite disponibiliza a aplicação em `http://localhost:5173`.

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Valida o TypeScript e cria o build de produção. |
| `npm run preview` | Executa localmente uma prévia do build. |
| `npm run test` | Executa a suíte de testes uma vez. |
| `npm run test:watch` | Mantém o Vitest em modo de observação. |
| `npm run lint` | Analisa o código com ESLint. |
| `npm run format` | Formata os arquivos com Prettier. |
| `npm run check` | Executa formatação, lint, testes e build em sequência. |

## Testes

Os testes utilizam **Vitest**, **jsdom** e **Testing Library**. Componentes e páginas mantêm seus testes próximos da implementação sempre que isso fizer sentido:

```text
components/nome-do-componente/
├── index.tsx
├── component.type.ts
└── component.test.tsx

pages/nome-da-pagina/
├── index.tsx
├── page.type.ts
└── page.test.tsx
```

Para executar a suíte completa:

```bash
npm run test
```

Antes de entregar uma alteração, a verificação mais abrangente é:

```bash
npm run check
```

## Convenções do código

- Pastas são nomeadas em `kebab-case`.
- Componentes React usam `PascalCase`.
- Funções, variáveis e variantes usam `camelCase`.
- Props e parâmetros são desestruturados no início da função.
- Constantes ficam em uma pasta `constants` na raiz do contexto em que são usadas.
- Tipos compartilhados ficam em `src/types`, em arquivos terminados por `.type.ts`.
- O `index.tsx` de um componente contém o componente, sem ser usado como arquivo agregador de exportações.
- Novos componentes e páginas devem receber testes com Vitest sempre que houver comportamento testável.

## Deploy na Vercel

O projeto pode ser publicado diretamente pela Vercel. Para este repositório, mantenha a raiz do projeto apontando para o diretório que contém o `package.json` — não para `src`.

Configuração esperada:

- **Framework Preset:** Vite;
- **Install Command:** `npm install`;
- **Build Command:** `npm run build`;
- **Output Directory:** `dist`;
- **Environment Variables:** as mesmas variáveis `VITE_*` utilizadas no ambiente local.

Também adicione a URL publicada na configuração de URLs autorizadas do Supabase e na configuração do fluxo OAuth do GitHub.

## Licença

Este repositório ainda não declara uma licença de distribuição. Caso o projeto passe a ser compartilhado ou distribuído publicamente, adicione um arquivo de licença compatível com o uso pretendido.
