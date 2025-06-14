// frontend/src/app/page.tsx

// Ponieważ ta strona nie będzie miała interaktywności,
// nie potrzebujemy 'use client' na samej górze. Będzie to Server Component.

// W przyszłości zaimportujemy tu komponenty naszej strony głównej
// import { NavbarPublic } from '@/components/layout/NavbarPublic';
// import { HeroSection } from '@/components/landing/HeroSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <NavbarPublic /> */}
      <main>
        {/* W kolejnych krokach stworzymy prawdziwe komponenty strony głównej. */}
        {/* Na razie umieszczamy prosty tekst, aby potwierdzić, że wszystko działa. */}
        <div className="text-center mt-40">
          <h1 className="text-5xl font-heading text-tipjar-gold">
            Witaj w TipJar!
          </h1>
          <p className="text-lg mt-4 text-tipjar-gray-light">
            Platforma w budowie.
          </p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}