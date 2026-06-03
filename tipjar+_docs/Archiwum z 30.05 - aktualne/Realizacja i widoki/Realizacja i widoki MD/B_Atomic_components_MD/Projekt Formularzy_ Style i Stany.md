Architektura Ciemnego Trybu:
Kompleksowa Specyfikacja Systemu
Formularzy UI dla Środowisk o Wysokim
Kontraście (Deep Teal)

1. Wstęp: Paradygmat Nowoczesnych Interfejsów w
Trybie Ciemnym

W połowie lat dwudziestych XXI wieku projektowanie interfejsów użytkownika (UI) przeszło
znaczącą ewolucję, odchodząc od prostego odwrócenia kolorów na rzecz wyrafinowanych,
chromatycznych systemów "Dark Mode". Niniejszy raport stanowi wyczerpującą analizę i
specyfikację projektową dla zestawu pól formularzy osadzonych w środowisku głębokiego
turkusu (#004545). Dokument ten nie jest jedynie zbiorem wytycznych wizualnych, ale
dogłębnym studium ergonomicznym, technicznym i estetycznym, mającym na celu stworzenie
interfejsu klasy premium, który łączy minimalistyczną elegancję z rygorystycznymi wymogami
dostępności (WCAG 2.2).
Projektowanie formularzy w 2026 roku wymaga zrozumienia, że pole tekstowe nie jest
izolowanym bytem, lecz elementem szerszego ekosystemu interakcji. W kontekście ciemnego
tła (#004545) wyzwania związane z halacją tekstu, kontrastem obramowań i czytelnością
stanów krytycznych nabierają nowego wymiaru. Poniższa analiza integruje najnowsze trendy w
projektowaniu UI, w tym wykorzystanie mikrowstrząsów wizualnych (micro-interactions),
zaawansowanej typografii IBM Plex Sans oraz fizyki światła w cyfrowych przestrzeniach.

1.1 Ewolucja Ciemnych Motywów: Od OLED Black do Deep Teal

Początkowa fascynacja "czystą czernią" (#000000), napędzana oszczędnością energii w
matrycach OLED, ustąpiła miejsca podejściu "Nuanced Dark" (Zniuansowana Ciemność).
Czysta czerń powoduje zbyt wysoki kontrast z białym tekstem, prowadząc do szybszego
zmęczenia wzroku (astenopii) oraz efektu "smearing" (rozmycia) przy przewijaniu na niektórych
ekranach. Wybór koloru tła #004545 (Deep Teal) jest strategicznie doskonały. Jest to barwa o
niskiej luminancji, która jednak zachowuje charakter i głębię.
Z psychologicznego punktu widzenia, głęboki turkus łączy w sobie spokój zieleni z
profesjonalizmem i zaufaniem kojarzonym z kolorem niebieskim. W kontekście formularzy –
które często generują u użytkowników stres (np. przy płatnościach czy rejestracji) – tło to działa
łagodząco. Jednakże, wprowadzenie chromatycznego tła wymusza redefinicję wszystkich
kolorów pochodnych. Standardowe szarości, które działają na czerni, na turkusie będą
wyglądać na "brudne". Dlatego system kolorystyczny musi opierać się na mieszaniu barw
bazowych z bielą (tint) i czernią (shade), z zachowaniem odcienia (hue) turkusu.

1.2 Zakres Raportu i Metodologia

Raport obejmuje szczegółową anatomię następujących komponentów:

1.  Pola tekstowe (Inputs) – w wariantach 56px i 48px.
2.  Obszary tekstowe (Textarea) – z obsługą skalowania.
3.  Listy rozwijane (Select/Dropdown) – z uwzględnieniem elewacji w trybie ciemnym.
4.  Pola wyboru (Checkbox) – w formacie 20x20px.
5.  Przyciski opcji (Radio) – w formacie 20x20px.
6.  Przełączniki (Toggle Switch) – jako alternatywa dla checkboxów.

Analiza uwzględnia pełną macierz stanów: Default, Hover, Focus, Filled, Error, Success,
Disabled, ze szczególnym naciskiem na "złoty focus" i "czerwony błąd" w kontekście
turkusowego tła.

2. Inżynieria Koloru i Optyka Interfejsu

Podstawą tego systemu jest paleta kolorystyczna zdefiniowana przez użytkownika, która stawia
unikalne wyzwania w zakresie kontrastu i percepcji.

2.1 Analiza Spektralna Tła i Obramowań

Rola Semantyczna
Surface (Tło)

Wartość HEX
#004545

Opis Techniczny
Głęboki, nasycony
turkus.

Border
(Obramowanie)

#006666

Średni turkus.

Text Primary (Tekst)  #FFFFFF

Czysta biel.

Focus (Akcent)

#FFD700

Złoto (CSS Gold).

Error (Błąd)

#FFB4AB

Pastelowa czerwień
(rekomendowana).

Analiza Kontrastu
Baza odniesienia
(Luminancja względna
≈ 0.05).
Stosunek kontrastu do
tła: 1.2:1. To kluczowy
punkt krytyczny
projektu.
Stosunek kontrastu do
tła: 10.6:1 (AAA).
Doskonała czytelność.
Bardzo wysoki kontrast
i wibracja na turkusie.
Zamiast czystej
czerwieni, dla
zachowania
czytelności.

2.1.1 Problem "Subtelnego Obramowania" (#006666)

Wymóg użytkownika dotyczący obramowania w kolorze #006666 na tle #004545 generuje
stosunek kontrastu na poziomie zaledwie 1.2:1. Zgodnie z wytycznymi WCAG 2.1 (Non-text
contrast), elementy interfejsu użytkownika wymagają kontrastu 3:1. Oznacza to, że dla osoby
słabowidzącej lub przy korzystaniu z ekranu o niskiej jakości, granica pola formularza będzie
niewidoczna.
Strategia Rozwiązania: Aby zachować estetykę "minimalistyczną i subtelną" przy
jednoczesnym spełnieniu norm dostępności, nie możemy polegać wyłącznie na obramowaniu
jako jedynym wyznaczniku granic pola. Zastosujemy podejście hybrydowe:

1.  Wypełnienie Pola: Tło pola formularza pozostanie #004545, ale tło strony (na którym

znajduje się formularz) powinno być ciemniejsze (np. #002B2B lub #001F1F). Dzięki temu

cała bryła pola formularza będzie odcinać się od tła strony, a obramowanie #006666
będzie pełnić jedynie funkcję dekoracyjnego detalu ("subtelnego obramowania"), a nie
jedynego wyznacznika granic.

2.  Wewnętrzny Cień (Inner Shadow): Zastosowanie delikatnego cienia wewnętrznego
inset 0 1px 2px rgba(0,0,0,0.2) pomoże zdefiniować "wgłębienie" pola, wzmacniając
percepcję obszaru aktywnego bez konieczności pogrubiania obramowania.

2.2 Złoto i Fiolet: Psychologia Akcentów

Wprowadzenie złota (#FFD700) i fioletu (sugerowany #9D46FF lub #7C4DFF) jako kolorów
stanu Focus tworzy paletę o charakterze "Royal Dark".

●  Złoto (Gold): Jest to barwa o wysokiej luminancji, która na ciemnym turkusie działa jak
źródło światła. W stanie Focus, złota poświata (glow) symuluje efekt podświetlenia
krawędziowego, co jest bardzo pożądanym efektem w nowoczesnych interfejsach.

●  Fiolet (Purple): Fiolet leży blisko niebieskiego na kole barw, ale wprowadza nutę
tajemniczości i nowoczesności. Sugeruje się użycie fioletu dla elementów selekcji
(Checkboxy, Radio), podczas gdy złoto pozostanie zarezerwowane dla aktywnego stanu
edycji tekstu (Input Focus). Taki podział (Focus = Złoto, Selection = Fiolet) buduje
czytelną hierarchię informacji.

2.3 Czerwień w Ciemnym Trybie: Wyzwanie Walidacji

Użytkownik określił kolor błędu jako "czerwony". Jednak użycie standardowej czerwieni
#FF0000 na tle #004545 jest błędem projektowym. Zjawisko to, znane jako "chromostereopsis",
powoduje, że czerwony tekst wydaje się wibrować lub znajdować na innej głębokości niż tło, co
męczy wzrok. Dodatkowo, kontrast takiej pary jest bardzo niski.
Rekomendacja Ekspercka: Należy użyć odcienia "Error Light" lub "Pastel Red".
Rekomendujemy kolor #FFB4AB lub #FF897D. Te odcienie są postrzegane jako "czerwone" w
kontekście ciemnego tła, ale dzięki domieszce bieli (desaturacji i rozjaśnieniu) zapewniają
odpowiedni kontrast (powyżej 4.5:1 dla tekstu) i nie powodują wibracji optycznej. W dalszej
części raportu kolor ten będzie określany jako "Funkcjonalna Czerwień".

3. Typografia: IBM Plex Sans jako Fundament
Czytelności

Wybór kroju IBM Plex Sans jest decyzją strategiczną, doskonale wpisującą się w techniczny i
nowoczesny charakter projektowanego systemu.

3.1 Charakterystyka IBM Plex Sans w Formularzach

IBM Plex Sans to krój typu "Grotesque" z elementami humanistycznymi. Został zaprojektowany,
aby łączyć naturę ludzką z maszynową, co czyni go idealnym dla interfejsów wprowadzania
danych.

●  Otwartość Znaków (Open Counters): Litery takie jak 'c', 'e', 's' mają szerokie otwarcia.

W małych rozmiarach (np. etykiety 12px) zapobiega to zlewaniu się kształtów na
ciemnym tle, gdzie zjawisko "rozlewania się" (blooming) białych pikseli jest powszechne.

●  Wysokość X (X-Height): Plex posiada wysoką wysokość małych liter, co zwiększa

czytelność przy ograniczonej wysokości pola (48px).

●  Rozróżnialność Znaków: Wyraźne rozróżnienie między wielkim 'I', małym 'l' oraz cyfrą
'1' jest kluczowe przy wpisywaniu haseł czy kodów. Plex radzi sobie z tym wzorowo (np.
szeryfy przy 'I').

3.2 Hierarchia Typograficzna i Wagi

Dla zapewnienia lekkości interfejsu, rekomendujemy następujący system wag:

1.  Input Text (Wartość wprowadzana): Regular (400), 16px. Użycie 16px jest krytyczne dla
urządzeń mobilnych (iOS), aby zapobiec automatycznemu przybliżaniu (zoom) formularza
po aktywacji pola.

2.  Label (Etykieta): Regular (400) lub Medium (500), 14px (domyślnie) oraz 12px (po

przesunięciu/floating).

3.  Helper Text / Error Message: Regular (400), 12px.
4.  Button Text (wewnątrz formularza): SemiBold (600), 14px, Uppercase (opcjonalnie, dla

stylistyki technicznej).

Dla koloru tekstu podstawowego stosujemy 100% bieli (#FFFFFF) wyłącznie dla danych
wprowadzonych przez użytkownika. Dla etykiet (placeholderów) stosujemy biel z obniżonym
kryciem (np. 70% lub kolor #B2D8D8), aby wizualnie oddzielić dane od instrukcji.

4. Anatomia Pól Tekstowych (Input & Textarea)

Pola tekstowe stanowią trzon każdego formularza. Projektujemy je w estetyce "Minimalist Teal",
z naciskiem na subtelne detale.

4.1 Geometria i Wymiary

●  Wysokość (Duże): 56px. Jest to standard Material Design, pozwalający na wygodne
umieszczenie etykiety "Floating Label" (etykieta wewnątrz pola, która przesuwa się w
górę po aktywacji).

●  Wysokość (Standard): 48px. Bardziej kompaktowe, idealne dla gęstych pulpitów

nawigacyjnych (dashboardów).

●  Promień Zaokrąglenia (Border Radius): 6px. Wartość ta tworzy "miękki prostokąt". 6px

jest wystarczająco duże, by uniknąć agresywności ostrych rogów (0px-2px), ale
wystarczająco małe, by zachować profesjonalny, techniczny wygląd (w przeciwieństwie
do w pełni zaokrąglonych pól 24px+).

●  Padding Wewnętrzny: 16px w poziomie. Zapewnia oddech dla tekstu.

4.2 Szczegółowa Analiza Stanów (State Matrix)

4.2.1 Stan Domyślny (Default)

Pole w spoczynku. Musi sugerować interaktywność, ale nie dominować.

●  Tło: #004545.
●  Obramowanie: 1px solid #006666.
●  Etykieta (Label): Kolor #8DAAAA (złamana turkusem szarość), pozycja wyśrodkowana w

pionie (dla pustego pola).

●  Wskazówka Projektowa: Etykieta powinna mieć tak dobrany kolor, by spełniać wymóg

kontrastu (4.5:1), co przy #8DAAAA na #004545 jest osiągalne (ok. 5:1).

4.2.2 Stan Najechania (Hover)

Interakcja myszą. Użytkownik "badający" interfejs.
●  Zmiana: Subtelne rozjaśnienie granic i tła.
●  Tło: #004F4F (rozjaśnienie o 5%).
●  Obramowanie: #008888 (jaśniejszy turkus).
●  Kursor: text (I-beam).
●  Animacja: transition: all 0.2s ease-in-out. Płynne przejście jest kluczowe dla odczucia

"premium". Nagła zmiana koloru jest zbyt agresywna w ciemnym trybie.

4.2.3 Stan Aktywny (Focus) – "The Gold Standard"

Moment wprowadzenia danych. To tutaj realizujemy wymóg "Focus: złote".

●  Obramowanie: Zmiana koloru na #FFD700 (Złoto).
●  Poświata (Glow): Zamiast systemowego outline, stosujemy box-shadow dla efektu

neonowej poświaty.

○  Wartość CSS: 0 0 0 1px #FFD700, 0 0 0 4px rgba(255, 215, 0, 0.25).
○  Pierwszy cień tworzy ostrą krawędź, drugi tworzy miękką aureolę (halo).
●  Etykieta (Floating Label): Przesuwa się do górnej krawędzi (transformacja skali do

0.75), zmienia kolor na #FFD700 (Złoto).

●  Caret (Kursor tekstu): Również #FFD700. To detale budują spójność.

4.2.4 Stan Wypełniony (Filled)

Dane zostały wprowadzone, pole traci fokus.

●  Tło: Powrót do #004545 lub lekkie przyciemnienie #003E3E (sugerujące "zapisaną"

treść).

●  Obramowanie: #006666 (powrót do subtelnego).
●  Tekst: #FFFFFF (Biel).
●  Etykieta: Pozostaje zmniejszona u góry, kolor powraca do #8DAAAA lub #B2D8D8.

4.2.5 Stan Błędu (Error)

Walidacja negatywna.

●  Obramowanie: #FFB4AB (Funkcjonalna Czerwień).
●  Tekst Walidacji: Pojawia się pod polem w kolorze #FFB4AB.
●
●  Focus w stanie błędu: Jeśli użytkownik kliknie w błędne pole, poświata zmienia kolor na

Ikona: Opcjonalny wykrzyknik po prawej stronie pola.

czerwony: 0 0 0 4px rgba(255, 180, 171, 0.25).

●  Mikro-animacja: Delikatne potrząśnięcie (shake) w osi X (3-4 piksele) przy próbie

wysłania błędnego formularza.

4.2.6 Stan Sukcesu (Success)

Opcjonalny, ale pożądany przy walidacji inline (np. dostępność loginu).

●  Obramowanie: #006666 (bez zmian) lub #69F0AE (Jasna zieleń).
●
●  Tekst: #FFFFFF.

Ikona: Zielony "ptaszek" (Check) po prawej stronie.

4.2.7 Stan Zablokowany (Disabled)

Pole nieaktywne.

●  Krycie (Opacity): 0.4 lub 0.5 dla całego komponentu.
●  Tło: #003535 (Bardzo ciemne).
●  Obramowanie: Może zmienić styl na przerywany (dashed) dla silniejszego sygnału

wizualnego, lub pozostać solidne o niskim kontraście.

●  Kursor: not-allowed.

4.3 Textarea (Obszar Tekstowy)

Działa na tych samych zasadach co Input, z dodatkowymi uwagami:

●  Uchwyt zmiany rozmiaru (Resize Handle): Umieszczony w prawym dolnym rogu.

Powinien mieć kolor obramowania (#006666) lub tekstu zastępczego.

●  Pasek przewijania (Scrollbar): Standardowe systemowe paski przewijania (często

jasnoszare) zniszczą estetykę #004545. Należy je ostylować przy użyciu
pseudoelementów ::-webkit-scrollbar:
○  Tło (Track): Transparentne.
○  Suwak (Thumb): #006666 z zaokrągleniem, zmieniający się na #008888 po

najechaniu.

5. Komponenty Selekcji: Checkbox, Radio, Toggle

Elementy te wymagają precyzji "pixel-perfect", ponieważ przy wymiarach 20x20px każdy piksel
ma znaczenie. Tutaj wprowadzamy drugi kolor akcentowy – Fiolet, aby odróżnić stan wyboru od
stanu edycji.

5.1 Checkbox (Pole Wyboru)

●  Wymiary: Pudełko 20x20px. Obszar klikalny (Hit Area) min. 44x44px (realizowane przez

marginesy lub pseudoelementy).

●  Stan Unchecked:

○  Obramowanie: 2px solid #006666. (2px jest lepsze niż 1px dla małych elementów,

zwiększa czytelność).

○  Tło: Transparentne (przebija #004545).
○  Zaokrąglenie: 4px (skalowane proporcjonalnie do 6px z dużych pól).

●  Stan Hover:

○  Tło: Delikatna fioletowa lub turkusowa poświata wewnątrz (rgba(157, 70, 255, 0.1)).
○  Obramowanie: #008888.
●  Stan Checked (Zaznaczony):

○  Tło: Wypełnienie kolorem #7C4DFF (Fiolet) lub #FFD700 (Złoto).

■  Decyzja systemowa: Zgodnie z analizą w sekcji 2.2, użyjmy Złota (#FFD700)

dla spójności z Focusem, LUB Fioletu dla separacji. Biorąc pod uwagę

wymóg "Focus: złote/fioletowe", eleganckim rozwiązaniem jest: Checkbox
zaznaczony = Złote tło, Ciemny turkusowy ptaszek (#004545). Daje to
niesamowity kontrast (Ratio > 9:1).

○  Obramowanie: Brak (lub w kolorze wypełnienia).
○

Ikona: Checkmark (Vector SVG) w kolorze #004545.

●  Stan Focus:

○  Złota poświata (Ring) wokół checkboxa, oddzielona 2px odstępem (offset).

5.2 Radio Button (Przycisk Opcji)

●  Wymiary: Koło 20x20px.
●  Stan Unchecked:

○  Obramowanie: 2px solid #006666.
○  Tło: Transparentne.
○  Zaokrąglenie: 50% (pełne koło).

●  Stan Checked:

○  Obramowanie: 2px solid #FFD700 (Złoto).
○  Wypełnienie (Kropka): Koło o średnicy 10px w kolorze #FFD700, wyśrodkowane.
○  Pomiędzy obramowaniem a kropką widoczne tło #004545.

●  Analiza: Radio buttony ze złotym środkiem wyglądają niezwykle szlachetnie na

turkusowym tle, przypominając fizyczne diody LED lub złote styki.

5.3 Toggle Switch (Przełącznik)

Alternatywa dla checkboxa przy natychmiastowych akcjach (np. "Włącz powiadomienia").

●  Wymiary: Tor (Track) 36x20px, Suwak (Thumb) 16x16px.
●  Stan Off:

○  Tor: #002E2E (Bardzo ciemny turkus). Obramowanie 1px #006666.
○  Suwak: #006666 (Średni turkus). Pozycja: Lewo.

●  Stan On:

○  Tor: #7C4DFF (Fiolet). Tutaj fiolet sprawdza się doskonale jako sygnał

"Aktywności/Zasilania".

○  Suwak: #FFFFFF (Biel) lub #FFD700 (Złoto). Biel jest bezpieczniejsza i bardziej

standardowa. Pozycja: Prawo.

●  Animacja:

○  Suwak powinien mieć efekt "elastyczności" – lekko rozciągać się w poziomie

podczas ruchu.

6. Listy Rozwijane (Select) i System Elewacji

Komponent Select jest najbardziej złożonym elementem w trybie ciemnym, ponieważ jego
rozwinięta lista (Dropdown) musi unosić się nad resztą formularza. W jasnym trybie używamy
cienia. W ciemnym trybie cień na ciemnym tle jest niewidoczny.

6.1 Zasada "Światła jako Elewacji"

Zgodnie z Material Design 3, w trybie ciemnym wyższa elewacja (bliżej użytkownika) oznacza

jaśniejszy kolor powierzchni.

●  Warstwa 0 (Tło strony): #002B2B.
●  Warstwa 1 (Input Field): #004545.
●  Warstwa 2 (Dropdown Menu): #005555 (Rozjaśnienie o ok. 5-8%).

6.2 Anatomia Dropdownu

1.  Pole wyzwalacza (Trigger): Wygląda identycznie jak Input (wysokość 56px/48px), ale z

ikoną "Chevron Down" po prawej stronie.

○  Stan Focus: Otwiera listę i nakłada złotą poświatę na pole.

2.  Lista (Menu):

○  Tło: #005555.
○  Obramowanie: 1px solid #006666.
○  Cień: Mimo ciemnego tła, dodajemy mocny, rozmyty czarny cień (box-shadow: 0
8px 24px rgba(0,0,0,0.5)), aby odseparować listę od ewentualnych jaśniejszych
elementów pod spodem.

3.  Pozycje listy (Items):

○  Wysokość: 48px (min. 44px dla dotyku).
○  Stan Hover na pozycji: Tło #006666.
○  Stan Selected (Wybrany): Tekst #FFD700 (Złoto), Tło #004040, Ikona "Check" po

prawej.

7. Implementacja Techniczna (CSS Architecture)

Aby system był skalowalny i łatwy w utrzymaniu przez zespoły deweloperskie, specyfikację
należy przełożyć na zmienne CSS (Custom Properties). Poniżej przedstawiono architekturę
kodu niezbędną do uzyskania opisanych efektów.

7.1 Zmienne Systemowe

:root {
  /* Paleta Podstawowa */
  --color-surface-page: #002B2B;
  --color-surface-input: #004545;
  --color-surface-dropdown: #005555;

  /* Obramowania i Separatory */
  --color-border-subtle: #006666;
  --color-border-hover: #008888;

  /* Tekst */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #B2D8D8; /* Etykiety */
  --color-text-disabled: rgba(255, 255, 255, 0.38);

  /* Stany Aktywne */
  --color-focus-gold: #FFD700;

  --color-focus-ring: rgba(255, 215, 0, 0.35); /* 35% opacity */
  --color-accent-purple: #7C4DFF;

  /* Walidacja */
  --color-error: #FFB4AB;
  --color-error-bg: rgba(255, 180, 171, 0.1);
  --color-success: #69F0AE;

  /* Typografia */
  --font-stack: 'IBM Plex Sans', system-ui, sans-serif;

  /* Geometria */
  --radius-input: 6px;
  --height-large: 56px;
  --height-std: 48px;
}

7.2 Technika "Neon Glow" (CSS Box-Shadow)

Tradycyjne outline jest zbyt surowe. Aby uzyskać efekt "złotej poświaty", stosujemy warstwowe
cienie.
.input-premium:focus-within {
  border-color: var(--color-focus-gold);
  /* Trzy warstwy cienia dla głębi */
  box-shadow:
    0 0 0 1px var(--color-focus-gold),       /* Ostra krawędź
wewnętrzna */
    0 0 0 4px var(--color-focus-ring),       /* Główna poświata (halo)
*/
    0 0 12px rgba(255, 215, 0, 0.15);        /* Ambient light -
rozproszone światło */
  outline: none;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1),
border-color 0.2s;
}

7.3 Obsługa Autouzupełniania (Autofill)

Przeglądarki (szczególnie Chrome) narzucają własne style (często jasnoniebieskie tło) dla pól z
autouzupełnianiem, co niszczy ciemny motyw. Należy to nadpisać używając box-shadow inset.
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: #FFFFFF;
  -webkit-box-shadow: 0 0 0px 1000px #003E3E inset; /* Ciemne tło
wymuszone cieniem */

  transition: background-color 5000s ease-in-out 0s;
}

8. Dostępność i Walidacja (WCAG 2.2)

Projektowanie w ciemnym trybie z "subtelnymi obramowaniami" to balansowanie na krawędzi
dostępności. Poniższa tabela przedstawia weryfikację zgodności poszczególnych elementów.
Element

Kolor 1

Kolor 2

Ratio

Status WCAG
AA
PASS

Tekst inputa  #FFFFFF

#004545

10.6:1

Etykieta
(Label)

#B2D8D8

#004545

7.5:1

PASS

Obramowanie  #006666

#004545

1.2:1

FAIL

Focus Ring

#FFD700

#004545

9.4:1

PASS

Error Text

#FFB4AB

#004545

4.8:1

PASS

Komentarz
Ekspercki
Idealny
kontrast.
Dobra
czytelność
instrukcji.
Jako jedyny
wskaźnik
granic -
niedopuszczaln
e.
Focus jest
bardzo
wyraźny.
Pastelowa
czerwień
spełnia normy.

Strategia naprawcza dla obramowania: Ponieważ obramowanie #006666 nie spełnia
wymogu 3:1 (dla komponentów UI), polegamy na kontraście powierzchni. Umieszczenie inputa
#004545 na tle strony #002B2B daje kontrast ok. 1.2:1, co nadal jest niskie. Decyzja: Aby
system był w pełni dostępny, należy albo:

1.  Wzmocnić obramowanie: Użyć koloru #008888 (Ratio ~1.9:1) - nadal mało. Użyć

#26A69A (Ratio 3.5:1) - to jednak łamie zasadę "subtelności".

2.  Zastosować silniejszy kontrast tła: Tło strony #001515 vs Input #004545 daje lepszą

separację.

3.  Akceptacja ryzyka estetycznego: Jeśli projekt jest przeznaczony dla specyficznej grupy

(np. dashboardy wewnętrzne dla ekspertów), niski kontrast granic może być
akceptowalny, pod warunkiem, że etykiety i tekst są wyraźne. W tym raporcie
przyjmujemy, że "subtelne obramowanie" jest priorytetem estetycznym, ale
rekompensujemy to bardzo wyraźnym stanem Hover i Focus.

9. Przyszłość i Trendy (2026+)

Prezentowany system wybiega w przyszłość, uwzględniając nadchodzące technologie webowe.

9.1 CSS Container Queries

W 2026 roku standardem jest używanie container queries do sterowania wyglądem formularza.

Input w wąskim kontenerze (np. na sidebarze) automatycznie przełączy się z 56px na 48px i
ukryje etykietę floating na rzecz placeholdera, bez użycia media queries opartych na szerokości
ekranu.

9.2 Ambient Light Adaptation

Wykorzystując czujniki światła otoczenia (Ambient Light Sensor API), system może dynamicznie
dostosowywać nasycenie złotej poświaty. W ciemnym pokoju "glow" zostanie zredukowany, aby
nie oślepiać (zmniejszenie opacity cienia), natomiast w jasnym słońcu kontrast zostanie
maksymalnie podbity.

Podsumowanie i Wnioski

Opracowany system formularzy w kolorystyce Deep Teal stanowi syntezę sztuki wizualnej i
inżynierii użyteczności. Przełamuje on stereotypowe podejście do ciemnych motywów,
zastępując czerń i szarość bogatą, turkusową paletą, która buduje unikalną tożsamość marki.
Kluczowe filary sukcesu tego projektu to:

1.  Złoty Focus: Przekształcenie stanu aktywnego w moment "oświetlenia" interfejsu.
2.  Funkcjonalna Czerwień: Użycie pastelowego #FFB4AB zamiast agresywnego #FF0000

dla błędów.

3.  Typografia IBM Plex Sans: Zapewniająca techniczną precyzję i czytelność.
4.  Świadoma Elewacja: Wykorzystanie jasności (lightness), a nie tylko cienia, do

budowania hierarchii w osi Z.

Implementacja tego systemu wymaga precyzji w kodzie CSS, ale efekt końcowy – interfejs,
który jest jednocześnie kojący dla oka i niezwykle precyzyjny w działaniu – jest wart tego
wysiłku. Jest to design gotowy na wyzwania roku 2026 i późniejszych.

Cytowane prace

1. Dark Mode Design Trends for 2025: Should Your Startup Adopt It? - AlterSquare,
https://www.altersquare.io/dark-mode-design-trends-for-2025-should-your-startup-adopt-it/ 2.
Dark Mode Web Design | SEO & UX Trends for 2025,
https://designindc.com/blog/dark-mode-web-design-seo-ux-trends-for-2025/ 3. 10 Dark Mode UI
Best Practices & Principles for 2025 - Design Studio UI/UX,
https://www.designstudiouiux.com/blog/dark-mode-ui-design-best-practices/ 4. Dark Mode
Design: The Ultimate Guide 2025, https://tomthedesigner.com/dark-mode-design/ 5. Check Text
and Background for Sufficient Color Contrast | Accessibility Tips,
https://dequeuniversity.com/tips/color-contrast 6. Contrast Checker - WebAIM,
https://webaim.org/resources/contrastchecker/ 7. Styling checkboxes and radio buttons with
CSS - Kate Morley, https://iamkate.com/code/checkboxes-and-radio-buttons/ 8. Color Contrast -
Accessibility by Design - College of Health and Human Sciences,
https://www.chhs.colostate.edu/accessibility/best-practices-how-tos/color-contrast/ 9. IBM Plex
Sans Font Combinations & Similar Fonts - Typewolf, https://www.typewolf.com/ibm-plex-sans
10. 7 UI Animation Principles for Better Design - Motion The Agency,
https://www.motiontheagency.com/blog/principles-of-ui-animation 11. box-shadow - CSS - MDN
Web Docs - Mozilla,
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow 12.

Creating Glow Effects with CSS - Coder's Block,
https://codersblock.com/blog/creating-glow-effects-with-css/

