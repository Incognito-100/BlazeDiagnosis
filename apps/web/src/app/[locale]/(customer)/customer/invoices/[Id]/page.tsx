import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const currencyFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
});

// SERVICE INTEGRATION POINT: Mock database fetch helper representation
async function getInvoiceDetails(invoiceId: string) {
  // CONCEPTUAL LINKS: These fields map directly to Pod 3 (Job Cards) and Pod 4 (Quotes)
  return {
    id: invoiceId,
    invoiceNumber: "INV-2026-001",
    status: "PENDING" as const,
    issueDate: "June 10, 2026",
    dueDate: "June 24, 2026",
    
    jobCardReference: "JOB-98432",  // Linked to Pod 3
    quoteReference: "QT-2026-884",   // Linked to Pod 4
    vehicleDetails: "2021 Volkswagen Polo 1.4 TSI",
    
    // Itemized breakdowns for the workshop services rendered
    lineItems: [
      { id: "li-1", type: "LABOUR", description: "60,000km Major Service Labour", quantity: 1, unitPriceCents: 45000 },
      { id: "li-2", type: "PART", description: "Engine Oil 5W-30 (4L)", quantity: 1, unitPriceCents: 38000 },
      { id: "li-3", type: "PART", description: "Oil Filter Replacement Element", quantity: 1, unitPriceCents: 12000 },
      { id: "li-4", type: "PART", description: "Cabin Air Filter", quantity: 1, unitPriceCents: 25000 },
    ],
    subtotalCents: 120000,
    vatCents: 18000, // 15% South African VAT
    totalCents: 138000,
  };
}

export default async function InvoiceDetailPage({ params }: { params: { id: string } }) {
  // Safe extraction of parameters for modern Next.js async components
  const resolvedParams = await params;
  const invoice = await getInvoiceDetails(resolvedParams.id);

  return (
    <AppShell surface="customer" title={`Invoice ${invoice.invoiceNumber}`}>
      <div className="space-y-6">
        
        {/* --- CONCEPTUAL METADATA LINKS LINKING PODS --- */}
        <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="text-sm text-neutral-600">
            <span className="font-medium text-neutral-900">Linked Job Card:</span> {invoice.jobCardReference} 
            <span className="mx-2 text-neutral-300">|</span>
            <span className="font-medium text-neutral-900">Approved Quote:</span> {invoice.quoteReference}
            <span className="mx-2 text-neutral-300">|</span>
            <span className="font-medium text-neutral-900">Vehicle:</span> {invoice.vehicleDetails}
          </div>
          <span className="px-2.5 py-1 text-xs font-bold uppercase rounded border bg-amber-50 border-amber-200 text-amber-700">
            {invoice.status}
          </span>
        </div>

        {/* --- ITEMIZED TAX RECEIPT --- */}
        <Card>
          <CardHeader className="border-b border-neutral-100 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">Tax Invoice Statement</CardTitle>
                <p className="text-xs text-neutral-500 mt-1">Blaze POS Diagnostic Workshop System</p>
              </div>
              <div className="text-right text-sm text-neutral-600">
                <p><span className="font-medium text-neutral-900">Issued:</span> {invoice.issueDate}</p>
                <p><span className="font-medium text-neutral-900">Due Date:</span> {invoice.dueDate}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 font-medium text-xs uppercase tracking-wider">
                  <th className="pb-3 w-16">Type</th>
                  <th className="pb-3">Item & Description</th>
                  <th className="pb-3 text-center w-16">Qty</th>
                  <th className="pb-3 text-right w-32">Unit Price</th>
                  <th className="pb-3 text-right w-32">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                {invoice.lineItems.map((item) => (
                  <tr key={item.id} className="align-middle">
                    <td className="py-4 text-xs">
                      <span className={`px-1.5 py-0.5 font-mono font-bold rounded text-[10px] ${
                        item.type === 'LABOUR' 
                          ? 'bg-blue-50 border border-blue-100 text-blue-700' 
                          : 'bg-purple-50 border border-purple-100 text-purple-700'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-4 font-medium text-neutral-900">{item.description}</td>
                    <td className="py-4 text-center font-mono">{item.quantity}</td>
                    <td className="py-4 text-right font-mono text-neutral-600">
                      {currencyFormatter.format(item.unitPriceCents / 100)}
                    </td>
                    <td className="py-4 text-right font-mono font-medium">
                      {currencyFormatter.format((item.unitPriceCents * item.quantity) / 100)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* --- CALCULATED TOTALS --- */}
            <div className="mt-6 border-t border-neutral-200 pt-4 flex justify-end">
              <div className="w-64 space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-neutral-900">{currencyFormatter.format(invoice.subtotalCents / 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (15%):</span>
                  <span className="font-mono text-neutral-900">{currencyFormatter.format(invoice.vatCents / 100)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-bold text-neutral-900">
                  <span>Total Due:</span>
                  <span className="font-mono text-neutral-950">{currencyFormatter.format(invoice.totalCents / 100)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}