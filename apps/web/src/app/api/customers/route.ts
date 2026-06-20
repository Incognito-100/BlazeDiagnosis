import { createCustomerSchema } from '@/features/customers/schemas/customerSchema';
import {
  createCustomer,
  searchCustomers,
} from '@/features/customers/services/customerService';
import { apiCreated, apiOk, handleApiError } from '@/lib/api/response';
import { requireTenantContext } from '@/lib/tenancy/tenantContext';

const routeName = '/api/customers';

export async function GET(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') ?? '';
    const customers = await searchCustomers(tenant.tenantId, query);

    return apiOk({ customers }, { meta: { count: customers.length } });
  } catch (error) {
    return handleApiError(`GET ${routeName}`, error);
  }
}

export async function POST(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const input = createCustomerSchema.parse(await request.json());
    const customer = await createCustomer(tenant.tenantId, input);

    return apiCreated({ customer });
  } catch (error) {
    return handleApiError(`POST ${routeName}`, error);
  }
}
