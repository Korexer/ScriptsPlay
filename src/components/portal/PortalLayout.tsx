import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  WalletCards, 
  User, 
  LifeBuoy, 
  LogOut, 
  Menu, 
  X,
  LockKeyhole
} from 'lucide-react';
import { TaskCompletionPopup } from './TaskCompletionPopup';

export const PortalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { workerData, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/spworkersportal101/login');
  };

  const navItems = [
    { path: '/spworkersportal101/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/spworkersportal101/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/spworkersportal101/tasks', label: 'Tasks', icon: <Briefcase size={20} />, requiresAccess: true },
    { path: '/spworkersportal101/earnings', label: 'Earnings', icon: <WalletCards size={20} />, requiresAccess: true },
    { path: '/spworkersportal101/support', label: 'Support', icon: <LifeBuoy size={20} /> },
    { path: '/spworkersportal101/unlock-access', label: 'Workspace', icon: <LockKeyhole size={20} />, hideIfAccessGranted: true }
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-['Inter']">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-[#0f172a] text-white w-[88vw] max-w-64 flex flex-col z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:w-64 md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <Link to="/spworkersportal101/dashboard" className="text-2xl font-['Outfit'] font-bold tracking-tight flex items-center gap-2">
            <span className="text-[#f97316]">Scripts</span>Play
          </Link>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            if (item.requiresAccess && workerData && !workerData.access_granted) return null;
            if (item.hideIfAccessGranted && workerData?.access_granted) return null;
            
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#1e3a8a] text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="mb-4 flex items-center gap-3 px-4">
            <div className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center font-bold text-white uppercase shadow-lg">
              {workerData?.full_name?.charAt(0) || workerData?.email?.charAt(0) || 'W'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{workerData?.full_name || 'Worker'}</p>
              <p className="text-xs text-gray-400 truncate">{workerData?.role === 'transcriber' ? 'Transcriber' : (workerData?.role || 'Entry Level')}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col md:ml-64 min-h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 min-h-16 flex items-center px-4 md:px-8 py-3 md:py-0 shrink-0 justify-between md:justify-end sticky top-0 z-30 shadow-sm">
          <button 
            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {!workerData?.access_granted && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-red-100 text-red-800 border border-red-200 shadow-sm">
                Unlock Required
              </span>
            )}
            {workerData?.access_granted && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-green-100 text-green-800 border border-green-200 shadow-sm">
                Access Active
              </span>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
            {children}
          </div>
        </div>
        <TaskCompletionPopup />
      </main>
    </div>
  );
};
