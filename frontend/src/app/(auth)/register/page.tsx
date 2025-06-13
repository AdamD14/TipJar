import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div>
      <h2 className="text-center text-3xl font-heading text-white mb-6">Zarejestruj się</h2>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-tipjar-gray-light">
        Masz już konto?{' '}
        <Link href="/login" className="font-medium text-tipjar-gold hover:text-tipjar-gold-dark">
          Zaloguj się
        </Link>
      </p>
    </div>
  );
}
