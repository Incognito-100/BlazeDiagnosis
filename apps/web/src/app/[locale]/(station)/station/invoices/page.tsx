import type { Route } from 'next';
import Link from 'next/link';
import { Send } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { StatusBadge } from '@/components/common/statusBadge';
import {
  ResponsiveTable,
  tableCellClassName,
  tableHeadClassName,
} from '@/components/data-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const invoices = [
  { id: 'inv_0001', number: 'WS-2026-06-0001', status: 'ISSUED', total: 'R1,234.00' },
  { id: 'inv_0002', number: 'WS-2026-06-0002', status: 'DRAFT', total: 'R2,450.00' },
];

export default function InvoiceListPage() {
  return (
    <AppShell
      actions={
        <Button disabled variant="accent">
          <Send className="size-4" />
          Issue invoice
        </Button>
      }
      description="Review draft, issued, paid, and overdue invoice records for the station tenant."
      surface="station"
      title="Invoices"
    >
      <Card>
        <CardHeader>
          <CardTitle>Invoice queue</CardTitle>
          <CardDescription>
            Static MVP data until the station invoice query is connected to the invoice service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveTable>
            <thead>
              <tr className={tableHeadClassName}>
                <th className={tableCellClassName}>Invoice</th>
                <th className={tableCellClassName}>Status</th>
                <th className={tableCellClassName}>Total</th>
                <th className={`${tableCellClassName} text-right`}>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((invoice) => (
                <tr className="transition hover:bg-muted/40" key={invoice.id}>
                  <td className={`${tableCellClassName} font-mono font-semibold`}>
                    {invoice.number}
                  </td>
                  <td className={tableCellClassName}>
                    <StatusBadge tone={invoice.status === 'DRAFT' ? 'neutral' : 'warning'}>
                      {invoice.status}
                    </StatusBadge>
                  </td>
                  <td className={`${tableCellClassName} font-semibold`}>{invoice.total}</td>
                  <td className={`${tableCellClassName} text-right`}>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/en/station/invoices/${invoice.id}` as Route}>View</Link>
                    </Button>
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
