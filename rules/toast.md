# **Raport Badawczy: Architektura i Projektowanie Systemu Powiadomień Tymczasowych (Toast) w Środowisku Premium Dark Mode**

## **Wstęp: Ewolucja Sprzężenia Zwrotnego w Interfejsach Użytkownika**

Współczesne projektowanie interfejsów użytkownika (UI) przechodzi fundamentalną transformację, odchodząc od statycznych prezentacji danych na rzecz dynamicznych, responsywnych ekosystemów, które prowadzą "dialog" z użytkownikiem. W tym kontekście, mechanizmy informacji zwrotnej (feedback loops) stają się krytycznym elementem użyteczności.

Raport ten stanowi wyczerpującą analizę projektową i techniczną dla komponentu powiadomień tymczasowych typu "Toast" (lub "Snackbar"), zaprojektowanego specyficznie dla środowiska o wysokim standardzie estetycznym ("Premium Dark"), opartego na głębokiej barwie turkusowej (--teal-800 / \#003737).

Powiadomienia typu Toast zajmują unikalną niszę w hierarchii komunikacji systemowej. W przeciwieństwie do modalnych okien dialogowych, które wymuszają interakcję i przerywają przepływ pracy (tzw. blocking interaction), czy banerów, które trwale przesuwają układ treści, Toast jest z definicji efemeryczny i nieblokujący. Jego rola polega na dostarczeniu potwierdzenia zmiany stanu systemu – wysłania wiadomości, zapisania pliku, wystąpienia błędu sieciowego – w sposób, który jest zauważalny, ale nie natrętny. Wymóg projektowy dotyczący "stylu premium" w trybie ciemnym, ze specyficznym kodem kolorystycznym tła \--teal-800, wpisuje się w najnowsze trendy prognozowane na lata 2025–2026, gdzie odchodzi się od czystej czerni na rzecz głębokich, nasyconych barw chromatycznych, redukujących zmęczenie oczu i nadających interfejsom głębię.

Niniejszy dokument dekonstruuje każdy aspekt tego komponentu: od psychofizjologii percepcji kolorów w trybie ciemnym, przez ergonomię rozmieszczenia na różnych urządzeniach (Desktop vs Mobile), aż po złożone zagadnienia dostępności cyfrowej (Accessibility) zgodnie ze standardami W3C ARIA.

## **1\. Fundamenty Teoretyczne: Psychologia Percepcji w Trybie Ciemnym**

### **1.1 Odejście od Czystej Czerni: Analiza Barwy \--teal-800 (\#003737)**

Wymóg zastosowania koloru \--teal-800 (\#003737) jako tła powiadomienia jest decyzją strategiczną, która pozycjonuje interfejs w segmencie "Premium". W teorii koloru cyfrowego, czysta czerń (\#000000) jest często uważana za zbyt agresywną dla ludzkiego oka, szczególnie gdy kontrastuje z jasnym tekstem. Zjawisko to, znane jako "halation" (rozmycie/poświata), powoduje, że białe litery na czarnym tle wydaje się wibrować lub rozlewać, co zwiększa obciążenie kognitywne i zmęczenie wzroku.

Kolor \--teal-800, będący bardzo ciemnym odcieniem turkusu, rozwiązuje ten problem. Jest to barwa chromatyczna o niskiej jasności (Lightness ok. 10-11% w modelu HSL), która zachowuje elegancję czerni, ale wprowadza organiczne ciepło i głębię. Analiza spektralna tego wyboru wskazuje na następujące implikacje projektowe:

* **Emocjonalna Semantyka:** Głęboki turkus kojarzy się ze stabilnością, profesjonalizmem i spokojem. Jest to kolor często wykorzystywany w aplikacjach fintech oraz narzędziach deweloperskich (SaaS), sugerując precyzję i bezpieczeństwo.  
* **Kontrast Semantyczny:** Użycie tła innego niż domyślne tło aplikacji (które często jest jeszcze ciemniejsze, np. \--teal-900 / \#001F1F) pozwala na naturalne oddzielenie warstwy powiadomień od warstwy treści bez konieczności stosowania grubych obramowań. Toast o tle \--teal-800 "wybija się" z najgłębszego tła aplikacji dzięki subtelnej różnicy w odcieniu (hue shift), co jest cechą charakterystyczną nowoczesnych systemów designu.

### **1.2 Hierarchia Uwagi i Czas Trwania**

Zdefiniowany w wymaganiach czas wyświetlania komunikatu wynoszący 4 sekundy jest kluczowym parametrem ergonomicznym. Badania nad interakcją człowiek-komputer (HCI) sugerują, że średni czas skupienia uwagi na powiadomieniach peryferyjnych wynosi od 3 do 8 sekund.

Wartość 4 sekund znajduje się w dolnym zakresie tego przedziału, co wymusza rygorystyczną dyscyplinę w zakresie copywritingu (treści tekstu). Przyjmując średnią prędkość czytania dorosłego człowieka na poziomie 200-250 słów na minutę (około 3-4 słowa na sekundę), użytkownik w ciągu 4 sekund jest w stanie przetworzyć maksymalnie 12-15 słów, uwzględniając czas potrzebny na przeniesienie wzroku (sakkadę) w róg ekranu.

Implikuje to, że komunikaty Toast w tym systemie muszą być atomowe i syntetyczne. Komunikat "Użytkownik został pomyślnie dodany do bazy danych" (7 słów) jest akceptowalny, podczas gdy "Wystąpił nieoczekiwany błąd podczas próby połączenia z serwerem API w celu pobrania danych użytkownika" (14 słów) jest na granicy percepcji w zadanym oknie czasowym. Jeśli komunikat zniknie przed przeczytaniem, system generuje frustrację. Dlatego mechanizm "pauzy po najechaniu kursorem" (Pause on Hover) jest absolutnie krytycznym wymogiem funkcjonalnym, o czym szerzej traktuje sekcja techniczna raportu.

## **2\. System Wizualny: Kolorystyka i Akcenty w Standardzie Premium**

Zgodnie z wymogami, system opiera się na czterech stanach: Sukces, Błąd, Informacja, Ostrzeżenie. Każdy z nich musi współgrać z tłem \--teal-800. Projektowanie w trybie ciemnym wymaga szczególnej uwagi przy doborze kolorów akcentujących, aby spełnić normy dostępności WCAG (Web Content Accessibility Guidelines).

### **2.1 Sukces: Zieleń na Tle Turkusowym**

* **Wyzwanie:** Standardowa "komputerowa zieleń" (\#00FF00) na tle \--teal-800 tworzyłaby nieprzyjemny efekt wibracji kolorystycznej. Z kolei zbyt ciemna zieleń zlałaby się z ciemnym tłem.  
* **Rozwiązanie:** Należy zastosować zieleń o wysokiej luminancji, zgodną z paletą walidacyjną. Rekomendowana barwa akcentu to token \--success-base (\#00E676).  
* **Kontrast:** Dla elementów graficznych (ikona) wymagany jest odpowiedni kontrast względem tła. Kolor \--success-base na tle \--teal-800 osiąga ten współczynnik, tworząc czytelny i estetyczny sygnał "powodzenia".  
* **Zastosowanie:** Akcent ten pojawia się jako ikona oraz opcjonalny pasek boczny lub poświata, co jest zgodne z trendami "Glassmorphism" i "Neon Glow" przewidywanymi na rok 2025\.

### **2.2 Błąd: Czerwień Ostrzegawcza**

* **Wyzwanie:** Czerwień jest kolorem o najniższej luminancji spośród barw podstawowych. Ciemna czerwień na ciemnym turkusie jest praktycznie niewidoczna dla daltonistów (protanopia/deuteranopia).  
* **Rozwiązanie:** Należy użyć czerwieni zoptymalizowanej pod dark mode, zawartej w palecie walidacyjnej. Odcień \--error-base (\#FF5252) zapewnia niezbędną widoczność.  
* **Psychologia:** Czerwień na tle turkusowym tworzy bardzo silny kontrast symultaniczny, co jest pożądane w przypadku błędów krytycznych. Użytkownik natychmiastowo identyfikuje ten stan jako wymagający uwagi.

### **2.3 Informacja: Błękitny Akcent w Harmonii Analogowej**

* **Koncepcja:** Błękit/Cyjan leży w tej samej chłodnej strefie koła barw co turkus. Połączenie informacyjnego akcentu z tłem \--teal-800 tworzy tzw. harmonię analogową.  
* **Efekt:** Jest to połączenie spokojne, niealarmujące, idealne dla komunikatów neutralnych ("Nowa wersja dostępna", "Pobieranie w toku").  
* **Dobór Barwy:** Zgodnie z systemem semantycznym, dla powiadomień typu "Toast informacyjny, status Pending" zdefiniowano token \--info-base (\#66D9E8). Zapewni on nowoczesny i technologiczny charakter, jasno komunikując status bez wywoływania stresu.

### **2.4 Ostrzeżenie: Pomarańcz/Żółć i Luminancja**

* **Koncepcja:** Żółć i pomarańcz to kolory o naturalnie wysokiej jasności. Na ciemnym tle \--teal-800 są one najlepiej widoczne ("pop out").  
* **Dobór Barwy:** Token \--warning-base (\#FF9100) jest ustandaryzowany w systemie designu dla ostrzeżeń. Ostrzega o problemach z siecią lub brakiem środków, zachowując szlachetność pasującą do stylu "Premium".

### **2.5 Typografia i Czytelność**

Wymóg "tekst" implikuje konieczność doboru koloru czcionki. Czysta biel (\#FFFFFF) na tle \--teal-800 daje bardzo wysoki kontrast, co jest doskonałe, ale może być męczące przy dłuższym czytaniu. W projektach premium rekomenduje się użycie skrajnie jasnego, lodowego turkusu, np. \--teal-25 (\#E0F2F2) dla głównego komunikatu oraz \--teal-50 (\#CCF7F4) dla ewentualnego tekstu pomocniczego. Taka hierarchia typograficzna buduje głębię i spójność z bazowym środowiskiem.

## **3\. Anatomia i Konstrukcja Komponentu**

### **3.1 Struktura Fizyczna (Box Model)**

Zdefiniowany styl "niewielki pasek, zaokrąglony, z cieniem" przekłada się na konkretne dyrektywy CSS.

* **Wymiary:** Minimalna szerokość powinna wynosić około 300-320px, aby pomieścić typowe zdanie. Maksymalna szerokość na desktopie nie powinna przekraczać 400-450px, aby uniknąć tworzenia "długich pasków" trudnych do skanowania wzrokiem.  
* **Border Radius:** W trendach na rok 2025 dominują zaokrąglenia rzędu 8px \- 12px. Pełne zaokrąglenie (Pill shape, np. 50px) jest możliwe, ale ogranicza miejsce na treść w rogach. Dla stylu "Premium" i "Glassmorphism", promień 12px jest optymalnym balansem między nowoczesnością a funkcjonalnością.  
* **Padding:** Wewnętrzne odstępy są kluczowe dla "oddechu". Rekomendowany padding to 16px w pionie i poziomie.

### **3.2 Cień i Głębia (Elevation)**

W trybie ciemnym cień (box-shadow) pełni inną funkcję niż w jasnym. W jasnym trybie cień symuluje fizyczną odległość od kartki papieru. W trybie ciemnym, gdzie tło aplikacji może być ciemnoszare lub stanowić mroczny \--teal-900, cień służy do "wyciągnięcia" elementu z mroku. Dla tła \--teal-800, standardowy czarny cień może być słabo widoczny lub wyglądać na brudny. Dlatego stosuje się technikę cienia opartą o najciemniejsze kolory palety oraz wewnętrznego obrysu (Inner Stroke):

1. **Cień Zewnętrzny:** 0px 8px 24px \-4px var(--teal-900) – głęboki, rozmyty cień dający efekt uniesienia, spójny z temperaturą barwową systemu.  
2. **Obrys Wewnętrzny (Ring):** 1px solid var(--teal-500) – subtelna linia z palety wokół komponentu. Jest to kluczowy detali w "Premium Dark Design", symulujący krawędź definiującą geometrię. Zapobiega to zlewaniu się toasta z ciemnym tłem strony.

### **3.3 Układ Wewnętrzny (Grid/Flex)**

Komponent składa się z trzech stref:

1. **Strefa Ikony (Slot Lewy):** Stała szerokość (np. 24px), wyrównana do góry lub do środka względem tekstu.  
2. **Strefa Treści (Slot Środkowy):** Elastyczna (flex-grow: 1), zawierająca tytuł (font-weight: 600\) i opcjonalny opis (font-weight: 400).  
3. **Strefa Akcji/Zamknięcia (Slot Prawy):** Przycisk "X" lub akcja "Cofnij". Musi posiadać odpowiedni obszar kliknięcia (touch target min. 44x44px na mobile), nawet jeśli wizualnie ikonka jest mniejsza.

## **4\. Choreografia i Pozycjonowanie: Desktop vs Mobile**

Wymagania precyzują: Prawy dolny róg (Desktop) oraz Góra (Mobile). Jest to podejście hybrydowe, które wymaga zaawansowanej logiki CSS (Media Queries) i JavaScript.

### **4.1 Desktop: Prawy Dolny Róg (The Notification Center Pattern)**

Umieszczenie powiadomień w prawym dolnym rogu jest standardem ugruntowanym przez systemy operacyjne Windows oraz wiele środowisk IDE (np. VS Code).

* **Ergonomia (Wzorce Skanowania):** Wzorce czytania "F-Pattern" i "Z-Pattern" kończą się w prawym dolnym rogu. Jest to strefa "terminalna", co czyni ją idealną dla informacji podsumowujących (np. "Zapisano").  
* **Nieinwazyjność:** Prawy dolny róg rzadko zawiera kluczowe elementy nawigacyjne (w przeciwieństwie do góry czy lewej strony), co minimalizuje ryzyko zasłonięcia ważnych treści.  
* **Stacking (Stosowanie):** Nowe powiadomienia powinny pojawiać się od dołu, wypychając starsze do góry. Należy jednak ograniczyć liczbę widocznych tostów do maksymalnie 3, aby nie zaśmiecać ekranu.

### **4.2 Mobile: Góra Ekranu (The Push Notification Pattern)**

Wymóg umieszczenia toasta na górze w wersji mobilnej jest niezwykle trafny z punktu widzenia użyteczności (UX).

* **Konflikt "Thumb Zone":** Dolna część ekranu smartfona to główna strefa interakcji kciukiem. Znajdują się tam paski nawigacyjne przeglądarek (Chrome/Safari), klawiatury ekranowe oraz przyciski CTA w aplikacjach. Umieszczenie toasta na dole grozi przypadkowym kliknięciem lub zasłonięciem klawiatury.  
* **Widoczność:** Użytkownik mobilny często patrzy na górną część ekranu w poszukiwaniu statusu (zasięg, bateria). Toast pojawiający się w stylu natywnego powiadomienia iOS/Android ("Banner Push") jest naturalny i oczekiwany.  
* **Bezpieczna Strefa (Safe Area):** Implementacja musi uwzględniać wcięcie na kamerę (Notch) oraz Dynamic Island w iPhone'ach. Margines górny musi być dynamicznie obliczany: top: calc(16px \+ env(safe-area-inset-top));. Bez tego, toast wyląduje pod kamerą i będzie nieczytelny.

## **5\. Fizyka Ruchu: Animacja Slide-In**

Animacja jest językiem mowy ciała interfejsu. Wymóg "slide-in" (wsunięcie) musi zostać zrealizowany z dbałością o fizykę ruchu, aby zachować odczucie "Premium".

### **5.1 Kierunkowość i Wektory**

* **Desktop (Prawy Dół):** Najbardziej naturalny jest wjazd od prawej krawędzi (translateX(100%) \-\> 0\) lub od dołu (translateY(100%) \-\> 0). Wjazd od dołu jest preferowany przy stackowaniu wertykalnym, sugerując narastanie stosu.  
* **Mobile (Góra):** Wjazd od góry (translateY(-100%) \-\> 0). Jest to metafora "opuszczanej karty".

### **5.2 Krzywe Beziera (Easing)**

Liniowa animacja (linear) wygląda nienaturalnie i "tanio". Obiekty fizyczne nie ruszają i nie zatrzymują się natychmiastowo. Dla efektu Premium należy użyć funkcji Spring (sprężystość) lub niestandardowej krzywej Beziera, np. cubic-bezier(0.16, 1, 0.3, 1). Taka krzywa powoduje, że toast wsuwa się szybko, a w końcowej fazie delikatnie wyhamowuje, co daje wrażenie solidności i elegancji.

### **5.3 Animacja Wyjścia i Swipe-to-Dismiss**

Wymóg czasu 4 sekund oznacza, że toast zniknie sam. Animacja wyjścia powinna być subtelniejsza niż wejścia – zazwyczaj jest to zanikanie (Fade Out) połączone z lekkim przesunięciem lub skalowaniem w dół (scale(0.95)). Krytycznym elementem na urządzeniach dotykowych jest gest Swipe to Dismiss (przesuń, by zamknąć). Użytkownik powinien móc "odrzucić" powiadomienie palcem. Fizyka tego gestu musi być oparta na pędzie (momentum) – jeśli użytkownik szybko machnie palcem, toast powinien "wylecieć" z ekranu, nawet jeśli ruch był krótki.

## **6\. Inżynieria Dostępności: Wymogi ARIA i Standardy WCAG**

Dostępność (Accessibility/A11y) nie jest opcją, lecz wymogiem prawnym i etycznym. Oryginalne zapytanie specyfikuje ARIA role="alert", co wymaga głębszej analizy kontekstowej, gdyż może prowadzić do problemów z użytecznością dla osób korzystających z czytników ekranowych.

### **6.1 Analiza role="alert" vs role="status"**

Atrybut role="alert" posiada domyślną właściwość aria-live="assertive". Oznacza to, że czytnik ekranowy (Screen Reader) natychmiast przerywa czytanie bieżącej treści, aby ogłosić powiadomienie.

* **Kiedy stosować role="alert":** Jest to właściwe dla komunikatów o błędach krytycznych (np. "Utracono połączenie", "Błąd zapisu"). Użytkownik musi wiedzieć o tym natychmiast.  
* **Zagrożenie:** Użycie role="alert" dla komunikatu sukcesu ("Zapisano") lub informacji jest błędem w sztuce. Przerywanie użytkownikowi pracy, by krzyknąć "SUKCES", jest irytujące i dezorientujące.  
* **Rekomendacja Ekspercka:** Należy wdrożyć logikę dynamiczną.  
  * Toast typu Error/Warning \-\> role="alert" (aria-live="assertive").  
  * Toast typu Success/Info \-\> role="status" (aria-live="polite"). Tryb "polite" sprawia, że czytnik ogłosi komunikat dopiero, gdy użytkownik zrobi pauzę lub skończy bieżącą interakcję. Zapewnia to płynniejsze doświadczenie.

### **6.2 Zarządzanie Fokusem (Focus Management)**

Powiadomienia Toast z definicji nie powinny przejmować fokusa klawiatury (non-modal). Gdyby toast kradł fokus, użytkownik piszący w formularzu nagle zostałby przeniesiony na dół strony, co jest katastrofalne dla UX.

* **Wyjątek:** Jeśli toast zawiera interaktywny przycisk (np. "Cofnij usunięcie"), użytkownik klawiatury musi mieć możliwość dostania się do niego.  
* **Rozwiązanie:** Toast nie przejmuje fokusa automatycznie, ale powinien być łatwo osiągalny (np. skrótem klawiszowym F6 lub będąc logicznie umieszczonym w DOM). Alternatywnie, po zamknięciu toasta fokus musi wrócić tam, gdzie był.

### **6.3 Zredukowany Ruch (Reduced Motion)**

Dla użytkowników z zaburzeniami błędnika, animacje wsuwania mogą powodować nudności. Należy bezwzględnie obsłużyć media query @media (prefers-reduced-motion: reduce). W tym trybie toast powinien pojawiać się natychmiastowo (lub poprzez proste przenikanie Opacity), bez ruchu przesuwnego.

## **7\. Implementacja Techniczna: Strategia i Architektura**

Poniższa sekcja prezentuje strategię implementacji kodu, uwzględniającą najnowsze wzorce (np. biblioteka Sonner) i wymogi wydajnościowe.

### **7.1 Architektura CSS i Zmienne (Design Tokens)**

Zarządzanie kolorami w systemie opartym na skali turkusu powinno odbywać się poprzez wyznaczone z góry tokeny, co ułatwia utrzymanie spójności.

**Tabela: Specyfikacja Design Tokens dla Toast System**

| Token Zmiennej | Wartość / Zmienna Bazowa | Rola i Zastosowanie |
| :---- | :---- | :---- |
| \--toast-bg | \--teal-800 (\#003737) | Tło główne kontenera. Rekomendowane użycie z backdrop-filter. |
| \--toast-border | \--teal-500 (\#007373) | Subtelny obrys wewnętrzny dla definicji krawędzi. |
| \--toast-text-primary | \--teal-25 (\#E0F2F2) | Główny tekst komunikatu. |
| \--toast-text-secondary | \--teal-50 (\#CCF7F4) | Tekst pomocniczy/opis. |
| \--color-success | \--success-base (\#00E676) | Akcent sukcesu (ikona, pasek boczny). |
| \--color-error | \--error-base (\#FF5252) | Akcent błędu krytycznego. |
| \--color-warning | \--warning-base (\#FF9100) | Akcent ostrzeżenia. |
| \--color-info | \--info-base (\#66D9E8) | Akcent informacyjny. |
| \--shadow-premium | 0 10px 15px \-3px var(--teal-900) | Cień głęboki (elevation). |

### **7.2 Logika Kolejkowania i Stosowania (Stacking Logic)**

Wyświetlanie wielu toastów naraz jest wyzwaniem. Najnowocześniejszym podejściem (2025) jest "Stacking", spopularyzowany przez bibliotekę Sonner. Zamiast listy jeden pod drugim, toasty nakładają się na siebie w osi Z.

* **Toast n (najnowszy):** scale(1), translateY(0), opacity(1).  
* **Toast n-1:** scale(0.95), translateY(-10px), opacity(0.9) – widoczny tuż za najnowszym.  
* **Toast n-2:** scale(0.90), translateY(-20px), opacity(0.8).  
* **Hover:** Po najechaniu myszką, stos "rozklada się" (expand), pozwalając zobaczyć wszystkie komunikaty. To podejście idealnie pasuje do estetyki Premium, redukując bałagan wizualny.

### **7.3 Zarządzanie Czasem (Timer Logic)**

Implementacja 4-sekundowego licznika wymaga precyzyjnej maszyny stanów.

1. **Start:** Licznik rusza w momencie wyrenderowania (onMount).  
2. **Pauza:** Zdarzenie mouseenter (desktop) lub touchstart (mobile) musi zatrzymać odliczanie. Jest to krytyczne dla dostępności – użytkownik czytający powoli nie może stracić komunikatu.  
3. **Wznowienie:** Zdarzenie mouseleave wznawia odliczanie, ale zazwyczaj z minimalnym buforem (np. gwarantowane dodatkowe 2 sekundy), aby użytkownik zdążył zareagować po zabraniu kursora.  
4. **Window Focus:** Dobrą praktyką jest pauzowanie licznika, gdy użytkownik przełączy kartę w przeglądarce (document.visibilityState \=== 'hidden'), aby po powrocie nie zastał pustego ekranu.

## **8\. Kontekst Przyszłościowy: Trendy 2025/2026**

Projektowanie tego komponentu musi uwzględniać kierunek, w jakim zmierza branża.

* **Inteligentne Grupowanie (AI Summarization):** W nadchodzących latach systemy będą agregować powiadomienia. Zamiast wyświetlać 5 osobnych toastów "Plik usunięty", system wykryje sekwencję i wyświetli jeden toast zbiorczy: "Usunięto 5 plików". Implementacja powinna przewidywać API do aktualizacji treści istniejącego toasta zamiast tworzenia nowego.  
* **Estetyka Płynnego Szkła (Liquid Glass):** Tło \--teal-800 nie będzie płaskim kolorem. Będzie półprzezroczystą warstwą z silnym rozmyciem tła (backdrop-filter: blur(16px)), co pozwoli interfejsowi "oddychać" i integrować się z warstwami pod spodem.

## **Podsumowanie Specyfikacji Wdrożeniowej**

Zaprojektowany system powiadomień Toast stanowi syntezę rygorystycznych wymogów funkcjonalnych i nowoczesnej estetyki "Premium Dark". Wykorzystanie koloru \--teal-800 jako fundamentu pozwala na zbudowanie interfejsu, który jest wizualnie kojący, a jednocześnie czytelny dzięki przemyślanemu systemowi akcentów (Zieleń \--success-base, Czerwień \--error-base, Błękit \--info-base, Pomarańcz \--warning-base).

Kluczowe filary sukcesu tego wdrożenia to:

1. **Dostępność:** Dynamiczne role ARIA i pauzowanie czasu na hover.  
2. **Responsywność:** Inteligentne pozycjonowanie (Góra-Mobile / Dół-Desktop) respektujące strefy bezpieczne urządzenia.  
3. **Fizyka:** Sprężyste animacje i gesty swipe, które nadają interfejsowi odczucie namacalności i jakości.

Tak przygotowana specyfikacja jest gotowa do przekazania zespołom deweloperskim (React/Vue/Angular) oraz zespołom QA w celu weryfikacji zgodności ze standardami.