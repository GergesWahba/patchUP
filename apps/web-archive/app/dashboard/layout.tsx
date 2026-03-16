import type { ReactNode } from 'react';
import { AuthGuard } from '@/components/layout/auth-guard';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard roles={['customer', 'provider', 'admin']}>
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[260px_1fr]">
        <DashboardSidebar />
        <div>{children}</div>
      </div>
    </AuthGuard>
  );
}
