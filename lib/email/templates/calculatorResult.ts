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
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #FBF8F3;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FBF8F3; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0A2540; padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">OWLIA</h1>
              <p style="margin: 10px 0 0 0; color: #A5B4C6; font-size: 14px;">Branding & Marketing Digital</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #0A2540; font-size: 24px; font-weight: bold;">
                📊 Bugetul tău de marketing recomandat
              </h2>
              
              <p style="margin: 0 0 30px 0; color: #64748B; font-size: 16px; line-height: 1.6;">
                Mulțumim pentru completarea calculatorului! Pe baza informațiilor tale:
              </p>
              
              <!-- Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FBF8F3; border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #0A2540; font-size: 14px;">
                      <strong>Industrie:</strong> ${industry}
                    </p>
                    <p style="margin: 0; color: #0A2540; font-size: 14px;">
                      <strong>Cifră de afaceri proiectată:</strong> ${revenue.toLocaleString('ro-RO')} lei
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Budget Result -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A2540; border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #A5B4C6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                      Buget recomandat
                    </p>
                    <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 36px; font-weight: bold;">
                      ${minBudget.toLocaleString('ro-RO')} - ${maxBudget.toLocaleString('ro-RO')} lei
                    </p>
                    <div style="display: inline-block; background-color: #FBF8F3; color: #0A2540; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 600;">
                      ${packageName}
                    </div>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 30px 0; color: #64748B; font-size: 16px; line-height: 1.6;">
                ${packageInfo}
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://owlia.ro/start-up-nation" style="display: inline-block; background-color: #0A2540; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                      Vezi Pachetele Start-Up Nation
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0 0; color: #64748B; font-size: 14px; line-height: 1.6;">
                💬 <strong>Vrei o analiză personalizată?</strong><br>
                Scrie-ne pe WhatsApp și discutăm despre nevoile tale specifice.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 30px 40px; text-align: center; border-top: 1px solid #E2E8F0;">
              <p style="margin: 0 0 10px 0; color: #64748B; font-size: 14px;">
                <strong>OWLIA</strong> - Branding & Marketing Digital
              </p>
              <p style="margin: 0 0 15px 0; color: #94A3B8; font-size: 12px;">
                contact@owlia.ro | +40 123 456 789
              </p>
              <p style="margin: 0; color: #94A3B8; font-size: 11px;">
                Acest email a fost trimis deoarece ai completat calculatorul de buget pe owlia.ro
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

