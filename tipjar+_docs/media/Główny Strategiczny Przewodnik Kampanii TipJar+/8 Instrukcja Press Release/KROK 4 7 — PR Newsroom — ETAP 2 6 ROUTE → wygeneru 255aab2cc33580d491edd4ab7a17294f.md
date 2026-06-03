# KROK 4/7 — PR/Newsroom — ETAP 2/6: ROUTE → wygeneruj OrchestrationPlan

Cel etapu: utworzyć kompletny OrchestrationPlan dla paczki PR/Newsroom, aby przejść do EXEC.

---

Wykonaj dokładnie te czynności

1. Utwórz plik:

/tipjar-campaigns/starter-packs/plan.pr.json

1. Wklej poniższą zawartość (bez zmian w strukturze i kluczach):

{
"plan_id": "PLAN-PR-20250819-001",
"task_id": "MKT-PR-20250819-001",
"version": "1.0.0",
"created_at": "2025-08-19T09:30:00+02:00",
"owner": "system/orchestrator",
"routing_hint": ["Curator","PR Writer","Evaluator","Freeze"],
"sla": {
"plan_deadline": "2025-08-19T18:00:00+02:00",
"default_step_timeout_min": 45,
"breach_policy": "ALERT_AND_ESCALATE"
},
"security": {
"pii_scope": "none",
"context_minimization": true,
"redaction_rules_id": "RR-1.0"
},
"guardrails": {
"macros": [
"ADAM_BASE","LABELING","BANNED_WORDS","PRIVACY_MIN",
"OUTPUT_SCHEMA","QA_FOOTER","REJECTION","CHANNEL_RULES",
"PR_RULES","NEWS_JSONLD_RULES"
],
"glossary_version": "1.0"
},
"owners": [
{"role":"Curator","model":"LLM-A@vX","endpoint":"curator.svc"},
{"role":"PR Writer","model":"LLM-B@vY","endpoint":"pr.svc"},
{"role":"Evaluator","model":"LLM-C@vZ","endpoint":"eval.svc"},
{"role":"Freeze","model":"system/publisher","endpoint":"freeze.svc"}
],
"artifacts_expected": [
{"id":"PRESS_RELEASE_PL","type":"markdown","locale":"pl","desc":"komunikat prasowy 400–600 słów"},
{"id":"PRESS_RELEASE_EN","type":"markdown","locale":"en","desc":"press release 400–600 words"},
{"id":"NEWSROOM_PAGE_PL","type":"markdown","locale":"pl","desc":"strona newsroom 600–900 słów"},
{"id":"KEY_MESSAGES_PL","type":"markdown","locale":"pl","desc":"5–7 punktów"},
{"id":"KEY_MESSAGES_EN","type":"markdown","locale":"en","desc":"5–7 bullets"},
{"id":"BOILERPLATE_PL","type":"markdown","locale":"pl","desc":"60–100 słów"},
{"id":"BOILERPLATE_EN","type":"markdown","locale":"en","desc":"60–100 words"},
{"id":"FOUNDER_BIO_PL","type":"markdown","locale":"pl","desc":"100–150 słów"},
{"id":"FOUNDER_BIO_EN","type":"markdown","locale":"en","desc":"100–150 words"},
{"id":"JOURNO_QA_PL","type":"markdown","locale":"pl","desc":"10 Q/A"},
{"id":"JOURNO_QA_EN","type":"markdown","locale":"en","desc":"10 Q/A"},
{"id":"PITCH_EMAIL_PL","type":"markdown","locale":"pl","desc":"pitch ≤120 słów + opt-out"},
{"id":"PITCH_EMAIL_EN","type":"markdown","locale":"en","desc":"pitch ≤120 words + opt-out"},
{"id":"META_PACK_PR","type":"json","locale":"multi","desc":"title/meta/og"},
{"id":"SCHEMA_NEWS_JSONLD","type":"json","locale":"multi","desc":"NewsArticle JSON-LD (PL/EN)"},
{"id":"ASSET_LIST","type":"markdown","locale":"multi","desc":"lista zasobów do pobrania z ALT"},
{"id":"DISTRIBUTION_LIST","type":"csv","locale":"multi","desc":"placeholder listy dystrybucyjnej (bez PII)"},
{"id":"EMBARGO_NOTE","type":"markdown","locale":"multi","desc":"notka o embargu i zasadach cytowania"}
],
"steps": [
{
"step_id": "S1",
"role": "Curator",
"type": "CONTEXT_PACK",
"inputs": ["TaskSpec:MKT-PR-20250819-001"],
"outputs_expected": [{"artifact":"CTX1","type":"md"}],
"deps": [],
"queue": "q.curator",
"priority": 2,
"status": "queued",
"attempts": 0,
"max_attempts": 3,
"timeout_min": 20
},
{
"step_id": "S2",
"role": "PR Writer",
"type": "GENERATE",
"inputs": ["CTX1","Glossary:v1"],
"outputs_expected": [
{"artifact":"PRESS_RELEASE_PL"},
{"artifact":"PRESS_RELEASE_EN"},
{"artifact":"NEWSROOM_PAGE_PL"},
{"artifact":"KEY_MESSAGES_PL"},
{"artifact":"KEY_MESSAGES_EN"},
{"artifact":"BOILERPLATE_PL"},
{"artifact":"BOILERPLATE_EN"},
{"artifact":"FOUNDER_BIO_PL"},
{"artifact":"FOUNDER_BIO_EN"},
{"artifact":"JOURNO_QA_PL"},
{"artifact":"JOURNO_QA_EN"},
{"artifact":"PITCH_EMAIL_PL"},
{"artifact":"PITCH_EMAIL_EN"},
{"artifact":"META_PACK_PR"},
{"artifact":"SCHEMA_NEWS_JSONLD"},
{"artifact":"ASSET_LIST"},
{"artifact":"DISTRIBUTION_LIST"},
{"artifact":"EMBARGO_NOTE"}
],
"deps": ["S1"],
"queue": "[q.pr](http://q.pr/)",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 70
},
{
"step_id": "S3",
"role": "Evaluator",
"type": "QUALITY_CHECK",
"inputs": [
"PRESS_RELEASE_PL","PRESS_RELEASE_EN","NEWSROOM_PAGE_PL",
"KEY_MESSAGES_PL","KEY_MESSAGES_EN","BOILERPLATE_PL","BOILERPLATE_EN",
"FOUNDER_BIO_PL","FOUNDER_BIO_EN","JOURNO_QA_PL","JOURNO_QA_EN",
"PITCH_EMAIL_PL","PITCH_EMAIL_EN",
"META_PACK_PR","SCHEMA_NEWS_JSONLD","ASSET_LIST","DISTRIBUTION_LIST","EMBARGO_NOTE",
"TaskSpec:MKT-PR-20250819-001","Glossary:v1"
],
"outputs_expected": [{"artifact":"QA1","type":"md"}],
"deps": ["S2"],
"queue": "q.evaluator",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 25,
"decision_gate": true
},
{
"step_id": "S4",
"role": "Freeze",
"type": "ARCHIVE_PUBLISH",
"inputs": [
"PRESS_RELEASE_PL","PRESS_RELEASE_EN","NEWSROOM_PAGE_PL",
"KEY_MESSAGES_PL","KEY_MESSAGES_EN","BOILERPLATE_PL","BOILERPLATE_EN",
"FOUNDER_BIO_PL","FOUNDER_BIO_EN","JOURNO_QA_PL","JOURNO_QA_EN",
"PITCH_EMAIL_PL","PITCH_EMAIL_EN",
"META_PACK_PR","SCHEMA_NEWS_JSONLD","ASSET_LIST","DISTRIBUTION_LIST","EMBARGO_NOTE","QA1"
],
"outputs_expected": [{"artifact":"MANIFEST","type":"json"}],
"deps": ["S3"],
"queue": "q.freeze",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 1,
"timeout_min": 12
}
],
"audit": [],
"state": "planned"
}

1. Zapisz plik i uruchom linter JSON — wynik PASS.
2. Kryteria zakończenia etapu (wszystkie „TAK”):

Plik istnieje: /tipjar-campaigns/starter-packs/plan.pr.json.

plan_id/task_id zgodne z taskspec.pr.json.

state = "planned", decision_gate ustawione w S3.

Walidacja JSON PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 3/6: EXEC S1→S2 — [CTX1.md](http://ctx1.md/) + drafty PR/Newsroom (PL/EN), meta i JSON-LD, asset list, embargo, dystrybucja.

---

📌 Source & Verification of Response

[Unverified] — Plan PR/Newsroom opracowany wg przyjętych szablonów orkiestracji; brak zewnętrznych źródeł.

[✓ Verified] — Spójność z ADAM-MODE (etykietowanie, słowa ryzykowne, minimalizacja PII, 1 CTA, OG/JSON-LD/canonical, opt-out w pitch).

[Inference] — Kolejki, timeouty i makra guardrail są wartościami startowymi do dopasowania w infrastrukturze.

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