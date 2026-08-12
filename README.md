# =============================================================================

# FitCalc Hub

# Enterprise fitness, nutrition, workout, and health platform (scaffold)

# =============================================================================

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v4 · Shadcn-style UI · Framer Motion · Lucide
- Prisma · PostgreSQL · Auth.js (NextAuth v5)
- Zustand · TanStack Query · Axios · React Hook Form · Zod
- Recharts · date-fns · react-hot-toast

Package manager: **pnpm**

---

## Commands executed / required

```bash
# Toolchain
npm install -g pnpm@9

# Scaffold
pnpm create next-app@15 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --turbopack --use-pnpm

# Production dependencies
pnpm add framer-motion lucide-react clsx class-variance-authority tailwind-merge next-themes \
  react-hook-form @hookform/resolvers zod @tanstack/react-query axios zustand recharts date-fns \
  react-hot-toast next-auth@beta @auth/prisma-adapter @prisma/client@6 \
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-dropdown-menu \
  @radix-ui/react-separator @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-select \
  @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip @radix-ui/react-scroll-area

# Dev dependencies
pnpm add -D prisma@6 prettier prettier-plugin-tailwindcss husky lint-staged eslint-config-prettier tw-animate-css

# Tooling
pnpm exec husky init
pnpm db:generate
```

---

## Why each package

| Package                                                    | Why                                                   |
| ---------------------------------------------------------- | ----------------------------------------------------- |
| `next` / `react` / `react-dom`                             | App framework (RSC + App Router)                      |
| `typescript`                                               | Strict typing across the codebase                     |
| `tailwindcss` / `@tailwindcss/postcss`                     | Utility-first styling                                 |
| `class-variance-authority` / `clsx` / `tailwind-merge`     | Composable, conflict-free class APIs (Shadcn pattern) |
| `@radix-ui/*`                                              | Accessible primitives for Dialog, Label, Slot, etc.   |
| `lucide-react`                                             | Consistent icon set                                   |
| `framer-motion`                                            | Intentional motion / presence                         |
| `next-themes`                                              | Dark mode + ThemeProvider                             |
| `react-hook-form` + `zod` + `@hookform/resolvers`          | Typed forms & validation                              |
| `@tanstack/react-query`                                    | Client async cache / mutations                        |
| `axios`                                                    | HTTP client for API calls                             |
| `zustand`                                                  | Lightweight client UI/global state                    |
| `recharts`                                                 | Charts / progress visualizations                      |
| `date-fns`                                                 | Date formatting & math                                |
| `react-hot-toast`                                          | Lightweight toast notifications                       |
| `next-auth` (Auth.js) + `@auth/prisma-adapter`             | Auth (Google + email prepared)                        |
| `prisma` / `@prisma/client`                                | Type-safe PostgreSQL ORM                              |
| `prettier` + plugin                                        | Consistent formatting                                 |
| `husky` + `lint-staged`                                    | Pre-commit quality gates                              |
| `eslint` + `eslint-config-next` + `eslint-config-prettier` | Lint without Prettier fights                          |
| `tw-animate-css`                                           | Animation utilities for Tailwind v4 / Shadcn          |

---

## Getting started

1. Copy env template:
   ```bash
   cp .env.example .env.local
   ```
2. Set `DATABASE_URL`, `AUTH_SECRET`, and optional Google OAuth keys.
3. Start PostgreSQL and push schema:
   ```bash
   pnpm db:generate
   pnpm db:push
   ```
4. Run the app:
   ```bash
   pnpm dev
   ```

---

## Architecture

```
app/            Route groups: (auth), (marketing), (platform), admin, api
components/     ui · layout · shared · cards · charts · forms · domain folders
features/       Feature modules (auth, calculators, articles, ...)
lib/            prisma · auth · api · validations · seo · constants · utils
services/       Server-side domain services
store/          Zustand stores
types/          Shared TypeScript types
config/         Site + feature flags
middleware/     Auth/path helpers (entry: middleware.ts)
prisma/         Schema + seed placeholder
emails/         Transactional email templates
```

**Clean architecture rules**

- Server Components by default; `"use client"` only when required
- Feature logic in `features/` + `services/`; reusable UI in `components/`
- Absolute imports via `@/*` path aliases
- No business logic in this scaffold phase

---

## Scripts

| Script                      | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| `pnpm dev`                  | Dev server (Turbopack)                    |
| `pnpm build`                | Production build                          |
| `pnpm start`                | Start production server                   |
| `pnpm lint` / `pnpm format` | ESLint / Prettier                         |
| `pnpm typecheck`            | `tsc --noEmit`                            |
| `pnpm db:*`                 | Prisma generate / push / migrate / studio |

---

## Explicitly not built yet

- Calculator business logic
- AI features
- Admin dashboard implementation
- Full authentication flows
