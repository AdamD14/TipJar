# ! Master Poradnik: Wdrożenie Procesu Rejestracji TipJar+

### Master Poradnik: Wdrożenie Procesu Rejestracji TipJar+ (Poprawiona Wersja)

**Cel**: Refaktoryzacja istniejącego formularza rejestracji w skalowalny, bezpieczny i gotowy na przyjęcie 100 milionów użytkowników, wieloetapowy proces onboardingu ("kreator").

**Zasady przewodnie**:

1. **Bezpieczeństwo przede wszystkim**: Każda decyzja techniczna będzie podejmowana z myślą o maksymalnym zabezpieczeniu danych użytkowników i operacji finansowych.
2. **Skalowalność**: Architektura musi być gotowa na przyszły rozwój i dodawanie nowych funkcji bez konieczności przebudowy fundamentów.
3. **Najlepsze Praktyki**: Stosujemy nowoczesne, sprawdzone w branży narzędzia i wzorce projektowe (`React Hook Form`, `Zod`, `Zustand`, `Axios Interceptors`, `Idempotency`).

---

### **Część 1: Fundamenty Architektoniczne**

W tej części przygotujemy środowisko i stworzymy kluczowe, fundamentalne elementy nowej architektury. Po zakończeniu tej części będziemy mieli solidną podstawę do budowy poszczególnych kroków kreatora.

---

### Krok 1: Przygotowanie Środowiska i Instalacja Zależności

Zanim napiszemy kod, musimy upewnić się, że nasz projekt `frontend` ma wszystkie niezbędne narzędzia. Będziemy potrzebować bibliotek do zaawansowanego zarządzania formularzami oraz do komunikacji z API.

**Akcja**: Otwórz terminal WSL w głównym katalogu Twojego projektu **`frontend`** i wykonaj poniższe komendy.

1. **Instalacja bibliotek do zarządzania formularzami:**`React Hook Form` zapewni wydajność i kontrolę nad formularzami, a `Zod` pozwoli na definiowanie schematów walidacji w bezpieczny i przejrzysty sposób. Pakiet `@hookform/resolvers` dostarcza adapter do `Zod`.Bash
    
    `npm install react-hook-form zod @hookform/resolvers`
    
2. **Instalacja klienta HTTP:**`Axios` to standard branżowy do wykonywania zapytań API. Użyjemy go do stworzenia scentralizowanego klienta, który ułatwi zarządzanie tokenami i błędami.Bash
    
    `npm install axios`
    

*Informacja: Biblioteki `viem` i `siwe`, które zidentyfikowaliśmy w Twoim `package.json`, są prawidłowe i będziemy ich używać w dalszych krokach do implementacji logiki Web3. Nie ma potrzeby ich ponownej instalacji.*

---

### Krok 2: Architektura Globalnego Stanu (Zustand)

Sercem naszego wieloetapowego kreatora będzie globalny magazyn stanu (store) w `Zustand`. Będzie on przechowywał wszystkie informacje o postępie użytkownika w procesie rejestracji, takie jak wybrana rola, dane z formularzy i tokeny autoryzacyjne.

**Akcja**: Stwórz nowy plik w swoim projekcie `frontend`.

- **Ścieżka pliku**: `src/lib/stores/onboardingStore.ts`
- **Zawartość**: Wklej poniższy kod.

TypeScript

`import { create } from 'zustand';

// Definicja typów dla naszego stanu
type OnboardingStep = 
  | 'ROLE_SELECTION' 
  | 'AUTH_DETAILS' 
  | 'CHOOSE_USERNAME' 
  | 'CONSENTS' 
  | 'CREATOR_SETUP' 
  | 'COMPLETED';

interface OnboardingState {
  step: OnboardingStep;
  role: 'FAN' | 'CREATOR' | null;
  tokens: {
    accessToken: string | null;
  };
  userData: {
    email?: string;
    walletAddress?: string;
    username?: string;
  };
}

interface OnboardingActions {
  setStep: (step: OnboardingStep) => void;
  setRole: (role: 'FAN' | 'CREATOR') => void;
  setTokens: (tokens: { accessToken: string | null }) => void;
  setUserData: (data: Partial<OnboardingState['userData']>) => void;
  nextStep: () => void;
  reset: () => void;
}

// Definicja kroków w poprawnej kolejności
const stepsOrder: OnboardingStep[] = [
  'ROLE_SELECTION',
  'AUTH_DETAILS',
  'CHOOSE_USERNAME',
  'CONSENTS',
  'CREATOR_SETUP',
  'COMPLETED'
];

const initialState: OnboardingState = {
  step: 'ROLE_SELECTION',
  role: null,
  tokens: {
    accessToken: null,
  },
  userData: {},
};

export const useOnboardingStore = create<OnboardingState & { actions: OnboardingActions }>()((set, get) => ({
  ...initialState,
  actions: {
    setStep: (step) => set({ step }),
    setRole: (role) => set({ role }),
    setTokens: (tokens) => set({ tokens }),
    setUserData: (data) => set((state) => ({ userData: { ...state.userData, ...data } })),
    nextStep: () => {
      const currentStepIndex = stepsOrder.indexOf(get().step);
      if (currentStepIndex < stepsOrder.length - 1) {
        let nextStep = stepsOrder[currentStepIndex + 1];
        // Warunkowe pominięcie kroku CREATOR_SETUP dla Fanów
        if (nextStep === 'CREATOR_SETUP' && get().role === 'FAN') {
          nextStep = stepsOrder[currentStepIndex + 2];
        }
        set({ step: nextStep });
      }
    },
    reset: () => set(initialState),
  },
}));`

---

### Krok 3: Scentralizowany Klient API (Axios)

Aby zapewnić czystość kodu i łatwość zarządzania komunikacją z backendem, stworzymy jedną, globalną instancję klienta `Axios`. Będzie on automatycznie dołączał token `accessToken` do każdego wychodzącego żądania, korzystając z naszego nowego magazynu `onboardingStore`.

**Akcja**: Stwórz nowy plik w swoim projekcie `frontend`.

- **Ścieżka pliku**: `src/lib/apiClient.ts`
- **Zawartość**: Wklej poniższy kod.

TypeScript

`import axios from 'axios';
import { useOnboardingStore } from './stores/onboardingStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor do automatycznego dołączania tokena autoryzacyjnego
apiClient.interceptors.request.use(
  (config) => {
    // Pobieramy token z magazynu Zustand
    // Używamy .getState(), ponieważ interceptor jest poza cyklem życia Reacta
    const token = useOnboardingStore.getState().tokens.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tutaj w przyszłości można dodać interceptor odpowiedzi
// do obsługi odświeżania tokena (błąd 401)

export default apiClient;`

---

### Krok 4: Struktura Plików i Główny Komponent Kreatora

Teraz, gdy mamy stan i klienta API, możemy stworzyć strukturę dla naszego kreatora i jego główny komponent, który będzie zarządzał wyświetlaniem poszczególnych kroków.

**Akcja 1**: Zmodyfikuj istniejącą stronę rejestracji.

- **Ścieżka pliku**: `src/app/(auth)/register/page.tsx`
- **Zawartość**: Zastąp całą zawartość tego pliku poniższym kodem. Strona ta będzie teraz tylko punktem wejścia do naszego kreatora.

TypeScript

`import OnboardingWizard from '@/components/onboarding/OnboardingWizard';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* Główny komponent kreatora, który zarządza całym procesem.
        Można go otoczyć dodatkowymi elementami layoutu, jeśli to konieczne.
      */}
      <OnboardingWizard />
    </div>
  );
}`

**Akcja 2**: Stwórz główny komponent-orkiestrator kreatora.

- **Ścieżka pliku**: `src/components/onboarding/OnboardingWizard.tsx`
- **Zawartość**: Wklej poniższy kod.

TypeScript

`"use client";

import { useOnboardingStore } from "@/lib/stores/onboardingStore";

// Za chwilę stworzymy te komponenty. Na razie je importujemy jako placeholdery.
// import { RoleStep } from './RoleStep';
// import { AuthStep } from './AuthStep';
// import { UsernameStep } from './UsernameStep';
// import { ConsentsStep } from './ConsentsStep';
// import { CreatorSetupStep } from './CreatorSetupStep';
// import { CompletionStep } from './CompletionStep';

// Tymczasowe komponenty-zaślepki do celów demonstracyjnych
const PlaceholderStep = ({ name }: { name: string }) => (
  <div className="text-white text-center p-8 bg-slate-800 rounded-lg border border-teal-500">
    To jest placeholder dla kroku: <br />
    <strong className="text-xl text-teal-400">{name}</strong>
  </div>
);

const RoleStep = () => <PlaceholderStep name="ROLE_SELECTION" />;
const AuthStep = () => <PlaceholderStep name="AUTH_DETAILS" />;
const UsernameStep = () => <PlaceholderStep name="CHOOSE_USERNAME" />;
const ConsentsStep = () => <PlaceholderStep name="CONSENTS" />;
const CreatorSetupStep = () => <PlaceholderStep name="CREATOR_SETUP" />;
const CompletionStep = () => <PlaceholderStep name="COMPLETED" />;

export default function OnboardingWizard() {
  const step = useOnboardingStore((state) => state.step);

  const renderCurrentStep = () => {
    switch (step) {
      case 'ROLE_SELECTION':
        return <RoleStep />;
      case 'AUTH_DETAILS':
        return <AuthStep />;
      case 'CHOOSE_USERNAME':
        return <UsernameStep />;
      case 'CONSENTS':
        return <ConsentsStep />;
      case 'CREATOR_SETUP':
        return <CreatorSetupStep />;
      case 'COMPLETED':
        return <CompletionStep />;
      default:
        // Obsługa nieznanego stanu - reset do początku
        useOnboardingStore.getState().actions.reset();
        return <RoleStep />;
    }
  };

  return (
    <div className="w-full max-w-lg">
      {/* Ten komponent-orkiestrator dynamicznie renderuje odpowiedni krok
        w zależności od stanu w magazynie Zustand.
      */}
      {renderCurrentStep()}
    </div>
  );
}`

---

### Podsumowanie Części 1

Gratulacje! Właśnie położyliśmy solidne, skalowalne fundamenty pod cały proces onboardingu. Mamy teraz:

- Zainstalowane niezbędne biblioteki.
- Centralny magazyn stanu (`onboardingStore`), który będzie zarządzał całym procesem.
- Profesjonalnego klienta API (`apiClient`), który ułatwi komunikację z backendem.
- Główny komponent kreatora (`OnboardingWizard`), gotowy do renderowania poszczególnych kroków.

W następnej części zajmiemy się implementacją pierwszego widocznego dla użytkownika kroku: **`RoleStep`**, czyli ekranu wyboru roli.

### **Część 2: Implementacja Kroków Kreatora – Wybór Roli**

**Cel**: Stworzenie komponentu `RoleStep.tsx`, który pozwoli użytkownikowi wybrać, czy rejestruje się jako **Fan**, czy jako **Twórca**. Wybór ten zostanie zapisany w naszym globalnym magazynie stanu, co zdeterminuje dalszy przebieg rejestracji.

---

### Krok 1: Stworzenie Komponentu Wyboru Roli (`RoleStep.tsx`)

Ten komponent zastąpi placeholder, który stworzyliśmy w `OnboardingWizard`. Będzie on prezentował dwie klikalne karty i przycisk kontynuacji.

**Akcja**: Stwórz nowy plik w swoim projekcie `frontend`.

- **Ścieżka pliku**: `src/components/onboarding/RoleStep.tsx`
- **Zawartość**: Wklej poniższy kod.

TypeScript

`"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { Heart, Palette } from "lucide-react"; // Ikony do wizualizacji ról

// Mały komponent pomocniczy dla karty wyboru roli
const RoleCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  isSelected,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  isSelected: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full p-6 text-left border-2 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
      isSelected
        ? "border-teal-400 bg-teal-500/20 shadow-lg shadow-teal-500/20"
        : "border-gray-700 bg-gray-800/50 hover:border-gray-500"
    }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`p-3 rounded-full transition-colors ${
          isSelected ? "bg-teal-400" : "bg-gray-700"
        }`}
      >
        <Icon
          className={`w-6 h-6 transition-colors ${
            isSelected ? "text-slate-900" : "text-teal-400"
          }`}
        />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  </button>
);

export default function RoleStep() {
  // Pobieramy akcje z naszego globalnego magazynu Zustand
  const { setRole, nextStep } = useOnboardingStore((state) => state.actions);
  
  // Stan lokalny do śledzenia, która opcja jest aktualnie wybrana w UI
  const [selectedRole, setSelectedRole] = useState<'FAN' | 'CREATOR' | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      // 1. Zapisz wybrana role do globalnego stanu Zustand
      setRole(selectedRole);
      // 2. Przejdź do następnego kroku w kreatorze
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 font-montserrat">Welcome to TipJar+!</h2>
        <p className="text-gray-400 font-montserrat">
          Let's start by choosing your role on the platform.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <RoleCard
          icon={Heart}
          title="Register as a Fan"
          description="I want to support my favorite creators and join their communities."
          onClick={() => setSelectedRole("FAN")}
          isSelected={selectedRole === "FAN"}
        />
        <RoleCard
          icon={Palette}
          title="Register as a Creator"
          description="I want to monetize my passion and build a community around my work."
          onClick={() => setSelectedRole("CREATOR")}
          isSelected={selectedRole === "CREATOR"}
        />
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!selectedRole}
        className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none shadow-lg font-montserrat"
      >
        Next
      </button>
    </div>
  );
}`

---

### Krok 2: Podłączenie Nowego Komponentu do Kreatora

Teraz musimy powiedzieć naszemu głównemu komponentowi `OnboardingWizard`, aby używał nowo stworzonego `RoleStep` zamiast placeholdera.

**Akcja**: Otwórz plik `src/components/onboarding/OnboardingWizard.tsx` i dokonaj poniższej zmiany.

- **Ścieżka pliku**: `src/components/onboarding/OnboardingWizard.tsx`
- **Modyfikacja**: Zaimportuj nowo stworzony komponent i podmień placeholder.

TypeScript

`"use client";

import { useOnboardingStore } from "@/lib/stores/onboardingStore";

// Zmiana 1: Importujemy nasz prawdziwy komponent
import RoleStep from './RoleStep';

// ... reszta placeholderów pozostaje na razie bez zmian
const PlaceholderStep = ({ name }: { name: string }) => (
    // ...
);
const AuthStep = () => <PlaceholderStep name="AUTH_DETAILS" />;
// ...

export default function OnboardingWizard() {
  const step = useOnboardingStore((state) => state.step);

  const renderCurrentStep = () => {
    switch (step) {
      case 'ROLE_SELECTION':
        // Zmiana 2: Używamy prawdziwego komponentu zamiast placeholdera
        return <RoleStep />;
      case 'AUTH_DETAILS':
        return <AuthStep />;
      // ... reszta switcha bez zmian
      default:
        // ...
    }
  };

  return (
    // ... return bez zmian
  );
}`

---

### Podsumowanie Części 2

Po wykonaniu powyższych kroków, fundamenty z Części 1 ożyły. Po wejściu na stronę `/register` powinieneś zobaczyć w pełni interaktywny ekran wyboru roli.

**Weryfikacja**:

- Otwórz stronę `/register` w przeglądarce.
- Sprawdź, czy przycisk "Next" jest początkowo nieaktywny.
- Kliknij na jedną z ról – powinna się podświetlić, a przycisk "Next" powinien stać się aktywny.
- Po kliknięciu "Next", powinieneś zobaczyć placeholder dla następnego kroku (`AUTH_DETAILS`).
- (Opcjonalnie) Używając React DevTools, możesz sprawdzić, czy stan w `onboardingStore` został poprawnie zaktualizowany (pole `role` powinno mieć wybraną wartość, a `step` powinno zmienić się na `AUTH_DETAILS`).

W następnej części zajmiemy się implementacją kroku drugiego: **`AuthStep.tsx`**, czyli serca procesu – formularza uwierzytelniania.

### **Część 3 (Poprawiona): Kompletna Implementacja Kroku Uwierzytelniania**

**Cel**: Stworzenie w pełni funkcjonalnego komponentu `AuthStep.tsx` z kompletnym kodem dla wszystkich metod rejestracji, w tym w pełni działającą integracją SIWE przy użyciu `wagmi`.

---

### Krok 1: Instalacja Zależności dla `wagmi`

Zgodnie z Twoją decyzją, dodajemy do projektu `wagmi`. Jest to biblioteka hooków Reacta, która ułatwia interakcje z portfelami Ethereum i jest zbudowana na `viem`, który już masz w projekcie.

**Akcja**: Otwórz terminal WSL w katalogu `frontend` i wykonaj poniższą komendę.

Bash

`npm install wagmi @tanstack/react-query`

---

### Krok 2: Globalna Konfiguracja `wagmi` (Providers)

Aby hooki z `wagmi` działały w całej aplikacji, musimy "opakować" naszą aplikację w odpowiednie komponenty dostarczające kontekst (Providers).

**Akcja 1**: Stwórz nowy plik `providers.tsx`.

- **Ścieżka pliku**: `src/app/providers.tsx`
- **Zawartość**: Wklej poniższy kod.

TypeScript

`"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

// Konfiguracja wagmi, która mówi, z jakimi sieciami blockchain ma się łączyć.
export const config = createConfig({
  chains: [mainnet], // Na razie tylko sieć główna Ethereum
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

// Komponent, który będzie dostarczał kontekst wagmi i react-query do całej aplikacji.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}`

**Akcja 2**: Użyj `Providers` w głównym layoucie aplikacji.

- **Ścieżka pliku**: `src/app/layout.tsx`
- **Modyfikacja**: Zaimportuj i opakuj `children` w komponent `<Providers>`.

TypeScript

`import { Providers } from './providers'; // Importujemy nasz nowy komponent

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Opakowujemy całą aplikację, aby hooki wagmi były wszędzie dostępne */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`

---

### Krok 3: Definicja Schematu Walidacji (Zod)

Ten krok pozostaje bez zmian. Jest to solidna podstawa dla naszego formularza.

- **Ścieżka pliku**: `src/lib/schemas/authSchema.ts`
- **Zawartość**:

TypeScript

`import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;`

---

### Krok 4: Implementacja Komponentu `AuthStep.tsx`

Oto kompletna wersja komponentu `AuthStep.tsx` **bez żadnych pominięć w kodzie**. Zawiera pełny formularz i logikę dla wszystkich metod rejestracji.

**Akcja**: Otwórz plik `src/components/onboarding/AuthStep.tsx` i zastąp jego zawartość poniższym kodem.

TypeScript

`"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, Wallet } from "lucide-react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import apiClient from "@/lib/apiClient";
import { registerSchema, RegisterFormValues } from "@/lib/schemas/authSchema";

export default function AuthStep() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const { role: currentRole, actions } = useOnboardingStore((state) => ({
    role: state.role,
    actions: state.actions,
  }));

  const { connectAsync } = useConnect();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onEmailSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setApiError("");
    try {
      await apiClient.post('/auth/register', {
        email: data.email,
        password: data.password,
        role: currentRole,
      });
      actions.setUserData({ email: data.email });
      actions.nextStep();
    } catch (err: any) {
      setApiError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "twitch") => {
    setLoading(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    window.location.href = `${backendUrl}/api/v1/auth/${provider}?role=${currentRole}`;
  };

  const handleSiweRegister = async () => {
    setLoading(true);
    setApiError("");
    try {
      const { account, chain } = await connectAsync({ connector: new InjectedConnector() });
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

      const nonceRes = await apiClient.post(`/auth/siwe/nonce`, { address: account, role: currentRole });
      const { nonce } = nonceRes.data;

      const message = new SiweMessage({
        domain: window.location.host,
        address: account,
        statement: "Sign in with Ethereum to TipJar+.",
        uri: window.location.origin,
        version: "1",
        chainId: chain.id,
        nonce,
      });

      const messageToSign = message.prepareMessage();
      const signature = await signMessageAsync({ message: messageToSign });

      const verifyRes = await apiClient.post('/auth/siwe/login', {
        message: messageToSign,
        signature,
        address: account,
        chainId: chain.id,
        nonce: nonce
      });

      const { user, accessToken } = verifyRes.data;
      actions.setTokens({ accessToken });
      actions.setUserData({ email: user.email, walletAddress: user.providerId, username: user.displayName });
      
      router.push("/choose-username");

    } catch (err: any) {
      setApiError(err.response?.data?.message || err.message || "Web3 registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white font-montserrat">Create your account</h2>
        <p className="text-gray-400 mt-2 font-montserrat">
          You are one step away from joining as a {currentRole === "CREATOR" ? "Creator" : "Fan"}.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button type="button" onClick={() => handleSocialLogin("google")} disabled={loading} className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60">
          <img src="/assets/google-original-logo.svg" alt="Google logo" className="w-5 h-5" />
          Continue with Google
        </button>
        <button type="button" onClick={() => handleSocialLogin("twitch")} disabled={loading} className="flex items-center justify-center gap-3 bg-purple-600/70 hover:bg-purple-600/90 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-purple-500/30 hover:border-purple-400/50 disabled:opacity-60">
          <img src="/assets/twitch-logo.svg" alt="Twitch logo" className="w-5 h-5" />
          Continue with Twitch
        </button>
        <button type="button" onClick={handleSiweRegister} disabled={loading} className="flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60">
          <Wallet className="w-5 h-5" /> Sign up with Wallet (Web3)
        </button>
      </div>

      <div className="my-6 text-center text-white/60 text-sm relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20"></div></div>
        <div className="relative bg-gray-900 px-4 inline-block">or</div>
      </div>
      
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={methods.handleSubmit(onEmailSubmit)}>
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-2 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input id="email" type="email" placeholder="e.g. john@tipjar.plus" className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all" {...methods.register("email")} />
            </div>
            {methods.formState.errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{methods.formState.errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-white text-sm mb-2 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input id="password" type={showPwd ? 'text' : 'password'} placeholder="Enter your password" className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all" {...methods.register("password")} />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-300" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {methods.formState.errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{methods.formState.errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-white text-sm mb-2 font-medium">Repeat password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input id="confirmPassword" type={showPwd2 ? 'text' : 'password'} placeholder="Repeat your password" className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all" {...methods.register("confirmPassword")} />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-300" onClick={() => setShowPwd2(!showPwd2)}>
                {showPwd2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {methods.formState.errors.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-1">{methods.formState.errors.confirmPassword.message}</p>}
          </div>

          {apiError && <div className="text-red-400 text-sm text-center bg-red-900/30 border border-red-500/50 rounded-lg p-3">{apiError}</div>}

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg">
            {loading ? "Processing..." : "Register with Email"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}`

---

### Krok 5: Podłączenie do Kreatora

Na koniec, zaktualizuj `OnboardingWizard`, aby używał naszego finalnego komponentu.

**Akcja**: Otwórz plik `src/components/onboarding/OnboardingWizard.tsx` i dokonaj zmiany.

TypeScript

`// ...
import AuthStep from './AuthStep'; // Upewnij się, że ten import jest poprawny
// ...

// ... w funkcji renderCurrentStep
      case 'AUTH_DETAILS':
        return <AuthStep />; // Używamy finalnego komponentu
// ...`

---

### Podsumowanie Części 3

Ukończyliśmy najważniejszy krok kreatora. Mamy teraz:

- Zainstalowane i skonfigurowane `wagmi` do obsługi portfeli.
- Kompletny, bezpieczny formularz rejestracji email z walidacją po stronie klienta.
- W pełni działającą logikę dla rejestracji przez Google, Twitch i **MetaMask (SIWE)**.
- Poprawną obsługę stanu i przekierowań po udanej autoryzacji.

Po zapisaniu tych plików, Twój proces rejestracji powinien być w pełni funkcjonalny aż do kroku wyboru nazwy użytkownika.

W następnej części zajmiemy się implementacją kroku **`CHOOSE_USERNAME`**.

[Poradnik Implementacji Logiki Flow Frontendu (Część 1: Rejestracja)](!%20Master%20Poradnik%20Wdro%C5%BCenie%20Procesu%20Rejestracji%20Ti%20235120af4489801f9b2bde0f87df06f4/Poradnik%20Implementacji%20Logiki%20Flow%20Frontendu%20(Cz%C4%99%C5%9B%2022f120af448980219140e2e0df4f2531.md)

[Role steps](!%20Master%20Poradnik%20Wdro%C5%BCenie%20Procesu%20Rejestracji%20Ti%20235120af4489801f9b2bde0f87df06f4/Role%20steps%20235120af4489807d9804e0288d3d339c.md)

[1 / DX & ergonomia kodu](!%20Master%20Poradnik%20Wdro%C5%BCenie%20Procesu%20Rejestracji%20Ti%20235120af4489801f9b2bde0f87df06f4/1%20DX%20&%20ergonomia%20kodu%20235120af44898003a882c9c994b771e1.md)