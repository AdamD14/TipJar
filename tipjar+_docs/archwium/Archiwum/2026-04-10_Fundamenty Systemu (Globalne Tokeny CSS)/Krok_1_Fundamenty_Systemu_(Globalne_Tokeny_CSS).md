🧬 Krok 1: Fundamenty Systemu (Globalne Tokeny CSS)

1. Paleta Prymitywna (Primitive Tokens) – Kolory Bazowe

To są surowe wartości. Nie używaj ich bezpośrednio w komponentach (poza wyjątkami). Używaj tokenów semantycznych z sekcji 2.

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

Token HEX Zastosowanie (Kontekst)
--error-light #FFB4AB Tekst błędu na ciemnym tle
--error-base #FF5252 Obramowania pól z błędem, ikony błędu
--error-dark #3D1010 Tło dla bloków/alertów błędów
--success-light #69F0AE Tekst sukcesu na ciemnym tle
--success-base #00E676 Ikony sukcesu, obramowania
--success-dark #004D26 Tło dla alertów sukcesu
--warning-base #FF9100 Ostrzeżenia (sieć, brak środków)
--info-base #66D9E8 Toast informacyjny, status "Pending"

---

2. Tokeny Semantyczne (Semantic Tokens) – Jak Tego Używać

To jest jedyna warstwa, której powinieneś używać w 99% komponentów. Dzięki temu zmiana trybu z Light na Dark to tylko podmiana tych zmiennych, a nie całego CSS.

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
--action-primary-text var(--teal-800) Kolor tekstu na złotym tle (⚠️ Krytyczne dla WCAG)
--action-secondary-bg var(--purple-300) Tło przycisków drugorzędnych

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
--fs-button 1rem Mukta 600 Tekst na przyciskach

⚠️ Reguła Krytyczna dla Kwot: Każdy element wyświetlający cyfry (kwoty, daty) musi mieć:

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

---

🐋.