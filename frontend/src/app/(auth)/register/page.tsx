"use client";
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Wallet, Users } from 'lucide-react';

export default function AuthForm() {
  const [tab, setTab] = useState('register');
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Wszystkie pola są wymagane');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków');
      return false;
    }
    
    if (tab === 'register' && formData.password !== formData.confirmPassword) {
      setError('Hasła nie są identyczne');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Podaj prawidłowy adres email');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Simulate success
      alert(tab === 'login' ? 'Zalogowano pomyślnie!' : 'Konto zostało utworzone!');
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Logowanie przez ${provider} - funkcja w przygotowaniu`);
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-700 to-purple-900 px-4">
      <div className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg">
            TipJar
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 overflow-hidden rounded-xl border border-teal-400/30 bg-teal-900/20">
          <button
            className={`flex-1 py-3 font-semibold text-sm sm:text-base transition-all duration-200 ${
              tab === 'login'
                ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg'
                : 'text-white hover:bg-teal-500/20'
            }`}
            onClick={() => setTab('login')}
            type="button"
          >
            Zaloguj się
          </button>
          <button
            className={`flex-1 py-3 font-semibold text-sm sm:text-base transition-all duration-200 ${
              tab === 'register'
                ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg'
                : 'text-white hover:bg-teal-500/20'
            }`}
            onClick={() => setTab('register')}
            type="button"
          >
            Zarejestruj się
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-2 font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                placeholder="np. jan@tipjar.pl"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-white text-sm mb-2 font-medium">
              Hasło
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type={showPwd ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                placeholder="Wpisz hasło"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-300 transition-colors"
                onClick={() => setShowPwd(!showPwd)}
                aria-label={showPwd ? 'Ukryj hasło' : 'Pokaż hasło'}
              >
                {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {tab === 'register' && (
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-white text-sm mb-2 font-medium">
                Powtórz hasło
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPwd2 ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/60 border border-teal-400/40 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                  placeholder="Powtórz hasło"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-300 transition-colors"
                  onClick={() => setShowPwd2(!showPwd2)}
                  aria-label={showPwd2 ? 'Ukryj hasło' : 'Pokaż hasło'}
                >
                  {showPwd2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/30 border border-red-500/50 rounded-lg p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Ładowanie...
              </span>
            ) : (
              tab === 'login' ? 'Zaloguj się' : 'Zarejestruj się'
            )}
          </button>

          {tab === 'login' && (
            <div className="text-right text-sm">
              <button
                type="button"
                className="text-teal-400 hover:text-teal-300 hover:underline transition-colors"
                onClick={() => alert('Funkcja resetowania hasła w przygotowaniu')}
              >
                Zapomniałeś hasła?
              </button>
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-white/60 text-sm relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative bg-teal-900/60 px-4">lub</div>
        </div>

        {/* Social Login */}
        <div className="flex flex-col gap-3">
          <button 
            type="button"
            onClick={() => handleSocialLogin('Google')}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60"
          >
            <Mail className="w-5 h-5" /> Kontynuuj przez Google
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin('Twitch')}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-purple-600/70 hover:bg-purple-600/90 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-purple-500/30 hover:border-purple-400/50 disabled:opacity-60"
          >
            <Users className="w-5 h-5" /> Kontynuuj przez Twitch
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin('Web3')}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 transition-all text-white font-semibold rounded-lg py-3 text-sm border border-white/10 hover:border-white/20 disabled:opacity-60"
          >
            <Wallet className="w-5 h-5" /> Zaloguj przez portfel (Web3)
          </button>
        </div>

        {/* Switch tabs */}
        <div className="text-center mt-6 text-sm text-white/70">
          {tab === 'login' ? (
            <>
              Nie masz konta?{' '}
              <button
                type="button"
                className="text-teal-400 hover:text-teal-300 underline transition-colors"
                onClick={() => setTab('register')}
              >
                Zarejestruj się
              </button>
            </>
          ) : (
            <>
              Masz już konto?{' '}
              <button
                type="button"
                className="text-teal-400 hover:text-teal-300 underline transition-colors"
                onClick={() => setTab('login')}
              >
                Zaloguj się
              </button>
            </>
          )}
        </div>

        {/* Footer Links */}
        <div className="text-center text-xs mt-4 text-white/50">
          <button 
            type="button"
            className="underline decoration-dotted hover:text-white/80 transition-colors"
            onClick={() => alert('Regulamin - funkcja w przygotowaniu')}
          >
            Regulamin
          </button>
          {' · '}
          <button 
            type="button"
            className="underline decoration-dotted hover:text-white/80 transition-colors"
            onClick={() => alert('Polityka Prywatności - funkcja w przygotowaniu')}
          >
            Polityka Prywatności
          </button>
        </div>
      </div>
    </main>
  );
}