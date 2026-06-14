import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="platform" title="Feature flags">
      <Card>
        <CardHeader>
          <CardTitle>Feature flags</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Per-tenant feature flag controls.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
