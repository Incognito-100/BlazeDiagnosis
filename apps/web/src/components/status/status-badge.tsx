import { StatusBadge as BaseStatusBadge } from '@/components/common/status-badge';

type StatusBadgeProps = {
  value: string;
};

function toneForStatus(
  value: string,
): 'neutral' | 'success' | 'warning' | 'danger' {
  const normalized = value.toLowerCase();

  if (
    normalized.includes('paid') ||
    normalized.includes('ready') ||
    normalized.includes('delivered')
  ) {
    return 'success';
  }

  if (
    normalized.includes('blocked') ||
    normalized.includes('overdue') ||
    normalized.includes('out')
  ) {
    return 'danger';
  }

  if (
    normalized.includes('awaiting') ||
    normalized.includes('action') ||
    normalized.includes('low')
  ) {
    return 'warning';
  }

  return 'neutral';
}

export function StatusBadge({ value }: StatusBadgeProps) {
  return <BaseStatusBadge tone={toneForStatus(value)}>{value}</BaseStatusBadge>;
}
