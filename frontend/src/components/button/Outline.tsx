"use client";

import * as React from "react";
import { baseBtn, liftShadow, cx, ButtonProps } from "./common";

export function OutlineButton({ color, children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={baseBtn(
        cx(
          liftShadow,
          `border-2 border-[${color.base}] text-[${color.base}] bg-transparent`,
          `hover:bg-[${color.soft}]/15`,
          className
        ),
        { textDark: true, ring: `focus-visible:ring-[${color.ring}]` }
      )}
    >
      {children}
    </button>
  );
}
