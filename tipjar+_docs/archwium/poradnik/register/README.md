# README – Proces rejestracji i onboardingu w&nbsp;TipJar +

W&nbsp;tej paczce znajdziesz wszystkie materiały związane z&nbsp;procesem rejestracji i&nbsp;onboardingu użytkowników w&nbsp;platformie **TipJar +**.  Dokumenty PDF opisują tło biznesowe i&nbsp;architektoniczne, natomiast plik Markdown zawiera gotowe komponenty front‑endowe (Next.js + Tailwind CSS) implementujące wieloetapowy kreator rejestracyjny.  Niniejszy plik stanowi elegancki przewodnik po tych zasobach i&nbsp;podsumowuje najważniejsze założenia — bez tarcia, z&nbsp;gracją w&nbsp;kodzie.

## 1. Cel i&nbsp;wizja procesu onboardingu

TipJar + to platforma Web3 umożliwiająca fanom wysyłanie napiwków twórcom za pomocą stablecoina USDC.  Proces rejestracji jest projektowany tak, aby

* **minimalizować tarcie** — umożliwiać płynne logowanie tradycyjne lub bezhasłowe, eliminować zbędne pola i&nbsp;kroki,
* **abstrahować złożoność Web3** — automatycznie zakładać portfele Circle DCW (Developer‑Controlled Wallet) dla twórców (a docelowo fanów), tak aby użytkownik nie musiał sam konfigurować kluczy czy płacić gazu,
* **oferować wybór metod uwierzytelniania** — email/hasło, Google OAuth, Twitch (w kolejnych iteracjach) oraz Sign‑In with Ethereum (SIWE) dla osób korzystających z&nbsp;kryptowalut,
* **budować zaufanie i konwersję** — szybka rejestracja obniża próg wejścia, a jednocześnie zapewnia solidne mechanizmy bezpieczeństwa (hasła weryfikowane w bazach wycieków, tokeny JWT/odświeżające, integracja z Passport.js).

## 2. Rejestracja Twórcy

Pierwsza faza projektu (MVP) koncentruje się na twórcach.  Proces rejestracji składa się z&nbsp;kilku kroków:

1. **Założenie konta** – twórca wybiera metodę logowania: tradycyjne konto (email + hasło) lub federacyjne logowanie przez Google (OAuth 2.0).  W przyszłości dodane będą Twitch i SIWE.  Backend oparty na NestJS Passport tworzy rekord użytkownika, szyfruje hasło i wydaje token JWT bądź ustawia ciasteczko sesyjne【434116485597239†L147-L154】.
2. **Automatyczne utworzenie portfela** – natychmiast po potwierdzeniu rejestracji backend wywołuje API Circle (poprzez oficjalny SDK), aby utworzyć dedykowany portfel **Developer‑Controlled Wallet (DCW)** typu Smart Contract Account dla twórcy.  Identyfikatory portfela oraz adres główny są zapisywane w bazie danych.  Dzięki temu twórca od razu dysponuje infrastrukturą do odbierania napiwków, bez potrzeby zakładania własnego portfela【434116485597239†L156-L165】.  To obniża barierę wejścia i stanowi kluczową innowację projektową【346136423786239†L259-L266】.
3. **Wybór aliasu i konfiguracja profilu** – po uwierzytelnieniu użytkownik jest przekierowywany na stronę wyboru nazwy użytkownika (`/choose‑username`).  Alias będzie elementem publicznego adresu (np. `tipjar.plus/@alias`).  Twórca może uzupełnić swój profil (nazwę, avatar, opis) oraz otrzymuje link i kod QR prowadzące do formularza wpłaty【434116485597239†L180-L186】.

Rejestracja twórców jest więc szybka, w pełni zautomatyzowana i przyjazna zarówno dla osób spoza świata Web3, jak i dla entuzjastów blockchaina.

## 3. Rejestracja Fana

Na etapie MVP fani mogą wspierać twórców jako **goście**, bez rejestrowania konta.  Mogą zapłacić kartą (fiat), a środki zostaną automatycznie przeliczone na USDC, bądź wysłać kryptowalutę na adres portfela twórcy【434116485597239†L199-L216】.  W kolejnych kamieniach milowych wprowadzona zostanie opcjonalna rejestracja fana:

* **Metody logowania** – email/hasło, Google, Twitch oraz SIWE【434116485597239†L167-L178】.
* **Opcjonalny portfel DCW** – zarejestrowany fan może otrzymać własny portfel Circle zarządzany przez TipJar+, co umożliwi szybkie, wewnętrzne transfery bez opłat gazowych【434116485597239†L167-L178】.

## 4. Metody uwierzytelniania

Platforma oferuje różne ścieżki logowania, aby wyjść naprzeciw potrzebom użytkowników:

| Metoda | Opis |
| --- | --- |
| **Tradycyjna rejestracja** | Użytkownik podaje email i hasło.  Formularz powinien minimalizować liczbę pól, stosować wskaźnik siły hasła (np. biblioteka *zxcvbn*) oraz sprawdzać hasła w bazach wycieków.  Po stronie backendu następuje szyfrowanie hasła, utworzenie konta i wydanie tokenu JWT. |
| **Google OAuth** | Umożliwia logowanie za pomocą istniejącego konta Google.  Backend obsługuje przekierowania (`api/v1/auth/google`) oraz callback, wydaje token JWT i — w przypadku twórcy — inicjuje utworzenie portfela【346136423786239†L250-L266】. |
| **Twitch OAuth** | Kolejna strategia federacyjna planowana w Kamieniu Milowym 2. |
| **Sign‑In with Ethereum (SIWE)** | Użytkownik loguje się podpisując unikalny nonce swoim portfelem (np. MetaMask).  Frontend prosi o podpis, backend weryfikuje podpis i tworzy bądź loguje konto związane z adresem portfela【346136423786239†L268-L281】.  Metoda ta jest atrakcyjna dla doświadczonych użytkowników Web3, pozwalając na bezhasłowe logowanie. |

Każda ścieżka uwierzytelnienia kończy się zapisem użytkownika w bazie danych oraz (w przypadku twórców) automatycznym utworzeniem portfela Circle.

## 5. Wieloetapowy kreator rejestracyjny (Onboarding Wizard)

Do implementacji doświadczenia rejestracji w front‑endzie użyto wieloetapowego kreatora (`OnboardingWizard`) opartego na **Next.js App Router** i bibliotece **Zustand**.  Przepływ obejmuje następujące komponenty (szczegóły znajdziesz w załączonym pliku Markdown):

1. **RoleStep** – pozwala użytkownikowi wybrać rolę (Fan vs Creator) poprzez atrakcyjne kafelki z ikonami.  Wybrana rola ustawia stan w `onboardingStore` i nawiguje do następnego kroku.
2. **AuthStep** – prezentuje przyciski logowania: Google, Twitch oraz Sign‑In with Ethereum.  W przypadku SIWE wykorzystywany jest pakiet `wagmi` do połączenia z portfelem, a cały flow podpisu i weryfikacji nonce znajduje się w kodzie [AuthStep](./Rozbudowa%20poradnika%20rejestracja%20i%20onboarding%20(App%20%2026eaab2cc3358029ad05c7d09c338dcc.md)).  Po pomyślnej autoryzacji następuje przekierowanie na `/choose‑username`.
3. **ChooseUsernamePage** – użytkownik wybiera alias, który będzie używany w publicznym profilu.  Dla twórcy przewidziane są kolejne etapy konfiguracji profilu.
4. **Zustand store (`onboardingStore.ts`)** – centralny magazyn stanu zawierający obecny krok, rolę, tokeny i dane użytkownika oraz akcje do ich ustawiania.  Definiuje kolejność kroków i umożliwia pomijanie etapu konfiguracji twórcy, gdy wybrano rolę fana.

Komponenty są napisane w TypeScript i Tailwind CSS, zapewniając wysoką jakość kodu i responsywny interfejs.  Plik Markdown w pakiecie zawiera pełną implementację wraz z cytatami z dokumentacji.

## 6. Zawartość paczki

W folderze `registration_package` znajdują się następujące pliki:

| Plik | Opis |
| --- | --- |
| **Podsumowanie Projektu TipJar+ (1).pdf** | Wyczerpująca analiza projektu TipJar+, obejmująca strategię, architekturę i plan realizacji.  Zawiera m.in. opis tradycyjnej rejestracji i SIWE【346136423786239†L250-L281】. |
| **Plan Rozbudowy Modułów Systemu.pdf** | Długofalowa strategia rozwoju platformy SocialFi; dostarcza kontekst dla przyszłych funkcji, ale nie skupia się bezpośrednio na rejestracji. |
| **Projektowanie Procesu Rejestracji Użytkownika.pdf** | Podręcznik projektowania bezpiecznych, skoncentrowanych na użytkowniku systemów uwierzytelniania.  Omawia kwestie tarcia, SSO, logowania bezhasłowego i równowagi między wygodą a kontrolą. |
| **TipJar+ – Kompleksowy Plan Architektury i Realizacji Projektu_.pdf** | Szczegółowy plan techniczny TipJar+.  Opisuje proces rejestracji twórców i fanów, automatyczne tworzenie portfela Circle oraz przyszłe integracje SIWE【434116485597239†L147-L178】. |
| **Rozbudowa poradnika rejestracja i onboarding (App 26eaab2cc3358029ad05c7d09c338dcc.md)** | Praktyczny przewodnik implementacyjny.  Zawiera strukturę plików App Router, komponenty `OnboardingWizard`, `RoleStep`, `AuthStep`, stan w Zustand oraz przykładowe kodu dla `apiClient.ts` i strony `choose‑username`. |

Pliki te, wraz z niniejszym README, stanowią kompletny zestaw materiałów do zrozumienia i wdrożenia procesu rejestracji w TipJar+.

---

**Gratulacje!** Masz w rękach kompletne źródło wiedzy o procesie rejestracji TipJar+ — od strategii biznesowej, przez wymagania techniczne, aż po gotowy kod front‑end.  Ten przewodnik został stworzony z myślą o szyku i elegancji: minimalne tarcie dla użytkownika, maksymalna gracja w architekturze i implementacji.  Powodzenia we wdrożeniu!