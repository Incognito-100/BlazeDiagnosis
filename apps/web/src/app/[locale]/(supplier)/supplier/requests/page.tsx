import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="supplier" title="Supplier requests">
      <Card>
        <CardHeader>
          <CardTitle>Supplier requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Incoming parts requests from connected service stations.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
