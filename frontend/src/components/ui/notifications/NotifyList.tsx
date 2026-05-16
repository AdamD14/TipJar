"use client";
import { fmtDate } from '@/lib/dates';

export type NotificationItem = { id: string; title: string; body?: string; createdAt: string; read?: boolean };

export default function NotifyList({ items = [] }: { items?: NotificationItem[] }) {
  if (!items.length) return <p className="text-sm text-white/70">No notifications.</p>;
  return (
    <ul className="divide-y divide-white/10">
      {items.map((n) => (
        <li key={n.id} className="py-3 flex items-start gap-3">
          <span className={`mt-1 h-2 w-2 rounded-full ${n.read ? 'bg-white/20' : 'bg-gold-400'}`} aria-hidden />
          <div className="min-w-0">
            <div className="text-sm text-text-ds-secondary font-medium">{n.title}</div>
            {n.body && <div className="text-xs text-white/70">{n.body}</div>}
          </div>
          <div className="ml-auto text-xs text-white/50">{fmtDate(n.createdAt)}</div>
        </li>
      ))}
    </ul>
  );
}

