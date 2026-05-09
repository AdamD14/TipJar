# AGENTS.md — TipJar

## Project overview

Manual monorepo (no Nx/Turborepo). Three packages, each with its own `package.json`:

| Package                   | Framework               | Port | Test runner                              | E2E                         |
| ------------------------- | ----------------------- | ---- | ---------------------------------------- | --------------------------- |
| `backend/`                | NestJS (SWC build)      | 3001 | Jest (`*.spec.ts`)                       | Jest (`test/jest-e2e.json`) |
| `frontend/`               | Next.js 16 (App Router) | 3000 | Vitest (`src/**/*.{test,spec}.{ts,tsx}`) | Playwright                  |
| `tipjar+-creator-studio/` | Vite + React SPA        | 3000 | None                                     | None                        |

## Prerequisites

```bash
# Start PostgreSQL + Redis (required for backend)
docker compose up -d

# Start Supabase locally + edge proxy (if using edge functions)
bash supabase-start.sh
```

Copy `.env.example` to `.env` in both `backend/` and `frontend/` before running.

## Commands (must cd into subdirectory first)

```bash
# Backend
cd backend
npm test                # unit tests (Jest)
npm run test:e2e        # e2e tests
npm run lint            # ESLint + Prettier
npm run start:dev       # dev server with watch
npx prisma generate     # regenerate Prisma client after schema changes

# Frontend
cd frontend
npm test                # unit tests (Vitest)
npm run test:e2e        # Playwright e2e
npm run lint            # Next.js lint
npm run dev             # dev server
```

# TipJar+ – Frontend

Language: TypeScript
Linting: ESLint with @typescript-eslint
Formatting: Prettier

## Stack

- Next.js 16.2.4 (App Router), React 19.2.5, TypeScript
- Tailwind CSS v4.2+
- State: Zustand
- Data Fetching: @tanstack/react-query
- Formularze: react-hook-form + zod
- UI: shadcn/ui (primitive components)
- Wirtualizacja: react-virtuoso
- Ikony: lucide-react
- Web3: wagmi, RainbowKit, viem, ethers.js
- Animacja: framer-motion
- Auth: JWT (HttpOnly cookie)

## Komendy

- `cd frontend && npm run dev` – dev (port 3000)
- `cd frontend && npm run build` – build
- `cd frontend && npm run lint` – ESLint
- `cd frontend && npm run format` – Prettier
- `cd frontend && npm run test` – testy

## Auth – Strategie (NestJS Passport)

- Logowanie klasyczne (email/hasło): local.strategy.ts
- Google OAuth: google.strategy.ts
- Twitch OAuth: twitch.strategy.ts
- Ochrona routów: jwt.strategy.ts
- Refresh token: jwt-refresh.strategy.ts
- JWT w HttpOnly cookie, frontend używa credentials: 'include'

## Design System

- Tokeny CSS: @rules/design/system.md
- Atomy: @rules/design/components.md – Button, Input, Avatar, Toggle
- Reszta specyfikacji: @docs/design/

## Circle (Backend)

- DCW + SCA + Gas Station
- Endpointy Circle Payments/Payouts: @docs/api/circle.md
- Webhook Circle: POST /api/v1/circle/webhook

## Konwencje kodu

- Server Components domyślnie, 'use client' tylko przy stanie/efektach
- Importy: @/components/..., @/lib/..., @/stores/...
- Kwoty: font-feature-settings: "tnum"
- Kolory: tylko tokeny semantyczne z @rules/design/system.md
- Lazy loading: React.lazy + Suspense dla dużych komponentów
- Listy: react-virtuoso dla wirtualizacji (historia transakcji, feed)

## API (Backend:3001)

- Pełna lista: @docs/api/endpoints.md
- Circle: @docs/api/circle.md

## Architecture gotchas

- **Backend API prefix**: all REST routes are under `/api/v1` (set in `backend/src/main.ts` via `app.setGlobalPrefix`).
- **No Playwright config file**: the frontend `test:e2e` script runs `playwright test` with no config file found — Playwright uses its default config discovery.
- **Creator Studio has no tests, lint, or typecheck** — it's a lightweight AI Studio-generated app. Don't add tooling there unless asked.
- **Backend TypeScript 5.9, Frontend TypeScript 6.x** — different TS versions per package. Don't use TS 6 syntax in backend.
- **Backend uses SWC** (via `nest build` / `@swc/core`), not `tsc`, for compilation.
- **Prisma**: running `npx prisma studio` in backend requires `.env`.

## CI

- Workflow: `.github/workflows/tests.yml`
- Runs on Node.js 20
- Backend: `npm ci` → `npm test` → `npm run test:e2e`
- Frontend: `npm ci` → `npx playwright install --with-deps` → `npm test` → `npm run test:e2e`
- No lint or build step in CI.

## Language convention

- **Conversation with the user is in Polish** — the agent responds in Polish.
- **Everything else stays in English**: code, code comments, user-facing UI text, commit messages, PR descriptions, documentation.

## Agent rules

See `GEMINI.md` for project-level AI agent constraints, including:

- No API contract, DTO, or schema changes without explicit approval
- No new dependencies without approval
- No destructive commands without approval
- Diff-first work style (divergence report → Options A/B → APPLY → commit)
