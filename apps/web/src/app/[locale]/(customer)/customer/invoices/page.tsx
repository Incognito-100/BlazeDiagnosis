import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

// Explicit format tool for South African Rand currency display
const currencyFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
});

// Enforces structural integrity for invoice records
interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  subtotalCents: number;
  vatCents: number;
  totalCents: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export default async function CustomerInvoicesPage() {
  // Static placeholder array for our invoicing interface setup (MVP Phase 2)
  const invoices: Invoice[] = [
    {
      id: "inv-2026-001",
      invoiceNumber: "INV-2026-001",
      issueDate: "2026-06-10",
      dueDate: "2026-06-24",
      subtotalCents: 120000, // R1,200.00
      vatCents: 18000,       // R180.00 (15% VAT)
      totalCents: 138000,    // R1,380.00
      status: "PENDING"
    }
  ];

  return (
    <AppShell surface="customer" title="Customer invoices">
      <Card>
        <CardHeader>
          <CardTitle>Customer invoices</CardTitle>
          <p className="text-sm text-neutral-600 mt-1">
            Open and historical customer invoices. Review your historical billing logs, pending service statements, and download receipt copies.
          </p>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            /* --- EMPTY STATE FALLBACK --- */
            <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-neutral-200 rounded-lg bg-neutral-50/50">
              <p className="text-sm font-semibold text-neutral-900">No invoices found</p>
              <p className="text-xs text-neutral-500 mt-1">
                You do not have any invoices billed to your account yet.
              </p>
            </div>
          ) : (
            /* --- FULL INVOICE DATA TABLE --- */
            <div className="overflow-x-auto rounded-lg border border-neutral-200 shadow-sm">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700 font-medium uppercase tracking-wider text-xs">
                    <th className="p-4">Invoice Number</th>
                    <th className="p-4">Date Issued</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Subtotal</th>
                    <th className="p-4">VAT (15%)</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-800">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="p-4 font-mono font-semibold text-neutral-900">{inv.invoiceNumber}</td>
                      <td className="p-4 text-neutral-600">{inv.issueDate}</td>
                      <td className="p-4 text-neutral-600">{inv.dueDate}</td>
                      <td className="p-4 text-neutral-600">
                        {currencyFormatter.format(inv.subtotalCents / 100)}
                      </td>
                      <td className="p-4 text-neutral-500">
                        {currencyFormatter.format(inv.vatCents / 100)}
                      </td>
                      <td className="p-4 font-semibold text-neutral-900">
                        {currencyFormatter.format(inv.totalCents / 100)}
                      </td>
                      <td className="p-4 text-xs">
                        <span className={`inline-block font-bold px-2 py-0.5 rounded border ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : inv.status === 'PENDING'
                            ? 'bg-amber-50 border-amber-200 text-amber-700'
                            : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-right text-xs">
                        {/* Links down to our individual breakdown pages */}
                        <Link 
                          href={`/customer/invoices/${inv.id}` as any}
                          className="inline-block px-3 py-1 font-semibold text-neutral-700 border border-neutral-300 rounded hover:bg-neutral-100 transition-colors"
                        >
                          View Receipt
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}