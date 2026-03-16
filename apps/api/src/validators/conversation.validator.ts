import { z } from 'zod';

export const createConversationSchema = z.object({
  requestId: z.string().min(1),
});

export const sendMessageSchema = z.object({
  content: z.string().min(1).max(1000),
});
