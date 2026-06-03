🧬 Krok 5: Specyfikacja Logiki Web3 i Płatności

1. Architektura Modala Płatności (Payment Modal)

Zgodnie z dokumentem tech_modal.pdf (str. 1-13) oraz Master Plan UI (str. 1-12).

1.1 Struktura Krok po Kroku (Wizard)

Krok Nazwa Zawartość / Mechanika
0 Kontekst Tytuł "Wesprzyj [Nazwa]", Awatar twórcy 32x32px, przycisk X
1 Kwota Przyciski szybkie ($1, $5, $10, $20, $50) + Pole własne (walidacja min/max). Live conversion na USDC/ETH (oracle co 30s). font-feature-settings: "tnum"
2 Metoda Akordeon z 3 opcjami: Karta (Circle), Web3 Wallet, Saldo TipJar
3a Formularz Karty <iframe> Circle Elements (PCI DSS). Stylowanie przez style object. Checkbox "Zapisz kartę".
3b Formularz Web3 Przycisk "Połącz portfel" (RainbowKit/Web3Modal). Stan połączony: skrócony adres 0x12...89AB lub ENS (fan.eth), saldo USDC.
3c Saldo TipJar Wyświetlenie dostępnego salda. Przycisk "Zapłać z salda".
4 Opcje Dodatkowe Akordeon: Wiadomość (textarea, limit 200 znaków, DOMPurify), Checkbox "Proof of Support NFT" (domyślnie zaznaczony), Checkbox "Anonimowo"
5 Podsumowanie Tabela: Kwota + Opłata platformy (0%) + Gas Fee (szacowane). Przycisk finalny --gold-400. Klauzula MiCA (microcopy).

1.2 Wybór Sieci (Network Warning)

Właściwość Wartość
Obsługiwane sieci Polygon (chainId: 0x89), Ethereum Mainnet (0x1) – z priorytetem L2
Wykrywanie wagmi useChainId
Nieprawidłowa sieć Żółty pasek (--warning-base): "Zmień sieć na Polygon, aby kontynuować."
Akcja Przycisk "Zmień sieć" → window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x89' }] })

---

2. Stany Transakcji Web3 (Transaction Lifecycle)

Zgodnie z tech_modal.pdf (str. 7-8).

Stan Nazwa UI Zachowanie Modala Komunikat / Wizualizacja
1 Oczekiwanie na podpis Zablokowany (nie można zamknąć). Przycisk: Spinner + "Oczekiwanie na portfel...". "Potwierdź transakcję w swoim portfelu."
2 Wysłano (Pending) Odblokowany (można zamknąć, proces trwa w tle). Spinner zegara + "Transakcja wysłana. Oczekiwanie na potwierdzenie sieci..." + Link do Polygonscan.
3 Sukces (Confirmed) Transformacja widoku. Zielony checkmark + "Transakcja zatwierdzona! 🎉" + Haptyk (sukces). Przyciski: "Zamknij", "Udostępnij".
4 Błąd (Error) Podświetlenie na czerwono (--error-dark). Przycisk "Spróbuj ponownie". Mapowanie kodu RPC na ludzki język: "Odrzucono w portfelu", "Niewystarczające środki na gaz". Nigdy surowy kod błędu.

---

3. Abstrakcja Konta (ERC-4337) i Paymaster

Zgodnie z tech_modal.pdf (str. 9) i tech_fan_profil.pdf (str. 7).

Komponent Opis Implementacja
Smart Account Portfel tworzony automatycznie przy rejestracji, kontrolowany przez logowanie Web2 (Passkeys). @alchemy/aa-core, @account-abstraction/sdk
UserOperation Obiekt zamiast tradycyjnej transakcji. Pozwala na batchowanie (np. approve + transfer w jednym kliku). Generowanie po stronie klienta, podpis, wysyłka do Bundlera.
Paymaster Kontrakt sponsorujący opłaty za gaz. Weryfikacja paymasterAndData w UserOp.
UX dla użytkownika Pole "Gas Fee" w podsumowaniu znika lub wyświetla się jako $0.00 (sponsorowane przez TipJar+). Zielony komunikat --success-base.
Fallback Jeśli Paymaster niedostępny, użytkownik widzi szacowany koszt gazu w USD. Wycena przez oracle gazowe.

---

4. Wyświetlanie Adresów i ENS

Zgodnie z Master Plan UI (str. 9) i tech_katalog_3part.pdf (str. 20).

Właściwość Wartość
Priorytet 1. ENS Name (np. vitalik.eth). 2. Skrócony adres (0x12...89AB).
Biblioteka viem
Metody getEnsName({ address }), getEnsAddress({ name })
Normalizacja normalize(name) (UTS-46) przed każdym zapytaniem – ochrona przed homografami.
UI Wyświetlanie pełnej nazwy ENS. Przy skróconym adresie: przycisk "Kopiuj" + Toast "Skopiowano!".
Modal QR Na mobile: możliwość wyświetlenia kodu QR z pełnym adresem do zeskanowania przez inną aplikację portfelową.

---

5. Zgodność z MiCA (Markets in Crypto-Assets)

Zgodnie z tech_modal.pdf (str. 2) i tech_knowledge.pdf (str. 3-4).

Wymóg MiCA Implementacja w UI
Przejrzystość kosztów Tabela podsumowująca przed kliknięciem "Wyślij": Kwota + Opłata platformy + Opłata sieciowa (Gas).
Zakaz "Dark Patterns" Przycisk anulowania subskrypcji jest zawsze dostępny i czytelny (np. w Panelu Fana → Moje subskrypcje → Zarządzaj → Anuluj).
Stablecoiny (EMT/ART) Komunikat w Tooltipie przy saldzie USDC: "Stablecoiny w TipJar+ służą wyłącznie do płatności. Nie są oprocentowane."
Białe Księgi Link w stopce modala lub w Ustawieniach: "Dokumentacja aktywów (White Paper)". Otwiera PDF lub stronę z iXBRL.

---

6. Checklista Implementacyjna Modala Płatności

Atom / Molekuła Kluczowe Właściwości
PaymentModal isOpen, onClose, creatorId, zarządzanie backdrop i scroll-lock
AmountSelector Presety, customAmount, walidacja min/max, tnum
MethodCard isActive, ikona, tytuł, onClick
CreditCardForm Wrapper dla @circle/elements-sdk. Dynamiczne stylowanie Dark Mode.
WalletConnectButton useConnect, useAccount (wagmi). Wyświetlanie ENS / skróconego adresu.
NetworkWarning useChainId, useSwitchChain. Warunkowe renderowanie.
GasFeeDisplay Pobieranie estymacji z viem. Wyświetlanie w USD. Ukrywane przy Paymasterze.
TransactionStatus useWaitForTransactionReceipt. Mapowanie status na widoki (Pending, Success, Error).
AdditionalOptionsAccordion Checkboxy (NFT, Anonimo), Textarea (wiadomość).

---

🏁 Podsumowanie Finałowe


1. Fundamenty – Wszystkie tokeny CSS, cienie, animacje, breakpointy.
2. Atomy – Przyciski, inputy, awatary z matematyką odznak.
3. Molekuły – Karty, modale, tooltipy, toasty, stany ładowania.
4. Widoki – Profil Twórcy (Masonry + Sticky), Panel Fana (Galeria NFT), Katalog (Grid + Paginacja).
5. Logika Web3 – Modal Płatności, Stany Transakcji, Paymaster, ENS, MiCA.

🐋.