'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/auth-store';

export function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-clay/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-ink">
          PatchUp
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/categories">Categories</Link>
          {isAuthenticated ? (
            <Link href={user?.role === 'provider' ? '/dashboard/provider' : '/dashboard/customer'}>
              Dashboard
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  logout();
                  router.push('/');
                }}
              >
                Log out
              </Button>
              <Button
                onClick={() =>
                  router.push(
                    user?.role === 'provider'
                      ? '/dashboard/provider'
                      : user?.role === 'admin'
                        ? '/dashboard/admin'
                        : '/dashboard/customer',
                  )
                }
              >
                Open dashboard
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push('/login')}>
                Log in
              </Button>
              <Button variant="secondary" onClick={() => router.push('/register')}>
                Get started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
