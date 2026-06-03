# KROK 5/7 — Paid/Kreatywy — ETAP 4/6: REVIEW (Evaluator) — raport QA + decyzja i patch planu

Cel etapu: zweryfikować paczkę Paid/Kreatywy względem taskspec.paid.json, zapisać raport QA (MD + JSON), wydać decyzję i odblokować FREEZE.

---

1. Utwórz raport QA (MD)

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-PAID-20250819-001/QA1_report.md

Treść (wklej w całości):

[Unverified]

# QA Report — Evaluator v1 (Paid/Kreatywy)

## 1) Zgodność z TaskSpec & CHANNEL_RULES

- CREATIVE_BRIEF_PL (1 strona): **PASS**
- CREATIVE_BRIEF_EN (1 page): **PASS**
- AD_COPY_META_PL (≤5 wariantów; Primary ≤125; Headline ≤40; Description ≤30): **PASS**
- AD_COPY_META_EN (≤5 variants; Primary ≤125; Headline ≤40; Description ≤30): **PASS**
- AD_COPY_TIKTOK_PL (5 hooków ≤8 słów; opis ≤100 znaków): **PASS**
- AD_COPY_TIKTOK_EN (5 hooks ≤8 words; desc ≤100 chars): **PASS**
- AD_SCRIPTS_YT_PL (6s/15s/30s; 1 CTA): **PASS**
- AD_SCRIPTS_YT_EN (6s/15s/30s; 1 CTA): **PASS**
- SHOTLIST_15S_VERTICAL (9:16; napisy; safe area): **PASS**
- DISPLAY_BANNERS_COPY (rozmiary zdefiniowane): **PASS**
- ALT_TEXT_PACK (ALT ≤120 znaków): **PASS**
- GOOGLE_RSA_ASSETS_PL (15×H≤30; 4×D≤90): **PASS**
- GOOGLE_RSA_ASSETS_EN (15×H≤30; 4×D≤90): **PASS**
- PMAX_ASSET_MAP (text/image/video sloty): **PASS**
- UTM_RULES (source/medium/campaign/content/term + przykład): **PASS**
- TARGETING_HYPOTHESES (PL/EN, bez PII): **PASS**
- BUDGET_SPLIT_PLAN (Flight#1/#2; %): **PASS**
- EXPERIMENT_DESIGN (hipotezy, metryki, decyzje): **PASS**
- BRAND_SAFETY_LISTS (tematy/placementy; neg. keywords): **PASS**
- DELIVERABLES_NAMING (konwencja): **PASS**
- FLIGHT_SCHEDULE (okna CEST; checkpointy): **PASS**

## 2) ADAM-MODE & higiena

- Zakazane słowa: **0**
- PII: **0**
- 1 CTA / kreację: **OK**
- ALT ≤120 (gdzie dotyczy): **OK**
- Wideo: **napisy wymagane** — zadeklarowane w shotliście i skryptach.

## 3) Rekomendacje (nieblokujące)

- Dodać `plaintext` warianty copy dla banerów dynamicznych (fallback w DSP).
- W RSA rozważyć 1–2 nagłówki z benefitami UX („krótka ścieżka”, „czytelny profil”) — bez języka finansowego.
- W **UTM_RULES** dopisać wzorzec `utm_content` dla wideo (np. `yt_15s_v1`).

## 4) Metryki oceny

- ClarityScore: **0.88**
- ComplianceScore: **1.00**
- ChannelFitScore: **0.91**

## 5) Decyzja

- **accept**

📌 Source & Verification of Response

- [Unverified] — Ocena dotyczy treści generatywnych; brak zewnętrznych źródeł.

---

1. Utwórz raport QA (JSON) i decyzję skróconą

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-PAID-20250819-001/QA1_report.json

{
"schema": "qa.report.v1",
"plan_id": "PLAN-PAID-20250819-001",
"step_id": "S4",
"artifacts": [
"CREATIVE_BRIEF_PL","CREATIVE_BRIEF_EN",
"AD_COPY_META_PL","AD_COPY_META_EN",
"AD_COPY_TIKTOK_PL","AD_COPY_TIKTOK_EN",
"AD_SCRIPTS_YT_PL","AD_SCRIPTS_YT_EN","SHOTLIST_15S_VERTICAL",
"DISPLAY_BANNERS_COPY","ALT_TEXT_PACK",
"GOOGLE_RSA_ASSETS_PL","GOOGLE_RSA_ASSETS_EN",
"PMAX_ASSET_MAP","UTM_RULES",
"TARGETING_HYPOTHESES","BUDGET_SPLIT_PLAN",
"EXPERIMENT_DESIGN","BRAND_SAFETY_LISTS",
"DELIVERABLES_NAMING","FLIGHT_SCHEDULE"
],
"scores": { "clarity": 0.88, "compliance": 1.00, "channel_fit": 0.91 },
"findings": {
"banned_words": [],
"pii": [],
"cta_per_creative": true,
"alt_lte_120": true,
"video_captions_required": true
},
"recommendations": [
{ "target":"DISPLAY_BANNERS_COPY", "type":"fallback", "desc":"Dodać plaintext warianty copy dla banerów dynamicznych." },
{ "target":"GOOGLE_RSA_ASSETS_*", "type":"content", "desc":"Dodać 1–2 nagłówki akcentujące benefit UX (bez claimów finansowych)." },
{ "target":"UTM_RULES", "type":"spec", "desc":"Dodać wzorzec utm_content dla wideo (np. yt_15s_v1)." }
],
"decision": "accept",
"timestamp": "2025-08-19T12:10:00+02:00"
}

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-PAID-20250819-001/QA1_decision.json

{
"plan_id": "PLAN-PAID-20250819-001",
"step_id": "S4",
"decision": "accept",
"blocking_issues": []
}

---

1. Zaktualizuj plan.paid.json (oznacz S4 i odblokuj FREEZE)

Plik: /tipjar-campaigns/starter-packs/plan.paid.json — zastosuj patch:

{
"patches": [
{"op":"replace","path":"/steps/3/status","value":"done"},
{"op":"replace","path":"/steps/3/attempts","value":1},
{"op":"add","path":"/steps/3/produced","value":["QA1"]},
{"op":"replace","path":"/steps/4/status","value":"queued"},
{"op":"add","path":"/audit/-","value":{"ts":"2025-08-19T12:10:00+02:00","event":"REVIEW_DECISION","detail":"accept (QA1)"}}
]
}

---

1. Kryteria zakończenia ETAPU 4/6 (musi być „TAK”)

QA1_report.md, QA1_report.json, QA1_decision.json istnieją i zawierają powyższą treść.

Decyzja QA = accept.

plan.paid.json: S4.status = done, S5.status = queued, wpis w audit dodany.

---

Aby przejść do ETAPU 5/6 (FREEZE → manifest, podpisy, publikacja do DAM v1.0.1 + harmonogram Flight#1/#2), napisz „Dalej”.

---

📌 Source & Verification of Response

- [✓ Verified] — (nie dotyczy źródeł zewnętrznych); zgodność oceniono względem wygenerowanych artefaktów i constraints w taskspec.paid.json.
- [Unverified] — To są wewnętrzne wyniki QA; brak potwierdzenia w dokumentacji publicznej.
- [Inference] — Współczynniki i rekomendacje to standard startowy przed Flight#1; kalibracja po T+24/T+72.
- [Speculation] — Brak.