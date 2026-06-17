import { createCustomerSchema } from '@/features/customers/schemas/customer.schema';
import { createCustomer } from '@/features/customers/services/customer.service';
import { requireTenantContext } from '@/lib/tenancy/tenant-context';
import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { customers } from '@/db/schema/customers';
import { and, eq } from 'drizzle-orm';

export async function GET(request: Request) {
    try {
        // Get the tenantId from the URL query string
        const {searchParams} = new URL(request.url);
        const tenantId = searchParams.get('tenantId');

        // Validate that the tenantId is provided
        if (!tenantId) {
            return NextResponse.json(
                {error: 'Missing required tenantId parameter'},
                {status: 400}
            );
        }
          const activeCustomers = await db
      .select()
      .from(customers)
      .where(
        and(
          eq(customers.tenantId, tenantId),
          eq(customers.isArchived, false)
        )
      );

    // Return the clean data list payload
    return NextResponse.json(activeCustomers);

// Implemented the catch sequence for the error handling.
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// The POST function is responsible for handling the creation of a new customer. 

export async function POST(req: Request) {

  // The try block is used to handle the main logic of the POST request, which includes validating the tenant context, parsing the request body, 
  // validating the input against the schema, and creating a new customer in the database.
  // If any of these steps fail, the catch block will handle the error and return a JSON response with an appropriate error message and status code.

  try {
    const tenant = await requireTenantContext();
    const body = await req.json();
    const input = createCustomerSchema.parse(body);
    const customer = await createCustomer(tenant.tenantId, input);

    return NextResponse.json(customer, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: err.flatten().fieldErrors },
        { status: 422 }
      );
    }
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};