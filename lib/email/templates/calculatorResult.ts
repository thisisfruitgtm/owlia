export function calculatorResultEmail(
  minBudget: number,
  maxBudget: number,
  packageName: string,
  packageInfo: string,
  industry: string,
  revenue: number
): string {
  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bugetul tău de marketing recomandat</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F5F5F0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F5F0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background-color: #00288B; padding: 40px 40px 30px 40px; text-align: center;">
              <svg width="120" height="40" viewBox="0 0 120 40" style="margin-bottom: 15px;">
                <text x="60" y="28" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">OWLIA</text>
              </svg>
              <p style="margin: 0; color: #F5F5F0; font-size: 14px; opacity: 0.9;">Branding & Marketing Digital</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1A1A1A; font-size: 24px; font-weight: bold;">
                📊 Bugetul tău de marketing recomandat
              </h2>
              
              <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                Mulțumim pentru completarea calculatorului! Pe baza informațiilor tale:
              </p>
              
              <!-- Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F5F0; border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #1A1A1A; font-size: 14px;">
                      <strong>Industrie:</strong> ${industry}
                    </p>
                    <p style="margin: 0; color: #1A1A1A; font-size: 14px;">
                      <strong>Cifră de afaceri proiectată:</strong> ${revenue.toLocaleString('ro-RO')} lei
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Budget Result -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #00288B; border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #F5F5F0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">
                      Buget recomandat
                    </p>
                    <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 36px; font-weight: bold;">
                      ${minBudget.toLocaleString('ro-RO')} - ${maxBudget.toLocaleString('ro-RO')} lei
                    </p>
                    <div style="display: inline-block; background-color: #F5F5F0; color: #00288B; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 600;">
                      ${packageName}
                    </div>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                ${packageInfo}
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://owlia.ro/start-up-nation" style="display: inline-block; background-color: #00288B; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                      Vezi Pachetele Start-Up Nation
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                💬 <strong>Vrei o analiză personalizată?</strong><br>
                Scrie-ne pe WhatsApp și discutăm despre nevoile tale specifice.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F5F5F0; padding: 30px 40px; text-align: center; border-top: 1px solid #E5E5E5;">
              <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                <strong>OWLIA</strong> - Echipa ta de Marketing
              </p>
              <p style="margin: 0 0 15px 0; color: #999999; font-size: 12px;">
                contact@owlia.ro
              </p>
              <p style="margin: 0; color: #999999; font-size: 11px;">
                © 2025 OWLIA. Toate drepturile rezervate.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

