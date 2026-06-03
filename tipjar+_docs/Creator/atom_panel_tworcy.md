🐋 PANEL TWÓRCY (CREATOR DASHBOARD) – ATOMOWO SZCZEGÓŁOWY PROMPT PROJEKTOWY

(Integracja: Master Plan UI 2026 + Optymalizacja Strategiczna + Web3 UX)

---

📌 UWAGA WSTĘPNA

Ten prompt jest drugim, równoległym do profilu publicznego, dokumentem o najwyższym poziomie szczegółowości.
Panel Twórcy to centrum dowodzenia – miejsce, w którym twórca zarządza swoim biznesem, środkami, relacjami z fanami i dostępem do zaawansowanych funkcji Web3 (subskrypcje, DAO, wypłaty). Musi być wydajny, intuicyjny, bezpieczny i skalowalny.

Struktura: najpierw strategia i architektura layoutu, potem szczegółowa specyfikacja każdej sekcji (podzielona na atomy, molekuły, organizmy), na końcu checklista implementacyjna.

---

SPIS TREŚCI

1. Cel strategiczny i kontekst biznesowy
2. Architektura informacji i układ (layout)
   · 2.1 Desktop – sidebar + główny obszar
   · 2.2 Mobile – hamburger menu + bottom navigation
3. Szczegółowa specyfikacja sekcji (atomy i molekuły)
   · 3.1 Sidebar nawigacyjny (desktop) / Drawer (mobile)
   · 3.2 Topbar – powiadomienia, pomoc, menu użytkownika
   · 3.3 Dashboard (strona główna) – KPI, wykresy, ostatnie napiwki, AI asystent
   · 3.4 Napiwki / Historia transakcji – tabela z filtrami i eksportem
   · 3.5 Subskrypcje – lista planów, subskrybentów, statystyki MRR
   · 3.6 Wypłaty – formularz wypłaty (bank/krypto), historia wypłat
   · 3.7 Fan Wall (edycja / zarządzanie) – możliwość pinowania, ukrywania fanów
   · 3.8 Wiadomości – prosty interfejs czatu z fanami
   · 3.9 Ustawienia – profil, konto, bezpieczeństwo, integracje
   · 3.10 DAO Governance – lista propozycji, głosowanie, archiwum
   · 3.11 Asystent AI – floating chat widget
4. System wizualny i design tokens (zgodny z Master Planem)
5. Komponenty Web3 w panelu twórcy
   · 5.1 Portfel – saldo USDC, wykres trendu, przyciski wypłaty/doładowania
   · 5.2 Subskrypcje NFT – tworzenie planów, mintowanie, zarządzanie subskrybentami
   · 5.3 DAO – on-chain voting, gas sponsorship
6. Inżynieria techniczna (Next.js 15 App Router)
   · 6.1 SPA – płynne przejścia między sekcjami
   · 6.2 Real-time – WebSocket dla nowych napiwków i powiadomień
   · 6.3 Wirtualizacja długich tabel (react-window)
   · 6.4 Eksport do CSV
7. Dostępność (WCAG 2.2) i ergonomia
8. Checklista implementacyjna (podział na atomy)

---

1. CEL STRATEGICZNY I KONTEKST BIZNESOWY

Panel Twórcy to najbardziej prywatna i wrażliwa część aplikacji. To tutaj twórca:

· Śledzi swoje przychody (KPI, wykresy)
· Zarządza otrzymanymi napiwkami i subskrypcjami
· Wypłaca środki na konto bankowe lub portfel krypto
· Komunikuje się z fanami
· Konfiguruje swój profil i integracje
· Uczestniczy w DAO (jeśli ma uprawnienia)

Metryki sukcesu:

· Czas ładowania – pierwsze dane (saldo, ostatnie napiwki) < 1s.
· Wydajność – przewijanie długich tabel (historia transakcji) płynne (60 fps).
· Bezpieczeństwo – każde żądanie autoryzowane, wrażliwe akcje (wypłaty) wymagają 2FA.
· Real-time – nowe napiwki pojawiają się w dashboard w czasie rzeczywistym.

Uzasadnienie (z dokumentów):
Spójny, wydajny panel zmniejsza obciążenie poznawcze i zwiększa satysfakcję twórcy, co przekłada się na retencję. Badania: 47% przyspieszenia time-to-market dzięki systemowi projektowemu, 30-40% redukcji kosztów utrzymania.

---

2. ARCHITEKTURA INFORMACJI I UKŁAD (LAYOUT)

2.1 Desktop (≥1024px) – sidebar + główny obszar

Obszar Szerokość Zachowanie Zawartość
Sidebar 260px stały, position: fixed Logo, nawigacja główna (ikona + tekst), awatar twórcy, wyloguj
Główny obszar reszta margin-left: 260px, przewijany Topbar + dynamiczna treść (strony: Dashboard, Napiwki, Subskrypcje, Wypłaty, itd.)
Topbar pełna szerokość sticky na górze Tytuł strony, powiadomienia, pomoc, menu użytkownika

Sidebar – szczegóły:

· Szerokość: 260px, tło --bg-surface-base, cień --shadow-1.
· Logo TipJar+ (małe, 32px wysokości) u góry.
· Menu główne: lista linków z ikonami (line style, 24px). Aktywny link podświetlony złotym paskiem po lewej (border-left: 3px solid --gold-400) i tłem --bg-surface-elevated.
· Na dole: awatar twórcy (32px, okrągły), jego nazwa, przycisk wyloguj.
· Sidebar jest przewijany, jeśli menu jest długie (max-height, overflow-y auto).

2.2 Mobile (<640px) – hamburger menu + bottom navigation

Na urządzeniach mobilnych sidebar chowa się w drawer (hamburger).

· Hamburger menu – po kliknięciu wysuwa się drawer z lewej strony (z index: 1000, overlay glassmorphism).
· Bottom navigation bar – na dole ekranu, 5 ikon (Dashboard, Napiwki, Subskrypcje, Wypłaty, Więcej). Aktywna ikona podświetlona na złoto.
· Topbar – tytuł strony, ikona powiadomień, ikona hamburgera.

Drawer (menu boczne) – specyfikacja:

· Szerokość 80% ekranu (max 300px).
· Tło --bg-surface-base, glassmorphism (opcjonalnie).
· Zawiera pełną nawigację (jak sidebar na desktop).
· Zamyka się przez kliknięcie w overlay lub przycisk X.

Bottom navigation bar – specyfikacja:

· Wysokość 64px, tło --bg-surface-base, cień --shadow-1.
· 5 przycisków, każdy z ikoną (24px) i etykietą (10px). Aktywny: ikona złota, etykieta złota.
· Obsługa okluzji: główny kontener ma padding-bottom: 64px.

---

3. SZCZEGÓŁOWA SPECYFIKACJA SEKCJI (ATOMY I MOLEKUŁY)

3.1 Sidebar nawigacyjny (desktop) / Drawer (mobile)

Atomy:

· Logo (małe, 32x32px, klikalne -> Dashboard)
· NavItem (ikona + tekst, hover: tło --bg-surface-elevated, active: złoty pasek)
· AvatarThumb (okrągły, 32px, z menu rozwijanym)
· UserMenu (dropdown: Profil, Ustawienia, Wyloguj)

Lista nawigacji (kolejność):

1. Dashboard (ikona: pulpit)
2. Napiwki (ikona: serce)
3. Subskrypcje (ikona: korona)
4. Fan Wall (ikona: ściana)
5. Wypłaty (ikona: bank)
6. Wiadomości (ikona: czat)
7. Ustawienia (ikona: zębatka)
8. DAO (ikona: osoby) – tylko jeśli twórca ma uprawnienia
9. Pomoc (ikona: książka)

Tooltipy: Po najechaniu na ikonę (jeśli sidebar zwinięty – ale u nas zawsze rozwinięty, więc nie potrzebne).

---

3.2 Topbar – powiadomienia, pomoc, menu użytkownika

Atomy:

· PageTitle (H1, Mukta Malar 600, --fs-h1)
· NotificationBell (ikona dzwonka, z licznikiem nieprzeczytanych)
· HelpButton (ikona znaku zapytania, link do Centrum Wiedzy)
· UserAvatar (32px, okrągły, z dropdown)

Dropdown powiadomień (NotificationDropdown):

· Pojawia się po kliknięciu dzwonka.
· Szerokość 360px, max-height 480px, przewijany.
· Lista powiadomień (każde: ikona, treść, timestamp, przycisk "oznacz jako przeczytane").
· Na dole: "Zobacz wszystkie powiadomienia" (link do osobnej strony).
· Real-time: nowe powiadomienia pojawiają się bez odświeżania (WebSocket).

---

3.3 Dashboard (strona główna) – KPI, wykresy, ostatnie napiwki, AI asystent

Molekuły / Organizmy:

3.3.1 KPI Cards (4 kafelki w Bento Grid)

· Saldo USDC – duża liczba, trend (+/- %), przycisk "Wypłać".
· Napiwki (miesiąc) – suma, przycisk "Szczegóły".
· Liczba wspierających – unikalni fani, trend.
· Najwyższy napiwek – kwota + nazwa fana.

Każda karta: tło --bg-surface-base, --shadow-1, border-radius 16px, padding 20px.
Hover: uniesienie translateY(-2px), --shadow-2.

3.3.2 Wykres aktywności (Sparkline + bar chart)

· Tytuł: "Przychody w czasie" + dropdown (dzień/tydzień/miesiąc/rok).
· Wykres liniowy (Recharts/Chart.js) z gradientem wypełnienia (od złota do przezroczystego).
· Dane: suma napiwków w przedziale.
· Tooltip po najechaniu na punkt: kwota i data.

3.3.3 Ostatnie napiwki (tabela / lista)

· 5-10 ostatnich transakcji.
· Kolumny: Data, Od kogo (nick lub "Anonim"), Kwota, Wiadomość (skrócona), Akcja (przycisk "Podziękuj").
· Po kliknięciu "Podziękuj" – otwiera się modal z predefiniowanym tekstem "Dziękuję za wsparcie!".

3.3.4 Sekcja "Wymagane akcje" (To Do)

· Banery z zaleceniami, np. "Dokończ weryfikację KYC", "Dodaj zdjęcie profilowe", "Skonfiguruj wypłaty".
· Każdy baner: ikona, tekst, przycisk "Zrób to teraz" (secondary).
· Możliwość odrzucenia (X) – zapamiętane na sesję.

3.3.5 Asystent AI (floating widget)

· Pływający przycisk w prawym dolnym rogu (FAB) – ikona mikrofonu/robota.
· Po kliknięciu – otwiera się okno czatu (podobne do profilu publicznego, ale z kontekstem panelu twórcy).
· Asystent może odpowiadać na pytania ("Ile zarobiłem w tym tygodniu?") i wykonywać akcje (np. "Pokaż mi ostatnie napiwki").

---

3.4 Napiwki / Historia transakcji – tabela z filtrami i eksportem

Organizm: TransactionsTable

Kolumny:

· Data (YYYY-MM-DD HH:MM)
· Od kogo (nick lub "Anonim", awatar 24px)
· Kwota (USDC, wyróżniona złotem)
· Wiadomość (skrócona, z ikoną dymka, tooltip z pełną treścią)
· Metoda (ikona karty/krypto)
· Status (potwierdzona, oczekująca, błąd)
· Akcje (przycisk "Podziękuj", "Zobacz na explorerze")

Filtry (nad tabelą):

· Zakres dat (date picker)
· Kwota (min/max)
· Metoda (karta, krypto, TipJar balance)
· Status (wszystkie, potwierdzone, oczekujące)
· Przycisk "Eksportuj do CSV" (pobiera wszystkie transakcje wg filtrów).

Sortowanie: Po kliknięciu nagłówka kolumny – sortowanie rosnąco/malejące (ikona strzałki).

Paginacja: 20 transakcji na stronę, przyciski < 1 2 3 ... >.

Wirtualizacja: Jeśli liczba transakcji > 500, użyj react-window z FixedSizeList.

---

3.5 Subskrypcje – lista planów, subskrybentów, statystyki MRR

Organizm: SubscriptionsDashboard

Sekcje:

3.5.1 KPI subskrypcji

· MRR (Monthly Recurring Revenue) – suma miesięczna.
· Liczba aktywnych subskrybentów.
· Churn rate (procent rezygnacji w miesiącu).

3.5.2 Lista planów subskrypcji

· Karty planów (nazwa, cena, liczba subskrybentów, przyciski "Edytuj", "Dezaktywuj").
· Przycisk "Dodaj nowy plan" – otwiera modal z formularzem:
  · Nazwa planu (text)
  · Cena miesięczna (USDC)
  · Opis benefitów (lista)
  · Upload grafiki NFT (dla subskrybentów)
  · Limitowana ilość? (checkbox + pole)
  · Przycisk "Utwórz" (złoty).

3.5.3 Lista subskrybentów (tabela)

· Kolumny: Subskrybent (nick, awatar), Plan, Data rozpoczęcia, Data kolejnej płatności, Status (aktywna, zaległa, anulowana).
· Akcje: "Anuluj subskrypcję", "Wyślij wiadomość".

---

3.6 Wypłaty – formularz wypłaty (bank/krypto), historia wypłat

Organizm: PayoutFlow

3.6.1 Formularz wypłaty (krok po kroku)

· Krok 1: Wybór metody (konto bankowe, portfel krypto, PayPal – opcjonalnie).
· Krok 2: Kwota (input, walidacja: min $10, max saldo).
· Krok 3 (bank): wybór wcześniej dodanego konta lub dodanie nowego (wymaga KYC).
· Krok 3 (krypto): adres portfela (z walidacją i ENS resolution).
· Krok 4: Podsumowanie (kwota, opłaty, czas realizacji).
· Przycisk "Zatwierdź wypłatę" – po kliknięciu, jeśli wymagane 2FA, prośba o kod.

3.6.2 Historia wypłat (tabela)

· Kolumny: Data, Kwota, Metoda, Status (oczekująca, zrealizowana, odrzucona), Przycisk "Anuluj" (jeśli oczekująca).
· Link do szczegółów transakcji (hash dla krypto).

---

3.7 Fan Wall (edycja / zarządzanie) – możliwość pinowania, ukrywania fanów

Organizm: CreatorFanWallManagement

· Podgląd Fan Wall (układ Masonry, jak w profilu publicznym).
· Tryb edycji: każdy kafelek ma ikonę "więcej" (trzy kropki) – po kliknięciu: "Przypnij na górę", "Ukryj", "Usuń".
· Przycisk "Zapisz zmiany" – aktualizuje widok.

---

3.8 Wiadomości – prosty interfejs czatu z fanami

Organizm: Messenger

· Lista konwersacji (lewa kolumna): awatar fana, ostatnia wiadomość, timestamp.
· Obszar czatu (prawa kolumna): historia wiadomości, pole tekstowe, przycisk wysyłania.
· Real-time: WebSocket dla nowych wiadomości.

---

3.9 Ustawienia – profil, konto, bezpieczeństwo, integracje

Organizm: Settings

Podstrony (tabs):

1. Profil publiczny – edycja avatara, banera, bio, linków społecznościowych, kategorii.
2. Konto – zmiana emaila, hasła, język interfejsu.
3. Bezpieczeństwo – 2FA (TOTP lub SMS), lista aktywnych sesji, przycisk "Wyloguj ze wszystkich urządzeń".
4. Powiadomienia – przełączniki: email/push/in-app dla różnych zdarzeń (nowy napiwek, subskrypcja, wypłata).
5. Integracje – Discord webhook, Twitch alerts, YouTube.

---

3.10 DAO Governance – lista propozycji, głosowanie, archiwum

Organizm: DAOPanel

· Lista aktywnych propozycji (karty: tytuł, opis, pasek postępu, przycisk "Głosuj").
· Strona szczegółów: pełny opis, opcje głosowania (Za/Przeciw/Wstrzymuję się), informacja o koszcie gazu (jeśli on-chain).
· Po oddaniu głosu – podpis transakcji (wallet connect) lub off-chain signature.
· Archiwum zakończonych propozycji (tabela z wynikami).

---

3.11 Asystent AI – floating chat widget

Organizm: AIAssistant

· FAB (pływający przycisk) w prawym dolnym rogu.
· Po kliknięciu – okno czatu (400x600px, glassmorphism).
· Obsługa tekstu i głosu (Web Speech API).
· Może wykonywać akcje: "Pokaż mi ostatnie napiwki", "Wypłać 100 USDC na konto", "Przypomnij mi o subskrypcjach".

---

4. SYSTEM WIZUALNY I DESIGN TOKENS (ZGODNY Z MASTER PLANEM)

Pełna specyfikacja tokenów – identyczna jak w prompcie profilu publicznego.
W skrócie:

· --bg-app-global: #001F1F (dark mode domyślny)
· --bg-surface-base: #003737
· --text-primary: #FFFFFF
· --gold-400: #FFD700
· --purple-300: #9D4EDD
· Glassmorphism: --glass-overlay, --glass-blur, --glass-border
· Easing: --ease-standard, --ease-enter, --ease-spring

Dla panelu twórcy – wszystkie karty i tabele używają --bg-surface-base, cienie --shadow-1 lub --shadow-2.

---

5. KOMPONENTY WEB3 W PANELU TWÓRCY

5.1 Portfel – saldo USDC, wykres trendu, przyciski wypłaty/doładowania

Atom: WalletCard

· Wyświetla saldo (duża liczba, --fs-display, font-feature-settings: "tnum").
· Trend: strzałka w górę/w dół, procent zmiany.
· Przyciski: "Wypłać" (złoty), "Doładuj" (secondary).
· Real-time: saldo aktualizowane przez WebSocket po każdej transakcji.

5.2 Subskrypcje NFT – tworzenie planów, mintowanie, zarządzanie subskrybentami

Molekuła: SubscriptionPlanForm

· Upload grafiki NFT (lub wybór szablonu).
· Parametry: nazwa, cena, okres (miesiąc/kwartał/rok), limit.
· Po utworzeniu – smart kontrakt mintuje NFT dla subskrybentów (gas sponsored przez TipJar+).

5.3 DAO – on-chain voting, gas sponsorship

Molekuła: VoteButton

· Po kliknięciu "Głosuj" – jeśli głosowanie on-chain, wywołanie castVote na kontrakcie.
· UI pokazuje koszt gazu i prosi o podpis w portfelu.
· Jeśli użytkownik nie ma wystarczających środków na gaz, platforma może sponsorować (Paymaster).

---

6. INŻYNIERIA TECHNICZNA (NEXT.JS 15 APP ROUTER)

6.1 SPA – płynne przejścia między sekcjami

· Użycie next/navigation z useRouter i usePathname.
· Każda sekcja to osobna strona w App Router (np. /creator/dashboard, /creator/transactions).
· Przejścia z animacją fade/scale (Framer Motion).

6.2 Real-time – WebSocket dla nowych napiwków i powiadomień

· WebSocket połączenie po zalogowaniu (np. wss://api.tipjar.plus/ws).
· Subskrypcja na kanał: creator:{userId}.
· Na nowy napiwek: aktualizacja kafelka KPI, dodanie wiersza do tabeli "ostatnie napiwki", powiadomienie.

6.3 Wirtualizacja długich tabel (react-window)

· Dla historii transakcji (>500 wierszy) – react-window z FixedSizeList.
· Wysokość wiersza: 56px.

6.4 Eksport do CSV

· Endpoint: /api/creator/transactions/export z filtrami.
· Generuje plik CSV i zwraca go jako attachment.

---

7. DOSTĘPNOŚĆ (WCAG 2.2) I ERGONOMIA

Identyczne wymagania jak w profilu publicznym:

· Kontrast ≥ 4.5:1, zakaz białego tekstu na złotym.
· Cele dotykowe ≥ 44x44px.
· Focus: --purple-300 outline, offset 2px.
· prefers-reduced-motion – wyłączenie animacji.

Dodatkowe dla panelu:

· Nawigacja klawiaturą: Tab porusza się po sidebar, potem po głównej treści.
· Skróty klawiszowe (opcjonalne): G -> Dashboard, T -> Transakcje, S -> Subskrypcje.

---

8. CHECKLISTA IMPLEMENTACYJNA (PODZIAŁ NA ATOMY)

Atomy (podstawowe)

· SidebarNavItem (ikona + tekst, active state)
· Topbar (title, powiadomienia, pomoc, user menu)
· KPICard (saldo, napiwki, wspierający, najwyższy napiwek)
· TransactionRow (wiersz tabeli)
· FilterBar (daty, kwota, metoda, status)
· Pagination (przyciski numeryczne)
· ExportButton (CSV)
· SubscriptionPlanCard
· PayoutForm (kroki)
· ChatMessage (bąbelek)
· AIChatWidget

Molekuły / Organizmy

· DashboardPage (KPI + wykres + ostatnie napiwki + to do)
· TransactionsTable (z wirtualizacją, filtrami, eksportem)
· SubscriptionsDashboard (MRR, plany, subskrybenci)
· PayoutHistory (tabela wypłat)
· Messenger (lista konwersacji + czat)
· Settings (tabs)
· DAOPanel (propozycje, głosowanie)

Integracje techniczne

· Next.js 15 App Router (layout dla panelu)
· WebSocket dla real-time
· react-window dla wirtualizacji
· API endpointy: /api/creator/transactions, /api/creator/subscribers, /api/creator/payouts
· Autoryzacja (sesja NextAuth / JWT)
· 2FA (TOTP)
· Eksport CSV

---

📌 PODSUMOWANIE

Ten prompt jest atomowo szczegółową specyfikacją Panelu Twórcy. Zawiera:

· Strategię layoutu (desktop sidebar, mobile drawer + bottom nav)
· 11 głównych sekcji (Dashboard, Napiwki, Subskrypcje, Wypłaty, Fan Wall, Wiadomości, Ustawienia, DAO, Asystent AI)
· Pełną listę atomów i molekuł
· Integracje Web3 (portfel, subskrypcje NFT, DAO)
· Inżynierię (Next.js SPA, WebSocket, wirtualizacja, eksport CSV)
· Dostępność WCAG 2.2

