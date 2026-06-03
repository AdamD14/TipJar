# KROK 3/10 — PRZEBIEG „NA ŻYWO” (VIDEO) — ETAP 2/6: ROUTE → wygeneruj OrchestrationPlan

Cel etapu: utworzyć kompletny OrchestrationPlan dla zadania VIDEO (na bazie taskspec.video.json), aby przejść do EXEC.

---

Wykonaj dokładnie te czynności

1. Utwórz plik:

/tipjar-campaigns/starter-packs/plan.video.json

1. Wklej poniższą zawartość (JSON bez zmian struktury):

{
"plan_id": "PLAN-VIDEO-20250818-001",
"task_id": "MKT-VIDEO-20250818-001",
"version": "1.0.0",
"created_at": "2025-08-18T12:30:00+02:00",
"owner": "system/orchestrator",
"routing_hint": ["Curator", "Scenarzysta", "Evaluator", "Freeze"],
"sla": {
"plan_deadline": "2025-08-19T17:00:00+02:00",
"default_step_timeout_min": 30,
"breach_policy": "ALERT_AND_ESCALATE"
},
"security": {
"pii_scope": "none",
"context_minimization": true,
"redaction_rules_id": "RR-1.0"
},
"guardrails": {
"macros": ["ADAM_BASE","LABELING","BANNED_WORDS","PRIVACY_MIN","OUTPUT_SCHEMA","QA_FOOTER","REJECTION"],
"glossary_version": "1.0"
},
"owners": [
{"role":"Curator","model":"LLM-A@vX","endpoint":"curator.svc"},
{"role":"Scenarzysta","model":"LLM-B@vY","endpoint":"script.svc"},
{"role":"Evaluator","model":"LLM-C@vZ","endpoint":"eval.svc"},
{"role":"Freeze","model":"system/publisher","endpoint":"freeze.svc"}
],
"artifacts_expected": [
{"id":"V1_SCRIPT","type":"markdown","locale":"pl","desc":"script + cut-sheet"},
{"id":"V1_SRT","type":"file","format":"srt","locale":"pl","desc":"napisy 30–35 s"}
],
"steps": [
{
"step_id": "S1",
"role": "Curator",
"type": "CONTEXT_PACK",
"inputs": ["TaskSpec:MKT-VIDEO-20250818-001"],
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
"role": "Scenarzysta",
"type": "GENERATE",
"inputs": ["CTX1","Glossary:v1"],
"outputs_expected": [{"artifact":"V1_SCRIPT"},{"artifact":"V1_SRT"}],
"deps": ["S1"],
"queue": "q.scenarzysta",
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
"inputs": ["V1_SCRIPT","V1_SRT","TaskSpec:MKT-VIDEO-20250818-001","Glossary:v1"],
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
"inputs": ["V1_SCRIPT","V1_SRT","QA1"],
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
2. Kryteria zakończenia etapu (wszystkie „TAK”):

Plik istnieje: /tipjar-campaigns/starter-packs/plan.video.json.

plan_id/task_id zgodne z taskspec.video.json.

state = "planned", decision_gate ustawione w S3.

Walidacja JSON PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 3/6: EXEC S1→S2 — wygenerowanie [CTX1.md](http://ctx1.md/), V1_SCRIPT.md i V1_SRT.srt (draft).

---

📌 Source & Verification of Response

[Unverified] — Plan VIDEO opracowany na bazie przyjętych szablonów orkiestracji; brak zewnętrznych źródeł.

[✓ Verified] — Spójność z ADAM-MODE (etykiety, słowa ryzyka, minimalizacja PII) i z krokami dot. ROUTE/EXEC/REVIEW/FREEZE.

[Inference] — Wartości owners[].model/endpoint są placeholderami wdrożeniowymi do podpięcia w Twojej infrastrukturze.