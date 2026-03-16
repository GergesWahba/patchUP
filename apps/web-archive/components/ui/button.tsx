import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'bg-ink text-white hover:bg-[#20364b]',
        variant === 'secondary' && 'bg-ember text-white hover:bg-[#b45f35]',
        variant === 'ghost' && 'border border-ink/15 bg-white/70 text-ink hover:bg-white',
        className,
      )}
      {...props}
    />
  );
}
