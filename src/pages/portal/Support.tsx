import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquareText, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function Support() {
  const { user, workerData } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSending(true);
    setError(null);
    
    try {
      const { error: functionError } = await supabase.functions.invoke('send-support-ticket', {
        body: {
          subject,
          message,
          worker_email: user.email,
          worker_name: workerData?.full_name || 'Worker'
        }
      });

      if (functionError) throw functionError;

      setSuccess(true);
      setSubject('');
      setMessage('');
      
      // Auto-hide success message after some seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error('Error sending support message:', err);
      setError(err.message || 'Failed to send message. Please try again or email us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-['Outfit'] text-slate-900 mb-2">Support Center</h1>
        <p className="text-slate-500">How can we help you today? Send us a message below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex gap-3 shadow-sm animate-in zoom-in duration-300">
              <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900">Failed to Send Message</h4>
                <p className="text-sm mt-1 text-red-700 text-opacity-90">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex gap-3 shadow-sm animate-in zoom-in duration-300">
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900">Message Sent Successfully!</h4>
                <p className="text-sm mt-1 text-green-700 text-opacity-90">Our team will get back to you at {user?.email} within 24-48 hours.</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Question about payment #1234"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Describe your issue in detail..."
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all hover:shadow hover:-translate-y-0.5"
                  >
                    {sending ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4 mr-2" /> Send Message</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex flex-col h-full">
            <MessageSquareText className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold font-['Outfit'] text-blue-900 mb-2">Direct Contact</h3>
            <p className="text-blue-800/80 mb-6 flex-1 text-sm">
              If you prefer to email us directly, you can reach out to our dedicated support team.
            </p>
            <a 
              href="mailto:jobs@scriptsplay.com" 
              className="text-blue-700 font-semibold hover:text-blue-800 hover:underline"
            >
              jobs@scriptsplay.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
