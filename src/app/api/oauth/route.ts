import { NextRequest, NextResponse } from 'next/server';

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const SCOPES_DEFAULT = 'repo';

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
        { error: 'GITHUB_CLIENT_ID not configured. Set it in Vercel env.' },
        { status: 500 }
    );
  }

  const url = req.nextUrl;
  const provider = url.searchParams.get('provider') || 'github';
  const siteId = url.searchParams.get('site_id') || '';
  const scope = url.searchParams.get('scope') || SCOPES_DEFAULT;

  if (provider !== 'github') {
    return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
  }

  const origin = url.origin;
  const redirectUri = `${origin}/api/oauth/callback`;

  const authUrl = new URL(GITHUB_AUTHORIZE_URL);
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', scope);
  authUrl.searchParams.set('allow_signup', 'false');
  // site_id 当 state 用,回调时知道把用户带回哪里
  authUrl.searchParams.set('state', siteId);

  return NextResponse.redirect(authUrl.toString(), 302);
}
