import { setRequestLocale } from 'next-intl/server';
import { Award, Factory, Lightbulb, Globe2, ShieldCheck, Users } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('about');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-slate-600">{t('subtitle')}</p>
      </div>

      {/* Mission / Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-brand-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3 text-brand-700">{t('mission')}</h2>
          <p className="text-slate-700 leading-relaxed">To accelerate the global transition to clean energy by delivering reliable, premium-quality energy storage systems that empower homes, businesses, and utilities to achieve energy independence.</p>
        </div>
        <div className="bg-energy-500/5 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3 text-energy-600">{t('vision')}</h2>
          <p className="text-slate-700 leading-relaxed">To become the world's most trusted BESS brand — recognized for engineering excellence, manufacturing precision, and unwavering commitment to customer success.</p>
        </div>
      </div>

      {/* Factory */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-slate-400">Factory Photo</div>
          <div>
            <Factory className="text-brand-600 mb-3" size={32}/>
              <h2 className="text-3xl font-bold mb-3">{t('factoryIntro')}</h2>
              <p className="text-slate-700 leading-relaxed">{t('factoryDesc')}</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="text-energy-500">✓</span> 30,000+ m² modern facility</li>
                <li className="flex items-center gap-2"><span className="text-energy-500">✓</span> 5 GWh annual production capacity</li>
                <li className="flex items-center gap-2"><span className="text-energy-500">✓</span> ISO 9001, ISO 14001 certified</li>
                <li className="flex items-center gap-2"><span className="text-energy-500">✓</span> Automated production lines</li>
              </ul>
            </div>
          </div>
      </section>

      {/* R&D */}
      <section className="mb-16 bg-slate-50 rounded-2xl p-8 md:p-12">
        <Lightbulb className="text-brand-600 mb-3" size={32}/>
        <h2 className="text-3xl font-bold mb-3">{t('rdIntro')}</h2>
        <p className="text-slate-700 leading-relaxed max-w-3xl">{t('rdDesc')}</p>
      </section>

      {/* Values grid */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">{t('values')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, title: 'Quality First', desc: 'Premium materials, rigorous QC' },
            { icon: ShieldCheck, title: 'Safety Always', desc: 'Multi-layer protection systems' },
            { icon: Users, title: 'Customer Centric', desc: '24/7 global support' },
            { icon: Globe2, title: 'Global Reach', desc: 'Serving 50+ countries' },
          ].map((v, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:border-brand-600 transition">
              <v.icon className="mx-auto mb-3 text-brand-600" size={32}/>
              <h3 className="font-bold mb-1">{v.title}</h3>
              <p className="text-sm text-slate-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
