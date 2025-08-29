"use client";

import React from "react";

/** Kolory (wyciągnięte z obrazu):
 *  brandPrimary: #0E2A2D  – ciemny teal tła
 *  brandPrimaryAlt: #1E3A3D – średni teal (pasy szkła)
 *  brandGlass: rgba(255,255,255,0.06) – warstwa szkła
 *  brandDrop: #A9B7B9 – jasne krople/połysk
 *  brandAccent: #C6A66A – ciepły bokeh w centrum
 */

type Props = {
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode; // pozwala zmienić label, domyślnie "Login"
};

export default function LoginButton({
  loading,
  disabled,
  className = "",
  onClick,
  children,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      aria-label="Zaloguj się"
      onClick={onClick}
      disabled={isDisabled}
      className={[
        // layout
        "relative inline-flex items-center justify-center",
        "h-11 px-6 rounded-2xl",
        // glass / mokre szkło
        "bg-brand-glass/60 backdrop-blur-md",
        "border border-white/10",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_24px_rgba(0,0,0,0.25)]",
        // typografia
        "text-white font-semibold tracking-wide",
        // stan domyślny
        "transition-all duration-300 ease-out",
        // hover: subtelne rozjaśnienie i podbicie kontrastu
        "hover:bg-brand-glass/70 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_30px_rgba(0,0,0,0.30)]",
        // active: lekkie “dociśnięcie”
        "active:scale-[0.98] active:brightness-95",
        // focus visible
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        // disabled
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100",
        className,
      ].join(" ")}
    >
      {/* warstwa ziarnistości/kropelek – bardzo subtelna tekstura */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl
                   bg-[radial-gradient(transparent,transparent_40%,rgba(255,255,255,0.04)_41%,transparent_42%)]
                   opacity-[0.35]"
      />

      {/* mikro-animacja świetlnego “sheen” przejeżdżającego po przycisku */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <span
          className="absolute -inset-y-4 -left-1/3 w-1/2
                     bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.25),transparent)]
                     animate-sheen"
        />
      </span>

      {/* obrys akcentem (delikatny) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/8"
      />

      {/* zawartość */}
      <span className="relative flex items-center gap-2">
        {/* kropelka/akcent jako ikonka punktowa */}
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-brand-accent shadow-[0_0_12px_2px_rgba(198,166,106,0.55)]"
        />
        <span className="select-none">{children ?? "Login"}</span>

        {/* spinner (loading) */}
        {loading && (
          <span
            aria-hidden="true"
            className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-drop/60 border-t-white"
          />)
        }
      </span>
    </button>
  );
}

