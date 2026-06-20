import { StatusBadge } from '@/components/status';
import { Timeline } from '@/components/timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const demoJob = {
  referenceNumber: 'JOB-1001',
  status: 'AWAITING_CUSTOMER_APPROVAL',
  customerComplaint: 'Brake pads worn and service light on.',
  diagnosisSummary: 'Front pads and minor service required.',
  statusHistory: [
    {
      id: 'jsh_demo_1',
      fromStatus: 'QUOTATION_IN_PROGRESS',
      toStatus: 'AWAITING_CUSTOMER_APPROVAL',
      changedByUserId: 'user_admin_demo',
    },
  ],
};

export function JobsPanel() {
  return (
    <section aria-labelledby="mvp-jobs-title" className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold" id="mvp-jobs-title">
          Job workflow
        </h2>
        <p className="text-sm text-muted-foreground">
          Demo job-card state and status timeline.
        </p>
      </div>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>{demoJob.referenceNumber}</CardTitle>
          <StatusBadge value={demoJob.status} />
        </CardHeader>
        <CardContent className="grid gap-3">
          <p className="text-sm text-muted-foreground">
            {demoJob.customerComplaint}
          </p>
          <p className="text-sm text-muted-foreground">{demoJob.diagnosisSummary}</p>
          <Timeline
            items={demoJob.statusHistory.map((item) => ({
              id: item.id,
              title: `${item.fromStatus} -> ${item.toStatus}`,
              subtitle: `Changed by ${item.changedByUserId}`,
            }))}
          />
        </CardContent>
      </Card>
    </section>
  );
}
