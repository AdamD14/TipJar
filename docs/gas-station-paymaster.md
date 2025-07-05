# Integracja z Gas Station i Circle Paymaster

Niniejszy dokument opisuje implementację mechanizmów umożliwiających sponsorowanie opłat transakcyjnych w platformie **TipJar**. Wykorzystujemy dwie komplementarne usługi Circle:

1. **Circle Gas Station** – backend TipJar pokrywa opłaty za transakcje wykonywane z deweloperskich portfeli (DCW) typu smart contract account.
2. **Circle Paymaster** – fani mogą płacić za gas w USDC, korzystając ze swoich zewnętrznych portfeli EOA.

## 9.1 Circle Gas Station (integracja backendowa)

Gas Station służy do sponsorowania gazu dla transakcji inicjowanych przez TipJar z portfeli DCW. Typowe zastosowania:

- transfer USDC z konta operacyjnego platformy do portfela twórcy,
- transfer USDC między wewnętrznymi portfelami fana i twórcy,
- wypłaty USDC z portfela twórcy na zewnętrzny adres.

### Implementacja

1. **Portfele DCW jako SCA** – podczas tworzenia portfela w `provisionUserWallet` należy ustawić `accountType: 'SCA'`.
2. **Poziom opłat** – przy inicjowaniu transferów przekazujemy `feeLevel` (`LOW`, `MEDIUM`, `HIGH`). Przykład w `CircleService.initiateWithdrawal`:

```ts
const transferRequestPayload: CreateDeveloperTransactionTransferRequest = {
  // ... inne pola
  feeLevel: FeeLevel.MEDIUM,
};
```
3. **Konfiguracja polityk** – w konsoli Circle definiujemy zasady sponsorowania, np. limity wydatków czy listy dozwolonych adresów.
4. **Rozliczenia** – TipJar rozlicza zużyty gaz w USDC/kartą podpiętą do konta Circle.

## 9.2 Circle Paymaster (integracja frontendowa)

Paymaster umożliwia fanom płacenie za gaz w USDC, gdy używają portfeli EOA (np. MetaMask). Integracja odbywa się całkowicie po stronie frontendu.

### Kroki

1. **Środowisko** – instalujemy `viem` oraz biblioteki do account abstraction i konfigurujemy adresy kontraktów w `.env.local`.
2. **Inicjalizacja portfela** – po połączeniu z EOA tworzymy tymczasowy smart account zgodny z EIP‑7702.
3. **Permit (EIP‑2612)** – fan podpisuje wiadomość `permit` pozwalającą Paymasterowi pobrać USDC na opłatę za gaz.
4. **UserOperation** – przygotowujemy obiekt operacji z zakodowanym `callData` (transfer USDC) i `paymasterData`, po czym wysyłamy go do bundlera.
5. **Monitoring** – oczekujemy na `UserOperationReceipt`, informując użytkownika o statusie transakcji.

### Endpointy pomocnicze

W katalogu `frontend/src/app/api/paymaster/` znajdują się dwa proste endpointy wykorzystywane przez UI:

```
GET /api/paymaster/config  – zwraca adresy EntryPoint, Paymaster, USDC oraz URL bundlera.
GET /api/paymaster/nonce   – generuje kryptograficznie bezpieczny nonce do podpisu.
```

Oba są ograniczone prostym limiterem do maks. 10 zapytań na minutę z jednego IP.

## 9.3 Różnice Gas Station vs. Paymaster

| Kategoria | Circle Paymaster (fan z EOA) | Circle Gas Station (operacje TipJar) |
|-----------|-----------------------------|-------------------------------------|
| **Opis** | Fan płaci gaz w USDC. | Platforma sponsoruje gaz użytkowników. |
| **Konto Circle** | Nie wymagane. | Wymagane dla TipJar. |
| **Kompatybilne portfele** | Dowolny portfel ERC‑4337 lub EOA z EIP‑7702. | Circle Wallets (SCA). |
| **Płacone w** | USDC przez fana. | Waluta fiat (karta) przez TipJar. |
| **Płacone przez** | Fana (użytkownik końcowy). | TipJar (deweloper). |

Zastosowanie obu rozwiązań minimalizuje koszty po stronie użytkowników i zapewnia płynne doświadczenie podczas wysyłania napiwków.

