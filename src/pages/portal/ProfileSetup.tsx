import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Loader2, Save, CheckCircle } from 'lucide-react';

export default function ProfileSetup() {
  const { user, workerData, refreshWorkerData } = useAuth();
  
  const [formData, setFormData] = useState({
    full_name: workerData?.full_name || '',
    country: workerData?.country || '',
    payment_method: workerData?.payment_method || 'PayPal',
    paypal_email: workerData?.paypal_email || '',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: updateError } = await supabase
        .from('workers')
        .update({
          full_name: formData.full_name,
          country: formData.country,
          payment_method: formData.payment_method,
          paypal_email: formData.paypal_email,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;
      
      await refreshWorkerData();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 mb-2">Profile Setup</h1>
        <p className="text-slate-500 mb-8">
          Please complete your profile details. Accurate information is required for payment processing.
        </p>

        {error && (
          <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg flex gap-3 items-center text-sm font-medium border border-green-200">
            <CheckCircle className="w-5 h-5" />
            Profile updated successfully
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.full_name}
                onChange={e => setFormData({...formData, full_name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.country}
                onChange={e => setFormData({...formData, country: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method</label>
              <select
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                value={formData.payment_method}
                onChange={e => setFormData({...formData, payment_method: e.target.value})}
              >
                <option value="PayPal">PayPal</option>
                <option value="Bank">Local Bank Transfer</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {formData.payment_method === 'PayPal' ? 'PayPal Email Address' : 'Bank Details (Bank Name, Account Number, etc.)'}
              </label>
              {formData.payment_method === 'PayPal' ? (
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.paypal_email}
                  onChange={e => setFormData({...formData, paypal_email: e.target.value})}
                />
              ) : (
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.paypal_email}
                  placeholder="e.g. Legal Name: John Doe&#10;Bank: Chase&#10;Account: 123456789&#10;Routing: 987654321"
                  onChange={e => setFormData({...formData, paypal_email: e.target.value})}
                ></textarea>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 gap-2"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
