import { ServiceRequestModel } from '../models/ServiceRequest.js';

export const requestRepository = {
  create(data: Record<string, unknown>) {
    return ServiceRequestModel.create(data);
  },
  findById(id: string) {
    return ServiceRequestModel.findById(id).lean();
  },
  findCustomerRequests(customerId: string) {
    return ServiceRequestModel.find({ customerId }).sort({ createdAt: -1 }).lean();
  },
  findProviderRequests(providerId: string) {
    return ServiceRequestModel.find({ providerId }).sort({ updatedAt: -1 }).lean();
  },
  findFeed(filter: Record<string, unknown>, skip: number, limit: number) {
    return ServiceRequestModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  },
  countFeed(filter: Record<string, unknown>) {
    return ServiceRequestModel.countDocuments(filter);
  },
  updateById(id: string, updates: Record<string, unknown>) {
    return ServiceRequestModel.findByIdAndUpdate(id, updates, { new: true }).lean();
  },
};
