import React, { useMemo, useState, useCallback } from "react";

// === Types ===
export type GradientType = "linear" | "radial";

export interface GlassConfig {
  buttonText: string;
  maxWidth: number;
  radius: number;
  height: number;
  glass: number;
  blur: number;
  gradientStrength: number;
  edgeSoftness: number;
  baseHex: string;
  gradFromHex: string;
  gradToHex: string;
  gradAngle: number;
  gradType: GradientType;
  borderAlpha: number;
  innerHighlightAlpha: number;
  shadowStrength: number;
  // Typography
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  textColor: string;
  // Interaction
  hoverBrightness: number;
  activeScale: number;
  // Button Gradient
  btnBaseHex: string;
  btnGradFromHex: string;
  btnGradToHex: string;
  btnGradAngle: number;
  btnGradType: GradientType;
  btnGradientStrength: number;
}

export interface GlassComputedVars {
  bg: string;
  borderColor: string;
  highlightTop: string;
  highlightCut: number;
  edge: string;
  innerDark: string;
  shadowY: number;
  shadowBlur: number;
  shadowColor: string;
  insetHighlight: string;
  maxWidth: number;
  height: number;
  radius: number;
  blur: number;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  textColor: string;
  hoverBrightness: number;
  activeScale: number;
}

export interface UseGlassButtonOptions {
  isHovered?: boolean;
  isPressed?: boolean;
  showPreviewBg?: boolean;
}

// === Presets ===
const PRESETS: Record<string, GlassConfig> = {
  "TipJar Default": {
    buttonText: "Get Started", maxWidth: 360, radius: 18, height: 56, glass: 0.35, blur: 12, 
    gradientStrength: 0.15, edgeSoftness: 0.45, baseHex: "#003737", gradFromHex: "#0a4a4a", 
    gradToHex: "#001f1f", gradAngle: 180, gradType: "linear", borderAlpha: 0.12, 
    innerHighlightAlpha: 0.05, shadowStrength: 0.4, fontSize: 15, fontWeight: 500, letterSpacing: 0.01,
    textColor: "rgba(255, 255, 255, 0.9)", hoverBrightness: 1.08, activeScale: 0.96,
    btnBaseHex: "#388f8f", btnGradFromHex: "#114a4a", btnGradToHex: "#0b4747", 
    btnGradAngle: 180, btnGradType: "linear", btnGradientStrength: 0.15
  },
  "Frosted Gold": {
    buttonText: "Subscribe", maxWidth: 320, radius: 28, height: 64, glass: 0.40, blur: 16, 
    gradientStrength: 0.20, edgeSoftness: 0.65, baseHex: "#4a3500", gradFromHex: "#2b1f00", 
    gradToHex: "#140e00", gradAngle: 135, gradType: "linear", borderAlpha: 0.25, 
    innerHighlightAlpha: 0.08, shadowStrength: 0.6, fontSize: 16, fontWeight: 600, letterSpacing: 0.02,
    textColor: "rgba(255, 255, 255, 0.95)", hoverBrightness: 1.12, activeScale: 0.95,
    btnBaseHex: "#b8860b", btnGradFromHex: "#daa520", btnGradToHex: "#8b6508", 
    btnGradAngle: 135, btnGradType: "linear", btnGradientStrength: 0.20
  },
  "Cyber Purple": {
    buttonText: "Connect Wallet", maxWidth: 400, radius: 12, height: 50, glass: 0.50, blur: 8, 
    gradientStrength: 0.25, edgeSoftness: 0.30, baseHex: "#1a0033", gradFromHex: "#0d001a", 
    gradToHex: "#05000a", gradAngle: 90, gradType: "radial", borderAlpha: 0.15, 
    innerHighlightAlpha: 0.06, shadowStrength: 0.5, fontSize: 14, fontWeight: 500, letterSpacing: 0.005,
    textColor: "rgba(255, 255, 255, 0.85)", hoverBrightness: 1.15, activeScale: 0.97,
    btnBaseHex: "#4b0082", btnGradFromHex: "#8a2be2", btnGradToHex: "#28004d", 
    btnGradAngle: 90, btnGradType: "radial", btnGradientStrength: 0.25
  }
};

// === Math & Helpers ===
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "").trim();
  if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return { r: 0, g: 0, b: 0 };
  }
  const full = cleanHex.length === 3 ? cleanHex.split("").map((c) => c + c).join("") : cleanHex;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function mix(hexA: string, hexB: string, t: number) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const tt = clamp(t, 0, 1);
  const mixR = Math.round(a.r + (b.r - a.r) * tt);
  const mixG = Math.round(a.g + (b.g - a.g) * tt);
  const mixB = Math.round(a.b + (b.b - a.b) * tt); 
  return `rgb(${mixR} ${mixG} ${mixB})`;
}

function rgbaFromHex(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

// === Pure Function: Computes all CSS/Style variables from Config ===
function computeGlassVars(config: GlassConfig): GlassComputedVars {
  const bg = rgbaFromHex(config.btnBaseHex, config.glass);
  const borderColor = `rgba(255,255,255,${clamp(config.borderAlpha, 0, 0.35).toFixed(2)})`;
  const highlightTop = clamp(config.innerHighlightAlpha + config.edgeSoftness * 0.06, 0, 0.18).toFixed(2);
  const highlightCut = Math.round(clamp(38 + config.edgeSoftness * 20, 35, 65));
  const edge = clamp(0.08 + config.edgeSoftness * 0.08, 0.06, 0.2).toFixed(2);
  const innerDark = clamp(0.18 + (1 - config.edgeSoftness) * 0.18, 0.12, 0.4).toFixed(2);
  const shadowA = clamp(config.shadowStrength, 0, 1);
  const shadowY = Math.round(10 + config.edgeSoftness * 10);
  const shadowBlur = Math.round(24 + config.edgeSoftness * 22);
  const shadowColor = (0.35 * shadowA).toFixed(2);
  const insetHighlight = (0.04 + config.edgeSoftness * 0.06).toFixed(2);

  return {
    bg, borderColor, highlightTop, highlightCut, edge, innerDark, 
    shadowY, shadowBlur, shadowColor, insetHighlight,
    
    // Passthrough
    maxWidth: config.maxWidth,
    height: config.height,
    radius: config.radius,
    blur: config.blur,
    fontSize: config.fontSize,
    fontWeight: config.fontWeight,
    letterSpacing: config.letterSpacing,
    textColor: config.textColor,
    hoverBrightness: config.hoverBrightness,
    activeScale: config.activeScale
  };
}

// === Custom Hook for Glass Button Logic ===
function useGlassButton(config: GlassConfig, options: UseGlassButtonOptions = {}) {
  const { isHovered = false, isPressed = false, showPreviewBg = true } = options;

  // Background calculation for preview container background
  const previewBg = useMemo(() => {
    const strength = clamp(config.gradientStrength, 0, 0.3);
    if (config.gradType === "radial") {
      return `radial-gradient(120% 120% at 50% 40%, ${mix(
        config.baseHex, config.gradFromHex, strength * 3
      )} 0%, ${mix(config.baseHex, config.gradToHex, strength * 3)} 55%, ${config.gradToHex} 100%)`;
    }
    return `linear-gradient(${config.gradAngle}deg, ${config.gradFromHex} 0%, ${config.baseHex} 45%, ${config.gradToHex} 100%)`;
  }, [config.baseHex, config.gradFromHex, config.gradToHex, config.gradAngle, config.gradType, config.gradientStrength]);

  // Background calculation for the button itself (using independent button variables!)
  const buttonBg = useMemo(() => {
    const alpha = config.glass;
    if (config.btnGradType === "radial") {
      return `radial-gradient(circle at 50% 50%, ${rgbaFromHex(config.btnGradFromHex, alpha)} 0%, ${rgbaFromHex(config.btnBaseHex, alpha)} 50%, ${rgbaFromHex(config.btnGradToHex, alpha)} 100%)`;
    }
    return `linear-gradient(${config.btnGradAngle}deg, ${rgbaFromHex(config.btnGradFromHex, alpha)} 0%, ${rgbaFromHex(config.btnBaseHex, alpha)} 50%, ${rgbaFromHex(config.btnGradToHex, alpha)} 100%)`;
  }, [config.btnBaseHex, config.btnGradFromHex, config.btnGradToHex, config.btnGradAngle, config.btnGradType, config.glass]);

  // Unified computed styling variables
  const vars = useMemo(() => computeGlassVars(config), [config]);

  // React inline styles for live preview (mirrors CSS variables structure completely)
  const buttonStyle = useMemo<React.CSSProperties>(() => ({
    width: "100%",
    maxWidth: vars.maxWidth,
    height: vars.height,
    borderRadius: vars.radius,
    background: buttonBg, // Independent button gradient applied here
    backdropFilter: `blur(${vars.blur}px)`,
    WebkitBackdropFilter: `blur(${vars.blur}px)`,
    border: `1px solid ${vars.borderColor}`,
    boxShadow: `
      0 ${vars.shadowY}px ${vars.shadowBlur}px rgba(0,0,0,${vars.shadowColor}),
      inset 0 1px 1px rgba(255,255,255,${vars.insetHighlight})
    `,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: vars.textColor,
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
    letterSpacing: `${vars.letterSpacing}em`,
    cursor: "pointer",
    transition: "transform 0.15s ease, filter 0.15s ease",
    transform: isPressed ? `scale(${vars.activeScale})` : "scale(1)",
    filter: isHovered && !isPressed ? `brightness(${vars.hoverBrightness})` : "brightness(1)",
  }), [vars, buttonBg, isHovered, isPressed]);

  const beforeStyle = useMemo<React.CSSProperties>(() => ({
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    pointerEvents: "none",
    background: `linear-gradient(to bottom, rgba(255,255,255,${vars.highlightTop}), transparent ${vars.highlightCut}%)`,
  }), [vars]);

  const edgeStyle = useMemo<React.CSSProperties>(() => ({
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    pointerEvents: "none",
    boxShadow: `
      0 0 0 1px rgba(255,255,255,${vars.edge}),
      inset 0 0 14px rgba(0,0,0,${vars.innerDark})
    `,
  }), [vars]);

  // Generated code strings
  const cssString = useMemo(() => {
    const baseCss = `
/* Main Glassmorphism Button Class */
.glass-btn {
  /* --- Configurable CSS Variables --- */
  --glass-max-width: ${vars.maxWidth}px;
  --glass-height: ${vars.height}px;
  --glass-radius: ${vars.radius}px;
  --glass-bg: ${buttonBg};
  --glass-blur: ${vars.blur}px;
  --glass-border-color: ${vars.borderColor};
  
  /* Typography Variables */
  --glass-font-size: ${vars.fontSize}px;
  --glass-font-weight: ${vars.fontWeight};
  --glass-letter-spacing: ${vars.letterSpacing}em;
  --glass-text-color: ${vars.textColor};
  
  /* Interaction Variables */
  --glass-hover-brightness: ${vars.hoverBrightness};
  --glass-active-scale: ${vars.activeScale};
  --glass-transition: transform 0.15s ease, filter 0.15s ease;
  
  /* Computed Shadows & Highlights */
  --glass-shadow: 0 ${vars.shadowY}px ${vars.shadowBlur}px rgba(0,0,0,${vars.shadowColor}), inset 0 1px 1px rgba(255,255,255,${vars.insetHighlight});
  --glass-highlight-top: rgba(255,255,255,${vars.highlightTop});
  --glass-highlight-cut: ${vars.highlightCut}%;
  --glass-edge-box-shadow: 0 0 0 1px rgba(255,255,255,${vars.edge}), inset 0 0 14px rgba(0,0,0,${vars.innerDark});

  /* --- Base Styles --- */
  width: 100%;
  max-width: var(--glass-max-width);
  height: var(--glass-height);
  border-radius: var(--glass-radius);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border-color);
  box-shadow: var(--glass-shadow);
  
  /* Typography and Layout */
  color: var(--glass-text-color);
  font-size: var(--glass-font-size);
  font-weight: var(--glass-font-weight);
  letter-spacing: var(--glass-letter-spacing);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--glass-transition);
}

/* Interaction States for Physicality */
.glass-btn:hover {
  filter: brightness(var(--glass-hover-brightness));
}

.glass-btn:active {
  transform: scale(var(--glass-active-scale));
}

/* Top Light Reflection */
.glass-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    var(--glass-highlight-top),
    transparent var(--glass-highlight-cut)
  );
}

/* Inner Rim and Depth */
.glass-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: var(--glass-edge-box-shadow);
}
`.trim();

    if (showPreviewBg) {
      return `
/* Container Background (For Reference) */
.page-bg {
  background: ${previewBg};
}

${baseCss}
`.trim();
    }
    return baseCss;
  }, [vars, previewBg, buttonBg, showPreviewBg]);

  const jsxString = useMemo(() => {
    const btn = `
<button className="glass-btn">
  ${config.buttonText}
</button>
`.trim();
    if (showPreviewBg) {
      return `
<div className="page-bg" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
  ${btn}
</div>
`.trim();
    }
    return btn;
  }, [config.buttonText, showPreviewBg]);

  const jsonString = useMemo(() => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  return { buttonStyle, beforeStyle, edgeStyle, cssString, jsxString, jsonString, previewBg };
}

// === Main App Component ===
export default function App() {
  const [config, setConfig] = useState<GlassConfig>(PRESETS["TipJar Default"]);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showBgInOutput, setShowBgInOutput] = useState(true);

  const { 
    buttonStyle, beforeStyle, edgeStyle, 
    cssString, jsxString, jsonString, previewBg 
  } = useGlassButton(config, { 
    isHovered, 
    isPressed, 
    showPreviewBg: showBgInOutput 
  });

  // Strongly typed, memoized update function
  const updateConfig = useCallback(<K extends keyof GlassConfig>(key: K, value: GlassConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, [setConfig]);

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen text-white font-sans bg-[#051c1c]"
    >
      {/* Sidebar / Controls */}
      <div className="w-full lg:w-[420px] bg-black/40 border-r border-white/10 backdrop-blur-xl p-6 overflow-y-auto h-auto lg:h-screen z-10 flex-shrink-0">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold mb-1">Glass Button Lab</h1>
            <p className="text-xs text-white/50">Craft the perfect glassmorphic element</p>
          </div>
          <button 
            onClick={() => setConfig(PRESETS["TipJar Default"])}
            className="text-[10px] uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/10 px-2 py-1 rounded transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="space-y-6">
          {/* Presets */}
          <Section title="Presets">
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(PRESETS).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setConfig(PRESETS[preset])}
                  className="text-xs text-left px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </Section>

          {/* Content & Typography */}
          <Section title="Content & Typography">
            <Control label="Button Text">
              <input 
                type="text" 
                value={config.buttonText} 
                onChange={(e) => updateConfig("buttonText", e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-white/30 text-white placeholder-white/30"
                placeholder="Enter text..."
              />
            </Control>
            
            <Control label="Text Color (RGBA/Hex)">
              <input 
                type="text" 
                value={config.textColor} 
                onChange={(e) => updateConfig("textColor", e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-white/30 text-white placeholder-white/30"
                placeholder="rgba(255, 255, 255, 0.9)"
              />
            </Control>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <Control label={`Font Size: ${config.fontSize}px`}>
                <Range min={10} max={32} value={config.fontSize} onChange={(v) => updateConfig("fontSize", v)} />
              </Control>
              <Control label={`Font Weight: ${config.fontWeight}`}>
                <Range min={100} max={900} step={100} value={config.fontWeight} onChange={(v) => updateConfig("fontWeight", v)} />
              </Control>
            </div>
            <Control label={`Letter Spacing: ${config.letterSpacing}em`}>
              <Range min={-0.05} max={0.2} step={0.005} value={config.letterSpacing} onChange={(v) => updateConfig("letterSpacing", v)} />
            </Control>
          </Section>

          {/* Main Sliders */}
          <Section title="Dimensions & Shape">
            <Control label={`Max Width: ${config.maxWidth}px`}>
              <Range min={100} max={600} value={config.maxWidth} onChange={(v) => updateConfig("maxWidth", v)} />
            </Control>
            <Control label={`Radius: ${config.radius}px`}>
              <Range min={6} max={40} value={config.radius} onChange={(v) => updateConfig("radius", v)} />
            </Control>
            <Control label={`Height: ${config.height}px`}>
              <Range min={40} max={80} value={config.height} onChange={(v) => updateConfig("height", v)} />
            </Control>
          </Section>

          <Section title="Material Properties">
            <Control label={`Glass opacity: ${config.glass.toFixed(2)}`}>
              <Range min={0} max={0.95} step={0.01} value={config.glass} onChange={(v) => updateConfig("glass", v)} />
            </Control>
            <Control label={`Backdrop blur: ${config.blur}px`}>
              <Range min={0} max={40} value={config.blur} onChange={(v) => updateConfig("blur", v)} />
            </Control>
            <Control label={`Edge softness: ${config.edgeSoftness.toFixed(2)}`}>
              <Range min={0} max={1} step={0.01} value={config.edgeSoftness} onChange={(v) => updateConfig("edgeSoftness", v)} />
            </Control>
          </Section>

          {/* Button Colors & Gradient */}
          <Section title="Button Colors & Gradient">
             <Control label="Button Gradient Type">
              <select 
                className="w-full bg-[#1a1a1a] border border-white/10 rounded px-2 py-2 text-sm outline-none focus:border-white/30 text-white"
                value={config.btnGradType} 
                onChange={(e) => updateConfig("btnGradType", e.target.value as GradientType)}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </Control>

            {config.btnGradType === 'linear' && (
              <Control label={`Button Gradient Angle: ${config.btnGradAngle}°`}>
                <Range min={0} max={360} value={config.btnGradAngle} onChange={(v) => updateConfig("btnGradAngle", v)} />
              </Control>
            )}

            <div className="grid grid-cols-3 gap-2 mt-2">
              <ColorInput label="From" value={config.btnGradFromHex} onChange={(v) => updateConfig("btnGradFromHex", v)} />
              <ColorInput label="Base (Glass)" value={config.btnBaseHex} onChange={(v) => updateConfig("btnBaseHex", v)} />
              <ColorInput label="To" value={config.btnGradToHex} onChange={(v) => updateConfig("btnGradToHex", v)} />
            </div>
          </Section>

          {/* Live Preview Background Gradient */}
          <Section title="Live Preview Background">
             <Control label="Background Gradient Type">
              <select 
                className="w-full bg-[#1a1a1a] border border-white/10 rounded px-2 py-2 text-sm outline-none focus:border-white/30 text-white"
                value={config.gradType} 
                onChange={(e) => updateConfig("gradType", e.target.value as GradientType)}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </Control>

            {config.gradType === 'linear' && (
              <Control label={`Background Gradient Angle: ${config.gradAngle}°`}>
                <Range min={0} max={360} value={config.gradAngle} onChange={(v) => updateConfig("gradAngle", v)} />
              </Control>
            )}

            <Control label={`Background Gradient Strength: ${config.gradientStrength.toFixed(2)}`}>
              <Range min={0} max={0.3} step={0.01} value={config.gradientStrength} onChange={(v) => updateConfig("gradientStrength", v)} />
            </Control>

            <div className="grid grid-cols-3 gap-2 mt-2">
              <ColorInput label="From" value={config.gradFromHex} onChange={(v) => updateConfig("gradFromHex", v)} />
              <ColorInput label="Base (Background)" value={config.baseHex} onChange={(v) => updateConfig("baseHex", v)} />
              <ColorInput label="To" value={config.gradToHex} onChange={(v) => updateConfig("gradToHex", v)} />
            </div>
          </Section>
          
          <Section title="Fine Tuning">
             <Control label={`Border alpha: ${config.borderAlpha.toFixed(2)}`}>
              <Range min={0} max={0.4} step={0.01} value={config.borderAlpha} onChange={(v) => updateConfig("borderAlpha", v)} />
            </Control>
            <Control label={`Inner Highlight: ${config.innerHighlightAlpha.toFixed(2)}`}>
              <Range min={0} max={0.2} step={0.01} value={config.innerHighlightAlpha} onChange={(v) => updateConfig("innerHighlightAlpha", v)} />
            </Control>
            <Control label={`Shadow Strength: ${config.shadowStrength.toFixed(2)}`}>
              <Range min={0} max={1} step={0.01} value={config.shadowStrength} onChange={(v) => updateConfig("shadowStrength", v)} />
            </Control>
          </Section>

          <Section title="Interaction">
            <Control label={`Hover Brightness: ${config.hoverBrightness.toFixed(2)}`}>
              <Range min={1} max={1.5} step={0.01} value={config.hoverBrightness} onChange={(v) => updateConfig("hoverBrightness", v)} />
            </Control>
            <Control label={`Active Scale: ${config.activeScale.toFixed(2)}`}>
              <Range min={0.85} max={1} step={0.01} value={config.activeScale} onChange={(v) => updateConfig("activeScale", v)} />
            </Control>
          </Section>

        </div>
      </div>

      {/* Main Preview and Code Area */}
      <div className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Live Preview */}
          <div 
            className="border border-white/10 rounded-3xl p-12 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl"
            style={{ background: previewBg, transition: "background 0.5s ease" }}
          >
            {/* Checkerboard pattern for transparency reference */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
            
            <div className="relative z-10 w-full flex justify-center">
              <button 
                style={buttonStyle} 
                aria-label="Preview button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
              >
                <span className="relative z-10">{config.buttonText}</span>
                <span style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", ...beforeStyle }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", ...edgeStyle }} />
              </button>
            </div>
            <div className="relative z-10 mt-8 text-xs text-white/40 tracking-wider uppercase font-semibold">
              Live Preview
            </div>
          </div>

          {/* Export Settings */}
          <div className="flex items-center gap-3 px-2">
            <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer hover:text-white transition-colors">
              <input 
                type="checkbox" 
                checked={showBgInOutput} 
                onChange={(e) => setShowBgInOutput(e.target.checked)}
                className="rounded border-white/20 bg-white/5 accent-emerald-500 w-4 h-4"
              />
              Include Background Wrapper in Code Output
            </label>
          </div>

          {/* Code Blocks */}
          <div className="grid gap-6">
            <CodeBlock title="CSS" value={cssString} />
            <CodeBlock title="React / JSX" value={jsxString} />
            <CodeBlock title="JSON Config" value={jsonString} />
          </div>

        </div>
      </div>
    </div>
  );
}

// === Subcomponents ===

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-white/70">{label}</div>
      {children}
    </div>
  );
}

function Range({ min, max, value, step = 1, onChange }: { min: number, max: number, value: number, step?: number, onChange: (val: number) => void }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:accent-emerald-300 transition-colors"
    />
  );
}

function ColorInput({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] text-white/50">{label}</label>
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-2 py-1.5 focus-within:border-white/30 transition-colors">
        <input 
          type="color" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-5 h-5 rounded cursor-pointer bg-transparent border-none p-0"
        />
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-[10px] font-mono outline-none text-white/90"
        />
      </div>
    </div>
  );
}

function CodeBlock({ title, value }: { title: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
        <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">{title}</span>
        <button
          onClick={handleCopy}
          className={`
            text-xs px-3 py-1.5 rounded-lg border transition-all duration-200
            ${copied 
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200' 
              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto max-h-[400px]">
        <pre className="text-[13px] font-mono text-white/80 leading-relaxed whitespace-pre">
          <code>{value}</code>
        </pre>
      </div>
    </div>
  );
}
