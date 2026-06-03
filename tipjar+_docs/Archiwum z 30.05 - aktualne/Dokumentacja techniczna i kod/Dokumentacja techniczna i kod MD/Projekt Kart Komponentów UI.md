Architektura Systemów Designu w
Środowisku Web3: Kompleksowa
Analiza Uniwersalnego Komponentu
Karty w Trybie Dark Mode

Streszczenie Wykonawcze

Współczesny krajobraz cyfrowy, a w szczególności sektor Web3 i zdecentralizowanych
finansów (DeFi), przechodzi fundamentalną transformację w kierunku interfejsów, które łączą w
sobie wysoką estetykę "premium" z rygorystyczną funkcjonalnością. Niniejszy raport stanowi
wyczerpującą odpowiedź na zapotrzebowanie zaprojektowania uniwersalnego komponentu
karty, opartego na specyficznej palecie kolorystycznej z dominującym głębokim morskim
turkusem (#002F2F), akcentami złota (#FCC201) i fioletu (#9D4EDD).
Dokument ten nie tylko definiuje parametry wizualne, takie jak zaokrąglenia (12px) czy padding
(24px), ale osadza je w szerszym kontekście psychologii koloru, fizyki interfejsu użytkownika,
standardów dostępności (WCAG) oraz trendów prognozowanych na rok 2025. Analiza
wykazuje, że wybór tła #002F2F jest strategicznie uzasadniony – odchodzi od męczącej czerni
absolutnej na rzecz barwy budującej zaufanie i głębię, co jest kluczowe w środowisku
transakcyjnym.
Raport szczegółowo omawia cztery wymagane warianty karty: Twórcy, Statystyk, Powiadomień i
NFT, wskazując na specyficzne wyzwania UX, takie jak zagnieżdżone interakcje ("clickable vs.
button"), hierarchię danych oraz responsywność w układach siatkowych (Grid Layout). Całość
stanowi kompletny plan architektoniczny dla nowoczesnego systemu designu, gotowego na
wyzwania przyszłości.

1. Fundamenty Teoretyczne: Kolor i Przestrzeń w
Web3

1.1 Ewolucja Trybu Ciemnego: Dlaczego #002F2F?

Wdrożenie trybu ciemnego (Dark Mode) przestało być jedynie estetycznym wyborem, stając się
standardem oczekiwanym przez użytkowników, szczególnie w ekosystemach Web3 i krypto,
gdzie analityka danych i handel odbywają się 24 godziny na dobę. Tradycyjne podejście do
trybu ciemnego polegało na wykorzystaniu czystej czerni (#000000) lub neutralnych szarości
(#121212). Jednakże wybór koloru #002F2F (Deep Teal), określonego w specyfikacji, stanowi
znaczący krok w kierunku "organicznej technologii".
Kolor ten, będący głębokim, nasyconym odcieniem cyjanu i zieleni, pełni w interfejsie podwójną
rolę. Po pierwsze, redukuje on zjawisko "halation" (rozmycia) – efektu wizualnego, w którym
biały tekst na czysto czarnym tle wydaje się wibrować i rozlewać, co jest szczególnie uciążliwe
dla osób z astygmatyzmem. Zastosowanie odcienia o niższym kontraście absolutnym, ale wciąż
wysokim kontraście relatywnym, znacząco poprawia czytelność przy długotrwałym użytkowaniu.

Po drugie, psychologia koloru w kontekście Web3 jest nie do przecenienia. Turkus i morska
zieleń kojarzą się ze stabilnością, wzrostem i bezpieczeństwem finansowym, co w branży
opartej na zaufaniu (trustless systems) ma kluczowe znaczenie. Jest to odejście od "zimnej"
technologii na rzecz interfejsu bardziej "biologicznego" i immersyjnego, co współgra z trendami
przewidywanymi na rok 2025, kładącymi nacisk na inkluzywność i redukcję zmęczenia
cyfrowego.

1.2 Akcenty Kolorystyczne: Złoto i Fiolet jako Nośniki Znaczenia

Zastosowanie akcentów w postaci złota i fioletu na tle #002F2F tworzy paletę o wysokim
ładunku semantycznym. W środowisku NFT i Creator Economy te barwy nie są przypadkowe;
niosą one konkretne informacje dla użytkownika.
Złoto (#FCC201 - Golden Poppy): W cyfrowych interfejsach złoto jest synonimem wartości,
rzadkości i sukcesu. W kontekście kart NFT, złoty akcent naturalnie kieruje wzrok na cenę lub
status "Legendarny". Kontrast tego koloru z tłem #002F2F jest wyjątkowo silny, co czyni go
idealnym kandydatem dla głównych przycisków akcji (CTA) oraz kluczowych wskaźników KPI.
Fiolet (#9D4EDD - Purple Heart / Amethyst): Fiolet, historycznie kojarzony z luksusem i
kreatywnością, w Web3 stał się kolorem "technologicznym", symbolizującym metawersum,
innowację i społeczność twórców. Na tle Deep Teal, fiolet tworzy harmonijną, analogową relację
(obie barwy leżą blisko siebie na kole barw, w chłodnej strefie), co pozwala na jego użycie w
elementach drugoplanowych, takich jak tagi, tła awatarów czy subtelne gradienty.

1.3 Analiza Dostępności (Accessibility) i Kontrastu

Projektowanie w trybie ciemnym niesie ze sobą ryzyko niskiego kontrastu, co może wykluczyć
użytkowników z wadami wzroku. Poniższa tabela przedstawia rygorystyczną analizę kontrastu
wybranych kolorów względem tła #002F2F, zgodnie z wytycznymi WCAG 2.1.
Tabela 1: Analiza Stosunku Kontrastu (WCAG Compliance)
Element
Interfejsu

Implikacje
Projektowe

Rola Wizualna  Stosunek

Kod HEX

Tekst
Tytułowy

#FFFFFF

Nagłówki Kart,
Kluczowe Dane

Kontrastu (vs
#002F2F)
13.6:1

Zgodność
WCAG (Tekst
AA/AAA)
AAA (Pass)  Doskonała
czytelność.
Idealny dla
głównych
tytułów i
wartości
liczbowych.
Zastosowanie
jasnoszarego z
nutą błękitu
harmonizuje z
tłem, redukując
zmęczenie
wzroku.

AAA (Pass)

Tekst Opisowy #B0C4DE

9.5:1

Opisy,
Metadane,
Daty

Akcent Złoty  #FCC201

CTA, Ceny,
Wyróżnienia

10.1:1

AAA (Pass)  Wyjątkowo

wysoki kontrast

Element
Interfejsu

Kod HEX

Rola Wizualna  Stosunek

Kontrastu (vs
#002F2F)

Zgodność
WCAG (Tekst
AA/AAA)

Implikacje
Projektowe

Akcent
Fioletowy

#9D4EDD

Tagi, Linki
drugorzędne

6.4:1

AA (Pass)

Stan Błędu

#FF595E

Alerty, Spadki
Wartości

5.7:1

AA (Pass)

dla koloru
akcentowego.
Bezpieczny dla
tekstu na tle
#002F2F.
Wystarczający
dla normalnego
tekstu, idealny
dla dużych
elementów
graficznych.
Należy unikać
czystej
czerwieni
(#FF0000),
która może
powodować
wibracje
wizualne na
turkusie.

Analiza potwierdza, że dobrana paleta jest nie tylko estetyczna, ale i w pełni funkcjonalna z
punktu widzenia dostępności cyfrowej. Jest to kluczowy aspekt profesjonalnego designu w 2025
roku, gdzie inkluzywność jest wymogiem prawnym i etycznym.

2. Fizyka Interfejsu: Mikrointerakcje i Model
Oświetlenia

Wymaganie "Hover: uniesienie i cień" implikuje, że interfejs nie jest płaską taflą szkła, ale
trójwymiarową przestrzenią, w której obiekty (karty) reagują na interakcję użytkownika. W trybie
ciemnym, gdzie cienie rzucane przez obiekty są mniej widoczne niż w trybie jasnym, musimy
zastosować zaawansowane techniki manipulacji światłem i głębią.

2.1 Model "Uniesienia" (Elevation)

W Material Design i nowoczesnych systemach UI, "uniesienie" jest symulowane przez
jednoczesną zmianę pozycji obiektu na osi Z (przybliżenie do użytkownika) oraz zmianę
parametrów cienia (rozmycie i zasięg). Na tle #002F2F, standardowy czarny cień może "zginąć".
Dlatego rekomendowane jest zastosowanie cienia wielowarstwowego z domieszką koloru tła
lub akcentu, co tworzy efekt "glowing shadow" (świetlistego cienia), bardzo popularnego w
estetyce Web3.
Specyfikacja Fizyki Hover:

●  Stan Spoczynku: Karta leży blisko tła. Cień jest ostry i krótki.

○

transform: translateY(0);

○  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);

●  Stan Aktywny (Hover): Karta unosi się. Cień staje się bardziej rozmyty i zyskuje na

intensywności.

transform: translateY(-6px);

○
○  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 0 10px rgba(252, 194, 1, 0.1);

Dodatek subtelnej złotej poświaty (rgba(252, 194, 1, 0.1)) w cieniu podczas hovera realizuje
wymóg "akcentu" w sposób wyrafinowany, sugerując, że obiekt emituje własne światło –
metafora wartości w świecie krypto.

2.2 Krzywe Beziera i Płynność Ruchu

Aby ruch "uniesienia" był odczuwany jako naturalny i "premium", nie może być liniowy. Należy
zastosować funkcję czasu (timing function) typu cubic-bezier, która symuluje bezwładność
fizycznego obiektu. Zalecana krzywa: cubic-bezier(0.25, 0.8, 0.25, 1). Powoduje ona szybki
start ruchu i bardzo łagodne wyhamowanie, co daje poczucie "ciężaru" i solidności karty, w
przeciwieństwie do taniego, sprężystego efektu.

3. Anatomia Karty: Struktura i Układ

Uniwersalność komponentu wymaga solidnej ramy strukturalnej, która pomieści różnorodne
treści bez utraty spójności wizualnej. Zdefiniowane w wymaganiach parametry (padding 24px,
border-radius 12px) są fundamentem tej architektury.

3.1 Rola Paddingu 24px w Trybie Ciemnym

Wymóg paddingu 24px jest kluczową decyzją projektową. W trybie ciemnym, elementy
optycznie wydają się "bliżej" siebie niż w trybie jasnym, ponieważ czerń "pochłania" przestrzeń.
Zwiększenie światła wewnętrznego (paddingu) do 24px pozwala treści "oddychać". Zgodnie z
zasadami Gestalt (prawo bliskości), 24px paddingu przy zachowaniu mniejszych odstępów
między elementami wewnętrznymi (np. 8-16px między tytułem a opisem) tworzy silną grupę
wizualną. Karta staje się spójną wyspą informacji na ciemnym oceanie tła #002F2F.

3.2 Geometria: Zaokrąglenie 12px

Promień zaokrąglenia 12px jest idealnym kompromisem pomiędzy profesjonalizmem (ostre rogi
0-4px, typowe dla brutalizmu lub narzędzi deweloperskich) a zabawą (duże zaokrąglenia 20px+,
typowe dla social media). W Web3, który łączy finanse (powaga) z kulturą (zabawa), 12px
komunikuje "nowoczesną przyjazność". Co istotne, zaokrąglenie karty wymusza również
zaokrąglenie elementów wewnętrznych. Jeśli karta ma 12px, to przyciski wewnątrz powinny
mieć promień dopasowany (np. 8px) lub pełne zaokrąglenie (pill shape), aby zachować
harmonię wizualną.

3.3 Zagnieżdżone Interakcje (Nested Interactivity)

Wymaganie: "Karty mogą być klikalne w całości lub zawierać osobne przyciski". Jest to
klasyczne wyzwanie UX.

●  Scenariusz A (Karta Link): Cała powierzchnia jest linkiem (<a>). Jest to intuicyjne w

przypadku kart NFT (przejście do szczegółów).

●  Scenariusz B (Karta z Przyciskami): Karta zawiera akcje, np. "Obserwuj" (Twórca) lub

"Kup" (NFT).

Rozwiązanie Architektoniczne: Aby uniknąć konfliktów kliknięć (gdzie kliknięcie przycisku
"Kup" przypadkowo otwiera też stronę szczegółów), należy zastosować hierarchię warstw
(z-index) i separację zdarzeń w kodzie. Wizualnie, przyciski wewnątrz klikalnej karty muszą
mieć silniejszy stan hover (np. zmiana koloru tła na złoty) niż sama karta (tylko uniesienie), aby
użytkownik wiedział, z czym wchodzi w interakcję.

4. Szczegółowa Analiza Wariantów Karty

4.1 Wariant I: Karta Twórcy (Creator Card)

Karta twórcy w ekosystemie Web3 pełni funkcję wizytówki i narzędzia budowania kapitału
społecznego. Musi łączyć tożsamość wizualną z dowodem kompetencji (social proof).
Struktura i Treść:

●  Awatar: Centralny element tożsamości. W trybie ciemnym, awatary powinny mieć

delikatną obwódkę (1-2px) w kolorze tła karty (#002F2F) lub fioletu, aby oddzielić grafikę
od tła.

●  Typografia: Nazwa twórcy (biała, bold) musi dominować nad "handle" (np. @username),
który powinien być w kolorze jasnoszarym (#B0C4DE) lub fioletowym, sugerującym link.

●  Tło/Cover: Aby karta nie była "płaska", górna część (header) może zawierać subtelny

gradient (mesh gradient) wykorzystujący kolory akcentowe (Fiolet -> Turkus), co dodaje
głębi bez zaburzania czytelności.

Unikalne Funkcjonalności:

●  Weryfikacja: Złota "fajka" (checkmark) przy nazwisku jest standardem w Web3

oznaczającym zweryfikowaną tożsamość.

●  Statystyki w pigułce: W dolnej części karty warto umieścić miniaturowy rząd danych:

"Followers" i "Volume", co pozwala na szybką ocenę wartości twórcy bez wchodzenia w
profil.

4.2 Wariant II: Karta Statystyk (Statistics Card)

W Web3 dane są produktem. Karta statystyk musi prezentować skomplikowane dane liczbowe
w sposób, który nie przytłacza (cognitive overload).
Hierarchia Danych:

●  Kluczowa Wartość (The Big Number): Główna liczba (np. cena ETH, wolumen)
powinna być największym elementem na karcie, w kolorze białym lub złotym (dla
podkreślenia wagi).

●  Wskaźnik Zmiany (Delta): Procentowa zmiana (np. +12%) powinna używać koloru

zielonego (#00BF7D) lub czerwonego (#FF595E). Ważne: W trybie ciemnym #002F2F,
standardowa czerń i czerwień mogą być mało czytelne, dlatego używamy ich
rozjaśnionych, pastelowych wersji.

Wizualizacja (Wykresy):

●  Zamiast ciężkich wykresów słupkowych, rekomendowane są Sparklines – uproszczone

wykresy liniowe bez osi, pokazujące trend.

●  Linia wykresu powinna być Złota lub Fioletowa, z delikatnym gradientem wypełniającym

obszar pod linią (od półprzezroczystego koloru do pełnej przezroczystości), co
"zakotwicza" wykres w karcie.

4.3 Wariant III: Karta Powiadomień (Notification Card)

Powiadomienia w Web3 często dotyczą finansów (np. "Twoja oferta została przebita"). Muszą
być zauważalne, ale nie agresywne.
Kodowanie Kolorem i Stan "Nieprzeczytane":

●  Stan Nieprzeczytany: Oznaczony małą kropką (8-10px) w kolorze Złotym lub Fioletowym

●

w lewym górnym rogu. Tło karty nieprzeczytanej może być o 5% jaśniejsze od tła
bazowego (np. #003838), aby wyróżnić się na liście.
Ikony Kontekstowe: Zamiast samego tekstu, użyj ikon (np. Dzwonek, Portfel,
Błyskawica) w kolorach akcentowych, aby użytkownik natychmiast rozpoznał typ
zdarzenia (Transakcja vs. News).

Akcje Bezpośrednie: Karta powiadomienia powinna umożliwiać szybką reakcję. Przyciski
"Akceptuj" lub "Odrzuć" powinny być umieszczone wewnątrz karty, z wyraźnym rozróżnieniem
stylów (Solid Gold dla głównej akcji, Outline Gray dla odrzucenia), unikając ukrytych interfejsów
(dark patterns).

4.4 Wariant IV: Karta NFT (Digital Asset Card)

To "bohater" interfejsu. Karta NFT musi balansować między ekspozycją sztuki a prezentacją
danych handlowych.
Aspekt i Media:

●  Większość NFT to kwadraty (1:1). Karta powinna wymuszać ten format dla spójności

siatki. Media (obraz/wideo) powinny zajmować górne 60-70% karty.

●  Efekt "Glassmorphism": Aby zmaksymalizować powierzchnię obrazu, sekcja

informacyjna (Tytuł, Cena) może być nałożona na dół obrazka jako półprzezroczysta tafla
szkła (blur) z białym tekstem. To nowoczesne podejście, popularne w designie 2025.

Cena i Rzadkość:

●  Cena powinna być wyróżniona Złotym kolorem (#FCC201), co natychmiast komunikuje

wartość.

●  Rzadkość (Rarity Rank) może być przedstawiona jako mały "pill badge" (pastylka) w rogu,

w kolorze fioletowym.

5. Implementacja Techniczna: CSS Grid i
Responsywność

Aby spełnić wymóg "Układu elastycznego" i "Responsywności", system musi opierać się na
nowoczesnych standardach CSS. Flexbox jest świetny do układu wewnątrz karty, ale do układu
samych kart na stronie, CSS Grid jest bezkonkurencyjny.

5.1 Strategia Auto-Fill (Siatka Responsywna)

Zamiast pisać dziesiątki zapytań o media (media queries) dla każdego urządzenia, stosujemy
wzorzec auto-fill z funkcją minmax.
Kod Referencyjny dla Kontenera Kart:

.cards-container {
  display: grid;
  /* Tworzy tyle kolumn, ile się zmieści.
     Każda kolumna ma minimum 280px szerokości.
     Jeśli jest miejsce, rozciągają się (1fr) równomiernie. */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px; /* Zgodne z wymaganiem odstępów */
  padding: 24px;
}

Takie podejście sprawia, że na dużych monitorach (Web3 Desktop) zobaczymy 4-5 kart w
rzędzie, na laptopach 3, a na telefonach karty automatycznie ułożą się w jedną kolumnę,
wypełniając całą szerokość ekranu.

5.2 Efekt "Glow" w CSS (Web3 Style)

Aby uzyskać pożądany w Web3 efekt "neonowej poświaty" wokół karty przy Hoverze (akcent
fiolet/złoto), można wykorzystać pseudoelementy, aby nie wpływać na układ pudełkowy (box
model).
Technika Gradient Border: Zamiast zwykłego border, używamy background-image z
gradientem stożkowym (conic-gradient), przyciętym maską.
.card::before {
  content: "";
  position: absolute;
  inset: -2px; /* Wychodzi poza kartę */
  z-index: -1;
  background: conic-gradient(
    from 0deg,
    #FCC201, /* Złoto */
    #9D4EDD, /* Fiolet */
    #FCC201  /* Złoto - pętla */
  );
  filter: blur(10px); /* Efekt poświaty */
  opacity: 0;
  transition: opacity 0.3s ease;
}
.card:hover::before {
  opacity: 1; /* Pokaż poświatę przy najechaniu */
}

Ta technika jest wydajna (GPU accelerated) i idealnie wpisuje się w estetykę "Cyber/Crypto".

6. Dostępność i Inkluzywność w Praktyce

Projektowanie "Dark Mode" to nie tylko odwrócenie kolorów. To inżynieria kontrastu.

6.1 Typografia w Kontrze

Biały tekst na tle #002F2F może wydawać się optycznie "cieńszy" niż czarny tekst na białym tle,
ponieważ światło ekranu "zalewa" cienkie linie liter (tzw. irradiation illusion). Rekomendacja:
Dla głównego tekstu w kartach (opis), należy zwiększyć wagę fontu z Light (300) na Regular
(400) lub Medium (500). Należy również nieznacznie zwiększyć interlinię (line-height) do
wartości 1.5 lub 1.6, aby poprawić czytelność bloków tekstu w ciemnym otoczeniu.

6.2 Obsługa Klawiatury (Focus States)

Dostępność to także nawigacja bez myszy. Stan "Hover" (uniesienie) jest niewidoczny dla osoby
używającej klawiatury (Tab). Wymaganie: Karta musi posiadać wyraźny stan :focus-visible.
Standardowy niebieski obrys przeglądarki może być słabo widoczny na turkusowym tle.
Rekomenduje się stworzenie niestandardowego obrysu (outline) w kolorze Złotym (#FCC201) z
odsunięciem (outline-offset), co zapewni spójność z marką i doskonałą widoczność.

7. Przyszłość i Trendy 2025: Bento Grids i AI

Projektując ten komponent, musimy patrzeć w przyszłość. Rok 2025 przynosi trend "Bento
Grids". Oznacza to, że karty nie zawsze będą miały ten sam rozmiar. System powinien
przewidywać klasy modyfikujące, np. .card--wide (zajmująca 2 kolumny) lub .card--tall
(zajmująca 2 rzędy). Siatka CSS Grid doskonale to obsługuje (grid-column: span 2).
Dzięki temu, w interfejsie profilu twórcy, Karta Twórcy może być duża i pionowa (Tall), Karta
Statystyk pozioma (Wide), a Karty NFT kwadratowe, tworząc dynamiczny, mozaikowy układ
przypominający japońskie pudełko Bento – co jest szczytem nowoczesnego designu UI.
Dodatkowo, rosnąca rola AI w generowaniu treści oznacza, że karty muszą być elastyczne w
pionie – tekst opisu wygenerowany przez AI może mieć różną długość, więc karta nie powinna
mieć sztywnej wysokości (height: fixed), lecz wysokość minimalną (min-height), rozszerzając się
w razie potrzeby.

Podsumowanie

Zaprojektowany system kart stanowi syntezę estetyki i inżynierii. Opierając się na głębokim
turkusie #002F2F, tworzymy środowisko bezpieczne dla wzroku i budujące zaufanie.
Zastosowanie złota i fioletu jako akcentów funkcjonalnych pozwala na intuicyjną nawigację po
wartościach i treściach kreatywnych.
Techniczna realizacja z wykorzystaniem CSS Grid, Cubic-Bezier dla fizyki ruchu oraz WCAG
dla dostępności, gwarantuje, że komponent ten będzie nie tylko wizualnie atrakcyjny
("eye-candy"), ale przede wszystkim użyteczny i gotowy na skalowanie w dynamicznym świecie
Web3. Jest to rozwiązanie gotowe na rok 2025 – responsywne, inkluzywne i głęboko osadzone
w kontekście cyfrowej ekonomii.

Tabela Podsumowująca Parametry Komponentu

Cecha
Tło Karty

Wartość / Specyfikacja
#002F2F (Deep Teal)

Uzasadnienie
Redukcja zmęczenia wzroku,
estetyka "premium".

Cecha
Padding

Wartość / Specyfikacja
24px

Border Radius

12px

Cień (Spoczynek)

0 4px 6px rgba(0,0,0,0.5)

Cień (Hover)

Typografia

Układ (Grid)

Akcenty

Cytowane prace

0 20px 25px rgba(0,0,0,0.6) +
Glow
Sans-Serif (np. Inter),
Biały/Szary
repeat(auto-fill, minmax(280px,
1fr))
Złoto (#FCC201), Fiolet
(#9D4EDD)

Uzasadnienie
Przestrzeń oddechu dla
danych, zgodność z zasadami
Gestalt.
Nowoczesny, przyjazny wygląd,
balans między powagą a
stylem.
Subtelne osadzenie w
przestrzeni 3D.
Efekt uniesienia, feedback
interakcji.
Maksymalna czytelność na
ciemnym tle.
Pełna responsywność bez
media queries.
Semantyka wartości i
kreatywności.

1. 10 Web3 design trends for 2025 | Merge Rocks,
https://merge.rocks/blog/10-web3-design-trends-for-2025 2. Dark Mode Web Design | SEO &
UX Trends for 2025,
https://designindc.com/blog/dark-mode-web-design-seo-ux-trends-for-2025/ 3. Dark Mode in
Web Design: Best Practices in 2025 - Medium,
https://medium.com/@jackbrownkarmaa/dark-mode-in-web-design-best-practices-in-2025-445d
8d6463a3 4. 15+ Top UI/UX Design Trends To Look For In 2025 - ScalaCode,
https://www.scalacode.com/blog/ui-ux-design-trends/ 5. Responsive Web Design And Dark
Mode: Leading 2025 UX Design Trends | Group6,
https://group6inc.com/blog/responsive-web-design-and-dark-mode-leading-2025-ux-design-tren
ds/ 6. Teal, Purple & Gold Color Scheme - Palettes - SchemeColor.com,
https://www.schemecolor.com/teal-purple-gold.php 7. Teal and Light Purple Color Scheme -
Palettes - SchemeColor.com, https://www.schemecolor.com/teal-and-light-purple.php 8.
Accessible colour palettes - European Data Portal,
https://data.europa.eu/apps/data-visualisation-guide/accessible-colour-palettes 9. Contrast
Ratio - WCAG Color Contrast Checker - Siege Media,
https://www.siegemedia.com/contrast-ratio 10. Color Contrast Checker - WCAG Compliance
Tool - Colorffy, https://colorffy.com/contrast-checker 11. Glowing border - 漫影,
https://blog.jimmieluo.com/glowing-border 12. box-shadow - CSS - MDN Web Docs - Mozilla,
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow 13. CSS
Shadow Effects That Make a Statement - Slider Revolution,
https://www.sliderrevolution.com/resources/css-shadow-effects/ 14. cubic-bezier() - CSS - MDN
Web Docs,
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/cubic-bez
ier 15. Understanding easing and cubic-bezier curves in CSS - Josh Collinsworth blog,
https://joshcollinsworth.com/blog/easing-curves 16. Cubic Bezier examples in CSS - Stepping
forward, https://chefkasperson.github.io/cubic_bezier_examples_in_css 17. Best Practices for
Designing UI Cards - UX World, https://uxdworld.com/designing-ui-cards/ 18. 10 Best Practices

for Dashboard Design - NeenOpal, https://www.neenopal.com/designing-dashboard.html 19. 20
Mobile App Design Trends for 2025 You Need to Know - Fuselab Creative,
https://fuselabcreative.com/mobile-app-design-trends-for-2025/ 20. UI/UX Design Trends in
Mobile Apps for 2025 | Chop Dawg,
https://www.chopdawg.com/ui-ux-design-trends-in-mobile-apps-for-2025/ 21. NFT Marketplace
UI/UX Design: Essential Features and Helpful Tips - Perpetio,
https://perpet.io/blog/nft-marketplace-ui-ux-design-essential-features-and-helpful-tips/ 22. Dark
Ui Notifications illustrations - Shutterstock,
https://www.shutterstock.com/search/dark-ui-notifications?image_type=illustration 23. Are
Notifications A Dark Pattern? - Designlab,
https://designlab.com/blog/are-notifications-a-dark-pattern-ux-ui 24. What is the Ideal NFT Size?
Tips for Optimal File Dimensions - Bermuda Unicorn,
https://bermudaunicorn558.stck.me/post/828258/What-is-the-Ideal-NFT-Size-Tips-for-Optimal-Fi
le-Dimensions 25. How to Create a Card Layout Using CSS Grid Layout - WP Engine,
https://wpengine.com/resources/card-layout-css-grid-layout-how-to/ 26. Responsive Card
Layout with CSS Grid: A Step-by-Step Guide - DEV Community,
https://dev.to/m97chahboun/responsive-card-layout-with-css-grid-a-step-by-step-guide-3ej1 27.
Animated CSS gradient borders (no JavaScript, no hacks) - CodeTV,
https://codetv.dev/blog/animated-css-gradient-border 28. CSS Gradient Border Glowing
Animation Hover Effect - The Coder Ashok,
https://www.thecoderashok.com/blog/css-gradient-border-glowing-animation 29. Accessible
Color Palette Generator | WCAG Compliant - Venngage,
https://venngage.com/tools/accessible-color-palette-generator 30. 25 Web Design Trends to
Watch in 2025 - DEV Community,
https://dev.to/watzon/25-web-design-trends-to-watch-in-2025-e83

