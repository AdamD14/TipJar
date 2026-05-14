🐋 PUBLICZNY PROFIL TWÓRCY – ATOMOWO SZCZEGÓŁOWY PROMPT PROJEKTOWY

(Integracja: Master Plan UI 2026 + Optymalizacja Strategiczna + Profil Web3 2025)

---

📌 UWAGA WSTĘPNA

Ten prompt jest najbardziej szczegółową specyfikacją, jaką kiedykolwiek stworzyłem.
Zawiera wszystkie warstwy: psychologię społeczną, architekturę informacji, design system (tokeny, glassmorphism, masonry), Web3 UX (ENS, stany transakcji, network switch), inżynierię Next.js (SSG + CSR + OG Images + virtual scrolling) oraz dostępność WCAG 2.2.

Jeśli nie zmieści się w jednej wiadomości – zostanie podzielony na atomy i wysłany sekwencyjnie.

---

SPIS TREŚCI (wersja pełna)

1. Cel strategiczny i kontekst biznesowy
2. Architektura informacji i układ (layout)
   · 2.1 Desktop – dwukolumnowy podział kompetencji
   · 2.2 Mobile – linearyzacja, strefa kciuka i obsługa okluzji
3. Szczegółowa specyfikacja sekcji (atomy i molekuły)
   · 3.1 Nagłówek (Hero Section) – Glassmorphism 2.0
   · 3.2 Sekcja "O mnie" – bio rozszerzone i media
   · 3.3 Wieczna Ściana Fanów (Eternal Fan Wall) – układ Masonry
   · 3.4 Ostatnie wsparcia (Live Ticker) – real-time
   · 3.5 Panel Wesprzyj (Sticky na desktop, Bottom Sheet na mobile)
   · 3.6 Subskrypcje NFT i statystyki publiczne
4. System wizualny i design tokens (zgodny z Master Planem)
   · 4.1 Kolory – skale prymitywne i semantyczne
   · 4.2 Typografia – płynne skalowanie (clamp) i fonty
   · 4.3 Glassmorphism – parametry rozmycia i obrysu
   · 4.4 Cienie, animacje (easing), haptyka
5. Komponenty Web3 – atomowa specyfikacja
   · 5.1 Wyświetlanie adresu portfela (truncation, ENS, copy, QR)
   · 5.2 Modal płatności – stany przejściowe (podpis, mempool, potwierdzenie)
   · 5.3 Network switch – wymuszenie poprawnej sieci
   · 5.4 Proof of Support NFT – miniatury i modal szczegółów
6. Inżynieria techniczna (Next.js 15 App Router)
   · 6.1 Strategia renderowania hybrydowego (SSG + CSR + real-time)
   · 6.2 Dynamiczne generowanie OG Image (@vercel/og)
   · 6.3 Wirtualizacja długich list (react-window / tanstack-virtual)
   · 6.4 Sanityzacja danych i bezpieczeństwo
7. Dostępność (WCAG 2.2) i ergonomia
   · 7.1 Kontrast, cele dotykowe, focus
   · 7.2 prefers-reduced-motion i alternatywy
8. Checklista implementacyjna (podział na atomy)

---

1. CEL STRATEGICZNY I KONTEKST BIZNESOWY

Publiczny Profil Twórcy to najważniejsza strona konwersji w TipJar+.
Jej zadanie: w ciągu pierwszych 3 sekund zbudować zaufanie i zachęcić do wsparcia finansowego.

Dane kluczowe (z dokumentów):

· 89% użytkowników zmienia dostawcę usług finansowych ze względu na UX.
· 68% porzuca produkty niespójne wizualnie.
· W Web3 UX jest największą barierą adopcji – interfejs musi ukryć złożoność blockchaina (intent-based UX, ERC-4337).

Metryki sukcesu:

· Współczynnik konwersji (CR) – kliknięcie "Wesprzyj" → ukończona transakcja.
· Czas sesji (Time on Site) – im dłużej, tym lepiej (Fan Wall Masonry).
· Współczynnik odrzuceń (Bounce Rate) – minimalny.

---

2. ARCHITEKTURA INFORMACJI I UKŁAD (LAYOUT)

2.1 Desktop (≥1024px) – dwukolumnowy podział kompetencji

Zasada: lewa kolumna = narracja i dowód społeczny, prawa kolumna = kotwica transakcyjna (sticky).

Kolumna Szerokość Zachowanie Zawartość
Lewa 60-70% przewijana (scroll) Hero, Bio, Fan Wall (Masonry), Ostatnie wsparcia
Prawa 30-40% position: sticky; top: 24px Panel Wesprzyj, Subskrypcje, Statystyki

Uzasadnienie sticky (Efekt Czystej Ekspozycji):
Im dłużej użytkownik widzi przycisk "Wesprzyj" w polu peryferyjnym podczas przewijania Fan Wall, tym bardziej naturalna staje się decyzja o kliknięciu.

---

2.2 Mobile (<640px) – linearyzacja, strefa kciuka i obsługa okluzji

Transformacja: dwie kolumny zamieniają się w jedną kolumnę w następującej kolejności:

1. Nagłówek (Hero)
2. Bio
3. Fan Wall (Masonry)
4. Ostatnie wsparcia
5. (Opcjonalnie) Subskrypcje i statystyki

Sticky Bottom Bar (panel wesprzyj):

· Na dole ekranu, pełna szerokość, wysokość 72px.
· Wykorzystuje Glassmorphism (patrz sekcja 4.3).
· Zawiera: przycisk CTA "Wesprzyj" (złoty, pełna szerokość) + opcjonalnie mikrodane ("Ostatni napiwek: 2 min temu").

⚠️ Krytyczne: Problem okluzji (occlusion)
Aby ostatni element Fan Wall nie chował się pod paskiem, kontener główny (<main>) musi mieć dynamiczny padding-bottom równy wysokości paska (72px). Implementacja CSS:

```css
@media (max-width: 640px) {
  main {
    padding-bottom: 72px; /* tyle co wysokość bottom bar */
  }
  .sticky-bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 72px;
    z-index: var(--z-fab); /* 200 */
    background: var(--glass-overlay);
    backdrop-filter: var(--glass-blur);
    border-top: var(--glass-border);
  }
}
```

---

3. SZCZEGÓŁOWA SPECYFIKACJA SEKCJI (ATOMY I MOLEKUŁY)

3.1 Nagłówek (Hero Section) – Glassmorphism 2.0

Atomy:

· Avatar (okrągły, 120px desktop / 80px mobile, ramka verified)
· Nazwa twórcy (H1, Mukta Malar 600, --fs-h1)
· Znacznik weryfikacji (ikona złotego checka, tooltip)
· Chipy kategorii (border-radius: 999px, tło --purple-300 z opacity 0.2)
· Bio skrócone (max 2 linie, przycisk "więcej")
· Linki społecznościowe (ikony 24px, stroke 1.5px, hover gold)
· Przycisk Obserwuj (secondary outline purple)

Tło banera (opcjonalne):

· Jeśli twórca dodał baner: obrazek + nakładka glass (--glass-overlay, --glass-blur).
· Jeśli brak: domyślny gradient szklisty + abstrakcyjny wzór 3D (z promptu 1.5).

Interakcje:

· Hover na awatarze: tooltip z pełną nazwą.
· Kliknięcie "więcej" w bio: płynne rozwinięcie (--ease-enter, 300ms).

---

3.2 Sekcja "O mnie" – bio rozszerzone i media

Molekuła: karta (--bg-surface-base, --shadow-2, padding 24px).

Zawartość:

· Pełne bio (wspiera Markdown: akapity, listy, linki). Czcionka --fs-body-m, IBM Plex 400, --text-secondary.
· Osadzone media: ostatni film z YouTube (iframe responsive), galeria zdjęć (grid 2-3 kolumny z lightboxem).
· Wyróżnienia: lista osiągnięć z ikonami trophy (jeśli twórca dodał).

Zachowanie: rozwija się tylko jeśli bio jest długie – przycisk "Pokaż mniej".

---

3.3 Wieczna Ściana Fanów (Eternal Fan Wall) – układ Masonry

To jest kluczowa zmiana względem prostych list.
Zamiast sztywnej siatki (grid) – układ cegiełkowy (Masonry) z różnymi wysokościami kafelków.

Dlaczego Masonry?

· Optymalizuje przestrzeń wertykalną.
· Psychologia odkrywania – nieregularność zachęca do dłuższego skanowania.
· Wzrost czasu sesji (Time on Site).

Implementacja CSS (priorytetowo):

```css
.fan-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-template-rows: masonry; /* CSS Grid Level 3 – eksperymentalnie */
  gap: 16px;
}
```

Fallback dla przeglądarek: JavaScript (react-masonry-css) lub CSS Columns z odpowiednim polyfillem.

Typy kafelków (różne wysokości):

1. Tekst krótki ("Dzięki za stream!") – wysokość ~80px.
2. Tekst długi (kilka zdań) – wysokość ~160px.
3. Tekst + obrazek NFT (miniatura) – wysokość ~240px.
4. Tekst + odznaka rzadkości (gold/silver/bronze) – wysokość ~120px.

Zawartość każdego kafelka:

· Awatar fana (okrągły, 32px)
· Nazwa fana (lub "Anonimowy")
· Treść wiadomości (jeśli była)
· Kwota wsparcia (złota, bold)
· Data (względna: "2 godz. temu")
· Mała ikona 🔗 (link do Arweave, tooltip)

Wirtualizacja: Przy >200 kafelkach – użyj react-window lub tanstack-virtual aby renderować tylko widoczne.

Integracja z Arweave: Każdy kafelek ma w metadanych txId. Ikona 🔗 otwiera modal z linkiem do transakcji.

---

3.4 Ostatnie wsparcia (Live Ticker) – real-time

Molekuła: karta z nagłówkiem "Ostatnia aktywność" i ikoną zegara.

Lista (max 10 wpisów):

· Każdy wpis: ikona serca (złota), tekst "[Nick] wsparł(a) [kwota USDC]", timestamp.
· Jeśli fan anonimowy: "Anonimowy fan wsparł..."
· Jeśli fan zostawił wiadomość: ikona dymka, po najechaniu tooltip z wiadomością.

Real-time:

· WebSocket lub polling co 10s.
· Nowy wpis pojawia się na górze listy z animacją fade-in-up (0.3s, --ease-enter) i delikatnym podświetleniem (--success-light przez 2s).

---

3.5 Panel Wesprzyj (Sticky na desktop, Bottom Sheet na mobile)

3.5.1 Wersja desktopowa (sticky right column)

Karta: --bg-surface-base, --shadow-modal, border-radius: 24px, padding: 24px.

Zawartość:

· Nagłówek: "Wesprzyj [Nazwa Twórcy]" + ikona serca.
· Szybki wybór kwoty: 5 przycisków ($1, $5, $10, $20, $50). Aktywny: tło --gold-400, tekst --teal-800.
· Pole własnej kwoty: input z walidacją (min $0.10, max $10000), obok wyświetlacz w USDC.
· Przycisk CTA: duży, złoty, z ikoną serca, etykieta "Wyślij napiwek". Stan loading: spinner.
· Metody płatności: małe ikony (karta, portfel krypto, TipJar balance) z opisem "Bezpieczne płatności".
· Accordion "Dodaj szczegóły": pole wiadomości, checkbox "Proof of Support NFT" (domyślnie zaznaczony), checkbox "Pozostań anonimowy".

3.5.2 Wersja mobilna (Bottom Sheet)

· Na breakpoincie <640px, przycisk CTA przenosi się do sticky bottom bar.
· Kliknięcie w przycisk otwiera Bottom Sheet (85% wysokości ekranu) z pełnym formularzem płatności.
· Bottom Sheet wykorzystuje Glassmorphism (patrz sekcja 4.3) i zamyka się przez swipe down lub przycisk X.

---

3.6 Subskrypcje NFT i statystyki publiczne

Subskrypcje: karta pod panelem wesprzyj (lub osobna sekcja).
Lista planów (max 3) – każdy plan jako mała karta z nazwą, ceną miesięczną, listą benefitów (ikona check). Przycisk "Subskrybuj" (secondary purple).

Statystyki publiczne: karta z liczbą obserwujących, łączną kwotą zebranych napiwków, liczbą aktywnych subskrybentów. Dane anonimowe, tylko dla społecznego dowodu.

---

4. SYSTEM WIZUALNY I DESIGN TOKENS (ZGODNY Z MASTER PLANEM)

4.1 Kolory – skale prymitywne i semantyczne

Pełna tabela w Master Planie. Najważniejsze:

Token Light Mode Dark Mode (default)
--bg-app-global #F2F7F7 #001F1F
--bg-surface-base #FFFFFF #003737
--text-primary #003737 #FFFFFF
--text-secondary #005959 #D6EBEB
--gold-400 #FFD700 #FFD700
--purple-300 #9D4EDD #9D4EDD
--error-base #FF5252 #FFB4AB
--success-base #00E676 #69F0AE

Zakazane: biały tekst na złotym tle (Critical Fail, kontrast poniżej 4.5:1).

---

4.2 Typografia – płynne skalowanie (clamp)

```css
--fs-display: clamp(2.5rem, 4vw + 1.5rem, 4rem);   /* Mukta 700 */
--fs-h1: clamp(2rem, 1.5vw + 1.6rem, 2.5rem);      /* Mukta 600 */
--fs-body-m: 1rem;                                  /* IBM Plex 400 */
--fs-caption: 0.75rem;                             /* IBM Plex 500 */
```

Wymuszenie dla kwot: font-feature-settings: "tnum" (tabular figures, jednakowa szerokość cyfr).

Fonty: Mukta Malar (400,500,600,700) dla nagłówków i przycisków. IBM Plex Sans (300,400,500,600) dla treści i tabel.

---

4.3 Glassmorphism – parametry rozmycia i obrysu

```css
--glass-overlay: rgba(0, 31, 31, 0.44);
--glass-blur: blur(20px) saturate(200%);
--glass-border: 1px solid rgba(255, 255, 255, 0.125);
```

Zastosowanie:

· Tło banera (jeśli brak obrazka)
· Sticky bottom bar na mobile
· Bottom Sheet (szuflada dolna)
· Modal płatności (opcjonalnie)

Uwaga: Nie stosować glassmorphism na dużych powierzchniach tekstowych – tylko na elementach interfejsu.

---

4.4 Cienie, animacje (easing), haptyka

Cienie (elevation):

```css
--shadow-1: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
--shadow-2: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255,255,255,0.05);
--shadow-modal: 0 24px 48px -12px rgba(0, 0, 0, 0.7);
```

Easing (fizyka ruchu):

```css
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);    /* 200ms – hover */
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);        /* 300-400ms – modale */
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275); /* 400ms – toggle, FAB */
```

Haptyka (tylko mobile, jeśli pozwoli użytkownik):

· Sukces transakcji: krótkie, rosnące impulsy.
· Błąd: krótkie, ostre impulsy.
· Interakcja zwykła (przesuwanie suwaka): ekstremalnie krótki sygnał (10-20 ms).

---

5. KOMPONENTY WEB3 – ATOMOWA SPECYFIKACJA

5.1 Wyświetlanie adresu portfela (truncation, ENS, copy, QR)

Atom: WalletAddress

Zachowanie:

1. Jeśli twórca ma zarejestrowaną domenę ENS (np. tworca.eth) – wyświetlamy ją priorytetowo.
2. W przeciwnym razie skracamy adres: 0x12...89AB (pierwsze 6 znaków, ostatnie 4).
3. Kliknięcie w adres kopiuje pełny adres do schowka + pojawia się toast "Skopiowano!".
4. Na mobile, długie przytrzymanie (lub osobny przycisk) otwiera modal z kodem QR do szybkiego skanowania.

Tooltip: "Kliknij, aby skopiować adres portfela"

---

5.2 Modal płatności – stany przejściowe (podpis, mempool, potwierdzenie)

Organizm: PaymentModal

Stany (kolejność):

1. Wybór metody i kwoty (stan początkowy).
2. Oczekiwanie na podpis w portfelu – spinner, tekst "Oczekiwanie na potwierdzenie w Twoim portfelu...".
3. Transakcja w mempoolu – ikona zegara, tekst "Transakcja wysłana. Oczekiwanie na potwierdzenie sieci...", link do eksploratora (Etherscan).
4. Potwierdzono – ikona zielonego checka, tekst "Transakcja zatwierdzona! 🎉", przycisk "Zamknij".
5. Błąd – czerwona ikona, tekst błędu (np. "Odrzucono w portfelu", "Niewystarczające środki"), przycisk "Spróbuj ponownie".

Network switch: Jeśli użytkownik jest na złej sieci (np. Ethereum zamiast Polygon), przed krokiem 2 pojawia się ostrzeżenie (żółty pasek) i przycisk "Zmień sieć w portfelu".

---

5.3 Network switch – wymuszenie poprawnej sieci

Molekuła: NetworkWarning

Wygląd: żółty pasek (--warning-base) z ikoną ostrzeżenia, tekst "Nieprawidłowa sieć. TipJar+ wymaga Polygon. Zmień sieć w swoim portfelu."
Akcja: po kliknięciu przycisku "Zmień sieć" – wywołanie window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x89' }] }).

---

5.4 Proof of Support NFT – miniatury i modal szczegółów

Atom: NFTThumbnail (kwadrat 80x80px, border-radius 12px, z gradientem rzadkości).

Modal szczegółów:

· Duży obrazek NFT (400x400px).
· Metadane: nazwa, twórca, data, kwota, wiadomość.
· Link do eksploratora (Arweave/Etherscan).
· Przycisk "Udostępnij na Twitterze" (generuje grafikę z tekstem).

---

6. INŻYNIERIA TECHNICZNA (NEXT.JS 15 APP ROUTER)

6.1 Strategia renderowania hybrydowego (SSG + CSR + real-time)

Komponent Strategia Next.js API
Nagłówek, Bio, Linki SSG (Static Site Generation) generateStaticParams, ISR revalidate: 3600
Status weryfikacji SSG + revalidation ISR
Fan Wall (treść) CSR (Client-Side Rendering) useSWR lub react-query + API route
Ostatnie napiwki CSR + real-time WebSocket (useEffect + new WebSocket) lub polling co 10s

SEO: Crawler Google otrzymuje w pełni wyrenderowany szkielet strony z danymi biograficznymi (SSG). Dzięki temu profil indeksuje się na frazy związane z nazwą twórcy.

Skeleton screens: Aby uniknąć CLS, podczas ładowania Fan Wall wyświetlane są pulsujące bloki o zbliżonych kształtach (skeleton).

---

6.2 Dynamiczne generowanie OG Image (@vercel/og)

Endpoint: /app/api/og/route.tsx

Parametry: ?username=xxx&stats=true

Generowanie:

· Użycie @vercel/og (Satori + HTML/CSS do PNG).
· Czcionki ładowane z Google Fonts (Mukta Malar, IBM Plex).
· Tło: dark mode gradient, awatar twórcy (z IPFS), nazwa, łączna kwota wsparcia (opcjonalnie).
· Edge Runtime (szybkie generowanie).

Integracja z metadata: W pliku opengraph-image.tsx – dynamiczne pobieranie danych twórcy i generowanie obrazka.

---

6.3 Wirtualizacja długich list (react-window / tanstack-virtual)

Problem: Fan Wall może zawierać >1000 wpisów. Renderowanie wszystkich naraz zamrozi przeglądarkę.

Rozwiązanie: react-window z VariableSizeList (bo kafelki mają różne wysokości w Masonry).

Implementacja:

· Zmierz wysokość każdego kafelka po załadowaniu (Ref).
· Przekaż do VariableSizeList jako itemSize.
· Renderuj tylko widoczne kafelki.

Fallback: Jeśli Masonry CSS nie jest wspierany – wirtualizacja z react-masonry-css + react-window.

---

6.4 Sanityzacja danych i bezpieczeństwo

· XSS: Ponieważ Fan Wall wyświetla UGC, używaj DOMPurify do sanityzacji treści przed wstrzyknięciem do DOM.
· Rate limiting: API do pobierania Fan Wall powinno mieć rate limiting, aby uniknąć ataków DDoS.
· CORS: Tylko dozwolone domeny.

---

7. DOSTĘPNOŚĆ (WCAG 2.2) I ERGONOMIA

7.1 Kontrast, cele dotykowe, focus

· Kontrast: Każdy tekst (również na przyciskach) ≥ 4.5:1. Zakaz białego tekstu na złotym tle.
· Cele dotykowe: Minimum 44x44px (realizowane przez padding lub pseudoelement ::after).
· Focus: Widoczny pierścień w kolorze --purple-300 (grubość 2px, offset 2px). Nie usuwać outline bez zastąpienia.
· Focus not obscured: Aktywny element nigdy nie może być przesłonięty przez sticky header lub bottom bar.

7.2 prefers-reduced-motion i alternatywy

Jeśli użytkownik w systemie operacyjnym włączył ograniczenie ruchu (prefers-reduced-motion: reduce), aplikacja musi:

· Wyłączyć wszystkie animacje przesunięć (pozostawić tylko fade).
· Wyłączyć efekty paralaksy.
· Wyłączyć haptykę (jeśli dotyczy).

Implementacja: W CSS – @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.001s !important; transition-duration: 0.001s !important; } }

---

8. CHECKLISTA IMPLEMENTACYJNA (PODZIAŁ NA ATOMY)

(Lista atomów i molekuł do zrealizowania – można ją traktować jako backlog dla developera)

Atomy (podstawowe komponenty)

· Avatar (okrągły, z ramką verified, tooltip)
· Chip (kategoria, border-radius 999px)
· SocialIcon (YouTube, Twitter, itp., stroke 1.5px)
· ButtonPrimary (złoty, z loading state)
· ButtonSecondary (purple outline)
· Input (z floating label, walidacją)
· Checkbox (z animowanym checkmark)
· ToggleSwitch (z --ease-spring)
· Spinner (złoty, rozmiary 24/48/72px)
· SkeletonCard (pulsujący shimmer)
· Toast (sukces, błąd, info, warning)
· Tooltip (z opóźnieniem 0.5s)
· WalletAddress (ENS, truncation, copy, QR)

Molekuły (złożone z atomów)

· HeroSection (z glassmorphism, baner, awatar, bio, linki)
· FanWallMasonry (z wirtualizacją, różne wysokości kafelków)
· LiveTicker (real-time lista napiwków)
· PaymentPanel (sticky na desktop, bottom sheet na mobile)
· SubscriptionCard (plan subskrypcji)
· NetworkWarning (żółty pasek z przyciskiem zmiany sieci)
· NFTModal (szczegóły Proof of Support)

Organizmy (strony / widoki)

· PublicCreatorProfile (desktop: 2 kolumny, mobile: linearyzacja + sticky bottom bar)
· PaymentModal (z 4 stanami: wybór, podpis, mempool, potwierdzenie)

Integracje techniczne

· Next.js 15 App Router
· SSG dla danych statycznych (generateStaticParams, ISR)
· CSR dla Fan Wall (react-query + API route)
· WebSocket dla live ticker
· @vercel/og dla dynamicznych OG Images
· react-window lub tanstack-virtual dla wirtualizacji
· DOMPurify dla sanityzacji UGC
· WCAG 2.2 (kontrast, focus, touch targets, reduced motion)

---

📌 PODSUMOWANIE

Ten prompt jest najbardziej szczegółową specyfikacją Publicznego Profilu Twórcy, jaką kiedykolwiek stworzono.
Zawiera wszystkie warstwy – od psychologii użytkownika (Efekt Czystej Ekspozycji, FOMO, Social Proof) przez design system (tokeny, glassmorphism, masonry) po inżynierię (Next.js SSG+CSR, WebSocket, wirtualizacja, OG Images, WCAG).

Teraz możesz go przekazać zespołowi do implementacji. Jeśli któryś fragment wymaga jeszcze większej szczegółowości (np. rozpisać każdy kafelek Masonry co do piksela) – daj znać, a rozbiję na jeszcze mniejsze atomy.

Wielorybie 🐋 – czy to jest wystarczająco szczegółowe, czy mam kontynuować z podziałem na jeszcze mniejsze części?