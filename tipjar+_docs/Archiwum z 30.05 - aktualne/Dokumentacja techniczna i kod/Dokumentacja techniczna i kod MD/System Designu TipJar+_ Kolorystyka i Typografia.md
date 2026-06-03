Raport Projektowy Systemu Designu
TipJar+: Architektura Wizualna

1. Architektura Kolorystyczna: "Nocturnal Opulence"

1.1. Kontekst Projektowy i Cele Strategiczne

W krajobrazie aplikacji finansowych roku 2025, gdzie zaufanie użytkownika jest walutą równie
cenną co transakcje pieniężne, warstwa wizualna produktu przestała pełnić funkcję jedynie
estetyczną. Stała się fundamentem użyteczności, bezpieczeństwa i postrzeganej wartości
marki. Niniejszy raport stanowi kompleksową dokumentację architektury kolorystycznej oraz
typograficznej dla aplikacji TipJar+, platformy dedykowanej bezgotówkowemu napiwkowaniu.
Stylistyka "Premium Dark Theme" została wybrana jako odpowiedź na potrzeby użytkowników –
pracowników sektora usług, którzy często korzystają z aplikacji w warunkach nocnych.

1.2. Paleta Podstawowa: Skala "Deep Ocean"

Kolor bazowy #003737 (Ciemny Turkus) pełni funkcję płótna, zastępując standardowe czernie.
HSL (Precyzyjne)  Rola w Systemie
Nazwa Tokenu  Waga

HEX

(Dark Mode)

teal-50

50

#E0F2F2

180°, 40%, 95%  Tekst na ciemnym

tle (zastępuje
czystą biel).

teal-100

teal-200

100

200

#B3D9D9

#80BFBF

180°, 35%, 78%  Subtelne akcenty,
ikony nieaktywne.
180°, 38%, 62%  Obrysy (Borders)

teal-300

300

#4DA6A6

180°, 38%, 48%  Drugorzędne

elementów
formularzy.

teal-400

400

#268C8C

przyciski, elementy
graficzne.

180°, 57%, 35%  Fokus, stan hover
dla ciemniejszych
elementów.

teal-500

500

#007373

180°, 100%, 22%  Interaktywne tła

kart, nagłówki
sekcji.

teal-600

600

#005959

180°, 100%, 17%  Hover dla

elementów o
wadze 500.

teal-700

700

#004545

180°, 100%, 14%  Podstawowe tło

dla "wyniesionych"
elementów

Nazwa Tokenu  Waga

HEX

HSL (Precyzyjne)  Rola w Systemie

(Dark Mode)
(Elevated
Surface).

teal-800

Base

#003737

180°, 100%, 11%  Główny Kolor Tła

Aplikacji.

teal-900

900

#001F1F

180°, 100%, 6%  Najgłębsze tło,

Pasek Nawigacji,
Cienie.

1.3. System Akcentów

●  Złoto (#FFD700): Główny katalizator akcji (CTA). W trybie ciemnym kontrast wynosi

11.2:1.

○  gold-400 (Base): #FFD700 – Główne przyciski.
○  gold-500: #FFC107 – Stan Hover.
○  gold-100: #FFF9C4 – Tło toastów/powiadomień.

●  Fiolet (#9D4EDD): Akcent pomocniczy, nawigacja i statusy systemowe.

○  purple-300 (Base): #9D4EDD – Switche, aktywne ikony menu.
○  purple-100: #E0B3FF – Tła zaznaczonych elementów.

2. Hierarchia Typograficzna: Humanistyczna
Technologia

Typografia w aplikacji finansowej TipJar+ musi balansować dwie sprzeczne wartości: zaufanie
(wymagające precyzji) oraz dostępność (wymagającą przyjazności). Wybrana para czcionek
realizuje strategię "Soft Tech" – technologia, która jest ludzka.

2.1. Dobór Krojów (Typeface Selection)

Główny Krój (Headings & UI): Mukta Malar

●  Charakterystyka: Humanistyczny sans-serif o otwartych, lekko zaokrąglonych kształtach.
Jest to krój "displayowy", który w dużych rozmiarach buduje przyjazną atmosferę. Został
wybrany, aby przełamać "zimny" wizerunek typowych aplikacji bankowych.

●  Zastosowanie: Nagłówki (H1-H6), Przyciski (Buttons), Zakładki (Tabs), Elementy

nawigacyjne.

●  Wagi: Light (300), Regular (400), Medium (500), Bold (700).

Krój Pomocniczy (Body & Data): IBM Plex Sans

●  Charakterystyka: Nowoczesny grotesk o technicznym rodowodzie (nawiązanie do

maszyn do pisania IBM). Charakteryzuje się doskonałą czytelnością w małych rozmiarach
i wyraźnym rozróżnieniem znaków (np. zero vs 'O', 'I' vs 'l'), co jest kluczowe przy
wyświetlaniu kwot pieniężnych i numerów kont.

●  Zastosowanie: Tekst paragrafowy, opisy, etykiety formularzy, dane liczbowe (kwoty),

stopki, regulaminy.

●  Wagi: Light (300), Regular (400), Medium (500), SemiBold (600).

2.2. Skala Typograficzna (Type Scale)

Oparta na zmodyfikowanej skali Major Third (1.250), dostosowanej do nowoczesnych
interfejsów mobilnych, gdzie nagłówki nie mogą dominować nad treścią (tzw. "Compact Mobile
Scale"). Baza: 1rem = 16px.
Rola (Role) Element

Font Family Waga

Line Height Letter

Rozmiar
(Size)

(Weight)
Bold (700)  2.5rem
(40px)

SemiBold
(600)

2.0rem
(32px)

Spacing
1.1 (110%)  -0.02em

Zastosowa
nie
Ekrany
powitalne,
Saldo
główne.
1.2 (120%)  -0.01em  Główne

Display
Hero

HTML
h1.hero  Mukta
Malar

Heading 1  h1

Heading 2  h2

Heading 3  h3

Heading 4  h4

Heading 5  h5

Heading 6  h6

Mukta
Malar

Mukta
Malar

Mukta
Malar
Mukta
Malar

Mukta
Malar

Mukta
Malar

Medium
(500)

1.75rem
(28px)

1.25
(125%)

0

Medium
(500)
Regular
(400)

1.5rem
(24px)
1.25rem
(20px)

1.3 (130%)  0

1.4 (140%)  0.01em

Bold (700)  1.125rem

1.4 (140%)  0.01em

(18px)

Regular
(400)

1rem
(16px)

1.5 (150%)  0.02em

Body
Large

Body
Default

Body
Small

p.lead

IBM Plex
Sans

(18px)

Light (300)  1.125rem

1.6 (160%)  0.01em  Wstępy

p, span

IBM Plex
Sans

Regular
(400)

1rem
(16px)

1.5 (150%)  0

small

IBM Plex
Sans

Regular
(400)

0.875rem
(14px)

1.4 (140%)  0.01em

Caption/Ti
ny

.caption

IBM Plex
Sans

Medium
(500)

0.75rem
(12px)

1.2 (120%)  0.02em

Button

.btn

Mukta

SemiBold  1rem

1.0 (100%)  0.04em

tytuły
ekranów.
Sekcje
główne, np.
"Historia
transakcji".
Tytuły kart,
modali.
Podtytuły,
wyróżnione
elementy
listy.
Nagłówki
wewnątrz
tekstu.
Pomocnicz
e nagłówki
(rzadko
używane).

(Lead text),
cytaty.
Standardo
wy tekst,
opisy.
Metadane
(daty),
podpisy
pod polami.
Tekst
prawny,
statusy.
Tekst na

Rola (Role) Element

Font Family Waga

HTML

Label

Malar

(Weight)
(600)

Rozmiar
(Size)
(16px)

Line Height Letter

Spacing

Overline

.overline

IBM Plex
Sans

Medium
(500)

0.75rem
(12px)

1.0 (100%)  0.1em
(Wide)

Zastosowa
nie
przyciskach
(lekko
szerszy).
Kategorie,
etykiety
(UPPERCA
SE).

2.3. System Kolorów Tekstu (Text Colors & Readability)

Mapowanie kolorów z sekcji 1 na role typograficzne w celu zapewnienia kontrastu WCAG
AA/AAA.

●  Na tle Ciemnym Turkusie (teal-800/teal-900) - Dark Mode:

○
○

○
○

text-primary (Nagłówki, Body): #FFFFFF (Biały).
text-secondary (Body Small, Captions): #D6EBEB (teal-100 z opacity 85% - lekko
turkusowa biel, mniej męcząca dla oczu).
text-tertiary (Placeholdery, Disabled): #5C7A7A (teal-200 zredukowany).
text-accent: #FFD700 (Złoty) – Tylko dla kluczowych liczb (np. +150 PLN).

●  Na przycisku Złotym (gold-400):

○

text-on-gold: #003737 (Ciemny turkus). Krytyczne: Nigdy nie używać białego tekstu
na złocie.

●  Na przycisku Fioletowym (purple-300):

○

text-on-purple: #FFFFFF (Biały).

2.4. Implementacja CSS (Zmienne i Mixiny)

Poniższy kod definiuje system typograficzny z wykorzystaniem nowoczesnej funkcji clamp() dla
responsywności (płynne skalowanie między mobile a desktop).
:root {
  /* --- Fonts --- */
  --font-heading: 'Mukta Malar', sans-serif;
  --font-body: 'IBM Plex Sans', sans-serif;

  /* --- Font Weights --- */
  --fw-light: 300;
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;

  /* --- Font Sizes (Responsive Clamp: Mobile -> Desktop) --- */
  /* H1: 32px -> 40px */
  --fs-h1: clamp(2rem, 1.5vw + 1.6rem, 2.5rem);
  /* H2: 28px -> 32px */
  --fs-h2: clamp(1.75rem, 1vw + 1.5rem, 2rem);
  /* H3: 24px -> 28px */

  --fs-h3: clamp(1.5rem, 0.5vw + 1.3rem, 1.75rem);
  /* H4: 20px -> 24px */
  --fs-h4: clamp(1.25rem, 0.4vw + 1.15rem, 1.5rem);

  --fs-body: 1rem;       /* 16px */
  --fs-small: 0.875rem;  /* 14px */
  --fs-tiny: 0.75rem;    /* 12px */

  /* --- Line Heights --- */
  --lh-tight: 1.1;
  --lh-heading: 1.25;
  --lh-body: 1.5;
  --lh-loose: 1.6;
}

/* --- Global Typography Styles --- */

body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--text-secondary); /* Domyślny kolor tekstu to lekka
szarość/turkus */
  background-color: var(--teal-900);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--text-primary); /* Nagłówki są czysto białe */
  margin-bottom: 0.5em;
  font-weight: var(--fw-medium);
}

h1 { font-size: var(--fs-h1); line-height: var(--lh-tight);
font-weight: var(--fw-semibold); }
h2 { font-size: var(--fs-h2); line-height: var(--lh-heading); }
h3 { font-size: var(--fs-h3); line-height: var(--lh-heading); }
h4 { font-size: var(--fs-h4); line-height: var(--lh-heading); }

/* Klasy pomocnicze */
.text-label {
  font-family: var(--font-body);
  font-size: var(--fs-tiny);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: var(--fw-medium);
  color: var(--text-tertiary);
}

.text-amount {
  font-family: var(--font-body); /* IBM Plex Sans dla liczb */
  font-feature-settings: "tnum"; /* Tabular numbers - stała szerokość
cyfr */
  font-weight: var(--fw-medium);
}

.btn-text {
  font-family: var(--font-heading); /* Mukta Malar dla przycisków */
  font-weight: var(--fw-semibold);
  font-size: 1rem;
  letter-spacing: 0.04em;
}

2.5. Szczególne Wytyczne dla Deweloperów

1.  Cyfry (Tabular Figures): W fontcie IBM Plex Sans należy włączyć funkcję OpenType

tnum (Tabular Numbers) dla wszystkich tabel i list transakcji. Dzięki temu cyfry będą miały
stałą szerokość, co ułatwia pionowe porównywanie kwot (np. w historii napiwków).

2.  Tracking w Nagłówkach: Mukta Malar ma naturalnie otwarte światło. Dla bardzo dużych
nagłówków (H1 powyżej 40px) zaleca się lekko ujemny letter-spacing (-0.02em) dla
bardziej zwartego, "magazynowego" wyglądu.

3.  Hierarchia Optyczna: W ciemnym motywie pogrubiony tekst (Bold) wydaje się "grubszy"
niż na jasnym tle (efekt zalewania światłem). Zaleca się używanie wagi SemiBold (600)
zamiast Bold (700) dla nagłówków na ciemnym tle, aby zachować elegancję.

3. Implementacja Techniczna Kolorów: Zmienne CSS i
Tokeny

(Sekcja zaktualizowana o nowe zmienne typograficzne w kontekście kolorów)
:root {
  /*... (Zmienne kolorystyczne z Sekcji 1)... */

  /* --- ZMIENNE SEMANTYCZNE (Semantic Tokens) - DARK MODE DEFAULT ---
*/

  /* Tła */
  --bg-app: var(--teal-900);
  --bg-surface: var(--teal-800);
  --bg-surface-elevated: var(--teal-700);
  --bg-input: #002B2B;

  /* Tekst */
  --text-primary: #FFFFFF;
  --text-secondary: #D6EBEB; /* Tinted White */

  --text-tertiary: var(--teal-200);
  --text-on-gold: var(--teal-900); /* Dla kontrastu na przyciskach */

  /* Akcje */
  --action-primary: var(--gold-400);
  --action-primary-hover: var(--gold-300);
  --action-primary-active: var(--gold-500);

  --action-secondary: var(--purple-300);

  /* Obrysy */
  --border-subtle: var(--teal-700);
  --border-focus: var(--purple-300);
}

