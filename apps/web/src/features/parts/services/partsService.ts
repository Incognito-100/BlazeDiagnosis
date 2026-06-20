import { and, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { partsOrders, partsRequests, supplierResponses } from '@/db/schema';
import { requireTenantPermission } from '@/lib/authorization/guards';

export async function createPartsRequest(
  tenantId: string,
  jobCardId: string,
  notes?: string,
) {
  await requireTenantPermission(tenantId, 'parts.request');

  const [request] = await db
    .insert(partsRequests)
    .values({ tenantId, jobCardId, notes })
    .returning();
  return request;
}

export async function approveSupplierResponse(
  tenantId: string,
  supplierResponseId: string,
) {
  await requireTenantPermission(tenantId, 'parts.approve_supplier_quote');

  return db.transaction(async (tx) => {
    const [response] = await tx
      .select()
      .from(supplierResponses)
      .where(
        and(
          eq(supplierResponses.tenantId, tenantId),
          eq(supplierResponses.id, supplierResponseId),
        ),
      )
      .limit(1);

    if (!response) {
      throw new Error('Supplier response not found.');
    }

    const [request] = await tx
      .select()
      .from(partsRequests)
      .where(
        and(
          eq(partsRequests.tenantId, tenantId),
          eq(partsRequests.id, response.partsRequestId),
        ),
      )
      .limit(1);

    if (!request) {
      throw new Error('Parts request not found for supplier response.');
    }

    await tx
      .update(supplierResponses)
      .set({ status: 'accepted' })
      .where(
        and(
          eq(supplierResponses.tenantId, tenantId),
          eq(supplierResponses.id, supplierResponseId),
        ),
      );

    const [order] = await tx
      .insert(partsOrders)
      .values({
        tenantId,
        supplierResponseId: response.id,
        supplierId: response.supplierId,
        jobCardId: request.jobCardId,
        status: 'ordered',
        orderedAt: new Date(),
        expectedDeliveryAt: response.eta,
      })
      .returning();

    return order;
  });
}
