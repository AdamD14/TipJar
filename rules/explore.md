🐋 KATALOG TWÓRCÓW (EXPLORE / ODKRYWAJ) – ATOMOWO SZCZEGÓŁOWY PROMPT PROJEKTOWY

(Integracja: Master Plan UI 2026 + Optymalizacja Strategiczna + Web3 UX)

---

📌 UWAGA WSTĘPNA

Ten prompt jest trzecim, równoległym dokumentem – po Profilu Publicznym i Panelu Twórcy.
Katalog Twórców to strona odkrywania (discovery), która ma za zadanie prowadzić użytkownika (fana) do profilu twórcy. Jest to kluczowy element nawigacji i zwiększania zaangażowania. Musi być szybki, intuicyjny, dostępny i dobrze indeksowany (SEO).

Główne wyzwania:

· Obsługa dużej liczby twórców (setki/tysiące) z wydajnym filtrowaniem, wyszukiwaniem i paginacją.
· Responsywność: grid kart dostosowuje się do ekranu.
· SEO: każdy twórca musi mieć swoją stronę (SSG), ale sama lista może być generowana statycznie lub dynamicznie.
· Web3: możliwość wyświetlania “zweryfikowanych” twórców (badge) oraz liczników napiwków (social proof).

Struktura promptu:
Strategia → Layout → Komponenty (atomy/molekuły/organizmy) → Design system → Web3 → Inżynieria → Dostępność → Checklista.

---

SPIS TREŚCI

1. Cel strategiczny i kontekst biznesowy
2. Architektura informacji i układ (layout)
   · 2.1 Desktop – nagłówek + filtry + grid kart
   · 2.2 Mobile – linearyzacja, bottom sheet filtrów
3. Szczegółowa specyfikacja sekcji (atomy i molekuły)
   · 3.1 Nagłówek i wyszukiwarka
   · 3.2 Pasek filtrów (quick filters + zaawansowane)
   · 3.3 Siatka kart twórców (grid)
   · 3.4 Paginacja / infinite scroll
   · 3.5 Stany puste i błędy
4. Karta twórcy (molekuła) – szczegółowa specyfikacja
   · 4.1 Wygląd (avatar, nazwa, kategorie, metryki)
   · 4.2 Interakcje (hover, kliknięcie)
   · 4.3 Warianty (z badge’em Web3, z licznikiem napiwków)
5. System wizualny i design tokens (zgodny z Master Planem)
6. Komponenty Web3 w katalogu
   · 6.1 Badge weryfikacji (ENS / zweryfikowany twórca)
   · 6.2 Wyświetlanie łącznej kwoty napiwków (social proof)
7. Inżynieria techniczna (Next.js 15 App Router)
   · 7.1 Strategia renderowania (SSG + CSR dla filtrów)
   · 7.2 Obsługa filtrów przez query params (URL)
   · 7.3 Wirtualizacja (niepotrzebna, paginacja)
   · 7.4 Generowanie OG Image dla strony katalogu
8. Dostępność (WCAG 2.2) i ergonomia
9. Checklista implementacyjna (podział na atomy)

---

1. CEL STRATEGICZNY I KONTEKST BIZNESOWY

Katalog Twórców to główny punkt wejścia dla fanów, którzy nie znają jeszcze konkretnych twórców. Jego zadanie: umożliwić szybkie odkrycie interesujących profili i skierować użytkownika do profilu, gdzie dokona konwersji (napiwek/subskrypcja).

Metryki sukcesu:

· Czas wyszukania – użytkownik powinien znaleźć interesującego twórcę w < 3 kliknięcia.
· Współczynnik konwersji – kliknięcie w kartę → wejście na profil.
· SEO – strona katalogu (i poszczególne karty) powinny być indeksowane przez Google (frazy: “najlepsi twórcy Web3”, “wspieraj muzyków USDC”).

Dlaczego to ważne (z dokumentów):
89% użytkowników zmienia dostawcę ze względu na UX, a 68% porzuca niespójne interfejsy. Katalog musi być przejrzysty, szybki i spójny wizualnie z resztą platformy.

---

2. ARCHITEKTURA INFORMACJI I UKŁAD (LAYOUT)

2.1 Desktop (≥1024px) – nagłówek + filtry + grid kart

```
┌─────────────────────────────────────────────────────────────────┐
│                         NAGŁÓWEK (H1)                           │
│                   "Odkrywaj twórców na TipJar+"                 │
├─────────────────────────────────────────────────────────────────┤
│  WYSZUKIWARKA (pełna szerokość, z ikoną lupy)                  │
├─────────────────────────────────────────────────────────────────┤
│  SZYBKIE FILTRY (chipy): Wszyscy | Muzyka | Gaming | ...        │
├─────────────────────────────────────────────────────────────────┤
│  PASEK ZAAWANSOWANYCH FILTRÓW (rozwijany)                       │
│  - Sortowanie: Popularni | Nowi | Najaktywniejsi                 │
│  - Kategorie (dropdown)                                         │
│  - Język (dropdown)                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SIATKA KART (grid: 4 kolumny na desktop)                       │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                                   │
│  │    │ │    │ │    │ │    │                                   │
│  └────┘ └────┘ └────┘ └────┘                                   │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                                   │
│  │    │ │    │ │    │ │    │                                   │
│  └────┘ └────┘ └────┘ └────┘                                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  PAGINACJA (przyciski numeryczne)                               │
└─────────────────────────────────────────────────────────────────┘
```

Zasady:

· Nagłówek H1, pod nim wyszukiwarka (duże pole).
· Szybkie filtry (chipy) – najpopularniejsze kategorie.
· Rozwijany panel filtrów zaawansowanych (domyślnie zwinięty, aby nie zabierać miejsca).
· Siatka kart w układzie grid (nie masonry) – karty mają jednakową wysokość, co ułatwia skanowanie.
· Paginacja (numeryczna) – lepsza dla SEO i nawigacji niż infinite scroll.

2.2 Mobile (<640px) – linearyzacja, bottom sheet filtrów

```
┌─────────────────────────────────┐
│  NAGŁÓWEK H1                    │
├─────────────────────────────────┤
│  WYSZUKIWARKA                   │
├─────────────────────────────────┤
│  SZYBKIE FILTRY (chipy – scroll poziomy) │
├─────────────────────────────────┤
│  PRZYCISK "FILTRY" (z liczbą aktywnych) │
├─────────────────────────────────┤
│  SIATKA KART (2 kolumny)        │
│  ┌────┐ ┌────┐                 │
│  └────┘ └────┘                 │
│  ┌────┐ ┌────┐                 │
│  └────┘ └────┘                 │
├─────────────────────────────────┤
│  PAGINACJA (uproszczona: < 1 2 >)│
└─────────────────────────────────┘
```

· Szybkie filtry jako poziomy, przewijany pasek (overflow-x auto).
· Przycisk “Filtry” otwiera Bottom Sheet (zgodnie z breakpointem sm) z zaawansowanymi filtrami i sortowaniem.
· Siatka: 2 kolumny (karty są mniejsze).
· Paginacja: tylko “Poprzednia” i “Następna” (dla oszczędności miejsca).

---

3. SZCZEGÓŁOWA SPECYFIKACJA SEKCJI (ATOMY I MOLEKUŁY)

3.1 Nagłówek i wyszukiwarka

Atomy:

· H1 (Mukta Malar 600, --fs-h1, kolor --text-primary)
· SearchInput – pole tekstowe z ikoną lupy (po lewej) i przyciskiem kasowania (po prawej). Placeholder: “Szukaj twórcy, kategorii...”.
    Zachowanie: debounce 300ms, po wpisaniu – automatyczne filtrowanie (bez przeładowania strony, tylko client-side lub API).

3.2 Pasek filtrów (quick filters + zaawansowane)

Szybkie filtry (chipy):

· Lista 5-7 najpopularniejszych kategorii (np. Muzyka, Gaming, Edukacja, Sztuka, Sport, Technologia, Komedia).
· Aktywny chip: tło --gold-400, tekst --teal-800. Nieaktywny: tło przezroczyste, obrys --border-subtle.
· Po kliknięciu – filtrowanie.

Zaawansowane filtry (rozwijany panel na desktop, bottom sheet na mobile):

· Sortowanie: dropdown (Popularni (domyślnie), Nowi, Najaktywniejsi, Najwięcej napiwków).
· Kategorie (wielokrotny wybór): lista wszystkich kategorii z checkboxami.
· Język: dropdown (wszystkie języki, polski, angielski, hiszpański…).
· Zweryfikowani tylko: toggle/checkbox.
· Zasięg kwoty napiwków (opcjonalnie): suwak (min, max).
· Przyciski: “Zastosuj filtry” (złoty) i “Wyczyść wszystko” (secondary).

Wybór filtra – odzwierciedlenie w URL (query params):
Np. ?category=music&sort=popular&verified=true – umożliwia udostępnianie linków z filtrami.

3.3 Siatka kart twórców (grid)

Grid CSS:

```css
.creators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

· Na desktop (≥1024px): 4 kolumny (jeśli szerokość > 1200px, to 4; jeśli 1024-1200 to 3).
· Na tablecie (768-1024): 2-3 kolumny.
· Na mobile (640px): 2 kolumny, gap 16px.

Każda karta – osobna molekuła (opis w sekcji 4).

3.4 Paginacja / infinite scroll

Decyzja: Paginacja numeryczna (lepsza dla SEO, dostępności i przewidywalności).

Komponent Pagination:

· Wyświetla: « Poprzednia, 1, 2, 3, …, Ostatnia, Następna ».
· Aktywna strona – podświetlona na złoto.
· Na mobile: tylko « Poprzednia » i « Następna » + wskaźnik strony (np. “Strona 2 z 10”).

Alternatywnie (jeśli lista jest bardzo długa): infinite scroll z przyciskiem “Załaduj więcej” (zgodnie z preferencjami użytkownika). Jednak dla spójności z wymaganiami – paginacja.

3.5 Stany puste i błędy

· Brak wyników:
    Ilustracja (pusty słoik), tekst “Nie znaleźliśmy twórców spełniających kryteria. Spróbuj zmienić filtry.”, przycisk “Wyczyść filtry” (złoty).
· Błąd ładowania:
    Ikona błędu, tekst “Nie udało się załadować listy twórców. Sprawdź połączenie.”, przycisk “Spróbuj ponownie”.
· Ładowanie (skeleton):
    Wyświetlanie 4-8 szkieletowych kart z animacją shimmer (jak w profilu publicznym).

---

4. KARTA TWÓRCY (MOLEKUŁA) – SZCZEGÓŁOWA SPECYFIKACJA

4.1 Wygląd (karta)

Wymiary:

· Szerokość: min 240px, max 1fr (dostosowuje się do gridu).
· Wysokość: stała (ok. 320px) – nie masonry, aby zachować rytm.

Elementy karty (od góry do dołu):

1. Obszar obrazka / awatara – duży, okrągły awatar (96x96px) wyśrodkowany w górnej części karty. Tło awatara: gradient lub zdjęcie.
2. Nazwa twórcy – H4, Mukta Malar 600, --text-primary, max 2 linie.
3. Kategorie – 1-2 chipy (małe, border-radius 999px, tło --purple-300 opacity 0.2).
4. Opis (skrócony) – 2 linie, --fs-body-s, IBM Plex 400, --text-secondary.
5. Metryki społeczne – rząd ikon z liczbami:
   · Serce (liczba napiwków / fanów)
   · Worek monet (łączna kwota USDC)
   · Ewentualnie ikona weryfikacji (złoty check).
6. Przycisk “Zobacz profil” – secondary (purple outline), na dole karty.

Padding karty: 16px (wewnątrz). Tło --bg-surface-base, border-radius 16px, cień --shadow-1.

4.2 Interakcje (hover, kliknięcie)

· Hover (desktop):
  · Uniesienie translateY(-4px), cień --shadow-2.
  · Obramowanie karty (opcjonalnie) podświetla się na złoto (border: 1px solid --gold-400).
  · Przycisk “Zobacz profil” zmienia tło na --gold-400 (primary) – zachęca do kliknięcia.
· Kliknięcie (cała karta lub przycisk):
    Przekierowanie do /creator/[username]. Karta ma cursor: pointer.

4.3 Warianty (z badge’em Web3, z licznikiem napiwków)

· Badge weryfikacji: Jeśli twórca zweryfikowany (ENS lub KYC), w prawym górnym rogu karty (nad awatarem) pojawia się mała złota ikona checka.
· Badge “NFT Creator” – fioletowy znacznik, jeśli twórca mintował swoje NFT na platformie.
· Wyróżnienie (promoted): Możliwość wyróżnienia karty (płatne) – delikatne złote tło lub ramka gradientowa.

---

5. SYSTEM WIZUALNY I DESIGN TOKENS (ZGODNY Z MASTER PLANEM)

Identyczne tokeny jak w poprzednich promptach.
Dodatkowo dla karty:

· --card-border-radius: 16px
· --card-padding: 16px
· --card-shadow: var(--shadow-1)
· --card-hover-transform: translateY(-4px)
· --badge-size: 24px

Kolory akcentów:

· Dla kategorii: --purple-300 z opacity 0.15 (tło), --purple-300 (tekst).
· Dla metryk: ikony --gold-400, tekst --text-secondary.

---

6. KOMPONENTY WEB3 W KATALOGU

6.1 Badge weryfikacji (ENS / zweryfikowany twórca)

Atom: VerificationBadge – złota ikona checka (14x14px) z tooltipem “Zweryfikowany twórca”.
Pojawia się w karcie (obok nazwy) lub na awatarze.

6.2 Wyświetlanie łącznej kwoty napiwków (social proof)

Molekuła: CreatorStats – ikona worka monet + liczba (skrócona, np. “1.2k USDC”).
Dane pobierane z backendu (cache’owane). Zachęca do kliknięcia.

---

7. INŻYNIERIA TECHNICZNA (NEXT.JS 15 APP ROUTER)

7.1 Strategia renderowania (SSG + CSR dla filtrów)

Komponent Strategia Next.js API
Strona katalogu (lista twórców) SSG (Static Site Generation) generateStaticParams, ISR (revalidate: 3600)
Filtrowanie / sortowanie CSR (client-side) useRouter + useEffect na zmianę query params
Wyszukiwarka (autocomplete) CSR + debounce –

Dlaczego SSG dla listy?

· Katalog twórców zmienia się rzadko (nowi twórcy pojawiają się codziennie, ale nie co sekundę).
· ISR (revalidate co godzinę) zapewni świeżość bez przeciążania serwera.
· SEO: Google indeksuje statyczne strony z kartami twórców.

Filtrowanie po stronie klienta:

· Po załadowaniu strony (z danymi SSG) – wszystkie dane są w initialData.
· Filtry i sortowanie działają na tych danych (client-side).
· Jeśli liczba twórców jest bardzo duża (>5000), lepiej użyć API z filtrowaniem po stronie serwera (ale wtedy tracimy SSG). Kompromis: dla dużej skali – Server-side rendering (SSR) z cachingiem.

Przyjęte rozwiązanie dla MVP: SSG + client-side filtering (max 1000 twórców). W przyszłości – SSR.

7.2 Obsługa filtrów przez query params (URL)

· Po zmianie filtra (kategoria, sortowanie) – aktualizacja URL (router.push z shallow: true).
· Przy odświeżeniu strony – odczytanie parametrów i zastosowanie filtrów.
· Dzięki temu użytkownik może udostępnić link z konkretnym zestawem filtrów.

7.3 Wirtualizacja (niepotrzebna, paginacja)

Ponieważ używamy paginacji (20-30 kart na stronie), wirtualizacja nie jest wymagana.

7.4 Generowanie OG Image dla strony katalogu

· Strona /explore ma statyczny OG Image (np. logo TipJar+ i tekst “Odkrywaj twórców”).
· Można również generować dynamicznie (np. z mozaiką awatarów top twórców) – ale to opcjonalne.

---

8. DOSTĘPNOŚĆ (WCAG 2.2) I ERGONOMIA

· Kontrast: wszystkie teksty i ikony spełniają 4.5:1.
· Cele dotykowe: karty (klikalne) mają min. 44x44px (w praktyce cała karta jest klikalna).
· Focus: widoczny outline na kartach, przyciskach, polach wyszukiwania.
· Klawiatura: Tab przechodzi przez filtry, karty, paginację. Enter na karcie – przekierowanie.
· prefers-reduced-motion: wyłączenie animacji hover (uniesienie karty).

---

9. CHECKLISTA IMPLEMENTACYJNA (PODZIAŁ NA ATOMY)

Atomy (podstawowe)

· H1
· SearchInput (z debounce)
· ChipFilter (szybki filtr)
· AdvancedFiltersPanel (rozwijany)
· SortDropdown
· CategoryCheckboxGroup
· Pagination
· EmptyState (ilustracja + tekst)
· ErrorState
· SkeletonCard

Molekuły / Organizmy

· CreatorCard (avatar, nazwa, kategorie, opis, metryki, przycisk)
· CreatorsGrid (siatka kart)
· ExplorePage (cała strona)

Integracje techniczne

· Next.js 15 App Router: /app/explore/page.tsx
· generateStaticParams dla listy twórców (SSG)
· API endpoint /api/creators (jeśli SSR/CSR)
· Obsługa query params (useSearchParams)
· Responsywność (grid, breakpointy)
· SEO: meta title, description, OG Image

---

📌 PODSUMOWANIE

Ten prompt dostarcza atomowo szczegółowej specyfikacji Katalogu Twórców.
Zawiera:

· Strategię odkrywania i konwersji.
· Layout desktop/mobile z filtrami i paginacją.
· Specyfikację karty twórcy (warianty, interakcje).
· Design tokens zgodne z Master Planem.
· Web3 badge i social proof.
· Inżynierię Next.js (SSG + CSR, query params).
· Dostępność WCAG 2.2.
· Pełną checklistę implementacyjną.

