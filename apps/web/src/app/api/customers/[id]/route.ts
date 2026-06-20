import { updateCustomerSchema } from '@/features/customers/schemas/customerSchema';
import {
  deleteCustomer,
  getCustomerById,
  updateCustomer,
} from '@/features/customers/services/customerService';
import { apiError, apiOk, handleApiError } from '@/lib/api/response';
import { requireTenantContext } from '@/lib/tenancy/tenantContext';
import type { ApiRouteContext } from '@/types/api';

const routeName = '/api/customers/[id]';

export async function GET(_request: Request, { params }: ApiRouteContext) {
  try {
    const { id } = await params;
    const tenant = await requireTenantContext();
    const customer = await getCustomerById(tenant.tenantId, id);

    if (!customer) {
      return apiError('NOT_FOUND', 'Customer not found.', 404, { id });
    }

    return apiOk({ customer });
  } catch (error) {
    return handleApiError(`GET ${routeName}`, error);
  }
}

export async function PATCH(request: Request, { params }: ApiRouteContext) {
  try {
    const { id } = await params;
    const tenant = await requireTenantContext();
    const input = updateCustomerSchema.parse(await request.json());
    const customer = await updateCustomer(tenant.tenantId, id, input);

    return apiOk({ customer });
  } catch (error) {
    return handleApiError(`PATCH ${routeName}`, error);
  }
}

export async function DELETE(_request: Request, { params }: ApiRouteContext) {
  try {
    const { id } = await params;
    const tenant = await requireTenantContext();
    await deleteCustomer(tenant.tenantId, id);

    return apiOk({ id, message: 'Customer deleted successfully.' });
  } catch (error) {
    return handleApiError(`DELETE ${routeName}`, error);
  }
}
