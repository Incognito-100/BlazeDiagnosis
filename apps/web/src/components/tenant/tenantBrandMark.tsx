'use client';

import { useMemo, useSyncExternalStore } from 'react';

import {
  getTenantBrandingServerSnapshot,
  getTenantBrandingSnapshot,
  subscribeToTenantBranding,
} from '@/lib/tenantBranding';
import type { TenantBranding } from '@/types/tenantBranding';

export function TenantBrandMark({ surfaceLabel }: { surfaceLabel: string }) {
  const snapshot = useSyncExternalStore(
    subscribeToTenantBranding,
    getTenantBrandingSnapshot,
    getTenantBrandingServerSnapshot,
  );
  const branding = useMemo(() => JSON.parse(snapshot) as TenantBranding, [snapshot]);
  const initials = getInitials(branding.businessName);

  return (
    <span className="group inline-flex items-center gap-3">
      {branding.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={`${branding.businessName} logo`}
          className="size-10 rounded-xl border border-border bg-card object-contain p-1 shadow-sm"
          src={branding.logoUrl}
        />
      ) : (
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground shadow-sm">
          {initials}
        </span>
      )}
      <span className="hidden sm:block">
        <span className="block text-sm font-bold leading-none text-foreground">
          {branding.businessName}
        </span>
        <span className="block text-xs text-muted-foreground">{surfaceLabel}</span>
      </span>
    </span>
  );
}

function getInitials(value: string) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const firstTwo = words.slice(0, 2).map((word) => word.charAt(0).toUpperCase());
  return firstTwo.join('') || 'BD';
}
