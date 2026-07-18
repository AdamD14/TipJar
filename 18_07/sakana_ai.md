## AccessibleFormProvider
Cel: Centralny kontekst zarządzania stanem błędów walidacji asynchronicznej, konfiguracją aria-live, aria-busy i automatycznym focusem po błędach.

## AccessibleForm
Cel: Opakowanie <form> z automatycznym wstrzyknięciem tabindex="-1" na kontenerze podsumowania błędów, obsługą onSubmit z asynchroniczną walidacją serwerową i wywołaniem .focus() na kontenerze błędów.

## AsyncValidationManager
Cel: Abstrakcyjny komponent/logika odpowiedzialna za przechwytywanie odpowiedzi HTTP z błędami walidacji, mapowanie ich na stan formularza i wyzwalanie powiadomień statusowych.

# Komponenty powiadomień i statusów

## ErrorSummaryContainer
Cel: Kontener na górze formularza (<div> lub <ul> z nagłówkiem), który wyświetla listę wszystkich błędów asynchronicznych z serwera; zawiera tabindex="-1" i jest miejscem, na który po błędzie jest automatycznie przenoszony fokus.

## ErrorSummaryList
Cel: Lista linków (<a>) wewnątrz ErrorSummaryContainer, gdzie każdy link wskazuje na konkretne pole z błędem (href="#field-id"), umożliwiając szybki skok nawigacyjny do problematycznego pola.

## GlobalStatusRegion
Cel: Ukryty dla wzroku kontener (sr-only), z aria-live="assertive", do którego wrzucane są globalne komunikaty statusowe (np. „Formularz zawiera 3 błędy”), gdy nie chcemy przenosić fokusu.

## PoliteLiveRegion
Cel: Region aria-live="polite" dla opóźnionych, nieinwazyjnych powiadomień (np. walidacja w locie po onBlur), które nie przerywają aktualnej interakcji.

## LoadingStatusIndicator
Cel: Komponent sygnalizujący stan ładowania asynchronicznego, który ustawia aria-busy="true" na formularzu/przycisku, aby czytniki wiedziały, że zawartość się zmienia.

# 🐡 Komponenty pól formularza

## AccessibleInput
Cel: Komponent <input> z automatycznym powiązaniem aria-describedby z kontenerem komunikatu błędu i dynamicznym ustawieniem aria-invalid w zależności od stanu walidacji.

## AccessibleSelect / AccessibleRadioGroup
Cel: Analogicznie jak AccessibleInput, ale dla <select> i grup radio – zapewnia powiązanie błędów walidacji z grupą pól i odpowiednie atrybuty ARIA.

## FieldErrorContainer
Cel: Kontener (<div> lub <span>) z unikalnym id, który wyświetla komunikat błędu tuż pod polem; ten id jest wiązany z polem przez aria-describedby.

## FieldLabel
Cel: <label> z automatycznym htmlFor i wsparciem dla opisów pomocniczych (help text), które mogą być również powiązane z aria-describedby.

# 🐬 Komponenty przycisków i nawigacji

## SubmitButton
Cel: Przycisk wysyłania formularza, który reaguje na stan loading/submitting z aria-busy i blokuje wielokrotne kliknięcia; współpracuje z AsyncValidationManager.

## SkipToFormLink
Cel: Link typu „Przejdź do formularza” (<a href="#form-id">), który pomaga użytkownikom klawiatury ominąć nawigację strony i szybko dostać się do głównej sekcji formularza.

## FocusTrap
Cel: Komponent do tymczasowego ograniczenia fokusu klawiatury w obrębie modala/formularza, gdy występują krytyczne błędy walidacji (np. płatności), aby zapobiec przypadkowemu opuszczeniu kontekstu.

# 🐳 Strony / katalogi (Next.js)

## pages/auth/login.tsx
Cel: Strona logowania z formularzem wykorzystującym AccessibleForm, ErrorSummaryContainer, AccessibleInput i GlobalStatusRegion do komunikacji błędów asynchronicznych (np. niepoprawne hasło, konto zablokowane).

## pages/auth/register.tsx
Cel: Strona rejestracji z walidacją dostępności loginu/hasła po stronie serwera, PoliteLiveRegion dla opóźnionych sprawdzeń i ErrorSummaryContainer.

## pages/checkout/index.tsx
Cel: Wieloetapowy formularz płatności (wizard), gdzie każdy krok korzysta z AccessibleForm, GlobalStatusRegion i FocusTrap dla krytycznych błędów walidacji karty/kodu pocztowego.

## pages/account/settings.tsx
Cel: Strona edycji danych użytkownika z asynchroniczną walidacją unikalności e-maila/nazwy użytkownika i PoliteLiveRegion dla powiadomień o dostępności.

## pages/forms/demo.tsx
Cel: Strona demonstracyjna z różnymi typami pól (input, select, radio, checkbox) i przykładowymi błędami asynchronicznymi, aby testować czytniki ekranu i nawigację klawiaturową.

# 🐋 Komponenty narzędziowe / utility

## FocusManager
Cel: Abstrakcyjny komponent/hook odpowiedzialny za deterministyczne przenoszenie fokusu po asynchronicznych odpowiedziach (np. .focus() na ErrorSummaryContainer lub pierwszym błędnym polu).

## AriaAttributesManager
Cel: Logika do dynamicznego przypisywania/oczyszczania aria-invalid, aria-describedby, aria-required w zależności od stanu walidacji.

## FormStateMachine (opcjonalnie z XState)
Cel: Maszyna stanów zarządzająca przejściami: idle → validating_async → submitting → success/error, aby uniknąć race conditions i zapewnić spójne powiadomienia ARIA.

## AccessibilityTestWrapper
Cel: Komponent do testów E2E/a11y, który symuluje czytniki ekranu i klawiaturę, weryfikując, czy komunikaty błędów są ogłaszane i czy fokus jest prawidłowo zarządzany.
Jeśli chcesz, mogę też zaproponować bardziej szczegółowy podział na katalogi (np. components/forms, components/a11y, pages/auth itd.) lub skupić się na konkretnym typie formularza (logowanie, checkout, multi-step wizard).

# Komponenty ogólne / layout

## AccessibleFormProvider
Cel: Centralny kontekst zarządzania stanem błędów walidacji asynchronicznej, konfiguracją aria-live, aria-busy i automatycznym focusem po błędach.

## AccessibleForm
Cel: Opakowanie <form> z automatycznym wstrzyknięciem tabindex="-1" na kontenerze podsumowania błędów, obsługą onSubmit z asynchroniczną walidacją serwerową i wywołaniem .focus() na kontenerze błędów.

## AsyncValidationManager
Cel: Abstrakcyjny komponent/logika odpowiedzialna za przechwytywanie odpowiedzi HTTP z błędami walidacji, mapowanie ich na stan formularza i wyzwalanie powiadomień statusowych.

# 🐠 Komponenty powiadomień i statusów
## ErrorSummaryContainer
Cel: Kontener na górze formularza (<div> lub <ul> z nagłówkiem), który wyświetla listę wszystkich błędów asynchronicznych z serwera; zawiera tabindex="-1" i jest miejscem, na który po błędzie jest automatycznie przenoszony fokus.

## ErrorSummaryList
Cel: Lista linków (<a>) wewnątrz ErrorSummaryContainer, gdzie każdy link wskazuje na konkretne pole z błędem (href="#field-id"), umożliwiając szybki skok nawigacyjny do problematycznego pola.

## GlobalStatusRegion
Cel: Ukryty dla wzroku kontener (sr-only), z aria-live="assertive", do którego wrzucane są globalne komunikaty statusowe (np. „Formularz zawiera 3 błędy”), gdy nie chcemy przenosić fokusu.

## PoliteLiveRegion
Cel: Region aria-live="polite" dla opóźnionych, nieinwazyjnych powiadomień (np. walidacja w locie po onBlur), które nie przerywają aktualnej interakcji.

## LoadingStatusIndicator
Cel: Komponent sygnalizujący stan ładowania asynchronicznego, który ustawia aria-busy="true" na formularzu/przycisku, aby czytniki wiedziały, że zawartość się zmienia.

# 🐡 Komponenty pól formularza

## AccessibleInput
Cel: Komponent <input> z automatycznym powiązaniem aria-describedby z kontenerem komunikatu błędu i dynamicznym ustawieniem aria-invalid w zależności od stanu walidacji.

## AccessibleSelect / AccessibleRadioGroup
Cel: Analogicznie jak AccessibleInput, ale dla <select> i grup radio – zapewnia powiązanie błędów walidacji z grupą pól i odpowiednie atrybuty ARIA.

## FieldErrorContainer
Cel: Kontener (<div> lub <span>) z unikalnym id, który wyświetla komunikat błędu tuż pod polem; ten id jest wiązany z polem przez aria-describedby.

## FieldLabel
Cel: <label> z automatycznym htmlFor i wsparciem dla opisów pomocniczych (help text), które mogą być również powiązane z aria-describedby.

# 🐬 Komponenty przycisków i nawigacji

## SubmitButton
Cel: Przycisk wysyłania formularza, który reaguje na stan loading/submitting z aria-busy i blokuje wielokrotne kliknięcia; współpracuje z AsyncValidationManager.

## SkipToFormLink
Cel: Link typu „Przejdź do formularza” (<a href="#form-id">), który pomaga użytkownikom klawiatury ominąć nawigację strony i szybko dostać się do głównej sekcji formularza.

## FocusTrap
Cel: Komponent do tymczasowego ograniczenia fokusu klawiatury w obrębie modala/formularza, gdy występują krytyczne błędy walidacji (np. płatności), aby zapobiec przypadkowemu opuszczeniu kontekstu.

# 🐳 Strony / katalogi (Next.js)

## pages/auth/login.tsx
Cel: Strona logowania z formularzem wykorzystującym AccessibleForm, ErrorSummaryContainer, AccessibleInput i GlobalStatusRegion do komunikacji błędów asynchronicznych (np. niepoprawne hasło, konto zablokowane).

## pages/auth/register.tsx
Cel: Strona rejestracji z walidacją dostępności loginu/hasła po stronie serwera, PoliteLiveRegion dla opóźnionych sprawdzeń i ErrorSummaryContainer.

## pages/checkout/index.tsx
Cel: Wieloetapowy formularz płatności (wizard), gdzie każdy krok korzysta z AccessibleForm, GlobalStatusRegion i FocusTrap dla krytycznych błędów walidacji karty/kodu pocztowego.

## pages/account/settings.tsx
Cel: Strona edycji danych użytkownika z asynchroniczną walidacją unikalności e-maila/nazwy użytkownika i PoliteLiveRegion dla powiadomień o dostępności.

## pages/forms/demo.tsx
Cel: Strona demonstracyjna z różnymi typami pól (input, select, radio, checkbox) i przykładowymi błędami asynchronicznymi, aby testować czytniki ekranu i nawigację klawiaturową.

# 🐋 Komponenty narzędziowe / utility

## FocusManager
Cel: Abstrakcyjny komponent/hook odpowiedzialny za deterministyczne przenoszenie fokusu po asynchronicznych odpowiedziach (np. .focus() na ErrorSummaryContainer lub pierwszym błędnym polu).

## AriaAttributesManager
Cel: Logika do dynamicznego przypisywania/oczyszczania aria-invalid, aria-describedby, aria-required w zależności od stanu walidacji.

## FormStateMachine (opcjonalnie z XState)
Cel: Maszyna stanów zarządzająca przejściami: idle → validating_async → submitting → success/error, aby uniknąć race conditions i zapewnić spójne powiadomienia ARIA.

## AccessibilityTestWrapper
Cel: Komponent do testów E2E/a11y, który symuluje czytniki ekranu i klawiaturę, weryfikując, czy komunikaty błędów są ogłaszane i czy fokus jest prawidłowo zarządzany.
Jeśli chcesz, mogę też zaproponować bardziej szczegółowy podział na katalogi (np. components/forms, components/a11y, pages/auth itd.) lub skupić się na konkretnym typie formularza (logowanie, checkout, multi-step wizard).

# 🐟 Komponenty layout / architektura przestrzeni

## BentoGridProvider
Cel: Centralny kontekst lub komponent opakowujący stronę, który definiuje 12-kolumnową siatkę CSS Grid (grid-template-columns: repeat(12, 1fr)), odstępy (gap) i podstawowe tokeny przestrzenne.

## BentoGridContainer
Cel: Kontener układu Bento, który pozwala dzieciom określać grid-column: span X i grid-row: span Y, tworząc hierarchię poprzez różne rozmiary modułów (np. większe karty na dashboard).

## MasonryGrid
Cel: Dynamiczny układ kaskadowy dla asymetrycznych treści (galerie NFT, strumienie wpisów, komentarze), który minimalizuje pionowe luki, wykorzystując grid-auto-flow: dense lub natywny grid-template-rows: masonry.

## GlassmorphismPanel
Cel: Podstawowy kontener z efektem mrożonego szkła (backdrop-filter: blur(...), półprzezroczyste tło), używany jako podkład dla modułów Bento i przełączników.

# 🐠 Komponenty typografii i tekstu

## TypographyProvider
Cel: Kontekst zarządzający czcionkami Mukta Malar i IBM Plex (Sans/Mono), skalą font-size, line-height i letter-spacing zgodnie z tabelą hierarchii z dokumentu.

## DisplayHeader
Cel: Wielki nagłówek w Mukta Malar (Light/Regular), z poszerzonym trackingiem, do sekcji typu „Dashboard Overview”.

## SectionTitle
Cel: Tytuł sekcji Bento w Mukta Malar (Regular), z minimalnie poszerzonym trackingiem, np. „Creator Statistics”.

## BodyText
Cel: Standardowy tekst ciągły w IBM Plex Sans (Regular), do opisów, komunikatów i artykułów.

## FormLabel
Cel: Etykieta pól formularza w IBM Plex Sans (Medium), ze zwężonym trackingiem, np. „Enter Wallet Address”.

## DataDisplay
Cel: Wyświetlanie wartości finansowych/kryptowalut w IBM Plex Mono (Regular), np. „14,500.50 USDC”, z zachowaniem wyrównania monospaced.

# 🐡 Komponenty interaktywne / CTA i kontrolki

## PrimaryCTAButton
Cel: Główny przycisk CTA w złotym gradiencie (baza #FFD700), z tekstem w Tealu, hover (podniesienie + cień), focus (fioletowy pierścień) i disabled (stłumione złoto).

## SecondaryButton
Cel: Przycisk pomocniczy z cienkim fioletowym obramowaniem i poświatą, bez złota, dla mniej krytycznych akcji.

## ToggleSwitch
Cel: Przełącznik z glassmorphism trackiem i złotą kulką thumb; obsługuje stany on/off z subtelnym blur tła.

## GlowInput / GlowTextarea
Cel: Pole wejściowe z cienkim gradientowym obramowaniem Teal→Fiolet i poświatą; podczas focusu/intensyfikuje się fiolet.

## FocusRingManager
Cel: Abstrakcyjny komponent/hook zapewniający spójne pierścienie focusu (fioletowy offset ring) dla wszystkich interaktywnych elementów, zgodnie z :focus-visible.

# 🐬 Komponenty kart / modułów Bento

## BentoCard
Cel: Podstawowa karta układu Bento z cienkim gradientowym obramowaniem i poświatą, tłem Teal i możliwością określenia span w siatce.

## CreatorProfileBlock
Cel: Centralny moduł profilu twórcy w Bento Grid, łączący pixel-art awatara z wektorowymi ikonami flat, sekcją USDC Balance i odznaką Premium Creator.

## USDCBalanceCard
Cel: Karta wyświetlająca saldo w IBM Plex Mono z intensywnym fioletowym połyskiem wokół wartości, podkreślająca łączność z blockchain.

## PremiumBadge
Cel: Odznaka „PREMIUM CREATOR” w złotym gradiencie, z tekstem w Tealu, umieszczana w profilu lub nagłówkach.

## ActivityStreamCard
Cel: Karta dla strumienia aktywności (posty, transakcje), która może mieć zmienną wysokość i być układana w 
MasonryGrid.

# 🐳 Komponenty wizualne / efekty

## GlowBorderWrapper
Cel: Opakowanie dla kart i inputów, które implementuje cienkie gradientowe obramowanie z poświatą za pomocą pseudo-elementów i mask CSS.

## LoadingSpinner
Cel: Spinner w formie cienkiego gradientowego ringa Teal→Fiolet z efektem motion blur (statyczne rozmycie sugerujące obrót).

## Web3StatusIndicator
Cel: Wskaźnik połączenia on-chain (np. kropka, pierścień) w fioletowym gradiencie, który pulsuje lub miga przy aktywności sieci.

## PixelArtAvatar
Cel: Awatar użytkownika renderowany jako niskorozdzielczościowy pixel art w kwadratowej siatce, zgodnie z estetyką retro-modern.

## FlatWeb3Icon
Cel: Biblioteka ikon wektorowych w stylu flat (cienka linia obrysowa), skalowalnych SVG, do nawigacji i operacji.

## 🐋 Strony / katalogi (Next.js)

## pages/dashboard/index.tsx
Cel: Główny dashboard z BentoGridContainer, zawierający moduły: CreatorProfileBlock, USDCBalanceCard, ActivityStreamCard, statystyki premium.

## pages/creator/[id].tsx
Cel: Strona profilu twórcy z rozbudowanym BentoGrid, pixel-art awatarem, odznaką premium, historią wpłat i galerią zasobów w MasonryGrid.

## pages/wallet/index.tsx
Cel: Portfel z tabelą transakcji w IBM Plex Mono, kartami sald i przyciskami CTA (Send/Receive) w złotym gradiencie.

## pages/checkout/tip.tsx
Cel: Strona wysyłania napiwku z formularzem GlowInput, PrimaryCTAButton i Web3StatusIndicator.

## pages/settings/index.tsx
Cel: Ustawienia użytkownika z ToggleSwitch (funkcje premium), polami konfiguracyjnymi i sekcjami w BentoGrid.

## pages/gallery/index.tsx
Cel: Galeria NFT/tworów w MasonryGrid, z kartami ActivityStreamCard i efektami poświaty na hover.

## pages/onboarding/welcome.tsx
Cel: Ekran powitalny z dużym DisplayHeader w Mukta Malar, złotym CTA i podkładem Teal z gradientem.

# 🐠 Komponenty narzędziowe / utility

## ColorThemeProvider
Cel: Kontekst z tokenami kolorów (Teal Base, Purple Web3 Accent, Premium Gold) jako CSS variables, zapewniający spójność palety.

## MotionBlurEffect
Cel: Abstrakcyjny komponent do symulowania motion blur przez statyczne rozmycie cieni/kształtów, używany w spinnerach i efektach hover.

## LayoutSpacer
Cel: Komponent pomocniczy do definiowania odstępów zgodnych z 8-punktowym rytmem (marginesy, paddingi), utrzymujący „oddech” układu.

## ResponsiveBentoAdapter
Cel: Logika lub wrapper dostosowujący BentoGrid do breakpointów mobilnych (zmiana spanów, upraszczanie hierarchii).

## DesignTokensExporter
Cel: Moduł eksportujący tokeny projektowe (kolory, czcionki, odstępy) do plików CSS/JS, aby zespoły frontendowe mogły je importować.
Jeśli chcesz, mogę też zaproponować bardziej szczegółowy podział na katalogi (np. components/layout, components/typography, components/buttons, components/cards, pages/dashboard itd.) lub skupić się na konkretnym obszarze (np. tylko komponenty związane z profilem twórcy lub tylko z typografią).

# 🐟 Komponenty zarządzania stanem i architektury animacji

## AnimatedTabsProvider
Cel: Centralny kontekst zarządzający stanem zakładek, wyborem aktywnej zakładki, strategią animacji (FLIP vs natywne CSS) i detekcją środowiska (interpolate-size/calc-size support).

## AnimationStateMachine
Cel: Maszyna stanów skończonych (FSM) dla zakładek: idle → measuring → mutating → animating → settled, zapobiegająca race conditions i niekontrolowanym przejściom.

## EnvironmentDetector
Cel: Komponent/hook sprawdzający wsparcie przeglądarki dla interpolate-size, calc-size, WAAPI i ResizeObserver; decyduje, czy używać natywnych CSS czy hybrydowej strategii FLIP+WAAPI.

# 🐠 Komponenty zakładek i kontenerów

## TabsContainer
Cel: Główny kontener układu zakładek, który zarządza pozycjonowaniem paneli, overflow (overflow: clip) i podstawową strukturą DOM.

## TabPanel
Cel: Pojedynczy panel zakładki z dynamiczną zawartością; obsługuje przejścia wysokości, izolację transformacji i współpracę z ResizeObserver.

## TabList
Cel: Lista przycisków/zakładek nawigacyjnych z odpowiednią semantyką ARIA (role="tablist", role="tab") i zarządzaniem fokusem.

## TabContentWrapper
Cel: Opakowanie treści zakładki, które może być skalowane/flipowane podczas animacji, z zachowaniem proporcji wewnętrznych elementów (tekst, obrazy).

# 🐡 Komponenty pomiarowe i obserwacyjne

## LayoutMeasurer
Cel: Abstrakcyjny komponent/hook do bezpiecznego odczytu wymiarów (getBoundingClientRect, scrollHeight) przed mutacją DOM, unikający layout thrashingu.

## ResizeObserverManager
Cel: Manager subskrybujący zmiany wymiarów kontenera zakładki; używa requestAnimationFrame do batchowania aktualizacji i zapobiega pętli ResizeObserver loop limit exceeded.

## AnimationScheduler
Cel: Komponent koordynujący wywołania requestAnimationFrame dla FLIP i WAAPI, zapewniający spójność klatek i unikanie przeciążenia wątku głównego.

# 🐬 Komponenty animacji (FLIP + WAAPI)

## FlipAnimationController
Cel: Implementacja strategii FLIP:
First – pomiar stanu początkowego,
Last – mutacja DOM i pomiar docelowy,
Invert – aplikacja transformacji odwrotnej,
Play – uruchomienie animacji WAAPI do stanu zerowego transform.

## WaapiAnimationInstance
Cel: Instancja animacji Web Animations API dla przejść wysokości; obsługuje play(), pause(), reverse(), cancel() i additive animations, delegując obliczenia do Compositor Thread.

## TransformProxy
Cel: Komponent opakowujący, który aplikuje transformacje (scaleY, translateY) podczas FLIP, jednocześnie kompensując skalowanie wewnętrznych elementów, aby uniknąć efektu „spłaszczenia”.

## KeyframeGenerator
Cel: Logika generująca klatki kluczowe WAAPI na podstawie zmierzonych delt wysokości i konfiguracji timing functions (np. cubic-bezier(0.2, 0.0, 0, 1)).

# 🐳 Komponenty wspierające UX i wydajność

## LayoutThrashingGuard
Cel: Mechanizm zapobiegający wymuszonym synchronicznym layoutom przez batchowanie operacji read/write i izolowanie pomiarów od mutacji.

## PerfMetricsTracker
Cel: Komponent do śledzenia FPS, CLS (Cumulative Layout Shift) i opóźnień podczas animacji zakładek; pomaga w debugowaniu i optymalizacji.

## LoadingPlaceholder
Cel: Placeholder dla asynchronicznie ładowanej treści w zakładkach, który minimalizuje skoki układu i zapewnia płynne przejście po załadowaniu danych.

## ErrorBoundaryAnimation
Cel: Fallback dla sytuacji, gdy animacja zawiedzie (np. brak wsparcia WAAPI/ResizeObserver), zapewniający przynajmniej podstawową płynność lub degradację do natychmiastowego przełączenia.

# 🐋 Strony / katalogi (Next.js)

## pages/dashboard/tabs-demo.tsx
Cel: Strona demonstracyjna z zakładkami o różnej objętości treści (krótkie opisy vs długie tabele), pokazująca działanie FLIP, WAAPI i natywnych CSS (interpolate-size jeśli dostępne).

## pages/docs/[section].tsx
Cel: Dokumentacja z zakładkami dla różnych sekcji (API, przykłady, FAQ), gdzie każda zakładka ma zmienną wysokość, a przejścia są płynne i zoptymalizowane.

## pages/settings/advanced.tsx
Cel: Ustawienia zaawansowane z zakładkami (np. „Bezpieczeństwo”, „Integracje”, „Logi”), gdzie przełączanie nie powoduje skoków interfejsu.

## pages/onboarding/steps.tsx
Cel: Wieloetapowy onboarding w formie zakładek, gdzie każdy krok ma inną wysokość, a animacje maskują czas ładowania kolejnych kroków.

## pages/analytics/[view].tsx
Cel: Dashboard analityczny z zakładkami dla różnych widoków (wykresy, tabele, podsumowania), wykorzystujący ResizeObserver do adaptacji do dynamicznych danych.

# 🐠 Komponenty narzędziowe / utility

## CssInterpolateSizeFallback
Cel: Komponent dostarczający fallback dla przeglądarek bez wsparcia interpolate-size/calc-size, np. poprzez warunkowe zastosowanie FLIP+WAAPI lub uproszczonych przejść.

## AnimationConfigProvider
Cel: Kontekst z tokenami animacji: duration, easing curves, opóźnienia, które są spójne w całej aplikacji i łatwe do modyfikacji.

## DomMutationLogger
Cel: Narzędzie developerskie do logowania mutacji DOM i wywołań ResizeObserver/WAAPI, pomagające w identyfikacji pętli i optymalizacji.

## ResponsiveTabsAdapter
Cel: Adapter dostosowujący zachowanie zakładek na urządzeniach mobilnych (np. przejście do accordion lub poziome scrollowanie), z zachowaniem płynnych przejść.

## A11yTabsManager
Cel: Komponent zapewniający dostępność zakładek: poprawne role ARIA, zarządzanie fokusem po przełączeniu, wsparcie klawiatury i czytników ekranu.
Jeśli chcesz, mogę też zaproponować bardziej szczegółowy podział na katalogi (np. components/animation, components/tabs, hooks/useFlipAnimation, utils/waapi itd.) lub skupić się na konkretnym wzorcu (np. tylko FLIP, tylko ResizeObserver, tylko natywne CSS z interpolate-size).

# 🐟 Komponenty wskaźników ładowania ogólne

## LoadingProvider
Cel: Centralny kontekst zarządzający globalnym stanem ładowania, strategią spinner vs skeleton, detekcją prefers-reduced-motion i konfiguracją timingów.

## LoadingBoundary
Cel: Komponent opakowujący sekcje aplikacji, który automatycznie przełącza między spinnerem/skeletonem a treścią w zależności od stanu ładowania (np. fetch danych).

# 🐠 Komponenty Spinner (złoto-fioletowy)

## Spinner
Cel: Podstawowy komponent spinnera w SVG z gradientem złoto-fioletowym (--gold-400 → --purple-300), obsługujący trzy rozmiary: s (24px), m (48px), l (72px).

## SpinnerIcon
Cel: Czysty SVG spinnera zdefiniowany w <defs> z linearGradient, stroke-dasharray i stroke-dashoffset do płynnej animacji „liquid motion”.

## SpinnerContainer
Cel: Opakowanie spinnera z odpowiednimi klasami rozmiaru (size-s, size-m, size-l) i zarządzaniem ARIA (role="status", aria-busy).

## ButtonSpinner
Cel: Spinner w rozmiarze 24px osadzony w przycisku, zastępujący etykietę podczas ładowania bez zmiany rozmiaru przycisku (unikanie layout shift).

## FullPageSpinner
Cel: Overlay z dużym spinnerem (72px) na całej stronie, używany przy inicjalizacji aplikacji lub krytycznych przejściach między modułami.

# 🐡 Komponenty Skeleton Screen (ciemnoturkusowy gradient)

## SkeletonProvider
Cel: Kontekst dostarczający konfigurację skeletonów: bazowy kolor (--teal-800), kolor połysku (--teal-700), kąt gradientu, duration animacji.

## SkeletonRoot
Cel: Podstawowy komponent skeletonu z pseudoelementem ::after i animacją transform: translateX (GPU-accelerated shimmer).

## SkeletonText
Cel: Skeleton dla wierszy tekstu: seria prostokątów o wysokości odpowiadającej line-height, z zaokrąglonymi rogami i zmienną szerokością (np. w-100, w-80).

## SkeletonTitle
Cel: Skeleton dla tytułów/headerów – nieco wyższy niż zwykły tekst, z odpowiednią szerokością (np. 70%), symulujący nagłówek.

## SkeletonImage
Cel: Skeleton dla miniatur/avatarów: prostokąt lub koło (border-radius: 50%) z odpowiednimi proporcjami (np. 16:9 dla obrazów, kwadrat dla avatarów).

## SkeletonCard
Cel: Pełna karta skeletonu złożona z SkeletonImage, SkeletonTitle i kilku SkeletonText, odwzorowująca strukturę rzeczywistej karty.

## SkeletonList
Cel: Lista skeletonów dla długich feedów (np. produkty, artykuły), z możliwością lazy loadingu tylko widocznych elementów w viewporcie.

## SkeletonTable
Cel: Skeleton dla tabel z odpowiednią liczbą kolumn i wierszy, zachowujący układ nagłówków i komórek.

# 🐬 Komponenty optymalizacji i dostępności

## ReducedMotionGuard
Cel: Komponent/hook sprawdzający prefers-reduced-motion i dostosowujący animacje spinnera/skeletonu (wolniejszy obrót, statyczny gradient).

## A11yLoadingAnnouncer
Cel: Ukryty tekstowy komunikat dla czytników ekranu (np. „Ładowanie treści...”), synchronizowany ze stanem ładowania i ARIA (role="status").

## GPUAnimationWrapper
Cel: Opakowanie zapewniające, że animacje skeletonu używają transform i opacity zamiast background-position, promując je do warstw kompozycyjnych GPU.

## SkeletonLazyLoader
Cel: Mechanizm lazy loadingu skeletonów, który renderuje je tylko dla elementów w viewporcie, redukując liczbę aktywnych animacji.

## LoadingErrorFallback
Cel: Fallback dla sytuacji, gdy ładowanie trwa zbyt długo (>3–5s) – zastępuje skeleton komunikatem o przedłużającym się procesie.

# 🐳 Strony / katalogi (Next.js)

## pages/dashboard/loading-demo.tsx
Cel: Strona demonstracyjna z różnymi scenariuszami ładowania: spinner w przycisku, full-page spinner, skeleton karty, skeleton listy, z konfiguracją prefers-reduced-motion.

## pages/products/index.tsx
Cel: Lista produktów z skeletonami podczas ładowania danych, wykorzystująca SkeletonList i SkeletonCard.

## pages/profile/[id].tsx
Cel: Profil użytkownika z skeletonem dla avatara, tytułu i sekcji statystyk, pokazujący integrację skeletonu z układem Bento.

## pages/checkout/loading.tsx
Cel: Strona ładowania płatności z pełnoekranowym spinnerem i komunikatem ARIA, symulująca krytyczne przejście.

## pages/docs/[slug].tsx
Cel: Dokumentacja z skeletonem dla treści artykułu (SkeletonText w wielu wierszach), pokazujący priming struktury przed załadowaniem.

## pages/settings/security.tsx
Cel: Ustawienia bezpieczeństwa z spinnerem w przycisku „Zapisz” (ButtonSpinner) podczas asynchronicznej walidacji.

# 🐋 Komponenty narzędziowe / utility

## LoadingConfigExporter
Cel: Moduł eksportujący tokeny ładowania (kolory, timingi, rozmiary spinnera) do plików CSS/JS, aby zespoły frontendowe mogły je importować.

## PerfMetricsTrackerLoading
Cel: Komponent śledzący FPS i CLS podczas animacji spinnera/skeletonu, pomagający w optymalizacji i debugowaniu.

## EcoLoadingOptimizer
Cel: Logika optymalizująca zużycie energii na OLED (ciemne kolory, wąski pas shimmeru), zgodnie z analizą wpływu gradientu na baterię.

## SpinnerSizeCalculator
Cel: Narzędzie obliczające nieliniową progresję stroke-width dla spinnera w zależności od rozmiaru, zgodnie z tabelą z dokumentu.

## SkeletonMorphologyGenerator
Cel: Generator kształtów skeletonu na podstawie rzeczywistej struktury interfejsu (np. automatyczne tworzenie SkeletonText o odpowiedniej liczbie wierszy).
Jeśli chcesz, mogę też zaproponować bardziej szczegółowy podział na katalogi (np. components/loading/spinner, components/loading/skeleton, hooks/useLoading, utils/animations itd.) lub skupić się na konkretnym obszarze (np. tylko spinner, tylko skeleton, tylko dostępność).

# 🐟 Warstwa fundamentów / design tokens

1. **`ThemeProvider`**  
   - **Cel:** Dostarczanie tokenów CSS dla całej palety (Teal, Gold, Purple, Error, Success) oraz typografii (Mukta Malar, IBM Plex Sans).  
   - **Potrzebny dla:** Spójności kolorów, fontów, border-radius, shadow, timing functions w całej aplikacji.

2. **`ColorTokens` / `SemanticColorMapper`**  
   - **Cel:** Mapowanie ról semantycznych (struktura, CTA, Web3, błąd, sukces) na konkretne tokeny kolorów.  
   - **Potrzebny dla:** Automatycznego przypisywania kolorów do elementów UI zgodnie z regułami dokumentów.

3. **`ZIndexProvider` / `LayerManager`**  
   - **Cel:** Centralne zarządzanie hierarchią warstw (`base`, `sticky`, `overlay`, `toast`, `modal`, `tooltip`).  
   - **Potrzebny dla:** Eliminacji chaosu z-index i zapewnienia stabilnej topologii głębi.

4. **`DebounceProvider`**  
   - **Cel:** Centralna logika debouncingu z predefiniowanymi opóźnieniami (150ms/300ms) i feedbackiem wizualnym.  
   - **Potrzebny dla:** Ochrony backendu i zapobiegania request storms.

# 🐠 Atomy UI (przyciski, pola, ikony, stany)

5. **`ButtonBase` + warianty (`Primary`, `SecondaryGold`, `SecondaryPurple`, `Destructive`, `Ghost`)**  
   - **Cel:** Podstawowy atom przycisku z typografią Mukta Malar SemiBold, border-radius 8px, stanami hover/focus/active/disabled/loading.  
   - **Potrzebny dla:** Wszystkich interakcji w aplikacji (formularze, karty, floating CTA).

6. **`ButtonSpinner` / `LoadingState`**  
   - **Cel:** Spinner SVG w kolorze tekstu przycisku, używany w stanie loading bez zmiany wymiarów przycisku (eliminacja CLS).  
   - **Potrzebny dla:** Wizualizacji ładowania akcji.

7. **`FormFieldBase` + `InputStandard` / `InputLarge` / `Textarea`**  
   - **Cel:** Pola formularzy w ciemnym trybie (tło `--teal-700`, border `--teal-500`, focus `--gold-400`, error `--error-light`).  
   - **Potrzebny dla:** Wprowadzania danych w dashboardach, formularzach płatności, ustawieniach.

8. **`FormLabel` / `FormHelperText` / `FormErrorIcon` / `FormSuccessIcon`**  
   - **Cel:** Etykiety, tekst pomocniczy, ikony walidacji dla pól formularzy.  
   - **Potrzebny dla:** Dostępności i czytelności formularzy.

9. **`Checkbox` / `Radio` / `ToggleSwitch`**  
   - **Cel:** Elementy selekcji z precyzyjną geometrią (20×20px, 36×20px) i stanami (unchecked/checked/hover/focus).  
   - **Potrzebny dla:** Wyboru opcji, przełączania stanów w ustawieniach i formularzach.

10. **`SelectTrigger` / `SelectDropdown` / `SelectItem`**  
    - **Cel:** Listy rozwijane z elewacją w ciemnym trybie (tło `--teal-700`, shadow, hover `--teal-600`, selected `--gold-400`).  
    - **Potrzebny dla:** Wyboru z wielu opcji w formularzach i filtrach.

11. **`CardBase` + warianty (`CreatorCard`, `StatisticsCard`, `NotificationCard`, `NFTCard`)**  
    - **Cel:** Uniwersalny komponent karty z tłem `--teal-500`, padding 24px, border-radius 12px, efektem elewacji i hover.  
    - **Potrzebny dla:** Dashboardów, galerii NFT, powiadomień, profili twórców.

12. **`CardMedia` / `CardHeader` / `CardBody` / `CardFooter` / `CardActions` / `CardBadge`**  
    - **Cel:** Strukturalne części kart (obraz, nagłówek, treść, stopka, przyciski, znaczniki).  
    - **Potrzebny dla:** Organizacji treści wewnątrz kart.

13. **`ToggletipBase` / `ToggletipTrigger` / `ToggletipContent`**  
    - **Cel:** Dymki interaktywne z limitem 80 znaków, automatycznym znikaniem po 3s i dostępnością.  
    - **Potrzebny dla:** Krótkich podpowiedzi przy skomplikowanych pojęciach (Web3, opłaty, parametry).

14. **`FloatingCTA`**  
    - **Cel:** Pływający przycisk CTA (np. „Wesprzyj”) z tokenem `sticky`, pojawiający się po przewinięciu 200px w dół i chowający na scroll w górę.  
    - **Potrzebny dla:** Optymalizacji konwersji bez inwazyjnego przeszkadzania.

15. **`Toast` / `ToastManager`**  
    - **Cel:** Powiadomienia systemowe z tokenem `toast`, automatycznym usuwaniem i pozycjonowaniem (prawy dolny róg na desktop, góra na mobile).  
    - **Potrzebny dla:** Komunikacji stanów sukcesu/błędu bez blokowania interfejsu.

# 🐡 Molekuły / układy (formularze, siatki, floating)

16. **`FormContainer` / `FormSection` / `FormActions` / `FormGrid`**  
    - **Cel:** Kontenery i siatki formularzy z tłem `--teal-900`, marginesami i responsywnym układem.  
    - **Potrzebny dla:** Organizacji dużych formularzy (auth, settings, checkout).

17. **`InputGroup`**  
    - **Cel:** Grupa pól tekstowych (np. imię + nazwisko) z odpowiednimi odstępami.  
    - **Potrzebny dla:** Formularzy z wieloma polami w jednym rzędzie.

18. **`SelectionGroup`**  
    - **Cel:** Kontener grupujący checkboxy/radio z etykietami i pomocniczym tekstem.  
    - **Potrzebny dla:** Spójnego układu opcji wyboru.

19. **`CardsGridContainer` / `CardStack` / `CardWide`**  
    - **Cel:** Siatka kart z `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, gap 24px, oraz warianty (stos, szeroka karta).  
    - **Potrzebny dla:** Galerii NFT, dashboardów, list powiadomień.

20. **`FloatingContainer` / `FloatingManager` / `ScrollStateMachine`**  
    - **Cel:** Kontener i zarządca floating elementów z kontrolą pojawiania/znikania na podstawie scrolla.  
    - **Potrzebny dla:** Inteligentnego zachowania floating CTA i unikania wojny o uwagę peryferyjną.

# 🐬 Organizmy / strony (Next.js)

21. **`AppShell` / `Layout`**  
    - **Cel:** Wspólna struktura aplikacji (header, sidebar, main, footer) z konfiguracją globalnych stylów i dark mode.  
    - **Potrzebny dla:** Każdej strony, aby zapewnić spójność interfejsu.

22. **`BackgroundPatternProvider` / `SVGPattern` / `SeamlessPatternTile`**  
    - **Cel:** Dostarczanie wzorów SVG jako tła aplikacji (tactical, web3, clinical) z zachowaniem bezszwowości.  
    - **Potrzebny dla:** Estetyki cyberpunk/HUD/Web3 w tle dashboardów i stron.

23. **`Dashboard`**  
    - **Komponenty:** `CardsGridContainer`, `StatisticsCard`, `NotificationCard`, `FloatingCTA`, `ToggletipTrigger`.  
    - **Cel:** Główny pulpit twórcy z metrykami, powiadomieniami i floating CTA.

24. **`Network` / `Web3NodeMap`**  
    - **Komponenty:** `Web3NodeBackground`, `IsometricNode`, `NetworkConnection`, `DataFlowWave`.  
    - **Cel:** Wizualizacja zdecentralizowanej sieci Web3, topologii, przepływu danych.

25. **`Schema` / `TechnicalArchitecture`**  
    - **Komponenty:** `ClinicalBackground`, `SchemaGrid`, `LogicPath`, `ConnectionPoint`.  
    - **Cel:** Przegląd schematów baz danych, architektury systemu, diagramów technicznych.

26. **`AuthForm`**  
    - **Komponenty:** `InputLarge`, `FormLabel`, `FormHelperText`, `ButtonPrimary`, `FormActions`.  
    - **Cel:** Strona logowania/rejestracji z dużymi polami i wyraźnym CTA.

27. **`SettingsForm`**  
    - **Komponenty:** `InputStandard`, `Textarea`, `Checkbox`, `Radio`, `ToggleSwitch`, `SelectTrigger`, `FormSection`.  
    - **Cel:** Panel ustawień użytkownika z różnymi typami pól i podpowiedziami.

28. **`CheckoutForm`**  
    - **Komponenty:** `InputGroup`, `SelectTrigger`, `FormErrorState`, `FormSuccessState`, `DebouncedButton`.  
    - **Cel:** Formularz płatności z walidacją i debouncingiem krytycznych akcji.

29. **`PublicProfilePage`**  
    - **Komponenty:** `CreatorCard`, `NFTCard`, `FloatingCTA`, `ScrollStateMachine`, `ToastManager`.  
    - **Cel:** Publiczny profil twórcy z floating CTA, galerią NFT i powiadomieniami.

30. **`NotificationsFeed`**  
    - **Komponenty:** `CardStack`, `NotificationCard`, `CardActions`.  
    - **Cel:** Strumień powiadomień transakcyjnych i systemowych.

31. **`PortfolioOverview`**  
    - **Komponenty:** `CardsGridContainer`, `StatisticsCard`, `NFTCard`, `CardWide`.  
    - **Cel:** Przegląd portfela użytkownika z metrykami i najważniejszymi assetami.

# 🐳 Zarządcy stanów i dostępności

32. **`UIStateOrchestrator`**  
    - **Cel:** Centralny orchestrator stanów UI – koordynuje toggletipy, debouncing, floating i modale w oparciu o macierz Eisenhowera.  
    - **Potrzebny dla:** Uniknięcia interferencji destruktywnej między różnymi wektorami obciążenia.

33. **`FocusTrap` / `ClickOutsideHandler` / `KeyboardShortcutsManager`**  
    - **Cel:** Zarządzanie fokusem w modalach, obsługa kliknięć poza komponentem, skróty klawiaturowe.  
    - **Potrzebny dla:** Dostępności i power users.

34. **`FormA11y` / `CardA11y` / `ToastA11y`**  
    - **Cel:** Enkapsulacja reguł dostępności dla formularzy, kart i powiadomień (ARIA attributes, czytniki ekranowe).  
    - **Potrzebny dla:** Zgodności z WCAG i dyrektywami unijnymi.

35. **`CognitiveLoadMonitor`** (logika, nie UI)  
    - **Cel:** Helper do analizy i ograniczania obciążenia poznawczego – np. blokowanie nowych toggletipów podczas aktywnego modala.  
    - **Potrzebny dla:** Zapobiegania „zdarzeniom pęknięcia umysłu”.

# 🐋 Podsumowanie

Ta lista komponentów tworzy **kompletny system designu** oparty na:

- **Palecie kolorów:** Deep Teal, Gold, Purple, Error, Success  
- **Typografii:** Mukta Malar (przyciski), IBM Plex Sans (formularze)  
- **Geometrii:** 8-point grid, border-radius 6–12px, wysokości pól 40–56px  
- **Warstwach:** Stabilna hierarchia z-index (`base` → `sticky` → `overlay` → `toast` → `modal` → `tooltip`)  
- **Mikrointerakcjach:** Debouncing 150/300ms z natychmiastowym feedbackiem, toggletipy 80-znakowe, floating CTA inteligentnie reagujący na scroll  
- **Dostępności:** Kontrast WCAG, focus ring, ARIA, trap focus, live regions

Każdy komponent można zaimplementować jako osobny plik `.tsx` z odpowiednimi propsami, a wspólną logikę (tokens, z-index, debounce, scroll handling) wydzielić do providerów, hooków i kontekstów.

# 🐟 Komponenty zarządzania motywem (Theme Engine)

1. **`ThemeProvider` / `ThemeEngine`**  
   - **Cel:** Centralne zarządzanie globalnym motywem twórcy (Teal/Gold/Purple, density, shape, character) jako Single Source of Truth.  
   - **Potrzebny dla:** Propagacji tokenów CSS do wszystkich węzłów (Profil, Widget, Overlay, QR).

2. **`ThemeConfigurator`**  
   - **Cel:** Interfejs konfiguracyjny motywu w dashboardzie – przełączniki „Primary Vibe” (Teal/Gold/Purple), „Shape” (Sharp/Soft/Organic), „Density” (Compact/Comfortable/Spacious), „Character” (Modern/Bold/Minimalist).  
   - **Potrzebny dla:** Uproszczenia wyboru motywu bez żargonu technicznego (HEX, border-radius, font-family).

3. **`ThemeSyncManager`**  
   - **Cel:** Synchronizacja zmian motywu z bazą danych i propagacja do wszystkich podłączonych węzłów (WebSocket/SSE).  
   - **Potrzebny dla:** Natychmiastowego odświeżenia widgetów, overlayów i QR bez ręcznego odświeżania.

4. **`ThemeValidator`**  
   - **Cel:** Walidacja kontrastu WCAG AAA przy zmianie motywu (np. sprawdzanie, czy złoty tekst na turkusowym tle jest czytelny).  
   - **Potrzebny dla:** Automatycznej ochrony dostępności i zapobiegania wibrującym kombinacjom kolorów.

# 🐠 Komponenty węzłów Support Surfaces

## Profil Główny (The Hub)

5. **`CreatorProfileShell`**  
   - **Cel:** Główny layout profilu publicznego (`tipjar.plus/@username`) z aplikacją motywu (tło, kolory, typografia).  
   - **Potrzebny dla:** Centralnego punktu dystrybucji tożsamości wizualnej.

6. **`ProfileThemeInjector`**  
   - **Cel:** Komponent wstrzykujący tokeny CSS (`:root { --action-primary-bg: var(--gold-400); ... }`) do dokumentu profilu.  
   - **Potrzebny dla:** Zapewnienia, że profil zawsze renderuje się zgodnie z aktualnym motywem.

## Widget osadzony (Embedded Node)

7. **`SmartWidgetProvider`**  
   - **Cel:** Globalny provider dla widgetów osadzanych na zewnętrznych domenach (WordPress, blogi).  
   - **Potrzebny dla:** Zarządzania stanem widgetów i synchronizacji z Theme Engine.

8. **`SmartWidgetElement` (Web Component)**  
   - **Cel:** Custom Element z Shadow DOM, który hermetyzuje widget i dziedziczy zmienne CSS z dokumentu nadrzędnego.  
   - **Potrzebny dla:** Obejścia ograniczeń iframe i zapewnienia spójności motywu na obcych domenach.

9. **`FloatingActionWidget`**  
   - **Cel:** Pływający przycisk monetyzacji (Smart Button) z motywem twórcy, osadzany przez skrypt.  
   - **Potrzebny dla:** In-situ płatności bez konieczności konfiguracji widgetu przez twórcę.

10. **`InlineTipWidget`**  
    - **Cel:** Widget wbudowany w treść strony (np. pod postem na blogu) z formularzem tipów.  
    - **Potrzebny dla:** Kontekstowych akcji wsparcia w miejscu konsumpcji treści.

## Overlay OBS (Broadcast Node)

11. **`OverlayPage`**  
    - **Cel:** Specjalna strona SSR (`/overlay/username`) renderowana dla OBS Browser Source, z wstrzykniętym motywem.  
    - **Potrzebny dla:** Overlayów na żywo (live tickers, goal bars) bez konieczności wklejania Custom CSS.

12. **`LiveTickerOverlay`**  
    - **Cel:** Komponent wyświetlający powiadomienia o napiwkach na strumieniu wideo.  
    - **Potrzebny dla:** Real-time feedback dla widzów podczas streamu.

13. **`GoalBarOverlay`**  
    - **Cel:** Pasek postępu celu zbiórki renderowany na overlayu OBS.  
    - **Potrzebny dla:** Wizualizacji progresu fundraisera na żywo.

14. **`OverlaySSEConnector`**  
    - **Cel:** Połączenie Server-Sent Events między overlayem a serwerem TipJar+ do dynamicznej aktualizacji motywu i danych.  
    - **Potrzebny dla:** Odświeżania overlayu bez „Refresh cache” w OBS.

## Kody QR / Share Cards (Static Nodes)

15. **`QRCodeGenerator`**  
    - **Cel:** Generator kodów QR z motywem twórcy (kolory, logo, typografia) na podstawie aktualnych tokenów CSS.  
    - **Potrzebny dla:** Fizycznych i cyfrowych kodów QR kierujących do profilu.

16. **`ShareCardGenerator`**  
    - **Cel:** Generator kart udostępniania (PNG/PDF) z podglądem na żywo motywu twórcy.  
    - **Potrzebny dla:** Plakatów, materiałów promocyjnych, social media.

17. **`DynamicCanvasRenderer`**  
    - **Cel:** Abstrakcja do renderowania canvas (html2canvas, jsPDF) z aktualnymi wartościami computed styles.  
    - **Potrzebny dla:** Tłumaczenia tokenów CSS na wartości pikselowe w eksportowanych grafikach.

# 🐡 Komponenty synchronizacji i komunikacji

18. **`ThemeBroadcastService`**  
    - **Cel:** Serwis odpowiedzialny za wysyłanie aktualizacji motywu do wszystkich podłączonych węzłów (WebSocket/SSE).  
    - **Potrzebny dla:** Real-time propagacji zmian bez opóźnień.

19. **`WidgetScriptLoader`**  
    - **Cel:** Skrypt ładowany przez twórcę na zewnętrzne strony (`<script src="...">`), który inicjuje widget i łączy się z Theme Engine.  
    - **Potrzebny dla:** Automatycznej konfiguracji widgetów bez interwencji użytkownika.

20. **`EmbedConfigurator`**  
    - **Cel:** Interfejs w dashboardzie do generowania kodu embed (Smart Link) dla widgetów i overlayów.  
    - **Potrzebny dla:** Uproszczenia procesu „podłącz przycisk” bez żargonu technicznego.

# 🐬 Komponenty UX / redukcji szumu poznawczego

21. **`ThemePreview`**  
    - **Cel:** Podgląd na żywo motywu w dashboardzie (przyciski, karty, typografia) podczas zmiany ustawień.  
    - **Potrzebny dla:** Natychmiastowego feedbacku bez konieczności testowania na żywym profilu.

22. **`OnboardingThemeWizard`**  
    - **Cel:** Kreator motywu podczas onboardingu – proste pytania („Jaki jest Twój główny vibe?”, „Jak gęsto chcesz układać elementy?”).  
    - **Potrzebny dla:** Redukcji szumu poznawczego i szybkiego uruchomienia spójnego ekosystemu.

23. **`ThemeGuardrails`**  
    - **Cel:** Mechanizm blokujący niebezpieczne kombinacje kolorów (np. czerwony tekst na czarnym tle) i sugerujący poprawki.  
    - **Potrzebny dla:** Ochrony profesjonalizmu marki i dostępności.

# 🐳 Przykładowe strony / konteksty użycia

24. **`CreatorDashboard`**  
    - **Komponenty:** `ThemeConfigurator`, `ThemePreview`, `EmbedConfigurator`, `QRCodeGenerator`.  
    - **Cel:** Główny pulpit twórcy do zarządzania motywem i powierzchniami wsparcia.

25. **`PublicProfilePage`**  
    - **Komponenty:** `CreatorProfileShell`, `ProfileThemeInjector`.  
    - **Cel:** Publiczny profil z pełnym motywem twórcy.

26. **`OverlayPage`**  
    - **Komponenty:** `OverlayPage`, `LiveTickerOverlay`, `GoalBarOverlay`, `OverlaySSEConnector`.  
    - **Cel:** Strona overlayu dla OBS z dynamicznymi powiadomieniami i motywem.

27. **`WidgetEmbedPage`**  
    - **Komponenty:** `SmartWidgetElement`, `FloatingActionWidget`, `InlineTipWidget`.  
    - **Cel:** Demonstracja i konfiguracja widgetów do osadzenia na zewnętrznych stronach.

28. **`QRExportPage`**  
    - **Komponenty:** `QRCodeGenerator`, `ShareCardGenerator`, `DynamicCanvasRenderer`.  
    - **Cel:** Generowanie kodów QR i kart udostępniania z aktualnym motywem.

# 🐋 Podsumowanie

Ta lista komponentów tworzy **kompletny system Theme Engine** oparty na:

- **Single Source of Truth:** Globalny motyw przechowywany w bazie danych i propagowany do wszystkich węzłów.  
- **Mosty technologiczne:**  
  - Shadow DOM + Custom Properties dla widgetów,  
  - SSR + SSE dla overlayów OBS,  
  - Dynamic Canvas Renderer dla QR i share cards.  
- **Redukcja szumu poznawczego:** Interfejs konfiguracyjny bez żargonu technicznego (HEX, border-radius, iframe), tylko mentalne modele (Vibe, Shape, Density, Character).  
- **Automatyczna synchronizacja:** Zmiana motywu w jednym miejscu natychmiast odbija się na profilu, widgetach, overlayach i eksportowanych grafikach.

Każdy z tych komponentów można później zaimplementować jako osobny plik `.tsx` lub Web Component, a logikę synchronizacji i Theme Engine wydzielić do serwisów i hooków.








