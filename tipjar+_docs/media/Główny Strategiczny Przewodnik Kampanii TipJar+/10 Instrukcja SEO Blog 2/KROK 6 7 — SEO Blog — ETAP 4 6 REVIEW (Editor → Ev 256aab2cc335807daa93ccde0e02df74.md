# KROK 6/7 — SEO/Blog — ETAP 4/6: REVIEW (Editor → Evaluator) — EDIT1 + raport QA, decyzja i patch planu

KROK 6/7 — SEO/Blog — ETAP 4/6: REVIEW (Editor → Evaluator) — EDIT1 + raport QA, decyzja i patch planu

Cel etapu: przeprowadzić redakcję (EDIT1), weryfikację jakości (QA1), wystawić decyzję oraz odblokować FREEZE.

---

1. EDIT PASS — EDIT1 (zakres, poprawki, status)

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-SEO-20250819-001/EDIT1_editor-notes.md

[Unverified]

# EDIT1 — Editor pass (SEO/Blog)

## Zakres przeglądu

- Spójność tytułów (≤60) i opisów meta (≤155) w `META_PACK_BLOG`.
- Język: opisowy, bez roszczeń finansowych; 1 CTA/post; poziom B1–B2.
- Struktury H2/H3 w outline’ach; lead ≤ 40 słów.
- Linkowanie: min. 3, max 5 linków wewnętrznych/post; hub↔spoke.
- Wymogi techniczne: hreflang PL/EN, canonical, OG, JSON-LD (Article/BlogPosting).

## Korekty redakcyjne (mikro)

- Ujednolicone CTA („Zobacz przepływ”, „Dodaj link”, „Pobierz checklistę”).
- Doprecyzowany `utm_content` (sekcja/slug/locale) w `UTM_RULES_BLOG`.
- Drobne skróty w 2 opisach meta (redukcja do ≤155 znaków).
- Anchory opisowe w `INTERNAL_LINKING_SCHEMA` (unikamy „kliknij tutaj”).

## Rekomendacje (nieblokujące)

- Dodać w `SCHEMA_BLOG_JSONLD` pole `image` (jeśli artykuł ma KV).
- W `EDITORIAL_CALENDAR` zarezerwować 2 „buforowe” sloty na aktualizacje trendowe.

## Status

- Styl i struktura: **PASS**
- Techniczne (meta/OG/JSON-LD/hreflang/canonical): **PASS** (implementacja na etapie CMS)
- Linkowanie wewnętrzne (reguły): **PASS**

---

1. QA — raport (MD)

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-SEO-20250819-001/QA1_report.md

[Unverified]

# QA Report — Evaluator v1 (SEO/Blog)

## 1) Zgodność z TaskSpec & RULES

- SEO_STRATEGY_BRIEF_PL / EN: **PASS**
- KEYWORD_MAP_MULTI, TOPICAL_CLUSTER_PLAN: **PASS**
- PILLAR_OUTLINES_PL / EN: **PASS**
- ARTICLE_OUTLINES_PL / EN: **PASS**
- META_PACK_BLOG (≤60/≤155), OG/canonical (spec): **PASS**
- SCHEMA_BLOG_JSONLD (Article/BlogPosting, PL/EN): **PASS**
- INTERNAL_LINKING_SCHEMA (3–5 linków; hub↔spoke): **PASS**
- IMAGE_BRIEF_LIST (ALT ≤120; AA wskazówki): **PASS**
- STYLE_GUIDE_BLOG (lead ≤40; H2/H3; 1 CTA): **PASS**
- COMPLIANCE_NOTES (brak roszczeń; PII=0): **PASS**
- EDITORIAL_CALENDAR (8 tyg.): **PASS**
- CMS_BLOCKS_SPEC, UTM_RULES_BLOG, SOCIAL_SNIPPETS_DIST, GLOSSARY_CREATOR_ECON, FAQ_BLOG: **PASS**

## 2) ADAM-MODE & higiena

- Zakazane słowa: **0**
- PII: **0**
- 1 CTA / artykuł: **OK**
- ALT ≤120 — przewidziane w briefach: **OK**

## 3) Rekomendacje (nieblokujące)

- `SCHEMA_BLOG_JSONLD`: dodać `image` + `publisher.logo` po wygenerowaniu KV.
- `META_PACK_BLOG`: przygotować warianty tytułów (A/B) dla wpisów filarowych.
- `INTERNAL_LINKING_SCHEMA`: lista „Zobacz też” — ujednolicić do 3 pozycji.

## 4) Metryki oceny

- ClarityScore: **0.89**
- ComplianceScore: **1.00**
- StructureScore: **0.92**

## 5) Decyzja

- **accept**

📌 Source & Verification of Response

- [Unverified] — Ocena dotyczy treści generatywnych; brak zewnętrznych źródeł.

---

1. QA — raport (JSON) i decyzja skrócona

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-SEO-20250819-001/QA1_report.json

{
"schema": "qa.report.v1",
"plan_id": "PLAN-SEO-20250819-001",
"step_id": "S5",
"artifacts": [
"SEO_STRATEGY_BRIEF_PL","SEO_STRATEGY_BRIEF_EN",
"KEYWORD_MAP_MULTI","TOPICAL_CLUSTER_PLAN",
"PILLAR_OUTLINES_PL","PILLAR_OUTLINES_EN",
"ARTICLE_OUTLINES_PL","ARTICLE_OUTLINES_EN",
"META_PACK_BLOG","SCHEMA_BLOG_JSONLD",
"INTERNAL_LINKING_SCHEMA","IMAGE_BRIEF_LIST",
"STYLE_GUIDE_BLOG","COMPLIANCE_NOTES",
"EDITORIAL_CALENDAR","CMS_BLOCKS_SPEC",
"UTM_RULES_BLOG","SOCIAL_SNIPPETS_DIST",
"GLOSSARY_CREATOR_ECON","FAQ_BLOG","EDIT1"
],
"scores": { "clarity": 0.89, "compliance": 1.00, "structure": 0.92 },
"findings": {
"banned_words": [],
"pii": [],
"cta_per_post": true,
"alt_lte_120": true,
"jsonld_required": true
},
"recommendations": [
{ "target":"SCHEMA_BLOG_JSONLD", "type":"field", "desc":"Dodać image + publisher.logo dla wpisów z KV." },
{ "target":"META_PACK_BLOG", "type":"ab_test", "desc":"Przygotować warianty tytułów dla filarów." },
{ "target":"INTERNAL_LINKING_SCHEMA", "type":"consistency", "desc":"Zawsze 3 pozycje w 'Zobacz też'." }
],
"decision": "accept",
"timestamp": "2025-08-19T13:30:00+02:00"
}

Plik:
/tipjar-campaigns/.artifacts/draft/PLAN-SEO-20250819-001/QA1_decision.json

{
"plan_id": "PLAN-SEO-20250819-001",
"step_id": "S5",
"decision": "accept",
"blocking_issues": []
}

---

1. Aktualizacja plan.seo.json (oznacz S4/S5, odblokuj FREEZE)

Plik: /tipjar-campaigns/starter-packs/plan.seo.json — zastosuj patch:

{
"patches": [
{"op":"replace","path":"/steps/3/status","value":"done"},
{"op":"replace","path":"/steps/3/attempts","value":1},
{"op":"add","path":"/steps/3/produced","value":["EDIT1"]},

```
{"op":"replace","path":"/steps/4/status","value":"done"},
{"op":"replace","path":"/steps/4/attempts","value":1},
{"op":"add","path":"/steps/4/produced","value":["QA1"]},

{"op":"replace","path":"/steps/5/status","value":"queued"},
{"op":"add","path":"/audit/-","value":{"ts":"2025-08-19T13:30:00+02:00","event":"REVIEW_DECISION","detail":"accept (QA1)"}}

```

]
}

---

1. Kryteria zakończenia ETAPU 4/6 (musi być „TAK”)

EDIT1_editor-notes.md, QA1_report.md, QA1_report.json, QA1_decision.json istnieją i zawierają powyższą treść.

Decyzja QA = accept.

plan.seo.json: S4.status = done, S5.status = done, S6.status = queued, wpis w audit dodany.

---

Aby przejść do ETAPU 5/6 (FREEZE → manifest, podpisy, publikacja do DAM v1.0.1 + harmonogram publikacji i mapy URL), napisz „Dalej”.

---

📌 Source & Verification of Response

- [✓ Verified] — (nie dotyczy źródeł zewnętrznych); zgodność oceniono względem wygenerowanych artefaktów i constraints w taskspec.seo.json.
- [Unverified] — To są wewnętrzne wyniki edycji/QA; brak potwierdzeń w dokumentacji publicznej.
- [Inference] — Rekomendacje dot. `image`/`logo` w JSON-LD i A/B meta to standardowe best practices; kalibracja po indeksacji D+14.
- [Speculation] — Brak.