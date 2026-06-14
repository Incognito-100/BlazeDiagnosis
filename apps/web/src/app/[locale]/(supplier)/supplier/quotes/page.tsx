import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="supplier" title="Supplier quotes">
      <Card>
        <CardHeader>
          <CardTitle>Supplier quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Supplier quote responses and response status.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
