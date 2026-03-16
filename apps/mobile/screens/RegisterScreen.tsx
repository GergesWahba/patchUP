import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppInput } from '../components/AppInput';
import { ChoiceChips } from '../components/ChoiceChips';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useAuthStore } from '../store/auth-store';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  email: z.string().email('Enter a valid email address.'),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[A-Z]/, 'Password must include an uppercase letter.')
    .regex(/[0-9]/, 'Password must include a number.'),
  role: z.enum(['customer', 'provider']),
});

type FormValues = z.infer<typeof schema>;

const roleOptions = [
  { label: 'Customer', value: 'customer' },
  { label: 'Provider', value: 'provider' },
];

export function RegisterScreen() {
  const signUp = useAuthStore((state) => state.signUp);
  const [serverError, setServerError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'customer',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError('');
    try {
      await signUp(values);
    } catch (error: any) {
      setServerError(error?.response?.data?.message ?? 'Unable to create account.');
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>Create your PatchUp account</Text>
        <Text style={styles.body}>Join as a customer to request help or as a provider to pick up jobs.</Text>

        <FormField label="Account type" error={errors.role?.message}>
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value } }) => (
              <ChoiceChips
                options={roleOptions}
                selectedValues={value ? [value] : []}
                onChange={(next) => onChange(next[0])}
              />
            )}
          />
        </FormField>

        <FormField label="Full name" error={errors.name?.message}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => <AppInput onChangeText={onChange} value={value} />}
          />
        </FormField>

        <FormField label="Phone" error={errors.phone?.message}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <AppInput keyboardType="phone-pad" onChangeText={onChange} value={value} />
            )}
          />
        </FormField>

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
          Create account
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
    fontSize: 28,
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
