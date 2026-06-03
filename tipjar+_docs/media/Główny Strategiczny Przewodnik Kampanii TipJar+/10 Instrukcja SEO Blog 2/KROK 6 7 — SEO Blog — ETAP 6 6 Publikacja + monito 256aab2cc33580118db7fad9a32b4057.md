# KROK 6/7 — SEO/Blog — ETAP 6/6: Publikacja + monitoring D+14 — KROK 1/4: MonitoringSpec + progi KPI + strukturę paragonów

Cel kroku: zdefiniować jeden spójny plik specyfikacji monitoringu (progi D+14 i okna D+1/D+7/D+14/D+30), nazwę i lokalizacje paragonów oraz minimalny zestaw metryk (bez PII). To jest baza do dalszych kroków publikacji i przeglądów.

---

Wykonaj dokładnie te czynności

1. Utwórz plik:

/tipjar-campaigns/starter-packs/monitoring.seo.json

1. Wklej treść (nie zmieniaj kluczy ani struktury):

{
"schema": "seo.monitoring.plan.v1",
"plan_id": "PLAN-SEO-20250819-001",
"windows": { "d+1": 1, "d+7": 7, "d+14": 14, "d+30": 30 },
"kpi_thresholds": {
"index_coverage_d14_min_pct": 95,
"serp_ctr_avg_min_pct": 3.5,
"avg_time_on_post_s_min": 120,
"organic_clicks_d30_trend": "up"
},
"metrics_fields": [
"impressions",
"clicks",
"ctr",
"avg_position",
"avg_time_on_post_s",
"scroll_50_pct",
"canonical_ok",
"hreflang_ok",
"jsonld_ok"
],
"receipts": {
"publish": "dam://campaigns/launch2025/seo/publish/{YYYY}/{MM}/{DD}/PUBLISH_RECEIPT_blog_{slug}.json",
"index_status": "dam://campaigns/launch2025/seo/index/{YYYY}/{MM}/{DD}/INDEX_STATUS_{slug}.json",
"metrics": "dam://campaigns/launch2025/seo/metrics/{YYYY}/{MM}/{DD}/METRICS_{window}*{slug}.json",
"review": "dam://campaigns/launch2025/seo/review/{YYYY}/{MM}/{DD}/REVIEW*{window}_{slug}.json"
},
"review_rules": [
{
"window": "D+1",
"rules": [
{"if": "canonical_ok=false OR jsonld_ok=false", "then": "fix_and_redeploy"},
{"if": "impressions=0", "then": "inspect_url_and_resubmit_sitemap"}
]
},
{
"window": "D+14",
"rules": [
{"if": "index_coverage_pct<95", "then": "technical_audit + resubmit_sitemap"},
{"if": "serp_ctr_avg<3.5", "then": "AB_meta_title_desc + add_faq_section_if_relevant"},
{"if": "avg_time_on_post_s<120", "then": "improve_lede_add_steps_table_increase_internal_links"}
]
},
{
"window": "D+30",
"rules": [
{"if": "organic_clicks_trend!='up'", "then": "refresh_content + interlink_from_new_posts"}
]
}
],
"privacy": { "pii": "none", "aggregate_only": true }
}

1. Utwórz strukturę katalogów na paragony (DAM):

dam://campaigns/launch2025/seo/publish/YYYY/MM/DD/
dam://campaigns/launch2025/seo/index/YYYY/MM/DD/
dam://campaigns/launch2025/seo/metrics/YYYY/MM/DD/
dam://campaigns/launch2025/seo/review/YYYY/MM/DD/

1. Kryteria zakończenia kroku (wszystkie „TAK”):

Plik istnieje: /tipjar-campaigns/starter-packs/monitoring.seo.json.

Walidacja JSON PASS.

Katalogi DAM utworzone zgodnie ze schematem.

kpi_thresholds zgodne: 95% (coverage D+14), ≥3.5% (SERP CTR), ≥120 s (czas), trend up (clicks D+30).

---

Napisz „Dalej”, a przejdę do KROKU 2/4: Dzień publikacji — paragony publikacji + sitemap ping + metryki D+1 (szablony).

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja monitoringu SEO/Blog oparta na wcześniej zdefiniowanych KPI i standardach projektu; brak zewnętrznych źródeł.

[Inference] — Progi i reguły rewizji wynikają z celów taskspec.seo.json (D+14 coverage ≥95%, CTR ≥3.5%, czas ≥120 s); metryki są agregatami bez PII.