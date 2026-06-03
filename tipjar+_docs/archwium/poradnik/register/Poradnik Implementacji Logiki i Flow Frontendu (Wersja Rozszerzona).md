# Poradnik Implementacji Logiki i Flow Frontendu (Wersja Rozszerzona) 🚀

## 

Ten poradnik jest kontynuacją poprzednich części i szczegółowo opisuje implementację kluczowych przepływów w aplikacji TipJar+. Każda sekcja zawiera opis scenariusza, logikę działania oraz przykłady kodu.

### Scenariusz 2: Logowanie Użytkownika

Po rejestracji użytkownik musi mieć możliwość zalogowania się do serwisu. Omówimy trzy główne ścieżki: e-mail/hasło, portfel Web3 (SIWE) oraz konta społecznościowe (Google/Twitch).

### A. Logowanie przez E-mail i Hasło

**Cel:** Użytkownik na stronie `/login` wpisuje swój e-mail i hasło. Frontend wysyła te dane do backendu, w odpowiedzi otrzymuje token dostępowy, zapisuje go i przekierowuje użytkownika do panelu.

**Flow krok po kroku:**

1. **Komponent formularza (`LoginForm.tsx`):** Podobnie jak przy rejestracji, komponent zbiera `email` i `password` w swoim stanie (`useState`).
2. **Funkcja `handleSubmit`:**
    - Jest uruchamiana po kliknięciu "Zaloguj się".
    - Ustawia stan ładowania (`setIsLoading(true)`).
    - Wywołuje metodę `apiClient.post('/auth/login', { email, password })`.
3. **Obsługa odpowiedzi:**
    - **Sukces (status 200 OK):** Backend zwraca obiekt `{ user, accessToken }`.
        - Frontend wywołuje funkcję ze store'u Zustanda: `useAuthStore.getState().login(response.data.user, response.data.accessToken)`. Ta funkcja zapisuje dane użytkownika i token w globalnym stanie oraz (opcjonalnie) w `localStorage` dla utrwalenia sesji.
        - Użytkownik jest przekierowywany do panelu głównego (`router.push('/dashboard')`).
    - **Błąd (status 401 Unauthorized):** Backend zwraca błąd, np. `{ "message": "Nieprawidłowe dane logowania" }`.
        - Frontend przechwytuje błąd w bloku `catch` i wyświetla go użytkownikowi (`setError(err.response.data.message)`).

**Przykład kodu (`LoginForm.tsx`):**

TypeScript

`const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    // Zaloguj użytkownika w stanie globalnym
    useAuthStore.getState().login(response.data.user, response.data.accessToken);
    // Przekieruj do panelu
    router.push('/dashboard');
  } catch (err: any) {
    setError(err.response?.data?.message || 'Logowanie nie powiodło się.');
  } finally {
    setIsLoading(false);
  }
};`

### B. Logowanie przez Portfel (SIWE)

Logowanie przez portfel przebiega identycznie jak rejestracja tą metodą. Backend na podstawie adresu portfela sam rozpozna, czy użytkownik już istnieje. Jeśli tak, zaloguje go, jeśli nie, utworzy nowe konto. **Frontend nie musi o tym wiedzieć – dla niego logika jest ta sama.**

**Flow:** Połącz z portfelem ➡️ Pobierz `nonce` ➡️ Podpisz wiadomość ➡️ Wyślij do `/auth/siwe/verify`.

---

### Scenariusz 3: Onboarding po Rejestracji (`/choose-username`)

**Cel:** Po pierwszej, udanej rejestracji (niezależnie od metody), użytkownik jest przekierowywany na stronę `/choose-username`, gdzie musi uzupełnić podstawowe dane. Wygląd formularza zależy od wybranej podczas rejestracji roli (`FAN` lub `CREATOR`).

**Flow krok po kroku:**

1. **Pobranie roli użytkownika:**TypeScript
    - Komponent strony `/choose-username` musi być komponentem klienckim (`'use client'`).
    - Pobiera dane zalogowanego użytkownika ze store'u Zustanda. Rola jest kluczowa.
    
    `import { useAuthStore } from '@/stores/authStore';
    
    const user = useAuthStore((state) => state.user);
    const role = user?.role; // 'FAN' lub 'CREATOR'`
    
2. **Warunkowe renderowanie formularza:**TypeScript
    - Na podstawie wartości `role`, komponent renderuje odpowiedni formularz.
    - Można to zrobić za pomocą prostego warunku `if` lub operatora trójargumentowego.
    
    `export default function ChooseUsernamePage() {
      const user = useAuthStore((state) => state.user);
    
      if (!user) {
        // Jeśli z jakiegoś powodu nie ma użytkownika, przenieś na stronę logowania
        // Można też pokazać spinner ładowania
        return <p>Ładowanie...</p>;
      }
    
      return (
        <div>
          <h1>Uzupełnij swój profil</h1>
          {user.role === 'CREATOR' ? (
            <CreatorOnboardingForm />
          ) : (
            <FanOnboardingForm />
          )}
        </div>
      );
    }`
    
3. **Implementacja formularzy (`FanOnboardingForm` i `CreatorOnboardingForm`):**TypeScript
    - **`FanOnboardingForm`:** Zawiera pola: `username`, `birthDate`, `termsAccepted` (checkbox).
    - **`CreatorOnboardingForm`:** Zawiera te same pola co Fan, plus dodatkowe (opcjonalne): `firstName`, `lastName`, `websiteUrl` oraz przycisk/sekcję do późniejszej weryfikacji tożsamości.
    - Oba formularze po wysłaniu (`handleSubmit`) wysyłają zapytanie `PATCH` lub `PUT` na endpoint backendowy służący do aktualizacji danych użytkownika, np. `/api/v1/users/me`.
    
    **Przykład `handleSubmit` w formularzu onboardingowym:**
    
    `const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await apiClient.patch('/users/me', {
          username: username,
          // ...inne dane z formularza
          hasCompletedOnboarding: true, // Ważna flaga!
        });
        // Zaktualizuj dane użytkownika w store
        useAuthStore.getState().setUser(response.data);
        // Przekieruj do panelu
        router.push('/dashboard');
      } catch (err: any) {
        // Obsługa błędów, np. nazwa użytkownika jest już zajęta
        setError(err.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };`
    

---

### Scenariusz 4: Wysyłanie Napiwku (Core Funkcjonalności)

**Cel:** Zalogowany użytkownik (Fan) wchodzi na profil Twórcy, wpisuje kwotę napiwku, klika "Wyślij napiwek" i realizuje płatność.

**Flow krok po kroku:**

1. **UI profilu Twórcy:**
    - Na stronie `/[username]` wyświetlane są publiczne dane Twórcy.
    - Znajduje się tam komponent `TipForm`, który zawiera pole na kwotę (`amount`) i przycisk.
2. **Logika `TipForm.tsx`:**TypeScript
    - Komponent przechowuje `amount` w stanie.
    - Funkcja `handleTipSubmit` jest wywoływana po kliknięciu przycisku.
    - Wysyła zapytanie `POST` do `/api/v1/tips`, przekazując w ciele zapytania:
        - `amount`: kwota napiwku.
        - `creatorId` lub `creatorUsername`: identyfikator Twórcy, któremu wysyłany jest napiwek.
    
    `const handleTipSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await apiClient.post('/tips', {
          amount: parseFloat(amount),
          creatorId: creator.id, // ID twórcy pobrane z danych strony
        });
        // Co się dzieje dalej? To zależy od implementacji płatności!
        // Założenie: backend zainicjował transakcję w Circle i czeka na potwierdzenie
        console.log('Odpowiedź z backendu:', response.data);
        // Możemy otworzyć okno modalne z instrukcjami płatności
        // lub poczekać na webhook od Circle, który zaktualizuje stan transakcji.
        alert('Napiwek wysłany pomyślnie!');
      } catch (err: any) {
        setError('Wystąpił błąd podczas wysyłania napiwku.');
      } finally {
        setIsLoading(false);
      }
    };`
    
3. **Aktualizacja UI po płatności:**
    - Najlepszym podejściem jest użycie WebSockets lub mechanizmu "polling" do nasłuchiwania na zmianę statusu transakcji na backendzie.
    - Gdy backend (poprzez webhook od Circle) potwierdzi, że płatność została zrealizowana, frontend może otrzymać tę informację i wyświetlić komunikat o sukcesie oraz zaktualizować np. saldo użytkownika lub historię transakcji.

---

### Scenariusz 5: Zarządzanie Stanem i Ochrona Tras

**Cel:** Aplikacja musi wiedzieć, czy użytkownik jest zalogowany, i chronić strony takie jak `/dashboard` przed dostępem nieautoryzowanych użytkowników.

1. **Globalny Stan (Zustand):**
    - Nasz `authStore` jest centralnym punktem prawdy. Przechowuje `user`, `accessToken` i stan `isAuthenticated`.
    - Powinien on także zawierać logikę do odczytywania stanu z `localStorage` przy starcie aplikacji, aby utrzymać sesję użytkownika po odświeżeniu strony.
2. **Komponent `ProtectedRoute` lub logika w `layout.tsx`:**
    - Można stworzyć komponent wyższego rzędu (HOC) lub prosty komponent-wrapper, który sprawdza stan autentykacji.
    - Jeśli `isAuthenticated` jest `false`, komponent przekierowuje użytkownika na stronę `/login`.
    - Jeśli jest `true`, renderuje swoje `children`.

**Przykład prostego hooka do ochrony strony:**

TypeScript

`// src/hooks/useRequireAuth.ts
import { useEffect }s from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export function useRequireAuth(redirectUrl = '/login') {
  const { isAuthenticated, isLoading } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading, // Dodajmy stan ładowania do store'u
  }));
  const router = useRouter();

  useEffect(() => {
    // Nie rób nic, dopóki sprawdzamy stan (np. z localStorage)
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isLoading, router, redirectUrl]);
}

// Użycie w komponencie strony chronionej:
// src/app/dashboard/page.tsx
'use client';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function DashboardPage() {
  useRequireAuth(); // Ta jedna linijka chroni całą stronę

  return <h1>Witaj w swoim panelu!</h1>;
}`

Mam nadzieję, że ta rozszerzona wersja poradnika daje Ci jeszcze pełniejszy obraz budowy frontendu. Daj znać, który element chcesz teraz zgłębić jeszcze bardziej!