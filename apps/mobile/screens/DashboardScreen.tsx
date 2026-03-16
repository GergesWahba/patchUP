import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { PrimaryButton } from '../components/PrimaryButton';
import { RequestCard } from '../components/RequestCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { useRequests } from '../hooks/useRequests';

export function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { requests, isLoading, error } = useRequests('mine');

  const active = requests.filter((request) => !['completed', 'canceled'].includes(request.status));
  const history = requests.filter((request) => ['completed', 'canceled'].includes(request.status));

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Customer dashboard</Text>
        <Text style={styles.title}>Track every repair request from your phone.</Text>
        <Text style={styles.body}>
          Create new requests, check active jobs, and keep your profile ready for faster matches.
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{active.length}</Text>
          <Text style={styles.statLabel}>Active requests</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{history.length}</Text>
          <Text style={styles.statLabel}>Request history</Text>
        </View>
      </View>

      <PrimaryButton onPress={() => navigation.navigate('CreateRequest')}>Create request</PrimaryButton>
      <PrimaryButton variant="ghost" onPress={() => navigation.navigate('Categories')}>
        Browse categories
      </PrimaryButton>

      {error ? (
        <EmptyState title="Could not load your dashboard" description={error} />
      ) : active[0] ? (
        <RequestCard
          request={active[0]}
          onPress={() => navigation.navigate('RequestDetails', { requestId: active[0].id })}
        />
      ) : (
        <EmptyState
          title="No active requests yet"
          description="Once you create a request, the latest one will show up here for quick access."
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: '#19324A',
    gap: 10,
  },
  eyebrow: {
    color: '#F7C9AE',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  body: {
    color: '#D8E0E6',
    fontSize: 15,
    lineHeight: 22,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E0D7',
    padding: 18,
    gap: 6,
  },
  statValue: {
    color: '#19324A',
    fontSize: 28,
    fontWeight: '800',
  },
  statLabel: {
    color: '#5A646E',
    fontSize: 14,
  },
});
