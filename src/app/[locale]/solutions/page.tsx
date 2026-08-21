import { setRequestLocale } from 'next-intl/server';
import { SolutionCard } from '@/components/sections/SolutionCard';

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('solutions');

  const solutions = [
    { slug: 'residential-ess', title: 'Residential ESS Solution', desc: 'Complete home battery system with solar integration and backup power.', image: '/images/solutions/residential.jpg' },
    { slug: 'commercial-ess', title: 'C&I ESS Solution', desc: 'Cut peak demand charges and ensure power continuity for businesses.', image: '/images/solutions/commercial.jpg' },
    { slug: 'utility-ess', title: 'Utility-Scale ESS Solution', desc: 'MW-scale containerized battery systems for grid services and renewable integration.', image: '/images/solutions/utility.jpg' },
    { slug: 'microgrid', title: 'Microgrid & Off-grid Solution', desc: 'Hybrid microgrid systems combining solar, wind, diesel, and storage.', image: '/images/solutions/microgrid.jpg' },
    { slug: 'solar-storage-charging', title: 'Solar + Storage + EV Charging', desc: 'Integrated PV-ESS-EV charging solutions for commercial sites.', image: '/images/solutions/solar-storage-charging.jpg' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">{t('title')}</h1>
        <p className="text-lg text-slate-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map(s => <SolutionCard key={s.slug} {...s} />)}
      </div>
    </div>
  );
}
