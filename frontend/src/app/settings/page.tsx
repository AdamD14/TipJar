export default function SettingsPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Ustawienia</h1>
      <form className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm opacity-80">E-mail</span>
          <input className="rounded-lg bg-white/5 border border-white/10 p-2" placeholder="you@example.com" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm opacity-80">Nowe hasło</span>
          <input type="password" className="rounded-lg bg-white/5 border border-white/10 p-2" />
        </label>
        <button className="rounded-lg bg-primary text-black font-semibold px-4 py-2">Zapisz</button>
      </form>
    </div>
  );
}
