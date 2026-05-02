import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Loader2, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

export default function Earnings() {
  const { user, workerData } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEarnings() {
      if (!user) return;
      try {
        const { data: subData, error: subError } = await supabase
          .from('submissions')
          .select(`
            *,
            task:tasks(title, duration_minutes, pay_rate)
          `)
          .eq('worker_id', user.id)
          .order('submitted_at', { ascending: false });

        if (subError) console.error(subError);
        if (subData) setSubmissions(subData);

        const { data: payData, error: payError } = await supabase
          .from('payments')
          .select('*')
          .eq('worker_id', user.id);

        if (payError) console.error(payError);
        if (payData) setPayments(payData);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadEarnings();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  const baseRate = workerData?.role === 'Editor / Reviewer' ? 3.00 : workerData?.role === 'Professional' ? 2.40 : 1.80;

  // Calculate stats
  let totalEarned = 0;
  let pendingPayment = 0;
  let paidEarnings = 0;

  submissions.forEach(sub => {
    if (!sub.task) return;
    const currentRate = Number(sub.task.pay_rate) > 0 ? Number(sub.task.pay_rate) : baseRate;
    const amount = sub.task.duration_minutes * currentRate;
    
    // Simplification for MVP: If status is 'approved' and not in payments, it's pending payment.
    if (sub.status === 'approved' || sub.status === 'paid') {
        totalEarned += amount;
    }
  });

  payments.forEach(p => {
    if (p.status === 'paid') paidEarnings += Number(p.amount);
    else pendingPayment += Number(p.amount); 
  });

  // Since payments table might not perfectly map 1:1 if admin didn't generate it, 
  // let's use a simpler heuristic for pending:
  pendingPayment = totalEarned - paidEarnings;
  if (pendingPayment < 0) pendingPayment = 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-['Outfit'] text-slate-900 mb-2">Earnings & Payments</h1>
        <p className="text-slate-500">Track your completed work and upcoming payments.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Earned (All Time)</p>
          <h2 className="text-3xl font-bold text-slate-900 font-['Outfit']">${totalEarned.toFixed(2)}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Pending Payment</p>
          <h2 className="text-3xl font-bold text-slate-900 font-['Outfit']">${pendingPayment.toFixed(2)}</h2>
          <p className="text-xs text-slate-400 mt-2">Will be deposited to {workerData?.payment_method}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Paid</p>
          <h2 className="text-3xl font-bold text-slate-900 font-['Outfit']">${paidEarnings.toFixed(2)}</h2>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-900 font-['Outfit'] text-lg">Work History</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 border-b border-slate-200">Task Name</th>
                <th className="px-6 py-4 border-b border-slate-200">Date</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Minutes</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Rate</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Amount</th>
                <th className="px-6 py-4 border-b border-slate-200">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No submitted tasks found.
                  </td>
                </tr>
              ) : (
                submissions.map(sub => {
                  const task = sub.task || {};
                  const currentRate = Number(task.pay_rate) > 0 ? Number(task.pay_rate) : baseRate;
                  const estimatedPay = (task.duration_minutes || 0) * currentRate;

                  // Status badge logic
                  let statusColor = "bg-slate-100 text-slate-700 border-slate-200";
                  if (sub.status === 'pending_review') statusColor = "bg-yellow-50 text-yellow-700 border-yellow-200";
                  else if (sub.status === 'approved') statusColor = "bg-green-50 text-green-700 border-green-200";
                  else if (sub.status === 'paid') statusColor = "bg-emerald-50 text-emerald-800 border-emerald-200";

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 w-1/3">
                        <div className="truncate max-w-[250px]" title={task.title || 'Unknown Task'}>
                          {task.title || 'Unknown Task'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                        {new Date(sub.submitted_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-slate-700 text-right font-medium">
                        {task.duration_minutes || 0}
                      </td>
                      <td className="px-6 py-4 text-slate-700 text-right">
                        ${currentRate.toFixed(2)}/m
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-bold text-right">
                        ${estimatedPay.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize border ${statusColor}`}>
                          {sub.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
