import { and, eq, or } from 'drizzle-orm';

import { db } from '@/db/client';
import {
  invoiceLineItems,
  invoices,
  quoteLineItems,
  quotes,
} from '@/db/schema';
import { requireTenantPermission } from '@/lib/authorization/guards';

export async function createInvoiceFromApprovedQuote(
  tenantId: string,
  quoteId: string,
) {
  await requireTenantPermission(tenantId, 'invoices.create');

  return db.transaction(async (tx) => {
    const [quote] = await tx
      .select()
      .from(quotes)
      .where(and(eq(quotes.tenantId, tenantId), eq(quotes.id, quoteId)))
      .limit(1);

    if (!quote) {
      throw new Error('Quote not found.');
    }

    const billableItems = await tx
      .select()
      .from(quoteLineItems)
      .where(
        and(
          eq(quoteLineItems.tenantId, tenantId),
          eq(quoteLineItems.quoteId, quoteId),
          or(
            eq(quoteLineItems.approvalStatus, 'approved'),
            eq(quoteLineItems.approvalStatus, 'not_required'),
          ),
        ),
      );

    if (!billableItems.length) {
      throw new Error(
        'Cannot create an invoice without approved or billable quote items.',
      );
    }

    const totals = billableItems.reduce(
      (acc, item) => {
        const quantity = Number(item.quantity);
        const unitPrice = Number(item.unitPrice);
        const discount = Number(item.discount ?? 0);
        const taxRate = Number(item.taxRate ?? 0);
        const lineSubtotal = quantity * unitPrice;
        const discountedSubtotal = Math.max(lineSubtotal - discount, 0);
        const tax = discountedSubtotal * (taxRate / 100);

        acc.subtotal += lineSubtotal;
        acc.discountTotal += discount;
        acc.taxTotal += tax;
        acc.total += discountedSubtotal + tax;

        return acc;
      },
      { subtotal: 0, taxTotal: 0, discountTotal: 0, total: 0 },
    );

    const [invoice] = await tx
      .insert(invoices)
      .values({
        tenantId,
        jobCardId: quote.jobCardId,
        customerId: quote.customerId,
        invoiceNumber: `INV-${Date.now()}`,
        status: 'draft',
        subtotal: toMoneyString(totals.subtotal),
        taxTotal: toMoneyString(totals.taxTotal),
        discountTotal: toMoneyString(totals.discountTotal),
        total: toMoneyString(totals.total),
      })
      .returning();

    await tx.insert(invoiceLineItems).values(
      billableItems.map((item) => ({
        tenantId,
        invoiceId: invoice.id,
        quoteLineItemId: item.id,
        category: item.category,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxRate: item.taxRate,
        total: item.total,
      })),
    );

    return invoice;
  });
}

function toMoneyString(value: number) {
  return (Math.round((value + Number.EPSILON) * 100) / 100).toFixed(2);
}
