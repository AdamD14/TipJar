import React from "react";
import clsx from "clsx";

/**
 * Select — TipJar+ Design System (system.md §2.4)
 *
 * Native <select> with custom chevron that rotates 180° on open.
 * (Full custom dropdown with animations requires a separate Combobox/Listbox
 * component — this is the accessible native fallback.)
 *
 * States: default | error | success
 *
 * Visual:
 *  - Trigger: same as Input (48px, surface-base, border-subtle)
 *  - Chevron: rotates 180deg on open (CSS :focus-within trick)
 *  - Selected option text: inherited (gold-400 only possible in custom dropdown)
 */

type SelectState = "default" | "error" | "success";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  state?: SelectState;
  /** @deprecated — use state="error" instead */
  invalid?: boolean;
  /** Optional wrapper className */
  wrapperClassName?: string;
};

export default function Select({
  className,
  state,
  invalid,
  wrapperClassName,
  ...rest
}: Props) {
  const resolvedState: SelectState =
    state ?? (invalid ? "error" : "default");

  return (
    <div className={clsx("relative group", wrapperClassName)}>
      <select
        className={clsx(
          // layout
          "w-full h-12 px-4 pr-10 rounded-[6px]",
          "appearance-none cursor-pointer",
          "font-body text-base outline-none",
          "transition-all duration-200",

          // base
          "bg-teal-800 text-white",

          // border states
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
        {...rest}
      />

      {/* Chevron — rotates 180° when select is focused (open) */}
      <div
        aria-hidden="true"
        className={clsx(
          "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none",
          "text-[#5c7a7a]",
          "transition-transform duration-200",
          // Rotate when select has focus (approximation — native select focus)
          "group-has-[:focus]:rotate-180",
        )}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}