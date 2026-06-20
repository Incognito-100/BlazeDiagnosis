import { and, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { partsOrders, partsRequests, partsRequestItems, supplierResponses } from "@/db/schema";
import { requireTenantPermission } from "@/lib/authorization/guards";

// 🧩 CREATE PARTS REQUEST WITH ITEMS
export async function createPartsRequest(
  tenantId: string,
  jobCardId: string,
  staffId: string, // REQUIRED: Must pass the UUID of the user
  items: Array<{ partId: string; quantity: number; notes?: string }>,
  notes?: string,
) {
  await requireTenantPermission(tenantId, "parts.request");

  return await db.transaction(async (tx) => {
    // 1. Insert Parent Request (Include requestedByUserId to avoid constraint errors)
    const [request] = await tx
      .insert(partsRequests)
      .values({ 
        tenantId, 
        jobCardId, 
        requestedByUserId: staffId, 
        notes, 
        status: "draft" 
      })
      .returning();

    // 2. Insert Items using the requestId from the created request
    if (items && items.length > 0) {
      const itemValues = items.map((item) => ({
        tenantId,
        partsRequestId: request.id,
        partName: String(item.partId),
        quantity: String(item.quantity || 1),
        notes: item.notes || null,
      }));

      await tx.insert(partsRequestItems).values(itemValues);
    }

    return request;
  });
}

// ✅ APPROVE SUPPLIER RESPONSE
export async function approveSupplierResponse(
  tenantId: string,
  supplierResponseId: string,
) {
  await requireTenantPermission(tenantId, "parts.approve_supplier_quote");

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

    if (!response) throw new Error("Supplier response not found.");

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

    if (!request) throw new Error("Parts request not found for supplier response.");

    await tx
      .update(supplierResponses)
      .set({ status: "accepted" })
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
        status: "ordered",
        orderedAt: new Date(),
        expectedDeliveryAt: response.eta ? new Date(response.eta) : null,
      })
      .returning();

    return order;
  });
}