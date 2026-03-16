import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { PrimaryButton } from '../components/PrimaryButton';
import { RequestCard } from '../components/RequestCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { useRequests } from '../hooks/useRequests';

export function ProviderDashboardScreen() {
  const navigation = useNavigation<any>();
  const available = useRequests('providerFeed');
  const mine = useRequests('mine');

  if (available.isLoading || mine.isLoading) {
    return <LoadingState />;
  }

  const accepted = mine.requests.filter((request) => ['accepted', 'in_progress'].includes(request.status));
  const completed = mine.requests.filter((request) => request.status === 'completed');

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Provider dashboard</Text>
        <Text style={styles.title}>See open jobs, manage accepted work, and keep progress moving.</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{available.requests.length}</Text>
          <Text style={styles.statLabel}>Available jobs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{accepted.length}</Text>
          <Text style={styles.statLabel}>Accepted jobs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completed.length}</Text>
          <Text style={styles.statLabel}>Completed jobs</Text>
        </View>
      </View>

      <PrimaryButton onPress={() => navigation.navigate('AvailableJobs')}>View available jobs</PrimaryButton>

      {available.error || mine.error ? (
        <EmptyState
          title="Could not load provider overview"
          description={available.error || mine.error}
        />
      ) : available.requests[0] ? (
        <RequestCard
          request={available.requests[0]}
          onPress={() => navigation.navigate('RequestDetails', { requestId: available.requests[0].id })}
        />
      ) : (
        <EmptyState
          title="No matching jobs right now"
          description="As new requests match your categories and service area, they will appear here."
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
    lineHeight: 34,
  },
  stats: {
    gap: 12,
  },
  statCard: {
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E0D7',
    padding: 18,
    gap: 6,
  },
  statValue: {
    color: '#19324A',
    fontSize: 26,
    fontWeight: '800',
  },
  statLabel: {
    color: '#5A646E',
    fontSize: 14,
  },
});
