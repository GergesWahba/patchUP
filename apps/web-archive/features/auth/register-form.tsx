'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { USER_ROLES } from '@patchup/shared';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { type RegisterFormValues, registerSchema } from './schemas';

export function RegisterForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'customer',
    },
  });

  const roles = USER_ROLES.filter((role) => role !== 'admin');

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError('');
    try {
      const response = await api.post('/auth/register', values);
      setSession(response.data.data);
      const role = response.data.data.user.role;
      router.push(role === 'provider' ? '/dashboard/provider' : '/dashboard/customer');
    } catch (error: any) {
      setServerError(error.response?.data?.message ?? 'Unable to create account.');
    }
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-black">Create your PatchUp account</h1>
          <p className="mt-2 text-sm text-ink/65">
            Join as a customer to request help or as a provider to accept local jobs.
          </p>
        </div>

        <FormField label="Full name" error={errors.name?.message}>
          <Input placeholder="Jordan Lee" {...register('name')} />
        </FormField>

        <FormField label="Phone" error={errors.phone?.message}>
          <Input placeholder="312-555-0123" {...register('phone')} />
        </FormField>

        <FormField label="Email" error={errors.email?.message}>
          <Input type="email" placeholder="you@example.com" {...register('email')} />
        </FormField>

        <FormField label="Account type" error={errors.role?.message}>
          <Select {...register('role')}>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <Input type="password" placeholder="Create a strong password" {...register('password')} />
        </FormField>

        <div className="md:col-span-2">
          {serverError ? <p className="mb-3 text-sm text-rose-600">{serverError}</p> : null}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
