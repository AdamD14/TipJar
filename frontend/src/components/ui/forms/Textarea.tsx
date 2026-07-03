import React, { forwardRef } from "react";
import clsx from "clsx";

/**
 * Textarea — TipJar+ Design System (design.md §2.3)
 *
 * Properties:
 * - padding: 16px
 * - resize: vertical only
 * - custom scrollbar: track transparent, thumb teal-600, hover teal-500
 *
 * States: same as Input — default | error | success
 * Placeholder: --text-quaternary (teal-100 = #ABE1E1)
 * Text: --text-secondary (teal-25 = #E0F2F2)
 */

type TextareaState = "default" | "error" | "success";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: TextareaState;
  /** @deprecated — use state="error" instead */
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", state, error, ...props }, ref) => {
    const resolvedState: TextareaState =
      state ?? (error ? "error" : "default");

    return (
      <textarea
        ref={ref}
        className={clsx(
          "w-full px-4 py-4",
          // Tokenized border radius
          "rounded-[var(--radius-sm)]",
          "font-body text-base outline-none",
          "transition-all duration-200 [transition-timing-function:var(--ease-standard)]",

          // GPU acceleration dla resize — odciążenie main thread
          "util-gpu-composited",
          "will-change-[border-color,box-shadow]",
          "contain-layout",  // izolacja layoutu przy resize

          "resize-y min-h-[120px]",
          "overflow-y-auto",

          "bg-teal-800 text-teal-25",
          "placeholder:text-teal-100",

          // Haptic glow on focus
          "haptic-glow",

          // Touch prediction
          "touch-predict",

        resolvedState === "default" && [
          "border border-teal-700",
          "hover:border-teal-600",
          "focus:border-gold-400",
          // Token z globals zamiast hardcoded shadow
          "focus:[box-shadow:var(--shadow-card-focus)]",
          // Emisyjna poświata
          "focus:emissive-glow",
        ],

        resolvedState === "error" && [
          "border border-error-base",
          "shadow-[0_0_0_4px_rgba(255,82,82,0.25)]",
          "focus:shadow-[0_0_0_1px_var(--error-base),0_0_0_4px_rgba(255,82,82,0.3)]",
          // Error glow — czerwona poświata
          "focus:drop-shadow-[0_0_8px_rgba(255,82,82,0.4)]",
        ],

        resolvedState === "success" && [
          "border border-success-base",
          "focus:shadow-[0_0_0_1px_var(--success-base)]",
          // Success glow — zielona poświata
          "focus:drop-shadow-[0_0_8px_rgba(0,230,118,0.4)]",
        ],

          "disabled:opacity-40 disabled:cursor-not-allowed",
          "disabled:border-dashed disabled:border-teal-700",

          className,
        )}
        aria-invalid={resolvedState === "error" || undefined}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
