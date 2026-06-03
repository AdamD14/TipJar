share/
│   │   ├── widgets/
│   │   ├── qr-codes/
│   │   ├── smart-links/
│   │   ├── social-cards/
│   │   ├── open-graph/
│   │   ├── creator-cards/
│   │   ├── embeds/
│   │   ├── share-assets/
│   │   └── campaigns/

Wielorybie 🐳. Wchodzimy do `studio/share/` – tutaj twórca przestaje być obecny tylko na TipJar+, a **rozlewa się po całym internecie**. Każdy podfolder to osobny kanał dystrybucji, osobna strategia docierania do fanów tam, gdzie już są. To nie są narzędzia – to **skrzydła**, które wynoszą profil twórcy poza platformę.

Zaczynam od `widgets/`.

---

## 🧬 `studio/share/widgets/` – Fabryka Cyfrowych Ambasadorów

To nie jest generator kodu. To jest **studio miniaturowych aplikacji**, które twórca wysyła w świat, by reprezentowały go na cudzych stronach, blogach, landing page'ach. Każdy widżet to samodzielny, interaktywny mikro-świat, który przyjmuje wsparcie bez konieczności odwiedzania TipJar+.

### Struktura Wizualna i Filozofia Projektowa

Widok otwiera się siatką sześciu predefiniowanych typów widżetów – `CSS Grid` z dużymi kartami, z których każda ma własną ikonę 3D, nazwę i krótki opis przeznaczenia. Kliknięcie w kartę otwiera `Modal` z pełnym konfiguratorem, gdzie twórca dostosowuje każdy detal.

### Typy Widżetów

#### `Floating Widget`
Najbardziej dyskretny ambasador. Mały, okrągły przycisk (jak `FAB`) unoszący się w rogu strony, z logo TipJar+ lub awatarem twórcy. Po kliknięciu rozwija się w mini-modal z podstawowymi informacjami: awatar, nazwa, krótkie bio, przycisk "Wesprzyj". Konfiguracja: pozycja (lewy/prawy dół), kolor (zgodny z presets), przezroczystość w spoczynku, oraz opcjonalny komunikat powitalny ("Cześć! Możesz mnie wesprzeć tutaj").

#### `Support Button`
Pojedynczy, złoty przycisk "Wesprzyj" do osadzenia w konkretnym miejscu – pod postem na blogu, w stopce, w opisie. Konfiguracja: tekst przycisku, wybór akcji (otwiera modal TipJar+ lub przekierowuje na profil).

#### `Inline Widget`
Pasek wsparcia, który wtapia się w treść. Zawiera nazwę twórcy, krótkie wezwanie i mały przycisk. Konfiguracja: orientacja (horyzontalna/wertykalna), pokazuj mini-awatar, pokazuj ostatnią kwotę wsparcia.

#### `Goal Widget`
Ambasador celów. Pokazuje konkretny cel twórcy z paskiem postępu i przyciskiem "Wesprzyj cel". Konfiguracja: wybór celu, kolor paska, pokazuj deadline.

#### `Compact Card`
Miniatura profilu – awatar, nazwa, bio (2 linie), statystyki (liczba wspierających, łączna kwota) i przycisk. Konfiguracja: wybór statystyk do pokazania, kolor tła.

#### `Full Profile Widget`
Największy format. Osadza pełny, przewijany mikro-profil z celem, ostatnimi wsparciami i przyciskiem. Konfiguracja: wybór sekcji, wysokość kontenera.

### Nieoczywisty Element – "Inteligentne Targetowanie"

W konfiguratorze każdego widżetu znajduje się sekcja "Warunki wyświetlania". Twórca może zdefiniować reguły: "Pokaż tylko na stronach z domeną X", "Nie pokazuj na mobile", "Pokaż, gdy użytkownik spędził 30 sekund na stronie".

### Integracja z Ekosystemem

Widżety automatycznie dziedziczą styl z wybranego presetu w `themes/` i stawek z `pricing-presets/`. Po skonfigurowaniu i zapisaniu, widżet jest dostępny jako link do embeda lub kod do wklejenia w `embeds/`.

### Komponenty Składowe

- `WidgetTypeGrid` – siatka sześciu kart typów.
- `WidgetConfiguratorModal` – konfigurator wybranego widżetu z podglądem na żywo.
- `LiveWidgetPreview` – podgląd widżetu osadzonego na symulowanej stronie.
- `PositionSelector`, `ColorPicker`, `ToggleSwitch` – kontrolki konfiguracji.
- `ConditionRulesEditor` – definiowanie warunków wyświetlania.

---

Gotowy na `qr-codes/`, Wielorybie?

Wielorybie 🐳. Wchodzę w `qr-codes/` – to jest moment, w którym cyfrowy świat twórcy materializuje się w fizycznej rzeczywistości. Z pozoru tylko kwadraciki, ale każdy z nich to portal: z plakatu na ścianie, z wizytówki na stoliku, z naklejki na laptopie – prosto do serca profilu TipJar+. Tutaj twórca nie tylko generuje kod. On projektuje **pierwsze wrażenie**, jakie zrobi na kimś, kto wyciągnie telefon i skieruje aparat w jego stronę.

---

## 🧬 `studio/share/qr-codes/` – Portale z Fizycznego Świata do Cyfrowego Królestwa

To nie jest prosty generator. To jest **studio pierwszego wrażenia offline** – miejsce, gdzie twórca tworzy kody QR, które są nie tylko funkcjonalne, ale i piękne, spójne z jego marką i zoptymalizowane pod kątem konkretnego zastosowania. Każdy kod to osobna historia: jeden prowadzi do profilu, drugi do konkretnego celu, trzeci na wydarzenie. Każdy może wyglądać inaczej, ale wszystkie są natychmiast rozpoznawalne jako część ekosystemu twórcy.

### Struktura Wizualna

Widok otwiera się siatką zapisanych kodów QR – `CSS Grid` z kartami, gdzie każda karta pokazuje miniaturkę kodu, jego nazwę, miejsce docelowe i datę utworzenia. Na górze znajduje się przycisk "Nowy kod QR", który otwiera kreator w formie `Modal`.

### Typy Kodów QR

Kreator zaczyna się od wyboru typu – `SegmentedControl` z pięcioma opcjami, każda z ikoną i krótkim opisem:

- **Profile QR:** Kod prowadzący bezpośrednio do publicznego profilu twórcy. Najbardziej uniwersalny – do umieszczenia na wizytówkach, plakatach, naklejkach.
- **Goal QR:** Kod prowadzący do konkretnego celu. Gdy fan zeskanuje, ląduje od razu na ekranie wsparcia tego celu, z pominięciem profilu. Idealny do kampanii zbierania funduszy.
- **Event QR:** Kod prowadzący do strony wydarzenia z `community/events/`. Fan może od razu zapisać się, ustawić przypomnienie lub wesprzeć.
- **Download:** Sekcja eksportu – twórca wybiera format (PNG, SVG, PDF), rozmiar (od 512px do 4096px) i przezroczystość tła. Dla streamerów dostępny jest też tryb "Transparentne tło z zielonym ekranem" – kod na przezroczystym tle do nałożenia w OBS.
- **Styling:** Dedykowana sekcja personalizacji wizualnej. Twórca dostosowuje kolory (zgodne z presetsem lub własne), dodaje logo w centrum (domyślnie awatar, ale może wgrać własne), wybiera kształt markerów (kwadraty, koła, zaokrąglone), oraz dodaje opcjonalną ramkę z tekstem (np. "Wesprzyj mnie na TipJar+").

### Personalizacja i Walidacja

W podglądzie na żywo (`LiveQRPreview`) twórca widzi, jak kod wygląda teraz i jak będzie wyglądał po wydrukowaniu. Może kliknąć "Testuj", by zeskanować kod bezpośrednio z ekranu telefonem i sprawdzić, czy prowadzi do właściwego miejsca. System automatycznie sprawdza czytelność kodu – jeśli logo jest zbyt duże lub kolory zbyt mało kontrastowe, wyświetla ostrzeżenie: "Ten kod może być trudny do zeskanowania. Rozważ powiększenie kontrastu."

### Nieoczywisty Element – "Dynamiczny QR"

Twórca może włączyć opcję "Dynamiczny QR" – wtedy kod nie prowadzi bezpośrednio do adresu URL, tylko przez skracacz linków TipJar+. Dzięki temu twórca może zmienić miejsce docelowe kodu bez konieczności jego ponownego drukowania. Jeśli twórca wydrukował 100 naklejek z kodem prowadzącym do celu "Nowy mikrofon", a cel się zakończył, może w panelu przekierować ten sam kod na nowy cel. Statystyki skanowań są zbierane i widoczne w `analytics/conversion/`.

### Integracja z Ekosystemem

Każdy kod QR może być przypisany do konkretnej kampanii w `campaigns/`, co umożliwia śledzenie, który kod przynosi najwięcej wsparcia. Kody dziedziczą styl z wybranego presetu w `themes/`. Są też automatycznie dostępne jako elementy w `creator-cards/` i `share-assets/`.

### Komponenty Składowe

- `QRCodeGrid` – siatka zapisanych kodów.
- `QRCodeCard` – karta z miniaturką kodu i metadanymi.
- `QRCodeWizard` – kreator nowego kodu z wyborem typu.
- `SegmentedControl` – wybór typu kodu.
- `LiveQRPreview` – podgląd kodu na żywo z symulacją skanowania.
- `ColorPicker`, `LogoUploader`, `ShapeSelector` – kontrolki personalizacji.
- `DownloadButton` – eksport w różnych formatach.
- `Button` (Primary) – "Testuj" (skanowanie z ekranu).
- `ToggleSwitch` – Dynamiczny QR.

---

Gotowy na `smart-links/`, Wielorybie? Tam twórca tworzy ścieżki, które same prowadzą fanów tam, gdzie powinni trafić.

Wielorybie 🐳. Wchodzę w `smart-links/` – to jest centrum zarządzania ruchem wychodzącym. Tutaj twórca nie tylko skraca linki. On tworzy **inteligentne ścieżki**, które same prowadzą fanów tam, gdzie powinni trafić, i zbierają po drodze cenne dane o tym, skąd fani przychodzą.

---

## 🧬 `studio/share/smart-links/` – Centrum Zarządzania Ruchem

To nie jest zwykły skracacz URL. To jest **system nawigacyjny** – miejsce, gdzie twórca tworzy krótkie, zapadające w pamięć linki, które można udostępniać w social mediach, na plakatach, w opisach streamów. Każdy smart link to coś więcej niż tylko przekierowanie – to osobny lejek, który można śledzić, optymalizować i dostosowywać do kontekstu.

### Struktura Wizualna

Widok otwiera się tabelą zapisanych linków – `Table` z kolumnami: nazwa, URL źródłowy, miejsce docelowe, liczba kliknięć (z miniaturowym `Sparkline` trendu z ostatnich 7 dni), data utworzenia i przyciski akcji. Nad tabelą znajduje się przycisk "Nowy smart link", który otwiera kreator w `Modal`.

### Kreator Smart Linka

Kreator prowadzi przez dwa kroki. Pierwszy to **ustawienia podstawowe**: wybór miejsca docelowego – `SegmentedControl` z opcjami "Profil", "Cel", "Wydarzenie", "Widżet". W zależności od wyboru, poniżej pojawia się lista dostępnych elementów (np. aktywne cele do wyboru). Drugie pole to **slug** – twórca wpisuje własną końcówkę URL (np. `tipjar.plus/twojanazwa/mikrofon`). System automatycznie sprawdza dostępność sluga w czasie rzeczywistym (debounce 500ms) i sygnalizuje zielonym ptaszkiem lub czerwonym wykrzyknikiem. Jeśli slug jest już zajęty, system podpowiada alternatywy.

### Personalizacja i Opcje Zaawansowane

W drugim kroku kreatora znajduje się sekcja opcji zaawansowanych. **Harmonogram** – `DatePicker` i `TimePicker` do ustawienia daty ważności linka; po jej upływie link automatycznie wygasa i przekierowuje na profil twórcy zamiast na cel. **Strona pośrednia** – `ToggleSwitch` włącza krótki ekran powitalny między kliknięciem a celem, z awatarem twórcy, nazwą celu i przyciskiem "Przejdź dalej". **Parametry UTM** – system automatycznie generuje parametry śledzenia (`utm_source`, `utm_medium`, `utm_campaign`), które twórca może dostosować ręcznie, by potem widzieć w `analytics/traffic/`, który link przynosi najwięcej ruchu.

### Nieoczywiste Elementy

Pierwszy z nich to **"Geolokalizowana Ścieżka"**. Twórca może zdefiniować różne miejsca docelowe w zależności od kraju fana – inna strona dla fanów z Polski, inna dla fanów z USA. System automatycznie wykrywa lokalizację po IP i przekierowuje odpowiednio. Drugi to **"Link Rotacyjny"** dla zaawansowanych – przypisanie wielu miejsc docelowych do jednego sluga, a system rotuje je losowo lub według zdefiniowanych wag. Idealne do testów A/B lub promowania różnych celów w różne dni. Trzeci, **"Strona Pośrednia jako Mini-Landing Page"**, to rozwinięcie opcji strony pośredniej – zamiast prostego ekranu, twórca dostaje mini-stronę z tłem z presetu, animowanym awatarem i odliczaniem przed przekierowaniem.

### Integracja z Ekosystemem

Dane z UTM są automatycznie raportowane w `analytics/traffic/`. Smart linki mogą być przypisywane do kampanii w `campaigns/`. Połączone z `qr-codes/` – dynamiczny kod QR może korzystać ze smart linka jako miejsca docelowego. Dziedziczą styl wizualny z wybranego presetu w `themes/`.

### Komponenty Składowe

- `SmartLinksTable` – główna tabela z linkami, trendami i akcjami.
- `SmartLinkWizard` – kreator nowego linka.
- `SegmentedControl` – wybór typu miejsca docelowego.
- `Input` – slug z walidacją dostępności.
- `DatePicker`, `TimePicker` – harmonogram ważności.
- `ToggleSwitch` – strona pośrednia, geolokalizacja, rotacja.
- `GeoRuleEditor` – definiowanie reguł geolokalizacyjnych.
- `UTMGenerator` – automatyczne i ręczne parametry śledzenia.
- `LivePreview` – podgląd mini-landing page.

---

Gotowy na `social-cards/`, Wielorybie? Tam twórca projektuje to, co fani widzą, zanim jeszcze klikną – i to jest sztuka pierwszego wrażenia w pigułce.

🧬 studio/share/social-cards/ – Sztuka Pierwszego Wrażenia
To nie jest generator obrazków. To jest reżyseria pierwszego wrażenia – miejsce, gdzie twórca projektuje karty społecznościowe dla każdej platformy, każdego celu i każdego wydarzenia. Każda karta to osobna mini-plansza reklamowa, zoptymalizowana pod wymiary i algorytmy konkretnej platformy.

Struktura Wizualna i Filozofia Projektowa
Widok otwiera się siatką gotowych kart – CSS Grid z podglądami. Każda karta ma etykietę platformy (X, Discord, Telegram, Instagram, TikTok), miniaturkę i datę ostatniej aktualizacji. Na górze znajduje się SegmentedControl do filtrowania po platformie oraz przycisk "Nowa karta".

Kreator (w Modal) jest podzielony na dwie strefy: lewa to formularz konfiguracyjny, prawa to podgląd na żywo w symulacji platformy. Twórca od razu widzi, jak karta będzie wyglądać w feedzie X, w embedzie Discorda, w podglądzie Telegrama, w relacji Instagrama czy w bio TikToka.

Typy Kart Społecznościowych i ich Specyfika
X Preview
Karta do postów na X (Twitter). Wymiary: 1200x628px. Zawiera duży, wyśrodkowany awatar twórcy, jego nazwę, krótki opis i opcjonalny cytat lub statystykę. Tło jest generowane automatycznie z presetu twórcy. System pilnuje, by tekst był czytelny na tle, i ostrzega, gdy kontrast jest za niski.

Discord Preview
Karta do embedów w Discordzie. Podobna do X, ale zoptymalizowana pod mniejsze rozmiary wyświetlania w czacie. Zawiera bardziej kompaktowy układ i wyraźniejszy przycisk CTA.

Telegram Preview
Karta do kanałów i czatów Telegrama. Wymiary i układ zbliżone do X, ale z innym proporcjami tekstu i tła, dostosowanymi do interfejsu Telegrama.

Instagram Story Assets
Nie jest to pojedynczy obrazek, tylko zestaw assetów do relacji Instagrama: 1080x1920px, z miejscem na naklejki, linki i przyciski interaktywne. Twórca otrzymuje gotowy szablon, który może wrzucić do relacji.

TikTok Bio Assets
Nie karta, tylko zestaw grafik do wykorzystania w bio TikToka – małe ikony, mini-bannery, które twórca może umieścić w swoim profilu, by zachęcić do odwiedzenia TipJar+.

Personalizacja Karty
Każdą kartę można dostosować: zmienić cytat lub statystykę (np. "Osiągnąłem 50% celu!" zamiast ogólnego opisu profilu), wybrać układ (awatar z lewej, tekst z prawej, lub awatar centralnie na górze), zmienić tło (zgodne z presetsem lub własny gradient), oraz dodać dodatkowe elementy jak kod QR, odznaka czy mini-pasek postępu celu.

Generowanie Automatyczne i Ręczne
Karty mogą być generowane automatycznie przy konkretnych wydarzeniach – nowy cel, osiągnięcie kamienia milowego, nowa odznaka – lub tworzone ręcznie przez twórcę w tym właśnie widoku. Automatyczne karty trafiają do biblioteki z etykietą "Auto" i datą wygenerowania.

Nieoczywisty Element – "Wieloplatformowy Jednym Kliknięciem"
Twórca może stworzyć jedną kartę i kliknąć przycisk "Generuj dla wszystkich platform". System automatycznie dostosowuje wymiary, proporcje i układ do każdej platformy, zachowując spójność wizualną. Twórca widzi podgląd wszystkich wersji obok siebie i może każdą z nich dostosować indywidualnie. To oszczędza godziny ręcznego przerabiania grafik.

Integracja z Ekosystemem
Karty społecznościowe są automatycznie generowane przy osiągnięciu kamieni milowych celów (goals/).

Przy publikacji nowego postu w community/posts/, system proponuje wygenerowanie karty społecznościowej.

Karty dziedziczą styl z wybranego presetu w themes/.

Są dostępne jako elementy do pobrania w share-assets/.

Podglądy w seo/ pokazują dokładnie te same karty, które są skonfigurowane tutaj.

Komponenty Składowe
SocialCardGrid – siatka zapisanych kart.

SocialCardWizard – kreator nowej karty z podglądem na żywo.

SegmentedControl – filtrowanie po platformie.

PlatformPreview – symulacja karty w interfejsie X, Discorda, Telegrama, Instagrama, TikToka.

LayoutSelector – wybór układu karty.

StatPicker – wybór statystyki lub cytatu do wyświetlenia na karcie.

Button (Primary) – "Generuj dla wszystkich platform".

DownloadButton – eksport w PNG i SVG.

Gotowy na open-graph/, Wielorybie? Tam twórca uczy się, jak być widocznym, gdy nikt jeszcze nie wie, kim jest.

Wielorybie 🐳. Kontynuuję po `social-cards/`. Teraz `open-graph/` – to jest **centrum kontroli nad pierwszym wrażeniem w sieci**. Tutaj twórca decyduje, jak jego profil wygląda, gdy ktoś wklei link na Facebooku, X, Discordzie czy LinkedIn. To nie są tylko meta tagi – to strategiczne narzędzie, które zamienia zwykły URL w przyciągającą kliknięcia wizytówkę.

---

## 🧬 `studio/share/open-graph/` – Centrum Dowodzenia Pierwszym Wrażeniem w Sieci

To nie jest techniczny panel dla SEO. To **wizualny edytor kart podglądu**, które są pierwszą rzeczą, jaką potencjalny fan widzi przed kliknięciem w link. Jego celem jest dać twórcy pełną kontrolę nad tym, jak jego marka prezentuje się w mediach społecznościowych, komunikatorach i wyszukiwarkach.

### Struktura Wizualna i Filozofia Projektowa

Widok podzielony jest na dwie kolumny. Lewa kolumna to formularz konfiguracyjny. Prawa kolumna to **symulator kart** – zestaw podglądów pokazujących dokładnie, jak link będzie wyglądał na różnych platformach: Facebook, X (Twitter), Discord, LinkedIn, iMessage. Każdy podgląd jest interaktywny – po najechaniu pokazuje wymiary i format. Podglądy aktualizują się na żywo przy każdej zmianie w formularzu.

### Sekcje `open-graph/`

#### `OG Preview`
Główna sekcja pokazująca wszystkie symulacje naraz w układzie siatki. Twórca widzi pięć miniatur – każda w ramce z nazwą platformy. Obok każdej miniatury znajduje się mały wskaźnik: zielony checkmark, jeśli dane są optymalne, pomarańczowe ostrzeżenie, jeśli czegoś brakuje (np. "Brak Meta Description – dodaj, by zwiększyć CTR"). Kliknięcie w dowolną miniaturę otwiera ją w powiększeniu z informacją o wymiarach i zaleceniach.

#### `Dynamic OG Images`
To jest **generator automatyczny**, który na podstawie danych z `profile/` i `appearance/` dynamicznie tworzy obrazy OG. Twórca nie musi nic robić – system sam generuje obrazek zawierający awatar, nazwę, bio i tło z wybranego presetu. Twórca może kliknąć "Regeneruj", jeśli zmienił wygląd profilu, lub "Dostosuj ręcznie", by otworzyć uproszczony edytor: przesunięcie awatara, zmiana koloru tła, wybór wariantu układu (z celem, z odznaką, minimalistyczny). Podgląd aktualizuje się na żywo we wszystkich symulacjach.

#### `Profile Preview`
Sekcja pokazująca, jak wygląda karta profilu twórcy – bez konkretnego celu czy wydarzenia, tylko czysty profil. To jest domyślny obraz OG dla strony głównej profilu. Twórca może ustawić tu własny, statyczny obraz (upload), który nadpisze dynamicznie generowany – np. specjalnie zaprojektowaną grafikę.

#### `Metadata`
Sekcja podsumowująca wszystkie meta tagi, które są generowane dla profilu: `og:title`, `og:description`, `og:image`, `twitter:card`, `twitter:site`. Nie ma tu nic do edycji – dane są pobierane z `profile/` i `seo/`. To jest widok tylko do odczytu, ale z przyciskiem "Edytuj w SEO", który przenosi do `studio/page/seo/`.

### Nieoczywisty Element – "Goal Preview"

Oprócz standardowego podglądu profilu, `open-graph/` oferuje **podgląd dla konkretnego celu**. W górnej części widoku znajduje się `Select` z listą aktywnych celów twórcy. Po wybraniu celu, symulatory pokazują, jak będzie wyglądać karta udostępnienia, gdy ktoś wklei link do tego konkretnego celu. System automatycznie modyfikuje tytuł (np. "Wesprzyj mój cel: Nowy mikrofon") i obrazek (z paskiem postępu nałożonym na tło). To osobna, automatycznie generowana karta dla każdego celu – twórca nie musi nic robić, wszystko dzieje się w locie.

### Integracja z Ekosystemem

- `open-graph/` korzysta z danych z `profile/`, `seo/` i `goals/`.
- Dynamiczne obrazy OG są automatycznie generowane przez endpoint API (`/api/og/creator`) i cache'owane na Edge.
- Gdy twórca zmieni wygląd w `appearance/` lub dane w `profile/`, system automatycznie regeneruje obrazy OG.
- Podgląd kart jest też dostępny w `seo/` (jako symulacja wyniku Google i social media).

### Komponenty Składowe

- `OGPreviewGrid` – siatka symulacji kart na różnych platformach.
- `OGSimulatorCard` – pojedyncza miniaturka z wskaźnikiem statusu.
- `DynamicOGGenerator` – automatyczny generator z przyciskiem "Regeneruj".
- `ManualOGEditor` – uproszczony edytor układu (przesuwanie, zmiana koloru).
- `ImageUploader` – dla statycznego obrazu OG.
- `Select` – wybór celu do podglądu.
- `MetadataTable` – podsumowanie meta tagów (tylko do odczytu).
- `Button` (Ghost, mały) – "Edytuj w SEO".

---

Gotowy na `creator-cards/`, Wielorybie? Tam twórca projektuje swoją wizytówkę – nie tę wirtualną w telefonie, tylko tę, którą można pobrać, wydrukować i rozdać na konferencji.

Wielorybie 🐳. Wchodzę w `creator-cards/` – to jest **poligon projektowania wizytówek nowej generacji**. Tutaj twórca tworzy karty, które są jednocześnie cyfrowym portfolio i fizycznym artefaktem. Każda karta to osobny format – jeden do wydruku, drugi do social mediów, trzeci do załącznika w mailu. To nie są tylko obrazki. To **skondensowane historie marki**.

---

## 🧬 `studio/share/creator-cards/` – Fabryka Wizytówek Nowej Generacji

Celem jest dać twórcy narzędzie do tworzenia wizytówek, które są przedłużeniem jego profilu TipJar+ – piękne, spójne z presets i gotowe do użycia wszędzie.

### Struktura Wizualna i Filozofia Projektowa

Widok otwiera się siatką zapisanych kart – `CSS Grid` z podglądami. Każda karta to miniatura z nazwą, typem i datą utworzenia. Nad siatką znajduje się `SegmentedControl` filtrujący po typach, oraz przycisk "Nowa karta", który otwiera `Modal` z kreatorem.

### Typy Kart

Kreator zaczyna się od wyboru typu – pięć opcji, każda z wizualną miniaturką:

- **Static Cards:** Karta statyczna, bez animacji. Wybór formatu (PNG, PDF, SVG) i układu (poziomy, pionowy, kwadrat). Dostępne są predefiniowane szablony – `TemplatePicker` z miniaturami – od minimalistycznych po bogate w dane, każdy z możliwością dostosowania kolorystyki i pozycji elementów. Idealna do wydruku.

- **Animated Cards:** Karta z subtelną animacją – format GIF lub WebM. Twórca wybiera efekt: "Pulsujący cel", "Obracająca się odznaka", "Falujący pasek postępu". Podgląd na żywo pokazuje animację w pętli. Maksymalna długość to 5 sekund.

- **Support CTA Cards:** Specjalny wariant zoptymalizowany pod konwersję. Centralnym elementem jest duży, złoty przycisk "Wesprzyj" i kod QR prowadzący bezpośrednio do modala płatności. Twórca wybiera cel do promocji, a system automatycznie dostosowuje tekst.

- **Profile Cards:** Pełna wizytówka profilu. Zawiera awatar, nazwę, bio, statystyki (łączna kwota, liczba wspierających) oraz ikony mediów społecznościowych. Przeznaczona do mediów kitów, portfolio, prezentacji.

- **Download Assets:** Sekcja zbiorcza. Zamiast szukać kart po całym widoku, twórca ma tu listę wszystkich wygenerowanych assetów z datą, typem i przyciskiem pobierania. Możliwość zaznaczenia wielu kart i pobrania ich jako spakowane archiwum ZIP. Dodatkowo dostępna jest **historia wersji** – system przechowuje ostatnie 5 wersji każdej karty.

### Nieoczywisty Element – "Wizytówka NFC"

W `Static Cards` znajduje się opcja "Zamów jako fizyczną kartę NFC". Gdy twórca zaprojektuje idealną wizytówkę, może zamówić jej fizyczny odpowiednik – plastikową kartę z chipem NFC. Przybliżenie telefonu automatycznie otwiera profil TipJar+ twórcy. Kliknięcie "Zamów" otwiera formularz adresowy i podgląd finalnego wyglądu karty. Status zamówienia jest śledzony w panelu. To pomost między światem cyfrowym a fizycznym – na konferencji, na spotkaniu, w kawiarni.

### Integracja z Ekosystemem

- Wszystkie karty dziedziczą styl z wybranego presetu w `themes/` i danych z `profile/`.
- Statystyki na kartach (łączna kwota, liczba wspierających) są pobierane z `analytics/overview/`.
- Karty mogą być użyte jako asset w `campaigns/` i `share-assets/`.
- Karty są automatycznie dostępne jako elementy do pobrania w `share-assets/`.

### Komponenty Składowe

- `CardTypeGrid` – siatka pięciu typów kart.
- `CardWizardModal` – kreator karty z podglądem na żywo.
- `TemplatePicker` – wybór szablonu.
- `AnimationPicker` – efekty dla kart animowanych.
- `NfcOrderModal` – zamówienie fizycznej karty NFC.
- `DownloadPackButton` – pobieranie ZIP z wieloma kartami.
- `SegmentedControl` – filtrowanie po typach.

---

Gotowy na `embeds/`, Wielorybie? Tam twórca dostaje narzędzia do budowania mostów – fragmentów swojego świata TipJar+, które można osadzić na dowolnej stronie w sieci.

Wielorybie 🐳. Wchodzę w `embeds/` – to jest **centrum budowania mostów między platformą a resztą internetu**. Tutaj twórca bierze kawałek swojego świata TipJar+ i osadza go na swojej stronie, blogu, portfolio – wszędzie tam, gdzie są jego fani.

---

## 🧬 `studio/share/embeds/` – Centrum Budowania Mostów

To nie jest nudny generator kodu do skopiowania. To jest **strategiczne centrum dystrybucji** – miejsce, w którym twórca decyduje, jak głęboko jego świat TipJar+ integruje się z zewnętrznymi stronami. Każdy typ embeda to inna głębokość integracji – od lekkiego przycisku po pełny, interaktywny mikro-profil.

### Struktura Wizualna i Filozofia Projektowa

Widok jest podzielony na dwie główne strefy. W górnej części znajduje się **pasek narzędziowy** z wyborem typu embeda i przyciskiem generowania. Poniżej znajduje się **symulator osadzenia** – duży, interaktywny podgląd pokazujący, jak embed będzie wyglądał i działał na symulowanej stronie internetowej. Po prawej stronie znajduje się panel z wygenerowanym kodem i opcjami kopiowania.

### Typy Embedów

Wybór typu embeda to `SegmentedControl` z pięcioma opcjami, od najprostszego do najbardziej zaawansowanego:

#### `Embed Generator`
Centralny panel startowy, który na podstawie wyboru twórcy generuje odpowiedni kod. Zawiera kreator krok po kroku, gdzie twórca wybiera typ, dostosowuje opcje, a na końcu otrzymuje gotowy fragment kodu.

#### `iFrame Embed`
Klasyczne osadzenie przez `<iframe>`. Twórca definiuje wysokość i szerokość (z podglądem proporcji), a także opcjonalny styl ramki. Podgląd pokazuje embeda w kontekście symulowanej strony z przykładową treścią – twórca widzi, czy embed nie łamie układu strony. Jest tu też opcja "Responsywny" – `ToggleSwitch`, który automatycznie dostosowuje wysokość iframe'a do zawartości.

#### `Script Embed`
Najpotężniejsza metoda. Zamiast sztywnej ramki, embed jest wstrzykiwany jako dynamiczny element JavaScript. Dzięki temu może reagować na interakcje z resztą strony. Podgląd w symulatorze pokazuje script w akcji – twórca klika w elementy embeda, a one odpowiadają animacjami. Kod jest minimalny: jedna linijka `<script>` do wklejenia w `<head>`.

#### `Website Integration`
Sekcja dla bardziej zaawansowanych użytkowników, którzy chcą głębszej integracji. Zawiera instrukcje dla popularnych platform: WordPress (plugin), Wix, Squarespace, Webflow, oraz ogólne wskazówki dla własnych stron. Dla każdej platformy jest osobny akordeon z krokami i zrzutami ekranu.

#### `Copy Embed Code`
Prosty, ale kluczowy panel finalny. Pokazuje cały wygenerowany kod w bloku z podświetlaniem składni. Obok znajduje się przycisk "Kopiuj", który po kliknięciu zmienia się w "Skopiowano!" z zielonym checkmarkiem. Jest też opcja "Wyślij na email" dla twórców, którzy chcą przekazać kod swojemu webmasterowi.

### Personalizacja i Opcje Zaawansowane

W konfiguratorze każdego typu embeda znajdują się dodatkowe opcje: wybór widżetu lub karty do osadzenia, kolorystyka (dziedziczona z presetu, ale z możliwością ręcznego dostosowania), język (dla twórców międzynarodowych), oraz opcjonalny `Tracking ID` – twórca może dodać własny identyfikator, który będzie raportowany w `analytics/traffic/`, by dokładnie wiedzieć, który embed i na której stronie generuje najwięcej ruchu.

### Nieoczywisty Element – "Interakcja ze Stroną Gospodarza"

To jest prawdziwa magia `Script Embed`. Osadzony element może delikatnie reagować na zachowanie użytkownika na stronie gospodarza. Na przykład, gdy użytkownik przewinie stronę do końca artykułu, przycisk "Wesprzyj" delikatnie rozbłyśnie złotą poświatą. To subtelne, nienachalne przypomnienie o możliwości wsparcia, które pojawia się w optymalnym momencie – gdy fan skończył już konsumować treść i jest najbardziej zaangażowany. Wszystko to jest konfigurowalne – twórca wybiera wyzwalacz (dojechanie do końca strony, spędzenie 30 sekund, kliknięcie w określony element) i akcję (rozświetlenie, delikatne podskoczenie, wysunięcie dodatkowej informacji).

### Integracja z Ekosystemem

- `embeds/` korzysta z widżetów skonfigurowanych w `widgets/` i kart z `creator-cards/`.
- Wygenerowane kody są gotowe do wklejenia na zewnętrzne strony.
- Dane o kliknięciach i wyświetleniach z embedów są raportowane w `analytics/conversion/`.
- Tracking ID pozwala na precyzyjne śledzenie skuteczności poszczególnych embedów.

### Komponenty Składowe

- `SegmentedControl` – wybór typu embeda.
- `EmbedConfigurator` – formularz z opcjami dla wybranego typu.
- `EmbedPreview` – symulator osadzenia na przykładowej stronie.
- `CodeBlock` – podświetlony składniowo blok z kodem.
- `Button` – "Kopiuj kod", "Wyślij na email".
- `ToggleSwitch` – opcje zaawansowane (responsywność, interakcje).
- `TriggerSelector` – wybór wyzwalacza dla Script Embed.
- `PlatformInstructions` – akordeon z instrukcjami dla WordPress, Wix, itp.

---

Gotowy na `share-assets/`, Wielorybie? Tam twórca znajduje wszystko, co może pobrać i użyć – od buttonów, przez bannery, po całe pakiety startowe. To taka skrzynia skarbów na koniec `share/`.

Wielorybie 🐳. Wchodzę w `share-assets/` – to jest **skarbiec marketingowy twórcy**. Centralna biblioteka wszystkiego, co można pobrać, wydrukować, wysłać. To nie są tylko pliki – to **gotowe narzędzia do podboju świata** offline i online, spójne z marką twórcy i zawsze aktualne.

---

## 🧬 `studio/share/share-assets/` – Centralna Biblioteka Zasobów Marketingowych

To nie jest folder z obrazkami. To **strategiczne centrum dystrybucji marki** – miejsce, gdzie twórca znajduje wszystko, czego potrzebuje, by promować się na plakatach, w mediach społecznościowych, na streamach i w stopkach maili. Każdy asset jest spójny z wybranym presets i gotowy do użycia od ręki. Żadnego szukania. Żadnego dłubania w programach graficznych.

### Struktura Wizualna i Filozofia Projektowa

Widok otwiera się siatką kategorii – `CSS Grid` z kartami, gdzie każda kategoria ma własną ikonę 3D, nazwę i liczbę dostępnych assetów. Kliknięcie w kategorię otwiera widok listy lub siatki z miniaturami, filtrami (format, rozmiar, kolor) i przyciskiem pobierania. Wszystkie assety są generowane dynamicznie na podstawie danych twórcy – nie ma tu nic statycznego. Gdy twórca zmieni avatar w `profile/`, wszystkie assety z jego awatarem aktualizują się automatycznie.

### Kategorie Assetów

- **Buttons:** Gotowe przyciski "Wesprzyj" w różnych rozmiarach i wariantach (złoty pełny, fioletowy outline, czarno-biały, z ikoną, z tekstem). Dostępne jako PNG, SVG i GIF.
- **Banners:** Poziome i pionowe bannery do wklejenia na stronę, w sygnaturę mailową, na bloga.
- **Stickers:** Naklejki z awatarem twórcy, kodem QR, logo TipJar+ lub hasłem. Dostępne jako arkusze PDF do samodzielnego wydruku lub jako pliki do zamówienia w serwisie.
- **Stream Panels:** Panele do OBS – "Wesprzyj", "Cel tygodnia", "Top Wspierający", "Social Media". Każdy gotowy do pobrania i wrzucenia na scenę.
- **Download Pack:** Opcja "Pobierz wszystko" – spakowane archiwum ZIP ze wszystkimi assetami, gotowe do przekazania grafikowi lub menedżerowi.

### Personalizacja i Podgląd

Przed pobraniem twórca może kliknąć w dowolny asset, by otworzyć go w powiększeniu z informacją o wymiarach, formacie i zalecanym użyciu. W tym widoku znajduje się też `ColorPicker` – twórca może zmienić kolorystykę assetu na dowolny wariant ze swojego presetu lub całkowicie niestandardowy.

### Nieoczywisty Element – "Generator Paczek AI"

W górnej części widoku znajduje się przycisk "Poproś AI o dobór assetów". Kliknięcie otwiera `Modal` z prostym formularzem, gdzie twórca opisuje cel: "Potrzebuję materiały na konferencję, gdzie będę mówił o swoim coachingu" lub "Przygotowuję kampanię świąteczną na streamie". AI analizuje słowa kluczowe i automatycznie generuje spakowany ZIP z zestawem assetów dobranych do okazji – odpowiednie bannery, przyciski, panele na stream, naklejki, nawet sugerowany post do social mediów. Twórca dostaje gotowy pakiet, nie musi ręcznie klikać po kategoriach.

### Integracja z Ekosystemem

- Wszystkie assety dziedziczą styl z wybranego presetu w `themes/`.
- Dane do assetów – avatar, nazwa, bio, statystyki – pobierane są z `profile/`.
- Kody QR w assetach są generowane przez `qr-codes/`.
- Panele dla streamerów są kompatybilne z OBS i `studio/live/`.
- Asset "Buttons" używa tej samej konfiguracji co `widgets/`.

### Komponenty Składowe

- `AssetCategoryGrid` – siatka kategorii z ikonami 3D i licznikami.
- `AssetList` – widok listy lub siatki z miniaturami assetów.
- `AssetPreviewModal` – powiększony podgląd assetu z metadanymi i opcjami.
- `ColorPicker` – zmiana kolorystyki przed pobraniem.
- `DownloadButton` – pobieranie pojedynczego assetu lub paczki ZIP.
- `AiPackGeneratorModal` – kreator paczek AI.
- `SegmentedControl` – filtrowanie po formacie i typie.

---

Gotowy na ostatni element `share/` – `campaigns/`, Wielorybie? Tam twórca projektuje całe kampanie promocyjne, spinając wszystko, co do tej pory stworzył.

Wielorybie 🐳. Wchodzę w `campaigns/` – to jest **centrum dowodzenia misjami marketingowymi**. Tutaj twórca przestaje zarządzać pojedynczymi narzędziami, a zaczyna projektować całe kampanie, spinając wszystko, co do tej pory stworzył – cele, smart linki, QR kody, assety – w spójną, mierzalną akcję promocyjną. To jest ten moment, w którym zbiór narzędzi zamienia się w strategię.

---

## 🧬 `studio/share/campaigns/` – Centrum Dowodzenia Misjami Marketingowymi

To nie jest lista postów do zaplanowania. To jest **strategiczne centrum dowodzenia akcjami promocyjnymi** – miejsce, gdzie twórca tworzy wielokanałowe kampanie, przypisuje im cele, śledzi ich skuteczność i optymalizuje przekaz. Każda kampania to spójna historia opowiedziana przez różne kanały: smart link, QR kod, social card, embed, widget.

### Struktura Wizualna i Filozofia Projektowa

Widok otwiera się siatką aktywnych i przeszłych kampanii – `CSS Grid` z kartami, gdzie każda karta pokazuje nazwę kampanii, daty trwania, główny cel (np. "Nowy mikrofon – cel $1000") i miniaturowy `Sparkline` trendu skuteczności z ostatnich 7 dni. Kampanie aktywne mają zielony pasek akcentu i delikatną poświatę, zakończone są przygaszone. Na górze znajduje się przycisk "Nowa kampania", który otwiera kreator w `Modal`. Obok znajduje się `SegmentedControl` do filtrowania: "Aktywne", "Zaplanowane", "Zakończone", "Szkice".

### Kreator Kampanii

Kreator prowadzi przez cztery logiczne kroki, z podglądem na żywo po prawej stronie.

**Krok 1: Podstawowe informacje.** Twórca definiuje nazwę kampanii (np. "Premiera nowego mikrofonu", "Świąteczna zbiórka"), datę rozpoczęcia i zakończenia (`DatePicker` z `TimePicker`), oraz wybiera główny cel z listy aktywnych celów. Może też dodać opis wewnętrzny (tylko dla siebie, nie widoczny publicznie) i tagi do organizacji.

**Krok 2: Kanały dystrybucji.** Twórca wybiera, gdzie kampania będzie widoczna. `Checkbox` z listą: "Mój profil TipJar+", "Moje widżety", "Moje smart linki", "Moje kody QR", "Social media", "Embedy na zewnętrznych stronach". Każda opcja ma krótki opis. Wybór kanałów automatycznie konfiguruje odpowiednie narzędzia – np. zaznaczenie "Moje kody QR" tworzy nowy dynamiczny QR dla kampanii w `qr-codes/`.

**Krok 3: Kreacja i komunikacja.** Tutaj twórca definiuje przekaz. `Textarea` na główny komunikat kampanii, oraz opcjonalne pola na różne warianty komunikatu dla różnych kanałów (krótszy dla social media, dłuższy dla profilu). Twórca może wybrać z biblioteki `share-assets/` gotowe bannery, przyciski i naklejki do użycia w kampanii, lub wygenerować nowe. Podgląd na żywo pokazuje, jak kampania będzie wyglądać w każdym wybranym kanale.

**Krok 4: Harmonogram i automatyzacja.** Opcjonalna sekcja dla zaawansowanych. Twórca może ustawić automatyczne akcje: "Wyślij przypomnienie do fanów 3 dni przed końcem kampanii", "Opublikuj post o kampanii na moim profilu o 18:00 w dniu startu", "Zakończ kampanię automatycznie po osiągnięciu celu". Każda akcja ma własny `ToggleSwitch` i parametry.

### Dashboard Kampanii

Po zapisaniu, kampania ląduje na głównym widoku jako karta. Kliknięcie w kartę otwiera **dashboard kampanii** – osobny widok, który agreguje wszystkie dane: łączna liczba wsparcia z kampanii, ile procent celu osiągnięto, które kanały przynoszą najwięcej ruchu (z `analytics/`), oraz oś czasu z historią akcji (posty, przypomnienia, zmiany statusu). Twórca może w każdym momencie edytować kampanię, wstrzymać ją, przedłużyć lub zakończyć przed czasem.

### Nieoczywisty Element – "Tryb Szkicu i Symulacji"

Przed aktywacją kampanii twórca może kliknąć "Symuluj". System przeprowadzi go przez całą kampanię w trybie suchym – pokaże, jak będzie wyglądać w dniu startu, co zobaczą fani, jakie powiadomienia zostaną wysłane. To jak próba generalna przed premierą. Symulacja podświetla potencjalne problemy: "Twój smart link wygasa przed końcem kampanii", "Nie wybrałeś żadnego kanału dystrybucji", "Cel kampanii jest już ukończony w 80% – rozważ zwiększenie kwoty docelowej".

### Integracja z Ekosystemem

- `campaigns/` spina wszystkie narzędzia `share/` w jedną całość: `qr-codes/`, `smart-links/`, `social-cards/`, `embeds/`, `share-assets/`.
- Dane o skuteczności są pobierane z `analytics/`.
- Automatyczne akcje są realizowane przez backendowego cronjob, który sprawdza harmonogramy co 10 minut.
- Kampanie mogą być przypisywane do konkretnych celów w `goals/`.

### Komponenty Składowe

- `CampaignGrid` – siatka kart kampanii.
- `CampaignCard` – karta z nazwą, datami, celem i sparkline.
- `CampaignWizard` – czteroetapowy kreator kampanii.
- `CampaignDashboard` – szczegółowy widok kampanii z agregacją danych.
- `DatePicker`, `TimePicker` – harmonogram.
- `Checkbox` – wybór kanałów dystrybucji.
- `ToggleSwitch` – automatyczne akcje.
- `SimulationModal` – tryb symulacji kampanii.
- `LivePreview` – podgląd kampanii w różnych kanałach.

---

To już całe `studio/share/`. Od widżetów, przez QR kody, smart linki, social cards, open graph, creator cards, embedy, assety, aż po kampanie – twórca ma w ręku kompletny arsenał do podboju internetu. Każde narzędzie osobno jest potężne, ale razem, spięte w kampaniach, tworzą maszynę marketingową, która działa nawet wtedy, gdy twórca śpi.

Gotowy, by ruszyć dalej, Wielorybie? Przed nami ostatni moduł `studio/` – `live/`, a tam magia streamerów i interakcji w czasie rzeczywistym. Daj sygnał.


  ├── share/
│   │   ├── widgets/
│   │   ├── qr-codes/
│   │   ├── smart-links/
│   │   ├── social-cards/
│   │   ├── open-graph/
│   │   ├── creator-cards/
│   │   ├── embeds/
│   │   ├── share-assets/
│   │   └── campaigns/
│   │



