import { AppShell } from '@/components/common/appShell';
import { StatusBadge } from '@/components/common/statusBadge';
import {
  ResponsiveTable,
  tableCellClassName,
  tableHeadClassName,
} from '@/components/data-display';
import { PartsRequestForm } from '@/components/forms/partsRequestForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PartsRequestPage() {
  return (
    <AppShell
      description="Standalone demo form for validating the supplier request flow before moving it into the station parts workspace."
      surface="station"
      title="Parts request demo"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_28rem]">
        <PartsRequestForm jobCardId="00000000-0000-0000-0000-000000000101" />

        <Card>
          <CardHeader>
            <CardTitle>Submitted requests</CardTitle>
            <CardDescription>Static demo data for UX review.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveTable>
              <thead>
                <tr className={tableHeadClassName}>
                  <th className={tableCellClassName}>Part</th>
                  <th className={tableCellClassName}>Quantity</th>
                  <th className={tableCellClassName}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tableCellClassName}>Brake pads</td>
                  <td className={tableCellClassName}>4</td>
                  <td className={tableCellClassName}>
                    <StatusBadge tone="warning">Pending</StatusBadge>
                  </td>
                </tr>
              </tbody>
            </ResponsiveTable>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
