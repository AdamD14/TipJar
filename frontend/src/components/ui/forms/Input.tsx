import React, { forwardRef } from "react";
import clsx from "clsx";

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
  const resolvedState: InputState = state ?? (invalid ? "error" : "default");

  return (
    <input
      ref={ref}
      className={clsx(
        "w-full px-4",
        // Tokenized border radius
        "rounded-[var(--radius-sm)]",
        "font-body text-base outline-none",
        "transition-all duration-200 [transition-timing-function:var(--ease-standard)]",

        // GPU acceleration — odciążenie main thread
        "util-gpu-composited",
        "will-change-[border-color,box-shadow]",

        inputSize === "large" ? "h-14" : "h-12",

        "bg-teal-800 text-teal-25",
        "placeholder:text-teal-100",

        // Haptic glow on focus
        "haptic-glow",

        // Touch prediction
        "touch-predict",

        resolvedState === "default" && [
          "border border-teal-700",
          "hover:border-teal-450",
          "focus:border-gold-300",
          // Token z globals zamiast hardcoded shadow
          "focus:[box-shadow:var(--shadow-card-focus)]",
          // Emisyjna poświata zamiast płaskiego cienia
          "focus:emissive-glow",
        ],

        resolvedState === "error" && [
          "border border-error-base",
          "shadow-[0_0_0_4px_rgba(255,82,82,0.25)]",
          "focus:border-error-base",
          "focus:[box-shadow:0_0_0_1px_var(--error-base),0_0_0_4px_rgba(255,82,82,0.3)]",
          // Error glow — czerwona poświata
          "focus:drop-shadow-[0_0_8px_rgba(255,82,82,0.4)]",
        ],

        resolvedState === "success" && [
          "border border-success-base",
          "focus:border-success-base",
          "focus:[box-shadow:0_0_0_1px_var(--success-base)]",
          // Success glow — zielona poświata
          "focus:drop-shadow-[0_0_8px_rgba(0,230,118,0.4)]",
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
