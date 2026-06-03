# KROK 4/7 — PR/Newsroom — ETAP 1/6: Utwórz TaskSpec (Press Release PL/EN + Newsroom + Media Kit + Pitch)

Cel etapu: przygotować kompletny TaskSpec dla paczki PR/Newsroom (komunikat prasowy PL/EN, strona newsroom, media kit, Q&A dla prasy, boilerplate, bio, e-maile pitch), aby Orkiestrator mógł zbudować plan i uruchomić EXEC → REVIEW → FREEZE → Publikacja.

---

Wykonaj dokładnie te czynności

1. Utwórz plik

/tipjar-campaigns/starter-packs/taskspec.pr.json

1. Wklej poniższą zawartość (bez zmian w strukturze i nazwach kluczy):

{
"task_id": "MKT-PR-20250819-001",
"objective": "Stworzyć zestaw PR/Newsroom dla startu tipjar+: Press Release (PL/EN), strona newsroom, media kit (key messages, boilerplate, bio), Q&A dla dziennikarzy oraz e-maile pitch (PL/EN) — zgodnie z ADAM-MODE.",
"persona": "Redakcje tech/kreatorzy (PL/EN), blogerzy branżowi, partnerzy. Odbiorcy czasu mało, preferują konkret.",
"outputs": [
{"type":"markdown","id":"PRESS_RELEASE_PL","length":"400–600 słów","locale":"pl","desc":"komunikat prasowy (PL)"},
{"type":"markdown","id":"PRESS_RELEASE_EN","length":"400–600 words","locale":"en","desc":"press release (EN)"},
{"type":"markdown","id":"NEWSROOM_PAGE_PL","length":"600–900 słów","locale":"pl","desc":"strona newsroom (PL)"},
{"type":"markdown","id":"KEY_MESSAGES_PL","length":"5–7 punktów","locale":"pl","desc":"key messages (PL)"},
{"type":"markdown","id":"KEY_MESSAGES_EN","length":"5–7 bullets","locale":"en","desc":"key messages (EN)"},
{"type":"markdown","id":"BOILERPLATE_PL","length":"60–100 słów","locale":"pl","desc":"boilerplate firmy (PL)"},
{"type":"markdown","id":"BOILERPLATE_EN","length":"60–100 words","locale":"en","desc":"company boilerplate (EN)"},
{"type":"markdown","id":"FOUNDER_BIO_PL","length":"100–150 słów","locale":"pl","desc":"bio założyciela (PL)"},
{"type":"markdown","id":"FOUNDER_BIO_EN","length":"100–150 words","locale":"en","desc":"founder bio (EN)"},
{"type":"markdown","id":"JOURNO_QA_PL","length":"10 Q/A","locale":"pl","desc":"Q&A dla mediów (PL)"},
{"type":"markdown","id":"JOURNO_QA_EN","length":"10 Q/A","locale":"en","desc":"Q&A for media (EN)"},
{"type":"markdown","id":"PITCH_EMAIL_PL","length":"≤120 słów","locale":"pl","desc":"e-mail pitch do redakcji (PL) z opt-out"},
{"type":"markdown","id":"PITCH_EMAIL_EN","length":"≤120 words","locale":"en","desc":"press pitch email (EN) with opt-out"},
{"type":"json","id":"META_PACK_PR","desc":"title/meta/og dla PR + newsroom","locale":"multi"},
{"type":"json","id":"SCHEMA_NEWS_JSONLD","desc":"NewsArticle JSON-LD (PL/EN)","locale":"multi"},
{"type":"markdown","id":"ASSET_LIST","desc":"lista zasobów do pobrania (logo, KV, screeny) z ALT (≤120)","locale":"multi"},
{"type":"csv","id":"DISTRIBUTION_LIST","desc":"placeholder listy dystrybucyjnej mediów (bez PII)","locale":"multi"},
{"type":"markdown","id":"EMBARGO_NOTE","desc":"notka o embargu i zasadach cytowania","locale":"multi"}
],
"constraints": {
"adam_mode": true,
"style_guides": [
"Lead w PR ≤ 40 słów",
"Nagłówki H2/H3 logiczne i krótkie akapity",
"1 CTA na dokument (np. przejdź do newsroom/landing)",
"Brak obietnic finansowych; opisowo o USDC",
"ALT dla grafik (≤120 znaków)",
"UTM w linkach produkt/pomoc",
"Etykieta [Unverified] + stopka weryfikacyjna w plikach MD"
],
"channel_rules": {
"press_release":{"min_words":400,"max_words":600},
"newsroom":{"min_words":600,"max_words":900},
"boilerplate":{"min_words":60,"max_words":100},
"bio":{"min_words":100,"max_words":150},
"pitch_email":{"max_words":120,"opt_out_required":true,"max_links":2}
},
"legal": [
"RODO — bez PII w zestawach publicznych",
"Brak roszczeń dot. zysków/zwrotu; język opisowy",
"Zasady cytowania i embarga w EMBARGO_NOTE"
],
"technical": {
"og_required": true,
"jsonld_required": true,
"canonical_required": true,
"download_assets_public": true
},
"banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"]
},
"context_refs": [
{"type":"doc","name":"Tipjar Growth Plan"},
{"type":"doc","name":"Nieliniarna Strategia Marketingowa TipJar+"},
{"type":"doc","name":"SEO/Blog — artefakty v1.0.1 (do linkowania)"},
{"type":"doc","name":"Support & FAQ — KROK 7/7 (linki i bezpieczeństwo)"},
{"type":"doc","name":"KV / miniatury — KROK 4/7 (asset pack)"}
],
"privacy": {"pii": "none", "minimize_context": true},
"kpi_target": {
"pickup_count_d7": "≥ 10 cytowań/wzmianek (monitoring wewnętrzny)",
"avg_time_on_newsroom_s": "≥ 90",
"reply_rate_pitch": "≥ 8%",
"asset_downloads_d3": "trend ↑"
},
"routing_hint": ["Curator","PR Writer","Evaluator","Freeze"],
"generation": {"max_tokens": 2400, "temperature": 0.5},
"tool_access": {"web_browse": false, "image_gen": false},
"review_policy": {"evaluator_required": true, "human_required": true},
"schedule_hint": {
"embargo_iso": "2025-08-20T09:00:00+02:00",
"newsroom_publish_iso": "2025-08-20T09:00:00+02:00",
"pitch_windows": ["2025-08-19T14:00:00+02:00","2025-08-20T10:30:00+02:00"]
},
"deadline_iso": "2025-08-19T18:00:00+02:00",
"logs": {"level":"brief","store_artifacts": true}
}

1. Zapisz plik i uruchom linter JSON — wynik PASS.
2. Kryteria zakończenia etapu (wszystkie „TAK”)

Plik istnieje: /tipjar-campaigns/starter-packs/taskspec.pr.json.

Treść identyczna jak powyżej (możesz jedynie zmienić deadline_iso).

Walidacja składni PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 2/6: ROUTE → OrchestrationPlan dla PR/Newsroom.

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja zadania PR/Newsroom została wygenerowana operacyjnie na bazie dotychczasowych reguł; brak zewnętrznych źródeł.

[✓ Verified] — Zachowano ADAM-MODE: etykietowanie, zakazane słowa, minimalizacja PII, 1 CTA, ALT/UTM, wymagania OG/JSON-LD/canonical.

[Inference] — KPI i okna czasowe mają charakter startowy i będą kalibrowane po pierwszych publikacjach.