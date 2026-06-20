import type { QuoteLineItemDraft, QuoteLineTotals, QuoteTotals } from '@/types/quotes';

function toMoney(value: number) {
  return Math.round((Number.isFinite(value) ? value : 0) * 100) / 100;
}

export function calculateQuoteLineTotals(lineItem: QuoteLineItemDraft): QuoteLineTotals {
  const quantity = Math.max(0, lineItem.quantity || 0);
  const unitPrice = Math.max(0, lineItem.unitPrice || 0);
  const discount = Math.max(0, lineItem.discount || 0);
  const taxRate = Math.max(0, lineItem.taxRate || 0);
  const subtotal = toMoney(quantity * unitPrice);
  const discountApplied = toMoney(Math.min(discount, subtotal));
  const taxableAmount = Math.max(0, subtotal - discountApplied);
  const tax = toMoney(taxableAmount * (taxRate / 100));

  return {
    discount: discountApplied,
    lineTotal: toMoney(taxableAmount + tax),
    subtotal,
    tax,
  };
}

export function calculateQuoteTotals(lineItems: QuoteLineItemDraft[]): QuoteTotals {
  return lineItems.reduce<QuoteTotals>(
    (totals, lineItem) => {
      const lineTotals = calculateQuoteLineTotals(lineItem);

      return {
        discountTotal: toMoney(totals.discountTotal + lineTotals.discount),
        subtotal: toMoney(totals.subtotal + lineTotals.subtotal),
        taxTotal: toMoney(totals.taxTotal + lineTotals.tax),
        total: toMoney(totals.total + lineTotals.lineTotal),
      };
    },
    {
      discountTotal: 0,
      subtotal: 0,
      taxTotal: 0,
      total: 0,
    },
  );
}
