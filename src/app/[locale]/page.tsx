import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowRight, Battery, Shield, Zap, Globe2, Award, Truck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ProductCard } from '@/components/sections/ProductCard';
import { SolutionCard } from '@/components/sections/SolutionCard';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await (await import('next-intl/server')).getTranslations('home');
  const tp = await (await import('next-intl/server')).getTranslations('products');
  const tc = await (await import('next-intl/server')).getTranslations('common');

  const featuredProducts = [
    { slug: 'r10-residential', name: tp('heroR10'), capacity: '10 kWh', segment: 'Residential', image: '/images/products/r10.jpg' },
    { slug: 'c100-commercial-cabinet', name: tp('heroC100'), capacity: '100 kWh', segment: 'C&I', image: '/images/products/c100.jpg' },
    { slug: 'u2000-utility-container', name: tp('heroU2000'), capacity: '2 MWh', segment: 'Utility', image: '/images/products/u2000.jpg' },
  ];

  const solutions = [
    { slug: 'residential-ess', title: t('residentialSolution'), desc: 'Reliable home battery storage with backup power.', image: '/images/solutions/residential.jpg' },
    { slug: 'commercial-ess', title: t('commercialSolution'), desc: 'Cut peak demand and ensure power continuity.', image: '/images/solutions/commercial.jpg' },
    { slug: 'utility-ess', title: t('utilitySolution'), desc: 'MW-scale containerized BESS for grid services.', image: '/images/solutions/utility.jpg' },
    { slug: 'microgrid', title: t('microgridSolution'), desc: 'Off-grid and hybrid microgrid systems.', image: '/images/solutions/microgrid.jpg' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-energy text-white">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm mb-6 border border-white/20">
              <Zap size={14} className="text-energy-500" />
              <span>Premium LiFePO4 Energy Storage</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-3">{t('heroSubtitle')}</p>
            <p className="text-base text-white/70 mb-8 max-w-2xl">{t('heroDesc')}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/products" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-700 hover:bg-slate-50 rounded-md font-semibold transition">
                {tc('learnMore')} <ArrowRight size={18}/>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 rounded-md font-semibold transition">
                {tc('getQuote')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '10+', label: t('metricsYears'), icon: Award },
            { num: '50+', label: t('metricsCountries'), icon: Globe2 },
            { num: '500+', label: t('metricsShipped'), icon: Battery },
            { num: '20+', label: t('metricsCertifications'), icon: Shield },
          ].map((m, i) => (
            <div key={i} className="text-center">
              <m.icon className="mx-auto mb-2 text-brand-600" size={28} />
              <div className="text-3xl font-bold text-slate-900">{m.num}</div>
              <div className="text-sm text-slate-600 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t('sectionFeaturedProducts')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">From 10 kWh home batteries to MW-scale utility containers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map(p => <ProductCard key={p.slug} {...p} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all">
              View all products <ChevronRight size={18}/>
            </Link>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t('sectionSolutions')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">End-to-end systems tailored to your application.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map(s => <SolutionCard key={s.slug} {...s} />)}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t('sectionWhyChooseUs')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Premium Quality', desc: 'A-grade LiFePO4 cells with 6000+ cycle life and 10-year warranty.' },
              { icon: Zap, title: 'High Performance', desc: 'Up to 95% round-trip efficiency with advanced BMS and thermal management.' },
              { icon: Truck, title: 'Global Logistics', desc: 'Fast delivery to 50+ countries with CE/IEC/UN38.3 certifications.' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="text-brand-600" size={24}/>
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-energy text-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('sectionCta')}</h2>
          <p className="text-lg text-white/80 mb-8">{t('sectionCtaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-700 hover:bg-slate-50 rounded-md font-semibold transition">
              {tc('getQuote')} <ArrowRight size={18}/>
            </Link>
            <a href="https://wa.me/?text=Hi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1ebe5b] rounded-md font-semibold transition">
              {tc('whatsappUs')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
