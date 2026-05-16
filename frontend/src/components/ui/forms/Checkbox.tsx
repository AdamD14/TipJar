"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";

/**
 * Checkbox — TipJar+ Design System (design.md §2.5)
 *
 * Dimensions: 20×20px
 * Border-radius: 4px
 * Checked: --purple-300 (#4D194D) or --gold-400 (#FFD700)
 * Unchecked: border --border-subtle (--teal-700)
 * Check icon: white (on purple) or teal-900 (on gold)
 */

type CheckboxColor = "purple" | "gold";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
  color?: CheckboxColor;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, color = "purple", ...rest }, ref) => {
    const checkedBg = color === "gold" ? "bg-gold-400" : "bg-purple-300";
    const checkedBorder = color === "gold" ? "border-gold-400" : "border-purple-300";
    const checkStroke = color === "gold" ? "#001F1F" : "#ffffff";

    return (
      <label
        className={clsx(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          rest.disabled && "opacity-40 cursor-not-allowed",
          className,
        )}
      >
        <span className="relative flex items-center justify-center w-5 h-5 shrink-0">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...rest}
          />
          <span
            className={clsx(
        "w-5 h-5 rounded-[4px] border-2 transition-all duration-200",
        "border-teal-700 bg-teal-800",
        "peer-focus-visible:ring-2 peer-focus-visible:ring-border-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-app",
              "peer-hover:border-teal-600",
            )}
            style={{
              /* dynamic checked styles can't be composed via clsx string interpolation easily,
                 so we use a CSS variable approach via data attribute */
            }}
          />
          {/* Render two possible checked backgrounds, visible via peer-checked */}
          <span
            className={clsx(
              "absolute inset-0 rounded-[4px] transition-all duration-200",
              color === "gold" ? "bg-gold-400" : "bg-purple-300",
              "opacity-0 peer-checked:opacity-100",
            )}
            aria-hidden="true"
          />
          <span
            className={clsx(
              "absolute inset-0 rounded-[4px] border-2 transition-all duration-200",
              "border-teal-700",
              "peer-checked:border-transparent",
              "peer-hover:border-teal-600",
            )}
            aria-hidden="true"
          />
          <svg
            className="absolute w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6L5 9L10 3"
              stroke={checkStroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {label && (
          <span className="font-body text-sm text-teal-25">{label}</span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
