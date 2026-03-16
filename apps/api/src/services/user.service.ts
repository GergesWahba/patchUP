import type { UserRole } from '@patchup/shared';
import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/app-error.js';
import { HTTP_STATUS } from '../utils/http-status.js';
import { mapUser } from './user.mapper.js';

interface UpdateProfileInput {
  name?: string;
  phone?: string;
  city?: string;
  state?: string;
  address?: string;
  profileImage?: string;
  bio?: string;
  serviceCategories?: string[];
  serviceArea?: string;
  yearsOfExperience?: number;
  availabilityStatus?: 'available' | 'busy' | 'offline';
}

export const userService = {
  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User profile not found.', HTTP_STATUS.NOT_FOUND);
    }
    return mapUser(user);
  },

  async updateProfile(userId: string, role: UserRole, input: UpdateProfileInput) {
    const updates: Record<string, unknown> = {};

    if (input.name !== undefined) updates.name = input.name;
    if (input.phone !== undefined) updates.phone = input.phone;

    if (role === 'customer') {
      if (input.city !== undefined) updates['customerProfile.city'] = input.city;
      if (input.state !== undefined) updates['customerProfile.state'] = input.state;
      if (input.address !== undefined) updates['customerProfile.address'] = input.address;
      if (input.profileImage !== undefined) updates['customerProfile.profileImage'] = input.profileImage;
    }

    if (role === 'provider') {
      if (input.bio !== undefined) updates['providerProfile.bio'] = input.bio;
      if (input.serviceCategories !== undefined) {
        updates['providerProfile.serviceCategories'] = input.serviceCategories;
      }
      if (input.serviceArea !== undefined) updates['providerProfile.serviceArea'] = input.serviceArea;
      if (input.yearsOfExperience !== undefined) {
        updates['providerProfile.yearsOfExperience'] = input.yearsOfExperience;
      }
      if (input.availabilityStatus !== undefined) {
        updates['providerProfile.availabilityStatus'] = input.availabilityStatus;
      }
    }

    const updatedUser = await userRepository.updateById(userId, updates);

    if (!updatedUser) {
      throw new AppError('Unable to update profile.', HTTP_STATUS.NOT_FOUND);
    }

    return mapUser(updatedUser);
  },
};
