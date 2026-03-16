import type { UserDto } from '@patchup/shared';

export function mapUser(user: any): UserDto {
  const userId = String(user._id ?? user.id);

  return {
    id: userId,
    name: user.name ?? '',
    email: user.email ?? '',
    role: user.role!,
    phone: user.phone,
    customerProfile: user.customerProfile
      ? {
          ...user.customerProfile,
          savedRequestIds: (user.customerProfile.savedRequestIds ?? []).map(String),
        }
      : undefined,
    providerProfile: user.providerProfile
      ? {
          ...user.providerProfile,
          rating: user.providerProfile.rating ?? 5,
        }
      : undefined,
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
  };
}
