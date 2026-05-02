import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Clock, DollarSign, PlayCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TaskBoard() {
  const { user, workerData } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false });

        if (error) console.error(error);
        if (data) setTasks(data);
      } catch (e) {
        console.error('Error loading tasks:', e);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  const handleClaimTask = async (taskId: string) => {
    if (!user) return;
    setClaiming(taskId);
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          status: 'claimed',
          worker_id: user.id
        })
        .eq('id', taskId);

      if (error) throw error;
      
      // Update local state to remove claimed task
      setTasks(tasks.filter(t => t.id !== taskId));
      
      // Navigate to task details
      navigate(`/spworkersportal101/task/${taskId}`);
    } catch (err: any) {
      alert(err.message || 'Failed to claim task');
      setClaiming(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  const baseRate = workerData?.role === 'Editor / Reviewer' ? 3.00 : workerData?.role === 'Professional' ? 2.40 : 1.80;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between pe-1">
        <div>
          <h1 className="text-3xl font-bold font-['Outfit'] text-slate-900">Available Tasks</h1>
          <p className="text-slate-500 mt-1">Claim a project below to begin working.</p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white border rounded-2xl p-12 text-center text-slate-500 shadow-sm border-slate-200">
          <PlayCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700 font-['Outfit'] mb-2">No tasks available right now</h3>
          <p>Check back later for new transcription projects.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => {
            const currentRate = Number(task.pay_rate) > 0 ? Number(task.pay_rate) : baseRate;
            const estimatedPay = task.duration_minutes * currentRate;

            return (
              <div key={task.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group flex flex-col">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold tracking-wide uppercase">
                      {task.task_type || 'Transcription'}
                    </span>
                    <span className="text-orange-600 font-bold font-['Outfit'] whitespace-nowrap">
                      ${estimatedPay.toFixed(2)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {task.title}
                  </h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="w-4 h-4 mr-2 text-slate-400" />
                      <span>{task.duration_minutes} minutes video</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                      <span>${currentRate.toFixed(2)} / minute</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleClaimTask(task.id)}
                  disabled={claiming === task.id}
                  className="w-full mt-auto flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {claiming === task.id ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Claim Task'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
