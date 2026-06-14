import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="customer" title="Customer invoices">
      <Card>
        <CardHeader>
          <CardTitle>Customer invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Open and historical customer invoices.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
