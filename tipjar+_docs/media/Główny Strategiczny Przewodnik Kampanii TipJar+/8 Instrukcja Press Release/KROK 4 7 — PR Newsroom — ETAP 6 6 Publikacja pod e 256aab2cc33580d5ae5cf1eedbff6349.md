# KROK 4/7 — PR/Newsroom — ETAP 6/6: Publikacja pod embargiem + monitoring T+120 min / D+3

Cel etapu: opublikować PR/Newsroom dokładnie o 2025-08-20 09:00 CEST, rozesłać pitch wg okien, zapisać paragony publikacji, uruchomić monitoring oraz zebrać klipy. Strefa czasu: Europe/Brussels (CEST).

---

A) Kontrola „-30 min” (08:30–08:59 CEST) — PASS/FAIL

1. Dostępność stron (bez logowania):

/pl/newsroom/ (NEWSROOM_PAGE_PL v1.0.1)

/pl/newsroom/press-release (PL)

/en/newsroom/press-release (EN)
Wynik: HTTP 200. I cannot verify this.

1. Og meta / obraz: OG image publiczny → HTTP 200. I cannot verify this.
2. JSON-LD: SCHEMA_NEWS_JSONLD w <script type="application/ld+json"> (PL/EN) — składnia poprawna (lokalny lint).
3. Canonical: zgodny z META_PACK_PR.
4. Sitemaps: wpisy PR/Newsroom dodane, lastmod = 2025-08-20T09:00:00+02:00.
5. CTA: 1 na dokument; linki z UTM.
6. Dostępność: ALT ≤ 120 znaków, kontrast miniatur AA (wizualny spot-check).
7. Przygotuj paragony PUBLISH_RECEIPT_* (szablony poniżej).

---

B) Procedura publikacji „na zegar” (09:00:00 CEST)

1. Odblokuj (remove draft/noindex) i opublikuj w kolejności:
a) NEWSROOM_PAGE_PL → produkcja.
b) PRESS_RELEASE_PL → produkcja.
c) PRESS_RELEASE_EN → produkcja.
2. Zapisz paragony (DAM):

dam://campaigns/launch2025/newsroom/pl/2025/08/20/PUBLISH_RECEIPT_newsroom_pl.json

dam://campaigns/launch2025/pr/pl/2025/08/20/PUBLISH_RECEIPT_press_pl.json

dam://campaigns/launch2025/pr/en/2025/08/20/PUBLISH_RECEIPT_press_en.json
Treść:

{"plan_id":"PLAN-PR-20250819-001","published_at":"2025-08-20T09:00:00+02:00","post_url":"<URL>","hash_sha256":"<hex>"}

1. Aktualizuj RELEASE_NOTES.md (data/godzina/URL).

---

C) Dystrybucja (Pitch) — okna i dowody wysyłki

1. Okno 1 (D-0, 10:30–11:15 CEST): wyślij PITCH_EMAIL_PL oraz PITCH_EMAIL_EN do grup z DISTRIBUTION_LIST (placeholder — bez PII).
2. Okno 2 (D+1, 14:00–14:45 CEST): follow-up tylko do nieotwartych / brak odpowiedzi (dane agregowane, bez PII). I cannot verify this.
3. Paragony wysyłki (DAM, po batchu):
dam://campaigns/launch2025/pr/multi/2025/08/20/SEND_RECEIPT_pitch_<pl|en>.json
Treść:

{"plan_id":"PLAN-PR-20250819-001","batch_id":"<uuid>","sent_at":"<ISO CEST>","messages":{"requested":<n>,"accepted":<n>,"rejected":<n>}}

---

D) Telemetria zdarzeń (PUBLISH/ENGAGE)

1. T+0 (po publikacji):

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"2025-08-20T09:00:30+02:00","type":"PUBLISH","plan_id":"PLAN-PR-20250819-001","channel":"pr","metrics":{"newsroom":1,"press_pl":1,"press_en":1}}

1. T+120 min (11:00–11:10 CEST):

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"2025-08-20T11:05:00+02:00","type":"ENGAGE","plan_id":"PLAN-PR-20250819-001","channel":"pr","metrics":{"newsroom_pageviews":<n>,"avg_time_on_newsroom_s":<n>,"asset_downloads":<n>}}

1. D+3 (2025-08-23, 12:00 CEST):

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"2025-08-23T12:00:00+02:00","type":"ENGAGE","plan_id":"PLAN-PR-20250819-001","channel":"pr","metrics":{"pickup_count":<n>,"ref_domains":<n>,"asset_downloads_total":<n>}}

---

E) Monitoring jakości i reakcji (progi i działania)

SEV-2 (krytyczne): brak OG/JSON-LD/HTTP 200 lub błąd renderu → natychmiastowe przywrócenie wersji roboczej i poprawa (czas reakcji ≤ 6 h).

SEV-3 (użyteczność): avg_time_on_newsroom_s < 90 lub asset_downloads = 0 do T+120 → doprecyzuj lead H1/H2, przesuń CTA wyżej, dodaj wyróżnik „Media kit (3 pliki)”.

SEV-3 (zasięg): pickup_count < 5 do D+3 → przygotuj mikro-update (PL/EN) i dodatkowy pitch do 2–3 tytułów branżowych (agregowane, bez PII).

---

F) Rejestr wzmianek (clippings) — struktura zapisu

Plik: dam://campaigns/launch2025/pr/multi/2025/08/20/CLIPPINGS_press.jsonl
Każda linia (JSON):

{"ts":"<ISO CEST>","outlet":"<name>","lang":"pl|en","url":"<url>","type":"mention|full_story","headline":"<text>","note":"<short>"}

---

G) Checklista zamknięcia ETAPU 6/6 (musi być „TAK”)

Paragony publikacji PUBLISH_RECEIPT_* zapisane (3 szt.).

Telemetria T+0 i T+120 wysłana; D+3 zaplanowane.

Pitch wysłany w oknie 1; paragony SEND_RECEIPT_pitch_* zapisane.

CLIPPINGS_press.jsonl utworzony i gotowy do dopisywania.

RELEASE_NOTES.md zaktualizowane (PR/Newsroom + godzina publikacji).

---

KONIEC KROKU 4/7.
Aby kontynuować, wpisz: „Dalej — KROK 5/7: Paid/Kreatywy (ETAP 1/6)”.

---

📌 Source & Verification of Response

[✓ Verified] — Confirmed via official documentation, code, or direct source.

[Unverified] — Not confirmed; generated output or unsupported by source.

[Inference] — Reasoned deduction based on known context; not a guarantee.→ If a pplicable: include exact filename, line reference, or source URL.

[Speculation] — Hypothesis or estimate; not grounded in verified data.