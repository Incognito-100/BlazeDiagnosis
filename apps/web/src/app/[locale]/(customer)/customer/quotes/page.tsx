import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Active, approved, and declined quote items with mobile-first approval history."
      surface="customer"
      title="Quotes"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Customer quotes"
      />
    </AppShell>
  );
}
