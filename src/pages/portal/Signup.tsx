import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Mail, Lock, Loader2, ArrowRight, User } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Starting signup process for:', email);
    setLoading(true);
    setError(null);

    try {
      console.log('Sending signUp request to Supabase...');
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (signupError) {
        console.error('Signup error returned from Supabase:', signupError);
        throw signupError;
      }
      
      console.log('Signup successful, data:', data);
      setSuccess(true);
    } catch (err: any) {
      console.error('Caught error during signup:', err);
      let msg = err.message || 'Failed to sign up';
      if (msg.toLowerCase().includes('already registered')) {
        msg = 'This email is already registered. Please sign in instead.';
      }
      setError(msg);
    } finally {
      console.log('Signup process finished, stopping spinner.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-4 py-10 sm:px-6 lg:px-8 font-['Inter']">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={32} />
          </div>
          <h2 className="text-2xl font-bold font-['Outfit'] text-slate-900 mb-2">Registration Successful!</h2>
          <p className="text-slate-600 mb-6">
            Welcome to ScriptsPlay! Your account has been created successfully. Check your email for the next step.
          </p>
          <Link to="/spworkersportal101/login" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 shadow-sm transition-all hover:-translate-y-0.5 w-full">
            Login to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-4 py-10 sm:px-6 lg:px-8 font-['Inter']">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-2 mb-6">
          <span className="text-3xl font-['Outfit'] font-bold text-slate-900">
            <span className="text-orange-500">Scripts</span>Play
          </span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Apply to Work
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Join our global network of professional transcribers
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md w-full">
        <div className="bg-white py-7 px-4 shadow-xl shadow-slate-200/50 rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm font-medium border border-red-100 flex items-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all hover:-translate-y-0.5"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>Create Account <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">Already have an account? </span>
            <Link to="/spworkersportal101/login" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
