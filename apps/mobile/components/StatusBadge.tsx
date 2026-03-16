import { StyleSheet, Text, View } from 'react-native';
import type { RequestStatus } from '../types';

export function StatusBadge({ status }: { status: RequestStatus }) {
  const tone =
    status === 'completed'
      ? styles.success
      : status === 'accepted' || status === 'in_progress'
        ? styles.warning
        : styles.neutral;

  return (
    <View style={[styles.badge, tone]}>
      <Text style={styles.label}>{status.replace('_', ' ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  neutral: {
    backgroundColor: '#E8EEF2',
  },
  warning: {
    backgroundColor: '#F6E5D8',
  },
  success: {
    backgroundColor: '#DCEBDD',
  },
  label: {
    color: '#19324A',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
