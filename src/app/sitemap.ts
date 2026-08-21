import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

// 每个 locale 对应的 hreflang 值（Yandex/Google 都认地区代码）
const LOCALE_HREFLANG: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
  ru: 'ru-RU',
  ar: 'ar-SA',
};

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
            locales.map(l => [LOCALE_HREFLANG[l], `${baseUrl}/${l}${route}`])
          ),
        },
      });
    }
  }

  return items;
}
