import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { RequestCard } from '../components/RequestCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { useRequests } from '../hooks/useRequests';

export function CompletedJobsScreen({ navigation }: { navigation: any }) {
  const { requests, isLoading, error } = useRequests('mine');
  const completed = requests.filter((request) => request.status === 'completed');

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <ScreenContainer>
      {error ? (
        <EmptyState title="Could not load completed jobs" description={error} />
      ) : completed.length ? (
        completed.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onPress={() => navigation.navigate('RequestDetails', { requestId: request.id })}
          />
        ))
      ) : (
        <EmptyState
          title="No completed jobs yet"
          description="Finished jobs will appear here as your provider history grows."
        />
      )}
    </ScreenContainer>
  );
}
