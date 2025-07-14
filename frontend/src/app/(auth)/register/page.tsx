// src/app/(auth)/register/page.tsx

import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-700 to-purple-900 px-4">
      <AuthForm />
    </main>
  );
}