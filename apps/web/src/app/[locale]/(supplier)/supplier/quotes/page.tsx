import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Supplier quote responses, availability, price, ETA, and alternative parts."
      surface="supplier"
      title="Supplier quotes"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Supplier quotes"
      />
    </AppShell>
  );
}
