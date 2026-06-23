import { cache } from 'react';

import type { Permission, SystemRole } from '@/lib/constants/roles';

export type AuthenticatedUser = {
  id: string;
  email: string;
  activeTenantId: string | null;
  roles: SystemRole[];
  permissions: Permission[];
};

export const getCurrentUser = cache(
  async (): Promise<AuthenticatedUser | null> => {
    // TODO: Replace with production auth provider session lookup.
    return {
      id: 'dev-user-id',
      email: 'dev@station.local',
      activeTenantId: null, // keep null so the dev fallback tenant kicks in
      roles: ['platform_admin'] as SystemRole[],
      permissions: [
        'platform.tenants.manage',
        'customers.read',
        'customers.write',
        'customers.delete',
        'vehicles.read',
        'vehicles.write',
        'vehicles.delete',
      ] as Permission[],
    };
  },
);

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Authentication required.');
  }

  return user;
}
