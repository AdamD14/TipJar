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

Zastosowanie dwóch głównych rodzin krojów pisma jest ściśle ustandaryzowane.

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

Ruch i wibracje stanowią integralną część informacji zwrotnej (feedback loop) w TipJar+.
Interakcje te muszą być celowe, precyzyjne i nienachalne.

3.1 Fizyka Animacji i Czasu (Spring Rules & Bezier Curves)

Zabrania się używania transformacji linear dla ruchu obiektów. Wszystkie animacje muszą
wygaszać ułamek sekundy szybciej niż startują. Animacje nie powinny trwać dłużej niż 5
sekund, a miganie obiektów (flashing) więcej niż 3 razy na sekundę jest surowo wzbronione ze
względów dostępności. Użytkownik musi mieć zawsze opcję wyłączenia animacji
(prefers-reduced-motion).

●

--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1). Czas 200ms. Do hoverów i prostych
transformacji stanów.

●

●

--ease-enter: cubic-bezier(0.16, 1, 0.3, 1). Czas 300ms-400ms. Do okien, powiadomień.
Wybuchowy start, miękkie hamowanie.
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275). Czas 400ms. Służy do
przesuwania Toggle Switchy, rysowania Checkmarków oraz wysuwania się elementów
dynamicznych, dając efekt mikrosprężystości. Wymagane użycie z umiarem, by nie
powodować dezorientacji.

3.2 Haptic Feedback Patterns (Wibracje Sprzętowe Mobile)

Haptyka wzmacnia komunikację wizualną, jednak "mniej znaczy więcej" – należy bezwzględnie
unikać powtarzalnego, brzęczącego sprzężenia.

●  Sukces (Success): Krótkie i rosnące w intensywności impulsy (Short and rising intensity

bursts). Wykorzystywane przy wysłaniu napiwku lub zakończeniu konfiguracji.

●  Błąd (Error): Krótkie impulsy o malejącej intensywności (Short and descending intensity

bursts). Stosowane przy błędzie płatności lub zerwaniu sieci.

●  Ostrzeżenie (Warning): Krótkie, płaskie impulsy uderzeniowe (Short and flat intensity

●

bursts).
Interakcja Zwykła (Impact/Tick): Ekstremalnie krótki sygnał (10-20 milisekund) przy
przesuwaniu sliderów (wyczuwalne „tyknięcie” przy każdej zmianie wartości), włączeniu
przełącznika (Toggle) lub rozwinięciu szuflady (Bottom Sheet).

3.3 Dynamic Color Shifts & Parallax

●  Dynamiczne Światło: Kwoty przesyłane w napiwku aktywują zmienność koloru (Color
Shift). Napiwki standardowe podbijają poświatę Złotą. Napiwki uznane za "Whale"
(powyżej określonego limitu) wyzwalają dynamiczną zmianę poświaty interfejsu (Glow) na
Fioletowo-Złotą paletę przy użyciu CSS @keyframes filter: hue-rotate(...).

●  Parallax na Przewijaniu: Podczas przewijania profilu twórcy, tło 3D przemieszcza się z
inną prędkością niż profil, generując iluzję głębi (Depth). Paralaksa wyłączana jest dla
prefers-reduced-motion: reduce.

3.4 Asystent AI (Voice & Interaction Feedback)

●  Aktywacja Głosowa: Asystent, gdy słucha, aktywuje animowany obrys (Animated

Outline) – fale o zmiennej średnicy używające promieni fioletu (#9D4EDD), skalowane do
poziomu głośności z mikrofonu.

4. Architektura Ikonografii (Vector Constraints)

●  ViewBox: 0 0 24 24.
●  Live Area: 20x20px (padding 2px).
●  Grubość Linii: 1.5px (skalowane matematycznie do 1px w wariancie 16px).
●  Kodowanie Koloru: fill="none", stroke="currentColor".

5. Komponenty UI: Specyfikacja Atomowa i

Molekularna

5.1 Przyciski (Primary & Secondary)

●  Primary (Gold): Tło --gold-400, tekst --teal-800. W stanach Active scale(0.98), Hover

--gold-500. Pierścień focusa w odsunięciu 2px w kolorze Fioletu (--purple-300).

●  Secondary (Purple): Tło transparent, obrys 2px --purple-300, tekst --purple-300. Hover

zalewa 10% tła.

●  Floating Action Button (FAB): Wyizolowany okrąg (min. 56x56px) na dole ekranu

(Mobile). z-index: 200. Tło Złote, podwójny cień drop-shadow, używany jako wywoływacz
asystenta AI lub szybkiej akcji wpłaty. Wycofuje się w dół podczas scrollowania w dół,
wraca przy scrollowaniu w górę.

5.2 Formularze (Inputs, Textareas, Search Bars)

●

Inputs: Tło #002B2B, obrys 1px --teal-600. Stan Focus podświetla pole poświatą
neonową Złotą (Box-shadow ring) i unosi Floating Label na górę (scale 0.75).

●  Search Bar z Sugestiami: Input w stylu Glassmorphismu z ikoną Lupy. W trakcie pisania

(onChange), kontener natychmiast wysuwa listę sugestii (Dropdown na z-100) bez
przesuwania ekranu. Zaznaczenie focus podbija lupę na Fioletowo.

●  Separatory / Dividers: Tam gdzie sekcje muszą zostać rozdzielone, wykorzystujemy linię
1px: border-bottom: 1px solid rgba(255,255,255,0.05). Zawsze w kontrze do minimalizmu
– używać rzadko, częściej polegać na 24px/32px światła (gap).

5.3 Checkboxy, Radio i Toggle Switches

●  Checkboxy: Klawiszowy hit area minimum 44px. Stan checked usuwa border, wlewa

czyste --gold-400 i rysuje animowany wektorowy Checkmark (Teal).

●  Toggle Switch: Suwak oparty na --ease-spring. Przy stanie "On", tor wypełnia się
Fioletem --purple-300, dając efekt sprzętowego załączenia (haptic tick w tle).

5.4 Sliders & Wskaźniki Postępu (Progress Indicators)

●  Slidery Wartości (Range Inputs): Linia nieaktywna w --teal-700, aktywny fragment linii
(track) wypełniany na --gold-400. Przycisk suwaka (Thumb) to okrąg 24x24px rzucający
cień. Podczas przesuwania w mobile odczuwalne są mikrowibracje haptyczne (Tick) przy
pełnych wartościach. Pływający Tooltip z aktualną kwotą unosi się bezpośrednio nad
Thumbem.

●  Linear Progress: Sztywny track o wysokości 4-8px, rosnący płynnie z kolorem

Fioletowym (proces) lub Złotym/Zielonym (sukces).

●  Circular Progress: SVG obracające się pod kątem, rysujące swój obwód parametrami

stroke-dasharray.

5.5 Chipy, Tagi i Segmented Controls

●  Chips / Tags: Elementy z zaokrągleniem pigułki (border-radius: 999px).
○  Kategoryzacja: Tło --teal-800, obrys --teal-600, tekst jasny.

○  Status (np. Live, Nowość): Półprzezroczyste tła rgba() zgodne z barwą

semantyczną (np. 15% Czerwieni, tekst czerwony) z małą ikoną pulsującej kropki.

●  Segmented Control: Tabletowy/Mobilny zamiennik tradycyjnych zakładek (Tabs).

Zamknięty w jednym pojemniku z tłem #001F1F. Kliknięcie na aktywny segment przesuwa
podświetlenie (sztywny kafelek #004545) elastycznym, spężystym ruchem na nową
pozycję (transform: translateX()).

5.6 Komponenty Krokowe (Stepper / Wizard)

Wykorzystywane przy Onboardingu. Pasek postępu horyzontalnego. Składa się z węzłów
(kropek). Aktywny węzeł jest Fioletowy z białą ikoną cyfry/ptaszka. Przejście do następnego
etapu rysuje linię łączącą (ease-standard 300ms) i odpala sprzężenie haptyczne (Success
pattern).

6. Organizmy UI: Modale i Szuflady Dolne (Bottom
Sheets)

●  Modal (Desktop): Kontener centralny, szer. max 600px. z-index: 1000. Glassmorficzny

backdrop (blur(4px), opacity 85% teal-900).

●  Bottom Sheet (Szuflada Dolna dla Mobile): Gdy ekran spada poniżej 640px, Modale,

Filtry wyszukiwarki i Opcje udostępniania transformują w szufladę.

○  Wysuwa się od dołu na 85-90% wysokości ekranu.
○  Posiada "Draggable Handle" (Szeroka kresa 4x40px na samej górze).
○  Ruch opiera się na gestach (Swipe-down to dismiss) i kończy twardym oparciem z

haptic bump. Górne rogi narzucają border-radius: 16px, dolne krawędzie przylegają
bez ramki.

7. Interfejsy Danych: Karty, Tabele, Wykresy i
Skeletony

7.1 Karty i Bento Grids

Wykorzystywane układy wieloelementowe (Bento) reagują uniesieniem na najechanie kursora
(Hover Z-axis shift) nakładając złotą mgiełkę na rzutowany cień.

7.2 Paginacja i Infinite Scroll

●  Desktop: Tradycyjna paginacja blokowa pod listami. Pigułki numeryczne w estetyce

Chipów.

●  Mobile: Wymuszenie Load More jako przycisku Złotego na dole lub włączenie

wirtualizowanego (w celu oszczędności RAM) układu Infinite Scroll z rotującym małym
fioletowym Spinnerem na dolnej krawędzi, doładowującym asynchronicznie dane po
przecięciu Viewportu (Intersection Observer).

7.3 Wykresy i Wizualizacja Danych (Charts)

●  Do statystyk zarobków i dashboardu. Odrzucenie topornych wykresów słupkowych na

rzecz Sparklines oraz gładkich wykresów liniowych (Line Charts).

●  Linia wykresu rysowana jako pogrubiony wektor (np. stroke-width: 3px) w gradiencie od

Fioletu do Złota (symbolizacja wzrostu).

●  Obszar pod linią wykorzystuje pionowy zanik (Opacity Gradient) wpadający w tło

#001F1F.

●  Węzły na wykresie pokazują dedykowany Tooltip po najechaniu, precyzujący zarobek z

dnia i godziny.

7.4 Stany Ładowania (Skeleton Loaders)

Zabrania się ukazywania "gołego" pustego interfejsu w trakcie ładowania API.

●  Wykorzystujemy precyzyjne odlewy docelowych komponentów ułożone w

ciemnoszarym/turkusowym odcieniu (#003737).

●  Shimmer Effect: Zamiast prostego zanikania, na klocki nałożony jest wędrujący z lewej
do prawej świetlisty gradient (Teal-700 / #004545), zrealizowany poprzez CSS transform:
translateX() akcelerowany na karcie GPU urządzenia dla maksymalnej wydajności (60
FPS).

8. Moduły Pływające: Dropdowny i Accordiony

●  Dropdown Menu: Służą opcjom konta. Pływają względem elementu aktywującego na
8px dystansu. Absolutnie zakazane jest chowanie się pod tabele (Stacking Context
naprawiony na poziomie portalów React).

●  Accordion (Rozwijane Listy): Stosowane w sekcji FAQ lub przy gęstych Ustawieniach.
Kontener blokowy posiadający strzałkę rotującą o 180st. Rozwijanie ciała akordeonu jest
płynne na wysokości kontenera (bez efektu skoków pikseli). Treść wysuwa się spod
nadrzędnej nagłówkowej pokrywy, dając wrażenie odsłaniania.

9. Stany Puste, Błędy, Utrata Sieci i Powiadomienia

9.1 Empty States (Stany Puste) & Abstrakcyjne 3D

Gdy użytkownik wchodzi do nowej sekcji (Brak Napiwków, Brak Wiadomości, Pusta Historia),
nie może być ona "martwa".

●  Centralny układ ekranu przejmuje ilustracja 3D (Styl Abstract Liquid / 3D Glass) w
barwach ciemnej morskiej zieleni ze złotymi odblaskami światła (np. lewitujący
przeźroczysty słoik bez zawartości lub rozłożone sześciany).

●  Pod ilustracją znajduje się przyjazny komunikat (np. "Twój słoik jest jeszcze pusty")

zdefiniowany IBM Plex Medium 16px.

●  Zawsze musi zawierać Przycisk Primary (CTA) prowadzący użytkownika do wykonania

akcji (np. "Udostępnij link do profilu").

9.2 Strony Błędów 404, 500, Tryb Offline / Maintenance

●  W pełnoekranowych widokach załamania używana jest wielka typografia (np. "404") z

wariantem Mukta Malar ExtraBold. Liczba ta powinna generować subtelną paralaksę przy

ruchu myszką.

●  Komunikat jest przyjazny (No-blame policy). Opcje nawigacji zamykają się do powrotu na

Stronę Główną.

●  Alert Utraty Sieci (Offline Mode): Pasek Sticky zjawiający się przy dolnej krawędzi

(powyżej FAB i nawigacji), z pastelowym, rozbielonym czerwonym tłem i komunikatem
"Jesteś w trybie Offline. Oczekiwanie na sygnał...", aby chronić sesję użytkownika przed
wygaśnięciem.

9.3 Powiadomienia Toast (Snackbars)

Ulotne komunikaty systemowe wypływają z marginesów. Budowane na 12px promieniu,
nakładane w stos. Po 4 sekundach bezczynności wylatują z powrotem. Opcja Swipe-to-dismiss
na mobile. Akcenty barwne (Kropka po lewej stronie Toastu) informacyjne (Cyjan), sukcsu
(Zieleń), błędu (Czerwień).

10. Ekosystem Web3 i Funkcje Transakcyjne

TipJar+ łączy mechanikę Web2 (Karty Płatnicze) z architekturą Web3 w sposób transparentny
dla obu stron ekonomii twórców.

10.1 Stany Połączenia Portfela (Wallet Connect States)

Integracja przebiega gładko, zachowując zaufanie (Wallet Connect / MetaMask).

●  Disconnected: Wyeksponowany przycisk Primary lub Secondary nakazujący połączenie.
●  Connecting: Modal ładowania z animowanym obrysem (Spinner Web3 w barwach Złota i
Fioletu) wymagający zatwierdzenia sprzętowego przez podpis zewnętrznej aplikacji.
●  Connected: Przycisk zmienia się w pigułkę pokazującą skrócony format adresu (np.

0x1A...8Cd) z awatarem wygenerowanym z hasha (Identicon).

●  Wrong Network (Błędna Sieć): Stan krytyczny. Przycisk i obrysy natychmiast zmieniają

barwę na --warning-base (Pomarańcz). System wymusza w modalu zgodę na
przełączenie z sieci nieobsługiwanej (np. Mainnet) na preferowaną sieć warstwy drugiej
(np. Polygon/Arbitrum).

10.2 Biometria, 2FA i Potwierdzenia Transakcji

●  Transakcja Modal + Gas Fee: Każda akcja przesyłu rodzi dedykowane, wysuwane z
dołu okno (lub środek na Desktop). Pokazana jest główna kwota (Złoty font) oraz w
wyraźnym oddzieleniu na Fioletowo opłata sieciowa (Gas Fee estymowana "na żywo" w
odniesieniu do waluty natywnej, przeliczona na odpowiednik Fiat). Użytkownik widzi
całkowity koszt tuż przed wciśnięciem "Potwierdź".

●  2FA / WebAuthn: Elementy autoryzacyjne wykorzystują natywną biometrię urządzenia.
Odpytywanie palcem lub twarzą poprzedza wirtualny odcisk ikony wybijającej skan
świetlny wokół punktu przyłożenia (Haptic Success).

10.3 Śledzenie Statusu Blockchain (Pending, Confirmed, Failed)

Interfejs uwzględnia powolność sieci Blockchain implementując Optimistic UI z Dynamicznym

Statusem:

●  Pending (Oczekująca): Natychmiast po wysłaniu pojawia się rekord w Historii z

migającym (pulse) ikonoklastem zegara. W tle działa spinner.

●  Confirmed (Potwierdzona): Zegar przekształca się błyskawicznie w złoty/zielony

Checkmark. Zjawisku towarzyszy dyskretny haptic tick.

●  Failed (Odrzucona): Ikona staje się czerwoną "X". Poniżej transakcji rozwija się drobny

font z przyciskiem "Spróbuj ponownie".

10.4 NFT Gallery i Claim Flow (Dowód Wsparcia)

Po udanym napiwku użytkownik nabywa prawo do mincingu NFT (Proof of Support).

●  Claim Flow: Ekran Sukcesu zamienia się w "Claim Modal". Na ekranie powoli renderuje

się animowany szkielet wybijanego tokenu, uderzając po paru sekundach finalną bryłą 3D
na gradientowym złotym tle, oddając blask za sprawą CSS glow-effects.

●  Galeria NFT: Osobna zakładka u Twórców lub Wspierających w widoku kafelkowym.
Karty rzucające głębokie cienie, posiadające parametr "Rarity" (Rzadkość) oznaczany
kolorowym chipem na krawędzi grafiki. Odpalenie galerii wprowadza zjawisko paralksy
(kart lekko zmieniają perspektywę wraz z ruchami myszki na komputerze).

11. Makro-Struktury i Główne Widoki Aplikacji

Spójne połącznie elementów buduje skomplikowane ramy głównych przepływów.

11.1 Pełny Onboarding Flow (Proces Wdrażania)

Wielokrokowy kreator (Wizard) bez wyjść (Focus mode). U góry horyzontalny Stepper. Każdy
etap to szklana tafla (Glassmorphism Modal) prosząca o pojedyncze dane (Imię, Wybór Metody
Płatności, Bio). Animacje przesuwające plansze od lewej do prawej na osi X maskują
wczytywanie kolejnych ekranów.

11.2 Dashboard Analityczny i Wypłaty (Payout Flow)

●  Analytics Dashboard: Operuje systemem Widgetów Bento Grid. Każdy kafel ładuje

niezależnie swoje statystyki w CSS Skeletonach. Wyróżnienie "Wizytówki Dnia" (Gross
Earnings) ujęte w dużą czcionkę 4rem Złota. Wykresy renderują się z opóźnieniem do
300ms po otwarciu ekranu (Waterfall loading effect).

●  Payout Flow: System 2-krokowy. Krok 1 to widok zablokowanego suwaka (Wybór %
środków do wypłaty z balansu). Krok 2 to wybór "Gdzie" (Konto FIAT, Krypto Portfel)
pokazujące od razu przybliżony czas księgowania i fee systemowe. Finalna akcja
zabezpieczona jest biometrycznie, lub hasłem przy logice 2FA.

11.3 Ustawienia (Settings) i Referral (Zaproszenia)

●  Settings: Ujęcie listy akordeonów w panelach bocznych lub system dwukolumnowy na
tablet/desktop (Lewa kolumna – Nawigacja, Prawa – Opcje form). Posiada przełączniki
(Toggle Switch) preferencji widoczności salda dla publiki i konfiguracji walut.

●  Referral: Ekran wykorzystujący grywalizację. Posiada duży element QR kodu możliwego

do zapisu oraz skrócony Input z linkiem i absolutnie ogromnym, fioletowym guzikiem
"Kopiuj" wydającym haptic success i toast confirm oznaczający skopiowanie do schowka.

