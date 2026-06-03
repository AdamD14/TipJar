# KROK 5/7 — Paid/Kreatywy — ETAP 1/6: Utwórz TaskSpec (brief, copy, formaty, wideo, UTM, targety, budżet, testy, compliance)

Cel etapu: przygotować kompletny TaskSpec dla paczki Paid/Kreatywy (Meta/TikTok/YouTube/Google Ads/Display), tak aby Orkiestrator mógł zbudować plan i uruchomić EXEC → REVIEW → FREEZE → Publikacja.

---

Wykonaj dokładnie te czynności

KROK 1. Utwórz plik:

/tipjar-campaigns/starter-packs/taskspec.paid.json

KROK 2. Wklej poniższą zawartość (nie zmieniaj nazw kluczy ani struktury):

{
"task_id": "MKT-PAID-20250819-001",
"objective": "Stworzyć pełny pakiet kreacji i speców mediowych na kanały Meta, TikTok, YouTube, Google Ads (Search/RSAs/PMAX) i Display — zgodnie z ADAM-MODE, bez roszczeń finansowych, z gotowymi formatami i UTM.",
"persona": "Dwie grupy: (A) Twórcy wideo/streamerzy 18–34 (PL/EN), (B) Fani/odbiorcy chcący łatwo wesprzeć twórcę.",
"outputs": [
{"type":"markdown","id":"CREATIVE_BRIEF_PL","length":"1 strona","locale":"pl","desc":"brief kreatywny (cel, wątek, RTB, CTA, tonalność)"},
{"type":"markdown","id":"CREATIVE_BRIEF_EN","length":"1 page","locale":"en","desc":"creative brief (goal, storyline, RTB, CTA, tone)"},
{"type":"markdown","id":"AD_COPY_META_PL","length":"≤5 wariantów","locale":"pl","desc":"Meta: Primary(≤125 znaków), Headline(≤40), Description(≤30)"},
{"type":"markdown","id":"AD_COPY_META_EN","length":"≤5 variants","locale":"en","desc":"Meta: Primary(≤125 chars), Headline(≤40), Description(≤30)"},
{"type":"markdown","id":"AD_COPY_TIKTOK_PL","length":"≤5 hooków + opis","locale":"pl","desc":"TikTok: 5×hook(≤8 słów), opis(≤100 znaków)"},
{"type":"markdown","id":"AD_COPY_TIKTOK_EN","length":"≤5 hooks + desc","locale":"en","desc":"TikTok: 5×hook(≤8 words), desc(≤100 chars)"},
{"type":"markdown","id":"AD_SCRIPTS_YT_PL","length":"6s/15s/30s","locale":"pl","desc":"YouTube: skrypty pre-roll (6/15/30 s) z CTA"},
{"type":"markdown","id":"AD_SCRIPTS_YT_EN","length":"6s/15s/30s","locale":"en","desc":"YouTube: pre-roll scripts (6/15/30 s) with CTA"},
{"type":"markdown","id":"SHOTLIST_15S_VERTICAL","length":"lista ujęć","locale":"multi","desc":"Shotlist + rytm montażu dla 15s 9:16 (TikTok/Reels/Shorts)"},
{"type":"markdown","id":"DISPLAY_BANNERS_COPY","length":"zestaw haseł","locale":"multi","desc":"Copy do banerów: 1200×628, 1080×1080, 1080×1920, 300×250, 300×600, 160×600, 728×90"},
{"type":"markdown","id":"ALT_TEXT_PACK","length":"≤120 znaków","locale":"multi","desc":"ALT dla statycznych grafik (AA kontrast — informacyjne)"},
{"type":"json","id":"GOOGLE_RSA_ASSETS_PL","desc":"Nagłówki(≤30 znaków)×15, Opisy(≤90)×4 — PL"},
{"type":"json","id":"GOOGLE_RSA_ASSETS_EN","desc":"Headlines(≤30)×15, Descriptions(≤90)×4 — EN"},
{"type":"markdown","id":"PMAX_ASSET_MAP","length":"mapa","locale":"multi","desc":"Mapa assetów PMAX: teksty, grafiki, wideo (sloty)"},
{"type":"markdown","id":"UTM_RULES","length":"specyfikacja","locale":"multi","desc":"Reguły UTM: source/medium/campaign/content/term + przykłady"},
{"type":"json","id":"TARGETING_HYPOTHESES","desc":"Hipotezy targetowania (PL start): creators/fans, zainteresowania, lookalike, wykluczenia"},
{"type":"json","id":"BUDGET_SPLIT_PLAN","desc":"Podział budżetu testowego (Flight#1/#2, kanał×%×CEST)"},
{"type":"markdown","id":"EXPERIMENT_DESIGN","length":"plan testów","locale":"multi","desc":"Plan A/B(nagłówek×kreatywa), metryki: CTR, VTR, CVR; decyzje"},
{"type":"markdown","id":"BRAND_SAFETY_LISTS","length":"listy","locale":"multi","desc":"Listy wykluczeń (tematy/placementy) — bez PII"},
{"type":"markdown","id":"AD_POLICIES_CHECKLIST","length":"checklista","locale":"multi","desc":"Compliance: brak obietnic finansowych, przejrzystość, optymalizacja ALT/kontrast, zakaz załączników"},
{"type":"markdown","id":"DELIVERABLES_NAMING","length":"spec","locale":"multi","desc":"Konwencje nazw plików + paczki eksportowe"},
{"type":"markdown","id":"FLIGHT_SCHEDULE","length":"okna","locale":"multi","desc":"Okna startu (CEST), tempa wydań, kontrola T+24/72"}
],
"constraints": {
"adam_mode": true,
"style_guides": [
"1 CTA na kreację",
"Język opisowy, bez roszczeń finansowych",
"Proste zdania, 1 myśl na akapit",
"ALT ≤ 120 znaków dla grafik",
"UTM w każdym linku",
"Etykieta [Unverified] + stopka w plikach MD"
],
"channel_rules": {
"meta": {"primary_lte": 125, "headline_lte": 40, "description_lte": 30},
"tiktok": {"hook_words_lte": 8, "desc_lte": 100, "ratio": "9:16"},
"youtube": {"cutdowns": ["6s","15s","30s"], "cta_required": true},
"display": {"sizes": ["1200x628","1080x1080","1080x1920","300x250","300x600","160x600","728x90"]},
"google_rsa": {"headlines": 15, "headline_lte": 30, "descriptions": 4, "description_lte": 90},
"pmax": {"assets_required": ["text","image","video"], "locale": ["pl","en"]}
},
"legal": [
"RODO — brak PII w materiałach",
"Brak obietnic finansowych i porad inwestycyjnych",
"Przejrzystość: jasno komunikowana funkcja napiwku",
"Zgodność z zasadami platform (Meta/TikTok/YouTube/Google Ads/Display)"
],
"technical": {
"safe_area": "zgodnie z wytycznymi platform",
"max_file_weight_mb": 20,
"subtitle_required_for_video": true,
"dark_mode_check": true
},
"banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"]
},
"context_refs": [
{"type":"doc","name":"Tipjar Growth Plan"},
{"type":"doc","name":"Nieliniarna Strategia Marketingowa TipJar+"},
{"type":"doc","name":"SEO/Blog v1.0.1 — claimy i linkowanie"},
{"type":"doc","name":"PR/Newsroom v1.0.1 — key messages/boilerplate"},
{"type":"doc","name":"Support & FAQ — KROK 7/7 (linki)"},
{"type":"doc","name":"KV / miniatury — KROK 4/7 (asset pack)"}
],
"privacy": {"pii": "none", "minimize_context": true},
"kpi_target": {
"ctr_paid": "≥ 1.5% (Display), ≥ 2.0% (Meta/TikTok), ≥ 1.0% (YouTube VTR≥25%)",
"cvr_to_profile": "trend ↑ po Flight#1",
"view_through_rate_yt": "≥ 25% (15s)",
"quality_score_google": "trend ↑ w D+7"
},
"routing_hint": ["Curator","Creative Writer","Video Writer","Evaluator","Freeze"],
"generation": {"max_tokens": 3200, "temperature": 0.5},
"tool_access": {"web_browse": false, "image_gen": true},
"review_policy": {"evaluator_required": true, "human_required": true},
"schedule_hint": {
"flight_1": {"start_iso": "2025-08-20T11:30:00+02:00","end_iso": "2025-08-25T23:59:00+02:00"},
"flight_2": {"start_iso": "2025-08-26T10:00:00+02:00","end_iso": "2025-09-02T23:59:00+02:00"},
"checkpoints": ["T+24","T+72","D+7"]
},
"deadline_iso": "2025-08-19T18:00:00+02:00",
"logs": {"level":"brief","store_artifacts": true}
}

KROK 3. Zapisz plik i uruchom linter JSON — wynik musi być PASS.

KROK 4. Kryteria zakończenia etapu (wszystkie „TAK”):

Plik istnieje: /tipjar-campaigns/starter-packs/taskspec.paid.json.

Treść identyczna jak powyżej (dopuszczalna jedynie zmiana deadline_iso).

Walidacja składni PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 2/6: ROUTE → OrchestrationPlan dla Paid/Kreatywy.

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja zadania Paid/Kreatywy została przygotowana operacyjnie na bazie dotychczasowych reguł kampanii; brak zewnętrznych źródeł.

[Inference] — Limity znaków/formatów i ramy KPI są startowe; będą kalibrowane po Flight#1.

📌 Source & Verification of Response

- [✓ Verified] — Confirmed via official documentation, code, or direct source.
- [Unverified] — Not confirmed; generated output or unsupported by source.
- [Inference] — Reasoned deduction based on known context; not a guarantee. → If applicable: include exact filename, line reference, or source URL.
- [Speculation] — Hypothesis or estimate; not grounded in verified data.