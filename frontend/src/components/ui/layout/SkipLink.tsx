"use client";

export default function SkipLink({ target = "#main" }: { target?: string }) {
  return (
    <a
      href={target}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-gold-400 focus:px-3 focus:py-2 focus:text-teal-900 focus:shadow-lg focus:font-heading focus:font-semibold"
    >
      Skip to content
    </a>
  );
}
