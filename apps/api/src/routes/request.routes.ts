import { Router } from 'express';
import { requestController } from '../controllers/request.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { validateBody, validateQuery } from '../middleware/validate.js';
import { asyncHandler } from '../utils/async-handler.js';
import {
  createRequestSchema,
  providerFeedQuerySchema,
  providerRespondSchema,
  updateStatusSchema,
} from '../validators/request.validator.js';

export const requestRouter = Router();

requestRouter.use(authenticate);
requestRouter.post('/', authorize('customer'), validateBody(createRequestSchema), asyncHandler(requestController.create));
requestRouter.get('/mine', authorize('customer', 'provider', 'admin'), asyncHandler(requestController.mine));
requestRouter.get(
  '/provider/feed',
  authorize('provider', 'admin'),
  validateQuery(providerFeedQuerySchema),
  asyncHandler(requestController.providerFeed),
);
requestRouter.get('/:id', authorize('customer', 'provider', 'admin'), asyncHandler(requestController.getById));
requestRouter.patch(
  '/:id/respond',
  authorize('provider', 'admin'),
  validateBody(providerRespondSchema),
  asyncHandler(requestController.respond),
);
requestRouter.patch(
  '/:id/status',
  authorize('provider', 'admin'),
  validateBody(updateStatusSchema),
  asyncHandler(requestController.updateStatus),
);
