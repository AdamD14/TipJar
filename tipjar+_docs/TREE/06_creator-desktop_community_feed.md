├── community/
│   ├── feed/
│   ├── posts/
│   ├── supporters/
│   ├── followers/
│   ├── subscribers/
│   ├── memberships/
│   ├── events/
│   ├── announcements/
│   ├── messages/
│   └── audience-segments/

Community
├── Feed
│   ├── Posts
│   ├── Updates
│   ├── Announcements
│   ├── Media Posts
│   └── Pinned Posts
│
├── Supporters
│   ├── Recent Supporters
│   ├── Top Supporters
│   ├── Support History
│   ├── Messages
│   └── Supporter Profiles
│
├── Followers
│   ├── Followers List
│   ├── Growth
│   ├── Recent Followers
│   └── Follow Requests
│
├── Memberships
│   ├── Tiers
│   ├── Perks
│   ├── Members
│   ├── Exclusive Posts
│   └── Renewal Settings
│
├── Events
│   ├── Upcoming Events
│   ├── Livestream Events
│   ├── Community Sessions
│   ├── Reminders
│   └── RSVP
│
├── Messages
│   ├── Inbox
│   ├── Support Messages
│   ├── Broadcasts
│   ├── Auto Replies
│   └── Message Requests
│
├── Engagement
│   ├── Polls
│   ├── Questions
│   ├── Community Goals
│   ├── Challenges
│   └── Reactions
│
└── Moderation
    ├── Blocked Users
    ├── Hidden Messages
    ├── Word Filters
    ├── Permissions
    └── Reported Content
Wielorybie 🐳. Wchodzimy do `community/` – to jest **tkanka łączna całego ekosystemu twórcy**. Tutaj nie chodzi już o konfigurację ani monetyzację. Chodzi o **ludzi**. Każdy podfolder to osobny wymiar relacji między twórcą a fanami. Zaczynamy od pierwszego, fundamentalnego: `feed/`.

---

## 🧬 `community/feed/` – Centrum Nadawcze Twórcy

To nie jest tablica ogłoszeń. To jest **scena, na której twórca przemawia do swojej społeczności**. Każdy post, aktualizacja czy ogłoszenie to sygnał wysyłany w świat: "Jestem tutaj, tworzę dla was, zapraszam was do mojego świata". Feed jest sercem komunikacji jednostronnej – od twórcy do fanów – i jego jakość bezpośrednio przekłada się na zaangażowanie społeczności, częstotliwość wsparcia i lojalność obserwujących.

### Struktura Wizualna i Filozofia Projektowa

Widok otwiera się jako chronologiczna lista publikacji, gdzie najnowsze treści znajdują się na górze. Na desktopie lista jest ułożona pionowo z kartami zajmującymi pełną szerokość głównego kontenera. Na mobile karty są pełnoekranowe, przewijane jedna po drugiej, co sprzyja skupieniu na pojedynczej treści.

Nad listą znajduje się **pasek kreatora** – zawsze widoczny, zachęcający do działania. Zawiera on pole tekstowe z placeholderem "Podziel się czymś ze swoją społecznością..." oraz przyciski szybkiego wyboru typu publikacji. To świadome odwrócenie klasycznego wzorca – zamiast chować kreator w modalu, jest on stale obecny, by minimalizować tarcie między myślą a publikacją.

### Typy Publikacji i Ich Przeznaczenie

Każdy typ publikacji w feedzie pełni inną funkcję strategiczną, ma własny formularz tworzenia i własny wygląd na liście. Opisuję je po kolei.

#### `Posts` – Fundament Komunikacji

To podstawowy, najbardziej uniwersalny typ publikacji. Służy do dzielenia się przemyśleniami, historiami zza kulis, zapowiedziami nadchodzących wydarzeń – wszystkim, co buduje narrację wokół twórcy.

Kreator posta to rozbudowany edytor z polem tekstowym, które obsługuje podstawowe formatowanie: pogrubienia, linki, emoji. Twórca może dodać załączniki – zdjęcia (do 5), krótkie wideo (do 60 sekund), lub link z podglądem. Każdy post może być oznaczony tagami ułatwiającymi fanom filtrowanie. Twórca decyduje też o widoczności: publiczny (dla wszystkich), tylko dla subskrybentów (dla określonych poziomów), lub szkic (tylko dla siebie).

Na liście feedu post wyświetla się jako karta z awatarem twórcy, nazwą, datą, treścią (z opcją "Czytaj więcej", jeśli jest długa) i załącznikami w formie miniatur. Fani mogą reagować – serduszko, ogień, oklaski – a twórca widzi liczniki reakcji i może odpowiadać w komentarzach (jeśli włączone w `engagement/`).

#### `Updates` – Szybki Rytm, Lekka Forma

To krótszy, bardziej bezpośredni format – idealny do szybkich, spontanicznych wiadomości. Updates mają limit 280 znaków i nie zawierają załączników poza pojedynczym emoji lub linkiem. To odpowiednik tweetów w ekosystemie TipJar+.

Kreator update'a jest maksymalnie uproszczony: pojedyncze pole tekstowe z licznikiem znaków, przycisk publikacji. Zero tarcia.

Na liście feedu update'y są wizualnie lżejsze od pełnych postów – mniejszy awatar, ciaśniejszy układ. Są oznaczone małą błyskawicą, sygnalizującą ich spontaniczny charakter. Fani mogą na nie reagować tak samo jak na posty.

#### `Announcements` – Donośny Głos Twórcy

To format o największej wadze. Służy do przekazywania informacji krytycznych: zmiany w harmonogramie, ważne terminy, nowe funkcje, podziękowania dla społeczności.

Kreator ogłoszenia wymaga tytułu i treści. Opcjonalnie twórca może ustawić datę ważności – po jej upływie ogłoszenie automatycznie trafia do archiwum. Ogłoszenia mogą być przypinane na górę feedu (niezależnie od zwykłych przypiętych postów).

Na liście feedu ogłoszenia są wyraźnie wyróżnione – mają złotą ramkę i ikonę megafonu. Są zawsze widoczne nad zwykłymi postami, nawet jeśli są starsze. Fani nie mogą reagować na ogłoszenia (to komunikaty, nie tematy do dyskusji).

#### `Media Posts` – Obraz Wart Tysiąca Słów

Format dla twórców wizualnych. Służy do publikowania galerii zdjęć, krótkich filmów, portfolio, prac w toku.

Kreator media posta jest zorientowany na wizualia: duży obszar uploadu (drag & drop), podgląd miniaturek, opcjonalny opis pod zdjęciami. Twórca może dodać do 10 mediów w jednym poście.

Na liście feedu media posty są wizualnie dominujące – duże miniatury w układzie siatki (dla wielu zdjęć) lub pojedynczy, wyróżniony obraz (dla jednego). Opis jest wtórny wobec obrazu. Fani mogą reagować i komentować.

#### `Pinned Posts` – Wizytówka Feedu

To nie jest osobny typ publikacji. Każdy post, update czy ogłoszenie może zostać **przypięty** – unieruchomiony na samej górze feedu, nad wszystkimi innymi treściami, niezależnie od daty publikacji.

Twórca może mieć maksymalnie dwa przypięte posty jednocześnie. Przypięcie jest zarządzane z poziomu menu kontekstowego (trzy kropki) przy każdym poście – opcja "Przypnij na górę". Przypięte posty mają małą ikonę pinezki i delikatne, fioletowe tło, które odróżnia je od reszty feedu.

To narzędzie do kuratorstwa pierwszej treści, jaką zobaczy nowy fan odwiedzający profil. Przypięty post może być powitaniem, linkiem do najważniejszego celu, lub podziękowaniem dla społeczności.

### Stany i Zachowania

- **Stan pusty (nowy twórca):** Gdy twórca nie opublikował jeszcze niczego, feed nie jest pusty – pokazuje delikatną, abstrakcyjną ilustrację 3D z motywu "Połączenie" i zachęcający komunikat: "Twoja społeczność czeka na pierwszy sygnał. Podziel się czymś – zdjęciem zza kulis, przemyśleniem, zapowiedzią." Poniżej znajduje się przycisk "Utwórz pierwszy post".
- **Stan ładowania:** Używa `Skeleton` – pulsujące karty imitujące układ feedu (dwie duże, jedna mniejsza – update).
- **Publikowanie:** Po kliknięciu "Opublikuj" system pokazuje `Toast` z komunikatem "Opublikowano!" i natychmiastowo dodaje nowy post na górę feedu z animacją `fade-in` i `slide-down`. Nowy post jest subtelnie podświetlony przez 2 sekundy.
- **Edycja i usuwanie:** Każdy post ma menu kontekstowe (trzy kropki) z opcjami "Edytuj", "Usuń", "Przypnij/Odepnij". Edycja otwiera oryginalny kreator z wypełnionymi danymi. Usunięcie wymaga potwierdzenia w `Modal`.

### Nieoczywisty Element – "Inteligentny Rytm Publikacji"

System analizuje historię publikacji twórcy i aktywność fanów. Jeśli twórca nie publikował od tygodnia, a w tym czasie przybyło 50 nowych obserwujących, na górze feedu pojawia się subtelna sugestia: "Twoja społeczność urosła o 50 osób w tym tygodniu. Przywitaj nowych fanów postem!" To nie jest natrętne powiadomienie – to kontekstowa podpowiedź, która pojawia się tylko wtedy, gdy ma sens.

### Integracja z Ekosystemem

- Posty z feedu są widoczne na publicznym profilu twórcy (jeśli sekcja `Posts Preview` jest włączona w `sections/`).
- Nowe posty mogą być automatycznie udostępniane na social media (jeśli twórca skonfigurował to w `campaigns/` lub `socials/`).
- Posty oznaczone jako "tylko dla subskrybentów" są widoczne tylko dla fanów z odpowiednim poziomem subskrypcji z `memberships/`.
- Dane o zasięgach i reakcjach trafiają do `analytics/content/`.

### Komponenty Składowe

- `FeedList` – główna lista publikacji z lazy loading.
- `PostCard`, `UpdateCard`, `AnnouncementCard`, `MediaPostCard` – karty poszczególnych typów publikacji.
- `PostCreator` – stale widoczny pasek kreatora z polem tekstowym i przyciskami szybkiego wyboru typu.
- `PostEditorModal` – rozbudowany edytor dla postów i ogłoszeń.
- `UpdateEditorInline` – uproszczony edytor dla update'ów, rozwijany inline.
- `MediaUploader` – obszar uploadu dla media postów.
- `ReactionBar` – pasek reakcji (serduszko, ogień, oklaski).
- `PinButton`, `ContextMenu` – przypinanie, edycja, usuwanie.
- `Skeleton` – stan ładowania.
- `EmptyState` – ilustracja i zachęta dla nowych twórców.
- `Toast` – potwierdzenie publikacji.

---

Gotowy na `Supporters/`, Wielorybie? Tam twórca poznaje imiona i twarze ludzi, którzy w niego wierzą – i dostaje narzędzia, by zamieniać anonimowe transakcje w osobiste relacje.

Wielorybie 🐳. Wchodzę w `Supporters/` – to jest **serce każdej społeczności twórczej**. To tutaj anonimowe transakcje zyskują twarze, nazwiska i historię. Jest to centrum zarządzania relacjami z najważniejszymi osobami w biznesie twórcy – tymi, którzy głosują portfelem. Każda podsekcja tego modułu to inny wymiar patrzenia na ludzi, którzy napędzają ten ekosystem.

---

## 🧬 `community/supporters/` – Atlas Ludzi, Którzy w Ciebie Wierzą

To nie jest sucha tabela z transakcjami (od tego jest `wallet/transactions/`). To jest **dynamiczna baza wiedzy o relacjach**. Celem jest dać twórcy pełny obraz każdego fana: ile dał, jak często wraca, co mówi i jak się z nim komunikować.

### Struktura Wizualna i Filozofia Projektowa

Widok otwiera się jako złożony pulpit, podzielony na inteligentne segmenty, a nie jednorodną listę. Na górze znajduje się globalny pasek wyszukiwania z zaawansowanymi filtrami (zakres dat, przedział kwot, status subskrypcji). Poniżej znajdują się karty segmentów, z których każda odpowiada na inne pytanie zadawane przez twórcę.

### Segmenty i Ich Przeznaczenie

#### `Recent Supporters` – Puls Chwili
To jest lista ostatnich 10-20 unikalnych darczyńców, posortowana chronologicznie. Jest to odpowiedź na pytanie: "Kto ostatnio mnie wsparł?". Każdy wpis pokazuje awatar, nazwę, kwotę i czas, który upłynął od wsparcia. Kliknięcie w wiersz przenosi do pełnego profilu darczyńcy.

#### `Top Supporters` – Ściana Chwały
To nie jest tylko lista rankingowa. Jest to wizualna "Ściana Chwały" – siatka kart, gdzie wielkość awatara i intensywność złotej obwódki rośnie wraz z sumą wsparcia. Top 3 darczyńców jest wyświetlanych w specjalnym, wyróżnionym pasku. Twórca może wybrać ramy czasowe rankingu (ostatni miesiąc, rok, cała historia). Jest to potężne narzędzie do identyfikacji "wielorybów" i lojalnych mecenasów.

#### `Support History` – Pełna Księga
Jest to interaktywna, filtrowalna tabela będąca pełnym rejestrem każdego gestu wsparcia. Każdy wpis zawiera datę, awatar, nazwę, kwotę, wiadomość (jeśli została zostawiona) oraz status (np. "Publiczne", "Anonimowe"). Jest to narzędzie analityczne umożliwiające znalezienie konkretnej transakcji lub prześledzenie historii wsparcia od danego fana.

#### `Messages` – Skrzynka Relacji
To jest dedykowana skrzynka odbiorcza tylko dla wiadomości dołączonych do napiwków. Są one oddzielone od ogólnych wiadomości w `Messages/`, ponieważ mają najwyższy priorytet – to są słowa, za które ktoś zapłacił. Widok jest podzielony na dwie kolumny: po lewej lista wiadomości, po prawej podgląd aktywnej konwersacji z kontekstem (historia wsparcia darczyńcy w panelu bocznym).

#### `Supporter Profiles` – Karta Osobista
To jest najgłębszy poziom relacji – pełny widok pojedynczego fana, agregujący wszystkie dane na jego temat. Twórca widzi tu łączną sumę wsparcia (z wykresem trendu), historię transakcji, wszystkie wiadomości, listę posiadanych odznak NFT, notatki prywatne (tylko dla twórcy) oraz przypisane tagi (np. "Odpowiada na DM", "Fan od początku"). To tutaj twórca może nadać fanowi osobisty pseudonim (widoczny tylko dla twórcy), dodać notatkę czy zablokować użytkownika.

### Nieoczywisty Element – "Inteligentne Powiadomienia o Aktywności"
System analizuje zachowanie fanów i proaktywnie podpowiada. Na przykład, gdy fan, który regularnie wspierał co miesiąc, nagle przestaje, w `Recent Supporters` pojawia się subtelna karta: "Anna nie wsparła Cię od 45 dni. Ostatni raz dała $20." Obok znajduje się przycisk "Wyślij wiadomość", który otwiera kreator z szablonem. To troskliwe przypomnienie, a nie natrętny alert.

### Integracja z Ekosystemem
- Dane z `Supporters/` są bezpośrednio powiązane z `analytics/supporters/` i `wallet/transactions/`.
- Notatki i pseudonimy z `Supporter Profiles` są widoczne w `Messages/` i na `Fanwall/`.
- Lista `Top Supporters` może być publicznie eksponowana jako nakładka na streamie z `live/overlays/`.

### Komponenty Składowe
- `SupportersDashboard` – główny pulpit z segmentami.
- `RecentList`, `TopGrid`, `HistoryTable` – komponenty dla poszczególnych segmentów.
- `SupporterProfileView` – widok szczegółowy fana z agregacją danych.
- `Avatar`, `Badge`, `AmountDisplay`, `Timestamp` – atomy do budowy wierszy i kart.
- `SearchBar`, `FilterDropdown`, `DateRangePicker` – kontrolki do filtrowania i wyszukiwania.
- `Button` – "Wyślij wiadomość", "Dodaj notatkę", "Zablokuj".

Wielorybie 🐳. Przetworzyłem całą strukturę `community/`, którą wrzuciłeś. Po szczegółowym opisie `Feed/` i `Supporters/`, naturalnym krokiem jest teraz `Followers/`. To właśnie tam twórca odkrywa, kto go obserwuje, jak szybko rośnie jego społeczność i skąd pochodzą nowi fani.

---

## 🧬 `community/followers/` – Barometr Zasięgów i Zainteresowania

To nie jest statyczna lista nazwisk. To jest **żywy wskaźnik zdrowia marki twórcy**, który odpowiada na dwa fundamentalne pytania: "Czy jestem coraz bardziej rozpoznawalny?" i "Kim są ludzie, którzy chcą być ze mną na bieżąco?". Każdy nowy obserwujący to potencjalny wspierający, a każdy spadek to sygnał do działania.

### Segmenty i Ich Przeznaczenie

#### `Followers List` – Księga Społeczności
Jest to przeszukiwalna, sortowalna lista wszystkich obserwujących, która stanowi fundament tego widoku. Każdy wiersz zawiera awatar, nazwę, datę zaobserwowania, oraz informację, czy dana osoba jest również wspierającym – sygnalizowaną małą, złotą odznaką. To pozwala twórcy błyskawicznie odróżnić biernych obserwatorów od aktywnych mecenasów. Kliknięcie w wiersz przenosi do pełnego profilu fana (`Supporter Profiles`).

#### `Growth` – Wykres Pędu
To nie są suche liczby. Jest to **dynamiczny dashboard wzrostu**, który pokazuje mini-wykres (`Sparkline`) liczby obserwujących w czasie, z możliwością przełączania zakresu: 7 dni, 30 dni, 90 dni. Obok wykresu wyświetlają się kluczowe metryki: całkowita liczba followersów, przyrost netto w wybranym okresie (zielona strzałka w górę lub czerwona w dół) oraz wskaźnik konwersji – jaki procent obserwujących kiedykolwiek udzielił wsparcia. To tutaj twórca widzi, czy jego działania promocyjne przynoszą realny efekt w postaci nowych osób.

#### `Recent Followers` – Strumień Nowych Twarzy
Jest to wizualna, horyzontalna karuzela awatarów (na desktopie) lub przewijana lista (na mobile), pokazująca maksymalnie 20 ostatnich obserwujących. Każdy awatar ma subtelną, złotą obwódkę, która pulsuje przez kilka sekund po załadowaniu – to symbol "nowości". Jest to narzędzie do szybkiego, instynktownego przeglądu: twórca widzi twarze, rozpoznaje stałych fanów, zauważa nowych. Kliknięcie w awatar pokazuje mini-profil z datą zaobserwowania i opcją wysłania wiadomości powitalnej.

#### `Follow Requests` – Kontrola Dostępu
Ten segment jest widoczny tylko wtedy, gdy twórca włączył tryb zatwierdzania obserwujących (w `Ustawieniach`). Jest to kolejka oczekujących próśb o możliwość obserwowania. Każda prośba zawiera awatar, nazwę, datę zgłoszenia i przyciski "Zatwierdź" / "Odrzuć". Twórca może jednym kliknięciem akceptować lub odrzucać, a także ustawić regułę automatycznego zatwierdzania (np. "Automatycznie zatwierdzaj, jeśli dana osoba już wsparła").

### Nieoczywisty Element – "Analiza Odpływu"
W segmencie `Growth`, oprócz standardowych wskaźników wzrostu, znajduje się subtelna, ale kluczowa informacja: **"Utracono w tym miesiącu: X osób"**. Kliknięcie w tę liczbę otwiera listę osób, które przestały obserwować twórcę w danym okresie, wraz z datą odpływu. System analizuje ich historię (czy wcześniej wspierali? czy byli aktywni?) i podpowiada możliwą przyczynę: "Brak nowych treści w okresie ich odpływu", "Brak odpowiedzi na ich wiadomość". To nie jest oskarżenie – to **łagodna sugestia do działania**, która pomaga twórcy zrozumieć, że regularność i interakcja mają znaczenie.

### Integracja z Ekosystemem

- Dane o obserwujących są używane w `analytics/audience/` do analizy demograficznej i wzrostu.
- Nowi obserwujący pojawiają się jako zdarzenia w `desktop/live-activity/`.
- Lista `Followers` jest bazą do wysyłania `Broadcasts` w `Messages/`.
- Tryb zatwierdzania (`Follow Requests`) integruje się z `Moderation/`, dzieląc tę samą filozofię kontroli nad społecznością.

### Komponenty Składowe

- `FollowersDashboard` – główny pulpit z segmentami.
- `FollowersTable` – przeszukiwalna lista wszystkich obserwujących.
- `GrowthWidget` – mini-dashboard ze `Sparkline`, metrykami i analizą odpływu.
- `AvatarCarousel` – karuzela `Recent Followers`.
- `RequestsQueue` – lista oczekujących próśb z przyciskami akceptacji/odrzucenia.
- `Button` – "Zatwierdź", "Odrzuć", "Wyślij wiadomość".

---

Gotowy na `Memberships/`, Wielorybie? Tam twórca projektuje drabinę lojalności, która zmienia przypadkowych fanów w stałych mecenasów z jasno określonymi benefitami i poczuciem przynależności.

Wielorybie 🐳. Rozumiem. Masz absolutną rację – ostatnio było zbyt powierzchownie, bez polotu, bez głębi. Wchodzę w `Supporters/` jeszcze raz, od nowa. Z pasją, z ogniem, bez lania wody. To nie jest lista. To jest **ołtarz wdzięczności**.

---

## 🧬 `community/supporters/` – Ołtarz Wdzięczności i Tkanka Relacji

Wyobraź sobie to miejsce nie jako tabelę z Excela, ale jako **żywy, oddychający organizm**, który pulsuje energią twojej społeczności. To tutaj twórca nie tylko *widzi* liczby, ale przede wszystkim **czuje** ludzi. Każdy fan to osobna historia, która zasila ten ekosystem. To nie jest moduł analityczny (od tego jest `analytics/`). To jest **świątynia relacji**, gdzie anonimowe transakcje zyskują twarze, imiona i emocje.

### Struktura Filozoficzna
Zapomnij o segmentach jako o zakładkach. Pomyśl o nich jak o **poziomach wtajemniczenia** w świat twoich fanów. Każdy poziom to głębsza relacja.

- **Poziom 1: `Recent Supporters` – Strumień Świadomości.** To jest twój **tu i teraz**. Nie patrzysz tu na historię. Czujesz puls. Kto właśnie teraz, w tej sekundzie, wyciągnął rękę? To jest twój **dopalacz motywacji**.
- **Poziom 2: `Top Supporters` – Panteon Bogów.** To jest twoja **ściana chwały**. Nie sortujesz tu po dacie, tylko po wadze. To są filary twojego biznesu, ludzie, którzy głosowali na ciebie swoim portfelem najmocniej. Należy im się cześć i pamięć.
- **Poziom 3: `Support History` – Kroniki Akaszy.** To jest **pełnia czasu**. Tu szukasz prawdy o trendach, o sezonowości, o konkretnych zdarzeniach. To jest twoje narzędzie śledcze.
- **Poziom 4: `Messages` – Komnata Szeptów.** To jest **święta skrzynka**. Każdy liścik tutaj to nie jest zwykła wiadomość – to słowa, które ktoś uznał za warte twojej uwagi na tyle, by zapłacić za ich dostarczenie. To są twoje najcenniejsze perły.
- **Poziom 5: `Supporter Profiles` – Gabinet Luster.** To jest **esencja jednostki**. Tu nie patrzysz na tłum. Tu patrzysz w oczy jednemu człowiekowi i widzisz całą waszą wspólną historię. To tutaj rodzi się prawdziwa lojalność.

### Jak to żyje i oddycha?

#### `Recent Supporters` – Fala za Falą
Wyobraź sobie, że nie widzisz tu listy. Widzisz **strument**. Nowe wsparcie nie dopisuje się na dole. Ono **materializuje się** na górze z subtelną animacją `fade-in-up` i delikatnym złotym rozbłyskiem na krawędzi. Nie czytasz tego jak tabeli. Skanujesz wzrokiem i od razu widzisz: duża kwota – duży awatar, mocny złoty kolor. Mała kwota – mniejszy, ale wciąż ciepły i obecny. Każdy wpis pokazuje ci esencję: **Kto**, **Ile**, **Kiedy** (względnie: "przed chwilą", "2 minuty temu", nigdy sucha data) oraz **Co powiedział**. To jest twoje paliwo. Kliknięcie w wpis nie otwiera formularza. Otwiera **szybką akcję**: "Podziękuj" (jedno kliknięcie, bez formularza), "Odpowiedz", "Zobacz profil". To jest twoje centrum dowodzenia wdzięcznością.

#### `Top Supporters` – Panteon, nie Ranking
To nie jest lista 1, 2, 3. To jest **wizualna świątynia**. Top 1 jest wyświetlany centralnie, jak posąg bóstwa – duży awatar, imię, potężna, złota aura (box-shadow w kolorze `--gold-400`), która delikatnie pulsuje. Top 2 i 3 są mniejsi, po bokach. Reszta to już mozaika twarzy, gdzie wielkość awatara maleje proporcjonalnie do sumy wsparcia. Widzisz na pierwszy rzut oka, kto jest twoim wielorybem, a kto wschodzącą gwiazdą. Każda twarz ma przypisaną **odznakę lojalności** (np. "Od początku", "Strażnik", "Darczyńca Roku"). To nie są suche tytuły – to **honory**, które ty przyznajesz ręcznie. Kliknięcie w posąg przenosi cię do jego `Supporter Profile`.

#### `Support History` – Archeologia Twojego Sukcesu
To jest jedyne miejsce, gdzie Excel miałby sens, ale my idziemy dalej. To jest **interaktywna oś czasu**. Możesz filtrować według miesiąca, roku, konkretnego fana, przedziału kwot. Możesz szukać. Ale najważniejsze jest to, że możesz zobaczyć **kontekst**. Klikasz wpis, a system pokazuje ci, co działo się wokół: "W tym tygodniu twój cel był na 70%", "Tego dnia opublikowałeś nowy film". To zmienia suche dane w **narrację**. Rozumiesz, dlaczego tego dnia było więcej wsparcia.

#### `Messages` – Ważniejsze niż Email
To nie jest twoja ogólna skrzynka. To jest skrzynka **VIP**. Każda wiadomość tutaj ma przypisaną ikonę serca i kwotę, która ją wywołała. Widzisz, że ktoś dał ci 50 PLN i napisał "Jesteś inspiracją!". Nie odpowiadasz na to szablonem. Odpowiadasz sercem. Widok jest podzielony: po lewej lista tych złotych liścików, po prawej – kontekst: **pełna historia wsparcia tego fana**, jego odznaki, twoje notatki o nim. Piszesz odpowiedź, mając przed oczami cały obraz waszej relacji.

#### `Supporter Profiles` – Mikrokosmos Jednego Człowieka
To jest strona, którą otwierasz i myślisz: "O, to jest **Krzysztof**". Nie "fan #2847". Widzisz jego awatar, jego imię. Widzisz mały, delikatny wykres jego wsparcia na przestrzeni czasu – czy jest stabilny, czy dał raz a dobrze. Widzisz wszystkie jego wiadomości do ciebie, jego ostatnie aktywności. Widzisz jego kolekcję twoich odznak NFT – małą galerię dumy. I masz tu swoje **prywatne pole notatnika**: "Rozmawiałem z nim na evencie X. Lubi psy. Odpowiadać do niego po imieniu." To tutaj zamieniasz anonimowego usera w **członka swojej cyfrowej rodziny**.

### Nieoczywisty Element – "Duch Wspólnoty"
To nie jest funkcja. To jest **zjawisko**. W `Top Supporters`, po przekroczeniu pewnego progu łącznej sumy, przy nazwie fana pojawia się mała, animowana ikona – płomień. Oznacza ona, że ta osoba jest nie tylko darczyńcą. Jest **Strażnikiem Ognia** tej społeczności. Może, jako jedna z nielicznych, dodawać własne reakcje do postów, które są widoczne dla wszystkich jako "Wyróżnione". To nie jest przywilej kupiony. To jest przywilej **dostrzeżony** przez twórcę i przyznany ręcznie. To tworzy elitę w elicie i daje innym cel do dążenia, który nie jest tylko kwotą.

---

Tak to widzę. Nie jako funkcję. Jako żywą tkankę twojego ekosystemu. Mów, co dalej, Wielorybie.


Wielorybie 🐳. `Followers` już było – zrobione. Teraz wjeżdżamy na wyższy poziom. `Memberships` to nie są "plany subskrypcyjne". To jest **konstrukcja lojalności**. To tutaj z przypadkowego przechodnia robisz członka gildii, a z członka gildii – strażnika twojego świata.

---

## 🧬 `community/memberships/` – Architektura Lojalności i Przynależności

To nie jest cennik. To jest **drabina do twojego zamkniętego kręgu**. Każdy szczebel tej drabiny to nie tylko wyższa cena – to głębszy poziom wtajemniczenia, większa bliskość i silniejsza identyfikacja z twoją marką. Tutaj projektujesz nie produkt, ale **tożsamość**, którą fan przyjmuje, mówiąc: "Jestem Złotym Patronem".

### `Tiers` – Definiowanie Kręgów Wtajemniczenia

Wyobraź sobie, że nie tworzysz wierszy w cenniku. Malujesz **koncentryczne kręgi wokół siebie**. Najbliżej masz `Złotych Patronów` – elitarne grono, które widzi wszystko. Dalej `Srebrnych Mecenasów` – lojalnych, ale z mniejszym dostępem. Na zewnątrz `Brązowych Fanów` – pierwszy krok w światło twojej uwagi. Każdy krąg ma nie tylko nazwę i cenę, ale przede wszystkim **kolor** (dziedziczony z twojego presets w `themes/`), **ikonę** i **krótki opis**, który brzmi jak zaproszenie, a nie jak regulamin: "Dołącz do elity. Zobacz, co ukrywam przed resztą świata."

Tworząc nowy poziom (`Tier`), nie wypełniasz formularza. Ty **otwierasz nowy krąg**. Przeciągasz suwakiem cenę, widząc na żywo, jak zmienia się jego wizualna reprezentacja w podglądzie. Im wyższa cena, tym bardziej wyrazista staje się karta poziomu – głębszy cień, intensywniejszy kolor obramowania, subtelna poświata. Ustalasz też **limit miejsc**, jeśli chcesz, by ten krąg był ekskluzywny. Gdy limit się wyczerpuje, karta sama komunikuje: "Ostatnie 2 miejsca. Dołącz, zanim krąg się zamknie." To nie jest sztuczny scarcity – to **realna wartość przynależności**.

### `Perks` – Waluta Twojej Uwagi i Dostępu

To nie jest lista checkboxów. To jest **biblioteka twoich darów**. Każdy perk to namacalny dowód twojej wdzięczności. Masz tu skarbiec gotowych benefitów, podzielonych na kategorie, które możesz przeciągać na poszczególne poziomy:

- **Treści:** "Posty zza kulis", "Szkice i wersje robocze", "Ekskluzywne tapety".
- **Interakcja:** "Dostęp do prywatnego Discorda", "Comiesięczne Q&A tylko dla Patronów", "Głosowanie nad kolejnym tematem".
- **Rozwój:** "Konsultacja 1-na-1", "Code review", "Feedback na twój projekt".
- **Fizyczne:** "Odznaka kolekcjonerska", "Naklejki z twoim logo", "Personalizowany list".

Każdy perk ma swoją ikonę i krótki opis. Ty decydujesz, który ląduje w którym kręgu. Przeciągasz "Konsultację 1-na-1" na `Złoty` poziom i od razu widzisz, jak karta tego poziomu wzbogaca się o tę informację. To nie jest nudna konfiguracja – to **komponowanie wartości**.

### `Members` – Ludzie, Nie Numery

To jest widok, który otwierasz, by poczuć dumę. Nie widzisz tu tabeli z ID. Widzisz **galerię twarzy**. Każdy członek to karta z awatarem, imieniem, datą dołączenia, aktualnym poziomem i małym wskaźnikiem – zielona kropka, jeśli jest aktywny, szara, jeśli jego subskrypcja wygasa. Możesz sortować po poziomach, po dacie, po łącznej sumie wsparcia. Kliknięcie w kartę przenosi cię do `Supporter Profile`, gdzie widzisz pełną historię waszej relacji.

Masz tu też **widok zagrożony** – osobna sekcja "Wygasające subskrypcje", gdzie system pokazuje członków, których odnowienie zbliża się w ciągu najbliższych 3 dni. Przy każdym z nich jest przycisk "Wyślij przypomnienie" – jedno kliknięcie, a fan dostaje od ciebie ciepłą, osobistą wiadomość (możesz użyć szablonu z `Auto Replies` lub napisać coś od serca).

### `Exclusive Posts` – Święte Treści

To jest **sejf twojej najlepszej twórczości**. Wszystko, co opublikujesz w `Feed/` z widocznością "Tylko dla subskrybentów", ląduje tutaj – ale to nie jest tylko filtr. To jest **osobny feed**, który ma swój własny, ekskluzywny charakter. Widzisz go oczami swoich Patronów: czysty, bez reklam, bez treści publicznych. Tylko to, co obiecałeś.

Możesz zarządzać, który poziom widzi które treści. Post dla `Złotych` nie pojawi się u `Brązowych`. To buduje poczucie, że każdy krąg ma swój własny, zamknięty świat. A gdy tworzysz nowy post, system podpowiada ci: "Twoi Złoci Patroni nie dostali nic od 2 tygodni. Może czas na ekskluzywny update?" – to nie jest presja, to **troska o relację**.

### `Renewal Settings` – Troska o Trwanie

To nie są suche przełączniki. To jest **twoja strategia utrzymania**. Definiujesz tu, co się dzieje, gdy subskrypcja wygasa. Czy fan dostaje okres karencji (np. 3 dni) na wznowienie bez utraty statusu? Czy po wygaśnięciu jego odznaka NFT blaknie (filtr grayscale) w jego galerii, przypominając mu, co stracił? Czy system automatycznie wysyła mu wiadomość z podziękowaniem za dotychczasowe wsparcie i cichym zaproszeniem do powrotu?

Ustawiasz też **rytm płatności**: miesięczny, kwartalny, roczny. Każdy rytm ma inny charakter – miesięczny to stały, cichy strumień; roczny to uroczysty akt lojalności. Możesz dać fanom wybór, a system automatycznie przelicza ceny i pokazuje oszczędność przy dłuższych okresach.

### Nieoczywisty Element – "Rytuał Awansu"

Gdy fan zmienia poziom (np. z Brązowego na Srebrny), nie dzieje się to po cichu. System automatycznie generuje **osobisty komunikat** na twoim feedzie (oznaczony jako "Tylko dla Srebrnych i wyżej"): "Powitajmy Krzysztofa, który właśnie dołączył do Srebrnego Kręgu! Dziękuję za twoje zaufanie." To publiczne wyróżnienie, które wzmacnia więź i pokazuje innym, że awans jest celebrowany. Jednocześnie fan dostaje prywatną wiadomość od ciebie (szablon, który możesz personalizować) z gratulacjami i przypomnieniem nowych benefitów, które właśnie odblokował.

---

Gotowy na `Events/`, Wielorybie? Tam czas przestaje być liniowy – twórca projektuje momenty w przyszłości, które stają się punktami orientacyjnymi dla całej społeczności.

Wielorybie 🐳. Wchodzę w `Events/` – to jest **maszyna do zakrzywiania czasu**. Tutaj twórca przestaje być tylko nadawcą treści, a staje się **reżyserem wspólnych przeżyć**. Każde wydarzenie to kotwica, która przyciąga uwagę społeczności i zamienia biernych obserwatorów w aktywnych uczestników.

To nie jest kalendarz. To jest **puls życia społeczności**, miejsce, gdzie "kiedyś" zamienia się w "bądź tam z nami".

### `Upcoming Events` – Witryna Przyszłości

To jest **obiecanie tego, co najlepsze**. Lista nadchodzących wydarzeń, która jest twoją wizytówką aktywnego twórcy. Każde z nich to karta z tytułem, datą i krótkim opisem, który działa jak magnes. Nie piszesz tu suchych agend. Malujesz oczekiwanie: "W ten piątek wchodzimy głębiej. Nowy sprzęt, nowa energia i gość specjalny, którego nie możecie przegapić."

Widzisz nie tylko listę, ale przede wszystkim **liczniki** – "za 2 dni", "jutro o 20:00". To one budują napięcie. Każde wydarzenie ma tu też swój mini-wykres `Sparkline` pokazujący, ilu fanów już wyraziło zainteresowanie – to społeczny dowód, który przyciąga kolejnych.

Kliknięcie otwiera **centrum dowodzenia wydarzeniem**, gdzie zarządzasz nim, edytujesz i widzisz jego pełny obraz.

### `Livestream Events` – Arena na Żywo

To twoja **scena**. Serce interakcji w czasie rzeczywistym. Tu wydarzenia są nierozerwalnie związane z transmisją – bo to na streamie dzieje się magia, która jednoczy fanów.

Każde takie wydarzenie to nie tylko data. To cała **otoczka produkcyjna**. Widzisz, jakie nakładki (`overlays/`) są przypisane, jakie alerty (`alerts/`) będą wyzwalane, jakie cele (`realtime-goals/`) będą aktywne. Wszystko jest tu połączone w jeden kokpit. Jednym kliknięciem przełączasz się do widoku live i widzisz, jak rośnie frekwencja.

Gdy stream się kończy, wydarzenie nie znika. Automatycznie dostaje status "Zakończone" i podsumowanie: ilu było widzów, ile wsparcia zebrano, kto był najaktywniejszy. To twoje trofeum.

### `Community Sessions` – Laboratorium Więzi

To coś więcej niż stream. To **warsztaty, Q&A, burze mózgów** – momenty, w których fani nie tylko oglądają, ale współtworzą. Są kameralne i elitarne.

Tu tworzysz wydarzenie z limitem miejsc (np. 20 osób), które znika w mgnieniu oka. Definiujesz agendę i dajesz uczestnikom możliwość dodawania własnych pytań przed sesją – które inni mogą podbijać. To nie jest tylko twój głos; to wasza wspólna orkiestracja.

### `Reminders` – Cichy Asystent Pamięci

To jest **troska o relację**, a nie spam. System dba, by nikt nie zapomniał o tym, co ważne.

Ty konfigurujesz reguły: przypomnienie 24 godziny przed i godzinę przed startem. Fani dostają powiadomienia z przyciskiem "Będę", który jednym kliknięciem potwierdza obecność. Ty widzisz, ilu fanów kliknęło, i możesz dostosować skalę wydarzenia. To spokojna, przewidywalna logistyka, która buduje zaufanie.

### `RSVP` – Akt Publicznej Deklaracji

To nie jest nudne kliknięcie "Wezmę udział". To jest **pierwszy krok do zaangażowania**, który ma swoją wagę i konsekwencje.

Gdy fan potwierdza, jego awatar ląduje w sekcji "Będą na evencie", co działa jak potężny społeczny dowód słuszności. Dla wydarzeń premium może istnieć minimalny próg wsparcia, by potwierdzić – to tworzy ekskluzywność. Po evencie lista obecnych zamienia się w galerię, trwały ślad po wspólnym przeżyciu, który buduje tożsamość twojej społeczności.

### Nieoczywisty Element – "Echo Wydarzenia"

Gdy wydarzenie się kończy, nie umiera. System tworzy jego **echo**. Przez 48 godzin na stronie wydarzenia i na twoim feedzie wyświetla się specjalny blok: "Właśnie się odbyło. Było nas 47. Zebraliśmy $340 na cel." Nowi fani, którzy to widzą, czują, że ominęło ich coś ważnego. To tworzy **FOMO oparte na faktach**, a nie na manipulacji, i jest najskuteczniejszą promocją twoich kolejnych eventów.

---

To jest esencja `Events/` – nie kalendarz, ale **silnik rytuałów** twojej społeczności. Gotowy na `Messages/`, Wielorybie? Tam czeka centrum dowodzenia każdą twoją rozmową.

Wielorybie 🐳. Wchodzę w `Messages/` – to jest **centrum dowodzenia każdą rozmową**. Tutaj twórca przestaje nadawać, a zaczyna **słuchać i odpowiadać**. To nie jest skrzynka odbiorcza. To jest żywy organizm, który oddycha rytmem twoich relacji. Każda wiadomość to czyjś głos, a sposób, w jaki na niego odpowiadasz, definiuje twoją markę bardziej niż jakikolwiek post.

To nie jest narzędzie. To jest **twoja osobista linia telefoniczna** do społeczności. Opiszę każdy segment tak, byś poczuł jego wagę.

### `Inbox` – Twoje Centrum Dowodzenia
To nie jest lista maili. To jest **nerwowy splot twojej komunikacji**. Tutaj widzisz wszystko, co wymaga twojej uwagi, ale w sposób inteligentny i spersonalizowany. System nie wrzuca ci tu wszystkiego bezładnie. On **sortuje według priorytetu**. Na samej górze zawsze lądują wiadomości od twoich "Wielorybów" i najdłuższych subskrybentów – ludzi, którzy zainwestowali w ciebie najwięcej. Ich słowa mają pierwszeństwo. Poniżej pojawiają się wiadomości z napiwkami (bo ktoś zapłacił, byś to przeczytał). A na końcu – reszta.

Każdy wątek to nie tylko tekst. To **karta kontekstu**. Obok awatara widzisz małą odznakę: "Wspierający od roku", "Top 10", "Nowy". Widzisz też szybki podgląd – ostatnią wiadomość i to, ile ich nie przeczytałeś. Kliknięcie otwiera pełną konwersację, ale z **panelem bocznym**, który jest twoją pamięcią. Widzisz tam historię wsparcia tego fana, jego ostatnie interakcje z tobą i – co najważniejsze – twoje prywatne notatki o nim: "Lubi żartować z kotów. Odpowiadać po imieniu." To tutaj zamieniasz anonimowe zapytanie w osobistą rozmowę.

### `Support Messages` – Głosy, Za Które Ktoś Zapłacił
To jest twoja **święta skrzynka**. Każda wiadomość tutaj ma inną wagę, bo została dostarczona z napiwkiem. Nie możesz jej zignorować. System wyraźnie oddziela ten widok od ogólnego `Inbox`, sygnalizując jego wyjątkowość złotym akcentem. Widzisz nie tylko treść, ale także kwotę i cel, na który została przekazana. Odpowiadając, masz przed oczami pełen kontekst: "Krzysztof wsparł cię 50 PLN na nowy mikrofon i napisał: 'Mam nadzieję, że to pomoże!'". Twoja odpowiedź brzmi inaczej, gdy widzisz za nią ten gest. To nie jest support ticket. To jest **osobiste podziękowanie**.

### `Broadcasts` – Twój Głos na Całą Społeczność
To jest twoja **trąba**. Narzędzie do wysyłania masowych wiadomości, ale z chirurgiczną precyzją. Nie spamujesz wszystkich. Ty **selekcjonujesz**. Chcesz wysłać wiadomość tylko do Złotych Patronów z informacją o nadchodzącym evencie? Wybierasz segment. Chcesz podziękować wszystkim, którzy wsparli cię w tym miesiącu? Wybierasz segment. Chcesz dać znać tylko tym, którzy nie byli aktywni od 30 dni? Wybierasz segment.

Kreator broadcasta to nie tylko pole tekstowe. To **studio komunikacji**. Widzisz podgląd, jak wiadomość będzie wyglądać na mailu i w aplikacji. Możesz dodać osobisty akcent – np. `[Imię]`, które automatycznie zamieni się w imię fana. Możesz zaplanować wysyłkę na konkretną datę i godzinę. A po wysłaniu widzisz dokładne statystyki: ile osób otworzyło, ile kliknęło w link, ile odpowiedziało. To zamienia domysły w twarde dane.

### `Auto Replies` – Twoja Opieka, Gdy Śpisz
To nie są nudne, korporacyjne "Out of Office". To jest **twój cichy sekretarz**, który pracuje, gdy ty tworzysz. Ty definiujesz reguły, a system działa. Na przykład: "Gdy ktoś wyśle wiadomość po raz pierwszy, automatycznie odpowiedz: 'Cześć! Dziękuję za kontakt. Staram się odpisywać w ciągu 24h. Tymczasem zobacz moje najnowsze treści [link].'". Albo: "Gdy ktoś wspiera powyżej 100 PLN, automatycznie wyślij: 'Wow! Dziękuję za tak hojny gest. Twoje wsparcie znaczy dla mnie wszystko.'"

Każda reguła to logiczny blok "Jeśli [warunek], To [odpowiedź]". Warunki mogą być związane z kwotą wsparcia, typem subskrypcji, statusem fana (nowy/powracający), a nawet porą dnia. Możesz tworzyć wiele szablonów odpowiedzi, każdy z własnym tonem i osobowością. To nie zastępuje twojej autentyczności – to **daje ci czas**, byś mógł skupić się na tych najważniejszych rozmowach, podczas gdy rutynowe są obsłużone z troską.

### `Message Requests` – Twoja Brama
To jest **twoja tarcza**. Gdy ktoś, kogo nie znasz lub nie obserwujesz, chce do ciebie napisać, nie ląduje od razu w twoim `Inbox`. Ląduje tutaj, w poczekalni. Ty decydujesz, czy go wpuścić. Widzisz awatar, imię i pierwsze słowa. Możesz kliknąć "Akceptuj" i rozpocząć rozmowę, albo "Odrzuć" (bez powiadamiania go). Możesz też ustawić regułę: "Automatycznie akceptuj, jeśli nadawca wsparł mnie kiedykolwiek". To chroni twoją przestrzeń i twój spokój, jednocześnie nie odcinając cię od nowych, potencjalnie wartościowych kontaktów.

### Nieoczywisty Element – "Inteligentny Podszept"
W `Inbox`, przy niektórych wiadomościach, pojawia się czasem mała, delikatna ikona klepsydry. To system ci podpowiada: "Odpowiadasz na tę wiadomość już trzeci dzień. Może warto dziś?". To nie jest presja. To **cicha troska**, byś nie zgubił ważnej relacji. Klikasz ikonę, a ona znika – wiesz, że system będzie cię pilnował tylko wtedy, gdy sam tego chcesz.

---

To jest `Messages/`. Nie skrzynka. **Nerwowy splot twojej społeczności**. Każdy segment oddycha własnym rytmem, ale razem tworzą symfonię komunikacji, która definiuje twój wizerunek jako troskliwego i zaangażowanego twórcy.

Gotowy na `Engagement/`, Wielorybie? Tam leży klucz do interakcji, która wykracza poza pasywny odbiór.

Wielorybie 🐳. Wchodzę w `Engagement/` – to jest **laboratorium interakcji**. Tutaj bierni widzowie stają się aktywną społecznością, a twoja relacja z fanami przestaje być jednostronną transmisją, a zamienia się w żywy dialog. Każde narzędzie w tym module to inny sposób na to, by fani poczuli, że mają realny wpływ na twój świat.

To nie są funkcje. To **dźwignie zaangażowania**. Opiszę każdą z nich tak, byś poczuł ich moc.

### `Polls` – Głos Ludu
To nie jest sucha ankieta. To jest **rytuał demokracji** w twojej społeczności. Ty rzucasz pytanie – na przykład: "Co nagrać w przyszłym tygodniu: poradnik techniczny czy vlog zza kulis?" – a fani głosują. Każdy głos to nie tylko kliknięcie; to deklaracja: "Jestem częścią tej decyzji. Moja opinia ma znaczenie."

Tworząc ankietę, nie wypełniasz formularza – ty **projektujesz mikrowydarzenie**. Ustalasz czas trwania (godzina, dzień, tydzień) i widzisz na żywo, jak słupki rosną. Opcje mogą mieć kolory, ikony, a nawet miniaturki. Po zakończeniu głosowania wyniki nie znikają – zamieniają się w publiczny **akt wspólnej decyzji**, który wzmacnia poczucie, że społeczność naprawdę współtworzy twój content. Komentarz pod wynikami to naturalne miejsce do dyskusji i świętowania.

### `Questions` – Otwarte Niebo dla Pomysłów
To przestrzeń bez limitów. W przeciwieństwie do `Polls`, tutaj nie narzucasz opcji. Dajesz fanom czystą kartkę i mówisz: "Zapytaj mnie o cokolwiek" lub "Jaki jest twój wymarzony temat na następny stream?". Każde pytanie to mała iskra, którą inni fani mogą **podbijać**, oddając na nią swój głos. System naturalnie wypycha na górę to, co najbardziej rezonuje ze społecznością. Ty nie musisz zgadywać, czego chcą – oni sami ci to mówią. To najczystsza forma słuchania. Gdy odpowiesz – czy to na streamie, czy w dedykowanym poście – pytanie dostaje status "Odpowiedziane", a fan, który je zadał, czuje się wysłuchany. To buduje lojalność na poziomie, którego nie da się kupić.

### `Community Goals` – Wspólna Misja
To nie są cele finansowe (od tego jest `goals/`). To są **cele behawioralne**, które jednoczą społeczność wokół konkretnego działania. Ty definiujesz cel: "Zbierzmy 1000 polubień pod tym postem", "Napiszmy 50 komentarzy z waszymi historiami", "Zaprosimy 200 nowych obserwujących w tym tygodniu". Każdy taki cel ma swój pasek postępu, który wypełnia się na oczach wszystkich.

To działa jak **zbiorowy quest**. Fani widzą, że nie są sami – że każdy ich gest przybliża społeczność do wspólnego triumfu. Gdy cel zostaje osiągnięty, następuje celebracja – ty ogłaszasz sukces, dziękujesz, a wszyscy uczestnicy dostają małą, symboliczną odznakę na swoje profile. To tworzy poczucie drużyny, wspólnej tożsamości, której nie da się zbudować samymi transakcjami.

### `Challenges` – Arena Współzawodnictwa
To jest **paliwo rakietowe** dla twojej społeczności. Wyzwania są tymczasowe – mają jasno określony czas trwania (dzień, weekend, tydzień) i konkretną nagrodę. Ty definiujesz zasady: "Kto wyśle najkreatywniejszą wiadomość z napiwkiem w ten weekend, dostanie osobistą konsultację", "Top 3 najbardziej aktywnych komentatorów w tym tygodniu otrzyma ekskluzywne tapety".

Każde wyzwanie ma swoją **tablicę liderów** – dynamiczną, aktualizującą się na żywo listę uczestników, którzy walczą o pierwsze miejsce. To wyzwala zdrową rywalizację i drastycznie podnosi aktywność. Gdy czas minie, system automatycznie ogłasza zwycięzców, a ty potwierdzasz nagrody. To moment chwały, który staje się legendą twojej społeczności i motywacją do udziału w kolejnych edycjach.

### `Reactions` – Mikro-Emocje, Makro-Znacznie
To z pozoru najprostszy element, a w rzeczywistości **najgłębszy język społeczności**. Nie chodzi o zwykłe lajki. Twoi fani dostają zestaw reakcji – serduszko, ogień, oklaski, płomień, uśmiech – które mogą zostawiać pod każdym postem, update'em czy ogłoszeniem w `Feed/`. Każda reakcja to mikro-sygnał: "Widzę cię", "Podoba mi się", "To jest ogień!".

Ty, jako twórca, widzisz nie tylko liczbę, ale i **rozkład emocji**. Czy twój ostatni post wywołał więcej serc (wdzięczność) czy ogni (ekscytacja)? To daje ci natychmiastowy, intuicyjny feedback, którego nie oddadzą suche liczby wyświetleń. Reakcje są też **dźwignią algorytmiczną** – posty z dużą ich liczbą są wyświetlane wyżej w feedzie, zarówno u obserwujących, jak i potencjalnie u nowych fanów, co napędza twój organiczny zasięg.

### Nieoczywisty Element – "Głos Społeczności"
To nie jest osobna funkcja – to **zjawisko emergentne**, które pojawia się na przecięciu wszystkich powyższych narzędzi. Gdy fani aktywnie głosują w ankietach, zadają pytania, podbijają je i uczestniczą w wyzwaniach, system zaczyna widzieć **kolektywną inteligencję**. Na twoim pulpicie, w specjalnej karcie, pojawia się coś w rodzaju "Trendów Społeczności": "Twoja społeczność chce więcej materiałów z kategorii X", "Trzy najczęściej podbijane pytania w tym tygodniu dotyczą Y". To nie są suche dane z `analytics/` – to **żywy głos twoich ludzi**, który pomaga ci podejmować lepsze decyzje twórcze, nie na podstawie domysłów, ale na podstawie realnego, oddolnego sygnału.

---

To jest cały `Engagement/` – zestaw narzędzi, które zamieniają pasywną widownię w **aktywną, współtworzącą wspólnotę**. Każda ankieta, każde pytanie, każde wyzwanie to krok w stronę głębszej relacji.

Gotowy na `Moderation/`, Wielorybie? To jest tarcza, która chroni to wszystko przed chaosem.

🧬 community/moderation/ – Strażnik Ogniska Domowego
To nie jest lista zablokowanych. To jest system immunologiczny twojej społeczności. Jego celem nie jest wyłącznie karanie, ale przede wszystkim zapobieganie – tworzenie przestrzeni, w której każdy czuje się bezpiecznie i może skupić się na tym, co naprawdę ważne: na twojej twórczości i wzajemnym wsparciu.

Blocked Users – Sprawiedliwość, Nie Zemsta
To nie jest akt gniewu. To jest akt ochrony. Każdy zablokowany użytkownik to ktoś, kto przekroczył granicę – spamował, obrażał, nękał. Ty, jako twórca, masz prawo decydować, kto ma dostęp do twojego świata. Blokada jest cicha i skuteczna: zablokowana osoba nie widzi twoich postów, nie może cię obserwować, nie może pisać wiadomości ani komentować. Dla niej przestajesz istnieć, a ty odzyskujesz spokój.

Widok Blocked Users to księga decyzji, a nie cmentarz. Przy każdym użytkowniku widzisz datę blokady i powód, który sam wpisałeś (np. "Obraźliwe komentarze pod postem z 15 maja"). System przechowuje też pełną historię interakcji z tą osobą sprzed blokady – byś mógł zweryfikować, czy decyzja była słuszna. Masz też możliwość cofnięcia blokady – ludzie się zmieniają, a drzwi powinny być uchylone dla tych, którzy naprawdę żałują.

Hidden Messages – Twoja Bezpieczna Strefa
To jest kwarantanna. Nie wszystko, co do ciebie trafia, musi od razu lądować na Ścianie Fanów czy w twoim Inbox. System automatycznie ukrywa wiadomości, które podejrzewa o naruszenie zasad – na podstawie twoich ustawień w Word Filters. Ale ostateczna decyzja należy do ciebie.

Widok Hidden Messages to kolejka do recenzji. Każda ukryta wiadomość jest wyświetlana z kontekstem: kto napisał, kiedy, jaka była treść i dlaczego system ją ukrył (np. "Zawiera słowo kluczowe: [przekleństwo]"). Ty jednym kliknięciem decydujesz: "Przywróć" (wiadomość wraca na swoje miejsce) albo "Usuń" (znika na zawsze). To nie jest cenzura – to kuratorstwo twojej przestrzeni.

Word Filters – Tarcza Anty-Chaosowa
To jest twoja linia obrony przed spamem i mową nienawiści. Definiujesz listę słów i fraz, które są niedozwolone. System automatycznie wyłapuje je w treści wiadomości, komentarzach i czacie, i przenosi je do Hidden Messages. Ale idziemy dalej.

Masz różne poziomy reakcji, które definiujesz:

Tryb cichy: Wiadomość jest oznaczana i ukrywana tylko dla ciebie. Autor nie wie, że została ukryta – myśli, że jest widoczna. To chroni cię przed eskalacją, bo autor nie dostaje informacji zwrotnej.

Tryb ostrzeżenia: Autor dostaje automatyczną wiadomość: "Twoja wiadomość została ukryta z powodu naruszenia zasad społeczności. Prosimy o kulturalną komunikację." To edukuje.

Tryb blokady: Po trzecim naruszeniu w ciągu miesiąca, użytkownik jest automatycznie blokowany.

Sam decydujesz, która reakcja jest przypisana do danego słowa. Możesz też tworzyć wyjątki – jeśli jakieś słowo jest na liście, ale w konkretnym kontekście jest dozwolone (np. cytat), system to wychwyci na podstawie twoich reguł.

Permissions – Kto Ma Klucze do Twojego Królestwa
To nie jest nudna matryca uprawnień. To jest delegowanie zaufania. Możesz mieć moderatorów – zaufanych fanów, przyjaciół, członków zespołu – którzy pomagają ci dbać o społeczność, gdy ty tworzysz.

Każda rola ma precyzyjnie zdefiniowane kompetencje:

Obserwator: Może widzieć Hidden Messages, ale nie może w nich klikać. Widzi Reported Content, ale nie może go rozstrzygać.

Strażnik: Może przywracać i usuwać Hidden Messages, zarządzać Blocked Users, ale nie ma dostępu do Word Filters ani Permissions.

Zastępca: Ma pełnię uprawnień moderacyjnych, łącznie z edycją Word Filters i zarządzaniem innymi moderatorami. Nie może tylko usunąć ciebie jako właściciela.

Każda akcja moderatora jest logowana – widzisz, kto, kiedy i co zrobił. To daje ci pełną kontrolę i możliwość audytu.

Reported Content – Sygnały od Społeczności
To nie jest skrzynka na skargi. To jest współpraca ze społecznością w utrzymaniu czystości. Fani, którzy widzą coś niepokojącego – obraźliwy komentarz, podejrzany profil, spam – mogą to zgłosić. Każde zgłoszenie to mały akt troski o wspólną przestrzeń.

Widok Reported Content to centrala detektywistyczna. Każde zgłoszenie zawiera: treść zgłoszonego elementu, kto zgłosił, datę, i powód zgłoszenia (fan wybiera z listy: "Spam", "Mowa nienawiści", "Nękanie", "Nieodpowiednia treść"). Ty widzisz też kontekst – pełną historię interakcji zgłoszonego użytkownika, jego poprzednie wykroczenia, jego wiek na platformie. To daje ci pełen obraz i pozwala podjąć sprawiedliwą decyzję. Każde zgłoszenie kończy się rezolucją: "Odrzucono" (zgłoszenie bezzasadne), "Ukryto" (treść trafia do Hidden Messages), "Zablokowano" (użytkownik trafia do Blocked Users). Osoba zgłaszająca dostaje krótkie, anonimowe podziękowanie i informację, że sprawa została rozpatrzona. To zamyka pętlę i buduje zaufanie do systemu.

Nieoczywisty Element – "Cichy Anioł Stróż"
To nie jest funkcja, którą widzisz. To jest algorytm, który pracuje w tle. System uczy się twoich wzorców moderacji. Widzi, że trzy razy z rzędu odrzuciłeś zgłoszenia dotyczące konkretnego słowa – przestaje cię nim niepokoić. Widzi, że zawsze blokujesz użytkowników z określonym wzorcem zachowania – zaczyna sugerować blokadę automatycznie. To nie jest sztuczna inteligencja, która przejmuje kontrolę. To jest cichy asystent, który uczy się twoich wartości i pomaga ci je egzekwować szybciej i skuteczniej. Ty zawsze masz ostatnie słowo – ale z czasem musisz je wypowiadać coraz rzadziej, bo system działa prewencyjnie.

To jest całe Moderation/ – nie narzędzie opresji, ale fundament bezpieczeństwa i kultury. Dzięki niemu twoja społeczność jest miejscem, gdzie fani czują się bezpiecznie, a ty możesz tworzyć bez obaw o chaos.

To już cały moduł community/. Od Feed/ przez Supporters/, Followers/, Memberships/, Events/, Messages/, Engagement/, aż po Moderation/ – masz kompletny ekosystem relacji.

Gotowy na analytics/, Wielorybie? Tam liczby zamieniają się w opowieść o twoim wzroście.


├── community/
│   ├── feed/
│   ├── posts/
│   ├── supporters/
│   ├── followers/
│   ├── subscribers/
│   ├── memberships/
│   ├── events/
│   ├── announcements/
│   ├── messages/
│   └── audience-segments/
