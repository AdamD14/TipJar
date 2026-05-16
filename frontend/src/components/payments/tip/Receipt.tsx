import Link from "next/link";
import Button from "@/components/ui/buttons/Button";

export default function Receipt({
  handle,
  amount,
  tx,
}: {
  handle: string;
  amount: string;
  tx: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="font-heading text-xl font-semibold">Thanks for your tip!</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Info label="Creator" value={`@${handle}`} />
        <Info label="Amount" value={`${amount} USDC`} />
        <Info label="Transaction" value={<TxHash hash={tx} />} />
        <Info label="Date" value={new Date().toLocaleString()} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          href={`/tip/${handle}`}
          variant="outline"
          size="sm"
        >
          Tip again
        </Button>
        <Share amount={amount} handle={handle} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/5 p-4">
      <p className="text-xs text-text-ds-tertiary">{label}</p>
      <div className="mt-1 text-sm text-white/90 break-all">{value}</div>
    </div>
  );
}

function TxHash({ hash }: { hash: string }) {
  return (
    <div className="flex items-center gap-2">
      <code className="text-[12px]">{short(hash)}</code>
      <Button
        onClick={() => navigator.clipboard?.writeText(hash)}
        variant="ghost"
        size="sm"
        className="font-ui rounded-lg border border-white/15 px-2 py-1 text-[12px] text-white/80 hover:bg-white/10"
      >
        Copy
      </Button>
    </div>
  );
}

function Share({ amount, handle }: { amount: string; handle: string }) {
  const text = encodeURIComponent(
    `I just tipped @${handle} ${amount} USDC on tipjar+ ✨`,
  );
  return (
    <Button
      href={`https://twitter.com/intent/tweet?text=${text}`}
      variant="primary"
      size="sm"
      target="_blank"
      rel="noopener noreferrer"
    >
      Share
    </Button>
  );
}

function short(tx: string) {
  return tx.length > 16 ? `${tx.slice(0, 8)}…${tx.slice(-6)}` : tx;
}
