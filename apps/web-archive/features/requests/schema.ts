import { SERVICE_CATEGORIES, URGENCY_LEVELS } from '@patchup/shared';
import { z } from 'zod';

export const requestSchema = z.object({
  category: z.enum(SERVICE_CATEGORIES),
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
  urgency: z.enum(URGENCY_LEVELS),
  location: z.string().min(2, 'Location is required.'),
  preferredTime: z.string().optional(),
  imageUrl: z.string().url('Image URL must be valid.').optional().or(z.literal('')),
});

export type RequestFormValues = z.infer<typeof requestSchema>;
