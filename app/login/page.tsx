'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '@/lib/firebase/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await loginUser(email, password);
        router.push('/dashboard');
      } else {
        await registerUser(email, password, displayName);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Er is een fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-100/50 p-8 md:p-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-3xl font-light tracking-wide text-rose-900">Hoek</h1>
            </Link>
            <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full mb-6"></div>
            <h2 className="text-3xl font-light text-rose-900 tracking-wide">
              {isLogin ? 'Welkom terug' : 'Begin je avontuur'}
            </h2>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-light">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="display-name" className="block text-sm font-light text-rose-700 mb-2">
                    Naam
                  </label>
                  <input
                    id="display-name"
                    name="display-name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-rose-200/50 bg-white/60 backdrop-blur-sm rounded-2xl placeholder-rose-300 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400 transition-all font-light"
                    placeholder="Je volledige naam"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label htmlFor="email-address" className="block text-sm font-light text-rose-700 mb-2">
                  E-mailadres
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-rose-200/50 bg-white/60 backdrop-blur-sm rounded-2xl placeholder-rose-300 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400 transition-all font-light"
                  placeholder="jouw@email.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-light text-rose-700 mb-2">
                  Wachtwoord
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-rose-200/50 bg-white/60 backdrop-blur-sm rounded-2xl placeholder-rose-300 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400 transition-all font-light"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-6 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Bezig...' : isLogin ? 'Inloggen' : 'Registreren'}
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-rose-600 hover:text-rose-700 font-light text-sm transition-colors"
              >
                {isLogin
                  ? 'Nog geen account? Registreer hier'
                  : 'Al een account? Log hier in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

