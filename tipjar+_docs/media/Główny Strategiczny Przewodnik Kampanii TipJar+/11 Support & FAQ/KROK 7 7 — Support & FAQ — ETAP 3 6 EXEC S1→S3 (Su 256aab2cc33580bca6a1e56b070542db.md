# KROK 7/7 — Support & FAQ — ETAP 3/6: EXEC S1→S3 (Support Strategist → Helpdesk Writer) + komplet artefaktów draft

KROK 7/7 — Support & FAQ — ETAP 3/6: EXEC S1→S3 (Support Strategist → Helpdesk Writer) + komplet artefaktów draft

Cel etapu: utworzyć CTX1_SUPPORT.md oraz pełny zestaw draftów: FAQ (PL/EN), outline’y KB (PL/EN), szablony KB, makra odpowiedzi (PL/EN), Contact Flows, Escalation Matrix, SLA Policy, Ticket Templates (YAML), Troubleshooting Trees, Redaction Rules, Accessibility Notes, Support Tone Guide, Internal Linking Help, UTM Rules Help, Measurement Spec, Status Page Templates, Glossary. Następnie zaktualizować plan do S4: queued.

---

1. CTX1_SUPPORT.md (≤300 słów)

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/PLAN-SUPPORT-20250819-001/CTX1_SUPPORT.md

[Unverified]

# Context Pack — Support & FAQ — tipjar+

## Teza

Wsparcie ma dawać krótkie, jasne odpowiedzi w języku prostym (B1–B2), bez PII i bez roszczeń finansowych. Preferujemy samopomoc (FAQ/KB), a w razie potrzeby płynne przekazanie do agenta i kontrolowane eskalacje.

## Zakres

- FAQ (PL/EN), artykuły KB i makra odpowiedzi do najczęstszych spraw.
- Scenariusze kontaktu, matryca eskalacji i szablony status page.
- Zasady redakcji (maskowanie PII), dostępność (ALT ≤120, kontrast AA, napisy).

## Zasady

- Jedno zadanie na odpowiedź, 1 CTA, lead ≤ 40 słów.
- Ton uprzejmy i konkretny; krótkie kroki, checklisty i tabele.
- Linkowanie wewn.: 3–5 odnośników KB↔FAQ↔Blog, utm_source=help.

## KPI (operacyjne)

FRT ≤ 60 min, self-service ratio ≥ 35%, CSAT ≥ 90%, trend FCR ↑.

---

1. KB_TEMPLATES_MULTI.md

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/kb/templates/KB_TEMPLATES_MULTI_v1.0.0.md

[Unverified]

## Szablon artykułu KB

**Tytuł (≤60)**

Lead (≤40) — cel i kiedy użyć.

### Krok po kroku

1. …
2. …
3. …

### Tabela szybkich odpowiedzi

| Pytanie | Krótka odpowiedź | Link |
| --- | --- | --- |

### Najczęstsze błędy

- …

### Zobacz też (3 pozycje)

- …
**CTA:** …

## Bloki gotowe

- `hero`: tytuł, lede, CTA
- `steps`: lista kroków (krótko)
- `faq`: 3–5 Q/A na końcu
- `alert`: ostrzeżenie/informacja
- `card`: skrót + CTA

---

1. CONTACT_FLOWS.json

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/flows/CONTACT_FLOWS_v1.0.0.json

{
"schema": "support.contact.flow.v1",
"entrypoints": ["help_center","in_product","email_form"],
"triage": {
"categories": ["account","payments","creator_setup","accessibility","technical","legal"],
"severity": ["S3-low","S2-medium","S1-high"],
"rules": [
{"if":"legal","route":"policy@docs"},
{"if":"S1-high","route":"L2-specialist"},
{"if":"technical AND S1-high","route":"L3-engineering"}
]
},
"paths": [
{"name":"self_service","steps":["search_kb","open_faq","follow_steps","done_or_contact"]},
{"name":"agent_assist","steps":["collect_context_nonPII","suggest_kb_links","give_steps","confirm_resolution"]},
{"name":"escalation","steps":["prepare_ticket","attach_logs_nonPII","handoff_to_L2_or_L3","status_updates","close"]}
],
"handoff": {"SLA_hint_min": 60, "status_values":["open","pending_user","pending_internal","resolved"]}
}

---

1. ESCALATION_MATRIX.json

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/escalation/ESCALATION_MATRIX_v1.0.0.json

{
"schema":"support.escalation.matrix.v1",
"levels":[
{"level":"L1","role":"Helpdesk","scope":"FAQ/KB i standardowe przypadki","criteria":["S3-low","S2-medium"],"target_frt_min":60,"target_resolution_h":24},
{"level":"L2","role":"Specialist","scope":"płatności/creator_setup/edge cases","criteria":["S1-high","compliance_check"],"target_frt_min":30,"target_resolution_h":12},
{"level":"L3","role":"Engineering/Compliance","scope":"błędy techniczne/zgodność","criteria":["incident","security_signal"],"target_frt_min":15,"target_resolution_h":8}
],
"severities":{"S1":"wysoka","S2":"średnia","S3":"niska"},
"communication":{"status_page_required":["incident","maintenance"],"cadence_min":"co 60 min (S1)"}
}

---

1. SLA_POLICY.md

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/policy/SLA_POLICY_v1.0.0.md

[Unverified]

# SLA — cele czasowe i zakres

## Zakres

Dotyczy odpowiedzi na zgłoszenia z kanałów: help center, in-product, email form.

## Definicje

- **FRT** — czas do pierwszej odpowiedzi.
- **MTTR (oper.)** — czas do rozwiązania operacyjnego (zamknięcie lub obejście).

## Cele czasowe (orientacyjne)

- L1: FRT ≤ 60 min; MTTR ≤ 24 h.
- L2: FRT ≤ 30 min; MTTR ≤ 12 h.
- L3: FRT ≤ 15 min; MTTR ≤ 8 h.

## Wyłączenia

Święta i zdarzenia zewnętrzne mogą wydłużyć czas reakcji. Treści i odpowiedzi nie stanowią porad finansowych.

## Komunikacja

Aktualizacje statusu dla S1 co 60 min; dla S2 co 180 min; dla S3 raz dziennie.

---

1. TICKET_TEMPLATES.yaml

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/tickets/TICKET_TEMPLATES_v1.0.0.yaml

schema: support.ticket.templates.v1
templates:
bug_report:
fields: [summary, impact, steps_to_reproduce, expected, observed, attachments, logs_nonPII]
categories: [technical]
severity_default: S2-medium
account_issue:
fields: [summary, account_context_nonPII, screenshots, steps_taken, desired_outcome]
categories: [account]
severity_default: S2-medium
payments_question:
fields: [summary, region, flow_step, screenshots, steps_taken, references]
categories: [payments]
severity_default: S3-low
accessibility_support:
fields: [summary, content_type, caption_status, alt_needed, examples]
categories: [accessibility]
severity_default: S3-low
statuses: [open, pending_user, pending_internal, resolved, retired]

---

1. TROUBLESHOOTING_TREES.json

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/trees/TROUBLESHOOTING_TREES_v1.0.0.json

{
"schema":"support.troubleshooting.v1",
"trees":[
{
"id":"tip_link_not_visible",
"goal":"Użytkownik nie widzi linku „tip”.",
"if_then":[
{"if":"link_missing_on_profile","then":"check_profile_visibility"},
{"if":"visibility_ok","then":"verify_placement_in_bio_or_description"},
{"if":"still_not_visible","then":"clear_cache_try_other_device"},
{"if":"reproducible","then":"open_bug_ticket_L2"}
]
},
{
"id":"cannot_send_tip",
"goal":"Nie można wysłać napiwku.",
"if_then":[
{"if":"error_message_present","then":"capture_message_nonPII"},
{"if":"network_or_region_issue","then":"retry_later_status_page_check"},
{"if":"persists","then":"route_to_L2_payments"}
]
},
{
"id":"captions_missing",
"goal":"Brak napisów do wideo.",
"if_then":[
{"if":"video_has_no_captions","then":"provide_caption_guide_link"},
{"if":"captions_uploaded_but_not_showing","then":"check_format_length_sync"},
{"if":"still_issue","then":"collect_example_url_nonPII_and_escalate_L1→L2"}
]
}
]
}

---

1. REDACTION_RULES.json

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/redaction/REDACTION_RULES_v1.0.0.json

{
"schema":"support.redaction.v1",
"patterns":[
{"name":"email","regex":"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}","mask":"email:redacted"},
{"name":"phone","regex":"\\+?[0-9][0-9\\-\\s]{6,}[0-9]","mask":"phone:redacted"},
{"name":"iban","regex":"[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}","mask":"iban:redacted"},
{"name":"eth_address","regex":"0x[a-fA-F0-9]{40}","mask":"wallet:redacted"},
{"name":"ip_address","regex":"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b","mask":"ip:redacted"}
],
"actions":{"on_detect":["mask_in_reply","store_aggregate_flag_only"]}
}

---

1. ACCESSIBILITY_NOTES_HELP.md

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/a11y/ACCESSIBILITY_NOTES_HELP_v1.0.0.md

[Unverified]

- Obrazy: ALT ≤ 120 znaków, opis informacyjny.
- Kontrast elementów co najmniej AA.
- Wideo: napisy; krótkie linie, czytelny font.
- Język prosty (B1–B2), krótkie zdania.
- Linki opisowe („Dodaj link ‘tip’”), nie „kliknij tutaj”.

---

1. SUPPORT_TONE_GUIDE.md

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/tone/SUPPORT_TONE_GUIDE_v1.0.0.md

[Unverified]

- Uprzejmie, konkretnie, bez żargonu.
- Jedno zadanie na wiadomość; 1 CTA.
- Struktura: podsumowanie → kroki 1–3 → „Zobacz też”.
- Unikaj zdań obiecujących wyniki.
- Zawsze sprawdzaj, czy w treści nie ma PII.

---

1. INTERNAL_LINKING_HELP.md

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/linking/INTERNAL_LINKING_HELP_v1.0.0.md

[Unverified]

- Każdy dokument: 3–5 linków wewnętrznych (KB↔FAQ↔Blog).
- Układ hub↔spoke; sekcja „Zobacz też” (3 pozycje).
- Anchory opisowe powiązane z intencją użytkownika.

---

1. UTM_RULES_HELP.md

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/utm/UTM_RULES_HELP_v1.0.0.md

[Unverified]
utm_source: help

utm_medium: docs

utm_campaign: kb_2025_{topic}

utm_content: {locale}*{slug}*{section}

**Przykład:** [https://tipjar.plus/pl/help/jak-dodac-link-tip?utm_source=help&utm_medium=docs&utm_campaign=kb_2025_creator_setup&utm_content=pl_jak-dodac-link-tip_steps](https://tipjar.plus/pl/help/jak-dodac-link-tip?utm_source=help&utm_medium=docs&utm_campaign=kb_2025_creator_setup&utm_content=pl_jak-dodac-link-tip_steps)

---

1. MEASUREMENT_SPEC.json

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/metrics/MEASUREMENT_SPEC_v1.0.0.json

{
"schema":"support.measurement.v1",
"kpi_targets":{
"frt_min_lte":60,
"fcr_trend":"up",
"self_service_ratio_pct_gte":35,
"csat_avg_pct_gte":90,
"kb_click_through_pct_gte":6
},
"events":{
"ticket_created":["ts","channel","category","severity"],
"first_response":["ts","ticket_id","minutes_from_create"],
"ticket_closed":["ts","ticket_id","resolution_code"],
"csat_response":["ts","ticket_id","score_pct"],
"kb_click":["ts","doc","from_page"]
},
"receipts":{
"daily_rollup":"dam://campaigns/launch2025/support/metrics/{YYYY}/{MM}/{DD}/ROLLUP.json",
"kpi_review":"dam://campaigns/launch2025/support/review/{YYYY}/{MM}/{DD}/REVIEW.json"
},
"privacy":{"pii":"none","aggregate_only":true}
}

---

1. GLOSSARY_SUPPORT.md

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/glossary/GLOSSARY_SUPPORT_v1.0.0.md

[Unverified]

- **FRT** — czas do pierwszej odpowiedzi.
- **FCR** — rozwiązanie przy pierwszym kontakcie.
- **CSAT** — ocena satysfakcji.
- **ALT** — tekst alternatywny obrazu (≤120).
- **CTA** — wezwanie do działania w odpowiedzi/dokumencie.

---

1. SUPPORT_FAQ_PL.md (12 Q/A)

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/faq/pl/SUPPORT_FAQ_PL_v1.0.0.md

[Unverified]

1. **Czym jest tipjar+?**
    
    To sposób na szybkie docenienie twórców online.
    
2. **Czy udzielacie porad finansowych?**
    
    Nie. Opisujemy doświadczenie użytkownika i dostępność.
    
3. **Jak dodać link „tip”?**
    
    Skorzystaj z przewodnika KB „Dodaj link ‘tip’ w bio/opisie”.
    
4. **Nie widzę przycisku „tip”. Co zrobić?**
    
    Sprawdź ustawienia profilu i umiejscowienie linku; jeśli nadal problem — artykuł KB „Link niewidoczny”.
    
5. **Czy mogę wesprzeć bez przerywania oglądania?**
    
    Tak — zobacz poradnik „Szybkie wsparcie widza”.
    
6. **Czy potrzebujecie moich danych osobowych?**
    
    Nie. Nie prosimy o PII w zgłoszeniach.
    
7. **Jak włączyć napisy do wideo?**
    
    Przejrzyj KB „Napisy — podstawy i format”.
    
8. **Czy linki z pomocy mają UTM?**
    
    Tak, `utm_source=help`, `utm_medium=docs`.
    
9. **Gdzie znajdę skrócone odpowiedzi?**
    
    W FAQ i tabelach „Szybkie odpowiedzi” w KB.
    
10. **Jak zgłosić błąd techniczny?**
    
    Użyj szablonu „bug_report” i dołącz kroki odtworzenia (bez PII).
    
11. **Kiedy aktualizujecie status?**
    
    Dla S1 co 60 min; komunikaty na stronie statusu.
    
12. **Jak skontaktować się z agentem?**
    
    W formularzu wybierz „Porozmawiaj z agentem” po przejściu kroków samopomocy.
    

---

1. SUPPORT_FAQ_EN.md (12 Q/A)

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/faq/en/SUPPORT_FAQ_EN_v1.0.0.md

[Unverified]

1. **What is tipjar+?**
    
    A quick way to appreciate creators online.
    
2. **Do you provide financial advice?**
    
    No. We describe user experience and accessibility only.
    
3. **How do I add the “tip” link?**
    
    Open KB guide “Add the ‘tip’ link in bio/description”.
    
4. **I can’t see the “tip” button.**
    
    Check profile visibility and placement; see KB “Link not visible”.
    
5. **Can I support without interrupting the watch?**
    
    Yes — see “Quick support for viewers”.
    
6. **Do you require my personal data?**
    
    No. Please avoid PII in tickets.
    
7. **How to enable video captions?**
    
    Read KB “Captions — basics and format”.
    
8. **Do Help links include UTM?**
    
    Yes, `utm_source=help`, `utm_medium=docs`.
    
9. **Where are short answers?**
    
    In FAQ and “Quick answers” tables in KB.
    
10. **How to report a technical bug?**
    
    Use “bug_report” template and include steps to reproduce (no PII).
    
11. **How often do you update status?**
    
    S1 hourly; updates posted on the status page.
    
12. **How to reach an agent?**
    
    Choose “Contact an agent” after self-service steps.
    

---

1. KB_OUTLINES_PL.md (10)

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/kb/pl/KB_OUTLINES_PL_v1.0.0.md

[Unverified]

1. Dodaj link „tip” w bio/opisie — cel, kroki, błędy, zobacz też
2. Link „tip” niewidoczny — checklista widoczności, urządzenia, cache
3. Napisy do wideo — format, długość linii, synchronizacja
4. ALT w 120 znakach — przykłady, wzory, najczęstsze błędy
5. Miniatury z czytelnym CTA — rozmiary, kontrast AA, test A/B
6. Szybkie wsparcie widza — 3 kroki + powrót do treści
7. UTM w pomocy — wzorce i przykłady
8. Tabela „Szybkie odpowiedzi” — jak tworzyć i utrzymywać
9. Zgłoszenie błędu — szablon, dobre praktyki (bez PII)
10. Strona statusu — typy komunikatów i kiedy publikować

---

1. KB_OUTLINES_EN.md (10)

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/kb/en/KB_OUTLINES_EN_v1.0.0.md

[Unverified]

1. Add the “tip” link in bio/description — goal, steps, pitfalls, see also
2. “Tip” link not visible — visibility checklist, devices, cache
3. Video captions — format, line length, sync
4. ALT in 120 characters — examples and patterns
5. Thumbnails with clear CTA — sizes, AA contrast, A/B test
6. Quick viewer support — 3 steps + return to content
7. Help UTM rules — patterns and examples
8. “Quick answers” table — how to design and maintain
9. Reporting a bug — template and best practices (no PII)
10. Status page — message types and when to post

---

1. SUPPORT_MACROS_PL.md (≥20)

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/macros/pl/SUPPORT_MACROS_PL_v1.0.0.md

[Unverified]
**Użycie:** Kopiuj-wklej, wypełnij `{{link}}`, `{{kroki}}`, nie dodawaj PII.

1. Witaj + samopomoc
    
    Cześć! Poniżej szybkie kroki: {{kroki}}. Jeśli potrzebujesz agenta, użyj {{link}}.
    
2. Link „tip” — przewodnik
    
    Oto przewodnik: {{link}}. Przejdź kroki i daj znać, co widzisz.
    
3. Link niewidoczny — checklista
    
    Sprawdź te punkty: {{kroki}}. Jeśli dalej problem, wypełnij formularz: {{link}}.
    
4. Napisy — jak włączyć
    
    Instrukcje znajdziesz tutaj: {{link}}. Po wdrożeniu sprawdź podgląd.
    
5. ALT — krótkie zasady
    
    Opisuj obraz w ≤120 znakach. Przykłady: {{link}}.
    
6. Miniatury — CTA
    
    Skorzystaj z checklisty: {{link}}. Zwróć uwagę na kontrast AA.
    
7. UTM w pomocy
    
    Wzorzec: `utm_source=help&utm_medium=docs`. Całość: {{link}}.
    
8. Zgłoszenie błędu — szablon
    
    Użyj „bug_report” i dodaj kroki odtworzenia (bez PII): {{link}}.
    
9. Status — gdzie sprawdzić
    
    Aktualizacje publikujemy tutaj: {{link}}.
    
10. Szybkie wsparcie widza
    
    3 kroki wsparcia: {{kroki}}. Przewodnik: {{link}}.
    
11. Prośba o zrzut ekranu
    
    Dodaj zrzut ekranu bez danych wrażliwych. Instrukcja: {{link}}.
    
12. Cache i inne urządzenie
    
    Wyczyść cache/przeglądarkę lub spróbuj na innym urządzeniu. Kroki: {{link}}.
    
13. Hreflang/wersja językowa
    
    Wybierz wersję PL/EN u góry artykułu. Link: {{link}}.
    
14. Potwierdzenie kroków
    
    Dziękujemy! Czy wdrożono: {{lista_kroków}}?
    
15. Zamknięcie z opcją ponownego otwarcia
    
    Zamykam zgłoszenie. Możesz je ponownie otworzyć, odpowiadając wątkiem.
    
16. Eskalacja do L2
    
    Przekazuję sprawę do specjalisty. Odezwiemy się po analizie.
    
17. Płatności — ogólne info
    
    Opis przepływu: {{link}}. Bez danych osobowych w zgłoszeniu.
    
18. Dostępność — przypomnienie
    
    Pamiętaj o napisach i ALT ≤120. Poradnik: {{link}}.
    
19. Błąd techniczny — logi
    
    Dołącz logi bez PII (czas, krok). Wzór: {{link}}.
    
20. Podsumowanie rozwiązania
    
    Podsumowanie działań: {{kroki}}. Daj znać, czy pomogło.
    

---

1. SUPPORT_MACROS_EN.md (≥20)

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/macros/en/SUPPORT_MACROS_EN_v1.0.0.md

[Unverified]
**Usage:** Copy-paste, fill `{{link}}`, `{{steps}}`, avoid PII.

1. Hello + self-service
    
    Hi! Quick steps: {{steps}}. If you need an agent, use {{link}}.
    
2. “Tip” link — guide
    
    Here’s the guide: {{link}}. Follow the steps and tell us what you see.
    
3. Link not visible — checklist
    
    Check these points: {{steps}}. If it persists, submit: {{link}}.
    
4. Captions — enable
    
    Instructions: {{link}}. Preview after applying.
    
5. ALT — quick rules
    
    Describe images in ≤120 chars. Examples: {{link}}.
    
6. Thumbnails — CTA
    
    Use this checklist: {{link}}. Mind AA contrast.
    
7. Help UTM
    
    Pattern: `utm_source=help&utm_medium=docs`. Details: {{link}}.
    
8. Bug report — template
    
    Use “bug_report” and include repro steps (no PII): {{link}}.
    
9. Status page — where
    
    Updates are posted here: {{link}}.
    
10. Quick viewer support
    
    3 steps to support: {{steps}}. Guide: {{link}}.
    
11. Screenshot request
    
    Add a screenshot without sensitive data. How-to: {{link}}.
    
12. Clear cache / other device
    
    Clear cache or try another device. Steps: {{link}}.
    
13. Language / hreflang
    
    Switch PL/EN at the top. Link: {{link}}.
    
14. Steps confirmation
    
    Thanks! Did you complete: {{steps_list}}?
    
15. Soft close with reopen
    
    Closing this ticket; reply to reopen if needed.
    
16. Escalation to L2
    
    We’re handing this to a specialist. We’ll follow up after review.
    
17. Payments — general info
    
    Flow overview: {{link}}. Do not include personal data.
    
18. Accessibility reminder
    
    Use captions and ALT ≤120. Guide: {{link}}.
    
19. Technical logs
    
    Attach logs without PII (time, step). Template: {{link}}.
    
20. Resolution summary
    
    Summary of actions: {{steps}}. Let us know if it helped.
    

---

1. STATUS_PAGE_TEMPLATES.md

Ścieżka: /tipjar-campaigns/.artifacts/draft/support/status/STATUS_PAGE_TEMPLATES_v1.0.0.md

[Unverified]

### INCIDENT

**[godz.:min CEST]** Zauważyliśmy problem wpływający na **{{obszar}}**. Pracujemy nad rozwiązaniem. Następna aktualizacja ok. **+60 min**.

### MAINTENANCE

**[godz.:min CEST]** Zaplanowana konserwacja **{{obszar}}**. Krótkie przerwy mogą wystąpić w oknie **{{okno}}**.

### RESOLVED

**[godz.:min CEST]** Zdarzenie **{{id}}** uznane za rozwiązane. Jeśli zauważysz nieprawidłowości, daj znać poprzez formularz pomocy.

---

1. Patch plan.support.json po EXEC (S1,S2,S3 → done; S4 → queued)

Plik: /tipjar-campaigns/starter-packs/plan.support.json

{
"patches": [
{"op":"replace","path":"/steps/0/status","value":"done"},
{"op":"replace","path":"/steps/0/attempts","value":1},
{"op":"add","path":"/steps/0/produced","value":["CTX1_SUPPORT"]},

```
{"op":"replace","path":"/steps/1/status","value":"done"},
{"op":"replace","path":"/steps/1/attempts","value":1},
{"op":"add","path":"/steps/1/produced","value":[
  "KB_TEMPLATES_MULTI","CONTACT_FLOWS","ESCALATION_MATRIX","SLA_POLICY",
  "TICKET_TEMPLATES","TROUBLESHOOTING_TREES","REDACTION_RULES",
  "ACCESSIBILITY_NOTES_HELP","SUPPORT_TONE_GUIDE","INTERNAL_LINKING_HELP",
  "UTM_RULES_HELP","MEASUREMENT_SPEC","GLOSSARY_SUPPORT"
]},

{"op":"replace","path":"/steps/2/status","value":"done"},
{"op":"replace","path":"/steps/2/attempts","value":1},
{"op":"add","path":"/steps/2/produced","value":[
  "SUPPORT_FAQ_PL","SUPPORT_FAQ_EN",
  "KB_OUTLINES_PL","KB_OUTLINES_EN",
  "SUPPORT_MACROS_PL","SUPPORT_MACROS_EN",
  "STATUS_PAGE_TEMPLATES"
]},

{"op":"replace","path":"/steps/3/status","value":"queued"}

```

]
}

---

1. Kryteria zakończenia ETAPU 3/6 (musi być „TAK”)

Artefakty istnieją w ścieżkach draft i zawierają powyższą treść.

plan.support.json: S1=done, S2=done, S3=done, S4=queued.

Każdy materiał: 1 CTA (gdzie dotycz