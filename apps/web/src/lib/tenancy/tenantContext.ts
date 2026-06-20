import { headers } from 'next/headers';
import { requireUser } from '@/lib/auth/session';

export type TenantContext = {
  tenantId: string;
  source: 'session' | 'host' | 'platform_override';
};

// ✅ Resolves tenant from session or host header
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

// ✅ Safe tenant context enforcement with dev fallback
export async function requireTenantContext(): Promise<TenantContext> {
  const tenant = await resolveTenantFromRequest();

  if (!tenant) {
    // Development fallback for local testing
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ No tenant found — using dev fallback tenant.');
      return {
        tenantId: '00000000-0000-0000-0000-000000000001',
        source: 'platform_override',
      };
    }

    throw new Error('Tenant context required.');
  }

  return tenant;
}

// ✅ Cross-tenant access guard
export function assertSameTenant(resourceTenantId: string, context: TenantContext) {
  if (resourceTenantId !== context.tenantId) {
    throw new Error('Cross-tenant access denied.');
  }
}
