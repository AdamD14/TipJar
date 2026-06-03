# KROK 3/7 — E-mail/Outreach — ETAP 4/6: REVIEW (Evaluator) — kontrola paczki + decyzja i patch-hinty

Cel etapu: zweryfikować NEWSLETTER_*, OUTREACH_*, SUBJECTS_PREHEADERS, LINKS_UTM_PACK względem TaskSpec; zapisać raport QA (MD + JSON), wydać decyzję i zaktualizować plan.

---

1. Utwórz raport QA (MD)

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-EMAIL-20250818-001/QA1_report.md

Treść (wklej w całości):

[Unverified]

# QA Report — Evaluator v1 (E-mail/Outreach)

## 1) Zgodność z TaskSpec & CHANNEL_RULES

- NEWSLETTER_PL (≤120 słów, 1 CTA, max 2 linki, opt-out): **PASS**
- NEWSLETTER_EN (≤120 words, 1 CTA, max 2 links, opt-out): **PASS**
- OUTREACH_CREATORS_PL_STEP1 (≤120 słów, 1 CTA, **opt-out**): **FAIL — brak opt-out**
- OUTREACH_CREATORS_PL_STEP2 (≤90 słów, 1 CTA, **opt-out**): **FAIL — brak opt-out**
- OUTREACH_CREATORS_EN_STEP1 (≤120 words, 1 CTA, **opt-out**): **FAIL — missing opt-out**
- OUTREACH_CREATORS_EN_STEP2 (≤90 words, 1 CTA, **opt-out**): **FAIL — missing opt-out**
- OUTREACH_PARTNERS_EN_STEP1 (≤130 words, 1 CTA, **opt-out**): **FAIL — missing opt-out**
- OUTREACH_PARTNERS_EN_STEP2 (≤100 words, 1 CTA, **opt-out**): **FAIL — missing opt-out**
- SUBJECTS_PREHEADERS (subject ≤48, preheader ≤90): **PASS**
- LINKS_UTM_PACK (konsekwentne UTM + unsubscribe placeholder): **PASS**

## 2) ADAM-MODE & higiena

- Zakazane słowa: **0**
- PII: **minimal (placeholdery)**
- 1 CTA / wiadomość: **OK**
- Załączniki: **brak** (wymóg: attachments forbidden) — **OK**
- Obrazy/ALT: **niewymagane** (brak grafik) — **OK**

## 3) Anti-spam & techniczne (deklaratywne)

- SPF/DKIM/DMARC: **I cannot verify this.** (sprawdzenie poza zakresem treści)
- List-Unsubscribe header: **rekomendowane** (nie dotyczy treści, ustawienie systemowe)
- Throttling + mobile preview + test SPAM: **I cannot verify this.**

## 4) Rekomendacje i **patch-hinty (blokujące)**

Dodaj **sekcję opt-out** na końcu KAŻDEJ wiadomości outreach (PL/EN). Proponowany tekst (≤110 znaków PL / ≤110 chars EN):

- PL: `Jeśli nie chcesz dostawać takich wiadomości, wypisz się: {{unsubscribe_url}}`
- EN: `If you prefer not to get these emails, unsubscribe here: {{unsubscribe_url}}`

> Uwaga: po dodaniu opt-out utrzymaj limity długości (≤120/≤90/≤130/≤100 słów).
> 

**Patch-hinty (nieblokujące):**

- Dodaj nagłówek `List-Unsubscribe` (mailto + URL) po stronie nadawcy.
- Przygotuj **plaintext alternate** wersje (dla klientów blokujących HTML).
- Dark-mode preview (kontrast linków).
- Upewnij się, że domena nadawcza jest po **warmiungu** (deliverability).

## 5) Metryki oceny

- ClarityScore: **0.86**
- ComplianceScore: **0.78** (z powodu braku opt-out w outreach)
- ActionabilityScore: **0.84**

## 6) Decyzja

- **revise** (wymagane dodanie opt-out w 6 × OUTREACH)

📌 Source & Verification of Response

- [Unverified] — Ocena dotyczy treści generatywnych; brak zewnętrznych źródeł.

---

1. Utwórz raport QA (JSON) i decyzję skróconą

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-EMAIL-20250818-001/QA1_report.json

{
"schema": "qa.report.v1",
"plan_id": "PLAN-EMAIL-20250818-001",
"step_id": "S3",
"artifacts": [
"NEWSLETTER_PL","NEWSLETTER_EN",
"OUTREACH_CREATORS_PL_STEP1","OUTREACH_CREATORS_PL_STEP2",
"OUTREACH_CREATORS_EN_STEP1","OUTREACH_CREATORS_EN_STEP2",
"OUTREACH_PARTNERS_EN_STEP1","OUTREACH_PARTNERS_EN_STEP2",
"SUBJECTS_PREHEADERS","LINKS_UTM_PACK"
],
"scores": { "clarity": 0.86, "compliance": 0.78, "actionability": 0.84, "channel_rules": 0.80 },
"findings": {
"banned_words": [],
"pii": [],
"opt_out_missing": [
"OUTREACH_CREATORS_PL_STEP1","OUTREACH_CREATORS_PL_STEP2",
"OUTREACH_CREATORS_EN_STEP1","OUTREACH_CREATORS_EN_STEP2",
"OUTREACH_PARTNERS_EN_STEP1","OUTREACH_PARTNERS_EN_STEP2"
],
"subjects_lte_48": true,
"preheaders_lte_90": true,
"links_max_2": true,
"attachments_forbidden": true
},
"recommendations": [
{ "target":"OUTREACH_*", "type":"content-blocking", "desc":"Append opt-out line with {{unsubscribe_url}} at the end." },
{ "target":"MailerConfig", "type":"header", "desc":"Set List-Unsubscribe (mailto + https)." },
{ "target":"All", "type":"render", "desc":"Provide plaintext alternatives." }
],
"decision": "revise",
"timestamp": "2025-08-18T17:05:00+02:00"
}

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-EMAIL-20250818-001/QA1_decision.json

{
"plan_id": "PLAN-EMAIL-20250818-001",
"step_id": "S3",
"decision": "revise",
"blocking_issues": ["Missing opt-out in 6 outreach emails"]
}

---

1. Zaktualizuj plan.email.json (oznacz S3 → done; FREEZE pozostaje zablokowane)

Plik: /tipjar-campaigns/starter-packs/plan.email.json — zastosuj patch:

{
"patches": [
{"op":"replace","path":"/steps/2/status","value":"done"},
{"op":"replace","path":"/steps/2/attempts","value":1},
{"op":"add","path":"/steps/2/produced","value":["QA1"]},
{"op":"replace","path":"/steps/3/status","value":"blocked"},
{"op":"add","path":"/audit/-","value":{"ts":"2025-08-18T17:05:00+02:00","event":"REVIEW_DECISION","detail":"revise: add opt-out to 6 outreach emails"}}
]
}

---

1. Kryteria zakończenia ETAPU 4/6 (musi być „TAK”)

Raporty QA (QA1_report.md, QA1_report.json, QA1_decision.json) istnieją z powyższą treścią.

Decyzja = revise z jednoznacznym wskazaniem brakującego opt-out w 6 wiadomościach.

plan.email.json: S3.status = done, S4.status = blocked, wpis w audit dodany.

---

Aby przejść do ETAPU 5/6 (REVISION + ponowny REVIEW → FREEZE), napisz „Dalej” — przygotuję poprawione treści OUTREACH z opt-out i zaktualizuję Artefakty + Plan.

---

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