# KROK 3/7 — E-mail / Outreach: newsletter produktowy + 1:1 do twórców/partnerów (ogólny)

Cel: pozyskać rejestracje i aktywacje dzięki cyklicznemu newsletterowi oraz spersonalizowanym wiadomościom 1:1 do twórców i partnerów — zgodnie z ADAM-MODE.

Wejścia

Szablony z pakietu (Krok 8): [template.email.a.md](http://template.email.a.md/), [template.email.b.md](http://template.email.b.md/).

Segmenty odbiorców: newsletter_optin, creators_prospect, partners_warm.

KV/hero, linki z UTM do landing/FAQ.

Polityka anty-spam: SPF/DKIM/DMARC gotowe, warming domeny.

Wyjścia

1× tygodniowy newsletter produktowy (PL/EN).

3–5 sekwencji outreach 1:1 (PL/EN) z 1 follow-upem po 48 h.

Raport OR/CTR/Replies oraz lista kontaktów do dalszej opieki.

Proces (wysoki poziom)

1. Segmentacja: odśwież listy, usuń bouncy i wypisy.
2. Copy & assety: wybierz wariant A/B (ton rzeczowy vs energiczny), 1 grafika hero.
3. Compliance: nagłówek nadawcy, stopka opt-out, brak obietnic finansowych, placeholdery {{...}}.
4. Technika: throttling wysyłek, test klienta mobilnego, test SPAM, UTM.
5. Harmonogram:

Newsletter: środa 11:00 (CEST).

Outreach 1:1: wt/czw 10:00–12:00 oraz 17:00–19:00 (CEST).

1. Publikacja: wysyłka, zapis paragonów (payload i skróty) do DAM.
2. Telemetria T+0/24/72 h: zrzut OR/CTR/Replies/Unsubscribe, wnioski do A/B.

Checklist (PASS/FAIL)

- [ ]  Temat ≤ 48 znaków; preheader ≤ 90.
- [ ]  Treść ≤ 120 słów, 1 CTA, 1 link z UTM.
- [ ]  Grafika hero z ALT; kontrast AA.
- [ ]  SPF/DKIM/DMARC OK, warming aktywny; throttling ustawiony.
- [ ]  Opt-in (newsletter) / podstawa kontaktu (outreach) potwierdzona.
- [ ]  Stopka opt-out obecna; brak PII poza dopuszczoną personalizacją {{imię}}.
- [ ]  Brak słów ryzykownych; etykieta [Unverified] w wersjach roboczych; stopka weryfikacyjna w plikach MD.
- [ ]  Paragon wysyłki + hash w DAM; zdarzenia PUBLISH/ENGAGE w telemetrii.

KPI (start)

OR (newsletter): 30–45% (do kalibracji).

CTR: ≥ 2.5% (newsletter), ≥ 4.0% (outreach).

Replies (outreach): ≥ 8% pozytywnych odpowiedzi.

Bounce rate: ≤ 2% po warmingu.

Spam rate: ≤ 0.1%.

Telemetria (schemat skrótowy)

PUBLISH {channel:"email", segment, count_sent}

ENGAGE {opens, unique_clicks, replies, unsubscribes, bounces}

FUNNEL {signups, activations}
Wszystko w tipjar.telemetry.v1 z UTM dopiętym do źródła/medium.

Artefakty i ścieżki (przykład)

/campaigns/launch2025/email/pl/2025/08/**/NEWSLETTER_v1.0.0.md
/campaigns/launch2025/outreach/en/2025/08/**/CREATORS_SEQ_A_step1_v1.0.0.md
dam://campaigns/launch2025/email/_receipts/NEWSLETTER_2025-08-__.json

---

Chcesz, żebym kontynuował KROK 4/7 — KV/Design system i miniatury kanałowe w tym samym formacie?

---

📌 Source & Verification of Response

[Unverified] — Treść operacyjna wynika z ustaleń w tym wątku; brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, stopka weryfikacyjna w plikach MD, minimalizacja PII, brak słów ryzykownych, 1 CTA/1 link.

[Inference] — Godziny slotów i progi KPI to wartości startowe do kalibracji po pierwszych wysyłkach.