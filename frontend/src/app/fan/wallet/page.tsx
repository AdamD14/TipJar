// app/fan/wallet/page.tsx
import Navbar from '@/components/landing/Navbar';

export default function FanWalletPage() {
  return (
 className="p-8 max-w-md">
        <h1 className="text-2xl mb-4">Wallet</h1>
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
