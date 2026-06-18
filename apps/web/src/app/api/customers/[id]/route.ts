import { updateCustomerSchema } from "@/features/customers/schemas/customer.schema";
import { getCustomerById, updateCustomer } from "@/features/customers/services/customer.service";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * 🔍 GET: Retrieve a single customer's detailed profile.
 * 
 * Extracts the dynamic `id` segment from the path and matches it against 
 * the scoped `tenantId` passed via the query parameters to enforce proper multi-tenant security.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Next.js App Router dynamic parameters must be awaited before accessing properties
  const { id } = await params;
  const tenantId = request.nextUrl.searchParams.get("tenantId");

  // Fail-fast guard: Terminate request processing early if tenant context is missing
  if (!tenantId) {
    return NextResponse.json(
      { error: "Missing required tenantId parameter" },
      { status: 400 },
    );
  }

  try {
    // Query the database layer using the service function to retrieve the customer resource
    const customer = await getCustomerById(tenantId, id);
    
    // Resource validation: Handle scenarios where the resource ID doesn't exist or doesn't belong to the tenant
    if (!customer) {
      return NextResponse.json(
        { error: "Customer profile not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error(`API Failure while fetching customer profile [ID: ${id}]:`, error);
    return NextResponse.json(
      { error: "Failed to fetch Customer details" },
      { status: 500 },
    );
  }
}

/**
 *  PATCH: Modify properties of an existing customer record selectively.
 * 
 * Extracts fields from the request body payload, validates the mutation structural rules 
 * against the partial `updateCustomerSchema`, and updates the matching record in PostgreSQL.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the dynamic segment to safely resolve the parameters map
  const { id } = await params;
  const tenantId = request.nextUrl.searchParams.get("tenantId");

  // Fail-fast guard: Prevent modification anomalies by checking for the tenant identifier
  if (!tenantId) {
    return NextResponse.json(
      { error: "Missing required tenantId parameter" },
      { status: 400 },
    );
  }

  try {
    const input = await request.json();
    
    // Validate the modification payload selectively against the Zod mutation ruleset
    const validatedInput = updateCustomerSchema.parse(input);
    
    // Trigger the underlying service operation to update rows within the isolated workspace boundary
    const updatedCustomer = await updateCustomer(tenantId, id, validatedInput);
    
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error(`API Failure while updating customer profile [ID: ${id}]:`, error);

    // Conditional Catch-Sequence: Intercept structural validation breakdowns (e.g. invalid formatting)
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.flatten().fieldErrors },
        { status: 422 } // Unprocessable Content
      );
    }

    // Conditional Catch-Sequence: Intercept state conflicts or database constraint breaks
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 } // Conflict
      );
    }

    // Baseline Fallback: Catch unhandled system or infrastructure runtime exceptions
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 },
    );
  }
}