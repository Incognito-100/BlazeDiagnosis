import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type FormActionsProps = PropsWithChildren<{
  className?: string;
}>;

export function FormActions({ children, className }: FormActionsProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {children}
    </div>
  );
}
