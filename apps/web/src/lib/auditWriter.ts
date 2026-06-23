/**
 * Audit writer helper draft.
 * - Accepts a high-level audit event, tenant and actor context, entity type/id,
 *   and optional metadata.
 * - Important invoice, quote, and job events are declared so integrations can
 *   reuse consistent event names.
 * - This helper is ready to be wired into server-side persistence or an
 *   append-only audit stream.
 */

export type AuditEventType =
  | 'QUOTE_CREATED'
  | 'QUOTE_SENT'
  | 'QUOTE_APPROVED'
  | 'QUOTE_DECLINED'
  | 'JOB_CREATED'
  | 'JOB_STATUS_UPDATED'
  | 'JOB_COMPLETED'
  | 'INVOICE_CREATED'
  | 'INVOICE_ISSUED'
  | 'INVOICE_PAID'
  | 'INVOICE_VOIDED'
  | 'PAYMENT_RECEIVED'
  | 'CUSTOMER_VIEWED_INVOICE'
  | 'AUDIT_ERROR'

export type AuditEntityType =
  | 'QUOTE'
  | 'JOB'
  | 'INVOICE'
  | 'PAYMENT'
  | 'CUSTOMER'
  | 'USER'
  | 'WORKSHOP'
  | 'OTHER'

export type AuditMetadata = Record<string, unknown>

export type AuditWriterInput = {
  eventType: AuditEventType
  tenantId: string
  actorId?: string
  entityType: AuditEntityType
  entityId?: string
  metadata?: AuditMetadata
  ipAddress?: string
  userAgent?: string
  requestId?: string
  timestamp?: string
}

export const importantAuditEvents: AuditEventType[] = [
  'QUOTE_CREATED',
  'QUOTE_SENT',
  'QUOTE_APPROVED',
  'QUOTE_DECLINED',
  'JOB_CREATED',
  'JOB_STATUS_UPDATED',
  'JOB_COMPLETED',
  'INVOICE_CREATED',
  'INVOICE_ISSUED',
  'INVOICE_PAID',
  'INVOICE_VOIDED',
  'PAYMENT_RECEIVED',
  'CUSTOMER_VIEWED_INVOICE',
  'AUDIT_ERROR',
]

export async function writeAudit(input: AuditWriterInput) {
  const payload = {
    tenantId: input.tenantId,
    actorUserId: input.actorId,
    action: input.eventType,
    entityType: input.entityType,
    entityId: input.entityId,
    previousValue: null,
    newValue: input.metadata ?? null,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    requestId: input.requestId,
    timestamp: input.timestamp ?? new Date().toISOString(),
  }

  // TODO: wire this helper to server-side audit persistence in
  // `features/audit/services/audit.service.ts`.
  if (typeof window === 'undefined') {
    // Server-side placeholder until persistence is integrated.
    // eslint-disable-next-line no-console
    console.info('[AUDIT] server', JSON.stringify(payload))
    return { ok: true, payload }
  }

  // Client-side fallback for development and local debugging.
  // eslint-disable-next-line no-console
  console.info('[AUDIT] client', JSON.stringify(payload))
  return { ok: true, payload }
}

export default { writeAudit, importantAuditEvents }
