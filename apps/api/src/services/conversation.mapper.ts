import type { ConversationDto, MessageDto } from '@patchup/shared';

export function mapConversation(conversation: any): ConversationDto {
  return {
    id: String(conversation._id ?? conversation.id),
    requestId: String(conversation.requestId),
    participantIds: (conversation.participantIds ?? []).map(String),
    lastMessageAt: conversation.lastMessageAt?.toISOString(),
    createdAt: conversation.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: conversation.updatedAt?.toISOString() ?? new Date().toISOString(),
  };
}

export function mapMessage(message: any): MessageDto {
  return {
    id: String(message._id ?? message.id),
    conversationId: String(message.conversationId),
    senderId: String(message.senderId),
    content: message.content ?? '',
    createdAt: message.createdAt?.toISOString() ?? new Date().toISOString(),
  };
}
