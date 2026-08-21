import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export function ProductCard({ slug, name, capacity, segment, image }: { slug: string; name: string; capacity: string; segment: string; image: string }) {
  return (
    <Link href={`/products/${slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-energy-500/10 flex items-center justify-center text-slate-400 text-sm">Image: {image}</div>
      </div>
      <div className="p-5">
        <div className="text-xs text-brand-600 font-semibold uppercase tracking-wider mb-2">{segment}</div>
        <h3 className="text-lg font-bold mb-1 group-hover:text-brand-600 transition">{name}</h3>
        <div className="text-sm text-slate-500 mb-3">Capacity: {capacity}</div>
        <div className="flex items-center gap-1 text-sm text-brand-600 font-medium">
          View details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
        </div>
      </div>
    </Link>
  );
}
