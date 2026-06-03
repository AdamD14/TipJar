# KROK 2/7 — SEO/Blog — ETAP 2/6: ROUTE → wygeneruj OrchestrationPlan

Cel etapu: utworzyć kompletny OrchestrationPlan dla paczki SEO (2 × evergreen + 1 × landing), aby przejść do EXEC.

---

Wykonaj dokładnie te czynności

1. Utwórz plik:

/tipjar-campaigns/starter-packs/plan.seo.json

1. Wklej poniższą zawartość (bez zmian w strukturze i kluczach):

{
"plan_id": "PLAN-SEO-20250818-001",
"task_id": "MKT-SEO-20250818-001",
"version": "1.0.0",
"created_at": "2025-08-18T15:45:00+01:00",
"owner": "system/orchestrator",
"routing_hint": ["Curator","SEO Writer","Evaluator","Freeze"],
"sla": {
"plan_deadline": "2025-08-19T18:00:00+01:00",
"default_step_timeout_min": 45,
"breach_policy": "ALERT_AND_ESCALATE"
},
"security": {
"pii_scope": "none",
"context_minimization": true,
"redaction_rules_id": "RR-1.0"
},
"guardrails": {
"macros": ["ADAM_BASE","LABELING","BANNED_WORDS","PRIVACY_MIN","OUTPUT_SCHEMA","QA_FOOTER","REJECTION","CHANNEL_RULES","SEO_RULES"],
"glossary_version": "1.0"
},
"owners": [
{"role":"Curator","model":"LLM-A@vX","endpoint":"curator.svc"},
{"role":"SEO Writer","model":"LLM-B@vY","endpoint":"seo.svc"},
{"role":"Evaluator","model":"LLM-C@vZ","endpoint":"eval.svc"},
{"role":"Freeze","model":"system/publisher","endpoint":"freeze.svc"}
],
"artifacts_expected": [
{"id":"BLOG_PL","type":"markdown","locale":"pl","desc":"Evergreen blog 1200–1500 słów"},
{"id":"BLOG_EN","type":"markdown","locale":"en","desc":"Evergreen blog 1200–1500 słów"},
{"id":"LANDING_PL","type":"markdown","locale":"pl","desc":"Landing 600–900 słów"},
{"id":"META_PACK","type":"json","locale":"multi","desc":"title/meta/og"},
{"id":"SCHEMA_PACK","type":"json","locale":"multi","desc":"Article/FAQ schema"},
{"id":"INTERNAL_LINKS","type":"markdown","locale":"multi","desc":"mapa linkowania wewnętrznego"}
],
"steps": [
{
"step_id": "S1",
"role": "Curator",
"type": "CONTEXT_PACK",
"inputs": ["TaskSpec:MKT-SEO-20250818-001"],
"outputs_expected": [{"artifact":"CTX1","type":"md"}],
"deps": [],
"queue": "q.curator",
"priority": 2,
"status": "queued",
"attempts": 0,
"max_attempts": 3,
"timeout_min": 15
},
{
"step_id": "S2",
"role": "SEO Writer",
"type": "GENERATE",
"inputs": ["CTX1","Glossary:v1"],
"outputs_expected": [
{"artifact":"BLOG_PL"},
{"artifact":"BLOG_EN"},
{"artifact":"LANDING_PL"},
{"artifact":"META_PACK"},
{"artifact":"SCHEMA_PACK"},
{"artifact":"INTERNAL_LINKS"}
],
"deps": ["S1"],
"queue": "q.seo",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 60
},
{
"step_id": "S3",
"role": "Evaluator",
"type": "QUALITY_CHECK",
"inputs": ["BLOG_PL","BLOG_EN","LANDING_PL","META_PACK","SCHEMA_PACK","INTERNAL_LINKS","TaskSpec:MKT-SEO-20250818-001","Glossary:v1"],
"outputs_expected": [{"artifact":"QA1","type":"md"}],
"deps": ["S2"],
"queue": "q.evaluator",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 20,
"decision_gate": true
},
{
"step_id": "S4",
"role": "Freeze",
"type": "ARCHIVE_PUBLISH",
"inputs": ["BLOG_PL","BLOG_EN","LANDING_PL","META_PACK","SCHEMA_PACK","INTERNAL_LINKS","QA1"],
"outputs_expected": [{"artifact":"MANIFEST","type":"json"}],
"deps": ["S3"],
"queue": "q.freeze",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 1,
"timeout_min": 10
}
],
"audit": [],
"state": "planned"
}

1. Zapisz plik i uruchom linter JSON — wynik PASS.
2. Kryteria zakończenia etapu (wszystkie „TAK”):

Plik istnieje: /tipjar-campaigns/starter-packs/plan.seo.json.

plan_id/task_id zgodne z taskspec.seo.json.

state = "planned", decision_gate ustawione w S3.

Walidacja JSON PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 3/6: EXEC S1→S2 — [CTX1.md](http://ctx1.md/) + drafty BLOG_PL, BLOG_EN, LANDING_PL, META_PACK, SCHEMA_PACK, INTERNAL_LINKS.

---

📌 Source & Verification of Response

[Unverified] — Plan SEO opracowany wg przyjętych szablonów orkiestracji; brak zewnętrznych źródeł.

[✓ Verified] — Spójny z ADAM-MODE (etykietowanie, słowa ryzykowne, minimalizacja PII, reguły kanałowe, 1 CTA, meta/ALT/UTM).

[Inference] — Kolejki i timeouty są rozsądnymi wartościami startowymi do dopasowania w Twojej infrastrukturze.