## Komponenty UI / Design System

**CircadianBackground** — animowane tło reagujące na porę dnia użytkownika, przechodzące przez palety teal → purple → gold. Serce całego panelu.

**ContrastToken** — wrapper tekstu dynamicznie przeliczający kolor czcionki algorytmem APCA względem aktualnego tła pod nim. Zastępuje statyczne klasy Tailwinda dla kolorów tekstu.

**AdaptiveText** — komponent typograficzny (h1–p) który dobiera jasność (L w OKLCH) do mierzonej luminancji tła, gwarantując Lc ≥ 75.

**ColorSwatch** — wizualizacja pojedynczego koloru w OKLCH z odczytem wartości L/C/H i odpowiadającego mu Lc kontrastu na danym tle.

**ContrastBadge** — mały badge pokazujący aktualny wynik Lc (lub ratio WCAG 2.1) przy elemencie; przydatny w trybie dev/debug panelu.

**GradientCanvas** — izolowany element `<canvas>` / WebGL renderujący wieloogniskowy gradient radialny jako tło; oddziela renderowanie GPU od DOM.

**LuminanceSampler** — niewidoczny komponent "workhorse" odpytujący FBO/WebGL o uśrednioną luminancję prostokąta pod wskazanym elementem DOM i wystawiający tę wartość przez Context.

**CircadianProvider** — Context/Provider przechowujący globalny stan pory dnia (parametr `t`), geolokalizację słońca i bieżącą paletę OKLCH. Zasila cały drzewo komponentów.

**DayPhaseIndicator** — pasek lub ikona pokazująca aktualną fazę cyrkadyczną (świt / dzień / zmierzch / noc) z płynną animacją przejść.

**OklchColorPicker** — picker barwy operujący natywnie na współrzędnych OKLCH zamiast HEX/HSL; dla panelu ustawień motywu.

---

## Komponenty Dashboard / Analityczny

**MetricCard** — kafelka KPI (np. wartość portfela, P&L) z adaptacyjnym tłem i tekstem; krytyczna czytelność liczb niezależnie od fazy dnia.

**PriceTickerRow** — wiersz z tickerem kryptowaluty, ceną i zmianą procentową; kontrast cyfr musi być niezawodny na dowolnym fragmencie gradientu.

**DataTable** — tabela danych finansowych (prowizje, kontrakty, historia) z wierszami o alternującym tle i gwarantowaną czytelnością każdej komórki.

**MiniSparkline** — mały wykres liniowy inline w tabeli lub karcie; musi być czytelny na wielokolorowym tle.

**PortfolioChart** — pełnowymiarowy wykres portfela (recharts/d3) z dynamicznie dobieranymi kolorami linii i osi do aktualnego tła.

**AlertBanner** — pasek alertu (np. duże wahanie ceny) z wysokim priorytetem kontrastu — musi przebić się wizualnie niezależnie od fazy dnia.

**StatWidget** — mały komponent jednej liczby ze etykietą (np. "24h Volume"), używany w gridzie metryk.

---

## Komponenty Nawigacji / Layoutu

**TopNav** — górna belka nawigacyjna z logo, linkami i profilem; tło półprzezroczyste (backdrop-blur) nakładające się na CircadianBackground.

**SidebarNav** — boczna nawigacja z ikonami i etykietami sekcji panelu; kontrast ikon i tekstu musi działać na każdej fazie gradientu.

**PageWrapper** — wrapper strony spinający CircadianProvider + GradientCanvas + slot na treść; fundament layoutu Next.js.

**TabBar** — przełącznik zakładek (np. Spot / Futures / Analytics) z aktywnym stanem podkreślonym kolorem akcentu gold.

**BreadcrumbTrail** — ścieżka nawigacyjna; drobna typografia wymagająca szczególnej dbałości o kontrast.

---

## Komponenty Formularzy / Interakcji

**AdaptiveButton** — przycisk primary/secondary/ghost z kolorem tła i obramowania dobieranym do aktualnej fazy tła (nie może "zniknąć" na gradiencie).

**TokenInput** — pole wprowadzania kwoty tokenu/kryptowaluty z walidacją; kontrast placeholdera i wartości na ciemnym tle.

**SearchField** — pole wyszukiwania z ikoną, muszące być czytelne jako floating element nad tłem.

**SlippageSlider** — suwak ustawień (np. tolerancja poślizgu transakcji) z czytelną skalą i wartością.

**ConfirmModal** — modal potwierdzenia transakcji; nakładka nad gradientem — wymaga własnej warstwy kontrastu niezależnej od tła.

**ToastNotification** — powiadomienie toast (sukces/błąd/info) wyskakujące nad interfejsem; musi być zawsze widoczne.

---

## Komponenty Dev / Diagnostyczne

**ContrastDebugOverlay** — tryb developerski nakładający na każdy element tekstowy jego aktualny wynik Lc; toggle w dev mode.

**CircadianTimeline** — wizualizacja pełnego cyklu dobowego z podglądem jak zmienia się paleta przez 24h; narzędzie dla designera/dewelopera.

**PalettePreview** — panel podglądu wszystkich tokenów OKLCH w bieżącej fazie cyrkadycznej; narzędzie QA designu.

**PerformanceMonitor** — HUD pokazujący FPS renderowania WebGL i obciążenie CPU/GPU; pomaga weryfikować że akceleracja działa.

---

## Strony Next.js

**`/dashboard`** — główny panel twórcy/tradera, grid MetricCard + PortfolioChart + DataTable.

**`/portfolio`** — szczegółowy widok portfela z historią i wykresami.

**`/analytics`** — zaawansowane wykresy analityczne i porównania.

**`/settings/theme`** — ustawienia motywu: OklchColorPicker, podgląd CircadianTimeline, PalettePreview.

**`/settings/accessibility`** — ustawienia dostępności: minimalny próg Lc, wyłączenie animacji cyrkadycznych, statyczny tryb high-contrast.

**`/dev/contrast-audit`** — strona tylko dla dev: ContrastDebugOverlay + PalettePreview + PerformanceMonitor.


## Komponenty Atomowe (Design System)

**InputField** — pole tekstowe z efektem "płynu nieniutonowskiego": displacement map na hover, radialne rozbłyśnięcie na focus, krystaliczna tekstura błędu, złoty rozbłysk na success. Serce formularzy.

**Checkbox** — organiczny "krater" zamiast kwadratowego pola; wypełnia się cieczą purple-300 przy zaznaczeniu, wysysa ją przy odznaczeniu. Używany wszędzie tam gdzie standardowy checkbox.

**Toggle** — przełącznik dwustanowy jako "transfer masy termicznej"; brak suwakowej kulki, zamiast tego masa przeciska się przez szczelinę z narastającym oporem haptycznym. Stan ON wybucha gold-400.

**Tooltip** — "organiczne pączkowanie" — tooltip wyrasta z elementu macierzystego przez Gooey Effect (feGaussianBlur + feColorMatrix), nie pojawia się jako osobny dymek. Używany przy ikonach pomocy, skróconych etykietach, danych wymagających wyjaśnienia.

**Popover** — "mitoza komórkowa" — zamiast nakładki, siatka rozrywa się i odsłania wnętrze; ściany popovera to ciekłe szkło zlewające się z tłem przez gradient transparency. Używany do menu kontekstowych, rozszerzonych filtrów, paneli konfiguracji.

**Button** — nie opisany wprost jako sekcja, ale wynika z całego dokumentu: przycisk z kinetyczną krawędzią (velocity border), haptyczną odpowiedzią na hover, i krzywą TipJar Liquid Snap na kliknięcie.

---

## Komponenty Efektów Wizualnych

**LiquidGlassPanel** — panel/modal z efektem "ciekłego szkła": dynamiczna aberracja chromatyczna, refrakcja nieregularna, viscous drag przy przeciąganiu. Używany jako warstwa nawigacji, modal overlay, drawer.

**FrozenGlassPanel** — wariant "zamrożony": proceduralny szron fraktalny generowany przez feTurbulence, topnieje lokalnie pod trajektorią kursora. Używany do zablokowanych sekcji, stanów loading, treści niedostępnych dla użytkownika.

**ElevatedCard** — karta bez box-shadow; głębia przez kompresję i blur tła pod kartą (backdrop-filter + displacement), mikroparalaksa przy ruchu kursora, światłowodowe krawędzie z teal-50. Fundamentalny pojemnik treści.

**VelocityBorder** — dekoracyjny system krawędzi reagujący na prędkość kursora: niewidoczny w spoczynku, rozbłysk teal-300 przy powolnym ruchu, ostry złoty błysk gold-400 przy gwałtownym uderzeniu. Nakładany na karty i panele.

---

## Komponenty Stanów i Feedbacku

**FocusRing** — zamiennik standardowego outline: odwrócone halo rozchodzące się od środka na purple-300, globalny dimming reszty ekranu o 2–3%, pulsacja w rytmie oddechowym. Używany globalnie jako system fokusa klawiatury.

**HoverGravity** — wrapper zachowania hover: zniekształcenie tła przed kontaktem (paralaksa mikro), sprężyste odkształcenie geometrii elementu w kierunku kursora, brak zmiany koloru. Opakowuje każdy interaktywny element.

**ValidationState** — system stanów walidacji dla formularzy: krystaliczne zamrożenie (błąd), złoty rozbłysk wchłaniany w głąb (sukces). Używany w parze z InputField.

**LoadingState** — stan ładowania jako Frozen Glass: element "zamarza" proceduralnie od krawędzi ku środkowi, odmraża się po zakończeniu operacji.

---

## Tokeny i Motywy

**ColorTokens** — plik definicji tokenów palety: pełna skala teal-25 → teal-900, gold-400, purple-300, tokeny semantyczne (text-primary, text-secondary, text-tertiary, surface-base, surface-elevated).

**MotionTokens** — słownik trzech sygnatur kinetycznych: `TipJarLiquidSnap` (zatwierdzenia, wypływanie), `TipJarMagneticPull` (hover, wchłanianie), `TipJarCrystallineDecay` (zamykanie, usuwanie błędów). Importowane przez każdy animowany komponent.

**ThemeProvider** — Context dostarczający tokeny kolorów i ruchu w dół drzewa; umożliwia ewentualny wariant high-contrast bez przebudowy komponentów.

---

## Layouty i Strony

**BentoGrid** — asymetryczna siatka kafelkowa z dynamicznymi "szczelinami" otwierającymi się przy aktywacji popoverów; kafelki mogą zmieniać proporcje w reakcji na interakcję.

**AppShell** — główny szkielet aplikacji: TopNav z LiquidGlassPanel, boczny SidebarNav, slot na BentoGrid; CircadianBackground jako warstwa najniższa (integracja z dokumentem pierwszym).

**SettingsPage** — strona ustawień: gęste formularze z InputField, Checkbox, Toggle; idealne pole do prezentacji wszystkich stanów interakcji.

**OnboardingFlow** — wielokrokowy formularz powitalny gdzie każde przejście między krokami używa innej sygnatury kinetycznej w zależności od kontekstu (potwierdzenie → LiquidSnap, cofnięcie → CrystallineDecay).

**ComponentPlayground** — strona developerska: interaktywna prezentacja wszystkich komponentów z kontrolkami stanu (hover/focus/error/success/loading/frozen/elevated), podglądem tokenów i cubic-bezier w czasie rzeczywistym.


## Komponenty Onboardingu / Stanu Tranzycyjnego

**OwnerPreviewMode** — wrapper widoku publicznego profilu w trybie właściciela; sticky topbar z akcjami Studio/Wallet/Share + przełącznik "View as visitor". Pierwszy ekran po onboardingu.

**ViewAsVisitorToggle** — przełącznik pozwalający twórcy zobaczyć własny profil oczami fana; kluczowy element psychologiczny retencji.

**ArchetypeSelector** — krok kreatora onboardingowego wybierający jeden z 6 archetypów twórcy; determinuje całą późniejszą orkiestrację UI.

**ContextualCTAToast** — dynamiczny toast sugerujący pierwszą akcję dopasowaną do archetypu ("Connect your OBS overlay", "Share your first update", "Set up recurring memberships" itd.).

**BootstrapGoalBar** — pasek celu w stanie "wyczekiwania" z animowanym shimmerem zamiast zerowej kwoty; unika psychologicznie deprymującego "0/100$".

---

## Komponenty Orkiestracji / Layoutu Głównego

**OrchestrationEngine** — silnik (Context/Provider) mapujący archetyp na priorytet modułów nawigacyjnych, kolejność renderowania i strukturę Studio.

**AppShell / CreatorDesktop** — główna powłoka aplikacji: persistent sidebar, Parallel/Intercepting Routes, warstwa modali bez niszczenia scroll state.

**CreatorPulseWidget** — dynamiczny widget dashboardu, którego zawartość zmienia się zależnie od archetypu (metryki live vs social proof vs recurring revenue vs "Creator Health").

**StudioSidebarNav** — boczna nawigacja Studio z dynamicznie reorderowaną kolejnością modułów (Live→Promote→Page→Automations dla streamera, Page→Community→Promote dla lifestyle'a itd.).

**SoftNavigationRouter** — mechanizm przejść między Desktop a Studio bez twardego reloadu, zachowujący połączenia socketowe i stan aplikacji.

---

## Komponenty Modułu Page (Tożsamość i Wygląd)

**BentoGridEditor** — edytor układu profilu oparty na dnd-kit; przeciąganie kafelków (Goal Bar, Fanwall, itd.) z korekcją skalowania animacji (Framer Motion Scale Correction).

**AvatarUploaderWidget** — komponent uploadu awatara/bannera z Dropzone + Radix UI, integracja z IPFS.

**ThemeConfigurator** — panel wyboru "Głównego Motywu" (Vibe) operujący na semantycznych nazwach (Teal/Gold/Purple) zamiast kodów HEX; jedno źródło prawdy propagowane do wszystkich węzłów.

**ShapeSelector** — kontrolka wyboru geometrii ("Ostre/Łagodne/Organiczne") mapowana na tokeny border-radius.

**DensitySelector** — kontrolka gęstości informacji ("Zwarte/Komfortowe/Przestrzenne") mapowana na tokeny spacing.

**CharacterSelector** — wybór stylu typografii ("Nowoczesny/Zdecydowany/Minimalistyczny") mapowany na pary fontów nagłówek/tekst.

**MobilePreviewFrame** — podgląd profilu w symulowanej rozdzielczości mobilnej (CSS Container Queries).

**BadgeVerificationPanel** — zarządzanie odznakami wiarygodności i podłączaniem kont zewnętrznych przez OAuth.

---

## Komponenty Modułu Live (Streaming)

**OBSOverlayGenerator** — panel generujący URL nakładki (`/overlay/username`) z jednorazowym tokenem źródłowym, gotowy do wklejenia w OBS bez CSS.

**LiveTicker** — pasek przewijanych powiadomień o nowych wsparciach, zoptymalizowany pod GPU (`will-change: transform`, `translateZ(0)`).

**GoalBarLive** — pasek celu renderowany w overlayu, aktualizowany przez SSE w czasie rzeczywistym, z cyframi tabelarycznymi (`font-feature-settings: tnum`) zapobiegającymi migotaniu.

**AlertBox** — komponent alertu dźwiękowo-wizualnego wyzwalanego progowo przy wpłacie; Web Audio API dla precyzji milisekundowej.

**LiveFanwallVirtualized** — wirtualizowana lista wpisów fanów (react-virtuoso) dla tysięcy wpisów na minutę bez eksplozji DOM.

**SpatialTipRenderer** *(koncepcyjny/eksperymentalny)* — silnik WebXR + Three.js renderujący napiwki jako obiekty 3D w przestrzeni twórcy (LiDAR mesh collision).

---

## Komponenty Modułu Monetization / Wallet

**TipModal / BottomSheet** — modal wpłaty z predefiniowanymi kwotami (kotwiczenie 5/10/25 USDC), wersja mobilna jako wysuwana szuflada z gestem swipe-down.

**RecurringMembershipCard** — konfigurator subskrypcji cyklicznych (tiers), oparty na Circle Web SDK.

**GoalTreasuryWidget** *(koncepcyjny)* — wizualizacja celu jako "inteligentnego skarbca" z narastającym yieldem DeFi obok wpłat bezpośrednich.

**WalletBalanceView** — widok salda USDC z historią wpłat; wariant uproszczony (Fiat off-ramp) dla non-crypto-native archetypów.

**PayoutSettingsForm** — konfiguracja wypłat fiat/crypto z progresywnym onboardingiem (KYC odłożone do momentu faktycznej wypłaty).

**ENSAddressResolver** — komponent zamieniający surowe adresy hex na czytelne nazwy ENS przy płatnościach z zewnętrznych portfeli.

**TransactionStatusTracker** — komponent śledzący stan transakcji on-chain (`useWaitForTransactionReceipt`), z obsługą retry przy błędach gas.

---

## Komponenty Modułu Promote / Share

**QRCodeGenerator** — generator kodu QR z wbudowanym logo i kolorami motywu, renderowany po stronie klienta (SVG, canvas).

**SmartLinkBuilder** — kreator skróconych linków kampanijnych z trackingiem źródeł ruchu.

**ShareCardGenerator** — generator kart społecznościowych (OG images) przez Vercel/AWS Edge (`@vercel/og`), różne proporcje (Stories, TikTok, X).

**EmbedWidgetSnippet** — panel generujący kod `<script>` do osadzenia Widgetu (Shadow DOM), nazwany dla twórcy "Smart Button" / "Podłącz Przycisk".

**FloatingActionWidget** — sam widget osadzany na zewnętrznych stronach; Custom Element z Shadow DOM dziedziczący CSS Custom Properties z hosta.

---

## Komponenty Modułu Community / Analytics

**FanSegmentManager** — narzędzie segmentacji fanów i publikowania asymetrycznych aktualizacji do grup.

**GatedContentEditor** — edytor treści zabezpieczonych progiem wpłaty (token-gated content).

**TrafficSourceChart** — wykres źródeł ruchu (TikTok/Instagram/X) z konwersją na transakcje.

**AIInsightsPanel** — panel rekomendacji AI ("Twoi wspierający konwertują lepiej na celach milowych niż dotacjach").

**RetentionChurnChart** — wykres retencji/rezygnacji subskrypcji w czasie, dla archetypu edukacyjnego.

---

## Komponenty Systemowe / Infrastrukturalne (Theme Engine)

**ThemeTokenProvider** — Context propagujący `theme_config` (Single Source of Truth) do wszystkich Support Surfaces (Hub, Widget, Overlay, Static).

**SSEThemeSyncClient** — klient nasłuchujący Server-Sent Events do natychmiastowej aktualizacji motywu bez odświeżania (OBS, widget).

**ContrastGuardrail** — automatyczny walidator kontrastu WCAG AAA blokujący niebezpieczne kombinacje kolorów tekst/tło przy zmianie motywu.

**CanvasExportRenderer** — komponent odczytujący computed CSS variables i mapujący je na `fillStyle` przy eksporcie QR/PDF (html2canvas + jsPDF).

---

## Strony Next.js

**`/@username`** — publiczny profil twórcy (Hub), SSR/ISR, punkt wejścia po onboardingu.

**`/studio`** — powłoka Studio z dynamicznym sidebarem zależnym od archetypu.

**`/studio/page`** — edytor tożsamości i wyglądu (BentoGridEditor, ThemeConfigurator).

**`/studio/promote`** — centrum dystrybucji (QR, smart linki, widgety, share cards).

**`/studio/live`** — konfiguracja nakładek OBS, alertów, fanwalla live.

**`/studio/monetization`** — cele, subskrypcje, ustawienia wypłat.

**`/studio/community`** — segmentacja fanów, treści gated, wiadomości.

**`/studio/analytics`** — metryki dopasowane do archetypu (real-time vs recurring vs traffic sources).

**`/overlay/[username]`** — endpoint renderowany dla OBS Browser Source (Broadcast Node).

**`/onboarding`** — pięciokrokowy kreator z wyborem archetypu.

# KOMPONENTY — React / Next.js / NestJS / TypeScript / Tailwind

## 🏗️ FUNDAMENT SYSTEMU (Design Tokens / Providers)

**`ElevationProvider`**
Globalny context React trzymający wirtualne źródło światła (kąt, intensywność). Wszystkie komponenty oświetleniowe z niego czerpią. Bez niego "Shadow Maestro" nie istnieje.

**`ThemeEnvironmentProvider`**
Zarządza stanem motywu (light / dark / emissive-dark / sunlight-high-contrast). Konsumuje dane z czujnika luksów i ustawia atrybuty `data-environmental-theme` na `<html>`.

**`ZAxisTokenRegistry`**
Definicja tokenów głębi: Z-0 → Z-10. Mapa wartości przesunięć cieni, rozmycia i jasności tła dla każdego poziomu. Używana przez wszystkie komponenty "wznoszone".

**`AmbientLightProvider`**
Inicjalizuje `AmbientLightSensor`, kwantyzuje odczyty luksów (co 25 lux), uśrednia sygnał i wystawia wartość `--ambient-lux` jako CSS Custom Property do całego drzewa.

---

## 🌒 OŚWIETLENIE I CIENIE (Shadow System)

**`ShadowMaestroLayer`**
Wrapper-komponent nakładający na dziecko matematycznie wyliczony cień kierunkowy (Key Light) + cień otoczenia (Ambient Light) na podstawie tokenu Z-axis. Nie ma własnego wyglądu — jest "fizyką" dla dzieci.

**`ChameleonShadowBox`**
Karta / kontener, której cień nie jest czarny, lecz obliczony jako przyciemniony wariant koloru tła pod nią. Eliminuje "achromatyczne kłamstwo". Używana wszędzie tam, gdzie karta leży na kolorowym tle.

**`DoubleWrapperCapsule`**
Strukturalny pattern-komponent: zewnętrzny `div` generuje `drop-shadow`, wewnętrzny trzyma `clip-path`. Rozwiązuje "przeciekanie radiusa". Każdy kształt niestandardowy (faset, wielokąt) powinien być w nim opakowany.

**`EmissiveGlowBadge`**
Aktywny element (np. status, notyfikacja) emitujący neonową poświatę zamiast klasycznego cienia. Używany w Dark Mode / trybie `emissive-dark` zamiast niewidocznych czarnych cieni.

**`LuminanceStepSurface`**
Tło / panel, który automatycznie rozjaśnia się proporcjonalnie do swojego Z-level. Z-0 = czerń absorpcyjna, Z-3 = rozjaśniona szarość. Fundament ciemnego motywu z głębią.

---

## 🟣 TAKTYLNE INTERAKCJE (Squishy UI / Haptic)

**`SquishyButton`**
Przycisk odkształcający się przy hover/focus/active — symulacja wciśnięcia w 3D. Nie zmienia `box-shadow` bezpośrednio (drenaż baterii!), lecz animuje opacity nakładki cienia.

**`HapticPressRipple`**
Fala uderzeniowa (Shockwave) emitowana po kliknięciu. Chwilowy punkt świetlny, który przelicza cienie sąsiednich elementów Z-axis. Odpowiada za "Hapto-Optyczny Rezonans Emisyjny" w momencie kliknięcia.

**`ProximityAwareCard`**
Karta wyczuwająca zbliżenie kursora (proximity/mousemove velocity). Zaczyna się grawitacyjnie odkształcać do wewnątrz zanim nastąpi kliknięcie (Concave Debossing / Inset). Wymaga WebGPU lub CSS Houdini paint workletu.

**`InsetDebossLayer`**
Nakładka wklęsłego cieniowania wewnętrznego aktywowana predykcyjnie przed kontaktem. Współpracuje z `ProximityAwareCard`.

---

## ⚡ WYDAJNOŚĆ (Shadow Opacity Hack / GPU Compositing)

**`CompositeAnimationWrapper`**
Zamiast animować `box-shadow` (CPU), tworzy pre-renderowany pseudoelement `::after` z docelowym cieniem i animuje wyłącznie jego `opacity`. Redukuje ~92% obciążenia GPU. Powinien być bazą dla każdego hover-efektu.

**`WillChangeGuard`**
Utility-komponent/hook, który precyzyjnie dodaje i usuwa `will-change: opacity/transform` wyłącznie na czas animacji (nie globalnie). Zapobiega nadmiernemu zużyciu pamięci VRAM.

---

## 🌅 ADAPTACJA ŚRODOWISKOWA (Ambient Sensor)

**`AmbientLightMonitor`**
Headless komponent (brak UI). Odpytuje `AmbientLightSensor` z częstotliwością 2 Hz, wygładza sygnał (EMA 0.8/0.2), kwantyzuje do kroków co 25 lux, binduje do CSS Variables.

**`EnvironmentalThemeSwitcher`**
Reaguje na dane z `AmbientLightMonitor` i przełącza tryb interfejsu: < 30 lux → `emissive-dark`, > 800 lux → `sunlight-high-contrast`. Podmienia tokeny kontrastu, ramki tekstów, poświaty.

**`LuxDebugOverlay`**
Dev-only panel pokazujący aktualne odczyty luksów, wygładzony sygnał, przypisany tryb środowiskowy i stan uprawnień `Permissions-Policy`. Niewidoczny na produkcji.

**`PermissionGate`**
Wrapper obsługujący przepływ zgody na `ambient-light-sensor`. Wyświetla UI prośby o uprawnienie, obsługuje odmowę i degradację graceful (fallback do ręcznego Dark Mode).

---

## 🖥️ WEBGPU / HOUDINI (Rendering Pipeline)

**`WgslShadowCanvas`**
Web Component (`wc-wgsl-shadow-canvas`) — natywne okno do potoku WebGPU. Renderuje SDF-based cienie, emisyjne blaski i wolumetryczne efekty szkła dla elementów HUD. Używany gdy DOM nie wystarcza.

**`HoudiniPaintProvider`**
Inicjalizuje i rejestruje CSS Paint Worklet (`chameleon-worklet.js`) przez `CSS.paintWorklet.addModule()`. Musi być załadowany globalnie, zanim jakikolwiek komponent użyje `background-image: paint(...)`.

**`ChameleonPaintCard`**
Karta używająca Paint API do narysowania cienia proceduralnie w tle, zamiast `box-shadow`. Pobiera `--chameleon-color`, `--chameleon-depth`, `--chameleon-blur` z CSS Properties. Zerowe obciążenie głównego wątku.

**`SdfGeometryMask`**
Komponent opakowujący kształty definiowane przez Signed Distance Fields. Gwarantuje antialiasing krawędzi bez artefaktów (`smoothstep`). Używany do fasetowanych, futurystycznych kształtów UI (HUD panels).

---

## 🤖 GENERATIVE UI / AGENTOWY (GenUI / A2UI)

**`AgenticLayoutOrchestrator`**
Przechwytuje strumień stanu agenta AI (LangGraph / CopilotKit) i dynamicznie montuje w DOM wyłącznie te komponenty, które są potrzebne w danej chwili. Nie renderuje nic z wyprzedzeniem.

**`RenderDynamicAIWidget`**
Komponent-fabryka: gdy `aiState.status === 'streaming'`, montuje `DoubleWrapperCapsule` z wewnętrznym `AgenticDashboard`. Każdy generowany panel automatycznie dostaje token elewacji `Z-2`.

**`AgenticDashboard`**
Dynamicznie wypełniany kontener dla wygenerowanych przez agenta widgetów analitycznych. Przyjmuje `payload` i `elevation` jako props. Podpięty pod globalny Z-axis i Shadow Maestro.

**`StreamingStatusIndicator`**
Wizualizuje fazę generowania UI przez agenta: oczekiwanie / strumieniowanie / gotowe. Używa `EmissiveGlowBadge` do sygnalizowania aktywności.

**`DelegativeIntentBar`**
Input / command bar dla użytkownika, który zamiast klikać w predefiniowane przyciski, artykułuje intencję semantyczną. Przekazuje ją do LLM Engine i uruchamia `AgenticLayoutOrchestrator`.

---

## 📐 STRONY / WIDOKI (Next.js Pages / App Router)

**`/demo/shadow-maestro`**
Interaktywna piaskownica do testowania globalnego źródła światła — przesuwanie wektora `(x_l, y_l)` i obserwowanie cieni na kartach z różnymi tokenami Z-axis.

**`/demo/chameleon-shadows`**
Showcase Chameleon Shadows: te same karty na różnych kolorowych tłach, porównanie achromatyczny cień vs. cień pigmentowy.

**`/demo/squishy-ui`**
Galeria taktylnych elementów: SquishyButton, ProximityAwareCard, InsetDeboss w akcji.

**`/demo/ambient-sensor`**
Live demo AmbientLightSensor z LuxDebugOverlay. Pokazuje przełączanie `environmental-theme` w czasie rzeczywistym.

**`/demo/webgpu-canvas`**
Pełnoekranowy WebGPU render: SDF geometrie, emisyjne blaski, shadow maps. Test wydajności vs. DOM.

**`/demo/generative-ui`**
Demonstracja A2UI: pole DelegativeIntentBar + dynamicznie generowane AgenticDashboard z panelami analitycznymi.

**`/demo/hapto-resonance`**
Showcase pełnego Hapto-Optycznego Rezonansu Emisyjnego: kliknięcie → fala → dynamiczny punkt świetlny → przeliczenie cieni sąsiadów → komplementarna barwa ze środowiska.

**`/settings/permissions`**
Strona zarządzania uprawnieniami: zgoda na `ambient-light-sensor`, podgląd aktualnego trybu środowiskowego, reset preferencji.

---

## 🛠️ UTILITY / HOOKS

**`useAmbientLux`** — subskrybuje bieżącą wartość luksów z `AmbientLightProvider`

**`useElevationToken`** — zwraca CSS-variables dla danego poziomu Z

**`useChameleonColor`** — na podstawie koloru tła oblicza prawidłowy kolor cienia pigmentowego

**`useProximityIntent`** — śledzi prędkość kursora / zbliżenie dotyku, zwraca `isApproaching: boolean`

**`useAgentStream`** — obsługuje strumień stanu agenta z CopilotKit/LangGraph, wystawia `aiState`

**`useWebGPUAvailable`** — feature detection WebGPU, zwraca `boolean` + fallback strategy

**`useHoudiniPaint`** — sprawdza dostępność CSS Paint API i rejestruje worklet, obsługuje fallback

# KOMPONENTY — Architektura Systemowa / Tailwind v4 / GenUI

## 🎨 SYSTEM KOLORÓW I MOTYWU (OKLCH / Nocturnal Opulence)

**`OklchThemeProvider`**
Globalny provider wstrzykujący zmienne CSS oparte na przestrzeni OKLCH zamiast hex/HSL. Fundament całego systemu wizualnego — bez niego kolory pozostają w archaicznym sRGB z banding-iem na gradientach.

**`NocturnalPaletteTokens`**
Plik/moduł tokenów trzech osi palety: `--color-teal-900` (fundament), `--color-gold-400` (akcja), `--color-purple-300` (informacja/focus). Wszystkie komponenty czerpią z niego zamiast hardkodować wartości.

**`ContrastGuard`**
Komponent/HOC walidujący kontrast tekstu na tle w czasie dev. Blokuje białe litery na złocie (1.54:1 — FAIL), wymusza ciemny turkus na złotych powierzchniach (11.2:1 — AAA). Niewidoczny na produkcji.

**`OledSafeBackground`**
Wrapper zastępujący czyste `#000000` głębokim turkusem `oklch(0.15 0.05 190)`. Eliminuje "Black Smearing" na matrycach OLED — piksel nigdy nie jest wyłączany całkowicie, więc znika smużenie podczas scrollowania.

---

## 🪟 LIQUID GLASS (Glassmorphism 2.0)

**`LiquidGlassPanel`**
Bazowy panel szklany: `backdrop-blur(20px)` obowiązkowo sparowany z `saturate(200%)`. Bez saturacji ciemne tło pod rozmyciem tworzy "brudne szarości" niszczące wrażenie ekskluzywności. Używany jako fundament dla kart, portfeli, paneli twórców.

**`SubpixelBorderFrame`**
Mikro-krawędź (`oklch(1 0 0 / 0.125)`) otaczająca szklane komponenty w ciemnym trybie. Bez niej szklana powierzchnia staje się niewidzialna na ciemnym tle — brak odbicia = brak percepcji krawędzi.

**`GlassCompositorIsolator`**
Utility-wrapper dodający `transform: translateZ(0)` + `will-change: transform` wyłącznie na interaktywne panele szklane. Rozwiązuje "Layer Squashing" — bez niego animowany modal z `backdrop-filter` zmusza GPU do przeliczania rozmycia wszystkich warstw poniżej, demolując FPS.

**`StaticGlassPanel`**
Wersja bez kompozycji GPU — dla paneli nieinteraktywnych. Rozróżnienie na `StaticGlassPanel` vs `LiquidGlassPanel` jest celowe: nie wszystkie powierzchnie szklane potrzebują `will-change`, nadmierne użycie zjada VRAM.

---

## ✍️ TYPOGRAFIA I DANE NUMERYCZNE

**`TabularNumericDisplay`**
Kontener wyświetlający dane liczbowe (ceny, timery, tickery) z wymuszonym `font-feature-settings: "tnum"`. Bez tego cyfry mają różną szerokość optyczną — "Financial Jitter", czyli skakanie layoutu przy aktualizacji danych strumieniowych (Web3, fintech).

**`BalancedHeadline`**
Komponent nagłówkowy z `text-wrap: balance`. Silnik tekstowy automatycznie wyrównuje długość wszystkich linii bloku, eliminując "Tekstowe Sieroty" — pojedyncze słowa w ostatniej linii tytułu w zależności od rozmiaru okna.

**`DisplayFontWrapper`**
Wrapper aplikujący `--font-display: "Montserrat"` (lub dowolny display font) bez ładowania zewnętrznych JS webfont loaderów. Zdefiniowany przez `@theme` w Tailwind v4, nie przez `<link>` + JS fallback listener.

**`ClampFluidText`**
Komponent tekstu ze skalą `clamp(1.5rem, 5cqi, 3rem)` — rozmiar pisma reaguje na szerokość kontenera, nie viewportu. Używany w widgetach GenUI, które mogą być osadzone zarówno jako pełne okno, jak i sidebar.

---

## 📦 KOMPONENTY CONTAINER-AWARE (Container Queries)

**`ContainerQueryWrapper`**
Bazowy wrapper definiujący `@container` — element nie reaguje na rozmiar monitora, lecz na rozmiar swojego bezpośredniego kontenera. Fundament dla wszystkich widgetów generowanych przez agenta GenUI, które mogą trafić do dowolnego slotu.

**`AdaptiveAnalyticsWidget`**
Widget analityczny przełączający layout z `grid-cols-1` na `@md:grid-cols-3` na podstawie szerokości swojego kontenera. Ten sam komponent działa poprawnie jako pełne okno robocze i jako wąski panel w Drawer/Modal.

**`ResponsiveAgentPanel`**
Panel generowany przez agenta AI z Container Queries zamiast Media Queries. Gdy agent wrzuci go do sidebaru (300px), automatycznie przełącza układ bez żadnej wiedzy o rozmiarze ekranu użytkownika.

---

## 🎬 ANIMACJE WEJŚCIA (starting-style / Framer Motion Killer)

**`CrystalizeEntry`**
Komponent opakowujący dowolny węzeł w animację wejścia via `@starting-style`. Stan startowy: `opacity-0 scale-80 -rotate-12 blur-xl`. Stan docelowy: pełna widoczność. Zero Framer Motion, zero bibliotek animacyjnych — czysta sprzętowa akceleracja CSS.

**`StreamingListItem`**
Element listy pojawiający się ze strumienia WebSocket z animacją krystalizacji. Wchodzi z góry (`starting:opacity-0 starting:-translate-y-4`), przechodzi płynnie do pozycji docelowej. Używany w "Wiecznej Ścianie" zdarzeń finansowych/agentowych.

**`AnimatedModal`**
Modal z animacją wejścia przez `starting:` zamiast bibliotek. Eliminuje problem "sztywnej bryły" — przeglądarka wie dokładnie, jak element ma wyglądać w nanosekundzie narodzin w DOM.

**`GenUINodeMount`**
Wrapper dla każdego węzła dynamicznie generowanego przez agenta. Automatycznie aplikuje `starting:` animację wejścia, żeby generowane komponenty "krystalizowały się z cyfrowej głębi" zamiast pojawiać się brutalnie.

---

### 🚫 STANY NEGATYWNE I LOGIKA WYKLUCZEŃ (not-\* variant)

**`FocusPullGallery`**
Kontener galerii kart z efektem kinowej koncentracji: po hover na obszar grupy, wszystkie karty prócz tej pod kursorem dostają `opacity-40 scale-95 blur-sm`. Realizowane przez `group-hover:not-hover:*` — zero stanu React, zero `hoveredId`.

**`SmartDisabledButton`**
Przycisk z precyzyjną logiką `not-disabled:hover:bg-gold-400` — hover działa tylko gdy przycisk nie jest `disabled`. Usuwa potrzebę warunkowego JS (`isDisabled ? 'opacity-50' : 'hover:bg-gold-400'`). GPU kalkuluje, nie CPU.

**`ExclusiveActiveTab`**
Nawigacja zakładkowa gdzie nieaktywne taby dostają styl `not-[aria-selected=true]:opacity-50`. Stan wizualny wynika z atrybutu ARIA, nie z klasy zarządzanej przez JS.

**`ConditionalFormField`**
Pole formularza z `not-focus:placeholder-opacity-60` — placeholder wizualnie reaguje na focus bez JS listener. Stany wizualne zarządzane deklaratywnie.

---

### 📝 FORMULARZE AGENTOWE (field-sizing)

**`AutoResizeTextarea`**
Pole tekstowe dla agenta GenUI z `field-sizing-content` — automatycznie rozszerza się wraz z wpisywaną treścią bez jednej linii JS (`addEventListener('input', resize)`). Tailwind v4 deleguje to bezpośrednio do silnika CSS.

**`AgentIntentInput`**
Pole semantycznego wprowadzania intencji użytkownika dla agenta delegacyjnego. Rozszerza `AutoResizeTextarea` o `min-h-[56px]`, `focus:ring-2 focus:ring-purple-300` i placeholder "Wyartykułuj intencję analityczną". Punkt wejścia do systemu GenUI.

**`MultilineAgentChat`**
Obszar konwersacji z polem `field-sizing-content` + logika `not-*` dla stanu ładowania agenta. Textarea rośnie z jednej do wielu linii, przyciski akcji są zablokowane podczas streamingu.

---

### 📐 LAYOUTY BEZPIECZNE (Safe Area / iOS / Android)

**`SafeAreaNavBar`**
Dolny pasek nawigacji z `pb-[env(safe-area-inset-bottom)]`. Bez tego na iOS Dynamic Island i wskaźnik powrotu do home zakrywają przyciski nawigacji lub pola input po otwarciu klawiatury.

**`SafeAreaPageWrapper`**
Globalny wrapper stron aplikacji uwzględniający wszystkie `env(safe-area-inset-*)`. Fundament dla aplikacji mobilnych — eliminuje problem nakładania się layoutu na systemowe UI elementów.

**`FoldableScreenAdapter`**
Layout wrapper z logicznymi właściwościami CSS (`mbs-*`, `pis-*`) zamiast `mt-*`/`ml-*`. Kierunki bloku i inline zamiast fizycznych osi — układ pozostaje poprawny na składanych ekranach i w trybie RTL.

---

### 🔧 UTILITY HOOKS / HELPERS (Tailwind v4 native)

**`usePanelLiquidClass`** — zwraca gotową klasę `panel-liquid` z `@utility`, obsługuje warianty (elevated, flat, interactive)

**`useShadowChameleon`** — zwraca `--shadow-chameleon` obliczony przez `color-mix(in oklch, ...)` dla danego tła, nie czarną plamę

**`useContainerSize`** — subskrybuje `ResizeObserver` na kontenerze, zwraca breakpoint `@container` dla logiki JS-side gdy CSS nie wystarczy

**`useStartingStyleSupport`** — feature detection `@starting-style`, zwraca `boolean` + fallback dla starszych przeglądarek

**`useOledSafeColor`** — waliduje czy podany kolor jest bezpieczny dla OLED (nie czysta czerń), zwraca skorygowaną wartość OKLCH

**`useTabularNumbers`** — hook opakowujący wartości numeryczne w element z `font-feature-settings: "tnum"` dla zapobiegania Financial Jitter

---

### 📄 STRONY / WIDOKI

**`/demo/nocturnal-opulence`** — showcase palety OKLCH, porównanie sRGB vs OKLCH na gradientach, live color banding test

**`/demo/liquid-glass`** — galeria paneli szklanych z weryfikacją 3 obostrzeń matematycznych (blur+saturate, subpixel border, compositor isolation)

**`/demo/oled-safe`** — wizualizacja Black Smearing: czysta czerń vs `oklch(0.15 0.05 190)` na symulowanej matrycy OLED

**`/demo/financial-jitter`** — live ticker z i bez `font-feature-settings: "tnum"`, widoczna różnica w stabilności layoutu

**`/demo/container-queries`** — ten sam widget w 3 kontekstach: fullscreen, sidebar 300px, modal 480px

**`/demo/starting-style`** — porównanie wejścia elementów: Framer Motion vs natywny `starting:` via Tailwind v4

**`/demo/not-variant`** — interaktywna galeria z Focus-Pull efektem, disabled buttons, exclusive tabs

**`/demo/agent-intent`** — pole `AutoResizeTextarea` + symulowany strumień agenta montujący `GenUINodeMount` komponenty

# KOMPONENTY — Inżynieria Interfejsów Hiper-Fizycznych / Neomorfizm / Taktylny Maksymalizm

## 📖 SKEUOMORFIZM ALGORYTMICZNY (CSS-only, zero bitmap)

**`SkeuomorphicBookCover`**
Okładka książki renderowana czystym CSS bez plików rastrowych. Wielostopniowy `linear-gradient` z precyzyjnymi "przystankami kolorów" symuluje grzbiet, odbicie światła na zgięciu kartonu i fizyczną masę bryły. Używana w bibliotekach cyfrowych, sklepach z ebookami, portfolio wydawniczym.

**`EmbossGradientOverlay`**
Nakładka gradientowa symulująca wytłoczenie (emboss) na dowolnym elemencie. Sekwencja color stops: `rgba(0,0,0,0.02) 0%` → `rgba(255,255,255,0.6) 1.3%` → `rgba(144,144,144,0.2) 100%`. Oszukuje korę wzrokową sugerując objętość bez żadnego narzutu sieciowego.

**`SkeuomorphicMaterialSurface`**
Generyczny wrapper aplikujący "dekodowany skeuomorfizm" — iluzję tekstury (metal, matowy plastik, karton) wyłącznie przez CSS gradients i box-shadow. Bezstanowa, czysta funkcja GPU. Fundament dla komponentów imitujących przedmioty fizyczne.

**`VirtualEmbossText`**
Nagłówek lub label z efektem wytłoczonego tekstu (Chisel Hard emboss). Ostre, metaliczne uderzenie matrycy wzdłuż wektorów liter zamiast zwykłego `text-shadow`. Używany w prestiżowych nagłówkach, logotypach, przyciskach premium.

---

### 🟤 NEOMORFIZM I SOFT UI

**`NeomorphicCard`**
Karta wyglądająca jakby była wyciśnięta z tego samego materiału co tło — nie "nałożona" na nie. Dwa symultaniczne `box-shadow`: świetlny (biały, lewy górny) + ciemny (prawy dolny). Brak kontrastujących krawędzi. Używana w dashboardach, widgetach statusu, kartach profilu.

**`NeomorphicButton`**
Przycisk z profilem wypukłym (convex) w stanie spoczynku, przechodzący w wklęsły (concave/inset) po naciśnięciu. Zamiana parametrów `box-shadow` na tryb `inset` symuluje fizyczne zapadnięcie materiału pod palcem. Zero JavaScript do przełączania stanu wizualnego.

**`SoftUIToggle`**
Przełącznik ON/OFF w stylu neomorficznym. Stan OFF — wypukły, uniesiony. Stan ON — wklęsły, "wciśnięty w materię". Buduje fizyczną intuicję stanu bez etykiet tekstowych.

**`NeomorphicSlider`**
Suwak z "miękką geometrią" — track wklęsły (inset), thumb wypukły (convex). Użytkownik fizycznie "ciągnie" unoszoną bryłę przez zagłębiony rowek.

**`NeomorphicInputField`**
Pole formularza wklęsłe w materię tła — wygląda jakby było wydrążone, nie przyklejone. Naturalny feedback wizualny bez obramowań — zagłębienie sugeruje "wpisz tutaj".

**`AccessibilityNeomorphicWrapper`**
HOC/wrapper naprawiający fundamentalną wadę czystego neomorfizmu: dodaje `subpixel border` i `high-contrast outline` dla użytkowników z upośledzeniami wzroku. Pozwala korzystać z estetyki neomorficznej bez naruszania WCAG 2.2.

---

### 🛋️ PILLOW CUSHION (Tłoczenie Poduszkowe)

**`PillowEmbossButton`**
Przycisk z efektem "poduszki": dwa wewnętrzne cienie (`inset`) z lewego górnego (biały) i prawego dolnego (czarny) rogu. Przy mocnym `border-radius: 25%` przeglądarka wygina promienie wzdłuż krzywizn, potęgując wrażenie napompowanej materii.

**`PillowEmbossCard`**
Karta z tłoczeniem poduszkowym — krawędzie wyglądają jakby były "wstemplowane" pod ciśnieniem w podłoże, a środek wybija się ku górze. Odpowiednik Adobe Photoshop "Pillow Emboss" w czystym CSS.

**`ChiselHardBadge`**
Badge/etykieta z twardym, metalicznym tłoczeniem (Chisel Hard). Ostre sfazowanie bez rozmycia — idealne do rzeźbionych numerów, statusów, tagów premium.

**`SmoothEmbossPanel`**
Panel z miękkim tłoczeniem (Smooth technique) — organiczna miękkość typowa dla tkanin i skóry. Użyj dla elementów "ciepłych" (onboarding, empty states, welcome screens).

**`PillowPressAnimation`**
Wraper animujący efekt wciśnięcia Pillow przy `active`. Manipulacja gradientem (Gradient Overlay symulujący refleksję) + minimalny `outer-glow` symulujący odbicie fotonów. Buduje "piorunujący efekt przestrzenny".

---

### 🖼️ DOUBLE BORDER I WYPUKŁE RAMKI (Bevel System)

**`BevelBorderBox`**
Kontener z efektem wypukłej ramki (bevel/outset) przez `border-top/left` w bieli i `border-bottom/right` w czerni. Optyczny rowek (groove) sugerujący krawędź trójwymiarowej bryły. Nie używa przestarzałego `border-style: outset`.

**`DoubleBorderFrame`**
Podwójna ramka z precyzyjnie kontrolowanymi proporcjami (grubość zewnętrzna, szerokość przerwy, grubość wewnętrzna). Trzy technologie do wyboru (konfigurowane przez props): `outline + offset`, `box-shadow spread`, `pseudo-elements` — każda z własnym profilem wydajnościowym.

**`OutlineOffsetBorder`**
Implementacja podwójnej ramki przez `border` (wewnętrzna) + `outline` z ujemnym `outline-offset` (zewnętrzna wciśnięta w głąb). Zwięzły, bez ingerencji w Box Model. Wariant dla elementów bez border-radius (outline ignoruje radius w starszych silnikach).

**`BoxShadowSpreadBorder`**
Podwójna ramka przez `box-shadow: 0 0 0 10px #ccc, 0 0 0 15px #999` bez rozmycia (blur: 0). Pełne poszanowanie `border-radius` — ramki podążają za krzywizną rogu. Wariant dla elementów zaokrąglonych.

**`PseudoElementBorder`**
Podwójna ramka przez `::before` i `::after` pozycjonowane absolutnie z `z-index: -1`. Absolutna elastyczność artystyczna — każda ramka może mieć `transform: rotate()` lub `mix-blend-mode: overlay`. Wariant dla efektów dekoracyjnych.

**`GrooveBorderDivider`**
Separator sekcji z efektem rowka optycznego (groove) — łączy Double Border z Chameleon Shadows, tworząc wrażenie fizycznego wgłębienia w materię interfejsu.

---

### 🌑 CHAMELEON SHADOWS I SHADOW MAESTRO (z doc. 3)

**`ChameleonShadowElement`**
Wrapper nadający elementowi cień obliczony z pigmentu podłoża (nie czarną plamę). `color-mix(in oklch, var(--surface-color) 60%, transparent)` jako kolor cienia. Eliminuje "Achromatyczne Kłamstwo" — muddy shadows znikają.

**`ShadowMaestroRegistryProvider`**
Provider globalnego rejestru żetonów elewacji Z-Axis. Deweloper nigdy nie pisze `box-shadow` bezpośrednio — zamiast tego deklaruje `elevation="Z-5"` i silnik oblicza Key Light + Ambient Light zgodnie z jednym wirtualnym słońcem sceny.

**`KeyLightShadow`**
Komponent renderujący twardy cień kierunkowy (Key Light) — trigonometrycznie obliczony rzut dyfuzyjny w kierunku przeciwnym do centralnego oświetlenia. Używany razem z `AmbientLightShadow` na każdym uniesionym elemencie.

**`AmbientLightShadow`**
Komponent renderujący miękki, niekierunkowy cień otoczenia (Ambient Light) — grawitacyjnie dystrybuowany proporcjonalnie do żetonu Z-Axis. Symuluje pochłanianie światła przez podłoże.

---

### ⚡ OPTYMALIZACJA BATERII (Opacity Channel / Hardware Compositing)

**`OpacityChannelHoverEffect`**
Wrapper animujący hover przez `opacity` pre-renderowanego cienia na `::after`, nie przez `transition: box-shadow`. Pre-kompiluje docelowy cień jako niewidoczny pseudoelement (`opacity: 0`, `will-change: opacity`). Przy hover animuje tylko przezroczystość. Redukuje ~92% obciążenia CPU.

**`PrecompiledShadowLayer`**
Pseudoelement (`::after`) z pre-renderowanym, dużym cieniem głębi. Zamrożony w `opacity: 0`, buforowany w pamięci GPU. Aktywowany przez rodzica — Hardware Compositing zamiast Gaussian Blur na każdej klatce.

**`ThermalThrottleGuard`**
Dev-only komponent monitorujący czy animacje cieni nie używają `transition: box-shadow`. Wyświetla warning w console gdy wykryje ten antywzorzec. Pilnuje zasady "zero modyfikacji blur w czasie animacji".

---

### 🟣 OLED / NOCTURNAL OPULENCE (specyficzne dla doc. 3)

**`OledDeepTurquoiseBg`**
Tło zastępujące `#000000` wartością `oklch(0.15 0.05 190)`. Utrzymuje diody OLED w stanie minimalnego napięcia, eliminując Black Smearing. Używany jako najniższa warstwa (Z-0) każdego dark-mode widoku.

**`NocturnalOpulenceLayout`**
Pełnoekranowy layout dla Dark Mode oparty na doktrynie "Nocturnal Opulence" — tło Z-0 to głęboki turkus, nie czerń. Zapobiega smużeniu i "Jitteringowi" na flagowych urządzeniach OLED podczas scrollowania.

**`BlackSmearingTest`**
Dev-only komponent do wizualnej weryfikacji Black Smearing: scrollowalny tekst na tle `#000` vs `oklch(0.15 0.05 190)`. Pozwala inżynierom zobaczyć problem na urządzeniu OLED przed wdrożeniem.

---

### 💡 EMISSIVE NEON GLOW (Dark Mode 2.0)

**`EmissiveNeonBorderCard`**
Karta z świecącymi krawędziami wektorowymi w Dark Mode zamiast klasycznych ciemnych cieni (które stają się niewidzialne na ciemnym tle). Krawędzie zapalają się neonowym blaskiem komplementarnym do oświetlenia otoczenia.

**`LuminanceStepUpSurface`**
Powierzchnia podnosząca jasność tła proporcjonalnie do pozycji Z-Axis w Dark Mode. Najniższe tło absorpcyjne (głęboki turkus), najwyższe warstwy (rozjaśniona szarość + Emissive Glow). Zastępuje niewidoczne czarne cienie.

**`EmissiveCtaButton`**
Przycisk CTA w Dark Mode emitujący neonową poświatę kierunkową. Nie oślepia (halacja), bo barwa jest komplementarna do aktualnych luksów otoczenia. Zachowuje widoczność i satysfakcję wizualną w całkowitej ciemności.

---

### 🌊 PILLOW + HAPTO-OPTYCZNY REZONANS (Interakcja predykcyjna)

**`PillowCushionProximityCard`**
Karta z efektem Pillow Cushion, która wyczuwa zbliżenie kursora (SDF distance field) i zaczyna odkształcać się wklęśle (Concave Debossing) ułamek sekundy przed kliknięciem. Symuluje "ciecz za szafirowym szkłem".

**`ShockwavePointLight`**
Fala uderzeniowa emitowana po kliknięciu — chwilowy punkt świetlny (`dynamic point-light`) przeliczający cienie sąsiednich elementów na osi Z. Energia kliknięcia staje się grawitacyjną falą świetlną odpychającą proceduralne cienie.

**`WebXRCoinTipWidget`**
Widget "napiwku" renderujący wirtualną monetę z fizyką kolizji (Ammo.js / Three.js) rozbijającą się na fizycznym biurku wykrytym przez LiDAR urządzenia. Dla systemów monetyzacji twórców streamingowych.

---

### 📐 OKLCH / TAILWIND v4 (specyficzne dla doc. 3)

**`OklchColorMixShadow`**
Utility obliczający kolor cienia przez `color-mix(in oklch, var(--base) 60%, transparent)` — matematycznie poprawne zaciemnienie pigmentu powierzchni zamiast nakładania czarnej maski. Serce systemu Chameleon Shadows.

**`HueShiftCompensator`**
Komponent korygujący "błotniste" wyniki algorytmicznych przesunięć barw w palecie OKLCH. Dokumentuje nielinearne korekty hue i lightness na skrajnych nasyceniach (zjawisko opisane w dokumencie jako "obalenie mitu czystej matematyki"). Używany przy budowie custom design tokenów.

**`PercepuallyUniformGradient`**
Gradient zbudowany w przestrzeni OKLCH zamiast sRGB — eliminuje color banding. Dwie barwy o tej samej wartości Lightness w OKLCH są identycznie jasne dla ludzkiego oka niezależnie od hue.

---

### 🔧 HOOKS SPECYFICZNE DLA DOC. 3

**`useNeomorphicShadow(baseColor, elevation)`** — oblicza parę cieni (highlight + drop) dla neomorfizmu na podstawie koloru tła i elewacji

**`usePillowEmboss(borderRadius, depth)`** — zwraca parametry `box-shadow inset` dla efektu Pillow dostosowane do promienia zaokrąglenia

**`useBevelBorder(lightAngle)`** — generuje `border-top/left/bottom/right` symulujące bevel na podstawie kąta światła

**`useChameleonShadowColor(surfaceColor)`** — oblicza `color-mix(in oklch, ...)` dla prawidłowego koloru cienia pigmentowego

**`useOledSafeBlack()`** — zwraca `oklch(0.15 0.05 190)` zamiast `#000` + feature detection czy urządzenie ma OLED

**`useNocturnalLuminanceStep(zLevel)`** — zwraca jasność tła dla danego Z-level w Dark Mode (Z-0 = najciemniejszy, Z-3 = najjaśniejszy)



## KOMPONENTY — Shadow Maestro / Holo-Haptic WebGPU / SDF / Manifest Interfejsów

### 🌐 WEBGPU SPATIAL ENGINE (HHWSF Core)

**`WebGPUSpatialEngine`**
Hook inicjalizujący potok WebGPU jako ukryty proces poboczny nieblokujący głównego wątku React. Konfiguruje `GPUCanvasContext` z `alphaMode: "premultiplied"`. Wszystkie komponenty DOM "leżą" nad tym płótnem z przezroczystym tłem, czerpiąc oświetlenie z dołu. Serce całej architektury HHWSF.

**`WgslSpatialUICanvas`**
Pełnoekranowy canvas WebGPU renderowany z ujemnym z-index pod całą aplikacją. Wykonuje fragment shader w WGSL obliczający raymarching 2D i miękkie cienie (Soft Shadows) przez SDF dla każdego zarejestrowanego elementu UI. Zastępuje wszystkie `box-shadow` w aplikacji jednym sprzętowym potokiem.

**`WgslShaderModule`**
Izolowany moduł ładujący kod WGSL do `device.createShaderModule()`. Zawiera funkcję `sdRoundRect` (SDF dla zaokrąglonych paneli) i `calculateSoftShadow` (raymarching z półcieniami). Używany przez `WgslSpatialUICanvas` jako rdzeń matematyczny cieniowania.

**`UniformBufferBridge`**
Zarządza `GPUBuffer` przesyłającym dane środowiskowe (`light_direction`, `ambient_intensity`, `resolution`) do shadera WGSL. Aktualizowany przez `SpatialSensorySync` przy każdym odczycie czujnika. Kluczowy most między hardware'em a GPU.

**`WebGPUFallbackDetector`**
Feature detection WebGPU + automatyczny fallback do CSS Houdini lub `box-shadow` gdy `navigator.gpu` niedostępny. Wyświetla warning w dev. Zapewnia graceful degradation bez crashu aplikacji.

---

### 📡 SENSORYKA ŚRODOWISKOWA (Generic Sensor API)

**`SpatialSensorySync`**
Klasa/serwis synchronizujący dane z `AmbientLightSensor` (luxy → logarytmiczna normalizacja do 0-1) i `DeviceOrientation` (kąty Eulera beta/gamma → wektor kierunkowy light_direction). Wysyła dane do `UniformBufferBridge`. Fundament reaktywności środowiskowej.

**`AmbientLuxNormalizer`**
Konwertuje surowe luxy na znormalizowaną wartość 0.0–1.0 przez `Math.log10(lux + 1) / Math.log10(30000)`. Ludzkie oko reaguje nieliniowo na światło — bez tego normalizacji ciemne pokoje byłyby prawie identyczne z jasnymi.

**`GyroscopeLightVector`**
Przelicza kąty `event.gamma` i `event.beta` na wektor `(x, y)` kierunku wirtualnego słońca sceny. Gdy użytkownik przechyla telefon, cienie całej aplikacji obracają się zgodnie z fizyką — jak prawdziwe słońce.

**`DeviceOrientationShadowBinder`**
Binduje wektor żyroskopowy do `--hardware-gyro-angle` CSS Custom Property + do `UniformBufferBridge`. Pozwala jednocześnie zasilać Houdini Paint Worklets i shader WGSL tym samym źródłem prawdy.

**`SensorPermissionGate`**
Obsługuje request uprawnień dla `AmbientLightSensor` i `DeviceOrientation`. Jeśli odmowa — włącza symulację środowiskową (defaultowe wartości). Wyświetla UI zgody. Bez tego komponentu sensory nie uruchomią się na Chrome/Safari.

---

### 📐 SDF GEOMETRY (Signed Distance Fields)

**`SdfRoundRectPanel`**
Komponent panelu, którego kształt jest opisany przez funkcję SDF `sdRoundRect` zamiast `border-radius`. Pozwala na mathematicznie poprawne miękkie cienie bez artefaktów "przeciekania". Może mieć asymetryczne promienie każdego rogu niezależnie.

**`SdfBooleanMask`**
Komponent stosujący boolowskie operacje SDF (`max(d1, -d2)` dla wycinania) zamiast `clip-path`. Pozwala łączyć skomplikowane kształty z globalnym silnikiem oświetlenia bez żadnych ucięć cieni. Rozwiązuje fundamentalny problem `clip-path + box-shadow`.

**`SdfSoftShadowRenderer`**
Renderuje miękkie cienie przez raymarching — iteracyjne śledzenie odległości krokowej (32 iteracje) obliczające półcień matematycznie z kąta ominięcia przeszkody. Niedostępne w żadnym narzędziu CSS — tylko SDF + WebGPU.

**`SdfDistanceField`**
Compute Shader obliczający pole odległości dla wszystkich zarejestrowanych elementów UI jednocześnie. Aktualizowany gdy zmienia się layout. Zasilany przez `Shadow Maestro Token Registry` jako mapa głębokości sceny.

---

### 🖐️ HAPTOGRAFIA (Piezoelectric Z-Axis Matrix)

**`ZAxisHapticProvider`**
Globalny event delegator nasłuchujący `pointerdown` na całym drzewie DOM. Odczytuje `data-z-elevation` z trafionego elementu i wywołuje `navigator.vibrate()` z odpowiednim profilem piezoelektrycznym. Sprzęga wirtualną głębię z fizycznym dotykiem.

**`HapticSignatureRegistry`**
Rejestr wzorców wibracyjnych (milisekundy ON/OFF) dla każdego poziomu Z-axis: Z-0 (delikatne niskotonowe), Z-1 (standardowe kliknięcie), Z-2 (wielowarstwowa chropowatość), Z-3 (gwałtowny pop-over). Jeden obiekt konfiguracyjny dla całego systemu haptycznego.

**`ZElevationAttribute`**
Utility/HOC automatycznie dodający `data-z-elevation="Z-N"` do komponentów na podstawie ich tokenu elewacji z `Shadow Maestro Registry`. Bez tego atrybutu `ZAxisHapticProvider` nie ma jak określić intensywności wibracji.

**`HapticFeedbackDebugger`**
Dev-only panel pokazujący który element wywołał wibrację, jaki wzór i z jakiego poziomu Z. Niezbędny do kalibracji `HapticSignatureRegistry` na fizycznym urządzeniu.

---

### 🎭 ANIMACJA HOVER (Maestro Hack / Opacity Channel)

**`MaestroHoverCard`**
Karta z animacją hover przez `opacity` na `::after` zamiast `transition: box-shadow`. Bazowy cień na `::before` (opacity: 1), docelowy głęboki cień na `::after` (opacity: 0, `will-change: opacity`). Przy hover zamiana opacity między warstwami. ~92% mniej obciążenia CPU.

**`PrecompiledShadowBefore`**
Pseudoelement `::before` z małym, bazowym cieniem — wyrenderowany raz, nieanimowany. Fundament wydajnościowego systemu cieni.

**`PrecompiledShadowAfter`**
Pseudoelement `::after` z dużym, głębokim cieniem — wyrenderowany raz, zbuforowany w GPU, domyślnie niewidoczny (`opacity: 0`). Ujawniany płynnie przy interakcji.

**`WillChangeOpacityWrapper`**
Wrapper dodający `will-change: opacity` TYLKO na czas animacji (dodaje przy `mouseenter`, usuwa przy `animationend`). Zapobiega nadmiernemu zużyciu VRAM przez permanentne `will-change`.

---

### 📱 MOBILE HOVER (Sticky Hover Killer)

**`HoverOnlyDesktop`**
Wrapper stosujący efekty hover wyłącznie gdy `@media (hover: hover) and (pointer: fine)`. Eliminuje "Sticky Hover" — stan hover zamrożony po dotknięciu na mobile, który psuje UX.

**`MobileDepressButton`**
Przycisk reagujący na `:active` wciskiem zamiast uniesieniem: `active:scale-[0.97]` + `active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)]`. Na mobile zamiast "zbliżam się do ciebie" (hover) jest "uginasz mnie" (depress). Fizycznie poprawna haptyczna odpowiedź.

**`KineticHapticFlash`**
Na `:active` chwilowo podmienia kolor tła elementu na `--teal-300` lub `--purple-300` i natychmiast wygasza. "Szok kinetyczny" — błysk napięcia przy dotknięciu, zastępujący hover w estetyce cyberpunk/HUD.

**`EmissiveRippleEffect`**
Przy dotyku emituje falę `rgba(255,215,0,0.2)` rozszerzającą się od punktu styku. W przeciwieństwie do Material Design ripple (ciemna plama), Maestro Ripple jest emisyjny — złota energia wypływa spod szkła karty.

---

### ✨ GLOW I OPTYKA EMISYJNA

**`DropShadowGlowWrapper`**
Zewnętrzny wrapper stosujący `filter: drop-shadow()` zamiast `box-shadow` dla kart z `clip-path`. `drop-shadow` podąża za krawędzią maski wektorowej, nie za "pudełkiem". Jedyne rozwiązanie dla świecących nieregularnych kształtów.

**`MultiLayerNeonGlow`**
Wielowarstwowy neon przez kilka `drop-shadow()` z różnymi promieniami (8px ostry + 20px rozproszony). Symuluje fizykę prawdziwego neonu — intensywne centrum + szeroka aura. Używany dla kart premium Web3/kryptografia.

**`EmissiveCtaBorder`**
Element CTA z jasną poświatą krawędziową jako alternatywą dla cienia w Dark Mode. Krawędź emituje `--gold-400` lub `--purple-300`, tworząc efekt samoemisyjnego obiektu. Informuje użytkownika o stanie aktywnym przez światło, nie przez cień.

**`CyberpunkGlowText`**
Tekst z `text-shadow` warstwowym: ostry obrys `#001111` ze wszystkich 4 stron (blokuje krwawienie białego anti-aliasingu) + miękka złota poświata centrum. Czytelny na każdym tle geometrycznym.

---

### 📝 TYPOGRAFIA I FORMULARZE (Shadow Maestro Anatomy)

**`LetterPressHeading`**
Nagłówek z efektem wyrytego tekstu (Letterpress): kolor tekstu ciemniejszy od tła + `text-shadow` z górnym ciemnym cieniem i dolnym jasnym promieniem. Fizyczna komunikacja "pusty/nieaktywny" dla placeholderów i disabled labels.

**`CrispHudText`**
Tekst monospacjalny z `text-shadow: 0 0 10px rgba(0,0,0,0.4)` jako niewidocznym buforem ochronnym. Pochłania "krwawienie" białego anty-aliasingu — font staje się ostry jak brzytwa na tle siatek wektorowych HUD.

**`SpatialInputField`**
Pole formularza jako "wgłębienie w obudowie": `box-shadow: inset 0 2px 4px rgba(0,0,0,0.6)` (głębia) + `0 0 0 1px rgba(118,203,203,0.15)` (subtelna ramka przez spread bez blura). Stan focus: złota ramka + złota poświata. Zero layout shift.

**`InsetPlaceholder`**
Placeholder stylizowany techniką Letterpress — wytłoczony w tle, nie po prostu przyciemniony. Fizyczny komunikat "wpisz tutaj" przez iluzję zagłębienia zamiast `opacity: 0.5`.

**`EnergeticValueText`**
Wpisany tekst w formularzu z emisyjnym Glow (`--gold-400` lub `--purple-300`) — dane to "płynąca energia". Aktywuje się gdy `input:not(:placeholder-shown)`.

**`BoxShadowBorderInput`**
Input z ramką przez `box-shadow: 0 0 0 1px color` (spread bez blura) zamiast `border`. Nie przesuwa layoutu, nie jest obcinany przez `clip-path`, zachowuje `border-radius`.

---

### 🏗️ WZORCE STRUKTURALNE (Double Wrapper / PremiumCard)

**`PremiumCardMasked`**
Implementacja Double Wrapper dla kart z `clip-path`: zewnętrzny `div` z `filter: drop-shadow()` + padding, wewnętrzny `div` z `clip-path: polygon(...)` i `overflow-hidden`. Subtelny wewnętrzny border jako `absolute inset-0` z własnym `clip-path`. Wzorzec bazowy dla każdego futurystycznego kształtu.

**`ArcMaskSvgClip`**
Komponent definiujący `<clipPath id="arc-mask">` z ściętymi narożnikami (np. `polygon(0 15px, 15px 0, 100% 0, ...)`). Używany przez `PremiumCardMasked`. Oddzielony od logiki karty dla reużywalności.

**`SvgKineticBorder`**
`<path>` SVG osadzony wewnątrz maskowanej karty, rysujący "świecącego węża" przez `strokeDasharray` + animację `spin`. Zamiast cieniowania buduje wypukłość przez kinetyczne krawędziowe oświetlenie. Nieobcinany przez maskę bo jest wewnątrz.

**`GlassRimLightCard`**
Karta z wypukłością przez podwójny gradient tła: ciemne tło (`padding-box`) + gradient krawędzi od złota do przezroczystości (`border-box`). Zero blur, zero `box-shadow` — czysta technika `border-image` przez double background. GPU-free rendering.

---

### 🔲 MIKRO-GEOMETRIA 1PX (Maestro Micro-Grid)

**`BevelInsetHighlight`**
Pseudoelement `::after` z `box-shadow: inset 1px 1px 0px rgba(255,255,255,0.15), inset -1px -1px 0px rgba(0,0,0,0.4)`. Zerowe użycie GPU (brak blura), a element natychmiast "odstaje" od ekranu jak wycięty akryl.

**`TechnicalGridOverlay`**
Absolutnie pozycjonowany `div` z `background: repeating-linear-gradient(...)` tworzący 1px siatkę co 20-40px. Półprzezroczyste linie (`rgba(204,247,244,0.03)`) dają cyberpunkowy, awioniczny charakter bez PNG i bez SVG `<line>` (który ma błąd zerowej obwiedni).

**`SurfaceCurvatureGradient`**
Niemal niezauważalny `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)` na tle karty. Mózg interpretuje nierównomierne łapanie światła jako wypukłą czaszę (convex). Zero kosztu renderowania.

**`RimLightBorderImage`**
Ramka przez `border-image` z gradientem od `--gold-400` do `transparent` — karta łapie złote światło od góry, zanika w ciemność na dole. Alternatywa dla `box-shadow` na kartach z `clip-path`.

---

### 🎢 PERSPEKTYWA 3D I TRANSFORMACJE

**`Perspective3DScene`**
Kontener z `perspective: 1000px` — wymagany wrapper dla kart z `transform: rotateX/Y`. Bez niego rotacje wyglądają jak skalowanie, nie jak prawdziwa perspektywa.

**`MagneticTiltCard`**
Karta fizycznie obracająca się ku użytkownikowi przy hover: `rotateX(5deg) rotateY(-5deg) translateZ(10px)` w spoczynku → `rotateX(0) rotateY(0) translateZ(30px)` przy hover. "Magnetyzm" — karta prostuje się, jakby przyciągała wzrok. Pełna sprzętowa akceleracja.

**`GyroscopeTiltCard`**
Wariant `MagneticTiltCard` sterowany żyroskopem urządzenia (DeviceOrientation) zamiast myszą. Na mobile karta "odpowiada" na fizyczne przechylenie telefonu. Wymaga `GyroscopeLightVector`.

**`GlassmorphicElevation`**
Panel stosujący `backdrop-blur-md` + `bg-white/5` + `transform-gpu translate-z-0` jako alternatywę dla cieni — im wyżej na Z-axis, tym silniejsze rozmycie tła pod elementem. Fizyczna optyka: szkło wyżej = mocniejsza dyfrakcja.

---

### 🧰 HOOKS SPECYFICZNE DLA DOC. 4

**`useWebGPUSpatialEngine()`** — inicjalizuje adapter WebGPU, device, context; zwraca `canvasRef` + status

**`useSpatialSensorySync(updateUniformCallback)`** — uruchamia AmbientLightSensor + DeviceOrientation, normalizuje dane, wywołuje callback z gotowymi uniformami

**`useZAxisHaptics(rootRef)`** — attachuje globalny `pointerdown` listener do drzewa, automatycznie wyzwala profile piezoelektryczne

**`useSdfRegistration(elementRef, shape, zLevel)`** — rejestruje element w globalnym SDF registry — konieczne by shader WGSL wiedział o istnieniu elementu

**`useMobileHoverGuard()`** — zwraca `isHoverCapable: boolean` z `@media (hover: hover) and (pointer: fine)`; używany do warunkowego stosowania hover efektów

**`useGyroscopeTilt(sensitivity)`** — zwraca `{ rotateX, rotateY }` aktualizowane przez DeviceOrientation, gotowe do `transform: rotateX(${rotateX}deg)`

**`useEmissiveRipple(containerRef)`** — zarządza cyklem życia ripple effect przy `pointerdown` — tworzy, animuje i usuwa element fali emisyjnej

# MASTER LISTA KOMPONENTÓW — Ekosystem Taktylnego Maksymalizmu
## React / Next.js / NestJS / TypeScript / Tailwind v4

---

## 🏛️ I. FUNDAMENT SYSTEMU (Providers / Tokens / Config)

**`ElevationProvider`** — globalny context React z wirtualnym źródłem światła (kąt, intensywność); wszystkie komponenty oświetleniowe czerpią z niego

**`ThemeEnvironmentProvider`** — zarządza stanem motywu (light / dark / emissive-dark / sunlight-high-contrast); ustawia `data-environmental-theme` na `<html>`

**`ZAxisTokenRegistry`** — mapa tokenów głębi Z-0→Z-10 z wartościami przesunięć cieni, rozmycia i jasności tła dla każdego poziomu

**`OklchThemeProvider`** — globalny provider zmiennych CSS opartych na OKLCH zamiast hex/HSL; fundament całego systemu wizualnego bez color bandingu

**`NocturnalPaletteTokens`** — definicja trzech osi palety: `--color-teal-900` (fundament), `--color-gold-400` (akcja CTA), `--color-purple-300` (informacja/focus)

**`ShadowMaestroRegistryProvider`** — globalny rejestr żetonów elewacji; deweloper deklaruje `elevation="Z-5"`, silnik oblicza Key Light + Ambient Light; nigdy nie pisze `box-shadow` bezpośrednio

**`HoudiniPaintProvider`** — inicjalizuje i rejestruje CSS Paint Worklet przez `CSS.paintWorklet.addModule()`; musi być załadowany globalnie przed jakimkolwiek `background-image: paint(...)`

---

## 🌑 II. SILNIK OŚWIETLENIA I CIENI (Shadow Maestro Engine)

**`ShadowMaestroLayer`** — wrapper nakładający matematycznie wyliczony cień kierunkowy (Key Light) + otoczenia (Ambient Light) na podstawie tokenu Z-axis; nie ma własnego wyglądu — jest "fizyką" dla dzieci

**`KeyLightShadow`** — twardy cień kierunkowy obliczony trigonometrycznie względem jedynego wirtualnego słońca sceny

**`AmbientLightShadow`** — miękki, niekierunkowy cień otoczenia grawitacyjnie dystrybuowany proporcjonalnie do Z-tokenu

**`ChameleonShadowBox`** — cień obliczony z pigmentu podłoża przez `color-mix(in oklch, var(--surface-color) 60%, transparent)` zamiast czarnej plamy; eliminuje "Achromatyczne Kłamstwo"

**`ChameleonPaintCard`** — karta używająca CSS Paint API do narysowania cienia proceduralnie w tle; zerowe obciążenie głównego wątku

**`OklchColorMixShadow`** — utility obliczający kolor cienia w przestrzeni OKLCH; matematycznie poprawne zaciemnienie pigmentu zamiast `rgba(0,0,0,0.5)`

---

## 🪟 III. LIQUID GLASS / GLASSMORPHISM 2.0

**`LiquidGlassPanel`** — panel z `backdrop-blur(20px)` obowiązkowo sparowanym z `saturate(200%)`; bez saturacji ciemne tło tworzy "brudne szarości"

**`SubpixelBorderFrame`** — mikro-krawędź `oklch(1 0 0 / 0.125)` dla szklanych komponentów w Dark Mode; bez niej szklana powierzchnia staje się niewidzialna

**`GlassCompositorIsolator`** — wrapper z `transform: translateZ(0)` + `will-change: transform` TYLKO na interaktywne panele; zapobiega Layer Squashing niszczącemu FPS

**`StaticGlassPanel`** — wersja bez kompozycji GPU dla paneli nieinteraktywnych; rozróżnienie od `LiquidGlassPanel` chroni VRAM

**`GlassRimLightCard`** — karta z wypukłością przez podwójny gradient: ciemne tło (`padding-box`) + gradient krawędzi od `--gold-400` do `transparent` (`border-box`); zero blur, zero box-shadow

**`GlassmorphicElevation`** — im wyżej na Z-axis, tym silniejsze `backdrop-blur` pod elementem; fizyczna optyka szkła bez cienia

---

## 🟤 IV. NEOMORFIZM I SKEUOMORFIZM

**`NeomorphicCard`** — karta "wyciśnięta z materiału tła": dwa `box-shadow` (biały lewy-górny + ciemny prawy-dolny), brak kontrastujących krawędzi

**`NeomorphicButton`** — convex w spoczynku → concave/inset po naciśnięciu przez zamianę `box-shadow` na `inset`; zero JS do przełączania stanu

**`SoftUIToggle`** — przełącznik ON/OFF: OFF wypukły, ON wklęsły; fizyczna intuicja stanu bez etykiet

**`NeomorphicSlider`** — track wklęsły (inset), thumb wypukły (convex); użytkownik "ciągnie" unoszoną bryłę przez zagłębiony rowek

**`NeomorphicInputField`** — pole formularza wklęsłe w materię tła; zagłębienie sugeruje "wpisz tutaj" bez obramowań

**`AccessibilityNeomorphicWrapper`** — HOC naprawiający wadę czystego neomorfizmu: dodaje `subpixel border` i `high-contrast outline` dla WCAG 2.2

**`SkeuomorphicBookCover`** — okładka książki w czystym CSS bez bitmap; wielostopniowy `linear-gradient` symuluje grzbiet, odbicie i masę bryły

**`SkeuomorphicMaterialSurface`** — wrapper aplikujący iluzję tekstury (metal, plastik, karton) wyłącznie przez CSS gradients; bezstanowa funkcja GPU

**`VirtualEmbossText`** — nagłówek z efektem wytłoczonego tekstu (Chisel Hard); ostre metaliczne sfazowanie wzdłuż wektorów liter

---

## 🛋️ V. PILLOW CUSHION (Tłoczenie Poduszkowe)

**`PillowEmbossButton`** — przycisk z dwoma `inset` cieniami (biały lewy-górny + czarny prawy-dolny); przy `border-radius: 25%` przeglądarka wygina promienie wzdłuż krzywizn

**`PillowEmbossCard`** — karta z krawędziami "wstemplowanymi pod ciśnieniem" w podłoże; środek wybija się ku górze jak napięta tkanina poduszki

**`ChiselHardBadge`** — badge z twardym metalicznym tłoczeniem bez rozmycia; idealne do numerów, statusów, tagów premium

**`SmoothEmbossPanel`** — miękkie tłoczenie organiczne (Smooth technique); dla elementów "ciepłych" (onboarding, empty states)

**`PillowCushionProximityCard`** — karta wyczuwająca zbliżenie kursora przez SDF; zaczyna się odkształcać wklęśle (Concave Debossing) ułamek sekundy przed kliknięciem

**`PillowPressAnimation`** — animacja wciśnięcia Pillow przy `:active`: manipulacja gradientem refleksji + minimalny `outer-glow` symulujący odbicie fotonów

---

## 🖼️ VI. DOUBLE BORDER I WYPUKŁE RAMKI

**`BevelBorderBox`** — wypukła ramka przez `border-top/left` w bieli + `border-bottom/right` w czerni; optyczny rowek bez przestarzałego `border-style: outset`

**`DoubleBorderFrame`** — podwójna ramka z precyzyjnymi proporcjami; trzy strategie przez props: `outline+offset`, `box-shadow spread`, `pseudo-elements`

**`OutlineOffsetBorder`** — podwójna ramka przez `border` (wewnętrzna) + `outline` z ujemnym `outline-offset`; zwięzły, bez ingerencji w Box Model

**`BoxShadowSpreadBorder`** — podwójna ramka przez `box-shadow: 0 0 0 10px #ccc, 0 0 0 15px #999`; pełne poszanowanie `border-radius`

**`PseudoElementBorder`** — ramka przez `::before`/`::after` z `z-index: -1`; każda ramka może mieć własny `transform: rotate()` lub `mix-blend-mode`

**`BoxShadowBorderInput`** — input z ramką przez `box-shadow: 0 0 0 1px color` bez blura; zero layout shift, nieobcinany przez `clip-path`

---

## 🏗️ VII. DOUBLE WRAPPER I MASKOWANIE (clip-path fix)

**`DoubleWrapperCapsule`** — zewnętrzny div generuje `drop-shadow` + padding; wewnętrzny trzyma `clip-path` i tło; rozwiązuje "przeciekanie radiusa" definitywnie

**`PremiumCardMasked`** — pełna implementacja Double Wrapper dla kart z `clip-path`; subtelny wewnętrzny border jako `absolute inset-0` z własnym `clip-path`

**`ArcMaskSvgClip`** — definicja `<clipPath id="arc-mask">` ze ściętymi narożnikami; oddzielona od logiki karty dla reużywalności

**`SdfBooleanMask`** — operacje boolowskie SDF (`max(d1, -d2)`) zamiast `clip-path`; łączy dowolne kształty z globalnym silnikiem oświetlenia bez żadnych ucięć

---

## ⚡ VIII. OPTYMALIZACJA BATERII (Opacity Channel / GPU Compositing)

**`MaestroHoverCard`** — hover przez `opacity` na `::after` zamiast `transition: box-shadow`; ~92% mniej obciążenia CPU; fundament każdego efektu hover

**`PrecompiledShadowBefore`** — `::before` z małym bazowym cieniem wyrenderowanym raz; nieanimowany

**`PrecompiledShadowAfter`** — `::after` z głębokim cieniem zbuforowanym w GPU, domyślnie `opacity: 0`; ujawniany płynnie przy interakcji

**`WillChangeOpacityWrapper`** — dodaje `will-change: opacity` TYLKO na czas animacji; usuwa po zakończeniu; chroni VRAM przed nadmiernym użyciem

**`CompositeAnimationWrapper`** — base wrapper dla każdego efektu hover w systemie; gwarantuje Hardware Compositing

**`ThermalThrottleGuard`** — dev-only; wykrywa `transition: box-shadow` w stylach i wyświetla warning; pilnuje zasady "zero modyfikacji blur w animacji"

---

## 🌅 IX. ADAPTACJA ŚRODOWISKOWA (Ambient Sensor)

**`AmbientLightProvider`** — inicjalizuje `AmbientLightSensor`, kwantyzuje odczyty (co 25 lux), uśrednia sygnałem EMA (0.8/0.2), wystawia `--ambient-lux`

**`AmbientLuxNormalizer`** — konwertuje surowe luxy na 0.0–1.0 przez `Math.log10`; ludzkie oko reaguje nieliniowo

**`EnvironmentalThemeSwitcher`** — < 30 lux → `emissive-dark`; > 800 lux → `sunlight-high-contrast`; podmienia tokeny kontrastu i poświaty

**`SpatialSensorySync`** — synchronizuje `AmbientLightSensor` + `DeviceOrientation`; wysyła dane do `UniformBufferBridge` i CSS Custom Properties jednocześnie

**`GyroscopeLightVector`** — przelicza `event.gamma` i `event.beta` na wektor `(x, y)` kierunku wirtualnego słońca; cienie obracają się z telefonem

**`PermissionGate`** — obsługuje zgody na `ambient-light-sensor` + `DeviceOrientation`; graceful degradation do ręcznego Dark Mode

**`LuxDebugOverlay`** — dev-only; pokazuje aktualne luxy, wygładzony sygnał, tryb środowiskowy, stan uprawnień

---

## 🌑 X. DARK MODE 2.0 (Luminance Step-Up / Emissive Glow)

**`LuminanceStepUpSurface`** — tło rozjaśniające się proporcjonalnie do Z-level; Z-0 = czerń absorpcyjna, Z-3 = rozjaśniona szarość; zastępuje niewidoczne ciemne cienie

**`EmissiveGlowBadge`** — aktywny element emitujący neonową poświatę zamiast klasycznego cienia; dla Dark Mode / `emissive-dark`

**`EmissiveNeonBorderCard`** — karta z świecącymi krawędziami wektorowymi w Dark Mode; zamiast niewidocznych ciemnych cieni krawędzie zapalają się neonem

**`EmissiveCtaButton`** — przycisk CTA emitujący neonową poświatę kierunkową komplementarną do luksów otoczenia; nie oślepia (halacja)

**`OledDeepTurquoiseBg`** — tło `oklch(0.15 0.05 190)` zamiast `#000000`; diody OLED w minimalnym napięciu; eliminuje Black Smearing

**`NocturnalOpulenceLayout`** — pełnoekranowy layout Dark Mode z doktryną "Nocturnal Opulence"; Z-0 = głęboki turkus, nie czerń

**`BlackSmearingTest`** — dev-only; scrollowalny tekst na `#000` vs `oklch(0.15 0.05 190)` na urządzeniu OLED

---

## 🖥️ XI. WEBGPU I HOUDINI (Rendering Pipeline)

**`WebGPUSpatialEngine`** — hook inicjalizujący potok WebGPU jako ukryty proces poboczny; cały DOM leży nad canvas z `z-index: -1`

**`WgslSpatialUICanvas`** — pełnoekranowy canvas WebGPU pod aplikacją; wykonuje raymarching 2D i Soft Shadows przez SDF dla każdego zarejestrowanego elementu

**`WgslShaderModule`** — moduł z funkcjami WGSL: `sdRoundRect` i `calculateSoftShadow`; rdzeń matematyczny cieniowania

**`UniformBufferBridge`** — zarządza `GPUBuffer` przesyłającym `light_direction`, `ambient_intensity`, `resolution` do shadera; most między sensorami a GPU

**`WcWgslShadowCanvas`** — Web Component (`wc-wgsl-shadow-canvas`); natywne okno do potoku WebGPU; dla HUD z tysiącami cząsteczek i emisyjnych blaskach

**`SdfRoundRectPanel`** — panel opisany przez SDF zamiast `border-radius`; matematycznie poprawne miękkie cienie bez artefaktów

**`SdfSoftShadowRenderer`** — renderuje miękkie cienie przez 32-iteracyjny raymarching; oblicza półcień z kąta ominięcia przeszkody; niedostępne w żadnym CSS

**`SdfDistanceField`** — Compute Shader obliczający pole odległości dla wszystkich elementów UI jednocześnie; aktualizowany gdy zmienia się layout

**`WebGPUFallbackDetector`** — feature detection + automatyczny fallback do Houdini lub `box-shadow`; graceful degradation bez crashu

**`ChameleonPaintCard`** — karta z CSS Paint API; pobiera `--chameleon-color`, `--chameleon-depth`, `--chameleon-blur`; zerowe obciążenie głównego wątku

**`SpatialShadowPainter`** — Houdini Paint Worklet malujący cień proceduralnie w tle; odbiera `--z-elevation` i `--light-angle` z CSS Properties

**`SdfGeometryMask`** — komponenty z kształtami SDF; `smoothstep` antialiasing krawędzi bez artefaktów; dla fasetowanych kształtów HUD

---

## 🤖 XII. GENERATIVE UI / AGENTOWY (GenUI / A2UI)

**`AgenticLayoutOrchestrator`** — przechwytuje strumień stanu agenta AI (LangGraph/CopilotKit); dynamicznie montuje TYLKO te komponenty potrzebne w danej chwili

**`RenderDynamicAIWidget`** — fabryka: gdy `aiState.status === 'streaming'`, montuje `DoubleWrapperCapsule` z `AgenticDashboard` i tokenem `Z-2`

**`AgenticDashboard`** — dynamicznie wypełniany kontener dla widgetów analitycznych agenta; przyjmuje `payload` i `elevation`; podpięty pod Shadow Maestro

**`DelegativeIntentBar`** — input semantyczny zamiast klikania w predefiniowane przyciski; artykułuje intencję do LLM i uruchamia `AgenticLayoutOrchestrator`

**`StreamingStatusIndicator`** — wizualizuje fazę generowania UI: oczekiwanie / strumieniowanie / gotowe; używa `EmissiveGlowBadge`

**`GenUINodeMount`** — wrapper dla każdego węzła generowanego przez agenta; automatycznie aplikuje `starting:` animację wejścia

---

## 🎬 XIII. ANIMACJE WEJŚCIA (starting-style)

**`CrystalizeEntry`** — animacja wejścia przez `@starting-style`; stan startowy: `opacity-0 scale-80 -rotate-12 blur-xl`; zero Framer Motion

**`StreamingListItem`** — element listy ze strumienia WebSocket z animacją krystalizacji; wchodzi z góry, przechodzi płynnie do pozycji

**`AnimatedModal`** — modal z `starting:` zamiast bibliotek; eliminuje "sztywną bryłę" przy pojawieniu się w DOM

---

## 🚫 XIV. STANY NEGATYWNE (not-\* variant)

**`FocusPullGallery`** — efekt kinowej koncentracji: hover na grupę → wszystkie karty prócz tej pod kursorem dostają `opacity-40 scale-95 blur-sm`; zero `hoveredId` w React

**`SmartDisabledButton`** — `not-disabled:hover:bg-gold-400`; hover działa tylko gdy nie `disabled`; zero warunkowego JS

**`ExclusiveActiveTab`** — nieaktywne taby `not-[aria-selected=true]:opacity-50`; stan wynika z ARIA, nie z klasy JS

**`HoverOnlyDesktop`** — stosuje efekty hover wyłącznie gdy `@media (hover: hover) and (pointer: fine)`; eliminuje "Sticky Hover" na mobile

---

## 📱 XV. MOBILE TAKTYLNOŚĆ

**`MobileDepressButton`** — na `:active` wcisk zamiast uniesienia: `active:scale-[0.97]` + `active:shadow-[inset_0_4px_10px_...]`; fizycznie poprawna odpowiedź na touch

**`KineticHapticFlash`** — chwilowa podmiana koloru tła przy `:active` i wygaszenie; "szok kinetyczny" zastępujący hover w estetyce cyberpunk

**`EmissiveRippleEffect`** — przy touch emituje emisyjną falę `rgba(255,215,0,0.2)` od punktu styku; złota energia spod szkła zamiast Material Design ciemnej plamy

---

## 🖐️ XVI. HAPTOGRAFIA (Piezoelectric Z-Axis)

**`ZAxisHapticProvider`** — globalny `pointerdown` listener; odczytuje `data-z-elevation`; wywołuje `navigator.vibrate()` z profilem piezoelektrycznym

**`HapticSignatureRegistry`** — rejestr wzorców wibracyjnych (ms ON/OFF) dla Z-0→Z-3; jeden obiekt konfiguracyjny dla całego systemu haptycznego

**`ZElevationAttribute`** — HOC automatycznie dodający `data-z-elevation="Z-N"` na podstawie tokenu elewacji; wymagany przez `ZAxisHapticProvider`

**`ShockwavePointLight`** — fala uderzeniowa po kliknięciu: chwilowy `dynamic point-light` przeliczający cienie sąsiednich elementów na osi Z

---

## ✍️ XVII. TYPOGRAFIA PRZESTRZENNA

**`TabularNumericDisplay`** — `font-feature-settings: "tnum"`; eliminuje "Financial Jitter" — skakanie layoutu przy aktualizacji danych strumieniowych

**`BalancedHeadline`** — `text-wrap: balance`; eliminuje "Tekstowe Sieroty" niezależnie od szerokości okna

**`LetterPressHeading`** — tekst wyryta techniką Letterpress: kolor ciemniejszy od tła + `text-shadow` ciemny górny + jasny dolny

**`CrispHudText`** — tekst z niewidocznym `text-shadow: 0 0 10px rgba(0,0,0,0.4)`; pochłania krwawienie białego anti-aliasingu na tle siatek HUD

**`CyberpunkGlowText`** — ostry obrys ze wszystkich 4 stron (blokuje bleeding) + miękka złota poświata centrum; czytelny na każdym tle geometrycznym

**`ClampFluidText`** — tekst ze skalą `clamp(1.5rem, 5cqi, 3rem)`; rozmiar reaguje na szerokość kontenera, nie viewportu

---

## 📝 XVIII. FORMULARZE AGENTOWE

**`AutoResizeTextarea`** — `field-sizing-content`; automatyczne rozszerzanie bez JS; Tailwind v4 deleguje do silnika CSS

**`AgentIntentInput`** — pole semantyczne z `min-h-[56px]`, `focus:ring-2 focus:ring-purple-300`; punkt wejścia do systemu GenUI

**`SpatialInputField`** — pole jako "wgłębienie w obudowie": `inset` box-shadow (głębia) + `0 0 0 1px` (ramka bez layout shift); focus: złoty neon

**`InsetPlaceholder`** — placeholder stylizowany Letterpressem; fizyczny komunikat "wpisz tutaj" przez zagłębienie zamiast `opacity: 0.5`

**`EnergeticValueText`** — wpisany tekst z emisyjnym Glow `--gold-400`; aktywuje się przy `input:not(:placeholder-shown)`

---

## 📐 XIX. CONTAINER QUERIES I LAYOUTY

**`ContainerQueryWrapper`** — bazowy `@container`; element reaguje na swój kontener, nie na monitor; fundament widgetów GenUI

**`AdaptiveAnalyticsWidget`** — widget analityczny z `grid-cols-1` → `@md:grid-cols-3` na podstawie kontenera; działa jako fullscreen i w wąskim Drawer

**`SafeAreaNavBar`** — `pb-[env(safe-area-inset-bottom)]`; chroni przed Dynamic Island i Home Indicator na iOS

**`SafeAreaPageWrapper`** — wrapper stron uwzględniający wszystkie `env(safe-area-inset-*)`; fundament aplikacji mobilnych

**`FoldableScreenAdapter`** — logiczne właściwości CSS (`mbs-*`, `pis-*`) zamiast `mt-*`/`ml-*`; poprawny układ na składanych ekranach i RTL

---

## 🔲 XX. MIKRO-GEOMETRIA I TEKSTURY 1PX

**`BevelInsetHighlight`** — `::after` z `inset 1px 1px 0px rgba(255,255,255,0.15), inset -1px -1px 0px rgba(0,0,0,0.4)`; zero GPU (brak blura), element "odstaje" jak akryl

**`TechnicalGridOverlay`** — `repeating-linear-gradient` tworzący 1px siatkę co 20-40px; cyberpunkowy charakter bez PNG i bez SVG `<line>` (który ma błąd zerowej obwiedni)

**`SurfaceCurvatureGradient`** — `linear-gradient(135deg, rgba(255,255,255,0.05) ... rgba(0,0,0,0.05))` na tle; mózg interpretuje nierównomierne światło jako convex

**`SvgKineticBorder`** — `<path>` SVG z `strokeDasharray` + animacja `spin`; "świecący wąż" kinetycznego oświetlenia krawędzi wewnątrz maskowanej karty

**`AtmosphericNoiseOverlay`** — drobnoziarnista tekstura szumu na gradiencie tła; maskuje color banding i dodaje fizycznej szorstkości; upodabnia do ekranów CRT

---

## 🎢 XXI. PERSPEKTYWA 3D

**`Perspective3DScene`** — kontener z `perspective: 1000px`; wymagany wrapper dla kart z `rotateX/Y`

**`MagneticTiltCard`** — karta obracająca się ku użytkownikowi przy hover: `rotateX(5deg) rotateY(-5deg) translateZ(10px)` → prostuje się do `translateZ(30px)`; pełna sprzętowa akceleracja

**`GyroscopeTiltCard`** — wariant sterowany żyroskopem urządzenia zamiast myszą; na mobile karta odpowiada na przechylenie telefonu

---

## 🌐 XXII. SPECJALNE / XR

**`WebXRCoinTipWidget`** — wirtualna moneta z fizyką kolizji (Ammo.js/Three.js) rozbijająca się na fizycznym biurku wykrytym przez LiDAR; dla systemów monetyzacji twórców streamingowych

**`SentientNeuroSpatialMesh`** — koncepcyjny komponent "żywego organizmu UI"; redukuje głębię cieni i wygładza krawędzie SDF gdy biometryka wykryje stres użytkownika; emituje uspokajającą poświatę

**`HaptoOpticalResonanceEmitter`** — Hapto-Optyczny Rezonans Emisyjny: predykcja kontaktu przez SDF + Concave Debossing przed kliknięciem + fala uderzeniowa ze sprzężeniem do luksów otoczenia

---

## 🔧 XXIII. UTILITY HOOKS (kompletna lista)

**`useAmbientLux()`** — bieżąca wartość luksów z `AmbientLightProvider`

**`useElevationToken(zLevel)`** — CSS-variables dla danego poziomu Z

**`useChameleonColor(surfaceColor)`** — oblicza `color-mix(in oklch, ...)` dla prawidłowego cienia pigmentowego

**`useProximityIntent()`** — śledzi prędkość kursora/zbliżenie dotyku; zwraca `isApproaching: boolean`

**`useAgentStream()`** — obsługuje strumień stanu agenta z CopilotKit/LangGraph; wystawia `aiState`

**`useWebGPUAvailable()`** — feature detection WebGPU + fallback strategy

**`useHoudiniPaint()`** — sprawdza dostępność CSS Paint API; rejestruje worklet; obsługuje fallback

**`useNeomorphicShadow(baseColor, elevation)`** — oblicza parę cieni (highlight + drop) dla neomorfizmu

**`usePillowEmboss(borderRadius, depth)`** — zwraca parametry `box-shadow inset` dla efektu Pillow

**`useBevelBorder(lightAngle)`** — generuje `border-top/left/bottom/right` symulujące bevel

**`useOledSafeBlack()`** — zwraca `oklch(0.15 0.05 190)` zamiast `#000` + feature detection OLED

**`useNocturnalLuminanceStep(zLevel)`** — jasność tła dla danego Z-level w Dark Mode

**`useSdfRegistration(elementRef, shape, zLevel)`** — rejestruje element w globalnym SDF registry dla shadera WGSL

**`useMobileHoverGuard()`** — `isHoverCapable: boolean` z `@media (hover: hover) and (pointer: fine)`

**`useGyroscopeTilt(sensitivity)`** — zwraca `{ rotateX, rotateY }` z DeviceOrientation

**`useEmissiveRipple(containerRef)`** — zarządza cyklem życia emisyjnej fali przy `pointerdown`

**`useZAxisHaptics(rootRef)`** — attachuje `pointerdown` listener; automatycznie wyzwala profile piezoelektryczne

**`useTabularNumbers()`** — opakowuje wartości numeryczne w `font-feature-settings: "tnum"`

**`useContainerSize()`** — `ResizeObserver` na kontenerze; zwraca breakpoint `@container` dla logiki JS-side

**`useStartingStyleSupport()`** — feature detection `@starting-style` + fallback

---

## 📄 XXIV. STRONY DEMO / TESTOWE (Next.js App Router)

`/demo/shadow-maestro` — piaskownica globalnego źródła światła; przesuwanie wektora (x_l, y_l) i obserwowanie cieni

`/demo/chameleon-shadows` — te same karty na różnych kolorowych tłach; achromatyczny cień vs. cień pigmentowy

`/demo/squishy-ui` — galeria taktylnych elementów: SquishyButton, ProximityAwareCard, InsetDeboss

`/demo/neomorphism` — showcase neomorfizmu z weryfikatorem WCAG; porównanie convex/concave/flat

`/demo/pillow-cushion` — showcase Pillow Emboss; Smooth vs. Chisel Hard; interaktywna animacja wciśnięcia

`/demo/double-border` — trzy technologie podwójnej ramki (outline, box-shadow, pseudo) w porównaniu

`/demo/liquid-glass` — weryfikacja 3 obostrzeń matematycznych (blur+saturate, subpixel border, compositor)

`/demo/oled-safe` — Black Smearing: `#000` vs `oklch(0.15 0.05 190)` na symulowanej matrycy OLED

`/demo/nocturnal-opulence` — showcase palety OKLCH; sRGB vs OKLCH na gradientach; live color banding test

`/demo/ambient-sensor` — live demo AmbientLightSensor z `LuxDebugOverlay`; przełączanie `environmental-theme`

`/demo/webgpu-canvas` — fullscreen WebGPU: SDF geometrie, emisyjne blaski, shadow maps; benchmark vs. DOM

`/demo/generative-ui` — `DelegativeIntentBar` + symulowany strumień agenta montujący `GenUINodeMount`

`/demo/starting-style` — porównanie wejścia: Framer Motion vs. natywny `starting:` via Tailwind v4

`/demo/not-variant` — interaktywna galeria Focus-Pull, disabled buttons, exclusive tabs

`/demo/financial-jitter` — live ticker z i bez `font-feature-settings: "tnum"`; widoczna różnica w stabilności

`/demo/container-queries` — ten sam widget w 3 kontekstach: fullscreen, sidebar 300px, modal 480px

`/demo/mobile-hover` — "Sticky Hover" vs. `@media (hover: hover)`; Depress State vs. Emissive Ripple

`/demo/haptic-matrix` — Z-Axis Haptics: dotykanie elementów różnych poziomów Z; LuxDebugHaptic panel

`/demo/hapto-resonance` — pełny Hapto-Optyczny Rezonans Emisyjny: zbliżenie → Deboss → kliknięcie → fala → cienie sąsiadów

`/settings/permissions` — zarządzanie uprawnieniami: ambient-light, DeviceOrientation; podgląd trybu środowiskowego

# 📄 DOKUMENT 1: Ochrona stanu / DLP w panelach konfiguracyjnych

## Komponenty Frontend (React/Next/Tailwind)

| Komponent | Zastosowanie |
|---|---|
| **DirtyStateProvider** (Context/hook) | Globalne śledzenie zmian formularza w oparciu o `dirtyFields` (RHF) lub porównanie `isDefaultValue` (TanStack) — odróżnia realne zmiany od przypadkowego wpisania i skasowania znaku |
| **NavigationBlockerModal** | Modal wywoływany przez `useBlocker` (React Router v6.30+), pytający o zapis przy próbie wewnętrznej nawigacji między zakładkami panelu |
| **BeforeUnloadGuard** (hook) | Rejestruje/odrejestrowuje `beforeunload` warunkowo, zależnie od `isDirty` — druga „twarda” warstwa ochrony (odświeżenie, zamknięcie karty) |
| **AutosaveStatusIndicator** | Mały wskaźnik UI („Zapisywanie…” / „Zapisano” / „Błąd zapisu”) informujący o cyklu debounce (np. 1500ms) zapisu do sessionStorage |
| **DraftRecoveryToast** | Baner/toast po powrocie użytkownika: „Znaleziono niezapisane zmiany z [godzina] — przywrócić?” z akcją Accept/Discard |
| **ConflictMergeAssistant** | Modal do rozwiązywania konfliktu lokalny-draft vs. dane z serwera (prompt-based resolution, `form.reset()`) |
| **SessionDraftManager** (serwis/hook) | Zarządza zapisem/odczytem do `sessionStorage` z metadanymi TTL i wersją schematu, izolowany per karta |
| **StaleSchemaWarning** | Komponent ostrzegający, gdy wersja aplikacji zmieniła się między zapisaniem drafta a próbą jego przywrócenia |
| **UnsavedChangesBadge** | Wizualna kropka/etykieta przy nazwie zakładki/sekcji panelu sygnalizująca niezapisane zmiany (bez modala) |
| **QuotaGuardWrapper** | Komponent/hook monitorujący zapełnienie `sessionStorage`, zapobiegający `QuotaExceededError` (np. przez odrzucanie zbyt dużych payloadów typu base64 logo) |
| **DiffPreviewPanel** | Panel pokazujący dokładnie *co* się zmieniło (np. „czcionka 12→14px”) — wykorzystanie `getDirtyValues` |
| **ExitIntentDialog** | Spersonalizowany, kontekstowy dialog wyjścia (zamiast generycznego komunikatu przeglądarki) z konkretną treścią zmian |

### Komponenty/moduły Backend (NestJS)

| Moduł | Zastosowanie |
|---|---|
| **DraftSyncController** | Endpoint do opcjonalnej synchronizacji brudnopisu z serwerem (poza sessionStorage), dla scenariuszy cross-device |
| **ConflictResolutionService** | Logika LWW (Last-Write-Wins) lub Delta-Pushing przy scalaniu wersji lokalnej i serwerowej |
| **SchemaVersionGuard** | Middleware/interceptor weryfikujący zgodność wersji struktury formularza między klientem a backendem |

### Katalog stron/widoków (Next.js)

- `/panel/widget/[id]/konfiguracja` — kreator widgetu/nakładki z pełną ochroną stanu
- `/panel/profil-firmy/[krok]` — wieloetapowy formularz profilu firmy
- `/panel/reguly-biznesowe` — edytor drzewa decyzyjnego (wysokie ryzyko utraty złożonego stanu)
- `/panel/recovery` — (opcjonalnie) widok „odzyskane sesje” jako log historii draftów

---

## 📄 DOKUMENT 2: TipJar+ — monetyzacja / eustres

### Komponenty Frontend (React/Next/Tailwind + Framer Motion)

| Komponent | Zastosowanie |
|---|---|
| **GoalProgressBar** | Pasek postępu celu z fizyką sprężyny (`response:0.4, damping:0.7`), gradient `gold-400`, efekt overshoot przy przekroczeniu progu |
| **QuickTipModal** | Modal wsparcia z kotwiczonymi kwotami 5/10/25 i podglądem na żywo — redukcja tarcia decyzyjnego fana |
| **LiveFanwall** | Strumień wiadomości wsparcia z limitem 120 znaków, awatarami i reakcjami wyłącznie emoji (bez wątków/komentarzy) |
| **ThankYouScreen** | Ekran podziękowania z personalizacją i płynnymi przejściami po dokonanej wpłacie |
| **RecurringSupportToggle** | Komponent aktywacji wsparcia cyklicznego z ikoną odnowienia (`purple-300`) i statusem „aktywny” |
| **WalletBalanceCard** | Karta salda USDC w widoku Desktop — abstrakcja portfela bez ujawniania złożoności krypto (seed phrase, gas) |
| **PayoutDefaultsPanel** | Panel ze stałymi, domyślnymi regułami wypłat (cel, częstotliwość, metoda) — „zero chaosu decyzyjnego” |
| **AutomationSuggestionCard** | Karta z rekomendacją systemową (np. „aktywuj wsparcie cykliczne”) w module Automations |
| **OwnerViewOverlay** | Subtelna nakładka trybu właściciela widoczna na własnej, publicznej stronie twórcy |
| **GoldShimmerBurst** | Komponent efektu wizualnego (subtelny błysk) przy osiągnięciu progu celu — wzmocnienie RPE |
| **SupporterAvatarBadge** | Awatar wspierającego z ikoną cyklu odnowienia, w Fanwall |
| **FeeTransparencyTooltip** | Tooltip/informacja reframująca prowizję platformy jako „koszt infrastruktury eustresu”, nie „podatek” |
| **CreatorDesktopLayout** | Główny layout panelu operacyjnego (Desktop/Studio) — centrum dowodzenia twórcy |
| **PublicCreatorProfile** | Publiczna strona twórcy (Page/Identity) z osadzonym Goal Bar i modalem wsparcia |
| **ProgressiveAnalyticsPanel** | Sekcja Analytics z ukrytymi/zwiniętymi surowymi metrykami — progressive disclosure zamiast BI-dashboardu |

### Komponenty/moduły Backend (NestJS + Prisma)

| Moduł | Zastosowanie |
|---|---|
| **CircleWebhookController** | Endpoint POST odbierający zdarzenia z Circle Programmable Wallets |
| **WebhookSignatureGuard** | Middleware weryfikujący nagłówek `X-Circle-Signature` (ECDSA) przeciw spoofingowi |
| **IdempotencyInterceptor** | Sprawdzanie `Idempotency-Key` (UUID v4) w Redis, odrzucanie duplikatów webhooków |
| **GoalProgressService** | Serwis aktualizujący sumę wpłat z użyciem `SELECT ... FOR UPDATE` — ochrona przed Write Skew |
| **PayoutService** | Logika domyślnych, stałych reguł wypłat |
| **RecurringPaymentScheduler** | Worker/cron obsługujący cykliczne obciążenia i aktualizację statusu subskrypcji |
| **TransactionQueueProcessor** | Asynchroniczna kolejka przetwarzania zdarzeń wpłat (odciążenie przy skokach ruchu) |
| **FanMessageModerationService** | Walidacja limitu 120 znaków i whitelisty emoji na poziomie API |

### Katalog stron/widoków (Next.js)

- `/[creator-slug]` — publiczna strona twórcy (Page/Identity)
- `/studio` — Desktop/Studio, centrum operacyjne po zalogowaniu
- `/studio/automations` — moduł sugestii i automatyzacji
- `/studio/analytics` — ukryte metryki (progressive disclosure)
- `/studio/payouts` — ustawienia domyślne wypłat
- `/studio/fanwall` — pełny widok historii wiadomości wsparcia

# Lista komponentów — na podstawie dokumentów: Iluzja Ruchu SVG + Inżynieria Interakcji (Fizyka Interfejsu TipJar+)

---

## 📄 DOKUMENT 3: Neurokognitywna architektura iluzji ruchu (SVG)

### Komponenty Frontend (React/Next/Tailwind — generatywne SVG)

| Komponent | Zastosowanie |
|---|---|
| **RotatingSnakesBackground** | Tło sekcji hero/landing generowane jako siatka SVG `<use>` z mutacją kątową modulo — przyciąga podświadomą uwagę bez ruchu JS/CSS (czysto percepcyjna iluzja) |
| **PeripheralDriftGrid** | Generator siatki wzorców PDI (rzędy/kolumny z przesunięciem fazowym) — komponent konfigurowalny (gęstość, rozmiar prymitywu, kolor) do sekcji „wow-effect” |
| **LuminanceSequenceDefs** (helper/hook) | Generuje sekwencję kolorów wg tabeli latencji (czerń→ciemnoszary→biel→jasnoszary lub Typ V) i wstrzykuje do `<defs>` |
| **OuchiFloatCard** | Karta/panel z wzorem Ouchi (ortogonalne paski wewnątrz vs. na tle) — element „pływający” przy scrollu/mikroruchach kursora, do wyróżnienia CTA |
| **PinnaBrelstaffRing** | Pierścień rotujący przy zbliżeniu/scrollu (parallax na oś Z) — dekoracyjny element wokół awatara/logo |
| **DeepTurquoiseCanvas** | Wrapper tła w kolorze `#006747`/`#004031` jako baza kontrastowa pod komponenty iluzji — komponent systemowy (theme background) |
| **ColorDependentIllusionSVG (Typ V)** | Wariant iluzji operujący na przeciwstawnych barwach (czerwień/turkus) zamiast achromatycznej — do sekcji promocyjnych wymagających maksymalnej fiksacji wzroku |
| **SymmetricComplexityPattern** | Generator symetrycznych, złożonych wzorów (mandala-like) wg krzywej Wundta — tło ładowania/loading state, redukuje NASA-TLX zamiast klasycznego spinnera |
| **IllusionIntensityControl** (panel deweloperski) | Suwaki do parametryzacji g1/g2 (luminancja), rozmiaru elementu, liczby powtórzeń — do podglądu/testowania „wysp” skuteczności iluzji |
| **SvgDefsPrimitiveLibrary** | Biblioteka reużywalnych prymitywów SVG (`<defs>`) do klonowania przez `<use>` — minimalizacja wagi pliku (3-4kB rdzeń, setki klonów) |
| **PhaseOffsetTransformer** (util) | Funkcja licząca kąt rotacji `r = (⌊(X+Y)/2⌋ mod 4) × 90°` do generowania siatek — reużywalna logika matematyczna |
| **StaticMotionHeroSection** | Sekcja hero łącząca DeepTurquoiseCanvas + RotatingSnakesBackground + tekst — gotowy landing block „percepcyjnego przyciągania uwagi” |

### Katalog stron/widoków (Next.js)

- `/showcase/illusions` — strona demonstracyjna z galerią wszystkich wariantów iluzji (edukacyjna/marketingowa)
- `/labs/svg-generator` — interaktywny generator wzorów PDI z eksportem SVG

---

## 📄 DOKUMENT 4: Architektura Fizyki Interfejsu TipJar+ (design system)

### Komponenty Frontend (React/Next/Tailwind + Framer Motion)

| Komponent | Zastosowanie |
|---|---|
| **ElevatedCard** | Karta z systemem uniesienia (`translateZ` + shadow tokens subtle→base→elevated→modal) — bazowy komponent do wszystkich „unoszących się” elementów UI |
| **GlassmorphicModal** | Modal z `backdrop-blur`, przezroczystością `bg-surface-modal`, `border-subtle` — okna dialogowe (potwierdzenia, autoryzacje) |
| **ToastStackManager** | System kolejkowania powiadomień z Z-axis stacking (nowy toast wypycha stary w głąb) + maszyna stanów Idle→Enter→Active→Exit→Dismissed |
| **SpringMotionWrapper** | HOC/wrapper aplikujący tokeny sprężystości (response/damping) i duration tokens (micro/small/medium/large) na dowolny element |
| **FluidTypographyText** | Komponent tekstowy z `clamp()` dla skali fs-display/h1/h2/h3/body-m/caption + rytm interlinii 1.1/1.5 |
| **ParallaxHeroProfile** | Sekcja hero profilu twórcy z paralaksą dotyku — asymetryczne przesunięcie warstw tła/pierwszego planu |
| **ThumbZoneActionBar** | Dolny pasek akcji (max 40% wysokości ekranu) na mobile — kontener na krytyczne CTA (wpłata, autoryzacja) |
| **FPatternDesktopLayout** | Layout desktopowy: nagłówek lewy-górny, treść centralna, panel akcji po lewej — wzorzec rozmieszczenia wg fiksacji wzroku |
| **HoverPresenceIndicator** | Komponent reakcji na Fine Pointer (desktop only) — zmiana koloru/uniesienie przy najechaniu, wyłączony na touch |
| **LongPressHapticButton** | Zastępstwo Hover na mobile — Long Press + mikrowibracja (Haptic Feedback API) jako potwierdzenie zaangażowania |
| **RippleTapEffect** | Animacja fali przy Tap — kompresja `scale(0.98)` + efekt rozchodzącej się kropli, zastępuje hover na dotyku |
| **SwipeableCard** | Karta obsługująca gest Swipe (płaszczyzna XY) jako alternatywa dla eksploracji przestrzennej na mobile |
| **ElevationShadowToken** (util/hook) | Hook zwracający odpowiedni token cienia (shadow-1/shadow-2) w zależności od stanu uniesienia elementu |
| **GPUSafeBlurContainer** | Wrapper wymuszający wyłączenie `backdrop-blur` podczas faz Enter/Exit animacji (tylko Idle/Active) — zapobiega spadkom klatek (jank) |
| **DesignTokenProvider** (Context) | Globalny provider dostarczający zamknięty zestaw tokenów (teal-700/800/900, spring, easing, duration) — wymusza „kontrakt Sandlera” (brak dowolnej personalizacji) |
| **TnumSafeCounter** | Komponent liczbowy z `font-feature-settings: "tnum"` — zapobiega Layout Shift przy zmieniających się wartościach (np. licznik wpłat) |

### Komponenty/moduły Backend (NestJS)

| Moduł | Zastosowanie |
|---|---|
| **ToastWebhookBridge** | Serwis łączący webhooki Circle/Gas Station z eventami wypychanymi do frontendu (WebSocket/SSE) zasilającymi ToastStackManager |
| **MotionTokenConfigService** | Serwis serwujący zamknięty zestaw tokenów animacji (spring/easing/duration) jako konfigurację — jedno źródło prawdy dla frontendu |

### Katalog stron/widoków (Next.js)

- `/profile/[slug]` — publiczny profil z ParallaxHeroProfile, FPatternDesktopLayout / ThumbZoneActionBar (responsywnie)
- `/studio/design-system` — wewnętrzna strona dokumentacji tokenów (Storybook-like) prezentująca ElevatedCard, ToastStackManager, GlassmorphicModal
- `/studio/notifications` — podgląd historii Toastów z pełną choreografią Z-axis

# 📄 DOKUMENT 5: Fizyka Interfejsu — pogłębienie (Toast Engine, Z-Axis, Performance)

## Komponenty Frontend (React/Next/Tailwind/Framer Motion)

| Komponent | Zastosowanie |
|---|---|
| **ToastStackEngine** (zaawansowana wersja) | Silnik zarządzający zmienną `--index` per toast: kompresja skali (`scale(1 - 0.05*index)`), offset Y (`--lift-amount * index`) — pełna implementacja stosu 3D zamiast prostego listowania |
| **BackdropBlurDelegator** | Komponent/hook wymuszający `backdrop-blur` **tylko** na toaście `--index: 0`; starsze toasty automatycznie przełączają się na lity fallback koloru (`teal-900`) — rozwiązanie konfliktu GPU overdraw |
| **ToastExpandOnHover** | Mechanizm „zawieszenia w czasie” — po najechaniu na stos toastów, zegar TTL zatrzymuje się, a karty rozkładają się kaskadowo w równych odstępach zamiast pozostawać skompresowane |
| **SwipeToDismissToast** | Gest przeciągnięcia z przekazaniem prędkości dłoni (`velocity`) do animacji wyrzutu (friction fling) — naturalne odrzucenie powiadomienia |
| **IntersectionAwareParallax** | Wrapper wykorzystujący `IntersectionObserver` do zawieszania obliczeń paralaksy poza viewportem — zapobiega layout thrashing na scrollu mobilnym |
| **CompositeOnlyTransform** (util) | Helper wymuszający wyłącznie właściwości kompozytowe (`translate3d`, `translateZ`) zamiast top/left — omija fazę layout/paint przeglądarki |
| **FluidTypeScale** (rozszerzony) | Konkretna implementacja tokenów `--fs-display/h1/h2/body-m` z proporcją Minor Second (1.1) → Major Third (1.25) między mobile a desktop |
| **HoverOnlyFinePointer** (hook/wrapper) | Wymusza `@media (hover: hover) and (pointer: fine)` — zapobiega „zawieszonym” stanom hover na dotyku |
| **RippleWeb3Effect** | Animacja fali w estetyce fioletu Web3, wyzwalana na `touchstart` jako zastępstwo hover na mobile |
| **LivePulseToast** (rebranding Toastu) | Semantycznie odseparowany od alertów systemowych/błędów formularza — wyłącznie do zdarzeń finansowych/społecznościowych, z własną osią Z |
| **BentoGridSection** | Modułowy układ siatki profilu (wspomniany jako kontener sekcji) — do budowy strony twórcy |

### Moduły Backend / Performance

| Moduł | Zastosowanie |
|---|---|
| **RenderBudgetMonitor** (dev tool) | Narzędzie diagnostyczne do wykrywania spadków FPS przy nakładaniu się wielu filtrów blur (GPU overdraw) |

---

## 📄 DOKUMENT 6: System Haptyczny TipJar+ (nowa domena — Core Haptics/AHAP)

### Komponenty Frontend (React/Next + natywne mosty Haptics)

| Komponent | Zastosowanie |
|---|---|
| **HapticEngineProvider** (Context) | Globalny provider inicjalizujący i pre-warmujący silnik haptyczny (`prepare()`) — redukcja latencji przy zbliżeniu palca/hover na CTA |
| **GoldCTAButton** (z haptyką) | Główny przycisk wsparcia — na `hover/touch-start` wywołuje `prepare()`, na `press` wyzwala Transient (intensity 0.85, sharpness 1.00) |
| **HapticTransientTrigger** (hook) | Reużywalny hook do wywoływania krótkich, ostrych impulsów (potwierdzenie decyzji/kliknięcia) |
| **HapticContinuousPulse** (hook) | Hook do generowania ciągłej fali sinusoidalnej niskiej amplitudy (imitacja „oddechu sieci”) — stan oczekiwania na transakcję |
| **TransactionStateHaptic** (state machine) | Deterministyczna maszyna stanów: Inicjacja (cisza) → Decyzja (Transient) → Tranzycja (Continuous/fiolet) → Konsensus (Crescendo+Transient+Fade) — **synchronizowana wyłącznie z webhookiem**, nigdy z on-click |
| **GoldSupernovaConfirmation** | Komponent efektu potwierdzenia sukcesu: 3-etapowa kompozycja (Crescendo 150ms → Klimaks Transient → Fade-out 300ms), sprzężony wizualnie ze złotym rozbłyskiem |
| **PurpleNetworkPulseBorder** | Obramowanie karty (np. USDC Balance) pulsujące fioletem w rytm haptycznej fali Continuous — wizualna synestezja stanu „tranzycji sieciowej” |
| **FailedTransactionHaptic** | Odrębny wzorzec haptyczny (ostre podwójne staccato) dla `transaction.failed` — semantycznie odróżnialny od sukcesu |
| **DisabledStateGuard** (HOC/hook) | Wymusza brak jakiegokolwiek sprzężenia haptycznego na elementach `isDisabled` — zapobiega dysonansowi „martwy wizualnie, żywy dotykowo” |
| **HapticIntensityScaler** | Komponent ustawień dostępności — suwak `scale` mnożący `hapticIntensity` (np. tryb subtelny -50%) na podstawie `haptic_preferences` z profilu użytkownika |
| **LiveStreamHapticFilter** | Auto-detekcja aktywnej sesji streamingu → dynamiczna zamiana zdarzeń Transient na łagodne Continuous o niskiej częstotliwości, by uniknąć wibracji wyłapywanych przez mikrofon |
| **HeartbeatSyncSender** | Komponent nadawcy wsparcia — koduje niestandardowy rytm haptyczny (`da-DUM`, 2 uderzenia z przerwą 150ms) jako metadane transakcji (`haptic_signature`) |
| **ChameleonMomentReceiver** | Komponent odbiorczy (dashboard twórcy) — dekoduje `haptic_signature` z WebSocket/SSE i odtwarza tożsamy rytm jako sekwencję świetlną (blur/glow) na karcie salda |
| **AHAPPatternLibrary** | Biblioteka predefiniowanych wzorców AHAP (Gold Transient, Purple Continuous, Heartbeat Sync, Failed Staccato) — źródło prawdy dla wszystkich komponentów haptycznych |

### Komponenty/moduły Backend (NestJS + Prisma)

| Moduł | Zastosowanie |
|---|---|
| **HapticPreferencesService** | Zarządzanie polem JSONB `haptic_preferences` (enabled/scale) w profilu użytkownika w PostgreSQL |
| **TransactionStateBroadcaster** | Serwis emitujący zdarzenia `transaction.pending/success/failed` przez WebSocket — jedyne źródło wyzwalania haptyki sukcesu/porażki (zapobiega fałszywej afirmacji) |
| **HapticSignaturePropagator** | Logika zapisu i przekazania `haptic_signature` z tabeli wsparcia do triggera SSE/WebSocket dla odbiorcy (Moment Kameleona) |
| **StreamSessionDetector** | Wykrywanie aktywnej sesji live (flaga w bazie/webhook z platformy streamingowej) do przełączenia trybu haptyki na „ciche” |

### Katalog stron/widoków (Next.js)

- `/settings/accessibility` — panel ustawień intensywności haptyki (dla `HapticIntensityScaler`)
- `/studio/live-mode` — tryb dla twórcy podczas streamu (aktywuje `LiveStreamHapticFilter` + `ChameleonMomentReceiver`)



## 📄 DOKUMENT 7: Synchronizacja aria-live z DOM (Dostępność / A11y)

### Komponenty Frontend (React/Next/TS)

| Komponent | Zastosowanie |
|---|---|
| **A11yAnnouncerProvider** (Context, root-level) | Globalny, nigdy-nieodmontowywany dostawca dwóch ukrytych regionów `aria-live` (polite/assertive) montowany w `App.tsx`/`_app.tsx` — rozwiązuje problem efemeryczności węzłów (Luka 1) |
| **useA11yAnnounce** (hook) | Hook konsumujący kontekst Announcera — udostępnia `announcePolite(msg)` / `announceAssertive(msg)` do wywołania z dowolnego komponentu wizualnego |
| **VisuallyHiddenLiveRegion** | Komponent CSS-only (`.visually-hidden`) zawierający oba kontenery `role="status"`/`role="alert"` — techniczna baza pod Providera |
| **AccessibilityPriorityMessageBus** (serwis/klasa) | Szyna kolejkowania komunikatów: throttling danych ulotnych, debouncing wyszukiwarki, message coalescing, stale purging (Luka 2) |
| **useThrottledAnnounce** (hook) | Wariant announce z wbudowanym throttlingiem (np. kursy walut co 15-30s zamiast każdej zmiany) |
| **useDebouncedSearchStatus** | Hook do komunikatów wyszukiwania („Znaleziono X wyników”) z opóźnieniem 800ms od ostatniego znaku |
| **MessageCoalescer** (util) | Łączy wiele zdarzeń tego samego typu w jedno zdanie zbiorcze („Trzy operacje wysyłania tokenów zakończone sukcesem”) w oknie `requestAnimationFrame` |
| **useA11yStateDiff** (hook) | Hook memoizujący poprzedni stan (`useRef`) i generujący naturalnojęzykowy opis delty przy zmianie wartości (Luka 3 — State Diffing Announcer) |
| **DeltaFormatter** (util/formatter) | Funkcja przyjmująca `{oldValue, newValue}` i zwracająca gotowe zdanie NLP („Saldo wzrosło o 5, obecnie 105”) z obsługą i18n |
| **AriaNotifyPolyfillWrapper** | Warstwa kompatybilności — używa natywnego `element.ariaNotify()` jeśli dostępne, w przeciwnym razie fallback na `A11yAnnouncerProvider` |
| **AccessibleLiveTable** | Wariant tabeli transakcyjnej z jawnie kontrolowaną granularnością odczytu (bez ślepego `aria-atomic="true"` na całej tabeli) — czyta tylko sformatowaną deltę przez Message Bus |
| **RouteChangeAnnouncer** | Komponent nasłuchujący zmian trasy (React Router) i wysyłający komunikat o nowym kontekście strony do regionu live — rozwiązuje utratę kontekstu przy client-side routingu |

### Moduły/serwisy pomocnicze

| Moduł | Zastosowanie |
|---|---|
| **AccessibilityEventNormalizer** | Warstwa pośrednia mapująca surowe zdarzenia WebSocket (np. z Circle/Gas Station) na znormalizowane obiekty do przetworzenia przez Delta Extractor przed wysłaniem do Message Bus |

### Katalog stron/widoków

- `/dev/a11y-testing` — wewnętrzna strona QA do testowania kolejki ogłoszeń z różnymi czytnikami ekranu (NVDA/JAWS/VoiceOver)

---

## 📄 DOKUMENT 8: Creator Pulse Workspace (Dashboard TipJar+)

### Komponenty Frontend — Layout i bloki (React/Next/Tailwind)

| Komponent | Zastosowanie |
|---|---|
| **ZPatternWorkspaceLayout** | Główny layout 4-blokowego dashboardu wg trajektorii skanowania Z (odbiór→wzrost→akcja→społeczność), CSS Grid z gap 24px |
| **PulseBlock** (Creator Pulse) | Centralny widget lewego-górnego rogu — status platformy w czasie rzeczywistym, subskrybuje SSE/Redis Pub/Sub, typografia `--fs-display` |
| **ActiveGoalBlock** | Prawy-górny blok celu z mini-wykresem Sparkline (SVG path, kolor gold-400), tytuł `--fs-h3` |
| **QuickActionsBlock** | Centralno-lewy blok z pojedynczym dominującym CTA (Assumed Close pattern) — wyzwala side-effecty (wagmi hooks, generowanie OG image) |
| **SupporterFeedBlock** (AI Insight) | Prawy-dolny blok — pula awatarów (32px/24px), gradient fallback dla braku zdjęcia, maskowane odznaki NFT (CSS masking) |
| **SparklineChart** | Miniaturowy wektorowy wykres liniowy do wizualizacji postępu celu bez surowych liczb |
| **AvatarBadgeStack** | Komponent renderujący stos awatarów z NFT-odznakami wyciętymi przez `radial-gradient` mask |
| **TabularNumberDisplay** | Komponent liczbowy z `font-feature-settings: "tnum"` — zapobiega „skakaniu” layoutu przy inkrementacji kwot na żywo |
| **HoverIntentTooltip** | Tooltip z opóźnieniem 500ms aktywacji — zapobiega przypadkowym nakładkom podczas swobodnego skanowania kursorem |

### Komponenty stanów emocjonalnych (State Machine)

| Komponent | Zastosowanie |
|---|---|
| **ColdStartPulseState** | Wariant PulseBlock dla nowego twórcy: „Nasłuchiwanie sieci…” zamiast „0.00 USDC”, pulsujący wskaźnik `--info-base` |
| **OnboardingGoalPrompt** | Wariant ActiveGoalBlock dla nowych kont — apriorycznie zakłada rozpoczęty proces wzrostu, oferuje odznaki za pierwszą aktywność |
| **PendingStateOverlay** | Stan „disabled + spinner S” dla elementów oczekujących na konsensus blockchain (2-12s) |
| **SkeletonScreenShimmer** | Placeholder z animowanym gradientem (`translateX`, 1.5s loop) dla ładowania zasobów (np. lista NFT ze Storj) |
| **ResonanceActiveState** | Wariant PulseBlock dla aktywnego twórcy z suporterami — podświetlenie `--success-light`, elewacja z-index i cień przy nowych wpłatach |

### Komponenty „Rumieniec” (Blush — mikrointerakcje sukcesu)

| Komponent | Zastosowanie |
|---|---|
| **GoldEmissionPulse** | Efekt świetlnej aury (`box-shadow` bursztynowy) wokół PulseBlock przy zaksięgowaniu wpłaty — krzywa `cubic-bezier(0.16,1,0.3,1)` |
| **AchievementShimmerBar** | Fala świetlna (`@keyframes shimmer`) przetaczająca się przez ActiveGoalBlock przy osiągnięciu progu celu (50%/100%) |
| **SpringySuccessToast** | Powiadomienie z krzywą sprężystą `cubic-bezier(0.175,0.885,0.32,1.275)`, indykator `--success-base`, z-index 9999 |
| **PressPhysicsButton** | Wariant CTA ze stanem `:active` — skala 0.98, zmiana koloru na gold-500, kondensacja cienia — imituje fizyczny opór złota |

### Komponenty/moduły Backend (NestJS + Prisma + Redis)

| Moduł | Zastosowanie |
|---|---|
| **PulseSSEGateway** | Endpoint Server-Sent Events subskrybujący kanał Redis Pub/Sub, propagujący zdarzenia salda do PulseBlock |
| **PessimisticLockBalanceService** | Serwis aktualizacji salda z blokadami pesymistycznymi/transakcjami atomowymi SQL — eliminacja race conditions przy wysokiej częstotliwości wpłat |
| **GoalProgressAggregator** | Serwis wyliczający postęp celu z danych on-chain (ERC-4337 Smart Accounts) do formatu Sparkline |
| **OnboardingStateService** | Logika rozróżniająca stan Cold/Pending/Resonance na podstawie historii konta twórcy |

### Katalog stron/widoków (Next.js)

- `/studio` (rozszerzenie) — implementacja `ZPatternWorkspaceLayout` jako głównego widoku po zalogowaniu
- `/studio/onboarding` — wariant workspace z `ColdStartPulseState` + `OnboardingGoalPrompt`

---

## Uwaga integracyjna między dokumentami

`PulseBlock`, `ActiveGoalBlock` i `SpringySuccessToast` z dokumentu 8 powinny być **owinięte w `useA11yAnnounce`/`useA11yStateDiff`** z dokumentu 7 — każda wizualna zmiana salda (Rumieniec, Shimmer) musi jednocześnie emitować sformatowaną deltę tekstową do `AccessibilityPriorityMessageBus`, inaczej cała warstwa emocjonalna "Blush" będzie niewidzialna dla użytkowników czytników ekranu.

Mogę teraz połączyć wszystkie 8 dokumentów w jedną, finalną mapę systemu komponentów TipJar+ (pełny design system + a11y layer) — dać znać, czy taki zbiorczy dokument ma sens.

Gotowe — podzieliłem na trzy części: to co warto wdrożyć z rozwinięciem (i moimi propozycjami rozszerzeń), standardową robotę do skopiowania, oraz miejsca gdzie narracja wyraźnie odjechała od realnej inżynierii (iluzje optyczne jako tło produktu, pseudo-precyzyjne statystyki, Moment Kameleona, SPIN/Sandler jako uzasadnienia).


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


Oto kompletna lista komponentów do aplikacji TipJar+ na stack React/Next.js/NestJS/TypeScript/Tailwind, opracowana na podstawie wszystkich pięciu dokumentów.

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

Przeczytałem dokument. To jest bardzo rozbudowany "raport badawczy" dotyczący adaptacyjnego kontrastu w interfejsach Web3 — napisany w stylu, który sprawia wrażenie naukowości, ale w rzeczywistości jest w dużej mierze pseudonaukowym bełkotem marketingowym z kilkoma sensownymi konceptami technicznymi w środku (APCA, OKLCH, WebGL shaders to realne rzeczy).

Na podstawie **realnych, sensownych problemów** opisanych w dokumencie — oto lista komponentów:

---

## Komponenty UI / Design System

**CircadianBackground** — animowane tło reagujące na porę dnia użytkownika, przechodzące przez palety teal → purple → gold. Serce całego panelu.

**ContrastToken** — wrapper tekstu dynamicznie przeliczający kolor czcionki algorytmem APCA względem aktualnego tła pod nim. Zastępuje statyczne klasy Tailwinda dla kolorów tekstu.

**AdaptiveText** — komponent typograficzny (h1–p) który dobiera jasność (L w OKLCH) do mierzonej luminancji tła, gwarantując Lc ≥ 75.

**ColorSwatch** — wizualizacja pojedynczego koloru w OKLCH z odczytem wartości L/C/H i odpowiadającego mu Lc kontrastu na danym tle.

**ContrastBadge** — mały badge pokazujący aktualny wynik Lc (lub ratio WCAG 2.1) przy elemencie; przydatny w trybie dev/debug panelu.

**GradientCanvas** — izolowany element `<canvas>` / WebGL renderujący wieloogniskowy gradient radialny jako tło; oddziela renderowanie GPU od DOM.

**LuminanceSampler** — niewidoczny komponent "workhorse" odpytujący FBO/WebGL o uśrednioną luminancję prostokąta pod wskazanym elementem DOM i wystawiający tę wartość przez Context.

**CircadianProvider** — Context/Provider przechowujący globalny stan pory dnia (parametr `t`), geolokalizację słońca i bieżącą paletę OKLCH. Zasila cały drzewo komponentów.

**DayPhaseIndicator** — pasek lub ikona pokazująca aktualną fazę cyrkadyczną (świt / dzień / zmierzch / noc) z płynną animacją przejść.

**OklchColorPicker** — picker barwy operujący natywnie na współrzędnych OKLCH zamiast HEX/HSL; dla panelu ustawień motywu.

---

## Komponenty Dashboard / Analityczny

**MetricCard** — kafelka KPI (np. wartość portfela, P&L) z adaptacyjnym tłem i tekstem; krytyczna czytelność liczb niezależnie od fazy dnia.

**PriceTickerRow** — wiersz z tickerem kryptowaluty, ceną i zmianą procentową; kontrast cyfr musi być niezawodny na dowolnym fragmencie gradientu.

**DataTable** — tabela danych finansowych (prowizje, kontrakty, historia) z wierszami o alternującym tle i gwarantowaną czytelnością każdej komórki.

**MiniSparkline** — mały wykres liniowy inline w tabeli lub karcie; musi być czytelny na wielokolorowym tle.

**PortfolioChart** — pełnowymiarowy wykres portfela (recharts/d3) z dynamicznie dobieranymi kolorami linii i osi do aktualnego tła.

**AlertBanner** — pasek alertu (np. duże wahanie ceny) z wysokim priorytetem kontrastu — musi przebić się wizualnie niezależnie od fazy dnia.

**StatWidget** — mały komponent jednej liczby ze etykietą (np. "24h Volume"), używany w gridzie metryk.

---

## Komponenty Nawigacji / Layoutu

**TopNav** — górna belka nawigacyjna z logo, linkami i profilem; tło półprzezroczyste (backdrop-blur) nakładające się na CircadianBackground.

**SidebarNav** — boczna nawigacja z ikonami i etykietami sekcji panelu; kontrast ikon i tekstu musi działać na każdej fazie gradientu.

**PageWrapper** — wrapper strony spinający CircadianProvider + GradientCanvas + slot na treść; fundament layoutu Next.js.

**TabBar** — przełącznik zakładek (np. Spot / Futures / Analytics) z aktywnym stanem podkreślonym kolorem akcentu gold.

**BreadcrumbTrail** — ścieżka nawigacyjna; drobna typografia wymagająca szczególnej dbałości o kontrast.

---

## Komponenty Formularzy / Interakcji

**AdaptiveButton** — przycisk primary/secondary/ghost z kolorem tła i obramowania dobieranym do aktualnej fazy tła (nie może "zniknąć" na gradiencie).

**TokenInput** — pole wprowadzania kwoty tokenu/kryptowaluty z walidacją; kontrast placeholdera i wartości na ciemnym tle.

**SearchField** — pole wyszukiwania z ikoną, muszące być czytelne jako floating element nad tłem.

**SlippageSlider** — suwak ustawień (np. tolerancja poślizgu transakcji) z czytelną skalą i wartością.

**ConfirmModal** — modal potwierdzenia transakcji; nakładka nad gradientem — wymaga własnej warstwy kontrastu niezależnej od tła.

**ToastNotification** — powiadomienie toast (sukces/błąd/info) wyskakujące nad interfejsem; musi być zawsze widoczne.

---

## Komponenty Dev / Diagnostyczne

**ContrastDebugOverlay** — tryb developerski nakładający na każdy element tekstowy jego aktualny wynik Lc; toggle w dev mode.

**CircadianTimeline** — wizualizacja pełnego cyklu dobowego z podglądem jak zmienia się paleta przez 24h; narzędzie dla designera/dewelopera.

**PalettePreview** — panel podglądu wszystkich tokenów OKLCH w bieżącej fazie cyrkadycznej; narzędzie QA designu.

**PerformanceMonitor** — HUD pokazujący FPS renderowania WebGL i obciążenie CPU/GPU; pomaga weryfikować że akceleracja działa.

---

## Strony Next.js

**`/dashboard`** — główny panel twórcy/tradera, grid MetricCard + PortfolioChart + DataTable.

**`/portfolio`** — szczegółowy widok portfela z historią i wykresami.

**`/analytics`** — zaawansowane wykresy analityczne i porównania.

**`/settings/theme`** — ustawienia motywu: OklchColorPicker, podgląd CircadianTimeline, PalettePreview.

**`/settings/accessibility`** — ustawienia dostępności: minimalny próg Lc, wyłączenie animacji cyrkadycznych, statyczny tryb high-contrast.

**`/dev/contrast-audit`** — strona tylko dla dev: ContrastDebugOverlay + PalettePreview + PerformanceMonitor.


## Komponenty Atomowe (Design System)

**InputField** — pole tekstowe z efektem "płynu nieniutonowskiego": displacement map na hover, radialne rozbłyśnięcie na focus, krystaliczna tekstura błędu, złoty rozbłysk na success. Serce formularzy.

**Checkbox** — organiczny "krater" zamiast kwadratowego pola; wypełnia się cieczą purple-300 przy zaznaczeniu, wysysa ją przy odznaczeniu. Używany wszędzie tam gdzie standardowy checkbox.

**Toggle** — przełącznik dwustanowy jako "transfer masy termicznej"; brak suwakowej kulki, zamiast tego masa przeciska się przez szczelinę z narastającym oporem haptycznym. Stan ON wybucha gold-400.

**Tooltip** — "organiczne pączkowanie" — tooltip wyrasta z elementu macierzystego przez Gooey Effect (feGaussianBlur + feColorMatrix), nie pojawia się jako osobny dymek. Używany przy ikonach pomocy, skróconych etykietach, danych wymagających wyjaśnienia.

**Popover** — "mitoza komórkowa" — zamiast nakładki, siatka rozrywa się i odsłania wnętrze; ściany popovera to ciekłe szkło zlewające się z tłem przez gradient transparency. Używany do menu kontekstowych, rozszerzonych filtrów, paneli konfiguracji.

**Button** — nie opisany wprost jako sekcja, ale wynika z całego dokumentu: przycisk z kinetyczną krawędzią (velocity border), haptyczną odpowiedzią na hover, i krzywą TipJar Liquid Snap na kliknięcie.

---

## Komponenty Efektów Wizualnych

**LiquidGlassPanel** — panel/modal z efektem "ciekłego szkła": dynamiczna aberracja chromatyczna, refrakcja nieregularna, viscous drag przy przeciąganiu. Używany jako warstwa nawigacji, modal overlay, drawer.

**FrozenGlassPanel** — wariant "zamrożony": proceduralny szron fraktalny generowany przez feTurbulence, topnieje lokalnie pod trajektorią kursora. Używany do zablokowanych sekcji, stanów loading, treści niedostępnych dla użytkownika.

**ElevatedCard** — karta bez box-shadow; głębia przez kompresję i blur tła pod kartą (backdrop-filter + displacement), mikroparalaksa przy ruchu kursora, światłowodowe krawędzie z teal-50. Fundamentalny pojemnik treści.

**VelocityBorder** — dekoracyjny system krawędzi reagujący na prędkość kursora: niewidoczny w spoczynku, rozbłysk teal-300 przy powolnym ruchu, ostry złoty błysk gold-400 przy gwałtownym uderzeniu. Nakładany na karty i panele.

---

## Komponenty Stanów i Feedbacku

**FocusRing** — zamiennik standardowego outline: odwrócone halo rozchodzące się od środka na purple-300, globalny dimming reszty ekranu o 2–3%, pulsacja w rytmie oddechowym. Używany globalnie jako system fokusa klawiatury.

**HoverGravity** — wrapper zachowania hover: zniekształcenie tła przed kontaktem (paralaksa mikro), sprężyste odkształcenie geometrii elementu w kierunku kursora, brak zmiany koloru. Opakowuje każdy interaktywny element.

**ValidationState** — system stanów walidacji dla formularzy: krystaliczne zamrożenie (błąd), złoty rozbłysk wchłaniany w głąb (sukces). Używany w parze z InputField.

**LoadingState** — stan ładowania jako Frozen Glass: element "zamarza" proceduralnie od krawędzi ku środkowi, odmraża się po zakończeniu operacji.

---

## Tokeny i Motywy

**ColorTokens** — plik definicji tokenów palety: pełna skala teal-25 → teal-900, gold-400, purple-300, tokeny semantyczne (text-primary, text-secondary, text-tertiary, surface-base, surface-elevated).

**MotionTokens** — słownik trzech sygnatur kinetycznych: `TipJarLiquidSnap` (zatwierdzenia, wypływanie), `TipJarMagneticPull` (hover, wchłanianie), `TipJarCrystallineDecay` (zamykanie, usuwanie błędów). Importowane przez każdy animowany komponent.

**ThemeProvider** — Context dostarczający tokeny kolorów i ruchu w dół drzewa; umożliwia ewentualny wariant high-contrast bez przebudowy komponentów.

---

## Layouty i Strony

**BentoGrid** — asymetryczna siatka kafelkowa z dynamicznymi "szczelinami" otwierającymi się przy aktywacji popoverów; kafelki mogą zmieniać proporcje w reakcji na interakcję.

**AppShell** — główny szkielet aplikacji: TopNav z LiquidGlassPanel, boczny SidebarNav, slot na BentoGrid; CircadianBackground jako warstwa najniższa (integracja z dokumentem pierwszym).

**SettingsPage** — strona ustawień: gęste formularze z InputField, Checkbox, Toggle; idealne pole do prezentacji wszystkich stanów interakcji.

**OnboardingFlow** — wielokrokowy formularz powitalny gdzie każde przejście między krokami używa innej sygnatury kinetycznej w zależności od kontekstu (potwierdzenie → LiquidSnap, cofnięcie → CrystallineDecay).

**ComponentPlayground** — strona developerska: interaktywna prezentacja wszystkich komponentów z kontrolkami stanu (hover/focus/error/success/loading/frozen/elevated), podglądem tokenów i cubic-bezier w czasie rzeczywistym.

## Komponenty Onboardingu / Stanu Tranzycyjnego

**OwnerPreviewMode** — wrapper widoku publicznego profilu w trybie właściciela; sticky topbar z akcjami Studio/Wallet/Share + przełącznik "View as visitor". Pierwszy ekran po onboardingu.

**ViewAsVisitorToggle** — przełącznik pozwalający twórcy zobaczyć własny profil oczami fana; kluczowy element psychologiczny retencji.

**ArchetypeSelector** — krok kreatora onboardingowego wybierający jeden z 6 archetypów twórcy; determinuje całą późniejszą orkiestrację UI.

**ContextualCTAToast** — dynamiczny toast sugerujący pierwszą akcję dopasowaną do archetypu ("Connect your OBS overlay", "Share your first update", "Set up recurring memberships" itd.).

**BootstrapGoalBar** — pasek celu w stanie "wyczekiwania" z animowanym shimmerem zamiast zerowej kwoty; unika psychologicznie deprymującego "0/100$".

---

## Komponenty Orkiestracji / Layoutu Głównego

**OrchestrationEngine** — silnik (Context/Provider) mapujący archetyp na priorytet modułów nawigacyjnych, kolejność renderowania i strukturę Studio.

**AppShell / CreatorDesktop** — główna powłoka aplikacji: persistent sidebar, Parallel/Intercepting Routes, warstwa modali bez niszczenia scroll state.

**CreatorPulseWidget** — dynamiczny widget dashboardu, którego zawartość zmienia się zależnie od archetypu (metryki live vs social proof vs recurring revenue vs "Creator Health").

**StudioSidebarNav** — boczna nawigacja Studio z dynamicznie reorderowaną kolejnością modułów (Live→Promote→Page→Automations dla streamera, Page→Community→Promote dla lifestyle'a itd.).

**SoftNavigationRouter** — mechanizm przejść między Desktop a Studio bez twardego reloadu, zachowujący połączenia socketowe i stan aplikacji.

---

## Komponenty Modułu Page (Tożsamość i Wygląd)

**BentoGridEditor** — edytor układu profilu oparty na dnd-kit; przeciąganie kafelków (Goal Bar, Fanwall, itd.) z korekcją skalowania animacji (Framer Motion Scale Correction).

**AvatarUploaderWidget** — komponent uploadu awatara/bannera z Dropzone + Radix UI, integracja z IPFS.

**ThemeConfigurator** — panel wyboru "Głównego Motywu" (Vibe) operujący na semantycznych nazwach (Teal/Gold/Purple) zamiast kodów HEX; jedno źródło prawdy propagowane do wszystkich węzłów.

**ShapeSelector** — kontrolka wyboru geometrii ("Ostre/Łagodne/Organiczne") mapowana na tokeny border-radius.

**DensitySelector** — kontrolka gęstości informacji ("Zwarte/Komfortowe/Przestrzenne") mapowana na tokeny spacing.

**CharacterSelector** — wybór stylu typografii ("Nowoczesny/Zdecydowany/Minimalistyczny") mapowany na pary fontów nagłówek/tekst.

**MobilePreviewFrame** — podgląd profilu w symulowanej rozdzielczości mobilnej (CSS Container Queries).

**BadgeVerificationPanel** — zarządzanie odznakami wiarygodności i podłączaniem kont zewnętrznych przez OAuth.

---

## Komponenty Modułu Live (Streaming)

**OBSOverlayGenerator** — panel generujący URL nakładki (`/overlay/username`) z jednorazowym tokenem źródłowym, gotowy do wklejenia w OBS bez CSS.

**LiveTicker** — pasek przewijanych powiadomień o nowych wsparciach, zoptymalizowany pod GPU (`will-change: transform`, `translateZ(0)`).

**GoalBarLive** — pasek celu renderowany w overlayu, aktualizowany przez SSE w czasie rzeczywistym, z cyframi tabelarycznymi (`font-feature-settings: tnum`) zapobiegającymi migotaniu.

**AlertBox** — komponent alertu dźwiękowo-wizualnego wyzwalanego progowo przy wpłacie; Web Audio API dla precyzji milisekundowej.

**LiveFanwallVirtualized** — wirtualizowana lista wpisów fanów (react-virtuoso) dla tysięcy wpisów na minutę bez eksplozji DOM.

**SpatialTipRenderer** *(koncepcyjny/eksperymentalny)* — silnik WebXR + Three.js renderujący napiwki jako obiekty 3D w przestrzeni twórcy (LiDAR mesh collision).

---

## Komponenty Modułu Monetization / Wallet

**TipModal / BottomSheet** — modal wpłaty z predefiniowanymi kwotami (kotwiczenie 5/10/25 USDC), wersja mobilna jako wysuwana szuflada z gestem swipe-down.

**RecurringMembershipCard** — konfigurator subskrypcji cyklicznych (tiers), oparty na Circle Web SDK.

**GoalTreasuryWidget** *(koncepcyjny)* — wizualizacja celu jako "inteligentnego skarbca" z narastającym yieldem DeFi obok wpłat bezpośrednich.

**WalletBalanceView** — widok salda USDC z historią wpłat; wariant uproszczony (Fiat off-ramp) dla non-crypto-native archetypów.

**PayoutSettingsForm** — konfiguracja wypłat fiat/crypto z progresywnym onboardingiem (KYC odłożone do momentu faktycznej wypłaty).

**ENSAddressResolver** — komponent zamieniający surowe adresy hex na czytelne nazwy ENS przy płatnościach z zewnętrznych portfeli.

**TransactionStatusTracker** — komponent śledzący stan transakcji on-chain (`useWaitForTransactionReceipt`), z obsługą retry przy błędach gas.

---

## Komponenty Modułu Promote / Share

**QRCodeGenerator** — generator kodu QR z wbudowanym logo i kolorami motywu, renderowany po stronie klienta (SVG, canvas).

**SmartLinkBuilder** — kreator skróconych linków kampanijnych z trackingiem źródeł ruchu.

**ShareCardGenerator** — generator kart społecznościowych (OG images) przez Vercel/AWS Edge (`@vercel/og`), różne proporcje (Stories, TikTok, X).

**EmbedWidgetSnippet** — panel generujący kod `<script>` do osadzenia Widgetu (Shadow DOM), nazwany dla twórcy "Smart Button" / "Podłącz Przycisk".

**FloatingActionWidget** — sam widget osadzany na zewnętrznych stronach; Custom Element z Shadow DOM dziedziczący CSS Custom Properties z hosta.

---

## Komponenty Modułu Community / Analytics

**FanSegmentManager** — narzędzie segmentacji fanów i publikowania asymetrycznych aktualizacji do grup.

**GatedContentEditor** — edytor treści zabezpieczonych progiem wpłaty (token-gated content).

**TrafficSourceChart** — wykres źródeł ruchu (TikTok/Instagram/X) z konwersją na transakcje.

**AIInsightsPanel** — panel rekomendacji AI ("Twoi wspierający konwertują lepiej na celach milowych niż dotacjach").

**RetentionChurnChart** — wykres retencji/rezygnacji subskrypcji w czasie, dla archetypu edukacyjnego.

---

## Komponenty Systemowe / Infrastrukturalne (Theme Engine)

**ThemeTokenProvider** — Context propagujący `theme_config` (Single Source of Truth) do wszystkich Support Surfaces (Hub, Widget, Overlay, Static).

**SSEThemeSyncClient** — klient nasłuchujący Server-Sent Events do natychmiastowej aktualizacji motywu bez odświeżania (OBS, widget).

**ContrastGuardrail** — automatyczny walidator kontrastu WCAG AAA blokujący niebezpieczne kombinacje kolorów tekst/tło przy zmianie motywu.

**CanvasExportRenderer** — komponent odczytujący computed CSS variables i mapujący je na `fillStyle` przy eksporcie QR/PDF (html2canvas + jsPDF).

---

## Strony Next.js

**`/@username`** — publiczny profil twórcy (Hub), SSR/ISR, punkt wejścia po onboardingu.

**`/studio`** — powłoka Studio z dynamicznym sidebarem zależnym od archetypu.

**`/studio/page`** — edytor tożsamości i wyglądu (BentoGridEditor, ThemeConfigurator).

**`/studio/promote`** — centrum dystrybucji (QR, smart linki, widgety, share cards).

**`/studio/live`** — konfiguracja nakładek OBS, alertów, fanwalla live.

**`/studio/monetization`** — cele, subskrypcje, ustawienia wypłat.

**`/studio/community`** — segmentacja fanów, treści gated, wiadomości.

**`/studio/analytics`** — metryki dopasowane do archetypu (real-time vs recurring vs traffic sources).

**`/overlay/[username]`** — endpoint renderowany dla OBS Browser Source (Broadcast Node).

**`/onboarding`** — pięciokrokowy kreator z wyborem archetypu.




















