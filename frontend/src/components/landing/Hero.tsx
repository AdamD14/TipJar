"use client";

import Image from "next/image";
import Button from "@/components/ui/buttons/Button";

export default function Hero() {
  return (
    <section
      className="relative text-text-ds-primary min-h-screen lg:pb-0"
      aria-labelledby="hero-heading"
    >
      <img
        src="/hero.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover"
      />
      <div className="mx-auto px-4 md:px-8">
        <div className="relative max-w-7xl min-h-screen flex flex-col justify-start pt-16 lg:pt-20">
          <h1
            id="hero-heading"
            className="font-heading font-bold tracking-tight leading-[1.15] text-5xl sm:text-5xl md:text-6xl lg:text-8xl"
          >
            <span className="block relative before:content-['\00a0\00a0\0009'] before:inline-block bg-gradient-to-r from-gold-200 via-white to-gold-200 bg-clip-text text-transparent">
              Support creativity
            </span>
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-teal-200 via-white to-teal-200 bg-clip-text text-transparent drop-shadow-lg">
              Get paid instantly
            </span>
          </h1>

          <p className="mt-6 lg:mt-8 text-2xl sm:text-3xl md:text-4xl font-body font-medium text-text-ds-secondary max-w-2xl">
            Instant micro-payments in USDC for creators: podcasters, streamers,
            YouTubers, digital models, musicians, artists, bloggers, coaches,
            educators, journalists, influencers - simply anyone creating
            valuable content.
          </p>

          <div className="mt-10 lg:mt-12 flex flex-nowrap items-center gap-3 text-sm text-text-ds-tertiary whitespace-nowrap overflow-x-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
              <Image
                src="/c.png"
                alt="Circle"
                width={16}
                height={16}
                priority
              />
              Powered by{" "}
              <span className="font-heading font-semibold">circle.com</span>
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
              </svg>
              Global USDC Payments
            </span>
          </div>

          <div className="mt-3 flex flex-nowrap items-center gap-3 text-sm text-text-ds-tertiary whitespace-nowrap overflow-x-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              2.5% transaction fee
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="3" y="11" width="18" height="10" rx="2" ry="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Smart contract transparency
            </span>
          </div>

          <div className="mt-16 lg:mt-12 flex w-full flex-nowrap items-center justify-start gap-3">
            <Button variant="primary" href="/register">
              Begin as a Creator
            </Button>
            <Button variant="secondary" href="/explore">
              Explore as a Fan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
