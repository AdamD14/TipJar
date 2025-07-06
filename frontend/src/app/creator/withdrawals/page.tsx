// app/creator/withdrawals/page.tsx
import Link from 'next/link';

export default function CreatorWithdrawalsPage() {
  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <header className="bg-[#003737] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl">Withdrawals</h1>
        <nav>
          <Link href="/creator/dashboard" className="px-3 hover:text-[#FFD700]">Dashboard</Link>
          <Link href="/creator/withdrawals" className="px-3 text-[#FFD700]">Withdrawals</Link>
          <Link href="/creator/settings" className="px-3 hover:text-[#FFD700]">Settings</Link>
          <Link href="/" className="px-3 hover:text-[#FFD700]">Logout</Link>
        </nav>
      </header>
      <section className="p-8">
        <h2 className="text-xl mb-4">Withdraw Funds</h2>
        <p className="mb-4">Current Balance: <span className="font-bold">$67.89</span> USDC</p>
        <form className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1">Destination Address</label>
            <input type="text" placeholder="Your crypto wallet address" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-1">Amount (USDC)</label>
            <input type="number" placeholder="Amount to withdraw" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <button type="submit" className="bg-[#003737] text-white py-2 px-4 rounded">Withdraw</button>
        </form>
      </section>
    </main>
  );
}
