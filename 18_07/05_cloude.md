# 📦 KOMPONENTY — MIKROINTERAKCJE & ANIMACJE TipJar+

---

## 🔵 PRZYCISKI I ELEMENTY INTERAKTYWNE (`/components/ui/`)

| Komponent | Opis |
|---|---|
| `PrimaryButton` | Złoty CTA z hover absorpcją światła (#FFD700→#FFE44D), `Liquid Snap` scale(0.98) on active, spinner loading state, opacity disabled |
| `OutlineButton` | Konturowy wariant z półprzezroczystym fill on hover, identyczna kinetyka active |
| `IconButton` | Mały przycisk ikonowy z hover scale(1.05) + bump scale(0.9→1) on click |
| `LoadingButton` | Wrapper dla stanu async — podmienia treść na spinner 20px, `pointer-events: none`, opacity 0.7 |
| `DisabledButton` | Stan zablokowania z proceduralną siatką mikropęknięć SVG `feTurbulence` + `feDisplacementMap` (Krio-Zablokowanie) |
| `FocusRingWrapper` | Pryzmatyczny obrys fioletowy #9D4EDD via `:focus-visible`, `outline-offset: 2px` — wrapper na każdy interaktywny element |
| `TextLink` | Link tekstowy z animowanym underline transition on hover |

---

## 🃏 KARTY (`/components/cards/`)

| Komponent | Opis |
|---|---|
| `CreatorCard` | Karta twórcy z hover `translateY(-4px)`, rozproszonym cieniem `0 16px 48px`, podświetleniem gradientem fioletowo-złotym, click `translateY(2px)` + Ripple |
| `RippleCard` | Wrapper dodający Ripple Effect (pseudo-element `::after`, `animation: ripple 0.4s`) w punkcie kliknięcia — reużywalny |
| `SkeletonCard` | Szkielet karty z Shimmer Effect — przesuwający się `linear-gradient` symulujący ładowanie |

---

## 📋 LISTY I TABELE (`/components/lists/`)

| Komponent | Opis |
|---|---|
| `AnimatedList` | Lista z FLIP-animowanym dodawaniem/usuwaniem wierszy (scale-up fade-in nowy, scale-down fade-out usuwany, relokacja pozostałych) |
| `StaggeredGrid` | Siatka z kaskadowym wejściem elementów (opóźnienie 50–100ms per klocek) — Explore, FAQ, sekcje "Jak to działa" |
| `DragDropList` | Lista drag & drop z ghost elementem (opacity 0.8), podświetleniem drop zone, wizualną luką wyjściową |
| `InfiniteScrollList` | Nieskończona lista z fade-in + `translateY(20px→0)` per batch, Stagger Effect 50ms |
| `TransactionRow` | Wiersz transakcji wpadający od góry (scale 0.9→1 + fade-in) z animowaną relokacją pozostałych wierszy |

---

## 🪗 AKORDEONY I ROZWIJANE SEKCJE (`/components/ui/`)

| Komponent | Opis |
|---|---|
| `AnimatedAccordion` | Akordeon z `grid-template-rows: 0fr→1fr` (bez mutacji height), opóźniony fade-in treści wewnętrznej, obrót chevron 0→180° w 250ms |

---

## 🪟 MODALE I NAKŁADKI (`/components/modals/`)

| Komponent | Opis |
|---|---|
| `Modal` | Double Wrapper modal — wewnętrzna kapsuła (clip-path), zewnętrzna (holograficzny cień), scale 0.95→1 fade-in, backdrop-blur 250ms |
| `BottomSheet` | Mobile full-screen modal grawitacyjnie wjeżdżający od dołu `translateY(100%→0)`, zjazd przy zamknięciu |
| `MultiStepModal` | Modal wieloetapowy z lateralną animacją kroków (nowy krok z prawej, stary w lewo 200ms), cross-fade nagłówka |
| `ModalBackdrop` | Kurtyna tła — `opacity→0.6` + `backdrop-blur` 250ms `cubic-bezier(0.2, 0.9, 0.4, 1.1)` |

---

## 🔔 TOASTY I POWIADOMIENIA (`/components/feedback/`)

| Komponent | Opis |
|---|---|
| `Toast` | Powiadomienie wjeżdżające z prawej `translateX(120px→0)` z bounce `cubic-bezier(0.34, 1.56, 0.64, 1)`, TTL 4–8s, auto-dismiss fade-out |
| `ToastStack` | Zarządca stosu toastów — Z-Axis Stack Choreography, starsze toasty skalują się w głąb (scale -5%/poziom), stagger 100ms |
| `ErrorToast` | Toast z `role="alert"`, semantyką błędu ARIA |
| `SuccessToast` | Toast z `role="status"`, ikoną checkmark scale 0.8→1 fade-in |
| `PriorityMessageBus` | Globalny serwis/kontekst orkiestrujący kolejkę powiadomień z priorytetyzacją (bez kodu renderującego — pure logic) |

---

## ⚠️ FEEDBACK FORMULARZY (`/components/feedback/`)

| Komponent | Opis |
|---|---|
| `ShakeField` | Wrapper pola formularza z shake `translateX: 0→-5px→5px→0` (3 cykle / 300ms) przy błędzie walidacji |
| `ErrorMessage` | Komunikat błędu z fade-in, pulsującym border #EF4444→#FF6B6B |
| `InlineSuccessIndicator` | Checkmark potwierdzający lokalny zapis — scale 0.8→1 fade-in, auto-znika po 2s |

---

## ⛓️ KOMPONENTY WEB3 / TRANSAKCYJNE (`/components/web3/`)

| Komponent | Opis |
|---|---|
| `TransactionSpinner` | Animowany spinner tematyczny — ogniwa łańcucha lub sześcian 3D w Lottie/SVG, pulsujący fiolet na obramowaniu modala w stanie Pending |
| `ConfirmedPulse` | Efekt potwierdzenia transakcji — spinner→checkmark (zielony/złoty), Pulse Effect 2s, fala świetlna gasnąca od centrum |
| `TransactionModal` | Kompletny modal transakcyjny integrujący `TransactionSpinner` + `ConfirmedPulse` + stan błędu |
| `ParticleEffect` | Opcjonalne efekty cząsteczkowe przy napiwkach premium — CSS-based, `will-change: transform`, ograniczona liczba cząsteczek |

---

## 🦴 STANY ŁADOWANIA (`/components/states/`)

| Komponent | Opis |
|---|---|
| `SkeletonScreen` | Szkielet layoutu z Shimmer Effect (`background-size: 200%`, `animation: shimmer 1.5s infinite`) |
| `GlobalLoader` | Pełnoekranowy loader inicjalizacyjny — logo TipJar+ z pulsowaniem scale 1→1.1→1 (1s infinite), tekst "Ładowanie..." z animacją kropek |
| `EmptyState` | Stan pusty z ilustracją SVG floating (`translateY(0→-10px→0)` / 3s ease-in-out), asertywny tekst, złoty CTA |
| `ErrorState` | Stan błędu ładowania — ikona z shake, komunikat, przycisk "Spróbuj ponownie" z własnym loading state |

---

## 🎞️ PRZEJŚCIA WIDOKÓW (`/components/transitions/`)

| Komponent | Opis |
|---|---|
| `PageTransition` | Framer Motion `<AnimatePresence>` wrapper — horyzontalne slide przejścia między stronami Next.js (stary `translateX→-30%` fade-out, nowy z prawej `100%→0`, 250ms `cubic-bezier(0.2, 0.9, 0.4, 1.1)`) |
| `TabCrossFade` | Mikro-przejście zakładek/filtrów — cross-fade + `translateY(4px)` bez dużych translacji |
| `NavigationDirectionProvider` | Kontekst React wykrywający kierunek nawigacji (forward/back) i odwracający wektory przejść |

---

## 📜 SEKCJE SCROLL-TRIGGERED (`/components/scroll/`)

| Komponent | Opis |
|---|---|
| `RevealOnScroll` | Intersection Observer wrapper — fade-in up (`translateY(30px→0)`, `opacity 0→1`, 600ms ease-out, threshold 0.2) |
| `StaggerReveal` | Wrapper dla grup kart/sekcji z kaskadowanym opóźnieniem 100–150ms per dziecko |
| `ParallaxHero` | Hero section z paralaksą tła — `translateY(calc(var(--scroll-y) * 0.2))`, obligatoryjne `translate3d` dla GPU, wyłączenie przy `prefers-reduced-motion` |
| `LazyImage` | Obraz z Intersection Observer + fade-in 300ms po załadowaniu bajt-paczki |

---

## ♿ DOSTĘPNOŚĆ / GLOBALNE (`/components/a11y/` + `/providers/`)

| Komponent | Opis |
|---|---|
| `ReducedMotionProvider` | Kontekst React odczytujący `prefers-reduced-motion`, dystrybuujący flagę do całego drzewa komponentów |
| `AriaLiveRegion` | Ukryta instancja drzewa dostępności dla `document.ariaNotify()` / fallback — globalny, montowany raz w `_app.tsx` |

---

## 📄 KATALOG STRON (`/app/` lub `/pages/`)

| Strona | Kluczowe komponenty z dokumentu |
|---|---|
| `LandingPage` | `ParallaxHero`, `StaggerReveal`, `RevealOnScroll`, `LazyImage` |
| `ExplorePage` | `StaggeredGrid`, `CreatorCard`, `InfiniteScrollList`, `SkeletonScreen`, `EmptyState`, `ErrorState` |
| `CreatorDashboard` | `PageTransition`, `TabCrossFade`, `TransactionRow`, `AnimatedList`, `SkeletonScreen` |
| `CreatorProfile` | `CreatorCard`, `EmptyState`, `LazyImage` |
| `TransactionFlow` | `TransactionModal`, `TransactionSpinner`, `ConfirmedPulse`, `MultiStepModal`, `Toast` |
| `SettingsPage` | `AnimatedAccordion`, `ShakeField`, `InlineSuccessIndicator`, `DragDropList` |
| `KnowledgeCenter` | `RevealOnScroll`, `StaggerReveal`, `AnimatedAccordion` |

# 📦 KOMPONENTY — ASYNC WALIDACJA FORMULARZY TipJar+

---

## 🧱 CORE FORM INFRASTRUCTURE (`/components/forms/`)

| Komponent | Opis |
|---|---|
| `AsyncForm` | Główny wrapper formularza integrujący RHF `useForm`, przechwytujący `event.preventDefault()`, zarządzający cyklem idle→submitting→error/success |
| `FormErrorSummary` | Podsumowanie błędów na szczycie formularza — `tabindex="-1"`, lista `<ul>` z nagłówkiem H2/H3, linki `<a href="#field-id">` do błędnych pól, ukrywany przy kolejnej próbie submit |
| `FormField` | Wrapper pojedynczego pola — agreguje `<label>`, `<input>`, `<ErrorMessage>`, dynamicznie zarządza `aria-invalid` i `aria-describedby` |
| `FormFieldError` | Komunikat błędu inline przy polu — unikalny `id`, reużywany przez `aria-describedby` na kontrolce, fade-in przy wstrzyknięciu |
| `FormSubmitButton` | Przycisk submit z wbudowanym stanem loading (`aria-busy="true"`, `pointer-events: none`), blokcujący rage-clicking |

---

## 🔗 ARIA & FOCUS MANAGEMENT (`/components/forms/aria/`)

| Komponent | Opis |
|---|---|
| `FocusTrap` | Przenosi fokus programistycznie `.focus()` na `FormErrorSummary` po asynchronicznym odrzuceniu — wywoływany w `useEffect` po mutacji DOM |
| `AriaLiveRegion` | Globalny, pojedynczy kontener `aria-live="assertive"` (ukryty `sr-only`) — kanał do ogłoszenia "Formularz zawiera N błędów" bez kradzieży fokusu, montowany raz w `_app.tsx` |
| `AriaPoliteRegion` | Kontener `aria-live="polite"` do opóźnionych odpowiedzi serwera (np. dostępność loginu, siła hasła) — czeka na przerwę użytkownika przed odczytem |
| `AriaBusyWrapper` | Wrapper aplikujący `aria-busy="true"` na sekcję formularza podczas trwania zapytania HTTP — blokuje asystentom skanowanie niepełnej treści |
| `FieldAssociator` | HOC/hook generujący deterministyczne `id` dla pary `input↔error`, zapewniający że `aria-describedby` celuje w istniejący węzeł DOM przed wstrzyknięciem błędu |

---

## 📋 KONKRETNE POLA FORMULARZA (`/components/forms/fields/`)

| Komponent | Opis |
|---|---|
| `TextField` | Input tekstowy z pełną integracją ARIA (`aria-invalid`, `aria-describedby`, `aria-required`), obsługa RHF `register` |
| `PasswordField` | Pole hasła z inline walidacją siły (polite live region), toggle widoczności, `aria-describedby` do komunikatu wymagań |
| `EmailField` | Pole email z async walidacją dostępności adresu on-blur, polite announcement wyniku |
| `WalletAddressField` | Pole adresu portfela — `ShakeField` z dokumentu mikrointerakcji + `aria-invalid` + komunikat błędu z `#EF4444` border przy asynchronicznym odrzuceniu |
| `SelectField` | Select z pełnym `aria-invalid` i `aria-describedby`, obsługa klawiatury |
| `RadioGroup` | Grupa radio z aria-invalid na poziomie grupy (`role="group"` + `aria-describedby`) |

---

## 🔔 ERROR & STATUS COMMUNICATION (`/components/forms/feedback/`)

| Komponent | Opis |
|---|---|
| `ServerErrorBanner` | Baner globalnego błędu serwera (non-field error) — `errors.root.serverError` z RHF, `role="alert"`, montowany nad formularzem |
| `ValidationStatusMessage` | Komunikat statusu po submit — sukces (`role="status"`) lub błąd (`role="alert"`), zgodny z WCAG SC 4.1.3 |
| `FieldHelpText` | Statyczny tekst pomocniczy pod polem — powiązany `aria-describedby`, współistnieje z `FormFieldError` w tej samej referencji (lista ID) |
| `AsyncValidationIndicator` | Wskaźnik trwania walidacji on-blur (spinner inline przy polu) z `aria-busy="true"` — do pól z odpytywaniem serwera |

---

## ⚙️ STATE MANAGEMENT HOOKS (`/hooks/forms/`)

| Hook | Opis |
|---|---|
| `useAsyncForm` | Wrapper na `useForm` z RHF — integruje `setError` dla błędów serwerowych, `shouldFocusError: true`, mapowanie odpowiedzi HTTP na pola |
| `useServerErrors` | Hook mapujący obiekt błędów z API response na wywołania `setError(field, { type: 'server', message })` |
| `useFocusErrorSummary` | Hook wykonujący `summaryRef.current.focus()` po `useEffect` wykrywającym zmianę `formState.errors` — likwiduje uwięziony fokus |
| `useAriaAnnouncer` | Hook do wrzucania komunikatów do `AriaLiveRegion` / `AriaPoliteRegion` bez re-renderu drzewa |
| `useFieldId` | Generator deterministycznych `id` dla par `input/error` w obrębie formularza |

---

## 🔄 MULTI-STEP FORMS (`/components/forms/wizard/`)

| Komponent | Opis |
|---|---|
| `WizardForm` | Wieloetapowy kreator (np. onboarding twórcy) — zarządza krokami, waliduje każdy etap przed przejściem, utrzymuje historię błędów per-krok |
| `WizardStep` | Pojedynczy krok Wizarda — izolowana sekcja DOM, fokus przenoszony na nagłówek kroku przy nawigacji |
| `WizardProgress` | Wskaźnik postępu kroków — `aria-label` z aktualnym krokiem, `aria-current="step"` |
| `StepErrorSummary` | `FormErrorSummary` scoped do aktualnego kroku — resetowany przy przejściu do kolejnego |

---

## 🔐 TRANSAKCYJNE / WEB3 (`/components/forms/web3/`)

| Komponent | Opis |
|---|---|
| `PaymentForm` | Formularz płatności USDC — implementuje WCAG SC 3.3.4 (Error Prevention): ekran weryfikacji danych przed ostatecznym submit, możliwość cofnięcia |
| `TransactionVerificationStep` | Krok potwierdzenia transakcji — odczytuje dane użytkownikowi przed finalnym wywołaniem blockchain, `role="region"` z `aria-label` |
| `WithdrawalForm` | Formularz wypłaty z walidacją adresu portfela async + blokada podwójnego submit |

---

## 🏗️ PROVIDERS & INFRASTRUCTURE (`/providers/`)

| Provider | Opis |
|---|---|
| `FormAccessibilityProvider` | Kontekst React dystrybuujący `AriaLiveRegion` ref, `announcer` helper i konfigurację walidacji — montowany raz globalnie |
| `FormStateMachineProvider` | Opcjonalny XState FSM wrapper dla złożonych Wizardów — stany: `idle → validating_async → submitting → error / success`, eliminuje race conditions |

---

## 📄 STRONY UŻYWAJĄCE TYCH KOMPONENTÓW

| Strona | Kluczowe komponenty |
|---|---|
| `RegisterPage` | `AsyncForm`, `FormErrorSummary`, `TextField`, `EmailField`, `PasswordField`, `ServerErrorBanner` |
| `LoginPage` | `AsyncForm`, `FocusTrap`, `AriaLiveRegion`, `ServerErrorBanner` |
| `OnboardingWizard` | `WizardForm`, `WizardStep`, `WizardProgress`, `StepErrorSummary`, `FormStateMachineProvider` |
| `PaymentFlow` | `PaymentForm`, `TransactionVerificationStep`, `AriaBusyWrapper`, `ValidationStatusMessage` |
| `WithdrawalPage` | `WithdrawalForm`, `WalletAddressField`, `TransactionVerificationStep` |
| `SettingsPage` | `AsyncForm`, `TextField`, `InlineSuccessIndicator`, `AriaPoliteRegion` |

# 📦 KOMPONENTY — SYSTEM DETALI UI TipJar+

---

## 💬 TOGGLETIP (`/components/ui/toggletip/`)

| Komponent | Opis |
|---|---|
| `Toggletip` | Główny dymek informacyjny — wyzwalany kliknięciem/tapem (nie hover), limit 80 znaków, tło `--bg-surface-elevated`, auto-znika po 3s bezczynności, `z-index: 500` (token `tooltip`) |
| `ToggleTipTrigger` | Wrapper triggera (ikona `?` / `ℹ`) — obsługuje `click` na mobile/desktop, eliminuje sticky-hover problem |
| `ToggleTipContent` | Kontener treści dymka — max 80 znaków, `text-secondary`, `border-radius` z cienia `--shadow-modal`, bez HTML/linków/formularzy wewnątrz |
| `ToggleTipDismiss` | Logika auto-dismiss po 3s + click-outside — zarządza timeoutem i listenerem globalnym `mousedown/touchstart` |
| `ToggleTipViewportGuard` | Algorytm kolizji krawędzi viewport — koryguje pozycję dymka gdy wychodzi poza ekran (zapobiega zasłanianiu przycisków) |

---

## ⏱️ DEBOUNCING (`/hooks/` + `/components/ui/`)

| Hook / Komponent | Opis |
|---|---|
| `useDebounce` | Bazowy hook debouncingu — dwie predefiniowane wartości: 300ms (akcje transakcyjne/destrukcyjne) i 150ms (pola tekstowe, wyszukiwanie) |
| `useDebouncedAction` | Hook dla akcji finansowych — 300ms + natychmiastowe wywołanie `opacity` drop na elemencie triggera w czasie 0ms od kliknięcia |
| `useDebouncedSearch` | Hook dla pól wyszukiwania i edycji inline — 150ms, poczucie real-time UX bez przeciążenia XHR |
| `DebouncedButton` | Przycisk z wbudowanym debouncing 300ms — w czasie 0ms kliknięcia: `opacity` blednie (`transition cubic-bezier --ease-standard 200ms`), `pointer-events: none`, brak rage-click |
| `DebouncedInput` | Input z debouncing 150ms — lokalny feedback natychmiastowy, zapytanie HTTP opóźnione |

---

## 📐 Z-INDEX SYSTEM (`/styles/tokens/` + `/components/layers/`)

| Token / Komponent | Opis |
|---|---|
| `z-index.tokens.css` | Definicja zamkniętej skali tokenów CSS: `--z-base: 0-10`, `--z-sticky: 100`, `--z-overlay: 200`, `--z-toast: 300`, `--z-modal: 400`, `--z-tooltip: 500` — jedyne dozwolone wartości |
| `ZIndexProvider` | Kontekst React dystrybuujący tokeny warstw do drzewa komponentów — bez hard-coded wartości liczbowych |
| `StackingContextRoot` | Wrapper tworzący izolowany `stacking context` dla sekcji portalu — zapobiega wyciekom z-index między niezależnymi poddrzewami DOM |
| `ZIndexLintRule` | ESLint/Stylelint reguła walidacyjna — traktuje `z-index` z wartością numeryczną (bez tokenu CSS) jako błąd kompilacji |
| `PortalRenderer` | Renderuje komponenty (Modal, Toast, Tooltip) przez `ReactDOM.createPortal` bezpośrednio do `document.body` — eliminuje kolizje z-index w zagnieżdżonych stacking contexts |

---

## 🎯 FLOATING ELEMENTS (`/components/ui/floating/`)

| Komponent | Opis |
|---|---|
| `FloatingCTA` | Główny pływający przycisk CTA ("Wesprzyj") — `z-index: sticky (100)`, pojawia się po 200px scroll w dół, ukrywa się na każdy scroll w górę, GPU-accelerated transforms |
| `ScrollStateMachine` | Hook/logika zarządzająca stanami scroll: `idle → visible (200px down) → hidden (any scroll up)` — wyłącznie jeden FloatingCTA na ekran |
| `ThumbZonePositioner` | Wrapper pozycjonujący FloatingCTA w dolnej strefie kciuka (mobile) — tuż nad sticky bottom bar, nie w prawym dolnym rogu (desktop relikt) |
| `FloatingVisibilityGuard` | HOC egzekwujący regułę: maksymalnie jeden element floating na ekranie — blokuje montowanie drugiego instancji |
| `FloatingToastManager` | Globalny zarządca toastów systemowych — `z-index: toast (300)`, prawy dolny róg desktop / góra mobile, TTL auto-dismiss, brak oczekiwania na interakcję zamykającą |

---

## 🧱 MODAL LAYER SYSTEM (`/components/modals/`)

| Komponent | Opis |
|---|---|
| `ModalBackdrop` | Tło zaciemniające — `z-index: overlay (200)`, `backdrop-filter: blur`, fizycznie oddziela modal od tła |
| `ModalContainer` | Kontener modala — `z-index: modal (400)`, renderowany przez `PortalRenderer`, nieprzekraczalny wierzchołek stosu poza `tooltip (500)` |
| `PaymentModal` | Modal operacji finansowych USDC — integruje `ModalBackdrop` + `ModalContainer` + `DebouncedButton` + opcjonalny `Toggletip` wewnątrz (jedyna sytuacja gdzie `tooltip (500)` nad `modal (400)`) |
| `ModalOrchestrator` | Globalny zarządca stanu modalów — `z-index` przydzielany przez token, blokuje jednoczesne otwieranie wielu modalów, zarządza focus trap |

---

## 🔔 NOTIFICATION LAYER (`/components/feedback/`)

| Komponent | Opis |
|---|---|
| `SystemToast` | Toast systemowy — `z-index: toast (300)`, delegowany do `FloatingToastManager`, nie oczekuje interakcji zamykającej, TTL auto-dismiss |
| `ToastZoneDesktop` | Kontener strefy toastów desktop — prawy dolny róg, nie koliduje z `FloatingCTA (100)` |
| `ToastZoneMobile` | Kontener strefy toastów mobile — górna krawędź ekranu, nie koliduje z dolną strefą kciuka FloatingCTA |

---

## 🔧 COGNITIVE LOAD GUARDS (`/components/guards/`)

| Komponent | Opis |
|---|---|
| `SingleFloatingGuard` | Provider/guard blokujący montowanie więcej niż jednego elementu floating jednocześnie — singleton enforcement |
| `ToggleTipCharLimit` | Validator treści ToggleTip w runtime/dev — wyrzuca warning/error jeśli treść przekracza 80 znaków |
| `NakedZIndexDetector` | Dev-only komponent wykrywający w drzewie DOM użycie `z-index` bez tokenu CSS — loguje do konsoli błąd architektoniczny |
| `SilentDebouncingDetector` | Dev-only hook wykrywający `DebouncedButton` bez wizualnego feedbacku opacity — walidacja rygoru N.E.A.T. |

---

## ⚙️ HOOKS INFRASTRUKTURA (`/hooks/`)

| Hook | Opis |
|---|---|
| `useScrollDirection` | Wykrywa kierunek scrolla (up/down) i aktualną pozycję Y — fundament `ScrollStateMachine` dla FloatingCTA |
| `useScrollThreshold` | Hook zwracający `boolean` czy przekroczono próg 200px w dół — trigger pojawienia się FloatingCTA |
| `useClickOutside` | Hook nasłuchujący `mousedown/touchstart` poza wskazanym `ref` — zamykanie Toggletip |
| `useAutoDisappear` | Hook zarządzający timeoutem auto-znikania (Toggletip 3s, Toast TTL) — cleanup na unmount |
| `useZIndexToken` | Hook zwracający wartość tokenu `z-index` po nazwie semantycznej (`modal`, `tooltip`, etc.) — zero hard-coded values |
| `useHardwareAcceleration` | Hook aplikujący `will-change: transform` i `translate3d(0,0,0)` na elementach wymagających GPU — FloatingCTA, animowane modale |

---

## 📄 MAPOWANIE NA STRONY

| Strona | Kluczowe komponenty |
|---|---|
| `PublicProfilePage` (mobile) | `FloatingCTA`, `ScrollStateMachine`, `ThumbZonePositioner`, `FloatingVisibilityGuard` |
| `CreatorDashboard` | `SystemToast`, `ToastZoneDesktop`, `ZIndexProvider`, `ModalOrchestrator` |
| `WalletSettingsPage` | `PaymentModal`, `ModalBackdrop`, `DebouncedButton (300ms)`, `Toggletip` (CCTP, Gas params) |
| `AnalyticsPage` | `Toggletip` (Goal Progress, Recurring Supporters), `ToggleTipViewportGuard` |
| `LiveConfigPage` | `DebouncedInput (150ms)`, `DebouncedButton (300ms)`, `Toggletip`, `SystemToast` |
| `SupportPage` | `PaymentModal`, `DebouncedButton`, `FloatingCTA`, `ToggleTipTrigger` |

# 📦 KOMPONENTY — SYSTEM WIZUALNY & DESIGN SYSTEM TipJar+

---

## 🎨 DESIGN TOKENS (`/styles/tokens/`)

| Token / Plik | Opis |
|---|---|
| `colors.tokens.css` | Paleta zamknięta: `--teal-base: #003737`, `--purple-web3: #4D194D`, `--gold-premium: #FFD700` + skale odcieni — jedyne dozwolone wartości kolorów |
| `typography.tokens.css` | Tokeny typograficzne: `--font-display: 'Mukta Malar'`, `--font-body: 'IBM Plex Sans'`, `--font-mono: 'IBM Plex Mono'`, skala wag i letter-spacing |
| `spacing.tokens.css` | Siatka 8pt: `--spacing-xs` do `--spacing-xxl` — wielokrotności 8px jako jedyne dozwolone odstępy |
| `shadows.tokens.css` | Tokeny cieni: `--shadow-glow-purple`, `--shadow-glow-gold`, `--shadow-modal` — bez hard-coded wartości box-shadow |
| `borders.tokens.css` | Tokeny obramowań: grubości 1px + gradienty `#003737→#4D194D` dla glow borders |
| `gradients.tokens.css` | Tokeny gradientów: tło radialne tealu, metaliczny złoty wielostopniowy (`#FFCC00→#D4AF37→#996515`), gradient fioletowy |

---

## 🔤 TYPOGRAFIA (`/components/typography/`)

| Komponent | Opis |
|---|---|
| `DisplayHeader` | Mukta Malar Light (300), letter-spacing `+0.05em` — główne nagłówki sekcji, np. "Dashboard Overview" |
| `SectionTitle` | Mukta Malar Regular (400), minimalnie poszerzony tracking — tytuły bloków Bento, np. "Creator Statistics" |
| `BodyText` | IBM Plex Sans Regular (400), line-height 1.5rem — długie opisy, komunikaty, artykuły |
| `FormLabel` | IBM Plex Sans Medium (500), letter-spacing `-0.01em` — etykiety pól formularzy |
| `MonoData` | IBM Plex Mono Regular (400) — kwoty USDC, adresy portfeli, hashe, wartości on-chain; gwarantuje odróżnienie I/l |
| `CryptoBalance` | `MonoData` + fioletowa poświata `--shadow-glow-purple` — blok salda w przestrzeni holograficznej |

---

## 🔲 LAYOUT SYSTEM (`/components/layout/`)

| Komponent | Opis |
|---|---|
| `BentoGrid` | Siatka 12-kolumnowa `repeat(12, 1fr)`, gap `--spacing-md`, definiuje moduły o różnych rozpiętościach `grid-column: span X` — hierarchia kodowana rozmiarem |
| `BentoCard` | Pojedynczy moduł siatki — cienkie 1px glow border fioletowo-tealowe, tło `--teal-base`, `border-radius` z tokenem |
| `BentoCardWide` | Moduł zajmujący 2 kolumny × 2 rzędy — najwyższy priorytet percepcyjny w siatce |
| `MasonryGrid` | Dynamiczna siatka dla asymetrycznych treści (strumienie, galerie NFT) — `grid-auto-flow: dense`, przygotowana pod natywne `grid-template-rows: masonry` |
| `MasonryItem` | Element siatki Masonry o zmiennej wysokości — bez wymuszonej równej wysokości rzędu |
| `GlowBorder` | Wrapper implementujący pseudo-element `::before`/`::after` z `linear-gradient(#003737→#4D194D)` + `mask: linear-gradient` + `filter: blur()` — reużywalny na kartach i inputach |

---

## 🔘 PRZYCISKI (`/components/ui/buttons/`)

| Komponent | Opis |
|---|---|
| `GoldCTAButton` | Główny przycisk CTA — metaliczny gradient złoty (`#FFCC00→#D4AF37→#996515`), tekst `#003737` kontrast WCAG 4.5:1, stany: base/hover/focus/disabled |
| `GoldCTAButton:hover` | `translateY(-2px)` + `box-shadow` w odcieniach złota — efekt lewitowania |
| `GoldCTAButton:focus-visible` | Tło odwrócone do tealu, tekst złoty, pulsujący fioletowy focus ring `outline-offset: 3px`, `#4D194D` |
| `GoldCTAButton:disabled` | Silna desaturacja + obniżenie opacity — "ghost state" wypłowiałego złota, kursor `not-allowed` |
| `SecondaryButton` | Wariant konturowy — cienkie glow border fioletowe, tło transparentne |

---

## 🎚️ KONTROLKI FORMULARZY (`/components/ui/controls/`)

| Komponent | Opis |
|---|---|
| `GlassToggle` | Przełącznik z Glassmorphism — track: `backdrop-filter: blur(10px)`, półprzezroczysta warstwa opacity 10-15%, thumb w kolorze złotej sfery `--gold-premium` |
| `GlassToggle:accelerated` | `transform: translateZ(0)` dla GPU acceleration renderowania backdrop-filter |
| `TealInput` | Pole tekstowe — tło `--teal-base`, glow border fioletowe w stanie default, nasilenie fioletu on-focus, IBM Plex Sans labels |
| `TealTextarea` | Wieloliniowe pole tekstowe — identyczna logika glow border co `TealInput`, rozszerzalna wysokość |
| `TealSelect` | Select z customowym stylem — glow border, tło tealu, IBM Plex Sans |
| `WalletAddressInput` | Specjalizowany input dla adresów on-chain — IBM Plex Mono, walidacja formatu, glow border fioletowe |

---

## ⚡ STANY ŁADOWANIA (`/components/ui/loaders/`)

| Komponent | Opis |
|---|---|
| `TealPurpleSpinner` | Geometryczny ring z gradientem `teal→purple` — thin line, efekt motion blur via `box-shadow` z wektorem przesunięcia + `filter: blur(5px)` na ogon okręgu |
| `SkeletonBentoCard` | Skeleton placeholder w kształcie modułu Bento — Shimmer Effect na tle `#003737→#004545` |
| `BlockchainSyncIndicator` | Pulsująca fioletowa poświata na obramowaniu komponentu — sygnalizacja aktywnego połączenia on-chain |

---

## 👤 PROFIL TWÓRCY (`/components/profile/`)

| Komponent | Opis |
|---|---|
| `CreatorProfileBento` | Główny blok profilu w siatce Bento — kompozycja awatara, salda, statusu, statystyk |
| `PixelArtAvatar` | Awatar w technice pixel art — siatka kwadratowych bloków niskiej rozdzielczości, kontrast z otaczającymi ikonami wektorowymi |
| `FlatIconSet` | Zestaw ikon systemowych — jednolita cienka linia obrysowa, brak gradientów/wypełnień, perfekcyjnie skalowalne SVG |
| `USBCBalanceBlock` | Blok salda — IBM Plex Mono + skoncentrowana fioletowa poświata `--shadow-glow-purple`, efekt holograficzny |
| `PremiumCreatorBadge` | Odznaka statusu — bogaty gradient złoty `--gold-premium`, semantyczne odróżnienie od fioletowych danych technicznych |
| `CreatorStatsCard` | Moduł Bento ze statystykami — IBM Plex Sans labels + IBM Plex Mono wartości, cienkie glow borders |

---

## 🌐 TEMATYZACJA (`/styles/theme/`)

| Plik | Opis |
|---|---|
| `dark.theme.css` | Jedyny dozwolony motyw — ciemny fundament `--teal-base: #003737`, bez Light Mode (zakaz w spec) |
| `radial-gradient.bg.css` | Tło globalne — radialny gradient `#003737` przechodzący w czerń na obrzeżach, głębia przestrzenna bez drop shadows |
| `motion.tokens.css` | Tokeny animacji: `--ease-standard`, `--ease-spring` — referencje dla wszystkich transition/transform |

---

## 📐 LINTER / WALIDACJA STYLU (`/tooling/`)

| Narzędzie | Opis |
|---|---|
| `ColorTokenLintRule` | Stylelint — blokuje użycie hex/rgb bez odwołania do tokenu CSS; `#FFD700` inline = błąd kompilacji |
| `TypographyLintRule` | Walidacja — blokuje czcionki inne niż Mukta Malar / IBM Plex Sans / IBM Plex Mono |
| `GoldUsageGuard` | Dev-only — wykrywa użycie złota poza `PrimaryButton` i `PremiumCreatorBadge`, wyrzuca warning |
| `LightModeBlocker` | Blokuje deklaracje `prefers-color-scheme: light` — Light Mode kategorycznie wykluczony ze speca |

---

## 📄 MAPOWANIE NA STRONY

| Strona | Kluczowe komponenty |
|---|---|
| `LandingPage` | `BentoGrid`, `DisplayHeader`, `GoldCTAButton`, `TealPurpleSpinner`, `radial-gradient.bg` |
| `CreatorProfilePage` | `CreatorProfileBento`, `PixelArtAvatar`, `USBCBalanceBlock`, `PremiumCreatorBadge`, `FlatIconSet` |
| `DashboardPage` | `BentoGrid`, `BentoCardWide`, `CreatorStatsCard`, `BlockchainSyncIndicator`, `MonoData` |
| `ExplorePage` | `MasonryGrid`, `MasonryItem`, `BentoCard`, `GlowBorder`, `SkeletonBentoCard` |
| `SettingsPage` | `TealInput`, `GlassToggle`, `FormLabel`, `WalletAddressInput`, `GoldCTAButton` |
| `AnalyticsPage` | `BentoGrid`, `CryptoBalance`, `MonoData`, `SectionTitle`, `BlockchainSyncIndicator` |
| `NFTGalleryPage` | `MasonryGrid`, `MasonryItem`, `BentoCard`, `GlowBorder`, `PixelArtAvatar` |

# 📦 KOMPONENTY — SPINNER & SKELETON SCREEN TipJar+

---

## ⚙️ SPINNER (`/components/ui/spinner/`)

| Komponent | Opis |
|---|---|
| `Spinner` | Bazowy komponent SVG — `viewBox="0 0 50 50"`, gradient `--gold-400→--purple-300` via `<linearGradient>`, dwie nałożone animacje: `rotate` (360° linear) + `dash` (stroke-dasharray 1→90%) |
| `SpinnerSm` | Wariant 24px — `stroke-width: 4.5` jednostki SVG, używany w przyciskach i inputach inline, nie powoduje layout shift przy przejściu w stan loading |
| `SpinnerMd` | Wariant 48px — `stroke-width: 3.5`, używany w kartach, modalach, ładowaniu sekcji |
| `SpinnerLg` | Wariant 72px — `stroke-width: 3.0`, pełnoekranowy overlay inicjalizacyjny, funkcja brandingowa złoto-fioletu |
| `SpinnerOverlay` | Pełnoekranowy wrapper z `SpinnerLg` — blokuje UI podczas krytycznych przejść między modułami, `aria-busy="true"` na kontenerze |
| `ButtonSpinner` | Integracja `SpinnerSm` wewnątrz `DebouncedButton` — podmienia etykietę/ikonę, `role="status"` |

---

## 🦴 SKELETON SCREEN (`/components/ui/skeleton/`)

| Komponent | Opis |
|---|---|
| `SkeletonBase` | Bazowa klasa/komponent — tło `--teal-800 (#003737)`, `border-radius: 4px`, `overflow: hidden`, `transform: translateZ(0)` (Safari fix), `aria-hidden="true"` |
| `SkeletonText` | Prostokąt symulujący wiersz tekstu — wysokość równa `line-height`, `border-radius: 4px`, dostępny w wariantach szerokości |
| `SkeletonTextFull` | Wiersz tekstu 100% szerokości |
| `SkeletonTextShort` | Wiersz tekstu 60-80% szerokości — symuluje naturalny koniec akapitu/linii |
| `SkeletonTitle` | Prostokąt nagłówka — wysokość 24px, szerokość 70%, `margin-bottom: 12px` |
| `SkeletonImage` | Prostokąt miniatury — proporcje 16:9, wysokość 180px, `width: 100%` |
| `SkeletonAvatar` | Koło awatara — `border-radius: 50%`, rozmiary: sm/md/lg |
| `SkeletonBadge` | Mały prostokąt statusu/badge — symuluje kolumnę z oznaczeniem w tabelach |
| `SkeletonCard` | Kompozycja: `SkeletonImage` + `SkeletonTitle` + 2× `SkeletonText` — placeholder dla `CreatorCard`/`BentoCard` |
| `SkeletonListItem` | Kompozycja pozioma: `SkeletonAvatar` + 2× `SkeletonText` — placeholder wiersza listy |
| `SkeletonTableRow` | Kompozycja kolumnowa: N× `SkeletonText` z szerokościami mapującymi kolumny tabeli — dla `TransactionRow` |
| `SkeletonBentoGrid` | Siatka Bento wypełniona `SkeletonCard` o różnych rozpiętościach — placeholder całego dashboardu |

---

## ✨ SHIMMER ENGINE (`/components/ui/skeleton/shimmer/`)

| Komponent / Hook | Opis |
|---|---|
| `ShimmerLayer` | Pseudoelement `::after` z `linear-gradient(110deg, transparent, --teal-700, transparent)` — `transform: translateX(-100%→100%)`, `animation: shimmer 2s infinite linear` — akceleracja GPU |
| `shimmer.keyframes.css` | Definicja `@keyframes shimmer { 100% { transform: translateX(100%) } }` — `linear` timing bez ease (zapobiega efektowi pulsowania) |
| `useReducedMotionSkeleton` | Hook — jeśli `prefers-reduced-motion: reduce`, wyłącza ShimmerLayer, skeleton zostaje statycznym blokiem `--teal-800` |

---

## 🎨 SPINNER ANIMATION ENGINE (`/components/ui/spinner/animation/`)

| Plik | Opis |
|---|---|
| `spinner-gradient.svg-defs.tsx` | Definicja `<defs><linearGradient id="spinner-gradient">` — `--gold-400 (0%)` → `--purple-300 (100%)`, statyczny względem koła (obraca się wraz z nim) |
| `rotate.keyframes.css` | `@keyframes rotate { 100% { transform: rotate(360deg) } }` — `linear infinite 2s` |
| `dash.keyframes.css` | `@keyframes dash` — trzy fazy: `stroke-dasharray: 1,150` → `90,150` z `stroke-dashoffset: 0→-35→-124` — efekt liquid motion |
| `useReducedMotionSpinner` | Hook — jeśli `prefers-reduced-motion: reduce`, zmienia `animation-duration` na `10s` (bardzo wolny obrót zamiast zatrzymania) |

---

## ♿ ACCESSIBILITY WRAPPERS (`/components/ui/spinner/a11y/`)

| Komponent | Opis |
|---|---|
| `SpinnerStatus` | Spinner z `role="status"` — dla operacji nieblokujących (background fetch) |
| `SpinnerProgressbar` | Spinner z `role="progressbar"` — dla operacji blokujących z określonym postępem |
| `AriaBusySection` | Wrapper sekcji z `aria-busy="true"` podczas ładowania — komunikuje czytnikowi ekranu że zawartość jest w trakcie aktualizacji |
| `SkeletonA11yContainer` | Wrapper dla grupy skeletonów — ukryty tekst "Loading content..." dla czytników + `aria-hidden="true"` na dzieciach |

---

## 🚦 USAGE RULES & GUARDS (`/components/ui/loading/`)

| Komponent / Hook | Opis |
|---|---|
| `LoadingStrategy` | Provider/context definiujący regułę: Spinner = aktywna operacja (przycisk, przejście), Skeleton = pasywne ładowanie (karty, listy) — blokuje mieszanie wzorców |
| `ProgressiveLoadingGuard` | Jeśli ładowanie > 5s, zastępuje Skeleton komunikatem o przedłużającym się procesie — nigdy pusty ekran |
| `useLoadingState` | Hook zwracający `idle / loading / error / success` — integracja ze `SpinnerStatus` i `SkeletonCard` |
| `VirtualSkeletonList` | Skeleton tylko dla elementów w viewport — `Intersection Observer` lazy mounting, zapobiega wyczerpaniu VRAM przy długich listach |

---

## 🔩 TYPESCRIPT API (`/types/loading.types.ts`)

| Type | Opis |
|---|---|
| `SpinnerProps` | `size?: 's' \| 'm' \| 'l'`, `className?: string`, `role?: 'status' \| 'progressbar'` |
| `SkeletonProps` | `variant: 'text' \| 'rect' \| 'circle'`, `width?: string \| number`, `height?: string \| number`, `animation?: 'wave' \| 'none'` |

---

## 📄 MAPOWANIE NA STRONY / KOMPONENTY RODZICIELSKIE

| Kontekst użycia | Spinner | Skeleton |
|---|---|---|
| `DebouncedButton` (submit) | `SpinnerSm` (24px) podmienia label | — |
| `TransactionModal` (pending) | `TransactionSpinner` (Lottie/SVG tematyczny) | — |
| `GlobalLoader` (cold start) | `SpinnerLg` (72px) + overlay | — |
| `ExplorePage` (lista twórców) | — | `SkeletonBentoGrid` |
| `DashboardPage` (karty stats) | — | `SkeletonCard` × N |
| `TransactionHistory` (tabela) | — | `SkeletonTableRow` × N |
| `CreatorProfilePage` (profil) | — | `SkeletonCard` + `SkeletonAvatar` |
| `FilterResults` (zmiana filtrów) | — | `SkeletonCard` fade-in z dołu |

# 📦 KOMPONENTY — SYSTEM KART TipJar+

---

## 🃏 KARTA BAZOWA (`/components/cards/base/`)

| Komponent | Opis |
|---|---|
| `Card` | Bazowy kontener karty — tło `--teal-500`, `padding: 24px`, `border-radius: 12px`, `min-height` (bez `height: fixed`), `box-shadow: 0 4px 6px -1px var(--teal-900)` w spoczynku |
| `Card:hover` | `translateY(-6px)`, `box-shadow: 0 20px 25px -5px var(--teal-900), 0 0 12px rgba(255,234,0,0.15)`, `transition: cubic-bezier(0.25, 0.8, 0.25, 1)` — fizyczna symulacja bezwładności |
| `Card:focus-visible` | Gruby `outline` w `--purple-300`, `outline-offset: 2px` — Focus Ring dla nawigacji klawiaturowej |
| `CardGlowEffect` | Pseudoelement `::before` — `conic-gradient(--gold-400, --teal-300, --gold-400)`, `filter: blur(10px)`, `opacity: 0→1` on hover, `inset: -2px`, `z-index: -1` |
| `CardClickableOverlay` | Pseudoelement `::after` — wypycha klikalność na całą powierzchnię karty (Scenariusz A), eliminuje błędne zagnieżdżanie `<a>` |
| `CardInnerButton` | Przycisk wewnętrzny przebijający `CardClickableOverlay` wyższym `z-index` — własny `:hover` do `--gold-300` (Scenariusz B) |
| `CardWide` | Wariant `grid-column: span 2` — karta zajmująca dwie kolumny w Bento Grid |

---

## 🧩 SIATKA KART (`/components/cards/grid/`)

| Komponent | Opis |
|---|---|
| `CardsContainer` | Kontener siatki — `display: grid`, `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, `gap: 24px`, `padding: 24px`, `background: --teal-800` — 1 do 5 kolumn bez media queries |
| `BentoCardsContainer` | Wariant asymetryczny — `grid-template-columns: repeat(12, 1fr)` z możliwością `span` dla `CardWide` i `CardTall` |

---

## 👤 KARTA TWÓRCY (`/components/cards/creator/`)

| Komponent | Opis |
|---|---|
| `CreatorCard` | Pełna karta twórcy — kompozycja `CreatorAvatar` + `CreatorName` + `CreatorHandle` + `VerificationBadge` + `CreatorStats` |
| `CreatorAvatar` | Awatar z ramką `border: 1px solid --teal-100` lub cień `--teal-900` — izoluje barwne grafiki od tła `--teal-500` |
| `CreatorName` | Typografia `--teal-25` (`#E0F2F2`), `font-weight: 400` (podniesione o 100 względem light mode) — dominanta czytelności |
| `CreatorHandle` | Tag `@handle` w kolorze `--teal-100` — wizualny odciążacz pod nazwą |
| `VerificationBadge` | Złoty znacznik weryfikacji on-chain — sztywno `--gold-400`, punkt absolutnego zaufania |
| `CreatorStats` | Małe statystyki profilowe (obserwujący, tipy) — `--teal-50`, `font-size` pomocniczy |

---

## 📊 KARTA STATYSTYK (`/components/cards/stats/`)

| Komponent | Opis |
|---|---|
| `StatsCard` | Karta metryki analitycznej — kompozycja `BigNumber` + `DeltaIndicator` + `Sparkline` |
| `BigNumber` | Centralna wartość (TVL, wolumen) — `--teal-25` lub biały, największy `font-size` na karcie, IBM Plex Mono |
| `DeltaIndicator` | Wskaźnik zmiany — wzrost: `--success-base (#00E676)`, spadek: `--error-base (#FF5252)`, ikona strzałki + wartość procentowa |
| `Sparkline` | Uproszczony wykres trendu — linia w `--gold-400` z gradientem wygasającym w dół do bazy karty |
| `MetricLabel` | Etykieta metryki — `--teal-50`, `font-weight: 400`, `line-height: 1.5` minimum |

---

## 🔔 KARTA POWIADOMIEŃ (`/components/cards/notification/`)

| Komponent | Opis |
|---|---|
| `NotificationCard` | Karta powiadomienia transakcyjnego — kompozycja `NotificationIcon` + `NotificationContent` + `NotificationActions` |
| `UnreadNotificationCard` | Wariant nieprzeczytany — tło paska/karty `--gold-100 (#FAFF46)`, tekst `--teal-900` (ciemny na jasnym tle) |
| `NotificationIcon` | Ikona kontekstowa statusu — Pending: `--info-base (#66D9E8)`, Warning (brak gas): `--warning-base (#FF9100)`, Error: `--error-base (#FF5252)` |
| `NotificationContent` | Tytuł + opis powiadomienia — `--teal-25` / `--teal-50`, `line-height: 1.5` |
| `NotificationActions` | Para przycisków — zatwierdzenie: Solid `--gold-400`, odrzucenie: konturowy/neutralny — minimalizacja ryzyka pomyłki on-chain |

---

## 🖼️ KARTA NFT (`/components/cards/nft/`)

| Komponent | Opis |
|---|---|
| `NFTCard` | Karta zasobu cyfrowego — format kwadratowy 1:1, media górne 70% powierzchni, dane giełdowe dolne 30% |
| `NFTMedia` | Kontener mediów — `aspect-ratio: 1/1`, `border-radius: 12px 12px 0 0`, kaskadowe zaokrąglenie |
| `NFTCurrentBid` | Aktualna najwyższa oferta — `--gold-400`, IBM Plex Mono, dominanta danych transakcyjnych |
| `NFTRarityBadge` | Pastylka rzadkości (pill badge) — jedyne dozwolone miejsce użycia `--purple-300` / `--purple-500` na tarczy NFT; wyłącznie najwyższe tiery |
| `NFTAuctionTimer` | Licznik czasu aukcji — `--teal-50`, IBM Plex Mono |
| `NFTBidButton` | Przycisk licytacji — `--gold-400` CTA wewnątrz karty, wyższy `z-index` niż `CardClickableOverlay` |

---

## 🎨 TOKENY SEMANTYCZNE KART (`/styles/tokens/cards.tokens.css`)

| Token | Wartość | Zastosowanie |
|---|---|---|
| `--card-bg` | `--teal-500 (#007373)` | Tło wszystkich kart |
| `--card-text-primary` | `--teal-25 (#E0F2F2)` | Nagłówki, Big Numbers |
| `--card-text-secondary` | `--teal-50 (#CCF7F4)` | Opisy, metadane, daty |
| `--card-text-muted` | `--teal-100` | Handle, ikony nieaktywne |
| `--card-shadow-rest` | `0 4px 6px -1px var(--teal-900)` | Cień spoczynkowy |
| `--card-shadow-hover` | `0 20px 25px -5px var(--teal-900), 0 0 12px rgba(255,234,0,0.15)` | Cień hover z poświatą złota |
| `--card-border-radius` | `12px` | Zaokrąglenie kontenera |
| `--card-padding` | `24px` | Wewnętrzny margines |
| `--card-btn-radius` | `8px` | Kaskadowe zaokrąglenie przycisków wewnętrznych |
| `--success-base` | `#00E676` | Delta dodatnia |
| `--error-base` | `#FF5252` | Delta ujemna, błędy |
| `--warning-base` | `#FF9100` | Ostrzeżenia (brak gas) |
| `--info-base` | `#66D9E8` | Status Pending |

---

## 📄 MAPOWANIE NA STRONY

| Strona | Kluczowe komponenty kart |
|---|---|
| `ExplorePage` | `CreatorCard` × N w `CardsContainer` (auto-fill) |
| `DashboardPage` | `StatsCard` × N w `BentoCardsContainer` z `CardWide` |
| `AnalyticsPage` | `StatsCard` + `Sparkline`, `BigNumber`, `DeltaIndicator` |
| `NotificationsPage` | `NotificationCard`, `UnreadNotificationCard`, `NotificationActions` |
| `NFTGalleryPage` | `NFTCard` × N w `CardsContainer`, `NFTRarityBadge`, `NFTBidButton` |
| `CreatorProfilePage` | `CreatorCard` (hero), `StatsCard` (statystyki), `NFTCard` (portfolio) |

# 🏗️ MASTER REGISTRY — KOMPONENTY TipJar+

## ŁĄCZNA LICZBA KOMPONENTÓW

| Dokument | Obszar | Liczba komponentów |
|---|---|---|
| Doc 1 — Mikrointerakcje & Animacje | UI Motion System | ~45 |
| Doc 2 — Async Formularze | Form & Accessibility | ~40 |
| Doc 3 — Toggletip/Debouncing/Z-index/Floating | Cognitive UI System | ~35 |
| Doc 4 — Styl & Design System | Visual Architecture | ~40 |
| Doc 5 — Spinner & Skeleton | Loading States | ~30 |
| Doc 6 — Card System | Card Variants | ~35 |
| **RAZEM** | | **~225 komponentów** |

---

# 📁 PEŁNA MAPA KATALOGÓW

```
/components
  /ui
    /buttons          → PrimaryButton, OutlineButton, IconButton,
                        LoadingButton, DisabledButton, GoldCTAButton,
                        DebouncedButton, DebouncedInput, FocusRingWrapper,
                        TextLink
    /controls         → GlassToggle, TealInput, TealTextarea,
                        TealSelect, WalletAddressInput, SelectField,
                        RadioGroup
    /spinner          → Spinner, SpinnerSm, SpinnerMd, SpinnerLg,
                        SpinnerOverlay, ButtonSpinner, SpinnerStatus,
                        SpinnerProgressbar
    /skeleton         → SkeletonBase, SkeletonText, SkeletonTextFull,
                        SkeletonTextShort, SkeletonTitle, SkeletonImage,
                        SkeletonAvatar, SkeletonBadge, SkeletonCard,
                        SkeletonListItem, SkeletonTableRow,
                        SkeletonBentoGrid, VirtualSkeletonList
    /skeleton/shimmer → ShimmerLayer, shimmer.keyframes.css
    /toggletip        → Toggletip, ToggleTipTrigger, ToggleTipContent,
                        ToggleTipDismiss, ToggleTipViewportGuard
    /floating         → FloatingCTA, FloatingToastManager,
                        FloatingVisibilityGuard, ThumbZonePositioner
    /loaders          → TealPurpleSpinner, BlockchainSyncIndicator,
                        GlobalLoader, EmptyState, ErrorState
    /loading          → LoadingStrategy, ProgressiveLoadingGuard,
                        useLoadingState
    /typography       → DisplayHeader, SectionTitle, BodyText,
                        FormLabel, MonoData, CryptoBalance

  /cards
    /base             → Card, CardGlowEffect, CardClickableOverlay,
                        CardInnerButton, CardWide
    /grid             → CardsContainer, BentoCardsContainer
    /creator          → CreatorCard, CreatorAvatar, CreatorName,
                        CreatorHandle, VerificationBadge, CreatorStats
    /stats            → StatsCard, BigNumber, DeltaIndicator,
                        Sparkline, MetricLabel
    /notification     → NotificationCard, UnreadNotificationCard,
                        NotificationIcon, NotificationContent,
                        NotificationActions
    /nft              → NFTCard, NFTMedia, NFTCurrentBid,
                        NFTRarityBadge, NFTAuctionTimer, NFTBidButton

  /layout             → BentoGrid, BentoCard, BentoCardWide,
                        MasonryGrid, MasonryItem, GlowBorder

  /lists              → AnimatedList, StaggeredGrid, DragDropList,
                        InfiniteScrollList, TransactionRow

  /modals             → Modal, BottomSheet, MultiStepModal,
                        ModalBackdrop, ModalContainer, PaymentModal,
                        ModalOrchestrator, TransactionVerificationStep

  /feedback           → Toast, ToastStack, ErrorToast, SuccessToast,
                        SystemToast, ToastZoneDesktop, ToastZoneMobile,
                        ShakeField, ErrorMessage, InlineSuccessIndicator,
                        ValidationStatusMessage, ServerErrorBanner,
                        FieldHelpText, AsyncValidationIndicator

  /transitions        → PageTransition, TabCrossFade,
                        NavigationDirectionProvider

  /scroll             → RevealOnScroll, StaggerReveal,
                        ParallaxHero, LazyImage

  /forms
    /core             → AsyncForm, FormErrorSummary, FormField,
                        FormFieldError, FormSubmitButton
    /fields           → TextField, PasswordField, EmailField,
                        WalletAddressField
    /aria             → FocusTrap, AriaLiveRegion, AriaPoliteRegion,
                        AriaBusyWrapper, FieldAssociator,
                        AriaBusySection, SkeletonA11yContainer
    /feedback         → ShakeField, ErrorMessage,
                        InlineSuccessIndicator
    /wizard           → WizardForm, WizardStep, WizardProgress,
                        StepErrorSummary

  /web3               → TransactionSpinner, ConfirmedPulse,
                        TransactionModal, ParticleEffect,
                        PaymentForm, WithdrawalForm

  /profile            → CreatorProfileBento, PixelArtAvatar,
                        FlatIconSet, USBCBalanceBlock,
                        PremiumCreatorBadge, CreatorStatsCard

  /a11y               → ReducedMotionProvider, AriaLiveRegion,
                        SpinnerStatus, SpinnerProgressbar

  /guards             → SingleFloatingGuard, ToggleTipCharLimit,
                        NakedZIndexDetector, SilentDebouncingDetector,
                        ZIndexLintRule, ColorTokenLintRule,
                        TypographyLintRule, GoldUsageGuard,
                        LightModeBlocker, ZIndexProvider,
                        StackingContextRoot, PortalRenderer

/hooks
  /forms              → useAsyncForm, useServerErrors,
                        useFocusErrorSummary, useAriaAnnouncer,
                        useFieldId, useDebounce, useDebouncedAction,
                        useDebouncedSearch
  /loading            → useLoadingState, useReducedMotionSkeleton,
                        useReducedMotionSpinner
  /ui                 → useScrollDirection, useScrollThreshold,
                        useClickOutside, useAutoDisappear,
                        useZIndexToken, useHardwareAcceleration
  /scroll             → useScrollDirection, useScrollThreshold

/providers            → FormAccessibilityProvider,
                        FormStateMachineProvider,
                        NavigationDirectionProvider,
                        ZIndexProvider, ReducedMotionProvider,
                        LoadingStrategy

/styles
  /tokens             → colors.tokens.css, typography.tokens.css,
                        spacing.tokens.css, shadows.tokens.css,
                        borders.tokens.css, gradients.tokens.css,
                        z-index.tokens.css, cards.tokens.css,
                        motion.tokens.css
  /theme              → dark.theme.css, radial-gradient.bg.css
  /animations         → shimmer.keyframes.css, rotate.keyframes.css,
                        dash.keyframes.css, spinner-gradient.svg-defs

/tooling              → ZIndexLintRule, ColorTokenLintRule,
                        TypographyLintRule, GoldUsageGuard,
                        LightModeBlocker, NakedZIndexDetector,
                        SilentDebouncingDetector

/types                → SpinnerProps, SkeletonProps,
                        loading.types.ts
```

---

# 📄 KATALOG STRON + KOMPONENTY

| Strona | Komponenty (kluczowe) |
|---|---|
| `LandingPage` | `ParallaxHero`, `StaggerReveal`, `RevealOnScroll`, `GoldCTAButton`, `LazyImage`, `BentoGrid` |
| `RegisterPage` | `AsyncForm`, `FormErrorSummary`, `TextField`, `EmailField`, `PasswordField`, `ServerErrorBanner` |
| `LoginPage` | `AsyncForm`, `FocusTrap`, `AriaLiveRegion`, `ServerErrorBanner`, `DebouncedButton` |
| `OnboardingWizard` | `WizardForm`, `WizardStep`, `WizardProgress`, `StepErrorSummary`, `FormStateMachineProvider` |
| `CreatorDashboard` | `BentoCardsContainer`, `StatsCard`, `PageTransition`, `TransactionRow`, `SkeletonBentoGrid` |
| `CreatorProfilePage` | `CreatorProfileBento`, `PixelArtAvatar`, `USBCBalanceBlock`, `PremiumCreatorBadge`, `CreatorCard` |
| `ExplorePage` | `MasonryGrid`, `CreatorCard`, `InfiniteScrollList`, `SkeletonCard`, `EmptyState`, `ErrorState` |
| `AnalyticsPage` | `StatsCard`, `BigNumber`, `DeltaIndicator`, `Sparkline`, `Toggletip`, `BlockchainSyncIndicator` |
| `NFTGalleryPage` | `NFTCard`, `MasonryGrid`, `NFTRarityBadge`, `NFTBidButton`, `SkeletonCard` |
| `PaymentFlow` | `PaymentModal`, `TransactionVerificationStep`, `TransactionSpinner`, `ConfirmedPulse`, `DebouncedButton` |
| `WithdrawalPage` | `WithdrawalForm`, `WalletAddressField`, `TransactionVerificationStep`, `ShakeField` |
| `SettingsPage` | `AsyncForm`, `GlassToggle`, `TealInput`, `AnimatedAccordion`, `InlineSuccessIndicator`, `DragDropList` |
| `NotificationsPage` | `NotificationCard`, `UnreadNotificationCard`, `NotificationActions`, `SystemToast` |
| `LiveConfigPage` | `DebouncedInput`, `DebouncedButton`, `Toggletip`, `SystemToast`, `TransactionSpinner` |
| `KnowledgeCenter` | `RevealOnScroll`, `StaggerReveal`, `AnimatedAccordion` |
| `PublicProfilePage` | `FloatingCTA`, `ScrollStateMachine`, `ThumbZonePositioner`, `CreatorCard` |
| `SupportPage` | `PaymentModal`, `DebouncedButton`, `FloatingCTA`, `ToggleTipTrigger` |

---

# 🔑 KRZYŻOWE ZALEŻNOŚCI SYSTEMOWE

```
ReducedMotionProvider
  └── wszystkie animacje, transakcje, scroll, shimmer, spinner

ZIndexProvider (tokeny: base→sticky→overlay→toast→modal→tooltip)
  └── FloatingCTA(100) → ModalBackdrop(200) → SystemToast(300)
      → Modal(400) → Toggletip(500)

PortalRenderer
  └── Modal, Toast, Toggletip → renderowane do document.body

FormAccessibilityProvider
  └── AriaLiveRegion, AriaPoliteRegion, FocusTrap, AriaBusyWrapper

DebouncedButton (300ms transakcyjny)
  └── PaymentForm, WithdrawalForm, TransactionModal

DebouncedInput (150ms lokalny)
  └── WalletAddressField, TextField (search/edit)

GlowBorder
  └── BentoCard, TealInput, TealTextarea → pseudo-element shared

IBM Plex Mono
  └── MonoData, USBCBalanceBlock, NFTCurrentBid, TransactionRow,
      BigNumber, WalletAddressInput
```

