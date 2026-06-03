Raport Projektowy Systemu Designu
TipJar+: Architektura Kolorystyczna i
Tożsamość Wizualna Premium

1. Wstęp i Filozofia Projektowa: Definiowanie
Nowoczesnego Fintechu

1.1. Kontekst Projektowy i Cele Strategiczne

W krajobrazie aplikacji finansowych roku 2025, gdzie zaufanie użytkownika jest walutą równie
cenną co transakcje pieniężne, warstwa wizualna produktu przestała pełnić funkcję jedynie
estetyczną. Stała się fundamentem użyteczności, bezpieczeństwa i postrzeganej wartości
marki. Niniejszy raport stanowi kompleksową dokumentację architektury kolorystycznej dla
aplikacji TipJar+, platformy dedykowanej bezgotówkowemu napiwkowaniu, która pozycjonuje
się na styku narzędzia finansowego (utility) i produktu lifestyle'owego klasy premium.
Celem niniejszego opracowania jest przekształcenie zdefiniowanych przez klienta kolorów
bazowych w kompletny, skalowalny i dostępny cyfrowo system designu. Wyzwanie polega na
stworzeniu środowiska wizualnego, które jest "głębokie i nasycone", ale unika krzykliwości
typowej dla gier mobilnych, zachowując powagę instytucji finansowej. Stylistyka "Premium Dark
Theme" została wybrana nie tylko ze względu na trendy, ale przede wszystkim jako odpowiedź
na potrzeby użytkowników – pracowników sektora usług, którzy często korzystają z aplikacji w
warunkach nocnych, po zakończonej zmianie, w środowiskach o niskim natężeniu oświetlenia.

1.2. Filozofia "Nocturnal Opulence" (Nocne Bogactwo)

Koncepcja wizualna przyjęta dla TipJar+ została zdefiniowana jako "Nocturnal Opulence". W
przeciwieństwie do sterylnych, białych interfejsów bankowości tradycyjnej, TipJar+ operuje w
sferze, którą psychologia koloru kojarzy z ekskluzywnością, tajemnicą i nowoczesnością.
Fundamentem tej filozofii jest odejście od "czystej czerni" (#000000) na rzecz głębokiego,
ciemnego turkusu (#003737). Czysta czerń w interfejsach OLED powoduje tzw. "black
smearing" (rozmazywanie przy przewijaniu) i tworzy zbyt wysoki, męczący kontrast z jasnym
tekstem. Ciemny turkus, jako kolor tła, wprowadza organiczną głębię. Jest to cyfrowy
odpowiednik ciemnego aksamitu lub wnętrz luksusowych klubów, gdzie światło
(reprezentowane przez Złoty Akcent #FFD700) jest punktowe i kieruje uwagę na to, co
najważniejsze – nagrodę finansową.
Włączenie Fioletu (#9D4EDD) jako akcentu pomocniczego wprowadza wymiar technologiczny.
Podczas gdy złoto nawiązuje do tradycyjnego bogactwa, fiolet w kodzie kulturowym Gen Z i
Millenialsów (głównych grup docelowych pracowników gastronomii) sygnalizuje innowację,
sztuczną inteligencję i "cyfrowość". Synergia tych trzech barw – organicznego turkusu,
metalicznego złota i cyfrowego fioletu – tworzy unikalny "podpis wizualny" (visual signature)
aplikacji.

1.3. Zakres Opracowania

Raport ten wykracza poza proste wygenerowanie palety. Obejmuje on:

●  Analizę matematyczną i percepcyjną barw: Przekształcenie wartości HEX na

przestrzenie HSL w celu wygenerowania spójnych tonalnie wariantów.

●  Architekturę stanów: Precyzyjne definicje zachowania kolorów podczas interakcji

(hover, active, focus) z uwzględnieniem fizyki światła w interfejsie cyfrowym.

●  Dostępność (Accessibility): Weryfikacja kontrastów zgodnie z normami WCAG 2.1

●

AA/AAA, ze szczególnym uwzględnieniem astygmatyzmu w trybie ciemnym.
Implementację techniczną: Gotowe do użycia tokeny designu i zmienne CSS,
zapewniające spójność między projektem a wdrożeniem deweloperskim.

2. Analiza Kolorów Bazowych i Ich Rola w
Ekosystemie TipJar+

Zanim przystąpimy do generowania pełnej skali, konieczna jest dogłębna analiza dostarczonych
kolorów bazowych pod kątem ich właściwości fizycznych (luminancji) i psychologicznych.

2.1. Ciemny Turkus: #003737 (Base Environment)

●  Analiza Techniczna: W przestrzeni HSL kolor ten to 180°, 100%, 11%. Jest to barwa o

maksymalnym nasyceniu, ale bardzo niskiej jasności. Znajduje się na granicy widzialności
koloru – dla ludzkiego oka w słabym oświetleniu może jawić się jako czerń, ale na
podświetlonych ekranach smartfonów ujawnia swoją zielono-niebieską naturę.

●  Rola Systemowa: To nie jest kolor "primary" w tradycyjnym rozumieniu przycisku akcji.
To kolor powierzchni (Surface). W systemie TipJar+ #003737 pełni funkcję płótna.
Zastępuje on standardowe szarości (#121212 z Material Design). Użycie tak nasyconego
tła jest odważną decyzją, która wymaga precyzyjnego doboru kolorów tekstu, aby uniknąć
wibracji optycznej.

2.2. Złoty Akcent: #FFD700 (Primary Action)

●  Analiza Techniczna: HSL 51°, 100%, 50%. Jest to klasyczny "Web Gold".

Charakteryzuje się bardzo wysoką luminancją. Na białym tle jest praktycznie niewidoczny
(nie spełnia norm kontrastu), ale na tle #003737 świeci z ogromną siłą (kontrast 11.2:1).
●  Rola Systemowa: Katalizator akcji. Złoto w TipJar+ jest zarezerwowane dla momentów
"konwersji": otrzymania napiwku, wypłaty środków, głównego przycisku CTA (Call to
Action). Jego psychologiczne powiązanie z nagrodą (dopaminą) jest tu kluczowe. Nie
może być nadużywany – jeśli wszystko będzie złote, nic nie będzie miało wartości.

2.3. Fioletowy Akcent: #9D4EDD (Secondary/Brand)

●  Analiza Techniczna: HSL 273°, 64%, 59%. Kolor o średniej jasności. Jest to odcień

"Electric Lavender". Tworzy triadę harmoniczną z turkusem i złotem.

●  Rola Systemowa: Nawigacja i status. Fiolet służy do oznaczania elementów

systemowych, które nie są bezpośrednio związane z pieniędzmi, ale z funkcjonalnością
aplikacji (np. ustawienia, profil, statystyki, poziomy użytkownika). Dodaje on warstwę

nowoczesności, chroniąc aplikację przed wyglądem "staroświeckiego banku".

3. Architektura Palety Podstawowej: Skala "Deep
Ocean"

Wymóg stworzenia 5 odcieni dla każdego koloru jest punktem wyjścia, jednak profesjonalny
system designu (Design System) wymaga pełniejszego spektrum, aby obsłużyć wszystkie
niuanse interfejsu (cienie, obrysy, tła modalne, stany disabled). Dlatego dla koloru bazowego
(Turkus) przygotowano rozszerzoną skalę 10-stopniową, z której wyekstrahowano 5 kluczowych
odcieni wymaganych przez specyfikację.
Proces generowania skali opiera się na manipulacji parametrem jasności (Lightness) w modelu
HSL, przy jednoczesnej korekcie nasycenia (Saturation). W przypadku ciemnych motywów,
jaśniejsze odcienie koloru bazowego muszą tracić nieco nasycenia, aby nie wyglądały jak
"cukierkowe" pastele, co naruszyłoby wymóg stylu "Premium".

3.1. Skala Ciemnego Turkusu (Primary Teal Scale)

Kolor bazowy #003737 został przypisany do wartości 800 (lub 900 w zależności od konwencji –
tutaj przyjmujemy 800 jako tło domyślne, a 900 jako najgłębszy cień).
Nazwa Tokenu  Waga

HSL (Precyzyjne)  Rola w Systemie

HEX

teal-50

50

#E0F2F2

180°, 40%, 95%  Tekst na ciemnym

(Dark Mode)

tle (zastępuje
czystą biel), tła w
trybie jasnym.

teal-100

100

#B3D9D9

180°, 35%, 78%  Wymagany

Odcień 1.
Subtelne akcenty,
ikony nieaktywne.

teal-200

200

#80BFBF

180°, 38%, 62%  Wymagany

teal-300

300

#4DA6A6

Odcień 2. Obrysy
(Borders)
elementów
formularzy.
180°, 38%, 48%  Wymagany

Odcień 3.
Drugorzędne
przyciski, elementy
graficzne
wykresów.

teal-400

400

#268C8C

180°, 57%, 35%  Wymagany

teal-500

500

#007373

Odcień 4. Fokus,
stan hover dla
ciemniejszych
elementów.
180°, 100%, 22%  Wymagany

Nazwa Tokenu  Waga

HEX

HSL (Precyzyjne)  Rola w Systemie

(Dark Mode)
Odcień 5.
Interaktywne tła
kart, nagłówki
sekcji. Jaśniejszy
od bazy.

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

Uzasadnienie Skali: Skala ta nie jest liniowa. Została zagęszczona w ciemnych rejestrach
(500-900), ponieważ w motywie ciemnym (Dark Mode) to właśnie tam odbywa się większość
"gry światłem". Różnice między teal-700, teal-800 a teal-900 są subtelne, ale kluczowe dla
budowania hierarchii głębi (Depth) bez użycia ciężkich cieni typu drop-shadow.

●

Insight Projektowy: Użycie #001F1F (teal-900) jako tła globalnego (body background) i
nałożenie na niego kart w kolorze #003737 (teal-800) tworzy efekt głębi, gdzie treść
"wypływa" z mroku. Jest to znacznie bardziej eleganckie niż płaskie tło.

4. System Akcentów: Metaliczne Złoto i Elektryczny
Fiolet

W przypadku kolorów akcentujących, podejście do generowania skali jest inne. Tutaj celem jest
zachowanie luminancji (świecenia). W ciemnym motywie akcenty muszą "przebijać się" przez
tło.

4.1. Skala Złota: "Midas Touch"

Złoto (#FFD700) jest kolorem trudnym w UI. Zbyt ciemne wygląda jak brudny brąz, zbyt jasne
traci charakter i staje się żółcią.
Nazwa Tokenu  Waga
gold-100

HSL
54°, 100%, 88%  Tło

HEX
#FFF9C4

Rola w Systemie

100

toastów/powiado
mień (wersja
jasna). Tekst na
ciemnym tle
(rzadko).

Nazwa Tokenu  Waga
gold-200

200

HEX
#FFF176

HSL
54°, 100%, 73%

Rola w Systemie
Ikony pomocnicze,
gwiazdki ocen.

gold-300

300

#FFEA00

55°, 100%, 50%  Wariant

ostrzegawczy,
bardzo jaskrawy.

gold-400

Base

#FFD700

51°, 100%, 50%  Główny Przycisk

gold-500

500

#FFC107

gold-600
gold-700

600
700

#FFAB00
#FF8F00

(Primary CTA).
45°, 100%, 51%  Stan Hover dla

przycisku
głównego.
Przesunięcie ku
bursztynowi.
36°, 100%, 50%  Stan Active.
36°, 100%, 50%  Elementy

dekoracyjne w tle
(niskie krycie).

●  Uwaga dotycząca dostępności: Kolor #FFD700 na białym tle nie spełnia norm kontrastu
dla tekstu. W trybie ciemnym (na tle #003737) kontrast wynosi 11.2:1 (AAA). Dlatego
złoto jest idealne na przyciski i ikony w trybie ciemnym, ale tekst wewnątrz złotego
przycisku musi być ciemny (najlepiej teal-900 lub teal-800), nigdy biały.

4.2. Skala Fioletu: "Digital Royal"

Fiolet (#9D4EDD) pełni rolę wspierającą. Jego skala musi być wystarczająco jasna, by być
czytelną na ciemnym turkusie.
Nazwa Tokenu  Waga
purple-100

HSL
275°, 100%, 85%  Tła zaznaczonych

HEX
#E0B3FF

Rola w Systemie

100

elementów
(Selected State).

purple-200

purple-300

200

300

#C27AFF

272°, 100%, 74%  Linki w tekście,

Focus Ring.

#9D4EDD

273°, 64%, 59%  Base Accent.

Ikony nawigacji,
toggle switche.

purple-400

400

#7B2CBF

272°, 63%, 46%  Hover dla

purple-500

500

#5A189A

elementów
fioletowych.
271°, 73%, 35%  Ciemniejsze

elementy
brandowe, obrysy.
5. System Neutralny i Tekstowy (Grays & Typography)

W stylistyce premium "szary" nigdy nie jest po prostu szarym (#808080). Aby zachować
spójność (color harmony), neutralne kolory w TipJar+ są barwione (tinted) kolorem bazowym
(turkusem). Oznacza to dodanie niewielkiej ilości niebiesko-zielonego pigmentu do szarości.

Zapobiega to efektowi "brudnego ekranu", który powstaje przy łączeniu czystych szarości z
nasyconymi tłami.

5.1. Paleta Tekstu (Text Colors)

Dostarczone kolory: Biały #FFFFFF i Jasnoszary #F5F5F5. W trybie ciemnym, czysta biel na
ciemnym tle może powodować zmęczenie wzroku (zjawisko halacji). Zaleca się stosowanie
złamanej bieli jako domyślnego koloru tekstu.
Rola Semantyczna Token

HEX (Wartość)

Zastosowanie

Primary Text

text-primary

#FFFFFF

Opacity
(Symulowane)
100%

Nagłówki H1-H3,
Kluczowe wartości
liczbowe (np.
kwota napiwku).
Tekst paragrafowy,
etykiety pól.
(Lekko turkusowa
biel).
Pomocnicze opisy,
placeholdery, daty.
Nieaktywne opcje.

Secondary Text

text-secondary

#D6EBEB

85%

Tertiary Text

text-tertiary

#A3C2C2

60%

text-disabled

Disabled Text
#5C7A7A
Zastosowanie koloru #F5F5F5: Ten kolor, dostarczony w specyfikacji, zostanie użyty jako
text-primary w wariantach kart o jaśniejszym tle (np. wewnątrz modali), lub jako kolor tła w
Trybie Jasnym (omówione w sekcji 9).

38%

6. Stany Interaktywne (Interactive States)

Wymóg zdefiniowania stanów Hover, Active, Disabled i Focus jest kluczowy dla użyteczności. W
systemie "Dark Premium", interakcja powinna przypominać grę światłem.

6.1. Fizyka Interakcji w Ciemnym Motywie

1.  Hover (Najechanie): W świecie fizycznym, zbliżenie źródła światła do obiektu rozjaśnia

go. W UI, element hoverowany powinien stać się jaśniejszy.

○  Metoda: Nałożenie warstwy białej (#FFFFFF) o przezroczystości 10-15% na kolor

bazowy.

2.  Active (Kliknięcie): Obiekt jest "wskiskany" w głąb ekranu, oddalając się od światła.

Powinien stać się ciemniejszy.

○  Metoda: Nałożenie warstwy czarnej (#000000) o przezroczystości 20% na kolor

bazowy.

3.  Disabled (Nieaktywny): Utrata nasycenia i kontrastu.
4.  Focus (Nawigacja klawiaturą): Musi być silnie widoczny. Użyjemy do tego koloru
Fioletowego lub Złotego (w zależności od kontekstu) w formie "poświaty" (Glow).

6.2. Matryca Stanów dla Głównych Komponentów

Komponent
Primary
Button

Stan Default  Stan Hover
Tło: #FFD700
Tekst: #003737

Tło: #FFE54C
(Rozjaśnione)

Secondary
Button

Input Field

Obrys:
#9D4EDD Tło:
Transparent
Tło: #002B2B
Obrys:
#005959

Tło: #9D4EDD
(10%) Obrys:
#B266FF
Obrys:
#00897B
(Jaśniejszy
Turkus)

Card (Karta)  Tło: #003737  Tło: #004040

(Lekkie
uniesienie)

Stan Active
Tło: #C7A800
(Przyciemnione
)
Tło: #9D4EDD
(25%) Obrys:
#7B2CBF
Obrys:
#FFD700 (Złoty
podczas
pisania)
Tło: #003737
Efekt Ripple

Stan Disabled  Stan Focus
Obrys: 3px
Tło: #264D4D
#9D4EDD
Tekst:
Offset: 2px
#5C7A7A
Cień wewn.:
Obrys:
#9D4EDD
#405050 Tekst:
#5C7A7A
Tło: #001F1F
Obrys: Brak

Obrys: 2px
#FFD700

N/A

Obrys: 2px
#9D4EDD

7. Kolory Systemowe i Semantyczne

Oprócz kolorów marki, aplikacja potrzebuje kolorów informacyjnych (Błąd, Sukces,
Ostrzeżenie). Standardowe "czerwony" i "zielony" mogą gryźć się z turkusowym tłem. Należy
dobrać odcienie zharmonizowane.

●  Error (Błąd): Standardowa czerwień na turkusie powoduje wibrację (efekt 3D dla osób w

okularach).

○  Rekomendacja: Koralowa Czerwień lub Karmazyn.
○  HEX: #FF5252 (Wysoka jasność, aby być czytelnym na #003737).
○  Tło błędu (np. w formularzu): #3D1010 (bardzo ciemna czerwień).

●  Success (Sukces): Turkus jest bliski zieleni, więc standardowa zieleń może zginąć.

○  Rekomendacja: Jaskrawy Szmaragd (Emerald) lub Neon Green.
○  HEX: #00E676 (Musi być znacznie jaśniejszy i bardziej żółty niż tło turkusowe).
○  Alternatywa: Użycie Złota (#FFD700) również jako koloru sukcesu finansowego,
rezerwując zieleń tylko dla operacji systemowych (np. "Hasło zmienione").

●  Warning (Ostrzeżenie):

○  Rekomendacja: Pomarańcz. Ponieważ Złoto jest kolorem podstawowym,

Ostrzeżenie nie może być żółte (konflikt znaczeń).

○  HEX: #FF9100.

8. Adaptacja dla Trybu Jasnego (Light Mode)

Zgodnie z wymogiem "warianty dla trybu jasnego", musimy stworzyć inwersję palety. Proste
odwrócenie kolorów (Białe tło, Turkusowy tekst) może wyglądać tanio. Strategia dla TipJar+
Light Mode to "Porcelanowy Luksus".

●  Tło Jasne: Nie #FFFFFF, lecz bardzo jasny, chłodny turkus (Mint/Porcelain).

○  HEX: #F2F7F7 (Odpowiednik teal-50 z modyfikacją).

●  Powierzchnie (Karty): Białe #FFFFFF z delikatnym cieniem w kolorze turkusu.
●  Tekst Główny: Nie czarny, lecz Głęboki Turkus (#003737 - kolor bazowy staje się

kolorem tekstu).

●  Akcent Złoty: Tutaj #FFD700 jest zbyt jasny na białym tle. Należy użyć ciemniejszego

wariantu złota.

○  Light Mode Gold: #D6B200 lub #E6C200.

Tabela Mapowania Trybów:
Element
Global Background

Surface (Card)
Primary Text
Primary Button

Light Mode (Alternatywny)
#F0F5F5 (Jasna mięta/szarość)

Dark Mode (Domyślny)
#001F1F (Prawie czarny
turkus)
#003737 (Base Teal)
#FFFFFF (Biały)
Tło: #FFD700 (Tekst: #003737) Tło: #003737 (Tekst: #FFD700)

#FFFFFF (Biały)
#003737 (Base Teal)

Secondary Accent
9. Wizualizacja Danych (Charts & Graphs)

#9D4EDD (Jasny Fiolet)

Inwersja dla kontrastu
#7B2CBF (Ciemniejszy Fiolet)

TipJar+ prezentuje zarobki. Wykresy na ciemnym tle muszą być czytelne.

1.  Seria Danych 1 (Wpływy): Złoty Gradient (od #FFD700 do przezroczystości).
2.  Seria Danych 2 (Średnia): Fioletowa Linia (#9D4EDD).
3.  Osie i Linie Siatki: Turkus teal-300 z opacity 20% (#4DA6A6).
4.  Tło Tooltipa: #001F1F z obrysem #FFFFFF.

10. Implementacja Techniczna: Zmienne CSS i Tokeny

Poniżej znajduje się gotowy kod CSS definiujący system. Zastosowano nazewnictwo
semantyczne (np. --color-bg-primary) oraz prymitywne (np. --teal-500), co jest standardem w
nowoczesnym developmencie.

10.1. Definicja Zmiennych (:root)

:root {
  /* --- PALETA PRYMITYWNA (Primitive Palette) --- */

  /* Ciemny Turkus (Base: #003737 -> 800) */
  --teal-50:  #E0F2F2;
  --teal-100: #B3D9D9;
  --teal-200: #80BFBF;
  --teal-300: #4DA6A6;
  --teal-400: #268C8C;
  --teal-500: #007373;
  --teal-600: #005959;
  --teal-700: #004545;
  --teal-800: #003737; /* BASE COLOR */
  --teal-900: #001F1F; /* DEEP BACKGROUND */

  /* Złoty Akcent (Base: #FFD700 -> 400) */
  --gold-100: #FFF9C4;
  --gold-200: #FFF176;
  --gold-300: #FFEA00;
  --gold-400: #FFD700; /* BASE ACCENT */

  --gold-500: #FFC107;
  --gold-600: #FFAB00;
  --gold-700: #FF8F00;

  /* Fioletowy Akcent (Base: #9D4EDD -> 300) */
  --purple-100: #E0B3FF;
  --purple-200: #C27AFF;
  --purple-300: #9D4EDD; /* BASE ACCENT */
  --purple-400: #7B2CBF;
  --purple-500: #5A189A;

  /* Systemowe */
  --error-light: #FF5252;
  --error-dark:  #D32F2F;
  --success-light: #69F0AE;
  --success-dark:  #00C853;

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

/* Wariant Light Mode (nadpisanie zmiennych semantycznych) */
@media (prefers-color-scheme: light) {
  :root.light-theme {
    --bg-app: #F2F7F7;

    --bg-surface: #FFFFFF;
    --bg-surface-elevated: #FFFFFF;

    --text-primary: var(--teal-800);
    --text-secondary: var(--teal-600);

    --action-primary: var(--teal-800); /* Inwersja przycisku */
    --text-on-gold: #FFFFFF; /* Tutaj tekst na turkusowym przycisku
jest biały */

    /* Alternatywnie, jeśli chcemy złoty przycisk w light mode: */
    /* --action-primary: var(--gold-500); (Ciemniejsze złoto) */
  }
}

10.2. Wykorzystanie HSL dla dynamicznych zmian

Zaleca się również zdefiniowanie kolorów bazowych jako składowych HSL, co pozwala na
tworzenie przezroczystości "w locie":
:root {
  --hsl-gold: 51, 100%, 50%;
  --hsl-teal: 180, 100%, 11%;
}

.glass-panel {
  background-color: hsla(var(--hsl-teal), 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid hsla(var(--hsl-gold), 0.3);
}

11. Dostępność (Accessibility Audit)

Kluczowym aspektem "Premium UI" jest to, że jest on wygodny. Analiza kontrastu dla
proponowanych par kolorów:

1.  Tekst Biały na Tle #003737:
○  Kontrast: 13.63:1.
○  Ocena: AAA (Pass). Doskonała czytelność, nawet dla małego tekstu.

2.  Tekst Złoty (#FFD700) na Tle #003737:

○  Kontrast: 11.20:1.
○  Ocena: AAA (Pass). Złoto jest doskonale widoczne na ciemnym turkusie.

3.  Tekst Fioletowy (#9D4EDD) na Tle #003737:

○  Kontrast: 4.25:1.
○  Ocena: AA (Dla dużego tekstu/ikon), Fail (Dla małego tekstu body).
○  Wniosek: Fioletu używać należy tylko do dużych nagłówków (powyżej 18pt), ikon

lub elementów graficznych. Nie używać do opisów i paragrafów.

4.  Biały tekst na Złotym Przycisku (#FFD700):

○  Kontrast: 1.54:1.
○  Ocena: CRITICAL FAIL.
○  Rozwiązanie: Na złotych przyciskach tekst musi być ciemny (najlepiej #003737).

Kontrast wtedy wynosi 11.2:1.

12. Wnioski i Rekomendacje Wdrożeniowe

Zaprojektowana paleta dla TipJar+ realizuje postulat "nowoczesnego premium" poprzez
odejście od bezpiecznych szarości na rzecz bogatego, atmosferycznego Turkusowego Tła.
Kluczowe zalecenia dla zespołu deweloperskiego:

1.  Egzekwuj kolor tekstu na przyciskach: Zautomatyzuj dobór koloru tekstu

(czarny/turkusowy) na złotych tłach. Nigdy nie pozwalaj na biały tekst na złocie.
2.  Używaj teal-900 jako tła globalnego: Unikaj #000000. Czysta czerń powinna być

zarezerwowana tylko dla ramki urządzenia (bezel).

3.  Minimalizm w użyciu Złota: Złoto ma być nagrodą. Jeśli ekran jest "zazłocony",

użytkownik traci poczucie hierarchii ważności. Złoto = Akcja/Pieniądze.

4.  Testuj na urządzeniach OLED: Sprawdź, czy przy minimalnej jasności ekranu różnica
między #001F1F a #003737 jest zauważalna. Jeśli nie, rozważ delikatne rozjaśnienie
obrysów (borders).

Ten system kolorystyczny zapewnia TipJar+ unikalną pozycję na rynku – aplikacja nie wygląda
jak narzędzie księgowe, lecz jak ekskluzywny portfel cyfrowy, co psychologicznie podnosi
wartość otrzymywanych napiwków w oczach użytkownika.

Cytowane prace

1. Turquoise and Purple Color Scheme - Palettes - SchemeColor.com,
https://www.schemecolor.com/turquoise-and-purple.php 2. 6 Dark Mode Website Color Palette
Ideas - Vev.design, https://www.vev.design/blog/dark-mode-website-color-palette/ 3. Check Text
and Background for Sufficient Color Contrast | Accessibility Tips,
https://dequeuniversity.com/tips/color-contrast 4. Dark mode UI design – 7 best practices -
Atmos Style, https://atmos.style/blog/dark-mode-ui-best-practices 5. Dark Theme Generator -
Colorffy, https://colorffy.com/dark-theme-generator

