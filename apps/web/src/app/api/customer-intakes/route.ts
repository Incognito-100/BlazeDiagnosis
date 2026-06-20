import { customerVehicleIntakeSchema } from '@/features/customers/schemas/customerVehicleIntakeSchema';
import { createCustomerVehicleIntake } from '@/features/customers/services/customerService';
import { apiCreated, handleApiError } from '@/lib/api/response';
import { requireTenantContext } from '@/lib/tenancy/tenantContext';

const routeName = '/api/customer-intakes';

export async function POST(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const input = customerVehicleIntakeSchema.parse(await request.json());
    const intake = await createCustomerVehicleIntake(tenant.tenantId, input);

    return apiCreated({ intake });
  } catch (error) {
    return handleApiError(`POST ${routeName}`, error);
  }
}
