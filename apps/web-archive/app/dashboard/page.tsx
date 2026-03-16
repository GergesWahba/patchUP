'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;
    router.replace(
      user.role === 'provider'
        ? '/dashboard/provider'
        : user.role === 'admin'
          ? '/dashboard/admin'
          : '/dashboard/customer',
    );
  }, [router, user]);

  return null;
}
