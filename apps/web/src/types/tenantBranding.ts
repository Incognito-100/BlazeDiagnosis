export type TenantBranding = {
  accentColor: string;
  businessEmail: string;
  businessName: string;
  businessPhone: string;
  invoicePrefix: string;
  legalName: string;
  logoUrl: string;
  primaryColor: string;
  quotePrefix: string;
  secondaryColor: string;
  taxNumber: string;
  tradingAddress: string;
};

export type TenantBrandingField = keyof TenantBranding;

export const defaultTenantBranding: TenantBranding = {
  accentColor: '#f97316',
  businessEmail: 'service@blazediagnostics.example',
  businessName: 'Blaze Diagnostics',
  businessPhone: '+27 11 000 0000',
  invoicePrefix: 'INV',
  legalName: 'Blaze Diagnostics Service Station',
  logoUrl: '',
  primaryColor: '#0f172a',
  quotePrefix: 'QTE',
  secondaryColor: '#0ea5e9',
  taxNumber: 'VAT 0000000000',
  tradingAddress: '123 Workshop Road, Johannesburg',
};
