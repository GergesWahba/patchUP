'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';

const customerLinks = [
  { href: '/dashboard/customer', label: 'Overview' },
  { href: '/requests/new', label: 'Create request' },
  { href: '/dashboard/messages', label: 'Messages' },
  { href: '/dashboard/profile', label: 'Profile' },
];

const providerLinks = [
  { href: '/dashboard/provider', label: 'Jobs' },
  { href: '/dashboard/messages', label: 'Messages' },
  { href: '/dashboard/profile', label: 'Profile' },
];

const adminLinks = [
  { href: '/dashboard/admin', label: 'Admin foundation' },
  { href: '/dashboard/messages', label: 'Messages' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const links =
    user?.role === 'provider' ? providerLinks : user?.role === 'admin' ? adminLinks : customerLinks;

  return (
    <aside className="rounded-[28px] border border-white/80 bg-white/80 p-4 shadow-soft">
      <p className="px-3 pb-3 text-sm font-semibold uppercase tracking-wide text-ink/50">
        {user?.role === 'provider'
          ? 'Provider workspace'
          : user?.role === 'admin'
            ? 'Admin foundation'
            : 'Customer workspace'}
      </p>
      <div className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block rounded-2xl px-3 py-3 text-sm font-medium',
              pathname === link.href ? 'bg-ink text-white' : 'text-ink/70 hover:bg-mist',
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
