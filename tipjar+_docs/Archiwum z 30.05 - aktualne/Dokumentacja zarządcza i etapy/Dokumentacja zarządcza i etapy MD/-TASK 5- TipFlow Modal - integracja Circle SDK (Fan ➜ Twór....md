[TASK 5] TipFlow Modal + integracja Circle SDK (Fan ➜ Twórca)
— pojedynczy epik, do rozbicia na 4 issues – np. UI-modal, walidacja, API, „happy path”
E2E

Pole  Wartość

~3 dni dev + 1 dzień QA

Umożliwić wysłanie napiwku w USDC z portfela fana do portfela twórcy przy pomocy

Cel
Circle Wallets API oraz Circle Gas Station/Paymaster (sponsorowany gas).
Estymacja
AI-pair GPT-4o-turbo — wygeneruje szkielet komponentu TipModal.tsx, hook do obsługi
form (Zod), przykładowe wywołania POST /api/tips + mock danych do Storybooka.
Human Dzieli epik na issues; dopisuje brakujące typy TS; konfiguruje .env; klei flow on-chain
(viem + Circle SDK); pisze testy Cypress “send-tip-happy-path”.
Definition of Done
Walidacja kwoty (min=1 USDC, max z configu)<br>• Obsługa Quick-Amounts
(1/5/10/25)<br>• Wysyłka UserOperation z podpisanym EIP-2612 Permit (Paymaster) lub
transfer DCW→DCW (jeśli fan ma portfel custodial)<br>• Toast „TipIT ✓” po sukcesie +
refetch salda twórcy<br>• E2E test przechodzi na localnet (Polygon Amoy)

• UI modal zgodny z makietą (ciemny turkus, złote CTA)<br>•

---

[TASK 6] Komponent QuickTipButton (Embed + LiveOverlay)

2 dni

Dostarczyć lekki, osadzalny przycisk „TipIT” (< 25 kB gz) z opcją generacji kodu

Cel
<script> dla streamerów / blogerów (zewn. witryny).
Estymacja
AI-pair generuje build Vite microbundle, vanilla JS API, minimalne style (CSS variables)
Human podłącza do TipModal z hostu app; pisze README „Jak wkleić do OBS /
Wordpress”; testuje CORS
DoD
• Przycisk renderuje się na dowolnej domenie<br>• Po kliknięciu ładuje modal z
naszego CDN → postMessage handshake<br>• Handshake chroniony origin-whitelistą<br>•
Automatyczny dark/light theme via prefers-color-scheme

---

[TASK 7] Strona „Odkrywaj Twórców” (📄 /creators)

Pole  Wartość

Publiczna siatka kart twórców + proste filtrowanie (kategoria, sort popularność).

Cel
Estymacja

2,5 dnia

AI-pair zaproponuje algorytm lazy-loading ∞-scroll (IntersectionObserver) + pokaże przykład
skeleton cards.
Human Implementuje GET /api/creators?query=&page=; dodaje kompresję obrazów
(next-optimized-images); dopina responsywność (Tailwind grid).
DoD
cursorową<br>• Filtrowanie działa bez przeładowania (React Query cache)

• SSR pierwszej strony (Next.js getServerSideProps)<br>• ∞-scroll z paginacją

---

[TASK 8] Global Layout & Nawigacja (Desktop + Mobile)

1,5 dnia

Jeden wspólny AppShell (Navbar, Footer, Toaster, ModalRoot) + routing ochronny

Cel
(/dashboard → requires auth).
Estymacja
AI-pair wygeneruje szablon layout.tsx (Next 14 / app-router), konfigurację Headless UI
Dialog + Radix Toast, testy jest-axe (a11y).
Human wkleja logikę wylogowania JWT; dodaje aria-* labels; finalne kolory z Design
Tokenów.
DoD
Mobile hamburger (HeadlessUI Disclosure)

• Pełna nawigacja klawiaturą<br>• WSZYSTKIE linki mają focus-ring złoty<br>•

---

[TASK 9] Podstawowe powiadomienia Web-Push + tablica Notifications (fan + twórca)

2 dni

Real-time info o napiwkach, wypłatach i błędach (SignalR / Pusher Channels).

Cel
Estymacja
AI-pair generuje serwerowy handler (NestJS Gateway) i hook useNotifications.ts z opisem
subskrypcji.
Human Rejestruje Service-Worker; konfiguruje Public VAPID key; pisze UI listy powiadomień
w panelu.
DoD
paginowana<br>• SW cache’uje ikonę offline

• Toast pojawia się ≤ 300 ms od eventu na local dev<br>• Historia powiadomień

---

📌 Pozostałe epiki (do opisania w następnych iteracjach)

10. Landing Page / Marketing (Hero, FAQ, CTA)

11. Creator Dashboard MVP (statystyki, wypłata USDC)

12. Testy CI + Sentry monitoring

13. Accessibility Pass (WCAG AA)

> Jeżeli chcesz, abym rozbił któryś z powyższych epików na szczegółowe issues w takim
samym formacie – daj znać „kontynuuj: [nr]”.

