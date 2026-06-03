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

5.2 Floating Action Button (FAB)

Główny punkt akcji, pływający nad interfejsem, przeznaczony do wywoływania Asystenta AI,
szybkiej wpłaty lub dodawania treści.

●  Kontekst Mobilny (Mobile < 1024px): Kontener 56x56px w kształcie idealnego koła

(border-radius: 50%). Pozycjonowany w prawym dolnym rogu ekranu: bottom: calc(24px
+ env(safe-area-inset-bottom)), right: 24px. Warstwa Z-osi: z-index: 200.

●  Kontekst Desktopowy (Desktop >= 1024px): FAB ewoluuje w wariant Extended FAB

(zawierający ikonę oraz etykietę tekstową, np. "+ Nowy Napiwek"). Zaokrąglenie
przyjmuje formę "Pill" (border-radius: 999px), padding boczny 0 24px, wysokość 56px.
Pozycjonowanie: Prawy dolny róg, lub - w widokach typu Dashboard - przeniesiony do
górnej sekcji nawigacyjnej obok tytułu ekranu.

●  Stany Interakcji:

○  Default: Tło --gold-400, ikona/tekst --teal-800. Cień: Elevation 3.
○  Hover: Tło rozjaśnia się do --gold-500.
○  Active: transform: scale(0.92), tło --gold-600. Wyzwala wibrację haptyczną

(Impact/Tick).

○  Focus: Pierścień --purple-300 z 4px offsetem.

●  Z-index i Stacking Context: Aby zapobiec zakrywaniu FAB przez inne obiekty, otrzymuje
on twarde z-index: 200. Należy pamiętać, by na mobile unikać umieszczania FAB tuż nad
przyklejonym dolnym paskiem nawigacji (Bottom App Bar) bez odpowiedniego
marginesu, co tworzy konflikt hierarchii Z.

●  Reguły zachowania na Scroll (Hide on Scroll): FAB reaguje na intencję użytkownika

zdefiniowaną kierunkiem przewijania:

○  Przewijanie w dół (Scrolling Down): FAB zostaje ukryty, by uwolnić przestrzeń do

czytania. Animacja: zjazd w dół o translateY(150%) scale(0.9) powiązana z
redukcją opacity do 0. Animacja wykorzystuje --ease-standard i trwa równe 200ms.
Oś wyzwolenia to minimum 25px ruchu ciągłego, aby zapobiec migotaniu.

○  Przewijanie w górę (Scrolling Up): System natychmiastowo przywraca FAB do

pozycji wyjściowej translateY(0) scale(1). Animacja wykorzystuje krzywą
--ease-spring przez 400ms, nadając guzikowi efekt sprężystego, miękkiego
"wyskoku".

5.3 Formularze (Inputs, Textareas, Search Bars)

●

Inputs (Standard): Tło #002B2B, obrys 1px --teal-600. Stan Focus podświetla pole
poświatą neonową Złotą (Box-shadow ring) i unosi Floating Label na górę (scale 0.75).

●  Pasek Wyszukiwania i Sugestie (Search Bar):

Input w stylu Glassmorphismu z ikoną Lupy.

○
○  Stan Ładowania (Loading): W trakcie odpytywania API (debounce 300ms po

wpisaniu tekstu), statyczna ikona Lupy po prawej stronie znika (fade-out), a na jej
miejscu pojawia się kręcący się mikroskopiczny Spinner w kolorze --purple-400.

○  Lista Sugestii (Dropdown): Wysuwa się na warstwie z-index: 100 bez

przesuwania ekranu. Zaznaczenie (Focus) inputa podbija lupę na Fioletowo.

○  Empty State (Brak Wyników): Jeśli po wpisaniu frazy serwer zwraca 0 wyników, w

dropdownie renderuje się widok pustego stanu: wycentrowana miniaturowa
ilustracja 3D uśpionej/pękniętej lupy z podpisem IBM Plex Sans 14px "Nie
znaleźliśmy wyników dla tej frazy". Zawsze oferuje przycisk "Wyczyść
wyszukiwanie".

○  Nawigacja Klawiaturowa: System bezwzględnie wspiera operacje z klawiatury.
ArrowUp i ArrowDown poruszają się po liście podpowiedzi (zmieniając im tło na
--teal-700 z fioletowym markerem na brzegu). Enter dokonuje selekcji. Escape
zamyka listę sugestii natychmiastowo, zostawiając migający kursor (Caret)
wewnątrz pola input.

5.4 Checkboxy, Radio i Toggle Switches

●  Checkboxy: Klawiszowy hit area minimum 44px. Stan checked usuwa border, wlewa

czyste --gold-400 i rysuje animowany wektorowy Checkmark (Teal).

●  Toggle Switch: Suwak oparty na --ease-spring. Przy stanie "On", tor wypełnia się
Fioletem --purple-300, dając efekt sprzętowego załączenia (haptic tick w tle).

5.5 Sliders & Wskaźniki Postępu (Progress Indicators)

●  Slidery Wartości (Range Inputs): Linia nieaktywna w --teal-700, aktywny fragment linii
(track) wypełniany na --gold-400. Przycisk suwaka (Thumb) to okrąg 24x24px rzucający
cień. Podczas przesuwania w mobile odczuwalne są mikrowibracje haptyczne (Tick) przy
pełnych wartościach. Pływający Tooltip z aktualną kwotą unosi się bezpośrednio nad
Thumbem.

●  Linear Progress: Sztywny track o wysokości 4-8px, rosnący płynnie z kolorem

Fioletowym (proces) lub Złotym/Zielonym (sukces).

●  Circular Progress: SVG obracające się pod kątem, rysujące swój obwód parametrami

stroke-dasharray.

5.6 Chipy, Tagi i Segmented Controls

●  Chips / Tags: Elementy z zaokrągleniem pigułki (border-radius: 999px).
○  Kategoryzacja: Tło --teal-800, obrys --teal-600, tekst jasny.
○  Status (np. Live, Nowość): Półprzezroczyste tła rgba() zgodne z barwą

semantyczną (np. 15% Czerwieni, tekst czerwony) z małą ikoną pulsującej kropki.

●  Segmented Control: Tabletowy/Mobilny zamiennik tradycyjnych zakładek (Tabs).

Zamknięty w jednym pojemniku z tłem #001F1F. Kliknięcie na aktywny segment przesuwa
podświetlenie (sztywny kafelek #004545) elastycznym, spężystym ruchem na nową
pozycję (transform: translateX()).

5.7 Komponenty Krokowe (Stepper / Wizard)

Wykorzystywane przy Onboardingu. Pasek postępu horyzontalnego. Składa się z węzłów
(kropek). Aktywny węzeł jest Fioletowy z białą ikoną cyfry/ptaszka. Przejście do następnego
etapu rysuje linię łączącą (ease-standard 300ms) i odpala sprzężenie haptyczne (Success
pattern).

5.8 Separatory i Linie Podziału (Dividers)

Linie podziału stosowane są wyłącznie tam, gdzie sama przestrzeń negatywna (whitespace) nie
wystarcza do zbudowania hierarchii. Grubość wynosi bezwzględne 1px. Kolor domyślny to
--border-subtle lub półprzezroczyste rgba(255, 255, 255, 0.05). Aby zachować intencję
systemową, separatory muszą być kategoryzowane jako:

●  Full-bleed (Pełna szerokość): Linia rozciągająca się od krawędzi do krawędzi bloku

●

kontenera. Służy do separowania wyraźnie odmiennych bloków tematycznych interfejsu
(np. sekcja informacji kontaktowych od logu aktywności). Używane na listach tekstowych
bez awatarów, gdzie same marginesy to za mało, aby oddzielić kafelki.
Inset (Wcięte): Stosowane do rozdzielania blisko powiązanych treści wizualnych
wewnątrz list z kotwicami (Avatary/Ikony). Linia rozpoczyna się od lewej w dokładnie tej
samej osi pikselowej co blok tekstu, celowo pomijając obszar pod awatarem. Buduje to
ciągłość tzw. "kręgosłupa" listy i utrzymuje jedność obrazków wizualnych. Opcjonalnie
kończy się zrównaniem z prawym paddingiem.

●  Vertical (Pionowe): Służą do separacji horyzontalnych układów o dużym zagęszczeniu –
paski nawigacji (Toolbars), oddzielenie metadanych pod tytułem od statystyk na widokach
Desktopowych. Skalowane do 60% wysokości nadrzędnego elementu z lekkim
marginesem pionowym.

6. Organizmy UI: Modale i Szuflady Dolne (Bottom
Sheets)

6.1 Modal Klasyczny (Desktop)

●  Kontener centralny, szer. max 600px. z-index: 1000.
●  Glassmorficzny backdrop (blur(4px), opacity 85% --teal-900).

6.2 Szuflada Dolna (Bottom Sheet)

Dedykowany organizm dla kontekstu mobilnego (< 640px). Zastępuje popovery, złożone filtry
wyszukiwarki i modale akcji.

●  Skalowanie Wysokości: System operuje elastycznymi rygorami wymiarów. Dynamicznie
rośnie z zawartością, ustalając twarde minimum na 30% ekranu. Przy intensywnych
formularzach limit zablokowany jest na wartości 85-90% wysokości ekranu (Max Height),
po czym wewnętrzny środek arkusza przyjmuje atrybut własnego scrolla (overflow-y:
auto) chroniąc strefy bezpieczne u góry.

●  Draggable Handle (Uchwyt Pociągający): W górnej części arkusza zawsze znajduje się

szara "pastylka" - kresa o wymiarach 4x40px, sygnalizująca możliwość manipulacji
gestem.

●  Gestykulacja i Haptyka (Gesture & Haptic Feedback): Komponent obsługuje natywne

pociągnięcia w dół (Swipe-down-to-dismiss). Kiedy arkusz ulega zjawisku "wyrzucenia" za
dolną krawędź ekranu wskutek silnego odrzucenia (Fling), uderza on w dolną ramę
aktywując natychmiast krótki wstrząs wibracyjny (Haptic Bump), dający poczucie
domknięcia fizycznego zadania.

●  Safe Area Top: Kiedy Szuflada uderza we własny sufit wysokości (85-90%), musi

zostawić bezwzględny pas ochronny 64px wolnej przestrzeni zaciemnionego ekranu u
samej góry, odsuwając interfejs od ingerencji w Notch, Dynamic Island czy elementy
stanu OS, a jednocześnie pozostawiając fragment przestrzeni pozwalający użytkownikowi
dotknąć tła by anulować akcję bez machania.

7. Interfejsy Danych: Karty, Tabele, Wykresy i
Skeletony

7.1 Karty i Bento Grids

Wykorzystywane układy wieloelementowe (Bento) reagują uniesieniem na najechanie kursora
(Hover Z-axis shift) nakładając złotą mgiełkę na rzutowany cień.

7.2 Paginacja i Infinite Scroll

●  Desktop: Tradycyjna paginacja blokowa.
●  Mobile: Virtualized Infinite Scroll z Spinnerem doładowującym przez API, lub przycisk

"Load More" jako Przycisk Złoty (w przypadku zapobiegania defektom zgubienia stopek).

7.3 Wykresy i Wizualizacja Danych (Charts)

Do analityki portfela, dashboardu transakcyjnego oraz wskaźników retencji subskrybentów.
Wszystkie muszą współgrać z twardymi realiami Dark Mode i unikać domyślnych niebieskich
bibliotek, narzucając pełną zgodność brandingu.

●  Geometria i Kolory Linii: Ostre, toporne linie blokowe wykresów (Bars) ustępują gładkim

krzywym wektorowym (Line Charts / Spline). Kreska główna to matematycznie
wstrzyknięty gradient CSS ciągnący się od Fioletu z dołu poświaty (--purple-400) rosnący
w Złoto (--gold-400) sygnalizujące finansowe maksimum. Grubość wektora ustawiona na
3px.

●  Wypełnienia i Głębokość: Obszar znajdujący się bezpośrednio pod linią rysowania

wypełniony jest półprzezroczystym, wertykalnym gradientem, który przy samej krawędzi
górnej odznacza się 20% Złota, a w dole płynnie znika na poziom 0% stapiając się
bezszwowo z pustym kontenerem --teal-900.

●  Linie Siatki Osi (Grid lines): Dla eliminacji szumu, usunięto wertykalne odnogi siatki.
Linie rzędowe poziome rysowane w minimalnym tonie: cienkie 1px w wariancie koloru
--teal-300 skondensowanym poprzez kanał Alpha do wartości zaledwie 10%. Na jasnym
interfejsie ulegają przyciemnieniu (Invert) w celu ochrony widoczności na bieli.
Interaktywne Tooltipy Wykresów: Najechanie punktowe węzła odpala renderowany

●

przez React/Vue Portal niestandardowy dymek z-index 1500 podążający za kursem. Tło
Dymka wymusza głęboki --teal-900 z mocnym wstrzyknięciem cieni (Drop shadow),
obrysem 1px --teal-700 dla ramy oraz czystą Bielą dla wyświetlanych w nim parametrów
finansowych uciętych do precyzyjnych miar.

7.4 Stany Ładowania i Skeleton Loaders (Klasy Pre-render)

Pojawienie się API uderza najpierw ekranami szkieletowymi (Skeleton Screens) o
bezwzględnych wymiarach chroniących Shift Layoutu. Aplikacja udostępnia klasy narzędziowe
(Utility tokens) do pokrywania pustych kontenerów, przygotowane do natychmiastowego
osadzenia przez inżyniera:

●

●

●

.skeleton-card: Reprezentuje zewnętrzny kontener komponentu (background:
var(--teal-800); border-radius: 12px; height: 100%;).
.skeleton-avatar: Symulacja portretu lub ikony (wymusza width: 40px; height: 40px;
border-radius: 50%; background: var(--teal-700);).
.skeleton-text: Listy odgórnych szyn tekstowych (wymusza height: 16px; border-radius:
4px; background: var(--teal-700); margin-bottom: 8px;). Dodatkowe warianty z
szerokościami: .w-1/2, .w-3/4.

●  Mechanizm "Shimmer" (Światło wędrujące): Każdy komponent z klasą .skeleton-*

posiada narzucony absolutnie element pseudo-wędrujący z wykorzystaniem transformacji
osi X (przyspieszenie układu GPU) renderując przepływający od lewej do prawej jasny
gradient na bazie szczytu --teal-600. Unikane jest proste miganie Opacity na rzecz fali
świetlnej.

8. Moduły Pływające: Dropdowny i Accordiony

●  Dropdown Menu: Pływają względem elementu aktywującego na 8px dystansu w z-1000.

Menu kontekstowe, np. przy opcjach 3 kropek.

●  Accordion (Rozwijane Listy): Stosowane w FAQ/Settings.

9. Stany Puste, Błędy, Utrata Sieci i Powiadomienia

9.1 Empty States (Stany Puste) & Abstrakcyjne 3D

Gdy użytkownik wchodzi do nowej sekcji (Brak Napiwków), układ ekranu przejmuje ilustracja 3D
(Styl Abstract Liquid) i tekst komunikatu (np. "Twój słoik jest jeszcze pusty") z Przyciskiem Akcji.

9.2 Strony Błędów 404, 500, Tryb Offline / Maintenance

●  Wielka typografia błędu (np. 404) z subtelną paralaksą.
●  Alert Offline: Pasek Sticky na dole, pastelowe, czerwone tło: "Jesteś w trybie Offline."

9.3 Powiadomienia Toast (Snackbars)

Ulotne komunikaty (12px promień). Znikają po 4s (pauzują licznik przy mouse-hover).
Swipe-to-dismiss na mobile. Akcenty barwne odpowiadają typowi powiadomienia.

10. Ekosystem Web3 i Funkcje Transakcyjne

10.1 Stany Połączenia Portfela (Wallet Connect)

●  Disconnected: Przycisk Primary/Secondary zlecający podłączenie.
●  Connecting: Modal z obrysem ładującym.
●  Connected: Pigułka wyświetlająca Hex (np. 0x1A...8Cd) z Identicon.
●  Wrong Network: Przycisk zmienia kolor na Pomarańcz i wymusza zmianę na właściwą

sieć Web3 w warstwie 2.

10.2 Biometria, 2FA i Potwierdzenia Transakcji

●  Transakcja Modal + Gas Fee: Dedykowane okno wysuwane. Oddzielenie kwoty głównej

na Złoto, opłata Gas Fee na Fiolet (estymacja fiat w czasie rzeczywistym).

●  WebAuthn / 2FA: Elementy biometryczne autoryzowane systemowo, wzmocnione o

wirtualny wyrys kciuka.

10.3 Dynamiczne Statusy Transakcji Blockchain

Śledzenie przepływu Blockchain, wymagające wzorców "Optimistic UI", aby powolność sieci
zewnętrznych nie zabiła immersji użytkownika.

●  Pending (Oczekująca): Tuż po wysłaniu API, transakcja uderza do tabeli. Towarzyszy jej
ikona małego zegara zdefiniowanego w kolorze informacyjnym --info-base (Cyjan). Ikona
wykonuje nieskończoną zapętloną animację @keyframes pulse, skacząc płynnie z
opacity 0.4 na 1.0 (co 800ms) sygnalizując, że transakcja mieli się w mempoolu.

●  Confirmed (Potwierdzona): Kiedy Webhook zrzuci uderzenie sukcesu, zegar

natychmiast pęka, płynnie transformując w Złoty Checkmark (--gold-400). Transformacji
towarzyszy mikro-błysk na tle wiersza oraz sprzętowy, twardy sygnał wibracyjny do
palców użytkownika na mobile (Success Tick Haptic Feedback).

●  Failed (Odrzucona): Odrzucenie bloku, utrata gazu lub błąd podpisu zamieniają ikonę w

czerwoną, krzyżową "X" (w kolorze --error-light). Transformacja rzuca gwałtowną,
wyliczoną na 300 milisekund fizyczną animacją drżenia poziomego "Shake" (w osi X o
piksele -4/4/0) przyciągając ostro wzrok użytkownika wraz z dwoma płaskimi,
negatywnymi uderzeniami wibracji urządzenia (Descend Haptic Bursts).

10.4 NFT Gallery i Claim Flow (Dowód Wsparcia)

Po udanym napiwku użytkownik nabywa prawo mincingu (Proof of Support). Generowanie bryły
3D na gradientowym złotym tle w "Claim Modalu".

11. Makro-Struktury i Główne Widoki Aplikacji

11.1 Pełny Onboarding Flow

Wieloetapowy kreator z odciętą nawigacją (Focus Mode). Animacja przejścia szyb
"Glassmorphism" w prawo.

11.2 Dashboard Analityczny i Wypłaty (Payout Flow)

●  Dashboard: Operuje na systemie Bento Grid, układy Skeleton na poszczególnych

kaflach, ładowane wodospadem.

●  Payout Flow: System suwaka proc. środków oraz selektora konta FIAT/Krypto z jawnymi

opłatami sieci.

11.3 Ustawienia (Settings) i Referral (Zaproszenia)

●  Settings: Lewy sidebar w tablet/desktop + akordeony do rozwijania preferencji konta.
●  Referral: Duży guzik kopiowania kodu powiązany z silnym haptycznym sprzężeniem oraz

toastem.

12. Globalna Deklaracja Design Tokens (Zmienne CSS)

Finalny, kompletny i gotowy do zrzutu i skopiowania w projekcie front-end blok kodu,
ujednolicający matematycznie całą paletę barw, przestrzeni i ruchu aplikacji w roku 2026. Blok
należy wstawić do głównego arkusza np. global.css w środowisku, na którym budowana jest
ramka.
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

