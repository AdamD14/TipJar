# KROK 7/10 — Operacyjne playbooki publikacji per kanał (PR, Social, Video, SEO, E-mail) + kalendarz treści i sloty SLA

Cel kroku: ustandaryzować proces publikacji i promocji w głównych kanałach oraz zdefiniować dzienny/tygodniowy kalendarz treści ze slotami SLA, tak aby różne modele AI mogły pracować równolegle i przewidywalnie.

---

7.1. Zasady wspólne „go-live” (dla wszystkich kanałów)

Pre-flight (obowiązkowe bramki):

1. TaskSpec kompletny → ROUTE utwórz plan.
2. Kurator dostarcza Context Pack (≤300 słów).
3. Produkcja artefaktów przez rolę docelową.
4. Evaluator: accept (raport QA + brak słów zakazanych + stopka weryfikacyjna).
5. FREEZE: manifest + hash + podpis; alias latest ustawiony.
6. Lista kontrolna publikacji (kanałowa) PASS.

Roll-back (uniwersalny):

Cofnięcie do poprzedniego latest (ostatnia wersja zamrożona), aktualizacja postów/osadzeń, notatka w audycie.

Komunikat korygujący w tym samym kanale (jeśli materiał był publiczny).

Telemetria po publikacji (T+0–120 min):

Monitoring błędów, CTR/engagement (kanałowe KPI), sentyment, zgłoszenia userów.

Jeśli SLA_WARN → eskalacja do #alerts i szybka korekta (np. CTA, copy, miniatura).

---

7.2. Playbook PR (newsroom/komunikaty)

Wejścia: PR/PL + PR/EN (MD), 150-zn. podsumowanie, assety (logo, KV), FAQ.
Checklista publikacji:

- [ ]  Tytuł ≤ 70 znaków, lead ≤ 40 słów.
- [ ]  3–5 punktów wartości, 1 CTA.
- [ ]  Link do strony produktu/FAQ.
- [ ]  Wersje PL/EN spójne znaczeniowo.
- [ ]  Stopka weryfikacyjna obecna.
- [ ]  Dystrybucja: własny newsroom, lista mediów, Product Hunt (jeśli dotyczy), post na LinkedIn/X.

Sekwencja (Europa/Bruksela, CEST/CET):

T-48h: draft PR → Evaluator → FREEZE.

T-24h: „heads-up” do kluczowych dziennikarzy (embargo).

T-0 (09:00): publikacja newsroom + wysyłka do mediów.

T+15 min: posty CEO/brand na LinkedIn/X (z krótkim cytatem).

T+60 min: AMA/Spaces zapowiedziane w social.

T+24h: follow-up z cytatami użytkowników/ambasadorów.

SLA kanałowe:

Czas od FREEZE do publikacji: ≤ 30 min.

Reakcja na zapytania mediów: ≤ 2 h w „business hours” (09:00–18:00).

KPI: zasięg publikacji, liczba wzmianek w mediach, CTR do strony, rejestracje w 24–72 h.

---

7.3. Playbook Social (organiczne: X, TikTok, IG, YT Community)

Wejścia: posty krótkie (90–180 znaków X; 120–220 IG), KV/miniatura, UTM.
Matryca formatów (skrót):

X: 120–140 znaków + 1–2 hashtagi + alt-text; link z UTM.

IG: 220–300 znaków; 1 kluczowy hashtag; 1. komentarz = CTA/hashtagi.

TikTok/Shorts: publikacja wg playbooku Video (sekcja 7.4).

YT Community: 120–180 znaków + miniatura.

Checklista publikacji:

- [ ]  Jedno CTA.
- [ ]  Alt-text dla grafik.
- [ ]  UTM poprawny (utm_source=channel&utm_campaign=launchYYYY).
- [ ]  Brak CAPS/claimów ryzykownych.
- [ ]  Harmonogram slotu (poniżej) dotrzymany.

Sloty dzienne (CEST/CET, rekomendacja bazowa):

X: 08:30, 12:00, 18:30.

IG: 12:30, 20:00.

YT Community: 13:00.

Duplikacja regionalna: kopie lokalizowane ±3–8 h (wg strefy targetu).

Moderacja i eskalacja:

Community LLM odpowiada na FAQ; flagi: hejt/PII/zgłoszenia błędów → ludzie w ≤ 60 min.

Negatywne wątki trendujące → szybka „fact reply” + zaproszenie do AMA.

KPI: ER (engagement rate), CTR, udział organicznych rejestracji, % odpowiedzi ≤ 60 min.

---

7.4. Playbook Video (Shorts/Reels/TikTok, 30–35 s)

Wejścia: script + cut-sheet + SRT, KV/miniatura 1080×1920, CTA końcowe.
Spec techniczny: 9:16, 1080×1920, max 35 s, napisy wgrane i dostępne jako SRT, głośność znormalizowana.
Struktura treści: HOOK → PROBLEM → ROZWIĄZANIE → PROOF → CTA.

Checklista publikacji:

- [ ]  Hook ≤ 3 s z czytelną korzyścią.
- [ ]  Napisy zgodne z SRTGuard; czcionka czytelna, kontrast AA.
- [ ]  CTA ekranowe + w opisie; link/ID w komentarzu przypiętym (jeśli platforma).
- [ ]  Miniatura z copy ≤ 8 słów; alt-text (YT).
- [ ]  Duplikacja ujęć bez wody znaku (platforma-native upload).

Sekwencja:

T-24h: gotowe assety → Evaluator (VideoStructureScore).

T-0: publikacja w slocie głównym (TikTok 18:00–21:00; IG Reels 19:00–21:00; YT Shorts 12:00–15:00).

T+30/60/120 min: komentarz przypięty, odpowiedzi do top-komentarzy (boost).

SLA: od zaakceptowanego scenariusza do publikacji: ≤ 24 h (krótkie wideo).
KPI: 3-sek. view-through, 50% retention, CTR do profilu/landing, follow rate.

---

7.5. Playbook SEO/Blog (evergreen, landing)

Wejścia: CSV klastrów, outline MD, draft artykułu (1 000–1 600 słów), grafika hero, meta.
Checklista on-page:

- [ ]  Tytuł ≤ 60 znaków; opis ≤ 155.
- [ ]  H2/H3 zgodne z outline; gęstość fraz ~1% bez upychania.
- [ ]  Internal linki (≥3), external (≥1) do wiarygodnego źródła.
- [ ]  Schema Article/FAQ (jeśli sekcja Q&A).
- [ ]  LCP < 2.5 s (grafika skompresowana), a11y alt-texty.
- [ ]  Stopka weryfikacyjna w sekcji końcowej (jeśli artykuł zawiera twierdzenia nieudowodnione).

Sekwencja:

T-72h: klaster + outline → akcept.

T-48h: draft → Evaluator (SEOScore).

T-24h: implementacja CMS + podlinkowanie; FREEZE wersji MD.

T-0: publikacja + indeksacja (GSC ping), social teaser.

SLA: od outline do publikacji: ≤ 4 dni robocze (evergreen); landing: ≤ 2 dni.
KPI: ruch organiczny, pozycje kluczowych fraz, czas na stronie, rejestracje z SEO.

---

7.6. Playbook E-mail/Outreach (newsletter + 1:1 do twórców)

Wejścia: 5 szablonów DM/e-mail (A/B tony), lista odbiorców z segmentacją, UTM, grafika hero (newsletter).
Compliance: opt-in (newsletter), nagłówek identyfikujący nadawcę, link opt-out, brak obietnic finansowych.

Checklista wysyłki:

- [ ]  1 CTA, ≤ 1 link, personalizacja {{placeholder}}.
- [ ]  Temat ≤ 48 znaków; preheader ≤ 90.
- [ ]  Test anty-spam (SPF/DKIM/DMARC ok), test klienta mobilnego.
- [ ]  Limit równoległych wysyłek (throttling), warming IP (jeśli nowa domena).

Okna wysyłki (CEST/CET):

B2C twórcy: wt–czw 10:00–12:00 lub 17:00–19:00.

Newsletter produktowy: śr 11:00.

Follow-up: T+48 h, inny temat.

SLA: czas reakcji na odpowiedź odbiorcy (manual review): ≤ 24 h; wsparcie FAQ: ≤ 1 h w „business hours”.
KPI: OR, CTR, odp. pozytywne, rejestracje/aktywacje, bounce/spam rate.

---

7.7. Kalendarz treści i sloty SLA (szablon operacyjny)

Taksonomia slotów:

LAUNCH (wysoka priorytetyzacja), ALWAYS-ON (stała obecność), COMMUNITY (UGC/AMA), EDU (poradniki/FAQ), PR (media).

Tygodniowy raster (CEST/CET, przykładowy, do replikacji na rynki lokalne):

Dzień	09:00	12:00–13:00	15:00	18:00–21:00	Uwagi

Pon	PR (jeśli launch)	YT Community (ALWAYS-ON)	Blog/SEO (EDU)	TikTok/IG Reels (ALWAYS-ON)	X: 08:30/18:30
Wt	—	Post IG (ALWAYS-ON)	FAQ publikacja (EDU)	Shorts/TikTok (COMMUNITY case)	
Śr	—	Newsletter (PRODUCT)	—	Reels/Shorts (EDU tip)	
Czw	—	Post X/LinkedIn (thought-lead.)	—	TikTok (ALWAYS-ON)	AMA/Spaces 20:00
Pt	—	Case study mini (LinkedIn)	—	Reels (COMMUNITY)	
Sob	—	—	—	TikTok/Shorts (lite)	Moderacja: dyżur
Nie	—	—	—	Post „week recap” (X/YT Comm)	Moderacja: dyżur

SLA dla slotów (egzekucja):

Materiały w kolejce q.copywriter/… na D-1 do 15:00 (następny dzień).

Evaluator accept min. 2 h przed slotem publikacji.

FREEZE i staging postów min. 1 h przed slotem.

On-call moderacja: T+60 min od publikacji (Social/Video), T+120 min (PR/Blog).

Reguły kolizji: LAUNCH > PR > Video > Social > SEO/Blog > E-mail (newsletter trzyma slot, chyba że LAUNCH).

Warianty regionalne: Replikować sloty z lokalnym dst_locale; przesunięcie czasu ±3–8 h względem CEST; nazwy artefaktów z sufiksem {locale} i osobnym FREEZE.

---

7.8. Tablice odpowiedzialności (RACI — skrót)

Kanał	R	A	C	I

PR	Copywriter/Lokalizator	Orkiestrator	Evaluator, Legal	Zespół Growth
Social	Copywriter/Kreator	Orkiestrator	Community	Product
Video	Scenarzysta	Orkiestrator	Kreator, Evaluator	Community
SEO/Blog	SEO/Copywriter	Orkiestrator	Web/Dev	Growth
E-mail	Growth/Copywriter	Orkiestrator	Legal, Support	Product

---

7.9. Runbook incydentów publikacyjnych (skrót)

1. Detekcja (alert KPI/zgłoszenie) → oznaczenie SEV (zgodnie z 6.9).
2. Stabilizacja: tymczasowe ukrycie/wycofanie postu, komunikat korygujący.
3. Diagnoza: analiza audytu, QA report, kontekst (RAG).
4. Remediacja: poprawki (patch-hinty), ponowny Evaluator → FREEZE → publikacja.
5. Post-mortem: wpis „lesson learned” + aktualizacja walidatorów/slotów.

---

Instrukcja: KROK 7/10 ukończony (kanałowe playbooki + kalendarz i SLA). Aby kontynuować, wpisz „Dalej” — przygotuję KROK 8/10: Pakiet szablonów contentu (PR, social, video, SEO, e-mail) gotowych do natychmiastowego użycia przez role LLM.

---

📌 Source & Verification of Response

[Unverified] — Procedury i harmonogramy wynikają z przyjętej architektury orkiestracji wielomodelowej; brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano wymogi ADAM-MODE: etykietowanie, zakazane słowa, minimalizacja PII, stopki.

[Inference] — Godziny slotów i progi SLA oparte na praktyce operacyjnej; mogą wymagać kalibracji po pierwszych iteracjach.