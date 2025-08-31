import WithdrawalForm from '@/components/dashboard/WithdrawalForm';

export default function WithdrawalsPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Wypłaty</h1>
      <WithdrawalForm balance={342.5} onSubmit={async () => {}} />
    </div>
  );
}
