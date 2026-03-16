import { StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { ScreenContainer } from '../components/ScreenContainer';
import { CATEGORY_LABELS, SERVICE_CATEGORIES } from '../types';

export function CategoriesScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Categories</Text>
        <Text style={styles.title}>Services supported in the PatchUp MVP</Text>
        <Text style={styles.body}>
          These categories are already connected to the backend request flow and can be expanded later without changing the overall mobile architecture.
        </Text>
      </View>

      {SERVICE_CATEGORIES.length ? (
        SERVICE_CATEGORIES.map((category) => (
          <View key={category} style={styles.card}>
            <Text style={styles.cardTitle}>{CATEGORY_LABELS[category]}</Text>
            <Text style={styles.cardBody}>
              Ready for customer intake, provider discovery, and status tracking.
            </Text>
          </View>
        ))
      ) : (
        <EmptyState title="No categories available" description="Categories will appear here once configured." />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10,
  },
  eyebrow: {
    color: '#C96A3C',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  title: {
    color: '#19324A',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  body: {
    color: '#5A646E',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E0D7',
    padding: 18,
    gap: 8,
  },
  cardTitle: {
    color: '#19324A',
    fontSize: 18,
    fontWeight: '800',
  },
  cardBody: {
    color: '#5A646E',
    fontSize: 14,
    lineHeight: 20,
  },
});
