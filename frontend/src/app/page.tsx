import { AppShell } from '../components/layout';
import { DashboardPanel } from '../features/dashboard/components/DashboardPanel';
import { CustomersPanel } from '../features/customers/components/CustomersPanel';
import { VehiclesPanel } from '../features/vehicles/components/VehiclesPanel';
import { JobsPanel } from '../features/jobs/components/JobsPanel';
import { QuotesPanel } from '../features/quotes/components/QuotesPanel';
import { PartsPanel } from '../features/parts/components/PartsPanel';

export default function HomePage() {
  return (
    <AppShell title="Vehicle Service Platform Starter">
      {/* The div was  using inline style instead of Tailwind CSS.*/}
      <div className="grid gap-6">
        <DashboardPanel />
        <CustomersPanel />
        <VehiclesPanel />
        <JobsPanel />
        <QuotesPanel />
        <PartsPanel/>
      </div>
    </AppShell>
  );
}
