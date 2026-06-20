import { z } from 'zod';

export const createSupplierResponseSchema = z.object({
  deliveryFee: z.union([z.string(), z.number()]).optional(),
  eta: z.string().datetime().optional(),
  items: z
    .array(
      z.object({
        availability: z.string().default('available'),
        brand: z.string().optional(),
        partId: z.string().uuid(),
        partName: z.string().min(1),
        partNumber: z.string().optional(),
        quantityAvailable: z.union([z.string(), z.number()]).default(1),
        unitPrice: z.union([z.string(), z.number()]).default(0),
      }),
    )
    .min(1),
  partsRequestId: z.string().uuid(),
  subtotal: z.union([z.string(), z.number()]).default(0),
  supplierId: z.string().uuid(),
  tax: z.union([z.string(), z.number()]).default(0),
  total: z.union([z.string(), z.number()]).default(0),
});

export type CreateSupplierResponseSchemaInput = z.infer<
  typeof createSupplierResponseSchema
>;
