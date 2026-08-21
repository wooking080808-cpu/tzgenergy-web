import { setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/sections/ContactForm';
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('contact');

  // 占位 - 替换为真实联系方式
  const WHATSAPP = '+86XXXXXXXXXX';
  const PHONE = '+86-XXX-XXXX-XXXX';
  const EMAIL = 'sales@tzgenergy.com';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">{t('title')}</h1>
        <p className="text-lg text-slate-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info column */}
        <aside className="space-y-4">
          <a href={`https://wa.me/${WHATSAPP.replace(/[^\d]/g,'')}`} target="_blank" rel="noopener noreferrer"
             className="block bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-xl p-6 transition">
            <MessageCircle className="mb-2" size={28}/>
            <div className="font-bold text-lg">{t('info.whatsapp')}</div>
            <div className="text-sm opacity-90">Chat now →</div>
          </a>
          <div className="bg-slate-50 rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="text-brand-600 mt-0.5" size={20}/>
              <div>
                <div className="text-sm text-slate-500">{t('info.salesEmail')}</div>
                <a href={`mailto:${EMAIL}`} className="font-medium text-slate-900 hover:text-brand-600">{EMAIL}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-brand-600 mt-0.5" size={20}/>
              <div>
                <div className="text-sm text-slate-500">{t('info.phone')}</div>
                <div className="font-medium text-slate-900">{PHONE}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-brand-600 mt-0.5" size={20}/>
              <div>
                <div className="text-sm text-slate-500">{t('info.address')}</div>
                <div className="font-medium text-slate-900">Industrial Park, [City], China</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="text-brand-600 mt-0.5" size={20}/>
              <div>
                <div className="text-sm text-slate-500">{t('info.hours')}</div>
                <div className="font-medium text-slate-900">Mon–Fri, 9:00–18:00 (UTC+8)</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-2">
          <ContactForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
