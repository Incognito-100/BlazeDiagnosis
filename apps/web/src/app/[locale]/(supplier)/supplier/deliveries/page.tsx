import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Delivery ETA, proof of delivery, courier details, and delay notes."
      surface="supplier"
      title="Supplier deliveries"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Supplier deliveries"
      />
    </AppShell>
  );
}
