'use client';

import { useState } from 'react';

import { PartsRequestForm } from '@/components/forms/partsRequestForm';

import { DashboardPanel } from './dashboardPanel';
import { InvoicesPanel } from './invoicesPanel';
import { JobsPanel } from './jobsPanel';
import { MarketplacePanel } from './marketplacePanel';
import { PartsPanel } from './partsPanel';
import { PaymentsPanel } from './paymentsPanel';
import { QuotesPanel } from './quotesPanel';
import { SupplierDashboard } from './supplierDashboard';
import { VehiclesPanel } from './vehiclesPanel';

export function MvpShowcase() {
  const [selectedPartId, setSelectedPartId] = useState(1);

  return (
    <div className="grid gap-8">
      <DashboardPanel />
      <VehiclesPanel />
      <SupplierDashboard />
      <InvoicesPanel />
      <JobsPanel />
      <QuotesPanel />
      <MarketplacePanel
        onSelectPart={setSelectedPartId}
        selectedPartId={selectedPartId}
      />
      <PartsPanel />
      <PartsRequestForm jobCardId="00000000-0000-0000-0000-000000000101" />
      <PaymentsPanel />
    </div>
  );
}
