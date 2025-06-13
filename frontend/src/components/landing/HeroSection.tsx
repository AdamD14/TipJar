import Button from '@/components/ui/Button';
import Link from 'next/link';

export const HeroSection = () => (
  <section className="py-20 text-center bg-tipjar-turquoise-darker text-white">
    <h1 className="text-5xl font-heading text-tipjar-gold mb-6">TipIT</h1>
    <p className="text-lg mb-8">Wspieraj swoich ulubionych twórców w USDC</p>
    <div className="flex justify-center gap-4">
      <Link href="/register"><Button>Zarejestruj się jako Twórca</Button></Link>
      <Link href="/discover"><Button variant="outline">Odkrywaj Twórców</Button></Link>
    </div>
  </section>
);
