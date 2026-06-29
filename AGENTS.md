# Agent Instructions for generate-resume

## Project purpose

This repository is a React + TypeScript + Vite app for generating a resume/portfolio PDF. The current app shell is rendered in `src/App.tsx`, and the main feature should be a form-based resume editor that feeds data into the existing PDF generation utilities.

## Key areas for code changes

- `src/App.tsx` - current UI entrypoint. The resume editing UI should be added here or via child components.
- `src/providers/form/` - form context and provider.
  - `src/providers/form/provider.tsx` registers multiple form sections and exposes `getAllValues()`.
  - `src/providers/form/context.ts` defines the shared `FormPortifolioContext`.
- `src/hooks/use-register-form/index.ts` - helper hook for components to register their form methods in the provider.
- `src/schemas/` - yup schemas for form sections:
  - `header.schema.ts` for profile/header data
  - `projects.schema.ts` for project items
  - `deffierentials.schema.ts` for differentials
  - `services.schema.ts` for services
  - `footer.schema.ts` for contact/footer data
- `src/types/form-create.type.ts` - central type `InfoForPortifolioType` describing the resume data shape.
- `src/utils/pdf/` - existing PDF generation logic that consumes resume data and theme colors.

## Architecture and conventions

- Uses Vite path alias `@/` for imports from `src/`.
- Uses `react-hook-form` together with `yup` schemas for validation.
- The provider stores `UseFormReturn` objects keyed by form section names.
- `FormPortifolioProvider` is the cross-section state owner and should wrap form components if multi-section state is needed.
- UI styling uses Tailwind CSS and `tailwind-merge`.

## Build and workflow commands

- `npm install` - install project dependencies
- `npm run dev` - start the local development server
- `npm run build` - build the production bundle
- `npm run lint` - run ESLint across the codebase

## Guidance for implementing the resume form

- Start by creating or extending UI in `src/App.tsx` with section components.
- Use the existing schemas for form defaults and validation rather than inventing new field names.
- Register each form section via `useRegisterForm(sectionName, methods)` so `getAllValues()` can collect values.
- When generating a PDF, pass data matching `InfoForPortifolioType` to `src/utils/pdf/index.ts`.
- Avoid breaking the provider/hook contract: the `registerForm` call is expected to store forms by section name.

## Notes for agents

- The repository currently has no `AGENTS.md` / `.github/copilot-instructions.md`, so this file is the main source of guidance.
- Do not add unrelated backend or deployment changes; focus on the resume editor form and PDF flow.
- Prefer modifying existing components in `src/` and follow existing naming and folder conventions.

@gemini.md
