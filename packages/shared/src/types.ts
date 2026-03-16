import type {
  AvailabilityStatus,
  RequestStatus,
  ServiceCategory,
  UrgencyLevel,
  UserRole,
} from './constants.js';

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface AuthUser {
  id: string;
  role: UserRole;
  email: string;
  name: string;
}

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
  availabilityStatus: AvailabilityStatus;
}

export interface UserDto extends AuthUser {
  phone?: string;
  customerProfile?: CustomerProfile;
  providerProfile?: ProviderProfile;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceRequestDto {
  id: string;
  customerId: string;
  providerId?: string | null;
  category: ServiceCategory;
  title: string;
  description: string;
  urgency: UrgencyLevel;
  location: string;
  preferredTime?: string;
  imageUrl?: string;
  status: RequestStatus;
  declinedProviderIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ConversationDto {
  id: string;
  requestId: string;
  participantIds: string[];
  lastMessageAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageDto {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export interface RequestFeedFilters {
  category?: ServiceCategory;
  status?: RequestStatus;
  location?: string;
  page?: number;
  limit?: number;
}
