// Email sequence for package interest leads
// Day 0: Immediate (already sent via sendPackageInterestEmail)
// Day 2: Follow-up with more details
// Day 5: Final push with testimonial

export const packageDay2Template = (firstName: string, packageName: string, packagePrice: string) => ({
  subject: `Mai multe detalii despre ${packageName}`,
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #0A2540; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #ffffff; margin: 0;">📦 ${packageName}</h1>
  </div>
  
  <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 10px 10px;">
    <p>Salut${firstName ? ` ${firstName}` : ''}!</p>
    
    <p>Am văzut că ești interesat de <strong>${packageName}</strong>. Vreau să-ți dau mai multe detalii despre ce primești exact:</p>
    
    <div style="background-color: #E8F5E9; padding: 25px; border-radius: 10px; margin: 25px 0;">
      <h3 style="color: #0A2540; margin-top: 0;">✅ Ce Include ${packageName}?</h3>
      <ul>
        <li>🎨 <strong>Branding complet</strong> - Logo, identitate vizuală, ghid de utilizare</li>
        <li>🌐 <strong>Website profesional</strong> - Design modern, responsive, optimizat SEO</li>
        <li>📱 <strong>Social Media</strong> - Strategie + design postări (3 luni)</li>
        <li>📧 <strong>Email Marketing</strong> - Template-uri personalizate + automatizări</li>
        <li>📊 <strong>Raportare</strong> - Dashboard analitic + rapoarte lunare</li>
        <li>🤝 <strong>Suport dedicat</strong> - Echipă disponibilă 12 luni</li>
      </ul>
    </div>
    
    <div style="background-color: #FFF9F0; padding: 20px; border-left: 4px solid #0A2540; margin: 25px 0;">
      <h3 style="color: #0A2540; margin-top: 0;">⏱️ Timeline de implementare</h3>
      <p><strong>Luna 1-2:</strong> Branding + Website<br>
      <strong>Luna 2-3:</strong> Content creation + Social Media setup<br>
      <strong>Luna 3-12:</strong> Marketing activ + Optimizări continue</p>
    </div>
    
    <p><strong>💰 Preț: ${packagePrice} lei</strong></p>
    <p style="color: #666;">Eligibil 100% pentru Start-Up Nation • Raportare inclusă • Documentație completă</p>
    
    <p><strong>Ai întrebări?</strong> Hai să vorbim 15 minute. Îți explic tot în detaliu și vezi dacă e potrivit pentru afacerea ta.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://wa.me/40123456789?text=Vreau%20detalii%20despre%20${encodeURIComponent(packageName)}" style="background-color: #25D366; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
        💬 Hai să Vorbim
      </a>
    </div>
    
    <p style="text-align: center; margin-top: 20px;">
      <a href="https://owlia.ro/start-up-nation#pricing" style="color: #0A2540;">Vezi toate pachetele Start-Up Nation →</a>
    </p>
    
    <p style="color: #666; font-size: 14px; margin-top: 30px;">P.S. - Dacă îmi spui ce industrie și ce obiective ai, pot să-ți personalizez o ofertă exactă pentru tine.</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>OWLIA - Echipa ta de marketing<br>
    <a href="https://owlia.ro" style="color: #0A2540;">owlia.ro</a></p>
  </div>
</body>
</html>
  `,
  text: `Salut${firstName ? ` ${firstName}` : ''}!

Am văzut că ești interesat de ${packageName}. Vreau să-ți dau mai multe detalii despre ce primești exact:

✅ CE INCLUDE ${packageName.toUpperCase()}?

🎨 Branding complet - Logo, identitate vizuală, ghid de utilizare
🌐 Website profesional - Design modern, responsive, optimizat SEO
📱 Social Media - Strategie + design postări (3 luni)
📧 Email Marketing - Template-uri personalizate + automatizări
📊 Raportare - Dashboard analitic + rapoarte lunare
🤝 Suport dedicat - Echipă disponibilă 12 luni

⏱️ TIMELINE DE IMPLEMENTARE
Luna 1-2: Branding + Website
Luna 2-3: Content creation + Social Media setup
Luna 3-12: Marketing activ + Optimizări continue

💰 Preț: ${packagePrice} lei
Eligibil 100% pentru Start-Up Nation • Raportare inclusă • Documentație completă

Ai întrebări? Hai să vorbim 15 minute. Îți explic tot în detaliu și vezi dacă e potrivit pentru afacerea ta.

Programează: https://wa.me/40123456789?text=Vreau%20detalii%20despre%20${encodeURIComponent(packageName)}

Vezi toate pachetele: https://owlia.ro/start-up-nation#pricing

P.S. - Dacă îmi spui ce industrie și ce obiective ai, pot să-ți personalizez o ofertă exactă pentru tine.

--
OWLIA - Echipa ta de marketing
owlia.ro`,
});

export const packageDay5Template = (firstName: string, packageName: string) => ({
  subject: "Cum a reușit Atelier de Business cu același pachet",
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #0A2540; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #ffffff; margin: 0;">🎯 Success Story</h1>
  </div>
  
  <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 10px 10px;">
    <p>Salut${firstName ? ` ${firstName}` : ''}!</p>
    
    <p>Știu că e greu să iei o decizie fără să vezi rezultate reale. De aceea vreau să-ți povestesc despre <strong>Atelier de Business</strong>:</p>
    
    <div style="background-color: #E3F2FD; padding: 25px; border-radius: 10px; margin: 25px 0;">
      <h3 style="color: #0A2540; margin-top: 0;">📈 Rezultate în 6 luni:</h3>
      <ul style="font-size: 16px;">
        <li>✅ Website profesional live în 45 zile</li>
        <li>✅ 1,200+ vizitatori organici lunar (SEO)</li>
        <li>✅ 87 lead-uri calificate prin content marketing</li>
        <li>✅ 23 clienți noi din campanii digitale</li>
        <li>✅ ROI de 380% în primele 6 luni</li>
      </ul>
    </div>
    
    <div style="background-color: #FFF9F0; padding: 20px; border-left: 4px solid #0A2540; margin: 25px 0;">
      <p style="margin: 0; font-style: italic;">"Am ales OWLIA pentru că nu voiam doar un website frumos. Voiam o echipă care să mă ajute să cresc. După 6 luni, avem clienți noi în fiecare săptămână din marketing digital."</p>
      <p style="margin: 10px 0 0 0; color: #666;">— Andra, Fondator Atelier de Business</p>
    </div>
    
    <p><strong>Ce au făcut diferit?</strong></p>
    
    <ol>
      <li>📊 <strong>Au avut un plan clar de la început</strong> - Nu au improvizat</li>
      <li>🎯 <strong>Au investit în strategie, nu doar în execuție</strong> - Fiecare leu cheltuit strategic</li>
      <li>📈 <strong>Au măsurat tot</strong> - Ce funcționează, ce nu, ajustări lunare</li>
      <li>🤝 <strong>Au avut o echipă dedicată</strong> - Nu freelanceri care dispar</li>
    </ol>
    
    <p><strong>Vrei aceleași rezultate?</strong></p>
    
    <p>Același pachet pe care l-ai ales (<strong>${packageName}</strong>) este exact ce a folosit Atelier de Business pentru a crește.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://wa.me/40123456789?text=Vreau%20să%20discutăm%20despre%20${encodeURIComponent(packageName)}" style="background-color: #0A2540; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
        📞 Hai să Vorbim despre Rezultate
      </a>
    </div>
    
    <p style="text-align: center; margin-top: 20px;">
      <a href="https://owlia.ro/cazuri-de-succes/atelier-de-business" style="color: #0A2540;">Vezi cazul complet Atelier de Business →</a>
    </p>
    
    <div style="background-color: #FFEBEE; padding: 20px; border-radius: 10px; margin: 25px 0;">
      <p style="margin: 0; text-align: center;"><strong>⏰ Ultimul reminder:</strong></p>
      <p style="margin: 10px 0 0 0; text-align: center;">Dacă nu răspunzi în următoarele 48h, presupun că ai găsit deja o soluție și te scot din listă. Fără presiune - doar vreau să lucrez cu antreprenori hotărâți.</p>
    </div>
    
    <p style="color: #666; font-size: 14px;">P.S. - Sunt disponibil și pe WhatsApp pentru răspuns rapid la orice întrebare. Chiar și în weekend.</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>OWLIA - Echipa ta de marketing<br>
    <a href="https://owlia.ro" style="color: #0A2540;">owlia.ro</a></p>
  </div>
</body>
</html>
  `,
  text: `Salut${firstName ? ` ${firstName}` : ''}!

Știu că e greu să iei o decizie fără să vezi rezultate reale. De aceea vreau să-ți povestesc despre Atelier de Business:

📈 REZULTATE ÎN 6 LUNI:
✅ Website profesional live în 45 zile
✅ 1,200+ vizitatori organici lunar (SEO)
✅ 87 lead-uri calificate prin content marketing
✅ 23 clienți noi din campanii digitale
✅ ROI de 380% în primele 6 luni

"Am ales OWLIA pentru că nu voiam doar un website frumos. Voiam o echipă care să mă ajute să cresc. După 6 luni, avem clienți noi în fiecare săptămână din marketing digital."
— Andra, Fondator Atelier de Business

CE AU FĂCUT DIFERIT?
1. 📊 Au avut un plan clar de la început - Nu au improvizat
2. 🎯 Au investit în strategie, nu doar în execuție - Fiecare leu cheltuit strategic
3. 📈 Au măsurat tot - Ce funcționează, ce nu, ajustări lunare
4. 🤝 Au avut o echipă dedicată - Nu freelanceri care dispar

Vrei aceleași rezultate?

Același pachet pe care l-ai ales (${packageName}) este exact ce a folosit Atelier de Business pentru a crește.

Programează: https://wa.me/40123456789?text=Vreau%20să%20discutăm%20despre%20${encodeURIComponent(packageName)}

Vezi cazul complet: https://owlia.ro/cazuri-de-succes/atelier-de-business

⏰ ULTIMUL REMINDER:
Dacă nu răspunzi în următoarele 48h, presupun că ai găsit deja o soluție și te scot din listă. Fără presiune - doar vreau să lucrez cu antreprenori hotărâți.

P.S. - Sunt disponibil și pe WhatsApp pentru răspuns rapid la orice întrebare. Chiar și în weekend.

--
OWLIA - Echipa ta de marketing
owlia.ro`,
});

