import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/apiClient';

/**
 * Displays the creator's current USDC balance.  On mount it
 * fetches the balance from the backend.  Should be rendered by
 * authenticated creator pages.  If no balance endpoint has been
 * implemented yet the component will simply show an error in the
 * console and display zero.
 */
export default function CreatorBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  useEffect(() => {
    async function fetchBalance() {
      try {
        // Assumes an endpoint exists at /api/v1/creator/wallet/balance which
        // returns { balance: number }
        const res = await apiClient.get('/creator/wallet/balance');
        setBalance(res.data.balance ?? 0);
      } catch (err) {
        console.error('Error fetching balance', err);
        setBalance(0);
      }
    }
    fetchBalance();
  }, []);
  if (balance === null) {
    return <div className="text-gray-500">Ładowanie salda...</div>;
  }
  return (
    <div className="p-4 bg-gray-50 border rounded">
      <p className="text-sm text-gray-700">Twoje saldo</p>
      <p className="text-2xl font-semibold">${balance.toFixed(2)}</p>
    </div>
  );
}