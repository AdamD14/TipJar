# 31.05 Checklista Implementacji TipJar MVP

## 

**Legenda:**

- ✅ - Wydaje się w dużej mierze zrobione/rozpoczęte/omówione z rozwiązaniem głównych problemów.
- 🚧 - W trakcie prac, częściowo zrobione lub wymaga istotnej dalszej pracy/weryfikacji.
- ⚪️ - Do zrobienia / jeszcze nie rozpoczęte.

---

### **Sekcja 1: Wstęp i Założenia**

- ✅ 1.1. Główne Cele TipJar MVP
- ✅ 1.2. Wybrany Stos Technologiczny
- ✅ 1.3. Założenia Dotyczące Środowiska Deweloperskiego (WSL Ubuntu 24.04)

### **Sekcja 2: Konfiguracja Środowiska Projektowego**

- ✅ 2.1. Wymagane Oprogramowanie (Instalacja w WSL)
- ✅ 2.2. Zakładanie Repozytorium Git
- ✅ 2.3. Struktura Projektu
- ✅ 2.4. Inicjalizacja Projektu Backendowego (NestJS w WSL)
- ✅ 2.5. Inicjalizacja Projektu Frontendowego (Next.js w WSL)
- ✅ 2.6. Konfiguracja Zmiennych Środowiskowych (.env)
- ✅ 2.7. Uruchomienie Bazy Danych PostgreSQL w Dockerze (z WSL)
- ✅ 2.8. Konfiguracja Prismy w Projekcie Backendowym (w WSL)

### **Sekcja 3: Implementacja Modułu Uwierzytelniania (Auth) - Backend (NestJS)**

- ✅ 3.1. Instalacja Niezbędnych Zależności
- ✅ 3.2. Tworzenie Modułu `AuthModule`, `AuthService` i `AuthController`
- ✅ 3.3. Konfiguracja `AuthModule` (importy, providers, JwtModule, MailerModule w AppModule)
- 🚧 3.4. Implementacja Logiki w `AuthService` (generowanie tokenów, walidacja, SIWE z Redis, weryfikacja email, refresh tokens - **główne elementy są, ale np. pełna logika resetu hasła wymagałaby dodania**)
- ✅ 3.5. Implementacja Strategii Uwierzytelniania (Passport Strategies)
    - ✅ 3.5.1. Strategia Lokalna (`LocalStrategy`)
    - ✅ 3.5.2. Strategia JWT (`JwtStrategy` dla Access Tokena)
    - ✅ 3.5.3. Strategia Google (`GoogleStrategy`)
    - ✅ 3.5.4. Strategia Twitch (`TwitchStrategy`)
    - ✅ 3.5.5. Weryfikator SIWE (`SiweVerifier`)
    - 🚧 (Dodatkowo) Strategia JWT Refresh (`JwtRefreshStrategy` - zaimplementowana, ale warto potwierdzić pełną integrację z ciasteczkami w AuthController)
- 🚧 3.6. Implementacja `AuthController`
    - ⚪️ 3.6.1. Definicja DTOs (Data Transfer Objects) dla Rejestracji i Logowania (mamy placeholderowe użycie `any`, trzeba stworzyć konkretne klasy DTO z walidatorami)
    - 🚧 3.6.2. Endpointy dla Email/Hasło (Rejestracja, Logowanie - działają, ale z placeholderowym DTO)
    - ✅ 3.6.3. Endpointy dla Google OAuth (Inicjacja, Callback)
    - ✅ 3.6.4. Endpointy dla Twitch OAuth (Inicjacja, Callback)
    - 🚧 3.6.5. Endpointy dla SIWE (Generowanie Nonce, Weryfikacja Podpisu - działają, ale z placeholderowym DTO)
    - ✅ 3.6.6. Endpoint Wylogowania
    - ✅ 3.6.7. Endpoint Sprawdzania Statusu Zalogowania (`/me`)
    - 🚧 (Dodatkowo) Endpoint Weryfikacji Email (`/verify-email/:token` - dodany)
    - 🚧 (Dodatkowo) Endpoint Odświeżania Tokena (`/refresh-token` - dodany)
- 🚧 3.7. Zabezpieczanie Endpointów (`AuthGuard('jwt')`, Rate Limiting - **Rate Limiting dodany do `main.ts`, ale warto przejrzeć, czy wszystkie potrzebne endpointy są chronione**)

### **Sekcja 4: Implementacja Zarządzania Użytkownikami i Profilami - Backend (NestJS)**

- ✅ 4.1. Definicja Modeli Danych w `schema.prisma` (`User`, `Profile`, `SocialConnection` itp. - mamy pełną, poprawną wersję)
- ✅ 4.2. Tworzenie `UsersModule` i `UsersService`
- 🚧 4.3. Implementacja Logiki CRUD dla Użytkowników w `UsersService` (główne metody są, ale mogą wymagać doszlifowania, np. pełniejsza obsługa błędów, bardziej granularne DTOs dla aktualizacji)
- 🚧 4.4. Implementacja `UsersController` (mamy zarys, ale trzeba by go w pełni zaimplementować, jeśli jest potrzebny dla MVP)
- 🚧 4.5. Powiązanie Logiki Użytkowników z `AuthService` (tworzenie użytkownika po rejestracji, pobieranie danych - główne połączenia są, ale np. pełne zarządzanie rolami przy tworzeniu/aktualizacji może wymagać uwagi)

### **Sekcja 5: Integracja z Circle (Developer-Controlled Wallets) - Backend (NestJS)**

- ✅ 5.1. Tworzenie `CircleModule` i `CircleService`
- ✅ 5.2. Inicjalizacja Klienta Circle SDK w `CircleService`
- 🚧 5.3. Implementacja Metody `provisionUserWallet` w `CircleService` (główna logika jest, ale np. obsługa błędów i scenariuszy brzegowych może wymagać dopracowania)
- 🚧 5.4. Implementacja Logiki Wypłat dla Twórców (metoda `initiateWithdrawal` jest, ale TODO dla sprawdzania salda)
- 🚧 5.5. Implementacja Logiki Transferów Wewnętrznych (metoda `initiateInternalTipTransfer` jest, ale TODO dla sprawdzania salda i **ważne TODO dotyczące `destinationAddress` dla DCW-DCW transferów**)
- ✅ 5.6. Obsługa Kluczy Idempotencji i Błędów API Circle (omówione, zaimplementowane w podstawowym zakresie)
- ✅ 5.7. Bezpieczne Zarządzanie `CIRCLE_API_KEY` i `CIRCLE_ENTITY_SECRET` (omówione, zależy od konfiguracji `.env`)

### **Sekcja 6: Implementacja Logiki Napiwków - Backend (NestJS)**

- ✅ 6.1. Definicja Modelu `Tip` w `schema.prisma` (model jest zdefiniowany)
- 🚧 6.2. Tworzenie `TipsModule` i `TipsService` (mamy zarys z poradnika UI/UX, ale nie implementowaliśmy jeszcze w kodzie)
- ⚪️ 6.3. Endpoint API do Przyjmowania Żądania Napiwku
- 🚧 6.4. Logika Przetwarzania Napiwku w `TipsService` (omówiliśmy, ale **główny punkt do dalszej pracy, zwłaszcza prowizje i różne scenariusze płatności**)
- ⚪️ 6.5. Powiadomienia dla Twórcy i Fana

### **Sekcja 7: Implementacja Podstawowego Frontendu (Next.js & Tailwind CSS)**

- 🚧 7.1. Struktura Folderów (mamy zarys)
- 🚧 7.2. Globalny Layout (`src/app/layout.tsx`) (mamy zarys)
- 🚧 7.3. Konfiguracja Tailwind CSS (plik istnieje, paleta zdefiniowana)
- 🚧 7.4. Tworzenie Reużywalnych Komponentów UI (mamy przykład `Button`, reszta do zrobienia)
- 🚧 7.5. Zarządzanie Stanem Globalnym (mamy przykład Zustand, do implementacji)
- 🚧 7.6. Serwis API na Frontendzie (mamy przykład z Axios, do implementacji)

### **Sekcja 8: Implementacja Stron Kluczowych (Frontend)**

- ⚪️ 8.1. Strona Główna (Landing Page)
- 🚧 8.2. Strona Rejestracji / Logowania (mamy logikę backendową, frontend do zrobienia)
- 🚧 8.3. Publiczny Profil Twórcy
    - ⚪️ 8.3.1. Interfejs Wysyłania Napiwku
    - ⚪️ 8.3.2. Płatność Gościa
    - ⚪️ 8.3.3. Płatność Zalogowanego Fana
- 🚧 8.4. Creator Dashboard (mamy szczegółowy zarys, do implementacji)
- ⚪️ 8.5. Strony dla Fana
- ⚪️ 8.6. Strona Learn / Centrum Wiedzy
- 🚧 8.7. Aplikacja Mobilna (mamy ogólny zarys i dyskusję o technologii)

### **Sekcja 9: Integracja z Gas Station / Circle Paymaster (Frontend/Backend)**

- 🚧 9.1. Gas Station (Backend) (konfiguracja w Circle Console i użycie `feeLevel` w `CircleService` jest, ale pełne zarządzanie politykami to zewnętrzny krok)
- 🚧 9.2. Circle Paymaster (Frontend) (mamy zarys, do implementacji)

### **Sekcja 10: Testowanie (Ciągłe)**

- 🚧 10.1. Testy Jednostkowe (mamy przykładowy plik `.spec.ts` dla `AuthService`, reszta do napisania)
- ⚪️ 10.2. Testy Integracyjne
- ⚪️ 10.3. Testy E2E
- ⚪️ 10.4. Testy Obciążeniowe
- ⚪️ 10.5. Testy Bezpieczeństwa

### **Sekcja 11: Deployment**

- 🚧 11.1. Konfiguracja CI/CD (mamy przykład workflow dla backendu)
- ⚪️ 11.2. Wdrożenie Frontendu
- 🚧 11.3. Wdrożenie Backendu i Bazy Danych (mamy `Dockerfile` dla backendu)
- 🚧 11.4. Konfiguracja Środowisk Produkcyjnych (omówione kluczowe aspekty)