import { createCustomerSchema } from '@/features/customers/schemas/customer.schema';
import { createCustomer } from '@/features/customers/services/customer.service';
import { requireTenantContext } from '@/lib/tenancy/tenant-context';
import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { customers } from '@/db/schema/customers';
import { and, eq } from 'drizzle-orm';
import { ZodError } from 'zod';

// GET Handler: Fetch tenant-isolated active customers
export async function GET(request: Request) {
  try {
    // 1. Enforce strict tenant session initialization boundaries
    const tenant = await requireTenantContext();
    
    // 2. Security Fix: Restrict data access strictly to the active authenticated context token 
    // to prevent cross-tenant data leaks via URL parameter manipulation.
    const tenantId = tenant.tenantId;

    if (!tenantId) {
      return NextResponse.json(
        { error: 'Missing required tenantId context parameter' },
        { status: 400 }
      );
    }

    // 3. Query database targeting tenant isolation boundaries
    // TODO: Customize filters if you want to explicitly hide archived records
    const data = await db
      .select()
      .from(customers)
      .where(eq(customers.tenantId, tenantId));

    return NextResponse.json({ customers: data }, { status: 200 });

  } catch (error: any) {
    console.error(' GET API Multi-Tenant Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}

// POST Handler: Securely create a new customer profile attached to active tenant
export async function POST(req: Request) {

  // The try block is used to handle the main logic of the POST request, which includes validating the tenant context, parsing the request body, 
  // validating the input against the schema, and creating a new customer in the database.
  // If any of these steps fail, the catch block will handle the error and return a JSON response with an appropriate error message and status code.

  try {
    // Authenticate user session and retrieve active tenancy metadata
    const tenant = await requireTenantContext();
    const body = await req.json();
    
    // Validate structural integrity matching schema parameters
    const input = createCustomerSchema.parse(body);
    
    // Execute core database write service isolated to the client's tenant space
    const customer = await createCustomer(tenant.tenantId, input);

    // Return the newly created customer profile resource
    return NextResponse.json(customer, { status: 201 });

  } catch (error: any) {
    console.error(' POST API Multi-Tenant Route Error:', error);
    
    // The catch block handles different types of errors that may occur during the execution.
    // If the error is an instance of ZodError, input validation failed, returning a 400 Bad Request.
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation Failed', issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}