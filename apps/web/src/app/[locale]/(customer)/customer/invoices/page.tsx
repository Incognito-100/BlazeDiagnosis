import type { Route } from 'next';
import Link from 'next/link';

import { AppShell } from '@/components/common/appShell';
import { StatusBadge } from '@/components/common/statusBadge';
import {
  ResponsiveTable,
  tableCellClassName,
  tableHeadClassName,
} from '@/components/data-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { CustomerInvoiceSummary } from '@/types/invoices';
import type { StatusTone } from '@/types/ui';

const currencyFormatter = new Intl.NumberFormat('en-ZA', {
  currency: 'ZAR',
  style: 'currency',
});

const invoices: CustomerInvoiceSummary[] = [
  {
    dueDate: '2026-06-24',
    id: 'inv-2026-001',
    invoiceNumber: 'INV-2026-001',
    issueDate: '2026-06-10',
    status: 'PENDING',
    subtotalCents: 120000,
    totalCents: 138000,
    vatCents: 18000,
  },
];

const statusTone: Record<CustomerInvoiceSummary['status'], StatusTone> = {
  OVERDUE: 'danger',
  PAID: 'success',
  PENDING: 'warning',
};

export default function CustomerInvoicesPage() {
  return (
    <AppShell
      description="Review active and historical invoices, payment status, and linked service receipts."
      surface="customer"
      title="Customer invoices"
    >
      <Card>
        <CardHeader>
          <CardTitle>Invoice history</CardTitle>
          <CardDescription>
            MVP invoice data is currently static until invoice queries are connected to the tenant-aware service layer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveTable>
            <thead>
              <tr className={tableHeadClassName}>
                <th className={tableCellClassName}>Invoice</th>
                <th className={tableCellClassName}>Issued</th>
                <th className={tableCellClassName}>Due</th>
                <th className={tableCellClassName}>Subtotal</th>
                <th className={tableCellClassName}>VAT</th>
                <th className={tableCellClassName}>Total</th>
                <th className={tableCellClassName}>Status</th>
                <th className={`${tableCellClassName} text-right`}>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((invoice) => (
                <tr className="transition hover:bg-muted/40" key={invoice.id}>
                  <td className={`${tableCellClassName} font-mono font-semibold`}>
                    {invoice.invoiceNumber}
                  </td>
                  <td className={`${tableCellClassName} text-muted-foreground`}>
                    {invoice.issueDate}
                  </td>
                  <td className={`${tableCellClassName} text-muted-foreground`}>
                    {invoice.dueDate}
                  </td>
                  <td className={`${tableCellClassName} text-muted-foreground`}>
                    {currencyFormatter.format(invoice.subtotalCents / 100)}
                  </td>
                  <td className={`${tableCellClassName} text-muted-foreground`}>
                    {currencyFormatter.format(invoice.vatCents / 100)}
                  </td>
                  <td className={`${tableCellClassName} font-semibold`}>
                    {currencyFormatter.format(invoice.totalCents / 100)}
                  </td>
                  <td className={tableCellClassName}>
                    <StatusBadge tone={statusTone[invoice.status]}>{invoice.status}</StatusBadge>
                  </td>
                  <td className={`${tableCellClassName} text-right`}>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/en/customer/invoices/${invoice.id}` as Route}>
                        View receipt
                      </Link>
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
