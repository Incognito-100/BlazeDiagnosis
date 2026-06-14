import { StatusBadge } from '@/components/status';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const parts = [
  {
    id: 1,
    sku: 'SM-001',
    name: 'Starter Motor',
    category: 'Engine',
    quantity: 10,
    status: 'In Stock',
  },
  {
    id: 2,
    sku: 'AL-001',
    name: 'Alternator',
    category: 'Electrical',
    quantity: 5,
    status: 'Low Stock',
  },
  {
    id: 3,
    sku: 'BP-001',
    name: 'Brake Pads',
    category: 'Chassis',
    quantity: 0,
    status: 'Out of Stock',
  },
];

export function PartsPanel() {
  return (
    <section aria-labelledby="mvp-parts-title" className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold" id="mvp-parts-title">
          Parts management
        </h2>
        <p className="text-sm text-neutral-600">
          Demo inventory cards for future stock and supplier workflows.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {parts.map((part) => (
          <Card key={part.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3 text-base">
                {part.name}
                <StatusBadge value={part.status} />
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1 text-sm text-neutral-600">
              <p>SKU: {part.sku}</p>
              <p>Category: {part.category}</p>
              <p>Quantity: {part.quantity}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
