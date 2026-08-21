# TZG Energy Website

Premium energy storage systems export website. Multilingual (English / Russian / Arabic), SEO-optimized, with built-in CMS.

## Tech Stack
- **Next.js 16** (App Router) + React 19
- **Tailwind CSS v4** + shadcn-style components
- **next-intl** for i18n (path-based /en /ru /ar with RTL Arabic)
- **Decap CMS** at /admin (Git-based visual editor)
- **Resend** for email, **企业微信群机器人** for instant alerts
- **Vercel** deployment + **Cloudflare** DNS/CDN

## Quick Start
```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Production build
```

Visit `/admin` for the visual CMS (uses local backend in dev).

## Project Structure
- `src/app/[locale]/` — Localized routes (en/ru/ar)
- `src/components/` — Reusable UI components
- `messages/` — i18n JSON files
- `public/admin/` — Decap CMS interface
- `content/` — MDX content (products, blog, cases) — populated via CMS

## Environment Variables
Copy `.env.example` to `.env.local` and fill in:
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `SALES_EMAIL`
- `WECHAT_WEBHOOK_URL` (企业微信群机器人)
- `NEXT_PUBLIC_WHATSAPP_PHONE`
- `NEXT_PUBLIC_YANDEX_METRICA_ID`

## Deployment
Auto-deploys via Vercel on `main` branch push.
