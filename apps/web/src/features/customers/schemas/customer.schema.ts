import { z } from 'zod';

export const createCustomerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid').optional(),
  phone: z.string().optional(),
  preferredLocale: z.string().default('en'),
  notes: z.string().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;



export const updateCustomerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid').optional(),
  phone: z.string().optional(),
  preferredLocale: z.string().default('en'),
  notes: z.string().optional(),
})

export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
//review of Customer.schema.ts
// this is used to pair Zod validation with TypeScript type inference. It clearly communicates the shape of a "create customer" 
// payload, enforcing required fields like firstName and lastName while keeping optional fields flexable. The use of .default('en')
//  for preferredLocale is a thoughtful touch that prevents unnecessary boilerplate in upstream code. Overall, the schema in concise,
// readable, and idiomatic-making it easy for other developers to understand the expected data contract at a glance and rely on strong 
// runtime and compile-time guarentees..


