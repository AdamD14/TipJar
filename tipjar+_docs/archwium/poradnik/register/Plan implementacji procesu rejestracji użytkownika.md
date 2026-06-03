# Plan implementacji procesu rejestracji użytkownika

# 

Na podstawie dokumentacji TipJar+ poniżej przedstawiono kompletny plan wdrożenia procesu rejestracji użytkownika (role **Fan** lub **Creator**) krok po kroku. Plan obejmuje integrację **backendu (NestJS)** i **frontendu (Next.js App Router)**, wskazanie modyfikowanych plików, kolejność prac, obsługę błędów oraz konfiguracje (OAuth, Circle API). Wszystkie elementy są zgodne ze stosowanym stosu technologicznym i wytycznymi UI (ciemny turkus #003737, złoty #FFD700, font Montserrat). Dla każdej fazy podano pliki do stworzenia/edycji, zakres implementacji, kolejność integracji oraz elementy do przetestowania.

**Ogólny przebieg rejestracji (podsumowanie):** Użytkownik na stronie rejestracji wybiera najpierw swoją rolę (**FAN** lub **CREATOR**). Następnie wybiera metodę rejestracji: **login społecznościowy (OAuth Google lub Twitch)**, **email i hasło** lub **MetaMask (SIWE)**. Po pomyślnej rejestracji backend automatycznie tworzy przypisany użytkownikowi portfel Circle (Developer Wallet) w USDC. Kolejnym krokiem jest wybór **unikalnej nazwy użytkownika (aliasu)** – będzie on służyć jako identyfikator publiczny/URL profilu twórcy lub pseudonim fana. Następnie następuje finalizacja profilu: w przypadku **Fana** – akceptacja regulaminu/zgód i potwierdzenie pełnoletniości (oraz ewentualnie weryfikacja adresu email), w przypadku **Twórcy** – opcjonalna weryfikacja tożsamości (KYC) oraz uzupełnienie profilu (zdjęcie, bio, linki). Po tych krokach użytkownik jest przekierowany do właściwego miejsca w aplikacji (panel twórcy lub dalszy proces wsparcia, jeśli rejestrował się w trakcie przekazywania napiwku). Poniższe etapy opisują implementację tego procesu.

## Krok 1: Strona wyboru roli użytkownika (frontend)

**Pliki do utworzenia/modyfikacji:** Utwórz nową stronę Next.js dla wyboru roli, np. `app/register/page.tsx` (jeżeli korzystamy z App Router) jako główny ekran rejestracji. Można ją ewentualnie osadzić w grupie tras autoryzacyjnych (np. `app/(auth)/register/page.tsx`) dla utrzymania spójności. Dodaj także ewentualny komponent UI `RoleSelection.tsx` (jeśli wydzielamy logikę).

**Implementacja (frontend/UI):** Na stronie wyświetl dwie opcje/CTA dla wyboru roli: **Zarejestruj się jako Fan** oraz **Zarejestruj się jako Creator**. Mogą to być duże przyciski lub kafelki z krótkim opisem. Po kliknięciu następuje przekierowanie użytkownika do odpowiedniego widoku rejestracji dla danej roli (np. `/register/fan` lub `/register/creator`). Implementuj nawigację za pomocą `useRouter.push('/register/fan')` itp. Zadbaj o stylistykę zgodną z design systemem – tło strony w kolorze ciemnoturkusowym (#003737) i wyróżnienie przycisków kolorem złotym (#FFD700). Teksty przycisków i nagłówki w fontach Montserrat (np. nagłówek pogrubiony Montserrat Bold, tekst przycisku Montserrat Regular). Upewnij się, że strona jest responsywna (mobile-first) – to zgodne z wytycznymi UI/UX.

**Logika:** Strona nie zawiera logiki biznesowej poza nawigacją – służy jako prosty **rozdzielacz**. Przechowaj wybór roli, np. poprzez przekazanie go w ścieżce URL (jak wyżej) lub ustawienie w stanie globalnym (np. Zustand) gdybyśmy chcieli użyć jednej ścieżki z dynamiczną treścią. Wybór roli może determinować dalsze kroki (np. inny tekst i pola w formularzach rejestracji). W tym podejściu korzystamy z oddzielnych tras, więc wystarczy przekierować użytkownika do dedykowanego widoku.

**Kolejność integracji:** Ten krok należy zaimplementować **na początku**, przed integracją metod logowania. Dzięki temu mamy punkt wejścia do procesu rejestracji, co ułatwi testowanie kolejnych etapów (np. będzie można ręcznie przechodzić do `/register/creator` lub `/register/fan` po wyborze).

**Testowanie:** Uruchom frontend w trybie deweloperskim (np. `npm run dev`) w środowisku WSL. Zweryfikuj, że strona `/register` renderuje poprawnie dwie opcje. Przetestuj kliknięcia: wybór **Fan** powinien przenosić do widoku rejestracji fana (na razie może być pusty lub placeholder), analogicznie **Creator** do widoku twórcy. Sprawdź responsywność (na urządzeniu mobilnym przyciski powinny być czytelne i łatwe do kliknięcia). Upewnij się, że styl (kolory, fonty) jest zgodny z wytycznymi UI.

## Krok 2: Widoki rejestracji dla Fana i Twórcy – przyciski OAuth i formularz email (frontend)

**Pliki do utworzenia/modyfikacji:** Stwórz dwie strony (lub komponenty) dla formularzy rejestracji właściwej: `app/register/fan/page.tsx` oraz `app/register/creator/page.tsx`. Można większość kodu współdzielić, ewentualnie wyodrębniając wspólny komponent (np. `RegisterForm.tsx`) z parametryzacją różnic (tekst, rola). Jeśli App Router, rozważ grupę tras: np. folder `app/register/fan/` z plikiem `page.tsx` itd. Upewnij się, że globalny layout aplikacji (np. logo w nagłówku) również tu obowiązuje, chyba że przewidziano inny layout dla stron auth (opcjonalnie można mieć oddzielny layout dla grupy `(auth)` – np. bez bocznych paneli).

**Implementacja (UI formularzy):** Na każdej z tych stron wyświetl:

- **Nagłówek** typu “Zarejestruj się jako Fan” lub “...jako Twórca” dla czytelności.
- **Przyciski OAuth**: dwa przyciski – „Kontynuuj przez Google” oraz „Kontynuuj przez Twitch” (z odpowiednimi ikonami). Są to główne zalecane metody logowania. Po kliknięciu powinny inicjować proces OAuth – szczegóły poniżej.
- **Przycisk/metoda MetaMask (Web3)**: opcjonalnie trzeci przycisk „Login przez Web3 (MetaMask)”. Oznacz go np. ikoną Ethereum. Pojawienie się tej opcji może być warunkowe (dokumentacja wskazuje, że SIWE jest dla zaawansowanych i opcjonalne). Na etapie MVP również wyświetlamy ją, ale warto oznaczyć jako „Beta” lub w nawiasie “(dla zaawansowanych)”.
- **Alternatywa Email**: pod przyciskami OAuth umieść separator z tekstem „lub” i poniżej formularz rejestracji email: pola **Email**, **Hasło**, **Powtórz hasło** oraz przycisk „Zarejestruj przez email”. Tę sekcję można początkowo ukrywać i pokazywać np. linkiem „Zarejestruj się tradycyjnie” – w zależności od decyzji UX. (Często użytkownicy wybierają OAuth, ale zapewniamy też klasyczną metodę).
- **Informacja o zgodach**: Na dole formularza email warto umieścić drobnym drukiem informację: „Rejestrując się akceptujesz Regulamin i Politykę Prywatności oraz potwierdzasz pełnoletniość.” – jeśli nie wymagamy checkboxa już tutaj, to przynajmniej informujemy użytkownika. (Wymuszenie akceptacji formalnie zrealizujemy na etapie zgód fana, ale komunikat na starcie jest dobrą praktyką).
- **Stylizacja**: Kontynuuj spójny styl: tło turkusowe, przyciski OAuth mogą mieć styl brandowy (np. biały przycisk z kolorowym logo Google, fioletowy przycisk Twitch – zgodnie z ich wytycznymi, ale z naszym złotym akcentem na hover). Przycisk MetaMask/Ethereum w kolorze złotym/ciemnoszarym. Przyciski i pola na ciemnym tle muszą mieć wyraźny kontrast (białe lub jasne teksty). Użyj Tailwind CSS (zgodnie z założeniami projektu frontendu) – w konfiguracji Tailwind dodaj kolory brandowe jeśli nie dodano (np. `theme.extend.colors.brandTurquoise = '#003737'`, `brandGold = '#FFD700'` itp., lub używaj klas `bg-[#003737]`). Font Montserrat powinien być zdefiniowany globalnie, upewnij się że jest zaimportowany (np. w `globals.css` lub jako czcionka Google w dokumencie).

**Logika (frontend):**

- **Przyciski OAuth**: Po kliknięciu np. „Kontynuuj przez Google” wykonaj przekierowanie do endpointu backendu, np. `GET ${API_URL}/auth/google?role=fan` lub `.../auth/google?role=creator` zależnie od roli. (Najlepiej pobrać adres API z configu, np. z `NEXT_PUBLIC_API_URL`). Użyj zwykłego linku `<a href>` lub `window.location.href` – spowoduje to przejście do zewnętrznego okna autoryzacji Google. Podobnie dla Twitch. **Ważne:** dodaj parametr wskazujący rolę (np. `?role=creator`), aby backend wiedział, jak utworzyć konto. Alternatywnie można użyć parametru stanu OAuth (state) – patrz Krok 3 (backend OAuth) niżej.
- **Przycisk MetaMask (SIWE)**: Tu zamiast przekierowania wykonamy akcję kliencką. Po kliknięciu wywołaj funkcję, która: 1) poprosi przeglądarkę o połączenie z portfelem Ethereum (MetaMask) – np. `await window.ethereum.request({ method: 'eth_requestAccounts' })` żeby uzyskać adres. 2) Wyślij żądanie do backendu: `GET /auth/siwe/nonce` aby pobrać unikatowy nonce (ciąg znaków). 3) Wygeneruj wiadomość do podpisania zgodnie ze standardem EIP-4361 (zawierając nazwę domeny aplikacji, adres użytkownika, czas i pobrany nonce) i użyj MetaMask do podpisu: `ethereum.request({ method: 'personal_sign', params: [message, address] })`. Można skorzystać z biblioteki **siwe** (Sign-In with Ethereum) dla ułatwienia lub zrobić ręcznie. 4) Wyślij podpis i adres w zapytaniu `POST /auth/siwe/verify` do backendu. (Szczegóły implementacji backendu w kroku 4). Gdy backend zwróci sukces (token JWT lub ustawiony cookie sesyjny), front powinien przejść do następnego kroku rejestracji (np. alias). Ten proces odbywa się całkowicie w oknie aplikacji (bez przekierowań), dlatego należy zapewnić **obsługę błędów** na każdym etapie: jeśli użytkownik odrzuci połączenie portfela lub podpis – pokaż komunikat o przerwaniu logowania Web3 i umożliw wybór innej metody.
- **Formularz Email:** Umożliw użytkownikowi wpisanie email i hasła (dwa pola hasła dla weryfikacji). Waliduj po stronie frontu podstawowe kryteria: poprawność adresu email, minimalna długość hasła (np. 8 znaków, zawiera litery i cyfry), zgodność pól hasła. Po kliknięciu przycisku "Zarejestruj" wykonaj zapytanie `POST ${API_URL}/auth/register` z danymi: `email`, `password` (zahashowanie zrobi backend) oraz `role` (fan/creator). Najlepiej wywołać to przez fetch/Axios. Obsłuż stany: **oczekiwanie** (np. zablokuj przycisk i pokaż spinner "Rejestrowanie...") oraz **błąd** (np. jeśli email już istnieje – backend zwróci błąd 409, wtedy pokaż komunikat "Konto z tym email już istnieje"). Po sukcesie rejestracji email **nie logujemy** od razu użytkownika, lecz informujemy go o konieczności weryfikacji adresu.
- **UI po rejestracji email:** Jeśli `POST /auth/register` się powiedzie, backend wyśle email weryfikacyjny. Frontend powinien wtedy pokazać komunikat typu **"Sprawdź swoją skrzynkę pocztową i kliknij link aktywacyjny, aby dokończyć rejestrację."**. Można to zrealizować przez proste warunkowe renderowanie: zamiast formularza wyświetl ten komunikat. Ewentualnie przekieruj użytkownika na dedykowaną stronę `app/register/verify-email-sent` z tym komunikatem. (Wybór wg preferencji – ważne, by user dostał jasną instrukcję dalszych kroków).
- **Stan globalny:** W momencie zakończenia logowania (np. powrotu z OAuth lub otrzymania JWT po SIWE) zapamiętaj informacje o zalogowanym użytkowniku w globalnym store (Zustand). Aplikacja TipJar+ używa Zustand do przechowywania danych użytkownika i portfela. Np. zapisujemy token JWT, ID użytkownika, rolę. Umożliwi to komponentom (np. header) zorientowanie się, że użytkownik jest zalogowany oraz ułatwi dołączanie tokenu do kolejnych zapytań (przez Authorization header). Jeśli korzystamy z mechanizmu HttpOnly cookie zamiast ręcznego zarządzania tokenem, store może przechować tylko minimalne dane (np. rolę, nazwę, bez samego tokenu) – w planie dalej zakładamy użycie JWT w nagłówkach, więc store będzie przechowywał token.

**Kolejność integracji:** Frontendowy widok metod rejestracji można zaimplementować równolegle z konfiguracją backendu OAuth/Email. **Uwaga:** Przyciski OAuth będą funkcjonalne dopiero po skonfigurowaniu endpointów backendu (Krok 3), dlatego przed ich testowaniem skonfiguruj backend **Google/Twitch OAuth**. Natomiast formularz email (POST /auth/register) i SIWE (nonce/verify) także wymagają backendu – zalecamy implementować najpierw **backend** tych funkcjonalności, potem podłączać je na froncie (np. najpierw Krok 3, 4 backend, potem testy z frontem). W praktyce:

1. Stwórz komponenty UI (przyciski, pola) i dodaj obsługę zdarzeń (onClick, onSubmit) bez wywoływania API.
2. Skonfiguruj backend (kolejne kroki) – upewnij się, że np. `/auth/google` przekierowuje poprawnie, `/auth/register` zapisuje użytkownika itd.
3. Następnie podłącz wywołania API w frontowych handlerach i testuj end-to-end.

**Testowanie:**

- **OAuth Google/Twitch (przycisk)**: Po kliknięciu przycisku powinna otworzyć się strona logowania Google/Twitch. Na razie (przed konfiguracją backendu) może to zwrócić błąd 404 – to oczekiwane dopóki nie działa backend. Po implementacji Kroku 3 wróć i przetestuj pełny flow: kliknięcie **Google** -> logowanie Google -> przekierowanie z powrotem -> czy trafiamy do właściwego miejsca (to sprawdzimy po Krok 9). To samo dla Twitch.
- **MetaMask (SIWE)**: Potrzebujesz zainstalowanego MetaMask w przeglądarce deweloperskiej. Kliknięcie **Web3** powinno wywołać okno MetaMask (pojawia się prośba o połączenie konta, a następnie podpis). Przetestuj scenariusz akceptacji oraz anulowania na każdym etapie:
    - Gdy użytkownik odrzuci połączenie z portfelem – czy aplikacja obsłuży to (np. błąd z `ethereum.request` powinien być złapany i np. wyświetlony alert "Nie udało się połączyć z MetaMask. Spróbuj ponownie lub wybierz inną metodę.").
    - Gdy odrzuci podpisanie – podobnie, obsłuż wyjątek.
    - Po pomyślnym podpisaniu – sprawdź w konsoli, czy zapytanie `POST /auth/siwe/verify` się wykonuje i co zwraca (na razie może 404 jeśli backend niezaimplementowany). Po Kroku 4 wrócisz by potwierdzić, że front dostaje token i przekierowuje do kolejnego kroku rejestracji.
- **Formularz Email:**
    - Wpisz niepoprawny email (brak @ itp.) – front powinien zablokować wysłanie i pokazać komunikat walidacyjny.
    - Wpisz za krótkie hasło lub niepasujące hasła – również sprawdź walidacje.
    - Wpisz poprawne dane i wyślij. Ponieważ backend (Krok 3) może jeszcze nie być gotowy, zapytanie zwróci błąd – zobacz czy jest obsłużony. Po wdrożeniu Kroku 3:
        - Spróbuj zarejestrować nowy email: powinien zwrócić status 201/200 (w zależności co przyjmiemy) i zobacz czy pokazuje się komunikat „sprawdź skrzynkę”.
        - Spróbuj zarejestrować email już istniejący (wcześniej dodany w bazie lub drugi raz ten sam): backend powinien zwrócić błąd (np. 409 Conflict), front powinien pokazać np. czerwoną informację „Email jest już zarejestrowany” i pozwolić na poprawę (lub zaproponować przejście do logowania).
    - Sprawdź, czy po sukcesie formularz jest zastąpiony komunikatem i czy ten komunikat jest czytelny (np. wyróżnij email użytkownika w tekście, np. „wysłaliśmy wiadomość na **user@example.com**”).

## Krok 3: Konfiguracja OAuth (Google, Twitch) i rejestracja przez email – backend (NestJS)

**Pliki do utworzenia/modyfikacji:**

- **Moduł uwierzytelniania (`AuthModule`)**: prawdopodobnie już istnieje w projekcie (na podstawie logów w dokumentacji). Należy go rozbudować o konfigurację strategii OAuth Google i Twitch oraz obsługę rejestracji email. Pliki: `auth.module.ts`, `auth.service.ts`, `auth.controller.ts`. Dodaj również pliki dla strategii OAuth: np. `strategies/google.strategy.ts`, `strategies/twitch.strategy.ts` (lub analogiczne nazwy). Jeśli nie ma modułu do obsługi użytkowników, będzie też potrzebny **UserModule/UserService** do tworzenia kont.
- **Env konfiguracja:** Upewnij się, że plik konfiguracyjny (np. `.env` lub mechanizm konfiguracyjny NestJS) zawiera klucze potrzebne do OAuth: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, a także adresy redirect. Dodaj zmienne np. `GOOGLE_REDIRECT_URI` (będzie to URL callbacku na backendzie) oraz analogiczne dla Twitch, oraz `JWT_SECRET`, `JWT_EXPIRATION` (jeśli nie ustawiono wcześniej). Dodaj również konfigurację dla wysyłki email (np. `SENDGRID_API_KEY` lub SMTP config) oraz do integracji Circle (np. `CIRCLE_API_KEY`, `CIRCLE_API_BASE_URL` itp. – jeśli nie ma, omówimy w Krok 5).

**Implementacja (OAuth Google/Twitch):**

- **Passport Strategies:** Skonfiguruj **GoogleStrategy** i **TwitchStrategy** korzystając z `@nestjs/passport`. W NestJS tworzy się klasę `GoogleStrategy` rozszerzającą `PassportStrategy(Strategy, 'google')`. Przekaż do konstruktora obiekt z opcjami: `clientID`, `clientSecret` z env, `callbackURL` (np. `${API_URL}/auth/google/callback`), oraz `scope: ['profile','email']` (Google wymaga scope aby email otrzymać). Ustaw `passReqToCallback: true` **i** `state: true` – to pozwoli nam odebrać parametr `state` (tu wykorzystamy go do przekazania roli). Podobnie dla Twitch – Twitch OAuth2 wymaga scope `'user:read:email'` żeby uzyskać email użytkownika, ustaw callback (np. `/auth/twitch/callback`).
- **Endpoint początkowy (redirect):** W `AuthController` dodaj metody:
    - `@Get('google')` z `@UseGuards(AuthGuard('google'))` – to zainicjuje Passport GoogleStrategy. Dodatkowo, by przekazać stan, możesz w tej metodzie pobrać `res` i zrobić `res.redirect` manualnie z dodaniem parametru. Prostsze: skorzystaj z wbudowanego mechanizmu: Passport przy `AuthGuard('google')` i włączonym `state: true` sam pobierze `?state=` z URL. Czyli wywołanie przez front `/auth/google?state=creator` spowoduje, że w callbacku będziemy mieli dostęp do tej wartości. Podobnie utwórz `@Get('twitch')` analogicznie.
- **Endpoint callback:** Dodaj `@Get('google/callback')` z `@UseGuards(AuthGuard('google'))`. Ta metoda zostanie wywołana po udanym zalogowaniu przez Google. W metodzie kontrolera przyjmij `@Req() req`, `@Res() res`. Passport w tle wywoła naszą funkcję `validate` w strategii, a jej wynik (obiekt użytkownika) umieści w `req.user`. **Implementacja `validate` (GoogleStrategy):** W tej funkcji wykonujemy właściwą logikę rejestracji/logowania użytkownika:
    - Odczytaj profil Google przekazany przez Passport (parametry funkcji validate mogą być `(req, accessToken, refreshToken, profile: GoogleProfile, done)` – w Nest można zwrócić user bez użycia `done`). Wyciągnij z profilu email (np. `profile.emails[0].value`), imię/nazwę (`profile.displayName` lub `profile.name.givenName` itp. zależnie od strategii).
    - Sprawdź w bazie danych (UserService) czy istnieje użytkownik o tym email. Jeśli tak:
        - Jeśli **użytkownik istnieje i ma tę samą rolę**, traktujemy to jako logowanie istniejącego konta – można po prostu zwrócić obiekt użytkownika (Passport/Nest przeniesie go do `req.user`). Później w kontrolerze wygenerujemy JWT i przekierujemy do aplikacji.
        - Jeśli użytkownik istnieje **ale z inną rolą** (np. email jest już zarejestrowany jako Fan, a teraz próbuje jako Creator) – zdecyduj jak obsłużyć. Najbezpieczniej: zwróć błąd (np. throw new UnauthorizedException("Email already registered as different role")) – front wtedy może pokazać komunikat. Ewentualnie można pozwolić zalogować się istniejącym kontem (ignorując wybraną rolę). W MVP przyjmijmy prostsze podejście: nie tworzymy jednemu email dwóch kont z różnymi rolami. Jeśli taka sytuacja jest rzadka, można po prostu obsłużyć komunikatem. (Docelowo można dodać możliwość “upgrade” fana do twórcy, ale to poza bieżącym zakresem).
    - Jeśli użytkownik **nie istnieje** w bazie: utwórz nowy obiekt użytkownika:
        - **Role:** Ustaw rolę zgodnie z kontekstem. Wykorzystaj przekazany parametr `state` – np. jeśli `req.query.state === 'creator'` to rola CREATOR, jeśli 'fan' to FAN. (Jeśli zrobiliśmy oddzielne endpointy bez state, można przekazać np. poprzez różne guardy, ale użycie state jest czystsze).
        - **Nowy wpis w DB:** Wywołaj `UserService.create()` z danymi: email, źródło OAuth (np. provider = 'google'), rola, status email zweryfikowany = true (skoro dostajemy go z Google, możemy uznać go za potwierdzony), ewentualnie imię (Google displayName) jako tymczasowy display name. **Ważne:** Utwórz unikalny tymczasowy username/alias. Ponieważ nie pytamy użytkownika od razu o alias, możemy wygenerować np. na podstawie imienia (np. "jan.kowalski") z jakimś losowym sufiksem lub ID. Albo na tym etapie pozostawić pole alias puste/null i oznaczyć konto jako niekompletne. Dokumentacja sugeruje wygenerowanie unikalnego username od razu, ale i tak w kroku alias poprosimy o zmianę – możemy więc np. wstawić losowy uuid jako placeholder lub użyć fragmentu email przed @. To zostanie zaraz nadpisane przez właściwy wybór użytkownika.
        - **Circle Wallet:** Wywołaj **CircleService** aby utworzyć portfel USDC dla nowego użytkownika (omówione szczegółowo w Kroku 5). Zwrócony walletId i adres zapisz w bazie (pola `circleWalletId`, `circleDepositAddress`). Dzięki temu każdy twórca **i fan** będzie miał przypisany własny portfel w systemie Circle. (Jeśli integracja Circle nie jest jeszcze gotowa na tym etapie, można zwrócić do tego po Kroku 5 – jednak najlepiej zaimplementować od razu, żeby testować całość podczas rejestracji).
        - **Status profilu:** Jeśli to **twórca**, oznacz konto jako wymagające uzupełnienia profilu (np. pole `isProfileComplete = false` w DB). To pozwoli nam przekierować go do kreatora profilu po zalogowaniu. Dla fana niekompletny profil to głównie brak zaakceptowanych zgód – można dodać pole `termsAccepted = false` czy `ageConfirmed = false`.
        - Uwaga: W profilu twórcy możemy na starcie zapisać `displayName` z Google/Twitch jako wstępną nazwę wyświetlaną (użytkownik i tak wybierze unikalny alias później).
    - Zwróć obiekt użytkownika (lub jakieś ID) – Passport przekaże go do kontekstu requestu.
    - **Podobnie skonfiguruj TwitchStrategy** (`validate` dla Twitch powinien analogicznie tworzyć/znajdować usera). Różnica: z Twitch API też możemy pobrać email i display name. Upewnij się, że w Twitch Developer Portal zaznaczono zakres, by email był dostępny.
- **Generowanie JWT i przekierowanie (AuthController)**: Po powrocie z callback (`/auth/google/callback` route w kontrolerze):
    - Upewnij się, że trafi tu użytkownik (Passport guard przekieruje tu tylko przy sukcesie). W ciele metody mamy `req.user` – to obiekt zwrócony przez `validate` (możesz tam zwrócić np. encję użytkownika z DB lub przynajmniej jego ID i rolę).
    - Wykorzystaj **AuthService** do wygenerowania JWT. Prawdopodobnie w projekcie jest już zaimplementowany JWT strategy i serwis do logowania (na co wskazują logi `/auth/refresh-token` etc. ). Jeśli tak: wywołaj np. `const { accessToken, refreshToken } = this.authService.generateTokens(user)`. Jeśli nie ma, zaimplementuj generowanie JWT używając biblioteki **jsonwebtoken** lub `@nestjs/jwt`. Standardowo token JWT powinien zawierać `sub: user.id`, `role: user.role`, ewentualnie `username` itp., podpisany kluczem z configu.
    - Wyślij token do klienta. Są dwa podejścia:
        1. **HttpOnly Cookie**: Bezpieczniejsze – utwórz cookie np. `Authentication` dla access token (i ewentualnie `Refresh` dla refresh token) z flagami `httpOnly, secure, sameSite`. Ustaw domenę cookie na główną domenę aplikacji (np. `.tipjar.plus`), aby był dostępny również w froncie na Vercel. Można to zrobić `res.cookie('Authentication', accessToken, { httpOnly: true, domain: '.tipjar.plus', ... })`.
        2. **W odpowiedzi JSON**: Prościej do testów – przekieruj z tokenem w URL lub przekazuj przez front. Jednak token w URL nie jest zalecany (bezpieczeństwo). Można ewentualnie przekierować na URL frontendu z fragmentem, np. `tipjar.plus/redirect#token=...`, a front odczyta z URL i schowa. **Rekomendacja:** użyj cookies HttpOnly, bo stack (Next.js + Nest) sprzyja temu – wtedy front nie musi manualnie przechowywać tokenu (poza store do własnych potrzeb). W takim wypadku w store możemy trzymać np. nazwę użytkownika i rolę, a rzeczywiste zapytania API będą uwierzytelniane automatycznie przez cookie.
    - **Przekierowanie do frontendu:** Po ustawieniu tokena/cookie wykonaj redirect z backendu do frontendu. Sprawdź adres frontendu (np. `FRONTEND_URL` w env, np. `https://tipjar.plus`). Dla twórcy przekieruj na stronę kreatora profilu, np. `FRONTEND_URL/creator/setup`. Dla fana – na stronę dalszej konfiguracji fana, np. `FRONTEND_URL/fan/welcome` lub ogólnie do aplikacji (później wykryjemy, że musi zaakceptować zgody). Można tu zastosować logikę: `if(user.role === CREATOR) redirect /creator/setup; else redirect /fan/onboarding;`. Jeśli podczas inicjacji OAuth mieliśmy jakiś `redirectUrl` (np. gdy fan rejestrował się w trakcie płatności), można go przekazać przez state i tutaj wykorzystać – wówczas priorytet ma powrót do procesu płatności. W MVP można to zaimplementować tak, że stan zawiera np. zaszyfrowany docelowy URL (lub prosty identyfikator), a po zalogowaniu sprawdzamy i ewentualnie kierujemy tam zamiast domyślnej strony.
    - Podsumowując, po Google/Twitch loginie użytkownik otrzyma JWT (cookie) i zostanie przekierowany do odpowiedniego frontendu: twórca do kreatora profilu, fan do dalszego onboarding (lub od razu do aplikacji, jeśli nie ma wymogów dodatkowych).
- **Rejestracja Email (AuthController):** Zaimplementuj endpoint `@Post('register')` obsługujący dane z formularza email.
    - **Walidacja danych:** Sprawdź poprawność email (np. regexem lub skorzystaj z class-validator dekoratorów jeśli używasz DTO), sprawdź minimalne wymagania hasła.
    - **Unikalność:** Sprawdź czy nie istnieje już użytkownik o danym email (UserService.findByEmail). Jeśli tak, rzuć wyjątek `HttpException('Email taken', 409)`.
    - **Utwórz użytkownika:** Jeśli ok, utwórz nowy rekord: ustaw email, zahaszuj hasło (użyj np. `bcrypt` – wygeneruj salt i hash). Ustaw rolę (pobierz z pola/body requestu lub jeśli endpointy są rozdzielone np. `/register/fan` i `/register/creator` to z kontekstu). Domyślnie oznacz konto jako **niezweryfikowane**: `isEmailVerified = false`. Wygeneruj tymczasowy alias (jak wyżej, albo null). Utwórz powiązany portfel Circle od razu (opcjonalnie można to zrobić dopiero po weryfikacji email, ale integracja jest prosta, więc lepiej spójnie – by każdy nowy user od razu miał wallet). Zapisz `circleWalletId` i `address` w rekordzie.
    - **Token weryfikacyjny:** Wygeneruj unikalny token (np. UUID4 lub losowy ciąg ~32 znaków). Możesz użyć biblioteki `crypto` do generacji random bytes. Ten token posłuży do potwierdzenia adresu email. Zapisz go wraz z czasem ważności (np. +24h) – np. w tabeli `VerificationToken` powiązanej z użytkownikiem, lub dodaj pola do usera (`verificationToken`, `tokenExpires`). Bezpieczniej oddzielnie, by hashe trzymać, ale prostota MVP: można przechować w userze zahaszowany token. Dla prostoty można też zapisać jawny token w DB (skoro konto i tak jest nieaktywne do czasu kliknięcia, ryzyko niewielkie).
    - **Wyślij email aktywacyjny:** Skonfiguruj usługę mail (np. **@nestjs-modules/mailer** lub po prostu użyj nodemailera). Zgodnie z dokumentacją można użyć SendGrid – w env mamy klucz, więc albo bezpośrednie wywołanie API SendGrid, albo nodemailer z sendgrid transportem. Wygeneruj link weryfikacyjny: będzie to URL frontendu lub backendu:
        - Podejście A: Link kieruje na frontend, np. `https://tipjar.plus/verify?token=XYZ`. Wtedy trzeba na froncie zaimplementować stronę obsługującą ten token (np. Next.js route `/verify`), która wyśle request do backendu (`/auth/verify-email?token=XYZ`) i pokaże komunikat.
        - Podejście B (prostsze): Link bezpośrednio wywoła backend: np. `https://api.tipjar.plus/auth/verify-email?token=XYZ`. Backend zweryfikuje token i przekieruje użytkownika do strony frontendu z potwierdzeniem.
        - Przy MVP można zastosować B – mniej implementacji frontu. Wybieramy więc: **/auth/verify-email** w kontrolerze Auth.
    - **Endpoint weryfikacji email:** Dodaj w AuthController: `@Get('verify-email')` (lub `confirm`) przyjmujący `@Query('token')`. Znajdź w DB użytkownika o pasującym tokenie (sprawdź też nieprzeterminowany). Jeśli znaleziono: oznacz `isEmailVerified=true`, wyczyść token (aby nie użyć ponownie). W tym momencie konto jest aktywne. *(Opcja:* można też automatycznie zalogować użytkownika od razu – np. wygenerować JWT i ustawić cookie oraz przekierować do alias setup. Jednak by utrzymać proces spójny z Google (gdzie user od razu jest zalogowany), można tak zrobić. Jeśli jednak nie, to po kliknięciu linku pokażmy tylko info i każmy się zalogować.)*
    - **Akcja po weryfikacji:** Zdecydujmy: albo logujemy automatycznie, albo nie. Dla uproszczenia implementacji: przekierujmy do frontendu na stronę logowania z komunikatem „Email zweryfikowany, możesz się zalogować”. Czyli `res.redirect(FRONTEND_URL + '/login?verified=1')`. Front (jeśli nie ma dedykowanej strony logowania, można użyć tej samej co rejestracja z jakimś stanem) wyświetli stosowny komunikat. Twórca po zalogowaniu i tak trafi do kreatora profilu, fan do zgód.
    - Ważne: **Nie generujemy portfela Circle ponownie** przy weryfikacji – zrobiliśmy to przy rejestracji. Jeśli zdecydowalibyśmy portfel tworzyć dopiero po weryfikacji (by uniknąć „sierot”), to tutaj trzeba by to zrobić. My jednak już utworzyliśmy, więc jest ok.
    - **Nie logujemy od razu** (nasz wybór tu), więc endpoint verify kończy się przekierowaniem z informacją.
    - *Jeśli chcielibyśmy automatycznie zalogować:* można zamiast redirectu od razu wygenerować JWT i cookie i przekierować do alias. To jednak wymaga, aby link w emailu był jednorazowo logujący – to możliwe, ale zwiększa złożoność (trzeba uważać, by nie nadużyć tego linku). Można ewentualnie rozważyć po MVP.

**Zmiany w modelu danych (DB):**

- Upewnij się, że tabela **Users** posiada kolumny: **role** (enum/string: FAN/CREATOR) – jeśli nie, dodaj ją. Każdy nowy użytkownik musi mieć przypisaną rolę. W Prisma zdefiniuj enum Role { FAN, CREATOR } i pole `role Role` przy modelu User.
- Dodaj pola: `username` (unikalny alias, może być null do czasu ustawienia), `circleWalletId`, `circleDepositAddress`, `isEmailVerified` (bool), `verificationToken` (string, optional), `profileComplete` (bool, np. false domyślnie dla twórców), `termsAccepted` (bool), `ageConfirmed` (bool), `kycVerified` (bool, dla twórców – domyślnie false). Część z nich może już istnieć jeśli projekt je przewidział. Jeśli używacie migracji, przygotuj odpowiednią migrację po zmianach schematu (np. `npx prisma migrate dev --name add_auth_fields`).
- Zapewnij unikalność email i unikalność aliasu na poziomie DB (index unique) – aby zapytania /check-username działały, a rejestracja nie tworzyła duplikatów.

**Kolejność integracji:** Najpierw zaimplementuj **strategię i callback Google**, przetestuj, potem Twitch, a na końcu rejestrację email:

1. **OAuth Google**: Skonfiguruj GoogleStrategy, endpointy, wypróbuj logowanie Google end-to-end.
2. **OAuth Twitch**: analogicznie, po Google będzie łatwiej, przetestuj.
3. **Email register**: zaimplementuj tworzenie usera i wysyłkę email. Najpierw przetestuj w środowisku deweloperskim wysyłkę (np. użyj tymczasowo konsoli lub logów, czy token generuje się poprawnie). Skonfiguruj klient SMTP lub SendGrid (np. w Nest Mailer `MailerModule.forRoot` z apiKey jako transport).
4. **Verify email**: zaimplementuj endpoint weryfikacji, przetestuj klikając wygenerowany link (z logów weź token lub wyślij na własny email jeżeli skonfigurowałeś).
5. Kiedy wszystko działa osobno, upewnij się że integruje się z frontem (Krok 2): tzn. front wywołuje /auth/register poprawnie i odbiera odpowiedź, link w email kieruje do /auth/verify-email itd.

**Testowanie (backend OAuth & email):**

- **Google OAuth:** Uruchom aplikację backend (NestJS) lokalnie. Musisz zarejestrować aplikację w Google Cloud Console: utwórz **OAuth Client ID** (aplikacja sieciowa). Ustaw **Authorized redirect URI** na adres backendu, np. `http://localhost:3000/auth/google/callback` (dla lokalnych testów) oraz produkcyjny (np. `https://api.tipjar.plus/auth/google/callback`). Skopiuj client ID i secret do .env. Następnie w przeglądarce wpisz `http://localhost:3000/auth/google?state=creator` – powinno przekierować do Google, zaloguj się testowym kontem Google, zgódź się na zakres (uzyskanie profilu/email). Po przekierowaniu spowrotem sprawdź:
    - W logach NestJS czy wywołała się funkcja validate: czy znalazł/utworzył użytkownika.
    - Jeśli nowy: sprawdź w bazie (np. przez PGAdmin lub Prisma Studio) czy pojawił się nowy user z rolą CREATOR, wypełnione email, circleWalletId, itp.
    - Po validate powinien nastąpić redirect – upewnij się, że `res.redirect` wysłał użytkownika na front pod właściwy adres (/creator/setup). Ponieważ lokalnie front może być pod innym portem/domeną, sprawdź czy przekierowało poprawnie (przeglądarka może wyświetlić błąd jeśli front nie ma takiego route, co jest ok dopóki nie zaimplementujemy kolejnych kroków).
    - Przetestuj również z `state=fan` i zobacz czy rola ustawia się jako FAN i czy redirect jest na /fan/... . Użyj innego email Google lub usuń wcześniej utworzonego usera by symulować nowy.
    - Testuj scenariusz gdy konto już istnieje: zarejestruj raz, potem spróbuj ponownie tym samym Google – powinno wykryć i nie tworzyć duplikatu. Jeśli rola się zgadza, zaloguje (sprawdź czy po validate nie tworzy nowego wpisu). Jeśli rola inna – nasz kod powinien rzucić wyjątek; w przeglądarce wtedy zobaczysz błąd (można go przechwycić w filter i przekierować z komunikatem – do rozważenia).
- **Twitch OAuth:** Podobnie, zarejestruj aplikację w Twitch Developers Console. Ustaw redirect `http://localhost:3000/auth/twitch/callback`. Uzyskaj Client ID i Secret, dodaj do .env. Otwórz `http://localhost:3000/auth/twitch?state=fan` by testować (Twitch pokaże ekran logowania/zgody). Po powrocie sprawdź w logach i DB. (Twitch wymaga sprawdzenia, bo np. użytkownik może nie mieć email publicznie dostępnego – upewnij się, że w scope podałeś `user:read:email`, inaczej profile.email może być null. Dodaj obsługę przypadku, że API Twitch nie zwróci email – można wtedy zablokować rejestrację i poprosić by użył innej metody, bo email jest kluczowy dla naszego systemu).
- **Rejestracja Email:** Wywołaj endpoint manualnie np. przez Postmana: `POST http://localhost:3000/auth/register` z JSON `{"email":"test@example.com","password":"Pass123!", "role":"FAN"}`. Sprawdź odpowiedź:
    - Powinna być 201/200. Zajrzyj do bazy: nowy użytkownik z tym email, hasło zahashowane (sprawdź długość, solenie), rola poprawna, isEmailVerified = false, verificationToken wypełniony.
    - Sprawdź log serwera lub skrzynkę mail (jeśli skonfigurowałeś np. SendGrid z Twoim testowym mailem jako odbiorcą). Powinien być wygenerowany link weryfikacyjny.
    - Skopiuj token z DB lub z maila i otwórz w przeglądarce `http://localhost:3000/auth/verify-email?token=XYZ`. Powinieneś zostać przekierowany (np. na front – jeśli front nie ma /login zaimplementowane, może dać błąd, ale sprawdź logi backend czy user został zweryfikowany, isEmailVerified = true).
    - Testuj błędne scenariusze: złe hasło (za krótki) – powinno zwrócić 400 (walidacja), duplikat email – 409, nieważny token weryfikacyjny (zmień np. jeden znak w tokenie) – backend powinien wykryć brak i np. wyrzucić 400 lub przekierować na stronę z informacją o błędzie ("Link wygasł lub niepoprawny"). Możesz zaimplementować taką logikę: jeśli token niepoprawny, przekieruj do frontu `/register/invalid-token` z komunikatem. To detale UX, decyzja wg potrzeb – ważne by nie pozostawić użytkownika bez informacji.
    - Sprawdź też, czy po weryfikacji email ponowne kliknięcie tego samego linku nie aktywuje znów (powinien być nieważny – sprawdź czy Twój kod albo usunął token, albo ustawił isEmailVerified i już nie akceptuje tego tokenu ponownie).

## Krok 4: Implementacja logowania Web3 (SIWE) – backend (NestJS)

**Pliki do utworzenia/modyfikacji:** W module Auth utwórz kontroler/metody dla ścieżek SIWE: np. `AuthController.siweNonce()` i `AuthController.siweVerify()`. Ewentualnie stwórz dedykowany `SiweService`. Dodaj też w AuthModule konfigurację **SIWE strategy** – chociaż tutaj nie używamy Passport w tradycyjny sposób, możemy zrobić to "ręcznie". Dokumentacja sugeruje wykorzystanie standardu EIP-4361 i obsługi po stronie backendu w dwóch endpointach.

**Implementacja (backend SIWE):**

- **Endpoint GET /auth/siwe/nonce:** Ta metoda generuje i zwraca jednorazowy nonce. Użyj np. `crypto.randomBytes(16).toString('hex')` by utworzyć 32-znakowy hex. Możesz, ale nie musisz, zapamiętać go po stronie serwera – standard SIWE zakłada, że nonce jest częścią podpisywanej wiadomości i powinien zostać zweryfikowany przy /verify. Możesz więc przechować go w pamięci (np. w zmiennej globalnej mapując adres IP -> nonce ostatni, choć to mniej bezpieczne) lub w jakiejś krótkotrwałej pamięci (np. Redis, lub w przyszłości w tabeli Nonce z datą). W MVP wystarczy wygenerować i zwrócić (ale wtedy weryfikując musisz sam zrekonstruować wiadomość i sprawdzić nonce z niej – można to zrobić bez trzymania stanu, zakładając że podpisana wiadomość zawiera ten nonce, co robi biblioteka siwe). Najprościej: skorzystaj z paczki **siwe** (Sign-In with Ethereum). Możesz na backendzie użyć np. `import { SiweMessage } from 'siwe';` – ale niekoniecznie, bo weryfikację możesz też zrobić przez web3/ethers.
    - Zwróć JSON: `{ nonce: "<wygenerowany nonce>" }`. Dla bezpieczeństwa możesz też zapisać go w sesji/cookie jeśli włączyłeś mechanizm Express Session, aby potem mieć punkt odniesienia. Jednak nasz system jest bezstanowy (JWT), więc raczej nie ma sesji – zostawmy więc to weryfikacji „ręcznej”.
- **Endpoint POST /auth/siwe/verify:** Przyjmuje w ciele co najmniej: `message` (wiadomość podpisana przez użytkownika, zawierająca nonce) oraz `signature`. Można też oczekiwać adresu `address` (choć adres można wyciągnąć z podpisu). Implementacja:
    - Skorzystaj z biblioteki **ethers** lub **siwe** do weryfikacji. Np. używając ethers: `ethers.utils.verifyMessage(message, signature)` zwróci adres, który złożył podpis. Porównaj go z adresem wyciągniętym z samej wiadomości (jeśli front go przesłał lub jest częścią message). Jeśli adresy się zgadzają – podpis jest prawidłowy i pochodzi od właściciela portfela.
    - Następnie z parsowania `message` wyciągnij `nonce` i upewnij się, że jest zgodny z ostatnio wygenerowanym dla tego użytkownika/kontekstu. Jeśli nie przechowywaliśmy stanu, można pominąć ten krok lub np. utrzymywać ostatni wygenerowany nonce w pamięci dla danego adresu (co by chroniło przed powtórnym użyciem tego samego podpisu). W MVP można założyć, że raczej nie dojdzie do ataku powtórzenia w krótkim czasie – ale dla bezpieczeństwa dobrze by było mieć jakikolwiek mechanizm (do rozważenia: trzymać parę nonce->zużyty).
    - **Tworzenie/Logowanie użytkownika:** Podobnie jak w OAuth:
        - Sprawdź czy w bazie jest użytkownik o adresie (np. może być pole `ethAddress` unikalne w tabeli Users). Jeśli tak, i role pasują – będziemy logować. Jeśli jest i role różne – analogicznie jak wcześniej, błąd lub ignorowanie roli.
        - Jeśli nie ma – utwórz nowego użytkownika:
            - **Email:** tu nie mamy emaila. Możemy stworzyć konto bez email (platforma TipJar+ dopuszcza login czysto web3). Pola email zostaw null (musimy w DB zezwolić na null przy email lub generować jakiś pseudo-email). Lepsze podejście: pozwól email być null przy logowaniu web3 – tak wynika z założeń (użytkownicy Web3 mogą pozostać pseudonimowi).
            - Rola – weźmy z parametru, który musimy mieć z frontu. W widoku frontendu już wiedzieliśmy, czy to fan czy twórca (było oddzielne okno). Można więc wysłać w `/verify` także pole `role`. Jednak by uniknąć manipulacji, lepiej oprzeć się na stanie aplikacji: np. front wywołuje `/auth/siwe/nonce?role=creator`. Można ten role gdzieś zapamiętać (np. w wygenerowanym nonce zaszyć: do nonce dopisać sufiks "C" lub "F" i przy verify go odczytać). Ewentualnie front po otrzymaniu tokena i tak będzie wiedział, jak przekierować. Ale rola w userze musi być poprawnie ustawiona. **Prościej:** w momencie kliknięcia w UI, przechowajmy role w globalnym store (skoro user jeszcze nie jest w DB, nie mamy gdzie indziej). Potem, po udanym podpisie, przed wysyłką verify dodaj do body `role: selectedRole`. Endpoint verify weźmie ją i użyje. (Alternatywnie można mechanizm state param użyć przy nonce/verify, analogicznie).
            - Kontynuując: utwórz usera z `ethAddress = <address>`, `role` wg powyższego, `isEmailVerified=true` (bo brak email), i analogicznie utwórz portfel Circle (zapisz walletId, address). Alias zostaw pusty lub generuj (np. na podstawie skrótu adresu: "fan-0x1234").
            - Nie musimy tu weryfikować wieku czy zgód – to nastąpi w UI.
        - Jeśli użytkownik istniał – nie tworzymy nowego portfela, korzysta ze swojego.
    - Wygeneruj JWT (payload może zawierać ethAddress jako identyfikator + role).
    - Zwróć odpowiedź. Jeśli używamy cookies: ustaw cookie i zwróć 204/no content lub redirect. Ponieważ w tym wypadku nie mamy naturalnego redirectu (żądanie przyszło z XHR), **nie możemy zrobić HTTP redirect**, bo to XHR – zamiast tego:
        - Albo zwróć 200 + body z tokenem (front go wyłapie i sam przekieruje dalej),
        - Albo ustaw cookie i zwróć np. JSON { success: true }.
        - Wybierzmy metodę z JWT w body (bo i tak frontstore trzyma tokeny). Uzgodnij format z frontem (np. `{accessToken:'...', refreshToken:'...'}`).
- **Obsługa w froncie po verify:** (to było w Kroku 2, tu przypominamy) – front odbiera odpowiedź. Jeśli cookie, nie musi nic z tokenem robić, wystarczy że wie, że success. Jeśli token w body – zapisuje go do Zustand store (auth state). Następnie front powinien wykonać to samo, co w przypadkach OAuth/email po zalogowaniu: przekierować użytkownika do kolejnego kroku (alias/zgody), w zależności od roli.

**Kolejność integracji:** Najpierw stwórz endpointy na backendzie i przetestuj je narzędziami deweloperskimi (np. generując offline podpis), potem podłącz front:

1. **Backend nonce/verify:** zaimplementuj i używaj np. Postmana:
    - GET `/auth/siwe/nonce` -> dostajesz nonce.
    - Weź jakiś własny portfel Ethereum (można użyć npx `ethers-cli` do podpisu offline lub napisać skrypt) i wygeneruj wiadomość typu: `"tipjar.plus wants you to sign in with your Ethereum account:\n0xABCDEF...\n\nNonce: 0x123456789abcdef"` – tu nonce ten z serwera. Potem podpisz tę wiadomość swoim kluczem prywatnym, wyślij POST `/auth/siwe/verify` z body zawierającym message, signature, address, role. Sprawdź czy backend zwraca oczekiwany wynik (token lub cookie). Jeśli coś nie tak – debug weryfikację (częste problemy: inna treść message do podpisu niż zakłada weryfikacja, warto użyć dokładnie tej samej biblioteki generującej message po obu stronach albo przesyłać surowe parametry – np. nonce osobno – i budować message identycznie w backendzie przed verify).
    - Sprawdź czy w DB tworzony jest użytkownik (przy nowym address) z poprawną rolą i ma walletId.
    - Sprawdź ponowne logowanie tym samym (powinno nie duplikować usera).
2. **Front-end integracja:** Po pewnym upewnieniu się, że backend działa, podłącz logikę front (w Kroku 2 opisano). Tutaj ważne: testuj end-to-end:
    - Na stronie rejestracji twórcy kliknij "Web3". MetaMask poprosi o podpis. Po podpisaniu, zobacz w Network devtools: powinno pójść `/auth/siwe/nonce` (200, nonce), potem `/auth/siwe/verify` (200, tokeny).
    - Sprawdź czy po sukcesie front przekierował Cię np. na `/creator/setup` (tak planujemy). Czyli zobacz czy obsługa `.then()` w wywołaniu fetch została wykonana.
    - Testuj anulowanie: odrzuć podpis – powinno pojawić się sensowne info.
    - Testuj logikę roli: spróbuj na stronie fana użyć Web3 – czy utworzy konto z rolą FAN w DB i trafisz na fan onboarding.
    - Uwaga: w trybie dev MetaMask może działać tylko w prawdziwej przeglądarce (nie wbudowanej w VSCode), więc testuj w Chrome/Firefox z extension, odpalając front pod `localhost:3000`.

**Testowanie (SIWE scenariusze):**

- **Nowy użytkownik Web3 (twórca):** Spodziewamy się: po pełnym procesie w DB pojawia się user z ethAddress, role=CREATOR, circleWalletId itp., a w aplikacji nastąpi przekierowanie do kreatora profilu twórcy.
- **Istniejący user Web3:** Zarejestruj kogoś, potem spróbuj ponownie (ta sama strona/rola) – backend powinien znaleźć usera i nie tworzyć nowego. Finalnie aplikacja powinna zalogować bez problemu.
- **Błędny podpis/wiadomość:** Spróbuj zmienić nonce w podpisie (można to zasymulować tylko manualnie) – backend powinien wtedy odrzucić (jeśli zaimplementowano sprawdzanie nonce). Ewentualnie zostaw to na przyszłość, ale pamiętaj by w produkcji dopracować mechanizm anty-replay (np. kasować użyty nonce).
- **Różne role z tym samym portfelem:** Mało prawdopodobne by jeden portfel chciał mieć dwa konta – ale jeśli ktoś by spróbował (np. miał konto fan i chce twórcę tym samym adresem), nasz backend by wykrył istniejący ethAddress i dał błąd roli. Upewnij się, że w takiej sytuacji zwracasz sensowny komunikat (np. 409 z infem).
- **Brak MetaMask:** Otwórz stronę z SIWE w przeglądarce bez MetaMask – kliknięcie przycisku powinno zostać obsłużone (np. wykryj `if (!window.ethereum) alert('Zainstaluj MetaMask')`). Dodaj taką obsługę, by user wiedział czemu nic się nie dzieje.

## Krok 5: Tworzenie portfela Circle dla użytkownika (backend integracja z Circle API)

**Pliki do utworzenia/modyfikacji:**

- **CircleModule/CircleService:** Zgodnie z dokumentacją, w projekcie jest już moduł integracji z Circle (być może plik `circle.service.ts` z podstawową konfiguracją SDK). Jeśli nie, utwórz `CircleModule` i zainstaluj SDK Circle: `@circle-fin/circle-sdk` lub konkretnie `@circle-fin/developer-controlled-wallets`. Dokumentacja wspomina użycie *Circle Developer Controlled Wallets Client*, co sugeruje użycie oficjalnego SDK i posiadanie **Circle API Key** (lub klucza „Master Wallet”) oraz **Circle Entity ID/Secret** (do generowania sub-portfeli).
- **Env konfiguracja:** Dodaj w `.env` klucze: `CIRCLE_API_KEY` (dla autoryzacji HTTP), `CIRCLE_ENTITY_ID` i `CIRCLE_ENTITY_SECRET` (jeśli wymagane przez SDK do generowania podpisów do DCW), oraz parametry jak `CIRCLE_BASE_URL` (jeśli zmieniony endpoint – domyślny to api.circle.com). Informacje te powinny być dostępne w konsoli Circle gdy utworzono konto biznesowe TipJar+.
- **Model danych:** Upewnij się, że w tabeli User przechowujemy co najmniej: **circleWalletId** (unikalny identyfikator portfela w systemie Circle) oraz **circleDepositAddress** (adres USDC przypisany temu portfelowi). Według dokumentacji, dla każdego nowego użytkownika tworzymy dedykowany portfel DCW i możemy pobrać jego adres blockchain. Adres ten posłuży np. do zasilenia konta przez użytkownika (w przypadku fana) lub identyfikacji portfela twórcy.
- **Funkcja tworząca portfel:** W `CircleService` zaimplementuj metodę, np. `createWalletForUser(userId)`:
    - Wywołaj API Circle: jeśli używamy SDK, to coś w stylu `circle.wallets.createWallet({ idempotencyKey, description })`. IdempotencyKey – wygeneruj UUID dla bezpiecznego wywołania. Description możesz ustawić np. `User <id> - <role>` dla czytelności w panelu Circle.
    - Odbierz odpowiedź: powinna zawierać `walletId` (unikatowy UUID portfela) oraz inne dane. Następnie wywołaj API pobrania adresu dla tego portfela: `circle.wallets.generateAddress(walletId, blockchain, currency)` – np. blockchain = ETH (lub konkretny chain jak polygon), currency = USD. Tu trzeba zdecydować, na jakim blockchainie operujemy (np. Ethereum, Polygon – zgodnie z decyzją projektu). Załóżmy Ethereum (USDC on Ethereum) na MVP. Odbierz wygenerowany adres (będzie to ciąg hex).
    - Zapisz do bazy: w encji usera pole `circleWalletId = ...` i `circleDepositAddress = ...`. Możesz to zrobić w ramach `UserService.create()` transakcyjnie z utworzeniem usera (tzn. najpierw utwórz usera, potem wywołaj Circle i update usera z id). **Uwaga:** Circle API jest zewnętrzne – może być chwilowo niedostępne lub opóźnione. Rozważ użycie mechanizmu asynchronicznego: np. utwórz usera z polem wallet placeholder (null), wyślij asynchronicznie żądanie do Circle w tle (np. za pomocą NestJS Queue lub Event), a użytkownikowi od razu pozwól iść dalej. Jednak to komplikuje proces (bo user od razu po rejestracji nie miałby walletId do momentu odpowiedzi). Alternatywnie, wykonaj wywołanie Circle **synchronnie** podczas rejestracji – spowoduje to niewielkie opóźnienie (kilkaset ms) ale zapewni, że jak tylko user przejdzie dalej, portfel jest gotowy. Wybierzmy to drugie dla MVP.
    - Obsłuż ewentualne błędy: jeśli Circle API zwróci błąd (np. limit rate, błąd autoryzacji) – loguj to. Możesz w razie błędu wykonać ponownie próbę (raz lub dwa). Jeśli nie uda się utworzyć portfela, decyduj: albo przerwij rejestrację (throw error 500 – co zablokuje użytkownika), albo zapisz usera bez portfela i oznacz do utworzenia później. Wydaje się, że brak portfela uniemożliwi korzystanie z platformy, więc lepiej spróbować do skutku lub komunikat „Chwilowy problem, spróbuj ponownie”. W planie: gdyby utworzenie portfela się nie powiodło, **przerwij rejestrację** i zwróć błąd – użytkownik będzie mógł spróbować ponownie (albo zarejestrować się jeszcze raz – wtedy unik, bo email już zajęty – trzeba by w takim wypadku umożliwić dokończenie procesu inną drogą, ale to skrajny przypadek). Można też spróbować utworzyć portfel przy pierwszej próbie użycia (np. gdy user zechce wypłacić lub dostać napiwek), ale trzymajmy się specyfikacji – tworzymy od razu przy rejestracji.
- **Wykorzystanie funkcji:** Wywołaj `CircleService.createWalletForUser()` we wszystkich miejscach tworzenia nowego usera:
    - W callbacku Google/Twitch (Krok 3, w validate) – dodać po utworzeniu rekordu usera.
    - W rejestracji email (Krok 3, w create user) – po zapisaniu usera w DB.
    - W SIWE verify (Krok 4, przy tworzeniu usera).
    - Upewnij się, że przy *logowaniu* istniejącego usera nie tworzymy duplikatów. Więc logika: `if (!user.circleWalletId) then createWallet`.
- **Inicjalizacja na starcie:** Upewnij się, że przy starcie aplikacji backend inicjuje klient Circle. W logach wspomniano *"Circle Developer Controlled Wallets Client initialized successfully"* – zapewne już jest kod inicjalizujący (np. w konstruktorze CircleService). Sprawdź, czy klucze API są poprawnie wczytywane (np. przez ConfigService).
- **Bezpieczeństwo:** Pamiętaj, by klucze Circle trzymać bezpiecznie (w AWS Secrets Manager na prod, w .env lokalnie). Nie loguj pełnych odpowiedzi z Circle (mogą zawierać secret). W razie potrzeby loguj tylko `walletId` lub komunikaty błędów.

**Kolejność integracji:** Ten krok można implementować równolegle z logiką auth, ale zaleca się: najpierw skonfiguruj i przetestuj połączenie z Circle **osobno**, a potem zawołaj je z procesów rejestracji:

1. **Test integracji Circle samodzielnie:** Napisz tymczasowo w CircleService metodę `healthCheck()` która np. wywoła `circle.ping()` lub pobierze listę portfeli. Uruchom backend i sprawdź, czy po starcie nie ma błędów (jeśli klucz zły, dostaniesz wyjątek). Spróbuj utworzyć portfel ręcznie: stwórz kontroler testowy lub użyj istniejącego (np. tymczasowo wywołaj `createWalletForUser` z jakimś fikcyjnym ID w kontrolerze) i sprawdź, czy dostajesz odpowiedź z Circle. Możesz też użyć curl: `POST /auth/test-create-wallet` (tymczasowy endpoint do debug) i sprawdź logi. Gdy upewnisz się, że komunikacja z API Circle działa i zwraca dane, usuń testowe haki.
2. **Włączenie do rejestracji:** Dodaj wywołania w miejscach tworzenia usera. Upewnij się, że robisz to w transakcji lub odpowiedniej kolejności: np.
    - W Passport validate (Google/Twitch) możliwe, że nie masz jeszcze ID usera zanim zapiszesz. Najlepiej: najpierw `const user = await this.userService.create({...})` (to zapisze w DB i nada ID), potem `await this.circleService.createWalletForUser(user.id)`, następnie `await this.userService.update(user.id, { circleWalletId,...})`. Można to też przenieść do samego userService.create: np. userService może w środku po stworzeniu encji wywoływać circleService i robić update – wybór architektury. Jeśli używasz Prisma, możesz zrobić to w jednym `prisma.user.create()` a po nim `prisma.user.update()` – nie da się w czystym create bo nie mamy id od Circle. Ewentualnie rozważ użycie `prisma.transaction()` by spiąć create user i update user w jedną transakcję (chociaż tu i tak zewnętrzne API w środku transakcji to kiepski pomysł).
    - W przypadku rejestracji email – tu raczej łatwo: po `user = repo.save()` wywołaj circle i update.
    - W SIWE – analogicznie.
3. **Testy end-to-end (z perspektywy rejestracji):**
    - Zarejestruj twórcę przez Google jak w teście Kroku 3, ale teraz obserwuj czy w DB oprócz usera pojawiają się wartości circleWalletId i address. Możesz też sprawdzić na panelu Circle (jeśli dostępny), czy utworzył się nowy wallet.
    - To samo dla rejestracji fana (email lub OAuth) – sprawdź czy walletId jest zapisany.
    - Spróbuj wykonać przelew testowy do wygenerowanego adresu (jeśli masz testnet i Circle w trybie sandbox, można spróbować zasilić USDC i zobaczyć czy Circle pokaże to – to jednak wykracza poza rejestrację, ale potwierdzi, że adres działa).
    - Jeśli API Circle zwróci błąd, przetestuj naszą obsługę: np. zmień tymczasowo API Key na błędny i spróbuj rejestracji – backend powinien zwrócić błąd (500). Przywróć poprawny klucz później.
    - Upewnij się, że czasy odpowiedzi rejestracji są akceptowalne – może to trwać ok. 0.5-1 sekundy na call do Circle. Ogólnie dopuszczalne. W razie dużych opóźnień można asynchronicznie to robić, ale wtedy musimy ostrzec usera na UI („Twoje konto zostało utworzone, portfel jest w trakcie inicjalizacji” itp.).

**Testowanie (scenariusze portfela):**

- **Podwójne tworzenie:** Spróbuj scenario, gdzie user rejestruje się dwukrotnie bardzo szybko (np. kliknie dwa razy przycisk rejestracji) – idempotencyKey powinien zapobiec utworzeniu dwóch portfeli. W bazie nie powinniśmy mieć duplikatów dla jednego usera.
- **Brak portfela:** Edytuj w DB usera i skasuj mu circleWalletId, spróbuj się zalogować – aktualnie nie mamy mechanizmu uzupełniania brakującego portfela przy logowaniu, ale można ewentualnie dodać: np. w JWT guardzie, gdy znajdzie usera bez walletId, może wywołać circleService. To raczej nie będzie potrzebne jeśli proces rejestracji zawsze tworzy.
- **Zgodność z rolą:** W doc. jest mowa, że portfel twórcy jest wymagany, a fana opcjonalny (ale tworzymy, by mógł korzystać). Dobrze przetestować, czy fan może funkcjonować bez używania tego portfela (np. w przyszłości fan może płacić bezpośrednio on-chain, ale portfel i tak jest, tylko może go nie używać). To w porządku.

## Krok 6: Wybór unikalnej nazwy użytkownika (alias) po rejestracji

Po uwierzytelnieniu (OAuth/Email/SIWE) i utworzeniu konta + portfela, nowy użytkownik powinien wybrać swój publiczny **username/alias**. Dla twórców alias jest kluczowy (tworzy adres URL profilu: `tipjar.plus/@alias`), dla fanów – mniej eksponowany, ale i tak wymagany np. do wyświetlania ich nazwy w rankingach czy komentarzach. Zakładamy, że **każdy alias jest unikalny w skali platformy** (nie może być dwóch użytkowników – fanów czy twórców – o tym samym aliasie).

**Pliki do utworzenia/modyfikacji (frontend):**

- Stwórz stronę lub komponent dla kroku wyboru aliasu. Możliwości:
    - Osobna strona dla twórcy i fana, np. `app/creator/setup/page.tsx` dla kreatora twórcy (jeśli to pierwszy krok kreatora) oraz `app/fan/onboarding/page.tsx` dla fana.
    - Lub wspólna strona `app/onboarding/username/page.tsx` używana przez oba role.
    - Ewentualnie w przypadku twórcy można tę część zrealizować jako pierwszy ekran kreatora profilu. W dokumentacji przewidziano „kreator” dla twórcy – alias to krok 1. Dla fana może to być jednorazowy ekran po zalogowaniu.
    - Dla przejrzystości, zaimplementujmy **oddzielny komponent**, ale wykorzystajmy maksymalnie wspólny kod. Np. utwórz komponent `UsernameForm.tsx` z logiką wyboru nazwy, a użyj go zarówno na stronie twórcy jak i fana.
- Utwórz również w backendzie odpowiednie endpointy API: `GET /users/check-username` oraz `POST /users/set-username`. Być może powstanie/istnieje **UserController** w NestJS w ramach UserModule – tam dodamy te metody.

**Implementacja (frontend UI):**

- Strona **Wybierz nazwę użytkownika** powinna zawierać pole tekstowe do wpisania aliasu i komunikat o wymaganiach:
    - Np. „Twój unikalny @username: użyj 3-30 znaków (litery, cyfry, '_' ), bez spacji, wielkość nie ma znaczenia.”.
    - Podpole wyświetlaj dynamicznie informację, czy nazwa jest dostępna.
    - Przycisk „Zatwierdź” (np. „Dalej”).
    - Dla twórcy możesz dodać opis: „Ta nazwa pojawi się w linku do Twojego profilu: tipjar.plus/@twoj_nick” – aby podkreślić wagę.
    - Dla fana: „Ta nazwa będzie wyświetlana przy Twoich aktywnościach na platformie.”.
    - Styl: formularz na ciemnym tle, pole tekstowe jasne; wykorzystaj styl formularzy spójny z rejestracją (Tailwind form-control, etc).
- **Sprawdzanie dostępności (frontend):**
    - Możesz zaimplementować **live validation**: po wpisaniu aliasu (np. onChange lub onBlur) wywołuj API `GET /users/check-username?username=XYZ`. Dodaj debouncing (np. 300ms po zaprzestaniu pisania) aby nie spamować serwera przy każdym znaku.
    - Odpowiedź z backendu: { available: true/false }. Na tej podstawie wyświetl komunikat: zielony „Nazwa dostępna” lub czerwony „Nazwa zajęta” / „Nazwa nie spełnia wymagań” (jeśli backend zwróci błąd walidacji np. niedozwolone znaki).
    - Możesz także walidować lokalnie format zanim spytasz serwer (regex np. `^[A-Za-z0-9_]{3,30}$`), żeby od razu pokazać „Niedozwolone znaki” czy „Za krótka nazwa”.
- **Wysyłanie wyboru:** Po kliknięciu „Zatwierdź” wywołaj `POST /users/set-username` z wybranym aliasem (w body JSON { username: "wybranyAlias" }). Dołącz JWT w nagłówku Authorization (o ile nie polegamy na cookie). Backend ustawi alias użytkownika.
- **Nawigacja po ustawieniu:**
    - Jeśli rola to **CREATOR**: przejdź do kolejnego kroku kreatora profilu (opcjonalne KYC/profil – Krok 8). W naszym planie to będzie np. strona `app/creator/setup/profile` lub podobna. Możesz użyć `router.push('/creator/setup/profile')`.
    - Jeśli rola to **FAN**: przejdź do kroku zgód i wieku (Krok 7). Np. `router.push('/fan/onboarding/consents')`.
    - (Jeżeli zaplanowaliśmy jedną stronę wspólną do aliasów, rola jest w stanie aplikacji – możemy tam zrobić warunek i pushować w zależności od role).
- **Ochrona dostępu:** Upewnij się, że strony wyboru aliasu nie są dostępne dla zalogowanych z uzupełnionym aliasem (można np. w `useEffect` sprawdzić w globalnym store, czy `user.username` jest null/placeholder – jeśli nie, przekieruj np. do głównej). Podobnie kreator twórcy nie powinien być skipowalny przez wpisanie URL bez zalogowania – to wymaga globalnej ochrony tras (np. komponent Guard sprawdzający `if(!isLoggedIn) redirect /login`).
- **Pre-wypełnienie:** Jeśli w przypadku OAuth mamy tymczasowy username nadany (np. wygenerowany w DB), możemy go pominąć? Lepiej nie – i tak wymagamy unikalnego aliasu od usera. Można natomiast wyświetlić sugestię: np. jeśli w DB user ma displayName „JanK” i alias null, można autopropose „JanK” w polu (ale sprawdzić dostępność). To niekonieczne; pusta kontrolka zmusza do kreatywności – to zależy od UX decyzji.

**Implementacja (backend API - UserController):**

- **Endpoint GET /users/check-username:**
    - Zaimplementuj w UserService metodę np. `isUsernameAvailable(name: string)`. Niech sprawdza w DB (Prisma): `const count = await prisma.user.count({ where: { username: { equals: name, mode: 'insensitive' } } }); return count === 0;`. Użyj `mode: 'insensitive'`, bo alias traktujemy case-insensitive (np. „John” i „john” to samo).
    - Dodatkowo sprawdź walidację formatu: jeśli regex nie pasuje (np. zły znak lub za długie/za krótkie) to od razu zwróć błąd 400 z info np. „Invalid format”.
    - Jeśli nazwa jest zarezerwowana (możesz mieć listę zastrzeżonych słów typu „admin”, „tipjar”, itd.), również zwróć 400/false.
    - Zwróć JSON `{ available: true }` lub `{ available: false }`. Możesz też zwracać kod 204 dla true i 409 dla false – ale JSON jest prostszy dla frontu.
    - Ustaw brak wymogu autoryzacji (tę akcję można udostępnić publicznie, bo nie zdradza wrażliwych danych – ewentualnie zdradza istnienie użytkownika o danym nicku, ale to raczej nie problem, to jak sprawdzanie dostępności nazwy).
- **Endpoint POST /users/set-username:**
    - Ten endpoint wymaga zalogowania (JWT). Zabezpiecz go guardem JWT (`@UseGuards(AuthGuard('jwt'))`). Będzie działał po otrzymaniu tokena (czy to w headerze, czy cookie).
    - Wyciągnij z requestu `req.user.id` (to powinno być w tokenie sub) – w Nest można poprzez `@Req()`.
    - Z body pobierz `username`. Przeprowadź te same walidacje formatowe co wyżej (najlepiej wywołaj isUsernameAvailable, które już to sprawdza).
    - Sprawdź dostępność: jeśli `isUsernameAvailable(name)` da false – zwróć błąd 409 „Nazwa zajęta” (front i tak pewnie to sprawdził wcześniej, ale mogła się sytuacja zmienić, stąd double-check).
    - Jeśli ok – zaktualizuj użytkownika w DB: `prisma.user.update({ where: { id: req.user.id }, data: { username: name } })`.
    - Możesz też ustawić dodatkowo `profileComplete = true` dla twórcy, jeśli alias to warunek ukończenia profilu minimalnego. Jednak ponieważ w Krok 8 będą dalsze kroki, to profileComplete damy na końcu kreatora twórcy. Na razie można ustawić `aliasSet = true` lub tak, ale niekoniecznie potrzeba oddzielnego pola.
    - Zwróć 200 z np. `{ username: name }` lub 204 No Content. Front tego nie bardzo potrzebuje – może jedynie do uaktualnienia global store (ale store i tak możemy uaktualnić lokalnie).
- **Aktualizacja global state (frontend):** Po pomyślnym ustawieniu aliasu, warto w Zustand store zmienić `user.username = chosenName` (ponieważ do tej pory user miał null lub temp). Ewentualnie front może zrobić refresh profilu z API, ale niekoniecznie, możemy ufać że się udało i sami zmodyfikować stan.

**Kolejność integracji:**

1. Najpierw backend: dodaj endpointy check/set i przetestuj je manualnie (przed podłączeniem UI).
2. Następnie frontend: zaimplementuj stronę aliasu i logikę wywoływania endpointów. Testuj z backendem.

**Testowanie:**

- **Backend check/set manualnie:** Wywołaj `GET /users/check-username?username=testuser` przez Postmana, powinno zwrócić true/false. Spróbuj nazw:
    - istniejącego usera (np. jeśli zarejestrowałeś kogoś, nadaj mu w DB username test i sprawdź),
    - nowej unikalnej (powinno dać true),
    - krótkiej np. "ab" (powinno dać błąd 400 "za krótka"),
    - z dużymi literami (może nasze sprawdzanie je przetworzy – w DB z mode:insensitive i tak nie odróżnia, ale możesz też normalizować name do lowerCase przed zapisem).
    - z niedozwolonym znakiem np. "john-doe" (my nie pozwalamy na myślnik – powinno dać błąd formatu).
- **Flow end-to-end (fan):**
    - Zarejestruj nowego fana (np. zaloguj przez Google z konta, którego nie używałeś jeszcze). Po powrocie z OAuth, backend przekieruje Cię do frontu na `/fan/onboarding` (w naszym planie). Załóżmy, że to trafia na stronę aliasu fana.
    - Strona aliasu powinna wykryć, że użytkownik nie ma aliasu (jeśli nie, to znaczy user już miał, co w tym scenariuszu nie nastąpi bo nowy).
    - Wpisz alias, sprawdź czy pojawia się komunikat dostępności (np. wpisz coś co na pewno jest wolne – zielony komunikat; wpisz coś co na pewno zajęte, np. alias tego twórcy z testów – czerwony komunikat).
    - Kliknij Zatwierdź. Zobacz w devtools Network: powinno pójść `POST /users/set-username` z kodem 200.
    - Sprawdź w bazie czy alias się zapisał.
    - Front powinien Cię przekierować do strony zgód (Krok 7). Jeżeli od razu zostałeś przekierowany, upewnij się, że chwilę widziałeś komunikat sukcesu lub tak szybko poszło, że prawie niezauważalne – to ok.
    - Spróbuj powtórzyć rejestrację innego fana i nadać taki sam alias jak poprzednik – backend powinien odmówić. W UI zobaczysz to już w check-username (dostaniesz „zajęty”), ale zrób test co jak ktoś jakimś cudem pominął check i od razu kliknął (np. wyłącz JS i spróbuj POST wysłać z duplikatem) – dostaniesz od API 409. Front powinien to obsłużyć (np. pokaże toast „Alias zajęty, wybierz inny” i nie przekieruje).
- **Flow end-to-end (creator):**
    - Zarejestruj twórcę (np. innym kontem Google). Backend przekieruje na `/creator/setup` (przyjmijmy, że to nasza strona aliasu twórcy, jeśli zrobiliśmy oddzielnie).
    - Wykonaj analogiczne testy jak dla fana (dostępność, długość itp.).
    - Po ustawieniu aliasu, powinien nastąpić redirect do dalszej części kreatora (Krok 8). U nas to pewnie `/creator/setup/profile`. Jeśli jeszcze nie istnieje ta strona, możesz tymczasowo przekierować na główny dashboard twórcy, by nie zostawiać usera w próżni – ale ponieważ od razu wdrożymy Krok 8, docelowo pójdzie tam.
    - Sprawdź w DB, czy alias twórcy się ustawił i czy np. link do profilu (jeśli generujesz) działa. Generowanie URL możesz zrobić w momencie set-username – np. jak alias ustawiony, to front albo backend może tworzyć public URL. To w sumie tylko kwestia wyświetlania – w profile twórcy pewnie użyjemy aliasu.
- **Inne testy:**
    - Zaloguj się jako istniejący użytkownik, który **ma już alias** – spróbuj wejść na URL `/creator/setup` – powinien zostać np. przekierowany do dashboard (bo nie ma potrzeby zmieniać aliasu). Zaimplementuj to przekierowanie w getServerSideProps lub useEffect: jeżeli `user.username` nie jest pusty, to history.replace('/...dashboard').
    - Sprawdź case: twórca istniejący bez aliasu (teoretycznie nie powinno być takiego, bo od razu wymagamy). Ale np. jeśli jakimś błędem w DB alias null – nasza strona alias powinna to wychwycić i umożliwić nadanie (czyli mechanizm działa).
    - Długość maksymalna: wpisz 31 znaków – powinno zablokować (w input możesz dać `maxLength=30`).

## Krok 7: Ekran zgód regulaminowych i potwierdzenia wieku dla Fana

Po ustawieniu aliasu (lub od razu po rejestracji, jeśli alias był już dany), **Fan** musi potwierdzić wymagane zgody:

- akceptację Regulaminu i Polityki Prywatności,
- potwierdzenie pełnoletniości (np. 18+),
- ewentualnie potwierdzenie adresu email (jeśli rejestrował się przez email i jeszcze nie kliknął w link – choć w naszym procesie zakładamy, że nie dopuścimy do logowania bez weryfikacji email, więc to już za nami).

**Pliki do utworzenia/modyfikacji (frontend):**

- Strona zgód, np. `app/fan/onboarding/consents/page.tsx`. (Jeśli fan onboarding jest wiele kroków, możesz też to dać jako część np. `onboarding/page.tsx` gdzie najpierw alias, potem zgody – ale my rozdzieliliśmy alias oddzielnie w Krok 6. Można więc zrobić, że alias page po submit pushuje do `/fan/consents`).
- Komponent `ConsentsForm.tsx` z polami checkbox i przyciskiem.

**Implementacja (frontend UI):**

- Wyświetl komunikat powitalny, np. „Witaj na TipJar+! Ostatni krok: zaakceptuj warunki korzystania z platformy.”
- Wypunktuj zgody:
    1. Checkbox: „Zapoznałem się i akceptuję **Regulamin** oraz **Politykę Prywatności** platformy TipJar+.” (podlinkuj „Regulamin” i „Politykę” do odpowiednich stron – upewnij się, że masz takie statyczne strony lub PDF; jeśli nie gotowe, użyj placeholder `href="#"`).
    2. Checkbox: „Oświadczam, że mam ukończone 18 lat.” (jeśli to wymaganie prawne; jeśli wystarczy 13 lat lub inny, dostosuj treść).
- Oba checkboxy obowiązkowe. Możesz dodać walidację: przy próbie kontynuacji bez zaznaczenia pokaż błąd „Musisz zaakceptować...”/„Musisz potwierdzić...”.
- Przycisk „Zakończ” albo „Przejdź dalej”.
- Styl: formularz centrycznie na stronie, na ciemnym tle, teksty zgód raczej małe ale czytelne (biała czcionka, linki wyróżnione np. podkreśleniem). Checkbox stylizowany (możesz użyć wbudowanych stylów Tailwind form-checkbox i dostosować kolory: np. zaznaczenie na złoto #FFD700).
- **Dobra praktyka UX:** Upewnij się, że linki otwierają się w nowej karcie (`target="_blank"`) by user nie utracił progresu.

**Logika (frontend):**

- Po zaznaczeniu obu, klik „Zakończ” wysyła żądanie do backendu: `POST /users/consents` (musimy taki endpoint stworzyć). Payload: `{ termsAccepted: true, ageConfirmed: true }` (można też sam fakt wywołania traktować jako true, ale dla czytelności wyślij bo i tak pewnie w fetch body JSON).
- Dołącz JWT (Authorization header lub rely on cookie).
- Backend ustawi odpowiednie pola w DB (opis poniżej).
- Po sukcesie (np. 200 OK), frontend przekieruje użytkownika do **docelowego miejsca dla fana**. Ponieważ panel fana jest opcjonalny, możemy go skierować na stronę główną aplikacji albo stronę „Odkrywaj twórców”, by od razu mógł zacząć wspierać. Ewentualnie, jeśli istniał kontekst (np. rejestrował się podczas procesu napiwku), wtedy zamiast tego wrócimy do tego kontekstu. Tę logikę omówimy w Krok 9 (routing).
- W globalnym store możemy też zapisać, że user przyjął terms (ale to też jest w user obiekcie jak pobierzemy świeży profil). Można pominąć, bo te pola raczej nie są używane często po.
- Po tym kroku onboarding fana jest zakończony.

**Implementacja (backend - UserController):**

- Dodaj endpoint `POST /users/consents` (autoryzowany JWT).
- Z body odczytaj `termsAccepted` (bool), `ageConfirmed` (bool). Waliduj, że są true (jeśli jakimś cudem przyszłoby false, zignoruj bo sens tylko jak true).
- Wykonaj `userService.update(userId, { termsAcceptedAt: now, ageConfirmed: true })`. Możesz przechowywać zgodę na regulamin poprzez timestamp (to lepszy dowód akceptacji). Więc w schemacie możesz mieć `termsAcceptedAt DateTime?` – ustaw na new Date().
- Pola w DB: `termsAcceptedAt` lub `termsAccepted` boolean – dowolnie. Wymaganie prawne to raczej mieć znacznik czasu. Potwierdzenie wieku: boolean `ageConfirmed`.
- Nie zaszkodzi też mieć `kycVerified` dla twórcy – to w następnym kroku.
- Zwróć 200 OK (ew. z informacją “consents updated”).
- Po stronie backendu te pola mogły być już ustawione defaultowo (false/null). Teraz zmieniają się na true.

**Kolejność integracji:**

- Implementuj backend update zgód, przetestuj (można przez Postman, wywołując z JWT testowego usera).
- Potem frontend: formularz zgód i wywołanie API.
- Należy pamiętać by ten krok nastąpił **po aliasie**. Czyli jeśli user nie ustawił aliasu a jakimś sposobem trafia tu – to znaczy ominął krok 6. Można dodać zabezpieczenie: jeśli `!user.username` to przekieruj do alias page. W normalnym flow nie powinno się zdarzyć.

**Testowanie:**

- **Backend consents endpoint:** Po zalogowaniu usera (np. weź JWT wygenerowany po loginie testowym), wywołaj `POST /users/consents` z body `{"termsAccepted": true, "ageConfirmed": true}` i header Authorization. Sprawdź czy zwraca 200. Sprawdź w DB, czy pola się ustawiły (np. `termsAcceptedAt` nie null, `ageConfirmed = true`). Spróbuj wywołać ponownie z tym samym – powinno nadal 200 (idempotentne). Spróbuj bez JWT – powinno 401.
- **Flow fan pełny:** Zarejestruj nowego fana (np. email lub OAuth, wedle uznania) -> alias -> strona zgód:
    - Upewnij się, że strona zgód pokazuje się i wymusza zaznaczenie. Spróbuj kliknąć bez zaznaczenia – powinno np. zablokować i oznaczyć wymagane pola (CSS czerwony outline czy komunikat).
    - Zaznacz tylko jeden z dwóch i kliknij – również powinno nie przejść (walidacja).
    - Zaznacz oba, kliknij. W network powinno pójść `/users/consents` 200.
    - Front powinien np. przekierować do głównej (sprawdź czy to zrobił).
    - W DB ten user powinien mieć termsAcceptedAt (czas bieżący) i ageConfirmed = true.
    - Po przekierowaniu, możemy testowo wyświetlić np. na stronie głównej jakiś banner powitalny, ale to niekonieczne. Istotne, że user teraz ma pełne konto i nie powinien być już trapowany w onboarding.
    - Upewnij się, że jeżeli teraz user odświeży stronę lub zaloguje się ponownie, nie będzie już kierowany znowu do alias/zgód (nasza logika: alias już ma, termsAccepted też, więc normalnie powinien iść do feedu/dash).
- **Flow fan - przerwane:** Rozważ scenariusz: user zarejestrował się (alias wybrał) ale zamknął przeglądarkę przed zaakceptowaniem zgód. Co wtedy? System ma usera z aliasem, ale termsAccepted false. Można przyjąć, że przy następnym logowaniu rozpoznamy to i znów pokażemy stronę zgód. Wypadałoby to zaimplementować:
    - Kiedy user loguje się (każdą metodą), backend może przekazać w JWT claimy lub front może pobrać profil i sprawdzić `if (!user.termsAcceptedAt) show consents`.
    - W implementacji możemy dodać w global store po loginie info o brakujących zgodach i w komponencie najwyższego poziomu zrobić redirect. Albo po prostu routing: np. `/fan/onboarding` sprawdza global user state.
    - W każdym razie, sprawdź: usuń z DB termsAcceptedAt u jakiegoś usera, zaloguj go – czy aplikacja go przeniesie do /fan/consents. To trzeba zaimplementować: np. przy mount strony głównej możemy zrobić:
        
        ```
        js
        KopiujEdytuj
        if(user.role==='FAN' && !user.termsAcceptedAt){
           router.replace('/fan/onboarding/consents');
           return null; // skip rendering main
        }
        
        ```
        
        Podobnie dla twórcy i incomplete profile.
        
    - Dodaj taką ochronę w odpowiednim miejscu (może już w mechanizmie ProtectedRoute).
- **Mid-tip scenario:** Ten jest tricky – według dokumentacji, jeśli fan rejestruje się w trakcie wspierania twórcy, po logowaniu wraca do procesu płatności. Jak to zrealizować z onboardingiem? Możliwe podejście:
    - Jeśli mamy `redirectToPayment` flagę (np. w state OAuth), to *minimalizujemy* onboarding: np. fan w trakcie płatności musi *tylko* zalogować się i może pominąć alias i zgody na gorąco, aby szybciej sfinalizować płatność. Byłoby to ryzykowne (regulamin niezaakceptowany formalnie). Alternatywne: pokazujemy bardzo skrócony onboarding w formie modalu: „Zaakceptuj TOS aby kontynuować płatność” – jeden checkbox i jedziemy.
    - To decyzja produktowa. W planie zaznaczmy: **Jeśli redirect do procesu płatności jest ustawiony, można dopuścić tymczasowe pominięcie pełnego onboardingu**. Np. po minimalnym kroku (login -> jeśli alias brak to poprosimy, bo bez alias nie da się utworzyć konta? Alias można by auto-wygenerować tu, albo jednak poprosić – to 10 sekund, może być). Po aliasie i jednorazowym potwierdzeniu zgód (chociaż jednego checkboxa) – wracamy do płatności, a resztę (np. pełne czytanie regulaminu) użytkownik może uzupełnić później.
    - Na potrzeby wdrożenia MVP: obsłużmy tak, że *nie pomijamy nic*, user musi przejść alias i zgody, potem wróci do płatności. Po akceptacji zgód, możemy od razu redirect na docelowy `redirectUrl` (np. stronę płatności) zamiast na główną.
    - Przetestuj to: ustaw w backend state np. `redirectUrl=/creator/123/support?amount=5` (coś takiego). Po rejestracji fan -> backend redirect z state param do front, front odczytuje i może ominąć normalny redirect do consents, albo przekazać dalej.
    - To zaawansowane, może w obecnym sprincie wystarczy wspomnieć, a zaimplementować później. W raporcie końcowym (Krok 9) jeszcze to uwzględnimy.

## Krok 8: Kreator ustawień profilu Twórcy (opcjonalny KYC, dane profilu)

Twórca po wybraniu aliasu ma konto z podstawową konfiguracją. Zaleca się jednak, by przeszedł przez dodatkowe kroki konfiguracji:

- **Informacja o portfelu:** Poinformuj twórcę, że **dla niego został automatycznie utworzony portfel USDC** i krótko wyjaśnij, jak będzie używany (np. "Wszystkie napiwki od fanów trafią na ten portfel. Możesz sprawdzić saldo w swoim dashboardzie i wypłacić środki na własny portfel lub konto bankowe."). Możesz pokazać fragment adresu portfela (ostatnie ~6 znaków) dla ciekawości lub przycisk „skopiuj adres depozytowy” jeśli twórca chce sam zasilić portfel.
- **Weryfikacja tożsamości (KYC) – opcjonalnie:** Platforma docelowo może wymagać weryfikacji twórców (Know Your Customer) zwłaszcza przy wypłatach fiat. Na tym etapie możemy dodać krok: „Zweryfikuj swoją tożsamość, aby umożliwić wypłaty na konto bankowe (opcjonalne teraz)”. Jeśli integrujemy z zewn. dostawcą KYC (np. Stripe Identity, SumSub, Veriff), to tu można umieścić przycisk/link „Rozpocznij weryfikację”. W MVP możemy ten krok **pominąć** lub umieścić placeholder:
    - Na przykład komunikat: „Weryfikacja tożsamości nie jest wymagana na starcie. Limit wypłat bez weryfikacji: 1000 USDC. Jeśli chcesz podnieść limity lub wypłacać na konto bankowe – [przejdź weryfikację]”. Ten link może prowadzić np. do dashboardu -> sekcji ustawień, gdzie w przyszłości będzie mechanizm KYC.
    - W DB możesz dodać pole `kycStatus` (np. 'unverified', 'pending', 'verified'). Na starcie 'unverified'. Jeśli użytkownik kliknie "pomiń teraz", zostaje 'unverified'. Jeśli przejdzie proces (poza zakresem tego sprintu), zaktualizujemy na 'verified'.
- **Uzupełnienie profilu:** Pozwól twórcy dodać:
    - **Zdjęcie profilowe (avatar):** Dodaj pole typu file upload. Możesz wykorzystać np. komponent `<input type="file" accept="image/*">`. Po wybraniu pliku generuj podgląd (URL.createObjectURL) i wyświetl miniaturkę, by użytkownik widział.
    - **Opis (bio):** Pole tekstowe (kilka zdań o sobie, max np. 160 znaków).
    - **Linki społecznościowe:** Możesz dać opcjonalnie pola na wpisanie URL do YouTube, Twitch, Twitter itp. (MVP: jedno pole "Link" – twórca może tam coś wpisać; pełna implementacja może mieć dedykowane pola).
    - **Kategorie/tagi:** W dokumentacji była wzmianka o kategoriach twórców (gaming, muzyka itp.), ale to może nie być zaimplementowane od razu. Ewentualnie drop-down do wyboru kategorii (opcjonalne).
    - Te wszystkie pola są **opcjonalne** – twórca może je uzupełnić teraz lub później w panelu. W kreatorze możemy zachęcić: „Dodaj kilka informacji o sobie, aby Twój profil był atrakcyjniejszy dla fanów (możesz pominąć ten krok i uzupełnić później).”.
    - Dodaj przyciski: „Zapisz i dalej” oraz „Pomiń”.
- **Zakończenie kreatora:** Ostatni ekran może potwierdzać: „Gotowe! Twój profil jest utworzony. Możesz teraz przejść do panelu i udostępnić swój profil fanom.” I przycisk „Przejdź do panelu twórcy”.

**Pliki do utworzenia/modyfikacji (frontend):**

- Strona profil kreatora: np. `app/creator/setup/profile/page.tsx`. (Jeśli zdecydowałeś inaczej strukturę: to może być część stanu `app/creator/setup` komponentu wieloetapowego. Można to zrobić i tak – np. ta sama strona co alias, tylko krok2. Ale dla czytelności modularnej kontynuujemy z osobną podstroną).
- Ewentualny pod-komponent `CreatorProfileForm.tsx` z polami dla avatara, bio, linków.
- Jeśli planujesz integrację KYC, może być komponent/modal do KYC (ale w MVP raczej tylko link/tekst).

**Implementacja (frontend UI):**

- Wyświetl powitanie: np. „Ustaw swój profil twórcy”. Przypomnij alias (np. „Twoja nazwa użytkownika: @alias” już ustawiona).
- Sekcja „Avatar”: miniatura + przycisk „Wgraj zdjęcie”. Gdy user wybierze plik, pokaż preview. (Jeśli brak integracji upload, możemy zapisać base64 do DB, ale to niewskazane przy większych plikach. Lepiej: skorzystać z AWS S3. To wymaga albo bezpośredniego uploadu (presigned URL) albo przez nasz backend.)
    - Dla MVP: możemy zrobić prościej – skip upload w tym sprincie (napisać w planie, że to do zrobienia później) lub obsłużyć bardzo podstawowo (np. base64 up to 1MB).
    - Ze względu na brak ustawień S3 w planie dotąd, może zaplanujmy integrację S3 w skrócie:
        - W AWS utwórz bucket `tipjar-plus-user-content`.
        - W backendzie utwórz endpoint `POST /users/avatar` przyjmujący plik (można użyć `@UseInterceptors(FileInterceptor)` NestJS). Zapisz plik do S3 (pakiet AWS SDK S3) z kluczem np. `avatars/{userId}.jpg`. Ustaw ACL prywatne (będziemy może serwować poprzez CloudFront, ale można i publicznie). Zwróć URL do pliku (np. CloudFront URL lub S3 pre-signed get).
        - Zapisz URL w `user.profileImageUrl` w DB.
        - Front: po wybraniu pliku, wyślij form-data do `/users/avatar`. Odbierz sukces, może od razu ustawić <img src> na zwrócony URL.
        - To sporo jak na MVP – można uprościć: nie implementować upload teraz, tylko w UI mieć placeholder „[Brak zdjęcia]” i informację, że można dodać później. Dla planu opiszmy docelowo integrację S3, ale zaznaczmy że to może być wykonane w oddzielnym tasku.
- Sekcja „Bio”: `<textarea maxLength={160}>`. Podgląd liczby znaków.
- Sekcja „Link”: może jedno pole „Twój link (np. do kanału YouTube lub innej strony)” – twórca może wpisać cokolwiek. Zaawansowanie: dodać ikonki i walidować format URL. Na MVP: zwykły input z placeholderem `https://` i sprawdź czy zaczyna się od http.
- Sekcja „Kategoria”: jeśli decydujemy, np. `<select>` z kilkoma przykładowymi kategoriami (streamer, artysta, etc.). Można pominąć w MVP bez straty.
- Sekcja „KYC”: Jeśli decydujemy się dodać, to:
    - Jeśli integrujemy z konkretnym dostawcą, to tu wstawiamy jego widget. Np. SumSub daje link do flow KYC. To duże zadanie – **na MVP raczej skip**.
    - Alternatywnie, wyświetl: „Status weryfikacji: Niezweryfikowany. [Rozpocznij weryfikację]”. Ten link może nie działać (placeholder), albo otwierać modala informującego „Funkcja w przygotowaniu”.
    - W planie zaznacz, że KYC integracja do zrobienia później, by nie blokować.
- Przyciski:
    - „Zapisz profil i zakończ” – wyślij wszystkie zebrane dane do backendu.
    - „Pomiń” – jeśli user nie chce teraz uzupełniać. Przy kliknięciu pomiń można po prostu przekierować do panelu bez wysyłania (dane zostaną default).
    - Ewentualnie „Później” – to samo co pomiń.
- **Nawigacja po zakończeniu:** Po zapisie lub pominięciu, przekieruj do **dashboardu twórcy**. Zakładamy, że po rejestracji twórcy będzie miał dostęp do panelu zarządzania (np. route `/creator/dashboard`). Jeśli taki dashboard jeszcze nie istnieje, można przekierować np. do strony profilowej twórcy (publicznej) albo do landing z komunikatem. Jednak według architektury, panel twórcy jest częścią MVP (zarządzanie portfelem, statystyki itd.), więc pewnie w toku prac będzie stworzony. W planie załóżmy, że istnieje route `/creator/dashboard` i tam go wysyłamy.

**Implementacja (backend - profil twórcy):**

- **Model danych:** W tabeli Users lub osobnej tabeli Profile:
    - Pola: `profileImageUrl`, `bio`, `socialLink` (lub kilka: twitterUrl, youtubeUrl, etc.), `category` (enum/string), `kycStatus`. Dodaj je jeśli brak.
    - Zakładamy, że update profilu będzie przez autoryzowany endpoint.
- **Endpoint update profilu:** Możemy stworzyć `PUT /users/profile` który przyjmuje JSON z tymi polami. (Avatar osobno, bo to plik – jak wyżej).
- **KYC status:** Na razie nie zmieniamy (chyba że integrujemy z jakimś sandbox procesem – raczej nie).
- **User profileComplete:** Po zakończeniu kreatora, możemy ustawić `profileComplete = true` dla usera (tak by np. wiedzieć, że nie trzeba go znów do kreatora kierować).
- **Implementacja:** W `UserController.updateProfile()` – pobierz `@Body()` z optional fields. Dla bezpieczeństwa sprawdź długości (bio <=160, link <=200, etc.). Zapisz do usera: `userService.update(id, {bio, profileImageUrl, ...})`.
- Jeśli rozdzieliliśmy profil twórcy do osobnej tabeli `CreatorProfile`, to tutaj odpowiednio zapisz tam (ale to dodatkowa komplikacja – prostsze jest trzymać w User).
- **Integracja KYC (opcjonalna):** Jeśli byśmy dodawali KYC teraz:
    - Wymaga integracji np. z Circle KYC or AML – Circle Payouts wymaga KYC do przelewów bankowych. Ewentualnie integracja z osobnym systemem.
    - Ze względu na złożoność, w tym planie proponujemy tylko dodać pole kycStatus i obsłużyć ewentualne proste zmiany stanu (np. user klika "rozpocznij weryfikację", my generujemy link do zewn. strony). Implementację tej integracji można zaplanować poza głównym flow rejestracji (np. jako osobny sprint).
    - Dlatego tutaj jedynie przygotuj grunt: pole w DB, sekcja informacyjna w UI.

**Kolejność integracji:**

- Możesz najpierw front/UI przygotować (to sporo elementów), a backend w międzyczasie. Jednak lepiej zacznij od minimalnego backend (updateProfile) bo to prostsze, a UI więcej testowania.
- Integruj elementy po kolei: np. najpierw obsługa pola bio (to łatwe), potem link, potem avatar (najtrudniejsze bo pliki).
- Ponieważ avatar upload wymaga sporo integracji AWS, rozważ zrobienie tego jako **ostatni element** jeśli starczy czasu, lub zostawienie jako TODO z notką dla dewelopera.

**Testowanie:**

- **Bezpośrednie (backend):**
    - Wywołaj `PUT /users/profile` z JWT twórcy i body np. `{"bio":"Test bio","socialLink":"http://twitter.com/xyz","category":"gaming"}`. Sprawdź odpowiedź 200 i czy DB się zaktualizowało.
    - Testuj walidacje: np. za długi bio (200+ znaków) – nasz backend może ciąć do 160 lub zwrócić 400.
    - Avatar upload: jeśli implementowany, przetestuj `POST /users/avatar` poprzez Postman (trzeba użyć form-data z plikiem). Sprawdź czy plik pojawił się w S3 (np. przez AWS CLI lub panel) i czy URL został zapisany.
- **Flow twórcy pełny:**
    - Zarejestruj nowego twórcę aż do alias (Krok 6), co przekieruje do strony profilu (Krok 8).
    - Na stronie profilu: spróbuj kolejno:
        - Wgrać zdjęcie (jeśli działa: wybierz np. plik JPG, zobacz preview, kliknij "Zapisz profil" – oczekuj, że plik się wyśle i wróci, i profil zapisany).
        - Wpisać bio i link, kliknąć "Zapisz".
        - W devtools obserwuj kolejność: jeśli avatar wysyłasz osobno, pewnie wyśle się on po wybraniu. Jeśli czekasz do końca i wysyłasz razem z profile, możliwe że musisz najpierw wykonać upload w kodzie (np. w handleSubmit: jeśli jest `avatarFile`, najpierw await uploadAvatar(), pobierz URL, potem do PUT profile dołącz ten URL). Zaimplementuj tak i przetestuj.
    - Spróbuj opcji „Pomiń” – powinno Cię od razu przenieść do dashboard. Sprawdź, czy user.profileComplete ustawiłeś (możesz to zrobić na "Pomiń" klik: np. wywołać backend update żeby tylko profileComplete true ustawić bez innych zmian, albo ustawić w JWT – raczej lepiej zrobić minimalny update).
    - Upewnij się, że po zapisaniu/pominięciu, nastąpiło przekierowanie do dashboard (`/creator/dashboard`). Jeśli nie ma prawdziwego dashboardu, stwórz placeholder page z tekstem "Witaj w panelu twórcy".
    - Sprawdź DB: czy profilowe pola się zapisały (bio, link, avatarURL).
    - KYC: jeśli dodałeś UI element, kliknij "Rozpocznij weryfikację" (jeśli to link – sprawdź czy działa/prawidłowo disabled). W obecnej implementacji pewnie to tylko statyczny tekst, więc ok.
- **Ponowne logowanie twórcy:**
    - Teraz wyloguj i zaloguj ponownie tego twórcę (np. poprzez /login Google). Ponieważ ma `profileComplete=false` (jeśli nie ustawiliśmy, bo może to warunkujemy alias?), zobacz czy system nie próbuje go znów wrzucić do kreatora.
    - Tutaj warto mieć mechanizm: np. `if(user.role==='CREATOR' && !user.profileComplete) router.replace('/creator/setup/profile')`. Dodaj to w logicznej części aplikacji (może wspólny ProtectedRoute).
    - Jeśli profilComplete ustawiliśmy po kreatorze, to przy ponownym logowaniu trafi do /creator/dashboard.
- **Bez uzupełnienia profil (skip):**
    - Twórca, który pominął – ma alias, portfel, ale bio i avatar puste.
    - Wejdź na publiczny profil tego twórcy (jeśli zaimplementowany, np. tipjar.plus/@alias). Powinno wyświetlić domyślny avatar i brak bio – co jest ok.
    - Twórca może później uzupełnić w ustawieniach – to do zrobienia w panelu.
- **Stabilność:**
    - Sprawdź, czy kliknięcie "Zapisz profil" bez wypełnienia czegokolwiek działa (to ważne – user może nic nie zmienić i kliknąć). Backend powinien zaakceptować i po prostu nie zmieni nic (można tak to zrobić, by pola opcjonalne jak undefined zignorować).
    - Zbadaj, czy duże pliki avatar nie powodują problemu (jeśli implementowano). Można ograniczyć akceptowane np. do 5MB i typy tylko jpg/png.
    - Jeżeli internet wolny, czy widać jakiś loading przy uploadzie? Można dodać spinner na przycisku "Zapisz" gdy operacja trwa, by user nie klikał wielokrotnie.

## Krok 9: Routing i przekierowania po rejestracji (pełna ścieżka użytkownika)

W tej części zbierzemy logikę nawigacji, by upewnić się, że użytkownik trafia w odpowiednie miejsca zależnie od swojej roli i stanu konta, **na każdym etapie**:

- **Po OAuth/Logowaniu:**
    - Backend decyduje, gdzie wysłać usera po zalogowaniu (jak opisano w Krokach 3-4). Podsumowanie:
        - Nowy **Twórca** -> redirect na `frontend/creator/setup` (alias wybór).
        - Nowy **Fan** -> redirect na `frontend/fan/onboarding` (alias/zgody).
        - Istniejący **Twórca** (kompletny profil) -> można redirect od razu do `frontend/creator/dashboard`. W praktyce jednak jeśli używamy zawsze route /creator/setup dla twórcy, to musimy tam w runtime przekierować, jeśli profil complete. Bezpiecznie: backend może rozróżnić: jeśli user.profileComplete true, to od razu do dashboard; jeśli false, to do setup. Można to zaimplementować np. w JWT payload (dodać flagę) i front sprawdzi, lub prostszym: mieć dwa różne redirect URL:
            - np. Passport GoogleStrategy dla twórcy: `successRedirect: profileComplete ? FRONTEND_URL/creator/dashboard : FRONTEND_URL/creator/setup`.
        - Istniejący **Fan** (już akceptował zgody) -> redirect na np. `frontend/` (strona główna lub feed).
        - Istniejący **Fan** (nie akceptował jeszcze, bo np. ominął po rejestracji email?) -> redirect na `frontend/fan/onboarding/consents`.
        - W praktyce jednak, jeśli user istnieje to likely zgody już ma (bo nie dopuściliśmy inaczej), więc fanów można zawsze na główną.
    - **Implementacja:** W `AuthController` przy generowaniu redirectu weź pod uwagę pola usera:
        - if user.role == CREATOR:
            - if !user.username (alias nie ustawiony) -> `/creator/setup` (krok alias).
            - else if user.profileComplete == false -> `/creator/setup/profile` (może ominął wcześniej, albo rejestrujemy inaczej).
            - else -> `/creator/dashboard`.
        - if user.role == FAN:
            - if !user.username -> `/fan/onboarding` (alias).
            - else if !user.termsAcceptedAt -> `/fan/onboarding/consents`.
            - else -> `/` (lub `/discover`).
        - Dodatkowo: obsłuż `redirectUrl` z parametru state:
            - Jeśli state zawiera `redirect=<encodedUrl>`, po zalogowaniu powinno to mieć pierwszeństwo: czyli user idzie tam zamiast standardowego onboarding.
            - Jednak jak wspomnieliśmy, **nie chcemy całkiem pominąć** onboardingu – musimy minimalnie spełnić warunki.
            - Propozycja: jeśli `redirectUrl` jest obecny i użytkownik to fan:
                - Jeśli nie ma aliasu, i nie da się go automatycznie nadać, to i tak musimy pokazać alias (krótka przerwa).
                - Po aliasie i tak musimy wymusić akceptację regulaminu.
                - Może jednak zamiast pełnej strony zgód, przywracamy użytkownika do płatności *ale* wymagamy potwierdzenia jednym kliknięciem, np. w modalu. To skomplikowane do implementacji natychmiast.
            - Minimalnie w MVP: **ignorujemy redirect i prowadzimy usera normalnie przez onboarding**. Po ukończeniu (Krok 7) przekierujemy na docelowy redirect.
            - Czyli: backend może przekazać frontowi info o docelowej stronie (np. dodać param `?redirectUrl=...` do frontendu onboarding URL). Front wtedy po zakończeniu zgód (Krok 7) sprawdzi `if(redirectUrl) router.push(redirectUrl)`.
            - Zaimplementujmy to:
                - W state param do Google/Twitch dołącz `redirect=...` jeśli user kliknął „wesprzyj” i jest kierowany do logowania.
                - Backend przeniesie state->frontend (np. FRONTEND_URL/fan/onboarding?redirect=...).
                - Na stronie zgód fana (Krok 7), po sukcesie zamiast do głównej, zrób: `if(query.redirect) router.push(decodeURI(query.redirect)) else router.push('/')`.
            - Test: np. redirect = `/creator/janek/support?amount=5`. Po procesie zgód user tam trafi i zobaczy finalny ekran płatności.
            - Twórcy raczej nie mają takiego scenariusza (nie rejestrują się w środku akcji).
- **Ochrona tras (frontend):**
    - Dodaj mechanizmy chroniące poszczególne ścieżki:
        - Strony onboarding (alias, consents, profile setup) powinny być dostępne tylko gdy użytkownik jest zalogowany i faktycznie ich potrzebuje.
            - Jeśli zalogowany user wchodzi na `/fan/onboarding/consents`, a już zaakceptował – przekieruj go np. do głównej (nie ma tam czego szukać).
            - Jeśli niezalogowany wejdzie – przekieruj do `/register`.
        - Strony panelu (`/creator/dashboard`, ewentualnie przyszłe `/fan/feed`) – dostęp tylko dla zalogowanych odpowiedniej roli.
            - Jeśli fan spróbuje `/creator/dashboard` – backend/SSR może dać 403 lub redirect na / (lub jeśli front-route, to wew. guard).
    - Można to zaimplementować na kilka sposobów:
        - Next.js App Router pozwala użyć middleware (w pliku `middleware.ts`) – można nim przekierowywać na podstawie cookies lub prefixu ścieżki. Np. jeśli ścieżka zaczyna się od `/creator` i brak tokena/rola, redirect to `/login`.
        - Albo implementacja na poziomie komponentów: używać hooka useEffect do sprawdzania stanu zalogowania (jak wspomnieliśmy wyżej).
    - Najlepiej wykorzystać to, co jest już w projekcie: może jest custom `<AuthGuard>` lub Zustand store z user i można sprawdzać.
    - W planie:
        - Załóż istnienie globalnego obiektu user w store.
        - W komponencie najwyższego poziomu (layout?) możesz warunkowo przekierowywać. Np. w `app/creator/layout.tsx` możesz sprawdzić user i jeśli user.role !== CREATOR -> redirect (coś takiego).
        - Alternatywnie, w każdym page komponent, np. na początku useEffect: sprawdź warunki i `router.replace`.
    - **Konkrety**:
        - `/register/*` – dostępne dla niezalogowanych. Jeśli user zalogowany i spróbuje tam wejść (np. kliknie wstecz przeglądarki) – można przekierować do / (bo nie ma sensu rejestrować).
        - `/creator/setup*` – wymaga user zalogowany && user.role == CREATOR. Jeśli brak – redirect login. Jeśli user.role == CREATOR ale profileComplete true – już nie powinien tu być, redirect dashboard.
        - `/fan/onboarding*` – wymaga user zalogowany && role == FAN. Jeśli termsAccepted już true – redirect /.
        - `/creator/dashboard` – wymaga user zalogowany && role == CREATOR && profileComplete true (jeśli false, to do setup/profile).
        - `/fan/feed` (jeśli jest) – wymaga user zalogowany && role == FAN.
    - Takie warunki umieść w odpowiednich komponentach lub centralnie w middleware.
- **Podsumowanie flow użytkownika:**
    - **Fan (pełny):** /register -> wybór roli Fan -> /register/fan -> wybiera metodę (Google/Email/itd) -> backend autoryzuje -> redirect do /fan/onboarding (alias) -> ustawia alias -> /fan/onboarding/consents -> akceptuje zgody -> (jeśli redirectUrl: przeniesiony do np. płatności; jeśli nie: do strony głównej/Discover). Potem koniec.
    - **Creator (pełny):** /register -> rola Creator -> /register/creator -> metoda (OAuth/Email/MetaMask) -> backend -> redirect /creator/setup (alias) -> alias -> /creator/setup/profile -> uzupełnia lub pomija profil -> redirect /creator/dashboard.
    - **Rejestracja przez email** w obu przypadkach ma dodatkowy krok: po wypełnieniu formularza następuje **weryfikacja email poza aplikacją**, potem user loguje się i dopiero wchodzi w powyższy flow od etapu "backend autoryzuje".
    - **Istniejący user loguje się (nie rejestruje):**
        - Fan: po login (OAuth/hasło) idzie od razu do strony głównej, chyba że `termsAccepted` nie ma – wtedy do zgód.
        - Creator: po login idzie do dashboard, chyba że `profileComplete` false – wtedy do tego etapu kreatora, którego nie skończył.

**Testowanie (pełne scenariusze end-to-end):**

- **Nowy Fan przez Google:** symuluj jako realny user: w przeglądarce wejdź na stronę rejestracji, przejdź przez wszystkie kroki do końca, sprawdź czy każdy redirect jest poprawny i nie ma momentów zawieszenia czy błędów.
- **Nowy Twórca przez Email:** pełny scenariusz:
    - /register -> Creator -> email form -> dostaje informację o wysłaniu linku. Kliknij link w mailu (np. skopiuj token, wejdź w verify) -> przekieruje Cię do /login z komunikatem (nasz plan).
    - Zaloguj się (musisz zaimplementować stronę logowania właściwie – nie opisaliśmy, ale pewnie podobna do rejestracji; jeśli jeszcze nie ma, zaloguj via Postman by dostać JWT i otwórz /creator/setup z tokenem w cookie). W praktyce trzeba mieć formularz logowania – zakładamy, że jest lub do zrobienia analogicznie jak register (Passport local strategy). Jeśli nie zaimplementowany, dodaj `@Post('login')` w AuthController i front page `/login` analogicznie do register/email.
    - Po logowaniu twórcy – powinien iść do alias -> profil -> dashboard.
    - Sprawdź każdą część.
- **Nowy Twórca przez MetaMask:** do testu potrzebne metamask i skonfigurowana SIWE – przejdź całość jak user, sprawdź alias, profil.
- **Mid-tip**: Ten trudniej zasymulować manualnie, bo trzeba by wejść np. na publiczny profil twórcy i kliknąć „Wesprzyj” -> pewnie pokazuje się popup logowania – to integracja w UI poza rejestracją. Jeśli to nie zaimplementowane, można tylko symulować dodając param `?redirect=/creator/xyz/support` w URL rejestracji. Spróbuj: `/register/fan?redirect=%2Fcreator%2Fxyz%2Fsupport` -> rejestracja -> zobacz czy po zgodach front wyśle tam (musisz w konsoli ustawić window.location jak nie masz mechanizmu gotowego). Ten przypadek można też przetestować ustawiając state param w OAuth: to wymaga edycji front-u przed kliknięciem OAuth, by dodać `&state=fan|redirect=/creator/xyz` lub jak zakodujesz.
- **Istniejący Fan logowanie:** Zarejestruj fanę w pełni. Wyloguj (tu przyda się implementacja logout – np. usuń token z store/cookie). Następnie spróbuj zalogować (przez /login Google, lub if local strategy /login form). Po zalogowaniu powinien iść do głównej (bo alias i zgody już ma). Sprawdź to.
- **Istniejący Twórca logowanie:** To samo – po zalogowaniu idzie do dashboard (chyba że profilComplete nie miał).
- **Ochrona dostępu:**
    - Spróbuj wejść na `/creator/dashboard` bez logowania – powinno Cię przekierować np. na /register lub /login. Jeżeli nie, zaimplementuj w middleware:
        
        ```
        nginx
        KopiujEdytuj
        if (!token && req.nextUrl.pathname.startsWith('/creator')) redirect('/register')
        
        ```
        
        (Pseudo-code).
        
    - Spróbuj jako fan (z tokenem fana) wejść /creator/dashboard – można np. ustawić w store role=FAN i spróbować. Powinno albo nie autoryzować (np. backend calls in that page fail).
    - Wejdź jako zalogowany twórca na /fan/onboarding/consents – powinna nastąpić redirekcja (bo rola nie pasuje).
    - Ogólnie upewnij się, że nie ma dziwnych możliwości pominięcia czegoś.

## Krok 10: Testy końcowe, monitorowanie i dalsze uwagi odnośnie błędów

**Kompleksowe testy integracyjne:** Po przeprowadzeniu powyższych manualnych testów dla poszczególnych kroków, wykonaj **pełny test integracyjny** symulujący realne użycie:

- Przejdź cały proces jako nowy twórca i jako nowy fan, na środowisku deweloperskim, od początku do końca, na różnych przeglądarkach, upewniając się że wszystko jest spójne.
- Testuj nietypowe ścieżki:
    - Rejestracja twórcy -> alias -> *zamknij kartę* -> zaloguj się ponownie -> powinno Cię znów skierować do dokończenia profilu.
    - Rejestracja email -> nie kliknij linku od razu, spróbuj zalogować bez weryfikacji -> powinno odmówić (nasz backend pewnie nie pozwoli bo isEmailVerified false => login local strategy może sprawdzać to).
    - Logowanie przez różne metody do tego samego konta: np. zarejestruj przez email, potem spróbuj zalogować przez Google używając tego samego email – nasz system wykryje usera i co zrobi? Aktualnie, jeśli email istnieje z rolą CREATOR a próbujemy Google jako CREATOR, to zaloguje (bo znajdzie usera). Czy po zalogowaniu Google użytkownik może teraz logować się i jedną i drugą metodą? Tak, bo konta „połączyliśmy” poprzez email. To jest OK, ale trzeba przetestować:
        - Zarejestruj konto email (fan). Zweryfikuj, zaloguj. Wyloguj.
        - Zaloguj przez Google używając tego samego email, wybierając rolę Fan. System powinien wykryć usera i zalogować bez tworzenia nowego. Sprawdź czy nie utworzył duplikatu.
        - Zrób to samo, ale wybierz rolę Creator w tym scenariuszu (to raczej przypadek, że user nie wie, że ma już konto, wybierze Creator – nasz system wtedy powie „email already in use as fan”). Upewnij się, że obsłużyliśmy to i że użytkownik dostanie czytelny komunikat (np. przekieruj na stronę logowania z komunikatem „Masz już konto jako Fan. Zaloguj się.”).
    - Logowanie przez SIWE do istniejącego konta z podpiętym emailem: raczej nie wystąpi, bo konta web3 nie mają email. Odwrotnie: jak user ma konto web3, a spróbuje zarejestrować email z tym samym aliasem? Alias jest global unique, więc email rejestrujący z aliasem zajętym dostanie błąd i będzie musiał wybrać inny alias po weryfikacji (nasz check-username to obsłuży).
- **Błędy sieci/API:**
    - Zasymuluj błąd backendu przy rejestracji (np. zatrzymaj serwer i spróbuj submitnąć formularz) – front powinien nie zawiesić się, tylko np. timeout i komunikat "Server not responding".
    - Błąd OAuth: np. odrzuć zgody Google – Google przekieruje do callback z error param. Obsłuż to: w `AuthController` callback możesz sprawdzić `req.query.error`. Jeśli jest, to redirect do frontu `/register?error=GoogleAuthFailed`. Front może wyświetlić alert "Logowanie Google nie powiodło się". Przetestuj to (przy logowaniu Google, na ekranie zgód kliknij cancel).
    - Błędy w interfejsie: np. komponenty powinny mieć obsługę stanu ładowania aby uniknąć wielokrotnego submit (zwłaszcza alias form i consents form).
    - Bezpieczeństwo:
        - Upewnij się, że wszystkie wrażliwe operacje są chronione JWT (profile update, set-username, consents).
        - Sprawdź, czy token JWT ma rozsądny czas ważności (np. 1h access, refresh mechanizm – logi wskazują /auth/refresh-token endpoint jest, dobrze byłoby go użyć w front – może do dopracowania w następnym sprincie).
        - Sprawdź czy cookies (jeśli użyte) mają HttpOnly i secure flagi.
        - Weryfikacja email: link powinien być jednorazowy – nasz kod unieważnia token po użyciu, to ok.
        - Hasła: sprawdź w DB hashe (nie zapisuj plain).
    - Wydajność:
        - W trybie deweloperskim może być wolniej, ale sprawdź, czy nie ma zauważalnych dużych lagów. Np. Circle wallet creation – czy user czeka długo na przekierowanie po OAuth? Jeśli np. >2s, pomyśl o wskazaniu „Trwa tworzenie Twojego portfela...” na front w międzyczasie. Można to zrobić: backend może najpierw przekierować do frontu od razu, a portfel w tle (ale to trudne bo my chcemy mieć walletId od razu). Alternatywa: pokaż loader na front po powrocie z OAuth (wejście na /creator/setup może nastąpić zanim wallet w pełni gotowy – ale nasz backend czeka na wallet).
        - Jeśli okaże się to problemem, ewentualnie w przyszłości optymalizuj (teraz nie zmieniamy).
    - Skalowalność:
        - Upewnij się, że równoczesna rejestracja dwóch osób o tym samym aliasie nie przejdzie (DB unique to zapewni – test concurrency niby trudno lokalnie, ale unit test można by napisać).
        - Sprawdź czy Passport i inne komponenty nie mają memory leak w logach (raczej nie).
- **Deployment w środowisku docelowym:**
    - Przygotuj pliki konfig dla produkcji:
        - Vercel: ustaw `NEXT_PUBLIC_API_URL` na produkcyjne API URL. Ustaw zmienne Google/Twitch OAuth na prod (domeny callback pewnie inne niż localhost).
        - AWS: zapewnij, że .env na serwerze ma poprawne klucze (Google/Twitch, Circle, SendGrid).
        - Po wdrożeniu na staging/produkcji zrób test rejestracji realnie w środowisku (to powtórzenie powyższych testów).
    - Monitoruj logi:
        - Sprawdź, czy nie pojawiają się wyjątki w NestJS podczas rejestracji (np. błędy Passport, błędy zapisu do DB).
        - Sprawdź front (np. w przeglądarkach mobilnych).
- **Dalsze kroki (poza zakresem implementacji rejestracji):**
    - Implementacja **strony logowania** (jeśli oddzielna). Prawdopodobnie NextAuth nie jest użyte, więc analogicznie jak rejestracja email będzie login email (AuthGuard local strategy).
    - Umożliwienie **resetu hasła** (nie wspomniane, ale zwykle potrzebne – link „Nie pamiętasz hasła?” na login).
    - **Weryfikacja dwuskładnikowa** – raczej nie na tym etapie.
    - **Notyfikacja email powitalna** – można wysłać po rejestracji (miły akcent, nie priorytet).
    - **Frontend Discover page** – fan po rejestracji pewnie trafi tam, zadbajmy by była chociaż podstawowa lista twórców do zobaczenia (można to zrealizować później).
    - **Admin panel** – np. monitoring nowych rejestracji – poza MVP.

**Testy jednostkowe:** W miarę możliwości napisz testy jednostkowe/integracyjne dla krytycznych funkcji:

- UserService.createUser (sprawdzenie że ustawia poprawnie role i wywołuje Circle).
- AuthController Google callback (czy tworzy usera gdy nie istnieje, itd.).
- CheckUsername/SetUsername endpoints (różne przypadki).
- Możesz użyć jest + supertest do symulacji requestów.

Po wykonaniu wszystkich testów i poprawek, proces rejestracji będzie gotowy do wdrożenia. Wszystkie kroki zostały opisane z myślą o środowisku deweloperskim (WSL + VSCode) – pliki wskazane, ustawienia omówione, co pozwoli deweloperowi zaimplementować bez niedomówień. W razie jakichkolwiek wątpliwości, należy sprawdzić zgodność z dokumentacją (fragmenty zacytowane powyżej) oraz upewnić się, że doświadczenie użytkownika jest zgodne z założeniami produktu (szybka, intuicyjna rejestracja zarówno dla fanów, jak i twórców). Powodzenia we wdrażaniu!