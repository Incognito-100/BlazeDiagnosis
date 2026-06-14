import { StatusBadge } from '@/components/status';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/lib/formatting/money';

const demoQuote = {
  version: 1,
  status: 'SENT',
  subtotal: 1950,
  taxAmount: 292.5,
  discountAmount: 0,
  total: 2242.5,
  lines: [
    {
      id: '1',
      type: 'LABOR',
      description: 'Minor service labor',
      quantity: 1,
      unitPrice: 850,
      total: 850,
    },
    {
      id: '2',
      type: 'PART',
      description: 'Front brake pads',
      quantity: 1,
      unitPrice: 1100,
      total: 1100,
    },
  ],
};

export function QuoteBuilder() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Quote v{demoQuote.version}</CardTitle>
        <StatusBadge value={demoQuote.status} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-neutral-500">
                <th className="py-2 pr-4">Description</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4 text-right">Qty</th>
                <th className="py-2 pr-4 text-right">Unit</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {demoQuote.lines.map((line) => (
                <tr className="border-b last:border-0" key={line.id}>
                  <td className="py-2 pr-4">{line.description}</td>
                  <td className="py-2 pr-4">{line.type}</td>
                  <td className="py-2 pr-4 text-right">{line.quantity}</td>
                  <td className="py-2 pr-4 text-right">
                    {formatMoney(line.unitPrice)}
                  </td>
                  <td className="py-2 text-right font-medium">
                    {formatMoney(line.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <dl className="ml-auto grid w-full max-w-xs gap-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatMoney(demoQuote.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Tax</dt>
            <dd>{formatMoney(demoQuote.taxAmount)}</dd>
          </div>
          <div className="flex justify-between border-t pt-2 font-bold">
            <dt>Total</dt>
            <dd>{formatMoney(demoQuote.total)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
