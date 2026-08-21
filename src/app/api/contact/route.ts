import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, country, phone, email, product, projectType, projectSize, message, locale } = body;

    const salesEmail = process.env.SALES_EMAIL || 'sales@tzgenergy.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'TZG Energy <sales@tzgenergy.com>';

    // 构建公共邮件内容
    const inquiryRows = [
      ['Name', name], ['Company', company], ['Country', country],
      ['Phone', phone], ['Email', email], ['Product', product || '-'],
      ['Project Type', projectType], ['Capacity', projectSize || '-'],
      ['Locale', (locale || 'en').toUpperCase()],
    ];
    const inquiryTable = inquiryRows
      .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;background:#f5f7fa">${k}</td><td style="padding:6px 12px">${v}</td></tr>`)
      .join('');

    // 1) 给销售团队（含客户邮箱 + 抄送客户 wooking080808）
    if (resend) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [salesEmail],
          // bcc 客户主邮箱作为备份（也可去掉）
          bcc: ['wooking080808@gmail.com'],
          replyTo: email, // 直接回复会回到客户
          subject: `🔋 New inquiry from ${name} (${company}) — ${country}`,
          html: `
            <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto">
              <div style="background:linear-gradient(135deg,#0a2c66,#1758cc,#00b894);padding:20px;color:white;border-radius:8px 8px 0 0">
                <h2 style="margin:0">New Inquiry from TZG Energy Website</h2>
                <p style="margin:6px 0 0;opacity:0.9">${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC</p>
              </div>
              <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-top:none">
                ${inquiryTable}
              </table>
              <div style="padding:16px;background:#fafbfc;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
                <h4 style="margin:0 0 8px">Message</h4>
                <p style="white-space:pre-wrap;margin:0;color:#374151">${(message || '(no message)').replace(/\n/g, '<br>')}</p>
              </div>
              <p style="font-size:12px;color:#9ca3af;margin-top:16px">Reply directly to this email to respond to ${name}.</p>
            </div>
          `,
        });
      } catch (err) {
        console.error('Resend sales email error:', err);
      }

      // 2) 自动回执给客户（多语种）
      try {
        const autoReplyMap: Record<string, { subject: string; body: string }> = {
          en: {
            subject: 'Thank you for your inquiry — TZG Energy',
            body: `<p>Dear ${name},</p><p>Thank you for contacting TZG Energy. We have received your inquiry and our sales team will respond within 24 hours.</p><p>If you need urgent assistance, please reach us on WhatsApp.</p><p>Best regards,<br/>TZG Energy Team</p>`,
          },
          zh: {
            subject: '感谢您的询盘 — TZG Energy',
            body: `<p>尊敬的 ${name}，</p><p>感谢您联系 TZG Energy。我们已收到您的询盘，销售团队将在 24 小时内回复您。</p><p>如需紧急协助，请通过 WhatsApp 与我们联系。</p><p>此致，<br/>TZG Energy 团队</p>`,
          },
          ru: {
            subject: 'Спасибо за ваш запрос — TZG Energy',
            body: `<p>Уважаемый(ая) ${name},</p><p>Спасибо за обращение в TZG Energy. Мы получили ваш запрос, и наша команда по продажам ответит вам в течение 24 часов.</p><p>С уважением,<br/>Команда TZG Energy</p>`,
          },
          ar: {
            subject: 'شكرًا لاستفسارك — TZG Energy',
            body: `<p>عزيزي ${name}،</p><p>شكرًا لتواصلك مع TZG Energy. لقد استلمنا استفسارك وسيتواصل معك فريق المبيعات خلال 24 ساعة.</p><p>مع أطيب التحيات،<br/>فريق TZG Energy</p>`,
          },
        };
        const reply = autoReplyMap[locale || 'en'] || autoReplyMap.en;
        await resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: reply.subject,
          html: `
            <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto">
              <div style="background:linear-gradient(135deg,#0a2c66,#1758cc,#00b894);padding:24px;color:white;border-radius:8px 8px 0 0">
                <h2 style="margin:0">TZG Energy</h2>
                <p style="margin:6px 0 0;opacity:0.9">Premium Energy Storage Systems</p>
              </div>
              <div style="padding:24px;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;color:#374151;line-height:1.6">
                ${reply.body}
                <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb"/>
                <p style="font-size:13px;color:#6b7280"><strong>Your inquiry:</strong></p>
                <table style="width:100%;font-size:13px;color:#374151">
                  ${inquiryTable}
                </table>
              </div>
            </div>
          `,
        });
      } catch (err) {
        console.error('Resend auto-reply error:', err);
      }
    }

    // 3) 企业微信群机器人
    if (process.env.WECHAT_WEBHOOK_URL && !process.env.WECHAT_WEBHOOK_URL.includes('placeholder')) {
      try {
        const wa_msg = `🔔 **新询盘 — ${(locale || 'en').toUpperCase()}**
👤 ${name} @ ${company}
🌍 ${country} | 📞 ${phone}
📧 ${email}
📦 ${product || '-'} | 🏗 ${projectType}
⚡ ${projectSize || '-'}
💬 ${(message || '-').substring(0, 200)}
🕐 ${new Date().toISOString()}`;
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
