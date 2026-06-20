import type { ReactNode } from 'react';

export type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export type IdPageProps = {
  params: Promise<{ id: string }>;
};
