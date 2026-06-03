# KROK 7/7 — Support & FAQ — ETAP 1/6: Utwórz TaskSpec (FAQ, KB, makra odpowiedzi, eskalacje, PII/redakcja, tone guide, dostępność, metryki, status)

Cel etapu: przygotować kompletny TaskSpec dla paczki Support & FAQ tak, aby Orkiestrator mógł zbudować plan i uruchomić EXEC → REVIEW → FREEZE → Publikację.

---

Wykonaj dokładnie te czynności

KROK 1. Utwórz plik:

/tipjar-campaigns/starter-packs/taskspec.support.json

KROK 2. Wklej poniższą zawartość (nie zmieniaj nazw kluczy ani struktury):

{
"task_id": "MKT-SUPPORT-20250819-001",
"objective": "Zbudować kompletny pakiet Support & FAQ: wielojęzyczne FAQ (PL/EN), outline’y i szablony artykułów KB, makra odpowiedzi (PL/EN), matryca eskalacji i SLA, scenariusze kontaktu oraz rozwiązywania problemów, zasady redakcji/PII/redakcji danych, wytyczne dostępności i tonu, status page templates, spec pomiaru jakości wsparcia — zgodnie z ADAM-MODE.",
"persona": "Użytkownicy (twórcy i widzowie) potrzebujący krótkich, jasnych odpowiedzi; agenci supportu pracujący na makrach; redaktorzy KB.",
"outputs": [
{"type":"markdown","id":"SUPPORT_FAQ_PL","length":"10–15 Q/A","locale":"pl","desc":"FAQ ogólne (produkt/dostępność/USDC) — z [Unverified] i stopką weryfikacyjną"},
{"type":"markdown","id":"SUPPORT_FAQ_EN","length":"10–15 Q/A","locale":"en","desc":"General FAQ (product/accessibility/USDC) — with [Unverified] label and verification footer"},
{"type":"markdown","id":"KB_OUTLINES_PL","length":"10–12 outline’ów","locale":"pl","desc":"Struktury artykułów pomocy (cel, kroki, checklisty, linki)"},
{"type":"markdown","id":"KB_OUTLINES_EN","length":"10–12 outlines","locale":"en","desc":"Help article structures (goal, steps, checklists, links)"},
{"type":"markdown","id":"KB_TEMPLATES_MULTI","length":"zestaw","locale":"multi","desc":"Szablony MD: hero, kroki, tabele, FAQ-sekcja, ostrzeżenia"},
{"type":"markdown","id":"SUPPORT_MACROS_PL","length":"zestaw","locale":"pl","desc":"Makra odpowiedzi dla najczęstszych spraw (PII-free, 1 CTA)"},
{"type":"markdown","id":"SUPPORT_MACROS_EN","length":"set","locale":"en","desc":"Response macros for common cases (PII-free, 1 CTA)"},
{"type":"json","id":"CONTACT_FLOWS","desc":"Scenariusze kontaktu: wybór ścieżki, triage, samopomoc → agent → eskalacja"},
{"type":"json","id":"ESCALATION_MATRIX","desc":"Matryca eskalacji (poziomy, role, kryteria, czasy reakcji)"},
{"type":"markdown","id":"SLA_POLICY","length":"1–2 strony","locale":"multi","desc":"SLA na odpowiedź i domknięcie — bez deklaracji wynikowych; wyjątki"},
{"type":"yaml","id":"TICKET_TEMPLATES","desc":"Szablony zgłoszeń (pola, kategorie, tagi, kroki odtworzenia, logi)"},
{"type":"markdown","id":"STATUS_PAGE_TEMPLATES","length":"zestaw","locale":"multi","desc":"Komunikaty statusowe (INCIDENT/MAINTENANCE/RESOLVED)"},
{"type":"json","id":"TROUBLESHOOTING_TREES","desc":"Drzewa diagnostyczne (if/then) dla typowych problemów — bez PII"},
{"type":"json","id":"REDACTION_RULES","desc":"Zasady redakcji/usuwania PII w treściach/zgłoszeniach (patterny, maskowanie)"},
{"type":"markdown","id":"ACCESSIBILITY_NOTES_HELP","length":"poradnik","locale":"multi","desc":"Wytyczne dostępności (ALT ≤120, kontrast AA, napisy, plain language)"},
{"type":"markdown","id":"SUPPORT_TONE_GUIDE","length":"poradnik","locale":"multi","desc":"Ton wsparcia: uprzejmy, zwięzły, B1–B2; 1 zadanie na odpowiedź; 1 CTA"},
{"type":"markdown","id":"UTM_RULES_HELP","length":"spec","locale":"multi","desc":"UTM dla linków z pomocy/FAQ (source=help, medium=docs, campaign=kb_2025_… )"},
{"type":"markdown","id":"INTERNAL_LINKING_HELP","length":"spec","locale":"multi","desc":"Zasady linkowania wewnętrznego KB↔FAQ↔Blog (3–5 linków/artykuł)"},
{"type":"markdown","id":"GLOSSARY_SUPPORT","length":"słownik","locale":"multi","desc":"Słownik pojęć pomocy (produkt/dostępność/USDC)"},
{"type":"json","id":"MEASUREMENT_SPEC","desc":"Spec metryk jakości wsparcia (CSAT, FRT, FCR, self-service ratio) + format paragonów"}
],
"constraints": {
"adam_mode": true,
"style_guides": [
"Plain language (B1–B2), zdania krótkie; 1 cel/akapit",
"Lead ≤ 40 słów; 1 CTA na odpowiedź/artykuł",
"ALT dla obrazów ≤ 120 znaków; kontrast ≥ AA; wideo z napisami",
"Zakaz PII w treściach i przykładach; przykłady z danymi fikcyjnymi",
"Etykieta [Unverified] + stopka weryfikacyjna w plikach MD",
"Unikać roszczeń finansowych; USDC wyłącznie opisowo"
],
"channel_rules": {
"faq":{"count_min":10,"count_max":15},
"article":{"min_words":700,"max_words":1200},
"macro":{"count_min":20},
"linking":{"internal_per_doc_min":3,"internal_per_doc_max":5},
"status":{"types":["INCIDENT","MAINTENANCE","RESOLVED"]}
},
"legal": [
"RODO — brak PII w treściach i metadanych; redakcja wg REDACTION_RULES",
"Brak porad inwestycyjnych i roszczeń finansowych",
"Jasne oznaczenie materiałów jako informacyjnych"
],
"technical": {
"hreflang_pl_en": true,
"canonical_required": true,
"og_required": true,
"sitemap_update_required": true,
"reading_level_hint": "B1–B2",
"json_schemas_required": ["CONTACT_FLOWS","ESCALATION_MATRIX","TROUBLESHOOTING_TREES","MEASUREMENT_SPEC"]
},
"banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"]
},
"context_refs": [
{"type":"doc","name":"TipJar+ – Kompleksowy Plan Architektury i Realizacji Projektu"},
{"type":"doc","name":"Strategia uruchomienia i skalowania platformy TipJar_plus do 100 mln użytkowników w 12 miesięcy"},
{"type":"doc","name":"Paid/Kreatywy v1.0.1 — hooki i CTA"},
{"type":"doc","name":"SEO/Blog v1.0.1 — adresacja tematów i linkowanie"},
{"type":"doc","name":"Support & FAQ — mapy kontaktów (ten Krok 7/7)"}
],
"privacy": {"pii": "none", "minimize_context": true, "redaction_rules_ref": "REDACTION_RULES"},
"kpi_target": {
"first_response_time_min_lte": 60,
"first_contact_resolution_pct": "trend ↑",
"self_service_ratio_pct": "≥ 35",
"kb_click_through_pct": "≥ 6",
"csat_avg_pct": "≥ 90"
},
"routing_hint": ["Support Strategist","Helpdesk Writer","Localization","Editor","Evaluator","Freeze"],
"generation": {"max_tokens": 3600, "temperature": 0.4},
"tool_access": {"web_browse": false, "image_gen": false},
"review_policy": {"evaluator_required": true, "human_required": true},
"schedule_hint": {
"sprint_1": {"start_iso":"2025-08-20T13:30:00+02:00","end_iso":"2025-09-03T18:00:00+02:00"},
"sprint_2": {"start_iso":"2025-09-04T09:00:00+02:00","end_iso":"2025-09-18T18:00:00+02:00"},
"checkpoints": ["D0","D+7","D+14","D+30"]
},
"deadline_iso": "2025-08-19T19:30:00+02:00",
"logs": {"level":"brief","store_artifacts": true}
}

KROK 3. Zapisz plik i uruchom linter JSON — wynik musi być PASS.

KROK 4. Kryteria zakończenia etapu (wszystkie „TAK”):

Plik istnieje: /tipjar-campaigns/starter-packs/taskspec.support.json.

Treść identyczna jak powyżej (dopuszczalna jedynie zmiana deadline_iso).

Walidacja składni PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 2/6: ROUTE → OrchestrationPlan dla Support & FAQ.

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja Support & FAQ to wewnętrzny standard operacyjny oparty na dotychczasowych wytycznych kampanii; brak źródeł zewnętrznych.

[Inference] — Zakres, KPI i role dobrane pod szybkie uruchomienie KB+FAQ z ochroną PII; kalibracja po pierwszych odczytach „self-service” i CSAT.

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