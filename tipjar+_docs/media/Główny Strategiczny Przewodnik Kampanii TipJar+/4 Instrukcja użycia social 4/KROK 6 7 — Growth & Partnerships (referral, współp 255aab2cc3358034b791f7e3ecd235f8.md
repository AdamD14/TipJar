# KROK 6/7 — Growth & Partnerships (referral, współprace, ambasadorzy, UGC) — zarys operacyjny gotowy do uruchomienia

Cel: uruchomić i utrzymać mechanizmy wzrostu poza płatnymi mediami: program poleceń, współprace partnerskie (co-marketing), program ambasadorski twórców oraz bezpieczny pipeline UGC — wszystko zgodnie z ADAM-MODE (etykietowanie, brak PII, brak sformułowań ryzykownych, 1 CTA).

---

1. Wejścia (niezbędne)

Szablony Growth/Outreach (z pakietu /templates).

Glosariusz i makra ADAM (/prompts/glossary.tipjar.md, /prompts/macros.adam.yaml).

KV/miniatury (KROK 4/7) z ALT.

Polityki prawne i disclosure (np. oznaczenia #ad / „materiał sponsorowany” tam, gdzie wymagane).

DAM + manifesty (KROK 4): miejsce publikacji pakietów partnera/ambasadora.

---

1. Wyjścia (artefakty)

Spec programu poleceń (1-pager MD + JSON z parametrami, bez wartości pieniężnych).

Zestaw partnera (co-marketing kit): one-pager, FAQ, KV, copy postów, UTM.

Program ambasadorski: przewodnik (MD), kontraktowy zakres działań (MD), paczka assetów.

UGC pipeline: playbook praw (MD), checklist clearance, formularze zgody.

Raporty tygodniowe: [growth.weekly.md](http://growth.weekly.md/) (KPI + rekomendacje zmian).

---

1. Proces (ROUTE → EXEC → REVIEW → FREEZE)

L1 — ROUTE

taskspec.growth.json (zestaw: referral + partner + ambassador + UGC).

plan.growth.json: S1 Curator → S2 Growth Writer → S3 Legal/Evaluator(decision gate) → S4 Freeze.

L2 — EXEC

S2 przygotowuje: spec referral (MD+JSON), partner kit (MD + kreacje z DAM), ambasador pack (MD), UGC playbook (MD + formularze).

L3 — REVIEW (Evaluator + Legal)

Walidacje: BANNED_WORDS, PII=0, FOOTER_GUARD, CTA=1, DISCLOSURE_GUARD (oznaczenia #ad/#współpraca tam, gdzie dotyczy), UTM_GUARD (obowiązkowe parametry).

L4 — FREEZE (Publisher)

Wydanie do DAM (v1.0.1), manifest _manifests/PLAN-GROWTH-*.json, aliasy latest, hash + podpis.

---

1. Pod-procesy (specy minimalne)

A) Referral (Program poleceń)

Spec (MD): zasada „kto poleca → kto dołącza”, kanały (in-app, e-mail, social), 1 CTA, brak wartości świadczeń w publicznych materiałach.

Parametry (JSON): identyfikatory kampanii, długość okna atrybucji, format linków (/r/<code>?utm_source=referral&utm_medium=share&utm_campaign=launch2025).

Teksty gotowe: 3 wersje krótkich opisów (X/IG/LI) + ALT do grafik.

Guardy: brak obietnic finansowych; disclosure „to zaproszenie od znajomego”.

B) Partnerships (co-marketing)

One-pager partnera (MD): cel, wspólne aktywa, kanały, sloty, 1 CTA, UTM.

Asset pack: KV w formatach kanałowych, copy, ALT, guidelines publikacji, przykłady postów.

Proces publikacji: projekt treści → akcept partnera → Evaluator/Legal → FREEZE → publikacja dwustronna (z osobnymi UTM).

C) Ambasadorzy (creator program)

Przewodnik (MD): zakres aktywności (np. 2 posty/mies. + 1 wideo/kw.), zasady disclosure, osadzanie CTA/UTM, format raportowania.

Paczka startowa: KV, przykłady captionów, lista tematów „evergreen”, checklista publikacji.

Monitorowanie: T+0/30/120 min + raport tygodniowy; iteracje A/B miniatur/caption.

D) UGC (treści społeczności)

Playbook prawny (MD): wzory zgód (formularze), zakres licencji, okres użycia.

Checklist clearance: źródło, zgoda, brak PII, brak soundtracków obcych praw.

Publikacja: FREEZE do DAM (źródło + final), manifest; oznaczenia autorstwa (jeśli uzgodnione).

---

1. Evaluator — reguły dodatkowe (Growth)

DISCLOSURE_GUARD: wykrywa/egzekwuje oznaczenia współpracy (np. #ad, „Współpraca z …”) w materiałach partner/ambasador.

UTM_GUARD: wymaga utm_source, utm_medium, utm_campaign w linkach zewnętrznych.

SHARETEXT_LENGTH: limity długości postów (X ≤ 160, LI ≤ 220, IG ≤ 300 znaków).

CLEARANCE_PROOF: wymaga dołączenia identyfikatora zgody dla UGC (ugc_consent_id).

---

1. Checklist (PASS/FAIL)

Referral

- [ ]  spec_referral.md + referral.params.json gotowe; 1 CTA; brak wartości świadczeń w publicznych tekstach.
- [ ]  Linki referral z UTM działają; alias latest w DAM na kreacje.
- [ ]  Evaluator: BANNED_WORDS=0, DISCLOSURE_GUARD PASS (gdzie dotyczy).

Partnerships

- [ ]  partner_onepager.md + partner_kit/ (KV, copy, ALT, UTM).
- [ ]  Harmonogram slotów uzgodniony; FREEZE przed publikacją; paragony publikacji w DAM.
- [ ]  Evaluator/Legal: accept.

Ambasadorzy

- [ ]  ambassador_guide.md + ambassador_assets/ (miniatury, copy, ALT).
- [ ]  Disclosure poprawne; 1 CTA; UTM w opisach.
- [ ]  Raport Tygodniowy [growth.weekly.md](http://growth.weekly.md/) uzupełniany.

UGC

- [ ]  Zgoda pozyskana i zarchiwizowana (ugc_consent_id).
- [ ]  Brak PII; brak materiałów objętych cudzymi prawami bez licencji.
- [ ]  FREEZE (źródło + final) z hash i podpisem; manifest zaktualizowany.

---

1. KPI (startowe, do kalibracji)

Referral Participation Rate: odsetek aktywnych użytkowników, którzy wygenerowali link.

Referral→Signup Conv: udział zaproszonych, którzy się rejestrują.

Activation Conv (z referral): udział zarejestrowanych, którzy wykonują pierwszy kluczowy krok.

K-factor (kampanijny): średnia liczba nowych użytkowników przypisanych do jednego aktywnego użytkownika.

Partner Co-marketing CTR: CTR postów partnera vs. własne baseline.

Ambassador Output Adherence: udział ambasadorów realizujących minimalny zakres działań w miesiącu.

UGC Clearance SLA: p95 czasu od zgłoszenia do publikacji (cel: ≤ 48 h).

---

1. Telemetria (zdarzenia) — tipjar.telemetry.v1

REFERRAL_CREATED {user_id_hash, code, utm}

REFERRAL_REDEEMED {code, signup:true/false, activation:true/false}

CO_MARKETING_PUBLISH {partner_id_hash, post_url, utm}

AMBASSADOR_POST {ambassador_id_hash, platform, url, ctr, er}

UGC_SUBMITTED {ugc_id, consent_id, source_url} → UGC_PUBLISHED {ugc_id, url}

COST {tokens, time_s} (dla generowanych materiałów)
(Zachowuj wyłącznie identyfikatory zhashowane; PII = 0.)

---

1. DAM — nazewnictwo (przykład)

dam://campaigns/launch2025/growth/2025/08/18/spec_referral_v1.0.1.md
dam://campaigns/launch2025/growth/2025/08/18/referral.params_v1.0.1.json
dam://campaigns/launch2025/partner_kits/partner-<alias>/2025/08/18/kit_v1.0.1/
dam://campaigns/launch2025/ambassadors/guide_v1.0.1.md
dam://campaigns/launch2025/ugc/2025/08/18/{UGC_ID}/source_v1.0.0.(mp4|png) + final_v1.0.1.*
dam://campaigns/_manifests/PLAN-GROWTH-20250818.json

---

1. Incydenty (Growth) — progi i reakcje

SEV-1: brak disclosure w publikacji płatnej/współpracowej → natychmiastowe ukrycie/wydanie korekty, post-mortem ≤ 72 h.

SEV-2: linki bez UTM/łamanie zasad CTA → poprawa ≤ 6 h.

SEV-3: opóźnienia publikacyjne / niespójne ALT → poprawa ≤ 24 h.

---

Instrukcja: Kiedy chcesz przejść do KROKU 7/7 — Support & Community (Help Center, FAQ, moderacja, kryzys), odpowiedz „Dalej”.

---

📌 Source & Verification of Response

[✓ Verified] — Nie dotyczy (brak zewnętrznych źródeł do potwierdzania; dokument procesowy oparty na przyjętych regułach ADAM-MODE i wcześniejszych krokach).

[Unverified] — Materiał ma charakter roboczego przewodnika operacyjnego i nie odwołuje się do oficjalnych stron zewnętrznych.

[Inference] — Zestaw KPI, progi i SLA mają charakter punktu startowego i wymagają kalibracji po pierwszych iteracjach.

[Speculation] — Brak.