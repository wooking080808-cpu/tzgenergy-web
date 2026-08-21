import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { YandexMetrica } from "@/components/seo/YandexMetrica";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 每个语种的地区代码 + locale 元数据（用于 SEO + OG）
const LOCALE_META: Record<string, { ogLocale: string; htmlLang: string; hrefLangCode: string }> = {
  en: { ogLocale: 'en_US', htmlLang: 'en', hrefLangCode: 'en' },
  zh: { ogLocale: 'zh_CN', htmlLang: 'zh-CN', hrefLangCode: 'zh-CN' },
  ru: { ogLocale: 'ru_RU', htmlLang: 'ru-RU', hrefLangCode: 'ru-RU' },
  ar: { ogLocale: 'ar_SA', htmlLang: 'ar-SA', hrefLangCode: 'ar-SA' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = LOCALE_META[locale] || LOCALE_META.en;

  // 为每个语种生成地区定向 hreflang（对 Yandex 友好）
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[LOCALE_META[l].hrefLangCode] = `/${l}`;
  }
  languages['x-default'] = '/en';

  // 地区特定的 SEO 元数据
  const geoMeta: Record<string, Metadata['other']> = {
    ru: {
      'geo.region': 'RU',
      'geo.placename': 'Moscow, Russia',
      'yandex-verification': process.env.YANDEX_VERIFICATION_TOKEN || '',
    },
    en: {
      'geo.region': 'US,GB,DE,AE',
      'geo.placename': 'Global',
    },
    zh: {
      'geo.region': 'CN',
      'geo.placename': 'Shenzhen, China',
    },
    ar: {
      'geo.region': 'SA,AE,EG',
      'geo.placename': 'Riyadh, Saudi Arabia',
    },
  };

  return {
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: { locale: meta.ogLocale },
    other: geoMeta[locale],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const meta = LOCALE_META[locale] || LOCALE_META.en;

  return (
    <html lang={meta.htmlLang} dir={dir} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
          <WhatsAppFloat />
          <YandexMetrica />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
