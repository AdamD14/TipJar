🐋 TIPJAR+ UI/UX – PEŁNA KOMPILACJA PROMPTÓW PROJEKTOWYCH (2025)

---

📖 SPIS TREŚCI

1. 🎨 BRANDING & FOUNDATION
   · 1.1 Pełna paleta kolorów TipJar+
   · 1.2 Hierarchia typograficzna TipJar+
   · 1.3 Logo TipJar+ (wersja pionowa i pochodne)
   · 1.4 System ikon interfejsu TipJar+
   · 1.5 Abstrakcyjne grafiki tła w stylu 3D
2. 🧩 KOMPONENTY UI (ATOMIC DESIGN)
   · 2.1 Przyciski (Primary, Secondary, Specialty)
   · 2.2 Pola formularzy
   · 2.3 Karty (Cards)
   · 2.4 Module (Modals / Dialogs)
   · 2.5 Listy & Tabele
   · 2.6 Dropdowny & Menu
   · 2.7 Toast / Snackbar
   · 2.8 Loader / Skeleton Screens
   · 2.9 Tooltipy & Popovery
   · 2.10 Avatary & Badge
3. 📱 LAYOUTY & STRUKTURY STRON
   · 3.1 Strona Główna (Landing Page)
   · 3.2 Publiczny Profil Twórcy
   · 3.3 Katalog Twórców (Explore / Odkrywaj)
   · 3.4 Centrum Wiedzy (Learn)
   · 3.5 Panel Twórcy (Creator Dashboard)
   · 3.6 Panel Fana
   · 3.7 Strona Logowania/Rejestracji
   · 3.8 Strony Błędów (404, 500) & Inne
4. 🧠 ELEMENTY FUNKCJONALNE & WEB3
   · 4.1 Widget Płatności (Payment Modal)
   · 4.2 Proof of Support NFT (Odznaka NFT)
   · 4.3 Eternal Fan Wall
   · 4.4 Subscriptions NFT
   · 4.5 DAO Panel (Governance)
   · 4.6 Dynamiczny Asystent AI (Voice/Chatbot)
   · 4.7 Portfel (Wallet)
   · 4.8 System Powiadomień (Notifications)
   · 4.9 Kreator Profilu Twórcy (Onboarding)
   · 4.10 Generatory (QR Code, OG Image, Referral)
5. 🎭 MIKROINTERAKCJE & ANIMACJE
   · 5.1 Mikrointerakcje przycisków i elementów interaktywnych
   · 5.2 Przejścia między ekranami i modalami
   · 5.3 Feedback po akcjach (Toasty, komunikaty)
   · 5.4 Interaktywne elementy list i kart
   · 5.5 Specjalne efekty dla elementów Web3 (NFT, DAO)
   · 5.6 Animacje nagłówków i sekcji (scroll-triggered)
   · 5.7 Animacje ładowania i stanów pośrednich

---

🎨 BRANDING & FOUNDATION

1.1 Pełna paleta kolorów TipJar+

Opis: Stwórz kompletną, rozszerzoną paletę kolorów dla aplikacji TipJar+ opartą na kolorystyce premium: ciemny turkus, złoty akcent, fioletowy akcent pomocniczy oraz neutralne tła i tekst. Paleta musi zawierać odcienie podstawowe, hover, active, disabled oraz warianty dla trybu jasnego (jeśli przewidziany).
Styl: Nowoczesny, premium, ciemny motyw dominujący. Kolory powinny być głębokie, nasycone, ale nie krzykliwe. Złoty i fioletowy mają dodawać prestiżu i nowoczesności.
Kolory bazowe (HEX):

· Ciemny turkus (tło aplikacji): #003737
· Złoty akcent (interaktywny): #FFD700
· Fioletowy akcent (Web3, stany UI): #9D4EDD (odcień ametystowy/purpura)
· Biały tekst: #FFFFFF
· Jasnoszary tekst: #F5F5F5
  Wymagania techniczne:
· Skala odcieni: Dla każdego koloru podstawowego przygotuj skalę 5 odcieni (np. 100, 200, 300, 400, 500), gdzie 500 to kolor bazowy. Odcienie powinny płynnie przechodzić od bardzo jasnych (do użycia jako highlight) do bardzo ciemnych (do cieni/głębi).
· Stany interaktywne:
  · Hover: Dla złotego np. #FFE44D (jaśniejszy). Dla turkusu/fioletu – jaśniejszy o 10-15% odcień.
  · Active/Pressed: Dla złotego np. #CCAC00 (ciemniejszy, bardziej nasycony).
  · Disabled: Zmniejszona saturation i lightness (np. odcień szaro-złoty #B3A125 z opacity 0.5).
  · Focus Outline: Fioletowy #C77DFF (jaśniejszy) z grubością 2px.
· Kolory kontekstowe:
  · Sukces: Odcień zielony harmonizujący, np. #10B981 (emerald).
  · Błąd: Odcień czerwony, np. #EF4444 (jasny czerwony).
  · Ostrzeżenie: Odcień pomarańczowy/żółty, np. #F59E0B (bursztynowy).
· Tła i warstwy:
  · Tło aplikacji (najgłębsze): #001A1A
  · Tło kart/modali: #002F2F i #003737
  · Tło pól formularzy: #004545
· Format i organizacja: Podaj wartości HEX, HSL oraz RGB. Zdefiniuj nazwy zmiennych CSS zgodne z konwencją (np. --color-primary-500, --color-accent-gold-hover). Przygotuj plik palette (np. JSON, Figma Styles) gotowy do importu.
  Przykład wizualny (opis): Głęboki, bogaty turkus #003737 stanowi fundament, na którym złote przyciski #FFD700 świecą jak drogocenne elementy. Fiolet #9D4EDD pojawia się subtelnie, jak światło lasera, podkreślając nowoczesność Web3. Wszystko utrzymane w ciemnej tonacji, która nie męczy oczu, a kontrasty są na tyle wysokie, że spełniają WCAG AA.

1.2 Hierarchia typograficzna TipJar+

Opis: Zdefiniuj kompletną skalę typograficzną dla aplikacji wykorzystującą czcionki Mukta Malar (bezszeryfowa, zaokrąglona, przyjazna) oraz IBM Plex Sans (nowoczesna, techniczna, czytelna). Określ konkretne zastosowania, rozmiary, wysokości linii i odstępy dla wszystkich elementów tekstowych.
Styl: Nowoczesny, czytelny, zrównoważony. Mukta Malar dla nagłówków i interfejsu (przyjazny charakter), IBM Plex Sans dla dłuższych tekstów i paragrafów (doskonała czytelność).
Kroje i warianty:

· Mukta Malar: Light, Regular, Medium, SemiBold, Bold.
· IBM Plex Sans: Light, Regular, Medium, SemiBold, Bold, Italic.
  Wymagania techniczne:
· Hierarchia nagłówków (Desktop):
  · H1 / Hero: Mukta Malar Bold, 3.5rem (56px), line-height: 1.1, letter-spacing: -0.02em. Stosowany na najważniejsze hasła (Landing Page).
  · H2 / Sekcja: Mukta Malar SemiBold, 2.5rem (40px), line-height: 1.2. Tytuły głównych sekcji.
  · H3 / Podsekcja: Mukta Malar Medium, 2rem (32px), line-height: 1.3. Nagłówki wewnątrz sekcji.
  · H4 / Karta/Nagłówek modala: IBM Plex Sans SemiBold, 1.5rem (24px), line-height: 1.4.
  · H5 / Mały nagłówek: IBM Plex Sans Medium, 1.25rem (20px), line-height: 1.4.
  · H6 / Label/Kaps: IBM Plex Sans Medium, 1rem (16px), line-height: 1.5, letter-spacing: 0.05em, text-transform: uppercase. Do tagów, kategorii.
· Tekst podstawowy:
  · Paragraph (Body Large): IBM Plex Sans Regular, 1.125rem (18px), line-height: 1.6. Długie opisy, artykuły.
  · Paragraph (Body): IBM Plex Sans Regular, 1rem (16px), line-height: 1.6. Standardowy tekst interfejsu.
  · Small / Helper text: IBM Plex Sans Light, 0.875rem (14px), line-height: 1.5. Podpisy, informacje dodatkowe.
· Tekst interaktywny:
  · Button / CTA: Mukta Malar SemiBold, 1rem (16px), letter-spacing: 0.02em.
  · Input / Form label: IBM Plex Sans Medium, 0.9375rem (15px).
· Responsywność: Dla urządzeń mobilnych (max-width: 768px) skalowanie: H1 -> 2.5rem, H2 -> 2rem, H3 -> 1.75rem, Body -> 1rem (bez zmian).
· Kolory tekstu: Zdefiniuj zmienne: --text-primary (#FFFFFF), --text-secondary (#CCCCCC), --text-accent (złoty/fioletowy), --text-on-accent (ciemny turkus na złotym przycisku).
· Implementacja: Przygotuj plik z definicjami fontów (Google Fonts link, @font-face), oraz pełny zestaw CSS Custom Properties (zmiennych) dla wszystkich powyższych stylów.
  Przykład wizualny (opis): Wielki, odważny napis "Wspieraj bez granic" w Mukta Malar Bold od razu przyciąga uwagę na Landing Page. Poniżej, czytelny opis w IBM Plex Sans Regular prowadzi wzrok. W panelu, etykiety statystyk w Mukta Malar Medium są wyraziste, a dane liczbowe w IBM Plex Sans SemiBold – precyzyjne. Całość tworzy harmonijny duet: emocjonalny przekaz (Mukta) i chłodna, techniczna klarowność (IBM Plex).

1.3 Logo TipJar+ (wersja pionowa i pochodne)

Opis: Stwórz finalne, wysokiej jakości logo TipJar+ w wersji pionowej (stacked). Logo powinno składać się ze stylizowanego słoika (jar) z symbolem "+" oraz logotypu "TipJar+". Przygotuj wszystkie niezbędne warianty dla różnych zastosowań (favicon, social, watermark, app icon).
Styl: Minimalistyczny, nowoczesny, ikoniczny. Połączenie symbolu i tekstu w eleganckiej, zrównoważonej kompozycji pionowej. Linie proste, ale z lekkim zaokrągleniem (w punktach styku, narożnikach "+") dla przyjaznego charakteru. Symbol słoika ma być czytelny i abstrakcyjny jednocześnie.
Kolory:

· Podstawowa wersja (kolor): Złoty symbol i tekst (#FFD700) na przezroczystym tle. To główna wersja używanaw nagłówku aplikacji i materiałach marketingowych.
· Wersja jednokolorowa (light): Biały symbol i tekst na ciemnym tle lub przezroczystym (do użycia na ciemnych tłach wewnątrz aplikacji).
· Wersja monochromatyczna (dark): Czarny lub bardzo ciemnoszary symbol i tekst na jasnym tle (do dokumentów, wydruków).
· Akcentowa wersja (akcent): Fioletowy symbol i tekst (#9D4EDD) – do użycia w specyficznych kontekstach Web3.
  Wymagania techniczne:
· Format i struktura: Plik źródłowy w formacie wektorowym (AI, SVG) z zachowanymi warstwami (symbol, tekst, ewentualne tło). Logo musi skalować się bez utraty jakości.
· Wymagane warianty i rozmiary:
  1. Logo pełne (symbol + tekst): Wersja pionowa. Proporcje: wysokość tekstu powinna wynosić ok. 40-50% wysokości symbolu. Odstęp między symbolem a tekstem to ok. 20% wysokości symbolu. Dostarcz w kilku szerokościach (np. 200px, 400px, 800px).
  2. Favicon (ikona strony): Tylko symbol słoika z "+" (bez tekstu). Dostosowany do małej skali. Wymagane rozmiary: 16x16px, 32x32px, 48x48px. Format ICO oraz PNG.
  3. Social Sharing / OG Image: Logo wyśrodkowane na kwadratowym lub prostokątnym tle (przezroczystym lub w kolorze brandowym #003737). Rozdzielczość min. 1200x630px. Wersja biała lub złota.
  4. Watermark (znak wodny): Wersja z bardzo obniżoną opacnością (np. 5-10%) do użycia jako delikatne, powtarzalne tło w panelach administratora lub w dokumentach PDF. Zarówno wersja pełna, jak i sam symbol.
  5. App Icon (ikona aplikacji): Zaokrąglony kwadrat (z zachowaniem safe area). Tło: gradient ciemnego turkusu (#003737) do czarnego. Na pierwszym planie wyraźny, złoty symbol. Wymagane rozmiary dla store: 1024x1024px, 512x512px, 192x192px itp. (zgodnie z wytycznymi iOS/Android).
· Pliki wyjściowe: Dla każdego wariantu dostarcz pliki: .svg (wektor), .png (24-bit z przezroczystością w odpowiednich rozdzielczościach), .ico (dla favicon), .eps (do druku).
  Przykład wizualny (opis): Pionowa kompozycja, gdzie na górze znajduje się elegancki, uproszczony kontur słoika z wyraźnym, geometrycznym plusem w centrum dolnej części. Słoik jest zamknięty, sugerując bezpieczne przechowywanie. Poniżej, napis "TipJar+" w czcionce Mukta Malar Bold, idealnie wyśrodkowany pod symbolem. Złota barwa emanuje wartością i zaufaniem. W wersji favicon sam słoik jest natychmiast rozpoznawalny nawet w skali 16x16px.

1.4 System ikon interfejsu TipJar+

Opis: Zaprojektuj kompletny, spójny zestaw ikon w stylu line (outline), "pusty w środku", do użycia w całej aplikacji. Ikony mają być minimalistyczne, nowoczesne i idealnie czytelne w małych rozmiarach. Muszą komunikować funkcje w sposób intuicyjny.
Styl: Cienka (1.5px) lub średnia (2px) linia o stałej grubości (stroked). Zaokrąglone zakończenia linii (round caps) i zaokrąglone połączenia (round joins) dla przyjaznego odbioru. Spójny poziom szczegółowości – ikony są metaforyczne, ale nie przesadnie uproszczone.
Kolory:

· Podstawowy (interaktywny): Złoty (#FFD700) – dla głównych akcji, stanu aktywnym.
· Akcentowy (Web3/funkcje): Fioletowy (#9D4EDD) – dla ikon związanych z NFT, blockchain, DAO, subskrypcjami.
· Neutralny (drugorzędny): Biały (#FFFFFF) lub Jasnoszary (#CCCCCC) – dla ikon w nawigacji, ustawieniach, elementach nieaktywnych.
· Stanowy: Czerwony (błąd), Zielony (sukces), Pomarańczowy (ostrzeżenie) – zgodne z paletą kontekstową.
  Wymagania techniczne:
· Rozmiar kanwy: Podstawowy rozmiar 24x24px. Ikony muszą być czytelne i zachować proporcje również w rozmiarze 16x16px (dla małych przycisków, list) i 32x32px (dla dużych akcji).
· Kompletność zestawu: Minimum 50 ikon, pokrywających wszystkie przewidziane funkcje:
  · Płatności i finanse: heart (napiwek/darowizna), credit-card, wallet, crypto-coin (ogólny symbol krypto), bank, cash, trending-up, trending-down.
  · Nawigacja i interfejs: home, explore (lupa + globus), bell (powiadomienia), user, users (społeczność), settings (zębatka), log-out, menu (hamburger), chevron (wszystkie kierunki), arrow (wszystkie kierunki), filter, search.
  · Akcje i zarządzanie: send, receive, download, upload, edit (ołówek), trash, copy, external-link, qr-code, refresh, share, lock (zamknięte/otwarte), eye (widoczne/ukryte), check (okrągły i prosty), x (close, error), plus, minus.
  · Statusy i komunikacja: info (okrąg z 'i'), warning (trójkąt z wykrzyknikiem), verified (check w okręgu), star (wypełniona/pusta), clock, calendar.
  · Web3 & SocialFi: nft-badge (sześcian z symbolem diamentu w środku), dao-governance (ręka podnosząca kartkę), subscription (okrąg z strzałką odbijającą się), fan-wall (ściana z sercami), robot (głowa robota dla AI), ethereum (logo ETH), link (łańcuch ogniwo), gem (klejnot).
  · Media i treść: image, video, music, mic (mikrofon), link (hiperłącze), globe.
· Format i implementacja: Wszystkie ikony w formacie SVG, zdefiniowane jako <path> z właściwością stroke (nie fill), aby kolor można było łatwo kontrolować za pomocą CSS (stroke: currentColor;). Grubość linii (stroke-width) zdefiniowana w jednostkach względnych.
· Organizacja: Dostarcz bibliotekę ikon jako plik .fig (Figma Components), .svg sprite (jeden plik zawierający wszystkie <symbol>) oraz osobne pliki .svg. Dołącz dokumentację PDF/Notion z siatką wszystkich ikon, ich nazwami i zalecanym użyciem.
  Przykład wizualny (opis): Ikona serca (heart) to delikatny outline z lekkim wypełnieniem u dołu, sugerującym "wlewanie" wsparcia. Ikona portfela krypto (crypto-coin) to stylizowany sześcian (blok blockchain) z symbolem "$" w środku. Ikona Asystenta AI (robot) to minimalistyczna głowa z okrągłym "mózgiem" i diodą. Każda ikona jest geometrycznie czysta, z zachowaniem optycznego wyrównania wewnątrz kwadratowej kanwy.

1.5 Abstrakcyjne grafiki tła w stylu 3D

Opis: Stwórz serię unikalnych, abstrakcyjnych grafik tła w stylu bloków/pudeł wystających w przestrzeń 3D. Grafiki mają stanowić nowoczesne, premium tło dla sekcji hero (Landing Page), nagłówków podstron lub jako delikatne tekstury w panelach. Mają budować atmosferę zaawansowanej technologii, sieci i głębi, nie odwracając uwagi od treści.
Styl: Geometryczna abstrakcja, inspirowana izometrią lub lekkim, nieregularnym pochyleniem elementów, tworząca iluzię głębi i przestrzeni. Bloki to prostopadłościany o różnych wysokościach i głębokościach. Światło pada z jednego, ustalonego kierunku (np. lewo-góra), tworząc realistyczne, miękkie cienie i podświetlenia na krawędziach. Unikać zbyt "szkieletowych" form – bloki mają objętość.
Paleta kolorów: Bazuje na palecie brandowej, ale użyta w bardziej artystyczny, tonalny sposób.

· Dominujące: Ciemne odcienie turkusu – #003737, #002626, #004747.
· Akcenty strukturalne: Niektóre bloki mogą być w kolorze złotym (#FFD700) lub fioletowym (#9D4EDD), zwykle te "najbliżej" obserwatora lub kluczowe w kompozycji.
· Głębia i cienie: Bardzo ciemne odcienie (#001A1A, niemal czarne) dla głębokiego tła i rzucanych cieni.
· Podświetlenia: Bardzo jasne, pastelowe odcienie turkusu (#66AAAA) na górnych krawędziach bloków, na które pada światło.
  Wymagania techniczne:
· Hero Section dla Landing Page:
  · Rozmiar: 2400x800px (dla retina displays).
  · Kompozycja: Szeroka, horyzontalna. Bloki układają się w sposób sugerujący sieć, połączenia, "globalny zasięg". Mogą tworzyć nieformalną siatkę lub płynną strukturę organiczną. Subtelnie można wkomponować motyw słoika lub plusa (jako negatyw w strukturze). Centralna część może być nieco jaśniejsza/bardziej otwarta, aby zostawić miejsce na tekst.
· Tło dla nagłówków sekcji (np. "Jak to działa"):
  · Rozmiar: 1200x300px.
  · Kompozycja: Mniej złożona, bardziej symetryczna lub z wyraźnym kierunkiem (np. fala wychodząca z boku). Ma podkreślać nagłówek, a nie z nim konkurować.
· Tekstury / Subtle Patterns (do powtarzania):
  · Rozmiar kafelka: 200x200px lub 400x400px.
  · Opis: Bardzo delikatny, prawie monochromatyczny wzór małych, przestrzennych bloków. Używany jako tło kart, modali lub stopki z opacity ~5%. Ma dodawać teksturę, a nie być widocznym motywem.
· Formaty i optymalizacja: Wszystkie grafiki dostarczone w wysokiej rozdzielczości jako .png (24-bit z przezroczystością tam, gdzie potrzebna) oraz w nowoczesnym, lekkim formacie .webp. Należy zadbać o optymalizację rozmiaru pliku bez utraty jakości (np. przez TinyPNG). Dla tekstur przygotować także wersję w formacie .svg jeśli to możliwe (dla nieskończonej skalowalności).
  Przykład wizualny (opis): Na głębokim, granatowo-turkusowym tle (#001A1A) unoszą się prostopadłościany w różnych odcieniach turkusu. Niektóre są wysokie i wąskie, inne niskie i szerokie. Kilka z nich, akcentowanych złotem, wydaje się być bliżej obserwatora, rzucając miękkie, rozmyte cienie na te znajdujące się za nimi. Światło z lewego górnego rogu delikatnie podświetla górne krawędzie, nadając im blask. Całość tworzy dynamiczną, technologiczną i premium przestrzeń, która nie konkuruje z białym tekstem i złotymi przyciskami na pierwszym planie, lecz stanowi dla nich bogate, nowoczesne tło.

---
🧩 KOMPONENTY UI (ATOMIC DESIGN) – PEŁNA WERSJA

---

2.1 Przyciski (Primary, Secondary, Specialty)

Opis: Stwórz zestaw spójnych przycisków interfejsu, uwzględniający wszystkie stany interakcji (default, hover, active, focus, disabled, loading). Przyciski muszą być dostępne w różnych rozmiarach i wariantach (z ikoną, bez ikony, pełnej szerokości). Są kluczowym elementem interakcji i muszą wyraźnie komunikować możliwość działania.

Styl: Nowoczesny, z umiarkowanym zaokrągleniem (border-radius: 8px). Primary – wypełniony kolorem, o wyraźnym kontraście. Secondary – outline lub subtelne wypełnienie, mniej dominujące. Ikony (jeśli obecne) wyrównane do tekstu, z odpowiednim odstępem.

Kolory (wg palety brandingowej):

· Primary (akcja główna, np. "Wesprzyj", "Zapłać"): Tło złote #FFD700, tekst ciemnoturkusowy #003737. Hover: tło #FFE44D. Active (wciśnięcie): tło #CCAC00. Focus: outline fioletowy #9D4EDD (3px, offset 2px).
· Secondary (akcja drugorzędna, np. "Anuluj", "Dowiedz się więcej"): Tło przezroczyste, obramowanie złote #FFD700 (2px), tekst złoty. Hover: tło złote z lekką przezroczystością (rgba(255, 215, 0, 0.1)). Active: tło złote z większą przezroczystością (rgba(255, 215, 0, 0.2)). Może też istnieć wariant z obramowaniem fioletowym i tekstem fioletowym dla akcji związanych z Web3.
· Tertiary / Link (trzeciorzędny, np. "Pomiń"): Tło przezroczyste, brak obramowania, tekst złoty lub fioletowy z podkreśleniem na hover. Mniej inwazyjny.
· Destructive (akcja niszcząca, np. "Usuń konto"): Tło w odcieniu czerwonym (z palety kontekstowej, np. #EF4444), tekst biały. Hover: jaśniejszy czerwony.

Wymagania techniczne:

· Wysokości i paddingi: Duży (56px), Średni (48px), Mały (40px). Padding poziomy: odpowiednio 32px, 24px, 16px. Pełna szerokość (full-width) – szerokość 100% kontenera.
· Typografia: Tekst przycisku w Mukta Malar SemiBold, rozmiar odpowiedni dla danej wielkości (duży: 18px, średni: 16px, mały: 14px). Ikony wewnętrzne: rozmiar 24px (duży), 20px (średni), 16px (mały). Odstęp między ikoną a tekstem: 8px.
· Stany:
  · Hover: Płynna zmiana koloru tła/obramowania (transition: all 0.15s ease-out). Dodanie delikatnego box-shadow dla primary (np. 0 4px 12px rgba(255, 215, 0, 0.3)).
  · Active: Efekt wciśnięcia (transform: translateY(1px)) oraz przyciemnienie tła.
  · Focus: Wyraźny outline (nie usuwamy outline domyślnego bez zastąpienia go innym stylem). Dla dostępności, focus jest widoczny również przy nawigacji klawiaturą.
  · Disabled: Opacity 0.5, brak wszystkich interakcji (cursor: not-allowed). Kolor tła/tekstu wyblakły.
  · Loading: W miejscu tekstu lub obok tekstu pojawia się spinner (okrągła, obracająca się animacja w kolorze tekstu). Przycisk jest nieklikalny.
· Warianty z ikoną: Ikona po lewej, prawej lub sama ikona (przycisk okrągły, tylko z ikoną, np. do zamknięcia modala). Dla przycisku tylko z ikoną, wymiary kwadratowe (np. 48x48px).
· Spójność: Wszystkie przyciski w całej aplikacji muszą ściśle przestrzegać tych samych reguł dotyczących zaokrągleń, grubości obramowania, odstępów i animacji.

Przykład wizualny (opis): Duży złoty przycisk "Wyślij napiwek" z ikoną serca po lewej. Po najechaniu myszką przycisk lekko jaśnieje i unosi się (shadow). Po kliknięciu wydaje się chwilowo wciśnięty (translateY). Gdy trwa wysyłanie, w przycisku wiruje mały złoty spinner, a tekst znika lub jest przyciemniony. Przycisk secondary "Anuluj" ma subtelne złote obramowanie, które po najechaniu wypełnia się lekkim złotym tłem.

---

2.2 Pola formularzy (Inputs, Textarea, Select, Checkbox, Radio, Toggle)

Opis: Zaprojektuj kompletny zestaw pól formularzy używanych w rejestracji, logowaniu, płatnościach, ustawieniach i wszędzie tam, gdzie użytkownik wprowadza dane. Uwzględnij wszystkie stany: default, hover, focus, filled, error, success, disabled. Pola muszą być intuicyjne, z wyraźną walidacją i pomocniczymi komunikatami.

Styl: Minimalistyczne, z subtelnymi, ale wyraźnymi obramowaniami, które akcentują się w stanie focus. Zaokrąglone rogi (6px). Ikony wewnątrz pól (prefix/suffix, np. ikona wyszukiwania, waluty, oka do hasła) w kolorze akcentowym. Pola mają lekkie tło, odróżniające je od ciemnego tła aplikacji.

Kolory:

· Tło pola: #004545 (ciemnoturkusowe, ale jaśniejsze niż tło aplikacji #003737).
· Obramowanie (default): #006666 (neutralny turkus, niskiego kontrastu).
· Obramowanie (focus): Złote #FFD700 lub fioletowe #9D4EDD (grubość 2px).
· Tekst wprowadzany: Biały #FFFFFF.
· Placeholder tekst: Jasnoszary #AAAAAA z lekką przezroczystością.
· Ikona wewnętrzna: Złota #FFD700 lub fioletowa #9D4EDD.
· Stan Error: Obramowanie i ikona w odcieniu czerwonym (np. #FF6B6B). Tło pola może delikatnie pulsować czerwonym podświetleniem.
· Stan Success: Obramowanie i ikona w odcieniu zielonym (np. #10B981).
· Stan Disabled: Tło #003737, obramowanie #005050, tekst #888888. Opacity 0.7.

Wymagania techniczne:

· Wymiary: Wysokość standardowa: 56px (duże), 48px (średnie). Padding: 16px (poziomy i pionowy). Dla textarea: minimalna wysokość 96px, resizable vertical.
· Typografia: Etykieta pola (label) - IBM Plex Sans Medium, 14px, kolor jasnoszary, nad polem. Tekst w polu - IBM Plex Sans Regular, 16px. Placeholder - IBM Plex Sans Light, 16px.
· Struktura: Każde pole musi mieć przypisaną etykietę (label) widoczną lub dostępną dla czytników (aria-label). Opcjonalnie pomocniczy tekst (helper text) pod polem, rozmiar 12px.
· Walidacja: Komunikaty błędów/sukcesów wyświetlane pod polem, w kolorze odpowiednim do stanu, rozmiar 14px. Pole z błędem ma także czerwone obramowanie.
· Checkbox & Radio: Rozmiar 20x20px. Default: szare obramowanie. Checked: wypełnienie złotem, biała ikona check (dla checkbox) lub kropka (dla radio). Hover: podświetlenie obramowania.
· Toggle Switch: Wysokość 24px, szerokość 44px. Suwak (thumb) o średnicy 20px. Stan off: tło szare #555555, suwak po lewej. Stan on: tło złote #FFD700, suwak po prawej. Płynna animacja przesunięcia (transition: transform 0.2s).
· Select (dropdown): Styl jak pole tekstowe, z ikoną strzałki w dół po prawej. Rozwijana lista opcji ma styl zgodny z komponentem Dropdown (patrz 2.6).
· Grupy pól: Pola powiązane (np. imię i nazwisko) mogą być w jednym wierszu na desktop, pod sobą na mobile. Odstęp między grupami min. 24px.
· Dostępność: Każde pole musi być w pełni dostępne z klawiatury. Focus state musi być wyraźny. Dla pól z autocomplete, odpowiednie atrybuty ARIA.

Przykład wizualny (opis): Pole "Adres e-mail" z etykietą "E-mail" nad nim. Pole ma lekkie ciemnoturkusowe tło i szarawą obramówkę. Po kliknięciu w pole, obramowanie świeci intensywnym złotym światłem, a placeholder znika. Gdy użytkownik wpisze nieprawidłowy format, obramowanie i ikona walidacyjna (wykrzyknik) zmieniają kolor na czerwony, a pod polem pojawia się komunikat "Proszę podać prawidłowy adres e-mail". Checkbox "Zapamiętaj mnie" jest mały, po kliknięciu wypełnia się złotem z białym ptaszkiem.

---
---

2.3 Karty (Cards) – Twórców, Statystyk, Powiadomień, NFT

Opis: Stwórz uniwersalny komponent karty do prezentacji różnych treści: twórców (w Explore), podsumowań statystyk (w Dashboard), powiadomień oraz NFT (Proof of Support, subskrypcje). Karty mogą być klikalne w całości (jako link) lub zawierać osobne przyciski akcji. Muszą zapewniać wyraźną hierarchię informacji i wizualnie oddzielać się od tła.

Styl: Ciemne tło (#002F2F) z delikatnym, miękko rozmytym cieniem (box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24)) oddzielającym od tła strony. Zaokrąglone rogi (12px). Możliwość zawierania obrazków (avatar, miniatura NFT), tekstu, ikon i przycisków. Układ wewnętrzny elastyczny, zdefiniowany gridem lub flexboxem.

Kolory:

· Tło karty: #002F2F (standard), dla wariantów wyróżnionych można użyć #003737.
· Tekst tytułowy: Biały #FFFFFF (Mukta Malar SemiBold/Bold).
· Tekst opisowy: Jasnoszary #CCCCCC (IBM Plex Sans Regular).
· Akcenty i metadane: Złoty #FFD700 dla kluczowych liczb, statusów aktywnych. Fioletowy #9D4EDD dla elementów związanych z Web3 (np. tag "NFT").
· Obramowanie (opcjonalne): Dla kart NFT lub statusowych może pojawić się subtelne obramowanie gradientowe (złoto-fiolet) o grubości 1px.
· Hover (dla kart klikalnych): Efekt uniesienia (transform: translateY(-4px)), cień staje się większy i bardziej rozmyty (box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32)). Może pojawić się subtelne podświetlenie obramowania (jeśli istnieje) lub tła (np. #003737).

Wymagania techniczne:

· Standardowy padding: 24px na desktop, 16px na mobile.
· Układ wewnętrzny: Elastyczny, dostosowujący się do zawartości. Zalecane użycie CSS Grid dla precyzyjnego rozmieszczenia elementów (np. avatar po lewej, tekst po prawej).
· Warianty i struktura:
  1. Karta Twórcy (Explore, lista obserwowanych):
     · Awatar (okrągły, 64px) po lewej.
     · Blok tekstowy: Nazwa twórcy (H4), kategorie/tagi (małe tagi), krótki opis (1-2 linie, truncate).
     · Metryki (np. "1.2k obserwujących", "5.4k USDC") w formie małego tekstu.
     · Przycisk akcji "Obserwuj" lub "Zobacz profil" (mógłby być wyśrodkowany lub w rogu).
     · Cała karta klikalna jako link do profilu.
  2. Karta Statystyk (Dashboard):
     · Ikona (złota, 32px) w lewym górnym rogu.
     · Duża liczba (np. "1,540") w Mukta Malar Bold, 2rem.
     · Tytuł metryki (np. "Łącznie napiwków") poniżej.
     · Trend (strzałka w górę/dół + procent) w prawym górnym rogu.
     · Tło może być gradientem (turkus do ciemniejszego turkusu).
  3. Karta Powiadomienia (lista, dropdown):
     · Ikona typu powiadomienia (serce, dzwonek, check) po lewej.
     · Treść powiadomienia (krótki tekst, może być z linkiem).
     · Timestamp (np. "2 min temu") prawym, małym, szarym fontem.
     · Nieprzeczytane: mają złote tło (rgba(255, 215, 0, 0.05)) lub złotą kropkę.
     · Może zawierać przycisk "X" do usunięcia.
  4. Karta NFT (Proof of Support, subskrypcja):
     · Górna część: Kwadratowy obrazek NFT (np. 1:1) z zaokrąglonymi rogami (8px).
     · Overlay na obrazku (opcjonalnie): znacznik "Soulbound" lub "Active".
     · Dolna część: Nazwa NFT, nazwa twórcy (link), data otrzymania.
     · Obramowanie lub akcent kolorystyczny wskazujący na rzadkość (brązowy/srebrny/złoty).
     · Hover na obrazku: lekkie powiększenie (scale: 1.03) i pojawienie się przycisków "Udostępnij" / "Zobacz szczegóły".
· Responsywność: Na mobile karty rozciągają się na pełną szerokość dostępnego kontenera, padding zmniejsza się do 16px, układ może przejść z poziomego na pionowy.
· Performance: Dla siatki wielu kart (np. Explore) zastosować lazy loading obrazów oraz techniki zapobiegające Cumulative Layout Shift (CLS) – predefiniowane wymiary kontenerów obrazków.

Przykład wizualny (opis): Karta twórcy w Explore: po lewej okrągły avatar streamera, po prawej jego pseudonim w białej, wyraźnej czcionce, poniżej tagi "Gaming • FPS". Na dole małe ikony i liczby: serce (1.2k) i worek monet (5.4k USDC). Cała karta po najechaniu unosi się, a jej cień staje się głębszy. Karta NFT w kolekcji fana przedstawia graficzną odznakę z lekkim gradientem złota. Po najechaniu na obrazek, ten delikatnie się powiększa, a w rogu pojawia się ikona share.

---

2.4 Module (Modals / Dialogs) – Płatność, Potwierdzenie, Edukacyjne

Opis: Zaprojektuj komponent modala, który pojawia się nad interfejsem dla ważnych, skupionych akcji: formularz płatności, potwierdzenie działania (np. usunięcie), wyświetlenie dodatkowych informacji (np. szczegóły NFT), ustawień. Modal musi skupiać uwagę użytkownika, ale nie czuć się jak osobna strona.

Styl: Wyśrodkowany na ekranie (fixed position), z przyciemnionym, rozmytym tłem (backdrop) o przeźroczystości ~60% (background: rgba(0, 20, 20, 0.6); backdrop-filter: blur(4px);). Sam modal to zaokrąglony prostokąt w kolorze ciemnego turkusu (#003737) z wyraźnym nagłówkiem, treścią i sekcją akcji. Posiada wyraźny cień (box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)).

Kolory:

· Tło modala: #003737 (możliwość lekkiego gradientu do #002F2F).
· Nagłówek: Tekst w kolorze złotym (#FFD700) lub białym, czcionką Mukta Malar SemiBold.
· Przycisk zamknięcia (X): Ikona w kolorze złotym lub białym, z okrągłym tłem na hover (rgba(255,255,255,0.1)).
· Separatory: Delikatne linie #004545 do oddzielania sekcji (jeśli potrzebne).
· Tło formularza wewnątrz: Nieco jaśniejsze (#004545) dla pól wejściowych.

Wymagania techniczne:

· Szerokość: Maksymalnie 600px dla desktop (dla formularzy). Dla prostych potwierdzeń/alarmów: 400px. Na mobile: pełna szerokość ekranu z marginesem 16px z każdej strony.
· Struktura:
  1. Nagłówek: Zawiera tytuł modala i przycisk zamknięcia (X) w prawym górnym rogu.
  2. Treść: Główna zawartość modala. Może zawierać dowolne komponenty: tekst, formularze, listy, obrazki. Powinna mieć odpowiednie paddingi (np. 24px).
  3. Sekcja akcji (footer): Zawiera przyciski akcji (np. "Anuluj", "Potwierdź", "Wyślij"). Domyślnie przyciski wyrównane do prawej (na mobile do dołu, w kolumnie). Primary akcja jest prawostronna (lub na dole).
· Zamknięcie: Modal zamyka się po: (1) kliknięciu w przycisk X, (2) kliknięciu w obszar backdrop (przyciemnione tło), (3) naciśnięciu klawisza Escape.
· Animacja otwierania/zamykania: Pojawienie się z efektem "scale up" i "fade in". Tło pojawia się płynnie. Czas trwania: 250ms, easing cubic-bezier(0.16, 1, 0.3, 1) (spokojne, premium).
· Focus Trap & Dostępność: Po otwarciu, fokus klawiatury jest przenoszony do pierwszego interaktywnego elementu w modalie (lub na przycisk zamknięcia). Podczas przeglądania tabulatorem, fokus nie wychodzi poza modal (focus trap). Modal ma odpowiednie atrybuty ARIA (role="dialog", aria-labelledby wskazujące na tytuł, aria-modal="true").
· Responsywność i scroll: Jeśli treść modala jest dłuższa niż wysokość ekranu (szczególnie na mobile), wewnętrzny kontener treści powinien być przewijany (overflow-y: auto), podczas gdy nagłówek i stopka pozostają na miejscu.
· Specjalne warianty: "Fullscreen Modal" na mobile dla bardzo złożonych formularzy (np. kreator) – zajmuje 100% ekranu, z własną nawigacją.

Przykład wizualny (opis): Modal płatności z nagłówkiem "Wyślij napiwek [Nazwa Twórcy]" w złotym kolorze. Wewnątrz znajduje się formularz z przyciskami kwot, polem wyboru metody i przyciskiem "Wyślij". Tło za modalem jest mocno przyciemnione i lekko rozmyte, skupiając uwagę na formularzu. Po kliknięciu "Wyślij", modal wchodzi w stan ładowania (przyciemnienie, spinner). Po sukcesie zamienia się w komunikat potwierdzenia z ikoną checkmark.

---

2.5 Listy & Tabele (Lists & Tables) – Powiadomienia, Historia transakcji

Opis: Stwórz komponenty do wyświetlania uporządkowanych danych w formie listy (np. powiadomienia, wspierający, wiadomości) oraz tabel (historia transakcji, lista subskrybentów, wypłaty). Muszą być przede wszystkim czytelne, umożliwiać szybkie skanowanie wzrokiem oraz oferować możliwości sortowania i filtrowania (w przypadku tabel).

Styl (Listy): Minimalistyczne, każdy element listy to wiersz z lekkim wizualnym odseparowaniem. Może przypominać rozciągniętą kartę. Dominuje układ pionowy.

Styl (Tabele): Nowoczesne, z wyraźnie oddzielonymi nagłówkami kolumn i naprzemiennym tłem wierszy dla lepszej czytelności. Unikać zbyt wielu linii siatki.

Kolory (Listy):

· Tło elementu listy: #002F2F.
· Separator między elementami: border-bottom: 1px solid #004040 (lub użycie box-shadow dla subtelniejszego efektu).
· Hover na wierszu: Podświetlenie tła na #004545.
· Aktywny/wybrany wiersz: Tło #003737 z lewym złotym obramowaniem (border-left: 3px solid #FFD700).

Kolory (Tabele):

· Tło nagłówka tabeli: #004545, tekst biały lub złoty (SemiBold).
· Tło wiersza: #002F2F.
· Tło wiersza naprzemienne: #003030.
· Obramowania komórek: Brak pionowych, poziome tylko jako separatory wierszy (border-bottom: 1px solid #004040).
· Hover na wierszu: Jak w listach.

Wymagania techniczne:

· Lista:
  · Każdy element listy ma stałą minimalną wysokość (np. 72px), aby zachować rytm.
  · Zawiera ikonę (opcjonalnie), treść główną, treść pomocniczą (np. timestamp, status) i ewentualnie akcje (przyciski).
  · Układ wewnętrzny za pomocą flexbox lub grid.
  · Możliwość wyświetlenia stanu "pusta lista" z ilustracją i zachętą do działania.
· Tabela:
  · Nagłówki kolumn (<th>) wyrównane do lewej, tekst w IBM Plex Sans SemiBold, 14px. Możliwość sortowania po kliknięciu (ikona strzałki obok nazwy).
  · Komórki z danymi (<td>): tekst w IBM Plex Sans Regular, 14px lub 16px.
  · Kolumny liczbowe (kwoty) wyrównane do prawej.
  · Kolumny z akcjami (np. "Podziękuj") zawierają małe przyciski lub linki.
  · Responsywność tabeli to wyzwanie. Rozwiązania:
    · Na desktop/tablet: Tabela wyświetla się normalnie, z poziomym przewijaniem jeśli jest zbyt szeroka (overflow-x: auto).
    · Na mobile (max-width: 768px): Tabela przekształca się w listę bloków. Każdy wiersz staje się kartą, a każda komórka (<td>) wyświetla się jako linia z etykietą (nazwą kolumny) i wartością. Można to osiągnąć poprzez display: block i pseudo-elementy ::before z content: attr(data-label).
· Paginacja/Load More: Jeśli lista/tabela jest długa, na dole umieść paginację (klasyczne numery stron) lub przycisk "Załaduj więcej" / infinite scroll. Komponent paginacji: przyciski numeryczne (aktywny złoty), strzałki next/prev.
· Export danych: W sekcjach finansowych (historia) umieść niepozorny przycisk "Eksportuj do CSV" (ikona download).

Przykład wizualny (opis): Tabela historii napiwków z kolumnami: Data, Od kogo, Kwota, Wiadomość, Status. Nagłówki kolumn są ciemniejsze. Co drugi wiersz ma nieco ciemniejsze tło, co ułatwia śledzenie linii. Kwota (np. $10.00) jest wyróżniona złotą, pogrubioną czcionką. Po najechaniu na wiersz, jego tło się rozjaśnia. Na mobile ten sam wiersz wygląda jak karta z napisem "Data: 2024-01-15", "Od: JanKowalski", "Kwota: $10.00".

---

2.6 Dropdowny & Menu (Dropdowns & Menus) – User Menu, Filtry, Selektory

Opis: Zaprojektuj komponenty rozwijane służące do: nawigacji (menu użytkownika), wyboru pojedynczej lub wielokrotnej opcji (dropdown selektora), zastosowania filtrów (checkboxy w dropdownie) oraz menu kontekstowego (right-click). Muszą być łatwe w użyciu na desktop (hover/click) i mobile (tap), z wyraźnie widocznymi opcjami.

Styl: Płaskie, z ciemnym tłem, pasujące do reszty interfejsu. Opcje podświetlane przy hover. Subtelne cienie (box-shadow: 0 10px 25px rgba(0,0,0,0.2)) dla odseparowania od tła. Zaokrąglone rogi (8px).

Kolory:

· Tło dropdownu/menu: #003737 lub #002F2F.
· Tekst opcji: Biały (#FFFFFF).
· Ikony w opcjach: Złote lub białe.
· Hover na opcji: Tło #004545. Tekst pozostaje biały.
· Separatory między grupami opcji: Linia 1px solid #004545.
· Aktywna/wybrana opcja: Może mieć złotą kropkę przed tekstem lub złote tło (w zależności od kontekstu).

Wymagania techniczne:

· Trigger (wyzwalacz): Może to być przycisk (np. z ikoną chevron-down), pole formularza (select) lub avatar użytkownika. Po kliknięciu/ tapnięciu otwiera się lista.
· Pozycjonowanie: Dropdown pojawia się zazwyczaj pod trigerem (lub nad, jeśli brak miejsca), z lewą krawędzią wyrównaną do lewej krawędzi trigera. Musi być inteligentne pozycjonowanie, aby nie wychodził poza viewport.
· Zawartość: Lista opcji (<ul>), każda jako <li> lub <button>. Może zawierać ikony po lewej, tekst, oraz dodatkowy opis małym fontem. Może być podzielona na sekcje z nagłówkami.
· Specyficzne warianty:
  · Menu użytkownika: Zawiera avatar, imię/nazwę użytkownika (nagłówek), a następnie opcje: "Mój profil", "Ustawienia", "Wyloguj". Otwiera się po kliknięciu awatara w headerze.
  · Dropdown filtrów (np. w Explore): Zawiera listę checkboxów lub multiselect z możliwością zastosowania wielu filtrów jednocześnie. Często ma przycisk "Zastosuj filtry" i "Wyczyść wszystko" na dole.
  · Selektor (np. wybór metody płatności): Działa jak natywny <select>, ale z customowym stylingiem. Po wybraniu opcji, wartość jest pokazywana na triggerze.
· Interakcje i stany:
  · Zamknięcie: Dropdown zamyka się po: (1) kliknięciu poza jego obszarem, (2) wybraniu opcji (chyba że to multiselect), (3) naciśnięciu Escape.
  · Focus management: Po otwarciu, fokus przechodzi na pierwszą opcję w dropdownie. Nawigacja klawiszami strzałek.
  · Animacja: Płynne rozwijanie (animacja height/max-height) z fade-in. Czas: 200ms.
· Mobile considerations: Na urządzeniach dotykowych dropdown może otwierać się jako modal od dołu ekranu (tzw. action sheet) dla lepszej ergonomii, zwłaszcza gdy opcji jest wiele.

Przykład wizualny (opis): Po kliknięciu awatara w prawym górnym rogu wysuwa się menu użytkownika na ciemnoturkusowym tle. Górna część zawiera miniaturkę awatara i "Cześć, Jan!". Poniżej linia separatora, a następnie opcje "Panel Twórcy", "Ustawienia", "Centrum pomocy". Po najechaniu na "Ustawienia" wiersz delikatnie się podświetla. Dropdown z filtrami w Explore po kliknięciu pokazuje listę kategorii z checkboxami, a na dole przyciski "Zastosuj" i "Anuluj".

---
---

2.7 Toast / Snackbar – Komunikaty sukcesu, błędu, informacji

Opis: Zaprojektuj komponent tymczasowych komunikatów pojawiających się po akcji użytkownika lub w odpowiedzi na zdarzenie systemowe. Toast to niewielki, nieinwazyjny komunikat w rogu ekranu, który automatycznie znika po kilku sekundach. Musi być widoczny, ale nie przytłaczać interfejsu.

Styl: Niewielki, kompaktowy pasek z ikoną i tekstem, zaokrąglony (border-radius: 8px), z wyraźnym cieniem (box-shadow: 0 10px 25px rgba(0,0,0,0.3)) dla odseparowania od tła. Nie może przysłaniać kluczowych elementów interfejsu. Może zawierać przycisk akcji (np. "Cofnij").

Kolory (wg typu komunikatu):

· Sukces: Tło #002F2F z wyraźnym zielonym akcentem (ikona i lewe obramowanie) – zielony dopasowany do palety (np. #10B981). Ikona: ✔ (checkmark).
· Błąd: Tło #002F2F z wyraźnym czerwonym akcentem (np. #EF4444). Ikona: ✖ (krzyżyk) lub ⚠.
· Informacja: Tło #002F2F z fioletowym akcentem (#9D4EDD). Ikona: ℹ (info).
· Ostrzeżenie: Tło #002F2F z pomarańczowym/żółtym akcentem (np. #F59E0B). Ikona: ⚠ (ostrzeżenie).
· Progress/ładowanie: Tło #002F2F z złotym akcentem (#FFD700). Zamiast ikony, może pokazywać pasek postępu.

Wymagania techniczne:

· Pozycjonowanie: Prawy dolny róg ekranu (desktop) z marginesem 24px od krawędzi. Na mobile – góra ekranu (pod paskiem stanu), centralnie, aby nie kolidować z klawiaturą. Możliwość ustawienia innych pozycji (np. lewy dół) dla różnych przypadków.
· Czas wyświetlania: Domyślnie 4 sekundy dla informacyjnych, 6 sekund dla sukcesu, 8+ sekund dla błędów (aby użytkownik zdążył przeczytać). Po upływie czasu toast znika z animacją.
· Struktura i zawartość:
  · Ikona (po lewej) – wyraźna, 20x20px.
  · Treść – krótki tekst (max 1-2 linie, ok. 60 znaków), w IBM Plex Sans Regular, 14px, biały.
  · Przycisk zamknięcia (X) (opcjonalnie) – mały, okrągły przycisk z ikoną "×" w prawym górnym rogu toastu. Kliknięcie zamyka toast natychmiast.
  · Przycisk akcji (opcjonalnie) – np. "Cofnij", "Ponów", "Zobacz". Wyświetlany po prawej stronie, jako link lub mały przycisk secondary.
· Animacje:
  · Pojawienie się: Toast wjeżdża od prawej krawędzi (desktop) lub zsuwa się od góry (mobile) z lekkim odbiciem (bounce effect) na końcu. Możliwe opóźnienie wejścia (stagger) jeśli pojawia się kilka toastów jednocześnie.
  · Zniknięcie: Toast odjeżdża w prawo (lub w dół) z jednoczesnym fade-out. Jeśli użytkownik kliknie [X], zamyka się natychmiast z scale-down i fade.
· Kolejkowanie: Jeśli pojawi się kilka toastów jednocześnie, powinny się ustawiać w stos (stack) jeden pod drugim (lub obok siebie na szerokich ekranach). Najnowszy na górze/dole.
· Dostępność: Dla błędów i ważnych komunikatów użyj role="alert". Dla mniej pilnych role="status". Toast powinien być ogłoszony przez czytnik ekranu.
· Interakcje: Użytkownik może najechać myszką na toast, aby wstrzymać automatyczne zniknięcie (przydatne przy dłuższych komunikatach). Po odjechaniu, odliczanie wznawia się.

Przykład wizualny (opis): Po udanym wysłaniu napiwku, w prawym dolnym rogu ekranu pojawia się toast z zielonym paskiem po lewej stronie, ikoną ✔ i tekstem "Napiwek wysłany pomyślnie!". Toast wjeżdża płynnie z prawej, lekko się odbija i pozostaje na 4 sekundy. Jeśli użytkownik najedzie na niego myszką, timer się zatrzymuje. Po 4 sekundach toast płynnie znika. Gdy użytkownik wprowadzi błędne dane, pojawia się toast z czerwonym akcentem i ikoną ✖ oraz tekstem "Nieprawidłowy adres portfela".

---

2.8 Loader / Skeleton Screens – Wskaźniki ładowania i placeholdery

Opis: Zaprojektuj wskaźniki działania aplikacji (spinner, progress bar) oraz skeleton screens (placeholdery) dla ładowania treści (np. listy twórców, karty, profil). Mają informować użytkownika o trwającym procesie, dając poczucie, że aplikacja działa i treść się pojawi. Skeleton screens są szczególnie ważne dla percepcji wydajności.

Styl: Spinner – animowane kółko lub inna prosta, elegancka forma. Skeleton – szare prostokąty imitujące przyszłą treść, z animowanym gradientem przesuwającym się (shimmer effect), tworzącym iluzję ładowania.

Kolory:

· Spinner (kółko): Złoty #FFD700 lub fioletowy #9D4EDD. Tło przezroczyste lub lekko przyciemnione.
· Progress bar (pasek postępu): Tło #004545, wypełnienie gradientowe (złoto-fiolet) przesuwające się.
· Skeleton (placeholder): Bazowy kolor #003737. Animowany gradient (shimmer) od rgba(255,255,255,0) przez rgba(255,255,255,0.1) do rgba(255,255,255,0).

Wymagania techniczne:

· Spinner (indeterminate – nieokreślony czas):
  · Wariant podstawowy: Okrąg z obracającą się linią (stroke-dasharray i stroke-dashoffset). Można użyć SVG z animacją CSS @keyframes rotate.
  · Rozmiary: Mały (24px) – dla przycisków, pól. Średni (48px) – dla ładowania sekcji. Duży (72px) – dla ładowania całej strony lub modalów.
  · Pozycjonowanie: Wyśrodkowany w kontenerze. Może być z tekstem "Ładowanie..." poniżej.
· Progress bar (determinate – określony postęp):
  · Pasek o wysokości 4px, zaokrąglonych końcach. Kontener #004545, wypełnienie animowane liniowo (width: 0% -> 100%). Może pokazywać procent.
  · Używany przy uploadzie, długich procesach (np. minting NFT).
· Skeleton Screens:
  · Prostokąty o zaokrąglonych rogach (4-8px, w zależności od imitowanego elementu). Zachowują dokładnie taki sam układ, odstępy i proporcje, jak finalna treść.
  · Animacja shimmer: Gradient liniowy (90deg) przesuwający się od -100% do 100% szerokości kontenera. Animacja trwa 1.5-2s, w pętli nieskończonej.
  · Hierarchia: Różne odcienie szarości dla różnych poziomów treści (np. tytuł jaśniejszy, tekst ciemniejszy).
  · Zastosowanie: Podczas ładowania siatki kart twórców, treści profilu, listy transakcji. NIGDY nie używaj spinnera tam, gdzie można użyć skeletona – skeleton lepiej oddaje strukturę nadchodzącej treści.
· Ładowanie przycisku: Mały spinner (16px) w kolorze tekstu, wyśrodkowany w przycisku. Tekst przycisku znika lub jest zastąpiony spinnerem.
· Globalny loader (initial page load): Może być animowane logo TipJar+ (słoik z plusem) z efektem "pulsowania" (scale: 1 → 1.1 → 1) na ciemnym tle, lub pełnoekranowy spinner.
· Wydajność: Używaj CSS animations zamiast JavaScript tam, gdzie to możliwe. Skeleton screens powinny być lekkie, nie obciążać CPU.

Przykład wizualny (opis): Podczas ładowania listy twórców w Explore widać szkieletowe karty: szare prostokąty z migającym, jaśniejszym gradientem przesuwającym się z lewa na prawo. Każda karta skeleton ma miejsce na awatar (okrąg), dwa prostokąty na tekst i jeden mniejszy na przycisk. Przycisk "Wysyłanie…" ma wbudowany mały, obracający się spinner obok tekstu. Podczas mintingu NFT widać progress bar, który płynnie wypełnia się złotym gradientem od 0% do 100%.

---

2.9 Tooltipy & Popovery – Dymki z pomocą i dodatkowymi informacjami

Opis: Zaprojektuj małe dymki (tooltipy) pojawiające się po najechaniu kursorem (desktop) lub przytrzymaniu (mobile) na elementach interfejsu, wyjaśniające ich funkcję, szczegóły lub dostarczające dodatkowego kontekstu. Popover – podobny komponent, ale może zawierać więcej treści, obrazy, a nawet interaktywne elementy (przyciski, linki). Różnica: tooltip jest tylko informacyjny, popover może wymagać akcji.

Styl: Ciemne tło z lekką przezroczystością, białe teksty, zaokrąglone rogi (6px), mała strzałka (arrow) wskazująca na element, do którego się odnosi. Subtelny cień (box-shadow: 0 4px 20px rgba(0,0,0,0.15)). Dla popoverów – nieco większy, z możliwością wewnętrznego paddingu.

Kolory:

· Tło tooltipa/popovera: #002F2F z lekką przezroczystością (90% opacity) lub pełne.
· Tekst: Biały #FFFFFF.
· Strzałka (arrow): W kolorze tła tooltipa, z przezroczystością.
· Ramka (opcjonalnie dla popovera): Delikatna, złota 1px solid rgba(255,215,0,0.3).

Wymagania techniczne:

· Wyzwalacz (trigger): Tooltip aktywuje się na hover (desktop) i focus (klawiatura) oraz long press lub tap (mobile). Popover zwykle na click.
· Pozycjonowanie: Pojawia się nad, pod, po lewej lub prawej elementu, zależnie od dostępnego miejsca w viewporcie. Strzałka musi precyzyjnie wskazywać na element źródłowy. Użyj inteligentnego pozycjonowania (pozycjonowanie po stronie klienta, np. za pomocą Popper.js lub podobnej logiki).
· Opóźnienie pojawienia się: Tooltip pojawia się po 0.5-1s od najechania, aby nie rozpraszać przy przelatywaniu myszką nad interfejsem.
· Treść:
  · Tooltip: Krótki tekst (max 2-3 linie, 120 znaków), zwięzły i pomocny. Może zawierać prostą formatację (pogrubienie).
  · Popover: Może zawierać nagłówek, treść, obrazki, przyciski (np. "Potwierdź", "Anuluj"), linki. Struktura podobna do małego modala, ale powiązanego z elementem.
· Zamknięcie: Tooltip znika po odjechaniu myszką (z małym opóźnieniem 0.3s) lub utracie focusu. Popover zamyka się po kliknięciu poza jego obszarem, kliknięciu przycisku zamknięcia (X) lub naciśnięciu Escape.
· Dostępność: Dla elementów z tooltipami, użyj aria-describedby wskazującego na id tooltipa. Dla popoverów – aria-labelledby i aria-describedby. Upewnij się, że tooltipy są czytane przez czytniki ekranu.
· Animacja: Pojawienie się z fade-in i lekkim przesunięciem od strony, z której się pojawia (np. jeśli tooltip nad elementem, wjeżdża z góry o 5px). Czas: 200ms.

Przykład wizualny (opis): Po najechaniu kursorem na ikonę "i" obok napisu "Proof of Support NFT" pojawia się mały, ciemny dymek z tekstem "Unikalna, nieprzenoszalna odznaka NFT potwierdzająca Twoje wsparcie. Zapisana w blockchainie." Dymek ma strzałkę skierowaną w dół, wskazującą na ikonę. Po najechaniu na ikonę portfela w panelu, tooltip wyjaśnia "Saldo Twojego portfela TipJar. Obejmuje wszystkie otrzymane napiwki." Popover pojawia się po kliknięciu przycisku "Więcej opcji" przy transakcji, oferując akcje "Ukryj", "Zgłoś".

---

2.10 Avatary & Badge – Zdjęcia profilowe użytkowników, twórców oraz odznaki (badges)

Opis: Zaprojektuj okrągłe awatary używane w całej aplikacji do reprezentacji użytkowników i twórców: w nagłówkach profilów, listach, komentarzach, przy napiwkach itp. Domyślny avatar dla użytkowników bez zdjęcia. Odznaki (badges) jako nakładki na awatar lub osobne ikony, wskazujące na status (zweryfikowany, top fan, online).

Styl: Zawsze okrągłe (border-radius: 50%). Domyślny avatar to inicjały na kolorowym tle gradientowym lub ikona sylwetki. Odznaki – małe, okrągłe lub w kształcie tarczy, umieszczone w rogu awatara. Awatar musi zachować proporcje i nie zniekształcać zdjęcia.

Kolory:

· Tło domyślnego avatara: Gradient losowy generowany na podstawie hash nazwy użytkownika (np. odcienie złotego, fioletowego, turkusowego). Popularne kombinacje: #FFD700 → #9D4EDD, #003737 → #9D4EDD.
· Tekst inicjałów: Biały #FFFFFF (Mukta Malar Bold).
· Odznaka "Verified": Złote kółko z białym znacznikiem check (✓). Tło: #FFD700.
· Odznaka "Online": Zielona kropka #10B981 z białym obramowaniem.
· Odznaka "Top Fan"/"#1": Mała, złota korona lub trofeum. Może mieć numer.
· Ramka awatara (dla wyróżnienia): Możliwość dodania złotej ramki (border: 3px solid #FFD700) dla top supporterów lub twórców z osiągnięciami.

Wymagania techniczne:

· Rozmiary awatarów: Zdefiniuj skalę rozmiarów dla różnych kontekstów:
  · XS (Extra Small): 24px – dla list komentarzy, małych list.
  · S (Small): 32px – dla nagłówków tabel, powiadomień.
  · M (Medium): 64px – dla kart twórców, profilu w panelu.
  · L (Large): 100px – dla głównego awatara na profilu publicznym (desktop).
  · XL (Extra Large): 150px – dla hero sekcji profilu, wyróżnionych sekcji.
· Domyślny avatar: Jeśli użytkownik nie ma zdjęcia, wygeneruj awatar z inicjałami. Algorytm: weź pierwszą literę imienia i pierwszą literę nazwiska (lub dwie pierwsze litery nazwy użytkownika). Wyświetl w białym kolorze na gradientowym tle. Gradient jest deterministyczny (zawsze taki sam dla danej nazwy).
· Status online: Zielona kropka w prawym dolnym rogu awatara (tylko dla zalogowanych użytkowników, jeśli ta funkcja jest włączona). Rozmiar kropki: 25% rozmiaru awatara. Ma białe obramowanie 2px, aby było widoczne na każdym tle.
· Odznaki (Badges): Nakładane w prawym górnym rogu awatara. Rozmiar: ~20-30% rozmiaru awatara. Dla małych awatarów (XS, S) odznaki mogą być ukryte lub zastąpione małą kropką.
· Obsługa obrazów: Responsive images – używaj <img> z srcset i sizes dla różnych rozdzielczości. Zastosuj lazy loading (loading="lazy"). Domyślny fallback do avatara z inicjałami w przypadku błędu ładowania obrazka.
· Interakcje: Awatar może być klikalny (prowadzi do profilu). Hover na awatarze może pokazywać tooltip z pełną nazwą użytkownika i statusem.
· Specjalne warianty: Dla NFT odznak (Proof of Support), które mogą mieć różne kształty (kwadrat, heksagon), możemy zrobić wyjątek i wyświetlać je w ich naturalnym kształcie, ale awatary fanów na Fan Wall zawsze jako koła dla spójności.

Przykład wizualny (opis): Avatar twórcy to jego zdjęcie w okrągłym kadrze, z małą złotą odznaką "Verified" w prawym dolnym rogu. Jeśli fan nie ma zdjęcia, wyświetlane są inicjały "AK" na fioletowo-złotym gradientowym tle. Na awatarze online widoczna jest mała, zielona kropka z białym obramowaniem. W sekcji Top Fans, awatary mają dodatkową złotą ramkę. Miniatura NFT w kolekcji może mieć kształt sześciokąta, ale awatar jej właściciela obok – jest okrągły.

---
📱 LAYOUTY & STRUKTURY STRON – PEŁNA WERSJA

---

3.1 Strona Główna (Landing Page) – Desktop & Mobile

Opis: Zaprojektuj pełną stronę główną (landing page) platformy TipJar+, która stanowi pierwszą styczność potencjalnych użytkowników (twórców i fanów) z produktem. Strona musi błyskawicznie komunikować unikalną wartość proposition (połączenie prostoty Web2 z mocą Web3), budować zaufanie i prowadzić do dwóch głównych konwersji: rejestracji twórcy oraz przeglądania twórców przez fanów. Musi być nowoczesna, premium, responsywna i optymalizowana pod kątem wydajności.

Struktura sekcji (od góry do dołu):

1. Nagłówek globalny (Header) dla gościa:
   · Logo TipJar+ (klikalne, prowadzi na stronę główną).
   · Główne nawigacyjne linki tekstowe: "Dla Twórców", "Dla Fanów", "Jak to działa?", "Cennik" (opcjonalnie), "Centrum Wiedzy".
   · Przyciski akcji po prawej: "Zaloguj się" (secondary), "Załóż konto" (primary, złoty).
   · Na mobile: hamburger menu rozwijające te opcje.
2. Hero Section (Sekcja powitalna):
   · Tło: Dynamiczna, abstrakcyjna grafika 3D z blokami (zgodnie z promptem 1.5), możliwa z bardzo subtelną animacją paralaksy.
   · Główny nagłówek (H1): "Wspieraj ulubionych twórców bez granic." w Mukta Malar Bold, białym kolorem.
   · Podtytuł (H2): "TipJar+ łączy prostotę Patreona z szybkimi, globalnymi płatnościami w stablecoinie USDC. Żadnych barier, żadnej złożoności blockchain." w IBM Plex Sans Regular.
   · Dual CTA (Call to Action):
     · "Załóż profil twórcy" – duży, złoty przycisk primary, ikona plusa. Prowadzi do rejestracji z pre-selected rolą twórcy.
     · "Znajdź twórcę" – przycisk secondary z obramowaniem, ikoną lupy. Prowadzi bezpośrednio do strony Explore.
   · Wizualny element wspierający: Opcjonalnie, obok tekstu może znajdować się stylizowana, animowana ilustracja przedstawiająca interfejs aplikacji z przekazywaniem "słoika" z monetami od awatara fana do awatara twórcy.
3. Sekcja "Jak to działa" / Kluczowe korzyści:
   · Nagłówek sekcji (H2): "Dlaczego TipJar+?" wyśrodkowany.
   · Grid 3-4 kart w rzędzie (desktop), ułożonych w kolumnę na mobile. Każda karta zawiera:
     · Dużą, złotą ikonę (line style, np. globus, wykres spadkowy, błyskawica, integracja).
     · Krótki, mocny tytuł (H4) np. "Globalny zasięg", "Niskie opłaty", "Natychmiastowe wypłaty".
     · Krótki opis (1-2 zdania) w jasnoszarym kolorze.
4. Sekcja "Dla Twórców" (Feature Highlight):
   · Układ dwukolumnowy na desktop (tekst po lewej, grafika/kompozycja po prawej), jedna kolumna na mobile.
   · Tekstowa część: Tytuł "Zacznij zarabiać na swojej pasji", lista korzyści (ikona check), np. "Odbieraj płatności w USDC z całego świata", "Wypłać środki na konto bankowe lub krypto-portfel", "Buduj zaangażowaną społeczność fanów". CTA: "Zarejestruj się jako twórca".
   · Graficzna część: Estetyczny mockup ekranu Panelu Twórcy z przykładowymi danymi (wykres, lista napiwków), renderowany w stylu UI TipJar+.
5. Sekcja "Dla Fanów" (Feature Highlight):
   · Układ odwrotny: grafika po lewej, tekst po prawej (na desktop).
   · Tekstowa część: Tytuł "Wspieraj od 1$, bez konta". Podkreślenie prostoty: "Błyskawiczne płatności kartą lub kryptowalutą. Zostań anonimowym darczyńcą lub zbieraj odznaki NFT za swoje wsparcie." CTA: "Przeglądaj twórców".
   · Graficzna część: Mockup Publicznego Profilu Twórcy z widocznym przyciskiem "Wesprzyj" i modalem płatności.
6. Sekcja "Top Twórcy" / Social Proof:
   · Nagłówek: "Poznaj twórców na TipJar+".
   · Karuzela lub grid 3-4 przykładowych kart twórców (awatar, nazwa, kategoria, liczba fanów). Karty są klikalne (link do przykładowego profilu demo).
   · Przycisk "Zobacz wszystkich twórców" prowadzący do Explore.
7. Sekcja "Często zadawane pytania" (FAQ Preview):
   · Nagłówek: "Masz pytania?".
   · 3-4 rozwijane pytania (accordion) z podstawowych kategorii (np. "Czy potrzebuję portfela krypto?", "Jakie są opłaty?", "Czy to bezpieczne?"). Każde rozwinięcie zawiera krótką odpowiedź i link "Czytaj więcej w Centrum Wiedzy".
8. Sekcja Call-to-Action końcowa:
   · Ciemniejsze tło (#002626). Duży, centralny tekst: "Gotowy, by dołączyć do rewolucji wsparcia?".
   · Dwa przyciski obok siebie: "Zostań twórcą" i "Wspieraj twórców".
9. Stopka (Footer):
   · Górna część: Logo TipJar+, krótkie motto.
   · Kolumny linków: "Platforma" (O nas, Blog, Kariera), "Pomoc" (Centrum Wiedzy, Kontakt, Status), "Prawne" (Regulamin, Polityka prywatności, Cookies).
   · Informacje o partnerach: Logo/informacje o integracjach (Circle, Vercel, Ethereum) w formie małych, monochromatycznych ikon.
   · Dolna część: Copyright "© 2025 TipJar+ Sp. z o.o." oraz ikony mediów społecznościowych (Twitter, Discord, GitHub).

Wymagania techniczne:

· Full Responsiveness: Projekt musi być przetestowany na widełkach: 360px (mały telefon), 768px (tablet pion), 1024px (tablet poziom/mały laptop), 1440px+ (desktop).
· Performance: Obrazy hero i mockupów muszą być w nowoczesnych formatach (WebP/AVIF), responsywne (różne rozmiary dla różnych viewportów) i lazy loadowane (poza hero). Minimalizacja JavaScript.
· SEO: Semantyczna struktura HTML (h1-h6, sekcje, article). Poprawne meta tagi (tytuł, opis) generowane przez Next.js. Breadcrumbs niepotrzebne na LP.
· Animacje: Subtelne animacje pojawiania się sekcji przy scrollowaniu (fade-in, slide-up). Interaktywne elementy (hover na kartach, przyciskach) zgodne z design systemem. Animacja karuzeli twórców (jeśli karuzela) – płynna, z możliwością przewijania dotykiem/swipe.
· Dostępność: Pełna nawigacja klawiaturą, kontrast, czytniki ekranu. Prawidłowe aria-label dla przycisków i sekcji.
· Ścieżka konwersji: Przyciski CTA muszą prowadzić do odpowiednich punktów wejścia (rejestracja z pre-filled rolą, Explore). Rozważ śledzenie kliknięć dla analytics.

Przykład wizualny (opis): Użytkownik wchodzi na stronę. Widzi monumentalny hero section z głębokim, przestrzennym tłem 3D. Złoty napis "Wspieraj bez granic" przyciąga wzrok. Dwa wyraźne przyciski oferują jasny wybór. Przewijając w dół, widzi przejrzyste karty korzyści, a następnie naprzemienne sekcje z realistycznymi podglądami interfejsu. Karuzela z prawdziwymi twórcami buduje zaufanie. FAQ rozwiewa wątpliwości. Końcowy wezwanie do działania jest wyraźne i nie pozostawia wątpliwości co do kolejnego kroku. Całość utrzymana w ciemnej, eleganckiej palecie z akcentami złota i fioletu, sprawia wrażenie profesjonalnej, zaawansowanej technologicznie platformy.

---

3.2 Publiczny Profil Twórcy – Widok gościa/fana

Opis: Zaprojektuj stronę profilową konkretnego twórcy, dostępną pod unikalnym, przyjaznym URL (tipjar.plus/[username]). Profil pełni podwójną funkcję: (1) wizytówki – prezentuje twórcę, jego treści i osobowość; (2) punktu transakcyjnego – umożliwia fanowi natychmiastowe wsparcie finansowe. Kluczowym elementem UX jest budowanie zaufania poprzez społeczny dowód (ostatnie napiwki, top fani) oraz minimalizacja barier do wykonania pierwszej płatności.

Struktura (Layout: Mobile - jedna kolumna, Desktop - dwie kolumny z sticky panelem po prawej):

A. Główna kolumna zawartości (lewa/ jedyna na mobile):

1. Nagłówek profilu:
   · Banner/okładka: Opcjonalny, uploadowany przez twórcę (zalecany rozmiar 1500x500px). Jeśli brak, wyświetlane jest domyślne tło – gradient z palety brandowej lub subtelny wzór 3D.
   · Awatar i informacje podstawowe: Awatar (okrągły, 150px na desktop, 100px na mobile) wyświetlany na tle banera lub pod nim. Obok/poniżej: Imię i nazwisko/nick twórcy (H1). Krótka linijka tagów/kategorii (np. "Muzyka • Producent • Lo-fi"). Przycisk "Obserwuj" (jeśli funkcja follow włączona).
   · Weryfikacja: Jeśli konto zweryfikowane, ikona złotego znacznika check obok nazwy.
2. Sekcja "O twórcy":
   · Bio: Tekstowe wprowadzenie napisane przez twórcę. Formatowanie: akapity, odnośniki. Czcionka czytelna (IBM Plex Sans).
   · Linki społecznościowe: Pasek z ikonami linków do zewnętrznych profili (YouTube, Twitch, Twitter, Instagram, TikTok). Otwierają się w nowej karcie.
   · Osadzone media (opcjonalnie, poza MVP): Sekcja "Najnowsze" z możliwością osadzenia ostatniego filmu z YouTube/Vimeo lub galerii obrazów.
3. Sekcja "Wieczna Ściana Fanów" (Eternal Fan Wall):
   · Nagłówek z ikoną (np. nieskończoność/trofaj). Krótki opis: "Najhojniejsi fani, zapisani na zawsze w blockchainie Arweave".
   · Top 3 Fani: Poziomy rzędzie trzech wyróżnionych kart (desktop) lub pionowy stos (mobile). Każda karta: duży awatar, nazwa, łączna kwota wsparcia, ranga (np. "#1 Fan"). Tła kart w odcieniach złota/srebra/brązu.
   · Lista pozostałych (4-10): Pionowa lista z mniejszymi awatarami, nazwami i kwotami.
   · Przycisk "Zobacz pełną ścianę" linkujący do osobnej strony/rozszerzonego widoku z listą wszystkich fanów i linkiem do transakcji Arweave.
4. Sekcja "Ostatnie wsparcia" (Live Activity Feed):
   · Nagłówek "Ostatnia aktywność".
   · Lista 5-10 najnowszych napiwków w formie strumienia czasu (timeline): "Janek wsparł $5 — 2 min temu", "Anonimowy fan wsparł $10 — 1 godzinę temu". Każdy wpis może zawierać krótką wiadomość.
   · Real-time update: Nowe napiwki pojawiają się na górze listy z subtelną animacją highlight (zielone tło na 2 sekundy). Wymaga integracji WebSocket lub częstego polling.

B. Prawa kolumna / Sticky Panel "Wesprzyj twórcę" (na mobile: sekcja pod nagłówkiem, przycisk CTA sticky na dole ekranu podczas scrollowania):

1. Panel akcji:
   · Główny przycisk CTA: Duży, złoty przycisk "😊 Wesprzyj [Nazwa Twórcy]" z ikoną serca. Po kliknięciu otwiera modal płatności.
   · Przycisk subskrypcji (jeśli dostępne): Fioletowy przycisk "Subskrybuj [NFT]" z ikoną korony/gwiazdy. Otwiera modal z wyborem planu subskrypcji.
   · Informacje o portfelu (widoczne tylko dla twórcy po zalogowaniu): "Twoje saldo: X USDC". Dla gości/fanów niewidoczne.
   · Statystyki publiczne (opcjonalnie): Można wyświetlić liczbę obserwujących, łączną liczbę napiwków (bez konkretnych kwot) jako społeczny dowód.
   · Przyciski udostępniania: Małe ikony "Udostępnij profil" (kopiuj link, Twitter, Facebook).
2. Informacje o weryfikacji i dołączeniu:
   · "Zweryfikowany twórca" ze znacznikiem (jeśli dotyczy).
   · "Na TipJar+ od [data]" – buduje historię.
   · Link "Zgłoś ten profil" (mały, szary tekst).

Wymagania techniczne:

· Responsywność: Na desktop układ dwukolumnowy (70%/30%). Na mobile układ jednokolumnowy, z panelem akcji wkopiowanym pod nagłówkiem, a przyciskiem "Wesprzyj" przyklejonym do dolnej krawędzi ekranu (sticky) podczas scrollowania, aby zawsze był dostępny.
· Modal płatności: Otwierany z panelu akcji. Zawiera pełny proces: wybór kwoty, metody płatności, opcjonalną wiadomość, potwierdzenie.
· Generowanie OG Image: Dla każdego profilu backend musi dynamicznie generować obraz Open Graph (1200x630px) zawierający awatar twórcy, jego nazwę, tagline i logo TipJar+. Użyte przy udostępnianiu linku na social media.
· Ładowanie i SEO: Profil powinien być renderowany po stronie serwera (SSR lub SSG z revalidation) dla dobrych praktyk SEO. Publiczne dane (bio, nazwa) statyczne, dynamiczne (napiwki, fan wall) fetchowane client-side po załadowaniu strony.
· Bezpieczeństwo: Profil gościa nie może wyświetlać wrażliwych danych twórcy (saldo, dane wypłat). Wszelkie formy płatności muszą być obsługiwane przez bezpieczne, szyfrowane połączenia.
· Dostępność: Sekcje muszą mieć logiczne nagłówki (h1, h2). Opisy obrazów (awatar, banner) dla czytników. Przyciski z wyraźnymi etykietami.

Przykład wizualny (opis): Profil artysty graficznego "PixelDream". Baner przedstawia kolaż jej prac. Duży, okrągły awatar z ilustracją. Po prawej stronie złoty przycisk "Wesprzyj PixelDream" dominuje. Przewijając w dół, czytamy inspirujące bio i widzimy linki do jej Instagrama i Behance. Niżej sekcja "Top Fani" z trzema awatarami fanów, którzy wsparli łącznie ponad $1000 każdy. Na żywo aktualizująca się lista pokazuje "Kasia wsparła $15 — przed chwilą". Całość sprawia wrażenie aktywnej, wspieranej społeczności, zachęcając gościa do dołączenia.

---

3.3 Katalog Twórców (Explore / Odkrywaj)

Opis: Zaprojektuj stronę typu "marketplace" lub "katalog", której głównym celem jest odkrywalność. Umożliwia użytkownikom (głównie fanom) przeglądanie, wyszukiwanie i filtrowanie wszystkich twórców zarejestrowanych na platformie. Strona powinna promować zarówno popularnych, jak i nowych twórców, ułatwiać odnalezienie interesujących profili i prowadzić do ich stron. Jest to kluczowy punkt nawigacji po platformie.

Struktura (Strony typu listing z zaawansowanymi narzędziami filtrowania):

1. Górny pasek narzędzi i nagłówek:
   · Nagłówek strony (H1): "Odkrywaj Twórców" lub "Znajdź twórców do wsparcia".
   · Pole wyszukiwania (Search Bar): Pełna szerokość lub duże, wyśrodkowane pole z placeholderem "Szukaj twórców, kategorii...". Z ikoną lupy. Wyniki wyszukiwania mogą pojawiać się na żywo poniżej (typeahead).
   · Pasek filtrów szybkich (Quick Filters): Przyciski/pills z najpopularniejszymi kategoriami (np. "Muzyka", "Gaming", "Edukacja", "Sztuka", "Nowi"). Kliknięcie aktywuje filtr.
   · Przycisk "Zaawansowane filtry": Rozwija panel/sidebar z pełną gamą opcji filtrowania.
2. Panel zaawansowanych filtrów (rozsuwany z lewej strony lub overlay):
   · Filtry wielokrotnego wyboru: Kategorie, Języki, Poziom weryfikacji.
   · Filtry zakresu: Minimalna liczba obserwujących, Data dołączenia.
   · Sortowanie: Dropdown z opcjami: "Polecani (domyślnie)", "Najnowsi", "Najpopularniejsi (obserwujący)", "Najaktywniejsi (ostatnie napiwki)".
   · Przyciski akcji: "Zastosuj filtry" (złoty), "Wyczyść wszystko" (link).
   · Liczba znalezionych wyników wyświetlana na górze panelu.
3. Główna przestrzeń zawartości – Siatka kart:
   · Układ siatki (Grid): Na desktop: 3-4 kolumny (w zależności od szerokości). Na tablet: 2-3 kolumny. Na mobile: 1 kolumna.
   · Karta twórcy: Użycie komponentu karty (z 2.3). Każda karta zawiera: awatar (średni), nazwę, główną kategorię, bardzo krótki opis (truncated), oraz metryki społeczne (np. ikona serca + liczba obserwujących). Cała karta jest klikalna (link do profilu). Hover efekt zgodny z komponentem.
   · Placeholder / Skeleton: Podczas ładowania danych wyświetlane są skeleton cards.
4. Paginacja / Infinite Scroll:
   · Wariant 1 (Paginacja): Klasyczna paginacja na dole strony z numerami stron i przyciskami next/prev. Dobra dla SEO i przewidywalności.
   · Wariant 2 (Infinite Scroll / Load More): Przy przewijaniu do dołu automatycznie ładują się kolejne wyniki. Przycisk "Załaduj więcej" na końcu listy. Lepsze dla zaangażowania, ale gorsze dla SEO i nawigacji. Zalecenie: Dla Explore lepsza jest paginacja.
5. Stany specjalne:
   · Brak wyników: Wyświetl przyjazny komunikat: "Nie znaleziono twórców spełniających kryteria. Spróbuj zmienić filtry." z ilustracją (pusty słoik) i przyciskiem "Wyczyść filtry".
   · Błąd ładowania: Komunikat o błędzie z przyciskiem "Spróbuj ponownie".
   · Pierwsze wejście (puste filtry): Można wyświetlić sekcję "Polecani" lub "Trendujący" na górze siatki.

Wymagania techniczne:

· URL i stan: Wyszukiwanie i wszystkie filtry/sortowanie muszą być odzwierciedlone w parametrach URL (query params). Umożliwia to bookmarkowanie, sharing linków do konkretnych wyników wyszukiwania i korzystanie z przycisku "wstecz" w przeglądarce.
· Wydajność: Siatka z wieloma kartami i obrazkami wymaga optymalizacji: lazy loading obrazów (Intersection Observer), virtual scrolling dla bardzo długich list (jeśli infinite scroll), cache'owanie wyników zapytań po stronie klienta.
· Algorytm "Polecani": Domyślne sortowanie powinno być hybrydowe, biorące pod uwagę wiele czynników: weryfikację, aktywność (napiwki), świeżość profilu, kompletność profilu. Zapobiega to dominacji kilku najstarszych twórców.
· Breadcrumbs (opcjonalnie): "Strona główna > Odkrywaj" nad nagłówkiem strony.
· Analytics: Śledzenie kliknięć w karty, użycia filtrów i wyszukiwania dla celów produktowych.
· Dostępność: Siatka kart musi być nawigowalna klawiaturą (Tab, Enter). Każda karta powinna mieć semantyczny tag <article> i czytelny opis dla czytników.

Przykład wizualny (opis): Użytkownik wchodzi na stronę Explore. Widzi duże pole wyszukiwania i pasek z kolorowymi tagami kategorii. Klikając "Gaming", siatka natychmiast się odświeża, pokazując streamerów i twórców gier. Po lewej stronie wysuwa się panel z dodatkowymi filtrami, gdzie można wybrać język "polski" i sortowanie "Najaktywniejsi". Siatka pokazuje teraz polskich gamingowych twórców z największą liczbą ostatnich napiwków. Każda karta ma awatar, nazwę i liczbę obserwujących. Kliknięcie w kartę przenosi do profilu.

---

3.4 Centrum Wiedzy (Learn) – Edukacja / FAQ

Opis: Zaprojektuj sekcję edukacyjną / help center, której nadrzędnym celem jest budowanie zaufania i obniżanie barier wejścia. Ma służyć zarówno nowym użytkownikom (fanom i twórcom), jak i osobom zainteresowanym technologią Web3. Poprzez klarowne artykuły, FAQ i poradniki, platforma demistyfikuje kryptowaluty, tłumaczy działanie TipJar+ i odpowiada na pytania bezpieczeństwa. Dobrze zaprojektowany Learn Center zmniejsza obciążenie dla działu wsparcia i zwiększa konwersję.

Struktura (Layout: 2 kolumny na desktop z sticky nawigacją, 1 kolumna na mobile):

1. Nagłówek strony:
   · Tytuł (H1): "Centrum Wiedzy TipJar+" lub "Jak działa TipJar+?".
   · Podtytuł: "Znajdziesz tu odpowiedzi na najczęstsze pytania i przewodniki krok po kroku.".
   · Wyszukiwarka pomocy: Duże, wyśrodkowane pole wyszukiwania z placeholderem "Jak założyć portfel? Jak działają wypłaty?..." – główny punkt wejścia.
2. Główny obszar treści (dwukolumnowy na desktop):
   · Lewa kolumna (70-80% szerokości) – Artykuł:
     · Ścieżka okruszków (Breadcrumbs): "Centrum Wiedzy > Dla Twórców > Wypłaty".
     · Tytuł artykułu (H1).
     · Metadane: Data ostatniej aktualizacji, autor (np. "Zespół TipJar+").
     · Spis treści (Table of Contents): Dla dłuższych artykułów, automatycznie generowany z nagłówków <h2> wewnątrz artykułu. Sticky podczas scrollowania.
     · Treść artykułu: Sformatowany tekst z użyciem nagłówków (H2, H3), akapitów, list, wyróżnień (callout), obrazków poglądowych/ikon, osadzonych filmów. Styl pisania: Nieformalny, przyjazny, zero żargonu. Jeśli użyto terminu technicznego (np. "gas fee"), wyjaśniony w tooltipie lub wtrąceniu.
     · Sekcja "Czy to było pomocne?": Na końcu artykułu przyciski "Tak" / "Nie" z opcjonalnym polem na feedback, jeśli "Nie". Daje informację zwrotną dla autorów.
     · Powiązane artykuły: Pod artykułem sugestie "Czy może Cię również zainteresować...".
   · Prawa kolumna (20-30% szerokości) – Nawigacja i CTA (Sticky):
     · Główne kategorie tematyczne: Accordion lub lista linków do głównych działów: "Pierwsze kroki", "Dla Twórców", "Dla Fanów", "Bezpieczeństwo i Płatności", "Web3 & Blockchain", "Rozwiązywanie problemów".
     · Promowane artykuły: "Najczęściej czytane", "Nowe poradniki".
     · CTA do kontaktu: "Nie znalazłeś odpowiedzi? Skontaktuj się z nami." z linkiem do formularza kontaktowego.
     · CTA do akcji: "Chcesz zostać twórcą?" z przyciskiem "Załóż konto teraz".
3. Strona listy artykułów w kategorii:
   · Jeśli użytkownik wejdzie w kategorię (np. "Dla Twórców"), zamiast pojedynczego artykułu, lewa kolumna wyświetla listę wszystkich artykułów w tej kategorii w formie kart/lista z tytułem i krótkim opisem.

Wymagania techniczne:

· System zarządzania treścią (CMS): Treści muszą być łatwe do aktualizacji przez zespół (np. przez headless CMS jak Contentful, Strapi lub pliki markdown w repo). Struktura artykułów musi obsługiwać formatowanie, obrazy, osadzanie.
· SEO: Każdy artykuł to osobna, indeksowalna strona z poprawnymi meta tagami (tytuł, opis), structured data (FAQPage, HowTo, Article). Breadcrumbs poprawiają nawigację dla botów.
· Czytelność: Artykuły mają kontrastowy schemat kolorów dla lepszej czytelności długich tekstów. Proponowany: jasne tło (#F8F9FA), ciemny tekst (#212529), akcenty brandowe. Może to być jedyne miejsce w aplikacji z jasnym motywem. Czcionka dla treści: IBM Plex Sans, 18px, line-height 1.7.
· Wyszukiwanie: Wyszukiwarka musi przeszukiwać tytuły i treści artykułów, zwracając wyniki w czasie rzeczywistym (client-side lub szybkie zapytanie do API). Strona wyników wyszukiwania powinna być czytelna.
· Responsywność: Na mobile prawa kolumna (nawigacja) może chować się pod przyciskiem menu lub być przeniesiona pod treść artykułu.
· Statystyki: Śledzenie wyświetleń artykułów i ocen "pomocności" dla optymalizacji treści.

Przykład wizualny (opis): Nowy użytkownik, zainteresowany, ale niepewny technologii, wchodzi do Centrum Wiedzy. Widzi przyjazną wyszukiwarkę i wpisuje "jak kupić USDC". Zostaje przeniesiony do szczegółowego artykułu z jasnymi krokami: "1. Załóż konto na giełdzie Binance, 2. Zweryfikuj tożsamość...", z ilustracjami interfejsów. Po prawej stronie widzi spis treści artykułu i linki do powiązanych tematów ("Jak założyć portfel MetaMask?"). Czytając, czuje się bezpieczniej i rozumie proces. Na końcu artykułu klika "Tak", że to było pomocne.

---
📱 LAYOUTY & STRUKTURY STRON – PEŁNA WERSJA

3.5 Panel Twórcy (Creator Dashboard) – Wewnętrzny panel zarządzania

Opis: Zaprojektuj kompleksowy, dynamiczny panel/dashboard dla twórcy, dostępny po zalogowaniu. Panel jest "centrum dowodzenia" – miejsce zarządzania profilem, środkami, interakcji z fanami i dostępu do zaawansowanych funkcji (subskrypcje, DAO, AI Asystent). Musi być wydajny, informacyjny i umożliwiać szybkie wykonywanie kluczowych akcji. Projekt w duchu "dark mode analytics dashboard".

Struktura layoutu:

· Desktop: Układ z stałym sidebarem po lewej (nawigacja główna) i głównym obszarem po prawej. Górny pasek (topbar) z powiadomieniami, pomocą i menu użytkownika.
· Mobile: Układ z hamburger menu (slide-in drawer) zawierającym nawigację. Górny pasek z tytułem sekcji i ikonami powiadomień/profilu. Główny obszar pełnoekranowy.

A. Sidebar Nawigacyjny (Desktop):

1. Logo / Awatar Twórcy: W górnej części sidebaru, kompaktowe logo TipJar+ lub okrągły awatar twórcy z inicjałami/nazwą.
2. Menu główne: Lista linków z ikonami i tekstem, pogrupowana logicznie:
   · SEKCJA GŁÓWNA: Dashboard (ikona: pulpit), Napiwki (ikona: serce), Subskrypcje (ikona: korona), Fan Wall (ikona: ściana).
   · FINANSE: Wypłaty (ikona: bank), Portfel (ikona: portfel), Raporty (ikona: wykres).
   · INTERAKCJE: Wiadomości (ikona: czat), Powiadomienia (ikona: dzwonek).
   · USTAWIENIA: Profil (ikona: użytkownik), Integracje (ikona: zębatka), Bezpieczeństwo (ikona: kłódka).
   · ZAAWANSOWANE: DAO Governance (ikona: osoby), Asystent AI (ikona: robot) – jeśli dostępne.
   · POMOC: Centrum Wiedzy (ikona: książka), Kontakt (ikona: mail).
3. Indykator aktywny: Podświetlenie (złote tło/obramowanie) aktywnej sekcji.
4. Stopka sidebaru: Przycisk "Wyloguj" i wersja aplikacji.

B. Topbar (Desktop & Mobile):

· Tytuł bieżącej sekcji (np. "Dashboard").
· Ikona powiadomień z licznikiem nieprzeczytanych. Dropdown z listą powiadomień.
· Ikona pomocy/FAQ (link do Centrum Wiedzy).
· Menu użytkownika: Awatar + pseudonim, rozwija się w dropdown z opcjami: "Mój profil", "Ustawienia", "Przełącz na panel fana" (jeśli ma obie role), "Wyloguj".
· Na mobile: Hamburger menu z lewej strony.

C. Główny obszar – Dashboard (strona startowa):

1. Nagłówek powitalny: "Cześć, [Imię]!" z datą i krótką statystyką (np. "Dziś: +$50").
2. Kafelek "Szybki podgląd":
   · Saldo portfela: Duża liczba (np. "1,540.25 USDC") z przyciskiem "Wypłać". Trend 24h (+/- %).
   · Statystyki okresowe (wybór: dziś/tydzień/miesiąc/rok): Suma napiwków, Liczba wspierających, Średni napiwek, Najwyższy napiwek.
3. Wykres aktywności: Interaktywny wykres liniowy lub słupkowy przedstawiający przychód w czasie (z wyborem zakresu). Możliwość podglądu szczegółów po najechaniu.
4. Sekcja "Ostatnie napiwki": Tabela/lista 5-10 najnowszych transakcji z możliwością szybkiego podziękowania (przycisk "Podziękuj" obok każdego).
5. Sekcja "Wymagane akcje" / "To Do": Banery z zaleceniami: "Dokończ weryfikację konta", "Dodaj zdjęcie profilowe", "Skonfiguruj pierwszą wypłatę".
6. Sekcja "Twoi Top Fani": Miniaturowa wersja Fan Wall z top 3 fanami i linkiem do pełnej listy.
7. Asystent AI (floating widget): Ikonka mikrofonu/robota w rogu ekranu, klikalna, otwiera interfejs czatu/głosowy.

D. Podstrony szczegółowe (dynamicznie ładowane):

· Napiwki/Historia: Pełna tabela z zaawansowanymi filtrami (data, kwota, fan), sortowaniem, wyszukiwaniem i eksportem do CSV.
· Subskrypcje: Dashboard MRR, lista subskrybentów, zarządzanie planami.
· Wypłaty: Formularz wypłaty (kwota, metoda – bank/krypto), historia wypłat, statusy.
· Fan Wall: Pełna, edytowalna (możliwość ukrycia/pinowania fanów) lista z danymi.
· Wiadomości: Uproszczony interfejs czatu z fanami (konwersacje w panelu, możliwość odpisywania).
· Ustawienia: Formularze podzielone na podstrony (Profil, Konto, Bezpieczeństwo, Powiadomienia, Integracje).

Wymagania techniczne:

· SPA (Single Page Application): Nawigacja między sekcjami bez przeładowania strony (np. React Router). Płynne przejścia.
· Real-time updates: Saldo, liczba powiadomień, lista napiwków aktualizowane na żywo via WebSocket lub częsty polling.
· Responsywność: Sidebar na mobile chowa się do drawer. Tabele na mobile przekształcają się w karty. Wykresy dostosowują skalę.
· Performance: Lazy loading ciężkich komponentów (wykresy, pełne listy). Optymalizacja obrazów.
· Data visualization: Wykresy za pomocą lekkiej biblioteki (Recharts, Chart.js) w stylu brandowym (ciemne tło, złote/fioletowe linie).
· AI Asystent integration: Widget musi mieć API do komunikacji z backendem AI, obsługiwać voice input (Web Speech API) i wyświetlać konwersację.

Przykład wizualny (opis): Twórca loguje się i widzi dashboard. Na górze jego saldo $2,450, z trendem +5% od wczoraj. Wykres pokazuje duży skok w weekend (stream). Ostatnie napiwki pokazują, że "JanFan" dał $100 z wiadomością "Za nowy album!". Obok przycisk "Podziękuj". W sekcji "Wymagane akcje" świeci się żółty baner "Skonfiguruj wypłaty, aby otrzymać środki". Po prawej stronie pulsuje ikonka Asystenta AI. Całość na ciemnym, eleganckim tle, z wyraźnymi kontrastami.

---

3.6 Panel Fana – Panel użytkownika-fana

Opis: Zaprojektuj uproszczony, ale angażujący panel dla zalogowanego fana, który wspiera twórców, ale sam nie jest twórcą. Celem jest zwiększenie retencji i lojalności poprzez grywalizację (odznaki NFT), śledzenie aktywności i personalizację. Panel ma być przyjemny w użytkowaniu, wizualnie atrakcyjny (więcej kolorów niż panel twórcy) i skupiać się na społecznościowym aspekcie wsparcia.

Struktura layoutu (prostsza niż panel twórcy):

· Desktop & Mobile: Podobna struktura z uproszczonym sidebarem/menu (lub dolna nawigacja na mobile) i głównym obszarem.
· Górny pasek: Powitanie, awatar fana, powiadomienia, ustawienia.

Główne sekcje zawartości:

1. Strona główna panelu fana (Dashboard fana):
   · Nagłówek personalny: "Witaj z powrotem, [Nick]!" z awatarem.
   · Kafelek "Twoja aktywność": Łączna kwota wsparcia (wszystkich czasów), Liczba wspieranych twórców, Ostatnia aktywność.
   · Sekcja "Twoje ostatnie wsparcia": Lista 3-5 ostatnich napiwków/subskrypcji z linkiem do pełnej historii.
   · Sekcja "Zdobyte ostatnio odznaki": Galeria 3-4 najnowszych NFT Proof of Support z animacją "new". Kliknięcie prowadzi do szczegółów.
   · Sekcja "Polecani twórcy" (algorytm): Sugestie nowych twórców do wsparcia, bazujące na obserwowanych kategoriach.
2. Sekcja "Twoje odznaki" (pełna galeria NFT):
   · Filtry i sortowanie: Według twórcy, rzadkości, daty.
   · Galeria grid: Karty miniatur NFT (kształt zachowany oryginalny, ale w jednolitej ramce). Hover: podświetlenie, szybki podgląd.
   · Szczegóły odznaki: Po kliknięciu – modal z pełnym obrazkiem, opisem, danymi i przyciskami udostępniania.
   · Statystyki kolekcjonerskie: "Posiadasz 15 odznak, w tym 2 rzadkie".
3. Sekcja "Obserwowani / Wspierani twórcy":
   · Dwie listy: Obserwowani (follow) i Aktywne subskrypcje.
   · Dla każdego twórcy: awatar, nazwa, data ostatniego wsparcia, przycisk "Przejdź do profilu" i "Anuluj subskrypcję" (jeśli dotyczy).
   · Możliwość zarządzania powiadomieniami od danego twórcy.
4. Sekcja "Historia transakcji":
   · Uproszczona tabela wszystkich napiwków i subskrypcji z filtrami.
5. Sekcja "Ustawienia konta fana":
   · Podstawowe: Edycja profilu (nick, avatar, bio).
   · Powiadomienia: Email/push o nowych treściach od obserwowanych, napiwkach zwrotnych.
   · Integracje: Podłączenie portfela Web3 (dla NFT), linki do social media.
   · CTA "Zostań twórcą": Prominentny przycisk inicjujący onboarding twórcy.

Wymagania techniczne:

· Integracja z portfelem Web3: Jeśli fan łączy zewnętrzny portfel (np. przez SIWE), panel powinien pokazywać jego publiczny adres i umożliwiać zarządzanie NFT (chociażby podgląd). Możliwość "zaimportowania" odznak z innego adresu.
· Grywalizacja: System rzadkości odznak (common, uncommon, rare, legendary) z wizualnymi wskaźnikami. Możliwe "zestawy kolekcjonerskie" (wsparcie wszystkich twórców z danej kategorii).
· Responsywność: Galeria odznak dostosowuje liczbę kolumn. Na mobile może być pionowy lista z większymi miniaturami.
· Personalizacja: Możliwość ustawienia własnego awatara, banneru w profilu (publiczny profil fana – jeśli funkcja włączona).
· Wydajność: Galeria NFT może zawierać wiele obrazków – konieczny lazy loading i optymalizacja (thumbnails).

Przykład wizualny (opis): Fan "GameLord" wchodzi do panelu. Widzi, że wsparł łącznie $420, 5 twórców, a jego ostatni napiwek to $10 dla streamera "ShotQueen". Poniżej świeci się nowa, złota odznaka NFT za wsparcie powyżej $100. W galerii ma już 7 odznak, w tym jedną legendarną (fioletową). Lista obserwowanych pokazuje 3 twórców, przy jednym zielona ikona "online". Panel jest żywszy kolorystycznie (więcej fioletu), czuć atmosferę kolekcjonowania i społeczności.

---

3.7 Strona Logowania/Rejestracji – Uwierzytelnianie

Opis: Zaprojektuj wspólny, maksymalnie uproszczony i bezpieczny interfejs uwierzytelniania (logowanie i rejestracja) dla wszystkich użytkowników TipJar+. Musi obsługiwać wiele metod: klasyczny email+hasło, OAuth (Google, Twitch, Twitter), oraz Web3 (Sign-In with Ethereum - SIWE). Proces musi być intuicyjny, minimalizujący kroki, a jednocześnie edukujący w przypadku metod Web3. To brama do platformy.

Struktura (Modal lub pełna strona):

1. Wybór trybu: Dwa tabs/buttons: "Zaloguj się" / "Zarejestruj się". Aktywny podświetlony na złoto.
2. Formularz email+hasło (dla obu trybów):
   · Pola: "Adres e-mail", "Hasło". Dla rejestracji dodatkowo "Powtórz hasło".
   · Dla logowania: checkbox "Zapamiętaj mnie", link "Nie pamiętasz hasła?".
   · Dla rejestracji: checkbox "Akceptuję Regulamin i Politykę prywatności" z linkami.
   · Przycisk "Kontynuuj" (złoty).
3. Separator: Linia z tekstem "lub kontynuuj przez".
4. Przyciski OAuth & Web3:
   · OAuth: Przyciski z ikonami "Google", "Twitch", "Twitter" (lub inne). Standardowy flow przekierowania.
   · Web3: Przycisk "Zaloguj się przez portfel" (ikona MetaMask/portfel). Po kliknięciu:
     · Krok 1: Wybór portfela z listy (MetaMask, Coinbase Wallet, WalletConnect) – może być w modal.
     · Krok 2: Instrukcja: "Podpisz wiadomość w swojej aplikacji portfelowej, aby potwierdzić tożsamość. To nie jest transakcja i nie wiąże się z opłatą.".
     · Krok 3: Po pomyślnym podpisie, automatyczne logowanie i przekierowanie.
5. Tryb gościa (opcjonalnie, widoczny tylko w niektórych kontekstach): Link "Kontynuuj bez logowania" z wyjaśnieniem: "Możesz wspierać twórców bez zakładania konta. Nie będziesz jednak mógł śledzić historii ani zbierać odznak.".
6. Informacje pomocnicze: "Rejestrując się, możesz zostać zarówno fanem, jak i twórcą. Rolę twórcy możesz aktywować w dowolnym momencie w ustawieniach.".

Wariant: Rejestracja z wyborem roli (opcjonalne):

· Po podaniu emaila/hasła lub OAuth, krótki ekran: "Kim chcesz być na TipJar+?".
· Dwie karty: "Fan" (ikona serca, opis "Wspieraj twórców, zbieraj odznaki") i "Twórca" (ikona słoika, opis "Odbieraj napiwki, buduj społeczność"). Wybór jednej lub obu.
· Jeśli wybrano "Twórcę", po rejestracji automatyczne przejście do krótkiego onboarding.

Wymagania techniczne:

· Walidacja real-time: Format email, siła hasła (progress bar), zgodność haseł.
· Integracja OAuth: Standard OAuth2 flow, z możliwością późniejszego łączenia wielu metod do jednego konta.
· Integracja SIWE (Web3): Użycie biblioteki jak siwe (Sign-In with Ethereum). Backend generuje unikalny nonce, frontend prosi o podpis, backend weryfikuje podpis i loguje/ tworzy konto powiązane z adresem Ethereum.
· Responsywność: Na mobile pełna strona, na desktop może być wyśrodkowany modal lub też pełna strona.
· Bezpieczeństwo: CAPTCHA? (np. invisible reCAPTCHA v3) przy rejestracji. Hasła hashowane. Dla Web3 – weryfikacja podpisu po stronie serwera.
· UX dla Web3: Instrukcje muszą być bardzo jasne dla nowych użytkowników. Obsługa błędów (brak portfela, zła sieć, odrzucony podpis) z pomocnymi komunikatami.

Przykład wizualny (opis): Użytkownik wchodzi na stronę i klika "Zarejestruj się". Widzi formularz email/hasło oraz duże przyciski Google i Twitch. Jest także ciekawy przycisk "Portfel kryptowalutowy". Klika go. Pojawia się mały modal z listą portfeli; wybiera MetaMask. W przeglądarce otwiera się okno MetaMask z prośbą o podpisanie wiadomości "Welcome to TipJar+...". Podpisuje. Za chwilę jest już zalogowany i widzi dashboard. Cały proces bez podawania hasła.

---

3.8 Strony Błędów (404, 500) & Inne Stany Globalne

Opis: Zaprojektuj przyjazne, spójne z brandem strony dla błędów HTTP (404, 500, 403) oraz innych globalnych stanów aplikacji (konserwacja, brak dostępu, pusty stan). Mają one pocieszyć użytkownika, wyjaśnić problem w przystępny sposób i zaproponować konkretne działania powrotu do funkcjonalności. To okazja do pokazania charakteru marki nawet w niepowodzeniu.

Struktura (wspólny szablon z ilustracją i akcjami):

1. Kod błędu: Duży, wyrazisty numer (np. "404") w stylu Mukta Malar Bold, w kolorze złotym lub fioletowym.
2. Tytuł komunikatu: Krótki, przyjazny nagłówek, np. "Strona nie istnieje", "Coś poszło nie tak", "Jesteśmy w trakcie ulepszania!".
3. Opis problemu: Wyjaśnienie w ludzkim języku, np. "Strona, której szukasz, mogła zostać przeniesiona lub jest chwilowo niedostępna.", "Wystąpił wewnętrzny błąd naszych serwerów. Nasz zespół został już o tym poinformowany.".
4. Ilustracja/Animacja: Unikalna, tematyczna ilustracja w stylu brandu (np. dla 404: rozbity słoik z mlekiem; dla 500: robot naprawiający serwer). Może być animowana (Lottie).
5. Sugerowane działania (CTA):
   · Podstawowy: Przycisk "Wróć na stronę główną" (złoty).
   · Dodatkowe: "Przejdź do Centrum Wiedzy" (dla błędów technicznych), "Skontaktuj się z pomocą" (link do formularza), "Odśwież stronę".
6. Informacja techniczna (opcjonalnie, dla zaawansowanych): Dla błędów 500, możliwość rozwinięcia szczegółów (trace ID) do przekazania supportowi.

Specyficzne stany:

· 404 – Nie znaleziono: Używane, gdy strona/profil nie istnieje. Może zawierać wyszukiwarkę.
· 500 – Błąd serwera: Komunikat z przeprosinami i zapewnieniem, że zespół pracuje nad rozwiązaniem.
· 403 – Brak dostępu: "Nie masz uprawnień do przeglądania tej strony. Czy jesteś zalogowany na właściwe konto?".
· 503 – Konserwacja: Strona informująca o planowanych pracach, z timerem do zakończenia i możliwością zapisania się do powiadomienia.
· Offline / Brak połączenia: Komunikat w aplikacji (PWA) informujący o braku internetu z przyciskiem "Spróbuj ponownie".

Wymagania techniczne:

· Responsywność: Ilustracja i tekst dostosowują się do ekranu.
· Integracja z frameworkiem: W Next.js, custom pages w katalogu pages/404.js, pages/500.js.
· Dostępność: Prawidłowe nagłówki, semantyczny HTML, komunikaty czytane przez czytniki.
· Spójność: Kolorystyka i czcionki zgodne z design systemem. Ilustracje w podobnym, line-art stylu.

Przykład wizualny (opis): Użytkownik wpisuje błędny URL i trafia na stronę 404. Widzi duże, złote "404", poniżej napis "Ups! Słoik się potłukł...". Ilustracja przedstawia smutnego, stylizowanego słoika z pęknięciem i rozlanymi monetami. Pod spodem przycisk "Posprzątaj i wróć do domu" prowadzący na stronę główną. Całość utrzymana w ciemnych tonacjach, ale z poczuciem humoru.

---


🧠 ELEMENTY FUNKCJONALNE & WEB3 – PEŁNA WERSJA

---

4.1 Widget Płatności (Payment Modal) – Web3 & Karty

Opis: Zaprojektuj zaawansowany modal płatności używany do wysyłania napiwków i zakupu subskrypcji. Musi bezszwowo łączyć trzy światy: tradycyjne płatności kartą (przez Circle), płatności kryptowalutowe z portfela Web3 (Ethereum), oraz wewnętrzne saldo platformy TipJar. Interfejs musi być intuicyjny dla zupełnie nowych użytkowników (którzy mogą nigdy nie widzieć portfela krypto), a jednocześnie oferować zaawansowane opcje dla wtajemniczonych. To kluczowy moment konwersji, gdzie zaufanie i przejrzystość są najważniejsze.

Struktura krokowa (wizard) z możliwością powrotu:

1. Nagłówek i kontekst:
   · Tytuł: "Wesprzyj [Nazwa Twórcy]" lub "Kup subskrypcję [Nazwa Planu]".
   · Podtytuł: "Każda kwota ma znaczenie ❤️" (dla napiwków) lub "Odbierz swoje korzyści" (dla subskrypcji).
   · Mały awatar twórcy w nagłówku.
   · Przycisk zamknięcia (X) w prawym górnym rogu.
2. Krok 1: Wybór kwoty / planu:
   · Dla napiwków: Szybkie przyciski z popularnymi kwotami ($1, $5, $10, $20, $50). Każdy przycisk może mieć subtelny opis emocjonalny (np. $1: "❤️ Dzięki!", $5: "👍 Świetna robota!", $10: "🔥 Niesamowite!").
   · Pole własnej kwoty: Z placeholderem "Wpisz kwotę". Obok wyświetlacz "≈ X USDC" przeliczający na żywo po kursie. Walidacja: minimum $0.10, maksimum $10,000 (lub inne biznesowe).
   · Dla subskrypcji: Wyświetlenie kart dostępnych planów z nazwą, ceną miesięczną i listą korzyści (benefits). Użytkownik wybiera jedną.
3. Krok 2: Wybór metody płatności:
   · Trzy karty opcji w rzędzie (lub jedna pod drugą na mobile):
     1. Karta płatnicza / Apple Pay / Google Pay: Ikona karty/Apple/Google. Tekst: "Zapłać kartą" z podpisem "Szybko i bezpiecznie".
     2. Portfel kryptowalutowy: Ikona MetaMask/portfela. Tekst: "Zapłać kryptowalutą (USDC)" z podpisem "Wykorzystaj swój portfel (np. MetaMask)".
     3. Saldo TipJar (tylko jeśli użytkownik ma środki): Ikona słoika. Tekst: "Zapłać z salda TipJar".
   · Po wyborze, odpowiedni formularz rozwija się płynnie pod wyborem.
4. Formularze specyficzne dla metody:
   · Karta płatnicza:
     · Integracja z Circle Elements dla wbudowanego, PCI-DSS compliant iframe z polami karty.
     · Pola: Numer karty, Data ważności, CVC, Kod pocztowy (dla US).
     · Checkbox: "Zapisz tę kartę do przyszłych płatności" (tylko dla zalogowanych).
     · Komunikat o bezpieczeństwie: "🔒 Płatność przetwarzana bezpiecznie przez Circle." z małym logo Circle.
   · Portfel kryptowalutowy (Web3):
     · Stan 1 (Niepołączony): Duży przycisk "Połącz portfel" (lub "Wybierz portfel"). Po kliknięciu wyświetla się modal z listą wspieranych portfeli (MetaMask, Coinbase Wallet, WalletConnect).
     · Stan 2 (Połączony): Wyświetla nazwę portfela, skrócony adres (0xAbC...1234) i saldo USDC w tym portfelu.
     · Informacja: "Transakcja zostanie wykonana w sieci Ethereum. Opłata sieciowa (gas) zostanie dodana do kwoty." (TipJar może pokryć gas jako promotion).
     · Przycisk "Zatwierdź w portfelu" – po kliknięciu wywołuje request do podpisania transakcji w zewnętrznej aplikacji portfela.
   · Saldo TipJar:
     · Wyświetla aktualne saldo użytkownika.
     · Przycisk "Zapłać [kwota] z salda". Jeśli saldo niewystarczające, przycisk disabled i sugestia doładowania.
5. Dodatkowe opcje (accordion "Dodaj szczegóły"):
   · Pole wiadomości: "Dodaj prywatną wiadomość dla twórcy (opcjonalnie)" – pole tekstowe.
   · Checkbox "Chcę otrzymać Proof of Support NFT": Domyślnie zaznaczone. Opis: "Otrzymaj unikalną odznakę NFT potwierdzającą Twoje wsparcie." (można dodać tooltip z przykładem).
   · Checkbox "Pozostań anonimowy": "Moja nazwa nie pojawi się publicznie na liście wspierających ani w Fan Wall.".
   · Checkbox "Zapisz tę metodę jako domyślną": Dla zalogowanych użytkowników.
6. Podsumowanie i finalizacja:
   · Sekcja "Podsumowanie" z tabelą: Kwota napiwku/subskrypcji, Opłata platformy (jeśli jest, np. "0%"), Opłata sieciowa (szacowana, dla krypto), Suma do zapłaty.
   · Przycisk finalizujący: Duży, złoty przycisk o dynamicznym tekście: "Wyślij napiwek [kwota]" / "Subskrybuj za [kwota/miesiąc]" / "Zapłać [suma]".
   · Mały tekst: "Klikając, akceptujesz [Regulamin] TipJar+.".
7. Stany po wysłaniu:
   · Ładowanie: Modal wchodzi w stan loading (przyciemnienie, spinner), szczególnie ważne przy oczekiwaniu na potwierdzenie transakcji blockchain.
   · Sukces: Modal zmienia się w komunikat sukcesu: duża ikona ✔, podziękowanie, potwierdzenie transakcji (hash dla krypto), informacja o mintowaniu NFT (jeśli dotyczy). Przyciski: "Zamknij", "Udostępnij wsparcie", "Przejdź do panelu".
   · Błąd: Wyświetla się czytelny komunikat o przyczynie (np. "Niewystarczające środki", "Transakcja odrzucona", "Błąd sieci"). Sugestia rozwiązania i przycisk "Spróbuj ponownie".

Wymagania techniczne:

· Integracje API: Circle Payments API (karty), Web3.js/Ethers.js + SIWE (portfele), własne backendowe endpointy do obsługi salda i subskrypcji.
· Walidacja w czasie rzeczywistym: Sprawdzanie formatu karty (Luhn), dostępności środków (dla salda/krypto), poprawności adresu portfela.
· Obsługa wielu sieci: Głównie Ethereum Mainnet, ale struktura gotowa na Polygon/Solana w przyszłości.
· Responsywność i mobile-first: Na mobile modal jest pełnoekranowy, z możliwością scrolla wewnętrznego. Płatności kartą – Circle Elements dostosowuje się. Płatności Web3 – musi obsługiwać deep linking do aplikacji portfelowych (MetaMask Mobile, Trust Wallet).
· Animacje: Płynne przejścia między krokami (slide left/right). Pojawianie się szczegółów metody płatności (expand/collapse).
· Bezpieczeństwo: Zero przechowywania danych karty po stronie frontendu. Wszystkie wrażliwe dane przez Circle. Dla Web3 – nigdy nie prosimy o seed phrase, tylko o podpisanie wiadomości/transakcji.
· Dostępność: Pełna nawigacja klawiaturą, focus trap w modalie, opisy dla czytników ekranu.

Przykład wizualny (opis): Fan na profilu muzyka klika złoty przycisk "Wesprzyj". Otwiera się modal z wyborem kwoty. Wybiera $10. Następnie wybiera "Portfel kryptowalutowy". Łączy swój MetaMask – modal pokazuje jego adres i saldo 50 USDC. Rozwija "Dodaj szczegóły" i wpisuje "Kocham tę piosenkę!". Podsumowanie pokazuje: Napiwek: $10, Opłata sieciowa: ~$1.50, Suma: $11.50. Klika "Wyślij napiwek $11.50". Pojawia się prośba o potwierdzenie w MetaMask. Po podpisaniu, modal pokazuje sukces, zielony check i informację "Twój Proof of Support NFT jest już mintowany!". Cały proces trwa ~30 sekund.

---

4.2 Proof of Support NFT (Odznaka NFT) – Wizualizacja i Interakcje

Opis: Zaprojektuj kompleksowy system wizualny i interfejsowy dla "Proof of Support NFT" – unikalnego, nieprzenoszalnego (soulbound) tokenu NFT, który jest automatycznie mintowany po każdym napiwku jako cyfrowe potwierdzenie i pamiątka wsparcia. NFT ma wartość sentymentalną i prestiżową, a jego design musi to odzwierciedlać. System obejmuje generowanie grafiki, wyświetlanie miniatur i szczegółów, oraz interakcje społecznościowe.

Elementy systemu:

1. Dynamiczna grafika NFT (obrazy generowane on-demand):
   · Format i rozmiar: Kwadrat 1024x1024px, renderowany w wysokiej rozdzielczości.
   · Warstwy designu (od tła do przodu):
     · Tło: Abstrakcyjny, gradientowy wzór w kolorystyce brandowej (turkus/złoto/fiolet) z subtelnym, powtarzalnym motywem (np. mikro-słoiki, obwody).
     · Główny motyw graficzny: Centralnie umieszczony, stylizowany symbol związany z twórcą lub ogólny (np. "Słoik Wsparcia" z otwartym wieczkiem i promieniami światła). Ten motyw może mieć różne warianty w zależności od "rzadkości" (rarity), która zależy od kwoty napiwku lub liczby wsparć u danego twórcy:
       · Common (brązowy): Do $5. Prostszy symbol, matowe kolory.
       · Uncommon (srebrny): $5 - $50. Bardziej szczegółowy, metaliczne odcienie.
       · Rare (złoty): $50 - $500. Skomplikowany, z animowanymi (w formacie GIF/MP4) elementami jak migoczące światło.
       · Legendary (fioletowy/kryształ): Powyżej $500. Ekstrawagancki, z unikalnymi efektami, może zawierać element personalny od twórcy (np. mini-podpis).
     · Dane kontekstowe (dynamicznie renderowany tekst):
       · Nazwa: "Proof of Support #123"
       · Dla [Nazwa Twórcy]
       · Data: 15.01.2025
       · Kwota: $25.00
       · Unikalny numer (np. ostatnie 4 znaki hash transakcji).
     · Ozdobne elementy: Granice, pieczęcie, drobne ikony (serce, gwiazdy) w rogach.
   · Technologia generacji: Renderowanie po stronie serwera przy użyciu biblioteki canvas (np. Node.js z canvas) lub klienta, z cachingiem wynikowego obrazu (IPFS/Arweave/S3). Dane (kwota, data, nazwa) pobierane z blockchainu/backendu.
2. Miniatura (thumbnail) do list i galerii:
   · Rozmiar: 256x256px lub 128x128px.
   · To może być uproszczona wersja głównej grafiki (tylko centralny motyw na jednolitym kolorowym tle odpowiadającym rzadkości) lub po prostu pomniejszony obraz.
   · Kształt: Zaokrąglony kwadrat (border-radius: 12px).
   · Dla kolekcji w Panelu Fana, każda miniatura może mieć mały znaczek rzadkości w rogu (kolorowy punkcik lub ikona).
3. Modal/Strona szczegółów NFT:
   · Otwiera się po kliknięciu miniatury w Panelu Fana lub na liście wspierających.
   · Duży podgląd grafiki (600x600px) z możliwością kliknięcia do pełnego rozmiaru.
   · Karta metadanych:
     · Podstawowe: Nazwa NFT, Twórca (z linkiem do profilu), Data wsparcia, Kwota, Zawarta wiadomość (jeśli była).
     · Techniczne: Adres kontraktu NFT, Token ID, Hash transakcji mintowania (linki do Etherscan/Arweave).
     · Status: "Soulbound (Nieprzenoszalny)" z ikoną kłódki.
   · Panel akcji:
     · "Udostępnij na Twitterze" – generuje przygotowany tweet z grafiką NFT i tekstem "Wsparłem [Twórcę] na @TipJarPlus! 🎉".
     · "Pobierz obraz" – pobiera PNG w wysokiej rozdzielczości.
     · "Zobacz na OpenSea" (jeśli opublikowane) – link do secondary marketplace (choć soulbound, to może być widoczne).
   · Historia (opcjonalnie): Jeśli NFT ma wielokrotne "ulepszenia" (kolejne napiwki od tego samego fana do tego samego twórcy zwiększają poziom), można pokazać timeline.
4. Integracja z interfejsem (gdzie się pojawia):
   · Panel Fana: Sekcja "Twoje odznaki" jako galeria.
   · Profil publiczny twórcy: W sekcji "Top Fani" jako małe ikony przy nazwach fanów. Po kliknięciu ikony, podgląd odznaki tego fana dla tego twórcy.
   · Lista transakcji w Panelu Twórcy: Ikona NFT obok napiwku, która po najechaniu pokazuje podgląd odznaki.
   · Powiadomienia: "Otrzymałeś odznakę NFT za wsparcie [Twórcy]!"

Wymagania techniczne:

· Standard tokenu: ERC-721 lub ERC-1155 z rozszerzeniem Soulbound (np. używając beforeTokenTransfer hook aby blokować transfery). Metadane przechowywane zdecentralizowanie (IPFS/Arweave) z pointerem w kontrakcie.
· Generowanie i przechowywanie grafiki: Backend nasłuchuje eventów TipSent z smart kontraktu lub zapisów w DB, następnie generuje obraz, uploaduje go do IPFS/Arweave, a hash zasobu zapisuje w metadanych NFT mintowanych przez kontrakt.
· Wyświetlanie w UI: Frontend ładuje metadane z URI, wyciąga link do obrazka (IPFS gateway) i wyświetla. Należy obsługiwać fallback w przypadku wolnego ładowania.
· Responsywność: Galeria miniatur dostosowuje liczbę kolumn. Modal szczegółów jest responsywny.
· Koszty: Minting NFT wiąże się z opłatą gas. Platforma TipJar+ może pokrywać tę opłatę w ramach kosztów operacyjnych (minting w batch, sponsoring gas przez Paymaster).

Przykład wizualny (opis): Po wysłaniu napiwku $50 artystce, fan po kilkunastu sekundach otrzymuje powiadomienie w aplikacji. W Panelu Fana, w sekcji odznak pojawia się nowa, złota miniatura z symbolem palety malarskiej otoczonej aureolą. Po kliknięciu otwiera się modal, gdzie na dużym obrazku widać detale: paleta ma subtelnie migoczące złote światło, a na dole napis "Proof of Support #78 dla ArtAnna • $50 • 15.01.2025". Fan może kliknąć "Udostępnij na Twitterze", by pochwalić się swoim wsparciem.

---

4.3 Eternal Fan Wall – Zintegrowany z Arweave

Opis: Zaprojektuj interfejs "Wiecznej Ściany Fanów" – listy najhojniejszych fanów danego twórcy, zapisanej na stałe i niezmiennie w blockchainie Arweave. Celem jest stworzenie nieśmiertelnego pomnika uznania dla fanów, który zwiększa ich prestż, lojalność i dostarcza potężnego społecznego dowodu dla nowych odwiedzających profil. Arweave gwarantuje, że dane (nazwa fana, łączna kwota) przetrwają tak długo, jak sieć istnieje.

Struktura i wizualizacja:

1. Widok podstawowy (na publicznym profilu twórcy):
   · Nagłówek sekcji: "Wieczna Ściana Fanów 🏛️" z ikoną (np. kamienna tablica/wieczność). Krótki opis: "Najhojniejsi patroni, uwiecznieni w blockchainie Arweave. Ich wsparcie nigdy nie zostanie zapomniane."
   · Top 3 Fani (Hall of Fame):
     · Trzy karty w poziomym rzędzie (desktop) lub stosie pionowym (mobile).
     · Karta #1 Fan (Złota): Tło gradientowe złoto-fioletowe. Duży, ozdobny awatar z koroną. Wyświetlana nazwa, łączna kwota wsparcia (np. "$2,540"), tytuł "#1 Fan".
     · Karta #2 Fan (Srebrna): Tło srebrne/grafitowe. Awatar z laurem. Nazwa, kwota, tytuł "#2 Fan".
     · Karta #3 Fan (Brązowa): Tło brązowe/miedziane. Awatar z wieńcem. Nazwa, kwota, tytuł "#3 Fan".
   · Lista honorowa (Poz. 4-10): Pionowa lista z mniejszymi awatarami, nazwami i kwotami. Możliwość rozwijania do pełnej listy (np. top 50) w modal/nowej stronie.
   · Przycisk "Zobacz pełną tablicę" prowadzący do osobnej, dedykowanej strony Fan Wall.
2. Pełna strona "Wieczna Ściana Fanów":
   · Hero sekcja z avatarem i nazwą twórcy, tytułem "Wieczna Ściana Fanów [Nazwa Twórcy]".
   · Interaktywna tabela/lista wszystkich fanów z paginacją (np. po 20). Kolumny: Pozycja, Awatar & Nazwa, Łączna kwota wsparcia, Liczba napiwków, Data ostatniego wsparcia.
   · Filtry i sortowanie: Sortowanie po kwocie, dacie, liczbie napiwków. Filtr "Pokazuj tylko fanów z NFT" (jeśli chcemy).
   · Informacja o blockchainie: Sekcja "Technologia": "Ta lista jest zapisana w sieci Arweave, gwarantującej permanentne przechowywanie. Transakcja zapisu: [link do Arweave TX]". Pokazuje niezmienność i transparentność.
   · Możliwość eksportu listy jako JSON (dla zaawansowanych użytkowników).
3. Mechanizm aktualizacji i wyświetlania:
   · Zapis do Arweave: Po każdym napiwku, backend TipJar+ aktualizuje ranking (lub po okresie, np. co godzinę) i wypycha zaktualizowaną listę top fanów jako transakcję do Arweave. Dane w formacie JSON.
   · Odczyt z cache: Dla wydajności UI, frontend pobiera dane z cache'u backendu, ale weryfikowalność jest kluczowa: każdy wpis na liście może mieć małą ikonę "🔗", która po najechaniu pokazuje tooltip z linkiem do transakcji Arweave potwierdzającej ten wpis.
   · Integracja z NFT: Obok nazwy fana, jeśli posiada on "Proof of Support NFT" od tego twórcy, wyświetlana jest mała ikonka NFT (np. diament), która po kliknięciu pokazuje podgląd tej odznaki.

Wymagania techniczne:

· Integracja z Arweave: Backend używa SDK Arweave (lub serwisu typu Bundlr) do podpisywania i wysyłania transakcji danych. Każda transakcja zawiera: identyfikator twórcy, timestamp, listę fanów z nazwami i sumami. Koszt: jednorazowa opłata za permanentne przechowanie.
· Struktura danych w Arweave: JSON z schematem, np.: { creatorId: "abc", timestamp: 123456789, fans: [ { userId: "def", totalAmount: 100, ... }, ... ] }. Każda nowa transakcja nadpisuje poprzedni stan (można przechowywać historię wersji).
· API do odczytu: Backend wystawia endpoint /api/creator/[id]/fanwall, który zwraca aktualne dane z własnej bazy, ale również arweaveTxId ostatniej transakcji dla weryfikacji.
· UI i UX: Podczas ładowania danych wyświetlić skeleton screen. Jeśli dane są świeższe niż ostatnia transakcja Arweave (np. napiwek sprzed 5 minut), można to zaznaczyć: "Najnowsze wsparcia (jeszcze nie zapisane na wieczność)".
· Responsywność: Tabela na full page musi być responsywna (horizontal scroll na mobile lub przekształcenie w karty).

Przykład wizualny (opis): Na profilu popularnego streamera, sekcja "Wieczna Ściana Fanów" pokazuje trzy złote, srebrne i brązowe karty z awatarami jego top supporterów, którzy wsparli łącznie po kilka tysięcy dolarów. Nowy odwiedzający widzi ten prestiż i społeczny dowód. Klikając "Zobacz pełną tablicę", widzi listę 100+ fanów. Obok każdego nazwiska jest mały diament – ikona NFT. Klikając ikonę obok #1 fana "CryptoKing", widzi podgląd jego złotej, animowanej odznaki NFT. Na dole strony link do transakcji Arweave, która gwarantuje, że lista "CryptoKing" jako #1 fan jest zapisana na zawsze. To tworzy głębokie poczucie uznania i historii.

---

4.4 Subscriptions NFT – System subskrypcji NFT

Opis: Zaprojektuj pełny, zintegrowany system subskrypcji oparty o NFT. Mechanizm: fan kupuje (lub otrzymuje) NFT subskrypcyjne, który działa jak "bilet członkowski" upoważniający do korzyści przez określony okres (miesiąc). NFT jest automatycznie odnawiany (lub wymagana jest okresowa płatność), a jego stan (aktywny/wygasły) jest widoczny na blockchainie. System obejmuje interfejs dla twórcy (tworzenie planów, zarządzanie) i fana (zakup, zarządzanie subskrypcją).

A. Dla Twórcy (w Panelu Twórcy, sekcja "Subskrypcje"):

1. Tworzenie i edycja planów subskrypcji:
   · Formularz z polami: Nazwa planu (np. "Złoty Fan"), Cena miesięczna (USDC), Okres rozliczeniowy (miesiąc/kwartał/rok), Opis korzyści (lista bullet points, np. "Dostęp do prywatnego Discorda", "Wczesny dostęp do filmów", "Miesięczny Q&A live").
   · Ustawienia NFT:
     · Upload/design grafiki NFT dla tego planu (możliwość wygenerowania szablonu przez platformę z logo twórcy).
     · Limitowana ilość? (np. tylko 100 "Złotych Fanów").
     · Czy NFT jest transferowalny? (Domyślnie: tak, ale subskrypcja się nie przenosi? To złożone – raczej soulbound).
   · Ustawienia płatności: Czy pierwszy okres ma trial? Czy płatności cykliczne są automatyczne (z portfela lub karty) czy manualne (fan musi każdy miesiąc potwierdzać)?
2. Dashboard subskrypcji:
   · Przegląd: Aktywne subskrypcje (liczba), MRR (Monthly Recurring Revenue), Churn rate, przewidywany przychód.
   · Lista subskrybentów: Tabela z subskrybentami, ich planem, datą rozpoczęcia, datą kolejnej płatności, statusem (aktywna, przetwarzana, anulowana, zaległa). Możliwość filtrowania.
   · Akcje na subskrybencie: Widok szczegółów (historia płatności), ręczne anulowanie subskrypcji, wysłanie wiadomości (do wszystkich subskrybentów lub wybranych).
   · Zarządzanie planami: Lista aktywnych/archiwalnych planów z możliwością edycji/dezaktywacji (nie można zmieniać ceny dla istniejących subskrybentów?).
3. Integracja z benefitami: Miejsce na konfigurację automatycznych benefitów: np. nadawanie roli na Discordzie po zakupie (przez webhook), automatyczne wysyłanie linków do prywatnych treści.

B. Dla Fana (zakup i zarządzanie):

1. Zakup subskrypcji (na profilu twórcy):
   · Przycisk "Subskrybuj" obok "Wesprzyj". Otwiera modal podobny do płatności, ale z wyborem planu na pierwszym kroku.
   · Po wyborze planu, proces płatności (karta/krypto/saldo) jak zwykły napiwek, ale z wyraźną informacją o cykliczności: "Subskrybujesz plan [Nazwa] za [cena]/miesiąc. Pierwsza płatność zostanie pobrana natychmiast, kolejne co miesiąc automatycznie."
   · Po udanej płatności, fan otrzymuje NFT subskrypcyjny na swój adres (lub do wewnętrznej kolekcji TipJar). Komunikat sukcesu: "Witaj w klubie! Otrzymałeś NFT subskrypcji. Sprawdź swoje korzyści."
2. Panel zarządzania subskrypcją (w Panelu Fana):
   · Sekcja "Moje subskrypcje" lista aktywnych subskrypcji z awatarem twórcy, nazwą planu, datą kolejnego odnowienia, przyciskiem "Zarządzaj".
   · Strona szczegółów subskrypcji: Pokazuje historię płatności, korzyści, linki do benefitów. Przycisk "Anuluj subskrypcję" (z potwierdzeniem: "Czy na pewno? Stracisz dostęp do korzyści po zakończeniu bieżącego okresu.").
   · Wizualizacja NFT: Podgląd NFT subskrypcyjnego, który może zmieniać się wizualnie w zależności od czasu trwania subskrypcji (np. licznik dni).
3. NFT Subskrypcyjne – design i funkcje:
   · Graficznie podobny do Proof of Support, ale z inną symboliką (klucz, korona, bilet wstępu). Zawiera metadane: plan, twórca, data wygaśnięcia.
   · Stan na blockchainie: NFT może mieć w metadanych pole expiryDate. Frontend może czytać to pole i wyświetlać status: "Aktywny do 15.02.2025" lub "Wygasły". Wygaśnięcie nie niszczy NFT, tylko zmienia jego stan (może szarzeje w UI).
   · Automatyczne odnawianie: Jeśli fan wyraził zgodę na płatności cykliczne z karty/salda, backend co miesiąc inicjuje transakcję. Jeśli się nie uda (brak środków), NFT przechodzi w stan "Zaległy", a fan dostaje powiadomienia.

Wymagania techniczne (bardzo zaawansowane):

· Smart Kontrakt Subskrypcji: Potrzebny dedykowany kontrakt ERC-1155/ERC-721, który:
  · Mintuje NFT przy pierwszym zakupie.
  · Przechowuje mapowanie tokenId -> expiryDate.
  · Udostępnia funkcję renewSubscription(tokenId, payment) aktualizującą expiryDate.
  · Może implementować standard EIP-5006 (Governance SBT) dla czasowo ważnych SBTs.
· Backend Cron Job: Serwis, który codziennie sprawdza, które subskrypcje wygasają za 3 dni i wysyła powiadomienia e-mail/push, a które wygasły i powinny zostać oznaczone jako nieaktywne (i potencjalnie wywołać webhook do odebrania benefitów).
· Integracja płatności cyklicznych: Dla kart – użycie Circle's Subscriptions lub podobnego. Dla krypto – bardziej złożone, wymaga zezwoleń (allowance) od użytkownika i automatu (Chainlink Keepers/Gelato) do wykonywania okresowych transferów.
· UI/UX wyzwań: Jasne komunikowanie, co się dzieje z NFT po anulowaniu (czy pozostaje jako pamiątka?). Obsługa wielu sieci (gas fees). Odświeżanie stanu subskrypcji na frontendzie (polling lub websocket).

Przykład wizualny (opis): Twórca "CodeMaster" tworzy plan "VIP Mentor" za $30/miesiąc z benefitami: code review i miesięczna konsultacja. Fan "Jane" subskrybuje, płacąc kartą. W jej Panelu Fana pojawia się nowa subskrypcja z awatarem CodeMaster i licznikiem "Kolejna płatność: 15.02.2025". Otrzymuje też NFT – cyfrowy klucz z napisem "VIP Mentor". Gdy zbliża się termin odnowienia, dostaje e-mail. Jeśli anuluje, NFT zmienia kolor na szary i pokazuje "Wygasła", ale Jane może go zachować jako pamiątkę. CodeMaster w swoim panelu widzi Jane na liście subskrybentów i może wysłać jej zaproszenie na prywatny Discord.

---
🧠 ELEMENTY FUNKCJONALNE & WEB3 – PEŁNA WERSJA (ciąg dalszy)

4.5 DAO Panel (Governance) – Głosowanie DAO

Opis: Zaprojektuj zaawansowany interfejs do zarządzania i uczestnictwa w Decentralized Autonomous Organization (DAO) platformy TipJar+. DAO ma umożliwiać społeczności (posiadaczom tokenów zarządzania lub wybranym twórcom) wspólne podejmowanie decyzji o kierunku rozwoju, alokacji funduszy czy zmianach regulaminu. Panel musi być przejrzysty, edukacyjny i zachęcać do aktywnego udziału, jednocześnie ukrywając złożoność on-chain głosowań tam, gdzie to możliwe.

Struktura i widoki (dla użytkowników z odpowiednimi uprawnieniami – tokeny lub role):

1. Strona główna DAO (Dashboard):
   · Nagłówek: "DAO TipJar+ – Kształtuj przyszłość platformy". Krótki opis: "Posiadacze tokenów TIP mają prawo głosować i tworzyć propozycje."
   · Metryki użytkownika: "Twój udział głosów: X TIP" (lub procent). Informacja o dacie ważności głosów.
   · Lista aktywnych propozycji (Proposals): Karty każdej propozycji z tytułem, krótkim opisem, paskiem postępu głosowania (Za vs Przeciw), statusem (Aktywna, Zakończona, W trakcie) oraz terminem zakończenia. Karta zawiera też informację, czy użytkownik już głosował.
   · Przycisk "Utwórz nową propozycję" – widoczny dla użytkowników z odpowiednim progiem tokenów.
2. Strona szczegółów propozycji:
   · Nagłówek: Tytuł propozycji, identyfikator, status, twórca propozycji.
   · Sekcja "Szczegóły": Pełny opis, link do dokumentu (IPFS, Notion, Discourse), cel i uzasadnienie.
   · Sekcja "Głosowanie" (jeśli aktywne i użytkownik może głosować):
     · Przyciski "Za", "Przeciw", "Wstrzymuję się" (wyróżnione kolorystycznie).
     · Pole do wpisania liczby tokenów (jeśli głosowanie wagowe) – suwak lub input.
     · Informacja o koszcie gazowym (dla głosowania on-chain) – może być sponsorowane.
     · Przycisk "Oddaj głos" (złoty) – po kliknięciu wywołuje podpis transakcji (jeśli on-chain) lub natychmiast rejestruje (off-chain).
   · Sekcja "Wyniki na żywo": Pasek postępu (Za – zielony, Przeciw – czerwony, Wstrzymane – szary) z procentami i liczbą głosów/ tokenów. Wykres kołowy lub słupkowy.
   · Sekcja "Dyskusja" (opcjonalnie, integracja z forum): Komentarze lub link do dyskusji na zewnętrznym forum (Discourse, Discord).
   · Kalendarz: Daty rozpoczęcia i zakończenia głosowania, czas do zakończenia (odliczanie).
3. Archiwum (Zakończone propozycje):
   · Tabela lub lista kart zakończonych propozycji z wynikami (Za/Przeciw), datą zakończenia i informacją, czy została wdrożona.
   · Filtry: status (przyjęta, odrzucona), kategoria, data.
4. Tworzenie nowej propozycji (dla uprawnionych):
   · Formularz: Tytuł, opis (wspierający Markdown), kategoria (np. "Zmiana techniczna", "Alokacja funduszy", "Regulamin").
   · Opcjonalnie: link do dokumentu, adres portfela docelowego (dla transferów).
   · Podgląd kosztów (opłata za stworzenie propozycji na blockchainie, jeśli dotyczy).
   · Przycisk "Utwórz i wyślij do głosowania" (złoty) – podpis transakcji.

Wymagania techniczne:

· Integracja z blockchainem: Obsługa on-chain (np. poprzez kontrakt Governor OpenZeppelin) oraz off-chain (Snapshot) dla głosowań. UI musi rozróżniać te tryby.
  · On-chain: UI wywołuje propose(), castVote() na kontrakcie, czeka na potwierdzenie transakcji, wyświetla progress. Pokazuje koszt gazu.
  · Off-chain (Snapshot): UI przekierowuje do Snapshot lub używa ich API; wymaga podpisu wiadomości (EIP-712).
· Odświeżanie w czasie rzeczywistym: Wyniki głosowania aktualizowane na żywo (polling lub WebSocket).
· Responsywność: Na mobile, karty propozycji są czytelne, a przyciski głosowania duże.
· Edukacja: Tooltipy i linki do "Czym jest DAO?" dla nowych użytkowników.

Przykład wizualny (opis): W panelu DAO widnieje aktywna propozycja: "Czy obniżyć prowizję platformy z 5% na 3%?" Głosowanie kończy się za 3 dni. Pasek postępu pokazuje 60% za, 40% przeciw. Użytkownik, który posiada 150 tokenów TIP, może kliknąć "Za" i suwakiem wybrać, czy chce oddać wszystkie 150. Po kliknięciu "Oddaj głos" pojawia się prośba o podpis w MetaMask. Po podpisaniu, pasek postępu aktualizuje się. Użytkownik czuje, że ma realny wpływ na platformę.

---

4.6 Dynamiczny Asystent AI (Voice/Chatbot) – Interfejs

Opis: Zaprojektuj interfejs Asystenta AI – nowoczesnego, konwersacyjnego agenta, który pomaga użytkownikom (zarówno twórcom, jak i fanom) w poruszaniu się po platformie, wykonywaniu zadań, odpowiadaniu na pytania i automatyzacji powtarzalnych czynności. Asystent obsługuje zarówno komendy tekstowe, jak i głosowe. Ma być użyteczny, szybki i nieinwazyjny, a jego osobowość – przyjazna i profesjonalna.

Elementy interfejsu:

1. Ikona aktywacji (Floating Action Button – FAB):
   · Stały przycisk w prawym dolnym rogu ekranu, na wszystkich stronach (z wyjątkiem niektórych modalów). Złoty lub fioletowy, z ikoną dymka/mikrofonu/robota.
   · Stany: domyślny, hover (uniesienie), active (kliknięcie). Delikatne pulsowanie, gdy asystent ma nową sugestię lub rekomendację.
2. Okno czatu (Chat Window):
   · Pojawia się po kliknięciu FAB. Jest to wysuwany panel (od dołu lub z boku) z historią konwersacji i polem wejścia.
   · Desktop: Panel o stałej szerokości (400px), z prawej strony, unosi się nad treścią.
   · Mobile: Panel zajmuje całą wysokość ekranu, zsuwany od dołu (slide-up), z możliwością zamknięcia przez przycisk X lub swipe down.
   · Elementy panelu:
     · Nagłówek: "Asystent TipJar+", ikona, przycisk zamknięcia. Opcjonalnie: wskaźnik gotowości (zielona kropka).
     · Historia konwersacji: Lista bąbelków (użytkownika po prawej, asystenta po lewej). Bąbelki asystenta mogą zawierać tekst, proste formatowanie, linki, przyciski akcji (np. "Pokaż mi dashboard", "Wesprzyj [twórcę]"), a nawet karty (np. podgląd profilu twórcy).
     · Pole wprowadzania: Pole tekstowe z placeholderem "Zapytaj mnie o cokolwiek...". Obok przycisk wysyłania (ikona strzałki) i ikona mikrofonu (dla głosu).
     · Sekcja sugestii (opcjonalnie, gdy okno puste): Krótkie sugestie typu "Sprawdź moje statystyki", "Znajdź popularnych twórców", "Jak wypłacić środki?".
3. Interakcja głosowa:
   · Po kliknięciu ikony mikrofonu, asystent prosi o pozwolenie na dostęp do mikrofonu, a następnie słucha. Animacja fali dźwiękowej w polu wprowadzania.
   · Rozpoznana komenda jest zamieniana na tekst i wysyłana. Asystent odpowiada zarówno tekstem, jak i głosem (opcjonalnie, z możliwością wyłączenia).
4. Przykładowe dialogi i akcje:
   · Fan: "Pokaż mi twórców z kategorii muzyka." → Asystent wyświetla listę kart (lub przekierowuje do Explore z filtrem).
   · Twórca: "Jaka jest moja suma napiwków w tym tygodniu?" → Asystent pobiera dane z API i wyświetla w formie tekstowej lub małego wykresu.
   · Fan: "Wesprzyj JanKowalski kwotą 10$." → Asystent otwiera modal płatności z pre-filled danymi.
   · Twórca: "Przypomnij mi o wypłacie za tydzień." → Asystent tworzy przypomnienie (integracja z kalendarzem lub powiadomieniami).
   · Ogólne: "Jak działa Proof of Support NFT?" → Asystent wyświetla krótki opis i link do artykułu w Centrum Wiedzy.

Wymagania techniczne:

· Integracja z LLM (Large Language Model): Użycie OpenAI GPT-4 lub podobnego, z fine-tuningiem na dokumentacji TipJar+, aby odpowiadać zgodnie z wiedzą produktową. Backend orchestracji (np. LangChain) do definiowania narzędzi (tools), które asystent może wywołać (np. get_creator_stats, search_creators, open_payment_modal).
· Rozpoznawanie mowy: Web Speech API (frontend) lub wysyłanie audio do backendu (Whisper API). Fallback do tekstu.
· Bezpieczeństwo i prywatność: Asystent nie ma dostępu do wrażliwych danych (np. adresów portfeli, kluczy) bez autoryzacji. Wszystkie akcje wymagające uprawnień (np. wykonanie przelewu) są autoryzowane przez użytkownika w UI (nie tylko przez asystenta).
· Responsywność i wydajność: Okno czatu musi działać płynnie na mobile i desktop. Animacje (pojawianie się bąbelków) lekkie.
· Personalizacja: Asystent może zapamiętywać kontekst sesji (np. "pokaż mi więcej twórców takich jak ten ostatni").
· Dostępność: Obsługa klawiatury (Tab, Enter). Dla czytników ekranu, odpowiednie role ARIA.

Przykład wizualny (opis): Twórca w Panelu klikają w pulsującą złotą ikonkę robota w rogu. Wysuwa się okno czatu. Pisze: "Pokaż mi ostatnich 5 napiwków". Asystent odpowiada: "Oto ostatnie wsparcia dla Ciebie:" i wyświetla mini-listę z kwotami i nickami. Twórca mówi: "Podziękuj Janowi". Asystent rozpoznaje, otwiera modal wiadomości z pre-filled "Dziękuję za wsparcie!". Twórca zatwierdza i wysyła. Całość bez przeładowania strony.

---

4.7 Portfel (Wallet) – Wyświetlacz i zarządzanie środkami

Opis: Zaprojektuj komponent Portfela – centralnego miejsca dla użytkownika (zarówno twórcy, jak i fana) do zarządzania swoimi środkami w ekosystemie TipJar+. Portfel wyświetla saldo w USDC (i potencjalnie innych aktywach), historię transakcji oraz umożliwia wykonanie kluczowych operacji: wypłata (dla twórców) i doładowanie (dla fanów). Interfejs musi budować zaufanie, być przejrzysty i wspierać zarówno tradycyjne, jak i krypto operacje.

Struktura i widoki (dostępne z Panelu Twórcy lub Fana):

1. Karta "Twój portfel" (widok skrócony, np. w Dashboard):
   · Duża, czytelna liczba: saldo w USDC (np. "1,250.00 USDC").
   · Przelicznik na USD (lub lokalną walutę) na żywo.
   · Ikona portfela i ewentualny trend (zmiana 24h).
   · Przyciski szybkich akcji: "Wypłać" (dla twórców), "Doładuj" (dla fanów), "Historia".
2. Strona szczegółowa portfela (pełny widok):
   · Nagłówek: "Twój portfel TipJar+" z podsumowaniem salda.
   · Panel akcji: Dwa duże przyciski: "Wpłać" / "Doładuj" (złoty) oraz "Wypłać" (secondary). Po kliknięciu otwierają się odpowiednie modale.
   · Sekcja "Ostatnie transakcje": Tabela lub lista 10-20 ostatnich operacji (wpłaty, wypłaty, napiwki otrzymane/wysłane, subskrypcje). Kolumny: Data, Opis (np. "Napiwek od [fan]", "Wypłata na konto bankowe"), Kwota (zielona +, czerwona -), Status (zrealizowana, oczekująca, błąd).
   · Filtry i sortowanie: Wg typu transakcji, daty, kwoty. Pole wyszukiwania.
   · Link do pełnej historii (jeśli lista jest długa) z paginacją.
3. Modal "Wypłać środki" (dla twórców):
   · Krok 1: Wybór metody wypłaty: Konto bankowe (wymaga wcześniejszej konfiguracji, integracja z Circle Payouts), Zewnętrzny portfel krypto (adres Ethereum), PayPal (w przyszłości).
   · Krok 2: Wprowadzenie kwoty (walidacja: minimalna kwota, dostępne saldo).
   · Krok 3 (dla krypto): Pole adresu portfela (walidacja poprawności), opcjonalny tag/opis.
   · Krok 4 (dla banku): Wybór wcześniej dodanego konta lub dodanie nowego (formularz z danymi bankowymi – IBAN, SWIFT). Wymaga dodatkowej weryfikacji tożsamości (KYC).
   · Podsumowanie: Kwota, opłata (jeśli jest), czas realizacji.
   · Przycisk "Zatwierdź wypłatę" (złoty). Po kliknięciu, proces jest uruchamiany; użytkownik widzi stan "W realizacji".
4. Modal "Doładuj środki" (dla fanów, którzy chcą mieć saldo wewnętrzne):
   · Metody: Karta płatnicza (Circle), Przelew bankowy (opcjonalnie), Krypto (wpłata USDC na adres depozytowy TipJar+).
   · Proces analogiczny do płatności, ale środki trafiają na saldo wewnętrzne użytkownika.
5. Sekcja "Historia wypłat" (dla twórców):
   · Tabela wszystkich wypłat z datą, kwotą, metodą, statusem (oczekująca, zrealizowana, odrzucona).
   · Możliwość anulowania wypłaty, jeśli jest w statusie "oczekująca".

Wymagania techniczne:

· Integracja z backendem (Circle API, własne kontrakty): Saldo pobierane z Developer-Controlled Wallet (Circle) dla twórców i wewnętrznego ledgera dla fanów.
· Real-time aktualizacja salda: Po każdej transakcji (wypłata, wpłata, napiwek) saldo aktualizuje się bez odświeżania strony (WebSocket lub polling).
· Obsługa błędów: Komunikaty w przypadku nieudanej wypłaty (np. błędny adres, brak środków, problem z bankiem) z jasnymi instrukcjami.
· Bezpieczeństwo i KYC: Przed pierwszą wypłatą na konto bankowe, wymagane jest zweryfikowanie tożsamości (KYC) – UI powinien to komunikować i prowadzić przez proces.
· Responsywność: Formularze wypłat/wpłat muszą być użyteczne na mobile (duże pola, przewijanie).

Przykład wizualny (opis): Twórca wchodzi w sekcję Portfel. Widzi saldo $1,250. Klika "Wypłać". Wybiera wypłatę na konto bankowe (wcześniej dodał swoje konto). Wprowadza kwotę $500, widzi podsumowanie "Kwota: $500, opłata: $0, czas realizacji: 1-3 dni". Klika "Zatwierdź". Pojawia się komunikat sukcesu "Zlecenie wypłaty przyjęte" i transakcja pojawia się w historii jako "oczekująca". Po dwóch dniach status zmienia się na "zrealizowana", a saldo spada.

---

4.8 System Powiadomień (Notifications) – Real-time

Opis: Zaprojektuj kompleksowy, nieinwazyjny system powiadomień, który informuje użytkownika o wszystkich ważnych zdarzeniach na platformie: nowe napiwki (dla twórcy), nowe subskrypcje, wiadomości od fanów, odnowienia subskrypcji, zmiany statusu wypłat, aktywności w DAO (głosowania, wyniki) oraz systemowe alerty (KYC, bezpieczeństwo). System musi działać w czasie rzeczywistym (WebSocket) i integrować się z powiadomieniami push (dla PWA/mobile).

Elementy interfejsu:

1. Ikona powiadomień w headerze (dzwonek):
   · Wyświetlana na stałe (dla zalogowanych). Z licznikiem nieprzeczytanych (czerwona kropka z liczbą).
   · Po kliknięciu rozwija się dropdown z listą ostatnich 5-10 powiadomień.
2. Dropdown powiadomień:
   · Każde powiadomienie to element listy zawierający:
     · Ikona typu (serce – napiwek, korona – subskrypcja, dzwonek – przypomnienie, głosowanie – DAO, itp.).
     · Treść – krótki tekst, często z linkiem do kontekstu (np. "JanFan wysłał Ci napiwek $10" z linkiem do transakcji).
     · Timestamp (względny, np. "5 min temu").
   · Nieprzeczytane powiadomienia mają wyróżnione tło (np. rgba(255,215,0,0.1)) lub złotą kropkę.
   · Na dole dropdownu: przycisk "Oznacz wszystkie jako przeczytane" oraz link "Zobacz wszystkie powiadomienia".
3. Strona "Centrum powiadomień":
   · Pełna lista wszystkich powiadomień z paginacją.
   · Filtry: Wg typu (napiwki, systemowe, DAO), wg statusu (przeczytane/nieprzeczytane).
   · Możliwość masowego oznaczenia jako przeczytane/usunięcie.
   · Ustawienia powiadomień: przełączniki dla typów (np. "Otrzymuj powiadomienia o nowych napiwkach: email, push, in-app").
4. Powiadomienia push (dla PWA / aplikacji mobilnej):
   · Prośba o zgodę (permission) przy pierwszym logowaniu lub w ustawieniach.
   · Po zgodzie, backend wysyła push notification przez serwis (Firebase, Web Push API). UI musi umożliwiać wyłączenie poszczególnych kategorii.

Typy powiadomień i ich wygląd:

Typ Ikona Kolor akcentu Przykład treści
Nowy napiwek serce złoty "JanFan wysłał Ci napiwek $10. Dołączona wiadomość: 'Świetny stream!'"
Nowa subskrypcja korona fioletowy "Anna zasubskrybowała Twój plan 'Złoty Fan' za $25/miesiąc!"
Odnowienie subskrypcji zegar złoty "Subskrypcja użytkownika 'Bob' została odnowiona na kolejny miesiąc."
Wiadomość dymek złoty "Nowa wiadomość od fana 'Kate': 'Dziękuję za odpowiedź!'"
Wypłata zrealizowana bank zielony "Twoja wypłata $500 została przelana na konto bankowe."
Głosowanie DAO głosowanie fioletowy "Nowa propozycja: 'Czy obniżyć prowizję?' Głosowanie kończy się za 3 dni."
Systemowy alert info niebieski "Uzupełnij swoje dane KYC, aby wypłacić środki powyżej $1000."
Promocja gwiazda złoty "Do końca tygodnia 0% opłat za napiwki!"

Wymagania techniczne:

· Backend: System kolejkowania i wysyłania powiadomień (np. Bull + Redis). WebSocket dla in-app.
· Real-time: Klient łączy się przez WebSocket do endpointu powiadomień. Nowe powiadomienie pojawia się w dropdownie bez odświeżania (z animacją).
· Powiadomienia email: Dla zdarzeń offline (np. nowy napiwek, gdy twórca nie jest zalogowany), wysyłany jest email z podsumowaniem.
· Responsywność: Dropdown na mobile dostosowuje się do ekranu (może być pełnoekranowy).
· Dostępność: Powiadomienia powinny być ogłaszane przez czytniki ekranu (aria-live).

Przykład wizualny (opis): Twórca przegląda Dashboard. Nagle ikona dzwonka w górnym pasku zmienia się z pustej na czerwoną kropkę z cyfrą "1". Kliknięcie rozwija dropdown, gdzie widzi: "🔥 JanFan wysłał Ci napiwek $50 z wiadomością 'Na nowy mikrofon!'". Kliknięcie w powiadomienie przekierowuje go do sekcji Napiwki, gdzie od razu widzi tę transakcję. Może też kliknąć "Podziękuj" bezpośrednio z dropdownu.

---

4.9 Kreator Profilu Twórcy (Onboarding) – Wizard

Opis: Zaprojektuj interaktywny, przyjazny kreator (wizard) prowadzący nowego użytkownika przez proces zakładania i konfiguracji profilu twórcy. Celem jest maksymalne uproszczenie startu i zachęcenie do uzupełnienia kluczowych informacji, które zwiększają szanse na otrzymanie wsparcia (avatar, opis, kategorie). Kreator powinien być możliwy do pominięcia (skip) i kontynuowania później, ale dobrze zaprojektowany motywuje do ukończenia.

Struktura kreatora (3-5 kroków, z paskiem postępu):

1. Krok 0 (Witaj i wprowadzenie):
   · Krótki, entuzjastyczny tekst: "Świetnie, że chcesz dzielić się swoją pasją! Założymy Twój profil twórcy w kilku prostych krokach."
   · Ilustracja (słoik z monetami).
   · Przycisk "Rozpocznij" (złoty) oraz link "Pomiń i zrobię to później".
2. Krok 1 (Podstawowe informacje):
   · Avatar: Upload zdjęcia (drag & drop lub wybór pliku). Podgląd w okręgu. Domyślne inicjały.
   · Nazwa wyświetlana (pole tekstowe, wymagane). Podpowiedź: "Twoja nazwa widoczna dla fanów".
   · Krótki opis (Bio): Pole tekstowe (max 200 znaków), placeholder "Opowiedz fanom, czym się zajmujesz...".
   · Kategorie: Multi-select z głównymi kategoriami (Muzyka, Gaming, Edukacja, Sztuka, etc.).
3. Krok 2 (Linki społecznościowe – opcjonalne):
   · Pola na URL: YouTube, Twitch, Twitter, Instagram, TikTok. Walidacja formatu.
   · Możliwość pominięcia (przycisk "Pomiń ten krok").
4. Krok 3 (Portfel i płatności – informacyjny / konfiguracja):
   · Komunikat: "Twój portfel USDC w TipJar+ został automatycznie utworzony. Dzięki niemu możesz otrzymywać napiwki od fanów z całego świata."
   · Przycisk "Dodaj konto bankowe do wypłat" (przekierowanie do sekcji Wypłaty w panelu) – opcjonalne.
   · Checkbox: "Chcę otrzymywać powiadomienia email o nowych napiwkach".
5. Krok 4 (Podsumowanie i publikacja):
   · Podgląd profilu: Miniatura pokazująca, jak profil będzie wyglądał publicznie (avatar, nazwa, bio, kategorie).
   · Link do profilu: tipjar.plus/[nazwa] z przyciskiem "Kopiuj link".
   · Przyciski: "Opublikuj profil" (złoty) – kończy kreator i przekierowuje do Panelu Twórcy; "Wróć" (secondary); "Zapisz jako szkic" – zapisuje postęp, ale profil nie jest publiczny.

Po zakończeniu kreatora:

· Profil staje się publicznie dostępny.
· Użytkownik widzi powitalny modal/komunikat: "Twój profil jest już na żywo! Udostępnij go fanom."
· Opcjonalnie: sugestia pierwszej akcji: "Sprawdź swoje statystyki w Panelu".

Wymagania techniczne:

· Zapisywanie postępu: Kreator może być w formie wieloetapowego formularza; każdy krok zapisywany po przejściu (autozapis) do backendu.
· Możliwość edycji później: Wszystkie dane z kreatora są edytowalne w ustawieniach profilu w Panelu Twórcy.
· Responsywność: Na mobile kreator jest pełnoekranowy, z paskiem postępu na górze i dużymi przyciskami.
· Walidacja: Sprawdzanie unikalności nazwy wyświetlanej (nie może być zajęta). Format linków.

Przykład wizualny (opis): Nowy użytkownik po rejestracji zostaje przekierowany do kreatora. Krok 1: wybiera zdjęcie, wpisuje "DJ Echo", opis "Miksuję muzykę elektroniczną" i zaznacza kategorie "Muzyka", "DJ". Krok 2: wkleja link do swojego Mixcloud. Krok 3: widzi informację o portfelu i klika "Dodaj konto bankowe" – otwiera się nowa karta, ale wraca do kreatora. Krok 4: podgląda swój profil, jest zadowolony i klika "Opublikuj profil". Trafia do Panelu Twórcy, a jego profil jest już widoczny dla świata.

---

4.10 Generatory (QR Code, OG Image, Referral) – Narzędzia promocyjne

Opis: Zaprojektuj zestaw narzędzi (generatorów) w Panelu Twórcy, które ułatwiają promocję profilu i zwiększają zasięg. Twórca może wygenerować kod QR do swojego profilu, dostosowany obrazek Open Graph (OG) do udostępniania w mediach społecznościowych oraz link referencyjny z trackingiem, aby śledzić, skąd przychodzą nowi fani lub twórcy. Narzędzia te są kluczowe dla wirusowego rozprzestrzeniania się platformy.

Struktura (zakładka "Promuj" lub "Narzędzia" w Panelu Twórcy):

1. Generator QR Code:
   · Podgląd kodu QR na żywo, wyśrodkowany. Domyślnie kod zawiera link do publicznego profilu twórcy (tipjar.plus/[username]).
   · Opcje personalizacji:
     · Kolor: Złoty (foreground) na turkusowym tle, lub odwrotnie. Możliwość wyboru z palety brandowej.
     · Rozmiar: Mały (200x200px), Średni (400x400px), Duży (800x800px).
     · Logo w środku: opcjonalnie, małe logo TipJar+ lub awatar twórcy (miniatura 48x48px).
   · Przyciski akcji: "Pobierz PNG", "Pobierz SVG", "Kopiuj link".
2. Generator OG Image (Open Graph):
   · Podgląd obrazka (mockup) w rozmiarze 1200x630px, pokazujący, jak link do profilu będzie wyglądał na Twitterze/Facebooku.
   · Szablony: 3-4 gotowe layouty do wyboru (np. "Minimalistyczny", "Z banerem", "Kreatywny z awatarem").
   · Personalizacja (w ramach szablonu):
     · Zdjęcie: avatar twórcy (obowiązkowo).
     · Tekst: tytuł (nazwa twórcy), opis (krótki slogan lub bio).
     · Kolorystyka: zgodna z brandem (turkus, złoto, fiolet) lub wybrana przez twórcę.
   · Przycisk "Generuj i pobierz" – tworzy obrazek na backendzie (Canvas API) i udostępnia do pobrania (PNG).
   · Informacja: "Użyj tego obrazka, udostępniając link do swojego profilu w mediach społecznościowych, aby przyciągnąć uwagę."
3. Generator linku referencyjnego (Referral / Tracking):
   · Pole z linkiem: tipjar.plus/[username]?ref=unikalny_kod (lub ref=username). Przycisk "Kopiuj link".
   · Statystyki (dashboard): Podsumowanie kliknięć i konwersji (liczba osób, które kliknęły link i zarejestrowały się lub wysłały napiwek).
     · Wykres w czasie (słupkowy).
     · Źródła (jeśli możliwe – z użyciem UTM).
   · Możliwość tworzenia wielu linków dla różnych kampanii (np. ref=instagram, ref=newsletter).

Wymagania techniczne:

· Generowanie QR: Biblioteka po stronie klienta (np. qrcode), ale z opcją generowania SVG i PNG. Obsługa kolorów i logo.
· Generowanie OG Image: Backend endpoint, który przyjmuje dane (avatar URL, nazwa, bio) i renderuje obrazek za pomocą biblioteki canvas (Node Canvas). Cache'owanie wygenerowanych obrazków na CDN.
· Tracking linków: Każdy link referencyjny ma unikalny identyfikator. Backend rejestruje każde kliknięcie (user-agent, referer, timestamp) i przypisuje do twórcy. Rejestracja nowego użytkownika (lub pierwszy napiwek) jest wiązana z tym ref kodem, jeśli został użyty.
· Responsywność: Panel generatorów powinien być użyteczny na mobile (podgląd QR kodu i OG Image skalowany).
· Wydajność: Generowanie OG Image może być kosztowne – zalecane asynchroniczne i cache'owanie.

Przykład wizualny (opis): Twórca "PixelAnna" wchodzi do zakładki "Promuj". Widzi duży kod QR z linkiem do jej profilu. Zmienia kolor na złoty i pobiera PNG. Przechodzi do generatora OG Image. Wybiera szablon "Kreatywny z banerem" i ustawia tło na turkus, a tekst na złoty. Generuje obrazek, który wygląda atrakcyjnie. Udostępnia go na Twitterze z linkiem referencyjnym tipjar.plus/PixelAnna?ref=twitter. W panelu statystyk po kilku dniach widzi, że link został kliknięty 150 razy, a 12 osób się zarejestrowało. Cieszy się, że jej działania przynoszą efekty.

---
🎭 MIKROINTERAKCJE & ANIMACJE – PEŁNA WERSJA

---

5.1 Mikrointerakcje przycisków i elementów interaktywnych

Opis: Zaprojektuj zestaw subtelnych, ale wyraźnych mikrointerakcji dla wszystkich interaktywnych elementów: przycisków, kart, linków, ikon. Mikrointerakcje muszą dawać natychmiastowy feedback użytkownikowi, potwierdzając, że jego akcja została zarejestrowana. Mają one zwiększać poczucie bezpośredniej manipulacji i "żywości" interfejsu, bez bycia rozpraszającymi.

Szczegóły dla poszczególnych elementów:

1. Przyciski (wszystkie warianty):
   · Hover (desktop): Lekkie rozjaśnienie koloru tła (dla primary: #FFD700 → #FFE44D) z płynnym przejściem 150ms ease-out. Dodanie subtelnego box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3). Dla przycisków outline – zmiana koloru obramowania na jaśniejszy i dodanie lekkiego wypełnienia tła (opacity 0.1).
   · Active (kliknięcie/wciśnięcie): Efekt "wciśnięcia" – transform: scale(0.98) i lekki inset shadow (lub przyciemnienie tła) przez 100ms. Dla przycisków dotykowych na mobile, efekt active powinien być natychmiastowy i wyraźny.
   · Focus (dostępność): Wyraźny outline w kolorze fioletowym #9D4EDD z właściwością outline-offset: 2px i border-radius dopasowanym do przycisku. Outline powinien być widoczny tylko przy nawigacji klawiaturą (focus-visible).
   · Stan ładowania: Tekst przycisku zastępowany przez okrągły spinner (obracające się kółko w kolorze tekstu) o średnicy 20px. Sam przycisk staje się nieklikalny, z obniżoną opacity (0.7).
   · Stan wyłączony (disabled): Opacity 0.5, brak jakiejkolwiek interakcji, kursor not-allowed.
2. Linki tekstowe i ikony akcji:
   · Hover: Podkreślenie (underline) z płynnym przejściem (dla linków). Dla ikon – zmiana koloru na złoty lub fioletowy (zależnie od kontekstu) i lekkie skalowanie (1.05).
   · Kliknięcie: Ikona może wykonać krótki "bump" (skala 0.9, potem 1).
3. Karty (klikalne):
   · Hover: Uniesienie (transform: translateY(-4px)), cień staje się większy i bardziej rozmyty (box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32)). Może pojawić się subtelne podświetlenie obramowania (gradient złoty/fioletowy) lub zmiana tła.
   · Kliknięcie: Natychmiastowe lekkie obniżenie (translateY(2px)) i powrót.

Wymagania techniczne:

· Wszystkie przejścia CSS: transition: all 0.15s ease-out (dla hover, focus), transition: transform 0.1s ease-in (dla active).
· Unikanie animowania właściwości, które powodują layout thrashing (np. width, height, top/left). Używaj transform i opacity.
· Dla stanu ładowania: CSS animation z @keyframes spin (obrót 0-360deg).
· Dla focus: użyj :focus-visible pseudo-klasy, aby nie wyświetlać outline dla kliknięć myszą, tylko dla klawiatury.
· Dostępność: Użytkownicy z preferencją ograniczenia ruchu (prefers-reduced-motion) powinni widzieć uproszczone lub żadne animacje – szanuj tę właściwość.

Przykład wizualny (opis): Użytkownik najedzie myszką na złoty przycisk "Wyślij napiwek". Przycisk lekko jaśnieje, unosi się (shadow) i zmienia kursor. Po kliknięciu wydaje się chwilowo wciśnięty. Gdy trwa wysyłanie, w przycisku wiruje mały złoty spinner, a tekst znika. Użytkownik czuje, że aplikacja reaguje na każde jego działanie.

---

5.2 Przejścia między ekranami i modalami

Opis: Zaprojektuj płynne, przewidywalne animacje przejść między widokami (stronami) aplikacji oraz animacje pojawiania się i znikania modalów. Przejścia powinny prowadzić wzrok użytkownika, wzmacniać poczucie nawigacji i nie powodować dezorientacji. Czas trwania animacji jest krótki, ale odczuwalny (150-300ms).

Szczegóły:

1. Przejścia między stronami w SPA (np. w Panelu Twórcy):
   · Animacja domyślna: Nowy widok wjeżdża z prawej strony (transform: translateX(100%) → 0), podczas gdy stary widok wyjeżdża w lewo (transform: translateX(0 → -30%)) z jednoczesnym fade-out (opacity: 1 → 0). Czas: 250ms, easing cubic-bezier(0.2, 0.9, 0.4, 1.1) (lekko sprężyste).
   · Dla nawigacji wstecz (cofnięcie): Odwrotność – stary widok wjeżdża z lewej, nowy wyjeżdża w prawo.
   · Dla przejść między podstronami w tej samej sekcji (np. zmiana filtra w tabeli): Użyj cross-fade (opacity) lub przesunięcie pionowe (bardzo subtelne), aby uniknąć dekoncentracji.
2. Otwieranie i zamykanie modalów:
   · Otwieranie: Modal pojawia się z efektem "scale up" (transform: scale(0.95) → scale(1)) i "fade in" (opacity: 0 → 1). Tło (backdrop) płynnie przyciemnia się (opacity: 0 → 0.6). Czas: 250ms, easing cubic-bezier(0.2, 0.9, 0.4, 1.1).
   · Zamykanie: Odwrotność: modal lekko zmniejsza się (scale(0.95)) i znika (fade-out), backdrop rozjaśnia się.
   · Dla modali pełnoekranowych na mobile: Wjeżdżanie od dołu (translateY(100%) → 0), zamykanie – zjazd w dół.
3. Przejścia w obrębie modala (np. zmiana kroków w formularzu płatności):
   · Nowy krok wjeżdża z prawej, stary wyjeżdża w lewo, z dodatkowym cross-fade dla wspólnych elementów (np. nagłówka). Czas: 200ms.
4. Ładowanie kolejnych elementów (infinite scroll, paginacja):
   · Nowe karty twórców pojawiają się z fade-in i lekkim przesunięciem od dołu (translateY: 20px → 0). Można zastosować stagger effect – każda kolejna karta z opóźnieniem 50ms.

Wymagania techniczne:

· Użyj CSS transitions/animations lub biblioteki (Framer Motion dla React) do realizacji.
· Dla przejść między stronami w Next.js można użyć framer-motion z komponentem <AnimatePresence>.
· Zawsze szanuj prefers-reduced-motion – wyłączaj animacje lub je upraszczaj (np. tylko fade) gdy użytkownik tego wymaga.
· Unikaj animowania width/height – używaj transform: translateX() i opacity.

Przykład wizualny (opis): Użytkownik klika "Napiwki" w sidebarze. Aktualny widok (Dashboard) płynnie przesuwa się w lewo i znika, a nowy widok wjeżdża z prawej, zajmując jego miejsce. Wrażenie jest płynne i przewidywalne. Modal płatności pojawia się z lekkim powiększeniem, a tło za nim przyciemnia się – użytkownik wie, że jego uwaga powinna skupić się na modalie.

---

5.3 Feedback po akcjach (Toasty, komunikaty)

Opis: Zaprojektuj animacje dla tymczasowych komunikatów (toast/snackbar) oraz innych form feedbacku (potwierdzenie, błąd, ładowanie). Animacje powinny przyciągać uwagę w sposób nieinwazyjny, ale wystarczająco wyraźny, aby użytkownik zauważył zmianę stanu.

Szczegóły:

1. Pojawienie się toastu:
   · Desktop: Toast wjeżdża od prawej krawędzi ekranu (transform: translateX(120px) → 0) z lekkim odbiciem (bounce effect) na końcu (easing cubic-bezier(0.34, 1.56, 0.64, 1)). Czas: 300ms.
   · Mobile: Toast zsuwa się od góry ekranu (translateY(-100px) → 0) z podobnym odbiciem.
   · Jeśli pojawia się kilka toastów jednocześnie, wjeżdżają one jeden po drugim (stagger 100ms) i układają się w stos.
2. Zniknięcie toastu:
   · Po 4-8 sekundach (zależnie od typu) toast odjeżdża w prawo (lub w dół na mobile) z fade-out. Czas: 200ms, easing ease-in.
   · Jeśli użytkownik kliknie przycisk [X] w toastie, zamyka się on natychmiast z scale-down (0.9) i fade-out.
3. Komunikat błędu w polu formularza (shake):
   · Pole z błędem delikatnie drży (shake) w poziomie 3 razy: translateX: 0 → -5px → 5px → 0. Czas trwania: 300ms.
   · Jednocześnie obramowanie pola pulsuje czerwonym kolorem (border-color zmienia się z #EF4444 na #FF6B6B i z powrotem).
   · Komunikat błędu pod polem pojawia się z fade-in.
4. Potwierdzenie zapisu (inline):
   · Obok zapisanego elementu (np. przycisku "Zapisz") pojawia się zielona ikona checkmark z fade-in i lekkim scale-up (0.8 → 1). Po 2 sekundach znika z fade-out.
5. Ładowanie danych (skeleton screen):
   · Zamiast spinnera, użyj skeleton screen z animowanym gradientem (shimmer effect) przesuwającym się od lewej do prawej. Gradient: linear-gradient(90deg, #003737, #004545, #003737). Animacja background-position lub użycie pseudo-elementu z przesunięciem.

Wymagania techniczne:

· Dla toastów: transform: translateX i opacity.
· Drżenie (shake): prosta animacja @keyframes z 3 klatkami.
· Shimmer effect: background: linear-gradient(...); background-size: 200% 100%; animation: shimmer 1.5s infinite;.
· ARIA role: role="alert" dla komunikatów błędów, role="status" dla sukcesu.
· Dla użytkowników prefers-reduced-motion: reduce wyłącz animacje przesunięć (zostaw tylko fade).

Przykład wizualny (opis): Po wysłaniu napiwku w prawym dolnym rogu pojawia się toast "Napiwek wysłany!" z ikoną checkmark. Toast wjeżdża z prawej, lekko się odbija i pozostaje na 4s. Gdy użytkownik wpisze nieprawidłowy adres portfela, pole input drży i pulsuje czerwonym obramowaniem, a pod polem pojawia się komunikat "Nieprawidłowy adres". Użytkownik od razu wie, co poszło nie tak.

---

5.4 Interaktywne elementy list i kart

Opis: Zaprojektuj mikrointerakcje dla list i kart, które zwiększają zaangażowanie i dają poczucie bezpośredniej manipulacji (hover, kliknięcie, przeciąganie, rozwijanie). Użytkownik powinien odczuwać, że elementy są "żywe" i reagują na jego działania.

Szczegóły:

1. Hover na karcie twórcy (Explore, lista):
   · Karta unosi się (transform: translateY(-4px)) i jej cień staje się większy i bardziej rozmyty (box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32)). Może pojawić się subtelne podświetlenie obramowania (gradient złoty/fioletowy) lub zmiana tła na #003737.
   · Czas: 200ms, easing ease-out.
   · Dla kart, które są linkami, kursor zmienia się na pointer.
2. Kliknięcie karty (jeśli jest linkiem):
   · Efekt "tętna" (ripple) – rozchodzące się koło od punktu kliknięcia w kolorze złotym lub fioletowym z przezroczystością. Realizacja: pseudo-element ::after z animation: ripple 0.4s linear.
   · Alternatywnie: lekki efekt wciśnięcia (skala 0.99) na czas kliknięcia.
3. Przeciąganie (drag & drop) – jeśli funkcja (np. sortowanie listy):
   · Podczas przeciągania elementu, jego opacity spada do 0.8, a za elementem pojawia się "cień" (duplikat z niższą opacją) jako wizualne wskazanie.
   · W miejscach drop target (miejsce, gdzie można upuścić) pojawia się podświetlenie (np. zielona obwódka lub szare tło).
4. Dodawanie/usuwanie elementów z listy (np. nowy napiwek w liście):
   · Nowy element pojawia się z scale-up (0.9 → 1) i fade-in, z jednoczesnym przesunięciem pozostałych elementów (layout animation).
   · Usuwany element kurczy się (scale-down) i znika z fade-out, a pozostałe elementy płynnie wypełniają lukę.
5. Rozwijanie/zwijanie akordeonu (accordion, np. w FAQ lub sekcji ustawień):
   · Sekcja rozwija się płynnie (animacja max-height lub użycie grid-template-rows dla wydajności). Zawartość fade-in z opóźnieniem.
   · Strzałka (chevron) obraca się o 180 stopni z płynną animacją (transform: rotate(0deg) → rotate(180deg)).
   · Czas: 250ms.

Wymagania techniczne:

· Dla efektu ripple: użyj pseudo-elementu z animation rozchodzenia się i usuwaj go po zakończeniu.
· Dla animacji layoutu (przesuwanie elementów) rozważ technikę FLIP (First, Last, Invert, Play) dla wydajności, lub użyj biblioteki react-flip-toolkit.
· Unikaj animowania height i width – używaj transform: scale() dla elementów, a dla akordeonu grid-template-rows (nowsza, wydajniejsza metoda) lub max-height.

Przykład wizualny (opis): Użytkownik najechał na kartę twórcy w Explore. Karta unosi się, a jej cień staje się bardziej miękki. Po kliknięciu karty, w miejscu kliknięcia pojawia się rozchodząca się fala złotego światła, a karta się "wciska". Nowo załadowane karty pojawiają się jedna po drugiej z lekkim opóźnieniem i efektem fade-in od dołu. Użytkownik czuje się, jakby manipulował fizycznymi obiektami.

---

5.5 Specjalne efekty dla elementów Web3 (NFT, DAO, transakcje)

Opis: Zaprojektuj charakterystyczne, satysfakcjonujące efekty dla elementów związanych z Web3, które podkreślą ich zaawansowany charakter i dadzą użytkownikowi poczucie interakcji z blockchainem. Efekty te mają budować ekscytację i zaufanie do technologii.

Szczegóły:

1. Mintowanie NFT (Proof of Support):
   · Gdy NFT jest mintowane, w UI pojawia się efekt "wyłaniania się" karty/miniatury: od środka rozchodzi się okrągła fala (wave) w kolorze złotym lub fioletowym, która odsłania obrazek.
   · Można dodać cząsteczki (particle effect) w kolorze złotym/fioletowym unoszące się do góry i znikające. Cząsteczki mogą być realizowane przez krótką animację CSS lub Canvas.
   · Czas trwania: 600ms. Po zakończeniu, miniatura delikatnie pulsuje (pulse) przez 1 sekundę.
2. Otrzymanie nowego NFT w kolekcji (Panel Fana):
   · Nowa miniatura NFT pojawia się z efektem "pop" (skala od 0 do 1.2, potem do 1) i lekkim obrotem (np. od -10 do 10 stopni).
   · Może towarzyszyć subtelny dźwięk "pling" (opcjonalnie, z możliwością wyłączenia w ustawieniach). Dźwięk powinien być krótki i nienachalny.
3. Głosowanie w DAO:
   · Po oddaniu głosu (kliknięciu "Za" lub "Przeciw"), przycisk głosu zmienia kolor (np. na zielony dla "Za", czerwony dla "Przeciw") z efektem fill (wypełnianie od lewej do prawej) – może to być animacja background-size lub clip-path.
   · Obok przycisku pojawia się ikona checkmark z fade-in i scale-up, a licznik głosów aktualizuje się z płynnym zliczaniem (licznik przechodzi od starej wartości do nowej).
4. Potwierdzenie transakcji blockchain (wysyłka napiwku, minting):
   · Gdy transakcja jest przetwarzana (pending), pokaż animowany spinner z motywem blockchain (np. obracające się ogniwa łańcucha lub sześcian). Można użyć Lottie lub SVG animation.
   · Po potwierdzeniu, spinner zmienia się w ikonę checkmark (zieloną), a cały element (np. przycisk) delikatnie pulsuje (pulse effect) przez 2 sekundy.
5. Wyświetlanie stanu sieci (gas fee, potwierdzenia):
   · Jeśli wyświetlamy aktualny gas fee, może on pulsować łagodnie (opacity 0.7 → 1), gdy zmienia się wartość.
   · Przy zmianie sieci (np. z Ethereum na Polygon) – krótka animacja przejścia (fade, zmiana ikony).

Wymagania techniczne:

· Dla efektów particles: rozważ użycie lekkiej biblioteki (particles.js) lub implementację CSS/Canvas z ograniczoną liczbą cząstek.
· Dla animacji blockchain spinner: SVG animation lub Lottie (JSON) – mniejsze obciążenie niż Canvas.
· Dźwięki: opcjonalne, zawsze z kontrolą głośności i możliwością wyłączenia w ustawieniach użytkownika. Nie powinny być domyślnie włączone bez zgody.
· Wydajność: Efekty nie mogą blokować interfejsu. Używaj will-change: transform ostrożnie.

Przykład wizualny (opis): Użytkownik wspiera twórcę i wybiera opcję Proof of Support NFT. Po zatwierdzeniu transakcji, w Panelu Fana pojawia się nowa karta NFT. Karta "wyłania się" z efektem rozchodzącej się fali, a złote cząsteczki unoszą się w górę. Po chwili karta delikatnie pulsuje. Użytkownik czuje satysfakcję z otrzymania unikalnego przedmiotu. Gdy odda głos w DAO, przycisk "Za" wypełnia się zielonym kolorem od lewej do prawej, a obok pojawia się ikona checkmark.

---

5.6 Animacje nagłówków i sekcji (scroll-triggered)

Opis: Zaprojektuj subtelne animacje dla sekcji na stronach (głównie na Landing Page i w Centrum Wiedzy), które aktywują się, gdy użytkownik przewija stronę. Animacje mają przyciągać uwagę do nowych sekcji, ale nie mogą być nachalne ani spowalniać przewijania.

Szczegóły:

1. Fade-in Up (domyślna):
   · Sekcja pojawia się z opóźnieniem, przesuwając się od dołu (translateY: 30px → 0) z jednoczesnym fade-in (opacity: 0 → 1). Czas: 600ms, easing ease-out.
   · Trigger: gdy sekcja wejdzie w viewport (Intersection Observer, threshold 0.2).
2. Stagger dla elementów w siatce (np. karty w sekcji "Jak to działa"):
   · Każda karta pojawia się kolejno z lekkim opóźnieniem (stagger 100-150ms) względem siebie, używając tej samej animacji fade-in up.
   · Efekt "kaskady" wzmacnia hierarchię i skupia uwagę.
3. Parallax dla warstw tła (hero section):
   · Dla hero section na Landing Page: tło (abstrakcyjne bloki 3D) przesuwa się wolniej niż warstwa z tekstem, tworząc iluzję głębi. Prędkość: tło transform: translateY(calc(var(--scroll-y) * 0.2)) (lub podobne).
   · Użyj transform: translate3d(0, ...) dla wydajności.
4. Lazy loading obrazów z fade-in:
   · Obrazy (avatary, grafiki NFT) ładują się z efektem "fade-in" dopiero gdy wejdą w viewport. Użyj Intersection Observer i ustaw opacity: 0 → 1 z czasem 300ms.

Wymagania techniczne:

· Użyj Intersection Observer API do triggerowania animacji (lepsza wydajność niż eventy scroll).
· CSS animations z @keyframes lub biblioteka framer-motion z whileInView.
· Dla paralaksy, używaj transform zamiast top/left.
· Upewnij się, że animacje nie spowalniają wydajności (używaj will-change: transform ostrożnie, tylko dla elementów, które tego wymagają).
· Dla prefers-reduced-motion: reduce – wyłącz wszystkie animacje scroll-triggered (pozostaw tylko fade).

Przykład wizualny (opis): Użytkownik przewija Landing Page. Sekcja "Jak to działa" pojawia się płynnie od dołu, a każda z 3 kart pojawia się jedna po drugiej z lekkim opóźnieniem, tworząc wrażenie układania się treści. Tło hero section porusza się nieco wolniej niż tekst, dodając wrażenia głębi i nowoczesności. Użytkownik nie jest przytłoczony, ale strona wydaje się dynamiczna.

---

5.7 Animacje ładowania i stanów pośrednich

Opis: Zaprojektuj animacje dla stanów pośrednich: ładowanie aplikacji, ładowanie danych, pusty stan (empty state), błąd ładowania. Mają informować użytkownika, co się dzieje, i zmniejszać frustrację związaną z oczekiwaniem.

Szczegóły:

1. Globalny loader (pierwsze ładowanie aplikacji / page transition):
   · Animowane logo TipJar+ (słoik z plusem) z efektem "pulsowania" (scale: 1 → 1.1 → 1) na ciemnym tle. Czas cyklu: 1s, infinite.
   · Można dodać tekst "Ładowanie..." poniżej, z animacją kropek.
2. Skeleton screen dla kart i list:
   · Szare prostokąty (kolor #003737 lub #004545) z animowanym gradientem (shimmer) przesuwającym się od lewej do prawej.
   · Skeleton powinien dokładnie odwzorowywać layout finalnej karty (okrągłe miejsce na awatar, prostokąty na tekst, przycisk).
   · Shimmer: background: linear-gradient(90deg, #003737 25%, #006666 50%, #003737 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite linear;.
3. Pusty stan (empty state) – np. brak napiwków w historii:
   · Ilustracja (np. pusty słoik) z fade-in, delikatne unoszenie się (floating) – animation: float 3s ease-in-out infinite.
   · Tekst: "Brak jeszcze napiwków. Zachęć swoich fanów do wsparcia!" i CTA (np. "Udostępnij profil").
   · Unoszenie: transform: translateY(0px) → translateY(-10px) → translateY(0px).
4. Błąd ładowania (np. nie udało się pobrać listy twórców):
   · Ikona błędu (np. wykrzyknik w kole) z animacją shake (podobną do błędu formularza).
   · Tekst: "Nie udało się załadować danych. Sprawdź połączenie internetowe."
   · Przycisk "Spróbuj ponownie" (złoty) – po kliknięciu ponownie wywołuje zapytanie, a przycisk przechodzi w stan ładowania.
5. Przejście między filtrami (np. w Explore):
   · Gdy użytkownik zmienia filtry, stare karty fade-out (opacity 1 → 0, przesunięcie w górę), a nowe karty fade-in z opóźnieniem (jak przy pierwszym ładowaniu).
   · Można pokazać skeleton screen na czas ładowania nowych danych (jeśli opóźnienie > 300ms).

Wymagania techniczne:

· Skeleton: użyj CSS linear-gradient z animowanym background-position.
· Pusty stan: SVG ilustracja z CSS animation translateY (floating).
· Unikaj zbyt długich animacji (max 2s dla cyklicznych).
· Dla prefers-reduced-motion – wyłącz floating i shimmer, pozostaw tylko statyczny skeleton lub pusty stan.

Przykład wizualny (opis): Podczas ładowania listy twórców w Explore widać szkieletowe karty z migającym gradientem. Gdy lista jest pusta (np. nowy twórca nie ma jeszcze fanów), pojawia się ilustracja pustego słoika, który delikatnie unosi się w górę i w dół, oraz tekst "Brak wspierających. Udostępnij swój profil, aby otrzymać pierwszy napiwek!". Gdy wystąpi błąd sieci, ikona błędu drży, a użytkownik może kliknąć "Spróbuj ponownie". Użytkownik nigdy nie jest pozostawiony z "martwym" interfejsem.

---

📄 PODSUMOWANIE KOMPLETNEJ KOMPILACJI

Otrzymałeś pełną, rozbudowaną kompilację promptów projektowych dla platformy TipJar+, zawierającą:

1. 🎨 Branding & Foundation – 5 promptów (paleta, typografia, logo, ikony, grafiki tła 3D).
2. 🧩 Komponenty UI – 10 promptów (przyciski, formularze, karty, modale, listy/tabele, dropdowny, toasty, loadery/skeletony, tooltipy, avatary).
3. 📱 Layouty & Struktury Stron – 8 promptów (Landing Page, Profil Twórcy, Explore, Centrum Wiedzy, Panel Twórcy, Panel Fana, Logowanie/Rejestracja, Strony błędów).
4. 🧠 Elementy Funkcjonalne & Web3 – 10 promptów (Widget Płatności, Proof of Support NFT, Eternal Fan Wall, Subskrypcje NFT, DAO Panel, Asystent AI, Portfel, Powiadomienia, Onboarding, Generatory).
5. 🎭 Mikrointerakcje & Animacje – 7 promptów (przyciski, przejścia, feedback, listy/karty, efekty Web3, scroll-triggered, stany pośrednie).

Łącznie: 40 szczegółowych promptów, każdy z unikalnym opisem, stylem, kolorami, wymaganiami technicznymi i przykładem wizualnym.

Dokument ten jest gotowy do:

· Bezpośredniego wdrożenia w dokumentacji projektu (Confluence/Notion).
· Wykorzystania przez designerów do tworzenia mockupów w Figmie/Adobe XD.
· Przekazania developerom jako specyfikacja implementacyjna.
· Prezentacji interesariuszom jako wizja kompletnego interfejsu.

Wszystkie prompty zostały napisane z zachowaniem spójności z dostarczonym przez Ciebie poradnikiem UI/UX TipJar+ (Aktualizacja 2025) i uwzględniają najnowsze trendy Web3, socialFi oraz technologie (Circle, Arweave, SIWE, DAO, AI).

---..
