# KROK 3/7 — E-mail/Outreach — ETAP 1/6: Utwórz TaskSpec (newsletter + sekwencje 1:1)

Cel etapu: przygotować kompletny TaskSpec dla paczki E-mail/Outreach (newsletter PL/EN + sekwencje 1:1 do twórców i partnerów), aby Orkiestrator mógł zbudować plan i uruchomić EXEC → REVIEW → FREEZE → Publikacja.

---

Wykonaj dokładnie te czynności

1. Utwórz plik

/tipjar-campaigns/starter-packs/taskspec.email.json

1. Wklej poniższą zawartość (bez zmian w strukturze kluczy):

{
"task_id": "MKT-EMAIL-20250818-001",
"objective": "Stworzyć pakiet e-mail: newsletter produktowy (PL/EN) oraz dwie sekwencje outreach 1:1 (twórcy, partnerzy) z follow-upem, zgodnie z ADAM-MODE i zasadami anty-spam.",
"persona": "Twórcy wideo/streamerzy 18–34 (PL/EN), partnerzy/marki (EN), odbiorcy mobilni.",
"outputs": [
{"type":"markdown","id":"NEWSLETTER_PL","length":"≤120 słów","locale":"pl","desc":"newsletter produktowy — treść"},
{"type":"markdown","id":"NEWSLETTER_EN","length":"≤120 słów","locale":"en","desc":"newsletter product — content"},
{"type":"markdown","id":"OUTREACH_CREATORS_PL_STEP1","length":"≤120 słów","locale":"pl","desc":"e-mail 1:1 do twórców — krok 1"},
{"type":"markdown","id":"OUTREACH_CREATORS_PL_STEP2","length":"≤90 słów","locale":"pl","desc":"follow-up po 48 h"},
{"type":"markdown","id":"OUTREACH_CREATORS_EN_STEP1","length":"≤120 słów","locale":"en","desc":"creator outreach — step 1"},
{"type":"markdown","id":"OUTREACH_CREATORS_EN_STEP2","length":"≤90 słów","locale":"en","desc":"follow-up after 48h"},
{"type":"markdown","id":"OUTREACH_PARTNERS_EN_STEP1","length":"≤130 słów","locale":"en","desc":"partner co-marketing — step 1"},
{"type":"markdown","id":"OUTREACH_PARTNERS_EN_STEP2","length":"≤100 słów","locale":"en","desc":"follow-up after 48h"},
{"type":"json","id":"SUBJECTS_PREHEADERS","desc":"zestaw tematów i preheaderów (PL/EN)"},
{"type":"markdown","id":"LINKS_UTM_PACK","desc":"linki z UTM (landing/help) do wklejenia w treści"}
],
"constraints": {
"adam_mode": true,
"style_guides": [
"1 CTA w każdej wiadomości",
"Proste zdania, 1 myśl na akapit",
"Brak CAPS (poza akronimami), brak emoji w temacie",
"ALT dla grafik (≤120 znaków), jeśli użyte",
"UTM w linkach do produktu i pomocy",
"Stopka opt-out (unsubscribe) obowiązkowa"
],
"channel_rules": {
"subject_lte_chars": 48,
"preheader_lte_chars": 90,
"body_lte_words": 120,
"max_links": 2,
"images_optional": true,
"attachments": "forbidden"
},
"legal": [
"RODO (PII minimalizacja)",
"Brak obietnic finansowych",
"Dane nadawcy i adres korespondencyjny w stopce",
"Link do rezygnacji (unsubscribe)"
],
"tech_requirements": {
"spf_dkim_dmarc": true,
"list_cleaning_required": true,
"send_throttling": "enabled",
"mobile_preview": true
},
"banned_words": ["Prevent","Guarantee","Will never","Fixes","Eliminates","Ensures that"]
},
"context_refs": [
{"type":"doc","name":"Tipjar Growth Plan"},
{"type":"doc","name":"Nieliniarna Strategia Marketingowa TipJar+"},
{"type":"doc","name":"KV / miniatury — KROK 4/7"},
{"type":"doc","name":"Support & FAQ — KROK 7/7 (linki w treści)"}
],
"privacy": {
"pii": "minimal",
"allowed_placeholders": ["{{first_name}}","{{company}}","{{creator_handle}}"],
"minimize_context": true
},
"kpi_target": {
"open_rate": "≥ 30% (newsletter)",
"ctr": "≥ 2.5% (newsletter) / ≥ 4.0% (outreach)",
"reply_rate": "≥ 8% (outreach)"
},
"routing_hint": ["Curator","Email Writer","Evaluator","Freeze"],
"generation": {"max_tokens": 1200, "temperature": 0.5},
"tool_access": {"web_browse": false, "image_gen": false},
"review_policy": {"evaluator_required": true, "human_required": true},
"schedule_hint": {
"newsletter": "środa 11:00 Europe/Brussels",
"outreach_windows": ["wt 10:00–12:00","czw 17:00–19:00 Europe/Brussels"],
"follow_up_delay_hours": 48
},
"deadline_iso": "2025-08-19T18:00:00+02:00",
"logs": {"level":"brief","store_artifacts": true}
}

1. Zapisz plik i uruchom linter JSON — wynik musi być PASS.
2. Kryteria zakończenia etapu (wszystkie „TAK”)

Plik istnieje: /tipjar-campaigns/starter-packs/taskspec.email.json.

Treść identyczna jak powyżej (możesz dostosować deadline_iso).

Walidacja składni PASS.

---

Napisz „Dalej”, a przejdę do ETAPU 2/6: ROUTE → OrchestrationPlan dla E-mail/Outreach.

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja zadania E-mail/Outreach opracowana na bazie wcześniejszych ustaleń w tej rozmowie; brak źródeł zewnętrznych.

[✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, słowa ryzykowne (guard), 1 CTA, minimalizacja PII, opt-out, UTM, zakaz załączników.

[Inference] — Sloty i progi KPI są wartościami startowymi do kalibracji po pierwszych wysyłkach.

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