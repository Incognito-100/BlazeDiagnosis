import type { Route } from 'next';
import type { ReactNode } from 'react';

export type AppSurface = 'customer' | 'platform' | 'station' | 'supplier';

export type NavItem = {
  href: Route;
  label: string;
};

export type AppShellProps = {
  actions?: ReactNode;
  children: ReactNode;
  description?: string;
  surface: AppSurface;
  title: string;
};

export type DashboardLink = {
  description: string;
  href: Route;
  label: string;
};
