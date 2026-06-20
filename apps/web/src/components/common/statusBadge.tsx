import { cn } from '@/lib/utils';

import type { StatusBadgeProps, StatusTone } from '@/types/ui';

const tones: Record<StatusTone, string> = {
  danger: 'border-destructive/25 bg-destructive/10 text-destructive',
  info: 'border-secondary/60 bg-secondary/70 text-secondary-foreground',
  neutral: 'border-border bg-muted text-muted-foreground',
  success: 'border-success/25 bg-success/10 text-success',
  warning: 'border-warning/25 bg-warning/10 text-warning',
};

export function StatusBadge({
  children,
  className,
  tone = 'neutral',
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-none',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
