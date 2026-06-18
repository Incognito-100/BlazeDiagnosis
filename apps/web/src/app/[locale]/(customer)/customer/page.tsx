import { AppShell } from '@/components/common/app-shell';
import { StatCard } from '@/components/common/stat-card';
import CustomerPage from '@/components/Customer/Customer-Form';
import { CustomerList } from '@/components/Customer/Customer-list';

export default function CustomerDashboardPage() {
  return (
    <AppShell title="Customer dashboard" surface="customer">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active services" value="1" />
        <StatCard label="Quotes awaiting approval" value="1" />
        <StatCard label="Open invoices" value="0" />
        <StatCard label="Vehicles" value="2" />
      </div>
      <CustomerPage/>
      <CustomerList/>
    </AppShell>
  );
}
