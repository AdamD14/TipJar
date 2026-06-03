🧬 Krok 1: Fundamenty Systemu (Globalne Tokeny CSS)
1. Paleta Prymitywna (Primitive Tokens) – Kolory Bazowe
To są surowe wartości. Nie używaj ich bezpośrednio w komponentach (poza wyjątkami). Używaj
tokenów semantycznych z sekcji 2.
Skala Ciemnego Turkusu (Primary Teal Base)
Token HEX HSL Zastosowanie (Kontekst)
--teal-50 #E0F2F2 180°, 40%, 95% Tekst na ciemnym tle (zastępuje biel), tła w trybie jasnym
--teal-100 #B3D9D9 180°, 35%, 78% Subtelne akcenty, ikony nieaktywne, obrysy pomocnicze
--teal-200 #80BFBF 180°, 38%, 62% Obrysy pól formularzy (default)
--teal-300 #4DA6A6 180°, 38%, 48% Elementy graficzne, drugorzędne przyciski
--teal-400 #268C8C 180°, 57%, 35% Stany :hover dla ciemniejszych elementów, fokus
--teal-500 #007373 180°, 100%, 22% Interaktywne tła kart, nagłówki sekcji
--teal-600 #005959 180°, 100%, 17% :hover dla elementów o wadze 500
--teal-700 #004545 180°, 100%, 14% Tło "Elevated" (karty na kartach), obrysy
--teal-800 #003737 180°, 100%, 11% Bazowe tło aplikacji (Dark Mode)
--teal-900 #001F1F 180°, 100%, 6% Globalne tło <body>, najgłębsze cienie
Skala Złota (Primary Action Gold)
Token HEX Zastosowanie (Kontekst)
--gold-100 #FFF9C4 Tła powiadomień typu Toast, rzadko używane
--gold-200 #FFF176 Elementy dekoracyjne
--gold-300 #FFEA00 Stan :hover dla złotych przycisków (rozjaśnienie)
--gold-400 #FFD700 Główny Akcent (CTA). Przyciski, ikony, aktywne linki
--gold-500 #FFC107 Stan :active dla złotych przycisków (przyciemnienie)
--gold-600 #FFAB00 Warianty ciemniejsze (rzadko w UI)
--gold-700 #FF8F00 Warianty ciemniejsze (rzadko w UI)
Skala Fioletu (Secondary Accent Purple)
Token HEX Zastosowanie (Kontekst)
--purple-100 #E0B3FF Tła zaznaczonych elementów (selected state)
--purple-200 #C27AFF Linki w tekście, pierścień fokusu
--purple-300 #9D4EDD Bazowy Akcent Pomocniczy. Ikony nawigacji, Toggle, Focus Ring
--purple-400 #7B2CBF Stan :hover dla elementów fioletowych
--purple-500 #5A189A Ciemniejsze elementy brandowe, obrysy
Paleta Walidacyjna (Semantic Colors)
Token HEX Zastosowanie (Kontekst)--error-light #FFB4AB Tekst błędu na ciemnym tle
--error-base #FF5252 Obramowania pól z błędem, ikony błędu
--error-dark #3D1010 Tło dla bloków/alertów błędów
--success-light #69F0AE Tekst sukcesu na ciemnym tle
--success-base #00E676 Ikony sukcesu, obramowania
--success-dark #004D26 Tło dla alertów sukcesu
--warning-base #FF9100 Ostrzeżenia (sieć, brak środków)
--info-base #66D9E8 Toast informacyjny, status "Pending"
---
2. Tokeny Semantyczne (Semantic Tokens) – Jak Tego Używać
To jest jedyna warstwa, której powinieneś używać w 99% komponentów. Dzięki temu zmiana
trybu z Light na Dark to tylko podmiana tych zmiennych, a nie całego CSS.
Token Semantyczny Wartość (Dark Mode) Zastosowanie
--bg-app-global var(--teal-900) Tło <body>. Nigdy nie używaj #000000.
--bg-surface-base var(--teal-800) Tła kart, dropdownów, kontenerów
--bg-surface-elevated var(--teal-700) Tła elementów :hover, aktywnych wierszy tabel
--bg-surface-modal var(--teal-800) Kontenery okien modalnych
--text-primary #FFFFFF Nagłówki, główne wartości liczbowe
--text-secondary #D6EBEB Tekst paragrafowy, etykiety (odcień 85% bieli)
--text-tertiary #5C7A7A Placeholdery, dane nieaktywne, timestampy
--border-subtle var(--teal-700) Obrysy kart, ramki inputów (domyślne)
--border-focus var(--purple-300) Pierścień nawigacji klawiaturowej
--action-primary-bg var(--gold-400) Tło głównych przycisków CTA
--action-primary-text var(--teal-800) Kolor tekstu na złotym tle (
Krytyczne dla WCAG)
--action-secondary-bg var(--purple-300) Tło przycisków drugorzędnych
⚠️
---
3. System Typograficzny (Fluid Typography)
Token Wartość clamp() / Stała Krój Zastosowanie
--font-heading 'Mukta Malar', sans-serif - Nagłówki, Przyciski
--font-body 'IBM Plex Sans', sans-serif - Tekst ciągły, tabele, metadane
--fs-display clamp(2.5rem, 4vw + 1.5rem, 4rem) Mukta 700 Hero, duże liczby
--fs-h1 clamp(2rem, 1.5vw + 1.6rem, 2.5rem) Mukta 600 Tytuły stron
--fs-h2 clamp(1.75rem, 1vw + 1.5rem, 2rem) Mukta 600 Nagłówki sekcji
--fs-h3 clamp(1.5rem, 0.5vw + 1.3rem, 1.75rem) Mukta 500 Tytuły kart
--fs-body-m 1rem (16px) IBM Plex 400 Standardowy tekst
--fs-caption 0.75rem (12px) IBM Plex 500 Tekst prawny, statusy
--fs-button 1rem Mukta 600 Tekst na przyciskach⚠️ Reguła Krytyczna dla Kwot: Każdy element wyświetlający cyfry (kwoty, daty) musi mieć:
```css
font-feature-settings: "tnum";
```
Zapobiega to "skakaniu" layoutu przy dynamicznej zmianie liczb.
---
4. System Głębi i Fizyki (Elevation & Motion)
Token Wartość Zastosowanie
--shadow-1 0 4px 6px -1px rgba(0, 0, 0, 0.5) Subtelne uniesienie kart
--shadow-2 0 10px 25px -5px rgba(0, 0, 0, 0.6) Stan :hover kart
--shadow-modal 0 24px 48px -12px rgba(0, 0, 0, 0.7) Modale
--glass-overlay rgba(0, 31, 31, 0.44) Warstwa tła pod rozmyciem
--glass-blur blur(20px) saturate(200%) Efekt matowego szkła
--glass-border 1px solid rgba(255, 255, 255, 0.125) Krawędź odcięcia dla Glass
Krzywe Animacji (Zakaz używania linear):
Token Wartość cubic-bezier Czas Zastosowanie
--ease-standard (0.4, 0.0, 0.2, 1) 200ms Hover, focus
--ease-enter (0.16, 1, 0.3, 1) 300-400ms Modale, powiadomienia
--ease-spring (0.175, 0.885, 0.32, 1.275) 400ms FAB, Toggle Switch
---
5. System Warstw (Z-Index Stacking)
Aby uniknąć konfliktów, trzymaj się sztywno tych wartości:
Token Wartość Zastosowanie
--z-base 0 Elementy statyczne
--z-elevated 10 Karty z :hover
--z-dropdown 100 Menu rozwijane
--z-fab 200 Pływający przycisk akcji, Sticky Bottom Bar
--z-backdrop 500 Tło modala
--z-modal 1000 Okno modalne
--z-tooltip 1500 Dymki (Tooltip/Popover)
--z-toast 9999 Powiadomienia Toast---
6. Breakpointy Responsywne (Mobile-First)
Nazwa Min. Szerokość Zastosowanie
xs 320px Mikro urządzenia
sm 640px Punkt krytyczny: Modale -> Bottom Sheets
md 768px Tablety
lg 1024px Punkt krytyczny: Włączenie bocznej nawigacji na stałe
xl 1280px Duży Desktop
Safe Areas (Notch & Home Indicator):
Zawsze dodawaj do stałych elementów (np. bottom-bar):
```css
padding-bottom: calc(72px + env(safe-area-inset-bottom));
```
---
🐋.
🧬 Krok 2: Specyfikacja Atomów Bazowych
1. System Przycisków (Buttons)
Zgodnie z dokumentem RAPORT TECHNICZNY: KOMPLEKSOWA SPECYFIKACJA
SYSTEMU KOMPONENTÓW UI – MODUŁ PRZYCISKÓW (str. 43-53).
1.1 Wymiary (Siatka 8-punktowa)
Rozmiar Wysokość Padding X Font Size Ikona Border Radius
Large (L) 56px 32px 18px 24px 8px
Medium (M) 48px 24px 16px 20px 8px
Small (S) 40px 16px 14px 16px 8px
⚠️ Obszar dotykowy: Dla Small minimalny obszar kliknięcia to 44px (realizowane przez
pseudoelement).
1.2 Wariant: Primary (Złoty)
Stan Tło Tekst Obramowanie Cień / Transform
Default --gold-400 --teal-800 none --shadow-1
Hover --gold-300 --teal-800 none --shadow-2Active --gold-500 --teal-800 none scale(0.98), shadow-1
Focus --gold-400 --teal-800 2px solid --purple-300 outline-offset: 2px
Disabled #E0E0E0 (Szary) #9E9E9E none none
Loading --gold-400 Ukryty none Spinner SVG (kolor --teal-800)
Krytyczne WCAG: Nigdy nie używaj białego tekstu na --gold-400. Kontrast 1.4:1 = FAIL. Tekst
musi być --teal-800 (kontrast 11.2:1 = AAA).
1.3 Wariant: Secondary (Fioletowy / Outline)
Dwie opcje kolorystyczne: Gold i Purple.
Stan Tło Tekst / Obramowanie Transform
Default transparent --purple-300 (lub --gold-400) none
Hover rgba(--purple-300, 0.1) --purple-300 none
Active rgba(--purple-300, 0.15) --purple-300 scale(0.98)
Focus transparent --purple-300, pierścień --purple-300 outline-offset: 2px
1.4 Wariant: Destructive (Czerwony / Usuwanie)
Stan Tło Tekst / Obramowanie
Default transparent lub #FEECEB #B00020
Hover rgba(176, 0, 32, 0.05) #B00020
Focus transparent Pierścień #B00020
Uwaga: Nie używaj czystej czerwieni #FF0000. W trybie ciemnym powoduje wibrację optyczną.
1.5 Wariant: Floating Action Button (FAB)
Właściwość Wartość
Wymiary 56x56px (koło)
Border Radius 50%
Z-Index --z-fab (200)
Kolor --gold-400 (tekst/ikona --teal-800)
Zachowanie przy scrollu W dół: translateY(150%) scale(0.9), W górę: translateY(0)
Animacja --ease-spring
---
2. System Pól Formularzy (Inputs, Textarea, Select)
Zgodnie z dokumentem Architektura Ciemnego Trybu: Kompleksowa Specyfikacja Systemu
Formularzy UI (str. 54-65).2.1 Wymiary i Bazowe Style
Właściwość Wartość
Wysokość (Large) 56px
Wysokość (Standard) 48px
Padding X 16px
Border Radius 6px
Tło (Default) --bg-surface-base (--teal-800)
Obramowanie (Default) 1px solid --border-subtle (--teal-700)
Tekst (Default) --text-primary (#FFFFFF)
Placeholder --text-tertiary (#5C7A7A)
2.2 Stany Interakcji (Input)
Stan Obramowanie Cień (Box-Shadow) Etykieta (Label)
Hover --teal-600 none Bez zmian
Focus (Złoty) --gold-400 0 0 0 1px --gold-400, 0 0 0 4px rgba(255, 215, 0, 0.25) Kolor
--gold-400, scale(0.75), przesunięta do góry
Error --error-base 0 0 0 4px rgba(255, 180, 171, 0.25) Kolor --error-base
Success --success-base none Kolor --success-base
Disabled --teal-700 (przerywane) none Opacity 0.4
Walidacja: Tekst błędu pod polem w kolorze --error-base (#FFB4AB). Dodatkowo opcjonalna
ikona wykrzyknika.
2.3 Textarea
Właściwość Wartość
Padding 16px
Resize vertical (tylko)
Scrollbar Tor: transparent, Suwak: --teal-600, Hover: --teal-500
2.4 Select (Dropdown)
Właściwość Wartość
Trigger Jak Input
Ikona Chevron, obraca się o 180deg przy otwarciu
Menu (Tło) --bg-surface-base (--teal-800)
Menu (Cień) --shadow-modal
Opcja (Hover) Tło --bg-surface-elevated (--teal-700)
Opcja (Selected) Tekst --gold-400, ikona "Check"
Animacja slideDownFade, 200ms, cubic-bezier(0.2, 0, 0, 1)
2.5 Checkbox & RadioWłaściwość Checkbox Radio
Wymiary 20x20px 20x20px
Border Radius 4px 50%
Obramowanie 2px solid --teal-600 2px solid --teal-600
Zaznaczony (Tło) --purple-300 lub --gold-400 --gold-400 (kropka)
Focus Pierścień --gold-400 z offsetem 2px
2.6 Toggle Switch
Właściwość Wartość
Tor (Off) #002E2E, obramowanie 1px solid --teal-600
Suwak (Off) --teal-600, pozycja lewo
Tor (On) --purple-300
Suwak (On) #FFFFFF, pozycja prawo
Animacja --ease-spring, efekt "rozciągania" suwaka
---
3. System Awatarów (Avatars)
Zgodnie z dokumentem Zaawansowana Inżynieria Stanów Ładowania: ... System "Avatary &
Badge" (str. 130-139).
3.1 Wymiary i Skalowanie
Rozmiar Wymiar (px) Zastosowanie Odznaka (Teoretycznie 20%) Fizyczna Rekomendacja
Odznaki
XS 24px Gęste listy 4.8px Min. 8px (wymuszone)
S 32px Komentarze, czat 6.4px 10px
M 64px Karty profilowe 12.8px 16px
L 100px Nagłówki mobilne 20px 24px
XL 150px Profil główny 30px 32px
3.2 Stylizacja
Właściwość Wartość
Kształt Zawsze okrągłe (border-radius: 50%)
Obramowanie 2px solid --bg-surface-base (dla odcięcia od tła)
Tło domyślne (Inicjały) linear-gradient(135deg, --gold-400 0%, --purple-400 100%)
Tekst (Inicjały) --text-primary, font-weight: 700, text-shadow: 0 1px 2px rgba(0,0,0,0.3)
Odznaka (Verified) --gold-400 z białą fajką (SVG)
Odznaka (Online) --success-base
Odznaka (Top Fan) Tarcza (SVG) w kolorze rubinowym lub fioletowym3.3 Pozycjonowanie Odznaki (Wycięcie - Cutout)
Odznaka umieszczona w prawym dolnym rogu (bottom: 7.3%, right: 7.3%). Aby uniknąć
brzydkiego obramowania, stosujemy CSS Masking:
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
⏭️ 🐋.
🧬 Krok 3: Specyfikacja Molekuł i Organizmów
1. System Kart (Cards)
Zgodnie z dokumentem Architektura Systemów Designu w Środowisku Web3: Kompleksowa
Analiza Uniwersalnego Komponentu Karty (str. 66-75).
1.1 Wspólne Parametry Bazowe
Właściwość Wartość Uwagi
Tło --bg-surface-base (--teal-800)
Padding 24px Zwiększony dla "oddechu" w Dark Mode
Border Radius 12px "Friendly Modern"
Border 1px solid rgba(255, 255, 255, 0.05) Opcjonalnie, dla definicji krawędzi
Cień (Spoczynek) --shadow-1
Cień (Hover) --shadow-2 Dodatkowo 0 0 10px rgba(252, 194, 1, 0.1) (złota poświata)
Transform (Hover) translateY(-6px)
Animacja --ease-standard Czas 200ms
1.2 Warianty Funkcjonalne
Wariant Specyfika Kluczowe ElementyTwórcy (Creator) Awatar 64px, nazwa, handle, statystyki Złoty checkmark (Verified), przycisk
"Obserwuj"
Statystyk (Statistics) Duża liczba (KPI), delta zmiany, Sparkline Wykres liniowy w kolorze
--gold-400
Powiadomień (Notification) Ikona kontekstu, tytuł, opis, timestamp Stan nieprzeczytany: tło
--bg-surface-elevated (--teal-700)
NFT (Digital Asset) Obraz 1:1, tytuł, cena, rzadkość Cena w --gold-400, rzadkość jako chip
(Fiolet)
1.3 Siatka Kart (Grid Layout)
Właściwość Wartość
Kontener display: grid
Kolumny grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))
Odstęp gap: 24px
---
2. System Modali i Szuflad (Modal & Bottom Sheet)
Zgodnie z dokumentem System Modali i Dialogów (Overlay Architecture) (str. 78-82) oraz
Architektura Ciemnego Trybu... System Dropdownów i Menu (str. 95-98).
2.1 Wspólne Parametry (Modal Desktop)
Właściwość Wartość
Szerokość maks. 600px (dla formularzy), 400px (dla potwierdzeń)
Tło --bg-surface-modal (--teal-800)
Border Radius 16px
Padding 24px
Cień --shadow-modal (0 24px 48px -12px rgba(0,0,0,0.7))
Border 1px solid rgba(255, 255, 255, 0.05)
Backdrop rgba(0, 31, 31, 0.85) + backdrop-filter: blur(4px)
Z-Index --z-modal (1000)
Nagłówek Mukta Malar Bold, 24px, #FFFFFF lub --gold-400
Przycisk Zamknięcia Ikona X (24px), obszar 44x44px, kolor --text-tertiary, hover --text-primary
2.2 Wariant Mobilny (Bottom Sheet)
Właściwość Wartość
Aktywacja Poniżej 640px (sm)
Pozycja fixed; bottom: 0; left: 0; right: 0
Wysokość 85% rzutni
Border Radius 16px 16px 0 0Uchwyt (Grip) 40x4px, --border-subtle, wyśrodkowany u góry
Zamknięcie Swipe-down, przycisk X
Animacja Wejścia slide-up, 400ms, --ease-enter
2.3 Animacje
Stan Animacja
Wejście fade-in (backdrop) + slide-down (modal), 400ms, --ease-enter
Wyjście fade-out, 200ms
---
3. System Dymków i Popoverów (Tooltip & Popover)
Zgodnie z dokumentem System Mikrointerakcji: Architektura, Design i Implementacja Wzorców
"Dymków" (str. 120-129).
3.1 Tooltip (Dymek Informacyjny)
Właściwość Wartość
Rola Etykietowanie (tylko tekst, max 2 linie)
Tło rgba(0, 47, 47, 0.9) (#002F2F z 90% opacity)
Tekst --text-primary, 14px
Padding 8px 12px
Border Radius 6px
Cień 0px 4px 16px rgba(0,0,0, 0.5)
Strzałka SVG w kolorze tła
Opóźnienie pojawienia 500ms (Hover Intent)
Z-Index --z-tooltip (1500)
Wyzwalacz (Mobile) Tapnięcie (Toggletip)
3.2 Popover (Dymek Akcji)
Właściwość Wartość
Rola Kontener interaktywny (przyciski, linki, dłuższe teksty)
Tło / Cień Jak Tooltip, ale z większym --shadow-modal
Padding 16px
Wyzwalacz Kliknięcie
Zamknięcie Click outside, Escape
Krytyczne dla dostępności: Tooltip używa role="tooltip" i aria-describedby. Popover używa
role="dialog".
---4. System Powiadomień (Toast / Snackbar)
Zgodnie z dokumentem Architektura i Projektowanie Systemu Powiadomień Tymczasowych
(Toast) (str. 99-107).
4.1 Parametry Bazowe
Właściwość Wartość
Tło #002F2F
Tekst --text-primary (#F1F5F9)
Padding 16px
Border Radius 12px
Cień 0px 8px 24px -4px rgba(0, 0, 0, 0.6)
Border 1px solid rgba(255, 255, 255, 0.1)
Czas wyświetlania 4 sekundy (pauza na hover)
Z-Index --z-toast (9999)
Pozycja (Desktop) Prawy dolny róg (bottom: 24px; right: 24px)
Pozycja (Mobile) Góra (top: 24px; left: 24px; right: 24px) z env(safe-area-inset-top)
Animacja Wejścia slide-in, 400ms, --ease-spring
Zamknięcie Swipe (gest), Escape, kliknięcie X
4.2 Warianty Kolorystyczne (Akcenty)
Typ Kolor Ikony / Paska Bocznego Przykład HEX
Sukces Szmaragd / Mięta #34D399
Błąd Koral / Jasna Malina #F43F5E
Informacja Fiolet #A78BFA
Ostrzeżenie Bursztyn #FBBF24
⚠️ Krytyczne dla dostępności: role="alert" tylko dla błędów i ostrzeżeń. Dla Sukcesu i Info
używaj role="status".
---
5. Stany Ładowania (Spinner & Skeleton)
Zgodnie z dokumentem Zaawansowana Inżynieria Stanów Ładowania (str. 108-119).
5.1 Spinner
Rozmiar Wymiar CSS Grubość obrysu (SVG) Zastosowanie
Mały (S) 24px 4.5px Przyciski, inputy
Średni (M) 48px 3.5px Karty, modaleDuży (L) 72px 3.0px Pełny ekran
Właściwość Wartość
Kolor Gradient linear-gradient(135deg, #FFD700 0%, #800080 100%)
Animacja rotate (liniowa) + dash (ease-in-out), czas 1.5s - 2s
5.2 Skeleton Screen
Właściwość Wartość
Tło Bazowe --teal-800 (#003737)
Kolor "Shimmer" --teal-700 (#004545)
Border Radius 4px (tekst), 8px (karty), 50% (awatary)
Animacja shimmer, 1.5s, linear, infinite
Metoda transform: translateX() na pseudoelemencie (GPU)
Przykład Shimmer (CSS):
```css
.skeleton {
background: linear-gradient(
110deg,
var(--teal-800) 0%,
var(--teal-700) 40%,
var(--teal-800) 100%
);
background-size: 200% 100%;
animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
0% { background-position: 200% 0; }
100% { background-position: -200% 0; }
}
```
---
⏭️ 🐋
🧬 Krok 4: Widoki Specjalistyczne – Layouty i Mechanika
1. Publiczny Profil Twórcy (Creator Profile View)
Zgodnie z dokumentem tech_Profil_twórcy.pdf (str. 1-13).1.1 Layout Desktop (≥1024px)
Właściwość Lewa Kolumna (Narracyjna) Prawa Kolumna (Transakcyjna)
Szerokość 60% - 70% 30% - 40%
Zawartość Hero, Bio, Ściana Fanów (Masonry), Ostatnie Wsparcia (Live Ticker) Panel Płatności
"Wesprzyj", Karty Subskrypcji, Statystyki
Zachowanie Swobodne przewijanie position: sticky; top: 24px
Odstęp (Gap) 24px
Psychologia: Panel płatności pozostaje w polu widzenia podczas przewijania długiej Ściany
Fanów (efekt czystej ekspozycji).
1.2 Layout Mobilny (<640px)
Właściwość Wartość
Struktura Linearyzacja pionowa: Hero ➔ Bio ➔ Masonry ➔ Ostatnie Wsparcia
Panel Transakcyjny Redukcja do Sticky Bottom Bar
Wysokość Paska 72px
Z-Index Paska --z-fab (200)
Styl Paska --glass-overlay, --glass-blur, --glass-border
Zapobieganie Okluzji padding-bottom: calc(72px + env(safe-area-inset-bottom)) na <main>
1.3 Ściana Fanów (Masonry Grid)
Właściwość Wartość
Typ Układu Masonry (kaskadowy)
Biblioteka @tanstack/react-virtual + własna logika miernicza (TanStack Virtualizer)
Kolumny Desktop: 3, Tablet: 2, Mobile: 1
Odstęp (Gap) 16px
Fallback grid-template-rows: masonry (eksperymentalne)
Wydajność Renderowanie tylko elementów w viewporcie + bufor
1.4 Live Ticker (Ostatnie Wsparcia)
Właściwość Wartość
Limit wpisów 10
Technologia Server-Sent Events (SSE) + Redis Pub/Sub
Animacja Wejścia fade-in-up, 0.3s, --ease-enter
Podświetlenie Nowego --success-light przez 2s, potem powrót do --bg-surface-base
---
2. Panel Fana (Fan Dashboard)Zgodnie z dokumentem tech_fan_profil.pdf (str. 1-13).
2.1 Layout Desktop (≥1024px)
Właściwość Wartość
Struktura Asymetryczny model dwukolumnowy
Sidebar (Lewy) Szerokość 200px, position: sticky; top: 0
Sidebar Zawartość Awatar (48px), Nazwa, Menu (Dashboard, Moi twórcy, Historia, Moje
odznaki, Ustawienia), Przycisk "Zostań twórcą" (--gold-400)
Topbar Powitanie, Awatar miniaturowy, Powiadomienia
Obszar Główny Dynamiczne widoki ładowane asynchronicznie
2.2 Layout Mobilny (<640px)
Właściwość Wartość
Nawigacja Sticky Bottom Bar (5 ikon: Dom, Twórcy, Historia, Odznaki, Więcej)
Menu Boczne Hamburger Drawer (wysuwane z lewej) lub Bottom Sheet dla "Więcej"
Zapobieganie Okluzji padding-bottom: calc(64px + env(safe-area-inset-bottom)) na kontenerze
treści
2.3 Galeria Odznak NFT (Bento Grid)
Właściwość Wartość
Typ Siatki CSS Grid: grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
Odstęp (Gap) 20px
Miniatura 160x160px, border-radius: 12px, --shadow-1
Hover translateY(-2px), --shadow-2, overlay z nazwą i ikoną lupy
Rzadkość (Badge) Brąz (Common), Srebro (Uncommon), Złoto (Rare), Fiolet (Legendary)
Filtrowanie Dropdowny: wg twórcy, poziomu rzadkości. Sortowanie: data, kwota, alfabetycznie
Modal Detali --glass-overlay, --glass-blur, grafika 400x400px, metadane on-chain, link do
explorera
2.4 Udostępnianie Społecznościowe
Właściwość Wartość
Przycisk "Udostępnij na X / Twitterze"
Generowanie Obrazu Dynamiczny OG Image przez Satori Engine (Vercel @vercel/og)
Endpoint /api/og/badge?tokenId=...
---
3. Katalog Twórców (Explore / Discovery View)
Zgodnie z dokumentem tech_katalog_3part.pdf (str. 18-22).3.1 Layout Desktop (≥1024px)
Właściwość Wartość
Nagłówek H1, masywne pole wyszukiwania
Szybkie Filtry Horyzontalne chipy kategorii (overflow-x auto)
Zaawansowane Filtry Rozwijany panel (dropdown) z sortowaniem, językiem, weryfikacją
Siatka Kart display: grid, grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)), gap: 24px
Nawigacja Paginacja (numery stron) – brak Infinite Scroll dla SEO
3.2 Layout Mobilny (<640px)
Właściwość Wartość
Szybkie Filtry Poziomy pasek przewijany (swipe)
Zaawansowane Filtry Bottom Sheet wywoływany przyciskiem "Filtry"
Siatka Kart 2 kolumny
Paginacja Przyciski "Poprzednia / Następna" + wskaźnik pozycji
3.3 Mechanika Wyszukiwania i Filtracji
Właściwość Wartość
Debounce 300ms na polu wyszukiwania
Stan Filtrów Przechowywany w URL Query Params (?category=music&sort=popular)
Aktualizacja router.push(url, { scroll: false })
Korzyść Deep linkowanie, możliwość udostępnienia przefiltrowanego widoku
3.4 Karta Twórcy (CreatorCard)
Właściwość Wartość
Wysokość Stała, ok. 320px
Awatar 96x96px
Nazwa H4, line-clamp: 2
Weryfikacja --gold-400 checkmark
ENS Resolution Wywołanie getEnsName z pakietu viem (z normalizacją UTS-46)
Social Proof Sumaryczna kwota przychodów w USDC
Hover translateY(-4px), cień z --shadow-1 na --shadow-2
Przycisk "Zobacz profil" (--gold-400 na hover)
---
⏭️ 🐋
🧬 Krok 5: Specyfikacja Logiki Web3 i Płatności1. Architektura Modala Płatności (Payment Modal)
Zgodnie z dokumentem tech_modal.pdf (str. 1-13) oraz Master Plan UI (str. 1-12).
1.1 Struktura Krok po Kroku (Wizard)
Krok Nazwa Zawartość / Mechanika
0 Kontekst Tytuł "Wesprzyj [Nazwa]", Awatar twórcy 32x32px, przycisk X
1 Kwota Przyciski szybkie ($1, $5, $10, $20, $50) + Pole własne (walidacja min/max). Live
conversion na USDC/ETH (oracle co 30s). font-feature-settings: "tnum"
2 Metoda Akordeon z 3 opcjami: Karta (Circle), Web3 Wallet, Saldo TipJar
3a Formularz Karty <iframe> Circle Elements (PCI DSS). Stylowanie przez style object.
Checkbox "Zapisz kartę".
3b Formularz Web3 Przycisk "Połącz portfel" (RainbowKit/Web3Modal). Stan połączony:
skrócony adres 0x12...89AB lub ENS (fan.eth), saldo USDC.
3c Saldo TipJar Wyświetlenie dostępnego salda. Przycisk "Zapłać z salda".
4 Opcje Dodatkowe Akordeon: Wiadomość (textarea, limit 200 znaków, DOMPurify), Checkbox
"Proof of Support NFT" (domyślnie zaznaczony), Checkbox "Anonimowo"
5 Podsumowanie Tabela: Kwota + Opłata platformy (0%) + Gas Fee (szacowane). Przycisk
finalny --gold-400. Klauzula MiCA (microcopy).
1.2 Wybór Sieci (Network Warning)
Właściwość Wartość
Obsługiwane sieci Polygon (chainId: 0x89), Ethereum Mainnet (0x1) – z priorytetem L2
Wykrywanie wagmi useChainId
Nieprawidłowa sieć Żółty pasek (--warning-base): "Zmień sieć na Polygon, aby kontynuować."
Akcja Przycisk "Zmień sieć" → window.ethereum.request({ method:
'wallet_switchEthereumChain', params: [{ chainId: '0x89' }] })
---
2. Stany Transakcji Web3 (Transaction Lifecycle)
Zgodnie z tech_modal.pdf (str. 7-8).
Stan Nazwa UI Zachowanie Modala Komunikat / Wizualizacja
1 Oczekiwanie na podpis Zablokowany (nie można zamknąć). Przycisk: Spinner + "Oczekiwanie
na portfel...". "Potwierdź transakcję w swoim portfelu."
2 Wysłano (Pending) Odblokowany (można zamknąć, proces trwa w tle). Spinner zegara +
"Transakcja wysłana. Oczekiwanie na potwierdzenie sieci..." + Link do Polygonscan.
3 Sukces (Confirmed) Transformacja widoku. Zielony checkmark + "Transakcja zatwierdzona!
" + Haptyk (sukces). Przyciski: "Zamknij", "Udostępnij".
🎉4 Błąd (Error) Podświetlenie na czerwono (--error-dark). Przycisk "Spróbuj ponownie".
Mapowanie kodu RPC na ludzki język: "Odrzucono w portfelu", "Niewystarczające środki na
gaz". Nigdy surowy kod błędu.
---
3. Abstrakcja Konta (ERC-4337) i Paymaster
Zgodnie z tech_modal.pdf (str. 9) i tech_fan_profil.pdf (str. 7).
Komponent Opis Implementacja
Smart Account Portfel tworzony automatycznie przy rejestracji, kontrolowany przez logowanie
Web2 (Passkeys). @alchemy/aa-core, @account-abstraction/sdk
UserOperation Obiekt zamiast tradycyjnej transakcji. Pozwala na batchowanie (np. approve +
transfer w jednym kliku). Generowanie po stronie klienta, podpis, wysyłka do Bundlera.
Paymaster Kontrakt sponsorujący opłaty za gaz. Weryfikacja paymasterAndData w UserOp.
UX dla użytkownika Pole "Gas Fee" w podsumowaniu znika lub wyświetla się jako $0.00
(sponsorowane przez TipJar+). Zielony komunikat --success-base.
Fallback Jeśli Paymaster niedostępny, użytkownik widzi szacowany koszt gazu w USD. Wycena
przez oracle gazowe.
---
4. Wyświetlanie Adresów i ENS
Zgodnie z Master Plan UI (str. 9) i tech_katalog_3part.pdf (str. 20).
Właściwość Wartość
Priorytet 1. ENS Name (np. vitalik.eth). 2. Skrócony adres (0x12...89AB).
Biblioteka viem
Metody getEnsName({ address }), getEnsAddress({ name })
Normalizacja normalize(name) (UTS-46) przed każdym zapytaniem – ochrona przed
homografami.
UI Wyświetlanie pełnej nazwy ENS. Przy skróconym adresie: przycisk "Kopiuj" + Toast
"Skopiowano!".
Modal QR Na mobile: możliwość wyświetlenia kodu QR z pełnym adresem do zeskanowania
przez inną aplikację portfelową.
---
5. Zgodność z MiCA (Markets in Crypto-Assets)
Zgodnie z tech_modal.pdf (str. 2) i tech_knowledge.pdf (str. 3-4).Wymóg MiCA Implementacja w UI
Przejrzystość kosztów Tabela podsumowująca przed kliknięciem "Wyślij": Kwota + Opłata
platformy + Opłata sieciowa (Gas).
Zakaz "Dark Patterns" Przycisk anulowania subskrypcji jest zawsze dostępny i czytelny (np. w
Panelu Fana → Moje subskrypcje → Zarządzaj → Anuluj).
Stablecoiny (EMT/ART) Komunikat w Tooltipie przy saldzie USDC: "Stablecoiny w TipJar+ służą
wyłącznie do płatności. Nie są oprocentowane."
Białe Księgi Link w stopce modala lub w Ustawieniach: "Dokumentacja aktywów (White Paper)".
Otwiera PDF lub stronę z iXBRL.
---
6. Checklista Implementacyjna Modala Płatności
Atom / Molekuła Kluczowe Właściwości
PaymentModal isOpen, onClose, creatorId, zarządzanie backdrop i scroll-lock
AmountSelector Presety, customAmount, walidacja min/max, tnum
MethodCard isActive, ikona, tytuł, onClick
CreditCardForm Wrapper dla @circle/elements-sdk. Dynamiczne stylowanie Dark Mode.
WalletConnectButton useConnect, useAccount (wagmi). Wyświetlanie ENS / skróconego
adresu.
NetworkWarning useChainId, useSwitchChain. Warunkowe renderowanie.
GasFeeDisplay Pobieranie estymacji z viem. Wyświetlanie w USD. Ukrywane przy
Paymasterze.
TransactionStatus useWaitForTransactionReceipt. Mapowanie status na widoki (Pending,
Success, Error).
AdditionalOptionsAccordion Checkboxy (NFT, Anonimo), Textarea (wiadomość).
---
🏁 Podsumowanie Finałowe
1. Fundamenty – Wszystkie tokeny CSS, cienie, animacje, breakpointy.
2. Atomy – Przyciski, inputy, awatary z matematyką odznak.
3. Molekuły – Karty, modale, tooltipy, toasty, stany ładowania.
4. Widoki – Profil Twórcy (Masonry + Sticky), Panel Fana (Galeria NFT), Katalog (Grid +
Paginacja).
5. Logika Web3 – Modal Płatności, Stany Transakcji, Paymaster, ENS, MiCA.
🐋.
🧬 Krok 6: Specyfikacja Centrum Wiedzy (Learn)1. Architektura Layoutu
1.1 Desktop (≥1024px) – Dwukolumnowy z Lepką Nawigacją
Właściwość Lewa Kolumna (Nawigacja) Prawa Kolumna (Treść)
Szerokość 30% (ok. 280px – 320px) 70%
Zawartość Wyszukiwarka, Drzewo Kategorii (Akordeon), Popularne Artykuły, Link do Wsparcia
Widok kategorii / Lista artykułów / Treść artykułu
Zachowanie position: sticky; top: 24px Swobodne przewijanie
Odstęp (Gap) 32px – 48px
1.2 Mobilny (<640px) – Linearyzacja
Właściwość Wartość
Struktura Wyszukiwarka (pełna szerokość) → Akordeon Kategorii → Treść
Nawigacja powrotna Breadcrumbs lub przycisk "Wstecz" (zamiast bocznego menu)
Zapobieganie Okluzji padding-bottom: calc(64px + env(safe-area-inset-bottom)) na kontenerze
treści
---
2. Komponenty Nawigacyjne
2.1 Wyszukiwarka
Właściwość Wartość
Placeholder "Czego szukasz? (np. jak wypłacić środki)"
Debounce 300ms
Silnik (start) Flexsearch – indeks JSON pobierany raz, wyszukiwanie po stronie klienta
Silnik (skala >1000) Pagefind – indeks dzielony na chunki, lazy loading
Szerokość (desktop) 100% lewej kolumny
Wysokość 48px
Tło --bg-surface-base (--teal-800)
Obramowanie 1px solid --border-subtle (--teal-700)
Border Radius 6px
Focus --gold-400 z poświatą
2.2 Drzewo Kategorii (CategoryTree)
Właściwość Desktop Mobile
Struktura Lista z ikonami folderów, podkategorie rozwijane (akordeon) Akordeon (rozwijane
sekcje)
Aktywna kategoria Podświetlenie --gold-400 (tekst + lewy border 3px) To samo
Odstępy padding: 8px 12px padding: 12px 16pxIkony 20x20px, kolor --text-tertiary To samo
Hover Tło --bg-surface-elevated (--teal-700) To samo
---
3. Widok Artykułu
3.1 Nagłówek i Metadane
Element Styl
Breadcrumbs Nad tytułem, font 14px, kolor --text-tertiary, interaktywne
Tytuł (H1) Mukta Malar 600, --fs-h1, kolor --text-primary
Data publikacji / aktualizacji IBM Plex Sans 400, 14px, --text-tertiary
Czas czytania "X min", generowany automatycznie
Autor "Zespół TipJar+" lub imię eksperta
3.2 Treść Główna
Właściwość Wartość
Parser react-markdown z pluginami
Maks. szerokość tekstu --article-max-width: 720px (dla czytelności)
Font IBM Plex Sans 400, --fs-body-m (16px)
Interlinia 1.7
Kolor tekstu --text-secondary (#D6EBEB, nie ostra biel)
Nagłówki (H2, H3) Mukta Malar 600/500, --fs-h2 / --fs-h3
Linki w tekście Kolor --gold-400, underline na hover
Obrazy Responsywne, border-radius: 8px, next/image
Embed YouTube Iframe responsywny (proporcje 16:9), border-radius: 8px
Bezpieczeństwo DOMPurify przed renderowaniem
3.3 Callout Blocks (Markdown)
Składnia Styl
:::warning Tło rgba(255, 145, 0, 0.1), obramowanie --warning-base, ikona
:::tip Tło rgba(0, 230, 118, 0.1), obramowanie --success-base, ikona
:::info Tło rgba(102, 217, 232, 0.1), obramowanie --info-base, ikona
:::danger Tło rgba(255, 82, 82, 0.1), obramowanie --error-base, ikona
💡
ℹ️
🔥
⚠️
3.4 Spis Treści (Table of Contents)
Właściwość Wartość
Generowanie Automatyczne z nagłówków H2/H3
Pozycja (desktop) Sticky w prawej części lewej kolumny lub pod nagłówkiem
Aktywny nagłówek Podświetlenie --gold-400 (Intersection Observer)Kliknięcie scroll-behavior: smooth (dla prefers-reduced-motion – natychmiastowy skok)
Z-index --z-elevated (10)
3.5 Glossary Tooltips (Słowniczek)
Właściwość Wartość
Wyzwalacz Terminy techniczne w <abbr> z przerywanym podkreśleniem --gold-400
Zawartość Krótka definicja + link do pełnego artykułu
Opóźnienie 500ms (Hover Intent)
Pozycjonowanie Dynamiczne (biblioteka kalkulująca zderzenia) – unikanie viewport clipping
Styl Jak Tooltip (Krok 3, sekcja 3.1)
3.6 Helpfulness Buttons (Feedback)
Właściwość Wartość
Pytanie "Czy ten artykuł był pomocny?"
Przyciski "Tak" / "Nie" (Secondary)
Negatywna opinia Rozwija textarea z animacją --ease-spring
Placeholder "Co moglibyśmy poprawić?"
Wysyłka Anonimowa, asynchroniczna
---
4. Stany Puste i Ładowania
Stan Zachowanie
Brak wyników wyszukiwania Ilustracja + komunikat + sugerowane popularne wyszukiwania
Ładowanie artykułu Skeleton loader (pulsujące bloki tekstu, shimmer --teal-700 → --teal-800)
Ładowanie listy Skeleton cards (3-4 sztuki)
Błąd sieci Komunikat --error-base + przycisk "Spróbuj ponownie"
---
5. Integracje Techniczne
Obszar Rozwiązanie
Renderowanie SSG + ISR (generateStaticParams, revalidate: 3600 lub on-demand)
OG Image @vercel/og (Satori) – /api/og/article?title=...
Edukacja Web3 Artykuły o ERC-4337 (inteligentne portfele, Paymaster, Social Recovery)
MiCA Compliance Repozytorium White Papers (iXBRL), bloki ostrzegawcze w artykułach
---
6. Checklista Komponentów Centrum WiedzyAtom / Molekuła Kluczowe Właściwości
SearchInput Debounce 300ms, placeholder instruktażowy, Flexsearch
CategoryTree Akordeon (desktop: rozwinięte, mobile: zwinięte), aktywny marker --gold-400
ArticleCard Tytuł, opis line-clamp: 2, data, tag kategorii, przycisk "Czytaj więcej"
Breadcrumbs Ścieżka: Centrum Wiedzy > Kategoria > Artykuł
ArticleView react-markdown, --article-max-width: 720px, line-height: 1.7
CalloutBlock Mapowanie :::type na semantyczne komponenty
TableOfContents Generowany z H2/H3, sticky, Intersection Observer
GlossaryTooltip <abbr> z data-tooltip, dynamiczne pozycjonowanie
HelpfulnessButtons Tak/Nie, textarea przy "Nie"
EmptyState Ilustracja + komunikat + sugerowane linki
SkeletonArticle Shimmer na blokach tekstu
---
🐋.
##
🧬 Krok 1: Fundamenty Systemu (Globalne Tokeny CSS)
### 1. Paleta Prymitywna (Primitive Tokens) – Kolory Bazowe
#### Skala Ciemnego Turkusu (Primary Teal Base)
| Token | HEX | HSL | Zastosowanie (Kontekst) |
| :--- | :--- | :--- | :--- |
| `--teal-50` | `#E0F2F2` | `180°, 40%, 95%` | Tekst na ciemnym tle (zastępuje biel), tła w trybie
jasnym |
| `--teal-100` | `#B3D9D9` | `180°, 35%, 78%` | Subtelne akcenty, ikony nieaktywne, obrysy
pomocnicze |
| `--teal-200` | `#80BFBF` | `180°, 38%, 62%` | Obrysy pól formularzy (default) |
| `--teal-300` | `#4DA6A6` | `180°, 38%, 48%` | Elementy graficzne, drugorzędne przyciski |
| `--teal-400` | `#268C8C` | `180°, 57%, 35%` | Stany `:hover` dla ciemniejszych elementów,
fokus |
| `--teal-500` | `#007373` | `180°, 100%, 22%` | Interaktywne tła kart, nagłówki sekcji |
| `--teal-600` | `#005959` | `180°, 100%, 17%` | `:hover` dla elementów o wadze 500 |
| `--teal-700` | `#004545` | `180°, 100%, 14%` | **Tło "Elevated"** (karty na kartach), obrysy |
| `--teal-800` | `#003737` | `180°, 100%, 11%` | **Bazowe tło aplikacji (Dark Mode)** |
| `--teal-900` | `#001F1F` | `180°, 100%, 6%` | **Globalne tło `<body>`**, najgłębsze cienie |
#### Skala Złota (Primary Action Gold)
| Token | HEX | Zastosowanie (Kontekst) |
| :--- | :--- | :--- || `--gold-100` | `#FFF9C4` | Tła powiadomień typu Toast, rzadko używane |
| `--gold-200` | `#FFF176` | Elementy dekoracyjne |
| `--gold-300` | `#FFEA00` | Stan `:hover` dla złotych przycisków (rozjaśnienie) |
| `--gold-400` | `#FFD700` | **Główny Akcent (CTA)**. Przyciski, ikony, aktywne linki |
| `--gold-500` | `#FFC107` | Stan `:active` dla złotych przycisków (przyciemnienie) |
| `--gold-600` | `#FFAB00` | Warianty ciemniejsze (rzadko w UI) |
| `--gold-700` | `#FF8F00` | Warianty ciemniejsze (rzadko w UI) |
#### Skala Fioletu (Secondary Accent Purple)
| Token | HEX | Zastosowanie (Kontekst) |
| :--- | :--- | :--- |
| `--purple-100` | `#E0B3FF` | Tła zaznaczonych elementów (selected state) |
| `--purple-200` | `#C27AFF` | Linki w tekście, pierścień fokusu |
| `--purple-300` | `#9D4EDD` | **Bazowy Akcent Pomocniczy**. Ikony nawigacji, Toggle, Focus
Ring |
| `--purple-400` | `#7B2CBF` | Stan `:hover` dla elementów fioletowych |
| `--purple-500` | `#5A189A` | Ciemniejsze elementy brandowe, obrysy |
#### Paleta Walidacyjna (Semantic Colors)
| Token | HEX | Zastosowanie (Kontekst) |
| :--- | :--- | :--- |
| `--error-light` | `#FFB4AB` | Tekst błędu na ciemnym tle |
| `--error-base` | `#FF5252` | Obramowania pól z błędem, ikony błędu |
| `--error-dark` | `#3D1010` | Tło dla bloków/alertów błędów |
| `--success-light` | `#69F0AE` | Tekst sukcesu na ciemnym tle |
| `--success-base` | `#00E676` | Ikony sukcesu, obramowania |
| `--success-dark` | `#004D26` | Tło dla alertów sukcesu |
| `--warning-base` | `#FF9100` | Ostrzeżenia (sieć, brak środków) |
| `--info-base` | `#66D9E8` | Toast informacyjny, status "Pending" |
---
### 2. Tokeny Semantyczne (Semantic Tokens) – Jak Tego Używać
| Token Semantyczny | Wartość (Dark Mode) | Zastosowanie |
| :--- | :--- | :--- |
| `--bg-app-global` | `var(--teal-900)` | **Tło `<body>`**. Nigdy nie używaj `#000000`. |
| `--bg-surface-base` | `var(--teal-800)` | **Tła kart**, dropdownów, kontenerów |
| `--bg-surface-elevated` | `var(--teal-700)` | Tła elementów `:hover`, aktywnych wierszy tabel |
| `--bg-surface-modal` | `var(--teal-800)` | Kontenery okien modalnych |
| `--text-primary` | `#FFFFFF` | Nagłówki, główne wartości liczbowe |
| `--text-secondary` | `#D6EBEB` | Tekst paragrafowy, etykiety (odcień 85% bieli) |
| `--text-tertiary` | `#5C7A7A` | Placeholdery, dane nieaktywne, timestampy |
| `--border-subtle` | `var(--teal-700)` | Obrysy kart, ramki inputów (domyślne) || `--border-focus` | `var(--purple-300)` | **Pierścień nawigacji klawiaturowej** |
| `--action-primary-bg` | `var(--gold-400)` | Tło głównych przycisków CTA |
| `--action-primary-text` | `var(--teal-800)` | **Kolor tekstu na złotym tle** (
Krytyczne dla
WCAG) |
| `--action-secondary-bg` | `var(--purple-300)` | Tło przycisków drugorzędnych |
⚠️
---
### 3. System Typograficzny (Fluid Typography)
| Token | Wartość `clamp()` / Stała | Krój | Zastosowanie |
| :--- | :--- | :--- | :--- |
| `--font-heading` | `'Mukta Malar', sans-serif` | - | Nagłówki, Przyciski |
| `--font-body` | `'IBM Plex Sans', sans-serif` | - | Tekst ciągły, tabele, metadane |
| `--fs-display` | `clamp(2.5rem, 4vw + 1.5rem, 4rem)` | Mukta 700 | Hero, duże liczby |
| `--fs-h1` | `clamp(2rem, 1.5vw + 1.6rem, 2.5rem)` | Mukta 600 | Tytuły stron |
| `--fs-h2` | `clamp(1.75rem, 1vw + 1.5rem, 2rem)` | Mukta 600 | Nagłówki sekcji |
| `--fs-h3` | `clamp(1.5rem, 0.5vw + 1.3rem, 1.75rem)` | Mukta 500 | Tytuły kart |
| `--fs-body-m` | `1rem` (16px) | IBM Plex 400 | Standardowy tekst |
| `--fs-caption` | `0.75rem` (12px) | IBM Plex 500 | Tekst prawny, statusy |
| `--fs-button` | `1rem` | Mukta 600 | Tekst na przyciskach |
⚠️
**
Reguła Krytyczna dla Kwot:** Każdy element wyświetlający cyfry (kwoty, daty) musi mieć:
```css
font-feature-settings: "tnum";
```
Zapobiega to "skakaniu" layoutu przy dynamicznej zmianie liczb.
---
4. System Głębi i Fizyki (Elevation & Motion)
Token Wartość Zastosowanie
--shadow-1 0 4px 6px -1px rgba(0, 0, 0, 0.5) Subtelne uniesienie kart
--shadow-2 0 10px 25px -5px rgba(0, 0, 0, 0.6) Stan :hover kart
--shadow-modal 0 24px 48px -12px rgba(0, 0, 0, 0.7) Modale
--glass-overlay rgba(0, 31, 31, 0.44) Warstwa tła pod rozmyciem
--glass-blur blur(20px) saturate(200%) Efekt matowego szkła
--glass-border 1px solid rgba(255, 255, 255, 0.125) Krawędź odcięcia dla Glass
Krzywe Animacji (Zakaz używania linear):
Token Wartość cubic-bezier Czas Zastosowanie--ease-standard (0.4, 0.0, 0.2, 1) 200ms Hover, focus
--ease-enter (0.16, 1, 0.3, 1) 300-400ms Modale, powiadomienia
--ease-spring (0.175, 0.885, 0.32, 1.275) 400ms FAB, Toggle Switch
---
5. System Warstw (Z-Index Stacking)
Token Wartość Zastosowanie
--z-base 0 Elementy statyczne
--z-elevated 10 Karty z :hover
--z-dropdown 100 Menu rozwijane
--z-fab 200 Pływający przycisk akcji, Sticky Bottom Bar
--z-backdrop 500 Tło modala
--z-modal 1000 Okno modalne
--z-tooltip 1500 Dymki (Tooltip/Popover)
--z-toast 9999 Powiadomienia Toast
---
6. Breakpointy Responsywne (Mobile-First)
Nazwa Min. Szerokość Zastosowanie
xs 320px Mikro urządzenia
sm 640px Punkt krytyczny: Modale -> Bottom Sheets
md 768px Tablety
lg 1024px Punkt krytyczny: Włączenie bocznej nawigacji na stałe
xl 1280px Duży Desktop
Safe Areas (Notch & Home Indicator):
Zawsze dodawaj do stałych elementów (np. bottom-bar):
```css
padding-bottom: calc(72px + env(safe-area-inset-bottom));
```
```
---
## Krok 2: Specyfikacja Atomów Bazowych
🧬
```markdown
##
Krok 2: Specyfikacja Atomów Bazowych### 1. System Przycisków (Buttons)
#### 1.1 Wymiary (Siatka 8-punktowa)
| Rozmiar | Wysokość | Padding X | Font Size | Ikona | Border Radius |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Large (L)** | `56px` | `32px` | `18px` | `24px` | `8px` |
| **Medium (M)** | `48px` | `24px` | `16px` | `20px` | `8px` |
| **Small (S)** | `40px` | `16px` | `14px` | `16px` | `8px` |
⚠️ **Obszar dotykowy:** Dla `Small` minimalny obszar kliknięcia to `44px` (realizowane przez
pseudoelement).
#### 1.2 Wariant: Primary (Złoty)
| Stan | Tło | Tekst | Obramowanie | Cień / Transform |
| :--- | :--- | :--- | :--- | :--- |
| **Default** | `--gold-400` | `--teal-800` | `none` | `--shadow-1` |
| **Hover** | `--gold-300` | `--teal-800` | `none` | `--shadow-2` |
| **Active** | `--gold-500` | `--teal-800` | `none` | `scale(0.98)`, `shadow-1` |
| **Focus** | `--gold-400` | `--teal-800` | `2px solid --purple-300` | `outline-offset: 2px` |
| **Disabled** | `#E0E0E0` (Szary) | `#9E9E9E` | `none` | `none` |
| **Loading** | `--gold-400` | Ukryty | `none` | Spinner SVG (kolor `--teal-800`) |
**Krytyczne WCAG:** Nigdy nie używaj białego tekstu na `--gold-400`. Kontrast `1.4:1` = FAIL.
Tekst musi być `--teal-800` (kontrast `11.2:1` = AAA).
#### 1.3 Wariant: Secondary (Fioletowy / Outline)
| Stan | Tło | Tekst / Obramowanie | Transform |
| :--- | :--- | :--- | :--- |
| **Default** | `transparent` | `--purple-300` (lub `--gold-400`) | `none` |
| **Hover** | `rgba(--purple-300, 0.1)` | `--purple-300` | `none` |
| **Active** | `rgba(--purple-300, 0.15)` | `--purple-300` | `scale(0.98)` |
| **Focus** | `transparent` | `--purple-300`, pierścień `--purple-300` | `outline-offset: 2px` |
#### 1.4 Wariant: Destructive (Czerwony / Usuwanie)
| Stan | Tło | Tekst / Obramowanie |
| :--- | :--- | :--- |
| **Default** | `transparent` lub `#FEECEB` | `#B00020` |
| **Hover** | `rgba(176, 0, 32, 0.05)` | `#B00020` |
| **Focus** | `transparent` | Pierścień `#B00020` |**Uwaga:** Nie używaj czystej czerwieni `#FF0000`. W trybie ciemnym powoduje wibrację
optyczną.
#### 1.5 Wariant: Floating Action Button (FAB)
| Właściwość | Wartość |
| :--- | :--- |
| **Wymiary** | `56x56px` (koło) |
| **Border Radius** | `50%` |
| **Z-Index** | `--z-fab` (200) |
| **Kolor** | `--gold-400` (tekst/ikona `--teal-800`) |
| **Zachowanie przy scrollu** | W dół: `translateY(150%) scale(0.9)`, W górę: `translateY(0)` |
| **Animacja** | `--ease-spring` |
---
### 2. System Pól Formularzy (Inputs, Textarea, Select)
#### 2.1 Wymiary i Bazowe Style
| Właściwość | Wartość |
| :--- | :--- |
| **Wysokość (Large)** | `56px` |
| **Wysokość (Standard)** | `48px` |
| **Padding X** | `16px` |
| **Border Radius** | `6px` |
| **Tło (Default)** | `--bg-surface-base` (`--teal-800`) |
| **Obramowanie (Default)** | `1px solid --border-subtle` (`--teal-700`) |
| **Tekst (Default)** | `--text-primary` (`#FFFFFF`) |
| **Placeholder** | `--text-tertiary` (`#5C7A7A`) |
#### 2.2 Stany Interakcji (Input)
| Stan | Obramowanie | Cień (Box-Shadow) | Etykieta (Label) |
| :--- | :--- | :--- | :--- |
| **Hover** | `--teal-600` | `none` | Bez zmian |
| **Focus (Złoty)** | `--gold-400` | `0 0 0 1px --gold-400, 0 0 0 4px rgba(255, 215, 0, 0.25)` |
Kolor `--gold-400`, `scale(0.75)`, przesunięta do góry |
| **Error** | `--error-base` | `0 0 0 4px rgba(255, 180, 171, 0.25)` | Kolor `--error-base` |
| **Success** | `--success-base` | `none` | Kolor `--success-base` |
| **Disabled** | `--teal-700` (przerywane) | `none` | Opacity `0.4` |**Walidacja:** Tekst błędu pod polem w kolorze `--error-base` (`#FFB4AB`). Dodatkowo
opcjonalna ikona wykrzyknika.
#### 2.3 Textarea
| Właściwość | Wartość |
| :--- | :--- |
| **Padding** | `16px` |
| **Resize** | `vertical` (tylko) |
| **Scrollbar** | Tor: `transparent`, Suwak: `--teal-600`, Hover: `--teal-500` |
#### 2.4 Select (Dropdown)
| Właściwość | Wartość |
| :--- | :--- |
| **Trigger** | Jak Input |
| **Ikona** | Chevron, obraca się o `180deg` przy otwarciu |
| **Menu (Tło)** | `--bg-surface-base` (`--teal-800`) |
| **Menu (Cień)** | `--shadow-modal` |
| **Opcja (Hover)** | Tło `--bg-surface-elevated` (`--teal-700`) |
| **Opcja (Selected)** | Tekst `--gold-400`, ikona "Check" |
| **Animacja** | `slideDownFade`, `200ms`, `cubic-bezier(0.2, 0, 0, 1)` |
#### 2.5 Checkbox & Radio
| Właściwość | Checkbox | Radio |
| :--- | :--- | :--- |
| **Wymiary** | `20x20px` | `20x20px` |
| **Border Radius** | `4px` | `50%` |
| **Obramowanie** | `2px solid --teal-600` | `2px solid --teal-600` |
| **Zaznaczony (Tło)** | `--purple-300` lub `--gold-400` | `--gold-400` (kropka) |
| **Focus** | Pierścień `--gold-400` z offsetem `2px` |
#### 2.6 Toggle Switch
| Właściwość | Wartość |
| :--- | :--- |
| **Tor (Off)** | `#002E2E`, obramowanie `1px solid --teal-600` |
| **Suwak (Off)** | `--teal-600`, pozycja lewo |
| **Tor (On)** | `--purple-300` |
| **Suwak (On)** | `#FFFFFF`, pozycja prawo |
| **Animacja** | `--ease-spring`, efekt "rozciągania" suwaka |
---### 3. System Awatarów (Avatars)
#### 3.1 Wymiary i Skalowanie
| Rozmiar | Wymiar (px) | Zastosowanie | Odznaka (Teoretycznie 20%) | Fizyczna
Rekomendacja Odznaki |
| :--- | :--- | :--- | :--- | :--- |
| **XS** | `24px` | Gęste listy | `4.8px` | **Min. 8px** (wymuszone) |
| **S** | `32px` | Komentarze, czat | `6.4px` | `10px` |
| **M** | `64px` | Karty profilowe | `12.8px` | `16px` |
| **L** | `100px` | Nagłówki mobilne | `20px` | `24px` |
| **XL** | `150px` | Profil główny | `30px` | `32px` |
#### 3.2 Stylizacja
| Właściwość | Wartość |
| :--- | :--- |
| **Kształt** | **Zawsze okrągłe** (`border-radius: 50%`) |
| **Obramowanie** | `2px solid --bg-surface-base` (dla odcięcia od tła) |
| **Tło domyślne (Inicjały)** | `linear-gradient(135deg, --gold-400 0%, --purple-400 100%)` |
| **Tekst (Inicjały)** | `--text-primary`, `font-weight: 700`, `text-shadow: 0 1px 2px rgba(0,0,0,0.3)`
|
| **Odznaka (Verified)** | `--gold-400` z białą fajką (SVG) |
| **Odznaka (Online)** | `--success-base` |
| **Odznaka (Top Fan)** | Tarcza (SVG) w kolorze rubinowym lub fioletowym |
#### 3.3 Pozycjonowanie Odznaki (Wycięcie - Cutout)
Odznaka umieszczona w prawym dolnym rogu (`bottom: 7.3%`, `right: 7.3%`). Aby uniknąć
brzydkiego obramowania, stosujemy **CSS Masking**:
```css
/* Wycięcie w awatarze pod odznakę */
-webkit-mask-image: radial-gradient(
circle at 85% 85%,
transparent calc(var(--badge-size) / 2 + 2px),
black calc(var(--badge-size) / 2 + 2.5px)
);
```
To zapewnia przezroczysty odstęp między awatarem a odznaką, niezależnie od tła strony.
```---
## Krok 3: Specyfikacja Molekuł i Organizmów
🧬
```markdown
##
Krok 3: Specyfikacja Molekuł i Organizmów
### 1. System Kart (Cards)
#### 1.1 Wspólne Parametry Bazowe
| Właściwość | Wartość | Uwagi |
| :--- | :--- | :--- |
| **Tło** | `--bg-surface-base` (`--teal-800`) | |
| **Padding** | `24px` | Zwiększony dla "oddechu" w Dark Mode |
| **Border Radius** | `12px` | "Friendly Modern" |
| **Border** | `1px solid rgba(255, 255, 255, 0.05)` | Opcjonalnie, dla definicji krawędzi |
| **Cień (Spoczynek)** | `--shadow-1` | |
| **Cień (Hover)** | `--shadow-2` | Dodatkowo `0 0 10px rgba(252, 194, 1, 0.1)` (złota poświata) |
| **Transform (Hover)** | `translateY(-6px)` | |
| **Animacja** | `--ease-standard` | Czas `200ms` |
#### 1.2 Warianty Funkcjonalne
| Wariant | Specyfika | Kluczowe Elementy |
| :--- | :--- | :--- |
| **Twórcy (Creator)** | Awatar `64px`, nazwa, handle, statystyki | Złoty checkmark (Verified),
przycisk "Obserwuj" |
| **Statystyk (Statistics)** | Duża liczba (KPI), delta zmiany, Sparkline | Wykres liniowy w kolorze
`--gold-400` |
| **Powiadomień (Notification)** | Ikona kontekstu, tytuł, opis, timestamp | Stan nieprzeczytany:
tło `--bg-surface-elevated` (`--teal-700`) |
| **NFT (Digital Asset)** | Obraz `1:1`, tytuł, cena, rzadkość | Cena w `--gold-400`, rzadkość jako
chip (Fiolet) |
#### 1.3 Siatka Kart (Grid Layout)
| Właściwość | Wartość |
| :--- | :--- |
| **Kontener** | `display: grid` |
| **Kolumny** | `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` |
| **Odstęp** | `gap: 24px` |---
### 2. System Modali i Szuflad (Modal & Bottom Sheet)
#### 2.1 Wspólne Parametry (Modal Desktop)
| Właściwość | Wartość |
| :--- | :--- |
| **Szerokość maks.** | `600px` (dla formularzy), `400px` (dla potwierdzeń) |
| **Tło** | `--bg-surface-modal` (`--teal-800`) |
| **Border Radius** | `16px` |
| **Padding** | `24px` |
| **Cień** | `--shadow-modal` (`0 24px 48px -12px rgba(0,0,0,0.7)`) |
| **Border** | `1px solid rgba(255, 255, 255, 0.05)` |
| **Backdrop** | `rgba(0, 31, 31, 0.85)` + `backdrop-filter: blur(4px)` |
| **Z-Index** | `--z-modal` (1000) |
| **Nagłówek** | `Mukta Malar Bold`, `24px`, `#FFFFFF` lub `--gold-400` |
| **Przycisk Zamknięcia** | Ikona `X` (`24px`), obszar `44x44px`, kolor `--text-tertiary`, hover
`--text-primary` |
#### 2.2 Wariant Mobilny (Bottom Sheet)
| Właściwość | Wartość |
| :--- | :--- |
| **Aktywacja** | Poniżej `640px` (`sm`) |
| **Pozycja** | `fixed; bottom: 0; left: 0; right: 0` |
| **Wysokość** | `85%` rzutni |
| **Border Radius** | `16px 16px 0 0` |
| **Uchwyt (Grip)** | `40x4px`, `--border-subtle`, wyśrodkowany u góry |
| **Zamknięcie** | Swipe-down, przycisk `X` |
| **Animacja Wejścia** | `slide-up`, `400ms`, `--ease-enter` |
#### 2.3 Animacje
| Stan | Animacja |
| :--- | :--- |
| **Wejście** | `fade-in` (backdrop) + `slide-down` (modal), `400ms`, `--ease-enter` |
| **Wyjście** | `fade-out`, `200ms` |
---
### 3. System Dymków i Popoverów (Tooltip & Popover)
#### 3.1 Tooltip (Dymek Informacyjny)| Właściwość | Wartość |
| :--- | :--- |
| **Rola** | Etykietowanie (tylko tekst, max 2 linie) |
| **Tło** | `rgba(0, 47, 47, 0.9)` (`#002F2F` z 90% opacity) |
| **Tekst** | `--text-primary`, `14px` |
| **Padding** | `8px 12px` |
| **Border Radius** | `6px` |
| **Cień** | `0px 4px 16px rgba(0,0,0, 0.5)` |
| **Strzałka** | SVG w kolorze tła |
| **Opóźnienie pojawienia** | `500ms` (Hover Intent) |
| **Z-Index** | `--z-tooltip` (1500) |
| **Wyzwalacz (Mobile)** | Tapnięcie (Toggletip) |
#### 3.2 Popover (Dymek Akcji)
| Właściwość | Wartość |
| :--- | :--- |
| **Rola** | Kontener interaktywny (przyciski, linki, dłuższe teksty) |
| **Tło / Cień** | Jak Tooltip, ale z większym `--shadow-modal` |
| **Padding** | `16px` |
| **Wyzwalacz** | Kliknięcie |
| **Zamknięcie** | Click outside, `Escape` |
**Krytyczne dla dostępności:** Tooltip używa `role="tooltip"` i `aria-describedby`. Popover używa
`role="dialog"`.
---
### 4. System Powiadomień (Toast / Snackbar)
#### 4.1 Parametry Bazowe
| Właściwość | Wartość |
| :--- | :--- |
| **Tło** | `#002F2F` |
| **Tekst** | `--text-primary` (`#F1F5F9`) |
| **Padding** | `16px` |
| **Border Radius** | `12px` |
| **Cień** | `0px 8px 24px -4px rgba(0, 0, 0, 0.6)` |
| **Border** | `1px solid rgba(255, 255, 255, 0.1)` |
| **Czas wyświetlania** | `4 sekundy` (pauza na hover) |
| **Z-Index** | `--z-toast` (9999) |
| **Pozycja (Desktop)** | Prawy dolny róg (`bottom: 24px; right: 24px`) || **Pozycja (Mobile)** | Góra (`top: 24px; left: 24px; right: 24px`) z `env(safe-area-inset-top)` |
| **Animacja Wejścia** | `slide-in`, `400ms`, `--ease-spring` |
| **Zamknięcie** | Swipe (gest), `Escape`, kliknięcie `X` |
#### 4.2 Warianty Kolorystyczne (Akcenty)
| Typ | Kolor Ikony / Paska Bocznego | Przykład HEX |
| :--- | :--- | :--- |
| **Sukces** | Szmaragd / Mięta | `#34D399` |
| **Błąd** | Koral / Jasna Malina | `#F43F5E` |
| **Informacja** | Fiolet | `#A78BFA` |
| **Ostrzeżenie** | Bursztyn | `#FBBF24` |
⚠️
**
Krytyczne dla dostępności:** `role="alert"` tylko dla błędów i ostrzeżeń. Dla Sukcesu i Info
używaj `role="status"`.
---
### 5. Stany Ładowania (Spinner & Skeleton)
#### 5.1 Spinner
| Rozmiar | Wymiar CSS | Grubość obrysu (SVG) | Zastosowanie |
| :--- | :--- | :--- | :--- |
| **Mały (S)** | `24px` | `4.5px` | Przyciski, inputy |
| **Średni (M)** | `48px` | `3.5px` | Karty, modale |
| **Duży (L)** | `72px` | `3.0px` | Pełny ekran |
| Właściwość | Wartość |
| :--- | :--- |
| **Kolor** | Gradient `linear-gradient(135deg, #FFD700 0%, #800080 100%)` |
| **Animacja** | `rotate` (liniowa) + `dash` (`ease-in-out`), czas `1.5s - 2s` |
#### 5.2 Skeleton Screen
| Właściwość | Wartość |
| :--- | :--- |
| **Tło Bazowe** | `--teal-800` (`#003737`) |
| **Kolor "Shimmer"** | `--teal-700` (`#004545`) |
| **Border Radius** | `4px` (tekst), `8px` (karty), `50%` (awatary) |
| **Animacja** | `shimmer`, `1.5s`, `linear`, `infinite` |
| **Metoda** | `transform: translateX()` na pseudoelemencie (GPU) |
**Przykład Shimmer (CSS):**```css
.skeleton {
background: linear-gradient(
110deg,
var(--teal-800) 0%,
var(--teal-700) 40%,
var(--teal-800) 100%
);
background-size: 200% 100%;
animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
0% { background-position: 200% 0; }
100% { background-position: -200% 0; }
}
```
```
---
## Krok 4: Specyfikacja Widoków Specjalistycznych
🧬
```markdown
##
Krok 4: Widoki Specjalistyczne – Layouty i Mechanika
### 1. Publiczny Profil Twórcy (Creator Profile View)
#### 1.1 Layout Desktop (≥1024px)
| Właściwość | Lewa Kolumna (Narracyjna) | Prawa Kolumna (Transakcyjna) |
| :--- | :--- | :--- |
| **Szerokość** | `60% - 70%` |
