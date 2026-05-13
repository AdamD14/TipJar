import React from "react";
import clsx from "clsx";

/**
 * Select — TipJar+ Design System (design.md §2.4)
 *
 * Native <select> with custom chevron that rotates 180° on open.
 * Trigger: same as Input (48px, surface-base, border-subtle)
 * Chevron: rotates 180deg on open
 * Selected option text: gold-400
 *
 * States: default | error | success
 * Text: --text-primary (teal-25 = #E0F2F2)
 */

type SelectState = "default" | "error" | "success";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  state?: SelectState;
  /** @deprecated — use state="error" instead */
  invalid?: boolean;
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
          "w-full h-12 px-4 pr-10 rounded-[6px]",
          "appearance-none cursor-pointer",
          "font-body text-base outline-none",
          "transition-all duration-200",

          "bg-teal-800 text-teal-25",

          resolvedState === "default" && [
            "border border-teal-700",
            "hover:border-teal-600",
            "focus:border-gold-400",
            "focus:shadow-[0_0_0_1px_#FFD700,0_0_0_4px_rgba(255,215,0,0.25)]",
          ],

          resolvedState === "error" && [
            "border border-error-base",
            "shadow-[0_0_0_4px_rgba(255,82,82,0.25)]",
            "focus:shadow-[0_0_0_1px_#FF5252,0_0_0_4px_rgba(255,82,82,0.3)]",
          ],

          resolvedState === "success" && [
            "border border-success-base",
            "focus:shadow-[0_0_0_1px_#00E676]",
          ],

          "disabled:opacity-40 disabled:cursor-not-allowed",
          "disabled:border-dashed disabled:border-teal-700",

          className,
        )}
        aria-invalid={resolvedState === "error" || undefined}
        {...rest}
      />

      <div
        aria-hidden="true"
        className={clsx(
          "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none",
          "text-teal-100",
          "transition-transform duration-200",
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
