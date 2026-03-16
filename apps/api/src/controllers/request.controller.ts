import type { Request, Response } from 'express';
import { requestService } from '../services/request.service.js';
import { sendSuccess } from '../utils/api-response.js';
import { HTTP_STATUS } from '../utils/http-status.js';

export const requestController = {
  async create(req: Request, res: Response) {
    const result = await requestService.createRequest(req.user!.id, req.body);
    return sendSuccess(res, 'Service request created successfully.', result, HTTP_STATUS.CREATED);
  },

  async mine(req: Request, res: Response) {
    const result = await requestService.getMyRequests(req.user!.id, req.user!.role);
    return sendSuccess(res, 'Requests fetched successfully.', result);
  },

  async providerFeed(req: Request, res: Response) {
    const result = await requestService.getProviderFeed(req.user!.id, req.query as any);
    return sendSuccess(res, 'Provider feed fetched successfully.', result);
  },

  async getById(req: Request, res: Response) {
    const result = await requestService.getRequestById(
      String(req.params.id),
      req.user!.id,
      req.user!.role,
    );
    return sendSuccess(res, 'Request fetched successfully.', result);
  },

  async respond(req: Request, res: Response) {
    const result = await requestService.providerRespond(
      String(req.params.id),
      req.user!.id,
      req.body.action,
    );
    return sendSuccess(res, `Request ${req.body.action}ed successfully.`, result);
  },

  async updateStatus(req: Request, res: Response) {
    const result = await requestService.updateStatus(
      String(req.params.id),
      req.user!.id,
      req.body.status,
    );
    return sendSuccess(res, 'Request status updated successfully.', result);
  },
};
