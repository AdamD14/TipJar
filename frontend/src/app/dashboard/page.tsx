import TipStatistics from '@/components/dashboard/TipStatistics';

export default async function DashboardPage() {
  const series = [2, 3, 1, 5, 4, 6, 8, 5, 7, 9, 11, 10];
  const total = 1245;
  const fans = 86;
  const lastTips = [{ fan: 'aga42', amount: 5, time: '2h' }];

  return (
    <div className="space-y-6">
      <TipStatistics series={series} total={total} fans={fans} />
      <section>
        <h2 className="text-xl font-semibold">Ostatnie napiwki</h2>
        <div className="mt-3 grid gap-2">
          {lastTips.map((t, i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3">
              <span className="font-semibold">{t.fan}</span> • {t.amount} USDC • {t.time} temu
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
