export interface Quote {
  id: string;
  tenantId: string;
  jobCardId: string;
  customerId: string;
  status: "draft" | "sent" | "approved" | "declined" | "locked";
  subtotal: number;
  tax: number;
  total: number;
  sentAt?: Date;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuoteLineItem {
  id: string;
  quoteId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  type: 'part' | 'labor' | 'diagnostic' | 'consumable' | 'optional_service'; // ← Updated
  isApproved: boolean;
  approvedAt?: Date;
  declinedAt?: Date;
  declineReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuoteApprovalEvent {
  id: string;
  quoteId: string;
  lineItemId?: string;
  approvedBy: string;
  action: "approve" | "decline" | "send" | "lock";
  reason?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}