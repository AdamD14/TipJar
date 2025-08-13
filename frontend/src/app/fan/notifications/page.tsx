// app/fan/notifications/page.tsx
import Navbar from '@/components/landing/Navbar';

export default function FanNotificationsPage() {
  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Navbar />
      <section className="p-8">
        <h1 className="text-2xl mb-4">Notifications</h1>
        <h2 className="text-xl mb-4">Your Notifications</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>@Alice sent you a message: "Thanks for your tip!"</li>
          <li>@Bob started a new stream – check it out!</li>
        </ul>
      </section>
    </main>
  );
}
