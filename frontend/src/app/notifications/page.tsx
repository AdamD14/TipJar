export default function NotificationsPage() {
  const items = [{ id: 1, text: 'Nowy post od @aga_music', unread: true }];
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Powiadomienia</h1>
      <div className="grid gap-2">
        {items.map((n) => (
          <div
            key={n.id}
            className={`rounded-xl border p-3 ${n.unread ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-white/10'}`}
          >
            {n.text}
          </div>
        ))}
      </div>
    </div>
  );
}
