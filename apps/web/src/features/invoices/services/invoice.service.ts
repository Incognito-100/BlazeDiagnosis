import { and, eq, or } from 'drizzle-orm';

import { db } from '@/db/client';
import {
  auditLogs,
  invoiceLineItems,
  invoices,
  quoteLineItems,
  quotes,
} from '@/db/schema';
import { requireTenantPermission } from '@/lib/authorization/guards';
import { createInvoiceNotificationRecord } from '@/features/notifications/services/notification.service';

/**
 * Draft service: create a new invoice from an approved quote.
 *
 * This service reads approved or billable quote line items, calculates
 * invoice totals, writes the invoice and line items, logs an audit event,
 * and enqueues a notification for the recipient.
 */
export async function createInvoiceFromApprovedQuote(
  tenantId: string,
  quoteId: string,
  options?: {
    actorUserId?: string;
    notificationRecipientUserId?: string;
  },
) {
  await requireTenantPermission(tenantId, 'invoices.create');

  const actorUserId = options?.actorUserId;
  const notificationRecipientUserId = options?.notificationRecipientUserId ?? actorUserId;

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

    // Invoice service integration point for audit logging.
    // Replace this direct audit insert with the shared audit writer helper
    // once `writeAudit` is wired into server-side persistence.
    await tx.insert(auditLogs).values({
      tenantId,
      actorUserId,
      action: 'CREATE',
      entityType: 'INVOICE',
      entityId: invoice.id,
      newValue: {
        invoiceNumber: invoice.invoiceNumber,
        status: invoice.status,
        subtotal: invoice.subtotal,
        taxTotal: invoice.taxTotal,
        discountTotal: invoice.discountTotal,
        total: invoice.total,
        quoteId,
        jobCardId: quote.jobCardId,
      },
    });

    if (notificationRecipientUserId) {
      await createInvoiceNotificationRecord(
        {
          tenantId,
          recipientUserId: notificationRecipientUserId,
          invoiceId: invoice.id,
          eventType: 'invoice_created',
        },
        tx,
      );
    }

    return invoice;
  });
}

function toMoneyString(value: number) {
  return (Math.round((value + Number.EPSILON) * 100) / 100).toFixed(2);
}