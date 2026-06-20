import { FileText } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { QuoteBuilder } from '@/components/quotes';
import { Button } from '@/components/ui/button';

export default function StationQuotesPage() {
  return (
    <AppShell
      actions={
        <Button disabled variant="outline">
          <FileText className="size-4" />
          Draft builder
        </Button>
      }
      description="Build branded customer quotes with itemized parts, labor, diagnostics, tax, discounts, and customer approval categories."
      surface="station"
      title="Quotes"
    >
      <QuoteBuilder />
    </AppShell>
  );
}
