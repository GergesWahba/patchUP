import { conversationRepository } from '../repositories/conversation.repository.js';
import { requestRepository } from '../repositories/request.repository.js';
import { AppError } from '../utils/app-error.js';
import { HTTP_STATUS } from '../utils/http-status.js';
import { mapConversation, mapMessage } from './conversation.mapper.js';

export const conversationService = {
  async listForUser(userId: string) {
    const conversations = await conversationRepository.listForUser(userId);
    return conversations.map(mapConversation);
  },

  async createForRequest(requestId: string, userId: string) {
    const existingConversation = await conversationRepository.findByRequestId(requestId);
    if (existingConversation) {
      return mapConversation(existingConversation);
    }

    const request = await requestRepository.findById(requestId);
    if (!request) {
      throw new AppError('Service request not found.', HTTP_STATUS.NOT_FOUND);
    }

    const participants = [String(request.customerId)];
    if (request.providerId) {
      participants.push(String(request.providerId));
    }

    if (!participants.includes(userId)) {
      throw new AppError('You cannot create a conversation for this request.', HTTP_STATUS.FORBIDDEN);
    }

    const conversation = await conversationRepository.createConversation({
      requestId,
      participantIds: participants,
    });

    return mapConversation(conversation.toObject());
  },

  async listMessages(conversationId: string, userId: string) {
    const conversation = await conversationRepository.findById(conversationId);
    if (!conversation) {
      throw new AppError('Conversation not found.', HTTP_STATUS.NOT_FOUND);
    }

    if (!(conversation.participantIds ?? []).map(String).includes(userId)) {
      throw new AppError('You do not have access to this conversation.', HTTP_STATUS.FORBIDDEN);
    }

    const messages = await conversationRepository.listMessages(conversationId);
    return messages.map(mapMessage);
  },

  async sendMessage(conversationId: string, userId: string, content: string) {
    const conversation = await conversationRepository.findById(conversationId);
    if (!conversation) {
      throw new AppError('Conversation not found.', HTTP_STATUS.NOT_FOUND);
    }

    if (!(conversation.participantIds ?? []).map(String).includes(userId)) {
      throw new AppError('You do not have access to this conversation.', HTTP_STATUS.FORBIDDEN);
    }

    const message = await conversationRepository.createMessage({
      conversationId,
      senderId: userId,
      content,
    });

    await conversationRepository.touchConversation(conversationId, new Date());

    return mapMessage(message.toObject());
  },
};
