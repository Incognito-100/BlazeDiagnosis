import { cn } from '@/lib/utils';

import type { FormActionsProps } from '@/types/ui';

export function FormActions({ children, className }: FormActionsProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {children}
    </div>
  );
}
