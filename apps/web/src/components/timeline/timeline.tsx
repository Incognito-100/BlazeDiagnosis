import { cn } from '@/lib/utils';

export type TimelineItem = {
  id: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
};

type TimelineProps = {
  items?: TimelineItem[];
  className?: string;
};

export function Timeline({ className, items = [] }: TimelineProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border bg-white p-4 text-sm text-neutral-500">
        No timeline events yet.
      </p>
    );
  }

  return (
    <ol className={cn('grid gap-3', className)}>
      {items.map((item) => (
        <li className="border-l-4 border-neutral-300 pl-3" key={item.id}>
          <div className="font-medium text-neutral-950">{item.title}</div>
          {item.subtitle ? (
            <div className="text-sm text-neutral-600">{item.subtitle}</div>
          ) : null}
          {item.timestamp ? (
            <time className="text-xs text-neutral-500">{item.timestamp}</time>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
