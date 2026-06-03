# KROK 1/7 — SOCIAL (X/LinkedIn/IG/YT Community) — ETAP 1/6: Utwórz TaskSpec pakietu postów

Cel etapu: przygotować kompletny TaskSpec dla paczki postów social (marka + CEO), aby Orkiestrator mógł zbudować plan i uruchomić EXEC → REVIEW → FREEZE → Publikacja.

---

Wykonaj dokładnie te czynności

1. Utwórz plik:

/tipjar-campaigns/starter-packs/taskspec.social.json

1. Wklej poniższą zawartość (bez zmian w strukturze):

{
"task_id": "MKT-SOCIAL-20250818-001",
"objective": "Stworzyć pakiet postów social o starcie tipjar+ dla X, LinkedIn (marka + CEO), IG i YouTube Community wraz z ALT i UTM.",
"persona": "Twórcy wideo/streamerzy, wczesna adopcja; inwestorzy i partnerzy (LI/EN).",
"outputs": [
{"type":"markdown","channel":"x","length":"120–160 znaków","locale":"pl"},
{"type":"markdown","channel":"linkedin_brand","length":"120–220 znaków","locale":"pl"},
{"type":"markdown","channel":"linkedin_ceo","length":"120–220 znaków","locale":"en"},
{"type":"markdown","channel":"instagram","length":"220–300 znaków","locale":"pl"},
{"type":"markdown","channel":"youtube_community","length":"140–200 znaków","locale":"pl"},
{"type":"markdown","channel":"alt_text_pack","length":"<=120 znaków na grafikę","locale":"pl"}
],
"constraints": {
"adam_mode": true,
"channel_rules": {
"x": {"max_hashtags": 2, "cta_required": true},
"linkedin": {"max_hashtags": 2, "cta_required": true},
"instagram": {"max_hashtags": 2, "cta_required": true},
"youtube_community": {"max_hashtags": 2, "cta_required": true},
"alt_text": {"required": true, "max_len": 120}
},
"legal": ["RODO", "brak obietnic finansowych"],
"style_guides": ["jedna CTA", "prosty ton", "brak CAPS", "ALT dla grafik", "UTM w linkach (komentarz przypięty tam, gdzie potrzebne)"],
"banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"]
},
"context_refs": [
{"type":"doc","name":"Tipjar Growth Plan"},
{"type":"doc","name":"Nieliniarna Strategia Marketingowa TipJar+"},
{"type":"doc","name":"KV / miniatury — KROK 4/7"}
],
"privacy": {"pii": "none", "minimize_context": true},
"kpi_target": {"clarity_score": ">=0.8", "er_ctr_baseline":"monitoruj 120 min po publikacji"},
"routing_hint": ["Curator","Copywriter","Evaluator","Freeze"],
"generation": {"max_tokens": 700, "temperature": 0.5},
"tool_access": {"web_browse": false, "image_gen": false},
"review_policy": {"evaluator_required": true, "human_required": true},
"deadline_iso": "2025-08-19T18:00:00+02:00",
"logs": {"level":"brief","store_artifacts": true}
}

1. Zapisz plik i uruchom linter JSON — wynik musi być PASS.
2. Kryteria zakończenia etapu (wszystkie „TAK”):

Plik istnieje pod ścieżką: /tipjar-campaigns/starter-packs/taskspec.social.json.

Treść identyczna jak powyżej (dopuszczalna zmiana deadline_iso).

Walidacja składni PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 2/6: ROUTE → wygenerowanie OrchestrationPlan dla SOCIAL.

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja zadania social została przygotowana na podstawie dotychczasowych ustaleń i wewnętrznych reguł; brak źródeł zewnętrznych.

[✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, zakazane słowa, minimalizacja PII, 1 CTA, ALT/UTM.

[Inference] — Limity długości i polityki hashtagów są rozsądnymi wartościami startowymi i mogą wymagać kalibracji po pierwszych publikacjach.