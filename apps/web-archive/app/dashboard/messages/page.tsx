'use client';

import { useEffect, useState } from 'react';
import type { ConversationDto } from '@patchup/shared';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import { api } from '@/lib/api';

export default function MessagesPage() {
  const [conversations, setConversations] = useState<ConversationDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/conversations');
        setConversations(response.data.data);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!conversations.length) {
    return (
      <EmptyState
        title="No conversations yet"
        description="The data foundation is in place. Once jobs have an assigned provider, conversations can be created here."
      />
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black">Messages</h1>
      {conversations.map((conversation) => (
        <Card key={conversation.id}>
          <p className="text-lg font-bold">Conversation for request {conversation.requestId}</p>
          <p className="mt-2 text-sm text-ink/65">
            Last activity: {conversation.lastMessageAt ? new Date(conversation.lastMessageAt).toLocaleString() : 'No messages yet'}
          </p>
          <p className="mt-4 text-sm text-ink/70">
            Realtime chat is intentionally left as a future enhancement, but the API, models, and dashboard entry point are already wired for it.
          </p>
        </Card>
      ))}
    </div>
  );
}
