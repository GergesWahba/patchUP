import { ConversationModel } from '../models/Conversation.js';
import { MessageModel } from '../models/Message.js';

export const conversationRepository = {
  listForUser(userId: string) {
    return ConversationModel.find({ participantIds: userId }).sort({ updatedAt: -1 }).lean();
  },
  findById(id: string) {
    return ConversationModel.findById(id).lean();
  },
  findByRequestId(requestId: string) {
    return ConversationModel.findOne({ requestId }).lean();
  },
  createConversation(data: Record<string, unknown>) {
    return ConversationModel.create(data);
  },
  createMessage(data: Record<string, unknown>) {
    return MessageModel.create(data);
  },
  listMessages(conversationId: string) {
    return MessageModel.find({ conversationId }).sort({ createdAt: 1 }).lean();
  },
  touchConversation(id: string, lastMessageAt: Date) {
    return ConversationModel.findByIdAndUpdate(id, { lastMessageAt }, { new: true }).lean();
  },
};
