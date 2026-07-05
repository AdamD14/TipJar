# AGENTS.md — TipJar

## Agent Rules & Behavior

1. **Zero build / frontend / backend / test / lint without explicit instruction**
   - Do not run any build steps, frontend servers, test suites, or linters unless explicitly told to do so.

2. **Code in English, conversation in Polish**
   - All code, comments, commit messages, and user-facing UI text must be in English.
   - Conversation with the user is always in Polish.

3. **No actions without user approval**
   - Do not perform any file edits, deletions, or external calls without explicit user consent.

4. **No editing `.env` or secrets files without explicit approval**
   - Environment and secret files are strictly off-limits unless the user gives express permission.

5. **Use skills and MCP as frequently as possible**
   - Prefer loading relevant skills or using MCP tools over ad-hoc scripting.

6. **When asked to review files, review only those files**
   - Do not read other files in parallel unless explicitly requested.
   - Lay out a plan and wait for user confirmation before making any edits.

7. **Absolute ban on edits without a clear plan**
   - No plan = no edits. Period.

8. **Note tasks given by the user**
   - Write down exactly what the user asked; do not invent additional tasks.

9. **Before editing a file, read it first and tell the user what you want to change**
   - No guessing. No assumptions.
   - If something is unclear, ask the user.

10. **Ask questions only after checking existing files**
    - First inspect what exists, then ask questions only if the answer isn't in the files or solutions conflict.

11. **Do not propose the easiest or degrading solutions**
    - Solutions must match the user's intent and existing architecture.

12. **Do not create new files or directories without asking**
    - If a new file is necessary, ask the user first.

13. **Do not break existing functionality to make something else work**
    - Changes must be compatible with the current codebase.

14. **Design.md is the single source of truth**
    - Always read `design.md` when starting work. It takes precedence over everything else.

## Project Overview

TO CO MOWI USER JEST NAJWAZNIEJSZE
- design.md - czytac zawsze!
- SPRAWDZAC czy istnieja skills ZAWSZE DO DANEGO POLECENIA
- SLUCHAC USERA ZAWSZE I BEZWZGLEDNIE
- uzywac MCP circle i arc-docs
- UZYwAC SKILLS!!!
- Zakaz budowania frontendu i backendu bez polecenia, uzywania lint i test.

PRZESTRZEGAC POLECEN, ZAKAZ IMPROWIZACJI, PODWÓJNE UPEWNIANIE SIE JAK NIE MA JASNOSCI CO DO POLECENIA

# TipJar+ Project Memory

## ULEPSZAJ, NIE UPRASZCZAJ
- Refaktoryzacja = **ulepszanie** kart, NIE usuwanie efektów wizualnych
- ZAKAZ usuwania: pseudo-elementów, SVG filtrów, animacji, clip-path, decorative patterns
- ZAKAZ zamieniania CSS klas na gołe inline style — używaj globals + dopisuj style обогащające
- Każdy efekt oryginalny musi zostać zachowany lub **ulepszony** (nie usunięty)
- Jeśli globals nie ma odpowiedniej klasy — dopisz inline style ale zachowaj efekt
- Przy refaktoryzacji: tokeny z globals TAK, usuwanie efektów NIE

## Impeccable Design Context

- **PRODUCT.md** at project root — strategic context (register: brand, personality: elegant·trusted·refined, OKLCH-first a11y, own design path)
- **DESIGN.md** at project root — visual system (tokens, typography, elevation, components)
- **Live config**: `.impeccable/live/config.json` (CSP patch skipped by user request)
- **Rules**: Own design path, no copying category patterns. Gold accent as premium signal, teal depth for calm, purple for refinement. OKLCH contrast algorithms replace standard WCAG checklists.


1. **NIE PRZEGLĄDAJ folderów na oślep** — nie marnuj zapytań na folder-walking. Jesteś w konkretnej sekcji, zajmujesz się tylko nią.
2. **Czytaj pliki które user wskazał** — nie całego repo.
3. **Jak MUSISZ sprawdzić konkretny endpoint/trasę** — szukaj celnie, nie browsing.
4. **Nie kopiuj 15 plików z folderu 04_07** — to już było robione, sprawdzaj czy wdrożone, nie przekopiu po raz drugi.
5. **Plan = całościowy i kompletny** — od deski do deski. Nie ma miejsca na "a stworzę plik i huj".
6. **Nie przekopu limitów API** — user widzi co sprawdzasz, jak zobaczy drugą stronę medalu to wkurwi się.
7. **Jak wiesz co robić — rób. Jak nie wiesz — pytaj.** Nie pytaj głupich pytań.
8. **Podwójne upewnienie się przy braku jasności co do polecenia.**
