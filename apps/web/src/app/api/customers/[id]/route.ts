import { NextResponse } from 'next/server';
import { requireTenantContext } from '@/lib/tenancy/tenant-context';
import { createCustomerSchema } from '@/features/customers/schemas/customer.schema';
import { createCustomer, searchCustomers } from '@/features/customers/services/customer.service';

export async function GET(req: Request) {
  try {
    const tenant = await requireTenantContext();
    const data = await searchCustomers(tenant.tenantId, '');
    return NextResponse.json({ customers: data }, { status: 200 });
  } catch (error) {
    console.error('GET /customers failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const tenant = await requireTenantContext();
    const body = await req.json();

    const parsed = createCustomerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const customer = await createCustomer(tenant.tenantId, parsed.data);
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('POST /customers failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
