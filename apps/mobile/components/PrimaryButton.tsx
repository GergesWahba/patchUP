import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

export function PrimaryButton({
  children,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}: {
  children: ReactNode;
  onPress: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled || loading}
      onPress={() => {
        const result = onPress();
        if (result && typeof (result as Promise<void>).catch === 'function') {
          void result.catch(() => undefined);
        }
      }}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && !loading && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' ? '#19324A' : '#FFFFFF'} />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'ghost' ? styles.ghostLabel : null,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  primary: {
    backgroundColor: '#19324A',
  },
  secondary: {
    backgroundColor: '#C96A3C',
  },
  ghost: {
    borderWidth: 1,
    borderColor: '#D7D2CA',
    backgroundColor: '#FFFFFF',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  label: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  ghostLabel: {
    color: '#19324A',
  },
});
