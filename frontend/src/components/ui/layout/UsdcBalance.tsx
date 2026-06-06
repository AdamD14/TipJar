import { useCircleBalanceLive } from '@/lib/hooks/useCircleBalanceLive';
import { Coins } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';

export function UsdcBalance() {
  const { data, isLoading, error } = useCircleBalanceLive();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5">
        <Spinner size="sm" className="text-teal-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 py-1.5">
        <span className="text-xs text-rose-400">Error</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="px-3 py-1.5">
        <span className="text-sm text-text-ds-tertiary">0.00 USDC</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated/50 border border-white/10">
      <Coins className="h-4 w-4 text-gold-400" />
      <span className="text-sm font-heading font-semibold text-gold-400 tabular-nums">
        {data.balance.toFixed(2)}
      </span>
      <span className="text-xs font-body text-text-ds-tertiary">
        {data.currency}
      </span>
    </div>
  );
}