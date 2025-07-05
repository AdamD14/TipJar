# Konfiguracja kluczy API

Wszystkie wrażliwe dane dostępowe przechowuj w zmiennych środowiskowych lub menedżerze sekretów. Poniższa tabela prezentuje najważniejsze klucze wymagane do działania systemu TipJar.

| Zmienna | Opis |
|---------|------|
| `CIRCLE_API_KEY` | Klucz API dla usług Circle (wallets i payments). |
| `CIRCLE_ENTITY_SECRET` | Sekret jednostki Circle używany do podpisywania zapytań. |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Dane do integracji OAuth z Google. |
| `TWITCH_CLIENT_ID` / `TWITCH_CLIENT_SECRET` | Dane do integracji OAuth z Twitch. |
| `SENDGRID_API_KEY` | Klucz do usługi SendGrid (opcjonalnie dla powiadomień e-mail). |

Przykładowy plik `.env` może wyglądać następująco:

```env
CIRCLE_API_KEY=twoj_klucz_api
CIRCLE_ENTITY_SECRET=twoj_entity_secret
GOOGLE_CLIENT_ID=google_id
GOOGLE_CLIENT_SECRET=google_secret
TWITCH_CLIENT_ID=twitch_id
TWITCH_CLIENT_SECRET=twitch_secret
SENDGRID_API_KEY=sendgrid_secret
```

Upewnij się, że pliki zawierające powyższe dane nie są commitowane do repozytorium i są odpowiednio chronione w środowisku produkcyjnym.
