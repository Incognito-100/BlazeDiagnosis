'use client';

import { useState } from 'react';

import { DashboardPanel } from './dashboard-panel';
import { InvoicesPanel } from './invoices-panel';
import { JobsPanel } from './jobs-panel';
import { MarketplacePanel } from './marketplace-panel';
import { PartsPanel } from './parts-panel';
import { PaymentsPanel } from './payments-panel';
import { QuotesPanel } from './quotes-panel';
import { VehiclesPanel } from './vehicles-panel';

export function MvpShowcase() {
  const [selectedPartId, setSelectedPartId] = useState(1);

  return (
    <div className="grid gap-8">
      <DashboardPanel />
      <VehiclesPanel />
      <JobsPanel />
      <QuotesPanel />
      <MarketplacePanel
        onSelectPart={setSelectedPartId}
        selectedPartId={selectedPartId}
      />
      <PartsPanel />
      <InvoicesPanel />
      <PaymentsPanel />
    </div>
  );
}
