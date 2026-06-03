Ultraszczegółowa Logiczna
Mapa Systemu TipJar+ w
Formacie JSON
[
{
"id": "UA_register_submit",
"title": "Wysłanie formularza rejestracji (email/hasło)",
"type": "user_action",
"description": "Użytkownik wprowadza email i hasło w formularzu rejestracji i
zatwierdza.",
"depends_on": [],
"outputs": [
"BL_create_user"
],
"related_data": [
"email",
"password"
],
"visibility": "public",
"error_handling": "Jeśli dane nieprawidłowe (np. zbyt słabe hasło), wyświetlany
jest komunikat błędu."
},
{
"id": "BL_create_user",
"title": "Utworzenie nowego konta użytkownika",
"type": "backend_logic",
"description": "Backend tworzy nowe konto użytkownika w bazie danych:
haszuje hasło, ustawia status konta na niezweryfikowany i generuje token
weryfikacyjny do email.",
"depends_on": [
"UA_register_submit"
],
"outputs": [
"AP_send_verification_email"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
1],
"related_data": [
"email",
"hashed_password",
"verification_token"
],
"visibility": "internal",
"error_handling": "Jeśli email jest już zarejestrowany, zwracany jest błąd (np.
status 409) informujący o zajętym adresie email."
},
{
"id": "AP_send_verification_email",
"title": "Wysłanie emaila weryfikacyjnego",
"type": "api_call",
"description": "System wysyła na podany adres email wiadomość z linkiem
aktywacyjnym zawierającym token. Wykorzystywana jest usługa email (np.
SendGrid).",
"depends_on": [
"BL_create_user"
],
"outputs": [],
"related_data": [
"email_address",
"verification_link"
],
"visibility": "internal",
"error_handling": "Jeśli wysyłka email nie powiedzie się (np. błąd SMTP),
rejestracja zostaje zachowana w bazie, a użytkownik może ponowić prośbę o
link weryfikacyjny później."
},
{
"id": "TRIG_email_verification",
"title": "Kliknięcie linku weryfikacyjnego (trigger)",
"type": "trigger",
"description": "Użytkownik kliknął w link weryfikacyjny otrzymany emailem.
Żądanie trafia na endpoint weryfikacji z tokenem.",
"depends_on": [],
"outputs": [
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
2"BL_verify_account"
],
"related_data": [
"verification_token"
],
"visibility": "public",
"error_handling": "Jeśli link wygasł lub token jest nieprawidłowy, wyświetlany
jest komunikat o błędnym lub wygasłym tokenie."
},
{
"id": "BL_verify_account",
"title": "Weryfikacja konta użytkownika",
"type": "backend_logic",
"description": "Backend sprawdza token weryfikacyjny: jeśli jest ważny,
ustawia status użytkownika na aktywny/zweryfikowany. Token zostaje
unieważniony aby nie mógł być użyty ponownie.",
"depends_on": [
"TRIG_email_verification"
],
"outputs": [
"UI_verification_success"
],
"related_data": [
"verification_token",
"user_record"
],
"visibility": "internal",
"error_handling": "Jeśli token nie istnieje lub został już wykorzystany, zwracany
jest błąd (np. link nieważny)."
},
{
"id": "UI_verification_success",
"title": "Strona potwierdzenia weryfikacji",
"type": "ui_component",
"description": "Interfejs wyświetla potwierdzenie, że konto zostało pomyślnie
zweryfikowane. Użytkownik może teraz się zalogować.",
"depends_on": [
"BL_verify_account"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
3],
"outputs": [],
"related_data": [],
"visibility": "public",
"error_handling": "Jeśli wystąpił błąd weryfikacji, zamiast tego wyświetlany jest
komunikat o błędzie."
},
{
"id": "UA_login_submit",
"title": "Logowanie - wysłanie formularza (email/hasło)",
"type": "user_action",
"description": "Użytkownik wprowadza email i hasło na stronie logowania i
zatwierdza formularz.",
"depends_on": [],
"outputs": [
"BL_authenticate_user"
],
"related_data": [
"email",
"password"
],
"visibility": "public",
"error_handling": "Jeśli pola formularza są niepoprawne (np. brak hasła),
wyświetlany jest komunikat o błędzie walidacji."
},
{
"id": "BL_authenticate_user",
"title": "Autentykacja użytkownika (email/hasło)",
"type": "backend_logic",
"description": "Backend weryfikuje dane logowania: sprawdza czy podany
email istnieje oraz czy hasło jest poprawne (porównując hasz). Jeśli dane są
prawidłowe i konto jest zweryfikowane, generowany jest token sesyjny (JWT) i
rozpoczynana sesja użytkownika.",
"depends_on": [
"UA_login_submit"
],
"outputs": [
"UI_user_dashboard"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
4],
"related_data": [
"user_id",
"JWT_token"
],
"visibility": "internal",
"error_handling": "Jeśli logowanie się nie powiedzie (błędny email/hasło lub
konto nieaktywne), zwracany jest komunikat błędu (np. 'Nieprawidłowe dane
logowania' lub 'Konto niezweryfikowane')."
},
{
"id": "UI_user_dashboard",
"title": "Panel użytkownika (Fan/Twórca)",
"type": "ui_component",
"description": "Po pomyślnym zalogowaniu użytkownik zostaje przekierowany
do swojego panelu (dashboard). Wyświetlane są tam jego dane profilowe,
opcje (np. doładowanie portfela, lista obserwowanych twórców itp.).",
"depends_on": [
"BL_authenticate_user"
],
"outputs": [],
"related_data": [
"user_profile",
"session_token"
],
"visibility": "public",
"error_handling": "Jeśli token sesji jest nieważny lub wygasł, użytkownik
zostaje wylogowany i poproszony o ponowne logowanie."
},
{
"id": "UA_google_oauth_start",
"title": "Rozpoczęcie rejestracji przez Google OAuth",
"type": "user_action",
"description": "Użytkownik klika przycisk 'Zarejestruj przez Google'. Aplikacja
przekierowuje go do procesu logowania Google (OAuth2).",
"depends_on": [],
"outputs": [
"API_google_auth"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
5],
"related_data": [
"Google_OAuth_request"
],
"visibility": "public",
"error_handling": "Jeśli okno logowania Google zostało zablokowane przez
przeglądarkę, użytkownik powinien zezwolić na wyskakujące okna."
},
{
"id": "API_google_auth",
"title": "Przekierowanie do Google (OAuth)",
"type": "api_call",
"description": "Przeglądarka użytkownika zostaje przekierowana na stronę kont
Google. Parametry OAuth (klient ID, scope, redirect URI) są przekazywane, aby
użytkownik mógł wyrazić zgodę na dostęp.",
"depends_on": [
"UA_google_oauth_start"
],
"outputs": [],
"related_data": [
"oauth_client_id",
"redirect_uri",
"scopes"
],
"visibility": "public",
"error_handling": "Jeśli Google OAuth jest niedostępny lub zwraca błąd (np.
błąd sieci), proces rejestracji zostaje przerwany i wyświetlany jest komunikat o
błędzie."
},
{
"id": "TRIG_google_callback",
"title": "Powrót z Google OAuth (callback)",
"type": "trigger",
"description": "Google przekierowuje z powrotem na aplikację (na ustalony
redirect URI) z kodem autoryzacyjnym. Żądanie trafia na backend (endpoint
OAuth callback).",
"depends_on": [],
"outputs": [
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
6"BL_handle_google_oauth"
],
"related_data": [
"auth_code",
"state"
],
"visibility": "internal",
"error_handling": "Jeśli Google zwróci błąd (np. użytkownik anulował), endpoint
jest wywołany z parametrem błędu i proces rejestracji nie zostaje ukończony
(wyświetlany jest komunikat)."
},
{
"id": "BL_handle_google_oauth",
"title": "Obsługa odpowiedzi OAuth Google",
"type": "backend_logic",
"description": "Backend odbiera kod autoryzacyjny od Google i przygotowuje
się do wymiany go na token. Sprawdza także parametr 'state' jeśli był użyty,
aby zweryfikować integralność procesu.",
"depends_on": [
"TRIG_google_callback"
],
"outputs": [
"API_google_token"
],
"related_data": [
"auth_code"
],
"visibility": "internal",
"error_handling": "Jeśli brak kodu lub 'state' jest niezgodny, proces zostaje
przerwany (zwrot błędu uwierzytelniania)."
},
{
"id": "API_google_token",
"title": "Wymiana kodu OAuth na token dostępu (Google)",
"type": "api_call",
"description": "Backend wywołuje API Google (OAuth2 token endpoint),
przekazując kod autoryzacyjny oraz sekret klienta, aby otrzymać token dostępu
i id_token. Z odpowiedzi uzyskiwane są dane profilu użytkownika (np.
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
7zweryfikowany email, nazwa).",
"depends_on": [
"BL_handle_google_oauth"
],
"outputs": [
"COND_account_conflict"
],
"related_data": [
"access_token",
"id_token",
"google_profile"
],
"visibility": "internal",
"error_handling": "Jeśli wymiana kodu na token nie powiedzie się (np. kod
wygasł), proces rejestracji jest przerywany (logowany błąd, użytkownik
otrzymuje komunikat o nieudanej autoryzacji)."
},
{
"id": "COND_account_conflict",
"title": "Czy konto z danym emailem już istnieje?",
"type": "condition",
"description": "System sprawdza, czy w bazie istnieje już użytkownik o adresie
email uzyskanym z Google. Jeśli tak, oznacza to konflikt (np. konto założone
wcześniej tradycyjnie).",
"depends_on": [
"API_google_token"
],
"outputs": [
"UI_error_conflict",
"BL_create_google_user"
],
"related_data": [
"email"
],
"visibility": "internal",
"error_handling": ""
},
{
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
8"id": "UI_error_conflict",
"title": "Komunikat o konflikcie konta",
"type": "ui_component",
"description": "Jeśli adres email z Google jest już zarejestrowany w TipJar+,
użytkownik otrzymuje informację, że konto z tym email już istnieje (należy
zalogować się tradycyjnie lub użyć opcji 'zapomniałem hasła').",
"depends_on": [
"COND_account_conflict"
],
"outputs": [],
"related_data": [
"email"
],
"visibility": "public",
"error_handling": ""
},
{
"id": "BL_create_google_user",
"title": "Tworzenie konta użytkownika na podstawie Google",
"type": "backend_logic",
"description": "System tworzy nowe konto użytkownika w oparciu o dane z
Google (email, nazwa). Ponieważ Google potwierdził adres email, konto
uznawane jest za zweryfikowane. Jeśli rejestracja dotyczy twórcy, system
przypisuje rolę Twórca.",
"depends_on": [
"COND_account_conflict"
],
"outputs": [
"API_circle_create_wallet"
],
"related_data": [
"email",
"name",
"isCreator"
],
"visibility": "internal",
"error_handling": "Jeśli zapis do bazy danych nie powiedzie się (np. błąd bazy),
proces jest przerwany i zwracany jest błąd 500."
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
9},
{
"id": "API_circle_create_wallet",
"title": "Utworzenie portfela USDC (Circle API)",
"type": "api_call",
"description": "W ramach tworzenia konta Twórcy, backend wywołuje Circle
API (Digital Wallets) aby utworzyć dedykowany portfel USDC dla nowego
użytkownika. Otrzymany zostaje unikalny circleWalletId oraz adres portfela on-
chain.",
"depends_on": [
"BL_create_google_user"
],
"outputs": [
"DS_save_wallet_info"
],
"related_data": [
"circle_wallet_id",
"deposit_address"
],
"visibility": "internal",
"error_handling": "Jeśli API Circle zwróci błąd (np. przekroczono limit), portfel
nie zostanie utworzony, a rejestracja Twórcy zostanie częściowo wykonana
(wymagana interwencja admina, bo twórca nie ma przypisanego portfela)."
},
{
"id": "DS_save_wallet_info",
"title": "Zapis portfela w bazie danych",
"type": "data_store",
"description": "Po pomyślnym utworzeniu portfela Circle, identyfikator portfela i
adres są zapisywane w bazie (powiązane z kontem użytkownika). Dzięki temu
aplikacja wie, który portfel przypisany jest do danego Twórcy.",
"depends_on": [
"API_circle_create_wallet"
],
"outputs": [
"UI_creator_dashboard"
],
"related_data": [
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
10"user_id",
"circle_wallet_id",
"wallet_address"
],
"visibility": "internal",
"error_handling": "Jeśli zapis do bazy nie powiedzie się, konto zostanie
utworzone bez przypisanego portfela (co uniemożliwi odbieranie napiwków) –
wymagane będzie ponowienie operacji utworzenia portfela."
},
{
"id": "UI_creator_dashboard",
"title": "Dashboard Twórcy (po rejestracji)",
"type": "ui_component",
"description": "Nowo zarejestrowany Twórca zostaje przekierowany do
swojego panelu twórcy. Może tam uzupełnić profil (np. avatar, opis, cel
finansowy) oraz zobaczyć opcje zarządzania napiwkami.",
"depends_on": [
"DS_save_wallet_info"
],
"outputs": [],
"related_data": [
"creator_profile",
"wallet_balance"
],
"visibility": "public",
"error_handling": "Jeśli dane profilu nie ładują się poprawnie, wyświetlany jest
pusty dashboard lub komunikat o błędzie – Twórca może spróbować
odświeżyć stronę."
},
{
"id": "UA_twitch_oauth_start",
"title": "Rozpoczęcie rejestracji przez Twitch OAuth",
"type": "user_action",
"description": "Użytkownik klika 'Zaloguj przez Twitch'. Następuje
przekierowanie do strony logowania Twitch, aby uzyskać zgodę (OAuth).",
"depends_on": [],
"outputs": [
"API_twitch_auth"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
11],
"related_data": [
"Twitch_OAuth_request"
],
"visibility": "public",
"error_handling": "Jeśli nie uda się otworzyć okna logowania Twitch,
użytkownik powinien sprawdzić ustawienia przeglądarki (np. blokadę
wyskakujących okien)."
},
{
"id": "API_twitch_auth",
"title": "Przekierowanie do Twitch (OAuth)",
"type": "api_call",
"description": "Front-end przekierowuje użytkownika na stronę OAuth Twitch,
przekazując client_id aplikacji, scope i adres przekierowania. Użytkownik loguje
się i zatwierdza dostęp TipJar+ do danych profilu Twitch.",
"depends_on": [
"UA_twitch_oauth_start"
],
"outputs": [],
"related_data": [
"oauth_client_id",
"redirect_uri",
"scopes"
],
"visibility": "public",
"error_handling": "Jeśli integracja z Twitch jest niepoprawnie skonfigurowana
(np. błędny redirect URI), użytkownik zobaczy błąd autoryzacji na stronie
Twitch."
},
{
"id": "TRIG_twitch_callback",
"title": "Powrót z Twitch OAuth (callback)",
"type": "trigger",
"description": "Po pomyślnym zalogowaniu przez Twitch, przeglądarka wraca
na wskazany adres w aplikacji z kodem autoryzacyjnym Twitch. Backend
odbiera to żądanie na dedykowanym endpointzie.",
"depends_on": [],
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
12"outputs": [
"BL_handle_twitch_oauth"
],
"related_data": [
"auth_code",
"state"
],
"visibility": "internal",
"error_handling": "Jeśli Twitch zwrócił błąd (np. użytkownik odmówił dostępu),
proces zostaje przerwany i prezentowany jest odpowiedni komunikat."
},
{
"id": "BL_handle_twitch_oauth",
"title": "Obsługa odpowiedzi OAuth Twitch",
"type": "backend_logic",
"description": "Backend przyjmuje kod od Twitch i przygotowuje wymianę na
token dostępu. Sprawdza również poprawność parametru state (jeśli używany)
dla bezpieczeństwa procesu.",
"depends_on": [
"TRIG_twitch_callback"
],
"outputs": [
"API_twitch_token"
],
"related_data": [
"auth_code"
],
"visibility": "internal",
"error_handling": "Jeśli kod jest nieprawidłowy lub parametry się nie zgadzają,
zwracany jest błąd uwierzytelnienia i proces logowania Twitch zostaje
przerwany."
},
{
"id": "API_twitch_token",
"title": "Wymiana kodu na token (Twitch)",
"type": "api_call",
"description": "Backend wywołuje Twitch API (endpoint token) przekazując
kod, by uzyskać token dostępu i refresh token. Następnie może pobrać
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
13informacje o użytkowniku (np. nazwę, email) z Twitch API (endpoint user info).",
"depends_on": [
"BL_handle_twitch_oauth"
],
"outputs": [
"COND_twitch_account_conflict"
],
"related_data": [
"access_token",
"twitch_profile"
],
"visibility": "internal",
"error_handling": "Jeśli wymiana kodu na token nie powiedzie się (np. kod
wygasł), proces logowania Twitch kończy się niepowodzeniem (logowany błąd,
przekierowanie z informacją o błędzie)."
},
{
"id": "COND_twitch_account_conflict",
"title": "Czy użytkownik o danym email (Twitch) już istnieje?",
"type": "condition",
"description": "Po pobraniu danych z Twitch (w tym email, jeśli udostępniony),
system sprawdza czy istnieje już konto z tym adresem email. Jeśli tak, nie
tworzy nowego konta, bo użytkownik mógł zarejestrować się wcześniej inną
metodą.",
"depends_on": [
"API_twitch_token"
],
"outputs": [
"UI_error_conflict_twitch",
"BL_create_twitch_user"
],
"related_data": [
"email"
],
"visibility": "internal",
"error_handling": ""
},
{
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
14"id": "UI_error_conflict_twitch",
"title": "Komunikat - konto już istnieje (Twitch)",
"type": "ui_component",
"description": "Jeśli email z profilu Twitch jest już używany, użytkownik
otrzymuje informację o konflikcie konta (analogicznie do przypadku Google).
Proponowane jest użycie innej metody logowania.",
"depends_on": [
"COND_twitch_account_conflict"
],
"outputs": [],
"related_data": [
"email"
],
"visibility": "public",
"error_handling": ""
},
{
"id": "BL_create_twitch_user",
"title": "Tworzenie konta użytkownika (Twitch)",
"type": "backend_logic",
"description": "Tworzone jest nowe konto na podstawie danych Twitch (np.
nazwa użytkownika Twitch, email jeśli dostępny). Konto traktowane jest jako
zweryfikowane (Twitch potwierdza tożsamość). Jeśli użytkownik loguje się jako
twórca, przypisywana jest rola Twórcy.",
"depends_on": [
"COND_twitch_account_conflict"
],
"outputs": [
"API_circle_create_wallet_twitch"
],
"related_data": [
"email",
"display_name",
"isCreator"
],
"visibility": "internal",
"error_handling": "Jeśli zapis nowego użytkownika nie powiedzie się, zwracany
jest błąd serwera (rejestracja niekompletna)."
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
15},
{
"id": "API_circle_create_wallet_twitch",
"title": "Utworzenie portfela USDC (Circle) - Twitch",
"type": "api_call",
"description": "Analogicznie jak przy Google, dla nowego Twórcy utworzony
zostaje portfel Circle na USDC. System wywołuje API Circle (DCW) i otrzymuje
ID portfela oraz adres depozytowy.",
"depends_on": [
"BL_create_twitch_user"
],
"outputs": [
"DS_save_wallet_info_twitch"
],
"related_data": [
"circle_wallet_id",
"wallet_address"
],
"visibility": "internal",
"error_handling": "Jeśli utworzenie portfela się nie powiedzie, konto Twórcy
istnieje bez portfela (co wymaga naprawy przed umożliwieniem przyjmowania
napiwków)."
},
{
"id": "DS_save_wallet_info_twitch",
"title": "Zapis portfela (Twitch user) w bazie",
"type": "data_store",
"description": "Nowy portfel (ID i adres) zostaje zapisany w bazie i powiązany z
kontem użytkownika utworzonego przez logowanie Twitch. Twórca może już
korzystać z portfela do otrzymywania napiwków.",
"depends_on": [
"API_circle_create_wallet_twitch"
],
"outputs": [
"UI_creator_dashboard"
],
"related_data": [
"user_id",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
16"circle_wallet_id",
"wallet_address"
],
"visibility": "internal",
"error_handling": "Jeśli zapis danych portfela nie powiedzie się, konto Twórcy
nie ma przypisanego portfela. Należy spróbować ponownie utworzyć portfel
lub skontaktować się z supportem."
},
{
"id": "UA_siwe_start",
"title": "Logowanie Web3 - wybór Metamask (SIWE)",
"type": "user_action",
"description": "Użytkownik wybiera opcję 'Zaloguj portfelem Web3'. Aplikacja
inicjuje proces Sign-In with Ethereum (SIWE) wysyłając żądanie o nonce.",
"depends_on": [],
"outputs": [
"BL_generate_siwe_nonce"
],
"related_data": [
"wallet_address_request"
],
"visibility": "public",
"error_handling": "Jeśli brak połączenia z rozszerzeniem portfela (np.
MetaMask nie zainstalowany), wyświetlany jest komunikat o konieczności
instalacji portfela."
},
{
"id": "BL_generate_siwe_nonce",
"title": "Generowanie nonce dla SIWE",
"type": "backend_logic",
"description": "Backend generuje losowy ciąg znaków (nonce) potrzebny do
uwierzytelnienia SIWE i przechowuje go tymczasowo (np. w Redis lub pamięci)
powiązany z sesją zapytania. Nonce jest wysyłany do frontendu.",
"depends_on": [
"UA_siwe_start"
],
"outputs": [
"DS_store_nonce",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
17"UI_metamask_sign"
],
"related_data": [
"nonce",
"session_id"
],
"visibility": "internal",
"error_handling": "Jeśli generowanie nonce się nie powiedzie, logowanie Web3
nie może być kontynuowane (użytkownik otrzyma błąd)."
},
{
"id": "DS_store_nonce",
"title": "Przechowanie nonce SIWE",
"type": "data_store",
"description": "Wygenerowany nonce zostaje zapisany (np. w Redis) wraz z
identyfikatorem sesji lub adresu IP użytkownika. Posłuży to później do
weryfikacji podpisu.",
"depends_on": [
"BL_generate_siwe_nonce"
],
"outputs": [],
"related_data": [
"nonce"
],
"visibility": "internal",
"error_handling": "Jeśli system cache/DB jest niedostępny i nie można zapisać
nonce, proces uwierzytelniania zostaje przerwany."
},
{
"id": "UI_metamask_sign",
"title": "Wyświetlenie prośby podpisu (MetaMask)",
"type": "ui_component",
"description": "Frontend wyświetla modal lub komunikat z prośbą o podpisanie
wiadomości. Rozszerzenie portfela (np. MetaMask) otwiera okno podpisu
zawierające nonce i informacje o domenie (protokół SIWE).",
"depends_on": [
"BL_generate_siwe_nonce"
],
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
18"outputs": [
"UA_confirm_signature"
],
"related_data": [
"nonce_message"
],
"visibility": "public",
"error_handling": "Jeśli użytkownik anulował podpis w portfelu, proces
logowania zostaje przerwany."
},
{
"id": "UA_confirm_signature",
"title": "Podpisanie wiadomości w portfelu",
"type": "user_action",
"description": "Użytkownik akceptuje żądanie w swoim portfelu
kryptowalutowym, podpisując unikalną wiadomość (z nonce). Podpis
kryptograficzny jest następnie przesyłany do aplikacji.",
"depends_on": [
"UI_metamask_sign"
],
"outputs": [
"BL_verify_siwe_signature"
],
"related_data": [
"signature",
"wallet_address"
],
"visibility": "public",
"error_handling": "Jeśli użytkownik odmówi podpisania lub operacja wygaśnie,
logowanie nie dochodzi do skutku."
},
{
"id": "BL_verify_siwe_signature",
"title": "Weryfikacja podpisu SIWE",
"type": "backend_logic",
"description": "Backend otrzymuje podpis oraz adres portfela. Na podstawie
podpisu i wcześniej wygenerowanego nonce weryfikuje, czy podpis jest
prawidłowy i czy pochodzi od podanego adresu (odtwarzając adres publiczny z
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
19podpisu). Jeśli tak, oznacza to, że użytkownik jest właścicielem portfela.",
"depends_on": [
"UA_confirm_signature"
],
"outputs": [
"COND_user_by_wallet"
],
"related_data": [
"signature",
"nonce",
"wallet_address"
],
"visibility": "internal",
"error_handling": "Jeśli weryfikacja podpisu się nie powiedzie (np. podpis nie
pasuje do nonce lub został zmodyfikowany), zwracany jest błąd
uwierzytelnienia i logowanie zostaje odrzucone."
},
{
"id": "COND_user_by_wallet",
"title": "Czy w systemie istnieje użytkownik z tym adresem portfela?",
"type": "condition",
"description": "System sprawdza, czy adres portfela (Ethereum) jest już
powiązany z istniejącym kontem użytkownika. Jeśli tak, będzie to logowanie na
istniejące konto. Jeśli nie, tworzony jest nowy użytkownik oparty o adres (gołe
konto Web3).",
"depends_on": [
"BL_verify_siwe_signature"
],
"outputs": [
"BL_login_existing_wallet",
"BL_create_wallet_user"
],
"related_data": [
"wallet_address"
],
"visibility": "internal",
"error_handling": ""
},
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
20{
"id": "BL_login_existing_wallet",
"title": "Logowanie na istniejące konto Web3",
"type": "backend_logic",
"description": "Jeśli adres portfela odpowiada istniejącemu użytkownikowi
(wcześniej zarejestrowanemu przez SIWE), tworzony jest token JWT dla tego
użytkownika i aktualizowany jest ostatni czas logowania. Sesja użytkownika
zostaje rozpoczęta.",
"depends_on": [
"COND_user_by_wallet"
],
"outputs": [
"UI_user_dashboard"
],
"related_data": [
"user_id",
"JWT_token"
],
"visibility": "internal",
"error_handling": ""
},
{
"id": "BL_create_wallet_user",
"title": "Utworzenie nowego użytkownika Web3",
"type": "backend_logic",
"description": "Jeśli podany portfel nie był jeszcze zarejestrowany, system
tworzy nowe konto użytkownika powiązane z tym portfelem. Konto może nie
mieć emaila ani hasła - identyfikatorem jest adres publiczny. Generowany jest
JWT tak, aby użytkownik został zalogowany od razu.",
"depends_on": [
"COND_user_by_wallet"
],
"outputs": [
"UI_user_dashboard"
],
"related_data": [
"wallet_address",
"user_id",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
21"JWT_token"
],
"visibility": "internal",
"error_handling": "Jeśli zapis nowego użytkownika nie powiedzie się (np. błąd
bazy danych), logowanie Web3 zostaje przerwane (zwrot błędu)."
},
{
"id": "UA_tip_click",
"title": "Kliknięcie przycisku Tip (Wesprzyj)",
"type": "user_action",
"description": "Fan (użytkownik) na stronie publicznego profilu Twórcy klika
przycisk 'Wesprzyj' aby rozpocząć proces wysłania napiwku.",
"depends_on": [],
"outputs": [
"UI_tip_modal"
],
"related_data": [
"creator_id"
],
"visibility": "public",
"error_handling": ""
},
{
"id": "UI_tip_modal",
"title": "Formularz wysyłania napiwku",
"type": "ui_component",
"description": "Wyświetla się okno/modal z formularzem do wysłania napiwku.
Fan wybiera kwotę (USDC), opcjonalnie dodaje wiadomość dla Twórcy oraz
wybiera metodę płatności (np. portfel w TipJar, portfel zewnętrzny lub karta).",
"depends_on": [
"UA_tip_click"
],
"outputs": [
"UA_submit_tip"
],
"related_data": [
"amount_input",
"message_input",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
22"payment_method_selection"
],
"visibility": "public",
"error_handling": "Jeśli fan nie wprowadzi wymaganych danych (np. kwoty),
przycisk wysyłki pozostaje nieaktywny lub pojawia się komunikat o błędzie
walidacji."
},
{
"id": "UA_submit_tip",
"title": "Zatwierdzenie wysłania napiwku",
"type": "user_action",
"description": "Fan zatwierdza formularz napiwku. Aplikacja zbiera wybraną
kwotę, treść wiadomości i wybraną metodę płatności, po czym wysyła te dane
do backendu.",
"depends_on": [
"UI_tip_modal"
],
"outputs": [
"COND_tip_method"
],
"related_data": [
"amount",
"message",
"payment_method"
],
"visibility": "public",
"error_handling": "Jeśli np. kwota przekracza dozwolony limit, frontend może
wyświetlić odpowiedni komunikat przed wysłaniem żądania."
},
{
"id": "COND_tip_method",
"title": "Wybór metody płatności (wewnętrzna/crypto/karta)",
"type": "condition",
"description": "Backend sprawdza wybraną metodę płatności dla napiwku.
Jeśli fan jest zalogowany i wybrał portfel TipJar (wewnętrzny), płatność
odbędzie się wewnętrznie. Jeśli wybrano portfel zewnętrzny (crypto),
uruchomiony będzie przepływ on-chain. Jeśli wybrano kartę płatniczą,
transakcja przejdzie przez bramkę fiat.",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
23"depends_on": [
"UA_submit_tip"
],
"outputs": [
"BL_process_internal_tip",
"BL_process_external_tip",
"BL_process_card_tip"
],
"related_data": [
"payment_method"
],
"visibility": "internal",
"error_handling": ""
},
{
"id": "BL_process_internal_tip",
"title": "Przetworzenie napiwku wewnętrznego",
"type": "backend_logic",
"description": "Backend obsługuje transakcję napiwku w ramach platformy.
Sprawdza, czy fan jest uwierzytelniony i czy posiada wystarczające środki w
swoim portfelu TipJar (USDC). Następnie inicjuje wewnętrzny transfer środków
przez API Circle z portfela fana na portfel Twórcy.",
"depends_on": [
"COND_tip_method"
],
"outputs": [
"API_circle_internal_transfer"
],
"related_data": [
"fan_circle_wallet_id",
"creator_circle_wallet_id",
"amount"
],
"visibility": "internal",
"error_handling": "Jeśli użytkownik nie ma wystarczających środków w portfelu,
zwracany jest błąd (np. kod 402) informujący o braku środków i transakcja nie
jest wykonywana."
},
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
24{
"id": "API_circle_internal_transfer",
"title": "Circle API: Transfer wewnętrzny",
"type": "api_call",
"description": "Wykonanie transferu wewnątrz systemu Circle: wywoływane
jest API transferu, które natychmiast przenosi wskazaną kwotę USDC z portfela
fana na portfel Twórcy w obrębie konta TipJar. Operacja jest off-chain
(rozliczana w księgach Circle, bez opłat gas).",
"depends_on": [
"BL_process_internal_tip"
],
"outputs": [
"DS_log_tip_internal"
],
"related_data": [
"transfer_id",
"transaction_status"
],
"visibility": "internal",
"error_handling": "Jeśli transfer zwróci błąd (np. błąd API lub limit), transakcja
jest przerwana, a system zwraca błąd do użytkownika (np. komunikat o
nieudanej płatności)."
},
{
"id": "DS_log_tip_internal",
"title": "Zapis transakcji napiwku (wewnętrznej)",
"type": "data_store",
"description": "System zapisuje szczegóły napiwku w bazie danych:
identyfikator transakcji, nadawca (fan), odbiorca (twórca), kwotę, wiadomość i
znacznik czasu. Status ustawiany jest na 'completed', ponieważ transfer
wewnętrzny jest natychmiastowy.",
"depends_on": [
"API_circle_internal_transfer"
],
"outputs": [
"EV_tip_completed"
],
"related_data": [
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
25"tip_id",
"from_user_id",
"to_user_id",
"amount",
"message",
"status"
],
"visibility": "internal",
"error_handling": "Jeśli zapis do bazy danych się nie powiedzie, dane transakcji
mogą zostać utracone lub niespójne (należy zaimplementować mechanizm
retry lub transakcyjność)."
},
{
"id": "BL_process_external_tip",
"title": "Przygotowanie napiwku zewnętrznego (crypto)",
"type": "backend_logic",
"description": "Backend inicjuje transakcję napiwku od gościa lub
zewnętrznego portfela. Tworzy tymczasowy zapis transakcji i generuje adres
depozytowy USDC. Jeśli fan nie jest zalogowany, transakcja zostanie
powiązana z kontem gościa (np. anonimowo z samym adresem).",
"depends_on": [
"COND_tip_method"
],
"outputs": [
"API_circle_generate_address"
],
"related_data": [
"creator_circle_wallet_id",
"amount",
"message"
],
"visibility": "internal",
"error_handling": "Jeśli wygenerowanie adresu nie jest możliwe (błąd API
Circle), zwracany jest błąd i fan otrzymuje informację, by spróbować ponownie
później."
},
{
"id": "API_circle_generate_address",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
26"title": "Pobranie adresu depozytowego (Circle)",
"type": "api_call",
"description": "System korzysta z Circle API, aby wygenerować unikalny adres
depozytowy (USDC) przypisany do portfela Twórcy lub do tymczasowego
portfela dla tej transakcji. Adres ten posłuży fanowi do przesłania środków on-
chain.",
"depends_on": [
"BL_process_external_tip"
],
"outputs": [
"DS_log_tip_pending"
],
"related_data": [
"deposit_address"
],
"visibility": "internal",
"error_handling": "Jeśli API Circle zwróci błąd (np. brak dostępnych adresów
lub błąd sieci), proces zostaje przerwany a użytkownik otrzymuje informację o
nieosiągalności usługi."
},
{
"id": "DS_log_tip_pending",
"title": "Zapis oczekującej transakcji napiwku",
"type": "data_store",
"description": "W bazie danych tworzony jest wpis reprezentujący oczekujący
napiwek: zawiera docelowego Twórcę, kwotę, treść wiadomości oraz
powiązany adres depozytowy. Status transakcji ustawiany jest na 'pending' do
czasu otrzymania środków.",
"depends_on": [
"API_circle_generate_address"
],
"outputs": [
"UI_deposit_info"
],
"related_data": [
"tip_id",
"to_user_id",
"amount",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
27"message",
"deposit_address",
"status"
],
"visibility": "internal",
"error_handling": "Jeśli zapis się nie powiedzie, system może nie być w stanie
dopasować później przychodzącego depozytu do transakcji (możliwa utrata
informacji o napiwku)."
},
{
"id": "UI_deposit_info",
"title": "Prezentacja adresu do wpłaty USDC",
"type": "ui_component",
"description": "Front-end wyświetla fanowi adres portfela (oraz kod QR) do
dokonania wpłaty USDC. Fan jest poinformowany o kwocie do wysłania i że
napiwek zostanie zarejestrowany po otrzymaniu środków na ten adres.",
"depends_on": [
"DS_log_tip_pending"
],
"outputs": [
"UA_send_crypto"
],
"related_data": [
"deposit_address",
"QR_code"
],
"visibility": "public",
"error_handling": "Fan może skopiować adres lub zeskanować QR. Jeśli adres
nie zostanie użyty i transakcja nie nastąpi, wpis pozostanie w statusie
oczekującym przez pewien czas (system może go wyczyścić po określonym
czasie)."
},
{
"id": "UA_send_crypto",
"title": "Wysłanie USDC z portfela zewnętrznego",
"type": "user_action",
"description": "Fan wysyła ze swojego portfela kryptowalut (np. MetaMask)
określoną kwotę USDC na podany adres depozytowy. Ta operacja odbywa się
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
28poza aplikacją (bezpośrednio na blockchainie przez użytkownika).",
"depends_on": [
"UI_deposit_info"
],
"outputs": [
"TRIG_circle_webhook"
],
"related_data": [
"tx_hash",
"from_wallet_address"
],
"visibility": "public",
"error_handling": "Jeśli fan nie wyśle środków lub transakcja nie powiedzie się
na blockchainie, napiwek nie zostanie zrealizowany (po pewnym czasie wpis
może wygasnąć)."
},
{
"id": "TRIG_circle_webhook",
"title": "Webhook potwierdzenia wpłaty (Circle)",
"type": "trigger",
"description": "Circle wysyła webhook do TipJar+ informujący o wpłynięciu
środków na wskazany adres depozytowy. Event zawiera m.in. ID portfela
docelowego (Twórcy) oraz kwotę depozytu.",
"depends_on": [
"UA_send_crypto"
],
"outputs": [
"BL_handle_deposit"
],
"related_data": [
"event_id",
"wallet_id",
"amount"
],
"visibility": "internal",
"error_handling": "Jeśli webhook nie zostanie odebrany (np. błąd sieci), system
może nie odnotować wpłaty. Circle będzie ponawiać webhook kilkukrotnie;
ważne jest weryfikowanie podpisu webhooka dla bezpieczeństwa."
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
29},
{
"id": "BL_handle_deposit",
"title": "Obsługa zdarzenia wpłaty USDC",
"type": "backend_logic",
"description": "Backend weryfikuje otrzymany webhook (sprawdza
podpis/sekret od Circle) i następnie wyszukuje oczekujący napiwek
odpowiadający wpłacie (na podstawie adresu portfela lub ID transakcji). Status
tej transakcji zostaje zmieniony na 'completed', a czas otrzymania
odnotowany.",
"depends_on": [
"TRIG_circle_webhook"
],
"outputs": [
"DS_update_tip_completed"
],
"related_data": [
"tip_id",
"amount"
],
"visibility": "internal",
"error_handling": "Jeśli nie uda się dopasować wpłaty do istniejącej transakcji
(brak wpisu pending), system może utworzyć log ad-hoc lub pominąć
zdarzenie (to sytuacja błędna, powinna być monitorowana)."
},
{
"id": "DS_update_tip_completed",
"title": "Aktualizacja transakcji napiwku na zakończoną",
"type": "data_store",
"description": "Zapis oczekującego napiwku zostaje zaktualizowany: ustawiany
jest status 'completed', przypisywany jest identyfikator transakcji blockchain
(jeśli dostępny) oraz ewentualnie adres nadawcy napiwku (portfel fana, jeśli
uda się go ustalić z danych transakcji).",
"depends_on": [
"BL_handle_deposit"
],
"outputs": [
"EV_tip_completed"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
30],
"related_data": [
"tip_id",
"status"
],
"visibility": "internal",
"error_handling": "Jeśli aktualizacja rekordu w bazie się nie powiedzie, mimo
otrzymania środków transakcja może pozostać oznaczona jako oczekująca -
wymagane ręczne sprawdzenie lub ponowienie operacji."
},
{
"id": "BL_process_card_tip",
"title": "Przetworzenie napiwku kartą",
"type": "backend_logic",
"description": "Backend obsługuje płatność kartą. Sprawdza dane karty
przekazane z frontendu (token lub dane karty), kwotę i inicjuje transakcję
poprzez zewnętrzną bramkę płatniczą. Środki zostaną zamienione na USDC i
zdeponowane na portfelu Twórcy.",
"depends_on": [
"COND_tip_method"
],
"outputs": [
"API_circle_card_payment"
],
"related_data": [
"card_token",
"amount"
],
"visibility": "internal",
"error_handling": "Jeśli walidacja karty się nie powiedzie (np. nieważne dane),
zwracany jest błąd do użytkownika z prośbą o poprawienie danych
płatniczych."
},
{
"id": "API_circle_card_payment",
"title": "Circle Payments API: obciążenie karty",
"type": "api_call",
"description": "System wywołuje API płatności Circle lub innego operatora,
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
31przekazując zakodowane dane karty i kwotę. W przypadku sukcesu karta
użytkownika zostaje obciążona podaną kwotą w walucie fiat, a równowartość
w USDC trafia na portfel Twórcy (pomniejszona o prowizje).",
"depends_on": [
"BL_process_card_tip"
],
"outputs": [
"DS_log_tip_card"
],
"related_data": [
"payment_id",
"amount_usdc"
],
"visibility": "internal",
"error_handling": "Jeśli transakcja kartą zostanie odrzucona (np. brak środków
na karcie lub odmowa banku), system zwraca błąd do użytkownika z
informacją o nieudanej płatności."
},
{
"id": "DS_log_tip_card",
"title": "Zapis transakcji napiwku (karta)",
"type": "data_store",
"description": "System dodaje zapis napiwku opłaconego kartą do bazy
danych. Zawiera on dane podobne jak inne napiwki: kwota w USDC przekazana
Twórcy, dane fana (o ile jest dostępny, np. jako gość mógł podać imię), status
transakcji 'completed'.",
"depends_on": [
"API_circle_card_payment"
],
"outputs": [
"EV_tip_completed"
],
"related_data": [
"tip_id",
"from_user",
"to_user",
"amount",
"status"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
32],
"visibility": "internal",
"error_handling": "Jeśli zapis w bazie się nie powiedzie, transakcja może nie
być widoczna w historii Twórcy, mimo że doszła do skutku finansowo. Taką
sytuację należy wykryć i naprawić ręcznie (np. poprzez audyt)."
},
{
"id": "EV_tip_completed",
"title": "Napiwek zrealizowany (zdarzenie systemowe)",
"type": "system_event",
"description": "Zdarzenie oznaczające, że transakcja napiwku została
pomyślnie zakończona. Może pochodzić zarówno z natychmiastowego
transferu wewnętrznego, potwierdzenia webhooka depozytu crypto, jak i
finalizacji płatności kartą. Uruchamia akcje pokłosia transakcji.",
"depends_on": [
"DS_log_tip_internal"
],
"outputs": [],
"related_data": [
"tip_id",
"amount"
],
"visibility": "internal",
"error_handling": "",
"children": [
{
"id": "BL_send_notification",
"title": "Wygenerowanie powiadomienia o nowym napiwku",
"type": "backend_logic",
"description": "Na podstawie zakończonej transakcji system tworzy
powiadomienie dla Twórcy o otrzymaniu napiwku. Jeśli Twórca jest online,
powiadomienie może zostać wysłane w czasie rzeczywistym (np. przez
WebSocket), a także zapisane w bazie do późniejszego wyświetlenia.",
"depends_on": [],
"outputs": [
"DS_create_notification",
"AP_send_tip_email"
],
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
33"related_data": [
"to_user_id",
"tip_id",
"notification_content"
],
"visibility": "internal",
"error_handling": "Jeśli tworzenie powiadomienia się nie uda (np. błąd bazy),
informacja o napiwku może nie pojawić się w panelu Twórcy w
powiadomieniach (co wymaga sprawdzenia logów)."
},
{
"id": "DS_create_notification",
"title": "Zapis powiadomienia w bazie",
"type": "data_store",
"description": "Nowe powiadomienie (np. typ: 'nowy napiwek') zostaje
zapisane w tabeli powiadomień. Zawiera referencję do użytkownika Twórcy,
treść (np. kto wsparł i jaką kwotą) oraz znacznik czasu i stan
(nieprzeczytane).",
"depends_on": [
"BL_send_notification"
],
"outputs": [],
"related_data": [
"notification_id",
"user_id",
"content",
"read_flag"
],
"visibility": "internal",
"error_handling": "Błąd zapisu może spowodować, że powiadomienie nie
będzie dostępne po odświeżeniu strony, nawet jeśli zostało wysłane w realtime.
Problem powinien być zasygnalizowany w logach."
},
{
"id": "AP_send_tip_email",
"title": "Wysłanie maila z informacją o napiwku",
"type": "api_call",
"description": "System (np. poprzez moduł Mailer) wysyła Twórcy email z
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
34powiadomieniem, że otrzymał napiwek (zawiera kwotę i ewentualnie
wiadomość od fana). Takie powiadomienie email jest dodatkową formą alertu
poza samą aplikacją.",
"depends_on": [
"BL_send_notification"
],
"outputs": [],
"related_data": [
"creator_email",
"email_content"
],
"visibility": "internal",
"error_handling": "Jeśli wysyłka email nie powiedzie się (błąd SMTP), system
rejestruje ten fakt, ale nie pokazuje błędu użytkownikowi. Twórca otrzyma
powiadomienie tylko w aplikacji."
},
{
"id": "BL_mint_support_nft",
"title": "Wydanie NFT 'Proof of Support'",
"type": "backend_logic",
"description": "System generuje unikalny token NFT jako dowód wsparcia fana.
Dla zrealizowanego napiwku tworzone jest zlecenie wywołania smart kontraktu
NFT, który wybije (mint) pamiątkowy token (np. odznakę) dla fana,
potwierdzający jego wsparcie dla Twórcy.",
"depends_on": [],
"outputs": [
"API_mint_nft"
],
"related_data": [
"fan_wallet_address",
"nft_metadata"
],
"visibility": "internal",
"error_handling": "Jeśli mint NFT się nie powiedzie (np. błąd smart kontraktu
lub brak środków na opłacenie gasu przez Paymaster), transakcja wsparcia
pozostaje bez NFT. Błąd jest logowany, ale nie wpływa to na samą płatność."
},
{
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
35"id": "API_mint_nft",
"title": "Wywołanie kontraktu NFT (mint)",
"type": "api_call",
"description": "System wywołuje zewnętrzny kontrakt (np. poprzez Web3
provider lub SDK) przekazując adres portfela fana oraz meta-dane NFT (np.
nazwa odznaki, ID transakcji). Kontrakt zapisuje na blockchainie nowy token
NFT przypisany do portfela fana.",
"depends_on": [
"BL_mint_support_nft"
],
"outputs": [],
"related_data": [
"contract_address",
"token_id"
],
"visibility": "internal",
"error_handling": "Jeśli sieć blockchain jest niedostępna lub transakcja
mintowania nie zostanie potwierdzona, system może spróbować ponowić
operację lub zasygnalizować problem administratorowi."
}
]
},
{
"id": "UA_withdraw_click",
"title": "Kliknięcie przycisku 'Wypłać środki'",
"type": "user_action",
"description": "Twórca w swoim panelu przechodzi do sekcji wypłat i klika
przycisk aby zainicjować wypłatę środków ze swojego portfela TipJar.",
"depends_on": [],
"outputs": [
"UI_withdraw_options"
],
"related_data": [],
"visibility": "public",
"error_handling": ""
},
{
"id": "UI_withdraw_options",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
36"title": "Interfejs wyboru metody wypłaty",
"type": "ui_component",
"description": "Aplikacja wyświetla formularz wypłaty, gdzie Twórca widzi
dostępne opcje: wypłata krypto (na własny portfel) lub wypłata na konto
bankowe. Może być pokazany aktualny balans USDC do wypłaty.",
"depends_on": [
"UA_withdraw_click"
],
"outputs": [
"UA_choose_withdraw_method"
],
"related_data": [
"available_balance",
"withdraw_methods"
],
"visibility": "public",
"error_handling": "Jeśli dane o saldzie nie mogą zostać załadowane,
wyświetlany jest komunikat o błędzie lub pole salda jest wyszarzone."
},
{
"id": "UA_choose_withdraw_method",
"title": "Wybór metody wypłaty przez Twórcę",
"type": "user_action",
"description": "Twórca wybiera jedną z metod wypłaty (np. 'Na portfel
kryptowalut' lub 'Na konto bankowe'). Interfejs może przełączać odpowiednie
pola formularza (adres portfela lub dane bankowe).",
"depends_on": [
"UI_withdraw_options"
],
"outputs": [
"UI_crypto_withdraw_form",
"UI_bank_withdraw_form"
],
"related_data": [
"selected_method"
],
"visibility": "public",
"error_handling": ""
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
37},
{
"id": "UI_crypto_withdraw_form",
"title": "Formularz wypłaty na portfel crypto",
"type": "ui_component",
"description": "Jeśli Twórca wybrał wypłatę krypto, wyświetlany jest formularz
do podania adresu zewnętrznego portfela (np. adres Ethereum) i kwoty
wypłaty. Może też pojawić się informacja o ewentualnej opłacie za gas
sponsorowanej przez platformę.",
"depends_on": [
"UA_choose_withdraw_method"
],
"outputs": [
"UA_submit_withdraw_crypto"
],
"related_data": [
"withdraw_amount",
"destination_address"
],
"visibility": "public",
"error_handling": "Jeśli adres jest nieprawidłowy (np. zły format), system może
zablokować możliwość zatwierdzenia i wyświetlić błąd walidacji."
},
{
"id": "UI_bank_withdraw_form",
"title": "Formularz wypłaty na konto bankowe",
"type": "ui_component",
"description": "Jeśli wybrano wypłatę fiat, Twórca podaje dane rachunku
bankowego (np. numer IBAN, SWIFT, dane odbiorcy) oraz kwotę. Jeśli
wcześniej dodał rachunek, może wybrać z zapisanych. Może być informacja o
przewidywanym czasie realizacji (np. 1-2 dni).",
"depends_on": [
"UA_choose_withdraw_method"
],
"outputs": [
"UA_submit_withdraw_bank"
],
"related_data": [
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
38"withdraw_amount",
"bank_account_details"
],
"visibility": "public",
"error_handling": "Walidacja formularza sprawdza format numeru konta itp.
Błędne dane są sygnalizowane użytkownikowi przed wysłaniem."
},
{
"id": "UA_submit_withdraw_crypto",
"title": "Zatwierdzenie wypłaty krypto",
"type": "user_action",
"description": "Twórca potwierdza wypłatę na wskazany adres portfela.
Aplikacja przesyła żądanie wypłaty (kwota + adres) do backendu.",
"depends_on": [
"UI_crypto_withdraw_form"
],
"outputs": [
"BL_process_withdraw_crypto"
],
"related_data": [
"amount",
"destination_address"
],
"visibility": "public",
"error_handling": "Jeśli kwota przekracza dostępne saldo, formularz wyświetli
błąd i nie pozwoli kontynuować."
},
{
"id": "UA_submit_withdraw_bank",
"title": "Zatwierdzenie wypłaty na konto bankowe",
"type": "user_action",
"description": "Twórca potwierdza żądanie wypłaty na konto bankowe (po
wypełnieniu formularza). Dane wypłaty są przesyłane do backendu (kwota +
dane bankowe).",
"depends_on": [
"UI_bank_withdraw_form"
],
"outputs": [
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
39"BL_process_withdraw_bank"
],
"related_data": [
"amount",
"bank_account_details"
],
"visibility": "public",
"error_handling": "Jeśli dane bankowe nie przejdą weryfikacji (np. błędny
IBAN), wyświetlany jest stosowny komunikat i wypłata nie jest inicjowana."
},
{
"id": "BL_process_withdraw_crypto",
"title": "Przetwarzanie wypłaty na portfel zewnętrzny",
"type": "backend_logic",
"description": "Backend weryfikuje żądanie wypłaty krypto: sprawdza czy
Twórca ma wystarczający balans USDC w swoim portfelu Circle. Następnie
wywołuje API Circle, aby zainicjować transfer on-chain pod wskazany adres
(np. transakcja USDC na Ethereum). Platforma korzysta z mechanizmu Gas
Station, aby pokryć opłatę transakcyjną za Twórcę.",
"depends_on": [
"UA_submit_withdraw_crypto"
],
"outputs": [
"API_circle_transfer_external"
],
"related_data": [
"creator_circle_wallet_id",
"dest_address",
"amount"
],
"visibility": "internal",
"error_handling": "Jeśli saldo Twórcy jest niewystarczające lub adres docelowy
jest błędny, backend zwraca błąd (wypłata nie zostaje zainicjowana)."
},
{
"id": "API_circle_transfer_external",
"title": "Circle API: Wypłata on-chain",
"type": "api_call",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
40"description": "System wywołuje Circle API w celu transferu środków z portfela
Twórcy na podany zewnętrzny adres blockchain. Circle tworzy transakcję on-
chain (np. transfer USDC na Ethereum) i zwraca ID transakcji lub status inicjacji.
Platforma TipJar może otrzymać webhook potwierdzający wykonanie
transakcji, gdy zostanie ona zapisana w blockchainie.",
"depends_on": [
"BL_process_withdraw_crypto"
],
"outputs": [
"TRIG_transfer_confirmed"
],
"related_data": [
"transaction_hash",
"network_fee"
],
"visibility": "internal",
"error_handling": "Jeśli API zwróci błąd (np. niepoprawny adres, błąd sieci),
wypłata zostaje przerwana a użytkownik otrzymuje informację o
niepowodzeniu wypłaty."
},
{
"id": "TRIG_transfer_confirmed",
"title": "Webhook potwierdzenia transferu on-chain",
"type": "trigger",
"description": "Po wykonaniu transakcji on-chain (wypłaty krypto) Circle
przesyła webhook potwierdzający pomyślne przelanie środków (lub informację
o ewentualnym błędzie). Odbierany jest status finalny transakcji
(success/failed) i ewentualny hash transakcji.",
"depends_on": [
"API_circle_transfer_external"
],
"outputs": [
"BL_confirm_crypto_withdraw"
],
"related_data": [
"transaction_hash",
"status"
],
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
41"visibility": "internal",
"error_handling": "Jeśli webhook nie dotrze, system może nie zaktualizować
stanu wypłaty automatycznie. Wypłata pozostanie w stanie 'pending' do czasu
manualnej weryfikacji."
},
{
"id": "BL_confirm_crypto_withdraw",
"title": "Finalizacja wypłaty krypto",
"type": "backend_logic",
"description": "Backend aktualizuje stan wypłaty krypto po otrzymaniu
potwierdzenia. Zapis w bazie oznacza wypłatę jako ukończoną, zmniejszany
jest dostępny balans Twórcy w systemie (jeśli jest przechowywany). Informacja
o zakończeniu wypłaty jest gotowa do przekazania użytkownikowi.",
"depends_on": [
"TRIG_transfer_confirmed"
],
"outputs": [
"EV_withdraw_completed"
],
"related_data": [
"withdraw_id",
"status"
],
"visibility": "internal",
"error_handling": "Jeśli aktualizacja stanu wypłaty nie powiedzie się (błąd
bazy), może wystąpić niespójność - środki wyszły, ale system może nadal
pokazywać je na saldzie. Taką sytuację trzeba naprawić ręcznie."
},
{
"id": "BL_process_withdraw_bank",
"title": "Przetwarzanie wypłaty na konto bankowe",
"type": "backend_logic",
"description": "Backend weryfikuje żądanie wypłaty fiat: sprawdza czy Twórca
przeszedł wymagane KYC (jeśli wymagane) oraz czy saldo USDC jest
wystarczające. Następnie wywołuje API Circle (Payments/Payouts) w celu
przeliczenia USDC na fiat i przelania na wskazane konto bankowe Twórcy.",
"depends_on": [
"UA_submit_withdraw_bank"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
42],
"outputs": [
"API_circle_payout"
],
"related_data": [
"creator_circle_wallet_id",
"bank_account",
"amount"
],
"visibility": "internal",
"error_handling": "Jeśli użytkownik nie spełnia wymogów (np. brak KYC) lub
dane bankowe są nieprawidłowe, backend zwraca błąd i wypłata nie jest
inicjowana."
},
{
"id": "API_circle_payout",
"title": "Circle API: Zlecenie wypłaty na konto bankowe",
"type": "api_call",
"description": "System przekazuje do Circle dane wypłaty bankowej: kwotę,
walutę docelową, dane odbiorcy. Circle inicjuje transakcję fiat (np. przelew
ACH/SEPA) na wskazany rachunek. Zwracany jest status zlecenia (np.
'pending' lub natychmiast 'complete' w sandboxie) i identyfikator payout.",
"depends_on": [
"BL_process_withdraw_bank"
],
"outputs": [
"TRIG_payout_confirmed"
],
"related_data": [
"payout_id",
"status"
],
"visibility": "internal",
"error_handling": "Jeśli API odrzuci wypłatę (np. błąd danych bankowych, limit
dzienny), zwracany jest komunikat o błędzie do użytkownika (wypłata nie
została zlecona)."
},
{
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
43"id": "TRIG_payout_confirmed",
"title": "Webhook potwierdzenia wypłaty fiat",
"type": "trigger",
"description": "Circle powiadamia webhookiem o finalizacji wypłaty na konto
bankowe (lub zmianie jej statusu, np. z 'pending' na 'complete'). System
odbiera te informacje, aby wiedzieć że środki zostały przekazane Twórcy poza
platformą.",
"depends_on": [
"API_circle_payout"
],
"outputs": [
"BL_confirm_bank_withdraw"
],
"related_data": [
"payout_id",
"status"
],
"visibility": "internal",
"error_handling": "Jeśli webhook nie dotrze, wypłata może pozostać w statusie
'pending' w systemie. W takim przypadku wymagane jest ręczne sprawdzenie
statusu w panelu Circle i aktualizacja bazy."
},
{
"id": "BL_confirm_bank_withdraw",
"title": "Finalizacja wypłaty bankowej",
"type": "backend_logic",
"description": "Po otrzymaniu potwierdzenia wypłaty fiat backend aktualizuje
status wypłaty w bazie na 'completed'. Środki USDC odpowiadające wypłacie
są odnotowane jako zrealizowane (zbalansowane poprzez wymianę na fiat).
Twórca został skutecznie wypłacony.",
"depends_on": [
"TRIG_payout_confirmed"
],
"outputs": [
"EV_withdraw_completed"
],
"related_data": [
"withdraw_id",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
44"status"
],
"visibility": "internal",
"error_handling": "Jeśli zapis w bazie się nie uda, wypłata może pozostać
oznaczona jako nieukończona pomimo realizacji. Konieczne jest sprawdzenie i
ewentualna korekta zapisu."
},
{
"id": "EV_withdraw_completed",
"title": "Wypłata zrealizowana (zdarzenie systemowe)",
"type": "system_event",
"description": "Zdarzenie informujące, że proces wypłaty Twórcy został
zakończony. Dotyczy to zarówno wypłat krypto (gdy transakcja on-chain jest
potwierdzona) jak i fiat (gdy przelew bankowy został wykonany).",
"depends_on": [
"BL_confirm_crypto_withdraw"
],
"outputs": [],
"related_data": [
"withdraw_id",
"amount"
],
"visibility": "internal",
"error_handling": "",
"children": [
{
"id": "BL_notify_withdraw",
"title": "Powiadomienie o ukończeniu wypłaty",
"type": "backend_logic",
"description": "Po ukończeniu wypłaty system generuje powiadomienie (oraz
ewentualny email) dla Twórcy, że jego wypłata została zrealizowana. Twórca
może zobaczyć w panelu historię wypłat z odpowiednim statusem.",
"depends_on": [],
"outputs": [
"AP_withdraw_email"
],
"related_data": [
"user_id",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
45"withdraw_id"
],
"visibility": "internal",
"error_handling": "Błąd przy generowaniu powiadomienia email nie wpływa na
stan wypłaty, ale Twórca może nie otrzymać potwierdzenia mailowego."
},
{
"id": "AP_withdraw_email",
"title": "Wysłanie email potwierdzającego wypłatę",
"type": "api_call",
"description": "System wysyła wiadomość email do Twórcy potwierdzającą
zrealizowanie wypłaty (np. 'Twoja wypłata X USDC została zrealizowana').
Zawiera sumę wypłaty i datę.",
"depends_on": [
"BL_notify_withdraw"
],
"outputs": [],
"related_data": [
"creator_email",
"email_content"
],
"visibility": "internal",
"error_handling": "Jeśli wysyłka email się nie powiedzie, Twórca wciąż może
sprawdzić status wypłaty w aplikacji, ale nie dostanie potwierdzenia drogą
mailową."
}
]
},
{
"id": "UI_admin_dashboard",
"title": "Panel administratora",
"type": "ui_component",
"description": "Specjalny interfejs dostępny tylko dla administratorów. Pozwala
przeglądać statystyki platformy (liczba transakcji, użytkowników) oraz
wykonywać akcje zarządcze (np. blokowanie użytkowników, zmiana ustawień
prowizji).",
"depends_on": [],
"outputs": [
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
46"UA_admin_ban_user"
],
"related_data": [
"platform_stats",
"admin_controls"
],
"visibility": "admin_only",
"error_handling": "Jeśli niezalogowany użytkownik spróbuje uzyskać dostęp,
zostanie przekierowany do strony głównej (brak dostępu)."
},
{
"id": "UA_admin_ban_user",
"title": "Akcja admina: zablokowanie użytkownika",
"type": "user_action",
"description": "Administrator wybiera z listy użytkownika i inicjuje akcję ban
(blokady konta). W panelu admina potwierdza chęć zablokowania danego
użytkownika.",
"depends_on": [
"UI_admin_dashboard"
],
"outputs": [
"BL_ban_user"
],
"related_data": [
"target_user_id"
],
"visibility": "admin_only",
"error_handling": ""
},
{
"id": "BL_ban_user",
"title": "Zablokowanie (ban) użytkownika",
"type": "backend_logic",
"description": "Backend oznacza konto wybranego użytkownika jako
zablokowane (np. ustawia flagę 'banned' w bazie). Od tego momentu
użytkownik nie będzie mógł się logować ani korzystać z usług platformy.",
"depends_on": [
"UA_admin_ban_user"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
47],
"outputs": [
"DS_update_user_status",
"EV_user_banned"
],
"related_data": [
"target_user_id"
],
"visibility": "admin_only",
"error_handling": "Jeśli wystąpi błąd podczas aktualizacji (np. baza danych),
blokada może nie zostać zapisana - wymagane ponowienie akcji."
},
{
"id": "DS_update_user_status",
"title": "Aktualizacja statusu użytkownika (ban)",
"type": "data_store",
"description": "W bazie danych pole statusu/aktywności użytkownika zostaje
zaktualizowane (np. banned=true). Wszystkie aktywne sesje tego użytkownika
powinny zostać unieważnione.",
"depends_on": [
"BL_ban_user"
],
"outputs": [],
"related_data": [
"target_user_id",
"banned_flag"
],
"visibility": "admin_only",
"error_handling": "Jeśli aktualizacja bazy nie powiedzie się, stan konta
użytkownika pozostanie niezmieniony. Administrator powinien otrzymać
informację o błędzie i spróbować ponownie."
},
{
"id": "EV_user_banned",
"title": "Użytkownik zablokowany (zdarzenie)",
"type": "system_event",
"description": "Zdarzenie generowane po zbanowaniu użytkownika. Może
posłużyć do wykonania dodatkowych czynności, np. wysłania powiadomienia
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
48email do zablokowanego użytkownika lub wymuszenia wylogowania
aktywnych sesji.",
"depends_on": [
"BL_ban_user"
],
"outputs": [
"AP_send_ban_email"
],
"related_data": [
"target_user_id"
],
"visibility": "admin_only",
"error_handling": ""
},
{
"id": "AP_send_ban_email",
"title": "Wysłanie email o blokadzie konta",
"type": "api_call",
"description": "System wysyła zablokowanemu użytkownikowi wiadomość e-
mail informującą o blokadzie konta, wraz z ewentualnym powodem i
instrukcjami kontaktu z supportem. Jest to powiadomienie informacyjne.",
"depends_on": [
"EV_user_banned"
],
"outputs": [],
"related_data": [
"user_email",
"email_content"
],
"visibility": "internal",
"error_handling": "Błąd wysyłki email nie wpływa na samą blokadę konta -
użytkownik jednak może nie zostać poinformowany tą drogą."
},
{
"id": "UA_buy_membership",
"title": "Zakup subskrypcji (NFT Membership)",
"type": "user_action",
"description": "Fan inicjuje zakup subskrypcji u Twórcy (np. ekskluzywnego
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
49członkostwa). Klika przycisk 'Subskrybuj' na profilu Twórcy oferującego NFT
Membership.",
"depends_on": [],
"outputs": [
"BL_process_membership"
],
"related_data": [
"creator_id",
"membership_tier"
],
"visibility": "public",
"error_handling": "Jeśli użytkownik nie jest zalogowany, zostanie poproszony o
zalogowanie przed zakupem subskrypcji."
},
{
"id": "BL_process_membership",
"title": "Przetwarzanie zakupu subskrypcji NFT",
"type": "backend_logic",
"description": "Backend obsługuje zakup subskrypcji. W zależności od
implementacji, może pobrać płatność (np. jednorazowy koszt subskrypcji) i
wywołać mechanizm wydania NFT potwierdzającego członkostwo. Jeśli fan
jest zalogowany portfelem Web3, użyty zostanie jego adres do NFT.",
"depends_on": [
"UA_buy_membership"
],
"outputs": [
"API_charge_subscription"
],
"related_data": [
"user_id",
"creator_id",
"subscription_plan"
],
"visibility": "internal",
"error_handling": "Jeśli użytkownik nie ma środków lub płatność się nie
powiedzie, subskrypcja nie zostanie aktywowana (użytkownik dostanie
stosowny komunikat)."
},
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
50{
"id": "API_charge_subscription",
"title": "Pobranie opłaty za subskrypcję",
"type": "api_call",
"description": "System pobiera opłatę za subskrypcję. Może to być
wewnętrzny transfer USDC (jeśli fan ma środki w portfelu TipJar) lub płatność
kartą poprzez integrację z bramką płatniczą. Kwota subskrypcji jest
przekazywana na portfel Twórcy.",
"depends_on": [
"BL_process_membership"
],
"outputs": [
"API_mint_membership_nft"
],
"related_data": [
"amount",
"payment_method"
],
"visibility": "internal",
"error_handling": "Jeśli płatność nie powiedzie się (np. karta odrzucona),
proces zostaje przerwany i subskrypcja nie jest tworzona."
},
{
"id": "API_mint_membership_nft",
"title": "Wybicie NFT członkowskiego",
"type": "api_call",
"description": "Po opłaceniu subskrypcji, system wywołuje smart kontrakt aby
wybić NFT członkowskie dla fana. NFT może zawierać informację o poziomie
subskrypcji i powiązaniu z Twórcą. Jest ono przekazywane (mint) na adres
portfela fana.",
"depends_on": [
"API_charge_subscription"
],
"outputs": [
"DS_record_subscription"
],
"related_data": [
"fan_wallet_address",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
51"nft_token_id"
],
"visibility": "internal",
"error_handling": "Jeśli transakcja na blockchainie nie powiedzie się,
subskrypcja może zostać odnotowana bez przyznania NFT (wymagana
interwencja lub ponowienie próby)."
},
{
"id": "DS_record_subscription",
"title": "Zapis aktywnej subskrypcji",
"type": "data_store",
"description": "W bazie danych zapisywana jest nowa subskrypcja: fan X
subskrybuje Twórcę Y od bieżącej daty. Jeśli subskrypcje są cykliczne, zapis
zawiera termin kolejnej płatności lub informacje o ważności NFT. Użytkownik
otrzymuje dostęp do ekskluzywnych treści Twórcy.",
"depends_on": [
"API_mint_membership_nft"
],
"outputs": [],
"related_data": [
"subscriber_id",
"creator_id",
"start_date",
"membership_nft_id"
],
"visibility": "internal",
"error_handling": "Jeśli zapis nie powiedzie się, może dojść do sytuacji, w
której NFT zostało wydane, a system nie widzi subskrypcji - należy to wykryć i
skorygować ręcznie."
},
{
"id": "UA_voice_command",
"title": "Komenda głosowa twórcy (AI Assistant)",
"type": "user_action",
"description": "Twórca korzysta z asystenta głosowego w panelu. Wciska
przycisk mikrofonu i wypowiada komendę (np. 'ustaw cel zbiórki na 500 USDC'
lub 'pokaż ostatnie napiwki').",
"depends_on": [],
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
52"outputs": [
"BL_voice_capture"
],
"related_data": [
"voice_audio_stream"
],
"visibility": "public",
"error_handling": "Jeśli przeglądarka nie ma dostępu do mikrofonu, asystent
głosowy nie może zostać użyty (aplikacja poprosi o uprawnienia do
mikrofonu)."
},
{
"id": "BL_voice_capture",
"title": "Przechwycenie i interpretacja komendy głosowej",
"type": "backend_logic",
"description": "Aplikacja nagrywa wypowiedź i przesyła ją do modułu
rozpoznawania mowy. System następnie interpretuje wynik (tekst) za pomocą
algorytmów NLP/AI, by zidentyfikować zamiar twórcy (intencję). Np.
rozpoznaje polecenie zmiany ustawień celu finansowego.",
"depends_on": [
"UA_voice_command"
],
"outputs": [
"API_speech_to_text"
],
"related_data": [
"audio_data"
],
"visibility": "internal",
"error_handling": "Jeśli rozpoznawanie mowy się nie uda (np. słaba jakość
audio), system może poprosić o powtórzenie komendy lub przejść w tryb
oczekiwania na kolejną próbę."
},
{
"id": "API_speech_to_text",
"title": "Rozpoznanie mowy (Speech-to-Text)",
"type": "api_call",
"description": "Nagranie audio zostaje wysłane do usługi rozpoznawania mowy
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
53(np. Google Speech API lub własnego modelu) w celu przetworzenia na tekst.
Otrzymany tekst komendy jest następnie wykorzystywany do analizy
polecenia.",
"depends_on": [
"BL_voice_capture"
],
"outputs": [
"API_nlp_command"
],
"related_data": [
"transcribed_text"
],
"visibility": "internal",
"error_handling": "Jeśli zewnętrzna usługa STT jest niedostępna lub zwróci
błąd, asystent głosowy informuje twórcę o problemie z rozpoznaniem mowy."
},
{
"id": "API_nlp_command",
"title": "Analiza NLP komendy",
"type": "api_call",
"description": "System przekazuje rozpoznany tekst do modelu NLP/AI (np.
moduł ChatGPT) w celu zinterpretowania polecenia. AI określa, jaką akcję
należy wykonać (np. 'set_goal' z wartością 500 USDC). Wynik analizy zwraca
strukturę polecenia do wykonania.",
"depends_on": [
"API_speech_to_text"
],
"outputs": [
"BL_execute_command"
],
"related_data": [
"intent",
"parameters"
],
"visibility": "internal",
"error_handling": "Jeśli AI nie zrozumie polecenia lub jest niejednoznaczne,
asystent może poprosić o doprecyzowanie (np. zadając pytanie pomocnicze)."
},
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
54{
"id": "BL_execute_command",
"title": "Wykonanie polecenia twórcy",
"type": "backend_logic",
"description": "Na podstawie zinterpretowanej komendy, system wykonuje
odpowiednią akcję. Np. jeśli intencją jest ustawienie nowego celu, aktualizuje
cel finansowy Twórcy w bazie; jeśli polecenie dotyczyło odczytu wiadomości,
może przygotować odpowiedź głosową.",
"depends_on": [
"API_nlp_command"
],
"outputs": [
"DS_update_creator_data",
"UI_voice_response"
],
"related_data": [
"action_type",
"parameters"
],
"visibility": "internal",
"error_handling": "Jeśli wykonanie polecenia nie jest możliwe (np. błąd bazy
przy aktualizacji celu), system informuje twórcę o błędzie werbalnie lub
tekstowo."
},
{
"id": "DS_update_creator_data",
"title": "Aktualizacja danych (np. celu) twórcy",
"type": "data_store",
"description": "Jeśli polecenie dotyczyło zmiany danych (np. celu zbiórki,
statusu), system zapisuje zmiany w bazie danych. Np. nowy cel finansowy
Twórcy zostaje ustawiony na określoną kwotę USDC.",
"depends_on": [
"BL_execute_command"
],
"outputs": [],
"related_data": [
"creator_id",
"new_goal_amount"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
55],
"visibility": "internal",
"error_handling": "Błąd zapisu do bazy spowoduje, że zmiana nie zostanie
zastosowana - asystent powinien poinformować o tym Twórcę."
},
{
"id": "UI_voice_response",
"title": "Odpowiedź asystenta (tekst/ dźwięk)",
"type": "ui_component",
"description": "Po wykonaniu polecenia asystent przekazuje Twórcy informację
zwrotną. Może to być komunikat tekstowy w interfejsie lub wygenerowana
odpowiedź głosowa (Text-to-Speech) potwierdzająca wykonanie akcji, np. 'Cel
ustawiony na 500 USDC'.",
"depends_on": [
"BL_execute_command"
],
"outputs": [],
"related_data": [
"response_message",
"audio_output"
],
"visibility": "public",
"error_handling": "Jeśli generowanie odpowiedzi głosowej się nie uda, asystent
wyświetli jedynie tekstową informację zwrotną."
},
{
"id": "UI_dao_portal",
"title": "Portal DAO (głosowanie społeczności)",
"type": "ui_component",
"description": "Specjalna sekcja/platforma DAO TipJar+ dostępna dla
uprawnionych użytkowników (np. posiadaczy tokenów governance). Wyświetla
listę propozycji (np. zmiana prowizji platformy) wraz z opcjami głosowania.",
"depends_on": [],
"outputs": [
"UA_vote_on_proposal"
],
"related_data": [
"proposal_list"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
56],
"visibility": "public",
"error_handling": "Jeśli użytkownik nie ma uprawnień (brak tokenów), portal
DAO może być dla niego tylko do odczytu lub niedostępny."
},
{
"id": "UA_vote_on_proposal",
"title": "Oddanie głosu na propozycję DAO",
"type": "user_action",
"description": "Użytkownik (np. inwestor lub aktywny członek społeczności)
wybiera konkretną propozycję i oddaje głos (za/przeciw). Potwierdza swój
wybór na interfejsie DAO.",
"depends_on": [
"UI_dao_portal"
],
"outputs": [
"BL_record_vote"
],
"related_data": [
"proposal_id",
"vote_choice"
],
"visibility": "public",
"error_handling": "Jeśli użytkownik nie posiada wymaganych tokenów do
głosowania lub głosowanie jest zamknięte, akcja nie jest możliwa (frontend
wyświetli odpowiedni komunikat)."
},
{
"id": "BL_record_vote",
"title": "Zarejestrowanie głosu w systemie",
"type": "backend_logic",
"description": "Backend rejestruje oddany głos: może bezpośrednio
interakcjonować ze smart kontraktem DAO na blockchainie (jeśli governance
jest on-chain) lub zapisać głos off-chain (np. w bazie czy poprzez Snapshot
API). Dane głosu obejmują ID propozycji, decyzję i adres głosującego.",
"depends_on": [
"UA_vote_on_proposal"
],
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
57"outputs": [
"API_cast_vote"
],
"related_data": [
"proposal_id",
"voter_address",
"vote_choice"
],
"visibility": "internal",
"error_handling": "Jeśli rejestracja głosu się nie powiedzie (np. błąd transakcji
blockchain), użytkownik otrzyma informację o nieudanym głosowaniu i może
spróbować ponownie."
},
{
"id": "API_cast_vote",
"title": "Oddanie głosu (blockchain/Snapshot)",
"type": "api_call",
"description": "System przekazuje głos do systemu governance. Jeśli używany
jest smart kontrakt DAO, wykonywana jest transakcja na blockchainie
rejestrująca głos. Jeśli głosowanie odbywa się off-chain (np. Snapshot),
wysyłane jest odpowiednie żądanie API do zarejestrowania głosu off-chain,
podpisane portfelem użytkownika.",
"depends_on": [
"BL_record_vote"
],
"outputs": [
"DS_vote_registered"
],
"related_data": [
"transaction_hash",
"snapshot_vote_id"
],
"visibility": "internal",
"error_handling": "Jeśli transakcja głosowania zostanie odrzucona (np. z
powodu braku środków na gas lub błędu podpisu), głos nie zostanie policzony.
System informuje użytkownika o problemie."
},
{
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
58"id": "DS_vote_registered",
"title": "Zapis wyniku głosowania",
"type": "data_store",
"description": "System (opcjonalnie) zapisuje lokalnie informację o oddanym
głosie lub aktualizuje stan propozycji (np. zwiększa licznik głosów za/przeciw).
Pozwala to wyświetlić użytkownikowi zaktualizowany wynik głosowania bez
czekania na końcowe podliczenie.",
"depends_on": [
"API_cast_vote"
],
"outputs": [],
"related_data": [
"proposal_id",
"votes_for",
"votes_against"
],
"visibility": "internal",
"error_handling": "Błąd zapisu lokalnego nie wpływa na samo głosowanie (to
zostało zarejestrowane w systemie DAO), ale może spowodować nieaktualne
wyświetlanie wyników do czasu odświeżenia z oficjalnego źródła."
},
{
"id": "UA_publish_fan_wall",
"title": "Publikacja 'Wiecznej Ściany Fanów'",
"type": "user_action",
"description": "Twórca inicjuje publikację swojej listy top fanów w sposób
permanentny. Klikając opcję 'Opublikuj Fan Wall na zawsze', rozpoczyna
proces zapisu listy fanów na niezmiennym blockchainie (np. Arweave).",
"depends_on": [],
"outputs": [
"BL_prepare_fan_data"
],
"related_data": [],
"visibility": "public",
"error_handling": ""
},
{
"id": "BL_prepare_fan_data",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
59"title": "Przygotowanie danych top fanów",
"type": "backend_logic",
"description": "Backend zbiera aktualne dane top fanów Twórcy (np. listę
najlepszych donatorów, kwoty wsparcia). Dane te są formatowane w
plik/strukturę (np. JSON lub HTML) gotową do zapisania w zdecentralizowanej
sieci przechowywania.",
"depends_on": [
"UA_publish_fan_wall"
],
"outputs": [
"API_arweave_upload"
],
"related_data": [
"top_fans_list"
],
"visibility": "internal",
"error_handling": "Jeśli nie uda się pobrać danych fanów (np. błąd bazy),
publikacja zostaje przerwana i Twórca otrzymuje informację o błędzie."
},
{
"id": "API_arweave_upload",
"title": "Zapis danych na Arweave",
"type": "api_call",
"description": "System wysyła przygotowany plik z danymi top fanów do sieci
Arweave (lub podobnej trwałej przechowalni). Otrzymuje identyfikator
transakcji/zasobu (np. hash Arweave), pod którym dane będą dostępne na
zawsze.",
"depends_on": [
"BL_prepare_fan_data"
],
"outputs": [
"UI_fanwall_published"
],
"related_data": [
"arweave_tx_id",
"permaweb_url"
],
"visibility": "internal",
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
60"error_handling": "Jeśli zapis na Arweave się nie powiedzie (np. błąd sieci lub
brak opłaty), operacja zostaje przerwana. Twórca może spróbować ponownie
później (błąd jest logowany)."
},
{
"id": "UI_fanwall_published",
"title": "Sukces publikacji Fan Wall",
"type": "ui_component",
"description": "Interfejs informuje Twórcę o pomyślnej publikacji 'Wiecznej
Ściany Fanów'. Wyświetlany jest link/URL do opublikowanych danych (np.
adres Arweave), który Twórca może udostępnić fanom. Top fani zostali
upamiętnieni na stałe.",
"depends_on": [
"API_arweave_upload"
],
"outputs": [],
"related_data": [
"permaweb_url"
],
"visibility": "public",
"error_handling": "Jeśli link nie może zostać wygenerowany lub data transakcji
nie jest dostępna od razu, Twórca otrzyma informację, że publikacja nastąpiła,
ale link pojawi się po potwierdzeniu transakcji."
},
{
"entry_points": [
"UA_register_submit",
"UA_google_oauth_start",
"UA_twitch_oauth_start",
"UA_login_submit",
"UA_siwe_start",
"UA_tip_click",
"UA_withdraw_click",
"UI_admin_dashboard",
"UA_buy_membership",
"UA_voice_command",
"UI_dao_portal",
"UA_publish_fan_wall"
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
61],
"exit_points": [
"UI_verification_success",
"UI_user_dashboard",
"UI_creator_dashboard",
"EV_tip_completed",
"EV_withdraw_completed",
"UI_fanwall_published",
"UI_voice_response"
],
"diagram_suggestion": {
"type": "layered graph",
"grouping_strategy": "wg kanałów komunikacji (web, email, blockchain,
OAuth)",
"highlight_paths": [
"ścieżka 1: tip jako zalogowany fan",
"ścieżka 2: tip jako gość",
"ścieżka 3: rejestracja twórcy z Google",
"ścieżka 4: wypłata USDC do banku",
"ścieżka 5: Web3 login i NFT za tip"
]
}
}
]
Ultraszczegółowa Logiczna Mapa Systemu TipJar+ w Formacie JSON
