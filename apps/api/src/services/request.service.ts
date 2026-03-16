import type { RequestStatus, ServiceCategory, UserRole } from '@patchup/shared';
import { requestRepository } from '../repositories/request.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/app-error.js';
import { HTTP_STATUS } from '../utils/http-status.js';
import { getPagination } from '../utils/pagination.js';
import { mapRequest } from './request.mapper.js';

interface CreateRequestInput {
  category: ServiceCategory;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'asap';
  location: string;
  preferredTime?: string;
  imageUrl?: string;
}

interface ProviderFeedQuery {
  category?: ServiceCategory;
  status?: RequestStatus;
  location?: string;
  page?: string;
  limit?: string;
}

export const requestService = {
  async createRequest(customerId: string, input: CreateRequestInput) {
    const request = await requestRepository.create({
      ...input,
      customerId,
      status: 'open',
      declinedProviderIds: [],
    });

    return mapRequest(request.toObject());
  },

  async getMyRequests(userId: string, role: UserRole) {
    const requests =
      role === 'customer'
        ? await requestRepository.findCustomerRequests(userId)
        : await requestRepository.findProviderRequests(userId);

    return requests.map(mapRequest);
  },

  async getRequestById(requestId: string, userId: string, role: UserRole) {
    const request = await requestRepository.findById(requestId);
    if (!request) {
      throw new AppError('Request not found.', HTTP_STATUS.NOT_FOUND);
    }

    const isCustomerOwner = String(request.customerId) === userId;
    const isAssignedProvider = request.providerId && String(request.providerId) === userId;
    const isAdmin = role === 'admin';

    if (!isCustomerOwner && !isAssignedProvider && !isAdmin && role !== 'provider') {
      throw new AppError('You do not have access to this request.', HTTP_STATUS.FORBIDDEN);
    }

    return mapRequest(request);
  },

  async getProviderFeed(providerId: string, query: ProviderFeedQuery) {
    const provider = await userRepository.findById(providerId);
    if (!provider || provider.role !== 'provider') {
      throw new AppError('Provider profile not found.', HTTP_STATUS.NOT_FOUND);
    }

    const { page, limit, skip } = getPagination(query);

    const filter: Record<string, unknown> = {
      status: query.status ?? 'open',
      declinedProviderIds: { $ne: providerId },
      providerId: null,
    };

    const providerCategories = provider.providerProfile?.serviceCategories ?? [];
    if (query.category) {
      filter.category = query.category;
    } else if (providerCategories.length > 0) {
      filter.category = { $in: providerCategories };
    }

    if (query.location) {
      filter.location = { $regex: query.location, $options: 'i' };
    } else if (provider.providerProfile?.serviceArea) {
      filter.location = { $regex: provider.providerProfile.serviceArea, $options: 'i' };
    }

    const [items, total] = await Promise.all([
      requestRepository.findFeed(filter, skip, limit),
      requestRepository.countFeed(filter),
    ]);

    return {
      items: items.map(mapRequest),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  async providerRespond(requestId: string, providerId: string, action: 'accept' | 'decline') {
    const request = await requestRepository.findById(requestId);
    if (!request) {
      throw new AppError('Request not found.', HTTP_STATUS.NOT_FOUND);
    }

    if (action === 'accept') {
      if (request.providerId && String(request.providerId) !== providerId) {
        throw new AppError('This request has already been accepted.', HTTP_STATUS.CONFLICT);
      }

      const updated = await requestRepository.updateById(requestId, {
        providerId,
        status: 'accepted',
      });

      if (!updated) {
        throw new AppError('Unable to accept request.', HTTP_STATUS.BAD_REQUEST);
      }

      return mapRequest(updated);
    }

    const declinedProviders = new Set((request.declinedProviderIds ?? []).map(String));
    declinedProviders.add(providerId);

    const updated = await requestRepository.updateById(requestId, {
      declinedProviderIds: Array.from(declinedProviders),
    });

    if (!updated) {
      throw new AppError('Unable to decline request.', HTTP_STATUS.BAD_REQUEST);
    }

    return mapRequest(updated);
  },

  async updateStatus(requestId: string, providerId: string, status: RequestStatus) {
    const request = await requestRepository.findById(requestId);
    if (!request) {
      throw new AppError('Request not found.', HTTP_STATUS.NOT_FOUND);
    }

    if (!request.providerId || String(request.providerId) !== providerId) {
      throw new AppError('Only the assigned provider can update this request.', HTTP_STATUS.FORBIDDEN);
    }

    const updated = await requestRepository.updateById(requestId, { status });
    if (!updated) {
      throw new AppError('Unable to update request status.', HTTP_STATUS.BAD_REQUEST);
    }

    return mapRequest(updated);
  },
};
