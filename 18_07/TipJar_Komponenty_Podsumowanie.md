# TipJar+ / DLP / A11y — Zbiorczy Katalog Komponentów

Poniżej wszystkie komponenty z 8 przeanalizowanych dokumentów, podzielone na trzy kategorie wg realnej wartości inżynieryjnej: rzeczy naprawdę warte wdrożenia (z rozwinięciem i moimi propozycjami), solidną, standardową robotę (krótko, do skopiowania 1:1), oraz miejsca, gdzie model źródłowy (Gemini) wyraźnie "odleciał" w naukopodobną narrację, która ładnie brzmi, ale niewiele daje w praktyce.

---

## 🟢 CZĘŚĆ 1 — Naprawdę warte uwagi (z rozwinięciem)

To są komponenty i wzorce, które rozwiązują realne, znane problemy inżynieryjne. Nie są efektowną otoczką — są tym, co faktycznie ratuje aplikację przed konkretną klasą błędów. Przy każdym opisuję, co dokładnie daje, i gdzie widzę sens połączenia z czymś innym albo rozszerzenia.

### A11yAnnouncerProvider + useA11yStateDiff (Global Live Region + Delta Diffing)

To jest najbardziej wartościowy pojedynczy wzorzec ze wszystkich ośmiu dokumentów. Problem, który rozwiązuje, jest prawdziwy i dobrze udokumentowany: w React/Vue, jeśli montujesz `<div aria-live="polite">` warunkowo (czyli tak, jak robi to 90% programistów), czytnik ekranu w ogóle nie zarejestruje treści, bo węzeł nie istniał wcześniej jako "obserwowany" w drzewie dostępności. To nie jest teoria — to udokumentowana, powtarzalna usterka NVDA/VoiceOver.

Rozwiązanie — jeden ukryty, nigdy-nieodmontowywany kontener `polite` i jeden `assertive`, zamontowany raz w korzeniu aplikacji, do którego wszystkie komponenty piszą przez hook zamiast przez własny atrybut `aria-live` — jest proste, tanie i naprawdę działa. To coś, co warto wdrożyć w **każdej** aplikacji SPA, nie tylko w TipJar+.

Druga część (`useA11yStateDiff`) dokłada do tego coś więcej niż standardowe poradniki: zamiast czytać surową liczbę ("45"), hook trzyma poprzednią wartość w `useRef` i produkuje pełne zdanie ("Saldo wzrosło o 5, obecnie 45 USDC"). To rozwiązuje realny problem `aria-atomic` — albo czytnik odczytuje całą, zaśmieconą strukturę karty, albo suchą liczbę bez kontekstu. Oba warianty są złe. Ten trzeci wariant, generowany programowo poza DOM-em, faktycznie jest lepszy od obu.

**Co bym dodał:** połączyłbym to z prostym systemem priorytetów w stylu przyszłego `ariaNotify` już teraz — czyli `announce(message, { priority: 'normal' | 'high' })` jako jeden spójny interfejs, żeby migracja na natywne API, gdy wejdzie do przeglądarek, była jednolinijkowa. Warto też dodać `announce.raw()` dla przypadków, gdzie developer naprawdę wie, co robi, i chce ominąć diffing.

### AccessibilityPriorityMessageBus (throttling / debounce / coalescing dla aria-live)

Bardzo dobry, praktyczny wzorzec middleware'u dla wysokoczęstotliwościowych aktualizacji (kursy walut, order book, liczniki na żywo). Sam atrybut `aria-live="polite"` w środowisku WebSocket bez żadnej moderacji zapycha bufor mowy czytnika ekranu — użytkownik słyszy komunikaty sprzed minuty, bo kolejka nie nadąża. To jest realny, znany problem w aplikacjach tradingowych, nie wymysł.

Konkretne techniki opisane w dokumencie — throttling danych ulotnych, debounce dla wyszukiwarki, message coalescing ("3 operacje wysłania tokenów" zamiast trzech osobnych komunikatów) i czyszczenie przeterminowanych wiadomości z kolejki — to nie ozdobniki, tylko rzeczy, które faktycznie trzeba zaimplementować, jeśli aplikacja ma jakikolwiek strumień danych real-time i ma być dostępna.

**Co bym dodał:** jeden wspólny `EventBus` dla wszystkich czterech technik zamiast czterech osobnych hooków — throttle/debounce/coalesce jako strategie podpinane per typ zdarzenia (`registerStrategy('price-update', throttle(15000))`), żeby dodanie nowego źródła danych nie wymagało pisania nowej logiki bufora za każdym razem.

### Hybrydowy Navigation Guard: NavigationBlockerModal + BeforeUnloadGuard

To jest jedyne słuszne podejście do DLP w SPA i dokument to trafnie diagnozuje: `useBlocker` (React Router) chroni tylko nawigację *wewnątrz* aplikacji, a `beforeunload` chroni tylko *twardą* nawigację (zamknięcie karty, odświeżenie, wpisanie innego URL). Większość implementacji w realnych projektach wdraża tylko jedno z nich — co daje fałszywe poczucie bezpieczeństwa. Dopiero oba razem, sprzężone z tym samym `isDirty`, dają pełne pokrycie.

To jest dokładnie ten rodzaj wzorca, który brzmi banalnie w opisie, a w praktyce prawie nikt go poprawnie nie wdraża — bo wymaga pamiętania o `removeEventListener` w cleanupie `useEffect`, inaczej wycieka pamięć i mnożą się nasłuchiwacze.

**Co bym dodał:** jeden hook `useUnsavedChangesGuard(isDirty)`, który enkapsuluje oba mechanizmy naraz, żeby programista nie mógł przez pomyłkę wdrożyć tylko połowy ochrony. Idealny kandydat na własny mały pakiet npm, bo problem jest uniwersalny, nie tylko dla TipJar+.

### SessionDraftManager (autosave z TTL i wersjonowaniem schematu)

Decyzja o `sessionStorage` zamiast `localStorage` jako miejsca na brudnopis jest dobrze uzasadniona i realnie rozwiązuje dwa konkretne problemy: konflikt między kartami (dwa okna edytujące różne widgety nie będą się już nadpisywać) oraz to, że dane PII nie zostają trwale w przeglądarce. Dodanie TTL i wersji schematu do zapisanego obiektu to szczegół, o którym większość implementacji zapomina — a bez niego draft odzyskany po aktualizacji aplikacji może wysadzić formularz nieznanym kształtem danych.

**Co bym dodał:** kompresję dużych payloadów (np. logo w base64) przed zapisem, żeby nie wpaść w `QuotaExceededError`, o którym dokument słusznie ostrzega — banalny `LZ-string` rozwiązuje 90% takich przypadków bez żadnej dodatkowej infrastruktury.

### ConflictMergeAssistant (toast-based merge zamiast silent overwrite)

Trafna diagnoza trzech możliwych strategii (silent overwrite / autorytatywne uśmiercanie / prompt-based resolution) i słuszny wybór najprostszej z nich jako domyślnej. To pragmatyczne podejście — LWW czy CRDT są przereklamowane dla pojedynczego użytkownika edytującego własny formularz z jednego urządzenia. Prosty toast z pytaniem "znaleźliśmy niezapisane zmiany, przywrócić?" + `form.reset()` faktycznie załatwia sprawę bez budowania systemu rozproszonego tam, gdzie nie jest potrzebny.

### ToastStackEngine + BackdropBlurDelegator (delegacja filtrów rozmycia w stosie)

To jest prawdopodobnie najciekawszy czysto techniczny insight z całego kompletu dokumentów. Problem jest realny i mierzalny: `backdrop-filter: blur()` wymusza na GPU przeliczenie pikseli pod elementem w każdej klatce, a przy stosie pięciu nakładających się toastów z osobnymi filtrami następuje overdraw, który realnie zabija FPS na słabszym sprzęcie mobilnym.

Rozwiązanie — tylko najbardziej wysunięty na osi Z toast dostaje pełny `backdrop-blur`, reszta przechodzi na lity fallback koloru — jest eleganckie właśnie dlatego, że degradacja jest niewidoczna (starszy toast i tak jest częściowo zasłonięty), a oszczędność wydajnościowa jest realna i duża. To wzorzec, który warto zastosować w każdym systemie notyfikacji z efektem szkła, nie tylko w TipJar+.

**Co bym dodał:** ten sam mechanizm delegacji warto rozszerzyć na dowolne stosy modali/dropdownów z glassmorphism, nie tylko toasty — to ogólna zasada "blur tylko na aktywnej warstwie", którą można wydzielić jako niezależny hook `useBlurBudget(maxActiveBlur: 1)`.

### IntersectionAwareParallax (zawieszanie obliczeń poza viewportem)

Prosty, ale często pomijany wzorzec: paralaksa licząca wektory przy każdym `scroll`/`touchmove` bez `IntersectionObserver` powoduje layout thrashing nawet dla elementów, których użytkownik nie widzi. Ograniczenie się do właściwości kompozytowych (`translate3d`) i wyłączenie logiki poza widocznym obszarem to standard, który powinien być domyślny w każdej bibliotece animacji, a rzadko jest.

### TransactionStateHaptic — sprzężenie efektów sukcesu wyłącznie z webhookiem

Pomijając egzotykę konkretnych wartości `hapticSharpness`, sama **zasada architektoniczna** tu opisana jest absolutnie słuszna i uniwersalna: efekt "sukcesu" (wibracja, złoty błysk, konfetti — cokolwiek) nigdy nie powinien być wywoływany z handlera `onClick`, tylko z potwierdzonego zdarzenia backendowego. Case study platformy "Aura" w dokumencie 6, mimo narracyjnej otoczki, ilustruje realny i częsty błąd projektowy — fałszywą afirmację, czyli poinformowanie użytkownika o sukcesie transakcji, zanim transakcja faktycznie się powiodła. To jest coś, co warto wymusić na poziomie architektury (jeden punkt wejścia do wyzwalania stanu sukcesu), niezależnie od tego, czy w ogóle używacie haptyki.

### WebhookSignatureGuard + IdempotencyInterceptor + SELECT FOR UPDATE

To jest jedyna część całego kompletu dokumentów, która czysto **backendowo** jest bez zarzutu i powinna być wdrożona dosłownie tak, jak opisano, bez żadnych poprawek. Weryfikacja podpisu ECDSA nagłówka webhooka, idempotencja przez `Idempotency-Key` w Redis, oraz blokada wierszowa `SELECT ... FOR UPDATE` przy agregacji wpłat w PostgreSQL to nie "fizyka interfejsu" — to podstawowa, dobrze znana higiena inżynierska dla każdego systemu przyjmującego płatności przez webhooki. Write Skew przy równoczesnych wpłatach w izolacji `ReadCommitted` to realna, częsta pułapka, nie hipotetyczny scenariusz.

### QuickTipModal — kotwiczenie kwot 5/10/25

Efekt zakotwiczenia (anchoring) jest jednym z najlepiej potwierdzonych zjawisk w ekonomii behawioralnej, a zastosowanie go do redukcji tarcia decyzyjnego przy mikropłatnościach jest trafne i ma realne pokrycie w praktyce produktową (Patreon, Ko-fi i podobne platformy robią dokładnie to samo). To nie jest neuromarketingowa fantazja — to sprawdzony wzorzec UX.

### FluidTypeScale (clamp() zamiast breakpointów)

Standard branżowy 2024+, w pełni zasłużony. `clamp(min, preferred, max)` faktycznie eliminuje skoki layoutu przy media queries i jest lżejszy w utrzymaniu. Jedyna rzecz warta dodania: `container query units` (`cqw`) tam, gdzie komponent żyje w zmiennej szerokości kontenera, a nie viewportu — dokument o tym nie wspomina, a to naturalne rozszerzenie tego samego podejścia.

---

## 🟡 CZĘŚĆ 2 — Solidna, standardowa robota (do skopiowania 1:1)

Poniższe komponenty są poprawne i użyteczne, ale nie wymagają dodatkowego komentarza — to sprawdzone wzorce z podręcznika, bez zaskoczeń, gotowe do wdrożenia wprost tak, jak opisano w dokumentach źródłowych.

**Warstwa DLP / formularze:** DirtyStateProvider oparte na `dirtyFields` z React Hook Form, DiffPreviewPanel pokazujący konkretną zmianę zamiast ogólnego "masz niezapisane zmiany", UnsavedChangesBadge jako lekki wizualny sygnał bez modala, StaleSchemaWarning przy niezgodności wersji aplikacji, QuotaGuardWrapper pilnujący limitu `sessionStorage`.

**Warstwa monetyzacji / core TipJar+:** ThankYouScreen, RecurringSupportToggle, WalletBalanceCard jako abstrakcja portfela bez ujawniania szczegółów krypto, PayoutDefaultsPanel ze stałymi regułami wypłat (redukcja paraliżu decyzyjnego — to akurat trafne zastosowanie zasady Hicka-Hymana), AutomationSuggestionCard, LiveFanwall z limitem 120 znaków i emoji zamiast pełnych komentarzy (dobra decyzja przeciw moderation hell).

**Warstwa fizyki interfejsu:** ElevatedCard z tokenami cienia subtle/base/elevated/modal, GlassmorphicModal, SpringMotionWrapper z ograniczonym zestawem tokenów duration (micro/small/medium/large), SwipeableCard, RippleTapEffect jako zastępstwo hover na dotyku, HoverOnlyFinePointer wymuszający `@media (hover: hover) and (pointer: fine)` — to akurat bardzo dobra, mało znana praktyka zapobiegająca "zawieszonym" stanom hover na mobile.

**Ergonomia mobilna:** ThumbZoneActionBar (dolny pas 40% ekranu na krytyczne CTA), FPatternDesktopLayout — oba oparte na realnych badaniach ergonomii dotyku, nic tu nie jest naciągane.

**Warstwa haptyczna (architektura, nie liczby):** HapticEngineProvider z pre-warmowaniem (`prepare()`) w celu redukcji latencji, DisabledStateGuard blokujący haptykę na elementach nieaktywnych (zapobiega dysonansowi wzrok-dotyk), HapticIntensityScaler jako ustawienie dostępności, LiveStreamHapticFilter zamieniający ostre uderzenia na łagodne fale podczas streamu (żeby mikrofon nie wyłapał wibracji obudowy — to bardzo konkretny, praktyczny problem).

**Warstwa A11y:** RouteChangeAnnouncer informujący czytnik o zmianie kontekstu przy client-side routingu, AriaNotifyPolyfillWrapper jako warstwa kompatybilności wstecznej do czasu wejścia natywnego API.

**Warstwa dashboardu:** SkeletonScreenShimmer, PendingStateOverlay, TabularNumberDisplay z `font-feature-settings: "tnum"` (prosta, ale skuteczna sztuczka przeciw "skaczącym" liczbom), HoverIntentTooltip z opóźnieniem 500ms.

---

## 🔴 CZĘŚĆ 3 — Tu model odleciał w wyobraźnię

Tu zaczyna się problem z dokumentami źródłowymi: część z nich miesza realną inżynierię z narracją, która brzmi imponująco, ale po rozłożeniu na czynniki pierwsze albo nie da się zweryfikować, albo jest zwykłym design-decision owiniętym w pseudonaukowy język, albo — co gorsza — jest wewnętrznie sprzeczna z resztą materiału. Poniżej najbardziej wyraziste przypadki.

**Iluzje optyczne jako tło interfejsu (RotatingSnakesBackground, PeripheralDriftGrid, OuchiFloatCard).** Cała neurofizjologia w dokumencie 3 — latencja V1/MT, mikrosakady, szlak wielkokomórkowy vs drobnokomórkowy — jest generalnie zgodna z prawdziwą literaturą o iluzji Frasera-Wilcoxa. Problem nie leży w nauce, tylko w przeskoku do wniosku produktowego: sugerowanie, żeby świadomie wywoływać iluzję "wirujących węży" jako *tło sekcji hero* w realnym produkcie SaaS jest złym pomysłem UX, nie dobrym. Te wzory są zaprojektowane, żeby wywoływać dyskomfort percepcyjny i uczucie ruchu tam, gdzie go nie ma — u części użytkowników wywołują realny zawrót głowy i mdłości (to udokumentowane zjawisko przy silnych iluzjach optycznych). To jest też prosto sprzeczne z całym dokumentem 7 o dostępności, który słusznie kładzie nacisk na redukcję obciążenia sensorycznego. Jeśli już, tego typu wzory nadają się do strony-portfolio demonstrującej percepcję, a nie do produktu, z którego ktoś ma korzystać codziennie.

**"Geopolityka koloru" — naukowe uzasadnienie dla wyboru Deep Turquoise.** Efekt Bezolda, hipoteza "TheDress", komplementarność `#006747` i `#ff98b8` — to prawdziwe zjawiska, ale przywołane tu w funkcji uzasadnienia zwykłej decyzji projektowej ("wybraliśmy ciemny turkus, bo jest spokojny i ma dobry kontrast ze złotem i fioletem"). Ta sama decyzja dałaby się uzasadnić w dwóch zdaniach bez cytowania mechanizmów siatkówkowych. To klasyczny przypadek narracji, która ma sprawić, że wybór koloru w Figmie brzmi jak wynik badań laboratoryjnych.

**Moment Kameleona / ChameleonMomentReceiver.** Koncepcja — koduj rytm haptyczny nadawcy jako metadane i odtwórz go jako sekwencję świetlną u odbiorcy — jest ładna literacko, ale jako specyfikacja inżynierska jest pusta. Nie ma tu żadnego nowego mechanizmu ponad zwykłe wysłanie eventu przez WebSocket i odtworzenie zdefiniowanej wcześniej animacji CSS — obudowane w narrację "synestezji" i "obwodu empatii". Sam komponent (odtwórz wzorzec zapisany w bazie jako sekwencję `keyframes`) jest banalny do zrobienia; cała otoczka o "łączeniu dwóch jednostek ludzkich" to marketing, nie architektura.

**Precyzyjne osie czasowe uśmiechu Duchenne'a (T=0ms, T=150ms, T=400ms, T=550ms...).** W dokumentach 4 i 5 pojawia się rozpisana "klatka po klatce" reakcja neurologiczna użytkownika — dokładnie kiedy amygdala interpretuje bodziec, kiedy VTA wystrzeliwuje dopaminę, w którym dokładnie oknie 150 ms rodzi się mimowolny uśmiech. To brzmi jak wynik badania fMRI, a jest w rzeczywistości fabularyzowanym scenariuszem UX bez żadnego pomiaru za sobą. Nie ma nic złego w pisaniu takich scenariuszy jako narzędzia projektowego (to nawet użyteczna technika storyboardingu) — problem jest tam, gdzie fabuła jest prezentowana z taką samą pewnością, jak realne dane techniczne obok niej (np. parametry `SELECT FOR UPDATE`), co zaciera granicę między tym, co zweryfikowane, a tym, co wymyślone na potrzeby narracji.

**Precyzyjne statystyki bez podanego, weryfikowalnego kontekstu.** W dokumencie 3 pojawiają się liczby w stylu "trafność rozpoznawania wyższa o 11% (M=11.05, p<0.001)" albo "r=-0.184, p=0.025" przy ogólnikowych stwierdzeniach o symetrii i obciążeniu poznawczym. Taka precyzja statystyczna przy braku wskazania konkretnego badania i próby jest czerwoną flagą — wygląda na cytat z prawdziwej pracy naukowej, ale w tej formie nie da się tego zweryfikować ani odtworzyć. Traktowałbym to jako ozdobnik retoryczny, nie jako dane, na których warto opierać decyzję projektową.

**"Kontrakt Sandlera" jako uzasadnienie ograniczenia personalizacji.** Sama decyzja produktowa — zamknięty zestaw tokenów animacji zamiast dowolnych krzywych easingu, żeby uniknąć niespójności — jest dobra i uzasadniona. Ale owinięcie jej w metodologię sprzedażową Sandlera (zaprojektowaną do rozmów handlowych B2B, nie do systemów projektowych) to sztuczne dopasowanie słownictwa, które nie dodaje niczego ponad zwykłe "ograniczamy opcje, żeby zapobiec chaosowi wizualnemu — to standardowa praktyka w każdym dojrzałym design systemie (patrz: Material Design, Apple HIG)".

**SPIN jako "sekwencja restrukturyzacji modelu mentalnego twórcy".** Podobny zabieg co wyżej — SPIN Selling to technika rozmowy handlowej z lat 80., naciągnięta tu na strukturę raportu marketingowego. Treść tej sekcji (chaos narzędziowy → utrata kontroli → wypalenie → TipJar+ jako rozwiązanie) jest w gruncie rzeczy zwykłym firmowym one-pagerem sprzedażowym, tylko podpiętym pod nazwę znanej metodologii, żeby brzmiał bardziej "inżyniersko".

---

## Wniosek praktyczny

Jeśli budujesz to naprawdę: **weź całość Części 1 bez wahania**, potraktuj Część 2 jako listę zakupów do zaimplementowania w standardowy sposób, a Część 3 przeczytaj dla przyjemności i weź z niej najwyżej pojedyncze zdanie uzasadnienia do dokumentacji projektowej — nie architekturę.

# TipJar+ — Analiza komponentów: co jest realne, co da się rozwinąć, co przepisać, a co jest czystą fantazją

Poniżej selekcja komponentów z pięciu dokumentów, podzielona nie wg warstwy technicznej (atom/molekuła/organizm), tylko wg **wartości praktycznej**. Cel: oddzielić rzeczy, które faktycznie rozwiązują problem inżynierski, od tych, które są ładnie napisanym marketingiem wewnętrznym.

---

## 1. Bardzo warte uwagi — realne problemy, realne rozwiązania

Te komponenty/mechanizmy nie są "ładne", tylko rozwiązują konkretne, znane z produkcji problemy. Warto je zbudować jako pierwsze, bo błędy w tych miejscach kosztują pieniądze lub użytkowników.

**WebhookIdempotencyGuard + WebhookQueueService (`FOR UPDATE SKIP LOCKED`)**
To jest najbardziej wartościowy fragment całego materiału. Circle (i każdy dostawca webhooków) gwarantuje dostawę "at-least-once" — czyli to samo zdarzenie o zasileniu portfela może przyjść dwa albo trzy razy. Bez idempotency-key + unique index w bazie i bez blokady wierszowej `SKIP LOCKED` masz gwarantowany scenariusz podwójnego zaksięgowania wpłaty przy odrobinie ruchu. To nie jest teoria — to jest dokładnie ten bug, który w prawdziwych fintechach powoduje nocne alarmy. Wart wdrożenia 1:1, bez zmian. Serializable isolation jako alternatywa jest słusznie odrzucone w dokumencie — przy realnym obciążeniu webhookami rzeczywiście generuje transaction thrashing.

**ECDSASignatureMiddleware**
Weryfikacja podpisu `X-Circle-Signature` *przed* deserializacją JSON to jest dobra, konkretna zasada bezpieczeństwa — odcinasz atak na granicy, zanim dotknie logiki biznesowej. To standard w integracjach webhookowych (Stripe robi identycznie), więc jest to sprawdzony wzorzec, nie wymysł.

**GlassModal + isolation: isolate**
Realny problem: `opacity`, `transform`, `filter` tworzą nowy stacking context i potrafią "uwięzić" tooltip albo dropdown wewnątrz karty, mimo wysokiego z-index. `isolation: isolate` jako świadoma, kontrolowana bariera to jest dokładnie to narzędzie, którego brakuje w 90% projektów CSS na produkcji. Warto to opisać jako obowiązkową regułę dla każdej karty z animacją opacity, nie tylko modala.

**PortalHost / OverlayRegistry + fallback do Top Layer (`<dialog>`, `popover`)**
Problem "dropdown ucięty przez overflow: hidden rodzica" to jeden z najczęściej zgłaszanych bugów UI w dużych aplikacjach. Portal + scentralizowany rejestr z kolejnością LIFO to sprawdzony wzorzec (Radix UI robi dokładnie to). Dodatkowo pomysł na feature-detection `supports_top_layer()` z fallbackiem na Portal jest dobrą, pragmatyczną strategią migracji do natywnego `<dialog>`/`popover` — realny kierunek rozwoju platformy webowej, nie spekulacja.

**ZIndexTokenProvider (skala tokenów zamiast magicznych liczb)**
Prosta rzecz, ale krytyczna organizacyjnie. "Wojna na liczby" (999 → 9999 → 99999) to realne zjawisko w każdym większym repo. Skala oparta o interwały 100/1000 z semantycznymi nazwami (`--z-modal`, `--z-toast`) to jest coś, co trzeba wymusić na starcie projektu, bo naprawianie tego later jest bolesne.

**useOptimisticTransaction (Optimistic UI + obsługa opóźnień Web3)**
To jest dobrze przemyślany wzorzec UX dla asynchroniczności blockchaina: pokaż sukces intencji natychmiast (poziom klienta), a "Wait for Transaction Receipt" obsłuż w tle, z miękkim komunikatem przy przekroczeniu marginesu czasu. Różnica między dobrym a złym Web3 UX polega dokładnie na tym.

**FloatingLabelInput z niekarną walidacją**
Zasada "błąd nie przerywa flow, tylko płynnie zmienia kolor obramowania bez layout shift" to konkretna, dobra reguła UX formularzy — i faktycznie różni się od częstego błędu (czerwony tekst pod polem pojawiający się dopiero po submit, wymuszający skanowanie ekranu).

---

## 2. Da się rozwinąć — dobra baza, można dodać coś swojego i będzie robiło robotę

Te komponenty są sensownie zaprojektowane, ale w dokumentach są potraktowane dość ogólnikowo albo połówkowo. Warto je wziąć jako punkt wyjścia i dobudować logikę.

**useSSEListener**
W dokumencie to tylko wzmianka o SSE + Redis Pub/Sub. Warto rozbudować o: reconnect z backoff, deduplikację zdarzeń po stronie klienta (na wypadek powtórzonych eventów z serwera), oraz kolejkowanie animacji — jeśli 5 wpłat przyjdzie w ciągu 200ms, nie chcesz 5 nakładających się animacji "Złotego Rozbłysku" naraz, tylko sensowne throttlowanie/batchowanie wizualne.

**FrozenGlassFilter (SVG displacement zamiast backdrop-filter)**
Techniczne uzasadnienie (koszt GPU rozmycia Gaussa vs. przesunięcie pikseli SVG) jest sensowne i realne — to prawdziwy problem wydajnościowy na mobile. Ale samo `<feDisplacementMap>` + `<feTurbulence>` + aberracja chromatyczna to dopiero punkt startowy. Warto dodać: fallback do zwykłego `backdrop-filter` na urządzeniach, które nie renderują SVG filtrów poprawnie (są takie na starszym Safari), oraz prekompilację mapy przesunięć do statycznego PNG zamiast liczenia jej w locie — to redukuje koszt jeszcze bardziej niż samo przejście z blur.

**BentoGridDashboard**
`grid-auto-flow: dense` + `repeat(auto-fill, minmax(280px, 1fr))` to solidna baza, ale sama specyfikacja nie mówi nic o kolejności ważności kafelków przy różnych rozdzielczościach. Warto dobudować logikę priorytetów (np. `data-priority="1|2|3"`), żeby na wąskim ekranie "dense" nie porozrzucał losowo kart z pieniędzmi pomiędzy karty dekoracyjne.

**SemanticOffsetTokens (korekcja optyczna per-font)**
Sam pomysł tokenów `cap-height-trim` / `baseline-trim` per rodzina fontów jest dobry i faktycznie rozwiązuje realny problem (Mukta Malar vs IBM Plex mają zupełnie inne metryki wertykalne). Ale w dokumencie brakuje mostu do praktyki: warto to połączyć z biblioteką **Capsize** (wspomnianą w źródłach) jako faktycznym silnikiem liczącym te wartości z plików fontów, zamiast ręcznie wpisywać `-0.15em` na oko.

**useHapticFeedback**
Zasada "wibracja nigdy nie jest jedynym nośnikiem komunikacji" jest dobra i warta zachowania. Do rozbudowania: scentralizowany rejestr wzorców (żeby dev nie wymyślał `vibrate([100,50,200])` za każdym razem w innym miejscu), oraz throttling — jeśli SSE dostarcza 10 zdarzeń na sekundę, nie chcesz telefonu wibrującego jak młotek pneumatyczny.

**GoalProgressCard / Kotwica Percepcji ("Złoty Rozbłysk")**
Sama koncepcja hierarchii bodźców (jeden najsilniejszy moment, reszta przyciszona) jest solidną, dobrą zasadą projektową — to w zasadzie odtworzenie klasycznej idei "signature moment" znanej z dobrych aplikacji konsumenckich. Do dodania: guard przed nadużyciem — jeśli twórca ma 50 małych celów, "Złoty Rozbłysk" przy każdym z nich dewaluuje efekt. Warto dorzucić prosty licznik częstotliwości/cooldown na ten konkretny efekt.

---

## 3. Standard — po prostu przekopiuj, nie ma co kombinować

Rzeczy dobrze znane, sprawdzone, nieodkrywcze — nie trzeba nad nimi myśleć, wystarczy zaimplementować zgodnie z opisem.

- **PrimaryButton / SecondaryButton / IconButton** — standardowe warianty przycisków z tokenami kolorów, nic ponad typowy design system.
- **Badge, Tag/Chip, Avatar, ToggleSwitch** — klasyczne atomy UI, opis w dokumentach pokrywa się z tym, co robi każdy porządny system projektowy (Radix, Material, Atlassian).
- **SpinnerSVG, SkeletonBlock** — standardowe stany ładowania, wzorzec znany od lat.
- **ToastNotification / ToastStack** — respektowanie safe-area i zatrzymywanie timera na hover to dobra, ale dziś już powszechna praktyka (podobnie robi Sonner, react-hot-toast).
- **Tooltip z Hover Intent 500ms** — dokładnie tak działają dojrzałe biblioteki tooltipów (Radix Tooltip ma identyczny mechanizm).
- **ElevationSystem (tokeny cieni subtle/base/elevated/modal)** — klasyczna skala elevation, jeden do jednego z Material Design.
- **ThemeProvider z tokenami CSS Custom Properties** — standardowa architektura, nie wymaga dodatkowego namysłu.
- **TabBar, SectionNavItem, NavigationSidebar** — typowa nawigacja aplikacji SaaS, bez niespodzianek.
- **MediaStorageService (Storj + Cloudinary)** — architektura "surowe pliki w object storage + CDN transkodujący na krawędzi" to dziś branżowy standard (dokładnie tak samo robi to większość platform z UGC).

---

## 4. Model "popłynął w wyobraźni" — ładna proza, wątpliwa użyteczność inżynierska

To są fragmenty, w których dokumenty przechodzą z opisu architektury w literacki, mocno przesadzony język — albo opisują mechanizmy, które w praktyce nie mają solidnego uzasadnienia technicznego, albo dają rozwiązania nieproporcjonalnie skomplikowane do problemu.

**"Moment Rozszerzonych Źrenic" i cała neurochemia (oksytocyna, noradrenalina, dopamina)**
Dokument przypisuje konkretnym animacjom CSS bezpośredni, mierzalny wpływ na wyrzut neuroprzekaźników i fizyczne rozszerzenie źrenicy użytkownika. To nie jest projektowanie UX — to jest literatura. Sama koncepcja "jeden mocny moment kulminacyjny, reszta przyciszona" (patrz punkt 2, Kotwica Percepcji) jest sensowna, ale uzasadnienie biologiczne jest ozdobnikiem, nie specyfikacją do wdrożenia. Nie buduj komponentu na podstawie tego, że ma "wywołać kaskadę oksytocyny" — buduj go, bo jeden wyraźny moment nagrody na ekranie faktycznie działa lepiej niż dziesięć rozproszonych.

**Sekcja 6 dokumentu o typografii ("Przełomowe algorytmy inżynieryjne")**
To jest najbardziej jaskrawy przypadek. Kilkanaście akapitów napisanych w stylu strumienia świadomości, z tym samym zdaniem powtarzanym w kółko z drobnymi wariacjami ("asymetrycznie", "precyzyjnie", "rygorystycznie" powtórzone dosłownie kilkaset razy), zamiast konkretnej specyfikacji. Sam temat (text-box-trim, Capsize, offset = (ascender − x-height − descender) / 2) jest realny i warty wdrożenia — ale trzeba go wyłuskać z tego tekstu, a nie kopiować styl czy strukturę argumentacji. To jest dokument, który zaczął dobrze i utonął we własnej retoryce.

**Cała otoczka "Halo Effect", "Aesthetic-Usability Effect" jako uzasadnienie biznesowe dla marek luksusowych**
Same zjawiska psychologiczne są prawdziwe i znane z literatury NN/g, ale ich rozdęcie do rangi argumentu o "agonii konkurencji" i "miażdżącym osądzie rzemieślniczego wykonania" przy błędzie wyrównania o 2 piksele to czysta hiperbola. Realny wniosek z tych efektów to jedno zdanie: drobne niespójności wizualne obniżają postrzeganą jakość produktu — reszta to ozdobnik.

**"Aberracja chromatyczna" i "Równanie Snella-Descartesa" w kontekście przycisku w interfejsie**
Fizyczna symulacja załamania światła i rozszczepienia spektrum na krawędziach elementu UI robionego w SVG to efektowny pomysł wizualny, ale nazywanie tego "implementacją praw fizyki optycznej" nadaje mu nieproporcjonalną powagę. To jest dekoracyjny efekt CSS/SVG, nie inżynieria optyczna — warto to zbudować jako `FrozenGlassFilter` (patrz punkt 2), ale bez traktowania fizyki jako realnego wymogu specyfikacji.

**Trzy Małe "Tak" — 12-stopniowa sekwencja mikro-zgód kognitywnych**
Podział na dokładnie 12 punktów po 3 na każdy z 4 systemów wygląda na sztuczną, odgórnie narzuconą numerologię, żeby dopasować się do stylistyki "3 małych tak" z psychologii sprzedaży. Realna treść w środku (etykieta unosi się płynnie, karta reaguje na hover, modal nie gubi kontekstu) jest sensowna i pokrywa się z punktami 1–3 powyżej — ale rama "12 mikro-zgód" to opakowanie marketingowe, nie architektura komponentów.

**Fragmenty o Storj — "11 dziewiątek trwałości" i "filozofia niezależności twórczej"**
Techniczny opis (erasure coding, geograficzna dystrybucja fragmentów, zgodność z S3) jest poprawny i użyteczny (patrz punkt 3), ale otoczka o "niezależności twórczej" stojącej w sprzeczności z "archaiczną replikacją hiperskalerów" to język marketingowy dostawcy, nie argument inżynierski do decyzji architektonicznej. Wybór Storj vs. S3 powinien się opierać o koszt i SLA, nie o narrację.

---

## Podsumowanie praktyczne

Jeśli miałbyś ograniczony czas na start projektu, buduj w tej kolejności: **sekcja 1** (bo błędy tam kosztują realne pieniądze i bezpieczeństwo), potem **sekcja 3** (bo to szybkie, znane wzorce, nie trzeba wymyślać koła), potem **sekcja 2** (bo wymaga dodatkowej pracy koncepcyjnej, ale się opłaca), a **sekcję 4** czytaj dla inspiracji estetycznej, nie jako specyfikację techniczną do kopiowania 1:1.



ATOMY Podstawowe elementy — nierozdzielne jednostki UI
PrimaryButton
Złoty CTA (--gold-400), scale(0.98) na kliknięcie, optyczne wyrównanie tekstu wg cap-height, haptyczne navigator.vibrate(100)
Mikrointerakcje + Typografia
SecondaryButton
Wariant z obrysem w --purple-300, niższy poziom intensywności na skali kotwicy percepcji, brak haptyki
Mikrointerakcje
IconButton
Przycisk ikonowy z obowiązkowym Tooltipem, aria-label, wyśrodkowanie ikony wg optyki wizualnej, nie matematycznie
Typografia
SpinnerSVG
Wektorowy spinner 4.5px stroke, wariant złoty (przyciski) i gradientowy --gold-400→--purple (modale), zastępuje tekst CTA podczas async
Mikrointerakcje
SkeletonBlock
Shimmer pseudoelement translateX, pętla 1.5s, przejście --teal-800→--teal-700. Poziom 3 intensywności — zero haptyki
Mikrointerakcje
Badge
Semantyczne warianty: success, error, info, warning, pending. Token kolorystyczny zakodowany w prop — zakaz stosowania złota poza CTA
Mikrointerakcje
Avatar
Zdjęcie twórcy z maską Squircle (clip-path SVG, clipPathUnits="objectBoundingBox"), responsywny bez deformacji krzywej Lamégo
Optyka interfejsu
ProgressBar
Pasek celu zbiórki z shimmer w stanie 0%, animacja fill przy aktualizacji SSE, wariant "Goal Achieved" z --gold-400
Mikrointerakcje + Somatyka
ToggleSwitch
Przełącznik ustawień platformy, mikrostuknięcie haptyczne tylko On→Off, akcent --purple-300 (warstwa nawigacji systemowej)
Mikrointerakcje
Tooltip
Hover Intent 500ms opóźnienie — zapobiega miganiu. Poziom 3 intensywności, z-index --z-tooltip 1500, zero haptyki
Mikrointerakcje + Z-index
ToastNotification
Powiadomienie z --ease-spring 400ms, respektuje safe-area-inset, zatrzymuje timer gdy kursor/palec w obszarze, z-index 9999
Mikrointerakcje + Z-index
Tag / Chip
Etykieta kategorii lub filtra. Zakaz stosowania --gold-400 — użycie złota wyłącznie w kontekście monetyzacyjnym
Mikrointerakcje
MOLEKUŁY Komponenty złożone — kilka atomów z jedną funkcją
FloatingLabelInput
Pole z unoszącą etykietą: blur→ramka --teal-700, focus→ramka --purple-300 + poświata, error→--error-base + shake + haptyka zstępująca. 150ms ease-in-out
Mikrointerakcje + Somatyka
CurrencyInput
Pole kwoty USDC z font-feature-settings: "tnum" — cyfry nie przesuwają układu przy live ticker. Walidacja min/max z lokalną eskalacją sensoryczną
Somatyka + Typografia
AmountSelector
Szybki wybór kwoty (np. $5, $10, $20) — przyciski grid z animacją wyboru --ease-spring, zmienia stan Primary CTA
Mikrointerakcje
FormFieldWrapper
Wrapper: FloatingLabelInput + komunikat walidacji + helper text. Zarządza pętlą OODA fazy Akcji — zero wstrząsów layoutu przy błędzie
Somatyka
GoalProgressCard
Karta celu zbiórki z ProgressBar, licznikiem USDC (tnum), stanem shimmer przy 0%, animacją "Goal Achieved" z --ease-spring + złota poświata
Mikrointerakcje + Somatyka
StatCard
Karta metryki analitycznej. Bento Grid kafelek 1×1 lub 2×1. Uniesienie --shadow-1→--shadow-2 na hover, gradient 110° reagujący na focus bez translateY
Optyka interfejsu + Somatyka
FanSupportCard
Karta wpłaty fana w Masonry Grid. Wjazd --ease-enter 300ms po osi Y, puls --success-light na 2s, znika do --bg-surface-base. Poziom 1 intensywności
Mikrointerakcje
CreatorCard
Karta twórcy z Avatar (Squircle), nazwą (Mukta --fs-display), statystykami (tnum). Uniesienie sprężynowe 200ms na hover, paralaksa tła
Somatyka + Optyka interfejsu
TabBar
Nawigacja sekcji Studio/Profil/Analityki. Fokus klawiatury --purple-300 outline, przejście 200ms --ease-standard. Poziom 2 intensywności
Mikrointerakcje
SectionNavItem
Element nawigacji bocznej Studia. --purple-300 jako kolor nawigacji systemowej (oddzielony semantycznie od złota finansów)
Mikrointerakcje
MediaCard
Karta treści twórcy z miniaturką Squircle, tytułem, metadanymi. Cloudinary URL z auto-AVIF/WebP, lazy loading
Optyka interfejsu
ErrorStateDisplay
Stan pustego/błędnego widoku: ikona + tytuł + opis + CTA recovery. Używa tylko --error-base, zero złota — zakaz fałszywych sygnałów nagrody
Mikrointerakcje
ORGANIZMY Złożone sekcje z własną logiką stanu i efektami
GlassModal
Frozen Glass 3.0: backdrop-blur 16px, nieprzezroczystość 0.9, ramka --teal-700, wejście scale(0.95)→1 300ms --ease-enter. Z-index --z-modal 1000, isolation: isolate
Somatyka + Z-index + Optyka
BottomSheet
Mobile modal 85% vh, uchwyt 40×4px. Rubber-band physics przy swipe-down z niezapisanymi danymi: opór + single vibrate "bariera". Swipe-up zamknięcie
Mikrointerakcje
TransactionModal
Pełny flow płatności: AmountSelector + CurrencyInput + PrimaryButton + SpinnerSVG + OptimisticUI. Zarządza ERC-4337 UserOperation, Paymaster, rollback
Mikrointerakcje + Optyka interfejsu
FanWallLive
Masonry Grid z SSE / Redis Pub-Sub. Nowe karty wjeżdżają --ease-enter bez layout shift. Kotwica percepcji: Zloty Rozbłysk przy ukończeniu celu
Mikrointerakcje
CreatorHero
Sekcja hero profilu z Avatar Squircle, --fs-display (clamp()), paralaksa warstw na ruch kursora/palca, cień --shadow-2 elevated. IBM Plex + Mukta Malar
Somatyka + Typografia
MonetizationPanel
Panel Studia: lista GoalProgressCard + StatCard w Bento Grid. Pole Kotwicy Percepcji — tutaj wyzwala się "Złoty Rozbłysk" przy 100% celu
Mikrointerakcje + Somatyka
OnboardingWizard
Kreator profilu (Scena Kaskady Oksytocyny): GlassModal → FormFieldWrapper → klik "Uruchom profil" → sekwencja 400ms zamknięcia → materializacja CreatorHero
Somatyka
BentoGridDashboard
grid-template-columns: repeat(auto-fill, minmax(280px,1fr)), grid-auto-flow: dense. Asym. kafelki 1×1, 2×1, 2×2. Gap 24px na --teal-900, Squircle karty
Optyka interfejsu
NavigationSidebar
Panel Studio: sekcje Monetyzacja / Analityki / Ustawienia. Sticky, z-index --z-navigation 1020, isolation: isolate, --purple-300 aktywny element
Z-index + Mikrointerakcje
LiveStreamOverlay
Nakładka do streamu: FanWallLive mini + GoalProgressCard + animacje przychodzącej wpłaty na żywo. Generowanie kodu QR, eksport URL
Mikrointerakcje
QRCodeModal
GlassModal z wygenerowanym QR do profilu twórcy, przycisk copy URL, share. Frozen Glass karta z SVG displacement map wewnątrz
Somatyka + Optyka interfejsu
ToastStack / NotificationCenter
Zarządza kolejką Toastów, respektuje safe-area, zatrzymuje timer przy hover/touch, odpowiada na Esc. Architektura LIFO — Portal w #toast-root
Z-index + Mikrointerakcje
STRONY / WIDOKI Next.js App Router — trasy i ich kompozycja
/[username]
Publiczny profil: CreatorHero + FanWallLive + MonetizationPanel (GoalCards) + TransactionModal. Główny punkt konwersji fana
Mikrointerakcje + Somatyka
/studio
Panel twórcy: NavigationSidebar + BentoGridDashboard ze StatCards + MonetizationPanel. SSE aktywne — live updates bez odświeżania
Wszystkie dokumenty
/studio/analytics
Rozbudowany widok analityk: wykresy (tnum wszędzie), historia transakcji, eksport. BentoGrid 2×2 dla kluczowych metryk
Somatyka + Optyka interfejsu
/onboarding
Flow OnboardingWizard od rejestracji do "Uruchom Profil". Kulminuje w Scenie Kaskady Oksytocyny — CreatorIdentityLaunch
Somatyka
/studio/settings
Ustawienia konta, portfela Circle/Web3, powiadomień. Heavy FormFieldWrapper, ToggleSwitch, zarządzanie Passkey/ERC-4337
Mikrointerakcje + Optyka interfejsu
/overlay/[username]
Strona tylko do streamu OBS/BRTM: LiveStreamOverlay full-screen, transparentne tło, animacje wpłat, mini FanWall. Zero nawigacji
Mikrointerakcje
SYSTEM / PROVIDERZY Architektura — tokeny, konteksty, hooki, warstwy
ZIndexTokenProvider
CSS Custom Properties w :root: --z-base 1, --z-navigation 1020, --z-modal 1000, --z-toast 9999, --z-tooltip 1500. Jedyne źródło prawdy dla osi Z
Z-index
PortalHost / OverlayRegistry
React Portal Manager: tablica aktywnych nakładek, LIFO zamykanie, Esc handler na najwyższym poziomie. Feature detection: supports_top_layer() → <dialog>
Z-index
ThemeProvider
Dark Mode (--teal-900 base), tokeny --gold-400, --purple-300, --success-base, --error-base, --ease-spring cubic-bezier(0.175,0.885,0.32,1.275)
Mikrointerakcje + Somatyka
TypographyScale
clamp() fluid scale: --fs-display→--fs-caption. IBM Plex Sans body, Mukta Malar headers. font-feature-settings: "tnum" globalnie na liczbach. text-box-trim: trim-both cap alphabetic
Typografia + Somatyka
useHapticFeedback
Hook: typeof navigator.vibrate === 'function' check, fallback graceful. Wzorce: tap [100], error [200,50,200], success [100,50,200]. Nigdy jedyny nośnik komunikacji
Mikrointerakcje
useSSEListener
Hook Server-Sent Events + Redis Pub/Sub. Callback onNewSupport(card) → FanWallLive, onGoalUpdate(progress) → MonetizationPanel, onGoalComplete() → Kotwica
Mikrointerakcje + Optyka interfejsu
useOptimisticTransaction
Stan lokalny "sukces intencji" przed potwierdzeniem blockchain. Rollback przy serialization_failure. Zmienia CTA na "Transakcja wysłana. Oczekiwanie na sieć..."
Optyka interfejsu + Mikrointerakcje
useReducedMotion
prefers-reduced-motion: reduce → zeruje wszystkie --ease-spring, blokuje translateXYZ, zastępuje opacity crossfades 150ms. Globalny override w ThemeProvider
Mikrointerakcje
SemanticOffsetTokens
JSON tokeny korekcji optycznej per-font: IBM Plex (offset-ratio: 1, trim: 0em) vs Mukta Malar (offset-ratio: 0.85, cap-height-trim: -0.15em, baseline-trim: -0.22em)
Typografia
IsolationBoundary
Wrapper z isolation: isolate — hermetyzuje kontekst stosu komponentu. Obowiązkowy na każdym mikro-frontendzie, GlassModal, kartach z opacity, transform
Z-index
ElevationSystem
Tokeny cieni: --shadow-subtle 4px, --shadow-base 8px, --shadow-elevated 16px, --shadow-modal 24px. Spring(response 0.3, damping 0.8) na hover
Somatyka
FrozenGlassFilter
SVG <feDisplacementMap> + <feTurbulence> zamiast backdrop-filter: blur(). <feColorMatrix> aberracja chromatyczna. Pre-kalkulowany — zero narzutu GPU w runtime
Optyka interfejsu
BACKEND / API (NestJS) Moduły serwerowe — transakcje, bezpieczeństwo, media
WebhookIdempotencyGuard
NestJS Guard: UUID v4 Idempotency-Key → UNIQUE INDEX w PostgreSQL. Blokuje podwójne zasilenie konta przy at-least-once delivery Circle
Optyka interfejsu (backend)
ECDSASignatureMiddleware
Weryfikacja X-Circle-Signature przed deserializacją JSON. Klucz publiczny z /v1/notifications/publicKey/get. Odcina spoofing na krawędzi sieci
Optyka interfejsu (backend)
WebhookQueueService
SELECT ... FOR UPDATE SKIP LOCKED via Prisma raw query. Batch 50 zdarzeń per worker, ExclusiveLock, COMMIT po przetworzeniu. Eliminuje race conditions
Optyka interfejsu (backend)
CirclePaymasterService
Integracja ERC-4337 UserOperation + Gas Station sponsorship. Abstrakcja opłat sieciowych dla fana — zero gas-fees UX. Obsługa opóźnień RPC
Mikrointerakcje (async)
MediaStorageService
Upload do Storj DCS (Erasure Coding, S3-compatible, Object Lock WORM). Cloudinary auto-fetch URL: AVIF/WebP transcode, smart crop pod Squircle/Bento
Optyka interfejsu (backend)
SSEGateway
NestJS + Redis Pub/Sub → Server-Sent Events do otwartych klientów. Kanały: new-support, goal-update, goal-complete. Triggeruje Kotwicę Percepcji po stronie UI
Mikrointerakcje (backend)

