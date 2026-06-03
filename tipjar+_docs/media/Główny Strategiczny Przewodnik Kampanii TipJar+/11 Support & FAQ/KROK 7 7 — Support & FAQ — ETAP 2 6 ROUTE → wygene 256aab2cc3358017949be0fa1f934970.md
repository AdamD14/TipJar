# KROK 7/7 — Support & FAQ — ETAP 2/6: ROUTE → wygeneruj OrchestrationPlan

Cel etapu: utworzyć kompletny OrchestrationPlan dla paczki Support & FAQ, aby przejść do EXEC.

---

Wykonaj dokładnie te czynności (jeden etap)

1. Utwórz plik

/tipjar-campaigns/starter-packs/plan.support.json

1. Wklej poniższą zawartość (bez zmian w strukturze i nazwach kluczy):

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"task_id": "MKT-SUPPORT-20250819-001",
"version": "1.0.0",
"created_at": "2025-08-19T14:15:00+02:00",
"owner": "system/orchestrator",
"routing_hint": ["Support Strategist","Helpdesk Writer","Localization","Editor","Evaluator","Freeze"],
"sla": {
"plan_deadline": "2025-08-19T19:30:00+02:00",
"default_step_timeout_min": 60,
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
"OUTPUT_SCHEMA","QA_FOOTER","REJECTION",
"HELP_JSON_SCHEMAS","PII_REDACTION_RULES","ACCESSIBILITY_RULES"
],
"glossary_version": "1.0"
},
"owners": [
{"role":"Support Strategist","model":"LLM-A@vX","endpoint":"support.svc"},
{"role":"Helpdesk Writer","model":"LLM-B@vY","endpoint":"helpdesk.svc"},
{"role":"Localization","model":"LLM-L@vL","endpoint":"loc.svc"},
{"role":"Editor","model":"LLM-C@vZ","endpoint":"editor.svc"},
{"role":"Evaluator","model":"LLM-D@vQ","endpoint":"eval.svc"},
{"role":"Freeze","model":"system/publisher","endpoint":"freeze.svc"}
],
"artifacts_expected": [
{"id":"SUPPORT_FAQ_PL","type":"markdown","locale":"pl","desc":"10–15 Q/A"},
{"id":"SUPPORT_FAQ_EN","type":"markdown","locale":"en","desc":"10–15 Q/A"},
{"id":"KB_OUTLINES_PL","type":"markdown","locale":"pl","desc":"10–12 outline’ów"},
{"id":"KB_OUTLINES_EN","type":"markdown","locale":"en","desc":"10–12 outlines"},
{"id":"KB_TEMPLATES_MULTI","type":"markdown","locale":"multi","desc":"szablony MD"},
{"id":"SUPPORT_MACROS_PL","type":"markdown","locale":"pl","desc":"zestaw makr odpowiedzi"},
{"id":"SUPPORT_MACROS_EN","type":"markdown","locale":"en","desc":"set of response macros"},
{"id":"CONTACT_FLOWS","type":"json","locale":"multi","desc":"ścieżki kontaktu/triage/escalation"},
{"id":"ESCALATION_MATRIX","type":"json","locale":"multi","desc":"poziomy/role/czasy reakcji"},
{"id":"SLA_POLICY","type":"markdown","locale":"multi","desc":"SLA odpowiedzi/domknięcia"},
{"id":"TICKET_TEMPLATES","type":"yaml","locale":"multi","desc":"szablony zgłoszeń"},
{"id":"STATUS_PAGE_TEMPLATES","type":"markdown","locale":"multi","desc":"INCIDENT/MAINTENANCE/RESOLVED"},
{"id":"TROUBLESHOOTING_TREES","type":"json","locale":"multi","desc":"drzewa diagnostyczne"},
{"id":"REDACTION_RULES","type":"json","locale":"multi","desc":"maskowanie/wykrywanie PII"},
{"id":"ACCESSIBILITY_NOTES_HELP","type":"markdown","locale":"multi","desc":"wytyczne dostępności"},
{"id":"SUPPORT_TONE_GUIDE","type":"markdown","locale":"multi","desc":"ton wsparcia"},
{"id":"UTM_RULES_HELP","type":"markdown","locale":"multi","desc":"reguły UTM dla pomocy"},
{"id":"INTERNAL_LINKING_HELP","type":"markdown","locale":"multi","desc":"KB↔FAQ↔Blog (3–5 linków)"},
{"id":"GLOSSARY_SUPPORT","type":"markdown","locale":"multi","desc":"słownik pomocy"},
{"id":"MEASUREMENT_SPEC","type":"json","locale":"multi","desc":"CSAT/FRT/FCR/self-service ratio"}
],
"steps": [
{
"step_id": "S1",
"role": "Support Strategist",
"type": "CONTEXT_PACK",
"inputs": ["TaskSpec:MKT-SUPPORT-20250819-001"],
"outputs_expected": [{"artifact":"CTX1_SUPPORT","type":"md"}],
"deps": [],
"queue": "q.support",
"priority": 2,
"status": "queued",
"attempts": 0,
"max_attempts": 3,
"timeout_min": 20
},
{
"step_id": "S2",
"role": "Support Strategist",
"type": "GENERATE",
"inputs": ["CTX1_SUPPORT","Glossary:v1"],
"outputs_expected": [
{"artifact":"KB_TEMPLATES_MULTI"},
{"artifact":"CONTACT_FLOWS"},
{"artifact":"ESCALATION_MATRIX"},
{"artifact":"SLA_POLICY"},
{"artifact":"TICKET_TEMPLATES"},
{"artifact":"TROUBLESHOOTING_TREES"},
{"artifact":"REDACTION_RULES"},
{"artifact":"ACCESSIBILITY_NOTES_HELP"},
{"artifact":"SUPPORT_TONE_GUIDE"},
{"artifact":"INTERNAL_LINKING_HELP"},
{"artifact":"UTM_RULES_HELP"},
{"artifact":"MEASUREMENT_SPEC"},
{"artifact":"GLOSSARY_SUPPORT"}
],
"deps": ["S1"],
"queue": "q.support",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 70
},
{
"step_id": "S3",
"role": "Helpdesk Writer",
"type": "GENERATE",
"inputs": ["CTX1_SUPPORT","CONTACT_FLOWS","ESCALATION_MATRIX","REDACTION_RULES","KB_TEMPLATES_MULTI","Glossary:v1"],
"outputs_expected": [
{"artifact":"SUPPORT_FAQ_PL"},
{"artifact":"SUPPORT_FAQ_EN"},
{"artifact":"KB_OUTLINES_PL"},
{"artifact":"KB_OUTLINES_EN"},
{"artifact":"SUPPORT_MACROS_PL"},
{"artifact":"SUPPORT_MACROS_EN"},
{"artifact":"STATUS_PAGE_TEMPLATES"}
],
"deps": ["S2"],
"queue": "q.helpdesk",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 70
},
{
"step_id": "S4",
"role": "Editor",
"type": "EDIT_PASS",
"inputs": [
"SUPPORT_FAQ_PL","SUPPORT_FAQ_EN",
"KB_OUTLINES_PL","KB_OUTLINES_EN",
"KB_TEMPLATES_MULTI","SUPPORT_MACROS_PL","SUPPORT_MACROS_EN",
"CONTACT_FLOWS","ESCALATION_MATRIX","SLA_POLICY","TICKET_TEMPLATES",
"TROUBLESHOOTING_TREES","REDACTION_RULES","ACCESSIBILITY_NOTES_HELP",
"SUPPORT_TONE_GUIDE","UTM_RULES_HELP","INTERNAL_LINKING_HELP",
"GLOSSARY_SUPPORT","MEASUREMENT_SPEC"
],
"outputs_expected": [{"artifact":"EDIT1","type":"md"}],
"deps": ["S3"],
"queue": "q.editor",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 25
},
{
"step_id": "S5",
"role": "Evaluator",
"type": "QUALITY_CHECK",
"inputs": [
"EDIT1",
"TaskSpec:MKT-SUPPORT-20250819-001","Glossary:v1"
],
"outputs_expected": [{"artifact":"QA1","type":"md"}],
"deps": ["S4"],
"queue": "q.evaluator",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 25,
"decision_gate": true
},
{
"step_id": "S6",
"role": "Freeze",
"type": "ARCHIVE_PUBLISH",
"inputs": [
"SUPPORT_FAQ_PL","SUPPORT_FAQ_EN",
"KB_OUTLINES_PL","KB_OUTLINES_EN",
"KB_TEMPLATES_MULTI","SUPPORT_MACROS_PL","SUPPORT_MACROS_EN",
"CONTACT_FLOWS","ESCALATION_MATRIX","SLA_POLICY","TICKET_TEMPLATES",
"TROUBLESHOOTING_TREES","REDACTION_RULES","ACCESSIBILITY_NOTES_HELP",
"SUPPORT_TONE_GUIDE","UTM_RULES_HELP","INTERNAL_LINKING_HELP",
"GLOSSARY_SUPPORT","MEASUREMENT_SPEC","STATUS_PAGE_TEMPLATES","QA1"
],
"outputs_expected": [{"artifact":"MANIFEST","type":"json"}],
"deps": ["S5"],
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

Plik istnieje: /tipjar-campaigns/starter-packs/plan.support.json.

plan_id/task_id zgodne z taskspec.support.json.

state = "planned", decision_gate ustawione w S5.

Walidacja JSON PASS.

Napisz „Dalej”, aby przejść do ETAPU 3/6: EXEC S1→S3 — CTX1_SUPPORT.md + makra/FAQ/KB/flow/escalation i reszta draftów.

---

📌 Source & Verification of Response

[Unverified] — Plan Support & FAQ opracowany wg przyjętych szablonów orkiestracji; brak zewnętrznych źródeł.

[Inference] — Kroki i role odzwierciedlają routing_hint z taskspec.support.json; czasy i kolejki są wartościami startowymi do dopasowania.

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