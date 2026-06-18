import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomerList } from '@/components/Customer/Customer-list';

export default function Page() {
  return (
    <AppShell surface="station" title="Customers">
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerList />
          <p className="text-sm text-neutral-600">
            Tenant customer management and customer search.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
