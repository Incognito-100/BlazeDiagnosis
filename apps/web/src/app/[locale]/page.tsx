import type { Route } from 'next';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DashboardLink = {
  href: Route;
  label: string;
};

const dashboardLinks: DashboardLink[] = [
  { href: '/en/customer' as Route, label: 'Customer dashboard' },
  { href: '/en/station' as Route, label: 'Service-station dashboard' },
  { href: '/en/station/showcase' as Route, label: 'MVP component showcase' },
  { href: '/en/supplier' as Route, label: 'Parts supplier dashboard' },
  { href: '/en/platform' as Route, label: 'Platform admin dashboard' },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-12">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Blaze POS MVP
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Tenant-first service station SaaS starter
        </h1>
        <p className="max-w-3xl text-lg text-neutral-600">
          This scaffold implements the first vertical-slice structure for
          customers, vehicles, job cards, quotes, approvals, parts requests,
          invoices, notifications, and audit logs.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {dashboardLinks.map((item) => (
          <Card key={item.href}>
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link className="font-medium underline" href={item.href}>
                Open dashboard
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
