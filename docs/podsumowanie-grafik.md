# Podsumowanie wszystkich grafik

## Najlepsze elementy – warto zachować i standaryzować

- **Ciemny canvas + złote akcenty** – czytelny, „fintech-premium” klimat.
- **Dwa główne CTA** w hero (np. *Sign up as Creator* / *Explore Creators*) – jasna ścieżka.
- **Portret twórcy z delikatnym złotym ringiem** – mocny „spotlight”, wysoka rozpoznawalność profilu.
- **Presetowe kwoty tipów** ($1 / $5 / $10 / $25) + slider – szybka decyzja, niskie tarcie.
- **Sticky CTA „Support”** (desktop: w kolumnie, mobile: dolny dock/FAB).
- **„Support History” / „Recent supporters”** – realny social proof podnoszący konwersję.
- **Karty z cienką obwódką (hairline 1 px)** – porządek i „produktowy” charakter.
- **Search-first nawigacja** (szeroki pasek wyszukiwarki w nav lub overlay) – naturalny punkt startu.
- **Chipsy filtrów z licznikami** w katalogu (*Category, Language, Price, Verified*).
- **Sekcje „Trending / Newly Verified / All”** w „Discover” – lepsza priorytetyzacja treści.
- **Jednolita ikonografia outline** (spójny stroke) – czystość i profesjonalizm.
- **Progres celu** (np. pasek zbiórki) – motywuje, domyka komunikat „Support”.
- **Subtelne mikro-interakcje** (sheen na CTA, lekki lift karty przy hoverze).
- **Konsekwentne tokeny** (kolor, radius, spacing) – spójność między ekranami.

## Dobre praktyki per widok

- **Hero**: krótki nagłówek (max 2 linie), podtytuł 1–2 linie, dwa CTA; bez nadmiaru ozdób za tekstem.
- **Profil twórcy**: avatar + bio + *Support module* (presety/slider) nad „Support History”; dock CTA w mobile.
- **Discover/Directory**: sticky top z wyszukiwarką, 1 rząd chipsów filtrów, siatka 4–6 kolumn, infinite scroll.
- **Navbar**: smukły (64–72 px), bez szkła; lewo logo, środek search, prawo *Create* (gold), bell, avatar.

## Kategorycznie unikać

- **Przerośniętych, kapsułowych pasków nawigacji** (masywne „pastylki”, szkło, ciężkie cienie).
- **Glow/poświat** na dużych powierzchniach i za tekstem (psuje czytelność, AA).
- **Złotego tekstu dla małych rozmiarów** (≤18 px) – słaby kontrast; złoto zostaje dla ikon/akcentów/dużych nagłówków.
- **Mieszania nazewnictwa akcji** (*Tip/Support/Donate/Pop t* w jednym miejscu) – jeden czasownik produktu.
- **Literówek i mieszania języków** (PL/EN w jednej karcie) – pełna lokalizacja, słownik pojęć.
- **Przesadnego glassmorphismu/3D** na kartach i nawigacji – ciężkie LCP, „krzykliwy” UI.
- **Nakładanych overlayów filtrów na siatkę wyników** – filtry w chipsach lub bocznym drawerze.
- **Powtarzania nagłówków („Discover Creators” ×2)** i dekoracji konkurujących z treścią.
- **Niespójnych promieni, cieni, stroke ikon** – jeden radius (np. 12), jeden cień lub brak.
- **Długich bloków tekstu w hero** – ściana tekstu obniża CTR w CTA.
- **Używania zdjęć bez pewnej licencji** – ryzyko prawne, szczególnie przy portretach.
- **„Iskierek/pyłków” w nadmiarze** – max kilka dyskretnych punktów, nigdy pod copy.

## Minimalny zestaw decyzji systemowych (ustandaryzować)

- **Kolory**:
    - `bg #0B0F12`, `surface #0F1520`, `text #DDE0DA`, `muted #A9B0A6`, `gold #FFD700`, `border #FFFFFF14`.
- **CTA**: *Primary (gold solid)* / *Secondary (gold outline 1 px)* / *Ghost*. Focus: outline 2 px #FFD700.
- **Typografia (skala 4-px)**: H1 48/56, H2 32/40, H3 24/32, Body 16/24, Caption 13/20.
- **Ikony**: jedna rodzina outline, stroke 1.5–1.75.
- **Karty**: radius 12, padding 16/24, hairline 1 px, zero dużych cieni.
- **Progres**: wysokość 10 px, tło #24303A, wypełnienie gold.

## Checklist na review przed wdrożeniem

- Jednoznaczne **CTA naming** w całym produkcie.
- Kontrast AA dla każdego tekstu (szczególnie na teal/gradientach).
- Spójne radiusy, marginesy i stroke ikon.
- Sticky CTA w profilach (desktop + mobile).
- Filtry jako chipsy (+ liczniki), nie overlay na grid.
- Brak „szkła” i agresywnego glow w nav/kartach.
- Copy bez literówek, pełna lokalizacja PL/EN.

## Wniosek

Fundament (dark + gold, portret, presety, social proof) jest bardzo mocny. Po ujednoliceniu nazewnictwa, typografii, CTA i redukcji „chrome” (szkło/glow) całość wskoczy o klasę premium zarówno wizualnie, jak i w konwersji.
