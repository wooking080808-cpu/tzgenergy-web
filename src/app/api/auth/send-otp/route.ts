import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ADMIN_EMAIL = 'admin@tzgenergy.com';
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const OTP_COOKIE = 'tzg_otp';

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = (body?.email || '').toString().trim().toLowerCase();
  if (email !== ADMIN_EMAIL) {
    // Don't leak whether email exists
    return NextResponse.json({ ok: true, message: 'If the address is allowed, a code was sent.' });
  }

  // 6-digit numeric code
  const code = String(Math.floor(100000 + crypto.randomInt(0, 900000)));
  const expiresAt = Date.now() + OTP_TTL_MS;
  const cookieValue = `${code}|${expiresAt}`;

  // Send via Resend
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'TZG Energy <noreply@tzgenergy.com>';

  if (!apiKey) {
    console.error('[send-otp] RESEND_API_KEY not configured');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  const htmlBody = `<!DOCTYPE html>
<html><body style="font-family:Inter,Arial,sans-serif;background:#f4f6fa;padding:32px">
  <div style="max-width:480px;margin:0 auto;background:white;border-radius:12px;padding:32px;border:1px solid #e5e7eb">
    <div style="font-size:22px;font-weight:700;margin-bottom:4px"><span style="color:#0a2c66">TZG</span><span style="color:#10b981">Energy</span></div>
    <div style="font-size:13px;color:#6b7280;margin-bottom:24px">CMS Admin Login</div>
    <h2 style="margin:0 0 12px;font-size:18px;color:#0a2c66">Your verification code</h2>
    <div style="background:#f4f6fa;border:1px solid #d0d8e8;border-radius:8px;padding:24px;text-align:center;margin:16px 0 24px">
      <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#0a2c66;font-family:ui-monospace,monospace">${code}</div>
    </div>
    <p style="font-size:14px;color:#374151;line-height:1.6">This code expires in <strong>10 minutes</strong>.</p>
    <p style="font-size:13px;color:#9ca3af;margin-top:24px;border-top:1px solid #e5e7eb;padding-top:16px">If you did not request this code, please ignore this email.</p>
  </div>
</body></html>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [ADMIN_EMAIL],
        subject: `[TZG CMS] Login code: ${code}`,
        html: htmlBody,
      }),
    });
    if (!r.ok) {
      const errText = await r.text();
      console.error('[send-otp] Resend failed:', r.status, errText);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
    }
  } catch (e: any) {
    console.error('[send-otp] Network error:', e);
    return NextResponse.json({ error: 'Email service error' }, { status: 502 });
  }

  const res = NextResponse.json({ ok: true, message: 'Code sent' });
  res.cookies.set(OTP_COOKIE, cookieValue, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/api/auth',
    maxAge: 600,
  });
  return res;
}
