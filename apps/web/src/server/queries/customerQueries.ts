import { searchCustomers } from '@/features/customers/services/customerService';
import { requireTenantContext } from '@/lib/tenancy/tenantContext';

export async function getCustomerSearchResults(query: string) {
  const tenant = await requireTenantContext();
  return searchCustomers(tenant.tenantId, query);
}
