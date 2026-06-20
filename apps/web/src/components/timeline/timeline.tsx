import { cn } from '@/lib/utils';

import type { TimelineProps } from '@/types/ui';

export function Timeline({
  className,
  emptyMessage = 'No timeline events yet.',
  items,
}: TimelineProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ol className={cn('space-y-4', className)}>
      {items.map((item) => (
        <li className="relative border-l-4 border-accent/45 pl-4" key={item.id}>
          <div className="font-medium text-foreground">{item.title}</div>
          {item.subtitle ? (
            <div className="mt-1 text-sm text-muted-foreground">{item.subtitle}</div>
          ) : null}
          {item.timestamp ? (
            <time className="mt-1 block text-xs text-muted-foreground">
              {item.timestamp}
            </time>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
