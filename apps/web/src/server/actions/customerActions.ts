'use server';

import { createCustomerSchema } from '@/features/customers/schemas/customerSchema';
import { createCustomer } from '@/features/customers/services/customerService';
import { requireTenantContext } from '@/lib/tenancy/tenantContext';

export async function createCustomerAction(formData: FormData) {
  const tenant = await requireTenantContext();
  const input = createCustomerSchema.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email') || undefined,
    phone: formData.get('phone') || undefined,
  });

  return createCustomer(tenant.tenantId, input);
}
