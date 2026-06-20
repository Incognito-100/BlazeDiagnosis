import { Activity, Building2, Flag, ShieldAlert } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';
import { StatCard } from '@/components/common/statCard';

export default function PlatformDashboardPage() {
  return (
    <AppShell
      description="SaaS operations dashboard for tenant lifecycle, subscription readiness, feature flags, and platform audit controls."
      surface="platform"
      title="Platform admin dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard description="Provisioned tenants" icon={<Building2 className="size-4" />} label="Active tenants" value="0" />
        <StatCard description="Onboarding pipeline" icon={<Activity className="size-4" />} label="Trial tenants" value="0" />
        <StatCard description="Requires billing/support review" icon={<ShieldAlert className="size-4" />} label="Suspended tenants" value="0" />
        <StatCard description="Tenant-controlled rollout" icon={<Flag className="size-4" />} label="Feature flags" value="0" />
      </div>

      <PlaceholderCard
        description="Platform metrics will summarize usage, storage, tenant health, subscription status, and feature adoption."
        title="SaaS operations overview"
      />
    </AppShell>
  );
}
