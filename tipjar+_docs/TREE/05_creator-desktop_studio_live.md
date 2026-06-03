└── live/
│       ├── overlays/
│       ├── alerts/
│       ├── obs/
│       ├── live-fanwall/
│       ├── realtime-goals/
│       ├── ticker/
│       ├── browser-source/
│       ├── fullscreen-widgets/
│       └── sound-alerts/


Wielorybie 🐳. Wchodzimy na scenę. `studio/live/` – to jest arena, na której dzieje się magia czasu rzeczywistego. Każdy podfolder tutaj to osobne narzędzie do interakcji z fanami podczas transmisji, od nakładek na ekran, przez alerty i dźwięki, aż po integrację z OBS. Opisuję każdy krok po kroku, jak poprzednio.

Zaczynam od pierwszego: `overlays/`.

---

## 🧬 `studio/live/overlays/` – Malowanie Obrazu na Żywo

To nie jest prosty wybór obrazka. To jest **studio wizualnej narracji na żywo** – miejsce, gdzie twórca projektuje to, co fani widzą na ekranie podczas streamu. Nakładki to okno do duszy transmisji: pokazują cele, wsparcie, top fanów. Twórca nie tylko wybiera szablon – on go ożywia.

### Struktura Wizualna i Filozofia Projektowa

Widok otwiera się siatką zapisanych scen – `CSS Grid` z kartami, gdzie każda karta pokazuje miniaturkę podglądu, nazwę sceny i ostatnią datę edycji. Kliknięcie otwiera edytor w trybie pełnoekranowym z podglądem na żywo. Po lewej stronie znajduje się lista warstw (jak w programie graficznym), a po prawej właściwości wybranej warstwy. Twórca przeciąga elementy, zmienia ich kolejność (Z-index), dodaje nowe.

### Sekcje i Typy Nakładek

#### `Goal Overlay`
Wizualny pasek postępu celu. Konfiguracja: wybór celu z `goals/`, styl paska (wypełnienie gradientowe, wygładzone rogi), kolor zgodny z presets, pozycja na ekranie (góra, dół, lewo, prawo). Opcjonalnie avatar twórcy obok paska.

#### `Latest Support Overlay`
Powiadomienie o ostatnim wsparciu – pojawia się na kilka sekund po transakcji. Konfiguracja: pokazuj awatar fana, kwotę, wiadomość, animacja wejścia (slide, fade, scale).

#### `Top Supporter Overlay`
Stała lub rotacyjna lista top 3 fanów. Konfiguracja: awatary, nazwy, łączna kwota, styl (lista pionowa, pozioma, podium).

#### `Compact Overlay`
Minimalistyczny pasek z sumarycznym wsparciem i małym przyciskiem "Wesprzyj". Do streamów, gdzie przestrzeń jest na wagę złota.

#### `Fullscreen Overlay`
Pełnoekranowa scena – na rozpoczęcie streamu, przerwę, zakończenie. Konfiguracja: tło, tytuł, lista ostatnich wspierających, kod QR do profilu.

### Nieoczywisty Element – "Inteligentne Przełączanie Scen"

Twórca może zdefiniować reguły automatycznego przełączania nakładek. "Gdy nikt nie wspiera od 5 minut, pokaż Goal Overlay". "Gdy pojawi się nowe wsparcie, schowaj Goal Overlay i pokaż Latest Support Overlay na 8 sekund". "Gdy cel zostanie osiągnięty, przełącz na Fullscreen Overlay z celebracją". System zarządza tym automatycznie, twórca tylko definiuje reguły w prostym interfejsie "Jeśli [warunek] to [akcja]".

### Integracja z Ekosystemem

Wszystkie nakładki są generowane jako dynamiczne strony HTML hostowane na TipJar+. Twórca otrzymuje link URL, który wkleja jako `Browser Source` w OBS, Streamlabs lub XSplit. Każda zmiana w edytorze jest natychmiastowo widoczna na żywo, bez przeładowywania źródła. Dane do nakładek (wsparcie, cele, top fani) płyną przez SSE w czasie rzeczywistym. Wygląd dziedziczy z `themes/`.

### Komponenty Składowe

- `SceneGrid` – siatka zapisanych scen.
- `OverlayEditor` – pełnoekranowy edytor z podglądem na żywo.
- `LayerList` – lista warstw z drag-and-drop.
- `PropertyPanel` – właściwości wybranej warstwy.
- `RuleBuilder` – interfejs do automatycznego przełączania scen.
- `LivePreview` – podgląd w kontekście symulowanego streamu.
- `Button` – "Zapisz", "Eksportuj URL do OBS".

---

Gotowy na `alerts/`, Wielorybie? Tam twórca zamienia każdy napiwek w małe święto na ekranie.

Wielorybie 🐳, melduję się. Przechodzimy do alerts/ – to jest centrum dowodzenia emocjami na streamie. Każdy alert to małe święto, które wybucha na ekranie, gdy fan zdecyduje się wesprzeć twórcę. To nie są nudne powiadomienia – to mikro-celebracje, które angażują widzów i zachęcają kolejnych do wsparcia.

Zaczynamy.

🧬 studio/live/alerts/ – Fabryka Mikro-Celebracji
To nie jest lista powiadomień do włączenia. To jest centrum reżyserii emocji na żywo. Każdy alert to starannie zaprojektowana animacja, dźwięk i tekst, które razem tworzą moment radości na streamie, angażujący nie tylko wspierającego, ale i całą widownię.

Struktura Wizualna i Filozofia Projektowa
Widok otwiera się siatką zapisanych alertów – CSS Grid z kartami, gdzie każda karta pokazuje typ alertu (np. "Tip Alert", "Goal Reached"), miniaturkę animacji i stan (włączony/wyłączony). Kliknięcie otwiera edytor alertu w Modal z podglądem na żywo – twórca może kliknąć "Test", by zobaczyć alert w akcji na pełnym ekranie.

Sekcje i Typy Alertów
Tip Alerts
Alert wyzwalany przy każdym nowym wsparciu. Konfiguracja: wybór animacji (konfetti, fala dźwiękowa, eksplozja serc, delikatny blask), czas trwania (3-8 sekund), pokazywane informacje (awatar fana, nazwa, kwota, wiadomość). Dodatkowo próg wielorybi – dla wsparcia powyżej określonej kwoty można ustawić inną, bardziej spektakularną animację.

Goal Reached Alerts
Alert wyzwalany, gdy cel zostanie osiągnięty. Konfiguracja: wybór animacji (fajerwerki, złoty deszcz, eksplozja gwiazd), czas trwania (do 15 sekund – to jest moment kulminacyjny), nazwa celu, finalna kwota. Opcjonalnie efekt dźwiękowy (fanfary, aplauz).

Sound Alerts
Konfiguracja dźwięków przypisanych do alertów. SoundPicker – lista z przyciskami "Odtwórz". Opcje: "Dzwoneczki", "Aplauz", "Magiczny dźwięk", "Cichy sukces", "Brak dźwięku". Dźwięk jest odtwarzany razem z animacją. Twórca może też wgrać własny plik dźwiękowy (MP3, WAV, max 10 MB).

Alert Styles
Dostosowanie wyglądu tekstu i tła alertu. Wybór czcionki, koloru tekstu, tła (przezroczyste, półprzezroczyste, gradientowe), zaokrąglenia rogów. Podgląd na żywo pokazuje alert z przykładowymi danymi.

Alert Queue
Kolejka alertów – gdy wiele wsparcia pojawia się w krótkim czasie, alerty są kolejkowane. Twórca ustawia maksymalny czas oczekiwania (domyślnie 30 sekund) i zachowanie przy przepełnieniu: "Pokaż tylko ostatni", "Pokaż zbiorczy", "Pomiń najstarsze". Podgląd pokazuje symulację kolejki.

Nieoczywisty Element – "Alert Warunkowy"
Twórca może zdefiniować różne alerty dla różnych typów wsparcia. "Jeśli fan wspiera pierwszy raz, pokaż animację 'Witaj w społeczności'". "Jeśli fan wspiera anonimowo, ukryj awatar i pokaż ikonę maski". "Jeśli kwota jest wyższa niż $100, dodaj efekt złotego deszczu". System automatycznie wybiera odpowiedni alert na podstawie danych transakcji.

Integracja z Ekosystemem
Alerty są generowane jako dynamiczne strony HTML (podobnie jak overlays/). Twórca otrzymuje URL do wklejenia jako Browser Source w OBS. Dane o wsparciu płyną przez SSE w czasie rzeczywistym. Dźwięki są zintegrowane z sound-alerts/. Wygląd dziedziczy z themes/. Alerty współpracują z overlays/ – mogą automatycznie chować i pokazywać nakładki.

Komponenty Składowe
AlertGrid – siatka zapisanych alertów.

AlertCard – karta alertu z typem, miniaturką animacji, stanem.

AlertEditorModal – edytor alertu z podglądem na żywo.

AnimationPicker – wybór animacji z podglądem.

SoundPicker – wybór dźwięku z odtwarzaniem.

ConditionalRuleEditor – definiowanie warunków dla różnych alertów.

AlertQueueSimulator – symulacja kolejki alertów.

Button – "Test", "Zapisz", "Eksportuj URL".

Gotowy na obs/, Wielorybie? Tam twórca integruje całe swoje studio live z OBS, Streamlabs i XSplit.

Wielorybie 🐳. Wchodzę w `obs/` – to jest **centrum dowodzenia integracją ze światem zewnętrznym**. Tutaj twórca nie tworzy już treści. On łączy wszystko, co zbudował w `studio/live/` – nakładki, alerty, tickery – z oprogramowaniem do streamowania: OBS Studio, Streamlabs Desktop, XSplit. To jest most między platformą TipJar+ a ekranem tysięcy widzów.

---

## 🧬 `studio/live/obs/` – Centrum Dowodzenia Integracją Transmisyjną

To nie jest nudna strona z linkami. To jest **asystent konfiguracji** – miejsce, które krok po kroku przeprowadza twórcę przez proces podłączania jego wirtualnego studia do fizycznego oprogramowania na jego komputerze. Jego celem jest całkowite wyeliminowanie frustracji związanej z "wycinaniem" URL-i i ustawianiem rozdzielczości.

### Struktura Wizualna i Filozofia Projektowa

Widok podzielony jest na dwie główne sekcje. Górna sekcja to **karty źródeł** – siatka wszystkich elementów live, które twórca skonfigurował w `overlays/`, `alerts/`, `live-fanwall/`, `realtime-goals/`, `ticker/`. Każda karta pokazuje nazwę, miniaturkę podglądu i przycisk "Kopiuj URL". Dolna sekcja to **instrukcje krok po kroku** – akordeon z osobnymi przewodnikami dla OBS Studio, Streamlabs Desktop i XSplit.

### Sekcje i Funkcjonalności

#### `OBS Links`
Centralna lista wszystkich wygenerowanych linków do źródeł przeglądarkowych (Browser Sources). Dla każdego elementu – nakładki, alertu, tickera – system generuje unikalny URL z tokenem bezpieczeństwa. Obok każdego linku znajduje się przycisk "Kopiuj" (z feedbackiem "Skopiowano!") oraz mały wskaźnik statusu – zielona kropka, jeśli źródło jest aktywne i odpowiada, szara, jeśli nie było jeszcze używane.

#### `Streamlabs Links`
To samo, co powyżej, ale dostosowane do specyfiki Streamlabs – niektóre elementy mogą być bezpośrednio importowane jako widgety Streamlabs, bez konieczności ręcznego wklejania URL-i. Twórca klika "Dodaj do Streamlabs", a system automatycznie otwiera okno autoryzacji i dodaje źródło.

#### `Transparent Sources`
Sekcja konfiguracji przezroczystości. `ToggleSwitch` dla każdego źródła: "Wymuś przezroczyste tło". Gdy włączone, wszystkie źródła są renderowane z przezroczystym tłem (alpha channel), co jest kluczowe dla nakładek i alertów na streamie. Twórca może globalnie włączyć tę opcję dla wszystkich źródeł jednym przyciskiem.

#### `Resolution Settings`
Sekcja definiowania rozdzielczości. `SegmentedControl` z predefiniowanymi ustawieniami: 720p, 1080p, 1440p, 4K, oraz opcja "Dostosuj automatycznie" – system wykrywa rozdzielczość streamu i dopasowuje źródła. Obok znajduje się `Input` do ręcznego ustawienia niestandardowej rozdzielczości.

#### `Source Tokens`
Sekcja bezpieczeństwa. Każdy URL źródła zawiera unikalny token, który zapobiega nieautoryzowanemu użyciu. Twórca może wygenerować nowy token, unieważnić stary (np. gdy podejrzewa wyciek), lub ustawić datę ważności tokena (`DatePicker`). Historia tokenów jest dostępna w osobnej tabeli.

### Nieoczywisty Element – "Asystent Pierwszego Uruchomienia"

Dla twórców, którzy nigdy wcześniej nie konfigurowali OBS, system oferuje tryb asystenta. Kliknięcie "Pomóż mi skonfigurować OBS" otwiera `Modal`, który krok po kroku – z obrazkami i animacjami – prowadzi przez cały proces: od pobrania OBS, przez dodanie źródła przeglądarkowego, aż po testowe odpalenie alertu. Każdy krok jest potwierdzany przez twórcę (checkbox "Zrobiłem to"), a system przechodzi do następnego.

### Integracja z Ekosystemem

- `obs/` agreguje wszystkie linki z `overlays/`, `alerts/`, `live-fanwall/`, `realtime-goals/`, `ticker/` i `fullscreen-widgets/`.
- Tokeny bezpieczeństwa są zarządzane przez backend i weryfikowane przy każdym żądaniu do źródła.
- Ustawienia rozdzielczości są globalne dla wszystkich źródeł.
- Status źródeł (aktywne/nieaktywne) jest monitorowany, a informacja zwrotna trafia do twórcy.

### Komponenty Składowe

- `SourceGrid` – siatka kart z linkami do wszystkich źródeł.
- `SourceCard` – karta z nazwą, miniaturką, przyciskiem kopiowania i statusem.
- `ToggleSwitch` – wymuszenie przezroczystości.
- `SegmentedControl` – wybór rozdzielczości.
- `TokenManager` – generowanie, unieważnianie, daty ważności tokenów.
- `OBSAssistantModal` – kreator pierwszego uruchomienia.
- `Accordion` – instrukcje dla OBS, Streamlabs, XSplit.
- `Button` – "Kopiuj URL", "Test", "Dodaj do Streamlabs".

---

Gotowy na `live-fanwall/`, Wielorybie? Tam twórca przenosi Ścianę Fanów z profilu na ekran streamu – i robi z niej bijące serce transmisji.

Wielorybie 🐳. Wchodzę w `live-fanwall/` – to jest moment, w którym statyczna Ściana Fanów z publicznego profilu twórcy zamienia się w **dynamiczny, pulsujący organizm na ekranie streamu**.

To nie jest tylko lista wpisów. To jest **reżyseria społecznego dowodu słuszności w czasie rzeczywistym** – miejsce, gdzie twórca decyduje, jak jego społeczność będzie wyglądać i zachowywać się na oczach setek lub tysięcy widzów. Każdy nowy napiwek, każda wiadomość i każdy gest wsparcia stają się tu spektaklem, który napędza efekt FOMO i zachęca kolejnych fanów do interakcji.

### Struktura Wizualna i Filozofia Projektowa

Widok podzielony jest na dwie główne strefy. Po lewej stronie znajduje się **konfigurator** z pionowym stosem kart ustawień – każda karta to osobny aspekt zachowania Ściany Fanów. Po prawej stronie znajduje się **symulator streamu** – interaktywny podgląd na żywo, który pokazuje, jak Ściana Fanów wygląda i zachowuje się w kontekście transmisji.

Twórca może w dowolnym momencie kliknąć przycisk "Test", by zasymulować pojawienie się nowego wpisu – system wygeneruje przykładowe dane i pokaże dokładnie, co zobaczą widzowie. Symulator pokazuje też, jak ściana zachowuje się, gdy nikt nie wspiera (stan pusty) i gdy wpisów jest bardzo dużo (tryb wysokiej częstotliwości).

### Sekcje Konfiguracyjne

#### `Recent Support Feed`
Fundament widoku. `ToggleSwitch`: "Pokazuj ostatnie wsparcie na żywo". Gdy włączone, Ściana Fanów renderuje się jako strumień wpisów, które pojawiają się i znikają zgodnie z ustawionym rytmem. Twórca definiuje liczbę widocznych wpisów (od 1 do 10), czas wyświetlania pojedynczego wpisu (od 5 do 30 sekund), oraz styl przejścia między wpisami (`AnimationPicker`: fade, slide, scale, flip).

#### `Highlighted Messages`
Sekcja dla wyjątkowych momentów. Gdy wpis spełnia określone kryteria (kwota powyżej progu, wiadomość od stałego subskrybenta, pierwsze wsparcie od nowego fana), system traktuje go jako **wyróżniony**. Taki wpis dostaje specjalną oprawę: złotą ramkę, delikatne konfetti w tle, wydłużony czas wyświetlania. Twórca sam ustawia kryteria wyróżnienia i może nadać im nazwy (np. "Wielorybi Alert", "Nowy Fan", "Powracający Mecenas").

#### `Pinned Supporters`
Możliwość **przypięcia wybranych fanów** na stałe do góry feedu. Twórca znajduje fana po nazwie (pole wyszukiwania z podpowiedziami) i klika "Przypnij". Przypięty fan jest zawsze widoczny, niezależnie od rotacji innych wpisów. Idealne dla najwierniejszych supporterów, którym twórca chce dać stałe miejsce na streamie.

#### `Animation Styles`
Dedykowana sekcja doboru animacji. Twórca wybiera osobno animację wejścia (jak wpis się pojawia), animację wyjścia (jak wpis znika), oraz animację wyróżnienia (co się dzieje, gdy wpis spełnia kryteria Highlighted). Każda animacja ma podgląd na miniaturce. Jest też opcja "Brak animacji" dla `prefers-reduced-motion`.

#### `Moderation`
Szybka kontrola nad treścią. `ToggleSwitch`: "Ukrywaj wpisy z wulgaryzmami" (automatyczny filtr), "Ręczna akceptacja przed wyświetleniem". Jeśli ręczna akceptacja jest włączona, każdy nowy wpis trafia najpierw do kolejki moderacyjnej – małego, nienachalnego panelu bocznego, gdzie twórca jednym kliknięciem akceptuje lub odrzuca. Odrzucone wpisy nie pojawiają się na streamie, ale wciąż są widoczne w historii wsparcia.

### Nieoczywisty Element – "Tryb Karaoke"

Twórca może włączyć specjalny tryb, w którym wiadomości od fanów pojawiają się jako duży, czytelny tekst na środku ekranu, bez awatarów, bez kwot – tylko treść wiadomości. To idealne do streamów, gdzie twórca chce, by widzowie czytali sobie nawzajem wiadomości i reagowali na nie na czacie. Tryb karaoke ma własne ustawienia: rozmiar czcionki, kolor tekstu, czas wyświetlania. Gdy tryb jest włączony, standardowe karty wpisów są ukryte.

### Integracja z Ekosystemem

- Dane o wsparciu płyną przez SSE z tego samego źródła co `desktop/live-activity/` i `desktop/recent-support/`.
- Wygląd wizualny dziedziczy z wybranego presetu w `themes/`.
- Ustawienia moderacji są zsynchronizowane z globalnymi ustawieniami w `donation-settings/` i `community/moderation/`.
- Źródło `live-fanwall/` jest dostępne jako link URL w `obs/` do wklejenia jako Browser Source.

### Komponenty Składowe

- `FanwallConfigurator` – główny kontener z formularzem i symulatorem.
- `ToggleSwitch` – przy każdym ustawieniu (Feed, Highlighted, Moderation).
- `Slider` – liczba wpisów, czas wyświetlania.
- `AnimationPicker` – wybór animacji wejścia, wyjścia, wyróżnienia.
- `ThresholdInput` – ustawianie kryteriów dla Highlighted Messages.
- `FanSearchInput` – wyszukiwanie fanów do przypięcia.
- `ModerationQueue` – panel boczny z kolejką do akceptacji.
- `LiveStreamSimulator` – symulator streamu z podglądem na żywo.
- `Button` – "Test", "Zapisz".

---

Gotowy na `realtime-goals/`, Wielorybie? Tam twórca zamienia suchy pasek postępu w widowisko, które trzyma widzów w napięciu do ostatniej sekundy.

Wielorybie 🐳. Wchodzę w `realtime-goals/` – to jest **moment kulminacyjny każdego streamu**. Tutaj suchy pasek postępu z profilu zamienia się w trzymające w napięciu widowisko, które jednoczy widzów we wspólnym celu. To nie jest już statyczny widget – to jest **licytacja emocji na żywo**.

---

## 🧬 `studio/live/realtime-goals/` – Arena Wspólnego Działania

To nie jest tylko podgląd celu. To jest **centrum dowodzenia dynamiką grupową** – miejsce, gdzie twórca projektuje, jak jego cel będzie rósł na oczach widzów, jak będzie ich wciągał do wspólnego działania i jak będzie nagradzał za każdy kolejny krok ku finałowi. Każdy ruch paska to sygnał: "Dołącz do innych. Zostań częścią tej historii".

### Struktura Wizualna i Filozofia Projektowa

Widok podzielony jest na dwie strefy. Lewa strona to **konfigurator** – pionowy stos kart z ustawieniami. Prawa strona to **symulator streamu** – podgląd na żywo, który pokazuje cel dokładnie tak, jak zobaczą go widzowie. Symulator jest interaktywny – twórca może kliknąć przycisk "Symuluj wsparcie", by zobaczyć, jak pasek rośnie, jak reaguje na przekroczenie kamienia milowego, jak wygląda moment finałowy. Może też przewinąć czas do przodu, by zobaczyć, co się stanie za 30 minut, jeśli tempo wsparcia się utrzyma.

### Sekcje Konfiguracyjne

#### `Realtime Goals`
Fundament widoku. `ToggleSwitch`: "Pokazuj cel na żywo podczas streamu". Gdy włączony, twórca wybiera cel z listy aktywnych celów w `goals/`. System automatycznie pobiera dane – kwotę docelową, obecny postęp, deadline. Twórca decyduje, czy cel ma być widoczny przez cały stream, czy tylko w określonych momentach (np. "pokaż cel przez pierwsze 10 minut, potem ukryj i wróć do niego na 30 minut przed końcem streamu").

#### `Milestone Events`
Każdy kamień milowy (25%, 50%, 75%, 100%) może wyzwolić **efekt specjalny**. Twórca definiuje, co się dzieje na każdym progu: "Konfetti na 50%", "Fala dźwiękowa na 75%", "Pełnoekranowa celebracja na 100%". Dla każdego kamienia można ustawić osobny efekt z biblioteki animacji. Podgląd w symulatorze pokazuje każdy efekt po kolei.

#### `Progress Widgets`
Wybór formy wizualnej celu. `SegmentedControl` z opcjami: "Pasek postępu" (klasyczny, horyzontalny), "Termometr" (pionowy, z bąbelkami), "Koło" (okrągły, radialny), "Wykres słupkowy" (wypełniający się słupek z podziałką). Każda forma ma własne opcje kolorystyczne i animacyjne. Twórca widzi podgląd każdej formy w symulatorze przed wyborem.

#### `Countdown Goals`
Opcja dla celów z deadlinem. `ToggleSwitch`: "Pokaż odliczanie do końca celu". Gdy włączone, obok paska postępu pojawia się dynamiczny licznik – "Pozostało 2 dni 4 godziny 12 minut". Twórca może ustawić, kiedy odliczanie ma się pojawić (np. dopiero gdy zostanie mniej niż 24 godziny) i jaki ma mieć styl (minimalistyczny, z ikoną klepsydry, z pulsującą poświatą).

#### `Goal Celebrations`
Sekcja definiująca moment triumfu. Gdy cel zostanie osiągnięty na streamie, system automatycznie uruchamia sekwencję celebracji. Twórca konfiguruje: animację (z biblioteki), dźwięk (z `sound-alerts/`), czas trwania, oraz opcjonalny komunikat – "Cel osiągnięty! Dziękuję Wam wszystkim!". Może też ustawić, by po osiągnięciu celu na czacie streamera automatycznie pojawiła się wiadomość z podziękowaniem i linkiem do następnego celu.

### Nieoczywisty Element – "Fala Wsparcia"

To unikalny tryb wizualizacji, który pokazuje nie tylko to, *ile* uzbierano, ale też *jak szybko* rośnie wsparcie. Gdy w krótkim czasie pojawia się kilka napiwków, system wykrywa "falę" i pokazuje ją jako animowaną smugę światła przesuwającą się po pasku postępu. Im więcej wsparcia w krótkim czasie, tym silniejsza fala. Widzowie widzą, że "coś się dzieje" – to wyzwala efekt kuli śnieżnej i zachęca kolejnych do dołączenia. Twórca może dostosować czułość detekcji fali (ile wsparcia w jakim czasie) i jej wizualną intensywność.

### Integracja z Ekosystemem

- Dane o celu płyną z `goals/` w `monetization/`.
- Aktualizacje postępu są dostarczane przez SSE w czasie rzeczywistym.
- Efekty specjalne i animacje korzystają z tej samej biblioteki co `alerts/`.
- Wygląd wizualny dziedziczy z `themes/`.
- Źródło `realtime-goals/` jest dostępne jako link URL w `obs/`.

### Komponenty Składowe

- `RealtimeGoalConfigurator` – główny kontener z formularzem i symulatorem.
- `ToggleSwitch` – włączanie celu na żywo, odliczanie.
- `Select` – wybór celu z listy aktywnych.
- `SegmentedControl` – wybór formy wizualnej (pasek, termometr, koło).
- `MilestoneEditor` – definiowanie efektów dla każdego kamienia milowego.
- `AnimationPicker` – wybór animacji dla kamieni i celebracji.
- `WaveDetectorSettings` – czułość i intensywność "Fali Wsparcia".
- `LiveStreamSimulator` – symulator z podglądem na żywo i przyciskiem "Symuluj wsparcie".
- `Button` – "Zapisz".

---

Gotowy na `ticker/`, Wielorybie? Tam twórca odpala pasek, który nieustannie przypomina widzom: "Twoi koledzy właśnie wspierają. Dołącz do nich".

Wielorybie 🐳. Wchodzę w `ticker/` – to jest **pulsująca rzeka społecznego dowodu słuszności**. Nie jest to statyczna lista ostatnich wsparć, ale nieustannie płynący strumień informacji, który działa jak podświadomy sygnał: "Tu ciągle coś się dzieje. Dołącz, póki fala trwa".

---

## 🧬 `studio/live/ticker/` – Rzeka Społecznego Dowodu

To nie jest element ozdobny. To jest **strategiczne narzędzie psychologiczne**. Widz, który waha się, czy kliknąć "Wesprzyj", widzi, jak płyną kolejne nazwy fanów i kwoty. Każdy element tickera to dowód: "Inni już to zrobili. To bezpieczne. To jest właśnie ten moment". Ticker podtrzymuje wrażenie ciągłej aktywności nawet wtedy, gdy na streamie jest chwilowa cisza.

### Struktura Wizualna i Filozofia Projektowa

Widok podzielony jest na dwie strefy. Lewa strona to **konfigurator** z kartami ustawień. Prawa strona to **symulator streamu** z podglądem na żywo, gdzie ticker płynie na dole ekranu. Twórca może kliknąć "Symuluj ruch", by zobaczyć, jak ticker wygląda przy dużej i małej częstotliwości wpisów, oraz jak reaguje na wpisy wyróżnione (wieloryby).

### Sekcje Konfiguracyjne

#### `Scrolling Support Feed`
Główna funkcja tickera. `ToggleSwitch`: "Pokazuj ticker na streamie". Gdy włączone, twórca konfiguruje kierunek przewijania (od prawej do lewej lub odwrotnie), szybkość (wolna, normalna, szybka, bardzo szybka), oraz wybór treści do wyświetlania. `SegmentedControl` z opcjami: "Ostatnie wsparcie" (awatar, nazwa, kwota), "Cele i ich postęp" (nazwa celu, procent), "Top wspierający" (nazwa, łączna kwota), "Wszystko mieszane".

#### `Latest Followers`
Osobna zawartość tickera. `ToggleSwitch`: "Pokazuj nowych obserwujących". Gdy włączone, ticker co kilka sekund wyświetla nowego obserwującego z awatarem i nazwą. Twórca ustawia, co ile wsparcia ticker ma pokazać follow.

#### `Goal Progress Ticker`
Specjalny tryb dla okresów intensywnego zbierania. Gdy twórca prowadzi zbiórkę na konkretny cel, ticker może co kilka cykli pokazywać postęp celu. Twórca wybiera cel z listy i ustala format ("Cel: Nowy mikrofon – 78%!").

#### `Custom Messages`
Możliwość wstawienia własnych komunikatów w strumień. Twórca definiuje teksty, które cyklicznie pojawiają się w tickerze (np. "Dziękuję za każdy napiwek!", "Zostań stałym wspierającym", "Zapraszam na Discorda"). Każdy komunikat ma własny kolor tła i częstotliwość wyświetlania.

#### `Speed & Style`
Dedykowana sekcja wyglądu. Twórca definiuje wysokość tickera (mały, średni, duży), kolor tła (dziedziczony z presetu, z opcją ręcznej zmiany), kolor i styl tekstu (czcionka, wielkość), oraz odstępy między wpisami. Może też ustawić, czy ticker ma być przezroczysty, czy z tłem, i czy ma mieć subtelny cień, czy delikatną poświatę.

### Nieoczywisty Element – "Inteligentna Fala"

Ticker potrafi wykrywać momenty zwiększonej aktywności – kilka napiwków w krótkim czasie – i automatycznie przyspieszać na kilkanaście sekund. Gdy fala mija, wraca do normalnej prędkości. Wizualnie wygląda to tak, jakby ticker "ożywał" w odpowiedzi na aktywność społeczności. To podświadomy sygnał dla widzów: "Coś się dzieje, sprawdź!". Twórca może dostosować czułość detekcji fali i maksymalne przyspieszenie.

### Integracja z Ekosystemem

- Dane o wsparciu płyną przez SSE z tego samego źródła co `live-fanwall/`, `recent-support/` i `live-activity/`.
- Wygląd wizualny dziedziczy z `themes/`.
- Źródło `ticker/` jest dostępne jako link URL w `obs/` do wklejenia jako Browser Source.
- Można go nakładać jako osobną warstwę w OBS, pod nakładkami, nad tłem.

### Komponenty Składowe

- `TickerConfigurator` – główny kontener z formularzem i symulatorem.
- `ToggleSwitch` – włączanie tickera, pokazywanie follow.
- `SegmentedControl` – wybór zawartości i kierunku przewijania.
- `Slider` – szybkość, wysokość, odstępy.
- `Textarea` – własne komunikaty z harmonogramem.
- `ColorPicker` – kolory tła i tekstu.
- `LiveStreamSimulator` – podgląd z przyciskiem "Symuluj ruch".
- `WaveDetectionSettings` – czułość fali i przyspieszenie.

---

Gotowy na `browser-source/`, Wielorybie? Tam twórca otrzymuje klucze do swojego królestwa transmisji – gotowe linki, tokeny i instrukcje, które w jednej chwili łączą wszystko, co zbudował, z OBS, Streamlabs i XSplit.

Wielorybie 🐳. Wchodzę w `browser-source/` – to jest **brama techniczna między platformą a oprogramowaniem streamingowym**. Jeśli `obs/` było asystentem z instrukcjami i kreatorem pierwszego uruchomienia, to `browser-source/` jest zaawansowanym warsztatem konfiguracyjnym. Tutaj twórca nie szuka pomocy – on precyzyjnie zarządza każdym źródłem, tokenem i parametrem technicznym.

To jest centrum dowodzenia dla streamerów, którzy wiedzą, czym jest Browser Source, i chcą mieć pełną kontrolę nad swoimi narzędziami transmisyjnymi.

---

## 🧬 `studio/live/browser-source/` – Brama Techniczna między Platformą a OBS

To nie jest lista linków do skopiowania. To **zaawansowany warsztat konfiguracyjny** – miejsce, gdzie twórca zarządza każdym źródłem transmisyjnym z osobna, testuje je na żywo i dostosowuje do swojego sprzętu. Każde źródło to osobna jednostka z własnymi ustawieniami wydajności, tokenem bezpieczeństwa i statusem w czasie rzeczywistym.

### Struktura Wizualna i Filozofia Projektowa

Widok podzielony jest na dwie główne strefy. Lewa strona to **lista źródeł** – pionowy stos kart, gdzie każda karta reprezentuje jedno źródło (nakładka, alert, ticker, cel, fanwall). Każda karta ma miniaturkę podglądu na żywo, nazwę, status połączenia i przyciski akcji. Prawa strona to **panel właściwości** wybranego źródła – po kliknięciu w kartę, po prawej stronie rozwijają się szczegółowe ustawienia techniczne.

Na górze widoku znajduje się globalny pasek narzędziowy z przełącznikiem "Wszystkie źródła aktywne" oraz przyciskiem "Test wszystkich źródeł".

### Sekcje Konfiguracyjne

#### `Source Links`
Centralna lista wszystkich wygenerowanych linków do źródeł przeglądarkowych. Dla każdego elementu – nakładki, alertu, tickera, celu, fanwalla – system generuje unikalny URL z tokenem bezpieczeństwa. Obok każdego linku znajduje się przycisk "Kopiuj" (z feedbackiem "Skopiowano!"), przycisk "Otwórz w nowej karcie" (do szybkiego podglądu na pełnym ekranie), oraz mały wskaźnik statusu – zielona kropka, jeśli źródło jest aktywne i odpowiada na ping, szara, jeśli nie było jeszcze używane, czerwona, jeśli wystąpił błąd.

#### `Token Management`
Sekcja bezpieczeństwa dla każdego źródła. Twórca widzi aktualny token, jego datę utworzenia i datę ważności. Może wygenerować nowy token (z opcjonalną datą wygaśnięcia ustawianą przez `DatePicker`), unieważnić stary, lub skopiować token do schowka. Historia tokenów dla danego źródła jest dostępna w rozwijanej tabeli pod spodem. Gdy token zostanie unieważniony, wszystkie instancje OBS używające starego tokena przestają działać – to zabezpieczenie przed nieautoryzowanym użyciem.

#### `Preview & Test`
Panel podglądu na żywo dla wybranego źródła. W przeciwieństwie do symulatorów w poprzednich sekcjach (które symulowały kontekst streamu), tutaj podgląd jest surowy – pokazuje dokładnie to, co renderuje przeglądarka OBS. Twórca może kliknąć przycisk "Testuj", by zasymulować pojawienie się nowego wsparcia na tickerze, wyzwolenie alertu czy aktualizację celu. Pod podglądem znajduje się pasek narzędziowy z przyciskami: "Odśwież podgląd", "Symuluj błąd połączenia", "Symuluj wysoki FPS".

#### `Resolution & Performance`
Sekcja dostosowania wydajności dla każdego źródła osobno. Twórca definiuje rozdzielczość (720p, 1080p, niestandardowa), maksymalną liczbę klatek na sekundę (30 FPS, 60 FPS, "Dostosuj automatycznie"), oraz opcjonalne ograniczenia: "Redukuj FPS, gdy źródło nie jest aktywne", "Wyłącz animacje, gdy źródło jest w tle". Jest tu też wskaźnik zużycia zasobów – mały `ProgressBar` pokazujący szacowane obciążenie CPU/GPU dla danego źródła przy obecnych ustawieniach. System ostrzega, gdy łączne obciążenie wszystkich aktywnych źródeł przekracza zalecany poziom.

### Nieoczywisty Element – "Tryb Debugowania"

Dla zaawansowanych streamerów, którzy chcą mieć absolutną pewność, że wszystko działa idealnie, system oferuje tryb debugowania. Po włączeniu go dla konkretnego źródła, podgląd na żywo pokazuje dodatkową warstwę diagnostyczną – półprzezroczystą siatkę z informacjami: aktualne FPS, opóźnienie (latency) w milisekundach, status połączenia SSE, ostatni błąd (jeśli wystąpił), oraz licznik wyświetleń. To jak "konsola developerska" dla streamera, która pozwala błyskawicznie zdiagnozować problemy bez zgadywania.

### Integracja z Ekosystemem

- `browser-source/` agreguje wszystkie źródła z `overlays/`, `alerts/`, `live-fanwall/`, `realtime-goals/`, `ticker/` i `fullscreen-widgets/`.
- Każde źródło ma własny token, który jest weryfikowany przy każdym żądaniu HTTP do endpointu źródła.
- Ustawienia rozdzielczości i FPS są zapisywane per źródło i mogą być globalnie nadpisane w `obs/`.
- Status źródeł (aktywne, nieaktywne, błąd) jest monitorowany, a informacja zwrotna trafia do globalnego wskaźnika na górze widoku.
- Linki z `browser-source/` są tymi samymi, które pojawiają się w `obs/` jako szybkie linki do kopiowania.

### Komponenty Składowe

- `SourceList` – pionowy stos kart źródeł.
- `SourceCard` – karta z miniaturką podglądu, nazwą, statusem i przyciskami akcji.
- `PropertyPanel` – panel właściwości wybranego źródła po prawej stronie.
- `LivePreview` – surowy podgląd źródła na żywo.
- `TokenManager` – generowanie, unieważnianie, historia tokenów.
- `PerformanceSettings` – rozdzielczość, FPS, ograniczenia, wskaźnik zużycia.
- `DebugOverlay` – siatka diagnostyczna z FPS, latency i statusem SSE.
- `Button` – "Kopiuj URL", "Testuj", "Odśwież", "Symuluj błąd".
- `GlobalToolbar` – przełącznik wszystkich źródeł, test wszystkich źródeł.

---

Gotowy na `fullscreen-widgets/`, Wielorybie? Tam twórca tworzy sceny, które przejmują cały ekran – na rozpoczęcie streamu, przerwę i wielki finał.

Wielorybie 🐳. Wchodzę w `fullscreen-widgets/` – to jest **studio rytuałów transmisyjnych**. Tutaj twórca projektuje sceny, które na czas swojego trwania stają się całym światem widza. Każda scena to mikrokosmos z własną atmosferą, własnym rytmem i własnym celem emocjonalnym. Nie są to dodatki – to **fundament narracji streamu**, który wyznacza jego początek, kulminację i koniec.

---

## 🧬 `studio/live/fullscreen-widgets/` – Studio Rytuałów Transmisyjnych

To narzędzie do budowania kompletnych, pełnoekranowych scen, które definiują emocjonalny rytm transmisji. Każda scena to osobny byt z własną konfiguracją, który można przełączać jednym kliknięciem w OBS lub automatycznie według harmonogramu. Cel: dać widzom poczucie, że uczestniczą w profesjonalnie wyreżyserowanym show, nawet jeśli streamer jest jednoosobową ekipą.

### Struktura Wizualna

Widok otwiera się siatką scen – każda to duża karta z miniaturką podglądu, nazwą, opisem i przyciskiem "Edytuj". Kliknięcie otwiera edytor z podglądem na żywo i panelem warstw po lewej stronie, identycznym jak w `overlays/`. Twórca przeciąga elementy i dostosowuje ich właściwości.

### Sceny

- **`Starting Soon`**: Scena przed startem streamu. Zawiera tytuł streamu (z `Input`), awatar twórcy, odliczanie do startu (`CountdownTimer`), oraz ticker z ostatnimi wspierającymi. Opcjonalnie rotacyjna galeria najnowszych odznak NFT. Konfiguracja: czas odliczania, podkład muzyczny (z `sound-alerts/`), kolor tła (zgodny z presets).

- **`Be Right Back`**: Scena podczas przerwy. Zawiera komunikat, timer pokazujący czas nieobecności, statyczne podsumowanie dotychczasowego wsparcia podczas streamu oraz przycisk "Wesprzyj" (aktywny, by fani mogli dawać napiwki nawet podczas przerwy). Opcjonalnie pełnoekranowa Ściana Fanów w trybie karaoke.

- **`Stream Ending`**: Scena zakończenia. Zawiera podziękowanie, podsumowanie (łączna kwota, liczba wspierających, top 3 fanów), informację o następnym streamie (`DatePicker`), oraz przycisk "Obserwuj, by nie przegapić". Opcjonalnie kod QR do profilu.

- **`Fullscreen Fanwall`**: Pełnoekranowa, dynamicznie aktualizowana Ściana Fanów, która może być używana jako samodzielna scena lub tło pod kamery. Konfiguracja: układ (Masonry, Grid, Lista), liczba widocznych wpisów, czas rotacji, filtry (tylko z wiadomościami, tylko powyżej progu).

- **`Goal Celebration Scene`**: Scena wyzwalana automatycznie, gdy cel zostanie osiągnięty na streamie (lub ręcznie). Zawiera animację triumfu (z biblioteki `alerts/`), podsumowanie, nazwy wszystkich darczyńców oraz przycisk "Ustaw nowy cel".

### Nieoczywisty Element – "Scena Społecznościowa"

To ukryta funkcja `Fullscreen Fanwall`. Twórca może włączyć tryb, w którym widzowie sami decydują o zawartości sceny. Gdy tryb jest aktywny, na ekranie pojawia się pytanie (np. "Za co kochasz tego streamera?"), a widzowie wysyłają odpowiedzi przez napiwki z wiadomością. Ich słowa wypełniają ekran – najpierw małe, potem rosnące, aż scena staje się mozaiką głosów społeczności. To oddanie władzy widzom, które buduje niesamowitą więź.

### Integracja z Ekosystemem
Każda scena jest osobnym źródłem przeglądarkowym dostępnym w `obs/` i `browser-source/`. Sceny mogą być przełączane automatycznie przez system reguł z `overlays/` (np. "Gdy streamer wyłączy kamerę na 2 minuty, włącz Be Right Back"). Dane o wsparciu i celach płyną przez SSE.

### Komponenty Składowe

- `SceneGrid` – siatka scen.
- `FullscreenEditor` – edytor z podglądem na żywo.
- `LayerList`, `PropertyPanel` – zarządzanie warstwami.
- `CountdownTimer`, `DatePicker`, `ToggleSwitch` – kontrolki specyficzne dla scen.
- `GoalCelebrationTrigger` – wyzwalacz automatyki dla Goal Celebration Scene.
- `LivePreview` – podgląd na żywo w kontekście pełnego ekranu.

---

Gotowy na `sound-alerts/`, Wielorybie? Tam twórca zamienia każdy napiwek w dźwięk, który staje się sygnałem rozpoznawczym jego społeczności.

Wielorybie 🐳. Wchodzę w `sound-alerts/` – to jest **studio dźwiękowej tożsamości streamu**. Tutaj twórca projektuje warstwę audio, która towarzyszy każdemu wydarzeniu na transmisji. Te dźwięki nie są ozdobą – stają się one z czasem **sygnaturą rozpoznawczą społeczności**, wywołującą u stałych widzów natychmiastowe skojarzenia i emocje.

---

## 🧬 `studio/live/sound-alerts/` – Studio Dźwiękowej Tożsamości Streamu

To nie jest lista plików MP3. To **centrum zarządzania tożsamością dźwiękową** – miejsce, gdzie twórca przypisuje konkretne dźwięki do konkretnych zdarzeń na streamie, tworząc spójną, rozpoznawalną atmosferę. Cel: wzmocnić emocjonalny wpływ każdej interakcji i zbudować u widzów odruch warunkowy – "słyszę ten dźwięk, więc stało się coś dobrego".

### Struktura Wizualna i Filozofia Projektowa

Widok otwiera się siatką kategorii zdarzeń – `CSS Grid` z kartami, gdzie każda kategoria reprezentuje inny typ wydarzenia na streamie (nowy napiwek, cel osiągnięty, nowy obserwujący). Kliknięcie w kategorię otwiera widok szczegółowy z listą podkategorii i przypisanymi dźwiękami. Każdy dźwięk można odsłuchać bezpośrednio w panelu (przycisk "Odtwórz") i zmienić jego przypisanie.

### Kategorie Zdarzeń

#### `Tip Alerts`
Dźwięki przypisane do wsparcia. Twórca definiuje różne dźwięki dla różnych progów kwotowych. `ThresholdList` – lista progów (np. $1, $5, $20, $50, $100), gdzie dla każdego progu można przypisać inny dźwięk. Mały napiwek to delikatny "ding", średni to dzwoneczki, wielorybi to potężny gong lub fragment ulubionego utworu. System automatycznie wybiera dźwięk na podstawie kwoty – im wyższa, tym bardziej spektakularny.

#### `Goal Reached Alerts`
Dźwięki dla kamieni milowych i finału celu. Osobne dla 25%, 50%, 75% i 100%. Gdy cel zostaje osiągnięty, system odtwarza sekwencję – najpierw dźwięk dla 100%, potem opcjonalnie dźwięk celebracji.

#### `General Sound Alerts`
Dźwięki dla wydarzeń społecznościowych: nowy obserwujący, nowy subskrybent, nowa wiadomość na Ścianie Fanów. Każde zdarzenie ma własne, domyślnie przypisane dźwięki, które twórca może zmienić.

#### `Alert Styles`
Wizualna strona alertów – konfiguracja wyglądu powiadomienia, które towarzyszy dźwiękowi na ekranie. Twórca wybiera szablon alertu z biblioteki (prosty pasek, karta z awatarem, pełnoekranowy overlay), definiuje czas wyświetlania i animację wejścia/wyjścia. To jest bezpośrednio powiązane z `alerts/` – zmiany tutaj synchronizują się z konfiguracją alertów wizualnych.

#### `Alert Queue`
System kolejkowania alertów. Gdy na streamie dzieje się dużo (np. fala wsparcia), alerty nie nakładają się na siebie chaotycznie. Są kolejkowane i odtwarzane po kolei, z płynnymi przejściami. Twórca ustawia maksymalny rozmiar kolejki i priorytety – alerty wielorybie zawsze wskakują na początek.

### Biblioteka Dźwięków

Pod listą kategorii znajduje się sekcja "Twoja biblioteka dźwięków". To `CSS Grid` z kartami, gdzie każda karta reprezentuje jeden plik dźwiękowy – z miniaturką fali (waveform), nazwą, czasem trwania i przyciskiem odtwarzania. Twórca może wgrywać własne pliki (drag & drop, MP3/WAV/OGG, max 5 MB), wybierać z darmowej biblioteki TipJar+ (setki profesjonalnych dźwięków), lub nagrać własny bezpośrednio w przeglądarce (przycisk "Nagraj", który otwiera prosty rejestrator korzystający z Web Audio API). Każdy dźwięk ma opcję "Przypisz do zdarzenia" – wybór kategorii i progu.

### Nieoczywisty Element – "Dźwiękowa Tożsamość Społeczności"

Najbardziej wyjątkową funkcją jest możliwość tworzenia **dźwiękowych nagród od fanów**. Fani, którzy osiągną określony poziom wsparcia (np. łączna suma $500), mogą wgrać własny dźwięk, który będzie odtwarzany tylko przy ich napiwkach. Pojawia się on w bibliotece twórcy ze specjalną odznaką i nazwą fana. Twórca może go zaakceptować lub odrzucić, moderując treść. To tworzy niesamowitą personalną więź – fan słyszy "swój" dźwięk na streamie ulubionego twórcy.

### Integracja z Ekosystemem

- Dźwięki przypisane do zdarzeń są odtwarzane przez silnik alertów (`alerts/`).
- Wgrane pliki trafiają do prywatnej biblioteki twórcy, dostępnej we wszystkich sekcjach `live/`.
- Powiązanie z `alerts/` i `fullscreen-widgets/` – scena "Goal Celebration" może używać dźwięku z `sound-alerts/`.
- Dźwięki są serwowane przez CDN, zoptymalizowane pod kątem niskiego opóźnienia.
- System respektuje globalne ustawienia głośności i wyciszenia w OBS.

### Komponenty Składowe

- `SoundCategoryGrid` – siatka kategorii zdarzeń.
- `ThresholdList` – lista progów kwotowych z przypisanymi dźwiękami.
- `SoundLibrary` – siatka kart z wgranymi dźwiękami, waveformem i przyciskami.
- `UploadButton` – wgrywanie własnych plików (MP3, WAV, OGG).
- `RecorderButton` – nagrywanie bezpośrednio w przeglądarce.
- `AlertStylePreview` – podgląd wizualnego alertu z przypisanym dźwiękiem.
- `QueueSettings` – konfiguracja kolejkowania alertów.
- `FanSoundManager` – zarządzanie dźwiękami od fanów.

---

To już całe `studio/live/`. Od nakładek przez alerty, OBS, fanwall na żywo, cele w czasie rzeczywistym, ticker, źródła przeglądarkowe, pełnoekranowe sceny, aż po dźwiękową tożsamość – twórca ma kompletny arsenał do prowadzenia profesjonalnych transmisji, które angażują fanów na wszystkich poziomach zmysłów.

Gotowy, by ruszyć dalej, Wielorybie? Przed nami kolejne moduły – `community/`, `analytics/`, `wallet/`. Daj sygnał.


│
│   └── live/
│       ├── overlays/
│       ├── alerts/
│       ├── obs/
│       ├── live-fanwall/
│       ├── realtime-goals/
│       ├── ticker/
│       ├── browser-source/
│       ├── fullscreen-widgets/
│       └── sound-alerts/
