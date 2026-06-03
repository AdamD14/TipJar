# Raport Badawczy: System Ikonografii Interfejsu "TipJar+" – Specyfikacja Projektowa, Analiza Semiotyczna i Standardy Implementacji

## 1. Wstęp Strategiczny: Wizualny Język Zaufania w Erze Web3

### 1.1. Kontekst Projektowy i Definicja Problemu

W krajobrazie cyfrowym roku 2026 interfejsy aplikacji finansowych (FinTech) przechodzą fundamentalną transformację. Aplikacja "TipJar+", pozycjonowana na styku tradycyjnych mikropłatności (tipping) i zdecentralizowanych finansów (Web3), stoi przed unikalnym wyzwaniem komunikacyjnym. Musi ona wizualnie pogodzić dwa z pozoru sprzeczne paradygmaty: "ciepło" i "bezpośredniość" społecznych interakcji darowizny (sugerowane przez nazwę "TipJar" – słoik na napiwki) z "technicznym chłodem" i "rygorem bezpieczeństwa" technologii blockchain.

Zadanie zaprojektowania kompletnego systemu ikon w stylu linearnym (outline/stroke), które są "puste w środku", nie jest jedynie decyzją estetyczną, lecz strategiczną. Badania nad trendami w projektowaniu interfejsów Web3 na rok 2025 wskazują na wyraźne odejście od hyper-abstrakcyjnych, agresywnych form "cyberpunkowych" na rzecz tzw. "human-centric decentralization". Użytkownicy oczekują przejrzystości, dostępności i redukcji szumu wizualnego. Ikony linearne, dzięki swojej lekkości i precyzji, doskonale wpisują się w ten nurt, pozwalając na budowanie interfejsów o dużej gęstości informacji (np. listy transakcji, statusy smart kontraktów) bez przytłaczania użytkownika wizualnym ciężarem.

Niniejszy raport stanowi wyczerpującą specyfikację systemu ikonografii TipJar+, obejmującą nie tylko finalne projekty glifów, ale również głęboką analizę ich konstrukcji geometrycznej, psychologii koloru (Złoto i Fiolet), oraz technicznych aspektów implementacji SVG w środowisku React/Web3. Raport ten ma służyć jako "jedyne źródło prawdy" (Single Source of Truth) dla zespołów projektowych i deweloperskich.

### 1.2. Tożsamość Wizualna a Typografia Mukta

Fundamentem geometrycznym dla systemu ikon TipJar+ jest krój pisma Mukta. Wybór ten nie jest przypadkowy. Mukta to krój humanistyczny, bezszeryfowy i monolinearny, zaprojektowany z myślą o harmonizacji wielu skryptów (Devanagari, Tamil, Latin) bez dominacji żadnego z nich. Ta cecha "współistnienia" jest idealną metaforą dla TipJar+, który harmonizuje świat walut fiat (PLN, USD) z aktywami cyfrowymi (ETH, USDC).

Czerpiąc z charakterystyki Mukty, ikony TipJar+ przyjmują następujące cechy genetyczne:

- **Humanistyczna Geometria**: Unikanie mechanicznej perfekcji geometrycznej na rzecz subtelnych korekt optycznych, które nadają kształtom organiczny charakter.
- **Otwarte Formy**: Podobnie jak litery w kroju Mukta mają otwarte "oczy" (apertures), tak ikony unikają zbędnego domykania kształtów, co zwiększa ich czytelność w małych rozmiarach (16x16px).
- **Monolinearność**: Stała szerokość linii (stroke), która koresponduje z jednolitą grubością liter w nagłówkach i tekście, tworząc spójny rytm wizualny całej aplikacji.

### 1.3. Cel Raportu

Celem niniejszego dokumentu jest dostarczenie kompletnej instrukcji stworzenia systemu ikon, który:

1. Jest Skalowalny: Funkcjonuje równie dobrze na dashboardzie 4K, jak i na ekranie smartfona w trybie 16px.
2. Jest Semantyczny: Jasno rozróżnia akcje finansowe (Złoty) od technicznych operacji Web3 (Fiolet).
3. Jest Dostępny: Spełnia rygorystyczne normy WCAG 2.2, w tym kontrast i czytelność dla osób z zaburzeniami widzenia.

## 2. Architektura Systemu: Geometria i Fizyka Pikseli

Projektowanie ikon na potrzeby nowoczesnych interfejsów wymaga podejścia inżynieryjnego. Każdy piksel ma znaczenie, a decyzje dotyczące grubości linii czy promienia zaokrąglenia mają bezpośredni wpływ na postrzeganą jakość aplikacji ("premium feel").

### 2.1. Siatka Pikselowa (Pixel Grid) i Obszar Roboczy

Podstawą każdego profesjonalnego zestawu ikon jest siatka. Dla systemu TipJar+ przyjęto standard branżowy 24x24px jako rozmiar bazowy kanwy (artboard).

#### 2.1.1. Struktura Kanwy 24px

- **Wymiar Całkowity**: 24 x 24 piksele.
- **Bezpieczny Margines (Padding)**: 2 piksele z każdej strony. Oznacza to, że "obszar aktywny" (live area), w którym rysowana jest większość ikony, wynosi 20 x 20 pikseli. Margines ten jest kluczowy, aby zapobiec optycznemu "przyklejaniu się" ikon do krawędzi przycisków lub sąsiednich tekstów.
- **Centrum Optyczne**: Punkt (12, 12). Wszystkie ikony, nawet te asymetryczne (jak "Klucz" czy "Dłoń"), muszą być wyważone optycznie względem tego punktu, aby w interfejsie nie sprawiały wrażenia "skaczących" przy wyrównaniu do tekstu.

#### 2.1.2. Kształty Kluczowe (Keylines)

Aby zachować spójną wagę wizualną (visual weight) między ikonami o różnej geometrii (np. koło vs kwadrat), system wykorzystuje zdefiniowane kształty kluczowe wpisane w siatkę 24px:

- **Koło**: Średnica 20px (zajmuje pełny obszar live area).
- **Kwadrat**: 18x18px (nie 20x20px, ponieważ kwadrat o boku 20px wydaje się optycznie większy i cięższy niż koło o średnicy 20px – jest to zjawisko znane jako irradiacja).
- **Prostokąt Poziomy**: 20x16px (dla ikon takich jak "Karta Kredytowa" czy "Portfel").
- **Prostokąt Pionowy**: 16x20px (dla ikon takich jak "Dokument" czy "Telefon").

### 2.2. Logika Linii (Stroke) i Skalowalność

Wymaganie projektowe określa styl jako "cienką lub średnią linię". W kontekście współczesnych trendów UI "Dark Mode" oraz "Premium", a także specyfikacji czytelności w 16px, wybór grubości linii jest krytyczny.

#### 2.2.1. Decyzja: Stroke 1.5px

Rekomendujemy zastosowanie grubości linii wynoszącej dokładnie 1.5px dla rozmiaru bazowego 24px.

- **Dlaczego nie 2px?** Linia 2px jest standardem w Material Design, ale często nadaje ikonom charakter "ciężki", "zabawkowy" lub "użytkowy". W aplikacji finansowej, gdzie chcemy komunikować elegancję i precyzję, 2px może dominować nad treścią.
- **Dlaczego nie 1px?** Linia 1px na siatce 24px (w erze ekranów o wysokim DPI) może wydawać się zbyt efemeryczna, krucha i trudna do zauważenia, szczególnie w ruchu lub w warunkach silnego oświetlenia zewnętrznego.
- **Zaleta 1.5px**: Jest to "złoty środek". Zapewnia wystarczającą wagę, by ikona była wyraźna, ale pozostawia więcej "światła" (przestrzeni negatywowej) wewnątrz ikony. To kluczowe dla ikon Web3, które często zawierają złożone detale (ogniwa łańcucha, węzły sieci).

#### 2.2.2. Skalowanie do 16px

Wymóg czytelności w rozmiarze 16x16px jest rygorystyczny.

- **Matematyczne skalowanie**: Jeśli zmniejszymy ikonę 24px z linią 1.5px do rozmiaru 16px, grubość linii wyniesie: 1.5 × (16/24) = 1.0 px.
- Jest to idealny wynik. Linia 1px w rozmiarze 16px jest standardem czytelności ("pixel-perfect"). Gdybyśmy użyli linii 2px w bazie, po przeskalowaniu otrzymalibyśmy 1.33px, co mogłoby powodować antyaliasing (rozmycie) na ekranach o niższej rozdzielczości. Wybór 1.5px gwarantuje więc czystą linię 1px w małych rozmiarach.

### 2.3. Stylistyka Zakończeń i Narożników

Aby odzwierciedlić "humanistyczny" charakter TipJar+:

- **Zakończenia (Caps)**: Round. Wszystkie otwarte końce linii muszą być zaokrąglone. Łagodzi to odbiór interfejsu, czyniąc go bardziej przyjaznym ("social") niż agresywnym ("trading").
- **Połączenia (Joins)**: Round. Wszelkie załamania linii są zaokrąglone.
- **Promień Narożnika (Corner Radius)**:
  - **Zewnętrzny**: 2px. Jest to standard dla nowoczesnych interfejsów, korespondujący z promieniami przycisków i kart w UI.
  - **Wewnętrzny**: 0.5px – 1px. Promienie wewnętrzne muszą być mniejsze niż zewnętrzne, aby zachować optyczną równoległość ścieżek (concentricity). Jeśli zewnętrzny róg ma 2px, a linia ma 1.5px, wewnętrzny róg powinien mieć teoretycznie 2 - 1.5 = 0.5 px.

## 3. System Kolorystyczny i Hierarchia Semantyczna

Zastosowanie koloru w ikonografii TipJar+ wykracza poza dekorację; pełni funkcję nawigacyjną i informacyjną. System opiera się na trzech filarach: Złocie (Wartość), Fiolecie (Technologia) i Neutralności (Struktura).

### 3.1. Złoto: Język Wartości (Primary)

Złoto jest kolorem podstawowym marki TipJar+. W psychologii koloru kojarzone jest z luksusem, sukcesem i tradycyjną wartością pieniądza (kruszec). W aplikacji służy do oznaczania elementów związanych z posiadaniem, przekazywaniem i gromadzeniem wartości.

- **Zastosowanie**: Ikony płatności, portfela, monet, przycisku "Wyślij napiwek".
- **Kod HEX (Dark Mode)**: #FFD700 (Electric Gold) – jasny, nasycony, dobrze widoczny na ciemnym tle.
- **Kod HEX (Light Mode)**: #C5A000 (Metallic Gold) – przyciemniony dla kontrastu na białym tle.
- **Technika**: W ikonie wieloelementowej (np. dłoń wrzucająca monetę), Złoto jest używane jako akcent kluczowy (moneta), podczas gdy reszta (dłoń) może pozostać neutralna lub również przyjąć kolor złoty w stanie aktywnym (active state).

### 3.2. Fiolet: Język Web3 (Accent)

Fiolet (w odcieniach Indigo/Violet) stał się nieoficjalnym standardem wizualnym dla branży Web3 i NFT (np. platformy Polygon, Uniswap). Symbolizuje tajemnicę, kreatywność i technologiczną głębię.

- **Zastosowanie**: Ikony związane z blockchainem, smart kontraktami, NFT, "gas fees" (opłatami sieciowymi) i identyfikacją sieci.
- **Kod HEX**: #9D00FF (Vivid Violet) lub w wersji rozjaśnionej dla Dark Mode: #B95CFF.
- **Funkcja Rozróżniająca**: Użycie fioletu pozwala użytkownikowi natychmiast odróżnić, czy dana akcja dotyczy tradycyjnego przelewu bankowego (ikona Złota/Neutralna) czy interakcji z łańcuchem bloków (ikona Fioletowa). Jest to kluczowy element UX zapobiegający błędom poznawczym.

### 3.3. Neutralny: Język Kontekstu

Biel lub Jasnoszary stanowi "szkielet" systemu.

- **Zastosowanie**: Ikony nawigacyjne (Dom, Ustawienia), akcje edycji, media, elementy interfejsu nie wpływające bezpośrednio na finanse.
- **Kod HEX**: #F5F5F5 (White Smoke) lub #E0E0E0 (dla linii nieaktywnych).

## 4. Biblioteka Ikon TipJar+: Szczegółowa Specyfikacja (30+ Ikon)

Poniżej przedstawiono szczegółowy opis konstrukcji 30 kluczowych ikon, podzielonych na kategorie funkcjonalne. Każda ikona została zaprojektowana zgodnie z zasadą "pusty w środku" (outline) i wykorzystuje technikę "gap" (przerw w linii) do symulowania głębi 3D bez użycia cieniowania.

### Tabela Przeglądowa Kategorii

| Kategoria       | Ilość Ikon | Kolor Wiodący     | Metafora Kluczowa              |
|-----------------|------------|-------------------|--------------------------------|
| A. Płatności    | 6          | Złoty             | Fizyczność, Moneta, Karta, Portfel |
| B. Web3 & Tech  | 6          | Fiolet            | Sieć, Heksagon, Ogniwo, Piorun |
| C. Nawigacja    | 5          | Neutralny         | Dom, Kompas, Użytkownik, Siatka |
| D. Akcje        | 5          | Neutralny/Złoty   | Strzałka, Ołówek, Kosz, Skaner |
| E. Statusy      | 4          | Zmienny           | Tarcza, Zegar, Wykrzyknik, Oko |
| F. Media/Social | 4          | Neutralny         | Dymek, Obraz, Wideo, Glob     |

#### Kategoria A: Płatności (Payments) – Fundament Aplikacji

Ikony te muszą budzić zaufanie. Są "cięższe" semantycznie i często stanowią główne punkty interakcji (Call to Action).

**1. Ikona: wallet-fiat (Portfel Tradycyjny)**  
- **Opis**: Klasyczny, składany portfel męski w widoku izometrycznym lub frontalnym.  
- **Konstrukcja**: Prostokąt 18x14px z zaokrągleniami 2px. Prawa strona posiada pionową linię oddzielającą "skrzydełko". Na skrzydełku mały poziomy element (zapięcie).  
- **Detale**: "Pusty w środku" – brak wypełnienia.  
- **Kontekst**: Saldo PLN/USD, metody płatności kartą.

**2. Ikona: coin-stack (Stos Monet)**  
- **Opis**: Symbol gromadzenia oszczędności. Trzy dyski ułożone jeden na drugim.  
- **Konstrukcja**:  
  - Dolny dysk: Pełna elipsa (szerokość 14px, wysokość 6px).  
  - Środkowy i Górny dysk: Elipsy przesunięte w górę o 4px.  
  - **Technika "Gap"**: W miejscu, gdzie górna moneta nachodzi na dolną, linia dolnej monety jest przerwana (2px przerwy), co tworzy iluzję trójwymiarowości bez dodatkowych linii.  
- **Kontekst**: Całkowite saldo, sekcja "TipJar".

**3. Ikona: tip-hand (Dłoń z Monetą – Ikona Marki)**  
- **Opis**: Dłoń w geście wrzucania monety.  
- **Konstrukcja**:  
  - Dłoń: Otwarta, zwrócona wnętrzem do góry, narysowana płynną linią (nawiązanie do fontu Mukta). Kciuk delikatnie odchylony.  
  - Moneta: Okrąg (6px) zawieszony 2px nad dłonią.  
  - Ruch: Dwie małe pionowe kreski nad monetą sugerujące ruch w dół (drop).  
- **Kolor**: Moneta w kolorze Złotym, dłoń Neutralna lub Złota (zależnie od stanu).

**4. Ikona: credit-card (Karta Płatnicza)**  
- **Opis**: Uniwersalny symbol płatności bezgotówkowych.  
- **Konstrukcja**: Prostokąt 20x14px. Pozioma linia (pasek magnetyczny) 4px od góry. Mały prostokąt (chip) 3x2px po lewej stronie.  
- **Styl**: Minimalistyczny outline.

**5. Ikona: bank-building (Instytucja/Przelew)**  
- **Opis**: Klasyczna fasada banku z kolumnami.  
- **Konstrukcja**: Trójkątny dach (tympanon) oparty na trzech pionowych liniach (kolumnach) i poziomej podstawie (schody).  
- **Redukcja Detali**: W 16px ilość kolumn redukowana jest do dwóch, aby uniknąć zlania się linii.

**6. Ikona: receipt-list (Historia Transakcji)**  
- **Opis**: Dokument z listą operacji.  
- **Konstrukcja**: Prostokąt pionowy 14x18px z "zagiętym rogiem" (dog-ear) w prawym górnym rogu. Wewnątrz trzy poziome linie symbolizujące wiersze tekstu. Pierwsza linia może być Złota (symbolizując kwotę).

#### Kategoria B: Web3 & Blockchain – Warstwa Technologiczna

Tutaj wchodzi akcent Fioletu. Ikony muszą być futurystyczne, ale zrozumiałe.

**7. Ikona: token-hex (Token/Krypto)**  
- **Opis**: Alternatywa dla okrągłej monety. Heksagon (sześciokąt) jest uniwersalnym symbolem tokenów i NFT w Web3.  
- **Konstrukcja**: Sześciokąt foremny wpisany w okrąg 20px. W środku mniejszy sześciokąt lub okrąg (pusty).  
- **Styl**: Ostrość heksagonu kontrastuje z zaokrągleniami reszty systemu, ale wierzchołki heksagonu są lekko zaokrąglone (1px radius), by zachować spójność.

**8. Ikona: gas-station (Opłaty Sieciowe/Gwei)**  
- **Opis**: Dystrybutor paliwa. Metafora opłat za transakcje w sieci Ethereum (Gas).  
- **Konstrukcja**: Prostopadłościan z zaokrągloną górą. Z prawej strony wychodzi wężyk (linia krzywa) zakończony pistoletem (prostokąt).  
- **Kontekst**: Estymacja kosztów transakcji.

**9. Ikona: smart-contract (Inteligentny Kontrakt)**  
- **Opis**: Dokument cyfrowy z pieczęcią kodu.  
- **Konstrukcja**: Baza "Dokumentu" (jak w Historii), ale zamiast linii tekstu, w środku znajduje się symbol węzła lub prosty schemat obwodu (dwie kropki połączone linią łamaną pod kątem 90 stopni).  
- **Kolor**: Akcenty wewnętrzne w kolorze Fioletowym.

**10. Ikona: chain-link (Blockchain/Połączenie)**  
- **Opis**: Dwa ogniwa łańcucha.  
- **Konstrukcja**: Dwa podłużne owale (stadiony) ustawione pod kątem 45 stopni, przenikające się.  
- **Technika Gap**: W miejscach przecięcia linii, stosujemy przerwy, aby pokazać, że jedno ogniwo przechodzi "nad" a drugie "pod". To kluczowe dla efektu "pusty w środku".

**11. Ikona: nft-frame (Kolekcje Cyfrowe)**  
- **Opis**: Obraz w ramie z elementem cyfrowym.  
- **Konstrukcja**: Kwadratowa rama. Wewnątrz uproszczony pejzaż (góry + słońce). Elementem wyróżniającym jest "piksel" (mały kwadrat) wycięty z rogu ramy lub lewitujący obok, sugerujący cyfrową naturę sztuki.

**12. Ikona: wallet-connect (Podłącz Portfel)**  
- **Opis**: Wtyczka lub sygnał połączenia.  
- **Konstrukcja**: Okrąg z symbolem błyskawicy w środku lub stylizowana wtyczka elektryczna wchodząca do gniazdka.

#### Kategoria C: Nawigacja (Navigation) – Szkielet UI

Ikony te są najczęściej używane (pasek dolny, menu boczne), więc muszą być maksymalnie czytelne i neutralne.

**13. Ikona: home-roof (Pulpit)**  
- **Opis**: Dom.  
- **Konstrukcja**: Prosta bryła: dach (kąt 90 stopni, zaokrąglony szczyt) i korpus budynku. Drzwi w kształcie łuku (nawiązanie do humanistycznych łuków fontu Mukta).  
- **Unikanie**: Kominów i okien (zbyt duży szum w 16px).

**14. Ikona: explore-compass (Odkrywaj)**  
- **Opis**: Kompas.  
- **Konstrukcja**: Okrąg 20px. W środku igła kompasu (romb). Jedna połowa igły może być wypełniona (jeden z nielicznych wyjątków) lub zakreskowana, aby wskazać północ, ale w stylu "pusty w środku" preferujemy przedzielenie igły linią na pół.

**15. Ikona: user-profile (Profil)**  
- **Opis**: Awatar użytkownika.  
- **Konstrukcja**: Koło (głowa) o średnicy 8px. Pod nim łuk (ramiona).  
- **Ważne**: Głowa nie styka się z ramionami (przerwa 1.5px). Nadaje to lekkości.

**16. Ikona: settings-sliders (Ustawienia)**  
- **Opis**: Suwaki (Sliders), nie koło zębate (Gear).  
- **Dlaczego**: Koło zębate kojarzy się z "naprawą" lub "inżynierią". Suwaki kojarzą się z "dostosowaniem" i "personalizacją" (np. wysokości napiwku), co lepiej pasuje do TipJar.  
- **Konstrukcja**: Trzy poziome linie. Na każdej linii mały okrąg (uchwyt suwaka) w różnych pozycjach (lewo, prawo, środek).

**17. Ikona: dashboard-grid (Menu/Więcej)**  
- **Opis**: Siatka elementów.  
- **Konstrukcja**: Cztery kwadraty (z zaokrąglonymi rogami) ułożone w siatkę 2x2.  
- **Odstępy**: Przerwy między kwadratami muszą wynosić min. 2px.

#### Kategoria D: Akcje (Actions) – Czasowniki Interfejsu

**18. Ikona: send-plane (Wyślij)**  
- **Opis**: Papierowy samolot. Symbolizuje szybkość i lekkość (Telegram style).  
- **Konstrukcja**: Trójkątny kształt, ostry (ale z radius 1px) skierowany w prawą górę (45 stopni). Linia centralna dzieląca skrzydła.

**19. Ikona: receive-qr (Odbierz/Skanuj)**  
- **Opis**: Ramka kodu QR.  
- **Konstrukcja**: Cztery narożniki (kształt "L"). W środku pozioma linia (laser skanera) lub uproszczony kod (kropki).

**20. Ikona: swap-arrows (Wymiana/Swap)**  
- **Opis**: Dwie strzałki w obiegu.  
- **Konstrukcja**: Strzałka górna w prawo, dolna w lewo. Trzony strzałek zakrzywione, sugerujące ruch po okręgu.

**21. Ikona: edit-pencil (Edytuj)**  
- **Opis**: Ołówek.  
- **Konstrukcja**: Ustawiony pod kątem 45 stopni. Korpus prostokątny, końcówka trójkątna, góra zaokrąglona (gumka).

**22. Ikona: delete-trash (Usuń)**  
- **Opis**: Kosz na śmieci.  
- **Konstrukcja**: Pojemnik z pionowymi liniami (żeberka). Pokrywka uniesiona lekko w górę (stan otwarty).

#### Kategoria E: Statusy (Status) – Informacja Zwrotna

**23. Ikona: status-check (Sukces)**  
- **Opis**: "Ptaszek" w kółku.  
- **Konstrukcja**: Okrąg. Wewnątrz znak akceptacji.  
- **Kolor**: Zawsze Złoty (sukces finansowy) lub Zielony (jeśli system przewiduje, ale w TipJar Złoto zastępuje zieleń w kontekście sukcesu).

**24. Ikona: status-alert (Błąd/Ostrzeżenie)**  
- **Opis**: Wykrzyknik w trójkącie.  
- **Konstrukcja**: Trójkąt z zaokrąglonymi rogami. Wykrzyknik w środku.

**25. Ikona: status-pending (Oczekiwanie)**  
- **Opis**: Zegar / Czas.  
- **Konstrukcja**: Okrąg. Wskazówki na godzinie 3:00.  
- **Styl**: Okrąg może być przerwany (dashed), aby sugerować obrót (loading).

**26. Ikona: visibility-eye (Widoczność)**  
- **Opis**: Oko.  
- **Konstrukcja**: Kształt migdała (soczewka). W środku koło (źrenica).  
- **Wariant**: Przekreślone oko (ukryj saldo).

#### Kategoria F: Media & Social – Społeczność

**27. Ikona: social-chat (Czat/Wiadomość)**  
- **Opis**: Dymek komiksowy.  
- **Konstrukcja**: Zaokrąglony prostokąt lub owal z "ogonkiem" w lewym dolnym rogu.  
- **Wnętrze**: Trzy kropki (...) sugerujące trwającą rozmowę.

**28. Ikona: share-nodes (Udostępnij)**  
- **Opis**: Węzły sieci.  
- **Konstrukcja**: Trzy kropki (jedna po lewej, dwie po prawej). Linie łączące lewą kropkę z prawymi. Symbolizuje dystrybucję.

**29. Ikona: media-image (Obraz)**  
- **Opis**: Ikona zdjęcia.  
- **Konstrukcja**: Kwadrat. Góry i słońce (uproszczone).

**30. Ikona: web-globe (Internet/Język)**  
- **Opis**: Kula ziemska.  
- **Konstrukcja**: Okrąg z siatką (równik i południk). Oś nachylona pod kątem 23.5 stopnia dla dynamiki.

## 5. Implementacja Techniczna (Engineering Standards)

Aby zapewnić, że ikony będą działać bezbłędnie w kodzie (React, Vue, React Native), muszą zostać przygotowane jako czysty kod SVG.

### 5.1. Standard Kodu SVG

Poniższy kod prezentuje wzorcową implementację ikony wallet-line. Zwróć uwagę na brak atrybutów id, class wewnątrz ścieżek oraz użycie currentColor.

```svg
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" />
  <path d="M16 12H21" />
  <path d="M3 7L21 7" />
</svg>
```

**Kluczowe Atrybuty**:

- `viewBox="0 0 24 24"`: Definiuje układ współrzędnych.
- `fill="none"`: Gwarantuje styl "pusty w środku".
- `stroke="currentColor"`: Najważniejszy atrybut. Pozwala na zmianę koloru ikony za pomocą CSS (np. `color: #FFD700` na rodzicu zmieni ikonę na złotą).
- `stroke-width="1.5"`: Domyślna grubość.
- `stroke-linecap="round"`: Zaokrąglone końce linii.

### 5.2. Komponent React (Web3 Integration)

W środowisku React (używanym w 90% projektów Web3), ikony powinny być eksportowane jako komponenty. Pozwala to na łatwe przekazywanie propsów.

```jsx
// TipJarIcon.jsx
import React from 'react';
import PropTypes from 'prop-types';

const iconPaths = {
  wallet: <path d="..." />,
  coin: <path d="..." />,
  // ... mapa wszystkich 30 ikon
};

const TipJarIcon = ({ name, color, size, strokeWidth, className }) => {
  const icon = iconPaths[name];

  if (!icon) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tipjar-icon icon-${name} ${className}`}
    >
      {icon}
    </svg>
  );
};

TipJarIcon.defaultProps = {
  size: 24,
  strokeWidth: 1.5,
  color: "currentColor",
};

export default TipJarIcon;
```

### 5.3. Dostępność (Accessibility - a11y)

Zgodnie z dyrektywami unijnymi na rok 2025 (European Accessibility Act) oraz wytycznymi WCAG 2.2, system ikon musi być dostępny.

#### 5.3.1. Ikony Dekoracyjne vs Funkcjonalne

- **Ikony Dekoracyjne**: Jeśli ikona jest tylko ozdobą obok tekstu (np. ikona "Dom" obok napisu "Pulpit"), musi posiadać atrybut `aria-hidden="true"`, aby czytniki ekranowe (screen readers) ją ignorowały i nie dublowały treści.
- **Ikony Funkcjonalne**: Jeśli ikona jest samym przyciskiem (np. sama ikona lupy oznaczająca "Szukaj"), musi posiadać:
  - `role="img"`
  - `aria-label="Wyszukaj twórcę"` (opis tekstowy akcji).
  - Wewnątrz SVG tag `<title>Wyszukaj</title>`.

#### 5.3.2. Kontrast w Dark Mode

Kolor Fioletowy (#9D00FF) na czarnym tle ma zbyt niski kontrast (ok. 2.5:1). Dla zachowania dostępności (minimum 3:1 dla grafik, 4.5:1 dla tekstu), w trybie ciemnym system musi automatycznie podmieniać fiolet na jaśniejszy odcień, np. Lawendowy (#D0BCFF). Złoto (#FFD700) na czerni ma doskonały kontrast (ok. 14:1) i nie wymaga korekty.

## 6. Dokumentacja i Wytyczne Użycia (Style Guide)

Aby zachować spójność, zespół musi przestrzegać następujących reguł "Do's and Don'ts".

### Tabela Zasad Użycia

| Aspekt          | ZALECANE (Do ✅)                                                                 | ZABRONIONE (Don't ❌)                                      |
|-----------------|----------------------------------------------------------------------------------|------------------------------------------------------------|
| Grubość Linii   | Używaj 1.5px jako bazy. Pogrubiaj do 2px tylko w stanie :hover lub :active.     | Nie skaluj ikon nieproporcjonalnie (rozciąganie). Nie używaj linii cieńszych niż 1px. |
| Kolor           | Złoty dla finansów, Fiolet dla Web3/Tech.                                       | Nie używaj Złotego dla błędów. Nie używaj Fioletu dla salda w PLN. |
| Obrót           | Obracaj tylko ikony ładowania lub strzałki.                                     | Nie obracaj ikon statycznych obiektów (Portfel, Dom).     |
| Wypełnienie     | Używaj wypełnienia tylko dla powiadomień (Badge) lub stanu "Selected" w nawigacji dolnej. | Nie wypełniaj ikon w domyślnym stanie.                    |
| Kontekst 16px   | Używaj wariantów uproszczonych (mniej detali).                                  | Nie zmniejszaj ikony 24px bezpośrednio w CSS bez kontroli grubości linii. |