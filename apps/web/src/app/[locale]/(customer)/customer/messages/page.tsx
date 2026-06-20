import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Customer-to-station chat threads and service communication history."
      surface="customer"
      title="Messages"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Customer messages"
      />
    </AppShell>
  );
}
