# Repository Guidelines

## Project Structure & Module Organization
- `backend/`: NestJS API. Modules under `src/` (e.g., `auth`, `users`, `tips`, `overlay`, `payouts`, `circle`), Prisma schema in `prisma/`, unit tests in `src/**/*.spec.ts`, e2e tests in `test/`.
- `frontend/`: Next.js app. Routes in `src/app`, components in `src/components`, shared types in `types/`, static assets in `public/`.
- `docs/`: Product and integration documentation.
- `docker-compose.yml`: Postgres and Redis for local development.

## Build, Test, and Development Commands
- Start services: `docker-compose up -d`
- Backend (dev): `cd backend && npm install && npm run start:dev`
- Backend tests: `cd backend && npm run test` (unit), `npm run test:e2e` (e2e), `npm run test:cov` (coverage)
- Prisma Studio: `cd backend && npm run prisma:studio`
- Frontend (dev): `cd frontend && npm install && npm run dev`
- Frontend (prod): `cd frontend && npm run build && npm start`

## Coding Style & Naming Conventions
- Language: TypeScript. Indent 2 spaces; Prettier enforces single quotes and trailing commas.
- Linting: ESLint + Prettier (`npm run lint` in each app).
- Backend: controllers `*.controller.ts`, services `*.service.ts`, DTOs in `dto/` as `*.dto.ts`, modules `*.module.ts`. Classes PascalCase; functions/vars camelCase.
- Frontend: React components PascalCase (`ComponentName.tsx`); hooks `useX.ts`; utility modules camelCase.

## Testing Guidelines
- Framework: Jest with `ts-jest` (backend). Test files: `*.spec.ts` near sources; e2e in `backend/test/`.
- Run locally with the commands above. No strict coverage threshold enforced; add tests for new features and fixed bugs.

## Commit & Pull Request Guidelines
- Commits: prefer Conventional Commits (`feat:`, `fix:`, `chore:`, optional scope like `feat(auth):`).
- Branches: `feat/<scope>-<summary>` or `fix/<scope>-<summary>`.
- PRs: clear description, linked issues, screenshots for UI changes, notes on DB migrations or new env vars, and test plan/results. Keep PRs focused and small.

## Security & Configuration Tips
- Do not commit secrets. Use `.env`; mirror changes in `.env.example` (backend and frontend).
- For schema changes: `cd backend && npx prisma migrate dev` and document the migration/rollout.
