import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppInput } from '../components/AppInput';
import { ChoiceChips } from '../components/ChoiceChips';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { updateProfile } from '../services/api';
import { useAuthStore } from '../store/auth-store';
import { CATEGORY_LABELS, SERVICE_CATEGORIES } from '../types';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  phone: z.string().optional(),
  bio: z.string().max(300, 'Bio must be 300 characters or fewer.').optional(),
  serviceArea: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  availabilityStatus: z.enum(['available', 'busy', 'offline']),
  serviceCategories: z.array(z.enum(SERVICE_CATEGORIES)).optional(),
});

type FormValues = z.infer<typeof schema>;

const categoryOptions = SERVICE_CATEGORIES.map((category) => ({
  label: CATEGORY_LABELS[category],
  value: category,
}));

const availabilityOptions = [
  { label: 'Available', value: 'available' },
  { label: 'Busy', value: 'busy' },
  { label: 'Offline', value: 'offline' },
];

export function ProviderProfileScreen() {
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
    defaultValues: {
      availabilityStatus: 'available',
      serviceCategories: [],
    },
  });

  useEffect(() => {
    if (!user) return;
    reset({
      name: user.name,
      phone: user.phone ?? '',
      bio: user.providerProfile?.bio ?? '',
      serviceArea: user.providerProfile?.serviceArea ?? '',
      yearsOfExperience: user.providerProfile?.yearsOfExperience
        ? String(user.providerProfile.yearsOfExperience)
        : '',
      availabilityStatus: user.providerProfile?.availabilityStatus ?? 'available',
      serviceCategories: user.providerProfile?.serviceCategories ?? [],
    });
  }, [reset, user]);

  const onSubmit = async (values: FormValues) => {
    setMessage('');
    setServerError('');
    try {
      await updateProfile({
        ...values,
        yearsOfExperience: values.yearsOfExperience ? Number(values.yearsOfExperience) : undefined,
      });
      await refreshUser();
      setMessage('Provider profile updated.');
    } catch (error: any) {
      setServerError(error?.response?.data?.message ?? 'Unable to update provider profile.');
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>Provider profile</Text>
        <Text style={styles.body}>Set your categories, availability, and service area so matching stays relevant.</Text>

        <FormField label="Name" error={errors.name?.message}>
          <Controller control={control} name="name" render={({ field: { onChange, value } }) => <AppInput onChangeText={onChange} value={value} />} />
        </FormField>
        <FormField label="Phone" error={errors.phone?.message}>
          <Controller control={control} name="phone" render={({ field: { onChange, value } }) => <AppInput keyboardType="phone-pad" onChangeText={onChange} value={value} />} />
        </FormField>
        <FormField label="Bio" error={errors.bio?.message}>
          <Controller control={control} name="bio" render={({ field: { onChange, value } }) => <AppInput multiline numberOfLines={4} onChangeText={onChange} value={value} style={styles.multiline} />} />
        </FormField>
        <FormField label="Service area" error={errors.serviceArea?.message}>
          <Controller control={control} name="serviceArea" render={({ field: { onChange, value } }) => <AppInput onChangeText={onChange} value={value} />} />
        </FormField>
        <FormField label="Years of experience" error={errors.yearsOfExperience?.message}>
          <Controller control={control} name="yearsOfExperience" render={({ field: { onChange, value } }) => <AppInput keyboardType="number-pad" onChangeText={onChange} value={value} />} />
        </FormField>
        <FormField label="Availability" error={errors.availabilityStatus?.message}>
          <Controller
            control={control}
            name="availabilityStatus"
            render={({ field: { onChange, value } }) => (
              <ChoiceChips
                options={availabilityOptions}
                selectedValues={value ? [value] : []}
                onChange={(next) => onChange(next[0])}
              />
            )}
          />
        </FormField>
        <FormField label="Service categories" error={errors.serviceCategories?.message as string | undefined}>
          <Controller
            control={control}
            name="serviceCategories"
            render={({ field: { onChange, value } }) => (
              <ChoiceChips
                options={categoryOptions}
                selectedValues={value ?? []}
                multiple
                onChange={onChange}
              />
            )}
          />
        </FormField>

        {serverError ? <Text style={styles.error}>{serverError}</Text> : null}
        {message ? <Text style={styles.success}>{message}</Text> : null}

        <PrimaryButton loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Save provider profile
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
  multiline: {
    minHeight: 110,
    textAlignVertical: 'top',
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
