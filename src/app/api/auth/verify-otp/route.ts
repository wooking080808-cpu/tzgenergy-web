import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ADMIN_EMAIL = 'admin@tzgenergy.com';
const OTP_COOKIE = 'tzg_otp';
const SESSION_COOKIE = 'tzg_session';
const SESSION_TTL_S = 7 * 24 * 60 * 60; // 7 days

function getSecret(): string {
  return process.env.AUTH_SECRET || 'dev-only-secret-do-not-use-in-prod';
}

function sign(value: string): string {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url');
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = (body?.email || '').toString().trim().toLowerCase();
  const code = (body?.code || '').toString().trim();
  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Email not allowed' }, { status: 403 });
  }
  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: 'Invalid code format' }, { status: 400 });
  }

  const otpCookie = req.cookies.get(OTP_COOKIE)?.value;
  if (!otpCookie) {
    return NextResponse.json({ error: 'No code requested or expired' }, { status: 401 });
  }

  const parts = otpCookie.split('|');
  if (parts.length !== 2) {
    return NextResponse.json({ error: 'Bad code state' }, { status: 401 });
  }
  const [storedCode, expiresAtStr] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);

  if (!storedCode || !expiresAt || Date.now() > expiresAt) {
    return NextResponse.json({ error: 'Code expired' }, { status: 401 });
  }
  if (code !== storedCode) {
    return NextResponse.json({ error: 'Wrong code' }, { status: 401 });
  }

  // Issue signed session cookie
  const expiry = Date.now() + SESSION_TTL_S * 1000;
  const sessionPayload = `${ADMIN_EMAIL}|${expiry}`;
  const signature = sign(sessionPayload);
  const sessionValue = `${sessionPayload}|${signature}`;

  const res = NextResponse.json({ ok: true, email: ADMIN_EMAIL });
  // Clear OTP cookie (single-use)
  res.cookies.set(OTP_COOKIE, '', { path: '/api/auth', maxAge: 0 });
  // Set session cookie (path=/ so it's sent on /admin/* too)
  res.cookies.set(SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_S,
  });
  return res;
}

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const parts = sessionCookie.split('|');
  if (parts.length !== 3) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const [email, expiresAtStr, signature] = parts;
  const expected = sign(`${email}|${expiresAtStr}`);
  if (signature !== expected) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  if (Date.now() > parseInt(expiresAtStr, 10)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, email });
}
