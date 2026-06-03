# KROK 4/7 — PR/Newsroom — ETAP 5/6: FREEZE → manifest, podpisy i publikacja do DAM (v1.0.1) + harmonogram embarga

Cel etapu: zamrozić zaakceptowane artefakty PR/Newsroom, nadać wersje v1.0.1, obliczyć skróty, podpisać i opublikować do DAM oraz przygotować harmonogram embarga. Strefa czasu: Europe/Brussels (CEST).

---

1. Wersje i docelowe URI (SEMVER)

Skopiuj bez zmian treści z katalogów draft (ETAP 3/6) do poniższych lokalizacji i podnieś wersję do v1.0.1:

PRESS_RELEASE_PL → dam://campaigns/launch2025/pr/pl/2025/08/19/PRESS_RELEASE_PL_v1.0.1.md

PRESS_RELEASE_EN → dam://campaigns/launch2025/pr/en/2025/08/19/PRESS_RELEASE_EN_v1.0.1.md

NEWSROOM_PAGE_PL → dam://campaigns/launch2025/newsroom/pl/2025/08/19/NEWSROOM_PAGE_PL_v1.0.1.md

KEY_MESSAGES_PL → dam://campaigns/launch2025/pr/pl/2025/08/19/KEY_MESSAGES_PL_v1.0.1.md

KEY_MESSAGES_EN → dam://campaigns/launch2025/pr/en/2025/08/19/KEY_MESSAGES_EN_v1.0.1.md

BOILERPLATE_PL → dam://campaigns/launch2025/pr/pl/2025/08/19/BOILERPLATE_PL_v1.0.1.md

BOILERPLATE_EN → dam://campaigns/launch2025/pr/en/2025/08/19/BOILERPLATE_EN_v1.0.1.md

FOUNDER_BIO_PL → dam://campaigns/launch2025/pr/pl/2025/08/19/FOUNDER_BIO_PL_v1.0.1.md

FOUNDER_BIO_EN → dam://campaigns/launch2025/pr/en/2025/08/19/FOUNDER_BIO_EN_v1.0.1.md

JOURNO_QA_PL → dam://campaigns/launch2025/pr/pl/2025/08/19/JOURNO_QA_PL_v1.0.1.md

JOURNO_QA_EN → dam://campaigns/launch2025/pr/en/2025/08/19/JOURNO_QA_EN_v1.0.1.md

PITCH_EMAIL_PL → dam://campaigns/launch2025/pr/pl/2025/08/19/PITCH_EMAIL_PL_v1.0.1.md

PITCH_EMAIL_EN → dam://campaigns/launch2025/pr/en/2025/08/19/PITCH_EMAIL_EN_v1.0.1.md

META_PACK_PR → dam://campaigns/launch2025/pr/multi/2025/08/19/META_PACK_PR_v1.0.1.json

SCHEMA_NEWS_JSONLD → dam://campaigns/launch2025/pr/multi/2025/08/19/SCHEMA_NEWS_JSONLD_v1.0.1.json

ASSET_LIST → dam://campaigns/launch2025/pr/multi/2025/08/19/ASSET_LIST_v1.0.1.md

DISTRIBUTION_LIST → dam://campaigns/launch2025/pr/multi/2025/08/19/DISTRIBUTION_LIST_v1.0.1.csv

EMBARGO_NOTE → dam://campaigns/launch2025/pr/multi/2025/08/19/EMBARGO_NOTE_v1.0.1.md

QA1_report.md (wewnętrzny) → dam://campaigns/launch2025/pr/pl/2025/08/19/QA1_raport-qa_pr_v1.0.0.md

Aliasy latest (po FREEZE):

dam://campaigns/launch2025/pr/pl/latest/PRESS_RELEASE_PL.md           → v1.0.1
dam://campaigns/launch2025/pr/en/latest/PRESS_RELEASE_EN.md           → v1.0.1
dam://campaigns/launch2025/newsroom/pl/latest/NEWSROOM_PAGE_PL.md     → v1.0.1
dam://campaigns/launch2025/pr/multi/latest/META_PACK_PR.json          → v1.0.1
dam://campaigns/launch2025/pr/multi/latest/SCHEMA_NEWS_JSONLD.json    → v1.0.1
dam://campaigns/launch2025/pr/multi/latest/ASSET_LIST.md              → v1.0.1
dam://campaigns/launch2025/pr/multi/latest/DISTRIBUTION_LIST.csv      → v1.0.1
dam://campaigns/launch2025/pr/multi/latest/EMBARGO_NOTE.md            → v1.0.1

---

1. Integralność: SHA-256 + podpisy ed25519

Klucz: key_id: "tipjar-cicd@2025"

Rozszerzenie podpisu: .sig

Zapisz notatkę po obliczeniu (wklej wartości):

PRESS_RELEASE_PL → sha256:<hex_pr_pl>  | sig:<hex_sig_pr_pl>
PRESS_RELEASE_EN → sha256:<hex_pr_en>  | sig:<hex_sig_pr_en>
NEWSROOM_PAGE_PL → sha256:<hex_nr_pl>  | sig:<hex_sig_nr_pl>
KEY_MESSAGES_PL  → sha256:<hex_km_pl>  | sig:<hex_sig_km_pl>
KEY_MESSAGES_EN  → sha256:<hex_km_en>  | sig:<hex_sig_km_en>
BOILERPLATE_PL   → sha256:<hex_bp_pl>  | sig:<hex_sig_bp_pl>
BOILERPLATE_EN   → sha256:<hex_bp_en>  | sig:<hex_sig_bp_en>
FOUNDER_BIO_PL   → sha256:<hex_fb_pl>  | sig:<hex_sig_fb_pl>
FOUNDER_BIO_EN   → sha256:<hex_fb_en>  | sig:<hex_sig_fb_en>
JOURNO_QA_PL     → sha256:<hex_qa_pl>  | sig:<hex_sig_qa_pl>
JOURNO_QA_EN     → sha256:<hex_qa_en>  | sig:<hex_sig_qa_en>
PITCH_EMAIL_PL   → sha256:<hex_pe_pl>  | sig:<hex_sig_pe_pl>
PITCH_EMAIL_EN   → sha256:<hex_pe_en>  | sig:<hex_sig_pe_en>
META_PACK_PR     → sha256:<hex_meta>   | sig:<hex_sig_meta>
SCHEMA_NEWS_JSONLD → sha256:<hex_json> | sig:<hex_sig_json>
ASSET_LIST       → sha256:<hex_assets> | sig:<hex_sig_assets>
DISTRIBUTION_LIST→ sha256:<hex_dist>   | sig:<hex_sig_dist>
EMBARGO_NOTE     → sha256:<hex_emb>    | sig:<hex_sig_emb>
QA1_report       → sha256:<hex_qa1>    | (podpis opcjonalny)

---

1. Manifest FREEZE (DAM)

Plik: dam://campaigns/*manifests/PLAN-PR-20250819-001.json
Treść (uzupełnij {{now_iso}}, <hex>, <bytes_*>):

{
"schema": "dam.manifest.v1",
"plan_id": "PLAN-PR-20250819-001",
"frozen_at": "{{now_iso}}",
"publisher": "freeze@tipjar.plus",
"artifacts": [
{"id":"PRESS_RELEASE_PL","uri":"dam://campaigns/launch2025/pr/pl/2025/08/19/PRESS_RELEASE_PL_v1.0.1.md","hash":{"sha256":"<hex_pr_pl>"},"size_bytes":<bytes_pr_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"press_release","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"PRESS_RELEASE_EN","uri":"dam://campaigns/launch2025/pr/en/2025/08/19/PRESS_RELEASE_EN_v1.0.1.md","hash":{"sha256":"<hex_pr_en>"},"size_bytes":<bytes_pr_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"press_release","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"NEWSROOM_PAGE_PL","uri":"dam://campaigns/launch2025/newsroom/pl/2025/08/19/NEWSROOM_PAGE_PL_v1.0.1.md","hash":{"sha256":"<hex_nr_pl>"},"size_bytes":<bytes_nr_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"newsroom_page","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"KEY_MESSAGES_PL","uri":"dam://campaigns/launch2025/pr/pl/2025/08/19/KEY_MESSAGES_PL_v1.0.1.md","hash":{"sha256":"<hex_km_pl>"},"size_bytes":<bytes_km_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"key_messages","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"KEY_MESSAGES_EN","uri":"dam://campaigns/launch2025/pr/en/2025/08/19/KEY_MESSAGES_EN_v1.0.1.md","hash":{"sha256":"<hex_km_en>"},"size_bytes":<bytes_km_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"key_messages","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"BOILERPLATE_PL","uri":"dam://campaigns/launch2025/pr/pl/2025/08/19/BOILERPLATE_PL_v1.0.1.md","hash":{"sha256":"<hex_bp_pl>"},"size_bytes":<bytes_bp_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"boilerplate","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"BOILERPLATE_EN","uri":"dam://campaigns/launch2025/pr/en/2025/08/19/BOILERPLATE_EN_v1.0.1.md","hash":{"sha256":"<hex_bp_en>"},"size_bytes":<bytes_bp_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"boilerplate","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"FOUNDER_BIO_PL","uri":"dam://campaigns/launch2025/pr/pl/2025/08/19/FOUNDER_BIO_PL_v1.0.1.md","hash":{"sha256":"<hex_fb_pl>"},"size_bytes":<bytes_fb_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"bio","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"FOUNDER_BIO_EN","uri":"dam://campaigns/launch2025/pr/en/2025/08/19/FOUNDER_BIO_EN_v1.0.1.md","hash":{"sha256":"<hex_fb_en>"},"size_bytes":<bytes_fb_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"bio","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"JOURNO_QA_PL","uri":"dam://campaigns/launch2025/pr/pl/2025/08/19/JOURNO_QA_PL_v1.0.1.md","hash":{"sha256":"<hex_qa_pl>"},"size_bytes":<bytes_qa_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"qa","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"JOURNO_QA_EN","uri":"dam://campaigns/launch2025/pr/en/2025/08/19/JOURNO_QA_EN_v1.0.1.md","hash":{"sha256":"<hex_qa_en>"},"size_bytes":<bytes_qa_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"qa","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"PITCH_EMAIL_PL","uri":"dam://campaigns/launch2025/pr/pl/2025/08/19/PITCH_EMAIL_PL_v1.0.1.md","hash":{"sha256":"<hex_pe_pl>"},"size_bytes":<bytes_pe_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"pitch_email","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"PITCH_EMAIL_EN","uri":"dam://campaigns/launch2025/pr/en/2025/08/19/PITCH_EMAIL_EN_v1.0.1.md","hash":{"sha256":"<hex_pe_en>"},"size_bytes":<bytes_pe_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"pitch_email","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"META_PACK_PR","uri":"dam://campaigns/launch2025/pr/multi/2025/08/19/META_PACK_PR_v1.0.1.json","hash":{"sha256":"<hex_meta>"},"size_bytes":<bytes_meta>,"content_type":"application/json","locale":"multi","type":"meta_pack","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"SCHEMA_NEWS_JSONLD","uri":"dam://campaigns/launch2025/pr/multi/2025/08/19/SCHEMA_NEWS_JSONLD_v1.0.1.json","hash":{"sha256":"<hex_json>"},"size_bytes":<bytes_json>,"content_type":"application/ld+json","locale":"multi","type":"schema_news","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"ASSET_LIST","uri":"dam://campaigns/launch2025/pr/multi/2025/08/19/ASSET_LIST_v1.0.1.md","hash":{"sha256":"<hex_assets>"},"size_bytes":<bytes_assets>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"asset_list","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"DISTRIBUTION_LIST","uri":"dam://campaigns/launch2025/pr/multi/2025/08/19/DISTRIBUTION_LIST_v1.0.1.csv","hash":{"sha256":"<hex_dist>"},"size_bytes":<bytes_dist>,"content_type":"text/csv; charset=utf-8","locale":"multi","type":"distribution_list","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"internal"},
{"id":"EMBARGO_NOTE","uri":"dam://campaigns/launch2025/pr/multi/2025/08/19/EMBARGO_NOTE_v1.0.1.md","hash":{"sha256":"<hex_emb>"},"size_bytes":<bytes_emb>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"embargo_note","created_by_role":"PR Writer","source_step":"S2","derived_from":[],"data_classification":"public"},
{"id":"QA1","uri":"dam://campaigns/launch2025/pr/pl/2025/08/19/QA1_raport-qa_pr_v1.0.0.md","hash":{"sha256":"<hex_qa1>"},"size_bytes":<bytes_qa1>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"markdown","created_by_role":"Evaluator","source_step":"S3","derived_from":["PRESS_RELEASE_PL","PRESS_RELEASE_EN","NEWSROOM_PAGE_PL","META_PACK_PR","SCHEMA_NEWS_JSONLD","ASSET_LIST"],"data_classification":"internal"}
],
"signatures": [
{"artifact_id":"PRESS_RELEASE_PL","sig_uri":"dam://campaigns/launch2025/pr/pl/2025/08/19/PRESS_RELEASE_PL_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"PRESS_RELEASE_EN","sig_uri":"dam://campaigns/launch2025/pr/en/2025/08/19/PRESS_RELEASE_EN_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"NEWSROOM_PAGE_PL","sig_uri":"dam://campaigns/launch2025/newsroom/pl/2025/08/19/NEWSROOM_PAGE_PL_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"META_PACK_PR","sig_uri":"dam://campaigns/launch2025/pr/multi/2025/08/19/META_PACK_PR_v1.0.1.json.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"SCHEMA_NEWS_JSONLD","sig_uri":"dam://campaigns/launch2025/pr/multi/2025/08/19/SCHEMA_NEWS_JSONLD_v1.0.1.json.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"}
],
"indexes": {
"by_locale": { "pl":["PRESS_RELEASE_PL","NEWSROOM_PAGE_PL","KEY_MESSAGES_PL","BOILERPLATE_PL","FOUNDER_BIO_PL","JOURNO_QA_PL","PITCH_EMAIL_PL","QA1"], "en":["PRESS_RELEASE_EN","KEY_MESSAGES_EN","BOILERPLATE_EN","FOUNDER_BIO_EN","JOURNO_QA_EN","PITCH_EMAIL_EN"], "multi":["META_PACK_PR","SCHEMA_NEWS_JSONLD","ASSET_LIST","DISTRIBUTION_LIST","EMBARGO_NOTE"] },
"by_type": { "press_release":["PRESS_RELEASE_PL","PRESS_RELEASE_EN"], "newsroom_page":["NEWSROOM_PAGE_PL"], "key_messages":["KEY_MESSAGES_PL","KEY_MESSAGES_EN"], "boilerplate":["BOILERPLATE_PL","BOILERPLATE_EN"], "bio":["FOUNDER_BIO_PL","FOUNDER_BIO_EN"], "qa":["JOURNO_QA_PL","JOURNO_QA_EN"], "pitch_email":["PITCH_EMAIL_PL","PITCH_EMAIL_EN"], "meta_pack":["META_PACK_PR"], "schema_news":["SCHEMA_NEWS_JSONLD"], "asset_list":["ASSET_LIST"], "distribution_list":["DISTRIBUTION_LIST"], "embargo_note":["EMBARGO_NOTE"], "markdown":["QA1"] }
}
}

---

1. Patch planu (S4 → done; plan → completed)

Plik: /tipjar-campaigns/starter-packs/plan.pr.json

{
"patches": [
{"op":"replace","path":"/steps/3/status","value":"done"},
{"op":"replace","path":"/steps/3/attempts","value":1},
{"op":"add","path":"/steps/3/produced","value":["MANIFEST"]},
{"op":"replace","path":"/state","value":"completed"}
]
}

---

1. Harmonogram embarga i publikacji (CEST)

Data embarga: 2025-08-20 09:00 — odblokuj i opublikuj:

Strona: NEWSROOM_PAGE_PL (z META_PACK_PR.newsroom_pl + wstrzyknięty SCHEMA_NEWS_JSONLD).

Artykuły: PRESS_RELEASE_PL i PRESS_RELEASE_EN (odpowiedni title/description/OG/canonical).

Walidacje „przed”: OG public HTTP 200, JSON-LD w <script type="application/ld+json">, canonical zgodny z URL.

Paragony publikacji (po release):

dam://campaigns/launch2025/pr/pl/2025/08/20/PUBLISH_RECEIPT_press_pl.json

dam://campaigns/launch2025/pr/en/2025/08/20/PUBLISH_RECEIPT_press_en.json

dam://campaigns/launch2025/newsroom/pl/2025/08/20/PUBLISH_RECEIPT_newsroom_pl.json
Zawartość (uzupełnij):

{"plan_id":"PLAN-PR-20250819-001","published_at":"{{ISO CEST}}","post_url":"{{URL}}","hash_sha256":"{{hex}}"}

---

1. Release notes

Plik: dam://campaigns/launch2025/RELEASE_NOTES.md — dopisz:

[2025-08-19] PLAN-PR-20250819-001 — FREEZE v1.0.1 (PR PL/EN, Newsroom PL, Meta/JSON-LD, Media kit, Pitch, Q&A) + manifest; embargo ustawione na 2025-08-20 09:00 CEST.

---

1. Checklista ETAPU 5/6 (musi być „TAK”)

Artefakty PR/Newsroom znajdują się w DAM (v1.0.1) z hash i podpisem (gdzie wymagane).

Manifest JSON istnieje i jest spójny (URI, hash, rozmiary, typy, indeksy).

plan.pr.json: S4.status = done, state = completed.

Aliasy latest ustawione.

Harmonogram embarga przygotowany.

---

Napisz „Dalej”, a przejdę do ETAPU 6/6: Publikacja pod embargiem + monitoring PR (T+120 min / D+3).

---

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