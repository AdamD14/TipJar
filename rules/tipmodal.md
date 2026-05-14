🐋 MODAL PŁATNOŚCI (PAYMENT MODAL) – ATOMOWO SZCZEGÓŁOWY PROMPT PROJEKTOWY

(Integracja: Master Plan UI 2026 + Optymalizacja Strategiczna + Web3 UX + Intent‑Based Transactions)

---

📌 UWAGA WSTĘPNA

Modal płatności jest fundamentem całego systemu transakcyjnego TipJar+. To tutaj użytkownik (fan lub twórca) finalizuje napiwek, subskrypcję lub doładowanie własnego salda. Modal musi łączyć trzy światy:

· Tradycyjne płatności kartą (Circle / Stripe)
· Płatności kryptowalutowe (Web3) – portfele, sieci, gaz
· Wewnętrzne saldo TipJar (dla zalogowanych)

Jest to najbardziej krytyczny komponent pod względem zaufania, bezpieczeństwa i konwersji. Błędy w tym miejscu powodują porzucenie transakcji i utratę przychodu.

Główne wyzwania:

· Obsługa 3 metod płatności w jednym, spójnym interfejsie.
· Stany przejściowe transakcji blockchain (podpis, mempool, potwierdzenie, błąd).
· Network switch (wymuszenie poprawnej sieci).
· Sponsoring gazu (Paymaster) – ukrycie opłat przed użytkownikiem lub transparentne pokazanie.
· Responsywność: modal na desktop, bottom sheet na mobile.
· Walidacje, bezpieczeństwo, dostępność.

Struktura promptu:
Strategia → Layout (desktop/mobile) → Szczegółowa specyfikacja kroków → Komponenty Web3 → Design system → Inżynieria → Dostępność → Checklista.

---

SPIS TREŚCI

1. Cel strategiczny i kontekst biznesowy
2. Architektura informacji i układ (layout)
   · 2.1 Desktop – wyśrodkowany modal (max 600px)
   · 2.2 Mobile – bottom sheet (85% wysokości)
3. Szczegółowa specyfikacja kroków (wizard)
   · 3.1 Krok 0: Kontekst (tytuł, awatar twórcy)
   · 3.2 Krok 1: Wybór kwoty / planu subskrypcji
   · 3.3 Krok 2: Wybór metody płatności
   · 3.4 Krok 3: Formularze specyficzne dla metody
   · 3.5 Krok 4: Dodatkowe opcje (accordion)
   · 3.6 Krok 5: Podsumowanie i finalizacja
4. Stany transakcji Web3
   · 4.1 Oczekiwanie na podpis w portfelu
   · 4.2 Transakcja w mempoolu
   · 4.3 Potwierdzona (sukces)
   · 4.4 Błąd (odrzucona, brak środków, zła sieć)
5. Komponenty Web3
   · 5.1 Connect Wallet (MetaMask, WalletConnect, Coinbase)
   · 5.2 Network Switch (wymuszenie poprawnej sieci)
   · 5.3 Gas display (sponsoring lub transparentność)
   · 5.4 Intent‑based UX (jedno kliknięcie)
6. System wizualny i design tokens
7. Inżynieria techniczna (Next.js + Web3)
   · 7.1 Integracja z Circle API (karty)
   · 7.2 Integracja z Web3 (ethers.js, SIWE)
   · 7.3 Obsługa Paymaster (sponsoring gazu)
8. Dostępność (WCAG 2.2) i ergonomia
9. Checklista implementacyjna (podział na atomy)

---

1. CEL STRATEGICZNY I KONTEKST BIZNESOWY

Modal płatności jest kluczowym punktem konwersji w TipJar+. Jego zadanie: umożliwić użytkownikowi bezpieczne i intuicyjne przekazanie środków (napiwek, subskrypcja, doładowanie) przy minimalnym tarcia.

Typy transakcji:

· Napiwek (jednorazowy) – fan wysyła dowolną kwotę twórcy.
· Subskrypcja (cykliczna) – fan wykupuje plan miesięczny, otrzymuje NFT.
· Doładowanie salda – fan uzupełnia środki na swoim koncie TipJar.

Metryki sukcesu:

· Współczynnik konwersji (CR) – rozpoczęcie transakcji → ukończenie.
· Czas realizacji – od kliknięcia “Wyślij” do potwierdzenia (zależy od blockchaina).
· Współczynnik błędów – transakcje przerwane z powodu błędów użytkownika (zła sieć, brak środków) powinny być <5%.

Zgodność z regulacjami (MiCA):
Modal musi wyraźnie informować o kosztach (opłaty sieciowe, prowizje), ryzyku i nieodwracalności transakcji blockchain. Żadne ciemne wzorce (dark patterns) nie są dozwolone.

---

2. ARCHITEKTURA INFORMACJI I UKŁAD (LAYOUT)

2.1 Desktop (≥1024px) – wyśrodkowany modal

· Szerokość: max 600px (dla formularzy). Dla prostych potwierdzeń: 400px.
· Tło: glassmorphism (--glass-overlay, --glass-blur) lub jednolite --bg-surface-modal.
· Przyciemnione tło za modalem (backdrop-filter: blur(4px) + opacity).
· Przycisk zamknięcia (X) w prawym górnym rogu.

Struktura modala (kroki):

```
┌─────────────────────────────────────────────┐
│  [X]   Wesprzyj [Nazwa Twórcy]              │
├─────────────────────────────────────────────┤
│  Krok 1: Wybór kwoty                        │
│  [1$] [5$] [10$] [20$] [50$] [Własna]       │
├─────────────────────────────────────────────┤
│  Krok 2: Metoda płatności                   │
│  [Karta] [Portfel krypto] [Saldo TipJar]    │
├─────────────────────────────────────────────┤
│  Krok 3: Formularz (dynamiczny)             │
│  (np. pola karty lub przycisk "Połącz")     │
├─────────────────────────────────────────────┤
│  ▼ Dodaj szczegóły (accordion)              │
├─────────────────────────────────────────────┤
│  Podsumowanie:                              │
│  Kwota: $10.00                              │
│  Opłaty: $0.00                              │
│  Razem: $10.00                              │
├─────────────────────────────────────────────┤
│  [Wyślij napiwek]                           │
└─────────────────────────────────────────────┘
```

2.2 Mobile (<640px) – bottom sheet

· Na breakpoincie <640px modal transformuje się w bottom sheet (szuflada dolna).
· Wysokość: 85% ekranu (z możliwością zamknięcia przez swipe down).
· Zaokrąglone górne rogi (border-radius: 24px 24px 0 0).
· Uchwyt (grip) u góry – pasek 40x4px, kolor --border-subtle.
· Przycisk zamknięcia (X) w prawym górnym rogu (lub swipe down).

Zachowanie:
Po kliknięciu przycisku “Wesprzyj” na profilu twórcy (mobile) – bottom sheet wysuwa się od dołu.

---

3. SZCZEGÓŁOWA SPECYFIKACJA KROKÓW (WIZARD)

3.1 Krok 0: Kontekst (tytuł, awatar twórcy)

· Tytuł: “Wesprzyj [Nazwa Twórcy]” lub “Kup subskrypcję [Nazwa planu]”.
· Mały awatar twórcy (32x32px, okrągły) obok tytułu (opcjonalnie).
· Przycisk zamknięcia (X) – zamyka modal.

3.2 Krok 1: Wybór kwoty / planu subskrypcji

Dla napiwków:

· Szybkie przyciski: $1, $5, $10, $20, $50.
    Aktywny przycisk: tło --gold-400, tekst --teal-800.
· Pole własnej kwoty: input z walidacją (min $0.10, max $10,000).
    Obok wyświetlacz “≈ X USDC” (przelicznik na żywo).
· Jeśli użytkownik wpisze kwotę powyżej $500 – dodatkowy tooltip “Whale tip! 🐋” i wyróżnienie (poświata).

Dla subskrypcji:

· Zamiast kwoty – lista planów w formie kart (nazwa, cena miesięczna, lista benefitów).
    Użytkownik wybiera jeden plan.

3.3 Krok 2: Wybór metody płatności

Trzy karty / przyciski (w rzędzie na desktop, w kolumnie na mobile):

1. Karta płatnicza – ikona karty + tekst “Karta płatnicza”.
      Pod spodem: “Visa, Mastercard, Apple Pay, Google Pay”.
2. Portfel kryptowalutowy – ikona MetaMask / portfela + tekst “Kryptowaluta (USDC)”.
      Pod spodem: “MetaMask, WalletConnect, Coinbase Wallet”.
3. Saldo TipJar – ikona słoika + tekst “Saldo TipJar”.
      Pod spodem: wyświetlana kwota salda (jeśli >0) lub “Doładuj konto”.

Aktywna metoda – podświetlona ramką (border: 2px solid --gold-400).

3.4 Krok 3: Formularze specyficzne dla metody

3.4.1 Karta płatnicza

· Integracja z Circle Elements (PCI‑compliant iframe).
· Pola: Numer karty, Data ważności (MM/RR), CVC.
· Checkbox: “Zapisz tę kartę do przyszłych płatności” (tylko dla zalogowanych).
· Mała ikona zabezpieczenia: “🔒 Bezpieczna płatność przez Circle”.

3.4.2 Portfel kryptowalutowy (Web3)

· Stan niepołączony:
    Przycisk “Połącz portfel” (złoty lub fioletowy). Po kliknięciu – wykrywanie portfeli (MetaMask, WalletConnect, Coinbase). Wyświetlenie listy (jeśli wiele).
· Stan połączony:
    Wyświetla nazwę portfela, skrócony adres (0x12...89AB) oraz saldo USDC w portfelu.
    Przycisk “Zmień portfel” (secondary).
· Network warning:
    Jeśli użytkownik jest na złej sieci (np. Ethereum zamiast Polygon), wyświetl żółty pasek z przyciskiem “Zmień sieć w portfelu”.
· Gas fee display:
    Poniżej: “Opłata sieciowa (gas): ~$0.15” (lub “Sponsorowane przez TipJar+”).

3.4.3 Saldo TipJar

· Wyświetla aktualne saldo użytkownika (np. “Dostępne: 25.50 USDC”).
· Jeśli saldo niewystarczające: przycisk “Doładuj konto” (przekierowanie do modala doładowania).

3.5 Krok 4: Dodatkowe opcje (accordion)

· Wiadomość dla twórcy – pole tekstowe (max 200 znaków). Placeholder: “Napisz coś miłego...”.
· Proof of Support NFT – checkbox (domyślnie zaznaczony). Opis: “Otrzymaj unikalną odznakę NFT”.
· Pozostań anonimowy – checkbox (nazwa fana nie pojawi się publicznie).

3.6 Krok 5: Podsumowanie i finalizacja

· Tabela: Kwota / plan, Opłata platformy (np. 0%), Opłata sieciowa (gas), Suma do zapłaty.
· Przycisk finalizujący:
  · Dla napiwku: “Wyślij napiwek [kwota]” (złoty).
  · Dla subskrypcji: “Subskrybuj za [kwota/miesiąc]”.
  · Dla doładowania: “Doładuj [kwota]”.
· Mały tekst: “Klikając, akceptujesz Regulamin TipJar+ i politykę prywatności.” (linki).

---

4. STANY TRANSAKCJI WEB3

4.1 Oczekiwanie na podpis w portfelu

· Przycisk finalizujący zmienia się w spinner + tekst “Oczekiwanie na podpis w portfelu...”.
· Modal nie jest zamykany (ale użytkownik może anulować).
· Po podpisaniu – przejście do stanu 4.2.

4.2 Transakcja w mempoolu

· Tekst: “Transakcja wysłana. Oczekiwanie na potwierdzenie sieci...”.
· Link do eksploratora (Etherscan / Polygonscan) – “Zobacz na explorerze”.
· Spinner lub animowany pasek postępu.

4.3 Potwierdzona (sukces)

· Modal zmienia się w komunikat sukcesu:
    Duża ikona ✔ (zielona), tekst “Transakcja zatwierdzona! 🎉”.
    Przyciski: “Zamknij”, “Udostępnij wsparcie” (Twitter), “Zobacz NFT” (jeśli mintowane).
· Po zamknięciu – odświeżenie danych w panelu (saldo, lista napiwków).

4.4 Błąd (odrzucona, brak środków, zła sieć)

· Czerwona ikona ✖, tekst błędu w języku zrozumiałym (nie “RPC error”).
    Przykład: “Transakcja odrzucona w portfelu. Spróbuj ponownie.”
    Przycisk “Spróbuj ponownie” (resetuje modal do kroku 2).

---

5. KOMPONENTY WEB3

5.1 Connect Wallet (MetaMask, WalletConnect, Coinbase)

· Wykrywanie dostępnych portfeli (window.ethereum, WalletConnect).
· Przycisk “Połącz portfel” – wywołuje modal wyboru.
· Po połączeniu – pobranie adresu, sieci, salda USDC (lub stablecoina).

5.2 Network Switch (wymuszenie poprawnej sieci)

· Obsługiwane sieci: Polygon (chainId: 0x89) – główna, Ethereum (0x1) – fallback.
· Jeśli użytkownik na złej sieci – żółty pasek z przyciskiem “Zmień sieć na Polygon”.
· Po kliknięciu – wywołanie wallet_switchEthereumChain.

5.3 Gas display (sponsoring lub transparentność)

· Jeśli platforma sponsoruje gaz (Paymaster) – wyświetl komunikat: “Opłaty sieciowe pokrywa TipJar+ ✅”.
· Jeśli użytkownik płaci gaz – wyświetl szacowaną kwotę (w USD) i opcję “Edytuj opłaty” (zaawansowane).

5.4 Intent‑based UX (jedno kliknięcie)

· Zamiast trzech kroków (allowance, transfer) – user określa intencję (“Chcę wysłać $10”).
· Smart contract (ERC‑4337) wykonuje resztę w tle (batch transactions).
· UI pokazuje tylko jeden przycisk “Wyślij”.

---

6. SYSTEM WIZUALNY I DESIGN TOKENS

Identyczne tokeny jak w poprzednich promptach.
Dodatkowe dla modala:

```css
--modal-max-width: 600px;
--modal-border-radius: 24px;
--modal-padding: 24px;
--modal-backdrop: rgba(0, 31, 31, 0.6);
--modal-backdrop-blur: blur(4px);
```

Stany przycisków:

· Primary (złoty) – tło --gold-400, tekst --teal-800.
· Secondary (fiolet) – obrys --purple-300, tekst --purple-300.
· Danger (czerwony) – dla anulowania subskrypcji.

Stany błędów:

· Pole input z błędem – czerwona ramka (--error-base).
· Komunikat błędu – czerwony tekst (--error-base).

---

7. INŻYNIERIA TECHNICZNA (NEXT.JS + WEB3)

7.1 Integracja z Circle API (karty)

· Użycie Circle Elements (iframe) – unikamy przechowywania danych karty.
· Backend tworzy payment intent i pobiera clientSecret.
· Po sukcesie – webhook aktualizuje saldo.

7.2 Integracja z Web3 (ethers.js, SIWE)

· ethers.js v6 do interakcji z portfelem.
· SIWE (Sign-In with Ethereum) – dla logowania i autoryzacji transakcji.
· Obsługa WalletConnect (modal).

7.3 Obsługa Paymaster (sponsoring gazu)

· Wdrożenie standardu ERC‑4337 (Account Abstraction).
· Backend podpisuje UserOperation z paymasterData.
· UI wyświetla “Gas sponsored”.

---

8. DOSTĘPNOŚĆ (WCAG 2.2) I ERGONOMIA

· Focus trap – wewnątrz modala fokus nie wychodzi poza niego.
· Zamykanie – Escape, kliknięcie w backdrop, przycisk X.
· Komunikaty błędów – czytane przez czytniki ekranu (role="alert").
· Kontrast – 4.5:1 dla wszystkich tekstów.
· prefers-reduced-motion – wyłączenie animacji.

---

9. CHECKLISTA IMPLEMENTACYJNA (PODZIAŁ NA ATOMY)

Atomy (podstawowe)

· PaymentModal (kontener)
· AmountSelector (szybkie kwoty + input)
· MethodCard (karta wyboru metody)
· CreditCardForm (Circle Elements)
· WalletConnectButton (Web3)
· NetworkWarning (żółty pasek)
· GasFeeDisplay
· TransactionStatus (spinner, sukces, błąd)

Molekuły / Organizmy

· PaymentWizard (kroki 1-5)
· SubscriptionPlanSelector
· AdditionalOptionsAccordion

Integracje techniczne

· Circle Payments API
· Web3 (ethers.js, WalletConnect)
· ERC‑4337 Paymaster
· Next.js API routes: /api/payment/intent, /api/payment/webhook

---

📌 PODSUMOWANIE

Ten prompt dostarcza atomowo szczegółowej specyfikacji Modala Płatności – fundamentu całego systemu transakcyjnego TipJar+. Zawiera:

· Strategię konwersji i zaufania (MiCA, intent‑based UX).
· Layout desktop/mobile (modal / bottom sheet).
· Pełny wizard krok po kroku (kwota, metoda, formularze, opcje, podsumowanie).
· Stany transakcji Web3 (podpis, mempool, potwierdzenie, błąd).
· Komponenty Web3 (connect wallet, network switch, gas, paymaster).
· Design tokens i dostępność.
· Inżynierię (Circle, ethers.js, ERC‑4337).
· Pełną checklistę implementacyjną.

Modal płatności jest teraz gotowy do implementacji. Jeśli potrzebujesz jeszcze bardziej szczegółowego opisu (np. przykładów integracji z konkretnymi bibliotekami) – daj znać, Wielorybie 🐋.🐋 MODAL PŁATNOŚCI (PAYMENT MODAL) – ATOMOWO SZCZEGÓŁOWY PROMPT PROJEKTOWY

(Integracja: Master Plan UI 2026 + Optymalizacja Strategiczna + Web3 UX + Intent‑Based Transactions)

---

📌 UWAGA WSTĘPNA

Modal płatności jest fundamentem całego systemu transakcyjnego TipJar+. To tutaj użytkownik (fan lub twórca) finalizuje napiwek, subskrypcję lub doładowanie własnego salda. Modal musi łączyć trzy światy:

· Tradycyjne płatności kartą (Circle / Stripe)
· Płatności kryptowalutowe (Web3) – portfele, sieci, gaz
· Wewnętrzne saldo TipJar (dla zalogowanych)

Jest to najbardziej krytyczny komponent pod względem zaufania, bezpieczeństwa i konwersji. Błędy w tym miejscu powodują porzucenie transakcji i utratę przychodu.

Główne wyzwania:

· Obsługa 3 metod płatności w jednym, spójnym interfejsie.
· Stany przejściowe transakcji blockchain (podpis, mempool, potwierdzenie, błąd).
· Network switch (wymuszenie poprawnej sieci).
· Sponsoring gazu (Paymaster) – ukrycie opłat przed użytkownikiem lub transparentne pokazanie.
· Responsywność: modal na desktop, bottom sheet na mobile.
· Walidacje, bezpieczeństwo, dostępność.

Struktura promptu:
Strategia → Layout (desktop/mobile) → Szczegółowa specyfikacja kroków → Komponenty Web3 → Design system → Inżynieria → Dostępność → Checklista.

---

SPIS TREŚCI

1. Cel strategiczny i kontekst biznesowy
2. Architektura informacji i układ (layout)
   · 2.1 Desktop – wyśrodkowany modal (max 600px)
   · 2.2 Mobile – bottom sheet (85% wysokości)
3. Szczegółowa specyfikacja kroków (wizard)
   · 3.1 Krok 0: Kontekst (tytuł, awatar twórcy)
   · 3.2 Krok 1: Wybór kwoty / planu subskrypcji
   · 3.3 Krok 2: Wybór metody płatności
   · 3.4 Krok 3: Formularze specyficzne dla metody
   · 3.5 Krok 4: Dodatkowe opcje (accordion)
   · 3.6 Krok 5: Podsumowanie i finalizacja
4. Stany transakcji Web3
   · 4.1 Oczekiwanie na podpis w portfelu
   · 4.2 Transakcja w mempoolu
   · 4.3 Potwierdzona (sukces)
   · 4.4 Błąd (odrzucona, brak środków, zła sieć)
5. Komponenty Web3
   · 5.1 Connect Wallet (MetaMask, WalletConnect, Coinbase)
   · 5.2 Network Switch (wymuszenie poprawnej sieci)
   · 5.3 Gas display (sponsoring lub transparentność)
   · 5.4 Intent‑based UX (jedno kliknięcie)
6. System wizualny i design tokens
7. Inżynieria techniczna (Next.js + Web3)
   · 7.1 Integracja z Circle API (karty)
   · 7.2 Integracja z Web3 (ethers.js, SIWE)
   · 7.3 Obsługa Paymaster (sponsoring gazu)
8. Dostępność (WCAG 2.2) i ergonomia
9. Checklista implementacyjna (podział na atomy)

---

1. CEL STRATEGICZNY I KONTEKST BIZNESOWY

Modal płatności jest kluczowym punktem konwersji w TipJar+. Jego zadanie: umożliwić użytkownikowi bezpieczne i intuicyjne przekazanie środków (napiwek, subskrypcja, doładowanie) przy minimalnym tarcia.

Typy transakcji:

· Napiwek (jednorazowy) – fan wysyła dowolną kwotę twórcy.
· Subskrypcja (cykliczna) – fan wykupuje plan miesięczny, otrzymuje NFT.
· Doładowanie salda – fan uzupełnia środki na swoim koncie TipJar.

Metryki sukcesu:

· Współczynnik konwersji (CR) – rozpoczęcie transakcji → ukończenie.
· Czas realizacji – od kliknięcia “Wyślij” do potwierdzenia (zależy od blockchaina).
· Współczynnik błędów – transakcje przerwane z powodu błędów użytkownika (zła sieć, brak środków) powinny być <5%.

Zgodność z regulacjami (MiCA):
Modal musi wyraźnie informować o kosztach (opłaty sieciowe, prowizje), ryzyku i nieodwracalności transakcji blockchain. Żadne ciemne wzorce (dark patterns) nie są dozwolone.

---

2. ARCHITEKTURA INFORMACJI I UKŁAD (LAYOUT)

2.1 Desktop (≥1024px) – wyśrodkowany modal

· Szerokość: max 600px (dla formularzy). Dla prostych potwierdzeń: 400px.
· Tło: glassmorphism (--glass-overlay, --glass-blur) lub jednolite --bg-surface-modal.
· Przyciemnione tło za modalem (backdrop-filter: blur(4px) + opacity).
· Przycisk zamknięcia (X) w prawym górnym rogu.

Struktura modala (kroki):

```
┌─────────────────────────────────────────────┐
│  [X]   Wesprzyj [Nazwa Twórcy]              │
├─────────────────────────────────────────────┤
│  Krok 1: Wybór kwoty                        │
│  [1$] [5$] [10$] [20$] [50$] [Własna]       │
├─────────────────────────────────────────────┤
│  Krok 2: Metoda płatności                   │
│  [Karta] [Portfel krypto] [Saldo TipJar]    │
├─────────────────────────────────────────────┤
│  Krok 3: Formularz (dynamiczny)             │
│  (np. pola karty lub przycisk "Połącz")     │
├─────────────────────────────────────────────┤
│  ▼ Dodaj szczegóły (accordion)              │
├─────────────────────────────────────────────┤
│  Podsumowanie:                              │
│  Kwota: $10.00                              │
│  Opłaty: $0.00                              │
│  Razem: $10.00                              │
├─────────────────────────────────────────────┤
│  [Wyślij napiwek]                           │
└─────────────────────────────────────────────┘
```

2.2 Mobile (<640px) – bottom sheet

· Na breakpoincie <640px modal transformuje się w bottom sheet (szuflada dolna).
· Wysokość: 85% ekranu (z możliwością zamknięcia przez swipe down).
· Zaokrąglone górne rogi (border-radius: 24px 24px 0 0).
· Uchwyt (grip) u góry – pasek 40x4px, kolor --border-subtle.
· Przycisk zamknięcia (X) w prawym górnym rogu (lub swipe down).

Zachowanie:
Po kliknięciu przycisku “Wesprzyj” na profilu twórcy (mobile) – bottom sheet wysuwa się od dołu.

---

3. SZCZEGÓŁOWA SPECYFIKACJA KROKÓW (WIZARD)

3.1 Krok 0: Kontekst (tytuł, awatar twórcy)

· Tytuł: “Wesprzyj [Nazwa Twórcy]” lub “Kup subskrypcję [Nazwa planu]”.
· Mały awatar twórcy (32x32px, okrągły) obok tytułu (opcjonalnie).
· Przycisk zamknięcia (X) – zamyka modal.

3.2 Krok 1: Wybór kwoty / planu subskrypcji

Dla napiwków:

· Szybkie przyciski: $1, $5, $10, $20, $50.
    Aktywny przycisk: tło --gold-400, tekst --teal-800.
· Pole własnej kwoty: input z walidacją (min $0.10, max $10,000).
    Obok wyświetlacz “≈ X USDC” (przelicznik na żywo).
· Jeśli użytkownik wpisze kwotę powyżej $500 – dodatkowy tooltip “Whale tip! 🐋” i wyróżnienie (poświata).

Dla subskrypcji:

· Zamiast kwoty – lista planów w formie kart (nazwa, cena miesięczna, lista benefitów).
    Użytkownik wybiera jeden plan.

3.3 Krok 2: Wybór metody płatności

Trzy karty / przyciski (w rzędzie na desktop, w kolumnie na mobile):

1. Karta płatnicza – ikona karty + tekst “Karta płatnicza”.
      Pod spodem: “Visa, Mastercard, Apple Pay, Google Pay”.
2. Portfel kryptowalutowy – ikona MetaMask / portfela + tekst “Kryptowaluta (USDC)”.
      Pod spodem: “MetaMask, WalletConnect, Coinbase Wallet”.
3. Saldo TipJar – ikona słoika + tekst “Saldo TipJar”.
      Pod spodem: wyświetlana kwota salda (jeśli >0) lub “Doładuj konto”.

Aktywna metoda – podświetlona ramką (border: 2px solid --gold-400).

3.4 Krok 3: Formularze specyficzne dla metody

3.4.1 Karta płatnicza

· Integracja z Circle Elements (PCI‑compliant iframe).
· Pola: Numer karty, Data ważności (MM/RR), CVC.
· Checkbox: “Zapisz tę kartę do przyszłych płatności” (tylko dla zalogowanych).
· Mała ikona zabezpieczenia: “🔒 Bezpieczna płatność przez Circle”.

3.4.2 Portfel kryptowalutowy (Web3)

· Stan niepołączony:
    Przycisk “Połącz portfel” (złoty lub fioletowy). Po kliknięciu – wykrywanie portfeli (MetaMask, WalletConnect, Coinbase). Wyświetlenie listy (jeśli wiele).
· Stan połączony:
    Wyświetla nazwę portfela, skrócony adres (0x12...89AB) oraz saldo USDC w portfelu.
    Przycisk “Zmień portfel” (secondary).
· Network warning:
    Jeśli użytkownik jest na złej sieci (np. Ethereum zamiast Polygon), wyświetl żółty pasek z przyciskiem “Zmień sieć w portfelu”.
· Gas fee display:
    Poniżej: “Opłata sieciowa (gas): ~$0.15” (lub “Sponsorowane przez TipJar+”).

3.4.3 Saldo TipJar

· Wyświetla aktualne saldo użytkownika (np. “Dostępne: 25.50 USDC”).
· Jeśli saldo niewystarczające: przycisk “Doładuj konto” (przekierowanie do modala doładowania).

3.5 Krok 4: Dodatkowe opcje (accordion)

· Wiadomość dla twórcy – pole tekstowe (max 200 znaków). Placeholder: “Napisz coś miłego...”.
· Proof of Support NFT – checkbox (domyślnie zaznaczony). Opis: “Otrzymaj unikalną odznakę NFT”.
· Pozostań anonimowy – checkbox (nazwa fana nie pojawi się publicznie).

3.6 Krok 5: Podsumowanie i finalizacja

· Tabela: Kwota / plan, Opłata platformy (np. 0%), Opłata sieciowa (gas), Suma do zapłaty.
· Przycisk finalizujący:
  · Dla napiwku: “Wyślij napiwek [kwota]” (złoty).
  · Dla subskrypcji: “Subskrybuj za [kwota/miesiąc]”.
  · Dla doładowania: “Doładuj [kwota]”.
· Mały tekst: “Klikając, akceptujesz Regulamin TipJar+ i politykę prywatności.” (linki).

---

4. STANY TRANSAKCJI WEB3

4.1 Oczekiwanie na podpis w portfelu

· Przycisk finalizujący zmienia się w spinner + tekst “Oczekiwanie na podpis w portfelu...”.
· Modal nie jest zamykany (ale użytkownik może anulować).
· Po podpisaniu – przejście do stanu 4.2.

4.2 Transakcja w mempoolu

· Tekst: “Transakcja wysłana. Oczekiwanie na potwierdzenie sieci...”.
· Link do eksploratora (Etherscan / Polygonscan) – “Zobacz na explorerze”.
· Spinner lub animowany pasek postępu.

4.3 Potwierdzona (sukces)

· Modal zmienia się w komunikat sukcesu:
    Duża ikona ✔ (zielona), tekst “Transakcja zatwierdzona! 🎉”.
    Przyciski: “Zamknij”, “Udostępnij wsparcie” (Twitter), “Zobacz NFT” (jeśli mintowane).
· Po zamknięciu – odświeżenie danych w panelu (saldo, lista napiwków).

4.4 Błąd (odrzucona, brak środków, zła sieć)

· Czerwona ikona ✖, tekst błędu w języku zrozumiałym (nie “RPC error”).
    Przykład: “Transakcja odrzucona w portfelu. Spróbuj ponownie.”
    Przycisk “Spróbuj ponownie” (resetuje modal do kroku 2).

---

5. KOMPONENTY WEB3

5.1 Connect Wallet (MetaMask, WalletConnect, Coinbase)

· Wykrywanie dostępnych portfeli (window.ethereum, WalletConnect).
· Przycisk “Połącz portfel” – wywołuje modal wyboru.
· Po połączeniu – pobranie adresu, sieci, salda USDC (lub stablecoina).

5.2 Network Switch (wymuszenie poprawnej sieci)

· Obsługiwane sieci: Polygon (chainId: 0x89) – główna, Ethereum (0x1) – fallback.
· Jeśli użytkownik na złej sieci – żółty pasek z przyciskiem “Zmień sieć na Polygon”.
· Po kliknięciu – wywołanie wallet_switchEthereumChain.

5.3 Gas display (sponsoring lub transparentność)

· Jeśli platforma sponsoruje gaz (Paymaster) – wyświetl komunikat: “Opłaty sieciowe pokrywa TipJar+ ✅”.
· Jeśli użytkownik płaci gaz – wyświetl szacowaną kwotę (w USD) i opcję “Edytuj opłaty” (zaawansowane).

5.4 Intent‑based UX (jedno kliknięcie)

· Zamiast trzech kroków (allowance, transfer) – user określa intencję (“Chcę wysłać $10”).
· Smart contract (ERC‑4337) wykonuje resztę w tle (batch transactions).
· UI pokazuje tylko jeden przycisk “Wyślij”.

---

6. SYSTEM WIZUALNY I DESIGN TOKENS

Identyczne tokeny jak w poprzednich promptach.
Dodatkowe dla modala:

```css
--modal-max-width: 600px;
--modal-border-radius: 24px;
--modal-padding: 24px;
--modal-backdrop: rgba(0, 31, 31, 0.6);
--modal-backdrop-blur: blur(4px);
```

Stany przycisków:

· Primary (złoty) – tło --gold-400, tekst --teal-800.
· Secondary (fiolet) – obrys --purple-300, tekst --purple-300.
· Danger (czerwony) – dla anulowania subskrypcji.

Stany błędów:

· Pole input z błędem – czerwona ramka (--error-base).
· Komunikat błędu – czerwony tekst (--error-base).

---

7. INŻYNIERIA TECHNICZNA (NEXT.JS + WEB3)

7.1 Integracja z Circle API (karty)

· Użycie Circle Elements (iframe) – unikamy przechowywania danych karty.
· Backend tworzy payment intent i pobiera clientSecret.
· Po sukcesie – webhook aktualizuje saldo.

7.2 Integracja z Web3 (ethers.js, SIWE)

· ethers.js v6 do interakcji z portfelem.
· SIWE (Sign-In with Ethereum) – dla logowania i autoryzacji transakcji.
· Obsługa WalletConnect (modal).

7.3 Obsługa Paymaster (sponsoring gazu)

· Wdrożenie standardu ERC‑4337 (Account Abstraction).
· Backend podpisuje UserOperation z paymasterData.
· UI wyświetla “Gas sponsored”.

---

8. DOSTĘPNOŚĆ (WCAG 2.2) I ERGONOMIA

· Focus trap – wewnątrz modala fokus nie wychodzi poza niego.
· Zamykanie – Escape, kliknięcie w backdrop, przycisk X.
· Komunikaty błędów – czytane przez czytniki ekranu (role="alert").
· Kontrast – 4.5:1 dla wszystkich tekstów.
· prefers-reduced-motion – wyłączenie animacji.

---

9. CHECKLISTA IMPLEMENTACYJNA (PODZIAŁ NA ATOMY)

Atomy (podstawowe)

· PaymentModal (kontener)
· AmountSelector (szybkie kwoty + input)
· MethodCard (karta wyboru metody)
· CreditCardForm (Circle Elements)
· WalletConnectButton (Web3)
· NetworkWarning (żółty pasek)
· GasFeeDisplay
· TransactionStatus (spinner, sukces, błąd)

Molekuły / Organizmy

· PaymentWizard (kroki 1-5)
· SubscriptionPlanSelector
· AdditionalOptionsAccordion

Integracje techniczne

· Circle Payments API
· Web3 (ethers.js, WalletConnect)
· ERC‑4337 Paymaster
· Next.js API routes: /api/payment/intent, /api/payment/webhook

---

📌 PODSUMOWANIE

Ten prompt dostarcza atomowo szczegółowej specyfikacji Modala Płatności – fundamentu całego systemu transakcyjnego TipJar+. Zawiera:

· Strategię konwersji i zaufania (MiCA, intent‑based UX).
· Layout desktop/mobile (modal / bottom sheet).
· Pełny wizard krok po kroku (kwota, metoda, formularze, opcje, podsumowanie).
· Stany transakcji Web3 (podpis, mempool, potwierdzenie, błąd).
· Komponenty Web3 (connect wallet, network switch, gas, paymaster).
· Design tokens i dostępność.
· Inżynierię (Circle, ethers.js, ERC‑4337).
· Pełną checklistę implementacyjną.

