
# A. Komponenty wizualne (Paint Worklet) — `components/tactile/`

| Komponent | Opis |
|---|---|
| `FrostedChamferModal` | Modal autoryzacji ze ściętymi (chamfer) krawędziami i proceduralnym szronem na obwodzie |
| `LiquidWellInput` | Pole input z wgnieceniem typu "nienewtonowski płyn", reagujące na pozycję kursora |
| `ThermodynamicFocusRing` | Pierścień fokusu z efektem plazmy/dyfuzji cieplnej między border a outline |
| `PolygonStrikeCard` | Karta telemetrii Web3 o skośnym, "wojskowym" kształcie z cieniem rzutowanym pod kątem |
| `ChromaShiftAvatarFrame` | Ramka awatara liderów rankingu z maskowaniem alfa i przenikaniem kolorów w tle |
| `SnellGlassNavPanel` | Pływający panel nawigacyjny nad wideo, symulujący refrakcję szkła zamiast `backdrop-filter: blur()` |
| `HardwareRippleButton` | Przycisk CTA/transferu wartości z efektem "zapadania się" i falą świetlną przy tapnięciu |
| `PeristalticToggle` | Przełącznik z asymetrycznym, "lepkim" ruchem suwaka między dwoma biegunami kolorystycznymi |
| `EInkGlitchPanel` | Panel ostrzegawczy/diagnostyczny z poszarpanym, animowanym `clip-path` i szumem e-ink |
| `OklabEliteCard` | Karta hierarchii (np. Top 3) z gradientem w przestrzeni Oklab i adaptacyjnym kontrastem APCA |

---

# B. Komponenty strukturalne (wzorzec Double Wrapper) — `components/tactile/wrappers/`

| Komponent | Opis |
|---|---|
| `ShadowCapsuleOuter` | Zewnętrzny kontener generujący `filter: drop-shadow()` zamiast `box-shadow` (omija konflikt z `clip-path`) |
| `ClipCapsuleInner` | Wewnętrzny kontener odpowiadający wyłącznie za ucięcie geometrii (`clip-path`/`corner-shape`) |
| `DoubleWrapperProvider` | Komponent-kontekst łączący parę outer/inner i przekazujący wspólne zmienne CSS (kolor, intensywność) |

---

# C. Infrastruktura / warstwa niskopoziomowa — `lib/houdini/`

| Element | Opis |
|---|---|
| `registerPaintWorklets()` | Funkcja inicjalizująca i rejestrująca wszystkie Paint Worklety (`frost`, `liquid-well`, `thermodynamic-glow`, `polygon-tracer`, `radial-edge-reveal`, `refraction-glass`, `ripple-emitter`, `peristaltic-fluid`, `static-eink`, `oklab-gradient`) |
| `useTactileVariable()` | Hook ustawiający zmienne CSS niestandardowe (`--temperature`, `--heat-intensity`, `--mouse-x/y`) na elemencie |
| `useAPCAContrast()` | Hook wyliczający/aktualizujący kontrast wg algorytmu APCA dla tła przewijanego pod elementem |
| `OklabColorTokens` | Zestaw tokenów kolorystycznych (Deep Teal, Gold 400, Purple 300) zdefiniowanych w przestrzeni Oklab |

---

# D. Mapowanie na strony/trasy TipJar+

| Strona/Trasa | Wykorzystywane komponenty |
|---|---|
| `/auth` (logowanie/rejestracja) | `FrostedChamferModal` |
| `/dashboard` (formularze ustawień) | `LiquidWellInput`, `ThermodynamicFocusRing` |
| `/web3/transactions` (live feed) | `PolygonStrikeCard` |
| `/leaderboard` (Eternal Fan Wall) | `ChromaShiftAvatarFrame`, `OklabEliteCard` |
| `/creator/[id]` (overlay nad wideo) | `SnellGlassNavPanel` |
| Globalny CTA / payout flow | `HardwareRippleButton` |
| `/settings` (przełączniki) | `PeristalticToggle` |
| `/system/alerts`, `/admin/diagnostics` | `EInkGlitchPanel` |

---

# A. Grupa 1 — Pasywne style OLED (`components/borders/passive/`)

| Komponent | Opis |
|---|---|
| `EmeraldVoidBorder` | Jednopikselowa zielona ramka na czarnym tle — wariant ascetyczny/terminalowy |
| `GhostMaskFrame` | Maskowanie radialnym gradientem zamiast `backdrop-filter: blur()` — efekt "znikania" krawędzi |
| `ChromaShiftOffsetCard` | Karta z przesuniętym pseudoelementem `::after` dający efekt błędu druku/glitcha |
| `InsetDepthPlate` | Płaski, beztłuszczowy `box-shadow: inset` bez rozmycia — wgnieciona "plakieta" |
| `SplitChannelBorder` | Asymetryczna ramka: lewa krawędź czerwona, prawa zielona |

# B. Grupa 2 — Animacje warstwy kompozytora (`components/borders/motion/`)

| Komponent | Opis |
|---|---|
| `ConicRotatorBorder` | Obracający się gradient konturowy z wycięciem środka przez `mask-composite` |
| `PulseSublayer` | Pulsująca "zbroja" na osobnym pseudoelemencie animowanym wyłącznie po `opacity` |
| `BreathingPerimeter` | "Oddychająca" krawędź — cykliczne `scale()` + zanik `opacity` |
| `ScanningLightBeam` | Pasek światła przesuwający się po obrysie (`translateX` w kontenerze z `overflow: hidden`) |
| `HoverLayerReveal` | Ukryta warstwa odsłaniana przy hover poprzez przesunięcie pokrywy na osi X/Z |

# C. Grupa 3 — Proceduralne/wektorowe (Houdini + SVG) (`components/borders/procedural/`)

| Komponent | Opis |
|---|---|
| `ProceduralPaintDash` | Przerywana, "inżynieryjna" obwódka generowana przez Paint Worklet zamiast `border: dashed` |
| `MarchingAntsBorder` | Animowana przerywana linia SVG (`stroke-dashoffset`) w stylu zaznaczenia CAD/Photoshop |
| `LaserTracingOutline` | Świecąca ścieżka SVG aktywowana na `:hover`/`:focus`, "wypalająca" kontur |
| `ConstrainedTurbulenceEdge` | Bardzo cienki pasek szumu `feTurbulence`, mocno ograniczony obszarowo dla kontroli kosztu |
| `ChromaTrackedGlow` | Blask podążający za kursorem, sterowany zmiennymi `--mouse-x/y` zamiast filtrów |

# D. Grupa 4 — Brutalizm / maskowanie alfa / cyberpunk (`components/borders/brutalist/`)

| Komponent | Opis |
|---|---|
| `BlendDifferenceBorder` | Ramka korzystająca z `mix-blend-mode: difference` — automatycznie kontrastowa na dowolnym tle |
| `EInkNoiseBorder` | Statyczna tekstura szumu (SVG base64 w `border-image`) — wygląd druku/papieru |
| `PolygonGlitchCut` | Postrzępione cięcia `clip-path: polygon()` animowane `steps()` — efekt cyfrowej usterki |
| `SteppedGradientEdge` | Twarde, nieinterpolowane przejścia kolorów na krawędzi — styl retro/8-bit |
| `ChamferedCornerBlock` | Ścięte narożniki przez `corner-shape: chamfer` zamiast `clip-path` |

# E. Warstwa wspólna / infrastruktura (`lib/borders/`)

| Element | Opis |
|---|---|
| `EnergyAwareColorTokens` | Tokeny kolorów faworyzujące zieleń/czerwień nad błękitem (zgodnie z opisaną hierarchią subpikseli) |
| `useCompositorSafeAnimation()` | Hook wymuszający animacje wyłącznie na `transform`/`opacity` (nigdy `border-width`/`box-shadow` w pętli) |
| `BorderAntipatternLint` (dev-only) | Reguła lintera ostrzegająca przy użyciu `backdrop-filter: blur()` lub animowanego `border-width` |

---

# F. Mapowanie na strony/trasy TipJar+

| Strona/Trasa | Komponenty |
|---|---|
| `/dashboard` (panele danych) | `InsetDepthPlate`, `EmeraldVoidBorder` |
| `/web3/transactions` (live feed) | `ScanningLightBeam`, `PulseSublayer` |
| `/leaderboard` | `ConicRotatorBorder`, `ChamferedCornerBlock` |
| Formularze (inputy, focus states) | `MarchingAntsBorder`, `LaserTracingOutline`, `ChromaTrackedGlow` |
| `/system/alerts`, error states | `PolygonGlitchCut`, `EInkNoiseBorder`, `ConstrainedTurbulenceEdge` |
| Karty produktowe / overlay nad treścią dynamiczną | `BlendDifferenceBorder` (zamiast glassmorphism) |
| Elementy retro/branding | `SteppedGradientEdge`, `ChromaShiftOffsetCard` |
| Globalne CTA / hover states | `HoverLayerReveal`, `BreathingPerimeter`, `SplitChannelBorder` |

---

# A. Moduł I — Warstwy przestrzenne i modale (`components/modals/`)

| Komponent | Opis |
|---|---|
| `PaymentModal` | Potwierdzenie transakcji USDC, z-index: 400, wejście przez `@starting-style` |
| `ConfirmationModal` | Modal krytycznych akcji konta (zmiana portfela) — architektura tożsama z `PaymentModal` |
| `EducationModal` | Statyczne nakładki informacyjne, bez nasłuchu na akcje finansowe |
| `PrismaticBorder` | Wielokrotnego użytku ramka gradientowa (teal/gold/purple) przez `mask-composite: exclude` |
| `LiquidGlassBackdrop` | Kurtyna izolująca tło modali — `backdrop-blur`, `backdrop-saturate`, `feDisplacementMap` |

# B. Moduł II — Fan Wall i typografia finansowa (`components/fanwall/`)

| Komponent | Opis |
|---|---|
| `FanWall` | Główny kontener siatki Bento Grid dla awatarów i statystyk fanów |
| `FanAvatarCard` | Standardowa karta fana na bazowej warstwie Z-1 |
| `FanAvatarCard--anomaly` (wariant) | Wersja dla top 3 fanów z neonową poświatą w przestrzeni OKLCH (gold/silver/bronze) |
| `FanStatsModal` | Szczegółowe statystyki fana z wymuszonymi cyframi tabelarycznymi (`tnum`) |
| `TabularStatDisplay` | Generyczny komponent liczbowy eliminujący "Financial Jitter" (`tnum` + `text-box: trim-both`) |

# C. Moduł III/IV — Mikrointerakcje i pozycjonowanie bez JS (`components/interactions/`)

| Komponent | Opis |
|---|---|
| `GooeyTooltip` | Tooltip aktywowany kliknięciem, efekt "gooey" przez `feColorMatrix`, z-index: 500 |
| `ContextPopover` | Popover z płynną animacją wysokości `auto` przez `calc-size()` + `interpolate-size` |
| `AnchoredDropdown` | Dropdown pozycjonowany natywnym CSS Anchor Positioning (`anchor-name`), zero JS |
| `PillowMenuItem` | Pozycja menu z podwójnym cieniem inset symulującym "wgniecenie" materiału |
| `DeepNavigation` | Wielopoziomowa nawigacja breadcrumb zbudowana na `AnchoredDropdown` |

# D. Moduł V — Pola formularzy biomimetycznych (`components/forms/`)

| Komponent | Opis |
|---|---|
| `LiquidInputField` | Input typu "oddychająca studnia" z `feDisplacementMap`, stany idle/focus/error |
| `FloatingLabel` | Etykieta przesuwająca się w górę przy focusie (150ms, ease-in-out) |
| `FrozenGlassErrorState` | Stan błędu w stonowanym koralu (#FFB4AB) zapobiegający chromostereopsji |
| `WalletAddressInput` | Rozszerzenie `LiquidInputField` o walidację adresów blockchain |

# E. Moduł VI/VII — Powiadomienia, Z-axis, oświetlenie otoczenia (`components/notifications/`, `lib/orchestration/`)

| Komponent | Opis |
|---|---|
| `BlockchainToast` | Toast powiadomień transakcji, krzywa "harmonic oscillator", z-index: 300 |
| `ToastStack` | Kontener spiętrzający starsze toasty w głąb osi Z zamiast przesuwać pionowo |
| `ZAxisRegistry` | Globalny rejestr (Zustand) eliminujący konflikty z-index między modalami/tooltipami/toastami |
| `AmbientLightAdapter` | Provider kontekstu czytający `AmbientLightSensor` (z fallbackiem do `prefers-color-scheme`) |
| `NocturnalOpulenceWrapper` | HOC dynamicznie dostrajający kontrast/poświatę wg luksu otoczenia |
| `ShadowMaestroProvider` | Globalny dostawca "kameleonowych cieni" próbkujących kolor tła pod komponentem |
| `GenUICard` | Karty Bento Grid generowane dynamicznie przez pipeline LLM→MCP→React |

# F. Moduł VIII — Maszyna stanów portfela (`components/wallet/`, `state/`)

| Komponent | Opis |
|---|---|
| `WalletNavIcon` | Wizualna reprezentacja `WalletFSM` w pasku nawigacji |
| `WalletFSM` (XState) | Maszyna stanów: Idle / Pending / Active / Frenzy / Whale |
| `WalletBalanceDisplay` | Wyświetlacz salda — `tnum`, dane jako string (integralność matematyczna), `aria-hidden` podczas animacji |
| `ARIALiveRegionManager` | Zarządza ogłoszeniami dla czytników ekranu, dławi je podczas stanu Frenzy |
| `ScreenReaderBalanceAnnouncer` | Ukryty (`sr-only`) element ogłaszający finalne, ustabilizowane saldo |

# G. Moduł IX — SSE i synchronizacja kart (`lib/realtime/`)

| Komponent/moduł | Opis |
|---|---|
| `SSEConnectionProvider` | Provider zarządzający połączeniem SSE z Leader Election |
| `LeaderElectionManager` | Negocjacja, która karta otwiera fizyczne połączenie SSE |
| `BroadcastChannelBridge` | Przekazywanie danych z karty-lidera do pozostałych kart |
| `SSEReconnectHandler` | Obsługa reconnectów z `Last-Event-ID` i replay z Redis Streams |
| `EventDeduplicator` | Cache LRU zapobiegający duplikacji zdarzeń w UI |
| `SequenceNumberGuard` | Odrzuca zdarzenia napływające poza kolejnością chronologiczną |
| `EventBatchAccumulator` | Agreguje napływające mikro-zdarzenia w jeden pakiet przy przeciążeniu |
| `BlockchainToastItem` | Renderer pojedynczego zdarzenia SSE wg `SSEPayloadSchema` (Zod) |
| `EmotionalTierBadge` | Odznaka wizualna wg poziomu emocjonalnego transakcji (STANDARD/FRENZY/WHALE) |
| `FirstInteractionCallout` | Jednorazowa animacja powitalna nowego fana |
| `ReversalToast` | Toast błędu transakcji w stonowanym koralu, `aria-live="assertive"` |

# H. Backend — moduły ingestii (`backend/webhooks/`, `backend/streams/`)

| Komponent/serwis | Opis |
|---|---|
| `CircleWebhookController` | Punkt wejścia webhooków Circle, weryfikacja podpisu ECDSA |
| `WebhookIdempotencyGuard` | Ochrona przed podwójnym przetworzeniem tego samego zdarzenia |
| `WebhookEnrichmentService` | Wzbogacanie danych transakcji (powiązanie z profilem, obliczenie tier) |
| `RedisStreamsPublisher` | Publikacja zdarzeń do strumieni Redis (`XADD`) |
| `SSEGateway` | Punkt wyjścia danych do klientów (`XREADGROUP`) |
| `EgressRateLimiter` | Throttling wyjścia powyżej 20 zdarzeń/s, grupowanie w batch |

# I. Tokeny / fundamenty systemu (`lib/tokens/`)

| Komponent | Opis |
|---|---|
| `GlobalTokenProvider` | Dystrybutor zmiennych CSS (Deep Teal palette) na poziomie root, wspiera runtime theming |

---

# J. Mapowanie na trasy

| Trasa | Kluczowe komponenty |
|---|---|
| `/` | `GlobalTokenProvider`, `NocturnalOpulenceWrapper` |
| `/creator/[username]` | `FanWall`, `ContextPopover` |
| `/creator/[username]/tip` | `PaymentModal` (full-page na mobile) |
| `/dashboard` | `FanWall` (zarządzanie), `ToastStack` |
| `/dashboard/analytics` | `TabularStatDisplay`, wykresy historyczne |
| `/dashboard/wallet` | `WalletAddressInput`, logi wypłat |
| `/onboarding` | 5-etapowa sekwencja FSM (signup, pairing portfela) |
| `/settings` | Przełączniki preferencji UI/powiadomień |

---

# Podsumowanie

Przeanalizowałem trzy dokumenty. Wszystkie trzy mają wspólny wzorzec: są pisane stylem nadmiernie pewnym siebie ("[Poziom ufności: Absolutny]", "[Confidence: High]" niemal wszędzie), z mieszanką **realnych technik CSS/web** i **fabrykowanej specyfiki** (wyssane z palca liczby mW, gwarancje "120fps zawsze", pseudo-naukowe uzasadnienia). Dokument 3 (architektura TipJar+) jest zdecydowanie najbardziej wiarygodny technicznie — większość wymienionych API faktycznie istnieje i jest opisana poprawnie. Dokumenty 1 i 2 (Houdini/Taktylny Maksymalizm, Energooszczędne ramki) zawierają więcej technobełkotu i niesprawdzalnych twierdzeń.

---

# Pełna skonsolidowana lista (skrót)

**Dok. 1 – Houdini/Tactile Maximalism:** 10 komponentów wizualnych (Frosted Chamfer, Liquid Well, Thermodynamic Outline, Polygon Strike, Chroma-Shift Avatar, Snell Glass, Ripple Button, Peristaltic Toggle, E-Ink Glitch, Oklab Card) + wrappery Double Wrapper + infrastruktura Worklet.

**Dok. 2 – Energooszczędne ramki:** 20 architektur w 4 grupach (Pasywne OLED, Animacje kompozytora, Proceduralne/SVG, Brutalizm/maskowanie alfa) + tokeny energooszczędne + hook `useCompositorSafeAnimation`.

**Dok. 3 – Architektura TipJar+:** ~45 komponentów/modułów (modale, Fan Wall, mikrointerakcje, formularze, FSM portfela, SSE/realtime, backend webhooks) — to było już szczegółowo rozpisane wyżej.

Nie powtarzam pełnych tabel — są już w poprzednich odpowiedziach. Poniżej **ocena wiarygodności**, o którą prosisz.

---

# Ocena: co jest solidne, co jest bzdurą

## ✅ Wysoka pewność — realne, poprawnie opisane techniki

| Technika | Dokument | Komentarz |
|---|---|---|
| `mask-composite: exclude` do ramek gradientowych | 1, 3 | Realna, dobrze znana technika (`PrismaticBorder`) |
| `filter: drop-shadow()` zamiast `box-shadow` przy `clip-path` | 1, 3 | Prawdziwy konflikt i prawdziwe rozwiązanie — `drop-shadow` śledzi kanał alfa, `box-shadow` nie |
| Tylko `transform`/`opacity` są tanie kompozytorowo, animowanie `border-width`/`box-shadow` wywołuje Layout/Paint | 2, 3 | Fundamentalna, dobrze udokumentowana wiedza o rendering pipeline |
| `backdrop-filter: blur()` jest kosztowny na mobile | 2, 3 | Powszechnie znany i udokumentowany problem |
| `feTurbulence`/SVG filtry są kosztowne wydajnościowo | 2 | Realny, znany problem (choć konkretne %/mW są zmyślone — patrz niżej) |
| Czerń = brak poboru mocy na OLED, niebieski subpiksel mniej wydajny | 2, 1 | Realna fizyka, dobrze udokumentowana (samoemisyjność OLED) |
| `@starting-style`, `calc-size()` + `interpolate-size`, CSS Anchor Positioning (`anchor-name`) | 3 | Realne, faktycznie istniejące/wdrażane specyfikacje CSS |
| `font-feature-settings: "tnum"` do cyfr tabelarycznych | 3 | Standardowa, prawdziwa technika w UI finansowych |
| `text-box-trim` (opisane jako `text-box: trim-both`) | 3 | Realna, nowsza właściwość CSS |
| `feColorMatrix` do efektu "gooey" | 3 | Klasyczna, znana technika (blur + wzmocnienie kontrastu alfa) |
| ECDSA, idempotency guard, Redis Streams (`XADD`/`XREADGROUP`), SSE + `Last-Event-ID`, `BroadcastChannel` do leader election między kartami | 3 | Standardowe, poprawnie opisane wzorce backendowe — to jest solidna inżynieria |
| JS float imprecision (`0.1+0.2`), traktowanie kwot jako string | 3 | W 100% prawdziwe i to dobra praktyka w fintechu |
| Oklab/OKLCH jako przestrzeń percepcyjnie jednolita | 1, 3 | Prawdziwe, dobrze udokumentowane |

## ⚠️ Średnia pewność — koncepcja realna, ale szczegóły wątpliwe lub niepotwierdzalne

| Twierdzenie | Dokument | Problem |
|---|---|---|
| `corner-shape: chamfer` | 1, 2 | To realna propozycja specyfikacji CSS, ale wsparcie w przeglądarkach na 2026 r. jest częściowe/eksperymentalne — traktowanie jej jako gotowego standardu to nadinterpretacja |
| APCA jako "fundament WCAG 3" | 1 | APCA faktycznie jest rozważane do WCAG 3, ale WCAG 3 nie jest finalnym standardem — opisywanie tego jako gotowy fundament jest na wyrost |
| `AmbientLightSensor` API | 3 | Istnieje, ale jest mocno ograniczone/wyłączone w wielu przeglądarkach z powodów prywatności — dokument sam to przyznaje w sekcji o podatnościach, co jest uczciwe, ale reszta dokumentu buduje na tym całą architekturę (`NocturnalOpulenceWrapper`), jakby to było stabilne API |
| Chromostereopsia jako uzasadnienie koloru `#FFB4AB` | 3 | Zjawisko chromostereopsji jest realne, ale opisana tu "inżynieryjna" historia uzasadniająca wybór dokładnie tego koloru ma posmak post-hoc fabularyzacji — brzmi jak wymyślona narracja podpięta pod prawdziwe zjawisko, żeby uwiarygodnić projekt |
| "Financial Jitter" jako termin branżowy | 3 | Sam problem (fluktuacja szerokości cyfr) jest realny, ale nazwa brzmi jak wymyślona na potrzeby dokumentu, nie ugruntowana terminologia |

## ❌ Niska pewność / total bzdura — fabrykacja, pseudo-nauka, zmyślona precyzja

| Twierdzenie | Dokument | Dlaczego to bzdura |
|---|---|---|
| Gwarancja "niezachwianych 120 FPS" dzięki Houdini, "[Poziom ufności: Absolutny]" | 1 | Paint Worklet odciąża malowanie, ale **nie eliminuje** kosztu Layout, jeśli zmieniają się wymiary/geometria. Kategoryczna gwarancja stałych 120fps to nieuprawnione uproszczenie przedstawione jako pewnik |
| Konkretne liczby mW: "25mW idle", "200mW animacja CSS", "750mW Zoom", "6500mW lokalny LLM", "10000mW z GPU", "500mW Firefox przy gradientach" | 2 | Brak źródeł dla tej konkretnej precyzji. Te liczby wyglądają na wygenerowane "dla wiarygodności", nie zmierzone — klasyczny wzorzec fabrykowanej pewności |
| "Chrome zużywa tylko 5% energii konkurencji przy filtrach SVG dzięki akceleracji sprzętowej" | 2 | Brak jakiegokolwiek źródła, nadmiernie precyzyjna liczba bez podstawy — wygląda na zmyśloną |
| Zalecenie używania **czystej zieleni `#00FF00`** w ramkach 1px, bo "wyrównuje się z gęstością matrycy Pentile" | 2 | To pseudo-inżynieria. Oszczędność energii z 1-pikselowej ramki jest praktycznie niemierzalna, a "wyrównanie z subpikselami" nie ma sensu jako argument projektowy — to brzmi naukowo, ale nie jest to realna technika optymalizacyjna |
| Kombinacja WGSL compute shader (algorytm Woronoja) + Paint Worklet do "dyfuzji cieplnej" obramowania (Kombinacja 3, dok. 1) | 1 | To nie jest udokumentowany, ugruntowany wzorzec — brzmi efektownie, ale jest to fikcyjna architektura, nie realna, sprawdzona technika frontendowa |
| `paint(refraction-glass)` realizujący "Prawo Snella" z osobnymi współczynnikami załamania dla R/G/B w Paint Worklet (Kombinacja 6, dok. 1) | 1 | Koncepcyjnie ciekawe, ale opisane jako gotowa, wydajna technika — w praktyce to bardzo nietrywialna symulacja optyczna, nie ma dowodów, że ktoś to realnie zaimplementował w ten sposób |
| Cytowanie instrukcji serwisowej urządzenia medycznego "Prismalix" (Getinge) jako źródła nr 9 w bibliografii dok. 1 | 1 | To kompletnie niezwiązane źródło — defekt bibliografii sugerujący, że cytowania nie były realnie zweryfikowane, tylko wygenerowane |
| Studium Purdue dot. oszczędności baterii (3-9% / 47%) | 2 | Tego typu badanie istnieje w realnym świecie (Purdue rzeczywiście publikowało prace o OLED i dark mode), ale przywołane tu liczby nie są przeze mnie zweryfikowane w tej rozmowie — nie mogę potwierdzić ich dokładności |
| "GenUICard": karty generowane przez pipeline LLM → MCP → React micro-components bez kompilacji Next.js routingu | 3 | Brzmi efektownie, ale jest skrajnie niedoprecyzowane i prawdopodobnie czysto spekulacyjne — brak realnej architektury stojącej za tym zdaniem |

---

## Wniosek praktyczny

Jeśli budujesz realny system komponentów dla TipJar+, **dokument 3 jest jedynym, na którym warto się oprzeć wprost** — większość API jest prawdziwa, choć wymaga sprawdzenia wsparcia przeglądarek (Anchor Positioning, `calc-size()`, `AmbientLightSensor`) przed wdrożeniem produkcyjnym. Dokumenty 1 i 2 traktowałbym jako **inspirację estetyczną/kierunkową** (nazwy komponentów, ogólna idea "taktylności" i energooszczędności), a nie jako specyfikację techniczną do wdrożenia 1:1 — zawierają zbyt dużo niezweryfikowanych liczb i co najmniej jedną kombinację (Worklet + WGSL Voronoi), która brzmi na wymyśloną na potrzeby dokumentu.

---
