import { StatusBadge } from '@/components/status';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/lib/formatting/money';

const invoices = [
  {
    id: 'INV-2026-001',
    customer: 'John Doe',
    vehicle: 'Toyota Camry',
    total: 453.6,
    status: 'Paid',
  },
  {
    id: 'INV-2026-003',
    customer: 'Carlos Ramirez',
    vehicle: 'Ford F-150',
    total: 1386.75,
    status: 'Unpaid',
  },
  {
    id: 'INV-2026-007',
    customer: 'Mark Thompson',
    vehicle: 'Chevrolet Malibu',
    total: 401.25,
    status: 'Overdue',
  },
];

export function InvoicesPanel() {
  return (
    <section aria-labelledby="mvp-invoices-title" className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold" id="mvp-invoices-title">
          Invoices
        </h2>
        <p className="text-sm text-muted-foreground">
          Responsive invoice summary migrated from the legacy table concept.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent invoices</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2 pr-4">Invoice</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Vehicle</th>
                <th className="py-2 pr-4 text-right">Total</th>
                <th className="py-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr className="border-b last:border-0" key={invoice.id}>
                  <td className="py-2 pr-4 font-medium">{invoice.id}</td>
                  <td className="py-2 pr-4">{invoice.customer}</td>
                  <td className="py-2 pr-4">{invoice.vehicle}</td>
                  <td className="py-2 pr-4 text-right">
                    {formatMoney(invoice.total)}
                  </td>
                  <td className="py-2 text-right">
                    <StatusBadge value={invoice.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </section>
  );
}
