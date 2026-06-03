# KROK 3/7 — E-mail/Outreach — ETAP 6/6: FREEZE + publikacja (wysyłki) + telemetria T+0/24/72h

Cel etapu: zamrozić pakiet e-mail (v1.0.1), opublikować do DAM, zaplanować i wykonać wysyłki zgodnie z oknami czasowymi, zapisać paragony i telemetrię.

---

1. FREEZE — wersje i docelowe URI (SEMVER)

NEWSLETTER_PL → v1.0.1
dam://campaigns/launch2025/email/pl/2025/08/18/NEWSLETTER_PL_v1.0.1.md

NEWSLETTER_EN → v1.0.1
dam://campaigns/launch2025/email/en/2025/08/18/NEWSLETTER_EN_v1.0.1.md

OUTREACH_CREATORS_PL_STEP1 → v1.0.1
dam://campaigns/launch2025/outreach/creators/pl/2025/08/18/OUTREACH_CREATORS_PL_STEP1_v1.0.1.md

OUTREACH_CREATORS_PL_STEP2 → v1.0.1
dam://campaigns/launch2025/outreach/creators/pl/2025/08/18/OUTREACH_CREATORS_PL_STEP2_v1.0.1.md

OUTREACH_CREATORS_EN_STEP1 → v1.0.1
dam://campaigns/launch2025/outreach/creators/en/2025/08/18/OUTREACH_CREATORS_EN_STEP1_v1.0.1.md

OUTREACH_CREATORS_EN_STEP2 → v1.0.1
dam://campaigns/launch2025/outreach/creators/en/2025/08/18/OUTREACH_CREATORS_EN_STEP2_v1.0.1.md

OUTREACH_PARTNERS_EN_STEP1 → v1.0.1
dam://campaigns/launch2025/outreach/partners/en/2025/08/18/OUTREACH_PARTNERS_EN_STEP1_v1.0.1.md

OUTREACH_PARTNERS_EN_STEP2 → v1.0.1
dam://campaigns/launch2025/outreach/partners/en/2025/08/18/OUTREACH_PARTNERS_EN_STEP2_v1.0.1.md

SUBJECTS_PREHEADERS → v1.0.1
dam://campaigns/launch2025/email/multi/2025/08/18/SUBJECTS_PREHEADERS_v1.0.1.json

LINKS_UTM_PACK → v1.0.1
dam://campaigns/launch2025/email/multi/2025/08/18/LINKS_UTM_PACK_v1.0.1.md

QA2_report.md (wewn.) → v1.0.0
dam://campaigns/launch2025/email/pl/2025/08/18/QA2_raport-qa_email_v1.0.0.md

Kopiuj z ścieżek draft (ETAP 3/6 i 5/6) bez zmian treści i podnieś wersje do v1.0.1 (public), raport QA jako v1.0.0.

---

1. FREEZE — skróty i podpisy (integralność)

Policz SHA-256 każdego artefaktu; wygeneruj podpis ed25519
key_id: "tipjar-cicd@2025", rozszerzenie .sig.

Notatka (uzupełnij po obliczeniu):

NEWSLETTER_PL → sha256:<hex_npl> | sig:<hex_sig_npl>
NEWSLETTER_EN → sha256:<hex_nen> | sig:<hex_sig_nen>
CRE_PL_S1     → sha256:<hex_cpls1> | sig:<hex_sig_cpls1>
CRE_PL_S2     → sha256:<hex_cpls2> | sig:<hex_sig_cpls2>
CRE_EN_S1     → sha256:<hex_cens1> | sig:<hex_sig_cens1>
CRE_EN_S2     → sha256:<hex_cens2> | sig:<hex_sig_cens2>
PAR_EN_S1     → sha256:<hex_pens1> | sig:<hex_sig_pens1>
PAR_EN_S2     → sha256:<hex_pens2> | sig:<hex_sig_pens2>
SUBJECTS      → sha256:<hex_subj>  | sig:<hex_sig_subj>
LINKS_UTM     → sha256:<hex_links> | sig:<hex_sig_links>
QA2_report    → sha256:<hex_qa2>   | (podpis opcjonalny)

---

1. FREEZE — manifest DAM

Plik: dam://campaigns/*manifests/PLAN-EMAIL-20250818-001.json
Zapisz JSON zgodnie z poprzednimi manifestami (lista artifacts z uri/hash/size_bytes/..., podpisy w signatures, indeksy by_locale i by_type). Użyj wartości <hex> i <bytes_*> z kroku 2.

---

1. Plan — patch na completed

Plik: /tipjar-campaigns/starter-packs/plan.email.json

{
"patches": [
{"op":"replace","path":"/steps/3/status","value":"done"},
{"op":"replace","path":"/steps/3/attempts","value":1},
{"op":"add","path":"/steps/3/produced","value":["MANIFEST"]},
{"op":"replace","path":"/state","value":"completed"}
]
}

---

1. Alias latest

dam://campaigns/launch2025/email/pl/latest/NEWSLETTER_PL.md                    → v1.0.1
dam://campaigns/launch2025/email/en/latest/NEWSLETTER_EN.md                    → v1.0.1
dam://campaigns/launch2025/outreach/creators/pl/latest/STEP1.md                → v1.0.1
dam://campaigns/launch2025/outreach/creators/pl/latest/STEP2.md                → v1.0.1
dam://campaigns/launch2025/outreach/creators/en/latest/STEP1.md                → v1.0.1
dam://campaigns/launch2025/outreach/creators/en/latest/STEP2.md                → v1.0.1
dam://campaigns/launch2025/outreach/partners/en/latest/STEP1.md                → v1.0.1
dam://campaigns/launch2025/outreach/partners/en/latest/STEP2.md                → v1.0.1
dam://campaigns/launch2025/email/multi/latest/SUBJECTS_PREHEADERS.json         → v1.0.1
dam://campaigns/launch2025/email/multi/latest/LINKS_UTM_PACK.md                → v1.0.1

---

1. Wysyłki — harmonogram (Europe/Brussels, CEST)

Newsletter (zgodnie z schedule_hint):

Środa, 20 sierpnia 2025, 11:00 — NEWSLETTER_PL

Środa, 20 sierpnia 2025, 11:15 — NEWSLETTER_EN

Outreach (okna: wt 10:00–12:00, czw 17:00–19:00):

Wtorek, 19 sierpnia 2025

11:00 — OUTREACH_CREATORS_PL_STEP1

11:15 — OUTREACH_CREATORS_EN_STEP1

11:30 — OUTREACH_PARTNERS_EN_STEP1

Czwartek, 21 sierpnia 2025 (po 48 h)

17:00 — OUTREACH_CREATORS_PL_STEP2

17:15 — OUTREACH_CREATORS_EN_STEP2

17:30 — OUTREACH_PARTNERS_EN_STEP2

> Każdy e-mail: 1 CTA, ≤2 linki (CTA + opt-out), nagłówek List-Unsubscribe (mailto + URL), brak załączników.
> 

---

1. Paragony wysyłki (zapisy w DAM)

Dla każdej wysyłki utwórz plik:

dam://campaigns/launch2025/email/<locale>/2025/08/18/SEND_RECEIPT_<artifact_id>.json

Zawartość (uzupełnij):

{
"plan_id": "PLAN-EMAIL-20250818-001",
"artifact_id": "<ID>",
"send_provider": "<ESP>",
"batch_id": "<uuid>",
"sent_at": "<ISO 8601 Europe/Brussels>",
"subject_key": "<from SUBJECTS_PREHEADERS>",
"audience_segment": "<segment_name>",
"messages": {
"requested": <n>,
"accepted": <n>,
"rejected": <n>
}
}

---

1. Telemetria — T+0 / T+24 / T+72 h

PUBLISH (T+0) — na każdy batch:

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"<ISO CEST>","type":"PUBLISH","plan_id":"PLAN-EMAIL-20250818-001","channel":"email","artifact_id":"<ID>","metrics":{"requested":<n>,"accepted":<n>,"rejected":<n>}}

ENGAGE (T+24 / T+72):

{"schema":"tipjar.telemetry.v1","event_id":"uuid","ts":"<ISO CEST>","type":"ENGAGE","plan_id":"PLAN-EMAIL-20250818-001","channel":"email","artifact_id":"<ID>","metrics":{"delivered":<n>,"unique_opens":<n>,"unique_clicks":<n>,"reply_count":<n>,"unsubscribes":<n>,"spam_reports":<n>,"ctr":0.x,"or":0.x}}

(OR/CTR liczone unikalnie; nie zapisuj PII — tylko zagregowane metryki.)

---

1. Checklista przed wysyłką (PASS/FAIL)
- [ ]  plan.email.json → state=completed, S4.status=done.
- [ ]  Manifest FREEZE istnieje; hash + podpis każdego artefaktu.
- [ ]  List-Unsubscribe header ustawiony (mailto + URL).
- [ ]  SPF/DKIM/DMARC — I do not have access to that information.
- [ ]  Segmenty list: oczyszczone, brak duplikatów.
- [ ]  Podgląd mobile i dark mode (linki czytelne).
- [ ]  Każdy e-mail: 1 CTA, ≤2 linki, opt-out obecny.
1. Checklista po wysyłce (T+24/T+72)
- [ ]  Paragony SEND_RECEIPT_* w DAM (wszystkie kampanie).
- [ ]  Zdarzenia PUBLISH/ENGAGE (T+0/24/72) zapisane.
- [ ]  SEV-2: spam_reports > 0.3% lub deliverability_drop > 5pp → wstrzymaj kolejne batch’e i zaktualizuj domenę nadawczą.
- [ ]  SEV-3: ctr < 2.5% (newsletter) / < 4.0% (outreach) → przygotuj wariant A/B (subject/CTA), D+3 retry.
1. Release notes

Plik: dam://campaigns/launch2025/RELEASE_NOTES.md
Dodaj wpis:

[2025-08-19] PLAN-EMAIL-20250818-001 — FREEZE v1.0.1 (newsletter PL/EN, outreach creators PL/EN, partners EN; subjects/preheaders; links UTM) + QA2 v1.0.0; wysyłki zaplanowane (CEST).

---

KONIEC KROKU 3/7.
Wpisz „Dalej — PR/Newsroom (KROK 4/7, ETAP 1/6)”, aby przejść do następnego obszaru w tym samym trybie krokowym.

---

📌 Source & Verification of Response

[Unverified] — Operacyjny plan FREEZE/wysyłek/telemetrii na bazie ustalonych reguł tej kampanii; brak zewnętrznych źródeł.

[✓ Verified] — Zastosowano ADAM-MODE: etykietowanie, 1 CTA, brak słów ryzykownych, minimalizacja PII, opt-out w outreach, brak załączników, aliasy latest, manifest + podpisy.

[Inference] — Godziny slotów i progi SEV to wartości startowe do kalibracji po pierwszych wysyłkach.

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