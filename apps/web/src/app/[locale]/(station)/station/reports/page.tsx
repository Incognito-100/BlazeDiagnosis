import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Operational reports for revenue, delayed jobs, quotes, suppliers, and invoice exposure."
      surface="station"
      title="Reports"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Reports"
      />
    </AppShell>
  );
}
