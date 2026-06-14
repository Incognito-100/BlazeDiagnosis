import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { tenants } from './tenants';
import { users } from './users';

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, {
      onDelete: 'cascade',
    }),
    actorUserId: uuid('actor_user_id').references(() => users.id),
    action: varchar('action', { length: 160 }).notNull(),
    entityType: varchar('entity_type', { length: 120 }).notNull(),
    entityId: uuid('entity_id'),
    previousValue: jsonb('previous_value').$type<Record<
      string,
      unknown
    > | null>(),
    newValue: jsonb('new_value').$type<Record<string, unknown> | null>(),
    ipAddress: varchar('ip_address', { length: 80 }),
    userAgent: text('user_agent'),
    requestId: varchar('request_id', { length: 120 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('audit_logs_tenant_created_idx').on(table.tenantId, table.createdAt),
  ],
);
