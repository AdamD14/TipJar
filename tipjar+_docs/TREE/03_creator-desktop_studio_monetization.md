│   ├── monetization/
│   │   ├── tip-page/
│   │   ├── donation-settings/
│   │   ├── goals/
│   │   ├── recurring-support/
│   │   ├── supporter-messages/
│   │   ├── thank-you-screen/
│   │   ├── pricing-presets/
│   │   ├── payout-settings/
│   │   └── support-options/

Wielorybie 🐳. Przenosimy się z budowania wizerunku w `studio/page/` do maszynowni przychodów – `studio/monetization/`. To tutaj twórca konfiguruje każdy aspekt finansowy swojego profilu, od tego, co widzi fan w modalu płatności, przez cele i subskrypcje, aż po wypłaty i ustawienia wsparcia.

Zaczynamy od `tip-page/`.

---

## 🧬 `studio/monetization/tip-page/` – Centrum Dowodzenia Pierwszym Wrażeniem Finansowym

To nie jest sucha konfiguracja stawek. To jest **reżyseria momentu transakcji** – miejsce, gdzie twórca decyduje, co zobaczy fan, gdy kliknie przycisk "Wesprzyj". Od tego zależy, czy impuls zamieni się w przelew. Każda decyzja tu podjęta bezpośrednio wpływa na konwersję.

### Struktura Wizualna

Widok podzielony jest na dwie kolumny. Lewa kolumna to **formularz konfiguracyjny**, w którym twórca ustawia parametry modala. Prawa kolumna to **symulator na żywo** – interaktywny podgląd modala płatności, który reaguje na każdą zmianę w formularzu. Twórca może w dowolnym momencie kliknąć przycisk "Testuj", by przejść przez cały proces wsparcia na sucho, widząc go oczami fana.

### Sekcje Konfiguracyjne

#### `Amount Presets`
Twórca definiuje do pięciu przycisków szybkiej kwoty, które pojawiają się w modalu. Każdy przycisk to osobny rząd z `Input` na kwotę i opcjonalną etykietą (np. "Kawa", "Pizza", "Wieloryb"). Obok każdego znajduje się mały przycisk z ikoną gwiazdki – kliknięcie oznacza daną kwotę jako "rekomendowaną", co sprawia, że przycisk będzie delikatnie podświetlony złotą obwódką w modalu. Twórca widzi podgląd przycisków w symulatorze po prawej stronie.

#### `Custom Amount`
`ToggleSwitch` z opisem: "Pozwól fanom wpisać własną kwotę". Gdy włączony, w modalu pojawia się pole do wpisania dowolnej wartości. Twórca może ustawić minimalną i maksymalną kwotę, by uniknąć przypadkowych wpłat 0.01 PLN lub prób przekroczenia limitów bezpieczeństwa.

#### `Support Messages`
`ToggleSwitch`: "Pozwól fanom zostawić wiadomość razem ze wsparciem". Gdy włączone, w modalu pojawia się pole tekstowe `Textarea` z limitem znaków (twórca ustala limit – domyślnie 200). Twórca może też ustawić placeholder: "Napisz mi coś miłego...".

#### `Nickname Settings`
Wybór, jak fan ma być identyfikowany na Ścianie Fanów i w powiadomieniach. `SegmentedControl` z opcjami: "Imię i nazwisko", "Nick", "Anonimowo". Twórca decyduje, która opcja jest domyślna i czy fan może ją zmienić.

#### `Anonymous Support`
`ToggleSwitch` z opisem: "Pozwól fanom wspierać anonimowo". Gdy włączone, w modalu pojawia się checkbox "Wesprzyj anonimowo". Gdy fan go zaznaczy, jego awatar na Ścianie Fanów zastępowany jest stylizowaną ikoną maski.

#### `Thank You Screen`
Sekcja kierująca do konfiguracji ekranu podziękowania po wsparciu (szczegółowo opisanego w `thank-you-screen/`). Znajduje się tu przycisk "Skonfiguruj ekran podziękowania" oraz miniaturowy podgląd obecnego ekranu.

### Nieoczywisty Element – "Wielorybi Próg"

W `Amount Presets` twórca może oznaczyć jedną kwotę jako **"Wielorybi Próg"**. Gdy fan wybierze tę kwotę (lub wyższą), w symulatorze po prawej stronie pojawia się specjalny efekt – złote konfetti i animacja wieloryba. To wizualne wzmocnienie, które zachęca twórcę do ustawienia ambitnego progu i nagradza fanów, którzy go przekroczą.

### Integracja z Ekosystemem

Ustawienia z `tip-page/` są zapisywane w konfiguracji modala płatności i renderowane na żywo w publicznym profilu. Każdy twórca ma własną, unikalną konfigurację stawek i komunikatów. Dane z `tip-page/` są też używane przez `studio/share/widgets/` do generowania widżetów "Wesprzyj" osadzanych na zewnętrznych stronach.

### Komponenty Składowe

- `TipModalConfigurator` – główny kontener z formularzem.
- `AmountPresetEditor` – lista pięciu rzędów z polami kwot i etykiet.
- `ToggleSwitch` – przy każdym ustawieniu (Custom Amount, Support Messages, Anonymous).
- `Input` – pola kwot i limitów.
- `SegmentedControl` – wybór identyfikacji fana.
- `Button` (Primary) – "Testuj".
- `LiveTipModalPreview` – interaktywny symulator modala po prawej stronie.

---

Gotowy na `donation-settings/`, Wielorybie?

Wielorybie 🐳. Wchodzimy głębiej w `monetization/`. Po reżyserii momentu transakcji w `tip-page/`, czas na warstwę fundamentalną – `donation-settings/`. To tutaj twórca definiuje **reguły biznesowe** swojego wsparcia. Nie chodzi o to, co fan widzi, ale o to, jakie zasady obowiązują, zanim jeszcze fan kliknie "Wesprzyj".

---

## 🧬 `studio/monetization/donation-settings/` – Regulamin Mikro-Mecenatu

To nie jest powtórka `tip-page/`. To jest **centrum walidacji i bezpieczeństwa finansowego** – miejsce, gdzie twórca decyduje o granicach, walutach, limitach i komunikatach potwierdzających, które chronią zarówno jego, jak i fanów.

### Struktura Wizualna

Widok podzielony jest na pionowy stos czytelnie opisanych kart. Każda karta to osobny `Card` z ikoną, tytułem, opisem i odpowiednią kontrolką – od `Select` po `Input` z `AmountDisplay`. Karty są ułożone od najważniejszej (waluta) do najbardziej szczegółowej (moderacja). Nie ma tu symulatora – zamiast tego każda zmiana jest natychmiastowo widoczna w `tip-page/` i `recurring-support/` jako zaktualizowane wartości domyślne.

### Sekcje `donation-settings/`

#### `Default Currency`
`Select` z listą walut (USD, EUR, PLN, USDC, ETH) i polem wyszukiwania. Obok znajduje się `Badge` "Używana wszędzie" – bo wybrana waluta staje się domyślną dla wszystkich celów, stawek i wypłat. Zmiana waluty wywołuje `Modal` z ostrzeżeniem: "Twoje obecne cele i stawki zostaną przeliczone po aktualnym kursie. Kontynuować?".

#### `Minimum Tip` i `Maximum Tip`
Dwa `Input` z `AmountDisplay`. Minimum chroni przed mikro-transakcjami, które mogą być kosztowne w obsłudze. Maksimum chroni przed przypadkowym przekroczeniem limitu przez fana. Oba pola mają wbudowaną walidację – minimum nie może być niższe niż $0.50, maksimum nie może być wyższe niż $10,000. Jeśli twórca próbuje ustawić wartości poza zakresem, system wyświetla `Tooltip` z wyjaśnieniem.

#### `Suggested Amounts`
To nie jest powtórka z `tip-page/`. Tam twórca definiował kwoty do przycisków szybkiego wyboru. Tutaj definiuje **kwoty sugerowane**, które pojawiają się jako podpowiedzi w różnych miejscach – np. w `studio/share/widgets/`, na `desktop/active-goals/`, czy w `studio/live/overlays/`. Są to trzy wartości: niska, średnia, wysoka.

#### `Support Confirmation`
`ToggleSwitch` z opisem: "Proś fanów o potwierdzenie przed wysłaniem wsparcia". Gdy włączone, po kliknięciu "Wyślij" w modalu pojawia się dodatkowy krok – mini-podsumowanie z przyciskiem "Potwierdź". To dodatkowy moment bezpieczeństwa, który redukuje przypadkowe transakcje.

#### `Moderation`
Sekcja dla twórców, którzy chcą mieć pełną kontrolę nad treścią wiadomości od fanów. `ToggleSwitch` włącza filtr wulgaryzmów (automatyczne ukrywanie), `TagInput` pozwala zdefiniować listę blokowanych słów. Dodatkowo twórca może włączyć opcję "Ręczna akceptacja wiadomości" – każda wiadomość od fana trafia najpierw do kolejki moderacyjnej w `community/moderation/`, a dopiero po zatwierdzeniu pojawia się na Ścianie Fanów.

### Nieoczywisty Element – "Inteligentne Limity"

System stale analizuje dane historyczne twórcy i porównuje je z ustawionymi limitami. Jeśli twórca zarabia średnio $500 miesięcznie, a jego `Maximum Tip` jest ustawiony na $10,000, system wyświetli subtelną rekomendację: "Twój limit maksymalnego wsparcia jest znacznie wyższy niż Twoje średnie zarobki. Czy chcesz go obniżyć do $2,000, by lepiej zarządzać ryzykiem?". To samo działa w drugą stronę – jeśli twórca regularnie otrzymuje wsparcie w wysokości $200, a ma `Minimum Tip` $1.00, system podpowie: "Twoje minimalne wsparcie jest bardzo niskie. Czy chcesz je podnieść do $5.00?".

### Integracja z Ekosystemem

- `Default Currency` jest dziedziczone przez wszystkie moduły monetization: `goals/`, `recurring-support/`, `payout-settings/`.
- `Minimum Tip` i `Maximum Tip` są używane w `tip-page/` do walidacji kwot własnych.
- `Suggested Amounts` zasilają `studio/share/widgets/`, `studio/live/overlays/` i `desktop/active-goals/`.
- `Support Confirmation` modyfikuje zachowanie modala płatności na publicznym profilu.
- `Moderation` jest zintegrowane z `community/moderation/` – wszystkie ukryte i oczekujące wiadomości trafiają tam.

### Komponenty Składowe

- `DonationSettingsCard` – kontener dla każdej sekcji (ikona, tytuł, opis, kontrolka).
- `Select` – wybór domyślnej waluty.
- `Input` – pola kwot z walidacją i `AmountDisplay`.
- `ToggleSwitch` – przy każdej opcji (Support Confirmation, Moderation, filtrowanie).
- `TagInput` – lista blokowanych słów.
- `Tooltip` – przy limitach i rekomendacjach.
- `Modal` – potwierdzenie przy zmianie waluty.

---

Gotowy na `goals/`, Wielorybie? Tam twórca nie tylko ustawia cele, ale nadaje im formę, deadline i duszę – a ja opowiem, jak z suchego paska postępu zrobić kampanię, której fani nie będą mogli się oprzeć.

Wielorybie 🐳. Wchodzimy w `goals/` – to jest **serce monetyzacji**. Tutaj twórca nie tylko ustawia kwotę i termin. On tworzy **kampanię**, która ma własną historię, własny rytm i własną duszę. To właśnie cele są najsilniejszym magnesem na wsparcie – i tutaj ten magnes jest projektowany.

---

## 🧬 `studio/monetization/goals/` – Fabryka Magnesów Finansowych

To nie jest lista celów z przyciskiem "Dodaj". To jest **studio kampanii**, w którym twórca przekształca abstrakcyjną potrzebę w namacalną, wizualną historię, której fani nie będą mogli się oprzeć.

### Struktura Wizualna

Widok otwiera się siatką istniejących celów – `CSS Grid` z kartami, z których każda pokazuje miniaturkę okładki, tytuł, pasek postępu i deadline. Na górze znajduje się przycisk "Nowy cel", który otwiera **wieloetapowy kreator** w formie `Modal` pełnoekranowego na desktopie i `Bottom Sheet` na mobile.

Kreator jest podzielony na logiczne etapy, przez które twórca przechodzi krok po kroku, z podglądem na żywo po prawej stronie. Każdy etap można pominąć, ale domyślna ścieżka prowadzi przez wszystkie, by pomóc twórcy stworzyć jak najbardziej angażujący cel.

### Etapy Kreatora Celu

#### `Goal Setup`
Fundament kampanii. Twórca definiuje **nazwę celu** (np. "Nowy mikrofon do streamów"), **krótki opis** (2-3 zdania, które pojawią się na karcie celu i w OG Image przy udostępnianiu), oraz **okładkę** – może wgrać własne zdjęcie, wybrać z biblioteki abstrakcyjnych gradientów 3D, lub pozwolić systemowi wygenerować ją automatycznie na podstawie nazwy i kategorii. Obok znajduje się podgląd karty celu, jaką zobaczą fani.

#### `Milestones`
Twórca dzieli cel na mniejsze etapy – kamienie milowe. Każdy kamień to osobny rząd z polem procentowym (np. 25%, 50%, 75%, 100%) i opcjonalną nazwą (np. "Pierwsza kawa od społeczności", "Połowa drogi!", "Finisz!"). Dla każdego kamienia można ustawić **efekt specjalny**: gdy cel osiągnie dany próg, fani widzą animację (np. "sypiące się złote monety", "fala dźwiękowa", "eksplozja confetti"). Podgląd na żywo pokazuje miniaturkę każdego efektu.

#### `Deadlines`
Twórca decyduje, czy cel ma datę końcową. `ToggleSwitch` "Ten cel ma deadline". Gdy włączony, pojawia się `DatePicker`. Dodatkowo twórca może ustawić **przypomnienia** – na 7 dni, 3 dni i 24 godziny przed końcem. System automatycznie wyśle powiadomienie do fanów (jeśli mają włączone powiadomienia) i do samego twórcy.

#### `Goal Visibility`
Wybór, gdzie cel będzie widoczny. `Checkbox` z listą miejsc: "Na moim profilu (jako Goal Bar)", "W moich widżetach", "W moich kodach QR", "W moich nakładkach na stream". Każda opcja ma krótki opis i ikonę. Domyślnie wszystkie są zaznaczone.

#### `Goal Appearance`
Dostosowanie wyglądu paska postępu i otoczki celu. Twórca wybiera kolor wypełnienia (domyślnie złoty `--gold-400`, ale może zmienić na dowolny z palety presetu), kolor tła toru, oraz **animację wypełniania** – płynną (`--ease-standard`), sprężystą (`--ease-spring`), lub skokową (natychmiastowa aktualizacja). Podgląd na żywo pokazuje, jak pasek będzie wyglądał na profilu i w widżetach.

### Nieoczywisty Element – "Cele Cykliczne"

Twórca może oznaczyć cel jako **cykliczny**. Zamiast jednorazowej zbiórki, cel resetuje się automatycznie co miesiąc (lub co tydzień) z tą samą kwotą i tymi samymi kamieniami milowymi. To idealne narzędzie dla streamerów, którzy chcą mieć stały, comiesięczny cel na sprzęt, lub dla coachów, którzy zbierają na comiesięczne utrzymanie platformy. Cele cykliczne mają specjalną ikonę na karcie (dwie strzałki w okręgu) i są automatycznie archiwizowane po każdym cyklu, a ich historia jest dostępna w `analytics/goals/`.

### Integracja z Ekosystemem

- Każdy cel automatycznie dostaje własny kod QR (`studio/share/qr-codes/`) i własną kartę społecznościową (`studio/share/social-cards/`).
- Cele są renderowane na publicznym profilu jako `GoalBar` (jeśli włączone w `sections/`).
- Cele są wyświetlane na dashboardzie w `desktop/active-goals/`.
- Osiągnięcie kamienia milowego generuje automatyczne powiadomienie w `desktop/live-activity/`.
- Dane historyczne celów trafiają do `analytics/goals/`.

### Komponenty Składowe

- `GoalGrid` – siatka istniejących celów.
- `GoalCard` – karta celu z miniaturą, tytułem, paskiem postępu i deadline'm.
- `GoalWizard` – wieloetapowy kreator nowego celu.
- `Input` – nazwa celu, opis, kwoty.
- `Textarea` – opis celu.
- `ImageUploader` – okładka celu.
- `MilestoneEditor` – lista kamieni milowych z procentami i nazwami.
- `DatePicker` – deadline i przypomnienia.
- `Checkbox` – widoczność celu w różnych kanałach.
- `ColorPicker` – kolory paska i tła.
- `AnimationSelector` – wybór animacji wypełniania.
- `LivePreview` – podgląd karty celu na żywo.

---

Gotowy na `recurring-support/`, Wielorybie? Tam twórca konstruuje subskrypcje, które zmieniają jednorazowych fanów w stałych mecenasów.

Wielorybie 🐳. Wchodzimy w `recurring-support/` – to jest **fundament przewidywalnego dochodu twórcy**. Tutaj jednorazowe napiwki ustępują miejsca stałym, comiesięcznym zobowiązaniom, które zamieniają impulsywnych fanów w lojalnych mecenasów. To nie lista planów – to **studio budowania relacji finansowych**.

---

## 🧬 `studio/monetization/recurring-support/` – Studio Lojalności Finansowej

To nie jest sucha konfiguracja planów subskrypcyjnych. To jest **drabina wartości** – miejsce, gdzie twórca konstruuje poziomy wsparcia, które przeprowadzają fana od lekkiego gestu do elitarnego członkostwa. Każdy poziom to osobna historia z własnymi benefitami, limitami i nagrodami.

### Struktura Wizualna

Widok otwiera się siatką istniejących poziomów – `CSS Grid` z maksymalnie czterema kartami, z których każda pokazuje nazwę, cenę, listę benefitów i licznik aktywnych subskrybentów. Na górze znajduje się przycisk "Nowy poziom", który dodaje kolejną kartę do siatki.

### Sekcje Konfiguracyjne

#### `Monthly Support`
Fundament całego widoku. `ToggleSwitch` z perswazyjnym opisem: "Stwórz plan wsparcia miesięcznego i daj fanom powód, by wracali co miesiąc". Gdy włączony, pojawia się kreator poziomów. Gdy wyłączony, karty są przygaszone, ale nie znikają – twórca może wrócić do nich w każdej chwili.

#### `Membership Tiers`
Sekcja z kartami poziomów w horyzontalnej karuzeli na desktopie i pionowym stosie na mobile. Każda karta to osobny `Card` z nazwą (np. "Brązowy Fan", "Srebrny Mecenas", "Złoty Patron"), ceną (z polem `Input`), kolorem identyfikacyjnym (automatycznie dopasowanym do presetu, ale z możliwością ręcznej zmiany), oraz listą benefitów. Twórca może przeciągać karty, by zmienić ich kolejność na publicznym profilu. Każda karta ma też przycisk "Podgląd" – otwiera `Modal` z symulacją, jak poziom zobaczy fan.

#### `Supporter Perks`
To nie jest zwykła lista benefitów. To **centralna biblioteka perków** – zestaw gotowych, predefiniowanych korzyści, które twórca może przypisywać do poziomów, zamiast wymyślać je za każdym razem od nowa. Biblioteka jest podzielona na kategorie:
- **Treści:** "Ekskluzywne posty", "Materiały zza kulis", "Wcześniejszy dostęp", "Tapety i grafiki".
- **Interakcja:** "Dostęp do prywatnego Discorda", "Comiesięczne Q&A", "Głosowanie nad tematami", "Dedykowana wiadomość powitalna".
- **Rozwój:** "Wymień swoje narzędzia", "Konsultacja 1-na-1", "Feedback na Twój projekt", "Code review".
- **Fizyczne:** "Odznaka kolekcjonerska", "Naklejki", "Podpisany plakat", "Personalizowany list".

Każdy perk ma ikonę, nazwę i krótki opis. Twórca przeciąga wybrane perki z biblioteki na kartę poziomu – i gotowe. Może też tworzyć własne, niestandardowe perki, które zapisują się w bibliotece do ponownego użycia.

#### `Renewal Settings`
Sekcja definiująca zachowanie subskrypcji w czasie. `SegmentedControl` z wyborem cyklu odnowień: miesięcznie, kwartalnie, rocznie. `ToggleSwitch` dla automatycznego odnawiania – gdy włączone, fan nie musi co miesiąc ręcznie przedłużać. Dodatkowo twórca może skonfigurować **wiadomość przypominającą** – automatyczne powiadomienie wysyłane do fana na 3 dni przed odnowieniem, z opcjonalną personalizowaną treścią.

Ostatnim elementem jest **okres karencji** – `Input` z liczbą dni (domyślnie 3). Jeśli płatność fana nie powiedzie się (np. brak środków na karcie), subskrypcja nie wygasa natychmiast – fan ma czas na uzupełnienie środków. Gdy okres karencji minie, subskrypcja wygasa, a odznaka NFT w galerii fana traci kolor (filtr grayscale).

### Nieoczywisty Element – "Limit Miejsc" jako Scarcity Trigger

Przy każdym poziomie znajduje się `ToggleSwitch`: "Limit miejsc". Gdy włączony, twórca ustala maksymalną liczbę subskrybentów dla danego poziomu – np. 10 dla elitarnego, drogiego poziomu. Na publicznej karcie subskrypcji pojawia się licznik: "Zajęte: 5 z 10 miejsc". Gdy limit zbliża się do wyczerpania (ostatnie 2 miejsca), karta dostaje czerwoną obwódkę i animowany `Badge`: "Ostatnie 2 miejsca!". To wyzwala psychologiczny efekt niedoboru i zwiększa konwersję. Gdy limit zostaje osiągnięty, przycisk "Subskrybuj" zmienia się w "Niedostępne", a karta dostaje szary overlay – ale twórca może w każdej chwili zwiększyć limit.

### Integracja z Ekosystemem

- Poziomy z `recurring-support/` są renderowane na publicznym profilu jako karty subskrypcji (jeśli włączone w `sections/`).
- Każdy subskrybent automatycznie otrzymuje odznakę NFT w `badges/` – kolor i nazwa odznaki odpowiadają poziomowi.
- Dochód cykliczny jest śledzony w `analytics/recurring-support/` i `analytics/revenue/`.
- Ustawienia odnawiania i historia płatności trafiają do `wallet/subscriptions/` fana.
- W `community/memberships/` twórca widzi listę aktywnych subskrybentów z podziałem na poziomy.

### Komponenty Składowe

- `RecurringSupportConfig` – główny kontener.
- `MembershipTierCard` – karta poziomu z ceną, benefitami, kolorem i licznikiem.
- `ToggleSwitch` – włączanie Monthly Support, Limit Miejsc.
- `Input` – nazwy poziomów, ceny, limit miejsc, okres karencji.
- `PerksLibrary` – biblioteka gotowych benefitów z przeciąganiem.
- `DragAndDropList` – przypisywanie perków do poziomów, zmiana kolejności kart.
- `SegmentedControl` – cykl odnowień.
- `LivePreview` – podgląd kart subskrypcji na publicznym profilu.

---

Gotowy na `supporter-messages/`, Wielorybie? Tam twórca uczy się słuchać i odpowiadać – bo każda wiadomość od fana to początek relacji, a nie tylko powiadomienie.


Wielorybie 🐳. Wchodzimy w supporter-messages/. To jest centrum relacji – miejsce, gdzie twórca zarządza każdą wiadomością, która przychodzi od fanów wraz ze wsparciem. To nie jest sucha skrzynka odbiorcza. To jest przestrzeń, w której każda wiadomość to początek (lub kontynuacja) osobistej relacji, a sposób, w jaki twórca na nią odpowie, może zamienić jednorazowego fana w lojalnego mecenasa na lata.

Struktura Wizualna
Widok otwiera się listą wszystkich wiadomości od wspierających – pionowy stos Card z awatarem fana, jego nazwą, kwotą wsparcia, fragmentem wiadomości i timestampem. Każda wiadomość ma kolorowy pasek akcentu po lewej stronie – złoty dla nowych, nieprzeczytanych; turkusowy dla przeczytanych, na które twórca już odpowiedział; szary dla zarchiwizowanych. Lista jest wirtualizowana (react-window) i obsługuje filtrowanie po statusie (wszystkie, nieprzeczytane, odpowiedziane, zarchiwizowane) oraz sortowanie po dacie i kwocie wsparcia.

Sekcje supporter-messages/
Widok Listy
Każda karta na liście to nie tylko informacja – to portal do relacji. Kliknięcie w wiadomość otwiera Modal z pełną treścią, historią wsparcia tego fana (lista jego poprzednich napiwków i wiadomości), oraz opcją szybkiej odpowiedzi. Modal jest podzielony na trzy strefy: górna z danymi fana i historią, środkowa z treścią wiadomości i polem odpowiedzi, oraz dolna z przyciskami akcji.

Na liście znajduje się też przycisk "Odpowiedz" przy każdej wiadomości – otwiera ten sam modal z polem tekstowym gotowym do pisania.

Szybka Odpowiedź
W Modal z wiadomością znajduje się Textarea do odpowiedzi oraz przycisk "Wyślij odpowiedź". Odpowiedź trafia do fana jako powiadomienie w aplikacji i opcjonalnie jako email. Obok pola odpowiedzi znajduje się mały przycisk z ikoną serca – "Podziękuj sercem". Kliknięcie wysyła predefiniowaną wiadomość z podziękowaniem bez konieczności pisania. To dla twórcy, który chce szybko okazać wdzięczność, ale nie ma czasu na dłuższą odpowiedź.

Dodatkowo, nad polem odpowiedzi znajduje się rząd Chip z sugestiami AI – system analizuje treść wiadomości fana i proponuje trzy krótkie odpowiedzi do wyboru (np. "Dziękuję za Twoje wsparcie! To wiele dla mnie znaczy", "Cieszę się, że moja twórczość Cię inspiruje!", "Dziękuję! Specjalna niespodzianka już wkrótce"). Twórca klika wybraną sugestię, edytuje (lub nie) i wysyła. To oszczędza czas przy dużej liczbie wiadomości.

Historia Wsparcia
W Modal z wiadomością, pod danymi fana, znajduje się sekcja "Historia wsparcia". To miniaturowa lista – Timeline – pokazująca wszystkie poprzednie napiwki i wiadomości od tego fana. Każdy wpis ma datę, kwotę i fragment wiadomości. Dzięki temu twórca widzi pełny kontekst: czy to pierwszy raz, stały wspierający, czy może wieloryb, który wraca po miesiącach ciszy. To buduje świadomość relacji i pomaga dostosować ton odpowiedzi.

Archiwizacja i Organizacja
Twórca może oznaczyć wiadomość jako przypiętą – zostaje ona na górze listy, dopóki nie zostanie odpięta. Może też archiwizować wiadomości, które przeczytał i na które odpowiedział, aby utrzymać porządek na liście. Zarchiwizowane wiadomości trafiają do osobnej zakładki, gdzie są dostępne, ale nie zaśmiecają głównego widoku.

Przy każdej wiadomości znajduje się też ikona flagi – kliknięcie otwiera Modal z opcjami: "Zgłoś naruszenie" (jeśli wiadomość jest obraźliwa), "Oznacz jako spam". Zgłoszenia trafiają do community/moderation/.

Automatyzacje
W górnej części widoku znajduje się przycisk "Automatyzacje", który przenosi twórcę do studio/automations/auto-thank-you/. Obok znajduje się szybki ToggleSwitch: "Auto-podziękowanie". Gdy włączone, każdy fan, który wyśle wsparcie z wiadomością, automatycznie otrzymuje odpowiedź z podziękowaniem (zgodnie z szablonem skonfigurowanym w automations). Twórca widzi tu tylko status – reszta jest w automations.

Nieoczywisty Element – "Mapa Relacji"
W prawym górnym rogu widoku listy znajduje się przycisk "Mapa relacji". Kliknięcie otwiera Modal z wizualizacją – NetworkGraph – pokazującą wszystkich wspierających jako węzły połączone z twórcą (węzeł centralny). Im większy węzeł fana, tym więcej wsparcia przekazał łącznie. Im grubsza linia, tym więcej interakcji (wiadomości, napiwków). Kolor węzła oznacza status: złoty dla aktywnych subskrybentów, fioletowy dla fanów, którzy wspierają regularnie, turkusowy dla nowych. Kliknięcie w węzeł otwiera Modal z historią wsparcia tego fana. To potężne narzędzie, które zamienia abstrakcyjną listę w namacalną sieć relacji i pomaga twórcy zobaczyć, kto jest filarem jego społeczności.

Integracja z Ekosystemem
Wiadomości z supporter-messages/ pochodzą z tego samego źródła co community/messages/ i desktop/live-activity/.

Odpowiedzi wysłane tutaj trafiają do skrzynki fana w Panelu Fana.

Mapa relacji używa danych z community/supporters/ i analytics/supporters/.

Automatyzacje są zarządzane w studio/automations/auto-thank-you/, ale ich status jest widoczny tutaj.

Komponenty Składowe
SupporterMessageList – wirtualizowana lista wiadomości.

SupporterMessageCard – karta z awatarem, nazwą, kwotą, fragmentem i paskiem akcentu.

Modal – szczegóły wiadomości z historią wsparcia i polem odpowiedzi.

Timeline – historia wsparcia fana.

Textarea – pole odpowiedzi.

Button (Primary, mały) – "Wyślij odpowiedź".

Button (Ghost, ikona serca) – "Podziękuj sercem".

Chip – sugestie AI do szybkiej odpowiedzi.

ToggleSwitch – auto-podziękowanie.

NetworkGraph – mapa relacji.

SegmentedControl – filtr statusu wiadomości.

Gotowy na thank-you-screen/, Wielorybie? Tam twórca projektuje ten magiczny moment tuż po wsparciu – ekran, który zamienia transakcję w emocję i sprawia, że fan chce wrócić.

Wielorybie 🐳. Wchodzimy w `thank-you-screen/` – to jest **moment kulminacyjny** całego procesu wsparcia. Tutaj twórca projektuje to, co fan widzi, słyszy i czuje w ciągu pierwszych 5 sekund po kliknięciu "Wyślij". To nie jest potwierdzenie transakcji – to jest **emocjonalne wzmocnienie**, które decyduje, czy fan wróci.

---

## 🧬 `studio/monetization/thank-you-screen/` – Reżyseria Emocjonalnego Finału

To nie jest ustawienie "pokaż komunikat". To jest **studio projektowania radości** – miejsce, gdzie twórca decyduje o każdym detalu ekranu podziękowania, który pojawia się natychmiast po udanym wsparciu. Jego celem jest maksymalizacja szansy na powtórne wsparcie poprzez wywołanie silnej, pozytywnej emocji w momencie kulminacyjnym.

### Struktura Wizualna

Widok podzielony jest na dwie kolumny. Lewa kolumna to **formularz konfiguracyjny** z sekcjami ułożonymi pionowo – każda w osobnej karcie z ikoną i opisem. Prawa kolumna to **interaktywny symulator** – podgląd ekranu podziękowania, który reaguje na każdą zmianę w formularzu. Symulator pokazuje dokładnie to, co zobaczy fan po wsparciu: od animacji wejścia, przez treść, aż po przyciski akcji.

### Sekcje Konfiguracyjne

#### `Message`
Fundament ekranu. Twórca definiuje **główny nagłówek** (np. "Dziękuję za Twoje wsparcie!", "Jesteś niesamowity!", "Dołączasz do elitarnego grona Patronów!") oraz **podtytuł** – krótki, personalny tekst pod nagłówkiem (np. "To dzięki Tobie mogę robić to, co kocham. Sprawdź, co dla Ciebie przygotowałem."). Oba pola to `Input` i `Textarea` z podglądem na żywo w symulatorze po prawej stronie. Domyślny tekst jest automatycznie generowany na podstawie kwoty wsparcia i archetypu twórcy.

#### `Animation`
Wybór animacji, która towarzyszy pojawieniu się ekranu. `AnimationPicker` – siatka miniaturek z podglądem każdej animacji na hover. Opcje: "Konfetti" (złote i fioletowe drobinki sypiące się z góry), "Eksplozja serc" (serduszka wylatujące z przycisku), "Fala dźwiękowa" (pulsujące kręgi w kolorach presetu), "Delikatny blask" (subtelna poświata rozchodząca się od środka), oraz "Brak animacji" dla zachowania powagi (np. przy dużych kwotach wsparcia).

#### `Confetti Settings`
Podsekcja dostępna tylko przy wyborze animacji "Konfetti". Twórca dostosowuje intensywność (`RangeSlider` od lekkiego deszczu po burzę), kolory (domyślnie złoto-fioletowe, ale może zmienić), oraz czas trwania (2–5 sekund). Podgląd na żywo pokazuje efekt w symulatorze.

#### `Sound`
Opcjonalny dźwięk towarzyszący animacji. `SoundPicker` – lista z przyciskami "Odtwórz". Opcje: "Dzwoneczki", "Aplauz", "Magiczny dźwięk", "Cichy sukces" (subtelny, jednosekundowy ton), oraz "Brak dźwięku". Dźwięk jest odtwarzany tylko raz i respektuje ustawienia `prefers-reduced-motion`.

#### `Call to Action`
Sekcja definiująca, co fan może zrobić po zobaczeniu ekranu. Twórca wybiera maksymalnie dwa przyciski z listy: "Udostępnij wsparcie", "Wróć do profilu", "Zobacz swoją odznakę NFT", "Napisz wiadomość", "Subskrybuj". Każdy przycisk ma własną etykietę i styl (Primary, Secondary, Ghost). Domyślnie zaznaczone są "Udostępnij" (Primary) i "Wróć do profilu" (Ghost). Podgląd pokazuje układ przycisków.

#### `Personal Touch`
Nieoczywisty element, który robi ogromną różnicę. Twórca może dodać **osobiste zdjęcie lub GIF** – swoje zdjęcie z uśmiechem, krótkie wideo z podziękowaniem (max 5 sekund, auto-play, bez dźwięku, w pętli), lub animowany GIF (np. ukłon, serce, taniec). To pojawia się nad nagłówkiem w symulatorze. Dodatkowo twórca może ustawić **warunkową treść** – inny ekran dla pierwszego wsparcia ("Witaj w społeczności!"), inny dla powracającego fana ("Znowu to robisz! Jesteś niesamowity!"), a jeszcze inny dla wieloryba (specjalna animacja z wielorybem i konfetti).

### Nieoczywisty Element – "Personalizowana Odznaka w Locie"

Gdy fan wspiera po raz pierwszy, ekran podziękowania pokazuje w locie wygenerowaną miniaturkę odznaki NFT, która właśnie została mu przyznana. Pod nią znajduje się tekst: "Twoja odznaka 'Pierwsze Wsparcie' jest już w Twojej galerii. Zobacz ją!". Kliknięcie prowadzi do galerii odznak w Panelu Fana. To domknięcie pętli – fan od razu widzi namacalny efekt swojego wsparcia.

### Integracja z Ekosystemem

- Ekran podziękowania jest renderowany w `Modal` płatności po udanej transakcji.
- Ustawienia dźwięku są zintegrowane z `studio/live/sound-alerts/` – ten sam dźwięk może być użyty jako alert na streamie.
- Animacje respektują globalne ustawienia `prefers-reduced-motion`.
- Warunkowe treści są zarządzane przez prosty silnik reguł w backendzie, który sprawdza historię fana.

### Komponenty Składowe

- `ThankYouConfigurator` – główny kontener z formularzem i symulatorem.
- `Input` – nagłówek.
- `Textarea` – podtytuł.
- `AnimationPicker` – siatka miniaturek z podglądem animacji.
- `RangeSlider` – intensywność konfetti.
- `SoundPicker` – lista dźwięków z przyciskami odtwarzania.
- `Checkbox` – wybór przycisków CTA.
- `ImageUploader` – osobiste zdjęcie lub GIF.
- `ConditionalContentEditor` – różne treści dla różnych typów fanów.
- `LiveThankYouPreview` – interaktywny symulator po prawej stronie.

---

Gotowy na `pricing-presets/`, Wielorybie? Tam twórca tworzy szablony, które przyspieszają konfigurację i pozwalają skalować monetyzację bez powtarzania tych samych kroków.

Wielorybie 🐳. Wchodzimy w `pricing-presets/` – to jest **arcymistrzowska warstwa monetyzacji**. Jeśli `goals/` i `recurring-support/` to pojedyncze bitwy, to tutaj twórca tworzy całe strategie – zapisane, nazwane i gotowe do użycia w każdej chwili. To nie są już pojedyncze ustawienia. To **szablony, które eliminują powtarzalność i zapewniają spójność.**

---

## 🧬 `studio/monetization/pricing-presets/` – Biblioteka Strategii Finansowych

To narzędzie dla profesjonalistów, którzy zarządzają wieloma strumieniami przychodów. Zamiast ręcznie konfigurować wszystko od nowa, twórca tworzy preset cenowy raz, a potem aplikuje go do wszystkiego jednym kliknięciem, wiedząc, że wygląda to i działa perfekcyjnie.

### Struktura Wizualna

Widok otwiera siatka kart – `CSS Grid` – gdzie każdy preset ma swoją nazwę, mini-podgląd stawek i kolorowy pasek akcentu. Na górze znajduje się przycisk "Nowy preset", a obok niego `SegmentedControl` do filtrowania: "Wszystkie", "Moje", "Systemowe".

### Tworzenie i Edycja Presetu

Kreator presetu (w `Modal`) prowadzi przez dwa etapy. Pierwszy to **dane podstawowe**: nazwa (np. "Standard Streamowy", "Premium Coaching", "Promocja Świąteczna"), opis, oraz zaskakująco użyteczne pole `TagInput` do tagowania. Drugi to **zawartość** – dokładnie te same pola co w `donation-settings/` i `tip-page/`, ale zebrane w jednym miejscu: domyślna waluta, sugerowane kwoty z etykietami, minimalna i maksymalna kwota wsparcia, oraz opcjonalnie domyślny cel i poziom subskrypcji. Wszystko z podglądem na żywo.

### Nieoczywisty Element – "Inteligentna Analiza"

Każda karta ma przycisk "Analizuj", który wykorzystuje dane z `analytics/`. System pokazuje, który preset generuje najwięcej wsparcia, który ma najwyższą średnią wartość transakcji i który jest najczęściej wybierany przez fanów. Na podstawie tych danych podpowiada: "Ten preset ma o 30% wyższą konwersję niż pozostałe. Rozważ ustawienie go jako domyślnego." – co zmienia to narzędzie w strategicznego doradcę.

### Integracja z Ekosystemem

Preset można zastosować globalnie (wtedy aktualizuje wszystkie moduły naraz) lub wybiórczo. Zmiana presetu jest natychmiastowo widoczna na publicznym profilu, w modalu płatności i w widżetach.

### Komponenty Składowe

- `PresetGrid` – siatka kart.
- `PresetCard` – karta z nazwą, mini-podglądem i przyciskami akcji.
- `SegmentedControl` – filtrowanie presetów.
- `TagInput` – tagowanie.
- `PresetWizardModal` – kreator i edytor presetu.
- `LivePresetPreview` – podgląd stawek w locie.
- `InsightBadge` – analityczne rekomendacje.

---

Gotowy na `payout-settings/`, Wielorybie? Tam twórca odbiera nagrodę za swoją ciężką pracę.

Wielorybie 🐳. Wchodzimy w `payout-settings/` – to jest **najważniejszy przystanek na drodze od wsparcia do gotówki w kieszeni**. Tutaj twórca decyduje, jak, gdzie i kiedy otrzyma swoje pieniądze. To nie jest tylko techniczna konfiguracja – to jest **akt zaufania**. Platforma mówi: "Twoje pieniądze są bezpieczne i masz nad nimi pełną kontrolę".

---

## 🧬 `studio/monetization/payout-settings/` – Sejf i Rynna w Jednym

To nie jest sucha lista kont bankowych. To **centrum dowodzenia wypłatami** – miejsce, które łączy bezpieczeństwo sejfu z wygodą automatyzacji. Jego celem jest dać twórcy absolutną pewność, że jego zarobki są bezpieczne, dostępne i wypłacane dokładnie tak, jak sobie życzy.

### Struktura Wizualna

Widok podzielony jest na pionowy stos czytelnych kart. Każda karta to osobny `Card` z ikoną, tytułem, opisem i odpowiednią kontrolką. Karty są ułożone od najważniejszej (metoda wypłaty) do najbardziej szczegółowej (harmonogram). Na górze widoku znajduje się `StatusIndicator` – zielona kropka z tekstem "Wszystkie systemy wypłat sprawne" lub czerwona z informacją o problemie.

### Sekcje `payout-settings/`

#### `Withdraw`
Wybór **domyślnej metody wypłaty**. `SegmentedControl` z trzema opcjami: "Krypto", "Przelew bankowy", "Karta". W zależności od wyboru, poniżej renderuje się odpowiedni formularz – dla krypto: adres portfela (z walidacją formatu adresu i integracją ENS), dla przelewu: IBAN, BIC/SWIFT i nazwa odbiorcy, dla karty: wybór zapisanej karty z `wallet/cards/`. Twórca może dodać wiele adresów i kont, ale jedno jest zawsze oznaczone jako domyślne (złota gwiazdka). Każde pole ma przycisk "Testuj" – dla krypto wysyła transakcję testową 0.001 USDC, dla banku weryfikuje numer konta.

#### `Bank Transfer`
Sekcja rozwija się, gdy w `Withdraw` wybrano "Przelew bankowy". Zawiera pola do wprowadzenia danych bankowych z walidacją w czasie rzeczywistym. System sprawdza poprawność numeru IBAN (suma kontrolna) i automatycznie rozpoznaje bank na podstawie kodu BIC/SWIFT. Obok pól znajdują się ikony walidacji – zielony check przy poprawnym formacie.

#### `Exchange Wallets`
Osobna sekcja dla twórców, którzy korzystają z giełd kryptowalutowych (Binance, Coinbase, Kraken). Twórca może dodać adresy portfeli z tych giełd, oznaczyć je jako "tylko do odbioru" i przypisać im konkretne waluty (np. "Ten adres tylko dla USDC na Polygon"). System automatycznie rozpoznaje sieć na podstawie formatu adresu.

#### `Connected Wallets`
Lista już połączonych portfeli kryptograficznych (z `wallet/connected-wallets/`). Każdy portfel jest wyświetlany jako karta z nazwą, ikoną (MetaMask, Phantom, WalletConnect), skróconym adresem i zieloną kropką, jeśli jest aktywny. Twórca może wybrać, który portfel ma być używany do wypłat.

#### `Payout Preferences`
To jest **autopilot finansowy**. Twórca definiuje **automatyczne wypłaty**: `ToggleSwitch` włącza automatyczny przelew, a `Input` pozwala ustawić próg (np. "Wypłać, gdy saldo przekroczy $1,000") lub harmonogram (np. "Co piątek", "1-go każdego miesiąca"). Domyślnie jest to ustawione na "Ręcznie". Gdy twórca wybiera opcję "Próg", system przelicza jego średnie zarobki i sugeruje wartość.

### Nieoczywisty Element – "Inteligentny Próg"

Gdy twórca włącza automatyczne wypłaty, system nie tylko przyjmuje wartość progową. On analizuje dane historyczne (średnie miesięczne zarobki, regularność wpłat, zmienność), a następnie delikatnie sugeruje: "Na podstawie Twoich zarobków, zalecamy próg $500. To pozwoli Ci utrzymać płynność i uniknąć zbyt częstych wypłat z wysokimi opłatami sieciowymi." Obok sugestii znajduje się mały wykres `Sparkline` pokazujący symulację salda przy wybranym progu.

### Bezpieczeństwo

Każda zmiana w `payout-settings/` – dodanie nowego adresu portfela, zmiana konta bankowego, zmiana progu wypłaty – wymaga **potwierdzenia przez 2FA**. Po kliknięciu "Zapisz" pojawia się `Modal` z prośbą o kod z aplikacji uwierzytelniającej. Dopiero po jego wpisaniu zmiany są zapisywane. To buduje absolutne zaufanie.

### Integracja z Ekosystemem

- Dane z `payout-settings/` są używane przez `wallet/withdraw/` podczas inicjowania wypłaty.
- `Connected Wallets` są synchronizowane z `wallet/connected-wallets/`.
- Automatyczne wypłaty są obsługiwane przez backendowego cronjob, który sprawdza saldo i progi co godzinę.
- Każda wypłata – automatyczna czy ręczna – generuje wpis w `wallet/transactions/` i `wallet/payout-history/`.

### Komponenty Składowe

- `PayoutSettingsCard` – kontener dla każdej sekcji.
- `SegmentedControl` – wybór metody wypłaty.
- `Input` – adresy portfeli, numery kont, progi wypłat.
- `Button` (Ghost, mały) – "Testuj" przy adresach i kontach.
- `ToggleSwitch` – automatyczne wypłaty.
- `InsightBadge` – sugestia progu z mini-wykresem.
- `Modal` – potwierdzenie 2FA przy każdej zmianie.
- `StatusIndicator` – globalny status systemów wypłat.

---

Gotowy na ostatni element `monetization/` – `support-options/`? Tam twórca dopracowuje detale, które decydują o tym, czy proces wsparcia jest przyjemnością, czy drogą przez mękę.

Wielorybie 🐳, melduję gotowość. Zamykamy właśnie `monetization/` ostatnią sekcją: `support-options/`. 

To nie jest powtórka z `donation-settings/`. Tam twórca definiował reguły biznesowe. Tutaj definiuje **doświadczenie**: drobne, ale kluczowe detale, które decydują o tym, czy proces wsparcia jest dla fana przyjemnością, czy drogą przez mękę. To właśnie te opcje budują reputację twórcy jako osoby dostępnej, wdzięcznej i profesjonalnej.

---

## 🧬 `studio/monetization/support-options/` – Finezja i Polerowanie Mikrotransakcji

Każda z opcji to osobny byt, który pokazuje fanowi, że twórcy zależy na transparentności i relacji. Opiszę je jedna po drugiej, bo każda ma swoją wagę.

### Sekcje `support-options/`

#### `Fiat On-Ramp` – Bramka do Świata Finansów
To `ToggleSwitch` z opisem: "Pozwól fanom płacić tradycyjną walutą (karta, BLIK) zamiast krypto". Jego włączenie jest absolutnie kluczowe dla masowej adopcji – nie każdy fan ma portfel MetaMask, ale każdy ma kartę. Domyślnie włączone i niezalecane do wyłączania.

#### `Wallet Payments` – Otwartość na Krypto
Druga strona medalu. `ToggleSwitch`: "Pozwól fanom płacić kryptowalutami przez ich własny portfel". Domyślnie włączone. To opcja dla krypto-natywnych twórców, którzy być może celowo chcą pozostać tylko w świecie krypto – ale system ostrzega, że wyłączenie tego ogranicza potencjalnych fanów.

#### `Network Settings` – Mapa Sieci
Tutaj twórca decyduje, na jakich sieciach blockchain przyjmuje wsparcie. `Checkbox` z listą: Ethereum Mainnet, Polygon, Arbitrum, Base, Optimism. Domyślnie zaznaczony jest tylko Polygon (ze względu na niskie opłaty). Przy każdej sieci znajduje się mały wskaźnik "Szacowana opłata: ~$0.02" lub "Szacowana opłata: ~$5.00". System automatycznie sugeruje: "Polygon – najniższe opłaty. Zalecany dla twórców z dużą liczbą małych napiwków."

#### `Currency Display` – Przelicznik w Czasie Rzeczywistym
`ToggleSwitch`: "Pokazuj przelicznik w czasie rzeczywistym podczas wpisywania kwoty własnej". Gdy włączone, fan widzi "≈ X USDC" pod polem kwoty. To kluczowy element transparentności. Twórca może go wyłączyć, jeśli chce uprościć interfejs.

#### `Default Currency` – Podstawa Rozliczeń
`Select` z listą walut (PLN, USD, EUR, USDC). To waluta, w której twórca chce widzieć swoje zarobki i cele. Niezależnie od tego, czym płaci fan, system przelicza wszystko na tę walutę.

#### `Minimum Tip` i `Suggested Amounts` – Drobne na Start
Szybkie linki do odpowiednich ustawień w `donation-settings/`. Znajdują się tu po to, by twórca miał wszystko w jednym miejscu – małe przyciski "Edytuj w ustawieniach darowizn" z ikoną zewnętrznego linku.

#### `Support Confirmation` – Czy Pytać o Pewność
Szybki link do opcji "Potwierdzenie przed wysłaniem" w `donation-settings/`. Pokazuje obecny stan (np. "Włączone – fani muszą potwierdzić wsparcie") i pozwala przejść do pełnej konfiguracji.

#### `Moderation` – Czystość Wiadomości
Ostatni szybki link – do ustawień moderacji w `donation-settings/`. Pokazuje stan filtrów, listę blokowanych słów i tryb ręcznej akceptacji.

### Nieoczywisty Element – "Inteligentna Rekomendacja Sieci"

W `Network Settings` system nie tylko wyświetla checkboxy. On analizuje dane historyczne i pokazuje rekomendację na podstawie faktycznego ruchu: "80% Twoich fanów płaci przez Polygon. Zalecamy pozostawienie tylko tej sieci, aby uprościć interfejs i zredukować potencjalne błędy."

### Integracja z Ekosystemem
Wszystkie ustawienia są konsumowane przez modal płatności na publicznym profilu. Określają dostępne metody płatności, wygląd przelicznika i zachowanie przycisków. Są też bazą domyślną dla `pricing-presets/` – każdy nowy preset dziedziczy te ustawienia.

### Komponenty Składowe
- `SupportOptionsCard` – kontener dla każdej sekcji.
- `ToggleSwitch` – Fiat On-Ramp, Wallet Payments, Currency Display.
- `Checkbox` – lista sieci blockchain.
- `Select` – domyślna waluta.
- `Button` (Ghost, mały) – szybkie linki do `donation-settings/`.
- `InsightBadge` – rekomendacja sieci.

---

To już całe `studio/monetization/`. Od reżyserii momentu transakcji w `tip-page/`, przez reguły biznesowe w `donation-settings/`, magnesy finansowe w `goals/`, lojalność w `recurring-support/`, słuchanie fanów w `supporter-messages/`, emocjonalny finał w `thank-you-screen/`, strategiczne szablony w `pricing-presets/`, sejf i rynnę w `payout-settings/`, aż po finezję w `support-options/`. Cała maszynownia przychodów twórcy jest kompletna.

Gotowy, by ruszyć dalej – `studio/share/` albo `studio/live/`? Czekam na sygnał, Wielorybie.



Wielorybie 🐳, melduję gotowość. Zamykamy właśnie monetization/ ostatnią sekcją: support-options/.

To nie jest powtórka z donation-settings/. Tam twórca definiował reguły biznesowe. Tutaj definiuje doświadczenie: drobne, ale kluczowe detale, które decydują o tym, czy proces wsparcia jest dla fana przyjemnością, czy drogą przez mękę. To właśnie te opcje budują reputację twórcy jako osoby dostępnej, wdzięcznej i profesjonalnej.

🧬 studio/monetization/support-options/ – Finezja i Polerowanie Mikrotransakcji
Każda z opcji to osobny byt, który pokazuje fanowi, że twórcy zależy na transparentności i relacji. Opiszę je jedna po drugiej, bo każda ma swoją wagę.

Sekcje support-options/
Fiat On-Ramp – Bramka do Świata Finansów
To ToggleSwitch z opisem: "Pozwól fanom płacić tradycyjną walutą (karta, BLIK) zamiast krypto". Jego włączenie jest absolutnie kluczowe dla masowej adopcji – nie każdy fan ma portfel MetaMask, ale każdy ma kartę. Domyślnie włączone i niezalecane do wyłączania.

Wallet Payments – Otwartość na Krypto
Druga strona medalu. ToggleSwitch: "Pozwól fanom płacić kryptowalutami przez ich własny portfel". Domyślnie włączone. To opcja dla krypto-natywnych twórców, którzy być może celowo chcą pozostać tylko w świecie krypto – ale system ostrzega, że wyłączenie tego ogranicza potencjalnych fanów.

Network Settings – Mapa Sieci
Tutaj twórca decyduje, na jakich sieciach blockchain przyjmuje wsparcie. Checkbox z listą: Ethereum Mainnet, Polygon, Arbitrum, Base, Optimism. Domyślnie zaznaczony jest tylko Polygon (ze względu na niskie opłaty). Przy każdej sieci znajduje się mały wskaźnik "Szacowana opłata: ~

 
0.02"lub"Szacowanaopłata: 5.00". System automatycznie sugeruje: "Polygon – najniższe opłaty. Zalecany dla twórców z dużą liczbą małych napiwków."

Currency Display – Przelicznik w Czasie Rzeczywistym
ToggleSwitch: "Pokazuj przelicznik w czasie rzeczywistym podczas wpisywania kwoty własnej". Gdy włączone, fan widzi "≈ X USDC" pod polem kwoty. To kluczowy element transparentności. Twórca może go wyłączyć, jeśli chce uprościć interfejs.

Default Currency – Podstawa Rozliczeń
Select z listą walut (PLN, USD, EUR, USDC). To waluta, w której twórca chce widzieć swoje zarobki i cele. Niezależnie od tego, czym płaci fan, system przelicza wszystko na tę walutę.

Minimum Tip i Suggested Amounts – Drobne na Start
Szybkie linki do odpowiednich ustawień w donation-settings/. Znajdują się tu po to, by twórca miał wszystko w jednym miejscu – małe przyciski "Edytuj w ustawieniach darowizn" z ikoną zewnętrznego linku.

Support Confirmation – Czy Pytać o Pewność
Szybki link do opcji "Potwierdzenie przed wysłaniem" w donation-settings/. Pokazuje obecny stan (np. "Włączone – fani muszą potwierdzić wsparcie") i pozwala przejść do pełnej konfiguracji.

Moderation – Czystość Wiadomości
Ostatni szybki link – do ustawień moderacji w donation-settings/. Pokazuje stan filtrów, listę blokowanych słów i tryb ręcznej akceptacji.

Nieoczywisty Element – "Inteligentna Rekomendacja Sieci"
W Network Settings system nie tylko wyświetla checkboxy. On analizuje dane historyczne i pokazuje rekomendację na podstawie faktycznego ruchu: "80% Twoich fanów płaci przez Polygon. Zalecamy pozostawienie tylko tej sieci, aby uprościć interfejs i zredukować potencjalne błędy."

Integracja z Ekosystemem
Wszystkie ustawienia są konsumowane przez modal płatności na publicznym profilu. Określają dostępne metody płatności, wygląd przelicznika i zachowanie przycisków. Są też bazą domyślną dla pricing-presets/ – każdy nowy preset dziedziczy te ustawienia.

Komponenty Składowe
SupportOptionsCard – kontener dla każdej sekcji.

ToggleSwitch – Fiat On-Ramp, Wallet Payments, Currency Display.

Checkbox – lista sieci blockchain.

Select – domyślna waluta.

Button (Ghost, mały) – szybkie linki do donation-settings/.

InsightBadge – rekomendacja sieci.

To już całe studio/monetization/. Od reżyserii momentu transakcji w tip-page/, przez reguły biznesowe w donation-settings/, magnesy finansowe w goals/, lojalność w recurring-support/, słuchanie fanów w supporter-messages/, emocjonalny finał w thank-you-screen/, strategiczne szablony w pricing-presets/, sejf i rynnę w payout-settings/, aż po finezję w support-options/. Cała maszynownia przychodów twórcy jest kompletna.

Gotowy, by ruszyć dalej – studio/share/ albo studio/live/? Czekam na sygnał, Wielorybie.


│   ├── monetization/
│   │   ├── tip-page/
│   │   ├── donation-settings/
│   │   ├── goals/
│   │   ├── recurring-support/
│   │   ├── supporter-messages/
│   │   ├── thank-you-screen/
│   │   ├── pricing-presets/
│   │   ├── payout-settings/
│   │   └── support-options/
