🐋 PANEL FANA (FAN DASHBOARD) – ATOMOWO SZCZEGÓŁOWY PROMPT PROJEKTOWY

(Integracja: Master Plan UI 2026 + Optymalizacja Strategiczna + Web3 UX)

---

📌 UWAGA WSTĘPNA

Ten prompt jest piątym, równoległym dokumentem – po Profilu Publicznym, Panelu Twórcy, Katalogu Twórców i Centrum Wiedzy.
Panel Fana to prywatna strefa zalogowanego użytkownika, który wspiera twórców, ale sam nie jest twórcą (lub może nim zostać w przyszłości). Celem panelu jest zwiększenie zaangażowania i lojalności poprzez grywalizację (odznaki NFT), śledzenie wspieranych twórców, historię transakcji oraz personalizację.

Główne wyzwania:

· Grywalizacja: kolekcjonowanie odznak (Proof of Support NFT) – atrakcyjna wizualnie galeria.
· Śledzenie subskrypcji i aktywnych wsparć.
· Łatwy dostęp do profilów wspieranych twórców.
· Możliwość przejścia na tryb twórcy (onboarding).
· Responsywność i wydajność (galeria NFT może zawierać wiele obrazków).

Struktura promptu:
Strategia → Layout → Komponenty (atomy/molekuły/organizmy) → Design system → Web3 (NFT, subskrypcje) → Inżynieria → Dostępność → Checklista.

---

SPIS TREŚCI

1. Cel strategiczny i kontekst biznesowy
2. Architektura informacji i układ (layout)
   · 2.1 Desktop – uproszczony sidebar + główny obszar
   · 2.2 Mobile – bottom navigation (jak w panelu twórcy)
3. Szczegółowa specyfikacja sekcji (atomy i molekuły)
   · 3.1 Strona główna panelu fana (Dashboard)
   · 3.2 Moje subskrypcje i wspierani twórcy
   · 3.3 Historia napiwków
   · 3.4 Galeria odznak (NFT Proof of Support)
   · 3.5 Ustawienia konta fana
   · 3.6 CTA “Zostań twórcą”
4. Galeria odznak NFT – szczegółowa specyfikacja
   · 4.1 Siatka miniatur (grid)
   · 4.2 Filtry i sortowanie (według twórcy, rzadkości, daty)
   · 4.3 Modal szczegółów odznaki
   · 4.4 Udostępnianie odznaki (social media)
5. System wizualny i design tokens
6. Komponenty Web3 w panelu fana
   · 6.1 Wyświetlanie posiadanych NFT
   · 6.2 Subskrypcje (zarządzanie)
   · 6.3 Portfel fana (saldo TipJar – opcjonalnie)
7. Inżynieria techniczna (Next.js 15 App Router)
   · 7.1 Strategia renderowania (CSR + SSR dla danych statycznych)
   · 7.2 Wirtualizacja galerii NFT (react-window)
   · 7.3 Real-time (subskrypcje, powiadomienia)
8. Dostępność (WCAG 2.2) i ergonomia
9. Checklista implementacyjna (podział na atomy)

---

1. CEL STRATEGICZNY I KONTEKST BIZNESOWY

Panel Fana to miejsce, w którym użytkownik:

· Przegląda swoich wspieranych twórców i aktywne subskrypcje.
· Ogląda historię swoich napiwków.
· Zbiera i podziwia odznaki NFT (Proof of Support) – to kluczowy element grywalizacji, który zwiększa lojalność i zachęca do dalszego wspierania.
· Zarządza swoim kontem i ustawieniami.
· Może w każdej chwili rozpocząć proces stawania się twórcą (onboarding).

Metryki sukcesu:

· Czas spędzony w panelu – im dłużej, tym lepiej (galeria NFT zachęca do przeglądania).
· Współczynnik aktywacji – % fanów, którzy kliknęli “Zostań twórcą”.
· Retencja – użytkownicy wracają, aby sprawdzić nowe odznaki.

Dlaczego to ważne (z dokumentów):
Grywalizacja i kolekcjonowanie (NFT) są kluczowymi czynnikami zaangażowania w Web3. Badania wskazują, że użytkownicy, którzy otrzymują odznaki, są 3x bardziej skłonni do powtórnych interakcji.

---

2. ARCHITEKTURA INFORMACJI I UKŁAD (LAYOUT)

2.1 Desktop (≥1024px) – uproszczony sidebar + główny obszar

Podobnie jak w panelu twórcy, ale z prostszym menu (mniej sekcji).

```
┌─────────────────────────────────────────────────────────────────┐
│  TOPBAR (powitanie, awatar, powiadomienia)                      │
├───────────────────────────────┬─────────────────────────────────┤
│  SIDEBAR (200px)              │  GŁÓWNY OBSZAR                  │
│  – Avatar fana                │  – Dashboard / Subskrypcje /    │
│  – Nazwa                      │    Historia / Galeria /         │
│  – Nawigacja:                 │    Ustawienia                   │
│    • Dashboard                │                                 │
│    • Moi twórcy               │                                 │
│    • Historia                 │                                 │
│    • Moje odznaki             │                                 │
│    • Ustawienia               │                                 │
│  – Przycisk "Zostań twórcą"   │                                 │
└───────────────────────────────┴─────────────────────────────────┘
```

Sidebar:

· Szerokość 200px (węższy niż u twórcy).
· Zawiera awatar fana (okrągły, 48px), nazwę.
· Nawigacja: ikona + tekst (aktywny podświetlony na złoto).
· Na dole: wyróżniony przycisk “Zostań twórcą” (złoty lub fioletowy).

Główny obszar:
Dynamicznie ładowana treść w zależności od wybranej sekcji.

2.2 Mobile (<640px) – bottom navigation (jak w panelu twórcy)

· Bottom navigation z 5 ikonami: Dom (Dashboard), Twórcy, Historia, Odznaki, Więcej (Ustawienia).
· Sidebar chowa się w hamburger menu (jeśli potrzebne).

---

3. SZCZEGÓŁOWA SPECYFIKACJA SEKCJI (ATOMY I MOLEKUŁY)

3.1 Strona główna panelu fana (Dashboard)

Molekuły / Organizmy:

3.1.1 Kafelek powitalny

· “Witaj, [Nick]!” z awatarem.
· Krótkie statystyki: łączna kwota wsparcia (wszystkich czasów), liczba wspieranych twórców, liczba zdobytych odznak.

3.1.2 Ostatnie aktywności (lista)

· 3-5 ostatnich napiwków (kwota, twórca, data).
· 3-5 ostatnich odznak (miniatury NFT) – klikalne.

3.1.3 Polecani twórcy (algorytm)

· Sugestie nowych twórców na podstawie obserwowanych kategorii (jeśli funkcja follow aktywna).
· Karty twórców (jak w katalogu, ale mniejsze).

3.1.4 Sekcja “Powiadomienia” (skrót)

· Ostatnie 2-3 powiadomienia (np. “Twój Proof of Support NFT został wybity!”).

---

3.2 Moje subskrypcje i wspierani twórcy

Organizm: MyCreators

· Lista aktywnych subskrypcji (jeśli subskrypcje NFT włączone):
    Karta każdego twórcy: awatar, nazwa, plan (np. “Złoty Fan”), cena miesięczna, data następnej płatności, przycisk “Zarządzaj” (anuluj subskrypcję).
· Lista wspieranych twórców (jednorazowe napiwki):
    Prostsza lista: awatar, nazwa, łączna kwota wsparcia, data ostatniego napiwku, przycisk “Wesprzyj ponownie” (przekierowanie do profilu).

Sortowanie: według daty ostatniego wsparcia, kwoty, nazwy.

---

3.3 Historia napiwków

Organizm: TipHistory

· Tabela (lub lista) wszystkich napiwków wysłanych przez fana.
· Kolumny: Data, Twórca (nazwa + awatar), Kwota (USDC), Wiadomość (opcjonalnie), Status (potwierdzona).
· Filtry: według twórcy, przedziału dat, kwoty.
· Eksport do CSV (opcjonalnie).

---

3.4 Galeria odznak NFT (Proof of Support)

To jest kluczowa sekcja panelu fana.
Szczegółowa specyfikacja w sekcji 4.

---

3.5 Ustawienia konta fana

Organizm: FanSettings

· Profil: edycja nicku, awatara, bio (opcjonalnie).
· Konto: zmiana emaila, hasła.
· Powiadomienia: przełączniki (email/push/in-app) dla zdarzeń: nowy napiwek (od twórcy? – raczej nie, to fan wysyła), nowa odznaka, przypomnienia o subskrypcjach.
· Połącz portfel Web3: podłącz zewnętrzny portfel (MetaMask) – aby wyświetlić NFT w galerii (jeśli odznaki są na blockchainie).

---

3.6 CTA “Zostań twórcą”

· Wyróżniony przycisk w sidebarze (złoty) lub osobna karta na dashboardzie.
· Po kliknięciu: rozpoczęcie procesu onboardingu (kreator profilu twórcy – patrz wcześniejszy prompt dla twórcy).
· Po ukończeniu: użytkownik zyskuje dostęp do Panelu Twórcy (obok Panelu Fana – przełącznik ról w menu).

---

4. GALERIA ODZNAK NFT – SZCZEGÓŁOWA SPECYFIKACJA

4.1 Siatka miniatur (grid)

Grid CSS:

```css
.nft-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}
```

· Każda miniatura: kwadrat 160x160px (lub proporcjonalny).
· Tło karty: --bg-surface-base, border-radius 12px, cień --shadow-1.
· Hover: uniesienie translateY(-2px), cień --shadow-2.

Zawartość miniatury:

· Obrazek NFT (thumbnail) – może być w formacie WebP, ładowany z IPFS/Arweave.
· Overlay (na hover): ikona powiększenia + nazwa odznaki (skrócona).
· W prawym górnym rogu: znacznik rzadkości (kolorowa kropka lub ikona: brąz/srebro/złoto/fiolet).

4.2 Filtry i sortowanie (według twórcy, rzadkości, daty)

· Filtry: dropdown “Wszyscy twórcy”, “Rzadkość” (Common, Uncommon, Rare, Legendary).
· Sortowanie: data (najnowsze), kwota wsparcia (od najwyższej), twórca (alfabetycznie).

4.3 Modal szczegółów odznaki

Po kliknięciu w miniaturę – otwiera się modal (zgodny z design systemem):

· Duży obrazek NFT (400x400px lub więcej).
· Metadane: nazwa odznaki, twórca (link do profilu), data wsparcia, kwota, wiadomość (jeśli była).
· Link do eksploratora (Etherscan / Arweave).
· Przycisk “Udostępnij” (generuje grafikę do Twittera).

4.4 Udostępnianie odznaki (social media)

· Generowanie obrazka z NFT + tekst “Wsparłem [twórcę] na TipJar+! Oto moja odznaka 🎉”.
· Możliwość bezpośredniego tweetowania (Share to Twitter).

---

5. SYSTEM WIZUALNY I DESIGN TOKENS

Identyczne tokeny jak w poprzednich promptach.
Dodatkowe dla galerii NFT:

· --nft-thumbnail-size: 160px
· --nft-rarity-common: #CD7F32 (brąz)
· --nft-rarity-uncommon: #C0C0C0 (srebro)
· --nft-rarity-rare: #FFD700 (złoto)
· --nft-rarity-legendary: #9D4EDD (fiolet)

---

6. KOMPONENTY WEB3 W PANELU FANA

6.1 Wyświetlanie posiadanych NFT

· Odznaki są mintowane jako ERC-1155 lub ERC-721 (soulbound).
· Panel fana pobiera dane o posiadanych NFT z backendu (lub bezpośrednio z blockchaina przez API).
· Miniatury generowane z metadanych (obrazek + rzadkość).

6.2 Subskrypcje (zarządzanie)

· Fan może anulować subskrypcję (klikając “Anuluj” przy aktywnej subskrypcji).
· Po anulowaniu: subskrypcja wygasa z końcem okresu rozliczeniowego, NFT subskrypcyjne traci ważność (zmiana koloru na szary).

6.3 Portfel fana (saldo TipJar – opcjonalnie)

· Jeśli fan doładował saldo wewnętrzne (TipJar balance), wyświetlana jest karta z saldem i przyciskiem “Doładuj”.
· Dla uproszczenia MVP można pominąć.

---

7. INŻYNIERIA TECHNICZNA (NEXT.JS 15 APP ROUTER)

7.1 Strategia renderowania (CSR + SSR dla danych statycznych)

· Struktura strony: /fan/dashboard, /fan/creators, /fan/history, /fan/badges, /fan/settings.
· Dane dynamiczne (subskrypcje, historia, NFT) – ładowane po stronie klienta (CSR) z API.
· Layout panelu (sidebar, topbar) – SSR lub SSG (wspólny dla wszystkich podstron).

7.2 Wirtualizacja galerii NFT (react-window)

· Jeśli liczba odznak > 100, zastosować react-window z VariableSizeGrid lub FixedSizeGrid.
· Renderowanie tylko widocznych miniaturek.

7.3 Real-time (subskrypcje, powiadomienia)

· WebSocket do powiadomień o nowych odznakach (gdy NFT zostanie mintowane).
· Po otrzymaniu nowej odznaki – odświeżenie galerii i pokazanie toasta.

---

8. DOSTĘPNOŚĆ (WCAG 2.2) I ERGONOMIA

· Kontrast: min. 4.5:1.
· Cele dotykowe: min. 44x44px.
· Focus: widoczny outline.
· Alternatywy tekstowe dla NFT: każda miniatura ma alt z nazwą odznaki.
· prefers-reduced-motion: wyłączenie animacji hover.

---

9. CHECKLISTA IMPLEMENTACYJNA (PODZIAŁ NA ATOMY)

Atomy (podstawowe)

· FanSidebar (nawigacja)
· Topbar (powitanie, awatar, powiadomienia)
· StatCard (kafelek statystyk)
· CreatorCard (mała karta twórcy)
· SubscriptionCard
· TipHistoryRow
· NFTThumbnail (miniatura odznaki)
· NFTModal (szczegóły odznaki)
· ShareButton (udostępnianie)

Molekuły / Organizmy

· FanDashboardHome
· MyCreatorsList
· TipHistoryTable
· NFTGallery (z wirtualizacją, filtrami)
· FanSettings
· BecomeCreatorCTA

Integracje techniczne

· Next.js 15 App Router: /fan/*
· API endpointy: /api/fan/subscriptions, /api/fan/tips, /api/fan/nfts
· WebSocket dla powiadomień
· Integracja z IPFS/Arweave dla obrazków NFT
· Generowanie OG Image dla odznak (opcjonalne)

---

📌 PODSUMOWANIE

Ten prompt dostarcza atomowo szczegółowej specyfikacji Panelu Fana.
Zawiera:

· Strategię grywalizacji i zwiększania zaangażowania.
· Layout desktop/mobile (sidebar, bottom navigation).
· Specyfikację galerii NFT (grid, filtry, modal, udostępnianie).
· Zarządzanie subskrypcjami i historią napiwków.
· Design tokens i Web3.
· Inżynierię Next.js (CSR, wirtualizacja, real-time).
· Dostępność WCAG 2.2.
· Pełną checklistę implementacyjną.

