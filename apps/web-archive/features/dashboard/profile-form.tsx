'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SERVICE_CATEGORIES, type UserDto } from '@patchup/shared';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';

const customerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
  profileImage: z.string().url().optional().or(z.literal('')),
});

const providerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  bio: z.string().optional(),
  serviceArea: z.string().optional(),
  yearsOfExperience: z.coerce.number().min(0).max(60).optional(),
  availabilityStatus: z.enum(['available', 'busy', 'offline']),
  serviceCategories: z.array(z.string()).optional(),
});

type CustomerValues = z.infer<typeof customerSchema>;
type ProviderValues = z.infer<typeof providerSchema>;

export function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);
  const token = useAuthStore((state) => state.token);
  const [message, setMessage] = useState('');

  const customerForm = useForm<CustomerValues>({
    resolver: zodResolver(customerSchema),
  });
  const providerForm = useForm<ProviderValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      availabilityStatus: 'available',
      serviceCategories: [],
    },
  });

  useEffect(() => {
    if (!user) return;
    if (user.role === 'customer') {
      customerForm.reset({
        name: user.name,
        phone: user.phone ?? '',
        city: user.customerProfile?.city ?? '',
        state: user.customerProfile?.state ?? '',
        address: user.customerProfile?.address ?? '',
        profileImage: user.customerProfile?.profileImage ?? '',
      });
    } else if (user.role === 'provider') {
      providerForm.reset({
        name: user.name,
        phone: user.phone ?? '',
        bio: user.providerProfile?.bio ?? '',
        serviceArea: user.providerProfile?.serviceArea ?? '',
        yearsOfExperience: user.providerProfile?.yearsOfExperience ?? 0,
        availabilityStatus: user.providerProfile?.availabilityStatus ?? 'available',
        serviceCategories: user.providerProfile?.serviceCategories ?? [],
      });
    }
  }, [customerForm, providerForm, user]);

  const handleSavedUser = (updatedUser: UserDto) => {
    if (!token) return;
    setSession({ token, user: updatedUser });
    setMessage('Profile updated.');
  };

  if (!user) return null;

  if (user.role === 'customer') {
    return (
      <Card className="max-w-3xl">
        <form
          className="grid gap-5 md:grid-cols-2"
          onSubmit={customerForm.handleSubmit(async (values) => {
            const response = await api.patch('/users/profile', {
              ...values,
              profileImage: values.profileImage || undefined,
            });
            handleSavedUser(response.data.data);
          })}
        >
          <div className="md:col-span-2">
            <h1 className="text-3xl font-black">Your profile</h1>
            <p className="mt-2 text-sm text-ink/65">Keep your contact info and service location current.</p>
          </div>

          <FormField label="Name" error={customerForm.formState.errors.name?.message}>
            <Input {...customerForm.register('name')} />
          </FormField>
          <FormField label="Phone" error={customerForm.formState.errors.phone?.message}>
            <Input {...customerForm.register('phone')} />
          </FormField>
          <FormField label="City" error={customerForm.formState.errors.city?.message}>
            <Input {...customerForm.register('city')} />
          </FormField>
          <FormField label="State" error={customerForm.formState.errors.state?.message}>
            <Input {...customerForm.register('state')} />
          </FormField>
          <div className="md:col-span-2">
            <FormField label="Address" error={customerForm.formState.errors.address?.message}>
              <Input {...customerForm.register('address')} />
            </FormField>
          </div>
          <div className="md:col-span-2">
            <FormField label="Profile image URL" error={customerForm.formState.errors.profileImage?.message}>
              <Input {...customerForm.register('profileImage')} />
            </FormField>
          </div>

          <div className="md:col-span-2 flex items-center gap-4">
            <Button type="submit" disabled={customerForm.formState.isSubmitting}>
              {customerForm.formState.isSubmitting ? 'Saving...' : 'Save profile'}
            </Button>
            {message ? <p className="text-sm text-moss">{message}</p> : null}
          </div>
        </form>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl">
      <form
        className="grid gap-5 md:grid-cols-2"
        onSubmit={providerForm.handleSubmit(async (values) => {
          const response = await api.patch('/users/profile', values);
          handleSavedUser(response.data.data);
        })}
      >
        <div className="md:col-span-2">
          <h1 className="text-3xl font-black">Provider profile</h1>
          <p className="mt-2 text-sm text-ink/65">
            Tell customers where you work and what kinds of jobs you handle best.
          </p>
        </div>

        <FormField label="Name" error={providerForm.formState.errors.name?.message}>
          <Input {...providerForm.register('name')} />
        </FormField>
        <FormField label="Phone" error={providerForm.formState.errors.phone?.message}>
          <Input {...providerForm.register('phone')} />
        </FormField>
        <div className="md:col-span-2">
          <FormField label="Bio" error={providerForm.formState.errors.bio?.message}>
            <Textarea {...providerForm.register('bio')} />
          </FormField>
        </div>
        <FormField label="Service area" error={providerForm.formState.errors.serviceArea?.message}>
          <Input {...providerForm.register('serviceArea')} />
        </FormField>
        <FormField
          label="Years of experience"
          error={providerForm.formState.errors.yearsOfExperience?.message}
        >
          <Input type="number" min={0} {...providerForm.register('yearsOfExperience')} />
        </FormField>
        <FormField
          label="Availability"
          error={providerForm.formState.errors.availabilityStatus?.message}
        >
          <Select {...providerForm.register('availabilityStatus')}>
            <option value="available">available</option>
            <option value="busy">busy</option>
            <option value="offline">offline</option>
          </Select>
        </FormField>
        <div className="md:col-span-2">
          <p className="mb-2 text-sm font-medium">Service categories</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICE_CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-mist px-3 py-3 text-sm">
                <input type="checkbox" value={category} {...providerForm.register('serviceCategories')} />
                <span>{category.replaceAll('_', ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex items-center gap-4">
          <Button type="submit" disabled={providerForm.formState.isSubmitting}>
            {providerForm.formState.isSubmitting ? 'Saving...' : 'Save profile'}
          </Button>
          {message ? <p className="text-sm text-moss">{message}</p> : null}
        </div>
      </form>
    </Card>
  );
}
