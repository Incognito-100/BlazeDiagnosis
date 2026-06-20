import { z } from 'zod';

const optionalEmail = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.string().email().optional(),
);

const optionalInteger = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.coerce.number().int().optional(),
);

export const customerVehicleIntakeSchema = z.object({
  customer: z.object({
    address: z.string().optional(),
    companyName: z.string().optional(),
    email: optionalEmail,
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    notes: z.string().optional(),
    phone: z.string().optional(),
    preferredContactMethod: z.enum(['email', 'phone', 'whatsapp', '']).optional(),
  }),
  vehicle: z.object({
    color: z.string().optional(),
    engineDetails: z.string().optional(),
    fuelType: z.string().optional(),
    make: z.string().min(1, 'Make is required'),
    mileage: optionalInteger.pipe(z.number().nonnegative().optional()),
    model: z.string().min(1, 'Model is required'),
    notes: z.string().optional(),
    registrationNumber: z.string().min(1, 'Registration number is required'),
    transmission: z.string().optional(),
    vin: z.string().optional(),
    year: optionalInteger.pipe(z.number().min(1900).max(2100).optional()),
  }),
});

export type CustomerVehicleIntakeInput = z.infer<typeof customerVehicleIntakeSchema>;
