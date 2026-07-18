
Karta 1: Karta Tożsamości Wizualnej (Creator Identity Card)
Zastosowanie: Reprezentacja publicznego profilu twórcy, awatara oraz kluczowych atrybutów
marki w modelu podglądu właścicielskiego (Owner Preview Mode). Zastosowane Techniki
(>160 IQ): Zastosowanie minimalistycznego, proceduralnego wzoru wektorowego (1px SVG
Micro-Grid) osadzonego jako tło Data-URI, co eliminuje zewnętrzne żądania sieciowe.
Implementacja optycznej wypukłości (1px Bevel) przy użyciu zagnieżdżonego cienia
wewnętrznego, bez korzystania z destrukcyjnej dla układu właściwości border.
import React from 'react';
export default function CreatorIdentityCard({ name, role }) {
return (
<div className="relative w-full max-w-md overflow-hidden
rounded-[24px] bg-[#001717] shadow-[0_15px_35px_rgba(0,17,17,0.9)]
group">
{/* 1px SVG Micro-Grid wstrzyknięty jako tło, nadający
techniczny sznyk */} <div
className="absolute inset-0 z-0 opacity-[0.07]
pointer-events-none"
style={{
backgroundImage: `url("data:image/svg+xml,%3Csvg width='40'
height='40' viewBox='0 0 40 40'
xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1
1h38v38H1V1z' fill='%23CCF7F4' fill-opacity='1'
fill-rule='evenodd'/%3E%3C/svg%3E")`,
backgroundSize: '20px 20px'
}}
/>
{/* Optyczna Wypukłość (Bevel) za pomocą podwójnego cienia
wewnętrznego */}
<div className="absolute inset-0 z-10 pointer-events-none
rounded-[24px]
shadow-[inset_1px_1px_0_rgba(204,247,244,0.1),inset_-1px_-1px_0_rgba(0
,17,17,0.8)]" />
<div className="relative z-20 p-8 flex flex-col items-center">
{/* Kontener Awatara: Architektura Liquid Glass z kompensacją
nasycenia */}
<div className="relative w-28 h-28 mb-6 rounded-full
bg-[#003737]/40 backdrop-blur-2xl backdrop-saturate-200
shadow-[0_10px_25px_rgba(0,17,17,0.8)] border border-[#CCF7F4]/15
p-1">
<img src="/avatar-creator.webp" alt={name} className="w-full
h-full object-cover rounded-full" />
{/* Emissive Neon Glow Indicator - samoświecący obiekt
sygnalizujący status "Live" */}
<div className="absolute bottom-1 right-1 w-5 h-5
rounded-full bg- shadow-[0_0_15px_rgba(255,215,0,0.8)] border-2
border-[#001717]" />
</div>
<h2 className="text-2xl font-bold tracking-tight text-white
mb-1 drop-shadow-[0_2px_4px_rgba(0,17,17,0.9)]">
{name}
</h2>
<p className="text-sm font-semibold text- uppercase
tracking-[0.2em]">
{role}
</p>
</div>
</div>
); }

Karta 2: Karta Podsumowania Statystyk (Financial Stat Summary
Card)
Zastosowanie: Ekspozycja kluczowych wskaźników analitycznych (KPI), metryk wzrostu i salda
w stablecoinach (USDC) w interfejsie portfela (Wallet). Zastosowane Techniki (>160 IQ):
Fizyczna ochrona przed zjawiskiem „Financial Jitter” za pomocą dyrektywy typograficznej z
użyciem cyfr tabelarycznych. Implementacja rzeźbiarskiego efektu wklęśnięcia „Pillow Cushion”
(Tłoczenie Poduszkowe) dla wewnętrznego kontenera wykresu.
import React from 'react';
export default function FinancialStatCard({ value, label, trend }) {
return (
<div className="relative p-6 rounded-[20px] bg-gradient-to-br
from-[#002828] to-[#001111] shadow-[0_12px_25px_rgba(0,17,17,0.7)]
group">
{/* Subtelny Border Box-Shadow chroniący promień maskowania */}
<div className="absolute inset-0 rounded-[20px]
pointer-events-none shadow-[inset_0_0_0_1px_rgba(204,247,244,0.08)]"
/>
<p className="text-[#CCF7F4]/60 text-xs font-semibold uppercase
tracking-[0.15em] mb-3">
{label}
</p>
<div className="flex items-baseline gap-4 mb-6">
{/* Typografia Tabelaryczna (tnum) zapobiegająca drżeniu
znaków numerycznych */}
<h3 className="text-4xl font-black text-
font-feature-settings-tnum
drop-shadow-[0_0_12px_rgba(255,215,0,0.3)]">
{value}
</h3>
<span className="text-sm font-bold text-">{trend}</span>
</div>
{/* Wklęśnięcie (Pillow Cushion Deboss) dla koryta postępu */} <div className="w-full h-[14px] rounded-full bg-[#001111]
shadow-[inset_1px_2px_4px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(204
,247,244,0.05)] relative overflow-hidden">
{/* Płynąca energia: Emisyjny Glow we wnętrzu koryta */}
<div className="absolute top-0 left-0 h-full w-[72%]
bg-gradient-to-r from-[#003737] to-
shadow-[0_0_8px_rgba(255,215,0,0.8)] rounded-full transition-all
duration-1000 ease-in-out" />
</div>
</div>
);
}
Karta 3: Karta Powiadomień na Żywo (Live Notification Card)
Zastosowanie: Obsługa modułu strumieniowego (Live Fanwall), renderująca asynchronicznie
przesyłane komunikaty (Server-Sent Events) dla streamerów na warstwach OBS. Zastosowane
Techniki (>160 IQ): Zastąpienie obciążających CPU, zewnętrznych bibliotek animacyjnych (np.
Framer Motion) potężnym, natywnym API przeglądarki wywoływanym z pomocą prefiksu
Tailwind v4 @starting-style.
import React from 'react';
export default function LiveNotificationCard({ username, amount,
message }) {
return (
<div className="relative flex items-center justify-between p-5
mb-3 rounded-[16px] bg-[#002121]/80 backdrop-blur-xl border
border-[#CCF7F4]/10 shadow-[0_10px_30px_rgba(0,17,17,0.85)]
opacity-100 scale-100 rotate-0 blur-0
transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
starting:opacity-0 starting:scale-75 starting:-rotate-6
starting:blur-2xl"
>
<div className="flex items-center gap-4">
{/* Holograficzny Avatar Placeholder z minimalistycznym
cieniem emisyjnym */}
<div className="w-12 h-12 rounded-full bg-gradient-to-tr
from-[#003737] to- p-[2px] shadow-[0_0_20px_rgba(255,215,0,0.4)]">
<div className="w-full h-full rounded-full bg-[#001717] flex items-center justify-center">
<svg width="20" height="20" viewBox="0 0 24 24"
fill="none" stroke="#FFD700" strokeWidth="2">
<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
<circle cx="12" cy="7" r="4" />
</svg>
</div>
</div>
<div className="flex flex-col">
<p className="text-sm font-bold text-white
tracking-wide">{username}</p>
<p className="text-xs text-[#CCF7F4]/50">{message}</p>
</div>
</div>
<div className="text-xl font-black text-
drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">
+{amount} USDC
</div>
</div>
);
}
Karta 4: Karta Akcji Interaktywnej (Interactive Action Card)
Zastosowanie: Główne bramki transakcyjne (np. „Wyślij Napiwek”, „Aktywuj Smart Contract”),
podlegające wysokiej presji interakcyjnej użytkowników mobilnych. Zastosowane Techniki
(>160 IQ): Zabezpieczenie przed paradoksem „Lepkiego Palca” (Sticky Hover), wdrożenie
mechaniki Wciśnięcia (Depress State) oraz Emisyjnej Fali Szoku Kinetycznego przy aktywacji
dotykowej.
import React from 'react';
export default function ActionCard({ label, subtitle }) {
return (
<button className="relative w-full p-6 rounded-[16px] bg-[#001717]
outline-none group cursor-pointer text-left
transition-all duration-300 ease-out
@media(hover:hover):hover:-translate-y-1
active:scale-[0.98] active:translate-y-0" >
{/* 1. Cień Bazowy - Spoczynek (Z-1) */}
<div className="absolute inset-0 rounded-[16px]
shadow-[0_6px_15px_rgba(0,17,17,0.7)] transition-opacity duration-300
group-hover:opacity-0" />
{/* 2. Cień Uniesienia - Anticipation (Z-3), optymalizowany
przez Hardware Compositing */}
<div className="absolute inset-0 rounded-[16px]
shadow-[0_25px_35px_-5px_rgba(0,17,17,0.9)] opacity-0
transition-opacity duration-300 will-change-opacity
@media(hover:hover):group-hover:opacity-100" />
{/* 3. Wklęśnięcie Reakcyjne (Depress) + Emisyjny Błysk na dotyk
(Kinetic Shock) */}
<div className="absolute inset-0 rounded-[16px] bg-[#002828]
shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(0,17,17,
1)] opacity-0 transition-opacity duration-100
group-active:opacity-100" />
<div className="relative z-10 flex items-center
justify-between">
<div>
<span className="block text-lg font-bold text-[#CCF7F4]
group-hover:text- transition-colors duration-200">
{label}
</span>
<span className="block text-xs font-medium text- mt-1">
{subtitle}
</span>
</div>
<div className="w-10 h-10 rounded-full bg-[#003737] flex
items-center justify-center border border-[#CCF7F4]/10
shadow-[0_0_10px_rgba(0,17,17,0.5)] group-active:scale-90
transition-transform">
<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
stroke="#FFD700" strokeWidth="2" strokeLinecap="round"
strokeLinejoin="round">
<path d="M5 12h14M12 5l7 7-7 7"/>
</svg>
</div>
</div>
</button>
);
}
Karta 5: Karta Zaawansowanego Celu (High-Ticket Goal Card)
Zastosowanie: Eksponowanie potężnych zbiórek o dużym wolumenie, wymagających ściętych,
futurystycznych geometrii oraz wizualizacji asymetrycznej tarczy w estetyce Cyberpunk.
Zastosowane Techniki (>160 IQ): Wykorzystanie architektury Podwójnej Kapsuły (Double
Wrapper), która chroni zewnętrzny, przestrzenny filtr dyfuzyjny przed zjawiskiem
bezwzględnego ścinania krawędzi (Radius Bleed) wywołanym użyciem masek wielokątnych
clip-path.
import React from 'react';
export default function AdvancedGoalCard({ title, percentage }) {
return (
/* 1. Kapsuła Zewnętrzna (Double Wrapper): Odpowiada wyłącznie za
dystrybucję cienia za pomocą drop-shadow omijając box-shadow */
<div className="relative w-full p-[1px] filter
drop-shadow-[0_12px_20px_rgba(157,78,221,0.25)]
hover:drop-shadow-[0_15px_30px_rgba(157,78,221,0.4)] transition-all
duration-500">
{/* 2. Kapsuła Wewnętrzna: Wykonuje bezlitosne cięcie wektorowe
(clip-path) bez ryzyka utraty aury */}
<div
className="relative w-full bg-gradient-to-br from-[#001717]
to-[#001111] overflow-hidden"
style={{ clipPath: "polygon(0 20px, 20px 0, 100% 0, 100%
calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}
>
{/* Szklana Krawędź Optyczna (Glassmorphic Rim Light) ukryta
pod wektorem cięcia */}
<div className="absolute inset-0 pointer-events-none
shadow-[inset_1px_1px_0_rgba(204,247,244,0.15),inset_-1px_-1px_0_rgba(
0,0,0,0.8)]" />
<div className="p-8 relative z-10">
<div className="flex justify-between items-end mb-6">
<h4 className="text-[#CCF7F4] text-xl font-display
font-bold uppercase tracking-widest
drop-shadow-[0_2px_4px_rgba(0,17,17,0.9)]">
{title}
</h4>
<span className="text- text-2xl font-black font-feature-settings-tnum">
{percentage}%
</span>
</div>
<div className="relative w-full h-[6px] bg-[#002121]
shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
<div
className="absolute top-0 left-0 h-full bg-
shadow-[0_0_12px_rgba(157,78,221,0.8)]"
style={{ width: `${percentage}%` }}
/>
{/* Wektor Akcentujący Postęp */}
<div
className="absolute top-1/2 -translate-y-1/2 w-3 h-6 bg-
shadow-[0_0_15px_rgba(255,215,0,0.9)]"
style={{ left: `calc(${percentage}% - 6px)` }}
/>
</div>
</div>
</div>
</div>
);
}
Karta 6: Karta Zamkniętej Relacji Społecznościowej (Community
Gated Card)
Zastosowanie: Interfejs dla stref zablokowanych zawartości (gated content) dla subskrybentów
o określonym progu wpłaty. Obejmuje warianty pustych stanów. Zastosowane Techniki (>160
IQ): Zjawisko Iluzji Typograficznej. Optyka Wytłoczenia rzeźbiarskiego (Letterpress)
przeciwstawiona wysokiemu odcięciu kontrastu ochronnego przed halacją (High Contrast
Decoupling) dla tekstów na mrocznych tłach.
import React from 'react';
export default function GatedContentCard({ isLocked, content }) {
return (
<div className="relative w-full p-8 rounded-[16px] bg-[#001A1A]
border border-[#003737] shadow-[0_8px_20px_rgba(0,17,17,0.8)]"> {/* Abstrakcyjny mikro-wzór zagnieżdżony jako tło */}
<div
className="absolute inset-0 z-0 opacity-[0.03]
pointer-events-none rounded-[16px]"
style={{
backgroundImage: `url("data:image/svg+xml,%3Csvg width='60'
height='60' viewBox='0 0 60 60'
xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0
30z' fill='none' stroke='%239D4EDD' stroke-width='1'/%3E%3C/svg%3E")`,
backgroundPosition: 'center'
}}
/>
{isLocked? (
<div className="relative z-10 flex flex-col items-center
justify-center py-10">
<svg className="w-12 h-12 mb-4 text-[#001111]
drop-shadow-[0_1px_1px_rgba(204,247,244,0.15)]" viewBox="0 0 24 24"
fill="currentColor">
<path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2.897-2
2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897
2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm-3 5c0-1.654
1.346-3 3-3s3 1.346 3 3v3H9V7z" />
</svg>
{/* Tekst Wytłoczony (Letterpress) - optyczne wklęśnięcie w
materiał */}
<span className="text-xl font-bold tracking-[0.2em]
text-[#001111]
text-shadow-[0px_1px_0px_rgba(204,247,244,0.15),0px_-1px_0px_rgba(0,0,
0,0.8)]">
ZAWARTOŚĆ ZABLOKOWANA
</span>
</div>
) : (
<div className="relative z-10">
<div className="flex items-center gap-3 mb-4 border-b
border-[#003737] pb-3">
<div className="w-3 h-3 rounded-full bg-
shadow-[0_0_12px_rgba(157,78,221,0.8)]" />
<span className="text-sm font-semibold text-
tracking-widest uppercase">Ekskluzywny Wpis</span>
</div>
{/* Tekst Odcięty (Decoupling) chroniący przed halacją na
tłach gradientowych */}
<p className="text-[#CCF7F4] antialiased
text-shadow-[0_0_8px_rgba(0,17,17,0.9)] leading-relaxed font-body">
{content} </p>
</div>
)}
</div>
);
}
Karta 7: Karta Analityki Wektorowej (Analytics Vector Card)
Zastosowanie: Gęsto upakowane widoki pomiaru przepływów (Analytics / Growth Snapshot).
Zastosowane Techniki (>160 IQ): Zrzucenie nadzoru stanu do warstwy CSS. Wykorzystanie
negatywnej dyrektywy Tailwind v4 not-* połączonej z zapytaniem grupy do uzyskania kinowego
efektu zawężenia światła „Focus-Pull”. Zastosowanie logicznych wartości przestrzennych
(Logical Properties).
import React from 'react';
export default function AnalyticsGrid() {
const metrics =;
return (
<div className="group flex flex-wrap gap-5 w-full">
{metrics.map((stat, i) => (
<div
key={i}
className="relative bg-[#001717]/80 backdrop-blur-xl border
border-[#CCF7F4]/10 p-6 w-full flex-1 min-w-[200px] rounded-[16px]
shadow-[0_8px_16px_rgba(0,17,17,0.6)]
transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)]
group-hover:not-hover:opacity-30
group-hover:not-hover:scale-95
group-hover:not-hover:blur-[2px]"
>
{/* Optyczna spójność za pomocą Logical Properties: mbe
(margin-block-end) */}
<h3 className="mbe-3 font-display text-xs font-bold text-
uppercase tracking-[0.1em]">
{stat.title}
</h3>
<div className="flex justify-between items-end">
<p className="text-3xl font-black text-white font-feature-settings-tnum drop-shadow-[0_2px_4px_rgba(0,17,17,0.8)]">
{stat.value}
</p>
<span className="text-sm font-bold text-
mb-1">{stat.diff}</span>
</div>
</div>
))}
</div>
);

Karta 8: Karta Abstrakcji Transakcyjnej (Smart Contract Wallet Card)
Zastosowanie: Odseparowanie warstwy finansowej i ekspozycja uśpionego salda USDC bez
agresywnego uświadamiania natury blockchain (Developer-Controlled Wallets). Zastosowane
Techniki (>160 IQ): Przestrzenna rotacja grawitacyjna naśladująca ruch w trójwymiarze bez
rysowania cieni punktowych oraz ominięcie zapadlisk w interpolacji gradientu poprzez sztywne
użycie palety OKLCH.
import React from 'react';
export default function SmartWalletCard({ balance }) {
return (
<div className="relative perspective-[1200px] w-full max-w-sm">
<div className="relative w-full p-8 rounded-[24px]
bg-[radial-gradient(ellipse_at_top_right,#003737_0%,#001111_100%)]
transform-gpu transition-transform duration-500
hover:rotate-x-[3deg] hover:-rotate-y-[3deg]
shadow-[0_25px_50px_rgba(0,17,17,0.9)] border
border-[#CCF7F4]/15"
>
<div className="absolute inset-0 pointer-events-none
rounded-[24px]
shadow-[inset_1px_1px_0_rgba(204,247,244,0.1),inset_-1px_-1px_0_rgba(0
,0,0,0.5)]" />
<div className="relative z-10 flex justify-between
items-center mb-12"> <div className="flex items-center gap-3">
{/* Pulsacyjny Wektor Aktywacyjny */}
<div className="w-2 h-2 rounded-full bg-
shadow-[0_0_12px_rgba(255,215,0,0.8)] animate-pulse" />
<span className="text-[#CCF7F4] text-sm font-semibold
tracking-widest uppercase">Circle Network</span>
</div>
<span className="px-3 py-1 rounded-full bg-[#001111] text-
text-[10px] font-black tracking-widest
shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
GASLESS
</span>
</div>
<div className="relative z-10">
<p className="text-xs text-[#CCF7F4]/50 mb-2 tracking-widest
uppercase font-bold">Dostępne Aktywa</p>
<div className="flex items-baseline gap-2">
<span className="text-3xl text-white/50
font-light">$</span>
<p className="text-6xl font-black text-transparent
bg-clip-text bg-gradient-to-r from-white to-[#CCF7F4]
font-feature-settings-tnum drop-shadow-[0_4px_8px_rgba(0,17,17,0.8)]">
{balance}
</p>
</div>
</div>
{/* Szum Teksturowy (Atmospheric Noise) na spód karty
zapobiegający bandingowi */}
<div
className="absolute inset-0 opacity-[0.02] mix-blend-overlay
pointer-events-none rounded-[24px]"
style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg
viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter
id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise'
baseFrequency='0.65' numOctaves='3'
stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25'
height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
/>
</div>
</div>
);
}
Karta 9: Karta Generatywna Wniosków AI (Generative AI Insight Card)
Zastosowanie: Dostarczanie twórcom błyskawicznych, dynamicznych autowniosków
napędzanych modelami analitycznymi LLM (Agentic AI). Zastosowane Techniki (>160 IQ):
Skrajny agnostycyzm ekranowy z pomocą wysoce eksperymentalnych zapytań kontenerowych
(@container) oraz parametryzacji horyzontalnej typografii płynnej funkcji matematycznej
clamp().
import React from 'react';
export default function GenUIInsightCard({ insight, metric, label }) {
return (
<div className="@container w-full bg-[#001717] rounded-[24px] p-1
shadow-[0_15px_30px_rgba(0,17,17,0.7)]">
{/* Architektura układów ewolucyjnych ignorująca viewport okna
(Window) */}
<div className="relative w-full h-full p-6 rounded-[22px]
bg-gradient-to-b from-[#002828] to-[#001111] border
border-[#CCF7F4]/10
flex flex-col @md:flex-row justify-between items-start
@md:items-center gap-6"
>
<div className="flex-1">
<div className="flex items-center gap-2 mb-3">
<div className="w-6 h-6 rounded-md bg-/20 flex
items-center justify-center border border-/50
shadow-[0_0_10px_rgba(157,78,221,0.3)]">
<svg className="w-3 h-3 text-" viewBox="0 0 24 24"
fill="currentColor">
<path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12
6.5z" />
</svg>
</div>
<span className="text-xs font-bold text- uppercase
tracking-widest">
AI Automatyzacje
</span>
</div>
{/* Płynna Typografia na osi Cqi (Container Query Inline)
bez Media Queries */}
<h3 className="text-white font-display leading-tight
font-medium" style={{ fontSize: 'clamp(1rem, 5cqi, 1.5rem)' }}> {insight}
</h3>
</div>
<div className="bg-[#001111] p-5 rounded-[16px] flex flex-col
items-center justify-center min-w-[140px]
shadow-[inset_0_2px_10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(204,247,244,0.
05)] border-t border-[#CCF7F4]/10">
<span className="text-[10px] text-[#CCF7F4]/60 mb-2
uppercase tracking-[0.2em] font-bold">{label}</span>
<span className="text-3xl font-black text-
drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
+{metric}%
</span>
</div>
</div>
</div>
);
}
Karta 10: Karta Zdarzenia Przestrzennego (Spatial Tipping / Event
Card)
Zastosowanie: Pionierskie środowiska z rozszerzoną rzeczywistością (WebXR / Spatial
Computing), wyzwalające haptyczne wsparcie finansowe z gogli XR kierowane na stream
wizualny. Zastosowane Techniki (>160 IQ): Zjawisko „Hapto-Optycznego Rezonansu
Emisyjnego”. Symulacja Pól Odległości (Signed Distance Fields - SDF) rzutująca impulsy
kinetyczne (Shockwave / Ripple) po ominięciu blokad renderingu CPU.
import React from 'react';
export default function SpatialEventCard() {
return (
<div className="relative w-full max-w-sm aspect-square flex
items-center justify-center bg-[#001111] rounded-[32px]
overflow-hidden border border-[#003737]
shadow-[0_20px_50px_rgba(0,17,17,0.9)]">
{/* 1. Abstrakcja Pól SDF - Proceduralny, organiczny wektor tła
rezonujący ze światłem */} <div
className="absolute inset-0 z-0 opacity-40 mix-blend-screen
pointer-events-none"
style={{
backgroundImage: `radial-gradient(circle at 50% 50%,
rgba(157,78,221,0.15) 0%, transparent 60%), radial-gradient(circle at
80% 20%, rgba(255,215,0,0.1) 0%, transparent 40%)`
}}
/>
{/* 2. Emisyjna Fala Uderzeniowa (Shockwave Ripple) wyzwalana
wyłącznie przy aktywacji */}
<div className="absolute inset-0 z-10
bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.2)_0%,transparen
t_70%)] opacity-0 active:opacity-100 active:scale-150 transition-all
duration-300 ease-out pointer-events-none" />
{/* 3. Kolizyjny Obiekt Przestrzenny z twardym rzutem cieniowym
*/}
<button className="relative z-20 w-48 h-48 rounded-full
bg-[#001717] border border-/20
shadow-[0_0_40px_rgba(255,215,0,0.1),inset_0_0_30px_rgba(0,33,33,0.9)]
flex flex-col items-center justify-center group cursor-pointer
hover:border-/50
hover:shadow-[0_0_60px_rgba(255,215,0,0.25),inset_0_0_40px_rgba(0,17,1
7,1)]
active:scale-90
active:shadow-[inset_0_15px_40px_rgba(0,0,0,0.95)] transition-all
duration-200"
>
<span className="text-[#CCF7F4]/60 text-xs font-bold
tracking-[0.2em] mb-3 group-active:opacity-0 transition-opacity">
UPUŚĆ ZASÓB
</span>
<div className="w-16 h-16 rounded-full bg-gradient-to-br from-
to- shadow-[0_0_20px_rgba(255,215,0,0.6)] group-active:scale-50
transition-transform duration-200" />
</button>
</div>
);
}