'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-[#FFD700] focus:px-3 focus:py-2 focus:text-[#0B0F12] focus:shadow"
    >
      Skip to main content
    </a>
  );
}

