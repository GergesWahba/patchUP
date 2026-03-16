import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { RequestCard } from '../components/RequestCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { useRequests } from '../hooks/useRequests';

export function ActiveRequestsScreen({ navigation }: { navigation: any }) {
  const { requests, isLoading, error } = useRequests('mine');
  const active = requests.filter((request) => !['completed', 'canceled'].includes(request.status));

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <ScreenContainer>
      {error ? (
        <EmptyState title="Could not load active requests" description={error} />
      ) : active.length ? (
        active.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onPress={() => navigation.navigate('RequestDetails', { requestId: request.id })}
          />
        ))
      ) : (
        <EmptyState
          title="No active requests"
          description="When you create a request or a provider accepts one, it will show up here."
        />
      )}
    </ScreenContainer>
  );
}
