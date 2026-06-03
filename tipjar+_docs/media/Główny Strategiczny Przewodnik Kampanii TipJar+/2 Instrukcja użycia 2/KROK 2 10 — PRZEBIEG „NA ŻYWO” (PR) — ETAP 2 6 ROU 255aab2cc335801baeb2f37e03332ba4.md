# KROK 2/10 — PRZEBIEG „NA ŻYWO” (PR) — ETAP 2/6: ROUTE → wygeneruj OrchestrationPlan z TaskSpec

Cel etapu: utworzyć kompletny plik OrchestrationPlan dla zadania PR (na podstawie taskspec.pr.json), aby móc wykonać kolejne kroki (EXEC → REVIEW → FREEZE).

---

Co dokładnie masz zrobić (precyzyjnie)

1. Utwórz plik:

/tipjar-campaigns/starter-packs/plan.pr.json

1. Wklej dokładnie tę zawartość (zachowaj format JSON):

{
"plan_id": "PLAN-PR-20250818-001",
"task_id": "MKT-PR-20250818-001",
"version": "1.0.0",
"created_at": "2025-08-18T10:00:00+02:00",
"owner": "system/orchestrator",
"routing_hint": ["Curator", "Copywriter", "Lokalizator", "Evaluator", "Freeze"],
"sla": {
"plan_deadline": "2025-08-19T12:00:00+02:00",
"default_step_timeout_min": 30,
"breach_policy": "ALERT_AND_ESCALATE"
},
"security": {
"pii_scope": "none",
"context_minimization": true,
"redaction_rules_id": "RR-1.0"
},
"guardrails": {
"macros": ["ADAM_BASE", "LABELING", "BANNED_WORDS", "PRIVACY_MIN", "OUTPUT_SCHEMA", "QA_FOOTER", "REJECTION"],
"glossary_version": "1.0"
},
"owners": [
{"role": "Curator", "model": "LLM-A@vX", "endpoint": "curator.svc"},
{"role": "Copywriter", "model": "LLM-B@vY", "endpoint": "copy.svc"},
{"role": "Lokalizator", "model": "LLM-B@vY", "endpoint": "l10n.svc"},
{"role": "Evaluator", "model": "LLM-C@vZ", "endpoint": "eval.svc"},
{"role": "Freeze", "model": "system/publisher", "endpoint": "freeze.svc"}
],
"artifacts_expected": [
{"id": "A1", "type": "markdown", "locale": "pl", "desc": "PR/PL"},
{"id": "A2", "type": "markdown", "locale": "en", "desc": "PR/EN"},
{"id": "A3", "type": "summary",  "locale": "en", "desc": "PR summary ≤150 chars"}
],
"steps": [
{
"step_id": "S1",
"role": "Curator",
"type": "CONTEXT_PACK",
"inputs": ["TaskSpec:MKT-PR-20250818-001"],
"outputs_expected": [{"artifact": "CTX1", "type": "md"}],
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
"inputs": ["CTX1", "Glossary:v1"],
"outputs_expected": [{"artifact": "A1"}, {"artifact": "A2"}, {"artifact": "A3"}],
"deps": ["S1"],
"queue": "[q.copywriter.pl](http://q.copywriter.pl/)",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 20
},
{
"step_id": "S3",
"role": "Lokalizator",
"type": "LOCALIZE",
"inputs": ["A1", "Glossary:v1"],
"outputs_expected": [{"artifact": "A2"}],
"deps": ["S2"],
"queue": "q.lokalizator.en",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 15
},
{
"step_id": "S4",
"role": "Evaluator",
"type": "QUALITY_CHECK",
"inputs": ["A1", "A2", "A3", "TaskSpec:MKT-PR-20250818-001", "Glossary:v1"],
"outputs_expected": [{"artifact": "QA1", "type": "md"}],
"deps": ["S2", "S3"],
"queue": "q.evaluator",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 10,
"decision_gate": true
},
{
"step_id": "S5",
"role": "Freeze",
"type": "ARCHIVE_PUBLISH",
"inputs": ["A1", "A2", "A3", "QA1"],
"outputs_expected": [{"artifact": "MANIFEST", "type": "json"}],
"deps": ["S4"],
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

1. Zapisz plik i uruchom linter JSON (sprawdź brak przecinków końcowych; poprawność kluczy/typów).
2. Kryteria zakończenia etapu (wszystko „TAK”):

Plik istnieje: /tipjar-campaigns/starter-packs/plan.pr.json.

plan_id i task_id są spójne z poprzednim etapem.

state = "planned", decision_gate ustawione dla S4.

Walidacja JSON PASS.

---

Napisz „Dalej”, a przejdziemy do ETAPU 3/6: EXEC — uruchomienie kroków S1→S2 (Curator → Copywriter) i zapis artefaktów A1/A2/A3 jako draft.

---

📌 Source & Verification of Response

[Unverified] — Ten OrchestrationPlan jest wygenerowany na podstawie wewnętrznej specyfikacji z przewodnika; nie pochodzi z zewnętrznego źródła.

[✓ Verified] — Zgodność z zasadami ADAM-MODE (etykiety, zakazane słowa, minimalizacja PII, wymagane bramki jakości).

[Inference] — Pola owners[].model/endpoint są placeholderami wdrożeniowymi i wymagają podpięcia do Twojej infrastruktury.