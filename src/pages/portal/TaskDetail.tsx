import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { FileUp, Loader2, ArrowLeft, Clock, DollarSign, Calendar, Info, CheckCircle } from 'lucide-react';

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, workerData } = useAuth();
  
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchTask() {
      if (!id || !user) return;
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('id', id)
          .eq('worker_id', user.id) // Security check: must be claimed by this user
          .single();
          
        if (error) {
          console.error(error);
          navigate('/spworkersportal101/tasks');
          return;
        }
        
        setTask(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTask();
  }, [id, user, navigate]);

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !user) return;
    
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    // Validate file type
    const validExtensions = ['.docx', '.txt', '.srt'];
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!validExtensions.includes(extension)) {
      alert(`Invalid file format. Please upload: ${validExtensions.join(', ')}`);
      return;
    }

    setUploading(true);
    try {
      // 1. Upload file
      const filePath = `${user.id}/${task.id}_${Date.now()}${extension}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('submissions')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('submissions')
        .getPublicUrl(uploadData.path);

      // 2. Insert Submission record
      const { error: insertError } = await supabase
        .from('submissions')
        .insert({
          task_id: task.id,
          worker_id: user.id,
          file_url: publicUrl,
          notes: notes,
          status: 'pending_review'
        });

      if (insertError) throw insertError;

      // 3. Update Task status
      const { error: updateTaskError } = await supabase
        .from('tasks')
        .update({ status: 'submitted' })
        .eq('id', task.id);
        
      if (updateTaskError) throw updateTaskError;

      setSuccess(true);
      setTimeout(() => navigate('/spworkersportal101/dashboard'), 3000);

    } catch (err: any) {
      alert(err.message || 'Error submitting task');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!task) return null;

  const baseRate = workerData?.role === 'Editor / Reviewer' ? 3.00 : workerData?.role === 'Professional' ? 2.40 : 1.80;
  const currentRate = Number(task.pay_rate) > 0 ? Number(task.pay_rate) : baseRate;
  const estimatedPay = task.duration_minutes * currentRate;

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold font-['Outfit'] text-slate-900 mb-2">Submission Successful!</h2>
        <p className="text-slate-600 mb-6">Your work has been safely uploaded and is pending review.</p>
        <button onClick={() => navigate('/spworkersportal101/dashboard')} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button 
        onClick={() => navigate('/spworkersportal101/dashboard')} 
        className="flex items-center text-slate-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm w-fit border border-slate-200 font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
            <h1 className="text-2xl font-bold font-['Outfit'] text-slate-900 mb-6">
              {task.title}
            </h1>

            {task.video_url && (
              <div className="mb-6 rounded-xl overflow-hidden bg-slate-900 aspect-video relative">
                {/* Normally we would render a video player here based on task.video_url */}
                {task.video_url.includes('youtube.com') || task.video_url.includes('youtu.be') ? (
                  <iframe 
                    src={task.video_url.replace('watch?v=', 'embed/').split('&')[0]} 
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <Info className="w-12 h-12 text-slate-400 mb-4" />
                    <p className="font-medium text-lg">Video link provided</p>
                    <a href={task.video_url} target="_blank" rel="noopener noreferrer" className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors border border-blue-500">
                      Open in new tab
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="prose text-slate-600 max-w-none">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Instructions</h3>
              <p>Please provide a highly accurate transcription of the provided video/audio. Follow standard ScriptsPlay style guidelines unless specified otherwise. Keep timestamps every 2 minutes or upon speaker change if it's a multi-speaker file.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 font-['Outfit'] mb-4 text-lg">Task Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0 mr-4">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-0.5">Pay estimate</p>
                  <p className="font-bold text-slate-900 text-base">${estimatedPay.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 mr-4">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-0.5">Duration</p>
                  <p className="font-bold text-slate-900 text-base">{task.duration_minutes} mins</p>
                </div>
              </div>

              {task.deadline && (
                <div className="flex items-center text-sm">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0 mr-4">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-0.5">Deadline</p>
                    <p className="font-bold text-slate-900 text-base">{new Date(task.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 font-['Outfit'] mb-4 text-lg">Submit Work</h3>
            
            {task.status === 'claimed' ? (
              <form onSubmit={handleSubmitTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Transcript<br/>
                    <span className="text-xs text-slate-500 font-normal">Accepted: .docx, .txt, .srt</span>
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-8 h-8 mb-3 text-slate-400" />
                        <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span></p>
                      </div>
                      <input 
                        ref={fileInputRef} 
                        type="file" 
                        className="hidden" 
                        accept=".docx,.txt,.srt" 
                        required 
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes to Editor (Optional)</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Any specific challenges or unclear audio timestamps..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                >
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Task'}
                </button>
              </form>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                <p className="text-slate-600 font-medium">Task already submitted. Status: <span className="text-orange-600 capitalize">{task.status.replace('_', ' ')}</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
