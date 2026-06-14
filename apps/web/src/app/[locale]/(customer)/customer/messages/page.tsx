import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="customer" title="Customer messages">
      <Card>
        <CardHeader>
          <CardTitle>Customer messages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Customer-to-station chat threads.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
