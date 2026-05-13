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
 * Tooltip — TipJar+ Design System (design.md §3.3.1)
 *
 * - Role: labeling (max 2 lines)
 * - background: rgba(0,55,55,0.9)
 * - text: --text-primary, 14px
 * - padding: 8px 12px
 * - border-radius: 6px
 * - shadow: 0 4px 16px rgba(0,0,0,0.5)
 * - delay: 500ms (Hover Intent)
 * - z-index: --z-tooltip (1500)
 * - Mobile: tap (toggletip)
 */

interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export default function Tooltip({
  children,
  content,
  className,
  ...rest
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), 500);
  }, []);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setVisible((v) => !v);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={clsx("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onClick={toggle}
      {...rest}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={clsx(
            "absolute bottom-full left-1/2 -translate-x-1/2 mb-2",
            "z-tooltip",
            "bg-[rgba(0,55,55,0.9)]",
            "text-text-ds-primary text-sm",
            "px-3 py-2",
            "rounded-sm",
            "shadow-tooltip",
            "max-w-[240px]",
            "text-center",
            "pointer-events-none",
            "animate-fade-in",
          )}
        >
          {content}
          <div
            aria-hidden="true"
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[rgba(0,55,55,0.9)]"
          />
        </div>
      )}
    </div>
  );
}
