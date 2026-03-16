import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ServiceRequest } from '../types';
import { CATEGORY_LABELS } from '../types';
import { PrimaryButton } from './PrimaryButton';
import { StatusBadge } from './StatusBadge';

export function RequestCard({
  request,
  onPress,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}: {
  request: ServiceRequest;
  onPress?: () => void;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void | Promise<void>;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void | Promise<void>;
}) {
  const content = (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.headerCopy}>
          <Text style={styles.kicker}>{CATEGORY_LABELS[request.category]}</Text>
          <Text style={styles.title}>{request.title}</Text>
        </View>
        <StatusBadge status={request.status} />
      </View>

      <Text style={styles.description}>{request.description}</Text>

      <View style={styles.metaGrid}>
        <Text style={styles.metaText}>Location: {request.location}</Text>
        <Text style={styles.metaText}>Urgency: {request.urgency}</Text>
        <Text style={styles.metaText}>
          Preferred: {request.preferredTime ? request.preferredTime : 'Flexible'}
        </Text>
      </View>

      {primaryActionLabel || secondaryActionLabel ? (
        <View style={styles.actions}>
          {primaryActionLabel && onPrimaryAction ? (
            <PrimaryButton onPress={onPrimaryAction}>{primaryActionLabel}</PrimaryButton>
          ) : null}
          {secondaryActionLabel && onSecondaryAction ? (
            <PrimaryButton variant="ghost" onPress={onSecondaryAction}>
              {secondaryActionLabel}
            </PrimaryButton>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E0D7',
    padding: 18,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  kicker: {
    color: '#7A6C58',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: '#19324A',
    fontSize: 18,
    fontWeight: '800',
  },
  description: {
    color: '#5A646E',
    fontSize: 14,
    lineHeight: 20,
  },
  metaGrid: {
    gap: 6,
  },
  metaText: {
    color: '#46515D',
    fontSize: 13,
  },
  actions: {
    gap: 10,
  },
});
