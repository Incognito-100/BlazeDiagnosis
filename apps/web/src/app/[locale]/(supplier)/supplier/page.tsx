import { Clock3, PackageCheck, PackageX, Send } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { PlaceholderCard } from '@/components/common/placeholderCard';
import { StatCard } from '@/components/common/statCard';

export default function SupplierDashboardPage() {
  return (
    <AppShell
      description="Supplier workspace for incoming parts requests, quote responses, accepted orders, and delivery exceptions."
      surface="supplier"
      title="Parts supplier dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard description="Needs availability and price" icon={<Send className="size-4" />} label="New requests" value="5" />
        <StatCard description="Awaiting station review" icon={<Clock3 className="size-4" />} label="Pending responses" value="2" />
        <StatCard description="Ready for dispatch" icon={<PackageCheck className="size-4" />} label="Orders to dispatch" value="3" />
        <StatCard description="Past original ETA" icon={<PackageX className="size-4" />} label="Delayed deliveries" value="1" />
      </div>

      <PlaceholderCard
        description="A responsive supplier action queue will list requests by urgency, ETA risk, price confirmation, and delivery status."
        title="Supplier action queue"
      />
    </AppShell>
  );
}
