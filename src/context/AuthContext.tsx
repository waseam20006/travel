'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { initialUsers } from '@/data/initialUsers';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, pass: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Customer or saved user
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('jadoo_auth_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(initialUsers[3]); // Customer
      }
    } else {
      // Default to the demo customer account
      setUser(initialUsers[3]);
      localStorage.setItem('jadoo_auth_user', JSON.stringify(initialUsers[3]));
    }
  }, []);

  const login = (email: string): boolean => {
    const found = initialUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      localStorage.setItem('jadoo_auth_user', JSON.stringify(found));
      return true;
    }
    // Create new ad-hoc customer user if not found
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setUser(newUser);
    localStorage.setItem('jadoo_auth_user', JSON.stringify(newUser));
    return true;
  };

  const register = (name: string, email: string, _pass: string, role: UserRole = 'customer'): boolean => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setUser(newUser);
    localStorage.setItem('jadoo_auth_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jadoo_auth_user');
  };

  const switchRole = (newRole: UserRole) => {
    const matched = initialUsers.find(u => u.role === newRole) || {
      id: `user-${newRole}`,
      name: `Demo ${newRole.toUpperCase()}`,
      email: `${newRole}@jadoo.com`,
      role: newRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      createdAt: '2025-01-01',
      status: 'active' as const
    };
    setUser(matched);
    localStorage.setItem('jadoo_auth_user', JSON.stringify(matched));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
