Dobra, biorę Community na warsztat. Osiem podsekcji z tree, każda dostaje: co robi, jakie elementy, skąd dane, co potrzebne nowego w backendzie, i gdzie się styka z tym co już masz (`FollowsService`, `TipsService`, `NotificationService`, `Tip`/`User` z Prisma). Lecę po kolei, mów gdzie się nie zgadzasz.

## Feed (Posts / Updates / Announcements / Media Posts / Pinned Posts)

**Cel:** twórca publikuje treść dla swojej społeczności — tekst, media, ogłoszenia. To centralny kanał komunikacji poza streamem.

Nowy model `Post`: `id, creatorId, type (TEXT|MEDIA|ANNOUNCEMENT), content, mediaUrls[], visibility (PUBLIC|SUBSCRIBERS_ONLY|SUPPORTERS_ONLY), isPinned, createdAt, editedAt`.

**Widok twórcy (Studio → tworzenie):** edytor z polem tekstowym, upload media (przez Cloudinary, masz to już w onboardingu), selector widoczności (public/tylko subskrybenci — to wiąże się z Memberships niżej), toggle pin (max np. 3 przypięte).

**Widok publiczny (na profilu, sekcja "Fanwall preview" / osobna zakładka "Feed"):** lista postów chronologicznie, pinned na górze zawsze, media w karuzeli jak avatar w onboardingu (konsystencja komponentu), reakcje (spina się z Engagement niżej).

**Pytanie do Ciebie:** czy `ANNOUNCEMENT` to osobny typ z innym stylem wizualnym (np. banner zamiast karty), czy tylko flaga na zwykłym poście? Zakładam że to osobny typ, bo ma inną wagę (np. wysyła też push/notification do followersów, zwykły post nie).

## Supporters (Recent / Top / History / Messages / Supporter Profiles)

**Cel:** to nie nowa encja — to **widok agregujący** dane, które już masz w `Tip` (masz `amount`, `fanId`, `message`, `isAnonymous`, `createdAt`, `status`). Zero nowego modelu potrzebne, tylko query layer.

- **Recent Supporters** — `Tip.findMany({ where: { creatorId, status: COMPLETED }, orderBy: createdAt desc })`, dokładnie to co masz w `getPublicTipsForCreator`, tylko widok prywatny (twórca widzi więcej niż publiczna lista — np. nieanonimowych nawet gdy `isAnonymous: true` dla siebie samego? To decyzja: czy anonimowość chroni też przed twórcą, czy tylko przed innymi widzami. Zakładam że **twórca zawsze widzi kto wysłał**, anonimowość jest tylko publiczna).
- **Top Supporters** — `groupBy fanId, sum(amount)`, sortowane malejąco, z oknem czasowym (all-time / 30 dni / 7 dni — selector).
- **Support History** — pełna, filtrowana, paginowana tabela transakcji per supporter po kliknięciu w profil.
- **Supporter Profiles** — modal/subview: avatar, username, suma wsparcia, historia wiadomości, przycisk "message" (→ Messages), przycisk follow-back jeśli twórca chce śledzić fana.

**Backend:** nowy `SupportersService` w `TipsService`-adjacent, bez nowych tabel, tylko agregacje.

## Followers (Followers List / Growth / Recent Followers / Follow Requests)

To jedyna podsekcja, która **już ma backend** (`FollowsService`). Reszta to UI + dwie brakujące rzeczy:

- **Followers List** — `getFollowers()` już masz, paginacja gotowa, tylko widok listy z avatar/username/followedAt.
- **Growth** — wykres w czasie, wymaga albo cronowego snapshotu (`FollowerSnapshot { userId, count, date }` zapisywany raz dziennie), albo liczenia on-the-fly z `Follow.createdAt` grupowanego po dniach — prostsze, brak nowej tabeli, polecam to.
- **Recent Followers** — to samo co Followers List, tylko `take: 5-10` na dashboard/desktop widget.
- **Follow Requests** — **to zakłada prywatne konta z akceptacją**, czego obecny `FollowsService.follow()` nie robi (follow jest natychmiastowy, brak stanu PENDING). Pytanie: czy w ogóle chcesz private accounts / follow requests w tym produkcie? Dla twórców publicznych profili (co sugeruje cały onboarding — "creator is born", public URL) to raczej zbędne. Sugeruję **wywalić Follow Requests z zakresu**, chyba że masz inny zamysł.

## Memberships (Tiers / Perks / Members / Exclusive Posts / Renewal Settings)

**Cel:** płatna, cykliczna subskrypcja — to już nie jest jednorazowy `Tip`, to osobny strumień przychodu wymagający **recurring payment**, którego w Circle DCW **nie ma natywnie** (Circle robi pojedyncze transfery, nie subskrypcje). To największy techniczny problem w całej tej sekcji.

Realne opcje wykonania:
1. **Scheduled job** — backend co miesiąc sam inicjuje `transferToAddress` z wallet fana do twórcy, wymaga że fan ma **pre-authorized** to (delegate na swoim SCA wallet dla platformy, podobnie jak `GATEWAY_DELEGATE_WALLET_ADDRESS` w Twoim istniejącym kodzie do Gateway). To technicznie wykonalne bo już masz wzorzec delegate w `CircleService`.
2. Fan musi mieć wystarczające saldo w dniu odnowienia — jak nie ma, subskrypcja `PAST_DUE` → `CANCELLED` po X dni grace period.

Model: `MembershipTier { id, creatorId, name, priceMonthly, perks[], color/badge }`, `Subscription { id, fanId, tierId, status (ACTIVE|PAST_DUE|CANCELLED), currentPeriodEnd, nextChargeAt }`.

**To jest osobny, duży temat** — polecam zrobić to jako oddzielną rundę projektowania, nie wrzucać w ten sam spec co reszta Community, bo dotyka delegate/scheduled charges, czyli koreluje bezpośrednio z bugiem idempotency z poprzedniej rozmowy (scheduled recurring charge **musi** mieć deterministyczny idempotency key per okres rozliczeniowy, inaczej retry = podwójne obciążenie co miesiąc).

## Events (Upcoming / Livestream / Community Sessions / Reminders / RSVP)

Prosty CRUD, zero integracji z Circle. Model: `Event { id, creatorId, title, description, startAt, endAt?, type (LIVESTREAM|COMMUNITY_SESSION|OTHER), coverImageUrl }`, `EventRSVP { eventId, userId, status }`.

**Widok twórcy:** formularz tworzenia (tytuł, data, typ, opis, cover), lista nadchodzących/przeszłych.
**Widok publiczny:** karta eventu na profilu, przycisk RSVP (wymaga logowania — anon nie może RSVP).
**Reminders:** notification (masz już `NotificationService` + Redis pub/sub z `handleWebhook` — ten sam wzorzec) wysyłany np. 1h przed startem, wymaga cron/queue (BullMQ skoro masz Redis już podpięty).

## Messages (Inbox / Support Messages / Broadcasts / Auto Replies / Message Requests)

Rozdzielam na dwie różne rzeczy, bo mieszają dwa różne kierunki komunikacji:

- **Support Messages** — to już masz, to `Tip.message`. Zero nowego modelu, tylko widok filtrowany "tipy z wiadomością".
- **Inbox / DM 1:1** — to nowa, pełna funkcja czatu (fan↔creator). Nowy model `Message { id, senderId, recipientId, content, readAt, createdAt }` + realtime przez Redis pub/sub (wzorzec już masz z `notifications:${userId}`) albo WebSocket gateway.
- **Broadcasts** — wiadomość jeden-do-wielu (do wszystkich followersów albo subskrybentów danego tier). To bliżej "Announcement" z Feed niż DM — pytanie czy to ma być osobny mechanizm, czy alias na `Post{ type: ANNOUNCEMENT }` z wymuszoną notyfikacją. Polecam to drugie, żeby nie duplikować logiki.
- **Auto Replies** — pierwsza wiadomość od nowego fana dostaje automatyczną odpowiedź. Niski priorytet, prosty template stored per creator.
- **Message Requests** — DM od kogoś kto nie followuje trafia do osobnej kolejki zamiast inboxa (jak IG). Wymaga flagi `isRequest: boolean` na `Message`.

**To też jest kandydat na osobną rundę** — pełny system DM z realtime to nie jest coś do zaprojektowania w akapicie.

## Engagement (Polls / Questions / Community Goals / Challenges / Reactions)

- **Polls** — `Poll { id, creatorId, question, options: PollOption[] }`, `PollVote { pollId, optionId, userId }` (unique constraint na `pollId+userId` żeby jeden głos per user).
- **Questions** — Q&A skrzynka, fan zadaje pytanie, twórca odpowiada publicznie lub prywatnie. Model podobny do `Message` z flagą `isPublicAnswer`.
- **Community Goals** — to różni się od `Goal` z Monetization (który jest finansowy, kwotowy). Community Goal może być np. "1000 followersów odblokuje Q&A" — nie-finansowy cel z progress barem liczonym z dowolnej metryki (followers count, liczba postów, cokolwiek). Elastyczny model: `CommunityGoal { metric: FOLLOWERS|SUPPORT_COUNT|CUSTOM, target, current, reward }`.
- **Challenges** — najbardziej mgliste w tree, brak konkretnego sensu bez przykładu użycia. Co miałeś na myśli konkretnie? Bez tego nie zgaduję modelu.
- **Reactions** — proste, `Reaction { targetType: POST|EVENT, targetId, userId, emoji }`, unique per user+target.

## Moderation (Blocked Users / Hidden Messages / Word Filters / Permissions / Reported Content)

Standardowy zestaw, mało kontrowersyjny:

- `Block { blockerId, blockedId }` — blokuje follow, DM, komentarze w obie strony.
- `Post`/`Message` dostają `isHidden: boolean` ustawiane przez twórcę.
- `WordFilter { creatorId, word }` — lista słów auto-ukrywających komentarz/wiadomość zawierającą je.
- `Report { reporterId, targetType, targetId, reason, status }` — kolejka do przeglądu, na start pewnie bez panelu admina, tylko twórca widzi zgłoszenia na swoim contencie.

---

**Podsumowanie priorytetów wykonania** (moja sugestia, popraw jeśli inaczej to widzisz):

1. **Followers** — 90% gotowe, tylko UI, zero nowego backendu.
2. **Supporters** — czysty query layer na istniejącym `Tip`, szybkie.
3. **Feed** — jeden nowy model, umiarkowana robota, wysoka wartość (to serce Community).
4. **Events** — prosty CRUD, niezależny od reszty.
5. **Engagement (Polls/Reactions)** — proste, niska zależność.
6. **Moderation** — potrzebne zanim otworzysz Feed/Messages publicznie, ale samo w sobie nie generuje wartości.
7. **Messages (DM)** — duży osobny temat, realtime.
8. **Memberships** — największe ryzyko techniczne (recurring charges na Circle DCW), osobna runda projektowania obowiązkowa.

Mów co się zgadza, co poprawić, co wywalić (Challenges czekam na wyjaśnienie), i lecimy dalej — albo od razu w konkretny model danych + endpointy dla tego co zatwierdzisz.