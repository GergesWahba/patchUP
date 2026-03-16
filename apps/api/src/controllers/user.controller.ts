import type { Request, Response } from 'express';
import { userService } from '../services/user.service.js';
import { sendSuccess } from '../utils/api-response.js';

export const userController = {
  async getProfile(req: Request, res: Response) {
    const result = await userService.getProfile(req.user!.id);
    return sendSuccess(res, 'Profile fetched successfully.', result);
  },

  async updateProfile(req: Request, res: Response) {
    const result = await userService.updateProfile(req.user!.id, req.user!.role, req.body);
    return sendSuccess(res, 'Profile updated successfully.', result);
  },
};
