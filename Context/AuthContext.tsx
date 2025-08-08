'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  ready: boolean; // ✅ اضافه شد
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  ready: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false); // ✅

  useEffect(() => {
    // فقط کلاینت به localStorage دسترسی دارد
    try {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {
      console.error('AuthContext localStorage read failed', e);
    } finally {
      setReady(true); // ✅ بعد از تلاش برای خواندن
    }
  }, []);

  const login = (u: User) => {
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
