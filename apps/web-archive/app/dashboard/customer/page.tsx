'use client';

import { useEffect, useState } from 'react';
import type { ServiceRequestDto } from '@patchup/shared';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import { RequestCard } from '@/features/dashboard/request-card';
import { api } from '@/lib/api';

export default function CustomerDashboardPage() {
  const [requests, setRequests] = useState<ServiceRequestDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/requests/mine');
        setRequests(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message ?? 'Unable to load requests.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const activeRequests = requests.filter((request) => !['completed', 'canceled'].includes(request.status));
  const history = requests.filter((request) => ['completed', 'canceled'].includes(request.status));

  return (
    <div className="space-y-8">
      <Card className="flex flex-col justify-between gap-6 bg-ink text-white md:flex-row md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">Customer dashboard</p>
          <h1 className="mt-2 text-4xl font-black">Keep every repair request on one trackable timeline.</h1>
        </div>
        <Link href="/requests/new">
          <Button variant="secondary">Create request</Button>
        </Link>
      </Card>

      {loading ? (
        <div className="flex min-h-32 items-center justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <EmptyState title="Could not load requests" description={error} />
      ) : (
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Active requests</h2>
            {activeRequests.length ? (
              activeRequests.map((request) => <RequestCard key={request.id} request={request} />)
            ) : (
              <EmptyState
                title="No active requests"
                description="Create your first request and PatchUp will start the matching flow."
              />
            )}
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Request history</h2>
            {history.length ? (
              history.map((request) => <RequestCard key={request.id} request={request} />)
            ) : (
              <EmptyState
                title="No completed jobs yet"
                description="Completed and canceled requests will appear here."
              />
            )}
          </section>
        </>
      )}
    </div>
  );
}
