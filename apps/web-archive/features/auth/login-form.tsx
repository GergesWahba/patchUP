'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { type LoginFormValues, loginSchema } from './schemas';

export function LoginForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError('');
    try {
      const response = await api.post('/auth/login', values);
      setSession(response.data.data);
      const role = response.data.data.user.role;
      router.push(role === 'provider' ? '/dashboard/provider' : '/dashboard/customer');
    } catch (error: any) {
      setServerError(error.response?.data?.message ?? 'Unable to log in.');
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className="text-3xl font-black">Welcome back</h1>
          <p className="mt-2 text-sm text-ink/65">Pick up right where your jobs left off.</p>
        </div>

        <FormField label="Email" error={errors.email?.message}>
          <Input type="email" placeholder="you@example.com" {...register('email')} />
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <Input type="password" placeholder="••••••••" {...register('password')} />
        </FormField>

        {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </Card>
  );
}
