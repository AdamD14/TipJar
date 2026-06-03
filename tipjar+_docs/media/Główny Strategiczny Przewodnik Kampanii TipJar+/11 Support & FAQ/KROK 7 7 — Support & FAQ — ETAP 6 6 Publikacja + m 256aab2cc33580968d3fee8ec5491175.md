# KROK 7/7 — Support & FAQ — ETAP 6/6: Publikacja + monitoring — KROK 1/3: MonitoringSpec + KPI + paragony metryk

Cel kroku: zdefiniować jednolity plan monitoringu dla Support & FAQ (okna D+1/D+7/D+30), pola metryk, progi KPI, formaty paragonów i ścieżki w DAM — bez PII.

---

Wykonaj dokładnie te czynności

1. Utwórz plik specyfikacji monitoringu:

/tipjar-campaigns/starter-packs/monitoring.support.json

1. Wklej treść (nie zmieniaj kluczy ani struktury):

{
"schema": "support.monitoring.plan.v1",
"plan_id": "PLAN-SUPPORT-20250819-001",
"windows": { "d+1": 1, "d+7": 7, "d+30": 30 },
"kpi_thresholds": {
"frt_min_lte": 60,
"csat_avg_pct_gte": 90,
"self_service_ratio_pct_gte": 35,
"kb_click_through_pct_gte": 6,
"fcr_trend": "up"
},
"metrics_fields": [
"tickets_open",
"tickets_closed",
"frt_min_avg",
"frt_sla_breaches",
"fcr_pct",
"csat_avg_pct",
"self_service_ratio_pct",
"kb_click_through_pct",
"macro_use_rate_pct",
"reopen_rate_pct"
],
"receipts": {
"publish": "dam://campaigns/launch2025/support/publish/{YYYY}/{MM}/{DD}/PUBLISH_RECEIPT_help_{slug}.json",
"metrics": "dam://campaigns/launch2025/support/metrics/{YYYY}/{MM}/{DD}/ROLLUP_{window}.json",
"review": "dam://campaigns/launch2025/support/review/{YYYY}/{MM}/{DD}/REVIEW_{window}.json"
},
"review_rules": [
{
"window": "D+1",
"rules": [
{"if": "frt_sla_breaches>0", "then": "adjust_staffing_and_queue_rules"},
{"if": "macro_use_rate_pct<60", "then": "train_agents_on_macros"}
]
},
{
"window": "D+7",
"rules": [
{"if": "self_service_ratio_pct<35", "then": "add_kb_links_in_macros_and_top_faq_update"},
{"if": "kb_click_through_pct<6", "then": "improve_titles_and_cta_in_kb"}
]
},
{
"window": "D+30",
"rules": [
{"if": "csat_avg_pct<90", "then": "tone_review_plus_kb_gaps_analysis"},
{"if": "fcr_trend!='up'", "then": "troubleshooting_tree_refactor_and_macro_abtest"}
]
}
],
"privacy": { "pii": "none", "aggregate_only": true }
}

1. Utwórz strukturę katalogów DAM na paragony:

dam://campaigns/launch2025/support/publish/YYYY/MM/DD/
dam://campaigns/launch2025/support/metrics/YYYY/MM/DD/
dam://campaigns/launch2025/support/review/YYYY/MM/DD/

1. Dodaj szablony plików (puste wartości uzupełnisz po zebraniu danych):

A. D+1 — metryki (ROLLUP):

dam://campaigns/launch2025/support/metrics/2025/08/20/ROLLUP_D+1.json

{
"schema": "support.metrics.rollup.v1",
"plan_id": "PLAN-SUPPORT-20250819-001",
"window": "D+1",
"ts": "2025-08-20T10:05:00+02:00",
"metrics": {
"tickets_open": 0,
"tickets_closed": 0,
"frt_min_avg": 0,
"frt_sla_breaches": 0,
"fcr_pct": 0.0,
"csat_avg_pct": 0.0,
"self_service_ratio_pct": 0.0,
"kb_click_through_pct": 0.0,
"macro_use_rate_pct": 0.0,
"reopen_rate_pct": 0.0
},
"notes": "Agregaty bez PII; źródła: help center, in-product, email form."
}

B. D+7 — przegląd (REVIEW):

dam://campaigns/launch2025/support/review/2025/08/26/REVIEW_D+7.json

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"window": "D+7",
"ts": "2025-08-26T10:15:00+02:00",
"rules_evaluated": [
{"rule":"self_service_ratio_pct<35","result":"observe|action","action":"add_kb_links_in_macros_and_top_faq_update"},
{"rule":"kb_click_through_pct<6","result":"observe|action","action":"improve_titles_and_cta_in_kb"}
],
"decisions": [],
"notes": "Jeśli którakolwiek reguła spełniona — wpisz 'action', inaczej 'observe'."
}

C. D+30 — przegląd (REVIEW):

dam://campaigns/launch2025/support/review/2025/09/18/REVIEW_D+30.json

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"window": "D+30",
"ts": "2025-09-18T10:30:00+02:00",
"rules_evaluated": [
{"rule":"csat_avg_pct<90","result":"observe|action","action":"tone_review_plus_kb_gaps_analysis"},
{"rule":"fcr_trend!='up'","result":"observe|action","action":"troubleshooting_tree_refactor_and_macro_abtest"}
],
"decisions": [],
"notes": "Jeśli 'action' — opisz podjęte kroki i utwórz TODO w backlogu."
}

1. Kryteria zakończenia kroku (wszystkie „TAK”):

Plik istnieje: /tipjar-campaigns/starter-packs/monitoring.support.json.

Walidacja JSON PASS.

Katalogi DAM utworzone zgodnie ze schematem.

Szablony ROLLUP_D+1.json, REVIEW_D+7.json, REVIEW_D+30.json istnieją i walidują się.

Brak PII we wszystkich polach.

---

Napisz „Dalej”, a przejdę do KROKU 2/3: Dzień wdrożenia — paragony publikacji help/FAQ + sitemap + metryki D+1 (szablony).

---

📌 Source & Verification of Response

[✓ Verified] — KPI i pola zgodne z MEASUREMENT_SPEC_v1.0.0.json oraz taskspec.support.json (FRT ≤60, CSAT ≥90, self-service ≥35, KB CTR ≥6, FCR trend ↑).

[Unverified] — To plan operacyjny i szablony artefaktów; brak zewnętrznych źródeł.

[Inference] — Okna D+1/D+7/D+30 oraz reguły działań odzwierciedlają przyjęte guardrails Support & FAQ; kalibracja po pierwszych odczytach.

[Speculation] — Brak.

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