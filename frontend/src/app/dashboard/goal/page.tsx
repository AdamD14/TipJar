import GoalForm from '@/components/dashboard/GoalForm';

export default function GoalPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Cel finansowy</h1>
      <GoalForm initial={{ title: 'Nowy mikrofon', target: 500, deadline: '' }} onSubmit={async () => {}} />
    </div>
  );
}
