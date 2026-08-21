import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Mail, MapPin, Phone } from 'lucide-react';
import { LinkedinIcon, YoutubeIcon, FacebookIcon } from '@/components/icons/SocialIcons';

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const tc = useTranslations('common');
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gradient-energy rounded-lg flex items-center justify-center text-white font-bold">TZG</div>
            <span className="text-lg font-bold text-white">TZG<span className="text-energy-500">Energy</span></span>
          </div>
          <p className="text-sm text-slate-400 mb-4 max-w-xs">{t('tagline')}</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0"/> <span>Industrial Park, [City], China</span></div>
            <div className="flex items-center gap-2"><Mail size={14}/> <a href="mailto:sales@tzgenergy.com" className="hover:text-white">sales@tzgenergy.com</a></div>
            <div className="flex items-center gap-2"><Phone size={14}/> <span>+86 [XXX-XXXX-XXXX]</span></div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h5 className="text-white font-semibold mb-3 text-sm">{tn('products')}</h5>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products?segment=residential" className="hover:text-white">{tn('productsForHome')}</Link></li>
            <li><Link href="/products?segment=commercial" className="hover:text-white">{tn('productsForBusiness')}</Link></li>
            <li><Link href="/products?segment=utility" className="hover:text-white">{tn('productsForUtility')}</Link></li>
            <li><Link href="/products" className="hover:text-white">{tn('allProducts')}</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 className="text-white font-semibold mb-3 text-sm">{tn('about')}</h5>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">{tn('companyProfile')}</Link></li>
            <li><Link href="/about/factory" className="hover:text-white">{tn('factory')}</Link></li>
            <li><Link href="/about/certifications" className="hover:text-white">{tn('certifications')}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{tn('contact')}</Link></li>
            <li><Link href="/become-partner" className="hover:text-white">{tn('becomePartner')}</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="text-white font-semibold mb-3 text-sm">{tn('resources')}</h5>
          <ul className="space-y-2 text-sm">
            <li><Link href="/blog" className="hover:text-white">{tn('blog')}</Link></li>
            <li><Link href="/downloads" className="hover:text-white">{tn('downloads')}</Link></li>
            <li><Link href="/faq" className="hover:text-white">{tn('faq')}</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>
      </div>

      {/* Newsletter + social */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-400">{t('rights')} © {year} TZG Energy. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white"><LinkedinIcon size={18}/></a>
            <a href="https://youtube.com" aria-label="YouTube" className="hover:text-white"><YoutubeIcon size={18}/></a>
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white"><FacebookIcon size={18}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
