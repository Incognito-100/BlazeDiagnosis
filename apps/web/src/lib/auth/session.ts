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
    return null;
  },
);

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Authentication required.');
  }

  return user;
}
