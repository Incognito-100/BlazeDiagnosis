'use client';

import { Copy, FileText, Plus, Trash2 } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';
import { useMemo, useState, useSyncExternalStore } from 'react';

import { BrandedDocumentPreview } from '@/components/tenant/brandedDocumentPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FormActions, FormField } from '@/components/forms';
import { ResponsiveTable, tableCellClassName, tableHeadClassName } from '@/components/data-display';
import { formatMoney } from '@/lib/formatting/money';
import { calculateQuoteLineTotals, calculateQuoteTotals } from '@/lib/quoteTotals';
import {
  getTenantBrandingServerSnapshot,
  getTenantBrandingSnapshot,
  subscribeToTenantBranding,
} from '@/lib/tenantBranding';
import type { QuoteApprovalRequirement, QuoteBuilderState, QuoteLineCategory, QuoteLineItemDraft } from '@/types/quotes';
import type { TenantBranding } from '@/types/tenantBranding';

const categoryOptions: { label: string; value: QuoteLineCategory }[] = [
  { label: 'Labor', value: 'labor' },
  { label: 'Part', value: 'part' },
  { label: 'Diagnostic', value: 'diagnostic' },
  { label: 'Consumable', value: 'consumable' },
  { label: 'Optional service', value: 'optional_service' },
];

const approvalOptions: { label: string; value: QuoteApprovalRequirement }[] = [
  { label: 'Required', value: 'required' },
  { label: 'Recommended', value: 'recommended' },
  { label: 'Optional', value: 'optional' },
];

function createLineItem(partial?: Partial<QuoteLineItemDraft>): QuoteLineItemDraft {
  return {
    approvalRequirement: 'recommended',
    category: 'part',
    description: '',
    discount: 0,
    id: `line_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    quantity: 1,
    taxRate: 15,
    unitPrice: 0,
    ...partial,
  };
}

const initialQuoteState: QuoteBuilderState = {
  customerName: 'Sample Customer',
  jobCardNumber: 'JOB-2026-0001',
  lineItems: [
    createLineItem({
      category: 'labor',
      description: 'Minor service labor',
      quantity: 1,
      unitPrice: 850,
    }),
    createLineItem({
      category: 'part',
      description: 'Front brake pads',
      quantity: 1,
      unitPrice: 1100,
    }),
  ],
  quoteNumber: 'QTE-2026-0001',
  validDays: 7,
  vehicleDescription: '2020 Toyota Hilux 2.8 GD-6',
};

export function QuoteBuilder() {
  const brandingSnapshot = useSyncExternalStore(
    subscribeToTenantBranding,
    getTenantBrandingSnapshot,
    getTenantBrandingServerSnapshot,
  );
  const branding = useMemo(() => JSON.parse(brandingSnapshot) as TenantBranding, [brandingSnapshot]);
  const [quote, setQuote] = useState<QuoteBuilderState>({
    ...initialQuoteState,
    quoteNumber: `${branding.quotePrefix}-2026-0001`,
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const totals = useMemo(() => calculateQuoteTotals(quote.lineItems), [quote.lineItems]);

  const updateQuoteMeta = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setQuote((current) => ({
      ...current,
      [name]: name === 'validDays' ? Number(value) : value,
    }));
  };

  const updateLineItem = (
    lineItemId: string,
    field: keyof QuoteLineItemDraft,
    value: string,
  ) => {
    setQuote((current) => ({
      ...current,
      lineItems: current.lineItems.map<QuoteLineItemDraft>((lineItem) => {
        if (lineItem.id !== lineItemId) {
          return lineItem;
        }

        switch (field) {
          case 'approvalRequirement':
            return { ...lineItem, approvalRequirement: value as QuoteApprovalRequirement };
          case 'category':
            return { ...lineItem, category: value as QuoteLineCategory };
          case 'description':
            return { ...lineItem, description: value };
          case 'discount':
            return { ...lineItem, discount: Number(value) };
          case 'quantity':
            return { ...lineItem, quantity: Number(value) };
          case 'taxRate':
            return { ...lineItem, taxRate: Number(value) };
          case 'unitPrice':
            return { ...lineItem, unitPrice: Number(value) };
          default:
            return lineItem;
        }
      }),
    }));
  };

  const addLineItem = () => {
    setQuote((current) => ({
      ...current,
      lineItems: [...current.lineItems, createLineItem()],
    }));
  };

  const removeLineItem = (lineItemId: string) => {
    setQuote((current) => ({
      ...current,
      lineItems: current.lineItems.length === 1
        ? current.lineItems
        : current.lineItems.filter((lineItem) => lineItem.id !== lineItemId),
    }));
  };

  const duplicateLineItem = (lineItem: QuoteLineItemDraft) => {
    const lineItemCopy = { ...lineItem };
    lineItemCopy.id = createLineItem().id;

    setQuote((current) => ({
      ...current,
      lineItems: [...current.lineItems, lineItemCopy],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const quoteDraft = {
      ...quote,
      branding,
      totals,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem('blaze-last-quote-draft', JSON.stringify(quoteDraft));
    setStatusMessage(`${quote.quoteNumber} saved locally with ${quote.lineItems.length} line items and total ${formatMoney(totals.total)}.`);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_28rem]">
      <Card>
        <CardHeader>
          <CardTitle>Quote builder</CardTitle>
          <CardDescription>
            Build a customer-ready quote with parts, labor, diagnostics, consumables, tax, discounts, and approval categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FormField id="quoteNumber" label="Quote number">
                <Input id="quoteNumber" name="quoteNumber" onChange={updateQuoteMeta} value={quote.quoteNumber} />
              </FormField>
              <FormField id="jobCardNumber" label="Job card">
                <Input id="jobCardNumber" name="jobCardNumber" onChange={updateQuoteMeta} value={quote.jobCardNumber} />
              </FormField>
              <FormField id="customerName" label="Customer">
                <Input id="customerName" name="customerName" onChange={updateQuoteMeta} value={quote.customerName} />
              </FormField>
              <FormField id="validDays" label="Valid days">
                <Input id="validDays" min={1} name="validDays" onChange={updateQuoteMeta} type="number" value={quote.validDays} />
              </FormField>
            </div>

            <FormField id="vehicleDescription" label="Vehicle">
              <Input id="vehicleDescription" name="vehicleDescription" onChange={updateQuoteMeta} value={quote.vehicleDescription} />
            </FormField>

            <div className="grid gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold">Line items</h2>
                  <p className="text-sm text-muted-foreground">Each item can be marked required, recommended, or optional for customer approvals.</p>
                </div>
                <Button onClick={addLineItem} type="button" variant="outline">
                  <Plus className="size-4" />
                  Add item
                </Button>
              </div>

              <ResponsiveTable>
                <thead>
                  <tr className={tableHeadClassName}>
                    <th className={tableCellClassName}>Description</th>
                    <th className={tableCellClassName}>Category</th>
                    <th className={tableCellClassName}>Approval</th>
                    <th className={`${tableCellClassName} text-right`}>Qty</th>
                    <th className={`${tableCellClassName} text-right`}>Unit</th>
                    <th className={`${tableCellClassName} text-right`}>Tax %</th>
                    <th className={`${tableCellClassName} text-right`}>Discount</th>
                    <th className={`${tableCellClassName} text-right`}>Total</th>
                    <th className={`${tableCellClassName} text-right`}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {quote.lineItems.map((lineItem) => {
                    const lineTotals = calculateQuoteLineTotals(lineItem);

                    return (
                      <tr className="align-top" key={lineItem.id}>
                        <td className={tableCellClassName}>
                          <Input
                            aria-label="Line item description"
                            onChange={(event) => updateLineItem(lineItem.id, 'description', event.currentTarget.value)}
                            placeholder="Describe the work or part"
                            value={lineItem.description}
                          />
                        </td>
                        <td className={tableCellClassName}>
                          <select
                            aria-label="Line item category"
                            className="h-10 w-full min-w-36 rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onChange={(event) => updateLineItem(lineItem.id, 'category', event.currentTarget.value)}
                            value={lineItem.category}
                          >
                            {categoryOptions.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className={tableCellClassName}>
                          <select
                            aria-label="Approval requirement"
                            className="h-10 w-full min-w-36 rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onChange={(event) => updateLineItem(lineItem.id, 'approvalRequirement', event.currentTarget.value)}
                            value={lineItem.approvalRequirement}
                          >
                            {approvalOptions.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className={tableCellClassName}>
                          <Input
                            aria-label="Quantity"
                            className="min-w-24 text-right"
                            min={0}
                            onChange={(event) => updateLineItem(lineItem.id, 'quantity', event.currentTarget.value)}
                            step="0.01"
                            type="number"
                            value={lineItem.quantity}
                          />
                        </td>
                        <td className={tableCellClassName}>
                          <Input
                            aria-label="Unit price"
                            className="min-w-28 text-right"
                            min={0}
                            onChange={(event) => updateLineItem(lineItem.id, 'unitPrice', event.currentTarget.value)}
                            step="0.01"
                            type="number"
                            value={lineItem.unitPrice}
                          />
                        </td>
                        <td className={tableCellClassName}>
                          <Input
                            aria-label="Tax rate"
                            className="min-w-24 text-right"
                            min={0}
                            onChange={(event) => updateLineItem(lineItem.id, 'taxRate', event.currentTarget.value)}
                            step="0.01"
                            type="number"
                            value={lineItem.taxRate}
                          />
                        </td>
                        <td className={tableCellClassName}>
                          <Input
                            aria-label="Discount"
                            className="min-w-28 text-right"
                            min={0}
                            onChange={(event) => updateLineItem(lineItem.id, 'discount', event.currentTarget.value)}
                            step="0.01"
                            type="number"
                            value={lineItem.discount}
                          />
                        </td>
                        <td className={`${tableCellClassName} text-right font-semibold`}>
                          {formatMoney(lineTotals.lineTotal)}
                        </td>
                        <td className={`${tableCellClassName} text-right`}>
                          <div className="flex justify-end gap-2">
                            <Button aria-label="Duplicate line item" onClick={() => duplicateLineItem(lineItem)} size="icon" type="button" variant="ghost">
                              <Copy className="size-4" />
                            </Button>
                            <Button aria-label="Remove line item" disabled={quote.lineItems.length === 1} onClick={() => removeLineItem(lineItem.id)} size="icon" type="button" variant="ghost">
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </ResponsiveTable>
            </div>

            <div className="ml-auto grid w-full gap-2 rounded-xl border border-border bg-muted/40 p-4 text-sm sm:max-w-sm">
              <TotalRow label="Subtotal" value={totals.subtotal} />
              <TotalRow label="Discount" value={totals.discountTotal} />
              <TotalRow label="Tax" value={totals.taxTotal} />
              <TotalRow emphasized label="Total" value={totals.total} />
            </div>

            {statusMessage ? (
              <p aria-live="polite" className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">{statusMessage}</p>
            ) : null}

            <FormActions>
              <Button type="submit" variant="accent">
                <FileText className="size-4" />
                Save quote draft
              </Button>
              <Button onClick={addLineItem} type="button" variant="outline">
                <Plus className="size-4" />
                Add line item
              </Button>
            </FormActions>
          </form>
        </CardContent>
      </Card>

      <div className="grid content-start gap-6">
        <BrandedQuotePreview branding={branding} quote={quote} total={totals.total} />
        <BrandedDocumentPreview documentType="invoice" total={totals.total} />
      </div>
    </div>
  );
}

function TotalRow({ emphasized, label, value }: { emphasized?: boolean; label: string; value: number }) {
  return (
    <div className={`flex justify-between gap-4 ${emphasized ? 'border-t border-border pt-2 text-base font-bold' : ''}`}>
      <span className="text-muted-foreground">{label}</span>
      <span>{formatMoney(value)}</span>
    </div>
  );
}

function BrandedQuotePreview({
  branding,
  quote,
  total,
}: {
  branding: TenantBranding;
  quote: QuoteBuilderState;
  total: number;
}) {
  return (
    <Card variant="panel">
      <CardHeader>
        <CardTitle>Customer quote preview</CardTitle>
        <CardDescription>Preview of the branded document header and customer-facing summary.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="p-5 text-primary-foreground" style={{ background: branding.primaryColor }}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-lg font-bold">{branding.businessName}</p>
                <p className="text-sm opacity-80">{branding.businessPhone} · {branding.businessEmail}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs uppercase tracking-[0.22em] opacity-75">Quote</p>
                <p className="font-mono font-bold">{quote.quoteNumber}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 p-5 text-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <SummaryItem label="Customer" value={quote.customerName} />
              <SummaryItem label="Vehicle" value={quote.vehicleDescription} />
              <SummaryItem label="Job card" value={quote.jobCardNumber} />
              <SummaryItem label="Valid for" value={`${quote.validDays} days`} />
            </div>
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex justify-between gap-3 font-bold">
                <span>Amount due if approved</span>
                <span>{formatMoney(total)}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Customer approvals will use each line item&apos;s required, recommended, or optional flag.
              </p>
            </div>
          </div>
          <div className="h-2" style={{ background: branding.accentColor }} />
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </div>
  );
}
