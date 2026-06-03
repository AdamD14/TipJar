# KROK 3/7 — E-mail/Outreach — ETAP 2/6: ROUTE → wygeneruj OrchestrationPlan

Cel etapu: utworzyć kompletny OrchestrationPlan dla paczki E-mail/Outreach (newsletter + sekwencje 1:1), aby przejść do EXEC.

---

Wykonaj dokładnie te czynności

1. Utwórz plik:

/tipjar-campaigns/starter-packs/plan.email.json

1. Wklej poniższą zawartość (bez zmian w strukturze i kluczach):

{
"plan_id": "PLAN-EMAIL-20250818-001",
"task_id": "MKT-EMAIL-20250818-001",
"version": "1.0.0",
"created_at": "2025-08-18T16:45:00+02:00",
"owner": "system/orchestrator",
"routing_hint": ["Curator","Email Writer","Evaluator","Freeze"],
"sla": {
"plan_deadline": "2025-08-19T18:00:00+02:00",
"default_step_timeout_min": 45,
"breach_policy": "ALERT_AND_ESCALATE"
},
"security": {
"pii_scope": "minimal",
"context_minimization": true,
"redaction_rules_id": "RR-1.0"
},
"guardrails": {
"macros": [
"ADAM_BASE","LABELING","BANNED_WORDS","PRIVACY_MIN",
"OUTPUT_SCHEMA","QA_FOOTER","REJECTION","CHANNEL_RULES",
"EMAIL_RULES","ANTI_SPAM"
],
"glossary_version": "1.0"
},
"owners": [
{"role":"Curator","model":"LLM-A@vX","endpoint":"curator.svc"},
{"role":"Email Writer","model":"LLM-B@vY","endpoint":"email.svc"},
{"role":"Evaluator","model":"LLM-C@vZ","endpoint":"eval.svc"},
{"role":"Freeze","model":"system/publisher","endpoint":"freeze.svc"}
],
"artifacts_expected": [
{"id":"NEWSLETTER_PL","type":"markdown","locale":"pl","desc":"newsletter produktowy ≤120 słów"},
{"id":"NEWSLETTER_EN","type":"markdown","locale":"en","desc":"newsletter product ≤120 words"},
{"id":"OUTREACH_CREATORS_PL_STEP1","type":"markdown","locale":"pl","desc":"twórcy — krok 1"},
{"id":"OUTREACH_CREATORS_PL_STEP2","type":"markdown","locale":"pl","desc":"twórcy — follow-up 48h"},
{"id":"OUTREACH_CREATORS_EN_STEP1","type":"markdown","locale":"en","desc":"creators — step 1"},
{"id":"OUTREACH_CREATORS_EN_STEP2","type":"markdown","locale":"en","desc":"creators — follow-up 48h"},
{"id":"OUTREACH_PARTNERS_EN_STEP1","type":"markdown","locale":"en","desc":"co-marketing — step 1"},
{"id":"OUTREACH_PARTNERS_EN_STEP2","type":"markdown","locale":"en","desc":"co-marketing — follow-up 48h"},
{"id":"SUBJECTS_PREHEADERS","type":"json","locale":"multi","desc":"tematy i preheadery (PL/EN)"},
{"id":"LINKS_UTM_PACK","type":"markdown","locale":"multi","desc":"landing/help z UTM"}
],
"steps": [
{
"step_id": "S1",
"role": "Curator",
"type": "CONTEXT_PACK",
"inputs": ["TaskSpec:MKT-EMAIL-20250818-001"],
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
"role": "Email Writer",
"type": "GENERATE",
"inputs": ["CTX1","Glossary:v1"],
"outputs_expected": [
{"artifact":"NEWSLETTER_PL"},
{"artifact":"NEWSLETTER_EN"},
{"artifact":"OUTREACH_CREATORS_PL_STEP1"},
{"artifact":"OUTREACH_CREATORS_PL_STEP2"},
{"artifact":"OUTREACH_CREATORS_EN_STEP1"},
{"artifact":"OUTREACH_CREATORS_EN_STEP2"},
{"artifact":"OUTREACH_PARTNERS_EN_STEP1"},
{"artifact":"OUTREACH_PARTNERS_EN_STEP2"},
{"artifact":"SUBJECTS_PREHEADERS"},
{"artifact":"LINKS_UTM_PACK"}
],
"deps": ["S1"],
"queue": "q.email",
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
"inputs": [
"NEWSLETTER_PL","NEWSLETTER_EN",
"OUTREACH_CREATORS_PL_STEP1","OUTREACH_CREATORS_PL_STEP2",
"OUTREACH_CREATORS_EN_STEP1","OUTREACH_CREATORS_EN_STEP2",
"OUTREACH_PARTNERS_EN_STEP1","OUTREACH_PARTNERS_EN_STEP2",
"SUBJECTS_PREHEADERS","LINKS_UTM_PACK",
"TaskSpec:MKT-EMAIL-20250818-001","Glossary:v1"
],
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
"inputs": [
"NEWSLETTER_PL","NEWSLETTER_EN",
"OUTREACH_CREATORS_PL_STEP1","OUTREACH_CREATORS_PL_STEP2",
"OUTREACH_CREATORS_EN_STEP1","OUTREACH_CREATORS_EN_STEP2",
"OUTREACH_PARTNERS_EN_STEP1","OUTREACH_PARTNERS_EN_STEP2",
"SUBJECTS_PREHEADERS","LINKS_UTM_PACK","QA1"
],
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

Plik istnieje: /tipjar-campaigns/starter-packs/plan.email.json.

plan_id/task_id zgodne z taskspec.email.json.

state = "planned", decision_gate ustawione w S3.

Walidacja JSON PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 3/6: EXEC S1→S2 — [CTX1.md](http://ctx1.md/) + drafty newsletterów, sekwencji 1:1, SUBJECTS_PREHEADERS, LINKS_UTM_PACK.

---

📌 Source & Verification of Response

- [✓ Verified] — (nie dotyczy zewnętrznych źródeł); plik i struktura zgodne z wewnętrznym standardem orkiestracji.
- [Unverified] — To jest wygenerowany plan operacyjny; brak potwierdzenia w oficjalnej dokumentacji publicznej. Plik: /tipjar-campaigns/starter-packs/plan.email.json
- [Inference] — Dobór kolejek, timeoutów i makr guardrail wynika z wcześniej przyjętych konwencji w tej kampanii; można dopasować do infrastruktury.
- [Speculation] — Brak.