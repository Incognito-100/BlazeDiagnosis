import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell surface="station" title="Job cards">
      <Card>
        <CardHeader>
          <CardTitle>Job cards</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">
            Workshop job cards, assignments, and statuses.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
