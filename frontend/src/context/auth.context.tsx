'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types/auth.types';
import { userService } from '@/services/user.service';
import { getApiErrorStatus } from '@/lib/errors';

interface AuthContextType {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: boolean
  isHydrated: boolean
  getUserById: (id: string) => Promise<User>
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{ user: User | null; token: string | null }>({ user: null, token: null });
  const [isHydrated, setIsHydrated] = useState(false);

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    let cancelled = false;

    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!storedToken || !storedUser) {
        if (storedToken || storedUser) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        if (!cancelled) setIsHydrated(true);
        return;
      }

      let parsedUser: User;
      try {
        parsedUser = JSON.parse(storedUser) as User;
      } catch (error) {
        console.error('Stored session is corrupted, clearing it:', error);
        logout();
        if (!cancelled) setIsHydrated(true);
        return;
      }

      setAuth({ token: storedToken, user: parsedUser });

      try {
        const freshUser = await userService.getCurrentUser();
        if (cancelled) return;

        setAuth({ token: storedToken, user: freshUser });
        localStorage.setItem('user', JSON.stringify(freshUser));
      } catch (error) {
        if (getApiErrorStatus(error) === 401) {
          console.error('Session expired, logging out:', error);
          logout();
        } else {
          console.warn('Session verification unavailable; using cached user.', error);
        }
      } finally {
        if (!cancelled) setIsHydrated(true);
      }
    };

    initializeAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = (user: User, token: string) => {
    setAuth({ user, token });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const getUserById = async (id: string): Promise<User> => {
    return userService.getUserById(id);
  };

  return (
    <AuthContext.Provider value={{ user: auth.user, token: auth.token, login, logout, isAuthenticated: !!auth.user, isHydrated, getUserById }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

