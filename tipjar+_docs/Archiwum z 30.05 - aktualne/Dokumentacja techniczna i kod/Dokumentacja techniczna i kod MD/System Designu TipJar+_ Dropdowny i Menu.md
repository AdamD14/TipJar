Raport Projektowy Systemu Designu
TipJar+: Architektura Wizualna (v7)

8. System Dropdownów i Menu Kontekstowych
(Navigation & Selection)

W ekosystemie TipJar+, gdzie gęstość informacji jest wysoka, dropdowny pełnią funkcję
"szuflad" porządkujących interfejs. Zamiast standardowych list systemowych (native select),
projektujemy własne komponenty (Custom Select), aby zachować spójność z estetyką
"Nocturnal Opulence".

8.1. Anatomia i Fizyka Komponentu

Dropdown w tym systemie to lewitująca warstwa, która musi być wyraźnie odseparowana od tła
aplikacji, mimo użycia zbliżonej palety barw.

●  Kontener (Dropdown Body):

○  Tło: #003737 (teal-800). Jest to kolor bazowy, spójny z modalem, ale ciemniejszy

od tła kart #002F2F.

○  Cień (Elevation): Ze względu na ciemne tło aplikacji, cień musi być głęboki i

dyfuzyjny, aby zarysować krawędzie menu.

■  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255,

255, 0.05); (Subtelny border 1px realizowany cieniem dla ostrości).

○  Zaokrąglenie: 8px (spójne z przyciskami).
○  Padding: 8px wertykalnie (góra/dół), 0px horyzontalnie (opcje wypełniają

szerokość).

○  Szerokość: Min. 200px lub dopasowana do Triggera (min-width: 100%).

●  Wyzwalacz (Trigger):

○  Może być przyciskiem (Secondary Outline) lub Inputem.
○

Ikona: Strzałka (Chevron Down) po prawej stronie. Przy otwarciu obraca się o 180°
(transform: rotate(180deg)).

8.2. Interakcja Wewnątrz Listy

●  Pozycja Listy (Option Item):

○  Wysokość: 40px (Desktop), 44px (Mobile).
○  Typografia: IBM Plex Sans, 14px, Regular.
○  Kolor Tekstu: #FFFFFF (Biel).
○  Padding: 12px 16px.

●  Stany (States):

○  Default: Tło transparentne.
○  Hover/Focus: Tło #004545 (teal-700). Zmiana tła musi być natychmiastowa (0ms

transition), aby interfejs wydawał się responsywny (snappy).

○  Active/Selected: Tekst Złoty #FFD700, opcjonalnie ikona "Check" po prawej

stronie.

8.3. Warianty Funkcjonalne

A. Menu Użytkownika (User Profile Menu)

Ten komponent łączy nawigację z informacją o tożsamości.

●  Nagłówek (Header): Sekcja na samej górze dropdownu, oddzielona linią separatora

(border-bottom: 1px solid #004545).

○  Zawartość: Awatar (32x32px), Imię (Bold), Email/Handle (Szary mały).
○  Padding: 16px.

●  Lista Opcji:

"Mój Profil", "Ustawienia", "Płatności".

○
○  Separator: Przed opcją "Wyloguj".
○  Wyloguj: Tekst w kolorze #FF6B6B (Pastelowa czerwień) przy hoverze.

B. Filtr Wielokrotnego Wyboru (Multiselect Filter)

Służy do filtrowania list transakcji lub twórców.

●  Struktura: Każda opcja zawiera Checkbox po lewej stronie.
●  Zachowanie: Kliknięcie w opcję nie zamyka dropdownu. Zmienia jedynie stan

checkboxa.

●  Stopka (Footer): Opcjonalna sekcja na dole z przyciskami "Wyczyść" i "Zastosuj" (dla

urządzeń mobilnych).

●  Styl Checkboxa: Zgodny z sekcją Formularzy (Złoty/Fioletowy po zaznaczeniu).

C. Selektor Języka/Waluty (Simple Select)

Minimalistyczna lista.

●

Ikona: Flaga lub symbol waluty po lewej stronie tekstu opcji.

8.4. Choreografia i Animacja (Motion Design)

Animacja slide-down + fade-in nadaje lekkości. Menu nie "wyskakuje", lecz "rozwija się".

●  Punkt zaczepienia (Transform Origin): top center (lub top left/top right zależnie od

wyrównania).

●  Parametry:

○  Czas: 200ms.
○  Easing: cubic-bezier(0.2, 0, 0, 1) (Szybkie pojawienie, miękkie lądowanie).
○  Keyframes:

■  Start: opacity: 0, transform: translateY(-8px) scale(0.98)
■  Koniec: opacity: 1, transform: translateY(0) scale(1)

8.5. Implementacja Techniczna (CSS & Logic)

Struktura HTML/CSS (Koncept)

/* Kontener główny (Pozycjonowanie) */

.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

/* Ciało Dropdownu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0; /* Wyrównanie do prawej krawędzi triggera */
  margin-top: 8px;
  min-width: 220px;
  background-color: #003737;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.6), 0 0 0 1px
rgba(255,255,255,0.05);
  z-index: 1000;
  overflow: hidden;

  /* Animacja Wejścia */
  opacity: 0;
  transform: translateY(-8px);
  animation: slideDownFade 0.2s cubic-bezier(0.2, 0, 0, 1) forwards;
}

/* Opcje */
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: #FFFFFF;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0s; /* Instant feedback */
  text-decoration: none;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #004545;
  outline: none;
}

.dropdown-item.active {
  color: #FFD700;
}

/* Separator */
.dropdown-divider {
  height: 1px;
  background-color: #004545;
  margin: 4px 0;
}

/* Nagłówek User Menu */
.dropdown-header {
  padding: 16px;
  border-bottom: 1px solid #004545;
}
.user-name { font-weight: 700; color: #fff; display: block; }
.user-handle { font-size: 12px; color: #A3C2C2; }

@keyframes slideDownFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

Logika Zamknięcia (Click Outside)

Implementacja w JavaScript (React/Vue) musi nasłuchiwać zdarzenia mousedown na obiekcie
document. Jeśli cel kliknięcia (target) nie znajduje się wewnątrz .dropdown-wrapper, menu musi
się zamknąć (zmiana stanu isOpen = false).

8.6. Dostępność (Accessibility)

1.  Focus Trap (dla Modali) vs Loop (dla Menu): W menu dropdown, klawisze strzałek

(Góra/Dół) powinny przełączać focus między opcjami. Klawisz Esc musi zamykać menu i
przywracać focus na Trigger.

2.  ARIA:

○  Trigger: aria-haspopup="true", aria-expanded="true/false".
○  Menu: role="menu".
○

Item: role="menuitem" (lub role="option" w select).

