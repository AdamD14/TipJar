# Repository Guidelines

## Project Structure & Module Organization
- `backend/`: NestJS API. Source in `src/` (modules like `auth`, `users`, `tips`, `overlay`, `payouts`, `circle`), Prisma schema in `prisma/`, unit tests in `src/**/*.spec.ts`, e2e tests in `test/`.
- `frontend/`: Next.js (App Router). Routes in `src/app`, components in `src/components`, shared types in `types/`, static assets in `public/`.
- `docs/`: Product and integration docs.
- `docker-compose.yml`: Local Postgres + Redis services.

## Build, Test, and Development Commands
- Start services: `docker-compose up -d`
- Backend (dev): `cd backend && npm install && npm run start:dev`
- Backend tests: `cd backend && npm run test` (unit), `npm run test:e2e` (e2e), `npm run test:cov` (coverage)
- Prisma Studio: `cd backend && npm run prisma:studio`
- Frontend (dev): `cd frontend && npm install && npm run dev`
- Frontend (prod): `cd frontend && npm run build && npm start`

## Coding Style & Naming Conventions
- Language: TypeScript. Indent 2 spaces. Prettier: single quotes, trailing commas.
- Linting: ESLint + Prettier (`npm run lint` in each app).
- Backend: controllers `*.controller.ts`, services `*.service.ts`, DTOs in `dto/*.dto.ts`, modules `*.module.ts`. Classes PascalCase; functions/vars camelCase.
- Frontend: React components PascalCase (`ComponentName.tsx`); hooks `useX.ts`; utilities camelCase.

## Testing Guidelines
- Backend: Jest (`ts-jest`). Test files `*.spec.ts` near sources; e2e in `backend/test/`.
- Frontend: Playwright (`npm run test`) for UI/e2e.
- No strict coverage threshold; add tests for new features and fixes.

## Commit & Pull Request Guidelines
- Commits: Conventional Commits, e.g., `feat(auth): add OAuth flow`, `fix(users): hash password`.
- Branches: `feat/<scope>-<summary>` or `fix/<scope>-<summary>`.
- PRs: clear description, linked issues, screenshots for UI, notes on DB migrations or new env vars, and test plan/results. Keep PRs focused and small.

## Security & Configuration Tips
- Do not commit secrets. Use `.env`; mirror changes in `.env.example` (backend and frontend).
- For schema changes: `cd backend && npx prisma migrate dev` and document rollout.
- Configure CORS, rate limiting, and security headers in the backend; avoid exposing PII in logs.
