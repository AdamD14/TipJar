🐋 CENTRUM WIEDZY (LEARN / KNOWLEDGE CENTER) – ATOMOWO SZCZEGÓŁOWY PROMPT PROJEKTOWY

(Integracja: Master Plan UI 2026 + Optymalizacja Strategiczna + Web3 UX)

---

📌 UWAGA WSTĘPNA

Ten prompt jest czwartym, równoległym dokumentem – po Profilu Publicznym, Panelu Twórcy i Katalogu Twórców.
Centrum Wiedzy to sekcja edukacyjna, której celem jest budowanie zaufania i obniżanie barier wejścia dla nowych użytkowników (zarówno fanów, jak i twórców). W dobie Web3 i regulacji MiCA, przejrzysta komunikacja i dostępna wiedza są kluczowe dla zgodności z prawem i retencji użytkowników.

Główne wyzwania:

· Dostarczenie łatwo przyswajalnych treści (artykuły, FAQ, poradniki) dla osób nieznających kryptowalut.
· Integracja z wyszukiwarką (site search) i kategoriami.
· Responsywność: czytelność na małych ekranach.
· SEO: każdy artykuł powinien być indeksowany i mieć własną metrykę.

Struktura promptu:
Strategia → Layout → Komponenty (atomy/molekuły/organizmy) → Design system → Web3 (edukacja o Web3) → Inżynieria → Dostępność → Checklista.

---

SPIS TREŚCI

1. Cel strategiczny i kontekst biznesowy
2. Architektura informacji i układ (layout)
   · 2.1 Desktop – dwukolumnowy (lista kategorii + treść)
   · 2.2 Mobile – linearyzacja (akordeon kategorii)
3. Szczegółowa specyfikacja sekcji (atomy i molekuły)
   · 3.1 Nagłówek i wyszukiwarka
   · 3.2 Drzewo kategorii / nawigacja
   · 3.3 Lista artykułów (karty lub lista)
   · 3.4 Widok artykułu (treść, spis treści, ocena)
   · 3.5 Stany puste i błędy
4. Widok artykułu – szczegółowa specyfikacja
   · 4.1 Nagłówek i metadane
   · 4.2 Treść (Markdown / HTML, osadzanie obrazów, filmów)
   · 4.3 Spis treści (sticky na desktop)
   · 4.4 Sekcja “Czy to było pomocne?”
   · 4.5 Powiązane artykuły
5. System wizualny i design tokens (zgodny z Master Planem)
6. Komponenty Web3 w Centrum Wiedzy
   · 6.1 Słowniczek pojęć (tooltipy z definicjami)
   · 6.2 Osadzone poradniki (jak założyć portfel, jak kupić USDC)
7. Inżynieria techniczna (Next.js 15 App Router)
   · 7.1 Strategia renderowania (SSG dla artykułów, ISR)
   · 7.2 Wyszukiwarka (client-side z indeksem)
   · 7.3 Generowanie OG Image dla artykułów
8. Dostępność (WCAG 2.2) i ergonomia
9. Checklista implementacyjna (podział na atomy)

---

1. CEL STRATEGICZNY I KONTEKST BIZNESOWY

Centrum Wiedzy to sekcja, która:

· Edukuje użytkowników o Web3, stablecoinach, portfelach, bezpieczeństwie.
· Buduje zaufanie poprzez transparentne wyjaśnienie zasad działania platformy, opłat i regulacji (MiCA).
· Redukuje obciążenie supportu – użytkownicy znajdują odpowiedzi samodzielnie.
· Wspiera SEO – artykuły poradnikowe przyciągają ruch organiczny.

Metryki sukcesu:

· Współczynnik rozwiązań (self-service rate) – % użytkowników, którzy znajdują odpowiedź bez kontaktu z supportem.
· Czas spędzony na stronie – im dłużej, tym bardziej wartościowe treści.
· Oceny artykułów (“Czy to było pomocne?”) – >80% pozytywnych.

Zgodność z regulacjami (MiCA):
Artykuły muszą zawierać jasne informacje o ryzyku, kosztach transakcyjnych i ochronie konsumenta. Wszelkie ostrzeżenia muszą być zgodne z wymogami prawnymi (bez ukrytych klauzul).

---

2. ARCHITEKTURA INFORMACJI I UKŁAD (LAYOUT)

2.1 Desktop (≥1024px) – dwukolumnowy (nawigacja + treść)

```
┌─────────────────────────────────────────────────────────────────┐
│                     NAGŁÓWEK STRONY                             │
│    "Centrum Wiedzy TipJar+" + krótki opis                       │
├───────────────────────────────┬─────────────────────────────────┤
│                               │                                 │
│  LEWA KOLUMNA (30%)           │  PRAWA KOLUMNA (70%)             │
│  – Sticky (top: 24px)         │  – Treść artykułu (przewijana)   │
│  – Wyszukiwarka (mała)        │                                 │
│  – Drzewo kategorii           │                                 │
│    (akordeon lub lista)       │                                 │
│  – Popularne artykuły         │                                 │
│  – Kontakt do supportu        │                                 │
│                               │                                 │
└───────────────────────────────┴─────────────────────────────────┘
```

Lewa kolumna (nawigacja):

· Pole wyszukiwania (mieści się w lewej kolumnie lub w nagłówku – wybieramy w nagłówku dla spójności).
· Lista głównych kategorii (np. “Pierwsze kroki”, “Dla twórców”, “Dla fanów”, “Bezpieczeństwo”, “Web3 101”, “Regulacje”).
· Każda kategoria rozwija się (accordion) pokazując podkategorie lub artykuły.
· Na dole: link do kontaktu z supportem (“Nie znalazłeś odpowiedzi? Skontaktuj się z nami”).

Prawa kolumna (treść):

· Po kliknięciu w artykuł – wyświetla się jego pełna treść.
· Jeśli nie wybrano artykułu – wyświetlana jest strona powitalna z najpopularniejszymi artykułami.

2.2 Mobile (<640px) – linearyzacja, akordeon kategorii

```
┌─────────────────────────────────┐
│  NAGŁÓWEK + WYSZUKIWARKA        │
├─────────────────────────────────┤
│  KATEGORIE (akordeon)           │
│  ▼ Pierwsze kroki               │
│     – Artykuł 1                 │
│     – Artykuł 2                 │
│  ▼ Dla twórców                  │
│     – ...                       │
├─────────────────────────────────┤
│  TREŚĆ ARTYKUŁU (lub lista)     │
├─────────────────────────────────┤
│  POWIĄZANE ARTYKUŁY             │
└─────────────────────────────────┘
```

· Kategorie jako rozwijane akordeony (oszczędność miejsca).
· Po wybraniu artykułu – treść zajmuje całą szerokość.
· Nawigacja powrotu do listy kategorii (breadcrumb lub przycisk “Wstecz”).

---

3. SZCZEGÓŁOWA SPECYFIKACJA SEKCJI (ATOMY I MOLEKUŁY)

3.1 Nagłówek i wyszukiwarka

Atomy:

· H1 (Mukta Malar 600, --fs-h1) – “Centrum Wiedzy” lub “Jak działa TipJar+?”.
· SearchInput – duże pole (na desktop pełna szerokość, na mobile pod nagłówkiem). Placeholder: “Czego szukasz? (np. jak wypłacić środki)”.
    Zachowanie: debounce 300ms, wyniki wyszukiwania wyświetlane w dropdown lub na osobnej stronie (pod spodem). Dla MVP: przekierowanie do /learn/search?q=....

3.2 Drzewo kategorii / nawigacja

Molekuła: CategoryTree

· Kategorie główne (np. “Pierwsze kroki”, “Dla twórców”, “Dla fanów”, “Bezpieczeństwo”, “Web3 101”).
· Każda kategoria może mieć podkategorie (np. “Portfele”, “Transakcje”).
· Na desktop: lista kategorii z ikoną folderu, po kliknięciu rozwija się lista artykułów (bez przeładowania strony, tylko aktualizacja prawej kolumny).
· Na mobile: akordeon – po kliknięciu w kategorię rozwija się lista artykułów.

Aktywna kategoria: podświetlona na złoto.

3.3 Lista artykułów (karty lub lista)

· W widoku kategorii (gdy nie wybrano artykułu) – wyświetlana jest lista artykułów w tej kategorii.
· Może być w formie kart (z tytułem, krótkim opisem, ikoną) lub prostej listy (tytuł + data). Dla spójności z resztą aplikacji – karty (podobne do kart twórców, ale mniejsze).

Karta artykułu:

· Tytuł (H4)
· Krótki opis (2 linie)
· Data publikacji / aktualizacji
· Kategoria (tag)
· Przycisk “Czytaj więcej” (secondary)

3.4 Widok artykułu – szczegółowa specyfikacja (patrz sekcja 4)

3.5 Stany puste i błędy

· Brak wyników wyszukiwania:
    Ilustracja (lupa), tekst “Nie znaleźliśmy artykułów pasujących do zapytania. Spróbuj innych słów kluczowych.”
· Błąd ładowania:
    Ikona błędu, przycisk “Spróbuj ponownie”.
· Ładowanie (skeleton):
    Skeleton dla listy artykułów (3-4 karty) lub dla treści artykułu (pasek tytułu, kilka linijek).

---

4. WIDOK ARTYKUŁU – SZCZEGÓŁOWA SPECYFIKACJA

4.1 Nagłówek i metadane

· Tytuł artykułu (H1, Mukta Malar 600, --fs-h1)
· Breadcrumbs: “Centrum Wiedzy > Kategoria > Artykuł” (linki)
· Metadane: data publikacji, data aktualizacji, autor (np. “Zespół TipJar+”), szacowany czas czytania (np. “5 min”)
· Kategoria (tag)

4.2 Treść (Markdown / HTML, osadzanie obrazów, filmów)

· Treść artykułu zapisywana w formacie Markdown (z możliwością rozszerzenia o HTML).
· Konwerter Markdown → HTML (np. react-markdown).
· Obsługa:
  · Nagłówki (H2, H3)
  · Listy numerowane i wypunktowane
  · Tabele (proste)
  · Obrazy (responsywne, z alt)
  · Osadzone filmy (YouTube, Vimeo) – przez embed code.
  · Przyciski (np. “Załóż konto” – przekierowanie do rejestracji).
  · Alerty / wyróżnienia (callout) – np. :::warning lub :::tip.

Style treści:

· Czcionka --fs-body-m (1rem), IBM Plex 400, --text-secondary.
· Nagłówki H2: --fs-h2, Mukta Malar 600, --text-primary, margin-top 32px.
· Linki: kolor --gold-400, podkreślenie na hover.
· Obrazy: border-radius 12px, max-width 100%, margin 24px auto.

4.3 Spis treści (sticky na desktop)

· Generowany automatycznie z nagłówków H2 i H3.
· Pojawia się w prawej kolumnie (lub jako osobna sekcja pod tytułem) – tylko na desktop.
· Po kliknięciu w element spisu – płynne przewinięcie do odpowiedniego nagłówka (scroll-behavior: smooth).

4.4 Sekcja “Czy to było pomocne?”

· Na dole artykułu: pytanie “Czy ten artykuł był pomocny?”.
· Dwa przyciski: “Tak” (👍) i “Nie” (👎).
· Po kliknięciu “Nie” – opcjonalne pole tekstowe “Co moglibyśmy poprawić?”.
· Wyniki ocen są anonimowo zbierane (do analizy jakości treści).

4.5 Powiązane artykuły

· Pod sekcją oceny – lista 3-4 artykułów z tej samej kategorii lub na podstawie tagów.
· Każdy powiązany artykuł jako mała karta (tytuł + link).

---

5. SYSTEM WIZUALNY I DESIGN TOKENS (ZGODNY Z MASTER PLANEM)

Identyczne tokeny jak w poprzednich promptach.
Dodatkowe dla artykułów:

· --article-line-height: 1.7 (dla czytelności)
· --article-max-width: 720px (ograniczenie szerokości treści na desktop)
· --code-background: #002B2B (dla bloków kodu)
· --code-border-radius: 8px

Tryb jasny (light mode) dla czytelności długich tekstów?
W dokumentach strategicznych zasugerowano możliwość użycia jasnego tła dla długich treści (dla lepszej czytelności). W TipJar+ domyślnie jest dark mode, ale dla artykułów można rozważyć opcję przełącznika lub pozostawić dark mode z wysokim kontrastem. Decyzja: dark mode z zachowaniem kontrastu 4.5:1 – spójność z resztą aplikacji.

---

6. KOMPONENTY WEB3 W CENTRUM WIEDZY

6.1 Słowniczek pojęć (tooltipy z definicjami)

· W treści artykułów, terminy techniczne (np. “stablecoin”, “gas fee”, “ERC-20”, “seed phrase”) są podświetlane (kolor --gold-400, dotted underline).
· Po najechaniu / kliknięciu – tooltip z krótką definicją i linkiem do szczegółowego artykułu.

Implementacja:
<abbr title="Definicja">stablecoin</abbr> + CSS custom tooltip.

6.2 Osadzone poradniki (jak założyć portfel, jak kupić USDC)

· Artykuły mogą zawierać interaktywne elementy, np. krok po kroku “Jak założyć portfel MetaMask” z linkiem do oficjalnej strony.
· Możliwość osadzenia filmów instruktażowych (YouTube).

---

7. INŻYNIERIA TECHNICZNA (NEXT.JS 15 APP ROUTER)

7.1 Strategia renderowania (SSG dla artykułów, ISR)

· Artykuły: SSG (Static Site Generation) z generateStaticParams.
    Każdy artykuł ma własną ścieżkę: /learn/[slug].
    Revalidate (ISR) co 24h (lub ręczny webhook przy aktualizacji treści).
· Strona główna Centrum Wiedzy: SSG (lista kategorii i najnowsze artykuły).
· Wyszukiwarka: może być realizowana przez klienta (indeks JSON) lub przez API. Dla uproszczenia – endpoint /api/search?q=... z przeszukiwaniem tytułów i treści.

7.2 Wyszukiwarka (client-side z indeksem)

· Po stronie klienta: pobranie listy wszystkich artykułów (lub tytułów i opisów) jako JSON (generowany przy budowie).
· Wyszukiwanie po stronie klienta (flexsearch lub prosty filter).
· Wyniki wyświetlane w dropdown lub na osobnej stronie /learn/search.

7.3 Generowanie OG Image dla artykułów

· Dla każdego artykułu dynamicznie generowany obraz Open Graph (np. tytuł artykułu na tle brandowym).
· Użycie @vercel/og (jak w profilu publicznym).
· Ścieżka: /api/og/article?title=....

---

8. DOSTĘPNOŚĆ (WCAG 2.2) I ERGONOMIA

· Kontrast: treść na ciemnym tle – minimum 4.5:1 (sprawdzone).
· Nawigacja klawiaturą: Tab przez kategorie, artykuły, linki wewnątrz treści.
· Focus: widoczny outline na linkach i przyciskach.
· Spis treści: ułatwia nawigację osobom korzystającym z czytników ekranu (odpowiednie aria-label).
· prefers-reduced-motion: wyłączenie płynnego przewijania.

---

9. CHECKLISTA IMPLEMENTACYJNA (PODZIAŁ NA ATOMY)

Atomy (podstawowe)

· SearchInput
· CategoryTree (akordeon)
· ArticleCard (karta artykułu)
· ArticleMeta (data, autor, czas czytania)
· TableOfContents (spis treści)
· HelpfulnessButtons (Tak/Nie)
· RelatedArticles
· Breadcrumbs
· GlossaryTooltip (dla terminów Web3)

Molekuły / Organizmy

· ArticleView (pełny widok artykułu)
· CategoryView (lista artykułów w kategorii)
· LearnHomePage (strona główna Centrum Wiedzy)
· SearchResultsPage

Integracje techniczne

· Next.js 15 App Router: /learn/[slug]/page.tsx, /learn/page.tsx, /learn/search/page.tsx
· generateStaticParams dla artykułów
· Markdown → HTML (react-markdown)
· API endpoint /api/search
· OG Image generator dla artykułów
· Indeksowanie przez Google (sitemap)

---

📌 PODSUMOWANIE

Ten prompt dostarcza atomowo szczegółowej specyfikacji Centrum Wiedzy.
Zawiera:

· Strategię edukacyjną i budowania zaufania.
· Layout desktop/mobile z nawigacją kategorii.
· Specyfikację widoku artykułu (treść, spis treści, ocena, powiązane artykuły).
· Design tokens i Web3 (słowniczek, poradniki).
· Inżynierię Next.js (SSG dla artykułów, wyszukiwarka).
· Dostępność WCAG 2.2.
· Pełną checklistę implementacyjną.

.