// app/creator/settings/page.tsx
import Link from 'next/link';

export default function CreatorSettingsPage() {
  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <header className="bg-[#003737] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl">Settings</h1>
        <nav>
          <Link href="/creator/dashboard" className="px-3 hover:text-[#FFD700]">Dashboard</Link>
          <Link href="/creator/withdrawals" className="px-3 hover:text-[#FFD700]">Withdrawals</Link>
          <Link href="/creator/settings" className="px-3 text-[#FFD700]">Settings</Link>
          <Link href="/" className="px-3 hover:text-[#FFD700]">Logout</Link>
        </nav>
      </header>
      <section className="p-8 max-w-lg">
        <h2 className="text-xl mb-4">Profile Settings</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Display Name</label>
            <input type="text" placeholder="Your name" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-1">Bio</label>
            <textarea placeholder="A short bio..." className="w-full border border-gray-300 p-2 rounded"></textarea>
          </div>
          <div>
            <label className="block mb-1">Fundraising Goal (USDC)</label>
            <input type="number" placeholder="0" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-1">Website / External Link</label>
            <input type="text" placeholder="https://yourwebsite.com" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <button type="submit" className="bg-[#003737] text-white py-2 px-4 rounded">Save Changes</button>
        </form>
      </section>
    </main>
  );
}
