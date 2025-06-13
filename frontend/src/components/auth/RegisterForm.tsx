'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import apiClient from '@/services/api';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('fan');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await apiClient.post('/auth/register', { email, password, displayName, role });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Wystąpił błąd podczas rejestracji.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-tipjar-gray-light">Nazwa wyświetlana</label>
        <input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required className="mt-1 block w-full bg-tipjar-turquoise-darker border-tipjar-turquoise rounded-md p-2 focus:border-tipjar-gold focus:ring focus:ring-tipjar-gold focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-tipjar-gray-light">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full bg-tipjar-turquoise-darker border-tipjar-turquoise rounded-md p-2 focus:border-tipjar-gold focus:ring focus:ring-tipjar-gold focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-tipjar-gray-light">Hasło</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full bg-tipjar-turquoise-darker border-tipjar-turquoise rounded-md p-2 focus:border-tipjar-gold focus:ring focus:ring-tipjar-gold focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-tipjar-gray-light mb-1">Rola</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block w-full bg-tipjar-turquoise-darker border-tipjar-turquoise rounded-md p-2">
          <option value="fan">Fan</option>
          <option value="creator">Twórca</option>
        </select>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" className="w-full" isLoading={isLoading} size="lg">
        Zarejestruj się
      </Button>
    </form>
  );
};
