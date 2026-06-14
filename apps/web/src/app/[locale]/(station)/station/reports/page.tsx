import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="station" title="Reports">
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            MVP operational reports and delayed-work views.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
