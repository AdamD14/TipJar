"use client";
import GoalForm from "@/components/payments/GoalForm";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { useGoal, useSaveGoal } from "@/lib/api/queries";
import { useToast } from "@/components/ui/notifications/Toast";
import { track } from "@/lib/analytics/track";

export default function GoalPage() {
  const { data, isLoading, isError, refetch } = useGoal();
  const { mutateAsync, isPending } = useSaveGoal();
  const toast = useToast();

  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Cel finansowy</h1>
      <GoalForm
        initial={data ?? { title: "", target: 0, deadline: "" }}
        onSubmit={async (v) => {
          await mutateAsync(v);
          toast.push({ type: "success", text: "Cel zapisany." });
          track("goal_save", { target: v.target });
        }}
      />
      {isPending && <p className="text-sm opacity-70 mt-2">Zapisywanie…</p>}
    </div>
  );
}
