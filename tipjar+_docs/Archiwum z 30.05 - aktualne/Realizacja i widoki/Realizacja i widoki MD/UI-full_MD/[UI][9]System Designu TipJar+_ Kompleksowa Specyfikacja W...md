Raport Projektowy Systemu Designu
TipJar+: Architektura Wizualna

1. Architektura Kolorystyczna: "Nocturnal Opulence"

1.1. Kontekst Projektowy i Cele Strategiczne

W krajobrazie aplikacji finansowych roku 2026, gdzie zaufanie użytkownika jest walutą równie
cenną co transakcje pieniężne, warstwa wizualna produktu przestała pełnić funkcję jedynie
estetyczną. Stała się fundamentem użyteczności, bezpieczeństwa i postrzeganej wartości
marki. Niniejszy raport stanowi kompleksową dokumentację architektury kolorystycznej oraz
typograficznej dla aplikacji TipJar+, platformy dedykowanej bezgotówkowemu napiwkowaniu.
Stylistyka "Premium Dark Theme" została wybrana jako odpowiedź na potrzeby użytkowników –
pracowników sektora usług, którzy często korzystają z aplikacji w warunkach nocnych.

1.2. Paleta Podstawowa: Skala "Deep Ocean"

Kolor bazowy #003737 (Ciemny Turkus) pełni funkcję płótna, zastępując standardowe czernie.
HSL (Precyzyjne)  Rola w Systemie
Nazwa Tokenu  Waga

HEX

(Dark Mode)

teal-50

50

#E0F2F2

180°, 40%, 95%  Tekst na ciemnym

tle (zastępuje
czystą biel).

teal-100

teal-200

100

200

#B3D9D9

#80BFBF

180°, 35%, 78%  Subtelne akcenty,
ikony nieaktywne.
180°, 38%, 62%  Obrysy (Borders)

teal-300

300

#4DA6A6

180°, 38%, 48%  Drugorzędne

elementów
formularzy.

teal-400

400

#268C8C

przyciski, elementy
graficzne.

180°, 57%, 35%  Fokus, stan hover
dla ciemniejszych
elementów.

teal-500

500

#007373

180°, 100%, 22%  Interaktywne tła

kart, nagłówki
sekcji.

teal-600

600

#005959

180°, 100%, 17%  Hover dla

elementów o
wadze 500.

teal-700

700

#004545

180°, 100%, 14%  Podstawowe tło

dla "wyniesionych"
elementów

Nazwa Tokenu  Waga

HEX

HSL (Precyzyjne)  Rola w Systemie

(Dark Mode)
(Elevated
Surface).

teal-800

Base

#003737

180°, 100%, 11%  Główny Kolor Tła

Aplikacji / Tło
Modali.

teal-900

900

#001F1F

180°, 100%, 6%  Najgłębsze tło,

Pasek Nawigacji,
Cienie.

1.3. System Akcentów

●  Złoto (#FFD700): Główny katalizator akcji (CTA). W trybie ciemnym kontrast wynosi

11.2:1.

○  gold-400 (Base): #FFD700 – Główne przyciski.
○  gold-500: #FFC107 – Stan Hover.
○  gold-100: #FFF9C4 – Tło toastów/powiadomień.

●  Fiolet (#9D4EDD): Akcent pomocniczy, nawigacja i statusy systemowe.

○  purple-300 (Base): #9D4EDD – Switche, aktywne ikony menu.
○  purple-100: #E0B3FF – Tła zaznaczonych elementów.

2. Hierarchia Typograficzna

Typografia łączy humanistyczną przyjazność z techniczną precyzją.

●  Nagłówki: Mukta Malar (SemiBold/Bold).
●  Body: IBM Plex Sans (Regular/Medium).

3. Komponenty UI: Przyciski

●  Primary: Tło #FFD700, Tekst #003737.
●  Secondary: Obrys #FFD700, Tekst #FFD700 (lub Fiolet).
●  Radius: 8px.

4. Komponenty UI: Formularze

●  Tło: #004545.
●  Obrys: #006666.
●  Focus: #FFD700 (Glow).
●  Radius: 6px.

5. Komponenty UI: Karty

●  Tło: #002F2F.
●  Radius: 12px.
●

Interakcja: Uniesienie + Cień ze złotą poświatą.

6. Abstrakcyjne Tła 3D

Geometryczne kompozycje blokowe w rzucie izometrycznym, budujące głębię interfejsu.

7. System Modali i Dialogów (Overlay Architecture)

Modale w TipJar+ pełnią funkcję "skupienia uwagi" (Focused Task). Przerywają one główny
przepływ użytkownika, aby wymusić decyzję lub przekazać krytyczną informację. W stylistyce
"Nocturnal Opulence" modal nie jest zwykłym oknem systemowym, lecz elegancką warstwą
unoszącą się nad przyciemnioną rzeczywistością aplikacji.

7.1. Specyfikacja Wizualna (Visual Specs)

Komponent modala został zaprojektowany, aby maksymalnie skupiać wzrok na treści,
wykorzystując kontrast i głębię.
●  Kontener (Container):

○  Tło: #003737 (teal-800). Jest to kolor bazowy aplikacji, co zapewnia spójność, ale

dzięki backdropowi modal wyraźnie odcina się od reszty.

○  Zaokrąglenie (Border Radius): 16px. Większe zaokrąglenie niż w kartach (12px)
sugeruje, że modal jest elementem nadrzędnym, "pływającym" nad interfejsem.

○  Cień (Elevation): Bardzo głęboki cień, sugerujący wysokie uniesienie.

■  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.7);

○  Obrys (Border): Subtelny, 1px #004D4D (teal-700), aby zdefiniować krawędzie na

ciemnych ekranach OLED.
●  Tło Przyciemniające (Backdrop/Overlay):

○  Kolor: #001F1F (teal-900) z kryciem 85% (rgba(0, 31, 31, 0.85)).
○  Efekt: Backdrop Blur (rozmycie tła) o wartości 4px. To kluczowy element stylu

"premium", który wygładza tło pod modalem, redukując szum wizualny.

●  Nagłówek (Header):

○  Tekst: Mukta Malar Bold, 24px (1.5rem).
○  Kolor: #FFFFFF (Domyślny) lub #FFD700 (Złoty - dla płatności i sukcesów).
○  Przycisk Zamknięcia (X): Ikona 24px w prawym górnym rogu.

■  Kolor: #A3C2C2 (domyślny), #FFFFFF (hover).
■  Obszar klikalny: 44x44px.

7.2. Responsywność i Układ (Responsive Layout)

Zachowanie modala zmienia się drastycznie w zależności od urządzenia, aby zapewnić
ergonomię.
Cecha
Szerokość

Mobile (<640px)
100% szerokości.

Desktop / Tablet (>640px)
Max 600px. Wyśrodkowany
horyzontalnie i wertykalnie.
Center (Środek ekranu).

Pozycja

Marginesy

auto

Bottom Sheet (Przyklejony do
dołu) lub Center.
16px (jeśli nie jest full-bleed)
lub 0 (dla Sheet).

Cecha
Zaokrąglenie

Desktop / Tablet (>640px)
16px (wszystkie rogi).

Mobile (<640px)
16px (góra), 0px (dół - jeśli
Bottom Sheet).

7.3. Warianty Funkcjonalne

A. Modal Płatności (Transaction Modal)

Najważniejszy ekran w aplikacji. Musi budzić absolutne zaufanie.

●  Nagłówek: "Przekaż Napiwek" (Złoty tekst).
●  Treść:

○  Duże pole input z kwotą (np. "50 PLN") wyśrodkowane.
○  Wybór metody płatności (karty/ikony).

●  Akcje: Przycisk "Zapłać" (Primary Gold) na całą szerokość (Mobile) lub wyrównany do

prawej (Desktop).

B. Modal Potwierdzenia (Confirmation/Alert)

Minimalistyczny, skupiony na decyzji.

●  Nagłówek: Np. "Usunąć kartę?".
●  Treść: Krótki opis skutków akcji (IBM Plex Sans, szary).
●  Akcje:

○  Przycisk "Anuluj" (Ghost/Text Button).
○  Przycisk "Usuń" (Danger/Red) lub "Potwierdź" (Primary).

C. Modal Edukacyjny (Onboarding/Info)

Służy do wyjaśniania nowych funkcji.

●  Media: Często zawiera ilustrację lub ikonę 3D na górze (nad nagłówkiem).
●  Akcje: Pojedynczy przycisk "Rozumiem" lub "Dalej".

7.4. Choreografia i Animacja (Motion Design)

Animacja wejścia jest dwuetapowa: pojawienie się (opacity) oraz subtelny ruch w dół
(slide-down). Naśladuje to fizykę karty wsuwanej do słoika.

●  Wejście (Entrance):

○  Backdrop: Fade-in (0% -> 100% opacity) w 300ms.
○  Modal: Slide-down + Fade-in.

■  Start: opacity: 0, transform: translateY(-20px) scale(0.95)
■  Koniec: opacity: 1, transform: translateY(0) scale(1)
■  Timing: cubic-bezier(0.16, 1, 0.3, 1) (Out Expo) – szybki start, powolne

hamowanie. Czas: 400ms.

●  Wyjście (Exit):

○  Szybsze (200ms), opacity: 0 i transform: translateY(10px).

7.5. Implementacja Kodowa (HTML/CSS)

Poniżej znajduje się implementacja wykorzystująca nowoczesny element <dialog> oraz Tailwind

CSS (konceptualnie).
<dialog id="payment-modal" class="modal-root">
  <div class="modal-container">
    <header class="modal-header">
      <h3 class="text-xl font-bold text-white font-heading">Potwierdź
płatność</h3>
      <button class="close-btn" aria-label="Zamknij">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
stroke="currentColor" stroke-width="2" stroke-linecap="round"
stroke-linejoin="round"><line x1="18" y1="6" x2="6"
y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </header>

    <div class="modal-body text-gray-300 font-body">
      <p>Czy na pewno chcesz przekazać <strong>50 PLN</strong> dla
kelnera?</p>
    </div>

    <footer class="modal-actions">
      <button class="btn btn-ghost">Anuluj</button>
      <button class="btn btn-primary">Zapłać</button>
    </footer>
  </div>
</dialog>

<style>
  /* Base Dialog Reset */
  dialog {
    background: transparent;
    border: none;
    padding: 0;
    max-width: 100%;
    max-height: 100%;
  }

  /* Backdrop Style */
  dialog::backdrop {
    background: rgba(0, 31, 31, 0.85);
    backdrop-filter: blur(4px);
    animation: fade-in 0.3s ease-out forwards;
  }

  /* Container Style */
 .modal-container {
    background-color: #003737;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);

    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 600px;
    margin: auto;
    overflow: hidden;

    /* Animation */
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
    animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* Layout Elements */
 .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 16px;
  }

 .modal-body {
    padding: 0 24px 24px;
    line-height: 1.5;
  }

 .modal-actions {
    padding: 16px 24px 24px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

 .close-btn {
    color: #A3C2C2;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
  }
 .close-btn:hover {
    color: #FFFFFF;
  }

  /* Animations Keyframes */
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slide-down {
    from { opacity: 0; transform: translateY(-20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Mobile Responsive Overrides */
  @media (max-width: 640px) {
   .modal-container {
      width: 100%; /* Full width */
      max-width: none;
      border-radius: 16px 16px 0 0; /* Bottom Sheet Style */
      margin-bottom: 0;
      position: fixed;
      bottom: 0;
      animation-name: slide-up-mobile; /* Opcjonalnie inna animacja
dla mobile */
    }

    @keyframes slide-up-mobile {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  }
</style>

