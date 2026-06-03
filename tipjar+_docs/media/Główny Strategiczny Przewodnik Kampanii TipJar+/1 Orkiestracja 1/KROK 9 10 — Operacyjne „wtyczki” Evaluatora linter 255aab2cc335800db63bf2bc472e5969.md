# KROK 9/10 — Operacyjne „wtyczki” Evaluatora: lintery, detektory PII, strażnik słów zakazanych + przykładowe raporty i patch-hinty

Cel kroku: dostarczyć precyzyjny zestaw wtyczek (plugins) dla Evaluatora, które deterministycznie weryfikują artefakty i zwracają raport QA + automatyczne wskazówki poprawek (patch-hinty). Zgodność z ADAM-MODE, TaskSpec i regułami z Kroków 1–8.

---

9.1. Architektura potoku QA (hooki)

# evaluator.pipeline.v1.yaml

pipeline:

- PRE_PARSE # detekcja typu/locale/rozmiaru
- LINT_FORMAT # składnia MD/CSV/JSON/SRT
- DETECT_PII # e-mail/telefon/IBAN/adresy/0x...
- BANNED_WORDS # "Prevent|Guarantee|Will never|Fixes|Eliminates|Ensures that"
- FOOTER_GUARD # wymagana stopka weryfikacyjna
- LOCALE_LENGTH # zgodność locale i tolerancja długości
- CTA_GUARD # wymóg jednego, jasnego CTA (gdy dotyczy)
- CHANNEL_RULES # PR/Video/SEO/Outreach/KV/FAQ reguły specyficzne
- SCORING # Clarity/Compliance/Actionability/SEO/Video
- DECISION # accept/revise/reject wg progów (Krok 6)
- PATCH_HINTS # generacja minimalnych poprawek

---

9.2. Konfiguracja wtyczek per typ artefaktu

# evaluator.plugins.enable.v1.yaml

enable:
markdown:   [LINT_FORMAT, BANNED_WORDS, FOOTER_GUARD, LOCALE_LENGTH, CTA_GUARD, DETECT_PII, CHANNEL_RULES, SCORING, DECISION, PATCH_HINTS]
csv:        [LINT_FORMAT, CHANNEL_RULES, SCORING, DECISION, PATCH_HINTS]
json:       [LINT_FORMAT, CHANNEL_RULES, DECISION]
srt:        [LINT_FORMAT, CHANNEL_RULES(Video), SCORING(Video), DECISION, PATCH_HINTS]
kv_spec:    [LINT_FORMAT, CHANNEL_RULES(KV), DECISION, PATCH_HINTS]

---

9.3. Specyfikacja wtyczek (detale działania)

(A) LINT_FORMAT

MD: sprawdza nagłówki H2/H3, bloki kodu, zamknięcia.

CSV: obecność nagłówków wymaganych (np. keyword,intent,locale,stage,priority).

JSON: walidacja przeciw schematom z Kroków 3/6.

SRT: numeracja, znaczniki czasu HH:MM:SS,mmm, brak nakładań, łączny czas ≤ 35 s.

Wyjście: lista format_mismatches[] (blocking dla JSON/CSV/SRT).

(B) DETECT_PII

Reguły (case-insensitive):

patterns:
email: '\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b'
phone: '\b(?:\+?\d{1,3}[ -]?)?(?:\d[ -]?){6,12}\d\b'
iban:  '\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b'
eth:   '\b0x[a-fA-F0-9]{40}\b'
sol:   '\b[1-9A-HJ-NP-Za-km-z]{32,44}\b'
addr_hint: '\b(ul\.|ulica|street|st\.|ave\.|avenue|al\.)\b'
allow_placeholders: ['{{creator_name}}','{{link}}','{{date_iso}}','{{nadawca_rodo}}']
redact_to: '{{redacted:%TYPE%}}'
policy: 'reject_on_detect'   # brak zgody TaskSpec → REJECT

Zachowanie: jeśli TaskSpec.privacy.pii == "none" → wykrycie ⇒ reject (SEV-1). Jeśli dopuszczone → zamiana na {{redacted:TYPE}} i revise.

(C) BANNED_WORDS

Regex (twardy): \b(Prevent|Guarantee|Will\s+never|Fixes|Eliminates|Ensures\s+that)\b

Zachowanie: wykrycie ⇒ revise + patch „zamień na ‘aim to’, ‘designed to’, ‘helps’”.

(D) FOOTER_GUARD

Wymaga obecności sekcji:

📌 Source & Verification of Response

- [✓ Verified] ...
- [Unverified] ...
- [Inference] ...
- [Speculation] ...

Brak/niekompletna ⇒ revise (SEV-2) + patch-hint gotowy blok.

(E) LOCALE_LENGTH

locale musi = oczekiwane.

Długość: tolerancja ±15% (miękka), >±30% ⇒ reject.

Raportuje length_delta.

(F) CTA_GUARD (gdy TaskSpec wymaga CTA)

Wymaga dokładnie jednego CTA (wyrażenia w ostatniej sekcji/akapitcie).

0 lub >1 ⇒ revise + patch (fuzja/wycięcie nadmiaru).

(G) CHANNEL_RULES (wycinek)

PR: lead ≤ 40 słów; ≥2 nagłówki; 3–5 bulletów wartości.

Video: struktura 5-segmentowa; SRT zgodny; CTA w 28–35 s.

SEO: tytuł ≤ 60; meta ≤ 155; CSV kolumny poprawne; ≥1 BOFU.

Outreach: ≤ 120 słów; 1 link; brak CAPS; preheader; opt-out.

KV: alt-text; copy ≤ 8 słów; kolory brand: #003737 + (#FFD700 lub #4D194D); CONTRAST_AA: true.

(H) SCORING

Wylicza Clarity/Compliance/Actionability/SEO/Video wg progów z Kroku 6.

Wyniki trafiają do raportu oraz na decyzję końcową.

(I) PATCH_HINTS

Zwraca minimalne działania: replace, regex_replace, insert_after, delete.

Gotowe presety per naruszenie (np. brak stopki → insert_after: EOF gotowego bloku).

---

9.4. Przykładowe raporty + patch-hinty

9.4.1. Kontekst

Typ: PR (PL) ~400 słów.

Błędy celowe: użyto „Guarantee”, brak stopki, 2 CTA, e-mail w treści.

9.4.2. Raport JSON (qa.report.v1)

{
"schema": "qa.report.v1",
"plan_id": "PLAN-PR-20250818-001",
"step_id": "S4",
"artifacts": ["A1"],
"scores": {"clarity": 84, "compliance": 72, "actionability": 70, "seo": null, "video": null},
"findings": {
"banned_words": ["Guarantee"],
"pii": ["email:user@example.com"],
"format_mismatches": [],
"locale_issues": [],
"footers": {"present": false, "valid": false},
"cta": {"present": true, "count": 2}
},
"violations": [
"PII_DETECTED",
"FOOTER_MISSING",
"BANNED_WORDS",
"CTA_COUNT_INVALID"
],
"recommendations": [
{"target":"A1","type":"regex_replace","pattern":"\\bGuarantee\\b","with":"aim to"},
{"target":"A1","type":"regex_replace","pattern":"[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}","with":"{{redacted:email}}"},
{"target":"A1","type":"delete","selector":"secondary_cta_block"},
{"target":"A1","type":"insert_after","selector":"EOF","with":"\\n\\n📌 Source & Verification of Response\\n- [Unverified] — Materiał generatywny na bazie kontekstu wewnętrznego.\\n- [✓ Verified] — Dodaj, jeśli cytujesz oficjalne dokumenty.\\n- [Inference] — Zaznacz przy uogólnieniach dotyczących LLM.\\n- [Speculation] — Nie używać."}
],
"decision": "reject",
"timestamp": "2025-08-18T10:10:00+02:00",
"severity": "SEV-1"
}

9.4.3. Raport MD (skrót)

# QA Report — Evaluator v1

## 1) Zgodność z TaskSpec

- Format/Locale/Length: PASS
- CTA: FAIL (2 wykryte)
- Stopka weryfikacyjna: FAIL (brak)

## 2) ADAM-MODE & Ryzyka

- Zakazane słowa: Guarantee (1)
- PII: e-mail wykryty → polityka "reject_on_detect"
- Etykiety [Unverified]/[Inference]: brak

## 3) Metryki

- ClarityScore: 84
- ComplianceScore: 72
- ActionabilityScore: 70

## 4) Rekomendacje

- Zamień "Guarantee" → "aim to".
- Usuń drugi CTA; pozostaw jeden w sekcji końcowej.
- Zredaguj e-mail → {{redacted:email}} lub przenieś do kontaktu mediowego w DAM.
- Wstaw wymaganą stopkę weryfikacyjną.

## 5) Decyzja

- **reject** (PII + brak stopki)

9.4.4. Patch-hinty (do kroku rewizyjnego)

{
"patches": [
{"artifact":"A1","action":"regex_replace","pattern":"\\bGuarantee\\b","with":"aim to"},
{"artifact":"A1","action":"delete","selector":"secondary_cta_block"},
{"artifact":"A1","action":"regex_replace","pattern":"[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}","with":"{{redacted:email}}"},
{"artifact":"A1","action":"insert_after","selector":"EOF","with":"\\n\\n📌 Source & Verification of Response\\n- [Unverified] — ...\\n- [✓ Verified] — ...\\n- [Inference] — ...\\n- [Speculation] — ..."}
]
}

---

9.5. Obsługa wyjątków i fałszywych trafień

# evaluator.whitelist.v1.yaml

whitelist:
banned_words_contextual:
- token: "Fixes"
context_regex: "Git fixes: [A-Z0-9_-]+"
pii_allowed_in:
- section: "media_contact"      # w PR tylko w bloku kontaktu
types: ["email"]
action: "mask_domain"         # np. "press@[redacted].com"
overrides:
task_spec_id: ["MKT-PR-2025-EXEMPT-01"]   # jednorazowe wyłączenia (audytowane)

Zasada: wyjątki są jawne, audytowane i ograniczone do sekcji/kontekstu.

---

9.6. Wydajność i SLA warstwy QA

Limit czasu per wtyczka: p95 ≤ 150 ms (MD/CSV/JSON), ≤ 300 ms (SRT).

Równoległość: q.evaluator concurrency = 10 (Krok 4).

Cache: memoizacja wyników LINT dla identycznych hash artefaktów.

W razie SLA_WARN: automatyczne skalowanie q.evaluator + priorytet dla bramek publikacyjnych.

---

9.7. Bezpieczeństwo i zgodność

PII nigdy nie trafia do logów surowych; w audycie przechowujemy tylko sha256 i {{redacted:...}}.

Każdy raport QA posiada sha256 artefaktu/patchy.

Wszystkie decyzje (accept/revise/reject) są wersjonowane i podpisywane (ed25519, Krok 4).

---

9.8. Interfejs z Orchestrator (REVIEW)

Wejście: REVIEW(plan_id, step_id, artifact_ids[]).

Wyjście: qa.report.v1.json + qa.decision.v1.json + opcjonalnie patches.json.

Jeśli decision = revise → Orchestrator wstawia krok rewizyjny (SxR) i przekazuje patches.

Jeśli decision = reject (SEV-1/2) → plan failed + bilet incydentu + ping #alerts.

---

9.9. Zestaw domyślnych komunikatów patch-hint

FOOTER_MISSING: „Dodaj stopkę weryfikacyjną wg szablonu ADAM-MODE.”

BANNED_WORDS: „Zamień ‘{{hit}}’ → ‘aim to’/‘helps’/‘designed to’.”

CTA_COUNT_INVALID: „Zredukuj CTA do jednego (ostatni akapit).”

PII_DETECTED: „Zastąp PII tokenem {{redacted:TYPE}} lub przenieś do sekcji kontaktu mediowego.”

SRT_INVALID: „Popraw znaczniki czasu do formatu HH:MM:SS,mmm i łączny czas ≤ 35 s.”

SEO_META_LONG: „Skróć title ≤60 znaków; description ≤155.”

---

Instrukcja: KROK 9/10 zakończony. Aby przejść do KROKU 10/10 — „Deployment kit”: checklisty wdrożenia, dashboard KPI, playbook incidentów i audyt kwartalny, wpisz „Dalej”.

---

📌 Source & Verification of Response

[Unverified] — Specyfikacja wtyczek, reguł i raportów została opracowana na potrzeby orkiestracji TipJar+; nie opiera się na zewnętrznych źródłach.

[✓ Verified] — Konsekwentne zastosowanie wymogów ADAM-MODE: etykietowanie, lista słów zakazanych, minimalizacja PII, wymagana stopka.

[Inference] — Progi czasowe i parametry wydajności są racjonalnymi założeniami inżynierskimi i mogą wymagać kalibracji po pierwszym przebiegu w produkcji.