import type { ReactNode } from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FormFieldProps = {
  children: ReactNode;
  description?: string;
  error?: string;
  id: string;
  label: string;
  className?: string;
};

export function FormField({
  children,
  className,
  description,
  error,
  id,
  label,
}: FormFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('grid gap-2', className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {description ? (
        <p className="text-sm text-neutral-500" id={descriptionId}>
          {description}
        </p>
      ) : null}
      {error ? (
        <p
          className="text-sm font-medium text-red-700"
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
