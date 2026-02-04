# GEMINI.md — Project Rules for Google Antigravity (TipJar+ / USDC Onboarding)

## 0) One sentence mission

You are an engineering agent working inside this repo. Your job is to improve onboarding quality WITHOUT changing public contracts (API, routes, DTOs, schemas, widget embed contracts).

## 1) Hard non-negotiables (DO NOT TOUCH)

### 1.1 API contracts are sacred

You must NOT change any of the following unless I explicitly say "CONTRACT CHANGE APPROVED":

- Backend routes, URL paths, controller decorators, method names/signatures
- Request/response shapes, DTOs, validation schemas
- Error codes / error response format
- Auth headers/cookies/session model
- Webhook payload contracts
- Public widget embed API (query params, postMessage protocol, script tag API, etc.)

If you detect a needed change that impacts any contract:

- STOP
- label it: **CONTRACT IMPACT**
- propose alternatives that keep contracts intact

### 1.2 No dependency roulette

No new dependencies (npm/pip/etc.) unless:

- you provide a justification
- you show size/risk impact
- I approve with: "DEP APPROVED"

### 1.3 No destructive commands

Never run or suggest commands that can delete, wipe, format, or rewrite history, including but not limited to:

- `rm -rf`, `del /s /q`, `format`, `diskpart`, `dd`, `mkfs`, `chmod -R` on repo root
- `git reset --hard` / `git clean -fdx` unless I explicitly approve
  If cleanup is needed, ask first and propose the safest command.

## 2) Allowed scope (WHAT you can change)

You MAY improve:

- onboarding flow logic (step order, state machine, retries)
- input validation (as long as request schema stays identical)
- UX copy, microcopy, empty states
- error handling, observability logs (non-sensitive)
- edge cases, loading states, concurrency issues
- performance (memoization, caching, fewer queries) without contract change
- internal refactors that keep behavior identical at boundary

## 3) Work style: diff-first, small commits

### 3.1 Always start by mapping divergence

If a reference implementation exists (e.g., `vendor/aistudio`), you MUST:

1. generate a divergence report grouped by: `frontend / backend / shared`
2. list only **material differences** (logic, validation, security, UX steps, error handling)
3. ignore cosmetic formatting differences unless they cause bugs

### 3.2 “Options A/B” for each divergence

For every material divergence you propose:

- **Option A:** Keep current behavior (no change)
- **Option B:** Minimal patch integrating the better fragment

You only implement Option B when I explicitly say: **APPLY <id>**.

### 3.3 One divergence = one commit

When I approve APPLY:

- implement the minimal diff
- show:
  - affected files
  - short rationale (max 2 sentences)
  - `git diff` or exact hunks
- then commit with message: `onboarding: <short change description>`

## 4) Output format (strict)

When responding, always use:

1. **Summary** (1–3 lines)
2. **Assumptions** (only if you had to guess; bullet list)
3. **Divergence Report** or **Proposed Patch** (depending on stage)
4. **Risks** (only real risks, not generic fluff)
5. **Commands** (only if necessary)

No motivational talk. No invented “best practices” unless tied to a concrete bug or requirement.

## 5) Verification rules

Before proposing APPLY or committing:

- run the smallest relevant checks (lint/test/build) available in repo
- if tests are missing, do a local sanity check plan (max 5 bullet points)
- never claim “works” unless you ran something; otherwise say “not executed”

## 6) Secrets and compliance

- Never print or exfiltrate secrets.
- If env vars are needed, request placeholder names only.
- Do not paste full `.env` content.

## 7) Stop conditions

Stop immediately and ask for approval if:

- any change touches contracts (Section 1.1)
- any command is destructive (Section 1.3)
- you need new dependencies (Section 1.2)
- you are unsure which of two behaviors is intended

## 8) Context (project summary for you)

- Product: creator support platform, USDC-centric
- Priority: keep existing API + infra structure intact
- Goal: better onboarding quality, less friction, clearer UX, stronger edge-case handling
