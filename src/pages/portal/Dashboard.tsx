import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Star, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function Dashboard() {
  const { workerData, user } = useAuth();
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    tasksPending: 0,
    totalEarnings: 0,
    accuracy: '100%' // Mocked for now, as no rating field in schema
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      console.log('Dashboard: Loading data for user:', user?.id);
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('Dashboard: Fetching submissions and payments...');
        const [submissionsRes, paymentsRes] = await Promise.all([
          supabase.from('submissions').select('id, status').eq('worker_id', user.id),
          supabase.from('payments').select('amount').eq('worker_id', user.id).eq('status', 'paid')
        ]);
        
        const submissions = submissionsRes.data;
        const payments = paymentsRes.data;
          
        let completed = 0;
        let pending = 0;
        submissions?.forEach(sub => {
          if (sub.status === 'approved' || sub.status === 'paid') completed++;
          else pending++;
        });
        
        const earnings = payments?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
        
        console.log('Dashboard: Data processed. Completed:', completed, 'Pending:', pending, 'Earnings:', earnings);
        setStats(prev => ({
          ...prev,
          tasksCompleted: completed,
          tasksPending: pending,
          totalEarnings: earnings
        }));
      } catch (e) {
        console.error('Dashboard: Error loading data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [user]);

  if (loading) {
    return <div className="animate-pulse space-y-8">
      <div className="h-32 bg-slate-200 rounded-2xl w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>)}
      </div>
    </div>;
  }

  return (
    <div className="space-y-6 md:space-y-8 pb-12">
      {/* Welcome Panel */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] rounded-3xl p-5 sm:p-6 md:p-10 shadow-xl shadow-blue-900/10 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f97316]/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-['Outfit'] font-bold mb-2 tracking-tight">
            <span className="text-white">Welcome back, </span><span className="text-[#f97316]">{workerData?.full_name?.split(' ')[0] || 'Worker'}</span>
          </h1>
          <p className="text-blue-100 text-base sm:text-lg mb-5 sm:mb-6 max-w-xl">
            Here's what's happening with your transcription tasks today.
          </p>
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/10 border border-white/20 backdrop-blur-md">
              <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
              Role: {workerData?.role === 'transcriber' ? 'Transcriber' : (workerData?.role || 'Entry Level')}
            </span>
            {workerData?.access_granted ? (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Access Status: Active
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-red-500/20 text-red-300 border border-red-500/30 backdrop-blur-md">
                <ShieldAlert className="w-4 h-4 mr-2" />
                Access Locked
              </span>
            )}
          </div>
        </div>
      </div>

      {!workerData?.access_granted && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 font-['Outfit'] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-500" /> Action Required
            </h3>
            <p className="text-slate-600 mt-1">Unlock your portal with your access code to start viewing and claiming tasks.</p>
          </div>
          <Link to="/spworkersportal101/unlock-access" className="w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium text-white bg-orange-500 hover:bg-orange-600 shadow-sm shadow-orange-500/30 transition-all hover:-translate-y-0.5 shrink-0">
            Unlock Now
          </Link>
        </div>
      )}

      {/* Stats */}
      <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 mb-4 px-1">Worker Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Tasks Completed', value: stats.tasksCompleted, icon: <CheckCircle2 className="w-6 h-6 text-green-500" />, bg: 'bg-green-50' },
          { label: 'Tasks Pending', value: stats.tasksPending, icon: <Clock className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Total Earnings', value: `$${stats.totalEarnings.toFixed(2)}`, icon: <DollarSign className="w-6 h-6 text-orange-500" />, bg: 'bg-orange-50' },
          { label: 'Accuracy Rating', value: stats.accuracy, icon: <Star className="w-6 h-6 text-yellow-500" />, bg: 'bg-yellow-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
            <div className={`p-4 rounded-xl ${stat.bg} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="pt-4">
        <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 mb-4 px-1">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { to: '/spworkersportal101/tasks', label: 'View Tasks', requireAccess: true },
            { to: '/spworkersportal101/earnings', label: 'View Earnings', requireAccess: true },
            { to: '/spworkersportal101/profile', label: 'My Profile', requireAccess: false },
            { to: '/spworkersportal101/support', label: 'Get Support', requireAccess: false }
          ].map((link, i) => (
            <Link 
              key={i} 
              to={link.to}
              className={`flex items-center justify-between p-4 rounded-xl font-medium transition-all group border ${
                link.requireAccess && !workerData?.access_granted 
                  ? 'bg-slate-50 text-slate-400 border-slate-200 pointer-events-none opacity-60' 
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-md hover:text-blue-600'
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
