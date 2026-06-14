import { and, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { invoices, jobCards, quotes } from '@/db/schema';
import { requireTenantPermission } from '@/lib/authorization/guards';

export async function getStationDashboardMetrics(tenantId: string) {
  await requireTenantPermission(tenantId, 'reports.view');

  const [openJobs, draftQuotes, outstandingInvoices] = await Promise.all([
    db
      .select()
      .from(jobCards)
      .where(and(eq(jobCards.tenantId, tenantId))),
    db
      .select()
      .from(quotes)
      .where(and(eq(quotes.tenantId, tenantId), eq(quotes.status, 'draft'))),
    db
      .select()
      .from(invoices)
      .where(
        and(eq(invoices.tenantId, tenantId), eq(invoices.status, 'issued')),
      ),
  ]);

  return {
    openJobCount: openJobs.length,
    draftQuoteCount: draftQuotes.length,
    outstandingInvoiceCount: outstandingInvoices.length,
  };
}
