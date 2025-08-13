"use client";

import * as React from "react";
import { baseBtn, liftShadow, cx, ButtonProps, GOLD } from "./common";

function Shimmer() {
  return (
    <span
      aria-hidden
      className={cx(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-xl",
        "before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3",
        "before:translate-x-[-120%] group-hover:before:translate-x-[220%]",
        "before:skew-x-[-20deg] before:bg-white/20 before:blur-md",
        "before:transition-transform before:duration-700"
      )}
    />
  );
}

export function GradientButton({ color, children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={baseBtn(
        cx(
          "group",
          liftShadow,
          `bg-gradient-to-r from-[${color.base}] to-[${color.soft}] hover:from-[${color.hover}] hover:to-[${color.soft}]`,
          className
        ),
        { textDark: color === GOLD, ring: `focus-visible:ring-[${color.ring}]` }
      )}
    >
      <Shimmer />
      {children}
    </button>
  );
}
