# KROK 6/7 — SEO/Blog — ETAP 2/6: ROUTE → wygeneruj OrchestrationPlan

Cel etapu: utworzyć kompletny OrchestrationPlan dla paczki SEO/Blog, aby przejść do EXEC.

---

Wykonaj dokładnie te czynności (jeden etap)

1. Utwórz plik

/tipjar-campaigns/starter-packs/plan.seo.json

1. Wklej poniższą zawartość (bez zmian w strukturze i nazwach kluczy):

{
"plan_id": "PLAN-SEO-20250819-001",
"task_id": "MKT-SEO-20250819-001",
"version": "1.0.0",
"created_at": "2025-08-19T13:00:00+02:00",
"owner": "system/orchestrator",
"routing_hint": ["SEO Strategist","Content Writer","Editor","Evaluator","Freeze"],
"sla": {
"plan_deadline": "2025-08-19T18:00:00+02:00",
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
"SEO_RULES","BLOG_JSONLD_RULES","LINKING_RULES"
],
"glossary_version": "1.0"
},
"owners": [
{"role":"SEO Strategist","model":"LLM-A@vX","endpoint":"seo.svc"},
{"role":"Content Writer","model":"LLM-B@vY","endpoint":"content.svc"},
{"role":"Editor","model":"LLM-C@vZ","endpoint":"editor.svc"},
{"role":"Evaluator","model":"LLM-D@vQ","endpoint":"eval.svc"},
{"role":"Freeze","model":"system/publisher","endpoint":"freeze.svc"}
],
"artifacts_expected": [
{"id":"SEO_STRATEGY_BRIEF_PL","type":"markdown","locale":"pl","desc":"założenia SEO (1–2 strony)"},
{"id":"SEO_STRATEGY_BRIEF_EN","type":"markdown","locale":"en","desc":"SEO assumptions (1–2 pages)"},
{"id":"KEYWORD_MAP_MULTI","type":"json","locale":"multi","desc":"mapa słów (cluster/kw/intent/difficulty/priority/serp)"},
{"id":"TOPICAL_CLUSTER_PLAN","type":"json","locale":"multi","desc":"pillars→subtopics→targets (PL/EN)"},
{"id":"PILLAR_OUTLINES_PL","type":"markdown","locale":"pl","desc":"3–5 outline’ów pillar"},
{"id":"PILLAR_OUTLINES_EN","type":"markdown","locale":"en","desc":"3–5 outlines pillar"},
{"id":"ARTICLE_OUTLINES_PL","type":"markdown","locale":"pl","desc":"10–15 outline’ów postów"},
{"id":"ARTICLE_OUTLINES_EN","type":"markdown","locale":"en","desc":"10–15 outlines posts"},
{"id":"META_PACK_BLOG","type":"markdown","locale":"multi","desc":"title/meta/og/canonical (≤60/≤155)"},
{"id":"SCHEMA_BLOG_JSONLD","type":"json","locale":"multi","desc":"Article/BlogPosting JSON-LD (PL/EN)"},
{"id":"INTERNAL_LINKING_SCHEMA","type":"markdown","locale":"multi","desc":"3–5 linków wewn. / post; hub↔spoke"},
{"id":"IMAGE_BRIEF_LIST","type":"markdown","locale":"multi","desc":"lista ilustracji + ALT ≤120 + AA"},
{"id":"STYLE_GUIDE_BLOG","type":"markdown","locale":"multi","desc":"ton, format, H2/H3, lead ≤40, 1 CTA"},
{"id":"COMPLIANCE_NOTES","type":"markdown","locale":"multi","desc":"język opisowy USDC; brak porad finansowych"},
{"id":"EDITORIAL_CALENDAR","type":"csv","locale":"multi","desc":"8 tygodni kalendarza"},
{"id":"CMS_BLOCKS_SPEC","type":"json","locale":"multi","desc":"hero/keypoints/steps/faq/cite/card/alert"},
{"id":"UTM_RULES_BLOG","type":"markdown","locale":"multi","desc":"reguły UTM dla bloga"},
{"id":"SOCIAL_SNIPPETS_DIST","type":"markdown","locale":"multi","desc":"zajawki do social (PL/EN)"},
{"id":"GLOSSARY_CREATOR_ECON","type":"markdown","locale":"multi","desc":"słownik pojęć"},
{"id":"FAQ_BLOG","type":"markdown","locale":"multi","desc":"10 Q/A"}
],
"steps": [
{
"step_id": "S1",
"role": "SEO Strategist",
"type": "CONTEXT_PACK",
"inputs": ["TaskSpec:MKT-SEO-20250819-001"],
"outputs_expected": [{"artifact":"CTX1","type":"md"}],
"deps": [],
"queue": "q.seo",
"priority": 2,
"status": "queued",
"attempts": 0,
"max_attempts": 3,
"timeout_min": 20
},
{
"step_id": "S2",
"role": "SEO Strategist",
"type": "GENERATE",
"inputs": ["CTX1","Glossary:v1"],
"outputs_expected": [
{"artifact":"SEO_STRATEGY_BRIEF_PL"},
{"artifact":"SEO_STRATEGY_BRIEF_EN"},
{"artifact":"KEYWORD_MAP_MULTI"},
{"artifact":"TOPICAL_CLUSTER_PLAN"},
{"artifact":"INTERNAL_LINKING_SCHEMA"},
{"artifact":"STYLE_GUIDE_BLOG"},
{"artifact":"CMS_BLOCKS_SPEC"},
{"artifact":"UTM_RULES_BLOG"},
{"artifact":"COMPLIANCE_NOTES"},
{"artifact":"GLOSSARY_CREATOR_ECON"},
{"artifact":"FAQ_BLOG"},
{"artifact":"IMAGE_BRIEF_LIST"},
{"artifact":"EDITORIAL_CALENDAR"}
],
"deps": ["S1"],
"queue": "q.seo",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 70
},
{
"step_id": "S3",
"role": "Content Writer",
"type": "GENERATE",
"inputs": ["CTX1","TOPICAL_CLUSTER_PLAN","KEYWORD_MAP_MULTI","Glossary:v1"],
"outputs_expected": [
{"artifact":"PILLAR_OUTLINES_PL"},
{"artifact":"PILLAR_OUTLINES_EN"},
{"artifact":"ARTICLE_OUTLINES_PL"},
{"artifact":"ARTICLE_OUTLINES_EN"},
{"artifact":"META_PACK_BLOG"},
{"artifact":"SCHEMA_BLOG_JSONLD"},
{"artifact":"SOCIAL_SNIPPETS_DIST"}
],
"deps": ["S2"],
"queue": "q.content",
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
"SEO_STRATEGY_BRIEF_PL","SEO_STRATEGY_BRIEF_EN",
"KEYWORD_MAP_MULTI","TOPICAL_CLUSTER_PLAN",
"PILLAR_OUTLINES_PL","PILLAR_OUTLINES_EN",
"ARTICLE_OUTLINES_PL","ARTICLE_OUTLINES_EN",
"META_PACK_BLOG","SCHEMA_BLOG_JSONLD",
"INTERNAL_LINKING_SCHEMA","IMAGE_BRIEF_LIST",
"STYLE_GUIDE_BLOG","COMPLIANCE_NOTES",
"EDITORIAL_CALENDAR","CMS_BLOCKS_SPEC",
"UTM_RULES_BLOG","SOCIAL_SNIPPETS_DIST",
"GLOSSARY_CREATOR_ECON","FAQ_BLOG"
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
"TaskSpec:MKT-SEO-20250819-001","Glossary:v1"
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
"SEO_STRATEGY_BRIEF_PL","SEO_STRATEGY_BRIEF_EN",
"KEYWORD_MAP_MULTI","TOPICAL_CLUSTER_PLAN",
"PILLAR_OUTLINES_PL","PILLAR_OUTLINES_EN",
"ARTICLE_OUTLINES_PL","ARTICLE_OUTLINES_EN",
"META_PACK_BLOG","SCHEMA_BLOG_JSONLD",
"INTERNAL_LINKING_SCHEMA","IMAGE_BRIEF_LIST",
"STYLE_GUIDE_BLOG","COMPLIANCE_NOTES",
"EDITORIAL_CALENDAR","CMS_BLOCKS_SPEC",
"UTM_RULES_BLOG","SOCIAL_SNIPPETS_DIST",
"GLOSSARY_CREATOR_ECON","FAQ_BLOG","QA1"
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

Plik istnieje: /tipjar-campaigns/starter-packs/plan.seo.json.

plan_id/task_id zgodne z taskspec.seo.json.

state = "planned", decision_gate ustawione w S5.

Walidacja JSON PASS.

Napisz „Dalej”, aby przejść do ETAPU 3/6: EXEC S1→S3 — [CTX1.md](http://ctx1.md/) + keyword map/topical clusters + outlines/meta/JSON-LD i reszta draftów.

---

📌 Source & Verification of Response

[Unverified] — Plan SEO/Blog opracowany wg przyjętych szablonów orkiestracji; brak zewnętrznych źródeł.

[Inference] — Kroki i role odzwierciedlają routing_hint z taskspec.seo.json; czasy i kolejki są wartościami startowymi do dopasowania.

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