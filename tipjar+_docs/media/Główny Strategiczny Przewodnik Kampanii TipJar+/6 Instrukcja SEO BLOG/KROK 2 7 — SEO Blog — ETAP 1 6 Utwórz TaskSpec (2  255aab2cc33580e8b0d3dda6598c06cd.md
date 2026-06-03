# KROK 2/7 — SEO/Blog — ETAP 1/6: Utwórz TaskSpec (2 artykuły evergreen + 1 landing)

Cel etapu: przygotować kompletny TaskSpec dla paczki SEO (2 × evergreen blog + 1 × landing), aby Orkiestrator mógł zbudować plan i uruchomić EXEC → REVIEW → FREEZE → Publikacja.

---

Wykonaj dokładnie te czynności

1. Utwórz plik

/tipjar-campaigns/starter-packs/taskspec.seo.json

1. Wklej poniższą zawartość (bez zmian w strukturze):

{
"task_id": "MKT-SEO-20250818-001",
"objective": "Stworzyć dwa artykuły evergreen (PL i EN) oraz jedną stronę landing dla tipjar+ z poprawnym meta, schemą i linkowaniem wewnętrznym.",
"persona": "Twórcy wideo/streamerzy 18–34 (PL/EN), odbiorcy mobilni; partnerzy i inwestorzy (EN).",
"outputs": [
{"type":"markdown","id":"BLOG_PL","length":"1200–1500 słów","locale":"pl"},
{"type":"markdown","id":"BLOG_EN","length":"1200–1500 słów","locale":"en"},
{"type":"markdown","id":"LANDING_PL","length":"600–900 słów","locale":"pl"},
{"type":"json","id":"META_PACK","desc":"title/meta/og","locale":"multi"},
{"type":"json","id":"SCHEMA_PACK","desc":"Article/FAQ schema","locale":"multi"},
{"type":"markdown","id":"INTERNAL_LINKS","desc":"mapa linkowania wewnętrznego","locale":"multi"}
],
"constraints": {
"adam_mode": true,
"style_guides": [
"1 CTA na dokument",
"Struktura H2/H3; lead ≤ 40 słów",
"Tytuł ≤ 60 znaków; meta opis ≤ 155",
"≥ 3 linki wewnętrzne; ≥ 1 zewnętrzny (wiarygodny)",
"ALT ≤ 120 znaków dla wszystkich grafik",
"UTM w linkach do produktu i pomocy",
"Brak obietnic finansowych; brak PII"
],
"channel_rules": {
"blog":{"min_words":1200,"max_words":1500},
"landing":{"min_words":600,"max_words":900}
},
"technical": {
"core_web_vitals":"informacyjne",
"lcp_target_s":"<2.5",
"lazyload_images": true
},
"banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"]
},
"context_refs": [
{"type":"doc","name":"Tipjar Growth Plan"},
{"type":"doc","name":"Nieliniarna Strategia Marketingowa TipJar+"},
{"type":"doc","name":"KV / miniatury — KROK 4/7"},
{"type":"doc","name":"FAQ/Support — KROK 7/7 (do linkowania wewnętrznego)"}
],
"privacy": {"pii": "none", "minimize_context": true},
"kpi_target": {
"serp_ctr": "↑ vs. baseline",
"time_on_page_s": "≥ 90",
"signup_conv": "≥ 2.0%"
},
"routing_hint": ["Curator","SEO Writer","Evaluator","Freeze"],
"generation": {"max_tokens": 1800, "temperature": 0.5},
"tool_access": {"web_browse": false, "image_gen": false},
"review_policy": {"evaluator_required": true, "human_required": true},
"deadline_iso": "2025-08-19T18:00:00+01:00",
"logs": {"level":"brief","store_artifacts": true}
}

1. Zapisz plik i uruchom linter JSON — wynik musi być PASS.
2. Kryteria zakończenia etapu (wszystkie „TAK”)

Plik istnieje: /tipjar-campaigns/starter-packs/taskspec.seo.json.

Treść identyczna jak powyżej (możesz dostosować deadline_iso).

Walidacja składni PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 2/6: ROUTE → OrchestrationPlan dla SEO/Blog.

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja zadania SEO/Blog została zbudowana na bazie dotychczasowych ustaleń wewnętrznych; brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, zakazane słowa, minimalizacja PII, 1 CTA, ALT/UTM, meta-limity.

[Inference] — Progi długości, LCP i KPI są wartościami startowymi do późniejszej kalibracji.