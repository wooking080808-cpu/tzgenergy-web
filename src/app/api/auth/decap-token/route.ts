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

function verifySession(cookie: string | undefined): { email: string } | null {
  if (!cookie) return null;
  const parts = cookie.split('|');
  if (parts.length !== 3) return null;
  const [email, expiresAtStr, signature] = parts;
  const expected = sign(`${email}|${expiresAtStr}`);
  if (signature !== expected) return null;
  if (Date.now() > parseInt(expiresAtStr, 10)) return null;
  return { email };
}

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get(SESSION_COOKIE)?.value;
  const session = verifySession(sessionCookie);
  if (!session || session.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const token = process.env.GITHUB_SERVER_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Server token not configured' }, { status: 500 });
  }

  return NextResponse.json({ token });
}
