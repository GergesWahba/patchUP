import type { ServiceRequestDto } from '@patchup/shared';

export function mapRequest(request: any): ServiceRequestDto {
  return {
    id: String(request._id ?? request.id),
    customerId: String(request.customerId),
    providerId: request.providerId ? String(request.providerId) : null,
    category: request.category!,
    title: request.title ?? '',
    description: request.description ?? '',
    urgency: request.urgency!,
    location: request.location ?? '',
    preferredTime: request.preferredTime,
    imageUrl: request.imageUrl,
    status: request.status!,
    declinedProviderIds: (request.declinedProviderIds ?? []).map(String),
    createdAt: request.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: request.updatedAt?.toISOString() ?? new Date().toISOString(),
  };
}
