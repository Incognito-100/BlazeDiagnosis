import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Customer-owned vehicle profiles and service-history entry points."
      surface="customer"
      title="Vehicles"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Customer vehicles"
      />
    </AppShell>
  );
}
