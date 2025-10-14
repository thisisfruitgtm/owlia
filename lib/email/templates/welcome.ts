export function welcomeEmailTemplate(
  clientName: string,
  email: string,
  dashboardUrl: string
): string {
  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bine ai venit la OWLIA!</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F5F5F0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0A2540 0%, #1a4d7a 100%); padding: 40px 20px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold;">OWLIA</h1>
      <p style="margin: 10px 0 0 0; color: #ffffff; opacity: 0.9; font-size: 16px;">Branding & Marketing Digital</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      
      <!-- Greeting -->
      <h2 style="margin: 0 0 20px 0; color: #0A2540; font-size: 28px;">
        Bine ai venit, ${clientName}! 🎉
      </h2>
      
      <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
        Ne bucurăm să te avem în familia OWLIA! Contul tău a fost creat cu succes și suntem gata să începem colaborarea.
      </p>

      <!-- What's Next -->
      <div style="background-color: #F5F5F0; border-left: 4px solid #0A2540; padding: 20px; margin: 30px 0; border-radius: 4px;">
        <h3 style="margin: 0 0 15px 0; color: #0A2540; font-size: 20px;">
          Ce urmează? 🚀
        </h3>
        <ul style="margin: 0; padding-left: 20px; color: #666666; line-height: 1.8;">
          <li>Accesează dashboard-ul tău personal</li>
          <li>Vezi timeline-ul proiectului (12 luni)</li>
          <li>Urmărește progresul în timp real</li>
          <li>Primești notificări la fiecare update</li>
          <li>Download contracte și materiale</li>
        </ul>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 40px 0;">
        <a href="${dashboardUrl}" 
           style="display: inline-block; background-color: #0A2540; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: bold; font-size: 16px;">
          Accesează Dashboard-ul →
        </a>
      </div>

      <!-- Login Info -->
      <div style="background-color: #EFF6FF; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h3 style="margin: 0 0 15px 0; color: #0A2540; font-size: 18px;">
          📧 Datele tale de autentificare:
        </h3>
        <p style="margin: 0 0 10px 0; color: #666666;">
          <strong>Email:</strong> ${email}
        </p>
        <p style="margin: 0; color: #666666; font-size: 14px;">
          <strong>Parolă:</strong> Parola pe care ai ales-o la înregistrare
        </p>
      </div>

      <!-- Features -->
      <div style="margin: 40px 0;">
        <h3 style="margin: 0 0 20px 0; color: #0A2540; font-size: 20px;">
          Ce poți face în dashboard? 📊
        </h3>
        
        <div style="margin-bottom: 15px;">
          <div style="display: inline-block; background-color: #0A2540; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold; margin-right: 10px;">1</div>
          <strong style="color: #0A2540;">Vezi progresul proiectului</strong>
          <p style="margin: 5px 0 0 40px; color: #666666;">Timeline vizual cu toate etapele și milestone-urile tale</p>
        </div>

        <div style="margin-bottom: 15px;">
          <div style="display: inline-block; background-color: #0A2540; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold; margin-right: 10px;">2</div>
          <strong style="color: #0A2540;">Accesează contracte</strong>
          <p style="margin: 5px 0 0 40px; color: #666666;">Download contractele tale în format PDF oricând</p>
        </div>

        <div style="margin-bottom: 15px;">
          <div style="display: inline-block; background-color: #0A2540; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold; margin-right: 10px;">3</div>
          <strong style="color: #0A2540;">Download materiale</strong>
          <p style="margin: 5px 0 0 40px; color: #666666;">Logo-uri, grafice, rapoarte - toate într-un singur loc</p>
        </div>

        <div style="margin-bottom: 15px;">
          <div style="display: inline-block; background-color: #0A2540; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold; margin-right: 10px;">4</div>
          <strong style="color: #0A2540;">Primește notificări</strong>
          <p style="margin: 5px 0 0 40px; color: #666666;">Fii la curent cu fiecare update și milestone completat</p>
        </div>
      </div>

      <!-- Support -->
      <div style="background-color: #FEF3C7; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h3 style="margin: 0 0 10px 0; color: #0A2540; font-size: 18px;">
          💬 Ai nevoie de ajutor?
        </h3>
        <p style="margin: 0; color: #666666; line-height: 1.6;">
          Suntem aici pentru tine! Contactează-ne oricând la 
          <a href="mailto:contact@owlia.ro" style="color: #0A2540; font-weight: bold;">contact@owlia.ro</a> 
          sau prin dashboard-ul tău.
        </p>
      </div>

      <!-- Closing -->
      <p style="margin: 30px 0 0 0; color: #666666; font-size: 16px; line-height: 1.6;">
        Cu drag,<br>
        <strong style="color: #0A2540;">Echipa OWLIA</strong>
      </p>

    </div>

    <!-- Footer -->
    <div style="background-color: #F5F5F0; padding: 30px; text-align: center; border-top: 1px solid #E5E5E0;">
      <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px;">
        © 2025 OWLIA. Toate drepturile rezervate.
      </p>
      <p style="margin: 0; color: #999999; font-size: 12px;">
        Str. Exemplu nr. 10, București | contact@owlia.ro | +40 123 456 789
      </p>
      <div style="margin-top: 20px;">
        <a href="https://owlia.ro/politica-confidentialitate" 
           style="color: #0A2540; text-decoration: none; font-size: 12px; margin: 0 10px;">
          Politica de Confidențialitate
        </a>
      </div>
    </div>

  </div>
</body>
</html>
  `.trim();
}
