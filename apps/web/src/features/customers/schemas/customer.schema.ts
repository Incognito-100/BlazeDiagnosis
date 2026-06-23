import { z } from 'zod';

export const createCustomerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  preferredLocale: z.string().default('en'),
  notes: z.string().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
