import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    color: '#19324A',
    fontSize: 14,
    fontWeight: '600',
  },
  error: {
    color: '#C04B48',
    fontSize: 13,
  },
});
