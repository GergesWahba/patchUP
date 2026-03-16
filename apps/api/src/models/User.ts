import mongoose, { Schema } from 'mongoose';
import {
  AVAILABILITY_STATUSES,
  SERVICE_CATEGORIES,
  USER_ROLES,
  type AvailabilityStatus,
  type ServiceCategory,
  type UserRole,
} from '@patchup/shared';

interface CustomerProfile {
  city?: string;
  state?: string;
  address?: string;
  profileImage?: string;
  savedRequestIds: mongoose.Types.ObjectId[];
}

interface ProviderProfile {
  bio?: string;
  serviceCategories: ServiceCategory[];
  serviceArea?: string;
  yearsOfExperience?: number;
  rating?: number;
  availabilityStatus: AvailabilityStatus;
}

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  customerProfile?: CustomerProfile;
  providerProfile?: ProviderProfile;
  createdAt: Date;
  updatedAt: Date;
}

const customerProfileSchema = new Schema<CustomerProfile>(
  {
    city: String,
    state: String,
    address: String,
    profileImage: String,
    savedRequestIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ServiceRequest',
        default: [],
      },
    ],
  },
  { _id: false },
);

const providerProfileSchema = new Schema<ProviderProfile>(
  {
    bio: String,
    serviceCategories: [
      {
        type: String,
        enum: SERVICE_CATEGORIES,
        default: [],
      },
    ],
    serviceArea: String,
    yearsOfExperience: Number,
    rating: {
      type: Number,
      default: 5,
    },
    availabilityStatus: {
      type: String,
      enum: AVAILABILITY_STATUSES,
      default: 'available',
    },
  },
  { _id: false },
);

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, required: true },
    phone: { type: String, trim: true },
    customerProfile: customerProfileSchema,
    providerProfile: providerProfileSchema,
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
