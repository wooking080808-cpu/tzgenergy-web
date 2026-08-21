import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tzgenergy.com';
  const locales = routing.locales;

  // 静态路由
  const routes = ['', '/products', '/solutions', '/cases', '/about', '/blog', '/contact', '/become-partner', '/downloads', '/faq', '/privacy', '/terms'];

  const items: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      items.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/products' || route === '/solutions' ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    }
  }

  return items;
}
