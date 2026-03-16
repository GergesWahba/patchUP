import bcrypt from 'bcryptjs';
import type { AuthResponse, UserRole } from '@patchup/shared';
import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/app-error.js';
import { HTTP_STATUS } from '../utils/http-status.js';
import { signToken } from '../utils/jwt.js';
import { mapUser } from './user.mapper.js';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const existingUser = await userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new AppError('An account already exists for that email.', HTTP_STATUS.CONFLICT);
    }

    const password = await bcrypt.hash(input.password, 10);
    const user = await userRepository.create({
      ...input,
      password,
      customerProfile:
        input.role === 'customer'
          ? {
              savedRequestIds: [],
            }
          : undefined,
      providerProfile:
        input.role === 'provider'
          ? {
              serviceCategories: [],
              availabilityStatus: 'available',
              rating: 5,
            }
          : undefined,
    });

    const mappedUser = mapUser(user.toObject());
    const token = signToken({
      id: mappedUser.id,
      name: mappedUser.name,
      email: mappedUser.email,
      role: mappedUser.role,
    });

    return { token, user: mappedUser };
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email or password.', HTTP_STATUS.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError('Invalid email or password.', HTTP_STATUS.UNAUTHORIZED);
    }

    const mappedUser = mapUser(user);
    const token = signToken({
      id: mappedUser.id,
      name: mappedUser.name,
      email: mappedUser.email,
      role: mappedUser.role,
    });

    return { token, user: mappedUser };
  },

  async getCurrentUser(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', HTTP_STATUS.NOT_FOUND);
    }

    return mapUser(user);
  },
};
