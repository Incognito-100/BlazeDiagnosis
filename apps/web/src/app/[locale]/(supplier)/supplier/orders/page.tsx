import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Accepted parts orders awaiting dispatch, in transit, delayed, or delivered."
      surface="supplier"
      title="Supplier orders"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Supplier orders"
      />
    </AppShell>
  );
}
