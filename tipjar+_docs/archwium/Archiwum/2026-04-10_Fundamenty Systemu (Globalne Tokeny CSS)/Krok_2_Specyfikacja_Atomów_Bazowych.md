🧬 Krok 2: Specyfikacja Atomów Bazowych

1. System Przycisków (Buttons)

Zgodnie z dokumentem RAPORT TECHNICZNY: KOMPLEKSOWA SPECYFIKACJA SYSTEMU KOMPONENTÓW UI – MODUŁ PRZYCISKÓW (str. 43-53).

1.1 Wymiary (Siatka 8-punktowa)

Rozmiar Wysokość Padding X Font Size Ikona Border Radius
Large (L) 56px 32px 18px 24px 8px
Medium (M) 48px 24px 16px 20px 8px
Small (S) 40px 16px 14px 16px 8px

⚠️ Obszar dotykowy: Dla Small minimalny obszar kliknięcia to 44px (realizowane przez pseudoelement).

1.2 Wariant: Primary (Złoty)

Stan Tło Tekst Obramowanie Cień / Transform
Default --gold-400 --teal-800 none --shadow-1
Hover --gold-300 --teal-800 none --shadow-2
Active --gold-500 --teal-800 none scale(0.98), shadow-1
Focus --gold-400 --teal-800 2px solid --purple-300 outline-offset: 2px
Disabled #E0E0E0 (Szary) #9E9E9E none none
Loading --gold-400 Ukryty none Spinner SVG (kolor --teal-800)

Krytyczne WCAG: Nigdy nie używaj białego tekstu na --gold-400. Kontrast 1.4:1 = FAIL. Tekst musi być --teal-800 (kontrast 11.2:1 = AAA).

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

Zgodnie z dokumentem Architektura Ciemnego Trybu: Kompleksowa Specyfikacja Systemu Formularzy UI (str. 54-65).

2.1 Wymiary i Bazowe Style

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
Focus (Złoty) --gold-400 0 0 0 1px --gold-400, 0 0 0 4px rgba(255, 215, 0, 0.25) Kolor --gold-400, scale(0.75), przesunięta do góry
Error --error-base 0 0 0 4px rgba(255, 180, 171, 0.25) Kolor --error-base
Success --success-base none Kolor --success-base
Disabled --teal-700 (przerywane) none Opacity 0.4

Walidacja: Tekst błędu pod polem w kolorze --error-base (#FFB4AB). Dodatkowo opcjonalna ikona wykrzyknika.

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

2.5 Checkbox & Radio

Właściwość Checkbox Radio
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

Zgodnie z dokumentem Zaawansowana Inżynieria Stanów Ładowania: ... System "Avatary & Badge" (str. 130-139).

3.1 Wymiary i Skalowanie

Rozmiar Wymiar (px) Zastosowanie Odznaka (Teoretycznie 20%) Fizyczna Rekomendacja Odznaki
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
Odznaka (Top Fan) Tarcza (SVG) w kolorze rubinowym lub fioletowym

3.3 Pozycjonowanie Odznaki (Wycięcie - Cutout)

Odznaka umieszczona w prawym dolnym rogu (bottom: 7.3%, right: 7.3%). Aby uniknąć brzydkiego obramowania, stosujemy CSS Masking:

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

⏭️  🐋.