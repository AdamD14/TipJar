Master Plan Architektury UI/UX TipJar+:
Specyfikacja Implementacyjna 2026

1. Globalna Architektura Zmiennych Kolorystycznych i
Fundamenty Systemu

System projektowy opiera się na bezwzględnych, matematycznie zdefiniowanych skalach
kolorystycznych, które funkcjonują jako jedyne źródło prawdy dla wszystkich komponentów
interfejsu. Przejścia między kontekstem porannym (Light Mode) a wieczornym (Dark Mode)
realizowane są poprzez systemową podmianę tokenów kolorystycznych przypisanych do
konkretnych zmiennych środowiskowych.

1.1 Skale Prymitywne (Primitive Tokens)

Poniższa struktura definiuje bezwzględne wartości dla 10-stopniowej skali każdego koloru
bazowego, niezbędne do precyzyjnej manipulacji interfejsem.
Skala Ciemnego Turkusu (Primary Teal Base):

●
●
●
●
●
●
●
●
●
●

--teal-50: HEX #E0F2F2, RGB 224, 242, 242, HSL 180°, 40%, 95%
--teal-100: HEX #B3D9D9, RGB 179, 217, 217, HSL 180°, 35%, 78%
--teal-200: HEX #80BFBF, RGB 128, 191, 191, HSL 180°, 38%, 62%
--teal-300: HEX #4DA6A6, RGB 77, 166, 166, HSL 180°, 38%, 48%
--teal-400: HEX #268C8C, RGB 38, 140, 140, HSL 180°, 57%, 35%
--teal-500: HEX #007373, RGB 0, 115, 115, HSL 180°, 100%, 22%
--teal-600: HEX #005959, RGB 0, 89, 89, HSL 180°, 100%, 17%
--teal-700: HEX #004545, RGB 0, 69, 69, HSL 180°, 100%, 14%
--teal-800: HEX #003737, RGB 0, 55, 55, HSL 180°, 100%, 11% (Baza wieczorna)
--teal-900: HEX #001F1F, RGB 0, 31, 31, HSL 180°, 100%, 6% (Tło globalne)

Skala Złota (Primary Action Gold):

●
●
●
●
●
●
●

--gold-100: HEX #FFF9C4, RGB 255, 249, 196, HSL 54°, 100%, 88%
--gold-200: HEX #FFF176, RGB 255, 241, 118, HSL 54°, 100%, 73%
--gold-300: HEX #FFEA00, RGB 255, 234, 0, HSL 55°, 100%, 50%
--gold-400: HEX #FFD700, RGB 255, 215, 0, HSL 51°, 100%, 50% (Akcent główny)
--gold-500: HEX #FFC107, RGB 255, 193, 7, HSL 45°, 100%, 51%
--gold-600: HEX #FFAB00, RGB 255, 171, 0, HSL 36°, 100%, 50%
--gold-700: HEX #FF8F00, RGB 255, 143, 0, HSL 36°, 100%, 50%

Skala Fioletu (Secondary Accent Purple):

●
●
●

●
●

--purple-100: HEX #E0B3FF, RGB 224, 179, 255, HSL 275°, 100%, 85%
--purple-200: HEX #C27AFF, RGB 194, 122, 255, HSL 272°, 100%, 74%
--purple-300: HEX #9D4EDD, RGB 157, 78, 221, HSL 273°, 64%, 59% (Akcent
pomocniczy)
--purple-400: HEX #7B2CBF, RGB 123, 44, 191, HSL 272°, 63%, 46%
--purple-500: HEX #5A189A, RGB 90, 24, 154, HSL 271°, 73%, 35%

Paleta Stanów Walidacji (Semantic Colors):

●
●
●
●
●
●
●
●

--error-light: #FFB4AB (Czerwień dla trybu wieczornego)
--error-base: #FF5252 (Czerwień dla trybu porannego)
--error-dark: #3D1010 (Tło błędów)
--success-light: #69F0AE (Zieleń dla trybu wieczornego)
--success-base: #00E676 (Zieleń dla trybu porannego)
--success-dark: #004D26 (Tło sukcesu)
--warning-base: #FF9100 (Pomarańcz)
--info-base: #66D9E8 (Cyjan informacyjny).

1.2 Matryca Mapowania Oświetlenia (Morning/Evening Adaptation)

Token Semantyczny

Kontekst Poranny
(Light Mode)
#F2F7F7 (teal-50 mod) #001F1F (teal-900)
--bg-app-global
#003737 (teal-800)
--bg-surface-base
#FFFFFF
#004545 (teal-700)
--bg-surface-elevated  #FFFFFF

Kontekst Wieczorny
(Dark Mode)

--bg-surface-modal

#FFFFFF

#003737 (teal-800)

--text-primary

#003737 (teal-800)

#FFFFFF

--text-secondary

#005959 (teal-600)

#D6EBEB (tint 85%)

--text-tertiary

#80BFBF (teal-200)

--border-subtle

#B3D9D9 (teal-100)

#5C7A7A (zgaszony
teal)
#004545 (teal-700)

Zastosowanie UI

Tło tagu <body>
Tła kart, dropdownów
Tła elementów hover,
aktywne rzędy
Kontenery okien
modalnych
Nagłówki, główne
wartości liczbowe
Tekst paragrafowy,
etykiety
Placeholdery, dane
nieaktywne
Obrysy kart, ramki
inputów

--border-focus

#7B2CBF (purple-400)  #9D4EDD (purple-300)  Pierścień nawigacji

--action-primary-bg
--action-primary-text

#003737 (teal-800)
#FFD700 (gold-400)

klawiaturowej

#FFD700 (gold-400)  Główne przyciski CTA
#003737 (teal-800)

Tekst na głównych
przyciskach

--action-secondary-bg  #7B2CBF (purple-400)  #9D4EDD (purple-300)  Przyciski drugorzędne
1.3 Dostępność (WCAG 2.2) i Breakpointy Responsywne

●  Kontrast Minimalny: Każdy tekst musi spełniać stosunek minimum 4.5:1 względem tła.

Zabrrania się stosowania białego tekstu na złotym tle (Critical Fail).

●  Cele Dotykowe (Touch Targets): Minimalny wymiar każdego klikalnego elementu

interfejsu to 44x44px, niezależnie od wizualnego rozmiaru obiektu (realizowane przez
padding lub pseudoelementy ::after).

●  Breakpointy (Mobile-First):

○  xs: 320px (Mikro urządzenia).
○  sm: 640px (Smartfony, punkt przejścia modali w Bottom Sheets).
○  md: 768px (Tablety).
○
○  xl: 1280px (Duży Desktop).

lg: 1024px (Standardowy Desktop, włączenie bocznej nawigacji na stałe).

●  Safe Areas (Notch & Home Indicator): Aplikacja natywnie obsługuje strefy bezpieczne

poprzez CSS env: padding-top: env(safe-area-inset-top); oraz padding-bottom: calc(16px
+ env(safe-area-inset-bottom));.

1.4 System Glassmorphismu (Liquid Glass)

Rozmycia stosowane w interfejsie opierają się na zaawansowanym łączeniu właściwości CSS,
zapewniając głębię bez utraty czytelności.

●  Overlay Bazowy: background-color: rgba(0, 31, 31, 0.44) (Turkus 900 z 44% opacity).
●  Filtr Rozmycia: backdrop-filter: blur(20px) saturate(200%). Saturacja podbita do 200%

gwarantuje, że kolory z tła (szczególnie złoto i fiolet) zyskują neonowy wyraz.
●  Border Odcinający (Cut-line): border: 1px solid rgba(255, 255, 255, 0.125) dla

subtelnego zarysowania ramy na ciemnym tle.

2. Architektura Typograficzna i Skład Tekstu

2.1 Konfiguracja Krojów Pisma

●  Font Podstawowy: Mukta Malar, sans-serif (Wagi: 400, 500, 600, 700). Używany w

nagłówkach i przyciskach.

●  Font Techniczny: IBM Plex Sans, sans-serif (Wagi: 300, 400, 500, 600). Używany w

body i tabelach.

●  Wymuszenie Sprzętowe dla Danych: font-feature-settings: "tnum" wymuszone na

kwotach dla tabular figures.

2.2 Matryca Płynnego Skalowania (Fluid Typography Clamp)

●
●
●
●

--fs-display: clamp(2.5rem, 4vw + 1.5rem, 4rem) (Mukta 700)
--fs-h1: clamp(2rem, 1.5vw + 1.6rem, 2.5rem) (Mukta 600)
--fs-body-m: 1rem / 16px (IBM Plex 400)
--fs-caption: 0.75rem / 12px (IBM Plex 500)

3. Motion Design, Haptyka i Dynamika Przestrzenna

3.1 Fizyka Animacji i Czasu (Spring Rules & Bezier Curves)

Zabrania się używania transformacji linear dla ruchu obiektów. Użytkownik musi mieć zawsze
opcję wyłączenia animacji (prefers-reduced-motion).

●
●
●

--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1). Czas 200ms. Do hoverów.
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1). Czas 300ms-400ms. Do okien, powiadomień.
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275). Czas 400ms. Do przełączników i
FAB.

3.2 Haptic Feedback Patterns (Wibracje Sprzętowe Mobile)

●  Sukces (Success): Krótkie i rosnące w intensywności impulsy.
●  Błąd (Error): Krótkie impulsy o malejącej intensywności.
●  Ostrzeżenie (Warning): Krótkie, płaskie impulsy uderzeniowe.

●

Interakcja Zwykła (Impact/Tick): Ekstremalnie krótki sygnał (10-20 milisekund) przy
suwakach i toggle.

3.3 Dynamic Color Shifts & Parallax

●  Dynamiczne Światło: Napiwki uznane za "Whale" wyzwalają dynamiczną zmianę

poświaty interfejsu (Glow) na Fioletowo-Złotą paletę przy użyciu CSS @keyframes filter:
hue-rotate(...).

●  Parallax na Przewijaniu: Podczas przewijania profilu twórcy, tło 3D przemieszcza się

generując iluzję głębi (Depth).

4. Architektura Ikonografii (Vector Constraints)

●  ViewBox: 0 0 24 24.
●  Live Area: 20x20px (padding 2px).
●  Grubość Linii: 1.5px (skalowane matematycznie do 1px w wariancie 16px).
●  Kodowanie Koloru: fill="none", stroke="currentColor".

5. Kompletny Rejestr i Specyfikacja Komponentów UI

Aby zapewnić pełną integralność systemu w 2026 roku, zdefiniowaliśmy ścisłą taksonomię
wszystkich dozwolonych komponentów. Wszelkie wdrożenia muszą opierać się na poniższej
specyfikacji.

5.1 Katalog Komponentów (Checklista Systemowa)

●  Atomy / Podstawowe
○  Przyciski Primary
○  Przyciski Secondary
○  Floating Action Button (FAB)
○  Awatary (Avatars)
●  Formularze i Kontrolki
○
Inputs
○  Textareas
○  Search Bars
○  Checkboxy
○  Radio Buttons
○  Toggle Switches
○  Sliders (Range Inputs)
○  Progress Indicators (Linear Progress + Circular Progress)
○  Chipy / Tags
○  Segmented Controls
○  Stepper / Wizard
○  Separatory i Dividers (Full-bleed, Inset, Vertical)

●  Nawigacja i Hierarchia

○  Okruszki (Breadcrumbs)
○  Paski Nawigacji (Sidebar / Bottom App Bar)

●  Organizmy – Modale i Overlays
○  Modal Klasyczny (Desktop)
○  Bottom Sheet

●  Wyświetlanie Danych

○  Karty (Cards)
○  Bento Grids
○  Wykresy (Charts)
○  Skeleton Loaders
○  Paginacja
○

Infinite Scroll
●  Pływające Moduły

○  Dropdown Menu
○  Accordion
○  Tooltipy i Popovery (Dymki)

●  Stany i Feedback

○  Empty States
○  Strony Błędów (404, 500)
○  Tryb Offline / Maintenance
○  Toast / Snackbars

●  Web3 Komponenty

○  Wallet Connect States
○  Transakcja Modal + Gas Fee
○  Dynamiczne Statusy Transakcji (Pending, Confirmed, Failed)
○  NFT Gallery
○  Claim Flow

●  Makro Struktury / Widoki

○  Onboarding Flow
○  Dashboard Analityczny
○  Payout Flow
○  Ustawienia (Settings)
○  Referral

5.2 Przyciski (Primary & Secondary)

●  Primary (Gold): Tło --gold-400, tekst --teal-800. W stanach Active scale(0.98), Hover

--gold-500. Pierścień focusa w odsunięciu 2px w kolorze Fioletu (--purple-300).

●  Secondary (Purple): Tło transparent, obrys 2px --purple-300, tekst --purple-300. Hover

zalewa 10% tła.

5.3 Floating Action Button (FAB)

Główny punkt akcji, pływający nad interfejsem, przeznaczony do wywoływania Asystenta AI,
szybkiej wpłaty lub dodawania treści.

●  Wymiary: Kontener 56x56px w kształcie koła (border-radius: 50%). Na desktopie
ewoluuje w wariant Extended FAB z etykietą tekstową (border-radius: 999px).

●  Z-index i Stacking Context: Aby zapobiec zakrywaniu FAB przez inne obiekty, otrzymuje

on twarde z-index: 200.

●  Reguły zachowania na Scroll: Przewijanie w dół (ukrycie) opuszcza przycisk

translateY(150%) scale(0.9). Przewijanie w górę (powrót) przywraca go do translateY(0)
korzystając ze spężystej krzywej --ease-spring.

5.4 Awatary (Avatars)

Awatary to komponenty służące do wizualnej identyfikacji twórców i użytkowników.

●  Proporcje: Muszą zachowywać sztywny stosunek wymiarów 1:1, aby uniknąć

jakichkolwiek zniekształceń w renderowaniu.

●  Geometria: Typowy awatar dla użytkownika korzysta ze wskaźnika zaokrąglenia brzegów

radius.full wyliczonego matematycznie na 999px dla zapewnienia formy idealnego
okręgu. Przy kwadratowych wariantach grupowych dla projektów i odznak (NFT) używa
się zaokrąglenia 12px-16px zdefiniowanego w parametrze wielkości nadrzędnej formy.

5.5 Formularze (Inputs, Textareas, Search Bars)

●

Inputs (Standard): Tło #002B2B, obrys 1px --teal-600. Stan Focus podświetla pole
poświatą neonową Złotą i unosi Floating Label na górę (scale 0.75).

●  Pasek Wyszukiwania i Sugestie: W trakcie odpytywania API (debounce 300ms po

wpisaniu tekstu), ikona Lupy zanika na rzecz obracającego się mikroskopijnego Spinnera.

5.6 Checkboxy, Radio i Toggle Switches

●  Checkboxy: Klawiszowy hit area minimum 44px. Stan checked usuwa border, wlewa

czyste --gold-400 i rysuje animowany wektorowy Checkmark (Teal).

●  Toggle Switch: Suwak oparty na --ease-spring. Przy stanie "On", tor wypełnia się

Fioletem --purple-300, dając efekt sprzętowego załączenia.

5.7 Sliders & Wskaźniki Postępu

●  Slidery Wartości: Aktywny fragment linii wypełniany na --gold-400. Przycisk suwaka to

okrąg 24x24px.

●  Linear Progress: Sztywny track o wysokości 4-8px. Circular Progress: SVG obracające

się pod kątem.

5.8 Chipy, Tagi i Segmented Controls

●  Chips / Tags: Zaokrąglenie pigułki (border-radius: 999px). Statusy posiadają

półprzezroczyste tła rgba().

●  Segmented Control: Tabletowy/Mobilny zamiennik zakładek (Tabs). Kliknięcie przesuwa

sztywne tło podświetlenia aktywnym suwakiem.

5.9 Komponenty Krokowe (Stepper / Wizard)

Wykorzystywane przy Onboardingu jako pasek postępu horyzontalnego. Przejście do
następnego etapu rysuje linię łączącą i odpala sprzężenie haptyczne.

5.10 Separatory i Linie Podziału (Dividers)

Grubość zawsze 1px. Kolor domyślny to --border-subtle lub półprzezroczyste rgba(255, 255,
255, 0.05).

●  Full-bleed: Od krawędzi do krawędzi (separacja głównych bloków).
●

Inset: Linia wcięta o 16px lub 24px (zrównana do tekstu, pomija obszar awatarów na
listach kontaktów).

●  Vertical: Oddzielenie pionowe w paskach nawigacji.

6. Moduły Nawigacyjne i Pływające

Zarządzanie uwagą w interfejsie wymusza korzystanie z elementów, które nadbudowują się na
Z-osi.

6.1 Dropdowny i Accordiony

●  Dropdown Menu: Pływają względem elementu aktywującego na 8px dystansu w z-index:

1000. Cienie radialne definiują krawędź ucieczki interfejsu.

●  Accordion (Rozwijane Listy): Stosowane w sekcjach Ustawień. Płynnie rozwijają

zawartość wyznaczając wysokość pod maską.

6.2 Okruszki (Breadcrumbs)

Narzędzie nawigacyjne pomagające użytkownikowi w powrocie po drzewie hierarchii strony.

●  Geometria i Pozycja: Osadzane horyzontalnie, zawsze wyrównane do lewej krawędzi u

góry strony.

●  Separatory: Pomiędzy każdym pojedynczym adresem na mapie przejść wstawiana jest

ikona typu chevron (zazwyczaj skręcona w prawo), oznaczająca głębokość sekcji.

6.3 Tooltipy (Dymki) i Popovery

Służą ukryciu nadmiaru interfejsu zgodnie z zasadą progresywnego ujawniania.

●  Wariant Podstawowy (Plain): Zwykłe, ascetyczne czarne tło i opis dla pojedynczych
ikon. Znikają całkowicie po zadanym, 1.5-sekundowym opóźnieniu w momencie braku
interakcji lub utraty wskaźnika.

●  Wariant Zaawansowany (Rich Persistent): Większy komponent dla złożonych opcji

wewnątrz ekranu, reagujący nie na hover, ale na trwałe kliknięcie w interfejs, utrzymując
się na krawędzi bez natychmiastowego zamknięcia. Posiada wstrzyknięty gigantyczny
z-index: 1500 i ucieka z obostrzeń obcinających dzięki zastosowaniu bibliotek
kalkulujących zderzenia na krawędzi ekranu.

7. Organizmy UI: Modale i Szuflady Dolne (Bottom
Sheets)

●  Modal (Desktop): Kontener centralny, szer. max 600px. Glassmorficzny backdrop

(blur(4px), opacity 85% --teal-900).

●  Bottom Sheet (Szuflada Dolna): Gdy ekran spada poniżej 640px, Modale i filtry
wyszukiwarki transformują w szufladę na 85-90% wysokości z uchwytem dającym

możliwość ściągnięcia gestem (Swipe-down to dismiss). Odpala Haptic Bump przy
zderzeniu z krawędzią ekranu.

8. Interfejsy Danych: Karty, Tabele, Wykresy i
Skeletony

●  Karty i Bento Grids: Układy wieloelementowe reagują uniesieniem na najechanie

kursora z zachowaniem poświaty.

●  Paginacja i Infinite Scroll: Wymuszenie Virtualized Scroll na smartfonach oszczędza

zasoby, zastępowane tradycyjną numeryczną listą chipów na desktopie.

●  Wykresy i Wizualizacje: Sparklines z 3px wektorem o złotym gradiencie z zanikającym

obszarem maski u dołu. Węzły posiadają portalowe tooltipy o wysokim Z-index.

●  Stany Ładowania (Skeleton Loaders): Ciemnoszare obrysy .skeleton-card, nakładające

jasny turkusowy (#004545) efekt Shimmer Effect przesuwany przez matrycę GPU.

9. Stany Puste, Błędy, Utrata Sieci i Powiadomienia

●  Empty States: Przestrzenie domyślne pozbawione danych zapełnione są Abstrakcyjnym

modelem szkła i cieczy z towarzyszącym Przyciskiem Akcji.

●  Strony Błędów i Maintenance: Gigantyczna czcionka, bezstresowy komunikat,
wibrujące paralaktyczne tło. Utrata sieci aktywuje dolny czerwony Sticky Bar.

●  Powiadomienia Toast (Snackbars): Wylatują po zaangażowaniu API, stosują rygor
czasowy znikając na powrót do uśpienia po 4 sekundach (chyba że najazd kursor
zatrzyma licznik). Swipe-to-dismiss na urządzeniu dotykowym.

10. Ekosystem Web3 i Funkcje Transakcyjne

●  Wallet Connect States: Przyciski integrują w sobie spinner oczekiwania, na koniec

wymuszając stan potwierdzenia w postaci chipa ze skróconym Hexem adresu i awatarem
identiconu.

●  Transakcje i Opłaty: Podział wartości Fiat na Złoty krój oraz kosztów gazu na Fioletowy

odcień dla wyraźnej bariery semantycznej. Używana autoryzacja 2FA.

●  Statusy: Pending, Confirmed, Failed: Asynchroniczna operacja wywołuje migającego

cyjanowego zegara, który następnie pęka na czysty i pewny Złoty Checkmark sprzęgnięty
z wibracyjnym ticknięciem sukcesu na ekranie telefonu.

●  NFT i Claim Flow: Konwersja transakcji generuje po sukcesie NFT udostępniane na
wizytówkach o specyficznym odcięciu w gradiencie oznaczającym rzadkość wybitą w
bloku.

11. Makro-Struktury i Główne Widoki Aplikacji

●  Onboarding: Wielokrokowy modal z użyciem sztywnej ramki, wykorzystujący pasek

krokowy od lewej do prawej i całkowite ukrycie okien zewnętrznych nawigacji w "Trybie
Focusu".

●  Dashboard Analityczny: Przepływy zamknięte w macierzy Bento, podrzucające z
asynchronicznych requestów wyniki w dedykowanych kaflach opartych o waterfall.

●  Payout Flow: System dwukrokowy o blokowanym torze dla wypłat zabezpieczonym

uwierzytelnieniem.

●  Settings i Referral: Ujęcia podzielone dwukolumnowo. Panel zaproszeń po kliknięciu

wywołuje gigantyczną wibrację potwierdzającą wstrzyknięcie adresu ref w podręczny
schowek.

12. Globalna Deklaracja Design Tokens (Zmienne CSS)

:root {
  /* ====================================================
     FUNDAMENT: SKALE PRYMITYWNE (DARK MODE BASE)
     ==================================================== */
  /* Primary Teal (Ocean Base) */
  --teal-50: #E0F2F2;
  --teal-100: #B3D9D9;
  --teal-200: #80BFBF;
  --teal-300: #4DA6A6;
  --teal-400: #268C8C;
  --teal-500: #007373;
  --teal-600: #005959;
  --teal-700: #004545; /* Obrysy kart, ramki border */
  --teal-800: #003737; /* Powierzchnie domyślne kart (Surface) */
  --teal-900: #001F1F; /* Główny background globalny */

  /* Primary Action Gold */
  --gold-100: #FFF9C4;
  --gold-200: #FFF176;
  --gold-300: #FFEA00;
  --gold-400: #FFD700; /* Główne Akcenty (Przyciski, Kwoty) */
  --gold-500: #FFC107;
  --gold-600: #FFAB00;
  --gold-700: #FF8F00;

  /* Secondary Accent Purple (Tech/Web3) */
  --purple-100: #E0B3FF;
  --purple-200: #C27AFF;
  --purple-300: #9D4EDD; /* Akcenty nawigacji, focus pierścienie */
  --purple-400: #7B2CBF;
  --purple-500: #5A189A;

  /* ====================================================
     PALETA WALIDACYJNA (SEMANTYKA STANÓW)
     ==================================================== */
  --error-light: #FFB4AB;   /* Błędy na czarnym tle */
  --error-base: #FF5252;
  --error-dark: #3D1010;
  --success-light: #69F0AE; /* Sukces na czarnym tle */

  --success-base: #00E676;
  --success-dark: #004D26;
  --warning-base: #FF9100;
  --info-base: #66D9E8;     /* Toast info, pending status */

  /* ====================================================
     ABSTRAKCJA WARSTWOWA (SURFACES & TEXTS)
     ==================================================== */
  --bg-app-global: var(--teal-900);
  --bg-surface-base: var(--teal-800);
  --bg-surface-elevated: var(--teal-700);
  --bg-surface-modal: var(--teal-800);

  --text-primary: #FFFFFF;
  --text-secondary: #D6EBEB; /* Tint 85% */
  --text-tertiary: #5C7A7A;  /* Dla disabled/placeholder */

  --border-subtle: var(--teal-700);
  --border-focus: var(--purple-300);

  /* Akcje bezwzględne */
  --action-primary-bg: var(--gold-400);
  --action-primary-text: var(--teal-800);
  --action-secondary-bg: var(--purple-300);

  /* ====================================================
     MATRYCA TYPOGRAFII (FLUID CLAMPS)
     ==================================================== */
  --font-heading: 'Mukta Malar', sans-serif;
  --font-body: 'IBM Plex Sans', sans-serif;

  --fs-display: clamp(2.5rem, 4vw + 1.5rem, 4rem);
  --fs-h1: clamp(2rem, 1.5vw + 1.6rem, 2.5rem);
  --fs-h2: clamp(1.75rem, 1vw + 1.5rem, 2rem);
  --fs-h3: clamp(1.5rem, 0.5vw + 1.3rem, 1.75rem);
  --fs-h4: clamp(1.25rem, 0.4vw + 1.15rem, 1.5rem);
  --fs-body-l: 1.125rem;
  --fs-body-m: 1rem;
  --fs-body-s: 0.875rem;
  --fs-caption: 0.75rem;

  --fs-button: 1rem;

  /* ====================================================
     SYSTEM Z-INDEXOWANIA
     ==================================================== */
  --z-base: 0;
  --z-elevated: 10;

  --z-dropdown: 100;
  --z-fab: 200;
  --z-backdrop: 500;
  --z-modal: 1000;
  --z-tooltip: 1500;
  --z-toast: 9999;

  /* ====================================================
     CIENIE I ROZMYCIA (ELEVATION & GLASS)
     ==================================================== */
  --shadow-1: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  --shadow-2: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px
rgba(255, 255, 255, 0.05);
  --shadow-3: 0 20px 25px 5px rgba(0, 0, 0, 0.6), 0 0 10px rgba(252,
194, 1, 0.1);
  --shadow-modal: 0 24px 48px -12px rgba(0, 0, 0, 0.7);
  --shadow-inset: inset 0 1px 2px rgba(0, 0, 0, 0.2);

  --glass-overlay: rgba(0, 31, 31, 0.44);
  --glass-blur: blur(20px) saturate(200%);
  --glass-border: 1px solid rgba(255, 255, 255, 0.125);

  /* ====================================================
     FIZYKA ANIMACJI (BEZIER CURVES)
     ==================================================== */
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

