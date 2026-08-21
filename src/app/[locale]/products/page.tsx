import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ProductCard } from '@/components/sections/ProductCard';

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('products');

  const products = [
    { slug: 'r5-residential', name: '5 kWh Residential LiFePO4 Battery', capacity: '5 kWh', segment: 'Residential', image: '/images/products/r5.jpg' },
    { slug: 'r10-residential', name: '10 kWh Residential Battery System', capacity: '10 kWh', segment: 'Residential', image: '/images/products/r10.jpg' },
    { slug: 'r15-residential', name: '15 kWh Stackable Home Battery', capacity: '15 kWh', segment: 'Residential', image: '/images/products/r15.jpg' },
    { slug: 'r20-residential', name: '20 kWh High-Voltage Home ESS', capacity: '20 kWh', segment: 'Residential', image: '/images/products/r20.jpg' },
    { slug: 'c100-commercial-cabinet', name: '100 kWh C&I Cabinet ESS', capacity: '100 kWh', segment: 'C&I', image: '/images/products/c100.jpg' },
    { slug: 'c215-commercial-cabinet', name: '215 kWh Commercial Cabinet', capacity: '215 kWh', segment: 'C&I', image: '/images/products/c215.jpg' },
    { slug: 'c372-commercial-cabinet', name: '372 kWh Commercial Cabinet', capacity: '372 kWh', segment: 'C&I', image: '/images/products/c372.jpg' },
    { slug: 'u1000-utility-container', name: '1 MWh Utility Container BESS', capacity: '1 MWh', segment: 'Utility', image: '/images/products/u1000.jpg' },
    { slug: 'u2000-utility-container', name: '2 MWh Utility Container BESS', capacity: '2 MWh', segment: 'Utility', image: '/images/products/u2000.jpg' },
    { slug: 'u6000-utility-container', name: '6 MWh Utility Container BESS', capacity: '6 MWh', segment: 'Utility', image: '/images/products/u6000.jpg' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">{t('title')}</h1>
        <p className="text-lg text-slate-600">{t('subtitle')}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {['All', 'Residential', 'C&I', 'Utility'].map((seg, i) => (
          <Link key={seg} href={seg === 'All' ? '/products' : `/products?segment=${seg.toLowerCase().replace('&','').replace(' ','-')}`}
            className={`px-4 py-2 rounded-full text-sm border transition ${i===0 ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-700 border-slate-300 hover:border-brand-600'}`}>
            {seg}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.slug} {...p} />)}
      </div>
    </div>
  );
}
