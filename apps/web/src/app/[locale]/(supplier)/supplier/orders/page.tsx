import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="supplier" title="Supplier orders">
      <Card>
        <CardHeader>
          <CardTitle>Supplier orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Accepted parts orders awaiting dispatch or delivery.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
