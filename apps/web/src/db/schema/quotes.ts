import {
  boolean,
  index,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { customers } from './customers';
import {
  approvalStatusEnum,
  quoteLineCategoryEnum,
  quoteStatusEnum,
} from './enums';
import { jobCards } from './jobs';
import { tenants } from './tenants';

export const laborRules = pgTable('labor_rules', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  ruleType: varchar('rule_type', { length: 80 }).notNull(),
  config: jsonb('config')
    .$type<Record<string, unknown>>()
    .notNull()
    .default({}),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const quotes = pgTable(
  'quotes',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .references(() => tenants.id, { onDelete: 'cascade' })
      .notNull(),
    jobCardId: uuid('job_card_id')
      .references(() => jobCards.id)
      .notNull(),
    customerId: uuid('customer_id')
      .references(() => customers.id)
      .notNull(),
    quoteNumber: varchar('quote_number', { length: 80 }).notNull(),
    version: varchar('version', { length: 40 }).notNull().default('1'),
    status: quoteStatusEnum('status').notNull().default('draft'),
    validUntil: timestamp('valid_until', { withTimezone: true }),
    subtotal: numeric('subtotal', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    taxTotal: numeric('tax_total', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    discountTotal: numeric('discount_total', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    total: numeric('total', { precision: 12, scale: 2 }).notNull().default('0'),
    sentAt: timestamp('sent_at', { withTimezone: true }),
    lockedAt: timestamp('locked_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('quotes_tenant_job_idx').on(table.tenantId, table.jobCardId),
  ],
);

export const quoteDependencyGroups = pgTable('quote_dependency_groups', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  quoteId: uuid('quote_id')
    .references(() => quotes.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  rule: jsonb('rule').$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const quoteLineItems = pgTable(
  'quote_line_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .references(() => tenants.id, { onDelete: 'cascade' })
      .notNull(),
    quoteId: uuid('quote_id')
      .references(() => quotes.id, { onDelete: 'cascade' })
      .notNull(),
    jobCardId: uuid('job_card_id')
      .references(() => jobCards.id)
      .notNull(),
    category: quoteLineCategoryEnum('category').notNull(),
    description: text('description').notNull(),
    quantity: numeric('quantity', { precision: 12, scale: 2 })
      .notNull()
      .default('1'),
    unitPrice: numeric('unit_price', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    taxRate: numeric('tax_rate', { precision: 5, scale: 2 })
      .notNull()
      .default('0'),
    discount: numeric('discount', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    total: numeric('total', { precision: 12, scale: 2 }).notNull().default('0'),
    approvalRequirement: varchar('approval_requirement', { length: 40 })
      .notNull()
      .default('recommended'),
    approvalStatus: approvalStatusEnum('approval_status')
      .notNull()
      .default('pending'),
    dependencyGroupId: uuid('dependency_group_id').references(
      () => quoteDependencyGroups.id,
    ),
    laborRuleId: uuid('labor_rule_id').references(() => laborRules.id),
    sortOrder: numeric('sort_order', { precision: 8, scale: 2 })
      .notNull()
      .default('0'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('quote_line_items_quote_idx').on(table.tenantId, table.quoteId),
  ],
);

export const quoteApprovalEvents = pgTable('quote_approval_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  quoteId: uuid('quote_id')
    .references(() => quotes.id, { onDelete: 'cascade' })
    .notNull(),
  quoteLineItemId: uuid('quote_line_item_id')
    .references(() => quoteLineItems.id, { onDelete: 'cascade' })
    .notNull(),
  customerId: uuid('customer_id')
    .references(() => customers.id)
    .notNull(),
  decision: approvalStatusEnum('decision').notNull(),
  reason: text('reason'),
  ipAddress: varchar('ip_address', { length: 80 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
