import { and, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { quoteApprovalEvents, quoteLineItems, quotes } from '@/db/schema';
import { requireTenantPermission } from '@/lib/authorization/guards';

export async function createQuoteFromJobCard(
  tenantId: string,
  jobCardId: string,
  customerId: string,
) {
  await requireTenantPermission(tenantId, 'quotes.create');

  const [quote] = await db
    .insert(quotes)
    .values({
      tenantId,
      jobCardId,
      customerId,
      quoteNumber: `Q-${Date.now()}`,
      status: 'draft',
    })
    .returning();

  return quote;
}

export async function approveQuoteLineItem(
  tenantId: string,
  quoteId: string,
  quoteLineItemId: string,
  customerId: string,
) {
  return recordQuoteLineDecision({
    tenantId,
    quoteId,
    quoteLineItemId,
    customerId,
    decision: 'approved',
  });
}

export async function declineQuoteLineItem(
  tenantId: string,
  quoteId: string,
  quoteLineItemId: string,
  customerId: string,
  reason?: string,
) {
  return recordQuoteLineDecision({
    tenantId,
    quoteId,
    quoteLineItemId,
    customerId,
    decision: 'declined',
    reason,
  });
}

async function recordQuoteLineDecision(input: {
  tenantId: string;
  quoteId: string;
  quoteLineItemId: string;
  customerId: string;
  decision: 'approved' | 'declined';
  reason?: string;
}) {
  await requireTenantPermission(input.tenantId, 'quotes.approve');

  return db.transaction(async (tx) => {
    const [quote] = await tx
      .select()
      .from(quotes)
      .where(
        and(eq(quotes.tenantId, input.tenantId), eq(quotes.id, input.quoteId)),
      )
      .limit(1);

    if (!quote) {
      throw new Error('Quote not found.');
    }

    if (quote.customerId !== input.customerId) {
      throw new Error('Customer is not allowed to approve this quote.');
    }

    if (
      quote.lockedAt ||
      quote.status === 'locked' ||
      quote.status === 'expired'
    ) {
      throw new Error('Quote is locked or expired.');
    }

    const [lineItem] = await tx
      .update(quoteLineItems)
      .set({ approvalStatus: input.decision })
      .where(
        and(
          eq(quoteLineItems.tenantId, input.tenantId),
          eq(quoteLineItems.quoteId, input.quoteId),
          eq(quoteLineItems.id, input.quoteLineItemId),
        ),
      )
      .returning();

    if (!lineItem) {
      throw new Error('Quote line item not found.');
    }

    await tx.insert(quoteApprovalEvents).values({
      tenantId: input.tenantId,
      quoteId: input.quoteId,
      quoteLineItemId: input.quoteLineItemId,
      customerId: input.customerId,
      decision: input.decision,
      reason: input.reason,
    });

    const allLineItems = await tx
      .select()
      .from(quoteLineItems)
      .where(
        and(
          eq(quoteLineItems.tenantId, input.tenantId),
          eq(quoteLineItems.quoteId, input.quoteId),
        ),
      );

    const hasPending = allLineItems.some(
      (item) => item.approvalStatus === 'pending',
    );
    const hasApproved = allLineItems.some(
      (item) =>
        item.approvalStatus === 'approved' ||
        item.approvalStatus === 'not_required',
    );
    const hasDeclined = allLineItems.some(
      (item) => item.approvalStatus === 'declined',
    );
    const status = hasPending
      ? hasApproved || hasDeclined
        ? 'partially_approved'
        : 'sent'
      : hasApproved
        ? hasDeclined
          ? 'partially_approved'
          : 'approved'
        : 'declined';

    await tx
      .update(quotes)
      .set({ status, updatedAt: new Date() })
      .where(
        and(eq(quotes.tenantId, input.tenantId), eq(quotes.id, input.quoteId)),
      );

    return lineItem;
  });
}
