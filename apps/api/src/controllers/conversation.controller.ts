import type { Request, Response } from 'express';
import { conversationService } from '../services/conversation.service.js';
import { sendSuccess } from '../utils/api-response.js';
import { HTTP_STATUS } from '../utils/http-status.js';

export const conversationController = {
  async list(req: Request, res: Response) {
    const result = await conversationService.listForUser(req.user!.id);
    return sendSuccess(res, 'Conversations fetched successfully.', result);
  },

  async create(req: Request, res: Response) {
    const result = await conversationService.createForRequest(req.body.requestId, req.user!.id);
    return sendSuccess(res, 'Conversation ready.', result, HTTP_STATUS.CREATED);
  },

  async listMessages(req: Request, res: Response) {
    const result = await conversationService.listMessages(String(req.params.id), req.user!.id);
    return sendSuccess(res, 'Messages fetched successfully.', result);
  },

  async sendMessage(req: Request, res: Response) {
    const result = await conversationService.sendMessage(
      String(req.params.id),
      req.user!.id,
      req.body.content,
    );
    return sendSuccess(res, 'Message sent successfully.', result, HTTP_STATUS.CREATED);
  },
};
