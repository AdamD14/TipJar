import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Mukta_Malar, IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import UserHeader from "@/components/ui/layout/UserHeader";

const headingFont = Mukta_Malar({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading-var",
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-var",
  display: "swap",
});

const headingFontFallback = localFont({
  src: [
    { path: "../../public/fonts/Mukta_Malar/MuktaMalar-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Mukta_Malar/MuktaMalar-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/Mukta_Malar/MuktaMalar-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/Mukta_Malar/MuktaMalar-Bold.ttf", weight: "700" },
  ],
  variable: "--font-heading-fallback",
  display: "swap",
});

const bodyFontFallback = localFont({
  src: [
    { path: "../../public/fonts/IBM_Plex_Sans/IBMPlexSans-VariableFont_wdth,wght.ttf" },
  ],
  variable: "--font-body-fallback",
  display: "swap",
  weight: "100 900",
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
          headingFontFallback.variable,
          bodyFontFallback.variable,
        )}
      >
        <UserHeader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
