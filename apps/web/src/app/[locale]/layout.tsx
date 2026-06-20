import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { LocaleLayoutProps } from '@/types/routes';

import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Blaze Diagnostics',
    template: '%s | Blaze Diagnostics',
  },
  description:
    'White-label diagnostics and service workflow SaaS for modern vehicle service stations.',
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};


const brandingInitScript = `
  (() => {
    try {
      const storedBranding = window.localStorage.getItem('blaze-tenant-branding');
      if (!storedBranding) return;
      const branding = JSON.parse(storedBranding);
      const root = document.documentElement;
      const readable = (hex) => {
        const value = String(hex || '').replace('#', '').trim();
        if (!/^[0-9a-fA-F]{6}$/.test(value)) return '#ffffff';
        const red = parseInt(value.slice(0, 2), 16);
        const green = parseInt(value.slice(2, 4), 16);
        const blue = parseInt(value.slice(4, 6), 16);
        const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
        return luminance > 0.62 ? '#0f172a' : '#ffffff';
      };
      if (branding.primaryColor) {
        root.style.setProperty('--primary', branding.primaryColor);
        root.style.setProperty('--primary-foreground', readable(branding.primaryColor));
      }
      if (branding.secondaryColor) {
        root.style.setProperty('--secondary', branding.secondaryColor);
        root.style.setProperty('--secondary-foreground', readable(branding.secondaryColor));
      }
      if (branding.accentColor) {
        root.style.setProperty('--accent', branding.accentColor);
        root.style.setProperty('--accent-foreground', readable(branding.accentColor));
        root.style.setProperty('--ring', branding.accentColor);
      }
    } catch {}
  })();
`;

const themeInitScript = `
  (() => {
    try {
      const storedTheme = window.localStorage.getItem('blaze-theme');
      const theme = storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {}
  })();
`;

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: brandingInitScript }} />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
