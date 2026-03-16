import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppInput } from '../components/AppInput';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { updateProfile } from '../services/api';
import { useAuthStore } from '../store/auth-store';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
  profileImage: z.string().url('Image URL must be valid.').optional().or(z.literal('')),
});

type FormValues = z.infer<typeof schema>;

export function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const [message, setMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!user) return;
    reset({
      name: user.name,
      phone: user.phone ?? '',
      city: user.customerProfile?.city ?? '',
      state: user.customerProfile?.state ?? '',
      address: user.customerProfile?.address ?? '',
      profileImage: user.customerProfile?.profileImage ?? '',
    });
  }, [reset, user]);

  const onSubmit = async (values: FormValues) => {
    setMessage('');
    setServerError('');
    try {
      await updateProfile({
        ...values,
        profileImage: values.profileImage || undefined,
      });
      await refreshUser();
      setMessage('Profile updated.');
    } catch (error: any) {
      setServerError(error?.response?.data?.message ?? 'Unable to update profile.');
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>Your profile</Text>
        <Text style={styles.body}>Keep your contact details and location current for faster provider coordination.</Text>

        <FormField label="Name" error={errors.name?.message}>
          <Controller control={control} name="name" render={({ field: { onChange, value } }) => <AppInput onChangeText={onChange} value={value} />} />
        </FormField>
        <FormField label="Phone" error={errors.phone?.message}>
          <Controller control={control} name="phone" render={({ field: { onChange, value } }) => <AppInput keyboardType="phone-pad" onChangeText={onChange} value={value} />} />
        </FormField>
        <FormField label="City" error={errors.city?.message}>
          <Controller control={control} name="city" render={({ field: { onChange, value } }) => <AppInput onChangeText={onChange} value={value} />} />
        </FormField>
        <FormField label="State" error={errors.state?.message}>
          <Controller control={control} name="state" render={({ field: { onChange, value } }) => <AppInput onChangeText={onChange} value={value} />} />
        </FormField>
        <FormField label="Address" error={errors.address?.message}>
          <Controller control={control} name="address" render={({ field: { onChange, value } }) => <AppInput onChangeText={onChange} value={value} />} />
        </FormField>
        <FormField label="Profile image URL" error={errors.profileImage?.message}>
          <Controller control={control} name="profileImage" render={({ field: { onChange, value } }) => <AppInput autoCapitalize="none" onChangeText={onChange} value={value} />} />
        </FormField>

        {serverError ? <Text style={styles.error}>{serverError}</Text> : null}
        {message ? <Text style={styles.success}>{message}</Text> : null}

        <PrimaryButton loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Save profile
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
  success: {
    color: '#4A7950',
    fontSize: 13,
  },
});
