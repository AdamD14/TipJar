# KROK 6/7 — SEO/Blog — ETAP 6/6: Publikacja + monitoring D+14 — KROK 2/4: Dzień publikacji (paragony + sitemap + D+1 metryki)

Cel kroku: dla wpisu z dnia 2025-08-21 10:00 CEST (/pl/blog/jak-dziala-napiwek) utworzyć paragony publikacji, zaktualizować sitemap, zapisać szablony metryk D+1, oraz przygotować plik przeglądowy D+1 — wszystko bez PII.

---

1. Paragon publikacji (DAM)

Ścieżka:

dam://campaigns/launch2025/seo/publish/2025/08/21/PUBLISH_RECEIPT_blog_jak-dziala-napiwek.json

Treść (uzupełnij pola <...> rzeczywistymi wartościami po publikacji):

{
"plan_id": "PLAN-SEO-20250819-001",
"published_at": "2025-08-21T10:00:00+02:00",
"url": "[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)",
"lang": "pl",
"canonical_url": "[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)",
"hreflang": [
{"lang":"pl","url":"[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)"},
{"lang":"x-default","url":"[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)"}
],
"sitemaps_updated": [
"[https://tipjar.plus/sitemap.xml](https://tipjar.plus/sitemap.xml)",
"[https://tipjar.plus/sitemap_pl.xml](https://tipjar.plus/sitemap_pl.xml)"
],
"hash_sha256_html": "<hex_page_hash>",
"notes": "Publikacja PL; para EN dołączona 2025-08-26."
}

> Gdy 2025-08-26 opublikujesz EN-parę, dopisz do tego paragonu nowy element hreflang z "en" oraz utwórz analogiczny PUBLISH_RECEIPT_blog_how-tipping-works.json.
> 

---

1. Aktualizacja sitemap (URL + lastmod)

Zaktualizuj wpis w sitemapach (czas lastmod = 2025-08-21T10:00:00+02:00):

<url>
<loc>[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)</loc>
<lastmod>2025-08-21T10:00:00+02:00</lastmod>
<changefreq>weekly</changefreq>
<priority>0.7</priority>
</url>

> Zaktualizuj sitemap.xml (agregat) i sitemap_pl.xml. Zgłoszenie map możliwe przez narzędzia webmaster (operacyjnie, poza tym krokiem).
> 

---

1. Metryki D+1 — szablon zapisu (agregaty, bez PII)

Ścieżka (D+1 = 2025-08-22):

dam://campaigns/launch2025/seo/metrics/2025/08/22/METRICS_D+1_jak-dziala-napiwek.json

Treść (wypełnij liczbami, wartości przykładowe = 0):

{
"schema": "tipjar.telemetry.v1",
"plan_id": "PLAN-SEO-20250819-001",
"window": "D+1",
"ts": "2025-08-22T10:05:00+02:00",
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

---

1. Status indeksacji D+1 — szablon (informacyjnie)

Ścieżka:

dam://campaigns/launch2025/seo/index/2025/08/22/INDEX_STATUS_jak-dziala-napiwek.json

Treść:

{
"plan_id": "PLAN-SEO-20250819-001",
"ts": "2025-08-22T10:10:00+02:00",
"url": "[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)",
"indexed": false,
"coverage_pct": null,
"notes": "D+1 — indeksacja może być jeszcze w toku."
}

---

1. Przegląd D+1 — zastosowanie reguł z monitoring.seo.json

Ścieżka:

dam://campaigns/launch2025/seo/review/2025/08/22/REVIEW_D+1_jak-dziala-napiwek.json

Treść (zastosuj if/then dla okna D+1):

{
"plan_id": "PLAN-SEO-20250819-001",
"ts": "2025-08-22T10:15:00+02:00",
"window": "D+1",
"rules_evaluated": [
{"rule":"canonical_ok=false OR jsonld_ok=false","result":"pass","action":null},
{"rule":"impressions=0","result":"observe","action":"monitor_to_D+7"}
],
"notes": "Meta/JSON-LD poprawne; wstępna widoczność niska — obserwacja do D+7."
}

---

1. Hreflang — uzupełnienie pary po publikacji EN (2025-08-26)

Po publikacji /en/blog/how-tipping-works (2025-08-26, 10:00 CEST):

Dodaj w obu stronach znaczniki:

<link rel="alternate" hreflang="pl" href="[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)"/>
<link rel="alternate" hreflang="en" href="[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)"/>
<link rel="alternate" hreflang="x-default" href="[https://tipjar.plus/en/blog/how-tipping-works](https://tipjar.plus/en/blog/how-tipping-works)"/>

Uzupełnij sitemap_en.xml i paragon publikacji EN jak w pkt. 1.

---

1. Aktualizacja EDITORIAL_CALENDAR (status wiersza)

W pliku EDITORIAL_CALENDAR_v1.0.1.csv zmień status dla 2025-08-21, pl, Jak działa napiwek w tipjar+:

... ,Content Writer,planned,...  →  ...,Content Writer,published,[https://tipjar.plus/pl/blog/jak-dziala-napiwek](https://tipjar.plus/pl/blog/jak-dziala-napiwek)

---

1. Checklista zamknięcia KROKU 2/4 (musi być „TAK”)

Paragon publikacji PL zapisany w DAM.

sitemap.xml i sitemap_pl.xml zaktualizowane (lastmod = 2025-08-21T10:00:00+02:00).

Pliki D+1: METRICS_…, INDEX_STATUS_…, REVIEW_… utworzone.

EDITORIAL_CALENDAR zaktualizowany (status = published).

Brak PII; JSON waliduje się poprawnie.

---

Napisz „Dalej”, a przejdę do KROKU 3/4: D+7/D+14 — wypełnianie metryk, decyzje (A/B meta), akcje naprawcze i pary hreflang po EN-publikacji.

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