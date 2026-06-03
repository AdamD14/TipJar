# KROK 3/7 — E-mail/Outreach — ETAP 3/6: EXEC S1→S2 (Curator → Email Writer) + artefakty draft

KROK 3/7 — E-mail/Outreach — ETAP 3/6: EXEC S1→S2 (Curator → Email Writer) + artefakty draft

Cel etapu: utworzyć [CTX1.md](http://ctx1.md/) oraz drafty: NEWSLETTER_PL, NEWSLETTER_EN, OUTREACH_CREATORS_{PL,EN}*{STEP1,STEP2}, OUTREACH_PARTNERS_EN*{STEP1,STEP2}, SUBJECTS_PREHEADERS.json, LINKS_UTM_PACK.md. Następnie zaktualizować plan do S3: queued.

---

1. Artefakt [CTX1.md](http://ctx1.md/) (≤300 słów)

Ścieżka: /tipjar-campaigns/.artifacts/draft/PLAN-EMAIL-20250818-001/CTX1.md

[Unverified]

# Context Pack — E-mail/Outreach (newsletter + 1:1) — tipjar+

## Cel

Cykliczny newsletter (PL/EN) i krótkie sekwencje 1:1 do twórców oraz partnerów — każda wiadomość z jedną, jasną **CTA**.

## Ramy treści

- Długość: ≤120 słów (newsletter), ≤120/≤90 słów (1:1 step1/step2).
- 1 link z UTM do landing; opcjonalnie link opt-out (systemowy).
- Prosty ton, krótkie zdania, 1 myśl na akapit.

## Zgodność (ADAM-MODE)

- Zakazane słowa: Prevent, Guarantee, Will never, Fixes, Eliminates, Ensures that.
- PII minimalne; dozwolone placeholdery: `{{first_name}}`, `{{company}}`, `{{creator_handle}}`.
- ALT dla grafik (jeśli użyte) ≤120 znaków; brak załączników.

## Technika

- SPF/DKIM/DMARC: włączone; throttling wysyłek; podgląd mobilny; test SPAM; czyszczenie list.

📌 Source & Verification of Response

- [Unverified] — Zestaw wymagań wg wewnętrznych reguł (ADAM-MODE).

---

1. NEWSLETTER_PL (≤120 słów, 1 CTA, max 2 linki — landing + opt-out)

Ścieżka: /tipjar-campaigns/.artifacts/draft/email/pl/2025/08/18/NEWSLETTER_PL_v1.0.0.md

[Unverified]
Cześć!

tipjar+ startuje — prosty sposób na napiwki w USDC dla twórców. Profil, wybór kwoty i potwierdzenie mieszczą się w krótkim, czytelnym przepływie. Jeśli chcesz sprawdzić, jak to wygląda w praktyce, zajmie to chwilę.

CTA: Załóż profil twórcy i zobacz flow: {{link_landing_utm}}

Jeśli nie chcesz dostawać takich wiadomości, wypisz się tutaj: {{unsubscribe_url}}

1. NEWSLETTER_EN (≤120 words, 1 CTA)

Ścieżka: /tipjar-campaigns/.artifacts/draft/email/en/2025/08/18/NEWSLETTER_EN_v1.0.0.md

[Unverified]
Hi,

We’re launching tipjar+ — a simple USDC tipping flow for creators. A short, clear path from fan to tip confirmation. If you’d like to see it in action, it takes just a moment.

CTA: Create your creator profile and try the flow: {{link_landing_utm}}

To stop receiving these emails, unsubscribe here: {{unsubscribe_url}}

---

1. OUTREACH — creators (PL) STEP1 (≤120 słów, 1 CTA)

Ścieżka: /tipjar-campaigns/.artifacts/draft/outreach/creators/pl/2025/08/18/OUTREACH_CREATORS_PL_STEP1_v1.0.0.md

[Unverified]
Cześć {{first_name}},

piszę krótko: w tipjar+ fani mogą postawić napiwek w USDC w kilku dotknięciach. Działa to w prostym przepływie z jasnym potwierdzeniem — wygodne dla twórców i widzów. Jeśli chcesz zobaczyć, jak wygląda profil i przycisk „tip”, tu jest demo.

CTA: Załóż profil i sprawdź flow: {{link_landing_utm}}

1. OUTREACH — creators (PL) STEP2 (follow-up 48h) (≤90 słów)

Ścieżka: /tipjar-campaigns/.artifacts/draft/outreach/creators/pl/2025/08/18/OUTREACH_CREATORS_PL_STEP2_v1.0.0.md

[Unverified]
Cześć {{first_name}},

wracam do tipjar+. Jeśli chcesz, podeślę krótki zrzut/podgląd profilu twórcy i przycisku „tip”. To prosty sposób, by widzowie mogli Cię wesprzeć.

CTA: Tu założysz profil i zobaczysz flow: {{link_landing_utm}}

1. OUTREACH — creators (EN) STEP1 (≤120 words)

Ścieżka: /tipjar-campaigns/.artifacts/draft/outreach/creators/en/2025/08/18/OUTREACH_CREATORS_EN_STEP1_v1.0.0.md

[Unverified]
Hi {{first_name}},

A quick note: with tipjar+, fans can send a USDC tip in a few taps. The flow is short and clear, with a simple confirmation — convenient for both creators and viewers. If you’d like a peek at the profile and the “tip” button, here’s a demo.

CTA: Create your profile and try the flow: {{link_landing_utm}}

1. OUTREACH — creators (EN) STEP2 (follow-up 48h) (≤90 words)

Ścieżka: /tipjar-campaigns/.artifacts/draft/outreach/creators/en/2025/08/18/OUTREACH_CREATORS_EN_STEP2_v1.0.0.md

[Unverified]
Hi {{first_name}},

Circling back on tipjar+. I can share a quick screenshot/walkthrough of the creator profile and “tip” button. It’s a straightforward way for fans to show appreciation.

CTA: Start here: {{link_landing_utm}}

---

1. OUTREACH — partners (EN) STEP1 (≤130 words)

Ścieżka: /tipjar-campaigns/.artifacts/draft/outreach/partners/en/2025/08/18/OUTREACH_PARTNERS_EN_STEP1_v1.0.0.md

[Unverified]
Hi {{first_name}},

Reaching out from tipjar+. We’re enabling a simple USDC tipping flow for creators. We’re exploring light co-marketing with selected partners — concise posts, a short video, and a clear CTA to a creator profile.

If it’s relevant to {{company}}, I can share a one-pager and example assets.

CTA: Quick overview & assets: {{partner_onepager_url}}

1. OUTREACH — partners (EN) STEP2 (follow-up 48h) (≤100 words)

Ścieżka: /tipjar-campaigns/.artifacts/draft/outreach/partners/en/2025/08/18/OUTREACH_PARTNERS_EN_STEP2_v1.0.0.md

[Unverified]
Hi {{first_name}},

Following up on tipjar+ co-marketing. Happy to adapt the asset pack to your channels (copy length, formats, ALT, UTM). Short and clear materials only.

CTA: One-pager & examples here: {{partner_onepager_url}}

---

1. SUBJECTS_PREHEADERS.json (tematy ≤48 znaków; preheader ≤90)

Ścieżka: /tipjar-campaigns/.artifacts/draft/PLAN-EMAIL-20250818-001/SUBJECTS_PREHEADERS_v1.0.0.json

{
"newsletter_pl": {
"subject": "tipjar+ startuje — prosty napiwek w USDC",
"preheader": "Zobacz krótki przepływ: profil → kwota → potwierdzenie."
},
"newsletter_en": {
"subject": "Launching tipjar+ — simple USDC tipping",
"preheader": "A short, clear path from fan to confirmation."
},
"creators_pl_step1": {
"subject": "{{creator_handle}} — szybki „tip” w USDC",
"preheader": "Krótki przepływ i jasne potwierdzenie — zobacz demo."
},
"creators_pl_step2": {
"subject": "Daj znać, czy podejrzeć profil tipjar+",
"preheader": "Mogę wysłać krótki podgląd przycisku „tip”."
},
"creators_en_step1": {
"subject": "{{creator_handle}} — quick USDC tip",
"preheader": "Short, clear flow with simple confirmation."
},
"creators_en_step2": {
"subject": "Should I send a quick profile preview?",
"preheader": "A brief look at the “tip” button and flow."
},
"partners_en_step1": {
"subject": "Co-marketing idea: tipjar+ x {{company}}",
"preheader": "Short copy, clear CTA, lightweight asset pack."
},
"partners_en_step2": {
"subject": "Follow-up on tipjar+ co-marketing",
"preheader": "We can tailor copy/ALT/UTM to your channels."
}
}

---

1. LINKS_UTM_PACK.md (landing/help z UTM)

Ścieżka: /tipjar-campaigns/.artifacts/draft/PLAN-EMAIL-20250818-001/LINKS_UTM_PACK_v1.0.0.md

[Unverified]

# Pakiet linków UTM — E-mail/Outreach

- Landing (newsletter): {{link_landing_utm}}?utm_source=email&utm_medium=newsletter&utm_campaign=launch2025
- Landing (outreach): {{link_landing_utm}}?utm_source=email&utm_medium=outreach&utm_campaign=launch2025
- Help Center: {{link_help_center}}?utm_source=email&utm_medium=newsletter&utm_campaign=launch2025
- Unsubscribe: {{unsubscribe_url}}

---

1. Patch plan.email.json po EXEC (S1 i S2)

Plik: /tipjar-campaigns/starter-packs/plan.email.json

{
"patches": [
{"op":"replace","path":"/steps/0/status","value":"done"},
{"op":"replace","path":"/steps/0/attempts","value":1},
{"op":"add","path":"/steps/0/produced","value":["CTX1"]},

```
{"op":"replace","path":"/steps/1/status","value":"done"},
{"op":"replace","path":"/steps/1/attempts","value":1},
{"op":"add","path":"/steps/1/produced","value":[
  "NEWSLETTER_PL","NEWSLETTER_EN",
  "OUTREACH_CREATORS_PL_STEP1","OUTREACH_CREATORS_PL_STEP2",
  "OUTREACH_CREATORS_EN_STEP1","OUTREACH_CREATORS_EN_STEP2",
  "OUTREACH_PARTNERS_EN_STEP1","OUTREACH_PARTNERS_EN_STEP2",
  "SUBJECTS_PREHEADERS","LINKS_UTM_PACK"
]},

{"op":"replace","path":"/steps/2/status","value":"queued"}

```

]
}

---

1. Kryteria zakończenia ETAPU 3/6 (musi być „TAK”)

CTX1 oraz wszystkie artefakty E-mail/Outreach istnieją w ścieżkach draft i zawierają powyższą treść.

plan.email.json: S1.status=done, S2.status=done, S3.status=queued.

Każdy e-mail ma 1 CTA, max 2 linki (landing + opt-out), 0 słów zakazanych, PII minimalne (placeholdery).

---

Napisz „Dalej”, a przejdę do ETAPU 4/6: REVIEW (Evaluator) — raport QA + decyzja i patch-hinty dla paczki E-mail/Outreach.

---

📌 Source & Verification of Response

[Unverified] — Treści i artefakty powstały wg wewnętrznych wytycznych; brak źródeł zewnętrznych.

[✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, 1 CTA, brak słów ryzykownych, minimalizacja PII, UTM, brak załączników.

[Inference] — Długości/limity pod kątem deliverability i czytelności są wartościami startowymi do kalibracji.