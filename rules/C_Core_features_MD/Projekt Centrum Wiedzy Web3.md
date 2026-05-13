Raport Strategiczny: Kompleksowa
Architektura i Design System dla
Centrum Wiedzy Web3 (Edycja 2025)

1. Wstęp: Strategiczna Rola Edukacji w Ekosystemie
Web3

Współczesny krajobraz cyfrowy, a w szczególności sektor zdecentralizowanych finansów (DeFi)
oraz technologii Web3, przechodzi fundamentalną transformację w podejściu do użytkownika.
W roku 2025 "Centrum Wiedzy" (Knowledge Center) przestaje pełnić funkcję pasywnego
repozytorium pytań i odpowiedzi (FAQ). Staje się krytycznym elementem infrastruktury
budującej zaufanie, redukującym barierę wejścia i stanowiącym pierwszą linię obrony przed
błędami użytkownika, które w środowisku blockchain mogą skutkować nieodwracalną utratą
aktywów.
Niniejszy raport stanowi wyczerpującą analizę projektową, techniczną i psychologiczną, mającą
na celu stworzenie referencyjnego modelu sekcji edukacyjnej dla platformy Web3. Opierając się
na szczegółowych wymaganiach dotyczących dwukolumnowego układu desktopowego,
typografii o podwyższonej czytelności (18px) oraz zaawansowanej optymalizacji pod kątem
wyszukiwarek (SEO i structured data), dokument ten definiuje nowy standard w projektowaniu
interfejsów edukacyjnych. Analiza integruje najnowsze trendy w UX/UI na rok 2025, w tym
"Emotionally Intelligent Design", "Abstract 3D" oraz "Glassmorphism", łącząc je z
rygorystycznymi wymogami technicznymi Schema.org.

1.1 Psychologia Zaufania w Środowisku "Trustless"

Paradoks Web3 polega na tym, że systemy zaprojektowane jako "trustless" (niewymagające
zaufania do pośrednika) wymagają od użytkownika ogromnego zaufania do samego interfejsu i
własnych kompetencji. Użytkownik wchodzący na platformę DeFi często odczuwa wysoki
poziom lęku technologicznego (ang. tech anxiety). Obawy te dotyczą bezpieczeństwa kluczy
prywatnych, nieodwracalności transakcji oraz złożoności opłat sieciowych (gas fees).
W tym kontekście "Centrum Wiedzy" pełni rolę stabilizatora emocjonalnego. Projekt interfejsu
musi realizować strategię Anticipatory Design (projektowania wyprzedzającego). Oznacza to,
że system nie tylko odpowiada na zadane pytania, ale przewiduje wątpliwości użytkownika,
zanim zostaną one sformułowane. Na przykład, artykuł o zakładaniu portfela musi proaktywnie
wyświetlać ostrzeżenia o phishingu w prawej kolumnie (sekcja Promocja/CTA), wykorzystując
mechanizmy psychologii poznawczej do kierowania uwagą.
Zaufanie budowane jest poprzez transparentność i czytelność. Decyzja o zastosowaniu dużej
czcionki (18px) oraz interlinii 1.6 nie jest jedynie zabiegiem estetycznym, lecz kluczowym
elementem dostępności poznawczej (cognitive accessibility). Użytkownik, który bez wysiłku
odczytuje instrukcje, czuje się pewniej i bezpieczniej, co przekłada się na wyższą konwersję i
retencję w ramach platformy.

1.2 Profil Użytkownika i Dostępność (Accessibility)

Projektując Centrum Wiedzy, musimy uwzględnić dwie skrajne persony:

1.  Nowicjusz (The Newcomer): Osoba przyzwyczajona do standardów Web2, oczekująca

możliwości odzyskania hasła i wsparcia klienta. Dla niej kluczowa jest edukacja
podstawowa i jasne rozróżnienie między "custodial" a "non-custodial".

2.  Ekspert (The Power User): Osoba szukająca specyficznych parametrów technicznych

(np. adresy kontraktów, RPC).

Wspólnym mianownikiem dla obu grup jest potrzeba szybkości i precyzji informacji. Wymóg
stosowania chlebowych okruszków (breadcrumbs) oraz zaawansowanej wyszukiwarki w lewej
kolumnie jest odpowiedzią na te potrzeby, umożliwiając błyskawiczną nawigację w głąb
struktury serwisu.

2. Architektura Informacji i Układ Przestrzenny (Grid
System)

Zgodnie z wymaganiami, fundamentem projektu jest układ dwukolumnowy na urządzeniach
desktopowych. Jest to klasyczny wzorzec "Main Content + Sidebar", który w roku 2025
przeżywa renesans dzięki nowym możliwościom CSS Grid i Flexbox, pozwalającym na
tworzenie inteligentnych, responsywnych relacji między elementami.

2.1 Fizyka Układu Dwukolumnowego (Desktop)

Podział przestrzeni roboczej nie może być przypadkowy. Aby zachować harmonię wizualną i
optymalną długość wiersza dla czcionki 18px, rekomenduje się podział w proporcjach
zbliżonych do Złotego Podziału (ok. 66% / 33%) lub układ asymetryczny 70% / 30% z szerokim
marginesem (gutter).
Parametr Układu
Szerokość Kontenera

Wartość Rekomendowana
Max-width: 1440px

Lewa Kolumna (Treść)

~850px - 900px

Prawa Kolumna (Sidebar)

~350px - 400px

Odstęp (Gap/Gutter)

48px - 64px

Uzasadnienie Techniczne i UX
Standard dla nowoczesnych
monitorów, zapewniający
marginesy boczne ("white
space") na ekranach ultra-wide.
Pozwala na swobodne
rozmieszczenie nagłówków H1
i treści artykułu przy
zachowaniu optymalnej miary
wiersza (60-75 znaków).
Szerokość wystarczająca dla
modułów CTA i list artykułów,
zgodna ze standardami
reklamowymi IAB (choć
używana do celów
wewnętrznych).
Duży odstęp jest krytyczny w
"Dark Mode", aby oddzielić
strefę czytania od strefy akcji,

Parametr Układu

Wartość Rekomendowana

Uzasadnienie Techniczne i UX
redukując szum wizualny.

2.1.1 Implementacja CSS Grid

Z technicznego punktu widzenia, układ ten powinien być realizowany za pomocą CSS Grid, co
zapewnia stabilność struktury przy zmianie zawartości:
.centrum-wiedzy-container {
  display: grid;
  grid-template-columns: minmax(0, 2.5fr) minmax(320px, 1fr);
  gap: 4rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
}

Użycie minmax(0,...) dla lewej kolumny jest kluczowe, aby zapobiec rozpychaniu układu przez
szerokie bloki kodu (code snippets) lub duże ilustracje 3D, co jest częstym błędem w
dokumentacjach technicznych.

2.2 Lewa Kolumna: Serce Wiedzy

Lewa kolumna, będąca głównym obszarem skupienia uwagi użytkownika (F-Pattern), musi
zawierać elementy w ściśle określonej hierarchii.

2.2.1 Nagłówek (Header) i Breadcrumbs

Sekcja nagłówkowa pełni funkcję orientacyjną.

●  Breadcrumbs (Okruszki): Zgodnie z wymaganiem, muszą znaleźć się na szczycie. Ich
rola w SEO jest nieoceniona – strukturyzują one witrynę dla botów Google i redukują
współczynnik odrzuceń (bounce rate).

○  Struktura: Home > Centrum Wiedzy > [Kategoria] >.
○  Wygląd: Subtelny, mniejszy font (14px), kolor o niższym kontraście, interaktywny.

●  Nagłówek H1: Musi być masywny, kontrastowy i zawierać słowa kluczowe. Przy czcionce

bazowej 18px, H1 powinien mieć wielkość ok. 48px-56px, aby zachować wyraźną
hierarchię typograficzną.

2.2.2 Wyszukiwarka (Search Engine)

Wyszukiwarka w Centrum Wiedzy to nie tylko pole tekstowe; to narzędzie nawigacyjne
pierwszej potrzeby.

●  Design: Duże pole input (wysokość min. 56px), z wyraźną ikoną lupy. Placeholder
powinien sugerować zapytania: "Szukaj tematów (np. stakowanie, bezpieczeństwo
portfela)...".

●  Predictive UX: Wyszukiwarka musi oferować podpowiedzi w czasie rzeczywistym

("Instant Search"). W momencie wpisywania frazy "gas", system powinien sugerować:

○  Artykuł: "Czym jest Gas Limit?"
○  FAQ: "Dlaczego opłaty gas są wysokie?"

○  Kategoria: "Opłaty Sieciowe".

2.2.3 Lista Artykułów / Kategorie

Na stronie głównej Centrum Wiedzy, pod wyszukiwarką, znajduje się lista kategorii. W roku
2025 odchodzi się od prostych list linków na rzecz Bento Grids lub kart kafelkowych.

●  Karty Kategorii: Każda kategoria powinna być reprezentowana przez kafelek z unikalną

●

ikoną 3D (zgodnie z wymogiem ilustracji).
Interakcja: Hover na kafelku powinien wywoływać subtelną animację (np. uniesienie,
poświata), co jest zgodne z trendem "Micro-Interactions".

2.2.4 Szablon Artykułu (Article Template)

To najważniejszy element lewej kolumny. Musi być zoptymalizowany pod kątem głębokiego
czytania (Deep Reading).

●  Struktura:

1.  Tytuł (H1).
2.  Metadane (Autor, Data aktualizacji, Czas czytania).
3.  Lead (Wstęp) – pogrubiony, 20px.
4.  Treść właściwa (18px, line-height 1.6).
5.  Sekcje H2/H3 – wyraźnie oddzielone światłem (whitespace).

●

Ilustracje: W treści artykułu należy przeplatać tekst z abstrakcyjnymi ilustracjami 3D lub
schematami, aby przełamać monotonię tekstu ("Wall of Text").

2.3 Prawa Kolumna: Kontekst i Akcja

Prawa kolumna pełni rolę wspierającą i konwertującą. Kluczowym mechanizmem jest tutaj
Sticky Positioning – elementy te muszą podążać za użytkownikiem podczas przewijania
długiego artykułu.

2.3.1 Powiązane Artykuły (Related Articles)

Algorytm doboru artykułów powiązanych musi być semantyczny, a nie losowy.

●  Logika: Jeśli użytkownik czyta "Jak kupić Ethereum", powiązany artykuł powinien
brzmieć "Jak bezpiecznie przechowywać Ethereum" (kolejny krok w podróży
użytkownika), a nie "Historia Bitcoina" (informacja nieistotna w tym momencie).
●  Prezentacja: Lista z miniaturami (thumbnail) po lewej stronie tekstu, co ułatwia

skanowanie wzrokiem.

2.3.2 CTA (Call to Action)

Sekcja ta ma na celu konwersję wiedzy w działanie.

●  Kontekstowość: CTA musi być dopasowane do treści artykułu.

○  Artykuł o bezpieczeństwie -> CTA: "Włącz weryfikację dwuetapową (2FA)".
○  Artykuł o handlu -> CTA: "Przejdź do terminala handlowego".

●  Wygląd: Użycie efektu "Glassmorphism" (półprzezroczyste tło z rozmyciem), aby

wyróżnić ten element od reszty strony, nadając mu priorytet wizualny.

2.3.3 Promocja

Miejsce na promowanie nowych funkcji platformy lub partnerstw. Musi być wyraźnie oddzielone
wizualnie, aby nie zostało pomylone z treścią edukacyjną (Banner Blindness).

3. Typografia: Fundament Czytelności (18px)

Wymóg zastosowania czcionki o wielkości 18px jest kluczowy i wpisuje się w nowoczesne
standardy dostępności (WCAG 2.2) oraz trendy projektowe na rok 2025.

3.1 Nauka o Czytelności Ekranowej

Tradycyjny standard 16px staje się niewystarczający w obliczu rosnących rozdzielczości
ekranów (HiDPI/Retina) oraz faktu, że urządzenia desktopowe są często ustawione w większej
odległości od oczu użytkownika niż urządzenia mobilne.

●  Dostępność: 18px jest znacznie bardziej przyjazne dla osób starszych oraz

użytkowników z wadami wzroku. W Web3, gdzie jeden błąd w odczytaniu adresu portfela
może być katastrofalny, czytelność jest elementem bezpieczeństwa.

3.2 Dobór Kroju Pisma (Font Selection)

Dla polskiego "Centrum Wiedzy" kluczowe jest wsparcie dla znaków diakrytycznych (ą, ę, ś, ć,
ż, ź, ń, ł, ó). Należy unikać fontów, które "pożyczają" polskie znaki z innego kroju (tzw. glyph
substitution).
Rekomendowane kroje pisma:

1.  Inter: Standard w branży krypto (używany przez Coinbase, Uniswap). Jest to krój typu
neo-grotesk, zaprojektowany specjalnie do interfejsów użytkownika. Posiada wysoką
wysokość x (x-height), co czyni go czytelnym nawet w małych rozmiarach (np. w
przypisach), a w 18px prezentuje się nowocześnie i technicznie.

2.  Plus Jakarta Sans: Bardziej geometryczny, nowoczesny, kojarzący się z innowacją i

startupami.

3.  Manrope: Doskonały do prezentacji danych liczbowych (tabular figures), co jest istotne w

artykułach finansowych.

3.3 Parametry Typograficzne

Aby spełnić wymóg line-height 1.6 przy czcionce 18px, należy zastosować następujące reguły
CSS:
body {
  font-family: 'Inter', sans-serif;
  font-size: 18px; /* Base size */
  line-height: 1.6; /* 28.8px leading */
  color: #E2E8F0; /* Off-white for dark mode reading comfort */
  letter-spacing: -0.01em; /* Slight tightening for large fonts */
}

h1, h2, h3 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.2;
  font-weight: 700;
}

Zastosowanie interlinii 1.6 tworzy "powietrze" między wierszami, co ułatwia śledzenie tekstu i
zapobiega zmęczeniu oczu podczas czytania długich, technicznych instrukcji.

4. System Wizualny: Ilustracje i Ikony w Erze Web3

Zgodnie z wymogiem, projekt musi zawierać ilustracje i ikony. W roku 2025 estetyka Web3
odeszła od płaskich ilustracji wektorowych (Flat Design) na rzecz głębi i abstrakcji.

4.1 Abstrakcyjne 3D (Abstract 3D Trends)

Zamiast dosłownych przedstawień (np. moneta wpadająca do świnki skarbonki), należy
stosować abstrakcyjne formy 3D, które metaforycznie oddają naturę technologii blockchain:

●  Kształty: Lewitujące bryły, szklane sfery, połączone węzły (nodes), sześciany (blocks).
●  Materiały: Mrożone szkło, neonowe światła, metaliczne tekstury. Te materiały kojarzą się

z "nowoczesnością", "przejrzystością" i "solidnością".

●  Zastosowanie:

○  Nagłówki kategorii: Każda kategoria w lewej kolumnie otrzymuje unikalny render

○

3D.
Ilustracje artykułów: Główne zdjęcie (Hero Image) artykułu to kompozycja 3D na
ciemnym tle.

4.2 Dark Mode jako Standard

Web3 jest "Dark Mode native". Większość platform handlowych i deweloperskich domyślnie
używa ciemnego motywu, aby redukować zmęczenie oczu (Blue Light Reduction) i oszczędzać
energię na ekranach OLED.

●  Kolorystyka: Nie należy używać czystej czerni (#000000), która powoduje smużenie

tekstu przy przewijaniu. Rekomendowane tła to głębokie odcienie szarości (#121212) lub
granatu (#0F172A).

●  Tekst: Kolor tekstu nie powinien być czysto biały (#FFFFFF), lecz lekko złamany

(#F1F5F9), aby uniknąć efektu halacji (rozmycia światła wokół liter).

4.3 Ikony (Iconography)

Ikony nawigacyjne (np. w breadcrumbs, wyszukiwarce) powinny być minimalistyczne, liniowe
(outline), ale z delikatnym akcentem kolorystycznym (np. gradientem) przy stanie aktywnym.
Użycie bibliotek takich jak Phosphor Icons lub Heroicons zapewnia spójność techniczną.

5. Implementacja Techniczna: SEO i Structured Data

Wymóg "meta tagów SEO" oraz "structured data" implikuje konieczność wdrożenia

zaawansowanej strategii semantycznej, która pozwoli Google "zrozumieć" treść strony, a nie
tylko ją zaindeksować.

5.1 Strategia Schema.org (JSON-LD)

Dla Centrum Wiedzy zastosujemy hybrydowy model danych strukturalnych, łączący FAQPage
(dla sekcji pytań) oraz TechArticle (dla instrukcji).

5.1.1 FAQPage Schema

Implementacja tego schematu pozwala na wyświetlanie pytań i odpowiedzi bezpośrednio w
wynikach wyszukiwania Google (tzw. Rich Results), co drastycznie zwiększa CTR
(Click-Through Rate).
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity":
}
</script>

5.1.2 TechArticle vs. Article

Dla artykułów technicznych (np. "Jak skonfigurować sieć Polygon w MetaMask"), należy użyć
typu TechArticle zamiast ogólnego Article. Pozwala to na zdefiniowanie poziomu
zaawansowania (proficiencyLevel) oraz wymagań wstępnych (dependencies), co pomaga
Google lepiej dopasować treść do intencji użytkownika.

5.2 Meta Tagi i Optymalizacja On-Page

Każda strona artykułu musi generować dynamiczne meta tagi:

●  Title Tag: - Centrum Wiedzy | [Nazwa Platformy] (Max 60 znaków).
●  Meta Description: Krótkie streszczenie zachęcające do kliknięcia, zawierające główne

słowo kluczowe (Max 155 znaków).

●  Open Graph (OG): Obrazy dedykowane dla social mediów (Facebook/Twitter/LinkedIn),

które automatycznie nakładają tytuł artykułu na tło z ilustracją 3D.

●  Canonical URL: Zapobiega duplikacji treści, jeśli artykuł jest dostępny pod wieloma

ścieżkami URL.

6. Komponenty i Interakcje (Szczegółowa
Specyfikacja)

6.1 Breadcrumbs (Ścieżka Powrotu)

Element ten jest niezbędny dla nawigacji w złożonej strukturze wiedzy. Musi być
zaimplementowany semantycznie.

●  Kod: Lista ul / li z odpowiednim stylem CSS usuwającym punktory.
●  Schema: BreadcrumbList w JSON-LD, aby Google wyświetlało ścieżkę w wynikach

wyszukiwania (zamiast surowego URL).

6.2 Przycisk "Kopiuj" i Code Snippets

W artykułach technicznych często pojawiają się adresy kontraktów lub komendy.

●  Wymóg: Każdy blok kodu lub adres musi posiadać przycisk "Kopiuj do schowka" (Copy

to Clipboard).

●  Feedback: Po kliknięciu, przycisk musi zmienić stan na "Skopiowano!" (zielony kolor,

ikona "tick"), dając użytkownikowi pewność, że operacja się powiodła. Jest to krytyczne
dla redukcji lęku przed błędnym skopiowaniem adresu.

6.3 Spis Treści (Table of Contents - TOC)

Dla długich artykułów, w lewej kolumnie (np. po lewej stronie tekstu lub jako element sticky
wewnątrz kolumny tekstu) powinien znajdować się dynamiczny spis treści.

●  Działanie: Kliknięcie w nagłówek przewija płynnie (smooth scroll) do odpowiedniej sekcji.
●  Active State: Podczas przewijania, aktualnie czytana sekcja powinna być podświetlona w

spisie treści (Intersection Observer API).

7. Analiza Porównawcza i Benchmarking

Aby zapewnić najwyższą jakość, projekt Centrum Wiedzy czerpie z rozwiązań liderów rynku:
Coinbase Learn  Rekomendacja
Cecha

Uniswap Help
Center

MetaMask
Support

Układ

Jednokolumnowy,
minimalistyczny

Siatka kafelkowa
(Grid)

Karty, bogate
wizualnie

Typografia

Inter, duży kontrast Systemowy,
standardowy

Custom (Coinbase
Sans)

Search

Centralny,
dominujący

W nagłówku,
dyskretny

Zintegrowany

Styl

Pastelowy,
"Unicorn"

Techniczny, "Fox"  Korporacyjny,

"Blue"

dla Naszego
Projektu
Dwukolumnowy:
Łączy czytelność
Uniswap z
potencjałem
promocyjnym
paska bocznego.
Inter 18px:
Optymalny
kompromis między
dostępnością a
nowoczesnością.
Predictive
Search: Musi być
bardziej
inteligentny niż u
konkurencji
(podpowiedzi
kontekstowe).
Abstract Dark:
Buduje wizerunek

Cecha

Uniswap Help
Center

MetaMask
Support

Coinbase Learn  Rekomendacja

dla Naszego
Projektu
premium i
technologicznego
zaawansowania.

8. Podsumowanie i Rekomendacje Wdrożeniowe

Zaproponowany projekt Centrum Wiedzy to zaawansowany ekosystem edukacyjny, który
wykracza poza standardowe wymagania FAQ. Zastosowanie dwukolumnowego układu
pozwala na efektywne zarządzanie uwagą użytkownika, kierując ją na treści edukacyjne (lewa
kolumna), jednocześnie subtelnie sugerując kolejne kroki i konwersję (prawa kolumna).
Kluczowe kroki wdrożeniowe:

1.  Development: Budowa responsywnego gridu CSS z uwzględnieniem position: sticky dla

prawej kolumny.

2.  Content: Opracowanie biblioteki ilustracji 3D oraz przygotowanie treści z uwzględnieniem

hierarchii nagłówków H1-H3.

3.  SEO: Implementacja generatora JSON-LD dla typów FAQPage i TechArticle.
4.  Testy: Weryfikacja czytelności czcionki 18px na różnych urządzeniach oraz testy

dostępności (kontrast, nawigacja klawiaturą).

Realizacja tej strategii pozwoli na stworzenie platformy, która nie tylko informuje, ale przede
wszystkim buduje głębokie zaufanie i lojalność użytkowników w wymagającym świecie Web3.

Cytowane prace

1. Six tips for better web typography - CSS-Tricks,
https://css-tricks.com/six-tips-for-better-web-typography/ 2. How to Choose the Best CSS Unit to
Create Better Site Layouts - WP Engine,
https://wpengine.com/resources/choose-css-unit-create-better-site-layouts-how-to/ 3. UI Font
Size Guidelines: Mastering Typography for Better UX Design - B13,
https://b13.com/blog/designing-with-type-a-guide-to-ui-font-size-guidelines 4. Optimal
Typography For Web Design In 2025 - Elegant Themes,
https://www.elegantthemes.com/blog/design/optimal-typography-for-web-design 5. 9 Top UI/UX
Design Trends in 2025 - Big Bash Studio, https://bigbashstudio.com/ui-ux-design-trends/ 6. 10
Web3 design trends for 2025 | Merge Rocks,
https://merge.rocks/blog/10-web3-design-trends-for-2025 7. The Coolest 3D Illustration Trends
2025 You Need to Know - Just The Skills, https://justtheskills.com/3d-illustration-trends-2025/ 8.
Sticky menu: the 3 golden rules of this navigation - Contentsquare,
https://contentsquare.com/blog/sticky-menu-navigation/ 9. Create a sticky sidebar - Webflow
Help, https://help.webflow.com/hc/en-us/articles/33961317023251-Create-a-sticky-sidebar 10.
UI/UX Design Trends of 2025: Next-Gen Experiences - Intelegain Technologies,
https://www.intelegain.com/ui-ux-design-trends-of-2025-next-gen-experiences/ 11. Is there an
optimal font size? - User Experience Stack Exchange,
https://ux.stackexchange.com/questions/211/is-there-an-optimal-font-size 12. Typography
Trends vs. Timeless Principles in 2025: When to Follow and When to Stick to Fundamentals | by
Roberto Moreno Celta,
https://robertcelt95.medium.com/typography-trends-vs-timeless-principles-in-2025-when-to-follo

w-and-when-to-stick-to-fundamentals-31610e6b7c80 13. 3d Blockchain Icon royalty-free images
- Shutterstock, https://www.shutterstock.com/search/3d-blockchain-icon 14. Crypto 3d Vector &
Layered Graphics - Envato, https://elements.envato.com/graphics/crypto+3d 15. Best Dark
Mode UI Design Examples and Best Practices in 2025 - Uinkits,
https://www.uinkits.com/blog-post/best-dark-mode-ui-design-examples-and-best-practices-in-20
25 16. Best UI/UX Design Trends to Follow in 2025 | by Rahim Ladhani - Medium,
https://nevinainfotech25.medium.com/best-ui-ux-design-trends-to-follow-in-2025-c31d3e62779c
17. 10 Dark Mode UI Best Practices & Principles for 2025 - Design Studio UI/UX,
https://www.designstudiouiux.com/blog/dark-mode-ui-design-best-practices/ 18. Dark Mode UI
in the Spotlight: 11 Tips for Dark Theme Design in 2025 - Netguru,
https://www.netguru.com/blog/tips-dark-mode-ui 19. TechArticle - Schema.org Type,
https://schema.org/TechArticle 20. How to Select the Best Article Schema Type - Hill Web
Creations, https://www.hillwebcreations.com/article-structured-data/

