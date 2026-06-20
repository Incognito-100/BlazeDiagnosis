import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Parts requests, supplier responses, ETA tracking, and delivery dependency visibility."
      surface="station"
      title="Parts"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Parts workflow"
      />
    </AppShell>
  );
}
