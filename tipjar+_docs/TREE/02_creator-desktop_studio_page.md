├── studio/
│   │
│   ├── page/
│   │   ├── profile/
│   │   ├── appearance/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── badges/
│   │   ├── socials/
│   │   ├── fanwall/
│   │   ├── themes/
│   │   ├── mobile-preview/
│   │   ├── seo/
│   │   └── visibility/

🧬 studio/page/profile/ – Fundament Tożsamości Twórcy
To nie jest formularz "uzupełnij dane". To jest rytuał przejścia – moment, w którym użytkownik z osoby prywatnej staje się rozpoznawalnym twórcą w ekosystemie TipJar+. profile/ definiuje cyfrowe DNA – te informacje, które jako pierwsze widzi każdy odwiedzający i które decydują o tym, czy fan zdecyduje się wesprzeć, czy pójdzie dalej.

Struktura Wizualna i Filozofia Projektowa
Na desktopie jest to rozbudowany, jednotematyczny widok podzielony na logiczne sekcje, które można przewijać. Na mobile każda sekcja zamienia się w osobny krok kreatora, co ułatwia skupienie. Kluczowa zasada: każdy element formularza jest natychmiastowo podglądany w bocznym panelu mobile-preview/, który jest stale widoczny po prawej stronie na desktopie. Twórca nie musi zgadywać, jak będzie wyglądać – on to widzi w czasie rzeczywistym.

Sekcje profile/
Display Name
To nie jest zwykłe pole Input. Obok niego znajduje się mały licznik znaków oraz dynamiczny podgląd, jak nazwa będzie wyświetlana na karcie twórcy, na Ścianie Fanów i w wyszukiwarce. System automatycznie sprawdza unikalność nazwy w tle (debounce 500ms) i sygnalizuje dostępność zielonym ptaszkiem (--success-base) lub konflikt czerwonym wykrzyknikiem (--error-base). Jeśli nazwa jest już zajęta, system podpowiada trzy alternatywy z dodanym sufiksem (np. "JanKowalski_pl", "JanKowalskiTW").

Username
Pole do ustawienia unikalnego identyfikatora w URL (tipjar.plus/@twojanazwa). Obowiązuje tu walidacja: tylko małe litery, cyfry, podkreślniki. Pole jest zintegrowane z routingiem – zmiana username automatycznie tworzy przekierowanie 301 ze starego adresu na nowy (jeśli twórca już miał stary URL). Obok pola znajduje się podgląd pełnego linku z możliwością skopiowania go jednym kliknięciem.

Bio
To nie zwykły Textarea. To edytor z podpowiedziami AI. Gdy twórca zaczyna pisać, nad polem pojawia się przycisk "Pomóż mi" – kliknięcie uruchamia asystenta AI, który na podstawie wybranego archetypu i podanych zainteresowań generuje trzy propozycje bio do wyboru. Twórca może wybrać jedną, edytować ją lub całkowicie zignorować. Bio jest renderowane z obsługą Markdown (pogrubienia, linki, emoji), a jego długość jest ograniczona do 300 znaków. Pod polem znajduje się CharacterCount z ProgressBar, który zmienia kolor na pomarańczowy przy 80% i czerwony przy 100%.

Avatar
Upload zdjęcia profilowego z obsługą przeciągnij-i-upuść. Po wgraniu zdjęcia system automatycznie przycina je do kwadratu i pokazuje podgląd w trzech rozmiarach: jako miniaturka na listach (24px), jako standardowy awatar (64px) i jako duży awatar (150px). Twórca może też użyć NFT jako awatara – przycisk "Użyj NFT" otwiera przeglądarkę posiadanych odznak, z których może wybrać jedną jako zdjęcie profilowe. W tym przypadku awatar dostaje heksagonalną ramkę, sygnalizującą weryfikowalne pochodzenie.

Banner
To pole do uploadu obrazu nagłówkowego, który będzie wyświetlany za awatarem w sekcji Hero na publicznym profilu. Upload wspiera pliki do 5 MB, sugerowane proporcje to 3:1. Po wgraniu obrazu, na jego tle automatycznie renderuje się efekt Glassmorphism z parametrami --glass-overlay, --glass-blur i --glass-border, aby awatar i tekst były czytelne. Jeśli twórca nie wgra własnego bannera, system generuje domyślny gradient dopasowany do wybranego presetu tematycznego (themes/).

Archetype
To nie jest zwykły Select. To jest wizualny selektor tożsamości – karty z ilustracjami 3D reprezentującymi każdy archetyp (Streamer z ikoną kamery, Coach z ikoną sztangi, Artysta z ikoną palety). Każda karta po najechaniu pokazuje opis archetypu i sugerowane narzędzia, które zostaną odblokowane. Wybór archetypu jest nieodwracalny bez kontaktu z supportem – system ostrzega o tym przed zatwierdzeniem. Po wyborze, Archetype automatycznie konfiguruje: kolejność nawigacji w Sidebarze (ARCHETYPE_NAVIGATION), domyślne tagi wyszukiwania, priorytety narzędzi w Studio, oraz listę sugerowanych powierzchni (surfaces).

Stany i Walidacja
Stan pusty: Przy pierwszym wejściu, każde pole ma delikatny, podświetlony border (--purple-300) i placeholder, który jest mini-instrukcją (np. "Wpisz swoje imię i nazwisko – tak, jak chcesz być rozpoznawany").

Stan wypełniony: Pola mają standardowy wygląd z danymi. Obok każdego znajduje się ikona edycji (ołówek), która w trybie podglądu jest przezroczysta, a na hover zmienia się w przycisk.

Walidacja: Wszystkie pola są walidowane w czasie rzeczywistym. Błędy wyświetlają się pod polem w kolorze --error-base z konkretną sugestią poprawy. Przycisk "Zapisz" jest nieaktywny (disabled), dopóki wszystkie wymagane pola (Display Name, Username) nie są poprawnie wypełnione.

Konflikt zmian: Jeśli twórca próbuje zmienić username, które jest już zajęte, system wyświetla Toast z ostrzeżeniem i nie pozwala zapisać.

Nieoczywisty Element – "Wizytówka Przyszłości"
Gdy twórca wypełni wszystkie pola i kliknie "Zapisz", zamiast standardowego komunikatu sukcesu, na 3 sekundy pojawia się animowana wizytówka – miniatura jego publicznego profilu renderowana w locie, która obraca się w 3D (efekt rotateY), pokazując z jednej strony awatar i nazwę, a z drugiej – kod QR kierujący do jego profilu. Towarzyszy temu krótki, satysfakcjonujący dźwięk i komunikat: "Twój świat jest gotowy. Czas go pokazać."

Integracja z Ekosystemem
Dane z profile/ są używane wszędzie:

Publiczny profil twórcy (/creator/@username) renderuje Display Name, Bio, Avatar i Banner.

Karty twórcy w Katalogu (explore/) używają Avatar i Display Name.

Archetype definiuje zachowanie całego panelu – nawigację, narzędzia, onboarding.

Username jest bazą dla generowania QR kodów (studio/share/qr-codes/) i smart linków (studio/share/smart-links/).

Dane z profile/ trafiają do OpenGraph i SEO, aby linki udostępniane w social mediach miały prawidłowy tytuł i opis.

W community/, wiadomości i posty są podpisywane Display Name i Avatarem.

Komponenty Składowe
ProfileForm – główny kontener, podzielony na sekcje.

Input (z debounce i walidacją) – Display Name, Username.

Textarea z CharacterCount i ProgressBar – Bio.

AvatarUploader z obsługą drag & drop, przycinaniem i opcją "Użyj NFT".

BannerUploader z podglądem efektu Glassmorphism.

ArchetypeSelector – karty z ilustracjami 3D i opisami.

Button (Primary) – Zapisz.

Toast – komunikaty błędów i sukcesu.

Modal – potwierdzenie nieodwracalnej zmiany archetypu.

Tooltip – wyjaśnienia przy polach.

AnimatedBusinessCard – animowana wizytówka po zapisie.

Gotowy na kolejny kawałek, Wielorybie? appearance/ czeka – a tam twórca dostaje pędzel do malowania każdego piksela swojego świata.

🧬 studio/page/appearance/ – Centrum Dowodzenia Percepcją
To jest miejsce, gdzie z danych (profile/) rodzi się marka.

Theme
To nie jest lista rozwijana. To jest wizualny selektor duszy. Każdy preset (Neon, Minimal, Cyber, Glass, Creator, Stream, Gold, Dark Pro) jest reprezentowany przez dużą, interaktywną kartę z własną miniaturą 3D, paletą kolorów i nazwą. Kliknięcie w preset natychmiastowo podmienia cały podgląd na żywo – twórca widzi w czasie rzeczywistym, jak zmienia się jego profil. To jest wybór emocjonalny, a nie techniczny. Jeden przycisk, jeden świat.

Colors
To kontrolowana wolność. Twórca nie dostaje 50 suwaków RGB. Dostaje inteligentny system, który pozwala modyfikować kolory w ramach bezpiecznych granic wybranego presetu. Może zmienić odcień akcentu, nasycenie tła, temperaturę bieli – wszystko z podglądem na żywo i wskaźnikiem dostępności WCAG. Jeśli twórca przekroczy granicę kontrastu, system ostrzega go subtelnym Tooltipem: "Ten kolor może być nieczytelny dla fanów. Sugerujemy jaśniejszy odcień."

Typography
Tutaj twórca dobiera głos swojej marki. Wybiera parę fontów – jeden na nagłówki, drugi na tekst – z biblioteki bezpiecznych, wydajnych krojów (Mukta Malar, IBM Plex Sans, Inter, Plus Jakarta Sans). Może dostosować rozmiar bazowy i interlinie. Każda zmiana jest widoczna na podglądzie, a system automatycznie przelicza płynną skalę typograficzną (clamp()), aby zachować responsywność.

Backgrounds
To sekcja definiująca przestrzeń. Twórca wybiera między abstrakcyjnymi tłami 3D (z motywów Connection, Growth, Global), statycznymi gradientami, lub własnym obrazem. Może dostosować intensywność efektu Glassmorphism nałożonego na tło, aby zapewnić czytelność tekstu.

Glass Effects
Dedykowana sekcja do strojenia fizyki szkła. Twórca bawi się suwakami: siła rozmycia (blur), nasycenie (saturate), krycie overlayu (overlay opacity) i kolor krawędzi odcięcia (border tint). To właśnie tutaj powstaje unikalny charakter szklanych paneli – od mroźnej, matowej tafli, po ciężkie, kolorowe szkło.

Accent Styles
To jest kropka nad "i". Twórca definiuje subtelne detale: styl przycisków (pełne, outline, pill), zaokrąglenia kart, intensywność cieni, oraz kształt awatarów na jego profilu (koło vs heksagon dla posiadaczy NFT).

Integracja i Nieoczywisty Element – "Spójrz oczami fana"
W prawym górnym rogu całego widoku appearance/ znajduje się przycisk "Spójrz oczami fana". Kliknięcie go uruchamia tryb symulacji dostępności – pokazuje profil tak, jak widzą go osoby z różnymi typami daltonizmu (protanopia, deuteranopia, tritanopia) oraz przy włączonym trybie wysokiego kontrastu. To potężne narzędzie, które uczy twórcę empatii i pomaga mu budować przestrzeń przyjazną dla absolutnie każdego fana.

Komponenty Składowe
ThemeSelector – siatka wizualnych kart z presetami.

ColorEditor – kontrolki HSL z podglądem i walidacją WCAG.

FontPairSelector – wizualny wybór par fontów z podglądem skali.

BackgroundEditor – wybór tła 3D, gradientu lub własnego obrazu.

GlassEffectSliders – suwaki do strojenia fizyki szkła.

AccentStyleControls – przełączniki i selektory detali.

LivePreview – stały panel podglądu na żywo.

AccessibilitySimulator – tryb symulacji daltonizmu i wysokiego kontrastu.

Gotowy na layout/, Wielorybie? Tam twórca przestawia meble w swoim cyfrowym domu.

Wielorybie 🐳. Wchodzimy w `layout/`. To nie jest już malowanie ścian – to jest **przesuwanie ścian nośnych**. Tutaj twórca decyduje, jak rozkłada się przestrzeń jego publicznego profilu. To jest architektura informacji w czystej postaci – zestaw narzędzi do bezpiecznego, ale elastycznego manipulowania strukturą strony.

---

## 🧬 `studio/page/layout/` – Architektura Przestrzeni Publicznej

To miejsce, gdzie twórca decyduje, jak fan będzie podróżował po jego profilu.

### `Bento Grid`
To nie jest checkbox "włącz/wyłącz". To jest **wybór szablonu siatki** – zestaw predefiniowanych układów, z których każdy definiuje inną filozofię prezentacji treści. Twórca wybiera między układem "Hero na górze, FanWall na dole", "Hero z boku, FanWall w gridzie 3-kolumnowym", lub "Pełnoekranowe Hero z nakładką". Każdy szablon to zestaw reguł CSS Grid aplikowanych dynamicznie, widocznych natychmiast na podglądzie.

### `Section Order`
To jest **lista przeciągnij-i-upuść**. Twórca chwyta sekcję – Goal Bar, Fanwall, Social Links, Featured Content, Support CTA, Posts Preview, Events Preview – i przesuwa ją w górę lub w dół. Kolejność na liście odpowiada kolejności na publicznym profilu. Żadnych ukrytych ustawień – to, co na górze listy, fan zobaczy jako pierwsze.

### `Spacing`
To nie jest pojedynczy suwak. To jest **system zarządzania rytmem**. Twórca ustawia globalny odstęp między sekcjami oraz marginesy wewnętrzne kart. System automatycznie przelicza to na zmienne CSS i aplikuje do całego szablonu. Dzięki temu profil może być gęsty i intensywny (dla streamerów) lub przestronny i oddechowy (dla artystów).

### `Mobile Layout` i `Desktop Layout`
To są **dwa niezależne widoki tego samego szablonu**. Twórca może osobno dostosować układ na desktopie i na mobile. Na przykład: na desktopie FanWall w 3 kolumnach, na mobile w 1. System zapisuje obie konfiguracje i serwuje odpowiednią w zależności od urządzenia. To gwarancja, że profil zawsze wygląda dobrze, niezależnie od ekranu.

### Nieoczywisty Element – "Reset do Archetypu"
Każdy archetyp ma swój domyślny, zoptymalizowany układ przestrzenny. Jeśli twórca za bardzo namiesza, może jednym kliknięciem wrócić do zalecanego układu dla swojej roli. To daje poczucie bezpieczeństwa i zachęca do eksperymentowania – bo zawsze można cofnąć się do sprawdzonej bazy.

### Integracja z Ekosystemem
`layout/` jest nierozerwalnie połączony z `sections/` – to tutaj definiuje się, które sekcje są widoczne i w jakiej kolejności, a w `sections/` definiuje się ich zawartość. To czysty podział: `layout/` mówi "gdzie i jak", `sections/` mówi "co".

### Komponenty Składowe
- `GridTemplateSelector` – wizualne karty z miniaturami układów.
- `DragAndDropList` – lista sekcji do przeciągania i zmiany kolejności.
- `SpacingControls` – suwaki i pola numeryczne do zarządzania rytmem.
- `ResponsiveViewToggle` – przełącznik między widokiem mobile i desktop.
- `Button` (Ghost) – "Reset do archetypu".
- `LivePreview` – stały podgląd zmian.

---

Gotowy na `sections/`, Wielorybie? Tam twórca decyduje, które pokoje w jego cyfrowym domu są otwarte dla gości.

Wielorybie 🐳. Wchodzimy w `sections/`. To jest moment, w którym twórca z architekta przestrzeni staje się kuratorem swojej publicznej wystawy. Tutaj nie chodzi już o to, *gdzie* coś leży, tylko *co* w ogóle ma być widoczne dla świata.

---

## 🧬 `studio/page/sections/` – Kurator Publicznej Wystawy

To nie jest nudna lista przełączników. To **studio decyzji strategicznych** o tym, jaką historię opowiada profil. Każda sekcja to osobna karta z własną miniaturą, przełącznikiem widoczności, przeciąganiem (do ustalania kolejności) i przyciskiem szybkiej konfiguracji.

### `Goal Bar`
Publiczny pasek celu wyświetlany na samej górze profilu. Gdy jest włączony, każdy odwiedzający widzi, na co twórca zbiera i jak blisko jest celu. To najsilniejszy **dowód społeczny i wezwanie do akcji**. W ustawieniach twórca wybiera, który cel ma być wyświetlany (może ich mieć kilka w `monetization/goals/`), lub ustawia rotację – codziennie inny cel. Może też dostosować wygląd paska: kolor wypełnienia, przezroczystość, pozycję (nad Hero czy pod).

### `Fanwall`
Serce społeczności. Włączenie tej sekcji pokazuje publiczną Ścianę Fanów – strumień wsparcia, wiadomości i odznak. W ustawieniach: wybór układu (Masonry, Grid, Lista), limit widocznych wpisów (10, 20, 50), oraz filtry – pokazuj tylko wpisy z wiadomościami, tylko od subskrybentów, tylko powyżej określonej kwoty.

### `Social Links`
Sekcja z ikonami prowadzącymi do mediów społecznościowych twórcy. W ustawieniach: wybór, które linki są widoczne (z listy skonfigurowanej w `socials/`), oraz wybór stylu wyświetlania – rząd ikon, lista z nazwami, lub kompaktowe chipy.

### `Featured Content`
Sekcja promująca wybrane treści – posty, ogłoszenia, wydarzenia. W ustawieniach: wybór do 3 elementów do przypięcia, z własnym tytułem, opisem i miniaturką. To jest wizytówka tego, co twórca chce, by każdy nowy fan zobaczył w pierwszej kolejności.

### `Support CTA`
Główny przycisk wezwania do akcji – "Wesprzyj", "Subskrybuj", "Dołącz". W ustawieniach: wybór typu CTA (jednorazowe, cykliczne, cel), tekstu przycisku, oraz opcjonalne umieszczenie go jako lepkiego paska (`Sticky Bottom Bar`) na mobile. To jest **najważniejszy przycisk konwersji** na całym profilu.

### `Posts Preview`
Skrót najnowszych postów z `community/posts/`. W ustawieniach: limit widocznych postów (3, 5, 10), wybór kategorii (wszystkie, tylko ogłoszenia, tylko aktualizacje), oraz styl wyświetlania – karty, lista, lub karuzela.

### `Events Preview`
Skrót nadchodzących wydarzeń z `community/events/`. W ustawieniach: limit widocznych wydarzeń (1, 3, 5), zakres czasowy (najbliższe 7 dni, 30 dni, wszystkie przyszłe). Kliknięcie w wydarzenie otwiera modal z pełnymi szczegółami i przyciskiem "Przypomnij mi".

### Stan Pusty i Domyślny
Gdy twórca nie ma jeszcze treści do danej sekcji (np. brak celów, brak postów), przełącznik nie jest schowany – jest aktywny, ale karta sekcji pokazuje delikatny, przygaszony podgląd i komunikat: "Dodaj pierwszy cel, aby ta sekcja ożyła". To zachęca do działania.

### Nieoczywisty Element – "Sekretna Sekcja: High Roller's Vault"
Gdy twórca osiągnie poziom "Wieloryba" (łączna suma wsparcia powyżej 10 000 PLN), w `sections/` odblokowuje się dodatkowa, specjalna sekcja – **High Roller's Vault**. To ekskluzywny widżet, który pokazuje top 5 darczyńców z ich awatarami, poziomem wsparcia i personalnymi podziękowaniami od twórcy. To jest ukryta nagroda – zarówno dla twórcy (prestiż), jak i dla fanów (publiczne wyróżnienie za lojalność).

### Komponenty Składowe
- `SectionCard` – kontener dla każdej sekcji (tytuł, miniatura, przełącznik, przycisk edycji).
- `ToggleSwitch` – włączanie/wyłączanie widoczności.
- `DragAndDropList` – zmiana kolejności sekcji.
- `GoalBarConfig` – wybór celu i stylu paska.
- `FanwallConfig` – wybór układu i filtrów.
- `FeaturedContentPicker` – wybór do 3 elementów do przypięcia.
- `Button` (Ghost, mały) – "Edytuj" przy każdej karcie.
- `LivePreview` – stały podgląd zmian na profilu.

---

Gotowy na `badges/`, Wielorybie? Tam twórca odblokowuje, przypina i chwali się swoimi cyfrowymi odznaczeniami – a ja opowiem, jak z tego zrobić kolekcjonerską pasję.

Wielorybie 🐳. `badges/` – to jest **gablota z trofeami**, którą twórca ustawia na widoku publicznym. Nie chodzi o prywatną kolekcję (od tego jest Panel Fana), tylko o to, które zaszczytne odznaki mają zdobić jego profil i budować autorytet w oczach odwiedzających.

To tutaj dowód społeczny zmienia się z abstrakcyjnej metryki w namacalne, błyszczące symbole statusu.

---

## 🧬 `studio/page/badges/` – Publiczna Gablota Trofeów

To nie jest tylko galeria. To jest **selektor prestiżu**.

### Struktura Wizualna

Widok otwiera się siatką wszystkich odznak, jakie twórca kiedykolwiek zdobył – `CSS Grid` z kolumnami `repeat(auto-fill, minmax(120px, 1fr))`. Każda odznaka to interaktywna karta z miniaturą, nazwą i przełącznikiem widoczności publicznej.

Odznaki aktywne (widoczne na profilu) mają złotą, delikatnie świecącą ramkę i są przesunięte na początek siatki. Odznaki nieaktywne są lekko przygaszone, ale wciąż widoczne – twórca może je przeciągnąć, by zmienić kolejność wyświetlania na swoim profilu.

### Anatomia Karty Odznaki

Każda karta zawiera miniaturę odznaki, nazwę (np. "Wieloryb", "Early Supporter"), datę zdobycia, oraz ikonę oka do przełączania widoczności. Po najechaniu pojawia się przycisk "Podgląd" – otwiera modal z pełnowymiarową grafiką odznaki, jej historią (kto ją przyznał, za co) i opcją pobrania pliku.

### Kolejność Wyświetlania

Pod siatką znajduje się miniaturowa lista "Podgląd na profilu", pokazująca dokładnie, w jakiej kolejności odznaki zobaczy odwiedzający. Twórca przeciąga elementy na tej liście, by ustalić priorytet – najważniejsze trofea z przodu.

### Nieoczywisty Element – "Odznaka Dumy"

Gdy twórca zdobędzie odznakę "Wieloryb" (łączna suma wsparcia powyżej 10 000 PLN), w `badges/` odblokowuje się specjalny tryb. Może wybrać **jedną odznakę** i przekształcić ją w animowaną – otrzymuje ona delikatny efekt złotej poświaty i animację `--ease-spring`. Taka odznaka na profilu przyciąga wzrok mocniej niż statyczne i jest sygnałem dla fanów: "Ten twórca osiągnął poziom premium."

### Integracja z Ekosystemem

- Odznaki skonfigurowane w `badges/` renderują się w sekcji `Featured Badges` na publicznym profilu (konfigurowanej w `sections/`).
- Dane o zdobytych odznakach pochodzą z bazy, która śledzi aktywność twórcy i automatycznie przyznaje nowe trofea.
- Każda odznaka ma swój wariant wizualny zgodny z wybranym w `appearance/` presetem tematycznym.

### Komponenty Składowe

- `BadgeGrid` – kontener z siatką `auto-fill`.
- `BadgeCard` – miniatura odznaki z przełącznikiem widoczności.
- `ToggleSwitch` – włączanie/wyłączanie widoczności publicznej.
- `DragAndDropList` – zmiana kolejności odznak.
- `BadgeDetailModal` – pełnowymiarowy podgląd z historią zdobycia.
- `Button` – "Podgląd", "Pobierz".
- `HighlightBadgeToggle` – przełącznik trybu animowanej odznaki (tylko dla Wielorybów).

---

Gotowy na `socials/`, Wielorybie? Tam twórca splata swoją obecność w sieci w jeden spójny węzeł – i opowiem, jak to zrobić, by fan nie zgubił się w gąszczu platform.

Wielorybie 🐳. `socials/` – to jest **centrum dowodzenia cyfrową tożsamością**. Tutaj twórca nie tylko podaje linki do swoich mediów. On splata swoją obecność w sieci w jeden spójny węzeł, który fan może kliknąć, by przenieść się z TipJar+ w dowolny zakątek internetu.

---

## 🧬 `studio/page/socials/` – Centrum Dowodzenia Cyfrową Tożsamością

To nie jest nudny formularz z siedmioma polami tekstowymi. To jest **wizualna mapa obecności** – każda platforma to osobna, rozpoznawalna ikona, a każdy link jest natychmiastowo walidowany i podglądany.

### Struktura Wizualna

Widok otwiera się siatką platform – `CSS Grid` z kolumnami `repeat(auto-fill, minmax(280px, 1fr))`. Każda platforma to osobna karta z ikoną, nazwą i polem do wprowadzenia URL-a. Karty są pogrupowane kategoriami: streamingowe (Twitch, YouTube), społecznościowe (X, Instagram, TikTok, Discord), oraz własne (Website).

Platformy, które twórca już wypełnił, mają delikatną, złotą obwódkę (`--gold-400` z opacity 30%) i są automatycznie przesuwane na początek siatki. Nieaktywne karty są przygaszone, ale wciąż widoczne – zachęcają do uzupełnienia.

### Anatomia Karty Platformy

Każda karta zawiera dużą, kolorową ikonę platformy (np. fioletowy Discord, różowy Instagram), nazwę, oraz `Input` z debounce 500ms do walidacji URL-a. Gdy twórca wkleja link, system automatycznie sprawdza format, wyciąga nazwę użytkownika i wyświetla ją obok jako potwierdzenie: "Znaleziono: @twojanazwa". Jeśli link jest nieprawidłowy, pojawia się delikatny, czerwony komunikat pod polem.

### Kolejność Wyświetlania

Pod siatką znajduje się miniaturowa lista "Kolejność na profilu", pokazująca, w jakiej kolejności ikony platform będą widoczne dla odwiedzających. Twórca przeciąga elementy na tej liście, by ustalić priorytet – najważniejsza platforma z przodu.

### Walidacja i Podgląd

Każdy URL jest walidowany w czasie rzeczywistym. System sprawdza, czy link prowadzi do prawidłowej domeny (np. `twitch.tv/...`), czy konto istnieje (opcjonalnie, przez API platform) i czy link nie jest uszkodzony. Obok każdego pola znajduje się przycisk "Testuj" – otwiera link w nowej karcie, by twórca mógł zweryfikować.

Dodatkowo, w `mobile-preview/` stale widocznym po prawej stronie, ikony platform renderują się dokładnie tak, jak zobaczy je fan – w wybranym stylu (rząd ikon, lista z nazwami, chipy) zgodnym z konfiguracją w `sections/`.

### Nieoczywisty Element – "Social Health Score"

Nad siatką platform znajduje się mały wskaźnik – **Social Health Score**. To liczba od 0 do 100, która rośnie, gdy twórca uzupełnia linki, podaje aktualne adresy i regularnie je aktualizuje. Gdy wynik przekroczy 80, pojawia się gratulacyjny komunikat: "Twój ekosystem jest kompletny. Fani mogą Cię znaleźć wszędzie." To subtelny element grywalizacji, który zachęca do pełnego wypełnienia profilu.

Dodatkowo, jeśli twórca poda dwa linki do tej samej platformy (np. dwa różne konta na X), system wyświetla ostrzeżenie z sugestią scalenia lub wybrania jednego, głównego konta. To zapobiega fragmentacji tożsamości.

### Integracja z Ekosystemem

Dane z `socials/` są używane w kilku miejscach:
- W `sections/`, gdzie twórca decyduje, czy sekcja Social Links jest widoczna i w jakim stylu.
- W `studio/share/qr-codes/`, gdzie dla każdej platformy można wygenerować dedykowany kod QR.
- W `studio/share/social-cards/`, gdzie linki są dołączane do automatycznie generowanych kart udostępniania.
- Na publicznym profilu, gdzie ikony platform są wyświetlane jako interaktywne przyciski.

### Komponenty Składowe

- `SocialPlatformCard` – kontener dla każdej platformy (ikona, nazwa, `Input`, wskaźnik walidacji).
- `Input` (z debounce i walidacją URL) – pole do wprowadzania linku.
- `Icon` – duża, kolorowa ikona platformy.
- `DragAndDropList` – zmiana kolejności platform na profilu.
- `SocialHealthScore` – wskaźnik kompletności profilu społecznościowego.
- `Button` (Ghost, mały) – "Testuj" przy każdym linku.
- `Tooltip` – przy konfliktach (dwa linki do tej samej platformy).
- `LivePreview` – stały podgląd, jak ikony będą wyglądać na profilu.

---

Gotowy na `fanwall/`, Wielorybie? Tam twórca konfiguruje duszę swojej społeczności – jak wygląda, co mówi i kto może się do niej odezwać.

Wielorybie 🐳. `fanwall/` w `studio/page/` – to jest **centrum dowodzenia społecznością**. To tutaj twórca nie tylko włącza lub wyłącza Ścianę Fanów, ale naprawdę nią dyryguje. Każde ustawienie to osobny rozdział tej opowieści, a każdy z nich definiuje, jak społeczność będzie się prezentować światu.

---

## 🧬 `studio/page/fanwall/` – Dyrygowanie Społecznym Dowodem

To nie jest sucha konfiguracja. To jest **reżyseria** – miejsce, gdzie twórca decyduje, jak ma wyglądać i brzmieć jego społeczność.

### `Visibility`
Fundamentalna decyzja: czy Ściana Fanów jest w ogóle widoczna publicznie. `ToggleSwitch` z jasnym, perswazyjnym opisem: "Gdy Ściana Fanów jest widoczna, nowi odwiedzający widzą, że masz aktywną, wspierającą społeczność. To zwiększa zaufanie i konwersję." Dodatkowo twórca ustawia **próg widoczności** – np. "pokaż dopiero, gdy będzie co najmniej 5 wpisów". To chroni nowe profile przed wrażeniem pustki.

### `Message Settings`
Moderacja treści w rękach twórcy. Filtr wulgaryzmów (automatyczne ukrywanie), minimalna i maksymalna długość wiadomości (np. 3-280 znaków), oraz pole `TagInput` do blokowania konkretnych słów kluczowych. Wszystko po to, by Ściana Fanów była bezpieczną, przyjazną przestrzenią.

### `Recent Tips`
Definicja wyglądu kart wsparcia. Twórca wybiera układ (Masonry, Grid, Lista), liczbę widocznych wpisów (10, 20, 50, wszystkie), oraz zaawansowane filtry – pokazuj tylko wpisy z wiadomościami, tylko od subskrybentów, tylko powyżej określonej kwoty.

### `Highlighted Supporters`
Możliwość **przypięcia wybranych fanów** na szczyt Ściany Fanów. `AvatarGroup` z polem wyszukiwania – twórca znajduje fana po nazwie i klika "Wyróżnij". Przypięty fan dostaje złotą ramkę, a jego wpis jest zawsze pierwszy. To potężne narzędzie do nagradzania lojalności.

### `Animation Settings`
Detal, który definiuje charakter. Twórca wybiera animację wejścia nowych wpisów (`fade-in`, `slide-up`, `scale-in`, lub brak dla `prefers-reduced-motion`), szybkość (wolna, normalna, szybka) i efekt pulsowania nowości przez pierwsze 2 sekundy.

### Nieoczywisty Element – "Tryb Wdzięczności"
W `Highlighted Supporters` znajduje się przycisk "Wyślij podziękowanie". Kliknięcie otwiera `Modal` z pre-definiowaną wiadomością (np. "Dziękuję Ci za Twoje niesamowite wsparcie! Jesteś prawdziwym filarem tej społeczności."). Twórca może ją edytować i wysłać bezpośrednio do fana przez `community/messages/`. To zamienia suchą listę w osobistą relację.

### Integracja z Ekosystemem
Konfiguracja z `fanwall/` zasila `desktop/fanwall-preview/` (miniaturowy podgląd na dashboardzie), publiczny profil twórcy oraz `desktop/recent-support/`. Wszystkie dane pochodzą z tego samego źródła co `community/supporters/`.

### Komponenty Składowe
- `FanwallConfigCard` – kontener dla każdej sekcji konfiguracji.
- `ToggleSwitch` – widoczność, filtry.
- `Input` (TagInput dla słów kluczowych).
- `SegmentedControl` – wybór układu (Masonry/Grid/Lista).
- `AvatarGroup` – wyszukiwanie i przypinanie fanów.
- `AnimationSelector` – wybór animacji wejścia z podglądem.
- `Button` (Primary, mały) – "Wyślij podziękowanie".
- `Modal` – edytor wiadomości z podziękowaniem.
- `LivePreview` – stały podgląd zmian na miniaturze Ściany Fanów.

---

Gotowy na `themes/`, Wielorybie? Tam jeden przycisk zmienia wszystko – i opowiem Ci, jak to zrobić, by twórca poczuł, że właśnie przeszedł na ciemną (lub jasną) stronę mocy.

Wielorybie 🐳. `themes/` – to jest **transformacja jednym kliknięciem**. Esencja obietnicy, którą złożyliśmy twórcom: że nie muszą być projektantami, by ich profil wyglądał jak dzieło sztuki. Każdy preset to kompletny świat, który natychmiast aplikuje się do całego profilu, przeliczając dziesiątki zmiennych w ułamku sekundy.

---

## 🧬 `studio/page/themes/` – Transformacja Jednym Kliknięciem

To nie jest galeria tapet. To **reaktor wizualny**, który w ułamku sekundy przelicza cały profil na nowy język estetyczny. Cel: dać twórcy moc całkowitej metamorfozy bez ani jednej decyzji technicznej.

### `ThemeSelector` – Wybór Świata

Siatka dużych, kinetycznych kart, każda reprezentująca inny preset. Na kartach nie ma statycznych miniatur – są **mikro-animacje**: na karcie "Neon" biegnie różowa smuga, na "Glass" szklana sfera obraca się i załamuje światło. Pod każdą nazwą znajduje się opis w jednym zdaniu, definiujący emocję, a nie technikę.

Wybór jest natychmiastowy. Kliknięcie karty wysyła sygnał do `LivePreview` i `AppearanceContext`, a cały podgląd profilu po prawej stronie przechodzi metamorfozę w `400ms` z animacją `--ease-enter`.

### Nieoczywisty Element – "Podwójne Spojrzenie"

Gdy twórca zawaha się między dwoma presetami, może kliknąć przycisk "Porównaj". Ekran dzieli się na pół – dwa podglądy na żywo, każdy z innym presetsem. Może przewijać swój profil i widzieć, jak wygląda w obu światach jednocześnie. Wybór dokonuje się przez kliknięcie przycisku "Wybieram ten" pod jednym z podglądów.

### Automatyczna Generacja – Efekt Domina

Wybór presetu to nie zmiana jednego arkusza stylów. To **kaskada decyzji projektowych**: widget style, overlay style, goal style, QR style, typografia, animacje – wszystkie podsystemy dostają nową konfigurację. Twórca widzi, jak zmienia się pasek celów i karty wsparcia. To jest magia, która buduje postrzeganą wartość platformy.

### Zaawansowane Opcje

Pod siatką presetów znajduje się przycisk "Zapisz jako mój preset". Jeśli twórca zmodyfikował coś w `appearance/`, może zapisać to jako własny, nazwany wariant. Niestandardowe presety pojawiają się w osobnej sekcji "Twoje motywy" na górze siatki. Może też kliknąć "Kreator motywów", który zadaje trzy pytania – "Jaki nastrój?", "Jaka energia?", "Jaka dominanta?" – i na tej podstawie generuje propozycję.

### Integracja z Ekosystemem

Preset z `themes/` zasila `appearance/` (kolory, typografia, efekty), `studio/share/widgets/` (styl widżetów), `studio/share/qr-codes/` (styl kodów QR) i `studio/live/overlays/` (styl nakładek). Wszystkie widżety na publicznym profilu automatycznie dziedziczą wybrany preset. Gdy twórca zmieni motyw, wszystkie jego kody QR, widżety i nakładki aktualizują się automatycznie.

### Komponenty Składowe

- `ThemeSelector` – siatka kinetycznych kart z mikro-animacjami.
- `CompareMode` – podzielony ekran do porównywania dwóch presetów.
- `LivePreview` – stały podgląd na żywo z pełną metamorfozą.
- `Button` – "Zapisz jako mój preset", "Porównaj", "Kreator motywów".
- `MoodWizardModal` – trzy pytania do generatora motywów.

---

Gotowy na `mobile-preview/`, Wielorybie? Tam twórca wyjmuje telefon i patrzy na siebie oczami fana.

Wielorybie 🐳. `mobile-preview/` – to jest **moment prawdy**. Wszystko, co twórca zbudował w `profile/`, `appearance/`, `layout/`, `sections/`, `badges/`, `socials/` i `fanwall/` – tutaj materializuje się w jednym, żywym widoku, który wygląda dokładnie tak, jak zobaczy go fan na swoim telefonie. To nie jest podgląd. To jest **symulacja rzeczywistości**.

---

## 🧬 `studio/page/mobile-preview/` – Okno do Świata Fana

To ostatni przystanek przed publikacją. Miejsce, gdzie twórca wyjmuje telefon i patrzy na siebie oczami kogoś, kto go dopiero odkrywa. Cel: dać 100% pewności, że to, co zobaczy fan, jest dokładnie tym, co twórca chciał przekazać.

### Struktura Wizualna

Na desktopie `mobile-preview/` jest **stałym panelem** zadokowanym po prawej stronie całego `studio/page/`. Nie jest to osobna podstrona, tylko **towarzysz** – obecny zawsze, podczas pracy w każdej innej sekcji. Jego szerokość to `380px`, a w centrum znajduje się **realistyczna ramka telefonu** (wzór: iPhone 15 Pro), która daje kontekst i skalę.

Na mobile `mobile-preview/` jest dostępny jako osobna zakładka lub wysuwany panel `Bottom Sheet`, który można otworzyć gestem przesunięcia od prawej krawędzi.

### Co Dokładnie Jest Podglądane?

Komponent `LivePreview` renderuje **funkcjonalną miniaturę publicznego profilu twórcy** – ten sam komponent React, który jest używany na prawdziwej stronie `/(creator)/@username`, tylko pomniejszony i osadzony w ramce telefonu. Wszystkie dane są prawdziwe: awatar, bio, cele, Fanwall, odznaki, social linki. Wszystko pobierane z bieżącego stanu formularzy w `studio/page/`.

Podgląd jest **interaktywny** – twórca może przewijać, klikać przyciski, rozwijać sekcje. Wsparcie testowe jest oznaczone małym, fioletowym badge'm "Podgląd", aby odróżnić je od prawdziwych danych. Można też zasymulować widok **pierwszego odwiedzającego** – profil bez ciasteczek, bez zapisanych preferencji – lub widok **powracającego fana** z już załadowanymi danymi.

### Dynamiczna Reakcja na Zmiany

Gdy twórca w `profile/` zmieni avatar, w `mobile-preview/` aktualizuje się on w czasie rzeczywistym (z debounce 300ms). Gdy w `layout/` zmieni kolejność sekcji, podgląd przewija się płynnie do nowej pozycji. Gdy w `themes/` wybierze nowy preset, cały podgląd przechodzi metamorfozę w `400ms` z animacją `--ease-enter`. Gdy w `badges/` wyłączy widoczność odznaki, znika ona z podglądu z subtelną animacją `fade-out`.

### Tryby Podglądu

Pod ramką telefonu znajduje się `SegmentedControl` z trzema opcjami:

- **Mobile** – domyślny, profil w ramce iPhone'a 15 Pro z realistycznym odwzorowaniem `safe-area-inset`.
- **Desktop** – profil na szerokim ekranie, pokazujący pełny układ dwukolumnowy z `Sticky Panel`.
- **Tablet** – widok pośredni, z układem dostosowanym do ekranów `768px` – `1024px`.

Przełączanie między trybami jest natychmiastowe.

### Stan Pusty i Ładowania

Gdy twórca dopiero zaczyna i nie ma jeszcze danych, podgląd nie jest pusty. Pokazuje **"Profil demonstracyjny"** – przykładowe dane, które ilustrują, jak może wyglądać gotowy profil. Każdy element demonstracyjny ma delikatny, przerywany border i badge "Demo", aby odróżnić go od rzeczywistości.

Podczas ładowania danych, podgląd pokazuje `Skeleton` – pulsujące bloki w kształcie sekcji profilu.

### Nieoczywisty Element – "Test na 5 Sekund"

W prawym górnym rogu panelu znajduje się przycisk "Test 5s". Kliknięcie uruchamia tryb, w którym podgląd jest widoczny przez dokładnie 5 sekund, a potem znika. Twórca ma odpowiedzieć na pytanie: "Co zapamiętałeś?". To symulacja pierwszego wrażenia – tego, ile fan jest w stanie przyswoić w ciągu kilku sekund po otwarciu profilu. Wynik nie jest oceną, tylko sugestią: jeśli twórca nie jest pewien, co zapamiętał, system podpowiada, by wzmocnić `Featured Content` lub `Goal Bar`.

### Integracja z Ekosystemem

`mobile-preview/` jest **hubem** dla wszystkich sekcji `page/`. Każda zmiana w `profile/`, `appearance/`, `layout/`, `sections/`, `badges/`, `socials/`, `fanwall/` i `themes/` jest natychmiastowo odzwierciedlana tutaj. To tutaj twórca podejmuje ostateczną decyzję: czy profil jest gotowy do publikacji.

### Przycisk "Publikuj"

Na dole panelu `mobile-preview/` znajduje się najważniejszy przycisk w całym `studio/page/`: **"Publikuj zmiany"**. To `Button` (Primary, Large) w kolorze `--gold-400`. Kliknięcie zapisuje wszystkie zmiany z `page/` i publikuje je na publicznym profilu. Towarzyszy temu `Modal` z podsumowaniem: co się zmieniło, jak to wygląda teraz, i przyciskiem "Udostępnij swój profil".

### Komponenty Składowe

- `LivePreview` – komponent renderujący publiczny profil twórcy w czasie rzeczywistym.
- `DeviceFrame` – realistyczna ramka telefonu (iPhone 15 Pro) z `safe-area-inset`.
- `SegmentedControl` – przełącznik widoku (Mobile / Desktop / Tablet).
- `Skeleton` – stan ładowania podglądu.
- `Button` (Primary, Large) – "Publikuj zmiany".
- `Modal` – podsumowanie publikacji.
- `TestModeOverlay` – tryb "Test na 5 sekund".

---

Gotowy na `seo/`, Wielorybie? Tam twórca uczy się mówić językiem robotów – by jego profil był pierwszym, co zobaczy Google.

Wielorybie 🐳. Wchodzimy w seo/. To jest miejsce, gdzie twórca przestaje mówić tylko do ludzi, a zaczyna mówić do maszyn – robotów Google, Facebooka, X, Discord. I uczy się, że w internecie nikt nie usłyszy jego krzyku, jeśli nie szepnie najpierw do ucha algorytmu.

To nie jest nudny formularz "Meta Title". To jest centrum dowodzenia ruchem organicznym – zestaw narzędzi, które decydują o tym, czy profil twórcy będzie drugim linkiem w Google, czy setnym.

🧬 studio/page/seo/ – Centrum Dowodzenia Ruchem Organicznym
To tutaj twórca decyduje, jak jego profil wygląda, gdy ktoś wrzuci link na Discorda, wygoogla jego nazwę, albo zobaczy podgląd w wiadomości na Messengerze.

Struktura Wizualna
Widok jest podzielony na dwie sekcje: lewa – formularze i pola do wprowadzania danych, prawa – OG Preview Panel, który na żywo pokazuje, jak link będzie wyglądać w Google, na X (Twitter), Facebooku i Discordzie. Twórca nie musi zgadywać. On widzi to natychmiast.

Meta Title
Pole Input z limitem 60 znaków i dynamicznym licznikiem. Domyślnie wypełniane automatycznie z Display Name, ale twórca może je dostosować. Obok pola znajduje się Tooltip: "To jest tytuł, który zobaczą w wynikach Google. Powinien zawierać Twoją nazwę i główną specjalizację." System ostrzega, gdy tytuł jest za krótki, za długi, lub gdy brakuje w nim nazwy twórcy.

Meta Description
Pole Textarea z limitem 155 znaków i podglądem na żywo w panelu OG Preview. Domyślnie generowane z Bio, ale twórca może napisać własny opis. Tooltip podpowiada: "Dobry opis zwiększa klikalność o 30%. Napisz, co Cię wyróżnia."

OpenGraph Image
Upload własnego obrazu lub wybór z automatycznie generowanych szablonów. Każdy szablon to dynamiczna karta z awatarem twórcy, jego nazwą, archetypem i opcjonalną statystyką (np. "Ponad 500 fanów"). Obraz jest renderowany przez Satori Engine na Edge, więc twórca widzi podgląd natychmiast. Może też wybrać, by obraz generował się dynamicznie za każdym razem – wtedy zawiera zawsze aktualne dane.

Share Preview
Panel z czterema zakładkami – Google, X, Facebook, Discord. W każdej zakładce renderowany jest realistyczny podgląd karty linku, tak jak zobaczy go użytkownik danej platformy. Twórca przełącza zakładki i sprawdza, czy wszystko wygląda dobrze.

Indexing
Sekcja dla zaawansowanych. ToggleSwitch "Pozwól Google indeksować mój profil" (domyślnie włączony). Opcja ukrycia profilu przed wyszukiwarkami, gdy twórca nie jest jeszcze gotowy. Dodatkowo Button "Zgłoś do indeksacji", który wysyła ping do Google Search Console z prośbą o ponowne przeskanowanie profilu.

Nieoczywisty Element – "SEO Health Score"
Nad formularzami znajduje się wskaźnik – liczba od 0 do 100, która rośnie, gdy twórca uzupełnia tytuł, opis, obraz OG i optymalizuje treść. Gdy wynik przekroczy 90, pojawia się gratulacyjny komunikat: "Twój profil jest w pełni zoptymalizowany. Google Cię pokocha." To element grywalizacji, który zachęca do dbania o widoczność.

Dodatkowo, system co 24 godziny automatycznie sprawdza, czy meta dane są aktualne. Jeśli twórca zmienił Bio w profile/, ale nie zaktualizował Meta Description, system wyświetla delikatne przypomnienie.

Integracja z Ekosystemem
Dane z seo/ trafiają do metadata w layout.tsx publicznego profilu. OpenGraph Image jest serwowany przez api/og/creator z wykorzystaniem Satori Engine. Indexing komunikuje się z Google Search Console API. Dane są też używane w studio/share/open-graph/ do generowania indywidualnych kart dla celów i wydarzeń.

Komponenty Składowe
SEOForm – główny kontener z polami.

Input z CharacterCount – Meta Title.

Textarea z CharacterCount – Meta Description.

OGImageSelector – wybór własnego obrazu lub dynamicznego szablonu.

SharePreviewPanel – cztery zakładki z realistycznym podglądem.

ToggleSwitch – indeksowanie.

SEOHealthScore – wskaźnik kompletności SEO.

Button (Primary, mały) – "Zgłoś do indeksacji".

Tooltip – przy każdym polu z podpowiedzią.

Gotowy na ostatnią sekcję w page/, Wielorybie? visibility/ – tam twórca decyduje, czy jego świat jest już gotowy, by otworzyć drzwi.

Wielorybie 🐳. Zamykam `studio/page/` ostatnią sekcją: `visibility/`. To jest **ostatni przełącznik przed publikacją** – moment, w którym twórca decyduje, czy jego świat jest już gotowy, by otworzyć drzwi dla całego internetu.

---

## 🧬 `studio/page/visibility/` – Ostatni Przełącznik przed Publikacją

To tutaj zapada najważniejsza decyzja: czy profil jest szkicem, czy żywą, publiczną stroną.

### Struktura Wizualna

Centralnym elementem jest duży `ToggleSwitch` – "Profil publiczny". Gdy jest wyłączony, profil jest widoczny tylko dla twórcy (tryb szkicu). Gdy jest włączony, każdy z linkiem może go odwiedzić. Obok przełącznika znajduje się wskaźnik statusu: szara kropka dla szkicu, zielona (`--success-base`) dla opublikowanego.

### Dodatkowe Opcje

Pod przełącznikiem znajdują się dwie dodatkowe kontrolki:
- **"Pokaż w Katalogu Twórców":** decyzja, czy profil ma być widoczny w `explore/` i wyszukiwarce platformy. Można mieć publiczny profil, ale nie figurować w katalogu – dla twórców, którzy chcą docierać tylko przez własne linki.
- **"Ostrzeżenie o zmianach":** checkbox, który przed każdą dużą zmianą na profilu (np. zmiana nazwy, archetypu) prosi o potwierdzenie, by uniknąć przypadkowych modyfikacji.

### Nieoczywisty Element – "Ukryte Ogłoszenie"

Gdy twórca pierwszy raz przełącza profil na publiczny, nie dzieje się to po cichu. System pyta: "Czy chcesz, by Twoi fani się o tym dowiedzieli?" Jeśli twórca kliknie "Tak", automatycznie generowany jest post w `community/feed/` z treścią: "Mój profil TipJar+ jest już dostępny! Odwiedź mnie tutaj: [link]". Ten post może być udostępniony też na X i Discordzie.

### Integracja z Ekosystemem

`visibility/` jest ostatnim elementem `studio/page/`. Gdy twórca przełączy profil na publiczny i kliknie "Publikuj", wszystkie dane z `profile/`, `appearance/`, `layout/`, `sections/`, `badges/`, `socials/`, `fanwall/`, `themes/` i `seo/` są zapisywane i publikowane. Profil staje się dostępny pod `/(creator)/@username`.

### Komponenty Składowe

- `ToggleSwitch` – główny przełącznik widoczności.
- `StatusIndicator` – kropka sygnalizująca stan (szkic/publikacja).
- `Checkbox` – "Pokaż w Katalogu Twórców", "Ostrzeżenie o zmianach".
- `Modal` – potwierdzenie pierwszej publikacji z opcją ogłoszenia.
- `Button` (Primary) – "Publikuj".

---

To już wszystkie 11 sekcji `studio/page/`. Od fundamentu tożsamości w `profile/`, przez wizualną metamorfozę w `appearance/`, architekturę przestrzeni w `layout/`, kuratorstwo wystawy w `sections/`, gablotę trofeów w `badges/`, mapę obecności w `socials/`, dyrygowanie społecznością w `fanwall/`, transformację jednym kliknięciem w `themes/`, okno do świata fana w `mobile-preview/`, centrum dowodzenia ruchem w `seo/`, aż po ostatni przełącznik w `visibility/`.

`studio/page/` jest kompletne. Gotowy, by ruszyć dalej – `studio/monetization/`, `studio/share/`, `studio/live/`? Czekam na sygnał, Wielorybie.

Wielorybie 🐳. Masz absolutną rację. Przegapiłem `seo/` w kolejności. `mobile-preview/` było przedostatnie, potem powinno być `seo/`, a dopiero na końcu `visibility/`. Naprawiam to natychmiast. Oto brakujące ogniwo.

---

## 🧬 `studio/page/seo/` – Centrum Dowodzenia Ruchem Organicznym

To nie jest nudny formularz meta tagów. To jest **strategiczne centrum dowodzenia widocznością** – miejsce, gdzie twórca uczy się mówić językiem robotów Google, botów mediów społecznościowych i algorytmów wyszukiwania. Jego celem jest zapewnienie, że gdy ktoś wpisze w Google nazwę twórcy lub jego specjalizację, profil TipJar+ będzie pierwszym wynikiem.

### Struktura Wizualna i Filozofia Projektowa

Widok jest podzielony na dwie główne strefy. Po lewej stronie znajduje się **formularz konfiguracyjny** z polami do wypełnienia. Po prawej stronie, w panelu podglądu, renderuje się **symulacja wyniku wyszukiwania** – dokładnie tak, jak profil zobaczy użytkownik Google'a (tytuł, URL, opis) oraz jak będzie wyglądać karta udostępnienia na Facebooku, X, Discordzie i w iMessage. Każda zmiana w formularzu jest natychmiastowo odzwierciedlana w podglądzie (debounce 500ms).

### Sekcje `seo/`

#### `Meta Title`
To nie jest zwykły `Input`. To pole z podglądem na żywo w symulacji wyniku Google. Obok znajduje się `CharacterCount` z `ProgressBar`, który zmienia kolor na pomarańczowy przy 50 znakach i czerwony przy 60 (limit Google). System automatycznie sugeruje optymalny tytuł na podstawie Display Name i Archetypu, np. "Jan Kowalski – Coach & Trener Personalny | TipJar+". Twórca może go zaakceptować lub edytować.

#### `Meta Description`
`Textarea` z limitem 155 znaków. Pod polem znajduje się `CharacterCount` i podgląd w symulacji wyniku Google. System automatycznie generuje propozycję na podstawie Bio, ale twórca może napisać własną. Dobry opis zawiera słowa kluczowe i wezwanie do działania, np. "Wesprzyj moją twórczość i dołącz do społeczności. Napiwki, subskrypcje, cele i ekskluzywne treści."

#### `OpenGraph Image`
To nie jest uploader. To **generator automatyczny**. System dynamicznie tworzy obraz OG na podstawie danych z `profile/` i `appearance/` – awatar, nazwa, tło z wybranego presetu. Twórca widzi podgląd tego obrazu i może kliknąć "Regeneruj", jeśli coś zmienił w profilu. Może też manualnie wgrać własny obraz. Podgląd pokazuje, jak karta będzie wyglądać na Facebooku, X, Discordzie i LinkedIn – każda platforma ma swoją miniaturkę.

#### `Share Preview`
Sekcja z symulacjami kart udostępnienia na różnych platformach. Nie ma tu nic do edycji – to tylko podgląd, który pokazuje, czy wszystko jest poprawnie skonfigurowane. Jeśli czegoś brakuje (np. brak Meta Description), system wyświetla ostrzeżenie z linkiem do odpowiedniego pola.

#### `Indexing`
`ToggleSwitch` z opisem: "Pozwól wyszukiwarkom (Google, Bing) indeksować Twój profil. Wyłącz tylko wtedy, gdy chcesz, by profil był dostępny tylko przez bezpośredni link." Dodatkowo twórca może ustawić własne słowa kluczowe w `TagInput` – tagi, które pomogą wyszukiwarkom zrozumieć tematykę profilu. System automatycznie sugeruje tagi na podstawie Archetypu i Specialization Badges.

### Nieoczywisty Element – "Symulator Google"

W prawym panelu znajduje się nie tylko statyczny podgląd. Jest tam interaktywny **Symulator Google** – pole wyszukiwania, w które twórca może wpisać dowolną frazę (np. "coach fitness kraków") i zobaczyć, jak jego profil wypada na tle konkurencji. System nie pokazuje rzeczywistych wyników Google, tylko **symulację na podstawie danych SEO** – czy meta tagi są optymalne, czy słowa kluczowe pasują, czy opis jest wystarczająco zachęcający. To edukuje twórcę, jak działa SEO, bez przytłaczania go żargonem.

### Integracja z Ekosystemem

- Dane z `seo/` są używane przez serwer do generowania znaczników `<meta>` i `<og:...>` w HTML-u publicznego profilu.
- `OpenGraph Image` jest automatycznie regenerowany przy każdej zmianie w `profile/` lub `appearance/`.
- Tagi z `Indexing` są używane w `<meta name="keywords">` oraz w wewnętrznej wyszukiwarce Katalogu Twórców.
- `Share Preview` pokazuje dokładnie to, co zobaczą użytkownicy, gdy twórca (lub ktoś inny) wklei link do jego profilu w mediach społecznościowych.

### Komponenty Składowe

- `SEOForm` – główny kontener z polami i podglądem.
- `Input` z `CharacterCount` i `ProgressBar` – Meta Title.
- `Textarea` z `CharacterCount` – Meta Description.
- `OGImageGenerator` – automatyczny generator obrazu OG z podglądem na różnych platformach.
- `SharePreviewCards` – symulacje kart na Facebook, X, Discord, LinkedIn.
- `ToggleSwitch` – indeksowanie.
- `TagInput` – słowa kluczowe.
- `GoogleSimulator` – interaktywny symulator wyniku wyszukiwania.
- `Button` (Primary) – "Zapisz ustawienia SEO".

---

`studio/page/` jest już naprawdę kompletne – łącznie z `seo/` i `visibility/`. Gotowy, by ruszyć dalej, Wielorybie? Przed nami `studio/monetization/`, `studio/share/`, `studio/live/` i `studio/automations/`. Daj sygnał.

├── studio/
│   │
│   ├── page/
│   │   ├── profile/
│   │   ├── appearance/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── badges/
│   │   ├── socials/
│   │   ├── fanwall/
│   │   ├── themes/
│   │   ├── mobile-preview/
│   │   ├── seo/
│   │   └── visibility/



