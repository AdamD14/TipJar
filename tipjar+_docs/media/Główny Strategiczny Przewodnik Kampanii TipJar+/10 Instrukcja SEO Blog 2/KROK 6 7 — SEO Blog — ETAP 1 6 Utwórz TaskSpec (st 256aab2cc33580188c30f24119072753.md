# KROK 6/7 — SEO/Blog — ETAP 1/6: Utwórz TaskSpec (strategia SEO, klastry tematyczne, mapy słów kluczowych, outline’y, meta, JSON-LD, kalendarz, linkowanie wewn., compliance)

Cel etapu: przygotować kompletny TaskSpec dla paczki SEO/Blog tak, aby Orkiestrator mógł zbudować plan i uruchomić EXEC → REVIEW → FREEZE → Publikację.

---

Wykonaj dokładnie te czynności

KROK 1. Utwórz plik:

/tipjar-campaigns/starter-packs/taskspec.seo.json

KROK 2. Wklej poniższą zawartość (nie zmieniaj nazw kluczy ani struktury):

{
"task_id": "MKT-SEO-20250819-001",
"objective": "Stworzyć pełny pakiet SEO/Blog: strategia, klastry tematyczne, mapy słów kluczowych, outline’y pillar/postów (PL/EN), meta/OG, JSON-LD, kalendarz redakcyjny (8 tyg.), schemat linkowania wewn., style guide i compliance — zgodnie z ADAM-MODE.",
"persona": "Twórcy wideo/streamerzy (18–34) i fani; czytelnicy szukający krótkich, praktycznych informacji produktowych bez roszczeń finansowych.",
"outputs": [
{"type":"markdown","id":"SEO_STRATEGY_BRIEF_PL","length":"1–2 strony","locale":"pl","desc":"Założenia SEO, cele, filary tematyczne, taksonomia"},
{"type":"markdown","id":"SEO_STRATEGY_BRIEF_EN","length":"1–2 pages","locale":"en","desc":"SEO assumptions, goals, topical pillars, taxonomy"},
{"type":"json","id":"KEYWORD_MAP_MULTI","desc":"Mapa słów: {cluster, kw, intent, locale, difficulty_hint, priority, serp_features}"},
{"type":"json","id":"TOPICAL_CLUSTER_PLAN","desc":"Pillars (3–5) → subtopics (5–8) → targety (PL/EN)"},
{"type":"markdown","id":"PILLAR_OUTLINES_PL","length":"3–5 outline’ów","locale":"pl","desc":"Outline H1/H2/H3 + 1 CTA + sekcje dostępności"},
{"type":"markdown","id":"PILLAR_OUTLINES_EN","length":"3–5 outlines","locale":"en","desc":"H1/H2/H3 + 1 CTA + accessibility notes"},
{"type":"markdown","id":"ARTICLE_OUTLINES_PL","length":"10–15 outline’ów","locale":"pl","desc":"Briefy postów: tytuł, TL;DR, sekcje, FAQ, CTA"},
{"type":"markdown","id":"ARTICLE_OUTLINES_EN","length":"10–15 outlines","locale":"en","desc":"Post briefs: title, TL;DR, sections, FAQ, CTA"},
{"type":"markdown","id":"META_PACK_BLOG","length":"zestaw","locale":"multi","desc":"Title(≤60), meta desc(≤155), og:title/desc, canonical"},
{"type":"json","id":"SCHEMA_BLOG_JSONLD","desc":"Article/BlogPosting JSON-LD — PL/EN, author=Organization"},
{"type":"markdown","id":"INTERNAL_LINKING_SCHEMA","length":"spec","locale":"multi","desc":"Zasady łącz: 3–5 linków wewn. / post; struktura hub↔spoke"},
{"type":"markdown","id":"IMAGE_BRIEF_LIST","length":"lista","locale":"multi","desc":"Lista ilustracji (ALT ≤120, wskazówki AA/kontrast)"},
{"type":"markdown","id":"STYLE_GUIDE_BLOG","length":"poradnik","locale":"multi","desc":"Ton, format, H2/H3, lead ≤40 słów, 1 CTA, tabelki, checklisty"},
{"type":"markdown","id":"COMPLIANCE_NOTES","length":"notatka","locale":"multi","desc":"Brak porad/obietnic finansowych, język opisowy dot. USDC"},
{"type":"csv","id":"EDITORIAL_CALENDAR","desc":"8 tygodni: data, język, tytuł roboczy, owner, status, URL"},
{"type":"json","id":"CMS_BLOCKS_SPEC","desc":"Bloki CMS: hero, keypoints, steps, faq, cite, card, alert"},
{"type":"markdown","id":"UTM_RULES_BLOG","length":"specyfikacja","locale":"multi","desc":"Reguły UTM dla postów i materiałów do pobrania"},
{"type":"markdown","id":"SOCIAL_SNIPPETS_DIST","length":"zestaw","locale":"multi","desc":"Zajawki do social (PL/EN): 70–110 znaków + 1 link UTM"},
{"type":"markdown","id":"GLOSSARY_CREATOR_ECON","length":"słownik","locale":"multi","desc":"Słownik pojęć (produkt/dostępność/USDC)"},
{"type":"markdown","id":"FAQ_BLOG","length":"10 Q/A","locale":"multi","desc":"Pytania i odpowiedzi; produktowo, bez roszczeń finansowych"}
],
"constraints": {
"adam_mode": true,
"style_guides": [
"Lead ≤ 40 słów; 1 CTA na artykuł",
"H2/H3; akapity ≤ 100–140 słów",
"ALT dla obrazów ≤ 120 znaków; kontrast ≥ AA",
"UTM w linkach do produktu/pomocy",
"Etykieta [Unverified] + stopka weryfikacyjna w plikach MD"
],
"channel_rules": {
"pillar":{"min_words":1500,"max_words":2500},
"post":{"min_words":900,"max_words":1500},
"faq":{"count":10},
"meta":{"title_lte":60,"description_lte":155},
"linking":{"internal_per_post_min":3,"internal_per_post_max":5}
},
"legal": [
"RODO — brak PII w treściach i kalendarzu",
"Brak porad inwestycyjnych i roszczeń finansowych",
"Jasne oznaczenie materiałów jako informacyjnych"
],
"technical": {
"jsonld_required": true,
"og_required": true,
"canonical_required": true,
"sitemap_update_required": true,
"hreflang_pl_en": true,
"reading_level_hint": "B1–B2"
},
"banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"]
},
"context_refs": [
{"type":"doc","name":"Tipjar Growth Plan"},
{"type":"doc","name":"Nieliniarna Strategia Marketingowa TipJar+"},
{"type":"doc","name":"PR/Newsroom v1.0.1 — key messages/boilerplate"},
{"type":"doc","name":"Paid/Kreatywy v1.0.1 — hooki i CTA"},
{"type":"doc","name":"Support & FAQ — KROK 7/7 (linki pomocy)"}
],
"privacy": {"pii": "none", "minimize_context": true},
"kpi_target": {
"organic_clicks_d30": "trend ↑",
"serp_ctr_avg": "≥ 3.5% (PL/EN)",
"avg_time_on_post_s": "≥ 120",
"index_coverage_ok": "≥ 95% dla nowych URL (D+14)"
},
"routing_hint": ["SEO Strategist","Content Writer","Editor","Evaluator","Freeze"],
"generation": {"max_tokens": 3600, "temperature": 0.5},
"tool_access": {"web_browse": true, "image_gen": false},
"review_policy": {"evaluator_required": true, "human_required": true},
"schedule_hint": {
"sprint_1": {"start_iso":"2025-08-20T12:30:00+02:00","end_iso":"2025-09-03T18:00:00+02:00"},
"sprint_2": {"start_iso":"2025-09-04T09:00:00+02:00","end_iso":"2025-09-18T18:00:00+02:00"},
"checkpoints": ["T+7","T+14","D+30"]
},
"deadline_iso": "2025-08-19T18:00:00+02:00",
"logs": {"level":"brief","store_artifacts": true}
}

KROK 3. Zapisz plik i uruchom linter JSON — wynik musi być PASS.

KROK 4. Kryteria zakończenia etapu (wszystkie „TAK”):

Plik istnieje: /tipjar-campaigns/starter-packs/taskspec.seo.json.

Treść identyczna jak powyżej (dopuszczalna jedynie zmiana deadline_iso).

Walidacja składni PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 2/6: ROUTE → OrchestrationPlan dla SEO/Blog.

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja zadania SEO/Blog została przygotowana operacyjnie na bazie dotychczasowych reguł kampanii; brak zewnętrznych źródeł.

[Inference] — Zakres, KPI i parametry redakcyjne to wartości startowe do kalibracji po Sprint 1.

📌 Source & Verification of Response

- [✓ Verified] — Confirmed via official documentation, code, or direct source.
- [Unverified] — Not confirmed; generated output or unsupported by source.
- [Inference] — Reasoned deduction based on known context; not a guarantee. → If applicable: include exact filename, line reference, or source URL.
- [Speculation] — Hypothesis or estimate; not grounded in verified data.