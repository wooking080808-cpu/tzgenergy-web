import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, country, phone, email, product, projectType, projectSize, message, locale } = body;

    // 1) Resend 邮件给销售
    if (resend && process.env.RESEND_FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: [process.env.SALES_EMAIL || 'sales@tzgenergy.com'],
          subject: `🔋 New Inquiry from ${name} (${company})`,
          html: `
            <h2>New inquiry from TZG Energy website</h2>
            <table style="border-collapse:collapse">
              <tr><td><b>Name</b></td><td>${name}</td></tr>
              <tr><td><b>Company</b></td><td>${company}</td></tr>
              <tr><td><b>Country</b></td><td>${country}</td></tr>
              <tr><td><b>Phone</b></td><td>${phone}</td></tr>
              <tr><td><b>Email</b></td><td>${email}</td></tr>
              <tr><td><b>Product</b></td><td>${product || '-'}</td></tr>
              <tr><td><b>Project type</b></td><td>${projectType}</td></tr>
              <tr><td><b>Size</b></td><td>${projectSize || '-'}</td></tr>
              <tr><td><b>Locale</b></td><td>${locale}</td></tr>
            </table>
            <h3>Message</h3>
            <p>${(message || '').replace(/\n/g, '<br>')}</p>
          `,
        });
      } catch (err) {
        console.error('Resend error:', err);
      }
    }

    // 2) 企业微信群机器人
    if (process.env.WECHAT_WEBHOOK_URL) {
      try {
        const wa_msg = `🔔 **新询盘 - ${(locale || 'en').toUpperCase()}**
姓名: ${name}
公司: ${company}
国家: ${country}
电话: ${phone}
邮箱: ${email}
产品: ${product || '-'}
项目类型: ${projectType}
容量: ${projectSize || '-'}
留言: ${(message || '-').substring(0, 200)}
时间: ${new Date().toISOString()}`;
        await fetch(process.env.WECHAT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ msgtype: 'markdown', markdown: { content: wa_msg } }),
        });
      } catch (err) {
        console.error('WeChat webhook error:', err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
