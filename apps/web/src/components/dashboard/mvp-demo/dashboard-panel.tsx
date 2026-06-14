import { StatusBadge } from '@/components/status';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const cards = [
  { title: 'Jobs awaiting approval', value: '3', status: 'ACTION' },
  { title: 'Vehicles ready for collection', value: '2', status: 'READY' },
  { title: 'Parts waiting', value: '4', status: 'BLOCKED' },
];

export function DashboardPanel() {
  return (
    <section aria-labelledby="mvp-dashboard-title" className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold" id="mvp-dashboard-title">
          Operations snapshot
        </h2>
        <p className="text-sm text-neutral-600">
          Demo cards migrated from the legacy frontend into the web app.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-neutral-600">
                {card.title}
              </CardTitle>
              <StatusBadge value={card.status} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
