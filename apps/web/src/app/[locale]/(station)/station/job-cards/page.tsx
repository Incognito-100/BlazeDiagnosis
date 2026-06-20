import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Workshop job cards, assignments, blockers, diagnostics, and service status tracking."
      surface="station"
      title="Job cards"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Job cards"
      />
    </AppShell>
  );
}
