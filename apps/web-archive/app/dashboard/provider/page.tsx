'use client';

import { useCallback, useEffect, useState } from 'react';
import type { PaginatedResponse, ServiceRequestDto } from '@patchup/shared';
import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import {
  RequestCard,
  acceptRequest,
  declineRequest,
  updateRequestStatus,
} from '@/features/dashboard/request-card';
import { api } from '@/lib/api';

export default function ProviderDashboardPage() {
  const [feed, setFeed] = useState<PaginatedResponse<ServiceRequestDto> | null>(null);
  const [jobs, setJobs] = useState<ServiceRequestDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [feedResponse, jobsResponse] = await Promise.all([
        api.get('/requests/provider/feed'),
        api.get('/requests/mine'),
      ]);
      setFeed(feedResponse.data.data);
      setJobs(jobsResponse.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unable to load jobs.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const accepted = jobs.filter((job) => ['accepted', 'in_progress'].includes(job.status));
  const completed = jobs.filter((job) => job.status === 'completed');

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <EmptyState title="Could not load provider dashboard" description={error} />;
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-black">Available jobs</h1>
        {feed?.items.length ? (
          feed.items.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              actionLabel="Accept job"
              onAction={async () => {
                await acceptRequest(request.id);
                await load();
              }}
              secondaryActionLabel="Decline"
              onSecondaryAction={async () => {
                await declineRequest(request.id);
                await load();
              }}
            />
          ))
        ) : (
          <EmptyState
            title="No matching open jobs"
            description="When new requests match your categories and area, they will show up here."
          />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Accepted jobs</h2>
        {accepted.length ? (
          accepted.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              actionLabel={request.status === 'accepted' ? 'Mark in progress' : 'Mark completed'}
              onAction={async () => {
                await updateRequestStatus(
                  request.id,
                  request.status === 'accepted' ? 'in_progress' : 'completed',
                );
                await load();
              }}
              secondaryActionLabel={request.status === 'accepted' ? 'Cancel job' : undefined}
              onSecondaryAction={
                request.status === 'accepted'
                  ? async () => {
                      await updateRequestStatus(request.id, 'canceled');
                      await load();
                    }
                  : undefined
              }
            />
          ))
        ) : (
          <EmptyState
            title="No accepted jobs yet"
            description="Accept a request from the feed to start tracking it here."
          />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Completed jobs</h2>
        {completed.length ? (
          completed.map((request) => <RequestCard key={request.id} request={request} />)
        ) : (
          <EmptyState
            title="No completed jobs yet"
            description="Finished jobs will appear here as your work history grows."
          />
        )}
      </section>
    </div>
  );
}
