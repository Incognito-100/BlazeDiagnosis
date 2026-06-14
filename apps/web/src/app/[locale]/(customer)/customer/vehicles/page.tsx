import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="customer" title="Customer vehicles">
      <Card>
        <CardHeader>
          <CardTitle>Customer vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Vehicle profiles linked to the signed-in customer.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
