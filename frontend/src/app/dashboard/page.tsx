"use client";
import { useState } from 'react';
import { useStats } from '@/lib/api/queries';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import ErrorState from '@/components/ui/ErrorState';
import TipStatistics from '@/components/dashboard/TipStatistics';

export default function DashboardPage() {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');
  const { data, isLoading, isError, refetch } = useStats(range);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-semibold">Pulpit</h1>
        <div className="ml-auto flex gap-2">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg border ${
                range === r ? 'bg-primary text-black border-primary' : 'border-white/15'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <LoadingSkeleton lines={6} />}
      {isError && <ErrorState onRetry={() => refetch()} />}

      {data && (
        <>
          <TipStatistics series={data.series} total={data.total} fans={data.fans} />
          <section>
            <h2 className="text-xl font-semibold mt-4">Ostatnie napiwki</h2>
            {/* TODO: podłącz listę /creator/tips po integracji; tu sam pulpit metryk */}
            <p className="opacity-70 text-sm mt-2">Lista napiwków pojawi się po spięciu endpointu.</p>
          </section>
        </>
      )}
    </div>
  );
}
