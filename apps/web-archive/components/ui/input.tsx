import * as React from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm placeholder:text-ink/40 focus:border-ember',
        className,
      )}
      {...props}
    />
  );
}
