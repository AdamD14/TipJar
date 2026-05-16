import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Mukta_Malar, IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import UserHeader from "@/components/ui/layout/UserHeader";

/**
 * Headings, buttons — Mukta Malar (system.md: --font-heading)
 * Body text, UI labels — IBM Plex Sans (system.md: --font-body)
 */
const headingFont = Mukta_Malar({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading-var",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-var",
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "tipjar+",
    template: "%s | tipjar+",
  },
  description: "Platform for supporting your favorite creators in USDC",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-gradient-main text-white antialiased relative",
          headingFont.variable,
          bodyFont.variable,
        )}
        style={{
          fontFamily: "var(--font-body)",
        }}
      >
        <UserHeader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}