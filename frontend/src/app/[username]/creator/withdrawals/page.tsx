"use client";
import WithdrawalForm from "@/components/ui/forms/WithdrawalForm";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { useCreatorBalance, useWithdraw } from "@/lib/api/queries";
import { useToast } from "@/components/ui/notifications/Toast";
import { normalize } from "@/lib/api/errors";
import { track } from "@/lib/analytics/track";

export default function WithdrawalsPage() {
  const { data, isLoading, isError, refetch } = useCreatorBalance();
  const { mutateAsync, isPending } = useWithdraw();
  const toast = useToast();

  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Wypłaty</h1>
      <WithdrawalForm
        balance={data.balance}
        onSubmit={async ({ amount, address }) => {
          try {
            await mutateAsync({ amount, address });
            toast.push({ type: "success", text: "Wypłata zlecona." });
            track("withdraw_request", { amount });
          } catch (e) {
            const { msg } = normalize(e);
            toast.push({ type: "error", text: msg });
            track("withdraw_fail", { reason: msg });
            throw e;
          }
        }}
      />
      {isPending && <p className="text-sm opacity-70 mt-2">Przetwarzanie…</p>}
    </div>
  );
}
