// app/creator/dashboard/page.tsx
import Link from 'next/link';

export default function CreatorDashboardPage() {
  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <header className="bg-[#003737] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl">Creator Dashboard</h1>
        <nav>
          <Link href="/creator/dashboard" className="px-3 text-[#FFD700]">Dashboard</Link>
          <Link href="/creator/withdrawals" className="px-3 hover:text-[#FFD700]">Withdrawals</Link>
          <Link href="/creator/settings" className="px-3 hover:text-[#FFD700]">Settings</Link>
          <Link href="/" className="px-3 hover:text-[#FFD700]">Logout</Link>
        </nav>
      </header>
      <section className="p-8">
        <h2 className="text-xl mb-2">Summary Statistics</h2>
        <p className="mb-4">Total Tips Received: <span className="font-bold">$123.45</span></p>
        <p className="mb-6">Current Balance: <span className="font-bold">$67.89</span></p>
        <h2 className="text-xl mb-2">Recent Tips</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Carol tipped $10 – "Love your work!"</li>
          <li>Dave tipped $5 – "Great content!"</li>
          <li>Anonymous tipped $2</li>
        </ul>
      </section>
    </main>
  );
}
