// app/fan/following/page.tsx
import Link from 'next/link';

export default function FanFollowingPage() {
  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <header className="bg-[#003737] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl">Following</h1>
        <nav>
          <Link href="/fan/dashboard" className="px-3 hover:text-[#FFD700]">Dashboard</Link>
          <Link href="/fan/history" className="px-3 hover:text-[#FFD700]">History</Link>
          <Link href="/fan/following" className="px-3 text-[#FFD700]">Following</Link>
          <Link href="/fan/notifications" className="px-3 hover:text-[#FFD700]">Notifications</Link>
          <Link href="/fan/wallet" className="px-3 hover:text-[#FFD700]">Wallet</Link>
          <Link href="/" className="px-3 hover:text-[#FFD700]">Logout</Link>
        </nav>
      </header>
      <section className="p-8">
        <h2 className="text-xl mb-4">Creators You Follow</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li><Link href="/@Alice" className="hover:text-[#003737]">@Alice</Link> – Last supported on 2025-06-15 ($5)</li>
          <li><Link href="/@Charlie" className="hover:text-[#003737]">@Charlie</Link> – Last supported on 2025-05-30 ($3)</li>
        </ul>
      </section>
    </main>
  );
}
