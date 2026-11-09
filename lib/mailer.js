import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER || 'yovarin.com@gmail.com';
const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';
const notificationEmail = process.env.NOTIFICATION_EMAIL || emailUser;

function getTransporter() {
  if (!emailPass || emailPass.includes('your-16-character')) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
}

/**
 * Sends a notification email to the Yovarin team whenever a new consultation is requested
 */
export async function sendLeadNotificationEmail(leadData) {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn('Nodemailer not fully configured. Missing EMAIL_PASS in .env.local');
    return { success: false, reason: 'unconfigured' };
  }

  const modulesList = Array.isArray(leadData.modules) && leadData.modules.length > 0 
    ? leadData.modules.join(', ') 
    : 'None selected';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Enterprise Consultation Request</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #070b14; color: #f1f5f9; margin: 0; padding: 24px; }
        .card { background-color: #0f172a; border: 1px solid #1e293b; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; }
        .header { background: linear-gradient(135deg, #064e3b, #0f766e); padding: 24px; text-align: left; }
        .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; }
        .header p { color: #a7f3d0; margin: 4px 0 0 0; font-size: 12px; }
        .content { padding: 24px; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #1e293b; font-size: 13px; }
        .label { color: #94a3b8; font-weight: 500; }
        .value { color: #f8fafc; font-weight: 600; text-align: right; }
        .notes-box { background-color: #070b14; border: 1px solid #334155; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #cbd5e1; line-height: 1.5; }
        .footer { padding: 16px 24px; background-color: #070b14; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>New Lead / Consultation Inquiry</h1>
          <p>Received via Yovarin Enterprise Platform</p>
        </div>
        <div class="content">
          <div class="row">
            <span class="label">Full Name:</span>
            <span class="value">${leadData.name || 'N/A'}</span>
          </div>
          <div class="row">
            <span class="label">Work Email:</span>
            <span class="value"><a href="mailto:${leadData.email}" style="color: #34d399; text-decoration: none;">${leadData.email || 'N/A'}</a></span>
          </div>
          <div class="row">
            <span class="label">Phone / WhatsApp:</span>
            <span class="value"><a href="tel:${leadData.phone}" style="color: #38bdf8; text-decoration: none;">${leadData.phone || 'N/A'}</a></span>
          </div>
          <div class="row">
            <span class="label">Company Name:</span>
            <span class="value">${leadData.company || 'N/A'}</span>
          </div>
          <div class="row">
            <span class="label">Industry:</span>
            <span class="value">${leadData.industry || 'N/A'}</span>
          </div>
          <div class="row">
            <span class="label">Team / User Size:</span>
            <span class="value">${leadData.users || 'N/A'}</span>
          </div>
          <div class="row">
            <span class="label">Service Required:</span>
            <span class="value">${leadData.service || 'Full ERP Implementation'}</span>
          </div>
          <div class="row">
            <span class="label">Target Timeline:</span>
            <span class="value">${leadData.timeline || 'Within 1-2 Months'}</span>
          </div>
          <div class="row">
            <span class="label">Selected Modules:</span>
            <span class="value" style="color: #34d399;">${modulesList}</span>
          </div>

          <div style="margin-top: 16px;">
            <span class="label">Workflow Context & Pain Points:</span>
            <div class="notes-box">
              ${leadData.notes ? leadData.notes.replace(/\n/g, '<br>') : 'No extra notes provided.'}
            </div>
          </div>
        </div>
        <div class="footer">
          Yovarin Technologies Lead Delivery System &bull; yovarin.com@gmail.com
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Yovarin Enterprise Portal" <${emailUser}>`,
      to: notificationEmail,
      replyTo: leadData.email,
      subject: `[New Lead] ${leadData.company} — ${leadData.name} (${leadData.service || 'Consultation'})`,
      text: `New consultation request from ${leadData.name} at ${leadData.company}. Email: ${leadData.email}, Phone: ${leadData.phone}. Service: ${leadData.service}. Notes: ${leadData.notes}`,
      html: htmlContent,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send lead notification email via Nodemailer:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sends a branded acknowledgment email to the prospective client
 */
export async function sendLeadConfirmationEmail(leadData) {
  const transporter = getTransporter();

  if (!transporter || !leadData.email) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You - Yovarin Technologies</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #070b14; color: #f1f5f9; margin: 0; padding: 24px; }
        .card { background-color: #0f172a; border: 1px solid #1e293b; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; }
        .header { background: linear-gradient(135deg, #064e3b, #0f766e); padding: 28px; text-align: left; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
        .content { padding: 28px; font-size: 14px; line-height: 1.6; color: #cbd5e1; }
        .highlight { color: #34d399; font-weight: 600; }
        .box { background-color: #070b14; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; }
        .footer { padding: 20px 28px; background-color: #070b14; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Yovarin Technologies</h1>
          <p style="color: #a7f3d0; margin: 4px 0 0 0; font-size: 13px;">Enterprise Web Development, Next-Gen SaaS & ERPNext</p>
        </div>
        <div class="content">
          <p>Hello <strong style="color: #fff;">${leadData.name}</strong>,</p>
          <p>Thank you for reaching out to <span class="highlight">Yovarin Technologies</span> regarding your digital transformation and software requirements for <strong style="color: #fff;">${leadData.company}</strong>.</p>
          <p>Our senior technical architects have received your operational parameters and are currently reviewing your scope.</p>
          
          <div class="box">
            <strong style="color: #fff; display: block; margin-bottom: 8px;">What happens next:</strong>
            1. A senior engineer will review your workflow context.<br>
            2. We will contact you via WhatsApp / Phone at <strong style="color: #38bdf8;">${leadData.phone}</strong> or email within <strong style="color: #34d399;">4 business hours</strong>.<br>
            3. We will schedule a confidential, zero-pressure architectural review.
          </div>

          <p>If you have urgent documents, process charts, or NDA requirements in the meantime, simply reply directly to this email.</p>
          <p style="margin-top: 24px;">Warm regards,<br><strong style="color: #fff;">The Yovarin Engineering Team</strong><br><span style="font-size: 12px; color: #64748b;">yovarin.com@gmail.com</span></p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Yovarin Technologies &bull; Lahore, Pakistan &bull; Serving Clients Globally
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Yovarin Technologies" <${emailUser}>`,
      to: leadData.email,
      replyTo: emailUser,
      subject: `We have received your consultation request — Yovarin Technologies`,
      html: htmlContent,
    });
  } catch (err) {
    console.error('Failed to send customer confirmation email:', err);
  }
}

/**
 * Sends a notification when a new newsletter subscriber joins
 */
export async function sendNewsletterNotification(subscriberEmail) {
  const transporter = getTransporter();
  if (!transporter) return;

  try {
    await transporter.sendMail({
      from: `"Yovarin Tech Dispatch" <${emailUser}>`,
      to: notificationEmail,
      subject: `[New Subscriber] ${subscriberEmail} joined Yovarin Tech Dispatch`,
      text: `New subscriber email: ${subscriberEmail}`,
    });
  } catch (err) {
    console.error('Newsletter notification error:', err);
  }
}
