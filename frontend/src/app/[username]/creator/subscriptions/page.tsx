"use client";
import SubscriptionsList from "@/components/community/SubscriptionsList";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { useCreatorSubscriptions } from "@/lib/api/queries";

export default function SubscriptionsPage() {
  const { data, isLoading, isError, refetch } = useCreatorSubscriptions();

  if (isLoading) return <LoadingSkeleton lines={6} />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Subskrypcje</h1>
      <SubscriptionsList items={data} />
    </div>
  );
}
