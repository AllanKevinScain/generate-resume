# Tailwind CSS Understanding Skill

## Purpose

This skill helps the agent understand how Tailwind CSS works in this React + Vite repository, including the plugin-based Tailwind v4 setup, import chain, and runtime validation.

## When to use

- Diagnosing Tailwind CSS issues in this repo
- Verifying or fixing Vite + Tailwind configuration
- Reviewing why Tailwind classes are not being applied
- Updating the repository to use the official `@tailwindcss/vite` plugin correctly

## Key knowledge

- The application entrypoint is `src/main.tsx`.
- The main CSS file is `src/globals.css`.
- Tailwind v4 is enabled by importing `@tailwindcss/vite` in `vite.config.ts` and `@import "tailwindcss";` in the root CSS.
- The project uses Vite path alias `@/` for imports from `src/`.
- Tailwind class usage appears across components, and the build should generate utility CSS based on the imported stylesheet.

## Workflow

1. Inspect `package.json` for `tailwindcss` and `@tailwindcss/vite`.
2. Inspect `vite.config.ts` for plugin registration: `tailwindcss()` must be present in `plugins`.
3. Inspect `src/globals.css` for `@import "tailwindcss";` at the top.
4. Inspect `src/main.tsx` to confirm it imports `./globals.css`.
5. Validate there are no leftover Tailwind v3 config files such as `tailwind.config.js`, `tailwind.config.ts`, `postcss.config.js`, or legacy plugin registrations.
6. Run the build and/or development server to ensure Tailwind CSS is compiled and no Vite errors occur.
7. If Tailwind classes are not applying, verify runtime CSS is loaded and the CSS import chain is not broken.

## Quality criteria

- `tailwindcss` and `@tailwindcss/vite` are installed and present in `package.json`.
- `vite.config.ts` imports `@tailwindcss/vite` and includes `tailwindcss()` in `plugins`.
- `src/globals.css` begins with `@import "tailwindcss";`.
- The application imports `src/globals.css` from `src/main.tsx`.
- `npm run build` succeeds without Tailwind-related errors.
- Tailwind utility classes such as `bg-red-500` and `text-white` work in the rendered UI.

## Example prompts

- "Verifique se o Tailwind v4 está configurado corretamente neste projeto Vite + React."
- "Explique por que as classes Tailwind não estão sendo aplicadas e corrija a configuração."
- "Atualize o projeto para usar o plugin `@tailwindcss/vite` corretamente."

## Related files

- `package.json`
- `vite.config.ts`
- `src/main.tsx`
- `src/globals.css`
- `README.md`
- `AGENTS.md`
