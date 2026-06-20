import { notFound } from 'next/navigation';

import { AppShell } from '@/components/common/appShell';
import { StatusBadge } from '@/components/common/statusBadge';
import {
  ResponsiveTable,
  tableCellClassName,
  tableHeadClassName,
} from '@/components/data-display';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { InvoiceDetail } from '@/types/invoices';
import type { IdPageProps } from '@/types/routes';

const currencyFormatter = new Intl.NumberFormat('en-ZA', {
  currency: 'ZAR',
  style: 'currency',
});

const demoInvoice: InvoiceDetail = {
  customerRef: 'CUS-001',
  dueDate: '2026-06-24',
  id: 'inv-2026-001',
  invoiceNumber: 'INV-2026-001',
  issuedAt: '2026-06-10',
  jobCardId: 'JOB-2026-0042',
  lineItems: [
    {
      amountCents: 85000,
      description: 'Diagnostic labour and road test',
      id: 'line-1',
      quantity: 1,
      type: 'LABOUR' as const,
      unitPriceCents: 85000,
    },
    {
      amountCents: 35000,
      description: 'Replacement brake sensor',
      id: 'line-2',
      quantity: 1,
      type: 'PART' as const,
      unitPriceCents: 35000,
    },
  ],
  status: 'PENDING' as const,
  subtotalCents: 120000,
  totalCents: 138000,
  vatCents: 18000,
};

export default async function InvoiceDetailPage({ params }: IdPageProps) {
  const { id } = await params;

  if (id !== demoInvoice.id) {
    notFound();
  }

  return (
    <AppShell
      description="Customer-readable invoice detail with line items, VAT, linked job card, and payment status."
      surface="customer"
      title={`Invoice ${demoInvoice.invoiceNumber}`}
    >
      <div className="grid gap-6">
        <Card>
          <CardContent className="grid gap-4 pt-6 md:grid-cols-4">
            <SummaryItem label="Linked job card" value={demoInvoice.jobCardId} />
            <SummaryItem label="Customer reference" value={demoInvoice.customerRef} />
            <SummaryItem label="Issued" value={demoInvoice.issuedAt} />
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Status
              </p>
              <div className="mt-2">
                <StatusBadge tone="warning">{demoInvoice.status}</StatusBadge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax invoice statement</CardTitle>
            <CardDescription>Blaze Diagnostics workshop service receipt.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveTable>
              <thead>
                <tr className={tableHeadClassName}>
                  <th className={tableCellClassName}>Type</th>
                  <th className={tableCellClassName}>Item and description</th>
                  <th className={`${tableCellClassName} text-center`}>Qty</th>
                  <th className={`${tableCellClassName} text-right`}>Unit price</th>
                  <th className={`${tableCellClassName} text-right`}>Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {demoInvoice.lineItems.map((item) => (
                  <tr key={item.id}>
                    <td className={tableCellClassName}>
                      <StatusBadge tone={item.type === 'LABOUR' ? 'neutral' : 'success'}>
                        {item.type}
                      </StatusBadge>
                    </td>
                    <td className={`${tableCellClassName} font-medium`}>
                      {item.description}
                    </td>
                    <td className={`${tableCellClassName} text-center font-mono`}>
                      {item.quantity}
                    </td>
                    <td className={`${tableCellClassName} text-right font-mono text-muted-foreground`}>
                      {currencyFormatter.format(item.unitPriceCents / 100)}
                    </td>
                    <td className={`${tableCellClassName} text-right font-mono font-semibold`}>
                      {currencyFormatter.format(item.amountCents / 100)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </ResponsiveTable>

            <div className="mt-6 flex justify-end">
              <div className="w-full max-w-sm rounded-xl border border-border bg-muted/40 p-4 text-sm">
                <TotalRow label="Subtotal" value={currencyFormatter.format(demoInvoice.subtotalCents / 100)} />
                <TotalRow label="VAT (15%)" value={currencyFormatter.format(demoInvoice.vatCents / 100)} />
                <div className="mt-3 border-t border-border pt-3">
                  <TotalRow emphasis label="Total due" value={currencyFormatter.format(demoInvoice.totalCents / 100)} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function TotalRow({ emphasis = false, label, value }: { emphasis?: boolean; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <span className={emphasis ? 'font-semibold text-foreground' : 'text-muted-foreground'}>{label}</span>
      <span className={emphasis ? 'font-mono text-lg font-bold text-foreground' : 'font-mono text-foreground'}>{value}</span>
    </div>
  );
}
