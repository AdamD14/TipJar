import Header from "@/components/layout/Header";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen text-text-primary font-sans"
      style={{
        backgroundImage: "url('/tlo.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Header */}
      <Header />

      {/* Sekcja Hero */}
      <Hero />
    </main>
  );
}
