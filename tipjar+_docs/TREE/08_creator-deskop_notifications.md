Wielorybie 🐳. Wchodzimy na dziewicze terytorium. `notifications/` – moduł, którego nie było w Twoim drzewie, ale który jest kręgosłupem całego ekosystemu. Tutaj nie tylko opisuję widok. Ja projektuję Ci od zera **centrum nerwowe uwagi twórcy**, system czasu rzeczywistego, który musi działać jak szwajcarski zegarek na krawędzi sieci. I robię to z pełną mocą, wchodząc głęboko w technologię, która to napędza – bo bez niej to tylko ładny dzwonek.

---

## 🧬 `notifications/` – Centrum Nerwowe Uwagi Twórcy

To nie jest dzwoneczek. To jest **strategiczne narzędzie retencji i aktywacji**, które decyduje o tym, czy twórca wróci do aplikacji za 5 minut, czy za 5 dni. Każde powiadomienie to sygnał, który musi dotrzeć do celu w ułamku sekundy, zostać dostarczony z chirurgiczną precyzją i nigdy, przenigdy nie zginąć. To jest obietnica złożona twórcy: "Cokolwiek stanie się w twoim świecie, usłyszysz o tym."

Zaprojektowałem go od podstaw, bo `creator-desktop/notifications` to tylko skromny widżet – podgląd, przedsionek. Prawdziwa siła leży tutaj, w pełnym centrum dowodzenia.

### Filozofia Systemu: Niezawodność i Szacunek dla Uwagi

Bazową zasadą jest **szacunek dla uwagi**. System nie może spamować. Musi być inteligentny i kontekstowy. Dlatego zaprojektowałem go jako **dwukierunkowy organizm**: z jednej strony surowy strumień zdarzeń (Firehose), który płynie bezpośrednio z serca platformy (SSE), a z drugiej – inteligentna warstwa priorytetyzacji i dostarczania (Delivery Layer), która decyduje, czy dane zdarzenie zasługuje na przerwanie twórcy, czy ma poczekać na lepszy moment.

Całość opiera się na czterech filarach technicznych, które wymieniłeś, i które są tu absolutnie kluczowe:
- **SSE (Server-Sent Events)** jako jednokierunkowy, lekki protokół do strumieniowania powiadomień na żywo.
- **React Query** jako inteligentna warstwa cache'owania, synchronizacji i zarządzania stanem serwerowym na froncie.
- **TanStack Virtual** do renderowania list, które mogą mieć setki pozycji, bez zająknięcia – szczególnie ważne w live feedzie na streamie.
- **SSR (Server-Side Rendering)** dla początkowej paczki powiadomień, by twórca po otwarciu strony widział natychmiast swoją historię, zanim jeszcze SSE się połączy.

### Architektura Strumienia Danych: SSE + Kolejkowanie

Wyobraź sobie rzekę. Każdy napiwek, follow, komentarz to kropla. Platforma (Redis Pub/Sub) to źródło rzeki. **SSE (Server-Sent Events)** to jej nurt, który płynie nieprzerwanie od serwera do przeglądarki. Każda kropla to mały, ustrukturyzowany pakiet JSON, który ląduje w przeglądarce i jest natychmiast konsumowany przez `EventSource`.

Ale rzeka ma też **śluzę**. To jest **kolejkowanie po stronie serwera (BullMQ/Redis)** zanim zdarzenie trafi do SSE. Kolejka zapewnia, że zdarzenia nie giną przy restarcie serwera, są przetwarzane asynchronicznie i mogą być priorytetyzowane. Zdarzenie o wysokim priorytecie (np. napiwek od wieloryba) jest przetwarzane natychmiast. Zdarzenie o niskim priorytecie (np. polubienie posta) czeka w kolejce, by nie przeciążać streamu.

Gdy twórca otwiera `notifications/inbox/`, przeglądarka wykonuje dwie akcje jednocześnie:
1. **SSR (Next.js Server Component)** dostarcza w pełni wyrenderowany HTML z pierwszą partią powiadomień (np. 20 ostatnich) pobraną z bazy. Twórca widzi listę natychmiast, bez migających skeletonów. To jest **SSR w akcji**.
2. Równocześnie otwierane jest połączenie **SSE**. Nowe zdarzenia są dołączane na żywo. **React Query** pełni tu rolę mostu: jego `queryClient` jest hydratowany danymi z SSR, a następnie subskrybuje SSE i aktualizuje cache w tle. Gdy nadejdzie nowe zdarzenie, React Query automatycznie odświeża widok, a Ty widzisz płynną animację wejścia.

Gdy twórca jest na streamie i ma otwarty widok `notifications/live-feed`, system przechodzi w tryb turbo. **TanStack Virtual** przejmuje kontrolę nad listą, renderując tylko te elementy, które mieszczą się w viewporcie (plus bufor), nawet jeśli w ciągu godziny streamu napłynęły setki alertów. Przewijanie jest płynne jak jedwab, bez żadnych spadków FPS. SSR nie jest już potrzebne – liczy się tylko czas rzeczywisty.

### Sekcje Modułu – Spacer po Centrum Dowodzenia

#### `inbox/` – Twoja Osobista Linia Czasu
To jest widok, który znasz z `creator-desktop/notifications`, ale na sterydach. Nie tylko podgląd. To **pełna, przeszukiwalna historia**. Sekcja `all/` to nieskończona oś czasu z leniwym ładowaniem (Intersection Observer). `unread/` to filtrowana lista, która pokazuje tylko to, co wymaga twojej uwagi. `mentions/` wyławia z potoku tylko te zdarzenia, gdzie ktoś bezpośrednio cię oznaczył – to priorytet zero. `alerts/` to krytyczne alerty systemowe (np. "Wypłata zablokowana – zweryfikuj tożsamość"), które ignorują ustawienia "nie przeszkadzać" i zawsze się przebijają.

#### `preferences/` – Dyrygowanie Symfonią
Tutaj twórca staje się dyrygentem. `channels/` to nie tylko checkboxy "Email/Push". To **macierz**. Dla każdego typu zdarzenia (nowy napiwek, follow, komentarz, alert systemowy) możesz ustawić, przez który kanał chcesz być powiadamiany. Nie chcesz dostawać pushy o polubieniach? Wyłączasz. Chcesz dostawać SMS-y o napiwkach powyżej 100 PLN? Konfigurujesz. `digest/` to twoje codzienne lub cotygodniowe podsumowanie – "W tym tygodniu zarobiłeś X, przybyło Y fanów". `quiet-hours/` to twój święty spokój – system nie wyśle ci nic między 22:00 a 7:00, chyba że to `alerts/`. `smart-grouping/` to magia: zamiast 10 osobnych powiadomień "Nowy follow", dostajesz jedno: "10 nowych obserwujących w ciągu godziny". To oszczędza twój mózg.

#### `history/` – Archeolog Uwagi
Każde powiadomienie, nawet odrzucone, jest tu archiwizowane. `search/` z pełną składnią (data, typ, treść) pozwala znaleźć igłę w stogu siana. `export/` daje ci możliwość pobrania logów – przydatne, gdy chcesz przeanalizować wzorce poza platformą.

#### `devices/` – Strażnicy Twoich Wrót
Zarządzasz tu, gdzie lądują powiadomienia push. Widzisz wszystkie aktywne sesje i tokeny. Możesz zdalnie wylogować starą sesję lub zobaczyć, że twoje konto jest otwarte na tablecie, o którym zapomniałeś. Bezpieczeństwo.

### Live Feed na Streamie – Gdy Czas To Adrenalina

To jest mój ulubiony element. `creator-desktop/notifications` to podgląd, ale tutaj, w `notifications/live-feed`, dzieje się magia. Wyobraź sobie widok, który streamer ma na drugim monitorze. Nie lista. To jest **ściana wizualnych impulsów**. Każde zdarzenie to karta, która **eksploduje** na ekranie z animacją `--ease-spring`, pokazuje się przez kilka sekund i znika. TanStack Virtual zapewnia, że nawet przy 500 zdarzeniach na minutę, DOM nie puchnie – stare elementy są usuwane z pamięci, by zrobić miejsce nowym. Kolejką steruje priorytet: napiwki od wielorybów zawsze wskakują na początek, nawet jeśli wypchną inne.

Ale kluczowe jest to, że ten live feed jest **osobnym, transparentnym źródłem w OBS**. URL tego widoku (z tokenem) może być wklejony jako Browser Source. Dzięki temu streamer nie musi patrzeć w panel – widzi wszystko nałożone na stream. SSR nie ma tu zastosowania; wszystko dzieje się po stronie klienta, z React Query nasłuchującym SSE i natychmiast aktualizującym cache.

### Nieoczywisty Element – "Dźwignia Społecznościowa"

W `preferences/smart-grouping`, twórca może zdefiniować próg: "Gdy w ciągu 5 minut pojawi się więcej niż 10 nowych napiwków, wyślij mi SMS-a z podsumowaniem". To dla streamerów, którzy są offline – wiedzą, że jeśli wydarzyło się coś wielkiego, system ich o tym poinformuje. To nie jest spam. To jest **inteligencja**.

---

To jest cały `notifications/`. Twój system nerwowy. Działa na krawędzi, z poszanowaniem uwagi i z pełną mocą nowoczesnego stacku. Gotowy na `settings/`, Wielorybie? Tam czeka twierdza bezpieczeństwa i kontroli.
