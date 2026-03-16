import { UserModel, type UserDocument } from '../models/User.js';

export const userRepository = {
  create(data: Partial<UserDocument>) {
    return UserModel.create(data);
  },
  findByEmail(email: string) {
    return UserModel.findOne({ email }).lean();
  },
  findById(id: string) {
    return UserModel.findById(id).lean();
  },
  updateById(id: string, updates: Record<string, unknown>) {
    return UserModel.findByIdAndUpdate(id, updates, { new: true }).lean();
  },
};
