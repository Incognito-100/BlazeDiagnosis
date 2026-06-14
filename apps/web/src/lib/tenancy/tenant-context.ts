import { headers } from 'next/headers';

import { requireUser } from '@/lib/auth/session';

export type TenantContext = {
  tenantId: string;
  source: 'session' | 'host' | 'platform_override';
};

export async function resolveTenantFromRequest(): Promise<TenantContext | null> {
  const user = await requireUser().catch(() => null);

  if (user?.activeTenantId) {
    return {
      tenantId: user.activeTenantId,
      source: 'session',
    };
  }

  const headerList = await headers();
  const host = headerList.get('host');

  if (!host) {
    return null;
  }

  // TODO: Resolve tenant from tenant_domains table using host.
  return null;
}

export async function requireTenantContext() {
  const tenant = await resolveTenantFromRequest();

  if (!tenant) {
    throw new Error('Tenant context required.');
  }

  return tenant;
}

export function assertSameTenant(
  resourceTenantId: string,
  context: TenantContext,
) {
  if (resourceTenantId !== context.tenantId) {
    throw new Error('Cross-tenant access denied.');
  }
}
