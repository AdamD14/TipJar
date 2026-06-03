# KROK 7/7 — Support & FAQ — ETAP 5/6: FREEZE → manifest, podpisy i publikacja do DAM (v1.0.1) + harmonogram wdrożeń KB/FAQ

Cel etapu: zamrozić zaakceptowane artefakty Support & FAQ, nadać wersje v1.0.1, obliczyć skróty, podpisać, opublikować do DAM oraz wskazać mapę URL + aktualizacje sitemap/hreflang/OG. Strefa czasu: Europe/Brussels (CEST).

---

1. FREEZE — ścieżki docelowe (SEMVER)

Skopiuj bez zmian treści z katalogów draft (ETAP 3/6) do DAM z wersją v1.0.1:

FAQ / KB / makra

SUPPORT_FAQ_PL → dam://campaigns/launch2025/support/faq/pl/2025/08/19/SUPPORT_FAQ_PL_v1.0.1.md

SUPPORT_FAQ_EN → dam://campaigns/launch2025/support/faq/en/2025/08/19/SUPPORT_FAQ_EN_v1.0.1.md

KB_OUTLINES_PL → dam://campaigns/launch2025/support/kb/pl/2025/08/19/KB_OUTLINES_PL_v1.0.1.md

KB_OUTLINES_EN → dam://campaigns/launch2025/support/kb/en/2025/08/19/KB_OUTLINES_EN_v1.0.1.md

KB_TEMPLATES_MULTI → dam://campaigns/launch2025/support/kb/templates/2025/08/19/KB_TEMPLATES_MULTI_v1.0.1.md

SUPPORT_MACROS_PL → dam://campaigns/launch2025/support/macros/pl/2025/08/19/SUPPORT_MACROS_PL_v1.0.1.md

SUPPORT_MACROS_EN → dam://campaigns/launch2025/support/macros/en/2025/08/19/SUPPORT_MACROS_EN_v1.0.1.md

Operacyjne / polityki / schematy

CONTACT_FLOWS → dam://campaigns/launch2025/support/flows/2025/08/19/CONTACT_FLOWS_v1.0.1.json

ESCALATION_MATRIX → dam://campaigns/launch2025/support/escalation/2025/08/19/ESCALATION_MATRIX_v1.0.1.json

SLA_POLICY → dam://campaigns/launch2025/support/policy/2025/08/19/SLA_POLICY_v1.0.1.md

TICKET_TEMPLATES → dam://campaigns/launch2025/support/tickets/2025/08/19/TICKET_TEMPLATES_v1.0.1.yaml

TROUBLESHOOTING_TREES → dam://campaigns/launch2025/support/trees/2025/08/19/TROUBLESHOOTING_TREES_v1.0.1.json

REDACTION_RULES → dam://campaigns/launch2025/support/redaction/2025/08/19/REDACTION_RULES_v1.0.1.json

ACCESSIBILITY_NOTES_HELP → dam://campaigns/launch2025/support/a11y/2025/08/19/ACCESSIBILITY_NOTES_HELP_v1.0.1.md

SUPPORT_TONE_GUIDE → dam://campaigns/launch2025/support/tone/2025/08/19/SUPPORT_TONE_GUIDE_v1.0.1.md

UTM_RULES_HELP → dam://campaigns/launch2025/support/utm/2025/08/19/UTM_RULES_HELP_v1.0.1.md

INTERNAL_LINKING_HELP → dam://campaigns/launch2025/support/linking/2025/08/19/INTERNAL_LINKING_HELP_v1.0.1.md

GLOSSARY_SUPPORT → dam://campaigns/launch2025/support/glossary/2025/08/19/GLOSSARY_SUPPORT_v1.0.1.md

MEASUREMENT_SPEC → dam://campaigns/launch2025/support/metrics/2025/08/19/MEASUREMENT_SPEC_v1.0.1.json

STATUS_PAGE_TEMPLATES → dam://campaigns/launch2025/support/status/2025/08/19/STATUS_PAGE_TEMPLATES_v1.0.1.md

EDIT/QA (wewn.)

EDIT1_editor-notes.md → dam://campaigns/launch2025/support/multi/2025/08/19/EDIT1_support_v1.0.0.md

QA1_report.md → dam://campaigns/launch2025/support/multi/2025/08/19/QA1_support_v1.0.0.md

Aliasy latest (po FREEZE):

.../support/faq/pl/latest/SUPPORT_FAQ_PL.md            → v1.0.1
.../support/faq/en/latest/SUPPORT_FAQ_EN.md            → v1.0.1
.../support/kb/pl/latest/KB_OUTLINES_PL.md             → v1.0.1
.../support/kb/en/latest/KB_OUTLINES_EN.md             → v1.0.1
.../support/kb/templates/latest/KB_TEMPLATES_MULTI.md  → v1.0.1
.../support/macros/pl/latest/SUPPORT_MACROS_PL.md      → v1.0.1
.../support/macros/en/latest/SUPPORT_MACROS_EN.md      → v1.0.1
.../support/flows/latest/CONTACT_FLOWS.json            → v1.0.1
.../support/escalation/latest/ESCALATION_MATRIX.json   → v1.0.1
.../support/policy/latest/SLA_POLICY.md                → v1.0.1
.../support/tickets/latest/TICKET_TEMPLATES.yaml       → v1.0.1
.../support/trees/latest/TROUBLESHOOTING_TREES.json    → v1.0.1
.../support/redaction/latest/REDACTION_RULES.json      → v1.0.1
.../support/a11y/latest/ACCESSIBILITY_NOTES_HELP.md    → v1.0.1
.../support/tone/latest/SUPPORT_TONE_GUIDE.md          → v1.0.1
.../support/utm/latest/UTM_RULES_HELP.md               → v1.0.1
.../support/linking/latest/INTERNAL_LINKING_HELP.md    → v1.0.1
.../support/glossary/latest/GLOSSARY_SUPPORT.md        → v1.0.1
.../support/metrics/latest/MEASUREMENT_SPEC.json       → v1.0.1
.../support/status/latest/STATUS_PAGE_TEMPLATES.md     → v1.0.1

---

1. Integralność — SHA-256 + podpisy ed25519

Klucz: key_id: "tipjar-cicd@2025".

Dla wszystkich JSON/YAML/MD utwórz pliki .sig (ed25519) i zapisz hash SHA-256.

Rejestr (wzór):

SUPPORT_FAQ_PL → sha256:<hex_pl> | sig:<hex_pl_sig>
CONTACT_FLOWS → sha256:<hex_flows> | sig:<hex_flows_sig>
TICKET_TEMPLATES → sha256:<hex_yaml> | sig:<hex_yaml_sig>
...

---

1. Manifest FREEZE (DAM)

Plik: dam://campaigns/*manifests/PLAN-SUPPORT-20250819-001.json
Treść (uzupełnij {{now_iso}}, <hex>, <bytes_*>):

{
"schema": "dam.manifest.v1",
"plan_id": "PLAN-SUPPORT-20250819-001",
"frozen_at": "{{now_iso}}",
"publisher": "freeze@tipjar.plus",
"artifacts": [
{"id":"SUPPORT_FAQ_PL","uri":"dam://campaigns/launch2025/support/faq/pl/2025/08/19/SUPPORT_FAQ_PL_v1.0.1.md","hash":{"sha256":"<hex_pl>"},"size_bytes":<bytes_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"faq","created_by_role":"Helpdesk Writer","source_step":"S3","data_classification":"public"},
{"id":"SUPPORT_FAQ_EN","uri":"dam://campaigns/launch2025/support/faq/en/2025/08/19/SUPPORT_FAQ_EN_v1.0.1.md","hash":{"sha256":"<hex_en>"},"size_bytes":<bytes_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"faq","created_by_role":"Helpdesk Writer","source_step":"S3","data_classification":"public"},
{"id":"KB_OUTLINES_PL","uri":"dam://campaigns/launch2025/support/kb/pl/2025/08/19/KB_OUTLINES_PL_v1.0.1.md","hash":{"sha256":"<hex_kbpl>"},"size_bytes":<bytes_kbpl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"kb_outline","created_by_role":"Helpdesk Writer","source_step":"S3","data_classification":"public"},
{"id":"KB_OUTLINES_EN","uri":"dam://campaigns/launch2025/support/kb/en/2025/08/19/KB_OUTLINES_EN_v1.0.1.md","hash":{"sha256":"<hex_kben>"},"size_bytes":<bytes_kben>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"kb_outline","created_by_role":"Helpdesk Writer","source_step":"S3","data_classification":"public"},
{"id":"KB_TEMPLATES_MULTI","uri":"dam://campaigns/launch2025/support/kb/templates/2025/08/19/KB_TEMPLATES_MULTI_v1.0.1.md","hash":{"sha256":"<hex_kbtempl>"},"size_bytes":<bytes_kbtempl>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"kb_template","created_by_role":"Support Strategist","source_step":"S2","data_classification":"internal"},
{"id":"SUPPORT_MACROS_PL","uri":"dam://campaigns/launch2025/support/macros/pl/2025/08/19/SUPPORT_MACROS_PL_v1.0.1.md","hash":{"sha256":"<hex_macpl>"},"size_bytes":<bytes_macpl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"macro","created_by_role":"Helpdesk Writer","source_step":"S3","data_classification":"public"},
{"id":"SUPPORT_MACROS_EN","uri":"dam://campaigns/launch2025/support/macros/en/2025/08/19/SUPPORT_MACROS_EN_v1.0.1.md","hash":{"sha256":"<hex_macen>"},"size_bytes":<bytes_macen>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"macro","created_by_role":"Helpdesk Writer","source_step":"S3","data_classification":"public"},
{"id":"CONTACT_FLOWS","uri":"dam://campaigns/launch2025/support/flows/2025/08/19/CONTACT_FLOWS_v1.0.1.json","hash":{"sha256":"<hex_flows>"},"size_bytes":<bytes_flows>,"content_type":"application/json","locale":"multi","type":"flow","created_by_role":"Support Strategist","source_step":"S2","data_classification":"internal"},
{"id":"ESCALATION_MATRIX","uri":"dam://campaigns/launch2025/support/escalation/2025/08/19/ESCALATION_MATRIX_v1.0.1.json","hash":{"sha256":"<hex_escal>"},"size_bytes":<bytes_escal>,"content_type":"application/json","locale":"multi","type":"escalation","created_by_role":"Support Strategist","source_step":"S2","data_classification":"internal"},
{"id":"SLA_POLICY","uri":"dam://campaigns/launch2025/support/policy/2025/08/19/SLA_POLICY_v1.0.1.md","hash":{"sha256":"<hex_sla>"},"size_bytes":<bytes_sla>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"policy","created_by_role":"Support Strategist","source_step":"S2","data_classification":"public"},
{"id":"TICKET_TEMPLATES","uri":"dam://campaigns/launch2025/support/tickets/2025/08/19/TICKET_TEMPLATES_v1.0.1.yaml","hash":{"sha256":"<hex_tickets>"},"size_bytes":<bytes_tickets>,"content_type":"text/yaml; charset=utf-8","locale":"multi","type":"templates","created_by_role":"Support Strategist","source_step":"S2","data_classification":"internal"},
{"id":"TROUBLESHOOTING_TREES","uri":"dam://campaigns/launch2025/support/trees/2025/08/19/TROUBLESHOOTING_TREES_v1.0.1.json","hash":{"sha256":"<hex_trees>"},"size_bytes":<bytes_trees>,"content_type":"application/json","locale":"multi","type":"troubleshooting","created_by_role":"Support Strategist","source_step":"S2","data_classification":"public"},
{"id":"REDACTION_RULES","uri":"dam://campaigns/launch2025/support/redaction/2025/08/19/REDACTION_RULES_v1.0.1.json","hash":{"sha256":"<hex_redact>"},"size_bytes":<bytes_redact>,"content_type":"application/json","locale":"multi","type":"redaction","created_by_role":"Support Strategist","source_step":"S2","data_classification":"internal"},
{"id":"ACCESSIBILITY_NOTES_HELP","uri":"dam://campaigns/launch2025/support/a11y/2025/08/19/ACCESSIBILITY_NOTES_HELP_v1.0.1.md","hash":{"sha256":"<hex_a11y>"},"size_bytes":<bytes_a11y>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"a11y","created_by_role":"Support Strategist","source_step":"S2","data_classification":"public"},
{"id":"SUPPORT_TONE_GUIDE","uri":"dam://campaigns/launch2025/support/tone/2025/08/19/SUPPORT_TONE_GUIDE_v1.0.1.md","hash":{"sha256":"<hex_tone>"},"size_bytes":<bytes_tone>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"tone","created_by_role":"Support Strategist","source_step":"S2","data_classification":"public"},
{"id":"UTM_RULES_HELP","uri":"dam://campaigns/launch2025/support/utm/2025/08/19/UTM_RULES_HELP_v1.0.1.md","hash":{"sha256":"<hex_utm>"},"size_bytes":<bytes_utm>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"utm","created_by_role":"Support Strategist","source_step":"S2","data_classification":"public"},
{"id":"INTERNAL_LINKING_HELP","uri":"dam://campaigns/launch2025/support/linking/2025/08/19/INTERNAL_LINKING_HELP_v1.0.1.md","hash":{"sha256":"<hex_link>"},"size_bytes":<bytes_link>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"linking","created_by_role":"Support Strategist","source_step":"S2","data_classification":"public"},
{"id":"GLOSSARY_SUPPORT","uri":"dam://campaigns/launch2025/support/glossary/2025/08/19/GLOSSARY_SUPPORT_v1.0.1.md","hash":{"sha256":"<hex_gloss>"},"size_bytes":<bytes_gloss>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"glossary","created_by_role":"Support Strategist","source_step":"S2","data_classification":"public"},
{"id":"MEASUREMENT_SPEC","uri":"dam://campaigns/launch2025/support/metrics/2025/08/19/MEASUREMENT_SPEC_v1.0.1.json","hash":{"sha256":"<hex_measure>"},"size_bytes":<bytes_measure>,"content_type":"application/json","locale":"multi","type":"measurement","created_by_role":"Support Strategist","source_step":"S2","data_classification":"internal"},
{"id":"STATUS_PAGE_TEMPLATES","uri":"dam://campaigns/launch2025/support/status/2025/08/19/STATUS_PAGE_TEMPLATES_v1.0.1.md","hash":{"sha256":"<hex_status>"},"size_bytes":<bytes_status>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"status_templates","created_by_role":"Helpdesk Writer","source_step":"S3","data_classification":"public"},
{"id":"EDIT1","uri":"dam://campaigns/launch2025/support/multi/2025/08/19/EDIT1_support_v1.0.0.md","hash":{"sha256":"<hex_edit1>"},"size_bytes":<bytes_edit1>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"editor_notes","created_by_role":"Editor","source_step":"S4","data_classification":"internal"},
{"id":"QA1","uri":"dam://campaigns/launch2025/support/multi/2025/08/19/QA1_support_v1.0.0.md","hash":{"sha256":"<hex_qa1>"},"size_bytes":<bytes_qa1>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"qa","created_by_role":"Evaluator","source_step":"S5","data_classification":"internal"}
],
"signatures": [
{"artifact_id":"CONTACT_FLOWS","sig_uri":"dam://campaigns/launch2025/support/flows/2025/08/19/CONTACT_FLOWS_v1.0.1.json.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"REDACTION_RULES","sig_uri":"dam://campaigns/launch2025/support/redaction/2025/08/19/REDACTION_RULES_v1.0.1.json.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"}
],
"indexes": {
"by_locale": {
"pl": ["SUPPORT_FAQ_PL","KB_OUTLINES_PL","SUPPORT_MACROS_PL"],
"en": ["SUPPORT_FAQ_EN","KB_OUTLINES_EN","SUPPORT_MACROS_EN"],
"multi": ["KB_TEMPLATES_MULTI","CONTACT_FLOWS","ESCALATION_MATRIX","SLA_POLICY","TICKET_TEMPLATES","TROUBLESHOOTING_TREES","REDACTION_RULES","ACCESSIBILITY_NOTES_HELP","SUPPORT_TONE_GUIDE","UTM_RULES_HELP","INTERNAL_LINKING_HELP","GLOSSARY_SUPPORT","MEASUREMENT_SPEC","STATUS_PAGE_TEMPLATES","EDIT1","QA1"]
},
"by_type": {
"faq":["SUPPORT_FAQ_PL","SUPPORT_FAQ_EN"],
"kb_outline":["KB_OUTLINES_PL","KB_OUTLINES_EN"],
"kb_template":["KB_TEMPLATES_MULTI"],
"macro":["SUPPORT_MACROS_PL","SUPPORT_MACROS_EN"],
"flow":["CONTACT_FLOWS"],
"escalation":["ESCALATION_MATRIX"],
"policy":["SLA_POLICY"],
"templates":["TICKET_TEMPLATES"],
"troubleshooting":["TROUBLESHOOTING_TREES"],
"redaction":["REDACTION_RULES"],
"a11y":["ACCESSIBILITY_NOTES_HELP"],
"tone":["SUPPORT_TONE_GUIDE"],
"utm":["UTM_RULES_HELP"],
"linking":["INTERNAL_LINKING_HELP"],
"glossary":["GLOSSARY_SUPPORT"],
"measurement":["MEASUREMENT_SPEC"],
"status_templates":["STATUS_PAGE_TEMPLATES"],
"editor_notes":["EDIT1"],
"qa":["QA1"]
}
}
}

---

1. Patch planu (S6 → done; plan → completed)

Plik: /tipjar-campaigns/starter-packs/plan.support.json

{
"patches": [
{"op":"replace","path":"/steps/5/status","value":"done"},
{"op":"replace","path":"/steps/5/attempts","value":1},
{"op":"add","path":"/steps/5/produced","value":["MANIFEST"]},
{"op":"replace","path":"/state","value":"completed"}
]
}

---

1. Mapa URL + wdrożenie i sitemap/hreflang

Lokalizacje treści (przykłady):

/pl/help/faq ↔ /en/help/faq (hreflang para)

/pl/help/kb/… ↔ /en/help/kb/…

/pl/help/status (szablony STATUS)

Sitemap update (D0, 10:00 CEST): sitemap.xml, sitemap_pl.xml, sitemap_en.xml (lastmod=D0 10:00).

OG/canonical/JSON-LD (Article/FAQPage/HowTo) włączone w CMS; bez PII.

---

1. Harmonogram wdrożeń (fala 1)

D0 (po FREEZE): publikacja FAQ PL/EN + szablony KB + makra.

D+2: publikacja pierwszych 3 artykułów KB (PL/EN pair).

D+7: publikacja kolejnych 3 artykułów KB + testy uzupełnienia FAQ.

Po każdej publikacji zapis paragonu:
dam://campaigns/launch2025/support/publish/YYYY/MM/DD/PUBLISH_RECEIPT_help_<slug>.json

---

1. Checklista ETAPU 5/6 (musi być „TAK”)

Artefakty Support & FAQ w DAM (v1.0.1) z hashami SHA-256 i podpisami ed25519 (dla JSON/YAML; MD opcjonalnie).

Manifest FREEZE istnieje i waliduje się; aliasy latest ustawione.

plan.support.json: S6.status = done, state = completed.

Mapa URL + sitemap/hreflang/OG/JSON-LD zaplanowane.

---

Napisz „Dalej”, a przejdę do ETAPU 6/6: Publikacja + monitoring (CSAT/FRT/FCR/self-service) — paragonizacja i przeglądy D+7/D+30 dla Support & FAQ.

---

📌 Source & Verification of Response

[Unverified] — Procedura FREEZE/manifest/aliasy/harmonogram dla Support & FAQ oparta na wewnętrznych artefaktach; brak źródeł publicznych.

[Inference] — Struktura manifestu i podpisów odzwierciedla standard orkiestracji zastosowany w pakiecie SEO/Blog; daty i rytm wdrożeń zgodne z kalendarzem projektu.

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