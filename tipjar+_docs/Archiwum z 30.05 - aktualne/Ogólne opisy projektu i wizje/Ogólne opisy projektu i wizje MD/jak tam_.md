Potwierdzam, jestem gotowy do kontynuowania. Przejdźmy teraz do sekcji 4.2. Strony dla
Zalogowanych Fanów, zaczynając od 4.2.1. Tablica Wsparcia (Feed Aktywności).
Będę integrował informacje z "Planu Implementacji Frontendowej Strony Portfela Fana
(TipJar).pdf" () tam, gdzie będzie to miało zastosowanie do rozbudowy odpowiednich sekcji
"UIUX_Poradnik_KOMPLEKSOWY.pdf" (), aby stworzyć nasz "MASTER PORADNIK".
Pozostałe dokumenty również będą brane pod uwagę dla zachowania spójności.
Oto kolejna część MASTER PORADNIKA w formacie Markdown:
# MASTER PORADNIK TIPJAR (Kontynuacja)

### 4.2. Strony dla Zalogowanych Fanów

Po zalogowaniu, fan uzyskuje dostęp do spersonalizowanych sekcji,
które ułatwiają wspieranie ulubionych twórców i zarządzanie własną
aktywnością na platformie TipJar. (, , , )

#### 4.2.1. Tablica Wsparcia (Feed Aktywności)

* **Cel Strony:** (, , , )
    * Centralny punkt dla fana po zalogowaniu.
    * Prezentacja dynamicznego i spersonalizowanego strumienia
aktywności związanej ze wspieraniem twórców, nowościami na platformie
oraz rekomendacjami.
    * Zachęcanie do regularnych odwiedzin i interakcji.

* **Layout i Kluczowe Elementy:**

    * **Nawigacja Główna (Zalogowany Użytkownik):** (, , , )
        * Umiejscowienie: Góra strony.
        * Tło: Ciemny turkus (np. `#006D6D`).
        * Elementy: Logo TipJar, pole wyszukiwania twórców,
linki/ikony: "Tablica Wsparcia" (aktywna), "Odkrywaj", "Mój Portfel",
"Powiadomienia" (ikona dzwonka w złocie z licznikiem), Miniatura
zdjęcia profilowego fana z rozwijanym menu (Ustawienia, Wyloguj). (, ,
, )
        * Animacja: Subtelny złoty `underline` pod aktywnym linkiem.
Ikona powiadomień może delikatnie pulsować złotym kolorem, jeśli są
nieprzeczytane. (, , , )

    * **Górny Pasek Akcji (pod główną nawigacją, opcjonalnie):** (, ,
, )
        * Szybkie przyciski: "Wesprzyj Twórcę" (otwiera modal
wyszukiwania i szybkiego napiwku), "Dodaj Środki do Portfela".
        * Przyciski złote z ciemnoturkusowym tekstem.

    * **Główny Feed (Centralna Kolumna):**
        * **Pole "Co nowego?" / "Wspomóż kogoś dzisiaj!":** (, , , )
            * Na samej górze feedu.
            * Może zawierać sugestię twórcy dnia lub zachętę do

wysłania napiwku.
            * Opcjonalnie: Uproszczony formularz do szybkiego
wyszukania twórcy i wpisania kwoty napiwku, z przyciskiem "TipIT!"
(złoty).
            * Animacja: Pole może delikatnie pulsować lub zmieniać
treść co jakiś czas.
        * **Wpisy w Feedzie (Posty):** Prezentowane jako karty lub
bloki na tle całej sekcji (jasny turkus/biały). (, , , )
            * **Nowe Napiwki od Znajomych/Obserwowanych** (jeśli
funkcja istnieje i użytkownik wyraził zgodę): "`[Awatar Fana] [Nazwa
Fana]` właśnie wsparł `[Nazwa Twórcy]` kwotą `[Kwota USDC]`!" (Kwota w
złocie). Mała ikona serca w złocie. (, , , )
            * **Osiągnięcia Celów przez Obserwowanych Twórców:**
"`[Awatar Twórcy] [Nazwa Twórcy]` właśnie osiągnął swój cel: `[Nazwa
Celu]`! Pomóż mu w kolejnym!" (Nazwa celu w złocie). Przycisk "Zobacz
Cel / Wesprzyj" (złoty). Animowany pasek postępu. (, , , )
            * **Nowi Twórcy (Rekomendacje "Dla Ciebie"):**
Algorytmicznie dobrane sugestie twórców. Karta twórcy (zdjęcie, nazwa,
krótki opis, przycisk "Obserwuj" lub "Zobacz Profil"). (, , , )
            * **Aktualizacje od Obserwowanych Twórców:** Jeśli twórcy
mogą publikować krótkie posty/aktualizacje w TipJar - wyświetlane
tutaj. Tekst w ciemnym turkusie, przycisk "Wesprzyj `[Nazwa Twórcy]`"
(złoty) pod postem. (, , , )
            * **Popularne Napiwki/Trendy:** "Twórca `[Nazwa Twórcy]`
jest teraz popularny! Zobacz jego profil." (, , , )
            * Animacje: Wpisy w feedzie mogą pojawiać się z góry na
dół z lekkim `fade-in` i `slide-down`. Interakcje (polubienia,
komentarze - jeśli będą) z mikroanimacjami. (, , , )

    * **Boczny Panel (Prawy - opcjonalny na desktopie, może być
zwinięty lub u dołu na mobile):** (, , , )
        * "Szybkie Napiwki dla Obserwowanych": Lista 2-3 obserwowanych
twórców z małymi przyciskami predefiniowanych kwot napiwków.
        * "Twoje Ostatnie Aktywności": Skrót do ostatnich wysłanych
napiwków.
        * "Cele, które Wspierasz": Przypomnienie i pasek postępu dla
nieosiągniętych celów, które fan wsparł.
        * Elementy panelu w ciemnoturkusowych blokach z złotymi
akcentami.

    * **Animacje Ogólne Strony:** (, , , )
        * Płynne, nieskończone przewijanie feedu (infinite scroll) z
animacją ładowania kolejnych wpisów (np. złoty spinner na dole).
        * Subtelne animacje `:hover` na interaktywnych elementach.

#### 4.2.2. Strona Portfela Fana / Wpłaty i Wypłaty

* **Cel Strony:** (, , , )

    * Umożliwienie fanom zarządzania ich saldem USDC w ramach TipJar
(jeśli fani mają własne, dewelopersko kontrolowane portfele w TipJar -
DCW).
    * Dokonywanie wpłat na ten wewnętrzny portfel.
    * Przeglądanie historii transakcji (wysłanych napiwków i wpłat).
    * Opcjonalnie: zlecanie wypłat środków z wewnętrznego portfela.

* **Stos Technologiczny (Frontend - zgodnie z Planem Implementacji
):**
    * Framework: Next.js (React)
    * Język: TypeScript
    * Styling: Tailwind CSS
    * Animacje: Framer Motion
    * Zarządzanie Stanem Globalnym (dla portfela): Zustand
    * Interakcja z portfelami Web3 (MetaMask): ethers.js / viem
    * Kody QR: `qrcode.react`

* **Globalny Stan Portfela (Zustand - `useWalletStore.ts`):** (, )
    * Przechowuje: `balance` (saldo USDC), `depositAddress` (adres
portfela USDC fana na obsługiwanej sieci, np. Polygon), `transactions`
(lista transakcji), stany `isLoading` (dla salda, transakcji, wpłat,
wypłat), `error` (globalny komunikat błędu).
    * Akcje (asynchroniczne, komunikujące się z backendem TipJar
`/api/wallet/...`):
        * `WorkspaceBalance()`: Pobiera saldo i adres depozytowy.
        * `WorkspaceTransactions()`: Pobiera historię transakcji.
        * `initiateCardDeposit(amount, fiatCurrency)`: Inicjuje wpłatę
kartą (on-ramp fiat->USDC przez backend i Circle Payments API).
Oczekuje `checkoutUrl` od backendu.
        * `requestWithdraw(amount, targetAddress)`: (Opcjonalne dla
MVP) Zleca wypłatę USDC na zewnętrzny adres (on-chain transfer przez
backend i Circle Transfers/Payouts API, potencjalnie z Circle Gas
Station).
    * Interfejs `Transaction`: `{ id, type: 'DEPOSIT' | 'TIP' |
'WITHDRAW', amount, currency: 'USDC', status: 'pending' | 'completed'
| 'failed', timestamp, source?, destination?, chainTxId? }` (, )

* **Integracja z Backendem i API Circle (koncept z Planu Implementacji
, ):**
    * Frontend komunikuje się z endpointami backendu TipJar (np.
`/api/wallet/balance`, `/api/wallet/transactions`,
`/api/wallet/deposit`, `/api/wallet/withdraw`).
    * Backend TipJar zarządza kluczami API Circle i wykonuje operacje
na Circle API:
        * Saldo: Circle Wallets API.
        * Transakcje: Circle Transactions API lub wewnętrzna baza
danych TipJar.
        * Wpłaty Fiat: Circle Payments API (lub np. Stripe

zintegrowany z Circle). Backend obsługuje webhooki/potwierdzenia i
zasila portfel DCW fana.
        * Wypłaty Krypto: Circle Transfers API (z DCW fana na
zewnętrzny adres, z użyciem Circle Gas Station jeśli portfel fana to
SCA).
    * Typy danych (request/response) dla komunikacji frontend-backend
są zdefiniowane (np. `BalanceResponse`, `TransactionsResponse`,
`DepositResponse`, `WithdrawResponse`). (, )

* **Layout i Kluczowe Komponenty Strony Portfela Fana:**

    * **Nawigacja Główna:** Standardowa dla zalogowanego fana. (, , ,
)
    * **Tytuł Strony:** "Mój Portfel TipJar" (Montserrat Bold, złoty).
(, , , )

    * **Komponent `WalletOverview.tsx` (Podsumowanie portfela):** (, )
        * Cel: Wyświetlenie salda i głównych akcji. (, )
        * Pobiera `balance` i `isLoading.balance` z `useWalletStore`.
(, )
        * **Panel Salda:** (, , , )
            * Tło: Ciemny turkus (np. `#008080` lub z Planu
Implementacji `bg-teal-800`). Zaokrąglone rogi.
            * Tekst "Twoje Saldo USDC:" (biały/jasny turkus, Open Sans
SemiBold).
            * Saldo: Duża, pogrubiona czcionka (Montserrat Bold),
kolor złoty (np. `text-yellow-400`). Animacja "number roll" lub
`opacity/scale` z Framer Motion przy odświeżeniu/zmianie. (, )
            * Ikona USDC: Obok salda.
            * Stan ładowania: Placeholder (np. `animate-pulse` z
Tailwind CSS). (, , , )
            * Opcjonalna informacja: "Portfel TipJar (Polygon) –
opłaty transakcyjne pokrywa platforma." (jeśli dotyczy użycia SCA/Gas
Station). (, )
        * **Przyciski Akcji:** (, , , )
            * "Wpłać Środki": Duży, złote tło (`bg-yellow-400`),
ciemnoturkusowy tekst. Animacja `whileHover={{ scale: 1.05 }}`.
Otwiera `DepositModal`. (, , , )
            * "Historia Napiwków": Styl "ghost" (złota ramka i tekst).
Przewija do sekcji historii lub zmienia zakładkę. (, , , )

    * **Komponent `TransactionList.tsx` (Historia transakcji):** (, )
        * Cel: Wyświetlenie listy operacji (wpłaty, wysłane napiwki,
wypłaty). (, )
        * Pobiera `transactions` i `isLoading.transactions` oraz akcję
`WorkspaceTransactions` z `useWalletStore`. (, )
        * `useEffect` do pobrania transakcji przy montowaniu
komponentu. (, )

        * Tytuł sekcji: "Historia transakcji" (np. `text-xl font-bold
text-center text-teal-100 mb-4`).
        * Stan ładowania: Placeholdery (np. kilka szarych, pulsujących
pasków). (, , , )
        * Lista transakcji (`<ul>`): Każda transakcja (`<li>`)
zawiera: (, )
            * Typ transakcji (Wpłata, Wypłata, Napiwek) i walutę
(USDC).
            * Status (np. "(w trakcie)" - żółty, "(nieudane)" -
czerwony).
            * Sformatowana data i czas (np. `dd.MM.yyyy HH:mm` przy
użyciu `date-fns`). (, )
            * Kwota z odpowiednim znakiem (+/-) i kolorem (np. zielony
dla wpłat, czerwony/niebieski dla wydatków). (, )
        * Stan pusty: Komunikat "Brak transakcji do wyświetlenia." (,
)
        * Stylizacja: Zgodna z Tailwind CSS, ciemne tła, złote i
turkusowe akcenty.

    * **Komponent `DepositModal.tsx` (Modal doładowania portfela):**
(, )
        * Cel: Umożliwienie wpłaty USDC (krypto) lub doładowania kartą
(fiat-to-USDC). (, )
        * Struktura modala: Nakładka, wyśrodkowany kontener, przycisk
zamknięcia. (, )
        * **Sekcja "Wpłata Krypto (USDC)":** (, , , )
            * Wyświetla `depositAddress` z `useWalletStore`.
            * Przycisk "Kopiuj Adres"
(`navigator.clipboard.writeText`) z powiadomieniem (np. toast
"Skopiowano!").
            * Kod QR dla adresu (wygenerowany np. przez
`qrcode.react`).
            * Instrukcja/ostrzeżenie: "Wyślij **tylko** USDC na sieci
Polygon..."
        * **Sekcja "Doładuj Kartą":** (, , , )
            * Pola input: kwota fiat (kontrolowana stanem lokalnym
`fiatAmount`), wybór waluty (PLN, USD, EUR - stan `fiatCurrency`).
            * Dynamiczne szacowanie kwoty USDC do otrzymania (funkcja
`updateEstimate` może wołać backend `/api/wallet/estimateUSDC`).
            * Przycisk "Przejdź do Płatności Kartą": wywołuje akcję
`initiateCardDeposit` ze store. Przycisk `disabled` podczas ładowania
(`isDepositing`) lub gdy kwota <= 0. Tekst przycisku zmienia się na
"Przekierowywanie...".
            * Widoczność sekcji warunkowana flagą konfiguracyjną (np.
`ENABLE_CARD_ONRAMP`).
        * Obsługa stanów ładowania (`isDepositing`) i błędów.

    * **Komponent `WithdrawModal.tsx` (Modal wypłaty środków -

opcjonalny dla MVP):** (, )
        * Cel: Umożliwienie fanowi wypłaty USDC na zewnętrzny portfel
Web3. (, )
        * Formularz: Kwota USDC do wypłaty, docelowy adres krypto (np.
Ethereum/Polygon). (, )
        * Walidacja: Kwota > 0 i <= saldo; poprawność formatu adresu
(np. regex `^0x[0-9A-Fa-f]{40}$`). (, , , )
        * Akcja: Wywołanie `requestWithdraw` ze store. (, )
        * Feedback dla użytkownika: Toast "Zlecono wypłatę...",
aktualizacja historii transakcji (status "pending"). (, )
        * Informacja o potencjalnych opłatach sieciowych (lub ich
pokryciu przez Gas Station).

    * **Integracja z MetaMask (Web3) i SIWE (Sign-In With Ethereum):**
(, )
        * Hook `useWeb3.ts` (np. z `ethers.js`) do obsługi połączenia
z MetaMask (`window.ethereum.request({ method: 'eth_requestAccounts'
})`). (, )
        * Przycisk "Połącz portfel Web3" w UI. (, )
        * Obsługa SIWE:
            * Frontend pobiera `nonce` z backendu
(`/api/auth/siwe-challenge`).
            * Używa `signer.signMessage()` do podpisania wiadomości
SIWE (skonstruowanej np. biblioteką `siwe`).
            * Wysyła wiadomość i podpis do backendu
(`/api/auth/siwe-verify`) w celu weryfikacji i utworzenia sesji. (, )
        * Możliwość użycia połączonego portfela do płatności/wypłat
(zaawansowane, może wykraczać poza MVP portfela fana).
        * Wykrywanie aktywnej sieci i prośba o jej zmianę
(`wallet_switchEthereumChain`). (, )

    * **Animacje (Framer Motion) i Stany Ładowania:** (, )
        * Animacja odświeżenia salda (np. `opacity/scale` w
`WalletOverview`).
        * Efekty `:hover` i `:whileTap` dla przycisków.
        * Płynne pojawianie się/znikanie modali (`AnimatePresence`,
`initial/animate/exit props`).
        * Spinnery (np. `FiLoader` z `react-icons/fi`, `animate-spin`)
lub tekstowe wskaźniki ładowania.
        * Skeleton screens dla list i danych (np. `animate-pulse` w
`TransactionList`).
        * Toasty dla potwierdzeń i błędów.

    * **Wskazówki Optymalizacyjne (Pro Tips):** (, )
        * Podział kodu (dynamiczne importy dla modali).
        * Cache i rewalidacja danych (React Query, SWR, lub
persystencja Zustand).
        * Minimalizacja re-renderów (precyzyjne selektory Zustand,

`React.memo`).
        * Paginacja/infinite scroll dla długich list transakcji.
        * Debouncing dla inputów (np. przy estymacji kwoty USDC).
        * Pre-fetching danych (SSR/ISR w Next.js - z uwagą na
aktualność danych).
        * Automatyczne ponawianie prób (retry) dla nieudanych zapytań
API.
        * Logowanie błędów frontendu (np. Sentry).

    * **Doświadczenie Użytkownika - Feedback i Walidacje:** (, )
        * Czytelne komunikaty, unikanie żargonu.
        * Natychmiastowa walidacja danych wejściowych z jasnym
feedbackiem.
        * Nieblokujące powiadomienia (toasty) zamiast `alert()`.
        * Opcjonalne okna potwierdzenia dla krytycznych akcji (np.
wypłata).
        * Przyjazne komunikaty o błędach, sugerujące rozwiązania.
        * Zgodność ze stylem TipJar (kolory, fonty, spacing).

#### 4.2.3. Strona Obserwowani

* **Cel Strony:** (, , , )
    * Umożliwienie fanom przeglądania listy twórców, których
obserwują.
    * Szybki dostęp do profili obserwowanych twórców.
    * Zarządzanie listą obserwowanych (np. możliwość odobserwowania).

* **Layout i Kluczowe Elementy:** (, , , )

    * **Nawigacja Główna:** Standardowa dla zalogowanego fana. (, , ,
)
    * **Tytuł Strony:** "Obserwowani Twórcy" (Montserrat Bold, złoty).
(, , , )
    * **Opcje Sortowania/Filtrowania (nad listą):** (, , , )
        * Sortuj według: "Najnowsza Aktywność", "Alfabetycznie",
"Najczęściej Wspierani" (Dropdown stylizowany na złoto i turkus).
    * **Lista/Siatka Obserwowanych Twórców:** (, , , )
        * Styl podobny do strony "Odkrywaj Twórców" - karty z zdjęciem
profilowym, nazwą, `@username`.
        * Dodatkowo na karcie: Informacja o ostatniej aktywności
twórcy lub data ostatniego wsparcia przez fana.
        * Przyciski Akcji na Karcie: "Zobacz Profil" (złoty),
"Wesprzyj" (złoty, mniejszy), "Odobserwuj" (przycisk ciemnoturkusowy z
złotym tekstem/ikoną lub ikona "X" w złocie; po kliknięciu modal
potwierdzający).
        * Animacja: Jak na stronie "Odkrywaj Twórców". Animacja
usunięcia karty po odobserwowaniu.
    * **Stan Pusty:** Komunikat "Jeszcze nikogo nie obserwujesz. [Link

do 'Odkrywaj Twórców']" (link złoty). (, , , )

#### 4.2.4. Strona Powiadomień (Rozbudowana)

* **Cel Strony:** (, , , )
    * Agregacja wszystkich powiadomień dla użytkownika (fana lub
twórcy) w jednym miejscu.
    * Możliwość filtrowania i zarządzania powiadomieniami.

* **Layout i Kluczowe Elementy:** (, , , )

    * **Nawigacja Główna:** Standardowa dla zalogowanego użytkownika.
    * **Tytuł Strony:** "Powiadomienia" (Montserrat Bold, złoty).
    * **Filtry (nad listą):** (, , , )
        * Przyciski/Zakładki: "Wszystkie", "Napiwki" (dla twórców),
"Wsparcie" (dla fanów), "Cele", "Konto", "Promocje". Aktywny filtr
podświetlony złotem.
    * **Lista Powiadomień:** (, , , )
        * Każde powiadomienie jako osobny wiersz/karta. Tło: Ciemny
turkus. Nieprzeczytane mogą mieć jaśniejsze tło lub złotą
kropkę/pasek.
        * Treść: Ikona powiadomienia (złota, zależna od typu), Tytuł
(biały/jasny turkus, kluczowe słowa w złocie), Krótki fragment treści,
Znacznik czasu.
        * Przykład (dla twórcy): `[Ikona Złotej Monety] Nowy Napiwek!
Użytkownik [NazwaFana] wysłał Ci [Kwota USDC]. 2 min temu.`
        * Przykład (dla fana): `[Ikona Celu] Cel Osiągnięty!
[NazwaTwórcy] dziękuje za wsparcie celu [NazwaCelu]! 1 godz temu.`
        * Akcje dla Powiadomienia (`:hover` lub stałe): "Oznacz jako
przeczytane/nieprzeczytane", "Usuń powiadomienie".
        * Animacja: Nowe powiadomienia pojawiają się z góry
(`slide-down` i `fade-in`). Zmiana statusu na "przeczytane" z
subtelnym zanikiem złotego wskaźnika.
    * **Stan Pusty:** Komunikat "Nie masz jeszcze żadnych powiadomień"
z ikoną dzwonka. (, , , )
    * **Animacje Ogólne:** Płynne ładowanie listy, animacje filtrów.
(, , , )

#### 4.2.5. Ustawienia Konta Fana

* **Cel Strony:** (, , , )
    * Umożliwienie fanowi zarządzania podstawowymi danymi profilu,
ustawieniami powiadomień, bezpieczeństwem i połączonymi kontami.

* **Layout i Kluczowe Elementy:** (, , , )

    * **Nawigacja Główna:** Standardowa.
    * **Układ z Zakładkami (Tabs) lub Bocznym Menu:** (, , , )

        * Zakładki/Menu: "Profil", "Bezpieczeństwo", "Powiadomienia",
"Połączone Konta". Aktywna podświetlona złotem.
        * Tło sekcji: Ciemny turkus. Panele/formularze wewnątrz na
jaśniejszym turkusie/białym.
    * **Sekcja "Profil":** (, , , )
        * Zmiana awatara, nicka (jeśli fani mają publiczne profile).
        * Ustawienia prywatności (np. widoczność napiwków).
    * **Sekcja "Bezpieczeństwo":** (, , , )
        * Zmiana hasła.
        * Konfiguracja 2FA (jeśli zaimplementowane).
        * Przegląd aktywnych sesji.
    * **Sekcja "Powiadomienia":** (, , , )
        * Checkboxy do włączania/wyłączania różnych typów powiadomień
(email, push).
    * **Sekcja "Połączone Konta":** (, , , )
        * Lista połączonych kont społecznościowych (Google, Twitch
itp.) z opcją odłączenia.
        * Lista połączonych portfeli krypto (np. MetaMask dla SIWE lub
płatności) z opcją odłączenia.
    * **Przyciski "Zapisz Zmiany":** Złote, na dole każdej sekcji
formularza. (, , , )
    * **Styl formularzy:** Etykiety ciemnoturkusowe, pola input z
złotymi akcentami przy `:focus`. (, , , )
    * **Animacje:** Płynne przejścia między zakładkami. Animacje
potwierdzające zapisanie zmian (np. zielony toast ze złotą ikoną
ptaszka). (, , , )

---

To jest fragment do sekcji 4.2.5. Następnie przejdę do 4.3. Strony dla Zalogowanych
Twórców (Creator Dashboard). Ta sekcja jest bardzo obszerna w Przewodniku UI/UX, więc
prawdopodobnie podzielę ją na mniejsze części.

