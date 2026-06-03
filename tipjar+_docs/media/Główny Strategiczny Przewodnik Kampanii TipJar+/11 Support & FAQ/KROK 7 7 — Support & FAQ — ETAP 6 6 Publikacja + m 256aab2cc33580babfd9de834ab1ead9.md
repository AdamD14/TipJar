# KROK 7/7 — Support & FAQ — ETAP 6/6: Publikacja + monitoring — KROK 3/3: D+7 / D+30 — przeglądy KPI, działania, paragonizacja decyzji i zamknięcie pętli

Cel kroku: wykonać przeglądy D+7 i D+30 wg monitoring.support.json, zapisać decyzje oraz — jeśli wymagane — uruchomić działania korygujące (makra/KB/ton) i zarejestrować artefakty. Poniżej pojedyncza sekwencja do wykonania.

---

1. D+7 — wykonaj przegląd KPI i zapisz decyzje

1.1 Plik metryk (wejście):
dam://campaigns/launch2025/support/metrics/2025/08/26/ROLLUP_D+7.json
(struktura jak w ROLLUP_D+1; wypełnij rzeczywistymi agregatami bez PII).

1.2 Ewaluacja wg reguł (z monitoring.support.json):

Jeśli self_service_ratio_pct < 35 → akcja: add_kb_links_in_macros_and_top_faq_update.

Jeśli kb_click_through_pct < 6 → akcja: improve_titles_and_cta_in_kb.

1.3 Zapis przeglądu:
Ścieżka:

dam://campaigns/launch2025/support/review/2025/08/26/REVIEW_D+7.json

Treść (wypełnij result = "action" lub "observe" i dodaj notatki):

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"window": "D+7",
"ts": "2025-08-26T10:15:00+02:00",
"rules_evaluated": [
{"rule":"self_service_ratio_pct<35","result":"<action|observe>","action":"add_kb_links_in_macros_and_top_faq_update"},
{"rule":"kb_click_through_pct<6","result":"<action|observe>","action":"improve_titles_and_cta_in_kb"}
],
"decisions": [],
"notes": "<krótko, bez PII>"
}

1.4 Paragon decyzji D+7 (zbiorczo):
Ścieżka:

dam://campaigns/launch2025/support/review/2025/08/26/DECISION_D+7.json

Treść:

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"ts": "2025-08-26T10:20:00+02:00",
"window": "D+7",
"actions": [
{"id":"MACRO_LINKING_ENHANCE","when":"self_service_ratio_pct<35","do":"inject_kb_links_into_top_10_macros","owner":"Helpdesk Writer","deadline":"2025-08-28"},
{"id":"KB_TITLES_CTA_REFRESH","when":"kb_click_through_pct<6","do":"retitle_top5_kb_add_clear_cta","owner":"Helpdesk Writer","deadline":"2025-08-29"}
]
}

---

1. Działania korygujące po D+7 (twórz tylko gdy reguły wskazały „action”)

2.1 Patch makr — wstrzyknięcie linków KB (bundle):
Ścieżka:

dam://campaigns/launch2025/support/macros/patches/2025/08/28/MACROS_PATCH_links_top10_v1.0.0.md

Treść:

[Unverified]

- Dla 10 najczęstszych makr dodano sekcję „Zobacz też” (3 linki KB/FAQ/Blog).
- Ujednolicono CTA (1 szt.) i anchor teksty opisowe.

2.2 Odświeżenie tytułów/CTA w KB (jeśli CTR<6):
Ścieżka:

dam://campaigns/launch2025/support/kb/patches/2025/08/29/KB_TITLES_CTA_REFRESH_top5_v1.0.0.md

Treść:

[Unverified]

- Zmieniono tytuły 5 artykułów KB (plain language, ≤60 znaków).
- Dodano wyraźne CTA w sekcji hero i na końcu (1 szt.).

2.3 Paragony wdrożenia działań (internal):

dam://campaigns/launch2025/support/publish/2025/08/28/PUBLISH_RECEIPT_internal_macros_patch_links.json
dam://campaigns/launch2025/support/publish/2025/08/29/PUBLISH_RECEIPT_internal_kb_titles_cta_refresh.json

(zapisz artifacts[], hash_bundle_sha256, notes)

---

1. D+30 — wykonaj przegląd KPI, zapisz decyzje i zamknij pętlę

3.1 Plik metryk (wejście):
dam://campaigns/launch2025/support/metrics/2025/09/18/ROLLUP_D+30.json

3.2 Ewaluacja wg reguł:

Jeśli csat_avg_pct < 90 → tone_review_plus_kb_gaps_analysis.

Jeśli fcr_trend != 'up' → troubleshooting_tree_refactor_and_macro_abtest.

3.3 Zapis przeglądu:
Ścieżka:

dam://campaigns/launch2025/support/review/2025/09/18/REVIEW_D+30.json

Treść:

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"window": "D+30",
"ts": "2025-09-18T10:30:00+02:00",
"rules_evaluated": [
{"rule":"csat_avg_pct<90","result":"<action|observe>","action":"tone_review_plus_kb_gaps_analysis"},
{"rule":"fcr_trend!='up'","result":"<action|observe>","action":"troubleshooting_tree_refactor_and_macro_abtest"}
],
"decisions": [],
"notes": "<krótko, bez PII>"
}

3.4 Paragon decyzji D+30 (zbiorczo):
Ścieżka:

dam://campaigns/launch2025/support/review/2025/09/18/DECISION_D+30.json

Treść:

{
"plan_id": "PLAN-SUPPORT-20250819-001",
"ts": "2025-09-18T10:35:00+02:00",
"window": "D+30",
"actions": [
{"id":"TONE_GUIDE_REVIEW","when":"csat_avg_pct<90","do":"revise_support_tone_examples + agent_training","owner":"Support Strategist","deadline":"2025-09-23"},
{"id":"TREES_MACRO_ABTEST","when":"fcr_trend!='up'","do":"refactor_troubleshooting_trees + run_macro_abtest_14d","owner":"Helpdesk Writer","deadline":"2025-09-25"}
]
}

3.5 Artefakty działań (twórz jeśli wskazano „action”):

dam://…/tone/patches/2025/09/23/TONE_GUIDE_PATCH_v1.1.0.md

dam://…/trees/patches/2025/09/25/TREES_REFactor_v1.1.0.json

dam://…/macros/tests/2025/09/25/MACRO_ABTEST_plan_v1.0.0.json

3.6 FREEZE v1.1.0 (Support) — tylko gdy powstały nowe treści:
dam://campaigns/_manifests/PLAN-SUPPORT-20250819-001_v1.1.0.json (z listą zmienionych artefaktów i podpisami).
Alias latest → wskazuje na v1.1.0 dla zaktualizowanych plików.

---

1. Zamknięcie pętli i log zmian

4.1 CHANGELOG (Help):

dam://campaigns/launch2025/CHANGELOG_help.md

Dopisz odpowiednio (po D+7, po D+30) krótkie linie z datą i działaniami.

4.2 RELEASE NOTES (globalne):

dam://campaigns/launch2025/RELEASE_NOTES.md

Dodaj wpis o D+30 (działania i ewentualny FREEZE v1.1.0).

---

1. Checklista zamknięcia KROKU 3/3 (musi być „TAK”)

ROLLUP_D+7.json i REVIEW_D+7.json istnieją, DECISION_D+7.json zapisany.

Jeśli „action”: istnieją patche makr/KB i paragony wdrożeń (internal).

ROLLUP_D+30.json i REVIEW_D+30.json istnieją, DECISION_D+30.json zapisany.

Jeśli „action”: artefakty TONE_GUIDE_PATCH / TREES_REFactor / MACRO_ABTEST_plan utworzone.

W razie zmian — FREEZE v1.1.0 + aliasy latest.

CHANGELOG/RELEASE NOTES zaktualizowane; brak PII w jakichkolwiek plikach.

---

To wszystko dla Kroku 3/3 i całego KROKU 7/7 — Support & FAQ.

---

📌 Source & Verification of Response

[Unverified] — Operacyjny plan przeglądów i paragonów oparty na monitoring.support.json i wygenerowanych artefaktach; brak źródeł publicznych.

[Inference] — Daty i działania wynikają z progów KPI (FRT/CSAT/self-service/CTR/FCR) i przyjętych guardrails; zamrożenie v1.1.0 tylko przy realnych zmianach.

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