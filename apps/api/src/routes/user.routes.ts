import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.js';
import { asyncHandler } from '../utils/async-handler.js';
import {
  updateCustomerProfileSchema,
  updateProviderProfileSchema,
} from '../validators/user.validator.js';

export const userRouter = Router();

function validateProfileUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const schema =
    req.user?.role === 'provider' ? updateProviderProfileSchema : updateCustomerProfileSchema;

  return validateBody(schema)(req, res, next);
}

userRouter.use(authenticate);
userRouter.get('/profile', asyncHandler(userController.getProfile));
userRouter.patch('/profile', validateProfileUpdate, asyncHandler(userController.updateProfile));
