import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Zap, Building2, ArrowRight } from 'lucide-react';

const CASE_DATA: Record<string, any> = {
  'germany-50mwh-utility': {
    title: '50 MWh Utility BESS Project in Germany',
    country: 'Germany',
    industry: 'Utility',
    capacity: '50 MWh',
    year: '2024',
    challenge: 'A leading German utility required a large battery storage system to provide grid services including frequency regulation, peak shaving, and renewable integration support.',
    solution: 'TZG delivered 25 units of 2 MWh containerized BESS, fully integrated with the utility SCADA system. The solution includes advanced cooling systems optimized for European climate conditions.',
    result: 'The system has been operating at 96% round-trip efficiency since commissioning, providing critical grid services and reducing curtailment of nearby wind farms by 30%.',
    testimonial: 'TZG delivered a reliable, high-performance BESS solution on schedule. Their engineering support during commissioning was excellent.',
    images: ['/images/cases/germany-1.jpg', '/images/cases/germany-2.jpg'],
  },
  'saudi-arabia-10mwh-solar-storage': {
    title: '10 MWh Solar+Storage Plant in Saudi Arabia',
    country: 'Saudi Arabia',
    industry: 'Solar+Storage',
    capacity: '10 MWh',
    year: '2024',
    challenge: 'A Saudi solar developer needed to add storage to an existing 50 MW PV plant to enable firm dispatch during evening peak.',
    solution: 'TZG supplied 5 units of 2 MWh containers with liquid thermal management rated for 55°C ambient temperature, paired with our hybrid PCS.',
    result: 'Successfully shifted 70% of daytime solar generation to evening hours, increasing plant revenue by 28%.',
    testimonial: 'The systems have performed exceptionally in extreme heat, exceeding our expectations for reliability.',
    images: [],
  },
  'russia-2mwh-factory': {
    title: '2 MWh Factory Backup System in Russia',
    country: 'Russia',
    industry: 'C&I',
    capacity: '2 MWh',
    year: '2024',
    challenge: 'A manufacturing facility in Siberia needed reliable backup power for continuous production during harsh winters with frequent grid outages.',
    solution: 'TZG deployed 10 units of 215 kWh commercial cabinets with cold-weather heating packages, integrated with the factory EMS.',
    result: 'Zero production downtime during the 2024 winter season, with seamless automatic switchover during 12+ grid outage events.',
    testimonial: 'Reliable backup power has transformed our operations — no more lost production to grid instability.',
    images: [],
  },
};

export default async function CaseDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('cases');
  const caseData = CASE_DATA[slug];
  if (!caseData) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-slate-500 mb-6 flex gap-2">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link href="/cases" className="hover:text-brand-600">{t('title')}</Link>
        <span>/</span>
        <span className="text-slate-700">{caseData.title}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{caseData.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5"><MapPin size={14}/> {caseData.country}</span>
          <span className="flex items-center gap-1.5"><Building2 size={14}/> {caseData.industry}</span>
          <span className="flex items-center gap-1.5"><Zap size={14}/> {caseData.capacity}</span>
          <span className="flex items-center gap-1.5"><Calendar size={14}/> {caseData.year}</span>
        </div>
      </div>

      <div className="aspect-video bg-gradient-to-br from-brand-100 to-energy-500/20 rounded-2xl mb-12 flex items-center justify-center text-slate-400">Cover Image</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-3">{t('challenge')}</h2>
            <p className="text-slate-700 leading-relaxed">{caseData.challenge}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-3">{t('solution')}</h2>
            <p className="text-slate-700 leading-relaxed">{caseData.result}</p>
          </section>
          <section className="bg-brand-50 border-s-4 border-brand-600 p-6 rounded-e-xl">
            <h2 className="text-xl font-bold mb-3">{t('clientTestimonial')}</h2>
            <blockquote className="text-slate-700 italic">&ldquo;{caseData.testimonial}&rdquo;</blockquote>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="font-bold mb-3">Project Highlights</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Country:</strong> {caseData.country}</li>
              <li><strong>Industry:</strong> {caseData.industry}</li>
              <li><strong>Capacity:</strong> {caseData.capacity}</li>
              <li><strong>Year:</strong> {caseData.year}</li>
            </ul>
          </div>
          <Link href="/contact" className="block w-full text-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-md font-semibold transition">
            Request Similar Project <ArrowRight size={16} className="inline ms-1"/>
          </Link>
        </aside>
      </div>
    </div>
  );
}
