// app/page.tsx  (lub odpowiednia ścieżka strony)
import Header from "@/components/layout/Header";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Tło na całą stronę z /public/tlo.png */}
      <Image
        src="/tlo.png"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden
        className="object-cover -z-10 pointer-events-none select-none"
      />

      {/* Header + Hero */}
      <Header />
      <Hero />
    </main>
  );
}
