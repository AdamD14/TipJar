import React, { forwardRef } from "react";
import clsx from "clsx";

/**
 * Input — TipJar+ Design System (system.md §2.1 – 2.2)
 *
 * Heights:
 *  standard  — 48px  (default)
 *  large     — 56px
 *
 * States:
 *  default  — bg surface-base, border border-subtle (teal-700)
 *  hover    — border teal-600
 *  focus    — border gold-400, glow: 0 0 0 1px gold-400 + 0 0 0 4px rgba(255,215,0,0.25)
 *  error    — border error-base, glow: 0 0 0 4px rgba(255,180,171,0.25)
 *  success  — border success-base
 *  disabled — border teal-700 dashed, opacity 0.4
 *
 * Validation: error text rendered externally (use FormError or Field component).
 */

type InputSize = "standard" | "large";
type InputState = "default" | "error" | "success";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Visual state — use "error" for invalid, "success" for valid */
  state?: InputState;
  /** Input height variant */
  inputSize?: InputSize;
  /** @deprecated — use state="error" instead */
  invalid?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, state, inputSize = "standard", invalid, ...rest },
  ref,
) {
  // Backward compat: `invalid` maps to `state="error"`
  const resolvedState: InputState =
    state ?? (invalid ? "error" : "default");

  return (
    <input
      ref={ref}
      className={clsx(
        // layout
        "w-full px-4 rounded-[6px]",
        "font-body text-base outline-none",
        "transition-all duration-200",

        // height
        inputSize === "large" ? "h-14" : "h-12",

        // base colors
        "bg-teal-800 text-white",
        "placeholder:text-[#5c7a7a]",

        // border + focus (system.md §2.2)
        resolvedState === "default" && [
          "border border-teal-700",
          "hover:border-teal-600",
          "focus:border-gold-400",
          "focus:shadow-[0_0_0_1px_#ffd700,0_0_0_4px_rgba(255,215,0,0.25)]",
        ],

        // error state
        resolvedState === "error" && [
          "border border-error-base",
          "shadow-[0_0_0_4px_rgba(255,180,171,0.25)]",
          "focus:border-error-base",
          "focus:shadow-[0_0_0_1px_#ff5252,0_0_0_4px_rgba(255,180,171,0.3)]",
        ],

        // success state
        resolvedState === "success" && [
          "border border-success-base",
          "focus:border-success-base",
          "focus:shadow-[0_0_0_1px_#00e676]",
        ],

        // disabled
        "disabled:opacity-40 disabled:cursor-not-allowed",
        "disabled:border-dashed disabled:border-teal-700",

        className,
      )}
      aria-invalid={resolvedState === "error" || undefined}
      {...rest}
    />
  );
});

export default Input;