"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import clsx from "clsx";

/**
 * Popover — TipJar+ Design System (design.md §3.3.2)
 *
 * - role="dialog"
 * - shadow: --shadow-modal
 * - padding: 16px
 * - close: click outside / Escape
 * - z-index: --z-tooltip (1500)
 */

interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export default function Popover({
  children,
  content,
  className,
  ...rest
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  return (
    <div
      ref={containerRef}
      className={clsx("relative inline-flex", className)}
      {...rest}
    >
      <div onClick={toggle} className="cursor-pointer">
        {children}
      </div>
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          className={clsx(
            "absolute top-full left-0 mt-2",
            "z-tooltip",
            "bg-teal-800",
            "p-4",
            "rounded-lg",
            "border border-white/[0.05]",
            "shadow-modal",
            "min-w-[200px]",
            "animate-slide-down",
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
