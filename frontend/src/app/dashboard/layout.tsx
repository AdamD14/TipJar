import Sidebar from '@/components/ui/Sidebar';
import HeaderBar from '@/components/ui/HeaderBar';
import RQProvider from '@/lib/api/reactQueryProvider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { href: '/dashboard', label: 'Pulpit' },
    { href: '/dashboard/profile', label: 'Profil' },
    { href: '/dashboard/withdrawals', label: 'Wypłaty' },
    { href: '/dashboard/goal', label: 'Cel' },
    { href: '/dashboard/subscriptions', label: 'Subskrypcje' },
  ];
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] bg-[var(--surface-2)] text-[var(--fg)]">
      <aside className="border-r border-white/10">
        <Sidebar items={items} />
      </aside>
      <div className="min-h-screen">
        <HeaderBar title="Panel twórcy" />
        <main className="p-6">
          <RQProvider>{children}</RQProvider>
        </main>
      </div>
    </div>
  );
}
