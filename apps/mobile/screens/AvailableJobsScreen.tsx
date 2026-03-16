import { useState } from 'react';
import { Text } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { RequestCard } from '../components/RequestCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { useRequests } from '../hooks/useRequests';
import { acceptJob, declineJob } from '../services/api';

export function AvailableJobsScreen({ navigation }: { navigation: any }) {
  const { requests, isLoading, error, refresh } = useRequests('providerFeed');
  const [actionError, setActionError] = useState('');

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <ScreenContainer>
      {actionError ? <Text style={{ color: '#C04B48', fontSize: 13 }}>{actionError}</Text> : null}
      {error ? (
        <EmptyState title="Could not load available jobs" description={error} />
      ) : requests.length ? (
        requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onPress={() => navigation.navigate('RequestDetails', { requestId: request.id })}
            primaryActionLabel="Accept job"
            onPrimaryAction={async () => {
              try {
                setActionError('');
                await acceptJob(request.id);
                await refresh();
              } catch (requestError: any) {
                setActionError(requestError?.response?.data?.message ?? 'Unable to accept this job.');
              }
            }}
            secondaryActionLabel="Decline"
            onSecondaryAction={async () => {
              try {
                setActionError('');
                await declineJob(request.id);
                await refresh();
              } catch (requestError: any) {
                setActionError(requestError?.response?.data?.message ?? 'Unable to decline this job.');
              }
            }}
          />
        ))
      ) : (
        <EmptyState
          title="No available jobs"
          description="You are all caught up for now. Check back soon for new local requests."
        />
      )}
    </ScreenContainer>
  );
}
