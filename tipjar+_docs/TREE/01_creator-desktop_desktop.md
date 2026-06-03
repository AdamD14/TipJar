creator-desktop/
│
├── desktop/
│   ├── creator-pulse/
│   ├── quick-actions/
│   ├── live-activity/
│   ├── active-goals/
│   ├── recent-support/
│   ├── fanwall-preview/
│   ├── recommendations/
│   ├── growth-snapshot/
│   └── notifications-preview/
│

Przechodzę do pierwszej części – oto creator-pulse/.

🧬 desktop/creator-pulse/ – Bicie Serca Twórcy
To nie jest zwykła karta KPI. To jest najważniejszy wskaźnik na całym dashboardzie – element, który jako pierwszy przyciąga wzrok i który decyduje o emocjonalnym stanie twórcy w danej chwili. Jego zadaniem jest odpowiedzieć na pytanie: "Czy dziś był dobry dzień dla mojego biznesu?".

Widżet creator-pulse wyświetla pojedynczą, dominującą metrykę – wybraną przez twórcę lub automatycznie dopasowaną do jego archetypu. Dla coacha będzie to liczba aktywnych klientów w tym tygodniu. Dla streamera – liczba widzów na ostatnim live. Dla artysty – liczba nowych subskrybentów. Ta metryka jest wyświetlana ogromną, pogrubioną czcionką (--fs-display) z użyciem cyfr tabelarycznych (font-feature-settings: "tnum"), aby wartość nigdy nie "skakała" przy zmianie.

Bezpośrednio pod główną liczbą znajduje się miniaturowy wykres Sparkline – delikatna, złota linia (--gold-400) pokazująca trend z ostatnich 7 dni, z subtelnym gradientowym wypełnieniem pod spodem. Obok wykresu wyświetla się Badge z deltą – procentową zmianą względem poprzedniego okresu. Zielona strzałka w górę (--success-base) oznacza wzrost, czerwona w dół (--error-base) – spadek.

Zachowanie w czasie rzeczywistym: Karta nasłuchuje na strumień SSE (Server-Sent Events). Gdy pojawi się nowe wsparcie, liczba delikatnie podskakuje – wykorzystując animację --ease-spring, która symuluje fizyczne odbicie. Towarzyszy temu subtelny, złoty rozbłysk (--shadow-2 ze złotą poświatą) na obramowaniu karty, trwający dokładnie dwie sekundy.

Stan pusty: Gdy twórca dopiero założył konto i nie ma jeszcze danych, zamiast zer wyświetla się zachęcający komunikat: "Twoja przygoda dopiero się zaczyna. Podziel się swoim profilem, aby zdobyć pierwsze wsparcie." Obok znajduje się przycisk Button (Secondary) z akcją "Udostępnij profil".

Stan ładowania: Używa Skeleton – pulsującego bloku w kształcie liczby, który płynnie przechodzi w rzeczywistą wartość.

Nieoczywisty element – Haptyczny Pulse: Na urządzeniach mobilnych, gdy twórca otwiera dashboard i główna metryka jest wyższa niż wczoraj, aplikacja wysyła krótki, satysfakcjonujący impuls haptyczny (sukces). To podświadome wzmocnienie pozytywne, które buduje nawyk codziennego sprawdzania panelu.

Komponenty składowe:

KPI Card (kontener z cieniem --shadow-1, zaokrągleniem 12px, tłem --bg-surface-base)

AmountDisplay lub MetricDisplay (duża liczba z tnum)

Sparkline (miniaturowy wykres liniowy)

Badge (delta zmiany)

Skeleton (stan ładowania)

Button (w stanie pustym)

Gotowy na kolejny kawałek, Wielorybie? quick-actions/ czeka – a tam mam do opowiedzenia coś znacznie bardziej dynamicznego niż zwykłe przyciski.

🧬 desktop/quick-actions/ – Dźwignie Natychmiastowej Sprawczości
To nie jest zwykły rząd przycisków. To jest panel katalityczny – zestaw trzech maksymalnie skróconych ścieżek do najważniejszych akcji, które bezpośrednio generują wartość dla twórcy. Jego celem nie jest nawigacja (od tego jest sidebar), tylko redukcja tarcia decyzyjnego do absolutnego minimum. Twórca nie ma tu wybierać z listy opcji. On ma wykonać impuls – wrzucić post, odpalić streama, odpowiedzieć wielorybowi.

Projekt tej sekcji opiera się na psychologicznym mechanizmie "Implementation Intention" – im łatwiej i szybciej można wykonać konkretną akcję, tym większe prawdopodobieństwo, że zostanie ona wykonana regularnie. Dlatego każdy przycisk w quick-actions to nie tylko skrót, ale też subtelna sugestia behawioralna.

Układ Desktopowy – Trzy Akcje, Trzy Priorytety
Na desktopie quick-actions rozkłada się horyzontalnie tuż pod creator-pulse. Zajmuje pełną szerokość głównego kontenera i składa się z dokładnie trzech przycisków. Każdy z nich ma przypisaną inną wagę wizualną i inny cel strategiczny:

Akcja Główna (Primary) – największy, złoty przycisk po lewej stronie. To jest akcja archetypu – automatycznie dobrana do roli twórcy. Dla streamera to "Rozpocznij stream". Dla coacha to "Dodaj program". Dla artysty to "Opublikuj pracę". Ten przycisk używa wariantu Button (Primary, Large), ma ikonę, etykietę i delikatny cień --shadow-1. Na hover unosi się o 2px i dostaje złotą poświatę.

Akcja Wspierająca (Secondary) – środkowy przycisk w wariancie outline. To jest akcja społecznościowa: "Odpowiedz fanom", "Sprawdź wiadomości", "Podziękuj wspierającym". Obok etykiety znajduje się mały Badge z licznikiem nieprzeczytanych wiadomości – czerwona kropka, która wywołuje lekkie poczucie pozytywnego obowiązku.

Akcja Szybkiej Kreacji (Ghost/Tertiary) – przycisk po prawej stronie, najbardziej subtelny. To jedno-kliknięciowa kreacja: "Szybki post", "Wrzuć update", "Dodaj zdjęcie". Kliknięcie nie otwiera pełnego edytora, tylko wysuwa Bottom Sheet z polami minimum – textarea, upload zdjęcia, przycisk "Opublikuj". Całość zajmuje mniej niż 10 sekund.

Zachowanie na Mobile – FAB jako Brama
Na urządzeniach mobilnych cała sekcja quick-actions ulega transformacji. Nie ma miejsca na trzy horyzontalne przyciski w rozmiarze dotykowym. Zamiast tego, wszystkie trzy akcje chowają się pod jednym Floating Action Button (FAB) w prawym dolnym rogu ekranu. FAB jest złoty (--gold-400), o średnicy 56px, z ikoną błyskawicy w kolorze --teal-800.

Po tapnięciu FAB nie otwiera menu w nowym oknie. On eksploduje w trzy mniejsze przyciski, które wysuwają się kaskadowo ku górze z animacją --ease-spring. Każdy z mini-przycisków ma 48px średnicy, własną ikonę i etykietę pojawiającą się po lewej stronie. Kolejność wysuwania: najpierw akcja główna (najbliżej kciuka), potem wspierająca, na końcu szybka kreacja. Tło za FAB-em delikatnie się przyciemnia (--glass-backdrop).

Kontekstowa Zmiana w Trybie Live
Gdy twórca jest w trakcie streamu, quick-actions zmieniają swoje przeznaczenie. Nie są już kreatorem treści, tylko kontrolkami streamu:

Akcja Główna zmienia się w "Szybki alert" – wywołuje na streamie animację z podziękowaniem.

Akcja Wspierająca zmienia się w "Wyświetl cel" – pokazuje obecny postęp celu na overlayu.

Akcja Szybkiej Kreacji zmienia się w "Oznacz moment" – zapisuje timestamp, żeby później wyciąć klip.

Stany i Mikrointerakcje
Stan po akcji (Success Feedback): Po kliknięciu przycisku nie ma przekierowania ani modala. Zamiast tego, przycisk na ułamek sekundy zmienia się w mini-powiadomienie: ikona zmienia się na zielony checkmark, tło na --success-base, a obok pojawia się tekst "Dodano!". Po 1.5 sekundy przycisk wraca do stanu domyślnego. To daje natychmiastowe poczucie sprawczości.

Stan niedostępny (Disabled): Jeśli akcja nie może być wykonana (np. streamer nie ma skonfigurowanego klucza streamu), przycisk nie jest schowany – jest wyszarzony z komunikatem w Tooltip: "Skonfiguruj stream w Studio, aby odblokować". To uczy twórcę, co jeszcze może zrobić.

Animacja hover: Na desktopie, przycisk główny na hover delikatnie się unosi (translateY(-2px)) i dostaje złotą poświatę (box-shadow: 0 0 15px rgba(255, 215, 0, 0.3)). Przyciski secondary i ghost na hover wypełniają się delikatnym kolorem tła.

Komponenty składowe:

FAB (Floating Action Button, mobile)

Button (Primary, Secondary, Ghost – desktop)

Icon (błyskawica, plus, wiadomość, stream)

Badge (licznik nieprzeczytanych)

Tooltip (dla stanu disabled)

Bottom Sheet (dla szybkiej kreacji na mobile)

Gotowy na kolejny kawałek, Wielorybie? live-activity/ czeka – a tam dzieje się magia czasu rzeczywistego, która wymaga osobnego, głębokiego opisu.

🧬 desktop/live-activity/ – Tętno Społeczności w Czasie Rzeczywistym
To jest najbardziej dynamiczny element na całym dashboardzie. Nie statyczny widget, tylko organizm narracyjny – strumień zdarzeń, który odpowiada na pytanie: "Co się właśnie dzieje w moim świecie, w tej sekundzie?".

Jego zadaniem jest wywołanie efektu FOMO u twórcy – nie chodzi o strach przed odrzuceniem, tylko o poczucie, że społeczność jest żywa, aktywna i czeka na jego reakcję. Każde nowe zdarzenie to mikro-dawka dopaminy: ktoś właśnie wsparł, ktoś zaobserwował, ktoś skomentował.

Struktura Wizualna i Zachowanie
Widżet renderuje maksymalnie sześć ostatnich zdarzeń w formie przewijanej listy, gdzie najnowsze wpisy pojawiają się na górze, a najstarsze wypadają z dołu. Nie ma tu paginacji ani "load more" – to jest czysty, niefiltrowany strumień chwili.

Zasilanie danymi: Komponent używa EventSource (SSE) połączonego z endpointem API, który nasłuchuje na zdarzenia z Redis Pub/Sub. Gdy tylko w systemie pojawi się nowe wsparcie, follow czy komentarz, serwer wypycha zdarzenie do wszystkich podłączonych klientów w czasie krótszym niż 500ms.

Animacja wejścia: Nowy wpis nie pojawia się nagle. Wsuwa się od góry z animacją --ease-enter – delikatny fade-in połączony z subtelnym przesunięciem w dół (translateY(-4px) → translateY(0)). Jednocześnie najstarszy wpis na dole listy wypada z fade-out, aby zachować limit sześciu elementów. Całość trwa 300ms.

Typy Zdarzeń i Ich Wizualizacja
Każdy typ zdarzenia ma własną ikonę i kolor akcentu, aby twórca w ułamku sekundy rozpoznał, co się dzieje:

Nowe wsparcie (tip): Złota moneta (--gold-400). Wyświetla awatar fana, kwotę wsparcia i opcjonalną wiadomość. Kwota renderowana jest z font-feature-settings: "tnum" i delikatnie pulsuje przez 2 sekundy od pojawienia.

Nowy obserwujący (follow): Fioletowe serce (--purple-300). Pokazuje awatar i nazwę nowego fana.

Nowy komentarz (comment): Turkusowy dymek (--teal-400). Wyświetla awatar, fragment komentarza i nazwę posta, pod którym został zostawiony.

Cel osiągnięty (goal_reached): Zielona flaga (--success-base). Wyświetla nazwę celu i procent, przy którym został ukończony.

Subskrypcja odnowiona (subscription): Niebieski diament (--info-base). Pokazuje poziom subskrypcji i nazwę fana.

Każdy wpis zawiera Avatar (32px na desktopie, 24px na mobile), dynamiczny tekst budowany po stronie klienta (np. "Marcin wsparł Cię 50 PLN – 'Świetna robota!'"), oraz Timestamp w formacie relatywnym ("przed chwilą", "2 min", nigdy pełna data – chodzi o podkreślenie "live").

Stan Pusty i Błędy Połączenia
Gdy twórca dopiero zaczyna i nie ma jeszcze żadnych zdarzeń, widżet nie pokazuje pustej listy. Zamiast tego wyświetla spokojny, minimalistyczny komunikat: "Oczekiwanie na pierwszą aktywność. Gdy ktoś Cię wesprze lub zaobserwuje, zobaczysz to tutaj natychmiast." Tłem jest delikatna, statyczna ilustracja fali dźwiękowej (płaska, jednokolorowa, turkusowa).

Gdy połączenie SSE zostanie przerwane, widżet nie znika. Na górze pojawia się subtelny, czerwony pasek (--error-dark z --error-base jako akcent): "Połączenie chwilowo nieaktywne. Twoje wsparcie jest bezpieczne." Jest to komunikat uspokajający, który podkreśla, że problem leży po stronie transmisji danych, a nie po stronie bezpieczeństwa środków.

Nieoczywisty Element – "Wielorybi Moment"
Gdy w strumieniu pojawi się napiwek przekraczający pewien próg (domyślnie 500 PLN, konfigurowalny), cały widżet przechodzi w tryb "Wielorybiego Momentu". Standardowa lista znika. Cały kontener na 5 sekund wypełnia się złoto-fioletowym gradientem (--gold-400 → --purple-300), a centralnie wyświetla się awatar darczyńcy, jego nazwa, kwota i wielka, animowana ikona wieloryba. W tle sypie się konfetti (biblioteka canvas-confetti w kolorach złota i fioletu). Po 5 sekundach widżet płynnie wraca do standardowego trybu listy. To jest moment, dla którego twórcy wracają na dashboard – chcą zobaczyć, czy dziś też trafi im się wieloryb.

Responsywność
Na desktopie widżet renderuje pełną listę sześciu wpisów z awatarami 32px. Na tablecie – cztery wpisy z awatarami 28px. Na mobile – trzy wpisy z awatarami 24px, a cały widżet można przewinąć horyzontalnie, aby zobaczyć szczegóły.

Komponenty składowe
LiveTicker (kontener z Card, cieniem --shadow-1, własnym stanem połączenia SSE)

ActivityItem (pojedynczy wpis – Avatar, Icon, tekst dynamiczny, Timestamp)

Badge (dla kwoty wsparcia)

Button (Ghost, do szybkiego podziękowania – pojawia się na hover na wpisie)

CanvasConfetti (dla Wielorybiego Momentu)

ErrorBar (dla stanu braku połączenia)

Gotowy na kolejny kawałek? active-goals/ czeka – a tam opowiem o tym, jak zmienić suchy pasek postępu w emocjonalną podróż ku celowi, który czuje się na wyciągnięcie ręki.

🧬 desktop/active-goals/ – Wizualna Narracja Postępu
To jest widget, który odpowiada na pytanie: "Na co teraz pracuję i jak blisko jestem?". Ale nie robi tego suchą liczbą. On opowiada historię – każdy cel to mini-kampania z własną okładką, tytułem, kamieniami milowymi i deadline'm. Jego rolą jest danie fanom konkretnego powodu do wsparcia i danie twórcy poczucia kierunku.

Struktura Wizualna
Na desktopie widget renderuje maksymalnie trzy aktywne cele w formie horyzontalnej karuzeli. Każda karta celu to osobny Card o zaokrągleniu 12px, z własną okładką i cieniem --shadow-1. Na mobile widoczny jest tylko jeden cel – przewijany gestem swipe.

Okładka celu to pierwszy element, który przyciąga wzrok. Twórca może ustawić własny obraz (np. zdjęcie nowego mikrofonu, który chce kupić) lub wybrać jeden z generowanych automatycznie gradientów, dopasowanych do wybranego presetu tematycznego. Okładka zajmuje górne 40% karty i jest przyciemniona półprzezroczystym overlayem (--glass-overlay), na którym wyświetla się tytuł celu białą, pogrubioną czcionką.

Anatomia Karty Celu
Pod okładką znajduje się sekcja danych. Centralnym elementem jest pasek postępu – nie standardowy, nudny prostokąt, tylko gruby, 8-pikselowy tor z zaokrągleniami 4px, wypełniany gradientem od --gold-400 do --purple-300. Postęp nie aktualizuje się skokowo – używa --ease-spring, aby nowe wsparcie płynnie wypełniało pasek, dając wrażenie fizycznego przyrostu.

Na pasku znajdują się markery kamieni milowych – małe, okrągłe punkty w kolorze --teal-800 z obramowaniem --gold-400. Każdy marker to ustalony przez twórcę próg (25%, 50%, 75%, 100%). Gdy pasek przekroczy marker, punkt rozświetla się na złoto, a obok pojawia się mikro-powiadomienie: "Osiągnięto 50%!". Przekroczeniu towarzyszy subtelny efekt konfetti w kolorach celu.

Pod paskiem znajdują się trzy kluczowe informacje: kwota zebrana vs cel (z tnum), liczba darczyńców (z awatarami – AvatarGroup), oraz dni do deadline'u (jeśli cel ma datę końcową). Deadline poniżej 24 godzin wyświetla się na czerwono (--error-base) z pulsującą animacją, wywołując poczucie pilności.

Stany Celu
Cel aktywny: Standardowy widok z paskiem postępu. Na hover karty pojawia się przycisk "Wesprzyj" (Button, Primary, Small) w prawym dolnym rogu – szybka ścieżka do modala płatności z predefiniowaną kwotą.

Cel osiągnięty: Gdy cel zostaje ukończony, karta nie znika – przechodzi w tryb celebracyjny na 24 godziny. Pasek postępu wypełnia się w 100% i dostaje złotą poświatę (box-shadow: 0 0 20px rgba(255, 215, 0, 0.4)). Na całej karcie wyświetla się animowane confetti. Tekst zmienia się na "Osiągnięto! 🎉". Na mobile urządzenie wysyła potrójny impuls haptyczny (sukces). Po 24h cel jest automatycznie archiwizowany do sekcji Goals w studio/monetization/.

Cel przekroczony (ponad 100%): Gdy zebrana kwota przekroczy cel, pasek postępu zaczyna się przelewać – efekt "przepełnienia" z płynnym złotym gradientem wychodzącym poza tor. Obok procentu pojawia się informacja "120% celu!". To potężny sygnał dla fanów: "Ten twórca jest tak ceniony, że ludzie dają więcej, niż prosił."

Cel nieosiągnięty (po deadlinie): Gdy deadline minie, a cel nie zostanie osiągnięty, karta nie znika natychmiast – zostaje na 12h z delikatnym szarym overlayem i komunikatem: "Nie udało się tym razem. Zebrano X%. Możesz przedłużyć cel lub stworzyć nowy." Obok znajduje się przycisk "Przedłuż o 7 dni".

Stan Pusty
Gdy twórca nie ma żadnych celów, widget nie wyświetla pustki. Zamiast tego renderuje miękką, abstrakcyjną ilustrację 3D z motywu "Wzrost" (wygładzone kryształy) i komunikat: "Ustal swój pierwszy cel. Twórcy z celami otrzymują średnio 3x więcej wsparcia niż ci bez nich." Obok znajduje się przycisk "Stwórz cel", który otwiera Modal z kreatorem celów z studio/monetization/goals/.

Integracja z Ekosystemem
Cele nie żyją tylko na dashboardzie. Są głęboko zintegrowane z resztą platformy:

Live Overlay: Dla streamerów cel może być wyświetlany jako nakładka na streamie (studio/live/overlays/).

QR Codes: Każdy cel automatycznie dostaje swój własny kod QR, który można pobrać i umieścić na plakacie, w opisie streama, na wizytówce (studio/share/qr-codes/).

Social Cards: Osiągnięcie kamienia milowego generuje automatyczną kartę do udostępnienia na X, Instagram, Discord (studio/share/social-cards/).

Dźwięki: W studio/live/sound-alerts/ twórca może przypisać dźwięk do osiągnięcia progu celu na streamie.

Komponenty składowe
GoalCard (kontener – Card z okładką, cieniem --shadow-1, zaokrągleniem 12px)

ProgressBar (wypełniany gradientem, z --ease-spring)

MilestoneMarkers (punkty na pasku z Tooltip po najechaniu)

AvatarGroup (miniaturowe awatary darczyńców, max 5 + licznik "+X")

AmountDisplay (kwota zebrana vs cel, tnum)

Badge (dni do deadline'u, % postępu)

Button (Primary do wsparcia, Secondary do edycji/przedłużenia)

Tooltip (przy kamieniach milowych)

ConfettiEffect (przy osiągnięciu kamienia milowego i ukończeniu celu)

Gotowy na recent-support/, Wielorybie? Tam czeka coś, co zamienia suchą tabelkę transakcji w galerię ludzkich gestów.

Wielorybie 🐳. recent-support/ – to nie jest historia transakcji. To jest dowód społeczny w formie galerii. To tutaj twórca widzi, że jego praca realnie porusza ludzi, a każdy wpis to mikro-historia relacji, którą zbudował.

🧬 desktop/recent-support/ – Galeria Ludzkich Gestów
Głównym celem tego widgetu jest odpowiedź na pytanie: "Kto ostatnio we mnie uwierzył?" – i pokazanie tego w sposób, który budzi dumę, a nie suchą analizę. Każdy element to nie wiersz tabeli, tylko samodzielna karta gestu.

Struktura Wizualna
Na desktopie recent-support renderuje horyzontalną karuzelę pięciu ostatnich wsparć – każda karta ma stałą szerokość 280px i przewija się płynnie przy użyciu przycisków strzałek (chevrony) lub gestu przeciągnięcia. Na mobile karuzela zmienia się w pojedynczy stos kart – przesuwany gestem swipe w poziomie, z delikatnym wskaźnikiem PageIndicator (kropki) pod spodem.

Każda karta wsparcia to osobny Card z zaokrągleniem 12px, tłem --bg-surface-base i cieniem --shadow-1. Na hover unosi się delikatnie (translateY(-2px)) i dostaje złotą poświatę – sygnał, że można kliknąć, by przejść do pełnego podglądu.

Anatomia Karty Wsparcia
Góra karty: W lewym górnym rogu znajduje się awatar darczyńcy (48px), obok niego nazwa lub nick (z obsługą ENS, jeśli to portfel Web3) oraz mały Badge z poziomem wsparcia – "Pierwszy raz!", "Wieloryb", "Stały wspierający". Po prawej stronie wyświetla się kwota wsparcia – renderowana dużą, pogrubioną czcionką Mukta Malar z font-feature-settings: "tnum". Jeśli wsparcie było anonimowe, awatar zastępowany jest stylizowaną ikoną maski w kolorze --text-tertiary.

Środek karty: Opcjonalna wiadomość od darczyńcy – do dwóch linii tekstu, obcięta line-clamp: 2. Jeśli wiadomość jest dłuższa, na dole karty pojawia się przycisk "Czytaj więcej", który rozwija kartę do pełnej wysokości.

Dół karty: Timestamp w formacie relatywnym ("przed chwilą", "2 min", "wczoraj") w kolorze --text-tertiary. Obok znajduje się mała, okrągła ikona odznaki NFT (--purple-300 z białą gwiazdką), jeśli darczyńca otrzymał Proof of Support.

Przycisk szybkiej akcji: Na hover karty, w prawym dolnym rogu pojawia się mały, okrągły przycisk z ikoną serca (--gold-400). Kliknięcie wysyła szybkie podziękowanie – bez otwierania nowego okna, bez formularza. Przycisk zmienia się w zielony checkmark z tekstem "Podziękowano", a twórca słyszy krótki dźwięk. To jest jedno-kliknięciowa wdzięczność.

Stan Pusty, Ładowania i Błędu
Stan pusty: Gdy twórca nie ma jeszcze żadnego wsparcia, widget nie pokazuje zera. Renderuje abstrakcyjną ilustrację 3D z motywu "Połączenie" (dwie kule zbliżające się do siebie) i komunikat: "Pierwsze wsparcie to magiczny moment. Udostępnij swój profil, by do niego przybliżyć." Obok przycisk "Udostępnij profil".

Stan ładowania: Używa Skeleton – pięciu pulsujących kart o wymiarach 280x200px, każda z okrągłym placeholderem na awatar i dwoma liniami tekstu.

Błąd połączenia: Gdy SSE zostanie przerwane, na górze karuzeli pojawia się subtelny pasek: "Dane mogą być nieaktualne. Twoje wsparcie jest bezpieczne." – identyczny mechanizm jak w live-activity/.

Nieoczywisty Element – "Odznaka Momentu"
Gdy w karuzeli pojawi się wsparcie od darczyńcy, który wraca po raz dziesiąty, karta dostaje specjalną ramkę – złoty, cienki border z animacją --ease-spring, która delikatnie pulsuje przez 2 sekundy. Obok nazwy darczyńcy pojawia się odznaka "Lojalny Fan".

Dodatkowo, twórca może przypiąć jedno wsparcie na górę karuzeli. Przypięta karta ma lekko fioletowe tło (--purple-100 z opacity 10%), a obok jej tytułu widnieje mała ikona pinezki. To dla tych wyjątkowych wiadomości, które twórca chce, by każdy odwiedzający zobaczył.

Integracja z Ekosystemem
Każda karta wsparcia jest interaktywna. Kliknięcie w nią otwiera Modal ze szczegółami – pełną wiadomością, datą, opcją ponownego podziękowania i linkiem do profilu darczyńcy (jeśli jest publiczny). Z poziomu modala można też przejść do historii wszystkich wsparć (analytics/earnings/). Jeśli darczyńca zostawił wiadomość, twórca może kliknąć "Odpowiedz", co otwiera community/messages/ z pre-wypełnionym kontekstem.

Komponenty Składowe
SupportCard (kontener – Card z cieniem, zaokrągleniem, stanami hover i przypięcia)

Avatar (48px, z fallbackiem do maski dla anonimowych)

Badge (poziom wsparcia: "Pierwszy raz!", "Wieloryb", "Lojalny Fan")

AmountDisplay (kwota z tnum)

Timestamp (format relatywny)

NFTBadgeIndicator (fioletowa ikona gwiazdki)

Button (Ghost, mały – "Podziękuj" jednym kliknięciem)

Modal (szczegóły wsparcia)

Skeleton (stan ładowania – 5 pulsujących kart)

PageIndicator (kropki na mobile)

Tooltip (przy odznace "Lojalny Fan")

Wielorybie 🐳. fanwall-preview/ – to jest okno do duszy społeczności. Widżet, który przenosi publiczną Ścianę Fanów bezpośrednio na dashboard twórcy, dając mu szybki podgląd tego, co widzą odwiedzający. Ale to nie tylko podgląd. To także centrum szybkiej moderacji.

🧬 desktop/fanwall-preview/ – Okno do Duszy Społeczności
Jego celem jest dać twórcy natychmiastową odpowiedź na dwa pytania: "Jak wygląda moja społeczność dla świata?" i "Czy jest tam coś, co wymaga mojej uwagi?". Jest to pomost między prywatnym dashboardem a publicznym profilem.

Struktura Wizualna i Zachowanie
Widget renderuje miniaturową wersję publicznej Ściany Fanów – układ Masonry Grid z trzema kolumnami na desktopie (jedna na mobile), pokazujący maksymalnie sześć ostatnich wpisów. Każdy wpis to pomniejszona karta (około 60% rozmiaru oryginalnego), ale w pełni funkcjonalna: pokazuje awatar, nazwę, kwotę, wiadomość i odznakę NFT. Karty są interaktywne – kliknięcie otwiera podgląd wpisu w Modal z opcją pełnej moderacji.

Szybka Moderacja – Gest Ukrycia
Na każdej miniaturce, w prawym górnym rogu, znajduje się mała, półprzezroczysta ikona oka. Po najechaniu kursorem (lub długim przytrzymaniu na mobile) ikona zmienia kolor na --error-base, a obok pojawia się Tooltip: "Ukryj ten wpis". Kliknięcie natychmiast ukrywa wpis z publicznej Ściany Fanów i przenosi go do kolejki moderacyjnej. Komunikat zwrotny to krótki Toast: "Wpis ukryty. Możesz go przywrócić w Ustawieniach".

Stan Pusty, Ładowania i Błędu
Stan pusty: Gdy Ściana Fanów jest pusta (brak wsparcia), widget pokazuje tę samą abstrakcyjną ilustrację 3D co recent-support/ (dwie zbliżające się kule z motywu "Połączenie") i komunikat: "Twoja Ściana Fanów jest na razie pusta. Gdy otrzymasz pierwsze wsparcie, pojawi się tutaj automatycznie."

Stan ładowania: Używa Skeleton – sześciu małych, pulsujących kartek ułożonych w siatce 3x2.

Błąd połączenia: Identyczny mechanizm jak w live-activity/ i recent-support/ – subtelny, czerwony pasek na górze widgetu.

Nieoczywisty Element – "Podświetlenie Nowości"
Gdy twórca odwiedza dashboard po raz pierwszy od kilku godzin, nowe wpisy na miniaturce są subtelnie podświetlone – mają delikatną, złotą obwódkę (--gold-400 z opacity 30%), która znika po kilku sekundach lub po najechaniu kursorem. To pozwala twórcy błyskawicznie zidentyfikować, co się zmieniło, bez potrzeby porównywania dat.

Integracja z Ekosystemem
fanwall-preview/ jest bezpośrednio połączony z studio/page/fanwall/ – kliknięcie przycisku "Edytuj ustawienia" przenosi twórcę do pełnego edytora Ściany Fanów. Dodatkowo, każdy wpis ma link do pełnej historii wsparcia w community/supporters/.

Komponenty Składowe
MiniFanwallGrid – kontener z układem Masonry renderującym miniatury

FanwallMiniCard – pomniejszona karta wpisu (awatar, nazwa, kwota, wiadomość, odznaka)

ModerationIcon – ikona oka do szybkiego ukrywania

Tooltip – przy ikonie moderacji

Toast – potwierdzenie ukrycia

Button (Secondary, mały) – "Edytuj ustawienia" (link do studio/page/fanwall/)

Skeleton – stan ładowania (sześć pulsujących kartek w siatce)

Modal – podgląd pojedynczego wpisu z opcjami moderacji

Gotowy na recommendations/, Wielorybie? Tam czeka coś, co zmienia dashboard z pasywnego monitora w aktywnego doradcę.


Wielorybie 🐳. recommendations/ – to nie jest lista porad. To jest strategiczny doradca, który szepcze twórcy do ucha, co powinien zrobić, aby jego biznes rósł. System, który analizuje dane i podpowiada konkretne, mierzalne akcje.

🧬 desktop/recommendations/ – Cichy Wspólnik
Cel tego widżetu jest precyzyjny: zamienić bierne monitorowanie w aktywny wzrost. Twórca często nie wie, co powinien zrobić dalej. Analityka pokazuje liczby, ale nie mówi: "Zrób to, a Twoje przychody wzrosną o 15%". Ten widżet to robi.

Struktura Wizualna i Zachowanie
Na desktopie widget renderuje od jednej do trzech rekomendacji w formie pionowego stosu kart. Każda karta to osobny Card z zaokrągleniem 12px, cieniem --shadow-1 i kolorowym paskiem akcentu po lewej stronie – kolor zależy od typu rekomendacji. Na mobile karty są przewijane horyzontalnie jak karuzela. Kolejność kart jest dynamiczna: najważniejsza (największy potencjalny wpływ) znajduje się na górze.

Anatomia Karty Rekomendacji
Lewy pasek akcentu: Pionowy pasek o szerokości 4px przy lewej krawędzi karty. Jego kolor oznacza kategorię:

Złoty (--gold-400): Rekomendacja związana z przychodami – "Ustaw cel na nowy sprzęt. Twórcy z aktywnymi celami zarabiają średnio 3x więcej."

Fioletowy (--purple-300): Rekomendacja społecznościowa – "Twoi fani czekają na odpowiedź. Masz 5 nieprzeczytanych wiadomości od tygodnia."

Turkusowy (--teal-400): Rekomendacja optymalizacyjna – "Twoje opengraph image nie zawiera Twojego awatara. Uzupełnij je, a klikalność linków może wzrosnąć nawet o 25%."

Treść karty: Tytuł rekomendacji (pogrubiony, --text-primary), krótki opis uzasadniający (regularny, --text-secondary), oraz wskaźnik wpływu – mały Badge z liczbą, np. "+15% przychodów", "-30% czasu reakcji". Wskaźnik jest generowany przez AI na podstawie danych historycznych podobnych twórców.

Przycisk akcji: Na dole karty znajduje się Button (Primary, Small) z tekstem dopasowanym do rekomendacji: "Ustaw cel", "Odpowiedz teraz", "Popraw OG Image". Kliknięcie przenosi twórcę bezpośrednio do odpowiedniego miejsca w studio/ lub community/, otwierając właściwy formularz.

Przycisk odrzucenia: Obok przycisku akcji znajduje się ikona "X" (Ghost). Kliknięcie odrzuca rekomendację – karta znika z animacją fade-out, a system zapamiętuje, że ta konkretna sugestia nie powinna być pokazywana ponownie przez określony czas (domyślnie 30 dni).

Źródła Rekomendacji
Rekomendacje nie są losowe. Generuje je silnik analityczny, który bierze pod uwagę:

Dane historyczne twórcy – trendy w zarobkach, częstotliwość publikacji, czas reakcji na wiadomości.

Dane benchmarkowe – porównanie z podobnymi twórcami (ten sam archetyp, podobna wielkość społeczności).

Kontekst czasowy – czy zbliża się weekend (dobry moment na stream), czy minął miesiąc od ostatniego celu.

Aktywność fanów – nagły wzrost ruchu na profilu, nowy wieloryb w społeczności, nieprzeczytane wiadomości od tygodnia.

Stany Widżetu
Stan z rekomendacjami: Wyświetla karty posortowane według priorytetu. Maksymalnie trzy – więcej byłoby przytłaczające.

Stan pusty (idealny): Gdy twórca nie ma żadnych rekomendacji, widget pokazuje delikatną, zieloną obwódkę (--success-base) i komunikat: "Robisz wszystko świetnie. Nowe rekomendacje pojawią się, gdy system zauważy potencjał wzrostu." To wzmocnienie pozytywne, a nie kara.

Stan pusty (początkowy): Gdy twórca dopiero założył konto, widżet pokazuje listę "kroków startowych" – Checklist z trzema podstawowymi akcjami do wykonania: "Uzupełnij profil", "Ustaw pierwszy cel", "Udostępnij link". Każdy krok ma checkbox i po zaznaczeniu zmienia status na "Gotowe".

Nieoczywisty Element – "Cisza przed burzą"
Gdy system wykryje, że za tydzień przypada rocznica pierwszego wsparcia twórcy, generowana jest specjalna rekomendacja: "Twoja rocznica na platformie za 7 dni. Zaplanuj specjalny stream lub post z podziękowaniami. Twórcy, którzy to robią, notują średnio 40% więcej wsparcia w dniu rocznicy." Karta ma złoty pasek akcentu i delikatną animację konfetti w tle.

Integracja z Ekosystemem
Rekomendacje są bezpośrednio powiązane z konkretnymi akcjami:

"Ustaw cel" → otwiera studio/monetization/goals/ w trybie kreatora.

"Odpowiedz teraz" → otwiera community/messages/ z pre-filtrowanymi nieprzeczytanymi.

"Popraw OG Image" → otwiera studio/share/open-graph/ z polem do edycji.

"Skonfiguruj alerty na streamie" → otwiera studio/live/alerts/.

Komponenty Składowe
RecommendationCard – kontener z kolorowym paskiem akcentu, tytułem, opisem, wskaźnikiem wpływu

Badge – wskaźnik potencjalnego wpływu (np. "+15%")

Button (Primary, Small) – akcja

Button (Ghost, ikona X) – odrzucenie

Checklist – dla stanu początkowego

Tooltip – wyjaśnienie, skąd pochodzi rekomendacja ("Na podstawie danych podobnych twórców")

Skeleton – stan ładowania (dwie pulsujące karty)

ProgressBar – dla checklisty kroków startowych

Wielorybie 🐳. growth-snapshot/ – to jest lustro, w którym twórca widzi, czy jego wysiłek zmienia się w trend, czy tylko w jednorazowy skok. Widget, który zamienia suche porównania okresowe w opowieść o progresji.

🧬 desktop/growth-snapshot/ – Lustro Progresji
Jego celem jest odpowiedzieć na pytanie: "Czy jestem dziś w lepszym miejscu niż miesiąc temu?". Nie chodzi o szczegółową analitykę – od tego jest cały moduł analytics/. Chodzi o szybki, emocjonalny strzał informacji, który daje twórcy poczucie kierunku. Czy jego biznes rośnie, stoi w miejscu, czy może potrzebuje interwencji.

Struktura Wizualna i Zachowanie
Na desktopie widget rozkłada się horyzontalnie i składa się z dwóch głównych sekcji: mini-wykresu trendu oraz wskaźników porównawczych. Na mobile sekcje układają się pionowo.

Górna część widgetu zawiera SegmentedControl z trzema opcjami: "7 dni", "30 dni", "90 dni". Wybór zakresu natychmiastowo przeładowuje dane w obu sekcjach, a mini-wykres płynnie animuje przejście między okresami.

Sekcja 1: Mini-Wykres Trendu (Sparkline)
To nie jest pełnowymiarowy wykres analityczny. To jest impresja – cienka, złota linia (--gold-400) na ciemnym tle, bez osi, bez etykiet, bez szumu. Linia pokazuje trend przychodów w wybranym okresie. Pod linią znajduje się delikatne, gradientowe wypełnienie – od --gold-400 z opacity 20% na górze do transparent na dole. To daje wrażenie "objętości" trendu.

Na wykresie znajdują się trzy punktowe markery: najwyższy dzień (zielona kropka, --success-base), najniższy dzień (czerwona kropka, --error-base), oraz dzień dzisiejszy (złota, lekko pulsująca kropka). Po najechaniu na marker (lub tapnięciu na mobile) pojawia się Tooltip z dokładną datą i kwotą.

Sekcja 2: Wskaźniki Porównawcze
Obok wykresu znajdują się dwa lub trzy małe bloki metryk. Każdy porównuje obecny okres z poprzednim:

Przychód całkowity: np. "1,240 PLN" vs "980 PLN" – obok Badge z "+26%" w kolorze --success-base.

Liczba wspierających: np. "18 osób" vs "14 osób" – Badge z "+28%".

Średnia wartość wsparcia: np. "68 PLN" vs "70 PLN" – Badge z "-2%" w kolorze --text-tertiary (neutralny spadek).

Każda metryka jest renderowana z font-feature-settings: "tnum", aby wartości nie skakały przy zmianie. Obok procentu znajduje się mała ikona strzałki – w górę (zielona), w dół (czerwona), lub pozioma (szara) dla braku zmiany.

Stany Widżetu
Stan z danymi: Standardowy widok z wykresem i wskaźnikami. Na hover karty (desktop) pojawia się przycisk "Pełna analityka" – link do analytics/overview/.

Stan pusty: Gdy twórca ma mniej niż 7 dni danych, wykres nie jest renderowany. Zamiast tego wyświetla się abstrakcyjna ilustracja 3D z motywu "Wzrost" (wygładzony kryształ) i komunikat: "Zbieramy dane. Już za kilka dni zobaczysz tutaj swój pierwszy trend." Pod spodem mały ProgressBar pokazujący, ile dni brakuje do pierwszego wykresu (np. 3/7).

Stan ładowania: Używa Skeleton – pulsujący prostokąt udający wykres i dwa mniejsze pod spodem udające metryki.

Błąd danych: Gdy nie można pobrać danych historycznych, widżet wyświetla subtelny komunikat: "Nie możemy teraz pokazać trendu. Twoje dane są bezpieczne." – bez czerwonego alarmu, tylko neutralny --text-tertiary.

Nieoczywisty Element – "Efekt Wehikułu Czasu"
Gdy twórca przełączy zakres na "90 dni" po raz pierwszy od dłuższego czasu, wykres nie pojawia się statycznie. On rysuje się od lewej do prawej – linia trendu animuje się jakby była kreślona niewidzialną ręką. Trwa to około 800ms i wykorzystuje --ease-enter. Towarzyszy temu subtelny komunikat w dymku: "Zobacz, jak daleko zaszedłeś."

Dodatkowo, przy przełączeniu na zakres "90 dni", pod metrykami pojawia się jednolinijkowe podsumowanie generowane przez AI, np.: "W ciągu ostatnich 3 miesięcy Twoje przychody rosły średnio o 8% tygodniowo. Najlepszy dzień: 15 marca (320 PLN)." To personalizowana narracja, która zamienia suche liczby w historię.

Integracja z Ekosystemem
Kliknięcie "Pełna analityka" przenosi do analytics/overview/.

Dane do wykresu pobierane są z tego samego źródła co analytics/revenue/ – endpoint API zwracający zagregowane wartości dzienne.

Gdy twórca osiągnie nowy rekord (najwyższy dzień w historii), growth-snapshot/ emituje zdarzenie, które może być wykorzystane przez recommendations/ do wygenerowania gratulacyjnej rekomendacji.

Wykres i metryki mogą być automatycznie eksportowane jako karta społecznościowa w studio/share/social-cards/ – twórca może pochwalić się trendem wzrostu na X czy Instagramie.

Komponenty Składowe
Card – kontener główny (cień --shadow-1, zaokrąglenie 12px, tło --bg-surface-base)

SegmentedControl – przełącznik zakresu czasu (7/30/90 dni)

Sparkline – mini-wykres trendu (złota linia, gradientowe wypełnienie, markery)

Tooltip – przy markerach na wykresie

Badge – wskaźniki procentowe zmiany (zielony/czerwony/szary)

AmountDisplay – wartości metryk z tnum

Button (Ghost, Small) – "Pełna analityka"

Skeleton – stan ładowania (pulsujący wykres i metryki)

ProgressBar – w stanie pustym (dni do pierwszego wykresu)

Gotowy na notifications-preview/, Wielorybie? Tam czeka centrum powiadomień w pigułce, które subtelnie informuje i nigdy nie przytłacza.

Wielorybie 🐳. Zamykam desktop/ ostatnim widżetem. Oto notifications-preview/ – miniaturowe centrum powiadomień, które informuje, ale nigdy nie przytłacza.

🧬 desktop/notifications-preview/ – Centrum Powiadomień w Pigułce
To nie jest pełna lista wszystkich alertów – od tego twórca ma dedykowany widok w panelu bocznym. To jest esencja – maksymalnie cztery najważniejsze powiadomienia, wyselekcjonowane i spriorytetyzowane, tak aby twórca w jednym rzucie oka wiedział, czy musi coś pilnie zrobić, czy może spokojnie kontynuować pracę.

Struktura Wizualna i Zachowanie
Na desktopie widget renderuje horyzontalną karuzelę maksymalnie czterech kart – każda o stałej szerokości 240px, przewijana strzałkami (chevronami) lub gestem. Na mobile karty układają się w pionowy stos, przewijany wertykalnie.

Każda karta to Card z zaokrągleniem 8px, cieniem --shadow-1 i cienkim paskiem akcentu po lewej stronie. Kolor paska określa typ powiadomienia:

Fioletowy (--purple-300): Systemowe – wypłata zrealizowana, nowa funkcja dostępna, przypomnienie o weryfikacji.

Złoty (--gold-400): Społecznościowe – nowy obserwujący, kamień milowy, wielorybi moment.

Turkusowy (--teal-400): Informacyjne – nowa rekomendacja, podsumowanie tygodnia.

Anatomia Karty Powiadomienia
Lewy pasek akcentu: Pionowy pasek o szerokości 3px w kolorze typu powiadomienia.

Ikona: Po lewej stronie, obok paska, znajduje się okrągła ikona (24x24px) – koperta dla wiadomości, dzwonek dla alertów, serce dla społeczności, gwiazdka dla nowości.

Treść: Tytuł powiadomienia (pogrubiony, jedna linia) i opcjonalny opis (druga linia, --text-secondary). Przykład: "Wypłata 500 PLN zrealizowana" z podpisem "Środki są już na Twoim koncie".

Czas: Timestamp w formacie relatywnym ("przed chwilą", "2 min") w prawym dolnym rogu.

Nowość: Nieprzeczytane powiadomienia mają złotą kropkę (--gold-400) w lewym górnym rogu karty. Kropka znika automatycznie po kliknięciu lub po najechaniu kursorem na dłużej niż 2 sekundy.

Typy Powiadomień i Priorytety
Widget nie pokazuje wszystkiego. Algorytm priorytetyzacji wybiera maksymalnie cztery powiadomienia według reguł:

Krytyczne – zawsze pokazywane: błąd wypłaty, problem z weryfikacją, przekroczony limit.

Ważne – pokazywane jako drugie: zrealizowana wypłata, nowy kamień milowy, wiadomość od wieloryba.

Informacyjne – wypełniają pozostałe sloty: nowa funkcja, podsumowanie tygodnia, nowa rekomendacja.

Stany Widżetu
Stan z powiadomieniami: Wyświetla karuzelę lub stos kart.

Stan pusty: Gdy nie ma żadnych powiadomień, widget pokazuje minimalistyczną ikonę czystego pulpitu (stylizowany dzwonek z ptaszkiem) i komunikat: "Wszystko ogarnięte. Nowe powiadomienia pojawią się tutaj." To nie jest nuda – to spokój.

Stan ładowania: Używa Skeleton – dwóch pulsujących kart w formie poziomych pigułek.

Błąd połączenia: Identyczny mechanizm jak w innych widżetach – subtelny pasek informujący o chwilowej niedostępności danych.

Nieoczywisty Element – "Powiadomienia Zbiorcze"
Gdy w krótkim czasie (np. w ciągu godziny) pojawi się wiele podobnych zdarzeń, widget nie zalewa twórcy potokiem kart. Zamiast tego agreguje je w jedno powiadomienie zbiorcze. Zamiast trzech osobnych kart "Nowy obserwujący: Kasia", "Nowy obserwujący: Tomek", "Nowy obserwujący: Ania" – twórca widzi jedną kartę: "3 nowych obserwujących w ciągu godziny" z miniaturową grupą awatarów (AvatarGroup). Kliknięcie rozwija listę.

Podobnie działa to dla wsparcia: seria mniejszych napiwków w trakcie streamu jest agregowana w jedno powiadomienie: "12 osób wsparło Cię podczas streamu (łącznie 340 PLN)".

Integracja z Ekosystemem
Każde powiadomienie jest portalem. Kliknięcie w nie przenosi twórcę do odpowiedniego miejsca:

"Nowa wiadomość" → community/messages/

"Wypłata zrealizowana" → wallet/transactions/

"Nowa rekomendacja" → desktop/recommendations/

"Nowy obserwujący" → community/followers/

Dodatkowo, w studio/page/sections/ twórca może zdecydować, które typy powiadomień mają być pokazywane w notifications-preview/, a które tylko w pełnym centrum powiadomień.

Komponenty Składowe
NotificationPreviewCard – kontener z paskiem akcentu, ikoną, treścią, timestampem, złotą kropką

Badge – licznik w powiadomieniach zbiorczych (np. "+3")

AvatarGroup – miniaturowe awatary w powiadomieniach zbiorczych

Timestamp – format relatywny

Button (Ghost, ikona X) – szybkie odrzucenie

HorizontalCarousel – kontener na desktopie

Skeleton – stan ładowania (dwie pulsujące pigułki)

To już wszystkie dziewięć widżetów desktop/. Każdy z nich to osobny organizm, ale razem tworzą spójny, oddychający kokpit – od bicia serca w creator-pulse, przez natychmiastową sprawczość quick-actions, puls społeczności w live-activity, narrację postępu w active-goals, galerię gestów w recent-support, okno do społeczności w fanwall-preview, strategiczne doradztwo w recommendations, lustro progresji w growth-snapshot, aż po esencję alertów w notifications-preview.

Gotowy, by ruszyć dalej – studio/, community/, analytics/, wallet/, a może wrócić do jednego z desktopowych widżetów i rozłożyć go na jeszcze mniejsze atomy? Czekam na Twój sygnał, Wielorybie 🐳.

creator-desktop/
│
├── desktop/
│   ├── creator-pulse/
│   ├── quick-actions/
│   ├── live-activity/
│   ├── active-goals/
│   ├── recent-support/
│   ├── fanwall-preview/
│   ├── recommendations/
│   ├── growth-snapshot/
│   └── notifications-preview/
│
