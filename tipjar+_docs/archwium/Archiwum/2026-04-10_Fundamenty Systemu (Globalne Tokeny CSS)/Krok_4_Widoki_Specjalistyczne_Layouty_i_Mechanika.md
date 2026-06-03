🧬 Krok 4: Widoki Specjalistyczne – Layouty i Mechanika

1. Publiczny Profil Twórcy (Creator Profile View)

Zgodnie z dokumentem tech_Profil_twórcy.pdf (str. 1-13).

1.1 Layout Desktop (≥1024px)

Właściwość Lewa Kolumna (Narracyjna) Prawa Kolumna (Transakcyjna)
Szerokość 60% - 70% 30% - 40%
Zawartość Hero, Bio, Ściana Fanów (Masonry), Ostatnie Wsparcia (Live Ticker) Panel Płatności "Wesprzyj", Karty Subskrypcji, Statystyki
Zachowanie Swobodne przewijanie position: sticky; top: 24px
Odstęp (Gap) 24px 

Psychologia: Panel płatności pozostaje w polu widzenia podczas przewijania długiej Ściany Fanów (efekt czystej ekspozycji).

1.2 Layout Mobilny (<640px)

Właściwość Wartość
Struktura Linearyzacja pionowa: Hero ➔ Bio ➔ Masonry ➔ Ostatnie Wsparcia
Panel Transakcyjny Redukcja do Sticky Bottom Bar
Wysokość Paska 72px
Z-Index Paska --z-fab (200)
Styl Paska --glass-overlay, --glass-blur, --glass-border
Zapobieganie Okluzji padding-bottom: calc(72px + env(safe-area-inset-bottom)) na <main>

1.3 Ściana Fanów (Masonry Grid)

Właściwość Wartość
Typ Układu Masonry (kaskadowy)
Biblioteka @tanstack/react-virtual + własna logika miernicza (TanStack Virtualizer)
Kolumny Desktop: 3, Tablet: 2, Mobile: 1
Odstęp (Gap) 16px
Fallback grid-template-rows: masonry (eksperymentalne)
Wydajność Renderowanie tylko elementów w viewporcie + bufor

1.4 Live Ticker (Ostatnie Wsparcia)

Właściwość Wartość
Limit wpisów 10
Technologia Server-Sent Events (SSE) + Redis Pub/Sub
Animacja Wejścia fade-in-up, 0.3s, --ease-enter
Podświetlenie Nowego --success-light przez 2s, potem powrót do --bg-surface-base

---

2. Panel Fana (Fan Dashboard)

Zgodnie z dokumentem tech_fan_profil.pdf (str. 1-13).

2.1 Layout Desktop (≥1024px)

Właściwość Wartość
Struktura Asymetryczny model dwukolumnowy
Sidebar (Lewy) Szerokość 200px, position: sticky; top: 0
Sidebar Zawartość Awatar (48px), Nazwa, Menu (Dashboard, Moi twórcy, Historia, Moje odznaki, Ustawienia), Przycisk "Zostań twórcą" (--gold-400)
Topbar Powitanie, Awatar miniaturowy, Powiadomienia
Obszar Główny Dynamiczne widoki ładowane asynchronicznie

2.2 Layout Mobilny (<640px)

Właściwość Wartość
Nawigacja Sticky Bottom Bar (5 ikon: Dom, Twórcy, Historia, Odznaki, Więcej)
Menu Boczne Hamburger Drawer (wysuwane z lewej) lub Bottom Sheet dla "Więcej"
Zapobieganie Okluzji padding-bottom: calc(64px + env(safe-area-inset-bottom)) na kontenerze treści

2.3 Galeria Odznak NFT (Bento Grid)

Właściwość Wartość
Typ Siatki CSS Grid: grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
Odstęp (Gap) 20px
Miniatura 160x160px, border-radius: 12px, --shadow-1
Hover translateY(-2px), --shadow-2, overlay z nazwą i ikoną lupy
Rzadkość (Badge) Brąz (Common), Srebro (Uncommon), Złoto (Rare), Fiolet (Legendary)
Filtrowanie Dropdowny: wg twórcy, poziomu rzadkości. Sortowanie: data, kwota, alfabetycznie
Modal Detali --glass-overlay, --glass-blur, grafika 400x400px, metadane on-chain, link do explorera

2.4 Udostępnianie Społecznościowe

Właściwość Wartość
Przycisk "Udostępnij na X / Twitterze"
Generowanie Obrazu Dynamiczny OG Image przez Satori Engine (Vercel @vercel/og)
Endpoint /api/og/badge?tokenId=...

---

3. Katalog Twórców (Explore / Discovery View)

Zgodnie z dokumentem tech_katalog_3part.pdf (str. 18-22).

3.1 Layout Desktop (≥1024px)

Właściwość Wartość
Nagłówek H1, masywne pole wyszukiwania
Szybkie Filtry Horyzontalne chipy kategorii (overflow-x auto)
Zaawansowane Filtry Rozwijany panel (dropdown) z sortowaniem, językiem, weryfikacją
Siatka Kart display: grid, grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)), gap: 24px
Nawigacja Paginacja (numery stron) – brak Infinite Scroll dla SEO

3.2 Layout Mobilny (<640px)

Właściwość Wartość
Szybkie Filtry Poziomy pasek przewijany (swipe)
Zaawansowane Filtry Bottom Sheet wywoływany przyciskiem "Filtry"
Siatka Kart 2 kolumny
Paginacja Przyciski "Poprzednia / Następna" + wskaźnik pozycji

3.3 Mechanika Wyszukiwania i Filtracji

Właściwość Wartość
Debounce 300ms na polu wyszukiwania
Stan Filtrów Przechowywany w URL Query Params (?category=music&sort=popular)
Aktualizacja router.push(url, { scroll: false })
Korzyść Deep linkowanie, możliwość udostępnienia przefiltrowanego widoku

3.4 Karta Twórcy (CreatorCard)

Właściwość Wartość
Wysokość Stała, ok. 320px
Awatar 96x96px
Nazwa H4, line-clamp: 2
Weryfikacja --gold-400 checkmark
ENS Resolution Wywołanie getEnsName z pakietu viem (z normalizacją UTS-46)
Social Proof Sumaryczna kwota przychodów w USDC
Hover translateY(-4px), cień z --shadow-1 na --shadow-2
Przycisk "Zobacz profil" (--gold-400 na hover)

---

⏭️ 🐋