import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
   typedRoutes: true,
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    process.env.NODE_ENV === 'development' ? '*:*' : ''
  ].filter(Boolean),
};

export default withNextIntl(nextConfig);
