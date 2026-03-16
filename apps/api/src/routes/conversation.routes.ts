import { Router } from 'express';
import { conversationController } from '../controllers/conversation.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.js';
import { asyncHandler } from '../utils/async-handler.js';
import {
  createConversationSchema,
  sendMessageSchema,
} from '../validators/conversation.validator.js';

export const conversationRouter = Router();

conversationRouter.use(authenticate);
conversationRouter.get('/', asyncHandler(conversationController.list));
conversationRouter.post(
  '/',
  validateBody(createConversationSchema),
  asyncHandler(conversationController.create),
);
conversationRouter.get('/:id/messages', asyncHandler(conversationController.listMessages));
conversationRouter.post(
  '/:id/messages',
  validateBody(sendMessageSchema),
  asyncHandler(conversationController.sendMessage),
);
