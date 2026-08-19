# AGENTS.md

## Comunicação

- Responder sempre em português, Brasil.
- Ser direto, organizado e objetivo.
- Não inventar informações. Se algo não estiver claro no contexto, perguntar antes de alterar arquivos.
- Use linguagem clara, direta e objetiva.
- Use palavras óbvias e fáceis de entender.
- Evite termos técnicos desnecessários.
- Quando usar termos técnicos, explique rapidamente.
- Seja prático e vá direto ao ponto.
- Organize a resposta com títulos, subtítulos e exemplos quando ajudar.

## O que este projeto é

Este projeto e um gerador e editor de curriculo/portfolio em React. Ele autentica no Supabase, gerencia cadastros em paginas dedicadas, consome repositorios publicos do GitHub para a pagina de projetos e gera PDF com os dados do Supabase.

## Regras gerais do projeto

- Responder sempre em portugues do Brasil.
- Ser direto, claro e objetivo.
- Nao inventar informacoes. Se algo estiver ambigio, perguntar antes de alterar arquivos.
- Fazer mudancas pequenas e incrementais.

## Stack atual

- React 19
- Vite 8
- TypeScript
- Tailwind CSS v4 com `@tailwindcss/vite`
- `framer-motion`
- `@tanstack/react-query`
- `react-hook-form`
- `react-router-dom`
- `react-icons`
- `@supabase/supabase-js`
- `pdf-lib`
- `tailwind-merge`
- `babel-plugin-react-compiler`
- `vitest`
- `@testing-library/react`

## Padrões importantes

- Botões usam um único componente com `variant`: `primary`, `outline`, `ghost`, `danger` ou `unstyled`; não use APIs estáticas como `Button.outline`.
- Campos de texto usam o `Field` exportado pela Safira UI; nao recrie um componente `Input` local.
- Componentes da Safira UI, como `Card`, `Grid`, `Stack`, `Field`, `Cluster` e `Badge`, devem ser importados diretamente de `safira-ui/react`.
- `src/components/index.ts` deve exportar somente componentes locais do projeto.
- Nao reexportar componentes da Safira UI ou de outras bibliotecas por `src/components/index.ts`.
- Usar `@/components` somente para componentes implementados dentro de `src/components/`.
- Declare `required` explicitamente nos campos obrigatorios e use `Controller` para integrar o `Field` ao `react-hook-form`.
- O `ThemeMenu` aparece no header quando o usuario esta logado.
- Quando o usuario nao esta logado, o `ThemeMenu` vem do provider principal.
- A pagina `/projects` apenas lista repositorios publicos do GitHub.
- As paginas de gestao usam Supabase diretamente.
- A geracao de PDF usa dados do Supabase e deixa editavel somente cabecalho e contato/rodape.

## Estrutura esperada

- `src/pages/` para paginas
- `src/components/` para componentes reutilizaveis
- `constants/` dentro da raiz da funcionalidade para constantes de uso local
- `src/constants/` somente para constantes compartilhadas entre funcionalidades
- `src/services/` para integracoes com Supabase e GitHub
- `src/providers/` para auth, tema e query client
- `src/types/` para tipos compartilhados
- `src/utils/` para funcoes puras e helpers
- Componentes reutilizaveis devem seguir `src/components/{nome-do-componente}/index.tsx`.
- Tipos exclusivos de componentes devem ficar em `component.type.ts` na mesma pasta.
- Testes de componentes devem ficar em `component.test.tsx` na mesma pasta.
- Paginas devem seguir `src/pages/{nome-da-pagina}/index.tsx`.
- Tipos exclusivos de paginas devem ficar em `page.type.ts` na mesma pasta.
- Testes de paginas devem ficar em `page.test.tsx` na mesma pasta.
- Pastas sem componente ou pagina testavel nao precisam de arquivo de teste vazio.
- Tipos reutilizados entre funcionalidades devem ficar em `src/types/{nome-da-tipagem}.type.ts`.
- O `index.tsx` deve exportar somente o componente; nao reexportar tipos pelo `index.tsx`.
- Tipos internos podem permanecer em `component.type.ts` ou `page.type.ts` sem reexportacao.
- Nao importar tipos compartilhados a partir de `src/pages/**/page.type.ts`; servicos, providers e utils devem importar esses tipos de `@/types`.

## Convencoes de codigo

- Arquivos e pastas em `kebab-case`
- Funcoes, variaveis e parametros em `camelCase`
- Componentes e tipos em `PascalCase`
- Props e parametros-objeto devem ser recebidos por uma variavel e desestruturados dentro da funcao.
- Nao desestruturar props ou parametros-objeto diretamente na assinatura da funcao.
- Props de componentes devem usar tipos com sufixo `Props`.
- Tipos de parametros de funcoes devem usar sufixo `ParamsType`.
- Constantes devem ficar separadas dos arquivos que as consomem.
- Constantes exclusivas de uma funcionalidade devem ficar na pasta `constants/` dentro da raiz dessa funcionalidade (ex.: `src/pages/profile/constants/`).
- Constantes compartilhadas entre funcionalidades devem ficar em `src/constants/`.
- Usar aspas simples
- Manter arquivos `.ts` e `.tsx` com no maximo 120 linhas, quando possivel

## Fluxo de trabalho

- Validar com `npm run lint` e `npm run build` apos alteracoes relevantes
- Nao commitar `.env`
- Usar `.env.example` como referencia
- Depois de alterar dependencias, rodar `npm install` antes de testar
- Criar ou atualizar testes ao alterar componentes, paginas e funcoes testaveis.
- Usar Vitest e Testing Library para testes unitarios e de componentes.
- Validar com `npm run test`, `npm run lint` e `npm run build`.
- Ao remover um arquivo, funcao, tipo ou export, localizar todos os consumidores com `rg` antes de concluir a alteracao.
- Nao restaurar automaticamente arquivos removidos de forma intencional; atualizar os consumidores para a estrutura atual.
- Depois de alterar barrels como `src/components/index.ts`, `src/types/index.ts` ou `src/providers/index.ts`, executar testes e build para detectar imports que resultem em `undefined`.
- Testes de pagina devem renderizar os componentes reais sempre que possivel, para detectar exports ausentes e imports incorretos.

## Regras de lint / formatação (ESLint)

O projeto não usa Prettier — toda a formatação e as convenções de código são aplicadas via ESLint (`eslint.config.js`, flat config). Regras principais:

| Regra | Configuração | O que garante |
| --- | --- | --- |
| `max-lines` | `['error', { max: 120, skipBlankLines: true, skipComments: true }]` | Nenhum arquivo `.ts`/`.tsx` pode passar de **120 linhas** (linhas em branco e comentários não contam). |
| `quotes` | `['error', 'single', { avoidEscape: true }]` | Apenas **aspas simples** em strings. |
| `check-file/filename-naming-convention` | `{ '**/*.{ts,tsx}': 'KEBAB_CASE' }` (com `ignoreMiddleExtensions: true`) | Todo arquivo `.ts`/`.tsx` deve ter o nome em **kebab-case** (ex.: `json-panel.tsx`, `use-generate-prompt.ts`). |
| `check-file/folder-naming-convention` | `{ 'src/**/': 'KEBAB_CASE' }` | Toda pasta dentro de `src/` deve ter o nome em **kebab-case**. |
| `@typescript-eslint/naming-convention` | ver `eslint.config.js` | `function`: `camelCase` ou `PascalCase` (componentes); `variable`: `camelCase`, `PascalCase` ou `UPPER_CASE` (constantes de módulo); `parameter`: `camelCase`; `typeLike` (types/interfaces): `PascalCase`. |
| `react-hooks/*` (recommended) | `eslint-plugin-react-hooks` | Regras padrão de hooks do React (deps de `useEffect`, ordem de chamada, etc.), essencial para o React Compiler funcionar corretamente. |
| `react-refresh/only-export-components` | `warn`, `allowConstantExport: true` | Garante Fast Refresh consistente durante o `npm run dev`. |

Resumindo as convenções de nomenclatura em texto:

- **Arquivos e pastas**: `kebab-case` (ex.: `task-form.tsx`, `prompt-specification.schema.ts`, `src/hook/`).
- **Funções, variáveis, parâmetros e estados**: `camelCase` (ex.: `handleSubmit`, `taskDescriptionRef`, `isFetching`).
- **Componentes e tipos/interfaces**: `PascalCase` (ex.: `HomePage`, `Accordion`, `PromptSpecification`).
- Constantes de módulo que nunca mudam podem ficar em `UPPER_CASE` (ex.: `SYSTEM_MESSAGE`, `OPENROUTER_URL`).

Rodar `npm run lint` para validar tudo isso antes de commitar.

## Convenções para quem for mexer no código (agentes ou humanos)

- Mudanças no formato de saída da IA devem ser feitas em conjunto: `SYSTEM_MESSAGE` (o que se pede à IA), `promptSpecificationSchema`/`parsePromptSpecification` (como se valida/normaliza) e o tipo `PromptSpecification` precisam ficar sincronizados.
- Novos campos na especificação exigem atualizar também `buildCodexPrompt`, para que apareçam no prompt final gerado.
- Scripts disponíveis: `npm run dev` (desenvolvimento), `npm run build` (`tsc -b && vite build`), `npm run preview`, `npm run lint` (ESLint).
- Não commitar `.env` (já está no `.gitignore`); usar `.env.example` como referência de variáveis esperadas.
- Após alterar dependências (`package.json`), rodar `npm install` localmente antes de `npm run dev`/`build`.
