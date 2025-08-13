"use client";

import * as React from "react";
import { baseBtn, liftShadow, cx, ButtonProps, GOLD } from "./common";

export function SolidButton({ color, children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={baseBtn(
        cx(liftShadow, `bg-[${color.base}] hover:bg-[${color.hover}]`, "ring-0", className),
        { textDark: color === GOLD, ring: `focus-visible:ring-[${color.ring}]` }
      )}
    >
      {children}
    </button>
  );
}
