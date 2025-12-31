"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

// Cloudinary base URL with transformations
const CLOUDINARY_BASE = "https://res.cloudinary.com/domizoghk/image/upload";
const TRANSFORMATION =
  "c_scale,w_250,h_250/e_background_removal:fineedges/f_webp/q_auto:eco";

const buildIconUrl = (imageId: string) =>
  `${CLOUDINARY_BASE}/${TRANSFORMATION}/${imageId}`;

// Noise SVG for grain texture
const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.07'/%3E%3C/svg%3E")`;

// Platform colors
const PLATFORM_STYLES: Record<
  string,
  {
    mid: string;
    full: string;
    isGradient?: boolean;
    gradientMid?: string;
    gradientFull?: string;
    hasGlitch?: boolean;
  }
> = {
  "live-streamer": { mid: "#4d194d", full: "#9146FF" },
  "lifestyle-storyteller": { mid: "#8B0000", full: "#FF0000" },
  "visual-creator": {
    mid: "#DD2A7B",
    full: "#8134AF",
    isGradient: true,
    gradientMid:
      "linear-gradient(135deg, #DD2A7B 0%, #8134AF 50%, #F58529 100%)",
    gradientFull:
      "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)",
  },
  "knowledge-architect": { mid: "#222222", full: "#000000" },
  "micro-entertainer": { mid: "#00F2EA", full: "#00F2EA", hasGlitch: true },
  "health-coach": { mid: "#1877F2", full: "#0077B5" },
};

const ARCHETYPES = [
  {
    id: "live-streamer",
    label: "Live streamer / Interactive entertainer",
    icon: buildIconUrl("11_cmnf7m"),
  },
  {
    id: "lifestyle-storyteller",
    label: "Lifestyle storyteller / Personal brand",
    icon: buildIconUrl("16_q76o9v"),
  },
  {
    id: "visual-creator",
    label: "Visual content creator / Aesthetic influencer",
    icon: buildIconUrl("14_r2vcut"),
  },
  {
    id: "knowledge-architect",
    label: "Knowledge architect / Educational creator",
    icon: buildIconUrl("15_hwkwrb"),
  },
  {
    id: "micro-entertainer",
    label: "Micro-entertainer / Viral content specialist",
    icon: buildIconUrl("12_ek54hp"),
  },
  {
    id: "health-coach",
    label:
      "Health & personal development / Motivational coach & spiritual guide",
    icon: buildIconUrl("13_xquypf"),
  },
];

interface ArchetypeSelectorProps {
  value: string;
  onSelectAction: (value: string) => void;
}

export default function ArchetypeSelector({
  value,
  onSelectAction,
}: ArchetypeSelectorProps) {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredGlitch, setHoveredGlitch] = useState<string | null>(null);

  const handleClick = (id: string) => {
    const newValue = value === id ? "" : id;
    onSelectAction(newValue);

    // Trigger 3s glitch animation on select for micro-entertainer
    if (newValue === "micro-entertainer") {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 3000);
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes glitch-shift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }
      `}</style>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
        {ARCHETYPES.map((archetype) => {
          const isSelected = value === archetype.id;
          const colors = PLATFORM_STYLES[archetype.id];
          const isGlitchHovered =
            hoveredGlitch === archetype.id && colors.hasGlitch;
          const isGlitchSelected =
            isSelected && colors.hasGlitch && glitchActive;

          return (
            <button
              key={archetype.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(archetype.id);
              }}
              onMouseEnter={() =>
                colors.hasGlitch && setHoveredGlitch(archetype.id)
              }
              onMouseLeave={() => setHoveredGlitch(null)}
              className={clsx(
                "group relative w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                isSelected && "scale-[1.02]"
              )}
              style={{
                background: `${noiseSvg}, linear-gradient(135deg, #001919 0%, #093439 100%)`,
              }}
            >
              {/* Main border */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
                style={{
                  border:
                    colors.isGradient && isSelected
                      ? "none"
                      : isSelected
                      ? `2px solid ${colors.full}`
                      : "2px solid #7aaaab",
                  background:
                    colors.isGradient && isSelected
                      ? colors.gradientFull
                      : "none",
                  WebkitMask:
                    colors.isGradient && isSelected
                      ? "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)"
                      : "none",
                  WebkitMaskComposite:
                    colors.isGradient && isSelected
                      ? ("xor" as const)
                      : ("source-over" as const),
                  maskComposite:
                    colors.isGradient && isSelected ? "exclude" : "add",
                  padding: colors.isGradient && isSelected ? "2px" : "0",
                }}
              />

              {/* Glitch borders for TikTok - cyan layer */}
              {colors.hasGlitch && (isGlitchHovered || isGlitchSelected) && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    border: "2px solid #0ff",
                    opacity: 0.7,
                    animation:
                      "glitch-shift 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
                  }}
                />
              )}

              {/* Glitch borders for TikTok - magenta layer */}
              {colors.hasGlitch && (isGlitchHovered || isGlitchSelected) && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    border: "2px solid #ff00ff",
                    opacity: 0.7,
                    animation:
                      "glitch-shift 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite reverse",
                  }}
                />
              )}

              {/* Hover border (non-glitch) */}
              {!colors.hasGlitch && (
                <div
                  className={clsx(
                    "absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300",
                    !isSelected && "opacity-0 group-hover:opacity-100"
                  )}
                  style={{
                    border: colors.isGradient
                      ? "none"
                      : `2px solid ${colors.mid}`,
                    background: colors.isGradient ? colors.gradientMid : "none",
                    WebkitMask: colors.isGradient
                      ? "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)"
                      : "none",
                    WebkitMaskComposite: colors.isGradient
                      ? ("xor" as const)
                      : ("source-over" as const),
                    maskComposite: colors.isGradient ? "exclude" : "add",
                    padding: colors.isGradient ? "2px" : "0",
                  }}
                />
              )}

              {/* Outer glow when selected */}
              <div
                className={clsx(
                  "absolute inset-[-2px] rounded-3xl pointer-events-none transition-all duration-300",
                  isSelected ? "opacity-100" : "opacity-0"
                )}
                style={{
                  boxShadow: `0 0 15px ${colors.full}60, 0 0 30px ${colors.full}30`,
                }}
              />

              {/* Shine */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
                }}
              />

              {/* Icon */}
              <div className="w-[90px] h-[90px] md:w-[180px] md:h-[180px] relative shrink-0 rounded-xl z-10">
                <Image
                  src={archetype.icon}
                  alt={archetype.label}
                  fill
                  priority
                  sizes="(max-width: 768px) 90px, 180px"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Label */}
              {colors.isGradient && isSelected ? (
                <span
                  className="text-left text-base md:text-lg font-semibold leading-tight z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {archetype.label}
                </span>
              ) : (
                <span
                  className="text-left text-base md:text-lg font-semibold leading-tight transition-colors z-10 group-hover:text-white"
                  style={{
                    color: isSelected
                      ? archetype.id === "knowledge-architect"
                        ? "#000000"
                        : colors.full
                      : "#e5e7eb",
                  }}
                >
                  {archetype.label}
                </span>
              )}

              {/* Selection indicator */}
              {isSelected && (
                <div
                  className="ml-auto shrink-0 w-3 h-3 rounded-full z-10"
                  style={{
                    backgroundColor: colors.full,
                    boxShadow: `0 0 10px ${colors.full}`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
