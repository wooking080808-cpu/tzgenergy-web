import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'tzg_session';
const OTP_COOKIE = 'tzg_otp';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  res.cookies.set(OTP_COOKIE, '', { path: '/api/auth', maxAge: 0 });
  return res;
}

export async function GET() {
  const res = NextResponse.redirect(new URL('/admin/login.html', 'https://tzgenergy.com'));
  res.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  res.cookies.set(OTP_COOKIE, '', { path: '/api/auth', maxAge: 0 });
  return res;
}
