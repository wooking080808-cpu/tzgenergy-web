import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { MapPin, Calendar, Zap } from 'lucide-react';

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('cases');

  const cases = [
    { slug: 'germany-50mwh-utility', title: '50 MWh Utility BESS Project', country: 'Germany', industry: 'Utility', capacity: '50 MWh', year: '2024', image: '/images/cases/germany-utility.jpg' },
    { slug: 'saudi-arabia-10mwh-solar-storage', title: '10 MWh Solar+Storage Plant', country: 'Saudi Arabia', industry: 'Solar+Storage', capacity: '10 MWh', year: '2024', image: '/images/cases/saudi-solar.jpg' },
    { slug: 'russia-2mwh-factory', title: '2 MWh Factory Backup System', country: 'Russia', industry: 'C&I', capacity: '2 MWh', year: '2024', image: '/images/cases/russia-factory.jpg' },
    { slug: 'kenya-500kwh-mall', title: '500 kWh Shopping Mall C&I ESS', country: 'Kenya', industry: 'Commercial', capacity: '500 kWh', year: '2023', image: '/images/cases/kenya-mall.jpg' },
    { slug: 'uae-1mwh-villa-community', title: '1 MWh Villa Community ESS', country: 'UAE', industry: 'Residential', capacity: '1 MWh', year: '2023', image: '/images/cases/uae-villa.jpg' },
    { slug: 'australia-100kwh-farm', title: '100 kWh Farm Off-grid System', country: 'Australia', industry: 'Off-grid', capacity: '100 kWh', year: '2023', image: '/images/cases/australia-farm.jpg' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">{t('title')}</h1>
        <p className="text-lg text-slate-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map(c => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition">
            <div className="aspect-[4/3] bg-gradient-to-br from-brand-100 to-energy-500/20 relative">
              <div className="absolute top-3 end-3 px-2 py-1 bg-white/90 backdrop-blur rounded text-xs font-medium">{c.industry}</div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold mb-2 group-hover:text-brand-600 transition">{c.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin size={12}/> {c.country}</span>
                <span className="flex items-center gap-1"><Zap size={12}/> {c.capacity}</span>
                <span className="flex items-center gap-1"><Calendar size={12}/> {c.year}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
