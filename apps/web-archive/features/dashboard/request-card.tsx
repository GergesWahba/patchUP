'use client';

import type { RequestStatus, ServiceRequestDto } from '@patchup/shared';
import { CATEGORY_LABELS } from '@patchup/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';

function getTone(status: RequestStatus) {
  if (status === 'completed') return 'success';
  if (status === 'in_progress' || status === 'accepted') return 'warning';
  return 'neutral';
}

export function RequestCard({
  request,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}: {
  request: ServiceRequestDto;
  actionLabel?: string;
  onAction?: () => Promise<void>;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => Promise<void>;
}) {
  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-ink/45">
            {CATEGORY_LABELS[request.category]}
          </p>
          <h3 className="mt-1 text-xl font-bold">{request.title}</h3>
        </div>
        <Badge tone={getTone(request.status)}>{request.status.replace('_', ' ')}</Badge>
      </div>

      <p className="text-sm text-ink/70">{request.description}</p>

      <div className="grid gap-2 text-sm text-ink/65 md:grid-cols-2">
        <p>Location: {request.location}</p>
        <p>Preferred time: {request.preferredTime || 'Flexible'}</p>
        <p>Urgency: {request.urgency}</p>
        <p>Created: {formatDate(request.createdAt)}</p>
      </div>

      {actionLabel || secondaryActionLabel ? (
        <div className="flex flex-wrap gap-3">
          {actionLabel && onAction ? <ActionButton label={actionLabel} onClick={onAction} /> : null}
          {secondaryActionLabel && onSecondaryAction ? (
            <ActionButton label={secondaryActionLabel} variant="ghost" onClick={onSecondaryAction} />
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}

function ActionButton({
  label,
  onClick,
  variant,
}: {
  label: string;
  onClick: () => Promise<void>;
  variant?: 'primary' | 'ghost';
}) {
  return (
    <Button
      variant={variant}
      onClick={() => {
        void onClick();
      }}
    >
      {label}
    </Button>
  );
}

export async function acceptRequest(id: string) {
  await api.patch(`/requests/${id}/respond`, { action: 'accept' });
}

export async function declineRequest(id: string) {
  await api.patch(`/requests/${id}/respond`, { action: 'decline' });
}

export async function updateRequestStatus(id: string, status: RequestStatus) {
  await api.patch(`/requests/${id}/status`, { status });
}
