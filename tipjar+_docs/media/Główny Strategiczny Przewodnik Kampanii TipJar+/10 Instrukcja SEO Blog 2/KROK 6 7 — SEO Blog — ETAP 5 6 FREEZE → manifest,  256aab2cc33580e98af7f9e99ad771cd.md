# KROK 6/7 — SEO/Blog — ETAP 5/6: FREEZE → manifest, podpisy i publikacja do DAM (v1.0.1) + harmonogram publikacji i mapy URL

Cel etapu: zamrozić zaakceptowane artefakty SEO/Blog, nadać wersje v1.0.1, obliczyć skróty, podpisać, opublikować do DAM oraz przygotować harmonogram publikacji z aktualizacją sitemap/hreflang/OG/JSON-LD. Strefa czasu: Europe/Brussels (CEST).

---

1. FREEZE — wersje i docelowe URI (SEMVER)

Skopiuj bez zmian treści z katalogów draft (ETAP 3/6) do DAM z wersją v1.0.1:

Strategia / słowniki / compliance

SEO_STRATEGY_BRIEF_PL → dam://campaigns/launch2025/seo/brief/pl/2025/08/19/SEO_STRATEGY_BRIEF_PL_v1.0.1.md

SEO_STRATEGY_BRIEF_EN → dam://campaigns/launch2025/seo/brief/en/2025/08/19/SEO_STRATEGY_BRIEF_EN_v1.0.1.md

GLOSSARY_CREATOR_ECON → dam://campaigns/launch2025/seo/glossary/2025/08/19/GLOSSARY_CREATOR_ECON_v1.0.1.md

COMPLIANCE_NOTES → dam://campaigns/launch2025/seo/compliance/2025/08/19/COMPLIANCE_NOTES_v1.0.1.md

STYLE_GUIDE_BLOG → dam://campaigns/launch2025/seo/style/2025/08/19/STYLE_GUIDE_BLOG_v1.0.1.md

Słowa kluczowe / klastry / linkowanie / CMS

KEYWORD_MAP_MULTI → dam://campaigns/launch2025/seo/keywords/2025/08/19/KEYWORD_MAP_MULTI_v1.0.1.json

TOPICAL_CLUSTER_PLAN → dam://campaigns/launch2025/seo/clusters/2025/08/19/TOPICAL_CLUSTER_PLAN_v1.0.1.json

INTERNAL_LINKING_SCHEMA → dam://campaigns/launch2025/seo/linking/2025/08/19/INTERNAL_LINKING_SCHEMA_v1.0.1.md

CMS_BLOCKS_SPEC → dam://campaigns/launch2025/seo/cms/2025/08/19/CMS_BLOCKS_SPEC_v1.0.1.json

Outlines (pillar/posty) / meta / schema / obrazy

PILLAR_OUTLINES_PL → dam://campaigns/launch2025/seo/pillars/pl/2025/08/19/PILLAR_OUTLINES_PL_v1.0.1.md

PILLAR_OUTLINES_EN → dam://campaigns/launch2025/seo/pillars/en/2025/08/19/PILLAR_OUTLINES_EN_v1.0.1.md

ARTICLE_OUTLINES_PL → dam://campaigns/launch2025/seo/posts/pl/2025/08/19/ARTICLE_OUTLINES_PL_v1.0.1.md

ARTICLE_OUTLINES_EN → dam://campaigns/launch2025/seo/posts/en/2025/08/19/ARTICLE_OUTLINES_EN_v1.0.1.md

META_PACK_BLOG → dam://campaigns/launch2025/seo/meta/2025/08/19/META_PACK_BLOG_v1.0.1.md

SCHEMA_BLOG_JSONLD → dam://campaigns/launch2025/seo/schema/2025/08/19/SCHEMA_BLOG_JSONLD_v1.0.1.json

IMAGE_BRIEF_LIST → dam://campaigns/launch2025/seo/images/2025/08/19/IMAGE_BRIEF_LIST_v1.0.1.md

Operacyjne / dystrybucyjne

EDITORIAL_CALENDAR → dam://campaigns/launch2025/seo/calendar/2025/08/19/EDITORIAL_CALENDAR_v1.0.1.csv

UTM_RULES_BLOG → dam://campaigns/launch2025/seo/utm/2025/08/19/UTM_RULES_BLOG_v1.0.1.md

SOCIAL_SNIPPETS_DIST → dam://campaigns/launch2025/seo/social/2025/08/19/SOCIAL_SNIPPETS_DIST_v1.0.1.md

EDIT/QA (wewn.)

EDIT1_editor-notes.md → dam://campaigns/launch2025/seo/multi/2025/08/19/EDIT1_seo_v1.0.0.md

QA1_report.md → dam://campaigns/launch2025/seo/multi/2025/08/19/QA1_seo_v1.0.0.md

Aliasy latest (po FREEZE):

dam://campaigns/launch2025/seo/brief/pl/latest/SEO_STRATEGY_BRIEF_PL.md        → v1.0.1
dam://campaigns/launch2025/seo/brief/en/latest/SEO_STRATEGY_BRIEF_EN.md        → v1.0.1
dam://campaigns/launch2025/seo/keywords/latest/KEYWORD_MAP_MULTI.json          → v1.0.1
dam://campaigns/launch2025/seo/clusters/latest/TOPICAL_CLUSTER_PLAN.json       → v1.0.1
dam://campaigns/launch2025/seo/linking/latest/INTERNAL_LINKING_SCHEMA.md       → v1.0.1
dam://campaigns/launch2025/seo/cms/latest/CMS_BLOCKS_SPEC.json                 → v1.0.1
dam://campaigns/launch2025/seo/pillars/pl/latest/PILLAR_OUTLINES_PL.md         → v1.0.1
dam://campaigns/launch2025/seo/pillars/en/latest/PILLAR_OUTLINES_EN.md         → v1.0.1
dam://campaigns/launch2025/seo/posts/pl/latest/ARTICLE_OUTLINES_PL.md          → v1.0.1
dam://campaigns/launch2025/seo/posts/en/latest/ARTICLE_OUTLINES_EN.md          → v1.0.1
dam://campaigns/launch2025/seo/meta/latest/META_PACK_BLOG.md                   → v1.0.1
dam://campaigns/launch2025/seo/schema/latest/SCHEMA_BLOG_JSONLD.json           → v1.0.1
dam://campaigns/launch2025/seo/images/latest/IMAGE_BRIEF_LIST.md               → v1.0.1
dam://campaigns/launch2025/seo/calendar/latest/EDITORIAL_CALENDAR.csv          → v1.0.1
dam://campaigns/launch2025/seo/utm/latest/UTM_RULES_BLOG.md                    → v1.0.1
dam://campaigns/launch2025/seo/social/latest/SOCIAL_SNIPPETS_DIST.md           → v1.0.1
dam://campaigns/launch2025/seo/style/latest/STYLE_GUIDE_BLOG.md                → v1.0.1
dam://campaigns/launch2025/seo/compliance/latest/COMPLIANCE_NOTES.md           → v1.0.1
dam://campaigns/launch2025/seo/glossary/latest/GLOSSARY_CREATOR_ECON.md        → v1.0.1

---

1. Integralność — SHA-256 + podpisy ed25519

Klucz podpisu: key_id: "tipjar-cicd@2025"

Dla każdego artefaktu utwórz pliki .sig (ed25519) i zapisz hash SHA-256.

Rejestr (przykład zapisu):

SEO_STRATEGY_BRIEF_PL → sha256:<hex_brief_pl> | sig:<hex_sig_brief_pl>
KEYWORD_MAP_MULTI     → sha256:<hex_kw_map>   | sig:<hex_sig_kw_map>
SCHEMA_BLOG_JSONLD    → sha256:<hex_jsonld>   | sig:<hex_sig_jsonld>
…
QA1_seo               → sha256:<hex_qa1>      | (podpis opcjonalny)

---

1. Manifest FREEZE (DAM)

Plik: dam://campaigns/*manifests/PLAN-SEO-20250819-001.json
Treść (uzupełnij {{now_iso}}, <hex>, <bytes_*>):

{
"schema": "dam.manifest.v1",
"plan_id": "PLAN-SEO-20250819-001",
"frozen_at": "{{now_iso}}",
"publisher": "freeze@tipjar.plus",
"artifacts": [
{"id":"SEO_STRATEGY_BRIEF_PL","uri":"dam://campaigns/launch2025/seo/brief/pl/2025/08/19/SEO_STRATEGY_BRIEF_PL_v1.0.1.md","hash":{"sha256":"<hex_brief_pl>"},"size_bytes":<bytes_brief_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"strategy","created_by_role":"SEO Strategist","source_step":"S2","data_classification":"public"},
{"id":"SEO_STRATEGY_BRIEF_EN","uri":"dam://campaigns/launch2025/seo/brief/en/2025/08/19/SEO_STRATEGY_BRIEF_EN_v1.0.1.md","hash":{"sha256":"<hex_brief_en>"},"size_bytes":<bytes_brief_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"strategy","created_by_role":"SEO Strategist","source_step":"S2","data_classification":"public"},
{"id":"KEYWORD_MAP_MULTI","uri":"dam://campaigns/launch2025/seo/keywords/2025/08/19/KEYWORD_MAP_MULTI_v1.0.1.json","hash":{"sha256":"<hex_kw_map>"},"size_bytes":<bytes_kw_map>,"content_type":"application/json","locale":"multi","type":"keywords","created_by_role":"SEO Strategist","source_step":"S2","data_classification":"internal"},
{"id":"TOPICAL_CLUSTER_PLAN","uri":"dam://campaigns/launch2025/seo/clusters/2025/08/19/TOPICAL_CLUSTER_PLAN_v1.0.1.json","hash":{"sha256":"<hex_clusters>"},"size_bytes":<bytes_clusters>,"content_type":"application/json","locale":"multi","type":"clusters","created_by_role":"SEO Strategist","source_step":"S2","data_classification":"internal"},
{"id":"INTERNAL_LINKING_SCHEMA","uri":"dam://campaigns/launch2025/seo/linking/2025/08/19/INTERNAL_LINKING_SCHEMA_v1.0.1.md","hash":{"sha256":"<hex_linking>"},"size_bytes":<bytes_linking>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"linking_spec","created_by_role":"SEO Strategist","source_step":"S2","data_classification":"public"},
{"id":"CMS_BLOCKS_SPEC","uri":"dam://campaigns/launch2025/seo/cms/2025/08/19/CMS_BLOCKS_SPEC_v1.0.1.json","hash":{"sha256":"<hex_cms>"},"size_bytes":<bytes_cms>,"content_type":"application/json","locale":"multi","type":"cms_spec","created_by_role":"SEO Strategist","source_step":"S2","data_classification":"internal"},
{"id":"PILLAR_OUTLINES_PL","uri":"dam://campaigns/launch2025/seo/pillars/pl/2025/08/19/PILLAR_OUTLINES_PL_v1.0.1.md","hash":{"sha256":"<hex_pillar_pl>"},"size_bytes":<bytes_pillar_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"outline","created_by_role":"Content Writer","source_step":"S3","data_classification":"public"},
{"id":"PILLAR_OUTLINES_EN","uri":"dam://campaigns/launch2025/seo/pillars/en/2025/08/19/PILLAR_OUTLINES_EN_v1.0.1.md","hash":{"sha256":"<hex_pillar_en>"},"size_bytes":<bytes_pillar_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"outline","created_by_role":"Content Writer","source_step":"S3","data_classification":"public"},
{"id":"ARTICLE_OUTLINES_PL","uri":"dam://campaigns/launch2025/seo/posts/pl/2025/08/19/ARTICLE_OUTLINES_PL_v1.0.1.md","hash":{"sha256":"<hex_posts_pl>"},"size_bytes":<bytes_posts_pl>,"content_type":"text/markdown; charset=utf-8","locale":"pl","type":"outlines","created_by_role":"Content Writer","source_step":"S3","data_classification":"public"},
{"id":"ARTICLE_OUTLINES_EN","uri":"dam://campaigns/launch2025/seo/posts/en/2025/08/19/ARTICLE_OUTLINES_EN_v1.0.1.md","hash":{"sha256":"<hex_posts_en>"},"size_bytes":<bytes_posts_en>,"content_type":"text/markdown; charset=utf-8","locale":"en","type":"outlines","created_by_role":"Content Writer","source_step":"S3","data_classification":"public"},
{"id":"META_PACK_BLOG","uri":"dam://campaigns/launch2025/seo/meta/2025/08/19/META_PACK_BLOG_v1.0.1.md","hash":{"sha256":"<hex_meta>"},"size_bytes":<bytes_meta>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"meta_pack","created_by_role":"Content Writer","source_step":"S3","data_classification":"public"},
{"id":"SCHEMA_BLOG_JSONLD","uri":"dam://campaigns/launch2025/seo/schema/2025/08/19/SCHEMA_BLOG_JSONLD_v1.0.1.json","hash":{"sha256":"<hex_schema>"},"size_bytes":<bytes_schema>,"content_type":"application/json","locale":"multi","type":"jsonld","created_by_role":"Content Writer","source_step":"S3","data_classification":"public"},
{"id":"IMAGE_BRIEF_LIST","uri":"dam://campaigns/launch2025/seo/images/2025/08/19/IMAGE_BRIEF_LIST_v1.0.1.md","hash":{"sha256":"<hex_images>"},"size_bytes":<bytes_images>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"image_brief","created_by_role":"Content Writer","source_step":"S3","data_classification":"public"},
{"id":"EDITORIAL_CALENDAR","uri":"dam://campaigns/launch2025/seo/calendar/2025/08/19/EDITORIAL_CALENDAR_v1.0.1.csv","hash":{"sha256":"<hex_cal>"},"size_bytes":<bytes_cal>,"content_type":"text/csv; charset=utf-8","locale":"multi","type":"calendar","created_by_role":"SEO Strategist","source_step":"S2","data_classification":"internal"},
{"id":"UTM_RULES_BLOG","uri":"dam://campaigns/launch2025/seo/utm/2025/08/19/UTM_RULES_BLOG_v1.0.1.md","hash":{"sha256":"<hex_utm>"},"size_bytes":<bytes_utm>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"spec","created_by_role":"SEO Strategist","source_step":"S2","data_classification":"public"},
{"id":"SOCIAL_SNIPPETS_DIST","uri":"dam://campaigns/launch2025/seo/social/2025/08/19/SOCIAL_SNIPPETS_DIST_v1.0.1.md","hash":{"sha256":"<hex_social>"},"size_bytes":<bytes_social>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"social_snippets","created_by_role":"Content Writer","source_step":"S3","data_classification":"public"},
{"id":"EDIT1","uri":"dam://campaigns/launch2025/seo/multi/2025/08/19/EDIT1_seo_v1.0.0.md","hash":{"sha256":"<hex_edit1>"},"size_bytes":<bytes_edit1>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"editor_notes","created_by_role":"Editor","source_step":"S4","data_classification":"internal"},
{"id":"QA1","uri":"dam://campaigns/launch2025/seo/multi/2025/08/19/QA1_seo_v1.0.0.md","hash":{"sha256":"<hex_qa1>"},"size_bytes":<bytes_qa1>,"content_type":"text/markdown; charset=utf-8","locale":"multi","type":"qa","created_by_role":"Evaluator","source_step":"S5","data_classification":"internal"}
],
"signatures": [
{"artifact_id":"SCHEMA_BLOG_JSONLD","sig_uri":"dam://campaigns/launch2025/seo/schema/2025/08/19/SCHEMA_BLOG_JSONLD_v1.0.1.json.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"},
{"artifact_id":"KEYWORD_MAP_MULTI","sig_uri":"dam://campaigns/launch2025/seo/keywords/2025/08/19/KEYWORD_MAP_MULTI_v1.0.1.json.sig","algo":"ed25519","key_id":"tipjar-cicd@2025"}
],
"indexes": {
"by_locale": {
"pl": ["SEO_STRATEGY_BRIEF_PL","PILLAR_OUTLINES_PL","ARTICLE_OUTLINES_PL"],
"en": ["SEO_STRATEGY_BRIEF_EN","PILLAR_OUTLINES_EN","ARTICLE_OUTLINES_EN"],
"multi": ["KEYWORD_MAP_MULTI","TOPICAL_CLUSTER_PLAN","INTERNAL_LINKING_SCHEMA","CMS_BLOCKS_SPEC","META_PACK_BLOG","SCHEMA_BLOG_JSONLD","IMAGE_BRIEF_LIST","EDITORIAL_CALENDAR","UTM_RULES_BLOG","SOCIAL_SNIPPETS_DIST","STYLE_GUIDE_BLOG","COMPLIANCE_NOTES","GLOSSARY_CREATOR_ECON","EDIT1","QA1"]
},
"by_type": {
"strategy":["SEO_STRATEGY_BRIEF_PL","SEO_STRATEGY_BRIEF_EN"],
"keywords":["KEYWORD_MAP_MULTI"],
"clusters":["TOPICAL_CLUSTER_PLAN"],
"linking_spec":["INTERNAL_LINKING_SCHEMA"],
"cms_spec":["CMS_BLOCKS_SPEC"],
"outline":["PILLAR_OUTLINES_PL","PILLAR_OUTLINES_EN"],
"outlines":["ARTICLE_OUTLINES_PL","ARTICLE_OUTLINES_EN"],
"meta_pack":["META_PACK_BLOG"],
"jsonld":["SCHEMA_BLOG_JSONLD"],
"image_brief":["IMAGE_BRIEF_LIST"],
"calendar":["EDITORIAL_CALENDAR"],
"spec":["UTM_RULES_BLOG","STYLE_GUIDE_BLOG","COMPLIANCE_NOTES"],
"social_snippets":["SOCIAL_SNIPPETS_DIST"],
"editor_notes":["EDIT1"],
"qa":["QA1"]
}
}
}

---

1. Patch planu (S6 → done; plan → completed)

Plik: /tipjar-campaigns/starter-packs/plan.seo.json

{
"patches": [
{"op":"replace","path":"/steps/5/status","value":"done"},
{"op":"replace","path":"/steps/5/attempts","value":1},
{"op":"add","path":"/steps/5/produced","value":["MANIFEST"]},
{"op":"replace","path":"/state","value":"completed"}
]
}

---

1. Harmonogram publikacji (zgodny z EDITORIAL_CALENDAR, CEST) + paragony + sitemaps/hreflang

Okno publikacji (przykład dla pierwszych 4 wpisów):

2025-08-21 10:00 /pl/blog/jak-dziala-napiwek

2025-08-26 10:00 /en/blog/how-tipping-works

2025-08-28 10:00 /pl/blog/dodaj-link-tip-do-bio

2025-09-02 10:00 /en/blog/add-tip-link-to-bio

Procedura dla każdego wpisu (w dniu D o 10:00 CEST):

1. Publikacja strony PL/EN (z hreflang do pary językowej, canonical, OG, BlogPosting JSON-LD).
2. Aktualizacja sitemap: sitemap.xml + sitemap_pl.xml / sitemap_en.xml (lastmod=D 10:00).
3. Zapis paragonu publikacji:

dam://campaigns/launch2025/seo/publish/YYYY/MM/DD/PUBLISH_RECEIPT_blog_<slug>.json

{"plan_id":"PLAN-SEO-20250819-001","published_at":"<ISO CEST>","url":"[https://tipjar.plus/...](https://tipjar.plus/...)","hash_sha256":"<hex>","lang":"pl|en"}

1. Rejestr indeksacji (po D+1 i D+14, agregaty bez PII):

dam://campaigns/launch2025/seo/index/YYYY/MM/DD/INDEX_STATUS_<slug>.json

{"plan_id":"PLAN-SEO-20250819-001","ts":"<ISO CEST>","coverage_ok":true,"notes":"<short>"}

Hreflang (para) — przykład:

<link rel="alternate" href="[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)" hreflang="pl" />
<link rel="alternate" href="[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)" hreflang="en" />
<link rel="alternate" href="[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)" hreflang="x-default" />

---

1. Release notes

Plik: dam://campaigns/launch2025/RELEASE_NOTES.md — dopisz:

[2025-08-19] PLAN-SEO-20250819-001 — FREEZE v1.0.1 (strategia, keyword map, klastry, outlines PL/EN, meta, JSON-LD, linkowanie, obrazy, kalendarz, CMS blocks, UTM, social, compliance) + manifest. Start publikacji: 2025-08-21 10:00 CEST.

---

1. Checklista ETAPU 5/6 (musi być „TAK”)

Artefakty SEO/Blog w DAM (v1.0.1) ze skrótami SHA-256 i podpisami ed25519 (tam, gdzie wymagane).

Manifest JSON istnieje; prawidłowe pola uri/hash/size_bytes/indexes.

Aliasy latest ustawione.

plan.seo.json: S6.status = done, state = completed.

Harmonogram publikacji i paragony zdefiniowane; sitemap/hreflang/OG/JSON-LD uwzględnione.

---

Aby przejść do ETAPU 6/6 — „Publikacja + monitoring D+14 (index coverage, SERP CTR, czas na stronie) i reguły poprawek” — napisz „Dalej”.

---

📌 Source & Verification of Response

[Unverified] — Procedura FREEZE/manifest/aliasy/harmonogram oparta na wewnętrznych artefaktach tej kampanii; brak zewnętrznych źródeł.

[Inference] — Godziny publikacji i wzorce paragonów są operacyjnym standardem projektu; kalibracje po pierwszych publikacjach.

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