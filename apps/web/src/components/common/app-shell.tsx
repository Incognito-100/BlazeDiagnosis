import type { Route } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Surface = 'customer' | 'station' | 'supplier' | 'platform';

type AppShellProps = {
  title: string;
  surface: Surface;
  children: ReactNode;
};

type NavItem = {
  href: Route;
  label: string;
};

const navItems: Record<Surface, NavItem[]> = {
  customer: [
    { href: '/en/customer' as Route, label: 'Dashboard' },
    { href: '/en/customer/vehicles' as Route, label: 'Vehicles' },
    { href: '/en/customer/services' as Route, label: 'Services' },
    { href: '/en/customer/quotes' as Route, label: 'Quotes' },
    { href: '/en/customer/invoices' as Route, label: 'Invoices' },
    { href: '/en/customer/messages' as Route, label: 'Messages' },
  ],
  station: [
    { href: '/en/station' as Route, label: 'Dashboard' },
    { href: '/en/station/showcase' as Route, label: 'Showcase' },
    { href: '/en/station/customers' as Route, label: 'Customers' },
    { href: '/en/station/vehicles' as Route, label: 'Vehicles' },
    { href: '/en/station/job-cards' as Route, label: 'Job Cards' },
    { href: '/en/station/parts' as Route, label: 'Parts' },
    { href: '/en/station/reports' as Route, label: 'Reports' },
  ],
  supplier: [
    { href: '/en/supplier' as Route, label: 'Dashboard' },
    { href: '/en/supplier/requests' as Route, label: 'Requests' },
    { href: '/en/supplier/quotes' as Route, label: 'Quotes' },
    { href: '/en/supplier/orders' as Route, label: 'Orders' },
    { href: '/en/supplier/deliveries' as Route, label: 'Deliveries' },
    { href: '/en/supplier/messages' as Route, label: 'Messages' },
  ],
  platform: [
    { href: '/en/platform' as Route, label: 'Dashboard' },
    { href: '/en/platform/tenants' as Route, label: 'Tenants' },
    { href: '/en/platform/subscriptions' as Route, label: 'Subscriptions' },
    { href: '/en/platform/feature-flags' as Route, label: 'Feature Flags' },
    { href: '/en/platform/usage' as Route, label: 'Usage' },
    { href: '/en/platform/audit-logs' as Route, label: 'Audit Logs' },
  ],
};

export function AppShell({ children, surface, title }: AppShellProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link className="font-bold" href={'/en' as Route}>
            Blaze POS
          </Link>
          <nav
            aria-label={`${surface} navigation`}
            className="hidden gap-4 md:flex"
          >
            {navItems[surface].map((item) => (
              <Link
                className="text-sm text-neutral-600 hover:text-neutral-950"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            {surface}
          </p>
          <h1 className={cn('text-3xl font-bold tracking-tight')}>{title}</h1>
        </div>
        {children}
      </main>
    </div>
  );
}
