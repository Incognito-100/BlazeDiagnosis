import { AppShell } from '@/components/common/appShell';
import { StatusBadge } from '@/components/common/statusBadge';
import {
  ResponsiveTable,
  tableCellClassName,
  tableHeadClassName,
} from '@/components/data-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AuditLog } from '@/types/audit';

const demoLogs: AuditLog[] = [
  {
    action: 'quote.approved',
    actorUserId: 'user-demo-001',
    createdAt: '2026-06-18T09:30:00.000Z',
    entityId: 'quote-demo-001',
    entityType: 'quote',
    id: 'audit-001',
    newValue: { approvedItems: 3, total: '1380.00' },
  },
  {
    action: 'parts.requested',
    actorUserId: 'user-demo-002',
    createdAt: '2026-06-18T11:15:00.000Z',
    entityId: 'parts-demo-001',
    entityType: 'parts_request',
    id: 'audit-002',
    newValue: { etaRequired: true, status: 'sent' },
  },
];

export default function AuditLogsPage() {
  return (
    <AppShell
      description="Track important tenant, workflow, quote, invoice, supplier, and platform events."
      surface="platform"
      title="Audit logs"
    >
      <Card>
        <CardHeader>
          <CardTitle>Audit event search</CardTitle>
          <CardDescription>
            Static MVP data is used here to keep the interface build-safe until the audit query endpoint is wired to authenticated tenant context.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="mb-6 grid gap-4 rounded-xl border border-border bg-muted/40 p-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div className="grid gap-2">
              <Label htmlFor="action">Filter by action</Label>
              <Input disabled id="action" placeholder="quote.approved" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="entityType">Filter by entity</Label>
              <Input disabled id="entityType" placeholder="quote, invoice, job_card..." />
            </div>
            <Button disabled type="submit" variant="outline">
              Apply filters
            </Button>
          </form>

          <ResponsiveTable>
            <thead>
              <tr className={tableHeadClassName}>
                <th className={tableCellClassName}>Timestamp</th>
                <th className={tableCellClassName}>Action</th>
                <th className={tableCellClassName}>Target</th>
                <th className={tableCellClassName}>Actor</th>
                <th className={tableCellClassName}>Context changes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {demoLogs.map((log) => (
                <tr className="transition hover:bg-muted/40" key={log.id}>
                  <td className={`${tableCellClassName} whitespace-nowrap text-xs text-muted-foreground`}>
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className={tableCellClassName}>
                    <StatusBadge tone="success">{log.action}</StatusBadge>
                  </td>
                  <td className={tableCellClassName}>
                    <div className="text-sm font-semibold text-foreground">{log.entityType}</div>
                    <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {log.entityId ?? 'N/A'}
                    </div>
                  </td>
                  <td className={`${tableCellClassName} font-mono text-xs text-muted-foreground`}>
                    {log.actorUserId ?? 'System'}
                  </td>
                  <td className={tableCellClassName}>
                    <pre className="max-h-28 max-w-sm overflow-auto rounded-lg border border-border bg-muted p-3 text-xs text-muted-foreground">
                      {JSON.stringify(log.newValue, null, 2)}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </ResponsiveTable>
        </CardContent>
      </Card>
    </AppShell>
  );
}
