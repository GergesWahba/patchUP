import type { ServiceCategory } from './request';

export const USER_ROLES = ['customer', 'provider', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface CustomerProfile {
  city?: string;
  state?: string;
  address?: string;
  profileImage?: string;
  savedRequestIds: string[];
}

export interface ProviderProfile {
  bio?: string;
  serviceCategories: ServiceCategory[];
  serviceArea?: string;
  yearsOfExperience?: number;
  rating?: number;
  availabilityStatus: 'available' | 'busy' | 'offline';
}

export interface User {
  id: string;
  role: UserRole;
  email: string;
  name: string;
  phone?: string;
  customerProfile?: CustomerProfile;
  providerProfile?: ProviderProfile;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: Exclude<UserRole, 'admin'>;
};
