import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppInput } from '../components/AppInput';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useAuthStore } from '../store/auth-store';

const schema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

type FormValues = z.infer<typeof schema>;

export function LoginScreen() {
  const signIn = useAuthStore((state) => state.signIn);
  const [serverError, setServerError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setServerError('');
    try {
      await signIn(values);
    } catch (error: any) {
      setServerError(error?.response?.data?.message ?? 'Unable to log in.');
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.body}>Sign in to manage your requests or provider jobs from anywhere.</Text>

        <FormField label="Email" error={errors.email?.message}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <AppInput autoCapitalize="none" keyboardType="email-address" onChangeText={onChange} value={value} />
            )}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <AppInput secureTextEntry onChangeText={onChange} value={value} />
            )}
          />
        </FormField>

        {serverError ? <Text style={styles.error}>{serverError}</Text> : null}

        <PrimaryButton loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Log in
        </PrimaryButton>
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
  title: {
    color: '#19324A',
    fontSize: 30,
    fontWeight: '800',
  },
  body: {
    color: '#5A646E',
    fontSize: 15,
    lineHeight: 22,
  },
  error: {
    color: '#C04B48',
    fontSize: 13,
  },
});
