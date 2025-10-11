export const guideDownloadEmail = (guideUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ghidul tău despre bugetul de marketing</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f0;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f0;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background-color: #00288B; padding: 40px; text-align: center;">
              <svg width="120" height="40" viewBox="0 0 120 40" style="margin-bottom: 20px;">
                <text x="60" y="28" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">OWLIA</text>
              </svg>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                📥 Ghidul tău este gata!
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #1a1a1a; font-size: 16px; line-height: 1.6;">
                Bună!
              </p>
              <p style="margin: 0 0 20px; color: #666666; font-size: 16px; line-height: 1.6;">
                Îți mulțumim pentru interes! Am pregătit pentru tine ghidul <strong>"Cât Buget să Aloci pentru Marketing în Primul An"</strong>.
              </p>
              
              <!-- Features -->
              <div style="background-color: #f5f5f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 12px; color: #00288B; font-weight: 600; font-size: 16px;">
                  În acest ghid vei găsi:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #666666; font-size: 15px; line-height: 1.8;">
                  <li>Cât alocă fiecare industrie pentru marketing</li>
                  <li>Calculator simplu pentru bugetul tău</li>
                  <li>Greșeli comune de evitat</li>
                  <li>Ce cheltuieli sunt eligibile pentru Start-Up Nation</li>
                </ul>
              </div>
              
              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 8px; background-color: #00288B; text-align: center;">
                    <a href="${guideUrl}" style="display: inline-block; padding: 16px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">
                      📥 Descarcă Ghidul (PDF)
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                <em>Link-ul este valabil 7 zile.</em>
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;" />
              
              <p style="margin: 0 0 20px; color: #666666; font-size: 16px; line-height: 1.6;">
                Ai nevoie de ajutor să aloci corect bugetul? Programează o consultanță gratuită de 30 de minute și discutăm despre business-ul tău.
              </p>
              
              <!-- WhatsApp Button -->
              <table role="presentation" style="margin: 20px 0;">
                <tr>
                  <td style="border-radius: 8px; background-color: #25D366; text-align: center;">
                    <a href="https://wa.me/40123456789?text=Bună!%20Am%20descărcat%20ghidul%20și%20vreau%20o%20consultanță." style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px;">
                      💬 Consultanță Gratuită pe WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #666666; font-size: 16px; line-height: 1.6;">
                Cu drag,<br>
                <strong style="color: #00288B;">Echipa OWLIA</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f5f5f0; text-align: center;">
              <p style="margin: 0 0 10px; color: #999999; font-size: 14px;">
                OWLIA - Echipa ta de Marketing
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
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
`;

