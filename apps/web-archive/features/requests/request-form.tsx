'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { CATEGORY_LABELS, SERVICE_CATEGORIES, URGENCY_LEVELS } from '@patchup/shared';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { type RequestFormValues, requestSchema } from './schema';

export function RequestForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      urgency: 'medium',
      category: 'handyman',
      imageUrl: '',
    },
  });

  const onSubmit = async (values: RequestFormValues) => {
    setServerError('');

    try {
      await api.post('/requests', {
        ...values,
        imageUrl: values.imageUrl || undefined,
      });
      router.push('/dashboard/customer');
    } catch (error: any) {
      setServerError(error.response?.data?.message ?? 'Unable to create request.');
    }
  };

  return (
    <Card className="max-w-3xl">
      <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-black">Create a service request</h1>
          <p className="mt-2 text-sm text-ink/65">
            Give providers the context they need to respond quickly.
          </p>
        </div>

        <FormField label="Category" error={errors.category?.message}>
          <Select {...register('category')}>
            {SERVICE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {CATEGORY_LABELS[category]}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Urgency" error={errors.urgency?.message}>
          <Select {...register('urgency')}>
            {URGENCY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Title" error={errors.title?.message}>
          <Input placeholder="Need help replacing a sink faucet" {...register('title')} />
        </FormField>

        <FormField label="Location" error={errors.location?.message}>
          <Input placeholder="Chicago, IL" {...register('location')} />
        </FormField>

        <div className="md:col-span-2">
          <FormField label="Description" error={errors.description?.message}>
            <Textarea
              placeholder="Describe the issue, access notes, tools you have, and anything urgent."
              {...register('description')}
            />
          </FormField>
        </div>

        <FormField label="Preferred time" error={errors.preferredTime?.message}>
          <Input placeholder="Weeknights after 6 PM" {...register('preferredTime')} />
        </FormField>

        <FormField label="Image URL (optional)" error={errors.imageUrl?.message}>
          <Input placeholder="https://example.com/photo.jpg" {...register('imageUrl')} />
        </FormField>

        <div className="md:col-span-2">
          {serverError ? <p className="mb-3 text-sm text-rose-600">{serverError}</p> : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit request'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
