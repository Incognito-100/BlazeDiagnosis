import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="customer" title="Customer services">
      <Card>
        <CardHeader>
          <CardTitle>Customer services</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Current and historical service jobs for the customer.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
