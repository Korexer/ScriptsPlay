import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface WorkerData {
  id: string;
  email: string;
  full_name: string | null;
  country: string | null;
  role: string | null;
  paypal_email: string | null;
  payment_method: string | null;
  resume_url: string | null;
  access_granted: boolean;
  created_at: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  workerData: WorkerData | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshWorkerData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [workerData, setWorkerData] = useState<WorkerData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWorkerData = async (userId: string) => {
    console.log('Fetching worker data for:', userId);
    try {
      const { data, error } = await supabase
        .from('workers')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching worker data:', error);
        setWorkerData(null);
      } else {
        console.log('Worker data fetched successfully:', data);
        setWorkerData(data);
      }
    } catch (e) {
      console.error('Exception in fetchWorkerData:', e);
      setWorkerData(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('Initializing Auth Context...');
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Initial session check:', currentSession ? 'User found' : 'No user');
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // DON'T await here, let the initialization finish so the lock is released
          fetchWorkerData(currentSession.user.id);
        }
      } catch (error) {
        console.error('Auth Init Error:', error);
      } finally {
        console.log('Auth Initialization finished, setting loading to false.');
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth State Changed Event:', event);
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          console.log('Applying new session user, triggering worker data fetch...');
          // IMPORTANT: Do NOT await here. Awaiting in the listener can cause deadlocks
          // with the internal Supabase auth locks.
          fetchWorkerData(newSession.user.id);
        } else {
          console.log('No session, clearing worker data.');
          setWorkerData(null);
        }
        
        // Ensure loading is turned off once we have an initial event
        if (event !== 'INITIAL_SESSION') {
          console.log('Setting auth loading to false after auth state change (Event:', event, ')');
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const refreshWorkerData = async () => {
    if (user) {
      await fetchWorkerData(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, workerData, loading, signOut, refreshWorkerData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
