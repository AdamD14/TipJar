5. Kluczowe Przepływy Użytkownika – Atomizacja, Schematy, Checklista

---

5.1 Onboarding Twórcy (proces rejestracji i konfiguracji konta twórcy)

Etapy:

1. Start rejestracji:

Wybór „Dołącz jako Twórca”

Przycisk Google / Twitch / SIWE (Web3)

2. OAuth / SIWE:

Przekierowanie do Google/Twitch/metamask

Powrót z danymi, tworzenie konta w DB

3. Tworzenie portfela Circle:

Automatyczne zakładanie DCW (Circle Developer Controlled Wallet)

Zapis walletId w DB

4. Wybór aliasu:

Formularz wyboru unikalnej nazwy @alias

Walidacja (sprawdzenie dostępności)

5. Konfiguracja profilu:

Uzupełnienie bio, upload avatara, linki społecznościowe

6. Panel powitalny:

Potwierdzenie założenia profilu

Link do publicznej strony twórcy i panelu dashboard

Schemat:

[Start] → [OAuth/SIWE] → [Tworzenie Wallet] → [Alias] → [Profil] → [Panel Twórcy]

Checklista:

[ ] Przycisk „Dołącz jako Twórca” (landing/register)

[ ] Integracja Google/Twitch/SIWE

[ ] Tworzenie Circle Walleta po autoryzacji

[ ] Formularz wyboru aliasu z walidacją

[ ] Uzupełnienie profilu (avatar, bio, linki)

[ ] Potwierdzenie & onboarding tour/podpowiedzi

---

5.2 Onboarding Fana (rejestracja/logowanie fana, szybkie wsparcie)

Etapy:

1. Start onboarding:

Przycisk „Zaloguj się jako Fan” lub „Wesprzyj jako Gość”

2. Wybór metody:

Google / e-mail / SIWE / anonimowy guest

3. Tworzenie portfela Circle (dla zalogowanego):

Automatyczne (lub pominięte jeśli guest)

4. Zakończenie onboarding:

Przekierowanie do panelu fana lub powrót do procesu napiwku

Schemat:

[Start] → [Metoda logowania] → [Wallet] → [Panel fana] / [Napiwek]

Checklista:

[ ] Przycisk „Zaloguj jako Fan”/„Wesprzyj jako Gość”

[ ] Logika guest vs zarejestrowany

[ ] Automatyczne zakładanie portfela (Circle)

[ ] Powrót do wybranej akcji po zalogowaniu

---

5.3 Wysyłanie Napiwku (proces tipowania twórcy)

Etapy:

1. Wejście na profil twórcy

2. Klik „Wesprzyj” (CTA):

3. Wybór kwoty (slider/chips/input)

4. Wybór metody płatności:

Portfel platformowy (Circle DCW)

Zewnętrzny portfel (MetaMask/WalletConnect + Paymaster)

Karta płatnicza (Circle Payments API)

5. Opcjonalna wiadomość do twórcy

6. Potwierdzenie & przetwarzanie transakcji

7. Komunikat końcowy (sukces/error) + aktualizacja na liście napiwków

Schemat:

[Profil Twórcy] → [Wesprzyj] → [Kwota + Metoda] → [Potwierdzenie] → [Success/Error]

Checklista:

[ ] Widoczny przycisk „Wesprzyj” na profilu twórcy

[ ] Wybór kwoty (min $1, slider/chips)

[ ] Wybór metody płatności

[ ] Obsługa Circle DCW, Paymaster, karta

[ ] Pole na wiadomość (opcjonalnie)

[ ] Potwierdzenie + loading

[ ] Komunikat zwrotny (success/error)

[ ] Aktualizacja historii napiwków

---

Następna sekcja:
5.4 Wypłata przez Twórcę
Napisz NEXT.
5.4 Wypłata przez Twórcę (withdrawal flow)

Etapy:

1. Wejście do panelu twórcy:

Sekcja „Wypłaty”/„Wyślij środki”

2. Wyświetlenie aktualnego salda (USDC)

3. Wprowadzenie danych wypłaty:

Adres zewnętrznego portfela (np. MetaMask, WalletConnect)

(Opcjonalnie) wybór wypłaty na konto bankowe (Circle Payouts, jeśli obsługiwane)

Kwota do wypłaty (możliwość „Wypłać wszystko”)

4. Podsumowanie i informacja o prowizji

Wyliczenie netto po opłatach (np. -3.5%/5%)

5. Zatwierdzenie wypłaty:

Potwierdzenie operacji (przycisk, ewentualnie 2FA/mail)

6. Przetwarzanie transferu:

Zlecenie przelewu via Circle API

Monitorowanie statusu (pending/complete/error)

7. Komunikat końcowy:

Potwierdzenie sukcesu, odświeżenie salda

Wyświetlenie w historii wypłat

Schemat:

[Panel Twórcy] → [Wypłata] → [Dane wypłaty] → [Podsumowanie] → [Potwierdzenie] →
[Status] → [Historia wypłat]

Checklista:

[ ] Sekcja wypłat w dashboardzie twórcy

[ ] Wyświetlanie dostępnego salda USDC

[ ] Formularz z polem adresu portfela (walidacja adresu)

[ ] (Opcjonalnie) wybór wypłaty na bank (jeśli MVP obsługuje)

[ ] Wprowadzenie kwoty (min/max, cały balans)

[ ] Wyliczenie opłat, widoczna kwota netto

[ ] Potwierdzenie operacji (przycisk, opcjonalne zabezpieczenia)

[ ] Przekazanie zlecenia do Circle API (withdrawal)

[ ] Obsługa statusów (pending/complete/error)

[ ] Komunikaty i odświeżenie salda po sukcesie

[ ] Historia wypłat

---

Następna sekcja:
6. Animacje, powiadomienia, panel admina, user feedback (atomizacja i checklisty)

Napisz NEXT żeby kontynuować.

