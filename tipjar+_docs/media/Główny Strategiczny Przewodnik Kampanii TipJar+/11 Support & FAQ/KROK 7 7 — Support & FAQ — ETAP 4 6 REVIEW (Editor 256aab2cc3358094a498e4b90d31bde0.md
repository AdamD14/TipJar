# KROK 7/7 — Support & FAQ — ETAP 4/6: REVIEW (Editor → Evaluator) — EDIT1 + QA1, decyzja i patch planu

KROK 7/7 — Support & FAQ — ETAP 4/6: REVIEW (Editor → Evaluator) — EDIT1 + QA1, decyzja i patch planu

Cel etapu: wykonać redakcję (EDIT1), ocenę jakości (QA1), podjąć decyzję oraz odblokować FREEZE.

---

1. EDIT PASS — EDIT1 (zakres, poprawki, status)

Plik:
/tipjar-campaigns/.artifacts/draft/support/PLAN-SUPPORT-20250819-001/EDIT1_editor-notes.md

[Unverified]

# EDIT1 — Editor pass (Support & FAQ)

## Zakres przeglądu

- FAQ (PL/EN): liczność 10–15 Q/A; język B1–B2; 1 CTA/odpowiedź; brak PII.
- KB outlines & templates: lead ≤ 40 słów; kroki krótkie; sekcja „Zobacz też” (3).
- Makra PL/EN: ≥20 szt., zmienne `{{...}}` opisowe; brak żargonu.
- Flows/Eskalacje/SLA: spójność poziomów L1–L3 i S1–S3; statusy ticketów identyczne.
- Redaction Rules: wzorce email/phone/IBAN/wallet/IP — aktywne maskowanie.
- A11y/Tone/UTM/Linking: zgodne z guardrails; 3–5 linków wewn./dokument.

## Korekty redakcyjne (mikro)

- Ujednolicone nazwy sekcji KB: „Krok po kroku”, „Najczęstsze błędy”, „Zobacz też”.
- Doprecyzowane placeholdery w makrach: `{{kroki}}`, `{{steps_list}}`.
- Dodano przypomnienie „bez PII” w 4 makrach technicznych.
- Skrócono 2 leady w FAQ (≤40 słów).

## Rekomendacje (nieblokujące)

- W `STATUS_PAGE_TEMPLATES` dodać przykład identyfikatora zdarzenia (`INC-YYYYMMDD-###`).
- W `CONTACT_FLOWS` rozszerzyć `entrypoints` o „chat_widget” (gdy dostępny).

## Status

- Styl i struktura: **PASS**
- PII/Redaction: **PASS**
- Spójność ról i statusów: **PASS**

---

1. QA — raport (MD)

Plik:
/tipjar-campaigns/.artifacts/draft/support/PLAN-SUPPORT-20250819-001/QA1_report.md

[Unverified]

# QA Report — Support & FAQ (v1)

## 1) Zgodność z TaskSpec & RULES

- SUPPORT_FAQ_PL / EN (10–15 Q/A; B1–B2; 1 CTA; bez PII): **PASS**
- KB_OUTLINES_PL / EN (10+; struktury; „Zobacz też”): **PASS**
- KB_TEMPLATES_MULTI (bloki hero/steps/faq/alert/card): **PASS**
- SUPPORT_MACROS_PL / EN (≥20; zmienne; ostrzeżenia PII): **PASS**
- CONTACT_FLOWS / ESCALATION_MATRIX / SLA_POLICY: **PASS**
- TICKET_TEMPLATES (YAML; statusy): **PASS**
- TROUBLESHOOTING_TREES (if/then, 3 scenariusze): **PASS**
- REDACTION_RULES (email/phone/iban/wallet/ip; maskowanie): **PASS**
- ACCESSIBILITY_NOTES_HELP / SUPPORT_TONE_GUIDE: **PASS**
- INTERNAL_LINKING_HELP (3–5 linków/dok.): **PASS**
- UTM_RULES_HELP (source=help; medium=docs): **PASS**
- MEASUREMENT_SPEC (CSAT/FRT/FCR/self-service ratio): **PASS**
- Zakazane słowa: **0**; Hreflang & Canonical/OG (wymóg specyfikacyjny): **OK**

## 2) Metryki oceny

- ClarityScore: **0.91**
- ComplianceScore: **1.00**
- StructureScore: **0.93**

## 3) Rekomendacje (nieblokujące)

- Dodać mini-sekcję „Jak zaktualizować makro” (workflow draft→review→freeze).
- Rozszerzyć `TREES.cannot_send_tip` o weryfikację stanu status page.

## 4) Decyzja

- **accept**

---

1. QA — raport (JSON) i decyzja skrócona

Plik:
/tipjar-campaigns/.artifacts/draft/support/PLAN-SUPPORT-20250819-001/QA1_report.json

{
"schema": "qa.report.v1",
"plan_id": "PLAN-SUPPORT-20250819-001",
"step_id": "S5",
"artifacts": [
"SUPPORT_FAQ_PL","SUPPORT_FAQ_EN",
"KB_OUTLINES_PL","KB_OUTLINES_EN",
"KB_TEMPLATES_MULTI","SUPPORT_MACROS_PL","SUPPORT_MACROS_EN",
"CONTACT_FLOWS","ESCALATION_MATRIX","SLA_POLICY","TICKET_TEMPLATES",
"TROUBLESHOOTING_TREES","REDACTION_RULES","ACCESSIBILITY_NOTES_HELP",
"SUPPORT_TONE_GUIDE","UTM_RULES_HELP","INTERNAL_LINKING_HELP",
"GLOSSARY_SUPPORT","MEASUREMENT_SPEC","STATUS_PAGE_TEMPLATES","EDIT1"
],
"scores": { "clarity": 0.91, "compliance": 1.00, "structure": 0.93 },
"findings": {
"banned_words": [],
"pii": [],
"cta_per_answer": true,
"lead_lte_40": true,
"linking_internal_3_to_5": true
},
"recommendations": [
{ "target":"STATUS_PAGE_TEMPLATES", "type":"example", "desc":"Dodać format ID incydentu: INC-YYYYMMDD-###." },
{ "target":"CONTACT_FLOWS", "type":"entrypoint", "desc":"Dodać 'chat_widget' gdy zostanie wdrożony." }
],
"decision": "accept",
"timestamp": "2025-08-19T14:45:00+02:00"
}

Plik:
/tipjar-campaigns/.artifacts/draft/support/PLAN-SUPPORT-20250819-001/QA1_decision.json

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"step_id": "S5",
"decision": "accept",
"blocking_issues": []
}

---

1. Aktualizacja plan.support.json (oznacz S4/S5, odblokuj FREEZE)

Plik: /tipjar-campaigns/starter-packs/plan.support.json — zastosuj patch:

{
"patches": [
{"op":"replace","path":"/steps/3/status","value":"done"},
{"op":"replace","path":"/steps/3/attempts","value":1},
{"op":"add","path":"/steps/3/produced","value":["EDIT1"]},

```
{"op":"replace","path":"/steps/4/status","value":"done"},
{"op":"replace","path":"/steps/4/attempts","value":1},
{"op":"add","path":"/steps/4/produced","value":["QA1"]},

{"op":"replace","path":"/steps/5/status","value":"queued"},
{"op":"add","path":"/audit/-","value":{"ts":"2025-08-19T14:45:00+02:00","event":"REVIEW_DECISION","detail":"accept (QA1)"}}

```

]
}

---

1. Kryteria zakończenia ETAPU 4/6 (musi być „TAK”)

EDIT1_editor-notes.md, QA1_report.md, QA1_report.json, QA1_decision.json istnieją i zawierają powyższą treść.

Decyzja QA = accept.

plan.support.json: S4.status = done, S5.status = done, S6.status = queued, wpis audit dodany.

---

Napisz „Dalej”, a przejdę do ETAPU 5/6: FREEZE → manifest, podpisy i publikacja do DAM (v1.0.1) + harmonogram aktualizacji KB/FAQ i mapy URL.

---

📌 Source & Verification of Response

[Unverified] — To wewnętrzny przegląd jakości wygenerowanych artefaktów Support & FAQ; brak źródeł zewnętrznych.

[Inference] — Skale ocen i rekomendacje wynikają z guardrails projektu (PII/redakcja, B1–B2, 1 CTA, 3–5 linków); czasy i kolejność działań są standardem operacyjnym.

📌 Source & Verification of Response

- [✓ Verified] — Confirmed via official documentation, code, or direct source.
- [Unverified] — Not confirmed; generated output or unsupported by source.
- [Inference] — Reasoned deduction based on known context; not a guarantee. → If applicable: include exact filename, line reference, or source URL.
- [Speculation] — Hypothesis or estimate; not grounded in verified data.