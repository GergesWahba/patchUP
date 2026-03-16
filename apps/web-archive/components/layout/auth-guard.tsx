'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { UserRole } from '@patchup/shared';
import { Spinner } from '@/components/ui/spinner';
import { useAuthStore } from '@/lib/auth-store';

export function AuthGuard({
  children,
  roles,
}: {
  children: ReactNode;
  roles?: UserRole[];
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (roles && user && !roles.includes(user.role)) {
      router.replace(
        user.role === 'provider'
          ? '/dashboard/provider'
          : user.role === 'admin'
            ? '/dashboard/admin'
            : '/dashboard/customer',
      );
    }
  }, [isAuthenticated, isLoading, roles, router, user]);

  if (isLoading || !isAuthenticated || (roles && user && !roles.includes(user.role))) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
