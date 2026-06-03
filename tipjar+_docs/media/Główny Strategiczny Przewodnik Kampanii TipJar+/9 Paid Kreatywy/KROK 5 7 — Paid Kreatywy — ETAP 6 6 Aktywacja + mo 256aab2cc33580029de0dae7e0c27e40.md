# KROK 5/7 — Paid/Kreatywy — ETAP 6/6: Aktywacja + monitoring T+24/T+72/D+7 (gating decyzji i rotacja budżetu)

Cel etapu: uruchomić Flight#1 i przygotować Flight#2, zapisać paragony aktywacji, włączyć telemetrię, zastosować progi decyzyjne (gating) oraz rotować budżet/kreatywy zgodnie z wynikami. Strefa czasu: Europe/Brussels (CEST).

---

A) Pre-flight „-60 do -10 min” — kontrola PASS/FAIL

1. Budżety i limity: dzienne limity per kanał zgodnie z BUDGET_SPLIT_PLAN_v1.0.1.json; limit konta ≤ 1.2× dziennego.
2. Struktura i nazwy: tipjarplus_{channel}*{locale}*{size|len}*{variant}*{date} (zgodnie z DELIVERABLES_NAMING).
3. Kreatywy: wideo z napisami, obrazy z ALT (≤120), kontrast AA.
4. Linki: każdy URL z UTM wg UTM_RULES; 1 CTA/kreacja.
5. Brand safety: zastosowane listy wykluczeń/placementy/słowa negatywne (BRAND_SAFETY_LISTS).
6. Polityki platform: brak roszczeń finansowych, język opisowy dot. USDC.
7. Mierzenie: podstawowe eventy kampanijne (agregaty) gotowe do wysyłki — bez PII. I do not have access to that information.

---

B) Aktywacja Flight #1 (2025-08-20 11:30 CEST) — sekwencja i paragony

1. Meta (35%)

Włącz: 9:16 (15s, napisy), 1:1/4:5 statyczne, copy W1–W5.

Paragon:
dam://campaigns/launch2025/paid/meta/2025/08/20/ACTIVATE_RECEIPT_meta_F1.json

{"plan_id":"PLAN-PAID-20250819-001","activated_at":"2025-08-20T11:30:00+02:00","flight":"F1","batch_id":"<uuid>","artifacts":["AD_COPY_META_PL","AD_COPY_META_EN","DISPLAY_BANNERS_COPY","ALT_TEXT_PACK"]}

1. TikTok (25%)

Włącz: 15s 9:16 (napisy); hooki 1–5.

Paragon: .../ACTIVATE_RECEIPT_tiktok_F1.json (analogicznie).

1. YouTube (20%)

Włącz: 6s bumper + 15s skippable (napisy).

Paragon: .../ACTIVATE_RECEIPT_youtube_F1.json.

1. Google (15%)

Włącz: RSA (PL/EN) + PMAX (tekst/obraz/wideo) wg PMAX_ASSET_MAP.

Paragon: .../ACTIVATE_RECEIPT_google_F1.json.

1. Display (5%)

Włącz: 1200×628, 1080×1080, 1080×1920, 300×250/600, 160×600, 728×90.

Paragon: .../ACTIVATE_RECEIPT_display_F1.json.

> Po włączeniu kanału wyślij telemetrię T+0 (przykłady w sekcji D).
> 

---

C) Gating decyzji i rotacja — T+24 / T+72 / D+7

Progi startowe (do kalibracji operacyjnej):

Okno	Kanał	Próg minimalny	Decyzja

T+24	Meta/TikTok	CTR ≥ 1.2%	<1.2% → wyłącz dolne 30% wariantów; włącz najlepszy nagłówek/kreację do +20% budżetu
T+24	YouTube 15s	VTR(15s) ≥ 20%	<20% → przenieś budżet do 6s; zoptymalizuj miniaturę/tytuł
T+24	RSA	QS/Engage trend ↑	brak trendu ↑ → swap 2 nagłówków wg rekomendacji QA1
T+72	Meta/TikTok	CTR ≥ 2.0%	<2.0% → rotacja copy (W1↔W4), test nowej miniatury; przesuń +15% budżetu do top kreacji
T+72	YouTube 6s vs 15s	VTR(6s) ≥ 25%	zwycięzca → 70% puli YT
D+7	Wszystkie	CVR→profil trend ↑	trend ↓ → przygotuj poprawkę CTA/miniatur i mikro-update copy

> Guardrails: 1 CTA, brak słów zakazanych, ALT/napisy obowiązkowe, wykluczenia z BRAND_SAFETY_LISTS.
> 

---

D) Telemetria — zdarzenia i format (agregaty, bez PII)

T+0 (po aktywacji kanału)

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"2025-08-20T11:30:30+02:00","type":"PUBLISH","plan_id":"PLAN-PAID-20250819-001","channel":"meta","metrics":{"campaigns":1,"adsets":<n>,"ads":<n>}}

T+24 / T+72 / D+7 (na kanał)

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"<ISO CEST>","type":"ENGAGE","plan_id":"PLAN-PAID-20250819-001","channel":"tiktok","metrics":{"impressions":<n>,"clicks":<n>,"ctr":0.x,"spend":<amt>,"cpc":<amt>,"vtr_3s":0.x,"vtr_6s":0.x,"cvr_profile":0.x}}

Notatka: ten sam schemat dla youtube/google/display, metryki dopasowane do kanału (np. CPV, QS trend, viewability).

---

E) Flight #2 (2025-08-26 10:00 CEST) — zasady podmian

1. Zmieniaj jedną zmienną na raz (nagłówek lub kreacja lub miniatura).
2. Przenieś 15–30% budżetu do zwycięzców Flight#1 (na podstawie T+72).
3. Dla RSA dodaj 1–2 nagłówki akcentujące benefit UX (zgodnie z rekomendacją QA1).
4. Utrzymuj spójność UTM i nazewnictwa (DELIVERABLES_NAMING).
5. Zapisz paragony aktywacji: .../ACTIVATE_RECEIPT_<channel>_F2.json.

---

F) SEV i odzyskiwanie

SEV-2 (krytyczne): overspend > +10% dnia lub naruszenie zasad platformy → pauza całego kanału; przegląd kreatyw/wykluczeń; restart w ≤ 6 h.

SEV-3 (użyteczność): CTR < 1.0% (Meta/TikTok) lub VTR(15s) < 15% (YT) → kill list bottom 30%, szybka podmiana miniatur/otwarcia.

Capping & częstotliwość: preferuj freq-cap 1–2/dzień (Display/PMAX gdy dostępne).

---

G) Release notes i archiwizacja

1. Dopisz do RELEASE_NOTES.md czas startu kanałów (F1) i wyniki gatingu T+24/T+72.
2. Po D+7 wyeksportuj zwycięzców do paczki v1.1.0 (freeze) i zarchiwizuj warianty przegrane (_retired/).
3. Zapisz diffy copy (co zmieniono i kiedy) – plik CHANGELOG_paid.md.

---

H) Checklista zamknięcia etapu (musi być „TAK”)

- [ ]  Wszystkie kanały F1 aktywne; 5× ACTIVATE_RECEIPT_*_F1.json zapisane.
- [ ]  Telemetria T+0 wysłana dla każdego kanału.
- [ ]  Gating T+24 wykonany; decyzje i rotacje budżetu zapisane w dzienniku.
- [ ]  Gating T+72 wykonany; YouTube zwycięzca ustawiony na ≥70% puli YT.
- [ ]  Harmonogram F2 przygotowany; paragony aktywacji F2 (po starcie) zapisane.
- [ ]  RELEASE_NOTES.md i CHANGELOG_paid.md zaktualizowane.

---

KONIEC KROKU 5/7.
Aby kontynuować, wpisz: „Dalej — KROK 6/7: SEO/Blog (ETAP 1/6)”.

---

📌 Source & Verification of Response

[Unverified] — Procedury aktywacji i gatingu oparte na wewnętrznych artefaktach tej kampanii (plan, briefy, QA1) i standardach operacyjnych; brak źródeł zewnętrznych.

[✓ Verified] — Spójność z ADAM-MODE: 1 CTA, brak słów zakazanych, ALT/napisy, UTM, brand safety, brak PII.

[Inference] — Progi T+24/T+72 i rotacje budżetu to ustawienia startowe; będą kalibrowane po pierwszych odczytach.

📌 Source & Verification of Response

- [✓ Verified] — Confirmed via official documentation, code, or direct source.
- [Unverified] — Not confirmed; generated output or unsupported by source.
- [Inference] — Reasoned deduction based on known context; not a guarantee.→ If
a
p
plic
a
ble: in
clu
d
e
e
x
a
c
t
file
n
a
m
e, lin
e
r
e
f
e
r
e
n
c
e, o
r
s
o
u
r
c
e
U
R
L.
- [Speculation] — Hypothesis or estimate; not grounded in verified data.