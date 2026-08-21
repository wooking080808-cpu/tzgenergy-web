import { setRequestLocale } from 'next-intl/server';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 prose prose-slate">
      <h1>Terms of Service</h1>
      <p>This is a template legal page. Please replace with your actual policy reviewed by legal counsel.</p>
    </div>
  );
}
