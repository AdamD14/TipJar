// app/fan/history/page.tsx
import Navbar from '@/components/landing/Navbar';

export default function FanHistoryPage() {
  return (

      <section className="p-8">
        <h1 className="text-2xl mb-4">Tip History</h1>
        <h2 className="text-xl mb-4">Your Support History</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>@Alice – $5 on 2025-06-15</li>
          <li>@Bob – $2 on 2025-06-10</li>
          <li>@Charlie – $3 on 2025-05-30</li>
        </ul>
      </section>
    </main>
  );
}
