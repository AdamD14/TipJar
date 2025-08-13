// app/fan/wallet/page.tsx
import Link from 'next/link';

export default function FanWalletPage() {
  return (
    <main className="min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <header className="bg-[#003737] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl">Wallet</h1>
        <nav>
          <Link href="/fan/dashboard" className="px-3 hover:text-[#FFD700]">Dashboard</Link>
          <Link href="/fan/history" className="px-3 hover:text-[#FFD700]">History</Link>
          <Link href="/fan/following" className="px-3 hover:text-[#FFD700]">Following</Link>
          <Link href="/fan/notifications" className="px-3 hover:text-[#FFD700]">Notifications</Link>
          <Link href="/fan/wallet" className="px-3 text-[#FFD700]">Wallet</Link>
          <Link href="/" className="px-3 hover:text-[#FFD700]">Logout</Link>
        </nav>
      </header>
      <section className="p-8 max-w-md">
        <h2 className="text-xl mb-4">Your TipJar Wallet</h2>
        <p className="mb-4">Current Balance: <span className="font-bold">$15.00</span> USDC</p>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Add Funds (USDC)</label>
            <input type="number" placeholder="Amount" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <button type="submit" className="bg-[#003737] text-white py-2 px-4 rounded">Add Funds</button>
        </form>
      </section>
    </main>
  );
}
