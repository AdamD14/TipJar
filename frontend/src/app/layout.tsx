import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Mukta, IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import UserHeader from "@/components/layout/UserHeader";

const bodyFont = Mukta({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

const uiFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ui",
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
          "min-h-screen bg-gradient-main text-white antialiased font-sans relative",
          bodyFont.variable,
          uiFont.variable,
        )}
      >
        <UserHeader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}