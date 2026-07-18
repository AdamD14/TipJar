# Lista komponentów — TipJar+ (React / Next.js / NestJS / TypeScript / Tailwind v4)

## 🪟 MODUŁ I — Okna Modalne

**`PaymentModal`**
Modal potwierdzenia transakcji USDC. Warstwa `z-index: 400`, animacja wejścia `@starting-style` (skala 0.95 → 1.0, 300–400ms, cubic-bezier Liquid Snap). Backdrop `blur-2xl + saturate-200`.

**`ConfirmationModal`**
Modal potwierdzenia akcji krytycznej (np. wypłata, zmiana portfela). Identyczna architektura z `PaymentModal`, inny content slot.

**`EducationModal`**
Modal informacyjno-edukacyjny (np. „co to jest USDC?", „jak działają napiwki"). Statyczny content, brak akcji finansowych.

**`PrismaticBorder`**
Komponent opakowujący — generuje pryzmatyczny obrys przez pseudoelement z gradientem (`teal-700 + gold-400 + purple-300`) i `mask-composite: exclude`. Reużywalny wrapper dla modali i kart.

**`LiquidGlassBackdrop`**
Dedykowana kurtyna tła dla modali. Realizuje `backdrop-blur-2xl`, `backdrop-saturate-200` i SVG `feDisplacementMap` dla refrakcji.

---

## 🏆 MODUŁ II — Fan Wall

**`FanWall`**
Kontener siatki awatarów fanów w układzie Bento Grid. Zarządza pozycjami Z-Axis (zwykli fani Z-1, top 3 → „Anomalia Przestrzenna").

**`FanAvatarCard`**
Pojedyncza karta awatara fana. Obsługuje dwa stany: `standard` (Z-1, bez poświaty) i `top` (Emissive Neon Glow w OKLCH gold/silver/bronze).

**`FanStatsModal`**
Modal-podsumowanie statystyk konkretnego fana (łączna kwota wsparcia, liczba napiwków). Używa `font-feature-settings: "tnum"` i `text-box: trim-both cap alphabetic` dla eliminacji Financial Jitter.

**`TabularStatDisplay`**
Komponent wyświetlania liczb finansowych z wymuszonym tabular numerals. Reużywalny w całej aplikacji wszędzie tam, gdzie pojawiają się asynchronicznie aktualizowane wartości USDC.

---

## 💬 MODUŁ III — Tooltipy i Popovery

**`GooeyTooltip`**
Tooltip z biologiczną morfogenezą SVG (feColorMatrix Gooey Effect). Pączkuje z ciała przycisku-rodzica, aktywowany kliknięciem (nie hover). `z-index: 500`.

**`ContextPopover`**
Elastyczny popover z animacją wysokości przez `calc-size()` i `interpolate-size: allow-keywords`. Obsługuje asynchroniczne content sloty (np. widget emoji reakcji na napiwek).

---

## 📂 MODUŁ IV — Dropdowny i Nawigacja

**`AnchoredDropdown`**
Menu rozwijane oparte na CSS Anchor Positioning API (`anchor-name: --dropdown-trigger`). Zero JavaScript do pozycjonowania, zero Layout Thrashing.

**`PillowMenuItem`**
Pojedynczy element menu z efektem „Tłoczenia Poduszkowego" — podwójny cień `inset` (jasny lewy-góra, ciemny prawy-dół) symulujący wgniatanie elastomeru na hover.

**`DeepNavigation`**
Komponent nawigacji głębokiej (wielopoziomowe menu / breadcrumb). Korzysta z `AnchoredDropdown` jako building block.

---

## 📝 MODUŁ V — Formularze

**`LiquidInputField`**
Pole formularza jako „oddychająca studnia" z SVG `feDisplacementMap`. Stany: `idle` (teal-900), `focus` (Rezonans Jądrowy — poświata purple-300), `error` (Frozen Glass Error State — koral #FFB4AB).

**`FloatingLabel`**
Etykieta pola, która przy focus unosi się w górę po krzywej `ease-in-out` w 150ms, zmienia wagę czcionki i miniaturyzuje się. Zintegrowana z `LiquidInputField`.

**`FrozenGlassErrorState`**
Wizualny komponent błędu walidacji — proceduralny efekt zamarzającego lodu w odcieniu koralowym. Brak agresywnych czerwieni (ochrona przed chromostereopsją na tle turkusowym).

**`WalletAddressInput`**
Wyspecjalizowane pole adresu portfela krypto, rozszerzenie `LiquidInputField` z dedykowaną walidacją formatu i własnym error state.

---

## 🔔 MODUŁ VI — Powiadomienia Toast

**`BlockchainToast`**
Toast powiadomień z webhooków blockchain. Animacja wejścia: harmoniczny oscylator `cubic-bezier(0.175, 0.885, 0.32, 1.275)`. `z-index: 300`.

**`ToastStack`**
Kontener zarządzający kolejką toastów — każdy nowy toast „zrzuca" poprzednie w głąb ekranu (`scale: 0.95, translateZ`) zamiast przesuwać wertykalnie.

---

## ⚡ MODUŁ VII — Innowacje Zaawansowane

**`AmbientLightAdapter`**
Komponent-provider odczytujący `AmbientLightSensor API` i wstrzykujący do kontekstu aktualne wartości luksów. Steruje Kaskadowym Stopniowaniem Luminancji przez zmienne OKLCH.

**`NocturnalOpulenceWrapper`**
HOC / wrapper przełączający globalne tokeny między trybem dziennym (podwyższone kontrasty) a nocnym (Emissive Neon Glow na obwodach obiektów). Konsument kontekstu `AmbientLightAdapter`.

**`ShockwaveButton`**
Przycisk generujący Falę Uderzeniową przy naciśnięciu — dynamiczny punkt świetlny przeliczający cienie sąsiednich obiektów. Integracja z `Vibration API` na mobile. Przeznaczony dla akcji autoryzacji.

**`GenUICard`**
Dynamicznie renderowana karta Bento Grid tworzona przez potok LLM → MCP → mikro-komponenty. Dziedziczy tokeny Z-Axis z rejestru globalnego, wstrzykiwana przez `@starting-style`.

**`ZAxisRegistry`**
Globalny store (Zustand) zarządzający rejestrem warstw Z-Axis całej aplikacji. Zapobiega konfliktom z-index między modalami, tooltipami, toastami i GenUI kartami.

**`ShadowMaestroProvider`**
Provider kontekstu globalnego silnika cieni. Dystrybuuje dynamiczne „Chameleon Shadows" (cienie absorbujące kolor podłoża) do wszystkich zarejestrowanych komponentów.

---

## 🗂️ KATALOG STRON (Next.js App Router)

| Ścieżka | Opis |
|---|---|
| `/` | Landing page — prezentacja platformy |
| `/creator/[username]` | Publiczny profil twórcy z Fan Wall i przyciskiem napiwku |
| `/creator/[username]/tip` | Flow transakcji — PaymentModal jako full-page na mobile |
| `/dashboard` | Panel twórcy — statystyki, Fan Wall management, Toast feed |
| `/dashboard/analytics` | Widok analityczny z TabularStatDisplay, wykresy napiwków |
| `/dashboard/wallet` | Zarządzanie portfelem, historia wypłat |
| `/onboarding` | 5-krokowy onboarding (rejestracja, połączenie portfela, profil) |
| `/settings` | Ustawienia konta, powiadomienia, preferencje UI |

# Lista komponentów — System Powiadomień TipJar+ (React / NestJS / Next.js / TS / Tailwind)

## 🔔 NAVBAR — Ikona Portfela i Maszyna Stanów

**`WalletNavIcon`**
Główna ikona portfela w Navbarze. Kontener maszyny stanów FSM (XState). Przełącza wygląd i zachowanie ARIA na podstawie aktualnego stanu (`idle` / `pending` / `active` / `frenzy` / `whale`).

**`WalletBalanceDisplay`**
Wyświetlacz salda portfela obok ikony. Używa `font-feature-settings: "tnum"` i przesyła wartości jako `String` (nie `Float`) celem ochrony precyzji USDC. Ukryty przed czytnikami ekranu podczas animacji rollowania (`aria-hidden="true"`).

**`WalletStateIdle`**
Wariant stanu bezczynności. Tło `teal-900`, ikona wtopiona w tło, zero animacji. Brak ról ARIA live — czytnik odczytuje tylko statyczne „Portfel, saldo X USDC".

**`WalletStatePending`**
Wariant stanu oczekiwania na atestację blockchain (`cpn.payment.delayed`, `cpn.payment.cryptoFundsPending`). Pulsujący obrys `border-glow` w `purple-300`. Atrybut `aria-busy="true"` wstrzymujący czytniki.

**`WalletStateActive`**
Wariant standardowego wpływu. Ożywienie ikony tokenem `text-secondary`. Krótkotrwały (3–5 sek.) pop-up obok ikony, następnie powrót do `Idle`. Region `aria-live="polite"`.

**`WalletStateFrenzy`**
Wariant kumulacji (ponad 5 webhooków w oknie 10 sekund). Migotanie zablokowane — statyczny licznik na tle `teal-900`, wizualizacja stosu monet. Aktualizacje ARIA zawieszone do zakończenia serii (debounce), następnie spójny odczyt sumaryczny.

**`WalletStateWhale`**
Wariant kulminacji wieloryba. Bezwzględna eskalacja barwna `gold-400`, rozbłysk ikony utrzymany dłużej niż standardowe wpływy. `aria-live="assertive"` wymuszający natychmiastowe przerwanie odczytu czytnika.

---

## 🍞 TOAST — Powiadomienia Strumieniowe

**`BlockchainToastItem`**
Pojedynczy toast z webhooka Circle. Animacja wejścia harmonicznym oscylatorem `cubic-bezier(0.175, 0.885, 0.32, 1.275)`. Warianty wizualne powiązane ze stanem (`active` / `whale` / `pending` / `reversal`).

**`ToastStackContainer`**
Kolejka toastów z Z-Axis stacking — każdy nowy toast zrzuca poprzednie „w głąb" (`scale: 0.95, translateZ`). Zarządza debounce'em przy Frenzy i batchowaniem wielu wpływów w jeden toast sumaryczny.

**`ReversalToast`**
Dedykowany toast dla `Reversed` / `MissingFunding` / `cpn.payment.failed`. Zmiana `aria-live` z `polite` na `assertive`. Kolor koralowy zamiast czerwieni (ochrona przed chromostereopsją). Nie kradnie focusu klawiatury (bez Focus Stealing).

---

## 📡 WARSTWA SSE — Połączenie i Dystrybucja

**`SSEConnectionProvider`**
React Context Provider zarządzający pojedynczym połączeniem SSE (`EventSource`). Implementuje logikę Leader Election przez `BroadcastChannel API` — tylko zakładka-lider otwiera fizyczne połączenie HTTP/2.

**`BroadcastChannelBridge`**
Mostek dystrybucji zdarzeń SSE do pozostałych zakładek przeglądarki (follower tabs) przez `BroadcastChannel`. Czas propagacji w skali setnych milisekundy. Zastępuje `SharedWorker` (wykluczony z powodu braku wsparcia Android Chrome).

**`LeaderElectionManager`**
Hook / singleton zarządzający procesem elekcji lidera między zakładkami. Obsługuje awarię lidera (zamknięcie zakładki) i natychmiastowe przeprowadzenie nowej loterii wśród followerów.

**`SSEReconnectHandler`**
Komponent obsługujący auto-reconnect SSE po utracie łączności. Dołącza nagłówek `Last-Event-ID` przy wznowieniu, inicjując odzysk brakujących zdarzeń z Redis Streams (XRANGE). Fallback do REST polling `/balance` gdy okno retencji Redis wygasło.

---

## 🧠 MASZYNA STANÓW — Frontend FSM

**`WalletFSM`**
XState machine definiująca 5 stanów portfela (`idle` / `pending` / `active` / `frenzy` / `whale`). Implementuje debouncing, throttling i guard conditions (np. `sender.tier === 'whale'`, okno 10 sekund dla Frenzy). Nie pozwala na re-render częściej niż raz na zdefiniowaną jednostkę czasu.

**`EventDeduplicator`**
LRU Cache przechowujący `eventId` ostatnich N odebranych zdarzeń. Blokuje duplikaty na poziomie frontendu przed wejściem do maszyny stanów — `głębokie dyskardowanie` przy potwierdzeniu repliki.

**`SequenceNumberGuard`**
Hook weryfikujący monotoniczny `sequenceNumber` każdego zdarzenia. Odrzuca chronologiczne przeżytki (zdarzenie starsze niż ostatnio przetworzone) wynikające z rozsynchronizowania wątków przeglądarki.

**`EventBatchAccumulator`**
Komponent scalający wiele zdarzeń Frenzy w jeden pakiet sumaryczny (`walletBalanceAfter` z ostatniego, `amountValue` jako suma delta). Eliminuje efekt stroboskopowy licznika i chroni Main Thread przed zawieszeniem.

---

## 📊 MODEL DANYCH — Kontrakty i Typy

**`SSEPayloadSchema`** *(TypeScript type / Zod schema)*
Definicja typu minimalnego kontraktu SSE: `eventId`, `eventType`, `context.amountValue` (String), `context.walletBalanceAfter` (String), `context.emotionalTier` (`STANDARD | FRENZY | WHALE`), `context.sender.isFirstInteraction`, `timestamp`.

**`EmotionalTierBadge`**
Komponent wizualny wskaźnika poziomu nadawcy (STANDARD / WHALE / nowy fan). Wyzwalany przez `emotionalTier` z payloadu — logika kategoryzacji pozostaje po stronie backendu, nie frontendu.

**`FirstInteractionCallout`**
Jednorazowy efekt wizualny dla `isFirstInteraction === true`. Wyświetla specjalny komunikat „Pierwszy tip!" z oddzielnym zestawem animacji. Odpala się tylko raz per zdarzenie.

---

## ♿ DOSTĘPNOŚĆ — ARIA i Czytniki

**`ARIALiveRegionManager`**
Centralny manager regionów `aria-live`. Przełącza poziom asertywności (`polite` / `assertive` / wyłączony) na podstawie stanu FSM. Obsługuje „double speaking" przy Frenzy przez zawieszenie aktualizacji podczas serii.

**`ScreenReaderBalanceAnnouncer`**
Ukryty element `sr-only` ogłaszający finalne saldo po zakończeniu serii Frenzy lub po wejściu w stan Whale. Oddzielony od wizualnego `WalletBalanceDisplay` by uniknąć konfliktu odczytów.

---

## 🗂️ KOMPONENTY BACKENDOWE (NestJS) — powiązane z architekturą

**`CircleWebhookController`**
NestJS controller przyjmujący POST z Circle. Natychmiast odpowiada `HTTP 202 Accepted`. Weryfikacja ECDSA (P-256 / SHA-256) przez `X-Circle-Signature` i `X-Circle-Key-Id`. Odrzuca z `HTTP 401` przy nieprawidłowej sygnaturze.

**`WebhookIdempotencyGuard`**
Guard / middleware sprawdzający `notificationId` / `eventId` w bazie przed przetworzeniem. Blokada atomowa (`UNIQUE constraint` PostgreSQL lub DynamoDB `attribute_not_exists`). Odrzuca duplikaty bez wejścia w logikę biznesową.

**`WebhookEnrichmentService`**
Serwis wzbogacający surowy payload Circle o kontekst TipJar+: mapowanie adresu portfela na profil użytkownika, obliczenie `emotionalTier`, flaga `isFirstInteraction`, wyliczenie `walletBalanceAfter`. Zapis do PostgreSQL **przed** emisją do Redis Streams.

**`RedisStreamsPublisher`**
Serwis publikujący zoptymalizowany payload do strumienia `stream:creator:{id}` (komenda `XADD`). Wywoływany wyłącznie po pomyślnym `commit` w bazie — eliminuje race condition publish-before-commit.

**`SSEGateway`**
NestJS gateway serwujący `text/event-stream`. Odczytuje ze strumienia Redis przez Consumer Groups (`XREADGROUP`). Dołącza `Last-Event-ID` do każdego zdarzenia. Obsługuje `XRANGE` przy reconnect z nagłówkiem `Last-Event-ID` od klienta.

**`EgressRateLimiter`**
Middleware dławiący wyjście SSE przy Tip Storms. Przy >20 zdarzeń/sek scala je w jeden `EventBatch` zamiast bombardować klienta. Chroni Main Thread przeglądarki przed zawieszeniem podczas paniki strumieniowej.

# Lista komponentów — System Kart TipJar+ (React / Next.js / TS / Tailwind v4)

## 🏗️ FUNDAMENTY GLOBALNE

**`GlobalTokenProvider`**
CSS Custom Properties dla całej aplikacji: paleta Deep Teal (`--teal-900` → `--teal-25`), akcenty semantyczne (`--gold-400`, `--purple-300`), tokeny czasu animacji (`--duration-micro` do `--duration-large`), tokeny krzywych sprężystości (`--ease-spring`, `--ease-out`).

**`FluidTypographyScale`**
Globalna skala typografii płynnej opartej na `clamp()`. Eliminuje media queries. Obejmuje `--fs-display`, `--fs-h2`, `--fs-h3`, `--fs-body`, `--fs-caption`. Dostosowuje rozmiary do „Strefy Kciuka" na mobile.

**`SVGMasterDefs`**
Globalny, niewidoczny węzeł `<svg>` wstrzykiwany na szczycie dokumentu. Definiuje reużywalne zasoby: `clipPath` dla łuku lewego/prawego (`arc-left-edge`, `arc-right-edge`), wzorzec siatki Frozen Glass (`frozen-network-grid`), gradient iluzji luminancji (`illusion-grad`).

**`InteractionStateManager`**
Singleton JS / React hook wykrywający typ wskaźnika (`touch` / `mouse` / `keyboard`). Nakłada klasy `intent-touch`, `intent-mouse`, `intent-keyboard` na `document.body`. Eliminuje „lepki hover" na mobile i warunkuje pierścienie focusu WCAG 2.2 wyłącznie dla klawiatury.

**`BaseCard`**
Bazowy wrapper komponentu karty. Obsługuje `role="article"`, `aria-labelledby`, izolację warstw (`isolation: isolate`), token tła (`--teal-800` / `--teal-900` / `--teal-500`), `border-radius`, padding. Wszystkie warianty kart rozszerzają ten komponent.

---

## 💳 WARIANT 1 — Pulse Momentum Card

**`PulseMomentumCard`**
Karta wizualizatora napływu kapitału USDC w czasie rzeczywistym. Tło `teal-800`, `clip-path: url(#arc-right-edge)`. Gradient 110° na pseudoelemencie przeliczany przez GPU (Composite phase) — zero obciążenia CPU przy hover.

**`FinancialAmountDisplay`**
Wyświetlacz kwoty USDC: `font-feature-settings: "tnum"` (tabular numerals), `font-size: var(--fs-display)`, kolor `gold-400`. Reużywalny w całej aplikacji wszędzie tam, gdzie pojawiają się asynchronicznie aktualizowane wartości finansowe.

---

## 🧊 WARIANT 2 — Frozen Glass 3.0 Card

**`FrozenGlassCard`**
Karta z paradygmatem Frozen Glass 3.0. `background: var(--teal-500)`, `backdrop-filter: blur(16px)`, `backdrop-saturate`. Nakłada wzorzec siatki SVG `frozen-network-grid` jako `overlay` z `pointer-events: none`.

**`FrozenNetworkOverlay`**
Wewnętrzny element siatki geometrycznej dla `FrozenGlassCard`. Wektorowe prowadnice 1px (krycie 3–5%) działające jako podświadome linie prowadzące dla wzroku (algorytm Z-Pattern). `position: absolute`, `inset: 0`, `z-index: 0`.

**`SparklineChart`**
Mini wykres SVG z `vector-effect="non-scaling-stroke"` — linia nie rozszerza się przy skalowaniu kontenera. Stroke `gold-400`. `preserveAspectRatio="none"`. Używany w `FrozenGlassCard` jako wskaźnik trendu infrastruktury.

---

## ⚡ WARIANT 3 — Zero-Friction Action Card

**`ZeroFrictionActionCard`**
Karta z przyciskiem akcji smart contractu. Tło `teal-800`. Zawiera `PremiumButton` z pełną inżynierią Pointer Events.

**`PremiumButton`**
Przycisk z fizyką kompresji materiału. Obsługuje `pointerdown` / `pointermove` / `pointerup` / `pointercancel`. Próg 60ms (`pressTimer`) filtrujący mimowolne rozedrganie kciuka. Klasa `is-physically-pressed` → `scale(0.95)`, `gold-500`, spłaszczony cień. `touch-action: pan-y pinch-zoom` dekupluje scroll od nacisku. Focus ring `purple-300` wyłącznie przy `intent-keyboard`.

---

## 👥 WARIANT 4 — Social Proof Gamification Card

**`SocialProofCard`**
Karta dowodu społecznego z klastrami awatarów. Border-left `4px solid purple-300` jako znacznik ramy strukturalnej.

**`AvatarCluster`**
Kontener nakładających się awatarów z offsetem `-12px margin-left`. Zarządza `z-index` dla poprawnej kolejności nakładania.

**`AvatarBadge`**
Pojedynczy awatar z maskowaną krawędzią przez `mask: radial-gradient(circle at 100% 50%, transparent 18%, black 19%)`. Eliminuje „brudne" krawędzie bez użycia `border: transparent`. Gradient inicjałów: `gold-400` → `purple-300` z rotacją `--rot` jako CSS custom property.

---

## 🍞 WARIANT 5 — Asynchronous Stacked Toast

**`A11yAnnouncerProvider`**
React Context Provider z globalną szyną ARIA. Jedyna stabilna instancja `aria-live="polite"` w korzeniu drzewa DOM. Obsługuje wymuszenie mutacji węzła tekstowego (reset → setTimeout 50ms → set) eliminujący „Silent Failure" dynamicznie montowanych regionów ARIA.

**`ToastCard`**
Pojedynczy toast z fizyką sprężystego rzutu `cubic-bezier(0.175, 0.885, 0.32, 1.275)`. CSS custom properties `--stack-index` i `--toast-depth` sterują pozycją Z-Axis, skalą (`calc(1 - 0.05 * var(--stack-index))`) i jasnością (`brightness(calc(1 - 0.15 * var(--stack-index)))`).

**`ToastCardDegraded`**
Wariant `ToastCard` dla elementów zepchnietych w stos (indeks > 0). Usuwa `backdrop-filter` i `box-shadow` — ochrona GPU przed Overdraw na ukrytych warstwach. Tło degraduje do `teal-900`.

**`ToastStackContainer`**
Kontener pozycjonujący (`position: fixed`, `bottom: 24px`, `right: 24px`). Oblicza `transform: translateY(var(--toast-depth)) scale(...)` i `z-index: calc(9999 - var(--stack-index))` dla każdego elementu stosu.

---

## 💾 WARIANT 6 — DLP Autosave Card

**`ConfigDraftCard`**
Karta bufora roboczego konfiguracji dashboardu. Wskaźnik stanu `draft-status` z pulsującym punktem `gold-400` (`animation: pulse-sync 2s infinite`). Integracja z React Hook Form.

**`DraftStatusIndicator`**
Komponent wskaźnika „Changes Buffered" — pulsujący okrąg 8px `gold-400` + tekst `fs-caption`. Zmienia stan na „Saved" / „Error" w zależności od wyniku autozapisu.

**`RouterBlockerGuard`**
Hook obsługujący miękkie wyloty routera (`useBlocker` z React Router v6) przy `isDirty === true`. Zapobiega utracie niezapisanych zmian przy nawigacji SPA.

**`HardExitGuard`**
Hook nasłuchujący `window.beforeunload` gdy formularz jest `isDirty`. Wyświetla systemowe okno potwierdzenia przy zamknięciu karty / przeglądarki. Automatycznie usuwa listener po zapisie.

**`DeltaAutosaveManager`**
Hook ekstrahujący tylko `formState.dirtyFields` (delta, nie pełny obiekt) do `sessionStorage` z partycjonowaniem klucza (`config_draft_v1`) i metadanymi `timestamp` + `ttl: 86400000`. Zapobiega kolizji Race Condition między zakładkami.

**`FocusRingWrapper`**
Wrapper `div` z `focus-within` → `outline: 2px solid purple-300`. Semantyczna ochrona klawiatury dla grup pól formularza bez degradacji estetyki Deep Teal.

---

## 🌀 WARIANT 7 — Peripheral Drift Illusion Card

**`PeripheralDriftCard`**
Karta skupienia uwagi oparta na iluzji dryfu obwodowego (wzorzec Ouchi/PDI). SVG 200×200px z `shape-rendering: crispEdges` — zakaz rozmycia wektorów. Cztery kafelki z rotowanymi wzorcami `<use>` i gradientem achromatycznym (czarny/biały/szary). Bez użyteczności finansowej — wyłącznie jako attractor uwagi.

---

## 🔐 WARIANT 8 — Web3 Enigma Card

**`Web3EnigmaCard`**
Karta abstrakcji węzła kryptograficznego Circle Arc. Ukrywa surowe dane Web3 (nonce, gas limits, RPC) za warstwą `node-glass-layer` z `backdrop-filter: blur(24px)` i siatką `frozen-network-grid`. Optymalizacja mobilna: `-webkit-transform: translate3d(0,0,0)` + `will-change: transform`.

**`StatusOrb`**
Pulsujący okrąg 14px `purple-300` z animacją `breathe` (3s, `ease-in-out`, `scale: 1 → 1.2`). Symuluje stabilność systemu przez organiczną, spokojną animację. `box-shadow: 0 0 16px purple-300` wzmacniany w peak animacji.

---

## 💰 WARIANT 9 — Assumed Close Monetization Card

**`MonetizationCard`**
Karta konwersji napiwku z wzorcem „Założenia Zamknięcia". Layout `flex-column`, gap `32px`. Zawiera `QuickAmountSelector` i `CheckoutCTA`.

**`QuickAmountSelector`**
Siatka 3-kolumnowa szybkich kwot (5 / 10 / 25 USDC). Stan `active` → tło `purple-300`, `transform: translateY(-4px)`, cień fioletowy. Redukuje paraliż wyboru. `anchor-btn` wypełnia 100% kolumny siatki dla dużego targetu dotykowego.

**`CheckoutCTA`**
Główny przycisk „Deploy Support". Tło `gold-400`, kolor `teal-900`. Pozycjonowany przez `fluid typography + clamp()` zawsze w „Strefie Kciuka" (dolne 40% ekranu mobile). Rozszerza `PremiumButton`.

---

## 🔄 WARIANT 10 — Conflict Resolution State-Sync Card

**`ConflictResolutionCard`**
Karta asystenta scalania konfliktów stanu. Layout `grid: auto 1fr auto`. Obramowanie `1px solid gold-400` + `box-shadow: 0 0 0 4px rgba(255,215,0,0.1)` — „Gold Standard" sygnalizujący pilność w natłoku paneli.

**`CounterSpinIcon`**
SVG ikony odświeżania z animacją `counter-spin` (obrót -360° w 4s, `linear`, `infinite`). Komunikuje aktywny proces odzyskiwania bufora.

**`StateMergeAction`**
Logika przycisku „Merge State" — stosuje metodę LWW (Last-Write-Wins) przez `form.reset(delta)`. Wstrzykuje wyekstrahowaną deltę z `sessionStorage` do stanu formularza bez nadpisywania danych z PostgreSQL.

**`GhostButton`**
Przycisk drugorzędny „Discard" — `background: transparent`, `border: 1px solid teal-700`. Reużywalny w całej aplikacji jako akcja destrukcyjna o niskim priorytecie wizualnym.

# Lista komponentów — Architektura Platformy TipJar+ (Next.js / React / TS / Tailwind)

## 🏠 DESKTOP — Centrum Dowodzenia

**`DesktopLayout`**
Nadrzędny layout obszaru roboczego po zalogowaniu. Inicjuje pobranie zagregowanego stanu metryk na poziomie RSC (React Server Component). Zarządza Parallel Routes (`@metrics`, `@activity`) dla niezależnego streamingu sekcji.

**`KPICardGrid`**
Siatka kart KPI renderowanych jako RSC. Wyświetla: aktualne saldo, liczbę nowych wspierających, bazę obserwujących, Recurring Revenue. Zero JS w paczce klienta — lekki HTML z bazy przez ORM.

**`KPICard`**
Pojedyncza karta metryki (RSC). Statyczna migawka wartości w danym momencie. Reużywalna z różnymi ikonami i etykietami semantycznymi. Rozszerza `BaseCard` z systemu kart Deep Teal.

**`ActivityFeed`**
Zunifikowany kanał aktywności (Client Component, `use client`). Obsługuje trwałe połączenie SSE. Renderuje oś czasu integrującą: wpłaty napiwków, nowe subskrypcje, realizacje celów, alerty systemowe.

**`ActivityFeedItem`**
Pojedynczy element osi czasu aktywności. Warianty: `tip` / `subscription` / `goal` / `system`. Rozróżnienie wizualne przez token koloru (`gold-400` dla tip, `purple-300` dla system).

**`ActivityFeedFilter`**
Zestaw filtrów kanału aktywności: Wszystkie / Tylko wsparcie / Obserwujący / System. Płynne przełączanie bez re-fetchu — filtrowanie po stronie klienta na już załadowanym strumieniu.

**`AIInsightsWidget`**
Moduł rekomendacji AI (async RSC ze Suspense). Analizuje strumienie zachowań audytorium w tle. Asynchronicznie sugeruje akcje twórcy (np. podziękowanie grupie lojalnych darczyńców). Integracja z katalogiem `/agents`.

**`QuickActionsLauncher`**
Launcher skrótów do najczęściej powtarzanych akcji: wypłata środków, edycja celu, wysłanie aktualizacji dla fanów. Minimalizuje ścieżkę do krytycznych operacji. Każda akcja to Client Component z Server Action pod spodem.

**`ActiveGoalsPreview`**
Podgląd aktywnych celów finansowych na Desktopie. Rola motywacyjna i weryfikacyjna. Pasek postępu, kwota aktualna vs. docelowa, termin. Dane z RSC.

**`FanwallPreview`**
Miniaturowy podgląd ściany fanów na Desktopie. Weryfikuje poprawność wyświetlania zewnętrznego dowodu społecznego. Link do pełnego widoku w Studio → Page.

---

## 🎨 STUDIO / PAGE — Wizerunek Publiczny

**`PageStudioLayout`**
Layout poddomeny Page w Studio. Zarządza zakładkami: Profil / Appearance / Section Order / Links / SEO / Badges.

**`ProfileEditor`**
Formularz edycji tożsamości twórcy: nazwa wyświetlana, unikalny identyfikator (slug), biografia, awatar, baner. Server Action do zapisu. Walidacja Zod po stronie serwera.

**`AppearanceCustomizer`**
Konfiguracja wyglądu profilu publicznego: wybór motywu, palety kolorystycznej, stylu typograficznego, efektów Glass i akcentów. Podgląd na żywo (Client Component).

**`BentoGridLayoutEditor`**
Edytor układu Bento Grid profilu publicznego. Drag-and-drop kolejności sekcji (Section Order): pasek celu, ostatnie wydarzenia, przypięte treści, Fanwall. Widoki mobile i desktop.

**`ExternalLinksManager`**
Zarządzanie łączami do zewnętrznych sieci: Twitch, YouTube, TikTok i inne. Dodawanie, usuwanie, zmiana kolejności. Zapis przez Server Action.

**`BadgesManager`**
Zarządzanie cyfrowymi odznakami twórcy: Verification, Custom Labels, Archetype Badge. Lista dostępnych i przypisanych odznak.

**`SEOMetaEditor`**
Konfiguracja meta-tytułu, opisu i obrazu OpenGraph dla publicznego profilu. Dane zasilają `generateMetadata` w Next.js App Router. Podgląd snippetu wyszukiwarki i karty social media.

---

## 💰 STUDIO / MONETIZATION — System Monetyzacji

**`MonetizationStudioLayout`**
Layout poddomeny Monetization. Zakładki: Tip Modal / Goals / Recurring Support / Thank You Screen / Global Settings.

**`TipModalConfigurator`**
Konfiguracja modalnego okna wpłat: predefiniowane kwoty (`QuickAmounts`), akceptacja wsparcia anonimowego, wymóg pseudonimu. Podgląd live modalu. Intercepting Route — otwiera się nad aktualnym widokiem.

**`GoalsConfigurator`**
Konfiguracja celów finansowych: nazwa celu, kwota docelowa, ramy czasowe, widoczność paska postępu. CRUD przez Server Actions.

**`MembershipTiersEditor`**
Edytor poziomów członkostwa cyklicznego (Recurring Support): nazwa tier, cena, pakiet korzyści (Supporter Perks), ustawienia odnawiania subskrypcji. Drag-and-drop kolejności tierów.

**`SupporterPerksEditor`**
Edytor korzyści przypisanych do tieru membership: lista perków, ikony, opisy. Reużywalny w `MembershipTiersEditor`.

**`ThankYouScreenEditor`**
Konfiguracja ekranu po transakcji: własna wiadomość, grafika, predefiniowane teksty systemowe, inteligentne domyślne kwoty sugestii kolejnego wsparcia.

**`GlobalMonetizationSettings`**
Ustawienia globalne monetyzacji: domyślna waluta, kwoty minimalne, moderacja wulgaryzmów w wiadomościach do twórcy.

---

## 📢 STUDIO / SHARE & PROMOTE — Dystrybucja Zewnętrzna

**`PromoteStudioLayout`**
Layout poddomeny Share & Promote. Zakładki: QR Codes / Smart Links / Embeds / Social Cards.

**`QRCodeGenerator`**
Generator kodów QR powiązanych z konkretnym celem lub wydarzeniem. Opcje: rozmiar, kolor, logo w centrum. Eksport PNG/SVG.

**`SmartLinkManager`**
Zarządzanie inteligentnymi łączami (Smart Links) i niestandardowymi adresami (Custom Slugs). Agregacja danych o ruchu per link. Tabela z klikalności i konwersji.

**`EmbedCodeGenerator`**
Generator kodów embed (iframe / script) dla: pływającego widżetu wsparcia, interaktywnego przycisku, kompaktowej karty. Podgląd live. Integracje: Notion, WordPress, zewnętrzny blog.

**`SocialCardCreator`**
Kreator statycznych i animowanych kart twórcy. Optymalizacja podglądów dla Twittera/X, Discorda, Instagram Stories. Eksport gotowych zasobów graficznych.

---

## 📡 STUDIO / LIVE — Narzędzia OBS

**`LiveStudioLayout`**
Dedykowany layout bez nawigacji (`shell`-free) — transparentne środowisko dla Browser Source w OBS/Streamlabs. Osobna grupa tras w App Router.

**`GoalOverlay`**
Nakładka OBS dla paska celu finansowego. Transparentne tło. Animacja przy osiągnięciu milestone. Zasilana przez WebSocket.

**`TopSupportersOverlay`**
Nakładka OBS z listą największych wspierających. Konfigurowalny ranking (top 3/5/10). Animacje wejścia nowego wspierającego.

**`AlertOverlay`**
Nakładka OBS dla alertów wpłat. Konfiguracja: dźwięk alertu, animacja, czas wyświetlania, minimalny próg kwoty dla alertu.

**`FanTickerOverlay`**
Dynamicznie przewijany pasek z listą fanów (Ticker). Konfigurowalna prędkość przewijania, styl tekstu, separator.

**`SceneOverlay`**
Nakładka pełnoekranowa dla scen przerw: „Be Right Back", „Starting Soon". Konfigurowalny wygląd i countdown timer.

**`SourceTokenManager`**
Generator i manager bezpiecznych tokenów źródłowych (Source Tokens) chroniących widoki overlay przed nieautoryzowanym dostępem. Rotacja tokenów, lista aktywnych sesji.

---

## 🤖 STUDIO / AUTOMATIONS — Automatyzacja

**`AutomationsStudioLayout`**
Layout poddomeny Automations. Zakładki: Auto Thank You / Auto Responses / Smart Campaigns / Engagement Insights.

**`AutoThankYouConfigurator`**
Konfiguracja automatycznych podziękowań po wpłacie: szablon wiadomości, personalizacja (imię, kwota), opóźnienie wysyłki, progi kwotowe dla różnych szablonów.

**`AutoResponseConfigurator`**
Konfiguracja autoresponderów na typy wiadomości od społeczności: warunki wyzwalacza, treść odpowiedzi, limit częstotliwości.

**`SmartCampaignBuilder`**
Kreator inteligentnych kampanii z segmentacją odbiorców. Targetowanie: użytkownicy, którzy wstrzymali wsparcie / nowi obserwujący / top supporters. Harmonogram wysyłki.

**`EngagementInsightsDashboard`**
Panel śledzenia zaangażowania bazy fanów. Automatyczne planowanie cykli podnoszenia celów finansowych na podstawie danych historycznych.

---

## 👥 COMMUNITY — Zarządzanie Relacjami

**`CommunityLayout`**
Layout modułu Community. Zakładki: Feed / Subscribers / Members / Events / Engagement / Inbox / Moderation.

**`CommunityFeed`**
Strumień treści z wpisami multimedialnymi i ogłoszeniami publicznymi. CRUD postów przez Server Actions. Filtrowanie i sortowanie.

**`SubscribersList`**
Lista cyklicznych fanów z historią wsparcia, datą dołączenia, tierem. Profil szczegółowy per fan z pełną historią transakcji.

**`DonorsList`**
Lista jednorazowych darczyńców. Oddzielona od `SubscribersList` — inna logika relacji i komunikacji.

**`MembershipsAccessManager`**
Zarządzanie ekskluzywnym dostępem do treści per tier membership. Mapowanie: treść → wymagany tier.

**`EventsManager`**
Koordynacja wydarzeń online i offline: tworzenie, edycja, lista RSVP, wysyłka przypomnień.

**`CommunityInbox`**
Skrzynka odbiorcza wiadomości od wspierających. Filtrowanie, oznaczanie jako przeczytane, odpowiedź bezpośrednia.

**`EngagementTools`**
Narzędzia angażujące społeczność: kreator ankiet, konfiguracja wyzwań społecznościowych.

**`ModerationPanel`**
Panel moderacji: lista filtrowanych słów, zarządzanie zablokowanymi użytkownikami. Walidacja sygnatur przez Server Actions (Edge).

---

## 📊 ANALYTICS — Pomiary Wydajności

**`AnalyticsLayout`**
Layout modułu Analytics. Zakładki: Earnings / Conversion / Audience / Content / Live Performance / AI Predictions / Export.

**`EarningsTrendChart`**
Wykres historyczny przychodów. Renderowanie hybrydowe — agregacja zapytań po stronie serwera, lekki payload do przeglądarki. Streaming SSR dla ciężkich zapytań.

**`ConversionRatePanel`**
Analiza konwersji: procent skuteczności wejść z kodów QR i Smart Links. Tabela źródeł ruchu.

**`AudienceBehaviorPanel`**
Analityka audytorium: wskaźniki retencji (Retention), geolokalizacja ruchu, segmentacja demograficzna.

**`ContentPerformancePanel`**
Odsetek interakcji na opublikowany post. Ranking treści po zaangażowaniu.

**`LiveStreamPerformancePanel`**
Efektywność nakładek powiadomień podczas transmisji. Korelacja alertów z skokami wpłat.

**`AIPredictionsPanel`**
Predykcje AI: godziny szczytu aktywności, przewidywana szybkość realizacji celów finansowych. Async RSC ze Suspense.

**`ReportExporter`**
Asynchroniczny eksport zestawień do CSV. Progress indicator, historia eksportów, link do pobrania.

---

## 💳 WALLET — Operacje Finansowe

**`WalletLayout`**
Layout modułu Wallet chroniony Edge Middleware walidującym uprawnienia przed renderowaniem. Zakładki: Overview / Deposit / Withdraw / Payouts / Security / History.

**`FundsOverview`**
Podział salda: Available Funds vs. Pending Transfers. RSC z bezpośrednim zapytaniem do bazy. Streaming SSR.

**`DepositGateway`**
Interfejs deponowania kapitału: bramki fiat i krypto. Integracja Circle. Formularz z walidacją Zod + Server Action.

**`WithdrawalManager`**
Zarządzanie wypłatami: Bank Withdrawal, Exchange Transfer, połączone portfele zewnętrzne. Podwójne zatwierdzanie transakcji.

**`AutomaticPayoutsConfigurator`**
Konfiguracja cyklicznych harmonogramów wypłat: częstotliwość, próg minimalny, docelowy portfel/konto.

**`InvoiceList`**
Fakturowanie strumieni przychodów z subskrypcji. Lista faktur z filtrowaniem po datach i tierach.

**`WalletSecurityPanel`**
Warstwa Security portfela: podwójne zatwierdzanie transakcji, lista aktywnych sesji logowania, awaryjne zamrożenie kart fizycznych/wirtualnych. Standard PCI-DSS.

**`TransactionHistory`**
Pełna historia transakcji portfela. Filtrowanie, sortowanie, eksport. Paginacja server-side.

---

## 🧭 NAWIGACJA GLOBALNA

**`GlobalNav`**
Główna nawigacja platformy. Pięć filarów: Desktop / Studio / Community / Analytics / Wallet. Aktywny stan per filar. Zawiera `WalletNavIcon` z systemu powiadomień SSE.

**`StudioSubNav`**
Nawigacja podrzędna modułu Studio. Zakładki: Page / Monetization / Share & Promote / Live / Automations. Widoczna tylko wewnątrz `/(creator)/studio`.

**`RouteGroupShell`**
Nadrzędny `layout.tsx` grupy tras `(creator)` — spersonalizowany layout dla uwierzytelnionego twórcy. Odseparowany od publicznych profili i stron marketingowych. Zawiera `GlobalNav`, `SSEConnectionProvider`, `A11yAnnouncerProvider`.

---

## 🏗️ ARCHITEKTURA TECHNICZNA

**`ParallelRouteSlot`**
Konfiguracja Named Slots (`@metrics`, `@activity`, `@actions`) dla Parallel Routes na Desktopie. Niezależny streaming sekcji — aktywność ładuje się bez blokowania metryk.

**`InterceptingModalRoute`**
Wzorzec Intercepting Routes dla konfiguracji napiwków — podstrona otwiera się jako modal nad aktualnym widokiem bez utraty kontekstu. Implementacja `(.)tip-config`.

**`FeatureBoundary`**
Wrapper `error.tsx` + `loading.tsx` na każdym poziomie modułu. Izoluje awarię jednego modułu (np. błąd bramki płatniczej) od reszty interfejsu.

**`BarrelExport`**
Plik `index.ts` każdej domeny Feature-Driven (`src/features/[domain]/index.ts`). Eksportuje tylko publiczne API domeny — zapobiega nieautoryzowanym integracjom między modułami.

**`EdgeAuthMiddleware`**
Middleware brzegowe (`middleware.ts`) walidujące uprawnienia przed udostępnieniem tras Wallet i Studio. Uruchamiane na Edge Runtime przed renderowaniem strony.

# Lista komponentów — Ekosystem Hiper-Fizyczny TipJar+ (React / Next.js / TS / Tailwind v4)

## 🏗️ FUNDAMENTY ARCHITEKTONICZNE

**`DoubleWrapperCapsule`**
Reużywalny wrapper dla kart z `clip-path`. Zewnętrzny kontener generuje wyłącznie `filter: drop-shadow` z małym paddingiem. Kontener wewnętrzny przechowuje maskę `clip-path` i tło. Rozwiązuje „Przeciekanie Radiusa" — GPU oblicza głębię z pominięciem cięcia maski.

**`HardwareAcceleratedShadowLayer`**
Pseudoelement (`::after`) lub `div` z docelowym cieniem głębi. Domyślnie `opacity: 0`, przy hover `opacity: 1`. Animowana jest wyłącznie przezroczystość — zdjęcie ~92% obciążenia CPU przy hover. Atrybut `will-change: opacity`. Reużywalny we wszystkich kartach.

**`ChameleonShadow`**
System proceduralnych cieni absorbujących barwę podłoża. Zastępuje `rgba(0,0,0,0.5)` cieniem o kolorze zdefiniowanym z nasycenia powierzchni `--teal-*` przyciemnionym o 30–40%. Eliminuje „Achromatyczne Kłamstwo" i zjawisko color banding.

**`LuminanceStepUpProvider`**
Provider kontekstu zarządzający Kaskadowym Stopniowaniem Luminancji w trybie ciemnym. Wyższe warstwy osi Z stają się bazowo jaśniejsze zamiast rzucać czarne cienie. Dystrybuuje tokeny `z-elevation` do konsumentów.

**`EmissiveGlowLayer`**
Komponent generujący neonowe poświaty na elementach interaktywnych w trybie nocnym. Emituje światło od dołu elementu budując głębię przez promieniowanie zamiast cieniowania.

**`InteractionStateManager`**
Singleton / hook wykrywający typ wskaźnika (`touch` / `mouse` / `keyboard`) przez `pointerdown` i `keydown`. Nakłada klasy `intent-touch`, `intent-mouse`, `intent-keyboard` na `document.body`. Separacja behawioralna przez `@media (hover: hover)`. Eliminuje „Lepki Hover" na mobile.

**`AmbientLightSensorProvider`**
Provider odczytujący `AmbientLightSensor API` (wartości luksów). Zasila `Bio-Sync Ambient Loop` — kwantyzowany strumień danych stabilizowany matematycznie (ochrona przed migotaniem). Dystrybuuje wartości przez React Context.

**`DeviceOrientationProvider`**
Provider odczytujący `DeviceOrientation API` (macierze obrotu żyroskopu). Zasila pozycjonowanie wirtualnego źródła światła w przestrzeni NDC. Rekalibracja w czasie rzeczywistym.

---

## ⚡ KINEMATYKA SYSTEMU

**`KineticSignatureTokens`**
CSS Custom Properties z trzema sygnaturami krzywych Béziera DNA systemu: `--ease-liquid-snap: cubic-bezier(0.17, 0.67, 0.14, 1.03)` (sprężyste uderzenie cieczy), `--ease-magnetic-pull: cubic-bezier(0.4, 0.0, 0.1, 1.0)` (magnetyczne zassanie), `--ease-crystalline-decay: cubic-bezier(0.9, 0.03, 0.69, 0.22)` (destrukcja popovera z cyfrowym pyłem).

**`SpringPhysicsHover`**
Hook / wrapper implementujący grawitację kinetyczną hover — krawędzie komponentu naciągają się sprężyście w kierunku ruchu kursora przez `spring-physics`. Stosuje `--ease-magnetic-pull`. Wyłącznie dla `intent-mouse`.

**`DepressState`**
Komponent / klasa CSS dla fizyki kompresji na mobile. Przy tapnięciu: `scale(0.98)`, cień wklęsły (`inset`), Ripple Glow, wibracja `Vibration API`. Aktywowany przez `is-physically-pressed` przez JS (próg 60ms filtrujący rozedrganie kciuka).

**`ShockwaveEmitter`**
Komponent generujący przestrzenną falę uderzeniową przy `pointerup`. Energia kliknięcia staje się chwilowym dynamicznym promieniem światła przeliczającym cienie sąsiednich elementów osi Z. Kolor komplementarny do temperatury barwowej otoczenia (dane z `AmbientLightSensorProvider`).

---

## 💳 WARIANT 1 — Creator Identity Card

**`CreatorIdentityCard`**
Karta profilu twórcy Retro-Modern Bento. Tło `#003737`, `rounded-2xl`, `isolate`, `transform-gpu`. Proceduralna mikrosiatka 1px w tle (`linear-gradient` z kryciem 15%, `mix-blend-overlay`). Hover: `-translate-y-1` przez 400ms `ease-liquid`. Cień wyłącznie na zewnętrznym warstwie `HardwareAcceleratedShadowLayer`.

**`PixelArtAvatar`**
Awatar w stylu Pixel Art Y2K dla `CreatorIdentityCard`. Kontener `#001F1F`, border `#007373`, `shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]`. Obraz z `rendering-pixelated` dla zachowania estetyki retro-futuryzmu Web3.

**`NodeSyncIndicator`**
Wskaźnik stanu połączenia węzła Web3 w `CreatorIdentityCard`. Pulsujący okrąg 8px z `animate-pulse`, tekst `NODE SYNCED` w IBM Plex Sans, tracking-widest, uppercase.

---

## 📊 WARIANT 2 — Financial Analytics Card

**`FinancialAnalyticsCard`**
Karta analityki USDC. Tło `#002121`, border `#004545`, podwójny cień wewnętrzny (inset highlight 1px + zewnętrzny shadow). Czysta przestrzeń negatywna — zero `box-shadow` wewnątrz karty.

**`HolographicAmountDisplay`**
Wyświetlacz kwoty z holograficznym, wielowarstwowym podświetleniem tekstu: `text-shadow: -1px 1px 0 #001111, 1px 1px 0 #001111, 0px 0px 10px rgba(255,215,0,0.5)`. IBM Plex Mono, `font-feature-settings: "tnum"`, `text-4xl`, `tracking-tight`. Chroni przed halacją bez rastrowych efektów.

**`GrowthBadge`**
Pigułka statusu wzrostu (`+12.4% (30d)`). Tło `#003737`, border `#005959`, inset shadow `rgba(255,255,255,0.1)`. Token koloru `--teal-300` jako wektor optyczny wzrostu.

---

## 🖼️ WARIANT 3 — NFT Artifact Frame Card

**`NFTArtifactCard`**
Karta galerii cyfrowej, format 1:1 (`aspect-square`). Tło `#003737`, border `#005959`. Hover: `-translate-y-1`, `shadow-[0_15px_30px_rgba(0,31,31,0.7)]`, `transform-gpu`.

**`ArtworkBlendLayer`**
Obraz NFT z `mix-blend-luminosity opacity-85`, przejście do `opacity-100` na hover. Gradient `from-[#003737] via-transparent` wtapiający obraz w bazowy teal bez twardych granic.

**`RarityBadge`**
Pigułka rzadkości NFT. Tło `purple-300`, `shadow-[0_0_12px_rgba(77,25,77,0.8)]` (Emissive Neon Glow). Tekst `LEGENDARY` / `RARE` / `COMMON`. Jedyny dozwolony odstęp kolorystyczny od `--gold-400` w tym wariancie.

---

## 🌐 WARIANT 4 — Web3 Node Topology Card

**`Web3NodeCard`**
Karta holograficzna topologii sieci. Tło `#001717`, `shadow-[inset_0_0_50px_rgba(77,25,77,0.15)]`. Proceduralny SVG izometryczny bezszwowy pattern inline (romboidalne ściany w `#4D194D`, `stroke-width: 1`), `mix-blend-screen`, animacja `group-hover:scale-105` przez 3s.

**`PulsingNodeCore`**
Pulsujące jądro węzła Web3. Zewnętrzny okrąg 64px z `shadow-[0_0_20px_rgba(77,25,77,0.6),inset_0_0_15px_rgba(77,25,77,0.6)]`. Wewnętrzny okrąg 20px `animate-[pulse_1.5s_ease-in-out_infinite]`. Tekst metryki: latency i liczba peerów.

---

## 📝 WARIANT 5 — Liquid Fluid Form Card

**`LiquidFluidFormCard`**
Karta autoryzacji smart kontraktu z formularza jako „oddychająca studnia". Tło `#002121`, border `#003737`.

**`LiquidInputField`**
Pole wejściowe z fizyką wklęśnięcia: `shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(0,115,115,0.3)]`. Focus: border `gold-400`, `shadow-[0_0_0_1px_rgba(255,215,0,0.4),0_0_20px_rgba(255,215,0,0.15)]` (Rezonans Jądrowy). Tło `#001717`. Floating Label nad polem z `bg-[#002121]` chroniącym przed prześwitem tła.

**`SignTransactionButton`**
Przycisk akcji smart kontraktu. Tło `#004545`, border `#007373`, hover `#005959` z neonową poświatą. Animacja przez `--ease-liquid-snap`. `active:scale-[0.98]`.

---

## 🍞 WARIANT 6 — Z-Axis Toast Card

**`ZAxisToastCard`**
Toast powiadomień blockchain. Tło `#003737`, border `#007373/50`, `shadow-[0_25px_40px_-10px_rgba(0,31,31,0.9)]`, inset highlight 1px. `transform-gpu`, animacja wejścia `cubic-bezier(0.175,0.885,0.32,1.275)` przez 400ms.

**`EmissiveSuccessIcon`**
Ikona sukcesu bez „wulgarnych zieleni Web2". Okrąg `#005959`, border `gold` lub `teal`, `shadow-[0_0_15px_rgba(63,181,181,0.5)]`. SVG checkmark w `#E0F2F2`. Sygnał sukcesu przez emisję teal zamiast agresywnej zieleni.

---

## ⭐ WARIANT 7 — Premium Subscription Card

**`PremiumSubscriptionCard`**
Karta tier Pro z kinetyczną krawędzią fotonową. Zewnętrzny wrapper `p-[2px]`, `isolate`, `overflow-hidden`. Hover: `scale-[1.02]`, 400ms `ease-magnetic`. `shadow-[inset_0_20px_50px_-20px_rgba(255,215,0,0.15)]` w mrocznej grawitacji dna.

**`PhotonBorderAnimation`**
Animowana świecąca krawędź — `conic-gradient` obracający się (`animate-[spin_4s_linear_infinite]`) pod podwójną maską karty. Efekt kinetycznej krawędzi fotonowej. `z-index: -10`, izolowany od contentu.

**`UpgradeSystemButton`**
CTA przycisku upgradu. Tło `gold-400`, `text-[#001F1F]`, `shadow-[0_6px_20px_rgba(255,215,0,0.3)]`, hover `shadow-[0_10px_30px_rgba(255,215,0,0.5)]`. Monopol `--gold-400` jako nadrzędny sygnał akcji.

---

## ❄️ WARIANT 8 — Frozen Glass Error State Card

**`FrozenGlassErrorCard`**
Karta stanu błędu / niedostępności. Tło `#001111`, `shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]`. Proceduralna tekstura szronu przez SVG inline z `feTurbulence` (`fractalNoise`, `baseFrequency: 0.8`, `numOctaves: 4`), `mix-blend-overlay opacity-20`.

**`FrostErrorIcon`**
Ikona błędu bez nasyconych czerwieni. Token `--error-light: #FFB4AB` jako subtelne widmo. Okrąg z `border-/30`, `bg-/5`, `shadow-[0_0_20px_rgba(255,180,171,0.15)]`, `backdrop-blur-sm`. SVG ostrzeżenia `stroke-width: 1.5`.

**`CrystallineDecayText`**
Tekst błędu z animacją `--ease-crystalline-decay` przy wejściu. Nagłówek Mukta Malar z `drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`. Opis `text-/50` — celowe wygaszenie perceptualne.

---

## 🔁 WARIANT 9 — Mass Transfer Toggle Card

**`MassTransferToggleCard`**
Karta ustawień wiersza Bento Slice. Tło `#002121`, border `#003737`, hover `border-[#004545]`. Layout `flex items-center justify-between`.

**`ThermalMassToggle`**
Przełącznik dwustanowy „Transfer Masy Termicznej". Kontener: `bg-[#001111]`, `shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]`. Kulka: `bg-purple-300`, `transform translate-x-7` w stanie ON, animacja 400ms `ease-liquid`. Focus ring `purple-300` z `ring-offset-[#002121]`. Wyzwala `Vibration API` przy przełączeniu.

---

## 🛸 WARIANT 10 — Avionics HUD Card

**`AvionicsHUDCard`**
Karta taktyczna Sci-Fi z ciętymi narożnikami. Zewnętrzny wrapper `p-[1px]`, `filter drop-shadow-[0_15px_25px_rgba(0,31,31,0.9)]`. Wewnętrzny kontener `clip-path: polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)`. Fasetowany obrys wewnętrzny 1.5px `#005959/50` z identycznym `clip-path`.

**`HUDCornerReticle`**
Celowniki narożne 8×8px — lewy górny: `border-t border-l`, prawy dolny: `border-b border-r`, kolor `teal-500`. Submilimetrowa mikro-geometria celownicza bez rastrowych pikseli.

**`HUDExecuteButton`**
Przycisk HUD wyrzeźbiony optyką emisyjną. `bg-transparent`, border `gold-400/80`, tracking `0.15em` uppercase. `shadow-[inset_0_0_12px_rgba(255,215,0,0.1),0_0_12px_rgba(255,215,0,0.1)]`, hover wzmocnienie poświaty. `backdrop-blur-sm`. Brak klasycznych cieni — fasetowanie 1px zastępuje głębię.

---

## 🎛️ MIKROINTERAKCJE GLOBALNE

**`NuclearResonanceFocus`**
Efekt Focus Ring jako „Rezonans Jądrowy" — z centrum obiektu wypływa puls `--purple-300`, modyfikujący środowisko elektromagnetyczne. Opcjonalne Dimming Środowiskowe (delikatne przyciemnienie tła pulpitu). Zastępuje twarde `outline`.

**`LiquidGlassPopover`**
Popover z „Termodynamiką Zablokowanych Mas" — poruszany element rozmywa obraz z tyłu z mikrosekundowym poślizgiem (lepkość optyczna). Animacja przez WebGL / `backdrop-filter` z opóźnieniem naśladującym fizyczny opór masy.

**`GooeyTooltipMorph`**
Tooltip z biologiczną morfogenezą SVG `feColorMatrix` Gooey Effect. Pączkuje z ciała przycisku-rodzica przy focus/click. Wchłania się z powrotem po utracie fokusu przez `--ease-crystalline-decay`.

**`CheckboxCraterEffect`**
Checkbox jako wyżłobiony krater. Przy zaznaczeniu cząsteczka `--purple-300` wtłaczana jest w zagłębienie formując elastyczną soczewkę. Haptyczne „kliknięcie" symulujące mechanizm luksusowego zegarka przez `Vibration API`.

**`NestedFrozenGlassMask`**
Maska stanu zablokowanego dla elementów niedostępnych. Nakłada fraktalową sieć `feTurbulence` w odcieniach `--teal-25` i `--teal-50`. Hover kursora roztapia szron lokalnie (energia termiczna) odsłaniając uwięzione elementy — animacja `clip-path` rozszerzająca się od pozycji kursora.

# MASTER COMPONENT REGISTRY — TipJar+ Platform
## Kompletna lista komponentów z wszystkich dokumentów

# 🏗️ I. FUNDAMENTY GLOBALNE

## Design System & Tokeny

**`GlobalTokenProvider`**
CSS Custom Properties całej aplikacji: paleta Deep Teal (`--teal-900` → `--teal-25`), akcenty (`--gold-400`, `--purple-300`), tokeny czasu animacji, krzywe sprężystości.

**`KineticSignatureTokens`**
Trzy sygnatury krzywych Béziera DNA systemu: `--ease-liquid-snap` (0.17, 0.67, 0.14, 1.03), `--ease-magnetic-pull` (0.4, 0.0, 0.1, 1.0), `--ease-crystalline-decay` (0.9, 0.03, 0.69, 0.22).

**`FluidTypographyScale`**
Globalna skala `clamp()` eliminująca media queries: `--fs-display`, `--fs-h2`, `--fs-h3`, `--fs-body`, `--fs-caption`. Dostosowuje rozmiary do „Strefy Kciuka" na mobile.

**`ZAxisRegistry`**
Globalny store Zustand zarządzający rejestrem warstw Z-Axis całej aplikacji. Zapobiega konfliktom z-index między modalami (`z:400`), tooltipami (`z:500`), toastami (`z:300`) i GenUI kartami.

**`ShadowMaestroProvider`**
Provider globalnego silnika cieni. Dystrybuuje Chameleon Shadows (cienie absorbujące kolor podłoża `--teal-*` przyciemniony 30–40%) do wszystkich zarejestrowanych komponentów. Zastępuje `rgba(0,0,0,0.5)`.

---

## Architektura Wrapperów

**`SVGMasterDefs`**
Niewidoczny węzeł `<svg>` na szczycie dokumentu. Definiuje: `clipPath` arc-left/right-edge, wzorzec siatki `frozen-network-grid`, gradient iluzji `illusion-grad`.

**`DoubleWrapperCapsule`**
Reużywalny wrapper dla kart z `clip-path`. Zewnętrzny kontener → wyłącznie `filter: drop-shadow`. Wewnętrzny → maska `clip-path` i tło. Rozwiązuje „Przeciekanie Radiusa".

**`PrismaticBorder`**
Pryzmatyczny obrys przez pseudoelement z gradientem `teal-700 + gold-400 + purple-300` i `mask-composite: exclude`. Reużywalny wrapper dla modali i kart premium.

**`HardwareAcceleratedShadowLayer`**
`div` z docelowym cieniem — `opacity: 0` domyślnie, `opacity: 1` przy hover. Animowana wyłącznie przezroczystość przez GPU. Zdejmuje ~92% obciążenia CPU przy hover.

**`LiquidGlassBackdrop`**
Kurtyna tła dla modali: `backdrop-blur-2xl`, `backdrop-saturate-200`, SVG `feDisplacementMap` dla refrakcji.

---

## Silniki Środowiskowe

**`InteractionStateManager`**
Singleton wykrywający typ wskaźnika (`touch`/`mouse`/`keyboard`). Nakłada klasy `intent-*` na `document.body`. Eliminuje „Lepki Hover" na mobile. Separacja przez `@media (hover: hover)`.

**`AmbientLightSensorProvider`**
Provider odczytujący `AmbientLightSensor API`. Zasila Bio-Sync Ambient Loop — kwantyzowany strumień luksów. Dystrybuuje przez React Context.

**`DeviceOrientationProvider`**
Provider żyroskopu (`DeviceOrientation API`). Zasila pozycjonowanie wirtualnego źródła światła w przestrzeni NDC. Rekalibracja w czasie rzeczywistym.

**`NocturnalOpulenceWrapper`**
HOC przełączający globalne tokeny między trybem dziennym (podwyższone kontrasty) a nocnym (Emissive Neon Glow na obwodach). Konsument `AmbientLightSensorProvider`.

**`LuminanceStepUpProvider`**
Provider Kaskadowego Stopniowania Luminancji w dark mode. Wyższe warstwy osi Z stają się bazowo jaśniejsze zamiast rzucać czarne cienie. Dystrybuuje tokeny `z-elevation`.

---

# 🪟 II. MODALE

**`PaymentModal`**
Modal potwierdzenia transakcji USDC. Warstwa `z-index: 400`, animacja `@starting-style` (skala 0.95 → 1.0, 300–400ms, `--ease-liquid-snap`). Backdrop `blur-2xl + saturate-200`.

**`ConfirmationModal`**
Modal potwierdzenia akcji krytycznej (wypłata, zmiana portfela). Identyczna architektura z `PaymentModal`, inny content slot.

**`EducationModal`**
Modal informacyjno-edukacyjny (co to USDC, jak działają napiwki). Statyczny content, brak akcji finansowych.

**`InterceptingModalRoute`**
Wzorzec Intercepting Routes Next.js dla konfiguracji napiwków — otwiera podstronę jako modal nad widokiem bez utraty kontekstu. Implementacja `(.)tip-config`.

---

# 🔔 III. SYSTEM POWIADOMIEŃ SSE

## Połączenie i Dystrybucja

**`SSEConnectionProvider`**
React Context Provider zarządzający pojedynczym połączeniem SSE (`EventSource`). Implementuje Leader Election przez `BroadcastChannel API` — tylko zakładka-lider otwiera fizyczne połączenie HTTP/2.

**`BroadcastChannelBridge`**
Mostek dystrybucji zdarzeń SSE do pozostałych zakładek (follower tabs). Propagacja w skali setnych milisekundy. Zastępuje `SharedWorker` (brak wsparcia Android Chrome).

**`LeaderElectionManager`**
Hook zarządzający procesem elekcji lidera. Obsługuje awarię lidera (zamknięcie zakładki) i natychmiastową nową loterię.

**`SSEReconnectHandler`**
Obsługa auto-reconnect SSE po utracie łączności. Dołącza `Last-Event-ID` przy wznowieniu. Inicjuje odzysk z Redis Streams (`XRANGE`). Fallback do REST `/balance` gdy retencja Redis wygasła.

**`EgressRateLimiter`**
Middleware dławiący wyjście SSE przy Tip Storms (>20 zdarzeń/sek). Scala zdarzenia w jeden `EventBatch`. Chroni Main Thread przeglądarki.

## Maszyna Stanów FSM

**`WalletFSM`**
XState machine definiująca 5 stanów portfela. Guard conditions: okno 10 sekund dla Frenzy, `sender.tier === 'whale'`. Debouncing i throttling wbudowane.

**`EventDeduplicator`**
LRU Cache ostatnich N `eventId`. Blokuje duplikaty przed wejściem do FSM — głębokie dyskardowanie przy potwierdzeniu repliki.

**`SequenceNumberGuard`**
Hook weryfikujący monotoniczny `sequenceNumber`. Odrzuca chronologiczne przeżytki z rozsynchronizowania wątków przeglądarki.

**`EventBatchAccumulator`**
Scala zdarzenia Frenzy w jeden pakiet sumaryczny. Eliminuje efekt stroboskopowy licznika.

**`SSEPayloadSchema`**
TypeScript type / Zod schema minimalnego kontraktu SSE: `eventId`, `eventType`, `amountValue` (String), `walletBalanceAfter` (String), `emotionalTier` (STANDARD/FRENZY/WHALE), `isFirstInteraction`, `timestamp`.

## Ikona Portfela — Navbar

**`WalletNavIcon`**
Główna ikona portfela w Navbarze. Kontener FSM XState. Przełącza wygląd i ARIA na podstawie aktualnego stanu.

**`WalletBalanceDisplay`**
Wyświetlacz salda: `font-feature-settings: "tnum"`, wartości jako String. `aria-hidden="true"` podczas animacji rollowania.

**`WalletStateIdle`** / **`WalletStatePending`** / **`WalletStateActive`** / **`WalletStateFrenzy`** / **`WalletStateWhale`**
Pięć wariantów wizualnych ikony portfela: Idle (statyczny, `teal-900`) / Pending (`purple-300` puls, `aria-busy="true"`) / Active (`text-secondary`, `aria-live="polite"`) / Frenzy (licznik monet, ARIA zawieszone) / Whale (`gold-400` rozbłysk, `aria-live="assertive"`).

**`TabularStatDisplay`**
Wyświetlacz liczb finansowych z `font-feature-settings: "tnum"`. Eliminacja Financial Jitter. Reużywalny w całej aplikacji.

**`FirstInteractionCallout`**
Jednorazowy efekt „Pierwszy tip!" dla `isFirstInteraction === true`. Specjalny zestaw animacji. Odpala się tylko raz per zdarzenie.

**`EmotionalTierBadge`**
Wskaźnik poziomu nadawcy (STANDARD/WHALE/nowy). Logika kategoryzacji po stronie backendu — komponent tylko renderuje etykietę.

---

# 🍞 IV. TOAST NOTIFICATIONS

**`BlockchainToast`** / **`BlockchainToastItem`**
Toast z webhooka Circle. `cubic-bezier(0.175, 0.885, 0.32, 1.275)`, 400ms. Warianty: active / whale / pending / reversal.

**`ToastStack`** / **`ToastStackContainer`**
Kolejka toastów. Każdy nowy toast zrzuca poprzednie w głąb (`scale: 0.95, translateZ`). CSS custom props `--stack-index`, `--toast-depth`.

**`ToastCardDegraded`**
Wariant toastu dla elementów zepchnięcych w stos (indeks > 0). Usuwa `backdrop-filter` i `box-shadow` — ochrona GPU przed Overdraw.

**`ReversalToast`**
Toast dla `Reversed`/`MissingFunding`/`cpn.payment.failed`. `aria-live="assertive"`. Koral `#FFB4AB` zamiast czerwieni. Brak Focus Stealing.

**`EmissiveSuccessIcon`**
Ikona sukcesu bez „zieleni Web2". Okrąg `#005959` z `shadow-[0_0_15px_rgba(63,181,181,0.5)]`. Sygnał przez emisję teal.

---

# ♿ V. DOSTĘPNOŚĆ (ARIA)

**`A11yAnnouncerProvider`**
React Context Provider z globalną szyną ARIA. Jedyna stabilna instancja `aria-live="polite"` w korzeniu DOM. Wymuszenie mutacji węzła (reset → setTimeout 50ms → set) eliminujący Silent Failure.

**`ARIALiveRegionManager`**
Centralny manager regionów `aria-live`. Przełącza poziom asertywności (`polite`/`assertive`/wyłączony) na podstawie stanu FSM.

**`ScreenReaderBalanceAnnouncer`**
Ukryty element `sr-only` ogłaszający finalne saldo po zakończeniu serii Frenzy lub Whale. Oddzielony od wizualnego `WalletBalanceDisplay`.

---

# 💳 VI. SYSTEM KART (BENTO GRID)

## Bazowe

**`BaseCard`**
Bazowy wrapper karty: `role="article"`, `aria-labelledby`, `isolation: isolate`, tokeny tła, `border-radius`, padding. Wszystkie warianty rozszerzają ten komponent.

**`FrozenGlassCard`**
Karta Frozen Glass 3.0: `background: var(--teal-500)`, `backdrop-filter: blur(16px)`. Nakłada siatkę `frozen-network-grid`.

**`FrozenNetworkOverlay`**
Wewnętrzna siatka geometryczna 1px (krycie 3–5%): `position: absolute`, `inset: 0`, `pointer-events: none`.

## Karty Specjalizowane

**`PulseMomentumCard`**
Wizualizator napływu USDC. Tło `teal-800`, `clip-path: arc-right-edge`. Gradient 110° na pseudoelemencie — zero obciążenia CPU.

**`CreatorIdentityCard`**
Karta profilu Retro-Modern Bento. Proceduralna mikrosiatka 1px, hover `-translate-y-1`, `HardwareAcceleratedShadowLayer`.

**`FinancialAnalyticsCard`**
Karta analityki USDC. Tło `#002121`, holograficzne podświetlenie tekstu, zero `box-shadow` wewnątrz.

**`NFTArtifactCard`**
Karta galerii NFT 1:1. `mix-blend-luminosity`, gradient wtapiający obraz w teal, `RarityBadge` z Emissive Glow.

**`Web3NodeCard`**
Holograficzna karta topologii sieci. Inline SVG izometryczny bezszwowy pattern, `mix-blend-screen`, pulsujące jądro `purple-300`.

**`LiquidFluidFormCard`**
Karta autoryzacji smart kontraktu. Formularz jako „oddychająca studnia" — `LiquidInputField` + `SignTransactionButton`.

**`ZAxisToastCard`**
Karta powiadomienia transakcji. Tło `#003737`, inset highlight 1px, animacja `cubic-bezier(0.175,0.885,0.32,1.275)`.

**`PremiumSubscriptionCard`**
Karta tier Pro z kinetyczną krawędzią fotonową (`conic-gradient` obracający się). Monopol `--gold-400`.

**`FrozenGlassErrorCard`**
Karta błędu z proceduralną teksturą szronu (`feTurbulence`). Token `--error-light: #FFB4AB`. Zero nasyconych czerwieni.

**`MassTransferToggleCard`**
Karta ustawień Bento Slice z przełącznikiem termicznym.

**`AvionicsHUDCard`**
Karta taktyczna Sci-Fi z `clip-path: polygon` (cięte narożniki), `DoubleWrapperCapsule`, fasetowane obrysy 1.5px.

**`Web3EnigmaCard`**
Abstrakcja węzła Circle Arc. Ukrywa dane Web3 za `backdrop-filter: blur(24px)` i siatką. Optimalizacja mobilna `-webkit-transform: translate3d`.

**`SocialProofCard`**
Karta dowodu społecznego. Border-left `4px purple-300`, klaster awatarów z `mask: radial-gradient`.

**`MonetizationCard`**
Karta konwersji napiwku. `QuickAmountSelector` + `CheckoutCTA`. Wzorzec „Założenia Zamknięcia".

**`ConflictResolutionCard`**
Karta asystenta scalania konfliktów. Border `1px gold-400`, `box-shadow: 0 0 0 4px rgba(255,215,0,0.1)` — „Gold Standard".

**`ConfigDraftCard`**
Karta bufora roboczego konfiguracji. Pulsujący wskaźnik `gold-400`, integracja React Hook Form.

**`PeripheralDriftCard`**
Karta iluzji dryfu obwodowego (wzorzec Ouchi/PDI). SVG `shape-rendering: crispEdges`. Attractor uwagi.

---

# 📝 VII. FORMULARZE

**`LiquidInputField`**
Pole „oddychająca studnia": `shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]` w idle, Rezonans Jądrowy `gold-400` na focus. Stany: idle / focus / error.

**`FloatingLabel`**
Etykieta unosząca się przy focus: `ease-in-out`, 150ms, zmiana wagi i rozmiaru. Zintegrowana z `LiquidInputField`.

**`FrozenGlassErrorState`**
Wizualny błąd walidacji — proceduralny lód koralowy `#FFB4AB`. Zero agresywnych czerwieni.

**`WalletAddressInput`**
Wyspecjalizowane pole adresu portfela krypto. Rozszerzenie `LiquidInputField` z dedykowaną walidacją formatu.

**`PremiumButton`**
Przycisk z fizyką kompresji: `pointerdown/move/up/cancel`, próg 60ms. Klasa `is-physically-pressed` → `scale(0.95)`, `gold-500`. `touch-action: pan-y pinch-zoom`.

**`QuickAmountSelector`**
Siatka 3-kolumnowa kwot (5/10/25 USDC). Stan `active` → `purple-300`, `-translate-y-4px`. Duży target dotykowy.

**`CheckoutCTA`**
Główny przycisk napiwku. `gold-400`, `teal-900`. Pozycjonowany w „Strefie Kciuka" przez `clamp()`.

**`ThermalMassToggle`**
Przełącznik Transfer Masy Termicznej. Kulka `purple-300` animowana 400ms `ease-liquid`. Wyzwala `Vibration API`.

**`CheckboxCraterEffect`**
Checkbox jako wyżłobiony krater. Cząsteczka `purple-300` wtłaczana przy zaznaczeniu. Haptyczne kliknięcie.

**`GhostButton`**
Przycisk drugorzędny: `background: transparent`, `border: 1px solid teal-700`. Akcje destrukcyjne niskiego priorytetu.

---

# 🔧 VIII. MIKROINTERAKCJE

**`NuclearResonanceFocus`**
Focus Ring jako Rezonans Jądrowy — puls `purple-300` z centrum. Opcjonalne Dimming Środowiskowe. Zastępuje twarde `outline`.

**`SpringPhysicsHover`**
Hook grawitacji kinetycznej hover — krawędzie naciągają się w kierunku kursora. `--ease-magnetic-pull`. Wyłącznie `intent-mouse`.

**`DepressState`**
Fizyka kompresji na mobile: `scale(0.98)`, cień inset, Ripple Glow, `Vibration API`. Aktywowany przez próg 60ms.

**`ShockwaveEmitter`**
Fala uderzeniowa przy `pointerup`. Dynamic point light przeliczający cienie sąsiednich elementów osi Z. Kolor komplementarny do temperatury barwowej otoczenia.

**`LiquidGlassPopover`**
Popover z „Termodynamiką Zablokowanych Mas" — rozmycie z tyłu z mikrosekundowym poślizgiem optycznym.

**`GooeyTooltip`** / **`GooeyTooltipMorph`**
Tooltip z biologiczną morfogenezą SVG `feColorMatrix`. Pączkuje z ciała przycisku-rodzica, `z-index: 500`. Wchłania się przez `--ease-crystalline-decay`.

**`ContextPopover`**
Popover z animacją wysokości przez `calc-size()` i `interpolate-size: allow-keywords`. Obsługuje async content sloty.

**`NestedFrozenGlassMask`**
Maska stanu zablokowanego: fraktal `feTurbulence` w `teal-25/50`. Hover kursora roztapia szron lokalnie.

**`EmissiveGlowLayer`**
Neonowe poświaty na elementach interaktywnych nocą. Emituje światło od dołu.

**`PhotonBorderAnimation`**
Animowana krawędź fotonowa — `conic-gradient` spinning 4s linear. Izolowany od contentu przez `z-index: -10`.

---

# 💬 IX. TOOLTIPS, DROPDOWNY, NAWIGACJA

**`AnchoredDropdown`**
Menu rozwijane przez CSS Anchor Positioning API (`anchor-name`). Zero JS do pozycjonowania.

**`PillowMenuItem`**
Element menu z efektem „Tłoczenia Poduszkowego" — podwójny inset shadow. Symulacja wgniatania elastomeru.

**`DeepNavigation`**
Nawigacja głęboka wielopoziomowa. Buduje na `AnchoredDropdown`.

---

# 👥 X. FAN WALL

**`FanWall`**
Kontener siatki awatarów w układzie Bento Grid. Zarządza Z-Axis: zwykli fani Z-1, top 3 → „Anomalia Przestrzenna".

**`FanAvatarCard`**
Karta awatara fana. Stany: `standard` (Z-1) i `top` (Emissive Neon Glow gold/silver/bronze OKLCH).

**`AvatarCluster`**
Kontener nakładających się awatarów z offsetem `-12px`. Zarządza `z-index` kolejności.

**`AvatarBadge`**
Awatar z `mask: radial-gradient(circle at 100% 50%, transparent 18%, black 19%)`. Gradient inicjałów `gold-400 → purple-300` z rotacją `--rot`.

**`FanStatsModal`**
Modal statystyk fana: łączna kwota wsparcia, liczba napiwków. `font-feature-settings: "tnum"`, `text-box: trim-both cap alphabetic`.

---

# 📊 XI. WYKRESY I DANE

**`SparklineChart`**
Mini wykres SVG z `vector-effect="non-scaling-stroke"`. Stroke `gold-400`. `preserveAspectRatio="none"`.

**`FinancialAmountDisplay`** / **`HolographicAmountDisplay`**
Wyświetlacz kwoty USDC: `font-feature-settings: "tnum"`, `--fs-display`, `gold-400`. Wariant holograficzny z `text-shadow` wielowarstwowym.

**`GrowthBadge`**
Pigułka statusu wzrostu. Tło `#003737`, border `#005959`, inset shadow `rgba(255,255,255,0.1)`.

**`EarningsTrendChart`**
Wykres historyczny przychodów. Renderowanie hybrydowe — agregacja po stronie serwera, Streaming SSR.

**`TabularStatDisplay`**
Wyświetlacz liczb finansowych z tabular numerals. Eliminacja Financial Jitter. Reużywalny w całej aplikacji.

---

# 🔐 XII. ZABEZPIECZENIA I AUTOSAVE

**`RouterBlockerGuard`**
Hook obsługujący miękkie wyloty routera (`useBlocker`) przy `isDirty === true`.

**`HardExitGuard`**
Hook nasłuchujący `window.beforeunload` gdy `isDirty`. Systemowe okno potwierdzenia przy zamknięciu.

**`DeltaAutosaveManager`**
Hook ekstrahujący `formState.dirtyFields` do `sessionStorage` z `timestamp` + `ttl: 86400000`. Partycjonowanie per zakładka.

**`FocusRingWrapper`**
Wrapper `div` z `focus-within` → `outline: 2px solid purple-300`. Semantyczna ochrona klawiatury.

**`StateMergeAction`**
Logika „Merge State" — LWW (Last-Write-Wins) przez `form.reset(delta)`. Wstrzykuje deltę z `sessionStorage`.

**`EdgeAuthMiddleware`**
Middleware brzegowe (`middleware.ts`) walidujące uprawnienia przed udostępnieniem tras Wallet i Studio. Edge Runtime.

---

# 🏢 XIII. ARCHITEKTURA NEXT.JS

## Layout i Routing

**`RouteGroupShell`**
Nadrzędny `layout.tsx` grupy `(creator)`. Zawiera `GlobalNav`, `SSEConnectionProvider`, `A11yAnnouncerProvider`.

**`GlobalNav`**
Główna nawigacja: Desktop / Studio / Community / Analytics / Wallet. Zawiera `WalletNavIcon`.

**`StudioSubNav`**
Nawigacja podrzędna Studio: Page / Monetization / Share & Promote / Live / Automations.

**`ParallelRouteSlot`**
Named Slots (`@metrics`, `@activity`, `@actions`) dla Parallel Routes. Niezależny streaming sekcji.

**`LiveStudioLayout`**
Layout bez nawigacji (`shell`-free) dla overlay OBS. Transparent Browser Source.

**`FeatureBoundary`**
Wrapper `error.tsx` + `loading.tsx` na każdym poziomie modułu. Izoluje awarię jednego modułu.

**`BarrelExport`**
Plik `index.ts` każdej domeny (`src/features/[domain]/index.ts`). Eksportuje tylko publiczne API domeny.

---

## Desktop

**`DesktopLayout`** / **`KPICardGrid`** / **`KPICard`**
Layout centrum dowodzenia, siatka kart KPI (RSC), pojedyncza karta metryki (RSC).

**`ActivityFeed`** / **`ActivityFeedItem`** / **`ActivityFeedFilter`**
Zunifikowany kanał aktywności SSE (Client Component), element osi czasu, system filtrów.

**`AIInsightsWidget`** / **`QuickActionsLauncher`** / **`ActiveGoalsPreview`** / **`FanwallPreview`**
Rekomendacje AI (async RSC), launcher skrótów, podgląd celów, miniatura Fan Wall.

---

## Studio / Page

**`PageStudioLayout`** / **`ProfileEditor`** / **`AppearanceCustomizer`** / **`BentoGridLayoutEditor`**
Layout, edycja profilu, customizacja wyglądu, edytor siatki Bento drag-and-drop.

**`ExternalLinksManager`** / **`BadgesManager`** / **`SEOMetaEditor`**
Linki zewnętrzne, odznaki cyfrowe, konfiguracja meta/OpenGraph dla `generateMetadata`.

---

## Studio / Monetization

**`MonetizationStudioLayout`** / **`TipModalConfigurator`** / **`GoalsConfigurator`**
Layout, konfiguracja modalu wpłat, konfiguracja celów finansowych.

**`MembershipTiersEditor`** / **`SupporterPerksEditor`** / **`ThankYouScreenEditor`** / **`GlobalMonetizationSettings`**
Edytor tierów, edytor perków, ekran po transakcji, ustawienia globalne.

---

## Studio / Share & Promote

**`PromoteStudioLayout`** / **`QRCodeGenerator`** / **`SmartLinkManager`** / **`EmbedCodeGenerator`** / **`SocialCardCreator`**
Layout, generator QR, zarządzanie Smart Links, generator embedów, kreator kart social.

---

## Studio / Live

**`GoalOverlay`** / **`TopSupportersOverlay`** / **`AlertOverlay`** / **`FanTickerOverlay`** / **`SceneOverlay`** / **`SourceTokenManager`**
Nakładki OBS dla celów, topowych wspierających, alertów, tickera, scen przerw. Manager tokenów źródłowych.

---

## Studio / Automations

**`AutomationsStudioLayout`** / **`AutoThankYouConfigurator`** / **`AutoResponseConfigurator`** / **`SmartCampaignBuilder`** / **`EngagementInsightsDashboard`**
Layout, auto-podziękowania, auto-odpowiedzi, kampanie z segmentacją, panel zaangażowania.

---

## Community

**`CommunityLayout`** / **`CommunityFeed`** / **`SubscribersList`** / **`DonorsList`**
Layout, strumień treści, lista subskrybentów cyklicznych, lista jednorazowych darczyńców.

**`MembershipsAccessManager`** / **`EventsManager`** / **`CommunityInbox`** / **`EngagementTools`** / **`ModerationPanel`**
Zarządzanie dostępem per tier, events RSVP, skrzynka wiadomości, ankiety/wyzwania, moderacja.

---

## Analytics

**`AnalyticsLayout`** / **`EarningsTrendChart`** / **`ConversionRatePanel`** / **`AudienceBehaviorPanel`**
Layout, wykres przychodów (Streaming SSR), analiza konwersji QR/Smart Links, retencja i geolokalizacja.

**`ContentPerformancePanel`** / **`LiveStreamPerformancePanel`** / **`AIPredictionsPanel`** / **`ReportExporter`**
Efektywność treści, efektywność overlayów OBS, predykcje AI (async RSC), eksport CSV.

---

## Wallet

**`WalletLayout`** / **`FundsOverview`** / **`DepositGateway`** / **`WithdrawalManager`**
Layout (Edge Middleware), podział Available/Pending (RSC + Streaming SSR), depozyty fiat/krypto, wypłaty.

**`AutomaticPayoutsConfigurator`** / **`InvoiceList`** / **`WalletSecurityPanel`** / **`TransactionHistory`**
Harmonogramy wypłat, faktury subskrypcji, Security PCI-DSS (2FA, sesje, zamrożenie kart), historia transakcji.

---

# ⚙️ XIV. BACKEND NESTJS

**`CircleWebhookController`**
NestJS controller przyjmujący POST z Circle. Odpowiedź `HTTP 202` natychmiast. Weryfikacja ECDSA (P-256/SHA-256) przez `X-Circle-Signature` + `X-Circle-Key-Id`. Odrzuca `HTTP 401`.

**`WebhookIdempotencyGuard`**
Guard sprawdzający `notificationId` przed przetworzeniem. Blokada atomowa (`UNIQUE constraint` PostgreSQL lub DynamoDB `attribute_not_exists`). Odrzuca duplikaty.

**`WebhookEnrichmentService`**
Wzbogaca payload Circle o kontekst TipJar+: mapowanie portfela → profil, `emotionalTier`, `isFirstInteraction`, `walletBalanceAfter`. Zapis do PostgreSQL przed emisją do Redis.

**`RedisStreamsPublisher`**
Publikuje payload do `stream:creator:{id}` (komenda `XADD`). Wyłącznie po `commit` w bazie — eliminuje race condition publish-before-commit.

**`SSEGateway`**
NestJS gateway serwujący `text/event-stream`. Consumer Groups Redis (`XREADGROUP`). Obsługuje `XRANGE` przy reconnect z `Last-Event-ID`.

**`PayoutsService`**
Serwis wypłat. Logika fee split (2.5% platform fee) przez dwa sekwencyjne `transferToAddress` przy inicjacji — nie w webhook handlerach. Arytmetyka przez `Prisma.Decimal` z `ROUND_DOWN`.

---

# 📋 XV. KATALOG STRON

| Ścieżka | Komponent | Typ |
|---|---|---|
| `/` | Landing page | Static / ISR |
| `/(creator)/desktop` | `DesktopLayout` | RSC + Client |
| `/(creator)/studio/page` | `PageStudioLayout` | Client |
| `/(creator)/studio/monetization` | `MonetizationStudioLayout` | Client |
| `/(creator)/studio/promote` | `PromoteStudioLayout` | Client |
| `/(creator)/studio/live` | `LiveStudioLayout` (shell-free) | Client |
| `/(creator)/studio/automations` | `AutomationsStudioLayout` | Client |
| `/(creator)/community` | `CommunityLayout` | RSC + Client |
| `/(creator)/analytics` | `AnalyticsLayout` | RSC + Streaming |
| `/(creator)/wallet` | `WalletLayout` (Edge Auth) | RSC + Streaming |
| `/creator/[username]` | Publiczny profil twórcy | SSG + ISR |
| `/creator/[username]/tip` | Flow transakcji + `PaymentModal` | Client |
| `/overlay/goal` | `GoalOverlay` (transparent) | Client |
| `/overlay/alert` | `AlertOverlay` (transparent) | Client |
| `/overlay/ticker` | `FanTickerOverlay` (transparent) | Client |
| `/overlay/scene/[type]` | `SceneOverlay` (transparent) | Client |
| `/onboarding` | 5-krokowy onboarding | Client |
| `/settings` | Ustawienia konta | Client |

# ✅ REALNE — Używane produkcyjnie

**`font-feature-settings: "tnum"`**
Standardowa właściwość CSS. Działa we wszystkich przeglądarkach. Realnie stosowana w interfejsach finansowych.

**`backdrop-filter: blur()` + `backdrop-saturate`**
Działa w nowoczesnych przeglądarkach (z prefixem `-webkit-`). Używane produkcyjnie (np. macOS UI, iOS). Wydajność zależna od urządzenia — na słabym mobile może klatkować.

**`@starting-style` (Tailwind v4)**
[✓ Verified] Realny standard CSS. Obsługiwany w Chrome 117+, Safari 17.5+, Firefox 129+. Używany do animacji wejścia elementów bez JS.

**`text-box-trim` / `text-box`**
[✓ Verified] Realna właściwość CSS. Obsługiwana w Chrome 123+, Safari 17.4+. Nie Firefox (brak wsparcia na dziś).

**`calc-size()` + `interpolate-size`**
[✓ Verified] Realne — Chrome 129+. Rozwiązuje problem animacji `height: auto`. Firefox i Safari — brak wsparcia na dzień 01.07.2026.

**CSS Anchor Positioning API**
[✓ Verified] Realny standard. Chrome 125+, brak wsparcia Safari i Firefox na dzień 01.07.2026. Używalne z progressive enhancement.

**`BroadcastChannel API`**
[✓ Verified] W pełni realne. Wszystkie przeglądarki. Wzorzec Leader Election przez `BroadcastChannel` — stosowany produkcyjnie.

**Redis Streams (XADD, XREADGROUP, XACK, XRANGE)**
[✓ Verified] Realne i produkcyjnie używane. Poprawna architektura dla powiadomień finansowych.

**SSE (`EventSource`) + `Last-Event-ID`**
[✓ Verified] Realne, standardowe, produkcyjnie stosowane. Auto-reconnect z `Last-Event-ID` to natywne zachowanie przeglądarki.

**XState (FSM)**
[✓ Verified] Realna biblioteka, produkcyjnie używana. Debouncing i throttling w maszynie stanów — prawidłowe podejście.

**`clip-path` + Double Wrapper (shadow fix)**
[✓ Verified] Realna technika. Problem z `clip-path` obcinającym `box-shadow` jest rzeczywisty, Double Wrapper go rozwiązuje. Używane produkcyjnie.

**`will-change: opacity` + animacja przez opacity zamiast box-shadow**
[✓ Verified] Realna optymalizacja. Animowanie `opacity` zamiast `box-shadow` zdejmuje ciężar z CPU. Standardowa praktyka.

**`conic-gradient` (obracająca się krawędź)**
[✓ Verified] Realny CSS. Animowana krawędź przez `conic-gradient` + `animation: spin` — stosowana w UI premium.

**SVG `feTurbulence` / `feDisplacementMap` / `feColorMatrix` (Gooey Effect)**
[✓ Verified] Realny SVG filter API. Gooey Effect z `feColorMatrix` to znana, produkcyjna technika.

**`Vibration API`**
[✓ Verified] Realne API przeglądarki. Działa na Android Chrome. iOS Safari — brak wsparcia.

**`AmbientLightSensor API`**
[Unverified] Istnieje w specyfikacji W3C Generic Sensor API. Wsparcie bardzo ograniczone — Chrome Android z flagą, brak Safari i Firefox. Produkcyjnie praktycznie niestosowane na dziś.

**`OKLCH` color space**
[✓ Verified] Realny standard CSS Color Level 4. Obsługiwany we wszystkich nowoczesnych przeglądarkach. Tailwind v4 używa go natywnie.

---

# ⚠️ CZĘŚCIOWO REALNE — Technicznie możliwe, ale z zastrzeżeniami

**CSS Houdini Paint API (Paint Worklets)**
[✓ Verified częściowo] Realne w Chrome/Edge. Safari i Firefox — brak lub bardzo ograniczone wsparcie na 01.07.2026. Nie nadaje się jako główna technika bez fallbacku.

**`DeviceOrientation API` do pozycjonowania światła**
[✓ Verified — API istnieje] Ale użycie go do pozycjonowania wirtualnego źródła światła w UI to [Inference] — podejście eksperymentalne, nie produkcyjne. Wymaga HTTPS i uprawnień.

**`shape-rendering: crispEdges` na SVG**
[✓ Verified] Realna właściwość SVG. Działa.

**Wzorzec Claim-Check (S3 + wskaźnik do kolejki)**
[✓ Verified] Realna technika enterprise. Stosowana przy dużych payloadach w systemach kolejkowych.

**Idempotencja przez `attribute_not_exists` w DynamoDB**
[✓ Verified] Realna i poprawna technika atomowej blokady deduplikacji.

---

# ❌ BUJDY — Nierealne lub pseudonaukowe

**WebGPU / WGSL do renderowania UI (cienie, SDF w czasie rzeczywistym)**
[Unverified jako produkcyjne rozwiązanie UI] WebGPU istnieje i jest realnym API (Chrome 113+). Ale używanie go do renderowania cieni komponentów UI zamiast CSS to [Speculation] — żaden znany produkcyjny system UI tego nie robi. Narzut architektoniczny jest nieproporcjonalny do korzyści.

**„Shadow Maestro" ray-casting w czasie rzeczywistym**
[Speculation] Nie istnieje jako biblioteka ani standard. Termin wymyślony przez autora dokumentów.

**`Signed Distance Fields (SDF)` do generowania cieni CSS**
[Inference] SDF to realna technika (używana w silnikach gier, renderowaniu fontów). Zastosowanie jej do cieni komponentów webowych przez WebGPU w czasie rzeczywistym — [Speculation] — brak produkcyjnych przykładów.

**BCI (Brain-Computer Interface) do autoryzacji płatności**
[Speculation] Absolutna bujda w kontekście aplikacji webowej 2026. Neuralink i Synchron istnieją jako urządzenia medyczne — nie jako API przeglądarki.

**Spiking Neural Networks (SNN) do nawigacji UI**
[Speculation] Nie istnieje żadne API przeglądarki ani biblioteka JS realizująca SNN w kontekście UI.

**„Neuro-Adaptive UI" modulujące OKLCH na podstawie stresu EEG**
[Speculation] Brak jakiegokolwiek standardu, API ani produkcyjnej implementacji.

**`AmbientLightSensor` + komplementarny kolor fali uderzeniowej**
[Speculation] Połączenie `AmbientLightSensor` → temperatura barwowa → kolor fali uderzeniowej — koncepcja opisana bez żadnego mechanizmu realizacji przez przeglądarkę.

**„GenUI" — LLM generujący komponenty React w czasie rzeczywistym dziedziczące tokeny Z-Axis**
[Inference] Generative UI (np. Vercel AI SDK `streamUI`) to realna koncepcja. Ale automatyczne dziedziczenie tokenów Z-Axis i „wstrzyknięcie przez `@starting-style`" opisane w dokumencie — [Speculation] — brak produkcyjnej implementacji.

**„Hapto-Optyczny Rezonans Emisyjny"**
[Speculation] Termin wymyślony przez autora. Nie istnieje żadna technologia ani standard o tej nazwie.

**„Sentient Neuro-Spatial Mesh"**
[Speculation] Marketing. Nie istnieje.

**„Achromatyczne Kłamstwo" jako termin inżynieryjny**
[Speculation] Termin wymyślony przez autora. Nie istnieje w inżynierii ani kognitywistyce.

**Efekty neurokognitywne (odruch Duchenne'a, dIPFC, HRV, NASA-TLX) powiązane z CSS**
[Speculation] Dokumenty cytują prawdziwe terminy naukowe w fałszywym kontekście. Brak jakichkolwiek badań łączących konkretne wartości `cubic-bezier` z aktywnością dIPFC czy HRV.

**„Pryzmatyczne rozszczepienie fotonów" przez CSS**
[Speculation] CSS gradient nie rozszczepia fotonów. Termin pseudonaukowy.

**„Płyn nieniutonowski" jako metafora SVG `feDisplacementMap`**
[Inference] `feDisplacementMap` jest realny. Nazywanie go „płynem nieniutonowskim" to metafora marketingowa — nie opis techniczny.

---

# 📊 PODSUMOWANIE

| Kategoria | Liczba koncepcji |
|---|---|
| ✅ W pełni realne i produkcyjne | ~20 |
| ⚠️ Częściowo realne / z zastrzeżeniami | ~6 |
| ❌ Bujdy / pseudonauka / marketing | ~12 |

Dokumenty mają solidne jądro rzeczywistych technik CSS/Web API obudowane warstwą pseudonaukowego marketingu i kilkoma koncepcjami sci-fi bez żadnej ścieżki do implementacji.