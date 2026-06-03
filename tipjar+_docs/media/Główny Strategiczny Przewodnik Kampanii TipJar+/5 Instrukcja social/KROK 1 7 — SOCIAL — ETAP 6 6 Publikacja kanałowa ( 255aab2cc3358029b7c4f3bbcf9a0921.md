# KROK 1/7 — SOCIAL — ETAP 6/6: Publikacja kanałowa (X / LinkedIn / IG / YouTube Community) + telemetria

Cel etapu: opublikować zaakceptowane artefakty SOC_* w kanałach, z poprawnym ALT/UTM, zgodnie z ADAM-MODE. Strefa czasu: Europe/London (BST).

---

1. Przygotuj pliki i treści (z FREEZE v1.0.1)

Teksty: SOC_X_PL, SOC_LI_BRAND_PL, SOC_LI_CEO_EN, SOC_IG_PL, SOC_YT_COMM_PL.

ALT: SOC_ALT_PL_pack.

Grafiki/KV: paczka z KROKU 4/7 (dobierz wariant Trust/Speed/Global do posta).

---

1. X (post marki — PL)

2.1 Wklej treść z SOC_X_PL.
2.2 Dodaj grafikę + ALT z SOC_ALT_PL_pack (np. ALT_1).
2.3 Nie dodawaj linku w treści. Opublikuj dzisiaj 18:30 BST.
2.4 Od razu dodaj i przypnij pierwszą odpowiedź z UTM:

[Unverified] ➜ [https://tipjar.plus/?utm_source=x&utm_medium=tweet&utm_campaign=launch2025](https://tipjar.plus/?utm_source=x&utm_medium=tweet&utm_campaign=launch2025)
FAQ: [https://tipjar.plus/help?utm_source=x&utm_medium=tweet&utm_campaign=launch2025](https://tipjar.plus/help?utm_source=x&utm_medium=tweet&utm_campaign=launch2025)

2.5 Zapisz paragon do DAM:
dam://campaigns/launch2025/social/pl/2025/08/18/PUBLISH_RECEIPT_x_SOC_X_PL.json
Treść (uzupełnij post_url, caption_hash_sha256):

{"platform":"x","plan_id":"PLAN-SOCIAL-20250818-001","published_at":"{{ISO BST}}","post_url":"{{URL}}","caption_hash_sha256":"{{hex}}","alt_ids":["ALT_1"],"comment_pinned":true}

---

1. LinkedIn — marka (PL)

3.1 Konto marki → wklej SOC_LI_BRAND_PL.
3.2 Grafika + ALT (ALT_4 lub square).
3.3 Link UTM już w treści (sprawdź render). Slot dzisiaj 12:00 BST.
3.4 Paragon DAM:
dam://campaigns/launch2025/social/pl/2025/08/18/PUBLISH_RECEIPT_linkedin_brand_SOC_LI_BRAND_PL.json

---

1. LinkedIn — CEO (EN)

4.1 Konto CEO → wklej SOC_LI_CEO_EN.
4.2 Grafika + ALT (square). Slot dzisiaj 12:15 BST.
4.3 Paragon DAM:
dam://campaigns/launch2025/social/en/2025/08/18/PUBLISH_RECEIPT_linkedin_ceo_SOC_LI_CEO_EN.json

---

1. Instagram (PL)

5.1 Wklej SOC_IG_PL jako opis (feed lub Reel opis).
5.2 Upewnij się, że link w bio to:

[https://tipjar.plus/?utm_source=instagram&utm_medium=bio&utm_campaign=launch2025](https://tipjar.plus/?utm_source=instagram&utm_medium=bio&utm_campaign=launch2025)

5.3 Grafika/cover + ALT (ALT_2 lub portrait). Slot dzisiaj 20:00 BST.
5.4 Paragon DAM:
dam://campaigns/launch2025/social/pl/2025/08/18/PUBLISH_RECEIPT_instagram_SOC_IG_PL.json

---

1. YouTube Community (PL)

6.1 Na kanale marki → wklej SOC_YT_COMM_PL.
6.2 Dodaj link UTM z posta. Slot jutro 13:00 BST.
6.3 Paragon DAM:
dam://campaigns/launch2025/social/pl/2025/08/18/PUBLISH_RECEIPT_youtube_community_SOC_YT_COMM_PL.json

---

1. Checklista „PRZED publikacją” (PASS/FAIL)
- [ ]  Każdy post ma 1 CTA, ≤ 2 hashtagi, brak słów ryzykownych.
- [ ]  ALT dodane do każdej grafiki (≤ 120 znaków, zgodne z obrazem).
- [ ]  UTM w LI/YT (w treści), X (w odpowiedzi przypiętej), IG (w bio).
- [ ]  Sloty ustawione: X 18:30, LI 12:00/12:15, IG 20:00 (BST), YT Comm 13:00 (jutro).
- [ ]  Grafiki zgodne z variantem KV i rozmiarem kanału.

---

1. Telemetria (T+0 / T+30 / T+120 min)

Zapisz zdarzenia do events_raw (tipjar.telemetry.v1)

PUBLISH (T+0):

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"{{ISO BST}}","type":"PUBLISH","plan_id":"PLAN-SOCIAL-20250818-001","channel":"social","platform":"x|linkedin_brand|linkedin_ceo|instagram|youtube_community","locale":"pl|en","metrics":{"post_url":"{{URL}}"}}

ENGAGE (T+30 / T+120):

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"{{ISO BST}}","type":"ENGAGE","plan_id":"PLAN-SOCIAL-20250818-001","channel":"social","platform":"x|linkedin_brand|linkedin_ceo|instagram|youtube_community","metrics":{"impressions":{{n}},"likes":{{n}},"comments":{{n}},"shares":{{n}},"ctr":{{0.x}}}}

---

1. Moderacja i odpowiedzi (slot on-call)

Reaguj na top-komentarze ≤ 60 min w godzinach dyżuru.

Wątki produktowe → kieruj do Help Center (UTM).

Brak PII w odpowiedziach; 1 CTA max.

---

1. Checklista „PO publikacji” (T+120)
- [ ]  Paragony PUBLISH_RECEIPT_* w DAM dla każdego kanału.
- [ ]  Zdarzenia PUBLISH/ENGAGE (T+0/30/120) zapisane.
- [ ]  CTR ≥ 2.0% (startowy cel), negatywne odchylenia → oznacz SEV-3 i przygotuj A/B (miniatura lub hook lub caption), FREEZE→publish.

---

Napisz „Dalej”, a przejdę do kolejnego obszaru 7-krokowej serii (SEO/Blog), w tym samym trybie krokowym.

---

📌 Source & Verification of Response

[Unverified] — Procedura publikacji i telemetrii oparta na wypracowanym playbooku; brak zewnętrznych źródeł.

[✓ Verified] — Zgodność ADAM-MODE: etykietowanie, 1 CTA, brak słów ryzykownych, minimalizacja PII, ALT/UTM.

[Inference] — Godziny slotów i progi KPI to wartości startowe do kalibracji po pierwszych emisjach.