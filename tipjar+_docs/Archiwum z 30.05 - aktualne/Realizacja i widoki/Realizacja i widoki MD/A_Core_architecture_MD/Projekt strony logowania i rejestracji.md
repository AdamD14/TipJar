Specyfikacja Projektowa i Techniczna
Zintegrowanego Systemu
Uwierzytelniania Hybrydowego (Web2 +
Web3)

1. Wstęp i Kontekst Strategiczny

1.1 Ewolucja Tożsamości Cyfrowej w Ekonomii Twórców

Współczesne platformy cyfrowe obsługujące rynek twórców (Creator Economy) znajdują się w
punkcie zwrotnym ewolucji technologicznej. Tradycyjne metody uwierzytelniania oparte na
scentralizowanych bazach danych (Web2) zderzają się z rosnącym zapotrzebowaniem na
suwerenność danych i obsługę aktywów cyfrowych (Web3). Zadanie zaprojektowania
wspólnego ekranu logowania i rejestracji dla twórców oraz fanów wymaga nie tylko estetycznej
spójności, ale przede wszystkim głębokiego zrozumienia psychologii użytkownika i inżynierii
bezpieczeństwa.
Raport ten stanowi wyczerpującą specyfikację projektową dla modułu uwierzytelniania, który
łączy w sobie prostotę dostępu (e-mail, OAuth) z zaawansowaną kryptografią (Sign-In with
Ethereum - SIWE). Celem nadrzędnym jest minimalizacja tarcia (friction) przy jednoczesnym
zachowaniu najwyższych standardów bezpieczeństwa, zgodnie z zasadą "Security with
Usability". W środowisku Web3, gdzie użytkownik jest strażnikiem własnych kluczy prywatnych,
interfejs musi pełnić rolę zaufanego przewodnika, tłumacząc skomplikowane procesy
blockchainowe na język ludzkich interakcji.

1.2 Definicja Problemu i Cele Projektowe

Zgodnie z wymaganiami, system musi obsługiwać dychotomię użytkowników:

1.  Fani (Mainstream): Oczekują natychmiastowego dostępu, często poprzez znane wzorce

(Google, Twitch). Dla nich technologia blockchain jest barierą, dlatego musi być
opcjonalna i nienarzucająca się.

2.  Twórcy/Kolekcjonerzy (Web3 Native): Wymagają bezpośredniej integracji z portfelami

kryptowalutowymi (MetaMask, WalletConnect) w celu zarządzania aktywami (NFT, tokeny
społecznościowe). Dla tej grupy "login" jest tożsamy z "podpisem kryptograficznym".

Projekt "Wspólnego Ekranu" (Unified Screen) musi pogodzić te dwa światy w ramach jednego
modala, zachowując czystość wizualną (Dark Mode) i minimalizując obciążenie poznawcze
(Cognitive Load).

2. Architektura Informacji i Psychologia UX

2.1 Koncepcja "Bramy" (The Gateway Concept)

Strona logowania nie jest miejscem na eksplorację; jest barierą, którą użytkownik chce pokonać
jak najszybciej. Badania wskazują, że każda dodatkowa sekunda spędzona na ekranie
logowania zwiększa ryzyko porzucenia procesu (churn). Dlatego projekt przyjmuje strategię
Progresywnego Ujawniania (Progressive Disclosure). Zamiast prezentować wszystkie opcje
z równym priorytetem, hierarchizujemy je w oparciu o najczęstsze ścieżki dostępu, jednocześnie
dając jasny wybór.

Struktura Decyzyjna

Zastosowanie struktury opartej na kartach (Tabs) do wyboru między "Zaloguj się" a "Zarejestruj
się" jest kluczowe dla redukcji błędów. Użytkownik musi świadomie zadeklarować intencję.
Łączenie tych widoków (np. "Wpisz email, a my sprawdzimy czy masz konto") w tym
konkretnym przypadku jest niewskazane ze względu na różnice w wymaganych polach (np.
"Potwierdź hasło" przy rejestracji).
Element Architektury
Tabs (Górna belka)

Funkcja Psychologiczna
Deklaracja intencji

Formularz Email (Centralny)  Kotwica zaufania

Separator "Lub"

Przełącznik kontekstu

Web3/OAuth (Dolna sekcja)  Akceleratory

Uzasadnienie
Zapobiega przypadkowym
próbom logowania przez
nowych użytkowników.
Najbardziej uniwersalna
metoda, dająca poczucie
kontroli.
Wyraźnie oddziela metody
tradycyjne od zewnętrznych
dostawców tożsamości.
Szybkie ścieżki dla
zaawansowanych
użytkowników.

2.2 Minimalizacja Obciążenia Poznawczego

Zgodnie z prawem Hicka, czas potrzebny na podjęcie decyzji rośnie logarytmicznie wraz z
liczbą opcji. W projekcie ograniczamy główne grupy decyzyjne do trzech:

1.  Standardowa: Email + Hasło.
2.  Społecznościowa: Google + Twitch (zaufane platformy Web2).
3.  Zdecentralizowana: Portfel kryptowalutowy (Web3).

Grupowanie ikon OAuth i Web3 w jednej sekcji wizualnej poniżej separatora pozwala zachować
porządek i uniknąć paraliżu decyzyjnego, jednocześnie spełniając wymóg "równomiernego
rozłożenia".

2.3 Rola "Trybu Gościa"

Wymóg opcjonalnego "Trybu gościa" (Guest Mode) jest krytyczny dla konwersji. Pozwala on na
tzw. "Lazy Registration" – użytkownik może doświadczyć wartości platformy (np. obejrzeć
stream, przeglądać galerię NFT) przed podjęciem zobowiązania. Link "Kontynuuj bez
logowania" umieszczony dyskretnie na dole modala działa jak wentyl bezpieczeństwa dla
niezdecydowanych, redukując współczynnik odrzuceń (bounce rate).

3. System Wizualny: Dark Mode i Dostępność

(Accessibility)

Zgodnie z opisem wizualnym ("Czysty, ciemny modal"), projekt opiera się na paradygmacie
Dark Mode. Należy jednak pamiętać, że "ciemny tryb" nie oznacza po prostu czarnego tła.
Wymaga on precyzyjnej kalibracji kontrastu, aby spełnić normy WCAG 2.1 i zapewnić
czytelność.

3.1 Paleta Kolorystyczna i Fizyka Ekranów

Czysta czerń (#000000) jest w projektowaniu interfejsów unikana. Na nowoczesnych ekranach
OLED powoduje ona tzw. "smużenie" (smearing) przy przewijaniu, a wysoki kontrast z białym
tekstem męczy wzrok (astygmatyzm).

●  Powierzchnia Modala: Rekomendujemy użycie ciemnego szarego, np. #1E1E1E lub

#121212 (zgodnie z Material Design). Zapewnia to mniejsze zmęczenie oczu i pozwala
na budowanie głębi za pomocą jasności, a nie tylko cienia.

●  Hierarchia Głębi (Elevation): W trybie ciemnym cienie są słabo widoczne. Głębię

budujemy poprzez nakładanie półprzezroczystych warstw bieli na bazowy kolor ciemny.
Modal, będąc wyżej w hierarchii niż tło strony (backdrop), będzie miał jaśniejszy odcień
(np. odpowiednik 8% bieli na ciemnym tle).

3.2 Typografia i Kontrast

Dla zapewnienia dostępności (Accessibility), wszystkie teksty muszą spełniać wymóg kontrastu
minimum 4.5:1 (AA).

●  Tekst Główny (Primary): Biały z 87% kryciem (rgba(255, 255, 255, 0.87)). Unikamy

100% bieli, która "wibruje" na ciemnym tle.

●  Tekst Pomocniczy (Secondary/Placeholdery): Biały z 60% kryciem (rgba(255, 255,

255, 0.6)).

●  Tekst Nieaktywny (Disabled): Biały z 38% kryciem.

3.3 Układ Przestrzenny (Spacing & Layout)

Modal na desktopie powinien zajmować około 20-25% powierzchni ekranu, aby skupić uwagę
użytkownika, ale nie przytłaczać go. Rekomendowana szerokość to 400px - 480px. Marginesy
wewnętrzne (padding) na poziomie 32px lub 40px zapewnią oddech (whitespace), który jest
kluczowy dla postrzegania interfejsu jako "czystego" i nowoczesnego.

4. Specyfikacja Komponentów Formularza

4.1 Selektor Akcji (Tabs)

●  Lokalizacja: Górna część modala, pełna szerokość.
●

Interakcja: Dwa przyciski: "Zaloguj się" i "Zarejestruj się". Aktywny tab posiada wyraźny,
podświetlony wskaźnik (np. dolna krawędź w kolorze akcentowym) oraz jaśniejszy kolor
tekstu. Nieaktywny tab jest przygaszony.

●  Stan: Przełączenie tabów czyści formularz (lub zachowuje email, jeśli został wpisany) i

zmienia zestaw pól (ukrywa/pokazuje "Potwierdź hasło" i checkboxy).

4.2 Pola Wprowadzania Danych (Input Fields)

Dla zachowania estetyki Dark Mode, pola inputów nie powinny mieć jaskrawych obramowań w
stanie spoczynku.

●  Styl: Tło pola nieco jaśniejsze lub ciemniejsze od tła modala (np. #2C2C2C), zaokrąglone

rogi (8px).

●  Stan Focus: Po kliknięciu, pole otrzymuje wyraźny obrys (border) w kolorze marki (np.

cyjan lub fiolet), co ułatwia nawigację klawiaturą.

Pole Email

●  Walidacja: W czasie rzeczywistym (onBlur). Sprawdzenie formatu Regex

^[^\s@]+@[^\s@]+\.[^\s@]+$. Błąd wyświetlany pod polem w kolorze czerwonawym (np.
#CF6679 dla trybu ciemnego), nigdy czystą czerwienią, która jest słabo czytelna na
ciemnym tle.

Pole Hasło

●  Show/Hide Toggle: Ikona "Oka" umieszczona wewnątrz pola po prawej stronie.

Kliknięcie zmienia atrybut type z password na text. Jest to krytyczne dla UX, pozwalając
użytkownikom na weryfikację wpisu i redukując liczbę resetów haseł.

●  Potwierdź Hasło (Tylko Rejestracja): Zgodnie z wymaganiem, pole to pojawia się tylko
w karcie "Zarejestruj się". Walidacja sprawdza zgodność z polem powyżej w czasie
rzeczywistym.

●  Wskaźnik Siły Hasła: Pasek postępu pod polem hasła, zmieniający kolor (Czerwony ->

Żółty -> Zielony) w zależności od entropii hasła (długość, znaki specjalne).

4.3 Checkboxy i Zgody

●  Logowanie: "Zapamiętaj mnie". Domyślnie odznaczone (bezpieczeństwo publiczne) lub

zaznaczone (wygoda), w zależności od polityki sesji.

●  Rejestracja: "Akceptuję regulamin i politykę prywatności". Checkbox jest wymagany

(required). Linki do dokumentów otwierają się w nowym oknie (target="_blank"), aby nie
przerywać procesu rejestracji.

4.4 Przyciski Akcji (CTA)

Przycisk główny ("Zaloguj się" / "Utwórz konto") musi być najbardziej widocznym elementem
(Primary Button). Powinien zajmować pełną szerokość formularza i posiadać wysoki kontrast
(np. gradient brandowy lub jaskrawy kolor solid).

5. Integracja Web3 i SIWE (Sign-In with Ethereum)

To najbardziej innowacyjna i złożona część specyfikacji. Wymaga ona przełożenia technicznego
protokołu EIP-4361 na zrozumiały język interfejsu.

5.1 Przycisk Web3 i Instrukcja

●  Design: Przycisk o równej wadze wizualnej co przyciski OAuth. Ikona: Zestawienie logo
MetaMask i ogólnego symbolu portfela (WalletConnect), lub uniwersalna ikona Web3.

●  Etykieta: "Portfel kryptowalutowy" lub "Zaloguj przez Web3".
●

Instrukcja (Microcopy): Zgodnie z wymaganiem, po kliknięciu przycisku (lub tuż pod nim
jako tekst pomocniczy) pojawia się komunikat: "Podpisz wiadomość w swoim portfelu, aby
się zalogować.". Jest to kluczowe dla redukcji lęku użytkownika – wyjaśniamy, że
"podpisanie" nie oznacza "transakcji finansowej" (nie pobiera opłat Gas Fee), lecz jest
jedynie kryptograficznym dowodem tożsamości.

5.2 Mechanika SIWE i Stany Modala

Proces logowania Web3 jest asynchroniczny i odbywa się w kilku etapach, które interfejs musi
odzwierciedlić:

1.  Inicjacja: Użytkownik klika przycisk.
2.  Stan Ładowania (Loading State): Przycisk zmienia się w spinner lub pojawia się

nakładka (overlay) z komunikatem "Oczekiwanie na portfel...". W tle aplikacja generuje
unikalny Nonce (losowy ciąg znaków) pobrany z serwera, aby zapobiec atakom typu
Replay Attack.

3.  Pop-up Portfela: Zewnętrzne rozszerzenie (np. MetaMask) otwiera okno z prośbą o

podpis. Wiadomość musi być sformatowana zgodnie z EIP-4361, zawierając domenę,
adres portfela, nonce i czytelną informację: "Example.com wants you to sign in...".
4.  Weryfikacja: Po podpisaniu przez użytkownika, frontend przesyła podpis do backendu.

Backend weryfikuje podpis kryptograficzny i sprawdza ważność Nonce.

5.  Sukces/Błąd: W przypadku sukcesu następuje przekierowanie. W przypadku odrzucenia

podpisu w portfelu, modal wraca do stanu początkowego z komunikatem błędu:
"Logowanie anulowane przez użytkownika".

5.3 Aspekty Bezpieczeństwa Web3

Interfejs musi budować zaufanie.

●  Anty-Phishing: Protokół SIWE wymusza sprawdzanie domeny (Domain Binding).

Interfejs powinien wizualnie potwierdzać, że użytkownik loguje się do właściwej aplikacji
(np. poprzez wyświetlenie "Logowanie do: [Nazwa Aplikacji]" w nagłówku modala).
●  Obsługa Braku Portfela: Jeśli przeglądarka nie wykryje wstrzykniętego dostawcy (np.
window.ethereum jest undefined), kliknięcie przycisku nie może kończyć się "głuchą
ciszą". System musi zaproponować instalację portfela lub użycie protokołu WalletConnect
(skanowanie kodu QR telefonem), co jest standardem w roku 2025.

6. Integracja OAuth (Google, Twitch) i Separator

6.1 Separator Kontekstu

Pomiędzy formularzem a przyciskami zewnętrznymi znajduje się separator.

●  Wygląd: Cienka pozioma linia (1px, kolor #333) z wyśrodkowanym tekstem "Lub

kontynuuj przez" na tle koloru modala. Marginesy góra/dół (24px) zapewniają odpowiedni

oddech wizualny.

6.2 Przyciski OAuth

●  Google: Standard rynkowy. Przycisk z logo "G" i tekstem "Google". Użycie oficjalnych

assetów brandowych jest wymogiem budowania zaufania.

●  Twitch: Specyficzny dla grupy docelowej "Twórcy" (streamerzy). Logo Twitch (fioletowe) +
tekst "Twitch". Umieszczenie Twitcha na równi z Google sygnalizuje, że platforma jest
"gamer-friendly".

●  Układ: Przyciski OAuth i Web3 powinny tworzyć spójną grupę. Sugerowany układ to

siatka (Grid): dwa przyciski OAuth obok siebie (50% szerokości każdy) i przycisk Web3
poniżej na pełną szerokość (lub odwrotnie, w zależności od priorytetu biznesowego).
Zgodnie z wymaganiem "równomiernego rozłożenia", wariant trzech przycisków o
jednakowej szerokości w jednym rzędzie jest możliwy tylko na szerokich modalach; na
węższych lepiej sprawdza się układ kafelkowy lub lista pionowa.

7. Bezpieczeństwo i Infrastruktura Ochronna

7.1 Ochrona przed Botami: Cloudflare Turnstile

Wymóg "Bezpieczeństwo: CAPTCHA?" jest kluczowy. Tradycyjne CAPTCHA (wybieranie
hydrantów) drastycznie obniża konwersję (UX friction).

●  Rozwiązanie: Implementacja Cloudflare Turnstile w trybie "Managed" lub "Invisible".
●  Działanie: Widget Turnstile jest osadzony w formularzu. W 99% przypadków weryfikacja
następuje w tle (analiza telemetryczna przeglądarki) bez interakcji użytkownika. Dopiero
w przypadku wykrycia anomalii, użytkownik proszony jest o jedno kliknięcie (checkbox).
Integracja: Token wygenerowany przez Turnstile jest przesyłany razem z danymi
logowania (lub podpisem SIWE) do backendu, gdzie następuje jego weryfikacja przed
procesowaniem uwierzytelniania.

●

7.2 Walidacja i Obsługa Błędów

●  Debouncing: Walidacja pól tekstowych powinna być opóźniona (np. o 500ms od
ostatniego naciśnięcia klawisza), aby nie atakować użytkownika błędami w trakcie
pisania.

●  Bezpieczne Komunikaty Błędów: W przypadku nieudanego logowania, komunikat
powinien brzmieć "Nieprawidłowy email lub hasło", a nie "Nieprawidłowe hasło".
Uniemożliwia to enumerację użytkowników (sprawdzanie, czy dany email istnieje w
bazie).

8. Responsywność i Mobile First

Zgodnie z wymaganiem: "Modal na desktop, pełna strona na mobile".

8.1 Strategia Adaptacji

●  Desktop (> 600px): Modal wyśrodkowany na ekranie z półprzezroczystym tłem

(backdrop blur).
●  Mobile (< 600px):

○  Modal przestaje być "oknem". Rozciąga się na 100% szerokości i wysokości ekranu

(width: 100vw; height: 100vh).

○  Zaokrąglenia rogów znikają.
○  Przycisk zamknięcia ("X") może zmienić się w strzałkę "Wstecz" lub pozostać "X" w

prawym górnym rogu.

○  Obsługa Klawiatury Wirtualnej: Na mobile, wysunięcie klawiatury przysłania
dolną część ekranu. Interfejs musi być responsywny na zmianę wysokości
viewportu (visualViewport), pozwalając na przewijanie formularza tak, aby przycisk
"Zaloguj się" był zawsze dostępny.

8.2 Strefy Dotyku (Touch Targets)

Na ekranach dotykowych wszystkie elementy interaktywne (przyciski, linki, checkboxy) muszą
mieć minimalny rozmiar strefy aktywnej 44x44 piksele (wg wytycznych iOS) lub 48x48dp
(Android). Jest to szczególnie ważne dla checkboxa "Zapamiętaj mnie" oraz linków
pomocniczych, które często są zbyt małe w projektach desktopowych.

9. Podsumowanie Implementacji

Poniższa tabela podsumowuje kluczowe decyzje projektowe w odniesieniu do wymagań:
Rozwiązanie Projektowe
Wymaganie
Tabs (Zaloguj/Zarejestruj)
Struktura

Szczegóły Techniczne
Jasny podział intencji, redukcja
pomyłek.

Formularz

Email + Hasło (z Show/Hide)  Walidacja Regex, wskaźnik siły

Rejestracja

Potwierdź Hasło + Zgody

Web3 (SIWE)

Przycisk + Instrukcja

OAuth
Bezpieczeństwo

Google + Twitch
Cloudflare Turnstile

Responsywność

Modal / Full Page

Styl

Dark Mode

hasła, toggle widoczności.
Pole widoczne tylko w tabie
rejestracji.
EIP-4361, Nonce, komunikat
"Podpisz wiadomość...".
Ikony brandowe, układ gridowy.
Ochrona przed botami, tryb
niewidoczny (Invisible).
Adaptacja do Viewportu
mobilnego, obsługa klawiatury.
Kontrast WCAG AA, szare tła
(nie czarne), elevation.

Zaprojektowany system stanowi nowoczesną bramę do ekosystemu twórców, łączącą wymogi
bezpieczeństwa (Turnstile, SIWE Nonce) z płynnością użytkowania (Dark Mode, jasna
hierarchia, tryb gościa). Jest to rozwiązanie gotowe na wyzwania roku 2026, gdzie granica
między Web2 a Web3 ulega zatarciu.
(Koniec raportu)

Cytowane prace

1. Login & Signup UX – Complete 2025 Guide to Authentication Best Practices - Authgear,

https://www.authgear.com/post/login-signup-ux-guide 2. UI/UX Design for Web 3.0: Impact,
Challenges & Use Cases | Ramotion Agency,
https://www.ramotion.com/blog/ui-ux-design-for-web-3/ 3. Tips and Tricks for Creating a Good
Login Page Design - Lollypop, https://lollypop.design/blog/2025/october/saas-login-page-design/
4. Modal UX Design for SaaS in 2025 - Best Practices & Examples - Userpilot,
https://userpilot.com/blog/modal-ux-design/ 5. Dark theme - Material Design,
https://m2.material.io/design/color/dark-theme.html 6. The Designer's Guide to Dark Mode
Accessibility, https://www.accessibilitychecker.org/blog/dark-mode-accessibility/ 7. The Ultimate
Web3 Authentication Guide (2025): wallet sign-in, embedded wallets, and choosing the right
web3 auth provider | by Joan | Medium,
https://medium.com/@joalavedra/the-ultimate-web3-authentication-guide-2025-wallet-sign-in-e
mbedded-wallets-and-choosing-the-d4eace54f951 8. Best practices for Sign-In with Ethereum
(SIWE) implementation · wevm wagmi · Discussion #1989 - GitHub,
https://github.com/wevm/wagmi/discussions/1989 9. Sign-In With Ethereum (SIWE),
https://oxlib.sh/guides/siwe 10. Security Considerations - Sign-In with Ethereum,
https://docs.login.xyz/additional-support/security-considerations 11. Sign In With Ethereum
(SIWE) - Better Auth, https://www.better-auth.com/docs/plugins/siwe 12. Cloudflare Turnstile |
CAPTCHA Replacement Solution,
https://www.cloudflare.com/application-services/products/turnstile/ 13. Turnstile widgets -
Cloudflare Docs, https://developers.cloudflare.com/turnstile/concepts/widget/ 14. Widget
configurations - Turnstile - Cloudflare Docs,
https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configuration
s/ 15. Get started · Cloudflare Turnstile docs,
https://developers.cloudflare.com/turnstile/get-started/

