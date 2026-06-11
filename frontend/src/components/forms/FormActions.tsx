import type { PropsWithChildren } from 'react';

export function FormActions({ children }: PropsWithChildren) {
  return <div className='flex gap-3 flex-wrap items-center'>{children}</div>;
}
