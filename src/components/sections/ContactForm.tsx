'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [data, setData] = useState({
    name: '', company: '', country: '', phone: '', email: '',
    product: '', projectType: 'commercial', projectSize: '', message: '', consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.consent) { alert('Please accept the privacy policy'); return; }
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setData({ name: '', company: '', country: '', phone: '', email: '', product: '', projectType: 'commercial', projectSize: '', message: '', consent: false });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-energy-500/10 border border-energy-500/30 rounded-2xl p-12 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-energy-500" size={56}/>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-slate-700">{t('success')}</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-brand-600 hover:underline">Send another inquiry →</button>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition";

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('name')} *</label>
          <input required type="text" className={inputCls} value={data.name} onChange={e => setData({...data, name: e.target.value})}/>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('company')} *</label>
          <input required type="text" className={inputCls} value={data.company} onChange={e => setData({...data, company: e.target.value})}/>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('country')} *</label>
          <input required type="text" className={inputCls} value={data.country} onChange={e => setData({...data, country: e.target.value})}/>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('phone')} *</label>
          <input required type="tel" className={inputCls} value={data.phone} onChange={e => setData({...data, phone: e.target.value})}/>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5">{t('email')} *</label>
          <input required type="email" className={inputCls} value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('product')}</label>
          <select className={inputCls} value={data.product} onChange={e => setData({...data, product: e.target.value})}>
            <option value="">-- Select --</option>
            <option value="residential">Residential ESS (5–20 kWh)</option>
            <option value="commercial">C&I ESS (100–500 kWh)</option>
            <option value="utility">Utility ESS (1–6 MWh)</option>
            <option value="microgrid">Microgrid / Off-grid</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('projectType')}</label>
          <select className={inputCls} value={data.projectType} onChange={e => setData({...data, projectType: e.target.value})}>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial / Industrial</option>
            <option value="utility">Utility</option>
            <option value="distributor">Distributor / Partner</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5">{t('projectSize')}</label>
          <input type="text" className={inputCls} placeholder="e.g., 500 kWh / 5 MWh" value={data.projectSize} onChange={e => setData({...data, projectSize: e.target.value})}/>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5">{t('message')}</label>
          <textarea rows={4} className={inputCls} value={data.message} onChange={e => setData({...data, message: e.target.value})}/>
        </div>
      </div>

      <label className="flex items-start gap-2 mb-6 text-sm text-slate-700">
        <input required type="checkbox" checked={data.consent} onChange={e => setData({...data, consent: e.target.checked})} className="mt-1"/>
        <span>{t('consent')}</span>
      </label>

      {status === 'error' && (
        <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0"/>
          <span>{t('error')}</span>
        </div>
      )}

      <button type="submit" disabled={status === 'submitting'}
        className="w-full px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white rounded-md font-semibold transition flex items-center justify-center gap-2">
        {status === 'submitting' ? <><Loader2 size={18} className="animate-spin"/> {t('submitting')}</> : t('submit')}
      </button>
    </form>
  );
}
