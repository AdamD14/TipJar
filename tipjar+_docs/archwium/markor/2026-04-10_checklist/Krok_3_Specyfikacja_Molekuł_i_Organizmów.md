🧬 Krok 3: Specyfikacja Molekuł i Organizmów

1. System Kart (Cards)

Zgodnie z dokumentem Architektura Systemów Designu w Środowisku Web3: Kompleksowa Analiza Uniwersalnego Komponentu Karty (str. 66-75).

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

Wariant Specyfika Kluczowe Elementy
Twórcy (Creator) Awatar 64px, nazwa, handle, statystyki Złoty checkmark (Verified), przycisk "Obserwuj"
Statystyk (Statistics) Duża liczba (KPI), delta zmiany, Sparkline Wykres liniowy w kolorze --gold-400
Powiadomień (Notification) Ikona kontekstu, tytuł, opis, timestamp Stan nieprzeczytany: tło --bg-surface-elevated (--teal-700)
NFT (Digital Asset) Obraz 1:1, tytuł, cena, rzadkość Cena w --gold-400, rzadkość jako chip (Fiolet)

1.3 Siatka Kart (Grid Layout)

Właściwość Wartość
Kontener display: grid
Kolumny grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))
Odstęp gap: 24px

---

2. System Modali i Szuflad (Modal & Bottom Sheet)

Zgodnie z dokumentem System Modali i Dialogów (Overlay Architecture) (str. 78-82) oraz Architektura Ciemnego Trybu... System Dropdownów i Menu (str. 95-98).

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
Border Radius 16px 16px 0 0
Uchwyt (Grip) 40x4px, --border-subtle, wyśrodkowany u góry
Zamknięcie Swipe-down, przycisk X
Animacja Wejścia slide-up, 400ms, --ease-enter

2.3 Animacje

Stan Animacja
Wejście fade-in (backdrop) + slide-down (modal), 400ms, --ease-enter
Wyjście fade-out, 200ms

---

3. System Dymków i Popoverów (Tooltip & Popover)

Zgodnie z dokumentem System Mikrointerakcji: Architektura, Design i Implementacja Wzorców "Dymków" (str. 120-129).

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

Krytyczne dla dostępności: Tooltip używa role="tooltip" i aria-describedby. Popover używa role="dialog".

---

4. System Powiadomień (Toast / Snackbar)

Zgodnie z dokumentem Architektura i Projektowanie Systemu Powiadomień Tymczasowych (Toast) (str. 99-107).

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

⚠️ Krytyczne dla dostępności: role="alert" tylko dla błędów i ostrzeżeń. Dla Sukcesu i Info używaj role="status".

---

5. Stany Ładowania (Spinner & Skeleton)

Zgodnie z dokumentem Zaawansowana Inżynieria Stanów Ładowania (str. 108-119).

5.1 Spinner

Rozmiar Wymiar CSS Grubość obrysu (SVG) Zastosowanie
Mały (S) 24px 4.5px Przyciski, inputy
Średni (M) 48px 3.5px Karty, modale
Duży (L) 72px 3.0px Pełny ekran

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