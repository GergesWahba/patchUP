import axios from 'axios';
import type {
  ApiSuccess,
  AuthResponse,
  CreateRequestPayload,
  LoginPayload,
  PaginatedResponse,
  RegisterPayload,
  RequestStatus,
  ServiceRequest,
  User,
} from '../types';
import { getToken } from './storage';

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function unwrap<T>(promise: Promise<{ data: ApiSuccess<T> }>) {
  const response = await promise;
  return response.data.data;
}

export function login(payload: LoginPayload) {
  return unwrap<AuthResponse>(api.post('/auth/login', payload));
}

export function register(payload: RegisterPayload) {
  return unwrap<AuthResponse>(api.post('/auth/register', payload));
}

export function getCurrentUser() {
  return unwrap<User>(api.get('/auth/me'));
}

export function createRequest(payload: CreateRequestPayload) {
  return unwrap<ServiceRequest>(api.post('/requests', payload));
}

export function fetchRequests() {
  return unwrap<ServiceRequest[]>(api.get('/requests/mine'));
}

export function fetchProviderFeed(params?: { category?: string; location?: string }) {
  return unwrap<PaginatedResponse<ServiceRequest>>(api.get('/requests/provider/feed', { params }));
}

export function fetchRequestById(requestId: string) {
  return unwrap<ServiceRequest>(api.get(`/requests/${requestId}`));
}

export function acceptJob(requestId: string) {
  return unwrap<ServiceRequest>(api.patch(`/requests/${requestId}/respond`, { action: 'accept' }));
}

export function declineJob(requestId: string) {
  return unwrap<ServiceRequest>(api.patch(`/requests/${requestId}/respond`, { action: 'decline' }));
}

export function updateRequestStatus(requestId: string, status: RequestStatus) {
  return unwrap<ServiceRequest>(api.patch(`/requests/${requestId}/status`, { status }));
}

export function updateProfile(payload: Record<string, unknown>) {
  return unwrap<User>(api.patch('/users/profile', payload));
}
