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
import { createRequest } from '../services/api';
import { CATEGORY_LABELS, SERVICE_CATEGORIES, URGENCY_LEVELS } from '../types';

const schema = z.object({
  category: z.enum(SERVICE_CATEGORIES),
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
  urgency: z.enum(URGENCY_LEVELS),
  location: z.string().min(2, 'Location is required.'),
  preferredTime: z.string().optional(),
  imageUrl: z.string().url('Image URL must be valid.').optional().or(z.literal('')),
});

type FormValues = z.infer<typeof schema>;

const categoryOptions = SERVICE_CATEGORIES.map((category) => ({
  label: CATEGORY_LABELS[category],
  value: category,
}));

const urgencyOptions = URGENCY_LEVELS.map((urgency) => ({
  label: urgency.toUpperCase(),
  value: urgency,
}));

export function CreateRequestScreen({ navigation }: { navigation: any }) {
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
      category: 'handyman',
      urgency: 'medium',
      imageUrl: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setMessage('');
    setServerError('');
    try {
      await createRequest({
        ...values,
        imageUrl: values.imageUrl || undefined,
      });
      setMessage('Request created successfully.');
      reset({
        category: 'handyman',
        urgency: 'medium',
        title: '',
        description: '',
        location: '',
        preferredTime: '',
        imageUrl: '',
      });
      navigation.navigate('ActiveRequests');
    } catch (error: any) {
      setServerError(error?.response?.data?.message ?? 'Unable to create request.');
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>Create a service request</Text>
        <Text style={styles.body}>Give providers enough detail to respond quickly and show up prepared.</Text>

        <FormField label="Category" error={errors.category?.message}>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <ChoiceChips
                options={categoryOptions}
                selectedValues={value ? [value] : []}
                onChange={(next) => onChange(next[0])}
              />
            )}
          />
        </FormField>

        <FormField label="Urgency" error={errors.urgency?.message}>
          <Controller
            control={control}
            name="urgency"
            render={({ field: { onChange, value } }) => (
              <ChoiceChips
                options={urgencyOptions}
                selectedValues={value ? [value] : []}
                onChange={(next) => onChange(next[0])}
              />
            )}
          />
        </FormField>

        <FormField label="Title" error={errors.title?.message}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => <AppInput onChangeText={onChange} value={value} />}
          />
        </FormField>

        <FormField label="Description" error={errors.description?.message}>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <AppInput multiline numberOfLines={4} onChangeText={onChange} value={value} style={styles.multiline} />
            )}
          />
        </FormField>

        <FormField label="Location" error={errors.location?.message}>
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => <AppInput onChangeText={onChange} value={value} />}
          />
        </FormField>

        <FormField label="Preferred time" error={errors.preferredTime?.message}>
          <Controller
            control={control}
            name="preferredTime"
            render={({ field: { onChange, value } }) => <AppInput onChangeText={onChange} value={value} />}
          />
        </FormField>

        <FormField label="Image URL (optional)" error={errors.imageUrl?.message}>
          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { onChange, value } }) => (
              <AppInput autoCapitalize="none" onChangeText={onChange} value={value} />
            )}
          />
        </FormField>

        {serverError ? <Text style={styles.error}>{serverError}</Text> : null}
        {message ? <Text style={styles.success}>{message}</Text> : null}

        <PrimaryButton loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Submit request
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
