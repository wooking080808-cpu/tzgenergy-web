import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tzgenergy.com';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${SITE_URL}/admin/#/error=${encodeURIComponent(error)}`, 302);
  }
  if (!code) {
    return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.json(
        { error: 'GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET not configured' },
        { status: 500 }
    );
  }

  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/oauth/callback`;

  // 用 code 换 access_token
  const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri }),
  });

  if (!tokenResponse.ok) {
    return NextResponse.json(
        { error: 'Token exchange failed', status: tokenResponse.status },
        { status: 502 }
    );
  }

  const tokenData = await tokenResponse.json();
  if (tokenData.error) {
    return NextResponse.redirect(
        `${SITE_URL}/admin/#/error=${encodeURIComponent(tokenData.error)}`,
        302
    );
  }

  const accessToken = tokenData.access_token;
  if (!accessToken) {
    return NextResponse.json({ error: 'No access_token in response', body: tokenData }, { status: 502 });
  }

  // 跳回 Decap CMS,token 放在 URL fragment(# 后)
  // Decap 期望的格式: {site_url}/admin/#/access_token=<token>
  return NextResponse.redirect(`${SITE_URL}/admin/#/access_token=${accessToken}`, 302);
}
