import { and, eq, ilike, or } from 'drizzle-orm';

import { db } from '@/db/client';
import { customers } from '@/db/schema';
import { requireTenantPermission } from '@/lib/authorization/guards';

import type { CreateCustomerInput } from '../schemas/customer.schema';

export async function createCustomer(
  tenantId: string,
  input: CreateCustomerInput,
) {
  await requireTenantPermission(tenantId, 'customers.write');

  const [customer] = await db
    .insert(customers)
    .values({
      tenantId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      preferredLocale: input.preferredLocale,
      notes: input.notes,
    })
    .returning();

  return customer;
}

export async function searchCustomers(tenantId: string, query: string) {
  await requireTenantPermission(tenantId, 'customers.read');

  return db
    .select()
    .from(customers)
    .where(
      and(
        eq(customers.tenantId, tenantId),
        query
          ? or(
              ilike(customers.firstName, `%${query}%`),
              ilike(customers.lastName, `%${query}%`),
              ilike(customers.email, `%${query}%`),
            )
          : undefined,
      ),
    );
}

export async function getCustomerById(tenantId: string, customerId: string) {
  await requireTenantPermission(tenantId, 'customers.read');

  const [customer] = await db
    .select()
    .from(customers)
    .where(and(eq(customers.tenantId, tenantId), eq(customers.id, customerId)))
    .limit(1);

  return customer ?? null;
}
