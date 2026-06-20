import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function Page() {
  return (
    <AppShell
      description="Platform tenant directory with branding, domains, status, and configuration entry points."
      surface="platform"
      title="Tenants"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Tenants"
      />
    </AppShell>
  );
}
