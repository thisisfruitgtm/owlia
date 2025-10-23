// Email sequence for calculator leads
// Day 1: Immediate (already sent with results)
// Day 3: Industry-specific tips
// Day 5: Deadline reminder + social proof
// Day 7: Final push with discount/urgency

export const calculatorDay3Template = (firstName: string, industry: string) => {
  const industryTips: Record<string, { title: string; tips: string[] }> = {
    "E-commerce": {
      title: "3 sfaturi pentru marketing în E-commerce",
      tips: [
        "📸 Investește în fotografie de produs profesională - crește conversiile cu până la 40%",
        "📧 Email marketing cu abandon cart recovery poate recupera 15-20% din vânzările pierdute",
        "🎯 Retargeting pe Facebook & Google aduce ROI de 400-600% în e-commerce",
      ],
    },
    "Servicii B2B": {
      title: "3 strategii de marketing pentru B2B",
      tips: [
        "💼 LinkedIn Ads targetate pe decision makers aduc cele mai calificate lead-uri",
        "📊 Case studies și white papers generează 3x mai multe conversii decât content generic",
        "🤝 Parteneriate strategice și referral programs reduc costul per client cu 50%",
      ],
    },
    "HoReCa": {
      title: "3 tactici de marketing pentru HoReCa",
      tips: [
        "⭐ Google My Business optimizat + review management crește rezervările cu 25-35%",
        "📱 Instagram & TikTok cu content video autentic aduce trafic organic constant",
        "🎁 Loyalty programs digitale cresc repeat customers cu 40-60%",
      ],
    },
    default: {
      title: "3 principii universale de marketing",
      tips: [
        "🎯 Focus pe o singură platformă până o stăpânești, apoi diversifică",
        "📊 Măsoară tot - ce nu se măsoară nu se poate optimiza",
        "👥 Investește în branding din start - economisești bani pe termen lung",
      ],
    },
  };

  const content = industryTips[industry] || industryTips.default;

  return {
    subject: `${content.title} [${industry}]`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #0A2540; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #ffffff; margin: 0;">💡 Sfaturi pentru ${industry}</h1>
  </div>
  
  <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 10px 10px;">
    <p>Salut${firstName ? ` ${firstName}` : ''}!</p>
    
    <p>După ce ai calculat bugetul de marketing, vreau să-ți dau câteva sfaturi specifice pentru <strong>${industry}</strong>:</p>
    
    ${content.tips.map(tip => `
    <div style="background-color: #FFF9F0; padding: 20px; border-left: 4px solid #0A2540; margin: 20px 0;">
      <p style="margin: 0; font-size: 16px;">${tip}</p>
    </div>
    `).join('')}
    
    <p><strong>Vrei să implementezi aceste strategii?</strong></p>
    
    <p>Hai să vorbim 30 de minute despre afacerea ta. Îți arăt exact cum aplicăm aceste tactici în practică.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://wa.me/40778767940?text=Vreau%20o%20consultanță%20pentru%20${encodeURIComponent(industry)}" style="background-color: #25D366; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
        💬 Programează Consultanță Gratuită
      </a>
    </div>
    
    <p style="color: #666; font-size: 14px;">P.S. - În consultanță îți arăt și cum alții din ${industry} au reușit să crească rapid cu buget similar.</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>OWLIA - Echipa ta de marketing<br>
    <a href="https://owlia.ro" style="color: #0A2540;">owlia.ro</a></p>
  </div>
</body>
</html>
    `,
    text: `Salut${firstName ? ` ${firstName}` : ''}!

După ce ai calculat bugetul de marketing, vreau să-ți dau câteva sfaturi specifice pentru ${industry}:

${content.tips.map(tip => `${tip}\n`).join('\n')}

Vrei să implementezi aceste strategii?

Hai să vorbim 30 de minute despre afacerea ta. Îți arăt exact cum aplicăm aceste tactici în practică.

Programează consultanță: https://wa.me/40778767940?text=Vreau%20o%20consultanță%20pentru%20${encodeURIComponent(industry)}

P.S. - În consultanță îți arăt și cum alții din ${industry} au reușit să crească rapid cu buget similar.

--
OWLIA - Echipa ta de marketing
owlia.ro`,
  };
};

export const calculatorDay5Template = (firstName: string, revenue: number) => ({
  subject: "⏰ Termenul limită Start-Up Nation se apropie...",
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #d32f2f; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #ffffff; margin: 0;">⏰ Timpul trece repede!</h1>
  </div>
  
  <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 10px 10px;">
    <p>Salut${firstName ? ` ${firstName}` : ''}!</p>
    
    <p>Am văzut că te-ai uitat la bugetul de marketing, dar încă n-am vorbit.</p>
    
    <div style="background-color: #FFF3CD; padding: 25px; border-radius: 10px; margin: 25px 0; border: 2px solid #FFA000;">
      <h2 style="color: #F57C00; margin-top: 0; text-align: center;">⚠️ Realitate dureroasă</h2>
      <p style="margin-bottom: 0;"><strong>70% din beneficiarii Start-Up Nation pierd bani</strong> pentru că aleg furnizori ieftini fără experiență în implementare.</p>
    </div>
    
    <p><strong>De ce?</strong></p>
    
    <ul style="color: #d32f2f;">
      <li>❌ Aleg pe cel mai ieftin, nu pe cel mai competent</li>
      <li>❌ Nu au plan clar de implementare pe 12 luni</li>
      <li>❌ Rămân fără suport după ce încheie contractul</li>
      <li>❌ Nu pot dovedi rezultate la evaluare</li>
    </ul>
    
    <div style="background-color: #E8F5E9; padding: 25px; border-radius: 10px; margin: 25px 0;">
      <h3 style="color: #0A2540; margin-top: 0;">✅ Cum te asiguri că NU pierzi banii?</h3>
      <p><strong>Alegi un partener cu:</strong></p>
      <ol>
        <li>📊 <strong>Track record dovedit</strong> - Vezi cazurile noastre de succes</li>
        <li>📅 <strong>Plan detaliat pe 12 luni</strong> - Știi exact ce se întâmplă lunar</li>
        <li>📧 <strong>Raportare lunară</strong> - Pentru evaluatori și pentru tine</li>
        <li>🤝 <strong>Suport continuu</strong> - Echipă dedicată 12+ luni</li>
      </ol>
    </div>
    
    <p><strong>Ai ${revenue >= 500000 ? 'peste 500.000 lei' : 'sub 500.000 lei'} cifră de afaceri?</strong></p>
    <p>Perfect! Ești exact în target-ul nostru. Hai să vorbim despre implementarea corectă.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://wa.me/40778767940?text=Vreau%20să%20implementez%20corect%20Start-Up%20Nation" style="background-color: #25D366; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
        💬 Hai să Vorbim Acum
      </a>
    </div>
    
    <p style="color: #666; font-size: 14px;">P.S. - Mai acceptăm doar 4 beneficiari pentru 2025. First come, first served.</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>OWLIA - Echipa ta de marketing<br>
    <a href="https://owlia.ro" style="color: #0A2540;">owlia.ro</a></p>
  </div>
</body>
</html>
  `,
  text: `Salut${firstName ? ` ${firstName}` : ''}!

Am văzut că te-ai uitat la bugetul de marketing, dar încă n-am vorbit.

⚠️ REALITATE DUREROASĂ
70% din beneficiarii Start-Up Nation pierd bani pentru că aleg furnizori ieftini fără experiență în implementare.

De ce?
❌ Aleg pe cel mai ieftin, nu pe cel mai competent
❌ Nu au plan clar de implementare pe 12 luni
❌ Rămân fără suport după ce încheie contractul
❌ Nu pot dovedi rezultate la evaluare

✅ CUM TE ASIGURI CĂ NU PIERZI BANII?

Alegi un partener cu:
1. 📊 Track record dovedit - Vezi cazurile noastre de succes
2. 📅 Plan detaliat pe 12 luni - Știi exact ce se întâmplă lunar
3. 📧 Raportare lunară - Pentru evaluatori și pentru tine
4. 🤝 Suport continuu - Echipă dedicată 12+ luni

Ai ${revenue >= 500000 ? 'peste 500.000 lei' : 'sub 500.000 lei'} cifră de afaceri?
Perfect! Ești exact în target-ul nostru. Hai să vorbim despre implementarea corectă.

Programează consultanță: https://wa.me/40778767940?text=Vreau%20să%20implementez%20corect%20Start-Up%20Nation

P.S. - Mai acceptăm doar 4 beneficiari pentru 2025. First come, first served.

--
OWLIA - Echipa ta de marketing
owlia.ro`,
});

export const calculatorDay7Template = (firstName: string) => ({
  subject: "🎁 Bonus special pentru tine (expiră în 48h)",
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #0A2540; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #ffffff; margin: 0;">🎁 Cadou special pentru tine</h1>
  </div>
  
  <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 10px 10px;">
    <p>Salut${firstName ? ` ${firstName}` : ''}!</p>
    
    <p>Știu că ai multe oferte și e greu să alegi. De aceea vreau să-ți fac lucrurile mai ușoare:</p>
    
    <div style="background-color: #E3F2FD; padding: 25px; border-radius: 10px; margin: 25px 0; border: 3px dashed #0A2540;">
      <h2 style="color: #0A2540; margin-top: 0; text-align: center;">🎁 BONUS EXCLUSIV</h2>
      <p style="text-align: center; font-size: 20px; margin: 20px 0;"><strong>Consultanță strategică GRATUITĂ (valoare 500 lei)</strong></p>
      <p style="text-align: center; margin-bottom: 0;">+ Plan de implementare Start-Up Nation personalizat</p>
    </div>
    
    <p><strong>Ce primești în consultanță?</strong></p>
    
    <ul>
      <li>📊 Audit gratuit al situației tale actuale</li>
      <li>🎯 Plan personalizat pe 12 luni pentru Start-Up Nation</li>
      <li>💰 Alocare optimă a bugetului pe servicii</li>
      <li>📅 Timeline exact cu milestone-uri și deadlines</li>
      <li>📈 Proiecție realistă de rezultate</li>
    </ul>
    
    <p><strong>⏰ Ofertă limitată!</strong></p>
    <p>Acest bonus expiră în <span style="color: #d32f2f; font-weight: bold;">48 de ore</span>. După aceea revin la consultanțele standard (500 lei).</p>
    
    <div style="background-color: #FFF9F0; padding: 20px; border-left: 4px solid #0A2540; margin: 25px 0;">
      <p style="margin: 0;"><strong>De ce fac asta?</strong></p>
      <p style="margin: 10px 0 0 0;">Pentru că am doar 4 locuri rămase pentru Start-Up Nation 2025 și vreau să lucrez cu antreprenori serioși care își doresc rezultate reale, nu doar să bifeze proiectul.</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://wa.me/40778767940?text=Vreau%20bonusul%20-%20consultanță%20gratuită" style="background-color: #d32f2f; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
        🎁 Revendic Bonusul Acum
      </a>
    </div>
    
    <p style="text-align: center; color: #666;">Expiră în: <span style="color: #d32f2f; font-weight: bold;">48 ore</span></p>
    
    <p style="color: #666; font-size: 14px; margin-top: 30px;">P.S. - Dacă nu răspunzi în 48h, presupun că ai găsit deja o soluție și te scot din listă. Fără spam, fără presiune - doar o oportunitate reală pentru cei hotărâți.</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>OWLIA - Echipa ta de marketing<br>
    <a href="https://owlia.ro" style="color: #0A2540;">owlia.ro</a></p>
  </div>
</body>
</html>
  `,
  text: `Salut${firstName ? ` ${firstName}` : ''}!

Știu că ai multe oferte și e greu să alegi. De aceea vreau să-ți fac lucrurile mai ușoare:

🎁 BONUS EXCLUSIV
Consultanță strategică GRATUITĂ (valoare 500 lei)
+ Plan de implementare Start-Up Nation personalizat

Ce primești în consultanță?
📊 Audit gratuit al situației tale actuale
🎯 Plan personalizat pe 12 luni pentru Start-Up Nation
💰 Alocare optimă a bugetului pe servicii
📅 Timeline exact cu milestone-uri și deadlines
📈 Proiecție realistă de rezultate

⏰ OFERTĂ LIMITATĂ!
Acest bonus expiră în 48 DE ORE. După aceea revin la consultanțele standard (500 lei).

De ce fac asta?
Pentru că am doar 4 locuri rămase pentru Start-Up Nation 2025 și vreau să lucrez cu antreprenori serioși care își doresc rezultate reale, nu doar să bifeze proiectul.

Revendică bonusul: https://wa.me/40778767940?text=Vreau%20bonusul%20-%20consultanță%20gratuită

Expiră în: 48 ore

P.S. - Dacă nu răspunzi în 48h, presupun că ai găsit deja o soluție și te scot din listă. Fără spam, fără presiune - doar o oportunitate reală pentru cei hotărâți.

--
OWLIA - Echipa ta de marketing
owlia.ro`,
});

