import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Loader2, KeyRound, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UnlockAccess() {
  const { user, workerData, refreshWorkerData } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      // In MVP, we have a hardcoded check or simple secret check.
      // Based on the spec: "Example code: SCRIPTSPRO2026"
      if (code.trim().toUpperCase() === 'SCRIPTSPRO2026') {
        const { error: updateError } = await supabase
          .from('workers')
          .update({ access_granted: true })
          .eq('id', user.id);

        if (updateError) throw updateError;

        await refreshWorkerData();
        navigate('/spworkersportal101/tasks');
      } else {
        setError('Invalid access code. Please check and try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Error unlocking portal');
    } finally {
      setLoading(false);
    }
  };

  if (workerData?.access_granted) {
    return (
      <div className="max-w-md mx-auto text-center py-20 animate-in fade-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-200">
          <KeyRound size={40} />
        </div>
        <h2 className="text-3xl font-bold font-['Outfit'] text-slate-900 mb-4">Access Granted!</h2>
        <p className="text-slate-600 mb-8">Your account is already unlocked and ready to claim tasks.</p>
        <button 
          onClick={() => navigate('/spworkersportal101/tasks')}
          className="inline-flex justify-center items-center py-3 px-8 rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          View Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto py-12 px-4 shadow-sm min-h-[70vh]">
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 w-full shadow-xl shadow-slate-200/50 border border-slate-200 text-center relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 space-y-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 mb-6 transform -rotate-6">
            <KeyRound size={32} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900">Unlock Workspace</h1>
          
          <p className="text-slate-600">
            Enter the special access code provided to you after certification to unlock the task board.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4 pt-4">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200 flex items-start gap-2 text-left animate-in shake">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span className="flex-1 mt-0.5">{error}</span>
              </div>
            )}
            
            <div className="relative">
              <input
                type="text"
                required
                className="w-full px-4 sm:px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-0 focus:border-orange-500 text-center text-lg sm:text-xl font-bold font-mono tracking-[0.2em] sm:tracking-widest text-slate-800 placeholder-slate-300 transition-colors uppercase outline-none"
                placeholder="ENTER CODE"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !code}
              className="w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-lg shadow-orange-500/20 text-md font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-all hover:-translate-y-1"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Verify Access'}
            </button>
          </form>

          <div className="pt-6 border-t border-slate-100 mt-8">
            <p className="text-sm text-slate-500">
              Don't have a code? <button onClick={() => navigate('/spworkersportal101/support')} className="text-blue-600 font-semibold hover:underline bg-transparent border-0 cursor-pointer">Contact Support</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
