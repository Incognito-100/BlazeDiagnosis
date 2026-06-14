import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
};

const tones = {
  neutral: 'border-neutral-300 bg-neutral-100 text-neutral-800',
  success: 'border-green-300 bg-green-50 text-green-800',
  warning: 'border-yellow-300 bg-yellow-50 text-yellow-800',
  danger: 'border-red-300 bg-red-50 text-red-800',
};

export function StatusBadge({ children, tone = 'neutral' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full border px-2 py-1 text-xs font-medium',
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
