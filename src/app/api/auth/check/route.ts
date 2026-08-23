import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const SESSION_COOKIE = 'tzg_session';
const ADMIN_EMAIL = 'admin@tzgenergy.com';

function getSecret(): string {
  return process.env.AUTH_SECRET || 'dev-only-secret-do-not-use-in-prod';
}

function sign(value: string): string {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url');
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
