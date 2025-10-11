export function contractGeneratedEmail(
  clientName: string,
  contractNumber: string,
  packageName: string
): string {
  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contract Generat</title>
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
                📄 Contractul tău este gata!
              </h2>
              
              <p style="margin: 0 0 30px 0; color: #64748B; font-size: 16px; line-height: 1.6;">
                Bună <strong>${clientName}</strong>,
              </p>
              
              <p style="margin: 0 0 30px 0; color: #64748B; font-size: 16px; line-height: 1.6;">
                Am pregătit contractul pentru pachetul <strong>${packageName}</strong>. 
                Poți vizualiza și descărca contractul accesând portalul tău de client.
              </p>
              
              <!-- Contract Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FBF8F3; border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #0A2540; font-size: 14px;">
                      <strong>Număr Contract:</strong> ${contractNumber}
                    </p>
                    <p style="margin: 0; color: #0A2540; font-size: 14px;">
                      <strong>Pachet:</strong> ${packageName}
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 30px 0; color: #64748B; font-size: 16px; line-height: 1.6;">
                <strong>Pașii următori:</strong>
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #E2E8F0;">
                    <p style="margin: 0; color: #0A2540; font-size: 14px;">
                      <strong>1️⃣ Verifică contractul</strong><br>
                      <span style="color: #64748B;">Citește cu atenție toate clauzele</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #E2E8F0;">
                    <p style="margin: 0; color: #0A2540; font-size: 14px;">
                      <strong>2️⃣ Descarcă și semnează</strong><br>
                      <span style="color: #64748B;">Printează, semnează și aplică ștampila</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <p style="margin: 0; color: #0A2540; font-size: 14px;">
                      <strong>3️⃣ Returnează contractul</strong><br>
                      <span style="color: #64748B;">Scanează și trimite la contact@owlia.ro</span>
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://owlia.ro/client" style="display: inline-block; background-color: #0A2540; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                      Accesează Portalul
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0 0; color: #64748B; font-size: 14px; line-height: 1.6;">
                💬 <strong>Ai întrebări?</strong><br>
                Contactează-ne la contact@owlia.ro sau +40 123 456 789
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
                Acest email a fost trimis automat de platforma OWLIA
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

