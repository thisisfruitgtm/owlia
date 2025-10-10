import { getResend, FROM_EMAIL, isResendConfigured } from './resend';
import { welcomeEmail } from './templates/welcome';
import { guideDownloadEmail } from './templates/guideDownload';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    if (!isResendConfigured()) {
      console.warn('⚠️ RESEND_API_KEY not configured. Email will not be sent.');
      return { success: false, error: 'Resend not configured' };
    }

    const resend = getResend();
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(to: string, name: string) {
  return sendEmail({
    to,
    subject: 'Bun venit la OWLIA!',
    html: welcomeEmail(name),
  });
}

export async function sendGuideDownloadEmail(to: string, guideUrl: string) {
  return sendEmail({
    to,
    subject: '📥 Ghidul tău: Cât Buget să Aloci pentru Marketing',
    html: guideDownloadEmail(guideUrl),
  });
}

