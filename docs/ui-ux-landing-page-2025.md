# TipJar+ – Dokumentacja UI/UX i Landing Page (2025)

## Wprowadzenie
TipJar+ to platforma mikro‑płatności dla fanów i twórców. Projekt łączy prostotę aplikacji Web2 z zaletami Web3 (płatności USDC), ukrywając złożoność blockchainu. Dokument opisuje wytyczne UI/UX oraz implementację landing page w Next.js i Tailwind CSS.

## Branding i tożsamość wizualna
- **Paleta kolorów:** ciemny turkus `#003737` (tło), złoto `#FFD700` (CTA, akcenty) oraz subtelny akcent fioletowy `#83509F` dla elementów Web3.
- **Typografia:** Montserrat – Bold dla nagłówków, Regular dla treści. Minimalny rozmiar tekstu 14 px, nagłówki 24–32 px.
- **Styl graficzny:** tryb dark z gradientami turkusowo‑fioletowymi. Złote akcenty podkreślają ważne akcje. Ikony i logo utrzymane w stylistyce liniowej.

## Architektura UI/UX
- Podejście **mobile‑first**, skalowanie do tabletów i desktopów.
- Spójny **mini design system**: ujednolicone przyciski, formularze, karty, efekty hover/focus.
- Podział ról: **Twórca** i **Fan** z dopasowaną nawigacją, łatwe przełączanie kontekstu.
- **Atomic Design** – komponenty wielokrotnego użytku (Navbar, Hero, karty itd.).
- Stosowanie heurystyk UX: widoczność stanu systemu, zrozumiały język, kontrola użytkownika, zapobieganie błędom.

## Landing Page
Strona główna jest wizytówką produktu i zachęca twórców oraz fanów do działania.

### Układ sekcji
1. **Hero:** slogan + dwa CTA („Załóż profil twórcy”, „Znajdź twórcę”), tło z mapą świata i gradientem.
2. **Why TipJar+:** cztery ikony z opisem korzyści (niskie prowizje, globalność, szybkie wypłaty, prosta integracja).
3. **Dla Twórców / Dla Fanów:** bloki z opisem zalet i przyciskiem akcji.
4. **Jak to działa:** kroki 1‑4 ilustrujące proces wsparcia.
5. **Call‑to‑Action:** ponowne zachęcenie do rejestracji.
6. **Stopka:** linki informacyjne i media społecznościowe.

### Implementacja
- Next.js (App Router) + TypeScript + Tailwind CSS.
- Niestandardowe kolory i font Montserrat zdefiniowane w `tailwind.config.js`.
- Sekcje złożone z komponentów React: `Navbar`, `Hero`, `WhySection`, `HowSection`, `ExploreSection`, `LearnSection`, `Footer`.
- Hero: pełnoekranowy blok z gradientem, obrazem mapy jako tło i responsywnym układem CTA.
- Navbar: sticky, z trybem mobilnym (hamburger) i autoukrywaniem przy scrollu.

## Kluczowe komponenty UI
- **Navbar:** sticky top, menu linków, logowanie/rejestracja, chowanie przy przewijaniu.
- **Przyciski CTA:** warianty Primary (złote) i Secondary (transparentne z obwódką). Stany hover/focus, animacje skalowania.
- **Formularze:** spójne pola z etykietami, podświetleniem na fokus, komunikaty błędów i efekt „shake”.
- **Karty:** prezentacja twórców lub danych w dashboardzie, ciemne tło, zaokrąglone rogi, efekt hover.
- **Modal:** Tip Modal, Auth Modal – overlay, focus trap, klawisz Esc do zamknięcia.
- **Ikony i oznaczenia:** liniowe, w kolorach brandu; brak przekazywania informacji wyłącznie kolorem.

## Responsywność i adaptacyjność
- Układ jednokolumnowy na telefonach, siatki na większych ekranach.
- Różne style nawigacji: pełny topbar na desktopie, hamburger lub dolny pasek na mobile.
- Ukrywanie dekoracji na małych ekranach (np. tło mapy w Hero).
- Tekst i komponenty skalują się przy powiększeniu do 200%.
- Lazy loading cięższych elementów, obrazy w różnych rozmiarach, wsparcie `prefers-reduced-motion`.

## Mikrointerakcje i animacje
- Fade‑in elementów Hero po załadowaniu, pulsująca strzałka zachęcająca do scrollowania.
- Efekty hover/focus dla przycisków i kart, animacja „shake” przy błędach formularza.
- Konfetti po zakończeniu Onboardingu lub udanym napiwku, podświetlenia nowych wpisów.
- Animowane wręczenie odznaki NFT dla fanów, płynne przejścia między widokami, eleganckie wskaźniki ładowania.
- Szacunek dla `prefers-reduced-motion` – możliwość wyłączenia animacji.

## Onboarding Twórcy
- Krótki kreator 3–4 kroków: profil twórcy, konfiguracja płatności, udostępnienie linku, zakończenie.
- Pasek postępu, możliwość pominięcia kroków, język zrozumiały dla osób bez wiedzy o Web3.
- Formularze z etykietami, walidacją i komunikatami błędów.
- Po ukończeniu – ekran gratulacyjny z animacją konfetti i przejściem do Panelu Twórcy.

## Publiczny profil twórcy
- Nagłówek z avatarem, nazwą i opisem, opcjonalny baner.
- Duży przycisk **Wesprzyj** otwierający Tip Modal; na mobile sticky na dole ekranu.
- Sekcje: Fan Wall (top fani), ostatnie napiwki, social proof, opcjonalne plany subskrypcji.
- Elementy zaufania: znaczek weryfikacji, liczba wspierających, odznaki NFT.
- Responsywny układ – jedna kolumna na mobile, dwie na desktopie.

## Panel Twórcy
- Dashboard: saldo USDC, szybkie statystyki, wykres trendów, lista ostatnich napiwków, alerty wymagające uwagi.
- Sidebar (desktop) lub menu hamburger (mobile) z sekcjami: Napiwki, Subskrypcje, Wypłaty, Powiadomienia, Ustawienia, Pomoc.
- Sekcja Wypłaty: dodawanie metod (konto bankowe, adres krypto), lista zleceń wypłat.
- Sekcja Subskrypcje: tworzenie planów, lista subskrybentów.
- Wszystko responsywne, z lazy loadingiem i real‑time update’ami.

## Dostępność (WCAG)
- Wysoki kontrast kolorów, minimalny tekst 14 px, zgodność z WCAG AA.
- Pełna nawigacja klawiaturą, widoczne stany focus, logiczna kolejność Tab.
- Teksty alternatywne dla obrazów, aria‑label dla ikon, role ARIA w modalach i komunikatach.
- Nie polega na kolorze przy przekazywaniu informacji, brak migających elementów.
- Szacunek dla `prefers-reduced-motion`, czytelne komunikaty błędów, brak ograniczeń czasowych bez ostrzeżeń.

---
Dokument stanowi podstawę dalszego rozwoju TipJar+ i utrzymania spójności wizualnej oraz wysokiej jakości UX w kolejnych iteracjach produktu.
