🧬 Krok 6: Specyfikacja Centrum Wiedzy (Learn)

1. Architektura Layoutu

1.1 Desktop (≥1024px) – Dwukolumnowy z Lepką Nawigacją

Właściwość Lewa Kolumna (Nawigacja) Prawa Kolumna (Treść)
Szerokość 30% (ok. 280px – 320px) 70%
Zawartość Wyszukiwarka, Drzewo Kategorii (Akordeon), Popularne Artykuły, Link do Wsparcia Widok kategorii / Lista artykułów / Treść artykułu
Zachowanie position: sticky; top: 24px Swobodne przewijanie
Odstęp (Gap) 32px – 48px 

1.2 Mobilny (<640px) – Linearyzacja

Właściwość Wartość
Struktura Wyszukiwarka (pełna szerokość) → Akordeon Kategorii → Treść
Nawigacja powrotna Breadcrumbs lub przycisk "Wstecz" (zamiast bocznego menu)
Zapobieganie Okluzji padding-bottom: calc(64px + env(safe-area-inset-bottom)) na kontenerze treści

---

2. Komponenty Nawigacyjne

2.1 Wyszukiwarka

Właściwość Wartość
Placeholder "Czego szukasz? (np. jak wypłacić środki)"
Debounce 300ms
Silnik (start) Flexsearch – indeks JSON pobierany raz, wyszukiwanie po stronie klienta
Silnik (skala >1000) Pagefind – indeks dzielony na chunki, lazy loading
Szerokość (desktop) 100% lewej kolumny
Wysokość 48px
Tło --bg-surface-base (--teal-800)
Obramowanie 1px solid --border-subtle (--teal-700)
Border Radius 6px
Focus --gold-400 z poświatą

2.2 Drzewo Kategorii (CategoryTree)

Właściwość Desktop Mobile
Struktura Lista z ikonami folderów, podkategorie rozwijane (akordeon) Akordeon (rozwijane sekcje)
Aktywna kategoria Podświetlenie --gold-400 (tekst + lewy border 3px) To samo
Odstępy padding: 8px 12px padding: 12px 16px
Ikony 20x20px, kolor --text-tertiary To samo
Hover Tło --bg-surface-elevated (--teal-700) To samo

---

3. Widok Artykułu

3.1 Nagłówek i Metadane

Element Styl
Breadcrumbs Nad tytułem, font 14px, kolor --text-tertiary, interaktywne
Tytuł (H1) Mukta Malar 600, --fs-h1, kolor --text-primary
Data publikacji / aktualizacji IBM Plex Sans 400, 14px, --text-tertiary
Czas czytania "X min", generowany automatycznie
Autor "Zespół TipJar+" lub imię eksperta

3.2 Treść Główna

Właściwość Wartość
Parser react-markdown z pluginami
Maks. szerokość tekstu --article-max-width: 720px (dla czytelności)
Font IBM Plex Sans 400, --fs-body-m (16px)
Interlinia 1.7
Kolor tekstu --text-secondary (#D6EBEB, nie ostra biel)
Nagłówki (H2, H3) Mukta Malar 600/500, --fs-h2 / --fs-h3
Linki w tekście Kolor --gold-400, underline na hover
Obrazy Responsywne, border-radius: 8px, next/image
Embed YouTube Iframe responsywny (proporcje 16:9), border-radius: 8px
Bezpieczeństwo DOMPurify przed renderowaniem

3.3 Callout Blocks (Markdown)

Składnia Styl
:::warning Tło rgba(255, 145, 0, 0.1), obramowanie --warning-base, ikona ⚠️
:::tip Tło rgba(0, 230, 118, 0.1), obramowanie --success-base, ikona 💡
:::info Tło rgba(102, 217, 232, 0.1), obramowanie --info-base, ikona ℹ️
:::danger Tło rgba(255, 82, 82, 0.1), obramowanie --error-base, ikona 🔥

3.4 Spis Treści (Table of Contents)

Właściwość Wartość
Generowanie Automatyczne z nagłówków H2/H3
Pozycja (desktop) Sticky w prawej części lewej kolumny lub pod nagłówkiem
Aktywny nagłówek Podświetlenie --gold-400 (Intersection Observer)
Kliknięcie scroll-behavior: smooth (dla prefers-reduced-motion – natychmiastowy skok)
Z-index --z-elevated (10)

3.5 Glossary Tooltips (Słowniczek)

Właściwość Wartość
Wyzwalacz Terminy techniczne w <abbr> z przerywanym podkreśleniem --gold-400
Zawartość Krótka definicja + link do pełnego artykułu
Opóźnienie 500ms (Hover Intent)
Pozycjonowanie Dynamiczne (biblioteka kalkulująca zderzenia) – unikanie viewport clipping
Styl Jak Tooltip (Krok 3, sekcja 3.1)

3.6 Helpfulness Buttons (Feedback)

Właściwość Wartość
Pytanie "Czy ten artykuł był pomocny?"
Przyciski "Tak" / "Nie" (Secondary)
Negatywna opinia Rozwija textarea z animacją --ease-spring
Placeholder "Co moglibyśmy poprawić?"
Wysyłka Anonimowa, asynchroniczna

---

4. Stany Puste i Ładowania

Stan Zachowanie
Brak wyników wyszukiwania Ilustracja + komunikat + sugerowane popularne wyszukiwania
Ładowanie artykułu Skeleton loader (pulsujące bloki tekstu, shimmer --teal-700 → --teal-800)
Ładowanie listy Skeleton cards (3-4 sztuki)
Błąd sieci Komunikat --error-base + przycisk "Spróbuj ponownie"

---

5. Integracje Techniczne

Obszar Rozwiązanie
Renderowanie SSG + ISR (generateStaticParams, revalidate: 3600 lub on-demand)
OG Image @vercel/og (Satori) – /api/og/article?title=...
Edukacja Web3 Artykuły o ERC-4337 (inteligentne portfele, Paymaster, Social Recovery)
MiCA Compliance Repozytorium White Papers (iXBRL), bloki ostrzegawcze w artykułach

---

6. Checklista Komponentów Centrum Wiedzy

Atom / Molekuła Kluczowe Właściwości
SearchInput Debounce 300ms, placeholder instruktażowy, Flexsearch
CategoryTree Akordeon (desktop: rozwinięte, mobile: zwinięte), aktywny marker --gold-400
ArticleCard Tytuł, opis line-clamp: 2, data, tag kategorii, przycisk "Czytaj więcej"
Breadcrumbs Ścieżka: Centrum Wiedzy > Kategoria > Artykuł
ArticleView react-markdown, --article-max-width: 720px, line-height: 1.7
CalloutBlock Mapowanie :::type na semantyczne komponenty
TableOfContents Generowany z H2/H3, sticky, Intersection Observer
GlossaryTooltip <abbr> z data-tooltip, dynamiczne pozycjonowanie
HelpfulnessButtons Tak/Nie, textarea przy "Nie"
EmptyState Ilustracja + komunikat + sugerowane linki
SkeletonArticle Shimmer na blokach tekstu

---

🐋. 