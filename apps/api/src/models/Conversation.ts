import mongoose, { Schema } from 'mongoose';

export interface ConversationDocument extends mongoose.Document {
  requestId: mongoose.Types.ObjectId;
  participantIds: mongoose.Types.ObjectId[];
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<ConversationDocument>(
  {
    requestId: { type: Schema.Types.ObjectId, ref: 'ServiceRequest', required: true, unique: true },
    participantIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    lastMessageAt: Date,
  },
  { timestamps: true },
);

export const ConversationModel = mongoose.model<ConversationDocument>(
  'Conversation',
  conversationSchema,
);
