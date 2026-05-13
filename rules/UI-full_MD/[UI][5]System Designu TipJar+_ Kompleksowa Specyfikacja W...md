Raport Projektowy Systemu Designu
TipJar+: Architektura Wizualna

1. Architektura Kolorystyczna: "Nocturnal Opulence"

1.1. Kontekst Projektowy i Cele Strategiczne

W krajobrazie aplikacji finansowych roku 2026, gdzie zaufanie użytkownika jest walutą równie
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
organicznej przyjazności.

3.1. Kod SVG Logo

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

4. System Ikonografii (Outline Style)

System ikon oparty na siatce 24px i linii o grubości 1.5px. Styl "Pusty w środku" z zaokrąglonymi
narożnikami.

Przykładowy Kod SVG Ikony (Portfel)

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
viewBox="0 0 24 24" fill="none" stroke="currentColor"
stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5
19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" />
  <path d="M16 12H21" />
  <path d="M3 7L21 7" />
</svg>

5. System Grafiki Tła: "Isometric Ledger"

Aby dopełnić wizualny język TipJar+, zaprojektowano system teł 3D, który metaforycznie
przedstawia cyfrowy przepływ pieniędzy (Digital Ledger). Zamiast płaskich kolorów, stosujemy
abstrakcyjne kompozycje geometryczne oparte na blokach (voxels/boxes), które sugerują
stabilność (blockchain) i nowoczesność.
Stylistyka ta, nazwana "Isometric Ledger", wykorzystuje głębię izometryczną, matowe
wykończenia i precyzyjne oświetlenie, aby stworzyć wrażenie fizyczności w cyfrowym świecie.

5.1. Specyfikacja Artystyczna (Art Direction)

●  Styl: Abstrakcja Geometryczna 3D / Low Poly Isometric.
●  Obiekty: Sześciany (Cubes), Prostopadłościany (Blocks), Płytki (Tiles).
●  Perspektywa: Izometryczna (Orthographic) lub lekko nachylona (Tilt-shift) dla uzyskania

efektu makiety.

●  Oświetlenie: Miękkie, studyjne oświetlenie "Rembrandt" z góry-prawej strony. Cienie są

miękkie i rozproszone (Area Light), nigdy ostre i czarne.

●  Materiały:

○  Turkus (Base): Matowy plastik lub ceramika (Roughness 0.6).
○  Złoto (Accent): Szczotkowany metal (Brushed Gold) lub emisja światła (Glow) dla

krawędzi.

○  Fiolet (Depth): Półprzezroczyste szkło (Frosted Glass) lub światło wolumetryczne.

5.2. Hero Section: "The Network Flow" (Zasięg Globalny)

Grafika przeznaczona dla głównego ekranu powitalnego (Landing Page) lub tła onboardingu.
Ma sugerować globalną sieć połączeń i przepływ wartości.

●  Wymiary: 2400 x 800px (Szeroka panorama).
●  Format: PNG (z kompresją) lub WebP.
●  Kompozycja: Asymetryczna. Główna masa obiektów po prawej stronie, zanikająca ku

lewej, aby zrobić miejsce na nagłówek tekstowy.

●  Prompt Generatywny (dla AI/3D Artist):Abstract 3D isometric composition of floating
rectangular blocks and data cubes connecting in a network flow. Dark teal background
(#001F1F). The blocks are matte dark turquoise (#003737) with glowing golden edges
(#FFD700) and translucent purple glass elements (#9D4EDD). Soft volumetric lighting
from top right. High-end fintech aesthetic, clean lines, minimalist, expansive, airy
composition on the left side for text overlay. 8k resolution, octane render.

5.3. Nagłówki Sekcji: "The Foundation" (Stabilność)

Węższe grafiki tła dla belek tytułowych lub oddzielaczy sekcji. Skupiają się na detalu
architektonicznym.

●  Wymiary: 1200 x 300px.
●  Kompozycja: Horyzontalna "półka" lub linia bloków u dołu kadru.
●  Prompt Generatywny:Wide panoramic 3D abstract background. A minimalist horizon line
made of stylized isometric cubes in dark teal and matte gold. Shallow depth of field. The
background is a deep void teal (#001F1F). Elegant, subtle, architectural structure. No
text, high quality render.

5.4. Tła Teksturowe: "Nano-Grid" (Subtelne Wzory)

Zamiast ciężkich plików graficznych, tła strukturalne (patterny) powinny być realizowane w
kodzie CSS lub jako lekkie SVG. Zapewnia to ostrość na każdym ekranie i minimalny rozmiar
pliku.
Wzór 1: Isometric Dot Grid (Subtelna siatka kropek) Idealne tło dla sekcji statystyk lub
dashboardu. Tworzy techniczną atmosferę bez odwracania uwagi.
/* Klasa CSS dla tła sekcji */
.bg-nano-grid {
  background-color: var(--teal-900); /* #001F1F */
  background-image: radial-gradient(var(--teal-700) 1.5px, transparent
1.5px);
  background-size: 24px 24px; /* Rozmiar siatki */
  opacity: 1;
}

/* Wariant z pochyleniem izometrycznym (dla sekcji Hero) */
.bg-iso-grid {
  background-color: var(--teal-900);
  background-image:
    linear-gradient(30deg, var(--teal-800) 1px, transparent 1px),
    linear-gradient(150deg, var(--teal-800) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
}

Wzór 2: Floating Cubes (SVG Pattern) Delikatne sześciany o bardzo niskim kryciu (5%),
widoczne tylko na dużych monitorach.
<svg width="60" height="60" viewBox="0 0 60 60"

xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <g fill="#9D4EDD" fill-opacity="0.05"> <path d="M36
34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6
34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
    </g>
  </g>
</svg>

5.5. Instrukcja Optymalizacji i Eksportu

Dla grafik rastrowych (Hero, Headers) wygenerowanych w 3D lub AI, należy zastosować
rygorystyczną optymalizację, aby nie spowolnić ładowania aplikacji (LCP - Largest Contentful
Paint).

1.  Format: Używaj formatu WebP lub AVIF dla przeglądarek wspierających te formaty

(fallback do JPG).

2.  Gradient Transparency: Grafiki "Hero" powinny mieć "wypalony" gradient do koloru tła
(#001F1F) na krawędziach, zamiast używać kanału alfa (przezroczystości), co pozwala
na lepszą kompresję pliku.

3.  Responsywność:

○  Desktop: 2400px (High Quality)
○  Tablet: 1200px
○  Mobile: 600px (Można przyciąć do centralnego elementu 3D).

4.  Dark Mode Only: Te grafiki są specyficzne dla trybu ciemnego. W trybie jasnym

("Porcelanowy Luksus") zaleca się użycie czystej bieli lub bardzo jasnego szarego wzoru,
rezygnując z ciężkich renderów 3D na rzecz lekkości.

