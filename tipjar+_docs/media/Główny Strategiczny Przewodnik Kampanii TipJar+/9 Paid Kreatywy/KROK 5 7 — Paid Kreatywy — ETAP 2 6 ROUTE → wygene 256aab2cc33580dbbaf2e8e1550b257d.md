# KROK 5/7 — Paid/Kreatywy — ETAP 2/6: ROUTE → wygeneruj OrchestrationPlan

Cel etapu: utworzyć kompletny OrchestrationPlan dla paczki Paid/Kreatywy, aby przejść do EXEC.

---

1. Utwórz plik

/tipjar-campaigns/starter-packs/plan.paid.json

1. Wklej poniższą zawartość (bez zmian w strukturze i nazwach kluczy)

{
"plan_id": "PLAN-PAID-20250819-001",
"task_id": "MKT-PAID-20250819-001",
"version": "1.0.0",
"created_at": "2025-08-19T11:30:00+02:00",
"owner": "system/orchestrator",
"routing_hint": ["Curator","Creative Writer","Video Writer","Evaluator","Freeze"],
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
"OUTPUT_SCHEMA","QA_FOOTER","REJECTION","CHANNEL_RULES",
"AD_POLICIES","PLATFORM_POLICIES"
],
"glossary_version": "1.0"
},
"owners": [
{"role":"Curator","model":"LLM-A@vX","endpoint":"curator.svc"},
{"role":"Creative Writer","model":"LLM-B@vY","endpoint":"creative.svc"},
{"role":"Video Writer","model":"LLM-C@vZ","endpoint":"video.svc"},
{"role":"Evaluator","model":"LLM-D@vQ","endpoint":"eval.svc"},
{"role":"Freeze","model":"system/publisher","endpoint":"freeze.svc"}
],
"artifacts_expected": [
{"id":"CREATIVE_BRIEF_PL","type":"markdown","locale":"pl","desc":"brief kreatywny (1 strona)"},
{"id":"CREATIVE_BRIEF_EN","type":"markdown","locale":"en","desc":"creative brief (1 page)"},
{"id":"AD_COPY_META_PL","type":"markdown","locale":"pl","desc":"Meta: Primary/Headline/Description ≤5 wariantów"},
{"id":"AD_COPY_META_EN","type":"markdown","locale":"en","desc":"Meta: Primary/Headline/Description ≤5 variants"},
{"id":"AD_COPY_TIKTOK_PL","type":"markdown","locale":"pl","desc":"TikTok: 5×hook + opis"},
{"id":"AD_COPY_TIKTOK_EN","type":"markdown","locale":"en","desc":"TikTok: 5×hooks + desc"},
{"id":"AD_SCRIPTS_YT_PL","type":"markdown","locale":"pl","desc":"YouTube: skrypty 6s/15s/30s"},
{"id":"AD_SCRIPTS_YT_EN","type":"markdown","locale":"en","desc":"YouTube: scripts 6s/15s/30s"},
{"id":"SHOTLIST_15S_VERTICAL","type":"markdown","locale":"multi","desc":"lista ujęć 15s 9:16"},
{"id":"DISPLAY_BANNERS_COPY","type":"markdown","locale":"multi","desc":"hasła do banerów (różne rozmiary)"},
{"id":"ALT_TEXT_PACK","type":"markdown","locale":"multi","desc":"ALT ≤120 dla grafik"},
{"id":"GOOGLE_RSA_ASSETS_PL","type":"json","locale":"pl","desc":"RSA: nagłówki×15 ≤30, opisy×4 ≤90"},
{"id":"GOOGLE_RSA_ASSETS_EN","type":"json","locale":"en","desc":"RSA: headlines×15 ≤30, descriptions×4 ≤90"},
{"id":"PMAX_ASSET_MAP","type":"markdown","locale":"multi","desc":"mapa assetów PMAX"},
{"id":"UTM_RULES","type":"markdown","locale":"multi","desc":"specyfikacja UTM + przykłady"},
{"id":"TARGETING_HYPOTHESES","type":"json","locale":"multi","desc":"hipotezy targetowania (PL/EN)"},
{"id":"BUDGET_SPLIT_PLAN","type":"json","locale":"multi","desc":"podział budżetu — Flight#1/#2"},
{"id":"EXPERIMENT_DESIGN","type":"markdown","locale":"multi","desc":"plan testów i metryki"},
{"id":"BRAND_SAFETY_LISTS","type":"markdown","locale":"multi","desc":"listy wykluczeń (tematy/placementy)"},
{"id":"AD_POLICIES_CHECKLIST","type":"markdown","locale":"multi","desc":"checklista zgodności reklam"},
{"id":"DELIVERABLES_NAMING","type":"markdown","locale":"multi","desc":"konwencje nazewnictwa"},
{"id":"FLIGHT_SCHEDULE","type":"markdown","locale":"multi","desc":"okna startu i tempo wydań"}
],
"steps": [
{
"step_id": "S1",
"role": "Curator",
"type": "CONTEXT_PACK",
"inputs": ["TaskSpec:MKT-PAID-20250819-001"],
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
"role": "Creative Writer",
"type": "GENERATE",
"inputs": ["CTX1","Glossary:v1"],
"outputs_expected": [
{"artifact":"CREATIVE_BRIEF_PL"},
{"artifact":"CREATIVE_BRIEF_EN"},
{"artifact":"AD_COPY_META_PL"},
{"artifact":"AD_COPY_META_EN"},
{"artifact":"AD_COPY_TIKTOK_PL"},
{"artifact":"AD_COPY_TIKTOK_EN"},
{"artifact":"DISPLAY_BANNERS_COPY"},
{"artifact":"ALT_TEXT_PACK"},
{"artifact":"GOOGLE_RSA_ASSETS_PL"},
{"artifact":"GOOGLE_RSA_ASSETS_EN"},
{"artifact":"PMAX_ASSET_MAP"},
{"artifact":"UTM_RULES"},
{"artifact":"TARGETING_HYPOTHESES"},
{"artifact":"BUDGET_SPLIT_PLAN"},
{"artifact":"EXPERIMENT_DESIGN"},
{"artifact":"BRAND_SAFETY_LISTS"},
{"artifact":"DELIVERABLES_NAMING"},
{"artifact":"FLIGHT_SCHEDULE"}
],
"deps": ["S1"],
"queue": "q.creative",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 70
},
{
"step_id": "S3",
"role": "Video Writer",
"type": "GENERATE",
"inputs": ["CTX1","Glossary:v1"],
"outputs_expected": [
{"artifact":"AD_SCRIPTS_YT_PL"},
{"artifact":"AD_SCRIPTS_YT_EN"},
{"artifact":"SHOTLIST_15S_VERTICAL"}
],
"deps": ["S1"],
"queue": "q.video",
"priority": 2,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 50
},
{
"step_id": "S4",
"role": "Evaluator",
"type": "QUALITY_CHECK",
"inputs": [
"CREATIVE_BRIEF_PL","CREATIVE_BRIEF_EN",
"AD_COPY_META_PL","AD_COPY_META_EN",
"AD_COPY_TIKTOK_PL","AD_COPY_TIKTOK_EN",
"AD_SCRIPTS_YT_PL","AD_SCRIPTS_YT_EN","SHOTLIST_15S_VERTICAL",
"DISPLAY_BANNERS_COPY","ALT_TEXT_PACK",
"GOOGLE_RSA_ASSETS_PL","GOOGLE_RSA_ASSETS_EN",
"PMAX_ASSET_MAP","UTM_RULES",
"TARGETING_HYPOTHESES","BUDGET_SPLIT_PLAN",
"EXPERIMENT_DESIGN","BRAND_SAFETY_LISTS",
"DELIVERABLES_NAMING","FLIGHT_SCHEDULE",
"TaskSpec:MKT-PAID-20250819-001","Glossary:v1"
],
"outputs_expected": [{"artifact":"QA1","type":"md"}],
"deps": ["S2","S3"],
"queue": "q.evaluator",
"priority": 1,
"status": "blocked",
"attempts": 0,
"max_attempts": 2,
"timeout_min": 25,
"decision_gate": true
},
{
"step_id": "S5",
"role": "Freeze",
"type": "ARCHIVE_PUBLISH",
"inputs": [
"CREATIVE_BRIEF_PL","CREATIVE_BRIEF_EN",
"AD_COPY_META_PL","AD_COPY_META_EN",
"AD_COPY_TIKTOK_PL","AD_COPY_TIKTOK_EN",
"AD_SCRIPTS_YT_PL","AD_SCRIPTS_YT_EN","SHOTLIST_15S_VERTICAL",
"DISPLAY_BANNERS_COPY","ALT_TEXT_PACK",
"GOOGLE_RSA_ASSETS_PL","GOOGLE_RSA_ASSETS_EN",
"PMAX_ASSET_MAP","UTM_RULES",
"TARGETING_HYPOTHESES","BUDGET_SPLIT_PLAN",
"EXPERIMENT_DESIGN","BRAND_SAFETY_LISTS",
"DELIVERABLES_NAMING","FLIGHT_SCHEDULE","QA1"
],
"outputs_expected": [{"artifact":"MANIFEST","type":"json"}],
"deps": ["S4"],
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

1. Kryteria zakończenia etapu (musi być „TAK”)

Plik istnieje: /tipjar-campaigns/starter-packs/plan.paid.json.

plan_id/task_id zgodne z taskspec.paid.json.

state = "planned", decision_gate ustawione w S4.

Walidacja JSON PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 3/6: EXEC S1→S3 — [CTX1.md](http://ctx1.md/) + komplet draftów copy/video/assetów/koncepcji testów.

---

📌 Source & Verification of Response

[Unverified] — To jest wygenerowany plan operacyjny; brak zewnętrznych źródeł. Plik: /tipjar-campaigns/starter-packs/plan.paid.json.

[Inference] — Kolejki, timeouty, makra guardrail i podział ról zostały dobrane wg wzorca z poprzednich kroków kampanii.