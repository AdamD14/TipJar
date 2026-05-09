import React, { forwardRef } from "react";
import clsx from "clsx";

/**
 * Textarea — TipJar+ Design System (system.md §2.3)
 *
 * Properties:
 *  - padding: 16px
 *  - resize: vertical only
 *  - custom scrollbar: track transparent, thumb teal-600, hover teal-500
 *    (global scrollbar styles in globals.css)
 *
 * States: same as Input — default | error | success
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
          // layout
          "w-full px-4 py-4 rounded-[6px]",
          "font-body text-base outline-none",
          "transition-all duration-200",
          "resize-y min-h-[120px]",

          // base
          "bg-teal-800 text-white",
          "placeholder:text-[#5c7a7a]",

          // scrollbar (global styles handle ::-webkit-scrollbar)
          "overflow-y-auto",

          // border states (mirrors Input)
          resolvedState === "default" && [
            "border border-teal-700",
            "hover:border-teal-600",
            "focus:border-gold-400",
            "focus:shadow-[0_0_0_1px_#ffd700,0_0_0_4px_rgba(255,215,0,0.25)]",
          ],

          resolvedState === "error" && [
            "border border-error-base",
            "shadow-[0_0_0_4px_rgba(255,180,171,0.25)]",
            "focus:shadow-[0_0_0_1px_#ff5252,0_0_0_4px_rgba(255,180,171,0.3)]",
          ],

          resolvedState === "success" && [
            "border border-success-base",
            "focus:shadow-[0_0_0_1px_#00e676]",
          ],

          "disabled:opacity-40 disabled:cursor-not-allowed",

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
