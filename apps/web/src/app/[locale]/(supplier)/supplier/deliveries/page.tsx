import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="supplier" title="Supplier deliveries">
      <Card>
        <CardHeader>
          <CardTitle>Supplier deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Delivery status, ETA, proof of delivery, and delay notes.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
