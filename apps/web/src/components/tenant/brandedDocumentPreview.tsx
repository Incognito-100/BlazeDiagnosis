'use client';

import { useMemo, useSyncExternalStore } from 'react';

import { StatusBadge } from '@/components/common/statusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/lib/formatting/money';
import {
  getTenantBrandingServerSnapshot,
  getTenantBrandingSnapshot,
  subscribeToTenantBranding,
} from '@/lib/tenantBranding';
import type { TenantBranding } from '@/types/tenantBranding';

export type BrandedDocumentPreviewProps = {
  documentType?: 'quote' | 'invoice';
  total?: number;
};

export function BrandedDocumentPreview({
  documentType = 'quote',
  total = 2242.5,
}: BrandedDocumentPreviewProps) {
  const snapshot = useSyncExternalStore(
    subscribeToTenantBranding,
    getTenantBrandingSnapshot,
    getTenantBrandingServerSnapshot,
  );
  const branding = useMemo(() => JSON.parse(snapshot) as TenantBranding, [snapshot]);
  const documentNumber = documentType === 'quote'
    ? `${branding.quotePrefix}-2026-0001`
    : `${branding.invoicePrefix}-2026-0001`;

  return (
    <Card variant="panel">
      <CardHeader>
        <CardTitle>Branded {documentType} preview</CardTitle>
        <CardDescription>
          This preview uses the tenant branding that will be applied to generated quotes and invoices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div
            className="flex flex-col gap-4 p-5 text-primary-foreground sm:flex-row sm:items-center sm:justify-between"
            style={{ background: branding.primaryColor }}
          >
            <div className="flex items-center gap-3">
              {branding.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={`${branding.businessName} logo`}
                  className="size-12 rounded-xl bg-white object-contain p-2"
                  src={branding.logoUrl}
                />
              ) : (
                <span className="flex size-12 items-center justify-center rounded-xl bg-white/15 text-base font-black">
                  {branding.businessName.slice(0, 2).toUpperCase()}
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold">{branding.businessName}</h3>
                <p className="text-sm opacity-85">{branding.legalName}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-75">
                {documentType}
              </p>
              <p className="font-mono text-lg font-bold">{documentNumber}</p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2">
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Tenant details</p>
              <p>{branding.tradingAddress}</p>
              <p>{branding.businessPhone}</p>
              <p>{branding.businessEmail}</p>
              <p>{branding.taxNumber}</p>
            </div>
            <div className="space-y-3 rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge tone={documentType === 'quote' ? 'warning' : 'success'}>
                  {documentType === 'quote' ? 'Draft' : 'Ready'}
                </StatusBadge>
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatMoney(total / 1.15)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatMoney(total - total / 1.15)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-base font-bold">
                <span>Total</span>
                <span>{formatMoney(total)}</span>
              </div>
            </div>
          </div>

          <div className="h-2" style={{ background: branding.accentColor }} />
        </article>
      </CardContent>
    </Card>
  );
}
