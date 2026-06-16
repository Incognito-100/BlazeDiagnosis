import { db } from '@/db/client';
import { auditLogs } from '@/db/schema/audit';

// Define a strict TypeScript interface for the input data
interface CreateAuditLogOptions {
  tenantId: string;
  action: string;
  entityType: string;
  entityId?: string;
  actorUserId?: string;
  previousValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
}

/**
 * Background utility to record system, tenant, and user mutations.
 * Fires asynchronously to ensure main thread processes remain highly performant.
 */
export async function createAuditLog(options: CreateAuditLogOptions) {
  try {
    // Insert the log tracking entry directly using the established database instance
    await db.insert(auditLogs).values({
      tenantId: options.tenantId,
      action: options.action,
      entityType: options.entityType,
      entityId: options.entityId || null,
      actorUserId: options.actorUserId || null,
      previousValue: options.previousValue || null,
      newValue: options.newValue || null,
      ipAddress: options.ipAddress || null,
      userAgent: options.userAgent || null,
      requestId: options.requestId || null,
    });
    
    return { success: true };
  } catch (error) {
    // Log internally but do not throw the error up to crash the user's primary transaction
    console.error('Background Audit Logger encountered a failure:', error);
    return { success: false, error };
  }
}