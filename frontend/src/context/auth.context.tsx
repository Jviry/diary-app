'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types/auth.types';

interface AuthContextType {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: boolean
  isHydrated: boolean
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{ user: User | null; token: string | null }>({ user: null, token: null });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuth({ token: storedToken, user: JSON.parse(storedUser) });
    }
    setIsHydrated(true);
  }, []);

  const login = (user: User, token: string) => {
    setAuth({ user, token });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user: auth.user, token: auth.token, login, logout, isAuthenticated: !!auth.user, isHydrated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

