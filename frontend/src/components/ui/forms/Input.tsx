import React, { forwardRef } from "react";
import clsx from "clsx";

/**
 * Input — TipJar+ Design System (design.md §2.2)
 *
 * Heights:
 * standard — 48px (default)
 * large — 56px
 *
 * States:
 * default — bg surface-base, border border-subtle (teal-700)
 * hover — border teal-600
 * focus — border gold-400, glow: 0 0 0 1px gold-400 + 0 0 0 4px rgba(255,215,0,0.25)
 * error — border error-base, glow: 0 0 0 4px rgba(255,82,82,0.25)
 * success — border success-base
 * disabled — border teal-700 dashed, opacity 0.4
 *
 * Placeholder: --text-quaternary (teal-100 = #ABE1E1)
 * Text: --text-secondary (teal-25 = #E0F2F2)
 */

type InputSize = "standard" | "large";
type InputState = "default" | "error" | "success";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  state?: InputState;
  inputSize?: InputSize;
  /** @deprecated — use state="error" instead */
  invalid?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, state, inputSize = "standard", invalid, ...rest },
  ref,
) {
  const resolvedState: InputState =
    state ?? (invalid ? "error" : "default");

  return (
    <input
      ref={ref}
      className={clsx(
        "w-full px-4 rounded-[6px]",
        "font-body text-base outline-none",
        "transition-all duration-200",

        inputSize === "large" ? "h-14" : "h-12",

        "bg-teal-800 text-teal-25",
        "placeholder:text-teal-100",

        resolvedState === "default" && [
          "border border-teal-700",
          "hover:border-teal-600",
          "focus:border-gold-400",
          "focus:shadow-[0_0_0_1px_var(--gold-400),0_0_0_4px_rgba(255,215,0,0.25)]",
        ],

        resolvedState === "error" && [
          "border border-error-base",
          "shadow-[0_0_0_4px_rgba(255,82,82,0.25)]",
          "focus:border-error-base",
          "focus:shadow-[0_0_0_1px_var(--error-base),0_0_0_4px_rgba(255,82,82,0.3)]",
        ],

        resolvedState === "success" && [
          "border border-success-base",
          "focus:border-success-base",
          "focus:shadow-[0_0_0_1px_var(--success-base)]",
        ],

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
