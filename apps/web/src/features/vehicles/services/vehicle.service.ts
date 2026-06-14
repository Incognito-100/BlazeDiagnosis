import { and, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import {
  vehicleCustomers,
  vehicleOdometerReadings,
  vehicles,
} from '@/db/schema';
import { requireTenantPermission } from '@/lib/authorization/guards';

import type { CreateVehicleInput } from '../schemas/vehicle.schema';

export async function createVehicle(
  tenantId: string,
  input: CreateVehicleInput,
) {
  await requireTenantPermission(tenantId, 'vehicles.write');

  return db.transaction(async (tx) => {
    const [vehicle] = await tx
      .insert(vehicles)
      .values({
        tenantId,
        primaryCustomerId: input.primaryCustomerId,
        vin: input.vin,
        registrationNumber: input.registrationNumber,
        make: input.make,
        model: input.model,
        year: input.year,
        mileage: input.mileage,
        engineDetails: input.engineDetails,
        fuelType: input.fuelType,
        transmission: input.transmission,
        color: input.color,
        notes: input.notes,
      })
      .returning();

    await tx.insert(vehicleCustomers).values({
      tenantId,
      vehicleId: vehicle.id,
      customerId: input.primaryCustomerId,
      relationshipType: 'owner',
    });

    if (input.mileage) {
      await tx.insert(vehicleOdometerReadings).values({
        tenantId,
        vehicleId: vehicle.id,
        reading: input.mileage,
        source: 'vehicle_creation',
      });
    }

    return vehicle;
  });
}

export async function listVehiclesForCustomer(
  tenantId: string,
  customerId: string,
) {
  await requireTenantPermission(tenantId, 'vehicles.read');

  return db
    .select()
    .from(vehicles)
    .where(
      and(
        eq(vehicles.tenantId, tenantId),
        eq(vehicles.primaryCustomerId, customerId),
      ),
    );
}
