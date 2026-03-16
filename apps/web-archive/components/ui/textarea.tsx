import * as React from 'react';
import { cn } from '@/lib/utils';

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-32 w-full rounded-3xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm placeholder:text-ink/40 focus:border-ember',
        className,
      )}
      {...props}
    />
  );
}
