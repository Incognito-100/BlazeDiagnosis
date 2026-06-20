'use client';

import type { MarketplacePanelProps, MarketplacePart } from '@/types/demo';

const testParts: MarketplacePart[] = [
  {
    id: 1,
    name: 'Brembo Front Brake Pads',
    category: 'Brakes',
    price: 'R 1,485.00',
    sku: 'BRK-4022',
    branches: [
      { name: 'NAPA Auto Parts - Downtown Hub', stock: 8, eta: '20 mins' },
      {
        name: 'AutoZone Commercial - Northside Warehouse',
        stock: 4,
        eta: '45 mins',
      },
      {
        name: 'Worldpac - Regional Distribution Center',
        stock: 15,
        eta: 'Same-day',
      },
    ],
  },
  {
    id: 2,
    name: 'Castrol EDGE 5W-30 Synthetic (5L)',
    category: 'Fluids',
    price: 'R 735.00',
    sku: 'OIL-5W30-C',
    branches: [
      {
        name: 'AutoZone Commercial - Northside Warehouse',
        stock: 24,
        eta: '15 mins',
      },
      { name: 'NAPA Auto Parts - East Branch', stock: 12, eta: '30 mins' },
    ],
  },
  {
    id: 3,
    name: 'Michelin Pilot Sport 4S (245/40R18)',
    category: 'Tyres',
    price: 'R 3,465.00',
    sku: 'TIR-2454018',
    branches: [
      {
        name: 'Worldpac - Regional Distribution Center',
        stock: 8,
        eta: 'Next-day freight',
      },
      { name: 'NAPA Auto Parts - Downtown Hub', stock: 2, eta: '1 hour' },
    ],
  },
  {
    id: 4,
    name: 'Bosch AGM Battery Group 35',
    category: 'Electrical',
    price: 'R 2,725.00',
    sku: 'BAT-AGM35',
    branches: [
      {
        name: 'AutoZone Commercial - Northside Warehouse',
        stock: 3,
        eta: '30 mins',
      },
      { name: 'NAPA Auto Parts - Downtown Hub', stock: 2, eta: '25 mins' },
    ],
  },
];

export function MarketplacePanel({
  onSelectPart,
  selectedPartId,
}: MarketplacePanelProps) {
  const activePart =
    testParts.find((part) => part.id === selectedPartId) ?? testParts[0];

  return (
    <section aria-labelledby="mvp-marketplace-title" className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold" id="mvp-marketplace-title">
          Supplier marketplace
        </h2>
        <p className="text-sm text-muted-foreground">
          Demo supplier branch stock and ETA comparison.
        </p>
      </div>
      <div className="grid gap-6 rounded-xl border bg-card p-6 text-foreground lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4 md:grid-cols-2">
          {testParts.map((part) => {
            const isActive = part.id === activePart.id;
            const totalStock = part.branches.reduce(
              (sum, branch) => sum + branch.stock,
              0,
            );

            return (
              <button
                aria-pressed={isActive}
                className={`rounded-xl border p-5 text-left transition ${
                  isActive
                    ? 'border-secondary bg-secondary/70'
                    : 'border-border bg-muted/40 hover:bg-muted/60'
                }`}
                key={part.id}
                onClick={() => onSelectPart(part.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                    {part.category}
                  </span>
                  <span className="rounded bg-success/10 px-2 py-0.5 text-xs font-bold text-success">
                    {totalStock} available
                  </span>
                </div>
                <h3 className="mt-3 font-bold">{part.name}</h3>
                <p className="text-xs text-muted-foreground">SKU: {part.sku}</p>
                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground">Trade cost</p>
                  <p className="text-lg font-bold">{part.price}</p>
                </div>
              </button>
            );
          })}
        </div>

        <aside className="rounded-xl border border-border bg-muted/40 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-secondary-foreground">
            Branch sourcing
          </p>
          <h3 className="mt-1 font-bold">{activePart.name}</h3>
          <p className="text-xs text-muted-foreground">SKU: {activePart.sku}</p>
          <div className="mt-4 grid gap-3">
            {activePart.branches.map((branch) => (
              <div
                className="rounded-lg border border-border bg-muted/40 p-3"
                key={branch.name}
              >
                <div className="flex justify-between gap-3 text-sm">
                  <span className="font-medium">{branch.name}</span>
                  <span className="rounded bg-muted px-2 py-0.5 text-xs">
                    Qty: {branch.stock}
                  </span>
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Delivery ETA</span>
                  <span>{branch.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
