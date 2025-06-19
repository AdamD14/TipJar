import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TipJar+ | Mikropłatności dla Twórców",
  description: "Platforma do mikropłatności dla twórców internetowych.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${montserrat.className} bg-[#0d2f3f] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
