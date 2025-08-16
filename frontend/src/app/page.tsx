import Image from 'next/image'
import Header from '@/components/layout/Header'

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen text-text-primary font-sans"
      style={{
        backgroundImage: "url('/tlo7.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Header />

      <div className="absolute top-50 left-200 p-10 z-10">
        <Image
          src="/logo2.png"
          alt="Logo"
          width={200}
          height={200}
          className="opacity-60 shadow-md w-[20vw] "
          priority
        />
      </div>
    </main>
  );
}
