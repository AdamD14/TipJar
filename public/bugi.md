# SSE Bugs — Diagnosis

## Bug 1 (CRITICAL): `redis.subscribe()` overwrites listeners across connections

node-redis v5 `client.subscribe(channel, callback)` registers **one** callback per channel globally.
Every new SSE connection that subscribes to the same channel **replaces** the previous listener.
`unsubscribe(channel, listener)` also ignores the 2nd arg — it unsubscribes the entire channel,
killing listeners for all other active connections.

- `backend/src/circle/circle.notifications.controller.ts:27` — `await this.redis.subscribe(channel, listener)`
- `backend/src/circle/circle.notifications.controller.ts:30` — `await this.redis.unsubscribe(channel, listener)`
- `backend/src/circle/circle.balance.controller.ts:39` — `await this.redis.subscribe(channel, listener)`
- `backend/src/circle/circle.balance.controller.ts:42` — `await this.redis.unsubscribe(channel, listener)`

**Fix:** `RedisSubscriberService` — multiplexer z EventEmitter. Jeden fizyczny subscribe na channel, wiele listenerów na EventEmitter.

## Bug 2 (MEDIUM): Missing `X-Accel-Buffering` and `flushHeaders()` in notifications controller

`circle.balance.controller.ts` has `X-Accel-Buffering: no` but `circle.notifications.controller.ts` does not.
Neither controller calls `res.flushHeaders()` after setting SSE headers — Express/NestJS may buffer
the response, delaying the initial connection handshake and preventing data from reaching the client.

- `backend/src/circle/circle.notifications.controller.ts:18-20` — headers set, no `X-Accel-Buffering`, no `flushHeaders()`
- `backend/src/circle/circle.balance.controller.ts:25` — has `X-Accel-Buffering: no`, but no `flushHeaders()`

**Fix:** Dodano `X-Accel-Buffering: no` i `res.flushHeaders()` do obu controllerów.

## Bug 3 (LOW): SSE hooks start before zustand persist hydration finishes

`getAuthToken()` reads from `sessionStorage` synchronously, but zustand `persist` with
`sessionStorage` hydrates asynchronously. The SSE `useEffect` fires before hydration completes,
token is `null`, connection retries every 5s until sessionStorage is finally populated.

- `frontend/src/lib/hooks/useNotificationsLive.ts:23-27` — `getAuthToken()` returns `''` → 5s retry loop
- `frontend/src/lib/hooks/useCircleBalanceLive.ts:34-38` — same pattern
- `frontend/src/lib/store/notificationStore.ts:24-34` — same `getAuthToken()` used in `loadHistory` / `markAllRead`
- `frontend/src/lib/store/authStore.ts:107-111` — `_hasHydrated` set async but never checked by SSE hooks

**Fix:** SSE hooki sprawdzają `useAuthStore((s) => s._hasHydrated)` — jeśli false, nie łączą się. `useEffect` re-fire gdy `hasHydrated` zmieni się na true.

---

## Co było błędne w rozwiązaniach z zewnętrznego modelu AI

1. **Usunięcie `@UseGuards(AuthGuard('jwt'))`** — controlery SSE stałyby się niezabezpieczone. `userId` z `req.query` zamiast JWT = dziura bezpieczeństwa
2. **Zmiana ścieżek** z `/stream` na `/live` — bez powodu, psuje frontend
3. **`EventSource` z tokenem w query string** (`?token=...`) — JWT w URL = wyciek przez logi, referery, historię przeglądarki. Oryginalny kod celowo używa `fetch()` + `ReadableStream` żeby wysłać Bearer w headerze
4. **Frontend hooki** — zupełnie ignorują istniejącą logikę: `notificationStore.addNotification()`, `queryClient.setQueryData()`, retry na disconnect. Wrzucają `// TODO: Update store`
5. **`authStore.ts`** — nadpisuje cały store, usuwa `step`, `user`, `consents`, `nextStep()` itd.
6. **Kanały Redis** — zmienia `notifications:{userId}` na `user:{userId}:notifications` — psuje publish w `circle.service.ts`
