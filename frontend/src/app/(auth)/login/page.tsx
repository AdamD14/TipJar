import { LoginForm } from '@/components/auth/LoginForm';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div>
      <h2 className="text-center text-3xl font-heading text-white mb-6">Zaloguj się</h2>
      <LoginForm />
      <SocialLoginButtons />
      <p className="mt-6 text-center text-sm text-tipjar-gray-light">
        Nie masz konta?{' '}
        <Link href="/register" className="font-medium text-tipjar-gold hover:text-tipjar-gold-dark">
          Zarejestruj się
        </Link>
      </p>
    </div>
  );
}
