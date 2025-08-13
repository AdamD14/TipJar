// app/creator/settings/page.tsx
import Navbar from '@/components/landing/Navbar';

export default function CreatorSettingsPage() {
  return (

      <section className="p-8 max-w-lg">
        <h1 className="text-2xl mb-4">Settings</h1>
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
