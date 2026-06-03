# KROK 1/7 — SOCIAL — ETAP 2/6: ROUTE → wygeneruj OrchestrationPlan

Cel etapu: utworzyć kompletny OrchestrationPlan dla paczki social, aby przejść do EXEC.

---

Wykonaj dokładnie te czynności

1. Utwórz plik:

/tipjar-campaigns/starter-packs/plan.social.json

1. Wklej poniższą zawartość (bez zmian w strukturze i kluczach):

{
"plan_id": "PLAN-SOCIAL-20250818-001",
"task_id": "MKT-SOCIAL-20250818-001",
"version": "1.0.0",
"created_at": "2025-08-18T14:30:00+02:00",
"owner": "system/orchestrator",
"routing_hint": ["Curator","Copywriter","Evaluator","Freeze"],
"sla": {
"plan_deadline": "2025-08-19T18:00:00+02:00",
"default_step_timeout_min": 30,
"breach_policy": "ALERT_AND_ESCALATE"
},
"security": {
"pii_scope": "none",
"context_minimization": true,
"redaction_rules_id": "RR-1.0"
},
"guardrails": {
"macros": ["ADAM_BASE","LABELING","BANNED_WORDS","PRIVACY_MIN","OUTPUT_SCHEMA","QA_FOOTER","REJECTION","CHANNEL_RULES"],
"glossary_version": "1.0"
},
"owners": [
{"role":"Curator","model":"LLM-A@vX","endpoint":"curator.svc"},
{"role":"Copywriter","model":"LLM-B@vY","endpoint":"copy.svc"},
{"role":"Evaluator","model":"LLM-C@vZ","endpoint":"eval.svc"},
{"role":"Freeze","model":"system/publisher","endpoint":"freeze.svc"}
],
"artifacts_expected": [
{"id":"SOC_X_PL","type":"markdown","channel":"x","locale":"pl","desc":"post X 120–160 znaków"},
{"id":"SOC_LI_BRAND_PL","type":"markdown","channel":"linkedin_brand","locale":"pl","desc":"post LinkedIn marka 120–220 znaków"},
{"id":"SOC_LI_CEO_EN","type":"markdown","channel":"linkedin_ceo","locale":"en","desc":"post LinkedIn CEO 120–220 znaków"},
{"id":"SOC_IG_PL","type":"markdown","channel":"instagram","locale":"pl","desc":"opis IG 220–300 znaków"},
{"id":"SOC_YT_COMM_PL","type":"markdown","channel":"youtube_community","locale":"pl","desc":"post YT Community 140–200 znaków"},
{"id":"SOC_ALT_PL","type":"markdown","channel":"alt_text_pack","locale":"pl","desc":"ALT ≤120 znaków do grafik/KV"}
],
"steps": [
{
"step_id": "S1",
"role": "Curator",
"type": "CONTEXT_PACK",
"inputs": ["TaskSpec:MKT-SOCIAL-20250818-001"],
"outputs_expected": [{"artifact":"CTX1","type":"md"}],
"deps": [],
"queue": "q.curator",
"priority": 2,
"status": "queued",
"attempts": 0,
"max_attempts": 3,
"timeout_min": 10
},
{
"step_id": "S2",
"role": "Copywriter",
"type": "GENERATE",
"inputs": ["CTX1","Glossary:v1"],
"outputs_expected": [
{"artifact":"SOC_X_PL"},
{"artifact":"SOC_LI_BRAND_PL"},
{"artifact":"SOC_LI_CEO_EN"},
{"artifact":"SOC_IG_PL"},
{"artifact":"SOC_YT_COMM_PL"},
{"artifact":"SOC_ALT_PL"}
],
"deps": ["S1"],
"queue": "q.copywriter.social",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 20
},
{
"step_id": "S3",
"role": "Evaluator",
"type": "QUALITY_CHECK",
"inputs": [
"SOC_X_PL","SOC_LI_BRAND_PL","SOC_LI_CEO_EN","SOC_IG_PL","SOC_YT_COMM_PL","SOC_ALT_PL",
"TaskSpec:MKT-SOCIAL-20250818-001","Glossary:v1"
],
"outputs_expected": [{"artifact":"QA1","type":"md"}],
"deps": ["S2"],
"queue": "q.evaluator",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 10,
"decision_gate": true
},
{
"step_id": "S4",
"role": "Freeze",
"type": "ARCHIVE_PUBLISH",
"inputs": ["SOC_X_PL","SOC_LI_BRAND_PL","SOC_LI_CEO_EN","SOC_IG_PL","SOC_YT_COMM_PL","SOC_ALT_PL","QA1"],
"outputs_expected": [{"artifact":"MANIFEST","type":"json"}],
"deps": ["S3"],
"queue": "q.freeze",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 1,
"timeout_min": 5
}
],
"audit": [],
"state": "planned"
}

1. Zapisz plik i uruchom linter JSON — wynik PASS.
2. Kryteria zakończenia etapu (wszystko „TAK”):

Plik istnieje: /tipjar-campaigns/starter-packs/plan.social.json.

plan_id/task_id spójne z taskspec.social.json.

state = "planned", decision_gate ustawione w S3.

Walidacja JSON PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 3/6: EXEC S1→S2 — wygenerowanie [CTX1.md](http://ctx1.md/) i draftów SOC_*.

---

📌 Source & Verification of Response

[Unverified] — Plan SOCIAL opracowany wg przyjętych szablonów orkiestracji w tej kampanii; brak źródeł zewnętrznych.

[✓ Verified] — Zgodność z ADAM-MODE (etykietowanie, słowa ryzykowne, minimalizacja PII, reguły kanałowe, 1 CTA, ALT).

[Inference] — Nazwy kolejek i endpointów są placeholderami do podpięcia w Twojej infrastrukturze.