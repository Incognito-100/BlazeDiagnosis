import { and, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import {
  tenantBranding,
  tenantFeatureFlags,
  tenantSettings,
  tenants,
} from '@/db/schema';
import {
  requirePermission,
  requireTenantPermission,
} from '@/lib/authorization/guards';

export async function createTenant(input: {
  name: string;
  slug: string;
  legalName?: string;
}) {
  await requirePermission('platform.tenants.manage');

  const [tenant] = await db.insert(tenants).values(input).returning();

  await db.insert(tenantBranding).values({ tenantId: tenant.id });

  return tenant;
}

export async function getTenantBySlug(slug: string) {
  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.slug, slug))
    .limit(1);
  return tenant ?? null;
}

export async function setTenantSetting(
  tenantId: string,
  settingKey: string,
  settingValue: Record<string, unknown>,
) {
  await requireTenantPermission(tenantId, 'tenant.settings.update');

  const [setting] = await db
    .insert(tenantSettings)
    .values({ tenantId, settingKey, settingValue })
    .onConflictDoUpdate({
      target: [tenantSettings.tenantId, tenantSettings.settingKey],
      set: { settingValue, updatedAt: new Date() },
    })
    .returning();

  return setting;
}

export async function isFeatureEnabled(tenantId: string, flagKey: string) {
  const [flag] = await db
    .select()
    .from(tenantFeatureFlags)
    .where(
      and(
        eq(tenantFeatureFlags.tenantId, tenantId),
        eq(tenantFeatureFlags.flagKey, flagKey),
      ),
    )
    .limit(1);

  return Boolean(flag?.enabled);
}
