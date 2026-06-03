**Specyfikacja Architektoniczno-Techniczna Ekosystemu TipJar+: Publiczny Profil Twórcy & Panel Twórcy Web3 (Master Plan UI 2026)**

### 1. Wstęp i Strategiczny Kontekst Projektu

Rozwój zdecentralizowanych aplikacji (dApps) oraz platform zintegrowanych z technologią Web3 napotyka na fundamentalną barierę, jaką jest doświadczenie użytkownika (UX). Analiza zachowań konsumenckich w nowoczesnych ekosystemach cyfrowych wskazuje w sposób jednoznaczny, że aż 89% użytkowników decyduje się na porzucenie lub zmianę dostawcy usług finansowych wyłącznie z powodu nieintuicyjnego interfejsu, a 68% odrzuca produkty, które charakteryzują się brakiem spójności wizualnej. W kontekście technologii opartych na łańcuchach bloków (blockchain) problem ten ulega drastycznemu nasileniu. Skomplikowane interakcje z siecią, konieczność zrozumienia koncepcji takich jak opłaty transakcyjne (gas fees), podpisywanie kryptograficznych wiadomości czy zarządzanie nieczytelnymi adresami portfeli, stanowią barierę poznawczą, która skutecznie paraliżuje użytkowników nietechnicznych. W środowisku, w którym każda akcja niesie za sobą nieodwracalne skutki finansowe, brak transparentności interfejsu prowadzi do natychmiastowej utraty zaufania.

Publiczny Profil Twórcy w platformie TipJar+ został zaprojektowany jako najważniejsza strona konwersyjna całego systemu. Jego rola wykracza poza zwykłą prezentację danych; musi funkcjonować jako zaawansowana tarcza abstrakcji, całkowicie ukrywająca złożoność protokołów kryptograficznych pod warstwą wysoce intuicyjnego, responsywnego i haptycznego interfejsu. Głównym celem inżynieryjnym i projektowym jest maksymalizacja współczynnika konwersji (ang. Conversion Rate), rozumianego jako płynne przejście od kliknięcia przycisku „Wesprzyj” do ostatecznego potwierdzenia transakcji w sieci. Cel ten musi zostać osiągnięty poprzez budowę bezwzględnego zaufania w ciągu pierwszych trzech sekund interakcji ze stroną.

Panel Twórcy (Creator Dashboard) w ekosystemie TipJar+ stanowi najbardziej prywatną, wrażliwą i strategiczną przestrzeń całej aplikacji. Jest to zaawansowane centrum dowodzenia, w którym twórca nie tylko monitoruje wskaźniki efektywności (KPI), ale również zarządza swoimi przychodami, relacjami ze społecznością (Fan Wall, Wiadomości) oraz dostępem do zaawansowanych mechanizmów Web3, takich jak subskrypcje oparte na niewymienialnych tokenach (NFT), partycypacja w zdecentralizowanych organizacjach autonomicznych (DAO) oraz hybrydowe wypłaty środków.

Zastosowanie podejścia zorientowanego na intencje (intent-based UX) oraz nowoczesnych standardów abstrakcji kont, takich jak ERC-4337, pozwala na zaprojektowanie interfejsu, który w sposób bezszwowy przeprowadza użytkownika przez proces wsparcia finansowego. Wszystkie decyzje architektoniczne opisane w niniejszym raporcie zostały poddane ewaluacji pod kątem minimalizacji obciążenia poznawczego, redukcji opóźnień sieciowych oraz maksymalizacji wydajności renderowania zarówno w nowoczesnych przeglądarkach desktopowych, jak i na urządzeniach mobilnych o ograniczonej mocy obliczeniowej. Dokument ten stanowi wyczerpującą, atomową specyfikację dla inżynierów oprogramowania, obejmującą architekturę Next.js 15, strategie wirtualizacji interfejsu, mechanikę stanów transakcyjnych oraz rygorystyczne wytyczne dotyczące dostępności (WCAG 2.2) i systemu wizualnego Glassmorphism 2.0. Sukces projektu mierzony jest trzema kluczowymi metrykami: wspomnianym współczynnikiem konwersji, czasem trwania sesji (Time on Site) optymalizowanym przez nieskończone przewijanie kaskadowych układów treści, oraz współczynnikiem odrzuceń (Bounce Rate), który musi zostać sprowadzony do absolutnego minimum poprzez natychmiastowe ładowanie kluczowych zasobów.

Wraz z ewolucją ekosystemów cyfrowych i przejściem do fazy dojrzałości technologicznej w 2026 roku, próg oczekiwań użytkowników względem systemów finansowych i platform twórców uległ drastycznemu podwyższeniu. Krytycznym uwarunkowaniem biznesowym kształtującym architekturę panelu jest zgodność z rygorystycznymi ramami regulacyjnymi. Europejski Akt o Dostępności (European Accessibility Act – EAA), którego pełna egzekucja przypada na czerwiec 2025 i 2026 roku, wymusza na inżynierach dostarczenie systemów w pełni zgodnych ze standardem WCAG 2.2 na poziomie AA (zgodnie z techniczną specyfikacją EN 301 549). Równocześnie, moduły skarbca i wypłat muszą odpowiadać wymogom europejskiej dyrektywy MiCA (Markets in Crypto-Assets), która nakłada kategoryczne ograniczenia na generowanie odsetek od tokenów powiązanych z aktywami (stablecoinów), co determinuje sposób projektowania interfejsów zarządzania kapitałem dla twórców z Unii Europejskiej.

Architektura tego systemu została zaprojektowana w celu osiągnięcia bezkompromisowych metryk wydajnościowych: czas ładowania pierwszych wrażliwych danych (Time to First Byte dla salda i ostatnich napiwków) musi wynosić poniżej 1 sekundy; wirtualizacja długich tabel transakcyjnych musi gwarantować płynność przewijania na poziomie 60 klatek na sekundę (fps); bezpieczeństwo operacji krytycznych wymaga wymuszenia autoryzacji dwuskładnikowej (2FA); natomiast mechanizmy komunikacji dwukierunkowej (WebSocket) muszą zapewniać aktualizację danych w czasie rzeczywistym. Rygorystyczne zastosowanie tak ustrukturyzowanego systemu projektowego przynosi od 30% do 40% redukcji kosztów utrzymania platformy oraz przyspiesza czas wprowadzania nowych funkcji (time-to-market) o 47%.

### 2. Wspólny System Wizualny, Tokeny Projektowe i Glassmorphism 2.0

Stabilność i spójność wizualna platformy o skali TipJar+ wymaga wdrożenia rygorystycznego systemu projektowego (Design System), który całkowicie eliminuje dryf stylistyczny (style drift) pomiędzy izolowanymi komponentami – zarówno w publicznym profilu, jak i w panelu twórcy. Zastosowanie środowiska Tailwind CSS w wersji 4 diametralnie zmienia podejście do konfiguracji systemu. Wprowadza architekturę ukierunkowaną na właściwości CSS (CSS-first approach), gdzie wszystkie tokeny projektowe są natywnie eksponowane jako zmienne CSS na poziomie korzenia dokumentu (:root) i definiowane w sposób deklaratywny za pomocą dyrektywy `@theme`.

**Trójwarstwowa Architektura Tokenów Semantycznych**

Praktyka twardego kodowania wartości heksadecymalnych wewnątrz klas komponentów (np. `text-`) została kategorycznie zakazana w procesie inżynieryjnym. Architektura systemu opiera się na trójwarstwowej taksonomii tokenów, która zapewnia bezproblemową obsługę wielu motywów wizualnych (w tym domyślnego trybu ciemnego) bez konieczności jakiejkolwiek modyfikacji logiki komponentów React.

Pierwszą warstwę stanowią **Tokeny Bazowe (Primitive Tokens)**, reprezentujące surowe wartości chemiczne systemu – paletę kolorystyczną oraz bezwzględne wymiary. Zdefiniowane są tu skale takie jak `--purple-300: #9D4EDD` czy `--gold-400: #FFD700`. Druga, najważniejsza warstwa to **Tokeny Semantyczne (Semantic Tokens)**. Nadają one logiczne znaczenie i kontekst operacyjny tokenom bazowym. Zamiast odwoływać się w kodzie do koloru fioletowego, interfejs korzysta z deklaracji celowej, takiej jak `--bg-surface-base`, która w trybie jasnym odnosi się do `#FFFFFF`, a w domyślnym trybie ciemnym płynnie ewoluuje w głęboki, oceaniczny odcień `#003737`. System ten mapuje również stany krytyczne – zmienna `--error-base` (#FFB4AB w trybie ciemnym) natychmiastowo przejmuje kontrolę wizualną nad elementami walidacyjnymi bez zmiany struktury HTML. Trzecią warstwę tworzą **Tokeny Komponentowe**, dedykowane specyficznym organizmom (np. `--shadow-modal`, `--glass-blur`), dziedziczące parametry ze struktur wyższych, co pozwala na mikrozarządzanie komponentami.

Szczególną uwagę w systemie semantycznym zwraca się na bezwzględny zakaz projektowy, oznaczony jako błąd krytyczny (Critical Fail): stosowanie białego tekstu na tle w kolorze `--gold-400`. Zestawienie to generuje współczynnik kontrastu drastycznie poniżej normy 4.5:1, wymaganej przez dyrektywy dostępności. Wszystkie złote przyciski CTA operują wyłącznie ciemnym tekstem w kolorze `--teal-800` (zbliżonym do `#001F1F`), co gwarantuje pełną czytelność w warunkach silnego nasłonecznienia na ekranach mobilnych. System chroni twórców przed obciążeniem wzroku, kategorycznie zakazując umieszczania jasnych tekstów na polach operacyjnych oznaczonych złotem (`--gold-400`). Walidacja kontrastu zachowuje wskaźnik czytelności wyższy niż 4.5:1.

**Płynna Typografia (Fluid Typography) i Kontrola Układu**

Zarządzanie wielkością czcionek w systemie responsywnym nie opiera się na punktowych zapytaniach medialnych, co prowadziłoby do powstawania tzw. skoków typograficznych przy zmianie rozmiaru okna. Zastosowano zaawansowane płynne skalowanie z wykorzystaniem funkcji matematycznej `clamp()`. Deklaracja `--fs-display: clamp(2.5rem, 4vw + 1.5rem, 4rem)` sprawia, że rozmiar głównego nagłówka ewoluuje w sposób ciągły, w ścisłej korelacji z szerokością rzutni, zachowując z góry narzucone wartości brzegowe. Taki zabieg nie tylko optymalizuje jakość kodu poprzez eliminację setek zbędnych klas użytkowych (np. `text-lg md:text-xl lg:text-2xl`), ale również zapewnia perfekcyjne dopasowanie treści do każdego, nawet niestandardowego wyświetlacza. W przypadku prezentacji kwot finansowych w Panelu Płatności lub Ścianie Fanów, wdrożono rygorystyczny wymóg stosowania właściwości `font-feature-settings: "tnum"`. Wymusza ona na fontach (Mukta Malar oraz IBM Plex Sans) użycie cyfr tabelarycznych o stałej szerokości. Zapobiega to irytującemu zjawisku „migotania” lub poziomego przesuwania się interfejsu podczas dynamicznej aktualizacji wartości wsparcia w czasie rzeczywistym.

**Parametryzacja i Inżynieria Glassmorphism 2.0**

Wizualnym fundamentem platformy TipJar+, definiującym jej technologiczny, a zarazem luksusowy charakter, jest koncepcja Dark Glassmorphism. Stanowi ona ewolucję prymitywnych efektów przezroczystości z ubiegłych lat. Współczesny Glassmorphism nie polega na prostej redukcji nieprzezroczystości obiektu tła (np. `opacity: 0.5`), co skutkuje nieestetycznym spłowieniem barw. Tworzy on wielowarstwową głębię poprzez emulację optycznych właściwości dyfrakcji świetlnej zachodzącej w zmatowionym szkle, co redukuje obciążenie kognitywne użytkownika poprzez wyraźne odseparowanie warstw interfejsu w osi Z.

Z architektonicznego punktu widzenia, system Glassmorphism wymaga precyzyjnego zarządzania trzema krytycznymi tokenami:
- `--glass-overlay: rgba(0, 31, 31, 0.44)` – zabarwienie nakładki, głębokie tony morskie.
- `--glass-blur: blur(20px) saturate(200%)` – fizyka szkła (promień 20 px + hiper-nasycenie).
- `--glass-border: 1px solid rgba(255, 255, 255, 0.125)` – subpikselowy obrys.

Zestawienie to jest wzbogacone systemem cieni ewaluacyjnych (`--shadow-modal` z ujemnym rozrzutem -12 px).

Implementacja `backdrop-filter` jest kosztowna CPU. Na każdy kontener Glassmorphism nakłada się `transform: translateZ(0)` lub `will-change: transform, backdrop-filter` – wymuszenie warstwy GPU. Stosowanie efektu na dużych płaszczyznach tekstowych jest zabronione.

**Motion Physics**  
Krzywe Beziera:
- `--ease-enter: cubic-bezier(0.16, 1, 0.3, 1)`
- `--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275)`

Haptyka na mobile: sukces = rosnące wibracje, błąd = ostry puls, mikrointerakcje = 10-20 ms.

### 3. Architektura Informacji i Zarządzanie Przestrzenią Interfejsu

#### 3.1 Paradygmat Publicznego Profilu Twórcy

**Paradygmat Desktopowy: Dwukolumnowy Podział Kompetencji**

| Kolumna Interfejsu     | Przydział Szerokości | Zachowanie Behawioralne                          | Zawartość Komponentowa                          |
|------------------------|----------------------|--------------------------------------------------|-------------------------------------------------|
| Lewa (Narracyjna)      | 60% – 70%            | Swobodne przewijanie (scroll)                    | Hero, Bio, Masonry Fan Wall, Live Ticker        |
| Prawa (Transakcyjna)   | 30% – 40%            | `position: sticky; top: 24px`                    | Panel Wesprzyj, NFT Subskrypcje, Statystyki    |

**Paradygmat Mobilny: Linearyzacja + Sticky Bottom Bar**

Kolejność: Hero → Bio → Masonry → Live Ticker → (opcjonalnie statystyki).  
Transakcyjny CTA → `position: fixed; bottom: 0; height: 72px;` z Glassmorphism.

**Strategia Zapobiegania Okluzji**

| Strategia                          | Mechanizm Implementacji                              | Wydajność i Skuteczność                          |
|------------------------------------|------------------------------------------------------|--------------------------------------------------|
| Twardo Zakodowany Odstęp (CSS)     | `padding-bottom: 72px` + `@media (max-width: 640px)` | Najwyższa, zero JS                               |
| Obliczanie Dynamiczne (React Refs) | `useEffect` + `clientHeight`                         | Idealne, ale CLS po hydracji                     |
| Zmienne Środowiskowe               | `calc(72px + env(safe-area-inset-bottom))`          | Optymalny kompromis, zero CLS                    |

#### 3.2 Paradygmat Panelu Twórcy Web3

**Paradygmat Desktopowy (≥ 1024 px)**

| Obszar Interfejsu      | Przydział Szerokości i Pozycjonowanie          | Kontekst Behawioralny i Zawartość               |
|------------------------|------------------------------------------------|-------------------------------------------------|
| Pasek Boczny (Sidebar) | 260 px, `fixed; left: 0;`                      | Nawigacja + awatar                              |
| Obszar Główny (Main)   | `margin-left: 260px`                           | Swobodne przewijanie treści                     |
| Górny Pasek (Topbar)   | `sticky; top: 0;` + Glassmorphism              | Powiadomienia, tytuł, menu użytkownika          |

**Paradygmat Mobilny (< 640 px)**  
1. Hamburger + Drawer (80% szerokości, overlay z-index 1000)  
2. Bottom Navigation Bar (64 px, 5 kluczowych stref)  
3. `padding-bottom: calc(64px + env(safe-area-inset-bottom))` na `<main>`

### 4. Szczegółowa Specyfikacja Komponentów (Atomy → Molekuły → Organizmy)

#### 4.1 Publiczny Profil – Sekcja Bohatera (Hero) i Bio
- Awatar: 80 px (mobile) → 120 px (desktop) + pierścień weryfikacji + Tooltip (500 ms delay)
- H1: Mukta Malar 600 + chipy kategoryzacyjne (`border-radius: 999px`)
- Bio: `line-clamp: 2` → pełny Markdown + responsywne YouTube iframe (16:9)

#### 4.2 Wieczna Ściana Fanów (Masonry + Wirtualizacja)
- Układ: TanStack Virtualizer (headless) + custom measurement logic
- Gaps: 16 px
- Każdy kafel: Arweave txId + modal z linkiem do explorera
- Fallback: natywny `grid-template-rows: masonry` (Level 3)

#### 4.3 Live Ticker (Publiczny Profil)
- SSE + Redis Pub/Sub (asymetryczne, jednokierunkowe)
- Animacja: `fade-in-up` 0.3 s + `--ease-enter`
- Podświetlenie nowego wpisu: `--success-light` (dokładnie 2 s)

#### 4.4 Panel Transakcyjny + Bottom Sheet
- Desktop: sticky prawa kolumna + `--shadow-modal`
- Mobile: Bottom Sheet 85% wysokości + Swipe Down
- Predefiniowane kwoty 1-50 USDC + pole dowolne + walidacja + toast

#### 4.5 Dashboard Panelu Twórcy – Bento Grid
**KPI Cards** (4 kafelki):
1. Saldo USDC + szybka wypłata (`tnum`)
2. Napiwki bieżącego miesiąca + trend %
3. Liczba aktywnych wspierających
4. Najwyższy historyczny napiwek

**Wykres aktywności**: Recharts / Chart.js + gradient `--gold-400`  
**Lista ostatnich napiwków**: 5-10 rekordów + przycisk „Podziękuj” (modal)  
**To-Do List**: proaktywne bannery (KYC, avatar, API)  
**Asystent AI (Floating Chat Widget)**: 400×600 px Glassmorphism + Web Speech API + intent parser → wagmi + bundler + Paymaster

#### 4.6 Napiwki i Historia Transakcji (Panel)
- `react-window` + `FixedSizeList` (wysokość wiersza 56 px)
- FilterBar + Date Picker + eksport CSV (`/api/creator/transactions/export`)

#### 4.7 Subskrypcje (MRR + NFT)
- SubscriptionPlanForm → factory function inteligentnego kontraktu
- Paymaster = zero gas dla twórcy

#### 4.8 Wypłaty (PayoutFlow + MiCA)
Krokowy wizard:
1. Metoda (on-chain / off-ramp)
2. Kwota (min. 10 USDC)
3. Adres + ENS + UTS-46 normalizacja
4. Podpis EIP-712 lub 2FA (Web2)

#### 4.9 Wiadomości
- WebSocket (full-duplex) vs SSE (powiadomienia)

#### 4.10 Ustawienia + DAO Governance
- Tabs: wizerunek, bezpieczeństwo (TOTP, sesje), integracje (webhooki)
- DAO: Relayer + bezpaliwowe sygnatury

### 5. Abstrakcja Web3 (wspólna)
- EIP-712 zamiast Blind Signing
- WalletAddress + viem + ENS + normalize(UTS-46)
- Maszyna stanów transakcyjnych (5 etapów wagmi)
- NetworkWarning + `wallet_switchEthereumChain` (`0x89` Polygon)
- Panel Twórcy: Smart Wallet (Passkey + biometria) + ERC-4337 + Bundler + Paymaster

### 6. Inżynieria Next.js 15 (hybrydowa)
| Komponent                          | Architektura          | Pobieranie danych                  |
|------------------------------------|-----------------------|------------------------------------|
| Główny szkielet                    | SSG + ISR             | `revalidate: 3600`                 |
| Fan Wall                           | CSR + hydration       | React-Query / SWR                  |
| Live Ticker                        | CSR + streaming       | SSE w `useEffect`                  |
| Panel (dashboard)                  | Parallel + Intercepting Routes | loading.tsx / error.tsx       |

**Satori Engine** (`/app/api/og/route.tsx`) – dynamiczne OG images na Edge.

### 7. Dostępność WCAG 2.2 + EAA
- Focus Appearance (AAA): 2 px outline + offset 2 px + kontrast 3:1
- Focus Not Obscured (AA): `scrollIntoView`
- Redundant Entry (AA): dane z kontekstu sesji
- Dragging Movements (AA): klawiaturowe alternatywy
- Touch targets: minimum 44×44 px

### 8. Atomowa Checklista Implementacyjna

| Obszar / Kategoria          | Komponent Inżynieryjny                  | Złożoność     | Zależności Web3 / WCAG                  |
|-----------------------------|-----------------------------------------|---------------|-----------------------------------------|
| Baza CSS & Design           | `@theme` variables                      | Podstawowa    | Tailwind v4 CSS-first                   |
| Baza CSS & Design           | GPU acceleration Glassmorphism          | Wysoka        | `will-change: transform`                |
| Dostępność                  | `:focus-visible` (Focus Appearance)     | Średnia       | Offset 2 px, Contrast 3:1               |
| Dostępność                  | Okluzja Focus Not Obscured              | Wysoka        | `scrollIntoView`                        |
| Nawigacja (UI)              | SidebarNavItem                          | Podstawowa    | `--bg-surface-elevated`                 |
| Nawigacja (UI)              | Topbar + powiadomienia                  | Średnia       | SSE                                     |
| Zarządzanie Czasem          | Agent AI Widget                         | Ekstremalna   | Intent UX + Web Speech                  |
| Analiza Danych              | KPICard (`tnum`)                        | Podstawowa    | `--ease-spring`                         |
| Historia / Tabele           | TransactionsTable (wirtualizacja)       | Wysoka        | `react-window` FixedSizeList            |
| Historia / Tabele           | Export CSV                              | Średnia       | `/api/creator/transactions`             |
| Monetyzacja Web3            | SubscriptionPlanForm                    | Wysoka        | Factory contract + Paymaster            |
| Monetyzacja Web3            | PayoutFlow (MiCA)                       | Ekstremalna   | ENS + brak oprocentowania               |
| Komunikacja                 | Messenger                               | Średnia       | WebSocket (full-duplex)                 |
| Infrastruktura App          | Parallel / Intercepting Routes          | Wysoka        | Next.js 15 @folders + `(..)`            |

**Gotowe.**  
Zero fillerów. Każdy atom ma swoje miejsce.  
[TRYB: DETAL]

