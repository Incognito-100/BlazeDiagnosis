// apps/web/src/features/quotes/services/quote.service.ts
import { sql } from 'drizzle-orm';
import { db } from '@/db/client';
import { quoteApprovalEvents, quoteLineItems, quotes } from '@/db/schema';
import { requireTenantPermission } from '@/lib/auth/auth-guards';

// ============================================
// QUOTE CRUD OPERATIONS
// ============================================

export async function createQuoteFromJobCard(
  tenantId: string,
  jobCardId: string,
  customerId: string,
) {
  console.log("createQuoteFromJobCard called with:", { tenantId, jobCardId, customerId });
  
  // Validate inputs
  if (!tenantId) {
    throw new Error("Tenant ID is required");
  }
  if (!jobCardId) {
    throw new Error("Job Card ID is required");
  }
  if (!customerId) {
    throw new Error("Customer ID is required");
  }
  
  await requireTenantPermission(tenantId, 'quotes.create');

  // Generate a unique quote number
  const quoteNumber = `Q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  console.log("Generated quote number:", quoteNumber);

  // Use raw SQL to insert
  const result = await db.execute(sql`
    INSERT INTO quotes (
      tenant_id, 
      job_card_id, 
      customer_id, 
      quote_number, 
      version, 
      status, 
      subtotal, 
      tax_total, 
      discount_total, 
      total
    ) VALUES (
      ${tenantId}::uuid,
      ${jobCardId}::uuid,
      ${customerId}::uuid,
      ${quoteNumber},
      '1',
      'draft',
      '0',
      '0',
      '0',
      '0'
    ) RETURNING *
  `);

  // Extract the quote from the result
  const quote = result.rows ? result.rows[0] : result[0];
  console.log("Quote created successfully:", quote);
  return quote;
}

export async function getQuoteWithItems(
  tenantId: string,
  quoteId: string,
) {
  await requireTenantPermission(tenantId, 'quotes.view');

  const [quote] = await db
    .select()
    .from(quotes)
    .where({
      tenant_id: tenantId,
      id: quoteId,
    })
    .limit(1);

  if (!quote) {
    return null;
  }

  const items = await db
    .select()
    .from(quoteLineItems)
    .where({
      tenant_id: tenantId,
      quote_id: quoteId,
    });

  return {
    ...quote,
    items,
  };
}

export async function getQuotes(
  tenantId: string,
  filters?: {
    status?: string;
    customerId?: string;
    jobCardId?: string;
    limit?: number;
    offset?: number;
  },
) {
  await requireTenantPermission(tenantId, 'quotes.view');

  let query = db
    .select()
    .from(quotes)
    .where({
      tenant_id: tenantId,
      ...(filters?.status && { status: filters.status }),
      ...(filters?.customerId && { customer_id: filters.customerId }),
      ...(filters?.jobCardId && { job_card_id: filters.jobCardId }),
    });

  query = query.orderBy(quotes.created_at);

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.offset(filters.offset);
  }

  return await query;
}

// ============================================
// QUOTE LINE ITEM OPERATIONS
// ============================================

export async function addQuoteLineItem(
  tenantId: string,
  quoteId: string,
  jobCardId: string,
  input: {
    description: string;
    quantity: number;
    unitPrice: number;
    type: 'part' | 'labor' | 'diagnostic' | 'consumable' | 'optional_service'; // ← Updated enum values
    supplierId?: string;
  },
) {
  console.log("addQuoteLineItem called with:", { tenantId, quoteId, jobCardId, input });
  
  await requireTenantPermission(tenantId, 'quotes.update');

  // Validate input
  if (!input.description) {
    throw new Error("Description is required");
  }
  if (input.quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }
  if (input.unitPrice <= 0) {
    throw new Error("Unit price must be greater than 0");
  }

  // Check if quote exists using raw SQL
  const quoteResult = await db.execute(sql`
    SELECT id, status FROM quotes 
    WHERE tenant_id = ${tenantId}::uuid 
    AND id = ${quoteId}::uuid 
    LIMIT 1
  `);

  const quote = quoteResult.rows ? quoteResult.rows[0] : quoteResult[0];

  if (!quote) {
    throw new Error('Quote not found.');
  }

  if (quote.status !== 'draft' && quote.status !== 'sent') {
    throw new Error('Cannot add items to a quote that is not draft or sent.');
  }

  const total = input.quantity * input.unitPrice;

  // Insert line item using raw SQL with correct enum values
  const result = await db.execute(sql`
    INSERT INTO quote_line_items (
      tenant_id,
      quote_id,
      job_card_id,
      category,
      description,
      quantity,
      unit_price,
      total,
      tax_rate,
      discount,
      approval_status
    ) VALUES (
      ${tenantId}::uuid,
      ${quoteId}::uuid,
      ${jobCardId}::uuid,
      ${input.type}::quote_line_category,  -- ← Cast to enum type
      ${input.description},
      ${input.quantity},
      ${input.unitPrice},
      ${total},
      '0',
      '0',
      'pending'
    ) RETURNING *
  `);

  const lineItem = result.rows ? result.rows[0] : result[0];
  console.log("Line item created:", lineItem);

  // Recalculate quote totals
  await recalculateQuoteTotals(tenantId, quoteId);

  return lineItem;
}

export async function removeQuoteLineItem(
  tenantId: string,
  quoteId: string,
  lineItemId: string,
) {
  await requireTenantPermission(tenantId, 'quotes.update');

  const [quote] = await db
    .select()
    .from(quotes)
    .where({
      tenant_id: tenantId,
      id: quoteId,
    })
    .limit(1);

  if (!quote) {
    throw new Error('Quote not found.');
  }

  if (quote.status !== 'draft') {
    throw new Error('Only draft quotes can have items removed.');
  }

  await db
    .delete(quoteLineItems)
    .where({
      tenant_id: tenantId,
      quote_id: quoteId,
      id: lineItemId,
    });

  // Recalculate quote totals
  await recalculateQuoteTotals(tenantId, quoteId);
}

export async function recalculateQuoteTotals(
  tenantId: string,
  quoteId: string,
) {
  // Get all line items using raw SQL
  const itemsResult = await db.execute(sql`
    SELECT total FROM quote_line_items 
    WHERE tenant_id = ${tenantId}::uuid 
    AND quote_id = ${quoteId}::uuid
  `);

  const items = itemsResult.rows || itemsResult;
  
  const subtotal = items.reduce((sum: number, item: any) => sum + Number(item.total), 0);
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + tax;

  // Update quote totals using raw SQL
  await db.execute(sql`
    UPDATE quotes 
    SET 
      subtotal = ${subtotal.toString()},
      tax_total = ${tax.toString()},
      total = ${total.toString()}
    WHERE tenant_id = ${tenantId}::uuid 
    AND id = ${quoteId}::uuid
  `);
}

// ============================================
// QUOTE STATUS AND APPROVAL OPERATIONS
// ============================================

export async function sendQuoteToCustomer(
  tenantId: string,
  quoteId: string,
) {
  await requireTenantPermission(tenantId, 'quotes.send');

  const [quote] = await db
    .select()
    .from(quotes)
    .where({
      tenant_id: tenantId,
      id: quoteId,
    })
    .limit(1);

  if (!quote) {
    throw new Error('Quote not found.');
  }

  if (quote.status !== 'draft') {
    throw new Error('Only draft quotes can be sent.');
  }

  const items = await db
    .select()
    .from(quoteLineItems)
    .where({
      tenant_id: tenantId,
      quote_id: quoteId,
    });

  if (items.length === 0) {
    throw new Error('Cannot send a quote with no line items.');
  }

  const [updated] = await db
    .update(quotes)
    .set({
      status: 'sent',
      sent_at: new Date(),
    })
    .where({
      tenant_id: tenantId,
      id: quoteId,
    })
    .returning();

  // TODO: Create notification for customer
  // TODO: Create audit log entry

  return updated;
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
      .where({
        tenant_id: input.tenantId,
        id: input.quoteId,
      })
      .limit(1);

    if (!quote) {
      throw new Error('Quote not found.');
    }

    if (quote.customer_id !== input.customerId) {
      throw new Error('Customer is not allowed to approve this quote.');
    }

    if (
      quote.locked_at ||
      quote.status === 'locked' ||
      quote.status === 'expired'
    ) {
      throw new Error('Quote is locked or expired.');
    }

    const [lineItem] = await tx
      .update(quoteLineItems)
      .set({ 
        approval_status: input.decision,
      })
      .where({
        tenant_id: input.tenantId,
        quote_id: input.quoteId,
        id: input.quoteLineItemId,
      })
      .returning();

    if (!lineItem) {
      throw new Error('Quote line item not found.');
    }

    await tx.insert(quoteApprovalEvents).values({
      tenant_id: input.tenantId,
      quote_id: input.quoteId,
      quote_line_item_id: input.quoteLineItemId,
      customer_id: input.customerId,
      decision: input.decision,
      reason: input.reason,
    });

    const allLineItems = await tx
      .select()
      .from(quoteLineItems)
      .where({
        tenant_id: input.tenantId,
        quote_id: input.quoteId,
      });

    const hasPending = allLineItems.some(
      (item) => item.approval_status === 'pending',
    );
    const hasApproved = allLineItems.some(
      (item) =>
        item.approval_status === 'approved' ||
        item.approval_status === 'not_required',
    );
    const hasDeclined = allLineItems.some(
      (item) => item.approval_status === 'declined',
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
      .set({ 
        status,
      })
      .where({
        tenant_id: input.tenantId,
        id: input.quoteId,
      });

    return lineItem;
  });
}

export async function lockApprovedQuote(
  tenantId: string,
  quoteId: string,
) {
  await requireTenantPermission(tenantId, 'quotes.lock');

  const [quote] = await db
    .select()
    .from(quotes)
    .where({
      tenant_id: tenantId,
      id: quoteId,
    })
    .limit(1);

  if (!quote) {
    throw new Error('Quote not found.');
  }

  if (quote.status !== 'approved') {
    throw new Error('Only approved quotes can be locked.');
  }

  // Check all items are approved
  const items = await db
    .select()
    .from(quoteLineItems)
    .where({
      tenant_id: tenantId,
      quote_id: quoteId,
    });

  const hasPending = items.some(item => item.approval_status === 'pending');
  if (hasPending) {
    throw new Error('Cannot lock a quote with pending items.');
  }

  const [updated] = await db
    .update(quotes)
    .set({
      status: 'locked',
      locked_at: new Date(),
    })
    .where({
      tenant_id: tenantId,
      id: quoteId,
    })
    .returning();

  // TODO: Create audit log entry

  return updated;
}

// ============================================
// QUOTE RETRIEVAL OPERATIONS
// ============================================

export async function getCustomerQuotes(
  tenantId: string,
  customerId: string,
) {
  // No permission check needed - this is for customers to view their own quotes
  // The caller should verify the customer ID matches the authenticated user

  return await db
    .select()
    .from(quotes)
    .where({
      tenant_id: tenantId,
      customer_id: customerId,
    })
    .orderBy(quotes.created_at);
}

export async function getQuoteApprovalEvents(
  tenantId: string,
  quoteId: string,
) {
  await requireTenantPermission(tenantId, 'quotes.view');

  return await db
    .select()
    .from(quoteApprovalEvents)
    .where({
      tenant_id: tenantId,
      quote_id: quoteId,
    })
    .orderBy(quoteApprovalEvents.created_at);
}