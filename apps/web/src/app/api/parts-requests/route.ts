import { and, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { partsRequestItems, partsRequests } from '@/db/schema/suppliers';
import { createPartsRequestSchema } from '@/features/parts/schemas/partsRequestSchema';
import {
  apiCreated,
  apiOk,
  handleApiError,
  handleMissingSearchParam,
  MissingSearchParamError,
  requireSearchParam,
} from '@/lib/api/response';
import { requireTenantContext } from '@/lib/tenancy/tenantContext';

const routeName = '/api/parts-requests';

export async function GET(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const { searchParams } = new URL(request.url);
    const jobCardId = requireSearchParam(searchParams, 'jobCardId');

    const requests = await db
      .select()
      .from(partsRequests)
      .where(
        and(
          eq(partsRequests.tenantId, tenant.tenantId),
          eq(partsRequests.jobCardId, jobCardId),
        ),
      );

    return apiOk({ requests }, { meta: { count: requests.length } });
  } catch (error) {
    if (error instanceof MissingSearchParamError) {
      return handleMissingSearchParam(error);
    }

    return handleApiError(`GET ${routeName}`, error);
  }
}

export async function POST(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const input = createPartsRequestSchema.parse(await request.json());

    const [partsRequest] = await db
      .insert(partsRequests)
      .values({
        jobCardId: input.jobCardId,
        notes: input.notes,
        requestedByUserId: input.staffId,
        status: 'draft',
        tenantId: tenant.tenantId,
      })
      .returning();

    const itemValues: (typeof partsRequestItems.$inferInsert)[] = input.items.map(
      (item) => ({
        notes: item.notes,
        partName: String(item.partId),
        partNumber: String(item.partId),
        partsRequestId: partsRequest.id,
        quantity: String(item.quantity),
        tenantId: tenant.tenantId,
      }),
    );

    await db.insert(partsRequestItems).values(itemValues);

    return apiCreated({ requestId: partsRequest.id });
  } catch (error) {
    return handleApiError(`POST ${routeName}`, error);
  }
}
