import { AVAILABILITY_STATUSES, SERVICE_CATEGORIES } from '@patchup/shared';
import { z } from 'zod';

export const updateCustomerProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
  profileImage: z.string().url().optional(),
});

export const updateProviderProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  bio: z.string().max(300).optional(),
  serviceCategories: z.array(z.enum(SERVICE_CATEGORIES)).optional(),
  serviceArea: z.string().optional(),
  yearsOfExperience: z.number().min(0).max(60).optional(),
  availabilityStatus: z.enum(AVAILABILITY_STATUSES).optional(),
});
