# Integracja z Zewnętrznymi API

Poniższa sekcja podsumowuje kluczowe elementy integracji TipJar z wybranymi usługami zewnętrznymi. Szczegółowe instrukcje znajdują się w dedykowanych dokumentach.

## Circle API
- Używamy oficjalnego SDK Circle (np. `@circle-fin/circle-sdk` dla Node.js) do obsługi portfeli i płatności.
- Wymagana jest konfiguracja kluczy API &ndash; patrz [konfiguracja kluczy API](konfiguracja-api.md).

### Gas Station i Paymaster
- **Circle Gas Station** &ndash; TipJar jako deweloper sponsoruje opłaty transakcyjne dla portfeli DCW twórców. Rozliczenie z Circle następuje poza blockchainem (np. kartą kredytową).
- **Circle Paymaster** &ndash; fani korzystający z zewnętrznych portfeli EOA mogą opłacić gaz w USDC. Implementacja wymaga wdrożenia kontraktu Paymaster w obsługiwanej sieci (np. Polygon) i przekazywania niezbędnych danych przez backend.

## OAuth Google i Twitch
- Rejestrujemy aplikacje odpowiednio w Google Cloud Console oraz Twitch Developers, pozyskujemy `Client ID` i `Client Secret`, definiujemy adresy `redirect URI`.
- Backend wykorzystuje np. Passport.js do przeprowadzenia handshake OAuth (szczegóły w [konfiguracji kluczy API](konfiguracja-api.md)).

## Powiadomienia e-mail
- Do opcjonalnej wysyłki maili (potwierdzenie rejestracji, powiadomienia o napiwkach) można wykorzystać SMTP lub usługę SendGrid. Wymagany jest stosowny klucz API.
