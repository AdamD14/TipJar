Save this :)
Most developers install Claude Code, use it for basic code generation, and think they have seen what it can do.
They have seen maybe 20 percent.
The other 80 percent - the techniques that turn Claude Code from "useful assistant" into "the most productive I have ever been". are buried in documentation, discovered through experimentation, or shared in small communities.
I compiled every technique that moved the needle for me. Tested daily. Zero theory.
Bookmark this. You will use it every time you open your terminal.
Essential Commands (01 to 08)
01. Plan Mode (Shift + Tab)
Before any implementation, switch to plan mode. Claude Code analyzes your codebase and creates an architecture plan WITHOUT writing any code. Review the plan. Approve it. Then switch back to implementation. This single habit prevents more bugs than any other technique on this list.
02. Compact (/compact)
After 30 to 45 minutes of conversation, your context gets bloated. Type /compact to compress the entire conversation history into a focused summary of key decisions and current state. Claude Code stays sharp instead of gradually losing track of what you discussed.
03. Clear (/clear)
Starting a new task? Clear the slate entirely. Carrying context from a database refactor into a frontend redesign produces confused, conflicting code. One conversation per feature. Always.
04. Init (/init)
Run this at the start of any new project. Claude Code scans your codebase and generates a CLAUDE.md file. a persistent context document that it reads automatically in every future session. Includes project structure, tech stack, coding patterns, and key architecture decisions.
05. The Cost Check (/cost)Displays your token usage for the current session. Check this every hour during long sessions. AI-assisted development costs money and surprises are never fun. Set a mental budget per session and check against it.
06. Memory (/memory)
Add persistent instructions that Claude Code remembers across all sessions. "Always use TypeScript strict mode." "Always add JSDoc comments to public functions." "Always run tests after modifying any file in /src/core." These rules apply automatically in every future conversation without repeating them.
07. Terminal Integration (! prefix)
Prefix any message with ! to run it as a terminal command instead of sending it to Claude. Quick way to run tests, check git status, or navigate directories without leaving the Claude Code interface.
08. Multi-Model Switching
Use Opus for planning and architecture decisions. Switch to Sonnet for implementation and execution. Opus thinks deeper but costs more. Sonnet executes faster and cheaper. Plan with the thinker. Build with the builder.
Productivity Techniques (09 to 18)
09. The Reference File Technique
Instead of describing the code style you want, point to an existing file: "Look at how authentication is implemented in src/auth/login.ts. Implement password reset following the exact same patterns." Claude Code reads the reference and replicates the patterns precisely. Produces far more consistent code than verbal descriptions.
10. The Screenshot Debug
Something looks wrong in the UI? Do not write a paragraph. Screenshot it. Paste with Ctrl+V. Say: "The button is misaligned with the input field. The spacing between cards is inconsistent. Fix both." Visual feedback is faster and more accurate than written descriptions.
11. The Test-First Workflow
"Write tests for a function that calculates discounted prices. Cover: normal discounts, zero discount, 100 percent discount, negative prices, and string inputs. Then implement the function to pass all tests." Tests define behavior before code exists. The implementation is automatically correct because it must pass the predefined tests.
12. The Incremental Build
Never say "build the entire feature." Break it into steps: "Create the database schema." Test. "Build the API endpoint." Test. "Add validation." Test. "Build the frontend form." Test. Five small steps with testing between each one produces dramatically better code than one massive implementation prompt.
13. The Codebase Question
Before implementing anything in an unfamiliar part of the codebase: "Read src/services/ and explain how data flows from the API routes to the database. What patterns are used? What should I know before modifying anything here?" Understanding before building prevents architectural mistakes.
14. The Diff Review
After Claude Code makes changes: "Show me a diff of every file you modified. Explain each change in one sentence." This catches unintended modifications - Claude Code sometimes "helpfully" changes files you did not ask it to touch.
15. The Error Paste
When something breaks, copy the COMPLETE error message and stack trace. Not a summary. The complete output. "I got this error: [paste full error]. Diagnose the root cause step by step before suggesting a fix." The step-by-step constraint prevents Claude from jumping to a wrong fix.
16. The Undo Checkpoint
Before every major change: git add . && git commit -m "checkpoint before [change]". If Claude Code breaks something, you revert in seconds instead of spending thirty minutes debugging what used to work.
17. The Parallel Session
For large features, open two terminal windows. One runs Claude Code for the backend implementation. The other runs Claude Code for the frontend. Each session has clean, focused context for its domain. Connect the pieces at the end.
18. The Documentation Pass
After completing a feature: "Read every file you created or modified for this feature. Generate comprehensive documentation: what each function does, how they connect, what the expected inputs and outputs are, and any non-obvious design decisions." Documentation generated immediately after building is more accurate than documentation written days later from memory.
Architecture Techniques (19 to 26)
19. The Architecture Audit
Before starting a new project: "Analyze my project requirements: [list them]. Propose 2 different architectural approaches. For each: component diagram, pros, cons, estimated complexity, and what could go wrong. Recommend one with clear reasoning." Making architecture decisions with AI analysis prevents expensive rewrites later.
20. The Dependency Check
Before adding any new package: "I want to add [package] to handle [use case]. Check: is this actively maintained? Are there known security issues? What is the bundle size impact? Are there lighter alternatives that cover my specific use case?" Prevents bloating your project with unnecessary or risky dependencies.
21. The Pattern Enforcer
Add to your CLAUDE.md: "When creating new files, follow these patterns: API routes follow the structure in src/api/example-route.ts. Database queries use the repository pattern in src/repositories/example-repo.ts. React components follow the structure in src/components/ExampleComponent.tsx." Claude Code reads this and automatically matches your patterns in every new file.
22. The Migration Builder
"I need to change the user table schema: add a 'role' column (enum: admin, editor, viewer, default: viewer) and rename 'name' to 'display_name'. Generate the migration file, update the repository layer, update all API routes that reference the old schema, and update the TypeScript types. Show me every file that needs to change before making any modifications." Schema changes that touch multiple layers are where Claude Code shines - it tracks all the ripple effects.
23. The API Design Review
"Review my API design: [paste route definitions]. Check for: inconsistent naming, missing error responses, endpoints that should be paginated, missing authentication on protected routes, and any REST convention violations. Suggest specific improvements."
24. The Security Scan
"Scan this codebase for security vulnerabilities: SQL injection, XSS, exposed secrets in code or config files, missing input validation, insecure direct object references, and missing rate limiting. For each finding: severity, exact location, why it is dangerous, and the fix."
25. The Performance Profiler
"Analyze this codebase for performance issues: N+1 database queries, missing indexes based on query patterns, unnecessary re-renders in React components, large bundle imports that could be lazy loaded, and API endpoints that should be cached. Prioritize by estimated impact."
26. The Refactoring Planner
"Read src/services/user-service.ts. This file has grown to 800 lines and handles too many responsibilities. Propose a refactoring plan that splits it into focused modules. Show the proposed file structure, what moves where, and verify that no external imports will break. Do NOT start refactoring yet - just show me the plan."
Workflow Automation (27 to 31)
27. The Git Hook Writer
"Create a pre-commit hook that: runs the linter on staged files, runs type checking, checks for console.log statements in production code, and blocks commits that fail any check. Install it in .husky/pre-commit." Automated quality gates that run every time you commit.
28. The CI Pipeline Builder
"Create a GitHub Actions workflow that: runs on every PR, installs dependencies, runs the full test suite, runs the linter, builds the project, and posts a comment on the PR with the results. Use caching for node_modules."
29. The Environment Setup Script
"Create a setup.sh script that a new developer runs once to set up the entire development environment: install dependencies, create .env from .env.example, set up the local database, run migrations, seed test data, and verify everything works by running the test suite."
30. The Release Notes Generator
"Read the git log since the last tag. Generate release notes organized by: new features, bug fixes, performance improvements, and breaking changes. Write each entry in user-friendly language, not developer jargon. Format as a markdown changelog entry."
31. The Database Seed Builder
"Create a comprehensive seed file for the development database. Include: 5 users (1 admin, 2 editors, 2 viewers), 20 sample projects with realistic data, relationships between entities, and edge cases (archived project, deleted user, project with no members). Make the data realistic, not 'test123'."
Debug and Recovery (32 to 35)
32. The Reproduction Prompt
"This bug was reported by a user: [paste bug report]. Create a minimal reproduction: the exact steps, the expected behavior, the actual behavior. Then write a failing test that captures this bug. Then fix the code to make the test pass."
33. The Blame Investigator
"This function started failing yesterday. Read the git log for this file over the past week. Identify which commit likely introduced the issue and explain what changed. Then suggest the fix."
34. The Dependency Conflict Resolver
"I am getting this dependency conflict: [paste error]. Analyze the conflict. Identify which packages require conflicting versions of the shared dependency. Suggest the resolution that requires the fewest changes and explain the tradeoffs."
35. The Recovery Mode
When Claude Code produces a broken implementation and you have been going back and forth for too long: "Stop. Read the original working version of this file from git: [paste the git show command output]. Now look at what we have been trying to achieve: [restate the goal simply]. Start fresh with a different approach. The previous approach clearly is not working."
Sometimes starting over from a clean state is faster than fixing accumulated mistakes. Know when to use this.
The Setup That Ties It All Together
When you start a new project, run this sequence:
/init - generate the CLAUDE.md file
Add your coding standards and patterns to CLAUDE.md
/memory - add persistent rules you want in every session
Plan mode - design the architecture before writing any code
Start building incrementally - one feature at a time, tested at each step
This five-minute setup transforms every subsequent hour of development.
TL;DR
35 techniques. Tested daily. Each one solves a real development problem.
Essential commands for session management. Productivity techniques for faster building. Architecture techniques for better design. Workflow automation for consistent quality. Debug and recovery for when things break.
Claude Code is the most powerful development tool available. These 35 techniques unlock all of it.




# Claude Code: 35 technik, które zamieniają go w najwydajniejsze narzędzie developerskie

**Most developers install Claude Code, use it for basic code generation, and think they have seen what it can do.**  
They have seen maybe 20 percent.

**The other 80 percent** – the techniques that turn Claude Code from *"useful assistant"* into **"the most productive I have ever been"** – are buried in documentation, discovered through experimentation, or shared in small communities.

Zebrałem **wszystkie techniki**, które realnie zmieniły moją produktywność. Testowane codziennie. Zero teorii.  
**Zapisz to. Będziesz z tego korzystać za każdym razem, gdy otworzysz terminal.**

---

## Essential Commands (01–08)

**01. Plan Mode (Shift + Tab)**  
Przed jakąkolwiek implementacją przełącz się w tryb planowania. Claude Code analizuje całą bazę kodu i tworzy architekturalny plan **bez pisania ani jednej linijki kodu**. Przejrzyj plan, zatwierdź go, potem wróć do implementacji. Ten jeden nawyk zapobiega więcej bugom niż wszystkie pozostałe techniki razem wzięte.

**02. Compact (/compact)**  
Po 30–45 minutach rozmowy kontekst się rozrasta. Wpisz `/compact`, a Claude Code skompresuje całą historię do zwięzłego podsumowania kluczowych decyzji i aktualnego stanu. Model zostaje ostry zamiast stopniowo tracić wątek.

**03. Clear (/clear)**  
Zaczynasz nowe zadanie? Wyczyść wszystko komendą `/clear`. Przenoszenie kontekstu z refaktoru bazy danych do redesignu frontendu daje tylko pomieszany kod. **Jedna rozmowa = jedna funkcja/feature.**

**04. Init (/init)**  
Uruchom na samym początku każdego nowego projektu. Claude Code przeskanuje codebase i wygeneruje plik **CLAUDE.md** – trwały dokument kontekstu, który automatycznie czyta w każdej przyszłej sesji. Zawiera strukturę projektu, tech stack, wzorce kodowania i kluczowe decyzje architektoniczne.

**05. The Cost Check (/cost)**  
Pokazuje zużycie tokenów w bieżącej sesji. Sprawdzaj co godzinę podczas dłuższych sesji. Rozwój z AI kosztuje pieniądze – niespodzianki nie są przyjemne.

**06. Memory (/memory)**  
Dodaj trwałe instrukcje, które Claude Code pamięta **we wszystkich sesjach**.  
Przykład:  
- "Always use TypeScript strict mode."  
- "Always add JSDoc comments to public functions."  
- "Always run tests after modifying any file in /src/core."  
Reguły działają automatycznie w każdej rozmowie.

**07. Terminal Integration (! prefix)**  
Dodaj `!` na początku wiadomości, a zostanie wykonana jako komenda terminalowa (zamiast wysłania do Claude’a). Szybki sposób na testy, `git status`, nawigację itp. bez wychodzenia z interfejsu.

**08. Multi-Model Switching**  
- **Opus** → planowanie i decyzje architektoniczne (myśli głębiej).  
- **Sonnet** → implementacja i wykonanie (szybszy i tańszy).  
Planuj z myślicielem, buduj z wykonawcą.

---

## Productivity Techniques (09–18)

**09. The Reference File Technique**  
Zamiast opisywać styl kodu, wskaż istniejący plik:  
„Look at how authentication is implemented in `src/auth/login.ts`. Implement password reset following the exact same patterns.”  
Claude czyta referencję i replikuje wzorce idealnie.

**10. The Screenshot Debug**  
Coś wygląda źle w UI? Nie pisz akapitu – zrób screenshot (Ctrl+V) i napisz:  
„The button is misaligned with the input field. The spacing between cards is inconsistent. Fix both.”  
Feedback wizualny jest dużo szybszy i dokładniejszy.

**11. The Test-First Workflow**  
„Write tests for a function that calculates discounted prices. Cover: normal discounts, zero discount, 100% discount, negative prices, and string inputs. Then implement the function to pass all tests.”  
Testy definiują zachowanie **przed** kodem.

**12. The Incremental Build**  
Nigdy nie mów „zbuduj całą funkcję”. Rozbij na kroki:  
„Create the database schema.” → test → „Build the API endpoint.” → test → itd.  
Pięć małych kroków z testami pomiędzy daje dramatycznie lepszy kod.

**13. The Codebase Question**  
Zanim cokolwiek zmienisz w nieznanej części kodu:  
„Read `src/services/` and explain how data flows from the API routes to the database. What patterns are used? What should I know before modifying anything here?”

**14. The Diff Review**  
Po zmianach Claude’a:  
„Show me a diff of every file you modified. Explain each change in one sentence.”  
Łapiesz niechciane modyfikacje.

**15. The Error Paste**  
Wklej **cały** komunikat błędu + stack trace.  
„I got this error: [paste full error]. Diagnose the root cause step by step before suggesting a fix.”

**16. The Undo Checkpoint**  
Przed każdą większą zmianą:  
`git add . && git commit -m "checkpoint before [change]"`  
Jak coś zepsuje – revert w 2 sekundy.

**17. The Parallel Session**  
Przy dużych feature’ach otwórz dwa terminale: jeden na backend, drugi na frontend. Każdy ma czysty, skupiony kontekst.

**18. The Documentation Pass**  
Po skończeniu feature’a:  
„Read every file you created or modified for this feature. Generate comprehensive documentation...”

---

## Architecture Techniques (19–26)

**19. The Architecture Audit**  
Przed nowym projektem poproś o analizę wymagań i propozycję **dwóch różnych** podejść architektonicznych (z diagramem, pros/cons, szacowaną złożonością).

**20. The Dependency Check**  
Zanim dodasz paczkę: sprawdź utrzymanie, security issues, bundle size i lżejsze alternatywy.

**21. The Pattern Enforcer**  
Dodaj do `CLAUDE.md` sztywne wzorce dla API routes, komponentów, repozytoriów itp. – Claude będzie ich automatycznie przestrzegał.

**22. The Migration Builder**  
Przy zmianach schematu bazy Claude śledzi wszystkie ripple effects (migration + repo + API + types).

**23. The API Design Review**  
Wklej definicje endpointów i poproś o sprawdzenie nazewnictwa, błędów, paginacji, auth, REST conventions.

**24. The Security Scan**  
Pełne skanowanie pod kątem SQLi, XSS, leaked secrets, missing validation itp.

**25. The Performance Profiler**  
Analiza N+1, missing indexes, re-renders, bundle size, cache.

**26. The Refactoring Planner**  
Poproś o plan refaktoryzacji dużego pliku **przed** rozpoczęciem zmian.

---

## Workflow Automation (27–31)

**27. The Git Hook Writer**  
Automatyczne pre-commit: linter, type check, blokada console.log w produkcji.

**28. The CI Pipeline Builder**  
GitHub Actions z testami, lintem, buildem i komentarzem na PR.

**29. The Environment Setup Script**  
`setup.sh` dla nowych developerów (wszystko od zera do działających testów).

**30. The Release Notes Generator**  
Automatyczny changelog z git log w przyjaznym języku.

**31. The Database Seed Builder**  
Realistyczne dane testowe z edge cases.

---

## Debug and Recovery (32–35)

**32. The Reproduction Prompt**  
Z bug reportu → minimal reproduction + failing test + fix.

**33. The Blame Investigator**  
Sprawdza git log i wskazuje commit, który wprowadził błąd.

**34. The Dependency Conflict Resolver**  
Rozwiązuje konflikty wersji z minimalnymi zmianami.

**35. The Recovery Mode**  
Kiedy sesja się rozjechała:  
„Stop. Read the original working version of this file from git… Start fresh with a different approach.”

---

## The Setup That Ties It All Together

Na początku nowego projektu uruchom dokładnie tę sekwencję:

1. `/init` → wygeneruj `CLAUDE.md`
2. Dodaj do `CLAUDE.md` swoje standardy kodowania
3. `/memory` → dodaj trwałe reguły
4. **Plan Mode** → zaprojektuj architekturę
5. Buduj **incrementalnie** – jedna feature na raz, z testami po każdym kroku

Te 5 minut setupu zmienia każdą kolejną godzinę developmentu.

---

**TL;DR**  
**35 sprawdzonych technik.**  
Essential commands • Productivity • Architecture • Workflow automation • Debug & recovery.  

Claude Code to najpotężniejsze narzędzie developerskie dostępne dzisiaj.  
Te 35 technik odblokowuje **całą jego moc**.

Zapisz. Używaj. Produktuj jak nigdy wcześniej. 🚀