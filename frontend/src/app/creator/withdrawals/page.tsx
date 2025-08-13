// app/creator/withdrawals/page.tsx
import Navbar from '@/components/landing/Navbar';

export default function CreatorWithdrawalsPage() {
  return (

      <section className="p-8">
        <h1 className="text-2xl mb-4">Withdrawals</h1>
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
