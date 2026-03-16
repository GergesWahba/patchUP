import type { Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/http-status.js';

export function notFoundHandler(req: Request, res: Response) {
  return res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} was not found.`,
  });
}
