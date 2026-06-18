/**
 * Audit writer helper (skeleton)
 * - Provides a single entry point `writeAudit` to record audit events.
 * - Plan: wire this to server-side logging (database `AuditLog` table) and
 *   to an append-only storage for compliance. Keep payloads small and
 *   avoid storing PII in plaintext.
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
