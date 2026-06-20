export type InvoiceStatus = 'OVERDUE' | 'PAID' | 'PENDING';

export type Invoice = {
  amountCents: number;
  customerRef: string;
  dueDate: string;
  id: string;
  invoiceNumber: string;
  issuedAt: string;
  jobCardId: string;
  status: InvoiceStatus;
};

export type InvoiceLineItem = {
  amountCents: number;
  description: string;
  id: string;
  quantity: number;
  type: 'LABOUR' | 'PART';
  unitPriceCents: number;
};

export type InvoiceDetail = Omit<Invoice, 'amountCents'> & {
  lineItems: InvoiceLineItem[];
  subtotalCents: number;
  totalCents: number;
  vatCents: number;
};


export type CustomerInvoiceSummary = {
  dueDate: string;
  id: string;
  invoiceNumber: string;
  issueDate: string;
  status: InvoiceStatus;
  subtotalCents: number;
  totalCents: number;
  vatCents: number;
};
