import type { Permission } from '@/lib/constants/roles';

import { requireUser } from '../auth/session';

export async function requirePermission(permission: Permission) {
  const user = await requireUser();

  if (!user.permissions.includes(permission)) {
    throw new Error(`Missing permission: ${permission}`);
  }

  return user;
}

export async function requireAnyPermission(requiredPermissions: Permission[]) {
  const user = await requireUser();
  const allowed = requiredPermissions.some((permission) =>
    user.permissions.includes(permission),
  );

  if (!allowed) {
    throw new Error(
      `Missing one of permissions: ${requiredPermissions.join(', ')}`,
    );
  }

  return user;
}

export async function requireTenantPermission(
  tenantId: string,
  permission: Permission,
) {
  const user = await requirePermission(permission);
  const isPlatformAdmin = user.permissions.includes('platform.tenants.manage');

  if (!isPlatformAdmin && user.activeTenantId !== tenantId) {
    throw new Error('Cross-tenant access denied.');
  }

  return user;
}
