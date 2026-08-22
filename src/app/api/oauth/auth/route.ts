import { NextRequest, NextResponse } from 'next/server';

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const SCOPES = ['repo'].join(' ');

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
        { error: 'GITHUB_CLIENT_ID not configured. Set it in Vercel env.' },
        { status: 500 }
    );
  }

  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/oauth/callback`;

  const authUrl = new URL(GITHUB_AUTHORIZE_URL);
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', SCOPES);
  authUrl.searchParams.set('allow_signup', 'false');

  return NextResponse.redirect(authUrl.toString(), 302);
}
