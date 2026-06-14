import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="customer" title="Customer quotes">
      <Card>
        <CardHeader>
          <CardTitle>Customer quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Quotes awaiting item-level approval and quote history.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
