import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { tenantStatusEnum } from './enums';

export const tenants = pgTable(
  'tenants',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    slug: varchar('slug', { length: 120 }).notNull(),
    legalName: text('legal_name'),
    status: tenantStatusEnum('status').notNull().default('trial'),
    defaultLocale: varchar('default_locale', { length: 12 })
      .notNull()
      .default('en'),
    timezone: varchar('timezone', { length: 80 })
      .notNull()
      .default('Africa/Johannesburg'),
    currency: varchar('currency', { length: 3 }).notNull().default('ZAR'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('tenants_slug_idx').on(table.slug),
    index('tenants_status_idx').on(table.status),
  ],
);

export const tenantDomains = pgTable(
  'tenant_domains',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .references(() => tenants.id, { onDelete: 'cascade' })
      .notNull(),
    domain: text('domain').notNull(),
    type: varchar('type', { length: 40 }).notNull().default('subdomain'),
    isPrimary: boolean('is_primary').notNull().default(false),
    verificationStatus: varchar('verification_status', { length: 40 })
      .notNull()
      .default('pending'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('tenant_domains_domain_idx').on(table.domain),
    index('tenant_domains_tenant_idx').on(table.tenantId),
  ],
);

export const tenantBranding = pgTable('tenant_branding', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  logoUrl: text('logo_url'),
  faviconUrl: text('favicon_url'),
  primaryColor: varchar('primary_color', { length: 20 }),
  secondaryColor: varchar('secondary_color', { length: 20 }),
  accentColor: varchar('accent_color', { length: 20 }),
  themeMode: varchar('theme_mode', { length: 20 }).default('light'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const tenantSettings = pgTable(
  'tenant_settings',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .references(() => tenants.id, { onDelete: 'cascade' })
      .notNull(),
    settingKey: varchar('setting_key', { length: 120 }).notNull(),
    settingValue: jsonb('setting_value')
      .$type<Record<string, unknown>>()
      .notNull()
      .default({}),
    version: varchar('version', { length: 40 }).notNull().default('1'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('tenant_settings_unique_idx').on(
      table.tenantId,
      table.settingKey,
    ),
  ],
);

export const tenantFeatureFlags = pgTable(
  'tenant_feature_flags',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .references(() => tenants.id, { onDelete: 'cascade' })
      .notNull(),
    flagKey: varchar('flag_key', { length: 120 }).notNull(),
    enabled: boolean('enabled').notNull().default(false),
    config: jsonb('config')
      .$type<Record<string, unknown>>()
      .notNull()
      .default({}),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('tenant_feature_flags_unique_idx').on(
      table.tenantId,
      table.flagKey,
    ),
  ],
);

export const tenantsRelations = relations(tenants, ({ many }) => ({
  domains: many(tenantDomains),
  settings: many(tenantSettings),
  featureFlags: many(tenantFeatureFlags),
}));
