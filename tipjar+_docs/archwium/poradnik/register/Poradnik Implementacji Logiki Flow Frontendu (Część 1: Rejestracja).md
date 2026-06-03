# Poradnik Implementacji Logiki Flow Frontendu (Część 1: Rejestracja)

## 

Ten poradnik jest kontynuacją dokumentu "Poradnik Implementacji MVP"  i skupia się na przepływie danych między frontendem (Next.js) a backendem (NestJS).

### Scenariusz 1: Rejestracja nowego użytkownika (E-mail + Hasło)

**Cel:** Użytkownik wchodzi na stronę `/register`, wypełnia formularz (e-mail, hasło, nazwa), klika "Zarejestruj się", a frontend wysyła te dane do backendu, aby utworzyć nowe konto.

Oto co dzieje się krok po kroku:

---

### Krok 1: Strona i komponent formularza (UI)

1. **Użytkownik wchodzi na `http://localhost:3000/register`**.
    - Next.js, zgodnie ze strukturą folderów opisaną w poradniku (
        
        `src/app/(auth)/register/page.tsx`), renderuje stronę rejestracji.
        
    - Strona ta jest "owinięta" w specjalny layout
        
        `src/app/(auth)/layout.tsx`, który nadaje jej minimalistyczny wygląd, np. centrując formularz na środku ekranu.
        
2. **Na stronie wyświetlany jest komponent `RegisterForm`**.TypeScript
    - Ten komponent znajduje się w
        
        `src/components/auth/RegisterForm.tsx`. Jego zadaniem jest wyświetlenie pól formularza.
        
    - W środku tego pliku używamy hooka `useState` z Reacta do przechowywania na bieżąco tego, co wpisuje użytkownik.
    
    **Przykład kodu (`src/components/auth/RegisterForm.tsx`):**
    
    `'use client'; // Ważne! Komponent jest interaktywny, więc musi być komponentem klienckim
    
    import { useState } from 'react';
    import { Input } from '@/components/ui/Input'; // Nasz reużywalny komponent pola tekstowego
    import { Button } from '@/components/ui/Button'; // Nasz reużywalny przycisk
    // import { apiClient } from '@/services/api'; // Za chwilę go użyjemy
    
    export function RegisterForm() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [displayName, setDisplayName] = useState('');
      const [error, setError] = useState<string | null>(null);
      const [isLoading, setIsLoading] = useState(false);
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Tutaj będzie logika wysyłki danych
      };
    
      return (
        <form onSubmit={handleSubmit}>
          {/* Pola Input dla email, password, displayName powiązane ze stanem */}
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* ... reszta pól ... */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Rejestrowanie...' : 'Zarejestruj się'}
          </Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      );
    }`
    

---

### Krok 2: Wysyłanie zapytania do API (Logika)

Gdy użytkownik wypełni formularz i kliknie przycisk "Zarejestruj się", uruchamiana jest funkcja `handleSubmit`.

1. **Przygotowanie do wysyłki:**
    - Ustawiamy `isLoading` na `true`, co np. blokuje przycisk, aby zapobiec wielokrotnemu klikaniu.
    - Resetujemy ewentualne stare błędy (`setError(null)`).
2. **Wywołanie serwisu API:**TypeScript
    - Teraz wchodzi do gry nasz "serwis API", czyli klient Axios zdefiniowany w
        
        `src/services/api.ts`. To on jest odpowiedzialny za faktyczną komunikację z backendem.
        
    - W funkcji
        
        `handleSubmit` wywołujemy metodę tego serwisu, która odpowiada endpointowi rejestracji na backendzie: `POST /api/v1/auth/register`.
        
    
    **Uzupełniony kod `handleSubmit` w `RegisterForm.tsx`:**
    
    `// ... wewnątrz RegisterForm.tsx
    import { apiClient } from '@/services/api'; // Import naszego klienta API
    import { useAuthStore } from '@/stores/authStore'; // Import store'u Zustand
    import { useRouter } from 'next/navigation';
    
    // ...
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
            // 1. To jest "mapping"! Wywołujemy metodę post na naszym kliencie API.
            const response = await apiClient.post('/auth/register', {
                email,
                password,
                displayName,
                // Możemy też dodać rolę, jeśli formularz na to pozwala
            });
    
            // 2. Sukces! Backend odpowiedział pozytywnie (status 201 Created).
            //    Odpowiedź (response.data) zawiera accessToken i dane użytkownika.
            console.log('Rejestracja pomyślna!', response.data);
    
            // 3. Zapisujemy token i dane użytkownika w globalnym stanie (Zustand).
            useAuthStore.getState().login(response.data.user, response.data.accessToken);
    
            // 4. Przekierowujemy użytkownika do jego panelu.
            const router = useRouter();
            router.push('/dashboard');
    
        } catch (err: any) {
            // 5. Błąd! Coś poszło nie tak.
            console.error('Błąd rejestracji:', err);
            // Wyświetlamy użytkownikowi komunikat błędu, który przysłał backend.
            setError(err.response?.data?.message || 'Wystąpił nieoczekiwany błąd.');
        } finally {
            // 6. Niezależnie od wyniku, kończymy ładowanie.
            setIsLoading(false);
        }
    };`
    

---

### Krok 3: Co się dzieje na backendzie (w skrócie)

Kiedy `apiClient.post('/auth/register', ...)` jest wywoływane, frontend wysyła żądanie HTTP POST na adres `http://localhost:3001/api/v1/auth/register`.

1. **Kontroler (`AuthController`) odbiera żądanie:**
    - Na backendzie NestJS, endpoint
        
        `/auth/register` w `AuthController` (`backend/src/auth/auth.controller.ts`) zostaje aktywowany.
        
2. **Serwis (`AuthService`) wykonuje logikę:**
    - Kontroler przekazuje zadanie do
        
        `AuthService`.
        
    - 
        
        `AuthService` hashuje hasło, a następnie używa `UsersService` do zapisania nowego użytkownika w bazie danych.
        
    - 
        
        **Kluczowy moment:** Po zapisaniu użytkownika w bazie, `AuthService` wywołuje `CircleService`, aby stworzyć dla tego użytkownika portfel Circle DCW.
        
    - Na końcu,
        
        `AuthService` generuje tokeny JWT (`accessToken` i `refreshToken`).
        
3. **Backend wysyła odpowiedź:**
    - Backend odsyła odpowiedź z kodem statusu `201 Created`.
    - W ciele odpowiedzi (
        
        `response.data`) znajdują się `accessToken` i dane nowo utworzonego użytkownika (już z `circleWalletId`). Backend ustawia również
        
        `refreshToken` w bezpiecznym ciasteczku `HttpOnly`.
        

---

### Podsumowanie flow dla rejestracji:

**Użytkownik** ➡️ **Strona `/register`** (`page.tsx`) ➡️ **Komponent `RegisterForm.tsx`** (zbiera dane w `useState`) ➡️ **Funkcja `handleSubmit`** (po kliknięciu) ➡️ **Serwis `apiClient.post('/auth/register', ...)`** (wysyła dane) ➡️ **Backend `AuthController`** (odbiera) ➡️ **Backend `AuthService`** (tworzy usera, portfel Circle, tokeny) ➡️ **Odpowiedź z tokenem** ➡️ **Frontend (`handleSubmit`)** (odbiera odp., zapisuje token w `useAuthStore`, przekierowuje na `/dashboard`).

Mam nadzieję, że ten szczegółowy opis wyjaśnia Twoje wątpliwości dotyczące "mappingu". Ten sam schemat myślenia można zastosować do każdego innego zapytania API w Twojej aplikacji:

1. **Akcja użytkownika** -> Jaki komponent/strona reaguje?
2. **Zebranie danych** -> Gdzie są przechowywane dane wejściowe (stan, formularz)?
3. **Wywołanie API** -> Która funkcja serwisu `apiClient` jest używana i do jakiego endpointu?
4. **Obsługa odpowiedzi** -> Co robi frontend po otrzymaniu sukcesu lub błędu?

Daj znać, które kolejne zapytanie API (np. logowanie, wysłanie napiwku, wypłata) mamy teraz zmapować w ten sposób!

Jasne, rozumiem! Świetnie, że backend jest gotowy i nasłuchuje. To daje nam solidne fundamenty.

Zajmijmy się teraz stroną rejestracji na frontendzie. Zgodnie z Twoimi wytycznymi, stworzę dla Ciebie kompletny, działający komponent strony rejestracji. Będzie on zawierał:

1. **Nowy komponent `RegisterForm.tsx`** z polami do rejestracji (e-mail, hasło, nazwa) oraz wyborem roli (Fan/Twórca).
2. **Pełną logikę `handleSubmit`** do obsługi rejestracji przez e-mail i hasło.
3. **Przyciski i logikę do rejestracji przez Google, Twitch oraz portfel (SIWE)**.
4. **Poprawione przekierowanie** – po udanej rejestracji (dowolną metodą) użytkownik zostanie przeniesiony na stronę `/choose-username`.

Oto kod. Możesz go wkleić bezpośrednio do swojego projektu. Stworzyłem jeden plik, który zawiera zarówno stronę `page.tsx`, jak i logikę formularza, aby było Ci łatwiej wszystko przeanalizować.

### Omówienie i co dalej

1. **Struktura:** Masz teraz `RegisterPage`, która renderuje `RegisterForm`. Cała logika znajduje się w formularzu, co utrzymuje porządek.
2. **Rejestracja Email/Hasło:** Funkcja `handleSubmit` jest kompletna. Wysyła dane (w tym wybraną `role`) do backendu, a po sukcesie loguje użytkownika i przekierowuje na `/choose-username`.
3. **Rejestracja Google/Twitch:** Zgodnie z najlepszymi praktykami, przyciski po prostu odsyłają do backendu (`window.location.href`). Backend zajmuje się całym procesem OAuth i na końcu powinien przekierować użytkownika z powrotem do aplikacji (np. na stronę, która odczyta token z URL, zaloguje go i przekieruje dalej na `/choose-username`).
4. **Rejestracja Portfelem (SIWE):** Logika `handleSiweRegister` jest zaimplementowana. Użyłem tu popularnej biblioteki `wagmi`, która bardzo ułatwia interakcje z portfelami. Jeśli jej nie używasz, kod trzeba będzie dostosować do `ethers.js` i `window.ethereum`, ale flow pozostaje ten sam: połącz -> pobierz nonce -> podpisz -> zweryfikuj.
5. **Wybór Roli:** Dodałem prosty przełącznik `FAN`/`CREATOR`, który jest przekazywany do backendu przy każdej metodzie rejestracji. To kluczowe, aby backend wiedział, jakiego użytkownika utworzyć.

**Twoje następne kroki:**

1. **Wklej ten kod** do swojego projektu (pamiętaj o dostosowaniu importów do Twojej struktury, np. dla komponentów `Input`, `Button`, `Logo`).
2. **Dostosuj backend (`AuthController`):** Upewnij się, że endpointy `/auth/google/callback`, `/auth/twitch/callback` oraz `/auth/siwe/verify` po udanym zalogowaniu/rejestracji przekierowują użytkownika na stronę, która go zaloguje i przeniesie na `/choose-username`. Obecnie w poradniku było przekierowanie na `/creator/setup`.
3. **Stwórz stronę `/choose-username`**, która będzie wyświetlać odpowiedni formularz w zależności od roli użytkownika zapisanej w store Zustand.

[Poradnik Implementacji Logiki i Flow Frontendu (Wersja Rozszerzona) 🚀](Poradnik%20Implementacji%20Logiki%20Flow%20Frontendu%20(Cz%C4%99%C5%9B%2022f120af448980219140e2e0df4f2531/Poradnik%20Implementacji%20Logiki%20i%20Flow%20Frontendu%20(We%2022f120af4489806c8a2ce851d3d3ca74.md)

[Plan implementacji procesu rejestracji użytkownika](Poradnik%20Implementacji%20Logiki%20Flow%20Frontendu%20(Cz%C4%99%C5%9B%2022f120af448980219140e2e0df4f2531/Plan%20implementacji%20procesu%20rejestracji%20u%C5%BCytkownika%20230120af4489804cade5f04e751b0890.md)