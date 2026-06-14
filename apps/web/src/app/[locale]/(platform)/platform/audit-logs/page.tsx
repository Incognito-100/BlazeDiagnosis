import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="platform" title="Audit logs">
      <Card>
        <CardHeader>
          <CardTitle>Audit logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Platform and tenant-sensitive event review.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
