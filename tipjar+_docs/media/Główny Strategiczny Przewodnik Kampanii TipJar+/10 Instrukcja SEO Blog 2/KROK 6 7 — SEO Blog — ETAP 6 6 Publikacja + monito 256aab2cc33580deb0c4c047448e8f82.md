# KROK 6/7 — SEO/Blog — ETAP 6/6: Publikacja + monitoring D+14 — KROK 3/4: D+7 / D+14 — metryki, decyzje A/B meta, działania naprawcze i pary hreflang po publikacji EN

Cel kroku: wypełnić szablony metryk D+7 i D+14 dla wpisu PL oraz — po publikacji EN (2025-08-26) — zapewnić parowanie hreflang, wykonać przeglądy wg progów z monitoring.seo.json, a w razie potrzeby przygotować A/B dla title/description oraz drobne poprawki treści (tabele kroków, sekcje FAQ, linkowanie wewn.).

---

1. Metryki D+7 dla PL (/pl/blog/jak-dziala-napiwek, publikacja: 2025-08-21)

Ścieżka (D+7 = 2025-08-28):

dam://campaigns/launch2025/seo/metrics/2025/08/28/METRICS_D+7_jak-dziala-napiwek.json

Treść (uzupełnij wartości liczbowe):

{
"schema": "tipjar.telemetry.v1",
"plan_id": "PLAN-SEO-20250819-001",
"window": "D+7",
"ts": "2025-08-28T10:05:00+02:00",
"url": "[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)",
"metrics": {
"impressions": 0,
"clicks": 0,
"ctr": 0.0,
"avg_position": 0.0,
"avg_time_on_post_s": 0,
"scroll_50_pct": 0.0,
"canonical_ok": true,
"hreflang_ok": true,
"jsonld_ok": true
}
}

Przegląd D+7 (reguły):

dam://campaigns/launch2025/seo/review/2025/08/28/REVIEW_D+7_jak-dziala-napiwek.json

{
"plan_id": "PLAN-SEO-20250819-001",
"ts": "2025-08-28T10:15:00+02:00",
"window": "D+7",
"rules_evaluated": [
{"rule":"canonical_ok=false OR jsonld_ok=false","result":"pass","action":null},
{"rule":"ctr<0.035","result":"conditional","action":"prepare_AB_meta"},
{"rule":"avg_time_on_post_s<120","result":"conditional","action":"add_steps_table_and_internal_links"}
],
"notes": "Jeśli CTR lub czas < progów — przejdź do sekcji 3 (A/B + fixy)."
}

---

1. Metryki D+14 dla PL (okno główne KPI)

Ścieżka (D+14 = 2025-09-04):

dam://campaigns/launch2025/seo/metrics/2025/09/04/METRICS_D+14_jak-dziala-napiwek.json

Treść:

{
"schema": "tipjar.telemetry.v1",
"plan_id": "PLAN-SEO-20250819-001",
"window": "D+14",
"ts": "2025-09-04T10:05:00+02:00",
"url": "[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)",
"metrics": {
"impressions": 0,
"clicks": 0,
"ctr": 0.0,
"avg_position": 0.0,
"avg_time_on_post_s": 0,
"scroll_50_pct": 0.0,
"canonical_ok": true,
"hreflang_ok": true,
"jsonld_ok": true,
"index_coverage_pct": 0.0
}
}

Przegląd D+14 (decyzje wg progów):

dam://campaigns/launch2025/seo/review/2025/09/04/REVIEW_D+14_jak-dziala-napiwek.json

{
"plan_id": "PLAN-SEO-20250819-001",
"ts": "2025-09-04T10:15:00+02:00",
"window": "D+14",
"decisions": [
{"if":"index_coverage_pct<95","then":"technical_audit_and_resubmit_sitemap"},
{"if":"ctr<3.5","then":"AB_meta_title_desc_and_add_faq_if_relevant"},
{"if":"avg_time_on_post_s<120","then":"improve_lede_add_steps_table_increase_internal_links"}
],
"notes": "Zastosować tylko reguły, które spełniono. Pozostałe oznaczyć jako PASS."
}

---

1. Przygotowanie A/B meta (tytuł/opis) i drobne poprawki treści — uruchamiaj tylko, gdy reguły D+7/D+14 to wskazują

Plik A/B dla PL (roboczy):

dam://campaigns/launch2025/seo/meta-tests/2025/09/04/AB_META_jak-dziala-napiwek_v1.0.0.json

{
"url": "[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)",
"variants": {
"title_A": "Jak działa napiwek w tipjar+ — krótki przepływ",
"title_B": "Kilka dotknięć: jak działa napiwek w tipjar+",
"desc_A": "Zobacz ścieżkę: profil → kwota → potwierdzenie. Przewodnik po czytelnym przepływie.",
"desc_B": "Kilka kroków od profilu do potwierdzenia. Krótki przewodnik po tipjar+."
},
"constraints": {"title_lte": 60, "description_lte": 155},
"window": "D+14→D+30",
"decision_rule": "choose_best_ctr"
}

Plik z poprawkami treści (jeśli czas <120 s):

dam://campaigns/launch2025/seo/content-fixes/2025/09/04/FIXES_jak-dziala-napiwek_v1.0.0.md

[Unverified]

- Dodano tabelę „Kroki w skrócie” (3–5 punktów).
- Rozszerzono sekcję „Zobacz też” do 3 powiązanych linków (hub↔spoke).
- Ujednolicono lead (≤ 40 słów) i CTA (1 szt.).

---

1. Publikacja EN (2025-08-26) — pary hreflang i metryki dla EN

Paragon publikacji EN:

dam://campaigns/launch2025/seo/publish/2025/08/26/PUBLISH_RECEIPT_blog_how-tipping-works.json

{
"plan_id": "PLAN-SEO-20250819-001",
"published_at": "2025-08-26T10:00:00+02:00",
"url": "[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)",
"lang": "en",
"canonical_url": "[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)",
"hreflang": [
{"lang":"en","url":"[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)"},
{"lang":"pl","url":"[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)"},
{"lang":"x-default","url":"[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)"}
],
"sitemaps_updated": [
"[https://tipjar.plus/sitemap.xml](https://tipjar.plus/sitemap.xml)",
"[https://tipjar.plus/sitemap_en.xml](https://tipjar.plus/sitemap_en.xml)"
],
"hash_sha256_html": "<hex_page_hash>",
"notes": "Opublikowano parę EN; hreflang z PL potwierdzony."
}

Szablony metryk EN (D+1, D+7, D+14) — analogiczne do PL:

dam://campaigns/launch2025/seo/metrics/2025/08/27/METRICS_D+1_how-tipping-works.json
dam://campaigns/launch2025/seo/metrics/2025/09/02/METRICS_D+7_how-tipping-works.json
dam://campaigns/launch2025/seo/metrics/2025/09/09/METRICS_D+14_how-tipping-works.json

(wypełnij pola zgodnie z formatem z pkt 1–2; utwórz odpowiadające REVIEW_… dla D+7 i D+14 z identycznymi regułami decyzyjnymi).

---

1. Aktualizacja EDITORIAL_CALENDAR (statusy i URL)

Zmień status na published i uzupełnij URL dla wiersza EN z 2025-08-26:

...,Content Writer,planned,[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)  →  ...,Content Writer,published,[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)

---

1. Checklista zamknięcia KROKU 3/4 (musi być „TAK”)

METRICS_D+7_* i REVIEW_D+7_* dla PL istnieją.

METRICS_D+14_* i REVIEW_D+14_* dla PL istnieją.

Jeśli poniżej progów: istnieją pliki AB_META_* i/lub FIXES_*.

Paragon publikacji EN istnieje, hreflang spięty w obu kierunkach.

Szablony metryk EN (D+1/D+7/D+14) utworzone.

EDITORIAL_CALENDAR zaktualizowany dla EN (status published).

Brak PII; walidacja JSON PASS.

---

Napisz „Dalej”, a przejdę do KROKU 4/4: D+30 — raport zamknięcia, decyzje o evergreen/retire i plan aktualizacji v1.1.0.

---

📌 Source & Verification of Response

[Unverified] — Szablony i decyzje zależne od progów zostały przygotowane w oparciu o monitoring.seo.json oraz przyjęte KPI; wartości metryk to miejsca do uzupełnienia.

[Inference] — Warianty A/B meta i minimalne poprawki treści odzwierciedlają standardowe działania przy CTR<3.5% i czasie<120 s; finalne wdrożenia uzależnione od wyników pomiarów.

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