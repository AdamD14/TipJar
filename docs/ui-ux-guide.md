# Poradnik UI/UX dla TipJar+ (MVP 2025)

## Założenia ogólne
- Platforma Web3 z prostotą aplikacji Web2.
- Styl dark mode z gradientami turkusowo--fioletowymi.
- Mobile first, skalowalność do 100 mln użytkowników.

## Strona główna (Landing Page)
- Hero z hasłem i dwoma CTA: Załóż profil twórcy oraz Znajdź twórcę.
- Sekcje: Jak to działa, Dla Twórców, Dla Fanów, stopka z linkami.
- Komponent React z Tailwind i animacjami Framer Motion.
- Dbałość o kontrast, focus, alt‑teksty i preferencje reduced motion.

## Onboarding Twórcy
- Krótki kreator 3 kroków: profil, płatności, link udostępnienia.
- Pasek postępu, możliwość pominięcia kroków.
- Mikrointerakcje: animowany pasek, przejścia między ekranami, konfetti po zakończeniu.
- Dostępność: etykiety pól, walidacja z komunikatami, obsługa klawiaturą.

## Publiczny Profil Twórcy
- Nagłówek z avatarem, nazwą, opisem.
- Przycisk "Wesprzyj" otwierający Tip Modal.
- Sekcje Top Fani i Ostatnie wsparcia; możliwe odznaki NFT.
- Animacje przy napływie nowych napiwków, pulsowanie CTA.
- Semantyczne nagłówki i poprawny focus order.

## Panel Twórcy
- Dashboard z saldem, statystykami i listą ostatnich napiwków.
- Sidebar z nawigacją; wersja mobilna z menu hamburger.
- Mikrointerakcje: wysuwane menu, animowane liczby, alerty wymagające uwagi.
- Dostępność: role ARIA w nawigacji, alternatywy tekstowe dla wykresów, tabele z nagłówkami.

## Panel Fana
- Lista wspieranych twórców, galeria odznak NFT, historia wsparć.
- Gamifikacja: wyróżnianie nowych odznak, zachęta do kolejnych napiwków.
- Prosta struktura i możliwość szybkiego przejścia do profili twórców.

## Tip Modal
- Wybór kwoty (przyciski + pole), metody płatności (karta, crypto), opcjonalna wiadomość.
- Animacje wejścia, pulsujące przyciski kwot, konfetti po sukcesie.
- Fokus trap, jasne komunikaty błędów i odpowiedni kontrast elementów.

## Uwierzytelnianie
- Modal z przełącznikiem Rejestracja/Logowanie.
- Metody: e‑mail, OAuth (Google/Twitch), portfel Web3.
- Animowane przejścia formularzy, walidacja haseł, tryb gościa.

## Spójność i branding
- Fonty: Mukta Malar dla nagłówków, IBM Plex Sans dla treści.
- Kolory: ciemny turkus (#003737), złoto (#FFD700), akcentowy fiolet, neutralne szarości.
- Ikony liniowe, jednolity styl i znaczenia kolorów.

## Błędy do uniknięcia
- Przeładowanie interfejsu i niespójne komponenty.
- Brak feedbacku, przesadne animacje, ignorowanie mobile first.
- Używanie żargonu bez wyjaśnienia.

## Innowacyjne interakcje
- Konfetti i efekty wizualne po napiwku.
- Odznaki NFT "Proof of Support" z możliwością udostępniania.
- Tip streaks, odblokowywanie treści po wsparciu, integracje ze streamami.

