"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";

/**
 * Toggle Switch — TipJar+ Design System (design.md §2.6)
 *
 * Track Off: --teal-850 (#002121) + 1px solid --teal-600
 * Thumb Off: --teal-600, positioned left
 * Track On: --purple-300 (#4D194D)
 * Thumb On: --teal-25 (#E0F2F2), positioned right
 * Animation: --ease-spring (cubic-bezier(0.175, 0.885, 0.32, 1.275)) 400ms
 */

interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, ...rest }, ref) => {
    return (
      <label
        className={clsx(
          "inline-flex items-center gap-3 cursor-pointer select-none",
          rest.disabled && "opacity-40 cursor-not-allowed",
          className,
        )}
      >
        <span className="relative inline-flex items-center w-11 h-6 shrink-0">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...rest}
          />
          {/* Track */}
          <span
            className={clsx(
              "absolute inset-0 rounded-full transition-colors duration-[400ms]",
              "bg-teal-850 border border-teal-600",
              "peer-checked:bg-purple-300 peer-checked:border-purple-300",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-border-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-app",
            )}
            aria-hidden="true"
          />
          {/* Thumb */}
          <span
            className={clsx(
              "absolute left-0.5 top-0.5 w-5 h-5 rounded-full",
              "bg-teal-600",
              "peer-checked:bg-teal-25 peer-checked:translate-x-5",
              "transition-all duration-[400ms]",
              "ease-spring",
            )}
            aria-hidden="true"
          />
        </span>
        {label && (
          <span className="font-body text-sm text-teal-25">{label}</span>
        )}
      </label>
    );
  },
);

Toggle.displayName = "Toggle";

export default Toggle;
