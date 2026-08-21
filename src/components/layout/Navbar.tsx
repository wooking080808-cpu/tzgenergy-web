'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRODUCTS = [
  { href: '/products?segment=residential', key: 'productsForHome' },
  { href: '/products?segment=commercial', key: 'productsForBusiness' },
  { href: '/products?segment=utility', key: 'productsForUtility' },
  { href: '/products', key: 'allProducts' },
];

const SOLUTIONS = [
  { href: '/solutions/residential-ess', key: 'residentialSolution' },
  { href: '/solutions/commercial-ess', key: 'commercialSolution' },
  { href: '/solutions/utility-ess', key: 'utilitySolution' },
  { href: '/solutions/microgrid', key: 'microgridSolution' },
  { href: '/solutions/solar-storage-charging', key: 'solarStorageCharging' },
];

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中' },
    { code: 'ru', label: 'RU' },
    { code: 'ar', label: 'ع' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-energy rounded-lg flex items-center justify-center text-white font-bold">TZG</div>
            <span className="text-lg font-bold tracking-tight">TZG<span className="text-brand-500">Energy</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink href="/" active={pathname === '/'}>{t('home')}</NavLink>
            <DropdownMenu
              label={t('products')}
              items={PRODUCTS.map(p => ({ ...p, label: t(p.key) }))}
              active={pathname.startsWith('/products')}
            />
            <DropdownMenu
              label={t('solutions')}
              items={SOLUTIONS.map(p => ({ ...p, label: t(p.key) }))}
              active={pathname.startsWith('/solutions')}
            />
            <NavLink href="/cases" active={pathname.startsWith('/cases')}>{t('cases')}</NavLink>
            <NavLink href="/about" active={pathname.startsWith('/about')}>{t('about')}</NavLink>
            <NavLink href="/blog" active={pathname.startsWith('/blog')}>{t('blog')}</NavLink>
            <NavLink href="/contact" active={pathname.startsWith('/contact')}>{t('contact')}</NavLink>
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-3">
            <LangSwitcher current={locale} langs={langs} />
            <Link href="/contact" className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-md text-sm font-medium transition">
              {tc('getQuote')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-2">
            <MobileLink href="/" onClick={() => setOpen(false)}>{t('home')}</MobileLink>
            <MobileLink href="/products" onClick={() => setOpen(false)}>{t('products')}</MobileLink>
            <MobileLink href="/solutions" onClick={() => setOpen(false)}>{t('solutions')}</MobileLink>
            <MobileLink href="/cases" onClick={() => setOpen(false)}>{t('cases')}</MobileLink>
            <MobileLink href="/about" onClick={() => setOpen(false)}>{t('about')}</MobileLink>
            <MobileLink href="/blog" onClick={() => setOpen(false)}>{t('blog')}</MobileLink>
            <MobileLink href="/contact" onClick={() => setOpen(false)}>{t('contact')}</MobileLink>
            <div className="pt-3 border-t flex gap-2">
              {langs.map(l => (
                <Link key={l.code} href={pathname} locale={l.code} className={cn("px-3 py-1 rounded text-sm border",
                  l.code === locale ? "bg-brand-600 text-white border-brand-600" : "border-slate-300")}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn(
      "px-3 py-2 text-sm font-medium rounded-md transition",
      active ? "text-brand-600 bg-brand-50" : "text-slate-700 hover:text-brand-600 hover:bg-slate-50"
    )}>{children}</Link>
  );
}

function DropdownMenu({ label, items, active }: { label: string; items: { href: string; label: string }[]; active: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={cn(
        "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition",
        active ? "text-brand-600 bg-brand-50" : "text-slate-700 hover:text-brand-600 hover:bg-slate-50"
      )}>
        {label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full start-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-lg py-2">
          {items.map(it => (
            <Link key={it.href} href={it.href} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-600">
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded">
      {children}
    </Link>
  );
}

function LangSwitcher({ current, langs }: { current: string; langs: { code: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-1 text-sm border border-slate-200 rounded-md p-1">
      <Globe size={14} className="text-slate-500 mx-1" />
      {langs.map(l => (
        <Link key={l.code} href={pathname} locale={l.code}
          className={cn("px-2 py-1 rounded text-xs font-medium transition",
            l.code === current ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-slate-100")}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}
