# Holistyczna Architektura i Specyfikacja UX dla Hybrydowego Modalu Płatności (Fiat-Web3)

## 1. Wstęp: Konwergencja Paradygmatów Płatniczych w Ekonomii Twórców

Współczesna ekonomia cyfrowa przechodzi fundamentalną transformację strukturalną, charakteryzującą się zacieraniem granic między tradycyjną infrastrukturą finansową (Fiat) a zdecentralizowanymi protokołami Web3. Twórcy treści, platformy streamingowe oraz serwisy subskrypcyjne coraz częściej wymagają interfejsów płatniczych, które łączą te dwa światy, nie obciążając użytkownika końcowego złożonością technologiczną. Niniejszy raport stanowi wyczerpującą specyfikację projektową i architektoniczną dla zaawansowanego "Modalu Płatności" (Widget Płatności), zaprojektowanego zgodnie z najnowszymi trendami na rok 2025. Głównym celem tego opracowania jest dostarczenie kompletnej mapy drogowej dla zespołów produktowych, projektantów UX oraz inżynierów full-stack, którzy stają przed wyzwaniem wdrożenia systemu obsługującego trzy odrębne szyny płatnicze: tradycyjne karty płatnicze (via Circle), transakcje kryptowalutowe (Ethereum/Web3) oraz zamknięte salda platformowe (TipJar). Raport ten wykracza poza proste zestawienie funkcjonalności, oferując głęboką analizę psychologii użytkownika, strategii zarządzania stanem aplikacji, protokołów bezpieczeństwa oraz systemów wizualnych niezbędnych do zbudowania narzędzia finansowego budzącego zaufanie.

Kluczowym wyzwaniem, na które odpowiada ten projekt, jest "abstrakcja złożoności" – imperatyw projektowy polegający na ukryciu asynchronicznej, probabilistycznej natury transakcji blockchain oraz rygorystycznych wymogów regulacyjnych bankowości za jednolitym, płynnym interfejsem użytkownika. Proponowane rozwiązanie wykorzystuje trendy projektowe prognozowane na rok 2025, w szczególności Glassmorphism i adaptacyjny Dark Mode, aby stworzyć estetykę premium. Funkcjonalnie, system opiera się na zaawansowanych maszynach stanów, które radzą sobie ze zmiennością opłat transakcyjnych (gas fees), opóźnieniami sieci oraz weryfikacją procesorów płatniczych. Integracja programowalnej infrastruktury płatniczej Circle z robustnym konektorem Web3 zapewnia inkluzywność zarówno dla użytkowników "crypto-native", jak i tradycyjnych darczyńców.

## 2. Architektura Wizualna i System Design: Estetyka Zaufania

Interfejs użytkownika (UI) jest głównym wektorem zaufania w transakcjach finansowych. Badania wskazują, że jeśli modal płatności wydaje się przestarzały, nieintuicyjny lub niespójny wizualnie, wskaźniki porzuceń transakcji drastycznie rosną – jest to szczególnie widoczne w przypadku procesów Web3, które z natury obarczone są większym tarciem poznawczym. W tej sekcji szczegółowo omówiono hierarchię wizualną, interakcje oraz decyzje estetyczne, które definiują tożsamość widgetu.

### 2.1. Glassmorphism i Trendy Wizualne 2025: "Liquid Glass"

Język wizualny modalu opiera się na koncepcji "Glassmorphism" (lub Liquid Glass), która według prognoz zdominuje interfejsy cyfrowe w 2025 roku. Styl ten wykorzystuje półprzezroczystość, rozmycie tła oraz wielowarstwową głębię, aby stworzyć interfejs, który wydaje się lekki, a jednocześnie materialny i nowoczesny. W przeciwieństwie do płaskich projektów z poprzedniej dekady, podejście Liquid Glass traktuje modal jako fizyczny obiekt wchodzący w interakcję ze światłem.

Tło modalu nie jest litą aplą koloru, lecz półprzezroczystą powierzchnią wykorzystującą właściwość CSS backdrop-filter: blur(20px). Zabieg ten pozwala na subtelne prześwitywanie treści znajdującej się pod spodem (np. profilu twórcy lub strumienia wideo), co utrzymuje kontekst użytkownika, jednocześnie skupiając jego uwagę na procesie płatności. Aby unikąć problemów z czytelnością, stosuje się zaawansowane techniki warstwowania. Modal umieszczony jest na warstwie o wysokim indeksie Z (z-index). Wewnątrz samego modalu poszczególne sekcje – takie jak selektor kwoty czy akordeon metod płatności – wykorzystują zróżnicowane stopnie przezroczystości do ustalenia hierarchii informacji. Element "aktywny" jest najbardziej kryjący, przyciągając wzrok, podczas gdy elementy drugoplanowe wycofują się w tło dzięki wyższej transparentności.

Kluczowym elementem definiującym ten styl są krawędzie i światła. Aby unikować efektu "brudnego szkła", granice modalu i wewnętrznych kart są definiowane przez subtelne, 1-pikselowe obramowania o niskim stopniu krycia (10-20%). Imituje to światło załamujące się na krawędzi tafli szkła, wzmacniając granice kontenera bez konieczności stosowania ciężkich, kontrastowych linii. Jest to zgodne z ewolucją interfejsów Apple i systemów Fluent Design, które dążą do organicznej integracji technologii z otoczeniem użytkownika.

### 2.2. Adaptacyjne Systemy Kolorystyczne: Dark Mode jako Standard

Biorąc pod uwagę specyfikę grupy docelowej – entuzjastów kryptowalut i cyfrowych twórców – modal został zaprojektowany jako w pełni responsywny wobec preferencji systemowych użytkownika, z domyślnym naciskiem na tryb ciemny (Dark Mode). Statystyki i badania UX sugerują, że tryb ciemny nie jest już tylko opcją estetyczną, ale wymogiem funkcjonalnym, redukującym zmęczenie oczu i oszczędzającym baterię na ekranach OLED.

Implementacja techniczna wykorzystuje zapytania mediów CSS prefers-color-scheme oraz nowoczesną funkcję kolorów light-dark(), która pozwala na definiowanie zmiennych kolorystycznych adaptujących się w czasie rzeczywistym.

| Element UI     | Tryb Ciemny (Dark Mode)      | Tryb Jasny (Light Mode)       | Uzasadnienie UX |
|----------------|------------------------------|-------------------------------|-----------------|
| Tło Modalu    | rgba(23, 23, 28, 0.85)      | rgba(255, 255, 255, 0.75)    | Zapewnia odpowiedni kontrast dla tekstu przy zachowaniu efektu szkła. |
| Tekst Główny  | #F5F5F5 (Off-White)         | #1A1A1A (Deep Charcoal)      | Unikanie czystej bieli na czerni zapobiega efektowi halacji (rozmycia). |
| Akcent (Przycisk) | Gradient Złoty + Cień Glow | Gradient Złoty (Ciemniejszy) | Złoto kojarzy się z wartością/pieniądzem; cień w trybie ciemnym dodaje "neonowego" charakteru. |
| Ramki/Bordery | rgba(255, 255, 255, 0.15)   | rgba(0, 0, 0, 0.1)           | Subtelna definicja krawędzi bez dominacji wizualnej. |

W kontekście Web3, domyślna prezentacja skłania się ku estetyce "Cyberpunk/Futuristic", co jest zgodne z oczekiwaniami użytkowników krypto-natywnych. Jednakże, gdy system wykryje tryb jasny, efekt szkła zmienia się z "dymionego" na "szroniony" (frosted), zachowując elegancję i czytelność. Co istotne, integracja z zewnętrznymi komponentami, takimi jak Circle Elements (iframe), wymaga dynamicznego przekazywania stylów CSS w zależności od wykrytego trybu, co zostało szczegółowo opisane w sekcji technicznej.

### 2.3. Mikro-interakcje i Motion Design

W projektowaniu interfejsów fintech, ruch nie pełni funkcji dekoracyjnej, lecz komunikacyjną. Animacje służą do maskowania czasów ładowania, potwierdzania akcji i prowadzenia wzroku użytkownika przez skomplikowane procesy decyzyjne.

- **Płynne Przejścia (Transitions)**: Zgodnie z wymaganiami, przejścia między krokami (wybór kwoty -> wybór metody) są realizowane za pomocą animacji typu "slide" lub płynnego zmiany rozmiaru kontenera. Kiedy użytkownik wybiera metodę płatności, akordeon nie po prostu "wyskakuje"; rozwija się on z użyciem krzywej Beziera (cubic-bezier(0.4, 0.0, 0.2, 1)), co nadaje interfejsowi odczucie fizyczności i precyzji.

- **Stany Ładowania (Loading States)**: Zamiast generycznego spinnera blokującego cały ekran, stan ładowania jest kontekstowy. Przycisk "Wyślij napiwek" przechodzi metamorfozę – tekst znika, a szerokość przycisku zmniejsza się do okręgu zawierającego obracający się loader. Pozwala to utrzymać skupienie użytkownika na punkcie interakcji, redukując niepokój związany z oczekiwaniem na potwierdzenie sieci blockchain.

- **Feedback Sukcesu/Błędu**: W momencie pomyślnego zakończenia transakcji, zawartość modalu płynnie zanika, a na ekranie rysowany jest (np. za pomocą biblioteki Lottie) duży, zielony "Checkmark". Towarzyszy temu subtelna animacja konfetti (cząsteczkowa), która wzmacnia pozytywne wzmocnienie (dopamina) po dokonaniu wsparcia. W przypadku błędu, modal wykorzystuje wzorzec "shake" (poziome drganie), intuicyjnie sygnalizując problem, a komunikat błędu wysuwa się w formie toasta, wyjaśniając przyczynę w prostym języku (np. "Niewystarczające środki" zamiast "Error 502").

## 3. Ścieżka Użytkownika (User Journey): Analiza Krok po Kroku

Modal został zaprojektowany z myślą o minimalizacji tarcia poznawczego. Struktura jest ściśle hierarchiczna i prowadzi użytkownika przez pętlę decyzyjną: Kto (Odbiorca) -> Ile (Kwota) -> Jak (Metoda) -> Zatwierdź (Akcja). Poniżej znajduje się szczegółowa analiza każdego z kroków zdefiniowanych w zapytaniu.

### 3.1. Nagłówek: Budowanie Zaufania i Kontekstu

Górna sekcja modalu pełni funkcję "kotwicy zaufania". Użytkownik, zwłaszcza w środowisku Web3, musi mieć absolutną pewność, do kogo trafiają jego środki.

- **Avatar i Weryfikacja**: Centralnie lub po lewej stronie umieszczony jest awatar twórcy (48x48px). Obok nazwy wyświetlana jest ikona weryfikacji (np. niebieski "check"), co jest standardem w mediach społecznościowych i zapobiega oszustwom typu "impersonation".

- **Kontekstualny Tytuł**: Fraza "Wesprzyj" jest wyświetlana pogrubioną czcionką bezszeryfową.

- **Przycisk Zamknięcia**: Ikona 'X' w prawym górnym rogu musi posiadać odpowiednio dużą strefę dotyku (min 44x44px na mobile), aby zapewnić łatwe wyjście z procesu bez frustracji.

### 3.2. Krok 1: Wybór Kwoty – Psychologia Cenowa

Sekcja ta wykorzystuje efekt zakotwiczenia (anchoring). Prezentując predefiniowane opcje, redukujemy obciążenie poznawcze związane z podejmowaniem decyzji "ile dać".

- **Szybkie Przyciski (Presets)**: Pięć przycisków w formie "pastylek" (pills) lub okręgów z kwotami $1, $5, $10, $20, $50. Opcje środkowe ($5 i $10) mogą być wizualnie wyróżnione (np. delikatnie większe lub z subtelną poświatą), sugerując "rekomendowaną" wysokość napiwku.

- **Custom Input z Walidacją**: Poniżej znajduje się duże pole numeryczne pozwalające na wpisanie dowolnej kwoty.

  - **Walidacja w czasie rzeczywistym**: Jeśli użytkownik wpisuje "0.005", obramowanie pola zmienia kolor na czerwony, a pod spodem pojawia się mikrokopia: "Minimalna kwota to $0.01". Analogicznie dla kwot powyżej $10,000. Zapobiega to błędom API na wczesnym etapie.

  - **Przelicznik "Na Żywo" (Live Conversion)**: To kluczowy element dla hybrydowego charakteru modalu. Gdy użytkownik wpisuje kwotę w USD (np. "20"), dynamiczna etykieta poniżej aktualizuje się w czasie rzeczywistym, pokazując równowartość w stablecoinie lub krypto: "≈ 20.05 USDC" lub "≈ 0.008 ETH". Dane te pobierane są z wyroczni cenowej (Oracle) co 30 sekund. Ta transparentność jest niezbędna dla użytkowników planujących płatność Web3, budując zrozumienie kosztów przed przejściem do wyboru metody.

### 3.3. Krok 2: Wybór Metody Płatności – Wzorzec Akordeonu

Zamiast przytłaczać użytkownika trzema formularzami jednocześnie, zastosowano wzorzec akordeonu. Pozwala to na zachowanie czystości interfejsu i skupienie uwagi na wybranej ścieżce.

- **Karty Opcji**: Trzy wyraźne karty reprezentujące metody:

  1. Karta Płatnicza: Ikona karty kredytowej + tekst "Karta / Google Pay".

  2. Portfel Kryptowalutowy: Ikona MetaMask/WalletConnect + tekst "Web3 Wallet".

  3. TipJar Balance: Ikona słoika + tekst "Saldo ($45.00)". Wyświetlanie salda bezpośrednio na etykiecie jest kluczową informacją zwrotną – jeśli saldo jest zerowe, opcja ta może być wizualnie "wyszarzona" (disabled) lub opatrzona linkiem "Doładuj".

- **Mechanika Interakcji**: Po kliknięciu w kartę, rozwija się ona, ujawniając dedykowany formularz, a pozostałe karty automatycznie się zwijają. Animacja ta musi być niezwykle płynna, z jednoczesnym dostosowaniem wysokości całego modalu, aby uniknąć "skoków" treści.

### 3.4. Krok 3: Formularze Metod – Szczegółowa Specyfikacja

Każda metoda wymaga specyficznego podejścia UX/UI, wynikającego z jej technologicznego zaplecza.

#### 3.4.1. Karta Płatnicza (Circle Integration)

Integracja z Circle API narzuza rygorystyczne wymogi bezpieczeństwa (PCI DSS).

- **Circle Elements**: Pola na numer karty, datę ważności i CVC nie są zwykłymi inputami HTML, lecz elementami <iframe> wstrzykiwanymi przez SDK Circle. Z perspektywy użytkownika musi to być niewidoczne.

- **Stylizacja**: Modal przekazuje do iframe'a odpowiednie klasy CSS i zmienne kolorystyczne, aby pola te wyglądały identycznie jak reszta aplikacji (Dark/Light mode).

- **Komunikat Bezpieczeństwa**: Stopka formularza zawiera ikonę kłódki oraz tekst "Secure by Circle", co buduje zaufanie u użytkowników nieobeznanych z platformą.

- **Opcja "Zapisz Kartę"**: Checkbox "Zapisz tę kartę do przyszłych płatności" jest kluczowy dla retencji. Należy wyjaśnić (np. w tooltipie), że platforma nie przechowuje pełnego numeru karty, lecz jedynie bezpieczny token płatniczy (cardID) zwrócony przez Circle.

#### 3.4.2. Web3 (Ethereum Wallet)

To najbardziej złożony element pod kątem UX, wymagający obsługi wielu stanów (brak portfela, połączenie, sieć, podpis).

- **Selektor Portfeli**: Przycisk "Połącz portfel" otwiera natywny lub biblioteczny (np. RainbowKit) selektor portfeli (MetaMask, Coinbase, WalletConnect).

- **Stan Połączony**: Po autoryzacji, widok zmienia się. Wyświetlany jest skrócony adres portfela (np. 0x12...4F) oraz aktualne saldo w walucie bazowej (ETH/MATIC) i USDC.

- **Przycisk Akcji**: "Zatwierdź transakcję". Kliknięcie nie wysyła pieniędzy natychmiast, lecz wywołuje prośbę o podpis w rozszerzeniu portfela. Modal musi w tym momencie wejść w stan "Oczekiwanie na podpis", instrując użytkownika, by sprawdził swój portfel.

#### 3.4.3. TipJar Balance

Najprostsza i najszybsza metoda.

- **Prezentacja**: Wyświetla aktualne saldo i kwotę, która zostanie po transakcji.

- **Przycisk**: "Zapłać z salda". Ponieważ transakcja jest wewnętrzna (off-chain), jest natychmiastowa.

### 3.5. Krok 4: Dodatkowe Opcje i Personalizacja

Sekcja ta, realizowana jako kolejny element akordeonu lub stały blok pod metodami, pozwala na wzbogacenie transakcji.

- **Wiadomość**: Pole tekstowe z limitem znaków (np. 140) i licznikiem.

- **Proof of Support NFT**: Checkbox "Chcę otrzymać Proof of Support NFT" jest domyślnie zaznaczony.

  - **Implikacja UX**: Jeśli użytkownik płaci kartą, system musi poinformować (np. małym drukiem), że NFT zostanie przypisane do jego konta email lub wygenerowanego portfela custodial, z możliwością późniejszego odebrania (claim). Jeśli płaci Web3, NFT może być wybite w tej samej transakcji lub jako osobny airdrop.

- **Anonimowość**: Checkbox "Pozostań anonimowy". Jego zaznaczenie zmienia publiczną prezentację darczyńcy na "Anonimowy Wspierający", ale backend nadal przechowuje dane dla celów AML/KYC.

### 3.6. Krok 5: Podsumowanie i Finalizacja

Przed ostatecznym kliknięciem, użytkownik widzi tabelę podsumowującą.

- **Tabela Kosztów**:

  - Kwota Napiwku: $20.00

  - Opłata Platformy (np. 2%): $0.40

  - Opłata Sieciowa (Gas - dla Web3): ~$1.50 (szacowana)

  - Łącznie: $21.90

- **Przycisk Finalny**: Duży, złoty przycisk z dynamiczną etykietą: "Wyślij napiwek $21.90". Jego stan "loading" jest animowany, a po sukcesie następuje przejście do ekranu podziękowania.

## 4. Implementacja Techniczna: Fiat (Circle API)

Integracja z Circle (Circle API v1) stanowi kręgosłup obsługi płatności fiducjarnych. Architektura ta priorytetowo traktuje zgodność ze standardem PCI-DSS SAQ A, co oznacza, że aplikacja nigdy nie dotyka surowych danych karty (PAN).

### 4.1. Integracja SDK Elements i Izolacja Iframe

Wykorzystujemy bibliotekę @circle/elements-sdk. Kluczowym aspektem jest bezpieczeństwo i spójność wizualna.

- **Wstrzykiwanie Iframe**: Formularz płatności składa się z kontenerów div, w które SDK Circle wstrzykuje elementy iframe. Dzięki temu dane wpisywane przez użytkownika trafiają bezpośrednio na serwery Circle, omijając nasz backend.

- **Stylizacja Cross-Origin**: Standardowe style CSS rodzica nie działają wewnątrz iframe. Circle API pozwala na przekazanie obiektu stylów podczas inicjalizacji. Aby obsłużyć tryb ciemny, kod JS musi wykryć preferencję użytkownika (lub zmianę tematu) i dynamicznie przeładować style wewnątrz iframe, przekazując odpowiednie kody HEX dla tła i czcionek.

```js
const styles = {
  input: {
    color: isDarkMode ? '#F5F5F5' : '#1A1A1A',
    background: 'transparent',
    borderRadius: '8px',
    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
  },
  '.invalid': { borderColor: '#ff4d4d' }
};
```

### 4.2. Przepływ Tokenizacji i 3D Secure

Proces płatności nie jest synchroniczny i wymaga obsługi przerwań.

1. **Tokenizacja**: Po kliknięciu "Zapłać", frontend prosi SDK Circle o tokenizację danych wpisanych w iframe. Zwracany jest bezpieczny paymentMethodToken lub cardId.

2. **Inicjacja Płatności**: Frontend wysyła ten token oraz kwotę do naszego backendu. Backend komunikuje się z API Circle (POST /v1/payments).

3. **Obsługa 3D Secure (3DS)**: W Europie (SCA) większość transakcji wymaga dodatkowej weryfikacji bankowej. API Circle może zwrócić status pending oraz redirectUrl.

   - **UX Handling**: Modal nie może po prostu przekierować całego okna, bo użytkownik straci kontekst. Należy otworzyć redirectUrl w wycentrowanym oknie pop-up lub, lepiej, wewnątrz modalu (zastępując widok formularza ramką weryfikacyjną).

4. **Finalizacja**: Po powrocie z 3DS, system musi odpytać backend o ostateczny status transakcji (Webhooks lub Polling).

## 5. Implementacja Techniczna: Web3 (Ethereum/EVM)

Obsługa płatności kryptowalutowych wymaga zarządzania stanami, które nie występują w świecie Fiat: wybór sieci, szacowanie gazu, aprobaty tokenów.

### 5.1. Strategia Połączenia i Zarządzania Portfelem

Modal wykorzystuje podejście "Multi-Provider". Rekomendowane jest użycie bibliotek takich jak RainbowKit lub Web3Modal, które dostarczają gotowe, estetyczne komponenty UI do łączenia portfeli i są zgodne z naszymi wymaganiami "Clean, Dark Mode".

- **Wykrywanie Sieci**: Aplikacja musi zdefiniować listę SUPPORTED_CHAINS (np. Ethereum Mainnet, Polygon, Base). Jeśli użytkownik jest podłączony do nieobsługiwanej sieci (np. Testnet), modal musi wyświetlić przycisk "Przełącz na Polygon", który wywoła metodę wallet_switchEthereumChain.

- **Obsługa Błędów**: Typowe błędy Web3 (odrzucenie podpisu przez użytkownika, brak środków na gas) muszą być mapowane na przyjazne komunikaty. Zamiast surowego kodu błędu RPC, wyświetlamy: "Transakcja anulowana w portfelu".

### 5.2. Cykl Życia Transakcji i Opłaty Gas

- **Kontrakty Smart**: Płatności nie powinny być zwykłymi transferami ETH (sendTransaction). Powinny przechodzić przez dedykowany kontrakt PaymentRouter, który emituje zdarzenia (Events) indeksowane przez backend. Pozwala to na łatwe powiązanie wpłaty z użytkownikiem i treścią (np. dołączenie wiadomości on-chain).

- **Obsługa Tokenów (ERC-20/USDC)**: Płatność w USDC wymaga dwuetapowego procesu:

  1. **Approve**: Użytkownik zezwala kontraktowi na wydanie X USDC.
  2. **TransferFrom**: Kontrakt pobiera środki.

     - **UX**: Modal musi wyraźnie pokazać, że są to dwie osobne transakcje (i dwie opłaty gas), np. poprzez pasek postępu "Krok 1 z 2: Autoryzacja USDC".

- **Szacowanie Gazu (Gas Estimation)**: Przed kliknięciem "Zatwierdź", modal odpytuje węzeł o estymowany koszt gazu. Ta wartość jest dodawana do tabeli podsumowującej. Jest to kluczowy element transparentności, zapobiegający "szokowi cenowemu" w portfelu.

### 5.3. Proof of Support NFT

Domyślnie zaznaczony checkbox NFT implikuje dodatkową logikę.

- **Dla Web3**: Minting może być częścią transakcji napiwku (multicall) lub osobną transakcją wywoływaną po sukcesie pierwszej.

- **Dla Fiat**: Ponieważ użytkownik płacący kartą może nie mieć portfela, system stosuje strategię "Lazy Minting" lub "Custodial Minting". NFT jest przypisywany do adresu email w bazie danych. Użytkownik otrzymuje link ("Claim your NFT"), który pozwala mu w przyszłości wypłacić token na własny portfel. Należy to jasno zakomunikować w interfejsie (np. tooltip: "Wyślemy instrukcję odbioru na email").

## 6. Implementacja Techniczna: TipJar (Internal Ledger)

System TipJar to wewnętrzna księga rachunkowa (off-chain), oparta na bazie danych SQL. Zapewnia natychmiastowe transakcje bez opłat sieciowych.

### 6.1. Architektura Bazy Danych i Transakcyjność

Kluczowa jest zgodność z ACID (Atomicity, Consistency, Isolation, Durability), aby zapobiec błędom księgowym.

- **Blokowanie Rekordów**: Podczas przetwarzania płatności z salda, backend musi zastosować blokowanie pesymistyczne (SELECT... FOR UPDATE), aby upewnić się, że użytkownik nie wyda tych samych środków dwukrotnie w równoległych żądaniach.

- **Logika**:

  1. Sprawdź saldo: balance >= amount.
  2. Odejmij od nadawcy, dodaj do odbiorcy.
  3. Zapisz rekord w tabeli transactions.

- **Idempotency**: Przycisk "Zapłać" generuje unikalny klucz idempotencji (UUID). Jeśli z powodu błędu sieci żądanie zostanie wysłane dwukrotnie, serwer rozpozna klucz i nie pobierze środków ponownie.

### 6.2. Szybkość i Feedback

Ponieważ transakcja TipJar trwa milisekundy (<200ms), paradoksalnie może wydawać się użytkownikowi "zbyt szybka", by była prawdziwa.

- **Syntetyczne Opóźnienie**: Dobrą praktyką UX jest wprowadzenie sztucznego opóźnienia (np. 500-800ms) z animacją ładowania, aby użytkownik poczuł "wagę" transakcji.

- **Natychmiastowy Sukces**: Po zakończeniu, feedback jest natychmiastowy – konfetti i zielony check.

## 7. Responsywność Mobile i Dostępność (a11y)

Raportowana specyfikacja kładzie duży nacisk na użytkowników mobilnych, którzy stanowią większość ruchu w ekonomii twórców.

### 7.1. Wzorzec "Bottom Sheet" na Mobile

Na urządzeniach o szerokości poniżej 768px, modal nie powinien być wycentrowanym oknem (które jest niewygodne w obsłudze kciukiem i małe), lecz panelem wysuwanym z dołu ekranu (Bottom Sheet).

- **Ergonomia**: Panel zajmuje 100% szerokości i dostosowuje się do bezpiecznych stref ekranu (notch, home indicator). Elementy sterujące (przyciski kwot, przycisk "Zapłać") znajdują się w dolnej części, w zasięgu kciuka.

- **Scroll Locking**: Gdy modal jest otwarty, body strony w tle otrzymuje styl overflow: hidden, aby zapobiec przewijaniu strony pod spodem podczas interakcji z modalem.

### 7.2. Standardy Dostępności WCAG

- **Kontrast**: Mimo użycia efektu szkła, teksty muszą spełniać normę kontrastu AA (4.5:1). W trybie ciemnym oznacza to użycie jasnoszarych czcionek na ciemnym tle, a nie ciemnoszarych na czarnym.

- **Obsługa Klawiatury**: Cały modal musi być obsługiwany klawiszem TAB. Focus musi być widoczny (np. jasna obwódka wokół aktywnego elementu).

- **Screen Readers**:

  - Modal musi mieć atrybut role="dialog" i aria-modal="true".
  - Dynamiczne zmiany cen (przelicznik USDC) muszą być ogłaszane przez czytniki dzięki atrybutowi aria-live="polite".

## 8. Podsumowanie i Przyszłość Rozwoju

Zaprojektowany widget płatności stanowi kompleksowe rozwiązanie dla nowoczesnych platform monetyzacji. Łączy on stabilność i zgodność regulacyjną świata Fiat (Circle) z innowacyjnością i niezależnością świata Web3.

**Kluczowe Wnioski Implementacyjne:**

1. **Priorytet UX**: Złożoność technologiczna (gas fees, tokenizacja) jest ukryta za intuicyjnym interfejsem.

2. **Bezpieczeństwo**: Hybrydowe podejście wymaga rygorystycznego zarządzania sesjami (SIWE dla Web3, Tokenizacja dla Kart).

3. **Przyszłościowość**: Architektura jest gotowa na wdrożenie nadchodzących trendów, takich jak Account Abstraction (ERC-4337), co w przyszłości pozwoli na opłacanie gazu w stablecoinach lub całkowite zniesienie opłat dla użytkownika (Gasless tx), jeszcze bardziej zacierając różnicę między Web2 a Web3.

Niniejszy dokument stanowi gotową specyfikację do rozpoczęcia prac deweloperskich, gwarantując powstanie produktu o najwyższym standardzie rynkowym.

## Tabela Podsumowująca Funkcje

| Funkcja            | Fiat (Circle)              | Web3 (ETH)                  | TipJar                  |
|--------------------|----------------------------|-----------------------------|-------------------------|
| Czas realizacji   | Natychmiastowy (Pending)  | Zależny od bloku (15s+)    | Natychmiastowy (<1s)   |
| Opłaty dla usera  | Procesor (2.9% + 30c)     | Gas Network Fee            | 0%                     |
| Anonimowość       | Niska (Dane bankowe)      | Wysoka (Pseudonimowość)    | Zależna od platformy   |
| Zasięg            | Globalny (z wyjątkami)    | Globalny (bez wyjątków)    | Zamknięty ekosystem    |
## 