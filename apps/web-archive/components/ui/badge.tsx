import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning';
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        tone === 'neutral' && 'bg-mist text-ink',
        tone === 'success' && 'bg-moss/20 text-moss',
        tone === 'warning' && 'bg-ember/15 text-ember',
      )}
    >
      {children}
    </span>
  );
}
