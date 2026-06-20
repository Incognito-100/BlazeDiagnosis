import { z } from 'zod';

const colorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use a six-character hex color such as #f97316.');

export const tenantBrandingSchema = z.object({
  accentColor: colorSchema,
  businessEmail: z.string().email().optional().or(z.literal('')),
  businessName: z.string().min(1, 'Business name is required'),
  businessPhone: z.string().optional(),
  invoicePrefix: z.string().min(1).max(12),
  legalName: z.string().optional(),
  logoUrl: z.string().url().optional().or(z.literal('')),
  primaryColor: colorSchema,
  quotePrefix: z.string().min(1).max(12),
  secondaryColor: colorSchema,
  taxNumber: z.string().optional(),
  tradingAddress: z.string().optional(),
});

export type TenantBrandingInput = z.infer<typeof tenantBrandingSchema>;
