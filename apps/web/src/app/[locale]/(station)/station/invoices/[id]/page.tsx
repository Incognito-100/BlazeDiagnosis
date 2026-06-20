import { notFound } from 'next/navigation';
import { Send } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { BrandedDocumentPreview } from '@/components/tenant/brandedDocumentPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { IdPageProps } from '@/types/routes';

export default async function InvoiceDetailPage({ params }: IdPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <AppShell
      description="Station-side invoice detail placeholder for sending, payment tracking, and audit history."
      surface="station"
      title="Invoice detail"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Skeleton detail for invoice {id}.</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <InvoiceField label="Invoice number" value="—" />
              <InvoiceField label="Issue date" value="—" />
              <InvoiceField label="Due date" value="—" />
              <InvoiceField label="Total" value="—" />
            </dl>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Workflow actions will connect to invoice mutations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full" variant="accent">
                <Send className="size-4" />
                Send invoice
              </Button>
            </CardContent>
          </Card>
          <BrandedDocumentPreview documentType="invoice" />
        </div>
      </div>
    </AppShell>
  );
}

function InvoiceField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-foreground">{value}</dd>
    </div>
  );
}
