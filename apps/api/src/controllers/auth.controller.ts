import type { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { sendSuccess } from '../utils/api-response.js';
import { HTTP_STATUS } from '../utils/http-status.js';

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);
    return sendSuccess(res, 'Account created successfully.', result, HTTP_STATUS.CREATED);
  },

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body.email, req.body.password);
    return sendSuccess(res, 'Logged in successfully.', result);
  },

  async me(req: Request, res: Response) {
    const result = await authService.getCurrentUser(req.user!.id);
    return sendSuccess(res, 'Current user fetched successfully.', result);
  },
};
