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

## Critical Constraints (from user)
- **Pseudo-elements allowed** — but must be correctly positioned (my `::after` covered the card because of bad z-index/positioning; use `<span>` glow as safe default)
- **Ask before every change** — never touch files without explicit permission
- **Surgical changes only** — do not rewrite entire files; modify only what's requested
- **No independent actions** — do not run builds, installs, git operations, or edits without approval
- **Iterate one thing at a time** — the user reviews and approves each step before proceeding

## Today's Session Summary
- Card.tsx: Restored `<span>` glow (removed `::before`/`::after` pseudo-elements)
- StartBuildingShowcase: Added `show.webp` background
- StartBuildingShowcase: 3-column grid with ExampleProfile (left), empty (center/right)
- ExampleProfile: Changed from popup to inline mode, added AvatarCarousel in place of round avatar
- HowItWorks: Changed "For Creators" from purple (`text-purple-300`) to gold (`text-gold-400`)
- No commits, no builds, no installs were run without permission

## Design Preferences
- Color accent for Creator sections: **gold** (`text-gold-400`, border-gold-400)
- Do not touch: Header, Hero, Footer (unless explicitly requested)
- Creator components follow the gold accent from `rules/cards.md`
- Card interactive hover: teal-600 bg, -translate-y-1.5, double box-shadow with gold glow

## Preview Page Rule
- **Preview page**: `frontend/src/app/box/box/box/box/box/box/page.tsx`
- Po każdej edycji komponentów: na stronie podgląd wyświetlaj **tylko aktualnie edytowane komponenty** (max 3 w grid 3-kolumnowym)
- **Usuwaj stare importy** — strona to podgląd bieżący, nie archiwum
- Użytkownik ma tę stronę odpaloną na monitorze cały czas

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

## Creator Desktop Navigation (Authoritative)

**Root po zalogowaniu jako CREATOR:**
- `frontend/src/app/[username]/creator-desktop/page.tsx` — strona główna creatora
- `frontend/src/app/[username]/creator-desktop/layout.tsx` — layout; zawiera **Navbar** i **CreatorSidebar** — przeczytać ten plik żeby znać strukturę nawigacji

**ROLA FAN = POWIETRZE.** Nie omawiamy, nie sprawdzamy, ignorujemy scieżki fan.

**Navbar (od lewej):**
1. "tipjar.plus" → prowadzi na `/app/[username]/creator-desktop/page.tsx`
2. Kolejno: Desktop, Studio, Add, Community, Growth — każda przechodzi po drzewie w dół
   - np. istnieje `creator-desktop/desktop/page.tsx`
3. Trzecia kolumna navbar: ikona Wallet, powiadomienia, outline @username button (gdy zalogowany)
4. Gdy jesteśmy w danej kategorii — dana ikona+napis podświetlone (nice-to-have, nie krytyczne)

**Sidebar:**
- Te same ścieżki co navbar, ale wszystko powinno się rozwijać (drzewa)
- Istnieje `PathBreadcrumb` — trzeba go poprawić (osobne zadanie)

**Four main modules w studio (`creator-desktop/studio/`):**
- `studio/page.tsx` — jeden z najistotniejszych: 4 duże widgety od góry (jak desktop) + widgety z `desktop/page.tsx` gdzie user edytuje profil/ustawienia (same route, nie robimy logiki)
- Cztery główne foldery w studio/: **monetization/**, **share/**, **live/** (+ ew. więcej)
- `monetization/` — zawiera podfoldery (3+): m.in. `premiumContent/`

**Scieżka która musi istnieć a której brakował:**
- `frontend/src/app/[username]/creator-desktop/studio/monetization/premiumContent/page.tsx` — **MUSI istnieć** jako strona

## Zasady pracy agenta (od usera, sesja 2026-07-04)

1. **NIE PRZEGLĄDAJ folderów na oślep** — nie marnuj zapytań na folder-walking. Jesteś w konkretnej sekcji, zajmujesz się tylko nią.
2. **Czytaj pliki które user wskazał** — nie całego repo.
3. **Jak MUSISZ sprawdzić konkretny endpoint/trasę** — szukaj celnie, nie browsing.
4. **Nie kopiuj 15 plików z folderu 04_07** — to już było robione, sprawdzaj czy wdrożone, nie przekopiu po raz drugi.
5. **Plan = całościowy i kompletny** — od deski do deski. Nie ma miejsca na "a stworzę plik i huj".
6. **Nie przekopu limitów API** — user widzi co sprawdzasz, jak zobaczy drugą stronę medalu to wkurwi się.
7. **Jak wiesz co robić — rób. Jak nie wiesz — pytaj.** Nie pytaj głupich pytań.
8. **Podwójne upewnienie się przy braku jasności co do polecenia.**
