import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.tzgenergy.com' },
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
} as any;

export default withNextIntl(nextConfig);
