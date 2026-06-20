import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Incoming station parts requests that need price, stock, and delivery confirmation."
      surface="supplier"
      title="Supplier requests"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Supplier requests"
      />
    </AppShell>
  );
}
