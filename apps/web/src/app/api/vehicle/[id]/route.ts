import { listVehiclesForCustomer } from '@/features/vehicles/services/vehicle.service';
import { NextRequest, NextResponse } from 'next/server';
import { requireTenantContext } from '@/lib/tenancy/tenant-context';
import { deleteVehicle } from '@/features/vehicles/services/vehicle.service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Get the tenantId from the URL query string
  const { id } = await params;
  const tenantId = request.nextUrl.searchParams.get('tenantId');

  // Validate that the tenantId is provided
  if (!tenantId) 
  {
    return NextResponse.json(
      { error: 'Missing required tenantId parameter' },
      { status: 400 },
    );
  }

  //Added try-catch block to handle potential errors when fetching vehicles for the customer.

try {
    const DB= await listVehiclesForCustomer(tenantId, id)
    return NextResponse.json(DB)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch vehicles for the customer' },
      { status: 500 },
    );
  }
}

// TODO: Implement Patch route for updating a vehicle

// DELETE
export async function DELETE(request: Request, 

  // Extract ID from URL
  { params }: {params: { id: string } }
) {
  try {
    // Get tenant (security check)
    const tenant = await requireTenantContext();

    // Delete vehicle in DB using service layer
    await deleteVehicle(tenant.tenantId, params.id);

    // Return success message
    return NextResponse.json(
      { message: 'Vehicle deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    // Return server error if deletion fails
    return NextResponse.json(
      { error: 'Failed to delete vehicle' },
      { status: 500 }
    );
  }
};