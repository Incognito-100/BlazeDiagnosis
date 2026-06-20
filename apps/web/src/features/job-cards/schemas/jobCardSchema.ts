import { z } from 'zod';

export const createServiceRequestSchema = z.object({
  customerId: z.string().uuid(),
  vehicleId: z.string().uuid(),
  requestedService: z.string().min(1),
  customerConcern: z.string().optional(),
  preferredDate: z.coerce.date().optional(),
});

export type CreateServiceRequestInput = z.infer<
  typeof createServiceRequestSchema
>;
