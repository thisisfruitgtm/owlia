import { getResend, FROM_EMAIL, isResendConfigured } from './resend';
import { welcomeEmail } from './templates/welcome';
import { guideDownloadEmail } from './templates/guideDownload';
import { calculatorResultEmail } from './templates/calculatorResult';
import { packageInterestEmail } from './templates/packageInterest';
import { contractGeneratedEmail } from './templates/contractGenerated';

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

export async function sendWelcomeEmail(to: string, name: string, clientId?: string) {
  const dashboardUrl = clientId 
    ? `${process.env.NEXTAUTH_URL}/client/${clientId}`
    : `${process.env.NEXTAUTH_URL}/auth/login`;
    
  return sendEmail({
    to,
    subject: 'Bun venit la OWLIA! 🎉',
    html: welcomeEmailTemplate(name, to, dashboardUrl),
  });
}

export async function sendGuideDownloadEmail(to: string, guideUrl: string) {
  return sendEmail({
    to,
    subject: '📥 Ghidul tău: Cât Buget să Aloci pentru Marketing',
    html: guideDownloadEmail(guideUrl),
  });
}

export async function sendCalculatorResultEmail(
  to: string,
  minBudget: number,
  maxBudget: number,
  packageName: string,
  packageInfo: string,
  industry: string,
  revenue: number
) {
  return sendEmail({
    to,
    subject: '📊 Bugetul tău de marketing recomandat',
    html: calculatorResultEmail(minBudget, maxBudget, packageName, packageInfo, industry, revenue),
  });
}

export async function sendPackageInterestEmail(
  to: string,
  packageName: string,
  packagePrice: string,
  phone?: string | null
) {
  return sendEmail({
    to,
    subject: '🎉 Mulțumim pentru interesul tău!',
    html: packageInterestEmail(packageName, packagePrice, phone),
  });
}

export async function sendContractGeneratedEmail(
  to: string,
  clientName: string,
  contractNumber: string,
  packageName: string
) {
  return sendEmail({
    to,
    subject: '📄 Contractul tău OWLIA este gata!',
    html: contractGeneratedEmail(clientName, contractNumber, packageName),
  });
}

