import { useState } from 'react';
import { Text } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { RequestCard } from '../components/RequestCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { useRequests } from '../hooks/useRequests';
import { updateRequestStatus } from '../services/api';

export function AcceptedJobsScreen({ navigation }: { navigation: any }) {
  const { requests, isLoading, error, refresh } = useRequests('mine');
  const [actionError, setActionError] = useState('');
  const accepted = requests.filter((request) => ['accepted', 'in_progress'].includes(request.status));

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <ScreenContainer>
      {actionError ? <Text style={{ color: '#C04B48', fontSize: 13 }}>{actionError}</Text> : null}
      {error ? (
        <EmptyState title="Could not load accepted jobs" description={error} />
      ) : accepted.length ? (
        accepted.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onPress={() => navigation.navigate('RequestDetails', { requestId: request.id })}
            primaryActionLabel={request.status === 'accepted' ? 'Mark in progress' : 'Mark completed'}
            onPrimaryAction={async () => {
              try {
                setActionError('');
                await updateRequestStatus(
                  request.id,
                  request.status === 'accepted' ? 'in_progress' : 'completed',
                );
                await refresh();
              } catch (requestError: any) {
                setActionError(
                  requestError?.response?.data?.message ?? 'Unable to update this job status.',
                );
              }
            }}
          />
        ))
      ) : (
        <EmptyState
          title="No accepted jobs"
          description="Accepted and in-progress jobs will show up here once you start taking work."
        />
      )}
    </ScreenContainer>
  );
}
