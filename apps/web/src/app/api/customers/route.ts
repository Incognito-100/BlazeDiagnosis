import { createCustomerSchema } from '@/features/customers/schemas/customer.schema';
import { createCustomer } from '@/features/customers/services/customer.service';
import { requireTenantContext } from '@/lib/tenancy/tenant-context';
import { NextResponse } from 'next/server';

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
    }
};

// TODO: Query the database for active or non-archived
// Add the catch statement to the try operator dont forget to return JSON
// Add the POST method to create a new customer and return the created customer in the response

export async function POST(req: Request) {
  try {
    const tenant = await requireTenantContext();
    const body = await req.json();
    const input = createCustomerSchema.parse(body);
    const customer = await createCustomer(tenant.tenantId, input);

    return NextResponse.json(customer, { status: 201 });
  }
};

//TODO: Add the catch statement to the try operator dont forget to return JSON