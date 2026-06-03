# Rozbudowa poradnika: rejestracja i onboarding (App Router + komponenty + kod). Poniżej trzymam się Twojego szablonu, ale dodaję brakujący kod oraz ujednolicam nazewnictwo.

## 1) Strony (page.tsx) — plan plików

| Ścieżka (App Router) | Opis funkcji | Wymagane stany (z DOCUMENT) | Cytat/linia |
| --- | --- | --- | --- |
| app/(auth)/register/page.tsx | Wejście do kreatora rejestracji (renderuje `OnboardingWizard`) | I cannot verify this. | „Ścieżka pliku: `src/app/(auth)/register/page.tsx`… Strona ta będzie teraz tylko punktem wejścia do naszego kreatora.” |
| app/choose-username/page.tsx | Ekran wyboru nazwy użytkownika po udanej autoryzacji | „…przekierowują użytkownika… na `/choose-username`… Stwórz stronę `/choose-username`, która wyświetla formularz zależnie od roli w Zustand.” |  |

## 2) Komponenty do utworzenia

| Plik | Użycie (na jakiej stronie) | Kluczowe props (z DOCUMENT) | Cytat/linia |
| --- | --- | --- | --- |
| src/components/onboarding/OnboardingWizard.tsx | app/(auth)/register/page.tsx | bazuje na stanie `useOnboardingStore().step` | „OnboardingWizard… switch(step)… reset; return `<RoleStep />`” |
| src/components/onboarding/RoleStep.tsx | renderowany przez OnboardingWizard | brak props (stan i akcje z Zustand) | „Ścieżka pliku: `src/components/onboarding/RoleStep.tsx`… kod komponentu” |
| src/components/onboarding/AuthStep.tsx | renderowany przez OnboardingWizard | I cannot verify this. | „`handleSocialLogin`… `handleSiweRegister`… `router.push(\"/choose-username\")`” |
| src/lib/stores/onboardingStore.ts | globalny stan kreatora | `step`, `role`, `tokens`, `userData`; akcje: `setStep`, `setRole`, `setTokens`, `setUserData`, `nextStep`, `reset` | „Zustand… kroki… akcje… warunkowe pominięcie CREATOR_SETUP dla Fanów.” |
| src/lib/apiClient.ts | używany w `AuthStep` | instancja Axios z interceptorami, token z `onboardingStore` | „Scentralizowany klient API (Axios)… interceptor z tokenem z Zustand.” |

## 3) Testy (jeśli DOCUMENT to określa)

| Typ | Plik | Scenariusz wymagany przez DOCUMENT | Cytat/linia |
| --- | --- | --- | --- |
| I cannot verify this. | I cannot verify this. | Brak zdefiniowanych scenariuszy testowych (są tylko zapisy harmonogramu dot. testów E2E) | „…tydzień 8: … testy end-to-end…” |

## 4) Nieprzypisane (wymagają decyzji)

- Strona Główna (Landing Page) — brak URL. I cannot verify this. (cytat: „Strona Główna (Landing Page)” )
- Rejestracja/Logowanie (złożony ekran) — poza `/register` brak precyzyjnych ścieżek. I cannot verify this. (cytat: „Rejestracja/Logowanie – ekran…” )
- Publiczny Profil Twórcy — wzmianka o URL z aliasem („tipjar.plus/@alias”), ale brak wzorca routingu. I cannot verify this. (cytat: „alias… pojawi się w URL, np. tipjar.plus/@alias” )
- Panel Twórcy (Dashboard) + podstrony (statystyki, wypłaty, personalizacja) — brak URL. I cannot verify this. (cytat: „Panel Twórcy… podstronami…” )
- Panel Fana — brak URL. I cannot verify this. (cytat: „Panel Fana…” )
- Odkrywaj (Explore) — brak URL. I cannot verify this. (cytat: „Strona ‘Odkrywaj’ (Explore)” ; opis treści listy twórców )
- Learn (Centrum Wiedzy) — brak URL. I cannot verify this. (cytat: „Strona ‘Learn’ (Centrum Wiedzy)” )
- Interfejs płatności (modal „Adres do wpłaty”, QR) — brak URL. I cannot verify this. (cytat: „…link ‘Adres do wpłaty’… modal z adresem Circle Wallet…” )

## 5) Reguły i ograniczenia z DOCUMENT

- Dostępność i informacyjność interfejsu (kontrasty, etykiety, min. 14px, feedback akcji) — cytat
- Przepływ po rejestracji: redirect do `/choose-username` — cytat
- Rejestracja Twórcy: wybór aliasu, info o portfelu Circle, uzupełnienie profilu, potem panel — cytat
- Integracje OAuth/SIWE i konfiguracja redirect URI — cytat

## 6) Checklista wykonania (bez kodu)

- Utwórz `app/(auth)/register/page.tsx` oraz `app/choose-username/page.tsx` zgodnie z tabelą (1).
- Dodaj pliki z tabeli (2): `OnboardingWizard`, `RoleStep`, `AuthStep`, `onboardingStore`, `apiClient`.
- Nie modyfikuj IMMUTABLE.

---

### Załącznik: kod uzupełniający (Next.js App Router + TS + Tailwind)

> Uwaga: część poniższego kodu to korekty i uzupełnienia na bazie DOCUMENT. Oznaczam to jako [Unverified]. Cytaty wskazują pochodzenie wymagań i fragmentów.
> 

KROK 1/ N 

### 1) app/(auth)/register/page.tsx

Źródło wymagań: „Strona rejestracji to punkt wejścia do kreatora”

```tsx
// app/(auth)/register/page.tsx
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <OnboardingWizard />
    </div>
  );
}

```

### 2) src/components/onboarding/OnboardingWizard.tsx

Źródło: szkic orkiestratora i logiki przełączania kroków

```tsx
"use client";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";

// Placeholdery – w kroku 2 podmienimy na realne komponenty.
const Placeholder = ({ name }: { name: string }) => (
  <div className="text-white text-center p-8 bg-slate-800 rounded-lg border border-teal-500">
    Krok: <strong className="text-xl text-teal-400">{name}</strong>
  </div>
);

export default function OnboardingWizard() {
  const step = useOnboardingStore(s => s.step);
  const actions = useOnboardingStore(s => s.actions);

  const view =
    step === "ROLE_SELECTION" ? <Placeholder name="ROLE_SELECTION" /> :
    step === "AUTH_DETAILS"   ? <Placeholder name="AUTH_DETAILS" />   :
    step === "CHOOSE_USERNAME"? <Placeholder name="CHOOSE_USERNAME" />:
    step === "CONSENTS"       ? <Placeholder name="CONSENTS" />       :
    step === "CREATOR_SETUP"  ? <Placeholder name="CREATOR_SETUP" />  :
    step === "COMPLETED"      ? <Placeholder name="COMPLETED" />      :
    (actions.reset(), <Placeholder name="ROLE_SELECTION" />);

  return <>{view}</>;
}

```

### 3) [Unverified] src/lib/stores/onboardingStore.ts

Źródło: definicja kroków i akcji w Zustand (z poprawkami składni)

```tsx
// src/lib/stores/onboardingStore.ts
import { create } from "zustand";

export type OnboardingStep =
  | "ROLE_SELECTION"
  | "AUTH_DETAILS"
  | "CHOOSE_USERNAME"
  | "CONSENTS"
  | "CREATOR_SETUP"
  | "COMPLETED";

interface OnboardingState {
  step: OnboardingStep;
  role: "FAN" | "CREATOR" | null;
  tokens: { accessToken: string | null };
  userData: { email?: string; walletAddress?: string; username?: string };
  actions: OnboardingActions;
}

interface OnboardingActions {
  setStep: (step: OnboardingStep) => void;
  setRole: (role: "FAN" | "CREATOR") => void;
  setTokens: (tokens: { accessToken: string | null }) => void;
  setUserData: (data: Partial<OnboardingState["userData"]>) => void;
  nextStep: () => void;
  reset: () => void;
}

const stepsOrder: OnboardingStep[] = [
  "ROLE_SELECTION",
  "AUTH_DETAILS",
  "CHOOSE_USERNAME",
  "CONSENTS",
  "CREATOR_SETUP",
  "COMPLETED",
];

const initial = {
  step: "ROLE_SELECTION" as OnboardingStep,
  role: null as OnboardingState["role"],
  tokens: { accessToken: null as string | null },
  userData: {} as OnboardingState["userData"],
};

export const useOnboardingStore = create<OnboardingState>()((set, get) => ({
  ...initial,
  actions: {
    setStep: step => set({ step }),
    setRole: role => set({ role }),
    setTokens: tokens => set({ tokens }),
    setUserData: data =>
      set(state => ({ userData: { ...state.userData, ...data } })),
    nextStep: () => {
      const idx = stepsOrder.indexOf(get().step);
      if (idx < stepsOrder.length - 1) {
        let next = stepsOrder[idx + 1];
        if (next === "CREATOR_SETUP" && get().role === "FAN") {
          next = stepsOrder[idx + 2];
        }
        set({ step: next });
      }
    },
    reset: () => set({ ...initial }),
  },
}));

```

### 4) src/lib/apiClient.ts

Źródło: klient Axios z interceptorami i tokenem z Zustand

```tsx
// src/lib/apiClient.ts
import axios from "axios";
import { useOnboardingStore } from "./stores/onboardingStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api/v1",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(config => {
  const token = useOnboardingStore.getState().tokens.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;

```

### 5) src/components/onboarding/RoleStep.tsx

Źródło: pełny komponent wyboru roli (Zustand)

```tsx
"use client";
import { useState } from "react";
import { Heart, Palette } from "lucide-react";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";

export default function RoleStep() {
  const { setRole, nextStep } = useOnboardingStore(s => s.actions);
  const [selected, setSelected] = useState<"FAN" | "CREATOR" | null>(null);
  const proceed = () => { if (selected) { setRole(selected); nextStep(); } };

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <h2 className="text-3xl font-bold text-white text-center">Choose your role</h2>
      <div className="grid gap-3">
        <button className={`p-6 rounded-2xl border ${selected==="FAN"?"border-teal-400 bg-teal-500/20":"border-gray-700 bg-gray-800/50"}`} onClick={()=>setSelected("FAN")}>
          <div className="flex items-center gap-3"><Heart className="w-6 h-6 text-teal-400"/><span className="text-white font-semibold">Fan</span></div>
          <p className="text-gray-400 text-sm mt-1">Wspieraj twórców napiwkami</p>
        </button>
        <button className={`p-6 rounded-2xl border ${selected==="CREATOR"?"border-teal-400 bg-teal-500/20":"border-gray-700 bg-gray-800/50"}`} onClick={()=>setSelected("CREATOR")}>
          <div className="flex items-center gap-3"><Palette className="w-6 h-6 text-teal-400"/><span className="text-white font-semibold">Creator</span></div>
          <p className="text-gray-400 text-sm mt-1">Odbieraj wsparcie w USDC</p>
        </button>
      </div>
      <button onClick={proceed} disabled={!selected} className="w-full py-3 rounded-lg bg-teal-600 text-white disabled:opacity-60">Continue</button>
    </div>
  );
}

```

### 6) [Unverified] src/components/onboarding/AuthStep.tsx

Źródło: funkcje logowania OAuth i SIWE oraz redirect do `/choose-username`

```tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useSignMessage, useConnect } from "wagmi";
import { SiweMessage } from "siwe";
import apiClient from "@/lib/apiClient";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";

export default function AuthStep() {
  const router = useRouter();
  const { connectAsync } = useConnect();
  const { signMessageAsync } = useSignMessage();
  const { setTokens, setUserData } = useOnboardingStore(s => s.actions);
  const currentRole = useOnboardingStore(s => s.role);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSocialLogin = (provider: "google" | "twitch") => {
    setLoading(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
    window.location.href = `${backendUrl}/api/v1/auth/${provider}?role=${currentRole}`;
  };

  const handleSiweRegister = async () => {
    setLoading(true);
    setApiError("");
    try {
      const { account, chain } = await connectAsync({ connector: new InjectedConnector() });
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

      const { data: { nonce } } = await apiClient.post(`/auth/siwe/nonce`, { address: account, role: currentRole });

      const message = new SiweMessage({
        domain: window.location.host,
        address: account,
        statement: "Sign in with Ethereum to TipJar+.",
        uri: window.location.origin,
        version: "1",
        chainId: chain!.id,
        nonce,
      });

      const signature = await signMessageAsync({ message: message.prepareMessage() });

      const { data: { user, accessToken } } = await apiClient.post("/auth/siwe/login", {
        message: message.prepareMessage(),
        signature,
        address: account,
        chainId: chain!.id,
        nonce,
      });

      setTokens({ accessToken });
      setUserData({ email: user.email, walletAddress: user.providerId, username: user.displayName });
      router.push("/choose-username");
    } catch (err: any) {
      setApiError(err?.response?.data?.message || err.message || "Web3 registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white">Create your account</h2>
        <p className="text-gray-400 text-sm">Join as a {currentRole === "CREATOR" ? "Creator" : "Fan"}.</p>
      </div>

      <button type="button" onClick={() => handleSocialLogin("google")} disabled={loading} className="w-full py-3 rounded-lg bg-white/20 text-white border border-white/10 disabled:opacity-60">
        Continue with Google
      </button>
      <button type="button" onClick={() => handleSocialLogin("twitch")} disabled={loading} className="w-full py-3 rounded-lg bg-purple-600/80 text-white border border-purple-500/30 disabled:opacity-60">
        Continue with Twitch
      </button>

      <div className="pt-2">
        <button onClick={handleSiweRegister} disabled={loading} className="w-full py-3 rounded-lg bg-teal-600 text-white disabled:opacity-60">
          Sign-In with Ethereum
        </button>
      </div>

      {apiError && <p className="text-red-400 text-sm mt-2">{apiError}</p>}
    </div>
  );
}

```

### 7) [Unverified] app/choose-username/page.tsx

Źródło: wymóg istnienia strony + zależność od roli (render różnego formularza)

```tsx
// app/choose-username/page.tsx
"use client";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChooseUsernamePage() {
  const role = useOnboardingStore(s => s.role);
  const { nextStep, setUserData } = useOnboardingStore(s => s.actions);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const submit = () => {
    setUserData({ username });
    nextStep();
    if (role === "CREATOR") router.push("/"); // TODO: docelowy redirect po konfiguracji
    else router.push("/");
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold text-white mb-2">Choose your username</h1>
      <p className="text-gray-400 text-sm mb-4">This will appear in your public profile URL.</p>
      <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full rounded-lg bg-slate-800 text-white px-3 py-2 border border-slate-700" placeholder="@alias" />
      <button onClick={submit} disabled={!username} className="mt-3 w-full py-3 rounded-lg bg-teal-600 text-white disabled:opacity-60">Continue</button>
      {role === "CREATOR" && <p className="text-xs text-gray-400 mt-2">As a Creator you’ll finish profile setup after this step.</p>}
    </div>
  );
}

```

Krok 1/?: Finalizacja rejestracji i wyboru aliasu. Poniżej komplet plików (App Router + TS + Tailwind) spinających: `/register` → uwierzytelnienie → `/choose-username`. W kodzie zastosowałem ścieżki i zachowania wskazane w dokumentach (redirect do `/choose-username`, metody: email, Google/Twitch, SIWE). Potwierdzenia w cytatach.

### 1) app/(auth)/register/page.tsx

Źródło wymagające tej ścieżki i roli strony-wejścia kreatora:

```tsx
// app/(auth)/register/page.tsx
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <OnboardingWizard />
    </div>
  );
}

```

### 2) src/lib/stores/onboardingStore.ts

[Unverified] Definicja store (kroki z poradnika wdrożenia kreatora; render kroków w OnboardingWizard)

```tsx
// src/lib/stores/onboardingStore.ts
import { create } from "zustand";

export type OnboardingStep =
  | "ROLE_SELECTION"
  | "AUTH_DETAILS"
  | "CHOOSE_USERNAME"
  | "CONSENTS"
  | "CREATOR_SETUP"
  | "COMPLETED";

export type UserRole = "CREATOR" | "FAN";

type State = {
  step: OnboardingStep;
  role: UserRole | null;
  accessToken?: string;
  user?: { email?: string; username?: string; walletAddress?: string };
  actions: {
    setRole: (r: UserRole) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    setTokens: (p: { accessToken: string }) => void;
    setUserData: (u: State["user"]) => void;
  };
};

const ORDER: OnboardingStep[] = [
  "ROLE_SELECTION",
  "AUTH_DETAILS",
  "CHOOSE_USERNAME",
  "CONSENTS",
  "CREATOR_SETUP",
  "COMPLETED",
];

export const useOnboardingStore = create<State>((set, get) => ({
  step: "ROLE_SELECTION",
  role: null,
  actions: {
    setRole: (r) => set({ role: r }),
    nextStep: () => {
      const i = ORDER.indexOf(get().step);
      if (i < ORDER.length - 1) set({ step: ORDER[i + 1] });
    },
    prevStep: () => {
      const i = ORDER.indexOf(get().step);
      if (i > 0) set({ step: ORDER[i - 1] });
    },
    reset: () => set({ step: "ROLE_SELECTION", role: null, user: undefined, accessToken: undefined }),
    setTokens: ({ accessToken }) => set({ accessToken }),
    setUserData: (u) => set({ user: { ...get().user, ...u } }),
  },
}));

```

### 3) src/lib/apiClient.ts

[Unverified] Globalny klient API używany m.in. w SIWE i rejestracji email; zgodny z przepływami w poradniku (użycie `/auth/siwe/*`, `/auth/register`)

```tsx
// src/lib/apiClient.ts
import axios from "axios";
import { useOnboardingStore } from "./stores/onboardingStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api/v1",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useOnboardingStore.getState().accessToken;
  if (token) {
    config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
  }
  return config;
});

export default api;

```

### 4) src/lib/schemas/authSchema.ts

[Unverified] Walidacja formularza e-mail (schemat, który dokument opisuje jako wymagany element logiki rejestracji)

```tsx
// src/lib/schemas/authSchema.ts
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Podaj prawidłowy e-mail"),
  password: z.string().min(8, "Hasło min. 8 znaków"),
  role: z.enum(["CREATOR", "FAN"]),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const usernameSchema = z
  .string()
  .min(3, "Min. 3 znaki")
  .max(30, "Max. 30 znaków")
  .regex(/^[a-zA-Z0-9_]+$/, "Dozwolone: litery, cyfry, podkreślnik");

```

### 5) src/components/onboarding/OnboardingWizard.tsx

Źródło potwierdzające render kroków przez OnboardingWizard:

```tsx
// src/components/onboarding/OnboardingWizard.tsx
"use client";

import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import RoleStep from "./RoleStep";
import AuthStep from "./AuthStep";

export default function OnboardingWizard() {
  const step = useOnboardingStore((s) => s.step);

  if (step === "ROLE_SELECTION") return <RoleStep />;
  if (step === "AUTH_DETAILS") return <AuthStep />;

  // Pozostałe kroki są realizowane osobnymi stronami /choose-username itd.
  return <div className="text-white">Unsupported step in this wizard.</div>;
}

```

### 6) src/components/onboarding/RoleStep.tsx

Wymóg UX na `/register`: interaktywny wybór roli, przycisk „Next” odblokowuje się po wyborze roli

```tsx
// src/components/onboarding/RoleStep.tsx
"use client";

import { useOnboardingStore, UserRole } from "@/lib/stores/onboardingStore";

const ROLES: { key: UserRole; title: string; desc: string }[] = [
  { key: "CREATOR", title: "Creator", desc: "Zarabiaj na wsparciu fanów" },
  { key: "FAN", title: "Fan", desc: "Wspieraj ulubionych twórców" },
];

export default function RoleStep() {
  const role = useOnboardingStore((s) => s.role);
  const { setRole, nextStep } = useOnboardingStore((s) => s.actions);

  return (
    <div className="w-full max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-semibold mb-6">Kim jesteś?</h1>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {ROLES.map((r) => (
          <buttonkey={r.key}
            onClick={() => setRole(r.key)}
            className={`rounded-xl border p-4 text-left transition ${
              role === r.key ? "border-teal-400 bg-teal-950/40" : "border-white/10 hover:border-white/30"
            }`}
          >
            <div className="text-lg font-semibold">{r.title}</div>
            <div className="text-sm opacity-80">{r.desc}</div>
          </button>
        ))}
      </div>
      <buttondisabled={!role}
        onClick={nextStep}
        className="px-4 py-2 rounded-lg bg-teal-500 text-black font-semibold disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

```

### 7) src/components/onboarding/AuthStep.tsx

Email rejestracja → po sukcesie przekierowanie na `/choose-username` (potwierdzone):

Social login przekierowuje przez backend z `role` w URL:

SIWE: nonce → podpis → `/auth/siwe/login` → `/choose-username`:

```tsx
// src/components/onboarding/AuthStep.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "@/lib/schemas/authSchema";
import api from "@/lib/apiClient";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

// SIWE (opcjonalnie) — wymaga Providers (wagmi) w app/layout
// import { useConnect, useSignMessage } from "wagmi";
// import { InjectedConnector } from "wagmi/connectors/injected";
// import { SiweMessage } from "siwe";

export default function AuthStep() {
  const router = useRouter();
  const { role } = useOnboardingStore();
  const { setTokens, setUserData } = useOnboardingStore((s) => s.actions);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema), defaultValues: { role: role ?? "FAN" } });

  const onEmailSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setApiError("");
    try {
      const res = await api.post("/auth/register", data);
      const { user, accessToken } = res.data;
      setTokens({ accessToken });
      setUserData({ email: user?.email, username: user?.displayName });
      router.push("/choose-username"); // zgodnie z poradnikiem
    } catch (e: any) {
      setApiError(e?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  });

  const handleSocialLogin = (provider: "google" | "twitch") => {
    setLoading(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
    window.location.href = `${backendUrl}/api/v1/auth/${provider}?role=${role ?? "FAN"}`;
  };

  // SIWE wariant — odkomentuj po podłączeniu wagmi Providers
  // const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  // const { signMessageAsync } = useSignMessage();
  // const handleSiweRegister = async () => {
  //   try {
  //     setLoading(true);
  //     setApiError("");
  //     const { account, chain } = await connectAsync();
  //     const nonceRes = await api.post(`/auth/siwe/nonce`, { address: account, role });
  //     const { nonce } = nonceRes.data;
  //     const msg = new SiweMessage({
  //       domain: window.location.host,
  //       address: account,
  //       statement: "Sign in with Ethereum to TipJar+.",
  //       uri: window.location.origin,
  //       version: "1",
  //       chainId: chain?.id,
  //       nonce,
  //     }).prepareMessage();
  //     const signature = await signMessageAsync({ message: msg });
  //     const verifyRes = await api.post("/auth/siwe/login", { message: msg, signature, address: account, chainId: chain?.id, nonce });
  //     const { user, accessToken } = verifyRes.data;
  //     setTokens({ accessToken });
  //     setUserData({ email: user.email, walletAddress: user.providerId, username: user.displayName });
  //     router.push("/choose-username");
  //   } catch (e: any) {
  //     setApiError(e?.response?.data?.message || "Web3 registration failed.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="w-full max-w-md mx-auto text-white">
      <h2 className="text-2xl font-semibold mb-4">Utwórz konto</h2>

      <form onSubmit={onEmailSubmit} className="space-y-3 mb-6">
        <input
          {...register("email")}
          type="email"
          placeholder="E-mail"
          className="w-full rounded-lg border border-white/10 bg-white/5 p-3"
        />
        {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="Hasło (min. 8 znaków)"
          className="w-full rounded-lg border border-white/10 bg-white/5 p-3"
        />
        {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

        <input type="hidden" {...register("role")} value={role ?? "FAN"} />

        <button disabled={loading} className="w-full bg-teal-500 text-black rounded-lg py-3 font-semibold disabled:opacity-50">
          Zarejestruj e-mailem
        </button>
      </form>

      <div className="space-y-2">
        <buttontype="button"
          onClick={() => handleSocialLogin("google")}
          disabled={loading}
          className="w-full rounded-lg py-3 border border-white/15 hover:border-white/30"
        >
          Kontynuuj z Google
        </button>
        <buttontype="button"
          onClick={() => handleSocialLogin("twitch")}
          disabled={loading}
          className="w-full rounded-lg py-3 border border-purple-400/30 hover:border-purple-400/60"
        >
          Kontynuuj z Twitch
        </button>
        {/* <button type="button" onClick={handleSiweRegister} disabled={loading} className="w-full rounded-lg py-3 border border-white/15">Sign-In with Ethereum</button> */}
      </div>

      {apiError && <p className="text-red-400 text-sm mt-4">{apiError}</p>}
    </div>
  );
}

```

### 8) app/choose-username/page.tsx

Strona wymagana przez poradnik (docelowy redirect po rejestracji/OAuth/SIWE)

```tsx
// app/choose-username/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/lib/schemas/authSchema";
import api from "@/lib/apiClient";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Form = z.infer<typeof usernameSchema>;

export default function ChooseUsernamePage() {
  const { user } = useOnboardingStore();
  const { setUserData } = useOnboardingStore((s) => s.actions);
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [taken, setTaken] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(usernameSchema) });

  const check = async (username: string) => {
    setChecking(true);
    try {
      const r = await api.get(`/users/check-username`, { params: { username } });
      setTaken(r.data?.available ? null : "Nazwa zajęta");
    } finally {
      setChecking(false);
    }
  };

  const onSubmit = handleSubmit(async ({ 0: _0, ...data }: any) => {
    try {
      await api.post(`/users/set-username`, { username: data.username });
      setUserData({ username: data.username });
      // Doc: po wyborze aliasu generujemy publiczny URL profilu @alias
      router.push(`/dashboard`);
    } catch (e: any) {
      // komunikat z backendu
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-3">
        <h1 className="text-2xl font-semibold">Wybierz swój alias</h1>
        <input
          {...register("username" as any)}
          name="username"
          placeholder="@nazwa_użytkownika"
          className="w-full rounded-lg border border-white/10 bg-white/5 p-3"
          onBlur={(e) => check(e.currentTarget.value)}
        />
        {errors?.username && <p className="text-red-400 text-sm">{(errors as any).username.message}</p>}
        {checking && <p className="text-sm opacity-70">Sprawdzanie dostępności…</p>}
        {taken && <p className="text-red-400 text-sm">{taken}</p>}
        <button className="w-full bg-teal-500 text-black rounded-lg py-3 font-semibold">Zapisz</button>
      </form>
    </div>
  );
}

```

KROK 2/N — Strony publiczne i profil twórcy (Landing, Publiczny profil, Odkrywaj, Learn) + komponenty i kod. Poniżej ten sam format co wcześniej, z cytatami i uzupełnionym kodem App Router (TS + Tailwind). Tam, gdzie mapuję brakujące URL-e lub dynamiczne segmenty, oznaczam to jako [Unverified].

## 1) Strony (page.tsx) — plan plików

| Ścieżka (App Router) | Opis funkcji | Wymagane stany (z DOCUMENT) | Cytat/linia |
| --- | --- | --- | --- |
| app/page.tsx | [Unverified] Landing: wprowadzenie do platformy, CTA do rejestracji/odkrywania. | [Unverified] Statyczna; brak specyfikacji loading/error. | „4.1.1. Strona Główna (Landing Page)” |
| app/(auth)/register/page.tsx | Punkt wejścia do kreatora rejestracji. | I cannot verify this. | „Strona Rejestracji / Logowania” (publiczna) |
| app/creators/[alias]/page.tsx | [Unverified] Publiczny profil twórcy (URL z aliasem). Duży przycisk „Wesprzyj”, alternatywnie adres walleta/QR. | [Unverified] Loading dla danych profilu; error przy 404. | „4.1.2. Publiczny Profil Twórcy”  ; „duży, widoczny przycisk ‘Wesprzyj’… Alternatywnie udostępniamy adres walleta” |
| app/explore/page.tsx | Publiczna lista/katalog twórców: wyszukiwarka, kafelki, ewent. filtry. | [Unverified] Loading listy; error. | „Strona Odkrywaj Twórców (Publiczna)… Wyszukiwarka… Lista/Kafelki Twórców… Filtry/Sortowanie” |
| app/learn/page.tsx | Publiczne Centrum Wiedzy o krypto (FAQ/art.) | I cannot verify this. | „4.1.5. Strona Learn / Centrum Wiedzy o Krypto” |

## 2) Komponenty do utworzenia

| Plik | Użycie (na jakiej stronie) | Kluczowe props (z DOCUMENT) | Cytat/linia |
| --- | --- | --- | --- |
| src/components/creator/ProfileHero.tsx | app/creators/[alias]/page.tsx | [Unverified] `name`, `avatarUrl`, `bannerUrl`, `bio`, `goal` | „Profil twórcy… minimum przeszkód do wysłania napiwku” (priorytet CTA) |
| src/components/creator/SupportButton.tsx | app/creators/[alias]/page.tsx | [Unverified] `onClick` | „duży, widoczny przycisk ‘Wesprzyj’ jest kluczowy” |
| src/components/payments/TipModal.tsx | app/creators/[alias]/page.tsx | [Unverified] `creatorId`, `onSuccess` | „Alternatywnie udostępniamy adres walleta (dla zaawansowanych)” (modal płatności/adresu) |
| src/components/payments/WalletAddressModal.tsx | app/creators/[alias]/page.tsx | [Unverified] `address` | jw. (adres/QR) |
| src/components/explore/SearchBar.tsx | app/explore/page.tsx | [Unverified] `onSearch(query)` | „Wyszukiwarka… wyszukać twórcę po nazwie/aliasie” |
| src/components/explore/CreatorCard.tsx | app/explore/page.tsx | [Unverified] `name`, `alias`, `avatarUrl`, `category`, `stats` | „Lista/Kafelki Twórców… nazwa, miniatura, kategoria, ewentualnie liczba fanów/suma napiwków” |

## 3) Testy (jeśli DOCUMENT to określa)

| Typ | Plik | Scenariusz wymagany przez DOCUMENT | Cytat/linia |
| --- | --- | --- | --- |
| e2e | [Unverified] | Profil twórcy zawiera „Wesprzyj”; klik otwiera modal. | „duży, widoczny przycisk ‘Wesprzyj’” |
| e2e | [Unverified] | Explore: wpisanie zapytania filtruje listę (UI regresyjne). | „Wyszukiwarka… lista/kafelki…” |
| unit | [Unverified] | CreatorCard renderuje nazwę, alias, kategorię. | jw. |

## 4) Nieprzypisane (wymagają decyzji)

- Modal płatności (TipModal) i modal adresu/QR — brak jednoznacznego URL. I cannot verify this. (cytat dot. alternatywnego adresu walleta)
- Zasoby Learn (lista artykułów/FAQ) — brak literalnych ścieżek do artykułów. I cannot verify this. (tylko nagłówek sekcji)

## 5) Reguły i ograniczenia z DOCUMENT

- Na profilu twórcy CTA „Wesprzyj” jest kluczowe; adres walleta to ścieżka alternatywna dla zaawansowanych.
- Explore musi mieć wyszukiwarkę i listę/kafelki z nazwą, miniaturą, kategorią, ewentualnie metryki.
- A11y/UX quick-wins: autofocus na pierwszym błędnym polu, `aria-busy` na przyciskach, toasty po sukcesie.

## 6) Checklista wykonania (bez kodu)

- Utwórz strony: `app/page.tsx`, `app/creators/[alias]/page.tsx` [Unverified], `app/explore/page.tsx`, `app/learn/page.tsx`.
- Dodaj komponenty z sekcji (2).
- W profilach i Explore zachowaj priorytet CTA i prostotę (wg dokumentu).
- Nie dotykaj IMMUTABLE.

---

# Kod uzupełniający (Next.js App Router + TS + Tailwind)

> Uwaga: nazwy plików i propsy zaznaczone [Unverified] to logiczne mapowanie dokumentu na strukturę App Router. Zachowuję styl z kroku 1.
> 

### app/page.tsx (Landing) — [Unverified]

```tsx
// app/page.tsx
export default function LandingPage() {
  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center justify-center text-center text-white">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">TipJar+</h1>
      <p className="mt-3 max-w-2xl text-gray-300">
        Wspieraj ulubionych twórców napiwkami w USDC. Szybko, bezpiecznie, globalnie.
      </p>
      <div className="mt-8 flex gap-3">
        <a href="/(auth)/register" className="px-5 py-3 rounded-lg bg-teal-500 text-black font-semibold">Zacznij jako twórca</a>
        <a href="/explore" className="px-5 py-3 rounded-lg border border-white/15">Odkrywaj twórców</a>
      </div>
    </main>
  );
}

```

### app/creators/[alias]/page.tsx — [Unverified]

```tsx
// app/creators/[alias]/page.tsx
import ProfileHero from "@/components/creator/ProfileHero";
import SupportButton from "@/components/creator/SupportButton";
import TipModal from "@/components/payments/TipModal";
import WalletAddressModal from "@/components/payments/WalletAddressModal";

export default async function CreatorPublicPage({ params }: { params: { alias: string } }) {
  // [Unverified] Server component: pobranie danych profilu po aliasie
  // const profile = await api.get(`/creators/${params.alias}`);
  const profile = { name: params.alias, bannerUrl: "", avatarUrl: "", bio: "", goal: { current: 120, target: 500 } };

  return (
    <div className="min-h-screen">
      <ProfileHeroname={profile.name}
        avatarUrl={profile.avatarUrl}
        bannerUrl={profile.bannerUrl}
        bio={profile.bio}
        goal={profile.goal}
      />

      <section className="px-6 py-6 max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-3">
          <SupportButton creatorAlias={params.alias} />
          <WalletAddressModal address="[Unverified] 0xABC...123" />
        </div>

        {/* [Unverified] Ostatnie wsparcia / lista */}
        <div className="mt-8">
          <h2 className="text-white text-xl font-semibold mb-3">Ostatnie wsparcia</h2>
          <div className="grid gap-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-white/80">fan42: 5 USDC • 2025-08-01 • „Powodzenia!”</div>
          </div>
        </div>
      </section>
    </div>
  );
}

```

### src/components/creator/ProfileHero.tsx — [Unverified]

```tsx
// src/components/creator/ProfileHero.tsx
type Props = {
  name: string;
  avatarUrl: string;
  bannerUrl: string;
  bio: string;
  goal?: { current: number; target: number };
};
export default function ProfileHero({ name, avatarUrl, bannerUrl, bio, goal }: Props) {
  const pct = goal ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : null;
  return (
    <header className="relative">
      <div className="h-48 md:h-56 bg-gradient-to-b from-teal-900/60 to-transparent"
           style={bannerUrl ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: "cover" } : {}} />
      <div className="max-w-4xl mx-auto px-6 -mt-12 pb-4">
        <div className="flex items-end gap-4">
          <div className="w-24 h-24 rounded-full ring-2 ring-teal-400 bg-white/10" style={avatarUrl ? { backgroundImage: `url(${avatarUrl})`, backgroundSize: "cover" } : {}} />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{name}</h1>
            {bio && <p className="text-gray-300 max-w-2xl">{bio}</p>}
          </div>
        </div>
        {pct !== null && (
          <div className="mt-4">
            <div className="h-2 w-full bg-white/10 rounded">
              <div className="h-2 bg-teal-500 rounded" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">Cel: {goal!.current} / {goal!.target} USDC</p>
          </div>
        )}
      </div>
    </header>
  );
}

```

### src/components/creator/SupportButton.tsx — [Unverified]

```tsx
// src/components/creator/SupportButton.tsx
"use client";
import { useState } from "react";
import TipModal from "@/components/payments/TipModal";

export default function SupportButton({ creatorAlias }: { creatorAlias: string }) {
  const [open, setOpen] = useState(false);
  return (
    <><button onClick={() => setOpen(true)} className="px-5 py-3 rounded-lg bg-teal-500 text-black font-semibold">
        Wesprzyj
      </button>
      <TipModal open={open} onClose={() => setOpen(false)} creatorId={creatorAlias} onSuccess={() => setOpen(false)} />
    </>
  );
}

```

### src/components/payments/TipModal.tsx — [Unverified]

```tsx
// src/components/payments/TipModal.tsx
"use client";
import { useState } from "react";

export default function TipModal({
  open, onClose, creatorId, onSuccess,
}: { open: boolean; onClose: () => void; creatorId: string; onSuccess: () => void }) {
  const [amount, setAmount] = useState("5");
  const [loading, setLoading] = useState(false);

  if (!open) return null;
  const submit = async () => {
    setLoading(true);
    try {
      // [Unverified] await api.post(`/tips`, { creatorId, amount: Number(amount) });
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-4 text-white">
        <h3 className="text-lg font-semibold">Wyślij napiwek</h3>
        <inputvalue={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-3 w-full rounded-lg bg-white/10 border border-white/15 p-2"
          inputMode="decimal"
          aria-label="Kwota napiwku (USDC)"
        />
        <div className="mt-4 flex gap-2">
          <button onClick={submit} disabled={loading} aria-busy={loading}
                  className="flex-1 rounded-lg bg-teal-500 text-black py-2 font-semibold disabled:opacity-50">
            Wyślij
          </button>
          <button onClick={onClose} className="flex-1 rounded-lg border border-white/20 py-2">Anuluj</button>
        </div>
      </div>
    </div>
  );
}

```

### src/components/payments/WalletAddressModal.tsx — [Unverified]

```tsx
// src/components/payments/WalletAddressModal.tsx
"use client";
import { useState } from "react";

export default function WalletAddressModal({ address }: { address: string }) {
  const [open, setOpen] = useState(false);
  return (
    <><button onClick={() => setOpen(true)} className="px-5 py-3 rounded-lg border border-white/15 text-white">
        Adres do wpłaty
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-4 text-white">
            <h3 className="text-lg font-semibold mb-2">Adres portfela</h3>
            <code className="block bg-black/40 p-3 rounded">{address}</code>
            {/* [Unverified] Tu można dodać QR */}
            <button onClick={() => setOpen(false)} className="mt-4 w-full rounded-lg border border-white/20 py-2">Zamknij</button>
          </div>
        </div>
      )}
    </>
  );
}

```

### app/explore/page.tsx

```tsx
// app/explore/page.tsx
import SearchBar from "@/components/explore/SearchBar";
import CreatorCard from "@/components/explore/CreatorCard";

export default async function ExplorePage() {
  // [Unverified] Server fetch listy twórców
  // const creators = await api.get('/creators', { params: { q }});
  const creators = [
    { name: "Agnieszka", alias: "aga_music", avatarUrl: "", category: "muzyka", stats: { tips: 120 } },
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Odkrywaj twórców</h1>
      <SearchBar />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {creators.map((c) => (<CreatorCard key={c.alias} {...c} />))}
      </div>
    </main>
  );
}

```

### src/components/explore/SearchBar.tsx

```tsx
// src/components/explore/SearchBar.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  useEffect(() => setQ(params.get("q") ?? ""), [params]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const sp = new URLSearchParams(Array.from(params.entries()));
    if (q) sp.set("q", q); else sp.delete("q");
    router.push(`/explore?${sp.toString()}`);
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input value={q} onChange={(e) => setQ(e.target.value)}
             placeholder="Szukaj po nazwie lub aliasie"
             className="flex-1 rounded-lg bg-white/5 border border-white/10 p-3 text-white" />
      <button className="px-4 rounded-lg bg-teal-500 text-black font-semibold">Szukaj</button>
    </form>
  );
}

```

### src/components/explore/CreatorCard.tsx — [Unverified]

```tsx
// src/components/explore/CreatorCard.tsx
import Link from "next/link";
type Props = { name: string; alias: string; avatarUrl: string; category?: string; stats?: { tips?: number } };
export default function CreatorCard({ name, alias, avatarUrl, category, stats }: Props) {
  return (
    <Link href={`/creators/${alias}`} className="block rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-teal-400/50">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/10" style={avatarUrl ? { backgroundImage: `url(${avatarUrl})`, backgroundSize: "cover" } : {}} />
        <div>
          <div className="text-white font-semibold">{name}</div>
          <div className="text-xs text-gray-400">@{alias}{category ? ` • ${category}` : ""}</div>
        </div>
      </div>
      {stats?.tips !== undefined && <div className="mt-3 text-sm text-gray-300">Suma napiwków: {stats.tips} USDC</div>}
    </Link>
  );
}

```

### app/learn/page.tsx

```tsx
// app/learn/page.tsx
export default function LearnPage() {
  // I cannot verify this. (brak listy artykułów w dokumentach)
  const topics = [
    { t: "Jak kupić USDC?", d: "Prosty przewodnik krok po kroku." },
    { t: "Polecane portfele", d: "MetaMask, Rabby, Coinbase Wallet – plusy i minusy." },
  ];
  return (
    <main className="max-w-3xl mx-auto px-6 py-10 text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Centrum Wiedzy</h1>
      <ul className="space-y-3">
        {topics.map((x) => (
          <li key={x.t} className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="font-semibold">{x.t}</div>
            <div className="text-gray-300 text-sm">{x.d}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}

```

# KROK 3/N — „Redakcyjny Minimalizm” w praktyce

Specyfikacja systemu projektowego + budżety wydajności + zasady dostępności + ramy eksperymentów A/B (Next.js + TypeScript + Tailwind)

## 1) Decyzja strategiczna → implikacje dla produktu

- Kierunek: hybryda „Luksusowy Edytorial” (narracja, prestiż) + „Minimalistyczny SaaS” (czytelność, prędkość). „Tech-Premium” tylko do wybranych wizualizacji danych.
- Cele: krótka ścieżka wsparcia (tip), czytelne karty w katalogu, profil jako moduł konwersji.
- Budżety techniczne (Core Web Vitals, docelowe): LCP ≤ 2.5s (desktop) / 3.5s (mobile), CLS < 0.1, INP < 200 ms, TTFB < 800 ms.

## 2) Design Tokens (Tailwind) — paleta, typografia, przestrzeń, promienie

**Kolory (light/dark, przykładowe, kontrast sprawdzać automatem CI):**

- `-color-bg`: `#0F1214` (dark), `#FFFFFF` (light)
- `-color-fg`: `#E7ECF0` (dark), `#0F1214` (light)
- `-color-primary`: `#0EA5A6` (teal)
- `-color-accent`: `#FFD166` (złoty, jako akcent redakcyjny)
- Semantic: `-success:#10B981`, `-warning:#F59E0B`, `-danger:#EF4444`, `-info:#3B82F6`
- Surface: `-surface-1:#12181B`, `-surface-2:#0B0F10`, `-surface-3:#1E262B`
    
    [Unverified] Dobór wartości zachowuje styl premium bez łamania kontrastów na dark; dokładne pary kolor/tło walidować w CI.
    

**Typografia (para „edytorial + neutralny UI”):**

- Nagłówki: „Playfair Display”/„Fraunces” (szeryf)
- Treść/UI: „Inter”/„IBM Plex Sans”
- Skala (rem): h1 3.0, h2 2.25, h3 1.75, h4 1.5, body 1.0, small 0.875

**Przestrzeń i promienie:**

- Space scale: 2, 4, 6, 8, 12, 16, 24, 32
- Radius: sm 6px, md 12px, lg 16px, xl 20px, 2xl 24px (miękkie „premium”)

**Tailwind — szkic konfigu (fragment):**

```tsx
// tailwind.config.ts (fragment tokens)
theme: {
  extend: {
    colors: {
      bg: "var(--color-bg)",
      fg: "var(--color-fg)",
      primary: "var(--color-primary)",
      accent: "var(--color-accent)",
      success: "var(--success)",
      warning: "var(--warning)",
      danger: "var(--danger)",
      info: "var(--info)",
      surface: {
        1: "var(--surface-1)",
        2: "var(--surface-2)",
        3: "var(--surface-3)",
      },
    },
    fontFamily: {
      display: ['"Playfair Display"', "serif"],
      sans: ['Inter', "system-ui", "sans-serif"],
    },
    borderRadius: { md: "12px", lg: "16px", xl: "20px", "2xl": "24px" },
  }
}

```

## 3) Zasady komponentów i stany (A11y + Redakcyjny Minimalizm)

**Przyciski (CTA):** primary (wypełniony), secondary (obrys), subtle (tło surface-2). Stany: default, hover, active, focus-visible (2px outline o kontraście ≥ 3:1), disabled. Etykiety zorientowane na działanie: „Wesprzyj twórcę”, „Dołącz”.

**Formularze:** etykiety widoczne zawsze, opisy „hint”, błędy pod polem, `aria-invalid`, `aria-describedby`, autofocus na pierwszym błędnym.

**Karty twórców (katalog):** avatar, nazwa, specjalizacja/slogan, 1 kluczowa metryka, CTA „Zobacz profil”. Unikamy „szumu” (1–2 linie treści).

**Profil twórcy:**

- Hero: portret/baner (z srcset), nazwa + krótki slogan, główne CTA (tip/subskrypcja).
- Moduły: Poziomy wsparcia, Siatka treści, Tip widget (predefiniowane wartości + własna), Sekcja społeczności.
    
    **Modale:** `role="dialog"`, `aria-modal="true"`, fokus łapany w modalu, zamknięcie Esc/overlay, `prefers-reduced-motion` respektowane.
    
    **Ruch:** 150–220 ms, ease-out; tylko informacyjny (feedback, kierowanie uwagi), bez „efektów dla efektu”.
    

## 4) Wydajność z założenia (Next.js)

- **Hero (LCP):** `<Image>` z `priority`, `fetchPriority="high"`, właściwym `sizes`; warianty AVIF/WebP przez loader; maks. 1 duży hero na stronę.
- **Srcset:** obowiązkowe dla uploadów twórców (min. 3 progi szerokości).
- **Preconnect/Preload:** fonty (display swap), krytyczne zasoby danych.
- **Lazy**: treści poniżej „folda”, modale, grafiki galerii.
- **Bundle diet:** brak globalnych ciężkich 3D; dashboardowe wizualizacje ładowane „on demand”.

## 5) Katalog (Explore) — filtry i wyszukiwanie

- Pasek wyszukiwania (NLP później); natychmiastowa odpowiedź UI.
- Filtry wielokrotnego wyboru: Kategoria, Lokalizacja, Tagi, Publiczność (zakres), Monetyzacja, Aktywność.
- Desktop: stała kolumna filtrów po lewej; Mobile: wysuwany sheet.
- Karta reaguje na filtry (pokazuje właśnie filtrowane atrybuty).

## 6) Mapowanie do kodu (Next.js + Tailwind)

**Kluczowe strony:**

- `/creators/[alias]` profil (Hero, Tip widget, Poziomy, Treści, Społeczność).
- `/explore` katalog (SearchBar, SidebarFilters, CreatorCard grid).
    
    **Bazowe komponenty UI:** `Button`, `Input`, `Select`, `Card`, `Modal`, `Tabs`, `Toast`, `Tooltip`.
    
    **Specyficzne komponenty:** `TipWidget`, `TierList`, `ContentGrid`, `CommunityPanel`, `CreatorCard`, `SearchBar`, `SidebarFilters`.
    

**Przykład: Button (varianty + focus-ring):**

```tsx
type Variant = "primary" | "secondary" | "subtle";
export function Button({variant="primary", ...p}: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: Variant}) {
  const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const map = {
    primary:  "bg-primary text-black hover:opacity-90 focus-visible:ring-primary",
    secondary:"border border-fg/20 text-fg hover:border-fg/40 focus-visible:ring-fg/60",
    subtle:   "bg-surface-2 text-fg hover:bg-surface-3 focus-visible:ring-fg/40",
  } as const;
  return <button className={`${base} ${map[variant]}`} {...p} />;
}

```

**Przykład: Tip widget (predefiniowane kwoty + custom):**

```tsx
export function TipWidget({onSubmit}:{onSubmit:(amount:number)=>void}) {
  const presets = [3,5,10,25];
  const [amt,setAmt] = useState<number>(presets[1]);
  return (
    <div role="form" aria-label="Wyślij napiwek" className="p-4 rounded-2xl border border-white/10 bg-surface-1">
      <div className="flex gap-2">{presets.map(v=>
        <button key={v} onClick={()=>setAmt(v)} className={`px-3 py-2 rounded-lg ${amt===v?"bg-primary text-black":"bg-surface-2 text-fg/80"}`}>{v} USDC</button>
      )}</div>
      <div className="mt-2 flex gap-2">
        <input inputMode="decimal" aria-label="Własna kwota" className="flex-1 rounded-lg bg-surface-2 p-2" onChange={e=>setAmt(Number(e.target.value||0))}/>
        <Button onClick={()=>onSubmit(amt)}>Wesprzyj</Button>
      </div>
    </div>
  );
}

```

## 7) A11y — checklista WCAG 2.1 AA (wybrane)

- Kontrast tekstu ≥ 4.5:1; elementy interfejsu ≥ 3:1.
- `:focus-visible` zawsze widoczny; kolejność fokusu zgodna z DOM; bez dodatnich `tabindex`.
- Pełna obsługa klawiaturą (2.1.1) i brak pułapek (2.1.2); modale blokują tło i ogniskują fokus; Esc zamyka.
- Semantyka: `<main>`, `<nav>`, `<button>`, `<form>`; ARIA tylko tam, gdzie brak natywnego elementu.

## 8) Ramy eksperymentów A/B (ciągłe doskonalenie)

- **Hipotezy startowe:**
    
    H1: CTA „Wesprzyj” jako większy, kontrastowy przycisk nad foldem ↑ konwersję pierwszego napiwku.
    
    H2: Karta twórcy z 1 kluczową metryką ↑ CTR do profilu vs. karta bez metryki.
    
- **Metryki podstawowe:** CVR do tipu, CTR z katalogu, średni napiwek, czas do pierwszego napiwku, bounce rate z profilu, LCP/INP.
- **Guardraile:** CLS, błędy JS, wzrost TTFB/LCP.
- **Projekt eksperymentu:** randomizacja po użytkowniku, min. 1 pełny tydzień, minimalizacja „peekahead”.
- **Analityka:** eventy „view_profile”, „tap_tip”, „tip_success”, „explore_click_card”, atrybuty: rola, kraj, urządzenie, wariant.
- **Decyzje:** rollout jeśli efekt istotny statystycznie i brak regresji guardrail.

## 9) Plan wdrożenia i kontrola jakości

- **Tydz. 1–2:** wdrożenie tokens + Button/Input/Card/Modal; Landing i Explore szkielet; check kontrastów w CI.
- **Tydz. 3–4:** profil twórcy (Hero + TipWidget + TierList); obrazy z srcset; pomiary LCP.
- **Tydz. 5:** filtrowanie katalogu; śledzenie analytics; A/B H1.
- **Kontrola:** PR checklist (A11y, CWV, i18n, dark/light), automatyczne testy kontrastu i „axe” w CI, Lighthouse budżety.

# KROK 4/N — Panel Fana i Panel Twórcy

Zakres: strony App Router, kluczowe komponenty, minimalne testy krytycznych przepływów, checklista QA. Kod w TS + Tailwind, bez zmian w IMMUTABLE.

---

## 1) Strony (page.tsx) — plan plików

| Ścieżka | Opis funkcji | Wymagane stany |
| --- | --- | --- |
| app/feed/page.tsx | Tablica aktywności fana (ostatnie wsparcia, sugestie) | loading, empty, error |
| app/wallet/page.tsx | Portfel fana (saldo USDC, historia, wpłata/wypłata) | loading, error, success |
| app/following/page.tsx | Lista obserwowanych twórców | loading, empty |
| app/notifications/page.tsx | Powiadomienia fana | loading, empty, read/unread |
| app/settings/page.tsx | Ustawienia konta fana | loading, error, saved |
| app/dashboard/layout.tsx | Layout panelu twórcy (Sidebar + Header) | n/d |
| app/dashboard/page.tsx | Pulpit: metryki, wykres, ostatnie napiwki | loading, error, empty |
| app/dashboard/profile/page.tsx | Edytor profilu publicznego | loading, error, saved |
| app/dashboard/withdrawals/page.tsx | Wypłaty USDC (EOA) | loading, error, success |
| app/dashboard/goal/page.tsx | Cel finansowy (opcjonalnie) | loading, saved |
| app/dashboard/subscriptions/page.tsx | Subskrypcje (opcjonalnie) | loading, empty |

---

## 2) Komponenty do utworzenia

| Plik | Użycie | Kluczowe props |
| --- | --- | --- |
| src/components/ui/Sidebar.tsx | dashboard layout | `items: {href: string; label: string; icon?: ReactNode}[]` |
| src/components/ui/HeaderBar.tsx | dashboard layout | `title?: string; actions?: ReactNode` |
| src/components/dashboard/TipStatistics.tsx | /dashboard | `series: number[]; total: number; fans: number` |
| src/components/dashboard/ProfileForm.tsx | /dashboard/profile | `initial?: CreatorProfile; onSubmit(values)` |
| src/components/dashboard/WithdrawalForm.tsx | /dashboard/withdrawals | `balance: number; onSubmit({amount,address})` |
| src/components/dashboard/GoalForm.tsx | /dashboard/goal | `initial?: Goal; onSubmit(values)` |
| src/components/dashboard/SubscriptionsList.tsx | /dashboard/subscriptions | `items: Subscription[]` |

---

## 3) Testy (minimalne krytyczne)

| Typ | Scenariusz |
| --- | --- |
| e2e | Tip flow: klik „Wesprzyj” → modal → submit → success toast |
| e2e | Withdraw flow: wypełnij adres+kwotę → submit → success |
| unit | TipStatistics: renderuje sumę i SVG-sparkline dla serii |
| unit | ProfileForm: walidacja wymaganych pól (nazwa, alias) |

---

## 4) Checklista QA (Lighthouse + A11y)

- LCP ≤ 2.5s (desktop), CLS < 0.1, INP < 200 ms; font `display=swap`.
- Kontrast przycisków i focus ring ≥ 3:1; obsługa klawiaturą; modale z focus trap; Esc zamyka.
- Telemetria: `view_dashboard`, `save_profile`, `request_withdrawal`, `view_feed`.

---

# 5) Kod (Next.js App Router + TS + Tailwind)

> Uwaga: API-fetch zastąpione szkicami (// TODO: fetch). Komponenty lekkie; wykres to inline SVG (bez ciężkich bibliotek).
> 

### app/dashboard/layout.tsx

```tsx
// app/dashboard/layout.tsx
import Sidebar from "@/components/ui/Sidebar";
import HeaderBar from "@/components/ui/HeaderBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { href: "/dashboard", label: "Pulpit" },
    { href: "/dashboard/profile", label: "Profil" },
    { href: "/dashboard/withdrawals", label: "Wypłaty" },
    { href: "/dashboard/goal", label: "Cel" },
    { href: "/dashboard/subscriptions", label: "Subskrypcje" },
  ];
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] bg-[var(--surface-2)] text-[var(--fg)]">
      <aside className="border-r border-white/10"><Sidebar items={items} /></aside>
      <div className="min-h-screen">
        <HeaderBar title="Panel twórcy" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

```

### app/dashboard/page.tsx

```tsx
// app/dashboard/page.tsx
import TipStatistics from "@/components/dashboard/TipStatistics";

export default async function DashboardPage() {
  // TODO: fetch series/summary
  const series = [2, 3, 1, 5, 4, 6, 8, 5, 7, 9, 11, 10];
  const total = 1245; const fans = 86;
  const lastTips = [{ fan: "aga42", amount: 5, time: "2h" }];

  return (
    <div className="space-y-6">
      <TipStatistics series={series} total={total} fans={fans} />
      <section>
        <h2 className="text-xl font-semibold">Ostatnie napiwki</h2>
        <div className="mt-3 grid gap-2">
          {lastTips.map((t, i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3">
              <span className="font-semibold">{t.fan}</span> • {t.amount} USDC • {t.time} temu
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

```

### app/dashboard/profile/page.tsx

```tsx
// app/dashboard/profile/page.tsx
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function ProfileSettingsPage() {
  const initial = { name: "", alias: "", bio: "", links: { youtube: "", twitch: "" }, goal: { target: 500, current: 120 } };
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Ustawienia profilu</h1>
      <ProfileForm initial={initial} onSubmit={async (v)=>{/* TODO: save */}} />
    </div>
  );
}

```

### app/dashboard/withdrawals/page.tsx

```tsx
// app/dashboard/withdrawals/page.tsx
import WithdrawalForm from "@/components/dashboard/WithdrawalForm";

export default function WithdrawalsPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Wypłaty</h1>
      <WithdrawalForm balance={342.5} onSubmit={async (p)=>{/* TODO: call API */}} />
    </div>
  );
}

```

### app/dashboard/goal/page.tsx

```tsx
// app/dashboard/goal/page.tsx
import GoalForm from "@/components/dashboard/GoalForm";

export default function GoalPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Cel finansowy</h1>
      <GoalForm initial={{ title: "Nowy mikrofon", target: 500, deadline: "" }} onSubmit={async (v)=>{/* TODO */}} />
    </div>
  );
}

```

### app/dashboard/subscriptions/page.tsx

```tsx
// app/dashboard/subscriptions/page.tsx
import SubscriptionsList from "@/components/dashboard/SubscriptionsList";

export default function SubscriptionsPage() {
  const items = [{ fan: "neo77", amount: 5, period: "mies." }];
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Subskrypcje</h1>
      <SubscriptionsList items={items} />
    </div>
  );
}

```

### app/feed/page.tsx

```tsx
// app/feed/page.tsx
export default function FeedPage() {
  const items = [{ type: "tip_thanks", creator: "marta_art", amount: 5, time: "1d" }];
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Twoja aktywność</h1>
      <div className="grid gap-2">
        {items.map((x,i)=>(
          <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3">
            {x.type==="tip_thanks" ? <>Twórca <b>{x.creator}</b> podziękował za {x.amount} USDC • {x.time}</> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

```

### app/wallet/page.tsx

```tsx
// app/wallet/page.tsx
export default function WalletPage() {
  const balance = 42.75;
  const tx = [{ id: "tx1", kind: "tip", amount: -5, ts: "2025-08-20" }, { id: "tx2", kind: "deposit", amount: +50, ts: "2025-08-18" }];
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Portfel</h1>
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-6">
        <div className="text-sm opacity-80">Saldo</div>
        <div className="text-3xl font-bold">{balance.toFixed(2)} USDC</div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Historia</h2>
      <div className="grid gap-2">
        {tx.map(t=>(
          <div key={t.id} className="rounded-xl bg-white/5 border border-white/10 p-3 flex justify-between">
            <span className="capitalize">{t.kind}</span>
            <span className={t.amount<0?"text-red-300":"text-green-300"}>{t.amount>0?"+":""}{t.amount} USDC</span>
            <span className="opacity-70">{t.ts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

```

### app/following/page.tsx

```tsx
// app/following/page.tsx
import Link from "next/link";
export default function FollowingPage() {
  const creators = [{ alias: "aga_music", name: "Aga" }];
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Obserwowani</h1>
      <div className="grid gap-3">
        {creators.map(c=>(
          <Link key={c.alias} href={`/creators/${c.alias}`} className="rounded-xl bg-white/5 border border-white/10 p-4 hover:border-primary/50">
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm opacity-75">@{c.alias}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

```

### app/notifications/page.tsx

```tsx
// app/notifications/page.tsx
export default function NotificationsPage() {
  const items = [{ id: 1, text: "Nowy post od @aga_music", unread: true }];
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Powiadomienia</h1>
      <div className="grid gap-2">
        {items.map(n=>(
          <div key={n.id} className={`rounded-xl border p-3 ${n.unread?"bg-primary/10 border-primary/30":"bg-white/5 border-white/10"}`}>{n.text}</div>
        ))}
      </div>
    </div>
  );
}

```

### app/settings/page.tsx

```tsx
// app/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Ustawienia</h1>
      <form className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm opacity-80">E-mail</span>
          <input className="rounded-lg bg-white/5 border border-white/10 p-2" placeholder="you@example.com" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm opacity-80">Nowe hasło</span>
          <input type="password" className="rounded-lg bg-white/5 border border-white/10 p-2" />
        </label>
        <button className="rounded-lg bg-primary text-black font-semibold px-4 py-2">Zapisz</button>
      </form>
    </div>
  );
}

```

---

## 6) Komponenty

### src/components/ui/Sidebar.tsx

```tsx
// src/components/ui/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ items }: { items: { href: string; label: string }[] }) {
  const path = usePathname();
  return (
    <nav className="p-4 space-y-1">
      {items.map(it => {
        const active = path === it.href;
        return (
          <Link key={it.href} href={it.href}
            className={`block px-3 py-2 rounded-lg transition ${active ? "bg-primary text-black" : "hover:bg-white/5 text-[var(--fg)]"}`}>
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}

```

### src/components/ui/HeaderBar.tsx

```tsx
// src/components/ui/HeaderBar.tsx
export default function HeaderBar({ title, actions }: { title?: string; actions?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 bg-[var(--surface-2)]/75 backdrop-blur border-b border-white/10">
      <div className="h-14 px-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div>{actions}</div>
      </div>
    </header>
  );
}

```

### src/components/dashboard/TipStatistics.tsx

```tsx
// src/components/dashboard/TipStatistics.tsx
function Spark({ series }: { series: number[] }) {
  const W = 240, H = 64;
  const max = Math.max(1, ...series);
  const pts = series.map((v, i) => {
    const x = (i / (series.length - 1)) * (W - 8) + 4;
    const y = H - 4 - (v / max) * (H - 8);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Wykres napiwków">
      <polyline points={pts} fill="none" stroke="currentColor" strokeOpacity="0.8" strokeWidth="2" />
    </svg>
  );
}
export default function TipStatistics({ series, total, fans }: { series: number[]; total: number; fans: number }) {
  return (
    <section className="grid sm:grid-cols-3 gap-4">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-sm opacity-80">Łącznie USDC</div>
        <div className="text-2xl font-bold">{total}</div>
      </div>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-sm opacity-80">Liczba fanów</div>
        <div className="text-2xl font-bold">{fans}</div>
      </div>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-center">
        <Spark series={series} />
      </div>
    </section>
  );
}

```

### src/components/dashboard/ProfileForm.tsx

```tsx
// src/components/dashboard/ProfileForm.tsx
"use client";
import { useState } from "react";

export type CreatorProfile = {
  name: string; alias: string; bio: string;
  links?: { youtube?: string; twitch?: string; twitter?: string };
  goal?: { target: number; current?: number };
};
export default function ProfileForm({ initial, onSubmit }:{
  initial?: CreatorProfile; onSubmit: (v: CreatorProfile)=>Promise<void> | void;
}) {
  const [v,setV] = useState<CreatorProfile>(initial ?? { name:"", alias:"", bio:"" });
  const [saving,setSaving] = useState(false);
  const change = (k:keyof CreatorProfile, val:any)=> setV(s=>({...s,[k]:val}));

  return (
    <form onSubmit={async e=>{e.preventDefault(); setSaving(true); await onSubmit(v); setSaving(false);}}
          className="grid gap-3">
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Nazwa</span>
        <input required value={v.name} onChange={e=>change("name", e.target.value)}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
      </label>
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Alias</span>
        <input required value={v.alias} onChange={e=>change("alias", e.target.value)}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
      </label>
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Bio</span>
        <textarea value={v.bio} onChange={e=>change("bio", e.target.value)}
                  className="rounded-lg bg-white/5 border border-white/10 p-2 min-h-[120px]"/>
      </label>

      <fieldset className="grid sm:grid-cols-2 gap-3 p-3 rounded-xl border border-white/10">
        <legend className="px-2 text-sm opacity-80">Linki</legend>
        <input placeholder="YouTube URL" value={v.links?.youtube ?? ""} onChange={e=>setV(s=>({ ...s, links:{...s.links, youtube:e.target.value} }))}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
        <input placeholder="Twitch URL" value={v.links?.twitch ?? ""} onChange={e=>setV(s=>({ ...s, links:{...s.links, twitch:e.target.value} }))}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
      </fieldset>

      <fieldset className="grid sm:grid-cols-[1fr_1fr] gap-3 p-3 rounded-xl border border-white/10">
        <legend className="px-2 text-sm opacity-80">Cel</legend>
        <input type="number" min={0} placeholder="Kwota docelowa (USDC)"
               value={v.goal?.target ?? 0} onChange={e=>setV(s=>({ ...s, goal:{...s.goal, target:Number(e.target.value||0)} }))}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
        <input type="number" min={0} placeholder="Obecny postęp"
               value={v.goal?.current ?? 0} onChange={e=>setV(s=>({ ...s, goal:{...s.goal, current:Number(e.target.value||0)} }))}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
      </fieldset>

      <button disabled={saving} aria-busy={saving}
              className="rounded-lg bg-[var(--color-primary)] text-black font-semibold px-4 py-2">
        Zapisz profil
      </button>
    </form>
  );
}

```

### src/components/dashboard/WithdrawalForm.tsx

```tsx
// src/components/dashboard/WithdrawalForm.tsx
"use client";
import { useState } from "react";

export default function WithdrawalForm({ balance, onSubmit }:{
  balance: number; onSubmit: (p:{amount:number; address:string})=>Promise<void> | void;
}) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ amount: Number(amount), address });
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="rounded-xl bg-white/5 border border-white/10 p-3">
        <div className="text-sm opacity-80">Dostępne saldo</div>
        <div className="text-xl font-bold">{balance.toFixed(2)} USDC</div>
      </div>
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Kwota</span>
        <input inputMode="decimal" required value={amount} onChange={e=>setAmount(e.target.value)}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
      </label>
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Adres wypłaty (EOA)</span>
        <input required value={address} onChange={e=>setAddress(e.target.value)}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
      </label>
      <div className="flex gap-2">
        <button type="submit" disabled={loading} aria-busy={loading}
                className="rounded-lg bg-[var(--color-primary)] text-black font-semibold px-4 py-2">Wypłać</button>
        <button type="button" onClick={()=>setAmount(String(balance))} className="rounded-lg border border-white/20 px-4 py-2">Wypłać wszystko</button>
      </div>
    </form>
  );
}

```

### src/components/dashboard/GoalForm.tsx

```tsx
// src/components/dashboard/GoalForm.tsx
"use client";
import { useState } from "react";
export type Goal = { title: string; target: number; deadline?: string };
export default function GoalForm({ initial, onSubmit }:{ initial?: Goal; onSubmit:(v:Goal)=>Promise<void>|void }) {
  const [v, setV] = useState<Goal>(initial ?? { title:"", target:0, deadline:"" });
  return (
    <form onSubmit={async e=>{e.preventDefault(); await onSubmit(v);}} className="grid gap-3">
      <input className="rounded-lg bg-white/5 border border-white/10 p-2" placeholder="Tytuł" value={v.title} onChange={e=>setV(s=>({...s,title:e.target.value}))}/>
      <input type="number" min={0} className="rounded-lg bg-white/5 border border-white/10 p-2" placeholder="Kwota docelowa (USDC)" value={v.target} onChange={e=>setV(s=>({...s,target:Number(e.target.value||0)}))}/>
      <input type="date" className="rounded-lg bg-white/5 border border-white/10 p-2" value={v.deadline} onChange={e=>setV(s=>({...s,deadline:e.target.value}))}/>
      <button className="rounded-lg bg-[var(--color-primary)] text-black font-semibold px-4 py-2">Zapisz cel</button>
    </form>
  );
}

```

### src/components/dashboard/SubscriptionsList.tsx

```tsx
// src/components/dashboard/SubscriptionsList.tsx
type Subscription = { fan: string; amount: number; period: string };
export default function SubscriptionsList({ items }: { items: Subscription[] }) {
  if (!items.length) return <p className="opacity-70">Brak subskrypcji.</p>;
  return (
    <div className="grid gap-2">
      {items.map((s,i)=>(
        <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3 flex justify-between">
          <span>@{s.fan}</span><span>{s.amount} USDC / {s.period}</span>
        </div>
      ))}
    </div>
  );
}

```

# KROK 5/N — Integracja API, stany ładowania/błędów, telemetria, testy E2E

Next.js App Router + TypeScript + Tailwind. Bez zmian w IMMUTABLE (`app/globals.css`, `app/layout.tsx`, `tailwind.config.ts`).

## 1) Strony (page.tsx) — plan integracji

| Ścieżka | Dane (kluczowe zapytania) | Stany UI | Zdarzenia (telemetria) |
| --- | --- | --- | --- |
| `app/creators/[alias]/page.tsx` | GET `/creators/{alias}`; GET `/tips?creator={id}&limit=...` | `LoadingSkeleton`, `ErrorState`, `Success` | `view_profile`, `tap_tip`, `tip_success` |
| `app/explore/page.tsx` | GET `/creators?q=&filters=...` | `LoadingSkeleton`, `EmptyState` | `explore_search`, `explore_click_card` |
| `app/learn/page.tsx` | (statyczne lub CMS) | n/d | `view_learn_article` |
| `app/(auth)/register/page.tsx` | POST `/auth/register`; OAuth redirect; SIWE | `isSubmitting`, `error` | `auth_register_start/success/fail` |
| `app/choose-username/page.tsx` | GET `/users/check-username`; POST `/users/set-username` | `checking`, `error`, `saved` | `username_check`, `username_set` |
| `app/feed/page.tsx` | GET `/me/feed` | `Loading`, `Empty` | `view_feed` |
| `app/wallet/page.tsx` | GET `/me/wallet`; GET `/me/transactions` | `Loading`, `Error` | `view_wallet`, `wallet_tx_click` |
| `app/following/page.tsx` | GET `/me/following` | `Loading`, `Empty` | `view_following` |
| `app/notifications/page.tsx` | GET `/me/notifications`; POST `/me/notifications/read` | `Loading`, `Empty`, `Unread/Read` | `view_notifications`, `mark_read` |
| `app/settings/page.tsx` | GET `/me`; PATCH `/me` | `Loading`, `Saved` | `settings_save` |
| `app/dashboard/page.tsx` | GET `/creator/stats`; GET `/creator/tips?limit` | `Loading`, `Error`, `Empty` | `view_dashboard` |
| `app/dashboard/profile/page.tsx` | GET `/creator/profile`; PATCH `/creator/profile` | `Loading`, `Saved` | `profile_save` |
| `app/dashboard/withdrawals/page.tsx` | GET `/creator/balance`; POST `/creator/withdraw` | `Loading`, `Error`, `Success` | `withdraw_request/success/fail` |
| `app/dashboard/goal/page.tsx` | GET `/creator/goals`; POST `/creator/goals` | `Loading`, `Saved` | `goal_save` |
| `app/dashboard/subscriptions/page.tsx` | GET `/creator/subscriptions` | `Loading`, `Empty` | `view_subscriptions` |

## 2) Komponenty do utworzenia

| Plik | Użycie | Kluczowe props |
| --- | --- | --- |
| `src/lib/api/http.ts` | klient HTTP (Axios/Fetch) | — |
| `src/lib/api/contracts.ts` | typy DTO | `User, CreatorProfile, Tip, Wallet, Tx, Stats, Notification` |
| `src/lib/api/endpoints.ts` | stałe ścieżek | `AUTH, USERS, CREATORS, TIPS...` |
| `src/lib/api/queries.ts` | hooki danych | `useCreator(alias)`, `useExplore(q)`, `useWallet()`, `useStats()` |
| `src/components/ui/LoadingSkeleton.tsx` | stany ładowania | `lines?: number` |
| `src/components/ui/ErrorState.tsx` | błąd z retry | `message`, `onRetry` |
| `src/components/ui/AsyncBoundary.tsx` | boundary (error+fallback) | `children`, `fallback` |
| `src/lib/analytics/track.ts` | telemetria | `track(event, props?)` |
| `src/lib/api/errors.ts` | normalizacja błędów | `normalize(err): {code,msg,fields?}` |

## 3) Testy (minimalny zakres)

| Typ | Plik | Scenariusz |
| --- | --- | --- |
| unit | `api/errors.spec.ts` | mapowanie HTTP 4xx/5xx → komunikaty |
| unit | `queries.spec.ts` | `useCreator` ładuje i cache’uje; retry=1 |
| e2e | `profile_tip.spec.ts` | profil → „Wesprzyj” → sukces/komunikat |
| e2e | `withdraw.spec.ts` | wypłata kwoty; walidacja adresu; success toast |
| e2e | `username.spec.ts` | check-username debounce → set-username |

## 4) Nieprzypisane (wymagają decyzji)

- Guardy autoryzacji (middleware vs. client-side redirect).
- Caching SSR/ISR dla profili i katalogu.
- Polityka retry/backoff (domyślnie 1×).
- Nazewnictwo eventów analitycznych (schemat).

## 5) Reguły i ograniczenia (egzekwowalne)

- `NEXT_PUBLIC_BACKEND_URL` obowiązkowe; brak hardcode.
- Idempotency-Key dla POST wrażliwych (rejestracja, tip, withdraw).
- `aria-busy` na przyciskach podczas `isLoading`; skeleton zamiast „mrugających” layoutów.
- Budżety CWV: LCP ≤ 2.5s/3.5s, CLS < 0.1, INP < 200 ms (odrzucaj PR naruszające).

## 6) Checklista wykonania

1. Dodać warstwę API (`http.ts`, `contracts.ts`, `endpoints.ts`, `errors.ts`).
2. Dodać hooki (`queries.ts`) i podpiąć do stron z kroku 2 i 4.
3. Wstawić `LoadingSkeleton`/`ErrorState` w każdej stronie z tabeli (1).
4. Dodać `track.ts` i wywołania eventów z tabeli (1).
5. Uruchomić testy unit i e2e; dodać do CI.

---

## Kod (skrócony, produkcyjny szkielet)

### `src/lib/api/http.ts`

```tsx
import axios, { AxiosError } from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/,'') + "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});
api.interceptors.request.use(cfg => {
  cfg.headers = { ...cfg.headers, "Idempotency-Key": crypto.randomUUID() };
  return cfg;
});
export type HttpError = AxiosError<{ message?: string; errors?: Record<string,string[]> }>;
export default api;

```

### `src/lib/api/contracts.ts`

```tsx
export type User = { id: string; email: string; role: "CREATOR"|"FAN"; displayName?: string };
export type CreatorProfile = { id: string; alias: string; name: string; bio?: string; avatarUrl?: string; bannerUrl?: string; goal?: { target: number; current: number } };
export type Tip = { id: string; amount: number; fanName?: string; message?: string; createdAt: string };
export type Wallet = { balance: number; currency: "USDC" };
export type Tx = { id: string; kind: "deposit"|"withdrawal"|"tip"; amount: number; createdAt: string };
export type Stats = { total: number; fans: number; series: number[] };
export type Notification = { id: string; text: string; unread: boolean; createdAt: string };
export type ExploreItem = Pick<CreatorProfile,"alias"|"name"|"avatarUrl"> & { category?: string; tipsTotal?: number };

```

### `src/lib/api/endpoints.ts`

```tsx
export const EP = {
  creators: (alias?: string) => alias ? `/creators/${alias}` : `/creators`,
  tips: `/tips`,
  me: `/me`,
  wallet: `/me/wallet`,
  transactions: `/me/transactions`,
  feed: `/me/feed`,
  following: `/me/following`,
  notifications: `/me/notifications`,
  stats: `/creator/stats`,
  creatorTips: `/creator/tips`,
  profile: `/creator/profile`,
  balance: `/creator/balance`,
  withdraw: `/creator/withdraw`,
  checkUsername: `/users/check-username`,
  setUsername: `/users/set-username`,
  authRegister: `/auth/register`,
} as const;

```

### `src/lib/api/errors.ts`

```tsx
import type { HttpError } from "./http";
export function normalize(err: unknown){
  const e = err as HttpError;
  const code = e.response?.status ?? 0;
  const msg = e.response?.data?.message || e.message || "Unexpected error";
  const fields = e.response?.data?.errors;
  return { code, msg, fields };
}

```

### `src/lib/api/queries.ts`

```tsx
import { useEffect } from "react";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import api from "./http"; import { EP } from "./endpoints";
import type { CreatorProfile, ExploreItem, Stats, Wallet, Tx, Notification } from "./contracts";
import { normalize } from "./errors";

export const qc = new QueryClient();

export function useCreator(alias: string){
  return useQuery({
    queryKey: ["creator", alias],
    queryFn: async (): Promise<CreatorProfile> => (await api.get(EP.creators(alias))).data,
    retry: 1,
    staleTime: 60_000,
  });
}
export function useExplore(q: string){
  return useQuery({
    queryKey: ["explore", q],
    queryFn: async (): Promise<ExploreItem[]> => (await api.get(EP.creators(), { params: { q } })).data,
    retry: 1, staleTime: 30_000,
  });
}
export function useStats(){
  return useQuery({ queryKey: ["stats"], queryFn: async(): Promise<Stats> => (await api.get(EP.stats)).data, retry: 1 });
}
export function useWallet(){
  const wallet = useQuery({ queryKey: ["wallet"], queryFn: async(): Promise<Wallet> => (await api.get(EP.wallet)).data });
  const tx = useQuery({ queryKey: ["tx"], queryFn: async(): Promise<Tx[]> => (await api.get(EP.transactions)).data });
  return { wallet, tx };
}
export function useNotifications(){
  return useQuery({ queryKey:["notifications"], queryFn: async(): Promise<Notification[]> => (await api.get(EP.notifications)).data });
}

// Mutacje
export function useSetUsername(){
  return useMutation({
    mutationFn: async (username: string) => (await api.post(EP.setUsername, { username })).data,
  });
}
export function useWithdraw(){
  return useMutation({
    mutationFn: async (p: { amount:number; address:string }) => (await api.post(EP.withdraw, p)).data,
  });
}

// Minimalna obsługa globalnych błędów
export function useGlobalError(toast: (m:string)=>void){
  useEffect(()=>{
    const id = (api.interceptors.response.use(
      res=>res,
      (err)=>{ const { msg } = normalize(err); toast(msg); return Promise.reject(err); }
    ));
    return ()=> api.interceptors.response.eject(id);
  },[toast]);
}

```

### `src/components/ui/LoadingSkeleton.tsx`

```tsx
export default function LoadingSkeleton({ lines=3 }: { lines?: number }){
  return (
    <div role="status" aria-live="polite" className="animate-pulse space-y-2">
      {Array.from({length:lines}).map((_,i)=>(
        <div key={i} className="h-5 bg-white/10 rounded" />
      ))}
    </div>
  );
}

```

### `src/components/ui/ErrorState.tsx`

```tsx
export default function ErrorState({ message, onRetry }:{ message?:string; onRetry?:()=>void }){
  return (
    <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
      <div className="font-semibold">Coś poszło nie tak</div>
      <div className="text-sm opacity-90">{message ?? "Spróbuj ponownie."}</div>
      {onRetry && <button onClick={onRetry} className="mt-3 rounded-lg border border-red-200/30 px-3 py-1">Ponów</button>}
    </div>
  );
}

```

### `src/components/ui/AsyncBoundary.tsx`

```tsx
"use client";
import { ReactNode } from "react";
import ErrorState from "./ErrorState";
type Props = { fallback: ReactNode; children: ReactNode };
export default function AsyncBoundary({ fallback, children }: Props){ return <>{children ?? fallback}</>; } // prosty wrapper

```

### `src/lib/analytics/track.ts`

```tsx
type Props = Record<string, string|number|boolean|undefined>;
export function track(event: string, props?: Props){
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, props);
  // TODO: wysyłka do narzędzia analitycznego
}

```

### Przykład użycia w stronach

**Profil twórcy (fragment):**

```tsx
// app/creators/[alias]/page.tsx (fragment klientowy)
"use client";
import { useCreator } from "@/lib/api/queries";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { track } from "@/lib/analytics/track";

export default function CreatorClient({ alias }: { alias: string }){
  const { data, isLoading, isError, refetch } = useCreator(alias);
  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError) return <ErrorState onRetry={()=>refetch()} />;

  track("view_profile", { alias });
  return /* render profilu na podstawie `data` */;
}

```

**Wypłata (fragment mutacji):**

```tsx
import { useWithdraw } from "@/lib/api/queries";
import { normalize } from "@/lib/api/errors";
export function WithdrawButton({ amount, address }:{amount:number; address:string}){
  const { mutateAsync, isPending } = useWithdraw();
  return (
    <button disabled={isPending} aria-busy={isPending}
      onClick={async ()=>{
        try{ await mutateAsync({ amount, address }); /* toast success */ }
        catch(e){ const { msg } = normalize(e); /* toast error */ }
      }}>
      Wypłać
    </button>
  );
}

```

# KROK 6/N — Autoryzacja i ochrona tras, nagłówki bezpieczeństwa, CSP, i18n, rate-limiting (Next.js App Router + TS + Tailwind)

## 1) Cel i zakres

- Chronimy trasy aplikacji (fan + creator) bez naruszania IMMUTABLE.
- Dodajemy centralny guard (middleware + helper dla Server Components).
- Wymuszamy bezpieczne nagłówki HTTP (CSP, COOP/COEP, HSTS, FIE).
- Przygotowujemy i18n (PL/EN) oraz szkielet rate-limiting na Edge.

## 2) Pliki do dodania/modyfikacji

- `middleware.ts` — ochrona tras + opcjonalny limit żądań.
- `next.config.mjs` — nagłówki bezpieczeństwa + i18n.
- `src/lib/auth/guard.ts` — helper do wymuszania sesji w Server Components.
- `src/lib/auth/session.ts` — odczyt tokenu/cookie (bez logiki NextAuth).
- `app/robots.ts` i `app/sitemap.ts` — SEO podstawy.

---

## 3) Kod

### 3.1 `middleware.ts` (Edge guard + opcjonalny rate-limit)

```tsx
import { NextResponse, NextRequest } from "next/server";

const PROTECTED = [
  "/dashboard", "/feed", "/wallet", "/following", "/notifications", "/settings",
];

const limiter = {
  // [Unverified] Prosty budżet na IP w pamięci procesu (na Edge użyj dostawcy KV/Redis).
  allow: 120, // req / 10 min
  windowMs: 10 * 60 * 1000,
  bucket: new Map<string, { count: number; ts: number }>(),
  hit(ip: string) {
    const now = Date.now();
    const r = this.bucket.get(ip) ?? { count: 0, ts: now };
    if (now - r.ts > this.windowMs) { r.count = 0; r.ts = now; }
    r.count++; this.bucket.set(ip, r);
    return r.count <= this.allow;
  }
};

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const isProtected = PROTECTED.some(p => pathname === p || pathname.startsWith(p + "/"));

  // Rate-limit tylko dla mutacji (POST/PUT/PATCH/DELETE). [Unverified]
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    const ip = req.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";
    if (!limiter.hit(`${ip}:${req.method}:${pathname}`)) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  if (!isProtected) return NextResponse.next();

  // Minimalny sygnał sesji: cookie ustawiane przez backend po zalogowaniu. [Unverified]
  const hasSession = Boolean(req.cookies.get("tipjar.sid")?.value || req.cookies.get("auth_token")?.value);
  if (hasSession) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/register"; // segment (auth) nie jest częścią URL, realna ścieżka to /register
  url.search = search ? `${search}&next=${encodeURIComponent(pathname)}` : `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/dashboard/:path*", "/feed", "/wallet", "/following", "/notifications", "/settings",
  ],
};

```

### 3.2 `src/lib/auth/session.ts`

```tsx
"use server";
import { cookies, headers } from "next/headers";

export type Session = { userId: string; role: "CREATOR" | "FAN" } | null;

/** [Unverified] Szkic: minimalnie ufamy cookie obecności sesji.
 *  W realu: zweryfikuj JWT (JWK) lub odpytaj backend /auth/session.
 */
export async function getSession(): Promise<Session> {
  const c = cookies();
  const raw = c.get("tipjar.sid")?.value || c.get("auth_token")?.value;
  if (!raw) return null;
  // Opcjonalnie: quick role hint z nagłówka serwera reverse proxy.
  const role = headers().get("x-user-role") as Session["role"] | null;
  return { userId: "me", role: role ?? "FAN" };
}

```

### 3.3 `src/lib/auth/guard.ts`

```tsx
"use server";
import { redirect } from "next/navigation";
import { getSession } from "./session";

/** Używaj na początku chronionych Server Components. */
export async function requireAuth(nextPath?: string) {
  const s = await getSession();
  if (!s) redirect(`/register${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`);
  return s;
}

```

### 3.4 Integracja guardów w stronach (przykłady)

```tsx
// app/dashboard/page.tsx
import { requireAuth } from "@/lib/auth/guard";

export default async function DashboardPage() {
  await requireAuth("/dashboard");
  // ...reszta renderu
  return <div>...</div>;
}

// app/feed/page.tsx
import { requireAuth } from "@/lib/auth/guard";
export default async function FeedPage() {
  await requireAuth("/feed");
  return <div>...</div>;
}

```

### 3.5 `next.config.mjs` — nagłówki bezpieczeństwa + i18n

```jsx
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: { locales: ["pl", "en"], defaultLocale: "pl" }, // [Unverified]
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          // [Unverified] CSP — dopasuj do domen backendu/analyt.
          { key: "Content-Security-Policy", value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // dopasuj do potrzeb Next
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "font-src 'self' data:",
            `connect-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}`,
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join("; ") },
          // HSTS dopiero po HTTPS w produkcji:
          ...(process.env.NODE_ENV === "production" ? [
            { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          ] : []),
        ],
      },
    ];
  },
};
export default nextConfig;

```

### 3.6 `app/robots.ts` i `app/sitemap.ts` (SEO)

```tsx
// app/robots.ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${host}/sitemap.xml`,
  };
}

// app/sitemap.ts
import type { MetadataRoute } from "next";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  // [Unverified] Dla profili generuj wpisy po aliasach (po integracji API).
  const staticPages = [ "", "explore", "learn", "register" ].map(p => ({
    url: `${host}/${p}`, lastModified: new Date(),
  }));
  return staticPages;
}

```

# KROK 7/N — Napiwki (Tip) end-to-end: integracja API, walidacja kwot, potwierdzenia, telemetria

Zakres: dopinamy pełny flow „Wesprzyj” na froncie (Next.js + TS + Tailwind), bez zmian w IMMUTABLE.

---

## 1) Warstwa API — mutacja „tip”

Dodaj do `src/lib/api/queries.ts`:

```tsx
// src/lib/api/queries.ts (fragment)
import { useMutation } from "@tanstack/react-query";
import api from "./http"; import { EP } from "./endpoints";

export function useTip(){
  return useMutation({
    mutationFn: async (p: { creatorId: string; amount: number; message?: string }) =>
      (await api.post(EP.tips, p)).data,
  });
}

```

---

## 2) Util: formatowanie kwot USDC i prosta walidacja

```tsx
// src/lib/currency.ts
export function formatUSDC(n: number, locale = "pl-PL"){
  const f = new Intl.NumberFormat(locale, { style:"currency", currency:"USD", minimumFractionDigits:2, maximumFractionDigits:2 });
  return f.format(n).replace("US$", "").trim() + " USDC";
}
export function parseAmount(input: string){ return Number((input||"").replace(",", ".").trim()); }
export function isValidUsdc(n: number){ return Number.isFinite(n) && n >= 0.5 && n <= 10_000; }

```

---

## 3) UI: lekki Toast (sukces/błąd)

```tsx
// src/components/ui/Toast.tsx
"use client";
import { useEffect, useState } from "react";
let pushGlobal: ((m:{type:"success"|"error"; text:string})=>void) | null = null;

export function useToast(){
  return { push: (m:{type:"success"|"error"; text:string}) => pushGlobal?.(m) };
}
export default function ToastHost(){
  const [q, setQ] = useState<{id:number; type:"success"|"error"; text:string}[]>([]);
  useEffect(()=>{ pushGlobal = (m)=> setQ(s=>[...s, { id: Date.now(), ...m }]); return ()=>{ pushGlobal = null; }; },[]);
  return (
    <div className="fixed bottom-4 right-4 z-[1000] space-y-2">
      {q.map(t=>(
        <div key={t.id} role="status"
             className={`px-4 py-2 rounded-lg border ${t.type==="success"?"bg-green-600/15 border-green-400/40 text-green-200":"bg-red-600/15 border-red-400/40 text-red-200"}`}>
          {t.text}
        </div>
      ))}
    </div>
  );
}

```

Wstaw `</body>` w layoutcie: `<ToastHost />` (bez zmian w IMMUTABLE, jeśli masz własny layout per-route, dodaj lokalnie).

---

## 4) Aktualizacja SupportButton: telemetria + domknięcie po sukcesie

```tsx
// src/components/creator/SupportButton.tsx
"use client";
import { useState } from "react";
import TipModal from "@/components/payments/TipModal";
import { track } from "@/lib/analytics/track";

export default function SupportButton({ creatorAlias }: { creatorAlias: string }) {
  const [open, setOpen] = useState(false);
  return (
    <><button onClick={()=>{ setOpen(true); track("tap_tip", { alias: creatorAlias }); }}
              className="px-5 py-3 rounded-lg bg-teal-500 text-black font-semibold">
        Wesprzyj
      </button>
      <TipModal open={open} onClose={()=>setOpen(false)} creatorId={creatorAlias}
        onSuccess={()=>{ setOpen(false); }} />
    </>
  );
}

```

---

## 5) TipModal: pełna integracja (preset + własna kwota + wiadomość, walidacja, toasty)

```tsx
// src/components/payments/TipModal.tsx
"use client";
import { useState } from "react";
import { useTip } from "@/lib/api/queries";
import { useToast } from "@/components/ui/Toast";
import { formatUSDC, parseAmount, isValidUsdc } from "@/lib/currency";
import { track } from "@/lib/analytics/track";

export default function TipModal({
  open, onClose, creatorId, onSuccess,
}: { open: boolean; onClose: () => void; creatorId: string; onSuccess: () => void }) {
  const presets = [3, 5, 10, 25];
  const [amountStr, setAmountStr] = useState(String(presets[1]));
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useTip();
  const toast = useToast();

  if (!open) return null;

  const amount = parseAmount(amountStr);
  const valid = isValidUsdc(amount);

  async function submit(){
    setError(null);
    if (!valid){ setError("Kwota musi mieć wartość 0.5–10 000 USDC."); return; }
    try{
      await mutateAsync({ creatorId, amount, message: message?.trim() || undefined });
      toast.push({ type: "success", text: `Dziękujemy! ${formatUSDC(amount)} wysłane.` });
      track("tip_success", { creatorId, amount });
      onSuccess();
    }catch(e:any){
      toast.push({ type: "error", text: "Nie udało się przetworzyć napiwku." });
      setError(e?.response?.data?.message || "Błąd serwera");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-4 text-white"
           role="dialog" aria-modal="true" aria-labelledby="tip-title">
        <h3 id="tip-title" className="text-lg font-semibold">Wyślij napiwek</h3>

        <div className="mt-3 flex gap-2 flex-wrap">
          {presets.map(p=>(
            <button key={p} type="button"
              onClick={()=>setAmountStr(String(p))}
              className={`px-3 py-2 rounded-lg ${parseAmount(amountStr)===p?"bg-teal-500 text-black":"bg-white/10 border border-white/15"}`}>
              {p} USDC
            </button>
          ))}
        </div>

        <label className="mt-3 block text-sm opacity-80">Inna kwota (USDC)</label>
        <input inputMode="decimal" value={amountStr} onChange={e=>setAmountStr(e.target.value)}
               className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 p-2 text-white"
               placeholder="np. 7.50" />

        <label className="mt-3 block text-sm opacity-80">Wiadomość (opcjonalnie)</label>
        <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={3}
                  className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 p-2 text-white"
                  placeholder="Dziękuję za treści!" />

        {error && <p className="mt-2 text-red-300 text-sm">{error}</p>}

        <div className="mt-4 flex gap-2">
          <button onClick={submit} disabled={isPending}
                  aria-busy={isPending}
                  className="flex-1 rounded-lg bg-teal-500 text-black py-2 font-semibold disabled:opacity-50">
            {isPending ? "Wysyłanie…" : `Wyślij ${valid?formatUSDC(amount):""}`}
          </button>
          <button onClick={onClose} className="flex-1 rounded-lg border border-white/20 py-2">Anuluj</button>
        </div>
      </div>
    </div>
  );
}

```

---

## 6) WalletAddressModal: skopiuj do schowka

```tsx
// src/components/payments/WalletAddressModal.tsx (zmiana)
"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

export default function WalletAddressModal({ address }: { address: string }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <><button onClick={() => setOpen(true)} className="px-5 py-3 rounded-lg border border-white/15 text-white">
        Adres do wpłaty
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-4 text-white" role="dialog" aria-modal="true">
            <h3 className="text-lg font-semibold mb-2">Adres portfela</h3>
            <code className="block bg-black/40 p-3 rounded break-all">{address}</code>
            <div className="mt-3 flex gap-2">
              <button onClick={async()=>{ await navigator.clipboard.writeText(address); toast.push({type:"success", text:"Skopiowano adres."}); }}
                      className="flex-1 rounded-lg bg-teal-500 text-black py-2">Kopiuj</button>
              <button onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-white/20 py-2">Zamknij</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

```

---

## 7) Profil twórcy: wpięcie ToastHost i śledzenia

W dowolnym layoutcie, który renderuje strony publiczne (np. `app/(public)/layout.tsx` lub lokalnie w `app/creators/[alias]/page.tsx` klientowym wrapperze) dodaj:

```tsx
// np. w najwyższym komponencie klientowym dla profilu
import ToastHost from "@/components/ui/Toast";
export default function CreatorClientShell(){ return (<><ToastHost />{/* … */}</>); }

```

---

## 8) Testy E2E (zarys)

- `profile_tip.spec.ts`:
    1. Wejście na `/creators/aga_music` → klik „Wesprzyj”.
    2. Wybór preset 5 USDC, wpisanie „Dzięki!” → Submit.
    3. Sprawdzenie toasta z sukcesem; modal zamknięty; event `tip_success` odnotowany.
- `wallet_history.spec.ts`: wysłanie napiwku zwiększa liczbę wpisów „tip” w historii (po mocku API).

---

## 9) Checklista QA

- Walidacja: kwota < 0.5 lub > 10 000 blokuje submit i wyświetla błąd.
- Dostępność: modal z `role="dialog"`, focus-trap, Esc zamyka; przycisk „Wyślij” z `aria-busy` podczas mutacji.
- Telemetria: `tap_tip`, `tip_success` wysyłane; błędy logowane globalnie.
- CWV: brak dodatkowych bibliotek; UI lekkie; brak regresji LCP.

To domyka KROK 7/N — tip flow produkcyjny na froncie.

# KROK 8/N — Creator Dashboard (etap 1/4): Pulpit metryk

Cel: uruchomić realny `/dashboard` z danymi, stanami `loading/error`, filtrami czasu i bez dłubania w IMMUTABLE.

---

## 1) Provider dla React Query (wymagany przez hooki)

```tsx
// src/lib/api/reactQueryProvider.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function RQProvider({ children }: { children: ReactNode }) {
  const [qc] = useState(() => new QueryClient());
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

```

## 2) Layout dashboardu: wpięcie providera (bez zmian w IMMUTABLE)

```tsx
// app/dashboard/layout.tsx
import Sidebar from "@/components/ui/Sidebar";
import HeaderBar from "@/components/ui/HeaderBar";
import RQProvider from "@/lib/api/reactQueryProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { href: "/dashboard", label: "Pulpit" },
    { href: "/dashboard/profile", label: "Profil" },
    { href: "/dashboard/withdrawals", label: "Wypłaty" },
    { href: "/dashboard/goal", label: "Cel" },
    { href: "/dashboard/subscriptions", label: "Subskrypcje" },
  ];
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] bg-[var(--surface-2)] text-[var(--fg)]">
      <aside className="border-r border-white/10"><Sidebar items={items} /></aside>
      <div className="min-h-screen">
        <HeaderBar title="Panel twórcy" />
        <main className="p-6">
          <RQProvider>{children}</RQProvider>
        </main>
      </div>
    </div>
  );
}

```

## 3) Hook danych: statystyki z filtrem czasu

```tsx
// src/lib/api/queries.ts (dodaj/zmień)
export function useStats(range: "7d"|"30d"|"90d" = "30d"){
  return useQuery({
    queryKey: ["stats", range],
    queryFn: async(): Promise<Stats> => (await api.get(EP.stats, { params: { range } })).data,
    retry: 1,
    staleTime: 60_000,
  });
}

```

## 4) Pulpit: stany, filtr, wykres, ostatnie napiwki

```tsx
// app/dashboard/page.tsx
"use client";
import { useState } from "react";
import { useStats } from "@/lib/api/queries";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import TipStatistics from "@/components/dashboard/TipStatistics";

export default function DashboardPage() {
  const [range, setRange] = useState<"7d"|"30d"|"90d">("30d");
  const { data, isLoading, isError, refetch } = useStats(range);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-semibold">Pulpit</h1>
        <div className="ml-auto flex gap-2">
          {(["7d","30d","90d"] as const).map((r)=>(
            <button key={r} onClick={()=>setRange(r)}
              className={`px-3 py-1 rounded-lg border ${range===r?"bg-primary text-black border-primary":"border-white/15"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <LoadingSkeleton lines={6} />}
      {isError && <ErrorState onRetry={()=>refetch()} />}

      {data && (
        <>
          <TipStatistics series={data.series} total={data.total} fans={data.fans} />
          <section>
            <h2 className="text-xl font-semibold mt-4">Ostatnie napiwki</h2>
            {/* TODO: podłącz listę /creator/tips po integracji; tu sam pulpit metryk */}
            <p className="opacity-70 text-sm mt-2">Lista napiwków pojawi się po spięciu endpointu.</p>
          </section>
        </>
      )}
    </div>
  );
}

```

## 5) TipStatistics: drobny retusz a11y

```tsx
// src/components/dashboard/TipStatistics.tsx (tytuł + aria)
function Spark({ series }: { series: number[] }) {
  const W = 240, H = 64;
  const max = Math.max(1, ...series);
  const pts = series.map((v, i) => {
    const x = (i / (series.length - 1)) * (W - 8) + 4;
    const y = H - 4 - (v / max) * (H - 8);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Wykres sumy napiwków">
      <polyline points={pts} fill="none" stroke="currentColor" strokeOpacity="0.8" strokeWidth="2" />
    </svg>
  );
}

```

## 6) Sanity-check (do weryfikacji lokalnie)

- `/dashboard` renderuje: filtr 7d/30d/90d, skeleton przy ładowaniu, błąd z retry, metryki z wykresem.
- Brak zmian w IMMUTABLE.
- Brak ciężkich zależności wykresowych; CWV bez regresji.

Koniec etapu 1/4 dla Creator Dashboard. Kolejne etapy: `profile`, `withdrawals`, `goal/subscriptions` z pełnym fetch/mutacjami i testami.

# KROK 8/N — Creator Dashboard (etap 2/4): Ustawienia profilu (pełna integracja)

Cel: spięcie `/dashboard/profile` z danymi, walidacją, uploadem avataru/baneru (pre-preview), zapis z mutacją i stanami `loading/error/saved`. Bez zmian w IMMUTABLE.

---

## 1) Zmiany w warstwie API

### `src/lib/api/contracts.ts` (uzupełnienie typu profilu)

```tsx
// + rozszerzenie: linki i grafiki
export type CreatorProfile = {
  id: string;
  alias: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  links?: { youtube?: string; twitch?: string; twitter?: string; instagram?: string };
  goal?: { target: number; current: number };
};

```

### `src/lib/api/endpoints.ts` (używamy już zdefiniowanego EP.profile)

```tsx
// bez zmian: export const EP = { profile: `/creator/profile`, ... }

```

### `src/lib/api/queries.ts` (fetch + save + opcjonalny upload)

```tsx
// FETCH profilu
export function useCreatorProfile(){
  return useQuery({
    queryKey: ["creator-profile"],
    queryFn: async (): Promise<CreatorProfile> => (await api.get(EP.profile)).data,
    retry: 1, staleTime: 60_000,
  });
}

// ZAPIS profilu
export function useUpdateProfile(){
  return useMutation({
    mutationFn: async (payload: Partial<CreatorProfile>) =>
      (await api.patch(EP.profile, payload)).data,
  });
}

// [Unverified] PROSTY upload pliku → URL (dopasuj do backendu)
export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData(); fd.append("file", file);
  const { data } = await api.post("/uploads", fd, { headers: { "Content-Type": "multipart/form-data" } });
  return data?.url as string; // backend zwraca { url }
}

```

---

## 2) Formularz profilu z pre-preview i walidacją

### `src/components/dashboard/ProfileForm.tsx` (aktualizacja)

```tsx
"use client";
import { useState, useMemo } from "react";
import type { CreatorProfile } from "@/lib/api/contracts";

export type ProfileFormProps = {
  initial?: CreatorProfile;
  onSubmit: (v: CreatorProfile) => Promise<void> | void;
  onUpload?: (f: File) => Promise<string>; // zwraca URL
};

export default function ProfileForm({ initial, onSubmit, onUpload }: ProfileFormProps){
  const [v, setV] = useState<CreatorProfile>(initial ?? { id:"", name:"", alias:"" });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [fileBanner, setFileBanner] = useState<File | null>(null);

  const avatarPreview = useMemo(()=> fileAvatar ? URL.createObjectURL(fileAvatar) : v.avatarUrl, [fileAvatar, v.avatarUrl]);
  const bannerPreview = useMemo(()=> fileBanner ? URL.createObjectURL(fileBanner) : v.bannerUrl, [fileBanner, v.bannerUrl]);

  function change<K extends keyof CreatorProfile>(k: K, val: CreatorProfile[K]) {
    setV(s => ({ ...s, [k]: val }));
  }

  async function submit(e: React.FormEvent){
    e.preventDefault(); setErr(null);
    // Walidacja minimalna
    if (!v.name?.trim()) return setErr("Nazwa jest wymagana.");
    if (!v.alias?.trim()) return setErr("Alias jest wymagany.");
    setSaving(true);
    try {
      const payload = { ...v };
      if (fileAvatar && onUpload) payload.avatarUrl = await onUpload(fileAvatar);
      if (fileBanner && onUpload) payload.bannerUrl = await onUpload(fileBanner);
      await onSubmit(payload as CreatorProfile);
    } catch (e: any) {
      setErr(e?.message || "Nie udało się zapisać profilu.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      {/* Banner */}
      <div>
        <label className="block text-sm opacity-80 mb-1">Baner</label>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-40"
             style={bannerPreview ? { backgroundImage:`url(${bannerPreview})`, backgroundSize:"cover", backgroundPosition:"center" } : {}} />
        <input type="file" accept="image/*" className="mt-2"
               onChange={e=>setFileBanner(e.currentTarget.files?.[0] ?? null)} />
      </div>

      {/* Avatar + nazwa, alias */}
      <div className="grid sm:grid-cols-[96px_1fr] gap-4 items-start">
        <div>
          <label className="block text-sm opacity-80 mb-1">Avatar</label>
          <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 bg-white/10"
               style={avatarPreview ? { backgroundImage:`url(${avatarPreview})`, backgroundSize:"cover", backgroundPosition:"center" } : {}} />
          <input type="file" accept="image/*" className="mt-2"
                 onChange={e=>setFileAvatar(e.currentTarget.files?.[0] ?? null)} />
        </div>
        <div className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm opacity-80">Nazwa</span>
            <input required value={v.name} onChange={e=>change("name", e.target.value)}
                   className="rounded-lg bg-white/5 border border-white/10 p-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm opacity-80">Alias</span>
            <input required value={v.alias} onChange={e=>change("alias", e.target.value)}
                   className="rounded-lg bg-white/5 border border-white/10 p-2" />
          </label>
        </div>
      </div>

      {/* Bio */}
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Bio</span>
        <textarea value={v.bio ?? ""} onChange={e=>change("bio", e.target.value)}
                  className="rounded-lg bg-white/5 border border-white/10 p-2 min-h-[120px]" />
      </label>

      {/* Linki */}
      <fieldset className="grid sm:grid-cols-2 gap-3 p-3 rounded-xl border border-white/10">
        <legend className="px-2 text-sm opacity-80">Linki</legend>
        <input placeholder="YouTube URL" value={v.links?.youtube ?? ""}
               onChange={e=>change("links", { ...v.links, youtube: e.target.value })}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
        <input placeholder="Twitch URL" value={v.links?.twitch ?? ""}
               onChange={e=>change("links", { ...v.links, twitch: e.target.value })}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
        <input placeholder="Twitter/X URL" value={v.links?.twitter ?? ""}
               onChange={e=>change("links", { ...v.links, twitter: e.target.value })}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
        <input placeholder="Instagram URL" value={v.links?.instagram ?? ""}
               onChange={e=>change("links", { ...v.links, instagram: e.target.value })}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
      </fieldset>

      {/* Cel */}
      <fieldset className="grid sm:grid-cols-2 gap-3 p-3 rounded-xl border border-white/10">
        <legend className="px-2 text-sm opacity-80">Cel</legend>
        <input type="number" min={0} placeholder="Kwota docelowa (USDC)"
               value={v.goal?.target ?? 0}
               onChange={e=>change("goal", { ...v.goal, target: Number(e.target.value || 0), current: v.goal?.current ?? 0 })}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
        <input type="number" min={0} placeholder="Obecny postęp"
               value={v.goal?.current ?? 0}
               onChange={e=>change("goal", { ...v.goal, current: Number(e.target.value || 0), target: v.goal?.target ?? 0 })}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
      </fieldset>

      {err && <p className="text-red-300 text-sm">{err}</p>}
      <div className="flex gap-2">
        <button disabled={saving} aria-busy={saving}
                className="rounded-lg bg-[var(--color-primary)] text-black font-semibold px-4 py-2">
          Zapisz profil
        </button>
        <button type="button" onClick={()=>setV(initial ?? v)}
                className="rounded-lg border border-white/20 px-4 py-2">Reset</button>
      </div>
    </form>
  );
}

```

---

## 3) Strona `/dashboard/profile` z pełnym fetch/save i toastami

### `app/dashboard/profile/page.tsx`

```tsx
"use client";
import ProfileForm from "@/components/dashboard/ProfileForm";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { useCreatorProfile, useUpdateProfile, uploadImage } from "@/lib/api/queries";
import { useToast } from "@/components/ui/Toast";
import { track } from "@/lib/analytics/track";
import { QueryClient } from "@tanstack/react-query";

export default function ProfileSettingsPage() {
  const { data, isLoading, isError, refetch } = useCreatorProfile();
  const { mutateAsync, isPending } = useUpdateProfile();
  const toast = useToast();

  if (isLoading) return <LoadingSkeleton lines={8} />;
  if (isError) return <ErrorState onRetry={()=>refetch()} />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Ustawienia profilu</h1>
      <ProfileForminitial={data}
        onUpload={uploadImage}
        onSubmit={async (payload) => {
          await mutateAsync(payload);
          toast.push({ type: "success", text: "Profil zapisany." });
          track("profile_save", { alias: payload.alias });
          // Opcjonalnie: odśwież cache profilu publicznego
          // new QueryClient().invalidateQueries({ queryKey: ["creator-profile"] });
        }}
      />
      {isPending && <p className="text-sm opacity-70 mt-2">Zapisywanie…</p>}
    </div>
  );
}

```

# KROK 8/N — Creator Dashboard (etap 3/4): Wypłaty USDC (pełna integracja)

## 1) API i walidacje

### `src/lib/api/queries.ts` (uzupełnienie balansu)

```tsx
// FETCH stanu salda twórcy
export function useCreatorBalance(){
  return useQuery({
    queryKey: ["creator-balance"],
    queryFn: async(): Promise<{ balance: number }> => (await api.get(EP.balance)).data,
    retry: 1, staleTime: 30_000,
  });
}

```

### `src/lib/validators/address.ts`

```tsx
export function isEvmAddress(v: string){
  return /^0x[a-fA-F0-9]{40}$/.test(v.trim());
}

```

## 2) Formularz: walidacja kwoty i adresu

### `src/components/dashboard/WithdrawalForm.tsx` (aktualizacja)

```tsx
"use client";
import { useState } from "react";
import { isEvmAddress } from "@/lib/validators/address";

export default function WithdrawalForm({ balance, onSubmit }:{
  balance: number; onSubmit: (p:{amount:number; address:string})=>Promise<void> | void;
}) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const amt = Number((amount||"").replace(",", "."));
  const validAmt = Number.isFinite(amt) && amt > 0 && amt <= balance;
  const validAddr = isEvmAddress(address);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!validAmt) return setErr("Nieprawidłowa kwota.");
    if (!validAddr) return setErr("Nieprawidłowy adres EVM (0x…).");
    setLoading(true);
    try { await onSubmit({ amount: amt, address }); }
    catch(e:any){ setErr(e?.message || "Błąd wypłaty."); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="rounded-xl bg-white/5 border border-white/10 p-3">
        <div className="text-sm opacity-80">Dostępne saldo</div>
        <div className="text-xl font-bold">{balance.toFixed(2)} USDC</div>
      </div>

      <label className="grid gap-1">
        <span className="text-sm opacity-80">Kwota</span>
        <input inputMode="decimal" required value={amount} onChange={e=>setAmount(e.target.value)}
               className="rounded-lg bg-white/5 border border-white/10 p-2"/>
        <div className="text-xs opacity-70">Max: {balance.toFixed(2)} USDC</div>
      </label>

      <label className="grid gap-1">
        <span className="text-sm opacity-80">Adres wypłaty (EOA)</span>
        <input required value={address} onChange={e=>setAddress(e.target.value)}
               className="rounded-lg bg-white/5 border border-white/10 p-2" placeholder="0x…" />
      </label>

      {err && <p className="text-red-300 text-sm">{err}</p>}

      <div className="flex gap-2">
        <button type="submit" disabled={loading || !validAmt || !validAddr} aria-busy={loading}
                className="rounded-lg bg-[var(--color-primary)] text-black font-semibold px-4 py-2 disabled:opacity-50">
          Wypłać
        </button>
        <button type="button" onClick={()=>setAmount(String(balance.toFixed(2)))}
                className="rounded-lg border border-white/20 px-4 py-2">Wypłać wszystko</button>
      </div>
    </form>
  );
}

```

## 3) Strona `/dashboard/withdrawals` z pełną integracją

### `app/dashboard/withdrawals/page.tsx`

```tsx
"use client";
import WithdrawalForm from "@/components/dashboard/WithdrawalForm";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { useCreatorBalance, useWithdraw } from "@/lib/api/queries";
import { useToast } from "@/components/ui/Toast";
import { normalize } from "@/lib/api/errors";
import { track } from "@/lib/analytics/track";

export default function WithdrawalsPage() {
  const { data, isLoading, isError, refetch } = useCreatorBalance();
  const { mutateAsync, isPending } = useWithdraw();
  const toast = useToast();

  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError || !data) return <ErrorState onRetry={()=>refetch()} />;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Wypłaty</h1>
      <WithdrawalFormbalance={data.balance}
        onSubmit={async ({ amount, address })=>{
          try{
            await mutateAsync({ amount, address });
            toast.push({ type: "success", text: "Wypłata zlecona." });
            track("withdraw_request", { amount });
          }catch(e){
            const { msg } = normalize(e);
            toast.push({ type: "error", text: msg });
            track("withdraw_fail", { reason: msg });
            throw e;
          }
        }}
      />
      {isPending && <p className="text-sm opacity-70 mt-2">Przetwarzanie…</p>}
    </div>
  );
}

```

# KROK 8/N — Creator Dashboard (etap 4/4): Cel finansowy i Subskrypcje (pełna integracja)

## 1) Warstwa API

### `src/lib/api/contracts.ts` (uzupełnienie)

```tsx
// Typy domenowe (rozszerzenie)
export type Goal = { id?: string; title: string; target: number; current?: number; deadline?: string };
export type Subscription = { id: string; fan: string; amount: number; period: "mies."|"rok"; startedAt: string; active: boolean };

```

### `src/lib/api/endpoints.ts` (uzupełnienie)

```tsx
// + nowe stałe
export const EP = {
  // ...istniejące
  goals: `/creator/goals`,
  subscriptions: `/creator/subscriptions`,
} as const;

```

### `src/lib/api/queries.ts` (fetch + mutacje)

```tsx
import type { Goal, Subscription } from "./contracts";

// CEL — pobierz (zakładamy jeden aktywny)
export function useGoal(){
  return useQuery({
    queryKey: ["creator-goal"],
    queryFn: async(): Promise<Goal|null> => (await api.get(EP.goals)).data ?? null,
    retry: 1, staleTime: 60_000,
  });
}

// CEL — zapisz (upsert)
export function useSaveGoal(){
  return useMutation({
    mutationFn: async (payload: Goal) => (await api.post(EP.goals, payload)).data,
  });
}

// SUBSKRYPCJE — lista
export function useCreatorSubscriptions(params?: { q?: string; page?: number; limit?: number }){
  return useQuery({
    queryKey: ["creator-subscriptions", params],
    queryFn: async(): Promise<Subscription[]> => (await api.get(EP.subscriptions, { params })).data,
    retry: 1, staleTime: 30_000,
  });
}

```

---

## 2) Strony

### `app/dashboard/goal/page.tsx`

```tsx
"use client";
import GoalForm from "@/components/dashboard/GoalForm";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { useGoal, useSaveGoal } from "@/lib/api/queries";
import { useToast } from "@/components/ui/Toast";
import { track } from "@/lib/analytics/track";

export default function GoalPage() {
  const { data, isLoading, isError, refetch } = useGoal();
  const { mutateAsync, isPending } = useSaveGoal();
  const toast = useToast();

  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError) return <ErrorState onRetry={()=>refetch()} />;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Cel finansowy</h1>
      <GoalForminitial={data ?? { title: "", target: 0, deadline: "" }}
        onSubmit={async (v)=>{
          await mutateAsync(v);
          toast.push({ type: "success", text: "Cel zapisany." });
          track("goal_save", { target: v.target });
        }}
      />
      {isPending && <p className="text-sm opacity-70 mt-2">Zapisywanie…</p>}
    </div>
  );
}

```

### `app/dashboard/subscriptions/page.tsx`

```tsx
"use client";
import SubscriptionsList from "@/components/dashboard/SubscriptionsList";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { useCreatorSubscriptions } from "@/lib/api/queries";

export default function SubscriptionsPage() {
  const { data, isLoading, isError, refetch } = useCreatorSubscriptions();

  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError || !data) return <ErrorState onRetry={()=>refetch()} />;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Subskrypcje</h1>
      <SubscriptionsList items={data} />
    </div>
  );
}

```

---

## 3) Komponenty (drobne uzupełnienia)

### `src/components/dashboard/SubscriptionsList.tsx` (obsługa stanu „brak”)

```tsx
import type { Subscription } from "@/lib/api/contracts";

export default function SubscriptionsList({ items }: { items: Subscription[] }) {
  if (!items?.length) return <p className="opacity-70">Brak subskrypcji.</p>;
  return (
    <div className="grid gap-2">
      {items.map((s)=>(
        <div key={s.id} className="rounded-xl bg-white/5 border border-white/10 p-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
          <span>@{s.fan}</span>
          <span>{s.amount} USDC / {s.period}</span>
          <span className="opacity-75">{new Date(s.startedAt).toLocaleDateString()}</span>
          <span className={`text-sm ${s.active?"text-green-300":"text-red-300"}`}>{s.active?"aktywna":"nieaktywna"}</span>
          <span className="hidden sm:block text-right opacity-70">ID: {s.id}</span>
        </div>
      ))}
    </div>
  );
}

```

# KROK 9/N — Panel Fana end-to-end: Feed, Following, Notifications, Settings (integracja API + stany + testy)

Zakres: dopinamy cztery strony użytkownika „Fan” z realnymi danymi, stanami `loading/error/empty`, akcjami (oznacz jako przeczytane, zapisz ustawienia), telemetrią. Bez zmian w IMMUTABLE.

---

## 1) Warstwa API (hooki danych i mutacje)

### `src/lib/api/endpoints.ts` (upewnij się, że masz te ścieżki)

```tsx
export const EP = {
  // ...już zdefiniowane
  me: "/me",
  feed: "/me/feed",
  following: "/me/following",
  notifications: "/me/notifications",
  notificationsRead: "/me/notifications/read",
  // settings -> PATCH /me
} as const;

```

### `src/lib/api/contracts.ts` (typy)

```tsx
export type FeedItem = { id: string; type: "tip_thanks"|"post"|"system"; text: string; ts: string };
export type FollowingItem = { alias: string; name: string; avatarUrl?: string; since: string };
export type MeSettings = { email: string; locale?: "pl"|"en"; marketing?: boolean };

```

### `src/lib/api/queries.ts` (hooki)

```tsx
import type { FeedItem, FollowingItem, Notification, MeSettings } from "./contracts";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "./http"; import { EP } from "./endpoints";

// FEED
export function useFeed(){
  return useQuery({ queryKey:["feed"], queryFn: async(): Promise<FeedItem[]> => (await api.get(EP.feed)).data, retry:1, staleTime: 30_000 });
}

// FOLLOWING
export function useFollowing(){
  return useQuery({ queryKey:["following"], queryFn: async(): Promise<FollowingItem[]> => (await api.get(EP.following)).data, retry:1, staleTime: 60_000 });
}

// NOTIFICATIONS
export function useNotifications(){
  return useQuery({ queryKey:["notifications"], queryFn: async(): Promise<Notification[]> => (await api.get(EP.notifications)).data, retry:1, staleTime: 15_000 });
}
export function useMarkNotifications(){
  return useMutation({
    mutationFn: async (ids?: string[]) => (await api.post(EP.notificationsRead, { ids })).data,
  });
}

// SETTINGS
export function useMe(){
  return useQuery({ queryKey:["me"], queryFn: async(): Promise<MeSettings> => (await api.get(EP.me)).data, retry:1, staleTime: 60_000 });
}
export function useUpdateMe(){
  return useMutation({ mutationFn: async (p: Partial<MeSettings>) => (await api.patch(EP.me, p)).data });
}

```

---

## 2) Strony (integracja UI)

### `app/feed/page.tsx`

```tsx
"use client";
import { useFeed } from "@/lib/api/queries";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";

export default function FeedPage() {
  const { data, isLoading, isError, refetch } = useFeed();
  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError) return <ErrorState onRetry={()=>refetch()} />;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Twoja aktywność</h1>
      {!data?.length ? <p className="opacity-70">Brak aktywności.</p> : (
        <div className="grid gap-2">
          {data.map(x=>(
            <div key={x.id} className="rounded-xl bg-white/5 border border-white/10 p-3">
              <div className="text-sm opacity-70">{new Date(x.ts).toLocaleString()}</div>
              <div>{x.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

```

### `app/following/page.tsx`

```tsx
"use client";
import Link from "next/link";
import { useFollowing } from "@/lib/api/queries";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";

export default function FollowingPage() {
  const { data, isLoading, isError, refetch } = useFollowing();
  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError) return <ErrorState onRetry={()=>refetch()} />;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Obserwowani</h1>
      {!data?.length ? <p className="opacity-70">Jeszcze nikogo nie obserwujesz.</p> : (
        <div className="grid gap-3">
          {data.map(c=>(
            <Link key={c.alias} href={`/creators/${c.alias}`} className="rounded-xl bg-white/5 border border-white/10 p-4 hover:border-primary/50">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm opacity-75">@{c.alias} • od {new Date(c.since).toLocaleDateString()}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

```

### `app/notifications/page.tsx`

```tsx
"use client";
import { useNotifications, useMarkNotifications } from "@/lib/api/queries";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";

export default function NotificationsPage() {
  const { data, isLoading, isError, refetch } = useNotifications();
  const mark = useMarkNotifications();

  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError) return <ErrorState onRetry={()=>refetch()} />;

  const unread = data?.filter(n=>n.unread).map(n=>n.id) ?? [];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-semibold">Powiadomienia</h1>
        <div className="ml-auto flex gap-2">
          <buttononClick={async ()=>{ await mark.mutateAsync(); refetch(); }}
            className="px-3 py-1 rounded-lg border border-white/20">Oznacz wszystkie jako przeczytane</button>
          {!!unread.length && (
            <buttononClick={async ()=>{ await mark.mutateAsync(unread); refetch(); }}
              className="px-3 py-1 rounded-lg bg-primary text-black">Oznacz nieprzeczytane</button>
          )}
        </div>
      </div>

      {!data?.length ? <p className="opacity-70">Brak powiadomień.</p> : (
        <div className="grid gap-2">
          {data.map(n=>(
            <div key={n.id}
              className={`rounded-xl border p-3 ${n.unread?"bg-primary/10 border-primary/30":"bg-white/5 border-white/10"}`}>
              <div className="text-sm opacity-70">{new Date(n.createdAt).toLocaleString()}</div>
              {n.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

```

### `app/settings/page.tsx`

```tsx
"use client";
import { useMe, useUpdateMe } from "@/lib/api/queries";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { useToast } from "@/components/ui/Toast";

export default function SettingsPage() {
  const { data, isLoading, isError, refetch } = useMe();
  const { mutateAsync, isPending } = useUpdateMe();
  const toast = useToast();

  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError || !data) return <ErrorState onRetry={()=>refetch()} />;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await mutateAsync({
      email: String(fd.get("email") || ""),
      locale: (fd.get("locale") as "pl"|"en") ?? "pl",
      marketing: fd.get("marketing") === "on",
    });
    toast.push({ type: "success", text: "Ustawienia zapisane." });
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Ustawienia</h1>
      <form className="grid gap-3" onSubmit={onSubmit}>
        <label className="grid gap-1">
          <span className="text-sm opacity-80">E-mail</span>
          <input name="email" defaultValue={data.email}
                 className="rounded-lg bg-white/5 border border-white/10 p-2" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm opacity-80">Język</span>
          <select name="locale" defaultValue={data.locale ?? "pl"}
                  className="rounded-lg bg-white/5 border border-white/10 p-2">
            <option value="pl">Polski</option>
            <option value="en">English</option>
          </select>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="marketing" defaultChecked={!!data.marketing} />
          <span className="text-sm">Chcę otrzymywać aktualizacje e-mail</span>
        </label>
        <button disabled={isPending} aria-busy={isPending}
                className="rounded-lg bg-primary text-black font-semibold px-4 py-2">
          Zapisz
        </button>
      </form>
      {isPending && <p className="text-sm opacity-70 mt-2">Zapisywanie…</p>}
    </div>
  );
}

```

# KROK 10/N — „Odkrywaj” 2.0: SSR + filtrowanie fasetowe + URL-state + paginacja

Cel: realny katalog twórców z wydajnym SEO (SSR), stałymi linkami (URL=źródło prawdy), dostępnością i brakiem regresji CWV. Zero zmian w IMMUTABLE.

---

## 1) Warstwa typów i walidacji zapytań (URL → typy)

### `src/lib/search/schema.ts`

```tsx
import { z } from "zod";

export const monetizations = ["tips","subscriptions","commissions"] as const;
export const sortKeys = ["relevance","tips_total","followers","recent_activity"] as const;

export const exploreSchema = z.object({
  q: z.string().trim().max(120).optional(),
  page: z.coerce.number().int().min(1).default(1),
  per: z.coerce.number().int().min(12).max(60).default(24),
  category: z.array(z.string().trim()).optional(),
  location: z.string().trim().optional(), // "Country|City" np. "PL|Warszawa"
  tags: z.array(z.string().trim()).optional(),
  audienceMin: z.coerce.number().int().min(0).max(10_000_000).optional(),
  audienceMax: z.coerce.number().int().min(0).max(10_000_000).optional(),
  monetization: z.array(z.enum(monetizations)).optional(),
  active: z.coerce.boolean().optional(),
  sort: z.enum(sortKeys).default("relevance"),
});
export type ExploreParams = z.infer<typeof exploreSchema>;

export function parseSearchParams(sp: ReadonlyURLSearchParams): ExploreParams {
  const obj: Record<string, unknown> = {};
  sp.forEach((v, k) => {
    if (["category","tags","monetization"].includes(k)) {
      obj[k] = sp.getAll(k);
    } else {
      obj[k] = v;
    }
  });
  return exploreSchema.parse(obj);
}

```

---

## 2) Warstwa API (katalog z parametrami + paginator)

### `src/lib/api/contracts.ts` (uzupełnienie typu listy)

```tsx
export type ExploreResult = {
  items: ExploreItem[];
  total: number;
  page: number;
  per: number;
};

```

### `src/lib/api/queries.ts` (SSR-friendly fetch)

```tsx
import type { ExploreParams, ExploreResult } from "../search/schema";
import { EP } from "./endpoints";
import api from "./http";

export async function fetchExplore(params: ExploreParams): Promise<ExploreResult> {
  const { data } = await api.get(EP.creators(), { params: {
    q: params.q,
    page: params.page, per: params.per,
    category: params.category, tags: params.tags,
    location: params.location,
    audienceMin: params.audienceMin, audienceMax: params.audienceMax,
    monetization: params.monetization,
    active: params.active,
    sort: params.sort,
  }});
  return data as ExploreResult;
}

```

---

## 3) Strona SSR + powłoka kliencka (filtry sterują URL-em)

### `app/explore/page.tsx` (Server Component)

```tsx
import { parseSearchParams } from "@/lib/search/schema";
import { fetchExplore } from "@/lib/api/queries";
import ExploreClient from "./shell";

export const dynamic = "force-dynamic"; // [Unverified] można zmienić na "auto" po decyzji o cache
export const revalidate = 0;

export default async function ExplorePage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  // Przekształcenie w URLSearchParams dla parsera
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (Array.isArray(v)) v.forEach(x => sp.append(k, String(x)));
    else if (v !== undefined) sp.set(k, String(v));
  }
  const params = parseSearchParams(sp);
  const initial = await fetchExplore(params);

  return <ExploreClient initial={initial} initialParams={params} />;
}

```

### `app/explore/shell.tsx` (Client Component — UI i interakcje)

```tsx
"use client";
import { useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CreatorCard from "@/components/explore/CreatorCard";
import SearchBar from "@/components/explore/SearchBar";
import SidebarFilters from "@/components/explore/SidebarFilters";
import Pagination from "@/components/ui/Pagination";
import type { ExploreParams } from "@/lib/search/schema";
import type { ExploreResult } from "@/lib/api/contracts";

export default function ExploreClient({ initial, initialParams }: { initial: ExploreResult; initialParams: ExploreParams }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [, start] = useTransition();

  // Hydratable snapshot danych SSR — prosty fallback zanim dojdzie refetch (jeśli dołożysz react-query).
  const data = initial;

  function pushParams(update: Partial<ExploreParams>) {
    const next = new URLSearchParams(sp.toString());
    Object.entries(update).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "" || (Array.isArray(v) && !v.length)) {
        next.delete(k);
      } else if (Array.isArray(v)) {
        next.delete(k); v.forEach(x => next.append(k, String(x)));
      } else {
        next.set(k, String(v));
      }
    });
    // reset paginacji przy zmianie filtrów
    if ("q" in update || "category" in update || "tags" in update || "location" in update || "monetization" in update || "audienceMin" in update || "audienceMax" in update || "sort" in update) {
      next.set("page", "1");
    }
    start(() => router.push(`/explore?${next.toString()}`));
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 text-white grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      <aside className="lg:sticky lg:top-16 lg:h-[calc(100vh-6rem)]">
        <SidebarFilters params={initialParams} onChange={pushParams} />
      </aside>

      <section>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold">Odkrywaj twórców</h1>
          <div className="ml-auto">
            <SearchBar onSearch={(q)=>pushParams({ q })} defaultValue={initialParams.q ?? ""} />
          </div>
          <selectdefaultValue={initialParams.sort}
            onChange={(e)=>pushParams({ sort: e.currentTarget.value as ExploreParams["sort"] })}
            className="rounded-lg bg-white/5 border border-white/10 p-2"
            aria-label="Sortuj według"
          >
            <option value="relevance">Trafność</option>
            <option value="tips_total">Suma napiwków</option>
            <option value="followers">Obserwujący</option>
            <option value="recent_activity">Aktywność</option>
          </select>
        </div>

        {!data.items.length ? (
          <p className="opacity-70 mt-6">Brak wyników. Doprecyzuj filtry.</p>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.items.map((c)=> (<CreatorCard key={c.alias} {...c} />))}
            </div>
            <Paginationpage={data.page}
              per={data.per}
              total={data.total}
              onPage={(p)=>pushParams({ page: p })}
            />
          </>
        )}
      </section>
    </main>
  );
}

```

---

## 4) UI filtrów i paginacji

### `src/components/explore/SidebarFilters.tsx`

```tsx
"use client";
import type { ExploreParams } from "@/lib/search/schema";
import { monetizations } from "@/lib/search/schema";
import { useState, useEffect } from "react";

type Props = { params: ExploreParams; onChange: (u: Partial<ExploreParams>) => void };

export default function SidebarFilters({ params, onChange }: Props){
  const [category, setCategory] = useState<string[]>(params.category ?? []);
  const [tags, setTags] = useState<string[]>(params.tags ?? []);
  const [loc, setLoc] = useState(params.location ?? "");
  const [audMin, setAudMin] = useState(params.audienceMin ?? 0);
  const [audMax, setAudMax] = useState(params.audienceMax ?? 0);
  const [mon, setMon] = useState<string[]>(params.monetization ?? []);
  const [active, setActive] = useState<boolean>(!!params.active);

  // commit: pojedynczy „Zastosuj” — mniej re-renderów i czystsze URL
  function apply(){
    onChange({
      category: category.length ? category : undefined,
      tags: tags.length ? tags : undefined,
      location: loc || undefined,
      audienceMin: audMin || undefined,
      audienceMax: audMax || undefined,
      monetization: mon.length ? mon as ExploreParams["monetization"] : undefined,
      active: active ? true : undefined,
    });
  }

  return (
    <form onSubmit={(e)=>{e.preventDefault(); apply();}} className="grid gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
      <h2 className="text-lg font-semibold">Filtry</h2>

      <label className="grid gap-1">
        <span className="text-sm opacity-80">Kategorie (wielokrotny wybór)</span>
        <inputplaceholder="np. muzyka, grafika"
          defaultValue={(params.category ?? []).join(", ")}
          onBlur={(e)=>setCategory(e.currentTarget.value.split(",").map(s=>s.trim()).filter(Boolean))}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm opacity-80">Tagi</span>
        <inputplaceholder="np. ilustracja, live"
          defaultValue={(params.tags ?? []).join(", ")}
          onBlur={(e)=>setTags(e.currentTarget.value.split(",").map(s=>s.trim()).filter(Boolean))}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm opacity-80">Lokalizacja</span>
        <inputplaceholder="PL|Warszawa lub tylko kraj"
          defaultValue={loc}
          onBlur={(e)=>setLoc(e.currentTarget.value.trim())}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <label className="grid gap-1">
          <span className="text-sm opacity-80">Publiczność min.</span>
          <input type="number" min={0} defaultValue={audMin}
                 onBlur={(e)=>setAudMin(Number(e.currentTarget.value||0))}
                 className="rounded-lg bg-white/5 border border-white/10 p-2" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm opacity-80">Publiczność max.</span>
          <input type="number" min={0} defaultValue={audMax}
                 onBlur={(e)=>setAudMax(Number(e.currentTarget.value||0))}
                 className="rounded-lg bg-white/5 border border-white/10 p-2" />
        </label>
      </div>

      <fieldset className="grid gap-2">
        <legend className="text-sm opacity-80">Monetyzacja</legend>
        {monetizations.map(m=>(
          <label key={m} className="inline-flex items-center gap-2">
            <input type="checkbox" defaultChecked={mon.includes(m)} onChange={(e)=>setMon(s=> e.target.checked? [...s,m] : s.filter(x=>x!==m) )}/>
            <span className="capitalize">{m}</span>
          </label>
        ))}
      </fieldset>

      <label className="inline-flex items-center gap-2">
        <input type="checkbox" defaultChecked={active} onChange={(e)=>setActive(e.target.checked)} />
        <span>Aktywni ostatnio</span>
      </label>

      <button className="rounded-lg bg-teal-500 text-black font-semibold px-4 py-2">Zastosuj</button>
    </form>
  );
}

```

### `src/components/ui/Pagination.tsx`

```tsx
"use client";
export default function Pagination({ page, per, total, onPage }:{
  page: number; per: number; total: number; onPage: (p:number)=>void;
}){
  const pages = Math.max(1, Math.ceil(total / per));
  if (pages <= 1) return null;
  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Paginacja">
      <button disabled={page<=1} onClick={()=>onPage(page-1)} className="px-3 py-1 rounded-lg border border-white/15 disabled:opacity-50">Poprzednia</button>
      <span className="text-sm opacity-80">Strona {page} z {pages}</span>
      <button disabled={page>=pages} onClick={()=>onPage(page+1)} className="px-3 py-1 rounded-lg border border-white/15 disabled:opacity-50">Następna</button>
    </nav>
  );
}

```

### `src/components/explore/SearchBar.tsx` (callback)

```tsx
"use client";
import { useState } from "react";
export default function SearchBar({ onSearch, defaultValue="" }:{ onSearch:(q:string)=>void; defaultValue?: string }){
  const [q, setQ] = useState(defaultValue);
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSearch(q.trim());}} className="flex gap-2">
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Szukaj po nazwie lub aliasie"
             className="flex-1 rounded-lg bg-white/5 border border-white/10 p-3 text-white" />
      <button className="px-4 rounded-lg bg-teal-500 text-black font-semibold">Szukaj</button>
    </form>
  );
}

```

---

## 5) A11y, SEO, wydajność

- SSR zapewnia indeksowalność listy i stabilny HTML dla CWV.
- Filtry mają widoczne etykiety, przycisk „Zastosuj”, role i atrybuty formularza.
- Paginacja z `aria-label="Paginacja"` i kontrolami „Poprzednia/Następna”.
- Brak ciężkich bibliotek, brak globalnego 3D, brak regresji LCP.

# KROK 11/N — SEO & Social: dynamiczne metadane, JSON-LD i obrazy OpenGraph

Cel: indeksowalność, podgląd w socialach, kanoniczne URL-e, minimalny narzut wydajności. Zero zmian w IMMUTABLE.

---

## 1) Helpery SEO (BASE URL, kanoniczne, scrubber parametrów)

### `src/lib/seo/site.ts`

```tsx
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");
export function canonical(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL || "http://localhost:3000"}${p}`;
}
/** Usuwa puste wartości i porządkuje query do kanonicznych linków. */
export function toQuery(init: Record<string, unknown>) {
  const qs = new URLSearchParams();
  Object.entries(init).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "" || (Array.isArray(v) && !v.length)) return;
    if (Array.isArray(v)) v.forEach(x => qs.append(k, String(x)));
    else qs.set(k, String(v));
  });
  const s = qs.toString();
  return s ? `?${s}` : "";
}

```

---

## 2) Profil twórcy: `generateMetadata` + JSON-LD

### `app/creators/[alias]/page.tsx` (dodaj u góry pliku)

```tsx
import type { Metadata } from "next";
import { canonical } from "@/lib/seo/site";
import api from "@/lib/api/http";
import { EP } from "@/lib/api/endpoints";

export async function generateMetadata(
  { params }: { params: { alias: string } }
): Promise<Metadata> {
  try {
    const { data } = await api.get(EP.creators(params.alias)); // GET /creators/{alias}
    const title = `${data.name} (@${data.alias}) — profil twórcy`;
    const description = data.bio?.slice(0, 160) || `Profil twórcy @${data.alias}`;
    const url = canonical(`/creators/${params.alias}`);
    const ogImages = data.bannerUrl ? [{ url: `${url}/opengraph-image` }] : undefined;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title, description, url,
        siteName: "TipJar+",
        images: ogImages,
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title, description, images: ogImages?.map(i => i.url),
      },
    };
  } catch {
    // fallback bez ujawniania błędu
    const url = canonical(`/creators/${params.alias}`);
    return {
      title: `Profil twórcy — ${params.alias}`,
      description: `Profil twórcy @${params.alias}`,
      alternates: { canonical: url },
    };
  }
}

```

### JSON-LD (w renderze tej strony — dodaj w return, najlepiej tuż pod <ProfileHero />)

```tsx
{/* Structured Data: Person/Creator */}
<script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": profile.name,
      "url": `${location?.origin ?? ""}/creators/${params.alias}`,
      "alternateName": `@${params.alias}`,
      "description": profile.bio || undefined,
      "image": profile.avatarUrl || undefined
    })
  }}
/>

```

> Jeśli komponent jest serwerowy, wstaw JSON-LD w części serwerowej bez odwołań do location. Dla SSR użyj kanonicznego z helpera: canonical(/creators/${params.alias}).
> 

---

## 3) Dynamiczny obraz OpenGraph dla profilu

### `app/creators/[alias]/opengraph-image.tsx`

```tsx
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import api from "@/lib/api/http";
import { EP } from "@/lib/api/endpoints";

export const runtime = "edge";
export const alt = "Podgląd profilu twórcy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { alias: string } }) {
  let data: any = { name: params.alias, avatarUrl: "", bannerUrl: "" };
  try {
    const res = await api.get(EP.creators(params.alias));
    data = res.data ?? data;
  } catch {}

  return new ImageResponse(
    (
      <divstyle={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "flex-end",
          background: data.bannerUrl ? `url(${data.bannerUrl}) center/cover` : "#0F1214",
        }}
      >
        <divstyle={{
            display: "flex",
            gap: 24,
            alignItems: "center",
            width: "100%",
            padding: "32px",
            background: "linear-gradient(0deg, rgba(0,0,0,0.65), rgba(0,0,0,0.0))",
            color: "white",
          }}
        >
          {/* Avatar */}
          <divstyle={{
              width: 120, height: 120, borderRadius: 120,
              background: "#222",
              backgroundImage: data.avatarUrl ? `url(${data.avatarUrl})` : undefined,
              backgroundSize: "cover", backgroundPosition: "center",
              border: "4px solid rgba(255,255,255,0.6)",
            }}
          />
          {/* Teksty */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 48, fontWeight: 800 }}>{data.name ?? params.alias}</div>
            <div style={{ fontSize: 28, opacity: 0.8 }}>@{params.alias}</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

```

---

## 4) „Odkrywaj”: metadane SSR + JSON-LD listy

### `app/explore/page.tsx` (dodaj `generateMetadata`)

```tsx
import type { Metadata } from "next";
import { canonical, toQuery } from "@/lib/seo/site";
import { parseSearchParams } from "@/lib/search/schema";

export async function generateMetadata(
  { searchParams }: { searchParams: Record<string, string | string[] | undefined> }
): Promise<Metadata> {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (Array.isArray(v)) v.forEach(x => sp.append(k, String(x)));
    else if (v !== undefined) sp.set(k, String(v));
  }
  const p = parseSearchParams(sp);
  const base = "/explore";
  const title = p.q ? `Szukaj: ${p.q} — Odkrywaj twórców` : "Odkrywaj twórców";
  const desc = "Przeglądaj twórców i filtruj po kategoriach, lokalizacji, tagach i metodach monetyzacji.";
  const url = canonical(`${base}${toQuery({ ...p })}`);
  return {
    title, description: desc, alternates: { canonical: url },
    openGraph: { title, description: desc, url, type: "website" },
    twitter: { card: "summary_large_image", title, description: desc }
  };
}

```

### `app/explore/shell.tsx` (wstaw JSON-LD `ItemList` pod nagłówkiem)

```tsx
{/* Structured Data: lista twórców */}
<script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": data.items.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1 + (data.page - 1) * data.per,
        "url": `/creators/${c.alias}`,
        "name": c.name
      })),
      "numberOfItems": data.items.length
    })
  }}
/>

```

# KROK 12/N — Observability & Quality Gate

Sentry (errors + performance + Web Vitals) • Error Boundaries • Lighthouse CI (budżety) • axe a11y CI • Budżet paczek

---

## 1) Sentry — instalacja i konfiguracja

**Deps**

```bash
pnpm add @sentry/nextjs

```

**Env (prod + preview)**

```
SENTRY_DSN=__TWÓJ_DSN__
SENTRY_ENV=production
SENTRY_AUTH_TOKEN=__CI_TOKEN_DO_RELEASES__   # tylko w CI

```

**`sentry.client.config.ts`**

```tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENV || process.env.NODE_ENV,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({ maskAllText: false, blockAllMedia: true }),
  ],
  tracesSampleRate: 0.2,        // [Unverified] dostosuj
  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0,
});

```

**`sentry.server.config.ts`**

```tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENV || process.env.NODE_ENV,
  tracesSampleRate: 0.2,  // [Unverified]
});

```

**`instrumentation.ts`** (OTel hook aktywowany przez Next)

```tsx
export async function register() {
  // @sentry/nextjs przechwytuje automatycznie, nic tu nie trzeba robić.
}

```

**`next.config.mjs` (patch)** — owiń istniejący eksport

```jsx
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  // …twoja dotychczasowa konfiguracja (i18n, headers, CSP itd.)
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "YOUR_ORG", project: "YOUR_PROJECT",
}, {
  hideSourcemaps: true,
});

```

---

## 2) Error Boundaries (App Router)

**Globalny fallback (krytyczne błędy) — `app/global-error.tsx`**

```tsx
"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <html><body className="min-h-screen grid place-items-center bg-[var(--surface-2)] text-[var(--fg)]">
      <div className="max-w-md p-6 rounded-2xl border border-white/10 bg-white/5">
        <h1 className="text-xl font-semibold">Coś poszło nie tak</h1>
        <p className="mt-2 text-sm opacity-80">Zgłoszono błąd. Spróbuj ponownie.</p>
        <div className="mt-4 flex gap-2">
          <button onClick={reset} className="px-4 py-2 rounded-lg bg-primary text-black">Odśwież</button>
        </div>
      </div>
    </body></html>
  );
}

```

**Per-route fallback — `app/error.tsx`**

```tsx
"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
      <div className="font-semibold">Błąd wczytywania</div>
      <button onClick={reset} className="mt-3 rounded-lg border border-red-200/30 px-3 py-1">Spróbuj ponownie</button>
    </div>
  );
}

```

---

## 3) Web Vitals → Sentry (bez dotykania `app/layout.tsx`)

**`src/lib/metrics/webvitals.tsx`** — klientowy „sensor” do wpięcia w istniejące layouty (np. `app/dashboard/layout.tsx`)

```tsx
"use client";
import { onCLS, onFID, onLCP, onINP, onTTFB } from "web-vitals";
import * as Sentry from "@sentry/nextjs";

function send(name: string, value: number) {
  Sentry.captureMessage("web-vital", {
    level: "info",
    tags: { vital: name },
    contexts: { vital: { name, value } },
  });
}

export default function WebVitalsProbe() {
  onCLS((m)=>send("CLS", m.value));
  onFID((m)=>send("FID", m.value));
  onLCP((m)=>send("LCP", m.value));
  onINP((m)=>send("INP", m.value));
  onTTFB((m)=>send("TTFB", m.value));
  return null;
}

```

**Wpięcie** (np. w `app/dashboard/layout.tsx`, poniżej `<HeaderBar />`)

```tsx
import WebVitalsProbe from "@/lib/metrics/webvitals";
...
<HeaderBar title="Panel twórcy" />
<WebVitalsProbe />
<main className="p-6"> {children} </main>

```

> Dodaj też w publicznym layoucie (np. app/explore/layout.tsx), aby objąć strony SEO.
> 

---

## 4) Lighthouse CI — budżety i gate w PR

**Deps (dev)**

```bash
pnpm add -D @lhci/cli

```

**`.lighthouserc.cjs`**

```jsx
module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm build && pnpm start",
      url: ["http://localhost:3000/", "http://localhost:3000/explore"],
      numberOfRuns: 3,
      settings: { preset: "desktop" },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.90 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "unused-javascript": ["warn", { maxLength: 120 * 1024 }],
        "largest-contentful-paint": ["error", { numericValue: 3500 }],
        "cumulative-layout-shift": ["error", { numericValue: 0.1 }],
        "interactive": ["warn", { numericValue: 4000 }],
      },
    },
    upload: { target: "temporary-public-storage" },
  },
};

```

**`.github/workflows/lhci.yml`**

```yaml
name: Lighthouse CI
on: [pull_request]
jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: npx @lhci/cli autorun

```

---

## 5) axe — testy dostępności w CI (Playwright)

**Deps (dev)**

```bash
pnpm add -D @playwright/test @axe-core/playwright

```

**`tests/a11y.spec.ts`**

```tsx
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Explore — bez krytycznych błędów a11y", async ({ page }) => {
  await page.goto("/explore");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a","wcag2aa"]).analyze();
  const violations = results.violations.filter(v => v.impact === "critical" || v.impact === "serious");
  expect(violations).toEqual([]);
});

```

**`package.json` (skróty)**

```json
{
  "scripts": {
    "test:a11y": "playwright test -c tests"
  }
}

```

---

## 6) Budżet paczek (bundle size gate)

**Deps (dev)**

```bash
pnpm add -D nextjs-bundle-analysis size-limit @size-limit/file

```

**`size-limit.config.cjs`**

```jsx
module.exports = [
  { name: "client-chunk", path: ".next/static/chunks/*.js", limit: "240 kB" } // [Unverified] dopasuj
];

```

**`package.json`**

```json
{
  "scripts": {
    "analyze": "ANALYZE=true next build",
    "size": "size-limit"
  }
}

```

**CI krok** — dodaj do workflow PR:

```yaml
- run: pnpm build
- run: pnpm size

```

---

## 7) Quality Gate — zasady „blokuj PR”

- Sentry dsn ustawiony; brak nieobsłużonych błędów (Sentry issues = 0 dla PR preview).
- Lighthouse CI: performance ≥ 0.90, a11y ≥ 0.95, SEO ≥ 0.95; LCP ≤ 3.5 s, CLS ≤ 0.1.
- axe: brak „serious/critical” violations na kluczowych trasach (`/`, `/explore`, `/creators/alias`, `/dashboard`).
- Bundle size: każdy klientowy chunk ≤ 240 kB po kompresji (ustal limit docelowy po pierwszym pomiarze).

# KROK 13/N — i18n PL/EN: słowniki, provider, przełącznik języka, formaty liczb/dat

Cel: tłumaczenia bez ruszania IMMUTABLE. Brak przebudowy tras. Używamy preferencji użytkownika (`/me.locale`) + fallback PL.

---

## 1) Słowniki i helpery

### `src/i18n/config.ts`

```tsx
export const locales = ["pl","en"] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = "pl";

```

### `src/i18n/dictionaries/pl.ts`

```tsx
export const pl = {
  dashboard: "Pulpit",
  profile: "Profil",
  withdrawals: "Wypłaty",
  goal: "Cel finansowy",
  subscriptions: "Subskrypcje",
  explore: "Odkrywaj twórców",
  follow: "Obserwuj",
  support: "Wesprzyj",
  wallet: "Portfel",
  notifications: "Powiadomienia",
  settings: "Ustawienia",
  apply: "Zastosuj",
  save: "Zapisz",
  tip_sent: "Dziękujemy! Wysłano napiwek.",
};
export type DictKeys = keyof typeof pl;

```

### `src/i18n/dictionaries/en.ts`

```tsx
export const en: Record<import("./pl").DictKeys,string> = {
  dashboard: "Dashboard",
  profile: "Profile",
  withdrawals: "Withdrawals",
  goal: "Goal",
  subscriptions: "Subscriptions",
  explore: "Explore creators",
  follow: "Follow",
  support: "Support",
  wallet: "Wallet",
  notifications: "Notifications",
  settings: "Settings",
  apply: "Apply",
  save: "Save",
  tip_sent: "Thank you! Tip sent.",
};

```

### `src/i18n/index.ts`

```tsx
import { defaultLocale, type Locale } from "./config";
import { pl, type DictKeys } from "./dictionaries/pl";
import { en } from "./dictionaries/en";

const dict: Record<Locale, Record<DictKeys,string>> = { pl, en };

export function t(locale: Locale, key: DictKeys){ return dict[locale]?.[key] ?? key; }
export function hasKey(key: string): key is DictKeys { return key in pl; }

```

---

## 2) Provider + hook + formatery

### `src/i18n/locale-provider.tsx`

```tsx
"use client";
import { createContext, useContext } from "react";
import { defaultLocale, type Locale } from "./config";
import { t as tt, hasKey } from "./index";

const Ctx = createContext<Locale>(defaultLocale);
export function LocaleProvider({ locale, children }:{ locale?: Locale; children: React.ReactNode }){
  return <Ctx.Provider value={locale ?? defaultLocale}>{children}</Ctx.Provider>;
}
export function useLocale(){ return useContext(Ctx); }
export function useT(){ const l = useLocale(); return (k: Parameters<typeof tt>[1]) => tt(l,k); }

```

### `src/i18n/format.ts`

```tsx
import { type Locale, defaultLocale } from "./config";
export const fx = {
  currency(n: number, locale: Locale = defaultLocale){ return new Intl.NumberFormat(locale, { style:"currency", currency:"USD", minimumFractionDigits:2 }).format(n).replace("US$", "").trim()+" USDC"; },
  date(d: string|number|Date, locale: Locale = defaultLocale){ return new Intl.DateTimeFormat(locale, { dateStyle:"medium", timeStyle:"short" }).format(new Date(d)); }
};

```

---

## 3) Przełącznik języka (persist w `/me`)

### `src/components/ui/LanguageSwitcher.tsx`

```tsx
"use client";
import { useLocale } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/config";
import { useUpdateMe } from "@/lib/api/queries";
import { useToast } from "@/components/ui/Toast";

export default function LanguageSwitcher(){
  const locale = useLocale();
  const { mutateAsync, isPending } = useUpdateMe();
  const toast = useToast();

  async function setLocale(next: Locale){
    await mutateAsync({ locale: next });
    toast.push({ type: "success", text: next === "pl" ? "Zmieniono język na polski." : "Language set to English." });
  }

  return (
    <div className="inline-flex rounded-lg border border-white/15">
      {(["pl","en"] as const).map(l=>(
        <button key={l} disabled={isPending}
          onClick={()=> setLocale(l)}
          className={`px-3 py-1 text-sm ${locale===l?"bg-primary text-black":"bg-transparent"}`}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

```

---

## 4) Wpięcie providera i switchera (bez IMMUTABLE)

### `app/dashboard/layout.tsx` (modyfikacja akcji w HeaderBar)

```tsx
import { LocaleProvider } from "@/i18n/locale-provider";
import { useMe } from "@/lib/api/queries"; // w layout klientowym lub wrapperze

// Zmień export na klientowy wrapper, by odczytać /me.locale:
"use client";
import Sidebar from "@/components/ui/Sidebar";
import HeaderBar from "@/components/ui/HeaderBar";
import RQProvider from "@/lib/api/reactQueryProvider";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const items = [ /* ...jak wcześniej... */ ];

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] bg-[var(--surface-2)] text-[var(--fg)]">
      <aside className="border-r border-white/10"><Sidebar items={items} /></aside>
      <LocaleConsumer>{children}</LocaleConsumer>
    </div>
  );
}

function LocaleConsumer({ children }:{ children:React.ReactNode }){
  // pobierz preferencję użytkownika
  const { data } = useMe(); // { email, locale }
  return (
    <div className="min-h-screen">
      <HeaderBar title="Panel twórcy" actions={<LanguageSwitcher/>} />
      <main className="p-6">
        <RQProvider>
          <LocaleProvider locale={(data?.locale as "pl"|"en") ?? "pl"}>
            {children}
          </LocaleProvider>
        </RQProvider>
      </main>
    </div>
  );
}

```

> Analogicznie możesz owinąć layout katalogu/stron publicznych lokalnym LocaleProvider z locale="pl".
> 

---

## 5) Użycie tłumaczeń w komponentach (przykłady)

### `src/components/dashboard/TipStatistics.tsx` (nagłówki z hooka)

```tsx
import { useT } from "@/i18n/locale-provider";
export default function TipStatistics({ series, total, fans }:{ series:number[]; total:number; fans:number }){
  const t = useT();
  return (
    <section className="grid sm:grid-cols-3 gap-4">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-sm opacity-80">{t("wallet")}</div>
        <div className="text-2xl font-bold">{total}</div>
      </div>
      {/* ... */}
    </section>
  );
}

```

### `app/settings/page.tsx` (etykiety z `useT`)

```tsx
const t = useT();
// <h1>{t("settings")}</h1> itd.

```

---

## 6) Test: spójność słowników

### `scripts/check-i18n.ts`

```tsx
import { pl } from "../src/i18n/dictionaries/pl";
import { en } from "../src/i18n/dictionaries/en";
const p = Object.keys(pl).sort(); const e = Object.keys(en).sort();
const missing = p.filter(k => !(k in en));
const extra = e.filter(k => !(k in pl));
if (missing.length || extra.length) {
  console.error("I18N mismatch:", { missing_in_en: missing, extra_in_en: extra });
  process.exit(1);
}
console.log("I18N OK");

```

**`package.json`**

```json
{ "scripts": { "test:i18n": "ts-node scripts/check-i18n.ts" } }

```

### `src/components/explore/CreatorCard.tsx`

```tsx
// src/components/explore/CreatorCard.tsx
import Link from "next/link";

type Props = {
  alias: string;
  name: string;
  avatarUrl?: string;
  category?: string;
  tipsTotal?: number;
};

export default function CreatorCard({ alias, name, avatarUrl, category, tipsTotal }: Props) {
  return (
    <Linkhref={`/creators/${alias}`}
      aria-label={`Zobacz profil ${name}`}
      className="group rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition block p-4"
    >
      <div className="flex items-center gap-3">
        <divclassName="w-14 h-14 rounded-full border border-white/15 bg-white/10 shrink-0"
          style={
            avatarUrl
              ? { backgroundImage: `url(${avatarUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
              : undefined
          }
          aria-hidden
        />
        <div className="min-w-0">
          <div className="font-semibold truncate">{name}</div>
          <div className="text-sm opacity-70 truncate">@{alias}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="opacity-80 truncate">{category ?? "Twórca"}</span>
        {typeof tipsTotal === "number" && (
          <span className="opacity-80">{tipsTotal} USDC</span>
        )}
      </div>

      <div className="mt-4">
        <span className="inline-block px-3 py-1 rounded-lg border border-white/15 group-hover:border-white/30">
          Zobacz profil
        </span>
      </div>
    </Link>
  );
}

```

### `app/creators/[alias]/page.tsx`

```tsx
// app/creators/[alias]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import api from "@/lib/api/http";
import { EP } from "@/lib/api/endpoints";
import { canonical } from "@/lib/seo/site";
import ToastHost from "@/components/ui/Toast";
import SupportButton from "@/components/creator/SupportButton";

type CreatorProfile = {
  id: string;
  alias: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  links?: { youtube?: string; twitch?: string; twitter?: string; instagram?: string };
  goal?: { target: number; current: number };
};

export async function generateMetadata(
  { params }: { params: { alias: string } }
): Promise<Metadata> {
  try {
    const { data } = await api.get(EP.creators(params.alias));
    const title = `${data.name} (@${data.alias}) — profil twórcy`;
    const description = data.bio?.slice(0, 160) || `Profil twórcy @${data.alias}`;
    const url = canonical(`/creators/${params.alias}`);
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title, description, url, siteName: "TipJar+",
        images: data.bannerUrl ? [{ url: `${url}/opengraph-image` }] : undefined,
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title, description,
        images: data.bannerUrl ? [`${url}/opengraph-image`] : undefined,
      },
    };
  } catch {
    const url = canonical(`/creators/${params.alias}`);
    return {
      title: `Profil twórcy — ${params.alias}`,
      description: `Profil twórcy @${params.alias}`,
      alternates: { canonical: url },
    };
  }
}

export default async function CreatorPage({ params }: { params: { alias: string } }) {
  const { data: profile } = await api.get<CreatorProfile>(EP.creators(params.alias));
  const url = canonical(`/creators/${params.alias}`);

  return (
    <div className="text-white">
      <ToastHost />

      {/* Hero / baner */}
      <sectionclassName="h-56 w-full relative border-b border-white/10"
        style={
          profile.bannerUrl
            ? { backgroundImage: `url(${profile.bannerUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: "linear-gradient(135deg,#0f172a,#111827)" }
        }
        aria-label="Baner twórcy"
      />

      {/* Nagłówek profilu */}
      <section className="max-w-5xl mx-auto px-6 -mt-10">
        <div className="flex items-end gap-4">
          <divclassName="w-24 h-24 rounded-full border-4 border-[var(--surface-2)] outline outline-1 outline-white/15 bg-white/10"
            style={
              profile.avatarUrl
                ? { backgroundImage: `url(${profile.avatarUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                : undefined
            }
            aria-hidden
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold truncate">{profile.name}</h1>
            <div className="opacity-80">@{profile.alias}</div>
          </div>
          <div className="flex gap-2">
            <SupportButton creatorAlias={profile.alias} />
            {/* Opcjonalnie: przycisk „Obserwuj” po dodaniu API */}
          </div>
        </div>

        {/* Bio + linki + cel */}
        <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
          <article className="prose prose-invert max-w-none">
            {profile.bio ? <p>{profile.bio}</p> : <p className="opacity-70">Ten twórca nie dodał jeszcze bio.</p>}
          </article>

          <aside className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <h2 className="text-lg font-semibold mb-2">Linki</h2>
            <ul className="space-y-1 text-sm">
              {profile.links?.youtube && (
                <li><Link className="underline" href={profile.links.youtube}>YouTube</Link></li>
              )}
              {profile.links?.twitch && (
                <li><Link className="underline" href={profile.links.twitch}>Twitch</Link></li>
              )}
              {profile.links?.twitter && (
                <li><Link className="underline" href={profile.links.twitter}>Twitter/X</Link></li>
              )}
              {profile.links?.instagram && (
                <li><Link className="underline" href={profile.links.instagram}>Instagram</Link></li>
              )}
              {!profile.links && <li className="opacity-70">Brak linków.</li>}
            </ul>

            {profile.goal?.target ? (
              <div className="mt-4">
                <h3 className="font-semibold">Cel</h3>
                <div className="mt-1 text-sm opacity-80">
                  {profile.goal.current ?? 0} / {profile.goal.target} USDC
                </div>
                <div className="mt-2 h-2 rounded bg-white/10 overflow-hidden">
                  <divclassName="h-full bg-teal-500"
                    style={{
                      width: `${Math.min(100, Math.round(((profile.goal.current ?? 0) / Math.max(1, profile.goal.target)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {/* Structured Data */}
      <scripttype="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            url,
            alternateName: `@${params.alias}`,
            description: profile.bio || undefined,
            image: profile.avatarUrl || undefined,
          }),
        }}
      />
    </div>
  );
}

```

# KROK 14/N — RBAC + twarde auth (JWT), Edge rate-limit (Upstash), audyt zdarzeń

Cel: egzekwować role (FAN/CREATOR/ADMIN) na trasach i w UI, weryfikować sesję po stronie serwera (JWT), ograniczać nadużycia (rate-limit na mutacjach), logować audyt. Bez zmian w IMMUTABLE.

---

## 1) Typy ról i helpery RBAC

### `src/lib/auth/roles.ts`

```tsx
export type Role = "FAN" | "CREATOR" | "ADMIN";

export const RoleOrder: Record<Role, number> = { FAN: 1, CREATOR: 2, ADMIN: 3 };

export function hasRole(userRole: Role | undefined, required: Role | Role[]) {
  if (!userRole) return false;
  const req = Array.isArray(required) ? required : [required];
  return req.some(r => RoleOrder[userRole] >= RoleOrder[r]);
}

```

---

## 2) Weryfikacja JWT (server) — JOSE

### deps

```bash
pnpm add jose

```

### `src/lib/auth/jwt.ts`

```tsx
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { Role } from "./roles";

const ISS = process.env.AUTH_JWT_ISSUER;            // np. https://auth.example.com
const AUD = process.env.AUTH_JWT_AUDIENCE;          // np. tipjar-frontend
const JWKS = process.env.AUTH_JWKS_URL;             // np. https://auth.example.com/.well-known/jwks.json
const PUB = process.env.AUTH_JWT_PUBLIC_KEY?.replace(/\\n/g, "\n"); // opcja alternatywna

let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;
if (JWKS) jwks = createRemoteJWKSet(new URL(JWKS));

export type SessionClaims = {
  sub: string;
  email?: string;
  role?: Role;
};

export async function verifyJwt(token: string): Promise<SessionClaims | null> {
  try {
    const algs = ["RS256","ES256","EdDSA"];
    if (jwks) {
      const { payload } = await jwtVerify(token, jwks, { issuer: ISS, audience: AUD, algorithms: algs });
      return { sub: String(payload.sub), email: payload.email as string | undefined, role: payload.role as Role | undefined };
    }
    if (PUB) {
      const enc = new TextEncoder();
      const key = await crypto.subtle.importKey("spki", str2ab(PUB), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
      const { payload } = await jwtVerify(token, key as unknown as CryptoKey, { issuer: ISS, audience: AUD, algorithms: ["RS256"] });
      return { sub: String(payload.sub), email: payload.email as string | undefined, role: payload.role as Role | undefined };
    }
    return null;
  } catch {
    return null;
  }
}

function str2ab(pem: string) {
  // oczekuje czystego klucza SPKI Base64 bez nagłówków -----BEGIN PUBLIC KEY-----
  const b64 = pem.replace(/-----(BEGIN|END) PUBLIC KEY-----/g, "").replace(/\s+/g, "");
  const raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  return raw.buffer;
}

```

---

## 3) Sesja i guardy (Server Components)

### `src/lib/auth/session.ts` (aktualizacja)

```tsx
"use server";
import { cookies } from "next/headers";
import { verifyJwt, type SessionClaims } from "./jwt";
import type { Role } from "./roles";

export type Session = (SessionClaims & { role: Role }) | null;

export async function getSession(): Promise<Session> {
  const raw = cookies().get("auth_token")?.value || cookies().get("tipjar.sid")?.value;
  if (!raw) return null;
  const claims = await verifyJwt(raw);
  if (!claims || !claims.sub) return null;
  return { ...claims, role: (claims.role ?? "FAN") as Role };
}

```

### `src/lib/auth/guard.ts` (requireAuth + requireRole)

```tsx
"use server";
import { redirect } from "next/navigation";
import { getSession } from "./session";
import { hasRole, type Role } from "./roles";

export async function requireAuth(nextPath?: string) {
  const s = await getSession();
  if (!s) redirect(`/register${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`);
  return s;
}

export async function requireRole(required: Role | Role[], nextPath?: string) {
  const s = await requireAuth(nextPath);
  if (!hasRole(s.role, required)) redirect("/"); // brak uprawnień
  return s;
}

```

**Użycie w stronach:**

```tsx
// app/dashboard/page.tsx
import { requireRole } from "@/lib/auth/guard";
export default async function DashboardPage() {
  await requireRole("CREATOR", "/dashboard");
  return <div>...</div>;
}

```

---

## 4) RBAC w middleware + Edge rate-limit (Upstash)

### deps

```bash
pnpm add @upstash/ratelimit @upstash/redis

```

### `middleware.ts` (aktualizacja)

```tsx
import { NextResponse, type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
  : null;

// 120 mutacji / 10 min / IP (globalnie); kreuje bucket per metoda+ścieżka
const limiter = redis ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(120, "10 m") }) : null;

const CREATOR_ONLY = ["/dashboard", "/dashboard/profile", "/dashboard/withdrawals", "/dashboard/goal", "/dashboard/subscriptions"];

function readJwt(req: NextRequest) {
  const t = req.cookies.get("auth_token")?.value || req.cookies.get("tipjar.sid")?.value;
  // szybki hint roli z nagłówka reverse proxy (opcjonalny)
  const hdr = req.headers.get("x-user-role");
  return { token: t, roleHint: hdr };
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rate-limit tylko mutacje
  if (["POST","PUT","PATCH","DELETE"].includes(req.method) && limiter) {
    const ip = req.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";
    const key = `${ip}:${req.method}:${pathname}`;
    const { success } = await limiter.limit(key);
    if (!success) return new NextResponse("Too Many Requests", { status: 429 });
  }

  // RBAC: CREATOR_ONLY
  const isCreatorArea = CREATOR_ONLY.some(p => pathname === p || pathname.startsWith(p + "/"));
  if (isCreatorArea) {
    const { token, roleHint } = readJwt(req);
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/register";
      url.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
    // szybka weryfikacja: jeśli reverse proxy podało rolę i nie jest CREATOR/ADMIN
    if (roleHint && !["CREATOR","ADMIN"].includes(roleHint)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/feed", "/wallet", "/following", "/notifications", "/settings",
    "/api/:path*", // jeśli masz własne route handlers, też pod rate-limit
  ],
};

```

> Uwaga: pełna weryfikacja JWT w middleware wymaga reimplementacji verify w Edge (WebCrypto) lub przekazania nagłówka z BFF. Powyższy wariant używa „role hint” z reverse proxy i cookie presence; twarda weryfikacja jest robiona w Server Components przez requireRole.
> 

---

## 5) UI gating (rola w kliencie)

### `src/lib/auth/useRole.ts`

```tsx
"use client";
import { useMe } from "@/lib/api/queries";
import type { Role } from "./roles";

export function useRole(): Role | undefined {
  const { data } = useMe();
  return (data as any)?.role as Role | undefined; // backend powinien zwracać role
}

```

**Przykład użycia (ukryj linki dashboardu dla FAN):**

```tsx
// src/components/ui/Sidebar.tsx (fragment)
import { useRole } from "@/lib/auth/useRole";
export default function Sidebar({ items }:{ items:{href:string; label:string}[] }) {
  const role = useRole();
  const visible = items.filter(i => role==="CREATOR" || role==="ADMIN" ? true : !i.href.startsWith("/dashboard"));
  // renderuj 'visible'
}

```

---

## 6) Audyt zdarzeń (log sink)

### `src/lib/audit/log.ts`

```tsx
type AuditEvent =
  | { type: "auth.login"; userId: string }
  | { type: "tip.create"; userId?: string; creatorId: string; amount: number }
  | { type: "withdraw.request"; userId: string; amount: number; address: string }
  | { type: "profile.update"; userId: string; fields: string[] };

export async function audit(ev: AuditEvent) {
  try {
    // [Unverified] podmień na Twój collector (np. backend /audit, Sentry breadcrumb, Logtail)
    if (process.env.NODE_ENV !== "production") console.debug("[audit]", ev);
  } catch {}
}

```

**Wpinanie (przykłady):**

```tsx
// po sukcesie napiwku
import { audit } from "@/lib/audit/log";
await mutateAsync({ creatorId, amount, message });
await audit({ type: "tip.create", creatorId, amount });

// po zleceniu wypłaty
await mutateAsync({ amount, address });
await audit({ type: "withdraw.request", userId: "me", amount, address });

```

# KROK 15/N — Płatności: webhooki i reconciliacja (etap 1/3, tylko plan)

Cel: zagwarantować spójność finansową (USDC) między frontendem, backendem i procesorem płatności poprzez twarde kontrakty zdarzeń, idempotencję i bezpieczne potwierdzenia.

## Zakres etapu 1 (do akceptacji)

1. Model zdarzeń i stany: `tip.{created|settled|failed}`, `withdraw.{requested|processed|failed}`, `subscription.{started|renewed|canceled|failed}` — definicje pól, stany końcowe, przejścia.
2. Kontrakty webhooków: ścieżki, schemat JSON (strict), nagłówki, sygnatury HMAC/Ed25519, replay protection, okna czasu.
3. Idempotency: polityka kluczy dla POST (front→API) i dla webhooków (processor→API), semantyka odpowiedzi 2xx/4xx/409.
4. Retry/backoff: matryca „źródło→cel”, limity, DLQ, inspekcja techniczna (dash).
5. Reconciliacja: dzienne joby porównujące księgę wewnętrzną z raportami procesora; raport różnic i akcje naprawcze.

# KROK 15/N — Płatności (USDC): webhooki i reconciliacja

Etap 2/3 — **twarda specyfikacja kontraktów** (eventy, podpisy, idempotencja, retry, testy). Zero zmian w IMMUTABLE.

---

## 1) Model zdarzeń i stany (kanoniczne)

| Obiekt | Stany (końcowe pogrubione) | Dozwolone przejścia |
| --- | --- | --- |
| `Tip` | `created` → **`settled`** / **`failed`** | `created`→`settled` lub `created`→`failed` |
| `Withdrawal` | `requested` → `processing` → **`processed`** / **`failed`** | `requested`→`processing`→`processed/failed` |
| `Subscription` | `started` → `active` → `renewed` (wielokrotnie) → **`canceled`** / **`failed`** | `started`→`active`→`renewed`*, `active`→`canceled/failed` |
- Zdarzenia webhooków muszą być **idempotentne** i **porządkowane logicznie**: akceptujemy out-of-order, a backend sam koryguje stan na podstawie reguł powyżej.

---

## 2) Webhook endpointy (inbound do backendu)

- `POST /api/v1/webhooks/payments` — pojedynczy event.
- `POST /api/v1/webhooks/batch` — tablica eventów (opcjonalnie).
- `Content-Type: application/json; charset=utf-8`

### Wymagane nagłówki bezpieczeństwa

- `X-Pay-Event-Id: <uuid-v4>` — unikalny identyfikator zdarzenia.
- `X-Pay-Event-Type: <tip.created|tip.settled|...>` — lustrzany z payloadu.
- `X-Pay-Timestamp: <epoch-seconds>` — okno akceptacji ≤ 300 s.
- `X-Pay-Idempotency-Key: <uuid-v4>` — per-dostawca; deduplikacja.
- `X-Pay-Signature: v1=base64,alg=ed25519` lub `v1=hex,alg=hmac-sha256` — podpis całego body z kanonicznym łączeniem `timestamp + "." + body`.

> Replay protection: odrzuć żądania jeśli now - X-Pay-Timestamp > 300 s lub jeśli X-Pay-Event-Id/X-Pay-Idempotency-Key istnieje w store.
> 

---

## 3) JSON Schema (Draft 2020-12) — koperta i typy danych

### 3.1 Koperta zdarzenia

```json
{
  "$id": "https://tipjar/spec/event-envelope.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["eventId","type","createdAt","source","data"],
  "properties": {
    "eventId": { "type": "string", "format": "uuid" },
    "type": { "type": "string", "enum": [
      "tip.created","tip.settled","tip.failed",
      "withdraw.requested","withdraw.processing","withdraw.processed","withdraw.failed",
      "subscription.started","subscription.renewed","subscription.canceled","subscription.failed"
    ]},
    "createdAt": { "type": "string", "format": "date-time" },
    "source": { "type": "string", "minLength": 1 },
    "data": { "type": "object" }
  },
  "unevaluatedProperties": false}

```

### 3.2 $defs: domena płatności

```json
{
  "$id": "https://tipjar/spec/payment-defs.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$defs": {
    "money": {
      "type": "object",
      "required": ["amount","currency"],
      "properties": {
        "amount": { "type": "number", "exclusiveMinimum": 0 },
        "currency": { "type": "string", "const": "USDC" }
      },
      "unevaluatedProperties": false},
    "tip": {
      "type": "object",
      "required": ["tipId","creatorId","money"],
      "properties": {
        "tipId": { "type": "string", "format": "uuid" },
        "creatorId": { "type": "string" },
        "fanId": { "type": "string" },
        "message": { "type": "string", "maxLength": 500 },
        "money": { "$ref": "#/$defs/money" },
        "txHash": { "type": "string" },
        "processorRef": { "type": "string" }
      },
      "unevaluatedProperties": false},
    "withdrawal": {
      "type": "object",
      "required": ["withdrawId","userId","toAddress","money"],
      "properties": {
        "withdrawId": { "type": "string", "format": "uuid" },
        "userId": { "type": "string" },
        "toAddress": { "type": "string", "pattern": "^0x[a-fA-F0-9]{40}$" },
        "money": { "$ref": "#/$defs/money" },
        "fee": { "type": "number", "minimum": 0 },
        "txHash": { "type": "string" },
        "processorRef": { "type": "string" }
      },
      "unevaluatedProperties": false},
    "subscription": {
      "type": "object",
      "required": ["subscriptionId","creatorId","fanId","money","period"],
      "properties": {
        "subscriptionId": { "type": "string", "format": "uuid" },
        "creatorId": { "type": "string" },
        "fanId": { "type": "string" },
        "money": { "$ref": "#/$defs/money" },
        "period": { "type": "string", "enum": ["month","year"] },
        "nextBillingAt": { "type": "string", "format": "date-time" },
        "processorRef": { "type": "string" }
      },
      "unevaluatedProperties": false}
  }
}

```

### 3.3 Przykładowe payloady (koperta + data)

```json
{
  "eventId": "f9a1c1f0-7b2e-4b1e-9f8a-348f9d1a6b10",
  "type": "tip.settled",
  "createdAt": "2025-09-08T11:22:33Z",
  "source": "processor.xyz",
  "data": {
    "tipId": "b2d6c0d2-8f4e-4d2b-9f0a-8bc52b40f6b1",
    "creatorId": "cr_123",
    "fanId": "fan_987",
    "message": "Dzięki!",
    "money": { "amount": 5.00, "currency": "USDC" },
    "txHash": "0xabc...",
    "processorRef": "pi_001"
  }
}

```

---

## 4) Semantyka odpowiedzi webhooków

- **2xx** — event przyjęty (lub zduplikowany, ale rozpoznany).
- **400** — niezgodny ze schematem (log + brak retry po stronie nadawcy).
- **401/403** — błąd podpisu/auth (brak retry).
- **409** — `eventId`/`idempotencyKey` już przetworzony (safe).
- **429** — rate-limit.
- **5xx** — błąd tymczasowy (retry wg polityki dostawcy).

---

## 5) Weryfikacja podpisu (pseudokod)

```tsx
// canonicalMessage = `${timestamp}.${rawBody}`
function verifySignature(headers, rawBody){
  const ts = headers["x-pay-timestamp"];
  const sig = headers["x-pay-signature"]; // "v1=<payload>,alg=<ed25519|hmac-sha256>"
  const alg = parseAlg(sig);
  const v1 = parseV1(sig);

  if (Math.abs(now() - Number(ts)) > 300) return false;

  const msg = `${ts}.${rawBody}`;

  if (alg === "ed25519") {
    return ed25519Verify(v1, msg, PUBLIC_KEY);
  } else if (alg === "hmac-sha256") {
    return hmacSHA256Verify(v1, msg, SHARED_SECRET);
  }
  return false;
}

```

---

## 6) Idempotencja

- **Inbound webhook:** deduplikacja po `eventId` i po `X-Pay-Idempotency-Key`. Storage: KV/DB z TTL ≥ 7 dni.
- **API publiczne (front→backend):** wymagaj nagłówka `Idempotency-Key` (już ustawiany w `http.ts`); ponowne POST zwraca **dokładnie tę samą** odpowiedź i status co pierwsze przetworzenie.

---

## 7) Retry i backoff (zalecenia)

- **Processor → Webhook:** exponential backoff: 1m, 3m, 10m, 30m, 2h, 6h, 24h; max 24–48h.
- **Webhook batch:** częściowa porażka = odpowiedź 207 (Multi-Status) z listą przyjętych/odrzuconych [opcjonalnie]; w przeciwnym razie 2xx/4xx/5xx globalnie.
- **Front → API (mutacje):** klient retry=0; polegamy na idempotencji i jasnych błędach użytkownika.

---

## 8) Reconciliacja (dzienna)

- **Źródła:** raport procesora (pagowane API), księga wewnętrzna (`tips`, `withdrawals`, `subscriptions`).
- **Dopasowanie kluczy:** `processorRef` lub `txHash` lub `(amount,counterparty,day)`.
- **Kategorie rozbieżności:**
    1. `MISSING_IN_BOOK` — procesor ma transakcję, księga nie ma.
    2. `MISSING_IN_PROCESSOR` — księga ma transakcję, brak w raporcie.
    3. `AMOUNT_MISMATCH` — różna kwota/opłata.
    4. `STATUS_DRIFT` — inny stan końcowy.
    5. `ORPHAN` — nie do skojarzenia.
- **Akcje:** automatyczna korekta stanu jeśli reguła bezpieczna (np. `tip.settled` z raportu), w innym wypadku flaga „requires_review” + alert.
- **Artefakty:** raport CSV/JSON w S3, wpis audytu (`audit.reconcile.daily`).

---

## 9) Audyt i zgodność

- Loguj: `auth.login`, `tip.create`, `tip.settle`, `withdraw.request`, `withdraw.process`, `subscription.renew`.
- Pseudonimizacja PII w logach; pełne dane tylko w storage zgodnym z polityką.
- **Retention:** min. 90 dni dla logów finansowych.

---

## 10) Testy E2E (kontrakty)

1. **Tip happy path:** `tip.created`→`tip.settled`; idempotencja (duplikat `eventId`) zwraca 409/2xx i brak drugiej zmiany stanu.
2. **Podpis nieprawidłowy:** 401, brak side-effect.
3. **Replay:** stary `X-Pay-Timestamp` (600 s) → 401/403.
4. **Out-of-order:** `tip.settled` przed `tip.created` → system tworzy „shadow created” i finalizuje zgodnie z regułami.
5. **Withdrawal processed:** `withdraw.requested`→`withdraw.processed` z `txHash`.
6. **Subscription renew:** `subscription.renewed` zwiększa licznik i przesuwa `nextBillingAt`.
7. **Reconciliacja:** sztuczny `AMOUNT_MISMATCH` → raport z kategorią 3, brak automatycznej korekty.

---

## 11) Zmienne środowiskowe (sekrety)

- `WEBHOOK_PUBLIC_KEY` lub `WEBHOOK_SHARED_SECRET`
- `WEBHOOK_ALLOWED_DRIFT_SEC=300`
- `IDEMPOTENCY_TTL_DAYS=7`
- `RECONCILIATION_SCHEDULE=0 3 * * *` (UTC 03:00)

---

## 12) Minimalny handler (szkic) — backend

```tsx
// express-ish / next route handler
export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifySignature(req.headers, raw)) return json(401, { error: "invalid_signature" });

  const h = headerMap(req.headers);
  if (await seen(h["x-pay-event-id"]) || await seen(h["x-pay-idempotency-key"])) {
    return json(200, { ok: true, dedup: true });
  }

  const evt = JSON.parse(raw);
  if (!validateAgainstEnvelope(evt)) return json(400, { error: "invalid_schema" });

  await processEvent(evt); // transakcyjnie: upsert stanu wg sekcji 1
  await markSeen(h["x-pay-event-id"], h["x-pay-idempotency-key"]);

  return json(204, null);
}

```

---

## 13) Wpływ na frontend (synchronizacja)

- `/creator/stats`, `/creator/tips`, `/me/wallet` muszą odzwierciedlać zdarzenia webhooków po stronie backendu, żeby UI (dashboard, wallet, tip history) odświeżał się deterministycznie.
- Brak zmian w kontrakcie front→API dla tip/withdraw (już z idempotencją).

# KROK 15/N — Płatności (USDC) — Etap 3/3: Implementacja webhooków + idempotencja + testy (Next.js App Router)

## Pliki (nowe/zmienione)

- `app/api/webhooks/payments/route.ts`
- `app/api/webhooks/batch/route.ts`
- `src/lib/webhooks/schema.ts`
- `src/lib/webhooks/signature.ts`
- `src/lib/idempotency/store.ts`
- `src/lib/audit/log.ts` (użycie jak wcześniej)
- `src/lib/api/http.ts` (uaktualnienie nagłówka `Idempotency-Key` dla mutacji)
- `tests/webhooks.spec.ts` (Vitest)

---

### `src/lib/webhooks/schema.ts`

```tsx
import { z } from "zod";

export const Money = z.object({
  amount: z.number().positive(),
  currency: z.literal("USDC"),
}).strict();

export const Tip = z.object({
  tipId: z.string().uuid(),
  creatorId: z.string(),
  fanId: z.string().optional(),
  message: z.string().max(500).optional(),
  money: Money,
  txHash: z.string().optional(),
  processorRef: z.string().optional(),
}).strict();

export const Withdrawal = z.object({
  withdrawId: z.string().uuid(),
  userId: z.string(),
  toAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  money: Money,
  fee: z.number().min(0).optional(),
  txHash: z.string().optional(),
  processorRef: z.string().optional(),
}).strict();

export const Subscription = z.object({
  subscriptionId: z.string().uuid(),
  creatorId: z.string(),
  fanId: z.string(),
  money: Money,
  period: z.enum(["month","year"]),
  nextBillingAt: z.string().datetime().optional(),
  processorRef: z.string().optional(),
}).strict();

export const EventType = z.enum([
  "tip.created","tip.settled","tip.failed",
  "withdraw.requested","withdraw.processing","withdraw.processed","withdraw.failed",
  "subscription.started","subscription.renewed","subscription.canceled","subscription.failed",
]);

export const Envelope = z.object({
  eventId: z.string().uuid(),
  type: EventType,
  createdAt: z.string().datetime(),
  source: z.string().min(1),
  data: z.union([Tip, Withdrawal, Subscription]),
}).strict();

export type EnvelopeT = z.infer<typeof Envelope>;

```

### `src/lib/webhooks/signature.ts`

```tsx
// Weryfikacja podpisu: X-Pay-Timestamp + X-Pay-Signature (v1=...,alg=hmac-sha256|ed25519)
const DRIFT = Number(process.env.WEBHOOK_ALLOWED_DRIFT_SEC ?? "300");

function b64(s: string){ return Uint8Array.from(atob(s), c => c.charCodeAt(0)); }
function hexToBytes(h: string){ const a = new Uint8Array(h.length/2); for(let i=0;i<h.length;i+=2)a[i/2]=parseInt(h.slice(i,i+2),16); return a; }
function enc(s: string){ return new TextEncoder().encode(s); }
function tsOk(ts: string){ const now = Math.floor(Date.now()/1000); const t = Number(ts); return Number.isFinite(t) && Math.abs(now - t) <= DRIFT; }

export type SigResult = { ok: true } | { ok: false; reason: string };

export async function verifySignature(h: Headers, raw: string): Promise<SigResult> {
  const ts = h.get("x-pay-timestamp"); if (!ts || !tsOk(ts)) return { ok: false, reason: "timestamp" };
  const sig = h.get("x-pay-signature"); if (!sig) return { ok: false, reason: "missing" };
  const msg = `${ts}.${raw}`;

  const parts = Object.fromEntries(sig.split(",").map(p=>p.split("=").map(s=>s.trim()) as [string,string]));
  const alg = parts["alg"]; const v1 = parts["v1"];
  if (!alg || !v1) return { ok: false, reason: "format" };

  if (alg === "hmac-sha256") {
    const secret = (process.env.WEBHOOK_SHARED_SECRET || "").trim();
    if (!secret) return { ok: false, reason: "secret" };
    const key = await crypto.subtle.importKey("raw", enc(secret), { name:"HMAC", hash:"SHA-256" }, false, ["sign"]);
    const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc(msg)));
    const given = hexToBytes(v1);
    if (mac.length !== given.length) return { ok: false, reason: "sig_len" };
    let same = 0; for (let i=0;i<mac.length;i++) same |= mac[i]^given[i];
    return same === 0 ? { ok: true } : { ok: false, reason: "mismatch" };
  }

  if (alg === "ed25519") {
    const pub = (process.env.WEBHOOK_PUBLIC_KEY || "").trim().replace(/-/g,"+").replace(/_/g,"/"); // b64
    if (!pub) return { ok: false, reason: "pubkey" };
    const key = await crypto.subtle.importKey("raw", b64(pub), { name:"Ed25519", namedCurve:"Ed25519" } as any, false, ["verify"]);
    const ok = await crypto.subtle.verify("Ed25519", key, b64(v1), enc(msg)).catch(()=>false);
    return ok ? { ok: true } : { ok: false, reason: "mismatch" };
  }

  return { ok: false, reason: "alg" };
}

```

### `src/lib/idempotency/store.ts`

```tsx
import { Redis } from "@upstash/redis";

const TTL = Number(process.env.IDEMPOTENCY_TTL_DAYS ?? "7") * 24 * 3600;
const hasUpstash = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasUpstash ? new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN!,
}) : null;

const mem = new Map<string, number>();

function memSweep(){
  const now = Date.now(); for (const [k, v] of mem) if (now - v > TTL*1000) mem.delete(k);
}

export async function seen(key: string){
  if (redis) return Boolean(await redis.get(key));
  memSweep(); return mem.has(key);
}
export async function markSeen(...keys: string[]){
  if (redis) { const p = keys.map(k => redis.set(k, "1", { ex: TTL, nx: true })); await Promise.all(p); return; }
  const now = Date.now(); keys.forEach(k=>mem.set(k, now));
}

```

### `app/api/webhooks/payments/route.ts`

```tsx
import { NextResponse } from "next/server";
import { verifySignature } from "@/lib/webhooks/signature";
import { Envelope, type EnvelopeT } from "@/lib/webhooks/schema";
import { seen, markSeen } from "@/lib/idempotency/store";
import { audit } from "@/lib/audit/log";

export const runtime = "nodejs";

function hdr(h: Headers){ return new Proxy(h, { get: (_,p:string)=>h.get(p) || h.get(p.toLowerCase()) }); }

async function processEvent(evt: EnvelopeT){
  // [Unverified] Wstaw tu transakcyjne updaty stanu wg evt.type i evt.data
  switch (evt.type) {
    case "tip.created": await audit({ type:"tip.create", creatorId:(evt.data as any).creatorId, amount:(evt.data as any).money.amount }); break;
    case "withdraw.requested": await audit({ type:"withdraw.request", userId:(evt.data as any).userId, amount:(evt.data as any).money.amount, address:(evt.data as any).toAddress }); break;
    default: break;
  }
}

export async function POST(req: Request){
  const h = hdr(req.headers);
  const raw = await req.text();

  const ver = await verifySignature(req.headers, raw);
  if (!ver.ok) return NextResponse.json({ error: "invalid_signature", reason: ver.reason }, { status: 401 });

  const evtId = h["x-pay-event-id"]; const idem = h["x-pay-idempotency-key"];
  if (!evtId || !idem) return NextResponse.json({ error: "missing_headers" }, { status: 400 });

  if (await seen(`evt:${evtId}`) || await seen(`idem:${idem}`)) {
    return NextResponse.json({ ok: true, dedup: true }, { status: 200 });
  }

  let parsed: EnvelopeT;
  try { parsed = Envelope.parse(JSON.parse(raw)); }
  catch { return NextResponse.json({ error: "invalid_schema" }, { status: 400 }); }

  try {
    await processEvent(parsed);
    await markSeen(`evt:${evtId}`, `idem:${idem}`);
    return new NextResponse(null, { status: 204 });
  } catch (e:any){
    return NextResponse.json({ error: "processing_failed" }, { status: 500 });
  }
}

```

### `app/api/webhooks/batch/route.ts`

```tsx
import { NextResponse } from "next/server";
import { verifySignature } from "@/lib/webhooks/signature";
import { Envelope } from "@/lib/webhooks/schema";
import { seen, markSeen } from "@/lib/idempotency/store";

export const runtime = "nodejs";

export async function POST(req: Request){
  const raw = await req.text();
  const ver = await verifySignature(req.headers, raw);
  if (!ver.ok) return NextResponse.json({ error: "invalid_signature", reason: ver.reason }, { status: 401 });

  let arr: unknown[];
  try { arr = JSON.parse(raw); if (!Array.isArray(arr)) throw new Error(); }
  catch { return NextResponse.json({ error: "invalid_schema" }, { status: 400 }); }

  const results = [];
  for (const item of arr){
    try{
      const env = Envelope.parse(item);
      const idem = (env as any).idempotencyKey ?? env.eventId;
      if (await seen(`evt:${env.eventId}`) || await seen(`idem:${idem}`)) { results.push({ id: env.eventId, ok: true, dedup: true }); continue; }
      // [Unverified] processEvent(env)
      await markSeen(`evt:${env.eventId}`, `idem:${idem}`);
      results.push({ id: env.eventId, ok: true });
    }catch(e:any){
      results.push({ id: (item as any)?.eventId ?? null, ok: false, error: "invalid_event" });
    }
  }
  return NextResponse.json({ results }, { status: 207 });
}

```

### `src/lib/api/http.ts` (fragment — automatyczny `Idempotency-Key`)

```tsx
// Załóżmy axios-like instancję `api`
function key(){ return crypto.randomUUID(); }

api.interceptors.request.use((cfg:any)=>{
  if (["post","put","patch","delete"].includes((cfg.method||"").toLowerCase())) {
    if (!cfg.headers) cfg.headers = {};
    if (!cfg.headers["Idempotency-Key"]) cfg.headers["Idempotency-Key"] = key();
  }
  return cfg;
});

```

### `tests/webhooks.spec.ts`

```tsx
import { describe,it,expect } from "vitest";
import { verifySignature } from "../src/lib/webhooks/signature";

// HMAC weryfikacja
describe("webhook signature (hmac)", () => {
  it("validates correct signature", async () => {
    const secret = "test_secret";
    process.env.WEBHOOK_SHARED_SECRET = secret;
    const ts = Math.floor(Date.now()/1000).toString();
    const body = JSON.stringify({ hello: "world" });
    const msg = `${ts}.${body}`;

    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name:"HMAC", hash:"SHA-256" }, false, ["sign"]);
    const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg)));
    const hex = Array.from(mac).map(b=>b.toString(16).padStart(2,"0")).join("");

    const h = new Headers({
      "x-pay-timestamp": ts,
      "x-pay-signature": `v1=${hex},alg=hmac-sha256`,
    });

    const res = await verifySignature(h, body);
    expect(res.ok).toBe(true);
  });
});

```