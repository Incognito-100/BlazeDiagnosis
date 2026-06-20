import type { Route } from 'next';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { CustomerList } from '@/components/customers';
import { Button } from '@/components/ui/button';

export default function StationCustomersPage() {
  return (
    <AppShell
      actions={
        <Button asChild variant="accent">
          <Link href={'/en/station/customers/new' as Route}>
            <PlusCircle className="size-4" />
            Add customer
          </Link>
        </Button>
      }
      description="Search tenant customers, validate contact details, and prepare customer records for service intake."
      surface="station"
      title="Customers"
    >
      <CustomerList />
    </AppShell>
  );
}
