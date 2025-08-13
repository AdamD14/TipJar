// app/fan/following/page.tsx
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';

export default function FanFollowingPage() {
  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Navbar />
      <section className="p-8">
        <h1 className="text-2xl mb-4">Following</h1>
        <h2 className="text-xl mb-4">Creators You Follow</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li><Link href="/@Alice" className="hover:text-[#003737]">@Alice</Link> – Last supported on 2025-06-15 ($5)</li>
          <li><Link href="/@Charlie" className="hover:text-[#003737]">@Charlie</Link> – Last supported on 2025-05-30 ($3)</li>
        </ul>
      </section>
    </main>
  );
}
