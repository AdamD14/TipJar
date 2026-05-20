# TipJar+ Design System – Specyfikacja Komponentów UI

## Krok 1: Fundamenty Systemu (Globalne Tokeny CSS)

### 1. Paleta Bazowa (Primitive Tokens) – Kolory podstawowe

To są surowe wartości. Nie używaj ich bezpośrednio w komponentach (poza wyjątkami). Używaj tokenów semantycznych z sekcji 2.

#### Skala Ciemnego Turkusu (Primary Teal Base)

| Token      | HEX      | HSL                  | Zastosowanie (Kontekst)                          |
|------------|----------|----------------------|--------------------------------------------------|
| --teal-25  | #E0F2F2  | 180°, 41%, 91%       | Najjaśniejsze tła, zamiennik bieli w dark mode   |
| --teal-50  | #CCF7F4  | 176°, 70%, 88%       | Tekst na ciemnym tle, tła w trybie jasnym        |
| --teal-100 | #ABE1E1  | 180°, 44%, 78%       | Subtelne akcenty, ikony nieaktywne, obrysy pomocnicze |
| --teal-200 | #76CBCB  | 180°, 46%, 63%       | Obrysy pól formularzy (default)                  |
| --teal-300 | #3FB5B5  | 180°, 48%, 48%       | Elementy graficzne, drugorzędne przyciski        |
| --teal-400 | #2A8A8A  | 180°, 53%, 35%       | Stany :hover dla ciemniejszych elementów, fokus  |
| --teal-450 | #0F7F7F  | 180°, 79%, 28%       | Pośredni hover/akcent dla elementów interaktywnych |
| --teal-500 | #007373  | 180°, 100%, 23%      | Interaktywne tła kart, nagłówki sekcji           |
| --teal-600 | #005959  | 180°, 100%, 17%      | :hover dla elementów o wadze 500                 |
| --teal-700 | #004545  | 180°, 100%, 14%      | Tło "Elevated" (karty na kartach), obrysy        |
| --teal-800 | #003737  | 180°, 100%, 11%      | Bazowe tło aplikacji (Dark Mode)                 |
| --teal-850 | #002121  | 180°, 100%, 6%       | Tło elementów zagłębionych, cienie               |
| --teal-900 | #001F1F  | 180°, 100%, 6%       | Globalne tło `<body>`, najgłębsze cienie         |

#### Skala Złota (Primary Action Gold)

| Token      | HEX      | Zastosowanie (Kontekst)                                      |
|------------|----------|--------------------------------------------------------------|
| --gold-50  | #FEFFE0  | Najjaśniejsze tła, subtelne podświetlenia                    |
| --gold-100 | #FAFF46  | Tła powiadomień typu Toast, hover dla --gold-50              |
| --gold-200 | #FFEA00  | Elementy dekoracyjne, stan :hover dla złotych przycisków     |
| --gold-300 | #FFE100  | Stan :hover dla przycisków primary                           |
| --gold-400 | #FFD700  | **Główny Akcent (CTA)**. Przyciski, ikony, aktywne linki     |
| --gold-500 | #FFC312  | Stan :active dla złotych przycisków (przyciemnienie)         |
| --gold-600 | #FFAB00  | Warianty ciemniejsze                                         |
| --gold-700 | #FF8F00  | Warianty ciemniejsze (rzadko w UI)                           |
| --gold-800 | #F08010  | Głęboki złoty akcent, obramowania                            |
| --gold-900 | #CC7A06  | Najciemniejszy złoty, tekst na jasnych tłach                 |

#### Skala Fioletu (Secondary Accent Purple)

| Token        | HEX      | Zastosowanie (Kontekst)                     |
|--------------|----------|---------------------------------------------|
| --purple-100 | #661B66  | Tła zaznaczonych elementów (selected state) |
| --purple-200 | #5C005C  | Linki w tekście, pierścień fokusu           |
| --purple-300 | #4D194D  | **Bazowy Akcent Pomocniczy**. Ikony nawigacji, Toggle, Focus Ring |
| --purple-400 | #3A143A  | Stan :hover dla elementów fioletowych       |
| --purple-500 | #2F0D2F  | Ciemniejsze elementy brandowe, obrysy       |

#### Paleta Walidacyjna (Semantic Colors)

| Token         | HEX      | Zastosowanie (Kontekst)                  |
|---------------|----------|------------------------------------------|
| --error-light | #FFB4AB  | Tekst błędu na ciemnym tle               |
| --error-base  | #FF5252  | Obramowania pól z błędem, ikony błędu    |
| --error-dark  | #3D1010  | Tło dla bloków/alertów błędów            |
| --success-light | #69F0AE | Tekst sukcesu na ciemnym tle             |
| --success-base | #00E676  | Ikony sukcesu, obramowania               |
| --success-dark | #004D26  | Tło dla alertów sukcesu                  |
| --warning-base | #FF9100  | Ostrzeżenia (sieć, brak środków)         |
| --info-base   | #66D9E8  | Toast informacyjny, status "Pending"     |

### 2. Tokeny Semantyczne (Semantic Tokens)

| Token Semantyczny     | Wartość (Dark Mode) | Zastosowanie                                      |
|-----------------------|---------------------|---------------------------------------------------|
| --bg-app-global       | var(--teal-900)     | Tło `<body>`. Nigdy nie używaj `#000000`.         |
| --bg-surface-base     | var(--teal-800)     | Tła kart, dropdownów, kontenerów                  |
| --bg-surface-elevated | var(--teal-700)     | Tła elementów :hover, aktywnych wierszy tabel     |
| --bg-surface-modal    | var(--teal-800)     | Kontenery okien modalnych                         |
| --text-primary        | #f2f7f7             | Nagłówki, główne wartości liczbowe                |
| --text-secondary      | var(--teal-25) (#E0F2F2) | Tekst pomocniczy, drugorzędny                    |
| --text-tertiary       | var(--teal-50) (#CCF7F4) | Etykiety, akapity o niższym priorytecie            |
| --text-quaternary     | var(--teal-100) (#ABE1E1) | Placeholdery, dane nieaktywne, timestampy        |
| --border-subtle       | var(--teal-700)     | Obrysy kart, ramki inputów (domyślne)             |
| --border-focus        | var(--purple-300)   | Pierścień nawigacji klawiaturowej                 |
| --action-primary-bg   | var(--gold-400)     | Tło głównych przycisków CTA                       |
| --action-primary-text | var(--teal-900)     | Kolor tekstu na złotym tle (krytyczne dla WCAG)   |
| --action-secondary-bg | var(--purple-300)   | Tło przycisków drugorzędnych                      |

### 3. System Typograficzny (Fluid Typography)

| Token          | Wartość                              | Krój                  | Zastosowanie          |
|----------------|--------------------------------------|-----------------------|-----------------------|
| --font-heading | 'Mukta Malar', sans-serif            | -                     | Nagłówki, Przyciski   |
| --font-body    | 'IBM Plex Sans', sans-serif          | -                     | Tekst ciągły, tabele  |
| --fs-display   | clamp(2.5rem, 4vw + 1.5rem, 4rem)    | Mukta 700             | Hero, duże liczby     |
| --fs-h1        | clamp(2rem, 1.5vw + 1.6rem, 2.5rem)  | Mukta 600             | Tytuły stron          |
| --fs-h2        | clamp(1.75rem, 1vw + 1.5rem, 2rem)   | Mukta 600             | Nagłówki sekcji       |
| --fs-h3        | clamp(1.5rem, 0.5vw + 1.3rem, 1.75rem) | Mukta 500           | Tytuły kart           |
| --fs-body-m    | 1rem (16px)                          | IBM Plex 400          | Standardowy tekst     |
| --fs-caption   | 0.75rem (12px)                       | IBM Plex 500          | Tekst prawny, statusy |
| --fs-button    | 1rem                                 | Mukta 600             | Tekst na przyciskach  |

**Reguła krytyczna dla kwot:**

```css
font-feature-settings: "tnum";
```

### 4. System Głębi i Fizyki (Elevation & Motion)

**Cienie**

| Token          | Wartość                                      | Zastosowanie             |
|----------------|----------------------------------------------|--------------------------|
| --shadow-1     | 0 4px 6px -1px rgba(0, 0, 0, 0.5)            | Subtelne uniesienie kart |
| --shadow-2     | 0 10px 25px -5px rgba(0, 0, 0, 0.6)          | Stan :hover kart         |
| --shadow-modal | 0 24px 48px -12px rgba(0, 0, 0, 0.7)         | Modale                   |

**Glassmorphism**

```css
--glass-overlay: rgba(0, 31, 31, 0.44);
--glass-blur: blur(20px) saturate(200%);
--glass-border: 1px solid rgba(255, 255, 255, 0.125);
```

**Krzywe animacji**

| Token           | Wartość                              | Czas      | Zastosowanie          |
|-----------------|--------------------------------------|-----------|-----------------------|
| --ease-standard | cubic-bezier(0.4, 0.0, 0.2, 1)       | 200ms     | Hover, focus          |
| --ease-enter    | cubic-bezier(0.16, 1, 0.3, 1)        | 300-400ms | Modale, powiadomienia |
| --ease-spring   | cubic-bezier(0.175, 0.885, 0.32, 1.275) | 400ms  | FAB, Toggle Switch    |

### 5. System Warstw (Z-Index)

| Token        | Wartość | Zastosowanie                          |
|--------------|---------|---------------------------------------|
| --z-base     | 0       | Elementy statyczne                    |
| --z-elevated | 10      | Karty z :hover                        |
| --z-dropdown | 100     | Menu rozwijane                        |
| --z-fab      | 200     | FAB, Sticky Bottom Bar                |
| --z-backdrop | 500     | Tło modala                            |
| --z-modal    | 1000    | Okno modalne                          |
| --z-tooltip  | 1500    | Tooltip / Popover                     |
| --z-toast    | 9999    | Powiadomienia Toast                   |

### 6. Breakpointy

| Nazwa | Min. szerokość | Zastosowanie                              |
|-------|----------------|-------------------------------------------|
| xs    | 320px          | Mikro urządzenia                          |
| sm    | 640px          | Modale → Bottom Sheets                    |
| md    | 768px          | Tablety                                   |
| lg    | 1024px         | Stała boczna nawigacja                    |
| xl    | 1280px         | Duży desktop                              |

**Safe Area:**

```css
padding-bottom: calc(72px + env(safe-area-inset-bottom));
```

---

## Krok 2: Specyfikacja Atomów Bazowych

### 1. System Przycisków (Buttons)

#### 1.1 Wymiary (siatka 8-punktowa)

| Rozmiar   | Wysokość | Padding X | Font Size | Ikona | Border Radius |
|-----------|----------|-----------|-----------|-------|---------------|
| Large (L) | 56px     | 32px      | 18px      | 24px  | 8px           |
| Medium (M)| 48px     | 24px      | 16px      | 20px  | 8px           |
| Small (S) | 40px     | 16px      | 14px      | 16px  | 8px           |

**⚠️ Obszar dotykowy:** Dla Small minimalny obszar kliknięcia to 44px (realizowane przez pseudoelement).

#### 1.2 Wariant Primary (Złoty)

| Stan     | Tło            | Tekst         | Obramowanie          | Cień / Transform          |
|----------|----------------|---------------|----------------------|---------------------------|
| Default  | --gold-400     | --teal-900    | none                 | --shadow-1                |
| Hover    | --gold-300     | --teal-900    | none                 | --shadow-2                |
| Active   | --gold-500     | --teal-900    | none                 | scale(0.98), shadow-1     |
| Focus    | --gold-400     | --teal-900    | 2px solid --purple-300 | outline-offset: 2px     |
| Disabled | --teal-850     | --teal-200    | none                 | none                      |
| Loading  | --gold-400     | Ukryty (tekst ukryty) | none                 | Spinner SVG w kolorze --teal-900 |

**Krytyczne WCAG:** Tekst musi być `--teal-900` (kontrast 11.2:1 = AAA).

#### 1.3 Wariant Secondary (Fioletowy / Outline)

| Stan     | Tło                     | Tekst / Obramowanie     | Transform    |
|----------|-------------------------|-------------------------|--------------|
| Default  | transparent             | --purple-300            | none         |
| Hover    | rgba(--purple-300, 0.1) | --purple-300            | none         |
| Active   | rgba(--purple-300, 0.15)| --purple-300            | scale(0.98)  |
| Focus    | transparent             | --purple-300 + pierścień| outline-offset: 2px |

#### 1.4 Wariant Destructive

| Stan     | Tło                     | Tekst / Obramowanie |
|----------|-------------------------|---------------------|
| Default  | transparent lub --error-dark | --error-base     |
| Hover    | rgba(255, 82, 82, 0.1)  | --error-base        |
| Focus    | transparent             | Pierścień --error-base |

#### 1.5 Floating Action Button (FAB)

- Wymiary: 56×56px (koło)
- Border-radius: 50%
- Z-index: --z-fab (200)
- Kolor: --gold-400 (tekst/ikona --teal-900)
- Scroll: w dół → `translateY(150%) scale(0.9)`, w górę → `translateY(0)`
- Animacja: --ease-spring

### 2. System Pól Formularzy

#### 2.1 Wymiary bazowe

- Wysokość Large: 56px
- Wysokość Standard: 48px
- Padding X: 16px
- Border-radius: 6px
- Tło: --bg-surface-base
- Obramowanie: 1px solid --border-subtle
- Tekst: --text-primary
- Placeholder: --text-quaternary

#### 2.2 Stany interakcji (Input)

| Stan     | Obramowanie          | Box-shadow                                      | Etykieta                  |
|----------|----------------------|-------------------------------------------------|---------------------------|
| Hover    | --teal-600           | none                                            | bez zmian                 |
| Focus    | --gold-400           | 0 0 0 1px --gold-400, 0 0 0 4px rgba(255,215,0,0.25) | --gold-400, scale(0.75) |
| Error    | --error-base         | 0 0 0 4px rgba(255,82,82,0.25)                  | --error-base              |
| Success  | --success-base       | none                                            | --success-base            |
| Disabled | --teal-700 (przerywane) | none                                         | opacity: 0.4              |

**Walidacja:** Tekst błędu w kolorze `--error-light`.

#### 2.3 Textarea

- Padding: 16px
- Resize: vertical
- Scrollbar: tor transparent, suwak --teal-600

#### 2.4 Select

- Trigger jak Input
- Ikona chevron (obrót 180° przy otwarciu)
- Menu: --bg-surface-base + --shadow-modal
- Opcja hover: --bg-surface-elevated
- Opcja zaznaczona: tekst --gold-400 + ikona Check

#### 2.5 Checkbox & Radio

- Wymiary: 20×20px
- Checkbox: border-radius 4px
- Radio: border-radius 50%
- Zaznaczony: --purple-300 lub --gold-400

#### 2.6 Toggle Switch

- Tor Off: --teal-850 + 1px solid --teal-600
- Suwak Off: --teal-600 (lewo)
- Tor On: --purple-300
- Suwak On: --teal-25 (prawo)
- Animacja: --ease-spring

### 3. System Awatarów

#### 3.1 Wymiary i Skalowanie

| Rozmiar | Wymiar (px) | Zastosowanie     | Odznaka (Teoretycznie 20%) | Fizyczna Rekomendacja Odznaki |
|---------|-------------|------------------|----------------------------|-------------------------------|
| XS      | 24px        | Gęste listy      | 4.8px                      | **Min. 8px** (wymuszone)      |
| S       | 32px        | Komentarze, czat | 6.4px                      | 10px                          |
| M       | 64px        | Karty profilowe  | 12.8px                     | 16px                          |
| L       | 100px       | Nagłówki mobilne | 20px                       | 24px                          |
| XL      | 150px       | Profil główny    | 30px                       | 32px                          |

#### 3.2 Stylizacja

- Zawsze okrągłe (`border-radius: 50%`)
- Obramowanie: 2px solid --bg-surface-base (dla odcięcia od tła)
- Tło domyślne (Inicjały): `linear-gradient(135deg, --gold-400 0%, --purple-300 100%)`
- Tekst (Inicjały): --text-primary, font-weight: 700, **text-shadow: 0 1px 2px rgba(0,0,0,0.3)**

#### 3.3 Pozycjonowanie Odznaki (Wycięcie – Cutout)

Odznaka umieszczona w prawym dolnym rogu (`bottom: 7.3%`, `right: 7.3%`).

**Kompletny snippet CSS Masking:**

```css
/* Wycięcie w awatarze pod odznakę */
-webkit-mask-image: radial-gradient(
  circle at 85% 85%,
  transparent calc(var(--badge-size) / 2 + 2px),
  black calc(var(--badge-size) / 2 + 2.5px)
);
```

To zapewnia przezroczysty odstęp między awatarem a odznaką, niezależnie od tła strony.

---

## Krok 3: Specyfikacja Molekuł i Organizmów

### 1. System Kart (Cards)

#### 1.1 Wspólne parametry bazowe

| Właściwość          | Wartość                              | Uwagi                              |
|---------------------|--------------------------------------|------------------------------------|
| Tło                 | --teal-700 (#004545)                 | Odseparowanie od głębokiego tła    |
| Padding             | 24px                                 | Zwiększony dla "oddechu" w Dark Mode |
| Border Radius       | 12px                                 | "Friendly Modern"                  |
| Border              | 1px solid rgba(255,255,255,0.1)      | Ultra-thin semi-transparent border |
| Inner Shadow        | inset 0 1px 2px rgba(0,0,0,0.2)     | Głębia wewnętrzna                  |
| Backdrop Filter     | blur(20px)                           | Glassmorphism                      |
| Cień (spoczynek)    | --shadow-1                           | 0 4px 6px -1px rgba(0,0,0,0.5)    |
| Cień (hover)        | --shadow-2 + --shadow-gold-glow      | Podwójna warstwa poniżej           |
| Transform (hover)   | translateY(-6px)                     | -                                  |
| Animacja            | --ease-premium (300ms)               | cubic-bezier(0.25, 0.8, 0.25, 1)   |
| Hardware Accel      | translateZ(0)                        | GPU acceleration                   |

#### 1.1a — Podwójny cień hover (double layer)

Warstwa 1 (głębokość): `0 20px 25px -5px rgba(0,0,0,0.6)`
Warstwa 2 (gold glow): `0 0 10px rgba(252, 194, 1, 0.1)`

#### 1.1b — Pseudo-element glow (::before)

Zastosowany na hover dla efektu premium poświaty:
- `background: linear-gradient(...)`
- `filter: blur(10px)`
- `opacity: 0 → 1` na hover
- `transition: opacity 300ms --ease-premium`

#### 1.1c — Focus ring (złoty)

`box-shadow: 0 0 0 1px #FFD700, 0 0 0 4px rgba(255, 215, 0, 0.25)`

#### 1.2 Warianty funkcjonalne

| Wariant          | Specyfika                              | Kluczowe elementy                          |
|------------------|----------------------------------------|--------------------------------------------|
| Twórcy (Creator)| Awatar 64px, nazwa, handle, statystyki | Złoty checkmark (Verified), przycisk "Obserwuj" |
| Statystyk        | Duża liczba (KPI), delta, Sparkline    | Wykres liniowy w kolorze --gold-400        |
| Powiadomień      | Ikona, tytuł, opis, timestamp          | Stan nieprzeczytany: --bg-surface-elevated |
| NFT (Digital Asset) | Obraz 1:1, tytuł, cena, rzadkość    | Cena w --gold-400, rzadkość jako chip (fiolet) |

#### 1.3 Siatka kart

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 24px;
```

### 2. System Modali i Szuflad (Modal & Bottom Sheet)

#### 2.1 Modal Desktop

| Właściwość       | Wartość                                      |
|------------------|----------------------------------------------|
| Max szerokość    | 600px (formularze), 400px (potwierdzenia)    |
| Tło              | --bg-surface-modal (--teal-800)              |
| Border Radius    | 16px                                         |
| Padding          | 24px                                         |
| Cień             | --shadow-modal                               |
| Backdrop         | rgba(0,31,31,0.85) + blur(4px)               |
| Z-index          | --z-modal (1000)                             |
| Nagłówek         | Mukta Malar Bold, 24px, --teal-25 lub --gold-400 |

#### 2.2 Bottom Sheet (Mobile < 640px)

- Pozycja: `fixed; bottom: 0; left: 0; right: 0`
- Wysokość: 85% rzutni
- Border-radius: `16px 16px 0 0`
- Uchwyt: 40×4px, --border-subtle, wyśrodkowany
- Zamknięcie: swipe-down lub przycisk X
- Animacja wejścia: `slide-up 400ms --ease-enter`

### 3. System Dymków i Popoverów

#### 3.1 Tooltip

| Właściwość           | Wartość                                      |
|----------------------|----------------------------------------------|
| Rola                 | Etykietowanie (max 2 linie)                  |
| Tło                  | rgba(0,55,55,0.9)                            |
| Tekst                | --text-primary, 14px                         |
| Padding              | 8px 12px                                     |
| Border Radius        | 6px                                          |
| Cień                 | 0 4px 16px rgba(0,0,0,0.5)                   |
| Opóźnienie           | 500ms (Hover Intent)                         |
| Z-index              | --z-tooltip (1500)                           |
| Mobile               | Tap (Toggletip)                              |

#### 3.2 Popover

- Rola: `role="dialog"`
- Większy `--shadow-modal`
- Padding: 16px
- Zamknięcie: click outside / Escape

### 4. System Powiadomień (Toast / Snackbar)

| Właściwość       | Wartość                                      |
|------------------|----------------------------------------------|
| Tło              | --teal-800                                   |
| Tekst            | --text-primary                               |
| Padding          | 16px                                         |
| Border Radius    | 12px                                         |
| Cień             | 0 8px 24px -4px rgba(0,0,0,0.6)              |
| Czas wyświetlania| 4 sekundy (pauza na hover)                   |
| Z-index          | --z-toast (9999)                             |
| Desktop          | Prawy dolny róg (24px)                       |
| Mobile           | Góra + env(safe-area-inset-top)              |
| Animacja         | slide-in 400ms --ease-spring                 |

**Warianty kolorystyczne:**

| Typ        | Kolor                  | Przykład             |
|------------|------------------------|----------------------|
| Sukces     | Szmaragd / Mięta       | --success-base       |
| Błąd       | Koral / Jasna Malina   | --error-base         |
| Informacja | Cyjan / Błękit         | --info-base          |
| Ostrzeżenie| Bursztyn               | --warning-base       |

**Dostępność:** `role="alert"` tylko dla błędów i ostrzeżeń.

### 5. Stany Ładowania

#### 5.1 Spinner

| Rozmiar | Wymiar | Grubość | Zastosowanie     |
|---------|--------|---------|------------------|
| Mały (S)| 24px   | 4.5px   | Przyciski, inputy|
| Średni  | 48px   | 3.5px   | Karty, modale    |
| Duży    | 72px   | 3.0px   | Pełny ekran      |

Kolor: `linear-gradient(135deg, --gold-400 0%, --purple-300 100%)`  
Animacja: rotate + dash (1.5–2s)

#### 5.2 Skeleton Screen

```css
.skeleton {
  background: linear-gradient(110deg, var(--teal-800) 0%, var(--teal-700) 40%, var(--teal-800) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Krok 4: Widoki Specjalistyczne – Layouty i Mechanika

### 1. Publiczny Profil Twórcy (Creator Profile View)

#### 1.1 Desktop (≥1024px)

- Lewa kolumna (60–70%): Hero, Bio, Ściana Fanów (Masonry), Live Ticker
- Prawa kolumna (30–40%): Panel płatności "Wesprzyj" (sticky, top: 24px)

#### 1.2 Mobile (<640px)

- Linearyzacja pionowa
- Panel transakcyjny → Sticky Bottom Bar (72px, --z-fab)
- Padding-bottom: `calc(72px + env(safe-area-inset-bottom))`

#### 1.3 Ściana Fanów (Masonry)

- Biblioteka: `@tanstack/react-virtual`
- Kolumny: Desktop 3, Tablet 2, Mobile 1
- Gap: 16px

#### 1.4 Live Ticker

- Limit: 10 wpisów
- Technologia: SSE + Redis Pub/Sub
- Podświetlenie nowego: --success-base przez 2s

### 2. Panel Fana (Fan Dashboard)

#### 2.1 Desktop

- Sidebar lewy (200px, sticky): Awatar, menu, przycisk "Zostań twórcą"
- Topbar: Powitanie + miniaturowy awatar + powiadomienia
- Obszar główny: dynamiczne widoki

#### 2.2 Mobile

- Sticky Bottom Bar (5 ikon)
- Hamburger Drawer lub Bottom Sheet dla "Więcej"

#### 2.3 Galeria Odznak NFT (Bento Grid)

- Grid: `repeat(auto-fill, minmax(160px, 1fr))`
- Hover: translateY(-2px) + --shadow-2
- Rzadkość: Brąz / Srebro / Złoto / Fiolet

### 3. Katalog Twórców (Explore / Discovery)

#### 3.1 Desktop

- Szybkie filtry (chipy, overflow-x)
- Zaawansowane filtry (dropdown)
- Siatka: `repeat(auto-fill, minmax(280px, 1fr))`
- Paginacja (numery stron)

#### 3.2 Mobile

- Filtry poziome (swipe)
- Zaawansowane filtry → Bottom Sheet
- Siatka: 2 kolumny

#### 3.3 Mechanika

- Debounce wyszukiwania: 300ms
- Filtry w URL Query Params
- `router.push(url, { scroll: false })`

---

## Krok 5: Specyfikacja Logiki Web3 i Płatności

### 1. Architektura Modala Płatności (Wizard)

| Krok | Nazwa       | Zawartość |
|------|-------------|-----------|
| 0    | Kontekst    | Tytuł "Wesprzyj [Nazwa]", awatar 32px, przycisk X |
| 1    | Kwota       | Presety $1/$5/$10/$20/$50 + pole własne + live conversion USDC/ETH |
| 2    | Metoda      | Akordeon: Karta (Circle), Web3 Wallet, Saldo TipJar |
| 3a   | Karta       | Circle Elements iframe + "Zapisz kartę" |
| 3b   | Web3        | RainbowKit / Web3Modal + skrócony adres / ENS + saldo USDC |
| 3c   | Saldo TipJar| Wyświetlenie salda + przycisk "Zapłać z salda" |
| 4    | Opcje       | Wiadomość (textarea 200 znaków), Proof of Support NFT, Anonimowo |
| 5    | Podsumowanie| Kwota + Opłata 0% + Gas Fee + przycisk finalny --gold-400 |

**Network Warning:** Przy złej sieci – żółty pasek + przycisk "Zmień sieć" (Polygon 0x89).

### 2. Stany Transakcji

| Stan     | UI                              | Komunikat |
|----------|----------------------------------|-----------|
| 1. Podpis| Zablokowany + Spinner           | "Potwierdź transakcję w portfelu" |
| 2. Pending| Odblokowany + Spinner zegara    | Link do Polygonscan |
| 3. Sukces| Zielony checkmark + Haptyk      | "Transakcja zatwierdzona!" |
| 4. Błąd  | Czerwone tło                    | Mapowanie błędów RPC na czytelny język |

### 3. ERC-4337 + Paymaster

- Smart Account tworzony przy rejestracji (Passkeys)
- UserOperation + batching
- Paymaster sponsoruje gaz → pole Gas Fee znika lub pokazuje $0.00

### 4. Wyświetlanie Adresów i ENS

- Priorytet: ENS → skrócony adres
- Biblioteka: `viem` + normalizacja UTS-46
- Przycisk "Kopiuj" + Toast

### 5. Zgodność z MiCA

- Pełna tabela kosztów przed płatnością
- Brak dark patterns przy anulowaniu subskrypcji
- Tooltip przy USDC: "Stablecoiny służą wyłącznie do płatności"

---

## Krok 6: Specyfikacja Centrum Wiedzy (Learn)

### 1. Architektura Layoutu

**Desktop (≥1024px):**  
Lewa kolumna (30%, sticky) – wyszukiwarka + drzewo kategorii  
Prawa kolumna (70%) – treść artykułu

**Mobile:** Linearyzacja + breadcrumbs

### 2. Komponenty nawigacyjne

- Wyszukiwarka: Flexsearch / Pagefind, debounce 300ms
- CategoryTree: Akordeon z aktywnym markerem --gold-400

### 3. Widok Artykułu

- Parser: `react-markdown` + DOMPurify
- Max szerokość tekstu: 720px
- Interlinia: 1.7
- Linki: --gold-400 + underline na hover

**Callout blocks:**

```markdown
:::warning
:::tip
:::info
:::danger
```

### 4. Dodatkowe elementy

- Table of Contents (sticky, Intersection Observer)
- Glossary Tooltips (500ms hover)
- Helpfulness Buttons ("Czy artykuł był pomocny?")

### 5. Stany puste i ładowania

- Brak wyników: ilustracja + sugerowane wyszukiwania
- Ładowanie: Skeleton z shimmer
- Błąd: komunikat --error-base + "Spróbuj ponownie"

---

**Koniec dokumentu**