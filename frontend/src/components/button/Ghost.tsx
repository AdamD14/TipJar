"use client";

import * as React from "react";
import { baseBtn, liftShadow, cx, ButtonProps } from "./common";

export function GhostButton({ color, children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={baseBtn(
        cx(
          liftShadow,
          `bg-transparent text-[${color.base}]`,
          `hover:bg-[${color.soft}]/12`,
          className
        ),
        { textDark: true, ring: `focus-visible:ring-[${color.ring}]` }
      )}
    >
      {children}
    </button>
  );
}
