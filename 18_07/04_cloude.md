#  Komponenty UI — TipJar+ (na podstawie dokumentu)

## WARSTWA TOGGLETIP

**`ToggleTip`**
Dymek informacyjny wywoływany kliknięciem/tapem. Limit 80 znaków, auto-znikanie po 3s, z-index: 500, styl `bg-surface-elevated`, tekst `text-secondary`.

**`ToggleTipTrigger`**
Ikona znaku zapytania lub ikonka info — element aktywujący `ToggleTip`. Obsługuje `focus`/`click` na desktop, `tap` na mobile. Bez `hover` na mobile.

**`ToggleTipContent`**
Kontener treści dymka. Wymusza max 80 znaków, border-radius, `--shadow-modal`, brak HTML wewnątrz (tylko plain text).

---

## WARSTWA DEBOUNCING

**`DebouncedButton`**
Przycisk akcji z wbudowanym debouncingiem 300ms (akcje transakcyjne) lub 150ms (nawigacja/wyszukiwanie). W ms=0 obniża opacity, blokuje ponowne kliknięcie.

**`ButtonLoadingState`**
Wizualny stan ładowania przycisku — opacity drop + transition `cubic-bezier --ease-standard 200ms`. Eliminuje „silent timeout".

**`DebouncedInput`**
Pole tekstowe z debouncingiem 150ms do wyszukiwania profili i edycji nazwy twórcy. Reaktywność zbliżona do real-time bez przeciążenia XHR.

**`DebouncedSearchBar`**
Specjalizacja `DebouncedInput` dla wyszukiwarki profili — 150ms delay, client-side rendering.

---

## WARSTWA Z-INDEX

**`ModalShell`**
Okno modalne na z-index: 400 (`--z-modal`). Nieprzekraczalny szczyt stosu operacyjnego dla operacji płatniczych USDC.

**`Backdrop`**
Półprzezroczyste tło blokujące na z-index: 200 (`--z-overlay`). Zaciemnia i izoluje zawartość pod modalem. Opcjonalny `blur` filter.

**`ToastContainer`**
Globalny menedżer powiadomień systemowych na z-index: 300 (`--z-toast`). Auto-dismiss, bez interakcji zamykającej. Desktop: prawy dolny róg. Mobile: góra.

**`StickyHeader`**
Nagłówek/nawigacja przyklejona do góry, z-index: 100 (`--z-sticky`). Naturalnie przykrywa treść strony.

**`ZIndexTokenProvider`**
Context Provider eksportujący tokeny z-index jako CSS Variables. Eliminuje „naked values" w kodzie — `z-index: 9999` traktowane jako błąd lintera.

---

## WARSTWA FLOATING

**`FloatingCTA`**
Główny pływający przycisk akcji „Wesprzyj". Z-index: sticky (100), kolor `--gold-400`, strefa kciuka na mobile. Pojawia się po 200px scroll w dół, znika natychmiast przy scroll w górę.

**`ScrollStateMachine`**
Hook/logika po stronie klienta śledząca oś Y scrollowania. Wyzwala show/hide `FloatingCTA`. Threshold: ≥200px w dół = show, jakikolwiek scroll w górę = hide.

**`FloatingCTAWrapper`**
Kontener pozycjonujący `FloatingCTA` z hardware acceleration (`transform`, `will-change`). Obsługuje animację wejścia/wyjścia `--ease-spring`.

---

## SYSTEM POWIADOMIEŃ

**`ToastMessage`**
Pojedynczy toast systemowy. Typy: success / error / info. Auto-dismiss. Bez przycisku zamknięcia. Zarządzany przez `ToastContainer`.

**`ToastManager`** (NestJS/globalny serwis)
Globalny orchestrator stanu powiadomień — deleguje wyświetlanie poza komponenty lokalne. Singleton po stronie klienta.

---

## SYSTEM WALIDACJI FORMULARZY

**`TransactionalForm`**
Formularz operacji finansowych (wypłata USDC, parametry on-chain). Integruje `DebouncedButton` + `ModalShell` + wizualny feedback stanu.

**`FormFieldWithFeedback`**
Pole formularza z natychmiastowym optycznym potwierdzeniem stanu (focus, error, saved). Brak „cichego zapisu".

---

## SYSTEM KOGNITYWNY / ARCHITEKTURA

**`CognitiveLoadGuard`** (HOC)
Higher-Order Component wymuszający reguły dokumentu: jeden `FloatingCTA` na ekran, brak `naked z-index`, limit toggletip 80 znaków. Może działać jako dev-only runtime linter.

**`AdaptiveOrchestrationLayer`**
Globalny provider synchronizujący stany: scroll, modal open/close, toast queue, floating visibility. Eliminuje interferencję destruktywną między komponentami.

---

## STRONY / WIDOKI (kontekst dokumentu)

| Strona | Relevancja z dokumentu |
|---|---|
| **Public Profile** | `FloatingCTA` + `ScrollStateMachine` + `ToggleTip` na parametrach |
| **Wallet / Support** | `ModalShell` + `Backdrop` + `DebouncedButton` + `TransactionalForm` |
| **Analytics / Growth** | `ToastContainer` + `ToggleTip` (definicje metryk) + `StickyHeader` |
| **Live Tools** | `DebouncedInput` + `ToastMessage` + natychmiastowy feedback stanu |
| **Onboarding** | `ToggleTip` (progressive disclosure) + `DebouncedButton` |
| **Studio / Desktop** | `ZIndexTokenProvider` + `StickyHeader` + `AdaptiveOrchestrationLayer` |

Obydwa dokumenty przeanalizowane. Poniżej skonsolidowana lista komponentów — z pierwszego dokumentu (logika/zachowanie) oraz z drugiego (wizualna architektura/styl).

# Komponenty UI — TipJar+ (Dokumenty 1 + 2)

## TOKENY I FUNDAMENT SYSTEMU

**`DesignTokenProvider`**
CSS Variables provider eksportujący całą paletę: `--teal-900`, `--gold-400`, `--purple-300`, skale z-index, fonty, spacing. Jedyne źródło prawdy systemu.

**`ZIndexTokenProvider`**
Sub-provider z tokenami warstw: `base (0-10)`, `sticky (100)`, `overlay (200)`, `toast (300)`, `modal (400)`, `tooltip (500)`. Naked values traktowane jako błąd lintera.

**`TypographyProvider`**
Konfiguracja par typograficznych: `Mukta Malar` (nagłówki display, light 300, +0.05em tracking) + `IBM Plex Sans` (body, labels) + `IBM Plex Mono` (dane finansowe, adresy USDC).

---

## PRZYCISKI I AKCJE

**`CTAButtonGold`**
Główny przycisk konwersji. Gradient złota (`#FFD700 → #D4AF37 → #996515`), tekst `#003737`, WCAG 4.5:1. Cztery stany: base / hover (`translateY(-2px)`, gold glow) / focus (fioletowy focus ring, offset 3px, inwersja palety) / disabled (desaturacja, ghost state).

**`DebouncedButton`**
Przycisk akcji transakcyjnych z debouncingiem 300ms. W ms=0 drop opacity + `cubic-bezier --ease-standard 200ms`. Blokada ponownego kliknięcia. Eliminuje rage-click.

**`DebouncedButtonLight`**
Wersja 150ms dla akcji nawigacyjnych i wyszukiwania. Zachowuje poczucie real-time reaktywności.

**`ButtonLoadingState`**
Wizualny stan ładowania przycisku — opacity drop + spinner wewnątrz. Zamyka pętlę motoryczną użytkownika w <100ms.

---

## TOGGLETIP / DYMKI

**`ToggleTip`**
Dymek informacyjny. Limit hard: 80 znaków. Trigger: click/tap (nie hover na mobile). Auto-dismiss po 3s. Z-index: 500. Tło `--bg-surface-elevated` (`var(--teal-700)`), tekst `--text-secondary` (`#D6EBEB`), akcent `--purple-300`.

**`ToggleTipTrigger`**
Ikona `?` lub `i` aktywująca dymek. Obsługa `focus`/`click` desktop, `tap` mobile. Brak `hover` na mobile.

**`ToggleTipContent`**
Kontener treści: border-radius, `--shadow-modal`, wyłącznie plain text, zero HTML wewnątrz, zero linków.

---

## FLOATING ELEMENTS

**`FloatingCTA`**
Złoty pływający przycisk akcji „Support / Wesprzyj". Z-index: sticky (100), kolor `--gold-400`. Pojawia się po ≥200px scroll w dół, znika natychmiast przy scroll w górę (1 klatka `--ease-spring`). Jeden na ekran — reguła absolutna.

**`ScrollStateMachine`**
Hook klienta śledzący oś Y. Threshold: ≥200px → show. Jakikolwiek scroll w górę → hide. Żadna inna logika nie override'uje tego stanu.

**`FloatingCTAWrapper`**
Kontener z hardware acceleration (`transform`, `will-change`). Pozycjonowanie: dolna strefa kciuka mobile, tuż nad sticky bottom bar.

---

## SYSTEM POWIADOMIEŃ

**`ToastMessage`**
Pojedynczy toast: success / error / info. Auto-dismiss, brak przycisku zamknięcia. Tło teal, akcent fioletowy lub złoty zależnie od typu.

**`ToastContainer`**
Globalny manager kolejki toastów. Z-index: 300 (`--z-toast`). Desktop: prawy dolny róg. Mobile: góra ekranu. Singleton po stronie klienta.

---

## FORMULARZE I INPUTY

**`GlowBorderInput`**
Pole tekstowe z gradientowym obramowaniem teal→fiolet via pseudo-element `::before` + `mask-composite: exclude`. Stan default: subtelna poświata. Stan focus: wzmocniony fiolet, wyostrzenie. Tło wnętrza: `#003737`.

**`GlowBorderTextarea`**
Wieloliniowa wersja `GlowBorderInput`. Identyczna mechanika poświaty.

**`FormFieldWithFeedback`**
Wrapper pola z natychmiastowym optycznym potwierdzeniem stanu (focus / error / saved). Zero silent timeout.

**`TransactionalForm`**
Formularz operacji finansowych (wypłata USDC, parametry on-chain). Integruje: `GlowBorderInput` + `DebouncedButton` + `ModalShell` + feedback stanu.

**`GlassToggle`**
Przełącznik stanów (premium features). Track: glassmorphism — `backdrop-filter: blur(10px)`, opacity warstwy 10-15%. Thumb: złota sfera (`--gold-400`). Hardware acceleration: `transform: translateZ(0)`.

---

## KARTY I LAYOUT

**`BentoCard`**
Bazowy moduł siatki. Cienkie obramowanie gradient teal→fiolet via pseudo-element. Delikatna fioletowa poświata na krawędzi. Tło: `#003737`. Spacing: wielokrotności 8px.

**`BentoGrid`**
Kontener 12-kolumnowej siatki. `display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--spacing-md)`. Karty definiują własne `grid-column: span X`.

**`MasonryGrid`**
Layout dla dynamicznych treści asymetrycznych (strumienie aktywności, galerie). `grid-auto-flow: dense` jako fallback. Docelowo `grid-template-rows: masonry` gdy standaryzacja CSS.

**`BentoCardDouble`**
Karta 2-kolumnowa × 2-rzędowa. Sygnalizuje hierarchię wagą wizualną — większy moduł = wyższy priorytet informacyjny.

---

## MODALE I OVERLAY

**`ModalShell`**
Okno modalne. Z-index: 400 (`--z-modal`). Tło: `var(--teal-800)`. Nieprzebijalny szczyt stosu dla operacji płatniczych. Ostra krawędź border-radius.

**`Backdrop`**
Półprzezroczysty overlay przyciemniający. Z-index: 200 (`--z-overlay`). Opcjonalny `blur` filter. Fizycznie izoluje modal od warstw analitycznych.

---

## PROFIL TWÓRCY

**`CreatorAvatar`**
Awatar w technice strukturyzowanego pixel art (kwadratowa siatka bloków). Kontrast z płaską wektorową ikonografią systemu — estetyka Retro-Modern / Y2K.

**`USBCBalanceBlock`**
Blok wartości salda. Font: `IBM Plex Mono`, kolor: `text-secondary`. Otoczony skoncentrowaną fioletową poświatą (`box-shadow` z filtem blur). Efekt holograficzny / neonowy.

**`PremiumCreatorBadge`**
Odznaka statusu premium. Gradient złoty (`#FFD700 → #D4AF37`). Skrajnie reglamentowana — wyłącznie dla statusów Premium Creator. Nie używać dekoracyjnie.

**`CreatorProfileBento`**
Kompozycja bloku profilu w siatce Bento. Łączy: `CreatorAvatar` + `USBCBalanceBlock` + `PremiumCreatorBadge` + dane analityczne + flat web3 ikony.

---

## TYPOGRAFIA

**`DisplayHeading`**
Nagłówki sekcji. Font: `Mukta Malar Light 300`, tracking `+0.05em`. Wyłącznie dla głównych tytułów.

**`SectionTitle`**
Tytuły bloków Bento. Font: `Mukta Malar Regular 400`, minimalnie poszerzony tracking.

**`BodyText`**
Teksty ciągłe i komunikaty systemowe. Font: `IBM Plex Sans Regular 400`, tracking naturalny.

**`FormLabel`**
Etykiety pól. Font: `IBM Plex Sans Medium 500`, tracking `-0.01em`.

**`CryptoDataText`**
Wartości finansowe i adresy. Font: `IBM Plex Mono Regular 400`. Wyrównanie dziesiętne w kolumnach tabel.

---

## LOADING / ANIMACJE

**`TealPurpleSpinner`**
Ring ładowania: cienki, geometryczny, gradient teal→fiolet. Efekt motion blur (statyczny: `box-shadow` z wektorem przesunięcia + `filter: blur(5px)` na ogon). Jedwabisty, nie mechaniczny.

**`SkeletonBentoCard`**
Placeholder ładowania w kształcie karty Bento. Animacja pulse na bazie gradientu teal.

---

## IKONOGRAFIA

**`FlatWeb3Icon`**
Ikony systemu: single-weight, thin stroke, zero gradientów, zero wypełnień. Czysta geometria SVG. Kontrast do pixel art awatara.

---

## ARCHITEKTURA / ORCHESTRATION

**`AdaptiveOrchestrationLayer`**
Globalny provider synchronizujący: stan scrolla, modal open/close, toast queue, floating visibility. Eliminuje interferencję destruktywną między warstwami.

**`CognitiveLoadGuard`**
Dev-only HOC wymuszający reguły obu dokumentów: jeden `FloatingCTA` na ekran, brak naked z-index, limit 80 znaków w toggletipie, brak silent debouncing.

---

## STRONY / WIDOKI

| Strona | Kluczowe komponenty |
|---|---|
| **Public Profile** | `CreatorProfileBento` + `FloatingCTA` + `ScrollStateMachine` + `PremiumCreatorBadge` |
| **Wallet / Support** | `ModalShell` + `Backdrop` + `TransactionalForm` + `USBCBalanceBlock` |
| **Analytics / Growth** | `BentoGrid` + `MasonryGrid` + `ToggleTip` + `CryptoDataText` |
| **Live Tools** | `DebouncedButton` + `ToastContainer` + `GlowBorderInput` |
| **Onboarding** | `DisplayHeading` + `ToggleTip` + `CTAButtonGold` + `GlassToggle` |
| **Studio / Desktop** | `ZIndexTokenProvider` + `BentoCardDouble` + `AdaptiveOrchestrationLayer` |

# Komponenty UI — TipJar+ (Dokument 3: Spinner / Skeleton)

## SPINNER — KOMPONENTY

**`TealPurpleSpinner`**
SVG spinner złoto→fiolet (`--gold-400 → --purple-300`). Trzy rozmiary: `s/m/l` (24px / 48px / 72px). Animacja podwójna: `rotate` (360°, linear, 2s) + `dash` (stroke-dasharray 1→90, ease-in-out, 1.5s). Efekt liquid motion — organiczny, nie mechaniczny.

**`SpinnerSm`** *(24px)*
Wariant inline — zastępuje etykietę lub ikonę wewnątrz przycisku. Stroke-width: 4.5 SVG units. Zero layout shift przy przejściu w stan loading.

**`SpinnerMd`** *(48px)*
Wariant dla kart, modali, ładowania sekcji. Stroke-width: 3.5 SVG units.

**`SpinnerLg`** *(72px)*
Wariant full-screen overlay — inicjalizacja aplikacji (cold start), krytyczne przejścia między modułami. Stroke-width: 3.0 SVG units. Pełni rolę brandingową.

**`SpinnerGradientDef`**
Reużywalna definicja `<linearGradient id="spinner-gradient">` w sekcji `<defs>` SVG. Kąt x1=0% y1=0% → x2=100% y2=100%. Gradient statyczny względem koła — obraca się razem z nim, tworząc mieszanie barw w ruchu.

---

## SKELETON — KOMPONENTY

**`SkeletonBase`**
Bazowy element szkieletowy. Background: `--teal-800 (#003737)`. Border-radius: 4px. `position: relative; overflow: hidden; transform: translateZ(0)` (fix Safari border-radius clipping).

**`SkeletonText`**
Prostokąt imitujący wiersz tekstu. Wysokość: 16px (= line-height body). Warianty szerokości: `w-100` (100%) i `w-80` (80%) — ostatni wiersz akapitu krótszy, symuluje naturalny koniec tekstu.

**`SkeletonTitle`**
Prostokąt imitujący nagłówek. Wysokość: 24px, szerokość: 70%. Większy od `SkeletonText`, komunikuje hierarchię typograficzną.

**`SkeletonImage`**
Prostokąt imitujący miniaturę/baner. Wysokość: 180px, szerokość: 100%. Proporcje 16:9 dla galerii.

**`SkeletonAvatar`**
Koło (`border-radius: 50%`) imitujące avatar w liście. Użycie w wierszach list użytkowników, komentarzach, Recent Supporters.

**`SkeletonBadge`**
Mały prostokąt imitujący badge statusu (np. kolumna statusu w tabelach transakcji). Szerokość dopasowana do kolumny.

**`SkeletonCardLayout`**
Kompozycja: `SkeletonImage` + `SkeletonTitle` + dwa `SkeletonText`. Gotowy placeholder dla `BentoCard`. `aria-hidden="true"` — niewidoczny dla czytników ekranu.

**`SkeletonListRow`**
Kompozycja: `SkeletonAvatar` + dwa `SkeletonText` + `SkeletonBadge`. Imituje wiersz listy (np. tabela transakcji, lista supporters).

**`SkeletonBentoGrid`**
Placeholder dla całej siatki Bento podczas inicjalizacji widoku. Zawiera kilka `SkeletonCardLayout` ułożonych w `BentoGrid`.

---

## SHIMMER — ANIMACJA (warstwa implementacyjna)

**`ShimmerLayer`**
Pseudoelement `::after` nakrywający skeleton. Gradient: `linear-gradient(110deg, transparent 0%, --teal-700 40%, --teal-700 60%, transparent 100%)`. Animacja: `transform: translateX(-100% → 100%)`, `linear`, `2s infinite`. GPU-accelerated — omija main thread CPU.

**`ShimmerTokens`**
CSS Variables dla shimmer: `--skeleton-base: var(--teal-800)`, `--skeleton-shine: var(--teal-700)`. Centralna zmiana palety bez ingerencji w logikę animacji.

---

## DOSTĘPNOŚĆ (A11Y) — KOMPONENTY/WARSTWY

**`ReducedMotionLayer`**
`@media (prefers-reduced-motion: reduce)` wrapper. Dla skeleton: wyłącza shimmer → statyczny blok `--teal-800`. Dla spinnera: `animation-duration: 10s` (drastyczne zwolnienie).

**`SpinnerARIA`**
Wrapper nadający spinnerowi `role="status"` lub `role="progressbar"`. Przy blokowaniu interakcji: `aria-busy="true"` na kontenerze sekcji.

**`SkeletonARIA`**
Wrapper nadający skeleton `aria-hidden="true"` + ukryty tekst dla kontenera nadrzędnego (np. `sr-only`: „Loading content...").

---

# STANY ŁADOWANIA — INTEGRACJA Z ISTNIEJĄCYMI KOMPONENTAMI

**`ButtonWithSpinner`**
`DebouncedButton` (z dok. 1) zintegrowany ze `SpinnerSm`. Spinner zastępuje etykietę w momencie ms=0 kliknięcia. Zero layout shift — spinner 24px mieści się w standardowym paddingu przycisku 32-48px.

**`ModalWithSpinner`**
`ModalShell` (z dok. 1) z `SpinnerLg` na overlay podczas inicjalizacji operacji płatniczej. Z-index: modal (400) + spinner wewnątrz.

**`CardWithSkeleton`**
`BentoCard` (z dok. 2) z `SkeletonCardLayout` jako stanem przed załadowaniem danych. Transition: skeleton → rzeczywista treść bez layout shift.

**`FeedWithSkeleton`**
`MasonryGrid` (z dok. 2) z wieloma `SkeletonListRow` podczas ładowania strumienia aktywności. Lazy loading skeletonów — tylko elementy w viewport.

---

## USAGE GUIDELINES — LOGIKA PRZEŁĄCZANIA

**`LoadingStateManager`**
Hook/context zarządzający przełączaniem: skeleton (ładowanie pasywne — dane nadchodzą) ↔ spinner (ładowanie aktywne — system przetwarza). Reguła: spinner dla akcji przycisku/przejścia strony, skeleton dla kart/list.

**`ProgressiveFallback`**
Komponent zastępujący skeleton komunikatem tekstowym jeśli ładowanie przekroczy 3-5s. Nigdy pusty ekran.

---

## TABELA PARAMETRÓW TECHNICZNYCH (z dokumentu)

| Komponent | Atrybut | Wartość |
|---|---|---|
| `SpinnerSm` | stroke-width | 4.5 SVG units |
| `SpinnerMd` | stroke-width | 3.5 SVG units |
| `SpinnerLg` | stroke-width | 3.0 SVG units |
| Spinner | animacja | rotate 2s linear + dash 1.5s ease-in-out |
| Skeleton | baza | `--teal-800` (#003737) |
| Skeleton | shimmer | `--teal-700` (#004545) |
| Skeleton | metoda | `transform: translateX` na `::after` |
| Skeleton | kąt gradientu | 110deg |
| Ogólnie | a11y | `prefers-reduced-motion`, ARIA roles |

# Komponenty UI — TipJar+ (Dokument 4: Animacje Wysokości / Tabs)

## SYSTEM ZAKŁADKOWY (TABS)

**`AnimatedTabContainer`**
Główny kontener systemu zakładkowego. Zarządza wysokością paneli z płynnym przejściem. Implementuje hybrydową strategię: `interpolate-size` (Chrome 129+) z fallbackiem FLIP+WAAPI. `overflow: clip`, `transition: height 0.4s cubic-bezier(0.2, 0.0, 0, 1)`.

**`TabNavigation`**
Pasek zakładek — lista przycisków wyzwalających zmianę aktywnego panelu. Nie odpowiada za wysokość; wyłącznie za sygnał przełączenia do `AnimatedTabContainer`.

**`TabPanel`**
Pojedynczy panel treści zakładki. Stan domyślny: `height: 0; overflow: clip`. Stan aktywny: `height: auto` (z `interpolate-size`) lub wartość wyliczona przez FLIP/WAAPI.

**`TabPanelInner`**
Wewnętrzny kontener treści `TabPanel`. Izoluje zagnieżdżone elementy przed destrukcyjnym efektem `scaleY` (squish & stretch). Przy technice FLIP otrzymuje odwrotną korekcję skali: `scaleY(1/parentScale)`.

---

## SYSTEM ANIMACJI FLIP

**`FLIPAnimationController`**
Hook/klasa implementująca sekwencję First→Last→Invert→Play. Rejestruje `getBoundingClientRect().height` (First), wstrzykuje nową treść (Last), oblicza deltę geometryczną (Invert: `ΔY = heightFirst - heightLast`), deleguje ruch do WAAPI (Play). Zero operacji Layout/Paint w trakcie animacji.

**`FLIPSnapshotCapture`**
Utility function wywołana przed mutacją DOM. Pobiera `getBoundingClientRect()` kontenera i zapisuje do pamięci niezwiązanej z cyklem renderowania. Pasywna — nie wywołuje Forced Synchronous Layout.

**`FLIPInverter`**
Utility aplikujący `transform: scaleY(invertedRatio)` na kontener natychmiast po mutacji DOM, zanim silnik wykona Paint. Tworzy iluzję stabilności — kontener wizualnie „pozostaje" na starym rozmiarze.

---

## WEB ANIMATIONS API (WAAPI)

**`WAAPIHeightAnimator`**
Wrapper nad `element.animate()`. Przyjmuje: keyframes obliczone przez FLIP (`[{height: first}, {height: last}]`), czas z Design System Tokens, krzywą Béziera. Zwraca instancję `Animation` z API: `play()`, `pause()`, `reverse()`, `cancel()`.

**`WAAPIInterruptHandler`**
Obsługuje scenariusz przerwania animacji w locie (użytkownik klika inną zakładkę w trakcie przejścia). Wywołuje `currentAnimation.cancel()`, wylicza aktualną pozycję pośrednią, uruchamia nową instancję WAAPI z punktu przerwania. Zero optycznego zgrzytu.

**`WAAPIAdditiveLayer`**
Implementacja addytywnych animacji WAAPI — dodaje deltę wysokości bez niszczenia pierwotnego tempa przejścia. Używany gdy asynchronicznie doładowane dane (fetch) zmieniają rozmiar panelu w trakcie animacji.

---

## RESIZE OBSERVER

**`ResizeObserverAdapter`**
Wrapper nad `ResizeObserver API`. Obserwuje `contentRect` panelu — wykrywa zmiany rozmiaru wywołane: doładowaniem obrazów, fetchem danych, załamaniem tekstu przy zmianie szerokości okna. Nie wywołuje Layout Thrashingu — działa pasywnie.

**`RAFBatchedResizeHandler`**
Chroni `ResizeObserverAdapter` przed pętlą nieskończoną (`ResizeObserver loop limit exceeded`). Każda odpowiedź obserwatora jest odkładana przez `window.requestAnimationFrame()` — zmiany aplikowane wyłącznie tuż przed nową klatką renderowania.

**`AdaptiveHealingLayer`**
Fail-safe działający równolegle z WAAPI. Po zakończeniu animacji weryfikuje rzeczywisty rozmiar panelu przez `ResizeObserver`. Jeśli asynchroniczne dane zmieniły rozmiar w trakcie przejścia — koryguje bez restartu animacji.

---

## FEATURE DETECTION / PROGRESSIVE ENHANCEMENT

**`InterpolateSizeDetector`**
Sprawdza wsparcie przeglądarki dla `interpolate-size: allow-keywords` przez `CSS.supports()` lub `@supports`. Chrome 129+ / Edge 129+ → tryb deklaratywny CSS. Firefox 150 / Safari 26.4 → fallback FLIP+WAAPI.

**`AnimationStrategyProvider`**
Context Provider eksportujący aktywną strategię animacji: `'declarative'` (interpolate-size) | `'flip-waapi'` (FLIP + Web Animations API) | `'legacy'` (ostateczny fallback). Komponenty konsumują strategię bez własnej logiki detekcji.

**`ProgressiveEnhancementGuard`**
HOC/wrapper implementujący `@supports(height: calc-size(auto, size))` jako blok CSS. Dla Chrome 129+: minimalna deklaracja CSS. Dla pozostałych: pełna orkiestracja JavaScript. Jeden komponent — dwa zachowania.

---

## CSS / TOKENY ANIMACJI

**`AnimationTimingTokens`**
CSS Variables dla krzywych i czasów: `--ease-tabs: cubic-bezier(0.2, 0.0, 0, 1)`, `--duration-tabs: 0.4s`. Konsumowane przez `AnimatedTabContainer` i WAAPI keyframes — jeden punkt zmiany timingu dla całego systemu.

**`InterpolateSizeRoot`**
Globalna deklaracja `:root { interpolate-size: allow-keywords; }`. Aplikowana warunkowo przez `InterpolateSizeDetector` — tylko gdy `CSS.supports()` zwróci `true`.

**`CalcSizeExpander`**
Utility CSS używający `calc-size(auto, size + 20px)` dla paneli wymagających marginesu buforowego. Automatycznie narzuca `interpolate-size` na element — nie wymaga globalnej deklaracji `:root`.

---

## STANY MASZYNY (FINITE STATE MACHINE)

**`TabStateMachine`**
Zarządca stanów zakładkowego systemu. Siedem dyskretnych stanów z dokumentu: `idle` → `triggered` → `snapshot` → `mutated` → `animating` → `healing` → `settled`. Każde przejście ma zdefiniowany kontrakt wejścia/wyjścia.

**`TabIdleState`**
Stan spoczynku. Panel z `overflow: clip`, brak aktywnych animacji, ResizeObserver aktywny pasywnie.

**`TabTriggeringState`**
Stan wyzwolenia. Wywołuje `FLIPSnapshotCapture` → zapisuje `getBoundingClientRect().height` do pamięci maszyny stanu.

**`TabMutationState`**
Stan mutacji DOM. Wstrzykuje nową treść, aplikuje `height: auto`, przeglądarka przelicza układ. Blokada Paintu do momentu przejścia do `TabAnimatingState`.

**`TabAnimatingState`**
Stan animacji. `FLIPInverter` → `WAAPIHeightAnimator`. Cały ruch na GPU (Compositor Thread). Obsługuje przerwanie przez `WAAPIInterruptHandler`.

**`TabHealingState`**
Stan adaptacyjny. `AdaptiveHealingLayer` + `RAFBatchedResizeHandler` korygują rozmiar po asynchronicznych zmianach treści.

**`TabSettledState`**
Stan zakończenia. Czyści instancję WAAPI, przywraca kontenerowi natywne zarządzanie przepływem, ResizeObserver wraca do pasywnego nasłuchu.

---

## INTEGRACJA Z ISTNIEJĄCYMI KOMPONENTAMI

**`ModalWithAnimatedTabs`**
`ModalShell` (dok. 1) z `AnimatedTabContainer` wewnątrz — np. ustawienia portfela z zakładkami Wallet / Notifications / Security. Płynna zmiana wysokości modalu bez layout shift.

**`BentoCardWithTabs`**
`BentoCard` (dok. 2) z `AnimatedTabContainer` — np. karta analityki z zakładkami Week / Month / All Time. Bento Grid nie „skacze" przy zmianie zakładki.

**`OnboardingStepContainer`**
Wielostanowy kontener kroków onboardingu. Implementuje `TabStateMachine` dla 5 kroków progresywnego profilowania twórcy. Każdy krok ma inną wysokość treści.

# Komponenty UI — TipJar+ (Dokument 5: SVG Backgrounds / Patterns)

## WZORY SVG — TRZY ARCHETYPY TŁA

**`TacticalBackgroundSVG`**
Archetyp A: System Taktyczno-Nawigacyjny. Siatka współrzędnych (`--teal-25/50`, opacity 0.12) + ramki narożne L-shape + markery HUD + celownik złoty (`--gold-400 #FFD700`) z `feGaussianBlur` goldGlow (stdDeviation 1.5 + 3.5). Kafel 160×160px. Tło: gradient liniowy `#001717 → #003737 → #001111`. Stosowalność: Public Profile, onboarding hero.

**`Web3NodeBackgroundSVG`**
Archetyp B: Kryptograficzny Węzeł Web3. Izometryczne sześciany 3D (`--purple-300 #4D194D`, fill-opacity 0.3–0.5) + falowe ścieżki Q-bezier + węzły sieciowe teal (`#CCF7F4`). Kafel 200×200px. Arytmetyka modularna zapewnia bezszwowość na krawędziach kafla. Poświata purpleGlow (stdDeviation 2.5 + 5.5). Stosowalność: Wallet, Web3 sekcje, tło modali płatniczych.

**`ClinicalDatabaseBackgroundSVG`**
Archetyp C: Kliniczna Architektura Bazy Danych. Ortogonalne ścieżki pod kątami 90°/45° (`#E0F2F2`, opacity 0.65) + węzły połączeń (`circle r=1.5`, `#CCF7F4`) + ramki narożne. Kafel 120×120px. Zero filtrów rozmycia — perfekcja na ekranach Retina/4K. Stosowalność: Analytics/Growth, tabele transakcji, Studio/Desktop.

---

## ELEMENTY SKŁADOWE SVG (ATOMICZNE)

**`CornerFrameElement`**
Ramka narożna L-shape — cztery ścieżki `<path>` w rogach kafla. Stroke `#E0F2F2`, stroke-width 0.75, opacity 0.3–0.5. Obecna w Archetyp A i C. Sygnalizuje „wyznaczone pole operacyjne".

**`CoordinateGridElement`**
Siatka współrzędnych — poziome i pionowe linie `<path>`. Stroke `#ABE1E1`, stroke-width 0.5, opacity 0.08–0.15. Obecna w Archetyp A (160px odstęp) i C (120px odstęp).

**`HUDMarkerElement`**
Marker HUD — krzyżyk z czterech `<rect>` o wymiarach 1×6px i 6×1px. Kolor `--gold-400`, `filter="url(#goldGlow)"`. Obejście błędu GPU: `<rect>` zamiast bezwymiarowych `<line>` — zapobiega znikaniu poświaty przy renderowaniu GPU.

**`GoldReticleElement`**
Celownik złoty — dwa koncentryczne `<circle>` (r=18 stroke-dasharray, r=4) + punkt centralny `<circle r=1 fill>`. Kolor `--gold-400`. Filter goldGlow. Jedyny element złoty w tle — pełni rolę CTA wizualnego.

**`IsometricCubeElement`**
Sześcian izometryczny — trzy `<polygon>` (góra/lewa/prawa ściana). Fill `#2F0D2F` / `#1C051C`, stroke `#4D194D`. Filter purpleGlow na górnej ścianie. Węzeł sieci Web3. Obecny w Archetyp B.

**`WavyNetworkPath`**
Falowa ścieżka Q-bezier łącząca węzły sieci. `stroke="#4D194D"`, stroke-width 0.75, opacity 0.35. Filter purpleGlow. Obecna w Archetyp B — wizualizacja przepływu danych on-chain.

**`NetworkNodeDot`**
Węzeł sieci — `<circle r=3 fill="#CCF7F4">` z tealGlow (stdDeviation 1). Obecny w Archetyp B na krawędziach kafla i centrum.

**`OrthoCircuitPath`**
Ortogonalna ścieżka schematu technicznego pod kątem 90°/45°. `stroke="#E0F2F2"`, stroke-width 0.75, opacity 0.65. Symuluje płytę PCB / schemat serwera. Obecna w Archetyp C.

**`CircuitJunctionDot`**
Węzeł połączeń na ścieżce ortogonalnej — `<circle r=1.5 fill="#CCF7F4">` z ciemnym obwodem `stroke="#001717"`. Wizualizuje punkt rozgałęzienia logicznego. Obecny w Archetyp C.

---

## FILTRY SVG (SYSTEM POŚWIAT)

**`GoldGlowFilter`**
`<filter id="goldGlow">` — podwójny `feGaussianBlur` (stdDeviation 1.5 + 3.5) z `feMerge` (blur2 → blur1 → SourceGraphic). Stosowany wyłącznie na elementach `--gold-400`. `filterUnits="userSpaceOnUse"` — stała grubość efektu niezależna od skalowania.

**`PurpleGlowFilter`**
`<filter id="purpleGlow">` — podwójny `feGaussianBlur` (stdDeviation 2.5 + 5.5) z `feMerge`. Szerszy blur — symuluje świetlówkę za zmatowionym szkłem. Stosowany na węzłach izometrycznych Archetyp B.

**`TealGlowFilter`**
`<filter id="tealGlow">` — pojedynczy `feGaussianBlur` (stdDeviation 1) z `feMerge`. Subtelny, stosowany na węzłach sieci (`NetworkNodeDot`). Nie przytłacza, sygnalizuje łączność.

---

## TŁA GRADIENTOWE

**`BackgroundGradientLinear`**
Gradient liniowy tła wspólny dla wszystkich trzech archetypów: `x1="100%" y1="0%" x2="0%" y2="0%"`. Przejście: `#001717 → #003737 → #001111`. Symuluje przestrzenną głębię — źródło światła z prawej, cień w lewym rogu.

---

## KOMPONENTY REACT — WRAPPERY

**`SVGPatternBackground`**
Wrapper React przyjmujący prop `archetype: 'tactical' | 'web3' | 'clinical'`. Renderuje odpowiedni SVG jako `position: fixed` lub `position: absolute` tło. `width="100%" height="100%"`, `preserveAspectRatio="xMidYMid slice"`.

**`SVGPatternLayer`**
Warstwa pozycjonująca SVG tło za zawartością strony. Z-index: base (0-10) — poniżej wszystkich komponentów interaktywnych. `pointer-events: none` — nie przechwytuje kliknięć.

**`ArchetypeThemeProvider`**
Context Provider przypisujący archetyp tła do konkretnych widoków aplikacji. Konfiguracja: `Public Profile → tactical`, `Wallet/Web3 → web3`, `Analytics/Studio → clinical`.

---

## MAPOWANIE ARCHETYPÓW NA STRONY

| Strona | Archetyp | Uzasadnienie |
|---|---|---|
| **Public Profile / Onboarding** | `TacticalBackgroundSVG` | Złoty celownik jako CTA konwersji — nawigacja do wsparcia twórcy |
| **Wallet / Support / Modal płatniczy** | `Web3NodeBackgroundSVG` | Fioletowe węzły sieci sygnalizują łączność on-chain, USDC flow |
| **Analytics / Growth / Studio** | `ClinicalDatabaseBackgroundSVG` | Brak filtrów — ostrość na Retina/4K, czytelność danych finansowych |

---

## INTEGRACJA Z ISTNIEJĄCYMI KOMPONENTAMI

**`BentoCardOverlay`**
`BentoCard` (dok. 2) z `SVGPatternLayer` jako tłem karty zamiast czystego `--teal-800`. Archetyp clinical dla kart analitycznych, tactical dla kart profilu.

**`ModalBackdropWithPattern`**
`Backdrop` (dok. 1, z-index: 200) z `Web3NodeBackgroundSVG` jako subtekst — fioletowe węzły widoczne przez półprzezroczysty overlay podczas operacji płatniczych USDC.

**`HeroSectionBackground`**
Sekcja hero Public Profile z `TacticalBackgroundSVG` + `FloatingCTA` (dok. 1) wyłaniającym się po 200px scroll nad wzorem taktycznym.

# MASTER COMPONENT REGISTRY — TipJar+
## Źródło: Dokumenty 1–5 | Łącznie: 5 dokumentów specyfikacyjnych

---

## FUNDAMENT SYSTEMU — TOKENY I PROVIDERY

**`DesignTokenProvider`**
Globalny CSS Variables provider. Eksportuje całą paletę kolorów, spacing, fonty, ease curves. Jedyne źródło prawdy systemu. Zmiana tu propaguje się na cały system.

**`ZIndexTokenProvider`**
Sub-provider warstw z-index: `base (0-10)` / `sticky (100)` / `overlay (200)` / `toast (300)` / `modal (400)` / `tooltip (500)`. Naked values (`z-index: 9999`) traktowane jako błąd lintera.

**`TypographyProvider`**
Konfiguracja par typograficznych: `Mukta Malar Light 300` (nagłówki, tracking +0.05em) + `IBM Plex Sans` (body, labels) + `IBM Plex Mono` (dane finansowe, adresy USDC).

**`AnimationTimingTokens`**
CSS Variables dla krzywych i czasów: `--ease-tabs: cubic-bezier(0.2, 0.0, 0, 1)`, `--ease-standard: cubic-bezier(...)`, `--ease-spring`, `--duration-tabs: 0.4s`. Jeden punkt zmiany timingu dla całego systemu.

**`ShimmerTokens`**
CSS Variables dla skeleton: `--skeleton-base: var(--teal-800)`, `--skeleton-shine: var(--teal-700)`. Centralna zmiana palety bez ingerencji w logikę animacji.

**`InterpolateSizeRoot`**
Globalna deklaracja `:root { interpolate-size: allow-keywords; }`. Aplikowana warunkowo przez `InterpolateSizeDetector` — tylko gdy `CSS.supports()` zwróci `true`.

**`AnimationStrategyProvider`**
Context Provider eksportujący aktywną strategię animacji: `'declarative'` (interpolate-size) | `'flip-waapi'` | `'legacy'`. Komponenty konsumują strategię bez własnej logiki detekcji.

**`ArchetypeThemeProvider`**
Context Provider przypisujący archetyp SVG tła do widoków: `Public Profile → tactical` / `Wallet → web3` / `Analytics → clinical`.

---

## 2. PRZYCISKI I AKCJE

**`CTAButtonGold`**
Główny przycisk konwersji. Gradient złota (`#FFD700 → #D4AF37 → #996515`), tekst `#003737`, WCAG 4.5:1. Cztery stany:
- **base**: gradient metaliczny
- **hover**: `translateY(-2px)` + gold box-shadow
- **focus**: fioletowy focus ring, offset 3px, inwersja palety (tło teal, tekst złoty)
- **disabled**: desaturacja, ghost state, opacity drop

**`DebouncedButton`**
Przycisk akcji transakcyjnych z debouncingiem 300ms. W ms=0 drop opacity + `cubic-bezier --ease-standard 200ms`. Blokada ponownego kliknięcia. Eliminuje rage-click i double-submit do Circle API.

**`DebouncedButtonLight`**
Wersja 150ms dla akcji nawigacyjnych i wyszukiwania. Zachowuje poczucie real-time reaktywności bez przeciążenia XHR.

**`ButtonLoadingState`**
Wizualny stan ładowania przycisku — opacity drop + `SpinnerSm` wewnątrz. Zamyka pętlę motoryczną użytkownika w <100ms.

**`ButtonWithSpinner`**
`DebouncedButton` zintegrowany ze `SpinnerSm`. Spinner zastępuje etykietę w ms=0 kliknięcia. Zero layout shift — spinner 24px mieści się w standardowym paddingu przycisku 32-48px.

---

## 3. TOGGLETIP / DYMKI

**`ToggleTip`**
Dymek informacyjny. Limit hard: 80 znaków. Trigger: click/tap (nie hover na mobile). Auto-dismiss po 3s. Z-index: 500. Tło `--bg-surface-elevated (var(--teal-700))`, tekst `--text-secondary (#D6EBEB)`, akcent `--purple-300`.

**`ToggleTipTrigger`**
Ikona `?` lub `i` aktywująca dymek. Focus/click desktop, tap mobile. Brak hover na mobile — eliminuje archaiczny konflikt dostępności (aria-describedby fallacy).

**`ToggleTipContent`**
Kontener treści: border-radius, `--shadow-modal`, wyłącznie plain text, zero HTML wewnątrz, zero linków. Brak blokowania interfejsu poniżej.

---

## 4. FLOATING ELEMENTS

**`FloatingCTA`**
Złoty pływający przycisk akcji „Support / Wesprzyj". Z-index: sticky (100), kolor `--gold-400`. Pojawia się po ≥200px scroll w dół, znika natychmiast przy scroll w górę (1 klatka `--ease-spring`). Jeden na ekran — reguła absolutna. Pozycja: dolna strefa kciuka mobile.

**`ScrollStateMachine`**
Hook klienta śledzący oś Y. Threshold: ≥200px → show. Jakikolwiek scroll w górę → hide. Żadna inna logika nie override'uje tego stanu. Wyliczany po stronie klienta.

**`FloatingCTAWrapper`**
Kontener z hardware acceleration (`transform`, `will-change`). Pozycjonowanie: tuż nad sticky bottom bar. Animacja wejścia/wyjścia `--ease-spring`.

---

## 5. SYSTEM POWIADOMIEŃ

**`ToastMessage`**
Pojedynczy toast: success / error / info. Auto-dismiss, brak przycisku zamknięcia. Tło teal, akcent fioletowy lub złoty zależnie od typu. Nigdy nie oczekuje na interakcję zamykającą.

**`ToastContainer`**
Globalny manager kolejki toastów. Z-index: 300 (`--z-toast`). Desktop: prawy dolny róg. Mobile: góra ekranu (nie koliduje z `FloatingCTA`). Singleton po stronie klienta.

**`ToastManager`**
Serwis NestJS/globalny orchestrator stanu powiadomień — deleguje wyświetlanie poza komponenty lokalne. Singleton.

---

## 6. FORMULARZE I INPUTY

**`GlowBorderInput`**
Pole tekstowe z gradientowym obramowaniem teal→fiolet via pseudo-element `::before` + `mask-composite: exclude`. Stan default: subtelna poświata. Stan focus: wzmocniony fiolet, wyostrzenie. Tło wnętrza: `#003737`.

**`GlowBorderTextarea`**
Wieloliniowa wersja `GlowBorderInput`. Identyczna mechanika poświaty. Używana w edycji bio, opisów.

**`FormFieldWithFeedback`**
Wrapper pola z natychmiastowym optycznym potwierdzeniem stanu (focus / error / saved). Zero silent timeout. Każda zmiana musi dać sygnał wizualny.

**`TransactionalForm`**
Formularz operacji finansowych (wypłata USDC, parametry on-chain). Integruje: `GlowBorderInput` + `DebouncedButton` + `ModalShell` + feedback stanu. Używa `Prisma.Decimal` z `ROUND_DOWN` po stronie backendu.

**`GlassToggle`**
Przełącznik stanów (premium features). Track: glassmorphism — `backdrop-filter: blur(10px)`, opacity warstwy 10-15%. Thumb: złota sfera `--gold-400`. Hardware acceleration: `transform: translateZ(0)`.

**`DebouncedInput`**
Pole tekstowe z debouncingiem 150ms do wyszukiwania profili i edycji nazwy twórcy. Real-time reaktywność bez przeciążenia XHR/Fetch.

**`DebouncedSearchBar`**
Specjalizacja `DebouncedInput` dla wyszukiwarki profili — 150ms delay, client-side rendering.

---

## 7. KARTY I LAYOUT

**`BentoCard`**
Bazowy moduł siatki. Cienkie obramowanie gradient teal→fiolet via pseudo-element. Delikatna fioletowa poświata na krawędzi. Tło: `#003737`. Spacing: wielokrotności 8px.

**`BentoCardDouble`**
Karta 2-kolumnowa × 2-rzędowa. Sygnalizuje hierarchię wagą wizualną — większy moduł = wyższy priorytet informacyjny. Redukuje zmęczenie decyzyjne.

**`BentoGrid`**
Kontener 12-kolumnowej siatki. `display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--spacing-md)`. Karty definiują własne `grid-column: span X`.

**`MasonryGrid`**
Layout dla dynamicznych treści asymetrycznych (strumienie aktywności, galerie). `grid-auto-flow: dense` jako fallback. Docelowo `grid-template-rows: masonry` gdy standaryzacja CSS.

**`BentoCardWithTabs`**
`BentoCard` z `AnimatedTabContainer` wewnątrz — np. karta analityki z zakładkami Week / Month / All Time. Bento Grid nie skacze przy zmianie zakładki.

**`BentoCardOverlay`**
`BentoCard` z `SVGPatternLayer` jako tłem karty zamiast czystego `#003737`. Archetyp clinical dla kart analitycznych, tactical dla kart profilu.

---

## 8. MODALE I OVERLAY

**`ModalShell`**
Okno modalne. Z-index: 400 (`--z-modal`). Tło: `var(--teal-800)`. Nieprzebijalny szczyt stosu dla operacji płatniczych. Ostra krawędź border-radius.

**`Backdrop`**
Półprzezroczysty overlay przyciemniający. Z-index: 200 (`--z-overlay`). Opcjonalny blur filter. Fizycznie izoluje modal od warstw analitycznych spod spodu.

**`ModalWithSpinner`**
`ModalShell` z `SpinnerLg` na overlay podczas inicjalizacji operacji płatniczej. Z-index: modal (400) + spinner wewnątrz.

**`ModalWithAnimatedTabs`**
`ModalShell` z `AnimatedTabContainer` wewnątrz — ustawienia portfela z zakładkami Wallet / Notifications / Security. Płynna zmiana wysokości modalu.

**`ModalBackdropWithPattern`**
`Backdrop` z `Web3NodeBackgroundSVG` jako subtekstem — fioletowe węzły widoczne przez półprzezroczysty overlay podczas operacji USDC.

---

## 9. PROFIL TWÓRCY

**`CreatorAvatar`**
Awatar w technice strukturyzowanego pixel art (kwadratowa siatka bloków). Kontrast z płaską wektorową ikonografią — estetyka Retro-Modern / Y2K.

**`USBCBalanceBlock`**
Blok wartości salda. Font: `IBM Plex Mono`, kolor: `text-secondary`. Skoncentrowana fioletowa poświata (`box-shadow` z filtrem blur). Efekt holograficzny / neonowy sygnalizujący łączność on-chain.

**`PremiumCreatorBadge`**
Odznaka statusu premium. Gradient złoty (`#FFD700 → #D4AF37`). Skrajnie reglamentowana — wyłącznie dla statusów Premium Creator. Nie używać dekoracyjnie — utrata wartości psychologicznej złota.

**`CreatorProfileBento`**
Kompozycja bloku profilu w siatce Bento. Łączy: `CreatorAvatar` + `USBCBalanceBlock` + `PremiumCreatorBadge` + dane analityczne + flat web3 ikony.

---

## 10. TYPOGRAFIA

**`DisplayHeading`**
Nagłówki sekcji. Font: `Mukta Malar Light 300`, tracking `+0.05em`. Wyłącznie dla głównych tytułów. Emanuje galanterią na ciemnym tle teal.

**`SectionTitle`**
Tytuły bloków Bento. Font: `Mukta Malar Regular 400`, minimalnie poszerzony tracking.

**`BodyText`**
Teksty ciągłe i komunikaty. Font: `IBM Plex Sans Regular 400`, tracking naturalny.

**`FormLabel`**
Etykiety pól. Font: `IBM Plex Sans Medium 500`, tracking `-0.01em`.

**`CryptoDataText`**
Wartości finansowe i adresy portfeli. Font: `IBM Plex Mono Regular 400`. Wyraźne odróżnienie `I` od `l` — krytyczne dla adresów blockchain i hashów transakcji.

---

## 11. SPINNER — LOADING

**`TealPurpleSpinner`**
SVG spinner gradient złoto→fiolet (`--gold-400 → --purple-300`). Animacja podwójna: `rotate` (360°, linear, 2s) + `dash` (stroke-dasharray 1→90, ease-in-out, 1.5s). Efekt liquid motion.

**`SpinnerSm`** *(24px)*
Wariant inline — zastępuje etykietę wewnątrz przycisku. Stroke-width: 4.5 SVG units. Zero layout shift przy przejściu w stan loading.

**`SpinnerMd`** *(48px)*
Wariant dla kart, modali, ładowania sekcji. Stroke-width: 3.5 SVG units.

**`SpinnerLg`** *(72px)*
Wariant full-screen overlay — cold start aplikacji, krytyczne przejścia. Stroke-width: 3.0 SVG units. Rola brandingowa.

**`SpinnerGradientDef`**
Reużywalna definicja `<linearGradient>` w sekcji `<defs>` SVG. Gradient statyczny względem koła — obraca się razem z nim, tworząc mieszanie barw w ruchu.

---

## 12. SKELETON — LOADING

**`SkeletonBase`**
Bazowy element szkieletowy. Background: `--teal-800`. Border-radius: 4px. `transform: translateZ(0)` — fix Safari border-radius clipping.

**`SkeletonText`**
Prostokąt imitujący wiersz tekstu. Wysokość: 16px. Warianty: `w-100` (100%) i `w-80` (80%) — ostatni wiersz krótszy, symuluje koniec akapitu.

**`SkeletonTitle`**
Prostokąt imitujący nagłówek. Wysokość: 24px, szerokość: 70%. Komunikuje hierarchię typograficzną.

**`SkeletonImage`**
Prostokąt imitujący miniaturę/baner. Wysokość: 180px, szerokość: 100%. Proporcje 16:9.

**`SkeletonAvatar`**
Koło (`border-radius: 50%`) imitujące avatar w liście. Używany w Recent Supporters, komentarzach.

**`SkeletonBadge`**
Mały prostokąt imitujący badge statusu w tabelach transakcji.

**`SkeletonCardLayout`**
Kompozycja: `SkeletonImage` + `SkeletonTitle` + dwa `SkeletonText`. Gotowy placeholder dla `BentoCard`. `aria-hidden="true"`.

**`SkeletonListRow`**
Kompozycja: `SkeletonAvatar` + dwa `SkeletonText` + `SkeletonBadge`. Placeholder wiersza listy lub tabeli transakcji.

**`SkeletonBentoGrid`**
Placeholder całej siatki Bento podczas inicjalizacji widoku. Kilka `SkeletonCardLayout` w `BentoGrid`.

**`ShimmerLayer`**
Pseudoelement `::after` nakrywający skeleton. Gradient: `linear-gradient(110deg, transparent, --teal-700, transparent)`. `transform: translateX(-100% → 100%)`, linear, 2s infinite. GPU-accelerated.

---

## 13. SYSTEM ZAKŁADKOWY (TABS + ANIMACJE WYSOKOŚCI)

**`AnimatedTabContainer`**
Główny kontener zakładkowy. Hybrydowa strategia: `interpolate-size` (Chrome 129+) z fallbackiem FLIP+WAAPI. `overflow: clip`, `transition: height 0.4s cubic-bezier(0.2, 0.0, 0, 1)`.

**`TabNavigation`**
Pasek zakładek — lista przycisków wyzwalających zmianę panelu. Odpowiada wyłącznie za sygnał przełączenia.

**`TabPanel`**
Pojedynczy panel treści. Stan domyślny: `height: 0; overflow: clip`. Stan aktywny: `height: auto` (z interpolate-size) lub wartość wyliczona przez FLIP/WAAPI.

**`TabPanelInner`**
Wewnętrzny kontener izolujący zagnieżdżone elementy przed efektem `scaleY` (squish & stretch). Przy FLIP: odwrotna korekcja skali.

**`TabStateMachine`**
Zarządca 7 dyskretnych stanów: `idle → triggered → snapshot → mutated → animating → healing → settled`. Każde przejście ma zdefiniowany kontrakt wejścia/wyjścia.

**`OnboardingStepContainer`**
Wielostanowy kontener kroków onboardingu (5 kroków progresywnego profilowania twórcy). Implementuje `TabStateMachine` — każdy krok ma inną wysokość treści.

---

## 14. FLIP ANIMATION SYSTEM

**`FLIPAnimationController`**
Implementacja sekwencji First→Last→Invert→Play. Rejestruje `getBoundingClientRect().height` (First), mutuje DOM (Last), oblicza deltę geometryczną (Invert: `ΔY = first - last`), deleguje do WAAPI (Play). Zero Layout/Paint w trakcie animacji.

**`FLIPSnapshotCapture`**
Utility pobierająca `getBoundingClientRect()` przed mutacją DOM. Pasywna — nie wywołuje Forced Synchronous Layout.

**`FLIPInverter`**
Utility aplikujący `transform: scaleY(invertedRatio)` natychmiast po mutacji DOM, przed Paintem. Tworzy iluzję stabilności.

---

## 15. WEB ANIMATIONS API (WAAPI)

**`WAAPIHeightAnimator`**
Wrapper nad `element.animate()`. Przyjmuje keyframes z FLIP, czas z Design System Tokens, krzywą Béziera. Zwraca instancję `Animation` z API: `play()`, `pause()`, `reverse()`, `cancel()`.

**`WAAPIInterruptHandler`**
Obsługuje przerwanie animacji w locie. Wywołuje `currentAnimation.cancel()`, wylicza pozycję pośrednią, uruchamia nową instancję z punktu przerwania. Zero optycznego zgrzytu.

**`WAAPIAdditiveLayer`**
Addytywne animacje WAAPI — dodaje deltę wysokości bez niszczenia pierwotnego tempa. Używany gdy async fetch zmienia rozmiar panelu w trakcie animacji.

---

## 16. RESIZE OBSERVER

**`ResizeObserverAdapter`**
Wrapper nad `ResizeObserver API`. Obserwuje `contentRect` panelu. Wykrywa: doładowanie obrazów, fetch danych, załamanie tekstu. Nie wywołuje Layout Thrashingu.

**`RAFBatchedResizeHandler`**
Chroni `ResizeObserverAdapter` przed `ResizeObserver loop limit exceeded`. Odpowiedzi odkładane przez `window.requestAnimationFrame()` — zmiany tylko tuż przed nową klatką.

**`AdaptiveHealingLayer`**
Fail-safe równoległy z WAAPI. Po zakończeniu animacji weryfikuje rzeczywisty rozmiar przez `ResizeObserver`. Koryguje jeśli async dane zmieniły rozmiar w trakcie przejścia.

---

## 17. FEATURE DETECTION

**`InterpolateSizeDetector`**
Sprawdza wsparcie dla `interpolate-size` przez `CSS.supports()`. Chrome 129+ / Edge 129+ → tryb deklaratywny. Firefox 150 / Safari 26.4 → fallback FLIP+WAAPI.

**`ProgressiveEnhancementGuard`**
HOC implementujący `@supports(height: calc-size(auto, size))`. Chrome 129+: minimalna deklaracja CSS. Pozostałe: pełna orkiestracja JS.

**`CalcSizeExpander`**
Utility CSS używający `calc-size(auto, size + 20px)` dla paneli z marginesem buforowym. Automatycznie narzuca `interpolate-size` na element.

---

## 18. SVG BACKGROUNDS

**`TacticalBackgroundSVG`**
Archetyp A. Siatka teal + ramki L-shape + HUD markery + złoty celownik z goldGlow. Kafel 160×160px. Stosowalność: Public Profile, Onboarding hero.

**`Web3NodeBackgroundSVG`**
Archetyp B. Izometryczne sześciany 3D fioletowe + fale Q-bezier + węzły teal. Kafel 200×200px. Bezszwowość przez arytmetykę modularną. Stosowalność: Wallet, Modal płatniczy.

**`ClinicalDatabaseBackgroundSVG`**
Archetyp C. Ortogonalne ścieżki 90°/45° + węzły połączeń. Zero filtrów blur — perfekcja Retina/4K. Kafel 120×120px. Stosowalność: Analytics, Studio.

**`SVGPatternBackground`**
Wrapper React. Prop: `archetype: 'tactical' | 'web3' | 'clinical'`. Renderuje SVG jako tło. `pointer-events: none`.

**`SVGPatternLayer`**
Warstwa pozycjonująca SVG. Z-index: base (0-10) — poniżej wszystkich komponentów interaktywnych.

---

## 19. SVG ELEMENTY ATOMICZNE

**`CornerFrameElement`**
Ramka narożna L-shape. Stroke `#E0F2F2`, stroke-width 0.75. Archetypy A i C.

**`CoordinateGridElement`**
Siatka współrzędnych. Stroke `#ABE1E1`, stroke-width 0.5, opacity 0.08–0.15. Archetypy A i C.

**`HUDMarkerElement`**
Marker HUD z czterech `<rect>` 1×6px/6×1px. Kolor `--gold-400`. `<rect>` zamiast `<line>` — obejście błędu GPU (poświata nie znika).

**`GoldReticleElement`**
Celownik złoty — dwa koncentryczne circles + punkt centralny. Filter goldGlow. Jedyny element złoty w tle.

**`IsometricCubeElement`**
Sześcian izometryczny z trzech polygonów. Fill `#2F0D2F / #1C051C`, stroke `#4D194D`. Archetyp B.

**`WavyNetworkPath`**
Falowa ścieżka Q-bezier łącząca węzły sieci. `stroke="#4D194D"`. Archetyp B.

**`NetworkNodeDot`**
Węzeł sieci `<circle r=3 fill="#CCF7F4">` z tealGlow. Archetyp B.

**`OrthoCircuitPath`**
Ortogonalna ścieżka schematu technicznego. Stroke `#E0F2F2`, opacity 0.65. Archetyp C.

**`CircuitJunctionDot`**
Węzeł połączeń `<circle r=1.5>` z ciemnym obwodem `stroke="#001717"`. Archetyp C.

---

## 20. SVG FILTRY

**`GoldGlowFilter`**
Podwójny feGaussianBlur (1.5 + 3.5) z feMerge. Wyłącznie dla `--gold-400`. `filterUnits="userSpaceOnUse"`.

**`PurpleGlowFilter`**
Podwójny feGaussianBlur (2.5 + 5.5). Symuluje świetlówkę za szkłem. Archetyp B.

**`TealGlowFilter`**
Pojedynczy feGaussianBlur (stdDeviation 1). Subtelny. Archetyp B, węzły sieci.

---

## 21. DOSTĘPNOŚĆ (A11Y)

**`ReducedMotionLayer`**
`@media (prefers-reduced-motion: reduce)`. Skeleton: wyłącza shimmer → statyczny blok `--teal-800`. Spinner: `animation-duration: 10s`.

**`SpinnerARIA`**
Wrapper nadający spinnerowi `role="status"` lub `role="progressbar"`. `aria-busy="true"` na kontenerze przy blokowaniu interakcji.

**`SkeletonARIA`**
Wrapper `aria-hidden="true"` + ukryty tekst `sr-only: "Loading content..."` dla kontenera nadrzędnego.

---

## 22. IKONOGRAFIA

**`FlatWeb3Icon`**
Ikony systemu: single-weight thin stroke, zero gradientów, zero wypełnień. Czysta geometria SVG. Kontrast do pixel art awatara.

---

## 23. ORCHESTRATION / GUARDS

**`AdaptiveOrchestrationLayer`**
Globalny provider synchronizujący: stan scrolla, modal open/close, toast queue, floating visibility. Eliminuje interferencję destruktywną między warstwami.

**`CognitiveLoadGuard`**
Dev-only HOC. Wymusza reguły wszystkich dokumentów: jeden `FloatingCTA` na ekran, brak naked z-index, limit 80 znaków w toggletipie, brak silent debouncing, brak SVG filtrów na `<line>`.

**`LoadingStateManager`**
Hook/context zarządzający przełączaniem: skeleton (ładowanie pasywne) ↔ spinner (ładowanie aktywne). Reguła: spinner dla akcji przycisku, skeleton dla kart/list.

**`ProgressiveFallback`**
Zastępuje skeleton komunikatem po 3–5s ładowania. Nigdy pusty ekran.

---

## 24. MAPOWANIE NA STRONY

| Strona | Kluczowe komponenty |
|---|---|
| **Public Profile** | `TacticalBackgroundSVG` + `CreatorProfileBento` + `FloatingCTA` + `ScrollStateMachine` + `PremiumCreatorBadge` + `ToggleTip` |
| **Wallet / Support** | `Web3NodeBackgroundSVG` + `ModalShell` + `Backdrop` + `TransactionalForm` + `USBCBalanceBlock` + `DebouncedButton` |
| **Analytics / Growth** | `ClinicalDatabaseBackgroundSVG` + `BentoGrid` + `MasonryGrid` + `BentoCardWithTabs` + `CryptoDataText` + `ToggleTip` |
| **Live Tools** | `DebouncedButton` + `ToastContainer` + `GlowBorderInput` + `SpinnerMd` + `AdaptiveOrchestrationLayer` |
| **Onboarding** | `TacticalBackgroundSVG` + `OnboardingStepContainer` + `DisplayHeading` + `CTAButtonGold` + `GlassToggle` + `ToggleTip` |
| **Studio / Desktop** | `ClinicalDatabaseBackgroundSVG` + `ZIndexTokenProvider` + `BentoCardDouble` + `AnimatedTabContainer` + `AdaptiveOrchestrationLayer` |

---

## STATYSTYKI REJESTRU

| Kategoria | Liczba komponentów |
|---|---|
| Tokeny i Providery | 8 |
| Przyciski i Akcje | 5 |
| Toggletip | 3 |
| Floating | 3 |
| Powiadomienia | 3 |
| Formularze | 5 |
| Karty i Layout | 6 |
| Modale | 5 |
| Profil Twórcy | 4 |
| Typografia | 5 |
| Spinner | 5 |
| Skeleton | 10 |
| Tabs + Animacje | 6 |
| FLIP System | 3 |
| WAAPI | 3 |
| Resize Observer | 3 |
| Feature Detection | 3 |
| SVG Backgrounds | 4 |
| SVG Atomy | 9 |
| SVG Filtry | 3 |
| Dostępność | 3 |
| Ikonografia | 1 |
| Orchestration | 4 |
| **ŁĄCZNIE** | **~123 komponenty** |


# OCENA KRYTYCZNA — MASTER COMPONENT REGISTRY TipJar+

## METODOLOGIA OCENY

Trzy kategorie:
- ✅ **SOLIDNE** — technicznie poprawne, standardowe, sprawdzone w produkcji
- ⚠️ **NIEDOPRACOWANE** — poprawny kierunek, ale implementacja wymaga weryfikacji
- ❌ **BAJKA** — nieweryfikowalne, przesadzone, pseudonaukowe lub niemożliwe do wdrożenia tak jak opisano

---

# DOKUMENT 1 — Toggletip / Debouncing / Z-index / Floating

## ✅ SOLIDNE

**Skala z-index jako tokeny CSS**
Standardowa, powszechnie stosowana praktyka (Carbon Design System, Salt DS, USWDS). Eliminacja naked values przez linter — realnie wykonalne przez `eslint-plugin-css-modules` lub custom Stylelint rule.

**

## ⚠️ NIEDOPRACOWANE

**Limit 80 znaków w ToggleTip**
Kierunek słuszny (krótkie komunikaty), ale „80 znaków" to liczba arbitralna, nie standard. [Inference] Nie istnieje badanie kliniczne definiujące 80 znaków jako granicę sakad dla tooltipów.

**Auto-dismiss po 3 sekundach**
Realnie wykonalne, ale 3s to arbitralna wartość. WCAG 2.1 kryterium 2.2.1 wymaga możliwości przedłużenia czasu — auto-dismiss bez możliwości przedłużenia może być **niezgodny z WCAG**. Wymaga weryfikacji kontekstu użycia.

**Jeden FloatingCTA na ekran jako „reguła absolutna"**
Słuszna praktyka UX, ale technicznie nieegzekwowalna przez kod bez `CognitiveLoadGuard` działającego w runtime — a runtime dev-only guard nie chroni produkcji.

## ❌ BAJKA

**„Kortyzol", „mikroskurcze mięśni", „układ limbiczny", „kora przedczołowa kapituluje"**
[Speculation] Neurobiologiczne narracje w dokumencie są niewnweryfikowalną pseudonauką w kontekście UX. Badania eye-trackingowe istnieją, ale opisane w dokumencie mechanizmy neurologiczne są dramatyzacją bez cytowanych źródeł pierwotnych. Cytowane źródła w dokumencie to blogi i Stack Overflow — nie peer-reviewed neuroscience.

**„Natychmiastowe zniszczenie waluty zaufania" / „scam-like aesthetic"**
[Speculation] Twierdzenie niemierzalne. Korelacja między złym z-index a utratą konwersji nie jest udowodniona w cytowanych źródłach.

**„Linter Error" dla naked z-index values**
[Inference] Możliwe do skonfigurowania w Stylelint, ale nie jest to domyślne zachowanie żadnego standardowego narzędzia. Dokument przedstawia to jako fakt systemowy — jest to decyzja konfiguracyjna wymagająca własnej implementacji reguły.

---

# DOKUMENT 2 — Styl / Architektura Wizualna

## ✅ SOLIDNE

**IBM Plex Mono dla adresów blockchain**
Technicznie uzasadnione. IBM Plex Sans odróżnia `I` od `l` przez szeryfy na wersalikach — weryfikowalne przez inspekcję fontu. Kluczowe dla czytelności hashy.

**Glassmorphism z `backdrop-filter: blur()` + `transform: translateZ(0)`**
Technicznie poprawne. `translateZ(0)` promuje element do warstwy kompozytora — standardowa optymalizacja. `backdrop-filter` działa w Chrome/Edge/Safari, w Firefox wymaga flagi (stan 2024).

**Gradient border przez pseudo-element + `mask-composite: exclude`**
Technicznie poprawna technika. Weryfikowalna — implementacja istnieje i działa w nowoczesnych przeglądarkach. `mask-composite` ma ograniczone wsparcie (Chrome 120+, Safari 15.4+, Firefox 53+).

**`grid-auto-flow: dense` jako fallback dla Masonry**
Poprawne — jest to realny fallback, stosowany przez produkcyjne implementacje. Nie daje identycznego efektu co Masonry, ale minimalizuje puste przestrzenie.

## ⚠️ NIEDOPRACOWANE

**`grid-template-rows: masonry` jako docelowe rozwiązanie**
[Inference] Stan na 2024/2025: specyfikacja jest eksperymentalna, dostępna za flagą w Firefox. Chrome implementuje alternatywną składnię. Dokument prezentuje to jako docelowe rozwiązanie produkcyjne — wymaga `@supports` fallbacku i śledzenia statusu specyfikacji.

**Pixel art awatar jako „hołd dla początków ery cyfrowej"**
Kierunek estetyczny — subiektywny wybór designera, nie oceniać technicznie. Jednak renderowanie pixel art przez CSS (image-rendering: pixelated) ma ograniczenia skalowania na ekranach Retina — wymaga osobnej implementacji per rozdzielczość.

**Mukta Malar jako font nagłówkowy**
Font istnieje w Google Fonts — weryfikowalne. Jednak jego wsparcie dla Unicode poza skryptami łacińskimi i indyjskimi jest ograniczone. Dla globalnego SaaS może wymagać subsetting.

## ❌ BAJKA

**„Badania śledzenia wzroku jednoznacznie wskazują..."**
[Unverified] Dokument cytuje ogólne twierdzenie o eye-trackingu bez żadnego źródła pierwotnego. Cytowane linki to blogi o trendach Bento Grid (Medium, Landdding) — nie badania naukowe.

**Złoto `#FFD700` jako „monopol luksusu"**
[Speculation] Psychologiczne twierdzenie o „wartości psychologicznej złota" i jej utracie przy nadużyciu jest marketingowym językiem, nie weryfikowalną zasadą projektowania. Kierunek użytkowy jest słuszny (reglamentacja CTA), ale uzasadnienie jest pseudonaukowe.

**Gradient teal jako rozwiązanie „pro-energetyczne Eco-Web Design"**
[Speculation] Twierdzenie o oszczędności energii na OLED przez użycie `#003737` zamiast szarości jest technicznie częściowo poprawne (ciemne piksele OLED zużywają mniej energii), ale „Eco-Web Design" jako termin i jego wpływ na TipJar+ jest dramatyzacją bez mierzalnych danych.

---

# DOKUMENT 3 — Spinner / Skeleton

## ✅ SOLIDNE

**`transform: translateX` na `::after` zamiast `background-position`**
Technicznie poprawne i weryfikowalne. Transformacje CSS działają na Compositor Thread, omijając Layout i Paint. To standardowa rekomendacja Google Web Fundamentals / web.dev.

**Nieliniowa progresja `stroke-width` SVG dla różnych rozmiarów**
Technicznie uzasadniona. Optyczne proporcje przy skalowaniu SVG są realnym problemem. Tabela parametrów (4.5 / 3.5 / 3.0 SVG units) — [Inference] wartości są propozycją, nie standardem branżowym, ale kierunek jest poprawny.

**`stroke-dasharray` + podwójna animacja dla liquid motion**
Technicznie poprawna i powszechnie stosowana technika (Material Design spinner używa identycznej mechaniki). Weryfikowalne przez inspekcję kodu Chrome DevTools na spinner.material.io.

**`aria-hidden="true"` dla skeletonów + `role="status"` dla spinnerów**
Poprawne i zgodne ze standardem WAI-ARIA 1.2. Weryfikowalne przez dokumentację W3C.

**`prefers-reduced-motion` jako warunek wyłączenia animacji**
Wymaganie WCAG 2.1 kryterium 2.3.3 (AAA) i dobre praktyki kryterium 2.3.1. Technicznie proste do implementacji.

## ⚠️ NIEDOPRACOWANE

**`transform: translateZ(0)` jako fix Safari border-radius clipping**
[Inference] Historycznie poprawny hack (pre-2020), ale w nowszych wersjach Safari może nie być konieczny i może powodować nieoczekiwane warstwy kompozytora. Wymaga testowania na docelowych wersjach Safari.

**Skeleton tylko dla elementów w viewport (lazy loading skeletonów)**
Kierunek poprawny, ale implementacja z `IntersectionObserver` dla skeletonów (nie treści) jest niestandardowa i może skomplikować logikę komponentów. Praktycznie — standard to renderowanie wszystkich skeletonów widocznych w początkowym viewport.

## ❌ BAJKA

**„Jedwabisty ruch jak systemy operacyjne urządzeń mobilnych nowej generacji"**
[Speculation] Porównanie do iOS/Android jako punkt odniesienia dla CSS spinnera — niemierzalne twierdzenie marketingowe.

**Wpływ gradientu `--teal-800` na zużycie energii OLED — sekcja 9**
[Inference] Technicznie częściowo poprawne (OLED + ciemne piksele = mniejszy pobór), ale „Eco-Web Design" dla koloru spinnera to dramatyzacja. Różnica poboru energii dla jednego spinnera 72px jest pomijalnie mała.

---

# DOKUMENT 4 — Animacje Wysokości / Tabs

## ✅ SOLIDNE

**Problem `transition: height` do wartości `auto` — brak natywnego wsparcia (pre-2024)**
Technicznie weryfikowalne i historycznie poprawne. Przeglądarki do Chrome 129 nie interpolowały wartości słownikowych.

**Technika FLIP (First/Last/Invert/Play)**
Realnie istniejący i udokumentowany paradygmat. Stworzony przez Paula Lewis (Google). Weryfikowalne przez css-tricks.com/animating-layouts-with-the-flip-technique i web.dev.

**`ResizeObserver` jako zamiennik `window.resize`**
Technicznie poprawne. `ResizeObserver` monitoruje lokalne węzły DOM, `window.resize` tylko viewport. Weryfikowalne przez MDN.

**`ResizeObserver loop limit exceeded` jako realny błąd**
Weryfikowalne — błąd istnieje w Chromium bug tracker. Rozwiązanie przez `requestAnimationFrame` jest udokumentowane i stosowane.

**`interpolate-size: allow-keywords` — Chrome 129+**
[✓ Verified per dokument] Wsparcie Chrome 129+, Edge 129+ — weryfikowalne przez caniuse.com. Brak wsparcia Firefox 150 i Safari 26.4 — zgodne z danymi z dokumentu.

**`calc-size()` — Chrome 129+**
Weryfikowalne przez caniuse.com i MDN. Status na 2025: eksperymentalne, Chrome 129+ z flagą, następnie stabilne.

**Web Animations API (`element.animate()`)**
Realny, natywny browser API. Weryfikowalny przez MDN. Wsparcie: wszystkie główne przeglądarki od 2020+.

## ⚠️ NIEDOPRACOWANE

**Finite State Machine z 7 stanami dla Tabs**
Kierunek architektoniczny poprawny (XState lub własna implementacja), ale złożoność 7 stanów dla komponentu zakładkowego może być overengineering dla większości przypadków użycia TipJar+. [Inference] Realnie: 3-4 stany wystarczają dla standardowych przypadków.

**Hybrydowa strategia FLIP + WAAPI + ResizeObserver + interpolate-size**
Każda technika osobno jest solidna. Kombinacja wszystkich czterech w jednym komponencie — [Inference] znacząco zwiększa złożoność, powierzchnię błędów i koszt utrzymania. Produkcyjnie: wybiera się jedną lub dwie, z fallbackiem.

## ❌ BAJKA

**„Śmiertelna pętla" / „ratowanie responsywności sprzętu przed awarią"**
[Speculation] `ResizeObserver loop limit exceeded` przerywa callback, ale nie powoduje awarii sprzętu. Dramatyzacja bez podstaw technicznych.

**Layout Thrashing jako „Druzgotanie Układu"**
Tłumaczenie i dramatyzacja referencji — technicznie Layout Thrashing jest realnym problemem wydajnościowym, ale nie „druzgotaniem". Język emocjonalny w dokumencie technicznym.

**„Przeglądarka zostaje zapętlona w niekończącej się pętli odpytań"**
[Inference] Częściowo poprawne w opisie mechanizmu, ale „niekończąca się pętla" jest nieprecyzyjna — przeglądarka aktywuje bezpiecznik i zatrzymuje callbacki, nie zawiesza się.

---

# DOKUMENT 5 — SVG Backgrounds

## ✅ SOLIDNE

**`patternUnits="userSpaceOnUse"` dla stałej grubości linii**
Technicznie poprawne i weryfikowalne. `userSpaceOnUse` vs `objectBoundingBox` — realna różnica w zachowaniu przy skalowaniu SVG. Dokumentacja W3C SVG.

**`<rect>` zamiast `<line>` dla elementów z `feGaussianBlur`**
Technicznie uzasadnione. Bezwymiarowe `<line>` (stroke bez fill, zero powierzchni) może znikać przy filtrowaniu przez blur na niektórych implementacjach GPU. Użycie `<rect width="1">` jako obejście — [Inference] poprawne obejście, choć nie znalazłem oficjalnej specyfikacji opisującej ten bug jako gwarantowany.

**Arytmetyka modularna dla bezszwowości wzoru**
Matematycznie poprawna koncepcja tile-based pattern design. Weryfikowalna geometrycznie.

**`feGaussianBlur` + `feMerge` dla efektu poświaty**
Standardowa technika SVG filter composition. Weryfikowalna przez MDN SVG Filter Primitives.

**Gradient liniowy tła `#001717 → #003737 → #001111`**
Prosta implementacja CSS/SVG — technicznie nieskomplikowana i poprawna.

## ⚠️ NIEDOPRACOWANE

**Trzy archetypy SVG jako system tła aplikacji**
Realnie wykonalne, ale performance SVG pattern jako tło pełnoekranowe z filtrami (`feGaussianBlur` na wielu elementach) może być kosztowne na słabszych urządzeniach. [Inference] Wymaga profilowania — szczególnie Archetyp B z purpleGlow na każdym kaflu siatki.

**`filterUnits="userSpaceOnUse"` z `width/height` równym rozmiarowi kafla**
Może powodować obcięcie efektu blur na krawędziach kafla jeśli blur „wychodzi" poza deklarowany obszar filtra. Wymaga `x="-10%" y="-10%" width="120%" height="120%"` dla poprawnego działania — dokument tego nie uwzględnia.

## ❌ BAJKA

**„Absorbujący światło otoczenia i minimalizujący zmęczenie wzroku" gradient tła**
[Speculation] Gradient SVG nie absorbuje światła otoczenia — to fizyczny niemożliwy opis dla pikseli ekranu. Zmęczenie wzroku zależy od luminancji, kontrastu i częstotliwości odświeżania — nie od konkretnego gradientu tła.

**„Fizycznie poprawne przejście tonalne"**
[Speculation] „Fizyczna poprawność" gradientu `#001717 → #003737` jest twierdzeniem bez definicji — żaden gradient RGB nie jest inherentnie „fizycznie poprawny". Termin perceptually uniform istnieje (OKLAB, CIELAB), ale dokument go nie stosuje.

---

# PODSUMOWANIE ZBIORCZE

| Kategoria | ✅ Solidne | ⚠️ Niedopracowane | ❌ Bajka |
|---|---|---|---|
| Z-index / Debouncing / Floating | 5 | 3 | 3 |
| Styl / Architektura Wizualna | 4 | 3 | 3 |
| Spinner / Skeleton | 5 | 2 | 2 |
| Animacje Wysokości / Tabs | 7 | 2 | 3 |
| SVG Backgrounds | 5 | 2 | 2 |
| **RAZEM** | **~26** | **~12** | **~13** |

---

# KLUCZOWE WNIOSKI

**Technicznie wiarygodne i warte implementacji:**
Z-index tokeny, debouncing z visual feedback, FLIP technique, Web Animations API, ResizeObserver + RAF, interpolate-size/calc-size z progressive enhancement, SVG patterns z `patternUnits`, skeleton przez `transform: translateX`.

**Wymaga weryfikacji przed implementacją:**
Masonry CSS (status specyfikacji), auto-dismiss 3s vs WCAG 2.2.1, `translateZ(0)` hack na nowych Safari, hybrydowa złożoność Tab FSM.

**Nie implementować jako opisano:**
Neurobiologiczne uzasadnienia (kortyzol, kora przedczołowa) — to język marketingowy, nie specyfikacja. Twierdzenia o „gwarantowanych" efektach konwersji — niemierzalne. Opisy „fizycznych" właściwości gradientów — pseudonaukowe.
