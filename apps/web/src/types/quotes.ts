export type QuoteLineCategory = 'labor' | 'part' | 'diagnostic' | 'consumable' | 'optional_service';
export type QuoteApprovalRequirement = 'required' | 'recommended' | 'optional';

export type QuoteLineItemDraft = {
  approvalRequirement: QuoteApprovalRequirement;
  category: QuoteLineCategory;
  description: string;
  discount: number;
  id: string;
  quantity: number;
  taxRate: number;
  unitPrice: number;
};

export type QuoteLineTotals = {
  discount: number;
  lineTotal: number;
  subtotal: number;
  tax: number;
};

export type QuoteTotals = {
  discountTotal: number;
  subtotal: number;
  taxTotal: number;
  total: number;
};

export type QuoteBuilderState = {
  customerName: string;
  jobCardNumber: string;
  quoteNumber: string;
  vehicleDescription: string;
  validDays: number;
  lineItems: QuoteLineItemDraft[];
};
