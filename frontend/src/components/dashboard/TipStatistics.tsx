function Spark({ series }: { series: number[] }) {
  const W = 240;
  const H = 64;
  const max = Math.max(1, ...series);
  const pts = series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * (W - 8) + 4;
      const y = H - 4 - (v / max) * (H - 8);
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Wykres sumy napiwków">
      <polyline points={pts} fill="none" stroke="currentColor" strokeOpacity="0.8" strokeWidth="2" />
    </svg>
  );
}

export default function TipStatistics({
  series,
  total,
  fans,
}: {
  series: number[];
  total: number;
  fans: number;
}) {
  return (
    <section className="grid sm:grid-cols-3 gap-4">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-sm opacity-80">Łącznie USDC</div>
        <div className="text-2xl font-bold">{total}</div>
      </div>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-sm opacity-80">Liczba fanów</div>
        <div className="text-2xl font-bold">{fans}</div>
      </div>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-center">
        <Spark series={series} />
      </div>
    </section>
  );
}
