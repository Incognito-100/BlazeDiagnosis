import { NextResponse } from 'next/server';
import {db} from "@/db/client";
import { vehicles} from "@/db/schema";
import {and, eq} from "drizzle-orm";
import { requireTenantContext } from '@/lib/tenancy/tenant-context';
import { createVehicleSchema } from '@/features/vehicles/schemas/vehicle.schema';
import { createVehicle } from '@/features/vehicles/services/vehicle.service';
import { ZodError } from 'zod';

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
        } const vehicle = await db
      .select()
      .from(vehicles)
      .where(
        and(
          eq(vehicles.tenantId, tenantId),
          eq(vehicles.isArchived, false)
        )
      );

    // Return the clean data list payload
    return NextResponse.json(vehicle, { status: 200 });

// Implemented the catch sequence for the error handling.
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// New create vehicle POST API route

export async function POST(request: Request) {
  try {

    // Validate the tenant context to ensure that the request is associated with a valid tenant.

    const tenant = await requireTenantContext();

    // Parse the request body to extract the vehicle data.

    const body = await request.json();

    // Validate the input data against the createVehicleSchema to ensure that it meets the required format and constraints.

    const input = createVehicleSchema.parse(body);

    // Create a new vehicle in the database using the validated input data and the tenant ID.

    const vehicle = await createVehicle(tenant.tenantId, input);

    // Return the created vehicle as a JSON response with a 201 status code.

    return NextResponse.json(vehicle, { status: 201 });
    
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