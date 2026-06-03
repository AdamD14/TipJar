# KROK 5/7 — Paid/Kreatywy — ETAP 5/6: FREEZE → manifest, podpisy i publikacja do DAM (v1.0.1) + harmonogram Flight#1/#2

Cel etapu: zamrozić zaakceptowane artefakty Paid/Kreatywy, nadać im wersje v1.0.1, obliczyć skróty, podpisać i opublikować do DAM oraz przygotować harmonogram aktywacji kampanii. Strefa czasu: Europe/Brussels (CEST).

---

1. FREEZE — wersje i docelowe URI (SEMVER)

Skopiuj bez zmian treści z katalogów draft (ETAP 3/6) i zapisz w DAM z wersją v1.0.1:

Briefy
CREATIVE_BRIEF_PL → dam://campaigns/launch2025/paid/brief/pl/2025/08/19/CREATIVE_BRIEF_PL_v1.0.1.md
CREATIVE_BRIEF_EN → dam://campaigns/launch2025/paid/brief/en/2025/08/19/CREATIVE_BRIEF_EN_v1.0.1.md

Meta Ads copy
AD_COPY_META_PL → dam://campaigns/launch2025/paid/meta/pl/2025/08/19/AD_COPY_META_PL_v1.0.1.md
AD_COPY_META_EN → dam://campaigns/launch2025/paid/meta/en/2025/08/19/AD_COPY_META_EN_v1.0.1.md

TikTok copy
AD_COPY_TIKTOK_PL → dam://campaigns/launch2025/paid/tiktok/pl/2025/08/19/AD_COPY_TIKTOK_PL_v1.0.1.md
AD_COPY_TIKTOK_EN → dam://campaigns/launch2025/paid/tiktok/en/2025/08/19/AD_COPY_TIKTOK_EN_v1.0.1.md

YouTube (skrypty)
AD_SCRIPTS_YT_PL → dam://campaigns/launch2025/paid/youtube/pl/2025/08/19/AD_SCRIPTS_YT_PL_v1.0.1.md
AD_SCRIPTS_YT_EN → dam://campaigns/launch2025/paid/youtube/en/2025/08/19/AD_SCRIPTS_YT_EN_v1.0.1.md
SHOTLIST_15S_VERTICAL → dam://campaigns/launch2025/paid/video/2025/08/19/SHOTLIST_15S_VERTICAL_v1.0.1.md

Display / ALT
DISPLAY_BANNERS_COPY → dam://campaigns/launch2025/paid/display/2025/08/19/DISPLAY_BANNERS_COPY_v1.0.1.md
ALT_TEXT_PACK → dam://campaigns/launch2025/paid/assets/2025/08/19/ALT_TEXT_PACK_v1.0.1.md

Google Ads
GOOGLE_RSA_ASSETS_PL → dam://campaigns/launch2025/paid/google/pl/2025/08/19/GOOGLE_RSA_ASSETS_PL_v1.0.1.json
GOOGLE_RSA_ASSETS_EN → dam://campaigns/launch2025/paid/google/en/2025/08/19/GOOGLE_RSA_ASSETS_EN_v1.0.1.json
PMAX_ASSET_MAP → dam://campaigns/launch2025/paid/google/2025/08/19/PMAX_ASSET_MAP_v1.0.1.md

Operacyjne
UTM_RULES → dam://campaigns/launch2025/paid/utm/2025/08/19/UTM_RULES_v1.0.1.md
TARGETING_HYPOTHESES → dam://campaigns/launch2025/paid/targeting/2025/08/19/TARGETING_HYPOTHESES_v1.0.1.json
BUDGET_SPLIT_PLAN → dam://campaigns/launch2025/paid/budget/2025/08/19/BUDGET_SPLIT_PLAN_v1.0.1.json
EXPERIMENT_DESIGN → dam://campaigns/launch2025/paid/experiments/2025/08/19/EXPERIMENT_DESIGN_v1.0.1.md
BRAND_SAFETY_LISTS → dam://campaigns/launch2025/paid/brand/2025/08/19/BRAND_SAFETY_LISTS_v1.0.1.md
DELIVERABLES_NAMING → dam://campaigns/launch2025/paid/spec/2025/08/19/DELIVERABLES_NAMING_v1.0.1.md
FLIGHT_SCHEDULE → dam://campaigns/launch2025/paid/schedule/2025/08/19/FLIGHT_SCHEDULE_v1.0.1.md

QA (wewn.)
QA1_report.md → dam://campaigns/launch2025/paid/multi/2025/08/19/QA1_paid_v1.0.0.md

Aliasy latest (po FREEZE):

dam://campaigns/launch2025/paid/meta/pl/latest/AD_COPY_META_PL.md            → v1.0.1
dam://campaigns/launch2025/paid/meta/en/latest/AD_COPY_META_EN.md            → v1.0.1
dam://campaigns/launch2025/paid/tiktok/pl/latest/AD_COPY_TIKTOK_PL.md        → v1.0.1
dam://campaigns/launch2025/paid/tiktok/en/latest/AD_COPY_TIKTOK_EN.md        → v1.0.1
dam://campaigns/launch2025/paid/youtube/pl/latest/AD_SCRIPTS_YT_PL.md        → v1.0.1
dam://campaigns/launch2025/paid/youtube/en/latest/AD_SCRIPTS_YT_EN.md        → v1.0.1
dam://campaigns/launch2025/paid/video/latest/SHOTLIST_15S_VERTICAL.md        → v1.0.1
dam://campaigns/launch2025/paid/display/latest/DISPLAY_BANNERS_COPY.md       → v1.0.1
dam://campaigns/launch2025/paid/assets/latest/ALT_TEXT_PACK.md               → v1.0.1
dam://campaigns/launch2025/paid/google/pl/latest/GOOGLE_RSA_ASSETS_PL.json   → v1.0.1
dam://campaigns/launch2025/paid/google/en/latest/GOOGLE_RSA_ASSETS_EN.json   → v1.0.1
dam://campaigns/launch2025/paid/google/latest/PMAX_ASSET_MAP.md              → v1.0.1
dam://campaigns/launch2025/paid/utm/latest/UTM_RULES.md                      → v1.0.1
dam://campaigns/launch2025/paid/targeting/latest/TARGETING_HYPOTHESES.json   → v1.0.1
dam://campaigns/launch2025/paid/budget/latest/BUDGET_SPLIT_PLAN.json         → v1.0.1
dam://campaigns/launch2025/paid/experiments/latest/EXPERIMENT_DESIGN.md      → v1.0.1
dam://campaigns/launch2025/paid/brand/latest/BRAND_SAFETY_LISTS.md           → v1.0.1
dam://campaigns/launch2025/paid/spec/latest/DELIVERABLES_NAMING.md           → v1.0.1
dam://campaigns/launch2025/paid/schedule/latest/FLIGHT_SCHEDULE.md           → v1.0.1

---

1. Integralność — SHA-256 + podpisy ed25519

Klucz: key_id: "tipjar-cicd@2025"

Dla każdego artefaktu generuj: plik .sig (ed25519) oraz hash SHA-256.

Zanotuj (po obliczeniu) — przykład formatu:

AD_COPY_META_PL → sha256:<hex_meta_pl> | sig:<hex_sig_meta_pl>
GOOGLE_RSA_ASSETS_EN → sha256:<hex_rsa_en> | sig:<hex_sig_rsa_en>
…
QA1_paid → sha256:<hex_qa1> | (podpis opcjonalny)

---

1. Manifest FREEZE (DAM)

Plik: dam://campaigns/*manifests/PLAN-PAID-20250819-001.json
Treść (uzupełnij {{now_iso}}, <hex>, <bytes_*>):

{
"schema": "dam.manifest.v1",
"plan_id": "PLAN-PAID-20250819-001",
"frozen_at": "{{now_iso}}",
"publisher": "freeze@tipjar.plus",
"artifacts": [
{"id":"CREATIVE_BRIEF_PL","uri":"dam://campaigns/launch2025/paid/brief/pl/2025/08/19/CREATIVE_BRIEF_PL_v1.0.1.md","hash":{"sha256":"<hex_cb_pl>"},"size_bytes":<bytes_cb_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"brief","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"CREATIVE_BRIEF_EN","uri":"dam://campaigns/launch2025/paid/brief/en/2025/08/19/CREATIVE_BRIEF_EN_v1.0.1.md","hash":{"sha256":"<hex_cb_en>"},"size_bytes":<bytes_cb_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"brief","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"AD_COPY_META_PL","uri":"dam://campaigns/launch2025/paid/meta/pl/2025/08/19/AD_COPY_META_PL_v1.0.1.md","hash":{"sha256":"<hex_mpl>"},"size_bytes":<bytes_mpl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"ad_copy","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"AD_COPY_META_EN","uri":"dam://campaigns/launch2025/paid/meta/en/2025/08/19/AD_COPY_META_EN_v1.0.1.md","hash":{"sha256":"<hex_men>"},"size_bytes":<bytes_men>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"ad_copy","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"AD_COPY_TIKTOK_PL","uri":"dam://campaigns/launch2025/paid/tiktok/pl/2025/08/19/AD_COPY_TIKTOK_PL_v1.0.1.md","hash":{"sha256":"<hex_ttpl>"},"size_bytes":<bytes_ttpl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"ad_copy","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"AD_COPY_TIKTOK_EN","uri":"dam://campaigns/launch2025/paid/tiktok/en/2025/08/19/AD_COPY_TIKTOK_EN_v1.0.1.md","hash":{"sha256":"<hex_tten>"},"size_bytes":<bytes_tten>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"ad_copy","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"AD_SCRIPTS_YT_PL","uri":"dam://campaigns/launch2025/paid/youtube/pl/2025/08/19/AD_SCRIPTS_YT_PL_v1.0.1.md","hash":{"sha256":"<hex_ytpl>"},"size_bytes":<bytes_ytpl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"video_script","created_by_role":"Video Writer","source_step":"S3","data_classification":"public"},
{"id":"AD_SCRIPTS_YT_EN","uri":"dam://campaigns/launch2025/paid/youtube/en/2025/08/19/AD_SCRIPTS_YT_EN_v1.0.1.md","hash":{"sha256":"<hex_yten>"},"size_bytes":<bytes_yten>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"video_script","created_by_role":"Video Writer","source_step":"S3","data_classification":"public"},
{"id":"SHOTLIST_15S_VERTICAL","uri":"dam://campaigns/launch2025/paid/video/2025/08/19/SHOTLIST_15S_VERTICAL_v1.0.1.md","hash":{"sha256":"<hex_shot>"},"size_bytes":<bytes_shot>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"shotlist","created_by_role":"Video Writer","source_step":"S3","data_classification":"public"},
{"id":"DISPLAY_BANNERS_COPY","uri":"dam://campaigns/launch2025/paid/display/2025/08/19/DISPLAY_BANNERS_COPY_v1.0.1.md","hash":{"sha256":"<hex_disp>"},"size_bytes":<bytes_disp>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"display_copy","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"ALT_TEXT_PACK","uri":"dam://campaigns/launch2025/paid/assets/2025/08/19/ALT_TEXT_PACK_v1.0.1.md","hash":{"sha256":"<hex_alt>"},"size_bytes":<bytes_alt>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"alt_text","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"GOOGLE_RSA_ASSETS_PL","uri":"dam://campaigns/launch2025/paid/google/pl/2025/08/19/GOOGLE_RSA_ASSETS_PL_v1.0.1.json","hash":{"sha256":"<hex_rsapl>"},"size_bytes":<bytes_rsapl>,"content_type":"application/json","locale":"pl","type":"rsa_assets","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"GOOGLE_RSA_ASSETS_EN","uri":"dam://campaigns/launch2025/paid/google/en/2025/08/19/GOOGLE_RSA_ASSETS_EN_v1.0.1.json","hash":{"sha256":"<hex_rsaen>"},"size_bytes":<bytes_rsaen>,"content_type":"application/json","locale":"en","type":"rsa_assets","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"PMAX_ASSET_MAP","uri":"dam://campaigns/launch2025/paid/google/2025/08/19/PMAX_ASSET_MAP_v1.0.1.md","hash":{"sha256":"<hex_pmax>"},"size_bytes":<bytes_pmax>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"pmax_map","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"UTM_RULES","uri":"dam://campaigns/launch2025/paid/utm/2025/08/19/UTM_RULES_v1.0.1.md","hash":{"sha256":"<hex_utm>"},"size_bytes":<bytes_utm>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"spec","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"TARGETING_HYPOTHESES","uri":"dam://campaigns/launch2025/paid/targeting/2025/08/19/TARGETING_HYPOTHESES_v1.0.1.json","hash":{"sha256":"<hex_tg>"},"size_bytes":<bytes_tg>,"content_type":"application/json","locale":"multi","type":"targeting","created_by_role":"Creative Writer","source_step":"S2","data_classification":"internal"},
{"id":"BUDGET_SPLIT_PLAN","uri":"dam://campaigns/launch2025/paid/budget/2025/08/19/BUDGET_SPLIT_PLAN_v1.0.1.json","hash":{"sha256":"<hex_budget>"},"size_bytes":<bytes_budget>,"content_type":"application/json","locale":"multi","type":"budget_plan","created_by_role":"Creative Writer","source_step":"S2","data_classification":"internal"},
{"id":"EXPERIMENT_DESIGN","uri":"dam://campaigns/launch2025/paid/experiments/2025/08/19/EXPERIMENT_DESIGN_v1.0.1.md","hash":{"sha256":"<hex_exp>"},"size_bytes":<bytes_exp>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"experiment_plan","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"BRAND_SAFETY_LISTS","uri":"dam://campaigns/launch2025/paid/brand/2025/08/19/BRAND_SAFETY_LISTS_v1.0.1.md","hash":{"sha256":"<hex_bs>"},"size_bytes":<bytes_bs>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"brand_safety","created_by_role":"Creative Writer","source_step":"S2","data_classification":"internal"},
{"id":"DELIVERABLES_NAMING","uri":"dam://campaigns/launch2025/paid/spec/2025/08/19/DELIVERABLES_NAMING_v1.0.1.md","hash":{"sha256":"<hex_name>"},"size_bytes":<bytes_name>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"spec","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"FLIGHT_SCHEDULE","uri":"dam://campaigns/launch2025/paid/schedule/2025/08/19/FLIGHT_SCHEDULE_v1.0.1.md","hash":{"sha256":"<hex_sched>"},"size_bytes":<bytes_sched>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"schedule","created_by_role":"Creative Writer","source_step":"S2","data_classification":"public"},
{"id":"QA1","uri":"dam://campaigns/launch2025/paid/multi/2025/08/19/QA1_paid_v1.0.0.md","hash":{"sha256":"<hex_qa1>"},"size_bytes":<bytes_qa1>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"qa","created_by_role":"Evaluator","source_step":"S4","data_classification":"internal"}
],
"signatures": [
{"artifact_id":"AD_COPY_META_PL","sig_uri":"dam://campaigns/launch2025/paid/meta/pl/2025/08/19/AD_COPY_META_PL_v1.0.1.md.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"GOOGLE_RSA_ASSETS_EN","sig_uri":"dam://campaigns/launch2025/paid/google/en/2025/08/19/GOOGLE_RSA_ASSETS_EN_v1.0.1.json.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"}
],
"indexes": {
"by_locale": { "pl":["CREATIVE_BRIEF_PL","AD_COPY_META_PL","AD_COPY_TIKTOK_PL","AD_SCRIPTS_YT_PL"], "en":["CREATIVE_BRIEF_EN","AD_COPY_META_EN","AD_COPY_TIKTOK_EN","AD_SCRIPTS_YT_EN"], "multi":["SHOTLIST_15S_VERTICAL","DISPLAY_BANNERS_COPY","ALT_TEXT_PACK","PMAX_ASSET_MAP","UTM_RULES","TARGETING_HYPOTHESES","BUDGET_SPLIT_PLAN","EXPERIMENT_DESIGN","BRAND_SAFETY_LISTS","DELIVERABLES_NAMING","FLIGHT_SCHEDULE","QA1"] },
"by_type": { "brief":["CREATIVE_BRIEF_PL","CREATIVE_BRIEF_EN"], "ad_copy":["AD_COPY_META_PL","AD_COPY_META_EN","AD_COPY_TIKTOK_PL","AD_COPY_TIKTOK_EN","DISPLAY_BANNERS_COPY"], "video_script":["AD_SCRIPTS_YT_PL","AD_SCRIPTS_YT_EN"], "shotlist":["SHOTLIST_15S_VERTICAL"], "alt_text":["ALT_TEXT_PACK"], "rsa_assets":["GOOGLE_RSA_ASSETS_PL","GOOGLE_RSA_ASSETS_EN"], "pmax_map":["PMAX_ASSET_MAP"], "spec":["UTM_RULES","DELIVERABLES_NAMING"], "targeting":["TARGETING_HYPOTHESES"], "budget_plan":["BUDGET_SPLIT_PLAN"], "experiment_plan":["EXPERIMENT_DESIGN"], "brand_safety":["BRAND_SAFETY_LISTS"], "schedule":["FLIGHT_SCHEDULE"], "qa":["QA1"] }
}
}

---

1. Patch planu (S5 → done; plan → completed)

Plik: /tipjar-campaigns/starter-packs/plan.paid.json

{
"patches": [
{"op":"replace","path":"/steps/4/status","value":"done"},
{"op":"replace","path":"/steps/4/attempts","value":1},
{"op":"add","path":"/steps/4/produced","value":["MANIFEST"]},
{"op":"replace","path":"/state","value":"completed"}
]
}

---

1. Harmonogram Flight#1 / Flight#2 (CEST)

Flight #1: 2025-08-20 11:30 → 2025-08-25 23:59

Meta (35%): wideo 9:16 (15s, napisy), statyczne 1:1/4:5 (ALT wg pakietu), copy W1–W5.

TikTok (25%): wideo 9:16 (15s; hooki 1–5; napisy).

YouTube (20%): 6s bumpers + 15s skippable; CTA w końcówce; napisy.

Google (15%): RSA (PL/EN) + PMAX (tekst/obraz/wideo).

Display (5%): 1200×628, 1080×1080, 1080×1920, 300×250/600, 160×600, 728×90.

Flight #2: 2025-08-26 10:00 → 2025-09-02 23:59

Alokacja: meta 30% · tiktok 25% · youtube 20% · google 20% · display 5%.

Zasada: zmieniaj jedną zmienną na raz (np. nagłówek albo wizual).

Checkpointy i decyzje:

T+24 / T+72 / D+7 — wg EXPERIMENT_DESIGN. Progi do wyłączeń/eskalacji: jak w planie testów (brak obietnic wyników).

---

1. Paragony aktywacji (ESP/AdMgr) i telemetria

Po starcie kanału zapisz paragon:
dam://campaigns/launch2025/paid/<channel>/2025/08/20/ACTIVATE_RECEIPT_<channel>_F1.json

{"plan_id":"PLAN-PAID-20250819-001","activated_at":"<ISO CEST>","flight":"F1","batch_id":"<uuid>","artifacts":["<ids>"]}

Telemetria T+0/T+24/T+72 (agregaty, bez PII) — przykład:

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"<ISO CEST>","type":"ENGAGE","plan_id":"PLAN-PAID-20250819-001","channel":"meta","metrics":{"impressions":<n>,"clicks":<n>,"ctr":0.x,"spend":<amount>,"cpc":<amount>,"vtr_3s":0.x,"vtr_6s":0.x,"cvr_profile":0.x}}

---

1. Release notes

Plik: dam://campaigns/launch2025/RELEASE_NOTES.md — dopisz:

[2025-08-19] PLAN-PAID-20250819-001 — FREEZE v1.0.1 (briefy, copy Meta/TikTok, YT 6s/15s/30s, shotlist, display, ALT, RSA PL/EN, PMAX, UTM, targeting, budżet, testy, brand safety, naming, schedule) + manifest; Flight#1: 2025-08-20 11:30 CEST.

---

1. Checklista ETAPU 5/6 (musi być „TAK”)

Artefakty Paid/Kreatywy w DAM (v1.0.1) z hash i podpisem (gdzie wymagane).

Manifest JSON istnieje: poprawne uri/hash/size_bytes/type/indexes.

plan.paid.json: S5.status = done, state = completed.

Aliasy latest ustawione.

Harmonogram Flight#1/#2 gotowy; checkpointy zapisane.

---

Napisz „Dalej”, a przejdę do ETAPU 6/6: Aktywacja kampanii + monitoring T+24/T+72/D+7 (gating decyzji, rotacja budżetu).

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