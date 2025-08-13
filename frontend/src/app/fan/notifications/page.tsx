// app/fan/notifications/page.tsx
import Link from 'next/link';

export default function FanNotificationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-[#003737] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl">Notifications</h1>
        <nav>
          <Link href="/fan/dashboard" className="px-3 hover:text-[#FFD700]">Dashboard</Link>
          <Link href="/fan/history" className="px-3 hover:text-[#FFD700]">History</Link>
          <Link href="/fan/following" className="px-3 hover:text-[#FFD700]">Following</Link>
          <Link href="/fan/notifications" className="px-3 text-[#FFD700]">Notifications</Link>
          <Link href="/fan/wallet" className="px-3 hover:text-[#FFD700]">Wallet</Link>
          <Link href="/" className="px-3 hover:text-[#FFD700]">Logout</Link>
        </nav>
      </header>
      <section className="p-8">
        <h2 className="text-xl mb-4">Your Notifications</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>@Alice sent you a message: "Thanks for your tip!"</li>
          <li>@Bob started a new stream – check it out!</li>
        </ul>
      </section>
    </main>
  );
}
