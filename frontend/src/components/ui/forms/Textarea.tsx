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
          "w-full px-4 py-4 rounded-[6px]",
          "font-body text-base outline-none",
          "transition-all duration-200",
          "resize-y min-h-[120px]",

          "bg-teal-800 text-teal-25",
          "placeholder:text-teal-100",

          "overflow-y-auto",

        resolvedState === "default" && [
          "border border-teal-700",
          "hover:border-teal-600",
          "focus:border-gold-400",
          "focus:shadow-[0_0_0_1px_var(--gold-400),0_0_0_4px_rgba(255,215,0,0.25)]",
        ],

        resolvedState === "error" && [
          "border border-error-base",
          "shadow-[0_0_0_4px_rgba(255,82,82,0.25)]",
          "focus:shadow-[0_0_0_1px_var(--error-base),0_0_0_4px_rgba(255,82,82,0.3)]",
        ],

        resolvedState === "success" && [
          "border border-success-base",
          "focus:shadow-[0_0_0_1px_var(--success-base)]",
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
