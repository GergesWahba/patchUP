import { StyleSheet, Text, View } from 'react-native';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E0D7',
    gap: 8,
  },
  title: {
    color: '#19324A',
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: '#5A646E',
    fontSize: 14,
    lineHeight: 20,
  },
});
