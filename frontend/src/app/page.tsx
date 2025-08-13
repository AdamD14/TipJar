// app/page.tsx
"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white bg-[#041e24] relative overflow-hidden">
      {/* Subtelne tło – ciemny turkus z winietą */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 30% 20%, rgba(0, 116, 116, 0.12) 0%, rgba(0,0,0,0) 60%), radial-gradient(900px 500px at 70% 60%, rgba(20, 74, 101, 0.18) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      {/* NAVBAR */}
      <header className="relative z-10">
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          {/* Logo + marka */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Ikona „słoik” (prosty szkic SVG) */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-90"
            >
              <path
                d="M6 7c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V7Zm0 0v10a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7"
                stroke="#3fd1c1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-xl font-semibold tracking-wide">
              <span className="align-middle">tipjar</span>
              <span className="align-middle">.</span>
              <span className="align-middle">plus</span>
            </div>
            {/* delikatny „sheen” przy hoverze */}
            <span className="ml-1 inline-block h-5 w-3 rounded-sm bg-gradient-to-r from-cyan-300/0 via-cyan-300/50 to-cyan-300/0 opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>

          {/* Linki */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="#" className="hover:text-cyan-200 transition-colors">
              Home
            </Link>
            <Link href="#" className="hover:text-cyan-200 transition-colors">
              About
            </Link>
            <Link href="#" className="hover:text-cyan-200 transition-colors">
              Contact
            </Link>

            {/* Sign Up (outline) */}
            <Link
              href="#"
              className={[
                "rounded-xl px-4 py-2 border",
                "border-white/30 text-white/90",
                "hover:bg-white/10 hover:border-white/50",
                "transition-all duration-200",
              ].join(" ")}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 pb-16 md:pt-12 md:pb-24">
          <h1 className="max-w-4xl text-4xl md:text-6xl leading-snug md:leading-[1.15] font-semibold text-white/95 drop-shadow-[0_1px_0_rgba(255,255,255,0.06)]">
            tipjar.plus — platform for instant micro-paymets to your favorite
            creators: streamers, YouTubers, digital bloggers, coaches,
            educators, journalists, influencers — simply for all content
            creators.
          </h1>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            {/* Gold CTA */}
            <Link
              href="#"
              className={[
                "rounded-2xl px-8 py-4 text-lg font-semibold",
                "text-white shadow-lg",
                "bg-gradient-to-r from-[#C87900] via-[#D9921A] to-[#F0B12E]",
                "hover:shadow-xl hover:translate-y-[-1px]",
                "transition-all duration-200",
              ].join(" ")}
            >
              Begin as a creator
            </Link>

            {/* Purple CTA */}
            <Link
              href="#"
              className={[
                "rounded-2xl px-8 py-4 text-lg font-semibold",
                "text-white shadow-lg",
                "bg-gradient-to-r from-[#6B1CB3] via-[#7A2ACB] to-[#8D35E8]",
                "hover:shadow-xl hover:translate-y-[-1px]",
                "transition-all duration-200",
              ].join(" ")}
            >
              Explore as fun
            </Link>
          </div>

          {/* Dolne linki (małe) */}
          <div className="mt-24 text-sm text-white/80">
            <ul className="flex gap-5">
              <li>
                <Link href="#" className="hover:text-cyan-200 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-200 transition">
                  Abour.
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-200 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
