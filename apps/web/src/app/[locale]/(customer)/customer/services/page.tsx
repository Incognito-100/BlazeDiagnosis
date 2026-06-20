import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Vehicle service progress, customer-visible milestones, and collection readiness."
      surface="customer"
      title="Services"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Current services"
      />
    </AppShell>
  );
}
