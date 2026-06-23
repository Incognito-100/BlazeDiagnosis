import { and, desc, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { auditLogs } from '@/db/schema';

export async function writeAuditLog(input: {
  tenantId?: string;
  actorUserId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  previousValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
}) {
  const [auditLog] = await db.insert(auditLogs).values(input).returning();
  return auditLog;
}

export async function writeAuditEvent(input: {
  tenantId?: string;
  actorUserId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  previousValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
}) {
  return writeAuditLog(input);
}

export async function searchAuditLogs(tenantId: string) {
  return db
    .select()
    .from(auditLogs)
    .where(and(eq(auditLogs.tenantId, tenantId)))
    .orderBy(desc(auditLogs.createdAt));
}
