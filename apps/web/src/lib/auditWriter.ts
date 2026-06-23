/**
 * Audit writer helper draft.
 * - Accepts a high-level audit event, tenant and actor context, entity type/id,
 *   and optional metadata.
 * - Important invoice, quote, and job events are declared so integrations can
 *   reuse consistent event names.
 * - This helper is ready to be wired into server-side persistence or an
 *   append-only audit stream.
 */

export type AuditAction =
    | 'CREATE'
    | 'UPDATE'
    | 'DELETE'
    | 'VIEW'
    | 'SEND'
    | 'ERROR'

export type AuditResource = 'INVOICE' | 'JOB' | 'PAYMENT' | 'USER' | 'WORKSHOP' | 'OTHER'

export type AuditEntry = {
    userId?: string
    action: AuditAction
    resource: AuditResource
    resourceId?: string
    description?: string
    changeSet?: Record<string, unknown>
    ipAddress?: string
    userAgent?: string
    timestamp?: string
}



export async function writeAudit(entry: AuditEntry) {
    // Placeholder: in real implementation call a server-only API or directly
    // insert into DB from server context. For now, just log to console so
    // developers can see the intended shape during development.
    const payload = {
        ...entry,
        timestamp: entry.timestamp ?? new Date().toISOString(),
    }

    // eslint-disable-next-line no-console
    console.info('[AUDIT]', JSON.stringify(payload))

    // Return a placeholder success result
    return { ok: true }
}

export default { writeAudit }
