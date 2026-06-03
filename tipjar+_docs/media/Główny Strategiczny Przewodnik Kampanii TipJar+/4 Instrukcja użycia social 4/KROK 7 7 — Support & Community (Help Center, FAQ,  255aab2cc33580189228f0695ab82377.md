# KROK 7/7 — Support & Community (Help Center, FAQ, moderacja, kryzys) — zarys operacyjny gotowy do uruchomienia

Cel: uruchomić i utrzymać kompletny „front wsparcia” (Help Center + FAQ + moderacja kanałów + komunikacja kryzysowa) spójny z ADAM-MODE i cyklem ROUTE→EXEC→REVIEW→FREEZE.

---

1. Wejścia (niezbędne)

Szablony treści (Krok 8): [template.faq.md](http://template.faq.md/), [template.yt.community.md](http://template.yt.community.md/), template.social.*.md.

Glosariusz i makra ADAM (/prompts/glossary.tipjar.md, /prompts/macros.adam.yaml).

KV/miniatury (Krok 4/7) — do kart pomocy i wpisów społeczności.

Playbook incydentów (Krok 10.4) i reguły Evaluatora (Krok 9).

---

1. Wyjścia (artefakty)

Struktura Help Center (IA): kategorie + podstrony.

Pakiet FAQ: min. 25 artykułów (PL/EN), zgodnych z ADAM-MODE.

Makra odpowiedzi (community): bank szybkich odpowiedzi dla X/IG/YT/LI.

Runbook moderacji: triage + SLA + wzorce eskalacji.

Zestaw kryzysowy: oświadczenia, Q&A, checklista komunikatów (PR/social).

Manifest DAM + aliasy latest.

---

1. Proces (ROUTE → EXEC → REVIEW → FREEZE)

ETAP S1 — ROUTE (Kurator Supportu)

1. Utwórz taskspec.support.json (outputs: IA, FAQ pack, macros pack, runbook, crisis pack).
2. Zbuduj plan.support.json: S1 Curator → S2 Support Writer → S3 Evaluator(decision) → S4 Freeze.

ETAP S2 — EXEC (Support Writer / Community)
3. Zdefiniuj IA Help Center (max. 6 kategorii, 5–8 artykułów/kategorię).
4. Napisz FAQ z użyciem [template.faq.md](http://template.faq.md/) (sekcje: Problem → Rozwiązanie → Kroki → Linki).
5. Przygotuj makra odpowiedzi dla kanałów (X/IG/YT/LI) — krótkie, 1 CTA.
6. Opracuj Runbook Moderacji (triage + SLA + eskalacje).
7. Opracuj Pakiet kryzysowy (oświadczenie bazowe, wariant social, FAQ kryzysowe).

ETAP S3 — REVIEW (Evaluator)
8. Walidacje: BANNED_WORDS, PII=0, FOOTER_GUARD, CTA=1, UTM_GUARD (gdy są linki), CLARITY ≥ 0.8.
9. Decyzja: accept/revise/reject + patch-hinty.

ETAP S4 — FREEZE (Publisher)
10. Publikacja do DAM (v1.0.1), SHA-256 + podpis ed25519, manifest _manifests/PLAN-SUPPORT-*.json, aliasy latest.

---

1. Help Center — IA (proponowany układ)
2. Start z tipjar+ — konto, profil twórcy, pierwsze wsparcie.
3. Napiwki w USDC — podstawy, bezpieczeństwo, limity techniczne (opisowo).
4. Prywatność i bezpieczeństwo — dane, zgody, najlepsze praktyki.
5. Płatności i wypłaty — podstawowe scenariusze, rozwiązywanie problemów (opisowo).
6. Konto i ustawienia — e-mail, powiadomienia, języki.
7. Społeczność i wsparcie — kontakt, zasady, moderacja treści.

> Każdy artykuł: [Unverified] na starcie + stopka weryfikacyjna; 1 CTA (np. „Otwórz zgłoszenie”).
> 

---

1. Szablon artykułu FAQ (MD, skrót)

[Unverified]

# {Pytanie użytkownika w 1 zdaniu}

**Krótkie wyjaśnienie (≤ 50 słów).**

## Kroki

1. …
2. …
3. …

## Linki i materiały

- Strona produktu: {{link_landing_utm}}
- Pomoc: {{link_help_center}}

📌 Source & Verification of Response

- [Unverified] — Treść operacyjna na bazie wytycznych.
- [✓ Verified] — ADAM-MODE: etykietowanie, stopka, brak słów ryzykownych.
- [Inference] — Rekomendowane kroki wynikają z praktyk wsparcia.

---

1. Makra odpowiedzi (community) — bank skrótowy

Prośba o szczegóły (uniwersalne):
„Dzięki za wiadomość. Opisz proszę krok po kroku, co widzisz na ekranie. Tu znajdziesz bazę rozwiązań: {{link_help_center}}.”

Przekierowanie do artykułu:
„To wyjaśnia ten artykuł: {{faq_url}}. Daj znać, czy pomogło.”

Eskalacja prywatna:
„Aby chronić Twoje dane, poprosimy o kontakt w wiadomości prywatnej. Instrukcja: {{secure_contact_url}}.”

Aktualizacja statusu incydentu:
„Pracujemy nad korektą. Ostatni status znajdziesz tutaj: {{status_url}}.”

(Każde makro: 1 CTA, brak PII, brak słów ryzykownych.)

---

1. Runbook moderacji — triage i SLA

Triage

T1 (wysokie): zgłoszenia bezpieczeństwa, podejrzenia naruszeń — response ≤ 15 min, eskalacja do IC.

T2 (średnie): problemy funkcjonalne — response ≤ 60 min.

T3 (niskie): pytania ogólne, UX — response ≤ 24 h.

SLA community

Sloty dyżurowe pokrywają godz. 08:00–22:00 CEST.

Odpowiedź na komentarze wideo/social ≤ 60 min w godzinach dyżuru.

Eskalacja

Community → Support Writer → Evaluator/Legal → Incident Commander (wg Krok 10.4).

Dowody i logi

Zrzuty ekranu (bez PII), link do wątku, identyfikator zgłoszenia w DAM.

---

1. Pakiet kryzysowy — oświadczenia i checklista

Triggery: błąd w materiale publicznym, mylna interpretacja, zgłoszenia bezpieczeństwa.

Oświadczenie bazowe (PR/Newsroom): krótko „co się stało” → „co zrobiliśmy” → „gdzie śledzić status”.

Wariant social (post + pinned comment): 1–2 zdania + link do statusu.

FAQ kryzysowe: 5–7 pytań/odpowiedzi, aktualizowane.

Checklista przed publikacją:

- [ ]  Brak PII;
- [ ]  Spójność z faktami wewnętrznymi;
- [ ]  Jeden link do status_url;
- [ ]  Zgodność z ADAM-MODE;
- [ ]  FREEZE + podpis w DAM.

---

1. Checklista wdrożeniowa (PASS/FAIL)
- [ ]  taskspec.support.json + plan.support.json utworzone.
- [ ]  IA Help Center opublikowana (6 kategorii max).
- [ ]  ≥ 25 artykułów FAQ (PL/EN), każdy z [Unverified] + stopką.
- [ ]  Bank makr community gotowy (X/IG/YT/LI), 1 CTA, bez PII.
- [ ]  Runbook moderacji: triage + SLA + eskalacje (zgodne z Krok 10.4).
- [ ]  Pakiet kryzysowy: oświadczenie, social, FAQ kryzysowe, checklista.
- [ ]  Evaluator: accept (BANNED_WORDS=0, FOOTER_GUARD=PASS, PII=0).
- [ ]  FREEZE do DAM: v1.0.1, hash + podpis, manifest _manifests/PLAN-SUPPORT-*.json, aliasy latest.

---

1. KPI (start, do kalibracji)

FRT (First Response Time): T średnie do pierwszej odpowiedzi w social/Help Center.

Deflection Rate: odsetek wizyt w Help Center zakończonych bez kontaktu.

CSAT (ankieta 3-punktowa): udział ocen pozytywnych.

Makra Coverage: % wątków obsłużonych makrami (spójność).

FAQ Coverage: % unikalnych pytań pokrytych artykułem.

SEV Compliance: spełnienie SLA dla T1/T2/T3.

---

1. Telemetria (zdarzenia — tipjar.telemetry.v1)

HELP_VIEW {article_id, locale}

HELP_CTA_CLICK {article_id, target}

TICKET_CREATED {channel:"social|email|form", triage:"T1|T2|T3"}

TICKET_RESOLVED {resolution_time_s, macro_used:true/false}

CRISIS_POST_PUBLISH {status_url, channel}

CSAT_SUBMIT {score}

---

1. DAM — nazewnictwo (przykład)

dam://campaigns/support/2025/08/18/IA_help_center_v1.0.1.json
dam://campaigns/support/2025/08/18/faq/{slug}_pl_v1.0.1.md
dam://campaigns/support/2025/08/18/faq/{slug}_en_v1.0.1.md
dam://campaigns/support/2025/08/18/community_macros_v1.0.1.md
dam://campaigns/support/2025/08/18/moderation_runbook_v1.0.1.md
dam://campaigns/support/2025/08/18/crisis_pack_v1.0.1.md
dam://campaigns/_manifests/PLAN-SUPPORT-20250818.json

---

1. Zasady prywatności i bezpieczeństwa (skrót)

PII=0 w materiałach publicznych; kontakt „secure” tylko przez dedykowany formularz ({{secure_contact_url}}).

Zgłoszenia przechowuj z pseudonimizacją (hash).

Dostęp do statusów incydentów — listy kontrolowane (role on-call).

---

Ten krok zamyka pakiet 7/7. Jeśli chcesz, przygotuję jednolite „README_support.md” do wklejenia w repo /deployment/ (jednostronicowy start).

---

📌 Source & Verification of Response

[Unverified] — Dokument operacyjny zbudowany na bazie dotychczasowych wytycznych; bez źródeł zewnętrznych.

[✓ Verified] — Zachowano ADAM-MODE: etykietowanie, stopka weryfikacyjna, brak słów ryzykownych, minimalizacja PII.

[Inference] — KPI/SLA są wartościami startowymi i będą wymagały kalibracji po pierwszych cyklach.