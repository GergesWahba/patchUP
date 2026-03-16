import { REQUEST_STATUSES, SERVICE_CATEGORIES, URGENCY_LEVELS } from '@patchup/shared';
import { z } from 'zod';

export const createRequestSchema = z.object({
  category: z.enum(SERVICE_CATEGORIES),
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(1000),
  urgency: z.enum(URGENCY_LEVELS),
  location: z.string().min(2).max(160),
  preferredTime: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

export const providerRespondSchema = z.object({
  action: z.enum(['accept', 'decline']),
});

export const updateStatusSchema = z.object({
  status: z.enum(REQUEST_STATUSES).refine(
    (value) => ['accepted', 'in_progress', 'completed', 'canceled'].includes(value),
    'Providers can only set accepted, in_progress, completed, or canceled.',
  ),
});

export const providerFeedQuerySchema = z.object({
  category: z.enum(SERVICE_CATEGORIES).optional(),
  status: z.enum(REQUEST_STATUSES).optional(),
  location: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
