import mongoose, { Schema } from 'mongoose';
import {
  REQUEST_STATUSES,
  SERVICE_CATEGORIES,
  URGENCY_LEVELS,
  type RequestStatus,
  type ServiceCategory,
  type UrgencyLevel,
} from '@patchup/shared';

export interface ServiceRequestDocument extends mongoose.Document {
  customerId: mongoose.Types.ObjectId;
  providerId?: mongoose.Types.ObjectId | null;
  category: ServiceCategory;
  title: string;
  description: string;
  urgency: UrgencyLevel;
  location: string;
  preferredTime?: string;
  imageUrl?: string;
  status: RequestStatus;
  declinedProviderIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const serviceRequestSchema = new Schema<ServiceRequestDocument>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    category: { type: String, enum: SERVICE_CATEGORIES, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    urgency: { type: String, enum: URGENCY_LEVELS, required: true },
    location: { type: String, required: true, trim: true },
    preferredTime: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    status: { type: String, enum: REQUEST_STATUSES, default: 'open' },
    declinedProviderIds: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  },
  { timestamps: true },
);

serviceRequestSchema.index({ category: 1, status: 1, location: 1 });

export const ServiceRequestModel = mongoose.model<ServiceRequestDocument>(
  'ServiceRequest',
  serviceRequestSchema,
);
