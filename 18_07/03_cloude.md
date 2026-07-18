# KOMPONENTY SVG / CANVAS / VISUAL PRIMITIVES

**Atomic (niższy poziom)**

| Komponent | Opis |
|---|---|
| `TealGradientBackground` | Bazowy `<rect>` z gradientem `270deg, #001717 → #003737 → #001111`. Warstwa 1 z-stack. |
| `CyberGlowFilter` | Definicja SVG `<filter id="cyberGlow">` z podwójnym `feGaussianBlur` + `feMerge`. Reużywalna przez `<use>`. |
| `SeamlessSvgPattern` | Kontener `<pattern>` z `patternUnits="userSpaceOnUse"` — silnik kafelkowania. |
| `GlowRect` | Linia renderowana jako `<rect height="1">` zamiast `<line>` — obejście Zero-Dimension Filter Bug. |
| `IsometricTransformGroup` | Tag `<g transform="matrix(0.866, 0.5, -0.866, 0.5, 0, 0)">` — globalna projekcja izometryczna. |

---

# KOMPONENTY WZORÓW (PATTERN LAYERS)

| Komponent | Opis |
|---|---|
| `CartesianGridPattern` | Zagnieżdżone siatki XY: mała podziałka `--teal-50`, duża jednostka `--teal-25`. Warstwa 2. |
| `PolarGridPattern` | Koncentryczne okręgi `<circle>` + linie promieniowe. Styl sonaru/radaru. |
| `IsometricGridPlane` | Płaska siatka ortogonalna przekształcona macierzą izometryczną. Warstwa 3. |
| `TopographicWavePattern` | Izolinie z kubicznych krzywych Beziera (`C`, `S`). Algorytm CONREC. Kolor `--purple-300`. |
| `PcbSchematicPattern` | Ścieżki obwodów drukowanych — routing pod 45°/90°. Kolor `--purple-300` z glow. Warstwa 4. |
| `SinusoidalWaveOverlay` | Czyste fale sinusoidalne symulujące przepływ RF/danych. Nakładka na topografię. |

---

# KOMPONENTY HUD / UI OVERLAY

| Komponent | Opis |
|---|---|
| `HudCornerFrame` | Techniczne ramki narożne z sfazowaniami 45° (`<path M L>`). Znaczniki wyrównania. Warstwa 3. |
| `CrosshairReticle` | Celownik: punkt kotwiczenia + 4 hash marks + przerywany okrąg `stroke-dasharray="4 8"`. Złoto `--gold-400`. |
| `HudReadoutLabel` | Cyfrowy odczyt telemetrii w foncie monospacjalnym. Kolor `--gold-400`. Warstwa 5. |
| `AzimuthScaleRing` | Obwód siatki polarnej z podziałką azymutową i wartościami kąta. |
| `RegistrationMarker` | Mikro-krzyżyki i prostopadłe hatch marks pozycjonowane na "bezpiecznej strefie". |
| `FloatingIsometricNode` | Węzeł 3D unoszący się przez `translate(0, -Z)` na izometrycznej osi. Kolor `--teal-25`. |

---

# KOMPONENTY KOMPOZYCJI (ARCHETYPOWE WARIANTY)

| Komponent | Opis |
|---|---|
| `TacticalNavigationScene` | Archetyp A: Corner + PolarGrid + Crosshair. Dominuje `--gold-400` w centrum. |
| `Web3CryptoNodeScene` | Archetyp B: PCB + Topography + Isometric. Dominuje `--purple-300`. Zero złota. |
| `DatabaseArchitectureScene` | Archetyp C: Corner + CartesianGrid + Schematic. 95% `--teal-25`. Bez glow. |
| `ProceduralSceneComposer` | Silnik kombinatoryczny: losuje `2 ≤ k ≤ 4` klas elementów wg wag i kar dystonansowych. |

---

# KOMPONENTY SYSTEMU DESIGNU (DESIGN TOKENS / STYLE SYSTEM)

| Komponent | Opis |
|---|---|
| `TealColorScale` | Eksport tokenów `--teal-25` → `--teal-900` jako Tailwind CSS variables / TS constants. |
| `GoldColorScale` | Eksport tokenów `--gold-50` → `--gold-900`. |
| `PurpleColorScale` | Eksport tokenów `--purple-100` → `--purple-500`. |
| `ColorTokenProvider` | React Context dostarczający palety tokenom komponentów SVG. |
| `ZLayerOrchestrator` | Zarządza kolejnością renderowania warstw 1–5 zgodnie z painter's algorithm. |

---

#KOMPONENTY REACT (WRAPPER / INTEGRATION)

| Komponent | Opis |
|---|---|
| `SvgCanvas` | Główny `<svg>` kontener z `viewBox`, `preserveAspectRatio` i blokiem `<defs>`. |
| `SvgDefsRegistry` | Centralne `<defs>` rejestrujące filtry, gradienty i wzory. Zapobiega duplikacji DOM. |
| `UseInstanceRenderer` | Renderuje klony geometrii przez `<use href="#id">` — implementacja DRY/instancjonowania. |
| `TilingCloneEngine` | Logika modulo dla bezszwowego zawijania: generuje klony na `(x-W, y)`, `(x, y-H)`, `(x-W, y-H)`. |
| `AnimatedHudOverlay` | Wrapper animujący elementy HUD (obroty celownika, pulsowanie glow) przez CSS/SMIL. |
| `ResponsiveSvgWrapper` | Next.js komponent opakowujący SVG w responsywny kontener z zachowaniem aspect ratio. |

---

# STRONY / WIDOKI (KATALOG)

| Strona | Elementy SVG |
|---|---|
| `/` Landing Hero | `TacticalNavigationScene` jako full-screen background + `AnimatedHudOverlay` |
| `/dashboard` | `DatabaseArchitectureScene` + `CartesianGridPattern` + `HudReadoutLabel` |
| `/wallet` / `/tip` | `Web3CryptoNodeScene` + `PcbSchematicPattern` + `FloatingIsometricNode` |
| `/creator/:id` | `TacticalNavigationScene` + `CrosshairReticle` centrowany na avatar |
| `/onboarding` | `IsometricGridPlane` jako tło kroków + `HudCornerFrame` na formularzu |
| `/settings` | `DatabaseArchitectureScene` — wersja statyczna, bez animacji |
| `/404` | `CrosshairReticle` z zerowym odczytem + `HudReadoutLabel` "404 TARGET_NOT_FOUND" |


# KOMPONENTY PÓL FORMULARZY (INPUT SYSTEM)

| Komponent | Opis |
|---|---|
| `TextInputLarge` | Pole tekstowe 56px z floating label. Obsługuje pełną macierz stanów. |
| `TextInputStandard` | Pole tekstowe 48px — wariant kompaktowy dla dashboardów. |
| `FloatingLabel` | Etykieta animowana: centralnie w pionie → góra+skala 0.75 przy Focus. Zmienia kolor na `--gold-400`. |
| `InputBorderLayer` | Izolowana warstwa obramowania. Zarządza kolorem 1px border dla każdego stanu. |
| `InputInnerShadow` | Dekoracyjny cień wewnętrzny `inset 0 1px 2px rgba(0,0,0,0.2)` — kompensuje niski kontrast granicy. |
| `NeonGlowFocusRing` | Trójwarstwowy `box-shadow`: ostra krawędź + halo 4px + ambient 12px. Kolor `--gold-400`. |
| `Textarea` | Obszar tekstowy na tych samych zasadach co Input + resize handle + custom scrollbar. |
| `TextareaResizeHandle` | Uchwyt resize w prawym dolnym rogu, kolor `--teal-500`. |
| `CustomScrollbar` | Styl `::webkit-scrollbar`: track transparent, thumb `--teal-500` → `--teal-400` on hover. |

---

# KOMPONENTY STANÓW (STATE VARIANTS)

| Komponent | Opis |
|---|---|
| `InputStateDefault` | Tło `--teal-700`, border `--teal-500`, label `--teal-100`. |
| `InputStateHover` | Tło `--teal-600`, border `--teal-400`, transition `0.2s ease-in-out`. |
| `InputStateFocus` | Border + floating label + caret w `--gold-400`. Aktywuje `NeonGlowFocusRing`. |
| `InputStateFilled` | Tło `--teal-800`, tekst `--teal-25`, label zmniejszona i przyciemniona. |
| `InputStateError` | Border + tekst walidacji w `--error-light (#FFB4AB)`. Focus ring czerwony. |
| `InputStateSuccess` | Border `--success-light (#69F0AE)` + ikona Check po prawej. |
| `InputStateDisabled` | Opacity `0.4`, tło `--teal-850`, kursor `not-allowed`. Opcjonalny border `dashed`. |
| `ShakeAnimation` | Mikro-animacja potrząśnięcia w osi X (3–4px) przy próbie submitu błędnego formularza. |

---

# KOMPONENTY SELEKCJI

| Komponent | Opis |
|---|---|
| `Checkbox` | 20×20px, hit area 44×44px. Unchecked: border `--teal-500`. Checked: tło `--gold-400`, ptaszek `--teal-700`. |
| `CheckboxCheckmark` | SVG vector checkmark w kolorze `--teal-700` na złotym tle. Kontrast >9:1. |
| `CheckboxFocusRing` | Złota poświata oddzielona 2px offsetem od pudełka. |
| `RadioButton` | Koło 20×20px. Checked: border `--gold-400`, kropka 10px `--gold-400`, prześwit tła `--teal-700`. |
| `ToggleSwitch` | Track 36×20px, thumb 16×16px. Off: `--teal-850` track. On: `--purple-300` track. |
| `ToggleThumb` | Suwak z animacją elastyczności — poziome rozciąganie podczas ruchu. |

---

# KOMPONENT SELECT / DROPDOWN

| Komponent | Opis |
|---|---|
| `SelectTrigger` | Wygląd identyczny jak `TextInputLarge/Standard` + ikona Chevron Down po prawej. |
| `DropdownMenu` | Lista rozwinięta: tło `--teal-700`, border `--teal-500`, cień `0 8px 24px rgba(0,0,0,0.5)`. |
| `DropdownItem` | Pozycja 48px. Hover: `--teal-600`. Selected: tekst `--gold-400`, tło `--teal-850` + ikona Check. |
| `DropdownElevationLayer` | Implementacja zasady „światło jako elewacja": warstwa 0→1→2 przez jasność tła. |

---

# SYSTEM TYPOGRAFII

| Komponent | Opis |
|---|---|
| `InputText` | IBM Plex Sans Regular 400, 16px. Kolor `--teal-25`. Zapobiega iOS zoom. |
| `LabelText` | IBM Plex Sans Regular/Medium 400–500, 14px → 12px po floating. Kolor `--teal-100`. |
| `HelperText` | IBM Plex Sans Regular 400, 12px. Pod polem — instrukcje lub walidacja. |
| `ErrorMessage` | 12px, kolor `--error-light (#FFB4AB)`. Pojawia się pod polem w stanie Error. |
| `ButtonText` | SemiBold 600, 14px, opcjonalnie Uppercase. Dla przycisków wewnątrz formularza. |

---

# SYSTEM TOKENÓW CSS

| Komponent | Opis |
|---|---|
| `CssTokensProvider` | `:root` z pełnym zestawem Custom Properties: surface, border, text, focus, error, success. |
| `AutofillOverride` | Styl `:-webkit-autofill` wymuszający `--teal-800` jako tło przez `box-shadow inset 1000px`. |
| `ContainerQueryAdapter` | Logika przełączania 56px→48px i floating→placeholder w wąskich kontenerach (CSS Container Queries). |
| `AccessibilityAuditToken` | Zestaw tokenów z udokumentowanymi ratio WCAG: pass/fail per para kolorów. |

---

# KOMPONENTY WALIDACJI WCAG

| Komponent | Opis |
|---|---|
| `ContrastBadge` | Wyświetla ratio kontrastu pary kolorów. Pomocniczy komponent dev/storybook. |
| `AccessibleBorderStrategy` | Komponent implementujący hybrydową strategię: surface contrast `--teal-700` na `--teal-900` + border dekoracyjny. |
| `FocusVisibleManager` | Zarządza `focus-visible` vs `focus` — ukrywa ring dla myszy, pokazuje dla klawiatury. |

---

# STRONY / WIDOKI (KATALOG)

| Strona | Główne komponenty formularza |
|---|---|
| `/register` | `TextInputLarge` × 3 + `Checkbox` (ToS) + `ButtonText` |
| `/login` | `TextInputStandard` × 2 + `ToggleSwitch` (remember me) |
| `/onboarding` | Multi-step: `TextInputLarge` + `RadioButton` group + `SelectTrigger` |
| `/settings/profile` | `TextInputStandard` + `Textarea` + `SelectTrigger` × N |
| `/settings/security` | `TextInputLarge` (hasło) + `ToggleSwitch` × N (2FA, notifications) |
| `/tip` (płatność) | `TextInputLarge` (kwota USDC) + `SelectTrigger` (wallet) + `InputStateError/Success` |
| `/creator/edit` | `Textarea` (bio) + `TextInputStandard` × N + `Checkbox` group |

# KOMPONENTY PAINT WORKLET (HOUDINI ENGINE)

| Komponent | Opis |
|---|---|
| `PaintWorkletRegistry` | Centralny rejestr `registerPaint('name', class)` — silnik inicjalizacji wszystkich Workletów aplikacji. |
| `FrostWorklet` | Worklet rysujący proceduralny mikroszum kryształów lodu na obwodzie fasetowanej bryły. Reaguje na `--temperature`. |
| `LiquidWellWorklet` | Worklet tła pola Input — dynamiczny gradient radialny podążający za kursorem (`--mouse-x`, `--mouse-y`). |
| `ThermodynamicGlowWorklet` | Worklet rysujący plazmę termodynamiczną między `border-box` a `outline` — sterowany `--heat-intensity`. |
| `PolygonTracerWorklet` | Worklet odrysowujący obwódkę wewnątrz `clip-path` wg koordynatów `--path`. Animuje laserowy impuls wzdłuż ramki. |
| `RadialEdgeRevealWorklet` | Worklet maski (`-webkit-mask`) — pulsujące przenikanie fiolet→złoto na obwodzie awatara. |
| `RefractionGlassWorklet` | Worklet implementujący Prawo Snella (`refract(e1, e2, k)`) dla RGB osobno — fizyczna soczewka w `border-box`. |
| `RippleEmitterWorklet` | Worklet rysujący rozszerzający się okrąg tętna w miejscu tapnięcia (X/Y) — bez modyfikacji DOM. |
| `PeristalticFluidWorklet` | Worklet animujący krzywe Béziera suwaka toggle wg prędkości wskaźnika (`Pointer Velocity`). |
| `StaticEinkWorklet` | Worklet generujący proceduralny szum e-papierowy (pseudolosowe ziarna) — jednorazowy, osadzony w VRAM. |
| `OklabGradientWorklet` | Worklet interpolujący gradient w przestrzeni Oklab — z dynamiczną re-kalkulacją APCA przy zmianie tła. |

---

# KOMPONENTY ARCHITEKTURY RENDEROWANIA

| Komponent | Opis |
|---|---|
| `DoubleWrapper` | Wzorzec dwóch warstw DOM: zewnętrzna (`filter: drop-shadow`) + wewnętrzna (`clip-path`). Rozwiązuje konflikt cienia z maską. |
| `DropShadowLayer` | Zewnętrzna kapsuła `DoubleWrapper` — `filter: drop-shadow()` śledzący kanał alfa geometrii wewnętrznej. |
| `ClipPathLayer` | Wewnętrzna kapsuła `DoubleWrapper` — implementuje `clip-path: polygon()` bez utraty outer shadow. |
| `CompositorPinLayer` | Wrapper izolujący animację na warstwie kompozytora GPU — eliminuje Layout Thrashing. |
| `ContainerQueryAdapter` | Przełącza warianty komponentu (56px→48px, floating→placeholder) przez CSS Container Queries bez media queries. |

---

# KOMPONENTY GEOMETRII / KSZTAŁTÓW

| Komponent | Opis |
|---|---|
| `ChamferedCard` | Karta z `corner-shape: chamfer` + `border-radius: 32px` — fasetowane ścięcia 45°. Wariant luksusu. |
| `ChamferedAuthModal` | Modal autoryzacji z `corner-shape: chamfer` + `border-radius: 24px` — estetyka pancernego szkła. |
| `ParallelogramCard` | Karta ścięta `clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%)` — kierunkowa estetyka Web3/telemetrii. |
| `OrganicInputVoid` | Pole Input z `clip-path: polygon(...)` o nieregularnym, organicznym kształcie — bez widocznego border. |
| `PillClipContainer` | Kontener toggle w kształcie pigułki `clip-path: inset(0 round 50%)` — baza dla `PeristalticToggle`. |
| `GlitchPolygonPanel` | Panel z nieregularnym `clip-path: polygon()` animowanym `steps(3)` — estetyka brutalizma/cybercore. |

---

#KOMPONENTY OŚWIETLENIA I CIENI

| Komponent | Opis |
|---|---|
| `NeonGlowBorder` | `border-image: paint(worklet)` z trójwarstwowym `box-shadow` — ostra krawędź + halo + ambient. |
| `InsetVoidShadow` | Asymetryczny podwójny `inset` shadow: `0 8px 16px rgba(0,0,0,0.9)` + `0 -2px 4px rgba(255,255,255,0.1)`. Efekt wgniecenia. |
| `GlassInsetHighlight` | Cień `inset 0 1px 1px rgba(255,255,255,0.8)` (góra) + `inset 0 -1px 2px rgba(0,0,0,0.5)` (dół) — fizyczna objętość szkła. |
| `ElevationRiseShadow` | `box-shadow: 0 24px 48px rgba(0,31,31,0.8)` sprzężony z `transform: translateY(-8px)` — lewitacja karty. |
| `AsymmetricOffsetShadow` | Płaski `box-shadow: 4px 4px 0px var(--gold-400)` bez rozmycia — estetyka 8-bit/retro dla paneli glitch. |
| `HorizontalShiftShadow` | Outer shadow dynamicznie przesuwający pozycję horyzontalną (`4px` → `-4px`) podczas przeciągania toggle. |
| `AmbientCeilingShadow` | Stabilizujący `inset 0 1px 0 rgba(255,255,255,0.15)` — światło ambientowe ze sklepienia sceny 3D. |

---

# KOMPONENTY FOCUS / OUTLINE

| Komponent | Opis |
|---|---|
| `ThermodynamicFocusRing` | `outline: 2px solid transparent` + `outline-offset: 6px` — magnetyczna szczelina bez Layout Thrashing. |
| `GoldFocusRing` | Trójwarstwowy `box-shadow` w `--gold-400` — aktywowany przez `:focus-within`. |
| `FocusVisibleManager` | Ukrywa ring dla myszy (`focus`), pokazuje dla klawiatury (`focus-visible`). |
| `BackgroundClipBreather` | `background-clip: padding-box` — izoluje border w osobnej warstwie kompozycji dla termodynamicznego outline. |

---

# KOMPONENTY INTERAKCJI (TACTILE / HAPTIC)

| Komponent | Opis |
|---|---|
| `PrimaryCtaButton` | Przycisk z `transform: scale(0.95)` przy Pointer Down + `inset 0px 8px 16px rgba(0,0,0,0.6)` — efekt kompresji materiału. |
| `HapticRippleTrigger` | Sprzęga `RippleEmitterWorklet` z `navigator.vibrate()` / Apple Core Haptics przy zwolnieniu przycisku. |
| `PeristalticToggle` | Toggle z animacją lepkiego pęcherza — krzywe Béziera pękają przy przekroczeniu środka toru. |
| `ShakeValidationTrigger` | Mikro-animacja osi X (3–4px) przy submicie błędnego formularza — sprzężona ze stanem Error. |
| `PointerVelocityTracker` | Hook mierzący prędkość wskaźnika i przekazujący `--pointer-velocity` do Workletów (toggle, fluid). |

---

# KOMPONENTY SYSTEMU KOLORÓW (OKLAB / APCA)

| Komponent | Opis |
|---|---|
| `OklabColorInterpolator` | Moduł zamieniający interpolację `sRGB` → `Oklab` — eliminuje „martwe tony" w gradientach. |
| `ApcaContrastCalculator` | Implementacja algorytmu APCA (WCAG 3) jako stałe WGSL / Worklet — dynamiczna re-kalkulacja kontrastu. |
| `OledEnergyOptimizer` | Logika ograniczająca użycie subpiksela niebieskiego (`C_b`) — faworyzuje `--gold-400` i `--teal` na OLED. |
| `RealTimeContrastAdapter` | Moduł w `OklabGradientWorklet` — przyciemnia próg alfa gdy tło zagraża czytelności złotych akcentów. |
| `AmbientLightAdapter` | Wykorzystuje Ambient Light Sensor API do dynamicznej regulacji nasycenia glow (ciemny pokój → redukcja). |

---

# KOMPONENTY SHADERÓW WGSL / WebGPU

| Komponent | Opis |
|---|---|
| `VoronoiHeatShader` | Compute Shader WGSL — algorytm Woronoja dyfuzji cieplnej w VRAM dla `ThermodynamicGlowWorklet`. |
| `SnellRefractionShader` | Shader WGSL — trzykrotna funkcja `refract()` dla R/G/B osobno (aberracja chromatyczna). |
| `AlphaCompositor` | Sprzętowe compositing przez kanał alfa — wycięcie pikseli zamiast dodawania cienia dla głębi osadzenia. |
| `FBOTextureMapper` | Odczyt Frame Buffer Object — mapuje piksele tła na `border-box` dla efektu refrakcji szkła. |

---

# STRONY / WIDOKI (KATALOG)

| Strona | Główne komponenty Houdini |
|---|---|
| `/login` / `/register` | `ChamferedAuthModal` + `FrostWorklet` + `InsetVoidShadow` + `GoldFocusRing` |
| `/dashboard` | `ParallelogramCard` + `PolygonTracerWorklet` + `ThermodynamicFocusRing` |
| `/tip` (CTA płatności) | `PrimaryCtaButton` + `HapticRippleTrigger` + `RippleEmitterWorklet` |
| `/creator/:id` (Top Fans) | `ChamferedCard` + `OklabGradientWorklet` + `ElevationRiseShadow` + `RealTimeContrastAdapter` |
| `/creator/:id` (Avatar) | `RadialEdgeRevealWorklet` + `AlphaCompositor` — efekt dymorfizmu krawędzi |
| `/settings` | `PeristalticToggle` + `PeristalticFluidWorklet` + `HorizontalShiftShadow` |
| `/onboarding` (Input) | `OrganicInputVoid` + `LiquidWellWorklet` + `PointerVelocityTracker` |
| `/notifications` / `/errors` | `GlitchPolygonPanel` + `StaticEinkWorklet` + `AsymmetricOffsetShadow` |
| Floating nav (global) | `RefractionGlassWorklet` + `GlassInsetHighlight` + `SnellRefractionShader` |

# KOMPONENTY PASYWNE — LUMINESCENCJA OLED (GRUPA 1)

| Komponent | Opis |
|---|---|
| `SubpixelEmeraldBorder` | `border: 1px solid #00FF00` na czarnym tle. Eksploatuje wydajność subpiksela zielonego (142.8 cd/A). Zużycie ~25mW. |
| `GhostMaskBorder` | `mask-image: radial-gradient(circle, ...)` — iluzja zanikającej krawędzi bez `backdrop-filter`. Zero konwolucji. |
| `ChromaShiftOffset` | Pseudoelement `::after` z litym kolorem przesunięty przez `transform: translate()`. Cień bez Repaint. |
| `InsetDepthBorder` | `box-shadow: inset` z `blur-radius: 0` — twardy pas wewnętrzny bez algorytmów konwolucyjnych. |
| `SplitRedGreenBorder` | `border-left: #FF0000` + `border-right: #00FF00`. Asymetryczna krawędź bojkotująca subpiksel niebieski. |

---

# KOMPONENTY ANIMOWANE — COMPOSITOR THREAD (GRUPA 2)

| Komponent | Opis |
|---|---|
| `ConicRotatorBorder` | `@property --angle` + `conic-gradient` + `mask-composite: exclude`. Rotujący gradient bez zmiany `border-color`. |
| `HardwarePulseBorder` | Pseudoelement z `will-change: opacity` animowany wyłącznie kanałem alfa — zero Repaint. |
| `ScaleBreatheBorder` | `transform: scale(1.05)` + `opacity` — organiczne pulsowanie w 100% na Compositor Thread. |
| `ScanningLightBeam` | Gradient liniowy w kontenerze `overflow: hidden` przesuwany przez `translateX()` — efekt skanera. |
| `HoverRevealBorder` | Obramowanie ukryte na `translateZ(-1)`, odsłaniane przez `translateX()` przy hover — zero Repaint na żądanie. |

---

# KOMPONENTY PROCEDURALNE — HOUDINI + SVG (GRUPA 3)

| Komponent | Opis |
|---|---|
| `ProceduralDashBorder` | `CSS.paintWorklet` rysujący precyzyjną przerywaną kratkę inżynieryjną — bez ograniczeń `border: dashed`. |
| `MarchingAntsBorder` | `<svg>` z animowanym `stroke-dashoffset` — maszerujące kreski jak w profesjonalnych edytorach CAD. |
| `DynamicLaserSvgTrace` | Ścieżka SVG aktywowana przez `:hover/:focus` rozwijająca się po konturach elementu. |
| `ConstrainedTurbulenceBorder` | `feTurbulence` ograniczony do 1px pseudoelementu z minimalnym Bounding Box — wyłącznie Chrome. |
| `ChromaTrackedEdgeGlow` | Promienisty gradient podążający za kursorem przez `--mouse-x/--mouse-y` bez manipulacji DOM. |

---

# KOMPONENTY EKSPERYMENTALNE — ALPHA MASKING / CYBERPUNK (GRUPA 4)

| Komponent | Opis |
|---|---|
| `MixBlendDifferenceBorder` | `mix-blend-mode: difference` na granicy elementu — odwrócenie barw tła jako obramowanie, obliczenia w ALU GPU. |
| `StaticEinkNoiseBorder` | Szum SVG zakodowany Base64 w `border-image` — zębata tekstura e-papierowa renderowana jednorazowo. |
| `PolygonGlitchBorder` | `clip-path: polygon()` animowany przez `steps(n)` — szarpane cięcia bez wygładzania, zero Layout Thrashing. |
| `DualSteppedGradientBorder` | `linear-gradient` z ostrymi `color-stops` bez fuzji — estetyka 8-bit, zero ditheringu GPU. |
| `ChamferedCornerBorder` | `corner-shape: chamfer` z Houdini — matematyczne ścięcia narożników na poziomie kompilatora CSS. |

---

# KOMPONENTY SYSTEMU WYDAJNOŚCI (INFRASTRUCTURE)

| Komponent | Opis |
|---|---|
| `CompositorLayerPin` | `will-change: transform` / `translateZ(0)` — wynosi element do osobnej warstwy VRAM. |
| `BorderAnimationGuard` | HOC blokujący animację `border-width` i `box-shadow` bezpośrednio — wymusza zamianę na `opacity`/`scale`. |
| `PseudoElementShadowLayer` | Pseudoelement `::before/::after` jako izolowana warstwa cienia — zastępuje `box-shadow` na elemencie. |
| `WillChangeManager` | Zarządza atrybutem `will-change` — dodaje przed animacją, usuwa po, zapobiega nadmiernemu promowaniu warstw. |
| `OpacityTransitionOnly` | Wrapper wymuszający animację wyłącznie przez `opacity` — gwarantuje pozostanie na Compositor Thread. |
| `TypedOMPropertyBridge` | Most między JS a CSS przez Typed OM — eliminuje kosztowną konwersję string→number podczas animacji. |

---

# KOMPONENTY ANTYWZORCÓW (DEV/GUARD)

| Komponent | Opis |
|---|---|
| `BackdropBlurWarning` | Dev-only komponent wykrywający użycie `backdrop-filter: blur()` nad animowanym tłem i logujący ostrzeżenie. |
| `ReflowTriggerDetector` | Dev-only — wykrywa animację `border-width` lub `box-shadow` w `:hover` wyzwalającą fazę Layout. |
| `AlphaGradientStackAudit` | Dev-only — skanuje wielowarstwowe `rgba()` gradienty mogące generować 500mW w Firefox. |
| `BlueDominanceAudit` | Dev-only — wykrywa użycie czystego `#0000FF` lub białego na dużych powierzchniach (subpiksel C_b). |

---

# KOMPONENTY TOKENÓW ENERGETYCZNYCH

| Komponent | Opis |
|---|---|
| `OledSafeColorPalette` | Zestaw tokenów faworyzujących zieleń/złoto/czerwień — unika czystego błękitu i bieli na dużych obszarach. |
| `DarkModeBaseTokens` | Tokeny bazowe `--surface-page: #000000` / `--surface-deep: #001F1F` — minimalna luminancja OLED. |
| `EnergyBudgetTokens` | Tokeny z dokumentowanym kosztem energetycznym per komponent (np. `--cost-blur: 500mW`). |

---

# STRONY / WIDOKI (KATALOG)

| Strona | Główne komponenty energetyczne |
|---|---|
| `/` Landing | `ConicRotatorBorder` (hero CTA) + `GhostMaskBorder` (sekcje) + `OledSafeColorPalette` |
| `/login` / `/register` | `InsetDepthBorder` (inputy) + `HardwarePulseBorder` (focus) + `ChamferedCornerBorder` (modal) |
| `/dashboard` | `ScanningLightBeam` (karty telemetrii) + `ChromaTrackedEdgeGlow` (hover) + `CompositorLayerPin` |
| `/tip` (CTA) | `ScaleBreatheBorder` (przycisk) + `HapticRippleTrigger` + `OpacityTransitionOnly` |
| `/notifications` / `/errors` | `PolygonGlitchBorder` + `StaticEinkNoiseBorder` + `DualSteppedGradientBorder` |
| `/creator/:id` | `MarchingAntsBorder` (zaznaczenie) + `DynamicLaserSvgTrace` (hover avatar) |
| `/settings` | `SplitRedGreenBorder` (toggles) + `ChromaShiftOffset` (aktywne sekcje) |
| Dev/Storybook | `BackdropBlurWarning` + `ReflowTriggerDetector` + `AlphaGradientStackAudit` + `BlueDominanceAudit` |

# MODUL I — MODAL / COMPOSITING

| Komponent | Opis |
|---|---|
| `PaymentModal` | Modal potwierdzenia transakcji USDC. `z-index: 400`, wejście przez `@starting-style` scale `0.95→1.0`, czas 300–400ms. |
| `ConfirmationModal` | Identyczna architektura co `PaymentModal` — slot treści dla akcji konta (np. zmiana walletu). |
| `EducationModal` | Modal informacyjny. Statyczny rendering, bez listenerów akcji finansowych. |
| `PrismaticBorder` | Wrapper granicy komponentu. Pseudoelement z gradientem `teal-700/gold-400/purple-300` + `mask-composite: exclude`. |
| `LiquidGlassBackdrop` | Kurtyna tła modala. `backdrop-blur-2xl` + `backdrop-saturate-200` + SVG `feDisplacementMap`. |
| `LiquidSnapCurve` | Token krzywej `cubic-bezier` o charakterze „snap" — szybka akceleracja + twarde tłumienie. Używany przy wejściu modali. |

---

# MODUL II — FAN WALL / GRID

| Komponent | Opis |
|---|---|
| `FanWall` | Główny kontener siatki Bento Grid — asymetryczny, matematycznie proporcjonalny układ kart fanów. |
| `FanAvatarCard` | Karta awatara fana. Bazowa warstwa `Z-1`. Awansuje do Emissive Neon Glow dla Top 3. |
| `SpatialAnomalyGlow` | Efekt emisyjny dla Top 3 fanów. Kolor obliczany w przestrzeni OKLCH (`gold/silver/bronze`). Wychodzi z warstwy `Z-1`. |
| `FanStatsModal` | Modal statystyk fana. Wymusza `font-feature-settings: "tnum"` dla tabulacji cyfr. |
| `TabularStatDisplay` | Komponent wyświetlający dane finansowe. `tnum` + `text-box: trim-both cap alphabetic` — eliminacja Financial Jitter. |
| `OklchColorTokens` | Zestaw tokenów w przestrzeni OKLCH — perceptualnie jednolite obliczanie luminancji glow bez deformacji hue. |

---

# MODUL III — TOOLTIPS / POPOVERS

| Komponent | Opis |
|---|---|
| `GooeyTooltip` | Tooltip aktywowany kliknięciem (nie hover). `z-index: 500`. SVG `feColorMatrix` — efekt biologicznej morfogenezy (fuzja alfa). |
| `ContextPopover` | Popover z dynamicznym slotem treści. `calc-size()` + `interpolate-size: allow-keywords` — animacja `height: auto` bez JS. |
| `CalcSizeInterpolator` | Wrapper implementujący `calc-size()` — eliminuje `ResizeObserver` i Layout Thrashing przy nieznanej wysokości treści. |

---

# MODUL IV — DROPDOWN / NAWIGACJA

| Komponent | Opis |
|---|---|
| `AnchoredDropdown` | Dropdown pozycjonowany przez CSS Anchor Positioning API (`anchor-name: --dropdown-trigger`). Zero JS przy scroll/resize. |
| `PillowMenuItem` | Pozycja dropdownu. Podwójny `inset` shadow: jasny lewy-górny + ciemny prawy-dolny — efekt „Pillow Embossing". |
| `DeepNavigation` | Multi-level nawigacja breadcrumb zbudowana na `AnchoredDropdown` — bez kumulacji kar wydajnościowych. |

---

# MODUL V — FORMULARZE / INPUT

| Komponent | Opis |
|---|---|
| `LiquidInputField` | Pole input symulujące „oddychającą studnię". SVG `feDisplacementMap`. Stany: Idle (`teal-900`) / Focus (`purple-300` glow) / Error. |
| `FloatingLabel` | Etykieta animowana `150ms ease-in-out` — translacja w górę + scale down + zmiana `font-weight` przy focus. |
| `FrozenGlassErrorState` | Stan błędu: proceduralny efekt zamarzającego lodu w kolorze `#FFB4AB` — zapobiega chromostereopsji na tle teal. |
| `WalletAddressInput` | Rozszerzenie `LiquidInputField` z walidacją kryptograficznego adresu blockchain (regex + checksum). |
| `NuclearResonanceGlow` | Token stylu focus — emisyjny glow `purple-300` nakładany przez `feDisplacementMap` przy aktywacji pola. |

---

# MODUL VI — TOAST / Z-AXIS

| Komponent | Opis |
|---|---|
| `BlockchainToast` | Toast mapowany na webhook Circle. `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — matematyczny overshoot (sprężyna). `z-index: 300`. |
| `ToastStack` | Kontener stosu toastów. Starsze toasty cofane w oś Z przez `scale: 0.95` + `translateZ` — nie przesuwa tekstu w górę. |
| `ZAxisRegistry` | Globalny rejestr `z-index` oparty na Zustand — centralny dystrybutor warstw (500/400/300/...), eliminuje z-index wars. |
| `ReversalToast` | Toast błędu transakcji blockchain. Paleta `#FFB4AB` (bez chromostereopsji) + `aria-live="assertive"` — nie kradnie focusu. |
| `FirstInteractionCallout` | Jednorazowa animacja celebrująca pierwszą interakcję nowego fana. Triggerowana przez `isFirstInteraction: true`. |
| `EmotionalTierBadge` | Badge dynamicznie zmieniający wygląd toastu wg `emotionalTier`: STANDARD / FRENZY / WHALE. |

---

# MODUL VII — AMBIENT LIGHT / SHADOW

| Komponent | Opis |
|---|---|
| `AmbientLightAdapter` | React Context Provider — odczytuje `AmbientLightSensor API` (lux) i wstrzykuje dane do globalnego kontekstu. |
| `NocturnalOpulenceWrapper` | HOC dynamicznie przeliczający globalne tokeny OKLCH wg poziomu oświetlenia. Fallback na `@media (prefers-color-scheme: dark)`. |
| `ShadowMaestroProvider` | Globalny silnik cieni — „Chameleon Shadows" próbkujące kolor tła i tintujące `box-shadow` dla fizycznego radiosity. |
| `CascadingLuminanceScaler` | System dynamicznych zmiennych OKLCH napędzany danymi lux z `AmbientLightAdapter`. |
| `GenUICard` | Karta Bento Grid generowana przez pipeline LLM→MCP→React. Dziedziczy tokeny Z-Axis z Zustand. Wejście przez `@starting-style`. |

---

# FINITE STATE MACHINE — WALLET

| Komponent | Opis |
|---|---|
| `WalletFSM` | Maszyna stanów XState dla portfela — 5 wzajemnie wykluczających się stanów. Eliminuje niemożliwe kombinacje UI. |
| `WalletNavIcon` | Ikona nawigacji portfela — wizualny proxy stanu `WalletFSM`. |
| `WalletStateIdle` | Stan bazowy. Paleta `teal-900`, zero animacji. |
| `WalletStatePending` | Podczas attestacji blockchain. Pulsujący glow `purple-300` + `aria-busy="true"`. |
| `WalletStateActive` | Po zatwierdzonym depozycie USDC. Popup 3–5s + `aria-live="polite"`. |
| `WalletStateFrenzy` | >5 webhooków w 10s. Blokuje animacje stroboskopowe (ryzyko epilepsji). Debounce screen readera. |
| `WalletStateWhale` | Wysoka wartość transakcji. Persystentny motyw `gold-400` + `aria-live="assertive"`. |
| `WalletBalanceDisplay` | Wyświetlanie salda USDC. `tnum` + dane jako String (nie Float) — ochrona przed błędami IEEE 754. |

---

# ARIA / ACCESSIBILITY

| Komponent | Opis |
|---|---|
| `ARIALiveRegionManager` | Programowo wyłącza ogłoszenia `aria-live` podczas stanu Frenzy — zapobiega chaotycznej syntezie mowy. |
| `ScreenReaderBalanceAnnouncer` | Element `sr-only` odsprzężony od UI — ogłasza ostateczne, poprawne saldo po zakończeniu sekwencji Frenzy. |

---

# SSE / REAL-TIME INFRASTRUCTURE

| Komponent | Opis |
|---|---|
| `SSEConnectionProvider` | Provider zarządzający połączeniem SSE + Leader Election przez `BroadcastChannel API`. |
| `LeaderElectionManager` | Negocjuje między zakładkami — tylko jedna zakładka otwiera fizyczne połączenie HTTP/2 do NestJS. |
| `BroadcastChannelBridge` | Przesyła dane SSE od zakładki-lidera do followerów. Alternatywa dla `SharedWorker` (brak wsparcia Chrome Android). |
| `SSEReconnectHandler` | Po reconnect dodaje `Last-Event-ID` do nagłówka — NestJS odtwarza zdarzenia z Redis (`XRANGE`). |
| `EventDeduplicator` | Cache LRU ostatnich N event ID — O(1) lookup, eliminuje duplikaty z sieci. |
| `SequenceNumberGuard` | React hook monitorujący numer sekwencji — odrzuca zdarzenia poza kolejnością (cofnięcie w czasie). |
| `EventBatchAccumulator` | Przy przekroczeniu limitu renderowania łączy micro-eventy w jeden zagregowany pakiet — chroni Main Thread. |
| `SSEPayloadSchema` | Schemat Zod dla payloadu SSE: `eventId`, `eventType`, `amount (string)`, `balance (string)`, `timestamp`, `emotionalTier`. |

---

# BACKEND — NESTJS / REDIS

| Komponent | Opis |
|---|---|
| `CircleWebhookController` | Entry point webhooków Circle — weryfikacja ECDSA (P-256/SHA-256) przed parsowaniem danych. Odpowiada HTTP 202. |
| `WebhookIdempotencyGuard` | Guard sprawdzający unikalność event ID w PostgreSQL — semantyka at-most-once, eliminacja podwójnego uznania. |
| `WebhookEnrichmentService` | Wzbogaca payload: identyfikacja użytkownika, obliczenie kwoty, `emotionalTier`, `isFirstInteraction`, zapis do PostgreSQL. |
| `RedisStreamsPublisher` | Publikuje wzbogacony payload do strumienia Redis (`XADD`) dopiero po potwierdzonym commicie DB. |
| `SSEGateway` | Egress SSE — czyta z Redis Consumer Groups (`XREADGROUP`), dostarcza do klientów przez HTTP/2. |
| `EgressRateLimiter` | Fail-safe: przy >20 zdarzeń/s grupuje je w `EventBatch` przed wysłaniem — synchronizacja z `EventBatchAccumulator`. |

---

# GLOBAL PROVIDERS / TOKENS

| Komponent | Opis |
|---|---|
| `GlobalTokenProvider` | Singleton React dystrybuujący wszystkie CSS Custom Properties przez drzewo aplikacji. |
| `DeepTealPaletteTokens` | Zestaw tokenów `--teal-*` jako root CSS variables — umożliwia runtime OKLCH manipulation bez re-renderów React. |
| `StartingStyleAnimator` | Wrapper implementujący `@starting-style` dla komponentów wchodzących w DOM (modals, GenUICard). |

---

# STRONY / ROUTING (KATALOG)

| Strona | Kluczowe komponenty |
|---|---|
| `/` | `NocturnalOpulenceWrapper` + `GlobalTokenProvider` + `DeepTealPaletteTokens` |
| `/creator/[username]` | `FanWall` + `FanAvatarCard` + `ContextPopover` + `GooeyTooltip` |
| `/creator/[username]/tip` | `PaymentModal` (full-page na mobile) + `LiquidInputField` + `WalletBalanceDisplay` |
| `/dashboard` | `FanWall` + `ToastStack` + `BlockchainToast` + `ZAxisRegistry` |
| `/dashboard/analytics` | `TabularStatDisplay` + `FanStatsModal` + `OklchColorTokens` |
| `/dashboard/wallet` | `WalletAddressInput` + `WalletFSM` + `WalletNavIcon` + `ScreenReaderBalanceAnnouncer` |
| `/onboarding` | 5-step FSM sequence + `LiquidInputField` + `FloatingLabel` |
| `/settings` | `NocturnalOpulenceWrapper` + `AmbientLightAdapter` + `ARIALiveRegionManager` |

# MASTER COMPONENT REGISTRY — TipJar+

## I. SVG / VISUAL BACKGROUND SYSTEM

| Komponent | Opis |
|---|---|
| `TealGradientBackground` | Bazowy gradient `#001717→#003737→#001111` — warstwa 1 z-stack |
| `CyberGlowFilter` | SVG `<filter>` z podwójnym `feGaussianBlur` + `feMerge` — reużywalny przez `<use>` |
| `SeamlessSvgPattern` | Silnik kafelkowania `<pattern patternUnits="userSpaceOnUse">` |
| `GlowRect` | `<rect height="1">` zamiast `<line>` — obejście Zero-Dimension Filter Bug |
| `IsometricTransformGroup` | Globalna projekcja izometryczna przez `matrix(0.866, 0.5, -0.866, 0.5, 0, 0)` |
| `CartesianGridPattern` | Zagnieżdżone siatki XY w tokenach `--teal-50/25` |
| `PolarGridPattern` | Koncentryczne okręgi + linie promieniowe — styl sonaru |
| `IsometricGridPlane` | Siatka ortogonalna przekształcona macierzą izometryczną |
| `TopographicWavePattern` | Izolinie z krzywych Beziera — algorytm CONREC, kolor `--purple-300` |
| `PcbSchematicPattern` | Ścieżki PCB pod 45°/90° z glow `--purple-300` |
| `SinusoidalWaveOverlay` | Czyste fale sinusoidalne symulujące przepływ RF/danych |
| `HudCornerFrame` | Ramki narożne z sfazowaniami 45° — warstwa 3 |
| `CrosshairReticle` | Celownik + 4 hash marks + przerywany okrąg `stroke-dasharray="4 8"` w `--gold-400` |
| `HudReadoutLabel` | Odczyt telemetrii w monospacjalnym foncie `--gold-400` |
| `AzimuthScaleRing` | Obwód polarny z podziałką azymutową |
| `FloatingIsometricNode` | Węzeł 3D unoszący się na izometrycznej osi — `--teal-25` |
| `TacticalNavigationScene` | Archetyp A: Corner + PolarGrid + Crosshair |
| `Web3CryptoNodeScene` | Archetyp B: PCB + Topography + Isometric |
| `DatabaseArchitectureScene` | Archetyp C: Corner + CartesianGrid + Schematic |
| `ProceduralSceneComposer` | Silnik kombinatoryczny — losuje `2≤k≤4` klas wg wag dystonansowych |
| `SvgCanvas` | Główny `<svg>` z `viewBox` i `preserveAspectRatio` |
| `SvgDefsRegistry` | Centralne `<defs>` — zapobiega duplikacji filtrów/gradientów w DOM |
| `UseInstanceRenderer` | Renderuje klony przez `<use href="#id">` — DRY instancjonowanie |
| `TilingCloneEngine` | Logika modulo bezszwowego zawijania na `(x-W, y)`, `(x, y-H)`, `(x-W, y-H)` |
| `ZLayerOrchestrator` | Zarządza kolejnością warstw 1–5 wg painter's algorithm |

---

## II. FORM UI SYSTEM
*(źródło: dokument 2 — Dark Mode Form Architecture)*

| Komponent | Opis |
|---|---|
| `TextInputLarge` | Pole tekstowe 56px — floating label, pełna macierz stanów |
| `TextInputStandard` | Pole tekstowe 48px — wariant kompaktowy dla dashboardów |
| `FloatingLabel` | Etykieta: centrum → góra + skala 0.75 przy Focus, kolor `--gold-400` |
| `InputBorderLayer` | Izolowana warstwa 1px border — zmienia kolor per stan |
| `InputInnerShadow` | `inset 0 1px 2px rgba(0,0,0,0.2)` — kompensuje niski kontrast granicy |
| `NeonGlowFocusRing` | Trójwarstwowy `box-shadow`: ostra krawędź + halo 4px + ambient 12px — `--gold-400` |
| `Textarea` | Obszar tekstowy + resize handle + custom scrollbar |
| `TextareaResizeHandle` | Uchwyt resize w `--teal-500` |
| `CustomScrollbar` | `::webkit-scrollbar` — track transparent, thumb `--teal-500→--teal-400` |
| `InputStateDefault` | Tło `--teal-700`, border `--teal-500`, label `--teal-100` |
| `InputStateHover` | Tło `--teal-600`, border `--teal-400`, transition `0.2s ease-in-out` |
| `InputStateFocus` | Border + floating label + caret `--gold-400` + `NeonGlowFocusRing` |
| `InputStateFilled` | Tło `--teal-800`, tekst `--teal-25`, label zmniejszona |
| `InputStateError` | Border + tekst `--error-light (#FFB4AB)`, focus ring czerwony |
| `InputStateSuccess` | Border `--success-light (#69F0AE)` + ikona Check |
| `InputStateDisabled` | Opacity `0.4`, tło `--teal-850`, kursor `not-allowed` |
| `ShakeAnimation` | Mikro-animacja osi X (3–4px) przy submicie błędnego formularza |
| `Checkbox` | 20×20px, hit area 44×44px. Checked: tło `--gold-400`, ptaszek `--teal-700` |
| `CheckboxCheckmark` | SVG vector checkmark `--teal-700` na złotym tle, kontrast >9:1 |
| `CheckboxFocusRing` | Złota poświata z 2px offsetem |
| `RadioButton` | Koło 20×20px. Checked: border + kropka 10px `--gold-400` |
| `ToggleSwitch` | Track 36×20px, thumb 16×16px. Off: `--teal-850`. On: `--purple-300` |
| `ToggleThumb` | Suwak z animacją elastyczności — poziome rozciąganie podczas ruchu |
| `SelectTrigger` | Wygląd Input + ikona Chevron Down. Focus otwiera listę ze złotą poświatą |
| `DropdownMenu` | Tło `--teal-700`, border `--teal-500`, cień `0 8px 24px rgba(0,0,0,0.5)` |
| `DropdownItem` | 48px. Hover: `--teal-600`. Selected: tekst `--gold-400`, tło `--teal-850` + Check |
| `DropdownElevationLayer` | Zasada „światło jako elewacja" — warstwa 0→1→2 przez jasność tła |
| `CssTokensProvider` | `:root` Custom Properties — surface, border, text, focus, error, success |
| `AutofillOverride` | `:-webkit-autofill` wymuszający `--teal-800` przez `box-shadow inset 1000px` |
| `ContainerQueryAdapter` | Przełącza 56px→48px i floating→placeholder w wąskich kontenerach |
| `AccessibilityAuditToken` | Tokeny z udokumentowanymi ratio WCAG per para kolorów |
| `FocusVisibleManager` | `focus-visible` vs `focus` — ukrywa ring dla myszy, pokazuje dla klawiatury |

---

## III. CSS HOUDINI / PAINT WORKLETS
*(źródło: dokument 3 — CSS Houdini and Tangible UI)*

| Komponent | Opis |
|---|---|
| `PaintWorkletRegistry` | Centralny `registerPaint('name', class)` — silnik inicjalizacji Workletów |
| `FrostWorklet` | Proceduralny szum kryształów lodu na fasetowanej bryle — reaguje na `--temperature` |
| `LiquidWellWorklet` | Dynamiczny gradient radialny podążający za kursorem (`--mouse-x/--mouse-y`) |
| `ThermodynamicGlowWorklet` | Plazma termodynamiczna między `border-box` a `outline` — `--heat-intensity` |
| `PolygonTracerWorklet` | Obwódka wewnątrz `clip-path` wg `--path` + laserowy impuls wzdłuż ramki |
| `RadialEdgeRevealWorklet` | Maska pulsującego przenikania fiolet→złoto na obwodzie awatara |
| `RefractionGlassWorklet` | Prawo Snella `refract(e1,e2,k)` dla R/G/B osobno — fizyczna soczewka w `border-box` |
| `RippleEmitterWorklet` | Rozszerzający się okrąg tętna w miejscu tapnięcia — bez modyfikacji DOM |
| `PeristalticFluidWorklet` | Krzywe Béziera suwaka toggle wg `Pointer Velocity` — efekt lepkiego pęcherza |
| `StaticEinkWorklet` | Proceduralny szum e-papierowy — jednorazowy, osadzony w VRAM |
| `OklabGradientWorklet` | Interpolacja w przestrzeni Oklab + dynamiczna re-kalkulacja APCA |
| `DoubleWrapper` | Wzorzec dwóch warstw DOM: zewnętrzna `filter: drop-shadow` + wewnętrzna `clip-path` |
| `DropShadowLayer` | Zewnętrzna kapsuła — `filter: drop-shadow()` śledzący kanał alfa geometrii |
| `ClipPathLayer` | Wewnętrzna kapsuła — `clip-path: polygon()` bez utraty outer shadow |
| `CompositorPinLayer` | Izoluje animację na warstwie GPU — eliminuje Layout Thrashing |
| `ChamferedCard` | `corner-shape: chamfer` + `border-radius: 32px` — fasetowane ścięcia 45° |
| `ChamferedAuthModal` | Modal autoryzacji z `corner-shape: chamfer` + `border-radius: 24px` |
| `ParallelogramCard` | `clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%)` — estetyka Web3/telemetrii |
| `OrganicInputVoid` | Input z organicznym `clip-path` nieregularnym — bez widocznego border |
| `PillClipContainer` | Kontener toggle `clip-path: inset(0 round 50%)` |
| `GlitchPolygonPanel` | Nieregularny `clip-path` animowany `steps(3)` — brutalizm/cybercore |
| `NeonGlowBorder` | `border-image: paint(worklet)` z trójwarstwowym `box-shadow` |
| `InsetVoidShadow` | `inset 0 8px 16px rgba(0,0,0,0.9)` + `inset 0 -2px 4px rgba(255,255,255,0.1)` |
| `GlassInsetHighlight` | `inset 0 1px 1px rgba(255,255,255,0.8)` + `inset 0 -1px 2px rgba(0,0,0,0.5)` |
| `ElevationRiseShadow` | `box-shadow: 0 24px 48px` + `transform: translateY(-8px)` — lewitacja karty |
| `ThermodynamicFocusRing` | `outline: 2px solid transparent` + `outline-offset: 6px` — bez Layout Thrashing |
| `PrimaryCtaButton` | `transform: scale(0.95)` przy Pointer Down + `inset 0px 8px 16px rgba(0,0,0,0.6)` |
| `HapticRippleTrigger` | Sprzęga `RippleEmitterWorklet` z Apple Core Haptics przy zwolnieniu |
| `PeristalticToggle` | Toggle z animacją lepkiego pęcherza — krzywe Béziera pękają przy środku toru |
| `PointerVelocityTracker` | Hook mierzący prędkość wskaźnika — przekazuje `--pointer-velocity` do Workletów |
| `OklabColorInterpolator` | Zamiana interpolacji sRGB→Oklab — eliminuje „martwe tony" w gradientach |
| `ApcaContrastCalculator` | Algorytm APCA (WCAG 3) jako stałe WGSL — dynamiczna re-kalkulacja kontrastu |
| `OledEnergyOptimizer` | Ogranicza subpiksel `C_b` — faworyzuje `--gold-400` i `--teal` na OLED |
| `RealTimeContrastAdapter` | Przyciemnia próg alfa gdy tło zagraża czytelności złotych akcentów |
| `VoronoiHeatShader` | Compute Shader WGSL — algorytm Woronoja dla `ThermodynamicGlowWorklet` |
| `SnellRefractionShader` | Shader WGSL — trzykrotna `refract()` dla R/G/B (aberracja chromatyczna) |
| `AlphaCompositor` | Sprzętowe compositing kanałem alfa — wycięcie pikseli zamiast dodawania cienia |
| `FBOTextureMapper` | Odczyt Frame Buffer Object — mapuje piksele tła na `border-box` dla refrakcji |

---

## IV. ENERGOOSZCZĘDNE STYLE OBRAMOWAŃ
*(źródło: dokument 4 — Energy-Efficient CSS Borders)*

| Komponent | Opis |
|---|---|
| `SubpixelEmeraldBorder` | `border: 1px solid #00FF00` na czarnym tle — 142.8 cd/A, ~25mW |
| `GhostMaskBorder` | `mask-image: radial-gradient` — iluzja zanikania bez `backdrop-filter` |
| `ChromaShiftOffset` | `::after` przesunięty `transform: translate()` — cień bez Repaint |
| `InsetDepthBorder` | `box-shadow: inset` z `blur-radius: 0` — twardy pas bez konwolucji |
| `SplitRedGreenBorder` | `border-left: #FF0000` + `border-right: #00FF00` — zero subpiksela niebieskiego |
| `ConicRotatorBorder` | `@property --angle` + `conic-gradient` + `mask-composite: exclude` — GPU interpolacja |
| `HardwarePulseBorder` | `will-change: opacity` na pseudoelemencie — zero Repaint, kanał alfa |
| `ScaleBreatheBorder` | `transform: scale(1.05)` + `opacity` — 100% Compositor Thread |
| `ScanningLightBeam` | Gradient w `overflow: hidden` + `translateX()` — efekt skanera laserowego |
| `HoverRevealBorder` | Obramowanie na `translateZ(-1)` odsłaniane `translateX()` przy hover |
| `ProceduralDashBorder` | `CSS.paintWorklet` — precyzyjna przerywana kratka inżynieryjna |
| `MarchingAntsBorder` | SVG `stroke-dashoffset` animowany — maszerujące kreski jak w CAD |
| `DynamicLaserSvgTrace` | Ścieżka SVG aktywowana przez `:hover/:focus` — rozwijanie po konturach |
| `ConstrainedTurbulenceBorder` | `feTurbulence` ograniczony do 1px pseudoelementu — wyłącznie Chrome |
| `ChromaTrackedEdgeGlow` | Gradient pod maską śledzący kursor przez `--mouse-x/--mouse-y` |
| `MixBlendDifferenceBorder` | `mix-blend-mode: difference` — odwrócenie barw tła, obliczenia w ALU GPU |
| `StaticEinkNoiseBorder` | Szum SVG Base64 w `border-image` — jednorazowy render, zero network |
| `PolygonGlitchBorder` | `clip-path: polygon()` + `steps(n)` — szarpane cięcia bez Layout Thrashing |
| `DualSteppedGradientBorder` | `linear-gradient` z ostrymi `color-stops` — zero ditheringu GPU |
| `ChamferedCornerBorder` | `corner-shape: chamfer` Houdini — ścięcia na poziomie kompilatora CSS |
| `CompositorLayerPin` | `will-change: transform` / `translateZ(0)` — osobna warstwa VRAM |
| `BorderAnimationGuard` | HOC blokujący animację `border-width` i `box-shadow` — wymusza `opacity`/`scale` |
| `PseudoElementShadowLayer` | `::before/::after` jako izolowana warstwa cienia zamiast `box-shadow` na elemencie |
| `WillChangeManager` | Dodaje `will-change` przed animacją, usuwa po — zapobiega nadmiernemu promowaniu |
| `OpacityTransitionOnly` | Wrapper wymuszający animację wyłącznie przez `opacity` |
| `TypedOMPropertyBridge` | Typed OM — eliminuje konwersję string→number podczas animacji |
| `BackdropBlurWarning` | Dev-only — wykrywa `backdrop-filter: blur()` nad animowanym tłem |
| `ReflowTriggerDetector` | Dev-only — wykrywa animację `border-width`/`box-shadow` w `:hover` |
| `AlphaGradientStackAudit` | Dev-only — skanuje wielowarstwowe `rgba()` gradienty (~500mW Firefox) |
| `BlueDominanceAudit` | Dev-only — wykrywa `#0000FF`/biel na dużych powierzchniach |
| `OledSafeColorPalette` | Tokeny faworyzujące zieleń/złoto/czerwień — unika czystego błękitu i bieli |
| `DarkModeBaseTokens` | `--surface-page: #000000` / `--surface-deep: #001F1F` — minimalna luminancja |
| `EnergyBudgetTokens` | Tokeny z udokumentowanym kosztem energetycznym per komponent |

---

## V. MODALE / COMPOSITING
*(źródło: dokument 5 — TipJar+ Architectural Blueprint)*

| Komponent | Opis |
|---|---|
| `PaymentModal` | Modal USDC. `z-index: 400`, `@starting-style` scale `0.95→1.0`, 300–400ms |
| `ConfirmationModal` | Identyczna architektura co `PaymentModal` — slot dla akcji konta |
| `EducationModal` | Modal informacyjny — statyczny rendering, bez finansowych listenerów |
| `PrismaticBorder` | Pseudoelement gradient `teal-700/gold-400/purple-300` + `mask-composite: exclude` |
| `LiquidGlassBackdrop` | `backdrop-blur-2xl` + `backdrop-saturate-200` + SVG `feDisplacementMap` |
| `LiquidSnapCurve` | Token `cubic-bezier` — szybka akceleracja + twarde tłumienie dla modali |

---

## VI. FAN WALL / GRID

| Komponent | Opis |
|---|---|
| `FanWall` | Główny kontener Bento Grid — asymetryczny, matematycznie proporcjonalny |
| `FanAvatarCard` | Karta awatara fana. Bazowa warstwa `Z-1`, awansuje do Emissive Neon Glow dla Top 3 |
| `SpatialAnomalyGlow` | Emisyjny glow Top 3 — obliczany w OKLCH (`gold/silver/bronze`) |
| `FanStatsModal` | Modal statystyk — `font-feature-settings: "tnum"` |
| `TabularStatDisplay` | Dane finansowe. `tnum` + `text-box: trim-both cap alphabetic` — eliminacja Financial Jitter |
| `OklchColorTokens` | Tokeny OKLCH — perceptualnie jednolite obliczanie luminancji |

---

## VII. TOOLTIPS / POPOVERS / DROPDOWN

| Komponent | Opis |
|---|---|
| `GooeyTooltip` | Click-activated. `z-index: 500`. SVG `feColorMatrix` — biologiczna morfogeneza alfa |
| `ContextPopover` | Dynamiczny slot treści. `calc-size()` + `interpolate-size: allow-keywords` |
| `CalcSizeInterpolator` | Eliminuje `ResizeObserver` — animacja `height: auto` bez JS |
| `AnchoredDropdown` | CSS Anchor Positioning API (`anchor-name`) — zero JS przy scroll/resize |
| `PillowMenuItem` | Podwójny `inset` shadow: jasny lewy-górny + ciemny prawy-dolny — Pillow Embossing |
| `DeepNavigation` | Multi-level breadcrumb na `AnchoredDropdown` — bez kumulacji kar wydajnościowych |

---

## VIII. BIOMIMETYCZNE FORMULARZE

| Komponent | Opis |
|---|---|
| `LiquidInputField` | „Oddychająca studnia". SVG `feDisplacementMap`. Stany: Idle/Focus/Error |
| `FloatingLabel` | `150ms ease-in-out` — translacja + scale down + `font-weight` przy focus |
| `FrozenGlassErrorState` | Efekt zamarzającego lodu `#FFB4AB` — zapobiega chromostereopsji na tle teal |
| `WalletAddressInput` | `LiquidInputField` + walidacja kryptograficznego adresu blockchain |
| `NuclearResonanceGlow` | Token focus — emisyjny glow `purple-300` przez `feDisplacementMap` |

---

## IX. TOAST / Z-AXIS / AMBIENT

| Komponent | Opis |
|---|---|
| `BlockchainToast` | Webhook Circle. `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — overshoot sprężyny. `z-index: 300` |
| `ToastStack` | Starsze toasty cofane w Z przez `scale: 0.95` + `translateZ` |
| `ZAxisRegistry` | Globalny rejestr Zustand — dystrybuuje warstwy 500/400/300, eliminuje z-index wars |
| `ReversalToast` | Błąd transakcji — `#FFB4AB` + `aria-live="assertive"`, bez kradzieży focusu |
| `FirstInteractionCallout` | Jednorazowa animacja celebrująca pierwszą interakcję fana |
| `EmotionalTierBadge` | Wygląd toastu wg `emotionalTier`: STANDARD / FRENZY / WHALE |
| `AmbientLightAdapter` | React Context — `AmbientLightSensor API` (lux) → globalny kontekst |
| `NocturnalOpulenceWrapper` | HOC — przelicza tokeny OKLCH wg lux. Fallback: `@media (prefers-color-scheme: dark)` |
| `ShadowMaestroProvider` | „Chameleon Shadows" — `box-shadow` próbkujący kolor tła (radiosity) |
| `CascadingLuminanceScaler` | System dynamicznych zmiennych OKLCH napędzany danymi lux |
| `GenUICard` | Karta Bento generowana LLM→MCP→React. Dziedziczy Z-Axis z Zustand. Wejście `@starting-style` |

---

## X. FINITE STATE MACHINE / WALLET

| Komponent | Opis |
|---|---|
| `WalletFSM` | XState — 5 wzajemnie wykluczających się stanów, eliminuje niemożliwe kombinacje UI |
| `WalletNavIcon` | Wizualny proxy stanu `WalletFSM` w navbarze |
| `WalletStateIdle` | Bazowy. `teal-900`, zero animacji |
| `WalletStatePending` | Attestacja blockchain. Glow `purple-300` + `aria-busy="true"` |
| `WalletStateActive` | Zatwierdzony depozyt. Popup 3–5s + `aria-live="polite"` |
| `WalletStateFrenzy` | >5 webhooków/10s. Blokuje animacje stroboskopowe, debounce screen readera |
| `WalletStateWhale` | Wysoka wartość. Persystentny `gold-400` + `aria-live="assertive"` |
| `WalletBalanceDisplay` | Saldo USDC jako String (nie Float) — ochrona przed błędami IEEE 754, `tnum` |
| `ARIALiveRegionManager` | Wyłącza `aria-live` podczas Frenzy — zapobiega chaotycznej syntezie mowy |
| `ScreenReaderBalanceAnnouncer` | Element `sr-only` — ogłasza ostateczne saldo po zakończeniu Frenzy |

---

## XI. SSE / REAL-TIME INFRASTRUCTURE

| Komponent | Opis |
|---|---|
| `SSEConnectionProvider` | Provider SSE + Leader Election przez `BroadcastChannel API` |
| `LeaderElectionManager` | Jedna zakładka = jedno połączenie HTTP/2. Automatyczna re-elekcja przy zamknięciu |
| `BroadcastChannelBridge` | Dane SSE od lidera do followerów — zamiast `SharedWorker` (brak Chrome Android) |
| `SSEReconnectHandler` | Po reconnect: `Last-Event-ID` → NestJS odtwarza zdarzenia z Redis `XRANGE` |
| `EventDeduplicator` | Cache LRU event ID — O(1), eliminuje duplikaty z sieci |
| `SequenceNumberGuard` | Hook monitorujący numer sekwencji — odrzuca zdarzenia poza kolejnością |
| `EventBatchAccumulator` | Łączy micro-eventy w pakiet przy przekroczeniu limitu — chroni Main Thread |
| `SSEPayloadSchema` | Schemat Zod: `eventId`, `eventType`, `amount (string)`, `balance (string)`, `timestamp`, `emotionalTier` |

---

## XII. BACKEND — NESTJS / REDIS

| Komponent | Opis |
|---|---|
| `CircleWebhookController` | Entry point — weryfikacja ECDSA (P-256/SHA-256) przed parsowaniem. Odpowiada HTTP 202 |
| `WebhookIdempotencyGuard` | Unikalność event ID w PostgreSQL — at-most-once, eliminacja podwójnego uznania |
| `WebhookEnrichmentService` | Identyfikacja użytkownika, `emotionalTier`, `isFirstInteraction`, zapis PostgreSQL |
| `RedisStreamsPublisher` | `XADD` do strumienia Redis dopiero po potwierdzonym commicie DB |
| `SSEGateway` | Egress SSE — `XREADGROUP` z Redis Consumer Groups, HTTP/2 |
| `EgressRateLimiter` | >20 zdarzeń/s → `EventBatch` — synchronizacja z `EventBatchAccumulator` |

---

## XIII. GLOBAL PROVIDERS / TOKENS

| Komponent | Opis |
|---|---|
| `GlobalTokenProvider` | Singleton React — dystrybuuje wszystkie CSS Custom Properties przez drzewo |
| `DeepTealPaletteTokens` | Root CSS variables `--teal-*` — runtime OKLCH manipulation bez re-renderów React |
| `StartingStyleAnimator` | Wrapper `@starting-style` dla komponentów wchodzących w DOM |
| `TealColorScale` | Tokeny `--teal-25→--teal-900` jako Tailwind CSS variables / TS constants |
| `GoldColorScale` | Tokeny `--gold-50→--gold-900` |
| `PurpleColorScale` | Tokeny `--purple-100→--purple-500` |
| `ColorTokenProvider` | React Context dostarczający palety tokenom komponentów SVG |

---

## KATALOG STRON

| Strona | Kluczowe komponenty |
|---|---|
| `/` | `TacticalNavigationScene` + `NocturnalOpulenceWrapper` + `GlobalTokenProvider` + `AnimatedHudOverlay` |
| `/creator/[username]` | `FanWall` + `FanAvatarCard` + `SpatialAnomalyGlow` + `ContextPopover` + `GooeyTooltip` |
| `/creator/[username]/tip` | `PaymentModal` (full-page mobile) + `LiquidInputField` + `WalletBalanceDisplay` + `PrismaticBorder` |
| `/dashboard` | `DatabaseArchitectureScene` + `ToastStack` + `BlockchainToast` + `ZAxisRegistry` + `GenUICard` |
| `/dashboard/analytics` | `TabularStatDisplay` + `FanStatsModal` + `OklchColorTokens` |
| `/dashboard/wallet` | `WalletAddressInput` + `WalletFSM` (wszystkie stany) + `ScreenReaderBalanceAnnouncer` |
| `/onboarding` | `IsometricGridPlane` tło + 5-step FSM + `LiquidInputField` + `ChamferedAuthModal` |
| `/settings` | `DatabaseArchitectureScene` statyczny + `PeristalticToggle` + `ARIALiveRegionManager` |
| `/login` / `/register` | `ChamferedAuthModal` + `FrostWorklet` + `NeonGlowFocusRing` + `GoldFocusRing` |
| `/404` | `CrosshairReticle` + `HudReadoutLabel "404 TARGET_NOT_FOUND"` + `GlitchPolygonPanel` |
| Dev / Storybook | `BackdropBlurWarning` + `ReflowTriggerDetector` + `AlphaGradientStackAudit` + `ContrastBadge` |


# WARSTWA 1 — CO JEST REALNIE UDOKUMENTOWANE I DZIAŁA

## ✅ CSS — właściwości potwierdzone przez MDN / W3C / Chrome

| Komponent/Technika | Status | Uwaga |
|---|---|---|
| `box-shadow: inset` | ✅ Działa | Standard, wszystkie przeglądarki |
| `mask-composite: exclude` | ✅ Działa | Chrome/Safari. Firefox — częściowe wsparcie |
| `filter: drop-shadow()` | ✅ Działa | Standard, wszystkie przeglądarki |
| `clip-path: polygon()` | ✅ Działa | Standard, wszystkie przeglądarki |
| `will-change: transform` | ✅ Działa | Standard, wszystkie przeglądarki |
| `transform: translateZ(0)` | ✅ Działa | Compositor layer promotion — potwierdzone |
| `font-feature-settings: "tnum"` | ✅ Działa | Standard, szeroke wsparcie |
| `@property` (custom property typing) | ✅ Działa | Chrome/Edge. Firefox od v128 |
| `conic-gradient` | ✅ Działa | Standard, wszystkie nowoczesne przeglądarki |
| `stroke-dashoffset` animacja SVG | ✅ Działa | Standard SVG |
| `feDisplacementMap` | ✅ Działa | Standard SVG Filter, wszystkie przeglądarki |
| `feColorMatrix` | ✅ Działa | Standard SVG Filter, wszystkie przeglądarki |
| `feTurbulence` | ✅ Działa | Standard — ale **wydajność krytyczna** w Firefox/Safari |
| `mix-blend-mode: difference` | ✅ Działa | Standard, wszystkie przeglądarki |
| `opacity` animacja na Compositor Thread | ✅ Działa | Potwierdzone przez web.dev |
| `transform` animacja na Compositor Thread | ✅ Działa | Potwierdzone przez web.dev |
| `BroadcastChannel API` | ✅ Działa | Potwierdzone — Chrome Android wspiera |
| `SSE / EventSource` | ✅ Działa | Standard HTTP/1.1 i HTTP/2 |
| `Redis XADD / XRANGE / XREADGROUP` | ✅ Działa | Standard Redis Streams |
| `ECDSA P-256/SHA-256` | ✅ Działa | Standard kryptograficzny |
| `Zod schema validation` | ✅ Działa | Biblioteka JS — potwierdzona |
| `XState` FSM | ✅ Działa | Biblioteka — potwierdzona |
| `Zustand` global store | ✅ Działa | Biblioteka — potwierdzona |
| `aria-live`, `aria-busy` | ✅ Działa | Standard ARIA |
| `@starting-style` | ✅ Działa | Chrome 117+, Firefox 129+. Safari — brak wsparcia (2025) |
| `calc-size()` | ✅ Działa | Chrome 129+. Firefox/Safari — **brak wsparcia** (2025) |
| `text-box: trim-both` | ✅ Działa | Chrome 123+. Firefox/Safari — **brak wsparcia** |
| `interpolate-size: allow-keywords` | ✅ Działa | Chrome 129+. Inne — **brak wsparcia** |
| `CSS Anchor Positioning` | ✅ Działa | Chrome 125+. Firefox/Safari — **brak wsparcia** |
| `CSS Paint API (Houdini Worklet)` | ✅ Działa | Chrome/Edge. Firefox/Safari — **brak wsparcia** |

---

# WARSTWA 2 — CO ISTNIEJE ALE Z ISTOTNYMI ZASTRZEŻENIAMI

| Technika | Status | Rzeczywisty problem |
|---|---|---|
| `corner-shape: chamfer` | ⚠️ Eksperymentalne | Tylko Chrome z flagą. Dokument przedstawia jako gotowe — [Inference] co do produkcyjnego wsparcia |
| `backdrop-filter: blur()` | ⚠️ Działa ale kosztownie | Dokumenty słusznie ostrzegają. GPU Overdraw na mobile to realny problem potwierdzony przez deweloperów Chrome |
| `AmbientLightSensor API` | ⚠️ Ograniczone | Zablokowane domyślnie w Chrome od 2018 z powodów prywatności. Firefox nie implementuje. Dokument traktuje jako realny feature — to [Speculation] w kontekście produkcyjnym |
| `WebGPU / WGSL shaders` | ⚠️ Wczesna produkcja | Chrome 113+. Safari Technology Preview. Firefox — eksperymentalny. Dokument opisuje jako standard — [Inference] |
| Oklab w Paint Worklet | ⚠️ Częściowe | `oklch()` w CSS działa (Chrome 111+). Natywna matematyka Oklab w Worklecie wymaga ręcznej implementacji macierzy — dokument pomija ten detal |
| `feDisplacementMap` per-frame | ⚠️ Kosztowne | Działa, ale dokument 5 sam przyznaje ryzyko thermal throttling na mobile — sprzeczność z promowaniem tej techniki jako standardu |

---

# WARSTWA 3 — CO JEST FIKCJĄ LUB NIEMOŻLIWE DO WERYFIKACJI

| Twierdzenie z dokumentów | Ocena | Wyjaśnienie |
|---|---|---|
| „120 FPS gwarantowane przez Paint Worklet" | ❌ [Speculation] | Paint Worklet działa na osobnym wątku ale nie gwarantuje [Unverified] 120 FPS — zależy od złożoności kodu Workletu i sprzętu |
| „Poziom ufności: Absolutny" (wielokrotnie) | ❌ Fałszywe twierdzenie | Żaden system techniczny nie ma absolutnej pewności. To retoryka marketingowa w dokumencie technicznym |
| Konkretne wartości poboru mocy (25mW, 200mW, 500mW) | ⚠️ [Inference] | Dokument cytuje źródła (Stanford, web.dev) ale wartości są z 2010–2015 i dotyczą konkretnych urządzeń ARM. Nieaktualne i niereprezentatywne dla 2026 |
| Parametry APCA (`normBGExp: 0.56` itd.) | ✅ Częściowo | Parametry APCA są realne i udokumentowane. Jednak twierdzenie o ich implementacji w Paint Worklet jako „stałych WGSL" — [Inference] bez kodu źródłowego |
| `Prawo Snella w CSS` (`refract(e1,e2,k)` w WGSL) | ⚠️ [Inference] | Funkcja `refract()` istnieje w WGSL. Jednak użycie jej do refrakcji CSS border jako opisano — to eksperyment, nie production-ready technika |
| „Algorytm Woronoja w VRAM dla focus ring" | ⚠️ [Speculation] | Technicznie możliwe w WebGPU Compute Shader, ale dla focus ringa to rażące over-engineering bez praktycznego uzasadnienia |
| `GenUICard` generowane przez LLM→MCP→React | ⚠️ [Inference] | Architektura opisana konceptualnie. Brak implementacji, brak weryfikacji bezpieczeństwa dla dynamicznego wstrzykiwania komponentów React z LLM |
| „Peristaltic Fluid" — fizyka lepkiego pęcherza | ⚠️ [Inference] | Krzywe Béziera w Worklecie są realne. „Fizyka nieniutonowska" — to opis estetyczny, nie techniczna implementacja fizyki płynów |
| „Biologiczna morfogeneza" w GooeyTooltip | ✅ Efekt realny, nazwa [Speculation] | Efekt Gooey przez `feColorMatrix` + `feGaussianBlur` jest realny i udokumentowany. Nazwa „morfogeneza" to metafora marketingowa |
| Tabela wydajności subpikseli OLED (cd/A) | ✅ Dane realne | Wartości (142.8 / 79.9 / 21.9 cd/A) są zgodne z literaturą naukową OLED. Jedyne w pełni zweryfikowane dane fizykalne w dokumentach |
| „Chromostereopsja" jako uzasadnienie koloru błędu | ✅ Zjawisko realne | Chromostereopsja jest udokumentowanym zjawiskiem optycznym. Zastosowanie `#FFB4AB` jako rozwiązanie — pragmatyczne i poprawne |
| „Financial Jitter" + `tnum` | ✅ Problem realny, rozwiązanie realne | `font-feature-settings: "tnum"` jest standardową techniką dla UI finansowych. Problem opisany precyzyjnie |

---

# PODSUMOWANIE OCENY

# 🟢 Solidne fundamenty (wdrażalne teraz)
Cały system tokenów CSS, architektura formularzy (stany, floating label, kolory WCAG), `tnum` + `text-box`, FSM z XState, SSE + Redis + BroadcastChannel, ECDSA webhook validation, Zustand z-index registry, Gooey effect przez SVG filters, energooszczędne techniki (opacity/transform na Compositor Thread).

# 🟡 Wdrażalne tylko w Chrome (2026)
`@starting-style`, `calc-size()`, `text-box: trim-both`, CSS Anchor Positioning, CSS Paint API, `corner-shape: chamfer` (z flagą), `interpolate-size`.

# 🔴 Nie wdrażać produkcyjnie bez badań
`AmbientLightSensor API`, WebGPU shaders dla UI efektów, `feDisplacementMap` per-frame na mobile, `LiquidGlassBackdrop` z `blur-2xl` na animowanym tle, `GenUICard` z LLM bez walidacji bezpieczeństwa.

