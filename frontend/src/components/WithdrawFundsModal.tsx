import { useState } from 'react';
import { apiClient } from '@/lib/apiClient';

interface WithdrawFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * A modal component allowing a creator to withdraw funds from their
 * managed Circle wallet to an external address.  Requires that
 * `/creator/payout` endpoint exists which accepts `{ amount,
 * destinationAddress }`.  Displays a simple form with an amount and
 * destination address.  On submit it triggers the payout and
 * displays any returned errors.  After success, it closes the
 * modal.
 */
export default function WithdrawFundsModal({ isOpen, onClose }: WithdrawFundsModalProps) {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleWithdraw = async () => {
    setError(null);
    setLoading(true);
    try {
      await apiClient.post('/creator/payout', { amount, destinationAddress: address });
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const apiError = err as { response?: { data?: { message?: string } } };
      setError(apiError.response?.data?.message || 'Wystąpił błąd podczas wypłaty.');
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Wypłać środki</h2>
        <div className="mb-3">
          <label className="block text-sm mb-1">Kwota (USDC)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm mb-1">Adres docelowy</label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="0x..."
          />
        </div>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600"
            disabled={loading}
          >
            Anuluj
          </button>
          <button
            onClick={handleWithdraw}
            className="px-4 py-2 rounded bg-blue-600 text-white"
            disabled={loading || !amount || !address}
          >
            {loading ? 'Przetwarzanie...' : 'Wypłać'}
          </button>
        </div>
      </div>
    </div>
  );
}
