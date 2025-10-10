import { Resend } from 'resend';

// Initialize Resend with API key (will be available at runtime)
export const resend = new Resend(process.env.RESEND_API_KEY || '');

export const FROM_EMAIL = 'contact@owlia.ro';

// Helper to check if Resend is properly configured
export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

