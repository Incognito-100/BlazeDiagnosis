import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="supplier" title="Supplier messages">
      <Card>
        <CardHeader>
          <CardTitle>Supplier messages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Station-to-supplier chat threads.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
