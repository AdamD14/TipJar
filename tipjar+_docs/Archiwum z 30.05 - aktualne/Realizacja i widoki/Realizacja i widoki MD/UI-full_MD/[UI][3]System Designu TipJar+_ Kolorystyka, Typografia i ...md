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

Jest to krój "displayowy", który w dużych rozmiarach buduje przyjazną atmosferę.

●  Zastosowanie: Nagłówki (H1-H6), Przyciski (Buttons), Zakładki (Tabs).
●  Wagi: Light (300), Regular (400), Medium (500), Bold (700).

Krój Pomocniczy (Body & Data): IBM Plex Sans

●  Charakterystyka: Nowoczesny grotesk o technicznym rodowodzie. Doskonała

czytelność cyfr i małych tekstów.

●  Zastosowanie: Tekst paragrafowy, opisy, etykiety formularzy, dane liczbowe (kwoty).
●  Wagi: Light (300), Regular (400), Medium (500), SemiBold (600).

2.2. Skala Typograficzna (Type Scale)

Baza: 1rem = 16px. Responsywność oparta o clamp().

Rola
Display Hero
Heading 1
Heading 2
Heading 3
Heading 4
Body Default
Body Small
Button Label
3. Identyfikacja Wizualna: Logo TipJar+

Element HTML
h1.hero
h1
h2
h3
h4
p
small
.btn

Font Family
Mukta Malar
Mukta Malar
Mukta Malar
Mukta Malar
Mukta Malar
IBM Plex Sans
IBM Plex Sans
Mukta Malar

Waga
Bold (700)
SemiBold (600)
Medium (500)
Medium (500)
Regular (400)
Regular (400)
Regular (400)
SemiBold (600)

Rozmiar (Size)
2.5rem (40px)
2.0rem (32px)
1.75rem (28px)
1.5rem (24px)
1.25rem (20px)
1rem (16px)
0.875rem (14px)
1rem (16px)

Nowe logo TipJar+ zostało zaprojektowane jako synteza nowoczesnej fintechowej precyzji i
organicznej przyjazności. Znak graficzny (sygnet) oraz logotyp tworzą spójną całość w układzie
pionowym (stacked), zoptymalizowanym pod kątem ekranów powitalnych aplikacji mobilnych
oraz materiałów marketingowych.

3.1. Koncepcja i Symbolika

Logo opiera się na Minimalistycznym Słoiku (The Jar), który jest metaforą gromadzenia
wartości.

1.  Kształt (The Vessel): Otwarta forma "U" z wyraźnym, ale eleganckim rantem. Nie jest to
rustykalny słoik "mason jar", lecz jego cyfrowa, geometryczna abstrakcja. Zaokrąglona
podstawa nawiązuje do przyjaznego charakteru typografii Mukta Malar.

2.  Symbol Plus (+): Zamiast monety, do słoika "wpada" symbol Plusa.

○  Znaczenie: "Plus" oznacza dodawanie wartości (napiwek), ale też technologiczny

aspekt (TipJar Plus).

○  Pozycja: Plus unosi się wewnątrz naczynia (lewitacja), co dodaje lekkości i sugeruje

cyfrowy charakter pieniądza (nie podlega grawitacji jak fizyczny bilon).

3.  Układ (Layout): Wersja pionowa (Sygnet nad Tekstem) buduje prestiż i symetrię, idealną

dla centralnie wyrównanych interfejsów mobilnych.

3.2. Specyfikacja Konstrukcyjna

●  Siatka (Grid): Logo oparte na siatce 100x100px dla ikony. Grubość linii (Stroke Width)

wynosi 6 jednostek, co zapewnia czytelność nawet przy skalowaniu do rozmiaru 16x16px
(favicon).

●  Clearspace (Pole ochronne): Minimalny odstęp wokół logo wynosi 1x wysokości litery

"T".

●  Typografia Logotypu: Zmodyfikowany krój Mukta Malar Bold. Kerning (światło między

literami) został lekko zacieśniony (-20), aby stworzyć bardziej zwarty blok tekstu.

3.3. Warianty Kolorystyczne

Logo przygotowano w trzech podstawowych wersjach, aby pokryć wszystkie use-cases:

1.  Primary Gold (Domyślny dla Ciemnego Tła):
Ikona i Tekst: #FFD700 (Złoty)

○
○  Tło: Transparentne (lub #003737 w podglądzie)

○  Zastosowanie: Splash screen aplikacji, nagłówki w Dark Mode.

2.  Monochrome White (Wersja Kontra):

○  Całość: #FFFFFF
○  Zastosowanie: Na tłach o wysokim nasyceniu (zdjęcia, gradienty), stopki

dokumentów.
3.  App Icon (Ikona Aplikacji):

○  Tło: #003737 (Ciemny Turkus)
○  Sygnet: #FFD700 (Złoty) - centralnie, bez tekstu.
○  Zastosowanie: iOS/Android Launcher, Favicon.

3.4. Implementacja Wektorowa (SVG)

Poniżej znajduje się kompletny kod SVG definiujący logo. Kod ten jest zoptymalizowany
(usunięte zbędne metadane) i gotowy do użycia jako komponent React/HTML lub do zapisu
jako plik .svg.
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220"
fill="none">

  <defs>
    <style>
     .icon-stroke { stroke: #FFD700; stroke-width: 12; stroke-linecap:
round; stroke-linejoin: round; }
     .icon-fill { fill: #FFD700; }
     .text-fill { fill: #FFD700; font-family: 'Mukta Malar',
sans-serif; font-weight: 700; }
    </style>
  </defs>

  <g id="Logomark" transform="translate(50, 0)">
    <path class="icon-stroke" d="M25 40 V 90 A 25 25 0 0 0 75 90 V 40"
/>
    <line class="icon-stroke" x1="15" y1="40" x2="85" y2="40" />
    <g transform="translate(50, 70)">
       <line class="icon-stroke" x1="0" y1="-12" x2="0" y2="12"
stroke-width="10"/>
       <line class="icon-stroke" x1="-12" y1="0" x2="12" y2="0"
stroke-width="10"/>
    </g>
  </g>

  <g id="Logotype" transform="translate(0, 160)">
    <text x="100" y="0" text-anchor="middle" class="text-fill"
font-size="42" letter-spacing="-1">TipJar+</text>
  </g>
</svg>

3.5. Wizualizacja Wariantów i Exportu (Assets)

Poniższa sekcja prezentuje wizualizację logo w kontekście docelowym.

A. App Icon (iOS/Android)

Ikona aplikacji rezygnuje z detali tekstowych. Skupia się na kontraście Złoto/Turkus. Margines
ochronny (Padding) wynosi 20% szerokości ikony.

●  Format: PNG (1024x1024px), SVG.
●  Tło: #003737 (Pełne wypełnienie).

B. Favicon (Web)

Wymaga maksymalnego uproszczenia. W rozmiarze 16x16px lub 32x32px rant słoika i korpus
są pogrubione optycznie.

●  Format:.ico (32x32),.png (192x192).

C. Social Sharing / OG Image

Format poziomy 1200x630px.

●  Kompozycja: Logo pionowe umieszczone centralnie na tle #001F1F (Darker Teal).
●  Dodatek: Delikatny gradient radialny ("Glow") za logo w kolorze #007373 (opacity 20%),

aby podbić złoty kolor.

3.6. Podsumowanie Wdrożenia

1.  Pliki SVG: Są "źródłem prawdy". Używaj ich w aplikacji webowej i mobilnej (jako

VectorDrawable).

2.  Eksport PNG: Należy wygenerować pliki rastrowe tylko tam, gdzie wektory nie są

obsługiwane (np. starsze klienty email).

3.  Spójność: Logo TipJar+ w kolorze złotym nigdy nie powinno być umieszczane na białym
tle (zbyt niski kontrast). W przypadku jasnych tła (Light Mode) należy użyć wariantu logo
w kolorze Ciemny Turkus (#003737).

