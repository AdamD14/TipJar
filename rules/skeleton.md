# **Zaawansowana Inżynieria Stanów Ładowania: Kompleksowa Analiza Projektowa i Implementacja Wskaźników Typu Spinner oraz Skeleton Screen**

## **1\. Wstęp: Psychofizyka Czasu Oczekiwania i Paradygmaty Ładowania**

Współczesna inżynieria interfejsów użytkownika (UI) wykracza daleko poza statyczną estetykę, wkraczając w obszar kognitywistyki i psychologii percepcji czasu. Czas oczekiwania na reakcję systemu nie jest jedynie pustą przerwą w interakcji; jest aktywnym stanem poznawczym, który determinuje ocenę wydajności aplikacji, zaufanie do marki oraz ogólną satysfakcję użytkownika. Niniejszy raport stanowi wyczerpującą analizę techniczną i projektową dwóch fundamentalnych wzorców ładowania: wskaźnika obrotowego (Spinner) oraz ekranu szkieletowego (Skeleton Screen), ze szczególnym uwzględnieniem specyficznych wymagań kolorystycznych (złoto/fiolet, ciemny turkus) oraz funkcjonalnych zdefiniowanych w specyfikacji projektowej.

### **1.1 Natura Czasu w Interfejsach Cyfrowych**

Zgodnie z badaniami nad interakcją człowiek-komputer (HCI), percepcja czasu jest subiektywna i plastyczna. Użytkownicy tolerują opóźnienia do 0,1 sekundy jako natychmiastowe, do 1 sekundy jako zachowanie płynności myśli, a powyżej 10 sekund jako zerwanie uwagi. Krytyczna strefa, w której operują wskaźniki ładowania, znajduje się pomiędzy 1 a 10 sekundami. W tym oknie czasowym brak informacji zwrotnej prowadzi do niepewności i frustracji. Zastosowanie dwóch odrębnych mechanizmów – Spinnera dla operacji aktywnych (przyciski, przejścia stron) i Skeletonu dla ładowania pasywnego (karty, listy) – odzwierciedla głębokie zrozumienie kontekstu operacyjnego. Spinner sygnalizuje, że system „pracuje” (przetwarza dane, wysyła żądanie), podczas gdy Skeleton sygnalizuje, że treść „nadchodzi” (zachowując strukturę układu).

### **1.2 Dychotomia Stylistyczna: Prestiż a Funkcjonalność**

Wymagania kolorystyczne narzucają unikalną dynamikę wizualną. Połączenie złota (--gold-400 / \#FFD700) i fioletu (--purple-300 / \#4D194D) w Spinnerze ewokuje skojarzenia z luksusem, prestiżem i wysokim statusem (tzw. paleta królewska), co jest rzadkością w standardowych bibliotekach UI, które zazwyczaj operują błękitem systemowym. Z kolei gradient Skeletonu, oscylujący w ciemnych turkusach (--teal-800 / \#003737 do \--teal-700 / \#004545), sugeruje implementację w trybie ciemnym (dark mode) lub w aplikacji o wysokim nasyceniu kolorystycznym, gdzie standardowe szare prostokąty byłyby wizualnie niespójne. Ta dychotomia – jaskrawy, przyciągający uwagę wskaźnik akcji kontra subtelny, wycofany wskaźnik struktury – stanowi oś niniejszej analizy.

## **2\. Architektura Komponentu Spinner: Geometria, Skalowanie i Kolorystyka**

Spinner, definiowany jako animowane kółko, jest w istocie zaawansowaną konstrukcją wektorową (SVG), której czytelność i płynność zależą od precyzyjnych obliczeń matematycznych. Wymóg obsługi trzech rozmiarów: małego (24px), średniego (48px) i dużego (72px), przy jednoczesnym zachowaniu spójności wizualnej gradientu złoto-fioletowego, wymaga odejścia od prostego skalowania obrazu na rzecz skalowania parametrycznego.

### **2.1 Matematyka SVG i Problem Skalowania Liniowego**

Podstawowym błędem w implementacji wielorozmiarowych spinnerów jest stosowanie tej samej grubości obrysu (stroke-width) dla wszystkich wariantów lub, co gorsza, liniowe skalowanie grubości wraz z rozmiarem kontenera. Spinner o średnicy 24px z obrysem 2px ma inne proporcje optyczne (ok. 8% średnicy) niż spinner 72px z obrysem 6px, który może wydawać się zbyt masywny i „ciężki” wizualnie. Aby zachować elegancję i czytelność, należy stosować nieliniową progresję grubości obrysu. Analiza najlepszych praktyk w projektowaniu ikonografii sugeruje następującą macierz parametrów dla stałego układu współrzędnych viewBox="0 0 50 50":

| Rozmiar | Renderowany (CSS) | Promień (r) w SVG | Obwód (2\\pi r) | Zalecana Grubość Obrysu (SVG units) | Efektywna Grubość Pikselowa | Zastosowanie |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Mały (24px) | 20 | 125.6 | 4.5 | \~2.16 px | Przyciski, inputy, inline |  |
| Średni (48px) | 20 | 125.6 | 3.5 | \~3.36 px | Karty, modale, ładowanie sekcji |  |
| Duży (72px) | 20 | 125.6 | 3.0 | \~4.32 px | Pełny ekran, inicjalizacja aplikacji |  |

Tabela ta ukazuje, że im mniejszy spinner, tym relatywnie grubszy musi być jego obrys w jednostkach SVG, aby zachować czytelność na małej powierzchni.

### **2.2 Implementacja Gradientu Złoto-Fioletowego**

Wymóg kolorystyczny „złoty/fioletowy” implikuje użycie definicji \<linearGradient\> wewnątrz struktury SVG. W przeciwieństwie do stylów CSS border-color, które obsługują gradienty (conic-gradient) w ograniczonym zakresie w starszych przeglądarkach, SVG oferuje pełną kompatybilność wektorową. Gradient powinien być zdefiniowany w sekcji \<defs\> i zaaplikowany do atrybutu stroke. Kluczowym aspektem jest kąt gradientu. Aby animacja obrotowa (spin) wyglądała dynamicznie, gradient powinien być statyczny względem koła (obracając się wraz z nim), co tworzy efekt mieszania się barw w ruchu.

HTML

\<defs\>  
  \<linearGradient id\="gold-purple" x1\="0%" y1\="0%" x2\="100%" y2\="100%"\>  
    \<stop offset\="0%" stop-color\="var(--gold-400, \#FFD700)" /\>  
    \<stop offset\="100%" stop-color\="var(--purple-300, \#4D194D)" /\>  
  \</linearGradient\>  
\</defs\>  
\<circle stroke\="url(\#gold-purple)"... /\>

Alternatywą jest animacja właściwości stroke w czasie, przechodząca cyklicznie od złota do fioletu, jednak rozwiązanie gradientowe jest bardziej eleganckie i zgodne z trendami „gradient strokes” w nowoczesnym UI.

### **2.3 Dynamika Animacji: stroke-dasharray i stroke-dashoffset**

Proste obracanie koła (transform: rotate) jest niewystarczające, aby oddać nowoczesny charakter aplikacji. Standardem jest tzw. „liquid animation”, gdzie długość łuku spinnera zmienia się w czasie, tworząc efekt rozciągania i kurczenia. Mechanizm ten opiera się na manipulacji atrybutem stroke-dasharray. Dla koła o promieniu 20 (obwód \~126 jednostek):

1. Stan początkowy: Krótka kreska (np. 1 jednostka), długa przerwa.  
2. Stan środkowy: Długa kreska (np. 90 jednostek, co stanowi ok. 75% obwodu), krótka przerwa.  
3. Stan końcowy: Przesunięcie offsetu (stroke-dashoffset), co powoduje „podciągnięcie” ogona spinnera.

Wymaga to zastosowania dwóch nakładających się animacji CSS:

* rotate (liniowa, 360 stopni) – odpowiedzialna za ciągły ruch obrotowy.  
* dash (sinusoidalna, ease-in-out) – odpowiedzialna za zmianę długości łuku.

Złożenie tych dwóch ruchów zapobiega efektowi stroboskopowemu i sprawia, że animacja wydaje się bardziej organiczna i mniej mechaniczna, co zmniejsza postrzegane zmęczenie użytkownika podczas oczekiwania.

## **3\. Architektura Komponentu Skeleton Screen: Wizualizacja Struktury**

Skeleton Screen (ekran szkieletowy) to reprezentacja układu interfejsu pozbawiona rzeczywistej treści. Jego celem jest zredukowanie ładunku poznawczego poprzez wstępne zapoznanie użytkownika z architekturą informacji przed jej załadowaniem (priming). Wymóg „szare prostokąty z animowanym gradientem” w połączeniu ze specyfikacją kolorów „gradient od \--teal-800 do \--teal-700” wskazuje na adaptację klasycznego wzorca (Grey Box) do specyficznego środowiska graficznego (Dark Mode / Teal Theme).

### **3.1 Teoria Postrzegania Gradientu i Kolorystyka Ciemnego Turkus**

Zastosowanie bardzo ciemnych odcieni turkusu (--teal-800 / \#003737) jako bazy oraz nieco jaśniejszego odcienia (--teal-700 / \#004545) jako efektu „shimmer” (połysku) stawia wyzwania w zakresie kontrastu i widoczności.

* Baza (--teal-800 / \#003737): Kolor ten ma bardzo niską luminancję. Na bardzo ciemnym tle (np. \--teal-900 / \#001F1F lub czarnym) jego współczynnik kontrastu jest bardzo niski. Jest to wartość poniżej standardów dostępności dla tekstu, ale akceptowalna dla elementów nieaktywnych/dekoracyjnych.

Kluczowe jest, aby tło aplikacji było wystarczająco ciemne (np. czarne lub ciemnoszare), aby skeleton był w ogóle widoczny, lub wystarczająco jasne, aby skeleton stanowił wyraźny ciemny blok. Biorąc pod uwagę dobór kolorów, zakłada się, że jest to aplikacja w trybie ciemnym.

* Gradient (--teal-800 \-\> \--teal-700): Różnica jasności między tymi kolorami jest subtelna (ok. 5-7% różnicy w luminancji). To celowy zabieg projektowy. Zbyt duży kontrast w animacji skeletonu (np. od czerni do bieli) powoduje efekt „migania” (flickering), który jest męczący dla wzroku i może odwracać uwagę od innych elementów interfejsu. Subtelny gradient tworzy wrażenie „oddechu” lub delikatnego przepływu światła, co jest kojące i sugeruje aktywność w tle bez generowania stresu wizualnego.

### **3.2 Morfologia Elementów: Karty i Listy**

Wymóg zastosowania skeletonów dla kart i list determinuje kształty geometryczne (prostokąty). Jednakże, nowoczesne podejście do skeletonów nakazuje odwzorowanie typografii, a nie tylko bloków kontenerów.

* Wiersze tekstu: Zamiast jednego dużego prostokąta, należy stosować serie mniejszych prostokątów o wysokości odpowiadającej wysokości linii tekstu (line-height) z zaokrąglonymi rogami (border-radius: 4px).  
* Zmienność długości: Aby symulować naturalny tekst, ostatni prostokąt w bloku powinien być krótszy (np. 60% szerokości), co naśladuje naturalny koniec akapitu.  
* Elementy multimedialne: Dla avatarów w listach należy stosować koła (border-radius: 50%), a dla miniatur obrazów w kartach – proporcjonalne prostokąty (np. 16:9).

### **3.3 Fizyka Animacji „Shimmer” (Przesuwający się Gradient)**

Efekt „shimmer” to iluzja świetlna powstająca przez przesunięcie jasnego pasma gradientu po ciemniejszym tle. Aby efekt ten był płynny i profesjonalny, należy uwzględnić następujące parametry:

1. Kąt nachylenia: Pionowy gradient (90 deg) wygląda nienaturalnie. Standardem branżowym jest lekkie pochylenie (ok. 100-110 stopni), co sugeruje, że źródło światła znajduje się w lewym górnym rogu i przesuwa się w prawo.  
2. Szerokość gradientu: Gradient nie powinien ograniczać się do szerokości elementu. Powinien być znacznie szerszy (np. 200% lub 400% szerokości kontenera), aby faza „ciemna” (przerwa między błyskami) była wystarczająco długa.  
3. Timing function: W przeciwieństwie do spinnera, gdzie ease-in-out dodaje naturalności, dla skeletonu najlepsza jest funkcja linear w pętli nieskończonej, aby uniknąć efektu „pulsowania” całego ekranu, co mogłoby wywołać wrażenie awarii.

## **4\. Inżynieria Wydajności: Rendering i Optymalizacja Browsera**

Implementacja animacji CSS, zwłaszcza w kontekście list zawierających dziesiątki elementów (np. feed w mediach społecznościowych), niesie ryzyko spadku wydajności (klatkowania), jeśli nie zostanie wykonana zgodnie z zasadami optymalizacji renderingu przeglądarki.

### **4.1 Kosztowne Właściwości: background-position**

Tradycyjna metoda animowania skeletonu polega na zmianie właściwości background-position.

CSS

@keyframes shimmer {  
  0% { background-position: \-468px 0; }  
  100% { background-position: 468px 0; }  
}

Choć prosta w implementacji, metoda ta historycznie wymuszała na przeglądarce operacje repaint (ponowne malowanie pikseli) w każdej klatce animacji. Na słabszych urządzeniach mobilnych, przy dużej liczbie elementów DOM, prowadzi to do szybkiego zużycia baterii i spadku FPS (klatek na sekundę).

### **4.2 Rozwiązanie Akcelerowane Sprzętowo: transform: translateX**

Nowoczesne podejście, rekomendowane w niniejszym raporcie dla uzyskania statusu „Eksperckiego”, wykorzystuje pseudoelementy (::after) i właściwość transform.

* Mechanizm: Tworzymy pseudoelement nakrywający cały skeleton, zawierający gradient. Następnie przesuwamy go za pomocą translateX.  
* Zaleta: Przeglądarki promują elementy z transformacjami 3D do osobnych warstw kompozycyjnych (Compositor Layers). Operacje na tych warstwach są wykonywane bezpośrednio przez GPU (kartę graficzną), omijając główny wątek procesora (CPU). Dzięki temu animacja pozostaje płynna nawet wtedy, gdy główny wątek JavaScript jest zajęty przetwarzaniem pobranych danych JSON.

CSS

.skeleton::after {  
  content: '';  
  position: absolute;  
  top: 0; left: 0; bottom: 0; right: 0;  
  background: linear-gradient(110deg, transparent, var(--teal-700, \#004545), transparent);  
  transform: translateX(-100%);  
  animation: shimmer 1.5s infinite;  
}

@keyframes shimmer {  
  100% { transform: translateX(100%); }  
}

Zauważmy użycie transparent na brzegach gradientu, co pozwala na płynne wtopienie się w tło \--teal-800 bez twardych krawędzi.

### **4.3 Zarządzanie Pamięcią i Złożoność DOM**

Przy listach wirtualnych (virtual lists) lub bardzo długich stronach, nadmierna liczba warstw kompozycyjnych może wyczerpać pamięć VRAM urządzenia. Dlatego zaleca się stosowanie skeletonów tylko dla elementów widocznych w viewportcie (lazy loading skeletonów) lub grupowanie złożonych struktur w jeden większy obraz SVG, zamiast budowania ich z setek małych divów.

## **5\. Dostępność Cyfrowa (Accessibility \- a11y)**

Raport ekspercki musi uwzględniać, że wskaźniki ładowania nie są tylko elementem dekoracyjnym, ale kluczowym punktem komunikacji stanu systemu dla osób korzystających z technologii asystujących.

### **5.1 Redukcja Ruchu (Vestibular Disorders)**

Użytkownicy z zaburzeniami błędnika (np. zawroty głowy) mogą odczuwać dyskomfort fizyczny (mdłości) przy oglądaniu dużej powierzchni pulsujących lub przesuwających się animacji. Zgodnie z kryterium WCAG 2.2, aplikacja musi respektować ustawienie systemowe prefers-reduced-motion.

* Dla Skeletonu: Jeśli użytkownik włączył redukcję ruchu, animacja „shimmer” musi zostać wyłączona. Skeleton powinien stać się statycznym blokiem zadeklarowanego koloru \--teal-800 lub bardzo powoli zmieniać krycie (opacity), co jest mniej inwazyjne.  
* Dla Spinnera: Prędkość obrotu powinna zostać drastycznie zmniejszona lub zastąpiona tradycyjnym paskiem postępu bez szybkich ruchów.

CSS

@media (prefers-reduced-motion: reduce) {  
 .skeleton::after {  
    animation: none;  
  }  
 .spinner {  
    animation-duration: 10s; /\* Bardzo wolny obrót \*/  
  }  
}

### **5.2 Komunikacja z Czytnikami Ekranowymi (ARIA)**

Wizualny wskaźnik ładowania jest niewidoczny dla osób niewidomych.

* Spinner: Musi być oznaczony atrybutem role="status" lub role="progressbar". Jeśli ładowanie blokuje interakcję (np. po kliknięciu przycisku „Zapisz”), należy użyć atrybutu aria-busy="true" na kontenerze sekcji.  
* Skeleton: Skeletony są elementami czysto prezentacyjnymi. Nie powinny być odczytywane przez czytnik ekranu jako „pusty obraz” lub „blok”. Należy nadać im atrybut aria-hidden="true". Równocześnie, kontener nadrzędny powinien informować o stanie ładowania (np. poprzez ukryty tekst „Ładowanie treści...”).

### **5.3 Kontrast w Trybie Ciemnym**

Dla słabowidzących, gradient od \--teal-800 do \--teal-700 może być trudny do odróżnienia od tła. Jeśli tło aplikacji opiera się na \--teal-900 lub czerni, kontrast jest niski. Rekomenduje się dodanie subtelnej ramki (border) o kolorze \--teal-700 do prostokątów skeletonu, aby wyznaczyć granice elementu nawet na monitorach o słabym odwzorowaniu czerni.

## **6\. Szczegółowa Specyfikacja Implementacyjna**

W tej sekcji przedstawiono konkretne rozwiązania kodowe realizujące zdefiniowane wymagania.

### **6.1 System Spinnera (Gold/Purple)**

**Kod HTML/SVG:**

HTML

\<svg class\="spinner" viewBox\="0 0 50 50" aria-hidden\="true"\>  
  \<defs\>  
    \<linearGradient id\="spinner-gradient" x1\="0%" y1\="0%" x2\="100%" y2\="100%"\>  
      \<stop offset\="0%" stop-color\="var(--gold-400, \#FFD700)" /\>  
      \<stop offset\="100%" stop-color\="var(--purple-300, \#4D194D)" /\>  
    \</linearGradient\>  
  \</defs\>  
  \<circle class\="path" cx\="25" cy\="25" r\="20" fill\="none" stroke\="url(\#spinner-gradient)"\>\</circle\>  
\</svg\>

**Kod CSS (SCSS):**

SCSS

.spinner {  
  animation: rotate 2s linear infinite;

  &.size-s { width: 24px; height: 24px; }  
  &.size-m { width: 48px; height: 48px; }  
  &.size-l { width: 72px; height: 72px; }

 .path {  
    stroke-linecap: round;  
    animation: dash 1.5s ease-in-out infinite;  
    /\* Dostosowanie grubości dla rozmiarów \*/  
  }  
}

/\* Skalowanie grubości obrysu \*/  
.size-s.path { stroke-width: 4.5px; }  
.size-m.path { stroke-width: 3.5px; }  
.size-l.path { stroke-width: 3px; }

@keyframes rotate {  
  100% { transform: rotate(360deg); }  
}

@keyframes dash {  
  0% {  
    stroke-dasharray: 1, 150;  
    stroke-dashoffset: 0;  
  }  
  50% {  
    stroke-dasharray: 90, 150;  
    stroke-dashoffset: \-35;  
  }  
  100% {  
    stroke-dasharray: 90, 150;  
    stroke-dashoffset: \-124;  
  }  
}

Zastosowanie zmiennej stroke-width w zależności od klasy nadrzędnej (.size-s,.size-m) realizuje postulat nieliniowego skalowania, zapewniając czytelność małego spinnera (24px) na przyciskach.

### **6.2 System Skeleton Screen (Teal Shimmer)**

**Struktura HTML (Przykład Karty):**

HTML

\<div class\="card-skeleton" aria-hidden\="true"\>  
  \<div class\="skeleton-img"\>\</div\>  
  \<div class\="skeleton-title"\>\</div\>  
  \<div class\="skeleton-text w-100"\>\</div\>  
  \<div class\="skeleton-text w-80"\>\</div\>  
\</div\>

**Kod CSS:**

CSS

:root {  
  \--skeleton-base: var(--teal-800, \#003737);  
  \--skeleton-shine: var(--teal-700, \#004545);  
}

.skeleton-img,.skeleton-title,.skeleton-text {  
  background-color: var(--skeleton-base);  
  border-radius: 4px;  
  position: relative;  
  overflow: hidden;  
  /\* Fix dla Safari border-radius clipping \*/  
  transform: translateZ(0);  
}

/\* Pseudoelement dla animacji \*/  
.skeleton-img::after,.skeleton-title::after,.skeleton-text::after {  
  content: '';  
  position: absolute;  
  top: 0; right: 0; bottom: 0; left: 0;  
  transform: translateX(-100%);  
  background: linear-gradient(  
    110deg,  
    transparent 0%,  
    var(--skeleton-shine) 40%,  
    var(--skeleton-shine) 60%,  
    transparent 100%  
  );  
  animation: shimmer 2s infinite linear;  
}

/\* Specyficzne wymiary \*/  
.skeleton-img { height: 180px; width: 100%; margin-bottom: 16px; }  
.skeleton-title { height: 24px; width: 70%; margin-bottom: 12px; }  
.skeleton-text { height: 16px; margin-bottom: 8px; }  
.w-100 { width: 100%; }  
.w-80 { width: 80%; }

@keyframes shimmer {  
  100% { transform: translateX(100%); }  
}

W tym rozwiązaniu kluczowe jest użycie zmiennych CSS (--skeleton-base), co pozwala na łatwą zmianę palety barw w przyszłości bez ingerencji w logikę animacji. Gradient został tak skonstruowany (transparent na brzegach), aby płynnie łączył się z bazą \--teal-800.

## **7\. Strategie Użycia (Usage Guidelines)**

Zgodnie z wymaganiami, zdefiniowano ścisły podział ról dla obu komponentów.

### **7.1 Spinner: Kontekst Operacyjny**

* Przyciski (24px): Spinner zastępuje etykietę tekstową lub ikonę przycisku. Ważne: rozmiar 24px idealnie wpisuje się w standardową wysokość linii tekstu i paddingów przycisków (zazwyczaj 32-48px wysokości całkowitej), nie powodując zmiany rozmiaru przycisku (layout shift) podczas przejścia w stan loading.  
* Cała Strona / Overlay (72px): Używany przy inicjalizacji aplikacji (cold start) lub krytycznych przejściach między modułami, gdzie całe UI jest blokowane. Duży rozmiar i złoto-fioletowa kolorystyka pełnią tu rolę brandingową.

### **7.2 Skeleton: Kontekst Strukturalny**

* Karty i Listy: Skeleton jest bezwzględnie wymagany przy ładowaniu list danych (np. produktów, artykułów).  
* Zasada „Progressive Loading”: Jeśli ładowanie trwa dłużej niż 3-5 sekund, skeleton może zostać zastąpiony komunikatem o przedłużającym się procesie, ale nigdy pustym ekranem.  
* Hierarchia: W listach złożonych (np. tabela z danymi), skeletony powinny odzwierciedlać układ kolumn. Jeśli pierwsza kolumna to tekst, a ostatnia to status (badge), skeletony powinny mieć odpowiednie szerokości, aby użytkownik wiedział, gdzie spodziewać się konkretnych danych.

## **8\. Podsumowanie i Wnioski**

Przedstawiona specyfikacja techniczna łączy w sobie rygorystyczne wymagania wizualne (specyficzne palety barw, skalowanie SVG) z najlepszymi praktykami inżynierii webowej (akceleracja GPU, dostępność WCAG).

1. Integracja Kolorystyczna: Użycie złota i fioletu w spinnerze nadaje aplikacji charakter premium, podczas gdy ciemnoturkusowy skeleton (--teal-800) zapewnia spójność z trybem ciemnym, unikając typowej dla skeletonów „szarości”, która mogłaby zaburzyć immersję kolorystyczną.  
2. Optymalizacja Percepcji: Nieliniowe skalowanie grubości spinnera oraz precyzyjnie dobrany gradient skeletonu minimalizują zmęczenie wzroku i redukują postrzegany czas oczekiwania.  
3. Wydajność: Przejście na animacje oparte na transform i opacity gwarantuje płynność działania (60 FPS) nawet na urządzeniach mobilnych z niższej półki, co jest krytyczne dla współczesnych aplikacji webowych (PWA).

Wdrożenie powyższych rozwiązań zapewni nie tylko spełnienie wymagań funkcjonalnych, ale także podniesienie ogólnej jakości doświadczenia użytkownika (UX) na poziom ekspercki.

### **Tabela Podsumowująca Parametry Techniczne**

| Komponent | Atrybut | Wartość / Opis | Uzasadnienie |
| :---- | :---- | :---- | :---- |
| Spinner | Kolory | Gradient var(--gold-400) \-\> var(--purple-300) | Wymóg klienta; Unikalny branding. |
| Spinner | Animacja | Rotacja (360°) \+ Dash Array (1-90%) | Płynność organiczna (Liquid motion). |
| Spinner | Stroke (24px) | 4.5 jednostki SVG | Zachowanie czytelności w małej skali. |
| Skeleton | Baza | var(--teal-800) (Dark Teal) | Integracja z Dark Mode. |
| Skeleton | Shimmer | var(--teal-700) (Elevated Teal) | Subtelny kontrast dla uniknięcia migania. |
| Skeleton | Metoda Anim. | transform: translateX na pseudoelemencie | Wydajność GPU, brak reflow. |
| General | A11y | prefers-reduced-motion, ARIA roles | Zgodność z WCAG 2.1/2.2. |

## **9\. Rozszerzona Analiza: Wpływ Gradientu na Zużycie Energii (OLED vs LCD)**

Jako ekspert w dziedzinie inżynierii front-end, warto zwrócić uwagę na aspekt sprzętowy wyboru palety opartej na \--teal-800. Na ekranach typu OLED (dominujących w nowoczesnych smartfonach), piksele wyświetlające czerń lub bardzo ciemne kolory zużywają znacznie mniej energii niż piksele wyświetlające jasną szarość (standardowe skeletony). Wybór ciemnego turkusu jest zatem nie tylko decyzją estetyczną, ale i pro-energetyczną (Eco-Web Design), co wpisuje się w nowoczesne trendy zrównoważonego rozwoju cyfrowego. Animacja „shimmer” zajmująca tylko niewielką część powierzchni skeletonu (wąski pasek) dodatkowo minimalizuje chwilowy pobór prądu w porównaniu do pulsowania całej powierzchni elementu.

## **10\. Strategia Implementacji w Frameworkach (React/Vue/Angular)**

Aby zapewnić reużywalność, komponenty te powinny zostać zaimplementowane jako tzw. "dumb components" przyjmujące parametry konfiguracyjne.

**Przykład API Komponentu (React/TypeScript)**

TypeScript

type SpinnerProps \= {  
  size?: 's' | 'm' | 'l'; // Mapuje do 24, 48, 72px  
  className?: string;  
};

type SkeletonProps \= {  
  variant: 'text' | 'rect' | 'circle';  
  width?: string | number;  
  height?: string | number;  
  animation?: 'wave' | 'pulse' | 'none';  
};

Tak zdefiniowane interfejsy pozwalają na ścisłą kontrolę nad systemem designu przy jednoczesnej elastyczności wdrażania w różnych częściach aplikacji, od formularzy logowania po złożone dashboardy analityczne.