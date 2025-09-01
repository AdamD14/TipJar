export default function HeaderBar({ title, actions }: { title?: string; actions?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 bg-[var(--surface-2)]/75 backdrop-blur border-b border-white/10">
      <div className="h-14 px-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div>{actions}</div>
      </div>
    </header>
  );
}
