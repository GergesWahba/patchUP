'use client';

import { create } from 'zustand';
import type { AuthResponse, UserDto } from '@patchup/shared';
import { api } from './api';

interface AuthState {
  user: UserDto | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (payload: AuthResponse) => void;
  hydrate: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  setSession: ({ token, user }) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('patchup-token', token);
    }

    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  },
  hydrate: async () => {
    if (typeof window === 'undefined') {
      set({ isLoading: false });
      return;
    }

    const token = window.localStorage.getItem('patchup-token');
    if (!token) {
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const response = await api.get('/auth/me');
      set({
        token,
        user: response.data.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      window.localStorage.removeItem('patchup-token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('patchup-token');
    }
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },
}));
