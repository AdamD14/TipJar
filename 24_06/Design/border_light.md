 {/* Model Snella-Descartesa: POPRAWIONE WARTOŚCI MACIERZY KANAŁÓW RGB */}
          <filter id="chromatic-prism">
            {/* Przesunięcia warstw bocznych dla efektu rozszczepienia */}
            <feOffset dx="-2" dy="0" in="SourceGraphic" result="red_layer" />
            <feOffset dx="2" dy="0" in="SourceGraphic" result="blue_layer" />

            {/* Izolacja kanału czerwonego (R) */}
            <feColorMatrix
              type="matrix"
              in="red_layer"
              result="red_only"
              values="
              1 0 0 0 0                 
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 1 0"
            />

            {/* Izolacja kanału zielonego (G) */}
            <feColorMatrix
              type="matrix"
              in="SourceGraphic"
              result="green_only"
              values="
              0 0 0 0 0
              0 1 0 0 0
              0 0 0 0 0
              0 2 0 1 0"
            />

            {/* Izolacja kanału niebieskiego (B) */}
            <feColorMatrix
              type="matrix"
              in="blue_layer"
              result="blue_only"
              values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 1 0 0
              0 0 0 1 0"
            />

            {/* Łączenie kanałów w finalny pryzmat trybym Screen */}
            <feBlend
              mode="screen"
              in="red_only"
              in2="green_only"
              result="rg_mix"
            />
            <feBlend mode="screen" in="rg_mix" in2="blue_only" />
          </filter>
          
          
          1. 1 0 0 0 0
             0 0 0 0 0 czerwony 
             0 0 0 0 0
             0 0 0 1 0
          2. 0 0 0 0 0
             0 1 0 0 0 zielony
             0 0 0 0 0 
             0 0 0 1 0 
          3. 0 0 0 0 0
             0 0 0 0 0
             0 0 1 0 0
             0 0 0 1 0 niebieski
          4. czwarta linia przezroczystosc   
             0 0 0 0 0
             0 0 0 0 0
             0 0 0 0 0
             0 x 0 1 0  x-wzmocnienie mnozenie 
     5 kolumna to dodawanie o ile procent wzmocnic 

**********************

{/* TOPOLOGIA CONNECTION */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] transition-transform duration-[350ms] [transition-timing-function:var(--ease-spring)] group-hover:scale-[1.03]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 10,20 L 35,45 L 75,25 L 95,60 M 35,45 L 50,85 L 75,25 M 50,85 L 85,75 M 10,20 L 50,85"
            fill="none"
            stroke="var(--teal-50)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="35" cy="45" r="1" fill="var(--teal-50)" />
          <circle cx="75" cy="25" r="1" fill="var(--teal-50)" />
          <circle cx="50" cy="85" r="1" fill="var(--teal-50)" />
        </svg>
        
 ontener SVG i fizykę ruchu (A), Ścieżkę wektorową sieci (B) oraz Węzły sieciowe (C).

A. Kontener SVG i Fizyka Ruchu (Oś Z)
HTML
<svg
  className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] transition-transform duration-[350ms] [transition-timing-function:var(--ease-spring)] group-hover:scale-[1.03]"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
>
Co to robi?
Tworzy elastyczne płótno wektorowe rozciągnięte na całą przestrzeń karty, które reaguje na najechanie kursorem poprzez delikatne powiększenie (przybliżenie sieci w tle), co daje złudzenie trójwymiarowości (efekt paralaksy).

Które wartości na to wpływają?
absolute inset-0 w-full h-full: Rozciąga SVG na dokładnie 100% szerokości i wysokości karty rodzica.

pointer-events-none: Super ważne! Sprawia, że linie w tle są "niewidzialne" dla myszki. Dzięki temu użytkownik może klikać i zaznaczać tekst na karcie, a wektory w tle w niczym nie przeszkadzają.

opacity-[0.04]: Ustala widoczność sieci na zaledwie 4%. Sprawia to, że wzór jest niezwykle elegancki i nie odciąga uwagi od ważnych informacji na karcie.

group-hover:scale-[1.03]: Kiedy najedziesz myszką na kartę, całe tło powiększa się o 3%. Ponieważ sama karta się nie powiększa (tylko lekko unosi), tło sprawia wrażenie, jakby było "głębiej" pod tekstem.

transition-transform duration-[350ms] [transition-timing-function:var(--ease-spring)]: Steruje płynnością powiększenia. Używa sprężyny CSS (var(--ease-spring)), co eliminuje sztywne animacje na rzecz płynnego "odbicia" (inercji).

viewBox="0 0 100 100": Ustala wirtualną siatkę współrzędnych od 0 do 100 na obu osiach. Dzięki temu pozycjonowanie linii jest niezależne od rzeczywistego rozmiaru karty w pikselach.

preserveAspectRatio="none": Pozwala siatce wektorowej rozciągać się lub zwężać, dopasowując się dokładnie do proporcji karty (niezależnie czy karta jest wąskim pionowym boksem, czy szerokim poziomym).

B. Ścieżka Wektorowa <path> (Konstelacja Linii)
HTML
<path
  d="M 10,20 L 35,45 L 75,25 L 95,60 M 35,45 L 50,85 L 75,25 M 50,85 L 85,75 M 10,20 L 50,85"
  fill="none"
  stroke="var(--teal-50)"
  strokeWidth="1"
  vectorEffect="non-scaling-stroke"
/>
Co to robi?
Rysuje siatkę połączonych ze sobą linii na bazie wirtualnych współrzędnych z viewBox (od 0 do 100).

Które wartości na to wpływają?
d="..." (Główna ścieżka rysowania):

M (Move to): Podnieś ołówek i przenieś go na współrzędne (np. M 10,20 – przenieś do punktu X=10, Y=20).

L (Line to): Narysuj linię prostą od obecnego punktu do nowych współrzędnych (np. L 35,45).

Litera M w środku ciągu działa jak ponowne uniesienie ołówka, dzięki czemu cała sieć składa się z kilku osobnych, połączonych segmentów zamiast jednej ciągłej nitki.

stroke="var(--teal-50)": Kolor linii pobierany z Twojej palety (bardzo jasny, pastelowy teal).

strokeWidth="1": Grubość linii (ustawiona na 1 jednostkę wirtualną).

vectorEffect="non-scaling-stroke" (Klucz do estetyki!): Bez tej właściwości, gdy karta rozciągałaby się na szerokim ekranie komputera, linie stawałyby się grube i brzydkie. Ta komenda mówi przeglądarce: "Niezależnie od tego, jak bardzo rozciągniesz tę kartę, linia ma mieć zawsze dokładnie 1 fizyczny piksel grubości na ekranie".

C. Węzły Sieciowe <circle> (Punkty Połączeń)
HTML
<circle cx="35" cy="45" r="1" fill="var(--teal-50)" />
<circle cx="75" cy="25" r="1" fill="var(--teal-50)" />
<circle cx="50" cy="85" r="1" fill="var(--teal-50)" />
Co to robi?
Rysuje idealne kropki dokładnie na skrzyżowaniach linii, co wzmacnia technologiczny motyw "węzłów sieci neuronowej" lub "bazy danych".

Które wartości na to wpływają?
cx i cy (Pozycja środka):
Zauważ, że te wartości idealnie pokrywają się ze współrzędnymi ze ścieżki <path>!
Na przykład pierwszy okrąg ma cx="35" cy="45". Dokładnie przez ten sam punkt 35,45 przechodzi linia ze ścieżki (M 10,20 L 35,45...). Dzięki temu kropka leży idealnie na złączeniu linii.

r="1": Promień kropki. Jest mały, co sprawia, że punkty są subtelne i ostre.

fill="var(--teal-50)": Wypełnia kropki tym samym jasnym kolorem co linie.       


****************************


  {/* INWERSYJNE HALO */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--color-border-focus)_0%,transparent_70%)] opacity-0 mix-blend-screen transition-opacity duration-500 group-focus-within:opacity-100 group-focus-within:animate-pulse-breath"
          aria-hidden="true"
        />

ten efekt – Inwersyjne Halo – to niezwykle subtelny zabieg wizualny, który dodaje interfejsowi głębi i realizuje zasadę "aktywnego światła" w designie. Działa jak neonowy, pulsujący żar ukryty pod spodem karty.

Rozbijmy ten efekt na trzy kluczowe warstwy: Fizykę gradientu i tryb mieszania (A), Wyzwalacze interakcji i animację (B) oraz Pozycjonowanie i dostępność (C).

A. Fizyka Gradientu i Tryb Mieszania
CSS
bg-[radial-gradient(circle_at_center,var(--color-border-focus)_0%,transparent_70%)]
mix-blend-screen
Co to robi?
Tworzy okrągłą plamę światła, która zaczyna się w samym środku karty i łagodnie rozchodzi się na boki, stapiając się z elementami pod spodem w sposób naśladujący fizyczny snop światła.

Które wartości na to wpływają?
radial-gradient(...): Gradient kołowy.

circle at center: Punktem startowym (źródłem światła) jest geometryczny środek karty.

var(--color-border-focus) 0%: W samym centrum plama ma 100% intensywności koloru z Twojej zmiennej (skonfigurowany u Ciebie kolor focusu/fioletu).

transparent 70%: Światło łagodnie wygasa do całkowitej przezroczystości na dystansie 70% szerokości/wysokości karty. Gdybyś zmienił tę wartość np. na 100%, plama światła byłaby znacznie większa i docierałaby aż do samych rogów boksów.

mix-blend-screen: Tryb mieszania "Screen" (ekran), o którym rozmawialiśmy przy matematyce filtrów. Sprawia, że to fioletowe/tealowe światło nie przykrywa płasko tła karty, ale dodaje swoją jasność do warstw pod spodem. Daje to niesamowicie realistyczny efekt "podświetlenia od tyłu" (backlight glow).

B. Wyzwalacze Interakcji i Animacja
CSS
opacity-0
transition-opacity duration-500
group-focus-within:opacity-100
group-focus-within:animate-pulse-breath
Co to robi?
Ukrywa światło w stanie spoczynku, a gdy użytkownik wejdzie w interakcję z kartą za pomocą klawiatury (Tab) lub kliknięcia, płynnie je zapala i wprowadza w spokojny, hipnotyzujący stan pulsowania.

Które wartości na to wpływają?
opacity-0: Domyślnie halo jest całkowicie wygaszone i niewidoczne.

transition-opacity duration-500: Kiedy halo się zapala lub gaśnie, zmiana krycia trwa dokładnie pół sekundy (500ms). Daje to miękkie, organiczne przejście zamiast gwałtownego mignięcia.

group-focus-within:opacity-100: To jest klucz do aktywacji! Klasa group-focus-within nasłuchuje, czy jakikolwiek element wewnątrz tej karty (np. przycisk, pole formularza, link) otrzymał focus. Kiedy użytkownik przechodzi Tabem po stronie i "wejdzie" na tę kartę, halo natychmiast rozbłyska pełną mocą.

group-focus-within:animate-pulse-breath: W tym samym momencie odpala się Twoja autorska animacja pulsowania (oddychania). Sprawia ona, że natężenie światła faluje (np. od 70% do 100% i z powrotem) w bardzo wolnym, fizjologicznym tempie (wspomniane 0.2Hz, czyli jeden pełen cykl na 5 sekund), co daje niesamowite poczucie "żyjącego" interfejsu.

C. Pozycjonowanie i Dostępność
CSS
pointer-events-none
absolute inset-0
-z-10
aria-hidden="true"
Co to robi?
Ustawia element w odpowiednim miejscu w strukturze 3D karty (osi Z) oraz dba o to, by nie przeszkadzał robotom sieciowym ani czytnikom ekranu.

Które wartości na to wpływają?
pointer-events-none: Podobnie jak w sieci topologii – gwarantuje, że to wirtualne światło nie blokuje żadnych kliknięć. Jest dla myszki całkowicie przezroczyste.

absolute inset-0: Rozciąga element idealnie do krawędzi karty.

-z-10: Pozycjonuje halo pod zawartością karty (pod tekstami i przyciskami), ale nad jej głównym gradientem tła. Dzięki temu tekst na karcie pozostaje idealnie ostry i czytelny, bo światło bije "zza niego".

aria-hidden="true": Ponieważ ten element pełni wyłącznie funkcję ozdobną (nie niesie żadnej treści), ten atrybut mówi czytnikom ekranu dla osób niedowidzących: "Zignorujcie ten tag, nie ma tu nic do czytania". To bardzo dobra praktyka dbania o standardy dostępności.


****************************
********** 
<svg width="0" height="0" className="absolute">
        <defs>
          {/* Geometria Gilotyny */}
          <clipPath id="arc-mask" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 0.85,0 Q 0.9,0 0.93,0.05 L 1,0.15 L 1,1 L 0,1 Z" />
          </clipPath>

          {/* Model Snella-Descartesa: POPRAWIONE WARTOŚCI MACIERZY KANAŁÓW RGB */}
          <filter id="chromatic-prism">

tutaj jeszcze maciez powinna byc
          
         </defs>
      </svg>
************
{/* OCHRONA LINII + SNELL-DESCARTES PRISM EFFECT ON HOVER */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25 transition-all duration-300 group-hover:opacity-100 group-hover:[filter:url(#chromatic-prism)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d={
              hasArc
                ? "M 0,0 L 85,0 Q 90,0 93,5 L 100,15 L 100,100 L 0,100 Z"
                : "M 0,0 L 100,0 L 100,100 L 0,100 Z"
            }
            fill="none"
            stroke={
              variant === "premium"
                ? "var(--gold-400)"
                : variant === "purple"
                  ? "var(--color-border-focus)"
                  : "var(--teal-300)"
            }
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </>

Ten ostatni blok kodu to absolutny majstersztyk, który spaja całą naszą dotychczasową pracę. To jest zewnętrzna, fizyczna ramka (obramowanie) całej karty, na którą bezpośrednio nakładamy nasz filtr pryzmatyczny w momencie najechania myszką (hover).

Rozłóżmy ten element na czynniki pierwsze, abyś dokładnie zrozumiał, jak ta ramka dopasowuje się geometrycznie do karty i jak odpala nasz zaawansowany filtr.

A. Kontener SVG i Podpięcie Filtru (Fizyka Interakcji)
CSS
className="absolute inset-0 w-full h-full pointer-events-none opacity-25 transition-all duration-300 group-hover:opacity-100 group-hover:[filter:url(#chromatic-prism)]"
Co to robi?
Tworzy przezroczystą warstwę dokładnie o wymiarach karty, która w stanie spoczynku ma bardzo delikatną, półprzezroczystą ramkę, a po najechaniu myszką rozbłyska pełnym, rozszczepionym światłem pryzmatu.

Jakie wartości na to wpływają?
opacity-25: Gdy karta po prostu leży na ekranie, jej krawędź jest widoczna tylko w 25% (subtelny zarys).

group-hover:opacity-100: Gdy najedziesz kursorem na kartę (grupę), ramka natychmiast zapala się na 100% jasności.

group-hover:[filter:url(#chromatic-prism)] (Magiia!): To jest najważniejsza komenda w tym pliku. Kiedy użytkownik najeżdża na kartę, Tailwind dynamicznie aplikuje do tej ramki filtr CSS wskazujący na nasz filtr SVG o identyfikatorze #chromatic-prism. W tym momencie przeglądarka zaczyna w locie przeliczać piksele tej linii przez nasze trzy macierze kolorów i przesuwać je w lewo i w prawo!

transition-all duration-300: Gwarantuje, że zapalanie się ramki i nakładanie filtra pryzmatycznego nie dzieje się skokowo, tylko płynnie przechodzi w czasie 300 milisekund.

B. Dynamiczny Kształt Ramki (<path d={...}>)
Ponieważ Twoje karty mogą mieć dwa różne kształty (zwykły prostokąt lub futurystyczny kształt z ściętym narożnikiem), ścieżka wektorowa ramki musi dynamicznie reagować na właściwość hasArc.

JavaScript
d={hasArc ? "M 0,0 L 85,0 Q 90,0 93,5 L 100,15 L 100,100 L 0,100 Z" : "M 0,0 L 100,0 L 100,100 L 0,100 Z"}
1. Klasyczna ramka (hasArc = false):
M 0,0: Zacznij rysować w lewym górnym rogu.

L 100,0: Narysuj linię prostą do prawego górnego rogu.

L 100,100: Narysuj linię do prawego dolnego rogu.

L 0,100: Narysuj linię do lewego dolnego rogu.

Z: Zamknij ścieżkę (automatycznie połącz z punktem początkowym 0,0).

2. Futurystyczne ścięcie (hasArc = true):
Ta ścieżka tworzy niesamowity, technologiczny narożnik:

M 0,0: Start w lewym górnym rogu.

L 85,0: Linia pozioma do 85% szerokości karty.

Q 90,0 93,5: Krzywa Beziera (Quadratic Curve). Tworzy idealne zaokrąglenie przejścia między górną krawędzią a ścięciem. Współrzędne kontrolne to 90,0, a punkt końcowy łuku to 93,5.

L 100,15: Ścięta linia ukośna schodząca w dół do współrzędnych X=100, Y=15.

L 100,100: Prosto w dół do prawego dolnego rogu.

L 0,100: Do lewego dolnego rogu.

Z: Powrót do punktu startu.

To dynamiczne podejście sprawia, że ramka idealnie pokrywa się z maską karty, niezależnie od wybranego wariantu.

C. Stylizacja i Kolorystyka Linii
JavaScript
stroke={variant === "premium" ? "var(--gold-400)" : variant === "purple" ? "var(--color-border-focus)" : "var(--teal-300)"}
strokeWidth="1.5"
vectorEffect="non-scaling-stroke"
Co to robi?
Decyduje o kolorze bazowym i grubości ramki, zanim zostanie ona rozszczepiona przez filtr pryzmatu.

Jakie wartości na to wpływają?
stroke={...}: Sprawdza, jaki wariant karty jest aktualnie renderowany i dobiera odpowiedni kolor wejściowy do filtra:

Wariant premium dostaje złote obramowanie (var(--gold-400)).

Wariant purple dostaje kolor focusu (var(--color-border-focus)).

Standardowy wariant dostaje świeżą zieleń teal (var(--teal-300)).

strokeWidth="1.5": Ustala grubość linii obramowania na 1.5 wirtualnych jednostek.

vectorEffect="non-scaling-stroke": To samo zabezpieczenie, o którym mówiliśmy przy topologii. Niezależnie od tego, jak ogromna będzie karta na ekranie monitora UltraWide, jej obramowanie będzie miało zawsze idealne, ostre jak brzytwa 1.5 piksela grubości na Twoim ekranie, bez rozmyć i brzydkich przeskalowań.

W ten sposób cały ten plik układa się w idealną, logiczną całość:

Mamy maskę karty (clipPath).

Mamy filtry (filter), w tym nasz pryzmat Snell-Descartesa.

Mamy elementy ozdobne (topologia i halo).

Na samym wierzchu leży ta precyzyjnie docięta ramka, która w stanie spoczynku jest niemal niewidoczna, a przy hoverze budzi do życia nasz kosmiczny pryzmat chromatyczny.



