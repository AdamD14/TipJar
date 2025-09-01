import { redirect } from 'next/navigation';

export default function SignupRedirectPage() {
  // Aligns legacy /signup to current register route
  redirect('/(auth)/register');
}

