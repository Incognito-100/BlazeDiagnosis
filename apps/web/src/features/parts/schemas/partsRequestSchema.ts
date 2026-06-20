import { z } from 'zod';

export const createPartsRequestSchema = z.object({
  items: z
    .array(
      z.object({
        notes: z.string().optional(),
        partId: z.union([z.string(), z.number()]),
        quantity: z.number().int().positive().default(1),
      }),
    )
    .min(1),
  jobCardId: z.string().uuid(),
  notes: z.string().optional(),
  staffId: z.string().uuid().optional(),
});

export type CreatePartsRequestSchemaInput = z.infer<
  typeof createPartsRequestSchema
>;
