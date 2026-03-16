import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { RequestCard } from '../components/RequestCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { useRequests } from '../hooks/useRequests';

export function RequestHistoryScreen({ navigation }: { navigation: any }) {
  const { requests, isLoading, error } = useRequests('mine');
  const history = requests.filter((request) => ['completed', 'canceled'].includes(request.status));

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <ScreenContainer>
      {error ? (
        <EmptyState title="Could not load request history" description={error} />
      ) : history.length ? (
        history.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onPress={() => navigation.navigate('RequestDetails', { requestId: request.id })}
          />
        ))
      ) : (
        <EmptyState
          title="No request history yet"
          description="Completed and canceled requests will appear here once you have a few jobs under your belt."
        />
      )}
    </ScreenContainer>
  );
}
