import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { HTTP_STATUS } from '../utils/http-status.js';

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed.',
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    req.body = result.data;
    next();
  };
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid query parameters.',
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    req.query = result.data as Request['query'];
    next();
  };
}
