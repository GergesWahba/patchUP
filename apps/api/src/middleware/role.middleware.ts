import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '@patchup/shared';
import { AppError } from '../utils/app-error.js';
import { HTTP_STATUS } from '../utils/http-status.js';

export function authorize(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required.', HTTP_STATUS.UNAUTHORIZED));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission for this action.', HTTP_STATUS.FORBIDDEN));
    }

    next();
  };
}
