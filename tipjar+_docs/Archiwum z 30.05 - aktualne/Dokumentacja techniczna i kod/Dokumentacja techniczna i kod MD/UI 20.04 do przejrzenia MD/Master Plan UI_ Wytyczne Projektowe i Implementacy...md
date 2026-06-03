Master Plan Architektury UI/UX TipJar+:
Specyfikacja Implementacyjna 2026

1. Globalna Architektura Zmiennych Kolorystycznych i
Oświetlenia Otoczenia

System projektowy opiera się na bezwzględnych, matematycznie zdefiniowanych skalach
kolorystycznych, które funkcjonują jako jedyne źródło prawdy dla wszystkich komponentów
interfejsu. Przejścia między kontekstem porannym (Light Mode) a wieczornym (Dark Mode)
realizowane są poprzez systemową podmianę tokenów kolorystycznych przypisanych do
konkretnych zmiennych środowiskowych. Wszelkie wartości muszą być zaimplementowane jako
natywne zmienne CSS (Custom Properties).

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

System definiuje sztywne przypisanie kolorów komponentów w zależności od cyklu dobowego
interfejsu. Poniższa tabela stanowi ostateczną wytyczną dla wartości zmiennych
środowiskowych.
Token Semantyczny

Zastosowanie UI

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
2. Architektura Typograficzna i Skład Tekstu

Zastosowanie dwóch głównych rodzin krojów pisma jest ściśle ustandaryzowane. Jakiekolwiek
odstępstwa od poniższej specyfikacji są zabronione.

2.1 Konfiguracja Krojów Pisma

●  Font Podstawowy (Nagłówki, Przyciski, Zakładki UI): Mukta Malar, sans-serif.

Używane wagi to Regular (400), Medium (500), SemiBold (600), Bold (700). Właściwość

-webkit-font-smoothing: antialiased jest wymuszona globalnie dla tego kroju.

●  Font Techniczny (Body, Etykiety Formularzy, Tabele, Wartości Finansowe): IBM Plex
Sans, sans-serif. Używane wagi to Light (300), Regular (400), Medium (500), SemiBold
(600).

●  Wymuszenie Sprzętowe dla Danych: Każdy element <td>, każdy span wyświetlający

kwotę, oraz każda lista transakcji musi posiadać właściwość font-feature-settings: "tnum",
aby zapewnić stałą szerokość cyfr (tabular figures).

2.2 Matryca Płynnego Skalowania (Fluid Typography Clamp)

Wymiary czcionek nie korzystają ze sztywnych zapytań medialnych (media queries). Zamiast
tego zdefiniowane są funkcje matematyczne clamp(), obliczane na bieżąco przez silnik
przeglądarki. Wartość bazowa to 1rem = 16px.
Krój Pisma  Waga
Token

Tracking

Interlinia

Element

--fs-display

.hero

Mukta Malar  Bold (700)

--fs-h1

h1

Mukta Malar  SemiBold

(600)

--fs-h2

h2

Mukta Malar  Medium

(500)

--fs-h3

h3

Mukta Malar  Medium

(500)

--fs-h4

h4

Mukta Malar  Regular

(400)

Reguła CSS
clamp()
clamp(2.5re
m, 4vw +
1.5rem,
4rem)
clamp(2rem,
1.5vw +
1.6rem,
2.5rem)
clamp(1.75re
m, 1vw +
1.5rem,
2rem)
clamp(1.5re
m, 0.5vw +
1.3rem,
1.75rem)
clamp(1.25re
m, 0.4vw +
1.15rem,
1.5rem)

1.1

-0.02em

1.2

-0.01em

1.25

1.3

0

0

1.4

0.01em

1.6

0.01em

Light (300)  1.125rem

--fs-body-l

p.lead

--fs-body-m  p, span

--fs-body-s

small

--fs-caption

.caption

--fs-button

.btn

IBM Plex
Sans
IBM Plex
Sans
IBM Plex
Sans
IBM Plex
Sans
Mukta Malar  SemiBold

Regular
(400)
Regular
(400)
Medium
(500)

(18px)
1rem (16px)  1.5

1.4

0.875rem
(14px)
0.75rem
(12px)
1rem (16px)  1.0

1.2

0

0.01em

0.02em

0.04em

3. Siatka Przestrzenna, Elewacja i Dynamika (Z-Axis &

(600)

Motion)

Konstrukcja warstwowa opiera się na precyzyjnie wymierzonych wartościach cieni i rozmycia,
tworzących zjawisko głębi w interfejsie.

3.1 Indeksacja Warstw (Z-Index Engine)

●  z-0: Baza (Tło, tekst, statyczne komponenty w przepływie dokumentu).
●  z-10: Elementy uniesione (Karty na hover, nagłówki sticky position: sticky).
●  z-100: Elementy rozwijane (Dropdowny menu, wyniki wyszukiwania, comboboxy).
●  z-200: Pływające elementy UI (FAB - Floating Action Button, przyklejone paski dolne).
●  z-500: Warstwa przyciemniająca tło (Backdrop) dla okien modalnych i bocznych szuflad.
●  z-1000: Kontenery okien modalnych i okien dialogowych.
●  z-1500: Pływające panele kontekstowe (Popovery, zaawansowane Tooltipy -

implementowane przez React Portals podłączone do <body>).

●  z-9999: Powiadomienia systemowe, Toasty sukcesu i błędu, alerty o utracie sieci.

3.2 System Cieniowania (Elevation Shadows) i Rozmycia (Blur)

Ze względu na głęboki turkus w trybie wieczornym, cienie rzucane (drop-shadows) wykorzystują
intensywne wartości rgba, aby zaznaczyć fizyczną obecność elementu. Tło aplikacji ulega
przyciemnieniu pod wpływem parametrów warstwy.

●  Elevation 1 (Karty, statyczne Inputy): box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5)
●  Elevation 2 (Karty Hover, menu Dropdown): box-shadow: 0 10px 25px -5px rgba(0, 0,

0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.05)

●  Elevation 3 (Karta Aktywna/Focus, Floating Action Button): box-shadow: 0 20px 25px
5px rgba(0, 0, 0, 0.6), 0 0 10px rgba(252, 194, 1, 0.1). (Złota poświata implementowana
na krawędzi dyfuzyjnej).

●  Elevation Modal (Okna dialogowe): box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.7)
●  Wewnętrzny Cień (Input inset): box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2)

Właściwość backdrop-filter: blur(...) definiuje stopień interakcji z tłem:

●  Modale (Backdoor blur): Zastosowanie tła rgba(0, 31, 31, 0.85) z filtrem backdrop-filter:

blur(4px). Tło delikatnie się przyciemnia i rozmywa.

●  Pływający Header (Sticky Header): Zastosowanie rgba(0, 31, 31, 0.8) z filtrem

backdrop-filter: blur(20px) saturate(180%). Nasycenie tła pod spodem jest podbijane o
80%, podczas gdy obiekt ulega silnemu rozmyciu na 20px.

3.3 Fizyka Animacji i Czasu (Bezier Curves)

Liniowe animacje (linear lub ease) są zabronione dla transformacji obiektowych. Wszystkie
animacje korzystają z wyliczonych matematycznie krzywych Beziera.

●

●

●

--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1). Czas realizacji: 200ms. Obejmuje stany
najechania (Hover) dla przycisków, kart, przejścia kolorów tła, zmiany właściwości opacity.
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1). Czas realizacji: 300ms dla małych obiektów,
400ms dla modali. Błyskawiczny start i miękkie wyhamowanie do zera. Stosowane dla
pojawiających się Toastów, otwierających się Modali, rozwijających się Dropdownów.
--ease-exit: cubic-bezier(0.4, 0, 1, 1). Czas realizacji: 150ms. Stosowane dla elementów

●

znikających i zamykanych, przyspieszając uwolnienie interfejsu.
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275). Czas realizacji: 400ms. Używane
dla przesuwania Toggle Switchy (suwaka), generowania ikony Checkmark, oraz
wysuwania Floating Action Button, dając efekt mikrosprężystości.

4. Architektura Ikonografii (Vector Constraints)

Wszystkie ikony systemowe (Phosphor Icons / Remix Icons lub dedykowane) wchodzące w
interakcję z kodem muszą spełniać poniższe wymogi formatowania wektorowego SVG.

●  ViewBox: Zawsze ustawiony na 0 0 24 24.
●  Live Area: Przestrzeń rysowania ogranicza się do kwadratu 20x20px, narzucając

sztywny margines zewnętrzny (padding) w wymiarze 2px.

●  Grubość Linii (Stroke-Width): Bezwzględne 1.5px przy natywnym rozmiarze 24px.

Skalowanie w dół do 16x16px musi wywołać matematyczną konwersję do 1.0px celem
uniknięcia antyaliasingu w kodzie CSS.

●  Wykończenie Linii: Wymuszone parametry SVG: stroke-linecap="round" oraz

stroke-linejoin="round".

●  Promienie: Promień zewnętrzny dla form 2px, wewnętrzny wyliczony na 0.5px.
●  Kodowanie Koloru: Wewnątrz SVG atrybut fill="none", a obrys stroke="currentColor".
Pobieranie koloru zdefiniowane jest z góry poprzez właściwość color: var(--...) na
elemencie nadrzędnym HTML.

4.1 Semantyka Przypisań Ikonograficznych

●  Kolor Złoty (#FFD700): Wszędzie tam, gdzie zachodzi interakcja konwersji, napiwku,
portfela wallet-fiat, monety coin-stack, dłoni z monetą tip-hand, ikon kart płatniczych
credit-card.

●  Kolor Fioletowy (#9D4EDD): Skorelowany z Web3, tokenami token-hex, opłatami
gas-station, smart kontraktami smart-contract, ogniwami blockchain chain-link.

●  Kolor Ciemnoturkusowy / Biel (Zależne od tła): Ikony nawigacyjne, pulpit home-roof,

kompas explore-compass, profil użytkownika user-profile, suwaki ustawień
settings-sliders.

5. Każdy Pojedynczy Element UI: Specyfikacja
Atomowa

Specyfikacja techniczna i stany wszystkich obiektów interaktywnych wdrożone krok po kroku,
gotowe do bezpośredniego odwzorowania w środowisku CSS/Tailwind.

5.1 Przyciski Główne (Primary Button)

Odpowiadają za kluczowe akcje (CTA). W trybie wieczornym (Dark Mode) bazują na skali Złota.
Wymiary i Geometria:

●  Large (L): height: 56px, padding: 0 32px, border-radius: 8px. Font: Mukta Malar

SemiBold (600), rozmiar 18px. Odstęp między ikoną a tekstem gap: 8px. Ikona: 24x24px.

●  Medium (M): height: 48px, padding: 0 24px, border-radius: 8px. Font: Mukta Malar

SemiBold, rozmiar 16px. Ikona: 20x20px.

●  Small (S): height: 40px, padding: 0 16px, border-radius: 8px. Font: Mukta Malar

SemiBold, rozmiar 14px. Ikona 16x16px. Musi posiadać ::after { content: ''; position:
absolute; inset: -4px; } dla uzyskania strefy uderzenia dotykiem 48x48px.

Stany Interakcji (Dark Mode Context):

●  Default: background-color: var(--gold-400) (#FFD700). color: var(--teal-800) (#003737).

border: 2px solid transparent.

●  Hover (Najechanie): Przycisk przyciemnia się. background-color: var(--gold-500)

(#FFC107). Tranzycja za pomocą --ease-standard w czasie 200ms.

●  Active (Wciśnięcie): background-color: var(--gold-600) (#FFAB00). Fizyczna deformacja

transform: scale(0.98). Czas 100ms.

●  Focus (Zaznaczenie Klawiaturowe): Usunięcie outline z przeglądarki (outline: none).
Zastosowanie podwójnego pierścienia obrysu: outline: 2px solid var(--purple-300)
(#9D4EDD) z odsunięciem outline-offset: 2px.

●  Disabled (Nieaktywny): background-color: #264D4D (teal uśpiony). color: #5C7A7A

(tekst z opacity 38%). cursor: not-allowed.

●  Loading (Oczekiwanie): Kod wykorzystuje Grid Stacking. Przycisk dodaje atrybut

aria-busy="true". Element span z tekstem otrzymuje opacity: 0 i visibility: hidden (wymiary
przycisku pozostają identyczne, brak Shift Layoutu). Na to miejsce nakładany jest SVG
Spinner w kolorze #003737, który otrzymuje opacity: 1. Zastosowana klatka kluczowa do
ciągłego obrotu (rotate 360deg linear) oraz transformacja stroke-dasharray ulegająca
kurczeniu i rozszerzaniu na krzywej zatokowej.

5.2 Przyciski Drugorzędne (Secondary Button)

Przeznaczone dla akcji wspierających. Baza opiera się na skali Fioletu w trybie wieczornym.
Stany Interakcji (Dark Mode Context):

●  Default: background-color: transparent. border: 2px solid var(--purple-300) (#9D4EDD).

color: var(--purple-300) (#9D4EDD).

●  Hover: background-color: rgba(157, 78, 221, 0.1) (10% przezroczystości fioletu

nakładane na tło). Tranzycja --ease-standard w 200ms.

●  Active: background-color: rgba(157, 78, 221, 0.25) (25% przezroczystości). transform:

scale(0.98).

●  Focus: Analogiczny do Primary (outline offset 2px, fioletowa obwódka).
●  Disabled: border: 2px solid #405050. color: #5C7A7A. Tło transparent.

5.3 Formularze, Pola Tekstowe (Inputs) i Textareas

Elementy odpowiedzialne za input danych finansowych i logistycznych, z naciskiem na
widoczność stanu wprowadzania.
Wymiary i Geometria:

●  Wysokości dla wariantów input: Large 56px, Standard 48px. Promień dla granic pola:
border-radius: 6px (celowo zredukowany względem przycisków dla zachowania
technicznego charakteru). Wewnętrzny padding tekstu: 0 16px. Czcionka 16px IBM Plex
Sans.

Stany Interakcji (Dark Mode Context):

●  Default: Tło pola (background) to #002B2B (przyciemniony względem głównego tła

aplikacji teal-800). Obrys (border) 1px solid var(--teal-600) (#005959). Wewnętrzny tekst z

placeholderem w kolorze #5C7A7A. Dodatkowo narzucony jest wewnętrzny cień
box-shadow: inset 0 1px 2px rgba(0,0,0,0.2).

●  Hover: Rozjaśnienie pola, aby odcinało się na czarnym tle. background-color:

var(--teal-800) (#003737). border-color: #00897B.

●  Focus (Złota Poświata): Gdy kursor trafia do pola: border-color: var(--gold-400)

(#FFD700). Nakładany jest absolutny rzutujący cień wielowarstwowy (Neon Glow):
box-shadow: 0 0 0 1px #FFD700, 0 0 0 4px rgba(255, 215, 0, 0.25), inset 0 1px 2px
rgba(0,0,0,0.2). Tekst użytkownika uderza kolorem color: #FFFFFF. Element pływającej
etykiety (Floating Label) przesuwa się w górę za pomocą transform: scale(0.75)
translateY(-50%) i również nabiera barwy #FFD700. Kursor karetki (wpisywania tekstu):
caret-color: #FFD700.

●  Error (Błąd): Błędna walidacja anuluje obrys złoty, nakładając Pastelową Czerwień

#FFB4AB. Włącza się animacja shake zdefiniowana na @keyframes jako przesunięcia w
osi X (±4px przez 300ms). Poniżej inputa aktywuje się wiadomość o błędzie w kolorze
#FFB4AB pisana 12px fontem.

●  Disabled: Wymuszona przezroczystość całego elementu opacity: 0.4. Tło spada na

poziom #001F1F. Kursor blokuje operację cursor: not-allowed.

●  Autofill (Google Chrome Hack): Wpisanie danych przez system ulega nadpisaniu CSS,
aby zabić jasnoniebieskie okno systemowe: input:-webkit-autofill { -webkit-box-shadow: 0
0 0px 1000px #003E3E inset; -webkit-text-fill-color: #FFFFFF; transition:
background-color 5000s ease-in-out 0s; }.

5.4 Checkboxy (Pola Wyboru) i Radio Buttony

Mechanizmy selekcji wymagające ekstremalnej dokładności wielkościowej, zasilane kolorem
jako modyfikatorem stanu.
Geometria i Wymiary:

●  Pudełko checkboxa ma dokładne wymiary width: 20px; height: 20px;. Obszar uderzenia
narzucony przez warstwę wyższą to minimum 44x44px (Apple HIG compliant). Wariant
Checkbox wykorzystuje border-radius: 4px. Wariant Radio Button ustawia border-radius:
50%.

Stany Interakcji Checkbox:

●  Unchecked (Odznaczony): border: 2px solid #005959. Tło wewnętrzne transparent

(przebija aplikację).

●  Hover: Wyzwolenie fioletowej poświaty tła background-color: rgba(157, 78, 221, 0.1).

Obramowanie rozjaśnia się na #008888.

●  Checked (Zaznaczony): Obramowanie zostaje zresetowane border-width: 0. Tło

zalewane jest czystym Złotem #FFD700. Wewnątrz rysuje się wektor SVG "ptaszka"
(Checkmark), w ekstremalnie mocnym kontraście koloru #003737 (teal-800). Animacja
rysowania ścieżki SVG wykorzystuje stroke-dasharray i stroke-dashoffset realizowane w
200ms.

●  Focus: Klawiaturowe zaznaczenie otacza pudełko zewnętrznym Złotym okręgiem

(outline) na dystansie 2px od granicy krawędzi (offset 2px).

Stany Interakcji Radio Button:

●  Checked (Zaznaczony): Pierścień obramowania przyjmuje format border: 2px solid

#FFD700. Wnętrze utrzymuje tło #004545, a w samym centrum, precyzyjnie wyrównany
wyrysowuje się okrąg width: 10px; height: 10px; z wypełnieniem background-color:
#FFD700.

5.5 Przełączniki (Toggle Switches)

Zastępują checkboxy przy operacjach natychmiastowych, gdzie zapis stanu w bazie następuje
bez potwierdzenia.
Geometria:

●  Wymiary toru przełącznika (Track): width: 36px; height: 20px;. Posiada kształt pigułki

border-radius: 999px.

●  Wymiary elementu przesuwnego (Thumb): width: 16px; height: 16px; zdefiniowany jako

absolutny punkt wewnątrz toru, zachowujący idealnie po 2px zapasu od góry, dołu i boku
kontenera. border-radius: 50%.

Stany Interakcji:

●  Off (Nieaktywny): Tło toru wynosi #002E2E z 1px brzegiem #006666. Suwak siedzi z

lewej krawędzi left: 2px; i przyjmuje barwę #006666.

●  On (Aktywny): Tło toru wlewa kolor Fioletowy (sygnał "Zasilania") #9D4EDD. Suwak
podróżuje na prawą krawędź za pomocą transformacji na karcie graficznej GPU:
transform: translateX(16px). Kolor suwaka ulega konwersji na czystą biel #FFFFFF.
Animacja podróży w lewo-prawo podlega specyficznej regule --ease-spring, z
elastycznym wybrzuszeniem rzędu kilku pikseli przy hamowaniu, co generuje
ultra-nowoczesne odczucie responsywności sprzętowej.

6. Organizmy UI: Modale, Overlays i Moduły
Potwierdzeń

Zadaniem Modali jest całkowite przechwycenie uwagi użytkownika (Focused Task) i
wymuszenie krytycznych decyzji na osi finansowej lub systemowej. Architektura ta bazuje na
zjawisku Glassmorphismu, oddzielającym zagnieżdżenia.

6.1 Konstrukcja Warstwy Rozmycia (Backdrop Blur)

Kiedy proces Modalu jest inicjalizowany, aplikacja pokryta zostaje powłoką ochronną ::backdrop
(lub nadrzędnym div).

●  Definicja Tła: Kod nakazuje aplikację koloru niemalże czarnego turkusu z wysokim

parametrem krycia: background-color: rgba(0, 31, 31, 0.85).

●  System Rozmycia: Wprowadzenie wartości backdrop-filter: blur(4px). Powoduje to

fizyczne załamanie grafiki pod spodem, przez co warstwa czytania treści za elementem
ulega dezintegracji i niemożliwości skupienia wzroku, co bezpośrednio wymusza
wpatrywanie w ostre granice samej karty Modalu.

●  Animacja Wejścia: Fade-in z atrybutem opacity: 0 pnącym się do 1 w czasie 300ms za

pośrednictwem --ease-enter.

6.2 Kontener Modalu (Modal Box Container)

Okienko stanowiące centrum informacji.

●  Geometria i Kolor: Zaokrąglenie brzegowe przyjmuje gigantyczną w stosunku do reszty
systemu formę border-radius: 16px. Podłożem elementu jest bezpośrednio jednolity kolor
bazowy aplikacji --teal-800 (#003737).

●  Cieniowanie Definiujące Krawędź: Ochrona przed zlaniem w ciemnych matrycach
dokonywana jest poprzez naniesienie ekstremalnego rzutu światła u dołu z wysokim
pułapem odcięcia: box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.7). Dodatkowo, obrys
zdefiniowany został wewnętrznym pasmem border: 1px solid #004D4D dla definicji
sztywnej tafli ramki.

●  Maksymalne Ujęcie (Desktop vs Mobile): Na ekranach powyżej 640px, element ten

wyrównany jest za pomocą CSS Grid / Flexbox perfekcyjnie centralnie na osi X i Y, z
zastrzeżoną maksymalną szerokością max-width: 600px;. Kiedy następuje zejście poniżej
limitu szerokości telefonu (< 640px), zachowanie zamienia obiekt w komponent
klasyfikowany jako "Bottom Sheet" (Szuflada Dolna). Element przytwierdza się twardo do
podłogi ekranu bottom: 0, a margin-bottom: 0, wypełnia on po całości matrycę na bokach
width: 100%. Górne rogi dziedziczą 16px, dolne natomiast powracają w formacie kąta
prostego 0px.

●  Animacja Modalu (Entrance Motion): Obok zmian krycia warstwy od zera do jedynki,
obiekt ten realizuje "wślizg": transform: translateY(-20px) scale(0.95) rosnący pod
wpływem wjazdu na środek do transform: translateY(0) scale(1). Odpowiada za to
rygorystyczne wyliczenie na krzywej Beziera cubic-bezier(0.16, 1, 0.3, 1) przez okres
czasu 400ms.

●  Element Zamykający (Close X): Absolutne pozycjonowanie w prawej górnej osi,

wymiary ikony 24x24px. Definicja strefy dotykowej rozszerzona na kwadrat 44x44px.
Użyty kolor spoczynku to wariant stonowany #A3C2C2, przy operacji hover zapala się on
bez użycia czasu uśpienia do twardej czystej bieli #FFFFFF.

6.3 Struktura Wewnętrzna Płatności (Transaction Modal)

Wewnętrzne operacje płatnościowe nakazują użycie tytułu zdefiniowanego dla wariantu Mukta
Malar Bold (700) w rozmiarze 24px wypełnionego Złotem #FFD700. Centralne miejsce w środku
wypełnia wyśrodkowany, olbrzymi input na wymiar kwoty, wykorzystujący font techniczny IBM
Plex Sans na rozmiarze rzędu 40px (z użyciem tabular-nums). Stopka modalu wyrównuje
przycisk "Anuluj" (Ghost style) na lewo, oraz przycisk "Zapłać" (Primary Gold - L 56px)
wyrównany w pełni do krawędzi prawej. Na mobilnych urządzeniach oba przyciski wyciągają się
horyzontalnie na rozmiar 100%.

7. Organizmy Interfejsu Danych: Karty, Tabele i Listy

Platformy operujące danymi giełdowymi czy napiwkowymi przetwarzają wielką dawkę
parametrów, wymagając ekstremalnego opanowania siatki tabelarycznej i struktury wertykalnej.

7.1 Karty Zawartości (Content Cards & Bento Grid)

●  Wnętrze Karty: Margines poduszki przestrzennej (padding wewnętrzny) wymusza równe

pole oddalenia 24px z każdej krawędzi. Ściana tła operuje odcieniem --teal-800
(#003737) na bazowym zaokrągleniu kątowym równym border-radius: 12px.

●  Reakcja na Najechanie (Hover Elevation): Przy aktywacji wskaźnika, karta wyrywa się

do góry względem Z-osi na dystans pikselowy zdefiniowany ruchem z transform:
translateY(0) do parametru transform: translateY(-6px). Generowany cień posiada
wskaźniki gęstego rzutu zmieszane ze Złotym blaskiem odseparowania: box-shadow: 0

20px 25px 5px rgba(0, 0, 0, 0.6), 0 0 10px rgba(252, 194, 1, 0.1). Całość ewoluuje przez
system krzywych Czasu --ease-standard.

●  Pozycjonowanie Bento Grid: Układ na stronie matrycowany jest dyrektywą Grid w

postaci zautomatyzowanej: grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)).
Wypełnia to ekrany na gęsto dopasowując układ matematycznie od jednego do pięciu
komponentów obok siebie bez definiowania przestarzałych Media Queries. Przerwy
zdefiniowane w rzędach poprzez instrukcję gap: 24px;.

7.2 Tabele (Historia Transakcji i Płatności)

Minimalizm na gęstych danych objawia się usunięciem wertykalnych przegród liniowych.
Wszelkie dane ujęte tagiem <td> muszą otrzymać dyrektywę wyrównania znakowego
font-variant-numeric: tabular-nums (IBM Plex Sans gwarantuje, że "111,00" zabiera równą
powierznię w siatce co "888,00", bez jakichkolwiek postrzępień krawędzi bloku na pionie cyfr).
Wyrównanie całościowe dokumentacji do krawędzi na text-align: left;. Wartości kwot
pieniężnych formatowane wagą 600 na kolor czystej Bieli, wybijając się od metadanych (np. ID
Sesji), uśpionych tłem jasnoszarym #A0B0B0.

●  Nagłówki <th>: Górna powierzchnia opisowa operuje zablokowaniem podczas

przewijania: position: sticky; top: 0; z-index: 10;. Zewnętrzne malowanie tła odróżnia się o
jedną klasę świetlną w górę --teal-700 (#004545), nakładając powagę w nagłówku. Obrys
dolny nagłówka zdefiniowany jako border-bottom: 1px solid #004F4F. Wewnętrzny tekst
Nagłówka korzysta z Mukta Malar, ustawiony o rozmiar mniejszy 14px, z pogrubieniem
font-weight: 600 i narzuconym uppercase w świetle znaku o poszerzonym rozmiarze
letter-spacing: 0.1em.

●  System Naprzemiennego Rytmu (Zebra Striping): Aby uchronić oko operującego
systemem w poszukiwaniu końca wiersza po horyzontali, struktura wylicza wiersze
automatycznie z atrybutem pseudoklasowym CSS tr:nth-child(odd) implementując tło
bazowe --teal-900 (#001F1F). Natomiast tr:nth-child(even) dziedziczy warstwę o 2 stopnie
wyżej w świetle: --teal-800 (#003737). Wszystkie <tr> w rzędzie kończą się sztywno
wymuszoną ramką brzeżną wzdłuż całego panelu na spodzie: border-bottom: 1px solid
#004545. Opcja hover po wierszach generuje dyskretny flash na warstwę odcieni
--teal-700 (#004F4F).

7.3 Listy Modułowe dla Telefonów (Mobile Table Fallback)

Kiedy ekran spada na rozmiar urządzenia (<640px), model tradycyjnej tabeli powoduje defekt i
wyklucza odczyt u użytkowników. Instrukcja nadrzędna to transformacja rzędów HTML. Opcja
display: table ulega modyfikacji do wartości display: flex; flex-direction: column. Rząd komórek
<tr> rozbija się generując wizualizację pełnej Karty Blokowej. Każdy wewnątrz element struktury
formatuje się za pomocą reguły justify-content: space-between. Parametry oryginalnych
nagłówków ukryte wizualnie powracają, dodawane przez modyfikator zawartości ::before {
content: attr(data-label); color: #809090; font-weight: bold; }, zasilane tagiem atrybutowym
osadzonym przy wyrenderowaniu td. Tabela przyjmuje styl wizualnego czytania "od góry do
dołu" gdzie Tytuł, Data i Kwota leżą na uformowanym bloku z zaokrągleniami, przedzielonym
liniami bocznymi w dystansie pionowym.

7.4 Listy Powiadomień i Zdarzeń (Notifications)

Elementy te wymuszają sztywną formę bez jakiegokolwiek załamywania wiersza do spodu.
●  Pojedynczy komponent ujęcia rzędu li blokowany jest sztywną regułą osi Y w mierze

height: 72px; oraz display: flex; align-items: center;. Wewnętrzny padding na krawędziach
lewej i prawej rzędu 0 16px. W lewym gnieździe 48px na szerokość zajmuje okrągła
ikona. Środkowy element zawierający pełną bazę zdania pobiera zasady skalowania
elastycznego flex: 1 z krytyczną regułą na ucięcie i wypchnięcie do wielokropka:
white-space: nowrap; overflow: hidden; text-overflow: ellipsis;.

●  Punkt czasowy z prawego gniazda połączony marginesem na lewo, operuje absolutną
redukcją znaczenia z krojem font-size: 0.85em; font-weight: 300 w odcieniu #D6EBEB.
Wdrożono zasady Zebry Tabelarycznej.

8. Moduły Menu Pływającego: Dropdowny i Szuflady

Dostęp systemowy poprzez wybór i filtrację wymaga zjawisk uniesienia (elevation), na panelach
które nie przeszkadzają warstwie nadrzędnej.

8.1 Anatomia Kontenera i Położenie (Dropdown Wrapper)

Dropdown nie modyfikuje przepływu układu nadrzędnego (no relayout flow).

●  Główny pojemnik przywiązany zostaje absolutnie do warstwy rodzica: position: absolute;

top: 100%; right: 0; margin-top: 8px;. Tło dziedziczy z modułu nawierzchni trybu
wieczornego: --teal-800 (#003737). Szerokość bloku wyłapywana jest sztywnie poprzez
ustawienie granicy na wymiar: min-width: 220px;. Użyty system ochrony Z: z-index: 1000;.
W celu uniknięcia defektów przy rzucaniu, granice zacinane poleceniem overflow:
hidden;. Ochrona graniczna narzuca border-radius: 8px. Cieniowanie rzuca promieniście
wymiar rzędu box-shadow: 0 10px 25px rgba(0,0,0,0.6), 0 0 0 1px
rgba(255,255,255,0.05) gwarantujące minimalny wewnętrzny wyrys ze srebrną
obramówką na ekstremalnie ciemnym tle okien.

8.2 Wyliczenie i Opcje Itemów

Lista działa na operacjach wyliczania zawartości dla selekcji wewnątrz pudła.

●  Standard Opcji: Każdy podległy wpis zachowuje się elastycznie z użyciem display: flex;
align-items: center; gap: 12px;. Odległość wertykalno-horyzontalna to padding na osi 10
na 16 pikseli. Font z rodziny IBM Plex Sans przyjmuje 14px wysokości przy czystej barwie
#FFFFFF.

●  Oddziaływanie Sensoryczne: Najechanie na element wirtualnie pozbawia go

spowolnienia transformacyjnego transition: background-color 0s;. Użytkownikowi wydaje
się to ultraszybkie. Włącza się zmiana w barwie tła wybijająca pod pozycją:
background-color: #004545 z pełnym unicestwieniem obrysu ostrości (outline: none;).
Jeżeli użytkownik wybrał opcję lub element jest skorelowany na bazie "Active" kod
uruchamia barwę liter wyciągając ją natychmiast na --gold-400 (#FFD700).

9. Komunikacja Asynchroniczna i System Toastów
(Snackbars)

Brak przymusu w systemach powiadomieniowych to fundament nieinwazyjnego powiadomienia,
wyciągnięty ponad nawigację, powiązany estetycznie i animacyjnie ze środowiskiem Web3 w
2026.

9.1 Wymiary, Tło i Anatomia Wektorowa Powiadomienia

Toasty, działając jako elementy efemeryczne, zmuszone są informować użytkownika na krańcu
warstw nakładkowych.

●  Struktura przyjmuje odcień o poziomie mniejszym względem tła aplikacji, zataczając
background-color: #002F2F. Krawędzie posiadają twardy łuk cięty promieniem
uwarunkowanym w module Modalu - border-radius: 12px. Szerokość mieści się między
progiem operacyjnym 300px a maksymalnym 400px w dół od 16 pikselowego z każdej
krawędzi paddingu, nie łamiąc zdania na wymiar więcej niż dwulinijkowy.

●  Głębia ustanawiana w systemie Dark Mode wymaga sztucznego wyrwania światła: rzut
generowany kodem box-shadow: 0px 8px 24px -4px rgba(0, 0, 0, 0.6) unosi element,
podbijany od zewnętrznej krawędzi dyrektywą obrysu od bieli border: 1px solid rgba(255,
255, 255, 0.1). Powoduje to odblask załamanej linii powiadomienia od czarnych ekranów
aplikacji na systemie operacyjnym w trybie Dark.

●  Wnętrze dzieli się od wymiaru wyrównanego wertykalnie paska ikonografii w formacie po
lewo z centralnym wypychaczem Flex (flex-grow: 1), rzucającym pogrubiony tytuł 600 na
kolor #F1F5F9 (Off-white) wraz z dołączonym, pomniejszonym opisem bazy szarego 400
- #94A3B8.

9.2 Wektory Ruchu Pozycyjnego i Stacking Context

Implementacja układa powiadomienia według wymogów układu horyzontalnego. W środowisku
operacyjnym ponad 640px, element zagnieżdża się na osi prawy dolny róg okna ekranu
uciekając ze stref nawigacji. Przechodząc na urządzenie mniejsze od < 640px, wymuszone pole
nakazuje wędrówkę powiadomienia na osi układów pionowych Góra (Top), generując się od
stref wyliczanych z modułów okna w ramce bezpiecznej wycięcia telefonu: top: calc(16px +
env(safe-area-inset-top));.

●  System Stosu (Stacking): Kiedy zaimplementowane zostają trzy wiadomości

jednocześnie z API aplikacji, pojawiają się one na wymiarze osi Z jedna za drugą bez
fizycznego przepychania układu pudełkowego w dół (Brak Layout Shift). Najnowsza na
górze w skali nominalnej 100% z osią translacji bazowej na zero translateY(0) operując w
opacity o wielkości 1. Wiadomość znajdująca się niżej opada fizycznie z wielkości,
podwijając się ze skalą w 95%, podjeżdżając pod element główny w wymiarze wektora o
dziesięć pikseli w osi ujemnej translateY(-10px) po czym redukuje krycie powłoki na
poziom 0.9. Ostatnia odczuwa skalę w rzędzie 0.90, translację o 20 pikseli za element w
dół na 80% opacity.

9.3 Przebieg i Chronologia Ruchu (Timing System)

Animacje posiadają wektory kierunkowe zależne od stref. Desktopowe okno wypycha animację
od spodu po wektorze w dół przesuniętym do ukrycia (translateY(100%) do 0). Mobilne ramy
okienne wjeżdżają natychmiast z góry ekranu powielając rzut na wymiarach minusowych
translateY(-100%) rosnąc do osi bazowej. Ruch obsługuje w klatkach matematycznych
parametr sprężysty zdefiniowany w fizyce animacji o nazwie domyślnej --ease-spring.

Sprężynowanie zapewnia iluzję lekkości, miękkie i opływowe hamowanie bez gwałtownego
uderzenia w piksele docelowe.

●  System liczy zegar zdarzeń ustawiając bezwzględnie likwidację elementu (Opacity na
zera) w wymiarze 4000 milisekund (4 sekundy czasu postoju od nadejścia fali). Aby
obsłużyć czytnik, implementuje się na osnowie Java Script polecenia przerywające zegar
po wydarzeniu mouseenter, wstrzymując wymarcie aż element straci z powrotem najazd
ucieczki u uzytkownika mouseleave podłączone z małym buforem czasu (opóźnienie
domyślne na 2 sekundy ostateczne do wygaszenia obiektu z DOM na zerowy wymiar
powłoki i pełne cofnięcie w tył obudowy z transformacji po krzywej).

10. Komponenty Tożsamości: Awatary i Odznaki
Znaczące (Badges)

Rozmieszczenie i skalowanie grafik i avatarów profilowych, stanowiących fundament
tożsamości z logiką zachowania obramowań przy obcinaniu warstw pod system odznak.

10.1 Geometria Maskowania Awataru (Mask Cutout CSS)

Twórca z awatarem na siatce żąda zaimplementowania sferycznych elementów, twardo
uformowanych jako koła operujące bazowo rozszerzeniem powłoki rogowej o komendę
border-radius: 50%; overflow: hidden;. W przypadku połączenia ikony odznaki weryfikacyjnej
"Verified", zachodzi przymus wypłytkowania obrysu na bazie. Do elementu grafiki implementuje
się nie archaiczny border ujemny, lecz zaawansowaną formułę wymuszoną mask-image:
radial-gradient(...). Narzędzie to w kooperacji z flagami polecenia mask-composite: exclude;
usuwa przezroczysty wycinek fizycznie z okręgu wektora tła graficznego na profilowym zdjęciu
w prawej dolnej róg-ćwiartce pod 45 stopniami. Powstałe ucięte wyżłobienie na rogu staje w
proporcji na margines przezroczysty, za który podkłada się ikonę odznaki niezależnie w
wymiarze absolutnym tak by tło aplikacji przenikało bez żadnej linii obramówki wektorowej w
odcięciu.

10.2 Struktura Gradientu na Odznakę Weryfikacyjną

Oznaczenie tożsamości rzuca formę statusową. Kółko wpisane bezwarunkowo za nałożonym
filtrem ma generowane sztuczne odbicie wypalane wektorowo ze skosa.

●  Gradient i Kolor: Generuje się uderzenie świetlne używając formuły kompozytowej.

background: linear-gradient(135deg, var(--gold-400) 0%, var(--gold-600) 100%). Barwa
przechodzi rygorystycznie z jasnego FFD700 ku przyciemnieniu o odcieniu
pomarańczowym (FFAB00), naśladując twarde załamanie rzutu na obłej monety,
symulując złoty dysk materialny bez nakładania wodotrysków wypukłych cieni. Na środek
tego zarysu wgrywana jest ikona typu SVG wymiarowanego sztywno na 1.5px
pociągnięcia formatu fajki ze 100% nasyconego czarnego tła węglowego bazy do
kontrastu (#001F1F barwa bazowa tła 900 od turkusu).

Cały zebrany tu Master Plan zapewnia kompletną strukturę i gotowe dyrektywy techniczne
pozwalające na wybudowanie TipJar+ w nowoczesnym wymiarze, gwarantując integralność na
wszystkich poziomach logiki komponentów od małego pola wprowadzania danych na pełnych
szufladach modali skończywszy, tworząc rygorystyczną, niezawodną bramę wizualnego

obcowania z aplikacją w trybach finansowych.

Cytowane prace

1. Overview - Color palette - Atlassian Design System,
https://atlassian.design/foundations/color-new/color-palette-new 2. Improving a Design System
Color Palette | by Miguel Silva,
https://www.designsystemscollective.com/improving-a-design-system-color-palette-3275eef10ac
0 3. Designing a colour system - by Pavel Kiselev - UX Collective,
https://uxdesign.cc/designing-colour-system-d9d39f245e01

