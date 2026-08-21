import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
      <p className="text-xl text-slate-700 mb-6">Page not found</p>
      <Link href="/en" className="px-6 py-3 bg-brand-600 text-white rounded-md hover:bg-brand-700">Go Home</Link>
    </div>
  );
}
