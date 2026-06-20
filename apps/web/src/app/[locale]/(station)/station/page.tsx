import { CircleDollarSign, FileClock, PackageSearch, Wrench } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { StatCard } from '@/components/common/statCard';
import { PlaceholderCard } from '@/components/common/placeholderCard';

export default function StationDashboardPage() {
  return (
    <AppShell
      description="Operational command centre for workshop queues, approvals, parts blockers, and invoicing."
      surface="station"
      title="Service-station dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard description="Across all service stages" icon={<Wrench className="size-4" />} label="Open jobs" value="12" />
        <StatCard description="Customer action required" icon={<FileClock className="size-4" />} label="Awaiting approval" value="4" />
        <StatCard description="Supplier dependency" icon={<PackageSearch className="size-4" />} label="Awaiting parts" value="3" />
        <StatCard description="Requires follow-up" icon={<CircleDollarSign className="size-4" />} label="Outstanding invoices" value="7" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PlaceholderCard
          description="Kanban-style job status board will surface intake, diagnostics, approvals, parts, work in progress, QC, and ready-for-collection lanes."
          title="Workshop board"
        />
        <PlaceholderCard
          description="Priority queue for approvals, delayed parts, overdue jobs, and invoices that need intervention."
          title="Attention queue"
        />
      </div>
    </AppShell>
  );
}
