import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Download, Award, MessageCircle } from 'lucide-react';

const PRODUCT_DATA: Record<string, any> = {
  'r10-residential': {
    name: '10 kWh Residential LiFePO4 Battery Storage System',
    capacity: '10 kWh',
    segment: 'Residential',
    specs: [
      { label: 'Nominal Capacity', value: '10 kWh' },
      { label: 'Nominal Voltage', value: '51.2 V' },
      { label: 'Chemistry', value: 'LiFePO4' },
      { label: 'Cycle Life', value: '6,000+ @ 80% DoD' },
      { label: 'Max Discharge', value: '200 A' },
      { label: 'Operating Temp', value: '-10°C to 55°C' },
      { label: 'Protection', value: 'IP65' },
      { label: 'Dimensions', value: '442×680×220 mm' },
      { label: 'Weight', value: '95 kg' },
    ],
    highlights: ['A-grade LiFePO4 cells', 'Built-in BMS with multi-protection', 'Wide inverter compatibility', '10-year warranty', 'Easy wall-mount installation'],
    description: 'The 10 kWh Residential Battery is engineered for homeowners seeking reliable backup power and maximum solar self-consumption. Featuring premium A-grade LiFePO4 cells, advanced BMS protection, and seamless integration with leading inverter brands.',
    applications: ['Solar self-consumption', 'Backup power', 'Off-grid homes', 'Time-of-use optimization'],
    inverters: ['Sungrow', 'Growatt', 'Solis', 'Goodwe', 'Victron', 'Deye', 'SMA'],
    certs: ['CE', 'IEC62619', 'UN38.3', 'MSDS', 'UL1973'],
  },
};

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('products');
  const product = PRODUCT_DATA[slug];
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-slate-500 mb-6 flex gap-2">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-600">{t('title')}</Link>
        <span>/</span>
        <span className="text-slate-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">Product Hero</div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-slate-100 rounded-lg"/>)}
          </div>
        </div>

        <div>
          <div className="text-sm text-brand-600 font-semibold uppercase tracking-wider mb-2">{product.segment}</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-slate-600 mb-6">{product.description}</p>

          <ul className="space-y-2 mb-6">
            {product.highlights.map((h: string, i: number) => (
              <li key={i} className="flex items-start gap-2"><Check className="text-energy-500 shrink-0 mt-0.5" size={18}/> <span className="text-sm">{h}</span></li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link href="/contact" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-md font-semibold transition">
              {t('requestQuote')} <ArrowRight size={18}/>
            </Link>
            <a href={`https://wa.me/?text=${encodeURIComponent('Hi, I am interested in ' + product.name)}`} target="_blank" rel="noopener noreferrer"
               className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-md font-semibold transition">
              <MessageCircle size={18}/> WhatsApp
            </a>
          </div>

          <a href="/downloads/r10-datasheet.pdf" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 text-sm font-medium">
            <Download size={16}/> {t('datasheet')}
          </a>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">{t('keySpecs')}</h2>
        <div className="bg-slate-50 rounded-xl overflow-hidden">
          <table className="w-full">
            <tbody>
              {product.specs.map((s: any, i: number) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-6 py-3 text-sm font-medium text-slate-700 w-1/3">{s.label}</td>
                  <td className="px-6 py-3 text-sm text-slate-900">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">{t('applications')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {product.applications.map((a: string, i: number) => (
            <div key={i} className="bg-brand-50 rounded-lg p-4 text-center text-sm font-medium text-brand-700">{a}</div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">{t('compatibleInverters')}</h2>
        <div className="flex flex-wrap gap-2">
          {product.inverters.map((i: string) => <span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-sm">{i}</span>)}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">{t('certifications')}</h2>
        <div className="flex flex-wrap gap-2">
          {product.certs.map((c: string) => <span key={c} className="inline-flex items-center gap-1 px-3 py-1 bg-energy-500/10 text-energy-600 rounded-full text-sm font-medium"><Award size={14}/>{c}</span>)}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        brand: { '@type': 'Brand', name: 'TZG Energy' },
        category: product.segment,
      })}} />
    </div>
  );
}
