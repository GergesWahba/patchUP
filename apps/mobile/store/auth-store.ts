import { create } from 'zustand';
import type { LoginPayload, RegisterPayload, User } from '../types';
import { getCurrentUser, login, register } from '../services/api';
import { clearToken, getToken, saveToken } from '../services/storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isHydrating: boolean;
  signIn: (payload: LoginPayload) => Promise<void>;
  signUp: (payload: RegisterPayload) => Promise<void>;
  bootstrap: () => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isHydrating: true,
  signIn: async (payload) => {
    const response = await login(payload);
    await saveToken(response.token);
    set({ user: response.user, token: response.token, isHydrating: false });
  },
  signUp: async (payload) => {
    const response = await register(payload);
    await saveToken(response.token);
    set({ user: response.user, token: response.token, isHydrating: false });
  },
  bootstrap: async () => {
    const token = await getToken();

    if (!token) {
      set({ user: null, token: null, isHydrating: false });
      return;
    }

    try {
      const user = await getCurrentUser();
      set({ user, token, isHydrating: false });
    } catch {
      await clearToken();
      set({ user: null, token: null, isHydrating: false });
    }
  },
  refreshUser: async () => {
    const token = await getToken();
    if (!token) {
      set({ user: null, token: null });
      return;
    }

    const user = await getCurrentUser();
    set({ user, token });
  },
  logout: async () => {
    await clearToken();
    set({ user: null, token: null, isHydrating: false });
  },
}));
