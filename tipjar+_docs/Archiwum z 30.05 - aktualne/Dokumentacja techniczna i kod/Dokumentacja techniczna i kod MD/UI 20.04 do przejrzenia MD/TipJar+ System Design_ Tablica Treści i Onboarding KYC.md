Raport Projektowy: Immersyjna Tablica
Treści (Token-Gated Feed) i
"White-Glove" KYC

1. Wizja i Inspiracja: Koniec Ery "Płaskich Feedów"

Większość platform twórców (Patreon, OnlyFans) używa nudnego, przewijanego z góry na dół
układu postów. W 2026 roku, aby uzasadnić zakup subskrypcji (NFT), musimy zaoferować "The
Velvet Rope Experience" (Doświadczenie Aksamitnego Szura). Ekskluzywne treści muszą
fizycznie wyglądać na drogie i unikalne.

Wprowadzamy koncepcję Liquid Glass Paywall (Paywall z płynnego szkła) oraz Bento Feed,
które redefiniują sposób, w jaki fani konsumują treści od twórców, a twórcy budują napięcie
(FOMO).

2. Tablica Treści (The Creator Feed)

Tablica treści znajduje się na profilu twórcy (zakładka "Ekskluzywne") oraz w głównym panelu
Fana jako agregator nowości od wspieranych artystów.

2.1 Architektura Postów (Bento Grid Feed)

Zamiast jednakowych prostokątów, feed używa asymetrycznej siatki Bento.

●  Hero Post (2x2): Najnowszy, najważniejszy post twórcy (np. główny film tygodnia).
Zajmuje dużą szerokość, z auto-odtwarzającym się (wyciszonym) zwiastunem.
●  Audio Drops (1x1): Mikro-posty głosowe. W 2026 roku krótkie notatki głosowe od
twórców budują największą intymność. Post wygląda jak mały, fioletowy kafelek z
wizualizacją fali dźwiękowej (audiogram), który można odtworzyć jednym kliknięciem bez
przerywania scrollowania.

●  Szybkie Ankiety (1x2): Np. "Co nagrać w piątek?". Interaktywne bezpośrednio z poziomu

feedu.

2.2 Wzorzec "Liquid Glass Unlock" (Zastępstwo dla szarej kłódki)

Jak zachęcić fana do zakupu subskrypcji NFT, gdy widzi zablokowany post?

●  Błąd Web2: Pokazanie szarego boksu z ikoną kłódki i napisem "Zapłać, by zobaczyć". To

●

budzi frustrację.
Innowacja TipJar+ (Liquid Glass): Używamy zaawansowanego efektu CSS
(backdrop-filter: blur(24px) saturate(150%)). Post jest widoczny, ale bardzo mocno

rozmyty (frosted glass). Widać zarysy kolorów i kształtów (co budzi ciekawość – "Co tam
jest?").

●  Micro-copy: Na środku rozmytego szkła unosi się złota tarcza (ikona rzadkości) z

napisem: "Odblokuj złotą odznaką. Dołącz do 42 fanów, którzy już to widzą." (Social
Proof).

●  Mikrointerakcja odblokowania: Gdy fan kupuje subskrypcję, szkło nie po prostu znika.
Ono "topnieje" (animacja CSS mask) lub płynnie traci rozmycie w ciągu 0.5s, odsłaniając
treść. Daje to ogromną satysfakcję i poczucie natychmiastowej nagrody (Dopamine hit).

2.3 Mikro-Monetyzacja: "Tip-to-Reveal" (Zaskoczenie!)

Nie wszystko musi być za miesięcznym paywallem. Wprowadzamy format posta
"Tip-to-Reveal".

●  Jak to działa: Twórca wrzuca zdjęcie zza kulis, nakłada na nie rozmycie i ustawia cenę:

np. $2.

●  UX Fana: Fan klika przycisk ze złotą monetą na poście. Pieniądze pobierane są

natychmiast z salda TipJar (one-click) lub przez szybki modal Circle, a obrazek się
wyostrza. To potężne narzędzie impulsywnych zakupów, idealne dla młodszej widowni.

2.4 Edytor Treści dla Twórcy (The Studio)

Gdy twórca chce dodać post, interfejs musi być tak intuicyjny jak w najlepszych aplikacjach.

●  Floating Composer: Zamiast ładować nową stronę, edytor to modal typu "slide-up"

wywoływany przyciskiem "+".

●  Selector Odbiorców (Audience Gating): Przełącznik w formie suwaka z opcjami:

○  🌐 Publiczne (dla wszystkich)
○  🥈 Posiadacze Srebrnej Odznaki (Subskrypcja A)
○  🥇 Posiadacze Złotej Odznaki (Subskrypcja B)

●  Feedback: "Ten post trafi do 1,420 Twoich elitarnych fanów".

3. "White-Glove" KYC: Onboarding i Limit Wypłat

Większość platform traktuje weryfikację KYC (Know Your Customer) jak przesłuchanie na
policji. Proszą o paszport w momencie rejestracji, co zabija konwersję na starcie. Nasza
strategia to Progresywne Ujawnianie (Progressive Disclosure) i ramowanie psychologiczne
(VIP Framing).

3.1 Złota Zasada: Nie proś o dowód w dniu 1.

Twórca może założyć konto, ustawić profil, publikować posty i przyjmować napiwki bez KYC
(do ustalonego progu). Pozwalamy mu poczuć wartość platformy. Pieniądze lądują na jego
wirtualnym saldzie. Gdy widzi, że zarobił pierwsze $500, jego motywacja do przejścia KYC jest

gigantyczna.

3.2 Progresywny Lejek i VIP Framing

Limit wynosi np. $1500. Jak to rozegrać interfejsowo?

●  Osiągnięcie $1000 na saldzie (The Nudge): W Panelu Twórcy pojawia się dyskretny,

elegancki widget w kolorze fioletowym: "Zbliżasz się do Ligi Pro! Przygotuj się na większe
wypłaty, weryfikując swój profil."

●  Osiągnięcie $1500 (The Gate): Przycisk "Wypłać środki" zmienia stan. Po kliknięciu nie
wyświetlamy czerwonego błędu "Zablokowane - Brak KYC". Zamiast tego wysuwa się
piękny modal:

○  Tytuł: "Odblokuj Wypłaty Bez Limitu" (język korzyści, a nie restrykcji).
○  Kopia: "Zgodnie z przepisami finansowymi, musimy potwierdzić Twoją tożsamość,

aby chronić Twoje środki. Zajmie to tylko 2 minuty."

○  Zaufanie: Ikonka "Zabezpieczone przez".

3.3 Seamless Handoff (Bezpłynne przejście do zewnętrznego KYC)

Nie wysyłamy twórcy mailem dziwnego linku. Utrzymujemy go w środowisku TipJar+.

●

Implementacja Iframe/WebSDK: Uruchamiamy zewnętrznego dostawcę KYC wewnątrz
nakładki (overlay) w naszym systemie. Zewnętrzne SDK (jak Sumsub) doskonale
obsługuje skanowanie twarzy i dowodu przez kamerkę telefonu.

●  UX Mobilny: Jeśli twórca jest na komputerze bez kamery, platforma generuje kod QR.

"Zeskanuj telefonem, aby zrobić zdjęcie twarzy, a potem wróć tutaj." Ekrany są
zsynchronizowane przez WebSocket.

3.4 Stan "Oczekujący" i Sukces

Weryfikacja trwa zazwyczaj od 30 sekund do kilku godzin.

●  Status w Panelu: Na pulpicie pojawia się elegancki wskaźnik: "Weryfikacja tożsamości w

toku. Twoje środki są bezpieczne."

●  Sukces: Kiedy zewnętrzny partner zwraca status verified przez Webhook do naszego
backendu, twórca otrzymuje e-mail: "Jesteś zweryfikowany! Twój limit wypłat został
zniesiony." Na koncie pojawia się np. odznaka "Verified Creator", co zwiększa zaufanie
fanów.

4. Puste Stany (Empty States) – Sztuka Gościnności

Puste stany (gdy nie ma jeszcze danych) są często ignorowane. W TipJar+ zamieniamy je w
potężne narzędzia aktywizacji.

4.1 Pusta Tablica Twórcy (Dla Fana)

Kiedy fan wchodzi na profil nowego twórcy, który nie ma jeszcze postów.

●  Zamiast: "Brak postów."
●  TipJar+ Way: Pokazujemy piękną, wyciszoną ilustrację abstrakcyjnej sceny 3D (np.

instrumenty czekające na muzyka).

●  Tekst: "Scena jest w trakcie przygotowań. [Nazwa] pracuje nad czymś wyjątkowym."
●  CTA dla Fana: "Kup subskrypcję w ciemno i zostań Foundrem! Otrzymasz unikalną

odznakę." (Wykorzystanie mechanizmu wczesnego inwestowania).

4.2 Pusty Panel Analityczny (Dla Twórcy)

Kiedy twórca dopiero założył konto.

●  Zamiast: Wykresów z samymi zerami (co działa deprymująco).
●  TipJar+ Way: Elementy są zamazane, a na środku widnieje wielki cel.
●  Tekst: "Twoja podróż się zaczyna."
●  Lista Kontrolna (Onboarding Quest): Zgrywalizowana lista 3 kroków do odblokowania

pełnego potencjału:

1.  [x] Uzupełnij profil
2.  [ ] Dodaj pierwszy Ekskluzywny Post
3.  [ ] Zdobądź pierwszego wspierającego (Zaproś społeczność z Twittera -> Link).

5. Podsumowanie Wartości: Dlaczego te rozwiązania
wygrywają?

1.  Monetyzacja Impulsywna ("Tip-to-Reveal"): Dodajesz zupełnie nowe źródło

przychodu, obok stałych subskrypcji. Twórcy to pokochają, bo pozwala spieniężać
pojedyncze, szybkie materiały.

2.  Budowanie Napięcia (Liquid Glass): Rozmycie treści intryguje tysiąc razy bardziej niż

całkowite jej ukrycie. Ludzie płacą, by zaspokoić ciekawość.

3.  Redukcja Odrzuceń (Progressive KYC): Przeniesienie weryfikacji tożsamości na

moment przed pierwszą wypłatą gwarantuje, że proces przejdą tylko ci, którzy mają już
realną motywację (zarobione pieniądze), dzięki czemu unikasz kosztów odrzucania
pustych kont.

4.  Odczucie Luksusu: Zmiana słownictwa z "Weryfikacja" na "Unlock Pro" oraz

zastosowanie eleganckich mikrointerakcji maskuje fakt, że obcujemy ze skomplikowaną
technologią i wymogami prawnymi.

Tak zaprojektowana tablica treści w połączeniu z przyjaznym procesem legalizacji zysków
tworzy kompletny produkt, gotowy rzucić wyzwanie zasiedziałym gigantom Web2.

