import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { ScreenContainer } from '../components/ScreenContainer';
import { StatusBadge } from '../components/StatusBadge';
import { fetchRequestById } from '../services/api';
import type { ServiceRequest, SharedStackParamList } from '../types';
import { CATEGORY_LABELS } from '../types';

export function RequestDetailsScreen() {
  const route = useRoute<RouteProp<SharedStackParamList, 'RequestDetails'>>();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchRequestById(route.params.requestId);
        setRequest(response);
      } catch (requestError: any) {
        setError(requestError?.response?.data?.message ?? 'Unable to load request details.');
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [route.params.requestId]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!request) {
    return <EmptyState title="Request unavailable" description={error || 'This request could not be found.'} />;
  }

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.kicker}>{CATEGORY_LABELS[request.category]}</Text>
        <Text style={styles.title}>{request.title}</Text>
        <StatusBadge status={request.status} />
        <Text style={styles.body}>{request.description}</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{request.location}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Urgency</Text>
          <Text style={styles.value}>{request.urgency}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Preferred time</Text>
          <Text style={styles.value}>{request.preferredTime || 'Flexible'}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Created</Text>
          <Text style={styles.value}>{new Date(request.createdAt).toLocaleString()}</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E0D7',
    padding: 20,
    gap: 14,
  },
  kicker: {
    color: '#7A6C58',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  title: {
    color: '#19324A',
    fontSize: 28,
    fontWeight: '800',
  },
  body: {
    color: '#5A646E',
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    gap: 4,
  },
  label: {
    color: '#7A6C58',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  value: {
    color: '#19324A',
    fontSize: 15,
  },
});
