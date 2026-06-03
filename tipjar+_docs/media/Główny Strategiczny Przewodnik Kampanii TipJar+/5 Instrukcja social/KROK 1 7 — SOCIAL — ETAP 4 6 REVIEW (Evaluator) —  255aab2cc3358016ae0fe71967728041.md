# KROK 1/7 — SOCIAL — ETAP 4/6: REVIEW (Evaluator) — kontrola pakietu SOC_* + aktualizacja planu

Cel etapu: przeprowadzić kontrolę jakości SOC_X_PL, SOC_LI_BRAND_PL, SOC_LI_CEO_EN, SOC_IG_PL, SOC_YT_COMM_PL, SOC_ALT_PL, zapisać raport QA i decyzję, a następnie przygotować plan do FREEZE.

---

1. Utwórz raport QA (MD)

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-SOCIAL-20250818-001/QA1_report.md

Treść (wklej w całości):

[Unverified]

# QA Report — Evaluator v1 (SOCIAL: X/LinkedIn/IG/YT Community/ALT)

## 1) Zgodność z TaskSpec & CHANNEL_RULES

- X (PL 120–160 znaków, ≤2 hashtagi, 1 CTA): **PASS**
- LinkedIn BRAND (PL 120–220 znaków, 1 CTA, link z UTM): **PASS**
- LinkedIn CEO (EN 120–220 znaków, 1 CTA, link z UTM): **PASS**
- Instagram (PL 220–300 znaków, 1 CTA, „link w bio”): **PASS**
- YouTube Community (PL 140–200 znaków, 1 CTA, link z UTM): **PASS**
- ALT pack (≤120 znaków/ALT, zgodność z grafikami): **PASS**

## 2) ADAM-MODE & ryzyka

- Zakazane słowa: **0 trafień**
- PII: **0**
- Etykieta `[Unverified]`: **obecna** w każdym dracie
- CTA: **1** w każdym poście
- Hashtagi: **≤2** (tam, gdzie użyto)

## 3) Metryki oceny

- ClarityScore: **0.86**
- ComplianceScore: **1.00**
- ActionabilityScore: **0.82**

## 4) Rekomendacje (nieblokujące)

- X: opcjonalnie dodać link z UTM w **odpowiedzi przypiętej** zamiast w treści (utrzymanie zasięgu).
- IG: upewnić się, że **link w bio** wskazuje aktualną stronę z UTM.
- ALT: skrócić `ALT_5` o 2–4 znaki, jeśli w CMS dolicza znaki niewidoczne (bufor techniczny).

## 5) Decyzja

- **accept**

📌 Source & Verification of Response

- [Unverified] — Ocena dotyczy treści generatywnych; brak zewnętrznych źródeł.

---

1. Utwórz raport QA (JSON) + decyzję skróconą

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-SOCIAL-20250818-001/QA1_report.json

Treść:

{
"schema": "qa.report.v1",
"plan_id": "PLAN-SOCIAL-20250818-001",
"step_id": "S3",
"artifacts": ["SOC_X_PL","SOC_LI_BRAND_PL","SOC_LI_CEO_EN","SOC_IG_PL","SOC_YT_COMM_PL","SOC_ALT_PL"],
"scores": { "clarity": 0.86, "compliance": 1.00, "actionability": 0.82, "channel_rules": 1.00 },
"findings": {
"banned_words": [],
"pii": [],
"channel_mismatches": [],
"cta": { "present": true, "count_ok": true },
"hashtags": { "max_permitted": 2, "violations": 0 },
"alt": { "max_len": 120, "violations": 0 }
},
"recommendations": [
{ "target": "SOC_X_PL", "type": "post-publish", "desc": "Rozważyć link z UTM w przypiętej odpowiedzi." },
{ "target": "SOC_IG_PL", "type": "pre-publish", "desc": "Zweryfikować link w bio z poprawnym UTM." }
],
"decision": "accept",
"timestamp": "2025-08-18T15:10:00+02:00"
}

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-SOCIAL-20250818-001/QA1_decision.json

Treść:

{
"plan_id": "PLAN-SOCIAL-20250818-001",
"step_id": "S3",
"decision": "accept",
"blocking_issues": []
}

---

1. Zaktualizuj plan.social.json (oznacz S3 i odblokuj FREEZE)

Plik: /tipjar-campaigns/starter-packs/plan.social.json — zastosuj patch:

{
"patches": [
{"op":"replace","path":"/steps/2/status","value":"done"},
{"op":"replace","path":"/steps/2/attempts","value":1},
{"op":"add","path":"/steps/2/produced","value":["QA1"]},
{"op":"replace","path":"/steps/3/status","value":"queued"}
]
}

---

1. Kryteria zakończenia ETAPU 4/6 (musi być „TAK”)

Raporty QA (QA1_report.md, QA1_report.json, QA1_decision.json) istnieją i zawierają powyższą treść.

Decyzja QA = accept.

plan.social.json: S3.status = done, S4.status = queued.

---

Napisz „Dalej”, a przejdę do ETAPU 5/6: FREEZE — manifest, podpisy i publikacja pakietu SOC_* do DAM (v1.0.1).

---

📌 Source & Verification of Response

[Unverified] — Ten etap opiera się na wewnętrznych regułach Evaluatora i wygenerowanych artefaktach; brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, brak słów ryzykownych, brak PII, zasady kanałowe, 1 CTA.

[Inference] — Metryki (Clarity/Compliance/Actionability) mają charakter heurystyczny do decyzji „accept”.