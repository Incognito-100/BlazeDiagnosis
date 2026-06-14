import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="platform" title="Tenants">
      <Card>
        <CardHeader>
          <CardTitle>Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            SaaS tenant creation, suspension, and support overview.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
