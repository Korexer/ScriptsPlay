import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const AccessGrantedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, workerData, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--secondary-gray)]">
        <Loader2 className="w-12 h-12 animate-spin text-[var(--accent-orange)]" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/spworkersportal101/login" state={{ from: location }} replace />;
  }

  if (workerData && !workerData.full_name && location.pathname !== '/spworkersportal101/profile') {
     return <Navigate to="/spworkersportal101/profile" replace />;
  }

  if (workerData && !workerData.access_granted) {
    return <Navigate to="/spworkersportal101/unlock-access" replace />;
  }

  return <>{children}</>;
};
