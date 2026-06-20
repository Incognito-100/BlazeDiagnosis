'use client';
import React from 'react';

export function SupplierDashboard() {
  return (
    <section
      aria-labelledby="supplier-dashboard-title"
      className="grid gap-4 rounded-xl border bg-card p-6 text-foreground"
    >
      <div>
        <h2 className="text-xl font-semibold" id="supplier-dashboard-title">
          Supplier Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">
          Demo overview of supplier activity and pending workflows.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-secondary-foreground">
            Pending Requests
          </p>
          <h3 className="mt-1 text-lg font-semibold">2 awaiting response</h3>
          <p className="text-xs text-muted-foreground">Parts requests not yet answered</p>
        </div>

        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-success">
            Submitted Responses
          </p>
          <h3 className="mt-1 text-lg font-semibold">3 responses sent</h3>
          <p className="text-xs text-muted-foreground">Awaiting tenant review</p>
        </div>

        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-warning">
            Orders Awaiting Dispatch
          </p>
          <h3 className="mt-1 text-lg font-semibold">1 pending shipment</h3>
          <p className="text-xs text-muted-foreground">Ready for delivery scheduling</p>
        </div>
      </div>
    </section>
  );
}
