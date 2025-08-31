import SubscriptionsList from '@/components/dashboard/SubscriptionsList';

export default function SubscriptionsPage() {
  const items = [{ fan: 'neo77', amount: 5, period: 'mies.' }];
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Subskrypcje</h1>
      <SubscriptionsList items={items} />
    </div>
  );
}
