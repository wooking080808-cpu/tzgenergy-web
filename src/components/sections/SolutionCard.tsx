import { Link } from '@/i18n/routing';

export function SolutionCard({ slug, title, desc, image }: { slug: string; title: string; desc: string; image: string }) {
  return (
    <Link href={`/solutions/${slug}`} className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-brand-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative h-full p-6 flex flex-col justify-end text-white">
        <div className="text-xs text-energy-500 font-semibold uppercase tracking-wider mb-2">Solution</div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-energy-500 transition">{title}</h3>
        <p className="text-sm text-white/70 line-clamp-3">{desc}</p>
      </div>
    </Link>
  );
}
