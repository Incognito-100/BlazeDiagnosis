import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { visibilityEnum } from './enums';
import { tenants } from './tenants';
import { users } from './users';

export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  ownerUserId: uuid('owner_user_id').references(() => users.id),
  storageKey: text('storage_key').notNull(),
  fileName: text('file_name').notNull(),
  mimeType: varchar('mime_type', { length: 120 }).notNull(),
  size: integer('size').notNull(),
  visibility: visibilityEnum('visibility').notNull().default('internal'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
